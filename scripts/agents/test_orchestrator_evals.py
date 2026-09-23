#!/usr/bin/env python3
"""Static validation and grader unit tests for diabetes-research-scientist evaluations.

Validates the evaluation contract, scenario corpus completeness, skill allowlist,
authority boundaries, adversarial scientific invariants, and tests deterministic
grading logic on synthetic passing and failing orchestrator plans.
Standard library only; no external dependencies.
"""

import copy
import json
import sys
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from scripts.agents.eval_diabetes_research_scientist import (
    CANONICAL_CONTRACTS,
    MANAGED_SKILLS,
    MANAGED_SKILLS_SET,
    generate_canonical_plan,
    grade_plan,
    load_json_file,
    run_static_evaluations,
)


class TestOrchestratorEvalCorpus(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parent.parent.parent
        cls.evals_dir = cls.repo_root / "evals" / "agents" / "diabetes-research-scientist"
        cls.contract_path = cls.evals_dir / "eval_contract.json"
        cls.scenarios_path = cls.evals_dir / "scenarios.json"

        cls.contract = load_json_file(cls.contract_path)
        cls.scenarios_data = load_json_file(cls.scenarios_path)
        cls.scenarios = cls.scenarios_data.get("scenarios", [])

    def test_eval_contract_parses_and_has_required_schema_fields(self):
        self.assertIn("properties", self.contract)
        self.assertIn("required", self.contract)
        required_fields = [
            "task_class",
            "primary_skills",
            "support_skills",
            "contracts",
            "workflow_order",
            "requires_human_approval",
            "approval_reason",
            "must_not_do",
            "blockers",
            "scientific_risks",
        ]
        for field in required_fields:
            self.assertIn(field, self.contract["properties"])
            self.assertIn(field, self.contract["required"])

    def test_scenarios_json_parses_and_has_scenarios_list(self):
        self.assertIsInstance(self.scenarios, list)
        self.assertGreaterEqual(len(self.scenarios), 20)

    def test_scenario_ids_are_unique(self):
        ids = [s["id"] for s in self.scenarios]
        self.assertEqual(len(ids), len(set(ids)), f"Duplicate scenario IDs found: {ids}")

    def test_every_referenced_skill_in_allowlist(self):
        for s in self.scenarios:
            sid = s["id"]
            for skill in s.get("expected_primary_skills", []):
                self.assertIn(
                    skill,
                    MANAGED_SKILLS_SET,
                    f"Scenario '{sid}' references non-allowlist primary skill: {skill}",
                )
            for skill in s.get("allowed_support_skills", []):
                self.assertIn(
                    skill,
                    MANAGED_SKILLS_SET,
                    f"Scenario '{sid}' references non-allowlist support skill: {skill}",
                )
            for skill in s.get("expected_workflow_order", []):
                self.assertIn(
                    skill,
                    MANAGED_SKILLS_SET,
                    f"Scenario '{sid}' references non-allowlist workflow skill: {skill}",
                )

    def test_all_14_managed_skills_covered_across_scenarios(self):
        covered_skills = set()
        for s in self.scenarios:
            covered_skills.update(s.get("expected_primary_skills", []))
            covered_skills.update(s.get("allowed_support_skills", []))
            covered_skills.update(s.get("expected_workflow_order", []))

        for skill in MANAGED_SKILLS:
            self.assertIn(
                skill,
                covered_skills,
                f"Managed skill '{skill}' not covered in any evaluation scenario",
            )

    def test_authority_scenarios_declare_human_approval_true(self):
        authority_scenarios = [s for s in self.scenarios if s.get("category") == "AUTHORITY"]
        self.assertGreaterEqual(len(authority_scenarios), 4)
        for s in authority_scenarios:
            self.assertTrue(
                s.get("expected_human_approval"),
                f"Authority scenario '{s['id']}' must declare expected_human_approval: true",
            )

    def test_scientific_adversarial_scenarios_have_required_checks(self):
        adv_scenarios = [s for s in self.scenarios if s.get("category") == "ADVERSARIAL_SCIENTIFIC"]
        self.assertGreaterEqual(len(adv_scenarios), 8)
        for s in adv_scenarios:
            checks = s.get("required_semantic_checks", [])
            self.assertGreater(
                len(checks),
                0,
                f"Adversarial scenario '{s['id']}' must contain at least one required semantic check",
            )

    def test_both_internal_and_external_peer_review_routes_covered(self):
        pr_scenarios = [s for s in self.scenarios if s.get("category") == "PEER_REVIEW_ROUTES"]
        self.assertGreaterEqual(len(pr_scenarios), 2)
        pr_ids = [s["id"] for s in pr_scenarios]
        self.assertIn("P01_INTERNAL_ROB", pr_ids)
        self.assertIn("P02_EXTERNAL_JOURNAL_REVIEW", pr_ids)

    def test_evidence_versus_reproducibility_scenario_present(self):
        e_scenarios = [s for s in self.scenarios if s.get("category") == "EVIDENCE_SEMANTICS"]
        self.assertGreaterEqual(len(e_scenarios), 3)
        e_ids = [s["id"] for s in e_scenarios]
        self.assertIn("E01_STRONG_EVIDENCE_LOW_REPRODUCIBILITY", e_ids)

    def test_nhanes_survey_scenario_present(self):
        found = any(
            "nhanes" in s["prompt"].lower() and "analyze-stats" in s["expected_primary_skills"]
            for s in self.scenarios
        )
        self.assertTrue(found, "Corpus must include an NHANES complex survey weighting scenario")

    def test_variable_definition_scenario_present(self):
        found = any(
            "define-variables" in s["expected_primary_skills"] for s in self.scenarios
        )
        self.assertTrue(found, "Corpus must include a variable operationalization scenario")

    def test_leakage_scenarios_present(self):
        leakage_scenarios = [
            s for s in self.scenarios if "leakage" in " ".join(s.get("required_semantic_checks", [])).lower()
        ]
        self.assertGreaterEqual(len(leakage_scenarios), 2)

    def test_reference_integrity_scenarios_present(self):
        found = any(
            "verify-refs" in s["expected_primary_skills"] for s in self.scenarios
        )
        self.assertTrue(found, "Corpus must include a reference integrity scenario")

    def test_multistep_workflow_scenarios_present(self):
        multi_scenarios = [s for s in self.scenarios if s.get("category") == "MULTISTEP_WORKFLOW"]
        self.assertGreaterEqual(len(multi_scenarios), 3)
        for s in multi_scenarios:
            order = s.get("expected_workflow_order", [])
            self.assertGreaterEqual(
                len(order),
                3,
                f"Multi-step scenario '{s['id']}' must declare at least 3 ordered workflow steps",
            )


class TestDeterministicGradingEngine(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parent.parent.parent
        cls.scenarios_path = (
            cls.repo_root
            / "evals"
            / "agents"
            / "diabetes-research-scientist"
            / "scenarios.json"
        )
        cls.scenarios_data = load_json_file(cls.scenarios_path)
        cls.scenarios_by_id = {s["id"]: s for s in cls.scenarios_data["scenarios"]}

    def test_all_canonical_plans_pass_grading(self):
        summary = run_static_evaluations(self.scenarios_data)
        self.assertEqual(
            summary["failed_count"],
            0,
            f"Expected 0 failed canonical scenarios, got {summary['failed_count']}: {summary['failed']}",
        )
        self.assertEqual(summary["passed_count"], len(self.scenarios_data["scenarios"]))

    def test_grader_fails_on_unknown_skill(self):
        scenario = self.scenarios_by_id["R01_LITERATURE_DISCOVERY"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["primary_skills"] = ["radiomics-ml"]  # Retired/unknown skill
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Unknown skill" in f["finding"] for f in findings),
            "Grader must flag unknown skill names",
        )

    def test_grader_fails_on_missing_expected_primary_skill(self):
        scenario = self.scenarios_by_id["R03_VARIABLE_OPERATIONALIZATION"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["primary_skills"] = ["analyze-stats"]  # Wrong primary skill
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Expected primary skill" in f["finding"] for f in findings),
            "Grader must flag missing expected primary skill",
        )

    def test_grader_fails_on_forbidden_skill(self):
        scenario = self.scenarios_by_id["R01_LITERATURE_DISCOVERY"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["primary_skills"] = ["paper-finder", "radiomics-ml"]
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Forbidden skill" in f["finding"] or "Unknown skill" in f["finding"] for f in findings),
        )

    def test_grader_fails_on_human_approval_bypass(self):
        scenario = self.scenarios_by_id["A01_FINAL_PROMOTION"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["requires_human_approval"] = False  # Bypassed approval
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Human approval mismatch" in f["finding"] for f in findings),
            "Grader must flag bypassed human approval on irreversible actions",
        )

    def test_grader_fails_on_missing_required_contract(self):
        scenario = self.scenarios_by_id["R02_SINGLE_PAPER_ANALYSIS"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["contracts"] = ["AGENTS.md"]  # Missing EVIDENCE_POLICY.md and PAPER_SCHEMA.md
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Required contract" in f["finding"] for f in findings),
            "Grader must flag missing required contracts",
        )

    def test_grader_fails_on_workflow_order_inversion(self):
        scenario = self.scenarios_by_id["M02_STUDY_TO_MODEL"]
        bad_plan = generate_canonical_plan(scenario)
        # Invert order: modeling before variable operationalization
        bad_plan["workflow_order"] = [
            "prediction-model-rigor",
            "define-variables",
            "design-study",
            "analyze-stats",
        ]
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Workflow order inversion" in f["finding"] for f in findings),
            "Grader must flag workflow step ordering inversion",
        )

    def test_grader_fails_on_forbidden_semantic_pattern(self):
        scenario = self.scenarios_by_id["E01_STRONG_EVIDENCE_LOW_REPRODUCIBILITY"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["scientific_risks"].append("No public code therefore scientifically invalid.")
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("Forbidden semantic pattern" in f["finding"] for f in findings),
            "Grader must flag forbidden semantic patterns",
        )

    def test_grader_fails_on_claimed_repository_mutation(self):
        scenario = self.scenarios_by_id["R01_LITERATURE_DISCOVERY"]
        bad_plan = generate_canonical_plan(scenario)
        bad_plan["must_not_do"].append("I already committed changes to the repository.")
        status, findings = grade_plan(scenario, bad_plan)
        self.assertEqual(status, "FAIL")
        self.assertTrue(
            any("claimed repository mutation" in f["finding"] for f in findings),
            "Grader must fail plans claiming repository mutation in planning mode",
        )


if __name__ == "__main__":
    unittest.main()
