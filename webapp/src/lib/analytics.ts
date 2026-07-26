import { getDb } from './db';
import { CONNECTORS } from './search/registry';

// Tính "chất lượng nguồn" từ lịch sử search trong SQLite.
// Mục tiêu của anh: biết nguồn nào cung cấp paper chất lượng để ƯU TIÊN.

export interface SourceScore {
  source_id: string;
  label: string;
  runs: number; // số lần search có gọi nguồn này
  ok_runs: number; // số lần nguồn trả về OK
  error_runs: number;
  total_hits: number; // tổng paper nguồn này đóng góp (sau merge)
  saved_hits: number; // trong đó bao nhiêu được anh lưu
  save_rate: number; // saved / total_hits
  avg_citations: number | null; // citations TB của paper nguồn tìm ra
  avg_latency_ms: number | null;
  reliability: number; // ok_runs / runs
}

function labelOf(id: string): string {
  return CONNECTORS.find((c) => c.id === id)?.label ?? id;
}

export function getSourceScores(): SourceScore[] {
  const db = getDb();

  const statRows = db
    .prepare(
      `SELECT source_id,
              COUNT(*)                              AS runs,
              SUM(ok)                               AS ok_runs,
              SUM(CASE WHEN ok = 0 THEN 1 ELSE 0 END) AS error_runs,
              AVG(latency_ms)                       AS avg_latency
       FROM run_source_stats
       GROUP BY source_id`,
    )
    .all() as {
    source_id: string;
    runs: number;
    ok_runs: number;
    error_runs: number;
    avg_latency: number | null;
  }[];

  const hitRows = db
    .prepare(
      `SELECT source_id,
              COUNT(*)                                   AS total_hits,
              SUM(was_saved)                             AS saved_hits,
              AVG(CASE WHEN citations IS NOT NULL THEN citations END) AS avg_citations
       FROM search_hits
       GROUP BY source_id`,
    )
    .all() as {
    source_id: string;
    total_hits: number;
    saved_hits: number;
    avg_citations: number | null;
  }[];

  const hitMap = new Map(hitRows.map((r) => [r.source_id, r]));
  const ids = new Set([
    ...statRows.map((r) => r.source_id),
    ...hitRows.map((r) => r.source_id),
  ]);

  const scores: SourceScore[] = [];
  for (const id of ids) {
    const stat = statRows.find((r) => r.source_id === id);
    const hit = hitMap.get(id);
    const totalHits = hit?.total_hits ?? 0;
    const savedHits = hit?.saved_hits ?? 0;
    const runs = stat?.runs ?? 0;
    const okRuns = stat?.ok_runs ?? 0;
    scores.push({
      source_id: id,
      label: labelOf(id),
      runs,
      ok_runs: okRuns,
      error_runs: stat?.error_runs ?? 0,
      total_hits: totalHits,
      saved_hits: savedHits,
      save_rate: totalHits > 0 ? savedHits / totalHits : 0,
      avg_citations: hit?.avg_citations ?? null,
      avg_latency_ms: stat?.avg_latency ?? null,
      reliability: runs > 0 ? okRuns / runs : 0,
    });
  }

  // xếp hạng: ưu tiên paper được LƯU nhiều (đóng góp thật) → save-rate → citations
  scores.sort((a, b) => {
    if (b.saved_hits !== a.saved_hits) return b.saved_hits - a.saved_hits;
    if (b.save_rate !== a.save_rate) return b.save_rate - a.save_rate;
    return (b.avg_citations ?? 0) - (a.avg_citations ?? 0);
  });

  return scores;
}

export interface OverallStats {
  total_runs: number;
  total_hits: number;
  total_saved: number;
}

export function getOverallStats(): OverallStats {
  const db = getDb();
  const runs = (
    db.prepare('SELECT COUNT(*) AS n FROM search_runs').get() as { n: number }
  ).n;
  const hits = (
    db.prepare('SELECT COUNT(*) AS n FROM search_hits').get() as { n: number }
  ).n;
  const saved = (
    db
      .prepare('SELECT COUNT(*) AS n FROM search_hits WHERE was_saved = 1')
      .get() as { n: number }
  ).n;
  return { total_runs: runs, total_hits: hits, total_saved: saved };
}

export interface RecentRun {
  id: number;
  query: string;
  created_at: string;
  total: number;
  saved: number;
}

export function getRecentRuns(limit = 20): RecentRun[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT r.id, r.query, r.created_at,
              COUNT(h.id)        AS total,
              SUM(h.was_saved)   AS saved
       FROM search_runs r
       LEFT JOIN search_hits h ON h.run_id = r.id
       GROUP BY r.id
       ORDER BY r.id DESC
       LIMIT ?`,
    )
    .all(limit) as RecentRun[];
}
