import type { Metadata } from 'next';
import { Fraunces, Be_Vietnam_Pro, Literata, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { TooltipProvider } from '@/components/TooltipProvider';

const fraunces = Fraunces({
  subsets: ['vietnamese', 'latin'],
  variable: '--next-font-fraunces',
  weight: ['400', '500', '600'],
});
const bvp = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  variable: '--next-font-bvp',
  weight: ['400', '500', '600'],
});
const literata = Literata({
  subsets: ['vietnamese', 'latin'],
  variable: '--next-font-literata',
  weight: ['400', '500', '600'],
});
const jbmono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--next-font-jbmono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'ExploreX',
  description: 'Quản lý paper theo Layer + auto-discovery đa nguồn',
};

// Chạy TRƯỚC hydration: set data-theme từ localStorage để không nháy màu sai.
// Đồng thời expose window.__setTheme cho ThemeToggle dùng ở mọi nơi.
const THEME_SCRIPT = `(function(){function apply(v){var t=(v==='light'||v==='dark')?v:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}try{apply(localStorage.getItem('explorex.theme'));}catch(e){apply(null);}window.__setTheme=function(v){try{localStorage.setItem('explorex.theme',v);}catch(e){}apply(v);};matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){var s=null;try{s=localStorage.getItem('explorex.theme');}catch(e){}if(s!=='light'&&s!=='dark')apply(null);});})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${fraunces.variable} ${bvp.variable} ${literata.variable} ${jbmono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
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
