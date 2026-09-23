#!/usr/bin/env bash
# Regression test for the clinical prediction-model pipeline-rigor gate (prediction-model-rigor).
# Synthetic, PII-free JSON manifests reproduce each verdict class + suppressions.
# Stdlib-only (python3).
set -u

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$HERE/../scripts/check_prediction_model_rigor.py"
CH="$HERE/../scripts/check_prediction_model_rigor_challenge"
TMP="$(mktemp -d -t predml_XXXX)"
OUT="$TMP/out.json"
trap 'rm -rf "$TMP"' EXIT

fail=0
check() { local label="$1"; shift
    if "$@" >/dev/null 2>&1; then printf '  PASS  %s\n' "$label"
    else printf '  FAIL  %s\n' "$label"; fail=$((fail+1)); fi
}
has_verdict() { python3 -c "
import json,sys
d=json.load(open('$OUT', encoding='utf-8'))
assert any(c['verdict']=='$1' for c in d['claims']), '$1 not found in ' + str([c['verdict'] for c in d['claims']])
"; }
no_verdict() { python3 -c "
import json,sys
d=json.load(open('$OUT', encoding='utf-8'))
assert not any(c['verdict']=='$1' for c in d['claims']), '$1 unexpectedly present'
"; }

[[ -f "$SCRIPT" ]] || { echo "ENV-ERR: script missing" >&2; exit 2; }

# (1) weak fixture -> Major verdicts + exit 1
python3 "$SCRIPT" --manifest "$CH/fixture/pipeline_weak.json" --out "$OUT" --strict --quiet >/dev/null 2>&1
check "exit 1 (weak pipeline)" test "$?" -eq 1
check "NO_NESTED_CV detected" has_verdict NO_NESTED_CV
check "HIGH_DIM_LOW_EVENTS detected" has_verdict HIGH_DIM_LOW_EVENTS
check "SELECTION_OUTSIDE_CV detected" has_verdict SELECTION_OUTSIDE_CV
check "PREPROCESSING_LEAKAGE detected" has_verdict PREPROCESSING_LEAKAGE
check "IMBALANCE_RESAMPLING_OUTSIDE_CV detected" has_verdict IMBALANCE_RESAMPLING_OUTSIDE_CV
check "THRESHOLD_TUNED_ON_TEST detected" has_verdict THRESHOLD_TUNED_ON_TEST
check "NO_CALIBRATION detected" has_verdict NO_CALIBRATION
check "NO_EXTERNAL_VALIDATION detected" has_verdict NO_EXTERNAL_VALIDATION
check "NO_BASELINE_COMPARATOR detected" has_verdict NO_BASELINE_COMPARATOR

# (2) strong fixture -> exit 0, no claims
python3 "$SCRIPT" --manifest "$CH/fixture/pipeline_strong.json" --strict --quiet >/dev/null 2>&1
check "exit 0 (strong pipeline)" test "$?" -eq 0

# (3) preprocessing leakage failure isolation test
cat > "$TMP/prepleak.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "nested", "preprocessing_stage": "outside_cv", "feature_selection_stage": "inside_cv",
  "dimensionality_reduction": true, "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "xgboost"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/prepleak.json" --out "$OUT" --strict --quiet >/dev/null 2>&1
check "exit 1 on preprocessing leakage" test "$?" -eq 1
check "PREPROCESSING_LEAKAGE detected alone" has_verdict PREPROCESSING_LEAKAGE

# (4) feature selection before split failure isolation test
cat > "$TMP/selfail.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "nested", "preprocessing_stage": "inside_cv", "feature_selection_stage": "before_split",
  "dimensionality_reduction": true, "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "xgboost"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/selfail.json" --out "$OUT" --strict --quiet >/dev/null 2>&1
check "exit 1 on feature selection before split" test "$?" -eq 1
check "SELECTION_OUTSIDE_CV detected alone" has_verdict SELECTION_OUTSIDE_CV

# (5) threshold tuned on test failure isolation test
cat > "$TMP/threshtest.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "nested", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "tuned_on_test", "dimensionality_reduction": true,
  "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "random_forest"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/threshtest.json" --out "$OUT" --strict --quiet >/dev/null 2>&1
check "exit 1 on threshold tuned on test" test "$?" -eq 1
check "THRESHOLD_TUNED_ON_TEST detected alone" has_verdict THRESHOLD_TUNED_ON_TEST

# (6) external validation mislabel detection (random split claimed as external)
cat > "$TMP/mislabel_ext.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "nested", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "inner_cv", "dimensionality_reduction": true,
  "calibration_reported": true, "external_validation": "yes",
  "external_validation_type": "random_split",
  "baseline_comparator": "logistic_regression", "model": "random_forest"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/mislabel_ext.json" --out "$OUT" --strict --quiet >/dev/null 2>&1
check "exit 1 on mislabeled external validation" test "$?" -eq 1
check "INVALID_EXTERNAL_VALIDATION detected" has_verdict INVALID_EXTERNAL_VALIDATION

# (7) missing calibration warning isolation test
cat > "$TMP/nocalib.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "nested", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "inner_cv", "dimensionality_reduction": true,
  "calibration_reported": false, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "random_forest"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/nocalib.json" --out "$OUT" --quiet >/dev/null 2>&1
check "NO_CALIBRATION detected" has_verdict NO_CALIBRATION

# (8) survey design metadata warning when NHANES population claims are made without design metadata
cat > "$TMP/survey_missing.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 3000, "n_events": 400,
  "cv_scheme": "nested", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "inner_cv", "dimensionality_reduction": true,
  "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "random_forest",
  "survey_design": {
    "population_representative_claimed": true
  }
}
EOF
python3 "$SCRIPT" --manifest "$TMP/survey_missing.json" --out "$OUT" --quiet >/dev/null 2>&1
check "MISSING_SURVEY_DESIGN detected when design metadata missing" has_verdict MISSING_SURVEY_DESIGN

# (9) dimensionality_reduction=true suppresses HIGH_DIM_LOW_EVENTS
cat > "$TMP/dimred.json" <<'EOF'
{
  "task": "classification", "n_features": 1000, "n_events": 30, "n_samples": 200,
  "cv_scheme": "nested", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "inner_cv", "dimensionality_reduction": true,
  "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "lasso_logistic"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/dimred.json" --out "$OUT" --quiet >/dev/null 2>&1
check "dim-reduction suppresses HIGH_DIM_LOW_EVENTS" no_verdict HIGH_DIM_LOW_EVENTS

# (10) single_split is an acceptable validation scheme (no NO_NESTED_CV)
cat > "$TMP/single.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "single_split", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "inner_cv", "dimensionality_reduction": true,
  "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "random_forest"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/single.json" --out "$OUT" --quiet >/dev/null 2>&1
check "single_split does NOT fire NO_NESTED_CV" no_verdict NO_NESTED_CV
python3 "$SCRIPT" --manifest "$TMP/single.json" --strict --quiet >/dev/null 2>&1
check "exit 0 on rigorous single-split pipeline" test "$?" -eq 0

# (11) cv_scheme none -> NO_NESTED_CV (no validation at all)
cat > "$TMP/nocv.json" <<'EOF'
{
  "task": "classification", "n_features": 15, "n_samples": 1000, "n_events": 200,
  "cv_scheme": "none", "preprocessing_stage": "inside_cv", "feature_selection_stage": "inside_cv",
  "threshold_tuning_stage": "inner_cv", "dimensionality_reduction": true,
  "calibration_reported": true, "external_validation": "temporal",
  "baseline_comparator": "logistic_regression", "model": "xgboost"
}
EOF
python3 "$SCRIPT" --manifest "$TMP/nocv.json" --out "$OUT" --quiet >/dev/null 2>&1
check "cv_scheme=none fires NO_NESTED_CV" has_verdict NO_NESTED_CV

# (12) challenge verify.sh passes
check "challenge verify.sh passes" bash "$CH/verify.sh"

echo "fail=$fail"; [[ "$fail" -eq 0 ]] && echo "ALL PASS" || echo "FAILURES: $fail"
exit "$fail"
