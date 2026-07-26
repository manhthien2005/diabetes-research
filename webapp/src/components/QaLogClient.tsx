'use client';

import { useMemo, useState } from 'react';
import {
  MdQuestionAnswer,
  MdSearch,
  MdExpandMore,
  MdLightbulb,
  MdLink,
  MdHistory,
} from 'react-icons/md';
import type { QaEntry } from '@/lib/qa-log';

function isUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}

function shortLink(s: string): string {
  if (!isUrl(s)) return s;
  try {
    const u = new URL(s);
    return u.hostname.replace(/^www\./, '') + (u.pathname.length > 1 ? '/…' : '');
  } catch {
    return s;
  }
}

export function QaLogClient({ entries }: { entries: QaEntry[] }) {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of entries)
      for (const t of e.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [entries]);

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => {
        if (activeTags.length && !activeTags.some((t) => e.tags.includes(t)))
          return false;
        if (!q) return true;
        const hay = [
          e.id,
          e.question,
          e.principle,
          e.method ?? '',
          ...e.answer_summary,
          ...e.tags,
        ]
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      })
      // mới nhất lên đầu (Q002 trước Q001)
      .sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
  }, [entries, query, activeTags]);

  const toggleTag = (t: string) =>
    setActiveTags((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t],
    );
  const toggleExp = (id: string) =>
    setExpanded((cur) => ({ ...cur, [id]: !cur[id] }));

  const lastDate = entries.reduce((acc, e) => (e.date > acc ? e.date : acc), '');
  const principleCount = entries.filter((e) => e.principle).length;

  return (
    <div className="qa-wrap">
      <header className="kbx-hero">
        <div className="kbx-hero-inner">
          <div className="kbx-eyebrow">
            <MdQuestionAnswer style={{ verticalAlign: '-3px', marginRight: 5 }} />
            Nhật ký định hướng
          </div>
          <h1 className="kbx-title">
            <span className="kbx-grad">Hỏi–Đáp định hướng</span>
          </h1>
          <p className="kbx-sub">
            Các câu hỏi chiến lược của anh & câu trả lời đã chốt với Claude — để
            xem lại và <b>ghi nhớ</b> hướng đi. Mỗi thẻ có một{' '}
            <b>Nguyên tắc rút ra</b> (phần cốt lõi để nhớ). Tự cập nhật từ{' '}
            <code>qa_log.json</code>.
          </p>
          <div className="kbx-stats">
            <div className="kbx-stat">
              <b>{entries.length}</b>
              <span>câu hỏi</span>
            </div>
            <div className="kbx-stat">
              <b>{principleCount}</b>
              <span>nguyên tắc</span>
            </div>
            <div className="kbx-stat">
              <b>{allTags.length}</b>
              <span>chủ đề</span>
            </div>
            {lastDate && (
              <div className="kbx-stat">
                <b style={{ fontSize: 15 }}>{lastDate}</b>
                <span>cập nhật</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {entries.length === 0 ? (
        <div className="empty-state">
          Chưa có câu hỏi nào trong <code>qa_log.json</code>. Claude sẽ tự thêm sau
          mỗi câu hỏi định hướng (xem <code>AGENTS.md</code> §12).
        </div>
      ) : (
        <>
          <div className="qa-toolbar">
            <div className="qa-search">
              <MdSearch />
              <input
                type="search"
                placeholder="Tìm trong câu hỏi, câu trả lời, nguyên tắc…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="qa-tags">
              {allTags.map((t) => (
                <button
                  key={t}
                  className={`filter-chip${activeTags.includes(t) ? ' active' : ''}`}
                  onClick={() => toggleTag(t)}
                >
                  {t}
                </button>
              ))}
              {activeTags.length > 0 && (
                <button className="qa-clear" onClick={() => setActiveTags([])}>
                  Xoá lọc
                </button>
              )}
            </div>
          )}

          <div className="qa-count muted">
            {sorted.length}/{entries.length} câu hỏi
          </div>

          <div className="qa-list">
            {sorted.map((e) => {
              const open = !!expanded[e.id];
              const hasDetail =
                e.answer_summary.length > 0 || e.links.length > 0 || !!e.method;
              return (
                <article key={e.id} className="qa-card card">
                  <div className="qa-card-head">
                    <span className="qa-id">{e.id}</span>
                    {e.date && <span className="qa-date">{e.date}</span>}
                    {e.supersedes && (
                      <span
                        className="badge amber"
                        data-tip={`Thay thế ${e.supersedes}`}
                      >
                        <MdHistory style={{ fontSize: 13 }} /> thay {e.supersedes}
                      </span>
                    )}
                    <div className="qa-card-tags">
                      {e.tags.map((t) => (
                        <button
                          key={t}
                          className={`qa-tag${activeTags.includes(t) ? ' on' : ''}`}
                          onClick={() => toggleTag(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="qa-q">
                    <span className="qa-q-mark">❓</span>
                    <span>{e.question}</span>
                  </p>

                  {e.principle && (
                    <div className="qa-principle">
                      <MdLightbulb className="qa-principle-ico" />
                      <div>
                        <div className="qa-principle-label">Nguyên tắc rút ra</div>
                        <div className="qa-principle-text">{e.principle}</div>
                      </div>
                    </div>
                  )}

                  {hasDetail && (
                    <>
                      <button
                        className="qa-toggle"
                        onClick={() => toggleExp(e.id)}
                        aria-expanded={open}
                      >
                        <MdExpandMore className={`qa-chev${open ? ' open' : ''}`} />
                        {open ? 'Ẩn chi tiết' : 'Xem chi tiết câu trả lời'}
                      </button>
                      {open && (
                        <div className="qa-detail">
                          {e.answer_summary.length > 0 && (
                            <ul className="qa-answer">
                              {e.answer_summary.map((a, i) => (
                                <li key={i}>{a}</li>
                              ))}
                            </ul>
                          )}
                          {e.links.length > 0 && (
                            <div className="qa-links">
                              {e.links.map((l, i) =>
                                isUrl(l) ? (
                                  <a
                                    key={i}
                                    className="qa-link"
                                    href={l}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <MdLink /> {shortLink(l)}
                                  </a>
                                ) : (
                                  <span key={i} className="qa-link ref">
                                    <MdLink /> {l}
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                          {e.method && (
                            <div className="qa-method muted">
                              Cách tạo: {e.method}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </article>
              );
            })}
            {sorted.length === 0 && (
              <div className="empty-state">Không có câu hỏi nào khớp bộ lọc.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
