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
| design-study | Gate leakage + cohort design + validation strategy for tabular ML | Added Changelog |
| analyze-stats | Reproducible statistics, separation checks | Added Changelog |
| radiomics-ml | Learner-agnostic gates ONLY (nested CV, calibration) — skip pyradiomics/IBSI | Added Changelog |
| check-reporting | TRIPOD+AI, PROBAST+AI checklists | Added Changelog |
| verify-refs | Verify DOI, claim fidelity via PubMed/CrossRef | Email patch + Changelog |
| self-review | Self-critique of Paper_01 manuscript draft | Added Changelog |
| peer-review | Probe CP1-CP6 + O11 for RoB mini-audit of repository papers | NCKH scope note + Changelog |
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

---

## Manual Update Procedure

  git clone --depth 1 https://github.com/Aperivue/medsci-skills /tmp/medsci-new
  diff /tmp/medsci-new/skills/<skill>/SKILL.md .agents/skills/<skill>/SKILL.md
  # Manually copy + re-apply local modifications + update commit hash above
  # Synchronize mirror to .claude/skills/:
  # python scripts/skills/research_skill_mirror.py --sync

DO NOT use automated installers or updaters (npx, setup-medsci, auto-update hooks).
