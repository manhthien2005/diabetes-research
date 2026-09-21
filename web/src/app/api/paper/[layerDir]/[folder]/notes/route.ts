import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFile, UnsafePathError } from '@/lib/safe-fs';

// Note dạng "cột ghi chú riêng" của anh → lưu notes.md NGAY trong paper folder
// để các agent CLI (paper-analyzer...) cũng đọc được.

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ layerDir: string; folder: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const file = resolvePaperFile(layerDir, folder, 'notes.md');
    let content = '';
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch {
      content = '';
    }
    return NextResponse.json({ content });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const file = resolvePaperFile(layerDir, folder, 'notes.md');
    const body = (await req.json()) as { content?: unknown };
    const content = typeof body.content === 'string' ? body.content : '';
    fs.writeFileSync(file, content, 'utf8');
    return NextResponse.json({ ok: true, bytes: Buffer.byteLength(content) });
  } catch (e) {
    return errorResponse(e);
  }
}

function errorResponse(e: unknown) {
  if (e instanceof UnsafePathError) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
  return NextResponse.json(
    { error: e instanceof Error ? e.message : 'Lỗi không xác định' },
    { status: 500 },
  );
}
