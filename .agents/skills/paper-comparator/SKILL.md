---
name: paper-comparator
description: |
  So sánh chi tiết một bài báo trong `searched_papers/` với các bài
  báo còn lại trong CÙNG LAYER (và optionally với `chosed_papers/`
  cùng layer) — tìm điểm trùng, điểm khác biệt, điểm vượt trội, gap.
inputs:
  - searched_papers/Layer_<n>/<target_paper_id>/analysis.html
  - searched_papers/Layer_<n>/*/analysis.html
  - chosed_papers/Layer_<n>/*/analysis.html  (optional)
outputs:
  - searched_papers/Layer_<n>/<target_paper_id>/comparison.md
---

# paper-comparator

## Mục đích
Trả lời 1 câu hỏi: "Paper này có gì NEW / BETTER / OVERLAP so với
những paper khác trong layer?" — để user nhanh chóng quyết định loại
bỏ paper trùng và promote paper nổi bật lên `chosed_papers/`.

## Quy trình
1. Lấy `analysis.html` của paper target + tất cả paper khác cùng layer.
2. Đối chiếu các trục:
   - **Prediction horizon** (§3b): cùng horizon mới so trực tiếp được; khác horizon
     (vd cross_sectional vs long_term_risk) thì KHÔNG so metric thẳng — note rõ.
   - **Dataset**: cùng / khác / mở rộng?
   - **Method**: trùng / cải tiến / mới hoàn toàn?
   - **Metric & kết quả**: ai cao hơn? Trên cùng dataset (và cùng horizon)?
   - **Hạn chế**: paper target có khắc phục được limit của paper khác không?
3. Xuất `comparison.md` dạng bảng + 3 phần:
   - `## Trùng lặp` — các paper làm tương tự
   - `## Khác biệt / Vượt trội` — điểm paper target hơn
   - `## Gap còn lại` — điểm paper target chưa giải quyết
4. Cuối file ghi `## Verdict`: `promote` / `keep_in_searched` / `reject`
   kèm 1 câu lý do — để user dùng làm input quyết định.

## Ràng buộc
- So sánh metric chỉ hợp lệ khi **cùng `prediction_horizon` + cùng dataset**; khác
  horizon thì so cách tiếp cận, không so con số.
- KHÔNG tự move paper sang `chosed_papers/`. Chỉ gợi ý verdict.
- So sánh PHẢI dựa trên `analysis.html` đã có, không tự đọc lại PDF.
- Nếu paper khác thiếu analysis.html → bỏ qua, note rõ trong comparison.md.
