> **Current status, 2026-10-05:** MINOR REVISION FOR STATED SCOPE, per [FINAL_CONSENSUS.md](FINAL_CONSENSUS.md). This is a scientific brief, not a submission-ready manuscript. The current user priority is a Vietnamese supervisor report: [BAO_CAO_GVHD_VI.md](BAO_CAO_GVHD_VI.md). No journal has been selected.

> **Historical audit (2026-10-04):** `ASTRA_FINAL_AUDIT_VI.md` preserves the earlier assessment. Its verdict and score are superseded by the 2026-10-05 consensus; numerical evidence and disclosed limitations remain available for inspection.

# Final Scientific Brief — BRFSS 2025 Diabetes Status Classification

## Title

**Development and Internal Evaluation of Seven Fixed Classifier Configurations for Self-Reported Diagnosed Diabetes Status in BRFSS 2025**

## Structured abstract

### Background
BRFSS provides a large, recent public-health survey containing self-reported diagnosed diabetes status and demographic, socioeconomic, behavioral, healthcare-access, and health variables. Published BRFSS diabetes studies use heterogeneous cohorts, outcome definitions, resampling strategies, feature selection, and tuning, making direct numerical reproduction inappropriate.

### Objective
To compare seven fixed machine-learning classifier configurations under one shared pipeline with fold-isolated learned preprocessing for cross-sectional classification of self-reported diagnosed diabetes status in BRFSS 2025.

### Data and participants
The CDC BRFSS 2025 public-use file contains 356,158 records. The primary binary cohort retained 342,539 respondents with `DIABETE4=1` (diabetes) or `DIABETE4=3` (no diabetes), including 51,827 positive respondents (15.13% of the unweighted analytical sample).

### Predictors
Twenty predictors, informed by prior variable domains and study-specific choices, were frozen before model fitting after full-file coverage screening. Diabetes-specific diagnosis/treatment/care variables were excluded as direct leakage. Concurrent comorbidity variables were retained only for status classification and are not interpreted causally or prospectively.

### Methods
Data were split 80/20 using stratification and seed 42 (274,031 development; 68,508 held-out internal test). BRFSS non-response codes were converted to missing. Categorical missingness was represented explicitly and one-hot encoded; four continuous predictors were median-imputed and standardized. Learned preprocessing was fitted only in training data and inside cross-validation folds. Seven fixed configurations were evaluated: Logistic Regression, Decision Tree, Random Forest, Gradient Boosting, XGBoost, Linear SVM, and Gaussian Naive Bayes. The primary study used the natural class distribution with no SMOTE or class weighting.

Performance included ROC-AUC, Average Precision (AP), Balanced Accuracy, Precision, Recall, Specificity, F1, and Brier score for probability-producing models. Logistic Regression was the transparent reference for paired bootstrap contrasts. Exact McNemar tests across all 21 pairs used Holm family-wise correction.

### Results
Held-out ROC-AUC was 0.8262 (95% conditional percentile interval 0.8219–0.8296; 200 bootstrap replicates) for Logistic Regression, 0.8260 for Gradient Boosting, 0.8263 for XGBoost, and 0.8262 for Linear SVM. Paired ROC-AUC intervals did not clearly distinguish Logistic Regression from any of these three leading challengers. Gradient Boosting had the lowest Brier score (0.1031) by a small numerical margin. Gaussian Naive Bayes produced the highest recall (0.7082), Balanced Accuracy (0.7194), and F1 (0.4400) at its default threshold but substantially lower precision (0.3192), ROC-AUC (0.7886), AP (0.3641), and greater overall probability error (Brier 0.2523); calibration curves and slope diagnostics also showed poor calibration. Decision Tree showed severe overfitting (near-perfect training performance vs test ROC-AUC 0.6021). Random Forest improved markedly over the single tree but remained below the leading models on discrimination.

A 5,000-replicate paired robustness analysis using the same frozen prediction vectors preserved the conclusion that LR/GB/XGBoost/Linear-SVM ROC-AUC differences were not clearly separated from zero. The LR–XGBoost AP contrast was small and metric-specific and is not interpreted as universal superiority.

