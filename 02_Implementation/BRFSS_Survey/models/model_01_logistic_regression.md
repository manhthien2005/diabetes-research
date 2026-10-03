# Model 01 — Logistic Regression

## Role

Baseline linear classifier for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
DOI: 10.5888/pcd16.190109

Directly benchmarked Logistic Regression on BRFSS 2014 alongside SVM, Decision Tree, Random Forest, Gaussian Naive Bayes, and Neural Network. The paper evaluated held-out test performance with accuracy, sensitivity, specificity, and ROC-AUC.

Use in this project:
- precedent for Logistic Regression as a BRFSS diabetes classifier;
- precedent for held-out evaluation and class-specific metrics.

### P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health
DOI: 10.1177/21501319251400546

Used Logistic Regression as the transparent linear baseline in a seven-model BRFSS 2023 diabetes study. The study used an 80/20 stratified split, stratified 5-fold CV, and reported accuracy, precision, recall, F1, AUROC, and PR-AUC.

Use in this project:
- primary methodological precedent for the baseline role;
- precedent for stratified 5-fold cross-validation and the metric set.

Important difference:
- P03 trained models on SMOTE-balanced training data;
- our primary Model 01 does not use SMOTE because Part II froze the natural training distribution.

### P01 — Nayem & Biswas (2026), Scientific Reports
DOI: 10.1038/s41598-026-46927-7

Applied logistic regression to multi-year BRFSS 2014–2024 at large scale and released public R code.

Use in this project:
- confirms logistic regression as an appropriate large-scale BRFSS architecture;
- provides reproducible raw-BRFSS precedent.

## Mathematical architecture

```text
P(Y=1 | X) = sigmoid(beta_0 + X beta)
sigmoid(z) = 1 / (1 + exp(-z))
```

## Exact implementation used here

```python
LogisticRegression(
    penalty="l2",
    C=1.0,
    solver="lbfgs",
    max_iter=1000,
    class_weight=None,
)
```

The model is wrapped after the frozen Part II preprocessing `ColumnTransformer`.

## Provenance classification

| Decision | Provenance |
|---|---|
| Logistic Regression model family | Literature-supported: P01/P02/P03 |
| Baseline role | Literature-supported: P03 |
| 80/20 stratified split | Literature-supported: P03; frozen in Part II |
| Stratified 5-fold CV | Literature-supported: P03; frozen in Part II |
| L2 regularization | Study-specific sklearn baseline choice |
| `C=1.0` | Study-specific fixed value; no tuning |
| `lbfgs` solver | Study-specific sklearn implementation choice |
| `max_iter=1000` | Study-specific convergence allowance |
| `class_weight=None` | Study-specific; preserves natural distribution |
| No SMOTE | Frozen Part II primary protocol |
| Threshold 0.5 | Standard fixed baseline; no test-set optimization |
| Preprocessing | Frozen Part II protocol |

## Why L2 rather than an unpenalized reproduction

The Part II encoder retains the full one-hot representation for a model-agnostic shared preprocessing pipeline. L2 regularization makes the linear baseline numerically stable under correlated/dummy-coded predictors and is the standard scikit-learn Logistic Regression behavior.

This means Model 01 is **not claimed to reproduce P01's classical maximum-likelihood logistic regression exactly**.

It is a literature-grounded ML baseline suitable for fair comparison with subsequent classifiers.

## Evaluation

Training-only:
- Stratified 5-fold CV.

Internal test:
- Accuracy
- Precision
- Recall / sensitivity
- Specificity
- F1
- ROC-AUC
- PR-AUC / Average Precision
- Brier score
- Confusion matrix

Uncertainty:
- 95% t-interval across five CV folds;
- 200-replicate stratified bootstrap on the fixed held-out test predictions.

## Freeze rule

Once the verified Model 01 run completes, these settings are frozen. Test metrics must not be used to change `C`, threshold, preprocessing, class weights, or any other parameter.
