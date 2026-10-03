# Model 06 — Linear Support Vector Machine

## Role

Large-sample maximum-margin linear classifier for the BRFSS 2025 diabetes-status benchmark.

## Literature provenance

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
DOI: `10.5888/pcd16.190109`

This paper directly evaluated **linear, RBF, and polynomial SVMs** on BRFSS 2014. Among their three SVM variants, the linear SVM had the highest AUC.

### P03 — Muhammad et al. (2025)
DOI: `10.1177/21501319251400546`

Included Support Vector Machine among seven BRFSS 2023 diabetes classifiers under stratified 5-fold CV.

### Architecture — Cortes & Vapnik (1995)
*Support-Vector Networks*, Machine Learning 20:273–297.  
DOI: `10.1007/BF00994018`.

This is the foundational soft-margin support-vector classification reference.

## Frozen architecture

```python
LinearSVC(
    penalty="l2",
    loss="squared_hinge",
    dual="auto",
    tol=1e-4,
    C=1.0,
    fit_intercept=True,
    class_weight=None,
    random_state=42,
    max_iter=10000,
)
```

## Why linear rather than RBF

The frozen transformed training set contains approximately 274k respondents and a sparse one-hot feature matrix.

Linear SVM has:
- direct BRFSS precedent in P02;
- a simpler, reproducible large-sample architecture;
- much better computational scaling than full kernel SVC for this cohort.

RBF and polynomial kernels remain possible sensitivity experiments but are not part of Model 06.

## Metric note

`LinearSVC` outputs signed decision margins rather than calibrated probabilities.

Therefore:
- class metrics use the zero-margin decision boundary;
- ROC-AUC and PR-AUC use `decision_function`;
- Brier score is **not applicable** to this uncalibrated model.

Probability calibration would materially change the model and must be versioned separately.

## Provenance classification

| Decision | Provenance |
|---|---|
| SVM model family | P02/P03 + Cortes & Vapnik |
| Linear SVM | Directly supported by P02 |
| Maximum-margin architecture | Cortes & Vapnik (1995) |
| `LinearSVC` implementation | Study-specific scalable implementation |
| L2 + squared hinge | Study-specific fixed sklearn baseline |
| `C=1.0` | Study-specific fixed baseline |
| `dual="auto"` | Study-specific computational choice |
| No class weighting | Frozen primary protocol |
| No SMOTE | Frozen primary protocol |
| Decision threshold = 0 | Native Linear SVM boundary |
| Probability calibration | None |

## Freeze rule

Once verified, no post-test adjustment to `C`, loss, class weighting, calibration, decision threshold, preprocessing, or feature set is permitted.
