import fs from 'node:fs';
import path from 'node:path';

// Trích text từ source.pdf → extracted.md (server-side, dùng pdfjs legacy build).
// Mục tiêu: để Claude (agent) LUÔN có full text khi phân tích, không chỉ abstract.
// Đây là bản text-only nhanh; pdf-extract skill của Claude có thể làm kỹ hơn sau.

interface TextItem {
  str: string;
  transform: number[];
}

export async function extractPdfText(pdfPath: string): Promise<string> {
  // dynamic import để tránh bundling vào client + dùng legacy build cho Node
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    // ghép theo dòng dựa trên toạ độ y để giữ cấu trúc đoạn
    let lastY: number | null = null;
    let line = '';
    const lines: string[] = [];
    for (const item of content.items as TextItem[]) {
      const y = item.transform[5];
      if (lastY !== null && Math.abs(y - lastY) > 2) {
        if (line.trim()) lines.push(line.trim());
        line = '';
      }
      line += item.str + (item.str.endsWith(' ') ? '' : ' ');
      lastY = y;
    }
    if (line.trim()) lines.push(line.trim());
    pages.push(lines.join('\n'));
  }
  await doc.destroy();
  return pages.join('\n\n');
}

/**
 * Đảm bảo có extracted.md trong folder paper. Nếu chưa có và có source.pdf →
 * trích và ghi. Trả về 'created' | 'exists' | 'no_pdf' | 'error:<msg>'.
 */
export async function ensureExtracted(
  folder: string,
  pdfName: string | null,
): Promise<string> {
  const extractedPath = path.join(folder, 'extracted.md');
  if (fs.existsSync(extractedPath)) return 'exists';
  if (!pdfName) return 'no_pdf';
  const pdfPath = path.join(folder, pdfName);
  if (!fs.existsSync(pdfPath)) return 'no_pdf';
  try {
    const text = await extractPdfText(pdfPath);
    if (!text || text.trim().length < 50) {
      return 'error:PDF không có text layer (có thể là scan)';
    }
    const header = `> Tự trích từ ${pdfName} bởi ExploreX (text-only). Claude có thể chạy pdf-extract để làm kỹ hơn.\n\n`;
    fs.writeFileSync(extractedPath, header + text, 'utf8');
    return 'created';
  } catch (e) {
    return `error:${e instanceof Error ? e.message : 'lỗi trích'}`;
  }
}
