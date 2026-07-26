import {
  type SourceConnector,
  type SearchOutcome,
  type ConnectionStatus,
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from '../types';

// arXiv: API Atom XML, miễn phí, KHÔNG cần key. Parse XML bằng regex nhẹ
// (tránh thêm dependency). Chỉ lấy các field cần thiết.

const ENDPOINT = 'https://export.arxiv.org/api/query';

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseEntries(xml: string): NormalizedPaper[] {
  const entries = xml.split('<entry>').slice(1);
  const out: NormalizedPaper[] = [];
  for (const raw of entries) {
    const entry = raw.split('</entry>')[0];
    const title = decodeXml(/<title>([\s\S]*?)<\/title>/.exec(entry)?.[1] ?? '');
    if (!title) continue;
    const summary = decodeXml(
      /<summary>([\s\S]*?)<\/summary>/.exec(entry)?.[1] ?? '',
    );
    const idUrl = (/<id>([\s\S]*?)<\/id>/.exec(entry)?.[1] ?? '').trim();
    const arxivId = idUrl.replace(/^https?:\/\/arxiv\.org\/abs\//, '').replace(
      /v\d+$/,
      '',
    );
    const published = /<published>(\d{4})/.exec(entry)?.[1];
    const year = published ? Number(published) : null;
    const authors = Array.from(
      entry.matchAll(/<name>([\s\S]*?)<\/name>/g),
    ).map((m) => decodeXml(m[1]));
    const doi = /<arxiv:doi>([\s\S]*?)<\/arxiv:doi>/.exec(entry)?.[1] ?? null;
    const pdfUrl =
      /<link[^>]*title="pdf"[^>]*href="([^"]+)"/.exec(entry)?.[1] ??
      (arxivId ? `https://arxiv.org/pdf/${arxivId}` : null);

    out.push({
      source_id: 'arxiv',
      title,
      authors,
      year,
      venue: 'arXiv',
      doi,
      arxiv: arxivId || null,
      url: idUrl || null,
      pdf_url: pdfUrl,
      citations: null, // arXiv không cung cấp
      abstract: summary || null,
      code_url: null,
      datasets: [],
      dedup_key: makeDedupKey({ doi, arxiv: arxivId, title }),
    });
  }
  return out;
}

export const arxivConnector: SourceConnector = {
  id: 'arxiv',
  label: 'arXiv',
  requiresKey: null,
  homepage: 'https://arxiv.org',
  note: 'Preprint CS/ML/stat — miễn phí, không cần key. Không có citations.',

  async testConnection(): Promise<ConnectionStatus> {
    const start = Date.now();
    try {
      const r = await fetchWithTimeout(
        `${ENDPOINT}?search_query=all:test&max_results=1`,
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
      const url = `${ENDPOINT}?search_query=${encodeURIComponent(
        `all:${query}`,
      )}&start=0&max_results=${limit}&sortBy=relevance`;
      const r = await fetchWithTimeout(url, { timeoutMs: 14000 });
      if (!r.ok) {
        return {
          source_id: 'arxiv',
          ok: false,
          papers: [],
          count: 0,
          latency_ms: Date.now() - start,
          error: `HTTP ${r.status}`,
        };
      }
      const xml = await r.text();
      const papers = parseEntries(xml);
      return {
        source_id: 'arxiv',
        ok: true,
        papers,
        count: papers.length,
        latency_ms: Date.now() - start,
      };
    } catch (e) {
      return {
        source_id: 'arxiv',
        ok: false,
        papers: [],
        count: 0,
        latency_ms: Date.now() - start,
        error: e instanceof Error ? e.message : 'Lỗi search',
      };
    }
  },
};
