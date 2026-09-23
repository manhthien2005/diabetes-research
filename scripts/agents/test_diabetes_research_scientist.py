#!/usr/bin/env python3
"""Unit tests for the diabetes-research-scientist custom main agent.

Validates structural integrity, YAML frontmatter, verified tools allowlist,
governance contract references, routing of all 14 managed research skills,
human decision authority safeguards, and anti-hallucination constraints.
Standard library only; no external dependencies.
"""

import os
import re
import unittest
from pathlib import Path

VERIFIED_TOOLS_ALLOWLIST = {
    "list_directory",
    "search_directory",
    "find_file",
    "view_file",
    "create_file",
    "edit_file",
    "run_command",
    "ask_question",
    "search_web",
    "read_url_content",
    "finish",
}

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


def parse_frontmatter(content: str):
    """Minimal deterministic YAML frontmatter parser for agent.md."""
    if not content.startswith("---"):
        raise ValueError("File does not start with YAML frontmatter delimiter '---'")

    parts = content.split("---", 2)
    if len(parts) < 3:
        raise ValueError("File does not have matching closing frontmatter delimiter '---'")

    raw_yaml = parts[1].strip()
    body = parts[2].strip()

    frontmatter = {}
    current_list_key = None

    for line in raw_yaml.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue

        # Handle list item
        if stripped.startswith("- "):
            if current_list_key is None:
                raise ValueError(f"Encountered list item without key: {line}")
            val = stripped[2:].strip().strip('"').strip("'")
            frontmatter[current_list_key].append(val)
            continue

        # Handle key: value
        if ":" in stripped:
            key, val = stripped.split(":", 1)
            key = key.strip()
            val = val.strip()

            if not val:
                # Key begins a list or nested structure
                current_list_key = key
                frontmatter[key] = []
            else:
                current_list_key = None
                # Parse basic scalar types
                if val.lower() == "true":
                    frontmatter[key] = True
                elif val.lower() == "false":
                    frontmatter[key] = False
                elif val.isdigit():
                    frontmatter[key] = int(val)
                else:
                    frontmatter[key] = val.strip('"').strip("'")

    return frontmatter, body


class TestDiabetesResearchScientist(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parent.parent.parent
        cls.agent_path = cls.repo_root / ".agents" / "agents" / "diabetes-research-scientist" / "agent.md"
        if not cls.agent_path.exists():
            raise FileNotFoundError(f"Custom agent file not found at {cls.agent_path}")

        with open(cls.agent_path, "r", encoding="utf-8") as f:
            cls.raw_content = f.read()

        cls.frontmatter, cls.body = parse_frontmatter(cls.raw_content)

    def test_frontmatter_name(self):
        self.assertEqual(self.frontmatter.get("name"), "diabetes-research-scientist")

    def test_frontmatter_main_agent(self):
        self.assertTrue(self.frontmatter.get("mainAgent") is True)

    def test_frontmatter_subagent(self):
        self.assertTrue(self.frontmatter.get("subagent") is False)

    def test_frontmatter_model_inherit(self):
        self.assertEqual(self.frontmatter.get("model"), "inherit")

    def test_frontmatter_command_execution_policy_sandbox(self):
        self.assertEqual(self.frontmatter.get("commandExecutionPolicy"), "sandbox")

    def test_frontmatter_description_non_empty(self):
        desc = self.frontmatter.get("description", "")
        self.assertIsInstance(desc, str)
        self.assertGreater(len(desc.strip()), 20)

    def test_frontmatter_tools_allowlist(self):
        tools = self.frontmatter.get("tools", [])
        self.assertIsInstance(tools, list)
        self.assertGreater(len(tools), 0)
        for t in tools:
            self.assertIn(
                t,
                VERIFIED_TOOLS_ALLOWLIST,
                f"Tool '{t}' in agent.md is not in verified Antigravity allowlist",
            )

    def test_all_14_managed_skills_routed(self):
        for skill in MANAGED_SKILLS:
            self.assertIn(
                skill,
                self.body,
                f"Managed skill '{skill}' missing from agent.md routing or instructions",
            )

    def test_prediction_model_rigor_and_define_variables_routed(self):
        self.assertIn("prediction-model-rigor", self.body)
        self.assertIn("define-variables", self.body)

    def test_canonical_governance_contracts_referenced(self):
        contracts = [
            "EVIDENCE_POLICY.md",
            "PAPER_SCHEMA.md",
            "DECISION_AUTHORITY.md",
            "VARIABLE_CONTRACT.md",
        ]
        for contract in contracts:
            self.assertIn(
                contract,
                self.body,
                f"Canonical governance contract '{contract}' not referenced in agent.md",
            )

    def test_human_approval_safeguards_covered(self):
        body_lower = self.body.lower()
        # Must cover promotion, permanent rejection, deletion, frozen outcome, frozen cohort, frozen prediction horizon
        self.assertIn("promotion", body_lower)
        self.assertIn("permanent rejection", body_lower)
        self.assertIn("deletion", body_lower)
        self.assertIn("frozen outcome", body_lower)
        self.assertIn("frozen cohort", body_lower)
        self.assertIn("frozen prediction horizon", body_lower)

    def test_source_first_behavior_enforced(self):
        body_lower = self.body.lower()
        self.assertTrue(
            "source first" in body_lower or "source before acting" in body_lower or "inspect current state" in body_lower,
            "Source-first behavior must be explicitly instructed in agent.md",
        )

    def test_git_add_all_prohibited(self):
        self.assertIn("git add .", self.body)
        self.assertIn("git add -a", self.body.lower())
        # Ensure it is mentioned in negative / forbidden phrasing
        body_lower = self.body.lower()
        self.assertTrue(
            "never use `git add .`" in body_lower or "never use git add ." in body_lower,
            "agent.md must explicitly forbid 'git add .'",
        )

    def test_no_active_radiomics_ml_route(self):
        # radiomics-ml must not be an active skill in the routing list
        self.assertNotIn("`radiomics-ml`", self.body)
        self.assertNotIn("radiomics-ml:", self.body)
        # Any mention must only be as retired or prohibited
        if "radiomics-ml" in self.body:
            self.assertIn("retired", self.body.lower())

    def test_vietnamese_default_communication(self):
        body_lower = self.body.lower()
        self.assertIn("vietnamese", body_lower)


if __name__ == "__main__":
    unittest.main()
