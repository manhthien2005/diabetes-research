---
paper_id: dinh2019_data_driven_nhanes
title: "A data-driven approach to predicting diabetes and cardiovascular disease with machine learning"
year: 2019
venue: BMC Medical Informatics and Decision Making
doi: 10.1186/s12911-019-0918-5
arxiv: null
citations: 374
citations_checked_at: 2026-05-22
topics: [tabular-diagnosis, ensemble, feature-importance, nhanes]
datasets: [nhanes]
methods: [xgboost, logistic-regression, svm, random-forest, weighted-ensemble, information-gain]
code_url: null
reproducibility: 2
status: shortlisted
reject_reason: null
---

## Tóm tắt

Paper sử dụng dữ liệu **NHANES** (National Health and Nutrition Examination Survey) của CDC để xây dựng mô hình ML phát hiện bệnh nhân nguy cơ **tiểu đường** và **bệnh tim mạch**. Đây là một trong những paper hiếm hoi dùng NHANES (real EHR, public) với >300 citations.

## Dataset

| Thuộc tính | Chi tiết |
|---|---|
| Tên | NHANES (National Health and Nutrition Examination Survey) |
| Nguồn | CDC — https://www.cdc.gov/nchs/nhanes/ |
| Access | Public, không cần đăng ký |
| Size | ~10,000 patients/wave, nhiều waves 2011-2018 |
| Features | 123 features (không có lab) / 131 features (có lab) |
| Target | Diabetes binary (có/không), Prediabetes, CVD |
| Đặc điểm | Real EHR — survey + lab results, không synthetic |

**Download:** https://wwwn.cdc.gov/nchs/nhanes/continuousnhanes/default.aspx

## Methods

Pipeline của paper:
1. NHANES data download + merge nhiều files SAS/XPT
2. Feature engineering: exhaustive search tất cả variables
3. Models: LR, SVM, RF, Gradient Boosting, XGBoost
4. Ensemble: **Weighted Ensemble Model (WEM)** — kết hợp nhiều model theo performance weight
5. Feature importance: Information gain của tree-based models
6. Split: Train/test không rõ tỷ lệ cụ thể

## Kết quả chính

| Task | Model | AUC (no lab) | AUC (with lab) |
|---|---|---|---|
| **Diabetes** | XGBoost | **86.2%** | **95.7%** |
| Prediabetes | WEM | 73.7% | 84.4% |
| CVD | WEM | 83.1% | 83.9% |

**Top 5 predictors (Diabetes):** Waist size, Age, Self-reported weight, Leg length, Sodium intake

## Điểm mạnh

- **374 citations** — highly credible, well-established
- **NHANES** — real-world EHR, large, public, không cần xin access
- **Dual task** — diabetes + CVD → richer contribution
- **Feature importance** — interpretable, có thể so sánh với SHAP
- **BMC Medical Informatics** — Q1 journal, peer-reviewed
- **Open access** GOLD CC-BY

## Điểm yếu / Limitation

- **Không có GitHub code** — cần reimplement từ paper
- **2019** — chưa dùng SHAP (chỉ dùng information gain)
- **Data preprocessing NHANES phức tạp** — XPT format, merge nhiều files
- **Split methodology không rõ** — không nêu rõ train/test/CV strategy
- **AUC 95.7% (with lab)** — nghi ngờ có thể inflate do lab features bị leak

## So sánh với Layer 1 (gr2024)

| Tiêu chí | gr2024 (Layer 1) | dinh2019 (candidate Layer 2) |
|---|---|---|
| Dataset | PIMA (768) + BRFSS (70k) | NHANES (10k+) |
| Dataset type | Survey + survey | Real EHR survey |
| Citations | 12 | **374** |
| Methods | RF + Boruta | XGBoost + Ensemble |
| Interpretability | Feature importance | Information gain |
| Code | ❌ | ❌ |

## Kế hoạch implement (Layer 2)

1. Download NHANES data (2015-2016 wave phổ biến nhất)
2. Reimplement pipeline: imputation → feature selection → XGBoost + Ensemble
3. Thêm SHAP (paper không có — đây là contribution của ta)
4. So sánh với kết quả paper: AUC 86.2% (no lab target)
5. Report gap và giải thích

## Notes

- NHANES data download cần script riêng để merge XPT files từ CDC
- Paper dùng NHANES 2011-2016 (6 năm, multiple waves)
- "No laboratory" model thực tế hơn cho clinical screening
- Waist size là predictor số 1 — consistent với literature
