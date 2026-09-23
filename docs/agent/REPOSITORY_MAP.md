# Repository Map and Artifact Topology

## 1. Purpose
This document establishes the canonical structural topology, directory responsibilities, artifact ownership rules, and source-of-truth hierarchy across the repository (`manhthien2005/diabetes-research`). All agents and automated tools must navigate and manipulate filesystem paths strictly according to these contracts.

## 2. Repository Root
The repository root (`<repository-root>/`) is the base workspace directory containing configuration anchors, high-level documentation, and domain roots:
- `AGENTS.md`: The concise, always-loaded repository governance entry point, authority hierarchy, and core operating router.
- `README.md`: Project overview and introductory repository orientation.

## 3. Canonical Research Directories
The core scientific research lifecycle is organized across three designated numbered directory trees:
- `01_Diabetes_Research/`: The comprehensive literature repository, search triage pools, extraction archives, analytical reports, strategic decision logs, and reading lists.
- `02_Implementation/`: Active implementation modules, experimental pipelines, source code, data preprocessing routines, and quality-control audits.
- `03_Final_Result/`: Final deliverable manuscripts, peer-review responses, production figures, and submission-ready assets.

## 4. Agent and Skill Directories
The automation, orchestration, and skill infrastructure is maintained across dedicated roots:
- `.agents/agents/`: Definitions for custom AI agents. Contains `diabetes-research-scientist/agent.md`, the repository's primary custom main scientific orchestrator coordinating specialized skills and enforcing contracts.
- `.agents/skills/`: The sole canonical source of truth for the 14 managed research skills (`analyze-stats`, `check-reporting`, `define-variables`, `design-study`, `paper-analyzer`, `paper-comparator`, `paper-finder`, `pdf-extract`, `pdf-fetch`, `peer-review`, `polish-language`, `prediction-model-rigor`, `self-review`, `verify-refs`) and the authoritative skill version lockfile `SKILLS_LOCK.md`.
- `.claude/skills/`: Generated compatibility mirrors for managed research skills (synchronized automatically from `.agents/skills/` via `scripts/skills/research_skill_mirror.py`), alongside Claude-specific user interface and design skills (`banner-design`, `ui-ux-pro-max`).
- `scripts/skills/`: Automation, synchronization, and verification scripts for skills, including `research_skill_mirror.py` and skill unit tests.
- `scripts/agents/`: Orchestrator validation suites, routing tests, and governance verification scripts.
- `evals/agents/`: Orchestration evaluation assets, scenario definitions, test runner harnesses, and behavioral benchmark fixtures.

## 5. Governance Documents
Canonical research contracts, policies, and formal schemas reside under `docs/agent/`:
- `docs/agent/RESEARCH_CONTRACT.md`: Canonical cross-domain scientific research governance, lifecycle, and invariants.
- `docs/agent/REPOSITORY_MAP.md`: Canonical repository topology, directory ownership, and source-of-truth paths (this document).
- `docs/agent/EVIDENCE_POLICY.md`: Authoritative policy for scientific evidence value, reproducibility assessment, claim support, and literature evaluation.
- `docs/agent/EXPERIMENT_POLICY.md`: Authoritative governance for experiment integrity, fold isolation, leakage prevention, and result immutability.
- `docs/agent/PAPER_SCHEMA.md`: Authoritative schema specification for paper records, candidate roles, reproducibility, and claim provenance.
- `docs/agent/DECISION_AUTHORITY.md`: Authoritative allocation of autonomous agent actions versus actions requiring explicit human approval.
- `docs/agent/VARIABLE_CONTRACT.md`: Authoritative contract for source-backed variable operationalization, units, coding, missingness, and leakage safety.
- `docs/agent/schemas/`: Formal machine-readable JSON schemas validating variable definitions, paper summaries, claim provenance, and triage structures.

## 6. Literature Workflow Locations
Literature assets under `01_Diabetes_Research/` are partitioned by function and lifecycle stage:
- `searched_papers/`: All candidate papers discovered or analyzed by agents or web search, categorized into four Layer directories:
  - `Layer_1_Pipeline_Nen_Tang/`: Preprocessing, missing data, outliers, resampling, feature selection, baseline ML.
  - `Layer_2_Model_Hieu_Qua/`: Model comparisons, ensembles, stacking, boosting, deep tabular, tuning.
  - `Layer_3_Dataset_EHR/`: Real-world EHR cohorts (NHANES, MIMIC, eICU), observational studies, longitudinal data.
  - `Layer_4_XAI_Trien_Khai/`: Explainability (SHAP, LIME), clinical impact, interpretability.
  Each paper folder (`<paper_id>/`) contains:
  - `source.pdf`: Original publication PDF.
  - `metadata.json`: Standardized bibliographic and lifecycle metadata.
  - `extracted.md`: High-fidelity, structured text and tables extracted via `pdf-extract`.
  - `analysis.html`: Standard 8-block Vietnamese analytical appraisal rendered via `paper-analyzer`.
  - `summary.json`: Machine-readable summary for research brief aggregation.
  - `comparison.md`: Comparative evaluation against other papers within the same Layer.
  - `notes.md` and `highlights.json`: User-created personal notes and PDF overlay coordinates managed by the web interface.
