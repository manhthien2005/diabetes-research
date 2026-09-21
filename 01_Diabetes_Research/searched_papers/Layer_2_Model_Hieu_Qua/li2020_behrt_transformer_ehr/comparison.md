# So sánh trong Layer 2 — li2020_behrt_transformer_ehr

> Baseline đã chọn của layer: **hasan2020_diabetes_prediction_ensembling** (cross_sectional, PIMA, ensemble AB+XB).
> Paper này: **li2020_behrt_transformer_ehr** — `prediction_horizon = long_term_risk`.
> **LƯU Ý §3b:** Paper này KHÁC HORIZON với baseline (long_term_risk vs cross_sectional) và khác hệ dataset hoàn toàn (CPRD EHR sequential 1.6M bệnh nhân vs PIMA 768 tabular). **KHÔNG so trực tiếp con số** — chỉ so cách tiếp cận. Chỉ so metric trực tiếp với paper CÙNG horizon trong layer (rasmy2021).

## Bảng đối chiếu

| Trục | hasan2020 (baseline) | li2020_behrt (paper này) | rasmy2021_medbert (cùng horizon) |
|------|----------------------|--------------------------|----------------------------------|
| Horizon | cross_sectional | **long_term_risk** | long_term_risk |
| Dataset | PIMA 768, tabular cross-sectional | CPRD-UK EHR, ~1.6M bệnh nhân, sequential | Cerner 28M + Truven, structured EHR |
| Method | Ensemble AB+XB, AUC-weighted soft voting | **Transformer encoder (BERT) + MLM pre-train**, fine-tune multi-label 301 bệnh | BERT + MLM + Prolonged-LOS pre-train |
| Bài toán | Binary ĐTĐ hiện tại | Multi-label 301 bệnh (next visit/6M/12M); ĐTĐ là 1/301 nhãn | Dự đoán bệnh tương lai (DHF, PaCa) |
| Best metric | AUC 0.950 (PIMA, 5-fold) — Table 7-9 | **APS 0.525 \| AUROC 0.958** (Next 6-month, CPRD) — Table 1 | AUC 85.39 (DHF-Cerner) — Table 4 |
| Code | Có (GitHub, 18⭐) | **Có** (deepmedicine/BEHRT) | Có (ZhiGroup/Med-BERT) |
| Dataset public | Có (Kaggle) | **Không** (CPRD cần giấy phép ISAC) | Không (Cerner/Truven cần DUA) |
| Citations | 433 (05/2026) | 526 (2026-06) | 824 (2026-06) |
| Reproducible | high | medium | medium |

## Trùng lặp
- **Với baseline hasan2020:** Gần như không trùng — khác horizon, khác dataset, khác cả họ mô hình (ensemble cây vs Transformer chuỗi). Điểm chung duy nhất: cùng Layer 2 (trọng tâm là mô hình/kiến trúc nâng accuracy).
- **Với rasmy2021_medbert (CÙNG horizon long_term_risk):** TRÙNG HƯỚNG MẠNH — cả hai là BERT-cho-EHR, cùng ý tưởng pre-train MLM trên cohort lớn rồi fine-tune dự đoán bệnh tương lai. rasmy2021 là **PEER trực tiếp** của li2020 (Med-BERT tự so sánh với BEHRT trong Table 1 của họ). Hai bài là cặp song sinh về phương pháp.

## Khác biệt / Vượt trội
- **So baseline (khác horizon — so cách tiếp cận):** li2020 mở ra một hướng HOÀN TOÀN MỚI mà baseline không phủ: dự đoán nguy cơ dài hạn từ chuỗi mã EHR longitudinal, dùng foundation-model (Transformer) thay ensemble cây. Đây là điểm bổ trợ cho kho (lấp horizon long_term_risk còn mỏng theo §3b), không phải cạnh tranh số với PIMA.
- **So rasmy2021 (cùng horizon — so được nhưng khác dataset):** li2020 là bài "khai phá" (đặt nền BEHRT đầu tiên), pre-train trên 1.6M; rasmy2021 mở rộng quy mô lên 28M, thêm cross-test ngoài nguồn (Truven) mà li2020 không có, và làm việc trên EHR structured. Về độ phủ + bằng chứng generalization, rasmy2021 nhỉnh hơn.

## Gap còn lại
- CPRD **không public** (giấy phép ISAC) + compute lớn (GPU Titan Xp, 1.6M bệnh nhân) → không tái lập y hệt.
- Chỉ dùng 4 concept (bỏ thuốc/xét nghiệm/đo lường); **không tách AUROC/APS riêng cho đái tháo đường** (ĐTĐ chỉ là 1/301 nhãn, số riêng nằm ở Fig.6/Suppl. S6) → không có "AUC dự đoán ĐTĐ" độc lập để đối chiếu.
- Không external validation ngoài UK; intra-visit order-invariant.

## Verdict
**promote** — Bổ trợ baseline ở horizon long_term_risk (kiến trúc foundation-model EHR, code public, 526 cite); nhưng nếu chỉ chọn 1 trong cặp BEHRT/Med-BERT thì rasmy2021 mạnh hơn (quy mô lớn hơn, có cross-test), nên ưu tiên promote rasmy2021 trước, li2020 promote như bài nền/khai phá đi kèm.
