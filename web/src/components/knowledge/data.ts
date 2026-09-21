import {
  MdBloodtype,
  MdMonitorHeart,
  MdScale,
  MdFavorite,
  MdWaterDrop,
  MdElderly,
  MdPregnantWoman,
  MdFamilyRestroom,
  MdScience,
  MdWarningAmber,
  MdCheckCircle,
  MdInfoOutline,
  MdTune,
  MdLayers,
  MdTimeline,
  MdStairs,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

/* ============================================================
   Dữ liệu kiến thức — gom 1 chỗ cho dễ sửa
   ============================================================ */

export type Level = 'ok' | 'warn' | 'bad';

export interface Zone {
  to: number; // ngưỡng trên của vùng (giá trị tối đa thuộc vùng này)
  label: string;
  level: Level;
}

export interface Marker {
  key: string;
  label: string;
  short: string;
  unit: string;
  Icon: IconType;
  min: number;
  max: number;
  step: number;
  start: number;
  zones: Zone[];
  why: string; // vì sao chỉ số này nói lên bệnh
  inPima: boolean; // có trong dataset Pima kinh điển không
  diagnostic: boolean; // có ngưỡng chẩn đoán ĐTĐ hay chỉ là yếu tố liên quan/nguy cơ
}

export const MARKERS: Marker[] = [
  {
    key: 'glucose',
    label: 'Glucose huyết tương (2h OGTT)',
    short: 'Glucose',
    unit: 'mg/dL',
    Icon: MdBloodtype,
    min: 50,
    max: 300,
    step: 1,
    start: 120,
    zones: [
      { to: 139, label: 'Bình thường', level: 'ok' },
      { to: 199, label: 'Tiền tiểu đường', level: 'warn' },
      { to: 300, label: 'Tiểu đường', level: 'bad' },
    ],
    why: 'Đây là một trong các xét nghiệm dùng để chẩn đoán ĐTĐ. Nếu chính phép đo này cũng được dùng để tạo nhãn, đưa nó vào feature có thể làm bài toán trở nên gần như “đọc lại nhãn”.',
    inPima: true,
    diagnostic: true,
  },
  {
    key: 'hba1c',
    label: 'HbA1c (đường huyết trung bình 3 tháng)',
    short: 'HbA1c',
    unit: '%',
    Icon: MdWaterDrop,
    min: 4,
    max: 14,
    step: 0.1,
    start: 5.5,
    zones: [
      { to: 5.6, label: 'Bình thường', level: 'ok' },
      { to: 6.4, label: 'Tiền tiểu đường', level: 'warn' },
      { to: 14, label: 'Tiểu đường', level: 'bad' },
    ],
    why: 'Phản ánh mức đường huyết trung bình khoảng 2–3 tháng và không cần nhịn đói. Đây là một lựa chọn chẩn đoán, không phải “tiêu chuẩn vàng” duy nhất; thiếu máu, thai kỳ và một số bệnh lý có thể làm kết quả sai lệch.',
    inPima: false,
    diagnostic: true,
  },
  {
    key: 'fasting',
    label: 'Glucose lúc đói (fasting)',
    short: 'Đường đói',
    unit: 'mg/dL',
    Icon: MdBloodtype,
    min: 50,
    max: 250,
    step: 1,
    start: 95,
    zones: [
      { to: 99, label: 'Bình thường', level: 'ok' },
      { to: 125, label: 'Tiền tiểu đường', level: 'warn' },
      { to: 250, label: 'Tiểu đường', level: 'bad' },
    ],
    why: 'Đo sau nhịn ăn ≥8h. Đơn giản, rẻ, hay dùng làm xét nghiệm sàng lọc đầu tiên.',
    inPima: false,
    diagnostic: true,
  },
  {
    key: 'bmi',
    label: 'BMI (chỉ số khối cơ thể)',
    short: 'BMI',
    unit: 'kg/m²',
    Icon: MdScale,
    min: 12,
    max: 55,
    step: 0.1,
    start: 24,
    zones: [
      { to: 18.4, label: 'Thiếu cân', level: 'warn' },
      { to: 24.9, label: 'Bình thường', level: 'ok' },
      { to: 29.9, label: 'Thừa cân', level: 'warn' },
      { to: 55, label: 'Béo phì — nguy cơ cao', level: 'bad' },
    ],
    why: 'BMI cao thường đi cùng nguy cơ ĐTĐ type 2 cao hơn, nhưng không phải nguyên nhân duy nhất và không dùng để chẩn đoán. BMI cũng không phản ánh hoàn hảo mỡ bụng hay khác biệt giữa các quần thể.',
    inPima: true,
    diagnostic: false,
  },
  {
    key: 'bp',
    label: 'Huyết áp tâm trương (diastolic)',
    short: 'Huyết áp',
    unit: 'mmHg',
    Icon: MdMonitorHeart,
    min: 40,
    max: 130,
    step: 1,
    start: 72,
    zones: [
      { to: 79, label: 'Dưới 80', level: 'ok' },
      { to: 89, label: '80–89: cao', level: 'warn' },
      { to: 130, label: '≥90: cao hơn', level: 'bad' },
    ],
    why: 'Tăng huyết áp đi kèm hội chứng chuyển hoá. Không chẩn đoán tiểu đường nhưng là dấu hiệu nguy cơ cùng nhóm.',
    inPima: true,
    diagnostic: false,
  },
  {
    key: 'insulin',
    label: 'Insulin huyết thanh 2h',
    short: 'Insulin',
    unit: 'µU/mL',
    Icon: MdScience,
    min: 1,
    max: 400,
    step: 1,
    start: 90,
    zones: [{ to: 400, label: 'Không có ngưỡng ĐTĐ chung', level: 'warn' }],
    why: 'Không có một khoảng “bình thường” chung để tự chẩn đoán từ insulin 2 giờ; kết quả phụ thuộc xét nghiệm và bối cảnh. Insulin cao có thể gợi ý đề kháng insulin, nhưng phải diễn giải cùng glucose và lâm sàng.',
    inPima: true,
    diagnostic: false,
  },
  {
    key: 'age',
    label: 'Tuổi',
    short: 'Tuổi',
    unit: 'năm',
    Icon: MdElderly,
    min: 18,
    max: 90,
    step: 1,
    start: 33,
    zones: [{ to: 90, label: 'Nguy cơ tăng dần, không có ngưỡng chẩn đoán', level: 'warn' }],
    why: 'Tuổi liên quan với nguy cơ ĐTĐ type 2 ở mức quần thể, nhưng không có một tuổi nào tự nó kết luận bệnh. Mô hình dùng tuổi để phân tầng nguy cơ, không phải để chẩn đoán.',
    inPima: true,
    diagnostic: false,
  },
];

export interface RiskFactor {
  label: string;
  modifiable: boolean;
  note: string;
  Icon: IconType;
}

export const RISKS: RiskFactor[] = [
  { label: 'Thừa cân / béo phì', modifiable: true, note: 'Giảm cân khi phù hợp có thể giúp giảm nguy cơ', Icon: MdScale },
  { label: 'Tiền sử gia đình', modifiable: false, note: 'Phản ánh cả yếu tố di truyền và môi trường gia đình', Icon: MdFamilyRestroom },
  { label: 'Ít vận động', modifiable: true, note: 'Tăng vận động thường cải thiện độ nhạy insulin', Icon: MdFavorite },
  { label: 'Tuổi', modifiable: false, note: 'Nguy cơ tăng dần theo tuổi; không phải một ngưỡng chẩn đoán', Icon: MdElderly },
  { label: 'Tăng huyết áp', modifiable: true, note: 'Thường đi cùng các rối loạn chuyển hoá khác', Icon: MdMonitorHeart },
  { label: 'Tiền sử ĐTĐ thai kỳ', modifiable: false, note: 'Làm tăng nguy cơ ĐTĐ type 2 về sau', Icon: MdPregnantWoman },
];

export interface PimaFeature {
  name: string;
  vi: string;
  type: string;
  zeroIsMissing: boolean;
  note: string;
}

export const PIMA: PimaFeature[] = [
  { name: 'Pregnancies', vi: 'Số lần mang thai', type: 'số nguyên', zeroIsMissing: false, note: '0 là hợp lệ (chưa từng mang thai).' },
  { name: 'Glucose', vi: 'Glucose huyết tương 2 giờ sau nghiệm pháp', type: 'liên tục', zeroIsMissing: true, note: 'Giá trị 0 không hợp lý về mặt sinh lý và thường được xử lý như dữ liệu thiếu.' },
  { name: 'BloodPressure', vi: 'Huyết áp tâm trương', type: 'liên tục', zeroIsMissing: true, note: 'Giá trị 0 không phải phép đo huyết áp hợp lệ trong bối cảnh bộ dữ liệu này; thường được xem là dữ liệu thiếu.' },
  { name: 'SkinThickness', vi: 'Độ dày da nếp gấp', type: 'liên tục', zeroIsMissing: true, note: 'Rất nhiều giá trị 0 — cần xử lý.' },
  { name: 'Insulin', vi: 'Insulin 2h', type: 'liên tục', zeroIsMissing: true, note: '~49% là 0 — cột thiếu nhiều nhất.' },
  { name: 'BMI', vi: 'Chỉ số khối cơ thể', type: 'liên tục', zeroIsMissing: true, note: 'BMI 0 không hợp lý trong bối cảnh này → thường quy ước là missing.' },
  { name: 'DiabetesPedigreeFunction', vi: 'Điểm tiền sử gia đình', type: 'liên tục', zeroIsMissing: false, note: 'Chỉ số tổng hợp quan hệ gia đình và tình trạng ĐTĐ; không phải xét nghiệm gen.' },
  { name: 'Age', vi: 'Tuổi', type: 'số nguyên', zeroIsMissing: false, note: 'Hợp lệ.' },
  { name: 'Outcome', vi: 'Nhãn (0/1)', type: 'nhị phân', zeroIsMissing: false, note: 'BIẾN MỤC TIÊU: 1 = tiểu đường, 0 = không.' },
];

/* ---- feature importance minh hoạ (điển hình trên Pima) ---- */
export const IMPORTANCE = [
  { f: 'Glucose', v: 100, t: 'thường cao' },
  { f: 'BMI', v: 62, t: 'thường khá cao' },
  { f: 'Age', v: 48, t: 'thay đổi theo mô hình' },
  { f: 'DiabetesPedigree', v: 41, t: 'thay đổi theo mô hình' },
  { f: 'Pregnancies', v: 33, t: 'thay đổi theo mô hình' },
  { f: 'Insulin', v: 28, t: 'phụ thuộc xử lý thiếu' },
  { f: 'BloodPressure', v: 22, t: 'thường thấp hơn' },
  { f: 'SkinThickness', v: 18, t: 'thường thấp hơn' },
];

/* ---- phân bố điểm số cho demo ngưỡng (gaussian tất định) ---- */
export const BINS = (() => {
  const centers: number[] = [];
  for (let c = 2.5; c < 100; c += 5) centers.push(c);
  const g = (x: number, mu: number, sd: number) =>
    Math.exp(-((x - mu) ** 2) / (2 * sd * sd));
  // 500 không bệnh (mu 38), 268 có bệnh (mu 64) — tỉ lệ giống Pima
  const negRaw = centers.map((c) => g(c, 38, 14));
  const posRaw = centers.map((c) => g(c, 64, 15));
  const negSum = negRaw.reduce((a, b) => a + b, 0);
  const posSum = posRaw.reduce((a, b) => a + b, 0);
  return centers.map((c, i) => ({
    center: c,
    neg: Math.round((negRaw[i] / negSum) * 500),
    pos: Math.round((posRaw[i] / posSum) * 268),
  }));
})();

/* ============================================================
   Helpers
   ============================================================ */

export function classify(value: number, zones: Zone[]): Zone {
  for (const z of zones) if (value <= z.to) return z;
  return zones[zones.length - 1];
}

export function zoneColor(level: Level): string {
  return level === 'ok' ? 'var(--green)' : level === 'warn' ? 'var(--amber)' : 'var(--red)';
}

export function gradientFor(m: Marker): string {
  // dựng dải màu theo các vùng, tỉ lệ theo min-max
  const span = m.max - m.min;
  let prev = m.min;
  const stops: string[] = [];
  for (const z of m.zones) {
    const start = ((prev - m.min) / span) * 100;
    const end = ((Math.min(z.to, m.max) - m.min) / span) * 100;
    const c = zoneColor(z.level);
    stops.push(`${c} ${start}%`, `${c} ${end}%`);
    prev = z.to;
  }
  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

/* ============================================================
   Chương: id, số thứ tự, nhãn, màu chủ đạo (hue), icon
   Màu chương chỉ dùng cho "chrome" (header, glow, TOC) —
   KHÔNG dùng cho zone ok/warn/bad hay confusion matrix.
   ============================================================ */

export interface Chapter {
  id: string;
  no: string; // "01".."07"
  label: string;
  hue: string; // var(--ch-*)
  Icon: IconType;
}

export const CHAPTERS: Chapter[] = [
  { id: 'overview', no: '01', label: 'Tổng quan', hue: 'var(--ch-blue)', Icon: MdInfoOutline },
  { id: 'biomarkers', no: '02', label: 'Đọc chỉ số', hue: 'var(--ch-purple)', Icon: MdTune },
  { id: 'tiers', no: '03', label: 'Phân tầng chỉ số', hue: 'var(--ch-pink)', Icon: MdLayers },
  { id: 'criteria', no: '04', label: 'Tiêu chí chẩn đoán', hue: 'var(--ch-teal)', Icon: MdBloodtype },
  { id: 'staging', no: '05', label: 'Giai đoạn tiến triển', hue: 'var(--ch-pink)', Icon: MdStairs },
  { id: 'risks', no: '06', label: 'Yếu tố nguy cơ', hue: 'var(--ch-amber)', Icon: MdWarningAmber },
  { id: 'longterm', no: '07', label: 'Horizon dự đoán', hue: 'var(--ch-green)', Icon: MdTimeline },
  { id: 'dataset', no: '08', label: 'Dataset Pima', hue: 'var(--ch-red)', Icon: MdScience },
  { id: 'pitfalls', no: '09', label: 'Bẫy khi làm ML', hue: 'var(--ch-blue)', Icon: MdWarningAmber },
  { id: 'checklist', no: '10', label: 'Checklist', hue: 'var(--ch-purple)', Icon: MdCheckCircle },
];

export const CHAPTER_BY_ID: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c]),
);

