# So sánh trong Layer 2 — khanam2021_comparison_ml_pima

> Baseline đã chọn của layer: **hasan2020_diabetes_prediction_ensembling** (cross_sectional, PIMA, ensemble AB+XB).
> Paper này: **khanam2021_comparison_ml_pima** — `prediction_horizon = cross_sectional`.
> **CÙNG horizon + CÙNG dataset (PIMA) với baseline → so metric trực tiếp HỢP LỆ** (lưu ý khác metric: baseline báo AUC, khanam báo Accuracy). Cùng horizon với wang2020 (nhưng khác dataset → so cách tiếp cận, không so thẳng số).

## Bảng đối chiếu

| Trục | hasan2020 (baseline) | khanam2021 (paper này) | wang2020 (cùng horizon) |
|------|----------------------|------------------------|--------------------------|
| Horizon | cross_sectional | cross_sectional | cross_sectional |
| Dataset | **PIMA 768** | **PIMA 768 → 699 sau IQR** | Beijing survey n=368 |
| Method | Ensemble AB+XB, AUC-weighted voting, grid search | **So sánh 7 ML cổ điển + 3 biến thể NN**, Pearson FS (5 feature) | XGBoost vs SVM/RF/KNN, 10-fold CV |
| Best metric | **AUC 0.950** (5-fold stratified) — Table 7-9 | **NN 2HL @400 epoch: Acc 88.6%** (Bảng 8); best ML: KNN & AdaBoost 79.42% (Bảng 6) | AUC 0.9182 ± 0.0130 (10-fold) — Bảng 6 |
| Xử lý imbalance | Không | **Không** | Không |
| Ổn định con số đỉnh | mean±std báo rõ | **K-fold chỉ ~76% → đỉnh 88.6% không ổn định** | mean±95%CI (10-fold lặp 10) |
| Code | Có (GitHub, 18⭐) | **Không** | Không |
| Citations | 433 (05/2026) | 378 (2026-06) | 138 (2026-06) |
| Reproducible | high | medium | medium |

## Trùng lặp
- **Với baseline hasan2020:** TRÙNG MẠNH — cùng horizon cross_sectional, **cùng dataset PIMA**, cùng họ phương pháp (so sánh model ML/NN trên cùng benchmark). hasan2020 đã bao trùm và làm tốt hơn: ensemble có chiến lược + AUC + CV chuẩn + code public. khanam2021 chỉ dừng ở bảng so sánh các single model, không ensemble.
- **Với wang2020 (cùng horizon):** Cùng tinh thần "so sánh classifier trên dữ liệu cross-sectional", nhưng khác dataset (PIMA vs khảo sát Bắc Kinh) → không so thẳng số. wang2020 báo cáo ổn định hơn (mean±95%CI), khanam2021 con số đỉnh kém ổn định.

## Khác biệt / Vượt trội
- Giá trị riêng duy nhất: **bảng so sánh có hệ thống 7 ML cổ điển + 3 biến thể NN trên PIMA** — dùng làm reference/biểu tham chiếu khi muốn xem ranking các single model.
- Nhưng KHÔNG vượt baseline ở bất kỳ trục cốt lõi nào: NN 88.6% là con số đơn lẻ (K-fold thực ~76%), thấp hơn và kém tin cậy hơn AUC 0.950 mean±std của hasan2020; không ensemble; không AUC; không code.

## Gap còn lại
- **Leakage nhẹ (~1-2%):** imputation + feature selection fit trên TOÀN dataset trước khi split → con số đỉnh bị thổi.
- Không xử lý imbalance; không báo AUC (chỉ accuracy — kém phù hợp data mất cân bằng); không seed → khó tái lập đúng; **không có code public**.

## Verdict
**reject** — Trùng horizon + trùng dataset PIMA với baseline hasan2020 nhưng yếu hơn ở mọi trục (single model thay ensemble, accuracy thay AUC, con số đỉnh không ổn định, leakage nhẹ, không code); chỉ còn giá trị tham chiếu bảng so model, không đủ để promote.
