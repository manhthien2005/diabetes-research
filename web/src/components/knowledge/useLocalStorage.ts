'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * localStorage hook hydration-safe — theo idiom cờ `ready` của Sidebar.tsx.
 * SSR/lần render đầu luôn trả `initial` (khớp HTML tĩnh), sau mount mới đọc
 * giá trị đã lưu. Dùng `ready` để ẩn UI tránh nháy trước khi đọc xong.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (v: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* JSON hỏng hoặc storage chặn → giữ initial */
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [key],
  );

  return [value, set, ready];
}
