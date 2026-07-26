import { NextRequest, NextResponse } from 'next/server';
import { savePaper } from '@/lib/search/save-paper';
import type { MergedPaper } from '@/lib/search/orchestrator';
import type { LayerId } from '@/lib/paths';
import { getDb } from '@/lib/db';

// Staging → SAVE: user chọn paper + Layer rồi bấm lưu. Tạo folder + metadata.json
// trong searched_papers/, tải PDF nếu có OA, đánh dấu was_saved trong analytics.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      paper?: MergedPaper;
      layer?: number;
      paper_id?: string;
      run_id?: number;
      download_pdf?: boolean;
    };
    const paper = body.paper;
    const layer = body.layer as LayerId | undefined;
    if (!paper || !paper.title) {
      return NextResponse.json({ error: 'Thiếu dữ liệu paper' }, { status: 400 });
    }
    if (!layer || ![1, 2, 3, 4].includes(layer)) {
      return NextResponse.json({ error: 'Layer không hợp lệ' }, { status: 400 });
    }

    const result = await savePaper(paper, layer, {
      paperId: body.paper_id,
      downloadPdf: body.download_pdf,
    });

    // đánh dấu các hit tương ứng là đã lưu (theo run_id + title) cho analytics
    if (body.run_id) {
      try {
        getDb()
          .prepare(
            `UPDATE search_hits SET was_saved = 1, saved_layer = ?
             WHERE run_id = ? AND title = ?`,
          )
          .run(layer, body.run_id, paper.title);
      } catch {
        // analytics không chặn việc lưu paper
      }
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi lưu paper' },
      { status: 400 },
    );
  }
}
