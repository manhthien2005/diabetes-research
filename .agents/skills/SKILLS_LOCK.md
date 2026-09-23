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
| design-study | Gate leakage + cohort design + validation strategy for tabular ML | Added Changelog, R5B tabular ML discovery & context-first routine autonomy |
| analyze-stats | Reproducible statistics, separation checks | Added Changelog, R5A runtime path portability, R5B context-first routine autonomy & optional routes |
| radiomics-ml | Learner-agnostic gates ONLY (nested CV, calibration) — skip pyradiomics/IBSI | Added Changelog, R5B tabular clinical-ML discovery rebalancing |
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
| define-variables | When T1.3 begins |

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

---

## Manual Update Procedure

  git clone --depth 1 https://github.com/Aperivue/medsci-skills /tmp/medsci-new
  diff /tmp/medsci-new/skills/<skill>/SKILL.md .agents/skills/<skill>/SKILL.md
  # Manually copy + re-apply local modifications + update commit hash above
  # Synchronize mirror to .claude/skills/:
  # python scripts/skills/research_skill_mirror.py --sync

DO NOT use automated installers or updaters (npx, setup-medsci, auto-update hooks).
