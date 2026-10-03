# Model 04 — Gradient Boosting

## Role

Sequential boosting ensemble for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### BRFSS-specific precedent — P03

Muhammad, Sani, & Ahmed (2025), *Journal of Primary Care & Community Health*.  
DOI: `10.1177/21501319251400546`.

The study evaluated Gradient Boosting as one of seven classifiers on 2023 Tennessee BRFSS data using stratified 5-fold cross-validation and reported accuracy, precision, recall, F1, AUROC, and PR-AUC.

Use in this project:
- direct BRFSS + diabetes + Gradient Boosting precedent;
- same broad model-comparison role;
- same cross-validation and metric family.

### Architecture source — Friedman (2001)

Jerome H. Friedman, *Greedy Function Approximation: A Gradient Boosting Machine*, *The Annals of Statistics*.  
DOI: `10.1214/aos/1013203451`.

This paper establishes the forward stage-wise gradient boosting framework: an additive model is built sequentially, with each new weak learner fitted in the direction of the negative gradient of the loss.

Use in this project:
- primary architecture citation for Gradient Boosting itself;
- justification for sequential additive regression-tree weak learners.

## Frozen architecture

```python
GradientBoostingClassifier(
    loss="log_loss",
    learning_rate=0.1,
    n_estimators=100,
    subsample=1.0,
    criterion="friedman_mse",
    min_samples_split=2,
    min_samples_leaf=1,
    max_depth=3,
    max_features=None,
    random_state=42,
)
```

## Provenance classification

| Decision | Provenance |
|---|---|
| Gradient Boosting family | P03 + Friedman (2001) |
| Sequential additive trees | Friedman (2001) |
| BRFSS diabetes application | P03 |
| Stratified 5-fold CV | P03 + frozen Part II |
| 100 boosting stages | Study-specific fixed sklearn baseline |
| learning rate 0.1 | Study-specific fixed sklearn baseline |
| depth-3 weak learners | Study-specific fixed sklearn baseline |
| full-sample boosting (`subsample=1.0`) | Study-specific fixed baseline |
| no SMOTE | Frozen Part II primary protocol |
| threshold 0.5 | Fixed baseline threshold |
| preprocessing/split | Frozen Part II protocol |

This is a **literature-grounded implementation**, not an exact reproduction of P03's tuned Gradient Boosting configuration.

## Execution strategy

Model 04 is executed in its own Kaggle notebook:

`kaggle/model_04_gradient_boosting/model_04_gradient_boosting.ipynb`

This avoids rerunning Models 01–03 every time a later model is added. It reconstructs the same frozen Part II cohort, split, and preprocessing deterministically.

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
- PR-AUC / Average Precision
- Brier score
- Confusion matrix

Uncertainty:
- 95% t-interval over five CV folds;
- 200-replicate stratified bootstrap on fixed held-out predictions.

## Freeze rule

After a verified successful run, no post-test change is permitted to:
- number of boosting stages;
- learning rate;
- weak-learner depth;
- threshold;
- preprocessing;
- feature set;
- resampling.

A tuned Gradient Boosting configuration must be versioned as a separate experiment.
