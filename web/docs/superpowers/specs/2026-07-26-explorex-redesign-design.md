# ExploreX Redesign — Design Spec

**Ngày:** 2026-07-26
**Trạng thái:** Đã duyệt hướng thiết kế qua 3 phần (ngôn ngữ thiết kế, cấu trúc, kỹ thuật) — chờ user review bản spec này
**Phạm vi:** Toàn bộ giao diện webapp `webapp/` (Next.js 15, React 19). Chỉ đụng lớp giao diện — giữ nguyên 100% API routes, logic dữ liệu, tính năng.

---

## 1. Bối cảnh & mục tiêu

ExploreX là research hub cá nhân phục vụ đề tài NCKH dự đoán đái tháo đường: quản lý ~40 papers theo 4 layer, đọc phân tích, đọc PDF song ngữ có highlight, học kiến thức nền, xem lại Q&A định hướng.

**Hiện trạng:** dark-only, Inter 14px, CSS thuần 5.735 dòng trong 1 file `globals.css`, sidebar trái 224px. Hoạt động ổn nhưng nhìn generic, chữ nhỏ đọc lâu mỏi, bảng dày đặc khó quét, cấu trúc 6 trang chưa tối ưu.

**Mục tiêu redesign (đã chốt với user):**
1. Nâng thẩm mỹ lên chuẩn soft-premium ("dịu sang, cao cấp")
2. Cải thiện trải nghiệm đọc dài & quét thông tin
3. Tái cấu trúc trang: gom 2 trang Kiến thức, nâng cấp Thư viện, cấu trúc tổng thể mới
4. Light mode ấm làm mặc định + dark mode dịu, có toggle
5. Chất lượng đồng đều mọi trang — không trang nào được phép xấu

**Không nằm trong phạm vi:** thay đổi API, schema dữ liệu, logic promote/reject, thuật toán quiz, cơ chế highlight PDF; không thêm framework CSS (đã chốt phương án A — re-skin trên CSS thuần).

---

## 2. Ngôn ngữ thiết kế (Design Language)

**Khí chất:** "Thư phòng nghiên cứu cao cấp" — giấy ấm, serif có hồn, bóng mềm như sương, chuyển động nhẹ như lật trang.

### 2.1 Màu

**Light mode (mặc định) — "Trang giấy ấm":**

| Token | Giá trị | Vai trò |
|---|---|---|
| `--bg` | `#FAF7F2` | Nền kem giấy ấm |
| `--surface` | `#FFFDFA` | Card trắng ngà |
| `--surface-2` | `#F4EFE7` | Lớp chìm (hover, code block) |
| `--text` | `#2A2520` | Nâu mực (không đen tuyệt đối) |
| `--text-dim` | `#6E655A` | Chữ phụ |
| `--text-faint` | `#9A8F80` | Chữ mờ (caption, meta) |
| `--border` | `#E8E1D6` | Viền ấm, dùng tiết chế |
| `--accent` | `#0F766E` | Xanh ngọc trầm (deep teal) — link, nút chính, trạng thái active |
| `--green` (strong) | `#4C8C5C` | Xanh sage |
| `--red` (weak) | `#C4593F` | Đất nung |
| `--amber` (maybe) | `#B98A2F` | Hổ phách |

**Dark mode — "Đêm ấm":** than ấm thay xanh lạnh hiện tại.

| Token | Giá trị |
|---|---|
| `--bg` | `#191714` |
| `--surface` | `#201D19` |
| `--surface-2` | `#282420` |
| `--text` | `#E8E2D9` |
| `--text-dim` | `#A69B8C` |
| `--border` | `#332E28` |
| `--accent` | teal nâng sáng `#2FA79A` |
| Semantic | cùng hue với light, nâng sáng + desaturate để dịu mắt |

Cả 2 theme cùng một khí chất; mỗi màu chữ/nền phải đạt tương phản WCAG AA (≥4.5:1 cho body text).

### 2.2 Typography (tất cả font đều có subset `vietnamese`)

