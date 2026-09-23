# Clinical Tabular Variable Operationalization Guide

## 1. Overview and Core Philosophy

This guide provides practical, reproducible instructions for operationalizing dataset variables and clinical concepts into validated definitions for clinical tabular prediction models and statistical analyses.

In tabular medical data—especially multi-cycle epidemiological surveys (e.g., NHANES, BRFSS) and real-world electronic health record (EHR) systems—the primary cause of fragile or falsely optimistic models is **definition misalignment and data leakage**:
1. Column names are assumed to be self-explanatory (e.g., assuming `DIQ010` means "diagnosed diabetes" without verifying question wording or missing codes).
2. Diagnostic laboratory tests (e.g., fasting glucose, HbA1c) are used simultaneously as candidate predictors and as outcome definitions, causing 100% artificial accuracy.
3. Post-baseline features (e.g., medication changes, follow-up exams) are used to predict baseline disease status.
4. Survey missing sentinels (e.g., `7`, `9`, `77`, `99`, `7777`, `9999`) are interpreted as real continuous numbers.
5. Survey weights, strata, and clusters are fed into machine learning models as raw predictive features.
6. Established clinical risk scores (e.g., FINDRISC, ADA Diabetes Risk Test) are approximated with proxy variables while claiming to evaluate the original score.

The **dictionary-first rule** mandates that before any code trains a model or performs statistical tests, every variable must have an explicit, source-backed definition grounded in official codebooks.

---

## 2. Step-by-Step Operationalization Workflow

```
[1. Clinical Concept] ──> [2. Source Codebook Lookup] ──> [3. Cycle/Release Binding]
                                                                     │
[6. Leakage & Horizon] <── [5. Missing & Skips] <── [4. Timing, Unit & Coding]
         │
         v
[7. Registry Generation] ──> [8. Deterministic Validation] ──> [9. Analysis Ready]
```

### Step 1: Define the Research Concept
Identify the clinical, demographic, or physiological phenomenon required by the research protocol:
- State whether the concept is an exposure, candidate predictor, composite label component, final outcome, cohort exclusion flag, or survey design parameter.
- Assign the standardized `canonical_name` in snake_case (e.g., `systolic_blood_pressure_mmhg`, `fasting_plasma_glucose_mg_dl`, `diagnosed_diabetes_self_report`).

### Step 2: Locate Authoritative Primary Documentation
- Retrieve the official data dictionary or codebook released by the data producer (e.g., CDC/NCHS for NHANES, CMS for Medicare, PhysioNet for MIMIC).
- Extract the exact source variable name, verbatim question or assay text, target population, and collection protocol.
- Do not rely on secondary summaries or unofficial re-hosted files when official codebooks exist.

### Step 3: Bind Dataset and Cycle Variations
In multi-cycle cohorts (such as NHANES 1999–2018), variables frequently change:
- Check whether the variable name changes across cycles (e.g., fasting glucose reported in different laboratory files across cycles).
- Record each cycle's specific source variable name, file name, and codebook link in `source_bindings`.
- If question wording or assay technology changed, determine whether an explicit harmonization conversion is required.

### Step 4: Verify Timing, Units, and Coding
- **Index Time ($t_0$)**: Establish the exact clinical decision point. Candidate predictors must be verifiably available at or before $t_0$ (`pre_index` or `at_index`). Any variable measured after $t_0$ is `post_index` and cannot be a predictor.
- **Physical Units**: Verify units directly in the codebook. Never infer units from numeric magnitude. Document `source_unit`, `analysis_unit`, and any mathematical `conversion`.
- **Categorical Encodings**: Map all raw integer/string codes to explicit clinical labels. Ordinal categories must preserve their natural medical hierarchy. Do not silently collapse categories without documented clinical justification.

### Step 5: Verify Missing-Value Sentinels and Skip Patterns
- Document all non-response integer codes (e.g., `7 = Refused`, `9 = Don't know`).
- Check questionnaire branching logic: if a question was skipped because the participant answered "No" to a screening question (e.g., smoking intensity skipped for never-smokers), mark `structural_missingness: true` and specify the `skip_pattern`.
- Do not impute skip patterns as missing-at-random.

### Step 6: Leakage Review and Prediction Horizon
- Check whether any predictor candidate is derived from or collinear with the outcome definition (`outcome_leakage`).
- For predictive outcomes, specify the prediction horizon:
  - `cross_sectional`: contemporaneous presence (e.g., undiagnosed diabetes at screening).
  - `early_detection`: pre-symptomatic or prediabetes screening before formal clinical presentation.
  - `long_term_risk`: incident event over $N$ years of longitudinal follow-up.

