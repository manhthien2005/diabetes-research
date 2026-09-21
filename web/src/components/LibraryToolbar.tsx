'use client';

import { useEffect } from 'react';
import {
  MdSearch,
  MdTableRows,
  MdGridView,
  MdCode,
  MdPictureAsPdf,
  MdClose,
  MdBlock,
} from 'react-icons/md';
import { ROLE_META, ROLE_KEYS, type PaperRole } from '@/lib/roles-public';

export type LibrarySort = 'role' | 'cite' | 'year' | 'title';
export type LibraryVerdict = 'strong' | 'maybe' | 'weak' | 'none';
export type LibraryViewMode = 'table' | 'cards';

export interface LibraryFilters {
  q: string;
  layers: number[];
  verdicts: LibraryVerdict[];
  roles: PaperRole[];
  hasCode: boolean;
  hasPdf: boolean;
  hideRejected: boolean;
  sort: LibrarySort;
}

export const DEFAULT_FILTERS: LibraryFilters = {
  q: '',
  layers: [],
  verdicts: [],
  roles: [],
  hasCode: false,
  hasPdf: false,
  hideRejected: false,
  sort: 'role',
};

export function isFiltering(f: LibraryFilters): boolean {
  return (
    f.q.trim() !== '' ||
    f.layers.length > 0 ||
    f.verdicts.length > 0 ||
    f.roles.length > 0 ||
    f.hasCode ||
    f.hasPdf ||
    f.hideRejected
  );
}

const VERDICT_CHIPS: { value: LibraryVerdict; label: string; cls: string }[] = [
  { value: 'strong', label: 'Strong', cls: 'green' },
  { value: 'maybe', label: 'Maybe', cls: 'amber' },
  { value: 'weak', label: 'Weak', cls: 'red' },
  { value: 'none', label: 'Chưa verdict', cls: '' },
];

export function LibraryToolbar({
  value,
  onChange,
  view,
  onView,
  total,
  shown,
  layerIds,
}: {
  value: LibraryFilters;
  onChange: (f: LibraryFilters) => void;
  view: LibraryViewMode;
  onView: (v: LibraryViewMode) => void;
  total: number;
  shown: number;
  layerIds: number[];
}) {
  // nhớ chế độ xem qua reload
  useEffect(() => {
    const saved = localStorage.getItem('explorex.libraryView');
    if (saved === 'table' || saved === 'cards') onView(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setView = (v: LibraryViewMode) => {
    localStorage.setItem('explorex.libraryView', v);
    onView(v);
  };

  const toggleLayer = (id: number) =>
    onChange({
      ...value,
      layers: value.layers.includes(id)
        ? value.layers.filter((x) => x !== id)
        : [...value.layers, id].sort(),
    });

  const toggleVerdict = (v: LibraryVerdict) =>
    onChange({
      ...value,
      verdicts: value.verdicts.includes(v)
        ? value.verdicts.filter((x) => x !== v)
        : [...value.verdicts, v],
    });

  const toggleRole = (r: PaperRole) =>
    onChange({
      ...value,
      roles: value.roles.includes(r)
        ? value.roles.filter((x) => x !== r)
        : [...value.roles, r],
    });

  const filtering = isFiltering(value);

  return (
    <div className="lib-toolbar">
      <div className="lib-row">
        <div className="lib-search">
          <MdSearch className="lib-search-ico" />
          <input
            type="search"
            placeholder="Tìm theo tiêu đề…"
            value={value.q}
            onChange={(e) => onChange({ ...value, q: e.target.value })}
            aria-label="Tìm paper theo tiêu đề"
          />
        </div>

        <select
          className="lib-sort"
          value={value.sort}
          onChange={(e) =>
            onChange({ ...value, sort: e.target.value as LibrarySort })
          }
          aria-label="Sắp xếp"
        >
          <option value="role">Thứ tự đọc (vai trò)</option>
          <option value="cite">Nhiều cite nhất</option>
          <option value="year">Mới nhất</option>
          <option value="title">Theo tên A–Z</option>
        </select>

        <div className="lib-viewseg" role="radiogroup" aria-label="Chế độ xem">
          <button
            type="button"
            role="radio"
            aria-checked={view === 'table'}
            className={view === 'table' ? 'active' : undefined}
            data-tip="Xem dạng bảng"
            onClick={() => setView('table')}
          >
            <MdTableRows />
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={view === 'cards'}
            className={view === 'cards' ? 'active' : undefined}
            data-tip="Xem dạng thẻ"
            onClick={() => setView('cards')}
          >
            <MdGridView />
          </button>
        </div>
      </div>

      <div className="lib-row lib-chips">
        <span
          className="lib-chip-title"
          data-tip="Vai trò trong đề tài đã chốt (TO_DO §6) — lọc để biết tuần này phải đọc gì"
        >
          Vai trò
        </span>
        {ROLE_KEYS.map((r) => (
          <button
            key={r}
            type="button"
            className={`lib-chip role ${ROLE_META[r].cls}${
              value.roles.includes(r) ? ' on' : ''
            }`}
            aria-pressed={value.roles.includes(r)}
            data-tip={ROLE_META[r].hint}
            onClick={() => toggleRole(r)}
          >
            <span className="role-letter">{ROLE_META[r].letter}</span>
            {ROLE_META[r].label}
          </button>
        ))}
      </div>

      <div className="lib-row lib-chips">
        {layerIds.map((id) => (
          <button
            key={id}
            type="button"
            className={`lib-chip${value.layers.includes(id) ? ' on' : ''}`}
            aria-pressed={value.layers.includes(id)}
            onClick={() => toggleLayer(id)}
          >
            L{id}
          </button>
        ))}
        <span className="lib-chip-sep" />
        {VERDICT_CHIPS.map((c) => (
          <button
            key={c.value}
            type="button"
            className={`lib-chip ${c.cls}${
              value.verdicts.includes(c.value) ? ' on' : ''
            }`}
            aria-pressed={value.verdicts.includes(c.value)}
            onClick={() => toggleVerdict(c.value)}
          >
            {c.label}
          </button>
        ))}
        <span className="lib-chip-sep" />
        <button
          type="button"
          className={`lib-chip${value.hasCode ? ' on' : ''}`}
          aria-pressed={value.hasCode}
          onClick={() => onChange({ ...value, hasCode: !value.hasCode })}
        >
          <MdCode /> Có code
        </button>
        <button
          type="button"
          className={`lib-chip${value.hasPdf ? ' on' : ''}`}
          aria-pressed={value.hasPdf}
          onClick={() => onChange({ ...value, hasPdf: !value.hasPdf })}
        >
          <MdPictureAsPdf /> Có PDF
        </button>
        <button
          type="button"
          className={`lib-chip${value.hideRejected ? ' on' : ''}`}
          aria-pressed={value.hideRejected}
          data-tip="Ẩn các bài đã loại theo §7 (vẫn nằm trong kho để trích dẫn)"
          onClick={() => onChange({ ...value, hideRejected: !value.hideRejected })}
        >
          <MdBlock /> Ẩn bài đã loại
        </button>

        <span className="lib-count">
          {filtering ? (
            <>
              <b>{shown}</b>/{total} paper
              <button
                type="button"
                className="lib-clear"
                onClick={() => onChange({ ...DEFAULT_FILTERS, sort: value.sort })}
              >
                <MdClose /> Xoá lọc
              </button>
            </>
          ) : (
            <>{total} paper</>
          )}
        </span>
      </div>
    </div>
  );
}
