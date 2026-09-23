#!/usr/bin/env python3
"""Behavioral tests for the define-variables skill and validator."""

import copy
import json
import os
import sys
import unittest
from pathlib import Path

# Add scripts directory to path
TEST_DIR = Path(__file__).resolve().parent
SKILL_ROOT = TEST_DIR.parent
SCRIPTS_DIR = SKILL_ROOT / "scripts"
FIXTURES_DIR = TEST_DIR / "fixtures"

if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from validate_variable_registry import VariableRegistryValidator, run_validator


class TestDefineVariablesFixtures(unittest.TestCase):
    """Test validator against standard fixture files."""

    def test_fixture_valid_registry(self):
        """valid_registry.json must pass validation with 0 errors."""
        fixture_path = str(FIXTURES_DIR / "valid_registry.json")
        exit_code, report = run_validator(fixture_path)
        self.assertEqual(exit_code, 0)
        self.assertEqual(report["status"], "PASS")
        self.assertEqual(report["errors_count"], 0)
        self.assertTrue(report["modeling_ready"])
        self.assertEqual(report["leakage_summary"]["post_index_variables"], [])
        self.assertEqual(report["leakage_summary"]["outcome_leakage_variables"], [])

    def test_fixture_post_index_predictor(self):
        """post_index_predictor.json must fail with post-index leakage errors."""
        fixture_path = str(FIXTURES_DIR / "post_index_predictor.json")
        exit_code, report = run_validator(fixture_path)
        self.assertEqual(exit_code, 1)
        self.assertEqual(report["status"], "FAIL")
        self.assertGreater(report["errors_count"], 0)
        self.assertFalse(report["modeling_ready"])
        self.assertIn("post_baseline_antidiabetic_prescription", report["leakage_summary"]["post_index_variables"])
        error_codes = [e["code"] for e in report["errors"]]
        self.assertTrue("POST_INDEX_PREDICTOR" in error_codes or "POST_INDEX_LEAKAGE" in error_codes)

    def test_fixture_unverified_source(self):
        """unverified_source.json must generate warnings and mark modeling_ready as False."""
        fixture_path = str(FIXTURES_DIR / "unverified_source.json")
        exit_code, report = run_validator(fixture_path)
        # Severity policy: provisional/unknown produces warnings, not fatal syntax errors
        self.assertEqual(exit_code, 0)
        self.assertEqual(report["status"], "PASS")
        self.assertGreater(report["warnings_count"], 0)
        self.assertFalse(report["modeling_ready"], "Unverified variables must not be marked modeling_ready")
        self.assertIn("unverified_physical_activity_index", report["variables_not_ready_for_modeling"])

    def test_fixture_outcome_without_horizon(self):
        """outcome_without_horizon.json must fail because predictive outcome lacks horizon."""
        fixture_path = str(FIXTURES_DIR / "outcome_without_horizon.json")
        exit_code, report = run_validator(fixture_path)
        self.assertEqual(exit_code, 1)
        self.assertEqual(report["status"], "FAIL")
        error_codes = [e["code"] for e in report["errors"]]
        self.assertIn("OUTCOME_WITHOUT_PREDICTION_HORIZON", error_codes)


