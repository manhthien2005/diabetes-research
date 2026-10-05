# Independent reporting and risk-of-bias readiness

Current assessment: **MAJOR REVISION before journal submission**. The previous aggregate PASS checklist is superseded; its original content remains in Git at `aa2e53c`. This is an advisory assessment, not TRIPOD/PROBAST certification.

The complete [52-subitem TRIPOD+AI assessment](../qc/astra_reporting_matrix.md) distinguishes PRESENT, PARTIAL, MISSING and scope-dependent NA. Machine-readable evidence is in `../qc/astra_reporting_matrix.json`. The participant table now covers all 20 predictors overall/train/test; it does not supply demographic-group performance. Configurations and training code are available, but fitted pipelines were not saved. An analysis-code PASS cannot satisfy model-reuse item22.

| PROBAST+AI concept | Development-quality concern | Evaluation risk-of-bias / applicability concern |
|---|---|---|
| Participants/data | Source, counts and identities verified; full eligible public cohort | Limited jurisdiction coverage; survey nonresponse; unweighted estimates apply to analyzed sample, not the population |
| Predictors | Recoding and fold-isolated learned preprocessing verified | Full-cohort coverage screening exposed test-covariate distributions; concurrent features may reflect diagnosis/treatment/access, not antecedent risk |
| Outcome | Explicit DIABETE4 1 versus3, standardized self-report | Recall/diagnosis-access misclassification; no laboratory reference; not Type 2-specific; no independent blinded ascertainment |
| Analysis | Same split, reproducible fixed configurations and paired calculations | Sequential additions after earlier test results; jointly prespecified comparison not established. Single internal split, conditional bootstrap and no subgroup/cluster evaluation |

Analysis-domain concern is **high for a confirmatory model-selection or clinical-validation claim**. A qualified descriptive comparison remains interpretable. No overall low-risk rating is justified. This is a concept-based appraisal, not a completed official PROBAST+AI signaling-question form; inaccessible supplemental materials were not treated as verified source evidence.

Author/institution statements remain AUTHOR_REQUIRED: ethics/waiver, funding, conflicts, protocol/registration, patient/public involvement and contributions. No declarations have been inferred from public-data availability. Journal abstract requirements and journal-specific manuscript assembly remain reporting gaps.

Clinical decision-curve analysis is not justified without a decision and defensible thresholds. Subgroup evaluation would strengthen a future transportability study, but this audit does not add a fairness experiment or infer fair deployment from aggregate metrics.

Standards: [TRIPOD+AI, BMJ2024](https://doi.org/10.1136/bmj-2023-078378); [PROBAST+AI, BMJ2025](https://doi.org/10.1136/bmj-2024-082505).

Interview dates independently recovered from `IDATE`: 5January2025–16March2026, in both raw and eligible cohorts, with no unparseable dates. BRFSS 2025 identifies the annual survey release, not an exclusively2025 interview calendar. Evidence: `qc/astra_interview_dates.json`.