/** Nhãn ngắn cho TOC (giữ tương thích SECTIONS cũ) */
export const SECTIONS = CHAPTERS.map((c) => ({ id: c.id, label: c.label }));


/* ============================================================
   PHÂN TẦNG CHỈ SỐ + DỰ ĐOÁN DÀI HẠN
   Đúc kết từ các paper đã phân tích trong kho (workflow đọc
   summary.json + analysis.html của từng bài). Mọi feature/số
   đều truy về paper trong evidence; tầng "Trực tiếp" dựa trên
   chuẩn chẩn đoán ADA/WHO. KHÔNG bịa — bài chưa nêu thì để trống.
   ============================================================ */

export interface TierIndicator {
  name: string;
  why: string;
  modifiable: string; // 'có' | 'không' | 'một phần'
  evidence: string[]; // paper_id hỗ trợ
}
export interface IndicatorTier {
  key: string; // direct | metabolic | fixed | novel
  title: string;
  role: string;
  subtitle: string;
  tone: string; // màu CSS cho tầng
  indicators: TierIndicator[];
}

export const TIER_INTRO = "Các biến trong mô hình không có cùng ý nghĩa. Xét nghiệm glucose/HbA1c có thể nằm trong tiêu chí chẩn đoán; BMI hay vận động chỉ liên quan đến nguy cơ; tuổi và tiền sử gia đình giúp phân tầng; còn một số biến mới chỉ là tín hiệu quan sát được trong từng nghiên cứu. Phân tầng như vậy giúp tránh hai nhầm lẫn phổ biến: feature quan trọng không đồng nghĩa với nguyên nhân, và feature có ngưỡng chẩn đoán không tự động là rò rỉ — rò rỉ chỉ xảy ra khi cách tạo nhãn hoặc thời điểm đo làm lộ đáp án cho mô hình.";

