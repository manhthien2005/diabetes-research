// Kiểu + hàm THUẦN cho tiến độ — KHÔNG import node:fs.
// Client component (ProgressClient) chỉ được import từ file này;
// phần đọc/ghi đĩa nằm ở progress.ts (server-only).
// Cùng convention với highlight-types.ts / research-lessons-types.ts.

export type TaskStatus = 'todo' | 'doing' | 'done' | 'skipped' | 'blocked';
export type TaskKind = 'task' | 'check';
export type Owner = 'anh' | 'claude';

export const STATUSES: TaskStatus[] = ['todo', 'doing', 'done', 'skipped', 'blocked'];

export interface TaskLink {
  label: string;
  href: string;
}

export interface Task {
  id: string;
  tier: number;
  phase: string;
  kind: TaskKind;
  owner: Owner;
  critical: boolean;
  title: string;
  why: string;
  how: string;
  done_when: string;
  est_hours: number;
  status: TaskStatus;
  done_at: string | null;
  blocked_by: string[];
  note: string;
  links: TaskLink[];
}

export interface Tier {
  id: number;
  name: string;
  goal: string;
  outcome: string;
  weeks: string;
  required: boolean;
}

export interface Phase {
  id: string;
  tier: number;
  name: string;
  weeks: string;
}

export interface Milestone {
  id: string;
  label: string;
  due_week: number;
  task_id: string;
  fallback: string;
}

export interface ProgressConfig {
  start_date: string;
  total_weeks: number;
  hours_per_week: number;
  topic: string;
  claim: string;
}

export interface ProgressData {
  config: ProgressConfig;
  tiers: Tier[];
  phases: Phase[];
  milestones: Milestone[];
  tasks: Task[];
  updated_at: string;
}

export interface TaskPatch {
  status?: TaskStatus;
  note?: string;
}

// ---------------------------------------------------------------- dẫn xuất

export interface TierStat {
  tier: number;
  done: number;
  total: number;
  hoursDone: number;
  hoursTotal: number;
  pct: number;
}

/** Tiến độ 1 tầng, tính theo GIỜ (sát thực tế hơn đếm số việc). Bỏ qua task skipped. */
export function tierStats(tasks: Task[], tier: number): TierStat {
  const inTier = tasks.filter((t) => t.tier === tier && t.status !== 'skipped');
  const done = inTier.filter((t) => t.status === 'done');
  const hoursTotal = inTier.reduce((s, t) => s + t.est_hours, 0);
  const hoursDone = done.reduce((s, t) => s + t.est_hours, 0);
  return {
    tier,
    done: done.length,
    total: inTier.length,
    hoursDone,
    hoursTotal,
    pct: hoursTotal > 0 ? Math.round((hoursDone / hoursTotal) * 100) : 0,
  };
}

/** Task có chạy được ngay không (mọi blocker đã done/skipped). */
export function isUnblocked(task: Task, all: Task[]): boolean {
  return task.blocked_by.every((bid) => {
    const b = all.find((t) => t.id === bid);
    return !b || b.status === 'done' || b.status === 'skipped';
  });
}

/**
 * "Bước tiếp theo" — thứ DUY NHẤT anh cần biết khi mở trang.
 * Ưu tiên: đang làm dở > tầng thấp > việc của anh (việc của Claude thì anh chỉ cần giao)
 *          > THỨ TỰ TRONG FILE.
 *
 * Cố ý KHÔNG dùng `critical` để xếp hạng: thứ tự trong PROGRESS.json đã mã hoá đúng
 * trình tự thi công rồi. Nếu để `critical` đè lên, một việc găng ở cuối chặng sẽ bị
 * đẩy lên trước việc mở đầu — sai trình tự. `critical` chỉ dùng để hiển thị badge
 * và tính các mốc đường găng.
 */
export function nextAction(tasks: Task[]): Task | null {
  const candidates = tasks.filter(
    (t) => (t.status === 'todo' || t.status === 'doing') && isUnblocked(t, tasks),
  );
  if (candidates.length === 0) return null;

  const score = (t: Task) =>
    (t.status === 'doing' ? -1000 : 0) + t.tier * 100 + (t.owner === 'anh' ? 0 : 10);

  return candidates
    .slice()
    .sort((a, b) => score(a) - score(b) || tasks.indexOf(a) - tasks.indexOf(b))[0];
}

/** Tuần thứ mấy kể từ ngày bắt đầu (1-based). */
export function weekNumber(startDate: string, now = new Date()): number {
  const start = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 1;
  const days = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return Math.max(1, Math.floor(days / 7) + 1);
}
