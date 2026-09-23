# AGENTS.md — Repository Governance and Agent Operating Conventions

> Concise always-loaded operating entry point for all AI agents working in this repository (`manhthien2005/diabetes-research`).
> On conflict: Current human instruction > `docs/agent/DECISION_AUTHORITY.md` > Domain Canonical Contracts > `AGENTS.md` > `SKILL.md`.

---

## 1. Repository Mission
- **Sole Topic**: Diabetes prediction and staging on tabular and electronic health record (EHR) data.
- **Label Types in Scope**:
  - `binary` (primary): Diabetes presence versus absence.
  - `multiclass_staging`: Normal → Prediabetes → Diabetes according to ADA thresholds (HbA1c/FPG/OGTT). Accepted strictly when leakage-safe: label-defining biomarkers must never serve as candidate predictors, or the task must be framed as future stage progression.
- **Prediction Horizons**:
  - `cross_sectional`: Predicting current diabetes status from contemporaneous features ($\Delta t = 0$, e.g., opportunistic screening on PIMA, BRFSS, NHANES).
  - `early_detection`: Early detection in asymptomatic, undiagnosed, or pre-symptomatic individuals.
  - `long_term_risk`: Multi-year incidence forecasting ($t_0$ to $t_0 + N$ years) requiring longitudinal cohort follow-up.
  - *Assignment Rule*: Follow the problem framing set by the paper/study itself; if uncertain, default to `cross_sectional`.
- **4 Technical Layers**:
  - `Layer 1 (Pipeline_Nen_Tang)`: Preprocessing, missing data, outliers, resampling (SMOTE), feature selection, baseline ML.
  - `Layer 2 (Model_Hieu_Qua)`: Model comparisons, ensembles, stacking, boosting (XGBoost, LightGBM, CatBoost), deep tabular.
  - `Layer 3 (Dataset_EHR)`: Real-world EHR cohorts (NHANES, MIMIC, eICU, UK Biobank), observational data, longitudinal records.
  - `Layer 4 (XAI_Trien_Khai)`: Explainable AI (SHAP, LIME), clinical utility, interpretability, and deployment.
- **Out of Scope (REJECT)**: Retinopathy, CGM time-series, image/signal modalities, Type 1 diabetes immune staging (Insel 2015), genomics without predictive modeling, and non-predictive epidemiological tasks. Detailed research governance lives in `docs/agent/RESEARCH_CONTRACT.md`.

## 2. Authority Hierarchy
When conflicting instructions or documentation arise, resolve strictly in descending order:
1. User's explicit current instructions and human approvals (cannot waive non-negotiable anti-fabrication or safety gates).
2. `docs/agent/DECISION_AUTHORITY.md`: Authoritative for irreversible decisions, binding governance, and frozen parameters.
3. Domain Canonical Contracts: `docs/agent/RESEARCH_CONTRACT.md`, `docs/agent/REPOSITORY_MAP.md`, `docs/agent/EVIDENCE_POLICY.md`, `docs/agent/EXPERIMENT_POLICY.md`, `docs/agent/PAPER_SCHEMA.md`, and `docs/agent/VARIABLE_CONTRACT.md`.
4. `AGENTS.md`: Repository-wide operating governance, entry point, routing pointers, and operating rules.
5. Selected `SKILL.md`: Procedural execution guides (cannot override canonical contracts or decision boundaries).
6. Other repository documentation and historical logs (document past states; current source and contracts govern).

## 3. Source-First Startup
1. Inspect repository state (`git status --short`) before modifying files. Current source code outranks stale documentation or memory.
2. Read `AGENTS.md` and only the specific canonical contracts required for the task. Never load all contracts or skills indiscriminately.
3. Orientation sequence: `02_Implementation/Paper_01_NHANES_NoLab/START_HERE.md` → `PROGRESS.json` (implementation source of truth, default Tier 0) → `01_Diabetes_Research/docs/CHEATSHEET.md` → `TO_DO.md` → `01_Diabetes_Research/docs/QA_LOG.md` (strategic decisions log).
4. Stop and ask the user when missing source evidence materially changes an irreversible decision.

## 4. Canonical Contracts
Detailed repository governance is formally codified in seven authoritative contracts:
- `docs/agent/RESEARCH_CONTRACT.md`: Research lifecycle, scientific invariants, hypotheses, and claim discipline.
- `docs/agent/REPOSITORY_MAP.md`: Canonical paths, directory responsibilities, artifact ownership, and source-of-truth rules.
- `docs/agent/EVIDENCE_POLICY.md`: Scientific evidence value, separation from reproducibility, claim support, and literature evaluation.
- `docs/agent/EXPERIMENT_POLICY.md`: Experiment lifecycle, split isolation, leakage prevention, calibration, and result immutability.
- `docs/agent/PAPER_SCHEMA.md`: Canonical paper record schema, candidate roles, reproducibility assessment, and claim provenance.
- `docs/agent/DECISION_AUTHORITY.md`: Formal boundaries between autonomous agent actions and actions requiring human approval.
- `docs/agent/VARIABLE_CONTRACT.md`: Variable operationalization, codebook bindings, units, missing sentinels, timing, and labels.

