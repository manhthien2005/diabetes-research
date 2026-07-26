import fs from 'node:fs';
import path from 'node:path';
import {
  SEARCHED_DIR,
  CHOSEN_DIR,
  LAYERS,
  layerByDir,
  type LayerId,
} from './paths';

// Đọc kho paper TRỰC TIẾP từ filesystem (searched_papers/ + chosed_papers/).
// metadata.json trên đĩa có thể thiếu field → đọc defensive, suy Layer từ folder.

export interface PaperMeta {
  paper_id: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string | null;
  doi: string | null;
  arxiv: string | null;
  citations: number | null;
  code_url: string | null;
  datasets: string[];
  source_pdf: string | null;
  page_count: number | null;
  // suy diễn / bổ sung
  layer: LayerId;
  layer_dir: string;
  is_chosen: boolean; // có bản tương ứng trong chosed_papers/ không
  has_analysis: boolean;
  has_extracted: boolean;
  has_extracted_vi: boolean;
  has_notes: boolean;
  has_highlights: boolean;
  has_pdf: boolean;
  folder: string; // đường dẫn tuyệt đối tới folder paper
  folderName: string; // tên folder (= segment cuối) để dựng link
  analysis_status: 'none' | 'queued' | 'analyzed';
  verdict: 'strong' | 'maybe' | 'weak' | null; // từ summary.json (Claude ghi)
  verdict_reason: string | null;
}

/** summary.json — Claude ghi khi phân tích sâu (schema ở skill paper-analyzer). */
export interface PaperSummary {
  paper_id?: string;
  layer?: number;
  contribution?: string;
  method?: string;
  best_metric?: string;
  datasets?: string[];
  has_code?: boolean;
  code_url?: string | null;
  reproducible?: string;
  vs_baseline?: string;
  gap?: string;
  verdict?: string;
  verdict_reason?: string;
}

export function readPaperSummary(folder: string): PaperSummary | null {
  const data = safeReadJSON(path.join(folder, 'summary.json'));
  return data ? (data as PaperSummary) : null;
}

function asVerdict(v: unknown): 'strong' | 'maybe' | 'weak' | null {
  return v === 'strong' || v === 'maybe' || v === 'weak' ? v : null;
}

function safeReadJSON(file: string): Record<string, unknown> | null {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function asString(v: unknown): string | null {
  return typeof v === 'string' && v.length > 0 ? v : null;
}
function asNumber(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}
function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

function exists(p: string): boolean {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

/** Tập paper_id đã được promote sang chosed_papers/ (so theo tên folder paper). */
function chosenPaperIds(): Set<string> {
  const ids = new Set<string>();
  for (const layer of LAYERS) {
    const dir = path.join(CHOSEN_DIR, layer.dir);
    if (!exists(dir)) continue;
    for (const entry of safeListDirs(dir)) {
      ids.add(entry);
      // chosed_papers/ có thể chỉ chứa PDF lẻ → cũng lấy stem làm id phụ
    }
    // ngoài folder, chosed có thể là file .pdf trực tiếp
    for (const f of safeListFiles(dir)) {
      if (f.toLowerCase().endsWith('.pdf')) ids.add(path.parse(f).name);
    }
  }
  return ids;
}

function safeListDirs(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
}
function safeListFiles(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => d.name);
  } catch {
    return [];
  }
}

