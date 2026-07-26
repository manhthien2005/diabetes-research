// Kiểu dữ liệu cho API /api/research-lessons — dùng chung cho route (server) và
// trang Kiến thức NCKH (client). KHÔNG import node:* ở đây để client dùng được.

export interface LessonCard {
  paper_id: string;
  title: string;
  layer: number;
  layerName: string;
  year: number | null;
  citations: number | null;
  is_chosen: boolean;
  contribution: string | null;
  method: string | null;
  best_metric: string | null;
  gap: string | null;
  vs_baseline: string | null;
  verdict: 'strong' | 'maybe' | 'weak' | null;
  verdict_reason: string | null;
  reproducible: string | null;
  has_code: boolean;
  code_url: string | null;
  datasets: string[];
}

/** Bài học lặp lại nhiều paper — đếm tự động từ text gap/method (heuristic). */
export interface RecurringLesson {
  key: string;
  label: string;
  hint: string;
  count: number;
  papers: string[];
}

export interface LayerLessonStat {
  id: number;
  name: string;
  focus: string;
  total: number;
  analyzed: number;
  chosen: number;
}

export interface ResearchLessons {
  totals: { papers: number; analyzed: number; chosen: number; withCode: number };
  byLayer: LayerLessonStat[];
  cards: LessonCard[];
  recurring: RecurringLesson[];
}
