# Primary Seven-Model Benchmark — Frozen Results

All seven primary models have been specified **before their final test evaluation** and are now frozen.

The same BRFSS 2025 modeling cohort, 20 predictors, 80/20 stratified split, and Part II preprocessing logic were used throughout.

## Frozen models

1. Logistic Regression
2. Decision Tree
3. Random Forest
4. Gradient Boosting
5. XGBoost
6. Linear Support Vector Machine
7. Gaussian Naive Bayes

KNN is not part of the primary full-cohort benchmark because exact nearest-neighbor prediction is computationally mismatched to the 274,031-row training reference set. It may be considered later as a prespecified subsample sensitivity experiment, but such a result would not be directly comparable to the full-cohort benchmark.

## Held-out test metrics

| Model | Accuracy | Precision | Recall | Specificity | F1 | ROC-AUC | PR-AUC | Brier |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Logistic Regression | 0.8558 | 0.5715 | 0.1882 | 0.9748 | 0.2832 | 0.8262 | 0.4466 | 0.1033 |
| Decision Tree | 0.7862 | 0.3102 | 0.3380 | 0.8661 | 0.3235 | 0.6021 | 0.2053 | 0.2134 |
| Random Forest | 0.8510 | 0.5213 | 0.1889 | 0.9691 | 0.2773 | 0.8045 | 0.4025 | 0.1076 |
| Gradient Boosting | 0.8564 | 0.5860 | 0.1723 | 0.9783 | 0.2663 | 0.8260 | 0.4483 | 0.1031 |
| XGBoost | 0.8548 | 0.5574 | 0.1964 | 0.9722 | 0.2905 | 0.8263 | 0.4417 | 0.1035 |
| Linear SVM | 0.8560 | 0.6244 | 0.1208 | 0.9870 | 0.2024 | 0.8262 | 0.4479 | N/A |
| Gaussian Naive Bayes | 0.7273 | 0.3192 | 0.7082 | 0.7307 | 0.4400 | 0.7886 | 0.3641 | 0.2523 |

## Why point estimates are not enough

Several models have nearly identical ranking metrics:

```text
ROC-AUC
Logistic Regression  0.826168
Gradient Boosting    0.826016
XGBoost              0.826290
Linear SVM           0.826158
```

A difference of a few ten-thousandths must not be described as a meaningful performance difference solely because one number is numerically larger.

The next comparison stage therefore uses **paired predictions on the same held-out respondents** and paired stratified bootstrap differences.

## Primary comparison rule

Logistic Regression is used as the prespecified **reference baseline**, because it was Model 01 and its baseline role was established from the literature before the later model results were observed.

For each other model, the comparison notebook will estimate paired differences versus Logistic Regression for:

- ROC-AUC;
- PR-AUC;
- accuracy;
- F1;
- recall;
- specificity.

Brier-score differences are additionally evaluated for models that provide genuine probabilities. Uncalibrated Linear SVM is excluded from Brier comparison.

The bootstrap is paired: every replicate resamples respondent indices once and applies the **same respondent sample to every model**. This preserves correlation between model predictions and provides a more appropriate uncertainty estimate for model-to-model differences than comparing two independent confidence intervals.

## No further tuning

The comparison stage is post-hoc evaluation only.

It must not:
- change hyperparameters;
- change model thresholds;
- change preprocessing;
- change features;
- add class balancing;
- select a new target definition.

Any later sensitivity experiment is versioned separately from this frozen primary benchmark.