function readPaperFolder(
  layerDir: string,
  folderName: string,
  chosen: Set<string>,
): PaperMeta | null {
  const layer = layerByDir(layerDir);
  if (!layer) return null;
  const folder = path.join(SEARCHED_DIR, layerDir, folderName);
  const meta = safeReadJSON(path.join(folder, 'metadata.json')) ?? {};

  // source_pdf trong metadata có thể lệch tên thật trên đĩa (vd 'source.pdf').
  // Luôn resolve về file PDF THẬT: ưu tiên tên metadata nếu tồn tại, else dò đĩa.
  const metaPdf = asString(meta.source_pdf);
  const diskPdf = safeListFiles(folder).find((f) =>
    f.toLowerCase().endsWith('.pdf'),
  );
  const sourcePdf =
    metaPdf && exists(path.join(folder, metaPdf)) ? metaPdf : diskPdf ?? null;

  const hasAnalysis =
    exists(path.join(folder, 'analysis.html')) ||
    exists(path.join(folder, 'analysis.v2.html'));
  // analysis_status: có analysis.html → analyzed; else theo metadata; else none
  const rawStatus = asString(meta.analysis_status);
  const analysisStatus: 'none' | 'queued' | 'analyzed' = hasAnalysis
    ? 'analyzed'
    : rawStatus === 'queued'
      ? 'queued'
      : 'none';
  const summary = readPaperSummary(folder);

  return {
    paper_id: asString(meta.paper_id) ?? folderName,
    title: asString(meta.title) ?? folderName,
    authors: asStringArray(meta.authors),
    year: asNumber(meta.year),
    venue: asString(meta.venue),
    doi: asString(meta.doi),
    arxiv: asString(meta.arxiv),
    citations: asNumber(meta.citations),
    code_url: asString(meta.code_url),
    datasets: asStringArray(
      meta.datasets_mentioned ?? meta.dataset_slugs ?? meta.datasets,
    ),
    source_pdf: sourcePdf,
    page_count: asNumber(meta.page_count),
    layer: layer.id,
    layer_dir: layerDir,
    is_chosen: chosen.has(folderName) || chosen.has(asString(meta.paper_id) ?? ''),
    has_analysis: hasAnalysis,
    has_extracted: exists(path.join(folder, 'extracted.md')),
    has_extracted_vi: exists(path.join(folder, 'extracted.vi.md')),
    has_notes: exists(path.join(folder, 'notes.md')),
    has_highlights: exists(path.join(folder, 'highlights.json')),
    has_pdf: Boolean(sourcePdf) && exists(path.join(folder, sourcePdf ?? '')),
    folder,
    folderName,
    analysis_status: analysisStatus,
    verdict: asVerdict(summary?.verdict),
    verdict_reason: asString(summary?.verdict_reason),
  };
}

/** Tất cả paper trong searched_papers/, group sẵn không cần — trả phẳng. */
export function listAllPapers(): PaperMeta[] {
  const chosen = chosenPaperIds();
  const out: PaperMeta[] = [];
  for (const layer of LAYERS) {
    const layerPath = path.join(SEARCHED_DIR, layer.dir);
    for (const folderName of safeListDirs(layerPath)) {
      const p = readPaperFolder(layer.dir, folderName, chosen);
      if (p) out.push(p);
    }
  }
  return out;
}

export interface LayerBucket {
  layer: (typeof LAYERS)[number];
  papers: PaperMeta[];
}

/** Paper group theo Layer (cho trang Library). */
export function listPapersByLayer(): LayerBucket[] {
  const all = listAllPapers();
  return LAYERS.map((layer) => ({
    layer,
    papers: all
      .filter((p) => p.layer === layer.id)
      .sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0)),
  }));
}

/** 1 paper theo layer dir + folder name. */
export function getPaper(
  layerDir: string,
  folderName: string,
): PaperMeta | null {
  return readPaperFolder(layerDir, folderName, chosenPaperIds());
}

export function libraryStats() {
  const all = listAllPapers();
  return {
    total: all.length,
    chosen: all.filter((p) => p.is_chosen).length,
    withCode: all.filter((p) => p.code_url).length,
    withAnalysis: all.filter((p) => p.has_analysis).length,
    byLayer: LAYERS.map((l) => {
      const inLayer = all.filter((p) => p.layer === l.id);
      return {
        id: l.id,
        name: l.name,
        count: inLayer.length,
        chosen: inLayer.filter((p) => p.is_chosen).length,
        analyzed: inLayer.filter((p) => p.analysis_status === 'analyzed').length,
      };
    }),
  };
}
