# BRFSS 2025 — FINAL Review Package

This folder is the **entry point for senior-agent / reviewer audit** of the frozen BRFSS 2025 study.

## Read in this order

1. **REVIEWER_HANDOFF.md** — exact scope, source-of-truth map, known limitations, what should be challenged.
2. **FINAL_SUBMISSION_BRIEF.md** — concise paper-style scientific summary.
3. `../../02_Implementation/BRFSS_Survey/kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb` — single executable primary study.
4. `../../02_Implementation/BRFSS_Survey/docs/PRE_SUBMISSION_BOARD_REVIEW.md` — hostile internal peer review and defense.
5. `../../02_Implementation/BRFSS_Survey/docs/REPORTING_READINESS.md` — TRIPOD+AI / PROBAST+AI readiness map.
6. `../../02_Implementation/BRFSS_Survey/docs/literature_review.md` + `references.bib` — evidence base.
7. **supplement/** — post-hoc reporting diagnostics derived only from frozen test predictions.

## Freeze boundary

The following are frozen and must not be changed merely to improve a score:
- target and cohort;
- 20 predictors;
- 80/20 split (seed 42);
- preprocessing;
- seven estimator configurations;
- frozen prediction vectors and point metrics.

Any future tuning, subgroup analysis, survey-weighted analysis, threshold optimization, external validation, DCA, or additional model is a **new experiment/version**.

## Submission status

**Ready for independent methodological review.**

Not yet claimable as a deployable clinical prediction model because external/temporal validation, frozen subgroup/fairness evaluation, and clinically anchored utility analysis are absent.

Before an actual journal submission, complete `AUTHOR_COMPLETION_CHECKLIST.md`.
