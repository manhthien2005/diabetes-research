import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';
import { getEnv } from '../../env';

// Semantic Scholar: citations + TLDR + OA pdf. Key (x-api-key) là TÙY CHỌN
// nhưng không có key rất hay 429. Connector vẫn chạy không key (báo rõ).

const ENDPOINT = 'https://api.semanticscholar.org/graph/v1/paper/search';
const FIELDS =
  'title,year,venue,externalIds,citationCount,abstract,openAccessPdf,authors';
const KEY_ENV = 'SEMANTIC_SCHOLAR_API_KEY';

function headers(): HeadersInit {
  const key = getEnv(KEY_ENV);
  return key ? { 'x-api-key': key } : {};
}

interface S2Paper {
  title?: string;
  year?: number | null;
  venue?: string | null;
  citationCount?: number | null;
  abstract?: string | null;
  externalIds?: { DOI?: string; ArXiv?: string };
  openAccessPdf?: { url?: string } | null;
  authors?: { name?: string }[];
}

function mapPaper(p: S2Paper): NormalizedPaper {
  const title = p.title ?? '';
  const doi = p.externalIds?.DOI ?? null;
  const arxiv = p.externalIds?.ArXiv ?? null;
  return {
    source_id: 'semanticscholar',
    title,
    authors: (p.authors ?? [])
      .map((a) => a.name)
      .filter((x): x is string => Boolean(x)),
    year: p.year ?? null,
    venue: p.venue ?? null,
    doi,
    arxiv,
    url: doi
      ? `https://doi.org/${doi}`
      : arxiv
        ? `https://arxiv.org/abs/${arxiv}`
        : null,
    pdf_url: p.openAccessPdf?.url ?? null,
    citations: typeof p.citationCount === 'number' ? p.citationCount : null,
    abstract: p.abstract ?? null,
    code_url: null,
    datasets: [],
    dedup_key: makeDedupKey({ doi, arxiv, title }),
  };
}

export const semanticScholarConnector: SourceConnector = {
  id: 'semanticscholar',
  label: 'Semantic Scholar',
  requiresKey: KEY_ENV,
  homepage: 'https://www.semanticscholar.org',
  note: 'Citations + TLDR + OA PDF. Không key vẫn chạy nhưng hay bị 429.',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    const hasKey = Boolean(getEnv(KEY_ENV));
    try {
      const r = await fetchWithTimeout(
        `${ENDPOINT}?query=test&limit=1&fields=title`,
        { headers: headers(), timeoutMs: 8000 },
      );
      if (r.status === 429) {
        return {
          ok: false,
          needsKey: !hasKey,
          message: hasKey
            ? 'Bị rate-limit (429) dù có key'
            : 'Bị rate-limit (429) — nên xin API key',
          latency_ms: Date.now() - start,
        };
      }
      return {
        ok: r.ok,
        needsKey: false,
        message: r.ok
          ? hasKey
            ? 'Kết nối tốt (có key)'
            : 'Kết nối tốt (chưa có key — dễ 429)'
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
    try {
      const url = `${ENDPOINT}?query=${encodeURIComponent(
        query,
      )}&limit=${limit}&fields=${FIELDS}`;
      const r = await fetchWithTimeout(url, {
        headers: headers(),
        timeoutMs: 14000,
      });
      if (!r.ok) {
        return {
          source_id: 'semanticscholar',
          ok: false,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
          error: r.status === 429 ? 'Rate-limited (429)' : `HTTP ${r.status}`,
        };
      }
      const data = (await r.json()) as { data?: S2Paper[] };
      const papers = (data.data ?? []).map(mapPaper).filter((p) => p.title);
      return {
        source_id: 'semanticscholar',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        source_id: 'semanticscholar',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: Date.now() - start,
        error: e instanceof Error ? e.message : 'Lỗi search',
      };
    }
  },
};
