# Model 07 Results — Gaussian Naive Bayes

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-model-07-gaussian-naive-bayes`  
**Kaggle kernel version:** 1  
**GitHub Actions run:** `37132521596`  
**Artifact ID:** `11277158139`  
**Model role:** probabilistic conditional-independence baseline

## Frozen architecture

```python
GaussianNB(
    priors=None,
    var_smoothing=1e-9,
)
```

Preprocessing: frozen Part II pipeline  
Representation adapter: sparse → dense only  
Threshold: `0.5`  
Resampling: none  
CV: Stratified 5-fold on training only

Verified environment:

```text
Python        3.13.15
pandas        2.3.3
NumPy         2.1.3
scikit-learn  1.6.1
```

## Literature provenance

### P02 — Xie et al. (2019)
DOI: `10.5888/pcd16.190109`

Direct BRFSS 2014 Gaussian Naive Bayes precedent.

### Architecture — Friedman, Geiger, & Goldszmidt (1997)
DOI: `10.1023/A:1007465528199`

Naive Bayes / Bayesian classifier architecture reference.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.7254 | 0.7225–0.7284 |
| Precision | 0.3157 | 0.3131–0.3183 |
| Recall / Sensitivity | 0.6979 | 0.6954–0.7005 |
| Specificity | 0.7303 | 0.7266–0.7340 |
| F1 | 0.4348 | 0.4324–0.4371 |
| ROC-AUC | 0.7836 | 0.7812–0.7861 |
| PR-AUC | 0.3553 | 0.3532–0.3574 |

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.7273** | 0.7244–0.7303 |
| Precision | **0.3192** | 0.3157–0.3227 |
| Recall / Sensitivity | **0.7082** | 0.7005–0.7185 |
| Specificity | **0.7307** | 0.7270–0.7341 |
| F1 | **0.4400** | 0.4354–0.4451 |
| ROC-AUC | **0.7886** | 0.7837–0.7937 |
| PR-AUC | **0.3641** | 0.3571–0.3718 |
| Brier score | **0.2523** | 0.2494–0.2552 |

Bootstrap: 200 stratified replicates, seed `20251009`.

## Confusion matrix at threshold 0.5

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       42,485      15,658
True Diabetes           3,025       7,340
```

Derived:
- True negatives: 42,485
- False positives: 15,658
- False negatives: 3,025
- True positives: 7,340

## Comparison after seven frozen models

| Metric | LR | DT | RF | GB | XGB | Linear SVM | Gaussian NB |
|---|---:|---:|---:|---:|---:|---:|---:|
| Accuracy | 0.8558 | 0.7862 | 0.8510 | 0.8564 | 0.8548 | 0.8560 | 0.7273 |
| Precision | 0.5715 | 0.3102 | 0.5213 | 0.5860 | 0.5574 | **0.6244** | 0.3192 |
| Recall | 0.1882 | 0.3380 | 0.1889 | 0.1723 | 0.1964 | 0.1208 | **0.7082** |
| Specificity | 0.9748 | 0.8661 | 0.9691 | 0.9783 | 0.9722 | **0.9870** | 0.7307 |
| F1 | 0.2832 | 0.3235 | 0.2773 | 0.2663 | 0.2905 | 0.2024 | **0.4400** |
| ROC-AUC | 0.8262 | 0.6021 | 0.8045 | 0.8260 | **0.8263** | 0.8262 | 0.7886 |
| PR-AUC | 0.4466 | 0.2053 | 0.4025 | **0.4483** | 0.4417 | 0.4479 | 0.3641 |
| Brier score | 0.1033 | 0.2134 | 0.1076 | **0.1031** | 0.1035 | N/A | 0.2523 |

## Interpretation

Gaussian Naive Bayes behaves very differently from the other primary classifiers.

At threshold 0.5 it has:

- **high recall (~70.8%)**;
- much lower precision (~31.9%);
- much lower specificity (~73.1%);
- substantially lower probability discrimination than LR/GB/XGB/SVM;
- poor Brier score (~0.252), indicating weak probability accuracy/calibration.

The high recall is therefore achieved by predicting many more respondents as positive:

```text
False positives = 15,658
True positives  = 7,340
```

This explains why its F1 score is numerically high despite weaker ROC-AUC and PR-AUC.

The result illustrates why no single threshold-dependent metric should be used alone to judge model quality in an imbalanced classification problem.

## Literature context

Xie et al. (2019) reported Gaussian Naive Bayes on BRFSS 2014:

```text
Accuracy     0.7756
Sensitivity  0.4876
Specificity  0.8256
AUC          0.7598
```

Their model was trained after SMOTE balancing and used a different cohort, predictor set, missing-data strategy, and BRFSS wave. The values are therefore contextual only.

## KNN decision

KNN was considered because P03 includes it. It was not included in the primary benchmark because P03's Tennessee sample contained 5,634 adults, whereas our training reference set contains 274,031 respondents.

Exact KNN on the full national cohort would require a very large pairwise-distance workload for each CV fold and the held-out test set. A KNN experiment would therefore require either a prespecified subsample or approximate-neighbor method, making it no longer directly comparable to the full-cohort seven-model benchmark.

## Freeze decision

Model 07 is frozen exactly as verified.

No post-test change is allowed to:
- class priors;
- variance smoothing;
- threshold;
- dense conversion;
- preprocessing;
- feature set;
- resampling.

This completes the **seven-model primary benchmark**.