export const TIERS: IndicatorTier[] = [
  {
    "key": "direct",
    "title": "Tầng 1 — Xét nghiệm dùng trong chẩn đoán",
    "role": "Có ngưỡng chẩn đoán",
    "subtitle": "Ba xét nghiệm có ngưỡng chẩn đoán ở người không mang thai. Chúng có thể là predictor hợp lệ nếu được đo trước outcome và phù hợp mục đích sử dụng; chỉ trở thành rò rỉ/circularity khi chính phép đo đó tạo nhãn cùng thời điểm.",
    "tone": "var(--red)",
    "indicators": [
      {
        "name": "Đường huyết lúc đói (FPG/FBS)",
        "why": "Ngưỡng ADA ≥126 mg/dL (7,0 mmol/L). Nếu không có tăng đường huyết rõ hoặc triệu chứng kinh điển, cần kết quả bất thường thứ hai để xác nhận.",
        "modifiable": "một phần",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "deberneh2021_korean_ehr_nextyear",
          "lai2019_predictive_models_diabetes",
          "wang2020_xgboost_t2d_beijing",
          "dinh2019_data_driven_nhanes",
          "zhang2020_henan_rural_cohort",
          "fazakis2021_longterm_t2d_risk",
          "agliata2023_nhanes_mimic_ann"
        ]
      },
      {
        "name": "Glucose huyết tương 2 giờ sau nghiệm pháp dung nạp (2h-OGTT)",
        "why": "Ngưỡng 2 giờ ≥200 mg/dL (11,1 mmol/L) sau 75 g glucose. Trong PIMA, cột Glucose là phép đo 2 giờ nên thường rất mạnh, nhưng độ quan trọng không phải một hằng số cho mọi mô hình.",
        "modifiable": "một phần",
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "hennebelle2023_mlops_iot_diabetes",
          "tasin2022_diabetes_prediction_explainable",
          "kaliappan2024_featsel_diverse_datasets"
        ]
      },
      {
        "name": "HbA1c (đường huyết trung bình 2-3 tháng)",
        "why": "Ngưỡng ADA ≥6,5% (48 mmol/mol), đo bằng phương pháp chuẩn hoá. HbA1c phản ánh phơi nhiễm glucose khoảng 2–3 tháng nhưng có thể sai lệch khi vòng đời hồng cầu hoặc hemoglobin bất thường.",
        "modifiable": "một phần",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "deberneh2021_korean_ehr_nextyear",
          "lugner2024_top_ten_predictors",
          "fazakis2021_longterm_t2d_risk",
          "kaliappan2024_featsel_diverse_datasets"
        ]
      }
    ]
  },
  {
    "key": "metabolic",
    "title": "Tầng 2 — Ảnh hưởng nguy cơ (thay đổi được)",
    "role": "Ảnh hưởng nguy cơ (thay đổi được)",
    "subtitle": "Yếu tố chuyển hoá có thể can thiệp bằng lối sống/thuốc — không định nghĩa bệnh nhưng làm tăng/giảm nguy cơ; là đích can thiệp dự phòng.",
    "tone": "var(--amber)",
    "indicators": [
      {
        "name": "Chỉ số khối cơ thể (BMI)",
        "why": "BMI cao liên quan mạnh với nguy cơ ĐTĐ type 2 và xuất hiện trong nhiều mô hình. Đây là liên hệ ở mức quần thể; BMI không tự chẩn đoán bệnh và không phản ánh đầy đủ phân bố mỡ.",
        "modifiable": "có",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "gr2024_random_oversampling_diabetes",
          "hennebelle2023_mlops_iot_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "deberneh2021_korean_ehr_nextyear",
          "fazakis2021_longterm_t2d_risk",
          "lugner2024_top_ten_predictors",
          "lai2019_predictive_models_diabetes",
          "agliata2023_nhanes_mimic_ann",
          "ahmed2024_lime_shap_comparison",
          "kaliappan2024_featsel_diverse_datasets",
          "tasin2022_diabetes_prediction_explainable",
          "zhang2020_henan_rural_cohort"
        ]
      },
      {
        "name": "Vòng eo / chu vi eo",
        "why": "Đo mỡ bụng (mỡ tạng) — predictor no-lab #1 ở dinh2019, top-3 ở lugner2024; can thiệp được bằng giảm cân.",
        "modifiable": "có",
        "evidence": [
          "dinh2019_data_driven_nhanes",
          "lugner2024_top_ten_predictors",
          "fazakis2021_longterm_t2d_risk",
          "zhang2020_henan_rural_cohort"
        ]
      },
      {
        "name": "Tỷ lệ eo-hông (waist-hip ratio)",
        "why": "Phân bố mỡ trung tâm; lọt top-10 SHAP của lugner2024, là biến chuyển hoá thay đổi được.",
        "modifiable": "có",
        "evidence": [
          "lugner2024_top_ten_predictors",
          "fazakis2021_longterm_t2d_risk"
        ]
      },
      {
        "name": "HDL cholesterol (mỡ tốt)",
        "why": "HDL cao thường liên quan với nguy cơ thấp hơn; top-8 ở lugner2024 và xếp hạng cao ở lai2019. Đây là liên hệ dự báo, không tự chứng minh tác dụng bảo vệ mang tính nhân quả.",
        "modifiable": "có",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "lugner2024_top_ten_predictors",
          "lai2019_predictive_models_diabetes",
          "agliata2023_nhanes_mimic_ann"
        ]
      },
      {
        "name": "Triglyceride (mỡ máu)",
        "why": "Rối loạn lipid đi kèm đề kháng insulin; top-12 ở deberneh2021, top-8 information gain ở lai2019.",
        "modifiable": "có",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "deberneh2021_korean_ehr_nextyear",
          "lai2019_predictive_models_diabetes",
          "agliata2023_nhanes_mimic_ann"
        ]
      },
      {
        "name": "Cholesterol toàn phần / LDL (mỡ xấu)",
        "why": "Rối loạn lipid máu liên quan hội chứng chuyển hoá; nằm trong bộ feature lipid của nhiều mô hình.",
        "modifiable": "có",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "lai2019_predictive_models_diabetes",
          "fazakis2021_longterm_t2d_risk",
          "ahmed2024_lime_shap_comparison"
        ]
      },
      {
        "name": "Huyết áp (tâm thu/tâm trương) & tăng huyết áp",
        "why": "Thành phần hội chứng chuyển hoá; HighBP là feature SHAP mạnh nhất (#1) trên dữ liệu khảo sát BRFSS.",
        "modifiable": "có",
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "agliata2023_nhanes_mimic_ann",
          "lai2019_predictive_models_diabetes",
          "fazakis2021_longterm_t2d_risk",
          "ahmed2024_lime_shap_comparison",
          "kaliappan2024_featsel_diverse_datasets",
          "zhang2020_henan_rural_cohort",
          "tasin2022_diabetes_prediction_explainable"
        ]
      },
      {
        "name": "Insulin huyết thanh / đề kháng insulin",
        "why": "Phản ánh đề kháng & tiết insulin (cốt lõi sinh bệnh ĐTĐ type 2); là feature chọn của PIMA, top-10 SHAP ở zhang2020.",
        "modifiable": "có",
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "hennebelle2023_mlops_iot_diabetes",
          "zhang2020_henan_rural_cohort",
          "kaliappan2024_featsel_diverse_datasets",
          "tasin2022_diabetes_prediction_explainable"
        ]
      },
      {
        "name": "Độ dày nếp gấp da (proxy mỡ dưới da)",
        "why": "Ước lượng lượng mỡ cơ thể; feature chuẩn PIMA nhưng thường yếu (bị Pearson loại ở khanam2021).",
        "modifiable": "có",
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "tasin2022_diabetes_prediction_explainable"
        ]
      },
      {
        "name": "Cân nặng",
        "why": "Liên quan trực tiếp BMI/béo phì; cân nặng tự khai báo là predictor no-lab #3 ở dinh2019.",
        "modifiable": "có",
        "evidence": [
          "dinh2019_data_driven_nhanes",
          "agliata2023_nhanes_mimic_ann"
        ]
      }
    ]
  },
  {
    "key": "fixed",
    "title": "Tầng 3 — Bối cảnh (cố định)",
    "role": "Bối cảnh (cố định)",
    "subtitle": "Yếu tố nhân khẩu/di truyền không thể thay đổi — dùng để phân tầng nguy cơ và hiệu chỉnh, không phải đích can thiệp.",
    "tone": "var(--ch-blue)",
    "indicators": [
      {
        "name": "Tuổi",
        "why": "Nguy cơ ĐTĐ tăng theo tuổi; có mặt hầu như mọi mô hình, là trục phân tầng nguy cơ.",
        "modifiable": "không",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "gr2024_random_oversampling_diabetes",
          "hennebelle2023_mlops_iot_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "li2020_behrt_transformer_ehr",
          "deberneh2021_korean_ehr_nextyear",
          "dinh2019_data_driven_nhanes",
          "fazakis2021_longterm_t2d_risk",
          "lugner2024_top_ten_predictors",
          "lai2019_predictive_models_diabetes",
          "agliata2023_nhanes_mimic_ann",
          "ahmed2024_lime_shap_comparison",
          "kaliappan2024_featsel_diverse_datasets",
          "zhang2020_henan_rural_cohort",
          "wang2020_xgboost_t2d_beijing",
          "tasin2022_diabetes_prediction_explainable"
        ]
      },
      {
        "name": "Giới/giới tính được ghi nhận trong dữ liệu",
        "why": "Nguy cơ và biểu hiện bệnh có thể khác giữa các nhóm. Cần mô tả rõ biến ghi nhận là sex hay gender và kiểm tra hiệu năng theo nhóm, thay vì coi đây là bản chất sinh học đơn giản.",
        "modifiable": "không",
        "evidence": [
          "abnoosian2023_ensemble_multiclassifier",
          "gr2024_random_oversampling_diabetes",
          "hennebelle2023_mlops_iot_diabetes",
          "deberneh2021_korean_ehr_nextyear",
          "fazakis2021_longterm_t2d_risk",
          "lai2019_predictive_models_diabetes",
          "agliata2023_nhanes_mimic_ann",
          "kaliappan2024_featsel_diverse_datasets",
          "wang2020_xgboost_t2d_beijing"
        ]
      },
      {
        "name": "Tiền sử gia đình mắc ĐTĐ (gồm Diabetes Pedigree Function)",
        "why": "Yếu tố di truyền/gia đình; top-5 SHAP ở lugner2024 — nhưng Pearson/MI đôi khi loại nhầm vì r thấp.",
        "modifiable": "không",
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hennebelle2023_mlops_iot_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "deberneh2021_korean_ehr_nextyear",
          "lugner2024_top_ten_predictors",
          "kaliappan2024_featsel_diverse_datasets",
          "wang2020_xgboost_t2d_beijing",
          "tasin2022_diabetes_prediction_explainable"
        ]
      },
      {
        "name": "Số lần mang thai (biến Pregnancies của PIMA)",
        "why": "Đây là số lần mang thai, không phải tiền sử ĐTĐ thai kỳ. Hai khái niệm không được dùng thay nhau; tiền sử ĐTĐ thai kỳ mới là yếu tố nguy cơ type 2 đã biết.",
        "modifiable": "không",
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hennebelle2023_mlops_iot_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "kaliappan2024_featsel_diverse_datasets"
        ]
      },
      {
        "name": "Sắc tộc / dân tộc được ghi nhận",
        "why": "Biến này có thể phản ánh đồng thời di truyền, điều kiện sống, khả năng tiếp cận chăm sóc và cách thu thập dữ liệu. Dùng để kiểm tra khả năng khái quát/công bằng, không diễn giải như nguyên nhân sinh học đơn lẻ.",
        "modifiable": "không",
        "evidence": [
          "hennebelle2023_mlops_iot_diabetes"
        ]
      }
    ]
  },
  {
    "key": "novel",
    "title": "Tầng 4 — Mới / Nâng cao",
    "role": "Mới / nâng cao",
    "subtitle": "Predictor không kinh điển do chính các paper khám phá — vượt ra ngoài bộ yếu tố truyền thống, gồm cả men gan, acid uric, chỉ số nước tiểu và chuỗi mã EHR.",
    "tone": "var(--purple)",
    "indicators": [
      {
        "name": "GGT / Gamma-GTP (men gan)",
        "why": "Men gan phản ánh gan nhiễm mỡ/rối loạn chuyển hoá; pipeline data-driven chọn vào top-10/top-12 dù không phải biến chẩn đoán truyền thống.",
        "modifiable": "một phần",
        "evidence": [
          "lugner2024_top_ten_predictors",
          "deberneh2021_korean_ehr_nextyear"
        ]
      },
      {
        "name": "Urate / Acid uric",
        "why": "Acid uric cao liên quan hội chứng chuyển hoá; lọt top-10 SHAP ở lugner2024 & zhang2020, top-12 ở deberneh2021.",
        "modifiable": "một phần",
        "evidence": [
          "lugner2024_top_ten_predictors",
          "zhang2020_henan_rural_cohort",
          "deberneh2021_korean_ehr_nextyear"
        ]
      },
      {
        "name": "Chỉ số nước tiểu (đường niệu & protein niệu)",
        "why": "Yếu tố MỚI không có trong risk score truyền thống; đặc thù cohort nông thôn Hà Nam, biến quan trọng #1 ở mọi model của zhang2020.",
        "modifiable": "một phần",
        "evidence": [
          "zhang2020_henan_rural_cohort"
        ]
      },
      {
        "name": "Sở thích vị ngọt (sweet flavor)",
        "why": "Biến này xếp hạng cao trong riêng zhang2020. Đây là tín hiệu thăm dò phụ thuộc cohort; cần lặp lại ở dữ liệu khác trước khi xem là yếu tố nguy cơ đáng tin.",
        "modifiable": "có",
        "evidence": [
          "zhang2020_henan_rural_cohort"
        ]
      },
      {
        "name": "Chiều dài chân (leg length)",
        "why": "Predictor bất thường nổi lên từ quét vét cạn NHANES; top-5 no-lab dù không phải biến chẩn đoán ĐTĐ.",
        "modifiable": "không",
        "evidence": [
          "dinh2019_data_driven_nhanes"
        ]
      },
      {
        "name": "Lượng natri ăn vào (sodium intake)",
        "why": "Biến dinh dưỡng/khẩu phần không kinh điển; lọt top-5 predictor no-lab ở dinh2019.",
        "modifiable": "có",
        "evidence": [
          "dinh2019_data_driven_nhanes"
        ]
      },
      {
        "name": "Chuỗi mã chẩn đoán EHR (ICD/Read code) + age/position/visit embedding",
        "why": "Thay vì biomarker, mô hình Transformer học cả tiền sử bệnh dạng chuỗi (mỗi chẩn đoán = 1 từ) để dự đoán nguy cơ tương lai.",
        "modifiable": "không",
        "evidence": [
          "li2020_behrt_transformer_ehr"
        ]
      },
      {
        "name": "Sức khoẻ tổng quát tự đánh giá (General Health)",
        "why": "Tự khai báo sức khoẻ chung là feature SHAP mạnh #2 trên dữ liệu khảo sát BRFSS — tín hiệu gộp rẻ tiền.",
        "modifiable": "một phần",
        "evidence": [
          "ahmed2024_lime_shap_comparison"
        ]
      },
      {
        "name": "Dùng thuốc đều đặn (Regular medicine) — cảnh báo rò rỉ nhãn",
        "why": "Predictor BẤT THƯỜNG tương quan ÂM với nhãn ĐTĐ — dấu hiệu proxy/rò rỉ nhãn cần cảnh giác, không phải yếu tố sinh học.",
        "modifiable": "không",
        "evidence": [
          "kaliappan2024_featsel_diverse_datasets"
        ]
      },
      {
        "name": "Nhịp tim & áp lực mạch (heart rate, pulse pressure)",
        "why": "Biến tim mạch phái sinh lọt top-10 SHAP toàn cục ở zhang2020 — không thuộc bộ risk score kinh điển.",
        "modifiable": "một phần",
        "evidence": [
          "zhang2020_henan_rural_cohort"
        ]
      }
    ]
  }
];

