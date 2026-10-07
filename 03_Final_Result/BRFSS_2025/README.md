> **Current interpretation (2026-10-05): MINOR REVISION FOR STATED SCOPE.** See [FINAL_CONSENSUS.md](FINAL_CONSENSUS.md). Earlier MAJOR REVISION and 69→82 scoring are historical and superseded. Current purpose: understanding the study and reporting to a supervisor; no journal selected.

# BRFSS 2025 — FINAL Review Package

This folder is the **entry point for senior-agent / reviewer audit** of the frozen BRFSS 2025 study.

## For the researcher and supervisor

1. [Báo cáo ngắn bằng tiếng Việt](BAO_CAO_GVHD_VI.md) — question, design, results, limitations and discussion with the supervisor.
2. [Giải thích toàn bộ study](GIAI_THICH_FULL_STUDY_VI.md) — guided reading, exact predictors, concrete metric examples, model mechanics and oral-defense questions.
3. [Ma trận so sánh 7 model bằng tiếng Việt](outputs/model-matrix-20261007/MA_TRAN_7_MODEL_BRFSS_VI.xlsx) — mechanisms, actual configurations, nine test metrics, confusion counts, strengths and limits. Includes a guide to metrics and complete estimator settings.
4. [Final two-reviewer consensus](FINAL_CONSENSUS.md) — current verdict and claim boundary.
5. [Documentation/reporting check](../../02_Implementation/BRFSS_Survey/qc/supervisor_reporting_review.md) — internal working audit, not a journal checklist or a scientific readiness score.

This is an empirical benchmark using survey data, not a completed systematic literature survey. A supervisor-facing report is available; a journal manuscript and author declarations remain separate future work.

## Technical and historical review files

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

## Historical independent audit (2026-10-04)

The files below preserve the earlier MAJOR REVISION verdict and 69→82/100 score. The subsequent two-reviewer consensus supersedes that judgment: A01 and A02 are MINOR for the stated scope; no unresolved FATAL/MAJOR scientific-validity defect is demonstrated. The historical score is not a defensible readiness score because finding-level deductions were not recorded. Do not quote it as current certification.

- [Vietnamese audit and scoring](ASTRA_FINAL_AUDIT_VI.md)
- [Reviewer objection matrix](ASTRA_REVIEWER_MATRIX.md)
- [Changes and scientific impact](ASTRA_CHANGELOG.md)
- [Final branch, verification and author follow-up](ASTRA_FINAL_STATE.md)
