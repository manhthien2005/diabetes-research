# Model 06 Results — Linear Support Vector Machine

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-model-06-linear-svm`  
**Kaggle kernel version:** 1  
**GitHub Actions run:** `37131823872`  
**Artifact ID:** `11277256801`  
**Model role:** large-sample linear maximum-margin classifier

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

Decision boundary: `decision_function = 0`  
Probability calibration: none  
Resampling: none  
Preprocessing: frozen Part II pipeline  
CV: Stratified 5-fold on training only

Verified environment:

```text
Python        3.13.15
pandas        2.3.3
NumPy         2.1.3
scikit-learn  1.6.1
```

The final full-training fit converged in **7 iterations**, well below `max_iter=10000`.

## Literature provenance

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
DOI: `10.5888/pcd16.190109`

The study evaluated linear, RBF, and polynomial SVM variants on BRFSS 2014. Linear SVM had the highest AUC among those three SVM implementations.

### P03 — Muhammad et al. (2025)
DOI: `10.1177/21501319251400546`

Included SVM among seven BRFSS 2023 diabetes classifiers using stratified 5-fold CV.

### Architecture — Cortes & Vapnik (1995)
DOI: `10.1007/BF00994018`

Foundational soft-margin support-vector classification reference.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.8553 | 0.8548–0.8557 |
| Precision | 0.6135 | 0.6038–0.6232 |
| Recall / Sensitivity | 0.1174 | 0.1157–0.1190 |
| Specificity | 0.9868 | 0.9862–0.9874 |
| F1 | 0.1971 | 0.1947–0.1994 |
| ROC-AUC | 0.8221 | 0.8198–0.8244 |
| PR-AUC | 0.4408 | 0.4371–0.4446 |

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.8560** | 0.8549–0.8571 |
| Precision | **0.6244** | 0.6068–0.6419 |
| Recall / Sensitivity | **0.1208** | 0.1144–0.1269 |
| Specificity | **0.9870** | 0.9860–0.9879 |
| F1 | **0.2024** | 0.1929–0.2116 |
| ROC-AUC | **0.8262** | 0.8229–0.8298 |
| PR-AUC | **0.4479** | 0.4402–0.4559 |
| Brier score | **N/A** | uncalibrated decision margins |

Bootstrap: 200 stratified replicates, seed `20251008`.

## Confusion matrix at the native zero-margin boundary

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       57,390         753
True Diabetes           9,113       1,252
```

Derived:
- True negatives: 57,390
- False positives: 753
- False negatives: 9,113
- True positives: 1,252

## Comparison after six frozen models

| Metric | Logistic Regression | Decision Tree | Random Forest | Gradient Boosting | XGBoost | Linear SVM |
|---|---:|---:|---:|---:|---:|---:|
| Accuracy | 0.8558 | 0.7862 | 0.8510 | 0.8564 | 0.8548 | 0.8560 |
| Precision | 0.5715 | 0.3102 | 0.5213 | 0.5860 | 0.5574 | **0.6244** |
| Recall | 0.1882 | **0.3380** | 0.1889 | 0.1723 | 0.1964 | 0.1208 |
| Specificity | 0.9748 | 0.8661 | 0.9691 | 0.9783 | 0.9722 | **0.9870** |
| F1 | 0.2832 | **0.3235** | 0.2773 | 0.2663 | 0.2905 | 0.2024 |
| ROC-AUC | 0.8262 | 0.6021 | 0.8045 | 0.8260 | 0.8263 | 0.8262 |
| PR-AUC | 0.4466 | 0.2053 | 0.4025 | 0.4483 | 0.4417 | 0.4479 |
| Brier score | 0.1033 | 0.2134 | 0.1076 | 0.1031 | 0.1035 | N/A |

## Interpretation

Linear SVM shows almost the same ranking discrimination as Logistic Regression, Gradient Boosting, and XGBoost:

```text
Logistic Regression ROC-AUC  0.82617
Gradient Boosting ROC-AUC    0.82602
XGBoost ROC-AUC              0.82629
Linear SVM ROC-AUC           0.82616
```

Its native zero-margin boundary is substantially more conservative than the other fixed classifiers:

- precision is high (~62.4%);
- specificity is extremely high (~98.7%);
- recall is only ~12.1%.

Thus the linear SVM predicts relatively few respondents as positive, and those positive predictions are comparatively precise, but it misses most diabetic respondents at the native decision boundary.

This is not evidence that the SVM ranking itself is poor: ROC-AUC and PR-AUC remain strong. It is mainly a boundary/calibration issue under the imbalanced natural class distribution.

No decision-threshold adjustment is made using the test set.

## Why Brier score is absent

Brier score requires predicted probabilities.

`LinearSVC` produces signed hyperplane margins rather than calibrated probabilities. Treating those margins as probabilities would be invalid.

A calibrated SVM using Platt/sigmoid or isotonic calibration would be a materially different model and must be evaluated as a separate experiment with calibration fitted only inside training data.

## Literature context

Xie et al. (2019) reported for their BRFSS-2014 **Linear SVM**:

```text
Accuracy     0.8082
Sensitivity  0.4260
Specificity  0.8746
AUC          0.7807
```

Their model was trained on a SMOTE-balanced training sample and evaluated on an imbalanced test sample.

The higher sensitivity in their study is therefore not directly comparable with this natural-distribution Linear SVM. Differences also include BRFSS year, cohort construction, features, preprocessing, and implementation.

## Freeze decision

Model 06 is frozen exactly as verified.

No post-test changes are permitted to:
- `C`;
- loss or penalty;
- class weighting;
- decision boundary;
- probability calibration;
- preprocessing;
- feature set;
- resampling.

RBF SVM, polynomial SVM, calibrated SVM, or class-weighted SVM must be separately versioned experiments.
