# Primary Seven-Model Benchmark — Frozen Results

All seven primary models use the same BRFSS 2025 binary cohort, the same 20 predictors, the same 80/20 stratified split, and the same Part II preprocessing logic.

## Held-out test results

| Model | Accuracy | Precision | Recall | Specificity | F1 | ROC-AUC | PR-AUC | Brier |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Logistic Regression | 0.8558 | 0.5715 | 0.1882 | 0.9748 | 0.2832 | 0.8262 | 0.4466 | 0.1033 |
| Decision Tree | 0.7862 | 0.3102 | 0.3380 | 0.8661 | 0.3235 | 0.6021 | 0.2053 | 0.2134 |
| Random Forest | 0.8510 | 0.5213 | 0.1889 | 0.9691 | 0.2773 | 0.8045 | 0.4025 | 0.1076 |
| Gradient Boosting | **0.8564** | 0.5860 | 0.1723 | 0.9783 | 0.2663 | 0.8260 | **0.4483** | **0.1031** |
| XGBoost | 0.8548 | 0.5574 | 0.1964 | 0.9722 | 0.2905 | **0.8263** | 0.4417 | 0.1035 |
| Linear SVM | 0.8560 | **0.6244** | 0.1208 | **0.9870** | 0.2024 | 0.8262 | 0.4479 | N/A |
| Gaussian Naive Bayes | 0.7273 | 0.3192 | **0.7082** | 0.7307 | **0.4400** | 0.7886 | 0.3641 | 0.2523 |

## Descriptive interpretation

There is no single model that dominates every metric.

- **Gradient Boosting** has the highest accuracy, highest PR-AUC, and lowest Brier score by small numerical margins.
- **XGBoost** has the highest ROC-AUC by a very small numerical margin.
- **Linear SVM** has the highest precision and specificity, but very low recall at its native zero-margin boundary.
- **Gaussian Naive Bayes** has by far the highest recall and highest native-threshold F1, but with many false positives and substantially weaker probability quality.
- **Decision Tree** shows severe overfitting and poor ranking discrimination.
- **Random Forest** greatly improves over the single tree but remains below the strongest LR/GB/XGB/SVM ranking performance.
- **Logistic Regression** remains highly competitive despite its simpler linear architecture.

These are **descriptive comparisons only**. Differences such as ROC-AUC 0.8260 vs 0.8263 must not be called meaningful until paired testing is performed on predictions from the same held-out respondents.

## Primary benchmark status

The primary model set is now closed:

1. Logistic Regression
2. Decision Tree
3. Random Forest
4. Gradient Boosting
5. XGBoost
6. Linear SVM
7. Gaussian Naive Bayes

No additional model should be added to the primary benchmark unless the study design is formally reopened.

## Next analysis gate

The next phase should focus on:

1. paired statistical comparison using the same held-out respondents;
2. unified ROC and precision-recall figures;
3. threshold-independent versus threshold-dependent interpretation;
4. the class-imbalance / decision-threshold trade-off;
5. final model-selection rationale based on the study objective rather than a single metric.
