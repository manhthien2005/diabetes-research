---
name: paper-finder
description: |
  Find new research papers on diabetes PREDICTION (diabetes prediction, binary
  classification, tabular & EHR), assign appropriate Layer 1-4 + prediction_horizon,
  evaluate candidate roles per docs/agent/EVIDENCE_POLICY.md, and propose candidates
  for human approval before placing into `01_Diabetes_Research/searched_papers/Layer_X/<paper_id>/`.
inputs:
  - 01_Diabetes_Research/chosed_papers/Layer_<1..4>/        # baseline for thematic comparison
  - AGENTS.md                          # §1 scope, §3 Layer, §3b prediction_horizon
  - docs/agent/EVIDENCE_POLICY.md      # evidence evaluation & candidate role policy
  - docs/agent/PAPER_SCHEMA.md          # candidate record contract
  - docs/agent/DECISION_AUTHORITY.md   # decision authority matrix
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<1..4>/<paper_id>/source.pdf
  - 01_Diabetes_Research/searched_papers/Layer_<1..4>/<paper_id>/metadata.json  # including integrity & candidate fields
---

# paper-finder

## Purpose
Expand repository literature on **diabetes prediction**, categorizing candidates into the appropriate Layer + assigning `prediction_horizon`, based on primary focus:

| Layer | Focus |
|-------|-------|
| 1 — Pipeline_Nen_Tang | Preprocessing, imbalance, oversampling, feature engineering |
| 2 — Model_Hieu_Qua    | Model comparison / ensemble / boosting / deep tabular |
| 3 — Dataset_EHR       | Real EHR, MIMIC, eICU, NHANES, real-world cohorts |
| 4 — XAI_Trien_Khai    | Explainability, SHAP/LIME, deployment, clinical impact |

**Concurrently assign `prediction_horizon`** (second axis — AGENTS.md §3b, independent of Layer):

| Horizon | Condition |
|---------|-----------|
| `cross_sectional` | Predicted from current features, no follow-up |
| `early_detection` | Early detection / screening in undiagnosed individuals, prediabetes — **PRIORITY** |
| `long_term_risk`  | Onset after N years, longitudinal cohort — **PRIORITY (currently underrepresented)** |

---

## Candidate Assessment & Evidence Guidelines (Governed by `docs/agent/EVIDENCE_POLICY.md`)

Candidate evaluation strictly separates **scientific evidence value** from **reproducibility feasibility**:

1. **Strict §1 Scope**: Must be a diabetes PREDICTION paper on tabular or EHR data. Non-tabular, image/CGM-only, treatment-only, or non-prediction papers are out of scope → recommend `exclude_from_current_scope`.
2. **Dual Candidate Roles (`candidate_roles`)**:
   - **`evidence_candidate`**: Evaluated on methodological rigor, clinical validity, conceptual insight, and relevance to diabetes prediction.
     - **No Public Dataset Requirement**: Proprietary or restricted clinical EHR cohorts (HIPAA/GDPR) remain valid evidence candidates.
     - **No Source Code Requirement**: Lack of open source code does not disqualify a study from being valuable evidence.
   - **`reproduction_candidate`**: Evaluated on practical feasibility of pipeline re-implementation.
     - Considers data accessibility (public download or clear DUA like PhysioNet), code availability, operationalized variable definitions, and parameter transparency.
   - **Multi-Role Structure**: A paper may be an `evidence_candidate`, a `reproduction_candidate`, both, or neither.
3. **Citation Count as Discovery Signal Only**:
   - Citation counts from CrossRef, Semantic Scholar, or OpenAlex serve strictly for discovery search ordering and triage prioritization.
   - Citation count is **NEVER a truth gate**, scientific validity gate, or automatic rejection criterion.
   - Low citation count (e.g., recent preprints or niche clinical cohorts) does not warrant rejection.
4. **Advisory Authority**:
   - Agents formulate advisory recommendations (`recommended_action: "promote" | "retain_in_pool" | "exclude_from_current_scope" | "reject_with_human_review" | "needs_more_review"`).
   - Agents **NEVER** execute irreversible repository transitions (moving files to `chosed_papers/`, recording permanent rejections in `rejected.json`, or deleting folders) without explicit human authorization (`docs/agent/DECISION_AUTHORITY.md`).

---

## Integrity Gates — BEFORE Proposing or Creating Folder

For every candidate paper, MUST run all 3 verification checks:

### Check 1: DOI Resolves via CrossRef
```bash
curl -s "https://api.crossref.org/works/<DOI>" | python -c "
import sys, json
d = json.load(sys.stdin)
m = d.get('message', {})
print('title:', m.get('title', ['UNKNOWN'])[0])
print('year:', m.get('published', {}).get('date-parts', [[None]])[0][0])
print('doi:', m.get('DOI'))
print('status: ok')
"
```
- If CrossRef returns `Resource not found` → record `integrity.doi_resolved: false`, `identity_verified: false`, do NOT create folder.
- Cross-check CrossRef title vs retrieved paper title: substantial divergence (>30% words) → record in `metadata_conflicts`, alert user.

