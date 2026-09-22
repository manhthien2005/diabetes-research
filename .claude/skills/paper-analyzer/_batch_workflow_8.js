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
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
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
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label)."
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
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
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
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
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
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label)."
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
    "hint": "prediction_horizon đã có = early_detection (xác nhận lại từ cách lập label)."
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
    "hint": "prediction_horizon đã có = long_term_risk (xác nhận lại từ cách lập label). Text từ OCR — METRIC CHÍNH phải đối chiếu source.pdf trước khi ghi."
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
    "hint": "prediction_horizon đã có = cross_sectional (xác nhận lại từ cách lập label). Text từ OCR — METRIC CHÍNH phải đối chiếu source.pdf trước khi ghi."
  }
]

// Wave throttling: args có thể tới dạng mảng / chuỗi JSON / chuỗi phẩy.
// Parse phòng thủ; nếu không có args hợp lệ -> chạy đúng RETRY (3 bài còn 503).
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

RANG BUOC: KHONG dung 01_Diabetes_Research/chosed_papers/. KHONG bia so. Doc so truc tiep tu extracted.md (doi chieu source.pdf khi bai la OCR hoac bang garbled).
Tra ve JSON theo schema (best_metric kem dataset+nguon; caveats = ghi chu quan trong neu co).`,
  { label: `analyze:${p.id}`, schema: RET },
)))

return out.filter(Boolean)
