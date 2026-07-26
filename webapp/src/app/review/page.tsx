import Link from 'next/link';
import { MdScience, MdBlock, MdArrowForward, MdAccountTree } from 'react-icons/md';
import { listAllPapers } from '@/lib/papers';
import { listRejected } from '@/lib/reject';
import { layerById } from '@/lib/paths';
import { RejectList } from '@/components/RejectList';
import { BriefButton } from '@/components/BriefButton';

export const dynamic = 'force-dynamic';

export default function ReviewPage() {
  const all = listAllPapers();
  const queued = all
    .filter((p) => p.analysis_status === 'queued')
    .sort((a, b) => a.layer - b.layer);
  const analyzed = all.filter((p) => p.analysis_status === 'analyzed').length;
  const rejected = listRejected();

  return (
    <div>
      <h1 className="page-title">Phân tích &amp; chọn lọc</h1>
      <p className="page-sub">
        Hàng đợi để Claude (qua Claude Code) đọc &amp; phán xét · paper đã loại để không tìm lại.{' '}
        <a href="/api/loop" target="_blank" rel="noreferrer">
          <MdAccountTree style={{ verticalAlign: '-2px' }} /> Xem vòng lặp research
        </a>
      </p>

      <div className="review-topbar">
        <div className="review-hint card" style={{ flex: 1 }}>
          <b>Cách dùng:</b> đánh dấu paper “chờ phân tích” ở đây hoặc trong thư viện, rồi
          sang Claude Code bảo <code>phân tích hàng đợi</code> — Claude đọc full text, viết{' '}
          <code>analysis.html</code> + <code>summary.json</code> cho bài đạt, hoặc đẩy bài dở
          vào danh sách loại kèm lý do.
        </div>
        <BriefButton />
      </div>

      <div className="section-title">
        <MdScience style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Hàng đợi phân tích
        <span className="count-pill">{queued.length}</span>
        {analyzed > 0 && (
          <span className="faint" style={{ fontSize: 12, fontWeight: 400, marginLeft: 8 }}>
            · {analyzed} đã phân tích
          </span>
        )}
      </div>
      {queued.length === 0 ? (
        <div className="empty-state">
          Hàng đợi trống. Vào thư viện hoặc kết quả search, bấm “Chờ phân tích” cho paper anh muốn Claude xem.
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Tiêu đề</th>
                <th>Năm</th>
                <th>Tài nguyên</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {queued.map((p) => (
                <tr key={p.paper_id}>
                  <td>
                    <span className="layer-tag" data-tip={layerById(p.layer)?.name}>
                      L{p.layer}
                    </span>
                  </td>
                  <td>{p.title}</td>
                  <td className="muted">{p.year ?? '—'}</td>
                  <td className="faint" style={{ fontSize: 12 }}>
                    {[
                      p.has_pdf ? 'PDF' : null,
                      p.has_extracted ? 'text' : null,
                      p.code_url ? 'code' : null,
                      p.datasets.length ? `${p.datasets.length} ds` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || '—'}
                  </td>
                  <td>
                    <Link
                      href={`/paper/${encodeURIComponent(p.layer_dir)}/${encodeURIComponent(p.folderName)}`}
                      className="row-link"
                    >
                      Mở <MdArrowForward />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="section-title">
        <MdBlock style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Đã loại (không tìm lại)
        <span className="count-pill">{rejected.length}</span>
      </div>
      <RejectList initial={rejected} />
    </div>
  );
}
