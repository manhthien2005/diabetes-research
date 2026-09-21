# So sánh: nnamoko2020_outliers_imbalance (Layer 1)

> Horizon: `cross_sectional`. So với baseline `gr2024_random_oversampling_diabetes` và so chéo
> với các ứng viên cùng layer (`abnoosian2023_ensemble_multiclassifier`, `hennebelle2023_mlops_iot_diabetes`).
> Metric chỉ so trực tiếp khi CÙNG horizon + cùng/đè dataset. Cả 4 bài đều `cross_sectional`;
> dataset overlap duy nhất là **PIMA/PIDD**.

## Bảng đối chiếu

| Trục | nnamoko2020 (target) | gr2024 (baseline) | abnoosian2023 | hennebelle2023 |
|------|----------------------|-------------------|---------------|----------------|
| Horizon | cross_sectional | cross_sectional | cross_sectional | cross_sectional |
| Dataset | PIMA + German-credit + QSAR + Breast-cancer | PIDD/PIMA + BRFSS | IPDD (Iraqi, 993 mẫu, 3 lớp) | PIMA + Sylhet + MIMIC-III |
| Xử lý outlier | **GIỮ + khuếch đại** (IQR oversample 500% có hoàn lại) | **LOẠI** outlier (IQR cắt) | k-NN imputation, không xử lý outlier riêng | loại missing/outlier (mô tả ngắn) |
| Xử lý imbalance | SMOTE (k=5) sau khi nhúng tri thức outlier | Random Oversampling | TRỌNG SỐ AUC OVO (không oversample) | SMOTE chỉ trên 70% train |
| Model thắng | C4.5 (IQRd+SMOTEd) | Random Forest + Boruta | Ensemble weighted voting (kNN+AdaBoost+DT+RF) | Random Forest + RFECV |
| Best metric (PIMA) | Acc **89.5%** / AUC 94.6% / G-mean 88.8% (Table 4, 8) | Acc **94%** (Table 6) | — (không chạy PIMA) | Acc **0.7827** (Section 6.4) |
| Chống leakage | **Mẫu mực**: fold tạo từ data GỐC + McNemar test | rủi ro (oversample có thể trước split) | mơ hồ (impute/normalize có fit chỉ train?) | rõ (SMOTE chỉ trên train) |
| Code | Không | Không | Không | Không |
| Tái lập | high | medium | medium | medium |
| Citations | 154 | 12 | 118 | UNKNOWN |

## Trùng lặp
- **gr2024 (baseline)**: cùng Layer 1, cùng horizon, cùng dataset PIMA, cùng họ vấn đề
  "outlier + imbalance trên tabular diabetes". Đây là **peer trực tiếp** — cùng giải bài toán
  oversampling trên PIMA.
- **hennebelle2023**: cùng dùng SMOTE và cùng có PIMA, nhưng hennebelle dùng SMOTE để cân bằng
  còn nnamoko dùng SMOTE để khuếch đại vùng ca hiếm/outlier — trùng công cụ, khác mục tiêu.

## Khác biệt / Vượt trội
- **Triết lý outlier ĐỐI LẬP baseline**: gr2024 LOẠI outlier; nnamoko GIỮ và oversample outlier
  500% rồi để SMOTE sinh thêm mẫu quanh ca hiếm. Đây là góc nhìn bổ trợ trực tiếp (ablation
  đối chứng) cho quyết định "loại hay giữ outlier" — điều baseline chưa kiểm chứng.
- **Protocol chống leakage mẫu mực**: stratified 10-fold CV với fold tạo từ data gốc (không
  oversample test) + McNemar's test (p<0.0001, Table 5-6) — vá đúng lỗ hổng lớn nhất mà
  baseline gr2024 chưa đảm bảo và analysis baseline tự cảnh báo.
- **Venue + độ phủ**: AI in Medicine, 154 citations (cao nhất nhóm), 4 dataset (không chỉ y khoa),
  vượt baseline nội bộ AdaBoostM1 0.746 / RandomForest 0.755 và 71 nghiên cứu PIMA (cải thiện
  1.45–30%, Table 7) → giá trị tham chiếu phương pháp luận cao.
- **Tái lập high**: method mô tả đủ chi tiết (IQR ngưỡng 1.5, %oversample, SMOTE k=5 Euclidean).

## Gap còn lại
- Accuracy tuyệt đối trên PIMA **thấp hơn baseline** (89.5% vs 94%) — không phải để vượt số,
  mà để bổ trợ về phương pháp luận.
- %oversample (500%/50%/90%) chọn arbitrarily, không tune → chưa rõ độ nhạy.
- IQR univariate ngưỡng 1.5 cố định có thể gắn nhãn sai ca lâm sàng hợp lệ.
- Không phổ quát: Naïve Bayes & SVM-RBF cải thiện không có ý nghĩa thống kê.
- PIMA 768 mẫu nhỏ, chỉ nữ Pima; không external validation y khoa; không code public; không XAI/deployment.

## Verdict
**promote** — Là peer/ablation đối lập trực tiếp của baseline gr2024 (giữ vs loại outlier) với
protocol chống leakage mẫu mực và venue/cite cao nhất nhóm; bổ trợ phương pháp luận cho baseline
chứ không trùng (acc thấp hơn nhưng vai trò tham chiếu khác).
