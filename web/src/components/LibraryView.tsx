'use client';

import { useEffect, useMemo, useState } from 'react';
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
  MdBlock,
} from 'react-icons/md';
import type { PaperMeta } from '@/lib/papers';
import { ROLE_RANK } from '@/lib/roles-public';
import { VerdictBadge } from './VerdictBadge';
import { RoleBadge } from './RoleBadge';
import {
  LibraryToolbar,
  DEFAULT_FILTERS,
  isFiltering,
  type LibraryFilters,
  type LibraryViewMode,
} from './LibraryToolbar';

interface Bucket {
  layer: { id: number; name: string; focus: string; dir: string };
  papers: PaperMeta[];
}

function matchFilters(p: PaperMeta, f: LibraryFilters): boolean {
  if (f.q.trim()) {
    if (!p.title.toLowerCase().includes(f.q.trim().toLowerCase())) return false;
  }
  if (f.verdicts.length > 0) {
    const v = p.verdict ?? 'none';
    if (!f.verdicts.includes(v as LibraryFilters['verdicts'][number]))
      return false;
  }
  if (f.roles.length > 0) {
    if (!p.role || !f.roles.includes(p.role)) return false;
  }
  if (f.hasCode && !p.code_url) return false;
  if (f.hasPdf && !p.has_pdf) return false;
  if (f.hideRejected && p.status === 'rejected') return false;
  return true;
}

function sortPapers(papers: PaperMeta[], sort: LibraryFilters['sort']): PaperMeta[] {
  const arr = [...papers];
  if (sort === 'cite') arr.sort((a, b) => (b.citations ?? -1) - (a.citations ?? -1));
  else if (sort === 'year') arr.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  else if (sort === 'role')
    arr.sort((a, b) => {
      const d = (a.role ? ROLE_RANK[a.role] : 9) - (b.role ? ROLE_RANK[b.role] : 9);
      return d !== 0 ? d : (b.citations ?? -1) - (a.citations ?? -1);
    });
  else arr.sort((a, b) => a.title.localeCompare(b.title, 'en'));
  return arr;
}

