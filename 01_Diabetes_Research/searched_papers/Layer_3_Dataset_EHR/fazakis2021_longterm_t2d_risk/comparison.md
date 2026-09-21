# So sánh: fazakis2021_longterm_t2d_risk (Layer 3)

**Horizon:** `long_term_risk` — **KHÁC horizon với baseline dinh2019** (`early_detection`) → so cách tiếp cận, KHÔNG so con số AUC trực tiếp. CÙNG horizon với lugner2024 (`long_term_risk`) nhưng **khác dataset** (ELSA vs UK Biobank) → vẫn không so số thẳng, chỉ đối chiếu thiết kế.

## Bảng đối chiếu

| Trục | fazakis2021 (target) | dinh2019 (baseline, khác horizon) | lugner2024 (cùng horizon) |
|------|----------------------|-----------------------------------|----------------------------|
| Horizon | long_term_risk (onset 2 năm, FU dọc) | early_detection (nhãn ~đồng thời) | long_term_risk (incidence 10 năm) |
| Dataset | ELSA (English Longitudinal Study of Ageing), ~2.009 sau lọc | NHANES ~21k | UK Biobank 448.277 |
| Method | WeightedVotingLRRFs (LR+RF), trọng số NSGA-II [0.273,0.727]; + Stacking, transductive | XGBoost + Weighted Ensemble (AUC²) | XGBoost (419 feat + reduced top-10); SHAP |
| Cân bằng | random undersampling | downsampling | downsampling 1:3 |
| Best metric | AUC 0.884 inductive / 0.888 transductive (Table 5); vượt FINDRISC 0.821, Leicester 0.788 | AUC 0.957 lab (Table 5) | AUC 0.903 main (Table 3); top-10 0.881; Sens 0.62; PR-AUC 0.29 |
| XAI | Không | Không | SHAP global |
| Code | Không | Không | Không |

## Trùng lặp
- Cùng Layer 3 + cùng horizon `long_term_risk` với lugner2024 → 2 bài cùng nhánh "dự báo onset tương lai từ cohort dọc". Đây là cặp trùng hướng chính cần phân vai.
- Đều dùng ensemble/boosting trên cohort thật, đều không public code, đều dùng undersampling/downsampling (vứt mẫu) thay vì SMOTE.

## Khác biệt / Vượt trội
- **Ensemble có trọng số tối ưu bằng NSGA-II** (đa mục tiêu AUC & Sensitivity đồng thời) — kỹ thuật mới, khác hẳn weighted-AUC² của baseline và XGBoost-thuần của lugner.
- So sánh trực tiếp với hệ điểm rủi ro lâm sàng FINDRISC/Leicester (ensemble +6.3 / +9.6 điểm AUC) — neo vào thực hành lâm sàng.
- Thử cả inductive lẫn transductive (self-training) — góc học bán giám sát hiếm trong kho.
- Onset thật cửa sổ 2 năm (ghép baseline waves 2/4/6 với follow-up 3/5/7) → ít rò rỉ nhãn hơn cross-sectional, bổ trợ đúng nhánh long_term_risk còn mỏng (cùng lugner).

## Gap còn lại
- **Mẫu rất nhỏ (~2.009)** sau lọc + undersampling (tác giả tự nêu) → AUC dao động theo seed; nhỏ hơn lugner ~220 lần.
- FU chỉ 2 năm = "biên" của long_term (ngắn hơn nhiều 10 năm của lugner) → khác độ dài cửa sổ rõ rệt, không so số.
- Leakage một phần qua fglu/hba1c/everHighGlu; transductive 0.888 khai thác chính tập test → không phản ánh dữ liệu chưa thấy.
- Không external validation, không code, không calibration/PR-AUC, chưa thử XGBoost/AdaBoost.

## Verdict
**promote** — Bài neo `long_term_risk` thứ hai (onset 2 năm + NSGA-II ensemble + so FINDRISC), bổ sung cho lugner2024 ở góc cohort nhỏ/cửa-sổ-ngắn/kỹ-thuật-tối-ưu-trọng-số; nên promote nhưng SAU lugner (lugner quy mô lớn + SHAP làm bài neo chính của horizon này).
