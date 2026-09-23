---
name: define-variables
description: Define and verify clinical tabular variables, source codebook bindings, physical units, categorical encodings, missingness sentinels, timing relative to index time, composite outcome definitions, labels, and prediction horizons for NHANES, EHR, and other clinical tabular datasets before statistical analysis or prediction modeling. Use when operationalizing new variables, checking data leakage, verifying laboratory units, auditing clinical risk scores, or resolving variable ambiguities. Does not perform statistical modeling or automated imputation.
triggers: define variables, operationalize variables, variable definition, codebook verification, feature operationalization, source binding, index time, prediction horizon, outcome operationalization, label leakage, post-index leakage, NHANES variables, EHR variables, clinical tabular variables, unit conversion, missing value codes, skip-pattern missingness, FINDRISC mapping, ADA risk test mapping
tools: Read, Write, Edit, Bash, Grep, Glob
model: inherit
---

# Define and Operationalize Variables (`define-variables`)

## 1. Purpose and Role in Repository Architecture

In tabular machine learning and epidemiological research—specifically diabetes prediction and glycemic staging on NHANES, electronic health records (EHR), and public health registries—models frequently suffer from fatal methodological flaws before training even begins:
- Candidate predictor features are collected after index time ($t_0$), introducing **post-index leakage**.
- Diagnostic biomarkers (fasting glucose, HbA1c) are used simultaneously as candidate predictors and as the outcome definition, causing **outcome leakage**.
- Survey missing sentinels (e.g., `7`, `9`, `77`, `99`, `7777`, `9999`) are treated as valid continuous numbers.
- Measurement units are guessed from numeric magnitude rather than confirmed in official codebooks.
- Established clinical risk scores (e.g., FINDRISC, ADA Diabetes Risk Test) are approximated with proxy variables and mislabeled as the original validated scores.
- Complex survey design variables (weights, strata, PSUs) are fed into predictive models as ordinary features.

`define-variables` establishes source-grounded, leakage-safe operational definitions for all candidate predictors, composite outcomes, cohort exclusions, and survey design fields **before** statistical analysis (`analyze-stats`) or predictive modeling (`prediction-model-rigor`) begins.

It is governed repository-wide by [`docs/agent/VARIABLE_CONTRACT.md`](../../docs/agent/VARIABLE_CONTRACT.md) and [`docs/agent/schemas/variable_definition.schema.json`](../../docs/agent/schemas/variable_definition.schema.json).

---

## 2. When to Use

### Use This Skill When:
- A new variable, laboratory biomarker, questionnaire item, or clinical feature is being introduced to an analysis pipeline.
- Designing an observational study or clinical prediction model where variable definitions must be grounded in official codebooks before drafting Methods (`/design-study`).
- Resolving ambiguous or unverified column names in raw tabular datasets (NHANES, BRFSS, EHR extracts).
- Verifying the exact timing, measurement window, and index time ($t_0$) of candidate predictors.
- Operationalizing composite outcome labels (e.g., undiagnosed diabetes from fasting glucose and HbA1c) and verifying prediction horizons (`cross_sectional`, `early_detection`, `long_term_risk`).
- Documenting cycle-specific variable name bindings across longitudinal survey releases (e.g., NHANES cycles 1999–2018).
- Validating established clinical risk scores (FINDRISC, ADA Risk Test) to enforce score reproduction fidelity.
- Running deterministic pre-modeling audits via `scripts/validate_variable_registry.py`.

### Do NOT Use This Skill For:
- Statistical modeling, model training, cross-validation, or hyperparameter optimization → use `/prediction-model-rigor`.
- Inferential hypothesis testing, regression analysis, or survey weighting math → use `/analyze-stats`.
- Automated data imputation → imputation transformers must remain fold-isolated inside pipelines.
- Deep imaging, computer vision, or CGM sensor processing → out of repository scope per AGENTS.md §1.

---

## 3. Core Principles

