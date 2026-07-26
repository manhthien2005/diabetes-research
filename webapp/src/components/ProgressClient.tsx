'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  MdRocketLaunch,
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdPlayCircleFilled,
  MdBlock,
  MdFlag,
  MdBolt,
  MdVerifiedUser,
  MdExpandMore,
  MdPerson,
  MdSmartToy,
  MdLock,
  MdEditNote,
  MdSave,
  MdWarningAmber,
  MdLink,
} from 'react-icons/md';
// Import từ progress-types (thuần, không có node:fs) — KHÔNG import '@/lib/progress'
// ở client component, nếu không webpack sẽ kéo fs vào bundle trình duyệt và build lỗi.
import {
  isUnblocked,
  nextAction,
  tierStats,
  weekNumber,
  type ProgressData,
  type Task,
  type TaskStatus,
} from '@/lib/progress-types';

const STATUS_META: Record<
  TaskStatus,
  { label: string; cls: string; Icon: typeof MdCheckCircle }
> = {
  todo: { label: 'Chưa làm', cls: 'todo', Icon: MdRadioButtonUnchecked },
  doing: { label: 'Đang làm', cls: 'doing', Icon: MdPlayCircleFilled },
  done: { label: 'Xong', cls: 'done', Icon: MdCheckCircle },
  skipped: { label: 'Bỏ qua', cls: 'skipped', Icon: MdBlock },
  blocked: { label: 'Kẹt', cls: 'blocked', Icon: MdWarningAmber },
};

// Vòng đời bấm 1 nút: chưa làm -> đang làm -> xong -> chưa làm
const CYCLE: Record<TaskStatus, TaskStatus> = {
  todo: 'doing',
  doing: 'done',
  done: 'todo',
  skipped: 'todo',
  blocked: 'doing',
};

export interface LibraryStatsSummary {
  total: number;
  chosen: number;
  withCode: number;
  withAnalysis: number;
  byLayer: {
    id: number;
    name: string;
    count: number;
    chosen: number;
    analyzed: number;
  }[];
}

