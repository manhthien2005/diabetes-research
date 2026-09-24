---
name: paper-comparator
description: |
  Perform detailed comparison of a paper in `01_Diabetes_Research/searched_papers/` against
  other papers in the SAME LAYER (and optionally with `01_Diabetes_Research/chosed_papers/`
  in the same layer) — identifying overlaps, differences, advantages, and gaps, grounded
  in claim-level provenance per docs/agent/EVIDENCE_POLICY.md.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/summary.json
  - 01_Diabetes_Research/searched_papers/Layer_<n>/*/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/*/summary.json
  - 01_Diabetes_Research/chosed_papers/Layer_<n>/*/analysis.html  (optional)
  - docs/agent/EVIDENCE_POLICY.md
  - docs/agent/PAPER_SCHEMA.md
  - docs/agent/DECISION_AUTHORITY.md
  - .agents/skills/paper-analyzer/references/literature_review_formats.md
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<target_paper_id>/comparison.md   # or comparison.v2.md if already exists
---

# paper-comparator

## Purpose
Answer 1 core question: "What is NEW / BETTER / OVERLAPPING in this paper compared to other papers in the layer?" — grounded in claim-level provenance, separating methodological strength, evidentiary relevance, and reproduction feasibility, enabling the human researcher to make informed promotion and selection decisions.

## Procedure
1. Retrieve `analysis.html` + `summary.json` for target paper + other papers in the same layer.
2. **Apply Comparability Gate before comparing metrics**:
   - Compare quantitative metrics directly ONLY across papers with aligned research questions, cohorts, outcome definitions, index times, and prediction horizons.
   - For divergent horizons or label types: compare methodological approaches and feature design only; DO NOT compare raw performance metrics.
3. Construct the **Multi-Paper Comparison Matrix** (`references/literature_review_formats.md`) placing comparison dimensions as rows and each paper as a horizontal column, with a substantive **Cross-paper synthesis** final column.
4. Conduct deep cross-paper synthesis across dimensions:
   - **Candidate Roles & Evidentiary Relevance**: Is the paper valuable as conceptual or epidemiological evidence (`evidence_candidate`)?
   - **Reproduction Feasibility**: Does the paper provide public data and code for replication (`reproduction_candidate`)? (Do not conflate reproducibility with scientific quality).
   - **Prediction Horizon** (§3b): Direct comparison valid only for shared horizon.
   - **Dataset**: Identical / different / extended?
   - **Method**: Overlapping / incremental / novel?
   - **Metrics & Results**: Which performs higher on identical data/horizon? (Check for data leakage before comparing).
   - **Risk of Bias & Leakage**: Compare CP1–CP6 probes and leakage types (B–G).
   - **Claim Provenance**: When asserting that target paper outperforms or contradicts another paper, ground the claim in verified table, figure, or section locations.
5. Output `comparison.md` (or `comparison.v2.md` if already existing) following the structured presentation order:
   - `## Các bài báo được so sánh (Papers Included)`
   - `## Ma trận so sánh đa bài báo (Multi-Paper Comparison Matrix)`
   - `## Đánh giá tính khả so (Comparability Assessment)`
   - `## Tổng hợp đối sánh chi tiết (Detailed Cross-Paper Synthesis)`
     - `### Trùng lặp (Overlaps)`
     - `### Khác biệt / Vượt trội (Differences / Advantages)`
     - `### Gap còn lại (Remaining Gaps)`
   - `## Phân tích đồng thuận và mâu thuẫn (Agreement & Disagreement Analysis)`
   - `## Đánh giá bằng chứng và khả năng tái lập (Evidence & Reproducibility Distribution)`
   - `## Bảng claim-evidence & provenance` (see schema below)
   - `## Số liệu nghi thổi phồng` (see schema below)
   - `## Hàm ý đối với nghiên cứu hiện tại (Implications for Current Research)`
   - `## Đề xuất khuyến nghị (Advisory Recommendation)`: `recommended_action: promote | retain_in_pool | exclude_from_current_scope | reject_with_human_review` + 1-sentence rationale

## Multi-Paper Comparison Matrix (Standardized Format)

When comparing two or more papers, include the **Multi-Paper Comparison Matrix** per `.agents/skills/paper-analyzer/references/literature_review_formats.md` before the narrative synthesis sections.

### Structural Contract
- **Orientation**: `ROWS_ARE_COMPARISON_DIMENSIONS_COLUMNS_ARE_PAPERS`.
- **Columns**: `| Comparison dimension | <Paper 1> | <Paper 2> | ... | Cross-paper synthesis |`.
- **Paper Labels**: Use stable short labels with citation anchors: e.g., `P1 (Author Year, Short Title)`, `P2 (Author Year, Short Title)`.
- **Canonical Rows**: Contains all 47 required comparison dimensions defined in `references/literature_review_formats.md`:
  `Title`, `Authors`, `Year`, `Journal`, `Country / Setting`, `Data source`, `Study design`, `Study period`, `Population`, `Sample size`, `Inclusion / Exclusion`, `Predictors / Exposures`, `Outcome / Target`, `Index time`, `Prediction horizon`, `Missing-data strategy`, `Statistical methods`, `Models`, `Validation strategy`, `Performance metrics`, `Calibration`, `Clinical utility`, `Survey design`, `Key findings`, `Quantitative results`, `Authors' interpretation`, `Evidence-supported mechanism`, `Analytical hypothesis`, `Strengths`, `Limitations`, `Risk of bias / Leakage`, `Generalizability`, `Data availability`, `Code availability`, `Evidence relevance`, `Reproducibility`, `Relevance to our study`, `Evidence candidate`, `Reproduction candidate`, `What we can reuse`, `What we must NOT reuse`, `Main agreements`, `Main disagreements`, `Likely reasons for disagreement`, `Research gaps`, `Future directions`, `Overall synthesis`.

### Rigor, Integrity, and Anti-Ranking Rules
- **No Overall Paper Ranking**: Never declare a "winner" or rank papers overall. Each paper offers distinct clinical or technical trade-offs.
- **Cross-Paper Synthesis Column**: Must synthesize cross-study consensus, methodological explanations for divergence, leakage-driven performance differences, and reusable insights for our project. Do not merely copy individual paper entries.
- **Missing Information**: Missing or unverified fields MUST use standardized sentinels: `Not reported`, `Not applicable`, `Not verified`, or `Unclear`. Never guess, extrapolate, or fabricate numbers, locations, or mechanisms.
- **Mechanism vs. Hypothesis**:
  - `Authors' interpretation`: Summarizes the original authors' stated perspective.
  - `Evidence-supported mechanism`: Confined to mechanisms directly supported by paper data.
  - `Analytical hypothesis`: Explicitly marked speculative interpretation (`[Analyst hypothesis]`).
  - Association is never converted into causality. Competing mechanisms must be presented as alternatives.
- **Large Comparisons (> 5 Papers)**:
  - For 2 to 5 papers, maintain a single matrix.
  - For > 5 papers, batch papers horizontally (e.g., `Batch 1: P1–P4`, `Batch 2: P5–P8`) preserving the identical 47 rows in exact order, followed by a unified cross-batch synthesis.

## Comparability Gate for Quantitative Comparisons

Before comparing AUROC, AUPRC, sensitivity, specificity, calibration, or effect sizes, rigorously assess all **11 Comparability Dimensions**:
1. `Research question`: Aligned clinical target?
2. `Study design`: Comparable cohort structure?
3. `Population`: Aligned demographics, age, and risk profile?
4. `Data source`: Comparable health systems or registries?
5. `Outcome definition`: Identical label definition (ADA lab criteria vs self-report)?
6. `Index time`: Aligned baseline prediction time $t_0$?
7. `Prediction horizon`: Aligned timeframe ($\Delta t = 0$ cross-sectional vs $N$-year incident risk)?
8. `Predictor availability`: Similar feature availability (lab-free vs lab-dependent)?
9. `Validation design`: Aligned validation rigor (internal holdout vs external/temporal)?
10. `Metric definition`: Identical thresholding and evaluation metrics?
11. `Survey or sampling design`: Consistent survey weighting and design handling?

**Comparability Decision Rules**:
- **Comparable**: Direct numerical comparisons permitted with caveats.
- **Partially Comparable**: State limiting differences explicitly before discussing metrics.
- **Non-Comparable**: DO NOT compare raw performance metrics or claim superiority:
  - Cross-sectional prevalent disease ($\Delta t = 0$) CANNOT be compared to longitudinal incident prediction ($t_0 + N$ years).
  - Internal random holdout CANNOT be compared to external or temporal validation.
  - Prevalence differences and selection criteria must be factored into interpretation.

---

## Bảng claim-evidence & provenance

Following the metric comparison section, this table MUST be emitted:

```markdown
## Bảng claim-evidence & provenance

| paper_id | metric & location | dataset | validation | Rò rỉ (rob_audit) | Vai trò ứng viên | Mức độ hỗ trợ claim | So sánh được với Paper_01? |
|----------|-------------------|---------|------------|-------------------|------------------|---------------------|---------------------------|
| gr2024 | AUROC 0.89 (Table 3, p. 5) | PIMA | internal CV | CP3: SMOTE trước split (E) | evidence_candidate | direct | KHÔNG — khác horizon (cross_sectional vs early_detection) |
| nipa2023 | Acc 98.7% (Table 5, p. 7) | PIMA | 1 split cố định | E: winner curse | evidence_candidate | partial (lacks CV) | KHÔNG — không có calibration, winner curse |
| sgchoi2023 | AUROC 0.827 (Table 4, p. 6) | KNHANES | external temporal | Không phát hiện | evidence + reproduction | direct | CÓ — cùng early_detection, có external val |
```

**Table completion rules**:
- `paper_id`: paper identifier per AGENTS.md §5
- `metric & location`: number + unit + provenance location ("Table X, p. Y"). Never fabricate locations; missing → `UNKNOWN`.
- `dataset`: dataset name
- `validation`: validation type (internal CV / temporal / external / 1 split / UNKNOWN)
- `Rò rỉ`: detected violations from `summary.json.rob_audit.probe_hits[]` + `leakage_types[]`.
- `Vai trò ứng viên`: `evidence_candidate`, `reproduction_candidate`, both, or neither.
- `Mức độ hỗ trợ claim`: `direct | partial | contextual | unsupported` per `docs/agent/EVIDENCE_POLICY.md`.
- `So sánh được với Paper_01?`: Y/N with brief rationale based on horizon and leakage status.

---

## Section "Số liệu nghi thổi phồng"

If any paper in the comparison carries `role: inflation` (AGENTS.md §5) OR displays signs of:
- AUROC/Acc > 0.95 on PIMA or Sylhet without nested CV
- Evident winner's curse (single fixed split, evaluated across many models, highest chosen)
- F-leakage (glucose/HbA1c included in features)

Then add section:

```markdown
## Số liệu nghi thổi phồng

| paper_id | metric & location | lý do nghi | evidence_ref | cần verify trước khi cite? |
|----------|-------------------|-----------|--------------|---------------------------|
| nipa2023 | Acc 98.7% (Table 5) | Winner curse: 35 classifier, 1 split, tự nhận "no validation methods" | Sec 3 | CÓ |
| olisah2022 | AUROC 1.00 (Table 2) | F-leakage: relabel theo glucose trong feature | Table 2 | CÓ |
```

> This section prevents inflated numbers from entering discussion baselines or uncalibrated comparisons.

---

## Constraints
- Metric comparison is valid only with **same `prediction_horizon` + same dataset**; otherwise compare methodologies only.
- **Do not treat citation count as a comparator-quality score**. Heavily cited papers may suffer from severe data leakage.
- **Do not treat reproducibility as equivalent to evidence quality**. High-value clinical evidence may have restricted data; open-code benchmark toys may have high leakage.
- **Do not create an overall best-paper ranking**. Each paper has specific methodological and practical trade-offs.
- **Advisory Recommendation Only**: The agent recommends an action (`promote`, `retain_in_pool`, `exclude_from_current_scope`, `reject_with_human_review`). Irreversible promotion to `chosed_papers/` or deletion requires explicit human authorization per `docs/agent/DECISION_AUTHORITY.md`.
- **If comparison.md already exists → write `comparison.v2.md`**, noting at the top: "Phiên bản 2 - có thêm bảng claim-evidence & provenance + mục thổi phồng".
- Comparisons MUST rely on existing `analysis.html` + `summary.json`; do not re-read PDFs.
- If another paper lacks analysis.html → skip it, noting explicitly in comparison.md.

## Local Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-09-21 | v2: Compare metrics only across papers with matching prediction_horizon + label_type. Added claim-evidence table. Added inflated metrics section (role:inflation). If comparison.md exists → write comparison.v2.md. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Restored Vietnamese diacritics (lost due to PowerShell Out-File CP437). Use Python UTF-8 write. | agent (fix/encoding) |
| 2026-09-23 | v3: Grounded cross-paper claims in claim-level provenance (location, support degree). Separated evidence value from reproducibility feasibility. Removed citation-based ranking. Aligned recommendation authority with DECISION_AUTHORITY.md. | agent (chore/skills-upgrade) |
| 2026-09-24 | v4: Added standardized Multi-Paper Comparison Matrix (47 rows, dimensions as rows, papers as horizontal columns, Cross-paper synthesis column) and 11-dimension Comparability Gate per literature_review_formats.md. Enforced batching for >5 papers and anti-ranking constraints while preserving claim-evidence tables and deeper narrative synthesis. | agent (chore/skills-upgrade) |
