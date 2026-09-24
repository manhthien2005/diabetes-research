# Standardized Literature Review Formats

> Canonical reference for literature presentation in `paper-analyzer` and `paper-comparator`.
> Enforces structured quick-review tables (single paper) and cross-paper comparison matrices (multiple papers)
> while strictly preserving scientific evidence semantics, claim-level provenance, and decision governance.

---

## 1. Overview and Operational Role

The literature review formats defined in this reference serve as standardized, rapid-comprehension presentation layers:
1. **Single-Paper Quick Review Table**: When analyzing exactly one paper (`paper-analyzer`), provide an information-field-by-row table enabling the researcher to understand key study facts, methodology, evidence, and relevance before reading deep narrative analysis.
2. **Multi-Paper Comparison Matrix**: When comparing two or more papers (`paper-comparator`), provide a dimension-by-row, paper-by-column matrix with an integrated **Cross-paper synthesis** column, enabling side-by-side evaluation under explicit comparability constraints.

### Core Scientific Invariants
- **Additive Presentation Layer**: The quick table and matrix never replace deep methodological analysis, RoB mini-audits (CP1–CP6, O11), or narrative synthesis.
- **Evidence vs. Reproducibility**: Scientific evidence value (`evidence_candidate`) and re-implementation feasibility (`reproduction_candidate`) remain orthogonal. Restricted clinical data does not lower evidence value; public toys with target leakage do not gain evidence value.
- **Anti-Fabrication**: Missing, ambiguous, or unverified information must use explicit standardized sentinels (`Not reported`, `Not applicable`, `Not verified`, `Unclear`). Never guess or fabricate metrics, locations, or mechanisms.
- **No Overall Paper Ranking**: Never declare an overall "best paper" or "winner". Studies address distinct populations, horizons, and clinical trade-offs.
- **Citation Count**: Citation count is discovery metadata only, never a proxy for truth or quality.
- **Claim Provenance**: The table and matrix provide navigation pointers; formal manuscript citations require full claim provenance (`claim`, `source`, `doi`, `location`, `support`, `confidence`) per `docs/agent/PAPER_SCHEMA.md`.

---

## 2. Missing Information Semantics

When filling table or matrix cells, agents must strictly apply these four standardized values whenever complete information is absent:

| Sentinel Value | Semantic Definition | Usage Rule |
|----------------|---------------------|------------|
| `Not reported` | The published text, tables, and supplements do not report this specific fact. | Use when the study could have reported the information but omitted it. |
| `Not applicable` | The field is scientifically or methodologically irrelevant to this study design. | Use when the concept does not apply (e.g., survey design on PIMA, code availability for theoretical guideline). |
| `Not verified` | The information may exist in external artifacts or uninspected sources, but has not been verified by the agent. | Use when source artifact was inaccessible or registry verification was pending. |
| `Unclear` | The source text mentions or touches upon the topic, but the description is ambiguous, contradictory, or imprecise. | Use when the authors provide insufficient clarity to determine the exact fact. |

**Strict Anti-Fabrication Rule**:
- Never invent page numbers, table numbers, or section names.
- If a location is unknown or approximate, record `null` or `Not reported` in provenance fields.
- Never guess sample size, feature counts, or numerical performance metrics.

---

## 3. Single-Paper Quick Review Table Format

### 3.1 Orientation and Structure
- **Orientation**: `ROWS_ARE_INFORMATION_FIELDS`.
- **Columns**: Exactly 3 columns:
  1. `Field`: Canonical scientific information field name.
  2. `Summary`: Concise extraction of the factual finding or methodological choice (retaining source terminology).
  3. `Evidence / Location`: Exact pointer to section, table, figure, page, or supplement (e.g., `Table 2, p. 5`, `Methods §2.3`, `Not reported`).

### 3.2 Required Rows (Canonical 48 Rows)

The single-paper quick-review table must contain the following 48 rows in exact sequence:

| # | Field | Content Description & Guidance |
|---|-------|--------------------------------|
| 1 | `Title` | Full official paper title. |
| 2 | `Authors` | Full author list or First Author et al. |
| 3 | `Year` | Publication year. |
| 4 | `Journal` | Journal or conference venue name. |
| 5 | `DOI / PMID` | Canonical DOI URL or PMID. |
| 6 | `Country / Setting` | Geographic location, healthcare system, or setting (e.g., USA, outpatient clinics). |
| 7 | `Research objective` | Primary clinical or technical objective stated by the authors. |
| 8 | `Study design` | Study architecture (e.g., retrospective cohort, cross-sectional survey, prospective cohort). |
| 9 | `Data source` | Specific dataset name or health registry (e.g., NHANES 2017-2018, MIMIC-IV, PIMA). |
| 10 | `Study period` | Calendar years or follow-up duration of data collection. |
| 11 | `Population` | Target population, demographic profile, and age boundaries. |
| 12 | `Sample size` | Total sample size $N$ (and breakdown across train/validation/test if reported). |
| 13 | `Inclusion / Exclusion` | Key criteria determining cohort membership. |
| 14 | `Predictors / Exposures` | Candidate features, laboratory vs non-laboratory variables, clinical history. |
| 15 | `Outcome / Target` | Exact label definition, diagnostic criteria (ADA HbA1c/FPG vs self-report), binary vs multiclass. |
| 16 | `Index time` | Baseline time point $t_0$ at which predictions are generated. |
| 17 | `Prediction horizon` | Prediction timeframe (`cross_sectional` [$\Delta t = 0$], `early_detection`, `long_term_risk` [$t_0 + N$ years]). |
| 18 | `Missing-data strategy` | Handling of missingness (complete case, mean/median, MICE, KNN, tree-native). |
| 19 | `Statistical methods` | Primary statistical modeling, hypothesis testing, or feature selection techniques. |
| 20 | `Models` | Evaluated machine learning and statistical algorithms (LR, RF, XGBoost, LightGBM, MLP, etc.). |
| 21 | `Validation strategy` | Split design (random holdout, $k$-fold CV, nested CV, temporal, external cohort). |
| 22 | `Performance metrics` | Discrimination metrics reported (AUROC, AUPRC, sensitivity, specificity, F1, accuracy). |
| 23 | `Calibration` | Calibration assessment (Hosmer-Lemeshow, calibration slope/intercept, Brier score, calibration curve). |
| 24 | `Clinical utility` | Decision curve analysis (DCA), net benefit, or clinical impact evaluation. |
| 25 | `Survey design` | Handling of complex survey features (MEC exam weights `WTMEC2YR`, strata `SDMVSTRA`, PSUs `SDMVPSU`). |
| 26 | `Key findings` | Core empirical discoveries and strongest model/variable conclusions. |
| 27 | `Quantitative results` | Primary numerical findings with confidence intervals and exact locations. |
| 28 | `Authors' conclusion` | Conclusions directly asserted by the original authors in Abstract/Discussion. |
| 29 | `Comparison with prior evidence` | How authors position their work against existing benchmarks or literature. |
| 30 | `Our evidence synthesis` | Independent methodological evaluation of the paper's actual evidentiary contribution. |
| 31 | `Evidence-supported mechanism` | Biological, behavioral, or epidemiological mechanisms directly supported by paper data. |
| 32 | `Analytical hypothesis` | Hypothesized or speculative mechanisms explicitly labeled as analyst or author hypotheses. |
| 33 | `Strengths` | Notable methodological, clinical, or cohort strengths. |
| 34 | `Limitations` | Methodological weaknesses, cohort biases, or reporting omissions identified. |
| 35 | `Risk of bias / Leakage` | Specific leakage patterns detected (Types B–G) and CP1–CP6/O11 probe hits. |
| 36 | `Generalizability` | Transportability of models/findings to target populations (e.g., US adults in NHANES). |
| 37 | `Data availability` | Public, controlled, proprietary, or unavailable dataset status. |
| 38 | `Code availability` | Public repository, partial scripts, upon request, or unavailable. |
| 39 | `Reproducibility` | Multi-dimensional rating (`high`, `medium`, `low`, `unclear`) per `docs/agent/PAPER_SCHEMA.md`. |
| 40 | `Relevance to our study` | Concrete connection to our diabetes prediction pipeline, feature set, or benchmark. |
| 41 | `Evidence candidate` | `eligible: true/false` + concise rationale (scientific concepts, risk baselines, lessons). |
| 42 | `Reproduction candidate` | `eligible: true/false` + concise rationale (re-implementation feasibility). |
| 43 | `Claims worth citing` | 1–3 grounded assertions worthy of citation in future manuscripts with locations. |
| 44 | `What we can reuse` | Sound features, validation techniques, architectures, or baselines to adopt. |
| 45 | `What we must NOT reuse` | Flawed practices, data leakages, uncalibrated thresholds, or invalid feature choices to avoid. |
| 46 | `Research gaps` | Unanswered questions or unaddressed limitations left open by the paper. |
| 47 | `Future research` | Next steps or extension opportunities proposed by authors or identified by analysis. |
| 48 | `Bottom line` | 1–2 sentence conclusive takeaway for our repository research team. |

