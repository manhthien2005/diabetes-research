# NCKH Research Hub

GUI cục bộ (Next.js) đứng **trên** kho nghiên cứu file-based ở `D:\NCKH`.
Filesystem (`searched_papers/`, `chosed_papers/`) là **nguồn chân lý** — web chỉ
đọc/ghi vào đó để các agent CLI (`paper-finder`, `paper-analyzer`...) dùng chung.

## Chạy

```bash
cd webapp
npm install        # lần đầu
npm run dev        # → http://localhost:3000
```

Build production:

```bash
npm run build && npm start
```

## 4 trang

| Trang | Chức năng |
|-------|-----------|
| **Thư viện** (`/`) | Paper theo 4 Layer (đọc `searched_papers/`). Mở paper → PDF (tô highlight), Ghi chú, Phân tích (`analysis.html`), Code/Dataset. |
| **Tìm bài báo** (`/search`) | Meta-search đa nguồn. Source Health (nguồn nào connect được), đếm số lượng/nguồn, gộp trùng, **staging → bấm Lưu** vào Layer. |
| **Chất lượng nguồn** (`/sources`) | Bảng xếp hạng nguồn theo paper đã lưu · save-rate · citations TB · độ tin cậy → biết nguồn nào đáng ưu tiên. |
| **Cài đặt** (`/settings`) | Trạng thái API key (`.env`, masked) · test/bật/tắt nguồn · ngưỡng citations. |

## Lưu trữ

- **Paper, metadata, analysis, PDF** → filesystem (`searched_papers/Layer_X/<id>/`).
- **Ghi chú** user → `notes.md` trong folder paper.
- **Highlight PDF** user → `highlights.json` trong folder paper (overlay, không sửa `source.pdf`).
- **Thống kê nguồn search + settings** → `webapp/data/hub.db` (SQLite). Đây là thứ DUY NHẤT web tự giữ.

## Nguồn search (kiến trúc plug-in)

Thêm nguồn = thêm 1 file `src/lib/search/connectors/<id>.ts` + 1 dòng trong
`src/lib/search/registry.ts`. Mỗi connector implement `testConnection()` + `search()`.

| Nguồn | Key (.env) | Trạng thái |
|-------|-----------|-----------|
| arXiv | — | ✅ verified |
| OpenAlex | `RESEARCH_EMAIL` (polite) | ✅ verified |
| Crossref | `RESEARCH_EMAIL` (polite) | ✅ verified |
| Semantic Scholar | `SEMANTIC_SCHOLAR_API_KEY` | ✅ chạy (429 nếu không key) |
| PubMed | `PUBMED_API_KEY` | ⚠️ chưa smoke-test (NCBI chặn IP sandbox) — chạy local + key sẽ OK |
| CORE | `CORE_API_KEY` | ⚠️ chưa smoke-test (key đang rỗng) |
| Springer | `SPRINGER_API_KEY` | ⚠️ chưa smoke-test (key đang rỗng) |

> **Papers with Code** đã bị loại: API ngừng hoạt động (paperswithcode.com redirect
> sang Hugging Face). Mảng code↔dataset hiện lấy từ metadata; có thể bổ sung nguồn khác sau.

## Bảo mật

API key chỉ đọc **server-side** từ `D:\NCKH\.env`; client không bao giờ nhận
value thật (chỉ thấy có/không + masked). Mọi call nguồn đi qua Next.js route.
