# So sánh trong Layer 2 — wang2020_xgboost_t2d_beijing

> Baseline đã chọn của layer: **hasan2020_diabetes_prediction_ensembling** (cross_sectional, PIMA, ensemble AB+XB).
> Paper này: **wang2020_xgboost_t2d_beijing** — `prediction_horizon = cross_sectional`.
> **CÙNG horizon với baseline (cross_sectional) NHƯNG KHÁC DATASET** (khảo sát Bắc Kinh n=368 vs PIMA 768). Theo §3b/ràng buộc skill: so metric chỉ hợp lệ khi cùng horizon + cùng/đè dataset → **KHÔNG so thẳng AUC 0.9182 vs 0.950**, chỉ đối chiếu cách tiếp cận + chất lượng evaluation. Cùng horizon với khanam2021 (cũng khác dataset).

## Bảng đối chiếu

| Trục | hasan2020 (baseline) | wang2020 (paper này) | khanam2021 (cùng horizon) |
|------|----------------------|----------------------|----------------------------|
| Horizon | cross_sectional | cross_sectional | cross_sectional |
| Dataset | PIMA 768 (benchmark công khai) | **Khảo sát thực địa Bắc Kinh (Xicheng) n=368**, tự thu thập | PIMA 768 → 699 |
| Label | ĐTĐ hiện tại (PIMA) | T2D hiện tại (FPG≥7.0) | ĐTĐ hiện tại (PIMA) |
| Method | Ensemble AB+XB, AUC-weighted voting | **XGBoost (boosting) vs SVM/RF/KNN**, GridSearchCV | 7 ML + 3 NN, Pearson FS |
| Best metric | AUC 0.950 (5-fold) — Table 7-9 | **AUC 0.9182 ± 0.0130, Acc 0.8909 ± 0.0177** (10-fold) — Bảng 6 + §3.3.1 | NN Acc 88.6% (K-fold ~76%) — Bảng 8 |
| Evaluation | Stratified 5-fold + grid search | **10-fold CV, mean ± 95% CI** | 85/15 + K-fold, không seed |
| Triết lý chung | "boosting/ensemble thắng" | **"boosting (XGBoost) thắng classifier cổ điển"** | "so sánh model" |
| Code / data public | Có (GitHub, 18⭐) / Có (Kaggle) | **Không / Không** | Không / có (PIMA) |
| Citations | 433 (05/2026) | 138 (2026-06) | 378 (2026-06) |
| Reproducible | high | medium | medium |

## Trùng lặp
- **Với baseline hasan2020:** TRÙNG về thông điệp cốt lõi — cả hai chứng minh "**boosting/ensemble thắng classifier cổ điển**" trên dữ liệu cross-sectional, dùng GridSearchCV + CV. hasan2020 đã làm điều này tốt hơn và cite cao hơn.
- **Với khanam2021 (cùng horizon):** Cùng dạng "so sánh classifier trên dữ liệu cross-sectional", nhưng khác dataset. wang2020 báo cáo evaluation chuẩn hơn (mean±95%CI vs con số đỉnh không ổn định của khanam2021).

## Khác biệt / Vượt trội
- **Điểm mới bổ trợ:** Minh chứng "boosting thắng" trên **dữ liệu khảo sát lối sống thực địa NGOÀI PIMA** (phiếu khảo sát + tiền sử gia đình, không phải chỉ số sinh hóa cổ điển) — mở rộng tính khái quát của thông điệp baseline sang một loại feature/dataset khác.
- **Evaluation ổn định:** 10-fold CV lặp 10 lần với mean±95%CI — đáng tin hơn naz2020 (single-split 98%, cờ đỏ) và ổn định hơn con số đỉnh khanam2021.

## Gap còn lại
- **Mẫu rất nhỏ + mất cân bằng:** n=368 (108 dương/260 âm), ~37 mẫu/test fold → phương sai lớn; không có held-out test ngoài CV.
- GridSearchCV không nêu rõ có lồng trong CV → leakage nhẹ có thể; mất thông tin ordinal khi one-hot 7 mức tần suất; tổng số feature UNKNOWN.
- **Dữ liệu + code không public** → chỉ tái lập được phương pháp, không tái lập trên cùng dữ liệu; không XAI; không external validation.

## Verdict
**keep_in_searched** — Trùng thông điệp "boosting thắng" với baseline nên không cần promote, nhưng giữ lại làm bằng chứng bổ trợ rằng kết luận đúng cả NGOÀI PIMA (dữ liệu khảo sát thực địa, evaluation 10-fold mean±95%CI); điểm trừ là n=368 quá nhỏ và không có code/data public.
