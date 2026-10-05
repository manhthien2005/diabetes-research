<!-- INTERNAL AUDIT — NOT FOR SUBMISSION. This is the /check-reporting working report, not the official journal checklist. Do not upload to a submission portal. -->
# Supervisor-report documentation and reporting review

## Part A — Summary

Target manuscript file: BAO_CAO_GVHD_VI.md
Target version: v1
Source SHA-256 (12 characters): a568089efab2
Date: 2026-10-05
Guideline: TRIPOD+AI 2024

The target is a supervisor report plus the Vietnamese teaching guide and cited frozen evidence, not a completed journal manuscript. Historical audit files are preserved. No scientific rerun, cohort change or model modification was performed.

Critical reporting floor: 3/3 categories documented, with explicit validity/applicability limitations. Subgroup performance and clinical utility are not established. The accepted scientific verdict is MINOR REVISION FOR STATED SCOPE, not a new verdict derived from this checklist.

| Status | Count |
|---|---:|
| PRESENT | 28 |
| PARTIAL | 11 |
| MISSING | 5 |
| NA | 8 |

Coverage: 28/44 applicable subitems (63.6%). This is a reporting count only; it is not a readiness score. Items 8c and 14 now explicitly report absence of study-specific blinding/fairness procedures. Their presence does not mean those procedures were performed.

Boundary check: the concise report separates results (section 3), uncertainty interpretation (4), limitations (5) and conclusion (6). The guide intentionally mixes examples and explanations for teaching; illustrative examples are labelled. No new numerical analysis is introduced.

## Part B — Item-by-item map

