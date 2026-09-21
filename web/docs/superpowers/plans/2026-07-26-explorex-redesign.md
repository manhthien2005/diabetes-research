# ExploreX Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. (User yêu cầu thực thi inline, KHÔNG dùng subagent.)

**Goal:** Redesign toàn bộ giao diện ExploreX theo spec `docs/superpowers/specs/2026-07-26-explorex-redesign-design.md` — soft-premium, 2 theme light/dark, tái cấu trúc 5 trang.

**Architecture:** Re-skin trên CSS thuần (phương án A). Chiến lược then chốt: `tokens.css` mới **định nghĩa lại đúng các tên biến cũ** (`--bg`, `--surface`, `--text`, `--accent`…) theo 2 theme — toàn bộ 5.7k dòng CSS cũ đổi màu ngay mà chưa vỡ gì; sau đó viết lại từng section thành file riêng và xoá dần phần cũ.

**Tech Stack:** Next.js 15 App Router, React 19, CSS thuần + CSS variables, `next/font/google`.

## Global Constraints

- KHÔNG thêm dependency mới. KHÔNG đổi API routes, logic dữ liệu, cơ chế highlight PDF, quiz.
- Mọi font phải khai báo subset `vietnamese` + `latin`.
- Light mode mặc định lần đầu (theo `prefers-color-scheme` nếu có), lưu lựa chọn ở `localStorage['explorex.theme']` (giá trị: `light` | `dark` | `system`).
- Contrast body text ≥ 4.5:1 cả 2 theme. `prefers-reduced-motion: reduce` → tắt transform/animation.
- Motion: `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, 200–300ms.
- Sau mỗi task: `npm run build` sạch + kiểm tra browser cả 2 theme rồi mới commit.
- Bản đồ section globals.css cũ (để gỡ dần): 1–600 tokens/base/sidebar/shared · 601–720 library · 721–1207 paper detail · 1208–1261 sources · 1262–1428 settings · 1429–1673 search · 1674–1778 review+paper actions · 1779–1810 responsive · 1811–4628 knowledge (kb-/rk-) · 4629–4823 bilingual reader · 4824–5036 qa-log · 5037+ tiến độ.

---

### Task 1: Nền móng — tokens 2 theme, fonts, theme switching, sidebar mới

**Files:**
- Create: `webapp/src/styles/tokens.css`, `webapp/src/styles/base.css`, `webapp/src/styles/components/sidebar.css`, `webapp/src/styles/components/shared.css`
- Create: `webapp/src/components/ThemeToggle.tsx`
- Modify: `webapp/src/app/layout.tsx`, `webapp/src/app/globals.css` (đầu file: import các file mới, XOÁ `:root{...}` cũ dòng 7–57 và block `html,body` font cũ), `webapp/src/components/Sidebar.tsx`

**Interfaces:**
- Produces: token CSS vars giữ NGUYÊN TÊN cũ (`--bg --surface --surface-2 --surface-3 --border --border-strong --text --text-dim --text-faint --accent --accent-hover --accent-soft --accent-border --green --red --amber --purple --green-soft --red-soft --amber-soft --radius --radius-sm --radius-lg --sidebar-w --sidebar-w-collapsed --shadow --ease`) + vars MỚI: `--font-display --font-ui --font-reading --font-mono --shadow-sm --shadow-lg --shadow-hover --purple-soft --accent-ink`
- Produces: `<ThemeToggle />` (client component, không props) — dùng ở Sidebar (Task 1) và Settings (Task 7).
- Produces: helper toàn cục `window.__setTheme(t: 'light'|'dark'|'system')` do inline script trong layout định nghĩa.

- [ ] **Step 1: Viết `tokens.css`** — 2 theme qua `[data-theme]`:

```css
/* tokens.css — nguồn sự thật duy nhất về màu/chữ/bóng/motion */
:root {
  --font-display: var(--next-font-fraunces);
  --font-ui: var(--next-font-bvp);
  --font-reading: var(--next-font-literata);
  --font-mono: var(--next-font-jbmono);

  --radius-sm: 8px; --radius: 12px; --radius-lg: 16px; --radius-xl: 20px;
  --sidebar-w: 232px; --sidebar-w-collapsed: 64px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

[data-theme='light'] {
  color-scheme: light;
  --bg: #faf7f2; --surface: #fffdfa; --surface-2: #f4efe7; --surface-3: #ece5d8;
  --border: #e8e1d6; --border-strong: #d8cfbf;
  --text: #2a2520; --text-dim: #6e655a; --text-faint: #9a8f80;
  --accent: #0f766e; --accent-hover: #0d5f59; --accent-ink: #0b4f4a;
  --accent-soft: rgba(15, 118, 110, 0.09); --accent-border: rgba(15, 118, 110, 0.32);
  --green: #4c8c5c; --red: #c4593f; --amber: #b98a2f; --purple: #7c6aab;
  --green-soft: rgba(76, 140, 92, 0.12); --red-soft: rgba(196, 89, 63, 0.11);
  --amber-soft: rgba(185, 138, 47, 0.13); --purple-soft: rgba(124, 106, 171, 0.12);
  --shadow-sm: 0 1px 2px rgba(80, 60, 30, 0.05);
  --shadow: 0 1px 2px rgba(80, 60, 30, 0.05), 0 4px 16px rgba(80, 60, 30, 0.07);
  --shadow-lg: 0 2px 4px rgba(80, 60, 30, 0.05), 0 12px 32px rgba(80, 60, 30, 0.1);
  --shadow-hover: 0 2px 4px rgba(80, 60, 30, 0.06), 0 10px 28px rgba(80, 60, 30, 0.12);
}

[data-theme='dark'] {
  color-scheme: dark;
  --bg: #191714; --surface: #201d19; --surface-2: #282420; --surface-3: #302b26;
  --border: #332e28; --border-strong: #453e35;
  --text: #e8e2d9; --text-dim: #a69b8c; --text-faint: #746a5d;
  --accent: #2fa79a; --accent-hover: #4dbfb2; --accent-ink: #7fd4c9;
  --accent-soft: rgba(47, 167, 154, 0.13); --accent-border: rgba(47, 167, 154, 0.38);
  --green: #6faf7f; --red: #d98973; --amber: #cfa25c; --purple: #a493cf;
  --green-soft: rgba(111, 175, 127, 0.13); --red-soft: rgba(217, 137, 115, 0.12);
  --amber-soft: rgba(207, 162, 92, 0.13); --purple-soft: rgba(164, 147, 207, 0.13);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 18px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 2px 4px rgba(0, 0, 0, 0.3), 0 14px 36px rgba(0, 0, 0, 0.42);
  --shadow-hover: 0 2px 4px rgba(0, 0, 0, 0.32), 0 10px 30px rgba(0, 0, 0, 0.46);
}
```

- [ ] **Step 2: Viết `base.css`** — reset + typography nền: `html,body` dùng `var(--font-ui)`, font-size 15px, line-height 1.6; `h1..h4` dùng `var(--font-display)` weight 550, letter-spacing -0.01em; `.page-title` 25px; `.page-sub` màu `--text-dim`; scrollbar mảnh màu `--border-strong`; `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }`; `::selection` nền `--accent-soft`; block `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important } }`; class `.reading-col { max-width: 70ch; font-family: var(--font-reading); font-size: 17px; line-height: 1.7 }`.

- [ ] **Step 3: Fonts + theme script trong `layout.tsx`:**

```tsx
import { Fraunces, Be_Vietnam_Pro, Literata, JetBrains_Mono } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['vietnamese', 'latin'], variable: '--next-font-fraunces', weight: ['400', '500', '600'] });
const bvp = Be_Vietnam_Pro({ subsets: ['vietnamese', 'latin'], variable: '--next-font-bvp', weight: ['400', '500', '600'] });
const literata = Literata({ subsets: ['vietnamese', 'latin'], variable: '--next-font-literata', weight: ['400', '500', '600'] });
const jbmono = JetBrains_Mono({ subsets: ['latin'], variable: '--next-font-jbmono', weight: ['400', '500'] });

