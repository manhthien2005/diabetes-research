# Model 01 Results — Logistic Regression

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-data-exploration`  
**Kaggle kernel version:** 13  
**GitHub Actions run:** `37099678206`  
**Model role:** baseline linear classifier

## Frozen architecture

```python
LogisticRegression(
    penalty="l2",
    C=1.0,
    solver="lbfgs",
    max_iter=1000,
    class_weight=None,
)
```

Threshold: `0.5`  
Resampling: none  
Preprocessing: frozen Part II pipeline  
CV: Stratified 5-fold on training only

## Literature provenance

- P02 — Xie et al. (2019), Preventing Chronic Disease / CDC. DOI: `10.5888/pcd16.190109`.
- P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health. DOI: `10.1177/21501319251400546`.
- P01 — Nayem & Biswas (2026), Scientific Reports. DOI: `10.1038/s41598-026-46927-7`.

The model family and baseline role are literature-grounded. The exact sklearn regularization/solver configuration is a study-specific implementation choice.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.8557 | 0.8550–0.8565 |
| Precision | 0.5724 | 0.5640–0.5808 |
| Recall / Sensitivity | 0.1841 | 0.1809–0.1874 |
| Specificity | 0.9755 | 0.9747–0.9763 |
| F1 | 0.2786 | 0.2744–0.2828 |
| ROC-AUC | 0.8227 | 0.8201–0.8253 |
| PR-AUC | 0.4406 | 0.4357–0.4456 |

The fold-to-fold variation is small, indicating stable internal performance under the fixed split/CV design.

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.8558** | 0.8541–0.8574 |
| Precision | **0.5715** | 0.5534–0.5869 |
| Recall / Sensitivity | **0.1882** | 0.1814–0.1952 |
| Specificity | **0.9748** | 0.9735–0.9762 |
| F1 | **0.2832** | 0.2735–0.2923 |
| ROC-AUC | **0.8262** | 0.8219–0.8296 |
| PR-AUC | **0.4466** | 0.4374–0.4542 |
| Brier score | **0.1033** | 0.1025–0.1042 |

Bootstrap: 200 stratified replicates, seed `20251003`.

## Confusion matrix at threshold 0.5

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       56,680       1,463
True Diabetes           8,414       1,951
```

Derived:

- True negatives: 56,680
- False positives: 1,463
- False negatives: 8,414
- True positives: 1,951

## Interpretation

This baseline separates respondents reasonably well in a ranking sense:

- ROC-AUC is approximately **0.826**;
- PR-AUC is approximately **0.447**, well above the ~0.151 positive-class proportion.

However, the fixed 0.5 threshold is conservative:

- specificity is very high (~97.5%);
- sensitivity is low (~18.8%).

Therefore, this model correctly rejects most non-diabetic respondents but identifies only a minority of diabetic respondents at the default threshold.

This is **not** a reason to tune the threshold on the final test set. If threshold optimization is studied later, it must be selected using training/validation data only.

## Comparison with literature

Xie et al. (2019) reported a BRFSS-2014 Logistic Regression test AUC of 0.7932, sensitivity 0.4634, and specificity 0.8666 after training on SMOTE-balanced data.

Our values must **not** be interpreted as a direct improvement or deterioration because the studies differ in:
- BRFSS year;
- target/cohort definition;
- predictor set;
- missing-data treatment;
- resampling;
- train/test protocol.

The comparison is useful only as methodological context.

## Freeze decision

Model 01 is frozen exactly as run.

No post-test modification will be made to:
- `C`;
- solver;
- class weights;
- threshold;
- preprocessing;
- feature set;
- resampling.

Any alternative Logistic Regression experiment must be recorded as a separate sensitivity run rather than overwriting Model 01.
