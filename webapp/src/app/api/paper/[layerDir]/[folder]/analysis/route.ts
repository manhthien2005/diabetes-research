import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFile, UnsafePathError } from '@/lib/safe-fs';

// Serve analysis.html (đã tự-chứa inline CSS/SVG theo AGENTS.md §6) để nhúng iframe.
// Ưu tiên analysis.v2.html nếu có (rule §8: không ghi đè, tạo v2).

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ layerDir: string; folder: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    for (const name of ['analysis.v2.html', 'analysis.html']) {
      const file = resolvePaperFile(layerDir, folder, name);
      if (fs.existsSync(file)) {
        const html = fs.readFileSync(file, 'utf8');
        return new NextResponse(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
    }
    return new NextResponse(
      '<p style="font-family:sans-serif;color:#888;padding:24px">Chưa có analysis.html cho paper này.</p>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  } catch (e) {
    if (e instanceof UnsafePathError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Lỗi đọc analysis' }, { status: 500 });
  }
}
