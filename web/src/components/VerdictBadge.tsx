import type { PaperMeta } from '@/lib/papers';

const STYLE: Record<string, { cls: string; label: string }> = {
  strong: { cls: 'green', label: 'Strong' },
  maybe: { cls: 'amber', label: 'Maybe' },
  weak: { cls: 'red', label: 'Weak' },
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
        <span className={`dot ${s.cls}`} />
        {s.label}
      </span>
    );
  }
  if (analysisStatus === 'queued') {
    return (
      <span className="badge" data-tip="Đang trong hàng đợi phân tích">
        Chờ phân tích
      </span>
    );
  }
  if (analysisStatus === 'analyzed') {
    return (
      <span
        className="badge"
        data-tip="Có analysis.html nhưng chưa có summary.json (verdict)"
      >
        Chưa verdict
      </span>
    );
  }
  return <span className="faint">—</span>;
}
