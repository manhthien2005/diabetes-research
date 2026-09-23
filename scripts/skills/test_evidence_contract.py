#!/usr/bin/env python3
"""Contract tests for literature evidence policy and schema invariants.

Verifies:
- Schema files parse as valid JSON.
- candidate_roles supports evidence_candidate and reproduction_candidate.
- Claim support enum is exactly direct, partial, contextual, unsupported.
- Confidence enum is exactly high, medium, low.
- Decision states distinguish advisory recommendations from human approvals.
- Citation count is not a required scientific-validity field.
- Public dataset and source code availability are not required evidence_candidate conditions.
- New fields are optional at the root level for backward compatibility.
"""

import json
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
SCHEMAS_DIR = REPO_ROOT / "docs" / "agent" / "schemas"
PAPER_SCHEMA_FILE = SCHEMAS_DIR / "paper_record.schema.json"
CLAIM_SCHEMA_FILE = SCHEMAS_DIR / "claim_provenance.schema.json"


class TestEvidenceContract(unittest.TestCase):
    """Test invariants of evidence schemas and contracts."""

    @classmethod
    def setUpClass(cls):
        cls.assertTrue(PAPER_SCHEMA_FILE.exists(), f"Missing schema file: {PAPER_SCHEMA_FILE}")
        cls.assertTrue(CLAIM_SCHEMA_FILE.exists(), f"Missing schema file: {CLAIM_SCHEMA_FILE}")

        with open(PAPER_SCHEMA_FILE, "r", encoding="utf-8") as f:
            cls.paper_schema = json.load(f)

        with open(CLAIM_SCHEMA_FILE, "r", encoding="utf-8") as f:
            cls.claim_schema = json.load(f)

    def test_schemas_parse_and_have_root_object(self):
        """Schemas must parse and define root object types."""
        self.assertIsInstance(self.paper_schema, dict)
        self.assertEqual(self.paper_schema.get("type"), "object")
        self.assertIsInstance(self.claim_schema, dict)
        self.assertEqual(self.claim_schema.get("type"), "object")

    def test_candidate_roles_contract(self):
        """candidate_roles must allow evidence_candidate and reproduction_candidate."""
        props = self.paper_schema.get("properties", {})
        self.assertIn("candidate_roles", props)
        cr = props["candidate_roles"]
        self.assertEqual(cr.get("type"), "array")
        self.assertTrue(cr.get("uniqueItems"), "candidate_roles must have uniqueItems: true")
        items_enum = cr.get("items", {}).get("enum", [])
        self.assertEqual(
            set(items_enum),
            {"evidence_candidate", "reproduction_candidate"},
            "candidate_roles must exactly allow evidence_candidate and reproduction_candidate",
        )

    def test_claim_support_enum(self):
        """Claim support enum must be exactly direct, partial, contextual, unsupported."""
        props = self.claim_schema.get("properties", {})
        self.assertIn("support", props)
        support_enum = props["support"].get("enum", [])
        self.assertEqual(
            set(support_enum),
            {"direct", "partial", "contextual", "unsupported"},
            "Claim support must be direct, partial, contextual, unsupported",
        )

    def test_claim_confidence_enum(self):
        """Claim confidence enum must be exactly high, medium, low."""
        props = self.claim_schema.get("properties", {})
        self.assertIn("confidence", props)
        confidence_enum = props["confidence"].get("enum", [])
        self.assertEqual(
            set(confidence_enum),
            {"high", "medium", "low"},
            "Claim confidence must be high, medium, low",
        )

    def test_claim_location_structure(self):
        """Claim location must support section, table, and page with nullability."""
        props = self.claim_schema.get("properties", {})
        self.assertIn("location", props)
        loc = props["location"]
        self.assertEqual(loc.get("type"), "object")
        loc_props = loc.get("properties", {})
        for field in ("section", "table", "page"):
            self.assertIn(field, loc_props, f"location must contain {field}")
            types = loc_props[field].get("type")
            if isinstance(types, list):
                self.assertIn("null", types, f"location.{field} must allow null")
            else:
                self.fail(f"location.{field} type should allow null")

    def test_decision_states_and_recommendations(self):
        """Decision state and recommended action must be separated and distinct."""
        props = self.paper_schema.get("properties", {})
        self.assertIn("decision_state", props)
        self.assertIn("recommended_action", props)

        ds_enum = set(props["decision_state"].get("enum", []))
        self.assertEqual(
            ds_enum,
            {"unreviewed", "recommendation_ready", "human_approved", "human_rejected"},
            "decision_state must distinguish recommendations from human decisions",
        )

        ra_enum = set(props["recommended_action"].get("enum", []))
        self.assertEqual(
            ra_enum,
            {
                "promote",
                "retain_in_pool",
                "exclude_from_current_scope",
                "reject_with_human_review",
                "needs_more_review",
            },
            "recommended_action must cover canonical advisory actions",
        )

    def test_citation_count_is_not_required_scientific_validity_gate(self):
        """Citation count must not be a required field or validity gate in paper schema."""
        required = self.paper_schema.get("required", [])
        self.assertNotIn(
            "citations",
            required,
            "citations must never be a required validity gate in paper_record schema",
        )
        self.assertNotIn(
            "citation_count",
            required,
            "citation_count must never be a required validity gate in paper_record schema",
        )

    def test_evidence_candidate_not_conditioned_on_public_data_or_code(self):
        """evidence_candidate assessment must not require dataset or code access."""
        ca = self.paper_schema.get("properties", {}).get("candidate_assessment", {})
        ec = ca.get("properties", {}).get("evidence_candidate", {})
        ec_required = ec.get("required", [])
        self.assertNotIn("dataset_access", ec_required)
        self.assertNotIn("code_access", ec_required)
        self.assertNotIn("has_code", ec_required)

    def test_backward_compatibility_new_fields_optional(self):
        """Root schema must not require newly introduced fields for legacy compatibility."""
        required = self.paper_schema.get("required", [])
        new_fields = [
            "candidate_roles",
            "candidate_assessment",
            "integrity",
            "reproducibility",
            "claim_provenance",
            "recommended_action",
            "decision_state",
        ]
        for field in new_fields:
            self.assertNotIn(
                field,
                required,
                f"Field '{field}' must not be mandatory at root to preserve legacy compatibility",
            )


if __name__ == "__main__":
    unittest.main()
