# Independent TRIPOD+AI item audit

52 official subitems; assessments refer to the current repository package, not an accepted manuscript. PRESENT means documented, not methodologically valid. NA depends on the research-only scope and must be reassessed if clinical use is proposed. File names below are relative to the study or final-package directories.

Source: [TRIPOD+AI official supplement](https://www.tripod-statement.org/wp-content/uploads/2024/04/TRIPODAI-Supplement.pdf).

{'PRESENT': 26, 'PARTIAL': 13, 'NA': 8, 'MISSING': 5}

| Item | Status | Evidence location | Assessment / remaining gap |
|---|---|---|---|
| 1 | PRESENT | FINAL_SUBMISSION_BRIEF.md / title | Development/internal evaluation, population and self-reported outcome named. |
| 2 | PARTIAL | FINAL_SUBMISSION_BRIEF.md / structured summary | Separate TRIPOD+AI abstract checklist and journal word limit not completed. |
| 3a | PRESENT | docs/literature_review.md; FINAL_SUBMISSION_BRIEF.md / objective | Cross-sectional methodological context; limited clinical novelty stated. |
| 3b | PRESENT | FINAL_SUBMISSION_BRIEF.md / intended use | Research/educational benchmark; no intended clinical care pathway. |
| 3c | PARTIAL | docs/final_feature_set.md / race interpretation | Structural disparities acknowledged; detailed inequality synthesis missing. |
| 4 | PRESENT | FINAL_SUBMISSION_BRIEF.md / objective | Development and internal evaluation explicitly distinguished. |
| 5a | PRESENT | qc/astra_data_evidence.json / official_zip,jurisdictions | Public CDC survey; same-source partitions; coverage limits stated. |
| 5b | PRESENT | qc/astra_interview_dates.json / raw,eligible | IDATE range2025-01-05 through2026-03-16 for raw and eligible samples; zero unparseable dates. Release year differs from interview calendar range. |
| 6a | PRESENT | qc/astra_data_evidence.json / jurisdictions | 47 states, DC, Guam and Puerto Rico; public general-population survey. |
| 6b | PRESENT | qc/astra_data_evidence.json / target_counts,cohort | DIABETE4 1 versus 3; other codes excluded; counts verified. |
| 6c | NA | FINAL_SUBMISSION_BRIEF.md / scope | No treatment/intervention protocol in this descriptive survey benchmark. |
| 7 | PARTIAL | notebook / Part II; qc/astra_data_evidence.json | Special codes and aggregate QA verified; subgroup-specific QA not performed. |
| 8a | PARTIAL | notebook / target; qc/astra_data_evidence.json | Self-reported diagnosed status at interview; no subgroup measurement-invariance assessment. |
| 8b | NA | CDC codebook / DIABETE4 | Respondent survey answer; no study-specific clinician adjudication. |
| 8c | PARTIAL | FINAL_SUBMISSION_BRIEF.md / design limitations | Contemporaneous self-report; no independent blinded outcome assessment established. |
| 9a | PRESENT | docs/final_feature_set.md; qc/astra_variable_audit.md | Literature domains plus full-cohort coverage screening disclosed; no claim of prospective feature freeze. |
| 9b | PARTIAL | qc/astra_variable_audit.md; CDC codebook | All 20 definitions/units/recodes checked; timing relative to diabetes diagnosis unknown. |
| 9c | NA | CDC codebook / selected variables | Standardized respondent-reported and calculated variables; no study-specific adjudicators. |
| 10 | PARTIAL | notebook / Sample-size rationale | Full available cohort, 41462 development events and 82 transformed columns; no formal precision/sample-size calculation. |
| 11 | PRESENT | notebook / Part II; qc/astra_data_characteristics.csv | Numeric median within train/folds, categorical missing class; target exclusions explicit. |
| 12a | PRESENT | notebook / split and CV; qc/astra_data_evidence.json / split | Stratified 80/20 seed42, five folds on training; earlier-result exposure disclosed. |
| 12b | PRESENT | notebook / ColumnTransformer; qc/astra_variable_audit.md | Four scaled numeric, sixteen one-hot categorical predictors. |
| 12c | PRESENT | models/model_01 through model_07 JSON; notebook model sections | All seven approaches individually documented; exact configurations independently matched. Fixed comparison, no optimizer search. |
| 12d | PARTIAL | FINAL_SUBMISSION_BRIEF.md / survey limitations | No state/cluster heterogeneity assessment; only aggregate internal performance. |
| 12e | PRESENT | supplement/README.md; qc/astra_statistics_evidence.json | Metrics, conditional bootstrap, multiplicity, calibration equations and interpretation explicit. |
| 12f | NA | supplement/README.md | No updating or recalibration of model predictions. |
| 12g | PRESENT | notebook / metric_point; qc/astra_statistics_audit.py | predict_proba or SVM decision_function; frozen paired scores verified. |
| 13 | PRESENT | notebook / resampling contract | No class rebalancing/weighting; original class distribution and rationale retained. |
| 14 | PARTIAL | FINAL_SUBMISSION_BRIEF.md / limitations | No fairness analysis or intervention; no fairness/deployment claim. |
| 15 | PRESENT | notebook / THRESHOLD; supplement/README.md | Probability0.5 or SVM native margin0; conventional comparison boundary, no clinical optimum asserted. |
| 16 | PRESENT | qc/astra_data_characteristics.csv; FINAL_SUBMISSION_BRIEF.md | Same source/definitions/eligibility; random partition, not external evaluation. |
| 17 | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | AUTHOR_REQUIRED: institutional ethics/waiver and consent determination. |
| 18a | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | AUTHOR_REQUIRED: funding and funder role. |
| 18b | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | AUTHOR_REQUIRED: all-author financial/nonfinancial disclosures. |
| 18c | PARTIAL | Git history; AUTHOR_COMPLETION_CHECKLIST.md | Repository stages available; authors must state whether a prospective protocol existed. |
| 18d | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | AUTHOR_REQUIRED: registration details or explicit unregistered statement. |
| 18e | PRESENT | supplement/README.md; qc/astra_evidence_manifest.json | CDC source/hash; execution-artifact retrieval and expiry limitation. |
| 18f | PRESENT | canonical notebook; qc audit scripts; supplement/README.md | Analysis code, versions, seeds and diagnostic procedures available. |
| 19 | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | AUTHOR_REQUIRED: involvement details or confirmed absence. |
| 20a | PRESENT | qc/astra_data_evidence.json / target_counts,cohort,split | Full attrition/event counts independently reproduced; no longitudinal follow-up. |
| 20b | PARTIAL | qc/astra_data_characteristics.csv | All 20 predictors overall/train/test including missingness; cross-demographic summaries absent; dates supplied in astra_interview_dates.json. |
| 20c | PRESENT | qc/astra_data_characteristics.csv | Matched development/evaluation descriptive distributions provided. |
| 21 | PRESENT | qc/astra_data_evidence.json / cohort,split; frozen cv_folds.csv | Full/train/test event counts and CV fold counts available; no tuning sample. |
| 22 | PARTIAL | models/*.json; notebook; supplement/README.md | Code/configurations rebuild models, but fitted pipelines not serialized; direct exact historical predictions on new people unavailable. |
| 23a | PARTIAL | qc/astra_statistics_point_metrics.csv; supplement/*.csv; astra_figures | Overall estimates/CIs/plots available; key-subgroup CIs absent; conditional uncertainty only. |
| 23b | NA | FINAL_SUBMISSION_BRIEF.md / limitations | Cluster heterogeneity not examined; not evidence of homogeneous performance. |
| 24 | NA | supplement/README.md | No model updating performed. |
| 25 | PRESENT | ASTRA_FINAL_AUDIT_VI.md; FINAL_SUBMISSION_BRIEF.md | No universal winner/equivalence; fairness and applicability not established. |
| 26 | PRESENT | ASTRA_FINAL_AUDIT_VI.md; FINAL_SUBMISSION_BRIEF.md | Sequential design, coverage screening, missingness, self-report, weighting and uncertainty explicitly limited. |
| 27a | NA | FINAL_SUBMISSION_BRIEF.md / non-intended use | No clinical implementation proposed; current preprocessing is not a deployment safety protocol. |
| 27b | NA | FINAL_SUBMISSION_BRIEF.md / non-intended use | Research-only benchmark; clinical end-user requirements not specified. |
| 27c | PRESENT | ASTRA_FINAL_AUDIT_VI.md / next recommendation | Independent protocol and temporal/geographic validation before transportability/utility claims. |
