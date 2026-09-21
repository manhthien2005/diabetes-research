# 🗳️ DECISION BOARD — duyệt promote (chuẩn bị cho buổi quyết định)

> Sinh bởi Claude qua `paper-comparator` (fan-out). **GỢI Ý, không phải quyết định.** Theo §4: **chỉ anh** promote.
> Cập nhật **2026-06-21**: đã gate thêm 5 bài closed (4 đạt + 1 loại). Bài 🆕 = mới qua gate hôm nay.

## ⭐ Shortlist nên promote (9 bài) — xếp theo ưu tiên lấp horizon

| # | paper_id | Layer | Horizon | Vì sao promote |
|---|---|---|---|---|
| 1 | **lugner2024_top_ten_predictors** | L3 | long_term_risk | Ứng viên neo CHÍNH cho long_term_risk (UK Biobank 448k, incidence 10 năm, SHAP top-10) — lấp đúng horizon đang trống và bridge sang Layer 4 XAI; nên promote TRƯỚC fazakis cùng horizon. |
| 2 | **rasmy2021_medbert_ehr** | L2 | long_term_risk | Foundation-model structured EHR (BERT, 28M bệnh nhân) có code public thật + cross-test ngoài nguồn (Truven) + 824 cite, lấp horizon long_term_risk mà baseline cross_sectional không phủ và là PEER vượt trội của li2020. |
| 3 | **deberneh2021_korean_ehr_nextyear** | L3 | early_detection | Bài neo hiếm cho early_detection ĐÚNG NGHĨA (feature năm Y dự đoán onset Y+1, đa lớp normal/prediabetes/diabetes) — bổ trợ trực tiếp cho gap leakage cross-sectional của baseline dinh2019. |
| 4 | **nnamoko2020_outliers_imbalance** | L1 | cross_sectional | Peer/ablation đối lập trực tiếp của baseline (GIỮ+khuếch đại outlier vs gr2024 LOẠI outlier) trên cùng dataset PIMA, có protocol chống leakage mẫu mực (fold từ data gốc + McNemar) vá đúng lỗ hổng baseline và venue/cite cao nhất nhóm — bổ trợ phương pháp luận, không trùng. |
| 5 | **olisah2022_preprocessing_ml_perspective** 🆕 | L1 | cross_sectional | NEW: đem trục preprocessing phi tuyến (Spearman FS + polynomial-regression imputation) không bài Layer 1 nào phủ, lại là bài DUY NHẤT có code public và highly-cited nhất (240). |
| 6 | **li2020_behrt_transformer_ehr** | L2 | long_term_risk | Transformer/BERT khai phá cho chuỗi EHR (CPRD 1.6M), code public, 526 cite — bổ trợ horizon long_term_risk; nhưng yếu hơn rasmy2021 (không cross-test, quy mô nhỏ hơn) nên promote như bài nền đi kèm sau rasmy2021. |
| 7 | **fazakis2021_longterm_t2d_risk** | L3 | long_term_risk | Bài neo long_term_risk thứ hai (onset 2 năm cohort dọc ELSA + ensemble tối ưu trọng số NSGA-II + so FINDRISC/Leicester), bổ sung cho lugner2024 ở góc cohort nhỏ/cửa-sổ-ngắn nhưng promote sau lugner vì mẫu nhỏ hơn ~220 lần và không SHAP. |
| 8 | **zhang2020_henan_rural_cohort** | L3 | cross_sectional | Bổ sung quần thể nông thôn châu Á còn thiếu (Henan 36.652) + SHAP global (phát hiện yếu tố mới urine/sweet flavor) + dùng SMOTE thay vì vứt mẫu — 3 điểm bổ trợ baseline; nhưng ưu tiên sau các bài lấp horizon còn-trống vì cross_sectional đã đông. |
| 9 | **nipa2023_clinically_adaptable** | L4 | early_detection | Ứng viên DUY NHẤT lấp horizon early_detection cho Layer 4 (đang mỏng theo §3b) với góc độc đáo SHAP early-features + tự thu dataset thích ứng lâm sàng mà baseline cross_sectional không phủ; promote vì giá trị phủ horizon, không vì số liệu (validation tự nhận overfit, không CV/code). |

_Tổng 9 bài gợi ý promote. Baseline đang có: gr2024 · hasan2020 · dinh2019 · tasin2022._

## Layer 1 — Pipeline Nền Tảng
**Baseline đã chọn:** `gr2024_random_oversampling_diabetes`

