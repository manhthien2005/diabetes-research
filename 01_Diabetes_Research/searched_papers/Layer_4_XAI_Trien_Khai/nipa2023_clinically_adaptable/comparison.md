# So sánh: nipa2023_clinically_adaptable — Layer 4 (XAI / Triển khai)

> Baseline layer (user đã chọn): **tasin2022_diabetes_prediction_explainable** (horizon: cross_sectional)
> Horizon ứng viên: **early_detection** — KHÁC horizon baseline.
> ⇒ Theo AGENTS.md §3b: **KHÔNG so con số metric** với baseline (khác horizon + khác dataset triệu chứng);
> chỉ so **cách tiếp cận**. nipa2023 là bài early_detection DUY NHẤT trong nhóm ứng viên này.

## Bảng đối chiếu

| Trục | tasin2022 (baseline, cross_sectional) | nipa2023 (ứng viên, early_detection) | nipa2023 vs các ứng viên khác |
|------|----------------------------------------|---------------------------------------|-------------------------------|
| Horizon | cross_sectional | **early_detection** (phát hiện sớm qua triệu chứng) | DUY NHẤT early_detection; 3 ứng viên kia đều cross_sectional → không so số với chúng |
| Dataset | PIMA + RTML merged (~877) | **SDHD/Sylhet công khai + PDD tự thu (Bangladesh, 558) + MDD gộp** | Sylhet overlap với kaliappan; PDD/MDD KHÔNG public |
| Mô hình | XGBoost + ADASYN, 9 model | **Benchmark 35 classifier** (ET/MLP/HGBC/LGBM…) | rộng về số model nhất; nhưng không tuning công bố |
| Trọng tâm | pipeline + deploy | **SHAP nhận diện 'early appreciable features' + tự thu dataset mới để thích ứng đa dân số** | góc độc nhất: tự thu data + thích ứng lâm sàng |
| Cân bằng lớp | ADASYN / SMOTE (chỉ train) | KHÔNG SMOTE (SDHD 320/200 mất cân bằng) | thua tasin |
| Validation | 8:2 holdout + GridSearchCV cv=5 | split 80:20, KHÔNG K-fold; **paper TỰ nhận overfit SDHD + "no validation methods used"** | yếu nhất nhóm về validation (tự thừa nhận) |
| XAI | SHAP + LIME | **SHAP định tính** (polyuria/age/polyphagia/delayed healing/irritability mạnh nhất, Fig 6–8) | không LIME; SHAP định tính như kaliappan/ahmed |
| Deploy | Web + Android + Heroku + 16 user review | KHÔNG deploy thật | thua tasin & dharmarathne; ngang ahmed/kaliappan |
| Code | Có (GitHub 13⭐) | KHÔNG | thua tasin; ngang các ứng viên còn lại |
| Best metric (nguồn) | Acc 81% / F1 0.81 / AUC 0.84 merged (Table 5, Fig. 8) | **SDHD: ET Acc 97.11% / F1 98.10% / AUROC 96.67% (Table 2); PDD: MLP 96.42% (Table 2); MDD: HGBC&LGBM 94.90% / AUROC 94.92% (Table 3)** | **KHÔNG so với baseline** (khác horizon, dataset triệu chứng nhị phân dễ phân + tự nhận overfit) |
| Citations | 266 | 32 (Intelligent Medicine, 2023) | đạt ngưỡng §7 (≥30 cho 1–3 năm) |

## Trùng lặp

- **Đều dùng SHAP** để diễn giải feature trên dự đoán ĐTĐ → trùng "họ XAI" với baseline và 3 ứng viên kia (nhưng nipa không có LIME).
- **Dataset Sylhet (SDHD)** trùng với kaliappan2024 (early-diabetes-classification-sylhet) → hai bài chạm chung 1 dataset triệu chứng.
- **Đều thiếu K-fold CV, không code, không deploy thật** — điểm yếu reproducibility chung (nipa nặng nhất: tự nhận overfit).

## Khác biệt / Vượt trội

- **Lấp horizon `early_detection`** — đúng ưu tiên cân bằng kho (AGENTS.md §3b ghi early_detection còn mỏng). Trong cả layer 4 và nhóm ứng viên này, nipa2023 là bài early_detection duy nhất → **giá trị phủ horizon** mà baseline (cross_sectional) và 3 ứng viên cross_sectional khác KHÔNG có.
- **Góc 'clinically adaptable'**: TỰ THU dataset mới (PDD 558 mẫu, khảo sát Bangladesh) để kiểm tính thích ứng đa dân số bằng cùng bộ câu hỏi — góc lâm sàng mà baseline không có. (Lưu ý: mới dừng ở thu+gộp data, chưa phải domain adaptation/transfer thực thụ.)
- **SHAP early features**: chỉ ra polyuria/age/polyphagia/delayed healing/irritability là triệu chứng sớm — hữu ích cho hướng sàng lọc.

## Gap còn lại

- **Validation yếu nhất nhóm**: không K-fold/nested CV, paper TỰ thừa nhận overfit SDHD + "no validation methods being used" + không validate external → Acc 94–97% lạc quan, KHÔNG dùng làm số baseline.
- **Không tuning hyperparameter công bố**; **không xử lý imbalance SDHD (320/200)**.
- **SHAP chỉ định tính** (không bảng giá trị Shapley); **không LIME**.
- **PDD/MDD không public + không code** → phần 'thích ứng' khó tái lập; 'clinically adaptable' chưa có domain adaptation thực sự.

## Verdict

**promote** — Là ứng viên DUY NHẤT lấp horizon `early_detection` cho Layer 4 (đang mỏng theo §3b) với góc độc đáo "SHAP early-detection + tự thu dataset để thích ứng lâm sàng" (32 cite, đạt §7) mà baseline cross_sectional không phủ; dù validation yếu (không CV, tự nhận overfit, không code) nên chỉ promote vì GIÁ TRỊ PHỦ HORIZON + góc feature lâm sàng, KHÔNG vì số liệu — promote như tham chiếu early_detection chứ không thay vai trò pipeline của baseline.
