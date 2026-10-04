> **Historical stage record.** This file preserves the decision state at that point in the study. Any wording such as “next step,” “not frozen yet,” or a pending phase is superseded by the canonical notebook and `STUDY_AUDIT.md`. Do not use this file alone to infer the current protocol.\n\n# Literature-to-BRFSS 2025 Candidate Variable Mapping

This document converts the literature review into an auditable BRFSS 2025 feature-selection plan. It is **not yet the final model feature set**.

## Evidence sources

The candidate concepts come primarily from the strongest BRFSS diabetes references already screened:

- **P01 — Nayem & Biswas (2026), Scientific Reports:** raw BRFSS 2014–2024; 16 predictors; public R code.
- **P02 — Xie et al. (2019), Preventing Chronic Disease / CDC:** raw BRFSS 2014; 27 literature-grounded variables.
- **P03 — Muhammad et al. (2025):** BRFSS 2023; seven ML models; 5-fold CV; explainability.
- **P06 — Aich et al. (2026), Scientific Reports:** BRFSS-2015-derived 21-indicator dataset; public Python code.
- P07 and related BRFSS-2015 indicator studies are used as supporting evidence.

Official CDC 2025 variable-layout documentation confirms the presence of raw and calculated fields such as `DIABETE4`, `GENHLTH`, `PHYSHLTH`, `MENTHLTH`, `PERSDOC3`, `MEDCOST1`, `CHECKUP1`, `CVDSTRK3`, `CHCKDNY2`, `DIFFWALK`, `_TOTINDA`, `_RFHYPE6`, `_RFCHOL3`, `_MICHD`, `_RACEGR3`, `_SEX`, `_AGEG5YR`, `_BMI5`, `_BMI5CAT`, `_EDUCAG`, `_INCOMG1`, and `_RFSMOK3`.

## Empirical audit on our BRFSS 2025 XPT

The audit was run on the verified 356,158-row XPT file. Missingness below refers to actual SAS missing values in the file, **not yet** to BRFSS response codes such as “don't know” or “refused”. Those special codes will be handled in the next coding audit.

### Strong provisional candidates

| Domain | Variable | Missing | Why it remains |
|---|---|---:|---|
| Demographic | `_AGEG5YR` | 0.00% | Repeated literature support and official calculated age grouping |
| Demographic | `_SEX` | 0.00% | Core demographic context |
| Socioeconomic | `_EDUCAG` | 0.00% | Recurrent social determinant |
| Socioeconomic | `_INCOMG1` | 0.00% | Recurrent social determinant |
| Anthropometric | `_BMI5` | 9.14% | Central diabetes-related health indicator |
| General health | `GENHLTH` | 0.001% | Repeatedly selected in raw BRFSS studies |
| General health | `PHYSHLTH` | 0.001% | Common BRFSS health indicator |
| Lifestyle | `_TOTINDA` | 0.00% | Physical-activity indicator |
| Lifestyle | `_RFSMOK3` | 0.00% | Smoking indicator |
| Cardiometabolic | `_RFHYPE6` | 0.00% | High-blood-pressure indicator |
| Cardiometabolic | `_RFCHOL3` | 11.78% | High-cholesterol indicator |
| Comorbidity | `_MICHD` | 1.13% | Coronary-heart-disease indicator |
| Comorbidity | `CVDSTRK3` | 0.001% | Stroke |
| Comorbidity | `CHCKDNY2` | 0.001% | Kidney disease |

These are the strongest current candidates because they have both literature precedent and reasonable 2025 coverage.

## Variables to evaluate, not automatically include

The following remain candidates but should compete for inclusion based on redundancy, coding quality, interpretability and assignment scope:

- `_RACEGR3`
- `EMPLOY1`
- `MARITAL`
- `MENTHLTH`
- `_HLTHPL2`
- `PERSDOC3`
- `MEDCOST1`
- `CHECKUP1`
- `DRNKANY6`
- `_RFBING6`
- `SLEPTIM1`
- `DIFFWALK`
- `ASTHMA3`
- `ADDEPEV3`
- `HAVARTH4`

Examples of redundancy decisions:
- Prefer `_BMI5` **or** `_BMI5CAT`, not both by default.
- Prefer `GENHLTH` **or** the derived `_RFHLTH`, not both without a reason.
- `DRNKANY6` and `_RFBING6` describe different alcohol constructs but may not both be needed for a compact assignment model.

## Explicit target-leakage exclusions

The audit confirms that all six diabetes-specific variables exist in BRFSS 2025:

| Variable | Missing | Decision | Reason |
|---|---:|---|---|
| `DIABAGE4` | 85.45% | Exclude | Age at diabetes diagnosis directly reveals outcome history |
| `INSULIN1` | 94.02% | Exclude | Treatment downstream of diagnosis |
| `CHKHEMO3` | 94.02% | Exclude | Diabetes-specific HbA1c monitoring |
| `EYEEXAM1` | 94.02% | Exclude | Diabetes-specific eye-care question |
| `DIABEYE1` | 94.02% | Exclude | Diabetes-specific complication question |
| `DIABEDU1` | 94.02% | Exclude | Diabetes self-management education |

These variables must not be allowed into a model whose target is diagnosed diabetes status. Their very high missingness is expected because they are asked conditionally, but the decisive reason for exclusion is **target leakage**, not missingness.

## Important technical note about missingness

The percentages above are only native `NaN` values in the XPT file. BRFSS also encodes non-response using numeric categories such as 7, 9, 77, 99, 777, or 999 depending on the question.

Therefore:

> **Raw XPT missingness is not the same as analytical missingness.**

The next step must decode each proposed feature using the official 2025 codebook and convert don't-know/refused/not-asked responses to analytical missing values before a final missingness threshold is applied.

This distinction is especially important for calculated variables. For example, `_AGEG5YR` has 0% native NaN because code 14 represents don't-know/refused/missing age; treating 14 as a real age group would be incorrect for modeling.

## Current provisional core set

A compact starting set for the assignment is:

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

This is **14 predictors**, not yet the final set.

We should likely add roughly 4–8 variables from healthcare access, mental health, sleep, functional status and employment after the coding audit. That would leave a final set around 18–22 predictors: large enough to cover the literature domains while remaining interpretable and appropriate for the assignment.

## Next gate before final feature selection

For every candidate variable:

1. retrieve official CDC 2025 question/derived-variable definition;
2. list valid response codes;
3. identify don't-know/refused/not-asked codes;
4. define analytical recoding;
5. recompute **analytical** missingness after recoding;
6. evaluate redundancy between raw and calculated representations;
7. freeze the final predictor list.

Only after that gate should we generate the clean ML dataset.
