import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';
import { getEnv } from '../../env';

// CORE v3: tìm bản full-text Open Access hợp pháp (downloadUrl) — đỡ phải tự tải
// PDF. Cần CORE_API_KEY (Bearer). Chưa smoke-test live (key đang rỗng).

const ENDPOINT = 'https://api.core.ac.uk/v3/search/works';
const KEY_ENV = 'CORE_API_KEY';

function authHeader(): HeadersInit | undefined {
  const key = getEnv(KEY_ENV);
  return key ? { Authorization: `Bearer ${key}` } : undefined;
}

interface CoreWork {
  title?: string;
  authors?: { name?: string }[];
  yearPublished?: number;
  publisher?: string;
  doi?: string;
  downloadUrl?: string;
  abstract?: string;
  citationCount?: number;
}

export const coreConnector: SourceConnector = {
  id: 'core',
  label: 'CORE',
  requiresKey: KEY_ENV,
  homepage: 'https://core.ac.uk',
  note: 'Full-text Open Access (downloadUrl). Cần CORE_API_KEY (Bearer).',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    const headers = authHeader();
    if (!headers) {
      return {
        ok: false,
        needsKey: true,
        message: 'Chưa có CORE_API_KEY',
        latency_ms: 0,
      };
    }
    try {
      const r = await fetchWithTimeout(
        `${ENDPOINT}?q=test&limit=1`,
        { headers, timeoutMs: 9000 },
      );
      return {
        ok: r.ok,
        needsKey: false,
        message: r.ok
          ? 'Kết nối tốt (có key)'
          : r.status === 401
            ? 'Key không hợp lệ (401)'
            : `HTTP ${r.status}`,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        ok: false,
        needsKey: false,
        message: e instanceof Error ? e.message : 'Lỗi kết nối',
        latency_ms: Date.now() - start,
      };
    }
  },

  async search(query: string, limit: number): Promise<SearchOutcome> {
    const start = Date.now();
    const headers = authHeader();
    if (!headers) {
      return {
        source_id: 'core',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: 0,
        error: 'Chưa có CORE_API_KEY',
      };
    }
    try {
      const url = `${ENDPOINT}?q=${encodeURIComponent(query)}&limit=${limit}`;
      const r = await fetchWithTimeout(url, { headers, timeoutMs: 15000 });
      if (!r.ok) {
        return {
          source_id: 'core',
          ok: false,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
          error: `HTTP ${r.status}`,
        };
      }
      const data = (await r.json()) as { results?: CoreWork[] };
      const papers = (data.results ?? [])
        .filter((w) => w.title)
        .map<NormalizedPaper>((w) => {
          const doi = w.doi ?? null;
          return {
            source_id: 'core',
            title: w.title!,
            authors: (w.authors ?? [])
              .map((a) => a.name)
              .filter((x): x is string => Boolean(x)),
            year: w.yearPublished ?? null,
            venue: w.publisher ?? null,
            doi,
            arxiv: null,
            url: doi ? `https://doi.org/${doi}` : (w.downloadUrl ?? null),
            pdf_url: w.downloadUrl ?? null,
            citations: typeof w.citationCount === 'number' ? w.citationCount : null,
            abstract: w.abstract ?? null,
            code_url: null,
            datasets: [],
            dedup_key: makeDedupKey({ doi, title: w.title! }),
          };
        });
      return {
        source_id: 'core',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        source_id: 'core',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: Date.now() - start,
        error: e instanceof Error ? e.message : 'Lỗi search',
      };
    }
  },
};