export interface LtParadigm {
  name: string;
  desc: string;
  inputs: string[];
  papers: string[];
}
export interface LtFeatureGroup {
  group: string;
  features: string[];
  papers: string[];
}
export interface LtPaper {
  paper_id: string;
  horizon: string;
  window: string;
  cohort: string;
  predictors_summary: string;
}
export interface LongTermData {
  intro: string;
  paradigms: LtParadigm[];
  featureGroups: LtFeatureGroup[];
  papers: LtPaper[];
  takeaway: string;
}

export const LONGTERM: LongTermData = {
  "intro": "Cần tách ba câu hỏi. (1) CẮT NGANG: feature và nhãn ở cùng thời điểm, nhằm nhận biết trạng thái ĐTĐ hiện tại. (2) PHÁT HIỆN SỚM: sàng lọc người chưa được chẩn đoán hoặc dự báo trong một khoảng thời gian gần. (3) NGUY CƠ DÀI HẠN: đo tại baseline, loại người đã mắc bệnh và theo dõi để xem ai mới mắc sau N năm. Glucose/HbA1c baseline không tự động là rò rỉ trong nghiên cứu dọc; chúng là predictor hợp lệ nếu được đo trước outcome. Tuy vậy, cần báo rõ khoảng cách thời gian và loại người đã sát ngưỡng/chưa được chẩn đoán để người đọc biết mô hình đang dự báo sớm thật hay chỉ nhận ra bệnh gần hiện hữu.",
  "paradigms": [
    {
      "name": "Tabular biomarker baseline (đo chỉ số 1 lần, dự đoán onset xa)",
      "desc": "Lấy bộ biomarker + nhân trắc + lối sống đo tại MỘT thời điểm baseline rồi gán nhãn ĐTĐ mới mắc sau N năm/N kỳ theo dõi. Mô hình (RF/LR/XGBoost/ensemble) học ánh xạ tĩnh baseline→onset; xếp hạng feature bằng SHAP hoặc information gain. Đây là cách phổ biến nhất cho dự đoán dài hạn trong bộ paper.",
      "inputs": [
        "Chỉ số chuyển hoá baseline (glucose, HbA1c, FPG)",
        "Nhân trắc (BMI, vòng eo, tỉ lệ eo-hông)",
        "Lipid & men gan (HDL, triglyceride, GGT, gamma-GTP, urate/acid uric)",
        "Nhân khẩu & tiền sử (tuổi, giới, tiền sử gia đình ĐTĐ)",
        "Lối sống (hút thuốc, uống rượu, vận động) ở một số bài"
      ],
      "papers": [
        "lugner2024_top_ten_predictors",
        "fazakis2021_longterm_t2d_risk",
        "deberneh2021_korean_ehr_nextyear",
        "lai2019_predictive_models_diabetes"
      ]
    },
    {
      "name": "Sàng lọc survey-only (không cần xét nghiệm máu)",
      "desc": "Chỉ dùng câu hỏi khảo sát hoặc phép đo đơn giản để nhận diện người nên đi xét nghiệm. dinh2019 quét nhiều biến NHANES và xây nhánh no-lab đạt AUC 0.862. Đây là sàng lọc cắt ngang/phát hiện người chưa được chẩn đoán, không phải dự báo onset sau N năm.",
      "inputs": [
        "Nhân trắc tự khai/đo đơn giản (vòng eo, cân nặng tự khai, chiều dài chân)",
        "Tuổi",
        "Khẩu phần/dinh dưỡng (lượng natri ăn vào)",
        "Không dùng glucose/insulin trong nhánh no-lab"
      ],
      "papers": [
        "dinh2019_data_driven_nhanes"
      ]
    },
    {
      "name": "Chuỗi mã chẩn đoán EHR qua Transformer",
      "desc": "BEHRT (li2020) coi mã chẩn đoán theo lần khám như một chuỗi để dự đoán nhiều bệnh ở tương lai; ĐTĐ chỉ là 1 trong 301 nhãn và paper không báo riêng hiệu năng ĐTĐ. Vì vậy đây là ví dụ phương pháp học lịch sử EHR, chưa phải bằng chứng trực tiếp cho một mô hình ĐTĐ chuyên biệt.",
      "inputs": [
        "Chuỗi mã chẩn đoán (BEHRT: 301 nhóm bệnh Caliber)",
        "Tuổi tại mỗi lần khám (age embedding)",
        "Vị trí token / thứ tự lần khám (position & visit embedding)",
        "Phân đoạn lần khám (segment A/B)",
        "KHÔNG dùng thuốc, xét nghiệm, đo lường (chỉ diagnosis code)"
      ],
      "papers": [
        "li2020_behrt_transformer_ehr"
      ]
    },
    {
      "name": "Forward EHR rút gọn về một dòng (bản ghi trước onset)",
      "desc": "Dùng EHR sơ cấp nhưng KHÔNG học động học chuỗi: mỗi bệnh nhân rút về MỘT dòng (lần khám cuối), nhãn lập từ các bản ghi 'trước khi khởi phát ĐTĐ' và bỏ năm cuối trước khi DB kết thúc để tránh người sắp chuyển bệnh. Dự đoán 'future occurrence of diabetes' theo nghĩa phát hiện sớm nhưng KHÔNG định lượng N năm. Xếp hạng predictor bằng information gain.",
      "inputs": [
        "Đường huyết đói (FBS) ghép cửa sổ ±1 tháng",
        "Lipid (HDL, LDL, triglyceride) ghép cửa sổ ±1 năm",
        "Nhân trắc (BMI)",
        "Huyết áp tâm thu",
        "Nhân khẩu (tuổi 4 nhóm, giới)"
      ],
      "papers": [
        "lai2019_predictive_models_diabetes"
      ]
    }
  ],
  "featureGroups": [
    {
      "group": "Chuyển hoá đường tại baseline — mạnh nhưng cần mô tả rõ thời điểm",
      "features": [
        "HbA1c",
        "Glucose huyết tương (baseline)",
        "FPG / đường huyết lúc đói (FBS)",
        "Từng có đường huyết cao (everHighGlu)"
      ],
      "papers": [
        "lugner2024_top_ten_predictors",
        "fazakis2021_longterm_t2d_risk",
        "deberneh2021_korean_ehr_nextyear",
        "lai2019_predictive_models_diabetes"
      ]
    },
    {
      "group": "Nhân trắc / béo trung tâm",
      "features": [
        "BMI (chỉ số khối cơ thể)",
        "Vòng eo",
        "Tỉ lệ eo-hông (waist-hip ratio)",
        "Cân nặng tự khai báo",
        "Chiều dài chân (predictor bất thường, dinh2019)"
      ],
      "papers": [
        "lugner2024_top_ten_predictors",
        "fazakis2021_longterm_t2d_risk",
        "deberneh2021_korean_ehr_nextyear",
        "dinh2019_data_driven_nhanes"
      ]
    },
    {
      "group": "Lipid & men gan / chuyển hoá khác (gồm predictor 'bất thường' nổi lên ở mô hình dài hạn)",
      "features": [
        "HDL cholesterol",
        "Triglyceride",
        "Cholesterol toàn phần",
        "LDL cholesterol",
        "GGT / gamma-GTP (men gan — bất thường, lugner2024 & deberneh2021)",
        "Urate / acid uric (bất thường, lugner2024 & deberneh2021)"
      ],
      "papers": [
        "lugner2024_top_ten_predictors",
        "deberneh2021_korean_ehr_nextyear",
        "fazakis2021_longterm_t2d_risk",
        "lai2019_predictive_models_diabetes"
      ]
    },
    {
      "group": "Tiền sử & nhân khẩu (yếu tố cố định)",
      "features": [
        "Tuổi",
        "Giới tính / sex",
        "Tiền sử gia đình mắc ĐTĐ"
      ],
      "papers": [
        "lugner2024_top_ten_predictors",
        "fazakis2021_longterm_t2d_risk",
        "deberneh2021_korean_ehr_nextyear",
        "lai2019_predictive_models_diabetes",
        "li2020_behrt_transformer_ehr"
      ]
    },
    {
      "group": "Huyết áp / tim mạch",
      "features": [
        "Huyết áp (ELSA, đo định kỳ)",
        "Huyết áp tâm thu (sBP, lai2019)"
      ],
      "papers": [
        "fazakis2021_longterm_t2d_risk",
        "lai2019_predictive_models_diabetes"
      ]
    },
    {
      "group": "Lối sống (lấy từ bảng hỏi/khảo sát)",
      "features": [
        "Hút thuốc",
        "Uống rượu bia",
        "Vận động thể chất",
        "Lượng natri ăn vào (dinh2019)"
      ],
      "papers": [
        "deberneh2021_korean_ehr_nextyear",
        "dinh2019_data_driven_nhanes"
      ]
    },
    {
      "group": "Chuỗi sự kiện EHR (ví dụ phương pháp, chưa có metric riêng cho ĐTĐ)",
      "features": [
        "Chuỗi mã chẩn đoán bệnh (BEHRT: 301 nhóm Caliber)",
        "Age embedding (tuổi tại mỗi lần khám)",
        "Position / visit embedding (thứ tự token & lần khám theo thời gian)",
        "Segment embedding (A/B luân phiên giữa các visit) — BEHRT"
      ],
      "papers": [
        "li2020_behrt_transformer_ehr"
      ]
    }
  ],
  "papers": [
    {
      "paper_id": "lugner2024_top_ten_predictors",
      "horizon": "long_term_risk",
      "window": "10 năm (3650 ngày; median follow-up ~12.16 năm)",
      "cohort": "UK Biobank, 448.277 người (tuổi baseline 40-69); thiết kế prospective incidence, loại người đã mắc ĐTĐ tại baseline (self-report HOẶC HbA1c>48 HOẶC hồ sơ).",
      "predictors_summary": "Giữ ~419 biến baseline, dùng SHAP global chọn top-10. Top-10 |SHAP|: (1) HbA1c, (2) BMI, (3) vòng eo, (4) glucose huyết tương, (5) tiền sử gia đình, (6) GGT (men gan), (7) tỉ lệ eo-hông, (8) HDL, (9) tuổi, (10) urate (acid uric). Phát hiện: 10 yếu tố SINH HỌC dễ đo vượt yếu tố lối sống & kinh tế-xã hội; GGT và urate là predictor 'bất thường' lọt top-10. Chỉ 10 biến giữ AUC 0.881 (so 0.903 của model 419 biến)."
    },
    {
      "paper_id": "fazakis2021_longterm_t2d_risk",
      "horizon": "long_term_risk",
      "window": "2 năm (baseline waves 2/4/6 → follow-up waves 3/5/7)",
      "cohort": "ELSA (English Longitudinal Study of Ageing), 2.009 người sau lọc + undersampling, cohort ≥50 tuổi; loại người đã chẩn đoán ĐTĐ tại baseline, chỉ giữ người dự cả hai wave → dự báo MỚI mắc trong 2 năm.",
      "predictors_summary": "Bộ 35 feature gồm FPG, HbA1c, tiền sử đường huyết cao, BMI, vòng eo, tỉ lệ eo-hông, huyết áp, cholesterol, tuổi và giới. Các chỉ số đường huyết baseline là predictor hợp lệ vì được đo trước follow-up, nhưng có thể nhận diện người đã rất gần ngưỡng; paper không có bảng importance số cho từng feature."
    },
    {
      "paper_id": "deberneh2021_korean_ehr_nextyear",
      "horizon": "early_detection",
      "window": "năm kế tiếp (Y → Y+1, 1 năm); stack thêm năm lịch sử (Y→Y-3) tăng CV accuracy",
      "cohort": "EHR tư nhân Hàn Quốc (Hanaro Medical Foundation, Seoul) 2013-2018; 535.169 bản ghi / 253.395 chủ thể; train 17.131 + test 200 mỗi lớp. Dùng biến năm hiện tại dự đoán phân lớp normal/prediabetes/diabetes (FPG chuẩn ADA) ở năm kế tiếp.",
      "predictors_summary": "12 feature sau ANOVA/chi-squared/RFE gồm FPG, HbA1c, triglyceride, BMI, gamma-GTP, tuổi, acid uric, giới, hút thuốc, uống rượu, vận động và tiền sử gia đình. Vì outcome năm sau được định nghĩa bằng FPG, cần xem rõ mốc đo và loại trừ người đã bệnh ở năm hiện tại; đây là nguy cơ circularity nếu thời điểm không tách sạch, không phải cứ dùng FPG là rò rỉ."
    },
    {
      "paper_id": "lai2019_predictive_models_diabetes",
      "horizon": "early_detection",
      "window": "UNKNOWN — nhãn lập từ bản ghi 'trước onset' + bỏ năm cuối trước khi DB kết thúc; paper KHÔNG định lượng khoảng cách feature→onset là mấy năm",
      "cohort": "CPCSSN (EHR sơ cấp Canada) 13.309 BN; PIMA (392 BN) dùng kiểm chứng chéo. Mỗi BN rút về MỘT dòng (lần khám cuối) → không học động học longitudinal.",
      "predictors_summary": "8 predictor gồm FBS, HDL, BMI, triglyceride, huyết áp tâm thu, LDL, tuổi và giới. FBS đo trước onset có thể là predictor hợp lệ; hạn chế chính là paper không định lượng rõ khoảng cách feature→onset và rút EHR về một dòng, nên khó biết mô hình dự báo xa đến đâu."
    },
    {
      "paper_id": "li2020_behrt_transformer_ehr",
      "horizon": "long_term_risk",
      "window": "next visit / 6 tháng / 12 tháng (T1/T2/T3)",
      "cohort": "CPRD UK EHR (+HES), ~1.6M bệnh nhân (lọc từ ~8M); downstream 699K/391K/342K cho T1/T2/T3. Pre-train Masked LM trên 1.6M rồi fine-tune dự đoán đa nhãn 301 bệnh ở lần khám tương lai.",
      "predictors_summary": "KHÔNG dùng biomarker tabular. Đầu vào = 4 concept: (1) chuỗi 301 mã bệnh Caliber (Read code + ICD-10), (2) age embedding (tuổi mỗi visit), (3) position embedding, (4) segment embedding A/B. Bỏ thuốc/xét nghiệm/đo lường. Mô hình tự học disease embedding 288 chiều qua self-attention (overlap top-10 láng giềng với chuyên gia 0.757). ĐTĐ là 1/301 nhãn, KHÔNG tách AUROC/feature importance riêng cho ĐTĐ. Ablation: age & position cải thiện APS đáng kể, segment gần như không."
    },
    {
      "paper_id": "dinh2019_data_driven_nhanes",
      "horizon": "early_detection",
      "window": "N/A thời gian thực (cross-sectional, nhãn gán đồng thời) — 'phát hiện sớm' = sàng lọc người CHƯA chẩn đoán/tiền-ĐTĐ bằng glucose hiện tại, chỉ dùng dữ liệu khảo sát",
      "cohort": "NHANES 1999-2014; Diab Case I 21.131 (5.532 cases), Case II 16.426. Quét vét cạn ~3.900 biến → giữ 123-168 biến → xếp hạng information gain XGBoost.",
      "predictors_summary": "Top-5 predictor mô hình no-lab (không cần xét nghiệm): (1) vòng eo, (2) tuổi, (3) cân nặng tự khai, (4) chiều dài chân (bất thường/không kinh điển), (5) lượng natri ăn vào (bất thường). Mô hình có-lab CỐ Ý loại plasma glucose & serum insulin để tránh trùng biến định nghĩa nhãn. AUC 0.862 (Case I, no-lab)."
    }
  ],
  "takeaway": "Mô hình dài hạn phải dùng thông tin có trước outcome và theo dõi người chưa mắc bệnh để dự báo ca mới. Biomarker baseline và chuỗi EHR đều có thể hữu ích, nhưng cần nêu rõ cửa sổ thời gian, tiêu chí loại người đã mắc và hiệu năng riêng cho ĐTĐ; nếu không, chỉ nên gọi là sàng lọc hiện tại hoặc ví dụ phương pháp."
};

