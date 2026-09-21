import path from 'node:path';
import { SEARCHED_DIR, LAYERS } from './paths';

// Chống path traversal: chỉ cho phép thao tác trong searched_papers/Layer_X/<folder>/.
// Mọi API route đọc/ghi file paper PHẢI đi qua resolvePaperFolder().

export class UnsafePathError extends Error {}

const LAYER_DIRS = new Set(LAYERS.map((l) => l.dir));

/**
 * Trả về đường dẫn tuyệt đối an toàn tới folder paper, hoặc ném lỗi.
 * layerDir phải là 1 trong 4 Layer hợp lệ; folder không được chứa .. hay separator.
 */
export function resolvePaperFolder(layerDir: string, folder: string): string {
  if (!LAYER_DIRS.has(layerDir)) {
    throw new UnsafePathError(`Layer không hợp lệ: ${layerDir}`);
  }
  if (
    !folder ||
    folder.includes('..') ||
    folder.includes('/') ||
    folder.includes('\\') ||
    path.isAbsolute(folder)
  ) {
    throw new UnsafePathError(`Tên folder không hợp lệ: ${folder}`);
  }
  const base = path.join(SEARCHED_DIR, layerDir);
  const target = path.join(base, folder);
  // chốt chặn cuối: target phải nằm trong base
  const rel = path.relative(base, target);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new UnsafePathError('Đường dẫn thoát khỏi vùng cho phép');
  }
  return target;
}

/**
 * Resolve 1 file con bên trong folder paper (vd 'notes.md', 'highlights.json',
 * hoặc tên file PDF). Tên file không được chứa separator hay '..'.
 */
export function resolvePaperFile(
  layerDir: string,
  folder: string,
  fileName: string,
): string {
  const dir = resolvePaperFolder(layerDir, folder);
  if (
    !fileName ||
    fileName.includes('..') ||
    fileName.includes('/') ||
    fileName.includes('\\') ||
    path.isAbsolute(fileName)
  ) {
    throw new UnsafePathError(`Tên file không hợp lệ: ${fileName}`);
  }
  const target = path.join(dir, fileName);
  const rel = path.relative(dir, target);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new UnsafePathError('File thoát khỏi folder paper');
  }
  return target;
}
