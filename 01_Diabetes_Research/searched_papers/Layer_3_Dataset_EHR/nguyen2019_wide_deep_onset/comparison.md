# So sánh trong Layer 3 (Dataset_EHR) — `nguyen2019_wide_deep_onset`

> Bài target: **Predicting the onset of type 2 diabetes using wide and deep learning with EHRs** (Nguyen et al. 2019, CMPB, 161 cite).
> Horizon: **`long_term_risk`** (onset/incidence — feature 2009–2011 → nhãn 2012, ~1 năm; `horizon_uncertain`).
> Dataset: **Practice Fusion EHR (US)** — bộ cuộc thi 2012, 9948 BN, ~19% T2DM. Method: **Wide & Deep NN** (wide GLM + deep embedding) + SMOTE + ensemble.
>
> **Quy tắc §3b**: chỉ so metric trực tiếp khi **CÙNG horizon + cùng/đè dataset**. Không bài nào trong Layer 3 dùng Practice Fusion → KHÔNG có so sánh con số trực tiếp; chỉ so cách tiếp cận. Baseline cùng-dataset duy nhất là Pimentel et al. [17] (nằm TRONG paper, không phải bài trong kho).

## Bảng đối chiếu

| Paper | Horizon | Dataset (mẫu) | Method chính | Best metric (nguồn) | Code | So metric trực tiếp với target? |
|-------|---------|---------------|--------------|---------------------|------|-------------------------------|
| **nguyen2019** (target) | **long_term_risk** (~1y) | Practice Fusion EHR US (9948) | **Wide & Deep NN** + embedding + SMOTE + ensemble | AUC 84.13% · Acc 84.28% · Sens 31.17% · Spec 96.85% (no-SMOTE, Table 3) | ❌ | — |
| dinh2019 **(baseline)** | early_detection | NHANES (~21k) | XGBoost + WEM | AUC 0.957 lab / 0.862 survey (Table 5) | ❌ | ❌ khác horizon + khác dataset |
| lugner2024 | **long_term_risk** (10y) | UK Biobank (448k) | XGBoost + SHAP | ROC-AUC 0.903 / top-10 0.881; Sens 0.62; PR-AUC 0.29 | ❌ | ⚠️ cùng horizon, KHÁC dataset → không so số |
| fazakis2021 | **long_term_risk** (2y) | ELSA (2009) | Ensemble LR+RF (NSGA-II) | AUC 0.884 inductive (Table 5) | ❌ | ⚠️ cùng horizon, KHÁC dataset → không so số |
| lai2019 | early_detection | CPCSSN Canada (13.3k) + PIMA | GBM + cost-matrix | AROC 84.7% · Sens 71.6% (Table 3) | ❌ | ❌ khác horizon + khác dataset |
| deberneh2021 | early_detection | Korean private EHR | RF/SVM + ensemble | Acc 0.73 · F1 0.74 (không AUC) | ❌ | ❌ khác horizon + khác dataset |
| zhang2020 | cross_sectional | Henan Rural Cohort (36.7k) | GBM + SMOTE + SHAP | AUC 0.872 lab / 0.817 no-lab | ❌ | ❌ khác horizon + khác dataset |
| agliata2023 | cross_sectional | NHANES + MIMIC-III/IV (13.7k) | ANN nông + ensemble | ROC-AUC 0.934 · Brier 0.101 | ❌ | ❌ khác horizon + khác dataset |

> Không bài nào thiếu `summary.json`. Tất cả 8 bài Layer 3 đều **không public code**.

## Trùng lặp

- **Cùng horizon `long_term_risk`** với **lugner2024** và **fazakis2021** — cả ba dự đoán onset/incidence T2DM từ baseline có khoảng cách thời gian feature→nhãn (nguyen ~1y, fazakis 2y, lugner 10y). Đây là nhánh horizon target chen vào → **không phải nhánh trống** (đã có 2 bài neo trước đó).
- **Cùng dùng EHR thật + ensemble + xử-lý-imbalance**: nguyen (SMOTE + model-averaging ensemble) trùng motif với zhang2020 (SMOTE + ensemble) và dinh2019/lugner (ensemble/WEM). SMOTE không phải mới trong layer.
- **Cùng kết luận "imbalance handling không cứu được AUC/PR"**: nguyen (SMOTE 300% đẩy sens 71.6% nhưng AUC tụt 82.1%, spec rớt 76.6%) lặp lại đúng bài học của lugner2024 (downsampling → Sens 0.62, PR-AUC 0.29) — cùng trade-off recall↔đặc-hiệu trên dữ liệu hiếm.
- **Cùng hạn chế của cả layer**: không external validation, không code public, không PR-AUC/calibration/PPV theo phân bố thật (giống dinh2019, lai2019, deberneh2021, zhang2020).

