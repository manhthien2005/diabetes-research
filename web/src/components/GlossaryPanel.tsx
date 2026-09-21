'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MdSearch,
  MdClose,
  MdExpandMore,
  MdStraighten,
  MdWaterDrop,
  MdMonitorHeart,
  MdCalculate,
  MdTune,
  MdVisibility,
  MdFactCheck,
  MdDataset,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import {
  GLOSSARY,
  GLOSSARY_GROUPS,
  type GlossaryGroupId,
  type GlossaryIconId,
  type GlossaryTerm,
} from '@/lib/glossary';

// icon chức năng dùng react-icons theo design language ExploreX (không dùng emoji)
const GROUP_ICON: Record<GlossaryIconId, IconType> = {
  metric: MdStraighten,
  leakage: MdWaterDrop,
  epi: MdMonitorHeart,
  survey: MdCalculate,
  ml: MdTune,
  xai: MdVisibility,
  report: MdFactCheck,
  data: MdDataset,
};

interface HitPayload {
  source: string | null;
  hits: Record<string, number>;
  snippets: Record<string, string>;
}

const GROUP_BY_ID = new Map(GLOSSARY_GROUPS.map((g) => [g.id, g]));
const TERM_BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]));
const GROUP_ORDER = new Map(GLOSSARY_GROUPS.map((g, i) => [g.id, i]));

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // bỏ dấu tiếng Việt để tìm không dấu vẫn ra
    .replace(/đ/g, 'd');
}

function matchQuery(t: GlossaryTerm, q: string): boolean {
  const n = norm(q);
  return (
    norm(t.en).includes(n) ||
    norm(t.vi).includes(n) ||
    norm(t.short).includes(n) ||
    norm(t.detail).includes(n) ||
    t.aliases.some((a) => norm(a).includes(n))
  );
}

function GroupTag({ group }: { group: (typeof GLOSSARY_GROUPS)[number] }) {
  const Icon = GROUP_ICON[group.icon];
  return (
    <span className="glo-tag" data-tip={group.hint}>
      <Icon className="glo-gico" /> {group.label}
    </span>
  );
}

