# Model 02 — Decision Tree

## Role

Single-tree nonlinear baseline for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
DOI: 10.5888/pcd16.190109

Directly evaluated a Decision Tree on BRFSS 2014 alongside Logistic Regression, SVM, Random Forest, Gaussian Naive Bayes, and Neural Network.

Use in this project:
- precedent for Decision Tree as a BRFSS diabetes classifier;
- precedent for held-out test metrics including sensitivity, specificity, and ROC-AUC.

### P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health
DOI: 10.1177/21501319251400546

Included Decision Tree as one of seven machine-learning algorithms on BRFSS 2023. The paper describes Decision Tree as a tree-based approach for capturing hierarchical decision patterns, uses an 80/20 stratified split and stratified 5-fold CV, and notes greater overfitting risk for single trees relative to ensemble models.

Use in this project:
- tree-based nonlinear modeling role;
- same CV/test architecture as the rest of the benchmark;
- methodological justification for recording tree complexity and overfitting diagnostics.

## Architecture

Scikit-learn implements an optimized CART-style decision tree. Model 02 uses Gini impurity and binary recursive partitioning.

```python
DecisionTreeClassifier(
    criterion="gini",
    splitter="best",
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features=None,
    class_weight=None,
    ccp_alpha=0.0,
    random_state=42,
)
```

## Provenance classification

| Decision | Provenance |
|---|---|
| Decision Tree model family | Literature-supported: P02/P03 |
| Tree-based nonlinear role | Literature-supported: P03 |
| 80/20 stratified split | Literature-supported: P03; frozen in Part II |
| Stratified 5-fold CV | Literature-supported: P03; frozen in Part II |
| CART-style sklearn implementation | Study-specific implementation |
| Gini impurity | Study-specific fixed default-style choice |
| Unrestricted depth | Study-specific default-style baseline |
| No pruning | Study-specific default-style baseline |
| No class weighting | Frozen primary protocol |
| No SMOTE | Frozen primary protocol |
| Threshold 0.5 | Fixed baseline threshold |

P03 states that default hyperparameters were initially used and tuning was applied where appropriate, but the exact verified tuned Decision Tree configuration was not available in the inspected main text. Therefore this project does **not** claim exact reproduction.

## Why use an unpruned baseline

An unrestricted tree gives a clear reference for:
- nonlinear hierarchical partitions;
- raw single-tree flexibility;
- overfitting behavior relative to Logistic Regression and later ensemble tree methods.

Tree depth, node count, leaf count, training accuracy, and training ROC-AUC are recorded explicitly.

A pruned or tuned tree would be a separate experiment and must not overwrite Model 02 after test evaluation.

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
- PR-AUC / Average Precision
- Brier score
- Confusion matrix

Uncertainty:
- 95% t-interval across five CV folds;
- 200-replicate stratified bootstrap on the fixed held-out test predictions.

## Interpretability note

Impurity-based feature importance is exported as a model diagnostic only. It is not interpreted causally and is not used to alter the frozen predictor set.
