import fs from 'node:fs';
import { QA_LOG_FILE } from './paths';

// Đọc qa_log.json ở root (bản máy đọc của QA_LOG.md — xem AGENTS.md §12).
// Trang /qa-log hiển thị nhật ký Hỏi–Đáp định hướng để user xem lại & ghi nhớ.

export interface QaEntry {
  id: string;
  date: string;
  tags: string[];
  question: string;
  answer_summary: string[];
  principle: string;
  links: string[];
  supersedes: string | null;
  method: string | null;
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function normalizeEntry(raw: unknown): QaEntry | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== 'string' || typeof o.question !== 'string') return null;
  return {
    id: o.id,
    date: typeof o.date === 'string' ? o.date : '',
    tags: asStringArray(o.tags),
    question: o.question,
    answer_summary: asStringArray(o.answer_summary),
    principle: typeof o.principle === 'string' ? o.principle : '',
    links: asStringArray(o.links),
    supersedes: typeof o.supersedes === 'string' ? o.supersedes : null,
    method: typeof o.method === 'string' ? o.method : null,
  };
}

export function readQaLog(): QaEntry[] {
  try {
    const raw = fs.readFileSync(QA_LOG_FILE, 'utf8');
    const data = JSON.parse(raw) as { entries?: unknown[] };
    if (!Array.isArray(data.entries)) return [];
    return data.entries
      .map(normalizeEntry)
      .filter((e): e is QaEntry => e !== null);
  } catch {
    // File chưa có / JSON hỏng → trả mảng rỗng, trang tự hiện empty-state.
    return [];
  }
}
