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

const EXAMPLE = '01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/analysis.prev.html'
const TEMPLATE = '.claude/templates/analysis-template.html'

const PAPERS = [
  {
    "id": "gr2024_random_oversampling_diabetes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes",
    "layer": 1,
    "pages": 17,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/hennebelle2023_mlops_iot_diabetes/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "hennebelle2023_mlops_iot_diabetes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/hennebelle2023_mlops_iot_diabetes",
    "layer": 1,
    "pages": 29,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "nnamoko2020_outliers_imbalance",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/nnamoko2020_outliers_imbalance",
    "layer": 1,
    "pages": 12,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "olisah2022_preprocessing_ml_perspective",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/olisah2022_preprocessing_ml_perspective",
    "layer": 1,
    "pages": 13,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "hasan2020_diabetes_prediction_ensembling",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling",
    "layer": 2,
    "pages": 16,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method). Text from OCR — primary metric must be checked against source.pdf before recording."
  },
  {
    "id": "khanam2021_comparison_ml_pima",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima",
    "layer": 2,
    "pages": 8,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "li2020_behrt_transformer_ehr",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr",
    "layer": 2,
    "pages": 12,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon already = long_term_risk (reconfirm from labeling method)."
  },
  {
    "id": "lu2021_patient_network_t2dm",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/lu2021_patient_network_t2dm",
    "layer": 2,
    "pages": 13,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon already = early_detection (reconfirm from labeling method)."
  },
  {
    "id": "naz2020_deep_learning_pima",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/naz2020_deep_learning_pima",
    "layer": 2,
    "pages": 13,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "rasmy2021_medbert_ehr",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/rasmy2021_medbert_ehr",
    "layer": 2,
    "pages": 13,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon already = long_term_risk (reconfirm from labeling method)."
  },
  {
    "id": "wang2020_xgboost_t2d_beijing",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/wang2020_xgboost_t2d_beijing",
    "layer": 2,
    "pages": 12,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "yang2021_bigdata_physical_exam_fusion",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/yang2021_bigdata_physical_exam_fusion",
    "layer": 2,
    "pages": 11,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima/summary.prev.json"
    ],
    "hint": "prediction_horizon already = early_detection (reconfirm from labeling method)."
  },
  {
    "id": "agliata2023_nhanes_mimic_ann",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "deberneh2021_korean_ehr_nextyear",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon already = early_detection (reconfirm from labeling method)."
  },
  {
    "id": "dinh2019_data_driven_nhanes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes",
    "layer": 3,
    "pages": 15,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear/summary.prev.json"
    ],
    "hint": "prediction_horizon already = early_detection (reconfirm from labeling method)."
  },
  {
    "id": "fazakis2021_longterm_t2d_risk",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/fazakis2021_longterm_t2d_risk",
    "layer": 3,
    "pages": 6,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon already = long_term_risk (reconfirm from labeling method). Text from OCR — primary metric must be checked against source.pdf before recording."
  },
  {
    "id": "lai2019_predictive_models_diabetes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/lai2019_predictive_models_diabetes",
    "layer": 3,
    "pages": 9,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon already = early_detection (reconfirm from labeling method)."
  },
  {
    "id": "lugner2024_top_ten_predictors",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/lugner2024_top_ten_predictors",
    "layer": 3,
    "pages": 9,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon already = long_term_risk (reconfirm from labeling method)."
  },
  {
    "id": "nguyen2019_wide_deep_onset",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/nguyen2019_wide_deep_onset",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon already = long_term_risk (reconfirm from labeling method)."
  },
  {
    "id": "zhang2020_henan_rural_cohort",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/zhang2020_henan_rural_cohort",
    "layer": 3,
    "pages": 10,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes/summary.prev.json",
      "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "ahmed2024_lime_shap_comparison",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison",
    "layer": 4,
    "pages": 6,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/dharmarathne2024_self_explainable_interface/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method). Text from OCR — primary metric must be checked against source.pdf before recording."
  },
  {
    "id": "dharmarathne2024_self_explainable_interface",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/dharmarathne2024_self_explainable_interface",
    "layer": 4,
    "pages": 13,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method). Text from OCR — primary metric must be checked against source.pdf before recording."
  },
  {
    "id": "kaliappan2024_featsel_diverse_datasets",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/kaliappan2024_featsel_diverse_datasets",
    "layer": 4,
    "pages": 57,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  },
  {
    "id": "nipa2023_clinically_adaptable",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/nipa2023_clinically_adaptable",
    "layer": 4,
    "pages": 11,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon already = early_detection (reconfirm from labeling method)."
  },
  {
    "id": "xu2025_label_noise_local_explanation",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/xu2025_label_noise_local_explanation",
    "layer": 4,
    "pages": 19,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method)."
  }
]

phase('Analyze')

const out = await parallel(PAPERS.map((p) => () => agent(
  `You are paper-analyzer. Deeply analyze paper "${p.id}" (Layer ${p.layer}, ${p.pages} pages) and WRITE FILES.

READ (mandatory, read ENTIRE extracted.md, not just abstract):
1. ${p.dir}/extracted.md   - full text of NEW extraction (table-accurate). This is the source of metrics.
2. ${p.dir}/extraction_report.json - review QA warnings (garbled tables, OCR...).
3. .claude/skills/paper-analyzer/SKILL.md - procedure + deep analysis requirements.
4. ${TEMPLATE} - 8-block A6 HTML template (FINALIZED structure, do not change).
5. ${EXAMPLE} - 1 rendered sample analysis.html with correct layout (refer to style, DO NOT copy numbers).
6. metadata: ${p.dir}/metadata.json
7. baselines in same layer (for comparison, field "vs_baseline"): ${p.baselines.join(', ')}

HINT FOR THIS PAPER: ${p.hint}

WRITE 3 FILES (overwrite directly, DO NOT create v2 - backups already created):
A. ${p.dir}/analysis.html - EXACT 8 A6 BLOCKS per template, exact order, Compare Card with 4 fixed fields.
   - Vietnamese, keep EN terms in parentheses. Self-contained: inline CSS + inline SVG, NO CDN, NO external images.
   - Header has Horizon badge taken from prediction_horizon.
   - Section 7 (Results): EVERY metric must cite paper source "Table X / Fig Y / Section Z". Missing numbers -> UNKNOWN, STRICTLY NO fabrication.
   - PDF cropped images embedded as base64 are OPTIONAL (skip if not feasible) - prioritize ACCURATE numbers from tables + formula block.
B. ${p.dir}/summary.json - exact 15-key schema of SKILL (paper_id, layer, prediction_horizon, contribution, method, best_metric, datasets, has_code, code_url, reproducible, vs_baseline, gap, verdict, verdict_reason, analyzed_at). analyzed_at set to ISO string "2026-06-22".
C. ${p.dir}/metadata.json - update: analysis_status="analyzed", keep/set appropriate status, fill prediction_horizon, and if full text differs from old metadata for dataset/method/code, record in "corrections" field.

CONSTRAINTS: DO NOT touch 01_Diabetes_Research/chosed_papers/. DO NOT fabricate numbers. Read numbers directly from extracted.md (verify against source.pdf when paper has OCR or garbled tables).
Return JSON per schema (best_metric with dataset+source; caveats = important notes if any).`,
  { label: `analyze:${p.id}`, schema: RET },
)))

return out.filter(Boolean)
