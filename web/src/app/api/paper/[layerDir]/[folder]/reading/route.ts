import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFile, UnsafePathError } from '@/lib/safe-fs';

// Trả nguyên văn bài báo cho view đọc song ngữ: { en, vi }.
//   en = extracted.md (luôn có nếu paper.has_extracted)
//   vi = extracted.vi.md (null nếu chưa dịch — client hiện EN + ghi chú)
// Strip header comment '<!-- extracted by pdf-extract ... -->' để render sạch.

export const dynamic = 'force-dynamic';

const HDR = /^<!-- extracted by pdf-extract \|.*?-->\s*/s;

function readStripped(file: string): string | null {
  try {
    return fs.readFileSync(file, 'utf8').replace(HDR, '');
  } catch {
    return null;
  }
}

type Params = { params: Promise<{ layerDir: string; folder: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const en = readStripped(resolvePaperFile(layerDir, folder, 'extracted.md'));
    const vi = readStripped(resolvePaperFile(layerDir, folder, 'extracted.vi.md'));
    if (en === null) {
      return NextResponse.json(
        { error: 'Chưa có extracted.md cho paper này.' },
        { status: 404 },
      );
    }
    return NextResponse.json({ en, vi });
  } catch (e) {
    if (e instanceof UnsafePathError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Lỗi đọc nội dung' }, { status: 500 });
  }
}