| Vai trò | Font | Ghi chú |
|---|---|---|
| Tiêu đề, display | **Fraunces** | Serif ấm có cá tính; weight 400–600, dùng optical sizing |
| UI & nội dung ngắn | **Be Vietnam Pro** | Sans thiết kế cho tiếng Việt; 400/500/600 |
| Đọc dài (phân tích paper, bài kiến thức) | **Literata** | Serif tối ưu đọc màn hình; 17–18px, line-height 1.7 |
| Số liệu, code, metric | **JetBrains Mono** | Tabular numbers cho cột cite/năm thẳng hàng |

- Cỡ UI cơ bản: 15px (nâng từ 14px). Thang chữ: 13 / 15 / 17 / 20 / 25 / 31 / 39.
- Cột đọc giới hạn ~70 ký tự (`max-width: 70ch`).

### 2.3 Hình khối, bóng, chuyển động

- Bo góc: 12 / 16 / 20px. Padding hào phóng (card ≥ 20px).
- Bóng đổ nhiều lớp màu ấm thay viền cứng, ví dụ light: `0 1px 2px rgba(80,60,30,.05), 0 4px 16px rgba(80,60,30,.07)`; hover: bóng nở + nâng `translateY(-2px)`.
- Motion: ease spring `cubic-bezier(0.22, 1, 0.36, 1)`, 200–300ms; chuyển trang fade nhẹ; `prefers-reduced-motion` → tắt toàn bộ transform/animation.
- Icon: giữ react-icons (Material) nhưng dùng nhất quán cỡ + màu; không dùng emoji làm icon chức năng.
- Verdict 🟢🟡🔴 → badge chữ có nền mờ: `Strong` (sage) / `Maybe` (hổ phách) / `Weak` (đất nung).

---

## 3. Cấu trúc & điều hướng

### 3.1 Sidebar: 6 mục → 5 mục

| Mục | Route | Nội dung |
|---|---|---|
| Tổng quan | `/` | Nâng cấp từ `/tien-do`: bước tiếp theo, vòng tiến độ layer, deadline, thống kê nhanh |
| Thư viện | `/thu-vien` | Chuyển từ `/` cũ, nâng cấp mạnh (xem §3.2) |
| Học tập | `/hoc-tap` | Gom `/kien-thuc` + `/kien-thuc-nckh` |
| Hỏi–Đáp | `/qa-log` | Restyle timeline đối thoại |
| Cài đặt | `/settings` | Thêm chọn theme |

- Route cũ (`/tien-do`, `/kien-thuc`, `/kien-thuc-nckh`) redirect sang route mới — không gãy bookmark.
- Sidebar: vẫn trái + thu gọn được; thêm **toggle sáng/tối ở đáy**; brand "ExploreX" dùng Fraunces; mini tiến độ layer (L1 3/7…) giữ lại, restyle.

### 3.2 Thư viện (`/thu-vien`)

- **Toolbar:** ô tìm kiếm theo tiêu đề; lọc theo layer / verdict / năm / có-code / có-PDF; sắp xếp theo cite, năm, tên.
- **2 chế độ xem** (toggle, nhớ lựa chọn qua `localStorage` key `explorex.libraryView`):
  - *Bảng*: mật độ cao như hiện tại, tinh chỉnh — hàng hover nâng nhẹ, verdict badge mới, cite/năm mono.
  - *Card*: lưới card quét nhanh bằng mắt — tiêu đề serif, venue + năm + verdict + tài nguyên.
- Nhóm theo layer giữ nguyên (header L1–L4 sticky).

### 3.3 Chi tiết paper (`/paper/...`)

- Bố cục "đọc là chính": cột đọc trung tâm ~70ch dùng Literata; metadata + hành động (promote/reject, PDF, code, notes) dồn vào **panel phải sticky**.
- PDF song ngữ + highlight: giữ nguyên 100% chức năng, chỉ thay chrome (toolbar, nền, nút).

### 3.4 Học tập (`/hoc-tap`)

