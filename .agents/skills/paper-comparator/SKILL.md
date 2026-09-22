---
name: paper-comparator
description: |
  So sánh chi tiết một bài báo trong `01_Diabetes_Research/searched_papers/` với các bài
  báo còn lại trong CÙNG LAYER (và optionally với `01_Diabetes_Research/chosed_papers/`
  cùng layer) — tìm điểm trùng, điểm khác biệt, điểm vượt trội, gap.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/summary.json   # rob_audit nếu có
  - 01_Diabetes_Research/searched_papers/Layer_<n>/*/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/*/summary.json
  - 01_Diabetes_Research/chosed_papers/Layer_<n>/*/analysis.html  (optional)
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/comparison.md   # hoặc comparison.v2.md nếu đã có
---

# paper-comparator

## Mục đích
Trả lời 1 câu hỏi: "Paper này có gì NEW / BETTER / OVERLAP so với
những paper khác trong layer?" — để user nhanh chóng quyết định loại
bỏ paper trùng và promote paper nổi bật lên `01_Diabetes_Research/chosed_papers/`.

## Quy trình
1. Lấy `analysis.html` + `summary.json` của paper target + tất cả paper khác cùng layer.
2. **Chỉ so sánh bài cùng `prediction_horizon` VÀ cùng `label_type`**:
   - Cùng horizon + cùng label: so metric trực tiếp.
   - Khác horizon: chỉ so phương pháp tiếp cận, KHÔNG so metric số.
   - Khác label_type (binary vs multiclass_staging): KHÔNG so metric, note rõ.
3. Đối chiếu các trục:
   - **Prediction horizon** (§3b): cùng horizon mới so trực tiếp
   - **Dataset**: cùng / khác / mở rộng?
   - **Method**: trùng / cải tiến / mới hoàn toàn?
   - **Metric & kết quả**: ai cao hơn? Trên cùng dataset (cùng horizon)?
   - **Hạn chế**: paper target có khắc phục limit của paper khác không?
   - **Rob audit** (nếu có summary.json với rob_audit): so sánh mức độ vi phạm rò rỉ.
4. Xuất `comparison.md` (hoặc `comparison.v2.md` nếu đã có) gồm:
   - `## Trùng lặp` — các paper làm tương tự
   - `## Khác biệt / Vượt trội` — điểm paper target hơn
   - `## Gap còn lại` — điểm paper target chưa giải quyết
   - `## Bảng claim-evidence` (mới — xem schema dưới)
   - `## Số liệu nghi thổi phồng` (mới — xem dưới)
   - `## Verdict`: `promote` / `keep_in_searched` / `reject` + 1 câu lý do

---

## Bảng claim-evidence (thêm 2026-09-21)

Sau phần So sánh metric, PHẢI xuất bảng này:

```markdown
## Bảng claim-evidence

| paper_id | metric | dataset | validation | Có rò rỉ (từ rob_audit)? | So sánh được với Paper_01? |
|----------|--------|---------|-----------|--------------------------|---------------------------|
| gr2024 | AUROC 0.89 (Table 3) | PIMA | internal CV | CP3: SMOTE trước split (E) | KHÔNG — khác horizon (cross_sectional vs early_detection) |
| nipa2023 | Acc 98.7% (Table 5) | PIMA | 1 split cố định | E: winner curse | KHÔNG — không có calibration, winner curse |
| sgchoi2023 | AUROC 0.827 (Table 4) | KNHANES | external temporal | Không xác định | CÓ — cùng early_detection, có external val |
```

**Quy tắc điền bảng**:
- `paper_id`: mã paper theo AGENTS.md §5
- `metric`: số + đơn vị + nguồn (Table X / Fig Y). Thiếu → UNKNOWN.
- `dataset`: tên dataset
- `validation`: loại validation (internal CV / temporal / external / 1 split / UNKNOWN)
- `Có rò rỉ`: lấy từ `summary.json.rob_audit.probe_hits[]` + `leakage_types[]` nếu có. Nếu chưa có rob_audit → ghi "Chưa có rob_audit, cần kiểm tra".
- `So sánh được với Paper_01?`: Y + lý do ngắn, hoặc N + lý do ngắn.
  - Y chỉ khi: cùng `prediction_horizon`, cùng hoặc tương tự `label_type`, có metric trên tập test/external không rò rỉ.
  - N nếu: khác horizon, metric từ trên val set duy nhất bị winner-curse, có F-leakage rõ ràng.

---

## Mục "Số liệu nghi thổi phồng" (thêm 2026-09-21)

Nếu có bất kỳ bài nào trong comparison có `role: inflation` (AGENTS.md §5) HOẶC có các dấu hiệu:
- AUROC/Acc > 0.95 trên PIMA hay Sylhet không có nested CV
- Winner curse rõ ràng (1 split cố định, nhiều model, lấy cao nhất)
- F-leakage (glucose/HbA1c trong feature)

Thì thêm mục:

```markdown
## Số liệu nghi thổi phồng

| paper_id | metric | lý do nghi | evidence_ref | cần verify trước khi cite? |
|----------|--------|-----------|--------------|---------------------------|
| nipa2023 | Acc 98.7% | Winner curse: 35 classifier, 1 split, tự nhận "no validation methods" | Sec 3 | CÓ |
| olisah2022 | AUROC 1.00 | F-leakage: relabel theo glucose trong feature | Table 2 | CÓ |
```

> Mục này giúp user tránh viết số bị thổi phồng vào Discussion của Paper_01.

---

## Ràng buộc
- So sánh metric chỉ hợp lệ khi **cùng `prediction_horizon` + cùng dataset**; khác horizon thì so phương pháp.
- **Nếu comparison.md đã có → ghi `comparison.v2.md`**, ghi chú ở đầu file "Phiên bản 2 - có thêm bảng claim-evidence + mục thổi phồng".
- KHÔNG tự move paper sang `01_Diabetes_Research/chosed_papers/`. Chỉ gợi ý verdict.
- So sánh PHẢI dựa trên `analysis.html` + `summary.json` đã có, không tự đọc lại PDF.
- Nếu paper khác thiếu analysis.html → bỏ qua, note rõ trong comparison.md.

## Changelog cục bộ

| Ngày | Thay đổi | Người thực hiện |
|------|---------|----------------|
| 2026-09-21 | v2: Chỉ so metric bài cùng prediction_horizon + label_type. Thêm bảng claim-evidence. Thêm mục "số liệu nghi thổi phồng" (role:inflation). Nếu comparison.md đã có → ghi comparison.v2.md. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Khôi phục dấu tiếng Việt (mất do PowerShell Out-File CP437). Dùng Python UTF-8 write. | agent (fix/encoding) |
