# So sánh: kaliappan2024_featsel_diverse_datasets — Layer 4 (XAI / Triển khai)

> Baseline layer (user đã chọn): **tasin2022_diabetes_prediction_explainable**
> Horizon ứng viên: **cross_sectional** — CÙNG horizon với baseline.
> Dataset: 4 bộ (Kaggle-2019, diabetes-prediction-Kaggle, Sylhet, **PIMA**) — PIMA overlap với baseline
> NHƯNG Dataset-4 báo 2768 mẫu > 768 PIMA gốc (nghi augment/oversample) → KHÔNG so số trực tiếp được.

## Bảng đối chiếu

| Trục | tasin2022 (baseline) | kaliappan2024 (ứng viên) | kaliappan2024 vs các ứng viên cùng horizon |
|------|----------------------|---------------------------|---------------------------------------------|
| Horizon | cross_sectional | cross_sectional | ahmed2024 (BRFSS), dharmarathne2024 (PIMA) — cùng cross_sectional |
| Dataset | PIMA + RTML merged (~877) | **4 dataset** (Kaggle-2019, diabetes-prediction, Sylhet, PIMA-augment 2768) | RỘNG nhất layer; overlap PIMA & Sylhet với baseline/nipa |
| Mô hình | XGBoost + ADASYN, 9 model | RF/XGB/GB/SVM full vs subset + **stacking** (base RF+GB+SVM+XGB, meta LR) | đa-model như tasin; mạnh hơn ahmed (LR) & dharmarathne (đơn XGB) |
| Trọng tâm | pipeline end-to-end + deploy | **so sánh feature selection (filter vs wrapper) + stacking** | góc độc nhất: bài học âm về feature selection |
| Cân bằng lớp | ADASYN / SMOTE (chỉ train) | KHÔNG SMOTE (nghi Dataset-4 augment trước split) | thua tasin |
| Validation | 8:2 holdout + GridSearchCV cv=5 | 1 train/test split cố định, KHÔNG K-fold | giống điểm yếu chung layer |
| XAI | SHAP + LIME | SHAP + LIME (chỉ định tính, không giá trị Shapley, LIME 1 record/dataset) | XAI nông hơn tasin; ngang ahmed/dharmarathne về độ định tính |
| Deploy | Web + Android + Heroku | KHÔNG deploy | thua tasin & dharmarathne; ngang ahmed/nipa |
| Code | Có (GitHub 13⭐) | KHÔNG | thua tasin; ngang các ứng viên còn lại |
| Best metric (nguồn) | Acc 81% / F1 0.81 / AUC 0.84 merged (Table 5, Fig. 8) | **RF Acc 0.990 / Prec 0.991 / Rec 0.990 / F1 0.993** trên Dataset-3 & Dataset-1 không FS (Table 8); PIMA-augment RF/XGB 0.982 (Table 8); stacking 0.963–0.982 (Table 10) | **KHÔNG so trực tiếp** — Dataset-4 augment 2768>768 nghi leakage + thiếu CV → 0.99 lạc quan; không AUC ở bảng chính |
| Citations | 266 | 33 (Frontiers in AI, 2024) | đạt ngưỡng §7 (≥30 cho 1–3 năm) |

## Trùng lặp

- **Đều dùng SHAP + LIME** trên dự đoán ĐTĐ cross_sectional → trùng "họ XAI" với baseline và 2 ứng viên kia.
- **Đều chạm PIMA** (và Sylhet, trùng với nipa2023) — nhưng kaliappan augment PIMA lên 2768 nên không cùng tập đo với baseline.
- **Đều thiếu K-fold CV**; **không code/deploy** (giống ahmed2024, nipa2023).

## Khác biệt / Vượt trội

- **Đóng góp riêng**: so sánh có hệ thống **chiến lược feature selection** (filter Chi-square/Fisher/Info-gain vs wrapper RF/XGB/GB/SVM/LR) + **stacking** trên **4 dataset** — rộng nhất layer. Phát hiện chính (feature selection KHÔNG cải thiện accuracy nhất quán; wrapper > filter; RF mạnh nhất) là **bài học phương pháp** mà baseline tasin2022 (1 dataset merged) không cung cấp.
- So với ahmed2024 (1 dataset, chỉ LR) và dharmarathne2024 (1 PIMA, đơn XGB): kaliappan **đa-dataset + đa-model + stacking** → góc benchmark rộng bù cho baseline.

## Gap còn lại

- **Acc 0.99 nghi do augment + thiếu CV**: Dataset-4 báo 2768 mẫu trong khi PIMA gốc 768 → nếu augment trước split thì test leakage; chỉ 1 split cố định → 0.99 lạc quan.
- **Feature importance chấm trên toàn dataset** → rò rỉ nhẹ (giống lỗi MI của baseline nhưng nặng hơn vì nhiều dataset).
- **SHAP/LIME chỉ định tính**, không giá trị Shapley số, LIME 1 record/dataset; **không AUC ở bảng chính**.
- **Không hyperparameter báo cáo, không code, không deploy**; bảng metric PDF bị trộn cột Table 8 vs Table 9.

## Verdict

**keep_in_searched** — Làm giàu Layer 4 với góc đa-dataset + bài học âm về feature selection (33 cite, đạt §7) BỔ TRỢ baseline, nhưng accuracy 0.99 nghi augment/thiếu CV, không code/deploy, SHAP định tính → chỉ giá trị tham khảo phương pháp feature-selection, KHÔNG dùng làm baseline số liệu; baseline tasin2022 đã mạnh hơn về validation + deployment + code.
