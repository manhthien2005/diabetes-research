# So sánh trong Layer 2 — rasmy2021_medbert_ehr

> Baseline đã chọn của layer: **hasan2020_diabetes_prediction_ensembling** (cross_sectional, PIMA, ensemble AB+XB).
> Paper này: **rasmy2021_medbert_ehr** — `prediction_horizon = long_term_risk`.
> **LƯU Ý §3b:** Paper này KHÁC HORIZON với baseline (long_term_risk vs cross_sectional) và khác hệ dataset hoàn toàn (Cerner/Truven structured EHR 28M bệnh nhân vs PIMA 768 tabular). **KHÔNG so trực tiếp con số với baseline** — chỉ so cách tiếp cận. Chỉ so metric trực tiếp với paper CÙNG horizon (li2020_behrt).

## Bảng đối chiếu

| Trục | hasan2020 (baseline) | rasmy2021_medbert (paper này) | li2020_behrt (cùng horizon) |
|------|----------------------|-------------------------------|------------------------------|
| Horizon | cross_sectional | **long_term_risk** | long_term_risk |
| Dataset | PIMA 768, tabular | **Cerner Health Facts 28.49M + Truven**, structured EHR | CPRD-UK ~1.6M, sequential EHR |
| Method | Ensemble AB+XB, AUC-weighted voting | **BERT/Transformer + MLM + Prolonged-LOS pre-train**, fine-tune prediction head (FFL/GRU/Bi-GRU/RETAIN) | Transformer + MLM pre-train, multi-label 301 bệnh |
| Bài toán | Binary ĐTĐ hiện tại | Dự đoán bệnh tương lai: DHF (suy tim ở bệnh nhân type-II DM), PaCa | Multi-label 301 bệnh (next visit/6M/12M) |
| Best metric | AUC 0.950 (PIMA, 5-fold) — Table 7-9 | **AUC 85.39** (Bi-GRU+Med-BERT, DHF-Cerner) — Table 4 | APS 0.525 \| AUROC 0.958 (Next 6M, CPRD) — Table 1 |
| Cross-test ngoài nguồn | Không | **Có (Truven)** | Không |
| Code | Có (GitHub, 18⭐) | **Có** (ZhiGroup/Med-BERT + pytorch_ehr) | Có (deepmedicine/BEHRT) |
| Dataset public | Có (Kaggle) | **Không** (Cerner/Truven cần DUA) | Không (CPRD cần ISAC) |
| Citations | 433 (05/2026) | **824 (2026-06)** | 526 (2026-06) |
| Reproducible | high | medium | medium |

## Trùng lặp
- **Với baseline hasan2020:** Gần như không trùng — khác horizon, khác dataset, khác họ mô hình. Điểm chung: cùng Layer 2 (đóng góp ở kiến trúc/mô hình nâng hiệu năng).
- **Với li2020_behrt (CÙNG horizon long_term_risk):** TRÙNG HƯỚNG MẠNH — cùng ý tưởng BERT-cho-EHR, pre-train MLM trên cohort lớn rồi fine-tune dự đoán bệnh tương lai. rasmy2021 là **PEER trực tiếp** của li2020 và TỰ so sánh trong Table 1 của họ (vocab 82K vs 301, pretrain 28M vs 1.6M).

## Khác biệt / Vượt trội
- **So baseline (khác horizon — so cách tiếp cận):** rasmy2021 mang lại hướng foundation-model trên structured EHR cho dự đoán dài hạn — bổ trợ cho horizon long_term_risk còn mỏng (§3b), không cạnh tranh số với PIMA. Phát hiện quan trọng: pre-train quan trọng hơn kiến trúc (Med-BERT chưa pre-train thua cả LR ở PaCa), và với n<500 fine-tuning vẫn boost AUC >20% — bài học transfer-learning trực tiếp dùng được cho pipeline NCKH.
- **So li2020 (cùng horizon — so được nhưng khác dataset, không so thẳng AUC vì khác cohort/nhãn):** rasmy2021 vượt li2020 ở: (1) quy mô pre-train lớn hơn ~18 lần (28M vs 1.6M); (2) **có cross-test ngoài nguồn (Truven)** chứng minh generalization mà li2020 thiếu; (3) code public thật + đã convert sang PyTorch/HuggingFace dễ dùng lại. → Trong cặp BEHRT/Med-BERT, rasmy2021 là lựa chọn ưu tiên.

## Gap còn lại
- Cerner & Truven **không public** (cần DUA) + compute rất lớn (V100, ~1 tuần, >45M step) → không tái lập y hệt.
- Chỉ dùng diagnosis ICD (bỏ thuốc/lab/khoảng-thời-gian-giữa-visit); serialization theo priority chưa đáng tin.
- **KHÔNG có tác vụ "dự đoán mắc đái tháo đường" độc lập** — ĐTĐ chỉ là điều kiện đầu vào của cohort DHF (dự đoán biến chứng suy tim); metric phụ chỉ ở Supplementary. Với n<500 vẫn thua baseline LR.

## Verdict
**promote** — Foundation-model structured EHR có code public thật + cross-test ngoài nguồn + 824 cite, là bài MẠNH NHẤT cho horizon long_term_risk và là PEER vượt trội của li2020; nên promote TRƯỚC trong cặp BEHRT/Med-BERT để mở rộng kho sang dự đoán nguy cơ ĐTĐ dài hạn.
