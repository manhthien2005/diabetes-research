import { NextRequest } from 'next/server';
import { getConnector } from '@/lib/search/registry';
import { getEnabledSourceIds, getSourceConfig } from '@/lib/search/config';
import { mergeAll, type MergedPaper } from '@/lib/search/orchestrator';
import { findSimilarByDoi, snowballFromDoi } from '@/lib/search/similarity';
import { enrichPaper } from '@/lib/search/enrich';
import {
  makeDedupKey,
  normalizeTitle as normTitle,
  type NormalizedPaper,
} from '@/lib/search/types';
import { getPaper, listAllPapers } from '@/lib/papers';
import { rejectedKeySet } from '@/lib/reject';
import { writeSearchPool, POOL_FILE } from '@/lib/search/pool';
import { getDb } from '@/lib/db';

// Auto-discovery: fan-out + similarity + enrich + filter, STREAM tiến trình
// (NDJSON) để UI hiện "đang tìm gì" và kết quả nhỏ giọt. Chạy theo yêu cầu.
export const dynamic = 'force-dynamic';

interface AutoBody {
  keyword?: string;
  similarTo?: { layerDir: string; folder: string } | null;
  snowball?: boolean; // duyệt references + citations từ paper gốc
  filters?: {
    hasCode?: boolean;
    hasDataset?: boolean;
    hasOA?: boolean;
    minCitations?: number;
  };
  targetLayer?: number;
  limitPerSource?: number;
  excludeLibrary?: boolean;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AutoBody;
  const enc = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(enc.encode(JSON.stringify(obj) + '\n'));

      try {
        await runAuto(body, send);
      } catch (e) {
        send({
          type: 'log',
          level: 'error',
          msg: e instanceof Error ? e.message : 'Lỗi auto-discovery',
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
    },
  });
}

type Send = (obj: unknown) => void;

