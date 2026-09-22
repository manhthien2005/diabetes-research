#!/usr/bin/env python3
"""Research Skill Mirror Manager.

Maintains deterministic parity between canonical research skills (.agents/skills)
and generated compatibility mirrors (.claude/skills).
Uses standard library only.
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import shutil
import sys
from typing import Dict, List, Optional, Set, Tuple


IGNORE_DIRS = {"__pycache__"}
IGNORE_FILES = {".DS_Store"}


def is_transient(name: str) -> bool:
    """Check if a file or directory name is a transient/cache artifact."""
    if name in IGNORE_DIRS or name in IGNORE_FILES:
        return True
    if name.endswith(".pyc"):
        return True
    return False


def collect_relative_files(base_dir: Path) -> Dict[str, Path]:
    """Recursively collect non-transient files relative to base_dir."""
    rel_files: Dict[str, Path] = {}
    if not base_dir.exists() or not base_dir.is_dir():
        return rel_files

    for root, dirs, files in os.walk(base_dir):
        # Prune transient directories in-place
        dirs[:] = [d for d in dirs if not is_transient(d)]
        for file_name in files:
            if is_transient(file_name):
                continue
            full_path = Path(root) / file_name
            rel_path = full_path.relative_to(base_dir).as_posix()
            rel_files[rel_path] = full_path

    return rel_files


def validate_manifest(
    manifest_data: dict, repo_root: Path
) -> Tuple[bool, str, Path, Path, List[str]]:
    """Validate manifest data and return resolved canonical and mirror roots."""
    if not isinstance(manifest_data, dict):
        return False, "Manifest root must be a JSON object", Path(), Path(), []

    if manifest_data.get("schema_version") != 1:
        return False, "Unsupported schema_version; expected 1", Path(), Path(), []

    if manifest_data.get("unmanaged_mirror_policy") != "preserve":
        return False, "unmanaged_mirror_policy must be 'preserve'", Path(), Path(), []

    canonical_rel = manifest_data.get("canonical_root")
    mirror_rel = manifest_data.get("mirror_root")
    managed_skills = manifest_data.get("managed_skills")

    if not isinstance(canonical_rel, str) or not canonical_rel.strip():
        return False, "canonical_root must be a non-empty string", Path(), Path(), []
    if not isinstance(mirror_rel, str) or not mirror_rel.strip():
        return False, "mirror_root must be a non-empty string", Path(), Path(), []

    if not isinstance(managed_skills, list) or len(managed_skills) == 0:
        return False, "managed_skills must be a non-empty list of skill names", Path(), Path(), []

    # Check for duplicates
    seen_skills = set()
    for s in managed_skills:
        if not isinstance(s, str) or not s.strip():
            return False, f"Invalid skill name '{s}': must be non-empty string", Path(), Path(), []
        if s != s.strip() or "/" in s or "\\" in s or ".." in s:
            return False, f"Invalid skill name '{s}': path separators or traversal not allowed", Path(), Path(), []
        if s in seen_skills:
            return False, f"Duplicate skill name in manifest: '{s}'", Path(), Path(), []
        seen_skills.add(s)

    # Resolve paths safely
    repo_root_resolved = repo_root.resolve()

    canonical_root = (repo_root_resolved / canonical_rel).resolve()
    mirror_root = (repo_root_resolved / mirror_rel).resolve()

    # Safety check: must stay within repo_root
    try:
        canonical_root.relative_to(repo_root_resolved)
        mirror_root.relative_to(repo_root_resolved)
    except ValueError:
        return False, "canonical_root and mirror_root must reside inside repository root", Path(), Path(), []

    if canonical_root == mirror_root:
        return False, "canonical_root and mirror_root cannot be identical", Path(), Path(), []

    # Verify each skill directory resolves inside its respective root
    for s in managed_skills:
        s_canon = (canonical_root / s).resolve()
        s_mirror = (mirror_root / s).resolve()
        try:
            s_canon.relative_to(canonical_root)
            s_mirror.relative_to(mirror_root)
        except ValueError:
            return False, f"Skill '{s}' resolves outside designated skill root", Path(), Path(), []

    return True, "", canonical_root, mirror_root, managed_skills


def compare_skill_parity(
    skill: str, canonical_dir: Path, mirror_dir: Path
) -> Tuple[bool, List[str]]:
    """Compare a managed skill pair for exact recursive equality."""
    issues: List[str] = []

    if not canonical_dir.exists() or not canonical_dir.is_dir():
        issues.append(f"Canonical directory missing: {canonical_dir}")
        return False, issues

    canonical_skill_md = canonical_dir / "SKILL.md"
    if not canonical_skill_md.exists() or not canonical_skill_md.is_file():
        issues.append(f"Canonical SKILL.md missing: {canonical_skill_md}")

    if not mirror_dir.exists() or not mirror_dir.is_dir():
        issues.append(f"Mirror directory missing: {mirror_dir}")
        return False, issues

    mirror_skill_md = mirror_dir / "SKILL.md"
    if not mirror_skill_md.exists() or not mirror_skill_md.is_file():
        issues.append(f"Mirror SKILL.md missing: {mirror_skill_md}")

    canon_files = collect_relative_files(canonical_dir)
    mirror_files = collect_relative_files(mirror_dir)

    canon_set = set(canon_files.keys())
    mirror_set = set(mirror_files.keys())

    missing_in_mirror = sorted(list(canon_set - mirror_set))
    for rel_path in missing_in_mirror:
        issues.append(f"Missing in mirror: {rel_path}")

    extra_in_mirror = sorted(list(mirror_set - canon_set))
    for rel_path in extra_in_mirror:
        issues.append(f"Extra stale file in mirror: {rel_path}")

    common_files = sorted(list(canon_set & mirror_set))
    for rel_path in common_files:
        canon_bytes = canon_files[rel_path].read_bytes()
        mirror_bytes = mirror_files[rel_path].read_bytes()
        if canon_bytes != mirror_bytes:
            issues.append(f"Content difference: {rel_path}")

    return len(issues) == 0, issues


def check_parity(
    canonical_root: Path,
    mirror_root: Path,
    managed_skills: List[str],
    verbose: bool = False,
) -> Tuple[bool, Dict[str, List[str]]]:
    """Check parity across all managed skills. Read-only operation."""
    all_ok = True
    drift_report: Dict[str, List[str]] = {}

    for skill in managed_skills:
        c_dir = canonical_root / skill
        m_dir = mirror_root / skill
        ok, issues = compare_skill_parity(skill, c_dir, m_dir)
        if not ok:
            all_ok = False
            drift_report[skill] = issues
        elif verbose:
            drift_report[skill] = []

    return all_ok, drift_report


def sync_skill(skill: str, canonical_dir: Path, mirror_dir: Path) -> None:
    """Synchronize a single managed skill directory from canonical to mirror."""
    if not canonical_dir.exists() or not canonical_dir.is_dir():
        raise FileNotFoundError(f"Canonical directory does not exist: {canonical_dir}")

    mirror_dir.mkdir(parents=True, exist_ok=True)

    canon_files = collect_relative_files(canonical_dir)
    mirror_files = collect_relative_files(mirror_dir)

    # 1. Remove extra stale files from mirror
    for rel_path, full_path in mirror_files.items():
        if rel_path not in canon_files:
            if full_path.exists():
                full_path.unlink()

    # 2. Clean up empty subdirectories in mirror (excluding transients)
    for root, dirs, _ in os.walk(mirror_dir, topdown=False):
        for d in dirs:
            if is_transient(d):
                continue
            dir_path = Path(root) / d
            try:
                # Will only delete if directory is empty
                dir_path.rmdir()
            except OSError:
                pass

    # 3. Copy/update canonical files to mirror
    for rel_path, src_path in canon_files.items():
        dest_path = mirror_dir / rel_path
        src_bytes = src_path.read_bytes()
        if dest_path.exists():
            dest_bytes = dest_path.read_bytes()
            if src_bytes == dest_bytes:
                continue
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        dest_path.write_bytes(src_bytes)


def sync_all(
    canonical_root: Path,
    mirror_root: Path,
    managed_skills: List[str],
    verbose: bool = False,
) -> Tuple[bool, str]:
    """Synchronize all managed skills from canonical to mirror."""
    for skill in managed_skills:
        c_dir = canonical_root / skill
        m_dir = mirror_root / skill
        try:
            sync_skill(skill, c_dir, m_dir)
            if verbose:
                print(f"[SYNC] Synchronized managed skill: {skill}")
        except Exception as e:
            return False, f"Failed synchronizing skill '{skill}': {e}"

    # Verify parity immediately following synchronization
    ok, drift_report = check_parity(canonical_root, mirror_root, managed_skills, verbose=verbose)
    if not ok:
        details = []
        for s, issues in drift_report.items():
            details.append(f"{s}: {', '.join(issues)}")
        return False, "Post-sync parity check failed: " + "; ".join(details)

    return True, "All managed skills synchronized and verified in exact parity"


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Check or synchronize managed research skills parity."
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--check",
        action="store_true",
        help="Check parity between canonical and mirror skills (read-only).",
    )
    group.add_argument(
        "--sync",
        action="store_true",
        help="Synchronize canonical skills to compatibility mirrors.",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Print verbose output for matched files.",
    )
    parser.add_argument(
        "--manifest",
        type=str,
        default=None,
        help="Path to research skills manifest (defaults to scripts/skills/research_skills_manifest.json).",
    )
    parser.add_argument(
        "--repo-root",
        type=str,
        default=None,
        help="Path to repository root (defaults to script directory's grandparent).",
    )

    args = parser.parse_args(argv)

    # Determine repository root
    if args.repo_root:
        repo_root = Path(args.repo_root).resolve()
    else:
        # Default: script is at <repo_root>/scripts/skills/research_skill_mirror.py
        repo_root = Path(__file__).resolve().parent.parent.parent

    # Determine manifest path
    if args.manifest:
        manifest_path = Path(args.manifest).resolve()
    else:
        manifest_path = repo_root / "scripts" / "skills" / "research_skills_manifest.json"

    if not manifest_path.exists() or not manifest_path.is_file():
        print(f"ERROR: Manifest file not found: {manifest_path}", file=sys.stderr)
        return 1

    try:
        with open(manifest_path, "r", encoding="utf-8") as fp:
            manifest_data = json.load(fp)
    except Exception as e:
        print(f"ERROR: Failed to read manifest JSON: {e}", file=sys.stderr)
        return 1

    valid, err_msg, canonical_root, mirror_root, managed_skills = validate_manifest(
        manifest_data, repo_root
    )
    if not valid:
        print(f"ERROR: Manifest validation failed: {err_msg}", file=sys.stderr)
        return 1

    if args.check:
        ok, drift_report = check_parity(
            canonical_root, mirror_root, managed_skills, verbose=args.verbose
        )
        if not ok:
            print("FAILED: Research skill parity check detected drift:")
            for s, issues in sorted(drift_report.items()):
                print(f"  Skill [{s}]:")
                for issue in issues:
                    print(f"    - {issue}")
            return 1
        print(
            f"PASSED: All {len(managed_skills)} managed research skills are in exact byte parity."
        )
        if args.verbose:
            for s in sorted(managed_skills):
                print(f"  [MATCH] {s}")
        return 0

    if args.sync:
        ok, msg = sync_all(canonical_root, mirror_root, managed_skills, verbose=args.verbose)
        if not ok:
            print(f"ERROR: Synchronization failed: {msg}", file=sys.stderr)
            return 1
        print(f"SUCCESS: {msg}")
        return 0

    return 0


if __name__ == "__main__":
    sys.exit(main())
