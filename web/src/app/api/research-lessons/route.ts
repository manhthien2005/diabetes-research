import { NextResponse } from 'next/server';
import { listAllPapers, readPaperSummary } from '@/lib/papers';
import { LAYERS } from '@/lib/paths';
import type {
  LessonCard,
  RecurringLesson,
  ResearchLessons,
} from '@/lib/research-lessons-types';

// Đọc TRỰC TIẾP các summary.json trong kho → "Kinh nghiệm từ kho" cập nhật LIÊN TỤC:
// mỗi khi một paper mới được phân tích (sinh summary.json), trang tự phản ánh.
export const dynamic = 'force-dynamic';

// Các bài học hay lặp lại — dò bằng từ khoá trên text gap/vs_baseline/method.
// Đây là heuristic để "đếm xu hướng", không phải phán xét tuyệt đối.
const RECURRING_DEFS: Array<{
  key: string;
  label: string;
  hint: string;
  re: RegExp;
}> = [
  {
    key: 'leakage',
    label: 'Rò rỉ dữ liệu (data leakage)',
    hint: 'Tiền xử lý / oversample / chọn feature làm trên TOÀN bộ dữ liệu trước khi tách train–test → số đẹp giả tạo.',
    re: /leakage|rò rỉ|oversampl\w*\s*(trước|before)|toàn\s*(bộ)?\s*dataset|trên\s*toàn|từng\s*fold|trước\s*khi\s*(chia|split|tách)/i,
  },
  {
    key: 'external',
    label: 'Thiếu kiểm định ngoài (external validation)',
    hint: 'Chỉ đo trên một dataset (thường PIMA 768) → chưa biết mô hình có tổng quát hoá sang quần thể khác không.',
    re: /external\s*validation|kiểm\s*định\s*ngoài|chưa\s*external|không\s*external|chỉ\s*(trên\s*)?pima/i,
  },
  {
    key: 'imbalance',
    label: 'Xử lý lệch lớp chưa tới',
    hint: 'Downsampling vứt mẫu, hoặc oversample sai cách; AUC cao nhưng sensitivity / PR-AUC thấp.',
    re: /imbalance|lệch\s*lớp|downsampl|smote|adasyn|sensitivity|pr-auc|recall\s*thấp|class\s*weight/i,
  },
  {
    key: 'xai',
    label: 'Thiếu / giới hạn khả năng giải thích (XAI)',
    hint: 'Không có SHAP/LIME, hoặc chỉ global không local, hoặc không quy về nhân quả → khó tạo niềm tin lâm sàng.',
    re: /\bxai\b|shap|lime|giải\s*thích|interpretab|explainab|causal|nhân\s*quả/i,
  },
  {
    key: 'metric',
    label: 'Đánh giá dễ gây ngộ nhận',
    hint: 'Chỉ báo accuracy, single split không K-fold, hoặc số liệu cao bất thường / không khớp → cờ đỏ.',
    re: /accuracy|single\s*split|k-fold|mean\s*±?\s*std|bất\s*thường|số\s*ảo|không\s*khớp|không\s*auc/i,
  },
  {
    key: 'reproducible',
    label: 'Khó tái lập / thiếu code',
    hint: 'Không công khai code/seed/hyperparam → người khác không dựng lại được kết quả.',
    re: /không\s*(công\s*bố|public).*code|thiếu\s*code|seed|hyperparam|tái\s*lập|reproduc/i,
  },
];

export async function GET() {
  const papers = listAllPapers();
  const analyzed = papers.filter((p) => p.analysis_status === 'analyzed');

  const cards: LessonCard[] = analyzed.map((p) => {
    const s = readPaperSummary(p.folder);
    const verdict =
      p.verdict ??
      (s?.verdict === 'strong' || s?.verdict === 'maybe' || s?.verdict === 'weak'
        ? s.verdict
        : null);
    return {
      paper_id: p.paper_id,
      title: p.title,
      layer: p.layer,
      layerName: LAYERS.find((l) => l.id === p.layer)?.name ?? `Layer ${p.layer}`,
      year: p.year,
      citations: p.citations,
      is_chosen: p.is_chosen,
      contribution: s?.contribution ?? null,
      method: s?.method ?? null,
      best_metric: s?.best_metric ?? null,
      gap: s?.gap ?? null,
      vs_baseline: s?.vs_baseline ?? null,
      verdict,
      verdict_reason: s?.verdict_reason ?? p.verdict_reason ?? null,
      reproducible: s?.reproducible ?? null,
      has_code: s?.has_code ?? Boolean(s?.code_url ?? p.code_url),
      code_url: s?.code_url ?? p.code_url ?? null,
      datasets: s?.datasets ?? p.datasets ?? [],
    };
  });

  const recurring: RecurringLesson[] = RECURRING_DEFS.map((d) => {
    const hits = cards.filter((c) =>
      d.re.test(`${c.gap ?? ''} ${c.vs_baseline ?? ''} ${c.method ?? ''}`),
    );
    return {
      key: d.key,
      label: d.label,
      hint: d.hint,
      count: hits.length,
      papers: hits.map((h) => h.paper_id),
    };
  })
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);

  const byLayer = LAYERS.map((l) => ({
    id: l.id,
    name: l.name,
    focus: l.focus,
    total: papers.filter((p) => p.layer === l.id).length,
    analyzed: analyzed.filter((p) => p.layer === l.id).length,
    chosen: papers.filter((p) => p.is_chosen && p.layer === l.id).length,
  }));

  const payload: ResearchLessons = {
    totals: {
      papers: papers.length,
      analyzed: analyzed.length,
      chosen: papers.filter((p) => p.is_chosen).length,
      withCode: cards.filter((c) => c.has_code).length,
    },
    byLayer,
    // sắp xếp: đã chọn trước, rồi theo verdict mạnh, rồi citations
    cards: cards.sort((a, b) => {
      if (a.is_chosen !== b.is_chosen) return a.is_chosen ? -1 : 1;
      const rank = (v: string | null) => (v === 'strong' ? 0 : v === 'maybe' ? 1 : 2);
      if (rank(a.verdict) !== rank(b.verdict)) return rank(a.verdict) - rank(b.verdict);
      return (b.citations ?? 0) - (a.citations ?? 0);
    }),
    recurring,
  };

  return NextResponse.json(payload);
}
