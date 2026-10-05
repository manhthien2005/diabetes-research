> **Independent audit update (2026-10-04):** current interpretation and remaining limitations are in `03_Final_Result/BRFSS_2025/ASTRA_FINAL_AUDIT_VI.md`. The earlier PASS/score is historical evidence, not a certification.

# Reviewer Handoff — BRFSS 2025 Diabetes Status Benchmark

## Review request

Review this work as if deciding whether a prediction-model manuscript should pass methodological peer review.

Please try to reject it first. Focus on:
- target validity and temporal framing;
- leakage / test-set contamination;
- BRFSS coding and missingness;
- survey-design claims;
- fairness of the seven-model comparison;
- calibration and class imbalance;
- paired statistical inference;
- literature provenance and non-equivalent benchmarks;
- reproducibility;
- TRIPOD+AI / PROBAST+AI gaps;
- whether any claim exceeds the executed evidence.

## Exact study claim

> Development and internal evaluation of seven **fixed classifier configurations** for cross-sectional classification of **self-reported diagnosed diabetes status** in the BRFSS 2025 public-use sample.

The study does **not** claim:
- future diabetes incidence prediction;
- Type 2 diabetes-specific prediction;
- laboratory diagnosis;
- national prevalence estimation;
- external/temporal validation;
- causal effects;
- statistical equivalence among models;
- clinical net benefit;
- fairness/deployment readiness.

## Primary data design

| Item | Frozen value |
|---|---|
| Raw BRFSS records | 356,158 |
| Binary eligible cohort | 342,539 |
| Diabetes-positive | 51,827 (15.13% unweighted) |
| Train | 274,031 |
| Held-out internal test | 68,508 |
| Raw predictors | 20 |
| Transformed columns | 82 |
| Split | 80/20 stratified, seed 42 |
| CV | Stratified 5-fold within train |
| Primary resampling | none |
| Models | LR, DT, RF, GB, XGBoost, Linear SVM, Gaussian NB |

## Target

`DIABETE4=1` → positive  
`DIABETE4=3` → negative  
Exclude `2` pregnancy-only diabetes, `4` prediabetes/borderline, `7/9` and missing.

This is a **status-classification** outcome and does not distinguish Type 1 from Type 2.

## Leakage controls

Direct diabetes-history/treatment/care fields are excluded:
`DIABAGE4`, `INSULIN1`, `CHKHEMO3`, `EYEEXAM1`, `DIABEYE1`, `DIABEDU1`.

Stateful preprocessing is fitted only on training data / inside CV folds.

The held-out test set is not used for hyperparameter or threshold tuning.

## Metric semantic warning

The historical machine field `pr_auc` is produced by scikit-learn `average_precision_score`.

**Interpret it as Average Precision (AP), not trapezoidal PR-curve AUC.**

## Primary held-out result

| Model | Accuracy | Balanced Acc. | Precision | Recall | F1 | ROC-AUC | AP | Brier |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Logistic Regression | .8558 | .5815 | .5715 | .1882 | .2832 | .8262 | .4466 | .1033 |
| Decision Tree | .7862 | .6020 | .3102 | .3380 | .3235 | .6021 | .2053 | .2134 |
| Random Forest | .8510 | .5790 | .5213 | .1889 | .2773 | .8045 | .4025 | .1076 |
| Gradient Boosting | .8564 | .5753 | .5860 | .1723 | .2663 | .8260 | .4483 | .1031 |
| XGBoost | .8548 | .5843 | .5574 | .1964 | .2905 | .8263 | .4417 | .1035 |
| Linear SVM | .8560 | .5539 | .6244 | .1208 | .2024 | .8262 | .4479 | N/A |
| Gaussian NB | .7273 | .7194 | .3192 | .7082 | .4400 | .7886 | .3641 | .2523 |

An always-negative classifier would already achieve ~.8487 accuracy, hence raw accuracy is not a sufficient ranking criterion.

## Main statistical conclusion

LR, GB, XGBoost and Linear SVM have very similar ROC-AUC point estimates (~.826). Paired bootstrap intervals for LR-vs-each-challenger ROC-AUC cross zero.

