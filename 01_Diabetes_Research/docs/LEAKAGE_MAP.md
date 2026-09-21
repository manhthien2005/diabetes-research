# 🗺️ LEAKAGE_MAP.md — Bản đồ vi phạm của 35 bài trong kho

> **Sinh ngày 2026-07-26** bởi Claude · Nguồn: `extracted.md` + `summary.json` của 35 bài đã deep-analyze.
> **Mục đích:** biến 7 dòng ablation A–G của [TO_DO §7.2](TO_DO.md) từ *phỏng đoán* thành *tần suất đo được*,
> và cấp số liệu cho câu Introduction dạng **“trong 35 bài chúng tôi khảo sát, N bài …”**.
> Bản máy đọc: [`leakage_map.json`](leakage_map.json).

---

## §1. Cách đọc — 4 trạng thái, KHÔNG phải 2

Đây là điểm quan trọng nhất của file này. Không thể chia đôi thành “vi phạm / không vi phạm”,
vì phần lớn bài **không nói gì cả**. Ép về nhị phân là tự tạo ra một claim sai về người khác.

| Ký hiệu | Nghĩa | Dùng được vào việc gì |
|---|---|---|
| **✗** | Văn bản của **chính bài** mô tả thứ tự rò rỉ, hoặc bài tự báo con số ở mức rò rỉ | Trích thẳng vào bài |
| **✓** | Bài **nêu rõ** thứ tự an toàn (train-only / within-fold) | Mẫu để bắt chước |
| **?** | Bài **không nêu** → không kiểm chứng được | *Bản thân đây là phát hiện* (§4) |
| **–** | Bài không dùng kỹ thuật đó | Loại khỏi mẫu số |

**Mức bằng chứng** (ghi trong `leakage_map.json`, trường `evidence_level`):
`quote` = trích nguyên văn có số dòng · `analysis` = từ `summary.json` phiên trước · 
`structural` = suy từ cách dựng dataset, không từ văn bản bài.

> ⚠️ **Mọi ô `analysis` và `structural` PHẢI mở `source.pdf` xác minh trước khi viết vào bài.**
> Đây là claim về người khác — QA_LOG Q008 đã cảnh báo: sai một câu là mất uy tín cả bài.
> Hiện có **17 ô** đạt mức `quote` (trích nguyên văn) trên tổng 210 ô.

---

## §2. Bảng tần suất — đây là thứ đi vào Introduction

