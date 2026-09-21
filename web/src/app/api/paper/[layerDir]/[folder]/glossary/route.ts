import fs from 'node:fs';
import { NextRequest, NextResponse } from 'next/server';
import { resolvePaperFile, UnsafePathError } from '@/lib/safe-fs';
import { detectTerms } from '@/lib/glossary';

// Dò xem thuật ngữ nào trong từ điển THỰC SỰ xuất hiện trong full text của paper,
// kèm 1 đoạn ngữ cảnh để user thấy nó nằm ở đâu.
// Nguồn ưu tiên: extracted.md (bản trích đầy đủ). Không có thì trả rỗng — KHÔNG đoán.

export const dynamic = 'force-dynamic';

const HDR = /^<!-- extracted by pdf-extract \|.*?-->\s*/s;

function read(file: string): string | null {
  try {
    return fs.readFileSync(file, 'utf8').replace(HDR, '');
  } catch {
    return null;
  }
}

/** Lấy 1 đoạn ~200 ký tự quanh lần khớp đầu tiên, cắt gọn theo biên từ. */
function snippetFor(text: string, needles: string[]): string | null {
  const hay = text.toLowerCase();
  let at = -1;
  let len = 0;
  for (const n of needles) {
    const i = hay.indexOf(n.toLowerCase());
    if (i !== -1 && (at === -1 || i < at)) {
      at = i;
      len = n.length;
    }
  }
  if (at === -1) return null;
  const from = Math.max(0, at - 90);
  const to = Math.min(text.length, at + len + 110);
  let s = text.slice(from, to).replace(/\s+/g, ' ').trim();
  if (from > 0) s = '…' + s;
  if (to < text.length) s = s + '…';
  return s;
}

type Params = { params: Promise<{ layerDir: string; folder: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { layerDir, folder } = await params;
    const text = read(resolvePaperFile(layerDir, folder, 'extracted.md'));
    if (text === null) {
      return NextResponse.json({ source: null, hits: {}, snippets: {} });
    }
    const hits = detectTerms(text);

    // snippet chỉ lấy cho tối đa 40 thuật ngữ nhiều lần khớp nhất (đủ dùng, không phình response)
    const { GLOSSARY } = await import('@/lib/glossary');
    const byId = new Map(GLOSSARY.map((t) => [t.id, t]));
    const top = Object.entries(hits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40);
    const snippets: Record<string, string> = {};
    for (const [id] of top) {
      const t = byId.get(id);
      if (!t) continue;
      const s = snippetFor(text, t.aliases);
      if (s) snippets[id] = s;
    }

    return NextResponse.json({ source: 'extracted.md', hits, snippets });
  } catch (e) {
    if (e instanceof UnsafePathError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Lỗi dò thuật ngữ' }, { status: 500 });
  }
}
