# Challenge — clinical prediction-model pipeline-rigor gate

A clinical prediction-model study (features → penalized logistic / random forest / XGBoost → clinical outcome)
is trustworthy only with nested CV, fold-isolated preprocessing, in-fold feature selection,
calibration, threshold discipline, baseline comparison, and external validation. Given a declarative pipeline
manifest (JSON), `check_prediction_model_rigor.py` must decide — by rule, not from prose — whether
the pipeline meets that bar.

## Task
Run the gate on the two synthetic manifests in `fixture/` and reproduce `expected/`:

- `pipeline_weak.json` → Major verdicts (`NO_NESTED_CV`, `SELECTION_OUTSIDE_CV`, `PREPROCESSING_LEAKAGE`,
  `IMBALANCE_RESAMPLING_OUTSIDE_CV`, `THRESHOLD_TUNED_ON_TEST`, `HIGH_DIM_LOW_EVENTS`) plus Minor verdicts
  (`NO_CALIBRATION`, `NO_EXTERNAL_VALIDATION`, `NO_BASELINE_COMPARATOR`); exit 1 under `--strict`.
- `pipeline_strong.json` → no claims; exit 0.

## Verify
```bash
bash verify.sh   # deterministic, network-free
```
