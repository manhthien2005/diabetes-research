#!/usr/bin/env python3
"""Clinical tabular prediction-model pipeline-rigor gate (prediction-model-rigor).

Audits clinical tabular prediction-model pipelines for diabetes, NHANES, EHR, and
public-health cohorts against methodological standards (TRIPOD+AI, PROBAST+AI).
Evaluates declarative pipeline manifests (JSON) to detect data leakage, improper
resampling, calibration omission, threshold gaming, mislabeled external validation,
and complex survey design mishandling.

CHECKS (verdicts):
  1. NO_NESTED_CV            (Major)  Hyperparameters/features tuned on reported folds (flat CV)
                                      or no validation; nested CV or held-out test required.
  2. SELECTION_OUTSIDE_CV    (Major)  Feature selection fit before split (whole dataset),
                                      leaking validation folds.
  3. PREPROCESSING_LEAKAGE   (Major)  Data-driven preprocessing / imputation / scaling / encoding
                                      fit before split on the pooled dataset.
  4. IMBALANCE_RESAMPLING_OUTSIDE_CV (Major) Resampling (SMOTE/oversampling) applied before split.
  5. THRESHOLD_TUNED_ON_TEST (Major)  Classification cut-point tuned on final test/external set.
  6. INVALID_EXTERNAL_VALIDATION (Major) Random split from same cohort claimed as external validation.
  7. HIGH_DIM_LOW_EVENTS     (Major)  Features >= events (or samples) with no dimensionality
                                      reduction, shrinkage, or regularization.
  8. NO_CALIBRATION          (Minor)  Model reported without calibration slope/intercept or curve.
  9. NO_EXTERNAL_VALIDATION  (Minor)  Single-cohort development without external/temporal validation.
 10. NO_BASELINE_COMPARATOR  (Minor)  Complex model reported without transparent simple baseline.
 11. MISSING_SURVEY_DESIGN   (Minor)  Population-representative survey claims made without
                                      strata, PSU, or sampling weight metadata.
 12. UNJUSTIFIED_SURVEY_WEIGHTING (Minor) Survey weights used in model training without estimand
                                      justification.

Stdlib-only (json / argparse / pathlib). Exit codes: 0 clean (or report-only),
1 Major claim(s) found (with --strict), 2 input/usage error.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

VALID_CV = {
    "nested", "nested_cv", "single_split", "held_out_test", "holdout_test",
    "held-out", "train_test_holdout"
}
NONE_VALUES = {"", "none", "no", "na", "n/a", "false", "0"}
LEAKY_STAGES = {"outside_cv", "outside", "whole_dataset", "before_cv", "pre_cv", "global", "before_split"}
TEST_TUNED_THRESHOLDS = {"tuned_on_test", "test_set", "external_test", "holdout_test_tuned"}
INVALID_EXT_TYPES = {"random_split", "random_holdout", "internal_random_split", "random_sample"}


def _norm(s) -> str:
    return str(s).strip().lower() if s is not None else ""


def check(m: dict) -> list[dict]:
    claims: list[dict] = []

    # Extract sample/event counts and dimensions
    n_features = m.get("n_features")
    if n_features is None:
        n_features = m.get("candidate_predictor_parameters")

    n_events = m.get("n_events")
    if n_events is None:
        n_events = m.get("events")

    n_samples = m.get("n_samples")
    if n_samples is None:
        n_samples = m.get("participants")

    cv = _norm(m.get("cv_scheme"))
    if not cv:
        cv = _norm(m.get("resampling_design"))

    sel = _norm(m.get("feature_selection_stage"))
    prep = _norm(m.get("preprocessing_stage"))
    if not prep:
        prep = _norm(m.get("imputation_stage"))

    resamp = _norm(m.get("resampling_stage"))
    if not resamp:
        resamp = _norm(m.get("class_imbalance_stage"))

    thresh = _norm(m.get("threshold_tuning_stage"))
    if not thresh:
        thresh = _norm(m.get("threshold_strategy"))

    dimred = m.get("dimensionality_reduction")
    calib = m.get("calibration_reported")
    extval = _norm(m.get("external_validation"))
    extval_type = _norm(m.get("external_validation_type"))
    baseline = _norm(m.get("baseline_comparator"))

    # Survey design details
    survey = m.get("survey_design")
    if not isinstance(survey, dict):
        survey = {}
    pop_rep_claimed = survey.get("population_representative_claimed", False)
    if not pop_rep_claimed:
        pop_rep_claimed = m.get("population_representative_claimed", False)

    # 1. No nested CV / no held-out validation
    if cv not in VALID_CV:
        detail = ("no validation scheme (`none`)" if cv in NONE_VALUES
                  else f"flat CV ('{cv or 'missing'}') tunes and reports on the same folds")
        claims.append({
            "verdict": "NO_NESTED_CV", "severity": "Major",
            "detail": (f"{detail}; use nested cross-validation or a strictly held-out test set so tuning "
                       f"does not inflate reported performance"),
            "where": "cv_scheme",
        })

    # 2. Feature selection outside CV
    if sel in LEAKY_STAGES:
        claims.append({
            "verdict": "SELECTION_OUTSIDE_CV", "severity": "Major",
            "detail": ("feature selection is fit outside the CV fold (on the pooled dataset), leaking "
                       "validation folds into selection; nest selection inside each training fold"),
            "where": "feature_selection_stage",
        })

    # 3. Preprocessing leakage
    if prep in LEAKY_STAGES:
        claims.append({
            "verdict": "PREPROCESSING_LEAKAGE", "severity": "Major",
            "detail": ("data-driven preprocessing (imputation/scaling/encoding) is fit outside CV on the "
                       "entire dataset; all transformers must be fit strictly on training folds"),
            "where": "preprocessing_stage",
        })

    # 4. Class imbalance resampling outside CV
    if resamp in LEAKY_STAGES:
        claims.append({
            "verdict": "IMBALANCE_RESAMPLING_OUTSIDE_CV", "severity": "Major",
            "detail": ("class-imbalance resampling (e.g. SMOTE) is applied before fold splitting; "
                       "resampling must occur strictly inside training folds to preserve natural evaluation prevalence"),
            "where": "resampling_stage",
        })

    # 5. Threshold tuned on test set
    if thresh in TEST_TUNED_THRESHOLDS:
        claims.append({
            "verdict": "THRESHOLD_TUNED_ON_TEST", "severity": "Major",
            "detail": ("classification decision threshold is tuned or selected on the test or external validation set; "
                       "thresholds must be prespecified clinically or tuned strictly within inner training folds"),
            "where": "threshold_tuning_stage",
        })

    # 6. Invalid external validation
    if extval not in NONE_VALUES and extval_type in INVALID_EXT_TYPES:
        claims.append({
            "verdict": "INVALID_EXTERNAL_VALIDATION", "severity": "Major",
            "detail": ("a random split or holdout from the same source cohort is mislabeled as external validation; "
                       "external validation requires an independent geographic, institutional, or distinct cohort"),
            "where": "external_validation_type",
        })

    # 7. High dimensionality vs events
    denom = n_events if isinstance(n_events, (int, float)) else n_samples
    if isinstance(n_features, (int, float)) and isinstance(denom, (int, float)) and denom > 0:
        if n_features >= denom and dimred is not True:
            unit = "events" if isinstance(n_events, (int, float)) else "samples"
            claims.append({
                "verdict": "HIGH_DIM_LOW_EVENTS", "severity": "Major",
                "detail": (f"{n_features} candidate features vs {int(denom)} {unit} (p >= {unit}) with no "
                           f"dimensionality reduction or regularisation; apply regularized regression (LASSO/Elastic Net) "
                           f"or in-fold feature selection to prevent extreme optimism"),
                "where": "n_features",
            })

    # 8. No calibration
    if calib is not True:
        claims.append({
            "verdict": "NO_CALIBRATION", "severity": "Minor",
            "detail": ("clinical prediction model is reported without calibration (slope/intercept, Brier score, "
                       "or calibration curve), evaluating only discrimination"),
            "where": "calibration_reported",
        })

    # 9. No external validation
    if extval in NONE_VALUES:
        claims.append({
            "verdict": "NO_EXTERNAL_VALIDATION", "severity": "Minor",
            "detail": ("single-cohort development with no external or temporal validation; clinical claims "
                       "must be qualified as development-only"),
            "where": "external_validation",
        })

    # 10. No baseline comparator
    if baseline in NONE_VALUES:
        claims.append({
            "verdict": "NO_BASELINE_COMPARATOR", "severity": "Minor",
            "detail": ("complex model reported without benchmarking against a transparent baseline (e.g. penalized logistic regression); "
                       "incremental utility over standard clinical predictors is unverified"),
            "where": "baseline_comparator",
        })

    # 11. Missing survey design metadata
    if pop_rep_claimed:
        has_strata = bool(survey.get("strata_variable"))
        has_psu = bool(survey.get("psu_variable"))
        has_weight = bool(survey.get("weight_variable"))
        if not (has_strata and has_psu and has_weight):
            claims.append({
                "verdict": "MISSING_SURVEY_DESIGN", "severity": "Minor",
                "detail": ("population-representative claims made on complex-survey data (e.g. NHANES) without declaring "
                           "sampling weights, strata, and PSU variables; design effects cannot be audited"),
                "where": "survey_design",
            })

    # 12. Unjustified survey weighting in ML model training
    weights_used_in_training = survey.get("weights_used_in_training", False)
    if weights_used_in_training and not survey.get("estimand_justification"):
        claims.append({
            "verdict": "UNJUSTIFIED_SURVEY_WEIGHTING", "severity": "Minor",
            "detail": ("sampling weights incorporated into model training loss without stating the target estimand "
                       "(individual clinical risk prediction vs population-average risk estimation)"),
            "where": "survey_design.estimand_justification",
        })

    return claims


def analyze(manifest_path: str) -> dict:
    p = Path(manifest_path)
    if not p.is_file():
        sys.stderr.write(f"ERROR: manifest not found: {manifest_path}\n")
        sys.exit(2)
    try:
        m = json.loads(p.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, ValueError) as e:
        sys.stderr.write(f"ERROR: manifest is not valid JSON: {e}\n")
        sys.exit(2)
    if not isinstance(m, dict):
        sys.stderr.write("ERROR: manifest JSON must be an object\n")
        sys.exit(2)

    claims = check(m)
    n_major = sum(1 for c in claims if c["severity"] == "Major")
    return {
        "manifest": str(p),
        "model": m.get("model"),
        "n_features": m.get("n_features") or m.get("candidate_predictor_parameters"),
        "n_samples": m.get("n_samples") or m.get("participants"),
        "n_events": m.get("n_events") or m.get("events"),
        "cv_scheme": m.get("cv_scheme") or m.get("resampling_design"),
        "claims": claims,
        "summary": {
            "n_claims": len(claims),
            "n_major": n_major,
            "n_flag": len(claims) - n_major,
            "verdict": "MAJOR_CANDIDATE" if n_major else ("MINOR_FLAG" if claims else "OK"),
        },
    }


def render(result: dict) -> str:
    lines = ["| Check | Severity | Detail |", "|---|---|---|"]
    for c in result["claims"]:
        lines.append(f"| {c['verdict']} | {c['severity']} | {c['detail']} |")
    if len(lines) == 2:
        lines.append("| (none) | — | prediction-model pipeline meets the rigor bar |")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description="Clinical tabular prediction-model pipeline-rigor gate.")
    ap.add_argument("--manifest", required=True, help="prediction-model pipeline manifest JSON")
    ap.add_argument("--out", help="write JSON artifact to this path")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any Major claim exists")
    ap.add_argument("--quiet", action="store_true", help="suppress stdout table")
    args = ap.parse_args()

    result = analyze(args.manifest)

    if not args.quiet:
        print("=" * 63)
        print(" Clinical Prediction-Model Rigor Gate (prediction-model-rigor)")
        print("=" * 63)
        print(f"  model={result['model']}  n_features={result['n_features']}  "
              f"n_samples={result['n_samples']}  n_events={result['n_events']}  "
              f"cv_scheme={result['cv_scheme']}")
        print(render(result))
        print()
        s = result["summary"]
        if s["n_major"]:
            print(f"MAJOR candidate: {s['n_major']} prediction-model rigor issue(s).")
        elif s["n_flag"]:
            print(f"MINOR flag: {s['n_flag']} prediction-model rigor issue(s) (see table).")
        else:
            print("OK: prediction-model pipeline meets the rigor bar.")

    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps({"detector": "check_prediction_model_rigor", **result}, indent=2), encoding="utf-8")
        if not args.quiet:
            print(f"\nwrote {args.out}")

    return 1 if (args.strict and result["summary"]["n_major"]) else 0


if __name__ == "__main__":
    sys.exit(main())
