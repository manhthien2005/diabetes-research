export const meta = {
  name: 'translate-extracts-vi',
  description: 'Dịch extracted.md -> extracted.vi.md (song ngữ EN|VN, giữ cấu trúc 1:1) cho từng bài, theo đợt nhỏ',
  phases: [{ title: 'Translate', detail: 'one agent per paper, parallel (capped)' }],
}

const RET = {
  type: 'object',
  required: ['paper_id', 'wrote_vi', 'headings', 'tables'],
  properties: {
    paper_id: { type: 'string' },
    wrote_vi: { type: 'boolean' },
    headings: { type: 'integer' },
    tables: { type: 'integer' },
    notes: { type: 'string' },
  },
}

// Đợt chạy: chỉ dịch các bài có id khớp 1 trong WAVE (sửa list này giữa các đợt).
const WAVE = ['yang2021', 'deberneh2021', 'dinh2019', 'nipa2023', 'gr2024']

const PAPERS = [
  {
    "id": "khanam2021_comparison_ml_pima",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/khanam2021_comparison_ml_pima",
    "ocr": false
  },
  {
    "id": "lai2019_predictive_models_diabetes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/lai2019_predictive_models_diabetes",
    "ocr": false
  },
  {
    "id": "wang2020_xgboost_t2d_beijing",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/wang2020_xgboost_t2d_beijing",
    "ocr": false
  },
  {
    "id": "tasin2022_diabetes_prediction_explainable",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_diabetes_prediction_explainable",
    "ocr": true
  },
  {
    "id": "lugner2024_top_ten_predictors",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/lugner2024_top_ten_predictors",
    "ocr": false
  },
  {
    "id": "nguyen2019_wide_deep_onset",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/nguyen2019_wide_deep_onset",
    "ocr": false
  },
  {
    "id": "zhang2020_henan_rural_cohort",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/zhang2020_henan_rural_cohort",
    "ocr": false
  },
  {
    "id": "lu2021_patient_network_t2dm",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/lu2021_patient_network_t2dm",
    "ocr": false
  },
  {
    "id": "jin2025_opportunistic_screening_type",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/jin2025_opportunistic_screening_type",
    "ocr": false
  },
  {
    "id": "li2020_behrt_transformer_ehr",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/li2020_behrt_transformer_ehr",
    "ocr": false
  },
  {
    "id": "agliata2023_nhanes_mimic_ann",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/agliata2023_nhanes_mimic_ann",
    "ocr": false
  },
  {
    "id": "naz2020_deep_learning_pima",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/naz2020_deep_learning_pima",
    "ocr": false
  },
  {
    "id": "yang2021_bigdata_physical_exam_fusion",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/yang2021_bigdata_physical_exam_fusion",
    "ocr": false
  },
  {
    "id": "deberneh2021_korean_ehr_nextyear",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/deberneh2021_korean_ehr_nextyear",
    "ocr": false
  },
  {
    "id": "dinh2019_data_driven_nhanes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/dinh2019_data_driven_nhanes",
    "ocr": false
  },
  {
    "id": "nipa2023_clinically_adaptable",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/nipa2023_clinically_adaptable",
    "ocr": false
  },
  {
    "id": "gr2024_random_oversampling_diabetes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes",
    "ocr": false
  },
  {
    "id": "dharmarathne2024_self_explainable_interface",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/dharmarathne2024_self_explainable_interface",
    "ocr": true
  },
  {
    "id": "hasan2020_diabetes_prediction_ensembling",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/hasan2020_diabetes_prediction_ensembling",
    "ocr": true
  },
  {
    "id": "olisah2022_preprocessing_ml_perspective",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/olisah2022_preprocessing_ml_perspective",
    "ocr": false
  },
  {
    "id": "rasmy2021_medbert_ehr",
    "dir": "01_Diabetes_Research/searched_papers/Layer_2_Model_Hieu_Qua/rasmy2021_medbert_ehr",
    "ocr": false
  },
  {
    "id": "abnoosian2023_ensemble_multiclassifier",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/abnoosian2023_ensemble_multiclassifier",
    "ocr": false
  },
  {
    "id": "kaliappan2024_featsel_diverse_datasets",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/kaliappan2024_featsel_diverse_datasets",
    "ocr": false
  },
  {
    "id": "ahmed2024_lime_shap_comparison",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/ahmed2024_lime_shap_comparison",
    "ocr": true
  },
  {
    "id": "nnamoko2020_outliers_imbalance",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/nnamoko2020_outliers_imbalance",
    "ocr": false
  },
  {
    "id": "xu2025_label_noise_local_explanation",
    "dir": "01_Diabetes_Research/searched_papers/Layer_4_XAI_Trien_Khai/xu2025_label_noise_local_explanation",
    "ocr": false
  },
  {
    "id": "hennebelle2023_mlops_iot_diabetes",
    "dir": "01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/hennebelle2023_mlops_iot_diabetes",
    "ocr": false
  },
  {
    "id": "fazakis2021_longterm_t2d_risk",
    "dir": "01_Diabetes_Research/searched_papers/Layer_3_Dataset_EHR/fazakis2021_longterm_t2d_risk",
    "ocr": true
  }
]