| Khuyến nghị | paper_id | Horizon | Verdict | Metric chính (nguồn) | Trùng/bổ trợ |
|---|---|---|---|---|---|
| 🟢 PROMOTE | nnamoko2020_outliers_imbalance | cross_sectional | strong | C4.5 (IQRd+SMOTEd) PIMA: Acc 89.5% (Table 4); AUC 94.6% / G-mean 88.8% (Table 8); McNemar p<0.0001 (Table 5-6) | gr2024, hennebelle2023 |
| 🟢 PROMOTE | olisah2022_preprocessing_ml_perspective 🆕 | cross_sectional | strong | ORF 100% test acc trên PIMA (Table 7 — cảnh báo overfit/leakage); RF 97.93% test acc & F1 trên PIMA (Table 7); O2GDNN 97.33% test acc trên LMCH (Table 9) | gr2024, nnamoko2020, hennebelle2023, abnoosian2023 |
| 🟡 GIỮ | abnoosian2023_ensemble_multiclassifier | cross_sectional | maybe | Ensemble weighted-voting IPDD: Acc 0.9887 (Table 10), AUC 0.999 / F1 0.985 (Table 9, micro-avg 3 lớp) | gr2024 |
| 🟡 GIỮ | hennebelle2023_mlops_iot_diabetes | cross_sectional | maybe | RF+FS Sylhet Acc 0.9723 (S6.4); PIMA RF+FS 0.7827; MIMIC-III LR 0.7734 (RF 0.7703) | gr2024, nnamoko2020 |

**Nhận định layer:** Promote TRƯỚC nnamoko2020: là peer/ablation đối lập trực tiếp của baseline gr2024 trên cùng PIMA (giữ vs loại outlier) với protocol chống leakage mẫu mực và cite cao nhất (154) — bổ trợ phương pháp luận chứ không trùng số. Cả 4 bài đều cross_sectional nên độ phủ horizon của Layer 1 đang dồn hết về cross_sectional, thiếu hẳn early_detection và long_term_risk. abnoosian2023 (chiến lược cân bằng bằng trọng số AUC, không SMOTE) và hennebelle2023 (MLOps + MIMIC-III EHR) đáng giữ làm đối chứng ý tưởng/ops nhưng không nên làm nền tảng vì accuracy bão hoà nghi/thấp và rủi ro leakage hoặc đóng góp đo được mỏng.

**➕ Cập nhật 06-21:** olisah2022 (🆕, có code public + 240 cite, RF 97.93% PIMA) — promote-worthy nhưng LƯU Ý leakage/circularity (ORF 100% + relabel theo glucose) → con số có thể thổi phồng.

## Layer 2 — Model Hiệu Quả
**Baseline đã chọn:** `hasan2020_diabetes_prediction_ensembling`

| Khuyến nghị | paper_id | Horizon | Verdict | Metric chính (nguồn) | Trùng/bổ trợ |
|---|---|---|---|---|---|
| 🟢 PROMOTE | rasmy2021_medbert_ehr | long_term_risk | strong | AUC 85.39 (Bi-GRU+Med-BERT, DHF-Cerner — Table 4); boost vs SOTA 1.21-6.14% (Abstract) | li2020 |
| 🟢 PROMOTE | li2020_behrt_transformer_ehr | long_term_risk | strong | APS 0.525 \| AUROC 0.958 (BEHRT, Next 6-month, CPRD — Table 1) | rasmy2021 |
| 🟡 GIỮ | wang2020_xgboost_t2d_beijing | cross_sectional | maybe | AUC 0.9182 ± 0.0130, Acc 0.8909 ± 0.0177 (Beijing Xicheng survey, 10-fold — Bảng 6 + §3.3.1) | khanam2021 |
| 🟡 GIỮ | yang2021_bigdata_physical_exam_fusion 🆕 | early_detection | maybe | AUC 0.8763 (Test) / 0.8713 (5-fold CV) — XGBoost, 6 feature trên EHR Luzhou 1.5M mẫu (Table 4, §3.2). Abstract 0.8768; Table 7 ghi 0.881. Acc 0.806, Recall 0.738, Spec 0.847. | wang2020 |
| 🟡 GIỮ | lu2021_patient_network_t2dm 🆕 | early_detection | maybe | RF: AUC 0.91, Accuracy 84.95% (CBHS claim, 80/20 + 10-fold CV — Table 2 + Discussion §4); XGBoost AUC 0.8950 (§3.2); dải AUC 8 model 0.79–0.91 | wang2020, yang2021 |
| 🟠 TRÙNG | khanam2021_comparison_ml_pima | cross_sectional | maybe | NN 2HL @400 epoch Acc 88.6% (Bảng 8); best ML KNN & AdaBoost 79.42% (Bảng 6); K-fold thực ~76% | wang2020 |

