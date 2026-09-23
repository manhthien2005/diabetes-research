# Canonical Experiment Policy and Evaluation Governance

## 1. Purpose and Authority
This policy establishes cross-cutting experiment governance, evaluation discipline, and data-leakage prevention rules across all computational pipelines in this repository. Detailed clinical prediction-model auditing procedures remain authoritative in `prediction-model-rigor`; this document establishes overarching repository standards for split integrity, result immutability, provenance, and claim discipline.

## 2. Experiment Lifecycle
Every computational experiment must proceed through a disciplined, sequential lifecycle:
1. **Specification**: Definition of research question, target population, clinical outcome, prediction horizon, and candidate feature space.
2. **Protocol Validation**: Verification of variable bindings, units, missingness, and timing per `docs/agent/VARIABLE_CONTRACT.md`.
3. **Partitioning**: Establishing strictly isolated training, validation, and testing partitions prior to any feature transformation or model estimation.
4. **Isolated Model Estimation**: Executing fold-isolated preprocessing, feature selection, hyperparameter tuning, and model fitting.
5. **Evaluation and Auditing**: Assessing discrimination, calibration, clinical utility (DCA), and risk of bias on isolated evaluation splits.
6. **Artifact Logging**: Persisting code, environment parameters, random seeds, and raw evaluation outputs into immutable result records.

## 3. Inputs and Frozen Definitions
1. **Pre-Modeling Operationalization**: High-impact variable definitions, index dates, exclusion criteria, composite outcomes, and prediction horizons must be fully operationalized and validated before final predictive modeling begins.
2. **Frozen Outcomes**: Once an outcome definition (e.g., ADA-defined undiagnosed diabetes on NHANES) is frozen for a study, it must not be modified during or after model training without explicit human authorization per `docs/agent/DECISION_AUTHORITY.md`.
3. **Registry Grounding**: Features entering experiments must be backed by validated entries in the variable registry adhering to `docs/agent/VARIABLE_CONTRACT.md`.

## 4. Train-Validation-Test Isolation
1. **Strict Partitioning**: Datasets must be split into training, internal validation (or cross-validation folds), and held-out test partitions before applying any learned data transformations.
2. **Subject Independence**: Repeated measurements or related records belonging to the same participant or cluster must never be split across training and test partitions. Grouped partitioning (e.g., `GroupKFold`) must be enforced.
3. **Test Set Inviolability**: The final test set must remain completely unseen throughout model development, feature selection, and hyperparameter tuning. It is evaluated exactly once for final benchmark reporting.

## 5. Learned Preprocessing Isolation
1. **Zero Information Leakage**: Any preprocessing step that computes statistics from data—including mean/median imputation, scaling, normalization, categorical target encoding, and outlier bounds—must be fit strictly on training partitions and applied to validation/test partitions without modification.
2. **Resampling Isolation**: Class imbalance adjustments (e.g., SMOTE, random oversampling, ADASYN) must be performed strictly within internal training folds. Resampling must NEVER be applied to validation folds, held-out test partitions, or the overall dataset prior to splitting.
3. **Pipeline Encapsulation**: Preprocessing transformers and estimators must be bound into single unified pipelines (e.g., `scikit-learn` `Pipeline` or `imblearn` `Pipeline`) to guarantee strict fold isolation during cross-validation.

## 6. Feature-Selection Isolation
1. **Training Fold Restriction**: Supervised feature selection (e.g., Boruta, recursive feature elimination, correlation filtering, LASSO regularization) must be fit exclusively on training folds.
2. **Zero Outcome Contamination**: Feature selection must never be executed on the combined dataset prior to cross-validation or on the held-out test partition.
3. **Target Leakage Prohibition**: Component variables used to define composite outcome labels are classified as `label_component` and are strictly barred from candidate feature spaces.

## 7. Hyperparameter-Selection Isolation
1. **Nested Cross-Validation**: When hyperparameters are tuned on the same cohort used for model evaluation, nested cross-validation (outer folds for performance estimation, inner folds for hyperparameter selection) or a strictly separated holdout validation partition must be employed.
2. **No Test Tuning**: Hyperparameter grids or search spaces must never be guided, evaluated, or stopped based on test-set metrics.

