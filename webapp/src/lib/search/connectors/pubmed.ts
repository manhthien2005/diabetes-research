import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';
import { getEnv } from '../../env';

// PubMed E-utilities (esearch → esummary). Hợp domain y khoa.
// Không key vẫn chạy nhưng NCBI hay chặn IP datacenter (302 → abuse). Có
// PUBMED_API_KEY + tool/email thì ổn định. KHÔNG cung cấp citations.
// LƯU Ý: connector này chưa smoke-test live được trong sandbox (IP bị NCBI chặn)
// — chạy local + điền key sẽ hoạt động.

const ESEARCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const ESUMMARY = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi';
const KEY_ENV = 'PUBMED_API_KEY';

function commonParams(): string {
  const key = getEnv(KEY_ENV);
  const email = getEnv('RESEARCH_EMAIL');
  let p = '&tool=nckh_research_hub';
  if (email) p += `&email=${encodeURIComponent(email)}`;
  if (key) p += `&api_key=${encodeURIComponent(key)}`;
  return p;
}

interface ESummaryDoc {
  uid?: string;
  title?: string;
  pubdate?: string;
  fulljournalname?: string;
  source?: string;
  authors?: { name?: string }[];
  articleids?: { idtype?: string; value?: string }[];
}

function extractDoi(doc: ESummaryDoc): string | null {
  return (
    doc.articleids?.find((a) => a.idtype === 'doi')?.value ?? null
  );
}

export const pubmedConnector: SourceConnector = {
  id: 'pubmed',
  label: 'PubMed',
  requiresKey: KEY_ENV,
  homepage: 'https://pubmed.ncbi.nlm.nih.gov',
  note: 'Y khoa (E-utilities). Nên có PUBMED_API_KEY; không citations. Chạy local ổn nhất.',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    const hasKey = Boolean(getEnv(KEY_ENV));
    try {
      const r = await fetchWithTimeout(
        `${ESEARCH}?db=pubmed&term=test&retmax=1&retmode=json${commonParams()}`,
        { timeoutMs: 8000 },
      );
      const text = await r.text();
      const blocked = text.includes('misuse') || text.includes('<!DOCTYPE');
      if (blocked) {
        return {
          ok: false,
          needsKey: !hasKey,
          message: hasKey
            ? 'NCBI chặn request (thử lại sau)'
            : 'NCBI chặn IP — cần PUBMED_API_KEY',
          latency_ms: Date.now() - start,
        };
      }
      return {
        ok: r.ok,
        needsKey: false,
        message: r.ok
          ? hasKey
            ? 'Kết nối tốt (có key)'
            : 'Kết nối tốt (nên có key cho ổn định)'
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
      const searchUrl = `${ESEARCH}?db=pubmed&term=${encodeURIComponent(
        query,
      )}&retmax=${limit}&retmode=json&sort=relevance${commonParams()}`;
      const sr = await fetchWithTimeout(searchUrl, { timeoutMs: 12000 });
      const stext = await sr.text();
      if (!sr.ok || stext.includes('misuse')) {
        return fail(start, sr.ok ? 'NCBI chặn' : `HTTP ${sr.status}`);
      }
      const sjson = JSON.parse(stext) as {
        esearchresult?: { idlist?: string[] };
      };
      const ids = sjson.esearchresult?.idlist ?? [];
      if (ids.length === 0) {
        return {
          source_id: 'pubmed',
          ok: true,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
        };
      }
      const sumUrl = `${ESUMMARY}?db=pubmed&id=${ids.join(
        ',',
      )}&retmode=json${commonParams()}`;
      const ur = await fetchWithTimeout(sumUrl, { timeoutMs: 12000 });
      const utext = await ur.text();
      if (!ur.ok || utext.includes('misuse')) {
        return fail(start, 'NCBI chặn esummary');
      }
      const ujson = JSON.parse(utext) as {
        result?: Record<string, ESummaryDoc> & { uids?: string[] };
      };
      const result = ujson.result ?? {};
      const uids = (result.uids as string[] | undefined) ?? ids;

      const papers: NormalizedPaper[] = [];
      for (const uid of uids) {
        const doc = result[uid] as ESummaryDoc | undefined;
        if (!doc || !doc.title) continue;
        const doi = extractDoi(doc);
        const year = doc.pubdate ? Number(doc.pubdate.slice(0, 4)) : null;
        papers.push({
          source_id: 'pubmed',
          title: doc.title.replace(/\.$/, ''),
          authors: (doc.authors ?? [])
            .map((a) => a.name)
            .filter((x): x is string => Boolean(x)),
          year: Number.isFinite(year) ? year : null,
          venue: doc.fulljournalname ?? doc.source ?? null,
          doi,
          arxiv: null,
          url: `https://pubmed.ncbi.nlm.nih.gov/${uid}/`,
          pdf_url: null,
          citations: null,
          abstract: null,
          code_url: null,
          datasets: [],
          dedup_key: makeDedupKey({ doi, title: doc.title }),
        });
      }
      return {
        source_id: 'pubmed',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return fail(start, e instanceof Error ? e.message : 'Lỗi search');
    }
  },
};

function fail(start: number, error: string): SearchOutcome {
  return {
    source_id: 'pubmed',
    ok: false,
    papers: [],
    count: 0,
    latency_ms: Date.now() - start,
    error,
  };
}
