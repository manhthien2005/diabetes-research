# So sánh: agliata2023_nhanes_mimic_ann (Layer 3)

**Horizon:** `cross_sectional` — **KHÁC horizon với baseline dinh2019** (`early_detection`). NHƯNG **cùng/đè dataset NHANES** với baseline → có thể đối chiếu con số NHANES một cách THẬN TRỌNG (vẫn khác cách lập nhãn/horizon). CÙNG horizon với zhang2020 (`cross_sectional`) nhưng khác dataset.

## Bảng đối chiếu

| Trục | agliata2023 (target) | dinh2019 (baseline) | zhang2020 (cùng horizon) |
|------|----------------------|---------------------|---------------------------|
| Horizon | cross_sectional (nhãn ~đồng thời; LSTM chỉ future work) | early_detection (nhãn ~đồng thời) | cross_sectional |
| Dataset | NHANES 1999-2018 + MIMIC-III + MIMIC-IV hợp nhất, 13.687 cân bằng, 9 feature | NHANES ~21k | Henan Rural Cohort 36.652 |
| Method | ANN nông 1 hidden + ensemble 99 model bỏ phiếu; **calibration + Brier** | XGBoost + Weighted Ensemble (AUC²); info-gain | GBM + 5 model; SHAP |
| Cân bằng | under-sampling (ép 50/50) | downsampling | SMOTE |
| Best metric | AUC 0.934 (ensemble, Fig 3); Acc ~86%; **Brier 0.101** | AUC 0.957 lab (Table 5); 0.862 survey-only | AUC 0.872 lab (Table 4) |
| XAI | Không | Không (info-gain) | SHAP global |
| Code | Không | Không | Không |

## Trùng lặp
- **Đè dataset NHANES với baseline dinh2019** (cùng nguồn NHANES, dù agliata trộn thêm MIMIC) → trùng nguồn dữ liệu chính của baseline.
- Cùng Layer 3 + cùng horizon `cross_sectional` với zhang2020 → trùng nhánh cross-sectional (nhánh đã đông trong layer).
- Đều không public code; agliata + baseline cùng dùng under/down-sampling vứt mẫu.

## Khác biệt / Vượt trội
- **Hợp nhất 3 nguồn EHR/khảo sát dị nguồn** (NHANES + MIMIC-III + MIMIC-IV) qua khoá định danh — kỹ thuật merge multi-source độc đáo, không bài nào trong layer làm.
- **Có calibration + Brier score (0.101)** — thứ cả baseline dinh2019 lẫn zhang2020 đều THIẾU; đây là giá trị bổ trợ thật.
- Ensemble 99 model + ablation feature reduction xuống 9 feature dễ đo.

## Gap còn lại
- **AUC 0.934 KHÔNG vượt baseline dinh2019 (0.957 lab)** trên cùng nguồn NHANES, dù so số phải thận trọng vì khác cách lập nhãn/horizon → không có lợi thế hiệu năng so baseline.
- Horizon THẬT là cross_sectional dù abstract quảng cáo long-term (nhãn đo cùng thời điểm; LSTM chỉ future work) → trùng nhánh cross-sectional đã đông.
- Trộn ICU MIMIC với khảo sát cộng đồng NHANES → distribution shift, model có thể tách lớp nhờ nguồn dữ liệu (artefact).
- Under-sampling ép 50/50 → accuracy không phản ánh prevalence thật ~13%; thiếu precision/recall/F1; không external validation; fit scaler/chia tập không rõ (rủi ro leakage); không SHAP/LIME.

## Verdict
**keep_in_searched** — Quý ở kỹ thuật merge EHR đa nguồn + calibration/Brier (bổ trợ baseline), nhưng AUC 0.934 không vượt baseline trên cùng nguồn NHANES, horizon cross_sectional đã trùng zhang2020, và nhiều rủi ro leakage/distribution-shift chưa kiểm soát; giữ làm tham chiếu kỹ thuật calibration, không ưu tiên promote.
