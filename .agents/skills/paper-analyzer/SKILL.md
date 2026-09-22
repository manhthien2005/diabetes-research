---
name: paper-analyzer
description: |
  Deeply analyze a paper in `01_Diabetes_Research/searched_papers/Layer_X/<paper_id>/`,
  generating `analysis.html` (Vietnamese, 8 blocks per AGENTS.md §6) AND
  `summary.json` (machine-readable, for research brief synthesis). Goal: enable user
  to decide promote/reject without opening the PDF.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extracted.md
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/source.pdf
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/metadata.json
  - 01_Diabetes_Research/chosed_papers/Layer_<n>/
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/summary.json
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/rob_audit.json
---

# paper-analyzer

## Purpose
Transform 1 scientific PDF into a DEEP Vietnamese analysis + a machine-readable
summary, enabling the user to decide whether to "promote to `01_Diabetes_Research/chosed_papers/` or reject".

## Procedure
1. **Read full text**: prioritize `extracted.md`. If missing → run `pdf-extract`.
2. Read `metadata.json` + read papers in `01_Diabetes_Research/chosed_papers/Layer_<n>/` within the same layer.
3. Render `analysis.html` following the **8 blocks** (AGENTS.md §6). DO NOT alter the structure.
4. Record `summary.json` (schema below) — including the new `rob_audit` key.
5. Record `rob_audit.json` (dedicated QC version).
6. Set `analysis_status: "analyzed"` + confirm `prediction_horizon` in metadata.

## Deep Analysis — Mandatory Rigorous Extraction
Do not stop at generic descriptions. MUST extract:
- **Prediction horizon** (§3b)
- **Exact pipeline**: step-by-step preprocessing → class balancing → feature engineering → model → hyperparameter tuning
- **Dataset & split**: name, sample size, feature count, train/test ratio, CV scheme, class balance
- **Metric with PROVENANCE**: cite "Table X / Fig Y / Section Z". Missing → `UNKNOWN`.
- **Reproducibility** (high/medium/low) + rationale
- **Comparison against baseline**: concrete advantages/disadvantages
- **Gap / limitations**: concrete improvement opportunities for our research project

## RoB mini-audit (Added 2026-09-21)

After analyzing the pipeline, execute the **6 CP probes + 1 O11 probe** (from skill `peer-review`):

### Probes CP1–CP6 (Clinical Prediction Model)
- **CP1**: Is there true nested CV or a genuine held-out test set? (Tuning and reporting SEPARATED?)
- **CP2**: Is feature selection performed INSIDE the fold, or fitted on the entire dataset?
- **CP3**: Is oversampling/SMOTE performed INSIDE the fold, or prior to data splitting?
- **CP4**: Is calibration reported (slope, intercept, calibration plot)?
- **CP5**: Is there external/temporal validation?
- **CP6**: Are label-defining variables (HbA1c/FPG/OGTT/glucose) included in the feature set?

### Probe O11 (Complex Survey / NHANES)
- **O11**: If using NHANES/BRFSS/KNHANES: are survey weights applied? Is weighted prevalence reported?

### Leakage Taxonomy (01_Diabetes_Research/docs/LEAKAGE_MAP.md §2)
Cross-check against the 6 violation types:
- **B**: Imputation/scaling on entire dataset prior to splitting
- **C**: Feature selection on entire dataset
- **D**: SMOTE/oversampling prior to splitting
- **E**: Model selection on test set (winner's curse)
- **F**: Label-defining variable in features
- **G**: Artificial 50/50 balance reading accuracy at fake prevalence

Record every detected violation type into `leakage_types[]` (identifiers "B"..."G").

---

## summary.json (schema)

```json
{
  "paper_id": "<id>",
  "layer": 2,
  "prediction_horizon": "cross_sectional|early_detection|long_term_risk",
  "contribution": "1-sentence main contribution",
  "method": "primary method / technique",
  "best_metric": "e.g., 98.2% acc on PIMA (Table 3)",
  "datasets": ["pima-indians-diabetes"],
  "has_code": true,
  "code_url": "<url or null>",
  "reproducible": "high|medium|low",
  "vs_baseline": "outperforms <paper_id> in <specific aspect>",
  "gap": "primary weakness / research gap",
  "verdict": "strong|maybe|weak",
  "verdict_reason": "1-sentence rationale",
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

**Notes on `rob_audit` schema**:
- `probe_hits[]`: FAILED probes (CP1–CP6, O11). Empty = no violations detected.
- `leakage_types[]`: data leakage violation categories (B–G). Empty = indeterminate.
- `validation_level`: highest validation level (external > temporal > internal > UNKNOWN).
- `calibration_reported`: whether calibration was reported.
- `survey_design_handled`: fill only if paper uses NHANES/BRFSS; otherwise null.
- `prevalence_realistic`: evaluated against realistic clinical prevalence.
- `evidence_ref`: source citation ("Table X / Sec Y") or UNKNOWN.
- `confidence`: confidence level (high=verbatim quote, medium=inference, low=insufficient details).

---

## rob_audit.json (dedicated QC version)
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

> **During testing (Step 5)**: write `rob_audit.json` alongside `summary.json` but DO NOT edit `summary.json` during test runs. Merge only after user approval.

---

## Autonomous Rejection for Low-Quality Papers (User Delegated — AGENTS.md §11)
If analysis reveals the paper FAILS criteria → add to `01_Diabetes_Research/rejected.json` with a specific reason, `by: "Codex"`, set `status: "rejected"`. DO NOT delete folder.

## Constraints
- `analysis.html` is self-contained (inline CSS, no CDN), in Vietnamese, retaining EN technical terms.
- **Header** block MUST include the Horizon badge from `prediction_horizon`.
- **8 HTML BLOCKS REMAIN UNCHANGED** — rob_audit DOES NOT appear in analysis.html.
- DO NOT fabricate numbers. Missing → `UNKNOWN`.
- DO NOT overwrite existing `analysis.html` → create `analysis.v2.html`.
- DO NOT touch `01_Diabetes_Research/chosed_papers/` autonomously.

## Orchestration
- **PDF Download**: MAIN LOOP (skill pdf-fetch). Subagents receive 403 on external HTTP APIs.
- **Analysis**: parallelizable (local file read/write).

## Local Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-09-21 | v2: Added RoB mini-audit step (probes CP1–CP6 + O11), leakage taxonomy from LEAKAGE_MAP. Added `rob_audit` key to summary.json. Added `rob_audit.json` output. 8 HTML blocks unchanged, webapp-read fields unchanged. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Restored Vietnamese diacritics (lost due to PowerShell Out-File CP437). Use Python UTF-8 write. | agent (fix/encoding) |