async function runAuto(body: AutoBody, send: Send) {
  const cfg = getSourceConfig();
  const limit = body.limitPerSource ?? cfg.limitPerSource;
  const filters = body.filters ?? {};

  // 1. Xác định query + paper gốc (similar)
  let query = (body.keyword ?? '').trim();
  let originDoi: string | null = null;
  let originTitle = '';
  if (body.similarTo) {
    const origin = getPaper(body.similarTo.layerDir, body.similarTo.folder);
    if (origin) {
      originDoi = origin.doi;
      originTitle = origin.title;
      send({
        type: 'log',
        msg: `Paper gốc: "${origin.title.slice(0, 70)}" (DOI ${origin.doi ?? '—'})`,
      });
      if (!query) query = origin.title;
    } else {
      send({ type: 'log', level: 'warn', msg: 'Không đọc được paper gốc.' });
    }
  }

  if (!query && !originDoi) {
    send({ type: 'log', level: 'error', msg: 'Cần từ khoá hoặc paper tương đồng.' });
    send({ type: 'done', run_id: null, raw: 0, merged: 0, kept: 0 });
    return;
  }

  send({
    type: 'log',
    msg: `Bắt đầu auto-discovery${query ? ` · từ khoá: "${query.slice(0, 60)}"` : ''}`,
  });

  const pool: NormalizedPaper[] = [];

  // 2. Fan-out các nguồn đang bật (song song, emit khi từng nguồn xong)
  const enabled = getEnabledSourceIds();
  const connectors = enabled
    .map((id) => getConnector(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const perSource: {
    source_id: string;
    ok: boolean;
    count: number;
    latency_ms: number;
    error?: string;
  }[] = [];

  if (query) {
    for (const c of connectors) send({ type: 'source', id: c.id, status: 'querying' });
    const outcomes = await Promise.all(
      connectors.map((c) =>
        c.search(query, limit).then((o) => {
          send({
            type: 'source',
            id: c.id,
            status: o.ok ? 'done' : 'error',
            count: o.count,
            latency: o.latency_ms,
            error: o.error,
          });
          return o;
        }),
      ),
    );
    for (const o of outcomes) {
      perSource.push({
        source_id: o.source_id,
        ok: o.ok,
        count: o.count,
        latency_ms: o.latency_ms,
        error: o.error,
      });
      pool.push(...o.papers);
    }
  }

  // 3. Similarity qua OpenAlex related_works (nếu có DOI gốc)
  if (originDoi) {
    send({ type: 'source', id: 'openalex-related', status: 'querying' });
    const t = Date.now();
    try {
      const sim = await findSimilarByDoi(originDoi, Math.max(limit, 10));
      send({
        type: 'source',
        id: 'openalex-related',
        status: 'done',
        count: sim.length,
        latency: Date.now() - t,
      });
      perSource.push({
        source_id: 'openalex-related',
        ok: true,
        count: sim.length,
        latency_ms: Date.now() - t,
      });
      pool.push(...sim);
    } catch (e) {
      send({
        type: 'source',
        id: 'openalex-related',
        status: 'error',
        error: e instanceof Error ? e.message : 'lỗi',
      });
    }
  }

  // 3b. Snowballing: backward (references) + forward (citations) từ paper gốc
  if (originDoi && body.snowball) {
    send({ type: 'source', id: 'snowball', status: 'querying' });
    const t = Date.now();
    try {
      const { backward, forward } = await snowballFromDoi(
        originDoi,
        Math.max(limit, 15),
      );
      const total = backward.length + forward.length;
      send({ type: 'source', id: 'snowball', status: 'done', count: total, latency: Date.now() - t });
      send({
        type: 'phase',
        msg: `Snowball: ${backward.length} references (backward) + ${forward.length} citations (forward)`,
      });
      perSource.push({
        source_id: 'snowball',
        ok: true,
        count: total,
        latency_ms: Date.now() - t,
      });
      pool.push(...backward, ...forward);
    } catch (e) {
      send({
        type: 'source',
        id: 'snowball',
        status: 'error',
        error: e instanceof Error ? e.message : 'lỗi',
      });
    }
  }

  // 4. Merge + dedup
  const merged = mergeAll(pool);
  send({ type: 'phase', msg: `Gộp trùng: ${pool.length} → ${merged.length}` });

  // 5. Enrich (github + dataset từ abstract) để filter có nghĩa
  for (const p of merged) enrichPaper(p);

  // 6a. Bỏ paper đã reject trước đó (không tìm lại cái đã loại)
  let pipeline = merged;
  const rejected = rejectedKeySet();
  if (rejected.size > 0) {
    const before = pipeline.length;
    pipeline = pipeline.filter(
      (p) => !rejected.has(p.dedup_key) && !rejected.has(`title:${normTitle(p.title)}`),
    );
    if (before !== pipeline.length)
      send({
        type: 'phase',
        msg: `Bỏ ${before - pipeline.length} paper đã reject trước đó`,
      });
  }

  // 6b. Bỏ paper đã có trong thư viện
  if (body.excludeLibrary !== false) {
    const existing = new Set(
      listAllPapers().map((lp) =>
        makeDedupKey({ doi: lp.doi, arxiv: lp.arxiv, title: lp.title }),
      ),
    );
    const before = pipeline.length;
    pipeline = pipeline.filter((p) => {
      // origin chính nó cũng loại
      if (originTitle && p.title === originTitle) return false;
      return !existing.has(p.dedup_key);
    });
    if (before !== pipeline.length)
      send({
        type: 'phase',
        msg: `Bỏ ${before - pipeline.length} paper đã có trong thư viện`,
      });
  }

  // 7. Lọc theo yêu cầu nâng cao
  const beforeFilter = pipeline.length;
  pipeline = pipeline.filter((p) => {
    if (filters.hasCode && !p.code_url) return false;
    if (filters.hasDataset && p.datasets.length === 0) return false;
    if (filters.hasOA && !p.pdf_url) return false;
    if (filters.minCitations && (p.citations ?? 0) < filters.minCitations)
      return false;
    return true;
  });
  const activeFilters = [
    filters.hasCode && 'có code',
    filters.hasDataset && 'có dataset',
    filters.hasOA && 'có PDF OA',
    filters.minCitations ? `≥${filters.minCitations} cite` : null,
  ].filter(Boolean);
  if (activeFilters.length)
    send({
      type: 'phase',
      msg: `Lọc [${activeFilters.join(', ')}]: ${beforeFilter} → ${pipeline.length}`,
    });

  // 8. Ghi log analytics
  const db = getDb();
  const runId = db
    .prepare('INSERT INTO search_runs(query) VALUES(?)')
    .run(query || `similar:${originTitle.slice(0, 40)}`).lastInsertRowid as number;
  const insStat = db.prepare(
    `INSERT INTO run_source_stats(run_id, source_id, ok, count, latency_ms, error)
     VALUES(?,?,?,?,?,?)`,
  );
  const insHit = db.prepare(
    `INSERT INTO search_hits(run_id, source_id, title, doi, year, citations)
     VALUES(?,?,?,?,?,?)`,
  );
  db.transaction(() => {
    for (const s of perSource)
      insStat.run(runId, s.source_id, s.ok ? 1 : 0, s.count, s.latency_ms, s.error ?? null);
    for (const p of pipeline)
      for (const sid of p.found_by)
        insHit.run(runId, sid, p.title, p.doi, p.year, p.citations);
  })();

  // 9. Persist pool ra search_pool.json để Claude triage được (Bước 2 vòng lặp)
  try {
    writeSearchPool({
      run_id: runId,
      query,
      origin: originTitle ? { title: originTitle, doi: originDoi } : null,
      snowball: Boolean(originDoi && body.snowball),
      generated_at: new Date().toISOString(),
      kept: pipeline.length,
      papers: pipeline,
    });
    send({ type: 'phase', msg: `Pool đã ghi → ${POOL_FILE} (Claude đọc để triage)` });
  } catch (e) {
    send({
      type: 'log',
      level: 'warn',
      msg: `Không ghi được search_pool.json: ${e instanceof Error ? e.message : 'lỗi'}`,
    });
  }

  // 10. Stream từng kết quả (đã sort theo found_by/cite trong mergeAll)
  for (const p of pipeline) {
    send({ type: 'result', run_id: runId, paper: p });
  }
  send({
    type: 'done',
    run_id: runId,
    raw: pool.length,
    merged: merged.length,
    kept: pipeline.length,
  });
}

// (giữ type cho rõ ràng phía import)
export type { MergedPaper };
