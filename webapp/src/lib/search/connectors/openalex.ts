import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';
import { getEnv } from '../../env';

// OpenAlex: 250M+ works, miễn phí. RESEARCH_EMAIL → "polite pool" (limit cao).
// Cung cấp citations (cited_by_count) + OA pdf url + reconstruct abstract.

const ENDPOINT = 'https://api.openalex.org/works';

function mailto(): string {
  const email = getEnv('RESEARCH_EMAIL');
  return email ? `&mailto=${encodeURIComponent(email)}` : '';
}

interface OAAuthorship {
  author?: { display_name?: string };
}
interface OAWork {
  display_name?: string;
  publication_year?: number;
  doi?: string | null;
  cited_by_count?: number;
  authorships?: OAAuthorship[];
  primary_location?: {
    source?: { display_name?: string };
    pdf_url?: string | null;
    landing_page_url?: string | null;
  };
  best_oa_location?: { pdf_url?: string | null };
  ids?: { openalex?: string };
  abstract_inverted_index?: Record<string, number[]>;
}

function rebuildAbstract(
  inv: Record<string, number[]> | undefined,
): string | null {
  if (!inv) return null;
  const slots: string[] = [];
  for (const [word, positions] of Object.entries(inv)) {
    for (const pos of positions) slots[pos] = word;
  }
  const text = slots.filter(Boolean).join(' ').trim();
  return text || null;
}

function mapWork(w: OAWork): NormalizedPaper {
  const title = w.display_name ?? '';
  const doi = w.doi ?? null;
  const authors = (w.authorships ?? [])
    .map((a) => a.author?.display_name)
    .filter((x): x is string => Boolean(x));
  const pdfUrl =
    w.best_oa_location?.pdf_url ?? w.primary_location?.pdf_url ?? null;
  return {
    source_id: 'openalex',
    title,
    authors,
    year: w.publication_year ?? null,
    venue: w.primary_location?.source?.display_name ?? null,
    doi,
    arxiv: null,
    url:
      w.primary_location?.landing_page_url ??
      (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//, '')}` : null),
    pdf_url: pdfUrl,
    citations: typeof w.cited_by_count === 'number' ? w.cited_by_count : null,
    abstract: rebuildAbstract(w.abstract_inverted_index),
    code_url: null,
    datasets: [],
    dedup_key: makeDedupKey({ doi, title }),
  };
}

export const openalexConnector: SourceConnector = {
  id: 'openalex',
  label: 'OpenAlex',
  requiresKey: null,
  homepage: 'https://openalex.org',
  note: 'Metadata học thuật khổng lồ + citations. Dùng RESEARCH_EMAIL cho polite pool.',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    try {
      const r = await fetchWithTimeout(
        `${ENDPOINT}?per_page=1${mailto()}`,
        { timeoutMs: 8000 },
      );
      const hasEmail = Boolean(getEnv('RESEARCH_EMAIL'));
      return {
        ok: r.ok,
        needsKey: false,
        message: r.ok
          ? hasEmail
            ? 'Kết nối tốt (polite pool)'
            : 'Kết nối tốt (nên điền RESEARCH_EMAIL)'
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
      const url = `${ENDPOINT}?search=${encodeURIComponent(
        query,
      )}&per_page=${limit}&sort=relevance_score:desc${mailto()}`;
      const r = await fetchWithTimeout(url, { timeoutMs: 14000 });
      if (!r.ok) {
        return {
          source_id: 'openalex',
          ok: false,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
          error: `HTTP ${r.status}`,
        };
      }
      const data = (await r.json()) as { results?: OAWork[] };
      const papers = (data.results ?? []).map(mapWork).filter((p) => p.title);
      return {
        source_id: 'openalex',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        source_id: 'openalex',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: Date.now() - start,
        error: e instanceof Error ? e.message : 'Lỗi search',
      };
    }
  },
};
