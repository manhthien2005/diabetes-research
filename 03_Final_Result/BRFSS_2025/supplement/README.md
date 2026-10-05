# Frozen-prediction reporting supplements

No model was refitted, recalibrated for use, selected, or threshold-tuned. The original two CSVs are immutable historical numerical results. New audit outputs are separately named and do not replace them.

## Source and reproduction

Execution: GitHub Actions run `37183093668`, revision `b2e658a8f87a622b575df743e229dc943d35936c`; artifact `11295688140`, `brfss-2025-canonical-audited-output`,93 files. Prediction gzip SHA-256: `f4a44d130ef7c33b0d276d55dc504fec105f35c94da8666b97568729923e0969`. Artifact archive SHA-256 reported by GitHub: `90e875e4bf45cd2dff98f824ccc84d7847a77c93cdf39e59c5d4de59099fb058`. Recorded execution versions: Python 3.13.15, NumPy 2.1.3, pandas 2.3.3, scikit-learn 1.6.1, XGBoost 3.4.1. These are artifact-reported versions, not a claim that the local audit used the same environment.

From repository root, retrieve (read-only) the original artifact, then audit:

```text
gh run download 37183093668 --repo manhthien2005/diabetes-research --name brfss-2025-canonical-audited-output --dir 02_Implementation/BRFSS_Survey/qc/astra_statistics_source
python 02_Implementation/BRFSS_Survey/qc/astra_data_audit.py
python 02_Implementation/BRFSS_Survey/qc/astra_interview_dates.py
python 02_Implementation/BRFSS_Survey/qc/astra_statistics_audit.py --source 02_Implementation/BRFSS_Survey/qc/astra_statistics_source
python 02_Implementation/BRFSS_Survey/qc/astra_bootstrap_reconstruction.py
python 02_Implementation/BRFSS_Survey/qc/astra_publication_figures.py --source 02_Implementation/BRFSS_Survey/qc/astra_statistics_source
```

The source download directory and full-text literature cache must remain ignored. GitHub artifact retention is finite and account access may be needed; this audit retrieved the artifact successfully, but cannot promise indefinite availability. Durable repository publication of frozen predictions/fitted models is an author follow-up. Do not fabricate missing model objects or overwrite frozen outputs through a new fit. Aggregate QC evidence, hashes and reproduction scripts are version-controlled.

## calibration_intercept_slope.csv

For each of six probability models, fit an unpenalized logistic calibration regression
`logit(P(Y=1)) = alpha + beta * logit(clip(p, 1e-6, 1-1e-6))` to frozen test probabilities. Alpha and beta are estimated jointly; reported standard errors use the inverse observed information under respondent independence. The independently solved score equations reproduce coefficients and SEs within 5e-9. The clipping convention was recovered numerically; the original generation script was not saved.

The joint alpha is **not calibration-in-the-large (CITL)**. CITL is a separate offset regression fixing beta=1. In the new diagnostic, LR CITL=−0.003235 and GB CITL=−0.002756. No adjusted probabilities are used in any performance table.

Clipping matters for extreme probabilities: at epsilon 1e-6 versus1e-15, RF slope changes from 0.67775 to 0.46655; DT 0.04334 to 0.01734; GNB 0.09697 to 0.05388. These are diagnostics of highly concentrated scores, not robust estimates of a deployable calibration rule. See `../../../02_Implementation/BRFSS_Survey/qc/astra_statistics_calibration.csv`. Brier measures overall probability error and must not be treated as pure calibration loss. SVM margins are excluded.

## top4_paired_bootstrap_5000_robustness.csv

All six original intervals were independently reproduced to floating-point precision. Matching convention: NumPy `default_rng`/PCG64, seed 20251010,5000 replicates; sample 10365 positive and 58143 negative row indices with replacement; concatenate positives then negatives; **do not shuffle**; apply exactly the same counts to all four model score vectors. Compute ROC-AUC with half credit for ties and non-interpolated sklearn-equivalent Average Precision. Interval endpoints are NumPy linear 2.5th/97.5th percentiles of LR-minus-challenger differences. Point estimates use the original frozen sample. The primary 200-replicate notebook additionally shuffles indices, changing the subsequent random stream; its original results also reproduce.

The bootstrap reconstruction recovers the numerical procedure; it does not claim the missing original source script was found. Audit implementations of weighted rank metrics were checked against sklearn using explicitly duplicated bootstrap respondents (maximum absolute difference 1.12e-16).

The LR–XGBoost AP delta is 0.004919; original unadjusted 95% CI[0.000173,0.009649]. Three separately labeled 5000-replicate streams give lower limits0.000045–0.000080 and upper limits0.009656–0.009751. A diagnostic Bonferroni family of six top-four discrimination contrasts uses quantiles 0.05/(2×6) and1−0.05/(2×6); the LR–XGB interval crosses0 in all three streams. This is exploratory multiplicity sensitivity, not a retrospective confirmatory test. Bootstrap tail fractions are not formal prespecified p-values. The Monte Carlo interval around the negative-tail fraction crosses 2.5%, so a tiny positive endpoint should not be overinterpreted.

All intervals condition on the fitted models, observed class sizes and this internal sample. They do not measure model-retraining uncertainty, alternate-split variability, feature-screening uncertainty, or complex-survey population uncertainty. Holm adjustment applies to the 21 exact McNemar tests, not these bootstrap intervals.

## New reporting diagnostics

- `astra_figures/`: corrected AP labels, actual populated calibration-bin counts, ROC/PR, confusion matrices, fixed operating points, and within-model feature diagnostics. See captions below.
- QC `astra_data_characteristics.csv`: full/train/test summaries of all 20 recoded predictors, including explicit missingness; unweighted proportions and continuous means/SD/quantiles. Category codes refer to the verified CDC codebook. No significance tests between random partitions are required.
- QC `astra_statistics_point_metrics.csv`, `astra_statistics_mcnemar.csv`, `astra_statistics_calibration.csv`, `astra_statistics_robustness.csv`: independent audit results, kept distinct from frozen primary outputs.

Figure captions: discrimination uses observed frozen scores; AP is not trapezoidal PR area. The metric heatmap must be compared within columns, not interpreted as a composite score. Calibration uses up to 10 quantile bins; ties collapse bins and connecting lines do not establish local calibration between points. Confusion-matrix colors are normalized within observed class, while text shows raw counts. Operating points use probability 0.5/SVM margin 0, with no threshold search. Feature diagnostics combine absolute encoded coefficients or tree importance **within** each model; cardinality/scaling/encoding affect magnitudes, and cross-family magnitudes and causal effects cannot be inferred. All figures concern the internal unweighted sample.

## Rejected temporary evidence

`bootstrap_1000_model_metrics_summary.csv` and `bootstrap_1000_pairwise_differences.csv` contained invalid threshold metrics. They are absent from FINAL, and no current conclusion relies on them. The earlier board sentence claiming 1000-replicate stability has been corrected. Historical freeze records remain preserved in Git.