const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('explorex.theme');var t=(s==='light'||s==='dark')?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();window.__setTheme=function(v){try{localStorage.setItem('explorex.theme',v);}catch(e){}var t=(v==='light'||v==='dark')?v:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);};`;
```

`<html lang="vi" className={...4 biến font} suppressHydrationWarning>`, trong `<head>`: `<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />`. (`suppressHydrationWarning` bắt buộc vì script set attribute trước hydration.)

- [ ] **Step 4: `ThemeToggle.tsx`** — client component: đọc `localStorage['explorex.theme']` trong `useEffect` (default `'system'`), 3 nút icon (MdLightMode / MdDarkMode / MdContrast từ react-icons/md) dạng segmented control class `.theme-seg`; onClick gọi `window.__setTheme(v)` + `setState`. Không render mismatch: trước khi mounted render đủ 3 nút không active.

- [ ] **Step 5: `sidebar.css` + `shared.css`, sửa `Sidebar.tsx`** — chuyển section sidebar (trong dòng 1–600 globals cũ) sang `sidebar.css` viết lại: brand dùng `--font-display` (chữ "ExploreX" serif, bỏ brand-mark vuông "E" → logotype chữ), nav-link bo `--radius`, active nền `--accent-soft` chữ `--accent-ink` + thanh chỉ báo trái 3px, hover nền `--surface-2`, transition 200ms var(--ease); mini layer progress giữ markup, restyle: `.lp-tag` mono 11px, hàng `weak` chấm đỏ nhỏ thay màu chữ; thêm `<ThemeToggle />` phía trên nút collapse. `shared.css`: `.badge` (nền soft + chữ đậm 12.5px, bo full), `.btn` các cấp (primary nền `--accent` chữ trắng, hover `--accent-hover` + translateY(-1px); ghost viền `--border` nền `--surface`), `.card` (nền `--surface`, bo `--radius-lg`, `--shadow`, hover `--shadow-hover`), tooltip giữ cơ chế `data-tip` hiện có (chỉ đổi màu nền `--surface-3`/chữ `--text`).

