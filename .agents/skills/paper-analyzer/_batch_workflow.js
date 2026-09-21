export const meta = {
  name: 'reanalyze-remaining-25',
  description: 'Re-analyze the remaining 25 papers on the new table-accurate extracts (paper-analyzer, 8 blocks A6)',
  phases: [{ title: 'Analyze', detail: 'one agent per paper, parallel (capped)' }],
}

const RET = {
  type: 'object',
  required: ['paper_id', 'verdict', 'best_metric', 'prediction_horizon', 'wrote_analysis_html', 'wrote_summary_json', 'wrote_metadata'],
  properties: {
    paper_id: { type: 'string' },
    verdict: { type: 'string', enum: ['strong', 'maybe', 'weak'] },
    best_metric: { type: 'string' },
    prediction_horizon: { type: 'string', enum: ['cross_sectional', 'early_detection', 'long_term_risk'] },
    wrote_analysis_html: { type: 'boolean' },
    wrote_summary_json: { type: 'boolean' },
    wrote_metadata: { type: 'boolean' },
    caveats: { type: 'string' },
  },
}

const EXAMPLE = 'searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/analysis.prev.html'
const TEMPLATE = '.claude/templates/analysis-template.html'

const PAPERS = [
  {
    "id": "gr2024_random_oversampling_diabetes",
    "dir": "searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes",
    "layer": 1,
    "pages": 17,
    "baselines": [
      "searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json",
      "searched_papers/Layer_1_Pipeline_Nen_Tang/hennebelle2023_mlops_iot_diabetes/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "hennebelle2023_mlops_iot_diabetes",
    "dir": "searched_papers/Layer_1_Pipeline_Nen_Tang/hennebelle2023_mlops_iot_diabetes",
    "layer": 1,
    "pages": 29,
    "baselines": [
      "searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/summary.prev.json",
      "searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "nnamoko2020_outliers_imbalance",
    "dir": "searched_papers/Layer_1_Pipeline_Nen_Tang/nnamoko2020_outliers_imbalance",
    "layer": 1,
    "pages": 12,
    "baselines": [
      "searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/summary.prev.json",
      "searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "olisah2022_preprocessing_ml_perspective",
    "dir": "searched_papers/Layer_1_Pipeline_Nen_Tang/olisah2022_preprocessing_ml_perspective",
    "layer": 1,
    "pages": 13,
    "baselines": [
      "searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/summary.prev.json",
      "searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "hasan2020_diabetes_prediction_ensembling",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling",
    "layer": 2,
    "pages": 16,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label). Text từ OCR — METRIC CHÍNH phải đối chiếu source.pdf trước khi ghi."
  },
  {
    "id": "khanam2021_comparison_ml_pima",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima",
    "layer": 2,
    "pages": 8,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "li2020_behrt_transformer_ehr",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr",
    "layer": 2,
    "pages": 12,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label)."
  },
  {
    "id": "lu2021_patient_network_t2dm",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/lu2021_patient_network_t2dm",
    "layer": 2,
    "pages": 13,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
  },
  {
    "id": "naz2020_deep_learning_pima",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/naz2020_deep_learning_pima",
    "layer": 2,
    "pages": 13,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "rasmy2021_medbert_ehr",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/rasmy2021_medbert_ehr",
    "layer": 2,
    "pages": 13,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label)."
  },
  {
    "id": "wang2020_xgboost_t2d_beijing",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/wang2020_xgboost_t2d_beijing",
    "layer": 2,
    "pages": 12,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "yang2021_bigdata_physical_exam_fusion",
    "dir": "searched_papers/Layer_2_Model_Hieu_Qua/yang2021_bigdata_physical_exam_fusion",
    "layer": 2,
    "pages": 11,
    "baselines": [
      "searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
  },
  {
    "id": "agliata2023_nhanes_mimic_ann",
    "dir": "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "deberneh2021_korean_ehr_nextyear",
    "dir": "searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
  },
  {
    "id": "dinh2019_data_driven_nhanes",
    "dir": "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes",
    "layer": 3,
    "pages": 15,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
  },
  {
    "id": "fazakis2021_longterm_t2d_risk",
    "dir": "searched_papers/Layer_3_Dataset_EHR/fazakis2021_longterm_t2d_risk",
    "layer": 3,
    "pages": 6,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label). Text từ OCR — METRIC CHÍNH phải đối chiếu source.pdf trước khi ghi."
  },
  {
    "id": "lai2019_predictive_models_diabetes",
    "dir": "searched_papers/Layer_3_Dataset_EHR/lai2019_predictive_models_diabetes",
    "layer": 3,
    "pages": 9,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
  },
  {
    "id": "lugner2024_top_ten_predictors",
    "dir": "searched_papers/Layer_3_Dataset_EHR/lugner2024_top_ten_predictors",
    "layer": 3,
    "pages": 9,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label)."
  },
  {
    "id": "nguyen2019_wide_deep_onset",
    "dir": "searched_papers/Layer_3_Dataset_EHR/nguyen2019_wide_deep_onset",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label)."
  },
  {
    "id": "zhang2020_henan_rural_cohort",
    "dir": "searched_papers/Layer_3_Dataset_EHR/zhang2020_henan_rural_cohort",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "ahmed2024_lime_shap_comparison",
    "dir": "searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison",
    "layer": 4,
    "pages": 6,
    "baselines": [
      "searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "searched_papers/Layer_4_XAI_Trien_Khai/dharmarathne2024_self_explainable_interface/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label). Text từ OCR — METRIC CHÍNH phải đối chiếu source.pdf trước khi ghi."
  },
  {
    "id": "dharmarathne2024_self_explainable_interface",
    "dir": "searched_papers/Layer_4_XAI_Trien_Khai/dharmarathne2024_self_explainable_interface",
    "layer": 4,
    "pages": 13,
    "baselines": [
      "searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label). Text từ OCR — METRIC CHÍNH phải đối chiếu source.pdf trước khi ghi."
  },
  {
    "id": "kaliappan2024_featsel_diverse_datasets",
    "dir": "searched_papers/Layer_4_XAI_Trien_Khai/kaliappan2024_featsel_diverse_datasets",
    "layer": 4,
    "pages": 57,
    "baselines": [
      "searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  },
  {
    "id": "nipa2023_clinically_adaptable",
    "dir": "searched_papers/Layer_4_XAI_Trien_Khai/nipa2023_clinically_adaptable",
    "layer": 4,
    "pages": 11,
    "baselines": [
      "searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
  },
  {
    "id": "xu2025_label_noise_local_explanation",
    "dir": "searched_papers/Layer_4_XAI_Trien_Khai/xu2025_label_noise_local_explanation",
    "layer": 4,
    "pages": 19,
    "baselines": [
      "searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
  }
]

phase('Analyze')

const out = await parallel(PAPERS.map((p) => () => agent(
  `Ban la paper-analyzer. Phan tich SAU bai "${p.id}" (Layer ${p.layer}, ${p.pages} trang) va GHI FILE.

DOC (bat buoc, doc HET extracted.md khong chi abstract):
1. ${p.dir}/extracted.md   - full text ban trich MOI (chuan bang). Day la nguon so lieu.
2. ${p.dir}/extraction_report.json - doc canh bao QA (garbled tables, OCR...).
3. .claude/skills/paper-analyzer/SKILL.md - quy trinh + yeu cau "di SAU".
4. ${TEMPLATE} - template HTML 8 khoi A6 (cau truc CHOT, khong doi).
5. ${EXAMPLE} - 1 analysis.html mau da render dung layout (tham khao style, KHONG copy so).
6. metadata: ${p.dir}/metadata.json
7. baseline cung layer (de so sanh, field "vs_baseline"): ${p.baselines.join(', ')}

GOI Y RIENG BAI NAY: ${p.hint}

GHI 3 FILE (ghi de truc tiep, KHONG tao v2 - ban cu da duoc backup san):
A. ${p.dir}/analysis.html - DUNG 8 KHOI A6 theo template, dung thu tu, Compare Card du 4 field co dinh.
   - Tieng Viet, giu thuat ngu EN trong ngoac. Self-contained: inline CSS + inline SVG, KHONG CDN, KHONG external image.
   - Header co badge Horizon lay tu prediction_horizon.
   - Section 7 (Ket qua): MOI metric phai ghi nguon "Table X / Fig Y / Section Z" cua bai. Thieu so -> UNKNOWN, TUYET DOI KHONG bia.
   - Hinh crop PDF embed base64 la TUY CHON (bo qua neu khong kha thi) - uu tien so DUNG tu bang + formula block.
B. ${p.dir}/summary.json - dung schema 15 key cua SKILL (paper_id, layer, prediction_horizon, contribution, method, best_metric, datasets, has_code, code_url, reproducible, vs_baseline, gap, verdict, verdict_reason, analyzed_at). analyzed_at de chuoi ISO "2026-06-22".
C. ${p.dir}/metadata.json - cap nhat: analysis_status="analyzed", status giu/dat phu hop, dien prediction_horizon, va neu doc full thay lech dataset/method/code so voi metadata cu thi ghi vao field "corrections".

RANG BUOC: KHONG dung chosed_papers/. KHONG bia so. Doc so truc tiep tu extracted.md (doi chieu source.pdf khi bai la OCR hoac bang garbled).
Tra ve JSON theo schema (best_metric kem dataset+nguon; caveats = ghi chu quan trong neu co).`,
  { label: `analyze:${p.id}`, schema: RET },
)))

return out.filter(Boolean)
