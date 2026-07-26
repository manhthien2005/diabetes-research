import { redirect } from 'next/navigation';

// Trang Kiến thức ĐTĐ đã gom về mục Học tập sau redesign.
export default function KnowledgeRedirect() {
  redirect('/hoc-tap/dtd');
}
