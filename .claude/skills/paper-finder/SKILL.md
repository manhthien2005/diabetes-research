---
name: paper-finder
description: |
  Find new research papers on diabetes PREDICTION (diabetes prediction, binary
  classification, tabular & EHR), assign appropriate Layer 1-4 + prediction_horizon,
  and place into `01_Diabetes_Research/searched_papers/Layer_X/<paper_id>/` awaiting analysis.
inputs:
  - 01_Diabetes_Research/chosed_papers/Layer_<1..4>/        # baseline for thematic comparison
  - AGENTS.md                          # §1 scope, §3 Layer, §3b prediction_horizon
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<1..4>/<paper_id>/source.pdf
  - 01_Diabetes_Research/searched_papers/Layer_<1..4>/<paper_id>/metadata.json  # including new integrity field
---

# paper-finder

## Purpose
Expand repository `01_Diabetes_Research/searched_papers/` with **diabetes prediction** papers,
categorizing immediately into the appropriate Layer + assigning `prediction_horizon`, based on primary focus:

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

## Hard Criteria (Derived from AGENTS.md §7)
0. **Strict §1 Scope**: must be a diabetes PREDICTION paper (tabular/EHR). Otherwise → reject immediately.
1. Citations ≥ 100 (>3y) or ≥ 30 (1–3y) or rising-star (>5 cite/month if <1y).
2. Dataset public + licensed for research.
3. Method reproducible with code or described in sufficient detail.

## Integrity Gates (Added 2026-09-21) — BEFORE Creating Folder

Before creating `01_Diabetes_Research/searched_papers/Layer_X/<paper_id>/`, MUST run all 3 checks:

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
- If CrossRef returns `Resource not found` → record `integrity.doi_resolved: false`, DO NOT create folder.
- Cross-check CrossRef title vs retrieved paper title: substantial divergence (>30% words) → raise warning.

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
- If `is-retraction-of` is present → DO NOT create folder, record into `01_Diabetes_Research/rejected.json` with `reason: retracted`.
- If correction is present → create folder but record `integrity.has_correction: true`.

### Record in metadata.json: Field `integrity` (New)
```json
"integrity": {
  "doi_resolved": true,
  "title_match": true,
  "crossref_type": "journal-article",
  "retracted": false,
  "has_correction": false,
  "checked_at": "<ISO-8601>",
  "check_source": "crossref"
}
```
- The `integrity` field is NEWLY ADDED — does not modify existing fields, does not break webapp.
- If CrossRef is unresponsive → record `integrity.doi_resolved: null`, `check_source: "unavailable"`.

---

## Procedure
1. Inspect 4 layers in `01_Diabetes_Research/chosed_papers/` to know current holdings → prevent duplicates.
2. Propose ≤ 5 new papers per batch, each paper including:
   - `paper_id` in format `<lastname><year>_<3-word-slug>`
   - Assigned Layer + rationale (1 sentence)
   - `prediction_horizon` (1 of 3) + rationale (1 sentence)
   - **SPECIAL PRIORITY** for papers belonging to `early_detection` or `long_term_risk`
3. Run **integrity gates** (3 checks above) for every proposed paper before presenting to user.
   If checks fail → do not propose paper, replace with another candidate.
4. Upon user approval, create folder and execute pdf-fetch.

## When Uncertain on Layer / Horizon
- Uncertain on Layer → default to Layer 2, `layer_uncertain: true`.
- Uncertain on horizon → default to `cross_sectional`, `horizon_uncertain: true`.

## Local Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-09-21 | v2: Added integrity gates (DOI resolution, title match, retraction check via CrossRef). Added `integrity` field to metadata.json. Prioritize early_detection + long_term_risk proposals. | agent (chore/skills-upgrade) |
| 2026-09-22 | fix: Restored Vietnamese diacritics (lost due to PowerShell Out-File CP437). Use Python UTF-8 write. | agent (fix/encoding) |
