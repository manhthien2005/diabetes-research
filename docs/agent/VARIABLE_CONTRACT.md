# Variable Operationalization and Definition Contract

## 1. Purpose

This contract establishes authoritative, repository-wide rules for converting dataset variables, questionnaire items, laboratory measurements, electronic health record (EHR) fields, and clinical concepts into explicit, source-backed, leakage-aware operational definitions.

Clinical prediction models on tabular health data—particularly epidemiological cohorts such as NHANES and EHR registries—fail when variable definitions are inferred from column names, when timing relative to index time is ignored, when missing-value sentinel codes are mistaken for continuous numbers, or when composite outcome labels leak into candidate predictors. This contract ensures rigorous variable operationalization occurs before model training or statistical estimation.

---

## 2. Scope

### In Scope
- Tabular clinical, epidemiological, and EHR datasets used for diabetes prediction, screening, and glycemic staging (e.g., NHANES, BRFSS, MIMIC-IV, eICU, UK Biobank, institutional EHR cohorts).
- Canonical concept definitions and their dataset-specific source bindings across multiple survey cycles or EHR versions.
- Operationalization of predictor features, composite labels, clinical outcomes, exclusion flags, index dates, prediction horizons, and survey design variables.
- Verification of measurement units, conversion rules, categorical encodings, missing-value sentinels, structural skip patterns, and derivations.

### Out of Scope
- Computer vision images, raw pixel arrays, waveforms, or continuous glucose monitor (CGM) high-frequency sensor streams (per repository scope in AGENTS.md §1).
- Automated mathematical imputation (imputation strategies belong to fold-isolated pipeline execution in `prediction-model-rigor`).
- Statistical hypothesis testing or model evaluation (governed by `analyze-stats` and `prediction-model-rigor`).

---

## 3. Source Hierarchy

All variable names, labels, units, coding schemes, missing-value sentinels, and diagnostic thresholds must be grounded in authoritative sources according to the following strict hierarchy:

1. **Explicit Human-Approved Frozen Research Definition**: Frozen project definitions documented in repository consensus agreements (e.g., `AGENTS.md`, `QA_LOG.md`, `PROGRESS.json`). These definitions override external generic conventions for the current study.
2. **Official Dataset Codebook and Official Documentation**: Primary data dictionary, variable codebooks, and technical documentation released by the data-collection agency (e.g., CDC/NCHS for NHANES, CMS for Medicare, PhysioNet for MIMIC). These are authoritative for source variable names, physical units, category codes, and dataset-specific missing codes.
3. **Official Instrument and Questionnaire Documentation**: Original survey questionnaires, exam protocols, laboratory procedure manuals (LPM), and interview scripts.
4. **Peer-Reviewed Primary Methodological Publication**: Methodological papers authored by data curators describing cohort formation, phenotyping, or biomarker assay validation when official documentation is ambiguous.
5. **Secondary Literature**: Published research papers utilizing the dataset, accepted only when higher-authority sources are unavailable, with explicit limitation documentation.

### Source Rules
- **No Overwriting Frozen Project Definitions**: Agents must not overwrite an explicit human-approved frozen research definition solely because a later external publication employs an alternative definition.
- **Explicit Conflict Recording**: If an official codebook or external reference conflicts with an existing project definition, the conflict must be recorded as an explicit `conflict` or `provisional` state requiring human review.
- **Codebook Authority**: Dataset codebooks are authoritative for source identifiers, raw units, categorical coding, and missing sentinel codes.
- **Clinical Guideline Grounding**: Clinical diagnostic meaning (e.g., diagnostic thresholds for diabetes or prediabetes) requires authoritative clinical sources (e.g., American Diabetes Association [ADA] Standards of Care), not merely an arbitrary coding choice in an EHR table.

---

## 4. Canonical Variable versus Source Variable

To prevent ambiguity and support cross-dataset or cross-cycle harmonization, the repository strictly distinguishes two levels of representation:

- **Canonical Variable (`canonical_name`)**: A standardized, study-level concept representing an invariant clinical, demographic, or physiological feature (e.g., `age_years`, `glycated_hemoglobin`, `fasting_plasma_glucose_mg_dl`, `diagnosed_diabetes_self_report`).
- **Source Variable (`source_name`)**: The exact column identifier, questionnaire item code, or table field name within a specific dataset release or survey cycle (e.g., `RIDAGEYR` in NHANES Demographics, `LBXGH` in NHANES Laboratory, `DIABDX` in BRFSS).

