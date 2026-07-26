'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdScience, MdCheckCircle, MdBlock, MdStar } from 'react-icons/md';
import type { PaperMeta } from '@/lib/papers';

export function PaperActions({
  paper,
  layerDir,
}: {
  paper: PaperMeta;
  layerDir: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(paper.analysis_status);
  const [busy, setBusy] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [chosen, setChosen] = useState(paper.is_chosen);
  const [promoteErr, setPromoteErr] = useState<string | null>(null);

  const doPromote = async () => {
    setBusy(true);
    setPromoteErr(null);
    try {
      const r = await fetch(
        `/api/paper/${encodeURIComponent(layerDir)}/${encodeURIComponent(paper.folderName)}/promote`,
        { method: 'POST' },
      );
      const d = await r.json();
      if (r.ok) {
        setChosen(true);
        router.refresh();
      } else {
        setPromoteErr(d.error ?? 'Lỗi promote');
      }
    } catch {
      setPromoteErr('Lỗi promote');
    } finally {
      setBusy(false);
    }
  };

  const setQueue = async (next: 'none' | 'queued') => {
    setBusy(true);
    try {
      await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layerDir, folder: paper.folderName, status: next }),
      });
      setStatus(next);
    } finally {
      setBusy(false);
    }
  };

  const doReject = async () => {
    if (!reason.trim()) return;
    setBusy(true);
    try {
      await fetch('/api/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: paper.title,
          paper_id: paper.paper_id,
          doi: paper.doi,
          arxiv: paper.arxiv,
          reason: reason.trim(),
          by: 'user',
          layer: paper.layer,
        }),
      });
      // /review đã ẩn khỏi menu — quay về Thư viện thay vì trang ẩn
      router.push('/thu-vien');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="paper-actions">
      {chosen ? (
        <span className="badge amber" data-tip="Đã nằm trong chosed_papers/ (baseline)">
          <MdStar /> Đã chọn
        </span>
      ) : (
        <button
          onClick={doPromote}
          disabled={busy || !paper.has_pdf}
          data-tip={
            paper.has_pdf
              ? 'Copy PDF sang chosed_papers/ — dùng làm baseline cho đề tài'
              : 'Chưa có PDF — không promote được'
          }
        >
          <MdStar /> Promote
        </button>
      )}
      {promoteErr && <span className="badge red">{promoteErr}</span>}

      {status === 'analyzed' ? (
        <span className="badge green" data-tip="Đã có analysis.html">
          <MdCheckCircle /> Đã phân tích
        </span>
      ) : status === 'queued' ? (
        <button onClick={() => setQueue('none')} disabled={busy} data-tip="Bỏ khỏi hàng đợi">
          <MdScience /> Đang chờ phân tích — bỏ?
        </button>
      ) : (
        <button onClick={() => setQueue('queued')} disabled={busy} data-tip="Đưa vào hàng đợi để Claude phân tích">
          <MdScience /> Chờ phân tích
        </button>
      )}

      {!rejecting ? (
        <button className="ghost" onClick={() => setRejecting(true)} data-tip="Loại bài này, không tìm lại">
          <MdBlock /> Loại
        </button>
      ) : (
        <div className="reject-inline">
          <input
            type="text"
            placeholder="Lý do loại (bắt buộc)…"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doReject()}
            autoFocus
          />
          <button className="primary" onClick={doReject} disabled={busy || !reason.trim()}>
            Xác nhận loại
          </button>
          <button className="ghost" onClick={() => setRejecting(false)}>
            Huỷ
          </button>
        </div>
      )}
    </div>
  );
}
