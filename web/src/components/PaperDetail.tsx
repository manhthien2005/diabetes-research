'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { PaperMeta } from '@/lib/papers';
import { BilingualReader } from './BilingualReader';
import { GlossaryPanel } from './GlossaryPanel';

const PdfHighlighter = dynamic(
  () => import('./PdfHighlighter').then((m) => m.PdfHighlighter),
  { ssr: false, loading: () => <div className="muted">Đang nạp viewer…</div> },
);

type Tab = 'pdf' | 'reading' | 'note' | 'analysis' | 'code' | 'glossary';

export function PaperDetail({
  paper,
  layerDir,
  folder,
  headline,
  side,
}: {
  paper: PaperMeta;
  layerDir: string;
  folder: string;
  headline?: React.ReactNode;
  side?: React.ReactNode;
}) {
  const [tab, setTab] = useState<Tab>(paper.has_pdf ? 'pdf' : 'note');
  const base = `/api/paper/${encodeURIComponent(layerDir)}/${encodeURIComponent(
    folder,
  )}`;

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    {
      id: 'pdf',
      label: paper.has_extracted_vi ? 'PDF + Bản dịch' : 'PDF',
      show: paper.has_pdf,
    },
    { id: 'reading', label: 'Đọc song ngữ', show: paper.has_extracted },
    { id: 'note', label: 'Ghi chú', show: true },
    { id: 'analysis', label: 'Phân tích', show: paper.has_analysis },
    { id: 'code', label: 'Code / Dataset', show: true },
    { id: 'glossary', label: 'Thuật ngữ', show: true },
  ];

  // tab cần bề rộng (viewer PDF / song ngữ) → panel phải dồn lên trên
  const wide = tab === 'pdf' || tab === 'reading';

  return (
    <div className={`pd-grid${wide ? ' wide' : ''}`}>
      <div className="pd-content">
        {headline}
        <div className="tabbar">
          {tabs
            .filter((t) => t.show)
            .map((t) => (
              <button
                key={t.id}
                className={`tab${tab === t.id ? ' active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
        </div>

        <div className="tab-panel">
          {tab === 'pdf' && <PdfHighlighter base={base} />}
          {tab === 'reading' && <BilingualReader base={base} />}
          {tab === 'note' && <NoteEditor base={base} />}
          {tab === 'analysis' && (
            <iframe
              className="analysis-frame"
              src={`${base}/analysis`}
              title="Analysis"
            />
          )}
          {tab === 'code' && <CodeDataset paper={paper} />}
          {tab === 'glossary' && <GlossaryPanel base={base} />}
        </div>
      </div>

      {side && <aside className="pd-side">{side}</aside>}
    </div>
  );
}

function NoteEditor({ base }: { base: string }) {
  const [content, setContent] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle',
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch(`${base}/notes`)
      .then((r) => r.json())
      .then((d) => {
        setContent(typeof d.content === 'string' ? d.content : '');
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [base]);

  const save = useCallback(
    async (text: string) => {
      setStatus('saving');
      try {
        const r = await fetch(`${base}/notes`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: text }),
        });
        setStatus(r.ok ? 'saved' : 'error');
      } catch {
        setStatus('error');
      }
    },
    [base],
  );

  const onChange = (text: string) => {
    setContent(text);
    setStatus('idle');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(text), 700); // autosave debounce
  };

  if (!loaded) return <div className="muted">Đang tải ghi chú…</div>;

  return (
    <div className="note-wrap">
      <div className="note-bar">
        <span className="muted">
          Ghi chú lưu vào <code>notes.md</code> trong folder paper (agent CLI
          đọc được)
        </span>
        <span className={`save-status ${status}`}>
          {status === 'saving' && '💾 Đang lưu…'}
          {status === 'saved' && '✓ Đã lưu'}
          {status === 'error' && '✕ Lỗi lưu'}
        </span>
      </div>
      <textarea
        className="note-area"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Viết ghi chú (markdown) cho paper này…"
        spellCheck={false}
      />
    </div>
  );
}

function CodeDataset({ paper }: { paper: PaperMeta }) {
  return (
    <div className="code-ds">
      <div className="card">
        <div className="section-title" style={{ marginTop: 0 }}>
          💻 Code
        </div>
        {paper.code_url ? (
          <a href={paper.code_url} target="_blank" rel="noreferrer">
            {paper.code_url}
          </a>
        ) : (
          <span className="muted">Paper chưa ghi nhận repo code.</span>
        )}
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="section-title" style={{ marginTop: 0 }}>
          📊 Dataset
        </div>
        {paper.datasets.length ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {paper.datasets.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        ) : (
          <span className="muted">Chưa ghi nhận dataset trong metadata.</span>
        )}
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="section-title" style={{ marginTop: 0 }}>
          🔗 Liên kết
        </div>
        <div className="kv">
          <span>DOI</span>
          <span>
            {paper.doi ? (
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noreferrer"
              >
                {paper.doi}
              </a>
            ) : (
              <span className="muted">—</span>
            )}
          </span>
          <span>arXiv</span>
          <span>
            {paper.arxiv ? (
              <a
                href={`https://arxiv.org/abs/${paper.arxiv}`}
                target="_blank"
                rel="noreferrer"
              >
                {paper.arxiv}
              </a>
            ) : (
              <span className="muted">—</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
