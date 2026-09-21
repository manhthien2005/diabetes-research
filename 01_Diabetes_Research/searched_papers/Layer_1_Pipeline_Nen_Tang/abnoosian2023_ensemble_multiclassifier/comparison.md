# So sánh: abnoosian2023_ensemble_multiclassifier (Layer 1)

> Horizon: `cross_sectional`. So với baseline `gr2024_random_oversampling_diabetes` và so chéo
> với các ứng viên cùng layer (`nnamoko2020_outliers_imbalance`, `hennebelle2023_mlops_iot_diabetes`).
> Metric chỉ so trực tiếp khi CÙNG horizon + cùng/đè dataset. Cả 4 bài đều `cross_sectional`,
> NHƯNG abnoosian2023 chạy **chỉ trên IPDD (Iraqi)** — KHÔNG overlap dataset với baseline (PIMA/BRFSS)
> hay các ứng viên khác → không so con số accuracy thẳng, chỉ so cách tiếp cận.

## Bảng đối chiếu

| Trục | abnoosian2023 (target) | gr2024 (baseline) | nnamoko2020 | hennebelle2023 |
|------|------------------------|-------------------|-------------|----------------|
| Horizon | cross_sectional | cross_sectional | cross_sectional | cross_sectional |
| Bài toán | **3 lớp** (diabetic/non/pre) | nhị phân | nhị phân | nhị phân |
| Dataset | **IPDD** (993 mẫu, đơn-dataset) | PIDD/PIMA + BRFSS | PIMA +3 khác | PIMA + Sylhet + MIMIC-III |
| Imbalance | **trọng số AUC OVO** (Eq.5), KHÔNG oversample | Random Oversampling | SMOTE + khuếch đại outlier | SMOTE trên train |
| Tiền xử lý | k-NN imputation → min-max/Z → MRMR/PCA/ICA | mean imputation → IQR | IQR → SMOTE | loại missing/outlier → RFECV |
| Model | Ensemble weighted voting 6 base MLM | Random Forest + Boruta | C4.5 (single) | RF + RFECV |
| Best metric | Acc **0.9887** / AUC 0.999 / F1 0.985 (Table 9,10, micro-avg) | Acc 94% PIDD (Table 6) | Acc 89.5% PIMA (Table 4) | Acc 0.7827 PIMA (S6.4) |
| Code | Không | Không | Không | Không |
| Tái lập | medium | medium | high | medium |
| Citations | 118 | 12 | 154 | UNKNOWN |

## Trùng lặp
- **gr2024 (baseline)**: cùng Layer 1, cùng horizon, cùng họ "pipeline tiền xử lý đầy đủ +
  chọn feature + model trên tabular diabetes". Trùng về vai trò pipeline nền tảng.
- **nnamoko2020 / hennebelle2023**: cùng mục tiêu xử lý imbalance, nhưng abnoosian là bài DUY NHẤT
  KHÔNG dùng oversampling/SMOTE — cân bằng bằng trọng số AUC OVO. Khác chiến lược, không trùng công cụ.

## Khác biệt / Vượt trội
- **Chiến lược cân bằng MỚI**: weighted voting với trọng số = AUC One-Vs-One (Eq.5) thay vì
  oversampling — góc tiếp cận imbalance khác hẳn baseline (Random Oversampling) và 2 ứng viên SMOTE.
  Đây là điểm bổ trợ về ý tưởng cho Layer 1.
- **Pipeline tiền xử lý đa nhánh**: k-NN imputation + chuẩn hoá kép (min-max & Z) + 3 lựa chọn
  feature/giảm chiều (MRMR / PCA / ICA) — phong phú hơn baseline.
- **Bài toán 3 lớp** (gồm pre-diabetic) — mở rộng ngoài nhị phân, hiếm trong nhóm.
- Highly-cited (118).

## Gap còn lại
- **KHÔNG so được accuracy với baseline**: đơn-dataset IPDD, không overlap PIMA/BRFSS; lại là
  bài toán 3 lớp → 0.9887 KHÔNG đặt cạnh 94% của gr2024 được (khác dataset + khác số lớp).
- **Accuracy bão hoà nghi thổi phồng**: 0.9887 micro-avg multi-class gồm cả TN lớp khác; nên báo
  per-class recall/F1 + macro-AUC. Lớp pre chỉ 53 mẫu → CV variance cao.
- **Rủi ro leakage chưa loại trừ**: mô tả mơ hồ impute/normalize/feature-select có fit chỉ trên
  train fold không. (Tương phản với nnamoko2020 có protocol fold-từ-data-gốc rõ ràng.)
- Đơn-dataset, không external validation (tác giả tự thừa nhận thiên lệch); chưa benchmark
  GB/LGBM/XGBoost; không code; không XAI.
- Metadata cũ từng ghi nhầm PIMA+Sylhet+SMOTE+stacking — thực tế đơn-dataset, không SMOTE, voting.

## Verdict
**keep_in_searched** — Chiến lược cân bằng bằng trọng số AUC OVO và pipeline tiền xử lý đa nhánh
đáng tham chiếu + highly-cited, nhưng đơn-dataset không overlap baseline, accuracy multi-class bão
hoà nghi quá lạc quan và rủi ro leakage chưa loại trừ → giữ làm đối chứng ý tưởng, không phải nền tảng.
