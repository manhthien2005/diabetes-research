import { SettingsClient } from '@/components/SettingsClient';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="page-title">⚙️ Cài đặt</h1>
      <p className="page-sub">
        Trạng thái API key (.env, masked) · bật/tắt &amp; test nguồn · ngưỡng
        citations &amp; số kết quả mỗi nguồn.
      </p>
      <SettingsClient />
    </div>
  );
}
