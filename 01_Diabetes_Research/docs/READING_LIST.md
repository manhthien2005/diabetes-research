# 📚 READING LIST — Thứ tự đọc & lọc dần (31 bài)

> Sinh bởi Claude 2026-07-05. **Mục đích:** xếp các bài theo *giá trị đọc chiến lược* để anh đọc từ trên xuống,
> tick ✅ khi đã đọc, ghi chú "giữ / loại / trích ý gì" bên cạnh. Đây là thứ tự ĐỌC, khác `DECISION_BOARD.md` (gợi ý promote).
>
> Mỗi mục: **`paper_id`** (khớp thư mục `searched_papers/`) + *tiêu đề đầy đủ in nghiêng* + năm · venue.
> ✅ **Cả 31 bài đều đã có sẵn PDF local** (`source.pdf` trong folder) + đã trích text + phân tích — đọc thẳng trong webapp, KHÔNG cần tự tải. Tiêu đề in nghiêng chỉ để nhận diện/đối chiếu/trích dẫn (nếu muốn mở bản gốc trên web). *(Bài duy nhất còn chờ tải tay là `islam2019` — không nằm trong list này.)*
>
> **Tiêu chí xếp hạng (neo vào mũi nhọn QA_LOG Q001–Q004):**
> 1. Nuôi trực tiếp mũi nhọn: chống leakage · external/cross-cohort validation · đánh giá trung thực (PR-AUC/calibration/PPV theo prevalence) · EHR/cohort thật · code công khai.
> 2. Lấp horizon mỏng: `long_term_risk` & `early_detection` > `cross_sectional` (đã bão hoà PIMA/BRFSS).
> 3. Tái lập được: code public + external là hiếm nhất → giá trị cao nhất.
> 4. Chất lượng tín hiệu: cohort thật + metric trung thực > accuracy 99% trên PIMA (red flag).
> 5. Ảnh hưởng (citations) làm tiêu chí phụ cho bài nền tảng.
>
> Ký hiệu: ⭐ = baseline hiện tại · 🟢 code public · 🔴 red-flag leakage/thổi phồng (đọc như case-study) · L = Layer · [horizon].

---

## ⭐ Baseline xương sống — PHẢI nắm chắc (anh xây dựng TRÊN 4 bài này)

- [ ] **gr2024_random_oversampling_diabetes** — *Random Oversampling-Based Diabetes Classification via Machine Learning Algorithms* (2024 · Int. Journal of Computational Intelligence Systems)
  L1 · cross_sectional · Random Oversampling→Boruta→RF (PIDD 94% / BRFSS 92%). Đọc để critique: oversample có nằm sau split không? Không code, không external.
- [ ] **hasan2020_diabetes_prediction_ensembling** — *Diabetes Prediction Using Ensembling of Different Machine Learning Classifiers* (2020 · IEEE Access)
  L2 · cross_sectional · 🟢 AUC-weighted soft-voting (AdaBoost+XGBoost), AUC 0.950 PIMA. Mẫu ensemble sạch + có code. Giới hạn: chỉ PIMA 768, không external.
- [ ] **dinh2019_data_driven_nhanes** — *A data-driven approach to predicting diabetes and cardiovascular disease with machine learning* (2019 · BMC Medical Informatics and Decision Making)
  L3 · early/cross · NHANES công khai, XGBoost AUC 0.957 (có lab) → 0.737 (no-lab): bài học trung thực về "bỏ lab thì tụt bao nhiêu".
- [ ] **tasin2022_diabetes_prediction_explainable** — *Diabetes prediction using machine learning and explainable AI techniques* (2022 · Healthcare Technology Letters)
  L4 · cross_sectional · 🟢 pipeline end-to-end DUY NHẤT có code+SHAP+LIME+web/Android deploy (Acc 81%/AUC 0.84). Khuôn mẫu Layer 4.

---

## 🥇 Tier 1 — Đọc đầu tiên: nền mũi nhọn (long-term + code + external)

- [ ] **rasmy2021_medbert_ehr** — *Med-BERT: pretrained contextualized embeddings on large-scale structured electronic health records for disease prediction* (2021 · npj Digital Medicine)
  L2 · long_term · 🟢 **Chuẩn vàng của mũi nhọn**: Med-BERT trên 28M bệnh nhân, code public, cross-test NGOÀI nguồn (Cerner→Truven), 824 cite. Đọc kỹ nhất.
- [ ] **lugner2024_top_ten_predictors** — *Identifying top ten predictors of type 2 diabetes through machine learning analysis of UK Biobank data* (2024 · Scientific Reports)
  L3 · long_term · UK Biobank 448k, incidence 10 năm, SHAP top-10, **báo cáo trung thực PR-AUC 0.29 / Sens 0.62** dù Acc 0.92 — đúng tinh thần đánh giá thật dưới imbalance thật.
- [ ] **li2020_behrt_transformer_ehr** — *BEHRT: Transformer for Electronic Health Records* (2020 · Scientific Reports)
  L2 · long_term · 🟢 BEHRT/Transformer trên CPRD 1.6M, code public, 526 cite. Đọc cặp với rasmy2021.
