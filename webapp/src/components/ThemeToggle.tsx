'use client';

import { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode, MdContrast } from 'react-icons/md';

type ThemePref = 'light' | 'dark' | 'system';

declare global {
  interface Window {
    __setTheme?: (v: ThemePref) => void;
  }
}

const OPTIONS: { value: ThemePref; label: string; Icon: typeof MdLightMode }[] = [
  { value: 'light', label: 'Giao diện sáng', Icon: MdLightMode },
  { value: 'system', label: 'Theo hệ thống', Icon: MdContrast },
  { value: 'dark', label: 'Giao diện tối', Icon: MdDarkMode },
];

export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref | null>(null);

  // đọc sau mount để SSR/client khớp (server không biết localStorage)
  useEffect(() => {
    const saved = localStorage.getItem('explorex.theme');
    setPref(saved === 'light' || saved === 'dark' ? saved : 'system');
  }, []);

  const choose = (v: ThemePref) => {
    setPref(v);
    window.__setTheme?.(v);
  };

  return (
    <div className="theme-seg" role="radiogroup" aria-label="Chế độ giao diện">
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={pref === value}
          className={pref === value ? 'active' : undefined}
          data-tip={label}
          onClick={() => choose(value)}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
