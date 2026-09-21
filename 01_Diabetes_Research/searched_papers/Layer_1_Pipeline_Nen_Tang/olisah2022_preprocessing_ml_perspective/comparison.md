# So sánh: olisah2022_preprocessing_ml_perspective (Layer 1)

> Bài MỚI · `prediction_horizon = cross_sectional` · verdict phân tích = **strong**
> So với baseline đã chọn (gr2024) + 3 peer cùng Layer 1. Metric chỉ so trực tiếp
> khi **cùng horizon + cùng/đè dataset**; khác dataset → ghi rõ "không so thẳng".

## Bảng đối chiếu

| Trục | **olisah2022** (MỚI) | gr2024 (baseline) | nnamoko2020 (peer) | abnoosian2023 (peer) | hennebelle2023 (peer) |
|------|----------------------|-------------------|--------------------|----------------------|------------------------|
| Horizon | cross_sectional | cross_sectional | cross_sectional | cross_sectional | cross_sectional |
| Dataset | **PIMA** + LMCH (Iraq, 1000) | **PIMA**/PIDD + BRFSS | **PIMA** + 3 UCI khác | IPDD/Iraqi (993, 3 lớp) | **PIMA** + Sylhet + MIMIC-III |
| Trọng tâm preprocessing | **Spearman FS + Polynomial Regression bậc 7 imputation** (phi tuyến) | Mean imp → IQR → Random Oversampling → Boruta | IQR giữ+khuếch đại outlier → SMOTE | k-NN imp → MRMR/PCA/ICA → weighted-AUC voting | Loại missing/outlier → RFECV → SMOTE (chỉ train) |
| Cân bằng lớp | Không oversampling (relabel thêm prediabetes) | Random Oversampling | Outlier-aware SMOTE | Trọng số AUC OVO (không SMOTE) | SMOTE chỉ trên 70% train |
| Model chính | RF/ORF, SVM-rbf, **2GDNN** | Random Forest | C4.5 (NB/SVM/RIPPER) | Ensemble voting 6 base-MLM | RF/LR/SVM |
| Best acc (PIMA) | **ORF 100%** (⚠️ leakage); RF 97.93%; O2GDNN 97.25% | **94%** | 89.5% (C4.5) | — (không chạy PIMA) | **0.7827** (RF+FS) |
| Best acc (dataset khác) | LMCH 97.33% (O2GDNN) | BRFSS 92% | — | IPDD 98.87% (3 lớp micro-avg) | Sylhet 0.9723; MIMIC 0.7734 |
| Code public | **Có** (GitHub, MIT, notebooks+data) | Không | Không | Không | Không |
| Chống leakage | ⚠️ nghi vấn (relabel theo glucose + ORF 100%) | ⚠️ rủi ro (oversample trước split?) | ✔ rõ (fold từ data gốc) | ⚠️ mơ hồ | ✔ SMOTE chỉ trên train |
| Reproducible | high | medium | high | medium | medium |
| Citations | 240 | 12 | 154 | 118 | — |

### So metric trực tiếp (CÙNG horizon + đè PIMA)

- **olisah RF 97.93% vs gr2024 94% vs nnamoko 89.5% vs hennebelle 0.7827** — đều trên PIMA, cùng cross_sectional → so được. olisah RF/2GDNN cao nhất nhóm; nhưng ORF 100% là dấu hiệu leakage nên **không tính là con số đáng tin**, và olisah **relabel theo ngưỡng glucose** (thêm lớp prediabetes) nên đường base PIMA của olisah KHÁC định nghĩa nhãn so với gr2024/nnamoko/hennebelle (nhị phân thuần) → chênh accuracy một phần do circularity nhãn, không hoàn toàn do preprocessing tốt hơn.
- **abnoosian 98.87%**: KHÁC dataset (IPDD, không PIMA) + 3 lớp micro-avg bão hoà → **không so thẳng** với olisah.
- **LMCH (olisah) vs IPDD (abnoosian)**: cả hai là dataset bệnh viện Iraq nhưng KHÁC nguồn/quy mô (LMCH 1000 vs IPDD 993) → không so con số.

## Trùng lặp

- **gr2024, nnamoko2020, hennebelle2023**: cùng Layer 1 + cùng horizon cross_sectional + cùng benchmark **PIMA** + cùng bài toán "pipeline tiền xử lý → classifier" → trùng MỤC TIÊU và sân chơi dataset với olisah.
- **abnoosian2023**: trùng ý tưởng "preprocessing đầy đủ cho dữ liệu lệch lớp + đa lớp ĐTĐ", và cùng dùng dataset bệnh viện Iraq (LMCH/IPDD) → trùng hướng dataset phụ + multi-class framing.

## Khác biệt / Vượt trội (của olisah)

- **Góc preprocessing mới**: imputation **phi tuyến bằng polynomial regression bậc 7** + feature selection **Spearman** — khác hẳn mean/IQR/oversampling (gr2024), outlier-SMOTE (nnamoko), k-NN/MRMR-voting (abnoosian), RFECV/SMOTE (hennebelle). Đây là trục đóng góp KHÔNG bị các peer phủ.
- **CÓ CODE PUBLIC** (GitHub MIT, notebooks + data) — là bài **duy nhất** trong cả 5 bài có repo → tái lập cao nhất (high), trong khi 4 bài còn lại đều không có code.
- **Chứng minh nguồn gốc cải thiện**: ablation FS có/không (+4% RF, Table 5) và PR vs Mean/Median/MICE (+1.2~2.5%, Table 6) → quy được cải thiện accuracy về preprocessing, điều gr2024/hennebelle không tách bạch.
- **Highly-cited nhất** (240 vs 154/118/12) + venue mạnh (CMPB) → giá trị tham chiếu cao.
- **Bao phủ 2 dataset** (PIMA + LMCH bệnh viện) như hennebelle/gr2024 (đa dataset), hơn nnamoko (PIMA y khoa duy nhất) và abnoosian (1 dataset).

## Gap còn lại (olisah CHƯA giải quyết)

- **Leakage/circularity nghiêm trọng hơn các peer chống-leakage**: ORF 100% + relabel theo glucose → accuracy nghi bị thổi phồng. nnamoko2020 (fold từ data gốc) và hennebelle2023 (SMOTE chỉ trên train) có **protocol chống leakage rõ ràng hơn** — đây là điểm olisah THUA.
- **Không external validation** — giống gr2024/abnoosian; chỉ 2 dataset đặc thù (PIMA chỉ nữ Phoenix, LMCH chỉ Iraq).
- **Imputation PR đơn biến** (chỉ Glucose → Insulin) — bỏ tương tác đa biến.
- **Không XAI / deployment** — hennebelle2023 đã phủ trục ops/MLOps mà olisah thiếu; cả nhóm Layer 1 đều thiếu Layer 4 (cơ hội mở rộng SHAP).
- **2GDNN heuristic** ("grow by two") thiếu lý giải lý thuyết và vẫn thua ORF trên PIMA.

## Verdict

**promote** — Bài mới đem một trục preprocessing NEW (Spearman + polynomial-regression imputation phi tuyến) không trùng peer nào, là bài **duy nhất có code public** trong Layer 1, highly-cited nhất (240) và đo accuracy cao nhất nhóm trên PIMA; rủi ro leakage/circularity là điểm cần soi khi tái lập chứ không phủ định giá trị baseline.
