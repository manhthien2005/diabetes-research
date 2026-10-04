# TRIPOD+AI / PROBAST+AI Pre-Submission Readiness

This is a repository-level pre-assessment for the BRFSS 2025 study. It is **not** an official certification by the TRIPOD or PROBAST groups.

TRIPOD+AI (BMJ 2024) supersedes TRIPOD 2015 for prediction-model reporting and contains 27 main items / 52 subitems. PROBAST+AI (BMJ 2025) separates model-development quality from model-evaluation risk of bias and covers participants/data, predictors, outcome, and analysis.

## TRIPOD+AI coverage

| Item area | Status | Repository evidence / gap |
|---|---|---|
| 1 Title | PASS | Final title identifies development/internal evaluation, BRFSS 2025 respondents and outcome |
| 2 Abstract | PASS in final brief | Structured summary provided in `03_Final_Result/BRFSS_2025/FINAL_SUBMISSION_BRIEF.md` |
| 3 Background/intended use | PASS | Intended/non-intended use explicit |
| 4 Objectives | PASS | Seven-configuration internal benchmark |
| 5 Data | PASS | CDC BRFSS 2025 provenance, integrity and representativeness limits documented |
| 6 Participants | PASS | Eligibility and attrition flow documented |
| 7 Data preparation | PASS | Special-code handling + fold-safe preprocessing documented |
| 8 Outcome | PASS with limitation | `DIABETE4=1` vs `3`; self-report/cross-sectional limitations explicit |
| 9 Predictors | PASS with limitation | 20 definitions/evidence sources; temporal ambiguity explicit |
| 10 Sample size | PARTIAL | Full eligible cohort used; no prospective formal sample-size calculation |
| 11 Missing data | PASS | Analytical missingness + imputation strategy documented |
| 12 Analytical methods | PASS | Split, CV, models, metrics, paired comparison, calibration documented |
| 13 Class imbalance | PASS | No resampling in primary study; natural test prevalence retained |
| 14 Fairness | PARTIAL | No primary subgroup/fairness analysis; no fairness/deployment claim |
| 15 Model output/threshold | PASS | Probability thresholds 0.5; SVM native margin 0; no test tuning |
| 16 Development vs evaluation | PASS | Same-source internal holdout explicitly identified |
| 17 Ethics | **AUTHOR REQUIRED** | Public de-identified CDC data are documented; institutional ethics/waiver determination must be supplied by authors/institution |
| 18a Funding | **AUTHOR REQUIRED** | Do not infer or fabricate |
| 18b Conflicts | **AUTHOR REQUIRED** | Do not infer or fabricate |
| 18c Protocol | PARTIAL | Repository freezes study design, but a prospectively registered protocol is not established |
| 18d Registration | **AUTHOR REQUIRED** | Registration status must be stated by authors |
| 18e Data sharing | PASS | Public CDC source + exact hash/provenance |
| 18f Code sharing | PASS | Canonical notebook + configs + audit workflows |
| 19 Patient/public involvement | **AUTHOR REQUIRED** | Must state involvement or explicitly state none |
| 20 Participants/results | PASS / PARTIAL | Flow, n/events, missingness reported; full demographic characteristics table is not a primary artifact |
| 21 Analysis counts | PASS | Full/train/test n and events reported |
| 22 Model specification | PASS | Rebuildable estimator/preprocessing configs and code |
| 23 Performance | PARTIAL | Overall metrics + CIs present; key subgroup CIs absent |
| 24 Model updating | N/A | No updating/recalibration performed |
| 25 Interpretation | PASS | Trade-offs and literature context explicit |
| 26 Limitations | PASS | Major applicability/statistical limits explicit |
| 27 Usability/future work | PASS for non-deployment scope | Deployment is explicitly unsupported; required future validation stated |

## PROBAST+AI-style pre-assessment

| Domain | Development quality / evaluation concern | Rationale |
|---|---|---|
| Participants & data | Some applicability concern | Large public survey, but unweighted sample estimand and incomplete 2025 jurisdiction coverage |
| Predictors | Some applicability concern | Standardized BRFSS variables; several concurrent comorbidities have uncertain temporal ordering |
| Outcome | Some applicability concern | Explicit self-reported diagnosed status; no laboratory confirmation and no Type 1/Type 2 distinction |
| Analysis | Generally strong internal rigor, limited transportability | No detected preprocessing leakage/test tuning; large event count; baseline comparator; discrimination + calibration; single-source internal holdout only |

### Overall interpretation

- **No identified major leakage violation** in the frozen internal benchmark.
- **External validity is unresolved**, not “low risk.”
- **Clinical applicability is deliberately not claimed.**
- A future deployment-oriented study should add external/temporal validation, subgroup performance, calibration-in-new-data, and clinically anchored utility analysis.

## Current reporting standard references

- Collins GS et al. TRIPOD+AI statement. *BMJ*. 2024;385:e078378. DOI: `10.1136/bmj-2023-078378`.
- Moons KGM et al. PROBAST+AI. *BMJ*. 2025;388:e082505. DOI: `10.1136/bmj-2024-082505`.
