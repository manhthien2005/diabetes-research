import Link from 'next/link';
import type { PaperMeta } from '@/lib/papers';

export function PaperCard({
  paper,
  href,
}: {
  paper: PaperMeta;
  href: string;
}) {
  return (
    <Link href={href} className="paper-card">
      <div className="paper-card-top">
        {paper.is_chosen && <span className="star" title="Đã chọn">★</span>}
        <span className="paper-title">{paper.title}</span>
      </div>
      <div className="paper-meta">
        {paper.year ?? '—'} · {paper.venue ?? 'venue ?'}
      </div>
      <div className="paper-badges">
        <span className="mini-badge cite">
          📚 {paper.citations ?? '?'}
        </span>
        <span className={`mini-badge ${paper.code_url ? 'on' : 'off'}`}>
          💻 {paper.code_url ? 'Code' : 'No code'}
        </span>
        <span
          className={`mini-badge ${paper.datasets.length ? 'on' : 'off'}`}
        >
          📊 {paper.datasets.length ? `${paper.datasets.length} ds` : 'No ds'}
        </span>
        {paper.has_analysis && (
          <span className="mini-badge analysis">📄 Phân tích</span>
        )}
        {paper.has_notes && <span className="mini-badge note">📝 Note</span>}
        {paper.has_highlights && (
          <span className="mini-badge note">🖍️ Tô</span>
        )}
      </div>
    </Link>
  );
}
