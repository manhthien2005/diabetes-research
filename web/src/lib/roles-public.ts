// Vai trò của paper trong ĐỀ TÀI ĐÃ CHỐT (QA_LOG Q007 / TO_DO.md §6).
// Tách riêng khỏi papers.ts để client component import được mà KHÔNG kéo theo node:fs.
//
// Trục này KHÁC verdict:
//   verdict = chất lượng + độ tin cậy của bài
//   role    = bài này dùng vào việc gì trong bài báo của anh

export type PaperRole =
  | 'design'
  | 'method'
  | 'positioning'
  | 'inflation'
  | 'later'
  | 'related';

export type PaperStatus = 'searched' | 'analyzed' | 'chosen' | 'rejected';

export const ROLE_META: Record<
  PaperRole,
  { label: string; letter: string; cls: string; hint: string }
> = {
  design: {
    label: 'Thiết kế',
    letter: 'A',
    cls: 'design',
    hint: 'BẮT BUỘC đọc — lấy định nghĩa nhãn, bộ feature, khuôn mẫu bảng kết quả (TO_DO §6 🅐)',
  },
  method: {
    label: 'Phương pháp',
    letter: 'B',
    cls: 'method',
    hint: 'Lấy một kỹ thuật cụ thể: protocol chống rò rỉ, kiểm định thống kê, cách báo cáo (TO_DO §6 🅑)',
  },
  positioning: {
    label: 'Định vị',
    letter: 'C',
    cls: 'positioning',
    hint: 'Đối thủ / SOTA gần nhất — đọc để biết khe hở cắm cờ (TO_DO §6 🅒)',
  },
  inflation: {
    label: 'Dẫn chứng thổi phồng',
    letter: 'D',
    cls: 'inflation',
    hint: 'Lướt 20 phút, lấy đúng 1 con số làm dẫn chứng cho Introduction (TO_DO §6 🅓)',
  },
  later: {
    label: 'Đọc sau',
    letter: 'E',
    cls: 'later',
    hint: 'Chỉ đọc nếu còn thời gian — thuộc Tầng 1–2 (TO_DO §6 🅔)',
  },
  related: {
    label: 'Related work',
    letter: 'F',
    cls: 'related',
    hint: 'Chỉ trích dẫn 1 câu ở Related Work — KHÔNG đọc sâu (TO_DO §6 🅕)',
  },
};

export const ROLE_KEYS = Object.keys(ROLE_META) as PaperRole[];

/** Thứ tự ưu tiên đọc: 🅐 trước, 🅕 sau. */
export const ROLE_RANK: Record<PaperRole, number> = {
  design: 0,
  method: 1,
  positioning: 2,
  inflation: 3,
  later: 4,
  related: 5,
};
