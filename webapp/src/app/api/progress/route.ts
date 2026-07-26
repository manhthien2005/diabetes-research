import { NextRequest, NextResponse } from 'next/server';
import { patchTask, readProgress, STATUSES, type TaskStatus } from '@/lib/progress';

// GET  /api/progress          -> toàn bộ trạng thái thi công (PROGRESS.json ở root)
// PATCH /api/progress         -> cập nhật 1 task { id, status?, note? }
//
// Nguồn chân lý là PROGRESS.json trên đĩa (AGENTS.md §2) để Claude ở phiên sau
// cũng đọc/ghi được. Ghi theo read-modify-write + atomic rename.

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(readProgress());
  } catch (e) {
    return fail(e);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      id?: unknown;
      status?: unknown;
      note?: unknown;
    };

    if (typeof body.id !== 'string' || !body.id) {
      return NextResponse.json({ error: 'Thiếu id task' }, { status: 400 });
    }
    if (body.status !== undefined && !STATUSES.includes(body.status as TaskStatus)) {
      return NextResponse.json({ error: 'Status không hợp lệ' }, { status: 400 });
    }
    if (body.note !== undefined && typeof body.note !== 'string') {
      return NextResponse.json({ error: 'note phải là chuỗi' }, { status: 400 });
    }

    const task = patchTask(body.id, {
      status: body.status as TaskStatus | undefined,
      note: body.note as string | undefined,
    });

    return NextResponse.json({ ok: true, task });
  } catch (e) {
    return fail(e);
  }
}

function fail(e: unknown) {
  const msg = e instanceof Error ? e.message : 'Lỗi không xác định';
  const notFound = msg.startsWith('Không tìm thấy task');
  return NextResponse.json({ error: msg }, { status: notFound ? 404 : 500 });
}
