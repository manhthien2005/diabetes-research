# 📥 Bài cần tải tay (closed access)

> Cập nhật: **2026-07-05 — CÓ 1 BÀI ĐANG CHỜ TẢI TAY.**

## ⏳ Đang chờ tải tay (2026-07-01)

| paper_id | Layer | DOI | Link tải | Lý do |
|----------|-------|-----|----------|-------|
| `islam2019_early_stage_diabetes` | L2 | 10.1007/978-981-13-8798-2_12 | https://link.springer.com/chapter/10.1007/978-981-13-8798-2_12 | Springer closed access; Unpaywall không có OA; ResearchGate author manuscript bị chặn 403 khi tải tự động. |

Sau khi tải, lưu thành đúng `source.pdf` trong folder tương ứng, rồi cập nhật metadata: `source_pdf`, `page_count`, `pdf_status:"downloaded"`.

## ✅ Đã tải & verify (2026-07-05)

| paper_id | Layer | Trang | DOI (khớp PDF↔metadata) | Trạng thái |
|----------|-------|-------|-------------------------|------------|
| `alghamdi2017_smote_fit_project` | L1 | 15 | 10.1371/journal.pone.0179805 | ✅ downloaded & local text verified |

## ✅ Đã tải & verify (2026-06-21)

Cả 5 bài closed access đã được tải tay qua quyền truy cập trường (SIU), lưu đúng folder,
và **đã verify**: DOI nhúng trong PDF khớp metadata, đúng title, đúng layer, có text layer dày.

| paper_id | Layer | Trang | DOI (khớp PDF↔metadata) | Trạng thái |
|----------|-------|-------|-------------------------|------------|
| `olisah2022_preprocessing_ml_perspective` | L1 | 13 | 10.1016/j.cmpb.2022.106773 | ✅ downloaded |
| `nguyen2019_wide_deep_onset` | L3 | 10 | 10.1016/j.cmpb.2019.105055 | ✅ downloaded |
| `yang2021_bigdata_physical_exam_fusion` | L2 | 11 | 10.1016/j.inffus.2021.02.015 | ✅ downloaded |
| `lu2021_patient_network_t2dm` | L2 | 13 | 10.1007/s10489-021-02533-w | ✅ downloaded |
| `xu2025_label_noise_local_explanation` | L4 | 19 | 10.1016/j.inffus.2025.102928 | ✅ downloaded |

`metadata.json` mỗi bài đã đồng bộ: `pdf_status = downloaded`, `source_pdf = source.pdf`,
`page_count` thật, `analysis_status = none` (chưa phân tích sâu).

## ▶️ Bước tiếp theo

Cả 5 sẵn sàng cho pipeline: `pdf-extract` → `paper-analyzer` (sinh `analysis.html` + `summary.json`)
→ `paper-comparator` → cập nhật `RESEARCH_BRIEF.md` + `DECISION_BOARD.md` để anh duyệt promote.

## Ghi chú

- `jin2025_opportunistic_screening_type` đã **loại (rejected)** từ trước (0 citation, code null,
  dataset MGB private) — không nằm trong danh sách này, đã có PDF sẵn trong folder.