- Trang bìa: 2 card "khoá học" (Kiến thức ĐTĐ / Phương pháp NCKH) + tiến độ đọc từng khoá.
- Trong từng khoá: giữ cấu trúc chương + quiz hiện có; typography đọc dài mới (Literata); TOC bên phải.

### 3.5 Tổng quan (`/`)

- Hero: "Bước tiếp theo" lấy từ logic Tiến độ hiện tại — mở app thấy ngay việc cần làm.
- Thanh tiến độ ngang theo từng layer (L1–L4); số liệu nhanh (tổng paper, đã chọn, đã phân tích, có code); deadline.

### 3.6 Hỏi–Đáp (`/qa-log`)

- Timeline đối thoại: câu hỏi và trả lời phân vai rõ, ngày tháng nổi, dễ đọc lại theo trình tự.

---

## 4. Kiến trúc kỹ thuật

### 4.1 Tổ chức CSS

```
webapp/src/styles/
  tokens.css      ← 2 theme qua [data-theme="light" | "dark"]
  base.css        ← reset, typography nền, scrollbar, selection, focus ring
  components/
    sidebar.css, overview.css, library.css, paper.css,
    learn.css, qa.css, settings.css, shared.css
```

`globals.css` chỉ còn import các file trên. Không thêm dependency CSS mới.

### 4.2 Theme switching

- `data-theme` đặt trên `<html>`; lưu vào `localStorage` (`explorex.theme`); mặc định lần đầu theo `prefers-color-scheme`.
- Script inline nhỏ trong `<head>` (trước hydration) đọc localStorage và set `data-theme` ngay → không nháy màu sai (FOUC).
- Toggle ở đáy sidebar + trong Cài đặt (3 lựa chọn: Sáng / Tối / Theo hệ thống).

### 4.3 Fonts

- `next/font/google`: Fraunces, Be Vietnam Pro, Literata, JetBrains Mono — khai báo subset `vietnamese` + `latin`; expose qua CSS variables (`--font-display`, `--font-ui`, `--font-reading`, `--font-mono`).
- Next tự host font — không phụ thuộc CDN, không giật layout (`display: swap` + size-adjust tự động).

### 4.4 Component ảnh hưởng

- `layout.tsx`: thêm fonts, script theme, cấu trúc shell.
- `Sidebar.tsx`: nav 5 mục mới + theme toggle.
- `LibraryView.tsx` / `PaperCard.tsx`: toolbar lọc, 2 chế độ xem.
- `VerdictBadge.tsx`: badge chữ thay emoji.
- Các trang route mới/redirect: `/thu-vien`, `/hoc-tap`, redirect cũ.
- Còn lại: đổi class/markup nhẹ, logic giữ nguyên.

---

## 5. Lộ trình 7 đợt

Mỗi đợt kết thúc ở trạng thái chạy được, kiểm tra trên browser cả 2 theme trước khi sang đợt sau:

1. **Nền móng:** tokens + base + fonts + khung sidebar mới + theme toggle (FOUC-free)
2. **Tổng quan** (trang chủ mới) + redirect `/tien-do`
3. **Thư viện:** route mới, toolbar lọc, 2 chế độ xem
4. **Chi tiết paper:** bố cục đọc-là-chính, panel phải sticky
5. **Học tập:** gộp 2 trang, trang bìa khoá học, TOC
6. **Hỏi–Đáp + Cài đặt**
7. **Tổng duyệt:** motion, empty states, responsive (375/768/1024/1440), tương phản WCAG AA, `prefers-reduced-motion`, focus ring bàn phím

## 6. Tiêu chí kiểm chứng

- `npm run build` sạch sau mỗi đợt.
- Mọi tính năng hiện có hoạt động như cũ: lọc/đọc/promote/reject, PDF highlight, đọc song ngữ, quiz, lưu notes, API không đổi.
- Cả light + dark đạt tương phản AA; không nháy theme khi tải lại trang.
- Route cũ redirect đúng; trạng thái sidebar/theme/chế độ xem được nhớ qua reload.