### 3.3 Separation Rules for Single-Paper Review
1. **Authors' conclusion vs. Our evidence synthesis**: `Authors' conclusion` must strictly report what the original authors claim. `Our evidence synthesis` provides our objective, critical evaluation of whether the study data and methodology actually support those claims.
2. **Evidence-supported mechanism vs. Analytical hypothesis**: Biological or clinical mechanisms backed by verified empirical data in the paper belong in `Evidence-supported mechanism`. Speculative explanations or interpretations belong in `Analytical hypothesis` and must be explicitly qualified (e.g., "[Analyst hypothesis]", "[Author speculation]").
3. **Evidence candidate vs. Reproduction candidate**: Kept strictly distinct. Never conflate lack of open code with zero evidence value.
4. **Relevance to our study**: Must reference repository-specific targets (e.g., `Paper_01_NHANES_NoLab`, non-laboratory tabular features, survey-weighted calibration) rather than vague generalities.

---

## 4. Multi-Paper Comparison Matrix Format

### 4.1 Orientation and Structure
- **Orientation**: `ROWS_ARE_COMPARISON_DIMENSIONS_COLUMNS_ARE_PAPERS`.
- **Columns**:
  - Column 1: `Comparison dimension`
  - Columns 2 through $K+1$: One column per paper, labeled with stable identifiers (e.g., `P1 (Author Year, Short Title)`, `P2 (...)`).
  - Final Column: `Cross-paper synthesis`

### 4.2 Required Rows (Canonical 47 Rows)

The multi-paper comparison matrix must contain the following 47 rows in exact sequence:

| # | Comparison dimension | Synthesis Focus |
|---|----------------------|-----------------|
| 1 | `Title` | Scope and framing differences across titles. |
| 2 | `Authors` | Research groups, clinical vs computing disciplines. |
| 3 | `Year` | Chronological progression and temporal baseline. |
| 4 | `Journal` | Venue focus (clinical, biomedical informatics, computer science). |
| 5 | `Country / Setting` | Diversity of geographical and healthcare contexts. |
| 6 | `Data source` | Shared vs distinct cohorts (e.g., PIMA vs NHANES vs EHR). |
| 7 | `Study design` | Consistency in cohort design (retrospective vs prospective vs cross-sectional). |
| 8 | `Study period` | Historical timeframe overlaps and cohort vintage. |
| 9 | `Population` | Comparability of demographics, age ranges, and risk profiles. |
| 10 | `Sample size` | Statistical power, sample scale differences, and split sizes. |
| 11 | `Inclusion / Exclusion` | Selection filter divergences affecting cohort prevalence. |
| 12 | `Predictors / Exposures` | Feature space overlap (lab-free vs lab-dependent, EHR vs survey). |
| 13 | `Outcome / Target` | Label definition alignment (ADA glycemic criteria vs billing codes). |
| 14 | `Index time` | Timing of prediction baseline $t_0$. |
| 15 | `Prediction horizon` | Horizon alignment (`cross_sectional`, `early_detection`, `long_term_risk`). |
| 16 | `Missing-data strategy` | Handling rigor (complete case bias vs principled imputation). |
| 17 | `Statistical methods` | Common vs divergent statistical frameworks. |
| 18 | `Models` | Algorithmic coverage (tree ensembles, deep tabular, linear baselines). |
| 19 | `Validation strategy` | Internal CV vs genuine external/temporal validation across studies. |
| 20 | `Performance metrics` | Reported metric types and comparability constraints. |
| 21 | `Calibration` | Reporting rate and quality of calibration across papers. |
| 22 | `Clinical utility` | Net benefit / decision curve reporting across papers. |
| 23 | `Survey design` | Appropriate handling of complex survey sampling (when applicable). |
| 24 | `Key findings` | Cross-study agreements and contradictions in main findings. |
| 25 | `Quantitative results` | Side-by-side metrics under comparability gating. |
| 26 | `Authors' interpretation` | Convergent vs divergent interpretations by original authors. |
| 27 | `Evidence-supported mechanism` | Biological/clinical mechanisms validated across cohorts. |
| 28 | `Analytical hypothesis` | Competing hypotheses or speculative explanations. |
| 29 | `Strengths` | Complementary strengths across the paper set. |
| 30 | `Limitations` | Shared vs isolated methodological limitations. |
| 31 | `Risk of bias / Leakage` | Prevalence of leakage patterns (CP1–CP6, Types B–G). |
| 32 | `Generalizability` | External transportability across settings. |
| 33 | `Data availability` | Overall data openness across the comparison group. |
| 34 | `Code availability` | Reproducibility infrastructure across papers. |
| 35 | `Evidence relevance` | High/medium/low evidentiary utility for diabetes modeling. |
| 36 | `Reproducibility` | Multi-dimensional reproducibility distribution. |
| 37 | `Relevance to our study` | Concrete synthesis of how the collection informs our work. |
| 38 | `Evidence candidate` | Candidate status distribution across papers. |
| 39 | `Reproduction candidate` | Reproduction status distribution across papers. |
| 40 | `What we can reuse` | Consolidated list of reusable features, methods, and designs. |
| 41 | `What we must NOT reuse` | Consolidated list of anti-patterns and pitfalls to avoid. |
| 42 | `Main agreements` | Solid scientific points where papers agree. |
| 43 | `Main disagreements` | Direct contradictions in findings, rankings, or performance. |
| 44 | `Likely reasons for disagreement` | Methodological, population, or leakage reasons explaining divergence. |
| 45 | `Research gaps` | Collective gaps unaddressed by all compared papers. |
| 46 | `Future directions` | Next frontiers indicated by the comparative synthesis. |
| 47 | `Overall synthesis` | Integrated 2–3 sentence takeaway for our research project. |

