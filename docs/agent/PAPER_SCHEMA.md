# Canonical Paper Record Schema and Contract

## 1. Overview
This document specifies the canonical paper record schema for literature research within the repository. It formalizes candidate roles, candidate assessment, bibliographic integrity, multi-dimensional reproducibility, claim-level provenance, and decision governance.

The schema is backward-compatible with legacy records stored in `01_Diabetes_Research/searched_papers/` and `01_Diabetes_Research/search_pool.json`. Legacy records lacking newly defined fields remain fully valid.

## 2. Core Fields Specification

Future skill outputs (in `metadata.json`, `summary.json`, or search triage artifacts) should implement or tolerate the following core fields:

### 2.1 Identity and Bibliographic Metadata
- `title` (`string`): Full title of the paper.
- `doi` (`string | null`): Normalized Digital Object Identifier (e.g., `"10.1016/j.artmed.2020.101967"`). Must be `null` if unassigned.
- `year` (`integer | null`): Publication year.
- `source` (`string`): Primary catalog or provider source (e.g., `"crossref"`, `"openalex"`, `"pubmed"`, `"semantic_scholar"`).

### 2.2 Candidate Roles (`candidate_roles`)
An array of candidate role designations assessed by agents:
- **Type**: `string[]`
- **Allowed values**:
  - `"evidence_candidate"`: Paper provides relevant conceptual, epidemiological, methodological, or empirical evidence for diabetes prediction.
  - `"reproduction_candidate"`: Paper provides accessible data, variable definitions, and method specifications permitting pipeline re-implementation.
- **Constraints**:
  - `uniqueItems: true`.
  - Both roles may be present simultaneously (`["evidence_candidate", "reproduction_candidate"]`).
  - An empty array (`[]`) is valid for papers that fail both criteria or are out of scope.
  - Candidate roles represent analytical evaluations, NOT human promotion decisions.

### 2.3 Candidate Assessment (`candidate_assessment`)
Detailed justification for each role:
```json
{
  "evidence_candidate": {
    "eligible": true,
    "reasons": [
      "Establishes survey-weighted prevalence baselines on NHANES",
      "Rigorous discussion of glycemic threshold definitions (ADA 2024)"
    ],
    "limitations": [
      "Lacks external temporal validation cohort"
    ]
  },
  "reproduction_candidate": {
    "eligible": false,
    "reasons": [],
    "limitations": [
      "Hospital EHR dataset is private under HIPAA",
      "Proprietary feature extraction script not published"
    ]
  }
}
```
- `eligible` (`boolean`): Whether the criteria for this role are satisfied.
- `reasons` (`string[]`): Factual justifications supporting eligibility.
- `limitations` (`string[]`): Identified constraints, risk of bias, or missing components.

### 2.4 Bibliographic Integrity (`integrity`)
Tracks verification of the paper's identity and publishing status:
```json
{
  "identity_verified": true,
  "retraction_status": "not_retracted",
  "metadata_conflicts": []
}
```
- `identity_verified` (`boolean`): True if DOI resolves and title matches authoritative registries.
- `retraction_status` (`string`): Must be one of:
  - `"not_retracted"`: Verified clean in authoritative registries.
  - `"retracted"`: Paper has been formally retracted.
  - `"expression_of_concern"`: Formal editorial expression of concern issued.
  - `"corrected"`: Corrigendum or erratum published.
  - `"unclear"`: Registry could not be reached or status could not be verified.
- `metadata_conflicts` (`string[]`): Description of any discrepancies between query metadata and registry records.