**Nhận định layer:** Promote rasmy2021_medbert_ehr TRƯỚC (bài mạnh nhất cho long_term_risk: code public, cross-test ngoài nguồn, 824 cite, PEER vượt trội của li2020), rồi li2020_behrt như bài nền foundation-model đi kèm — cặp này lấp đúng horizon long_term_risk mà baseline hasan2020 (cross_sectional/PIMA) không phủ. Ở horizon cross_sectional, baseline đã đủ mạnh: khanam2021 trùng/redundant với baseline (cùng PIMA, yếu hơn), wang2020 chỉ keep_in_searched làm bằng chứng bổ trợ 'boosting thắng' ngoài PIMA. Còn thiếu: chưa có bài long_term_risk nào tách metric dự đoán ĐTĐ độc lập (cả 2 EHR đều coi ĐTĐ là 1 nhãn/điều kiện cohort) và toàn bộ dataset EHR đều gated — nên bổ sung thêm bài long-term có metric ĐTĐ riêng + dataset public nếu có thể.

**➕ Cập nhật 06-21:** yang2021 (🆕) + lu2021 (🆕) đều early_detection, EHR thật quy mô lớn (1.5M / claim) — LẤP horizon early_detection mà L2 trước thiếu; nhưng cả hai repro Low (data private + no code) → bổ sung, không thay baseline.

## Layer 3 — Dataset EHR
**Baseline đã chọn:** `dinh2019_data_driven_nhanes`

| Khuyến nghị | paper_id | Horizon | Verdict | Metric chính (nguồn) | Trùng/bổ trợ |
|---|---|---|---|---|---|
| 🟢 PROMOTE | deberneh2021_korean_ehr_nextyear | early_detection | strong | Accuracy 0.73 / F1 0.74 / MCC 0.60 (RF&SVM, Table 2); diabetes precision 90% (Table 3); KHÔNG báo AUC | lai2019 |
| 🟢 PROMOTE | fazakis2021_longterm_t2d_risk | long_term_risk | strong | AUC 0.884 inductive / 0.888 transductive (Table 5); vượt FINDRISC 0.821 & Leicester 0.788 (line 689-690) | lugner2024 |
| 🟢 PROMOTE | lugner2024_top_ten_predictors | long_term_risk | strong | ROC-AUC 0.903 main 419-feature (Table 3); reduced top-10 0.881; Sensitivity 0.62; PR-AUC 0.29 | fazakis2021 |
| 🟢 PROMOTE | zhang2020_henan_rural_cohort | cross_sectional | strong | AUC 0.872 lab (95% CI 0.858-0.886, GBM, Table 4); no-lab 0.817; vượt New Chinese DRS 0.728 (Suppl Fig 1) | agliata2023 |
| 🟡 GIỮ | lai2019_predictive_models_diabetes | early_detection | strong | GBM AROC 84.7% (sens 71.6%, spec 83.7%, Table 3); LR 84.0%; DeLong GBM≈LR p=0.081 (Table 6) | deberneh2021, dinh2019 |
| 🟡 GIỮ | agliata2023_nhanes_mimic_ann | cross_sectional | maybe | ROC AUC 0.934 (ensemble, Fig 3); Accuracy ~86%; Brier 0.101 (Section 2.6) | zhang2020, dinh2019 |
| 🟡 GIỮ | nguyen2019_wide_deep_onset 🆕 | long_term_risk | maybe | Ensemble no-SMOTE: AUC 84.13% · Accuracy 84.28% · Sensitivity 31.17% · Specificity 96.85% trên Practice Fusion (Table 3, ROC Fig 6) | lugner2024, fazakis2021 |

**Nhận định layer:** Promote TRƯỚC theo thứ tự lấp horizon còn mỏng: (1) lugner2024 — neo chính long_term_risk (UK Biobank 448k, incidence 10 năm, SHAP, bridge XAI); (2) deberneh2021 — neo early_detection đúng nghĩa (onset Y+1), trám gap leakage cross-sectional của baseline; (3) fazakis2021 — neo long_term_risk thứ hai bổ trợ lugner; (4) zhang2020 — cross_sectional mạnh, bổ sung quần thể nông thôn châu Á + SHAP + SMOTE. Sau khi promote 4 bài này, layer phủ đủ cả 3 horizon (cross_sectional baseline-adjacent, early_detection, long_term_risk). lai2019 và agliata2023 giữ ở searched (cùng horizon đã có bài mạnh hơn / không vượt số). Còn thiếu: bài có public code + external validation đa nguồn + local SHAP (toàn nhánh đều không code, không external validation), và horizon long_term_risk vẫn còn ít — nên ưu tiên tìm thêm cohort dọc có code reproducible.

**➕ Cập nhật 06-21:** nguyen2019 (🆕) Wide&Deep deep-tabular trên EHR (long_term_risk) — method mới nhưng AUC ~84% thấp nhất nhóm, sensitivity 31%, repro Low → giữ, không vượt bài long_term đã promote.

## Layer 4 — XAI & Triển Khai
**Baseline đã chọn:** `tasin2022_diabetes_prediction_explainable`

