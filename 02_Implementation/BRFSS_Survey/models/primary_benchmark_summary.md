# Primary Seven-Model Benchmark — Frozen Checkpoint

**Dataset:** BRFSS 2025  
**Primary cohort:** 342,539 respondents  
**Training set:** 274,031  
**Untouched internal test set:** 68,508  
**Predictors:** 20 frozen literature-grounded variables  
**Primary resampling:** none  
**Cross-validation:** Stratified 5-fold on training data only

All seven primary model specifications have now been independently executed, verified, and frozen.

## Model set

| ID | Model | Family | Main provenance |
|---|---|---|---|
| 01 | Logistic Regression | Linear probabilistic | P01/P02/P03 |
| 02 | Decision Tree | Single tree | P02/P03 |
| 03 | Random Forest | Bagged tree ensemble | P02/P03 |
| 04 | Gradient Boosting | Sequential boosting | P03 + Friedman (2001) |
| 05 | XGBoost | Regularized boosting | P03/P05 + Chen & Guestrin (2016) |
| 06 | Linear SVM | Maximum-margin linear | P02/P03 + Cortes & Vapnik (1995) |
| 07 | Gaussian Naive Bayes | Probabilistic conditional-independence | P02 + Friedman et al. (1997) |

## Frozen test-set metrics

| Model | Accuracy | Precision | Recall | Specificity | F1 | ROC-AUC | PR-AUC | Brier |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Logistic Regression | 0.8558 | 0.5715 | 0.1882 | 0.9748 | 0.2832 | 0.8262 | 0.4466 | 0.1033 |
| Decision Tree | 0.7862 | 0.3102 | 0.3380 | 0.8661 | 0.3235 | 0.6021 | 0.2053 | 0.2134 |
| Random Forest | 0.8510 | 0.5213 | 0.1889 | 0.9691 | 0.2773 | 0.8045 | 0.4025 | 0.1076 |
| Gradient Boosting | 0.8564 | 0.5860 | 0.1723 | 0.9783 | 0.2663 | 0.8260 | 0.4483 | 0.1031 |
| XGBoost | 0.8548 | 0.5574 | 0.1964 | 0.9722 | 0.2905 | 0.8263 | 0.4417 | 0.1035 |
| Linear SVM | 0.8560 | 0.6244 | 0.1208 | 0.9870 | 0.2024 | 0.8262 | 0.4479 | N/A |
| Gaussian Naive Bayes | 0.7273 | 0.3192 | 0.7082 | 0.7307 | 0.4400 | 0.7886 | 0.3641 | 0.2523 |

## What can already be concluded descriptively

The seven models show distinct operating behaviors:

- Logistic Regression, Gradient Boosting, XGBoost, and Linear SVM have almost identical ROC-AUC values around **0.826** despite very different architectures.
- Random Forest substantially improves over the unrestricted single Decision Tree, supporting the expected variance-reduction effect of ensemble averaging.
- Gaussian Naive Bayes produces much higher sensitivity at the default threshold but also a much larger false-positive burden.
- Linear SVM is the most conservative classifier at its native zero-margin boundary, with high precision/specificity but low recall.
- Decision Tree strongly overfits the training data and has weak held-out discrimination compared with the ensemble/linear baselines.

These are **descriptive comparisons**, not yet claims of statistically significant superiority.

## Why there is no single "best model" at this checkpoint

The models optimize different trade-offs at their frozen default decision thresholds.

For example:
- high recall and high specificity point in different directions;
- ROC-AUC evaluates ranking independent of one threshold;
- PR-AUC is particularly informative under class imbalance;
- Brier score evaluates probability accuracy but is not available for the uncalibrated Linear SVM;
- F1 emphasizes positive-class classification at the chosen threshold.

Therefore the study should not select a model solely from one metric or from tiny numerical differences such as:

```text
LR ROC-AUC   = 0.82617
GB ROC-AUC   = 0.82602
XGB ROC-AUC  = 0.82629
SVM ROC-AUC  = 0.82616
```

The next phase must assess whether such differences are materially/statistically distinguishable.

## Primary benchmark is now closed

The following are frozen:

- target cohort;
- 20 predictors;
- preprocessing;
- train/test split;
- cross-validation scheme;
- seven primary model specifications;
- untouched test-set point estimates.

No model in the primary benchmark may now be retuned based on these test results.

## Next phase — paired model comparison

The statistically appropriate next step is to compare predictions on the **same test respondents**.

Required artifacts:
1. per-respondent test label;
2. predicted class for each model;
3. probability or decision score for each model;
4. deterministic respondent/test-row identifier.

This will allow:
- paired bootstrap differences in ROC-AUC / PR-AUC / F1;
- McNemar tests for paired classification errors;
- direct ROC/PR overlay plots;
- threshold-independent comparison of the strongest models.

Because earlier model notebooks did not all persist row-level predictions, these predictions must be regenerated from the **already-frozen configurations**. Regeneration is evaluation-only: it must not alter any model specification or test-set result.