### Check 2: Title Match
- Title from CrossRef must substantially match title from Semantic Scholar/PubMed.
- If divergent → record `integrity.title_match: false`, alert user.

### Check 3: Retraction / Correction Check
```bash
curl -s "https://api.crossref.org/works/<DOI>" | python -c "
import sys, json
d = json.load(sys.stdin)
m = d.get('message', {})
updates = m.get('relation', {}).get('is-retraction-of', [])
corr = m.get('relation', {}).get('is-correction-of', [])
print('retracted:', bool(updates))
print('has_correction:', bool(corr))
print('type:', m.get('type'))
"
```
- If `is-retraction-of` is present → set `retraction_status: "retracted"`, do NOT create folder. Formulate recommendation `recommended_action: "reject_with_human_review"` with reason `"retracted"`. Permanent addition to `01_Diabetes_Research/rejected.json` requires human confirmation.
- If correction is present → record `integrity.has_correction: true`, `retraction_status: "corrected"`.

---

## Metadata and Candidate Schema (`metadata.json`)

Future metadata records emit candidate role assessments alongside standard metadata:

```json
{
  "paper_id": "<lastname><year>_<slug>",
  "title": "<full title>",
  "authors": ["..."],
  "year": 2024,
  "venue": "<venue>",
  "doi": "10.xxx/yyy",
  "citations": 42,
  "layer": 2,
  "prediction_horizon": "early_detection",
  "candidate_roles": ["evidence_candidate", "reproduction_candidate"],
  "candidate_assessment": {
    "evidence_candidate": {
      "eligible": true,
      "reasons": ["Well-validated early screening cohort on NHANES"],
      "limitations": ["Lacks temporal calibration"]
    },
    "reproduction_candidate": {
      "eligible": true,
      "reasons": ["Public code repository on GitHub and public NHANES data"],
      "limitations": ["Requires manual survey weight configuration"]
    }
  },
  "integrity": {
    "identity_verified": true,
    "doi_resolved": true,
    "title_match": true,
    "crossref_type": "journal-article",
    "retraction_status": "not_retracted",
    "has_correction": false,
    "metadata_conflicts": [],
    "checked_at": "<ISO-8601>",
    "check_source": "crossref"
  },
  "reproducibility": {
    "dataset_access": "public",
    "code_access": "public",
    "methods_operationalized": "sufficient",
    "variable_mapping_feasible": "yes",
    "overall": "high",
    "notes": ["Public NHANES cycles and GitHub code available"]
  },
  "recommended_action": "retain_in_pool",
  "decision_state": "recommendation_ready",
  "source_pdf": "source.pdf",
  "status": "searched",
  "analysis_status": "none"
}
```

*Note: All new candidate fields are optional for legacy records to guarantee full backward compatibility.*

---

## Procedure
1. Inspect 4 layers in `01_Diabetes_Research/chosed_papers/` and `searched_papers/` to know current holdings → prevent duplicate proposals.
2. Search and screen candidates against §1 topic scope.
3. Assess `candidate_roles` independently (`evidence_candidate` vs `reproduction_candidate`).
4. Propose ≤ 5 new papers per batch, each paper including:
   - `paper_id` in format `<lastname><year>_<3-word-slug>`
   - Assigned Layer + rationale (1 sentence)
   - `prediction_horizon` (1 of 3) + rationale (1 sentence)
   - Candidate role assessment (`candidate_roles`) + rationale
   - Advisory `recommended_action`
   - **SPECIAL PRIORITY** for papers belonging to `early_detection` or `long_term_risk`
5. Run **integrity gates** (3 checks above) for every proposed paper before presenting to user.
   If checks fail → do not propose paper, replace with another candidate.
6. Upon explicit user approval, create folder and execute `pdf-fetch`.

## When Uncertain on Layer / Horizon
- Uncertain on Layer → default to Layer 2, `layer_uncertain: true`.
- Uncertain on horizon → default to `cross_sectional`, `horizon_uncertain: true`.

## Local Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-09-21 | v2: Added integrity gates (DOI resolution, title match, retraction check via CrossRef). Added `integrity` field to metadata.json. Prioritize early_detection + long_term_risk proposals. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Restored Vietnamese diacritics (lost due to PowerShell Out-File CP437). Use Python UTF-8 write. | agent (fix/encoding) |
| 2026-09-23 | v3: Formalized dual candidate roles (evidence_candidate vs reproduction_candidate). Separated evidence value from reproducibility. Citation count made discovery-only signal. Replaced autonomous rejection with advisory recommendations per EVIDENCE_POLICY.md and DECISION_AUTHORITY.md. | agent (chore/skills-upgrade) |
