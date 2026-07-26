'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Anchor {
  text: string;
  rect: DOMRect;
  isRight: boolean;
}

export function TooltipProvider() {
  const [mounted, setMounted] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0, left: 0, top: 0 });
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onOver(e: MouseEvent) {
      const el = (e.target as Element).closest<HTMLElement>('[data-tip]');
      if (!el?.dataset.tip) {
        setAnchor(null);
        return;
      }
      setAnchor({
        text: el.dataset.tip,
        rect: el.getBoundingClientRect(),
        isRight: el.hasAttribute('data-tip-right'),
      });
    }
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, []);

  useLayoutEffect(() => {
    if (!anchor || !tipRef.current) {
      setStyle({ opacity: 0, left: 0, top: 0 });
      return;
    }
    const el = tipRef.current;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { rect, isRight } = anchor;
    const PAD = 8;

    let x: number, y: number;
    if (isRight) {
      x = rect.right + 10;
      y = rect.top + rect.height / 2 - h / 2;
      if (x + w > vw - PAD) x = rect.left - w - 10;
    } else {
      x = rect.left + rect.width / 2 - w / 2;
      y = rect.bottom + PAD;
      if (y + h > vh - PAD) y = rect.top - h - PAD;
    }

    x = Math.max(PAD, Math.min(x, vw - w - PAD));
    y = Math.max(PAD, Math.min(y, vh - h - PAD));

    setStyle({ opacity: 1, left: x, top: y });
  }, [anchor]);

  if (!mounted || !anchor) return null;

  return createPortal(
    <div ref={tipRef} className="tooltip-portal" style={style}>
      {anchor.text}
    </div>,
    document.body,
  );
}
