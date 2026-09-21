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
  { n: '10', l: 'chương' },
  { n: '4', l: 'tầng chỉ số' },
  { n: 'live', l: 'dẫn chứng từ kho' },
  { n: '47', l: 'câu ôn tập' },
];

export function Hero({ mode, onMode, activeId, onJump }: HeroProps) {
  return (
    <header className="kbx-hero">
      <div className="kbx-hero-inner">
        <div className="kbx-eyebrow">Kiến thức nền · đái tháo đường</div>
        <h1 className="kbx-title">
          Bệnh tiểu đường &amp; bài toán <span className="kbx-grad">dự đoán</span>
        </h1>
        <p className="kbx-sub">
          Từ kiến thức bệnh học cơ bản đến cách đọc dataset và phân biệt sàng lọc với
          dự báo dài hạn — diễn giải đơn giản, có cảnh báo để tránh tự chẩn đoán và tránh
          hiểu sai mô hình.
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