- [ ] **Step 6: Sửa `globals.css`** — đầu file thay comment + `:root{}` cũ (dòng 1–57) và font-family trong `html,body` bằng: `@import '../styles/tokens.css'; @import '../styles/base.css'; @import '../styles/components/shared.css'; @import '../styles/components/sidebar.css';` — xoá block sidebar/badge/btn cũ đã chuyển đi. Phần CSS cũ còn lại giữ nguyên (giờ tự ăn màu mới qua biến).

- [ ] **Step 7: Verify:** `npm run build` sạch. Mở browser: toggle 3 chế độ — đổi màu tức thì, reload không nháy (kiểm bằng hard reload vài lần), sidebar mới cả 2 theme, các trang còn lại vẫn dùng được (màu mới, layout cũ).

- [ ] **Step 8: Commit** `feat(redesign): đợt 1 — tokens 2 theme, fonts Việt, theme toggle, sidebar mới`

---

### Task 2: Tổng quan thành trang chủ + route Thư viện mới

**Files:**
- Create: `webapp/src/app/thu-vien/page.tsx` (copy nội dung `app/page.tsx` cũ, đổi title "Thư viện")
- Modify: `webapp/src/app/page.tsx` (thành trang Tổng quan — render `ProgressClient` + header stats mới), `webapp/src/app/tien-do/page.tsx` (thành `redirect('/')`), `webapp/src/components/Sidebar.tsx` (NAV mới), `webapp/src/components/ProgressClient.tsx` (chỉ markup/class, không đổi logic)
- Create: `webapp/src/styles/components/overview.css`

