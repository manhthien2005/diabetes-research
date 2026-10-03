# Model 03 — Random Forest

## Role

Bagged tree ensemble for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
DOI: 10.5888/pcd16.190109

Directly evaluated Random Forest on BRFSS 2014 alongside Logistic Regression, SVM, Decision Tree, Gaussian Naive Bayes, and Neural Network.

Use in this project:
- direct precedent for Random Forest as a BRFSS diabetes classifier;
- contextual benchmark for sensitivity, specificity, accuracy, and AUC.

### P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health
DOI: 10.1177/21501319251400546

Included Random Forest in a seven-model BRFSS 2023 benchmark. The paper explicitly describes Random Forest as an ensemble of trees whose averaging improves stability and reduces overfitting compared with a single Decision Tree.

Use in this project:
- primary rationale for placing Random Forest immediately after Model 02;
- same stratified 80/20 split and 5-fold CV framework;
- same metric family.

## Architecture

```python
RandomForestClassifier(
    n_estimators=100,
    criterion="gini",
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features="sqrt",
    bootstrap=True,
    class_weight=None,
    ccp_alpha=0.0,
    random_state=42,
    n_jobs=-1,
)
```

The forest contains 100 CART-style trees. Each tree is trained on a bootstrap sample, and only a random subset of features is considered at each split. Predicted class probabilities are averaged across trees.

## Provenance classification

| Decision | Provenance |
|---|---|
| Random Forest model family | Literature-supported: P02/P03 |
| Ensemble averaging rationale | Literature-supported: P03 |
| 80/20 stratified split | Literature-supported: P03; frozen in Part II |
| Stratified 5-fold CV | Literature-supported: P03; frozen in Part II |
| 100 trees | Study-specific current sklearn default-style choice |
| Gini criterion | Study-specific current sklearn default-style choice |
| `max_features="sqrt"` | Study-specific current sklearn default-style choice |
| Bootstrap sampling | Core Random Forest architecture; sklearn default |
| Unlimited depth | Study-specific default-style baseline |
| No class weighting | Frozen primary protocol |
| No SMOTE | Frozen primary protocol |
| Threshold 0.5 | Fixed baseline threshold |

This is a literature-grounded Random Forest baseline, not an exact reproduction of the tuned P02 or P03 model.

## Why this model matters after Model 02

Model 02 showed severe overfitting:

- training accuracy ≈ 0.9997;
- training ROC-AUC ≈ 1.0;
- test ROC-AUC ≈ 0.602.

Model 03 tests the specific hypothesis that averaging many randomized trees improves generalization and probability discrimination without requiring post-test tuning.

## Evaluation

Training-only:
- Stratified 5-fold CV.

Internal test:
- Accuracy
- Precision
- Recall / Sensitivity
- Specificity
- F1
- ROC-AUC
- PR-AUC
- Brier score
- Confusion matrix

Uncertainty:
- 95% t-interval across five CV folds;
- 200-replicate stratified bootstrap on fixed test predictions.

Additional diagnostics:
- per-tree depth distribution;
- per-tree leaf counts;
- training accuracy and ROC-AUC;
- impurity-based feature importance.

## Fair-comparison note

The same frozen Part II preprocessing is retained for all models. Numerical scaling is not required by Random Forest, but it is harmless for ordering-based tree splits and maintains a common model-comparison pipeline.
