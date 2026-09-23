# Claude Skills Compatibility Directory

This directory contains skills available in Claude environments for this repository.

## Canonical Research Skills vs. Compatibility Mirrors

- **Canonical Research Skills Root**: [`.agents/skills/`](../../.agents/skills/)
- **Managed Research Skills Manifest**: [`scripts/skills/research_skills_manifest.json`](../../scripts/skills/research_skills_manifest.json)
- **Authoritative Provenance Lock File**: [`.agents/skills/SKILLS_LOCK.md`](../../.agents/skills/SKILLS_LOCK.md)

The 14 managed research skills (`analyze-stats`, `check-reporting`, `define-variables`, `design-study`, `paper-analyzer`, `paper-comparator`, `paper-finder`, `pdf-extract`, `pdf-fetch`, `peer-review`, `polish-language`, `prediction-model-rigor`, `self-review`, and `verify-refs`) located under `.claude/skills/` are **generated compatibility mirrors**.

**IMPORTANT**: Do not directly edit managed research skill directories in `.claude/skills/`. All edits must be made to the canonical source files under `.agents/skills/`.

## Synchronization and Drift Detection

After making changes to canonical skills under `.agents/skills/`, synchronize the mirrors:

```bash
python scripts/skills/research_skill_mirror.py --sync
```

To verify parity between canonical skills and compatibility mirrors (e.g. before commit or in CI):

```bash
python scripts/skills/research_skill_mirror.py --check
```

## Claude-Only UI / Design Skills

Claude-only frontend and design skills (such as `banner-design`, `brandkit`, `ui-styling`, `ui-ux-pro-max`, etc.) are unmanaged by the research mirror system. They remain independently managed in `.claude/skills/` and are not mirrored to `.agents/skills/`.