1. **Source First**: Variable names, labels, units, coding, missingness, and diagnostic cutoffs must be established from authoritative codebooks or clinical guidelines, never inferred from identifier names or numeric magnitudes.
2. **Definition Before Modeling**: High-impact predictors, outcomes, labels, index time, and prediction horizon must be operationalized before model development or final statistical estimation.
3. **No Silent Guessing**: Ambiguous or unverified definitions remain explicit `UNKNOWN`, `provisional`, or `conflict` states.
4. **Timing is Semantic**: A variable that is unavailable at prediction time ($t_0$) cannot silently become a candidate predictor. Post-index variables are strictly forbidden as predictors.
5. **Score Integrity**: Established clinical scores cannot be silently approximated with proxy variables. Proxies must be labeled as `adapted`, `proxy`, or `incomplete`.
6. **Human Decision Authority**: Changing a frozen research outcome definition, positive class threshold, prediction horizon, or cohort inclusion criteria requires explicit human approval per `docs/agent/DECISION_AUTHORITY.md`.

---

## 4. Operational Workflow

```
1. Concept Identification
   └── Identify clinical phenomenon, role (predictor, outcome, label_component, etc.), canonical name
2. Project Context Check
   └── Check AGENTS.md, QA_LOG.md, PROGRESS.json, and existing variable definitions
3. Authoritative Source Lookup
   └── Official dataset codebook, questionnaire, or clinical guideline (e.g. ADA Standards of Care)
4. Canonical Concept & Cycle Bindings
   └── Map canonical name to cycle-specific source column names (e.g., RIDAGEYR, LBXGLU)
5. Timing, Units & Categorical Coding
   └── Document index time, measurement window, source units, analysis units, category maps
6. Missingness & Skip Logic
   └── Document sentinel missing codes (e.g., 7777, 9999) and questionnaire skip patterns
7. Leakage Review & Prediction Horizon
   └── Audit for post-index leakage and outcome leakage; assign prediction horizon
8. Clinical Score Fidelity Audit
   └── If clinical score, check all components against official published rules
9. Registry Generation & Deterministic Validation
   └── Write variable registry JSON and run `scripts/validate_variable_registry.py`
10. Deliverables & Handoff
   └── Output validated JSON registry, human-readable summary, and modeling readiness status
```

---

## 5. Roles and Semantics

Every variable definition in a registry must be assigned exactly one primary role:

| Role | Meaning | Allowed as Predictor? |
|---|---|---|
| `predictor` | Candidate predictive feature available at or before index time $t_0$. | **Yes** (if `pre_index` or `at_index` and leakage-free) |
| `outcome` | Target clinical endpoint or stage being predicted. | **No** |
| `label_component` | Biomarker or diagnostic test defining the outcome (e.g., fasting glucose, HbA1c). | **No** (strictly barred to prevent outcome leakage) |
| `exclusion` | Feature defining cohort inclusion or exclusion criteria (e.g., pregnancy, prior diagnosis). | **No** (used for cohort filtering only) |
| `identifier` | Participant ID, cluster ID, or encounter ID. | **No** (used strictly for group-isolated resampling splits) |
| `survey_weight` | Sampling weight (e.g., `WTMEC2YR`, `WTINT2YR`) reflecting complex survey sampling. | **No** (handled via survey estimation design, not as raw ML feature) |
| `survey_strata` | Sampling stratification variable (e.g., `SDMVSTRA`). | **No** (strictly forbidden as predictor) |
| `survey_psu` | Primary sampling unit cluster variable (e.g., `SDMVPSU`). | **No** (strictly forbidden as predictor) |
| `time_anchor` | Date or timestamp defining index time or follow-up boundary. | **No** |
| `auxiliary` | Descriptive or administrative metadata not used in feature set. | **No** |

---

## 6. Output Contract

When executing this skill to operationalize study variables, produce:

1. **Machine-Readable Registry**: JSON file adhering to `docs/agent/schemas/variable_definition.schema.json`.
2. **Deterministic Validator Report**: Output from running `python .agents/skills/define-variables/scripts/validate_variable_registry.py <registry.json> --json`.
3. **Structured Summary Report**:
   - **Verified Definitions**: Fully grounded variables ready for modeling.
   - **Provisional / Blocked Definitions**: Variables missing official documentation or with unresolved conflicts.
   - **Variables NOT Ready for Modeling**: Explicit list of unverified, conflicting, post-index, or outcome-leakage variables.
   - **Leakage Summary**: Explicit callout of any post-index or outcome leakage candidates detected.
   - **Assumptions Requiring Human Approval**: Frozen definitions, adapted clinical scores, or category collapsing choices requiring explicit user authorization.
