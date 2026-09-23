---
name: prediction-model-rigor
description: Produce or audit clinical tabular prediction-model pipelines for diabetes, NHANES, EHR, and public-health cohorts. Enforces nested cross-validation, fold-isolated preprocessing and feature selection, calibration (intercept, slope, curve), decision-curve analysis, and external or temporal validation across classical learners (penalized logistic, random forest, XGBoost, LightGBM, CatBoost, SVM, ensembles). Use for model development planning, pipeline audit, result review, or pre-submission prediction-model rigor assessment.
triggers: prediction model rigor, clinical prediction model, tabular ML, EHR prediction, diabetes screening, NHANES modeling, nested cross-validation, nested CV, fold-isolated preprocessing, feature selection inside fold, calibration slope, calibration intercept, decision curve analysis, DCA, external validation, temporal validation, class imbalance, TRIPOD+AI, PROBAST+AI, penalized logistic, random forest, XGBoost, LightGBM, CatBoost, gradient boosting, tree ensemble, SVM, elastic net, ridge, LASSO, logistic regression, stacking, ensemble, missing data handling, skip-pattern missingness, survey weights, complex survey ML
tools: Read, Write, Edit, Bash, Grep, Glob
model: inherit
---

# Clinical Tabular Prediction-Model Rigor Skill (`prediction-model-rigor`)

## Purpose

Tabular machine learning on electronic health records (EHR), epidemiological surveys (NHANES, BRFSS),
and routine clinical registries is the primary methodology for diabetes prediction and glycemic staging.
However, published tabular clinical-ML models frequently suffer from severe methodological optimism:
- Preprocessing (imputation, scaling, encoding) and feature selection fit before cross-validation splitting.
- Hyperparameters tuned on the same folds used to report performance (flat cross-validation optimism).
- Model evaluation restricted to discrimination (AUROC) without calibration intercept, slope, or curves.
- Classification thresholds tuned on the final test or external-validation dataset.
- Random splits from the same source cohort mislabeled as "external validation".
- High-dimensional predictor sets fitted with insufficient event counts and no regularisation or dimensionality control.
- Sampling weights and survey cluster structures in NHANES improperly handled (either ignored or applied without estimand justification).
- Post-hoc interpretability metrics (SHAP, feature importances) misconstrued as causal clinical mechanisms.
- Established clinical risk scores (e.g., ADA Risk Test, FINDRISC) silently altered or approximated while masquerading as original scores.

`prediction-model-rigor` provides an end-to-end framework to **design** rigorous clinical tabular prediction
pipelines and **audit** candidate or published pipelines against TRIPOD+AI, PROBAST+AI, and repository-native
standards. It integrates scikit-learn, XGBoost, LightGBM, CatBoost, and statsmodels by reference; it does not
reimplement them and never fabricates patient data or metrics.

---

## Scope and Intended Use

### In Scope
- **Task Types**: Binary classification (e.g., undiagnosed diabetes presence vs absence, incident diabetes risk) and multiclass ordinal glycemic staging (Normal → Prediabetes → Diabetes) when conducted leakage-free per AGENTS.md §1.
- **Data Modalities**: Tabular clinical features, laboratory measurements, EHR longitudinal records, complex-survey data (NHANES).
- **Prediction Horizons**: Cross-sectional classification, early detection / opportunistic screening, and long-term risk prediction cohorts (AGENTS.md §3b).
- **Model Families**: Penalized logistic regression (LASSO, Ridge, Elastic Net), tree ensembles (Random Forest, Extra Trees), gradient boosting (XGBoost, LightGBM, CatBoost, HistGradientBoosting), SVM, shallow neural networks (MLP), and stacking/voting meta-learners.
- **Workflow Stages**: Model development planning, data leakage auditing, pipeline manifest verification, internal optimism estimation, calibration analysis, clinical utility assessment (DCA), and external validation audit.