**Interfaces:**
- Consumes: `listPapersByLayer()`, `libraryStats()` từ `@/lib/papers`; `ProgressClient` + data từ `@/lib/progress` (giữ nguyên cách trang tien-do cũ load).
- Produces: NAV mới trong Sidebar: `[{href:'/',label:'Tổng quan',Icon:MdRocketLaunch,exact:true},{href:'/thu-vien',label:'Thư viện',Icon:MdLibraryBooks},{href:'/hoc-tap',label:'Học tập',Icon:MdSchool},{href:'/qa-log',label:'Hỏi–Đáp',Icon:MdQuestionAnswer},{href:'/settings',label:'Cài đặt',Icon:MdSettings}]` (mục `/hoc-tap` có từ Task 5 — tạm trỏ `/kien-thuc` đến khi Task 5 xong sẽ đổi; ghi chú TODO trong code là plan-failure → làm luôn ở Task 5, còn Task 2 NAV để 6 mục: Tổng quan/Thư viện/Kiến thức ĐTĐ/Phương pháp NCKH/Hỏi–Đáp/Cài đặt).

- [ ] **Step 1:** Tạo `thu-vien/page.tsx` (nội dung `page.tsx` cũ nguyên vẹn). Viết lại `app/page.tsx`: server component load cả progress data (như `tien-do/page.tsx` cũ) + `libraryStats()`; render `<header class="ov-hero">` (h1 Fraunces "Tổng quan", ngày + tuần hiện tại), 4 stat card (`.ov-stat`: tổng paper / đã chọn / đã phân tích / có code — số dùng `--font-mono` 31px), thanh tiến độ layer (`.ov-layerbar`: label L1–L4 + bar nền `--surface-3`, fill `--accent`, % mono), rồi `<ProgressClient initial={...} />` bên dưới.
- [ ] **Step 2:** `tien-do/page.tsx` → `import { redirect } from 'next/navigation'; export default function T(){ redirect('/'); }`.
- [ ] **Step 3:** Cập nhật NAV Sidebar (6 mục như Interfaces), restyle khối "Bước tiếp theo" của ProgressClient trong `overview.css`: card nổi `--shadow-lg`, viền trái 4px `--accent`, tiêu đề task 20px Fraunces; các tier/phase card ăn `.card` chung; chuyển section tiến độ cũ (globals 5037→cuối) vào `overview.css` viết lại theo token, xoá khỏi globals.
- [ ] **Step 4: Verify:** build sạch; `/` là Tổng quan (stats đúng số, bước tiếp theo hiện to nhất), `/tien-do` redirect về `/`, `/thu-vien` là thư viện cũ, nav active đúng, 2 theme ổn.
- [ ] **Step 5: Commit** `feat(redesign): đợt 2 — Tổng quan làm trang chủ, Thư viện /thu-vien`

---

### Task 3: Thư viện — toolbar lọc + 2 chế độ xem

**Files:**
- Create: `webapp/src/components/LibraryToolbar.tsx`, `webapp/src/styles/components/library.css`
- Modify: `webapp/src/components/LibraryView.tsx`, `webapp/src/components/VerdictBadge.tsx`, `webapp/src/app/thu-vien/page.tsx`

**Interfaces:**
- Consumes: `PaperMeta` từ `@/lib/papers` (fields: `title, year, venue, citations, verdict, verdict_reason, analysis_status, is_chosen, code_url, datasets, has_pdf, has_analysis, has_notes, has_highlights, folderName, paper_id`).
- Produces: `type LibraryFilters = { q: string; layers: number[]; verdicts: ('strong'|'maybe'|'weak'|'none')[]; hasCode: boolean; hasPdf: boolean; sort: 'cite'|'year'|'title' }`; `<LibraryToolbar value={LibraryFilters} onChange={(f: LibraryFilters) => void} view={'table'|'cards'} onView={(v) => void} total={number} shown={number} />`.