/* ============================================================
   GIAI ĐOẠN TIẾN TRIỂN (glycemic staging) — chương 05
   Phổ cập: ĐTĐ type 2 là một phổ liên tục Bình thường → Tiền ĐTĐ
   → ĐTĐ, có thể tiến triển hoặc đảo ngược. Đây là nền của "đề tài 2"
   (phân loại giai đoạn / multiclass_staging). Ngưỡng theo ADA (đồng
   bộ chương Tiêu chí). Evidence neo về paper trong kho — KHÔNG bịa số.
   ============================================================ */

export type StageTone = 'ok' | 'warn' | 'bad';

export interface GlycemicStage {
  key: string;
  no: string;
  name: string; // tiếng Việt
  en: string; // tên tiếng Anh
  tone: StageTone;
  hba1c: string;
  fpg: string;
  ogtt: string;
  gist: string;
  action: string;
}

export interface StageDirection {
  label: string;
  dir: 'up' | 'flat' | 'down';
  body: string;
}

export interface StageMLPoint {
  title: string;
  body: string;
  tone: StageTone;
  evidence: string[];
}

export interface StageDataset {
  name: string;
  role: string;
  access: string;
  good: boolean; // true = nên dùng · false = chỉ làm ca cảnh báo
  note: string;
}

export interface StagingData {
  intro: string;
  stages: GlycemicStage[];
  progIntro: string;
  directions: StageDirection[];
  progNote: string;
  mlIntro: string;
  mlPoints: StageMLPoint[];
  datasets: StageDataset[];
  outOfScope: { label: string; why: string }[];
  takeaway: string;
}

