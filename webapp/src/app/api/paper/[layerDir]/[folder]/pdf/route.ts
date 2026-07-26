import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFolder, resolvePaperFile, UnsafePathError } from '@/lib/safe-fs';

// Phục vụ file PDF gốc trong paper folder (read-only).
// HỖ TRỢ HTTP Range (206 Partial Content): PDF.js tải PDF theo từng đoạn bằng
// header `Range`. Nếu server trả `Transfer-Encoding: chunked` không kèm
// `Content-Length`/`Accept-Ranges` và bỏ qua Range, một số trình duyệt (Edge)
// báo lỗi "Unexpected server response (204)" hoặc ép tải file thay vì xem inline.
// Tên file lấy từ query ?file= hoặc tự dò file .pdf đầu tiên trong folder.

export const dynamic = 'force-dynamic';

type Params = { params: Promise<{ layerDir: string; folder: string }> };

const BASE_HEADERS: Record<string, string> = {
  'Content-Type': 'application/pdf',
  'Content-Disposition': 'inline; filename="paper.pdf"',
  'Accept-Ranges': 'bytes',
  'Cache-Control': 'no-store',
};

// Resolve file PDF thật trên đĩa (an toàn path). Trả null nếu không có.
function resolvePdf(
  layerDir: string,
  folder: string,
  wanted: string | null,
): string | null {
  let pdfName = wanted;
  if (!pdfName) {
    const dir = resolvePaperFolder(layerDir, folder);
    pdfName =
      fs.readdirSync(dir).find((f) => f.toLowerCase().endsWith('.pdf')) ?? null;
  }
  if (!pdfName) return null;
  const file = resolvePaperFile(layerDir, folder, pdfName);
  if (!fs.existsSync(file)) return null;
  return file;
}

export async function HEAD(req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const file = resolvePdf(layerDir, folder, req.nextUrl.searchParams.get('file'));
    if (!file) return new NextResponse(null, { status: 404 });
    const size = fs.statSync(file).size;
    return new NextResponse(null, {
      status: 200,
      headers: { ...BASE_HEADERS, 'Content-Length': String(size) },
    });
  } catch (e) {
    if (e instanceof UnsafePathError) return new NextResponse(null, { status: 400 });
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const file = resolvePdf(layerDir, folder, req.nextUrl.searchParams.get('file'));
    if (!file) {
      return NextResponse.json({ error: 'Không có PDF' }, { status: 404 });
    }

    const size = fs.statSync(file).size;
    const range = req.headers.get('range');

    // Range request → 206 Partial Content (PDF.js tải từng đoạn)
    if (range) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
      if (m && (m[1] !== '' || m[2] !== '')) {
        let start = m[1] === '' ? NaN : Number(m[1]);
        let end = m[2] === '' ? NaN : Number(m[2]);
        if (Number.isNaN(start)) {
          // dạng "bytes=-N" = N byte cuối
          start = Math.max(0, size - end);
          end = size - 1;
        } else if (Number.isNaN(end) || end >= size) {
          end = size - 1;
        }
        if (start > end || start >= size || start < 0) {
          return new NextResponse(null, {
            status: 416,
            headers: { ...BASE_HEADERS, 'Content-Range': `bytes */${size}` },
          });
        }
        const fd = fs.openSync(file, 'r');
        try {
          const len = end - start + 1;
          const buf = Buffer.allocUnsafe(len);
          fs.readSync(fd, buf, 0, len, start);
          return new NextResponse(new Uint8Array(buf), {
            status: 206,
            headers: {
              ...BASE_HEADERS,
              'Content-Range': `bytes ${start}-${end}/${size}`,
              'Content-Length': String(len),
            },
          });
        } finally {
          fs.closeSync(fd);
        }
      }
    }

    // Không có Range → trả full kèm Content-Length (tránh chunked encoding)
    const data = fs.readFileSync(file);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: { ...BASE_HEADERS, 'Content-Length': String(size) },
    });
  } catch (e) {
    if (e instanceof UnsafePathError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Lỗi đọc PDF' }, { status: 500 });
  }
}
