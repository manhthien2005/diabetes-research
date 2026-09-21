import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { setAnalysisStatus, type AnalysisStatus } from '@/lib/queue';
import { resolvePaperFolder, UnsafePathError } from '@/lib/safe-fs';
import { ensureExtracted } from '@/lib/extract';

// Đánh dấu paper vào/ra hàng đợi phân tích.
// Khi vào queue: TỰ TRÍCH extracted.md (nếu thiếu) để Claude luôn có full text.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      layerDir?: string;
      folder?: string;
      status?: AnalysisStatus;
    };
    if (!body.layerDir || !body.folder || !body.status) {
      return NextResponse.json({ error: 'Thiếu tham số' }, { status: 400 });
    }
    if (!['none', 'queued', 'analyzed'].includes(body.status)) {
      return NextResponse.json({ error: 'Status không hợp lệ' }, { status: 400 });
    }

    setAnalysisStatus(body.layerDir, body.folder, body.status);

    // tự trích text khi đưa vào hàng đợi
    let extract: string | undefined;
    if (body.status === 'queued') {
      const dir = resolvePaperFolder(body.layerDir, body.folder);
      const pdfName =
        fs.readdirSync(dir).find((f) => f.toLowerCase().endsWith('.pdf')) ??
        null;
      extract = await ensureExtracted(dir, pdfName);
    }

    return NextResponse.json({ ok: true, extract });
  } catch (e) {
    if (e instanceof UnsafePathError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi queue' },
      { status: 500 },
    );
  }
}
