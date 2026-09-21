import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';
import { getEnv } from '../../env';

// Springer Nature Meta v2: metadata + full-text các bài Open Access của Springer.
// Cần SPRINGER_API_KEY. Chưa smoke-test live (key đang rỗng). Không citations.

const ENDPOINT = 'https://api.springernature.com/meta/v2/json';
const KEY_ENV = 'SPRINGER_API_KEY';

interface SpringerRecord {
  title?: string;
  creators?: { creator?: string }[];
  publicationDate?: string;
  publicationName?: string;
  doi?: string;
  abstract?: string;
  url?: { value?: string }[];
}

export const springerConnector: SourceConnector = {
  id: 'springer',
  label: 'Springer',
  requiresKey: KEY_ENV,
  homepage: 'https://dev.springernature.com',
  note: 'Metadata + full-text OA của Springer. Cần SPRINGER_API_KEY.',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    const key = getEnv(KEY_ENV);
    if (!key) {
      return {
        ok: false,
        needsKey: true,
        message: 'Chưa có SPRINGER_API_KEY',
        latency_ms: 0,
      };
    }
    try {
      const r = await fetchWithTimeout(
        `${ENDPOINT}?q=test&p=1&api_key=${encodeURIComponent(key)}`,
        { timeoutMs: 9000 },
      );
      return {
        ok: r.ok,
        needsKey: false,
        message: r.ok
          ? 'Kết nối tốt (có key)'
          : r.status === 401 || r.status === 403
            ? 'Key không hợp lệ'
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
    const key = getEnv(KEY_ENV);
    if (!key) {
      return {
        source_id: 'springer',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: 0,
        error: 'Chưa có SPRINGER_API_KEY',
      };
    }
    try {
      const url = `${ENDPOINT}?q=${encodeURIComponent(
        query,
      )}&p=${limit}&api_key=${encodeURIComponent(key)}`;
      const r = await fetchWithTimeout(url, { timeoutMs: 15000 });
      if (!r.ok) {
        return {
          source_id: 'springer',
          ok: false,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
          error: `HTTP ${r.status}`,
        };
      }
      const data = (await r.json()) as { records?: SpringerRecord[] };
      const papers = (data.records ?? [])
        .filter((rec) => rec.title)
        .map<NormalizedPaper>((rec) => {
          const doi = rec.doi ?? null;
          const year = rec.publicationDate
            ? Number(rec.publicationDate.slice(0, 4))
            : null;
          return {
            source_id: 'springer',
            title: rec.title!.trim(),
            authors: (rec.creators ?? [])
              .map((c) => c.creator)
              .filter((x): x is string => Boolean(x)),
            year: Number.isFinite(year) ? year : null,
            venue: rec.publicationName ?? null,
            doi,
            arxiv: null,
            url: rec.url?.[0]?.value ?? (doi ? `https://doi.org/${doi}` : null),
            pdf_url: null,
            citations: null,
            abstract: rec.abstract ?? null,
            code_url: null,
            datasets: [],
            dedup_key: makeDedupKey({ doi, title: rec.title! }),
          };
        });
      return {
        source_id: 'springer',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        source_id: 'springer',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: Date.now() - start,
        error: e instanceof Error ? e.message : 'Lỗi search',
      };
    }
  },
};