## Khác biệt / Vượt trội

- **Method MỚI cho layer: Wide & Deep (deep tabular) + embedding ICD-9/thuốc/lab**. Toàn bộ Layer 3 còn lại là cây/boosting (XGBoost/GBM/RF) hoặc ANN nông (agliata); nguyen là bài DUY NHẤT dùng kiến trúc wide+deep với embedding category EHR — đóng góp kỹ thuật riêng biệt, không trùng ai.
- **Baseline cùng-dataset trong paper**: vượt Pimentel et al. [17] (RF + temporal, CÙNG Practice Fusion) — no-SMOTE AUC 84.01% vs 83.19% và đặc biệt sensitivity 29.12% vs 16.07% (Table 4). Đây là so-sánh-số HỢP LỆ duy nhất (cùng horizon + cùng dataset), nhưng đối thủ nằm ngoài kho.
- **Nhãn forward-prediction sạch leakage hơn**: feature 2009–2011 → onset 2012, và Practice Fusion CHỦ ĐỘNG loại ICD-9 250.x / thuốc tiểu đường / lab glucose-insulin để khử leakage. So với dinh2019 (nhãn gần-trùng feature lab, cross-sectional/early), zhang2020 (urine-glucose là biến #1), agliata2023 (glucose gần tiêu chí) — nguyen ít rủi ro label-feature leakage hơn về thiết kế.
- **vs lugner2024 / fazakis2021 (cùng horizon)**: nguyen là bài long_term_risk duy nhất dùng deep tabular trên EHR ngoại trú US (Practice Fusion) — bổ sung đa dạng dataset/method cho nhánh (lugner = UK Biobank cohort, fazakis = ELSA cohort người cao tuổi).

## Gap còn lại

- **Con số khiêm tốn**: AUC ~84% — KHÔNG cao hơn các bài cùng layer (dinh 0.957, agliata 0.934, lugner 0.903, fazakis 0.884, zhang 0.872). Lưu ý không so trực tiếp được do khác dataset+horizon, nhưng tuyệt đối là thấp nhất nhóm long_term_risk.
- **Sensitivity rất thấp ở cấu hình tốt nhất (31%)** — bỏ sót ~2/3 ca onset; AUC/Acc cao chủ yếu nhờ specificity trên lớp đa số (cùng bẫy accuracy-imbalance như cả layer, nhưng nguyen tệ nhất về recall ở best-config).
- **Cải thiện so baseline rất nhỏ**: chỉ +0.82% AUC vs Pimentel khi no-SMOTE; có SMOTE thì Pimentel còn nhỉnh hơn về AUC.
- **Không external validation; không PR-AUC / calibration / PPV** — agliata2023 đã có calibration + Brier; lugner có PR-AUC + bootstrap CI; nguyen thiếu cả hai → yếu hơn về độ tin cậy báo cáo.
- **Tái lập THẤP nhất layer**: dataset là bộ cuộc thi 2012 đã ĐÓNG (không link trong paper) + `code_url=null` + pipeline 1312-feature rất nặng. So với dinh/lugner/fazakis/lai/zhang (`reproducible: medium`, dataset xin-được), nguyen là `reproducible: low`.
- **Không XAI**: chỉ cosine-distance chọn feature; lugner2024 và zhang2020 đã có SHAP. Embedding ICD-9/thuốc không được giải thích.
- **Cửa sổ onset không định lượng N năm rõ** (~1y, `horizon_uncertain`) → ranh giới long_term_risk/early_detection mờ; ngắn hơn nhiều fazakis (2y) và lugner (10y).

## Verdict

**keep_in_searched** — bài có method MỚI thật (Wide & Deep deep-tabular + embedding EHR, không trùng ai trong layer) và bằng chứng quý "SMOTE không cứu AUC", NHƯNG horizon long_term_risk đã có 2 bài neo mạnh hơn (lugner2024, fazakis2021), AUC ~84% thấp nhất nhóm, không code, dataset cuộc thi đã đóng → tái lập thấp; giữ làm tham chiếu deep-tabular/forward-prediction, chưa đủ trội để promote vượt baseline dinh2019.
