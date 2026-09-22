#!/usr/bin/env python3
"""Unit tests for research_skill_mirror.py.

Uses Python standard library unittest only.
Tests run in temporary directories and never modify the real repository.
"""

import json
import os
from pathlib import Path
import shutil
import tempfile
import unittest

from scripts.skills.research_skill_mirror import (
    main,
    validate_manifest,
    check_parity,
    sync_all,
)


class TestResearchSkillMirror(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.repo_root = Path(self.temp_dir.name)
        self.canonical_root = self.repo_root / ".agents" / "skills"
        self.mirror_root = self.repo_root / ".claude" / "skills"
        self.canonical_root.mkdir(parents=True, exist_ok=True)
        self.mirror_root.mkdir(parents=True, exist_ok=True)

        self.manifest_path = self.repo_root / "manifest.json"
        self.manifest_data = {
            "schema_version": 1,
            "canonical_root": ".agents/skills",
            "mirror_root": ".claude/skills",
            "managed_skills": ["test-skill"],
            "unmanaged_mirror_policy": "preserve",
        }
        self._write_manifest(self.manifest_data)

    def tearDown(self):
        self.temp_dir.cleanup()

    def _write_manifest(self, data: dict):
        with open(self.manifest_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def _create_skill(self, base_root: Path, skill: str, files: dict):
        skill_dir = base_root / skill
        skill_dir.mkdir(parents=True, exist_ok=True)
        for rel_path, content in files.items():
            full_path = skill_dir / rel_path
            full_path.parent.mkdir(parents=True, exist_ok=True)
            if isinstance(content, str):
                full_path.write_text(content, encoding="utf-8")
            else:
                full_path.write_bytes(content)

    def test_clean_pair_passes_check(self):
        """Identical canonical and mirror skill trees pass."""
        files = {
            "SKILL.md": "# Test Skill\nDescription",
            "scripts/helper.py": "print('hello')",
        }
        self._create_skill(self.canonical_root, "test-skill", files)
        self._create_skill(self.mirror_root, "test-skill", files)

        code = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertEqual(code, 0)

    def test_changed_file_detected(self):
        """A changed mirrored SKILL.md or resource causes check failure."""
        canon_files = {"SKILL.md": "# Canonical Skill"}
        mirror_files = {"SKILL.md": "# Mirrored Skill Diverged"}
        self._create_skill(self.canonical_root, "test-skill", canon_files)
        self._create_skill(self.mirror_root, "test-skill", mirror_files)

        code = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertNotEqual(code, 0)

    def test_missing_file_detected(self):
        """A file present only in canonical causes check failure."""
        canon_files = {
            "SKILL.md": "# Canonical Skill",
            "reference.md": "Additional data",
        }
        mirror_files = {
            "SKILL.md": "# Canonical Skill",
        }
        self._create_skill(self.canonical_root, "test-skill", canon_files)
        self._create_skill(self.mirror_root, "test-skill", mirror_files)

        code = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertNotEqual(code, 0)

    def test_extra_file_detected(self):
        """A stale extra file in a managed mirror causes check failure."""
        canon_files = {
            "SKILL.md": "# Canonical Skill",
        }
        mirror_files = {
            "SKILL.md": "# Canonical Skill",
            "stale_scratch.txt": "stale data",
        }
        self._create_skill(self.canonical_root, "test-skill", canon_files)
        self._create_skill(self.mirror_root, "test-skill", mirror_files)

        code = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertNotEqual(code, 0)

    def test_sync_repairs_managed_drift(self):
        """Sync recreates exact managed parity."""
        canon_files = {
            "SKILL.md": "# Canonical Skill Content",
            "scripts/tool.py": "print('v1.0')",
        }
        mirror_files = {
            "SKILL.md": "# Outdated Content",
            "old_file.txt": "should be deleted",
        }
        self._create_skill(self.canonical_root, "test-skill", canon_files)
        self._create_skill(self.mirror_root, "test-skill", mirror_files)

        # First verify check fails before sync
        code_check_pre = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertNotEqual(code_check_pre, 0)

        # Run sync
        code_sync = main([
            "--sync",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertEqual(code_sync, 0)

        # Stale file should be removed
        stale_file = self.mirror_root / "test-skill" / "old_file.txt"
        self.assertFalse(stale_file.exists())

        # Check should now pass cleanly
        code_check_post = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertEqual(code_check_post, 0)

    def test_sync_preserves_unmanaged_skill(self):
        """A Claude-only sibling skill remains byte-identical and is not removed."""
        canon_files = {"SKILL.md": "# Canonical"}
        mirror_files = {"SKILL.md": "# Drifted"}
        self._create_skill(self.canonical_root, "test-skill", canon_files)
        self._create_skill(self.mirror_root, "test-skill", mirror_files)

        # Create unmanaged Claude-only skill
        unmanaged_files = {
            "SKILL.md": "# Claude-only UI Skill",
            "assets/logo.svg": "<svg>logo</svg>",
        }
        self._create_skill(self.mirror_root, "unmanaged-ui-skill", unmanaged_files)

        unmanaged_skill_md = self.mirror_root / "unmanaged-ui-skill" / "SKILL.md"
        unmanaged_logo = self.mirror_root / "unmanaged-ui-skill" / "assets" / "logo.svg"
        orig_skill_bytes = unmanaged_skill_md.read_bytes()
        orig_logo_bytes = unmanaged_logo.read_bytes()

        # Run sync
        code_sync = main([
            "--sync",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertEqual(code_sync, 0)

        # Assert unmanaged skill files are untouched
        self.assertTrue(unmanaged_skill_md.exists())
        self.assertTrue(unmanaged_logo.exists())
        self.assertEqual(unmanaged_skill_md.read_bytes(), orig_skill_bytes)
        self.assertEqual(unmanaged_logo.read_bytes(), orig_logo_bytes)

        # Assert unmanaged skill was NOT mirrored into .agents
        self.assertFalse((self.canonical_root / "unmanaged-ui-skill").exists())

    def test_path_traversal_manifest_rejected(self):
        """A managed skill name using '..' or separators is rejected."""
        invalid_manifests = [
            {"managed_skills": ["../escape"]},
            {"managed_skills": ["sub/skill"]},
            {"managed_skills": ["..\\escape"]},
            {"managed_skills": [""]},
            {"managed_skills": ["   "]},
            {"managed_skills": ["skill1", "skill1"]},
        ]
        for inv in invalid_manifests:
            bad_data = dict(self.manifest_data)
            bad_data.update(inv)
            self._write_manifest(bad_data)

            code = main([
                "--check",
                "--manifest", str(self.manifest_path),
                "--repo-root", str(self.repo_root),
            ])
            self.assertNotEqual(code, 0, msg=f"Should reject manifest: {inv}")

    def test_check_mode_is_read_only(self):
        """Check does not alter drifted fixture contents."""
        canon_files = {"SKILL.md": "# Canonical Version 2.0"}
        mirror_files = {"SKILL.md": "# Mirror Version 1.0"}
        self._create_skill(self.canonical_root, "test-skill", canon_files)
        self._create_skill(self.mirror_root, "test-skill", mirror_files)

        mirror_md = self.mirror_root / "test-skill" / "SKILL.md"
        before_bytes = mirror_md.read_bytes()

        code = main([
            "--check",
            "--manifest", str(self.manifest_path),
            "--repo-root", str(self.repo_root),
        ])
        self.assertNotEqual(code, 0)

        after_bytes = mirror_md.read_bytes()
        self.assertEqual(before_bytes, after_bytes)


if __name__ == "__main__":
    unittest.main()