### Out of Scope — Route Elsewhere
- Deep-learning computer vision and medical imaging → Not supported in repository scope.
- Pure inferential statistics or hypothesis testing without predictive modeling → `/analyze-stats`.
- Item-by-item reporting compliance audit of a finished manuscript → `/check-reporting` (TRIPOD+AI, PROBAST+AI, RECORD, STROBE).
- Reviewer-side manuscript critique and risk-of-bias audits → `/self-review` and `/peer-review`.
- Study design and cohort eligibility gates → `/design-study`.

---

## Core Rigor Principles & Failure Modes

The deterministic gate (`scripts/check_prediction_model_rigor.py`) audits declarative pipeline manifests and code against these failure modes:

| Verdict | Severity | Definition & Requirement |
|---|---|---|
| `NO_NESTED_CV` | **Major** | Hyperparameters or feature subsets tuned on the same folds used for reporting performance (flat CV), or no validation scheme. Requires nested cross-validation (inner tuning, outer evaluation) or a strictly held-out untouched test set. |
| `SELECTION_OUTSIDE_CV` | **Major** | Feature selection performed on the pooled dataset before cross-validation splitting. Leaks label-feature distributions from test folds. Selection must be fit strictly inside training folds. |
| `PREPROCESSING_LEAKAGE` | **Major** | Data-driven preprocessing (mean/median/MICE imputation, standard scaling, min-max scaling, target encoding) fit on the entire dataset before splitting. All transformers must be fit on training folds only. |
| `IMBALANCE_RESAMPLING_OUTSIDE_CV` | **Major** | Resampling methods (SMOTE, ADASYN, random oversampling/undersampling) applied to the dataset prior to fold splitting. Resampling must occur strictly inside training folds, leaving evaluation folds at natural prevalence. |
| `THRESHOLD_TUNED_ON_TEST` | **Major** | Decision threshold (cut-point) selected or tuned using test set or external validation set outcomes. Thresholds must be clinically prespecified or tuned strictly inside development/inner folds. |
| `INVALID_EXTERNAL_VALIDATION` | **Major** | A random holdout split from the same source cohort mislabeled as "external validation". External validation requires an independent geographic, institutional, or distinct cohort. |
| `HIGH_DIM_LOW_EVENTS` | **Major** | Number of candidate predictor parameters exceeds or approaches total events with no dimensionality reduction, shrinkage, or regularisation, risking extreme overfitting. |
| `NO_CALIBRATION` | **Minor** | Clinical prediction model evaluated only on discrimination (AUROC/AUPRC) without calibration assessment (calibration slope, intercept, calibration curves, or Brier score). |
| `NO_EXTERNAL_VALIDATION` | **Minor** | Single-cohort development without external or temporal validation. Clinical claims must be tempered to development-only findings. |
| `NO_BASELINE_COMPARATOR` | **Minor** | Complex machine learning learner reported without a transparent, simple comparator (e.g., standard or penalized logistic regression). |
| `MISSING_SURVEY_DESIGN` | **Minor** | Population-representative claims made on complex survey data (NHANES) without declaring sampling weights, strata, and primary sampling units (PSUs). |
| `UNJUSTIFIED_SURVEY_WEIGHTING` | **Minor** | Sampling weights applied during ML model training without articulating the target estimand (predictive accuracy in sample vs population-average risk estimation). |

---

## Detailed Pipeline Design & Audit Requirements

### 1. Cohort, Index Time, and Predictor Availability
- Define the **index time** ($t_0$) unambiguously for each participant.
- Every candidate predictor must be verifiably measured and documented **prior to or at index time**.
- Outcome-derived, post-index, or proxy features are strictly forbidden (e.g., using fasting glucose or HbA1c to predict current diabetes status, or post-baseline medication changes to predict baseline diabetes).
- For longitudinal long-term risk tasks, enforce a clear prediction horizon ($t_0$ to $t_0 + \Delta t$).