export const STAGING: StagingData = {
  intro:
    'Đái tháo đường type 2 không phải một công tắc bật/tắt. Đường huyết trượt dần theo một phổ liên tục: từ bình thường, qua tiền đái tháo đường, đến đái tháo đường. Ranh giới giữa các giai đoạn chính là những ngưỡng chẩn đoán ở chương trước — nhưng điểm mấu chốt là giai đoạn có thể TIẾN tới nặng hơn hoặc ĐẢO NGƯỢC về nhẹ hơn theo thời gian. Đây là nền của bài toán "phân loại giai đoạn" (đề tài 2): thay vì chỉ hỏi "có/không mắc", ta hỏi "đang ở giai đoạn nào".',
  stages: [
    {
      key: 'normo',
      no: '1',
      name: 'Bình thường',
      en: 'Normoglycemia',
      tone: 'ok',
      hba1c: '< 5,7%',
      fpg: '< 100 mg/dL',
      ogtt: '< 140 mg/dL',
      gist: 'Điều hoà đường huyết bình thường. Không đồng nghĩa miễn nhiễm — nguy cơ vẫn phụ thuộc BMI, tuổi, tiền sử gia đình và lối sống.',
      action: 'Duy trì cân nặng & vận động; sàng lọc định kỳ nếu có yếu tố nguy cơ.',
    },
    {
      key: 'pre',
      no: '2',
      name: 'Tiền đái tháo đường',
      en: 'Prediabetes (IFG / IGT)',
      tone: 'warn',
      hba1c: '5,7 – 6,4%',
      fpg: '100 – 125 mg/dL',
      ogtt: '140 – 199 mg/dL',
      gist: 'Đường huyết cao hơn bình thường nhưng chưa tới ngưỡng bệnh; phần lớn không có triệu chứng. IFG (rối loạn đường đói) và IGT (rối loạn dung nạp sau ăn) là hai kiểu tiền ĐTĐ, có thể không trùng nhau.',
      action: '"Cửa sổ vàng" để dự phòng: can thiệp lối sống có thể làm chậm hoặc đảo ngược.',
    },
    {
      key: 'dm',
      no: '3',
      name: 'Đái tháo đường',
      en: 'Diabetes',
      tone: 'bad',
      hba1c: '≥ 6,5%',
      fpg: '≥ 126 mg/dL',
      ogtt: '≥ 200 mg/dL',
      gist: 'Đạt ngưỡng chẩn đoán. Khi không có triệu chứng kinh điển/tăng đường huyết rõ, cần một kết quả bất thường thứ hai để xác nhận (xem chương 04).',
      action: 'Quản lý đường huyết + tầm soát biến chứng (tim mạch, thận, mắt, thần kinh).',
    },
  ],
  progIntro:
    'Giai đoạn không cố định. Trên các cohort theo dõi dọc, một người ở tiền ĐTĐ có thể đi theo cả BA hướng:',
  directions: [
    {
      label: 'Tiến triển',
      dir: 'up',
      body: 'Chuyển lên giai đoạn nặng hơn (tiền ĐTĐ → ĐTĐ). Đây chính là điều mô hình dự báo nguy cơ muốn bắt sớm.',
    },
    {
      label: 'Ổn định',
      dir: 'flat',
      body: 'Giữ nguyên giai đoạn trong nhiều năm — vẫn cần theo dõi định kỳ.',
    },
    {
      label: 'Đảo ngược',
      dir: 'down',
      body: 'Trở lại bình thường (regression to normoglycemia), thường nhờ giảm cân/lối sống. Cho thấy tiền ĐTĐ không phải một bản án.',
    },
  ],
  progNote:
    'Trong các cohort dài hạn (ví dụ CARDIA, ARIC), cả ba hướng đều xuất hiện ở nhóm tiền ĐTĐ qua nhiều năm theo dõi. Vì vậy "giai đoạn" luôn phải gắn với MỐC THỜI GIAN đo, không phải một nhãn vĩnh viễn.',
  mlIntro:
    'Chuyển từ "có/không" (nhị phân) sang "đang ở giai đoạn nào" biến bài toán thành phân loại đa lớp CÓ THỨ TỰ (ordinal 3 lớp: bình thường < tiền ĐTĐ < ĐTĐ) — hướng mở rộng của đề tài (label_type = multiclass_staging). Nhưng nó khuếch đại đúng những cái bẫy ở chương "Bẫy khi làm ML":',
  mlPoints: [
    {
      title: 'Rò rỉ nhãn KÉP — bẫy lớn nhất',
      tone: 'bad',
      body: 'Nhãn giai đoạn được ĐỊNH NGHĨA bằng HbA1c/FPG/OGTT. Nếu giữ chính các biến này làm feature, mô hình chỉ "đọc lại định nghĩa" → accuracy ~99–100% giả. Đúng như dataset 3 lớp IPDD (giữ HbA1c) cho ~0,99 ở abnoosian2023.',
      evidence: ['abnoosian2023_ensemble_multiclassifier'],
    },
    {
      title: 'Lớp tiền ĐTĐ chồng lấn → trần độ chính xác',
      tone: 'warn',
      body: 'Ranh giới bình thường ↔ tiền ↔ ĐTĐ là quy ước cắt trên một phổ liên tục, nên lớp GIỮA (tiền ĐTĐ) dễ bị lẫn nhất. deberneh2021 (3 lớp năm kế tiếp) đạt precision lớp ĐTĐ 90% nhưng lớp tiền ĐTĐ chỉ 61%.',
      evidence: ['deberneh2021_korean_ehr_nextyear'],
    },
    {
      title: 'Khung leakage-safe #1 — bỏ biomarker định nghĩa nhãn',
      tone: 'ok',
      body: 'Phân giai đoạn từ yếu tố dễ đo (tuổi, BMI, vòng eo, huyết áp, tiền sử) mà KHÔNG dùng chính glucose/HbA1c. dinh2019 làm điều tương tự cho sàng lọc (bỏ glucose vẫn AUC 0,862); choi2014 & sgchoi2023 dùng feature phi-glucose + external validation.',
      evidence: [
        'dinh2019_data_driven_nhanes',
        'choi2014_prediabetes_screening',
        'sgchoi2023_undiagnosed_diabetes_ml_vs_stats',
      ],
    },
    {
      title: 'Khung leakage-safe #2 — dự báo CHUYỂN giai đoạn',
      tone: 'ok',
      body: 'Thay vì phân giai đoạn hiện tại, dự báo ai SẼ chuyển sang giai đoạn nặng hơn sau N năm (progression / time-to-stage). Bài toán này nối thẳng với chương "Horizon dự đoán" và tránh circularity vì feature đo TRƯỚC outcome.',
      evidence: ['deberneh2021_korean_ehr_nextyear', 'lai2019_predictive_models_diabetes'],
    },
  ],
  datasets: [
    {
      name: 'NHANES',
      role: '3 lớp cắt ngang',
      access: 'Mở',
      good: true,
      note: 'Có HbA1c + FPG + OGTT → áp ngưỡng ADA tạo 3 lớp; đủ lớn, tải tự do. Benchmark mạnh nhất — nhớ tách biến định nghĩa nhãn khỏi feature.',
    },
    {
      name: 'CHARLS / CARDIA / ARIC',
      role: 'Progression (theo dõi dọc)',
      access: 'Đăng ký / DUA',
      good: true,
      note: 'Cohort nhiều lần khám → lập nhãn CHUYỂN giai đoạn thật. CHARLS ít ma sát (đăng ký); CARDIA/ARIC cần DUA nhưng là chuẩn vàng đa lần khám.',
    },
    {
      name: 'KNHANES',
      role: 'External validation',
      access: 'Đăng ký',
      good: true,
      note: 'Quần thể Hàn Quốc — dùng làm cohort thứ hai kiểm tra khả năng khái quát (model-population matching).',
    },
    {
      name: 'IPDD / Multiclass Diabetes Dataset',
      role: 'Chỉ làm ca cảnh báo',
      access: 'Mở',
      good: false,
      note: '3 lớp sẵn nhưng nhỏ (~1.000), lệch nặng và giữ HbA1c định nghĩa nhãn → leaky-by-construction (~100% giả). KHÔNG dùng làm benchmark chính; chỉ để minh hoạ hậu quả rò rỉ.',
    },
  ],
  outOfScope: [
    {
      label: 'Giai đoạn miễn dịch ĐTĐ type 1 (Stage 1/2/3, Insel 2015)',
      why: 'Là type 1, dựa kháng thể tự miễn / OGTT dài / omics — không phải dữ liệu bảng/EHR type 2. Ngoài phạm vi đề tài.',
    },
    {
      label: 'Phân độ biến chứng bằng ảnh (ví dụ võng mạc nhẹ / vừa / nặng)',
      why: 'Dựa hình ảnh y khoa, không phải dữ liệu bảng. Đã loại ở phạm vi đề tài (§1).',
    },
  ],
  takeaway:
    'ĐTĐ là một phổ có thể đi hai chiều, nên "phân loại giai đoạn" là mở rộng tự nhiên của bài toán nhị phân — nhưng chỉ có giá trị khi làm leakage-safe (bỏ biến định nghĩa nhãn, hoặc dự báo chuyển giai đoạn), và báo cáo theo TỪNG LỚP (nhất là lớp tiền ĐTĐ chồng lấn) thay vì accuracy tổng.',
};
