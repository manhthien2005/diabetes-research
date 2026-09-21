import { readQaLog } from '@/lib/qa-log';
import { QaLogClient } from '@/components/QaLogClient';

// Đọc lại file mỗi lần vào trang → entry mới Claude append vào qa_log.json tự hiện.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Hỏi–Đáp định hướng · ExploreX',
  description:
    'Nhật ký Hỏi–Đáp chiến lược với Claude — xem lại & ghi nhớ định hướng nghiên cứu.',
};

export default function QaLogPage() {
  const entries = readQaLog();
  return <QaLogClient entries={entries} />;
}
