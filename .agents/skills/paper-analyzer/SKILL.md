---
name: paper-analyzer
description: |
  Deeply analyze a paper in `01_Diabetes_Research/searched_papers/Layer_X/<paper_id>/`,
  generating `analysis.html` (Vietnamese, 8 blocks per AGENTS.md §6) AND
  `summary.json` (machine-readable, for research brief synthesis). Evaluates candidate
  roles, multi-dimensional reproducibility, and claim-level provenance per docs/agent/EVIDENCE_POLICY.md
  to formulate advisory recommendations for human decision-making.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extracted.md
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/source.pdf
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/metadata.json
  - 01_Diabetes_Research/chosed_papers/Layer_<n>/
  - docs/agent/EVIDENCE_POLICY.md
  - docs/agent/PAPER_SCHEMA.md
  - docs/agent/DECISION_AUTHORITY.md
  - .agents/skills/paper-analyzer/references/literature_review_formats.md
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/analysis.html
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/summary.json
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/rob_audit.json
---

# paper-analyzer

## Purpose
Transform 1 scientific PDF into a DEEP Vietnamese analysis + a machine-readable summary, evaluating candidate roles (`evidence_candidate` vs `reproduction_candidate`), multi-dimensional reproducibility, and claim-level provenance, enabling the human researcher to make informed promotion or retention decisions.

## Procedure
1. **Read full text**: prioritize `extracted.md`. If missing → run `pdf-extract`.
2. Read `metadata.json` + read papers in `01_Diabetes_Research/chosed_papers/Layer_<n>/` within the same layer.
3. Render `analysis.html` following the **8 blocks** (AGENTS.md §6). When analyzing exactly one paper, incorporate the **Single-Paper Quick Review Table** (`references/literature_review_formats.md`) as the first substantive overview after paper identity. DO NOT alter the core structure.
4. Record `summary.json` (schema below) — preserving backward-compatible fields and emitting candidate assessment, multi-dimensional reproducibility, claim-level provenance, and `rob_audit`.
5. Record `rob_audit.json` (dedicated QC version).
6. Set `analysis_status: "analyzed"` + confirm `prediction_horizon` in metadata.

## Single-Paper Quick Review Table (Standardized Format)

When analyzing exactly one paper, provide the **Single-Paper Quick Review Table** per `.agents/skills/paper-analyzer/references/literature_review_formats.md` as the first substantive overview layer immediately following paper identity.

### Structural Contract
- **Orientation**: `ROWS_ARE_INFORMATION_FIELDS`.
- **Columns**: `| Field | Summary | Evidence / Location |`.
- **Canonical Rows**: Contains all 48 required rows defined in `references/literature_review_formats.md`:
  `Title`, `Authors`, `Year`, `Journal`, `DOI / PMID`, `Country / Setting`, `Research objective`, `Study design`, `Data source`, `Study period`, `Population`, `Sample size`, `Inclusion / Exclusion`, `Predictors / Exposures`, `Outcome / Target`, `Index time`, `Prediction horizon`, `Missing-data strategy`, `Statistical methods`, `Models`, `Validation strategy`, `Performance metrics`, `Calibration`, `Clinical utility`, `Survey design`, `Key findings`, `Quantitative results`, `Authors' conclusion`, `Comparison with prior evidence`, `Our evidence synthesis`, `Evidence-supported mechanism`, `Analytical hypothesis`, `Strengths`, `Limitations`, `Risk of bias / Leakage`, `Generalizability`, `Data availability`, `Code availability`, `Reproducibility`, `Relevance to our study`, `Evidence candidate`, `Reproduction candidate`, `Claims worth citing`, `What we can reuse`, `What we must NOT reuse`, `Research gaps`, `Future research`, `Bottom line`.

### Presentation Priority & Flow
1. **Paper identity** (Title, authors, year, journal, DOI, horizon badge)
2. **Quick Review Table** (48-row vertical review table)
3. **Detailed methodological analysis** (Pipeline, datasets, splits, modeling)
4. **Risk of bias / leakage** (Probes CP1–CP6, O11, Types B–G)
5. **Evidence assessment** (`evidence_candidate`, `reproduction_candidate`, 5D reproducibility)
6. **Claim provenance** (Structured assertions with exact section/table/page)
7. **Relevance to current research** (Project-grounded touchpoints)
8. **Actionable research implications** (Reusable practices, anti-patterns to avoid, advisory recommendation)

### Rigor and Integrity Rules
- **Overview Layer, Not Replacement**: The quick review table provides rapid orientation; it does NOT replace deep narrative analysis, RoB mini-audit, or claim provenance extraction.
- **Concise Summaries**: Populate cells with concise factual summaries rather than pasting lengthy text blocks.
- **Source Terminology**: Preserve authentic source terminology when summarizing reported study facts.
- **Missing Information**: Missing or unverified fields MUST use standardized sentinels: `Not reported`, `Not applicable`, `Not verified`, or `Unclear`. Never guess, extrapolate, or fabricate numbers, locations, or mechanisms.
- **Separation of Author vs. Analyst**:
  - `Authors' conclusion`: Strictly what the paper states.
  - `Our evidence synthesis`: Independent critical appraisal by the research team.
- **Separation of Mechanism vs. Hypothesis**:
  - `Evidence-supported mechanism`: Directly supported by study data/measurements.
  - `Analytical hypothesis`: Explicitly marked speculative explanation (`[Analyst hypothesis]`).
- **Separation of Evidence vs. Reproducibility**:
  - `Evidence candidate`: Independent clinical/scientific validity.
  - `Reproduction candidate`: Practical code/data replication feasibility.
