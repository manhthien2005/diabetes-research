import {
  type NormalizedPaper,
  makeDedupKey,
  fetchWithTimeout,
} from './types';
import { getEnv } from '../env';

// Tìm bài TƯƠNG ĐỒNG qua OpenAlex related_works (thuật toán của OpenAlex),
// dựa trên DOI của 1 paper anh đã chọn. Không cần key.

const OA = 'https://api.openalex.org/works';

function mailto(): string {
  const email = getEnv('RESEARCH_EMAIL');
  return email ? `&mailto=${encodeURIComponent(email)}` : '';
}

interface OAWork {
  display_name?: string;
  publication_year?: number;
  doi?: string | null;
  cited_by_count?: number;
  authorships?: { author?: { display_name?: string } }[];
  primary_location?: {
    source?: { display_name?: string };
    pdf_url?: string | null;
    landing_page_url?: string | null;
  };
  best_oa_location?: { pdf_url?: string | null };
  abstract_inverted_index?: Record<string, number[]>;
}

function rebuildAbstract(inv?: Record<string, number[]>): string | null {
  if (!inv) return null;
  const slots: string[] = [];
  for (const [w, ps] of Object.entries(inv)) for (const p of ps) slots[p] = w;
  return slots.filter(Boolean).join(' ').trim() || null;
}

function mapWork(w: OAWork): NormalizedPaper {
  const title = w.display_name ?? '';
  const doi = w.doi ?? null;
  return {
    source_id: 'openalex',
    title,
    authors: (w.authorships ?? [])
      .map((a) => a.author?.display_name)
      .filter((x): x is string => Boolean(x)),
    year: w.publication_year ?? null,
    venue: w.primary_location?.source?.display_name ?? null,
    doi,
    arxiv: null,
    url: w.primary_location?.landing_page_url ?? (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//, '')}` : null),
    pdf_url: w.best_oa_location?.pdf_url ?? w.primary_location?.pdf_url ?? null,
    citations: typeof w.cited_by_count === 'number' ? w.cited_by_count : null,
    abstract: rebuildAbstract(w.abstract_inverted_index),
    code_url: null,
    datasets: [],
    dedup_key: makeDedupKey({ doi, title }),
  };
}

/** Lấy danh sách related_works (short IDs) từ DOI. */
export async function relatedWorkIds(doi: string): Promise<string[]> {
  const clean = doi.replace(/^https?:\/\/doi\.org\//, '');
  const r = await fetchWithTimeout(
    `${OA}/doi:${encodeURIComponent(clean)}?select=related_works${mailto()}`,
    { timeoutMs: 12000 },
  );
  if (!r.ok) return [];
  const data = (await r.json()) as { related_works?: string[] };
  return (data.related_works ?? []).map((u) =>
    u.replace(/^https?:\/\/openalex\.org\//, ''),
  );
}

/** Batch-fetch các work theo short IDs (filter=openalex:W1|W2). OpenAlex giới
 *  hạn ~50 giá trị mỗi filter OR → chia batch, gọi tuần tự cho lịch sự. */
export async function fetchWorks(ids: string[]): Promise<NormalizedPaper[]> {
  if (ids.length === 0) return [];
  const out: NormalizedPaper[] = [];
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const filter = `openalex:${batch.join('|')}`;
    const r = await fetchWithTimeout(
      `${OA}?filter=${encodeURIComponent(filter)}&per_page=${batch.length}${mailto()}`,
      { timeoutMs: 14000 },
    );
    if (!r.ok) continue;
    const data = (await r.json()) as { results?: OAWork[] };
    out.push(...(data.results ?? []).map(mapWork).filter((p) => p.title));
  }
  return out;
}

/** Tìm bài tương đồng với 1 DOI: related_works → fetch chi tiết. */
export async function findSimilarByDoi(
  doi: string,
  limit: number,
): Promise<NormalizedPaper[]> {
  const ids = await relatedWorkIds(doi);
  if (ids.length === 0) return [];
  return fetchWorks(ids.slice(0, limit));
}

// ---- Snowballing: duyệt đồ thị trích dẫn (kỹ thuật systematic review) ----

/** Lấy WID + referenced_works (backward) từ DOI trong 1 call. */
async function workIdAndRefs(
  doi: string,
): Promise<{ wid: string | null; refs: string[] }> {
  const clean = doi.replace(/^https?:\/\/doi\.org\//, '');
  const r = await fetchWithTimeout(
    `${OA}/doi:${encodeURIComponent(clean)}?select=id,referenced_works${mailto()}`,
    { timeoutMs: 12000 },
  );
  if (!r.ok) return { wid: null, refs: [] };
  const data = (await r.json()) as { id?: string; referenced_works?: string[] };
  return {
    wid: data.id ? data.id.replace(/^https?:\/\/openalex\.org\//, '') : null,
    refs: (data.referenced_works ?? []).map((u) =>
      u.replace(/^https?:\/\/openalex\.org\//, ''),
    ),
  };
}

/** Forward: các bài TRÍCH DẪN work này (sort theo citations giảm dần). */
async function citingWorks(wid: string, limit: number): Promise<NormalizedPaper[]> {
  const r = await fetchWithTimeout(
    `${OA}?filter=cites:${wid}&per_page=${limit}&sort=cited_by_count:desc${mailto()}`,
    { timeoutMs: 14000 },
  );
  if (!r.ok) return [];
  const data = (await r.json()) as { results?: OAWork[] };
  return (data.results ?? []).map(mapWork).filter((p) => p.title);
}

/**
 * Snowball 1 hop từ DOI: backward (references) + forward (citations).
 * Trả về kèm cờ direction để UI/log biết nguồn gốc.
 */
export async function snowballFromDoi(
  doi: string,
  perDirection: number,
): Promise<{ backward: NormalizedPaper[]; forward: NormalizedPaper[] }> {
  const { wid, refs } = await workIdAndRefs(doi);
  // Backward: refs nằm theo thứ tự reference list (không phải độ liên quan)
  // → fetch rộng (tối đa 100), rank theo citations rồi mới cắt perDirection.
  const [backwardAll, forward] = await Promise.all([
    refs.length ? fetchWorks(refs.slice(0, 100)) : Promise.resolve([]),
    wid ? citingWorks(wid, perDirection) : Promise.resolve([]),
  ]);
  const backward = backwardAll
    .sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0))
    .slice(0, perDirection);
  return { backward, forward };
}
