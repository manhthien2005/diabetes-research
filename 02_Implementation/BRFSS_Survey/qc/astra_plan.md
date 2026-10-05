# Independent final audit execution plan

**Goal:** independently verify the BRFSS benchmark, correct reviewable defects, preserve the frozen experiment, and deliver the four requested ASTRA reports.

**Specification:** human request `independent_final_research_audit_and_upgrade`, supplied 2026-10-04. Worktree: `review/brfss-astra-final`; starting HEAD `aa2e53cd0826475e76be7921ffa01497efbe7fc3`; immutable reference `a2a0ba498919fa8c96a1bf8b491ee81b496b5f32`.

**Architecture:** evidence reconstruction from Git, official primary sources, the original XPT, and archived respondent predictions. Audit scripts live in this QC directory; publication diagnostics and four handoff documents live under `03_Final_Result/BRFSS_2025`. No model refitting, retrospective tuning, raw-data commits, or alteration of frozen numbers.

## Tasks and evidence gates

- [x] Verify local and remote refs, clean start, changes since freeze; run original rigor/static gates and governance tests before fixes.
- [x] Read executable code and compare estimator arguments and code AST against the archived execution revision.
- [x] Independently verify official dataset, XPT descriptors, counts, recodes, identifiers and exact split; produce aggregate participant characteristics.
- [x] Recompute metrics, exact paired tests and calibration; independently replicate bootstrap and evaluate Monte Carlo/multiplicity limitations.
- [x] Verify reference metadata and material claims; audit reporting subitems.
- [x] Record ranked issue ledger and pre-fix rubric before material corrections.
- [x] Correct authoritative reporting, provenance, plot labels and review workflow; preserve historical evidence.
- [x] Add focused release validation: incorrect branch checkout, mutated scientific code, duplicate/invalid supplement rows, missing evidence, and known-invalid temporary outputs must not silently pass.
- [x] Verify diagnostic calculations/figures, run original and strengthened gates/tests, record post-fix score and remaining scientific limitations.
- [x] Commit only intended files locally; record commit without a self-referential hash; verify clean tracked/untracked state and unchanged freeze ref. No push or merge.

## Baseline verification (before corrections)

Original pre-submission static block: PASS, one notebook, 57 compiled code cells, unique IDs, six calibration rows and six robustness rows. Original declarative rigor gate: exit 0 with `NO_EXTERNAL_VALIDATION` minor warning. Skill mirrors: 14/14 parity. Agent/governance tests: 104 passed. Skill/governance tests: 49 passed (intentional failure fixtures print diagnostic messages). Scope gate: PASS. Classical-style advisory: one percentage precision flag, deferred to target-journal style.

All seven documented learning-parameter sets match frozen JSON configurations; XGBoost additionally sets logging-only verbosity=0. The 57 code-cell ASTs match execution revision `b2e658a8f87a622b575df743e229dc943d35936c`; no scientific code drift was found at intake. No fitted pipelines were saved in the 93-file execution artifact. Sequential Git history does not establish joint prespecification before the first test result was viewed.

Final handoff Git status is verified immediately after creating the local audit commit; see the final chat for its exact hash. All computational and reporting gates were completed before staging.
