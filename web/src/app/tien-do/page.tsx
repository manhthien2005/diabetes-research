import { redirect } from 'next/navigation';

// Trang Tiến độ đã trở thành Tổng quan (trang chủ) sau redesign.
export default function ProgressRedirect() {
  redirect('/');
}
