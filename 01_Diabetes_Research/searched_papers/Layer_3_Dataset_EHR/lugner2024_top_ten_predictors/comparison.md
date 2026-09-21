# So sánh: lugner2024_top_ten_predictors (Layer 3)

**Horizon:** `long_term_risk` — **KHÁC horizon với baseline dinh2019** (`early_detection`) → so cách tiếp cận, KHÔNG so con số AUC trực tiếp. CÙNG horizon với fazakis2021 nhưng **khác dataset** (UK Biobank vs ELSA) → không so số thẳng, chỉ đối chiếu thiết kế.

## Bảng đối chiếu

| Trục | lugner2024 (target) | dinh2019 (baseline, khác horizon) | fazakis2021 (cùng horizon) |
|------|---------------------|-----------------------------------|-----------------------------|
| Horizon | long_term_risk (incidence 10 năm prospective) | early_detection (nhãn ~đồng thời) | long_term_risk (onset 2 năm) |
| Dataset | UK Biobank 448.277, 419 biến baseline | NHANES ~21k | ELSA ~2.009 |
| Method | XGBoost (419 feat + reduced top-10); sex-specific; bootstrap 1000 CI | XGBoost + Weighted Ensemble (AUC²) | WeightedVotingLRRFs + NSGA-II |
| Cân bằng | downsampling 1:3 | downsampling | random undersampling |
| Best metric | AUC 0.903 main (Table 3); top-10 0.881; Acc 0.92; Sens 0.62; PR-AUC 0.29 | AUC 0.957 lab (Table 5) | AUC 0.884 inductive (Table 5) |
| XAI | **SHAP global** (top-10 predictor) | Không (info-gain) | Không |
| Code | Không | Không | Không |

## Trùng lặp
- Cùng Layer 3 + cùng horizon `long_term_risk` với fazakis2021 → cặp trùng hướng chính. Đều dùng cohort dọc dự báo onset tương lai, đều không public code, đều dùng downsampling/undersampling.
- Cùng XGBoost với baseline dinh2019 (nhưng baseline khác horizon).

## Khác biệt / Vượt trội
- **Quy mô khổng lồ 448.277 mẫu** (~20 lần NHANES baseline, ~220 lần ELSA của fazakis) — dataset thật lớn nhất trong nhánh, giảm dao động seed mà fazakis mắc.
- **Incidence 10 năm prospective** — cửa sổ dài nhất trong kho, lấp đúng `long_term_risk` đang trống; thiết kế chống leakage tốt hơn nhiều baseline cross-sectional.
- **SHAP global + chứng minh top-10 yếu tố dễ đo giữ gần trọn độ chính xác** (0.881 vs 0.903) — bridge sang Layer 4 (XAI), thứ baseline (chỉ info-gain) và fazakis (không XAI) đều thiếu.
- Sex-specific models + bootstrap 1000 lần CI — đánh giá bất định chặt.

## Gap còn lại
- **Imbalance xử lý yếu**: downsampling 1:3 vứt mẫu, không SMOTE/calibration → Sensitivity 0.62 & PR-AUC 0.29 thấp ở prevalence ~2.7% → AUC 0.903 cao gây ảo giác (đây là điểm cải tiến rõ).
- Healthy-volunteer bias + chủ yếu da trắng → generalizability hạn chế; HbA1c/glucose gần ngưỡng chẩn đoán.
- Chỉ global SHAP, chưa local; không code public; không external validation ngoài UK Biobank.

## Verdict
**promote** — Ứng viên neo CHÍNH cho `long_term_risk` (UK Biobank 448k, incidence 10 năm, SHAP) — lấp đúng horizon đang trống và bridge sang XAI; nên promote TRƯỚC fazakis2021 (cùng horizon nhưng mẫu nhỏ hơn ~220 lần, không SHAP).