This means **no clearly detected ROC-AUC difference** in these contrasts. It is **not evidence of equivalence**.

A 5,000-replicate robustness audit on frozen predictions reproduced this ROC-AUC conclusion. LR has a small AP advantage over XGBoost in that sensitivity analysis (~0.0049; 95% percentile interval just above zero), but this is metric-specific and is not promoted to a universal model-win claim.

## Known weaknesses reviewers should consider

1. Same-source random internal holdout only.
2. No external/temporal validation.
3. No frozen subgroup/fairness evaluation.
4. No DCA/clinical-utility analysis because no intended intervention threshold is specified.
5. Cross-sectional self-report outcome.
6. Concurrent comorbidities have uncertain temporal ordering.
7. Unweighted benchmark; no national population-performance claim.
8. Fixed/untuned configurations are not each algorithm family's optimum.
9. Primary notebook bootstrap used 200 replicates; higher-repetition robustness is supplemental.
10. No formal prospective sample-size calculation; the full eligible secondary cohort is used.
11. CDC landing page states 284; the raw XPT descriptors, official variable layout, and pandas all contain 283; source SHA-256 and all required study variables are verified.
12. Ethics/funding/COI/registration/PPI statements require author/institution input before journal submission.

## Authoritative files

- Primary executable: `02_Implementation/BRFSS_Survey/kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb`
- Final audit: `02_Implementation/BRFSS_Survey/docs/STUDY_AUDIT.md`
- Board review: `02_Implementation/BRFSS_Survey/docs/PRE_SUBMISSION_BOARD_REVIEW.md`
- Reporting readiness: `02_Implementation/BRFSS_Survey/docs/REPORTING_READINESS.md`
- Final feature set: `02_Implementation/BRFSS_Survey/docs/final_feature_set.md`
- Literature: `02_Implementation/BRFSS_Survey/docs/literature_review.md`
- Bibliography: `02_Implementation/BRFSS_Survey/docs/references.bib`

Per-model Markdown files under `models/` are historical freeze records. Their numeric results remain provenance artifacts, but current interpretation comes from the authoritative files above.


## Independent design and uncertainty amendment (2026-10-04)

Git records show LR results (`3e557b2`) before DT implementation (`20b29c9`), and DT results (`0b7cdfc`) before RF implementation (`c68cda0`). The RF rationale explicitly cites the DT test AUC. All documented learning parameters match executed code (XGBoost adds logging-only verbosity=0); no per-model hyperparameter/threshold tuning was found. However, joint prespecification before first test exposure is **not established**. LR is the transparent reporting reference, not a verified prospectively registered primary contrast. Read model comparisons as descriptive/exploratory.

Predictor coverage and missingness were screened on the full file before splitting (`c0d2431` before `79c28c9`). This used future test covariate information. No supervised label-based selection code was found, and learned imputation/encoding/scaling remain isolated inside training/CV folds; this does not erase the design-stage exposure. Its optimism cannot be quantified from this already-exposed holdout. A fresh prespecified cohort is needed for confirmatory evaluation.

Class-stratified bootstrap intervals condition on frozen fitted models, observed class counts and this internal respondent sample. They omit training variation, alternate splits, feature-design decisions and complex-survey design uncertainty. Holm correction applies to the 21 McNemar tests only, not to every bootstrap contrast. The six top-four ROC-AUC/AP contrasts are exploratory and unadjusted unless explicitly labelled otherwise. Absence of a detected difference is not equivalence.

Raw XPT NAMESTR declares 283 unique variables; pandas preserves all names in order; the official variable layout also lists 283. The downloadable codebook has 282 named entries (omitting `ICFQSTVR`). The CDC landing page's 284 is inconsistent with these sources; no parser column loss was found. There are no duplicate full rows or duplicate `_STATE`+`SEQNO` identifiers, and no such identifier overlap across train/test. Identical coarse predictor patterns are not evidence of duplicate persons.

The unchanged 20 predictors retain temporal ambiguity; `_RFCHOL3` missingness can include absent cholesterol measurement and is not assumed missing at random. An explicit missing category preserves this information but does not correct diagnosis/access ascertainment bias. The outcome does not distinguish diabetes types, even though the public file has additional diabetes-module variables.
