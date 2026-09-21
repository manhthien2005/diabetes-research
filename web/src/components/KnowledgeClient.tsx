'use client';

import { useEffect, useRef, useState } from 'react';
import { Hero, type Mode } from './knowledge/Hero';
import {
  Overview,
  Biomarkers,
  Tiers,
  Criteria,
  Staging,
  Risks,
  LongTerm,
  Dataset,
  Pitfalls,
  Checklist,
} from './knowledge/sections';
import { Quiz } from './knowledge/Quiz';
import { CHAPTERS } from './knowledge/data';

export function KnowledgeClient() {
  const [mode, setMode] = useState<Mode>('read');
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  // chương cần cuộn tới sau khi chuyển từ Ôn tập → Đọc (đợi section mount)
  const pendingScroll = useRef<string | null>(null);

  // reveal khi cuộn vào tầm nhìn (thay animation cứng)
  useEffect(() => {
    if (mode !== 'read') return;
    const els = rootRef.current?.querySelectorAll<HTMLElement>('.kb-reveal');
    if (!els || !els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  // scroll-spy: highlight chương đang xem
  useEffect(() => {
    if (mode !== 'read') return;
    const els = rootRef.current?.querySelectorAll<HTMLElement>('.kb-section');
    if (!els || !els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  // sau khi đổi sang read mode, cuộn tới chương đang chờ
  useEffect(() => {
    if (mode === 'read' && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => scrollToChapter(id));
    }
  }, [mode]);

  function scrollToChapter(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  }

  function jump(id: string) {
    if (mode !== 'read') {
      pendingScroll.current = id;
      setMode('read');
    } else {
      scrollToChapter(id);
    }
  }

  return (
    <div className="kb" ref={rootRef}>
      <Hero mode={mode} onMode={setMode} activeId={activeId} onJump={jump} />

      {mode === 'read' ? (
        <>
          <Overview />
          <Biomarkers />
          <Tiers />
          <Criteria />
          <Staging />
          <Risks />
          <LongTerm />
          <Dataset />
          <Pitfalls />
          <Checklist />
        </>
      ) : (
        <Quiz onJumpToChapter={jump} />
      )}
    </div>
  );
}
