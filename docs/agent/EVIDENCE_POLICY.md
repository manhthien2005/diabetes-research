# Scientific Evidence Policy for Diabetes Literature Research

## 1. Purpose
This policy establishes canonical scientific evidence rules for all AI agents and automated literature workflows in this repository. It defines how scientific literature is identified, evaluated, and utilized, ensuring that scientific validity is rigorously distinguished from practical reproducibility, claims are grounded in exact source provenance, and irreversible repository decisions remain strictly under human authority.

## 2. Scope
This policy applies to all literature discovery, triage, extraction, analysis, comparison, and evidence-synthesis activities across the repository. It governs the evaluation of candidate papers for tabular and electronic health record (EHR) diabetes prediction and staging. It operates alongside `docs/agent/PAPER_SCHEMA.md` and `docs/agent/DECISION_AUTHORITY.md`.

## 3. Evidence Value versus Reproducibility
A paper's scientific usefulness as evidence and its practical reproducibility are independent dimensions:
1. **Scientific Evidence Value**: Reflects the methodological rigor, clinical validity, conceptual insight, and factual findings contributed by a study. A paper can provide high-value scientific evidence (e.g., establishing epidemiological risk factors, defining clinical cohorts, illustrating data leakage patterns, or analyzing population-level disparities) even if its dataset is restricted or its code is private.
2. **Reproducibility Feasibility**: Reflects the practical capability to re-execute, re-implement, or audit the experimental pipeline directly using accessible data, code, operationalized feature definitions, and parameter specifications.
3. **Independence Rule**: Lack of public code or public data does not by itself invalidate or diminish the scientific evidence value of a paper. Conversely, full public reproducibility does not guarantee methodological soundness or freedom from clinical risk of bias (e.g., a fully reproducible pipeline may still suffer from fatal target leakage).

## 4. Candidate Roles
Every evaluated paper is characterized along two orthogonal candidate roles represented in an array (`candidate_roles`):
- `evidence_candidate`: The paper provides credible, relevant scientific concepts, epidemiological context, methodological lessons, benchmark metrics, or clinical insights relevant to diabetes prediction.
- `reproduction_candidate`: The paper possesses sufficient access to datasets, operationalized variable definitions, modeling details, or code to permit re-implementation, direct pipeline replication, or experimental benchmarking.

### Multi-Role Rule
A paper may be:
- Both `evidence_candidate` and `reproduction_candidate` (e.g., a well-documented open-access study on NHANES with published scripts).
- `evidence_candidate` only (e.g., a large-scale hospital EHR study with restricted-access data that establishes clinical risk factors).
- `reproduction_candidate` only (e.g., an open-code synthetic or benchmark pipeline suitable for technical stress-testing whose clinical findings are exploratory).
- Neither (e.g., an out-of-scope paper, a retracted paper, or an unverified study without evidentiary or practical value).

Candidate roles represent analytical assessments by agents, never an automated human promotion decision.

## 5. Source Identity and Integrity
Before accepting or analyzing any candidate literature, agents must verify source identity:
1. **DOI Verification**: Verify Digital Object Identifiers (DOIs) against authoritative registries (e.g., CrossRef, PubMed) where available. If a DOI does not resolve or conflicts with published metadata, record the conflict and do not treat identity as verified.
2. **Bibliographic Consistency**: Verify title, author list, publication year, and venue against authoritative bibliographic databases when practical. Substantial divergence must be flagged.
3. **Canonical Identifiers**: Record PMID, PMCID, arXiv ID, or OpenAlex work ID alongside the DOI when available.
4. **Citation Independence**: Never treat a high citation count as proof that metadata, author attributions, or scientific claims are correct. Bibliographic truth is established by registry verification, not popularity.

## 6. Claim Support Taxonomy
Every factual assertion attributed to a source must be evaluated against the exact text or data of that source and categorized using one of four canonical support levels:
- `direct`: The cited source directly, explicitly, and materially supports the proposition as stated.
- `partial`: The source supports only part of the proposition, requires narrower qualification, or supports the claim under restricted conditions.
- `contextual`: The source provides relevant background, conceptual framing, or related context, but does not directly test or establish the specific proposition.
- `unsupported`: The inspected source does not support the proposition (e.g., the claim is absent, contradicted, or misattributed).

