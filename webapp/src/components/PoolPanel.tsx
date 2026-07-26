'use client';

import { useState } from 'react';
import { MdExpandMore, MdOutlineFactCheck } from 'react-icons/md';
import type { PoolFile } from '@/lib/search/pool';

// Panel "Pool & Triage": hiện pool search gần nhất (search_pool.json) + verdict
// triage của Claude (field pool.triage — Claude ghi từ CLI). Web chỉ đọc.

export function PoolPanel({ pool }: { pool: PoolFile | null }) {
  const [open, setOpen] = useState(false);

  if (!pool) return null;

  const triage = pool.triage ?? {};
  const verdicts = pool.papers.map((p) => triage[p.dedup_key]?.verdict ?? null);
  const kept = verdicts.filter((v) => v === 'keep').length;
  const dropped = verdicts.filter((v) => v === 'reject').length;
  const pending = pool.papers.length - kept - dropped;
  const when = new Date(pool.generated_at).toLocaleString('vi-VN');

  return (
    <section className="pool-panel card">
      <header className="pool-head" onClick={() => setOpen((o) => !o)}>
        <MdExpandMore className={`acc-chevron${open ? ' open' : ''}`} />
        <MdOutlineFactCheck className="pool-ico" />
        <span className="pool-title">
          Pool gần nhất: <b>{pool.papers.length}</b> bài
          {pool.query && <span className="muted"> · “{pool.query.slice(0, 50)}”</span>}
          <span className="faint"> · {when}</span>
        </span>
        <span className="pool-stats">
          {kept > 0 && <span className="badge green">{kept} giữ</span>}
          {dropped > 0 && <span className="badge red">{dropped} loại</span>}
          {pending > 0 && (
            <span className="badge" data-tip='Nói với Claude: "triage pool" để sàng lọc'>
              {pending} chưa triage
            </span>
          )}
        </span>
      </header>

      {open && (
        <div className="pool-body">
          {pending === pool.papers.length && (
            <div className="review-hint" style={{ marginBottom: 10 }}>
              Chưa triage. Sang Claude Code nói <code>triage pool</code> — Claude đọc{' '}
              <code>search_pool.json</code>, phán giữ/loại từng bài kèm lý do.
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Năm</th>
                <th style={{ textAlign: 'right' }}>Cite</th>
                <th>Triage</th>
              </tr>
            </thead>
            <tbody>
              {pool.papers.map((p) => {
                const t = triage[p.dedup_key];
                return (
                  <tr key={p.dedup_key}>
                    <td>
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noreferrer">
                          {p.title}
                        </a>
                      ) : (
                        p.title
                      )}
                    </td>
                    <td className="muted">{p.year ?? '—'}</td>
                    <td style={{ textAlign: 'right' }}>{p.citations ?? '?'}</td>
                    <td>
                      {t ? (
                        <span
                          className={`badge ${t.verdict === 'keep' ? 'green' : 'red'}`}
                          data-tip={t.reason}
                        >
                          {t.verdict === 'keep'
                            ? `✓ giữ${t.layer ? ` → L${t.layer}` : ''}`
                            : '✕ loại'}
                        </span>
                      ) : (
                        <span className="faint">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
