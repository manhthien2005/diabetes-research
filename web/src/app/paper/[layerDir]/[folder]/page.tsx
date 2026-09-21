import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdArrowBack, MdStar } from 'react-icons/md';
import { getPaper, readPaperSummary } from '@/lib/papers';
import { layerById } from '@/lib/paths';
import { PaperDetail } from '@/components/PaperDetail';
import { PaperActions } from '@/components/PaperActions';
import { VerdictBadge } from '@/components/VerdictBadge';
import { RoleBadge } from '@/components/RoleBadge';

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

  const headline = (
    <>
      <Link href="/thu-vien" className="detail-back">
        <MdArrowBack /> Thư viện
      </Link>
      <h1 className="pd-title">
        {paper.is_chosen && (
          <MdStar className="pt-star" style={{ color: 'var(--amber)' }} />
        )}
        {paper.title}
      </h1>
      <p className="pd-authors">
        {paper.authors.slice(0, 4).join(', ')}
        {paper.authors.length > 4 ? ' et al.' : ''}
      </p>
    </>
  );

  const side = (
    <>
      <div className="pd-meta">
        <div className="pd-meta-title">Thông tin</div>
        <div className="kv">
          <span>Layer</span>
          <span>
            <span className="layer-tag" data-tip={layer?.focus}>
              L{paper.layer} · {layer?.name}
            </span>
          </span>
          <span>Năm</span>
          <span className="num">{paper.year ?? '—'}</span>
          <span>Venue</span>
          <span>{paper.venue ?? '—'}</span>
          <span>Cite</span>
          <span className="num">
            {paper.citations != null
              ? paper.citations.toLocaleString('en-US')
              : '?'}
          </span>
          <span>DOI</span>
          <span>
            {paper.doi ? (
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noreferrer"
              >
                {paper.doi}
              </a>
            ) : (
              <span className="muted">—</span>
            )}
          </span>
          <span>arXiv</span>
          <span>
            {paper.arxiv ? (
              <a
                href={`https://arxiv.org/abs/${paper.arxiv}`}
                target="_blank"
                rel="noreferrer"
              >
                {paper.arxiv}
              </a>
            ) : (
              <span className="muted">—</span>
            )}
          </span>
        </div>
      </div>

      {paper.role && (
        <div className="pd-meta">
          <div className="pd-meta-title">Vai trò trong đề tài</div>
          <RoleBadge role={paper.role} full />
          {paper.role_note && <p className="pd-role-note">{paper.role_note}</p>}
          {paper.status === 'rejected' && (
            <p className="pd-role-note rejected">
              ⛔ Đã loại theo §7 — {paper.reject_reason ?? 'xem rejected.json'}
            </p>
          )}
        </div>
      )}

      <div className="pd-meta">
        <div className="pd-meta-title">Hành động</div>
        <PaperActions paper={paper} layerDir={layerDir} />
      </div>

      {summary && (
        <div className="verdict-card">
          <div className="vc-head">
            <span className="vc-title">Verdict của Claude</span>
            <VerdictBadge verdict={paper.verdict} reason={paper.verdict_reason} />
            {summary.reproducible && (
              <span className="badge" data-tip="Khả năng tái lập">
                tái lập: {summary.reproducible}
              </span>
            )}
          </div>
          <div className="vc-grid">
            {summary.contribution && (
              <div className="vc-row">
                <span className="vc-label">Đóng góp</span>
                <span>{summary.contribution}</span>
              </div>
            )}
            {summary.best_metric && (
              <div className="vc-row">
                <span className="vc-label">Best metric</span>
                <span>{summary.best_metric}</span>
              </div>
            )}
            {summary.vs_baseline && (
              <div className="vc-row">
                <span className="vc-label">So baseline</span>
                <span>{summary.vs_baseline}</span>
              </div>
            )}
            {summary.gap && (
              <div className="vc-row">
                <span className="vc-label">Gap</span>
                <span>{summary.gap}</span>
              </div>
            )}
            {paper.verdict_reason && (
              <div className="vc-row">
                <span className="vc-label">Vì sao</span>
                <span>{paper.verdict_reason}</span>
              </div>
            )}
            {summary.verdict_prev && (
              <div className="vc-row">
                <span className="vc-label">Đã đổi</span>
                <span>
                  Verdict cũ: <b>{summary.verdict_prev}</b>
                  {summary.verdict_checked_at
                    ? ` · chạy lại ${summary.verdict_checked_at.slice(0, 10)}`
                    : ''}
                  {summary.verdict_reason_prev
                    ? ` — lý do cũ: ${summary.verdict_reason_prev}`
                    : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  return (
    <PaperDetail
      paper={paper}
      layerDir={layerDir}
      folder={decodeURIComponent(folder)}
      headline={headline}
      side={side}
    />
  );
}
