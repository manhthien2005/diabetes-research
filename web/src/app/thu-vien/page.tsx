import { listPapersByLayer, libraryStats } from '@/lib/papers';
import { LibraryView } from '@/components/LibraryView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Thư viện · ExploreX',
  description: 'Kho paper theo Layer: verdict, tài nguyên, phân tích.',
};

export default function LibraryPage() {
  const buckets = listPapersByLayer();
  const stats = libraryStats();

  return (
    <div>
      <h1 className="page-title">Thư viện</h1>
      <p className="page-sub">
        {stats.total} paper · {stats.chosen} đã chọn · {stats.withCode} có code ·{' '}
        {stats.withAnalysis} có phân tích · {stats.rejected} đã loại
      </p>
      <p className="page-sub">
        Theo đề tài đã chốt: <b>{stats.byRole.design}</b> bài phải đọc lấy thiết kế ·{' '}
        <b>{stats.byRole.method}</b> lấy phương pháp · <b>{stats.byRole.positioning}</b>{' '}
        định vị · <b>{stats.byRole.inflation}</b> làm dẫn chứng thổi phồng · còn lại{' '}
        {stats.byRole.later + stats.byRole.related} bài chỉ trích dẫn.
      </p>
      <LibraryView buckets={buckets} />
    </div>
  );
}
