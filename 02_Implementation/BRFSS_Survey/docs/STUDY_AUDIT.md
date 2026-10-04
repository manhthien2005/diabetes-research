# BRFSS 2025 Full-Study Audit

**Audit branch:** `implement/BRFSS_survey`  
**Canonical notebook:** `kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb`

## Executive status

| Area | Status | Audit conclusion |
|---|---|---|
| Dataset provenance | PASS + open schema note | File size and SHA-256 are verified; CDC documents 284 variables while pandas exposes 283 |
| Target | PASS | Explicit `DIABETE4=1` vs `3`; correctly framed as self-reported status classification |
| Feature leakage | PASS with limitation | Diabetes-specific downstream fields excluded; concurrent comorbidities retain temporal ambiguity |
| Missing data | PASS | BRFSS special codes decoded before modeling; learned imputation is training-only |
| Split / CV isolation | PASS | 80/20 stratified holdout; preprocessing lives inside model CV pipelines |
| CV uncertainty | FIXED | Naive 5-fold t-CIs removed; CV now descriptive mean/SD/range |
| Model fairness | PASS with scope note | Same data contract; frozen untuned baselines, not optimized algorithm ceilings |
| Class imbalance metrics | IMPROVED | Balanced Accuracy added alongside PR-AUC/Recall/F1 |
| Calibration | IMPROVED | Brier retained; calibration plot added for probability models |
| Linear SVM | PASS | Margin used for ranking metrics; no invalid Brier score |
| Paired comparison | PASS | Same held-out respondents; LR-vs-rest is primary paired bootstrap comparison |
| Multiplicity | PASS / clarified | McNemar all-pairs uses Holm; all-pairs bootstrap is labeled exploratory |
| Visualization | IMPROVED | Combined ROC/PR, metric matrix, calibration, threshold trade-off, aggregated feature diagnostics |
| Notebook management | PASS | One executable notebook; no split model/comparison notebooks |

## Literature cross-check

| Source | Protocol difference from this study | Audit use |
|---|---|---|
| P01 | Multi-year, age ≥40, logistic/D&R, different missing-data/target handling | Predictor/BRFSS precedent only |
| P02 | 2014, age >30, complete cases, 2/3–1/3 split, train-only SMOTE | Model/feature/resampling precedent |
| P03 | Tennessee 2023, MICE, feature selection, train-only SMOTE, tuning | Closest metrics/model-comparison template |
| P05 | 2021, resampling + GA-XGBoost/stacking | XGBoost/method context only |
| P06 | Curated 2015 derivative; prediabetes+diabetes positive | Indirect feature-selection evidence |

**Rule:** paper metrics are not expected to numerically match our benchmark.

## Model cross-check

| Model | Key audit finding |
|---|---|
| Logistic Regression | Appropriate transparent baseline; exact sklearn config is study-specific |
| Decision Tree | Very large train–test gap is expected to be reported explicitly as overfitting |
| Random Forest | Better than single tree but still shows a large train–test gap; no claim of tuned optimality |
| Gradient Boosting | Strong PR-AUC/Brier point estimates; near-tied ROC-AUC with LR/XGB/SVM |
| XGBoost | Highest frozen ROC-AUC by a tiny margin; difference requires paired CI |
| Linear SVM | Highest precision/specificity but low recall; Brier correctly omitted |
| Gaussian NB | Highest frozen recall/F1 at default threshold but weak precision/calibration; Gaussian assumption is only a baseline simplification |

## Interpretation guardrails

- Do not call 15.13% a national prevalence estimate.
- Do not call the random 20% test set external validation.
- Do not interpret concurrent comorbidities as causal risk factors.
- Do not declare a universal best model from one point metric.
- Do not tune hyperparameters or thresholds after seeing the held-out test set.
- If threshold optimization is later required, select it inside training/CV only and report the default boundary alongside it.

## Remaining verification gate

The study is final only after the canonical Kaggle execution:
1. reproduces every frozen point metric within tolerance;
2. writes all seven standardized model artifacts;
3. completes paired bootstrap and McNemar outputs;
4. produces all comparison/calibration figures;
5. passes GitHub Actions read-back checks.
