# Literature Workflow Decision Authority and Governance

## 1. Purpose
This document formally delineates decision authority between autonomous AI agents and human researchers. It establishes explicit boundaries to ensure that all irreversible, binding, or normative decisions regarding research literature, study design, and repository evidence remain strictly under human control, while enabling agents to execute exploratory, analytical, and draft-generating tasks autonomously.

## 2. Decision Authority Matrix

| Action | Authority Level | Reversibility | Required Artifact / Procedure |
|--------|-----------------|---------------|-------------------------------|
| Literature search & candidate discovery | Autonomous | Reversible | Search query log / pool queue |
| Metadata retrieval & DOI verification | Autonomous | Reversible | `metadata.json` integrity object |
| PDF fetching & text extraction | Autonomous | Reversible | `source.pdf`, `extracted.md` |
| Deep paper analysis & draft rendering | Autonomous | Reversible | `analysis.html`, `summary.json` |
| Candidate role assignment (`candidate_roles`) | Autonomous (Advisory) | Reversible | `summary.json` / `metadata.json` |
| Multi-dimensional reproducibility assessment | Autonomous (Advisory) | Reversible | `reproducibility` object |
| Claim-level provenance extraction | Autonomous | Reversible | `claim_provenance` array |
| Methodological risk of bias audit | Autonomous | Reversible | `rob_audit.json`, CP1–CP6 probes |
| Search result ranking & triage sorting | Autonomous | Reversible | Search pool ranking |
| Cross-paper comparison generation | Autonomous | Reversible | `comparison.md` |
| Action recommendations (`recommended_action`) | Autonomous (Advisory) | Reversible | Advisory proposal with rationale |
| **Promoting paper to `chosed_papers/`** | **Human Only** | Binding | Explicit user instruction |
| **Permanent repository rejection (`rejected.json`)** | **Human Only** | Binding | Explicit user instruction |
| **Deleting papers, extracts, or artifacts** | **Human Only** | Irreversible | Explicit user instruction |
| **Overwriting or editing historical QA/decision logs** | **Human Only** | Irreversible | Explicit user instruction |
| **Modifying frozen study hypotheses** | **Human Only** | Foundational | Strategic review / QA Log entry |
| **Altering primary clinical outcome / label definition** | **Human Only** | Foundational | Strategic review / QA Log entry |
| **Changing target cohort / inclusion criteria** | **Human Only** | Foundational | Strategic review / QA Log entry |
| **Modifying frozen prediction horizon** | **Human Only** | Foundational | Strategic review / QA Log entry |
| **Accepting methodology compromises that lower rigor** | **Human Only** | Scientific Risk | Explicit rationale documented |
| **Ingesting private/sensitive data beyond scope** | **Human Only** | Compliance Risk | Data governance authorization |

## 3. Autonomous Reversible Actions
Agents are authorized and expected to perform the following actions without prompting the user for intermediate approval:
1. **Search for candidate papers**: Query academic APIs (OpenAlex, CrossRef, PubMed, Semantic Scholar) for tabular/EHR diabetes prediction literature.
2. **Fetch metadata and verify identity**: Fetch bibliographic records, verify DOIs via CrossRef, check retraction and errata databases, and record integrity status.
3. **Analyze papers**: Extract text, run risk of bias probes (CP1–CP6, O11), detect data leakage patterns (Types B–G), and generate draft Vietnamese analyses (`analysis.html`) and summaries (`summary.json`).
4. **Assign candidate-role recommendations**: Assess whether a paper qualifies as an `evidence_candidate`, `reproduction_candidate`, both, or neither.
5. **Assess reproducibility**: Evaluate dataset access, code access, algorithmic operationalization, and variable mapping feasibility.
6. **Generate claim-level provenance**: Connect empirical and conceptual claims to exact sections, tables, and page numbers with calibrated support levels.
7. **Rank search results for review**: Heuristically order candidate papers using relevance, horizon fit, and discovery signals.
8. **Record methodological limitations**: Factually document risks of bias, missing calibration, unweighted survey analysis, and sample size constraints.
9. **Recommend actions**: Formulate evidence-backed recommendations (`promote`, `retain_in_pool`, `exclude_from_current_scope`, `reject_with_human_review`, `needs_more_review`).
10. **Generate comparison reports**: Author comparative analyses (`comparison.md`) contrasting methodology, metrics, and leakage among papers within the same layer and horizon.
11. **Update draft analysis artifacts**: Refine and regenerate analysis drafts when explicitly tasked with paper evaluation.

## 4. Human Approval Required (Irreversible / Repository Decisions)
Agents must NEVER perform the following actions autonomously:
1. **Promoting to `chosed_papers/`**: Moving, copying, or designating a paper as a promoted baseline paper in `01_Diabetes_Research/chosed_papers/`.
2. **Permanently rejecting a paper**: Adding a paper to `01_Diabetes_Research/rejected.json` as a final repository decision. (Agents may flag papers as `recommended_action: "reject_with_human_review"` or exclude them from a temporary search pool, but permanent repository rejection requires human approval).
3. **Deleting research artifacts**: Deleting PDF files, extracts, analyses, comparisons, or notes from the repository.
4. **Rewriting historical evidence**: Altering past decision records (`QA_LOG.md`, `qa_log.json`), historical extraction QA, or historical rejection rationales.
5. **Changing frozen research parameters**: Altering established research hypotheses, primary outcomes, cohort definitions, label rules, or prediction horizons.
6. **Compromising scientific rigor**: Bypassing nested cross-validation, accepting data leakage, or waiving survey weight adjustments without explicit user instruction.
7. **Handling restricted data**: Accessing, moving, or processing private clinical records outside authorized study scopes.

## 5. The Recommendation Rule
Whenever a workflow reaches an action requiring human approval:
1. The agent must synthesize all supporting evidence into an explicit advisory recommendation (`recommended_action`).
2. The agent must clearly explain the factual rationale, candidate assessment, reproducibility evaluation, and identified limitations or risks of bias.
3. The agent must **STOP** before executing any irreversible transition.
4. The agent must never pretend, simulate, or assume that human approval was granted.
5. The `decision_state` must remain `"recommendation_ready"` until the human researcher explicitly commands the transition.
