export const meta = {
  name: 'reanalyze-stale-8',
  description: 'Re-analyze the 8 papers that failed (socket/529/402) before writing, on the new extracts on the new table-accurate extracts (paper-analyzer, 8 blocks A6)',
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
    "id": "ahmed2024_lime_shap_comparison",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison",
    "layer": 4,
    "pages": 6,
    "baselines": [
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable/summary.json",
      "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/dharmarathne2024_self_explainable_interface/summary.prev.json"
    ],
    "hint": "prediction_horizon already = cross_sectional (reconfirm from labeling method). Text from OCR — primary metric must be checked against source.pdf before recording."
  }
]

// Wave throttling: args can arrive as array / JSON string / comma-separated string.
// Defensive parse; if no valid args -> run RETRY (3 remaining papers with 503).
function parseSelect(a) {
  if (Array.isArray(a)) return a
  if (typeof a === 'string' && a.trim()) {
    try { const j = JSON.parse(a); if (Array.isArray(j)) return j } catch {}
    return a.split(',').map((s) => s.trim()).filter(Boolean)
  }
  return null
}
const RETRY = ['rasmy2021']
const SELECT = parseSelect(args) || RETRY
const RUN = PAPERS.filter((p) => SELECT.some((s) => p.id.includes(s)))
log(`Wave: ${RUN.length} papers -> ${RUN.map((p) => p.id).join(', ')}`)

phase('Analyze')

const out = await parallel(RUN.map((p) => () => agent(
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