export function ProgressClient({
  initial,
  stats,
}: {
  initial: ProgressData;
  stats?: LibraryStatsSummary;
}) {
  const [data, setData] = useState(initial);
  const [showTiers, setShowTiers] = useState<number[]>([0]);
  const [hideDone, setHideDone] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const tasks = data.tasks;
  const week = weekNumber(data.config.start_date);
  const next = useMemo(() => nextAction(tasks), [tasks]);

  const patch = useCallback(
    async (id: string, body: { status?: TaskStatus; note?: string }) => {
      setBusy(id);
      setErr(null);
      try {
        const res = await fetch('/api/progress', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...body }),
        });
        const json = (await res.json()) as { task?: Task; error?: string };
        if (!res.ok || !json.task) throw new Error(json.error ?? 'Lưu thất bại');
        setData((d) => ({
          ...d,
          tasks: d.tasks.map((t) => (t.id === id ? json.task! : t)),
        }));
      } catch (e) {
        setErr(e instanceof Error ? e.message : 'Lỗi không xác định');
      } finally {
        setBusy(null);
      }
    },
    [],
  );

  const visible = useMemo(
    () =>
      tasks.filter(
        (t) => showTiers.includes(t.tier) && !(hideDone && t.status === 'done'),
      ),
    [tasks, showTiers, hideDone],
  );

  const checks = visible.filter((t) => t.kind === 'check');
  const work = visible.filter((t) => t.kind === 'task');

  const grouped = useMemo(() => {
    const byPhase = new Map<string, Task[]>();
    for (const t of work) {
      const list = byPhase.get(t.phase) ?? [];
      list.push(t);
      byPhase.set(t.phase, list);
    }
    return data.phases
      .filter((p) => byPhase.has(p.id))
      .map((p) => ({ phase: p, items: byPhase.get(p.id)! }));
  }, [work, data.phases]);

  const remainingHours = tasks
    .filter((t) => showTiers.includes(t.tier) && t.status !== 'done' && t.status !== 'skipped')
    .reduce((s, t) => s + t.est_hours, 0);
  const weeksNeeded = data.config.hours_per_week
    ? Math.ceil(remainingHours / data.config.hours_per_week)
    : 0;

  const toggleTier = (id: number) =>
    setShowTiers((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].sort(),
    );

  return (
    <div className="tdo">
      {/* ---------------------------------------------------------- hero */}
      <header className="tdo-hero">
        <div className="tdo-eyebrow">
          <MdRocketLaunch style={{ verticalAlign: '-3px', marginRight: 6 }} />
          Tiến độ thi công
        </div>
        <h1 className="tdo-title">{data.config.topic || 'Đề tài nghiên cứu'}</h1>
        {data.config.claim && <p className="tdo-claim">{data.config.claim}</p>}
        <div className="tdo-meta">
          <span>
            <b>Tuần {week}</b> / {data.config.total_weeks}
          </span>
          <span className="tdo-dot" />
          <span>
            Còn <b>{remainingHours}h</b> ở các tầng đang xem
          </span>
          <span className="tdo-dot" />
          <span>
            ≈ <b>{weeksNeeded} tuần</b> với {data.config.hours_per_week}h/tuần
          </span>
        </div>
      </header>

      {err && <div className="tdo-err">⚠ {err}</div>}

      {/* -------------------------------------------------- bước tiếp theo */}
      {next ? (
        <section className="tdo-next">
          <div className="tdo-next-tag">Bước tiếp theo — chỉ cần biết một thứ này</div>
          <div className="tdo-next-body">
            <div className="tdo-next-main">
              <div className="tdo-next-id">
                {next.id}
                {next.owner === 'claude' && (
                  <span className="tdo-owner claude" title="Việc của Claude — cứ giao">
                    <MdSmartToy /> Claude làm
                  </span>
                )}
                {next.owner === 'anh' && (
                  <span className="tdo-owner anh">
                    <MdPerson /> Anh làm
                  </span>
                )}
                <span className="tdo-est">~{next.est_hours}h</span>
              </div>
              <h2>{next.title}</h2>
              <p className="tdo-next-how">{next.how}</p>
              <p className="tdo-next-dod">
                <b>Xong khi:</b> {next.done_when}
              </p>
            </div>
            <button
              className="tdo-next-btn"
              disabled={busy === next.id}
              onClick={() =>
                patch(next.id, { status: next.status === 'doing' ? 'done' : 'doing' })
              }
            >
              {busy === next.id
                ? '…'
                : next.status === 'doing'
                  ? '✓ Đánh dấu xong'
                  : '▶ Bắt đầu việc này'}
            </button>
          </div>
        </section>
      ) : (
        <section className="tdo-next tdo-next-empty">
          <div className="tdo-next-tag">Không còn việc nào mở</div>
          <p>
            Mọi task ở các tầng đang xem đã xong hoặc đang bị chặn. Bật thêm tầng bên
            dưới, hoặc mở phiên với Claude và hỏi <b>&ldquo;tuần này làm gì?&rdquo;</b>
          </p>
        </section>
      )}

      {/* -------------------------------------------- thư viện tổng quát */}
      {stats && (
        <section className="ov-stats">
          <div className="ov-tiles">
            <div className="ov-tile">
              <div className="ov-num">{stats.total}</div>
              <div className="ov-label">paper trong kho</div>
            </div>
            <div className="ov-tile">
              <div className="ov-num">{stats.chosen}</div>
              <div className="ov-label">đã chọn</div>
            </div>
            <div className="ov-tile">
              <div className="ov-num">{stats.withAnalysis}</div>
              <div className="ov-label">có phân tích</div>
            </div>
            <div className="ov-tile">
              <div className="ov-num">{stats.withCode}</div>
              <div className="ov-label">có code</div>
            </div>
          </div>
          <div className="ov-layers">
            {stats.byLayer.map((l) => {
              const pct = l.count ? Math.round((l.chosen / l.count) * 100) : 0;
              return (
                <div
                  key={l.id}
                  className="ov-layerbar"
                  data-tip={`${l.name}: ${l.chosen} chọn · ${l.analyzed} phân tích · ${l.count} tổng`}
                >
                  <span className="ov-ltag">L{l.id}</span>
                  <div className="ov-bar">
                    <div className="ov-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="ov-lnums">
                    {l.chosen}/{l.count}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- các tầng */}
      <section className="tdo-tiers">
        {data.tiers.map((tier) => {
          const st = tierStats(tasks, tier.id);
          const on = showTiers.includes(tier.id);
          return (
            <button
              key={tier.id}
              className={`tdo-tier${on ? ' on' : ''}${tier.required ? ' req' : ''}`}
              onClick={() => toggleTier(tier.id)}
              title={on ? 'Bấm để ẩn tầng này' : 'Bấm để hiện tầng này'}
            >
              <div className="tdo-tier-head">
                <span className="tdo-tier-name">{tier.name}</span>
                {tier.required ? (
                  <span className="tdo-req-flag">BẮT BUỘC</span>
                ) : (
                  <span className="tdo-opt-flag">tuỳ chọn</span>
                )}
              </div>
              <div className="tdo-bar">
                <div className="tdo-bar-fill" style={{ width: `${st.pct}%` }} />
              </div>
              <div className="tdo-tier-nums">
                <b>{st.pct}%</b>
                <span>
                  {st.done}/{st.total} việc · {st.hoursDone}/{st.hoursTotal}h
                </span>
              </div>
              <div className="tdo-tier-out">{tier.outcome}</div>
            </button>
          );
        })}
      </section>

      {/* --------------------------------------------------- đường găng */}
      <section className="tdo-milestones">
        <div className="tdo-sec-title">
          <MdFlag /> Đường găng — chỉ 4 mốc này trễ mới thật sự trễ
        </div>
        <div className="tdo-ms-row">
          {data.milestones.map((m) => {
            const t = tasks.find((x) => x.id === m.task_id);
            const done = t?.status === 'done';
            const late = !done && week > m.due_week;
            return (
              <div
                key={m.id}
                className={`tdo-ms${done ? ' done' : ''}${late ? ' late' : ''}`}
                data-tip={`Nếu trễ: ${m.fallback}`}
              >
                <div className="tdo-ms-top">
                  <span className="tdo-ms-id">{m.id}</span>
                  <span className="tdo-ms-due">tuần {m.due_week}</span>
                </div>
                <div className="tdo-ms-label">{m.label}</div>
                <div className="tdo-ms-state">
                  {done ? '✓ xong' : late ? '⚠ đã quá hạn' : `còn ${m.due_week - week} tuần`}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------- bộ lọc */}
      <div className="tdo-filters">
        <label className="tdo-check">
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => setHideDone(e.target.checked)}
          />
          Ẩn việc đã xong
        </label>
        <span className="tdo-filter-hint">
          Mặc định chỉ hiện <b>Tầng 0</b> — bấm vào thẻ tầng ở trên để hiện/ẩn.
        </span>
      </div>

      {/* --------------------------------------------------- cần xác minh */}
      {checks.length > 0 && (
        <section className="tdo-checks">
          <div className="tdo-sec-title">
            <MdVerifiedUser /> Cần tự xác minh — đừng viết vào bài trước khi làm
          </div>
          <p className="tdo-checks-note">
            Đây là các <b>claim về người khác</b> hoặc số do máy đếm. Sai một câu là mất
            uy tín cả bài.
          </p>
          {checks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              all={tasks}
              expanded={!!expanded[t.id]}
              onToggle={() => setExpanded((e) => ({ ...e, [t.id]: !e[t.id] }))}
              busy={busy === t.id}
              draft={drafts[t.id]}
              onDraft={(v) => setDrafts((d) => ({ ...d, [t.id]: v }))}
              onPatch={(b) => patch(t.id, b)}
            />
          ))}
        </section>
      )}

      {/* ------------------------------------------------------ task list */}
      {grouped.map(({ phase, items }) => (
        <section key={phase.id} className="tdo-phase">
          <div className="tdo-phase-head">
            <span className="tdo-phase-id">{phase.id}</span>
            <h3>{phase.name}</h3>
            <span className="tdo-phase-weeks">{phase.weeks}</span>
            <span className="tdo-phase-count">
              {items.filter((t) => t.status === 'done').length}/{items.length}
            </span>
          </div>
          {items.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              all={tasks}
              expanded={!!expanded[t.id]}
              onToggle={() => setExpanded((e) => ({ ...e, [t.id]: !e[t.id] }))}
              busy={busy === t.id}
              draft={drafts[t.id]}
              onDraft={(v) => setDrafts((d) => ({ ...d, [t.id]: v }))}
              onPatch={(b) => patch(t.id, b)}
            />
          ))}
        </section>
      ))}

      <footer className="tdo-foot">
        Nguồn dữ liệu: <code>PROGRESS.json</code> ở thư mục gốc — Claude cũng đọc/ghi file
        này, nên mọi thay đổi ở đây phiên sau em đều thấy.
        {data.updated_at && <> Cập nhật lần cuối: {data.updated_at}.</>}
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ card */

function TaskCard({
  task,
  all,
  expanded,
  onToggle,
  busy,
  draft,
  onDraft,
  onPatch,
}: {
  task: Task;
  all: Task[];
  expanded: boolean;
  onToggle: () => void;
  busy: boolean;
  draft: string | undefined;
  onDraft: (v: string) => void;
  onPatch: (b: { status?: TaskStatus; note?: string }) => void;
}) {
  const meta = STATUS_META[task.status];
  const open = isUnblocked(task, all);
  const blockers = task.blocked_by
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is Task => !!t && t.status !== 'done' && t.status !== 'skipped');

  const noteValue = draft ?? task.note;
  const dirty = draft !== undefined && draft !== task.note;

  return (
    <article
      className={`tdo-card ${meta.cls}${task.critical ? ' crit' : ''}${open ? '' : ' locked'}`}
    >
      <div className="tdo-card-row">
        <button
          className={`tdo-status ${meta.cls}`}
          disabled={busy}
          title={`${meta.label} — bấm để đổi`}
          onClick={() => onPatch({ status: CYCLE[task.status] })}
        >
          <meta.Icon />
        </button>

        <button className="tdo-card-main" onClick={onToggle}>
          <div className="tdo-card-line">
            <span className="tdo-id">{task.id}</span>
            {task.critical && (
              <span className="tdo-crit" title="Nằm trên đường găng">
                <MdBolt /> găng
              </span>
            )}
            {task.owner === 'claude' ? (
              <span className="tdo-owner claude" title="Việc của Claude — cứ giao">
                <MdSmartToy /> Claude
              </span>
            ) : (
              <span className="tdo-owner anh">
                <MdPerson /> Anh
              </span>
            )}
            <span className="tdo-est">~{task.est_hours}h</span>
            {!open && (
              <span className="tdo-blocked" title={`Chờ: ${blockers.map((b) => b.id).join(', ')}`}>
                <MdLock /> chờ {blockers.map((b) => b.id).join(', ')}
              </span>
            )}
          </div>
          <div className="tdo-card-title">{task.title}</div>
        </button>

        <button className={`tdo-exp${expanded ? ' open' : ''}`} onClick={onToggle}>
          <MdExpandMore />
        </button>
      </div>

      {expanded && (
        <div className="tdo-card-body">
          {task.why && (
            <div className="tdo-field">
              <span className="tdo-flabel">Vì sao việc này tồn tại</span>
              <p>{task.why}</p>
            </div>
          )}
          {task.how && (
            <div className="tdo-field">
              <span className="tdo-flabel">Làm thế nào</span>
              <p>{task.how}</p>
            </div>
          )}
          {task.done_when && (
            <div className="tdo-field tdo-dod">
              <span className="tdo-flabel">Xong khi — dừng ở đây, đừng làm thêm</span>
              <p>{task.done_when}</p>
            </div>
          )}

          {task.links.length > 0 && (
            <div className="tdo-links">
              {task.links.map((l) => (
                <span key={l.href} className="tdo-link">
                  <MdLink /> {l.label} <code>{l.href}</code>
                </span>
              ))}
            </div>
          )}

          <div className="tdo-note">
            <span className="tdo-flabel">
              <MdEditNote style={{ verticalAlign: '-3px' }} /> Ghi chú của anh
            </span>
            <textarea
              value={noteValue}
              placeholder="Kết quả, số liệu, vướng mắc… Claude sẽ đọc phần này ở phiên sau."
              onChange={(e) => onDraft(e.target.value)}
              rows={3}
            />
            <div className="tdo-note-actions">
              <button
                className="btn primary"
                disabled={!dirty || busy}
                onClick={() => onPatch({ note: noteValue })}
              >
                <MdSave style={{ verticalAlign: '-3px', marginRight: 4 }} />
                {busy ? 'Đang lưu…' : dirty ? 'Lưu ghi chú' : 'Đã lưu'}
              </button>
              <div className="tdo-status-set">
                {(['todo', 'doing', 'done', 'skipped'] as TaskStatus[]).map((s) => (
                  <button
                    key={s}
                    className={`tdo-sbtn ${s}${task.status === s ? ' on' : ''}`}
                    disabled={busy}
                    onClick={() => onPatch({ status: s })}
                  >
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {task.done_at && <div className="tdo-doneat">Đánh dấu xong: {task.done_at}</div>}
        </div>
      )}
    </article>
  );
}