- [ ] **deberneh2021_korean_ehr_nextyear** — *Prediction of Type 2 Diabetes Based on Machine Learning Algorithm* (2021 · Int. Journal of Environmental Research and Public Health)
  L3 · early_detection · Thiết kế early_detection SẠCH NHẤT: feature năm Y → onset Y+1 (không cross-sectional) → vá đúng gap leakage. Repro thấp nhưng ý tưởng nhãn thời gian là quan trọng nhất.

---

## 🥈 Tier 2 — Phương pháp mũi nhọn + lấp horizon mỏng

- [ ] **alghamdi2017_smote_fit_project** — *Predicting diabetes mellitus using SMOTE and ensemble machine learning approach: The Henry Ford ExercIse Testing (FIT) project* (2017 · PLOS ONE)
  L1 · long_term · Cohort FIT thật 32.555, nhãn 5 năm, Vote ensemble AUC 0.922. Bài L1 long_term DUY NHẤT trên cohort thật + case-study SMOTE-trong-hay-ngoài-fold. *(vừa sửa xong summary)*
- [ ] **nnamoko2020_outliers_imbalance** — *Efficient treatment of outliers and class imbalance for diabetes prediction* (2020 · Artificial Intelligence in Medicine)
  L1 · cross_sectional · **Protocol chống leakage mẫu mực** (fold từ data gốc + McNemar), repro=high, 154 cite. Đọc để lấy chuẩn phương pháp.
- [ ] **lai2019_predictive_models_diabetes** — *Predictive models for diabetes mellitus using machine learning techniques* (2019 · BMC Endocrine Disorders)
  L3 · early_detection · Cost-sensitive imbalance (FN:FP=3:1), DeLong test GBM≈LR, cross-check PIMA. Phương pháp thống kê chắc tay.
- [ ] **fazakis2021_longterm_t2d_risk** — *Machine Learning Tools for Long-Term Type 2 Diabetes Risk Prediction* (2021 · IEEE Access)
  L3 · long_term · Cohort dọc ELSA, **so trực tiếp với clinical scores FINDRISC/Leicester** (AUC 0.884 vs 0.821/0.788) — chuẩn so sánh y khoa nên học.
- [ ] **phan2025_remed_t2d_ensemble** — *REMED-T2D: A robust ensemble learning model for early detection of type 2 diabetes using healthcare dataset* (2025 · Computers in Biology and Medicine)
  L2 · early_detection · REMED-T2D robust ensemble, strong, mới (7 cite). Bài early_detection mạnh, đáng đọc để cập nhật SOTA gần.
- [ ] **zhang2020_henan_rural_cohort** — *Machine learning for characterizing risk of type 2 diabetes mellitus in a rural Chinese population: the Henan Rural Cohort Study* (2020 · Scientific Reports)
  L3 · cross_sectional · Cohort nông thôn châu Á 36.652, SHAP phát hiện yếu tố mới, **báo cáo AUPR 0.546/PPV thật**. Đa dạng quần thể + metric trung thực.

---

## 🥉 Tier 3 — Đọc để đối chiếu / rút bài học

- [ ] **olisah2022_preprocessing_ml_perspective** — *Diabetes mellitus prediction and diagnosis from a data preprocessing and machine learning perspective* (2022 · Computer Methods and Programs in Biomedicine)
  L1 · cross_sectional · 🟢🔴 Có code public NHƯNG ORF 100% + relabel theo glucose = **case-study leakage/circularity kinh điển**. Đọc để lấy dẫn chứng "số thổi phồng thế nào".
- [ ] **agliata2023_nhanes_mimic_ann** — *Machine Learning as a Support for the Diagnosis of Type 2 Diabetes* (2023 · Int. Journal of Molecular Sciences)
  L3 · cross_sectional · Hợp nhất NHANES+MIMIC-III/IV + **báo Brier 0.101 (calibration)**. Mẫu harmonize đa nguồn + calibration.
- [ ] **yang2021_bigdata_physical_exam_fusion** — *Risk Prediction of Diabetes: Big data mining with fusion of multifarious physical examination indicators* (2021 · Information Fusion)
  L2 · early_detection · EMR thật 1.5M, cascade screening 3 tầng, AUC 0.876. Quy mô lớn nhưng data private/no code.
- [ ] **nipa2023_clinically_adaptable** — *Clinically adaptable machine learning model to identify early appreciable features of diabetes* (2023 · Intelligent Medicine)
  L4 · early_detection · Bài L4 early_detection DUY NHẤT, SHAP early-features, tự thu data thích ứng. Đọc vì góc horizon, không vì số (tự nhận overfit).
- [ ] **wang2020_xgboost_t2d_beijing** — *Prediction of Type 2 Diabetes Risk and Its Effect Evaluation Based on the XGBoost Model* (2020 · Healthcare)
  L2 · cross_sectional · Bằng chứng boosting thắng classic NGOÀI PIMA (khảo sát Bắc Kinh, AUC 0.918). Nhỏ (n=368).

---

