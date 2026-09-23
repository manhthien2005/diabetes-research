# Canonical Research Contract and Scientific Governance

## 1. Purpose and Authority
This document establishes canonical cross-domain scientific governance for all AI agents, automated pipelines, and human collaborations in this repository. It defines research invariants, lifecycle stages, hypothesis discipline, provenance standards, and contract delegations. On scientific questions, this contract operates under the repository authority hierarchy defined in `AGENTS.md` and delegates specialized domains to canonical contracts without redefining their core schemas.

## 2. Repository Research Mission
The repository's sole scientific topic is **diabetes prediction and staging** on tabular and electronic health record (EHR) data.
1. **Label Types in Scope**:
   - **Binary classification (primary)**: Prediction of diabetes presence versus absence.
   - **Multi-class ordinal glycemic staging**: Staging along the continuum of Normal → Prediabetes → Diabetes according to American Diabetes Association (ADA) clinical thresholds. Staging is accepted strictly when leakage-safe: label-defining biomarkers (HbA1c, FPG, 2-h OGTT) must never serve as input features for contemporaneous prediction, or the task must be explicitly formulated as future stage progression.
2. **Prediction Horizons**:
   - `cross_sectional`: Contemporaneous detection of current undiagnosed diabetes from baseline features ($\Delta t = 0$).
   - `early_detection`: Opportunistic screening and risk identification in asymptomatic or subclinical populations prior to diagnostic presentation.
   - `long_term_risk`: Multi-year incidence forecasting ($t_0$ to $t_0 + N$ years) requiring longitudinal cohort follow-up and confirmed event-free baseline status.
3. **Technical Contribution Layers**:
   - `Layer 1 (Pipeline_Nen_Tang)`: Preprocessing, missing data handling, outlier detection, resampling/SMOTE, feature selection, and baseline ML.
   - `Layer 2 (Model_Hieu_Qua)`: Model comparisons, ensembles, stacking, gradient boosting, deep tabular architectures, and hyperparameter optimization.
   - `Layer 3 (Dataset_EHR)`: Real-world EHR cohorts (NHANES, MIMIC, eICU, UK Biobank), observational cohorts, and longitudinal records.
   - `Layer 4 (XAI_Trien_Khai)`: Explainable AI (SHAP, LIME), model interpretability, clinical decision support, and translation.
4. **Out of Scope (Strictly Rejected)**: Diabetic retinopathy or image-based models, high-frequency continuous glucose monitor (CGM) signal processing, Type 1 diabetes autoimmune staging (Insel 2015), genomics without predictive modeling, and purely descriptive epidemiology without risk prediction.

## 3. Source-First Principle
1. **Source Outranks Documentation**: Working code, execution scripts, data dictionaries, and active configuration files outrank stale plans, planning documents, or conversational memory when ascertaining current implementation state.
2. **Inspection Before Assertion**: Before claiming that an experiment, pipeline, variable definition, or paper analysis exists or behaves in a certain manner, agents must directly inspect the underlying filesystem source.
3. **No Phantom Implementations**: Agents must never assume an unverified function, class, script, or directory exists based on past conversational patterns.

## 4. Research Lifecycle
The repository organizes scientific work into four coordinated lifecycle phases:
1. **Literature Discovery and Evidence Appraisal**: Search, fetch, structured extraction (`extracted.md`), 8-block deep analysis (`analysis.html`), machine-readable summaries (`summary.json`), and comparative synthesis (`comparison.md`). Evaluates evidence value independently from reproducibility per `docs/agent/EVIDENCE_POLICY.md`.
2. **Variable Operationalization and Protocol Definition**: Source-backed codebook mapping, physical unit alignment, category encoding, missing sentinel handling, timing isolation, and composite label specification per `docs/agent/VARIABLE_CONTRACT.md`.
3. **Study Design and Experiment Execution**: Cohort eligibility, target population bounds, fold-isolated preprocessing, nested cross-validation, calibration assessment, and decision curve analysis per `docs/agent/EXPERIMENT_POLICY.md`.
4. **Manuscript Synthesis and Scientific Auditing**: Evidence verification, reference integrity audits, reporting guideline checks (TRIPOD+AI, PROBAST+AI, STROBE), risk-of-bias audits, and publication deliverables.

## 5. Hypothesis and Research-Question Governance
1. **Explicit Pre-Specification**: Core research questions, target populations, primary clinical endpoints, and directional hypotheses must be explicitly recorded before final model training or statistical evaluation.
2. **Frozen Hypothesis Protection**: Once a research hypothesis, target outcome, or cohort scope is approved and designated as frozen (e.g., in `QA_LOG.md` or `PROGRESS.json`), agents must not alter, soften, or reframe it to align with unexpected experimental results.
3. **Modifications Require Human Authority**: Any alteration to a frozen research hypothesis, primary endpoint definition, positive-class threshold, or inclusion/exclusion criterion requires explicit human approval per `docs/agent/DECISION_AUTHORITY.md`.

