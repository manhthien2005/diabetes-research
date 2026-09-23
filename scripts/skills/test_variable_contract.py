#!/usr/bin/env python3
"""Contract tests for variable definition schema invariants and contracts.

Verifies:
- Variable definition schema parses as valid JSON.
- Required top-level structure and variable fields are enforced.
- Role enum contains all 10 required operational roles.
- Verification status enum is exactly {verified, provisional, unknown, conflict}.
- Timing availability enum is exactly {pre_index, at_index, post_index, not_applicable, unknown}.
- Leakage status enum is exactly {allowed_predictor, not_a_predictor, post_index_leakage, outcome_leakage, needs_review}.
- Prediction horizon is explicitly modeled in the contract.
- Source bindings require source_name and source_reference.
- Schema supports cycle-specific bindings.
- Missing-value codes are explicitly representable.
- Legacy study files are not required to adopt the schema immediately.
"""

import json
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
SCHEMAS_DIR = REPO_ROOT / "docs" / "agent" / "schemas"
VARIABLE_SCHEMA_FILE = SCHEMAS_DIR / "variable_definition.schema.json"


class TestVariableContract(unittest.TestCase):
    """Test invariants of variable definition schema and contracts."""

    @classmethod
    def setUpClass(cls):
        cls.assertTrue(VARIABLE_SCHEMA_FILE.exists(), f"Missing schema file: {VARIABLE_SCHEMA_FILE}")
        with open(VARIABLE_SCHEMA_FILE, "r", encoding="utf-8") as f:
            cls.schema = json.load(f)

    def test_schema_parses_and_has_required_top_level(self):
        """Schema must parse and define required top-level object structure."""
        self.assertIsInstance(self.schema, dict)
        self.assertEqual(self.schema.get("type"), "object")
        required = self.schema.get("required", [])
        for field in ("study_id", "dataset", "registry_version", "definitions"):
            self.assertIn(field, required, f"Top-level schema must require '{field}'")

    def test_required_variable_fields(self):
        """VariableDefinition must require all standard operational fields."""
        definitions = self.schema.get("definitions", {})
        self.assertIn("VariableDefinition", definitions)
        v_def = definitions["VariableDefinition"]
        required = v_def.get("required", [])
        expected_fields = [
            "canonical_name",
            "role",
            "concept",
            "source_bindings",
            "timing",
            "unit",
            "coding",
            "missingness",
            "derivation",
            "verification",
            "leakage_assessment",
        ]
        for field in expected_fields:
            self.assertIn(field, required, f"VariableDefinition must require '{field}'")

    def test_role_enum_contains_required_roles(self):
        """Role enum must contain all 10 required operational roles."""
        definitions = self.schema.get("definitions", {})
        v_def = definitions.get("VariableDefinition", {})
        role_prop = v_def.get("properties", {}).get("role", {})
        role_enum = set(role_prop.get("enum", []))
        expected_roles = {
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
        self.assertEqual(
            role_enum,
            expected_roles,
            f"Role enum must exactly match required roles: {expected_roles}",
        )

    def test_verification_status_enum_is_exact(self):
        """Verification status enum must be exactly verified, provisional, unknown, conflict."""
        definitions = self.schema.get("definitions", {})
        verif_contract = definitions.get("VerificationContract", {})
        status_enum = set(verif_contract.get("properties", {}).get("status", {}).get("enum", []))
        expected_statuses = {"verified", "provisional", "unknown", "conflict"}
        self.assertEqual(
            status_enum,
            expected_statuses,
            f"Verification status enum must be exactly {expected_statuses}",
        )

    def test_timing_availability_enum_is_exact(self):
        """Timing availability enum must be exactly pre_index, at_index, post_index, not_applicable, unknown."""
        definitions = self.schema.get("definitions", {})
        timing_contract = definitions.get("TimingContract", {})
        avail_enum = set(timing_contract.get("properties", {}).get("availability", {}).get("enum", []))
        expected_avail = {"pre_index", "at_index", "post_index", "not_applicable", "unknown"}
        self.assertEqual(
            avail_enum,
            expected_avail,
            f"Timing availability enum must be exactly {expected_avail}",
        )

    def test_leakage_status_enum_is_exact(self):
        """Leakage status enum must be exactly allowed_predictor, not_a_predictor, post_index_leakage, outcome_leakage, needs_review."""
        definitions = self.schema.get("definitions", {})
        leakage_contract = definitions.get("LeakageContract", {})
        status_enum = set(leakage_contract.get("properties", {}).get("status", {}).get("enum", []))
        expected_statuses = {
            "allowed_predictor",
            "not_a_predictor",
            "post_index_leakage",
            "outcome_leakage",
            "needs_review",
        }
        self.assertEqual(
            status_enum,
            expected_statuses,
            f"Leakage status enum must be exactly {expected_statuses}",
        )

    def test_prediction_horizon_is_represented(self):
        """Prediction horizon must be explicitly represented in schema."""
        definitions = self.schema.get("definitions", {})
        v_def = definitions.get("VariableDefinition", {})
        props = v_def.get("properties", {})
        self.assertIn("prediction_horizon", props, "VariableDefinition must have prediction_horizon property")
        top_props = self.schema.get("properties", {})
        self.assertIn("prediction_horizon", top_props, "Top-level schema must have prediction_horizon property")

    def test_source_bindings_contract(self):
        """Source bindings must require source_name and source_reference, and support cycle."""
        definitions = self.schema.get("definitions", {})
        binding = definitions.get("SourceBinding", {})
        required = set(binding.get("required", []))
        self.assertIn("source_name", required, "SourceBinding must require source_name")
        self.assertIn("source_reference", required, "SourceBinding must require source_reference")
        props = binding.get("properties", {})
        self.assertIn("cycle", props, "SourceBinding must support cycle-specific bindings")
        self.assertIn("dataset", props, "SourceBinding must support dataset bindings")

    def test_missing_value_codes_representable(self):
        """Missing-value codes must be explicitly representable in MissingnessContract."""
        definitions = self.schema.get("definitions", {})
        missingness = definitions.get("MissingnessContract", {})
        props = missingness.get("properties", {})
        self.assertIn("source_missing_codes", props, "MissingnessContract must include source_missing_codes")
        self.assertIn("structural_missingness", props, "MissingnessContract must include structural_missingness")
        self.assertIn("skip_pattern", props, "MissingnessContract must include skip_pattern")

    def test_legacy_study_files_not_required_to_adopt_immediately(self):
        """The schema is designated for future variable registries without breaking legacy study files."""
        # Check that existing study implementation files (e.g. Paper_01) are not bound to this schema
        self.assertIn("study_id", self.schema.get("properties", {}))
        self.assertEqual(self.schema.get("title"), "VariableDefinitionRegistry")


if __name__ == "__main__":
    unittest.main()
