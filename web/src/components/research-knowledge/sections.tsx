'use client';

import { useEffect, useState } from 'react';
import {
  MdInfoOutline,
  MdLightbulbOutline,
  MdFactCheck,
  MdRocketLaunch,
  MdWarningAmber,
  MdInsights,
  MdChecklist,
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdScience,
  MdCode,
  MdVerified,
  MdAutorenew,
  MdExpandMore,
  MdBolt,
  MdCheck,
  MdClose,
  MdChevronRight,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import {
  CONTENT,
  CHAPTER_BY_ID,
  CHECKLIST_ITEMS,
  FINER,
  LEAK_STEPS,
  VALUE_LADDER,
  TLDR,
  LIFECYCLE,
  DO_DONT,
  type ContentBlock,
} from './data';
import { useLocalStorage } from '../knowledge/useLocalStorage';
import type {
  ResearchLessons,
  LessonCard,
  RecurringLesson,
} from '@/lib/research-lessons-types';

/* ---------- khối dùng chung ---------- */

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: IconType;
  title: string;
  children: React.ReactNode;
}) {
  const ch = CHAPTER_BY_ID[id];
  return (
    <section
      id={id}
      className="kb-section kb-reveal"
      style={ch ? ({ ['--ch' as string]: ch.hue } as React.CSSProperties) : undefined}
    >
      <h2 className="kb-h2">
        {ch && <span className="kb-chno">{ch.no}</span>}
        <Icon className="kb-h2-ico" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Lead({ text }: { text: string }) {
  return <p className="kb-lead">{text}</p>;
}

function Callout({ text }: { text: string }) {
  return (
    <div className="kb-callout">
      <MdLightbulbOutline />
      <div>
        <b>Chốt:</b> {text}
      </div>
    </div>
  );
}

/* "Nhớ nhanh" — đường đọc ngắn: 1 câu gist + 3 quy tắc.
   Đây là phần lazy-reader đọc đầu tiên; cũng là rule rõ ràng cho agent. */
function Tldr({ id }: { id: string }) {
  const t = TLDR[id];
  if (!t) return null;
  return (
    <div className="rk-tldr">
      <div className="rk-tldr-tag">
        <MdBolt /> Nhớ nhanh
      </div>
      <p className="rk-tldr-gist">{t.gist}</p>
      <ul className="rk-tldr-rules">
        {t.rules.map((r, i) => (
          <li key={i}>
            <MdChevronRight />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Một khối nội dung = thẻ gập. Mặc định mở thẻ đầu; còn lại gập để
   skim heading rồi mở thứ cần. Nội dung đầy đủ vẫn ở DOM (SSR/agent). */
function CollapseBlock({ b, open }: { b: ContentBlock; open: boolean }) {
  const [on, setOn] = useState(open);
  return (
    <div className={`rk-block${on ? ' open' : ''}`}>
      <button
        className="rk-block-toggle"
        onClick={() => setOn((v) => !v)}
        aria-expanded={on}
        type="button"
      >
        <h3 className="rk-block-h">{b.heading}</h3>
        <MdExpandMore className="rk-block-caret" />
      </button>
      <div className="rk-block-panel">
        <div className="rk-block-panel-in">
          <p className="rk-block-body">{b.body}</p>
          {b.items && b.items.length > 0 && (
            <ul className="rk-list">
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          )}
          {b.evidence && b.evidence.length > 0 && (
            <div className="rk-evidence">
              <span className="rk-evi-lbl">Dẫn chứng:</span>
              {b.evidence.map((e) => (
                <span key={e} className="rk-evi-chip" data-tip="Paper trong kho">
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="rk-blocks">
      <div className="rk-blocks-hint">
        <MdInfoOutline /> Bấm vào tiêu đề để mở rộng chi tiết &amp; dẫn chứng.
      </div>
      {blocks.map((b, i) => (
        <CollapseBlock key={i} b={b} open={i === 0} />
      ))}
    </div>
  );
}

/* Vòng đời nghiên cứu — 8 chặng nối nhau (thay danh sách dài). */
function LifecycleFlow() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="rk-flow">
      {LIFECYCLE.map((s, i) => (
        <div key={s.no} className="rk-flow-wrap">
          <button
            className={`rk-flow-node${sel === s.no ? ' on' : ''}`}
            onClick={() => setSel((v) => (v === s.no ? null : s.no))}
            data-tip={s.one}
            type="button"
          >
            <span className="rk-flow-no">{s.no}</span>
            <span className="rk-flow-label">{s.label}</span>
            <span className="rk-flow-one">{s.one}</span>
          </button>
          {i < LIFECYCLE.length - 1 && <span className="rk-flow-arrow">→</span>}
        </div>
      ))}
    </div>
  );
}

/* Bảng Nên / Tránh — ghi nhớ bằng đối lập. */
function DoDontBoard() {
  return (
    <div className="rk-dodont">
      <div className="rk-dd-col good">
        <div className="rk-dd-head">
          <MdCheck /> NÊN
        </div>
        <ul>
          {DO_DONT.do.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="rk-dd-col bad">
        <div className="rk-dd-head">
          <MdClose /> TRÁNH
        </div>
        <ul>
          {DO_DONT.dont.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Bar({ label, v, tone }: { label: string; v: number; tone: string }) {
  return (
    <div className="rk-bar">
      <span className="rk-bar-l">{label}</span>
      <div className="rk-bar-track">
        <div
          className="rk-bar-fill"
          style={{ width: `${Math.min(Math.max(v, 0), 100)}%`, background: tone }}
        />
      </div>
      <span className="rk-bar-v">{v.toFixed(1)}%</span>
    </div>
  );
}

/* ---------- 01. Tổng quan ---------- */

function PillarStrip() {
  const pillars = [
    { tag: 'Ý nghĩa', color: 'var(--purple)', body: 'Câu hỏi đáng hỏi, lấp một gap có thật.' },
    { tag: 'Đúng chuẩn', color: 'var(--ch-teal)', body: 'Không rò rỉ, đánh giá đúng, tái lập được.' },
    { tag: 'Giá trị', color: 'var(--amber)', body: 'Giải thích, triển khai, đổi quyết định.' },
  ];
  return (
    <div className="kb-type-grid">
      {pillars.map((p) => (
        <div key={p.tag} className="kb-type-card" style={{ borderTopColor: p.color }}>
          <span className="kb-type-tag" style={{ color: p.color }}>
            {p.tag}
          </span>
          <p className="kb-type-body">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Overview() {
  const c = CONTENT.overview;
  return (
    <Section id="overview" icon={MdInfoOutline} title="Từ ý tưởng đến bài báo có giá trị">
      <Tldr id="overview" />
      <PillarStrip />
      <h3 className="rk-mini-h">Vòng đời một nghiên cứu — 8 chặng nối liền nhau</h3>
      <LifecycleFlow />
      <Lead text={c.lead} />
      <Blocks blocks={c.blocks} />
      {c.callout && <Callout text={c.callout} />}
    </Section>
  );
}

/* ---------- 02. Có ý nghĩa — FINER scorer ---------- */

function FinerScorer() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const score = FINER.filter((f) => on[f.key]).length;
  const tone =
    score === 5 ? 'var(--green)' : score >= 3 ? 'var(--amber)' : 'var(--red)';
  const verdict =
    score === 5
      ? 'Đủ 5 tiêu chí tự rà soát — vẫn cần bằng chứng và phản biện.'
      : score >= 3
        ? 'Tiềm năng — củng cố các tiêu chí còn thiếu.'
        : 'Còn yếu — nên đóng khung lại câu hỏi.';
  return (
    <div className="rk-widget">
      <div className="rk-widget-head">
        <MdLightbulbOutline /> Bộ kiểm FINER — tự chấm câu hỏi nghiên cứu
      </div>
      <p className="muted rk-widget-lead">Bấm vào tiêu chí mà câu hỏi của bạn thoả.</p>
      <div className="rk-finer">
        {FINER.map((f) => (
          <button
            key={f.key}
            className={`rk-finer-item${on[f.key] ? ' on' : ''}`}
            onClick={() => setOn((s) => ({ ...s, [f.key]: !s[f.key] }))}
            data-tip={f.desc}
            type="button"
          >
            <span className="rk-finer-letter">{f.letter}</span>
            <span className="rk-finer-label">{f.label}</span>
            <span className="rk-finer-check">
              {on[f.key] ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
            </span>
          </button>
        ))}
      </div>
      <div className="rk-finer-foot">
        <div
          className="rk-score-ring"
          style={
            {
              ['--p' as string]: `${(score / 5) * 100}%`,
              ['--tone' as string]: tone,
            } as React.CSSProperties
          }
        >
          <b>{score}</b>
          <span>/5</span>
        </div>
        <p className="rk-finer-verdict" style={{ color: tone }}>
          {verdict}
        </p>
      </div>
    </div>
  );
}

export function Meaningful() {
  const c = CONTENT.meaningful;
  return (
    <Section id="meaningful" icon={MdLightbulbOutline} title="Nghiên cứu THẬT SỰ có ý nghĩa">
      <Tldr id="meaningful" />
      <FinerScorer />
      <Lead text={c.lead} />
      <Blocks blocks={c.blocks} />
      {c.callout && <Callout text={c.callout} />}
    </Section>
  );
}

/* ---------- 03. Đúng chuẩn — Leakage simulator ---------- */

// Điểm chỉ dùng để minh hoạ mức độ nghiêm trọng tương đối, không phải % accuracy.
const LEAK_RISK: Record<string, number> = { scale: 10, impute: 15, select: 30, sample: 45 };

function LeakageSimulator() {
  const [scope, setScope] = useState<Record<string, 'all' | 'train'>>(
    Object.fromEntries(LEAK_STEPS.map((s) => [s.key, 'train'])),
  );
  const riskScore = LEAK_STEPS.reduce(
    (a, s) => a + (scope[s.key] === 'all' ? LEAK_RISK[s.key] ?? 0 : 0),
    0,
  );
  const leaking = riskScore > 0;
  return (
    <div className="rk-widget">
      <div className="rk-widget-head">
        <MdScience /> Bộ mô phỏng rò rỉ dữ liệu (data leakage)
      </div>
      <p className="muted rk-widget-lead">
        Với mỗi bước, chọn bạn &quot;học&quot; nó trên TOÀN bộ dữ liệu (trước khi chia) hay CHỈ
        trên train trong từng fold.
      </p>
      <div className="rk-leak">
        {LEAK_STEPS.map((s) => (
          <div key={s.key} className="rk-leak-row">
            <div className="rk-leak-name" data-tip={s.desc}>
              {s.label}
            </div>
            <div className="rk-toggle">
              <button
                className={`rk-toggle-opt${scope[s.key] === 'train' ? ' on good' : ''}`}
                onClick={() => setScope((p) => ({ ...p, [s.key]: 'train' }))}
                type="button"
              >
                Chỉ train ✓
              </button>
              <button
                className={`rk-toggle-opt${scope[s.key] === 'all' ? ' on bad' : ''}`}
                onClick={() => setScope((p) => ({ ...p, [s.key]: 'all' }))}
                type="button"
              >
                Toàn bộ ✗
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={`rk-leak-verdict${leaking ? ' bad' : ' good'}`}>
        {leaking ? (
          <>
            <MdWarningAmber /> RÒ RỈ DỮ LIỆU — accuracy bị thổi phồng
          </>
        ) : (
          <>
            <MdCheckCircle /> Quy trình sạch — số liệu đáng tin
          </>
        )}
      </div>
      <div className="rk-leak-bars">
        <Bar
          label="Rủi ro bias do quy trình"
          v={riskScore}
          tone={leaking ? 'var(--red)' : 'var(--green)'}
        />
        <Bar label="Mức sạch của pipeline"
          v={100 - riskScore}
          tone={leaking ? 'var(--amber)' : 'var(--green)'}
        />
      </div>
      {leaking && (
        <p className="rk-leak-note">
          Điểm trên chỉ là thang minh hoạ để so sánh các lỗi, không phải ước lượng phần
          trăm accuracy bị thổi phồng. Mức bias thật chỉ xác định được bằng thiết kế đánh
          giá sạch hoặc ablation trên chính dữ liệu nghiên cứu.
        </p>
      )}
    </div>
  );
}

export function Rigor() {
  const c = CONTENT.rigor;
  return (
    <Section id="rigor" icon={MdFactCheck} title="Làm cho ĐÚNG CHUẨN khoa học">
      <Tldr id="rigor" />
      <DoDontBoard />
      <LeakageSimulator />
      <Lead text={c.lead} />
      <Blocks blocks={c.blocks} />
      <div className="kb-callout">
        <MdInfoOutline />
        <div>
          <b>Hai công cụ khác vai trò:</b>{' '}
          <a href="https://www.bmj.com/content/385/bmj.q902" target="_blank" rel="noreferrer">
            TRIPOD+AI
          </a>{' '}
          hướng dẫn báo cáo;{' '}
          <a href="https://www.bmj.com/content/388/bmj-2024-082505" target="_blank" rel="noreferrer">
            PROBAST+AI
          </a>{' '}
          đánh giá quality, risk of bias và applicability. Làm tốt cái thứ nhất không tự
          động đạt cái thứ hai.
        </div>
      </div>
      {c.callout && <Callout text={c.callout} />}
    </Section>
  );
}

/* ---------- 04. Giá trị — Value ladder ---------- */

function ValueLadder() {
  const [level, setLevel] = useState(2);
  return (
    <div className="rk-widget">
      <div className="rk-widget-head">
        <MdRocketLaunch /> Bậc thang giá trị — nghiên cứu của bạn đang ở đâu?
      </div>
      <p className="muted rk-widget-lead">Bấm từng bậc. Giá trị thực tiễn tăng dần khi leo cao.</p>
      <div className="rk-ladder">
        {[...VALUE_LADDER].reverse().map((r) => (
          <button
            key={r.level}
            className={`rk-rung${level >= r.level ? ' reached' : ''}${
              level === r.level ? ' current' : ''
            }`}
            onClick={() => setLevel(r.level)}
            type="button"
          >
            <span className="rk-rung-lvl">{r.level}</span>
            <div className="rk-rung-main">
              <div className="rk-rung-title">{r.title}</div>
              <div className="rk-rung-detail">{r.detail}</div>
            </div>
            {r.example && (
              <span className="rk-rung-ex" data-tip="Ví dụ trong kho">
                {r.example}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Value() {
  const c = CONTENT.value;
  return (
    <Section id="value" icon={MdRocketLaunch} title="Tạo ra GIÁ TRỊ thực tiễn — và giá trị gì">
      <Tldr id="value" />
      <ValueLadder />
      <Lead text={c.lead} />
      <Blocks blocks={c.blocks} />
      {c.callout && <Callout text={c.callout} />}
    </Section>
  );
}

/* ---------- 05. Bẫy & cờ đỏ — Accuracy trap ---------- */

function AccuracyTrap() {
  const [prev, setPrev] = useState(10);
  const lazyAcc = 100 - prev;
  return (
    <div className="rk-widget">
      <div className="rk-widget-head">
        <MdWarningAmber /> Vì sao accuracy đánh lừa — kéo tỉ lệ mắc bệnh
      </div>
      <p className="muted rk-widget-lead">
        Một mô hình &quot;lười&quot; đoán TẤT CẢ là khoẻ. Xem accuracy của nó khi bệnh càng hiếm.
      </p>
      <input
        type="range"
        min={1}
        max={50}
        step={1}
        value={prev}
        onChange={(e) => setPrev(Number(e.target.value))}
        className="kb-range plain"
        aria-label="Tỉ lệ mắc bệnh"
      />
      <div className="rk-trap-grid">
        <div className="rk-trap-cell">
          <span className="rk-trap-n">{prev}%</span>
          <span className="rk-trap-l">tỉ lệ mắc bệnh</span>
        </div>
        <div className="rk-trap-cell green">
          <span className="rk-trap-n">{lazyAcc}%</span>
          <span className="rk-trap-l">accuracy của mô hình &quot;lười&quot;</span>
        </div>
        <div className="rk-trap-cell red">
          <span className="rk-trap-n">0%</span>
          <span className="rk-trap-l">recall — bắt được ca bệnh</span>
        </div>
      </div>
      <p className="rk-leak-note">
        Accuracy {lazyAcc}% nghe rất cao nhưng bỏ sót 100% bệnh nhân. Đây là lý do phải nhìn
        recall / AUPRC, không chỉ accuracy.
      </p>
    </div>
  );
}

export function Pitfalls() {
  const c = CONTENT.pitfalls;
  return (
    <Section id="pitfalls" icon={MdWarningAmber} title="Bẫy & cờ đỏ (rút từ kho)">
      <Tldr id="pitfalls" />
      <AccuracyTrap />
      <Lead text={c.lead} />
      <Blocks blocks={c.blocks} />
      {c.callout && <Callout text={c.callout} />}
    </Section>
  );
}

/* ---------- 06. Kinh nghiệm từ kho (ĐỘNG) ---------- */

function verdictTone(v: string | null): string {
  return v === 'strong' ? 'var(--green)' : v === 'maybe' ? 'var(--amber)' : 'var(--red)';
}
function verdictLabel(v: string | null): string {
  return v === 'strong' ? 'Mạnh' : v === 'maybe' ? 'Cân nhắc' : v === 'weak' ? 'Yếu' : '—';
}

function ExperienceLive() {
  const [data, setData] = useState<ResearchLessons | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch('/api/research-lessons')
      .then((r) => r.json())
      .then((d: ResearchLessons) => setData(d))
      .catch(() => setErr(true));
  }, []);

  if (err)
    return <div className="rk-empty">Không tải được kinh nghiệm từ kho (cần chạy webapp).</div>;
  if (!data) return <div className="rk-empty">Đang đọc kho…</div>;

  const maxCount = Math.max(1, ...data.recurring.map((r) => r.count));

  return (
    <div className="rk-exp">
      <div className="rk-exp-stats">
        <Stat n={data.totals.analyzed} l="đã phân tích sâu" />
        <Stat n={data.totals.chosen} l="đã chọn (baseline)" />
        <Stat n={data.totals.withCode} l="có code công khai" />
        <Stat n={data.totals.papers} l="tổng trong kho" />
      </div>

      {data.recurring.length > 0 && (
        <div className="rk-exp-block">
          <h3 className="rk-block-h">Bài học lặp lại nhiều bài (tự đếm từ kho)</h3>
          <div className="rk-recurring">
            {data.recurring.map((r: RecurringLesson) => (
              <div key={r.key} className="rk-rec-row" data-tip={r.hint}>
                <span className="rk-rec-label">{r.label}</span>
                <div className="rk-rec-track">
                  <div
                    className="rk-rec-fill"
                    style={{ width: `${(r.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="rk-rec-count">{r.count} bài</span>
              </div>
            ))}
          </div>
          <p className="muted rk-exp-foot">
            Đây là các lỗi/giới hạn xuất hiện nhiều nhất — chính là cơ hội cải tiến cho đề tài.
          </p>
        </div>
      )}

      <div className="rk-exp-block">
        <h3 className="rk-block-h">Từng bài đã phân tích — đóng góp &amp; điểm yếu</h3>
        <div className="rk-card-grid">
          {data.cards.map((c: LessonCard) => (
            <div key={c.paper_id} className="rk-card">
              <div className="rk-card-top">
                <span className="rk-card-layer">L{c.layer}</span>
                <span className="rk-card-id">{c.paper_id}</span>
                <span
                  className="rk-card-verdict"
                  style={{
                    color: verdictTone(c.verdict),
                    background: `color-mix(in srgb, ${verdictTone(c.verdict)} 16%, transparent)`,
                  }}
                >
                  {verdictLabel(c.verdict)}
                </span>
              </div>
              {c.contribution && <p className="rk-card-contrib">{c.contribution}</p>}
              {c.best_metric && (
                <p className="rk-card-metric">
                  <MdVerified /> {c.best_metric}
                </p>
              )}
              {c.gap && (
                <p className="rk-card-gap">
                  <MdWarningAmber /> {c.gap}
                </p>
              )}
              <div className="rk-card-tags">
                {c.is_chosen && <span className="rk-tag chosen">đã chọn</span>}
                <span className={`rk-tag ${c.has_code ? 'good' : 'bad'}`}>
                  <MdCode /> {c.has_code ? 'có code' : 'không code'}
                </span>
                {c.reproducible && <span className="rk-tag">tái lập: {c.reproducible}</span>}
                {typeof c.citations === 'number' && (
                  <span className="rk-tag">📚 {c.citations}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rk-exp-live">
        <MdAutorenew /> Phần này đọc trực tiếp từ <code>searched_papers/**/summary.json</code> — phân
        tích thêm bài mới, danh sách tự cập nhật.
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return (
    <div className="rk-stat">
      <b>{n}</b>
      <span>{l}</span>
    </div>
  );
}

export function Experience() {
  const c = CONTENT.experience;
  return (
    <Section id="experience" icon={MdInsights} title="Kinh nghiệm từ kho (cập nhật liên tục)">
      <Tldr id="experience" />
      <Lead text={c.lead} />
      <ExperienceLive />
    </Section>
  );
}

/* ---------- 07. Checklist ---------- */

export function Checklist() {
  const [stored, setStored, ready] = useLocalStorage<boolean[]>(
    'explorex.rk.checklist',
    CHECKLIST_ITEMS.map(() => false),
  );
  const done =
    stored.length === CHECKLIST_ITEMS.length ? stored : CHECKLIST_ITEMS.map(() => false);
  const count = done.filter(Boolean).length;
  const c = CONTENT.checklist;
  return (
    <Section id="checklist" icon={MdChecklist} title="Checklist trước khi công bố">
      <Tldr id="checklist" />
      <Lead text={c.lead} />
      <div className="rk-check-progress">
        <div className="rk-check-bar">
          <div
            className="rk-check-bar-fill"
            style={{ width: `${(count / CHECKLIST_ITEMS.length) * 100}%` }}
          />
        </div>
        <span className="rk-check-count">
          {count}/{CHECKLIST_ITEMS.length}
        </span>
      </div>
      <div className="kb-check" style={ready ? undefined : { visibility: 'hidden' }}>
        {CHECKLIST_ITEMS.map((it, i) => (
          <button
            key={i}
            className={`kb-check-row${done[i] ? ' on' : ''}`}
            onClick={() =>
              setStored((d) => {
                const base =
                  d.length === CHECKLIST_ITEMS.length ? d : CHECKLIST_ITEMS.map(() => false);
                return base.map((x, j) => (j === i ? !x : x));
              })
            }
            type="button"
          >
            <span className="kb-check-box">{done[i] && <MdCheckCircle />}</span>
            <span>{it}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}