### 2.5 Multi-Dimensional Reproducibility (`reproducibility`)
Evaluates practical feasibility of reproduction across 5 distinct facets:
```json
{
  "dataset_access": "public",
  "code_access": "partial",
  "methods_operationalized": "sufficient",
  "variable_mapping_feasible": "yes",
  "overall": "medium",
  "notes": [
    "Dataset is publicly available on UCI repository",
    "Analysis script shared but data cleaning pipeline omitted"
  ]
}
```
- `dataset_access` (`string`): `"public"` | `"controlled"` | `"unavailable"` | `"unclear"` | `"not_applicable"`
- `code_access` (`string`): `"public"` | `"partial"` | `"unavailable"` | `"unclear"` | `"not_applicable"`
- `methods_operationalized` (`string`): `"sufficient"` | `"partial"` | `"insufficient"` | `"unclear"`
- `variable_mapping_feasible` (`string`): `"yes"` | `"partial"` | `"no"` | `"unclear"`
- `overall` (`string`): `"high"` | `"medium"` | `"low"` | `"unclear"`
- `notes` (`string[]`): Factual context detailing access restrictions or operational requirements.

### 2.6 Claim-Level Provenance (`claim_provenance`)
An array of grounded assertions extracted from the paper. See Section 3 and `docs/agent/schemas/claim_provenance.schema.json` for detailed definitions.

### 2.7 Decision Governance (`recommended_action` and `decision_state`)
- `recommended_action` (`string`): Advisory suggestion produced by the agent. Must be one of:
  - `"promote"`: Recommend paper for human promotion to `chosed_papers/`.
  - `"retain_in_pool"`: Retain in `searched_papers/` or search pool as reference evidence.
  - `"exclude_from_current_scope"`: Out of scope or superseded for the active study phase.
  - `"reject_with_human_review"`: Methodologically flawed or retracted, recommended for rejection.
  - `"needs_more_review"`: Insufficient text or unresolved ambiguities requiring human inspection.
- `decision_state` (`string`): Current formal governance state. Must be one of:
  - `"unreviewed"`: Discovered or ingested without formal assessment.
  - `"recommendation_ready"`: Agent assessment complete; awaiting human review.
  - `"human_approved"`: Explicitly reviewed and approved by human researcher.
  - `"human_rejected"`: Explicitly reviewed and rejected by human researcher.

**Rule of Authority**: `recommended_action` is strictly advisory. Only explicit human authorization can transition `decision_state` to `human_approved` or `human_rejected`.

## 3. Claim-Level Provenance Contract
Each element of `claim_provenance` must conform to:
```json
{
  "claim": "CatBoost achieved an AUROC of 0.842 on the NHANES held-out test cohort without lab features.",
  "source": "Smith et al., 2023",
  "doi": "10.1016/j.artmed.2023.102500",
  "location": {
    "section": "3.2 Model Evaluation",
    "table": "Table 4",
    "page": 7
  },
  "support": "direct",
  "confidence": "high"
}
```

### Support Levels (`support`)
- `"direct"`: The cited source directly, explicitly, and materially supports the proposition.
- `"partial"`: The source supports only part of the proposition or requires narrower qualification.
- `"contextual"`: The source provides background or context but does not directly establish the claim.
- `"unsupported"`: The source does not support the claim (remains visible in audit trail).

### Confidence Levels (`confidence`)
- `"high"`: Identity verified, location exact, evidence direct and unambiguous.
- `"medium"`: Plausible but indirect support, or location certainty imperfect.
- `"low"`: Ambiguous, weakly supported, or conflicting evidence.

### Location Constraints
- Never fabricate section, table, or page values.
- Missing or indeterminate locations must be recorded as `null`.

## 4. Backward Compatibility and Migration Rules
1. **Legacy Integrity**: Existing files in `01_Diabetes_Research/` (such as `metadata.json`, `summary.json`, `search_pool.json`, `rejected.json`) were generated before this schema. They remain valid legacy records.
2. **Optionality for Consumers**: All consumers of paper metadata and summary records must treat `candidate_roles`, `candidate_assessment`, `integrity`, `reproducibility`, `claim_provenance`, `recommended_action`, and `decision_state` as optional fields.
3. **No Retroactive Rewrites**: Agents must not rewrite or migrate historical paper records merely to inject schema defaults.
4. **Promotion Provenance**: Do not infer human approval from folder location alone unless repository governance explicitly documents that location as human-promoted.
