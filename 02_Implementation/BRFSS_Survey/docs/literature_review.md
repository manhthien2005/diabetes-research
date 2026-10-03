# Literature Review — BRFSS + Diabetes + Machine Learning

**Project:** BRFSS 2025 Diabetes Classification  
**Purpose:** establish a reproducible, literature-grounded basis for target construction, candidate-variable selection, preprocessing, model benchmarking, class-imbalance handling, and explainability.

## Screening rule

A paper is retained only when it is materially relevant to **BRFSS + diabetes + machine learning/statistical prediction** and satisfies at least one reproducibility condition:

1. public analysis code, preferably with a persistent archive;
2. public data plus sufficiently detailed methods/supplemental material to rebuild the pipeline; or
3. a stable publisher/DOI record with explicit BRFSS variables, target definition, and evaluation protocol.

Recent papers are **not penalized for low citation counts**. For this project, stable DOI/PMID/publisher provenance and reproducibility are more useful than raw citation count.

## Core papers to ground our study

### P01 — Nayem & Biswas (2026), Scientific Reports
**DOI:** 10.1038/s41598-026-46927-7  
**BRFSS:** raw annual files, 2014–2024; final n = 2,498,880; 16 predictors.  
**Code:** https://github.com/NayemMH/DR-Logistic-Regression-BRFSS  
**Archive:** Zenodo DOI 10.5281/zenodo.19231359

Why it matters:
- direct raw-BRFSS precedent;
- explicit variable-selection criteria: epidemiologic/clinical relevance, cross-year availability, <20% missingness per year, and pairwise correlation <0.7;
- explicit DIABETE4 outcome discussion;
- public R code and persistent Zenodo archive.

**Reproducibility audit note:** the published article says prediabetes was classified as non-diabetic, but the current public R script recodes only DIABETE4=1 as Yes and DIABETE4=3 as No, with all other responses becoming NA before complete-case deletion. We must reproduce and reconcile this discrepancy rather than copying either definition blindly.

**Use in our project:** primary anchor for literature-grounded variable selection and raw-BRFSS design.

### P02 — Xie et al. (2019), Preventing Chronic Disease / CDC
**DOI:** 10.5888/pcd16.190109  
**BRFSS:** raw 2014; 464,644 original respondents, 138,146 final, 20,467 type-2-diabetes cases; 27 selected variables.

Why it matters:
- peer-reviewed CDC journal article using a raw annual BRFSS file;
- selects predictors from prior diabetes-risk literature and provides a detailed variable appendix;
- excludes respondents <30, pregnancy-associated diabetes, and prediabetes;
- compares multiple classifiers;
- applies SMOTE only to training data and evaluates on the untouched imbalanced test set.

**Use in our project:** raw-BRFSS target/feature precedent, leakage-safe resampling precedent, and variable dictionary cross-check.

### P03 — Muhammad et al. (2025), Journal of Primary Care & Community Health
**DOI:** 10.1177/21501319251400546  
**BRFSS:** Tennessee 2023; n = 5,634; self-reported diabetes.

Why it matters:
- closest match to the intended class-assignment benchmark;
- seven algorithms: Logistic Regression, SVM, KNN, Decision Tree, Random Forest, Gradient Boosting, XGBoost;
- 80/20 stratified split;
- SMOTE on training data only;
- stratified 5-fold CV inside training data;
- accuracy, precision, recall, balanced accuracy, F1, AUROC and PR-AUC;
- SHAP interpretation;
- detailed methods plus supplemental tables.

**Use in our project:** primary methodological template for model comparison and evaluation.

### P04 — Chowdhury et al. (2024), Healthcare Analytics
**DOI:** 10.1016/j.health.2023.100297

Why it matters:
- directly addresses class imbalance in BRFSS diabetes classification;
- compares SMOTE-N, ENN, SMOTE-Tomek and SMOTE-ENN;
- explicitly emphasizes applying augmentation to training data to avoid leakage;
- public CDC data and open article.

**Use in our project:** reference for whether/when to add a secondary imbalance experiment. It does **not** justify resampling before train/test separation.

### P05 — Li, Peng & Peng (2024), PLOS ONE
**DOI:** 10.1371/journal.pone.0311222  
**BRFSS:** 2021 public mirror; 438,693 raw records, 303 variables; 25 features selected.

