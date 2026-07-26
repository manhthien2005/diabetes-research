import fs from 'node:fs';
import path from 'node:path';
import { NCKH_ROOT } from './paths';
import { makeDedupKey, normalizeTitle } from './search/types';

// Reject list: D:\NCKH\rejected.json — paper đã loại để KHÔNG tìm lại nữa.
// Dùng chung cho cả webapp lẫn agent CLI (Claude tự ghi khi phân tích thấy dở).

export const REJECT_FILE = path.join(NCKH_ROOT, 'rejected.json');

export interface RejectEntry {
  dedup_key: string; // khoá chống tìm lại (doi/arxiv/title chuẩn hoá)
  paper_id: string | null;
  title: string;
  title_norm: string;
  doi: string | null;
  arxiv: string | null;
  reason: string; // lý do reject (bắt buộc)
  by: 'user' | 'claude'; // ai reject
  layer: number | null; // layer định hướng lúc reject (nếu có)
  rejected_at: string;
}

interface RejectFile {
  version: number;
  rejected: RejectEntry[];
}

function readFile(): RejectFile {
  try {
    const data = JSON.parse(fs.readFileSync(REJECT_FILE, 'utf8'));
    if (Array.isArray(data?.rejected)) return data;
  } catch {
    /* file chưa có */
  }
  return { version: 1, rejected: [] };
}

function writeFile(data: RejectFile): void {
  fs.writeFileSync(REJECT_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export function listRejected(): RejectEntry[] {
  return readFile().rejected.sort((a, b) =>
    b.rejected_at.localeCompare(a.rejected_at),
  );
}

/** Set các dedup_key đã reject — để search lọc nhanh. */
export function rejectedKeySet(): Set<string> {
  const f = readFile();
  const set = new Set<string>();
  for (const r of f.rejected) {
    set.add(r.dedup_key);
    // phòng khi entry cũ chỉ có title
    if (r.title_norm) set.add(`title:${r.title_norm}`);
  }
  return set;
}

export interface AddRejectInput {
  paper_id?: string | null;
  title: string;
  doi?: string | null;
  arxiv?: string | null;
  reason: string;
  by?: 'user' | 'claude';
  layer?: number | null;
}

export function addReject(input: AddRejectInput): RejectEntry {
  const f = readFile();
  const dedup_key = makeDedupKey({
    doi: input.doi,
    arxiv: input.arxiv,
    title: input.title,
  });
  const entry: RejectEntry = {
    dedup_key,
    paper_id: input.paper_id ?? null,
    title: input.title,
    title_norm: normalizeTitle(input.title),
    doi: input.doi ?? null,
    arxiv: input.arxiv ?? null,
    reason: input.reason,
    by: input.by ?? 'user',
    layer: input.layer ?? null,
    rejected_at: new Date().toISOString(),
  };
  // upsert theo dedup_key (reject lại = cập nhật lý do)
  const idx = f.rejected.findIndex((r) => r.dedup_key === dedup_key);
  if (idx >= 0) f.rejected[idx] = entry;
  else f.rejected.push(entry);
  writeFile(f);
  return entry;
}

/** Bỏ reject (un-reject) theo dedup_key. */
export function removeReject(dedupKey: string): boolean {
  const f = readFile();
  const before = f.rejected.length;
  f.rejected = f.rejected.filter((r) => r.dedup_key !== dedupKey);
  if (f.rejected.length !== before) {
    writeFile(f);
    return true;
  }
  return false;
}