Unsupported claims must remain visible in evidence tables and audit logs rather than being silently omitted or upgraded.

## 7. Claim Location Provenance
Every evidence claim must point to its specific location within the source:
- `location.section`: The specific named section or subsection (e.g., "Section 2.3", "Methods - Data Splitting").
- `location.table`: The specific table number where quantitative data appear (e.g., "Table 2").
- `location.page`: The specific publication page number (e.g., 4, "102-104").

### Location Rules
1. **No Fabrication**: If a location cannot be pinpointed, set the corresponding field to `null`. Never invent, guess, or approximate section names, table numbers, or page digits.
2. **Granularity**: Claims regarding quantitative metrics (AUROC, accuracy, sensitivity) must cite the exact table, figure, or text passage.
3. **Independence from Reputation**: A claim from a highly cited paper is never granted `direct` support without verified location evidence.

## 8. Confidence Semantics
Confidence reflects the certainty of evidence attribution and verification:
- `high`: Source identity is definitively verified, the supporting location is unambiguous, and the source text directly and materially supports the assertion.
- `medium`: Support is plausible but indirect, location certainty is imperfect (e.g., across broad sections), or the claim requires extrapolation.
- `low`: Source identity, location, or claim support is weak, ambiguous, contested, or materially incomplete.

## 9. Citation-Count Policy
1. **Discovery and Ranking Only**: Citation counts (from OpenAlex, Semantic Scholar, or CrossRef) may be used solely as discovery signals, heuristic indicators of scholarly interest, or sorting aids during search triage.
2. **No Truth Gate**: Citation count is not a proxy for methodological truth, clinical validity, or absence of bias. Heavily cited papers may contain fatal data leakage (e.g., SMOTE before splitting, F-leakage).
3. **No Automatic Rejection**: A low citation count—especially for recent publications, novel preprint insights, or niche clinical cohorts—must never serve as an automatic rejection criterion.
4. **No Hard Thresholds**: Hard numeric thresholds (e.g., ≥100 citations) are advisory screening heuristics for general triage, never mandatory gates that exclude valid evidence.

## 10. Retractions and Corrections
1. **Retraction Gate**: Any candidate paper identified as retracted (`retraction_status: "retracted"`) must not be promoted or cited as positive scientific evidence. It must be flagged with `integrity.retraction_status: "retracted"` and recommended for human rejection or exclusion.
2. **Expressions of Concern**: Treat papers with formal expressions of concern with heightened skepticism (`confidence: "low"`), requiring explicit human review.
3. **Corrections and Errata**: If a paper has published errata or corrigenda (`integrity.retraction_status: "corrected"`), agents must inspect the correction to verify whether affected claims or metrics remain valid.

## 11. Public-Data and Source-Code Policy
1. **Evidence Candidacy Independent of Code/Data**: Neither open source code nor a publicly downloadable dataset is a mandatory requirement for `evidence_candidate` status. Landmark clinical epidemiological studies often operate under strict patient privacy rules (HIPAA, GDPR) and cannot release raw patient records.
2. **Reproduction Candidacy Dependent on Feasibility**: For `reproduction_candidate` status, accessible data (public download, open benchmark, or clear Data Use Agreement like PhysioNet) and sufficient procedural documentation (source code or fully operationalized algorithms) are necessary.
3. **Data Availability Documentation**: Agents must accurately classify dataset access (`public`, `controlled`, `unavailable`, `unclear`, `not_applicable`) and code access (`public`, `partial`, `unavailable`, `unclear`, `not_applicable`) without treating restricted access as a scientific flaw.

## 12. Unsupported Claims
When an agent or reviewer inspects a paper and discovers that a cited claim is unsupported:
1. Record `support: "unsupported"`.
2. Document the discrepancy in the notes or audit trail.
3. Do not alter the claim text to falsely manufacture a match.
4. If an existing summary or analysis asserted an unsupported claim, mark it as unverified and preserve the correction note.

