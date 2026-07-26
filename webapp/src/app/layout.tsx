import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { TooltipProvider } from '@/components/TooltipProvider';

export const metadata: Metadata = {
  title: 'ExploreX',
  description: 'Quản lý paper theo Layer + auto-discovery đa nguồn',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <div className="app-shell">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
        <TooltipProvider />
      </body>
    </html>
  );
}
