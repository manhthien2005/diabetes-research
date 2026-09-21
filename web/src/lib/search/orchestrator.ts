import type { NormalizedPaper, SearchOutcome } from './types';
import { CONNECTORS, getConnector } from './registry';

// Fan-out: bắn song song tới các nguồn đang bật, gom kết quả, dedup theo
// dedup_key NHƯNG vẫn giữ danh sách "nguồn nào tìm ra" để track chất lượng nguồn.

export interface MergedPaper extends NormalizedPaper {
  found_by: string[]; // các source_id cùng trả paper này
}

export interface SearchResponse {
  query: string;
  per_source: SearchOutcome[]; // nguồn trả bao nhiêu, lỗi hay không, latency
  merged: MergedPaper[]; // đã dedup
  total_raw: number; // tổng hit trước dedup
}

// Gộp 2 bản ghi cùng paper: ưu tiên field có dữ liệu (citations, pdf, abstract...).
function mergeInto(base: MergedPaper, extra: NormalizedPaper): void {
  if (base.citations == null && extra.citations != null)
    base.citations = extra.citations;
  if (!base.pdf_url && extra.pdf_url) base.pdf_url = extra.pdf_url;
  if (!base.abstract && extra.abstract) base.abstract = extra.abstract;
  if (!base.doi && extra.doi) base.doi = extra.doi;
  if (!base.arxiv && extra.arxiv) base.arxiv = extra.arxiv;
  if (!base.venue && extra.venue) base.venue = extra.venue;
  if (!base.code_url && extra.code_url) base.code_url = extra.code_url;
  if (base.year == null && extra.year != null) base.year = extra.year;
  if (extra.authors.length > base.authors.length) base.authors = extra.authors;
  if (extra.datasets.length) {
    base.datasets = Array.from(new Set([...base.datasets, ...extra.datasets]));
  }
  if (!base.found_by.includes(extra.source_id))
    base.found_by.push(extra.source_id);
}

/** Gộp + dedup danh sách paper (giữ found_by để track nguồn). Tái dùng cho cả
 *  search thường lẫn auto-discovery streaming. */
export function mergeAll(papers: NormalizedPaper[]): MergedPaper[] {
  const byKey = new Map<string, MergedPaper>();
  for (const p of papers) {
    const existing = byKey.get(p.dedup_key);
    if (existing) mergeInto(existing, p);
    else byKey.set(p.dedup_key, { ...p, found_by: [p.source_id] });
  }
  return Array.from(byKey.values()).sort((a, b) => {
    if (b.found_by.length !== a.found_by.length)
      return b.found_by.length - a.found_by.length;
    if ((b.citations ?? -1) !== (a.citations ?? -1))
      return (b.citations ?? -1) - (a.citations ?? -1);
    return (b.year ?? 0) - (a.year ?? 0);
  });
}

export async function runSearch(
  query: string,
  sourceIds: string[],
  limitPerSource: number,
): Promise<SearchResponse> {
  const connectors = sourceIds
    .map((id) => getConnector(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const outcomes = await Promise.all(
    connectors.map((c) => c.search(query, limitPerSource)),
  );

  const allPapers = outcomes.flatMap((o) => o.papers);
  const merged = mergeAll(allPapers);
  return {
    query,
    per_source: outcomes,
    merged,
    total_raw: allPapers.length,
  };
}

export async function checkAllConnections(ids?: string[]) {
  const list = ids
    ? CONNECTORS.filter((c) => ids.includes(c.id))
    : CONNECTORS;
  return Promise.all(
    list.map(async (c) => ({
      id: c.id,
      label: c.label,
      requiresKey: c.requiresKey,
      homepage: c.homepage,
      note: c.note,
      status: await c.testConnection(),
    })),
  );
}