- [ ] **Step 1:** Viết `LibraryToolbar.tsx`: ô search (lọc `title` chứa `q`, không phân biệt hoa thường), nhóm chip toggle layer L1–L4, chip verdict (Strong/Maybe/Weak/Chưa), 2 checkbox chip (Có code / Có PDF), select sort, segmented toggle bảng⇄card (icon MdTableRows / MdGridView). View lưu `localStorage['explorex.libraryView']` (`'table'|'cards'`), đọc trong `useEffect` sau mount (tránh hydration mismatch).
- [ ] **Step 2:** `LibraryView.tsx`: thêm state `filters` + `view`; hàm lọc `papers` mỗi bucket theo filters (verdict `'none'` khớp `p.verdict == null`); sort theo lựa chọn (cite desc, year desc, title asc); đếm `shown/total` truyền toolbar. Giữ accordion layer + bảng hiện có (bảng chỉ đổi class/style); thêm nhánh `view === 'cards'`: grid `repeat(auto-fill, minmax(320px, 1fr))`, card gồm: hàng đầu (star chosen + VerdictBadge), tiêu đề serif 17px Fraunces tối đa 3 dòng (`-webkit-line-clamp: 3`), meta (năm · venue · cite mono), hàng icon tài nguyên tái dùng `ResIcon` (export `ResIcon` từ LibraryView).
- [ ] **Step 3:** `VerdictBadge.tsx`: bỏ emoji — `strong → <span class="badge green">Strong</span>`, `maybe → amber "Maybe"`, `weak → red "Weak"`, `queued → badge thường "Chờ phân tích"`, `analyzed → badge thường "Chưa verdict"` (giữ nguyên props + data-tip reason).
- [ ] **Step 4:** `library.css`: chuyển + viết lại section library cũ (globals 601–720): layer accordion đầu mục sticky top, bảng: header 12px uppercase letter-spacing 0.06em màu `--text-faint`, hàng hover nền `--surface-2` + không translateY (bảng giữ ổn định), cite/năm `--font-mono`, cột venue ellipsis; card view như Step 2. Xoá section cũ khỏi globals.
- [ ] **Step 5: Verify:** build sạch; lọc từng chiều + kết hợp, sort đúng, toggle view nhớ qua reload, badge mới cả 2 theme, bảng + card đều click mở paper đúng.
- [ ] **Step 6: Commit** `feat(redesign): đợt 3 — Thư viện lọc/sort + card view, verdict badge chữ`

---

### Task 4: Chi tiết paper — bố cục đọc-là-chính

**Files:**
- Create: `webapp/src/styles/components/paper.css`
- Modify: `webapp/src/components/PaperDetail.tsx`, `webapp/src/components/PaperActions.tsx` (chỉ class/markup), `webapp/src/styles/components/paper.css` nhận cả section bilingual reader

**Interfaces:**
- Consumes: cấu trúc tabs/panels hiện có của PaperDetail (đọc file trước khi sửa); PdfHighlighter + BilingualReader — KHÔNG sửa logic 2 file này, chỉ wrapper class.

