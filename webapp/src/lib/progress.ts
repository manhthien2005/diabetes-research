import fs from 'node:fs';
import path from 'node:path';
import { NCKH_ROOT } from './paths';
import {
  STATUSES,
  type ProgressData,
  type Task,
  type TaskLink,
  type TaskPatch,
  type TaskStatus,
} from './progress-types';

// SERVER-ONLY. Đọc/ghi PROGRESS.json ở root — nguồn chân lý cho trang /tien-do.
// Client component KHÔNG được import file này (kéo theo node:fs) — dùng progress-types.ts.
//
// Cả webapp LẪN Claude (agent CLI) đều đọc/ghi PROGRESS.json, nên:
//  - giữ nguyên field lạ khi ghi (read-modify-write), giống metadata.json (AGENTS.md §5)
//  - ghi atomic (tmp + rename) để không hỏng file khi 2 bên ghi gần nhau

export const PROGRESS_FILE = path.join(NCKH_ROOT, 'PROGRESS.json');

export * from './progress-types';

const FALLBACK: ProgressData = {
  config: {
    start_date: '2026-07-26',
    total_weeks: 20,
    hours_per_week: 12,
    topic: '',
    claim: '',
  },
  tiers: [],
  phases: [],
  milestones: [],
  tasks: [],
  updated_at: '',
};

function str(v: unknown, d = ''): string {
  return typeof v === 'string' ? v : d;
}
function num(v: unknown, d = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : d;
}
function bool(v: unknown, d = false): boolean {
  return typeof v === 'boolean' ? v : d;
}
function strArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}
function normStatus(v: unknown): TaskStatus {
  return STATUSES.includes(v as TaskStatus) ? (v as TaskStatus) : 'todo';
}

function normTask(raw: unknown): Task | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== 'string' || typeof o.title !== 'string') return null;
  return {
    id: o.id,
    tier: num(o.tier, 0),
    phase: str(o.phase),
    kind: o.kind === 'check' ? 'check' : 'task',
    owner: o.owner === 'claude' ? 'claude' : 'anh',
    critical: bool(o.critical),
    title: o.title,
    why: str(o.why),
    how: str(o.how),
    done_when: str(o.done_when),
    est_hours: num(o.est_hours),
    status: normStatus(o.status),
    done_at: typeof o.done_at === 'string' ? o.done_at : null,
    blocked_by: strArray(o.blocked_by),
    note: str(o.note),
    links: Array.isArray(o.links)
      ? (o.links as unknown[])
          .map((l) => {
            if (!l || typeof l !== 'object') return null;
            const lo = l as Record<string, unknown>;
            if (typeof lo.label !== 'string' || typeof lo.href !== 'string') return null;
            return { label: lo.label, href: lo.href };
          })
          .filter((l): l is TaskLink => l !== null)
      : [],
  };
}

export function readProgress(): ProgressData {
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')) as Record<string, unknown>;
  } catch {
    // Chưa có file / JSON hỏng → trang tự hiện empty-state thay vì crash.
    return FALLBACK;
  }

  const meta = (parsed._meta ?? {}) as Record<string, unknown>;
  const cfg = (parsed.config ?? {}) as Record<string, unknown>;

  return {
    config: {
      start_date: str(cfg.start_date, FALLBACK.config.start_date),
      total_weeks: num(cfg.total_weeks, 20),
      hours_per_week: num(cfg.hours_per_week, 12),
      topic: str(cfg.topic),
      claim: str(cfg.claim),
    },
    tiers: Array.isArray(parsed.tiers)
      ? (parsed.tiers as Record<string, unknown>[]).map((t) => ({
          id: num(t.id),
          name: str(t.name),
          goal: str(t.goal),
          outcome: str(t.outcome),
          weeks: str(t.weeks),
          required: bool(t.required),
        }))
      : [],
    phases: Array.isArray(parsed.phases)
      ? (parsed.phases as Record<string, unknown>[]).map((p) => ({
          id: str(p.id),
          tier: num(p.tier),
          name: str(p.name),
          weeks: str(p.weeks),
        }))
      : [],
    milestones: Array.isArray(parsed.milestones)
      ? (parsed.milestones as Record<string, unknown>[]).map((m) => ({
          id: str(m.id),
          label: str(m.label),
          due_week: num(m.due_week),
          task_id: str(m.task_id),
          fallback: str(m.fallback),
        }))
      : [],
    tasks: Array.isArray(parsed.tasks)
      ? (parsed.tasks as unknown[]).map(normTask).filter((t): t is Task => t !== null)
      : [],
    updated_at: str(meta.updated_at),
  };
}

/**
 * Cập nhật 1 task. Read-modify-write để KHÔNG mất field mà Claude ghi thêm.
 * Ghi atomic: viết .tmp rồi rename.
 */
export function patchTask(id: string, patch: TaskPatch): Task {
  const doc = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')) as Record<string, unknown>;
  if (!Array.isArray(doc.tasks)) throw new Error('PROGRESS.json: thiếu mảng tasks');

  const tasks = doc.tasks as Record<string, unknown>[];
  const target = tasks.find((t) => t.id === id);
  if (!target) throw new Error(`Không tìm thấy task ${id}`);

  if (patch.status !== undefined) {
    if (!STATUSES.includes(patch.status)) throw new Error(`Status không hợp lệ: ${patch.status}`);
    target.status = patch.status;
    // done_at chỉ set khi chuyển sang done; bỏ khi quay lại trạng thái khác
    target.done_at = patch.status === 'done' ? new Date().toISOString().slice(0, 10) : null;
  }
  if (patch.note !== undefined) {
    target.note = String(patch.note).slice(0, 4000);
  }

  const meta = (doc._meta ?? {}) as Record<string, unknown>;
  meta.updated_at = new Date().toISOString().slice(0, 10);
  doc._meta = meta;

  const tmp = `${PROGRESS_FILE}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
  fs.renameSync(tmp, PROGRESS_FILE);

  const normalized = normTask(target);
  if (!normalized) throw new Error('Task sau khi cập nhật không hợp lệ');
  return normalized;
}
