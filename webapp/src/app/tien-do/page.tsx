import { readProgress } from '@/lib/progress';
import { ProgressClient } from '@/components/ProgressClient';

// Đọc lại PROGRESS.json mỗi lần vào trang → thay đổi của Claude ở phiên CLI tự hiện.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tiến độ · ExploreX',
  description:
    'Workflow thi công đề tài: bước tiếp theo, đường găng, các mốc và việc cần xác minh.',
};

export default function ProgressPage() {
  return <ProgressClient initial={readProgress()} />;
}
