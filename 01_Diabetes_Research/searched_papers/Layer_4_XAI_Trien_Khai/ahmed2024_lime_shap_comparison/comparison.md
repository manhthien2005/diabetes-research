# So sánh: ahmed2024_lime_shap_comparison — Layer 4 (XAI / Triển khai)

> Baseline layer (user đã chọn): **tasin2022_diabetes_prediction_explainable**
> Horizon ứng viên: **cross_sectional** — CÙNG horizon với baseline → được so cách tiếp cận;
> NHƯNG khác dataset (BRFSS-2015 vs PIMA+RTML) → KHÔNG so trực tiếp con số metric.

## Bảng đối chiếu

| Trục | tasin2022 (baseline) | ahmed2024 (ứng viên) | ahmed2024 vs các ứng viên cùng horizon |
|------|----------------------|----------------------|-----------------------------------------|
| Horizon | cross_sectional | cross_sectional | dharmarathne2024 (PIMA), kaliappan2024 (đa-dataset) — cùng cross_sectional |
| Dataset | PIMA + RTML merged (~877) | **BRFSS-2015** (health indicators, self-report) | khác hẳn dharmarathne (PIMA) & kaliappan (PIMA/Sylhet/Kaggle); không overlap dataset nào |
| Mô hình | XGBoost + ADASYN, 9 model, GridSearchCV | **Logistic Regression** (+ RF nhắc nhưng không báo số) | mô hình mỏng hơn cả 3 ứng viên còn lại |
| Cân bằng lớp | ADASYN / SMOTE (chỉ train) | KHÔNG xử lý imbalance | thua tasin; kaliappan cũng không SMOTE; dharmarathne không xử lý |
| Validation | 8:2 holdout + GridSearchCV cv=5 | split 80/20, KHÔNG K-fold | giống điểm yếu chung của cả layer (không CV) |
| XAI | SHAP + LIME (công cụ trong pipeline) | **SHAP vs LIME — so sánh PHƯƠNG PHÁP có hệ thống** (Algorithm 1–2, Table 3–5, 4 tiêu chí fidelity/stability/consistency/comprehensibility) | đây là điểm độc nhất: là duy nhất "đối chiếu trình giải thích", không phải chỉ "dùng" |
| Deploy | Web + Android + Heroku + 16 user review | KHÔNG deploy | thua tasin & dharmarathne; ngang kaliappan/nipa (không deploy) |
| Code | Có (GitHub 13⭐) | KHÔNG | thua tasin; ngang ahmed/dharmarathne/kaliappan/nipa |
| Best metric (nguồn) | Acc 81% / F1 0.81 / AUC 0.84 merged (Table 5, Fig. 8) | **Acc 86% test** (Abstract + Sec III-B + Conclusion); SHAP: HighBP +6.4 đpt, GenHlth +6.0 đpt (Figure 8). P/R/F1 Table 2 không hiện text → UNKNOWN; AUC chỉ có ROC curve (Fig 5) không kèm số | KHÔNG so số trực tiếp — khác dataset (BRFSS ≠ PIMA) |
| Citations | 266 | 115 (IEEE Access, 2024) | cao nhất trong 4 ứng viên |

## Trùng lặp

- **Đều dùng SHAP + LIME** trên bài toán dự đoán ĐTĐ cross_sectional → cùng "họ XAI" với baseline tasin2022 và với 2 ứng viên dharmarathne2024 + kaliappan2024.
- **Đều thiếu K-fold CV** (chỉ một split 80/20) — điểm yếu reproducibility chung của cả layer.
- Khác với tasin2022 ở chỗ baseline **dùng** SHAP/LIME như công cụ; ahmed2024 lại **so sánh** chúng → không trùng mục tiêu, chỉ trùng công cụ.

## Khác biệt / Vượt trội

- **Đóng góp duy nhất của ahmed2024**: tài liệu đối chiếu LIME vs SHAP có hệ thống — cơ chế (Algorithm 1–2), điểm mạnh/yếu theo loại dữ liệu (ảnh/text/tabular/sensory, Table 3) và theo 4 tiêu chí (fidelity/stability/consistency/comprehensibility). Không paper nào khác trong layer (baseline lẫn 3 ứng viên) làm việc này → **bổ trợ** baseline thay vì trùng.
- Citations cao nhất nhóm ứng viên (115) → uy tín tham chiếu phương pháp tốt.

## Gap còn lại

- **Modeling rất mỏng**: chỉ Logistic Regression (Acc 86% BRFSS), RF không báo số; thua xa tasin (XGBoost ensemble) và kaliappan (RF/stacking đa-dataset).
- **Dataset BRFSS cơ bản** (self-report, mất cân bằng, đang hạ ưu tiên), không overlap dataset baseline → không thể đóng vai baseline số liệu/dataset.
- **Không K-fold, không xử lý imbalance, không báo AUC/F1 số** → Acc 86% dễ bị thổi bởi lớp đa số.
- **So sánh XAI chủ yếu định tính** (4 tiêu chí không đo bằng số, LIME chỉ 2 record, SHAP không có bảng giá trị Shapley).
- **Không code public**; tỉ trọng literature review lớn.

## Verdict

**keep_in_searched** — Giữ làm tài liệu tham chiếu phương pháp XAI (đối chiếu LIME vs SHAP có hệ thống, 115 cite) BỔ TRỢ baseline tasin2022, nhưng modeling/dataset quá yếu (LR 86% BRFSS, không CV, không code) nên KHÔNG promote làm baseline; baseline tasin2022 đã bao trùm vai trò "dùng SHAP+LIME trong pipeline có deploy".
