import { NextRequest, NextResponse } from 'next/server';
import { runSearch } from '@/lib/search/orchestrator';
import { getSourceConfig, getEnabledSourceIds } from '@/lib/search/config';
import { getDb } from '@/lib/db';

// Meta-search: fan-out tới nguồn đang bật, dedup, GHI LOG vào SQLite để tính
// chất lượng nguồn sau (search_runs / run_source_stats / search_hits).
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      query?: string;
      sources?: string[];
      limit?: number;
    };
    const query = (body.query ?? '').trim();
    if (!query) {
      return NextResponse.json({ error: 'Thiếu query' }, { status: 400 });
    }
    const cfg = getSourceConfig();
    const sources =
      body.sources && body.sources.length > 0
        ? body.sources
        : getEnabledSourceIds();
    const limit = body.limit ?? cfg.limitPerSource;

    const result = await runSearch(query, sources, limit);

    // --- ghi log analytics ---
    const db = getDb();
    const runId = db
      .prepare('INSERT INTO search_runs(query) VALUES(?)')
      .run(query).lastInsertRowid as number;

    const insStat = db.prepare(
      `INSERT INTO run_source_stats(run_id, source_id, ok, count, latency_ms, error)
       VALUES(?, ?, ?, ?, ?, ?)`,
    );
    const insHit = db.prepare(
      `INSERT INTO search_hits(run_id, source_id, title, doi, year, citations)
       VALUES(?, ?, ?, ?, ?, ?)`,
    );
    const tx = db.transaction(() => {
      for (const o of result.per_source) {
        insStat.run(
          runId,
          o.source_id,
          o.ok ? 1 : 0,
          o.count,
          o.latency_ms,
          o.error ?? null,
        );
      }
      // ghi hit theo paper đã merge, gắn cho TỪNG nguồn tìm ra (để tính đóng góp)
      for (const p of result.merged) {
        for (const sid of p.found_by) {
          insHit.run(
            runId,
            sid,
            p.title,
            p.doi,
            p.year,
            p.citations,
          );
        }
      }
    });
    tx();

    return NextResponse.json({ run_id: runId, ...result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi search' },
      { status: 500 },
    );
  }
}
