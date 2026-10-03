# Primary 7-Model Benchmark Summary

**Dataset:** BRFSS 2025  
**Primary cohort:** 342,539 respondents  
**Training set:** 274,031  
**Untouched test set:** 68,508  
**Predictors:** 20 literature-grounded variables  
**Primary protocol:** fixed Part II preprocessing, natural class distribution, no resampling, fixed model-specific default decision boundary.

## Frozen models

1. Logistic Regression
2. Decision Tree
3. Random Forest
4. Gradient Boosting
5. XGBoost
6. Linear SVM
7. Gaussian Naive Bayes

Every model is recorded as `verified_frozen`; no primary-model hyperparameter was changed after viewing its internal test result.

## Test-set results

| Model | Accuracy | Precision | Recall | Specificity | F1 | ROC-AUC | PR-AUC | Brier |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Logistic Regression | 0.8558 | 0.5715 | 0.1882 | 0.9748 | 0.2832 | 0.8262 | 0.4466 | 0.1033 |
| Decision Tree | 0.7862 | 0.3102 | 0.3380 | 0.8661 | 0.3235 | 0.6021 | 0.2053 | 0.2134 |
| Random Forest | 0.8510 | 0.5213 | 0.1889 | 0.9691 | 0.2773 | 0.8045 | 0.4025 | 0.1076 |
| Gradient Boosting | 0.8564 | 0.5860 | 0.1723 | 0.9783 | 0.2663 | 0.8260 | 0.4483 | 0.1031 |
| XGBoost | 0.8548 | 0.5574 | 0.1964 | 0.9722 | 0.2905 | 0.8263 | 0.4417 | 0.1035 |
| Linear SVM | 0.8560 | 0.6244 | 0.1208 | 0.9870 | 0.2024 | 0.8262 | 0.4479 | N/A |
| Gaussian Naive Bayes | 0.7273 | 0.3192 | 0.7082 | 0.7307 | 0.4400 | 0.7886 | 0.3641 | 0.2523 |

## What the benchmark currently shows

The four strongest ranking/discrimination baselines — Logistic Regression, Gradient Boosting, XGBoost, and Linear SVM — have nearly identical ROC-AUC values around **0.826**.

The fixed decision boundaries produce very different class behavior:

- Linear SVM is highly conservative: high precision/specificity but low recall.
- Gaussian Naive Bayes is aggressive: very high recall but many false positives.
- Decision Tree raises recall relative to most baselines but generalizes poorly overall.
- Random Forest substantially improves over the single Decision Tree, but its discrimination remains below the leading linear/boosted models.
- Logistic Regression, Gradient Boosting, and XGBoost provide similar overall discrimination with different threshold-level precision/recall trade-offs.

Because these models share the same test respondents, small numerical differences should not be interpreted as meaningful until a **paired comparison** is performed on per-respondent predictions.

## Next analysis gate

The next comparison notebook should refit each frozen model once on the full training set and export aligned test predictions:

```text
respondent_index
true_label
lr_score / lr_pred
dt_score / dt_pred
rf_score / rf_pred
gb_score / gb_pred
xgb_score / xgb_pred
svm_margin / svm_pred
gnb_score / gnb_pred
```

That aligned prediction table will enable:

1. paired bootstrap confidence intervals for differences in ROC-AUC and PR-AUC;
2. paired bootstrap differences for threshold metrics;
3. McNemar tests for paired classification disagreements;
4. consolidated ROC / precision-recall comparison plots;
5. a defensible conclusion about whether tiny numerical differences among LR/GB/XGB/SVM are meaningful.

No primary model will be retuned during this comparison step.
