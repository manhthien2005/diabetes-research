# Cai 2021 same-data method reconstruction

Status: specified before model fitting; real-data execution must follow variable audit.
Scope authorized by the human on 2026-11-05. This is a learning module, not paper promotion or a change to NHANES/BRFSS.

## Design and sources

One participant per baseline NAGALA examination, followed prospectively in the historical cohort. Target: incident diabetes over five years, not prevalent diabetes classification. Index time is the baseline examination. Baseline FPG/HbA1c are eligible predictors of **future**, distinct measurements used for outcome ascertainment. Follow-up time and incident event are never predictors.

Primary source: Cai et al. (2021), DOI 10.2147/DMSO.S304994, [full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC8123981/). Dataset: Okamura et al., [Dryad DOI 10.5061/dryad.8q0p192](https://datadryad.org/dataset/doi:10.5061/dryad.8q0p192), listed release 2019-02-19. Source locations: Data Source / Study Population / Definitions / Statistical Analyses; Tables 1–3; Figures 1–2. Original study DOI: 10.1038/s41366-018-0076-3. Data terms: [Dryad Terms](https://datadryad.org/terms), §§1(a), 4.

## Reported versus checked versus assumed

- Reported: non-obese BMI <25 kg/m²; incident diabetes defined by follow-up FPG >=126 mg/dL, HbA1c >=48 mmol/mol, or self-report. Use the supplied incident-event/time fields; participant visit-level ascertainment cannot be re-derived from this workbook.
- Checked in the supplied workbook: one sheet, 15,464 participants, 31 columns. BMI <25 gives 12,940 participants and 201 all-follow-up events, matching Table 1; median follow-up 2016 days. The Methods' 15,744 differs from the delivered 15,464. Do not fabricate exclusions to resolve this apparent discrepancy.
- Source population exclusions (hepatitis, medication, baseline diabetes, missing covariates) were upstream. Those fields are not all delivered. Do not reapply a different FPG rule or claim independently verified upstream exclusions.
- Header sex says 1=men/2=women; observed data are 0/1. Counts 8430/7034 match Dryad men/women; BMI-filtered counts must match Table 1. Preserve observed codes; resolve 1=men/0=women with evidence, under the human's delegated decision. Do not relabel the unchanged workbook.
- Figure 2 image itself labels partial likelihood deviance and has 18 nonzero terms at the low-penalty end. This supports choosing Cox LASSO, but does not prove the original executable family. Caption mixes binomial wording and 19 features. This remains a reconstruction assumption.

## Frozen implementation choices

Python >=3.12 CPU (local 3.12; Kaggle 3.13 observed), scikit-survival Coxnet LASSO and lifelines Cox PH. R/glmnet would more closely mirror the reported R 3.6.1 ecosystem; Python supports a single tested code path across this local environment and Kaggle. This choice does not imply numerical equivalence to glmnet. Kaggle attempt 1 failed in venv/ensurepip before data/model execution; attempt 2 uses a separate dependency target with child-process PYTHONPATH, retaining all pinned scientific library versions and model/config choices.

Candidate concepts are the 18 baseline variables in Table 1: age, BMI, waist, ALT, AST, GGT, HDL-C, TC, TG, HbA1c, FPG, SBP, DBP, sex, fatty liver, exercise, alcohol category, smoking category. Use mmol/L lipids, mmol/mol HbA1c, mg/dL FPG from explicitly labelled workbook columns. No duplicate unit columns; no phenotype composites, body weight, ethanol amount, IDs, follow-up, or event as predictors. This candidate-set reconstruction is an assumption because no executable list is available. Alcohol and smoking use fixed one-hot contrasts; 18 concepts therefore exceed 18 design-matrix parameters. Binary codes remain numeric indicators.

Fixed 75/25 stratified random split, seed 20261105. Expected sizes 9705/3235, not the paper's 9651/3289; original split seed and procedure are UNKNOWN. No seed search or reassignment to match events. Missingness/duplicates audited before fitting. HDL mmol/L has 11 zeros paired with blanks in its mg/dL counterpart (8 in the non-obese cohort). Treat these **paired** zeros as missing, not biological zeros. Median imputation is fitted inside each development training fold, then on full development for the final model; this is an explicit methodological improvement because the authors' handling is unreported. Do not drop these participants to force a complete-case result. Any additional undocumented missingness causes a stop.

Development only: ten event-stratified folds; standardization fitted separately inside each fold. Coxnet l1_ratio=1, 60 relative penalty ratios from 1 to 0.01. Each training fold learns its own alpha_max using the library-generated warm-start path; CV compares equal relative ratios, never alpha_max learned from held-out fold data. If a path stops early, compare only the shared prefix supported by every fold and the full-development path; record all path lengths. Convergence warnings are fatal. Selection metric: held-out mean negative Cox partial log likelihood per observed event (Breslow ties), with one-SE rule choosing the strongest eligible penalty. This explicitly differs from glmnet's possible grouped CV deviance. Save all fold scores and selected alpha; do not force six selected predictors. Refit unpenalized Cox on selected columns in development using Efron ties/Breslow baseline; a zero-feature solution causes a clear stop, not test-guided fallback. Separately fit the six **published** predictors as a prespecified educational comparator, not as independently rediscovered features.

No SMOTE, no threshold tuning. Check Schoenfeld residual PH tests on development only; disclose violations without choosing a replacement using test performance. Freeze config, source hash, models and baseline survival before the one final-test evaluation. Save coefficients, predictor order, centering, preprocessing and baseline cumulative hazard. Predictions use the right-continuous Breslow step function, without extrapolation beyond development support.

## Evaluation

Harrell C across follow-up, cumulative/dynamic IPCW AUC and IPCW Brier at 1826.25 days. Use development censoring distribution, and explicitly administratively censor evaluation follow-up beyond five years for five-year metrics; all-follow-up C uses original time. Early-censored people contribute no false negative labels. Require nonzero censoring survival at the horizon. Calibration: fixed five risk-quantile groups, mean predicted risk versus 1-KM(5y); IPCW logistic calibration intercept (slope fixed to one) and slope (jointly fitted intercept). Neither diagnostic recalibrates model predictions. Bootstrap test participants 1000 times with the fitted model held fixed for C/AUC/Brier CIs; not optimism-corrected development performance or full-pipeline uncertainty. Preserve failed replicate counts. DCA deferred rather than applying ordinary binary DCA to censored outcomes.

Report both prespecified models; do not select a winner or update the model using the internal test. Random split is internal validation. No clinical deployment claim.

## Remaining limits

Original code availability, original seed, exact LASSO loss/encoding/standardization, lambda path, bootstrap procedure and final original baseline survival are unverified. Table 2 is LASSO coefficients, not final Cox beta. No absolute original-risk recreation is claimed. Supplied duration treats diagnosis at observed follow-up as an exact event time; interval censoring/visit-level times cannot be reconstructed. No external validation. Audit supports analytical reconstruction, not verification of every upstream clinical diagnosis.

## Development-only protocol amendment (revision 2)

Attempt 2 failed in development before test use or pipeline freeze: the fixed absolute grid began with long all-zero regions, Coxnet stopped the path early, and independent cold fits to complete its tail produced convergence warnings and an ArithmeticError at small penalties. Full failure manifest and log are preserved in `qc/failed_runs/attempt2_v1/`. No final-test outcome/performance guided the remedy.

Use library-generated warm-start paths scaled by each training fold's own alpha_max, with relative minimum 0.01, retaining the one-SE rule, ten folds, seed, candidates, cohort, outcome and horizon. Select coefficient columns from the full-development warm path rather than cold-refitting a tiny alpha. A bounded fold-1 development probe gave 60 path points without convergence warnings in about 0.2 seconds locally. This is a numerical/protocol reconstruction amendment, not a claim about original author software. Freeze revision 2 before the first final-test evaluation.