| Item | Status | Location | Assessment |
|---|---|---|---|
| 1 | PRESENT | Report title | Development/internal evaluation, population and self-reported outcome named. |
| 2 | PARTIAL | Report sections 1–6 (not a structured journal abstract) | Supervisor report is intentionally not a journal abstract. TRIPOD+AI for Abstracts and journal word limit remain future tasks; do not fabricate journal compliance. |
| 3a | PRESENT | Report 1; Guide 31 | Cross-sectional methodological context; limited clinical novelty stated. |
| 3b | PRESENT | Report 1–2; Guide 4,38 | Research/educational benchmark; no intended clinical care pathway. |
| 3c | PARTIAL | Guide 5,32,34 | Social and ascertainment interpretation is explicit; a detailed sourced inequality synthesis is not provided. |
| 4 | PRESENT | Report 1 | Development and internal evaluation explicitly distinguished. |
| 5a | PRESENT | Report 2; Guide 2,32 | Public CDC survey; same-source partitions; coverage limits stated. |
| 5b | PRESENT | Report 2; Guide dates paragraph | IDATE range2025-01-05 through2026-03-16 for raw and eligible samples; zero unparseable dates. Release year differs from interview calendar range. |
| 6a | PRESENT | Report 2 | 47 states, DC, Guam and Puerto Rico; public general-population survey. |
| 6b | PRESENT | Report 2; Guide 3 | DIABETE4 1 versus 3; other codes excluded; counts verified. |
| 6c | NA | Report 2; no intervention protocol | No treatment/intervention protocol in this descriptive survey benchmark. |
| 7 | PARTIAL | Guide 7–9; linked variable/data evidence | Shared recoding and aggregate source checks are described. Demographic-specific data-quality checks were not performed. |
| 8a | PARTIAL | Report 2; Guide 3–4 | Outcome and cross-sectional horizon are explicit; subgroup measurement invariance is unassessed and no laboratory confirmation is claimed. |
| 8b | NA | Guide 3; no clinician adjudication | Respondent survey answer; no study-specific clinician adjudication. |
| 8c | PRESENT | Guide 3 blinding statement | Explicitly reports that no study-specific blinded outcome assessment was designed; no interviewer blinding is inferred. Reporting presence does not establish blinding. |
| 9a | PRESENT | Guide 5,8 | Full-data coverage inspection and qualitative selection are disclosed. Prior counterfactual retained the same 20 conditional on qualitative choices; threshold alone admits 31. |
| 9b | PARTIAL | Guide 5–7; linked variable audit | All 20 constructs and missingness documented, full recodes linked. Antecedence to diagnosis remains unknown and is explicitly limited. |
| 9c | NA | Guide 3,5; survey/coded variables | Standardized respondent-reported and calculated variables; no study-specific adjudicators. |
| 10 | PARTIAL | Guide 36 | All eligible records used; 274031 development records and 41462 events documented. No formal precision or model-specific sample-size calculation. |
| 11 | PRESENT | Report 2; Guide 5,7,9 | Numeric median within train/folds, categorical missing class; target exclusions explicit. |
| 12a | PRESENT | Report 2; Guide 8,11,49 | Training/fold isolation distinguished from A01 test exposure; no categorical claim of demonstrated adaptive model selection. |
| 12b | PRESENT | Guide 5,9 | Four scaled numeric, sixteen one-hot categorical predictors. |
| 12c | PRESENT | Guide 13–19,49; seven frozen model JSON files | All seven approaches separately described with principal parameters; exact immutable configurations linked. No family-wide optimization claim. |
| 12d | PARTIAL | Report 5; Guide 32–34 | Absence of state/cluster heterogeneity evaluation disclosed; the analysis itself remains unavailable. |
| 12e | PRESENT | Report 3–4; Guide 20–28, supplement README | Metrics, conditional bootstrap, multiplicity, calibration equations and interpretation explicit. |
| 12f | NA | Report 4; Guide 49 | No updating or recalibration of model predictions. |
| 12g | PRESENT | Guide 18,21,49 | predict_proba or SVM decision_function; frozen paired scores verified. |
| 13 | PRESENT | Report 2; Guide 10 | No class rebalancing/weighting; original class distribution and rationale retained. |
| 14 | PRESENT | Guide 34,38; Report 5 | Explicitly reports no subgroup/fairness evaluation or fairness intervention; no fairness claim. This fulfills disclosure of approaches used (none), not evidence of fairness. |
| 15 | PRESENT | Report 2–3; Guide 21,38 | Probability0.5 or SVM native margin0; conventional comparison boundary, no clinical optimum asserted. |
| 16 | PRESENT | Report 2; Guide 8; linked characteristics CSV | Same source/definitions/eligibility; random partition, not external evaluation. |
| 17 | MISSING | AUTHOR_COMPLETION_CHECKLIST.md; no author determination supplied | Author/institution ethics and consent determination remains unknown; no waiver or approval invented. Not a prerequisite for reading the internal report. |
| 18a | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | Funding and funder role require author confirmation; not inferred as none. |
| 18b | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | All-author disclosures require confirmation; not inferred as none. |
| 18c | PARTIAL | FINAL_CONSENSUS.md; AUTHOR_COMPLETION_CHECKLIST.md | Git history and prespecification uncertainty disclosed. Existence/location of any prospective protocol still requires authors. |
| 18d | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | Registration or confirmed unregistered status requires authors. |
| 18e | PRESENT | Guide 39,50; supplement README | Source URLs, hashes, artifact retrieval and finite retention disclosed. Durable archive not created in this task. |
| 18f | PRESENT | Guide 49–50; canonical notebook and supplement README | Existing analysis code and reported environment/seeds linked. No new analysis code or model training in this documentation task. |
| 19 | MISSING | AUTHOR_COMPLETION_CHECKLIST.md | PPI involvement or confirmed absence requires authors. |
| 20a | PRESENT | Guide 3,8; Report 2 | Full attrition/event counts independently reproduced; no longitudinal follow-up. |
| 20b | PARTIAL | Guide 5; linked characteristics CSV; Report 2 | All 20 predictor missingness values given; distributions across cohort/train/test linked. Cross-demographic summaries remain absent. |
| 20c | PRESENT | Guide 50; linked overall/train/test characteristics CSV | Matched development/evaluation descriptive distributions provided. |
| 21 | PRESENT | Guide 8,11,36; frozen CV fold summary | Full/train/test event counts and CV fold counts available; no tuning sample. |
| 22 | PARTIAL | Guide 39,49 | Configurations and code permit retraining, not direct use of saved historical fitted pipelines. No serialized estimators available. |
| 23a | PARTIAL | Report 3–4; Guide 13–29; linked frozen summaries | Aggregate estimates, paired intervals, calibration and figure paths given. Subgroup confidence intervals absent; bootstrap conditional scope explicit. |
| 23b | NA | Report 5; Guide 34 | Cluster heterogeneity not examined; not evidence of homogeneous performance. |
| 24 | NA | Guide 49; no updating | No model updating performed. |
| 25 | PRESENT | Report 6; Guide 31,37–38 | Descriptive, metric-specific interpretation; no overall superiority/equivalence and no fairness or deployment claim. |
| 26 | PRESENT | Report 5; Guide 8,32–36,42,44 | Current consensus wording used. Historical numerical readiness scores withdrawn; limitations are not relabelled as proven major defects. |
| 27a | NA | Guide 38; research-only intended use | No clinical implementation proposed; current preprocessing is not a deployment safety protocol. |
| 27b | NA | Guide 38; no clinical end users | Research-only benchmark; clinical end-user requirements not specified. |
| 27c | PRESENT | Report 6; Guide 48 | Supervisor discussion prioritizes defining the next question before experiments, not an automatic external-validation requirement for current scope. |

