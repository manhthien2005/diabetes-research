'use client';

import { useEffect, useRef, useState } from 'react';
import { Hero, type Mode } from './research-knowledge/Hero';
import {
  Overview,
  Meaningful,
  Rigor,
  Value,
  Pitfalls,
  Experience,
  Checklist,
} from './research-knowledge/sections';
import { Quiz } from './research-knowledge/Quiz';
import { CHAPTERS } from './research-knowledge/data';

export function ResearchKnowledgeClient() {
  const [mode, setMode] = useState<Mode>('read');
  const [activeId, setActiveId] = useState<string>(CHAPTERS[0].id);
  const rootRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<string | null>(null);

  // reveal khi cuộn vào tầm nhìn
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
          <Meaningful />
          <Rigor />
          <Value />
          <Pitfalls />
          <Experience />
          <Checklist />
        </>
      ) : (
        <Quiz onJumpToChapter={jump} />
      )}
    </div>
  );
}