Why it matters:
- relatively recent raw-year BRFSS;
- compares multiple resampling techniques;
- uses Logistic Regression, Decision Tree, AdaBoost, LightGBM, XGBoost and ensemble approaches;
- includes GA-XGBoost, stacking and SHAP;
- public input data and a detailed open methods section.

**Audit caution:** the paper contains an apparent record-count inconsistency in its preprocessing description, and some post-resampling metrics are extremely high. We should use it as a method/features reference, not assume its numerical results are a target for our study.

### P06 — Aich et al. (2026), Scientific Reports
**DOI:** 10.1038/s41598-026-41874-9  
**Data:** UCI CDC Diabetes Health Indicators, derived from BRFSS 2015; n = 253,680; 21 features.  
**Code:** https://github.com/agnivibes/copula-feature-selection

Why it matters:
- complete public Python implementation;
- reproducible data loading through `ucimlrepo`;
- compares a copula-based feature selector with Mutual Information, mRMR, ReliefF and L1/Elastic-Net;
- provides statistical/robustness comparisons.

**Important non-equivalence:** its `Diabetes_binary` target defines 1 as **prediabetes or diabetes**, so its reported performance cannot be compared directly with a DIABETE4 diabetes-vs-no-diabetes cohort.

**Use in our project:** reproducible feature-selection reference and evidence for common candidate indicators.

## Established / supporting papers

### P07 — Chang et al. (2022), Healthcare Analytics
**DOI:** 10.1016/j.health.2022.100118

Uses the widely reused BRFSS-2015-derived health-indicator dataset and compares Decision Tree, Random Forest, KNN, Naive Bayes and Logistic Regression. The paper's appendix and settings make the experiment reasonably reconstructable, but no public analysis repository was located. The publisher page currently displays substantial citation uptake, making it useful as an established benchmark rather than our main reproducibility anchor.

### P08 — Majcherek et al. (2025), PLOS ONE
**DOI:** 10.1371/journal.pone.0328655

Uses an analytical sample of 253,680 with >20 features, compares 18 classifiers and provides SHAP plus supporting files. Useful for model breadth and feature-importance discussion.

**Audit caution:** its data-availability statement points to the raw CDC 2015 annual file (>441k records), whereas the analyzed sample is 253,680. That provenance mismatch should be resolved before attempting a numerical reproduction. Reported near-0.99 AUC also warrants independent validation.

### P09 — Chike et al. (2026), Healthcare Analytics
**DOI:** 10.1016/j.health.2026.100454

Uses BRFSS 2016–2022 among adults 18–64 and develops interpretable ML models for diabetes and depression. Useful as recent evidence for behavioral/socioeconomic variables and interpretable population-health modeling, but its dual-outcome objective is less directly aligned with our study.

### P10 — Ullah et al. (2022), Computational Intelligence and Neuroscience
**DOI:** 10.1155/2022/2557795

Uses the 253,680-record BRFSS-2015-derived dataset, a 70/30 split and SMOTE-ENN. It is methodologically reconstructable from the open article but reports roughly 98% performance for KNN after resampling.

**Use with caution:** the result should be audited for split/resampling behavior and is not a performance target for our project.

## What the literature tells us to do

### Target construction
There is no single BRFSS convention:
- Xie et al. exclude prediabetes and pregnancy-associated diabetes.
- Nayem & Biswas state that gestational diabetes is excluded but prediabetes is grouped with non-diabetes.
- BRFSS-2015 curated datasets often combine prediabetes and diabetes into one positive class.

Therefore, our 2025 target rule must be **explicitly justified and sensitivity-aware**. A strong primary definition is to compare `DIABETE4=1` vs `DIABETE4=3` and exclude gestational, prediabetes/borderline, don't-know/refused, and missing responses; an alternative sensitivity analysis may place prediabetes with the negative class to match P01's published definition.

### Candidate-variable selection
The strongest recurring domains are:
- age and sex;
- BMI;
- blood pressure and cholesterol;
- general and physical health;
- physical activity;
- smoking;
- cardiovascular/kidney comorbidities;
- education, income and employment;
- health-care access/checkup measures.

We should not select variables merely because they correlate strongly with DIABETE4. Variables downstream of a known diabetes diagnosis (for example insulin use, age at diabetes diagnosis, diabetes education or diabetes-specific monitoring) must be screened as **target leakage**.

### Missingness
A defensible workflow is:
1. literature-grounded candidate list;
2. map candidates to BRFSS 2025 codes;
3. quantify missingness/coverage;
4. remove unusably sparse optional-module variables;
5. document complete-case vs imputation decision.