| Dòng | Vi phạm | Làm đúng | **Không nêu** | N/A | Mẫu số thật | Tỉ lệ vi phạm |
|---|---|---|---|---|---|---|
| **B** — Impute/scale trên toàn bộ data trước khi split | **4** | 3 | **26** | 2 | 33 | 4/33 |
| **C** — Feature selection trên toàn bộ data | **13** | 1 | **16** | 5 | 30 | 13/30 |
| **D** — SMOTE/oversample **trước** khi split | **1** | 5 | **4** | 25 | 10 | 1/10 |
| **E** — Chọn model trên chính test set (winner's curse) | **25** | 1 | **8** | 1 | 34 | 25/34 |
| **F** — Biến định nghĩa nhãn nằm trong feature (circularity) | **20** | 3 | **2** | 10 | 25 | 20/25 |
| **G** — Ép cân bằng 50/50 rồi đọc accuracy ở prevalence giả | **12** | 0 | **0** | 23 | 12 | 12/12 |

**Ba con số phụ (cùng 35 bài):**

| Thực hành | Số bài / 35 |
|---|---|
| Không có cross-validation nào (chỉ 1 split cố định) | **5** |
| Có CV nhưng không nêu số fold | **2** |
| Có external validation thật | **4** |
| Có code public | **5** |

---

## §3. Ba phát hiện làm ĐỔI thiết kế Table 3

### 3.1. Dòng D gần như là dòng chết — `TO_DO §12.1` đang ưu tiên sai

`TO_DO.md` §12.1 viết: nếu trễ mốc M2 thì *“cắt cấu hình B, C, G — **giữ bằng mọi giá D, E, F**”*.
Số liệu nói ngược lại về D:

- Chỉ **10/35 bài** dùng oversampling **sinh mẫu tổng hợp** (SMOTE/ADASYN/random oversampling).
- Trong 10 bài đó: **5 bài nêu rõ đã làm ĐÚNG** (chỉ trên train / trong từng fold), 4 bài không nêu, 1 bài nghi sai.
- 25 bài còn lại hoặc không cân bằng lớp, hoặc dùng **under-sampling** — mà under-sampling **không rò rỉ**
  (không có mẫu tổng hợp nào vượt rào train↔test), nó chỉ làm sai prevalence → đó là **dòng G**, không phải D.

> **Hệ quả:** dòng D vẫn nên chạy (rẻ, 2 giờ), nhưng **không phải là dòng phải giữ bằng mọi giá**.
> Ưu tiên đúng theo số liệu là **E → F → C**.

### 3.2. Winner's curse (E) mới là vi phạm phổ biến nhất: **25/34**

Đây chính là câu hỏi anh tự hỏi ở [QA_LOG Q003](QA_LOG.md) hai năm trước khi có đề tài.
Giờ nó có tần suất. Nặng nhất: `nipa2023` quét **35 classifier** trên **1 split cố định** rồi báo bài tốt nhất
mỗi dataset — và tự thừa nhận trong bài *“no validation methods being used”*.

Điều này nâng giá trị của **`T0.13` (Ablation E)** trong `PROGRESS.json`: đường cong “độ phồng theo số model đã thử”
giờ có mẫu số thật để neo — N=2, 5, 10, và **N=35** đúng bằng `nipa2023`.

### 3.3. PIMA rò rỉ theo CẤU TRÚC — không phải lỗi của từng tác giả

Cột `Glucose` của PIMA là **đường huyết huyết tương 2 giờ trong nghiệm pháp dung nạp glucose (OGTT)**,
trong khi **nhãn** của PIMA lại được định nghĩa bằng chính tiêu chí OGTT 2h ≥ 200 mg/dL theo WHO.
Nghĩa là: **mọi bài dùng PIMA đều đang đưa biến định-nghĩa-nhãn vào feature**, dù tác giả không cố ý.

Trong kho có **10 bài** dính dạng này: `gr2024`, `hennebelle2023`, `nnamoko2020`, `hasan2020`, `khanam2021`,
`naz2020`, `phan2025`, `dharmarathne2024`, `kaliappan2024`, `tasin2022`.

Trừ đi 10 bài PIMA này, dòng F còn **10 bài** vi phạm vì lý do của chính tác giả
(`olisah2022` relabel theo glucose · `zou2018` glucose là root node · `zhang2020` urine glucose ·
`deberneh2021` nhãn chỉ bằng FPG · `dinh2019` Case I · `lai2019` FBS · `yang2021` FBG · `lugner2024` HbA1c ·
`fazakis2021` fglu/hba1c · `agliata2023` glucose). **Cả hai con số đều dùng được** — nhưng phải nói rõ
bài nào thuộc loại nào, vì bản chất khác nhau: một bên là lỗi thiết kế của tác giả, một bên là bẫy của dataset.

> **Đây là một câu Introduction rất mạnh và rất rẻ:** benchmark được dùng nhiều nhất trong lĩnh vực
> có sẵn circularity ở tầng dataset. Nhưng ⚠️ **anh phải tự xác minh** từ tài liệu gốc NIDDK/UCI
> trước khi viết — đây là claim về một dataset mà cả lĩnh vực đang dùng.

---

## §4. Phát hiện phụ nhưng dùng được: **26/35 bài không nêu thứ tự tiền xử lý**

Với dòng B (impute/scale), chỉ 4 bài mô tả thứ tự rò rỉ và 3 bài mô tả thứ tự an toàn.
**26 bài còn lại đơn giản là không nói.** Không thể kết luận họ sai — nhưng cũng **không ai kiểm chứng được họ đúng**.

Cách phát biểu an toàn cho bài của anh (không vu oan, vẫn là kết quả):

> *“Trong 35 nghiên cứu chúng tôi khảo sát, chỉ 3 nghiên cứu mô tả đủ rõ thứ tự giữa bước tiền xử lý
> và bước chia dữ liệu để người đọc kiểm chứng được rằng không xảy ra rò rỉ.”*

Câu đó **không thể bị cãi**, vì nó nói về *mức độ báo cáo*, không nói về *ý định của tác giả*.
Và nó dẫn thẳng vào đóng góp **P2 — protocol chống rò rỉ dạng checklist** ở `TO_DO §3.1`.

---

## §5. Bảng chi tiết — 35 bài × 6 cấu hình

Sắp theo số vi phạm giảm dần. Ô có 🔍 = có trích nguyên văn trong `leakage_map.json`.

| # | paper_id | L | Dataset | **B** | **C** | **D** | **E** | **F** | **G** | Con số headline | Kiểm định |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `fazakis2021_longterm_t2d_risk` | 3 | ELSA | ? | ✗ | – | ✗ | ✗ | ✗ | AUC 0.884 inductive / 0.888 transductive | **không nêu rõ số fold** |
| 2 | `hasan2020_diabetes_prediction_ensembling` | 2 | PIMA | ✗🔍 | ✗🔍 | – | ✗ | ✗ | – | AUC 0.950 | stratified 5-fold CV |
| 3 | `kaliappan2024_featsel_diverse_datasets` | 4 | 4 dataset (gồm PIMA) | ? | ✗ | ✗ | ✗ | ✗ | – | Acc 0.990 (RF) | **KHÔNG CV** — 1 split cố định ~80/20 |
| 4 | `khanam2021_comparison_ml_pima` | 2 | PIMA | ✗ | ✗ | – | ✗ | ✗ | – | Acc 88.6% (NN, 1 split) | 10-fold CV VÀ split 85/15 chạy riêng |
| 5 | `zou2018_rf_pca_diabetes` | 2 | Luzhou + PIMA | ? | ✗ | – | ✗ | ✗ | ✗ | Acc 0.8084 (RF) | 5-fold CV + holdout 13.700 |
| 6 | `abnoosian2023_ensemble_multiclassifier` | 1 | IPDD | ✗🔍 | ✗🔍 | – | ✗🔍 | ? | – | Acc 0.9887 (Table 10) | nested 5-fold CV |
| 7 | `agliata2023_nhanes_mimic_ann` | 3 | NHANES + MIMIC-III/IV | ? | ? | – | ✗ | ✗ | ✗🔍 | AUC 0.934 / Acc ~86% / Brier 0.101 | k-fold k=9 x11 |
| 8 | `deberneh2021_korean_ehr_nextyear` | 3 | Hanaro EHR (private) | ? | ✗ | ? | ? | ✗ | ✗ | Acc 0.73 / F1 0.74 (KHÔNG báo AUC) | 10-fold grid-search CV |
| 9 | `dinh2019_data_driven_nhanes` | 3 | NHANES 1999-2014 | ? | ? | – | ✗ | ✗ | ✗ | AUC 0.957 (có lab) / 0.737 (no-lab Case II) | 80/20 + 10-fold CV |
| 10 | `lu2021_patient_network_t2dm` | 2 | CBHS claim (private) | ? | ✗ | – | ✗ | – | ✗ | AUC 0.91 / Acc 84.95% | 80/20 + 10-fold CV |
| 11 | `naz2020_deep_learning_pima` | 2 | PIMA | ✗ | ? | – | ✗ | ✗ | – | Acc 98.07% (DL) | split 80/20 + CV (**số fold không nêu**) |
| 12 | `phan2025_remed_t2d_ensemble` | 2 | PIMA + RTML1/2 + Pabna | ? | ? | – | ✗🔍 | ✗ | ✗🔍 | ACC ~0.90 (Ensemble1) | randomized 10-fold CV |
| 13 | `tasin2022_diabetes_prediction_explainable` | 4 | PIMA + RTML (private) | ? | ✗ | ✓🔍 | ✗ | ✗ | – | Acc 81% / AUC 0.84 | **KHÔNG K-fold** — chỉ holdout 80/20 |
| 14 | `alghamdi2017_smote_fit_project` | 1 | FIT (Henry Ford) | ? | ? | ? | ✗🔍 | – | ✗🔍 | Acc 84.3% (RF, G1) | 10-fold CV |
| 15 | `dharmarathne2024_self_explainable_interface` | 4 | PIMA | ? | ? | – | ✗ | ✗ | – | Acc 0.77 test / AUC 0.82 | **KHÔNG CV** — chỉ split 70/30 |
| 16 | `gr2024_random_oversampling_diabetes` | 1 | PIDD + BRFSS | ? | ? | ? | ✗🔍 | ✗ | – | Acc 94% PIDD / 92% BRFSS | 10-fold CV sau split 80:20 |
| 17 | `jin2025_opportunistic_screening_type` | 3 | MGB (private) | ? | ? | – | ✗ | ? | ✗ | AUROC cao (số screening thật UNKNOWN) | 3-fold CV |
| 18 | `lugner2024_top_ten_predictors` | 3 | UK Biobank 448k | ✓ | ✓ | – | ? | ✗ | ✗ | ROC-AUC 0.903 / Acc 0.92 / PR-AUC 0.29 | 80:20 + 5-fold CV + bootstrap 1000 |
| 19 | `nguyen2019_wide_deep_onset` | 3 | Practice Fusion | ? | ✗ | ✓🔍 | ✗ | – | – | AUC 84.13% / Sensitivity 31.17% | 70/30 + 10-fold stratified CV |
| 20 | `nipa2023_clinically_adaptable` | 4 | SDHD + PDD + MDD | ? | ✗ | – | ✗ | – | – | Acc 97.11% (ET, SDHD) | **KHÔNG CV** — 1 split 80/20; tác giả TỰ nhận 'no validation methods being used' |
| 21 | `nnamoko2020_outliers_imbalance` | 1 | PIMA | ✓ | – | ✓🔍 | ✗🔍 | ✗ | – | Acc 89.5% (C4.5) | stratified 10-fold CV |
| 22 | `olisah2022_preprocessing_ml_perspective` | 1 | PIMA + LMCH | ? | ? | – | ✗ | ✗ | – | ORF 100% / RF 97.93% (PIMA) | repeated stratified 10-fold x3 |
| 23 | `sgchoi2023_undiagnosed_diabetes_ml_vs_stats` | 3 | KNHANES 2014-2020 | ? | ✗ | – | ✗🔍 | ✓ | – | AUC 0.819 (vs score 0.765) | stratified 5-fold CV + external temporal |
| 24 | `yang2021_bigdata_physical_exam_fusion` | 2 | EHR Luzhou 1.5M | ? | ✗ | – | ? | ✗ | – | AUC 0.8763 | 70/30 holdout + 5-fold CV |
| 25 | `zhang2020_henan_rural_cohort` | 3 | Henan Rural Cohort 36.652 | ? | ? | ? | ✗ | ✗ | – | AUC 0.872 lab / 0.817 no-lab | 10-fold CV lặp 100 lần |
| 26 | `ahmed2024_lime_shap_comparison` | 4 | BRFSS 2015 | ? | ? | – | – | – | ✗ | Acc 86% / Recall lớp ĐTĐ 0.15 | **KHÔNG CV** — chỉ split 80/20 |
| 27 | `hennebelle2023_mlops_iot_diabetes` | 1 | PIMA + Sylhet + MIMIC-III | ? | ? | ✓🔍 | ? | ✗ | – | Acc 0.9723 (Sylhet) | stratified 10-fold CV ×10 lần |
| 28 | `lai2019_predictive_models_diabetes` | 3 | CPCSSN | ? | ? | – | ✓ | ✗ | – | AROC 84.7% (GBM) | 80/20 + 10-fold CV |
| 29 | `vinh2026_community_diabetes_screening` | 2 | BRFSS | ✓ | – | ✓ | ✗ | – | – | AUROC 0.806 | stratified 80/20 + GridSearchCV |
| 30 | `wang2020_xgboost_t2d_beijing` | 2 | Beijing Xicheng survey | ? | ? | – | ✗ | – | – | AUC 0.9182 | 10-fold CV lặp 10 lần |
| 31 | `xu2025_label_noise_local_explanation` | 4 | 4 dataset (D3/D4 ẩn danh) | ? | – | – | ✗ | – | – | Chỉ báo explanation-difference d, KHÔNG báo acc/AUC | 5-fold CV lặp 5 lần |
| 32 | `yu2010_svm_prediabetes_detection` | 2 | NHANES 1999-2004 | ? | ? | – | ? | ✓ | ✗ | AUC 0.83 (Scheme II) | test 20% + 10-fold CV, DeLong |
| 33 | `choi2014_prediabetes_screening` | 2 | KNHANES 2010/2011 | ? | ? | – | ? | ✓ | – | AUC 0.731 external (SVM) | 10-fold CV + external KNHANES 2011 |
| 34 | `li2020_behrt_transformer_ehr` | 2 | CPRD | – | – | – | ? | – | – | AUROC 0.958 / APS 0.525 | train/val/test split |
| 35 | `rasmy2021_medbert_ehr` | 2 | Cerner + Truven | – | – | – | ? | – | – | AUC 85.39 (DHF-Cerner) | split 7:1:2, 10 run mean+-std |

---

## §6. Việc tiếp theo do bản đồ này sinh ra

| # | Việc | Vì sao | Ai |
|---|---|---|---|
| 1 | **Đổi thứ tự ưu tiên Table 3 thành E → F → C → G → D → B** trong `TO_DO §12.1` và `PROGRESS.json` | §3.1: D gần như dòng chết, E phổ biến nhất | claude |
| 2 | **Xác minh PIMA circularity** từ tài liệu gốc NIDDK/UCI | §3.3 — claim mạnh nhất nhưng chưa được xác minh tay | anh |
| 3 | **Mở `source.pdf` xác minh 4 ô `quote` quan trọng nhất**: `hasan2020` L21, `abnoosian2023` L19, `phan2025` L108, `agliata2023` L259 | Trích nguyên văn vào bài phải có số trang | anh |
| 4 | Gộp bản đồ này với **`V3`** (đếm tay bảng gap §3.2) | Cùng một việc, đừng làm hai lần | anh |
| 5 | Thêm cột `N=35` (số model đã thử) vào **`T0.13`** ablation E | §3.2 — neo vào `nipa2023` có thật | claude |

---

**Liên quan:** [TO_DO.md §7.2](TO_DO.md) (7 cấu hình A–G) · [TO_DO.md §3.2](TO_DO.md) (bảng gap) ·
[QA_LOG Q003](QA_LOG.md) (winner's curse) · [QA_LOG Q008](QA_LOG.md) (quy tắc claim về người khác) ·
[PROGRESS.json](PROGRESS.json) `T0.11`–`T0.15`, `V3`.