---

## 5. Comparability Gate for Quantitative Comparison

Raw numerical performance (AUROC, AUPRC, accuracy, sensitivity, specificity, Brier score) **MUST NEVER** be directly compared without first applying the **Comparability Gate**.

### 5.1 The 11 Comparability Dimensions
Before declaring that Model A in Paper 1 outperforms Model B in Paper 2, evaluate alignment across all 11 dimensions:
1. `Research question`: Are the studies predicting the same clinical phenomenon?
2. `Study design`: Are the cohorts structured similarly (e.g., retrospective vs prospective)?
3. `Population`: Are the age, sex, ethnic, and risk distributions comparable?
4. `Data source`: Are the datasets from comparable health systems or registries?
5. `Outcome definition`: Are the label criteria identical (e.g., ADA lab criteria vs self-reported doctor diagnosis)?
6. `Index time`: Is the prediction baseline $t_0$ defined at the same clinical milestone?
7. `Prediction horizon`: Is the timeframe identical ($\Delta t = 0$ cross-sectional vs $N$-year incident risk)?
8. `Predictor availability`: Does one study include laboratory biomarkers that the other excludes?
9. `Validation design`: Is an internal random holdout being compared against genuine external validation?
10. `Metric definition`: Are thresholds, class definitions, and weighting identical?
11. `Survey or sampling design`: Is one cohort unweighted while the other uses complex survey weights?

### 5.2 Comparability Decision Rules
- **Directly Comparable**: All 11 dimensions align. Direct numerical comparison is valid with appropriate caveats.
- **Partially Comparable**: Minor differences exist (e.g., slightly different age filters or feature sets). Numerical comparison may proceed only when differences are explicitly stated as limiting factors.
- **Non-Comparable**: Major divergence in horizon, outcome, population, or validation level:
  - **Cross-sectional vs. Longitudinal**: Prevalent diabetes screening ($\Delta t = 0$) **CANNOT** be compared numerically to 5-year incident diabetes forecasting.
  - **Internal Holdout vs. External Validation**: A random 80/20 train/test split on the same hospital cohort **CANNOT** be compared numerically to temporal or multi-center external validation.
  - **Strict Anti-Ranking**: When tasks are non-comparable, agents **MUST NOT** declare one model or paper "superior" based on raw metrics.

---

## 6. Cross-Paper Synthesis Column Requirements

The final column in the comparison matrix (`Cross-paper synthesis`) must provide substantive analytical synthesis, not just restate paper cells:
1. **Identify Consensus**: Highlight where findings, feature rankings, or risk factors replicate across diverse cohorts.
2. **Explain Contradictions**: Provide methodological, demographic, or leakage explanations for divergent results.
3. **Audit Leakage Differences**: Point out if higher performance in one paper is driven by data leakage (e.g., SMOTE before split, label biomarker in features).
4. **Synthesize Actionable Reusability**: Clarify which methodological components our research project should adopt and which anti-patterns must be rejected.
5. **Forbidden Behaviors**:
   - Never declare an overall "best paper" or "winner".
   - Never average incompatible metrics.
   - Never treat citation count as a proxy for evidence quality.
   - Never invent causal claims for observational differences.

