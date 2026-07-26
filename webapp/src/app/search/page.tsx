import { SearchClient, type LibPaperRef } from '@/components/SearchClient';
import { PoolPanel } from '@/components/PoolPanel';
import { listAllPapers } from '@/lib/papers';
import { readSearchPool } from '@/lib/search/pool';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  const library: LibPaperRef[] = listAllPapers().map((p) => ({
    layerDir: p.layer_dir,
    folder: p.folderName,
    title: p.title,
    layer: p.layer,
    paper_id: p.paper_id,
  }));
  const pool = readSearchPool();

  return (
    <div>
      <h1 className="page-title">Tìm bài báo</h1>
      <p className="page-sub">
        Auto-discovery: tự fan-out nhiều nguồn + lọc chất lượng + tìm tương đồng.
      </p>
      <PoolPanel pool={pool} />
      <SearchClient library={library} />
    </div>
  );
}
