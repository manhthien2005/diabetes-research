# BRFSS 2025 Full-Study Audit — FINAL

**Branch:** `implement/BRFSS_survey`  
**Canonical notebook:** `kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb`  
**Canonical Kaggle kernel:** `manhthien2005/brfss-2025-diabetes-classification`  
**Audited output run:** GitHub Actions `37183093668`  
**Audited artifact:** `brfss-2025-canonical-audited-output` (93 files)  
**Status:** **FINAL-READY / PASS**

## 1. Executive audit

| Area | Status | Final conclusion |
|---|---|---|
| Dataset provenance | PASS + non-blocking schema note | XPT size and SHA-256 match the frozen source; CDC documents 284 variables while pandas exposes 283 |
| Target | PASS | `DIABETE4=1` vs `3`; self-reported diagnosed-diabetes status classification |
| Feature leakage | PASS | Diagnosis/treatment-specific downstream variables are excluded |
| Temporal interpretation | PASS with limitation | Concurrent comorbidities can classify status but are not causal/prospective predictors |
| Missing data | PASS | BRFSS special codes decoded first; learned imputation is training-only |
| Split / CV | PASS | 80/20 stratified internal holdout; 5-fold CV only inside train |
| CV reporting | PASS | Fold values + mean/SD/range; no naive 5-fold t-CI |
| Model fairness | PASS | Same cohort, split and preprocessing contract across all seven fixed baselines |
| Class imbalance reporting | PASS | Balanced Accuracy, PR-AUC, Recall, Precision and F1 included |
| Calibration | PASS | Brier for probability models + calibration plot; SVM Brier correctly omitted |
| Frozen reproducibility | PASS | All seven frozen point metrics reproduced within 1e-6 |
| Paired comparison | PASS | Respondent-paired bootstrap on the same 68,508 held-out respondents |
| Multiplicity | PASS | Exact McNemar tests across 21 pairs with Holm FWER correction |
| Visual outputs | PASS | ROC, PR, metric matrix, operating-point trade-off, calibration and feature diagnostics generated |
| Artifact contract | PASS | 93 canonical output files archived successfully |
| Notebook management | PASS | One executable end-to-end notebook; no separate model/comparison notebooks |

## 2. Frozen held-out benchmark

| Model | Balanced Acc. | F1 | ROC-AUC | PR-AUC | Brier |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.5815 | 0.2832 | 0.8262 | 0.4466 | 0.1033 |
| Decision Tree | 0.6020 | 0.3235 | 0.6021 | 0.2053 | 0.2134 |
| Random Forest | 0.5790 | 0.2773 | 0.8045 | 0.4025 | 0.1076 |
| Gradient Boosting | 0.5753 | 0.2663 | 0.8260 | **0.4483** | **0.1031** |
| XGBoost | 0.5843 | 0.2905 | **0.8263** | 0.4417 | 0.1035 |
| Linear SVM | 0.5539 | 0.2024 | 0.8262 | 0.4479 | N/A |
| Gaussian Naive Bayes | **0.7194** | **0.4400** | 0.7886 | 0.3641 | 0.2523 |

**Do not select a universal winner from this table alone.** Threshold metrics and ranking/calibration metrics answer different questions.

## 3. Primary paired result — Logistic Regression vs challengers

The paired bootstrap uses identical resampled respondents for every model.

### Discrimination

| Challenger | Δ ROC-AUC (LR − challenger) | 95% paired CI | Δ PR-AUC | 95% paired CI | Conclusion |
|---|---:|---:|---:|---:|---|
| Random Forest | +0.02167 | [+0.01922, +0.02434] | +0.04417 | [+0.03877, +0.04950] | LR clearly better ranking/discrimination |
| Gradient Boosting | +0.00015 | [−0.00111, +0.00136] | −0.00168 | [−0.00479, +0.00141] | No clear difference |
| XGBoost | −0.00012 | [−0.00149, +0.00118] | +0.00492 | [−0.00013, +0.00863] | No clear difference |
| Linear SVM | +0.00001 | [−0.00065, +0.00063] | −0.00125 | [−0.00305, +0.00037] | No clear difference |
| Gaussian NB | +0.03760 | [+0.03452, +0.04050] | +0.08251 | [+0.07474, +0.08863] | LR clearly better ranking/discrimination |

Decision Tree is also substantially below LR: Δ ROC-AUC = +0.22410 and Δ PR-AUC = +0.24130, with both paired CIs excluding zero.

### Threshold behavior

