import { redirect } from 'next/navigation';

// Trang Phương pháp NCKH đã gom về mục Học tập sau redesign.
export default function ResearchKnowledgeRedirect() {
  redirect('/hoc-tap/nckh');
}