The audit independently reproduced all original 5,000-replicate interval endpoints. The LR–XGBoost AP difference was 0.00492 (unadjusted 95% interval 0.00017–0.00965). Three additional 5,000-replicate streams gave lower limits of 0.00005–0.00008; six-contrast Bonferroni percentile intervals included zero. These exploratory diagnostics do not establish multiplicity-controlled superiority.

### Conclusions
Under a common frozen BRFSS 2025 pipeline, more complex models did not demonstrate a clear ROC-AUC advantage over Logistic Regression. Model rankings depended strongly on the metric and decision boundary. The study supports a transparent trade-off interpretation rather than a single universal winner.

### Scope
These findings are limited to **internal, unweighted, cross-sectional classification** in the analyzed BRFSS 2025 sample. They do not establish prospective risk prediction, population-representative performance, external transportability, fairness, causal effects, or clinical net benefit.

## Design and uncertainty — audit 2026-10-04, adjudication 2026-10-05

Git records show LR results (`3e557b2`) before DT implementation (`20b29c9`), and DT results (`0b7cdfc`) before RF implementation (`c68cda0`). The RF rationale explicitly cites the DT test AUC. All documented learning parameters for the seven final configurations match executed code; XGBoost additionally sets verbosity=0 for logging; no per-model hyperparameter/threshold tuning was found. However, joint prespecification before first test exposure is **not established**. LR was already described as the transparent baseline before its results (implementation `03806f3` before results `3e557b2`); prospective specification of the complete contrast family is not established. Sequential implementation and test-informed rationale do not by themselves demonstrate adaptive model-selection contamination. A01 is MINOR for the stated descriptive/exploratory scope.

Predictor coverage and missingness were inspected on the full file before splitting (`c0d2431` before `79c28c9`): pre-split covariate-coverage inspection. No supervised label-based or model-performance selector was found; learned imputation/encoding/scaling remain isolated inside training/CV folds. The prior train-only counterfactual found all 31 non-leakage candidates below the referenced 20% missingness threshold in both inspections. Holding documented qualitative domain/redundancy/leakage decisions constant retained the same 20 predictors; missingness alone does not specify exactly 20. Practical feature-set impact was not demonstrated, and A02 is MINOR. This counterfactual does not prove that all possible selection bias is absent.

Class-stratified bootstrap intervals condition on frozen fitted models, observed class counts and this internal respondent sample. They omit training variation, alternate splits, feature-design decisions and complex-survey design uncertainty. Holm correction applies to the 21 McNemar tests only, not to every bootstrap contrast. The six top-four ROC-AUC/AP contrasts are exploratory and unadjusted unless explicitly labelled otherwise. Absence of a detected difference is not equivalence.

Raw XPT NAMESTR declares 283 unique variables; pandas preserves all names in order; the official variable layout also lists 283. The downloadable codebook has 282 named entries (omitting `ICFQSTVR`). The CDC landing page's 284 is inconsistent with these sources; no parser column loss was found. There are no duplicate full rows or duplicate `_STATE`+`SEQNO` identifiers, and no such identifier overlap across train/test. Identical coarse predictor patterns are not evidence of duplicate persons.

The unchanged 20 predictors retain temporal ambiguity; `_RFCHOL3` missingness can include absent cholesterol measurement and is not assumed missing at random. An explicit missing category preserves this information but does not correct diagnosis/access ascertainment bias. The outcome does not distinguish diabetes types, even though the public file has additional diabetes-module variables.

## Contribution and reporting status

The contribution is a transparent common-pipeline benchmark and reproducible audit, not a new algorithm or demonstrated clinical benefit. Trained model objects were not preserved; configurations permit retraining, not direct reuse of fitted models. Author declarations and a target-journal manuscript remain required.

## Core defense sentence

> The strongest defensible result is not that one algorithm “wins,” but that a simple Logistic Regression baseline has numerically close internal ranking discrimination as the leading GB/XGBoost/Linear-SVM configurations under this frozen pipeline, while threshold behavior and calibration differ materially across models.

Interview dates independently recovered from `IDATE`: 5 January 2025–16 March 2026, in both raw and eligible cohorts, with no unparseable dates. BRFSS 2025 identifies the annual survey release, not an exclusively 2025 interview calendar. Evidence: `qc/astra_interview_dates.json`.
