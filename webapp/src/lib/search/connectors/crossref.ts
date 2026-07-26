import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';
import { getEnv } from '../../env';

// Crossref: metadata DOI khổng lồ, miễn phí, không cần key. RESEARCH_EMAIL →
// polite pool. is-referenced-by-count ≈ citations. Bù vào chỗ Papers with Code
// (API đã ngừng hoạt động: paperswithcode.com redirect sang Hugging Face).

const ENDPOINT = 'https://api.crossref.org/works';

function politeParam(): string {
  const email = getEnv('RESEARCH_EMAIL');
  return email ? `&mailto=${encodeURIComponent(email)}` : '';
}

interface CRItem {
  title?: string[];
  author?: { given?: string; family?: string }[];
  issued?: { 'date-parts'?: number[][] };
  'container-title'?: string[];
  DOI?: string;
  URL?: string;
  'is-referenced-by-count'?: number;
  abstract?: string;
  link?: { URL?: string; 'content-type'?: string }[];
}

function mapItem(it: CRItem): NormalizedPaper {
  const title = (it.title?.[0] ?? '').trim();
  const doi = it.DOI ?? null;
  const year = it.issued?.['date-parts']?.[0]?.[0] ?? null;
  const authors = (it.author ?? [])
    .map((a) => [a.given, a.family].filter(Boolean).join(' ').trim())
    .filter(Boolean);
  const pdfLink =
    it.link?.find((l) => l['content-type'] === 'application/pdf')?.URL ?? null;
  const abstract = it.abstract
    ? it.abstract.replace(/<[^>]+>/g, '').trim()
    : null;
  return {
    source_id: 'crossref',
    title,
    authors,
    year: typeof year === 'number' ? year : null,
    venue: it['container-title']?.[0] ?? null,
    doi,
    arxiv: null,
    url: it.URL ?? (doi ? `https://doi.org/${doi}` : null),
    pdf_url: pdfLink,
    citations:
      typeof it['is-referenced-by-count'] === 'number'
        ? it['is-referenced-by-count']
        : null,
    abstract,
    code_url: null,
    datasets: [],
    dedup_key: makeDedupKey({ doi, title }),
  };
}

export const crossrefConnector: SourceConnector = {
  id: 'crossref',
  label: 'Crossref',
  requiresKey: null,
  homepage: 'https://www.crossref.org',
  note: 'Metadata DOI + citations (referenced-by). Miễn phí; dùng RESEARCH_EMAIL.',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    try {
      const r = await fetchWithTimeout(
        `${ENDPOINT}?rows=1${politeParam()}`,
        { timeoutMs: 8000 },
      );
      return {
        ok: r.ok,
        needsKey: false,
        message: r.ok ? 'Kết nối tốt' : `HTTP ${r.status}`,
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
      )}&rows=${limit}&select=title,author,issued,container-title,DOI,URL,is-referenced-by-count,abstract,link${politeParam()}`;
      const r = await fetchWithTimeout(url, { timeoutMs: 14000 });
      if (!r.ok) {
        return {
          source_id: 'crossref',
          ok: false,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
          error: `HTTP ${r.status}`,
        };
      }
      const data = (await r.json()) as { message?: { items?: CRItem[] } };
      const papers = (data.message?.items ?? [])
        .map(mapItem)
        .filter((p) => p.title);
      return {
        source_id: 'crossref',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        source_id: 'crossref',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: Date.now() - start,
        error: e instanceof Error ? e.message : 'Lỗi search',
      };
    }
  },
};