A single canonical variable maps to one or more source variable bindings across cycles or datasets. Features entering analysis or modeling must be referenced by their canonical name with documented source bindings.

---

## 5. Dataset and Cycle Bindings

1. **Cycle-Specific Variance**: In longitudinal surveys such as NHANES, variable names, collection procedures, laboratory assay methods, and inclusion criteria frequently change across 2-year cycles (e.g., fasting glucose variable names, physical activity questions).
2. **Explicit Cycle Bindings**: Each source binding must declare the exact dataset, cycle or release year, source variable name, source label, and verified codebook reference.
3. **Harmonization Requirement**: If category codings, question wording, or measurement units change across cycles, an explicit, documented transformation function must be defined. No cross-cycle equivalence may be assumed without verifying cycle-specific codebooks.

---

## 6. Role Semantics

Every variable definition in a registry must be assigned exactly one primary role from the following exhaustive enumeration:

| Role | Meaning and Pipeline Constraint |
|---|---|
| `predictor` | Candidate predictive feature available at or before index time. Eligible for model inputs. |
| `outcome` | Target clinical endpoint or stage being predicted. Never an input feature. |
| `label_component` | Biomarker, diagnosis code, or survey item used to define the composite outcome. Strictly barred from the predictor space to prevent outcome leakage. |
| `exclusion` | Criterion variable used to define cohort eligibility, inclusion, or exclusion (e.g., age threshold, pregnancy flag). |
| `identifier` | Subject ID, cluster ID, or visit ID. Used strictly for group-isolated resampling splits (`GroupKFold`). Never a predictor. |
| `survey_weight` | Sampling weight (e.g., `WTMEC2YR`, `WTINT2YR`) reflecting complex survey sampling probabilities. Handled via survey design protocols; never an ordinary predictor. |
| `survey_strata` | Sampling stratification variable (e.g., `SDMVSTRA`). Used for variance estimation; strictly forbidden as a predictor. |
| `survey_psu` | Primary sampling unit cluster variable (e.g., `SDMVPSU`). Used for variance estimation; strictly forbidden as a predictor. |
| `time_anchor` | Date or timestamp defining index time ($t_0$), baseline exam, or follow-up horizon. |
| `auxiliary` | Descriptive demographic, administrative, or supplementary variable not included in the feature set. |

---

## 7. Index Time and Availability

The **Index Time** ($t_0$) is the precise decision point or clinical encounter time at which a prediction is formulated.

- **`pre_index`**: Measured verifiably prior to index time. Fully eligible as candidate predictor.
- **`at_index`**: Measured during the baseline clinical encounter prior to administering diagnostic tests or interventions. Eligible as candidate predictor only if available in the intended deployment setting (e.g., non-laboratory features in opportunistic screening).
- **`post_index`**: Measured after index time. **STRICTLY FORBIDDEN** as a predictor for prospective prediction tasks.
- **`not_applicable`**: Assigned to identifiers, survey design variables, or static auxiliary fields.
- **`unknown`**: Timing relationship cannot be verified from available documentation. Marked as a modeling blocker until resolved.

---

## 8. Outcome and Label Operationalization

Outcome operationalization is the highest-risk step in clinical prediction modeling. The following rules govern outcome definition:

1. **Target Clinical Concept**: The outcome must state the exact medical concept being predicted (e.g., "Undiagnosed Type 2 Diabetes at screening", "5-year incident Type 2 Diabetes", "ADA Glycemic Stage: Normal vs Prediabetes vs Diabetes").
2. **Explicit Derivation and Components**: All component variables used to construct the label must be recorded (e.g., `self_reported_diabetes == No` AND (`fasting_glucose >= 126 mg/dL` OR `hba1c >= 6.5%`)).
3. **Class Definitions**: Positive class ($Y=1$) and negative class ($Y=0$) criteria must be explicitly declared without ambiguity.
4. **Ascertainment Window**: The time interval during which outcome events or diagnostic measurements are ascertained must be specified.
5. **Leakage Isolation**: Every component variable of the outcome label is automatically classified as `label_component` and barred from the candidate predictor set.
6. **No Silent Re-definition**: Altering an outcome definition, positive class threshold, or component rule requires explicit human approval.

---

## 9. Prediction Horizon

The prediction horizon defines the temporal gap between predictor measurement ($t_0$) and outcome ascertainment ($t_0 + \Delta t$). Every predictive outcome must declare its horizon per AGENTS.md §3b:

- **`cross_sectional`**: Predicts current undiagnosed status or contemporaneous disease presence from features measured at the same encounter ($\Delta t = 0$). Common in opportunistic screening (e.g., NHANES, BRFSS).
- **`early_detection`**: Predicts subclinical, asymptomatic, or prediabetes state at the index encounter before formal clinical presentation.
- **`long_term_risk`**: Predicts incident onset occurring $N$ years after baseline ($t_0$ to $t_0 + N$ years). Requires longitudinal cohort follow-up and confirmed event-free baseline status.

**Gate Requirement**: If a task is declared as predictive but its prediction horizon is missing or undefined, the variable registry is incomplete and barred from model execution.

---

## 10. Units and Conversions

1. **No Inference from Magnitude**: Units of measurement must be established from authoritative codebooks, never guessed from numeric magnitudes (e.g., serum glucose in mg/dL vs mmol/L).
2. **Dual Declaration**: Every quantitative continuous variable must record:
   - `source_unit`: The physical unit documented in the source codebook.
   - `analysis_unit`: The standardized unit adopted for modeling.
3. **Explicit Conversion Formula**: If `source_unit` != `analysis_unit`, the exact mathematical conversion formula and scientific conversion factor must be documented (e.g., `glucose_mmol_L = glucose_mg_dL / 18.0182`). If no conversion is performed, `conversion` must be `null`.
4. **Assay Method Provenance**: When laboratory assay techniques change across survey cycles (e.g., enzymatic vs immunoassay), differences in calibration or reference ranges must be recorded.

---

## 11. Categorical Coding

1. **Explicit Codebook Mapping**: Source categorical values (e.g., `1 = Male, 2 = Female`) must be transcribed directly from official documentation into `source_codes`.
2. **Analysis Mapping**: The target encoding for statistical modeling (e.g., `{"1": 1, "2": 0}`) must be specified in `analysis_mapping`.
3. **No Silent Collapsing**: Agents must never silently collapse distinct source categories (e.g., combining "Former Smoker" and "Never Smoker", or collapsing granular race/ethnicity categories) without an explicit, documented scientific rationale and human confirmation.
4. **Ordering Verification**: Ordinal variables must explicitly declare their natural clinical ordering.

---

## 12. Missing-Value Semantics

1. **No Generic Missing Codes**: Survey programs utilize specific integer sentinels to denote non-response (e.g., in NHANES: `7`, `77`, `7777` = "Refused"; `9`, `99`, `9999` = "Don't know"). These codes must never be treated as continuous numbers or assumed to follow universal rules across variables.
2. **Explicit Sentinel Enumeration**: All source missing codes must be listed under `source_missing_codes` for each source variable.
3. **Missingness Semantics**: Distinguish true missingness (unmeasured, non-response) from informative clinical absences.
4. **No Automated Imputation**: This contract specifies how missingness is represented and documented, not how it is imputed. Imputation transformers must remain fold-isolated within downstream modeling pipelines.

---

## 13. Structural and Skip-Pattern Missingness

1. **Questionnaire Skip Logic**: Many questionnaire fields are missing by design due to preceding filter questions (e.g., cigarette-per-day questions administered only to respondents who answered "Yes" to smoking 100+ cigarettes; pregnancy questions administered only to females aged 20–44).
2. **Structural Missingness Declaration**: Structural skip patterns must be documented in `skip_pattern` and flagged with `structural_missingness: true`.
3. **Semantics of Skip Values**: Skip-pattern missing values must not be imputed as standard missing-at-random (MAR) values. They must be resolved according to questionnaire logic (e.g., respondents skipped past smoking intensity have 0 cigarettes/day).

---

## 14. Derived Variables

Variables calculated from multiple source features (e.g., Body Mass Index from height and weight, Homeostatic Model Assessment [HOMA-IR], mean blood pressure) must satisfy:

1. **Derived Flag**: `is_derived: true`.
2. **Mathematical Formula**: Clear, reproducible formula or algorithm in `formula_or_rule`.
3. **Component Dependencies**: List of all underlying canonical variable names in `components`.
4. **Timing Inheritance**: A derived variable's availability cannot precede the latest availability of any of its component variables. If any component is `post_index`, the derived variable is `post_index`.

---

## 15. Transformations

Data transformations applied during preprocessing (e.g., logarithmic transforms, standardization, binning) must record:
- Base variable and target variable names.
- Mathematical function and parameter sources (parameters must be fit strictly on training folds).
- Treatment of non-positive values (e.g., $\log(x + c)$ adjustments).

---

## 16. Survey-Design Variables

Epidemiological surveys employing complex multistage probability sampling require special safeguards:

1. **Separation from Predictors**: Sampling weights (`WTMEC2YR`, `WTINT2YR`), strata (`SDMVSTRA`), and primary sampling unit clusters (`SDMVPSU`) must be assigned roles `survey_weight`, `survey_strata`, and `survey_psu`.
2. **Barred from Predictor Space**: Strata and PSU indicators must never be supplied as candidate predictive features to machine learning algorithms.
3. **Multi-Cycle Weight Pooling**: When pooling multiple 2-year cycles (e.g., NHANES 1999–2004), the combined weight must follow NCHS formulas (e.g., $\frac{1}{3} \times \text{WTMEC2YR}$ for 3 pooled cycles).
4. **Weight Role Justification**: Sampling weights may be incorporated into weighted loss functions or sample-weighted evaluation only when the clinical estimand (e.g., population-representative screening efficacy) explicitly demands it.

---

## 17. Clinical-Score Integrity

When operationalizing established, published clinical risk scores (e.g., FINDRISC, ADA Diabetes Risk Test, Framingham Diabetes Risk Score):

1. **Authoritative Specification**: The official published score rules, exact point allocations, and clinical thresholds must be documented independently from any specific dataset.
2. **Complete Component Verification**: Every required score component (e.g., age bands, BMI cutoffs, waist circumference, physical activity threshold, fruit/vegetable intake, hypertension medication, history of high blood glucose, family history) must be mapped to verified source variables.
3. **No Mislabeled Approximations**: If an exact component is unavailable in the dataset and a proxy is substituted (e.g., substituting self-reported vigorous activity for daily 30-minute physical activity), the resulting variable **MUST NEVER** be labeled as the original validated score. It must be explicitly labeled as `adapted`, `proxy`, or `incomplete` (e.g., "Adapted FINDRISC-like score").
4. **Unmapped Component Accounting**: Unmapped components and their impact on score bounds must be documented.

---

## 18. Leakage Review

Every variable definition must undergo formal data leakage review:

1. **Post-Index Leakage (`post_index_leakage`)**: Features collected after index time or treatment initiation. Strictly forbidden as predictors.
2. **Outcome Leakage (`outcome_leakage`)**: Features directly derived from, defining, or collinear with the target label (e.g., using fasting glucose or antidiabetic prescription status to predict current undiagnosed diabetes).
3. **Allowed Predictors (`allowed_predictor`)**: Features verifiably measured at or before index time and clinically independent of outcome ascertainment.
4. **Needs Review (`needs_review`)**: Ambiguous features requiring clinical or methodological scrutiny.

---

## 19. Verification Status

Every variable definition must carry an explicit verification status:

- **`verified`**: Source variable, codebook reference, units, coding, missingness, and timing have been corroborated against official primary documentation. Requires at least one valid source reference in `evidence`.
- **`provisional`**: Preliminary operationalization based on secondary literature or initial inspection. Permitted for exploratory analysis, but triggers warnings before final modeling.
- **`unknown`**: Source identity, units, or coding cannot be established. Prohibited from production modeling.
- **`conflict`**: Contradictory definitions exist between codebooks, cycles, or project standards. Requires explicit human resolution.

---

## 20. Conflict Handling

When definitions conflict:
1. **Document the Discrepancy**: Record differing definitions, source citations, and conflicting values in `conflicts`.
2. **Escalate to Human Reviewer**: Mark variable as `status: "conflict"`.
3. **Halt Dependent Modeling**: The deterministic registry validator will flag conflicting definitions. Modeling pipelines must not silently select one branch.

---

## 21. Human Decision Authority

Under repository decision governance (`docs/agent/DECISION_AUTHORITY.md`), AI agents may autonomously draft variable definitions, parse codebooks, verify units, and detect leakage. However, **EXPLICIT HUMAN APPROVAL IS MANDATORY** for:

1. Modifying a frozen research outcome definition or positive-class rule.
2. Modifying a frozen prediction horizon ($t_0$ to $t_0 + \Delta t$).
3. Modifying a frozen study cohort, inclusion criteria, or exclusion rule.
4. Adopting an adapted clinical score in place of an official score.
5. Approving category collapses that alter clinical variable granularity.
6. Overriding any deterministic validator failure.

---

## 22. Backward Compatibility

This contract and its accompanying machine-readable schema (`docs/agent/schemas/variable_definition.schema.json`) govern all future variable registries and operationalization tasks. Legacy study scripts and historical datasets (e.g., existing Paper_01 scripts) are not forced to immediately rewrite existing variable code during this installation round. New pipelines and formal protocol specifications must comply fully with this contract.
