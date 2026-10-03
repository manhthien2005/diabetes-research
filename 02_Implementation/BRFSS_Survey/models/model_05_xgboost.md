# Model 05 — XGBoost

## Role

Regularized gradient-boosted tree classifier for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### P03 — Muhammad et al. (2025)
*Journal of Primary Care & Community Health*  
DOI: `10.1177/21501319251400546`

Direct BRFSS diabetes precedent using XGBoost among seven classifiers with stratified 5-fold CV.

### P05 — Li, Peng, & Peng (2024)
*PLOS ONE*  
DOI: `10.1371/journal.pone.0311222`

Uses BRFSS 2021 and XGBoost, then extends it to GA-XGBoost and stacking. The paper emphasizes XGBoost regularization and second-order optimization.

### Architecture — Chen & Guestrin (2016)
*XGBoost: A Scalable Tree Boosting System*, KDD '16  
DOI: `10.1145/2939672.2939785`

Primary architecture reference for XGBoost's scalable regularized tree boosting system.

## Frozen architecture

```python
XGBClassifier(
    objective="binary:logistic",
    eval_metric="logloss",
    booster="gbtree",
    n_estimators=100,
    learning_rate=0.3,
    max_depth=6,
    min_child_weight=1,
    gamma=0.0,
    subsample=1.0,
    colsample_bytree=1.0,
    reg_alpha=0.0,
    reg_lambda=1.0,
    tree_method="hist",
    random_state=42,
    n_jobs=-1,
)
```

## Provenance classification

| Decision | Provenance |
|---|---|
| XGBoost model family | P03/P05 + Chen & Guestrin |
| Regularized boosted trees | Chen & Guestrin (2016) |
| BRFSS diabetes use | P03/P05 |
| 5-fold CV | P03 + frozen Part II |
| 100 estimators | Study-specific fixed baseline |
| learning rate 0.3 | Study-specific fixed baseline |
| max depth 6 | Study-specific fixed baseline |
| L2 regularization 1.0 | Study-specific fixed baseline |
| histogram tree method | Study-specific computational choice |
| no SMOTE | Frozen Part II protocol |
| threshold 0.5 | Fixed baseline threshold |

This is a **plain XGBoost baseline**. It is not GA-XGBoost, not a tuned reproduction, and not a resampled variant.

## Evaluation

Training:
- Stratified 5-fold CV.

Untouched internal test:
- Accuracy
- Precision
- Recall / sensitivity
- Specificity
- F1
- ROC-AUC
- PR-AUC
- Brier score
- Confusion matrix

Uncertainty:
- 95% t-interval across CV folds;
- 200-replicate stratified bootstrap on held-out predictions.

## Freeze rule

Once verified, no post-test modification is permitted to depth, learning rate, regularization, sampling parameters, threshold, preprocessing, or feature set.