## 🗂️ Tier 4 — Tham chiếu phương pháp, ưu tiên thấp

- [ ] **abnoosian2023_ensemble_multiclassifier** — *Prediction of diabetes disease using an ensemble of machine learning multi-classifier models* (2023 · BMC Bioinformatics)
  L1 · Ý hay: bỏ phiếu có trọng số theo AUC thay accuracy; nhưng micro-avg 0.99 thổi phồng, no code.
- [ ] **kaliappan2024_featsel_diverse_datasets** — *Analyzing classification and feature selection strategies for diabetes prediction across diverse diabetes datasets* (2024 · Frontiers in Artificial Intelligence)
  L4 · **Kết quả âm hữu ích**: feature selection KHÔNG luôn cải thiện acc; nhưng no CV/code, PIMA augment nghi leakage.
- [ ] **ahmed2024_lime_shap_comparison** — *A Comparative Analysis of LIME and SHAP Interpreters With Explainable ML-Based Diabetes Predictions* (2024 · IEEE Access)
  L4 · So sánh có hệ thống LIME vs SHAP theo 4 tiêu chí. Tham chiếu XAI, model nền yếu (LR 86%).
- [ ] **lu2021_patient_network_t2dm** — *A patient network-based machine learning model for disease prediction: The case of type 2 diabetes mellitus* (2021 · Applied Intelligence)
  L2 · early · Novelty patient-network/graph (AUC 0.91) nhưng claim data private, repro low.
- [ ] **nguyen2019_wide_deep_onset** — *Predicting the onset of type 2 diabetes using wide and deep learning with electronic health records* (2019 · Computer Methods and Programs in Biomedicine)
  L3 · long_term · Method mới Wide&Deep nhưng AUC 84% + Sensitivity 31% + repro low.
- [ ] **dharmarathne2024_self_explainable_interface** — *A novel machine learning approach for diagnosing diabetes with a self-explainable interface* (2024 · Healthcare Analytics)
  L4 · Giao diện tự-giải-thích SHAP local (Tkinter). Góc deploy/UX, repro low.
- [ ] **khanam2021_comparison_ml_pima** — *A comparison of machine learning algorithms for diabetes prediction* (2021 · ICT Express)
  L2 · So sánh 10 model trên PIMA; trùng baseline, có leakage nhẹ, không AUC.
- [ ] **hennebelle2023_mlops_iot_diabetes** — *Secure and privacy-preserving automated machine learning operations into end-to-end integrated IoT-edge-AI-blockchain monitoring system for diabetes mellitus prediction* (2023 · Computational and Structural Biotechnology Journal)
  L1 · Thiết kế MLOps+IoT+blockchain (không triển khai thật), metric yếu. Góc ops.

---

## 🧊 Tier 5 — Đọc sau cùng / trạng thái đặc biệt

- [ ] **xu2025_label_noise_local_explanation** — *Improving the local diagnostic explanations of diabetes mellitus with the ensemble of label noise filters* (2025 · Information Fusion)
  L4 · Hướng mới (label noise + local explanation) nhưng đã LOẠI ở gate (27<30 cite) — đọc nếu muốn un-reject.
- [ ] **jin2025_opportunistic_screening_type** — *Opportunistic screening of type 2 diabetes with deep metric learning using electronic health records* (2025 · Scientific Reports)
  L3 · long_term · 0 cite, repro low, chưa kiểm chứng.
- [ ] **naz2020_deep_learning_pima** — *Deep learning approach for diabetes prediction using PIMA Indian dataset* (2020 · Journal of Diabetes and Metabolic Disorders)
  L2 · Yếu nhất: deep learning trên PIMA, verdict weak, repro low. Ưu tiên thấp nhất.

---

## 👤 Riêng — bài của anh

- [ ] **vinh2026_community_diabetes_screening** — *Ứng dụng kỹ thuật học máy trong tầm soát sớm bệnh lý đái tháo đường và tăng huyết áp cho người cao tuổi trong cộng đồng* (2026 · Đồ án thạc sĩ, Trường ĐH Tư thục Quốc tế Sài Gòn)
  L2 · early_detection · Đồ án TN (Mã Trường Vinh). Đọc riêng ngoài xếp hạng. ⚠️ Đang FAIL verify (best_metric có số không khớp extracted.md) — cần xử lý riêng.

---

### 🔎 Cách lọc gợi ý
1. Đọc **Baseline (4) + Tier 1 (4)** trước — đây là 8 bài định hình toàn bộ khung + mũi nhọn; đọc xong anh sẽ đủ nền để quyết phần còn lại nhanh hơn.
2. **Tier 2–3** đọc để bồi phương pháp (leakage-safe, external, calibration) và lấp horizon.
3. **Tier 4–5** chỉ lướt abstract + bảng metric; giữ làm trích dẫn "related work", ít khả năng thành trụ.
4. Khoảng trống lớn nhất (= cơ hội đề tài): **gần như không bài nào có code public + external validation + local SHAP CÙNG LÚC** → đọc rasmy2021/li2020 (code+external) cạnh tasin2022 (code+SHAP) để thấy chỗ ghép.