### 2. Resampling Units and Split Isolation
- Resampling (train-test splits, cross-validation folds) must respect the **unit of independence**. If the dataset contains repeated encounters or family members, partition by patient ID / cluster ID (e.g., `GroupKFold`, `StratifiedGroupKFold`).
- Temporal validation must respect chronology: train on earlier time periods, validate on subsequent periods.
- In nested cross-validation:
  - **Outer loop**: Estimates generalization performance. Never touches hyperparameter tuning or feature selection.
  - **Inner loop**: Runs entirely within each outer training fold to tune hyperparameters and select features.

### 3. Fold-Safe Preprocessing and Imputation
- All stateful transformers (imputers, scalers, encoders, PCA) must follow the `scikit-learn` Pipeline pattern:
  ```python
  from sklearn.pipeline import Pipeline
  from sklearn.impute import SimpleImputer
  from sklearn.preprocessing import StandardScaler
  from sklearn.linear_model import LogisticRegression

  pipe = Pipeline([
      ('imputer', SimpleImputer(strategy='median')),  # fit inside train fold only
      ('scaler', StandardScaler()),                   # fit inside train fold only
      ('classifier', LogisticRegression(penalty='l1', solver='saga'))
  ])
  ```
- **Missingness Strategy**:
  - Differentiate between structural/skip-pattern missingness (e.g., pregnancy-related questions for males) and missing at random.
  - Never impute the target outcome variable. Exclude missing outcome records prior to modeling with documented attrition flow.
  - Missing-indicator features must be scientifically justified rather than added blindly.

### 4. Sample Size, Event Sufficiency, and Model Complexity
- Record total participants ($N$), events ($E$), non-events, outcome prevalence, and candidate predictor parameters ($P$).
- For binary classification, effective sample size is primarily bounded by $E$ (the minority class).
- **No Universal Cutoff**: Avoid hard-coding a rigid "EPV $\ge$ 10" rule as a universal pass/fail criterion. Instead, evaluate the ratio of candidate parameters to events, the degree of penalization/shrinkage applied, and the risk of optimism. When $P$ is large relative to $E$, demand embedded regularization (LASSO, Ridge, Elastic Net) or fold-isolated feature screening.

### 5. Class Imbalance and Resampling Safeguards
- Resampling (SMOTE, ADASYN, random undersampling) is **optional**, not mandatory. In clinical prediction, artificial resampling distorts predicted probabilities and damages calibration.
- If resampling is applied, it must occur **strictly inside training folds** (using `imblearn.pipeline.Pipeline`).
- Test and validation folds must **always retain natural population prevalence**.
- Whenever resampling is used, assess whether probability calibration was degraded and consider probability recalibration or cost-sensitive learning (class weights) as alternatives.

### 6. Baseline Comparators and Published Scores
- Every complex machine learning model must be benchmarked against a standard, transparent baseline—minimally standard or penalized logistic regression evaluated on identical folds.
- When comparing against established clinical risk scores (e.g., ADA Diabetes Risk Test, FINDRISC):
  - Use the score only if the dataset possesses all variables required by its published official specification.
  - **Never silently approximate** a published score with proxy variables while claiming it is the official score. If an adaptation is necessary, explicitly label it as an adapted score (e.g., "Adapted FINDRISC-like score") and document all deviations.

### 7. Comprehensive Model Evaluation
- **Discrimination**:
  - Report AUROC with 95% confidence intervals (bootstrap or DeLong where appropriate).
  - Report AUPRC (Average Precision) alongside AUROC, particularly for low-prevalence outcomes.
  - **Never use accuracy as the sole or primary evaluation metric** in imbalanced clinical data.
- **Calibration**:
  - Calibration assessment is **mandatory** for clinical risk models.
  - Report calibration slope (target = 1.0), calibration intercept (target = 0.0), and Brier score.
  - Provide continuous or decile-based calibration plots.
  - Evaluate original model calibration before performing any post-hoc recalibration (Platt scaling or isotonic regression). Never assess calibration on training predictions.
