'use client';

import { MdMenuBook, MdQuiz } from 'react-icons/md';
import { CHAPTERS } from './data';

export type Mode = 'read' | 'quiz';

interface HeroProps {
  mode: Mode;
  onMode: (m: Mode) => void;
  activeId: string;
  onJump: (id: string) => void;
}

const STATS = [
  { n: '7', l: 'chương' },
  { n: '3', l: 'trụ cột' },
  { n: '4', l: 'widget tương tác' },
  { n: 'live', l: 'kinh nghiệm từ kho' },
];

export function Hero({ mode, onMode, activeId, onJump }: HeroProps) {
  return (
    <header className="kbx-hero">
      <div className="kbx-hero-inner">
        <div className="kbx-eyebrow">Kiến thức nền · phương pháp NCKH</div>
        <h1 className="kbx-title">
          Xây dựng nghiên cứu khoa học <span className="kbx-grad">có giá trị</span>
        </h1>
        <p className="kbx-sub">
          Hướng dẫn dễ đọc từ câu hỏi nghiên cứu đến validation, báo cáo và đánh giá tác
          động — đúc kết từ kho paper dự đoán ĐTĐ, đồng thời phân biệt rõ “báo cáo đầy đủ”,
          “ít nguy cơ sai lệch” và “đủ bằng chứng để triển khai”.
        </p>

        <div className="kbx-stats">
          {STATS.map((s) => (
            <div key={s.l} className="kbx-stat">
              <b>{s.n}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="kb-tabs" role="tablist" aria-label="Chế độ">
          <button
            role="tab"
            aria-selected={mode === 'read'}
            className={`kb-tab${mode === 'read' ? ' on' : ''}`}
            onClick={() => onMode('read')}
          >
            <MdMenuBook /> Đọc
          </button>
          <button
            role="tab"
            aria-selected={mode === 'quiz'}
            className={`kb-tab${mode === 'quiz' ? ' on' : ''}`}
            onClick={() => onMode('quiz')}
          >
            <MdQuiz /> Ôn tập
          </button>
        </div>
      </div>

      {mode === 'read' && (
        <nav className="kb-toc" aria-label="Mục lục">
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              className={`kb-toc-chip${activeId === c.id ? ' active' : ''}`}
              style={{ ['--ch' as string]: c.hue } as React.CSSProperties}
              onClick={() => onJump(c.id)}
            >
              <span className="kb-toc-no">{c.no}</span>
              {c.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
