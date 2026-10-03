# Model 05 Results — XGBoost

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-model-05-xgboost`  
**Kaggle kernel version:** 1  
**GitHub Actions run:** `37130981794`  
**Artifact ID:** `11277330219`  
**Model role:** regularized gradient-boosted tree ensemble

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

Threshold: `0.5`  
Resampling: none  
Preprocessing: frozen Part II pipeline  
CV: Stratified 5-fold on training only

Verified environment:

```text
Python        3.13.15
pandas        2.3.3
NumPy         2.1.3
scikit-learn  1.6.1
XGBoost       3.4.1
```

## Literature provenance

### P03 — Muhammad et al. (2025)
DOI: `10.1177/21501319251400546`

Direct BRFSS 2023 diabetes XGBoost precedent with stratified 5-fold CV.

### P05 — Li, Peng, & Peng (2024)
DOI: `10.1371/journal.pone.0311222`

Direct BRFSS 2021 XGBoost precedent, later extended to GA-XGBoost and stacking.

### Architecture — Chen & Guestrin (2016)
DOI: `10.1145/2939672.2939785`

Original XGBoost architecture reference.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.8550 | 0.8545–0.8554 |
| Precision | 0.5599 | 0.5546–0.5652 |
| Recall / Sensitivity | 0.1946 | 0.1900–0.1992 |
| Specificity | 0.9727 | 0.9716–0.9738 |
| F1 | 0.2888 | 0.2841–0.2935 |
| ROC-AUC | 0.8228 | 0.8203–0.8254 |
| PR-AUC | 0.4379 | 0.4353–0.4405 |

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.8548** | 0.8530–0.8565 |
| Precision | **0.5574** | 0.5410–0.5732 |
| Recall / Sensitivity | **0.1964** | 0.1884–0.2029 |
| Specificity | **0.9722** | 0.9708–0.9736 |
| F1 | **0.2905** | 0.2796–0.2989 |
| ROC-AUC | **0.8263** | 0.8225–0.8298 |
| PR-AUC | **0.4417** | 0.4332–0.4511 |
| Brier score | **0.1035** | 0.1027–0.1044 |

Bootstrap: 200 stratified replicates, seed `20251007`.

## Confusion matrix at threshold 0.5

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       56,526       1,617
True Diabetes           8,329       2,036
```

Derived:
- True negatives: 56,526
- False positives: 1,617
- False negatives: 8,329
- True positives: 2,036

## Comparison after five frozen models

| Metric | Logistic Regression | Decision Tree | Random Forest | Gradient Boosting | XGBoost |
|---|---:|---:|---:|---:|---:|
| Accuracy | 0.8558 | 0.7862 | 0.8510 | **0.8564** | 0.8548 |
| Precision | 0.5715 | 0.3102 | 0.5213 | **0.5860** | 0.5574 |
| Recall | 0.1882 | **0.3380** | 0.1889 | 0.1723 | 0.1964 |
| Specificity | 0.9748 | 0.8661 | 0.9691 | **0.9783** | 0.9722 |
| F1 | 0.2832 | **0.3235** | 0.2773 | 0.2663 | 0.2905 |
| ROC-AUC | 0.8262 | 0.6021 | 0.8045 | 0.8260 | **0.8263** |
| PR-AUC | 0.4466 | 0.2053 | 0.4025 | **0.4483** | 0.4417 |
| Brier score | 0.1033 | 0.2134 | 0.1076 | **0.1031** | 0.1035 |

## Interpretation

The fixed plain XGBoost baseline yields probability discrimination that is numerically extremely close to Logistic Regression and Gradient Boosting:

```text
Logistic Regression ROC-AUC  0.82617
Gradient Boosting ROC-AUC    0.82602
XGBoost ROC-AUC              0.82629
```

The difference is too small to interpret as meaningful superiority without a paired statistical test.

At threshold 0.5:
- XGBoost has recall ~19.6%, higher than Logistic Regression, Random Forest, and Gradient Boosting;
- Decision Tree still has the highest recall but at a major cost in precision/discrimination;
- XGBoost precision/specificity are lower than Gradient Boosting and Logistic Regression;
- XGBoost F1 is numerically higher than the other three probability-oriented baselines, but still low because positive-class recall remains limited.

This supports a recurring result across the current models: the default 0.5 threshold is conservative under the natural ~15% positive prevalence.

No threshold optimization is performed on the test set.

## Literature context

Muhammad et al. (2025) reported XGBoost approximately:

```text
Accuracy   0.818
Precision  0.500
Recall     0.273
F1         0.353
AUROC      0.776
PR-AUC     0.402
```

Their test data were non-resampled, but model training used SMOTE-balanced training data.

Li et al. (2024) reported much higher XGBoost performance after balancing and additional modeling choices, and then optimized XGBoost using a genetic algorithm. Those results are not direct numerical targets for this baseline because their BRFSS year, preprocessing, sampling, target definition, features, and optimization differ.

## Freeze decision

Model 05 is frozen exactly as verified.

No post-test changes are allowed to:
- learning rate;
- depth;
- regularization;
- tree method;
- sampling parameters;
- threshold;
- preprocessing;
- feature set;
- class balancing.

Any tuned, GA-XGBoost, class-weighted, or resampled XGBoost must be a separately versioned experiment.