- **Threshold Selection**:
  - Classification thresholds (e.g., operating points for high-risk flags) must be prespecified clinically (based on acceptable false positive / false negative trade-offs) or selected within the inner cross-validation loop.
  - **Never tune decision thresholds on the final test set or external validation cohort.**
- **Clinical Utility**:
  - Conduct Decision Curve Analysis (DCA) to calculate net benefit across a clinically sensible range of threshold probabilities ($p_t$), comparing the model against "treat-all" and "treat-none" strategies.

### 8. Validation Hierarchy & Optimism
- **Hierarchy of Evidence**:
  1. *Apparent Performance* (evaluated on training data): Highly optimistic, report only to measure shrinkage.
  2. *Internal Validation* (nested CV or out-of-fold bootstrap): Estimates internal optimism.
  3. *Temporal Validation* (future cohort from same system): Evaluates stability over time.
  4. *Geographic / External Validation* (independent healthcare system or distinct national cohort): Gold standard for clinical transportability.
- A random train/test split of a single dataset is **internal validation**, never external validation.

### 9. NHANES and Complex-Survey Profile
- When analyzing NHANES or complex multi-stage survey cohorts:
  - Document the sample design: primary sampling units (`SDMVPSU`), strata (`SDMVSTRA`), and sampling weights (`WTMEC2YR`, `WTMEC4YR`, etc.).
  - Follow NCHS guidelines for multi-cycle weight pooling.
  - **Estimand Articulation**: Explicitly state the target estimand:
    - *Descriptive population epidemiology*: Weighted design-based estimation is required.
    - *Predictive risk model*: State whether the objective is an empirical predictor for individuals presenting in a clinic, or a population-representative screening tool. If population transportability is claimed, evaluate survey-weighted metrics or conduct sensitivity comparisons between weighted and unweighted models.
  - Preprocessing and feature selection must remain strictly fold-safe regardless of survey weight inclusion.
  - Strata and PSU identifiers must **never** be used as raw predictive features.

### 10. Interpretability and Scientific Claim Boundaries
- Post-hoc explainability methods (SHAP values, permutation importance, regression coefficients) reflect **statistical associations within the model**, not biological or clinical causal mechanisms.
- Interpretability metrics must be computed on out-of-fold or held-out evaluation samples, not purely on training data.
- High feature importance does not prove clinical intervention efficacy.

---

## Machine-Readable Pipeline Manifest Schema

Pipelines are declared and audited via a JSON manifest:

```json
{
  "task_type": "binary_classification",
  "target_population": "US adults aged >= 20 without diagnosed diabetes (NHANES 2017-2020)",
  "outcome_definition": "Undiagnosed diabetes (FPG >= 126 mg/dL or HbA1c >= 6.5% per ADA criteria)",
  "prediction_horizon": "cross_sectional",
  "index_time": "Time of NHANES examination",
  "development_cohort": "NHANES 2017-March 2020 Pre-pandemic",
  "validation_cohorts": ["NHANES 2013-2016 (Temporal)"],
  "n_samples": 4500,
  "n_events": 420,
  "n_features": 18,
  "candidate_predictor_parameters": 24,
  "predictor_availability_rule": "Non-laboratory questionnaire and exam features available at initial screening",
  "missing_data_strategy": "Fold-isolated median imputation for continuous; missing-indicator for justified clinical variables",
  "preprocessing_stage": "inside_cv",
  "feature_selection_stage": "inside_cv",
  "resampling_stage": "none",
  "hyperparameter_tuning": "inner_cv",
  "resampling_design": "nested_cv",
  "cv_scheme": "nested",
  "threshold_strategy": "prespecified_clinical_risk",
  "baseline_comparator": "logistic_regression",
  "discrimination_metrics": ["auroc", "auprc"],
  "calibration_reported": true,
  "calibration_metrics": ["slope", "intercept", "brier_score", "calibration_curve"],
  "clinical_utility": "decision_curve_analysis",
  "survey_design": {
    "strata_variable": "SDMVSTRA",
    "psu_variable": "SDMVPSU",
    "weight_variable": "WTMEC4YR",
    "population_representative_claimed": true,
    "estimand_justification": "Evaluating population-level opportunistic screening yield with survey-weighted sensitivity/specificity"
  },
  "subgroup_evaluation": ["age_groups", "sex", "race_ethnicity"],
  "external_validation": "temporal",
  "external_validation_type": "temporal_cohort",
  "model": "xgboost",
  "reproducibility_seed_or_determinism_notes": "Random seed 42 fixed across all fold splits and model initializations"
}
```