- **Repository-Grounded Relevance**: Must explicitly link to repository assets (e.g., `Paper_01_NHANES_NoLab`, non-laboratory survey features) rather than generic remarks.

## Deep Analysis — Mandatory Rigorous Extraction
Do not stop at generic descriptions. MUST extract:
- **Prediction horizon** (§3b)
- **Exact pipeline**: step-by-step preprocessing → class balancing → feature engineering → model → hyperparameter tuning
- **Dataset & split**: name, sample size, feature count, train/test ratio, CV scheme, class balance
- **Metric with PROVENANCE**: cite "Table X / Fig Y / Section Z". Missing → `UNKNOWN`.
- **Multi-Dimensional Reproducibility** (PAPER_SCHEMA.md): dataset access, code access, algorithmic operationalization, and variable mapping feasibility.
- **Candidate Assessment** (EVIDENCE_POLICY.md): evaluate `evidence_candidate` and `reproduction_candidate` independently. Methodological flaws reduce confidence but do not automatically erase evidence value.
- **Claim-Level Provenance**: extract assertions with explicit location (`section`, `table`, `page`), support degree (`direct | partial | contextual | unsupported`), and confidence (`high | medium | low`).
- **Anti-Fabrication Constraint**: Never invent or approximate page, table, or section references. When location is absent, record `null` or `UNKNOWN`.
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
  "candidate_roles": ["evidence_candidate", "reproduction_candidate"],
  "candidate_assessment": {
    "evidence_candidate": {
      "eligible": true,
      "reasons": ["Demonstrates robust tree ensemble comparison on clinical tabular features"],
      "limitations": ["Evaluated only on single-center cohort"]
    },
    "reproduction_candidate": {
      "eligible": false,
      "reasons": [],
      "limitations": ["Private clinical data; source code not shared"]
    }
  },
  "reproducibility": {
    "dataset_access": "unavailable",
    "code_access": "unavailable",
    "methods_operationalized": "sufficient",
    "variable_mapping_feasible": "partial",
    "overall": "low",
    "notes": ["Proprietary hospital EHR data under institutional governance"]
  },
  "claim_provenance": [
    {
      "claim": "XGBoost yielded the highest AUROC of 0.881 compared to RF and SVM.",
      "source": "<paper_id>",
      "doi": "10.xxx/yyy",
      "location": {
        "section": "3.1 Performance Comparison",
        "table": "Table 2",
        "page": 5
      },
      "support": "direct",
      "confidence": "high"
    }
  ],
  "recommended_action": "retain_in_pool",
  "decision_state": "recommendation_ready",
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

**Notes on new schema extensions**:
- `candidate_roles`: array containing `"evidence_candidate"`, `"reproduction_candidate"`, both, or neither (`[]`).
- `candidate_assessment`: independent justifications and limitations for each candidate role.
- `reproducibility`: multi-dimensional assessment object conforming to `docs/agent/PAPER_SCHEMA.md`.
- `claim_provenance`: structured array of extracted factual claims with section, table, and page provenance.
- `recommended_action`: advisory action (`"promote" | "retain_in_pool" | "exclude_from_current_scope" | "reject_with_human_review" | "needs_more_review"`).
- `decision_state`: governance state (`"unreviewed" | "recommendation_ready" | "human_approved" | "human_rejected"`).
- Legacy fields (`paper_id`, `layer`, `prediction_horizon`, `contribution`, `method`, `best_metric`, `datasets`, `has_code`, `code_url`, `reproducible`, `vs_baseline`, `gap`, `verdict`, `verdict_reason`, `analyzed_at`) are preserved for backward compatibility with `verify_analyses.py` and downstream tools.

---

## rob_audit.json (dedicated QC version)
```json
{
  "paper_id": "<id>",
  "audited_at": "<ISO-8601>",
  "auditor": "paper-analyzer v3",
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

## Advisory Action Recommendations (Governed by `docs/agent/DECISION_AUTHORITY.md`)
- If analysis reveals that a paper has fatal methodological violations, severe leakage, retraction, or falls outside the research scope:
  - Formulate an advisory recommendation (`recommended_action: "reject_with_human_review"` or `"exclude_from_current_scope"`).
  - Explicitly document the factual grounds in `candidate_assessment` and `summary.json.verdict_reason`.
  - **DO NOT autonomously write to `01_Diabetes_Research/rejected.json` or delete folders.**
  - Irreversible repository actions require explicit human authorization.

---

## Constraints
- `analysis.html` is self-contained (inline CSS, no CDN), in Vietnamese, retaining EN technical terms.
- **Header** block MUST include the Horizon badge from `prediction_horizon`.
- **8 HTML BLOCKS REMAIN UNCHANGED** — rob_audit and claim provenance do not alter the 8-block HTML template.
- DO NOT fabricate numbers or locations. Missing → `UNKNOWN` or `null`.
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
| 2026-09-23 | v3: Formalized evidence candidate semantics, multi-dimensional reproducibility, and claim-level provenance per EVIDENCE_POLICY.md and PAPER_SCHEMA.md. Replaced autonomous rejection with advisory recommendations under DECISION_AUTHORITY.md. | agent (chore/skills-upgrade) |
| 2026-09-24 | v4: Added standardized Single-Paper Quick Review Table (48 rows, information fields as rows) per literature_review_formats.md. Separated author conclusions from evidence synthesis, and mechanisms from hypotheses. Preserved deep analysis, claim provenance, candidate roles, and decision authority. | agent (chore/skills-upgrade) |