## 13. Conflicting Evidence
When multiple sources report conflicting findings (e.g., conflicting risk factor rankings, divergent AUROC for the same feature set, or contradictory performance between tree ensembles and neural architectures):
1. Document both findings with their respective claim-level provenance and validation schemes.
2. Analyze methodological differences (e.g., presence vs absence of nested CV, leakage types, cohort age distributions) rather than picking a "winner" based on citation count.
3. Highlight methodological risk of bias that explains why results diverge.

## 14. Secondary versus Primary Sources
1. **Primary Sources**: Original experimental or cohort studies reporting firsthand model development, evaluation, and data collection. Claims about specific model metrics must cite the primary source.
2. **Secondary Sources**: Systematic reviews, meta-analyses, and literature overviews. Useful for broad clinical framing, epidemiological baselines, and identifying primary studies, but must not be cited as primary producers of empirical model results unless reviewing the synthesis itself.

## 15. Review and Guideline Sources
Clinical guidelines (e.g., ADA Standards of Care) and reporting standards (e.g., TRIPOD+AI, PROBAST+AI, STROBE) carry authoritative evidentiary weight for problem formulation, label definition, and methodological rigor, despite not presenting novel predictive models. They are classified as `evidence_candidate` under appropriate study roles.

## 16. Reproducibility Assessment
Reproducibility must be appraised systematically using the five-dimensional contract defined in `docs/agent/PAPER_SCHEMA.md`:
1. `dataset_access`: Availability of raw or processed participant data.
2. `code_access`: Availability of executable pipeline scripts, environment configurations, and random seeds.
3. `methods_operationalized`: Completeness of mathematical formulas, preprocessing steps, hyperparameter search spaces, and decision thresholds.
4. `variable_mapping_feasible`: Feasibility of aligning the paper's feature schema with repository targets (e.g., NHANES variables).
5. `overall`: Synthesized reproducibility grade (`high`, `medium`, `low`, `unclear`).

## 17. Promotion and Rejection Recommendations
1. **Advisory Nature**: All candidate recommendations produced by agents (`promote`, `retain_in_pool`, `exclude_from_current_scope`, `reject_with_human_review`, `needs_more_review`) are advisory.
2. **Evidence-Backed Justification**: Every recommendation must articulate factual reasons and limitations grounded in candidate assessment and risk of bias.
3. **No Automated Transitions**: Agents must not execute irreversible repository-state transitions (moving files to `chosed_papers/`, recording permanent rejections, or deleting files) autonomously.

## 18. Human Decision Authority
Human researchers hold exclusive authority over repository-binding decisions:
- Promoting a paper to `01_Diabetes_Research/chosed_papers/`.
- Final rejection and entry into permanent exclusion registries.
- Modifying frozen study designs, primary endpoints, or target cohorts.
- Deleting files or altering historical evidence records.
Agents must stop and present structured recommendations whenever human authorization is required. Full authority boundaries are codified in `docs/agent/DECISION_AUTHORITY.md`.

## 19. Backward Compatibility
1. **Legacy Records**: Existing records in `metadata.json`, `summary.json`, `search_pool.json`, and `rejected.json` that lack new schema fields remain fully valid legacy records.
2. **Non-Disruptive Parsing**: All tools, skills, and consumers must tolerate absent `candidate_roles`, `candidate_assessment`, `reproducibility`, and `claim_provenance` fields.
3. **Progressive Enrichment**: New fields are populated during new searches, analyses, or explicitly requested re-audits.

## 20. Historical Evidence Preservation
Historical research logs, extraction QA logs (`qa_log.json`), decision logs (`QA_LOG.md`), and historical rejection records (`rejected.json`) represent immutable scientific history:
1. Do not rewrite, regenerate, or retroactively reformat historical records merely to conform to the new schema.
2. Past human and agent decisions must be preserved as originally recorded.
3. Future updates are append-only or non-destructive extensions.