### Step 7: Assemble Machine-Readable Registry
Compile all operationalized definitions into a JSON file conforming to `docs/agent/schemas/variable_definition.schema.json`.

### Step 8: Run Deterministic Validation
Execute `validate_variable_registry.py` to audit for post-index leakage, outcome leakage, missing horizons, unverified sources, and survey-design feature misuse.

---

## 3. NHANES-Specific Operationalization Rules

### Demographics and Physical Exam
- `RIDAGEYR`: Age in years at screening. Note: In NHANES, age is top-coded at 85 (or 80 in earlier cycles) for privacy protection.
- `RIAGENDR`: Gender (`1 = Male, 2 = Female`).
- `BMXBMI`: Body Mass Index ($\text{kg/m}^2$), derived from measured height (`BMXHT`) and weight (`BMXWT`).
- `BPXSY1`, `BPXDI1` ... `BPXSY3`, `BPXDI3`: Blood pressure measurements. Clinical protocol requires averaging multiple consecutive seated readings; do not take an arbitrary single reading without protocol justification.

### Laboratory Diagnostics
- `LBXGLU`: Fasting plasma glucose (mg/dL). Measured in morning fasting subsample (requires fasting weight `WTSAF2YR`).
- `LBXGH`: Glycated hemoglobin HbA1c (%).
- `LBDGLUSI`: Glucose in SI units (mmol/L). Use either `LBXGLU` or `LBDGLUSI` consistently with documented conversion.

### Complex Survey Weights and Strata
- `WTMEC2YR`: Full sample 2-year Mobile Examination Center exam weight. Use when analyzing physical exam or laboratory variables collected in the MEC.
- `WTINT2YR`: Full sample 2-year interview weight. Use only when analyzing interview-only variables without MEC exam components.
- `WTSAF2YR`: Fasting subsample 2-year weight. Mandatory when analyzing fasting laboratory measurements (fasting glucose, triglycerides).
- `SDMVSTRA`: Masked variance unit pseudo-stratum.
- `SDMVPSU`: Masked variance unit pseudo-primary sampling unit.
- **Rule**: Never feed `SDMVSTRA`, `SDMVPSU`, or sampling weights as candidate predictive features into standard ML algorithms.

---

## 4. Clinical Score Integrity Protocol

When reproducing or benchmarking against published risk scores (e.g., FINDRISC, ADA Diabetes Risk Test):

1. **Document Official Point Rules**: Record official questionnaire items, cutoff bands, and point weights.
2. **Component Mapping Audit**:
   - Check whether every score component exists in the dataset.
   - For FINDRISC: Age (<45: 0, 45-54: 2, 55-64: 3, >64: 4), BMI (<25: 0, 25-30: 1, >30: 3), Waist circumference (men/women bands: 0, 3, 4), Physical activity (>=30 min/day: 0, <30 min/day: 2), Fruits/vegetables (daily: 0, not daily: 1), Antihypertensive medication (no: 0, yes: 2), History of high blood glucose (no: 0, yes: 5), Family history of diabetes (no: 0, 2nd-degree: 3, 1st-degree: 5).
3. **Fidelity Classification**:
   - `exact_official`: All components mapped with exact clinical thresholds.
   - `adapted`: One or more components substituted with proxies (e.g., vigorous activity question used as proxy for daily 30-minute activity). **Must be labeled "Adapted FINDRISC-like score" in all tables, figures, and manuscripts.**
   - `incomplete`: Missing components omitted without substitution.
   - `not_reproducible`: Insufficient variables to construct the score.

---

## 5. Output Deliverables of Variable Operationalization

When operationalizing variables for a study, produce two companion artifacts:

1. `variable_registry.json`: Machine-readable registry conforming to `docs/agent/schemas/variable_definition.schema.json`.
2. `variable_operationalization.md`: Human-readable summary table for the manuscript Methods section containing:
   - Canonical Concept
   - Role (Predictor, Label Component, Outcome, Survey Weight)
   - Source Variable(s) & Cycle
   - Availability & Timing Window
   - Physical Unit & Analysis Unit
   - Categorical Encoding & Sentinel Missing Codes
   - Leakage Assessment
   - Codebook Citation
