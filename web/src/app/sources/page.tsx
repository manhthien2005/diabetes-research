import {
  getSourceScores,
  getOverallStats,
  getRecentRuns,
} from '@/lib/analytics';

export const dynamic = 'force-dynamic';

function pct(n: number): string {
  return `${Math.round(n * 100)}%`;
}
function fmtCit(n: number | null): string {
  return n == null ? '—' : Math.round(n).toLocaleString('en-US');
}

export default function SourcesPage() {
  const scores = getSourceScores();
  const overall = getOverallStats();
  const runs = getRecentRuns(15);
  const maxSaved = Math.max(1, ...scores.map((s) => s.saved_hits));

  return (
    <div>
      <h1 className="page-title">📊 Chất lượng nguồn</h1>
      <p className="page-sub">
        Nguồn nào cung cấp paper anh thực sự lưu → ưu tiên. Tính từ lịch sử
        search (đóng góp · save-rate · citations TB · độ tin cậy).
      </p>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="v">{overall.total_runs}</div>
          <div className="l">Lượt search</div>
        </div>
        <div className="stat-box">
          <div className="v">{overall.total_hits.toLocaleString('en-US')}</div>
          <div className="l">Tổng hit (theo nguồn)</div>
        </div>
        <div className="stat-box">
          <div className="v">{overall.total_saved}</div>
          <div className="l">Paper đã lưu</div>
        </div>
      </div>

      {scores.length === 0 ? (
        <div className="empty-state" style={{ marginTop: 20 }}>
          Chưa có dữ liệu. Chạy vài lượt search ở trang Tìm bài báo, dữ liệu xếp
          hạng sẽ xuất hiện ở đây.
        </div>
      ) : (
        <>
          <div className="section-title">Bảng xếp hạng nguồn</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nguồn</th>
                  <th>Đóng góp (đã lưu / tổng)</th>
                  <th>Save-rate</th>
                  <th>Citations TB</th>
                  <th>Độ tin cậy</th>
                  <th>Latency TB</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s, i) => (
                  <tr key={s.source_id}>
                    <td className="faint">{i + 1}</td>
                    <td>
                      <b>{s.label}</b>
                      <div className="faint" style={{ fontSize: 11 }}>
                        {s.source_id}
                      </div>
                    </td>
                    <td>
                      <div className="contrib-bar">
                        <div
                          className="contrib-fill"
                          style={{
                            width: `${(s.saved_hits / maxSaved) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="faint" style={{ fontSize: 12 }}>
                        {s.saved_hits} / {s.total_hits}
                      </span>
                    </td>
                    <td>{pct(s.save_rate)}</td>
                    <td>{fmtCit(s.avg_citations)}</td>
                    <td>
                      <span
                        className={
                          s.reliability >= 0.8
                            ? 'rel-good'
                            : s.reliability >= 0.4
                              ? 'rel-mid'
                              : 'rel-bad'
                        }
                      >
                        {pct(s.reliability)}
                      </span>
                      <span className="faint" style={{ fontSize: 11 }}>
                        {' '}
                        ({s.ok_runs}/{s.runs})
                      </span>
                    </td>
                    <td className="faint">
                      {s.avg_latency_ms != null
                        ? `${Math.round(s.avg_latency_ms)}ms`
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="faint" style={{ fontSize: 12, marginTop: 10 }}>
            Xếp hạng theo: số paper đã lưu → save-rate → citations TB. Nguồn
            top là nguồn đáng ưu tiên cho chủ đề hiện tại.
          </p>

          <div className="section-title">Lịch sử search gần đây</div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Query</th>
                  <th>Thời điểm</th>
                  <th>Hit</th>
                  <th>Đã lưu</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.id}>
                    <td className="faint">{r.id}</td>
                    <td>{r.query}</td>
                    <td className="faint">{r.created_at}</td>
                    <td>{r.total}</td>
                    <td>{r.saved ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