- XGBoost has slightly higher Balanced Accuracy/F1 than LR at the frozen boundaries.
- LR has higher Balanced Accuracy/F1 than Gradient Boosting and Linear SVM at their frozen boundaries.
- Gaussian NB has the highest Balanced Accuracy/F1 because it retrieves far more positive cases, but with much lower precision/specificity and substantially worse Brier/PR-AUC.
- These operating-point differences do **not** imply corresponding differences in ranking discrimination.

## 4. Top-four discrimination conclusion

For **Logistic Regression, Gradient Boosting, XGBoost and Linear SVM**:

- every pairwise ROC-AUC difference has a 95% paired bootstrap CI crossing zero;
- LR-vs-GB/XGB/SVM PR-AUC CIs cross zero;
- McNemar + Holm finds **no significant accuracy difference for any pair among these four**;
- small point-estimate differences such as XGBoost ROC-AUC 0.82629 vs LR 0.82617 are therefore not defensible as evidence of a superior overall classifier.

Exploratory all-pairs bootstrap suggests some PR-AUC differences (for example GB vs XGB and XGB vs SVM), but these secondary all-pairs bootstrap intervals are not multiplicity-adjusted and should not be promoted to the primary conclusion.

## 5. Calibration audit

Brier scores:

1. Gradient Boosting: **0.10314**
2. Logistic Regression: **0.10325**
3. XGBoost: **0.10354**
4. Random Forest: **0.10760**
5. Decision Tree: **0.21343**
6. Gaussian NB: **0.25229**

The calibration plot is consistent with the Brier ranking: LR/GB/XGB are comparatively well behaved; Decision Tree and especially Gaussian NB show poor probability calibration at the upper end.

Linear SVM is excluded because its raw margin is not a probability.

## 6. Overfitting diagnostics

| Model | Train accuracy | Train ROC-AUC | Test accuracy | Test ROC-AUC | Audit |
|---|---:|---:|---:|---:|---|
| Decision Tree | 0.99969 | ~1.00000 | 0.78616 | 0.60207 | Severe overfitting |
| Random Forest | 0.99967 | ~1.00000 | 0.85104 | 0.80450 | Large train–test gap; materially better than single tree |

The poor generalization is retained and reported; it is not hidden or tuned away after seeing test results.

## 7. Feature-diagnostic audit

The aggregated feature heatmap is a **within-model diagnostic**, not a causal ranking and not a directly comparable importance scale across estimator families.

Recurring high-signal variables include:

- age group;
- general health;
- BMI;
- hypertension;
- income/education in tree models;
- walking difficulty / kidney disease in some boosted models.

Coefficient magnitude and impurity-based feature importance have different semantics; the notebook labels them accordingly.

## 8. Literature cross-check

| Source | Important difference from this study | Appropriate use |
|---|---|---|
| P01 | Multi-year, age ≥40, logistic/D&R, different target/missing-data handling | Predictor/BRFSS precedent |
| P02 | 2014, age >30, complete cases, 2/3–1/3 split, train-only SMOTE | Model/feature/resampling precedent |
| P03 | Tennessee 2023, MICE, feature selection, train-only SMOTE, tuning | Closest evaluation/model-comparison template |
| P05 | 2021, resampling + GA-XGBoost/stacking | XGBoost/method context |
| P06 | Curated 2015 derivative; prediabetes+diabetes positive | Indirect feature-selection evidence |

Published metrics are **not numerical reproduction targets** because cohort, target, missingness, resampling, features and tuning differ.

## 9. Interpretation guardrails

- 15.13% is the **unweighted modeling-sample proportion**, not U.S. diabetes prevalence.
- The random 20% holdout is **internal validation**, not external validation.
- Concurrent health conditions must not be interpreted as causal or prospective risk factors.
- The study compares **prespecified baseline configurations**, not the theoretical maximum performance of algorithm families.
- Default/frozen thresholds explain much of the Recall/Precision trade-off.
- No primary model or threshold was retuned after observing the held-out test set.
- The CDC 284-vs-pandas-283 schema-count discrepancy remains documented; all target and selected study variables were explicitly present and verified, so it is non-blocking for the frozen study.

## 10. Final audit decision

**PASS — FINAL-READY.**

The canonical notebook completed successfully on Kaggle, reproduced all seven frozen results, generated paired statistical comparisons and all required visual outputs, and passed a separate read-back audit without rerunning training.

Future work (survey-weighted inference, threshold optimization, class-resampling sensitivity, temporal/external validation, calibration slope/intercept, or decision-curve analysis) must be versioned as **new experiments** rather than retroactively modifying this frozen primary benchmark.
