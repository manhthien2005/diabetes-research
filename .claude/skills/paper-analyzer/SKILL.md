---
name: paper-analyzer
description: |
  Phân tích SÂU một bài báo trong `searched_papers/Layer_X/<paper_id>/`,
  xuất ra `analysis.html` (tiếng Việt, 8 khối theo AGENTS.md §6) VÀ
  `summary.json` (máy đọc được, để sinh research brief). Mục tiêu: user
  quyết promote/loại mà không cần mở PDF.
inputs:
  - searched_papers/Layer_<n>/<paper_id>/extracted.md
  - searched_papers/Layer_<n>/<paper_id>/source.pdf
  - searched_papers/Layer_<n>/<paper_id>/metadata.json
  - chosed_papers/Layer_<n>/
outputs:
  - searched_papers/Layer_<n>/<paper_id>/analysis.html
  - searched_papers/Layer_<n>/<paper_id>/summary.json
  - searched_papers/Layer_<n>/<paper_id>/rob_audit.json
---

# paper-analyzer

## Mục đích
Biến 1 PDF khoa học thành phân tích tiếng Việt SÂU + một bản tóm tắt máy
đọc được, để user quyết "promote lên `chosed_papers/` hay loại".

## Quy trình
1. **Đọc full text**: ưu tiên `extracted.md`. Nếu chưa có → chạy `pdf-extract`.
2. Đọc `metadata.json` + đọc paper trong `chosed_papers/Layer_<n>/` cùng layer.
3. Render `analysis.html` theo **8 khối** (AGENTS.md §6). KHÔNG đổi cấu trúc.
4. Ghi `summary.json` (schema dưới) — bao gồm key `rob_audit` mới.
5. Ghi `rob_audit.json` (bản riêng cho QC).
6. Set `analysis_status: "analyzed"` + xác nhận `prediction_horizon` trong metadata.

## Đi SÂU — bắt buộc moi đủ
Không dừng ở mô tả chung. PHẢI rút được:
- **Prediction horizon** (§3b)
- **Pipeline chính xác**: từng bước tiền xử lý → cân bằng → feature → model → tuning
- **Dataset & split**: tên, số mẫu, số feature, tỉ lệ train/test, CV, cân bằng lớp
- **Metric kèm NGUỒN**: ghi "Table X / Fig Y / Section Z". Không có → UNKNOWN.
- **Khả năng tái lập** (high/medium/low) + lý do
- **So với baseline**: hơn/kém cụ thể
- **Gap / điểm yếu**: cơ hội cải tiến cho đề tài

## RoB mini-audit (thêm 2026-09-21)

Sau khi phân tích pipeline, chạy **6 probe CP + 1 probe O11** (từ skill peer-review):

### Probe CP1–CP6 (Clinical Prediction Model)
- **CP1**: Có nested CV hoặc held-out test set thật sự? (Tuning và reporting TÁCH biệt?)
- **CP2**: Feature selection có nằm TRONG fold không, hay fit trên toàn data?
- **CP3**: Oversampling/SMOTE có TRONG fold không, hay trước khi split?
- **CP4**: Có báo calibration (slope, intercept, calibration plot) không?
- **CP5**: Có external/temporal validation không?
- **CP6**: Có biến định-nghĩa-nhãn (HbA1c/FPG/OGTT/glucose) nằm trong feature không?

### Probe O11 (Complex Survey / NHANES)
- **O11**: Nếu dùng NHANES/BRFSS/KNHANES: có áp survey weights? Có báo prevalence có trọng số?

