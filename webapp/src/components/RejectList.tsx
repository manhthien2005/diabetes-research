'use client';

import { useState } from 'react';
import { MdUndo, MdPerson, MdSmartToy } from 'react-icons/md';

interface RejectEntry {
  dedup_key: string;
  paper_id: string | null;
  title: string;
  doi: string | null;
  reason: string;
  by: 'user' | 'claude';
  layer: number | null;
  rejected_at: string;
}

export function RejectList({ initial }: { initial: RejectEntry[] }) {
  const [list, setList] = useState(initial);

  const unreject = async (key: string) => {
    const r = await fetch(`/api/reject?key=${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
    if (r.ok) setList((l) => l.filter((e) => e.dedup_key !== key));
  };

  if (list.length === 0) {
    return (
      <div className="empty-state">
        Chưa loại paper nào. Khi anh hoặc Claude reject 1 bài (kèm lý do), nó sẽ nằm đây và
        search sẽ không gợi lại.
      </div>
    );
  }

  return (
    <div className="reject-list">
      {list.map((e) => (
        <div key={e.dedup_key} className="reject-item">
          <div className="reject-body">
            <div className="reject-title">
              {e.layer && (
                <span className="layer-tag" style={{ marginRight: 6 }}>
                  L{e.layer}
                </span>
              )}
              {e.title}
            </div>
            <div className="reject-reason">
              <span
                className="reject-by"
                data-tip={e.by === 'claude' ? 'Claude loại' : 'Anh loại'}
              >
                {e.by === 'claude' ? <MdSmartToy /> : <MdPerson />}
              </span>
              {e.reason}
            </div>
          </div>
          <button
            className="ghost icon-btn"
            onClick={() => unreject(e.dedup_key)}
            data-tip="Bỏ loại (cho phép tìm lại)"
          >
            <MdUndo />
          </button>
        </div>
      ))}
    </div>
  );
}
