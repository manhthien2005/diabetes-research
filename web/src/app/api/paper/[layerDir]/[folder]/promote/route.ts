import fs from 'node:fs';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFolder, UnsafePathError } from '@/lib/safe-fs';
import { getPaper } from '@/lib/papers';
import { CHOSEN_DIR } from '@/lib/paths';

// Promote paper: copy PDF sang chosed_papers/Layer_X/<folder>.pdf + set
// metadata status='chosen'. Quyền quyết là của USER (bấm nút) — agent không gọi.
export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ layerDir: string; folder: string }> };

export async function POST(_req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const paperFolder = resolvePaperFolder(layerDir, folder);
    const paper = getPaper(layerDir, folder);
    if (!paper) {
      return NextResponse.json({ error: 'Không tìm thấy paper' }, { status: 404 });
    }
    if (!paper.source_pdf) {
      return NextResponse.json(
        { error: 'Paper chưa có PDF — không promote được (chosed_papers chỉ chứa PDF)' },
        { status: 400 },
      );
    }

    const destDir = path.join(CHOSEN_DIR, layerDir);
    fs.mkdirSync(destDir, { recursive: true });
    const dest = path.join(destDir, `${folder}.pdf`);
    const already = fs.existsSync(dest);
    if (!already) {
      fs.copyFileSync(path.join(paperFolder, paper.source_pdf), dest);
    }

    // cập nhật metadata.status — giữ nguyên mọi field khác
    const metaFile = path.join(paperFolder, 'metadata.json');
    try {
      const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
      meta.status = 'chosen';
      fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf8');
    } catch {
      // metadata hỏng/thiếu thì bỏ qua — PDF đã copy là chính
    }

    return NextResponse.json({ ok: true, already, dest });
  } catch (e) {
    if (e instanceof UnsafePathError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi promote' },
      { status: 500 },
    );
  }
}
