import fs from 'node:fs';
import path from 'node:path';

// Web app nằm tại thư mục root /web/ dùng chung toàn dự án
export const PROJECT_ROOT =
  process.env.NCKH_ROOT || path.resolve(process.cwd(), '..');

export const RESEARCH_DIR = path.join(PROJECT_ROOT, '01_Diabetes_Research');
export const IMPLEMENT_DIR = path.join(PROJECT_ROOT, '02_Implementation');
export const FINAL_DIR = path.join(PROJECT_ROOT, '03_Final_Result');

// Tương thích ngược: NCKH_ROOT trỏ tới thư mục research
export const NCKH_ROOT = RESEARCH_DIR;

export const SEARCHED_DIR = path.join(RESEARCH_DIR, 'searched_papers');
export const CHOSEN_DIR = path.join(RESEARCH_DIR, 'chosed_papers');
export const ENV_FILE = fs.existsSync(path.join(PROJECT_ROOT, '.env'))
  ? path.join(PROJECT_ROOT, '.env')
  : path.join(RESEARCH_DIR, '.env');
export const WEBAPP_DIR = process.cwd();
export const DB_FILE = path.join(WEBAPP_DIR, 'data', 'hub.db');
export const QA_LOG_FILE = path.join(RESEARCH_DIR, 'qa_log.json');

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
