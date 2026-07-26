import { listPapersByLayer, libraryStats } from '@/lib/papers';
import { LibraryView } from '@/components/LibraryView';

export const dynamic = 'force-dynamic';

export default function LibraryPage() {
  const buckets = listPapersByLayer();
  const stats = libraryStats();

  return (
    <div>
      <h1 className="page-title">Thư viện</h1>
      <p className="page-sub">
        {stats.total} paper · {stats.chosen} đã chọn · {stats.withCode} có code ·{' '}
        {stats.withAnalysis} có phân tích
      </p>
      <LibraryView buckets={buckets} />
    </div>
  );
}