---

## Running the Deterministic Rigor Gate

Run the bundled CLI gate against any pipeline manifest:

```bash
python3 .agents/skills/prediction-model-rigor/scripts/check_prediction_model_rigor.py --manifest pipeline_manifest.json --strict
```

### CLI Options:
- `--manifest <path>`: Path to the JSON pipeline manifest (required).
- `--out <path>`: Write detailed audit JSON to this path.
- `--strict`: Exit code 1 if any `Major` rigor violation exists; exit 0 if clean or minor warnings only.
- `--quiet`: Suppress standard output table.

---

## Integration with Repository Skills

- **`/analyze-stats`**: Provides statistical code for calibration curves, Brier score decomposition, survey-weighted descriptive tables, and decision-curve net benefit.
- **`/check-reporting`**: Audits reporting coverage against TRIPOD+AI (clinical prediction models), PROBAST+AI (risk of bias in AI models), and RECORD/STROBE.
- **`/design-study`**: Upstream cohort framing, index-time validation, and selection-bias avoidance before pipeline code is constructed.
- **`/self-review`**: Downstream audit of drafted manuscripts; uses probe `clinical_prediction_model.md` to verify that rigor claims in prose match executed code.
- **`/peer-review`**: RoB mini-audit of external literature (CP1–CP6 probes) checking for cross-validation leakage and uncalibrated models.

---

## Anti-Hallucination & Execution Safeguards

1. **Never fabricate sample sizes, event counts, or performance metrics.** Every number in a manifest or report must stem from executed code.
2. **Never report flat-CV or holdout-tuned metrics as nested.** Tuning on the test split constitutes optimism that must be flagged.
3. **Never assert an audit pass without executing `check_prediction_model_rigor.py`.** Rigor verdicts must be reproducible by script.
4. **Do not enforce a rigid universal EPV $\ge$ 10 cutoff.** Evaluate penalization, shrinkage, and parameter-to-event ratios in context.
5. **Never tune decision thresholds on held-out test data.**
6. **Never silently approximate published risk scores.** Clearly label adapted scores.
7. **Never frame feature importance or SHAP values as causal effects.**
8. **Integrate by reference.** Do not reimplement machine learning libraries; verify their configuration and validation protocol.

---

## Local Changelog

| Date | Change | Author |
|---|---|---|
| 2026-09-21 | Initial import from `medsci-skills` commit d7df514 (MIT). Pinned as `radiomics-ml`. | agent (chore/skills-upgrade) |
| 2026-09-23 | Round 5B: Rebalanced discovery description to prominently foreground tabular clinical ML. | agent (chore/skills-upgrade) |
| 2026-09-23 | Round 6: Replaced `radiomics-ml` with repository-native `prediction-model-rigor`. Retired all imaging, radiomics, pyradiomics, IBSI, voxel, and scanner assumptions. Preserved nested CV, fold isolation, calibration, and external validation. Added clinical tabular contracts for missing data, event sufficiency, transparent baseline comparators, threshold selection, NHANES complex-survey profile, optimism, and causal claim boundaries. Updated deterministic audit script, challenge suite, and tests. | agent (chore/skills-upgrade) |
