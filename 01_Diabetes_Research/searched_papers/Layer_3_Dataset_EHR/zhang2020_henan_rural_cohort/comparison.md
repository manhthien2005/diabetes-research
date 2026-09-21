# So sánh: zhang2020_henan_rural_cohort (Layer 3)

**Horizon:** `cross_sectional` — **KHÁC horizon với baseline dinh2019** (`early_detection`) → so cách tiếp cận, KHÔNG so con số AUC trực tiếp. CÙNG horizon với agliata2023 (`cross_sectional`) nhưng **khác dataset** (Henan Rural Cohort vs NHANES+MIMIC) → không so số thẳng.

## Bảng đối chiếu

| Trục | zhang2020 (target) | dinh2019 (baseline, khác horizon) | agliata2023 (cùng horizon) |
|------|--------------------|-----------------------------------|-----------------------------|
| Horizon | cross_sectional (không follow-up) | early_detection (nhãn ~đồng thời) | cross_sectional |
| Dataset | Henan Rural Cohort 36.652 (nông thôn TQ) | NHANES ~21k | NHANES+MIMIC-III/IV hợp nhất 13.687 |
| Method | GBM thắng; 6 model; SMOTE; SHAP | XGBoost + Weighted Ensemble; downsampling; info-gain | ANN nông + ensemble 99 model; under-sampling |
| Best metric | AUC 0.872 lab (Table 4); no-lab 0.817; RF Acc 85.90% | AUC 0.957 lab (Table 5) | AUC 0.934 (Table/Fig 3); Acc ~86%; Brier 0.101 |
| XAI | **SHAP global** + yếu tố nguy cơ mới (urine, sweet flavor) | Không (info-gain) | Không |
| Cân bằng | **SMOTE** (sinh mẫu) | downsampling (vứt mẫu) | under-sampling (vứt mẫu) |
| Code | Không | Không | Không |

## Trùng lặp
- Cùng Layer 3 + cùng horizon `cross_sectional` với agliata2023 → cặp trùng hướng trong nhánh cross-sectional. Đều EHR/cohort thật lớn, đều không follow-up, đều không public code.
- Cùng dùng GBM/boosting họ XGBoost với baseline (nhưng baseline khác horizon).

## Khác biệt / Vượt trội
- **Cohort cộng đồng NÔNG THÔN châu Á (Henan, 36.652)** — quần thể chưa có trong kho (khác hẳn NHANES Mỹ, UK Biobank, EHR clinic Hàn/Canada); lớn hơn xa PIMA ~768.
- **SHAP global + phát hiện yếu tố nguy cơ mới** (chỉ số nước tiểu, sweet flavor) không có trong risk-score truyền thống — bridge sang Layer 4, baseline (chỉ info-gain) và agliata (không XAI) đều thiếu.
- **Dùng SMOTE** (sinh mẫu thiểu số) thay vì downsampling/undersampling vứt mẫu của baseline và agliata — đúng hướng xử lý imbalance hơn.
- Vượt New Chinese Diabetes Risk Score (no-lab 0.817 vs 0.728, p<0.05, Suppl Fig 1) — neo vào risk-score lâm sàng.

## Gap còn lại
- **Cross-sectional, không follow-up & không external validation** (tác giả tự nêu) → không suy onset/nhân-quả; cùng giới hạn thiết kế như nhánh cross-sectional đã đông.
- Leakage: nhãn định nghĩa một phần bằng FPG≥7.0 nhưng urine glucose (hệ quả tăng đường huyết) lại là feature #1 → AUC lab dễ thổi phồng (giống gap baseline).
- Thứ tự SMOTE vs tách CV không nêu rõ → rủi ro rò rỉ; PPV ≤28.83% thấp ở prevalence ~9% → giá trị mass-screening hạn chế; SHAP chỉ global.

## Verdict
**promote** — Bổ sung quần thể nông thôn châu Á còn thiếu + SHAP + SMOTE (3 điểm bổ trợ baseline), là bài cross_sectional EHR thật mạnh nhất; nên promote, nhưng ưu tiên sau các bài lấp horizon còn-trống (early_detection/long_term_risk) vì cross_sectional đã là nhánh đông.
