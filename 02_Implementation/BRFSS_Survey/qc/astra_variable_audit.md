# Variable audit and current provenance amendment

Source: [CDC2025 codebook](https://www.cdc.gov/brfss/annual_data/2025/zip/codebook25_llcp-v2-508.zip), individual `SAS Variable Name` entries. Exact source sections/columns and extracted definitions are retained in `astra_data_evidence.json`, key `predictors.<variable>.source_codebook_excerpt`. All20 fields exist in the raw283-variable XPT and official layout. Codes outside the stated valid sets become missing. Missingness below uses the eligible342539 respondents, not the raw-file denominator used by the historical feature-screening table.

| Variable | Construct | Coding / unit / handling | Eligible missing % | Evidence role |
|---|---|---|---:|---|
| `_AGEG5YR` | Age group | 1–13 age bands;14→missing; one-hot | 1.864 | P02 Appendix: age domain; exact grouping study-specific |
| `_SEX` | Recorded sex | 1 male,2 female; one-hot | 0.000 | P02 Appendix: sex domain |
| `_RACEGR3` | Race/ethnicity | 1–5 groups; other→missing; one-hot | 2.313 | P02 Appendix: race domain; exact grouping differs |
| `_EDUCAG` | Education | 1–4 groups; other→missing; one-hot | 0.582 | P02 Appendix: education domain |
| `_INCOMG1` | Income | 1–7 bands; other→missing; one-hot | 19.879 | P02 Appendix: income domain; 2025 coding differs |
| `EMPLOY1` | Employment | 1–8 categories; other→missing; one-hot | 1.967 | P02 Appendix: employment |
| `_BMI5` | BMI | Raw/100, kg/m²; blank→missing; median+scale | 9.097 | P02 Appendix: BMI domain, categorical there; continuous here |
| `GENHLTH` | General health | 1 excellent through5 poor;7/9/blank→missing; one-hot | 0.254 | P02 Appendix: general health |
| `PHYSHLTH` | Physical unhealthy days | Past30 days;88→0;77/99/outside0–30→missing; median+scale | 2.285 | P03 Table1/Study variables: physical-health domain |
| `MENTHLTH` | Mental unhealthy days | Past30 days;88→0;77/99/outside0–30→missing; median+scale | 1.772 | P02 Appendix: mental-health days |
| `_TOTINDA` | Leisure physical activity | 1 active,2 inactive;9/blank→missing; one-hot | 0.262 | P02 Appendix: activity domain |
| `_RFSMOK3` | Current smoking | 1 no,2 yes;9/blank→missing; one-hot | 5.804 | P02 Appendix: smoking domain; paper groups differ |
| `SLEPTIM1` | Sleep | Hours/24h,1–24;77/99/blank→missing; median+scale | 7.647 | P02 Appendix explicitly uses SLEPTIM1; P03 main-text support not found |
| `_RFHYPE6` | Reported hypertension | 1 no,2 yes;9/blank→missing; one-hot | 1.146 | P03 Study variables/Table1: hypertension domain |
| `_RFCHOL3` | Reported high cholesterol | 1 no,2 yes;9/blank→missing; one-hot | 12.665 | P03 Study variables/Table1: cholesterol domain |
| `_MICHD` | Reported CHD/MI | 1 yes,2 no;blank/other→missing; one-hot | 1.051 | P02 Appendix: coronary-heart-disease domain; compound differs |
| `CVDSTRK3` | Reported stroke | 1 yes,2 no;7/9/blank→missing; one-hot | 0.289 | P03 Study variables/Table1: stroke domain |
| `CHCKDNY2` | Reported kidney disease | 1 yes,2 no;7/9/blank→missing; one-hot | 0.352 | P02 Appendix: kidney disease, older variable name |
| `DIFFWALK` | Walking/stairs difficulty | 1 yes,2 no;7/9/blank→missing; one-hot | 4.483 | P06 feature-set context; construct-level, not raw2025 code replication |
| `PERSDOC3` | Personal care provider | 1 one,2 more than one,3 none;7/9/blank→missing; one-hot | 0.970 | Study-specific access-domain choice; exact P02/P03 support not established |

The literature sources justify constructs/model families rather than exact replication of20 raw2025 variables. P02 refers to [Xie2019, Appendix](https://www.cdc.gov/pcd/issues/2019/19_0109.htm); P03 to [Muhammad2025, Study Variables and Table1](https://doi.org/10.1177/21501319251400546); P06 to [Aich2026](https://doi.org/10.1038/s41598-026-41874-9). See claim support levels in `astra_literature_claims.json`. Historical `final_feature_set.md` is preserved; its SLEPTIM1→P03 and PERSDOC3→P02/P03 entries are not current verified provenance.

BMI has two implied decimals and blank missingness.9999 is in the published valid raw range, not a missing sentinel. Observed eligible BMI range12.02–98.43kg/m²; no data-driven clipping/removal is added. Categorical predictors are one-hot encoded, including explicit missing category−1; code direction cannot be read as a linear numeric effect. Numeric imputers/scalers are learned only in training/folds.82 transformed columns were present in the full training fit.

DIABETE4 outcome:1 positive,3 negative;2 pregnancy-only,4 prediabetes/borderline,7 unknown,9 refused and blank excluded. No diabetes-care/age-at-diagnosis fields enter X. Survey weight, strata, PSU and identity fields are excluded from X. Respondent questionnaire timing is contemporaneous; no elapsed prediction horizon or antecedence to diagnosis can be recovered. Reported hypertension, cholesterol, CVD, kidney disease, disability and access may be consequences/correlates of prior diagnosis or healthcare contact. This prevents prospective and causal interpretation despite absence of direct outcome components in X.

Missingness is not proven MAR: `_RFCHOL3` depends on cholesterol-testing history and questionnaire routing; income nonresponse and skipped/disability items can be informative. Explicit missing categories can learn survey/diagnosis-access patterns. No missing-data mechanism or transportability guarantee follows from good aggregate discrimination.

Feature selection used whole-cohort missingness/coverage before partitioning. This is disclosed exposure to test-covariate distributions; no supervised target-driven selector was found in the notebook. It cannot be undone by changing prose or refitting the same benchmark.
