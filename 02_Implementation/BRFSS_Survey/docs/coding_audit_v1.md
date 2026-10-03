# BRFSS 2025 Coding Audit — Version 1

This audit converts BRFSS response codes into an analysis-safe representation before final feature selection.

## Why this is required

CDC BRFSS does not represent all missing/non-response values as SAS `NaN`. Many variables use explicit numeric codes such as `7`, `9`, `77`, or `99`. Calculated variables can also carry a `9` category for don't know/refused/missing.

Therefore the raw `pandas.isna()` percentage substantially understates missingness for some predictors.

Examples from our verified 2025 data:

| Variable | Native NaN | Analytical missing after special-code handling |
|---|---:|---:|
| `_AGEG5YR` | 0.00% | **1.88%** |
| `_EDUCAG` | 0.00% | **0.60%** |
| `_INCOMG1` | 0.00% | **19.95%** |
| `_RFSMOK3` | 0.00% | **5.80%** |
| `_RFHYPE6` | 0.00% | **1.19%** |
| `_RFCHOL3` | 11.78% | **12.59%** |
| `SLEPTIM1` | 6.39% | **7.66%** |

This changes feature-selection decisions. In particular, income is almost exactly at the <20% missingness criterion used by one of our strongest raw-BRFSS anchor studies.

## Primary target construction

For the primary analysis:

```text
DIABETE4 = 1  ->  Diabetes (1)
DIABETE4 = 3  ->  No diabetes (0)

DIABETE4 = 2  ->  exclude (gestational diabetes)
DIABETE4 = 4  ->  exclude (prediabetes / borderline)
DIABETE4 = 7  ->  exclude (don't know / not sure)
DIABETE4 = 9  ->  exclude (refused)
missing        ->  exclude
```

Observed 2025 counts:

- Diabetes: **51,827**
- No diabetes: **290,712**
- Primary binary cohort: **342,539**
- Excluded from primary target: **13,619**
- Diabetes prevalence within the binary cohort: **15.13%**

This definition is aligned with the conservative raw-BRFSS precedent that distinguishes diagnosed diabetes from both prediabetes and pregnancy-only diabetes. A sensitivity analysis can later test an alternative definition if needed to reproduce a literature anchor.

## Core recoding rules

### Age — `_AGEG5YR`
CDC defines codes 1–13 as age groups from 18–24 through 80+, and code 14 as don't know/refused/missing.

Primary rule:

```text
1..13 -> categorical/ordinal age group
14    -> missing
```

Analytical missingness: **1.88%**.

### Education — `_EDUCAG`
CDC calculated coding:

```text
1 -> Did not graduate high school
2 -> Graduated high school
3 -> Attended college/technical school
4 -> Graduated college/technical school
9 -> DK/not sure/refused/missing
```

Analytical missingness: **0.60%**.

### Income — `_INCOMG1`
CDC calculated coding:

```text
1 -> < $15,000
2 -> $15,000 to < $25,000
3 -> $25,000 to < $35,000
4 -> $35,000 to < $50,000
5 -> $50,000 to < $100,000
6 -> $100,000 to < $200,000
7 -> $200,000+
9 -> DK/not sure/refused/missing
```

Analytical missingness: **19.95%**.

**Decision:** retain provisionally because it has strong literature support, but it requires an explicit missing-data strategy.

### BMI — `_BMI5`
`_BMI5` is CDC's calculated BMI variable. The stored numeric value is scaled by 100.

```text
BMI = _BMI5 / 100
NaN -> missing
```

Analytical missingness: **9.14%**.

The primary set should use `_BMI5` rather than simultaneously including `_BMI5CAT`, unless a later experiment explicitly compares continuous versus categorical BMI.

### General health — `GENHLTH`

```text
1..5 -> valid ordered response
7    -> missing
9    -> missing
NaN  -> missing
```

Analytical missingness: **0.27%**.

### Physical and mental unhealthy days

For both `PHYSHLTH` and `MENTHLTH`, CDC's healthy-days syntax treats:

```text
1..30 -> reported number of unhealthy days
88    -> 0 days
77    -> missing
99    -> missing
NaN   -> missing
```

Analytical missingness:
- `PHYSHLTH`: **2.35%**
- `MENTHLTH`: **1.82%**

### Hypertension — `_RFHYPE6`
CDC 2025 calculated coding:

```text
1 -> No
2 -> Yes
9 -> DK/not sure/refused/missing
```

Analytical missingness: **1.19%**.

### Lifestyle calculated indicators
For `_TOTINDA` and `_RFSMOK3`, code 9 is a non-response/missing category and must not be passed to the model as an ordinary class.

Current analytical missingness:
- `_TOTINDA`: **0.27%**
- `_RFSMOK3`: **5.80%**

### Cholesterol — `_RFCHOL3`
Treat both native `NaN` and code 9 as missing.

Analytical missingness: **12.59%**.

### Sleep — `SLEPTIM1`
This variable illustrates why generic replacement rules are dangerous:

- `7` is a valid value: seven hours of sleep.
- `77` is don't know/not sure.
- `99` is refused.
- native `NaN` is missing/not asked.

Analytical missingness: **7.66%**.

## Leakage exclusions

The following will not enter the predictor matrix under any imputation strategy:

```text
DIABAGE4
INSULIN1
CHKHEMO3
EYEEXAM1
DIABEYE1
DIABEDU1
```

They are downstream of, or conditional on, a known diabetes diagnosis. Excluding them is a design decision to prevent target leakage; their 85–94% missingness is secondary.

## Provisional feature state after coding audit

### Core
```text
_AGEG5YR
_SEX
_EDUCAG
_INCOMG1
_BMI5
GENHLTH
PHYSHLTH
_TOTINDA
_RFSMOK3
_RFHYPE6
_RFCHOL3
_MICHD
CVDSTRK3
CHCKDNY2
```

### Still competing for the final set
```text
_RACEGR3
EMPLOY1
MARITAL
MENTHLTH
_HLTHPL2
PERSDOC3
MEDCOST1
CHECKUP1
DRNKANY6
_RFBING6
SLEPTIM1
DIFFWALK
ASTHMA3
ADDEPEV3
HAVARTH4
```

## Next decision

The next stage is **not yet model training**.

We should now compare the candidate variables on:

1. literature support;
2. analytical missingness;
3. redundancy;
4. interpretability;
5. whether the variable is a core survey item or optional/conditional;
6. whether it materially expands domain coverage.

That comparison should produce the frozen 18–22 predictor set used by every subsequent model.
