# SKILLS_LOCK.md — Third-Party Skill Version Lock

> **Purpose**: Record the provenance, version, and local modifications of every externally installed skill.
> This is the sole canonical lock file of the repository.
> Update this file when adding, removing, or upgrading skills. DO NOT update automatically.

---

## Provenance

| Item | Value |
|-----|---------|
| Repository | https://github.com/Aperivue/medsci-skills |
| Commit hash | d7df5142971efe58ef40b1986711fabc50ebc6ec |
| Branch | main (no semver tags) |
| License | **MIT** — Copyright (c) 2026 Aperivue |
| Install date | 2026-09-21 |
| Next review date | Manual, recommended every 3 months |

---

## Installed Skills (Tier 0)

| Skill | Purpose in Research Project | Local Modifications |
|-------|----------------------------|---------------------|
| define-variables | Repository-native clinical tabular variable operationalization and leakage contract | Repository-native (Round 8); source-first codebook binding, units, coding, missingness, timing, outcome labels, prediction horizon, clinical score integrity, deterministic validator |
| design-study | Gate leakage + cohort design + validation strategy for tabular ML | Added Changelog, R5B tabular ML discovery & context-first routine autonomy |
| analyze-stats | Reproducible statistics, separation checks | Added Changelog, R5A runtime path portability, R5B context-first routine autonomy & optional routes |
| prediction-model-rigor | Repository-native clinical tabular prediction-model rigor (nested CV, fold-safe preprocessing, calibration, DCA, validation, NHANES survey profile) | Derived fork from upstream radiomics-ml (commit d7df514); retired pyradiomics/IBSI/imaging; R6 tabular rigor contract |
| check-reporting | TRIPOD+AI, PROBAST+AI checklists | Added Changelog, R5A runtime path portability, R5B prediction-model discovery & optional routes |
| verify-refs | Verify DOI, claim fidelity via PubMed/CrossRef | Email patch + Changelog, R5A runtime portability + /pdf-fetch mapping, R5B optional-route hardening |
| self-review | Self-critique of Paper_01 manuscript draft | Added Changelog, R5A runtime portability + local target remap, R5B context-first autonomy & optional routes |
| peer-review | Probe CP1-CP6 + O11 for RoB mini-audit of repository papers | NCKH scope note + Changelog, R5A runtime portability, R5B RoB discovery & dual-route architecture |
| polish-language | Consistency linting + ESL clarity | Added Changelog |

---

## Uninstalled Skills (Tier 1 — Install After Paper_01 Results Are Finalized)

| Skill | Installation Condition |
|-------|------------------------|
| write-paper | When T0.16 is done (week 15) |
| search-lit | Concurrently with write-paper |
| manage-refs | Concurrently with write-paper |
| make-figures | Concurrently with write-paper |
| find-journal | When Table 3 is completed (M2) |

---

## Intentionally NOT Installed Skills

| Skill | Reason |
|-------|--------|
| orchestrate | Router references skills not present in repo |
| humanize | Outside research scope |
| fulltext-retrieval | Overlaps with existing pdf-fetch |

---

## Local Modifications (Details)

1. `verify-refs/scripts/verify_refs.py`: replaced default email with `phandienmanhthienk16@siu.edu.vn`
2. `peer-review/SKILL.md`: added NCKH scope section (probe CP1-CP6 + O11 only)
3. All 8 `SKILL.md`: added local Changelog section
4. Round 5A (R5A) runtime portability: remapped unverified ${CLAUDE_SKILL_DIR} and ${MEDSCI_SKILLS_ROOT} assumptions to canonical repository-relative paths (.agents/skills/...) for locally bundled helpers across analyze-stats, check-reporting, peer-review, self-review, and verify-refs.
5. Round 5A (R5A) verify-refs full-text mapping: remapped unavailable upstream /fulltext-retrieval route to installed repository skill /pdf-fetch.
6. Round 5A.1 (R5A.1) bundled resource path portability: normalized Claude-specific bundled-resource paths (${CLAUDE_SKILL_DIR}/references/...) to canonical repository-relative workspace paths (.agents/skills/...) for active runtime/on-demand resources across analyze-stats, check-reporting, peer-review, and self-review.
7. Round 5B (R5B) discovery, optional-route, and routine-autonomy hardening:
   - Description discovery hardening: Updated frontmatter descriptions for check-reporting, design-study, peer-review, radiomics-ml, and self-review to accurately expose repository-relevant clinical prediction model, EHR/NHANES tabular ML, RoB mini-audit (CP1-CP6, O11), and decoupled manuscript review capabilities without requiring uninstalled skills.
   - Peer-review dual-route: Separated internal repository RoB mini-audit (bypasses journal invitation and reviewer COI confirmation) from external journal peer review (preserves full COI and ethics gates).
   - Context-first routine autonomy: Streamlined intake and reversible execution in analyze-stats, design-study, and self-review to infer available context from repository documents and proceed without redundant blocking questions for reversible analysis tasks.
   - Optional companion route hardening: Explicitly declared unavailable upstream companion workflows (/search-lit, /lit-sync, /manage-refs, /sync-submission, /write-paper, /revise, /orchestrate, /find-journal) as optional companion integrations with standalone continuations; no false local equivalence claimed.
   - Scientific and integrity gates preserved: All scientific methodology, CP1-CP6, O11, EQ0-EQ6, G1-G10, leakage definitions, nested CV, calibration, package-installation confirmations, clinical variable definition gates, SSOT singularity, and reference verification gates (FABRICATED blocks submission, UNVERIFIED requires user confirmation) strictly preserved.
