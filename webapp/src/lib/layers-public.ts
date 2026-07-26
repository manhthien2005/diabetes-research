// Bản LAYERS an toàn cho client (không kéo theo node:path từ paths.ts).
export interface PublicLayer {
  id: 1 | 2 | 3 | 4;
  dir: string;
  name: string;
}

export const PUBLIC_LAYERS: PublicLayer[] = [
  { id: 1, dir: 'Layer_1_Pipeline_Nen_Tang', name: 'Pipeline Nền Tảng' },
  { id: 2, dir: 'Layer_2_Model_Hieu_Qua', name: 'Model Hiệu Quả' },
  { id: 3, dir: 'Layer_3_Dataset_EHR', name: 'Dataset EHR' },
  { id: 4, dir: 'Layer_4_XAI_Trien_Khai', name: 'XAI & Triển Khai' },
];
