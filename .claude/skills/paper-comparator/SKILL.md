---
name: paper-comparator
description: |
  Perform detailed comparison of a paper in `01_Diabetes_Research/searched_papers/` against
  other papers in the SAME LAYER (and optionally with `01_Diabetes_Research/chosed_papers/`
  in the same layer) — identifying overlaps, differences, advantages, and gaps.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/summary.json   # rob_audit if available
  - 01_Diabetes_Research/searched_papers/Layer_<n>/*/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/*/summary.json
  - 01_Diabetes_Research/chosed_papers/Layer_<n>/*/analysis.html  (optional)
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/comparison.md   # or comparison.v2.md if already exists
---

# paper-comparator

## Purpose
Answer 1 core question: "What is NEW / BETTER / OVERLAPPING in this paper compared to
other papers in the layer?" — enabling the user to quickly reject
redundant papers and promote outstanding papers to `01_Diabetes_Research/chosed_papers/`.

## Procedure
1. Retrieve `analysis.html` + `summary.json` for target paper + all other papers in the same layer.
2. **Compare ONLY papers sharing the same `prediction_horizon` AND `label_type`**:
   - Same horizon + same label: compare quantitative metrics directly.
   - Different horizon: compare methodological approaches only, DO NOT compare quantitative metrics.
   - Different label_type (binary vs multiclass_staging): DO NOT compare metrics, explicitly note distinction.
3. Compare across axes:
   - **Prediction horizon** (§3b): direct comparison valid only for shared horizon
   - **Dataset**: identical / different / extended?
   - **Method**: overlapping / incremental / entirely novel?
   - **Metrics & results**: which performs higher? On identical dataset (shared horizon)?
   - **Limitations**: does target paper resolve limitations of other papers?
   - **RoB audit** (if summary.json contains rob_audit): compare degree of leakage violations.
4. Output `comparison.md` (or `comparison.v2.md` if already existing) containing:
   - `## Trùng lặp` — papers with similar methodologies
   - `## Khác biệt / Vượt trội` — advantages of target paper
   - `## Gap còn lại` — unresolved limitations of target paper
   - `## Bảng claim-evidence` (new — see schema below)
   - `## Số liệu nghi thổi phồng` (new — see schema below)
   - `## Verdict`: `promote` / `keep_in_searched` / `reject` + 1-sentence rationale

---

## Bảng claim-evidence (Added 2026-09-21)

Following the metric comparison section, this table MUST be emitted:

```markdown
## Bảng claim-evidence

| paper_id | metric | dataset | validation | Có rò rỉ (từ rob_audit)? | So sánh được với Paper_01? |
|----------|--------|---------|-----------|--------------------------|---------------------------|
| gr2024 | AUROC 0.89 (Table 3) | PIMA | internal CV | CP3: SMOTE trước split (E) | KHÔNG — khác horizon (cross_sectional vs early_detection) |
| nipa2023 | Acc 98.7% (Table 5) | PIMA | 1 split cố định | E: winner curse | KHÔNG — không có calibration, winner curse |
| sgchoi2023 | AUROC 0.827 (Table 4) | KNHANES | external temporal | Không xác định | CÓ — cùng early_detection, có external val |
```

**Table completion rules**:
- `paper_id`: paper identifier per AGENTS.md §5
- `metric`: number + unit + provenance (Table X / Fig Y). Missing → `UNKNOWN`.
- `dataset`: dataset name
- `validation`: validation type (internal CV / temporal / external / 1 split / UNKNOWN)
- `Có rò rỉ`: extracted from `summary.json.rob_audit.probe_hits[]` + `leakage_types[]` if available. If rob_audit not yet available → write "Chưa có rob_audit, cần kiểm tra".
- `So sánh được với Paper_01?`: Y + brief rationale, or N + brief rationale.
  - Y only when: same `prediction_horizon`, identical or equivalent `label_type`, with metric on test/external set free from leakage.
  - N if: different horizon, metric derived solely from validation set with winner's curse, or explicit F-leakage present.

---

## Section "Số liệu nghi thổi phồng" (Added 2026-09-21)

If any paper in the comparison carries `role: inflation` (AGENTS.md §5) OR displays signs of:
- AUROC/Acc > 0.95 on PIMA or Sylhet without nested CV
- Evident winner's curse (single fixed split, evaluated across many models, highest chosen)
- F-leakage (glucose/HbA1c included in features)

Then add section:

```markdown
## Số liệu nghi thổi phồng

| paper_id | metric | lý do nghi | evidence_ref | cần verify trước khi cite? |
|----------|--------|-----------|--------------|---------------------------|
| nipa2023 | Acc 98.7% | Winner curse: 35 classifier, 1 split, tự nhận "no validation methods" | Sec 3 | CÓ |
| olisah2022 | AUROC 1.00 | F-leakage: relabel theo glucose trong feature | Table 2 | CÓ |
```

> This section prevents the user from including inflated numbers in the Discussion section of Paper_01.

---

## Constraints
- Metric comparison is valid only with **same `prediction_horizon` + same dataset**; otherwise compare methodologies.
- **If comparison.md already exists → write `comparison.v2.md`**, noting at the top: "Phiên bản 2 - có thêm bảng claim-evidence + mục thổi phồng".
- DO NOT move papers to `01_Diabetes_Research/chosed_papers/` autonomously. Suggest verdict only.
- Comparisons MUST rely on existing `analysis.html` + `summary.json`, do not re-read PDFs.
- If another paper lacks analysis.html → skip it, noting explicitly in comparison.md.

## Local Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-09-21 | v2: Compare metrics only across papers with matching prediction_horizon + label_type. Added claim-evidence table. Added inflated metrics section (role:inflation). If comparison.md exists → write comparison.v2.md. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Restored Vietnamese diacritics (lost due to PowerShell Out-File CP437). Use Python UTF-8 write. | agent (fix/encoding) |
