#!/usr/bin/env python3
"""Deterministic validator for clinical tabular variable registries.

Enforces rules defined in docs/agent/VARIABLE_CONTRACT.md and
docs/agent/schemas/variable_definition.schema.json:
- Schema conformance and JSON well-formedness
- Absence of post-index predictors and outcome leakage
- Source grounding for outcome and label definitions
- Explicit prediction horizon for predictive outcome definitions
- Evidence backing for verified definitions
- Proper separation of survey design variables from candidate predictors
- Warning generation for provisional, unknown, or conflicting metadata

Exit codes:
  0: PASS (all checks pass, warnings may be present)
  1: FAIL (one or more high-impact operationalization violations detected)
  2: USAGE / CLI ERROR
"""

import argparse
import json
import os
import re
import sys
from typing import Any, Dict, List, Optional, Set, Tuple

# Standard survey variable patterns that must not be raw predictors
SURVEY_DESIGN_NAME_PATTERNS = [
    r"^wtmec\d*",
    r"^wtint\d*",
    r"^sdmvstra$",
    r"^sdmvpsu$",
    r".*sampling_weight.*",
    r".*survey_weight.*",
    r".*strata.*",
    r".*psu.*",
]


class VariableRegistryValidator:
    """Validates variable registries against the variable contract."""

    def __init__(self, registry_data: Dict[str, Any]):
        self.data = registry_data
        self.errors: List[Dict[str, Any]] = []
        self.warnings: List[Dict[str, Any]] = []
        self.info: List[Dict[str, Any]] = []

    def add_error(self, code: str, message: str, variable: Optional[str] = None):
        self.errors.append({"code": code, "message": message, "variable": variable})

    def add_warning(self, code: str, message: str, variable: Optional[str] = None):
        self.warnings.append({"code": code, "message": message, "variable": variable})

    def validate(self) -> bool:
        """Run all contract validation checks. Returns True if no fatal errors."""
        self._check_top_level()
        if self.errors:
            # Fatal top-level errors prevent further variable checks
            return False

        definitions = self.data.get("definitions", [])
        if not isinstance(definitions, list):
            self.add_error("INVALID_DEFINITIONS", "Field 'definitions' must be an array")
            return False

        if not definitions:
            self.add_error("EMPTY_REGISTRY", "Registry contains zero variable definitions")
            return False

        seen_canonical: Set[str] = set()
        outcome_canonical_names: Set[str] = set()

        # Pass 1: Identify all outcome variables
        for var in definitions:
            if not isinstance(var, dict):
                continue
            canonical = var.get("canonical_name")
            role = var.get("role")
            if role in ("outcome", "label_component") and canonical:
                outcome_canonical_names.add(canonical)

        # Pass 2: Validate each variable definition
        for idx, var in enumerate(definitions):
            if not isinstance(var, dict):
                self.add_error("MALFORMED_VARIABLE", f"Variable entry at index {idx} is not an object")
                continue

            canonical = var.get("canonical_name")
            if not canonical or not isinstance(canonical, str):
                self.add_error("MISSING_CANONICAL_NAME", f"Variable at index {idx} has missing or invalid canonical_name")
                continue

            if canonical in seen_canonical:
                self.add_error("DUPLICATE_CANONICAL_NAME", f"Duplicate canonical variable definition: '{canonical}'", variable=canonical)
            seen_canonical.add(canonical)

            self._validate_variable(var, outcome_canonical_names)

        return len(self.errors) == 0

    def _check_top_level(self):
        """Check top-level registry fields."""
        for field in ("study_id", "dataset", "registry_version", "definitions"):
            if field not in self.data:
                self.add_error("MISSING_REQUIRED_FIELD", f"Missing required top-level field: '{field}'")
            elif not self.data[field] and field != "definitions":
                self.add_error("EMPTY_REQUIRED_FIELD", f"Top-level field '{field}' must not be empty")

    def _validate_variable(self, var: Dict[str, Any], outcome_canonical_names: Set[str]):
        """Validate an individual variable definition."""
        canonical = var.get("canonical_name", "UNKNOWN")
        role = var.get("role")

        # 1. Role validation
        valid_roles = {
            "predictor",
            "outcome",
            "label_component",
            "exclusion",
            "identifier",
            "survey_weight",
            "survey_strata",
            "survey_psu",
            "time_anchor",
            "auxiliary",
        }
        if role not in valid_roles:
            self.add_error("INVALID_ROLE", f"Invalid role '{role}'. Must be one of: {sorted(valid_roles)}", variable=canonical)

        # 2. Timing and Availability Checks
        timing = var.get("timing") or {}
        avail = timing.get("availability")
        valid_avail = {"pre_index", "at_index", "post_index", "not_applicable", "unknown"}
        if avail not in valid_avail:
            self.add_error("INVALID_TIMING_AVAILABILITY", f"Invalid timing availability '{avail}'", variable=canonical)

        # 3. Post-index predictor detection (FAIL)
        leakage = var.get("leakage_assessment") or {}
        leakage_status = leakage.get("status")
        valid_leakage_status = {
            "allowed_predictor",
            "not_a_predictor",
            "post_index_leakage",
            "outcome_leakage",
            "needs_review",
        }
        if leakage_status not in valid_leakage_status:
            self.add_error("INVALID_LEAKAGE_STATUS", f"Invalid leakage status '{leakage_status}'", variable=canonical)

        if role == "predictor":
            if avail == "post_index":
                self.add_error(
                    "POST_INDEX_PREDICTOR",
                    f"Predictor '{canonical}' has post_index availability. Post-index variables cannot be predictors.",
                    variable=canonical,
                )
            if leakage_status == "post_index_leakage":
                self.add_error(
                    "POST_INDEX_LEAKAGE",
                    f"Predictor '{canonical}' has post_index_leakage status.",
                    variable=canonical,
                )

        # 4. Outcome Leakage Detection (FAIL)
        derivation = var.get("derivation") or {}
        components = derivation.get("components") or []
        if role == "predictor":
            if leakage_status == "outcome_leakage":
                self.add_error(
                    "OUTCOME_LEAKAGE_PREDICTOR",
                    f"Predictor '{canonical}' is marked with outcome_leakage.",
                    variable=canonical,
                )
            # Check if predictor components intersect with outcome variables
            overlap = set(components).intersection(outcome_canonical_names)
            if overlap:
                self.add_error(
                    "PREDICTOR_DERIVED_FROM_OUTCOME",
                    f"Predictor '{canonical}' is derived from outcome/label component(s): {sorted(overlap)}.",
                    variable=canonical,
                )

        # 5. Outcome & Label Component Source Grounding (FAIL if no source or derivation)
        source_bindings = var.get("source_bindings") or []
        is_derived = derivation.get("is_derived", False)
        if role in ("outcome", "label_component"):
            if not source_bindings and not (is_derived and components):
                self.add_error(
                    "OUTCOME_WITHOUT_SOURCE_OR_DERIVATION",
                    f"Outcome/label variable '{canonical}' has no source bindings and is not a documented derived variable.",
                    variable=canonical,
                )

        # 6. Predictive Outcome Horizon Requirement (FAIL)
        if role == "outcome":
            horizon = var.get("prediction_horizon") or self.data.get("prediction_horizon")
            if not horizon or horizon not in ("cross_sectional", "early_detection", "long_term_risk"):
                self.add_error(
                    "OUTCOME_WITHOUT_PREDICTION_HORIZON",
                    f"Predictive outcome '{canonical}' lacks a valid prediction_horizon ('cross_sectional', 'early_detection', or 'long_term_risk').",
                    variable=canonical,
                )

        # 7. Verification Status and Evidence Backing (FAIL if verified without evidence)
        verification = var.get("verification") or {}
        v_status = verification.get("status")
        valid_v_status = {"verified", "provisional", "unknown", "conflict"}
        if v_status not in valid_v_status:
            self.add_error("INVALID_VERIFICATION_STATUS", f"Invalid verification status '{v_status}'", variable=canonical)

        evidence = verification.get("evidence") or []
        if v_status == "verified" and not evidence:
            self.add_error(
                "VERIFIED_WITHOUT_EVIDENCE",
                f"Variable '{canonical}' is marked 'verified' but provides no evidence references.",
                variable=canonical,
            )

        # Source bindings must have source_name and source_reference
        for s_idx, binding in enumerate(source_bindings):
            if not isinstance(binding, dict):
                self.add_error("MALFORMED_SOURCE_BINDING", f"Source binding {s_idx} for '{canonical}' is not an object", variable=canonical)
                continue
            if not binding.get("source_name"):
                self.add_error("MISSING_SOURCE_NAME", f"Source binding {s_idx} for '{canonical}' missing 'source_name'", variable=canonical)
            ref = binding.get("source_reference")
            if not ref or not isinstance(ref, dict) or not ref.get("title") or not ref.get("type"):
                self.add_error("MISSING_SOURCE_REFERENCE", f"Source binding {s_idx} for '{canonical}' missing valid 'source_reference'", variable=canonical)

        # 8. Survey Design Variables declared as ordinary predictors (FAIL)
        if role == "predictor":
            # Check canonical name or source names against survey design regex
            names_to_check = [canonical.lower()]
            for b in source_bindings:
                if isinstance(b, dict) and b.get("source_name"):
                    names_to_check.append(b["source_name"].lower())

            for name in names_to_check:
                for pattern in SURVEY_DESIGN_NAME_PATTERNS:
                    if re.match(pattern, name):
                        # If justification is not explicitly provided in concept or leakage reason
                        reason = leakage.get("reason", "").lower()
                        concept = var.get("concept", "").lower()
                        if "survey_design_as_predictor_justified" not in reason and "survey_design_as_predictor_justified" not in concept:
                            self.add_error(
                                "SURVEY_DESIGN_AS_PREDICTOR",
                                f"Variable '{canonical}' matches survey design pattern '{pattern}' but is assigned role 'predictor' without explicit justification.",
                                variable=canonical,
                            )
                            break

        if role in ("survey_weight", "survey_strata", "survey_psu") and leakage_status == "allowed_predictor":
            self.add_error(
                "SURVEY_DESIGN_ROLE_AS_ALLOWED_PREDICTOR",
                f"Variable '{canonical}' has survey design role '{role}' but is marked 'allowed_predictor'.",
                variable=canonical,
            )

        # 9. Warnings for provisional / unknown / conflicts
        if v_status == "provisional":
            self.add_warning("PROVISIONAL_VERIFICATION", f"Variable '{canonical}' has provisional verification status.", variable=canonical)
        elif v_status == "unknown":
            self.add_warning("UNKNOWN_VERIFICATION", f"Variable '{canonical}' has unknown verification status.", variable=canonical)
        elif v_status == "conflict":
            conflicts = verification.get("conflicts", [])
            self.add_warning(
                "SOURCE_CONFLICT",
                f"Variable '{canonical}' has documented definition conflicts: {conflicts}",
                variable=canonical,
            )

        conflicts = verification.get("conflicts") or []
        if conflicts and v_status != "conflict":
            self.add_warning("UNRESOLVED_CONFLICTS", f"Variable '{canonical}' has conflict entries but status is '{v_status}'.", variable=canonical)

        # Units warning
        unit = var.get("unit") or {}
        coding = var.get("coding") or {}
        data_type = coding.get("type")
        if data_type == "continuous":
            s_unit = unit.get("source_unit")
            a_unit = unit.get("analysis_unit")
            if not s_unit or str(s_unit).lower() in ("unknown", "null", "none"):
                self.add_warning("UNKNOWN_SOURCE_UNIT", f"Continuous variable '{canonical}' has unknown source_unit.", variable=canonical)
            if not a_unit or str(a_unit).lower() in ("unknown", "null", "none"):
                self.add_warning("UNKNOWN_ANALYSIS_UNIT", f"Continuous variable '{canonical}' has unknown analysis_unit.", variable=canonical)

        # Missingness warning
        missingness = var.get("missingness") or {}
        s_missing = missingness.get("source_missing_codes")
        if s_missing is None or (isinstance(s_missing, list) and len(s_missing) == 0 and not is_derived and role not in ("survey_weight", "survey_strata", "survey_psu") and data_type not in ("identifier", "time_anchor")):
            self.add_warning("EMPTY_MISSING_CODES", f"Variable '{canonical}' has empty or unspecified source_missing_codes.", variable=canonical)

        if missingness.get("structural_missingness") is None and not is_derived and role not in ("survey_weight", "survey_strata", "survey_psu") and data_type not in ("identifier", "time_anchor"):
            self.add_warning("UNRESOLVED_STRUCTURAL_MISSINGNESS", f"Variable '{canonical}' has unresolved structural_missingness (null).", variable=canonical)

        # Cycle harmonization warning
        if len(source_bindings) > 1:
            cycles = [b.get("cycle") for b in source_bindings if isinstance(b, dict) and b.get("cycle")]
            if len(set(cycles)) > 1:
                # Multiple cycles present: check if harmonization is noted
                source_names = {b.get("source_name") for b in source_bindings if isinstance(b, dict)}
                if len(source_names) > 1 and not derivation.get("formula_or_rule") and not unit.get("conversion"):
                    self.add_warning(
                        "MULTI_CYCLE_DIFFERING_NAMES",
                        f"Variable '{canonical}' spans multiple cycles with differing source names {source_names}. Verify cycle harmonization.",
                        variable=canonical,
                    )

        # Clinical score integrity
        score_integrity = var.get("score_integrity") or {}
        if score_integrity.get("is_clinical_score"):
            fidelity = score_integrity.get("reproduction_fidelity")
            unmapped = score_integrity.get("unmapped_components") or []
            if fidelity == "exact_official" and unmapped:
                self.add_error(
                    "INVALID_SCORE_REPRODUCTION_CLAIM",
                    f"Clinical score '{canonical}' claims 'exact_official' fidelity but has unmapped components: {unmapped}.",
                    variable=canonical,
                )
            elif fidelity in ("adapted", "proxy", "incomplete"):
                self.add_warning(
                    "ADAPTED_CLINICAL_SCORE",
                    f"Clinical score '{canonical}' is adapted/proxy ({fidelity}). Must not be represented as original official score.",
                    variable=canonical,
                )


