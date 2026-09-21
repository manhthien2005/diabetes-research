import { NextRequest, NextResponse } from 'next/server';
import { listRejected, addReject, removeReject } from '@/lib/reject';

// Reject list: GET danh sách · POST thêm · DELETE bỏ reject.
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ rejected: listRejected() });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      title?: string;
      paper_id?: string | null;
      doi?: string | null;
      arxiv?: string | null;
      reason?: string;
      by?: 'user' | 'claude';
      layer?: number | null;
    };
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: 'Thiếu title' }, { status: 400 });
    }
    if (!body.reason || !body.reason.trim()) {
      return NextResponse.json({ error: 'Thiếu lý do reject' }, { status: 400 });
    }
    const entry = addReject({
      title: body.title.trim(),
      paper_id: body.paper_id ?? null,
      doi: body.doi ?? null,
      arxiv: body.arxiv ?? null,
      reason: body.reason.trim(),
      by: body.by ?? 'user',
      layer: body.layer ?? null,
    });
    return NextResponse.json({ ok: true, entry });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi reject' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  if (!key) {
    return NextResponse.json({ error: 'Thiếu key' }, { status: 400 });
  }
  const removed = removeReject(key);
  return NextResponse.json({ ok: removed });
}
