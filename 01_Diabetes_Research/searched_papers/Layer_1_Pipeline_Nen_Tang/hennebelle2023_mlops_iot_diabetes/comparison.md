# So sánh: hennebelle2023_mlops_iot_diabetes (Layer 1)

> Horizon: `cross_sectional`. So với baseline `gr2024_random_oversampling_diabetes` và so chéo
> với các ứng viên cùng layer (`nnamoko2020_outliers_imbalance`, `abnoosian2023_ensemble_multiclassifier`).
> Metric chỉ so trực tiếp khi CÙNG horizon + cùng/đè dataset. Cả 4 bài đều `cross_sectional`;
> dataset overlap với baseline & nnamoko là **PIMA**.

## Bảng đối chiếu

| Trục | hennebelle2023 (target) | gr2024 (baseline) | nnamoko2020 | abnoosian2023 |
|------|-------------------------|-------------------|-------------|---------------|
| Horizon | cross_sectional | cross_sectional | cross_sectional | cross_sectional |
| Trọng tâm | **MLOps / IoT-edge-blockchain end-to-end** | pipeline ML thuần | tiền xử lý outlier+imbalance | ensemble multi-class |
| Dataset | PIMA + Sylhet + **MIMIC-III (39k EHR thật)** | PIDD/PIMA + BRFSS | PIMA +3 khác | IPDD |
| Imbalance | SMOTE chỉ trên 70% train | Random Oversampling | SMOTE + khuếch đại outlier | trọng số AUC OVO |
| Feature select | RFECV (RF evaluator) | Boruta / PCA | IQR (không FS riêng) | MRMR / PCA / ICA |
| Model | RF / LR / SVM + GridSearchCV | RF + Boruta | C4.5 | Ensemble voting |
| Best metric | Acc **0.9723** Sylhet (RF+FS, S6.4); PIMA **0.7827**; MIMIC-III LR 0.7734 | Acc 94% PIDD (Table 6) | Acc 89.5% PIMA (Table 4) | Acc 0.9887 IPDD (Table 10) |
| Chống leakage | rõ (SMOTE chỉ trên train) | rủi ro | mẫu mực (fold từ data gốc) | mơ hồ |
| Code | Không | Không | Không | Không |
| Tái lập | medium | medium | high | medium |

## So metric trên dataset overlap (PIMA, cùng horizon)
- hennebelle PIMA RF+FS = **0.7827** (Section 6.4) < baseline gr2024 PIDD = **94%** (Table 6)
  < nnamoko PIMA C4.5 = **89.5%** (Table 4). hennebelle KHÔNG tối ưu accuracy (tối ưu vận hành)
  nên thấp nhất nhóm trên PIMA — so số chỉ để xác nhận đây không phải bài cải thiện accuracy.

## Trùng lặp
- **gr2024 (baseline)**: cùng Layer 1, cùng horizon, cùng PIMA, cùng dùng RF + feature selection +
  oversampling. Trùng phần "pipeline ML lõi" — nhưng hennebelle bọc thêm tầng ops.
- **nnamoko2020 / abnoosian2023**: cùng họ pipeline tiền xử lý + cân bằng lớp; nnamoko cũng dùng
  SMOTE. Trùng công cụ tiền xử lý, khác trọng tâm (ops vs phương pháp).

## Khác biệt / Vượt trội
- **MIMIC-III (39k mẫu EHR thật)**: dataset EHR lớn mà baseline (PIMA+BRFSS) và 2 ứng viên kia
  đều thiếu — bổ trợ độ phủ dữ liệu thực tế (dù đây vẫn là đóng góp gần Layer 3).
- **Kiến trúc triển khai end-to-end**: IoT-edge-AI-blockchain + MLOps + audit trail xuyên bệnh viện
  — tài liệu tham chiếu ops/deployment mà toàn bộ nhóm pipeline thuần thiếu (gần Layer 4).
- **Áp SMOTE đúng chỗ** (chỉ 70% train) → vá rủi ro leakage mà baseline gr2024 còn để ngỏ.
- Benchmark RF/LR/SVM thống nhất trên 3 dataset + khảo sát thiết bị đo từng risk factor.

## Gap còn lại
- **Accuracy không SOTA**: thấp nhất nhóm trên PIMA (0.78); MIMIC thấp (LR 0.7734) do nhãn ICD9
  nhiễu + chỉ 4 feature (2 chọn) → SMOTE phản tác dụng.
- **Blockchain/IoT chỉ là THIẾT KẾ**, không triển khai/đo throughput thật.
- **Báo cáo metric yếu**: precision/recall/AUC chỉ ở Fig 12-14 (không có bảng số) → nhiều ô UNKNOWN.
- Không code public; chỉ baseline ML (không ensemble/deep); 3 dataset chạy rời, chưa chứng minh
  tính liên bệnh viện.

## Verdict
**keep_in_searched** — Giá trị cao như bản thiết kế MLOps/triển khai + xử lý leakage đúng + có
MIMIC-III EHR thật mà baseline thiếu, nhưng đóng góp đo được mỏng (accuracy không SOTA, blockchain
chỉ định tính, metric yếu, không code) → giữ làm tài liệu tham chiếu ops, không phải baseline mô hình.
