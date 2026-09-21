import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFile, UnsafePathError } from '@/lib/safe-fs';
import type { Highlight } from '@/lib/highlight-types';

// Highlight PDF + bản dịch → cùng lưu trong highlights.json TRONG paper folder.
// KHÔNG sửa source.pdf/extracted.vi.md. PDF dùng page+bbox; bản dịch dùng
// section+character range và có thể mang page suy ra để nhảy về bản gốc.

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ layerDir: string; folder: string }> };

function readHighlights(file: string): Highlight[] {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data?.highlights) ? data.highlights : [];
  } catch {
    return [];
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const file = resolvePaperFile(layerDir, folder, 'highlights.json');
    return NextResponse.json({ highlights: readHighlights(file) });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const file = resolvePaperFile(layerDir, folder, 'highlights.json');
    const body = (await req.json()) as { highlights?: unknown };
    const highlights = Array.isArray(body.highlights) ? body.highlights : [];
    const payload = {
      version: 2,
      updated_at: new Date().toISOString(),
      highlights,
    };
    fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf8');
    return NextResponse.json({ ok: true, count: highlights.length });
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
