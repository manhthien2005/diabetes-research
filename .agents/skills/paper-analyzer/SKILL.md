---
name: paper-analyzer
description: |
  Phân tích SÂU một bài báo trong `searched_papers/Layer_X/<paper_id>/`,
  xuất ra `analysis.html` (tiếng Việt, 8 khối theo AGENTS.md §6) VÀ
  `summary.json` (máy đọc được, để sinh research brief). Mục tiêu: user
  quyết promote/loại mà không cần mở PDF.
inputs:
  - searched_papers/Layer_<n>/<paper_id>/extracted.md   # full text — ĐỌC KỸ
  - searched_papers/Layer_<n>/<paper_id>/source.pdf      # khi cần bảng/hình
  - searched_papers/Layer_<n>/<paper_id>/metadata.json
  - chosed_papers/Layer_<n>/                             # baseline để so sánh
outputs:
  - searched_papers/Layer_<n>/<paper_id>/analysis.html
  - searched_papers/Layer_<n>/<paper_id>/summary.json
---

# paper-analyzer

## Mục đích
Biến 1 PDF khoa học thành phân tích tiếng Việt SÂU + một bản tóm tắt máy
đọc được, để user quyết "promote lên `chosed_papers/` hay loại".

## Quy trình
1. **Đọc full text**: ưu tiên `extracted.md`. Nếu chưa có → chạy `pdf-extract`
   (hoặc ExploreX đã tự trích bản text-only khi đưa vào queue). Đọc HẾT, không
   chỉ abstract.
2. Đọc `metadata.json` (paper_id, citations, layer) + đọc các paper trong
   `chosed_papers/Layer_<n>/` cùng layer để có baseline so sánh.
3. Render `analysis.html` theo **8 khối** (AGENTS.md §6) — đúng thứ tự, đúng
   Compare Card 4 field. KHÔNG đổi cấu trúc.
4. Ghi `summary.json` (schema dưới).
5. Set `analysis_status: "analyzed"` + xác nhận/điền `prediction_horizon` (§3b) trong metadata.

## Đi SÂU — bắt buộc moi đủ (đây là điểm khác biệt)
Không dừng ở mô tả chung. PHẢI rút được:
- **Prediction horizon** (§3b): bài thuộc `cross_sectional` / `early_detection` /
  `long_term_risk`? Căn cứ cách paper lập label (feature→label có khoảng cách thời
  gian? có follow-up N năm? early detection/screening?). Ghi rõ + 1 câu lý do.
- **Pipeline chính xác**: từng bước tiền xử lý → cân bằng → feature → model →
  tuning, theo đúng thứ tự paper làm.
- **Dataset & split**: tên, số mẫu, số feature, tỉ lệ train/test, CV mấy fold,
  có cân bằng lớp không.
- **Metric kèm NGUỒN**: mỗi số phải ghi `Table X` / `Fig Y` / `Section Z`.
  Không có số → `UNKNOWN`, không bịa.
- **Khả năng tái lập** (high/medium/low) + lý do: có code public? có đủ
  hyperparam? mô tả method đủ chi tiết để code lại?
- **So với baseline**: hơn/kém các paper trong `chosed_papers/` cùng layer ở
  điểm cụ thể nào (không nói chung chung "tốt hơn").
- **Gap / điểm yếu**: chỗ paper hổng — chính là cơ hội cải tiến cho đề tài.

## summary.json (schema — máy đọc, để sinh research brief)
```json
{
  "paper_id": "<id>",
  "layer": 2,
  "prediction_horizon": "cross_sectional|early_detection|long_term_risk",
  "contribution": "1 câu đóng góp chính",
  "method": "method/kỹ thuật chính",
  "best_metric": "vd: 98.2% acc trên PIMA (Table 3)",
  "datasets": ["pima-indians-diabetes"],
  "has_code": true,
  "code_url": "<url hoặc null>",
  "reproducible": "high|medium|low",
  "vs_baseline": "hơn <paper_id> ở <điểm cụ thể>",
  "gap": "điểm yếu / khoảng trống chính",
  "verdict": "strong|maybe|weak",
  "verdict_reason": "1 câu vì sao",
  "analyzed_at": "<ISO-8601>"
}
```
- `verdict`: đánh giá độ phù hợp với đề tài + chất lượng. `strong` = nên promote,
  `weak` = nên loại (xem mục tự reject).

