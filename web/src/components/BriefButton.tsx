'use client';

import { useState } from 'react';
import { MdSummarize, MdCheck } from 'react-icons/md';

export function BriefButton() {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');

  const gen = async () => {
    setState('busy');
    try {
      const r = await fetch('/api/brief', { method: 'POST' });
      setState(r.ok ? 'done' : 'idle');
      if (r.ok) setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('idle');
    }
  };

  return (
    <button
      onClick={gen}
      disabled={state === 'busy'}
      data-tip="Ghi RESEARCH_BRIEF.md ra 01_Diabetes_Research/docs/ — Claude đọc đầu mỗi phiên để định hướng nhanh"
    >
      {state === 'busy' ? (
        <>
          <span className="spinner" /> Đang sinh…
        </>
      ) : state === 'done' ? (
        <>
          <MdCheck /> Đã ghi RESEARCH_BRIEF.md
        </>
      ) : (
        <>
          <MdSummarize /> Sinh Research Brief
        </>
      )}
    </button>
  );
}
