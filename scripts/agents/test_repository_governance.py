#!/usr/bin/env python3
"""Unit tests for repository governance consolidation and canonical contracts.

Validates that AGENTS.md operates as a concise entry point adhering to size
limits, references all canonical governance contracts, enforces source-first
behavior, preserves human decision authority boundaries, prohibits git add all,
and maintains contract integrity without methodology drift.
Standard library only; no external dependencies.
"""

import os
import re
import subprocess
import unittest
from pathlib import Path

BASE_SHA = "27a011e6523a3660fc21ee894b00a284336148b5"

CANONICAL_CONTRACTS = [
    "docs/agent/RESEARCH_CONTRACT.md",
    "docs/agent/REPOSITORY_MAP.md",
    "docs/agent/EVIDENCE_POLICY.md",
    "docs/agent/EXPERIMENT_POLICY.md",
    "docs/agent/PAPER_SCHEMA.md",
    "docs/agent/DECISION_AUTHORITY.md",
    "docs/agent/VARIABLE_CONTRACT.md",
]


class TestRepositoryGovernance(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parent.parent.parent
        cls.agents_path = cls.repo_root / "AGENTS.md"
        if not cls.agents_path.exists():
            raise FileNotFoundError(f"AGENTS.md not found at {cls.agents_path}")

        with open(cls.agents_path, "r", encoding="utf-8") as f:
            cls.agents_content = f.read()

        cls.agents_lines = cls.agents_content.splitlines()
        cls.agents_nonblank_lines = [l for l in cls.agents_lines if l.strip()]

    def test_agents_md_exists(self):
        self.assertTrue(self.agents_path.is_file(), "AGENTS.md must exist at repository root")

    def test_agents_md_line_count_within_hard_limit(self):
        count = len(self.agents_nonblank_lines)
        self.assertLessEqual(
            count,
            180,
            f"AGENTS.md has {count} nonblank lines, exceeding hard maximum of 180",
        )
        self.assertGreaterEqual(
            count,
            75,
            f"AGENTS.md has {count} nonblank lines, which is unexpectedly sparse",
        )

    def test_all_seven_canonical_contract_paths_referenced(self):
        for contract in CANONICAL_CONTRACTS:
            self.assertIn(
                contract,
                self.agents_content,
                f"Canonical contract path '{contract}' not referenced in AGENTS.md",
            )

    def test_all_seven_canonical_contract_files_exist(self):
        for contract in CANONICAL_CONTRACTS:
            p = self.repo_root / contract
            self.assertTrue(
                p.is_file(),
                f"Canonical contract file '{contract}' does not exist on disk",
            )

    def test_agents_references_diabetes_research_scientist(self):
        self.assertIn(
            "diabetes-research-scientist",
            self.agents_content,
            "AGENTS.md must reference diabetes-research-scientist as primary orchestrator",
        )

    def test_agents_references_agents_skills_as_canonical_source(self):
        self.assertIn(
            ".agents/skills",
            self.agents_content,
            "AGENTS.md must reference .agents/skills as canonical research skill source",
        )

    def test_agents_preserves_source_first_behavior(self):
        content_lower = self.agents_content.lower()
        self.assertTrue(
            "source-first" in content_lower or "source first" in content_lower,
            "AGENTS.md must explicitly enforce source-first behavior",
        )
        self.assertTrue(
            "git status" in content_lower,
            "AGENTS.md must instruct checking git status / source before editing",
        )

    def test_agents_preserves_irreversible_human_authority_summary(self):
        content_lower = self.agents_content.lower()
        self.assertIn("promotion", content_lower)
        self.assertIn("permanent rejection", content_lower)
        self.assertIn("frozen hypothesis", content_lower)
        self.assertIn("frozen outcome", content_lower)
        self.assertIn("frozen cohort", content_lower)
        self.assertIn("prediction horizon", content_lower)

    def test_agents_prohibits_git_add_all(self):
        self.assertIn("git add .", self.agents_content)
        self.assertIn("git add -a", self.agents_content.lower())
        content_lower = self.agents_content.lower()
        self.assertTrue(
            "never use `git add .`" in content_lower or "never use git add ." in content_lower or "git add . prohibition" in content_lower,
            "AGENTS.md must explicitly prohibit git add .",
        )
        self.assertTrue(
            "never use `git add -a`" in content_lower or "never use git add -a" in content_lower or "git add -a prohibition" in content_lower,
            "AGENTS.md must explicitly prohibit git add -A",
        )

    def test_agents_contains_no_active_radiomics_routing(self):
        self.assertNotIn("`radiomics-ml`:", self.agents_content)
        self.assertNotIn("- radiomics-ml\n", self.agents_content)
        if "radiomics-ml" in self.agents_content:
            self.assertIn(
                "deprecated",
                self.agents_content.lower(),
                "Any mention of radiomics-ml must be deprecated/retired",
            )

    def test_research_contract_delegations(self):
        rc_path = self.repo_root / "docs" / "agent" / "RESEARCH_CONTRACT.md"
        with open(rc_path, "r", encoding="utf-8") as f:
            rc_content = f.read()

        delegated_contracts = [
            "DECISION_AUTHORITY.md",
            "EVIDENCE_POLICY.md",
            "PAPER_SCHEMA.md",
            "VARIABLE_CONTRACT.md",
            "EXPERIMENT_POLICY.md",
            "REPOSITORY_MAP.md",
        ]
        for c in delegated_contracts:
            self.assertIn(
                c,
                rc_content,
                f"RESEARCH_CONTRACT.md must delegate to canonical contract '{c}'",
            )

    def test_repository_map_documents_skill_and_mirror_roots(self):
        rm_path = self.repo_root / "docs" / "agent" / "REPOSITORY_MAP.md"
        with open(rm_path, "r", encoding="utf-8") as f:
            rm_content = f.read()

        self.assertIn(".agents/skills", rm_content)
        self.assertIn(".claude/skills", rm_content)
        self.assertIn("research_skill_mirror.py", rm_content)
        self.assertIn("diabetes-research-scientist", rm_content)

    def test_experiment_policy_integrity_rules(self):
        ep_path = self.repo_root / "docs" / "agent" / "EXPERIMENT_POLICY.md"
        with open(ep_path, "r", encoding="utf-8") as f:
            ep_content = f.read()

        content_lower = ep_content.lower()
        self.assertIn("test set", content_lower)
        self.assertIn("learned preprocessing", content_lower)
        self.assertIn("feature selection", content_lower)
        self.assertIn("threshold", content_lower)
        self.assertIn("external validation", content_lower)
        self.assertIn("immutability", content_lower)

    def test_base_contracts_unchanged_from_base_sha(self):
        base_files = [
            "docs/agent/DECISION_AUTHORITY.md",
            "docs/agent/EVIDENCE_POLICY.md",
            "docs/agent/PAPER_SCHEMA.md",
            "docs/agent/VARIABLE_CONTRACT.md",
            ".agents/agents/diabetes-research-scientist/agent.md",
        ]
        for bf in base_files:
            res = subprocess.run(
                ["git", "diff", "--quiet", BASE_SHA, "--", bf],
                cwd=str(self.repo_root),
                capture_output=True,
            )
            self.assertEqual(
                res.returncode,
                0,
                f"File '{bf}' differs from base commit {BASE_SHA}",
            )


if __name__ == "__main__":
    unittest.main()
