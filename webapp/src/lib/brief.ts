import fs from 'node:fs';
import path from 'node:path';
import { NCKH_ROOT, LAYERS } from './paths';
import { listAllPapers, type PaperMeta } from './papers';
import { listRejected } from './reject';

// Sinh RESEARCH_BRIEF.md — bản tóm tắt trạng thái nghiên cứu để Claude nạp
// nhanh đầu mỗi phiên (định hướng tức thì, khỏi đọc lại tất cả analysis.html).
// Nguồn dữ liệu: summary.json (Claude viết khi phân tích) + metadata + rejected.json.

export const BRIEF_FILE = path.join(NCKH_ROOT, 'RESEARCH_BRIEF.md');

interface Summary {
  contribution?: string;
  method?: string;
  best_metric?: string;
  reproducible?: string;
  vs_baseline?: string;
  gap?: string;
  verdict?: string;
}

function readSummary(folder: string): Summary | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(folder, 'summary.json'), 'utf8'));
  } catch {
    return null;
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&middot;/g, '·')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function cardField(html: string, label: RegExp): string | null {
  const m = html.match(
    new RegExp(label.source + String.raw`[^<]*</span>\s*<span class="value">([\s\S]*?)</span>`),
  );
  if (!m) return null;
  const text = decodeEntities(m[1].replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  return text || null;
}

/**
 * Fallback khi chưa có summary.json: parse 4 field Compare Card từ
 * analysis.html (cấu trúc cố định theo AGENTS.md §6). Ưu tiên bản v2.
 */
function readCompareCard(folder: string): Summary | null {
  for (const name of ['analysis.v2.html', 'analysis.html']) {
    const file = path.join(folder, name);
    let html: string;
    try {
      html = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    const contribution = cardField(html, /Đóng góp chính/);
    if (!contribution) continue;
    return {
      contribution,
      best_metric: cardField(html, /Best metric/) ?? undefined,
      method: cardField(html, /Method chính/) ?? undefined,
      vs_baseline: cardField(html, /So với/) ?? undefined,
    };
  }
  return null;
}

function line(p: PaperMeta): string {
  const s = readSummary(p.folder) ?? readCompareCard(p.folder);
  const star = p.is_chosen ? '⭐ ' : '';
  if (s?.contribution) {
    const bits = [
      s.contribution,
      s.best_metric && s.best_metric !== 'UNKNOWN' ? `📊 ${s.best_metric}` : null,
      s.reproducible ? `tái lập: ${s.reproducible}` : null,
      s.verdict ? `verdict: ${s.verdict}` : null,
    ].filter(Boolean);
    return `- ${star}**${p.paper_id}** — ${bits.join(' · ')}`;
  }
  // chưa có summary → chỉ metadata
  const analyzedNote =
    p.analysis_status === 'queued'
      ? '⏳ chờ phân tích'
      : p.has_analysis
        ? 'có analysis.html (cần summary.json)'
        : 'chưa phân tích';
  const meta = [
    `${p.year ?? '—'}`,
    `${p.citations ?? '?'} cite`,
    p.code_url ? 'có code' : null,
    p.datasets.length ? `${p.datasets.length} ds` : null,
    analyzedNote,
  ].filter(Boolean);
  return `- ${star}**${p.paper_id}** — ${p.title.slice(0, 60)} (${meta.join(' · ')})`;
}

export function generateBrief(nowISO: string): string {
  const all = listAllPapers();
  const rejected = listRejected();
  // paper_id đã loại — KHÔNG liệt trong mục layer (chỉ hiện ở "Đã loại"),
  // dù folder vẫn còn trong searched_papers/.
  const rejectedIds = new Set(
    rejected.map((r) => r.paper_id).filter((id): id is string => Boolean(id)),
  );
  const chosen = all.filter((p) => p.is_chosen).length;
  const analyzed = all.filter((p) => p.analysis_status === 'analyzed').length;
  const queued = all.filter((p) => p.analysis_status === 'queued').length;

  const out: string[] = [];
  out.push(`# Research Brief`);
  out.push(`> Tự sinh bởi ExploreX lúc ${nowISO}. Đề tài: dự đoán/chẩn đoán đái tháo đường (binary, tabular & EHR).`);
  out.push('');
  out.push(
    `**Tổng quan:** ${all.length} paper · ${chosen} đã chọn · ${analyzed} đã phân tích · ${queued} chờ phân tích · ${rejected.length} đã loại.`,
  );
  out.push('');
  out.push(
    `_Mỗi session: đọc file này trước để định hướng. Bài có summary.json → đã phân tích sâu; bài chưa có → cần phân tích._`,
  );

  for (const layer of LAYERS) {
    const inLayer = all.filter(
      (p) => p.layer === layer.id && !rejectedIds.has(p.paper_id),
    );
    out.push('');
    out.push(`## Layer ${layer.id} — ${layer.name}`);
    out.push(`_${layer.focus}_`);
    if (inLayer.length === 0) {
      out.push('- (chưa có paper)');
      continue;
    }
    const chosenP = inLayer.filter((p) => p.is_chosen);
    const queuedP = inLayer.filter((p) => !p.is_chosen && p.analysis_status === 'queued');
    const rest = inLayer.filter((p) => !p.is_chosen && p.analysis_status !== 'queued');
    if (chosenP.length) {
      out.push('**Đã chọn (baseline):**');
      chosenP.forEach((p) => out.push(line(p)));
    }
    if (queuedP.length) {
      out.push('**Chờ phân tích:**');
      queuedP.forEach((p) => out.push(line(p)));
    }
    if (rest.length) {
      out.push('**Khác:**');
      rest.forEach((p) => out.push(line(p)));
    }
  }

  // Gap tổng hợp từ summary
  const gaps = all
    .filter((p) => !rejectedIds.has(p.paper_id))
    .map((p) => ({ id: p.paper_id, gap: readSummary(p.folder)?.gap }))
    .filter((g): g is { id: string; gap: string } => Boolean(g.gap));
  if (gaps.length) {
    out.push('');
    out.push('## Gap / cơ hội cải tiến (từ phân tích)');
    gaps.forEach((g) => out.push(`- **${g.id}**: ${g.gap}`));
  }

  if (rejected.length) {
    out.push('');
    out.push('## Đã loại (không tìm lại)');
    rejected.slice(0, 30).forEach((r) =>
      out.push(`- ${r.title.slice(0, 60)} — ${r.reason} _(${r.by})_`),
    );
  }

  out.push('');
  return out.join('\n');
}

export function writeBrief(nowISO: string): { path: string; bytes: number } {
  const content = generateBrief(nowISO);
  fs.writeFileSync(BRIEF_FILE, content, 'utf8');
  return { path: BRIEF_FILE, bytes: Buffer.byteLength(content) };
}