def run_validator(filepath: str) -> Tuple[int, Dict[str, Any]]:
    """Runs the validation on a given filepath and returns (exit_code, report_dict)."""
    if not os.path.exists(filepath):
        return 1, {
            "status": "FAIL",
            "errors": [{"code": "FILE_NOT_FOUND", "message": f"Registry file not found: {filepath}"}],
            "warnings": [],
            "modeling_ready": False,
        }

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return 1, {
            "status": "FAIL",
            "errors": [{"code": "JSON_PARSE_ERROR", "message": f"Failed to parse registry JSON: {str(e)}"}],
            "warnings": [],
            "modeling_ready": False,
        }

    validator = VariableRegistryValidator(data)
    is_valid = validator.validate()

    definitions = data.get("definitions", []) if isinstance(data, dict) else []
    post_index_vars = []
    outcome_leakage_vars = []
    not_ready_vars = []

    for v in definitions:
        if not isinstance(v, dict):
            continue
        cname = v.get("canonical_name", "UNKNOWN")
        role = v.get("role")
        avail = (v.get("timing") or {}).get("availability")
        leakage = (v.get("leakage_assessment") or {}).get("status")
        v_status = (v.get("verification") or {}).get("status")

        if avail == "post_index" or leakage == "post_index_leakage":
            post_index_vars.append(cname)
        if leakage == "outcome_leakage":
            outcome_leakage_vars.append(cname)
        if v_status in ("unknown", "conflict") or (role == "predictor" and (avail == "post_index" or leakage in ("post_index_leakage", "outcome_leakage"))):
            not_ready_vars.append(cname)

    report = {
        "status": "PASS" if is_valid else "FAIL",
        "study_id": data.get("study_id") if isinstance(data, dict) else None,
        "dataset": data.get("dataset") if isinstance(data, dict) else None,
        "total_variables": len(definitions),
        "errors_count": len(validator.errors),
        "warnings_count": len(validator.warnings),
        "errors": validator.errors,
        "warnings": validator.warnings,
        "modeling_ready": is_valid and len(not_ready_vars) == 0,
        "leakage_summary": {
            "post_index_variables": post_index_vars,
            "outcome_leakage_variables": outcome_leakage_vars,
        },
        "variables_not_ready_for_modeling": sorted(list(set(not_ready_vars))),
    }

    exit_code = 0 if is_valid else 1
    return exit_code, report