### Taxonomy rò rỉ (LEAKAGE_MAP.md §2)
Đối chiếu với 6 dạng vi phạm:
- **B**: Impute/scale trên toàn bộ data trước split
- **C**: Feature selection trên toàn bộ data
- **D**: SMOTE/oversample trước split
- **E**: Chọn model trên test set (winner's curse)
- **F**: Biến định-nghĩa-nhãn trong feature
- **G**: Ép 50/50 rồi đọc accuracy ở prevalence giả

Ghi vào `leakage_types[]` mỗi loại vi phạm tìm thấy (ký hiệu "B"..."G").

---

## summary.json (schema)

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
  "analyzed_at": "<ISO-8601>",
  "rob_audit": {
    "probe_hits": ["CP2", "E"],
    "leakage_types": ["C", "E"],
    "validation_level": "internal|temporal|external|UNKNOWN",
    "calibration_reported": true,
    "survey_design_handled": null,
    "prevalence_realistic": false,
    "evidence_ref": "Table 2 / Sec 2.3",
    "confidence": "high|medium|low"
  }
}
```

**Ghi chú schema `rob_audit`**:
- `probe_hits[]`: probe THẤT BẠI (CP1–CP6, O11). Rỗng = không tìm thấy vi phạm.
- `leakage_types[]`: loại vi phạm rò rỉ (B–G). Rỗng = không xác định.
- `validation_level`: cấp độ cao nhất (external > temporal > internal > UNKNOWN).
- `calibration_reported`: có báo calibration không.
- `survey_design_handled`: chỉ điền nếu paper dùng NHANES/BRFSS; else null.
- `prevalence_realistic`: đánh giá có ở prevalence thực tế không.
- `evidence_ref`: nguồn bằng chứng ("Table X / Sec Y") hoặc UNKNOWN.
- `confidence`: mức tin cậy (high=có quote, medium=suy luận, low=thiếu thông tin).

---

## rob_audit.json (bản riêng QC)
```json
{
  "paper_id": "<id>",
  "audited_at": "<ISO-8601>",
  "auditor": "paper-analyzer v2",
  "probe_hits": [],
  "leakage_types": [],
  "validation_level": "UNKNOWN",
  "calibration_reported": false,
  "survey_design_handled": null,
  "prevalence_realistic": true,
  "evidence_ref": "UNKNOWN",
  "confidence": "low",
  "notes": ""
}
```

> **Khi kiểm thử (Bước 5)**: ghi `rob_audit.json` cạnh `summary.json` nhưng KHÔNG sửa `summary.json` ở lượt thử. Sau khi user duyệt mới merge.

---

## Tự reject khi bài dở (user đã uỷ quyền — AGENTS.md §11)
Nếu phân tích thấy bài KHÔNG đạt → thêm vào `rejected.json` kèm lý do cụ thể, `by: "Codex"`, set `status: "rejected"`. KHÔNG xoá folder.

## Ràng buộc
- `analysis.html` độc lập (inline CSS, không CDN), tiếng Việt, giữ thuật ngữ EN.
- Khối **Header** PHẢI có badge Horizon từ `prediction_horizon`.
- **8 KHỐI HTML KHÔNG ĐỔI** — rob_audit KHÔNG xuất hiện trong analysis.html.
- KHÔNG bịa số. Thiếu → UNKNOWN.
- KHÔNG ghi đè `analysis.html` đã có → tạo `analysis.v2.html`.
- KHÔNG tự đụng `chosed_papers/`.

## Orchestration
- **Tải PDF**: MAIN LOOP (skill pdf-fetch). Subagent bị 403 với HTTP ngoài.
- **Phân tích**: parallel hoá được (đọc/ghi file local).

## Changelog cục bộ

| Ngày | Thay đổi | Người thực hiện |
|------|---------|----------------|
| 2026-09-21 | v2: Thêm bước RoB mini-audit (probe CP1–CP6 + O11), taxonomy rò rỉ từ LEAKAGE_MAP. Thêm key `rob_audit` vào summary.json. Thêm output `rob_audit.json`. KHÔNG đổi 8 khối HTML, KHÔNG đổi field webapp đọc. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Khôi phục dấu tiếng Việt (mất do PowerShell Out-File CP437). Dùng Python UTF-8 write. | agent (fix/encoding) |
