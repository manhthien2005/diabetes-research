# BRFSS 2025 Model Artifacts

This directory contains **frozen historical model/config/result records**.

## Authoritative submission sources

Use these for current interpretation:

1. `../kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb`
2. `../docs/STUDY_AUDIT.md`
3. `../docs/primary_benchmark_summary.md`
4. `../docs/PRE_SUBMISSION_BOARD_REVIEW.md`

## Historical-record rules

Older per-model Markdown files preserve the state of the project when each model was frozen. They may mention:
- a “next model” or “next comparison phase”;
- dedicated model notebooks that were later consolidated;
- five-fold “95% t-intervals” that were later removed from authoritative reporting.

Those statements are **historical**, not the current reporting protocol.

### Metric semantic amendment

Legacy JSON/CSV/Markdown fields named `pr_auc` were computed with scikit-learn `average_precision_score`.

Therefore:

> `pr_auc` (legacy machine key) = **Average Precision (AP)**

It is **not** trapezoidal area under the precision-recall curve.

Frozen numeric values are retained unchanged for provenance.

## Immutability

Do not overwrite frozen model values to make later reporting cleaner. Corrections to interpretation belong in current audit/submission documents or versioned new experiments.