def main():
    parser = argparse.ArgumentParser(description="Validate variable operationalization registry.")
    parser.add_argument("registry_path", help="Path to registry JSON file")
    parser.add_argument("--json", action="store_true", help="Output machine-readable JSON only")
    args = parser.parse_args()

    exit_code, report = run_validator(args.registry_path)

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        status_line = f"RESULT: {report['status']} (Errors: {report['errors_count']}, Warnings: {report['warnings_count']})"
        print("=" * 60)
        print(f"VARIABLE REGISTRY VALIDATION: {args.registry_path}")
        print(status_line)
        print("=" * 60)

        if report["errors"]:
            print("\n[ERRORS - BLOCKS MODELING]:")
            for err in report["errors"]:
                var_str = f" [Variable: {err['variable']}]" if err.get("variable") else ""
                print(f"  - [{err['code']}]{var_str}: {err['message']}")

        if report["warnings"]:
            print("\n[WARNINGS - REVIEW RECOMMENDED]:")
            for warn in report["warnings"]:
                var_str = f" [Variable: {warn['variable']}]" if warn.get("variable") else ""
                print(f"  - [{warn['code']}]{var_str}: {warn['message']}")

        print(f"\nModeling Ready: {report['modeling_ready']}")
        if report["leakage_summary"]["post_index_variables"]:
            print(f"Post-Index Leakage: {report['leakage_summary']['post_index_variables']}")
        if report["leakage_summary"]["outcome_leakage_variables"]:
            print(f"Outcome Leakage: {report['leakage_summary']['outcome_leakage_variables']}")

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
