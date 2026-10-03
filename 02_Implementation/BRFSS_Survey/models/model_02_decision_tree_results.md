# Model 02 Results — Decision Tree

**Status:** VERIFIED / FROZEN  
**Kaggle notebook:** `manhthien2005/brfss-2025-data-exploration`  
**Kaggle kernel version:** 15  
**GitHub Actions run:** `37102035065`  
**Model role:** single-tree nonlinear baseline

## Frozen architecture

```python
DecisionTreeClassifier(
    criterion="gini",
    splitter="best",
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features=None,
    class_weight=None,
    ccp_alpha=0.0,
    random_state=42,
)
```

Threshold: `0.5`  
Resampling: none  
Preprocessing: frozen Part II pipeline  
CV: Stratified 5-fold on training only

## Literature provenance

- P02 — Xie et al. (2019), Preventing Chronic Disease / CDC. DOI: `10.5888/pcd16.190109`.
- P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health. DOI: `10.1177/21501319251400546`.

The Decision Tree model family and tree-based nonlinear role are literature-grounded. The exact unpruned Gini/CART sklearn configuration is a study-specific default-style baseline.

## Training-set cross-validation

Five-fold CV mean and 95% t-interval:

| Metric | Mean | 95% CI |
|---|---:|---:|
| Accuracy | 0.7851 | 0.7831–0.7872 |
| Precision | 0.3061 | 0.3013–0.3109 |
| Recall / Sensitivity | 0.3314 | 0.3261–0.3367 |
| Specificity | 0.8660 | 0.8637–0.8684 |
| F1 | 0.3182 | 0.3136–0.3228 |
| ROC-AUC | 0.5987 | 0.5960–0.6015 |
| PR-AUC | 0.2027 | 0.2004–0.2049 |

## Tree complexity and training fit

The full-tree fit produced:

```text
Maximum depth      58
Leaves             42,880
Nodes              85,759
Training accuracy  0.99969
Training ROC-AUC   0.9999996
```

This extreme difference between near-perfect training fit and substantially weaker CV/test discrimination is strong empirical evidence of overfitting in this unrestricted single tree.

## Untouched internal test set

Test set: **68,508** respondents.

Point estimates and 95% stratified-bootstrap intervals:

| Metric | Point estimate | 95% CI |
|---|---:|---:|
| Accuracy | **0.7862** | 0.7834–0.7888 |
| Precision | **0.3102** | 0.3035–0.3167 |
| Recall / Sensitivity | **0.3380** | 0.3290–0.3471 |
| Specificity | **0.8661** | 0.8636–0.8689 |
| F1 | **0.3235** | 0.3160–0.3311 |
| ROC-AUC | **0.6021** | 0.5974–0.6068 |
| PR-AUC | **0.2053** | 0.2019–0.2090 |
| Brier score | **0.2134** | 0.2108–0.2161 |

Bootstrap: 200 stratified replicates, seed `20251004`.

## Confusion matrix at threshold 0.5

```text
                         Predicted
                    No diabetes   Diabetes
True No diabetes       50,355       7,788
True Diabetes           6,862       3,503
```

Derived:
- True negatives: 50,355
- False positives: 7,788
- False negatives: 6,862
- True positives: 3,503

## Within-study comparison with Model 01

Because Model 01 and Model 02 use the **same BRFSS 2025 cohort, same features, same split, and same preprocessing**, their internal comparison is meaningful.

| Metric | Logistic Regression | Decision Tree |
|---|---:|---:|
| Accuracy | 0.8558 | 0.7862 |
| Precision | 0.5715 | 0.3102 |
| Recall | 0.1882 | 0.3380 |
| Specificity | 0.9748 | 0.8661 |
| F1 | 0.2832 | 0.3235 |
| ROC-AUC | 0.8262 | 0.6021 |
| PR-AUC | 0.4466 | 0.2053 |
| Brier score | 0.1033 | 0.2134 |

At the fixed 0.5 threshold, the Decision Tree identifies more positive cases (higher recall) but generates many more false positives. Its overall probability discrimination and probability accuracy are much weaker than the Logistic Regression baseline.

No threshold or tree parameter is changed in response to this result.

## Literature context

Xie et al. (2019) reported their BRFSS-2014 Decision Tree with accuracy 0.7426, sensitivity 0.5161, specificity 0.7820, and AUC 0.7182 after training on SMOTE-balanced data.

Muhammad et al. (2025) reported Decision Tree accuracy 0.736, precision 0.331, recall 0.439, F1 0.377, AUROC 0.626, and PR-AUC 0.253 after SMOTE-balanced training.

These values are contextual references only. Direct numerical ranking across studies is inappropriate because cohort, target construction, predictors, resampling, preprocessing, and evaluation design differ.

## Freeze decision

Model 02 is frozen exactly as run.

No post-test change will be made to:
- maximum depth;
- minimum samples per split/leaf;
- pruning;
- Gini criterion;
- class weights;
- threshold;
- preprocessing;
- feature set;
- resampling.

A pruned or tuned Decision Tree would require a separately versioned experiment.
