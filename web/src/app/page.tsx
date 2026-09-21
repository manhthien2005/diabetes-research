import { readProgress } from '@/lib/progress';
import { libraryStats } from '@/lib/papers';
import { ProgressClient } from '@/components/ProgressClient';

// Đọc lại PROGRESS.json + metadata paper mỗi lần vào trang
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tổng quan · ExploreX',
  description:
    'Bức tranh toàn cảnh: bước tiếp theo, tiến độ từng tầng, thư viện paper theo layer.',
};

export default function OverviewPage() {
  return <ProgressClient initial={readProgress()} stats={libraryStats()} />;
}
