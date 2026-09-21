'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MdCheckCircle,
  MdCancel,
  MdArrowForward,
  MdReplay,
  MdMenuBook,
  MdEmojiEvents,
} from 'react-icons/md';
import { QUIZ, type QuizQuestion } from './quizData';
import { CHAPTER_BY_ID } from './data';
import { useLocalStorage } from '../knowledge/useLocalStorage';

interface QuizStats {
  lastScore: { correct: number; total: number; at: number } | null;
  stats: Record<string, { seen: number; correct: number }>;
}

const EMPTY_STATS: QuizStats = { lastScore: null, stats: {} };

/** Fisher–Yates — chỉ chạy sau mount/khi bấm nên không phá static. */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuizProps {
  onJumpToChapter: (id: string) => void;
}

export function Quiz({ onJumpToChapter }: QuizProps) {
  const [persist, setPersist] = useLocalStorage<QuizStats>('explorex.rk.quiz', EMPTY_STATS);

  const [order, setOrder] = useState<QuizQuestion[]>(QUIZ);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setOrder(shuffle(QUIZ));
  }, []);

  const total = order.length;
  const done = idx >= total;
  const q = done ? null : order[idx];

  function choose(i: number) {
    if (picked !== null || !q) return;
    const correct = i === q.answer;
    setPicked(i);
    setResults((r) => ({ ...r, [q.id]: correct }));
    setPersist((p) => ({
      ...p,
      stats: {
        ...p.stats,
        [q.id]: {
          seen: (p.stats[q.id]?.seen ?? 0) + 1,
          correct: (p.stats[q.id]?.correct ?? 0) + (correct ? 1 : 0),
        },
      },
    }));
  }

  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }

  useEffect(() => {
    if (done && total > 0) {
      const correct = Object.values(results).filter(Boolean).length;
      setPersist((p) => ({ ...p, lastScore: { correct, total, at: Date.now() } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function restart(set: QuizQuestion[]) {
    setOrder(shuffle(set));
    setIdx(0);
    setPicked(null);
    setResults({});
  }

  if (done) {
    return (
      <Summary
        order={order}
        results={results}
        lastScore={persist.lastScore}
        onRestartAll={() => restart(QUIZ)}
        onRetryWrong={(wrong) => restart(wrong)}
        onJumpToChapter={onJumpToChapter}
      />
    );
  }

  if (!q) return null;
  const ch = CHAPTER_BY_ID[q.chapter];
  const progress = (idx / total) * 100;

  return (
    <div
      className="quiz"
      style={{ ['--ch' as string]: ch?.hue ?? 'var(--accent)' } as React.CSSProperties}
    >
      <div className="quiz-bar-wrap">
        <div className="quiz-bar">
          <div className="quiz-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="quiz-count">
          Câu {idx + 1}/{total}
        </span>
      </div>

      <div className="quiz-card">
        {ch && (
          <button
            className="quiz-chip"
            onClick={() => onJumpToChapter(q.chapter)}
            type="button"
          >
            <span className="quiz-chip-no">{ch.no}</span>
            {ch.label}
          </button>
        )}
        <h2 className="quiz-q">{q.prompt}</h2>

        <div className="quiz-opts">
          {q.options.map((opt, i) => {
            let cls = 'quiz-opt';
            if (picked !== null) {
              if (i === q.answer) cls += ' correct';
              else if (i === picked) cls += ' wrong';
              else cls += ' dim';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => choose(i)}
                disabled={picked !== null}
                type="button"
              >
                <span className="quiz-opt-mark">
                  {picked !== null && i === q.answer && <MdCheckCircle />}
                  {picked !== null && i === picked && i !== q.answer && <MdCancel />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className={`quiz-feedback${picked === q.answer ? ' ok' : ' no'}`}>
            <div className="quiz-feedback-head">
              {picked === q.answer ? (
                <>
                  <MdCheckCircle /> Chính xác
                </>
              ) : (
                <>
                  <MdCancel /> Chưa đúng
                </>
              )}
            </div>
            <p>{q.explain}</p>
            <div className="quiz-actions">
              <button
                className="quiz-link"
                onClick={() => onJumpToChapter(q.chapter)}
                type="button"
              >
                <MdMenuBook /> Ôn lại chương {ch?.no}
              </button>
              <button className="quiz-next" onClick={next} type="button">
                {idx + 1 >= total ? 'Xem kết quả' : 'Câu tiếp'} <MdArrowForward />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Summary({
  order,
  results,
  lastScore,
  onRestartAll,
  onRetryWrong,
  onJumpToChapter,
}: {
  order: QuizQuestion[];
  results: Record<string, boolean>;
  lastScore: QuizStats['lastScore'];
  onRestartAll: () => void;
  onRetryWrong: (wrong: QuizQuestion[]) => void;
  onJumpToChapter: (id: string) => void;
}) {
  const correct = order.filter((q) => results[q.id]).length;
  const total = order.length;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const wrong = order.filter((q) => results[q.id] === false);

  const byChapter = useMemo(() => {
    const m = new Map<string, { correct: number; total: number }>();
    for (const q of order) {
      const e = m.get(q.chapter) ?? { correct: 0, total: 0 };
      e.total += 1;
      if (results[q.id]) e.correct += 1;
      m.set(q.chapter, e);
    }
    return Array.from(m.entries());
  }, [order, results]);

  const grade = pct >= 80 ? 'Giỏi' : pct >= 60 ? 'Khá' : 'Cần ôn thêm';

  return (
    <div className="quiz-summary">
      <div className="quiz-score-card">
        <MdEmojiEvents className="quiz-trophy" />
        <div className="quiz-score-big">
          {correct}
          <span>/{total}</span>
        </div>
        <div className="quiz-score-pct">
          {pct}% · {grade}
        </div>
        {lastScore && (
          <div className="quiz-score-prev muted">
            Lần trước: {lastScore.correct}/{lastScore.total}
          </div>
        )}
      </div>

      <div className="quiz-break">
        <div className="quiz-break-title">Theo chương</div>
        {byChapter.map(([id, e]) => {
          const ch = CHAPTER_BY_ID[id];
          const p = e.total ? (e.correct / e.total) * 100 : 0;
          return (
            <button
              key={id}
              className="quiz-break-row"
              style={{ ['--ch' as string]: ch?.hue ?? 'var(--accent)' } as React.CSSProperties}
              onClick={() => onJumpToChapter(id)}
              type="button"
            >
              <span className="quiz-break-no">{ch?.no}</span>
              <span className="quiz-break-label">{ch?.label ?? id}</span>
              <div className="quiz-break-bar">
                <div className="quiz-break-fill" style={{ width: `${p}%` }} />
              </div>
              <span className="quiz-break-n">
                {e.correct}/{e.total}
              </span>
            </button>
          );
        })}
      </div>

      <div className="quiz-summary-actions">
        {wrong.length > 0 && (
          <button className="btn primary" onClick={() => onRetryWrong(wrong)} type="button">
            <MdReplay /> Làm lại câu sai ({wrong.length})
          </button>
        )}
        <button className="btn ghost" onClick={onRestartAll} type="button">
          <MdReplay /> Làm lại từ đầu
        </button>
      </div>
    </div>
  );
}
