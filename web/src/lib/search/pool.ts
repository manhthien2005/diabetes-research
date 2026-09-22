import fs from 'node:fs';
import path from 'node:path';
import { NCKH_ROOT } from '../paths';
import type { MergedPaper } from './orchestrator';

// Persist pool kết quả search ra 01_Diabetes_Research/search_pool.json để Claude (agent CLI)
// đọc được khi triage (Bước 2 vòng lặp). Trước đây pool chỉ sống trong browser
// memory → agent không có đường dữ liệu để sàng lọc.
// Mỗi run GHI ĐÈ file (chỉ giữ pool mới nhất — pool cũ đã được triage xong).

export const POOL_FILE = path.join(NCKH_ROOT, 'search_pool.json');

export interface PoolFile {
  version: 1;
  run_id: number | null;
  query: string;
  origin: { title: string; doi: string | null } | null;
  snowball: boolean;
  generated_at: string;
  kept: number;
  papers: MergedPaper[];
  /** Claude ghi sau khi triage: dedup_key → verdict. Web chỉ đọc. */
  triage?: Record<string, { verdict: 'keep' | 'reject'; reason: string; layer?: number }>;
}

export function writeSearchPool(data: Omit<PoolFile, 'version'>): void {
  const out: PoolFile = { version: 1, ...data };
  fs.writeFileSync(POOL_FILE, JSON.stringify(out, null, 2), 'utf8');
}

export function readSearchPool(): PoolFile | null {
  try {
    const data = JSON.parse(fs.readFileSync(POOL_FILE, 'utf8'));
    if (data?.version === 1 && Array.isArray(data.papers)) return data as PoolFile;
  } catch {
    /* chưa có pool */
  }
  return null;
}
