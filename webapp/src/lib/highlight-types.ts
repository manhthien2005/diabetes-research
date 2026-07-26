// Type dùng chung cho cả client (PdfHighlighter) và server (API route).
// Tách riêng để client KHÔNG phải import code server (fs...).

export interface HighlightRect {
  x: number; // 0..1 theo chiều rộng trang
  y: number; // 0..1 theo chiều cao trang
  w: number;
  h: number;
}

export interface Highlight {
  id: string;
  page?: number; // 1-based; bản dịch có thể chưa suy ra được trang PDF
  color: string;
  rects: HighlightRect[];
  text: string;
  note?: string;
  created_at: string;
  // Field mới đều optional để highlights.json cũ (chỉ có PDF) vẫn đọc được.
  source?: 'pdf' | 'vi';
  section?: number; // section 0-based, khớp extracted.md <-> extracted.vi.md
  range_start?: number; // offset ký tự trong section bản dịch
  range_end?: number;
  original_text?: string; // đoạn EN cùng section để đối chiếu
}