class TestDefineVariablesBehavioralInvariants(unittest.TestCase):
    """Programmatic unit tests for specific edge cases and leakages."""

    def setUp(self):
        with open(FIXTURES_DIR / "valid_registry.json", "r", encoding="utf-8") as f:
            self.base_registry = json.load(f)

    def test_outcome_leakage_predictor_is_rejected(self):
        """Predictor marked with outcome_leakage or derived from outcome must fail."""
        data = copy.deepcopy(self.base_registry)
        # Add a predictor derived directly from fasting glucose (a label component)
        data["definitions"].append({
            "canonical_name": "high_glucose_flag_predictor",
            "role": "predictor",
            "concept": "Leaked glucose threshold predictor",
            "prediction_horizon": null if "null" in dir() else None,
            "source_bindings": [
                {
                    "dataset": "NHANES",
                    "cycle": "1999-2000",
                    "source_name": "LBXGLU",
                    "source_label": "Glucose",
                    "source_reference": {
                        "type": "codebook",
                        "title": "NHANES Lab",
                        "url_or_identifier": None,
                        "location": None,
                        "accessed_or_verified_date": None
                    }
                }
            ],
            "timing": {
                "availability": "at_index",
                "index_time_definition": "Baseline",
                "measurement_window": "Exam"
            },
            "unit": {"source_unit": "mg/dL", "analysis_unit": "mg/dL", "conversion": None},
            "coding": {"type": "binary", "source_codes": None, "analysis_mapping": None},
            "missingness": {"source_missing_codes": [], "structural_missingness": False, "skip_pattern": None, "planned_handling": "none"},
            "derivation": {
                "is_derived": True,
                "formula_or_rule": "fasting_plasma_glucose_mg_dl > 120",
                "components": ["fasting_plasma_glucose_mg_dl"]
            },
            "verification": {"status": "verified", "evidence": ["Ref"], "conflicts": []},
            "leakage_assessment": {
                "status": "outcome_leakage",
                "reason": "Derived directly from label component"
            }
        })
        validator = VariableRegistryValidator(data)
        is_valid = validator.validate()
        self.assertFalse(is_valid)
        error_codes = [e["code"] for e in validator.errors]
        self.assertTrue("OUTCOME_LEAKAGE_PREDICTOR" in error_codes or "PREDICTOR_DERIVED_FROM_OUTCOME" in error_codes)

    def test_unknown_unit_generates_warning(self):
        """Continuous variable with unknown unit produces a warning rather than silent invention."""
        data = copy.deepcopy(self.base_registry)
        # Change age unit to unknown
        data["definitions"][0]["unit"]["source_unit"] = "unknown"
        data["definitions"][0]["unit"]["analysis_unit"] = "unknown"
        validator = VariableRegistryValidator(data)
        is_valid = validator.validate()
        self.assertTrue(is_valid)  # Validates as warning, not fatal
        warn_codes = [w["code"] for w in validator.warnings]
        self.assertIn("UNKNOWN_SOURCE_UNIT", warn_codes)

    def test_unknown_missing_codes_generates_warning(self):
        """Under-specified missing codes generate a warning."""
        data = copy.deepcopy(self.base_registry)
        data["definitions"][0]["missingness"]["source_missing_codes"] = []
        validator = VariableRegistryValidator(data)
        is_valid = validator.validate()
        self.assertTrue(is_valid)
        warn_codes = [w["code"] for w in validator.warnings]
        self.assertIn("EMPTY_MISSING_CODES", warn_codes)

    def test_verified_without_evidence_fails(self):
        """Variable marked verified without evidence source must fail."""
        data = copy.deepcopy(self.base_registry)
        data["definitions"][0]["verification"]["evidence"] = []
        validator = VariableRegistryValidator(data)
        is_valid = validator.validate()
        self.assertFalse(is_valid)
        error_codes = [e["code"] for e in validator.errors]
        self.assertIn("VERIFIED_WITHOUT_EVIDENCE", error_codes)

    def test_incomplete_clinical_score_cannot_claim_exact_reproduction(self):
        """Clinical score claiming exact_official with unmapped components fails."""
        data = copy.deepcopy(self.base_registry)
        data["definitions"].append({
            "canonical_name": "findrisc_score",
            "role": "predictor",
            "concept": "FINDRISC risk score",
            "prediction_horizon": None,
            "source_bindings": [
                {
                    "source_name": "FINDRISC_RAW",
                    "source_reference": {"type": "guideline", "title": "FINDRISC"}
                }
            ],
            "timing": {"availability": "pre_index", "index_time_definition": "Baseline", "measurement_window": "Baseline"},
            "unit": {"source_unit": "points", "analysis_unit": "points", "conversion": None},
            "coding": {"type": "continuous", "source_codes": None, "analysis_mapping": None},
            "missingness": {"source_missing_codes": [], "structural_missingness": False, "skip_pattern": None, "planned_handling": "none"},
            "derivation": {"is_derived": True, "formula_or_rule": "sum of points", "components": ["age_years"]},
            "verification": {"status": "verified", "evidence": ["FINDRISC paper"], "conflicts": []},
            "leakage_assessment": {"status": "allowed_predictor", "reason": "Baseline score"},
            "score_integrity": {
                "is_clinical_score": True,
                "score_name": "FINDRISC",
                "reproduction_fidelity": "exact_official",
                "unmapped_components": ["berries_and_vegetables_daily", "physical_activity_30min"]
            }
        })
        validator = VariableRegistryValidator(data)
        is_valid = validator.validate()
        self.assertFalse(is_valid)
        error_codes = [e["code"] for e in validator.errors]
        self.assertIn("INVALID_SCORE_REPRODUCTION_CLAIM", error_codes)

    def test_survey_design_field_as_predictor_fails(self):
        """Survey weight, stratum, or PSU declared as ordinary predictor without justification fails."""
        data = copy.deepcopy(self.base_registry)
        # Attempt to make SDMVSTRA an allowed predictor
        data["definitions"].append({
            "canonical_name": "masked_variance_stratum",
            "role": "predictor",
            "concept": "NHANES variance stratum",
            "prediction_horizon": None,
            "source_bindings": [
                {
                    "source_name": "SDMVSTRA",
                    "source_reference": {"type": "codebook", "title": "NHANES Demographics"}
                }
            ],
            "timing": {"availability": "not_applicable", "index_time_definition": None, "measurement_window": None},
            "unit": {"source_unit": "stratum_id", "analysis_unit": "stratum_id", "conversion": None},
            "coding": {"type": "identifier", "source_codes": None, "analysis_mapping": None},
            "missingness": {"source_missing_codes": [], "structural_missingness": False, "skip_pattern": None, "planned_handling": "none"},
            "derivation": {"is_derived": False, "formula_or_rule": None, "components": []},
            "verification": {"status": "verified", "evidence": ["NCHS"], "conflicts": []},
            "leakage_assessment": {"status": "allowed_predictor", "reason": "Attempting to predict using cluster ID"}
        })
        validator = VariableRegistryValidator(data)
        is_valid = validator.validate()
        self.assertFalse(is_valid)
        error_codes = [e["code"] for e in validator.errors]
        self.assertIn("SURVEY_DESIGN_AS_PREDICTOR", error_codes)


if __name__ == "__main__":
    unittest.main()