## Part C — Remaining actions, separated by purpose

No author-only declaration is fabricated. These gaps do not prevent transparent supervisor discussion. They must be revisited before journal submission or a broader scientific claim.

| Item | Owner / next action |
|---|---|
| 17 | Author/institution ethics and consent determination remains unknown; no waiver or approval invented. Not a prerequisite for reading the internal report. |
| 18a | Funding and funder role require author confirmation; not inferred as none. |
| 18b | All-author disclosures require confirmation; not inferred as none. |
| 18c | Git history and prespecification uncertainty disclosed. Existence/location of any prospective protocol still requires authors. |
| 18d | Registration or confirmed unregistered status requires authors. |
| 19 | PPI involvement or confirmed absence requires authors. |
| 10 | All eligible records used; 274031 development records and 41462 events documented. No formal precision or model-specific sample-size calculation. |
| 12d | Absence of state/cluster heterogeneity evaluation disclosed; the analysis itself remains unavailable. |
| 2 | Supervisor report is intentionally not a journal abstract. TRIPOD+AI for Abstracts and journal word limit remain future tasks; do not fabricate journal compliance. |
| 20b | All 20 predictor missingness values given; distributions across cohort/train/test linked. Cross-demographic summaries remain absent. |
| 22 | Configurations and code permit retraining, not direct use of saved historical fitted pipelines. No serialized estimators available. |
| 23a | Aggregate estimates, paired intervals, calibration and figure paths given. Subgroup confidence intervals absent; bootstrap conditional scope explicit. |
| 3c | Social and ascertainment interpretation is explicit; a detailed sourced inequality synthesis is not provided. |
| 7 | Shared recoding and aggregate source checks are described. Demographic-specific data-quality checks were not performed. |
| 8a | Outcome and cross-sectional horizon are explicit; subgroup measurement invariance is unassessed and no laboratory confirmation is claimed. |
| 9b | All 20 constructs and missingness documented, full recodes linked. Antecedence to diagnosis remains unknown and is explicitly limited. |

### Documentation corrections completed

- Replaced ambiguous healthcare-access examples with the actual PERSDOC3 predictor; added all 20 predictors and existing cohort missingness.
- Corrected absolute test-isolation language; separated learned preprocessing isolation from A01 test exposure and A02 coverage inspection.
- Replaced model-selection advice based on default recall with operating-point limitations.
- Added actual LR confusion counts, formulas, interpretation of AUC/AP, CV-versus-bootstrap distinctions and calibration/CITL distinctions.
- Recorded the accepted consensus and marked historical MAJOR REVISION/69→82 as superseded for current interpretation.
- Added a short supervisor report, reading path, evidence links and oral-defense questions.
- Verified three core cited references through the verify-refs script; see supervisor_review_refs/qc/reference_audit.json.

### Automated naming detector adjudication

The naming script exited 1 with BASE_MISSING and CITE_MISSING. These are retained in `supervisor_framework_naming.json` and explicitly adjudicated in `supervisor_framework_adjudication.json`. TRIPOD+AI replaces TRIPOD 2015 (vendored checklist introduction); the detector incorrectly requires a separate base citation. The first occurrence is the complete R3 reference entry with DOI, not an unsupported framework claim. Neither flag is accepted as a study defect; no detector code was changed and the settled consensus was not reopened.

## Part D — Machine-readable summary

