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
  - searched_papers/Layer_<1..4>/<paper_id>/metadata.json
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
| `cross_sectional` | Dự đoán từ feature hiện tại, không follow-up (PIMA, BRFSS, Sylhet) |
| `early_detection` | Phát hiện sớm / sàng lọc người chưa chẩn đoán, prediabetes |
| `long_term_risk`  | Onset sau N năm, cohort longitudinal (ĐANG THIẾU — ưu tiên tìm) |

## Ràng buộc cứng (lấy từ AGENTS.md §7)
0. **Đúng scope §1**: phải là bài DỰ ĐOÁN đái tháo đường (tabular/EHR). Không phải
   diabetes prediction → loại ngay, không đề xuất.
1. Citations ≥ 100 (>3y) hoặc ≥ 30 (1–3y) hoặc rising-star (>5 cite/tháng nếu <1y).
2. Dataset public + license cho research.
3. Có code reproducible hoặc mô tả method đủ chi tiết.

## Quy trình
1. Đọc 4 layer trong `chosed_papers/` để biết đang có gì → tránh trùng lặp.
2. Đề xuất ≤ 5 paper mới mỗi lần, mỗi paper kèm:
   - `paper_id` theo format `<lastname><year>_<3-word-slug>`
   - Layer được gán + lý do (1 câu)
   - `prediction_horizon` được gán (1 trong 3 — §3b) + lý do (1 câu)
3. Sau khi user duyệt, tạo folder
   `searched_papers/Layer_<n>_*/<paper_id>/` chứa:
   - `source.pdf` — tải theo skill **`pdf-fetch`** (playbook route: IEEE staging,
     Europe PMC render, closed-access → `download_link`). Tải PDF chạy ở **main loop**
     (subagent bị 403 với API ngoài).
   - `metadata.json` (theo schema AGENTS.md §5)
4. KHÔNG tự sinh `analysis.html` — đó là việc của `paper-analyzer`.

## Khi không chắc Layer / horizon
- Không chắc Layer → mặc định Layer 2, `layer_uncertain: true`.
- Không chắc horizon → mặc định `cross_sectional`, `horizon_uncertain: true`.
Ghi vào metadata để user quyết.
