# BRFSS 2025 Pre-Submission Board Review

**Review mode:** hostile/internal peer review before external submission  
**Study type being defended:** methodological development + internal evaluation benchmark  
**Not being defended:** clinical deployment, prospective risk prediction, population prevalence, causal inference, or external validation

## Board verdict

| Question | Verdict |
|---|---|
| Is there a fatal data-leakage or target-definition flaw? | **No identified fatal flaw** |
| Are frozen metrics reproducible? | **Yes** |
| Is the seven-model comparison internally fair? | **Yes, as a comparison of prespecified configurations** |
| Can the study claim one universally superior algorithm? | **No** |
| Can the study claim U.S.-population performance? | **No** |
| Can the study claim clinical screening utility? | **No** |
| Is it ready for expert methodological review? | **Yes** |
| Is it ready for clinical deployment claims? | **No** |

### Internal score

| Domain | Score / 10 | Board comment |
|---|---:|---|
| Research question and scope | 9.0 | Clear after narrowing to cross-sectional status classification |
| Data provenance/integrity | 9.5 | CDC source, byte size and SHA-256 protected |
| Outcome validity | 8.0 | Explicit, but self-reported and does not separate Type 1/Type 2 |
| Predictor validity | 7.5 | Literature-grounded; concurrent comorbidities have temporal ambiguity |
| Leakage control | 9.5 | Learned preprocessing is fold-safe; test not used for tuning |
| Missing-data handling | 8.0 | Transparent pragmatic strategy; not assumption-free |
| Internal validation | 8.0 | Strong held-out design + CV, but one random source-cohort split only |
| Model-comparison fairness | 8.0 | Same cohort/split/preprocessing; fixed baselines rather than tuned family optima |
| Statistical reporting | 8.0 | Paired analysis + Holm; high-repetition robustness added for borderline contrasts |
| Calibration | 8.5 | Brier + curves; post-hoc intercept/slope supplement from frozen predictions |
| Survey interpretation | 8.0 | Correctly limits claims to unweighted sample-level performance |
| Fairness/subgroups | 5.0 | Not evaluated in frozen primary benchmark; deployment claims prohibited |
| Reproducibility | 9.5 | Single notebook, frozen configs, hashes, seeds, audited output |
| Reporting discipline | 9.0 | TRIPOD+AI/PROBAST+AI gaps explicitly mapped |
| **Overall for stated benchmark scope** | **8.4** | Strong reproducible internal benchmark |
| **Overall for clinical deployment** | **5.0** | External validation, fairness and clinical-utility work still required |

## Major reviewer objections and defense

### 1. “This is called diabetes prediction, but BRFSS is cross-sectional.”

**Objection sustained.** The correct task is classification of **self-reported diagnosed diabetes status**, not future incidence prediction.

**Fix:** title, notebook scope and final documents use cross-sectional/internal-validation language.

### 2. “You ignored BRFSS survey weights.”

**Defense only under a narrow estimand.** CDC documents `_LLCPWT`, `_STSTR`, and `_PSU` for complex-survey inference. The primary analysis deliberately estimates **unweighted predictive performance in the analyzed respondent sample**. It does not estimate national prevalence or population-representative performance.

**Boundary:** a population-level claim would require a separately specified weighted/design-aware analysis.

### 3. “Some predictors may occur after diabetes diagnosis.”

**Objection sustained as an applicability limitation, not direct target leakage.** Hypertension, cardiovascular disease, kidney disease, walking difficulty and healthcare access can be concurrent or downstream.

**Defense:** the study is a contemporaneous status classifier. It makes no causal or prospective-risk claim.

### 4. “Untuned models do not prove which algorithm is best.”

**Objection sustained.**

**Fix:** results are explicitly a benchmark of **seven prespecified configurations**, not an estimate of each algorithm family's attainable optimum. No “best algorithm” claim is permitted.

### 5. “Accuracy is almost the majority-class baseline.”

**Correct.** An always-negative test classifier has accuracy **0.8487** but Balanced Accuracy **0.50**, F1 **0**, ROC-AUC **0.50**, and AP equal to prevalence (**0.1513**).

**Defense:** accuracy is never interpreted alone; Balanced Accuracy, ROC-AUC, AP, Recall, Precision, F1 and calibration are all reported.

### 6. “Gaussian NB has the highest F1/Balanced Accuracy; is it the winner?”

