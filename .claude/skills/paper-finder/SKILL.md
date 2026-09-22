---
name: paper-finder
description: |
  Tìm bài báo mới về DỰ ĐOÁN đái tháo đường (diabetes prediction, binary
  classification, tabular & EHR), gán đúng Layer 1-4 + prediction_horizon,
  đặt vào `searched_papers/Layer_X/<paper_id>/` để đợi phân tích.
inputs:
  - chosed_papers/Layer_<1..4>/        # nền tảng để so chiếu chủ đề
  - AGENTS.md                          # §1 scope, §3 Layer, §3b prediction_horizon
outputs:
  - searched_papers/Layer_<1..4>/<paper_id>/source.pdf
  - searched_papers/Layer_<1..4>/<paper_id>/metadata.json  # gồm cả field integrity mới
---

# paper-finder

## Mục đích
Mở rộng kho `searched_papers/` bằng các bài báo **dự đoán đái tháo đường**, phân
ngay vào Layer phù hợp + gán `prediction_horizon`, dựa trên chủ đề chính:

| Layer | Trọng tâm |
|-------|-----------|
| 1 — Pipeline_Nen_Tang | Tiền xử lý, imbalance, oversampling, feature engineering |
| 2 — Model_Hieu_Qua    | So sánh model / ensemble / boosting / deep tabular |
| 3 — Dataset_EHR       | EHR thật, MIMIC, eICU, NHANES, cohort thực tế |
| 4 — XAI_Trien_Khai    | Explainability, SHAP/LIME, deployment, clinical impact |

**Đồng thời gán `prediction_horizon`** (trục thứ 2 — AGENTS.md §3b, độc lập Layer):

| Horizon | Khi nào |
|---------|---------|
| `cross_sectional` | Dự đoán từ feature hiện tại, không follow-up |
| `early_detection` | Phát hiện sớm / sàng lọc người chưa chẩn đoán, prediabetes — **ƯU TIÊN** |
| `long_term_risk`  | Onset sau N năm, cohort longitudinal — **ƯU TIÊN (kho đang thiếu)** |

## Ràng buộc cứng (lấy từ AGENTS.md §7)
0. **Đúng scope §1**: phải là bài DỰ ĐOÁN đái tháo đường (tabular/EHR). Không phải → loại ngay.
1. Citations ≥ 100 (>3y) hoặc ≥ 30 (1–3y) hoặc rising-star (>5 cite/tháng nếu <1y).
2. Dataset public + license cho research.
3. Có code reproducible hoặc mô tả method đủ chi tiết.

## Cổng toàn vẹn (thêm 2026-09-21) — TRƯỚC khi tạo folder

Trước khi tạo `searched_papers/Layer_X/<paper_id>/`, PHẢI chạy đủ 3 kiểm tra:

### Kiểm tra 1: DOI phân giải qua CrossRef
```bash
curl -s "https://api.crossref.org/works/<DOI>" | python -c "
import sys, json
d = json.load(sys.stdin)
m = d.get('message', {})
print('title:', m.get('title', ['UNKNOWN'])[0])
print('year:', m.get('published', {}).get('date-parts', [[None]])[0][0])
print('doi:', m.get('DOI'))
print('status: ok')
"
```
- Nếu CrossRef trả về `Resource not found` → ghi `integrity.doi_resolved: false`, KHÔNG tạo folder.
- Đối chiếu title CrossRef vs title paper tìm được: khác lớn (>30% words) → cảnh báo.

### Kiểm tra 2: Khớp title
- Title từ CrossRef phải khớp phần lớn với title từ Semantic Scholar/PubMed.
- Nếu khác → ghi `integrity.title_match: false`, cảnh báo user.

### Kiểm tra 3: Retraction / Correction check
```bash
curl -s "https://api.crossref.org/works/<DOI>" | python -c "
import sys, json
d = json.load(sys.stdin)
m = d.get('message', {})
updates = m.get('relation', {}).get('is-retraction-of', [])
corr = m.get('relation', {}).get('is-correction-of', [])
print('retracted:', bool(updates))
print('has_correction:', bool(corr))
print('type:', m.get('type'))
"
```
- Nếu có `is-retraction-of` → KHÔNG tạo folder, ghi vào `rejected.json` với `reason: retracted`.
- Nếu có correction → tạo folder nhưng ghi `integrity.has_correction: true`.

### Ghi vào metadata.json: field `integrity` (mới)
```json
"integrity": {
  "doi_resolved": true,
  "title_match": true,
  "crossref_type": "journal-article",
  "retracted": false,
  "has_correction": false,
  "checked_at": "<ISO-8601>",
  "check_source": "crossref"
}
```
- Field `integrity` là field MỚI THÊM — không đụng field cũ, không phá webapp.
- Nếu CrossRef không trả lời → ghi `integrity.doi_resolved: null`, `check_source: "unavailable"`.

---

## Quy trình
1. Đọc 4 layer trong `chosed_papers/` để biết đang có gì → tránh trùng lặp.
2. Đề xuất ≤ 5 paper mới mỗi lần, mỗi paper kèm:
   - `paper_id` theo format `<lastname><year>_<3-word-slug>`
   - Layer được gán + lý do (1 câu)
   - `prediction_horizon` (1 trong 3) + lý do (1 câu)
   - **ƯU TIÊN ĐẶC BIỆT** bài thuộc `early_detection` hoặc `long_term_risk`
3. Chạy **cổng toàn vẹn** (3 bước trên) với mỗi paper đề xuất trước khi trình user.
   Nếu kiểm tra thất bại → không đề xuất bài đó, thay thế bằng bài khác.
4. Sau khi user duyệt, tạo folder và chạy pdf-fetch.

## Khi không chắc Layer / horizon
- Không chắc Layer → mặc định Layer 2, `layer_uncertain: true`.
- Không chắc horizon → mặc định `cross_sectional`, `horizon_uncertain: true`.

## Changelog cục bộ

| Ngày | Thay đổi | Người thực hiện |
|------|---------|----------------|
| 2026-09-21 | v2: Thêm cổng toàn vẹn (DOI phân giải, khớp title, retraction check qua CrossRef). Thêm field `integrity` vào metadata.json. Ưu tiên đề xuất early_detection + long_term_risk. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Khôi phục dấu tiếng Việt (mất do PowerShell Out-File CP437). Dùng Python UTF-8 write. | agent (fix/encoding) |