- [ ] **Step 1:** Đọc `PaperDetail.tsx` + trang `paper/[layerDir]/[folder]/page.tsx`, xác định phần header/metadata/tabs. Sửa layout: grid 2 cột `minmax(0,1fr) 300px` (≥1200px), cột phải `position: sticky; top: 24px` chứa metadata (năm, venue, cite, dataset, links code/PDF) + PaperActions (promote/reject/notes); cột trái: tiêu đề Fraunces 25px, tab bar mới (underline animated 200ms), nội dung analysis/notes bọc `.reading-col` (Literata 17px). Mobile (<1200px): panel phải tụt xuống dưới tiêu đề, không sticky.
- [ ] **Step 2:** `paper.css`: viết lại section 721–1207 + 4629–4823 (bilingual chrome: toolbar, nút chuyển EN|VN, nền pane giấy dùng `--surface` thay hardcode) theo token mới; xoá 2 section cũ khỏi globals.
- [ ] **Step 3: Verify:** build sạch; mở 1 paper có PDF + highlight + notes: đọc phân tích (cột 70ch), promote/reject hoạt động, PDF highlight vẽ đúng, đọc song ngữ canh mục đúng, panel sticky cuộn mượt, 2 theme + mobile 375px.
- [ ] **Step 4: Commit** `feat(redesign): đợt 4 — paper detail đọc-là-chính, panel sticky`

---

### Task 5: Học tập — gộp 2 trang kiến thức

**Files:**
- Create: `webapp/src/app/hoc-tap/page.tsx` (trang bìa), `webapp/src/app/hoc-tap/dtd/page.tsx`, `webapp/src/app/hoc-tap/nckh/page.tsx`, `webapp/src/styles/components/learn.css`
- Modify: `webapp/src/app/kien-thuc/page.tsx` + `webapp/src/app/kien-thuc-nckh/page.tsx` (→ `redirect`), `webapp/src/components/Sidebar.tsx` (NAV 5 mục cuối cùng), `webapp/src/components/knowledge/Hero.tsx` + `webapp/src/components/research-knowledge/Hero.tsx` (chỉ class)

**Interfaces:**
- Consumes: `KnowledgeClient` (kien-thuc cũ), `ResearchKnowledgeClient` (kien-thuc-nckh cũ) — render nguyên vẹn trong route mới.
- Produces: NAV cuối: `Tổng quan / Thư viện / Học tập(/hoc-tap) / Hỏi–Đáp / Cài đặt`; active match `pathname.startsWith('/hoc-tap')`.

- [ ] **Step 1:** `hoc-tap/page.tsx`: 2 course card lớn (`.learn-card`): tiêu đề Fraunces 20px ("Kiến thức Đái tháo đường" / "Phương pháp NCKH"), mô tả ngắn, số chương (từ `CHAPTERS.length` import `@/components/knowledge/data` và bản rk tương ứng), tiến độ quiz đã lưu localStorage (đọc key quiz hiện dùng — xem `useLocalStorage.ts` để lấy đúng key, hiển thị "Chưa bắt đầu" nếu trống), hover nâng + shadow bloom, click vào `/hoc-tap/dtd` | `/hoc-tap/nckh`.
- [ ] **Step 2:** `hoc-tap/dtd/page.tsx` render `<KnowledgeClient />`, `hoc-tap/nckh/page.tsx` render `<ResearchKnowledgeClient />` (copy đúng cách trang cũ render, gồm metadata/title). 2 trang cũ → `redirect('/hoc-tap/dtd')` / `redirect('/hoc-tap/nckh')`.
- [ ] **Step 3:** NAV Sidebar chốt 5 mục. `learn.css`: course cards + restyle hero 2 trang kiến thức về ngôn ngữ mới (bỏ gradient mesh rực → nền `--surface` + viền accent mảnh + chữ Fraunces; giữ stats + mode tabs), TOC/section/quiz ăn token qua biến (đa số kb-/rk- CSS cũ giữ nguyên vị trí trong globals — CHỈ chuyển phần hero + chỉnh màu hardcode nếu lệch token; ghi chú: khối kb- 1811–4628 quá lớn, viết lại toàn bộ không cần thiết vì đã ăn biến mới).
- [ ] **Step 4: Verify:** build; `/hoc-tap` bìa đẹp 2 theme, vào từng khoá: đọc + scroll-spy + quiz chạy đúng, route cũ redirect, sidebar 5 mục active đúng.
- [ ] **Step 5: Commit** `feat(redesign): đợt 5 — gộp Học tập, sidebar 5 mục`