## Tự reject khi bài dở (user đã uỷ quyền — AGENTS.md §11)
Nếu phân tích thấy bài KHÔNG đạt (sai scope §1, không thoả §7, method không
tái lập được) → thêm vào `rejected.json` kèm **lý do cụ thể**, `by: "Codex"`,
set metadata `status: "rejected"`. KHÔNG xoá folder. Báo user.

## Ràng buộc
- `analysis.html` đứng độc lập (inline CSS, không CDN), tiếng Việt, giữ thuật
  ngữ EN trong ngoặc.
- Khối **Header** của `analysis.html` PHẢI có badge `⏱️ Horizon` lấy từ
  `prediction_horizon` (AGENTS.md §6).
- KHÔNG bịa số. Thiếu → `UNKNOWN`.
- KHÔNG ghi đè `analysis.html` đã có → tạo `analysis.v2.html`, cập nhật summary.
- KHÔNG tự đụng `chosed_papers/` (chỉ user promote).

## Orchestration — fetch ở main loop, analyze chạy song song
- **Tải PDF**: LÀM Ở MAIN LOOP (skill `pdf-fetch`). Subagent bị **403 với HTTP ngoài** → đừng giao việc tải/gọi API cho subagent.
- **Phân tích**: parallel hoá được — mỗi agent chỉ đọc/ghi **file local** (extracted.md + SKILL + ví dụ + baseline → analysis.html + summary.json + metadata). Local nên subagent làm tốt.
- **Bài học 402/timeout**: nếu Workflow báo agent "failed" ở bước trả kết quả nhưng agent ĐÃ ghi file xong trước đó → **KIỂM TRA DISK trước khi chạy lại** (đừng tốn quota phân tích lại). Lỗi "socket closed" thường transient → re-invoke cùng `scriptPath`.

## Phân tích hàng loạt (Workflow fan-out — pattern đã chạy tốt)
Khi có ≥3 bài cần phân tích, dùng Workflow `parallel()` thay vì tuần tự:
```js
export const meta = { name:'analyze-papers', description:'...', phases:[{title:'Analyze'}] }
const PAPERS = [
  { id:'<paper_id>', dir:'searched_papers/Layer_X/<paper_id>', pages:12,
    example:'searched_papers/Layer_4_XAI_Trien_Khai/kaliappan2024_featsel_diverse_datasets/analysis.html', // file mẫu chuẩn
    baselines:['searched_papers/Layer_X/<peer>/summary.json'],   // so sánh cùng layer
    hint:'<điểm cần moi: dataset, horizon, gì đặc biệt>' },
  // ...
]
const RET = { type:'object', required:['paper_id','verdict','best_metric','wrote_files'],
  properties:{ paper_id:{type:'string'}, verdict:{type:'string'}, best_metric:{type:'string'}, wrote_files:{type:'boolean'} } }
phase('Analyze')
const out = await parallel(PAPERS.map(p => () => agent(
  `Đọc ${p.dir}/extracted.md + .Codex/skills/paper-analyzer/SKILL.md + ví dụ ${p.example} + baselines ${p.baselines.join(', ')}.
   Phân tích bài ${p.id} (${p.pages} trang). Ghi ${p.dir}/analysis.html (8 khối §6) + ${p.dir}/summary.json (15 key)
   + cập nhật ${p.dir}/metadata.json (status & analysis_status = analyzed, xác nhận prediction_horizon,
   sửa dataset/method/code nếu đọc full thấy sai → ghi vào field corrections).
   Gợi ý: ${p.hint}. KHÔNG bịa số — thiếu thì UNKNOWN. KHÔNG đụng chosed_papers/.`,
  { label:`analyze:${p.id}`, schema:RET })))
return out.filter(Boolean)
```
Sau khi workflow xong: main loop `grep` lại headline metric trong extracted.md để chống bịa, và verify mỗi folder đủ analysis.html + summary.json (15 key) + metadata=analyzed.
