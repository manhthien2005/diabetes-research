import type { PaperMeta } from '@/lib/papers';

const STYLE: Record<string, { cls: string; label: string }> = {
  strong: { cls: 'green', label: '🟢 strong' },
  maybe: { cls: 'amber', label: '🟡 maybe' },
  weak: { cls: 'red', label: '🔴 weak' },
};

export function VerdictBadge({
  verdict,
  reason,
  analysisStatus,
}: {
  verdict: PaperMeta['verdict'];
  reason?: string | null;
  analysisStatus?: PaperMeta['analysis_status'];
}) {
  if (verdict) {
    const s = STYLE[verdict];
    return (
      <span className={`badge ${s.cls}`} data-tip={reason ?? undefined}>
        {s.label}
      </span>
    );
  }
  if (analysisStatus === 'queued') {
    return <span className="badge" data-tip="Đang trong hàng đợi phân tích">⏳ chờ</span>;
  }
  if (analysisStatus === 'analyzed') {
    return (
      <span className="badge" data-tip="Có analysis.html nhưng chưa có summary.json (verdict)">
        📊 chưa verdict
      </span>
    );
  }
  return <span className="faint">—</span>;
}
