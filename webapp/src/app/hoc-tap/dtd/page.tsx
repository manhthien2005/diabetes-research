import { KnowledgeClient } from '@/components/KnowledgeClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Kiến thức ĐTĐ · ExploreX',
  description:
    'Khoá tự học kiến thức đái tháo đường cho người làm ML: chỉ số, chẩn đoán, dataset, bẫy.',
};

export default function KnowledgePage() {
  return <KnowledgeClient />;
}