| Khuyến nghị | paper_id | Horizon | Verdict | Metric chính (nguồn) | Trùng/bổ trợ |
|---|---|---|---|---|---|
| 🟢 PROMOTE | nipa2023_clinically_adaptable | early_detection | maybe | SDHD: ET Acc 97.11% / F1 98.10% / AUROC 96.67% (Table 2); PDD: MLP 96.42%; MDD: HGBC&LGBM 94.90% / AUROC 94.92% (Table 3) — khác horizon, KHÔNG so với baseline | kaliappan2024 |
| 🟡 GIỮ | ahmed2024_lime_shap_comparison | cross_sectional | maybe | Logistic Regression Accuracy 86% trên test BRFSS-2015 (Abstract + Sec III-B + Conclusion); SHAP HighBP +6.4 đpt, GenHlth +6.0 đpt (Figure 8); AUC/F1 số UNKNOWN | dharmarathne2024, kaliappan2024 |
| 🟡 GIỮ | dharmarathne2024_self_explainable_interface | cross_sectional | maybe | XGB Acc 0.77 test / 0.80 train; AUC 0.82 test / 0.856 train; F1 0.65/0.68; FPR 0.20; ít FN nhất 13 test (Table 2 + Sec 4.1, Fig. 3) | tasin2022, kaliappan2024 |
| 🟡 GIỮ | kaliappan2024_featsel_diverse_datasets | cross_sectional | maybe | Random Forest Acc 0.990 / Prec 0.991 / Rec 0.990 / F1 0.993 trên Dataset-3 & Dataset-1 không FS (Table 8); PIMA-augment RF/XGB 0.982; stacking 0.963-0.982 (Table 10) | ahmed2024, dharmarathne2024, nipa2023 |

**Nhận định layer:** Nên promote TRƯỚC nhất nipa2023_clinically_adaptable vì nó là ứng viên duy nhất lấp horizon early_detection — phần đang mỏng của kho (§3b) — trong khi baseline tasin2022 và 3 ứng viên còn lại đều cross_sectional; promote vì giá trị phủ horizon + góc tự-thu-data/thích-ứng-lâm-sàng, KHÔNG vì số (paper tự nhận overfit, không CV/code). Ba ứng viên cross_sectional (ahmed2024 = đối chiếu LIME vs SHAP, dharmarathne2024 = interface tự-giải-thích SHAP local, kaliappan2024 = feature selection đa-dataset) đều BỔ TRỢ baseline ở từng góc XAI riêng nhưng đều thiếu CV/code/deploy và bị baseline tasin2022 bao trùm vai trò pipeline+deploy, nên giữ keep_in_searched làm tài liệu tham chiếu phương pháp. Còn thiếu: layer chưa có bài long_term_risk và chưa có bài XAI nào với validation chuẩn (K-fold/nested CV) + giá trị Shapley định lượng + code public ngoài chính baseline.

**➕ Cập nhật 06-21:** xu2025 đã LOẠI ở gate (§7: 27<30 cite) — không đưa vào layer này.

## 🚪 Kết quả GATE 5 bài closed (2026-06-21)

| paper_id | Layer | Gate | Lý do |
|---|---|---|---|
| olisah2022_preprocessing_ml_perspective | L1 | ✅ ĐẠT → promote-worthy | §7 ✓ (240 cite); có code public; strong; nhưng cảnh báo leakage |
| nguyen2019_wide_deep_onset | L3 | ✅ ĐẠT → giữ | §7 ✓ (161); method mới (Wide&Deep) nhưng repro Low, AUC thấp |
| yang2021_bigdata_physical_exam_fusion | L2 | ✅ ĐẠT → giữ | §7 ✓ (189); lấp early_detection nhưng data private/no code |
| lu2021_patient_network_t2dm | L2 | ✅ ĐẠT → giữ | §7 ✓ (137); graph novelty nhưng data private/no code |
| xu2025_label_noise_local_explanation | L4 | 🔴 LOẠI | §7 ✗: 27<30 cite (1–3y). BORDERLINE — báo em nếu muốn un-reject |

## 📌 Lưu ý xuyên suốt
- **3 bài mới (yang2021, lu2021, nguyen2019) đều repro Low** (data private + no code) → giá trị tham chiếu method, khó tái lập.
- **olisah2022** hiếm có CODE PUBLIC ở L1 — nhưng có rủi ro leakage (ORF 100%); promote thì nên ghi chú giới hạn.
- **xu2025** chỉ thiếu 3 cite (~2 tháng nữa đạt) + venue đỉnh + hướng mới → anh có thể yêu cầu giữ lại.
- **Khoảng trống lớn nhất (= cơ hội đề tài):** gần như không bài nào có *public code + external validation + local SHAP* cùng lúc.
