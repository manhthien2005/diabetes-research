import fs from 'node:fs';
import path from 'node:path';
import { resolvePaperFolder } from './safe-fs';

// Analysis queue: trạng thái phân tích của 1 paper, lưu ngay trong metadata.json
// (field analysis_status) để Claude (agent CLI) đọc được khi quét hàng đợi.
//   'none'     — chưa đưa vào hàng đợi
//   'queued'   — user/web đánh dấu "chờ Claude phân tích"
//   'analyzed' — đã có analysis.html (Claude viết xong)

export type AnalysisStatus = 'none' | 'queued' | 'analyzed';

export function setAnalysisStatus(
  layerDir: string,
  folder: string,
  status: AnalysisStatus,
): void {
  const dir = resolvePaperFolder(layerDir, folder);
  const metaPath = path.join(dir, 'metadata.json');
  let meta: Record<string, unknown> = {};
  try {
    meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch {
    /* ignore */
  }
  meta.analysis_status = status;
  meta.analysis_status_at = new Date().toISOString();
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
}