## 6. Scientific Invariants
The following rules are non-negotiable across all repository activities:
1. **Anti-Hallucination**: Never fabricate scientific facts, empirical metrics, cohort statistics, variables, citations, DOIs, page numbers, or code APIs.
2. **Leakage Prohibition**: Never permit post-index features, label-defining components, or future information to enter candidate predictor spaces.
3. **Evaluation Isolation**: Never evaluate models on training data, never tune hyperparameters or select features on final test sets, and never optimize decision thresholds on external validation cohorts.
4. **Validation Honesty**: Never mischaracterize random internal data splits as external validation.
5. **Calibrated Association**: Never equate predictive association, feature importance, or SHAP values with causal effects.

## 7. Data Provenance and Traceability
1. **Data Lineage**: Every dataset utilized in analysis or modeling must be traceable to official source repositories (e.g., CDC/NCHS for NHANES, PhysioNet for MIMIC), declaring specific release cycles or version snapshots.
2. **Codebook Grounding**: Variable semantics must derive from official data dictionaries and codebooks rather than column names or intuitive assumptions.
3. **Metric Provenance**: Every quantitative figure cited in analyses, briefs, or manuscripts must record its exact source location (table, figure, page, or script output). Missing provenance must be explicitly recorded as `UNKNOWN`.

## 8. Reversibility and Auditability
1. **Audit Trails**: All analytical steps, extraction quality checks (`extraction_report.json`), risk-of-bias probes, and review audits must generate persistent, inspectable artifacts.
2. **Append-Only History**: Historical strategic decisions (`QA_LOG.md`), test records (`qa_log.json`), and exclusion registries (`rejected.json`) are immutable audit logs. New entries are appended; past rationales are never deleted or retroactively rewritten.
3. **Non-Destructive Regeneration**: When regenerating analyses or reports, historical versions must not be silently destroyed if auditability is required (e.g., creating `analysis.v2.html` or archiving prior extracts).

## 9. Unknown and Uncertainty Handling
1. **Explicit Missingness**: When an empirical value, publication year, sample size, or metric is omitted or unverified in source literature, it must be recorded explicitly as `UNKNOWN` or `null`.
2. **No Estimation Imputation**: Agents must never guess, estimate, or interpolate unverified figures to complete tables or summaries.
3. **Uncertainty Propagation**: Statistical estimates must report appropriate uncertainty intervals (e.g., 95% confidence intervals, interquartile ranges) where scientifically warranted, particularly under complex survey sampling.

## 10. Reproducibility Expectations
1. **Separation from Evidence**: Feasibility of code or data replication is evaluated independently from scientific evidence value. A closed-access clinical cohort study may provide vital epidemiological evidence despite restricted reproducibility.
2. **Multi-Dimensional Appraisal**: Reproducibility is appraised across dataset accessibility, source code availability, methodological operationalization, and variable mapping feasibility per `docs/agent/PAPER_SCHEMA.md`.
3. **Deterministic Scripts**: Computational pipelines must set explicit random seeds, declare dependencies, and output reproducible logs.

## 11. Cross-Domain Validation Expectations
1. **Statistical and Clinical Coherence**: Statistical models must respect clinical reality. Extreme outliers, physiologically impossible values, and structural questionnaire skips must be handled with domain-informed rules rather than generic blind heuristics.
2. **Complex Survey Discipline**: Analyses utilizing complex probability samples (such as NHANES) must properly incorporate sampling weights (`WTMEC2YR`), stratification (`SDMVSTRA`), and primary sampling units (`SDMVPSU`) when reporting population-level prevalence or screening performance.
3. **Reporting Compliance**: Manuscripts and study protocols must align with applicable reporting standards (TRIPOD+AI for prediction models, PROBAST+AI for risk of bias, STROBE for observational studies).

## 12. Scientific Claim Discipline
1. **Support Taxonomy**: Factual assertions drawn from literature or empirical pipelines must declare calibrated support levels (`direct`, `partial`, `contextual`, `unsupported`) per `docs/agent/EVIDENCE_POLICY.md`.
2. **Visibility of Negative Findings**: Negative results, model failures, lack of statistical significance, and poor calibration must be reported transparently and never suppressed to favor a preferred conclusion.
3. **Comparative Rigor**: When proposing algorithmic improvements or pipeline upgrades, comparisons must be anchored against human-approved baseline studies in `01_Diabetes_Research/chosed_papers/` rather than generic or unvetted baselines.

## 13. Contract Delegation
Detailed operational standards across specific domains are formally delegated to canonical contracts:
- **Decision Authority and Human Approval Boundaries**: Governed authoritatively by `docs/agent/DECISION_AUTHORITY.md`.
- **Literature Evidence, Claim Support, and Discovery Policy**: Governed authoritatively by `docs/agent/EVIDENCE_POLICY.md`.
- **Paper Record Schema, Reproducibility, and Provenance Formats**: Governed authoritatively by `docs/agent/PAPER_SCHEMA.md`.
- **Variable Operationalization, Units, Missingness, and Timing**: Governed authoritatively by `docs/agent/VARIABLE_CONTRACT.md`.
- **Experiment Integrity, Data Isolation, and Leakage Prevention**: Governed authoritatively by `docs/agent/EXPERIMENT_POLICY.md`.
- **Repository Topology, Artifact Ownership, and Canonical Paths**: Governed authoritatively by `docs/agent/REPOSITORY_MAP.md`.
