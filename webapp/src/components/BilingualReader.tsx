'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Đọc song ngữ EN|VN nguyên văn bài báo, canh theo MỤC (heading) thành các hàng
// 2 cột. Bản dịch giữ cấu trúc 1:1 nên section thứ i của EN khớp section i của VN
// → cuộn cả trang là tự "sync" theo mục, không cần JS đồng bộ scroll.

type Mode = 'both' | 'en' | 'vi';
type Reading = { en: string; vi: string | null };

/** Cắt markdown thành mảng section: phần đầu (trước heading) + mỗi heading kèm thân. */
function splitSections(md: string): string[] {
  const out: string[] = [];
  let cur: string[] = [];
  for (const line of md.split('\n')) {
    if (/^#{1,6}\s/.test(line) && cur.length) {
      out.push(cur.join('\n'));
      cur = [];
    }
    cur.push(line);
  }
  if (cur.length) out.push(cur.join('\n'));
  return out.length ? out : [md];
}

function Pane({ md }: { md: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
  );
}

export function BilingualReader({ base }: { base: string }) {
  const [data, setData] = useState<Reading | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('both');

  useEffect(() => {
    let alive = true;
    fetch(`${base}/reading`)
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (d.error) setErr(d.error);
        else setData(d as Reading);
      })
      .catch(() => alive && setErr('Lỗi tải nội dung'));
    return () => {
      alive = false;
    };
  }, [base]);

  const rows = useMemo(() => {
    if (!data) return [];
    const en = splitSections(data.en);
    const vi = data.vi ? splitSections(data.vi) : [];
    const n = Math.max(en.length, vi.length);
    const r: { en: string; vi: string }[] = [];
    for (let i = 0; i < n; i++) r.push({ en: en[i] ?? '', vi: vi[i] ?? '' });
    return r;
  }, [data]);

  if (err) return <div className="muted">{err}</div>;
  if (!data) return <div className="muted">Đang tải nội dung bài…</div>;

  const hasVi = !!data.vi;
  const effMode: Mode = hasVi ? mode : 'en';

  return (
    <div className="bilingual-wrap">
      <div className="bilingual-toolbar">
        <div className="bilingual-modes">
          <button
            className={`bl-mode${effMode === 'both' ? ' on' : ''}`}
            disabled={!hasVi}
            onClick={() => setMode('both')}
          >
            EN | VN
          </button>
          <button
            className={`bl-mode${effMode === 'en' ? ' on' : ''}`}
            onClick={() => setMode('en')}
          >
            EN
          </button>
          <button
            className={`bl-mode${effMode === 'vi' ? ' on' : ''}`}
            disabled={!hasVi}
            onClick={() => setMode('vi')}
          >
            VN
          </button>
        </div>
        {!hasVi && (
          <span className="muted bl-note">
            Chưa có bản dịch tiếng Việt cho bài này — đang hiển thị nguyên văn EN.
          </span>
        )}
      </div>

      <div className={`bilingual-sections mode-${effMode}`}>
        {rows.map((row, i) => (
          <div className="bilingual-row" key={i}>
            {effMode !== 'vi' && (
              <article className="bilingual-col en">
                {effMode === 'both' && <span className="bl-lang">EN</span>}
                <Pane md={row.en} />
              </article>
            )}
            {effMode !== 'en' && (
              <article className="bilingual-col vi">
                {effMode === 'both' && <span className="bl-lang">VN</span>}
                <Pane md={row.vi} />
              </article>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