---

### Task 6: Hỏi–Đáp + Cài đặt

**Files:**
- Create: `webapp/src/styles/components/qa.css`, `webapp/src/styles/components/settings.css`
- Modify: `webapp/src/components/QaLogClient.tsx`, `webapp/src/components/SettingsClient.tsx` (thêm mục giao diện + ThemeToggle; chỉ markup/class phần còn lại)

**Interfaces:**
- Consumes: `<ThemeToggle />` từ Task 1.

- [ ] **Step 1:** Đọc `QaLogClient.tsx`; restyle timeline: mỗi entry là card, câu hỏi có avatar chấm `--accent` + chữ đậm, trả lời thụt vào + viền trái 2px `--border-strong`, ngày nhóm sticky nhỏ mono; chuyển section 4824–5036 → `qa.css` viết lại, xoá cũ.
- [ ] **Step 2:** `SettingsClient.tsx`: thêm section "Giao diện" đầu trang chứa `<ThemeToggle />` + mô tả; restyle các section còn lại thành `.card`; chuyển 1262–1428 → `settings.css`, xoá cũ.
- [ ] **Step 3: Verify:** build; qa-log đọc lại mạch lạc, settings lưu/đổi theme cả từ đây lẫn sidebar đồng bộ (cùng `window.__setTheme`), 2 theme.
- [ ] **Step 4: Commit** `feat(redesign): đợt 6 — Hỏi–Đáp timeline, Cài đặt + chọn theme`

---

### Task 7: Tổng duyệt — polish, responsive, accessibility, dọn CSS

**Files:**
- Modify: mọi file styles/ theo phát hiện; `webapp/src/app/globals.css` (dọn: section sources 1208–1261, search 1429–1673, review 1674–1778 của các trang ẩn → giữ nguyên nhưng gom xuống cuối dưới comment `/* legacy — trang ẩn */`; responsive 1779–1810 chuyển vào base.css)

- [ ] **Step 1:** Duyệt từng trang × 2 theme × 4 breakpoint (375/768/1024/1440): sửa tràn, chữ nhỏ, hover thiếu, empty state (thư viện lọc không kết quả → minh hoạ chữ "Không có paper khớp bộ lọc" + nút xoá lọc; layer rỗng giữ dòng hiện có restyle).
- [ ] **Step 2:** Kiểm contrast bằng đọc giá trị computed (javascript_tool) các cặp text/bg chính cả 2 theme — tất cả ≥ 4.5 (body) / 3.0 (chữ lớn ≥19px). Chỉnh token nếu lệch.
- [ ] **Step 3:** Bật emulate `prefers-reduced-motion` kiểm không còn transform/animation; kiểm focus-visible tab qua nav/toolbar/bảng.
- [ ] **Step 4:** `npm run build` cuối + đi lại toàn bộ luồng chính: mở app → Tổng quan → Thư viện lọc → mở paper → promote → Học tập → quiz → QA log → Settings đổi theme.
- [ ] **Step 5: Commit** `feat(redesign): đợt 7 — polish, responsive, a11y; hoàn tất redesign`

## Self-Review (đã chạy)

1. **Spec coverage:** §2 tokens/typography/motion → Task 1; §3.1 nav+routes → Task 2+5; §3.2 → Task 3; §3.3 → Task 4; §3.4 → Task 5; §3.5 → Task 2; §3.6 → Task 6; §4.1–4.3 → Task 1; §5–6 → mỗi task Verify + Task 7. Không gap.
2. **Placeholder scan:** không còn TBD/`tương tự task N`; các bước CSS đều có giá trị token/hiệu ứng cụ thể.
3. **Type consistency:** `LibraryFilters`/`ResIcon` export/`window.__setTheme`/tên localStorage key nhất quán giữa các task.