const RUN = PAPERS.filter((p) => WAVE.some((w) => p.id.includes(w)))
log(`Wave: ${RUN.length} papers -> ${RUN.map((p) => p.id).join(', ')}`)

phase('Translate')

const out = await parallel(RUN.map((p) => () => agent(
  `Ban la dich gia khoa hoc. DICH file extracted.md sang TIENG VIET, ghi ra extracted.vi.md, GIU NGUYEN CAU TRUC MARKDOWN 1:1 de web canh muc song ngu EN|VN.

DOC (toan bo): ${p.dir}/extracted.md
GHI: ${p.dir}/extracted.vi.md
${p.ocr ? 'LUU Y: ban goc qua OCR, chu co the bi dinh/nhieu. Doc file source.pdf trong CUNG thu muc tren khi can de hieu dung nghia; nhung CON SO van phai copy chinh xac tu bang.' : ''}

HOP DONG CAU TRUC (BAT BUOC - guardrail translate_check.py se kiem, vi pham phai dich lai):
1. Dong dau GIU NGUYEN Y HET comment header \`<!-- extracted by pdf-extract | ... -->\`.
2. GIU NGUYEN bo khung markdown: CUNG SO heading (moi dong #/##/...), CUNG THU TU, cung so doan, CUNG SO BANG va so hang bang, cung list. KHONG gop/tach/dao/bo/them khoi.
3. DICH sang tieng Viet tu nhien, hoc thuat: van xuoi, tieu de muc (giu so muc, vd '## 3  Dataset' -> '## 3  Bo du lieu'), muc list, va NHAN O TIEU DE cua bang.
4. GIU NGUYEN KHONG DOI (copy y het): moi CON SO va o du lieu trong bang; cong thuc/ky hieu toan; trich dan [1], [7-9]; DOI/URL; ten dataset (PIMA, BRFSS, NHANES, MIMIC...); ten rieng/tac gia/co quan; tu viet tat & thuat ngu tieng Anh (de thuat ngu Anh trong ngoac sau lan dich dau neu giup ro nghia).
5. TUYET DOI KHONG doi chu-so: khong bien 'two' thanh '2' hay nguoc lai; khong them/bot/lam tron so; giu y nguyen dinh dang so (dau . , ) nhu ban goc.
6. Bang GFM: giu y het so cot, dau | va hang |---|; chi dich chu trong O TIEU DE, GIU NGUYEN moi o du lieu.
7. Neu ban goc OCR co chu dinh (vd 'Theinsulinhormone'), hay dich thanh tieng Viet dung nghia & ro rang; so lieu van copy chinh xac.

Sau khi ghi xong, dem so heading (dong #..) va so hang bang (dong | .. |) trong ban VI va tra ve JSON theo schema (notes = ghi chu neu co cho lech/kho dich).`,
  { label: `vi:${p.id}`, schema: RET },
)))

return out.filter(Boolean)
