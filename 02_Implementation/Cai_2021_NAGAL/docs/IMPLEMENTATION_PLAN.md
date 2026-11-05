# Cai NAGALA reconstruction implementation plan

Goal: one versioned modular Python pipeline, executed privately on Kaggle CPU, with an auditable comparison to Cai 2021.
Spec: RECONSTRUCTION_SPEC.md. Human requested autonomous execution; work stays in this single checkout on the existing codex branch.

1. [x] Audit workbook safely from ZIP, checksum, sheets, missingness, duplicates, source units/codes; record cohort and registry. Verify observed coding against primary aggregate counts.
2. [x] Test leakage guards, cohort boundary, early censoring, train-only transforms, and saved Cox probability recovery. Implement audit/model/evaluation modules; keep test sealed until source/config freeze.
3. [x] Prepare a thin notebook from the same Git source. Verify Kaggle account, upload only to new resources (initially private; human later explicitly authorized public resources), run CPU, monitor to terminal status and download outputs/logs.
4. [x] Validate output provenance, compare reported and reconstructed results, write Vietnamese explanation and resumable PROGRESS.json. Run module and repository governance checks; commit only explicit paths.

Review focus: sex-header conflict; missing values in one HDL unit column; ZIP contents and duplicate IDs; censoring before five years; absolute Cox risk requires centering and baseline survival. No test-guided decisions or synthetic results reported as NAGALA.

Completed: audit, protocol revision2, successful Kaggle attempt3/version1, verified read-back, report and checkpoint. Failed attempts preserved and confirmed pre-test.