export function GlossaryPanel({ base }: { base: string }) {
  const [data, setData] = useState<HitPayload | null>(null);
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<GlossaryGroupId | null>(null);
  const [onlyInPaper, setOnlyInPaper] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${base}/glossary`)
      .then((r) => r.json())
      .then((d: HitPayload) => alive && setData(d))
      .catch(() => alive && setData({ source: null, hits: {}, snippets: {} }));
    return () => {
      alive = false;
    };
  }, [base]);

  const hits = data?.hits ?? {};
  const hitCount = Object.keys(hits).length;

  const terms = useMemo(() => {
    const arr = GLOSSARY.filter((t) => {
      if (group && t.group !== group) return false;
      if (onlyInPaper && !hits[t.id]) return false;
      if (q.trim() && !matchQuery(t, q.trim())) return false;
      return true;
    });
    arr.sort((a, b) => {
      const ha = hits[a.id] ?? 0;
      const hb = hits[b.id] ?? 0;
      if (ha !== hb) return hb - ha; // có trong bài lên trước, nhiều lần hơn lên trước
      const ga = GROUP_ORDER.get(a.group) ?? 99;
      const gb = GROUP_ORDER.get(b.group) ?? 99;
      if (ga !== gb) return ga - gb;
      return a.en.localeCompare(b.en, 'en');
    });
    return arr;
  }, [q, group, onlyInPaper, hits]);

  const jumpTo = (id: string) => {
    setQ('');
    setGroup(null);
    setOnlyInPaper(false);
    setOpen((o) => ({ ...o, [id]: true }));
    window.setTimeout(() => {
      listRef.current
        ?.querySelector(`[data-term="${id}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const filtering = Boolean(q.trim()) || group !== null || onlyInPaper;

  return (
    <div className="glo">
      <p className="glo-intro">
        Tra thuật ngữ chuyên ngành thay vì google. Mục nào có chấm{' '}
        <span className="glo-dot" /> là thuật ngữ <b>thật sự xuất hiện</b> trong bản trích
        của bài này ({data === null ? '…' : `${hitCount} thuật ngữ`}
        {data?.source === null && ', bài chưa có extracted.md'}). Bấm vào một mục để xem
        giải thích đầy đủ.
      </p>

      <div className="glo-bar">
        <div className="glo-search">
          <MdSearch className="glo-search-ico" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm thuật ngữ (EN hoặc tiếng Việt)…"
            aria-label="Tìm thuật ngữ"
          />
        </div>
        <button
          type="button"
          className={`glo-chip${onlyInPaper ? ' on' : ''}`}
          aria-pressed={onlyInPaper}
          onClick={() => setOnlyInPaper((v) => !v)}
          disabled={hitCount === 0}
          data-tip={
            hitCount === 0 ? 'Bài này chưa có extracted.md để dò' : undefined
          }
        >
          <span className="glo-dot" /> Chỉ từ có trong bài
        </button>
      </div>

      <div className="glo-groups">
        <button
          type="button"
          className={`glo-chip${group === null ? ' on' : ''}`}
          onClick={() => setGroup(null)}
        >
          Tất cả <span className="glo-num">{GLOSSARY.length}</span>
        </button>
        {GLOSSARY_GROUPS.map((g) => {
          const n = GLOSSARY.filter((t) => t.group === g.id).length;
          const Icon = GROUP_ICON[g.icon];
          return (
            <button
              key={g.id}
              type="button"
              className={`glo-chip${group === g.id ? ' on' : ''}`}
              onClick={() => setGroup(group === g.id ? null : g.id)}
              data-tip={g.hint}
            >
              <Icon className="glo-gico" /> {g.label}{' '}
              <span className="glo-num">{n}</span>
            </button>
          );
        })}
      </div>

      {filtering && (
        <div className="glo-count">
          <b>{terms.length}</b>/{GLOSSARY.length} thuật ngữ
          <button
            type="button"
            className="glo-clear"
            onClick={() => {
              setQ('');
              setGroup(null);
              setOnlyInPaper(false);
            }}
          >
            <MdClose /> Xoá lọc
          </button>
        </div>
      )}

      <div className="glo-list" ref={listRef}>
        {terms.length === 0 && (
          <div className="empty-state">Không có thuật ngữ nào khớp.</div>
        )}
        {terms.map((t) => {
          const n = hits[t.id] ?? 0;
          const isOpen = Boolean(open[t.id]);
          const g = GROUP_BY_ID.get(t.group);
          return (
            <article
              key={t.id}
              data-term={t.id}
              className={`glo-item${isOpen ? ' open' : ''}${n ? ' inpaper' : ''}`}
            >
              <button
                type="button"
                className="glo-head"
                aria-expanded={isOpen}
                onClick={() => setOpen((o) => ({ ...o, [t.id]: !o[t.id] }))}
              >
                <MdExpandMore className={`glo-chev${isOpen ? ' open' : ''}`} />
                <span className="glo-title">
                  {n > 0 && (
                    <span
                      className="glo-dot"
                      data-tip={`Xuất hiện ${n} lần trong bản trích của bài này`}
                    />
                  )}
                  <span className="glo-en">{t.en}</span>
                  <span className="glo-vi">{t.vi}</span>
                </span>
                {g && <GroupTag group={g} />}
              </button>

              <p className="glo-short">{t.short}</p>

              {isOpen && (
                <div className="glo-body">
                  <p>{t.detail}</p>
                  {t.formula && <div className="glo-formula">{t.formula}</div>}
                  {t.why && (
                    <div className="glo-note why">
                      <b>Vì sao quan trọng với đề tài anh</b>
                      <span>{t.why}</span>
                    </div>
                  )}
                  {t.trap && (
                    <div className="glo-note trap">
                      <b>Bẫy hay gặp</b>
                      <span>{t.trap}</span>
                    </div>
                  )}
                  {n > 0 && data?.snippets[t.id] && (
                    <div className="glo-note quote">
                      <b>Trong bài này ({n} lần)</b>
                      <span>{data.snippets[t.id]}</span>
                    </div>
                  )}
                  {t.see && t.see.length > 0 && (
                    <div className="glo-see">
                      <span className="glo-see-label">Xem thêm</span>
                      {t.see.map((id) => {
                        const other = TERM_BY_ID.get(id);
                        if (!other) return null;
                        return (
                          <button
                            key={id}
                            type="button"
                            className="glo-seelink"
                            onClick={() => jumpTo(id)}
                          >
                            {other.en}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
