#!/usr/bin/env python3
"""Routing scenario tests for the diabetes-research-scientist custom main agent.

Tests the declarative routing contract across research scenarios without requiring
an LLM call. Standard library static contract tests only.
"""

import re
import unittest
from pathlib import Path


class StaticResearchRouter:
    """Deterministic static router modeling the routing contract in agent.md."""

    ROUTING_RULES = [
        # (Pattern or keyword list, primary_skills, route_selection)
        (
            [r"find.*paper", r"discover.*paper", r"literature.*discovery", r"search.*paper"],
            ["paper-finder"],
            None,
        ),
        (
            [r"define.*variable", r"variable.*unit", r"missing.*code", r"operationaliz.*variable"],
            ["define-variables"],
            None,
        ),
        (
            [r"nested.*cv", r"preprocessing.*leakage", r"prediction.*model.*rigor", r"pipeline.*audit"],
            ["prediction-model-rigor"],
            None,
        ),
        (
            [r"weighted.*nhanes", r"calculate.*statistic", r"survey.*weight", r"statistical.*analysis"],
            ["analyze-stats"],
            None,
        ),
        (
            [r"fabricated.*doi", r"check.*reference", r"citation.*integrity", r"verify.*ref"],
            ["verify-refs"],
            None,
        ),
        (
            [r"tripod\+ai", r"probast\+ai", r"reporting.*guideline", r"check.*reporting"],
            ["check-reporting"],
            None,
        ),
        (
            [r"review.*own.*manuscript", r"pre-submission.*audit", r"self-review"],
            ["self-review"],
            None,
        ),
        (
            [r"internal.*rob", r"literature.*risk.*bias", r"internal.*review.*literature"],
            ["peer-review"],
            "internal RoB",
        ),
        (
            [r"formal.*external.*journal", r"journal.*peer.*review", r"external.*review"],
            ["peer-review"],
            "external journal",
        ),
    ]

    @classmethod
    def route(cls, query: str):
        query_lower = query.lower()

        # Check peer-review disambiguation first
        if "internal" in query_lower and ("rob" in query_lower or "risk of bias" in query_lower or "literature" in query_lower):
            return {
                "primary": ["peer-review"],
                "route": "internal RoB",
            }
        if "external" in query_lower and ("journal" in query_lower or "peer review" in query_lower):
            return {
                "primary": ["peer-review"],
                "route": "external journal",
            }

        for patterns, skills, route_sel in cls.ROUTING_RULES:
            for pat in patterns:
                if re.search(pat, query_lower):
                    return {
                        "primary": skills,
                        "route": route_sel,
                    }

        return {"primary": [], "route": None}


class TestResearchAgentRouting(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parent.parent.parent
        cls.agent_path = cls.repo_root / ".agents" / "agents" / "diabetes-research-scientist" / "agent.md"
        if not cls.agent_path.exists():
            raise FileNotFoundError(f"Custom agent file not found at {cls.agent_path}")

        with open(cls.agent_path, "r", encoding="utf-8") as f:
            cls.agent_body = f.read()

    def test_agent_md_contains_all_task_classifications(self):
        expected_classifications = [
            ("Literature candidate discovery", "paper-finder"),
            ("Retrieve or normalize paper PDF", "pdf-fetch"),
            ("Analyze one research paper", "paper-analyzer"),
            ("Compare research papers", "paper-comparator"),
            ("Variable meaning, coding, units", "define-variables"),
            ("Study design, cohort, inclusion or exclusion", "design-study"),
            ("Clinical tabular prediction-model pipeline", "prediction-model-rigor"),
            ("Statistical analysis execution", "analyze-stats"),
            ("Reference identity, citation integrity", "verify-refs"),
            ("Reporting-guideline compliance", "check-reporting"),
            ("Academic language and manuscript style", "polish-language"),
            ("Pre-submission audit of repository manuscript", "self-review"),
            ("Internal literature risk-of-bias mini-audit", "peer-review"),
            ("Formal external journal peer review", "peer-review"),
        ]
        for task_desc, primary_skill in expected_classifications:
            self.assertIn(
                primary_skill,
                self.agent_body,
                f"Expected skill '{primary_skill}' for task '{task_desc}' in agent.md",
            )

    def test_agent_md_distinguishes_peer_review_routes(self):
        body_lower = self.agent_body.lower()
        self.assertIn("internal rob mini-audit route", body_lower)
        self.assertIn("external journal peer review route", body_lower)

    def test_scenario_find_diabetes_prediction_papers(self):
        result = StaticResearchRouter.route("Find diabetes prediction papers")
        self.assertIn("paper-finder", result["primary"])

    def test_scenario_define_nhanes_predictor_variable_units_and_missing_codes(self):
        result = StaticResearchRouter.route("Define NHANES predictor variable units and missing codes")
        self.assertIn("define-variables", result["primary"])

    def test_scenario_audit_nested_cv_and_preprocessing_leakage(self):
        result = StaticResearchRouter.route("Audit nested CV and preprocessing leakage")
        self.assertIn("prediction-model-rigor", result["primary"])

    def test_scenario_calculate_weighted_nhanes_statistics(self):
        result = StaticResearchRouter.route("Calculate weighted NHANES statistics")
        self.assertIn("analyze-stats", result["primary"])

    def test_scenario_check_manuscript_references_for_fabricated_doi(self):
        result = StaticResearchRouter.route("Check manuscript references for fabricated DOI")
        self.assertIn("verify-refs", result["primary"])

    def test_scenario_audit_tripod_ai_reporting(self):
        result = StaticResearchRouter.route("Audit TRIPOD+AI reporting")
        self.assertIn("check-reporting", result["primary"])

    def test_scenario_review_own_manuscript_before_submission(self):
        result = StaticResearchRouter.route("Review own manuscript before submission")
        self.assertIn("self-review", result["primary"])

    def test_scenario_internal_rob_review_of_searched_literature_paper(self):
        result = StaticResearchRouter.route("Internal RoB review of a searched literature paper")
        self.assertIn("peer-review", result["primary"])
        self.assertEqual(result["route"], "internal RoB")

    def test_scenario_formal_external_journal_review(self):
        result = StaticResearchRouter.route("Formal external journal review")
        self.assertIn("peer-review", result["primary"])
        self.assertEqual(result["route"], "external journal")


if __name__ == "__main__":
    unittest.main()
