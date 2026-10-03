# Model 04 Results — Gradient Boosting

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-model-04-gradient-boosting`  
**Kaggle kernel version:** 1  
**GitHub Actions run:** `37112614917`  
**Artifact ID:** `11270850974`  
**Model role:** sequential boosting ensemble

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

Threshold: `0.5`  
Resampling: none  
Preprocessing: frozen Part II pipeline  
CV: Stratified 5-fold on training only

Verified execution environment:

```text
Python        3.13.15
pandas        2.3.3
NumPy         2.1.3
scikit-learn  1.6.1
```

## Literature provenance

### BRFSS-specific
Muhammad et al. (2025), *Journal of Primary Care & Community Health*.  
DOI: `10.1177/21501319251400546`.

The paper directly evaluated Gradient Boosting on 2023 Tennessee BRFSS data within a seven-model diabetes-classification benchmark using stratified 5-fold CV.

### Architecture
Friedman (2001), *Greedy Function Approximation: A Gradient Boosting Machine*, *The Annals of Statistics*.  
DOI: `10.1214/aos/1013203451`.

The model family is therefore grounded both in a direct BRFSS diabetes precedent and the original gradient-boosting architecture paper.

The exact 100-stage, learning-rate-0.1, depth-3 sklearn configuration is a fixed study-specific baseline and is **not** claimed as an exact reproduction of P03's tuned implementation.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.8564 | 0.8558–0.8569 |
| Precision | 0.5875 | 0.5793–0.5958 |
| Recall / Sensitivity | 0.1704 | 0.1676–0.1733 |
| Specificity | 0.9787 | 0.9777–0.9796 |
| F1 | 0.2642 | 0.2610–0.2674 |
| ROC-AUC | 0.8228 | 0.8205–0.8251 |
| PR-AUC | 0.4448 | 0.4411–0.4484 |

Fold-to-fold variation is small, indicating stable internal performance under the fixed protocol.

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.8564** | 0.8548–0.8576 |
| Precision | **0.5860** | 0.5689–0.6004 |
| Recall / Sensitivity | **0.1723** | 0.1656–0.1795 |
| Specificity | **0.9783** | 0.9772–0.9795 |
| F1 | **0.2663** | 0.2578–0.2757 |
| ROC-AUC | **0.8260** | 0.8222–0.8297 |
| PR-AUC | **0.4483** | 0.4385–0.4570 |
| Brier score | **0.1031** | 0.1023–0.1040 |

Bootstrap: 200 stratified replicates, seed `20251006`.

## Confusion matrix at threshold 0.5

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       56,881       1,262
True Diabetes           8,579       1,786
```

Derived:
- True negatives: 56,881
- False positives: 1,262
- False negatives: 8,579
- True positives: 1,786

## Comparison after four frozen models

All models use the same BRFSS 2025 target cohort, 20 predictors, split, and primary preprocessing design.

| Metric | Logistic Regression | Decision Tree | Random Forest | Gradient Boosting |
|---|---:|---:|---:|---:|
| Accuracy | 0.8558 | 0.7862 | 0.8510 | **0.8564** |
| Precision | 0.5715 | 0.3102 | 0.5213 | **0.5860** |
| Recall | 0.1882 | **0.3380** | 0.1889 | 0.1723 |
| Specificity | 0.9748 | 0.8661 | 0.9691 | **0.9783** |
| F1 | 0.2832 | **0.3235** | 0.2773 | 0.2663 |
| ROC-AUC | **0.8262** | 0.6021 | 0.8045 | 0.8260 |
| PR-AUC | 0.4466 | 0.2053 | 0.4025 | **0.4483** |
| Brier score | 0.1033 | 0.2134 | 0.1076 | **0.1031** |

## Interpretation

Gradient Boosting and Logistic Regression show **very similar probability discrimination** in this frozen baseline comparison:

- Logistic Regression ROC-AUC: 0.82617
- Gradient Boosting ROC-AUC: 0.82602

Gradient Boosting has slightly higher:
- accuracy;
- precision;
- specificity;
- PR-AUC;
- and slightly lower Brier score.

Logistic Regression has higher:
- recall;
- F1;
- and a numerically tiny ROC-AUC advantage.

These differences are small and the bootstrap intervals overlap. No claim of meaningful superiority should be made without a paired statistical comparison of predictions.

At threshold 0.5, Gradient Boosting remains conservative: specificity is ~97.8%, but sensitivity is ~17.2%.

## Comparison with P03

Muhammad et al. (2025) reported Gradient Boosting approximately:

```text
Accuracy  0.815
Precision 0.484
Recall    0.302
F1        0.372
AUROC     0.796
PR-AUC    0.447
```

Their models were trained on a SMOTE-balanced Tennessee BRFSS 2023 training set.

Our values are contextual rather than directly comparable because the studies differ in:
- national vs state-specific sample;
- BRFSS year;
- target/cohort construction;
- predictor definitions;
- missing-data handling;
- resampling;
- hyperparameter optimization.

Notably, our PR-AUC is numerically close to P03, but this should not be interpreted as replication equivalence.

## Execution-design improvement

Model 04 was executed in a dedicated Kaggle notebook rather than rerunning Models 01–03. This preserves the same deterministic Part II data protocol while reducing compute time and eliminating unnecessary re-execution of already-frozen models.

Future models should follow this model-specific notebook pattern.

## Freeze decision

Model 04 is frozen exactly as verified.

No post-test change will be made to:
- learning rate;
- number of boosting stages;
- weak-tree depth;
- loss;
- threshold;
- preprocessing;
- feature set;
- resampling.

Any tuned or resampled Gradient Boosting variant must be stored as a separately versioned sensitivity experiment.
