# So sánh: deberneh2021_korean_ehr_nextyear (Layer 3)

**Horizon:** `early_detection` — CÙNG horizon với baseline dinh2019 → so trực tiếp được về cách tiếp cận, NHƯNG **khác dataset hoàn toàn** (Korean private EHR vs NHANES) → **KHÔNG so con số AUC/acc trực tiếp**.

## Bảng đối chiếu

| Trục | deberneh2021 (target) | dinh2019 (baseline) | lai2019 (cùng horizon) |
|------|----------------------|---------------------|------------------------|
| Horizon | early_detection (onset Y+1, thực thụ) | early_detection (nhãn ~đồng thời, leakage cross-sectional) | early_detection ("trước onset", không định lượng N năm) |
| Dataset | Korean private EHR 6 năm (Hanaro), 3 lớp | NHANES ~21k (public) | CPCSSN Canada 13.309 BN (private) |
| Method | ANOVA+chi2+RFE→12 feat; LR/RF/SVM/XGB + 3 ensemble (CIM/stacking/voting) | XGBoost + Weighted Ensemble (AUC²); info-gain top-24 | GBM + LR (MLR/R); cost-matrix FN:FP=3:1 |
| Cân bằng | under-sampling + SMOTE | downsampling | adjusted-threshold + class-weight |
| Best metric | Acc 0.73 / F1 0.74 / MCC 0.60 (RF&SVM, Table 2); diabetes precision 90% (Table 3); **không báo AUC** | AUC 0.957 lab (Table 5); 0.862 survey-only; 0.737 Case II no-lab | AROC 84.7% (GBM, Table 3); **không báo accuracy** |
| XAI | Không (chỉ feature selection) | Không (chỉ info-gain) | Không (chỉ info-gain Fig 1) |
| Code | Không | Không | Không |

## Trùng lặp
- Cùng Layer 3 + cùng horizon `early_detection` với baseline dinh2019 và với lai2019 → 3 bài cùng nhánh "phát hiện sớm trên EHR thật". Đều data-driven feature selection, đều không public code, đều không dùng SHAP/LIME.
- Trùng với lai2019 ở ý "lập nhãn forward-prediction trên EHR clinic" — nhưng deberneh định lượng rõ cửa sổ (Y → Y+1) còn lai2019 chỉ "trước onset" không nêu N năm.

## Khác biệt / Vượt trội
- **Onset Y+1 đa lớp (normal/prediabetes/diabetes)**: đây là early_detection THỰC THỤ (feature năm Y dự đoán label năm Y+1), tránh leakage cross-sectional mà baseline dinh2019 mắc phải (nhãn ~đồng thời feature). Đây là điểm bổ trợ baseline mạnh nhất về mặt thiết kế bài toán.
- Bài 3 lớp duy nhất trong nhóm (tách prediabetes), cung cấp precision theo từng lớp (Table 3).
- Định lượng được lợi ích của lịch sử dài: 81% acc khi train 4 năm + 12 feature vs 77% với 5 feature truyền thống (Section 5).

## Gap còn lại
- Nhãn chỉ định nghĩa bằng FPG (không HbA1c/OGTT), mà FPG cũng là feature quan trọng nhất → leakage một phần (giống gap leakage của baseline).
- **Không báo AUC/PR-AUC/calibration** → không so trực tiếp được với baseline (AUC) và với các bài AUC khác trong layer; chỉ có accuracy.
- Test set nhỏ & cân bằng nhân tạo (200/lớp), không phản ánh imbalance thật (diabetes 4.3%); SMOTE↔split không nêu thứ tự (nguy cơ leakage).
- Dataset + code đều private → tái lập thấp (reproducible=low, thấp nhất nhóm).
- Không external validation, một nguồn dữ liệu duy nhất.

## Verdict
**promote** — Bài neo hiếm cho `early_detection` đúng nghĩa (onset Y+1 trên EHR clinic thật), bổ trợ chính cho gap leakage cross-sectional của baseline dinh2019; chỉ nên promote SAU baseline vì dataset/code private và không có AUC để so số.
