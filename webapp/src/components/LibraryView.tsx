'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MdStar,
  MdCode,
  MdDataset,
  MdInsights,
  MdStickyNote2,
  MdHighlight,
  MdPictureAsPdf,
  MdExpandMore,
} from 'react-icons/md';
import type { PaperMeta } from '@/lib/papers';
import { VerdictBadge } from './VerdictBadge';

interface Bucket {
  layer: { id: number; name: string; focus: string; dir: string };
  papers: PaperMeta[];
}

export function LibraryView({ buckets }: { buckets: Bucket[] }) {
  // init mặc định (deterministic) để SSR & client hydrate khớp → không flash trắng
  const [open, setOpen] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    buckets.forEach((b) => (init[b.layer.id] = b.papers.length > 0));
    return init;
  });

  // sau hydrate: áp lại trạng thái đã lưu trong localStorage (nếu có)
  useEffect(() => {
    const saved = localStorage.getItem('explorex.layers');
    if (saved) {
      try {
        setOpen(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  const toggle = (id: number) => {
    setOpen((o) => {
      const next = { ...o, [id]: !o[id] };
      localStorage.setItem('explorex.layers', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="layer-stack">
      {buckets.map(({ layer, papers }) => {
        const isOpen = open[layer.id] ?? false;
        return (
          <section key={layer.id} className="layer-acc">
            <header
              className={`layer-acc-head${isOpen ? ' open' : ''}`}
              onClick={() => toggle(layer.id)}
              data-tip={layer.focus}
            >
              <MdExpandMore className={`acc-chevron${isOpen ? ' open' : ''}`} />
              <span className="layer-tag">L{layer.id}</span>
              <span className="layer-acc-name">{layer.name}</span>
              <span className="layer-acc-count">{papers.length}</span>
            </header>
            {isOpen && (
              <div className="layer-acc-body">
                {papers.length === 0 ? (
                  <div className="layer-empty">Chưa có paper trong layer này</div>
                ) : (
                  <PaperTable papers={papers} layerDir={layer.dir} />
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function PaperTable({
  papers,
  layerDir,
}: {
  papers: PaperMeta[];
  layerDir: string;
}) {
  const router = useRouter();
  const go = (p: PaperMeta) =>
    router.push(
      `/paper/${encodeURIComponent(layerDir)}/${encodeURIComponent(
        p.folderName,
      )}`,
    );

  return (
    <table className="paper-table">
      <thead>
        <tr>
          <th style={{ width: '46%' }}>Tiêu đề</th>
          <th>Năm</th>
          <th>Venue</th>
          <th style={{ textAlign: 'right' }}>Cite</th>
          <th>Verdict</th>
          <th>Tài nguyên</th>
        </tr>
      </thead>
      <tbody>
        {papers.map((p) => (
          <tr key={p.paper_id} onClick={() => go(p)} className="paper-row">
            <td>
              <div className="pt-title">
                {p.is_chosen && (
                  <MdStar
                    className="pt-star"
                    data-tip="Đã chọn (chosed_papers)"
                  />
                )}
                <span>{p.title}</span>
              </div>
            </td>
            <td className="muted">{p.year ?? '—'}</td>
            <td className="muted pt-venue" data-tip={p.venue ?? ''}>
              {p.venue ?? '—'}
            </td>
            <td style={{ textAlign: 'right' }}>
              {p.citations != null ? (
                p.citations.toLocaleString('en-US')
              ) : (
                <span className="faint">?</span>
              )}
            </td>
            <td>
              <VerdictBadge
                verdict={p.verdict}
                reason={p.verdict_reason}
                analysisStatus={p.analysis_status}
              />
            </td>
            <td>
              <div className="pt-res">
                <ResIcon
                  on={Boolean(p.code_url)}
                  tip={p.code_url ? 'Có code' : 'Không có code'}
                >
                  <MdCode />
                </ResIcon>
                <ResIcon
                  on={p.datasets.length > 0}
                  tip={
                    p.datasets.length
                      ? `Dataset: ${p.datasets.join(', ')}`
                      : 'Không rõ dataset'
                  }
                >
                  <MdDataset />
                </ResIcon>
                <ResIcon on={p.has_pdf} tip={p.has_pdf ? 'Có PDF' : 'Chưa có PDF'}>
                  <MdPictureAsPdf />
                </ResIcon>
                <ResIcon
                  on={p.has_analysis}
                  tip={p.has_analysis ? 'Có analysis.html' : 'Chưa phân tích'}
                >
                  <MdInsights />
                </ResIcon>
                <ResIcon on={p.has_notes} tip="Có ghi chú">
                  <MdStickyNote2 />
                </ResIcon>
                <ResIcon on={p.has_highlights} tip="Có highlight">
                  <MdHighlight />
                </ResIcon>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ResIcon({
  on,
  tip,
  children,
}: {
  on: boolean;
  tip: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`res-ico${on ? ' on' : ''}`} data-tip={tip}>
      {children}
    </span>
  );
}