**No.** At its default threshold GNB retrieves many more positives, but it has low precision, lower ranking discrimination and poor calibration (Brier ≈0.2523; mean predicted probability ≈0.337 vs observed 0.151).

**Defense:** this is an operating-point trade-off, not universal superiority.

### 7. “XGBoost has the largest ROC-AUC, so why not call it best?”

The point difference versus Logistic Regression is only about **0.00012**. Paired bootstrap intervals for ROC-AUC cross zero.

**Defense:** the final report does not rank a winner from this numerical noise.

### 8. “Your metric called PR-AUC is actually Average Precision.”

**Objection sustained and corrected.** The code uses scikit-learn `average_precision_score`. Historical machine keys named `pr_auc` are retained for compatibility, but all submission-facing text calls the metric **Average Precision (AP)**.

### 9. “A CI crossing zero does not establish equivalence.”

**Objection sustained and corrected.** The final language is “no clear difference detected” or “very similar point estimates.” No equivalence claim is made because no equivalence margin/test was prespecified.

### 10. “Only 200 bootstrap replicates were used.”

The frozen notebook used 200 replicates. This is adequate for coarse descriptive intervals but weak for very small borderline contrasts.

**Fix/robustness:** the exact frozen respondent-level predictions were re-audited with:
- 1,000 paired stratified replicates across all seven models for stability;
- 5,000 paired stratified replicates for LR vs GB/XGBoost/Linear-SVM ROC-AUC and AP.

Top-four ROC-AUC conclusions were unchanged. The LR–XGBoost AP difference is small and close to the boundary; it is not promoted to an overall superiority claim.

### 11. “Where are calibration slope and intercept?”

The frozen primary notebook reports Brier score and calibration curves. A pre-submission diagnostic supplement computed calibration intercept/slope from **frozen test probabilities only**, without refitting or recalibration.

Key results:
- Logistic Regression: intercept **0.0135**, slope **1.0133**
- Gradient Boosting: intercept **0.1128**, slope **1.0897**
- XGBoost: intercept **−0.0776**, slope **0.9376**
- Random Forest: intercept **−0.4233**, slope **0.6778**
- Decision Tree: intercept **−1.3948**, slope **0.0433**
- Gaussian NB: intercept **−1.6963**, slope **0.0970**

These support the existing calibration-curve/Brier interpretation. They are reporting diagnostics, not post-hoc recalibration.

### 12. “Where is decision-curve analysis?”

Not performed.

**Defense:** no clinical action or threshold probability is prespecified, and the study does not claim clinical net benefit. DCA would be mandatory before a clinical-utility claim, but adding an arbitrary decision threshold only to satisfy a checklist would be scientifically weaker.

### 13. “Where is external/temporal validation?”

Not performed.

**Consequence:** generalizability/transportability remains unproven. This is explicitly a development/internal-evaluation study.

### 14. “Where is subgroup/fairness evaluation?”

Not part of the frozen primary benchmark.

**Consequence:** no fairness or deployment claim is permitted. Before operational use, performance should be evaluated by key demographic groups (at minimum age, sex and race/ethnicity) with uncertainty and clinically relevant error metrics.

### 15. “Is feature importance causal?”

No. The final report labels coefficients and impurity-based importances as **model diagnostics only**. Aggregating one-hot terms can favor higher-cardinality variables, and impurity importance has its own cardinality bias; cross-family magnitudes are not directly comparable.

## Remaining limitations that are not “fixable by wording”

1. No external or temporal validation.
2. No frozen subgroup/fairness evaluation.
3. No clinical utility/DCA because no clinical decision context is defined.
4. Self-reported cross-sectional outcome.
5. No formal prospective sample-size calculation; full eligible secondary cohort was used.
6. Public aggregate excludes several 2025 jurisdictions.
7. Primary model configurations were prespecified/fixed rather than tuned under nested CV.
8. Primary bootstrap used 200 reps; high-repetition sensitivity is supplementary.
9. CDC documents 284 XPT variables while pandas exposes 283; all study variables are present and source SHA-256 is verified.

## Board decision

**ACCEPTABLE FOR EXPERT REVIEW AS A REPRODUCIBLE INTERNAL BENCHMARK, WITH CLAIMS RESTRICTED TO THAT SCOPE.**

A manuscript that upgrades the claim to “clinical risk prediction,” “nationally representative performance,” “fair deployment,” or “clinical utility” should receive **major revision/rejection** until the corresponding analyses are performed.
