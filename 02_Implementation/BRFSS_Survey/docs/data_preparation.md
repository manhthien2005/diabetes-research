# Part II — Data Preparation

**Status:** implemented and verified on Kaggle.  
**Primary cohort:** 342,539 respondents.  
**Primary predictors:** 20 frozen variables from Part I.

## Objective

Part II converts the raw BRFSS 2025 responses into a leakage-safe modeling design shared by all algorithms in Part III.

The key rule is:

> The final test set must not influence imputation, encoding, scaling, model selection, or hyperparameter tuning.

## 1. Binary target

Primary target:

```text
DIABETE4 = 1 -> Diabetes (1)
DIABETE4 = 3 -> No diabetes (0)

2 -> excluded
4 -> excluded
7 -> excluded
9 -> excluded
missing -> excluded
```

Verified cohort:

| Group | N | % |
|---|---:|---:|
| Diabetes | 51,827 | 15.13% |
| No diabetes | 290,712 | 84.87% |
| Total | **342,539** | 100% |

The reported 15.13% is the **unweighted sample proportion in the modeling cohort**, not a population prevalence estimate.

## 2. Predictor recoding

The 20 frozen predictors are decoded according to the CDC BRFSS 2025 response structure.

Examples:

- `_AGEG5YR`: codes 1–13 retained; code 14 -> missing.
- `_EDUCAG`: codes 1–4 retained; code 9 -> missing.
- `_INCOMG1`: codes 1–7 retained; code 9 -> missing.
- `_BMI5`: divide by 100 to obtain BMI.
- `GENHLTH`: 1–5 retained; 7/9 -> missing.
- `PHYSHLTH`, `MENTHLTH`: 88 -> 0 days; 77/99 -> missing.
- `SLEPTIM1`: 1–24 hours retained; 77/99 -> missing.
- calculated binary indicators such as `_TOTINDA`, `_RFSMOK3`, `_RFHYPE6`, and `_RFCHOL3`: code 9 -> missing.
- raw yes/no chronic-condition fields: 7/9 -> missing.

## 3. Analytical missingness in the final cohort

Missingness is recomputed **after target filtering and special-code decoding**.

| Variable | Missing % |
|---|---:|
| `_INCOMG1` | 19.88% |
| `_RFCHOL3` | 12.66% |
| `_BMI5` | 9.10% |
| `SLEPTIM1` | 7.65% |
| `_RFSMOK3` | 5.80% |
| `DIFFWALK` | 4.48% |
| `_RACEGR3` | 2.31% |
| `PHYSHLTH` | 2.28% |
| `EMPLOY1` | 1.97% |
| `_AGEG5YR` | 1.86% |
| `MENTHLTH` | 1.77% |
| `_RFHYPE6` | 1.15% |
| `_MICHD` | 1.05% |
| `PERSDOC3` | 0.97% |
| `_EDUCAG` | 0.58% |
| `CHCKDNY2` | 0.35% |
| `CVDSTRK3` | 0.29% |
| `_TOTINDA` | 0.26% |
| `GENHLTH` | 0.25% |
| `_SEX` | 0.00% |

## 4. Complete-case comparison

If every respondent with any missing value across the 20 predictors were removed:

```text
Primary cohort             342,539
Complete cases             209,145
Retained                    61.06%
Rows lost                  133,394
Rows lost                   38.94%
```

This is a substantial loss of data.

Therefore, complete-case deletion is **not** the primary preprocessing strategy.

## 5. Primary missing-data strategy

### Categorical predictors

Missing responses are represented by an explicit missing category:

```text
missing -> -1 sentinel -> one-hot encoded
```

This avoids assigning a respondent with unknown/refused income to the most common income group.

### Continuous predictors

```text
_BMI5
PHYSHLTH
MENTHLTH
SLEPTIM1
```

are median-imputed.

The median is estimated **only from training data**.

### Scaling

Continuous variables are standardized with `StandardScaler`, fitted only on the training data.

### Encoding

Categorical variables are one-hot encoded with:

```text
handle_unknown = "ignore"
```

This prevents an unseen test category from breaking prediction.

## 6. Train/test split

Primary split:

```text
test_size      = 0.20
random_state   = 42
stratify       = target
```

Verified split:

| Split | N | Diabetes | No diabetes | Diabetes % |
|---|---:|---:|---:|---:|
| Full | 342,539 | 51,827 | 290,712 | 15.1302% |
| Train | **274,031** | 41,462 | 232,569 | 15.1304% |
| Test | **68,508** | 10,365 | 58,143 | 15.1296% |

The class proportion is effectively identical across the split because stratification is used.

## 7. Transformed feature matrix

The original 20 variables become **82 transformed columns** after one-hot encoding and continuous processing.

Verified dimensions:

```text
Raw predictors                  20
Transformed predictors          82
Training rows              274,031
Test rows                   68,508
```

The transformed matrices have the same column structure because the transformer is fitted on training data and reused for test data.

## 8. Five-fold cross-validation

Model comparison will use:

```python
StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42,
)
```

on the **training set only**.

Verified validation-fold sizes are approximately 54,806–54,807 respondents, with diabetes prevalence remaining approximately 15.13% in every fold.

The preprocessing transformer must later live **inside each model pipeline**, so imputation, one-hot encoding, and scaling are refitted independently inside each CV fold.

## 9. Class imbalance

The primary benchmark uses the natural class distribution.

No SMOTE, undersampling, or synthetic augmentation is applied in Part II.

If an imbalance experiment is added later:

> resampling must occur only inside training/CV folds, never before the train/test split.

This follows the leakage-safe approach used by relevant BRFSS diabetes literature.

## 10. Frozen Part II design

The following decisions are now frozen for the primary benchmark:

| Component | Decision |
|---|---|
| Target | `DIABETE4=1` vs `DIABETE4=3` |
| Raw predictors | 20 |
| Categorical missing | Explicit missing category |
| Continuous missing | Median imputation |
| Categorical encoding | One-hot |
| Continuous scaling | StandardScaler |
| Holdout | 80/20 stratified |
| Random seed | 42 |
| CV | Stratified 5-fold on train |
| Primary resampling | None |
| Test usage | Final evaluation only |

## 11. What Part II does not do

No classifier has been fitted yet.

Part II only defines the common data-processing framework. Part III will place this preprocessing logic inside each model pipeline and compare algorithms under the same train/test/CV protocol.
