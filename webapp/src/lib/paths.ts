import path from 'node:path';

// Web app nằm trong D:\NCKH\webapp → root nghiên cứu là thư mục cha.
// Cho phép override bằng env NCKH_ROOT khi cần (vd chạy ở máy khác).
export const NCKH_ROOT =
  process.env.NCKH_ROOT || path.resolve(process.cwd(), '..');

export const SEARCHED_DIR = path.join(NCKH_ROOT, 'searched_papers');
export const CHOSEN_DIR = path.join(NCKH_ROOT, 'chosed_papers');
export const ENV_FILE = path.join(NCKH_ROOT, '.env');
export const WEBAPP_DIR = path.join(NCKH_ROOT, 'webapp');
export const DB_FILE = path.join(WEBAPP_DIR, 'data', 'hub.db');
export const QA_LOG_FILE = path.join(NCKH_ROOT, 'qa_log.json');

export type LayerId = 1 | 2 | 3 | 4;

export interface LayerDef {
  id: LayerId;
  dir: string; // tên folder thực trên đĩa
  name: string; // tên ngắn
  focus: string; // mô tả trọng tâm (tiếng Việt)
}

export const LAYERS: LayerDef[] = [
  {
    id: 1,
    dir: 'Layer_1_Pipeline_Nen_Tang',
    name: 'Pipeline Nền Tảng',
    focus:
      'Tiền xử lý, handling missing/outlier, oversampling/SMOTE, feature selection, baseline ML',
  },
  {
    id: 2,
    dir: 'Layer_2_Model_Hieu_Qua',
    name: 'Model Hiệu Quả',
    focus:
      'So sánh model, ensemble/stacking/boosting, deep tabular, tối ưu hyperparam',
  },
  {
    id: 3,
    dir: 'Layer_3_Dataset_EHR',
    name: 'Dataset EHR',
    focus:
      'EHR thật (NHANES, MIMIC, eICU), opportunistic screening, cohort thực tế, longitudinal',
  },
  {
    id: 4,
    dir: 'Layer_4_XAI_Trien_Khai',
    name: 'XAI & Triển Khai',
    focus: 'Explainability (SHAP, LIME), interpretability, deployment, clinical impact',
  },
];

export function layerById(id: number): LayerDef | undefined {
  return LAYERS.find((l) => l.id === id);
}

export function layerByDir(dir: string): LayerDef | undefined {
  return LAYERS.find((l) => l.dir === dir);
}
