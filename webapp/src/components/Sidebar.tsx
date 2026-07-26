'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdLibraryBooks,
  MdMenuBook,
  MdSchool,
  MdQuestionAnswer,
  MdRocketLaunch,
  // MdTravelExplore,
  // MdScience,
  // MdLeaderboard,
  MdSettings,
  MdMenuOpen,
  MdMenu,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import { ThemeToggle } from './ThemeToggle';

interface NavItem {
  href: string;
  label: string;
  Icon: IconType;
  exact?: boolean;
}

const NAV: NavItem[] = [
  // Tổng quan (trang chủ) đứng đầu: mở app là thấy ngay "bước tiếp theo".
  { href: '/', label: 'Tổng quan', Icon: MdRocketLaunch, exact: true },
  { href: '/thu-vien', label: 'Thư viện', Icon: MdLibraryBooks },
  { href: '/kien-thuc', label: 'Kiến thức ĐTĐ', Icon: MdMenuBook },
  { href: '/kien-thuc-nckh', label: 'Phương pháp NCKH', Icon: MdSchool },
  { href: '/qa-log', label: 'Hỏi–Đáp định hướng', Icon: MdQuestionAnswer },
  // Ẩn theo yêu cầu (làm việc 1-1 với Claude thay vì search trong app) — chỉ ẩn, không xoá:
  // { href: '/search', label: 'Tìm bài báo', Icon: MdTravelExplore },
  // { href: '/review', label: 'Phân tích & lọc', Icon: MdScience },
  // { href: '/sources', label: 'Chất lượng nguồn', Icon: MdLeaderboard },
  { href: '/settings', label: 'Cài đặt', Icon: MdSettings },
];

interface LayerStat {
  id: number;
  name: string;
  count: number;
  chosen: number;
  analyzed: number;
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const [layers, setLayers] = useState<LayerStat[]>([]);

  useEffect(() => {
    setCollapsed(localStorage.getItem('explorex.sidebar') === 'collapsed');
    setReady(true);
  }, []);

  // refresh tiến độ layer mỗi lần đổi trang (rẻ: chỉ đọc metadata local)
  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d) => Array.isArray(d.byLayer) && setLayers(d.byLayer))
      .catch(() => {});
  }, [pathname]);

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem('explorex.sidebar', next ? 'collapsed' : 'open');
      return next;
    });
  };

  return (
    <aside
      className={`sidebar${collapsed ? ' collapsed' : ''}`}
      // tránh nháy layout trước khi đọc localStorage
      style={ready ? undefined : { visibility: 'hidden' }}
    >
      <div className="brand">
        {collapsed ? (
          <div className="brand-mark">
            E<b>x</b>
          </div>
        ) : (
          <div className="brand-name">
            Explore<b>X</b>
          </div>
        )}
      </div>

      {NAV.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link${active ? ' active' : ''}`}
            data-tip={collapsed ? item.label : undefined}
            data-tip-right={collapsed ? '' : undefined}
          >
            <item.Icon className="nav-ico" />
            {!collapsed && item.label}
          </Link>
        );
      })}

      {layers.length > 0 && (
        <div className="layer-progress">
          {!collapsed && <div className="lp-title">Tiến độ Layer</div>}
          {layers.map((l) => {
            const weak = l.chosen === 0;
            return (
              <div
                key={l.id}
                className={`lp-row${weak ? ' weak' : ''}`}
                data-tip={`${l.name}: ${l.chosen} chọn · ${l.analyzed} phân tích · ${l.count} tổng${weak ? ' — còn yếu, ưu tiên tìm' : ''}`}
                data-tip-right={collapsed ? '' : undefined}
              >
                <span className="lp-tag">L{l.id}</span>
                {!collapsed && (
                  <span className="lp-nums">
                    {l.chosen}/{l.count}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="sidebar-spacer" />

      <ThemeToggle />

      <button
        className="collapse-btn"
        onClick={toggle}
        data-tip={collapsed ? 'Mở rộng' : undefined}
        data-tip-right={collapsed ? '' : undefined}
        aria-label={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
      >
        {collapsed ? <MdMenu /> : <MdMenuOpen />}
        {!collapsed && <span style={{ fontSize: 13 }}>Thu gọn</span>}
      </button>
    </aside>
  );
}
