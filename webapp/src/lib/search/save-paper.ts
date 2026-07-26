import fs from 'node:fs';
import path from 'node:path';
import { SEARCHED_DIR, layerById, type LayerId } from '../paths';
import { fetchWithTimeout, normalizeDoi } from './types';
import type { MergedPaper } from './orchestrator';

// Ghi 1 paper từ kết quả search vào searched_papers/Layer_X/<paper_id>/
// theo schema AGENTS.md §5. Chỉ chạy khi user bấm lưu (staging → save).

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const STOP = new Set([
  'a', 'an', 'the', 'of', 'for', 'and', 'or', 'to', 'in', 'on', 'with',
  'using', 'via', 'based', 'study', 'approach', 'novel',
]);

export function buildPaperId(p: {
  authors: string[];
  year: number | null;
  title: string;
}): string {
  const firstAuthor = p.authors[0] ?? 'unknown';
  const lastName =
    slugify(firstAuthor.split(/\s+/).pop() ?? firstAuthor) || 'unknown';
  const year = p.year ?? 0;
  const words = slugify(p.title)
    .split('_')
    .filter((w) => w && !STOP.has(w))
    .slice(0, 3)
    .join('_');
  return `${lastName}${year}_${words || 'paper'}`;
}

export interface ConstraintCheck {
  cited: { pass: boolean; detail: string };
  dataset: { pass: boolean; detail: string };
  code: { pass: boolean; detail: string };
}

// 3 ràng buộc cứng AGENTS.md §7 (chỉ là gợi ý cho user, không chặn cứng).
export function checkConstraints(
  p: MergedPaper,
  thresholds: { old: number; mid: number },
  currentYear: number,
): ConstraintCheck {
  const age = p.year ? currentYear - p.year : 99;
  const c = p.citations ?? 0;
  let citePass = false;
  let citeDetail = '';
  if (p.citations == null) {
    citeDetail = 'Không rõ citations (nguồn không cung cấp)';
  } else if (age > 3) {
    citePass = c >= thresholds.old;
    citeDetail = `${c} cite · >3 năm cần ≥${thresholds.old}`;
  } else if (age >= 1) {
    citePass = c >= thresholds.mid;
    citeDetail = `${c} cite · 1–3 năm cần ≥${thresholds.mid}`;
  } else {
    citePass = c >= 5;
    citeDetail = `${c} cite · <1 năm cần rising-star (≥5)`;
  }
  return {
    cited: { pass: citePass, detail: citeDetail },
    dataset: {
      pass: p.datasets.length > 0,
      detail: p.datasets.length
        ? `${p.datasets.length} dataset`
        : 'Chưa rõ dataset (kiểm tra thủ công)',
    },
    code: {
      pass: Boolean(p.code_url),
      detail: p.code_url ? 'Có repo' : 'Chưa rõ code (kiểm tra thủ công)',
    },
  };
}

export interface SaveResult {
  paper_id: string;
  folder: string;
  pdf_downloaded: boolean;
  pdf_error?: string;
}

async function tryDownloadPdf(
  url: string,
  destFile: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetchWithTimeout(url, { timeoutMs: 30000 });
    if (!r.ok) return { ok: false, error: `HTTP ${r.status}` };
    const type = r.headers.get('content-type') ?? '';
    const buf = Buffer.from(await r.arrayBuffer());
    // chấp nhận nếu là pdf hoặc magic %PDF
    const looksPdf =
      type.includes('pdf') || buf.subarray(0, 5).toString('latin1') === '%PDF-';
    if (!looksPdf) return { ok: false, error: 'Link không trả PDF' };
    fs.writeFileSync(destFile, buf);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Lỗi tải' };
  }
}

export async function savePaper(
  p: MergedPaper,
  layer: LayerId,
  opts: { paperId?: string; downloadPdf?: boolean } = {},
): Promise<SaveResult> {
  const layerDef = layerById(layer);
  if (!layerDef) throw new Error(`Layer không hợp lệ: ${layer}`);

  const paperId = (opts.paperId && slugify(opts.paperId)) || buildPaperId(p);
  const folder = path.join(SEARCHED_DIR, layerDef.dir, paperId);
  if (fs.existsSync(folder)) {
    throw new Error(`Paper đã tồn tại: ${paperId}`);
  }
  fs.mkdirSync(folder, { recursive: true });

  let pdfDownloaded = false;
  let pdfError: string | undefined;
  let sourcePdfName: string | null = null;
  if (opts.downloadPdf !== false && p.pdf_url) {
    const dest = path.join(folder, 'source.pdf');
    const res = await tryDownloadPdf(p.pdf_url, dest);
    pdfDownloaded = res.ok;
    pdfError = res.error;
    if (res.ok) sourcePdfName = 'source.pdf';
  }

  const metadata = {
    paper_id: paperId,
    title: p.title,
    authors: p.authors,
    year: p.year,
    venue: p.venue,
    doi: normalizeDoi(p.doi),
    arxiv: p.arxiv,
    url: p.url,
    citations: p.citations ?? 0,
    citations_checked_at: new Date().toISOString(),
    citations_source: p.found_by.includes('semanticscholar')
      ? 'semantic_scholar'
      : p.found_by.includes('openalex')
        ? 'openalex'
        : p.found_by.includes('crossref')
          ? 'crossref'
          : 'UNKNOWN',
    layer,
    layer_uncertain: false,
    dataset_slugs: p.datasets,
    method_slugs: [],
    code_url: p.code_url,
    reproducibility: 0,
    status: 'searched',
    reject_reason: null,
    found_by: p.found_by,
    pdf_url: p.pdf_url,
    source_pdf: sourcePdfName,
    abstract: p.abstract,
  };
  fs.writeFileSync(
    path.join(folder, 'metadata.json'),
    JSON.stringify(metadata, null, 2),
    'utf8',
  );

  return { paper_id: paperId, folder, pdf_downloaded: pdfDownloaded, pdf_error: pdfError };
}