- `chosed_papers/`: Storage of original PDFs for papers formally approved and promoted by the human researcher. Serves as the authoritative baseline for all proposed improvements and extensions.
- `docs/`: Analytical syntheses and strategic guides:
  - `RESEARCH_BRIEF.md`: Synthesized research state brief across papers.
  - `RESEARCH_LOOP.html`: Visual overview of the ExploreX research lifecycle.
  - `READING_LIST.md`: Prioritized literature reading lists.
  - `CHEATSHEET.md`: Quick reference guide for ML methodologies and preprocessing.
  - `LEAKAGE_MAP.md`: Classification taxonomy of clinical data leakage violations.
  - `DECISION_BOARD.md`: Promotion and assessment tracking board.
  - `QA_LOG.md`: Strategic guidance log recording methodological questions and foundational principles.
- `search_pool.json`: Working queue of raw search results from ExploreX for agent triage.
- `rejected.json`: Exclusion registry recording papers permanently rejected by human authorization, complete with deduplication keys and explicit rationales.
- `qa_log.json`: Machine-readable status of PDF extraction quality and QA scores.

## 7. Implementation Locations
Experimental code, modeling pipelines, and cohort workflows reside under `02_Implementation/`:
- `Paper_01_NHANES_NoLab/`: Primary active research implementation (No-lab diabetes screening on NHANES):
  - `START_HERE.md`: Rapid orientation guide for authors and agents.
  - `TO_DO.md`: Comprehensive weekly implementation roadmap and tasks.
  - `PROGRESS.json`: Authoritative single source of truth for implementation status, active tasks, Definition of Done, and progress tracking.
  - `src/`: Executable Python source code, preprocessing scripts, and modeling pipelines.
  - `qc/`: Quality-control and audit outputs generated by specialized skills (`design-study`, `prediction-model-rigor`, `peer-review`, `check-reporting`).

## 8. Final-Result Locations
Final research outputs and dissemination deliverables reside under `03_Final_Result/`:
- Manuscript drafts and final LaTeX/Markdown sources.
- High-resolution publication figures and visualization exports.
- Supplementary tables and clinical reporting appendices.

## 9. Web Application Location
The interactive Research Hub / ExploreX platform is located in `web/`:
- `web/src/`: Next.js frontend, UI components, and API routes.
- `web/data/hub.db`: Local SQLite database storing user highlights, notes, and local triage states.
- **Architecture Role**: The web application serves strictly as an interactive user interface; it is not the authoritative source of truth for research data or implementation status. Files on disk govern repository state.

## 10. Generated and Mirrored Artifacts
To maintain consistency, the repository distinguishes source files from generated artifacts:
1. **Skill Mirrors**: `.agents/skills/` is canonical. `.claude/skills/` contains generated mirrors of managed research skills. Editing `.claude/skills/` directly is prohibited; synchronizations must be performed via `scripts/skills/research_skill_mirror.py --sync` and verified with `--check`.
2. **User Notes and Highlights**: `notes.md` and `highlights.json` are written by the web application from direct user action. Agents may read these files to understand user preferences but must never overwrite them.
3. **PDF Extractions**: `extracted.md` is generated by `pdf-extract`. Manual edits are discouraged unless correcting severe OCR defects, documented in extraction logs.

## 11. Source-of-Truth Rules
1. **Implementation Progress**: `02_Implementation/Paper_01_NHANES_NoLab/PROGRESS.json` is the sole authoritative record for project task completion, next steps, and Tier 0/1/2 scope.
2. **Promoted Literature**: `01_Diabetes_Research/chosed_papers/` represents the sole authoritative collection of human-promoted baseline literature.
3. **Variable Definitions**: Official codebooks and frozen project definitions govern variable operationalization per `docs/agent/VARIABLE_CONTRACT.md`.
4. **Research Skills**: `.agents/skills/` is the authoritative source for managed research skills.
5. **Metadata Updates**: Updates to `metadata.json` must use read-modify-write patterns, preserving all existing and unrecognized fields. Fields read by the web application must never be renamed.

## 12. Read-Only Historical Evidence
Historical audit and decision records represent immutable research provenance:
- `01_Diabetes_Research/docs/QA_LOG.md` and `01_Diabetes_Research/qa_log.json`: Append-only records of settled strategic principles. Past entries must never be modified or deleted.
- `01_Diabetes_Research/rejected.json`: Append-only exclusion registry. Existing entries must not be overwritten or purged.
- Historical QC audits in `02_Implementation/*/qc/`: Preserved to maintain traceability of methodological assessments over time.

## 13. Path-Change Policy
1. **Restricted Workspaces**: Agents must operate strictly within standard repository directories defined in this map.
2. **No Arbitrary Top-Level Roots**: Agents must never create new top-level directories without explicit human authorization.
3. **Temporary Files**: Scratch scripts, temporary data files, or transient logs must be placed in the designated agent artifact scratch directory, never committed into canonical research trees.