## 5. Critical Scientific Invariants
- **Anti-Hallucination**: Never fabricate scientific facts, variables, citations, DOIs, page locations, statistical results, APIs, or repository state. Missing or unverified values must remain `UNKNOWN` or `null`.
- **Evidence vs. Reproducibility**: Scientific evidence value and practical reproducibility are orthogonal dimensions. A study may be an `evidence_candidate`, `reproduction_candidate`, both, or neither (`docs/agent/EVIDENCE_POLICY.md`). Citation count is a discovery signal only, never a truth gate.
- **Claim-Level Provenance**: Empirical claims must record exact location (`section`, `table`, `page`) and support level (`direct`, `partial`, `contextual`, `unsupported`). Unsupported claims must remain visible in audit trails.
- **Variable & Timing Integrity**: Unresolved variable definitions route to `define-variables` and `docs/agent/VARIABLE_CONTRACT.md`. Post-index leakage (features measured after index time $t_0$) and outcome leakage (label components in predictors) are strictly prohibited.
- **Experiment & Test Isolation**: Leakage and final-test contamination are prohibited (`docs/agent/EXPERIMENT_POLICY.md`). Learned preprocessing, feature selection, and resampling must be fold-isolated. Never tune hyperparameters or optimize thresholds on final test sets.
- **Survey Design Awareness**: On complex survey cohorts (NHANES), always account for survey weights (`WTMEC2YR`), strata (`SDMVSTRA`), and primary sampling units (`PSU`). Never use strata or PSU as predictive features.
- **Validation Honesty**: Random holdout from the same cohort is an internal test set, never external validation.

## 6. Decision Authority Summary
Per `docs/agent/DECISION_AUTHORITY.md`, human approval for irreversible actions is strictly mandatory for:
1. Promoting a paper to `01_Diabetes_Research/chosed_papers/`.
2. Permanently rejecting a paper into `01_Diabetes_Research/rejected.json`.
3. Deleting research evidence, data, extracts, or repository artifacts.
4. Modifying a frozen hypothesis, frozen outcome or label, frozen cohort, or prediction horizon.
5. Accepting compromises that lower scientific rigor or handling restricted private data.
When reaching an action requiring human approval, agents synthesize findings into an advisory `recommended_action` (`promote`, `retain_in_pool`, `exclude_from_current_scope`, `reject_with_human_review`, `needs_more_review`), state the rationale, and halt. Agents must never simulate or assume human approval; `decision_state` remains `recommendation_ready` until the user explicitly commands the transition.

## 7. Repository Path Summary
Follow `docs/agent/REPOSITORY_MAP.md` for directory ownership:
- `01_Diabetes_Research/`: Literature repository (`searched_papers/`, `chosed_papers/`, `docs/`, `search_pool.json`, `rejected.json`, `qa_log.json`).
- `02_Implementation/`: Active implementation modules (`Paper_01_NHANES_NoLab/` with `PROGRESS.json`, `src/`, `qc/`).
- `03_Final_Result/`: Final deliverable manuscripts, figures, and publication packages.
- `web/`: Research Hub Next.js application (filesystem interface; `hub.db` stores user notes and highlights; disk is source of truth).
- `scripts/`: Tooling and synchronization (`scripts/skills/`, `scripts/agents/`, `evals/agents/`).

## 8. Skill and Orchestrator Routing
- **Primary Scientific Orchestrator**: `diabetes-research-scientist` (`.agents/agents/diabetes-research-scientist/agent.md`) is the repository custom main orchestrator coordinating research workflows across 14 managed skills.
- **Canonical Skills and Managed Skill Mirrors**: `.agents/skills` is the sole canonical source of truth for all 14 managed research skills, with `.agents/skills/SKILLS_LOCK.md` as the authoritative lock file. `.claude/skills` contains generated compatibility mirrors maintained via `python scripts/skills/research_skill_mirror.py --sync` and verified with `--check`.
- **Specialized Research Skills**:
  - Literature Discovery & Extraction: `paper-finder`, `pdf-fetch`, `pdf-extract`.
  - Evidence Analysis & Comparison: `paper-analyzer`, `paper-comparator`.
  - Clinical Data & Design: `define-variables`, `design-study`.
  - Modeling & Statistics: `prediction-model-rigor`, `analyze-stats`.
  - Quality, Rigor & Manuscript: `verify-refs`, `check-reporting`, `polish-language`, `self-review`, `peer-review`.
- **Skill Outputs and Baselines**: QC outputs generated by skills write to `02_Implementation/<Paper_XX>/qc/`. Skills have no authority to write to `01_Diabetes_Research/chosed_papers/`.
- **No Active Radiomics Routing**: The retired radiomics-ml skill is deprecated and must not be routed or revived.

## 9. Language and Artifact Conventions
- **Human-Facing Communication**: User-facing communication defaults to Vietnamese where applicable, retaining English technical terms in parentheses where helpful.
- **Machine-Facing Artifacts**: Repository code, configuration, commit messages, schemas, system prompts, and governance documents remain in English.
- **Paper Identification**: In discussions and notes, reference literature by canonical `paper_id` (`<lastname><year>_<slug>`).

## 10. Git and Mutation Safety
- Inspect working tree state before editing (`git status --short`). Stage only explicit, intended file paths (`git add <file>`).
- **Forbidden Git Commands**: Absolute git add . prohibition and git add -A prohibition apply to all agents. Never use `git add .` or `git add -A`. Never stage unrelated work.
- Create focused, atomic commits with informative conventional commit messages.

## 11. Validation Before Claims
- Do not claim success without validation. Run applicable verification suites before declaring task completion.
- Verify reference integrity against PubMed/CrossRef (`verify-refs`), flagging any FABRICATED, MISMATCH, or UNVERIFIED citations.
- Validate machine-readable outputs against schemas in `docs/agent/schemas/`.
- Run automated unit tests (`python scripts/skills/research_skill_mirror.py --check`, orchestrator tests, governance tests) after modifications.

## 12. Stop Conditions
Agents must immediately halt execution and request user guidance when:
1. An action requires human approval (promotion, permanent rejection, deletion, or changing frozen parameters).
2. A critical source, codebook, or paper text cannot be verified.
3. Unresolvable data leakage or severe methodology flaws are discovered.
4. Unknown files or directories appear outside the canonical repository map.
