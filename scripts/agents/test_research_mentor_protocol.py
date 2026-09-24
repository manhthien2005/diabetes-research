#!/usr/bin/env python3
"""Contract and static scenario validation for the Research Mentor Interaction Protocol.

Validates that diabetes-research-scientist implements the Research Mentor Interaction
Protocol across DIRECT_MODE, MENTOR_MODE, and HYBRID_MODE, enforces adaptive explanation
depth, grounds concepts in the diabetes-research repository, safeguards simulation
integrity, executes wrong-versus-right teaching, challenges invalid scientific shortcuts,
and respects user intent without compromising scientific invariants or decision authority.

Standard library only; deterministic static tests without external dependencies or LLM calls.
"""

import json
import re
import unittest
from pathlib import Path

MANAGED_SKILLS = [
    "analyze-stats",
    "check-reporting",
    "define-variables",
    "design-study",
    "paper-analyzer",
    "paper-comparator",
    "paper-finder",
    "pdf-extract",
    "pdf-fetch",
    "peer-review",
    "polish-language",
    "prediction-model-rigor",
    "self-review",
    "verify-refs",
]


class TestResearchMentorProtocol(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parent.parent.parent
        cls.agent_path = (
            cls.repo_root
            / ".agents"
            / "agents"
            / "diabetes-research-scientist"
            / "agent.md"
        )
        if not cls.agent_path.exists():
            raise FileNotFoundError(f"Agent prompt not found at {cls.agent_path}")

        with open(cls.agent_path, "r", encoding="utf-8") as f:
            cls.agent_content = f.read()

        cls.agent_lower = cls.agent_content.lower()

        cls.fixtures_path = (
            cls.repo_root
            / "scripts"
            / "agents"
            / "fixtures"
            / "research_mentor_scenarios.json"
        )
        if not cls.fixtures_path.exists():
            raise FileNotFoundError(f"Scenario fixture not found at {cls.fixtures_path}")

        with open(cls.fixtures_path, "r", encoding="utf-8") as f:
            cls.fixtures_data = json.load(f)

        cls.scenarios = cls.fixtures_data.get("scenarios", [])

    # --- Mode Definition Tests ---

    def test_agent_contains_direct_mode_behavior(self):
        self.assertIn("direct_mode", self.agent_lower)
        self.assertTrue(
            "answer or execute directly" in self.agent_lower
            or "execute directly" in self.agent_lower
        )
        # Direct mode must not force tutorials
        self.assertTrue(
            "do not force tutorials" in self.agent_lower
            or "do not automatically add a tutorial" in self.agent_lower
        )

    def test_agent_contains_mentor_mode_behavior(self):
        self.assertIn("mentor_mode", self.agent_lower)
        self.assertTrue(
            "teach progressively" in self.agent_lower
            or "progressive" in self.agent_lower
        )

    def test_agent_contains_hybrid_mode_behavior(self):
        self.assertIn("hybrid_mode", self.agent_lower)
        self.assertTrue(
            "alongside the explanation" in self.agent_lower
            or "alongside explanation" in self.agent_lower
            or "alongside" in self.agent_lower
        )

    def test_agent_defines_adaptive_depth_rather_than_always_deep(self):
        self.assertIn("brief", self.agent_lower)
        self.assertIn("standard", self.agent_lower)
        self.assertIn("deep", self.agent_lower)
        self.assertTrue(
            "adaptive depth" in self.agent_lower
            or "adaptive explanation depth" in self.agent_lower
        )

    # --- Pedagogical Progression Tests ---

    def test_agent_includes_intuition_to_rigor_progression(self):
        self.assertTrue(
            "intuition then rigor" in self.agent_lower
            or "intuition to rigorous" in self.agent_lower
            or "intuition" in self.agent_lower and "scientific mechanism" in self.agent_lower
        )

    def test_agent_includes_repository_specific_grounding(self):
        self.assertTrue(
            "repository grounding" in self.agent_lower
            or "diabetes-research repository" in self.agent_lower
        )

    def test_agent_includes_worked_example_behavior(self):
        self.assertTrue(
            "worked example" in self.agent_lower
            or "worked examples" in self.agent_lower
        )

    def test_agent_includes_wrong_versus_right_methodology_teaching(self):
        self.assertTrue(
            "wrong versus right" in self.agent_lower
            or "wrong-versus-right" in self.agent_lower
            or "plausible wrong approach" in self.agent_lower
        )

    # --- Simulation Integrity Tests ---

    def test_agent_prohibits_presenting_simulated_values_as_actual_results(self):
        self.assertTrue(
            "never present simulated" in self.agent_lower
            or "never present simulated auc" in self.agent_lower
        )
        self.assertTrue(
            "illustrative" in self.agent_lower
            or "simulated" in self.agent_lower
        )

    def test_agent_prohibits_inventing_actual_repository_variables(self):
        self.assertTrue(
            "never invent nhanes variable names" in self.agent_lower
            or "never invent" in self.agent_lower and "variable" in self.agent_lower
        )

    # --- Preservation of Scientific Invariants & Authority ---

    def test_agent_preserves_source_first_behavior(self):
        self.assertTrue(
            "source first" in self.agent_lower
            or "source-first" in self.agent_lower
        )

    def test_agent_preserves_human_decision_authority(self):
        self.assertIn("decision_authority.md", self.agent_lower)
        self.assertIn("promotion", self.agent_lower)
        self.assertIn("permanent rejection", self.agent_lower)
        self.assertIn("deletion", self.agent_lower)
        self.assertIn("frozen outcome", self.agent_lower)
        self.assertIn("frozen cohort", self.agent_lower)
        self.assertIn("frozen prediction horizon", self.agent_lower)

    def test_agent_preserves_all_14_skill_names(self):
        for skill in MANAGED_SKILLS:
            self.assertIn(skill, self.agent_content, f"Managed skill '{skill}' missing from agent.md")

    def test_agent_preserves_evidence_versus_reproducibility_separation(self):
        self.assertTrue(
            "separation of evidence and reproducibility" in self.agent_lower
            or "evidence_policy.md" in self.agent_lower
        )
        self.assertTrue(
            "evidence_candidate" in self.agent_lower
            and "reproduction_candidate" in self.agent_lower
        )

    def test_agent_preserves_variable_definition_routing(self):
        self.assertIn("define-variables", self.agent_content)
        self.assertIn("variable_contract.md", self.agent_lower)

    def test_agent_preserves_prediction_model_rigor_routing(self):
        self.assertIn("prediction-model-rigor", self.agent_content)
        self.assertIn("nested cross-validation", self.agent_lower)

    # --- Scientific Invariant Checks in Mentor Guidance ---

    def test_agent_distinguishes_post_index_leakage(self):
        self.assertTrue(
            "post_index" in self.agent_lower or "post-index" in self.agent_lower
        )
        self.assertTrue(
            "leakage" in self.agent_lower
        )

    def test_agent_rejects_preprocessing_before_validation_splitting(self):
        self.assertTrue(
            "fold-isolated" in self.agent_lower or "inside training folds" in self.agent_lower
        )
        self.assertTrue(
            "before validation splitting" in self.agent_lower
        )

    def test_agent_rejects_final_test_threshold_tuning(self):
        self.assertTrue(
            "final test set" in self.agent_lower or "test set" in self.agent_lower
        )
        self.assertTrue(
            "threshold" in self.agent_lower
        )

    def test_agent_rejects_citation_count_as_proof(self):
        self.assertTrue(
            "never treat citation count" in self.agent_lower
            or "citation count" in self.agent_lower
        )

    def test_agent_rejects_shap_as_automatic_causal_evidence(self):
        self.assertTrue(
            "shap" in self.agent_lower
            and "causal" in self.agent_lower
        )

    def test_agent_protects_clinical_score_identity(self):
        self.assertTrue(
            "clinical score" in self.agent_lower
            or "findrisc" in self.agent_lower
            or "proxy" in self.agent_lower
        )

    def test_agent_preserves_nhanes_complex_survey_awareness(self):
        self.assertIn("wtmec2yr", self.agent_lower)
        self.assertIn("sdmvstra", self.agent_lower)
        self.assertIn("sdmvpsu", self.agent_lower)

    # --- Interaction Quality & Communication Constraints ---

    def test_agent_does_not_require_quiz_after_every_explanation(self):
        self.assertTrue(
            "never enforce a mandatory quiz" in self.agent_lower
            or "never force an understanding checkpoint after every explanation" in self.agent_lower
            or "never enforce mandatory quizzes" in self.agent_lower
        )

    def test_agent_respects_explicit_user_brevity_requests(self):
        self.assertTrue(
            "brevity" in self.agent_lower
            or "no yapping" in self.agent_lower
            or "concise" in self.agent_lower
        )

    def test_agent_supports_deep_detailed_simulation_when_explicitly_requested(self):
        self.assertTrue(
            "deep" in self.agent_lower
            and ("simulation" in self.agent_lower or "simulations" in self.agent_lower)
        )

    def test_agent_defaults_user_facing_communication_to_vietnamese(self):
        self.assertIn("vietnamese", self.agent_lower)

    def test_agent_does_not_expose_hidden_chain_of_thought(self):
        self.assertTrue(
            "do not expose hidden chain-of-thought" in self.agent_lower
            or "hidden chain-of-thought" in self.agent_lower
        )

    # --- Static Scenario Corpus Tests (Phase 15) ---

    def test_scenario_corpus_parses_and_has_scenarios(self):
        self.assertIsInstance(self.scenarios, list)
        self.assertEqual(len(self.scenarios), 10, "Expected exactly 10 mentor scenarios")

    def test_scenario_ids_are_unique(self):
        ids = [s["id"] for s in self.scenarios]
        self.assertEqual(len(ids), len(set(ids)), f"Duplicate scenario IDs found: {ids}")

    def test_scenario_intents_valid(self):
        valid_intents = {"direct", "mentor", "hybrid"}
        for s in self.scenarios:
            self.assertIn(
                s.get("intent"),
                valid_intents,
                f"Scenario '{s['id']}' has invalid intent: {s.get('intent')}",
            )

    def test_scenario_depths_valid(self):
        valid_depths = {"brief", "standard", "deep"}
        for s in self.scenarios:
            self.assertIn(
                s.get("depth"),
                valid_depths,
                f"Scenario '{s['id']}' has invalid depth: {s.get('depth')}",
            )

    def test_scenario_distribution_counts(self):
        direct_count = sum(1 for s in self.scenarios if s.get("intent") == "direct")
        hybrid_count = sum(1 for s in self.scenarios if s.get("intent") == "hybrid")
        mentor_count = sum(1 for s in self.scenarios if s.get("intent") == "mentor")

        self.assertGreaterEqual(direct_count, 1, "Must have at least one direct scenario")
        self.assertGreaterEqual(hybrid_count, 1, "Must have at least one hybrid scenario")
        self.assertGreaterEqual(mentor_count, 5, "Must have at least five mentor scenarios")

    def test_nested_cv_teaching_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR01_WHY_NESTED_CV"), None)
        self.assertIsNotNone(s, "Missing scenario MTR01_WHY_NESTED_CV")
        self.assertEqual(s["intent"], "mentor")
        self.assertEqual(s["depth"], "deep")
        reqs = s.get("required_behavior", [])
        for item in ["intuition", "scientific mechanism", "worked simulation", "wrong approach", "failure explanation", "corrected approach", "repository relevance"]:
            self.assertIn(item, reqs)

    def test_leakage_correction_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR03_POST_INDEX_HIGH_AUC"), None)
        self.assertIsNotNone(s, "Missing scenario MTR03_POST_INDEX_HIGH_AUC")
        self.assertEqual(s["intent"], "mentor")
        reqs = s.get("required_behavior", [])
        self.assertTrue(any("leakage" in r for r in reqs))
        self.assertTrue(any("shortcut" in r for r in reqs))

    def test_evidence_versus_reproducibility_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR05_EVIDENCE_VS_REPRODUCIBILITY"), None)
        self.assertIsNotNone(s, "Missing scenario MTR05_EVIDENCE_VS_REPRODUCIBILITY")
        self.assertEqual(s["intent"], "mentor")
        reqs = s.get("required_behavior", [])
        self.assertTrue(any("reproducibility" in r for r in reqs))

    def test_nhanes_variable_verification_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR04_NHANES_VARIABLE_UNKNOWN"), None)
        self.assertIsNotNone(s, "Missing scenario MTR04_NHANES_VARIABLE_UNKNOWN")
        self.assertEqual(s["intent"], "mentor")
        reqs = s.get("required_behavior", [])
        self.assertTrue(any("define-variables" in r for r in reqs))
        self.assertTrue(any("guess" in r for r in reqs))

    def test_causal_overclaim_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR06_SHAP_CAUSALITY"), None)
        self.assertIsNotNone(s, "Missing scenario MTR06_SHAP_CAUSALITY")
        self.assertEqual(s["intent"], "mentor")
        reqs = s.get("required_behavior", [])
        self.assertTrue(any("causal" in r for r in reqs))

    def test_simulation_integrity_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR08_SIMULATION_INTEGRITY"), None)
        self.assertIsNotNone(s, "Missing scenario MTR08_SIMULATION_INTEGRITY")
        self.assertEqual(s["intent"], "mentor")
        self.assertEqual(s["depth"], "deep")
        reqs = s.get("required_behavior", [])
        self.assertTrue(any("illustrative" in r for r in reqs))

    def test_frozen_science_authority_scenario_present(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR09_FROZEN_SCIENCE"), None)
        self.assertIsNotNone(s, "Missing scenario MTR09_FROZEN_SCIENCE")
        self.assertEqual(s["intent"], "mentor")
        reqs = s.get("required_behavior", [])
        self.assertTrue(any("human approval" in r for r in reqs))

    def test_simple_definition_scenario_proving_mentor_can_remain_brief(self):
        s = next((s for s in self.scenarios if s["id"] == "MTR10_SIMPLE_DEFINITION"), None)
        self.assertIsNotNone(s, "Missing scenario MTR10_SIMPLE_DEFINITION")
        self.assertEqual(s["intent"], "mentor")
        self.assertEqual(s["depth"], "brief")
        forb = s.get("forbidden_behavior", [])
        self.assertTrue(any("tutorial" in f for f in forb))


if __name__ == "__main__":
    unittest.main()