8. Round 6 (R6) prediction-model-rigor repository-native transformation:
   - Derived fork provenance: `prediction-model-rigor` is a repository-native skill derived from the generic model-validation rigor portions of upstream `radiomics-ml` (upstream repo: https://github.com/Aperivue/medsci-skills, commit `d7df5142971efe58ef40b1986711fabc50ebc6ec`, MIT License). Upstream identity is preserved for historical provenance without claiming the renamed skill exists upstream.
   - Imaging/radiomics retirement: Fully retired pyradiomics, IBSI, ROI, segmentation, voxel, scanner, phantom, and deep-imaging requirements from the active skill, aligning strictly with repository scope (clinical tabular diabetes prediction on EHR/NHANES/public-health cohorts).
   - Preserved generic model rigor: Retained nested cross-validation, fold-isolated preprocessing (imputation, scaling, encoding), in-fold feature selection, in-fold resampling/balancing, calibration (intercept, slope, curve, Brier score), decision-curve analysis (DCA), and external/temporal validation.
   - Clinical tabular safeguards added: Missing-data contract (skip-pattern vs ordinary missingness, no outcome imputation, fold-safe), event sufficiency & model complexity (no universal EPV>=10 rule; explicit parameter/sample justification), transparent baseline comparators (penalized logistic, established risk scores like FINDRISC/ADA Diabetes Risk Test only when reproducible definitions exist; no silent approximation), threshold selection (prespecified or inner loop only; never tuned on final test/external), class imbalance evaluation without pre-split resampling, and NHANES complex-survey profile (strata, PSU, weights, pooling rules; target estimand/population justification; no universal weighting rule; no PSU/strata as features).
   - Causal claim boundaries: Explicitly declared that model coefficients, feature importance, and SHAP values are predictive associations, not causal effects.
   - Deterministic manifest & gate: Upgraded manifest schema and `check_prediction_model_rigor.py` with tabular clinical gates and automated regression test suite.
9. Round 8 (R8) define-variables repository-native variable operationalization skill:
   - Repository-native implementation: `define-variables` is an original repository-native skill (not imported from Aperivue medsci-skills). It enforces `docs/agent/VARIABLE_CONTRACT.md` and `docs/agent/schemas/variable_definition.schema.json`.
   - Operationalization scope: Converts dataset variables, questionnaire items, and clinical concepts into explicit, source-backed, leakage-aware definitions before modeling or analysis across NHANES, EHR, and other clinical tabular datasets.
   - Invariant enforcement: Distinguishes canonical concepts from cycle-specific source variables, verifies timing (post-index leakage prevention), units, categorical coding, missing sentinels (e.g., 7777/9999), skip logic, outcome label construction, and prediction horizons (cross_sectional, early_detection, long_term_risk).
   - Score integrity & survey design: Prohibits mislabeling proxy clinical risk scores as validated official scores (FINDRISC, ADA Diabetes Risk Test); prevents survey design variables (weights, strata, PSUs) from being fed as ordinary predictive features.
   - Deterministic validation: Bundled `scripts/validate_variable_registry.py` and regression test suite.

---

## Manual Update Procedure

  git clone --depth 1 https://github.com/Aperivue/medsci-skills /tmp/medsci-new
  diff /tmp/medsci-new/skills/<skill>/SKILL.md .agents/skills/<skill>/SKILL.md
  # Manually copy + re-apply local modifications + update commit hash above
  # Synchronize mirror to .claude/skills/:
  # python scripts/skills/research_skill_mirror.py --sync

DO NOT use automated installers or updaters (npx, setup-medsci, auto-update hooks).
