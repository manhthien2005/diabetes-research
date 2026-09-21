# So sánh: lai2019_predictive_models_diabetes (Layer 3)

**Horizon:** `early_detection` — CÙNG horizon với baseline dinh2019 và với deberneh2021. Khác dataset (CPCSSN Canada vs NHANES vs Korean EHR) → **so cách tiếp cận, KHÔNG so con số trực tiếp** (AROC 84.7% vs AUC 0.957 trên dataset khác nhau là không hợp lệ).

## Bảng đối chiếu

| Trục | lai2019 (target) | dinh2019 (baseline) | deberneh2021 (cùng horizon) |
|------|------------------|---------------------|------------------------------|
| Horizon | early_detection ("trước onset", N năm không định lượng) | early_detection (nhãn ~đồng thời, leakage) | early_detection (onset Y+1, định lượng) |
| Dataset | CPCSSN Canada 13.309 BN, 8 predictor (private) | NHANES ~21k (public) | Korean private EHR (private) |
| Method | GBM (n.trees=257, depth=2, shrink=0.126) + LR; cost-matrix FN:FP=3:1; class-weight | XGBoost + Weighted Ensemble (AUC²) | ANOVA+chi2+RFE→12 feat; 7 model + 3 ensemble |
| Cân bằng | adjusted-threshold 0.24 + class-weight (GBM=3, LR=3.5) | downsampling | under-sampling + SMOTE |
| Best metric | GBM AROC 84.7% (sens 71.6%, spec 83.7%, Table 3); LR 84.0%; DeLong GBM≈LR (p=0.081) | AUC 0.957 lab (Table 5); 0.862 survey-only | Acc 0.73 / F1 0.74 (Table 2) |
| Validation chéo | PIMA cross-check (LR 88.0%, Table S8) — chỉ kiểm "chạy được", không external thật | Không | Không |
| XAI | Không (info-gain Fig 1) | Không (info-gain) | Không |
| Code | Không | Không | Không |

## Trùng lặp
- Cùng Layer 3 + cùng horizon `early_detection` với baseline dinh2019 và với deberneh2021 → 3 bài cùng nhánh phát hiện sớm trên EHR thật.
- Cùng dùng GBM/boosting (giống ý tưởng XGBoost của baseline), cùng chỉ info-gain (không SHAP), cùng không public code.
- Trùng mạnh nhất với deberneh2021 (cùng "forward-prediction trên EHR clinic"); nhưng deberneh định lượng cửa sổ Y+1 còn lai2019 chỉ "trước onset" định tính.

## Khác biệt / Vượt trội
- **EHR sơ cấp Canada (CPCSSN)** — quần thể primary-care mới, khác hẳn NHANES (khảo sát) và Korean EHR; mở rộng độ phủ địa lý/loại EHR của layer.
- **Trọng tâm xử lý imbalance theo chi phí lâm sàng**: misclassification cost matrix FN:FP=3:1 + class-weight để nâng sensitivity — góc tiếp cận khác baseline (baseline chỉ downsampling).
- Có kiểm chứng thống kê DeLong giữa các model (GBM vs RF p=5.13e-05) — chặt chẽ hơn baseline.
- Nhãn lập từ bản ghi "trước onset" → tránh leakage cross-sectional của baseline (dù vẫn còn leakage qua FBS).

## Gap còn lại
- FBS vừa là feature #1 (Fig 1) vừa gần định nghĩa nhãn → leakage một phần (giống gap baseline).
- Chỉ giữ LẦN KHÁM CUỐI mỗi BN → vứt bỏ động học longitudinal của EHR (biến thành cross-sectional một-dòng) — mất đúng lợi thế EHR.
- Tỉ lệ FN:FP=3:1 đặt chủ quan, không phân tích độ nhạy; horizon "trước onset" không định lượng N năm (deberneh làm tốt hơn ở điểm này).
- Báo AROC nhưng không PR-AUC/calibration/PPV theo phân bố thật; PIMA chỉ kiểm phương pháp, KHÔNG phải external validation thật.
- Dataset + code không public.

## Verdict
**keep_in_searched** — Bài chắc tay, mở rộng độ phủ EHR sơ cấp Canada + góc cost-sensitive, nhưng cùng horizon `early_detection` đã có baseline dinh2019 và deberneh2021 (deberneh định lượng onset tốt hơn); nên giữ làm dự phòng, promote sau deberneh.