```json
{
  "target_manuscript": "BAO_CAO_GVHD_VI.md",
  "target_path": "03_Final_Result/BRFSS_2025/BAO_CAO_GVHD_VI.md",
  "target_version": "v1",
  "source_sha256": "a568089efab2",
  "companion_source": {
    "path": "03_Final_Result/BRFSS_2025/GIAI_THICH_FULL_STUDY_VI.md",
    "sha256": "d6ac864a8a5f13d651634ebea92b66c7d494eb7a30c5803ff83b06dbebccd29c"
  },
  "date": "2026-10-05",
  "standard": "TRIPOD+AI 2024",
  "assessment_type": "internal_reporting_map_for_supervisor_report_not_journal_manuscript",
  "source": "https://www.tripod-statement.org/wp-content/uploads/2024/04/TRIPODAI-Supplement.pdf",
  "assessed_by": "Codex, direct documentation review; no new independent reviewer",
  "scope": "User prioritizes understanding and supervisor discussion; no target journal. Frozen science and agreed adjudication unchanged.",
  "historical_matrix": "astra_reporting_matrix.json (historical package assessment; preserved)",
  "counts": {
    "PRESENT": 28,
    "PARTIAL": 11,
    "NA": 8,
    "MISSING": 5
  },
  "compliance_pct": 63.6,
  "percentage_interpretation": "Reporting coverage only, never scientific quality, readiness or publication probability.",
  "critical_items": {
    "input_outcome_timing": "PRESENT with explicit cross-sectional/unknown-antecedence limits",
    "development_evaluation": "PRESENT with A01/A02 limitations; no pristine prespecification claim",
    "performance_calibration": "PRESENT for aggregate sample; subgroup gap retained"
  },
  "action_items": [
    {
      "item": "2",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Supervisor report is intentionally not a journal abstract. TRIPOD+AI for Abstracts and journal word limit remain future tasks; do not fabricate journal compliance.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "3c",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Social and ascertainment interpretation is explicit; a detailed sourced inequality synthesis is not provided.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "7",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Shared recoding and aggregate source checks are described. Demographic-specific data-quality checks were not performed.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "8a",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Outcome and cross-sectional horizon are explicit; subgroup measurement invariance is unassessed and no laboratory confirmation is claimed.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "9b",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "All 20 constructs and missingness documented, full recodes linked. Antecedence to diagnosis remains unknown and is explicitly limited.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "10",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "All eligible records used; 274031 development records and 41462 events documented. No formal precision or model-specific sample-size calculation.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "12d",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Absence of state/cluster heterogeneity evaluation disclosed; the analysis itself remains unavailable.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "17",
      "status": "MISSING",
      "owner": "author",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Author/institution ethics and consent determination remains unknown; no waiver or approval invented. Not a prerequisite for reading the internal report.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "18a",
      "status": "MISSING",
      "owner": "author",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Funding and funder role require author confirmation; not inferred as none.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "18b",
      "status": "MISSING",
      "owner": "author",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "All-author disclosures require confirmation; not inferred as none.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "18c",
      "status": "PARTIAL",
      "owner": "author",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Git history and prespecification uncertainty disclosed. Existence/location of any prospective protocol still requires authors.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "18d",
      "status": "MISSING",
      "owner": "author",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Registration or confirmed unregistered status requires authors.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "19",
      "status": "MISSING",
      "owner": "author",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "PPI involvement or confirmed absence requires authors.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "20b",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "All 20 predictor missingness values given; distributions across cohort/train/test linked. Cross-demographic summaries remain absent.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "22",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Configurations and code permit retraining, not direct use of saved historical fitted pipelines. No serialized estimators available.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    },
    {
      "item": "23a",
      "status": "PARTIAL",
      "owner": "future_scope_or_reporting_decision",
      "fixable_by_ai": false,
      "required_for_current_supervisor_reading": false,
      "suggested_fix": "Aggregate estimates, paired intervals, calibration and figure paths given. Subgroup confidence intervals absent; bootstrap conditional scope explicit.",
      "resolution": "Retain disclosed gap; obtain author facts or define a future analysis/reporting scope. Do not invent findings."
    }
  ],
  "consensus_verdict": "MINOR REVISION FOR STATED SCOPE",
  "submission_ready": false,
  "new_analysis": false,
  "code_edits": false,
  "framework_naming": {
    "raw_result": "supervisor_framework_naming.json",
    "automatic_exit_code": 1,
    "adjudication": "FALSE_POSITIVES_NOT_STUDY_DEFECTS",
    "items": [
      {
        "verdict": "BASE_MISSING",
        "resolution": "Not applicable: TRIPOD+AI 2024 supersedes TRIPOD 2015. Vendored checklist introduction and official guideline govern over detector table which wrongly treats it as an additive extension.",
        "evidence": [
          ".agents/skills/check-reporting/references/checklists/TRIPOD_AI.md:12",
          ".agents/skills/check-reporting/scripts/check_framework_naming.py:47"
        ]
      },
      {
        "verdict": "CITE_MISSING",
        "resolution": "First occurrence is the full bibliographic reference R3, including authors, journal/year and linked DOI in the same reference entry. Sentence-based citation-marker heuristic is not appropriate for a reference-list title."
      }
    ],
    "code_changed": false,
    "consensus_reopened": false
  }
}
```
