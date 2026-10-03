# Model 03 Results — Random Forest

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-data-exploration`  
**Verified Kaggle kernel version:** 16  
**Kernel push workflow:** `37102874542`  
**Completion/read-back workflow:** `37104369628`  
**Model role:** bagged tree ensemble

## Frozen architecture

```python
RandomForestClassifier(
    n_estimators=100,
    criterion="gini",
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features="sqrt",
    bootstrap=True,
    class_weight=None,
    ccp_alpha=0.0,
    random_state=42,
    n_jobs=-1,
)
```

Threshold: `0.5`  
Resampling: none  
Preprocessing: frozen Part II pipeline  
CV: Stratified 5-fold on training only

## Literature provenance

- P02 — Xie et al. (2019), Preventing Chronic Disease / CDC. DOI: `10.5888/pcd16.190109`.
- P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health. DOI: `10.1177/21501319251400546`.

The Random Forest family and ensemble-tree rationale are literature-grounded. The exact 100-tree sklearn configuration is a study-specific fixed baseline.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.8516 | 0.8510–0.8522 |
| Precision | 0.5301 | 0.5233–0.5370 |
| Recall / Sensitivity | 0.1696 | 0.1683–0.1709 |
| Specificity | 0.9732 | 0.9724–0.9740 |
| F1 | 0.2570 | 0.2554–0.2586 |
| ROC-AUC | 0.8020 | 0.7998–0.8042 |
| PR-AUC | 0.4037 | 0.4015–0.4058 |

## Forest complexity and training fit

The fitted 100-tree forest produced approximately:

```text
Mean tree depth         55.03
Median tree depth       55
Maximum tree depth      64
Mean leaves per tree    50,462.17
Median leaves per tree  50,496.5
Maximum leaves          50,986

Training accuracy       0.99967
Training ROC-AUC        0.999998
```

Individual component trees remain extremely deep and flexible. Unlike Model 02, however, prediction is averaged across 100 randomized bootstrap trees.

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.8510** | 0.8495–0.8527 |
| Precision | **0.5213** | 0.5072–0.5367 |
| Recall / Sensitivity | **0.1889** | 0.1803–0.1957 |
| Specificity | **0.9691** | 0.9675–0.9706 |
| F1 | **0.2773** | 0.2660–0.2858 |
| ROC-AUC | **0.8045** | 0.8001–0.8085 |
| PR-AUC | **0.4025** | 0.3943–0.4103 |
| Brier score | **0.1076** | 0.1068–0.1085 |

Bootstrap: 200 stratified replicates, seed `20251005`.

## Confusion matrix at threshold 0.5

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       56,345       1,798
True Diabetes           8,407       1,958
```

Derived:
- True negatives: 56,345
- False positives: 1,798
- False negatives: 8,407
- True positives: 1,958

## Within-study comparison

All three models below use the same cohort, predictors, split, and preprocessing.

| Metric | Logistic Regression | Decision Tree | Random Forest |
|---|---:|---:|---:|
| Accuracy | **0.8558** | 0.7862 | 0.8510 |
| Precision | **0.5715** | 0.3102 | 0.5213 |
| Recall | 0.1882 | **0.3380** | 0.1889 |
| Specificity | **0.9748** | 0.8661 | 0.9691 |
| F1 | 0.2832 | **0.3235** | 0.2773 |
| ROC-AUC | **0.8262** | 0.6021 | 0.8045 |
| PR-AUC | **0.4466** | 0.2053 | 0.4025 |
| Brier score | **0.1033** | 0.2134 | 0.1076 |

## Interpretation

Random Forest substantially repairs the generalization failure of the single unrestricted Decision Tree:

- test ROC-AUC rises from ~0.602 to ~0.804;
- PR-AUC rises from ~0.205 to ~0.402;
- specificity rises from ~0.866 to ~0.969;
- Brier score improves from ~0.213 to ~0.108.

This supports the expected architectural effect of ensemble averaging: the component trees remain highly flexible, but aggregating many randomized trees produces much more stable out-of-sample predictions.

At the fixed 0.5 threshold, Random Forest still has low recall (~18.9%). It does not solve the class-threshold problem by itself.

Logistic Regression remains stronger than this untuned Random Forest on ROC-AUC, PR-AUC, accuracy, precision, specificity, and Brier score, while recall is essentially similar.

No parameter or threshold is changed in response to these results.

## Literature context

Xie et al. (2019) reported, for their BRFSS-2014 Random Forest trained on SMOTE-balanced training data:

- Accuracy: 0.7927
- Sensitivity: 0.5029
- Specificity: 0.8431
- AUC: 0.7608

Muhammad et al. (2025) reported Random Forest accuracy of 0.813 and AUROC of 0.775 in their Tennessee BRFSS-2023 experiment.

These are contextual references, not direct performance targets. Their cohort, target definition, resampling, predictors, and preprocessing differ materially from this study.

## Freeze decision

Model 03 is frozen exactly as verified.

No post-test change will be made to:
- number of trees;
- depth;
- feature subsampling;
- class weighting;
- threshold;
- preprocessing;
- feature set;
- resampling.

Any tuned or class-balanced Random Forest must be recorded as a separately versioned experiment.