## 8. Threshold-Selection Isolation
1. **Clinical Decision Thresholds**: Decision thresholds (e.g., optimizing Youden's J statistic, fixed sensitivity cutoffs, or net benefit points) must be selected on internal training or validation splits.
2. **No Test Optimization**: Operating thresholds must never be tuned or fitted on final reported test data or external validation cohorts.
3. **Default Comparison**: If non-standard probability thresholds are adopted, performance at the standard default threshold ($p = 0.5$) must also remain inspectable for transparent comparison.

## 9. Missing-Data Discipline
1. **Sentinel Identification**: Non-response sentinels and questionnaire refusal codes (e.g., `7`, `9`, `7777`, `9999`) must be converted to explicit missing indicators before modeling and never processed as numeric values.
2. **Skip-Pattern Respect**: Structural missingness arising from questionnaire skip logic must be handled using clinically consistent imputation rules, not generic missing-at-random (MAR) imputers.
3. **Fold-Isolated Imputation**: Multiple or single imputation models must be trained strictly on training data. Imputing across the entire dataset before splitting is a fatal methodological error.

## 10. Complex-Survey Considerations
1. **Representative Claims**: When formulating population-level epidemiological claims or screening prevalence estimates on complex survey cohorts (e.g., NHANES), complex survey sampling weights (`WTMEC2YR`), strata (`SDMVSTRA`), and primary sampling units (`SDMVPSU`) must be properly accounted for.
2. **Predictor Restriction**: Survey design variables (strata and PSU identifiers) reflect sample design clustering and must never be supplied as candidate predictors in machine learning models.
3. **Loss Weighting Alignment**: If sample weights are incorporated into loss functions during model training, the scientific estimand (e.g., population-representative predictive efficacy) must be explicitly stated.

## 11. Randomness and Reproducibility
1. **Seed Specification**: All stochastic operations—including data splitting, cross-validation partitioning, tree-based initialization, and neural weight assignment—must declare explicit, documented random seeds.
2. **Deterministic Pipelines**: Pipelines must produce deterministic, identical outputs when re-executed with identical input data, dependencies, and configuration.
3. **Environment Traceability**: Experiments must record runtime dependency versions (e.g., Python, scikit-learn, XGBoost, LightGBM) to guarantee computational auditability.

## 12. Metric and Calibration Discipline
1. **Comprehensive Evaluation**: Model evaluation must not rely solely on discrimination (AUROC). Clinical risk models must evaluate:
   - Discrimination: AUROC, Average Precision (PR-AUC) under class imbalance.
   - Calibration: Calibration curves, calibration slope, calibration intercept, Brier score.
   - Clinical Utility: Decision Curve Analysis (DCA) assessing net benefit across relevant clinical threshold ranges.
2. **Uncertainty Reporting**: Empirical performance metrics must be reported with 95% confidence intervals (derived from bootstrapping or cross-validation) rather than point estimates alone.

## 13. External-Validation Terminology
1. **Terminology Rigor**: A random holdout split (e.g., 80/20 train/test split) from the same underlying dataset is an **internal test set**, never "external validation".
2. **Temporal Validation**: Evaluation on a temporally distinct cohort collected after the development cohort (e.g., later NHANES survey cycles or later hospital admission years) constitutes **temporal validation**.
3. **Geographical/External Validation**: Evaluation on an independently collected cohort from a distinct healthcare system, geographic region, or country constitutes true **external validation**.
4. **Honest Labeling**: Misrepresenting internal test splits as external validation is a scientific violation.

## 14. Result Provenance
1. **Traceability**: Every reported experimental result must be traceable to exact source code, configuration files, input dataset versions, random seeds, and generated execution logs.
2. **Output Locations**: Formal experiment outputs, performance tables, and audit summaries must be written to designated implementation directories (e.g., `02_Implementation/<Study>/qc/` or results folders), never scattered across transient scratch spaces.

## 15. Experiment Artifact Immutability
1. **No Silent Overwrites**: Completed and verified experimental artifacts must not be silently overwritten or modified to retroactively adjust reported performance.
2. **Versioned Iteration**: When improving or modifying a pipeline, new runs must produce versioned outputs (e.g., `run_02`, `model_v2`) or explicit timestamped logs to preserve historical auditability.
3. **Negative Results Preservation**: Unfavorable, non-significant, or failed experiment runs must be preserved in project records and never deleted merely because they conflict with a desired outcome.

## 16. Re-Running Experiments
1. **Reproducibility Verification**: Re-running an existing experiment with identical configurations must reproduce published metrics within numerical precision tolerances.
2. **Discrepancy Investigation**: If a re-run fails to reproduce recorded performance, the discrepancy must be investigated, documented, and reported rather than patched silently.

## 17. Failure and Warning Handling
1. **Deterministic Halts**: Severe methodological violations—such as post-index feature leakage, evaluation on training sets, or invalid outcome definitions—must cause pipelines to halt immediately with explicit errors.
2. **Warning Transparency**: Convergence warnings, high missingness warnings, or poor calibration indicators must be surfaced in audit logs, not suppressed with blanket warning silencers.

## 18. Claim-to-Result Traceability
1. **Direct Empirical Grounding**: Every quantitative assertion made in manuscripts, briefs, or project reports must link directly to an underlying experimental result artifact.
2. **No Cherry-Picking**: Performance must be reported across all pre-specified baseline and comparator models. Suppressing superior comparator baselines to highlight a preferred model is strictly prohibited.
