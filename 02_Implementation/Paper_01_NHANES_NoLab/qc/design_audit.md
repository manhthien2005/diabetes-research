# Design Audit — Paper_01_NHANES_NoLab (pipeline.py)
Auditor: design-study v1 (medsci-skills d7df514) + paper-analyzer v2
Ngày audit: 2026-09-21
File được audit: `02_Implementation/Paper_01_NHANES_NoLab/src/pipeline.py`

---

## Kết quả audit (design-study probes)

### Q1: Research question
Dự đoán "tiểu đường chưa được chẩn đoán" (undiagnosed T2D) từ các biểu hiện lâm sàng thông thường
(không xét nghiệm lab HbA1c/FPG) trên NHANES → bằng ML (LogReg, LGBM).

### Q2: Analysis unit
Người tham gia NHANES (SEQN): 1 người = 1 hàng. (OK — không có vấn đề lesion/exam/clustered patient)

### Q3: Index date
Ngày tham gia khám NHANES tương ứng (cross-sectional) — không có follow-up.
`prediction_horizon`: `early_detection` (phát hiện người chưa được chẩn đoán trong cộng đồng).

### Q4: Inclusion/exclusion criteria
Chi tiết trong `build_nhanes.py`. Nhãn là `y_undiagnosed_dm`.

### Q5: Information leakage — KẾT QUẢ AUDIT (CP1–CP6)

| Probe | Kết quả | Bằng chứng trong code |
|-------|---------|----------------------|
| CP1 — Nested CV | **PASS** — Có nested CV thực sự (outer=5 fold đánh giá, inner=3 fold tuning), không đảo. | `pipeline.py` L266–311 |
| CP2 — Feature selection trong fold | **PASS** — `SelectKBest` là BƯỚC trong sklearn Pipeline → fit chỉ trên train fold | L230, L237, L247 |
| CP3 — Oversampling trong fold | **PASS** — Không có oversampling trong cấu hình chuẩn A | L42–45 comment, không có SMOTE |
| CP4 — Calibration | **PARTIAL** — Cấu hình chuẩn báo AUC-ROC. Calibration curve/plot chưa thấy trong file này → cần kiểm tra step tiếp theo (C3 trong TO_DO) | Cần kiểm tra output |
| CP5 — External validation | **CHƯA CÓ** — Chỉ có nested CV trên NHANES. External/temporal validation chưa thấy trong pipeline.py | → Vấn đề design cấp cao, cần xử lý |
| CP6 — Biến định nghĩa nhãn | **PASS** — Chốt chặn `_assert_no_leak()` chạy mọi lần load, `LABEL_DEFINING` đã khai báo. Ablation F có chủ ý. | L76, L186–199 |

| Probe | Kết quả |
|-------|---------|
| O11 — NHANES survey weights | **PASS** — Weight `WTMEC2YR` được dùng khi tính metric (w kèm quan trọng), KHÔNG dùng khi train (bất biến 4, L39–40) |

### Q6: Reference standard
Nhãn `y_undiagnosed_dm` xây dựng từ HbA1c/FPG theo ngưỡng ADA (build_nhanes.py) — biomarker dùng
định nghĩa nhãn KHÔNG CÓ TRONG FEATURE LIST = leakage-safe hoạt động đúng.

### Q7: Comparator
Các giao thức ablation B–G (từng vi phạm rò rỉ) để minh hoạ mức độ thổi phồng — thiết kế tốt.
Comparator lâm sàng: FINDRISC / ADA score — cần kiểm tra trong TO_DO.

### Q8: Validation strategy
Nested 5-outer × 3-inner CV × 10 seed → ước tính OOF ổn định. Thiếu external/temporal validation.

### Q9: Uncertainty reporting
Multi-seed → báo cáo mean ± std theo seed. OK cho discrimination; calibration CI chưa rõ.

### Q10: Reporting guideline fit
TRIPOD+AI (clinical prediction model, AI/ML, EHR). Cần chạy `check-reporting` trước khi nộp.

### Q11: Variable definitions literature-grounded?
**PASS** — Ngưỡng ADA (HbA1c ≥ 6.5% hoặc FPG ≥ 126 mg/dL) là tiêu chuẩn y tế, không phải ad-hoc.

---

## Tóm tắt kết quả

| Hạng mục | Trạng thái | Ghi chú |
|----------|-----------|---------|
| Nested CV | ✅ PASS | Cấu trúc đúng |
| Selection trong fold | ✅ PASS | sklearn Pipeline đảm bảo |
| Không có label-defining leak | ✅ PASS | `_assert_no_leak()` runtime check |
| NHANES survey weights | ✅ PASS | Chỉ dùng khi tính metric |
| Calibration reporting | ⚠️ PARTIAL | Cần thêm calibration plot |
| External validation | ❌ CHƯA CÓ | Gap lớn — cần thêm temporal validation nếu có data |
| Comparator lâm sàng | ❓ CHƯA RÕ | FINDRISC/ADA score? |

---

## Ưu tiên cần làm

1. **Thêm calibration output** (C3 trong TO_DO) — Brier score + calibration plot
2. **Temporal validation** hoặc sub-cohort validation để mạnh ngoài NHANES
3. **Kiểm tra FINDRISC/ADA baseline** có trong pipeline không

---
*File này là QC output — KHÔNG phải nguồn chân lý. Xem `pipeline.py` + `TO_DO.md` để quyết định.*