export function LibraryView({ buckets }: { buckets: Bucket[] }) {
  const router = useRouter();
  // init mặc định (deterministic) để SSR & client hydrate khớp → không flash trắng
  const [open, setOpen] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    buckets.forEach((b) => (init[b.layer.id] = b.papers.length > 0));
    return init;
  });
  const [filters, setFilters] = useState<LibraryFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<LibraryViewMode>('table');

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

  const total = useMemo(
    () => buckets.reduce((s, b) => s + b.papers.length, 0),
    [buckets],
  );

  const filtered = useMemo(
    () =>
      buckets
        .filter(
          (b) => filters.layers.length === 0 || filters.layers.includes(b.layer.id),
        )
        .map((b) => ({
          layer: b.layer,
          papers: sortPapers(
            b.papers.filter((p) => matchFilters(p, filters)),
            filters.sort,
          ),
        })),
    [buckets, filters],
  );

  const shown = useMemo(
    () => filtered.reduce((s, b) => s + b.papers.length, 0),
    [filtered],
  );

  const filtering = isFiltering(filters);
  const go = (layerDir: string) => (p: PaperMeta) =>
    router.push(
      `/paper/${encodeURIComponent(layerDir)}/${encodeURIComponent(p.folderName)}`,
    );

  return (
    <div>
      <LibraryToolbar
        value={filters}
        onChange={setFilters}
        view={view}
        onView={setView}
        total={total}
        shown={shown}
        layerIds={buckets.map((b) => b.layer.id)}
      />

      {filtering && shown === 0 ? (
        <div className="empty-state">
          Không có paper nào khớp bộ lọc hiện tại.
        </div>
      ) : (
        <div className="layer-stack">
          {filtered.map(({ layer, papers }) => {
            // đang lọc → mở hết cho dễ soi; không lọc → theo trạng thái đã lưu
            const isOpen = filtering ? papers.length > 0 : (open[layer.id] ?? false);
            if (filtering && papers.length === 0) return null;
            return (
              <section key={layer.id} className="layer-acc">
                <header
                  className={`layer-acc-head${isOpen ? ' open' : ''}`}
                  onClick={() => toggle(layer.id)}
                  data-tip={layer.focus}
                >
                  <MdExpandMore
                    className={`acc-chevron${isOpen ? ' open' : ''}`}
                  />
                  <span className="layer-tag">L{layer.id}</span>
                  <span className="layer-acc-name">{layer.name}</span>
                  <span className="layer-acc-count">{papers.length}</span>
                </header>
                {isOpen && (
                  <div className="layer-acc-body">
                    {papers.length === 0 ? (
                      <div className="layer-empty">
                        Chưa có paper trong layer này
                      </div>
                    ) : view === 'cards' ? (
                      <PaperCards papers={papers} onOpen={go(layer.dir)} />
                    ) : (
                      <PaperTable papers={papers} onOpen={go(layer.dir)} />
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PaperTable({
  papers,
  onOpen,
}: {
  papers: PaperMeta[];
  onOpen: (p: PaperMeta) => void;
}) {
  return (
    <table className="paper-table">
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Tiêu đề</th>
          <th>Năm</th>
          <th>Venue</th>
          <th style={{ textAlign: 'right' }}>Cite</th>
          <th data-tip="Bài này dùng vào việc gì trong đề tài đã chốt (TO_DO §6)">
            Vai trò
          </th>
          <th>Verdict</th>
          <th>Tài nguyên</th>
        </tr>
      </thead>
      <tbody>
        {papers.map((p) => (
          <tr
            key={p.paper_id}
            onClick={() => onOpen(p)}
            className={`paper-row${p.status === 'rejected' ? ' rejected' : ''}`}
          >
            <td>
              <div className="pt-title">
                {p.is_chosen && (
                  <MdStar className="pt-star" data-tip="Đã chọn (chosed_papers)" />
                )}
                {p.status === 'rejected' && (
                  <MdBlock
                    className="pt-block"
                    data-tip={`Đã loại: ${p.reject_reason ?? 'xem rejected.json'}`}
                  />
                )}
                <span>{p.title}</span>
              </div>
            </td>
            <td className="muted num">{p.year ?? '—'}</td>
            <td className="muted pt-venue" data-tip={p.venue ?? ''}>
              {p.venue ?? '—'}
            </td>
            <td className="num" style={{ textAlign: 'right' }}>
              {p.citations != null ? (
                p.citations.toLocaleString('en-US')
              ) : (
                <span className="faint">?</span>
              )}
            </td>
            <td>
              <RoleBadge role={p.role} note={p.role_note} />
            </td>
            <td>
              <VerdictBadge
                verdict={p.verdict}
                reason={p.verdict_reason}
                analysisStatus={p.analysis_status}
              />
            </td>
            <td>
              <ResIcons p={p} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PaperCards({
  papers,
  onOpen,
}: {
  papers: PaperMeta[];
  onOpen: (p: PaperMeta) => void;
}) {
  return (
    <div className="paper-grid">
      {papers.map((p) => (
        <button
          key={p.paper_id}
          type="button"
          className={`paper-card${p.status === 'rejected' ? ' rejected' : ''}`}
          onClick={() => onOpen(p)}
        >
          <div className="pc-top">
            {p.is_chosen && (
              <MdStar className="pt-star" data-tip="Đã chọn (chosed_papers)" />
            )}
            {p.status === 'rejected' && (
              <MdBlock
                className="pt-block"
                data-tip={`Đã loại: ${p.reject_reason ?? 'xem rejected.json'}`}
              />
            )}
            <RoleBadge role={p.role} note={p.role_note} />
            <VerdictBadge
              verdict={p.verdict}
              reason={p.verdict_reason}
              analysisStatus={p.analysis_status}
            />
          </div>
          <div className="pc-title">{p.title}</div>
          <div className="pc-meta">
            <span className="num">{p.year ?? '—'}</span>
            {p.venue && (
              <>
                <span className="pc-dot" />
                <span className="pc-venue" title={p.venue}>
                  {p.venue}
                </span>
              </>
            )}
            <span className="pc-dot" />
            <span className="num">
              {p.citations != null ? `${p.citations.toLocaleString('en-US')} cite` : '? cite'}
            </span>
          </div>
          <div className="pc-res">
            <ResIcons p={p} />
          </div>
        </button>
      ))}
    </div>
  );
}

function ResIcons({ p }: { p: PaperMeta }) {
  return (
    <div className="pt-res">
      <ResIcon on={Boolean(p.code_url)} tip={p.code_url ? 'Có code' : 'Không có code'}>
        <MdCode />
      </ResIcon>
      <ResIcon
        on={p.datasets.length > 0}
        tip={p.datasets.length ? `Dataset: ${p.datasets.join(', ')}` : 'Không rõ dataset'}
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
  );
}

export function ResIcon({
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
