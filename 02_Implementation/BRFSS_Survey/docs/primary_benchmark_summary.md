# Primary 7-Model Benchmark — Final Summary

**Dataset:** BRFSS 2025  
**Task:** cross-sectional classification of self-reported diagnosed diabetes status  
**Cohort:** 342,539 respondents  
**Train / internal test:** 274,031 / 68,508  
**Predictors:** 20 literature-grounded variables  
**Protocol:** natural class distribution, fixed model configurations, no test-set tuning

## Held-out results

| Model | Accuracy | Balanced Acc. | Precision | Recall | F1 | ROC-AUC | Average Precision (AP) | Brier |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Logistic Regression | 0.8558 | 0.5815 | 0.5715 | 0.1882 | 0.2832 | 0.8262 | 0.4466 | 0.1033 |
| Decision Tree | 0.7862 | 0.6020 | 0.3102 | 0.3380 | 0.3235 | 0.6021 | 0.2053 | 0.2134 |
| Random Forest | 0.8510 | 0.5790 | 0.5213 | 0.1889 | 0.2773 | 0.8045 | 0.4025 | 0.1076 |
| Gradient Boosting | 0.8564 | 0.5753 | 0.5860 | 0.1723 | 0.2663 | 0.8260 | **0.4483** | **0.1031** |
| XGBoost | 0.8548 | 0.5843 | 0.5574 | 0.1964 | 0.2905 | **0.8263** | 0.4417 | 0.1035 |
| Linear SVM | 0.8560 | 0.5539 | **0.6244** | 0.1208 | 0.2024 | 0.8262 | 0.4479 | N/A |
| Gaussian Naive Bayes | 0.7273 | **0.7194** | 0.3192 | **0.7082** | **0.4400** | 0.7886 | 0.3641 | 0.2523 |

## What the paired analysis changes

The leading discrimination point estimates are essentially tied:

`LR ≈ GB ≈ XGBoost ≈ Linear SVM` at ROC-AUC ≈ **0.826**.

Paired bootstrap on the same 68,508 respondents shows:

- LR vs GB: ROC-AUC and Average Precision (AP) differences **not clearly different from zero**.
- LR vs XGBoost: ROC-AUC and Average Precision (AP) differences **not clearly different from zero**.
- LR vs Linear SVM: ROC-AUC and Average Precision (AP) differences **not clearly different from zero**.
- LR clearly exceeds Random Forest, Decision Tree and Gaussian NB in ranking/discrimination.

Holm-corrected McNemar tests likewise show no significant accuracy difference among LR/GB/XGBoost/Linear SVM pairs.

## Practical interpretation

There is **no defensible single overall winner** among LR, Gradient Boosting, XGBoost and Linear SVM on ranking discrimination.

Choice depends on the operating objective:

- **simple/interpretable + strong discrimination/calibration:** Logistic Regression;
- **best Brier / highest Average Precision (AP) point estimate:** Gradient Boosting;
- **slightly better frozen F1/Balanced Accuracy among the leading discriminators:** XGBoost;
- **highest precision/specificity but very low recall:** Linear SVM;
- **highest recall/F1 at the default boundary:** Gaussian NB, at the cost of poor precision, lower discrimination and poor calibration.

The primary scientific conclusion should therefore emphasize **trade-offs and statistical equivalence of the leading discrimination models**, not point-estimate ranking.


## Pre-submission robustness note

The historical artifact key `pr_auc` stores **scikit-learn Average Precision (AP)**. It is not trapezoidal PR-curve AUC.

The frozen notebook used 200 paired stratified bootstrap replicates. A separate pre-submission robustness audit re-used the exact frozen prediction vectors:
- 1,000-replicate all-seven-model bootstrap for metric stability;
- 5,000-replicate paired bootstrap for LR vs Gradient Boosting / XGBoost / Linear SVM on ROC-AUC and AP.

ROC-AUC conclusions were stable: none of the three leading challengers was clearly separated from Logistic Regression. The LR–XGBoost AP contrast is only ~0.0049 and sits close to the interval boundary; it is not used as evidence of overall model superiority.

These sensitivity analyses do not refit models, retune thresholds, or alter the frozen primary benchmark.
