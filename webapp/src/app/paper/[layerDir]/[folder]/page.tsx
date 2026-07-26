import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdArrowBack, MdStar } from 'react-icons/md';
import { getPaper, readPaperSummary } from '@/lib/papers';
import { layerById } from '@/lib/paths';
import { PaperDetail } from '@/components/PaperDetail';
import { PaperActions } from '@/components/PaperActions';
import { VerdictBadge } from '@/components/VerdictBadge';

export const dynamic = 'force-dynamic';

export default async function PaperPage({
  params,
}: {
  params: Promise<{ layerDir: string; folder: string }>;
}) {
  const { layerDir, folder } = await params;
  const paper = getPaper(layerDir, decodeURIComponent(folder));
  if (!paper) notFound();
  const layer = layerById(paper.layer);
  const summary = readPaperSummary(paper.folder);

  return (
    <div>
      <Link href="/" className="detail-back">
        <MdArrowBack /> Thư viện
      </Link>
      <h1 className="page-title" style={{ fontSize: 18, marginTop: 4 }}>
        {paper.is_chosen && (
          <MdStar
            style={{ color: 'var(--amber)', verticalAlign: '-3px', marginRight: 4 }}
          />
        )}
        {paper.title}
      </h1>
      <p className="page-sub">
        <span
          className="layer-tag"
          data-tip={layer?.focus}
          style={{ marginRight: 8 }}
        >
          L{paper.layer} · {layer?.name}
        </span>
        {paper.authors.slice(0, 4).join(', ')}
        {paper.authors.length > 4 ? ' et al.' : ''} · {paper.year ?? '—'} ·{' '}
        {paper.venue ?? '—'} · {paper.citations ?? '?'} citations
      </p>

      <PaperActions paper={paper} layerDir={layerDir} />

      {summary && (
        <div className="verdict-card">
          <div className="vc-head">
            <span className="vc-title">Verdict của Claude</span>
            <VerdictBadge verdict={paper.verdict} reason={paper.verdict_reason} />
            {summary.reproducible && (
              <span className="badge" data-tip="Khả năng tái lập">
                🔁 tái lập: {summary.reproducible}
              </span>
            )}
          </div>
          <div className="vc-grid">
            {summary.contribution && (
              <div className="vc-row">
                <span className="vc-label">🎯 Đóng góp</span>
                <span>{summary.contribution}</span>
              </div>
            )}
            {summary.best_metric && (
              <div className="vc-row">
                <span className="vc-label">🏆 Best metric</span>
                <span>{summary.best_metric}</span>
              </div>
            )}
            {summary.vs_baseline && (
              <div className="vc-row">
                <span className="vc-label">🔄 So baseline</span>
                <span>{summary.vs_baseline}</span>
              </div>
            )}
            {summary.gap && (
              <div className="vc-row">
                <span className="vc-label">🕳️ Gap</span>
                <span>{summary.gap}</span>
              </div>
            )}
            {paper.verdict_reason && (
              <div className="vc-row">
                <span className="vc-label">💬 Vì sao</span>
                <span>{paper.verdict_reason}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <PaperDetail paper={paper} layerDir={layerDir} folder={decodeURIComponent(folder)} />
    </div>
  );
}
