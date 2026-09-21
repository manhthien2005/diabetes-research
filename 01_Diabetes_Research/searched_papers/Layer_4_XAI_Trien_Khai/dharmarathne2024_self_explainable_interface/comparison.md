# So sánh: dharmarathne2024_self_explainable_interface — Layer 4 (XAI / Triển khai)

> Baseline layer (user đã chọn): **tasin2022_diabetes_prediction_explainable**
> Horizon ứng viên: **cross_sectional** — CÙNG horizon với baseline.
> Dataset: **PIMA** — CÙNG (đè một phần) dataset baseline (PIMA nằm trong PIMA+RTML merged)
> → được so số CÓ ĐIỀU KIỆN trên PIMA (lưu ý baseline đo trên merged ~877, không phải PIMA thuần).

## Bảng đối chiếu

| Trục | tasin2022 (baseline) | dharmarathne2024 (ứng viên) | dharmarathne2024 vs các ứng viên cùng horizon |
|------|----------------------|------------------------------|------------------------------------------------|
| Horizon | cross_sectional | cross_sectional | ahmed2024 (BRFSS), kaliappan2024 (đa-dataset) — cùng cross_sectional |
| Dataset | PIMA + RTML merged (~877) | **PIMA** (768) | overlap PIMA với baseline & kaliappan; khác ahmed (BRFSS) |
| Mô hình | XGBoost + ADASYN, 9 model | DT/KNN/SVC/**XGB** (chọn XGB), Random Search tuning | mô hình nhẹ hơn tasin; ngang/hơn ahmed (chỉ LR) |
| Cân bằng lớp | ADASYN / SMOTE (chỉ train) | KHÔNG xử lý/đo imbalance | thua tasin |
| Validation | 8:2 holdout + GridSearchCV cv=5 | split 70/30, KHÔNG K-fold | giống điểm yếu chung layer |
| XAI | SHAP + LIME (offline trong pipeline) | **SHAP global + local NHÚNG vào giao diện tự-giải-thích** (force plot 4 ca, thanh đỏ tăng/xanh giảm) | điểm độc nhất: đưa SHAP LOCAL tới end-user |
| Deploy | Web + Android + Heroku + 16 user review | **App desktop Tkinter cục bộ** (chưa test người dùng thực) | cả hai có deploy tới end-user; ahmed/kaliappan/nipa KHÔNG deploy |
| Code | Có (GitHub 13⭐) | KHÔNG | thua tasin; ngang các ứng viên còn lại |
| Best metric (nguồn) | Acc 81% / F1 0.81 / AUC 0.84 trên **merged** (Table 5, Fig. 8) | **XGB Acc 0.77 test / 0.80 train; AUC 0.82 test / 0.856 train; Recall 0.73/0.76; F1 0.65/0.68; FPR 0.20** (Table 2 + Sec 4.1, Fig. 3); ít FN nhất (13 test) | so có điều kiện: 77% (PIMA thuần) < 81% (merged 877) của baseline — nhưng KHÁC tập test (PIMA vs merged) nên không phải so chuẩn 1-1 |
| Citations | 266 | 89 (Healthcare Analytics, 2024) | rất cao cho bài 2024 |

## Trùng lặp

- **Đều là Layer 4 thực sự TRIỂN KHAI giải thích tới người dùng cuối** — đây là điểm trùng quan trọng nhất với baseline tasin2022 (web+Android). Cả hai = "đưa XAI vào sản phẩm".
- **Đều dùng XGBoost làm model chốt + SHAP** trên PIMA (PIMA là tập con của merged baseline).
- **Đều thiếu K-fold CV và không code public** (dharmarathne thiếu cả hai; tasin có code).

## Khác biệt / Vượt trội

- **Đóng góp riêng**: giao diện **tự-giải-thích** nhúng **SHAP LOCAL** trực tiếp tới end-user (thanh đỏ/xanh trực quan), trong khi tasin2022 chỉ deploy form dự đoán còn SHAP/LIME chạy offline. Đây là **mẫu thiết kế bù** cho baseline về "cách trình bày giải thích cho người không chuyên".
- So với ahmed2024 (chỉ so sánh LIME/SHAP định tính, không deploy) và kaliappan2024 (đa-dataset, không deploy): dharmarathne là ứng viên **duy nhất** có deploy giải thích tới end-user → cùng tasin2022 lập thành cặp "deployment XAI".

## Gap còn lại

- **Accuracy XGB 77% (PIMA test)** khiêm tốn — thấp hơn baseline merged (81%) và nhiều bài PIMA (78–86%).
- **PIMA cơ bản** (768 mẫu, nhiều 0 nghi missing, đang hạ ưu tiên), không xử lý/đo class imbalance.
- **Không K-fold CV** (chỉ split 70/30); **không code public**.
- **App chỉ Tkinter cục bộ** (không web, chưa test người dùng thực) → mức triển khai nông hơn tasin (web+Android+Heroku+16 user review).
- **SHAP local chỉ định tính 4 ca**, không bảng giá trị Shapley, không đo fidelity/stability.

## Verdict

**keep_in_searched** — Mẫu thiết kế triển khai có giá trị (interface tự-giải-thích nhúng SHAP local tới end-user, 89 cite/2024) và BỔ TRỢ baseline ở khâu "trình bày giải thích", nhưng modeling mỏng (XGB 77% PIMA < baseline, không CV, không code, app Tkinter cục bộ) và vai trò "deploy XAI" đã được baseline tasin2022 đảm nhiệm mạnh hơn → giữ làm tham chiếu thiết kế UI/UX cho XAI, chưa cần promote.
