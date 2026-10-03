# Model 07 — Gaussian Naive Bayes

## Role

Probabilistic conditional-independence baseline for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
DOI: `10.5888/pcd16.190109`

Directly evaluated Gaussian Naive Bayes on BRFSS 2014 together with SVM, Decision Tree, Logistic Regression, Random Forest, and Neural Network.

### Architecture — Friedman, Geiger, & Goldszmidt (1997)
*Bayesian Network Classifiers*, *Machine Learning* 29:131–163.  
DOI: `10.1023/A:1007465528199`.

This paper discusses the Naive Bayes classifier and its conditional-independence assumptions within the broader Bayesian-network classifier framework.

## Frozen architecture

```python
GaussianNB(
    priors=None,
    var_smoothing=1e-9,
)
```

The frozen Part II preprocessing is preserved. Because GaussianNB requires dense arrays, a representation-only sparse-to-dense conversion is inserted after preprocessing.

## Provenance classification

| Decision | Provenance |
|---|---|
| Gaussian Naive Bayes family | Directly supported by P02 |
| Naive Bayes conditional independence | Friedman et al. (1997) |
| empirical class priors | Study-specific sklearn baseline |
| `var_smoothing=1e-9` | Study-specific default-style choice |
| sparse-to-dense adapter | Computational compatibility only |
| no SMOTE | Frozen primary protocol |
| threshold 0.5 | Fixed probability threshold |
| split/CV/preprocessing | Frozen Part II protocol |

## Important assumption caveat

Many transformed BRFSS categorical indicators are binary one-hot columns rather than naturally Gaussian variables.

Therefore Model 07 is intentionally a **simple probabilistic benchmark**, not a claim that every transformed feature is well described by a Gaussian distribution.

## Why KNN is not in the primary seven-model benchmark

P03 used KNN on a Tennessee BRFSS sample of 5,634 adults. Exact nearest-neighbor prediction scales poorly when the reference set contains hundreds of thousands of respondents.

Our training set contains 274,031 respondents. A full five-fold exact KNN benchmark would require an extremely large number of pairwise distance calculations and would be a poor computational match for the national BRFSS cohort.

KNN remains a possible secondary experiment on a prespecified subsample, but such a result would not be directly comparable to the full-cohort primary models.

## Freeze rule

Once verified, no post-test change is permitted to class priors, variance smoothing, threshold, preprocessing, or feature set.