---

## 7. Mechanism, Hypothesis, and Interpretation Integrity

To ensure scientific rigor and avoid speculation creep:
- **Authors' Interpretation**: Strictly summarize the original authors' viewpoint as expressed in their paper.
- **Evidence-Supported Mechanism**: Document only biological, behavioral, or epidemiological mechanisms directly demonstrated or measured by the study's data.
- **Analytical Hypothesis**: Document speculative or deductive mechanisms, clearly labeling them as hypotheses (e.g., `[Analyst hypothesis: difference driven by unmeasured metformin use]`).
- **Association vs. Causality**: Never convert observational feature importance or regression coefficients into causal claims.
- **Competing Mechanisms**: When multiple biological explanations exist for a finding, list them as alternative possibilities.

---

## 8. Claim Provenance Integration

The quick table and comparison matrix are high-level navigation aids. They operate in tandem with the canonical claim provenance contract:
- **No Substitute**: A cell in the quick review table does not eliminate the requirement for formal claim provenance when citing evidence in research manuscripts.
- **Provenance Attributes**: Any factual assertion drawn from a paper for manuscript use must be recorded with:
  - `claim`: Clear statement of the empirical fact.
  - `source`: Paper identifier.
  - `doi`: Digital Object Identifier.
  - `location`: Exact `{ section, table, page }`.
  - `support`: `direct | partial | contextual | unsupported`.
  - `confidence`: `high | medium | low`.
- **Integrity**: Never upgrade `partial` or `contextual` support to `direct` for convenience.

---

## 9. Large Comparison Matrix Batching (> 5 Papers)

When comparing large groups of papers:
- **2 to 5 Papers**: Present as a single consolidated comparison matrix.
- **More than 5 Papers**:
  - Preserve the identical dimension-by-row and paper-by-column orientation.
  - Split the papers into clearly labeled horizontal batches (e.g., `Batch 1: Papers P1–P4`, `Batch 2: Papers P5–P8`).
  - Maintain the exact same 47 required rows in identical sequence across all batches.
  - Include the `Cross-paper synthesis` column on each batch or provide a unified, comprehensive Cross-Batch Synthesis following all batches.
  - Never drop required scientific dimensions to compress table width.

---

## 10. Presentation Flow Sequence

### 10.1 Single-Paper Analysis Presentation Order (`paper-analyzer`)
1. **Paper Identity**: Header block with title, authors, year, journal, DOI, horizon badge.
2. **Single-Paper Quick Review Table**: The 48-row table (Section 3).
3. **Detailed Methodological Analysis**: Deep breakdown of pipeline, data, preprocessing, model architectures, and validation.
4. **Risk of Bias / Leakage Mini-Audit**: Probes CP1–CP6, O11, and Leakage Types B–G.
5. **Evidence & Reproducibility Assessment**: Independent evaluation of `evidence_candidate`, `reproduction_candidate`, and 5D reproducibility.
6. **Claim-Level Provenance**: Grounded factual claims with exact locations and support levels.
7. **Relevance to Current Research**: Concrete mapping to active repository research objectives.
8. **Actionable Research Implications**: Reusable elements, anti-patterns to avoid, and advisory action recommendation (`recommended_action`).

### 10.2 Multi-Paper Comparison Presentation Order (`paper-comparator`)
1. **Papers Included**: Overview of compared papers (IDs, titles, years, datasets, horizons).
2. **Multi-Paper Comparison Matrix**: The 47-row matrix with cross-paper synthesis (Section 4).
3. **Comparability Assessment**: Explicit 11-dimension evaluation of task and cohort comparability.
4. **Detailed Cross-Paper Synthesis**: Deep narrative contrasting methodologies, feature sets, and experimental pipelines.
5. **Agreement and Disagreement Analysis**: Methodological and clinical audit explaining divergences.
6. **Evidence and Reproducibility Distribution**: Comparative appraisal of evidence utility vs replication feasibility.
7. **Implications for Current Research**: Reusable strategies and anti-patterns for our study.
8. **Remaining Evidence Gaps**: Scientific questions left unresolved across the paper cohort.
