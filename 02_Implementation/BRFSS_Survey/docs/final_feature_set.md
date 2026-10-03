# Frozen Predictor Set — BRFSS 2025 Diabetes Classification

**Status:** primary predictor set frozen for the first modeling pipeline.  
**Target:** binary diagnosed-diabetes status from `DIABETE4=1` versus `DIABETE4=3`.  
**Number of predictors:** **20**.

This set was not chosen from correlation alone. A predictor had to survive five screens:

1. support from prior BRFSS/diabetes literature;
2. acceptable analytical coverage after recoding BRFSS non-response values;
3. no target leakage;
4. limited redundancy with other selected predictors;
5. contribution to interpretable domain coverage.

## Final 20 predictors

| Domain | Variable | Analytical missing | Literature basis | Why selected |
|---|---|---:|---|---|
| Demographic | `_AGEG5YR` | 1.88% | P01/P02/P03/P06 | Age |
| Demographic | `_SEX` | 0.00% | P01/P02/P03/P06 | Sex |
| Demographic | `_RACEGR3` | 2.34% | P02/P03 | Population demographic context |
| Socioeconomic | `_EDUCAG` | 0.60% | P01/P02/P03/P06 | Education |
| Socioeconomic | `_INCOMG1` | 19.95% | P01/P02/P03/P06 | Income |
| Socioeconomic | `EMPLOY1` | 1.98% | P02/P03 | Employment status |
| Anthropometric | `_BMI5` | 9.14% | P02/P03/P06/P07 | BMI |
| General health | `GENHLTH` | 0.27% | P01/P02/P03/P06 | Self-rated health |
| General health | `PHYSHLTH` | 2.35% | P02/P03/P06 | Physical unhealthy days |
| Mental health | `MENTHLTH` | 1.82% | P02/P03/P06 | Mental unhealthy days |
| Lifestyle | `_TOTINDA` | 0.27% | P01/P02/P03/P06 | Physical activity |
| Lifestyle | `_RFSMOK3` | 5.80% | P01/P02/P03/P06 | Smoking |
| Lifestyle | `SLEPTIM1` | 7.66% | P03 | Sleep duration |
| Cardiometabolic | `_RFHYPE6` | 1.19% | P02/P03/P06/P07 | Hypertension |
| Cardiometabolic | `_RFCHOL3` | 12.59% | P02/P03/P06/P07 | High cholesterol |
| Comorbidity | `_MICHD` | 1.13% | P01/P02/P03 | Coronary heart disease / MI |
| Comorbidity | `CVDSTRK3` | 0.34% | P02/P03/P06 | Stroke |
| Comorbidity | `CHCKDNY2` | 0.42% | P01/P02/P03 | Kidney disease |
| Functional health | `DIFFWALK` | 4.49% | P02/P06/P07 | Walking difficulty |
| Healthcare access | `PERSDOC3` | 0.98% | P02/P03 | Personal healthcare provider |

## Why 20 predictors

The goal is not to maximize the number of available BRFSS fields. The goal is to construct a compact, reproducible predictor set that covers the major domains repeatedly used in prior work:

```text
Demographics
Socioeconomic context
Anthropometrics
General / mental health
Lifestyle
Cardiometabolic health
Major comorbidities
Functional health
Healthcare access
```

Twenty predictors are sufficient to cover those domains while remaining interpretable for a comparative ML assignment.

## Deliberate redundancy exclusions

### `_BMI5CAT`
Not selected because the primary set already contains continuous `_BMI5`. Including both would encode the same construct twice.

### `_RFHLTH`
Not selected because it is a calculated summary of `GENHLTH`. The original 5-level self-rated-health measure retains more information.

### Alcohol variables
`DRNKANY6` and `_RFBING6` remain valid sensitivity candidates, but neither is necessary for the primary 20-feature set. Their analytical missingness is approximately 7.54% and 8.25%, and the alcohol–diabetes relationship is less straightforward to interpret than the activity, smoking and sleep domains already retained.

### Healthcare-access variables
`_HLTHPL2`, `MEDCOST1` and `CHECKUP1` are not invalid. They are excluded to prevent the access/use domain from dominating the feature set. `PERSDOC3` is retained as a single interpretable representative.

### Secondary comorbidities
`ASTHMA3`, `ADDEPEV3` and `HAVARTH4` have good coverage, but:
- asthma has weaker direct diabetes relevance than cardiovascular/kidney conditions;
- depressive-disorder history overlaps the broader `MENTHLTH` construct;
- arthritis can overlap strongly with age and functional limitation, for which `DIFFWALK` is already retained.

## Leakage exclusions are absolute

The following are prohibited from the predictor matrix:

```text
DIABAGE4
INSULIN1
CHKHEMO3
EYEEXAM1
DIABEYE1
DIABEDU1
```

Their exclusion is based on outcome leakage, not merely missingness.

## Important interpretation note for race/ethnicity

`_RACEGR3` is retained as a population-demographic covariate because raw-BRFSS diabetes studies use race/ethnicity and because it may capture disparities in observed diabetes prevalence.

It must **not** be interpreted as evidence of a biological causal effect. Any association can reflect social, environmental, healthcare-access and structural differences not fully represented by the remaining predictors.

A later sensitivity analysis may compare performance with and without `_RACEGR3`.

## Missing-data implication

The selected set intentionally retains `_INCOMG1` despite ~19.95% analytical missingness because:
- it has strong and repeated literature support;
- socioeconomic status is a major domain of interest;
- dropping it solely on the basis of missingness would materially narrow the study.

This means the preprocessing stage must compare a documented missing-data strategy rather than silently complete-case deleting every selected predictor.

## Frozen primary feature list

```python
PRIMARY_FEATURES = [
    "_AGEG5YR",
    "_SEX",
    "_RACEGR3",
    "_EDUCAG",
    "_INCOMG1",
    "EMPLOY1",
    "_BMI5",
    "GENHLTH",
    "PHYSHLTH",
    "MENTHLTH",
    "_TOTINDA",
    "_RFSMOK3",
    "SLEPTIM1",
    "_RFHYPE6",
    "_RFCHOL3",
    "_MICHD",
    "CVDSTRK3",
    "CHCKDNY2",
    "DIFFWALK",
    "PERSDOC3",
]
```

## What is frozen — and what is not

Frozen now:
- primary target definition;
- primary 20 predictor names;
- leakage exclusions.

Not frozen yet:
- imputation strategy;
- categorical encoding;
- scaling;
- class-imbalance treatment;
- model hyperparameters;
- train/test split.

Those choices belong to the preprocessing/modeling phase and must be fitted using training data only.
