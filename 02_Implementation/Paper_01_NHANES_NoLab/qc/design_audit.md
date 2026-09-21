# Design Audit — Paper_01_NHANES_NoLab (pipeline.py)
Auditor: design-study v1 (medsci-skills d7df514) + paper-analyzer v2
Audited: 2026-09-21
File: 02_Implementation/Paper_01_NHANES_NoLab/src/pipeline.py

---

## Ket qua audit (design-study probes)

### Q1: Research question
Du doan "tieu duong chua duoc chan doan" (undiagnosed T2D) tu cac bieu hien lam sang thong thuong
(khong xet nghiem lab HbA1c/FPG) tren NHANES → bang ML (LogReg, LGBM).

### Q2: Analysis unit
Nguoi tham gia NHANES (SEQN): 1 nguoi = 1 hang. (OK — khong co van de lesion/exam/clustered patient)

### Q3: Index date
Ngay tham gia kham NHANES tuong ung (cross-sectional) — khong co follow-up.
`prediction_horizon`: cross_sectional hoac early_detection (chan doan chan doan truoc: undiagnosed).

### Q4: Inclusion/exclusion criteria
Chi tiet trong build_nhanes.py (khong doc trong pham vi file nay). Nhãn la `y_undiagnosed_dm`.

### Q5: Information leakage — KET QUA AUDIT (CP1-CP6)

| Probe | Ket qua | Bang chung trong code |
|-------|---------|----------------------|
| CP1 — Nested CV | PASS — Co nested CV thuc su (outer=5 fold danh gia, inner=3 fold tuning), khong dao. Line 266-311 | pipeline.py L266-311 |
| CP2 — Feature selection trong fold | PASS — SelectKBest la BUOC trong sklearn Pipeline → fit chi tren train fold | L230, L237, L247 |
| CP3 — Oversampling trong fold | PASS — Khong co oversampling trong cau hinh chuan A | L42-45 comment, khong co SMOTE |
| CP4 — Calibration | PARTIAL — Cau hinh chuan bao AUC-ROC (line ~380). Calibration curve/plot chua thay trong file nay → can kiem tra step tiep theo (C3 trong TO_DO) | Can kiem tra output |
| CP5 — External validation | KHONG THAY — Chi co nested CV tren NHANES. External/temporal validation chua thay trong pipeline.py | → Van de design cap cao, can xu ly |
| CP6 — Bien dinh nghia nhan | PASS — Cong chot _assert_no_leak() chay moi lan load, LABEL_DEFINING da khai bao. Ablation F co chu y | L76, L186-199 |

| Probe | Ket qua |
|-------|---------|
| O11 — NHANES survey weights | PASS — Weight WTMEC2YR duoc dung khi tinh metric (w kem quan trong), KHONG dung khi train (bat bien 4, L39-40) |

### Q6: Reference standard
Nhan `y_undiagnosed_dm` xay dung tu HbA1c/FPG theo nguong ADA (build_nhanes.py) — BIO-MARKER DUNG
DINH NGHIA NHAN KHONG CO TRONG FEATURE LIST = leakage-safe hoat dong dung.

### Q7: Comparator
Cac giao thuc ablation B-G (tung vi pham ro ri) de minh hoa muc do thoi phong — thiet ke tot.
Comparator lam sang: FINDRISC / ADA score (chua thay trong pipeline.py → can kiem tra TO_DO).

### Q8: Validation strategy
Nested 5-outer x 3-inner CV x 10 seed → stable OOF estimates. Thieu external/temporal validation.

### Q9: Uncertainty reporting
Multi-seed → bao cao mean ± std theo seed. OK cho discrimination; calibration CI chua ro.

### Q10: Reporting guideline fit
TRIPOD+AI (clinical prediction model, AI/ML, EHR). Can check-reporting truoc khi nop.

### Q11: Variable definitions literature-grounded?
PASS — Nguong ADA (HbA1c >= 6.5% hoac FPG >= 126 mg/dL) la tieu chuan y te, khong phai ad-hoc.

---

## Tom tat ket qua

| Hang muc | Trang thai | Ghi chu |
|----------|-----------|---------|
| Nested CV | PASS | Cau truc dung |
| Selection trong fold | PASS | sklearn Pipeline dam bao |
| No label-defining leak | PASS | _assert_no_leak() runtime check |
| NHANES survey weights | PASS | Chi dung khi tinh metric |
| Calibration reporting | PARTIAL | Can them calibration plot |
| External validation | CHUA CO | Gap lon — can them temporal validation neu co data |
| Comparator lam sang | CHUA RO | FINDRISC/ADA score? |

---

## Uu tien can lam

1. **Them calibration output** (C3 trong TO_DO) — Brier score + calibration plot
2. **Temporal validation** hoac sub-cohort validation de mach ngoai NHANES
3. **Kiem tra FINDRISC/ADA baseline** co trong pipeline khong

---
*File nay la QC output — KHONG phai nguon chan ly. Xem pipeline.py + TO_DO.md de quyet dinh.*