P01 provides a useful precedent of <20% per-year missingness for candidate selection, while P03 uses MICE for moderate missingness.

### Imbalance
The consistent lesson across P02–P05 is that any oversampling/undersampling must occur **inside training data only**. Our main benchmark should first report performance on the natural class distribution; resampling can be a secondary experiment.

### Evaluation
For the class assignment, the most defensible common metrics are:
- Accuracy;
- Precision;
- Recall / Sensitivity;
- Specificity;
- F1;
- ROC-AUC;
- PR-AUC;
- Confusion matrix.

P03 is the strongest direct template because it uses seven diverse models, stratified 5-fold CV, an untouched test set, and imbalance-aware metrics.

## Reproducibility priority

**Code-backed anchors**
- P01 — public R code + Zenodo archive.
- P06 — public Python code + reproducible UCI fetch.

**Detailed-method anchors**
- P02 — CDC article + full variable appendix.
- P03 — detailed methods + supplemental tables.
- P04 — detailed imbalance pipeline.
- P05 — open methods + public BRFSS-2021 input data.

**Supporting only until independently reproduced**
- P07, P08, P09, P10.

## Immediate consequence for BRFSS 2025

Before choosing the final 15–25 predictors, create a candidate dictionary where every variable records:

`BRFSS_2025_code | description | literature_support | missing_pct | core/optional | leakage_risk | include/exclude | rationale`

The initial candidate set should be derived primarily from P01, P02, P03 and P06, then checked against the 2025 codebook and our actual missingness rather than copied from any one paper.

## References

1. Nayem, M. M. H., & Biswas, S. C. (2026). *Divide and recombine approaches for fitting logistic regression to large-scale health surveillance data: application to diabetes risk prediction in BRFSS*. Scientific Reports, 16, 15980. https://doi.org/10.1038/s41598-026-46927-7
2. Xie, Z., Nikolayeva, O., Luo, J., & Li, D. (2019). *Building Risk Prediction Models for Type 2 Diabetes Using Machine Learning Techniques*. Preventing Chronic Disease, 16, E130. https://doi.org/10.5888/pcd16.190109
3. Muhammad, M. A., Sani, J., & Ahmed, M. M. (2025). *Exploring Explainable Machine Learning for Predicting and Interpreting Self-Reported Diabetes among Tennessee Adults: Insights from the 2023 Behavioral Risk Factor Surveillance System (BRFSS)*. Journal of Primary Care & Community Health, 16. https://doi.org/10.1177/21501319251400546
4. Chowdhury, M. M., Ayon, R. S., & Hossain, M. S. (2024). *An investigation of machine learning algorithms and data augmentation techniques for diabetes diagnosis using class imbalanced BRFSS dataset*. Healthcare Analytics, 5, 100297. https://doi.org/10.1016/j.health.2023.100297
5. Li, W., Peng, Y., & Peng, K. (2024). *Diabetes prediction model based on GA-XGBoost and stacking ensemble algorithm*. PLOS ONE, 19(9), e0311222. https://doi.org/10.1371/journal.pone.0311222
6. Aich, A., Murshed, M. M., Hewage, S., & Mayeaux, A. (2026). *A copula based supervised filter for feature selection in machine learning driven diabetes risk prediction*. Scientific Reports, 16, 12132. https://doi.org/10.1038/s41598-026-41874-9
7. Chang, V., Ganatra, M. A., Hall, K., Golightly, L., & Xu, Q. A. (2022). *An assessment of machine learning models and algorithms for early prediction and diagnosis of diabetes using health indicators*. Healthcare Analytics, 2, 100118. https://doi.org/10.1016/j.health.2022.100118
8. Majcherek, D., Ciesielski, A., & Sobczak, P. (2025). *AI-driven analysis of diabetes risk determinants in U.S. adults: Exploring disease prevalence and health factors*. PLOS ONE, 20(9), e0328655. https://doi.org/10.1371/journal.pone.0328655
9. Chike, et al. (2026). *An interpretable machine learning approach to predicting depression and diabetes*. Healthcare Analytics, 9, 100454. https://doi.org/10.1016/j.health.2026.100454
10. Ullah, Z., et al. (2022). *Detecting High-Risk Factors and Early Diagnosis of Diabetes Using Machine Learning Methods*. Computational Intelligence and Neuroscience, 2022, 2557795. https://doi.org/10.1155/2022/2557795
