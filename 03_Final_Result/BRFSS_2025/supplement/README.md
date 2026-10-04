# Pre-Submission Supplements

These files are **reporting diagnostics derived from already-frozen held-out predictions**. They do not refit a model, tune a threshold, or alter the primary benchmark.

## calibration_intercept_slope.csv

Probability-producing models only; Linear SVM is excluded because its raw decision margin is not a calibrated probability.

The table reports observed prevalence, mean predicted probability, Brier score, and calibration-model intercept/slope. These quantities are used to describe calibration; no post-hoc recalibration is applied to primary results.

## top4_paired_bootstrap_5000_robustness.csv

A 5,000-replicate class-stratified **paired respondent bootstrap** for Logistic Regression versus Gradient Boosting, XGBoost, and Linear SVM on:
- ROC-AUC;
- Average Precision (AP).

The same sampled held-out respondent indices are applied to both models in each contrast.

This is a robustness analysis of frozen predictions, not an equivalence test and not a new model-selection stage.

## Excluded temporary audit files

Two intermediate 1,000-replicate CSVs were found to contain invalidly scaled threshold metrics (for example accuracy outside [0,1]). They were **rejected during pre-submission audit and are deliberately absent from FINAL**. No final conclusion depends on them.
