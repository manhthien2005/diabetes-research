# Final Scientific Brief — BRFSS 2025 Diabetes Status Classification

## Title

**Development and Internal Evaluation of Seven Prespecified Classifiers for Self-Reported Diagnosed Diabetes Status in BRFSS 2025**

## Structured abstract

### Background
BRFSS provides a large, recent public-health survey containing self-reported diagnosed diabetes status and demographic, socioeconomic, behavioral, healthcare-access, and health variables. Published BRFSS diabetes studies use heterogeneous cohorts, outcome definitions, resampling strategies, feature selection, and tuning, making direct numerical reproduction inappropriate.

### Objective
To compare seven prespecified machine-learning classifier configurations under one leakage-controlled pipeline for cross-sectional classification of self-reported diagnosed diabetes status in BRFSS 2025.

### Data and participants
The CDC BRFSS 2025 public-use file contains 356,158 records. The primary binary cohort retained 342,539 respondents with `DIABETE4=1` (diabetes) or `DIABETE4=3` (no diabetes), including 51,827 positive respondents (15.13% of the unweighted analytical sample).

### Predictors
Twenty literature-grounded variables were frozen before model fitting. Diabetes-specific diagnosis/treatment/care variables were excluded as direct leakage. Concurrent comorbidity variables were retained only for status classification and are not interpreted causally or prospectively.

### Methods
Data were split 80/20 using stratification and seed 42 (274,031 development; 68,508 held-out internal test). BRFSS non-response codes were converted to missing. Categorical missingness was represented explicitly and one-hot encoded; four continuous predictors were median-imputed and standardized. Learned preprocessing was fitted only in training data and inside cross-validation folds. Seven fixed configurations were evaluated: Logistic Regression, Decision Tree, Random Forest, Gradient Boosting, XGBoost, Linear SVM, and Gaussian Naive Bayes. The primary study used the natural class distribution with no SMOTE or class weighting.

Performance included ROC-AUC, Average Precision (AP), Balanced Accuracy, Precision, Recall, Specificity, F1, and Brier score for probability-producing models. Logistic Regression was the prespecified transparent reference for paired bootstrap contrasts. Exact McNemar tests across all 21 pairs used Holm family-wise correction.

### Results
Held-out ROC-AUC was 0.8262 for Logistic Regression, 0.8260 for Gradient Boosting, 0.8263 for XGBoost, and 0.8262 for Linear SVM. Paired ROC-AUC intervals did not clearly distinguish Logistic Regression from any of these three leading challengers. Gradient Boosting had the lowest Brier score (0.1031) by a small numerical margin. Gaussian Naive Bayes produced the highest recall (0.7082), Balanced Accuracy (0.7194), and F1 (0.4400) at its default threshold but substantially lower precision (0.3192), ROC-AUC (0.7886), AP (0.3641), and worse calibration (Brier 0.2523). Decision Tree showed severe overfitting (near-perfect training performance vs test ROC-AUC 0.6021). Random Forest improved markedly over the single tree but remained below the leading models on discrimination.

A 5,000-replicate paired robustness analysis using the same frozen prediction vectors preserved the conclusion that LR/GB/XGBoost/Linear-SVM ROC-AUC differences were not clearly separated from zero. The LR–XGBoost AP contrast was small and metric-specific and is not interpreted as universal superiority.

### Conclusions
Under a common frozen BRFSS 2025 pipeline, more complex models did not demonstrate a clear ROC-AUC advantage over Logistic Regression. Model rankings depended strongly on the metric and decision boundary. The study supports a transparent trade-off interpretation rather than a single universal winner.

### Scope
These findings are limited to **internal, unweighted, cross-sectional classification** in the analyzed BRFSS 2025 sample. They do not establish prospective risk prediction, population-representative performance, external transportability, fairness, causal effects, or clinical net benefit.

## Core defense sentence

> The strongest defensible result is not that one algorithm “wins,” but that a simple Logistic Regression baseline reaches essentially the same internal ranking discrimination as the leading GB/XGBoost/Linear-SVM configurations under this prespecified pipeline, while threshold behavior and calibration differ materially across models.
