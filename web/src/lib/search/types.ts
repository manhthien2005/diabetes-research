// Kết quả search đã CHUẨN HOÁ — mọi connector trả về cùng shape này.
// Nhờ vậy fan-out + dedup + render + ghi metadata.json đều thống nhất.

export interface NormalizedPaper {
  source_id: string; // nguồn tìm ra (arxiv, openalex...)
  title: string;
  authors: string[];
  year: number | null;
  venue: string | null;
  doi: string | null;
  arxiv: string | null;
  url: string | null; // landing page
  pdf_url: string | null; // link PDF tải được (nếu có OA)
  citations: number | null;
  abstract: string | null;
  code_url: string | null; // Papers with Code map sẵn
  datasets: string[];
  // khoá dedup ổn định (doi chuẩn hoá > arxiv > title chuẩn hoá)
  dedup_key: string;
}

export interface ConnectionStatus {
  ok: boolean;
  needsKey: boolean; // nguồn này cần key mà chưa có
  message: string; // mô tả ngắn (tiếng Việt)
  latency_ms?: number;
}

export interface SearchOutcome {
  source_id: string;
  ok: boolean;
  papers: NormalizedPaper[];
  count: number;
  latency_ms: number;
  error?: string;
}

export interface SourceConnector {
  id: string; // 'arxiv'
  label: string; // 'arXiv'
  requiresKey: string | null; // tên biến env, null nếu không cần
  homepage: string;
  note: string; // mô tả ngắn cho UI
  /** Kiểm tra kết nối (ping nhẹ). KHÔNG ném — luôn trả ConnectionStatus. */
  testConnection(): Promise<ConnectionStatus>;
  /** Tìm kiếm. KHÔNG ném — lỗi gói trong SearchOutcome.ok=false. */
  search(query: string, limit: number): Promise<SearchOutcome>;
}

// ---- Helpers chuẩn hoá ----

export function normalizeDoi(doi: string | null | undefined): string | null {
  if (!doi) return null;
  let d = doi.trim().toLowerCase();
  d = d.replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
  d = d.replace(/^doi:/, '');
  return d || null;
}

export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function makeDedupKey(p: {
  doi?: string | null;
  arxiv?: string | null;
  title: string;
}): string {
  const doi = normalizeDoi(p.doi);
  if (doi) return `doi:${doi}`;
  if (p.arxiv) return `arxiv:${p.arxiv.trim().toLowerCase()}`;
  return `title:${normalizeTitle(p.title)}`;
}

/** fetch có timeout, trả null nếu lỗi/timeout (connector tự xử lý). */
export async function fetchWithTimeout(
  url: string,
  opts: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 12000, ...rest } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
