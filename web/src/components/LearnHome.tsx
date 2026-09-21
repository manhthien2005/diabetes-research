'use client';

import Link from 'next/link';
import { MdMenuBook, MdSchool, MdArrowForward, MdQuiz } from 'react-icons/md';
import { CHAPTERS as KB_CHAPTERS } from './knowledge/data';
import { CHAPTERS as RK_CHAPTERS } from './research-knowledge/data';
import { useLocalStorage } from './knowledge/useLocalStorage';

interface QuizStats {
  lastScore: { correct: number; total: number; at: number } | null;
  stats: Record<string, { seen: number; correct: number }>;
}

const EMPTY_STATS: QuizStats = { lastScore: null, stats: {} };

function QuizLine({ storageKey }: { storageKey: string }) {
  const [persist, , ready] = useLocalStorage<QuizStats>(storageKey, EMPTY_STATS);
  if (!ready) return <span className="learn-quiz faint">…</span>;
  if (!persist.lastScore)
    return <span className="learn-quiz faint">Chưa làm quiz</span>;
  const { correct, total } = persist.lastScore;
  return (
    <span className="learn-quiz">
      <MdQuiz /> Quiz gần nhất:{' '}
      <b className="num">
        {correct}/{total}
      </b>
    </span>
  );
}

const COURSES = [
  {
    href: '/hoc-tap/dtd',
    Icon: MdMenuBook,
    title: 'Kiến thức Đái tháo đường',
    desc: 'Chỉ số xét nghiệm, tiêu chí chẩn đoán, phân tầng biến, dataset Pima và các bẫy khi làm ML y khoa.',
    chapters: KB_CHAPTERS.length,
    quizKey: 'explorex.kb.quiz',
  },
  {
    href: '/hoc-tap/nckh',
    Icon: MdSchool,
    title: 'Phương pháp NCKH',
    desc: 'Xây dựng nghiên cứu có ý nghĩa, đúng chuẩn, tạo giá trị — đúc kết từ chính kho paper của đề tài.',
    chapters: RK_CHAPTERS.length,
    quizKey: 'explorex.rk.quiz',
  },
];

export function LearnHome() {
  return (
    <div className="learn-grid">
      {COURSES.map((c) => (
        <Link key={c.href} href={c.href} className="learn-card">
          <div className="learn-ico">
            <c.Icon />
          </div>
          <h2 className="learn-title">{c.title}</h2>
          <p className="learn-desc">{c.desc}</p>
          <div className="learn-meta">
            <span className="num">{c.chapters} chương</span>
            <span className="learn-dot" />
            <QuizLine storageKey={c.quizKey} />
          </div>
          <span className="learn-go">
            Vào học <MdArrowForward />
          </span>
        </Link>
      ))}
    </div>
  );
}
