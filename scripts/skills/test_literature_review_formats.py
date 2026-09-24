#!/usr/bin/env python3
"""Contract tests for literature review formats and comparability invariants.

Standard library only. No network access or LLM calls.
Verifies:
1. Shared literature_review_formats.md exists.
2. Single-paper template contains Field, Summary, and Evidence / Location columns.
3. Single-paper template includes study identity, population, methods, outcome, validation,
   results, limitations, evidence, reproducibility, and research relevance.
4. Single-paper template separately contains Authors' conclusion and Our evidence synthesis.
5. Single-paper template separately contains Evidence-supported mechanism and Analytical hypothesis.
6. Multi-paper template defines rows as comparison dimensions and papers as columns.
7. Multi-paper template includes Cross-paper synthesis.
8. Multi-paper template includes comparability-sensitive outcome, population, horizon,
   validation, and metric rows.
9. paper-analyzer references the shared format.
10. paper-comparator references the shared format.
11. paper-analyzer preserves detailed analysis after the quick table.
12. paper-comparator preserves detailed synthesis after the matrix.
13. Missing information semantics include Not reported, Not applicable, Not verified, and Unclear.
14. No fabricated source-location behavior is allowed.
15. No overall best-paper ranking is allowed.
16. Citation count is not a scientific quality gate.
17. Evidence value and reproducibility remain separate.
18. Quantitative comparison requires a comparability assessment.
19. Cross-sectional prevalent disease and longitudinal incident prediction cannot be
    treated as automatically comparable.
20. Random same-source holdout cannot be treated as equivalent to external validation.
21. Claim provenance remains required for manuscript-level claims.
"""

from pathlib import Path
import unittest

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
FORMAT_REF_FILE = (
    REPO_ROOT
    / ".agents"
    / "skills"
    / "paper-analyzer"
    / "references"
    / "literature_review_formats.md"
)
ANALYZER_SKILL_FILE = (
    REPO_ROOT / ".agents" / "skills" / "paper-analyzer" / "SKILL.md"
)
COMPARATOR_SKILL_FILE = (
    REPO_ROOT / ".agents" / "skills" / "paper-comparator" / "SKILL.md"
)
LOCK_FILE = REPO_ROOT / ".agents" / "skills" / "SKILLS_LOCK.md"

SINGLE_PAPER_REQUIRED_ROWS = [
    "Title",
    "Authors",
    "Year",
    "Journal",
    "DOI / PMID",
    "Country / Setting",
    "Research objective",
    "Study design",
    "Data source",
    "Study period",
    "Population",
    "Sample size",
    "Inclusion / Exclusion",
    "Predictors / Exposures",
    "Outcome / Target",
    "Index time",
    "Prediction horizon",
    "Missing-data strategy",
    "Statistical methods",
    "Models",
    "Validation strategy",
    "Performance metrics",
    "Calibration",
    "Clinical utility",
    "Survey design",
    "Key findings",
    "Quantitative results",
    "Authors' conclusion",
    "Comparison with prior evidence",
    "Our evidence synthesis",
    "Evidence-supported mechanism",
    "Analytical hypothesis",
    "Strengths",
    "Limitations",
    "Risk of bias / Leakage",
    "Generalizability",
    "Data availability",
    "Code availability",
    "Reproducibility",
    "Relevance to our study",
    "Evidence candidate",
    "Reproduction candidate",
    "Claims worth citing",
    "What we can reuse",
    "What we must NOT reuse",
    "Research gaps",
    "Future research",
    "Bottom line",
]

MULTI_PAPER_REQUIRED_ROWS = [
    "Title",
    "Authors",
    "Year",
    "Journal",
    "Country / Setting",
    "Data source",
    "Study design",
    "Study period",
    "Population",
    "Sample size",
    "Inclusion / Exclusion",
    "Predictors / Exposures",
    "Outcome / Target",
    "Index time",
    "Prediction horizon",
    "Missing-data strategy",
    "Statistical methods",
    "Models",
    "Validation strategy",
    "Performance metrics",
    "Calibration",
    "Clinical utility",
    "Survey design",
    "Key findings",
    "Quantitative results",
    "Authors' interpretation",
    "Evidence-supported mechanism",
    "Analytical hypothesis",
    "Strengths",
    "Limitations",
    "Risk of bias / Leakage",
    "Generalizability",
    "Data availability",
    "Code availability",
    "Evidence relevance",
    "Reproducibility",
    "Relevance to our study",
    "Evidence candidate",
    "Reproduction candidate",
    "What we can reuse",
    "What we must NOT reuse",
    "Main agreements",
    "Main disagreements",
    "Likely reasons for disagreement",
    "Research gaps",
    "Future directions",
    "Overall synthesis",
]


class TestLiteratureReviewFormats(unittest.TestCase):
    """Test suite for literature review formats and scientific comparability."""

    @classmethod
    def setUpClass(cls):
        cls.assertTrue(
            FORMAT_REF_FILE.exists(),
            f"Missing literature formats reference file: {FORMAT_REF_FILE}",
        )
        cls.assertTrue(
            ANALYZER_SKILL_FILE.exists(),
            f"Missing paper-analyzer SKILL.md: {ANALYZER_SKILL_FILE}",
        )
        cls.assertTrue(
            COMPARATOR_SKILL_FILE.exists(),
            f"Missing paper-comparator SKILL.md: {COMPARATOR_SKILL_FILE}",
        )
        cls.assertTrue(LOCK_FILE.exists(), f"Missing SKILLS_LOCK.md: {LOCK_FILE}")

        cls.format_text = FORMAT_REF_FILE.read_text(encoding="utf-8")
        cls.analyzer_text = ANALYZER_SKILL_FILE.read_text(encoding="utf-8")
        cls.comparator_text = COMPARATOR_SKILL_FILE.read_text(encoding="utf-8")
        cls.lock_text = LOCK_FILE.read_text(encoding="utf-8")

    def test_shared_format_reference_exists(self):
        """1. Shared literature_review_formats.md must exist and be non-empty."""
        self.assertTrue(FORMAT_REF_FILE.is_file())
        self.assertGreater(len(self.format_text), 1000)

    def test_single_paper_template_columns(self):
        """2. Single-paper template contains Field, Summary, and Evidence / Location columns."""
        self.assertIn("ROWS_ARE_INFORMATION_FIELDS", self.format_text)
        self.assertIn("Field", self.format_text)
        self.assertIn("Summary", self.format_text)
        self.assertIn("Evidence / Location", self.format_text)

    def test_single_paper_template_required_rows(self):
        """3. Single-paper template covers all 48 required rows."""
        for field in SINGLE_PAPER_REQUIRED_ROWS:
            self.assertIn(
                f"`{field}`",
                self.format_text,
                f"Missing required single-paper row: {field}",
            )

    def test_single_paper_author_conclusion_vs_synthesis(self):
        """4. Single-paper template separately contains Authors' conclusion and Our evidence synthesis."""
        self.assertIn("`Authors' conclusion`", self.format_text)
        self.assertIn("`Our evidence synthesis`", self.format_text)
        self.assertIn("Authors' conclusion vs. Our evidence synthesis", self.format_text)

    def test_single_paper_mechanism_vs_hypothesis(self):
        """5. Single-paper template separately contains Evidence-supported mechanism and Analytical hypothesis."""
        self.assertIn("`Evidence-supported mechanism`", self.format_text)
        self.assertIn("`Analytical hypothesis`", self.format_text)
        self.assertIn("Evidence-supported mechanism vs. Analytical hypothesis", self.format_text)

    def test_multi_paper_template_orientation(self):
        """6. Multi-paper template defines rows as comparison dimensions and papers as columns."""
        self.assertIn(
            "ROWS_ARE_COMPARISON_DIMENSIONS_COLUMNS_ARE_PAPERS", self.format_text
        )
        self.assertIn("Comparison dimension", self.format_text)

    def test_multi_paper_cross_paper_synthesis(self):
        """7. Multi-paper template includes Cross-paper synthesis."""
        self.assertIn("Cross-paper synthesis", self.format_text)

    def test_multi_paper_template_required_rows(self):
        """8. Multi-paper template covers all 47 required rows."""
        for field in MULTI_PAPER_REQUIRED_ROWS:
            self.assertIn(
                f"`{field}`",
                self.format_text,
                f"Missing required multi-paper comparison dimension: {field}",
            )

    def test_paper_analyzer_references_shared_format(self):
        """9. paper-analyzer references the shared format."""
        self.assertIn("literature_review_formats.md", self.analyzer_text)
        self.assertIn("Single-Paper Quick Review Table", self.analyzer_text)

    def test_paper_comparator_references_shared_format(self):
        """10. paper-comparator references the shared format."""
        self.assertIn("literature_review_formats.md", self.comparator_text)
        self.assertIn("Multi-Paper Comparison Matrix", self.comparator_text)

    def test_paper_analyzer_preserves_detailed_analysis(self):
        """11. paper-analyzer preserves detailed analysis after the quick table."""
        self.assertIn("Deep Analysis", self.analyzer_text)
        self.assertIn("RoB mini-audit", self.analyzer_text)
        self.assertIn("claim_provenance", self.analyzer_text)
        self.assertIn("Overview Layer, Not Replacement", self.analyzer_text)

    def test_paper_comparator_preserves_detailed_synthesis(self):
        """12. paper-comparator preserves detailed synthesis after the matrix."""
        self.assertIn("Tổng hợp đối sánh chi tiết", self.comparator_text)
        self.assertIn("Bảng claim-evidence & provenance", self.comparator_text)
        self.assertIn("Số liệu nghi thổi phồng", self.comparator_text)

    def test_missing_information_semantics(self):
        """13. Missing information semantics include Not reported, Not applicable, Not verified, and Unclear."""
        for sentinel in ["Not reported", "Not applicable", "Not verified", "Unclear"]:
            self.assertIn(f"`{sentinel}`", self.format_text)
            self.assertIn(sentinel, self.analyzer_text)
            self.assertIn(sentinel, self.comparator_text)

    def test_no_fabricated_source_locations(self):
        """14. No fabricated source-location behavior is allowed."""
        self.assertIn("Never invent page numbers", self.format_text)
        self.assertIn("Never invent or approximate page, table, or section", self.analyzer_text)

    def test_no_overall_best_paper_ranking(self):
        """15. No overall best-paper ranking is allowed."""
        self.assertIn("No Overall Paper Ranking", self.format_text)
        self.assertIn("Do not create an overall best-paper ranking", self.comparator_text)

    def test_citation_count_is_not_quality_gate(self):
        """16. Citation count is not a scientific quality gate."""
        self.assertIn("Citation count is discovery metadata only", self.format_text)
        self.assertIn("Do not treat citation count as a comparator-quality score", self.comparator_text)

    def test_evidence_and_reproducibility_remain_separate(self):
        """17. Evidence value and reproducibility remain separate."""
        self.assertIn("Evidence vs. Reproducibility", self.format_text)
        self.assertIn("evidence_candidate", self.format_text)
        self.assertIn("reproduction_candidate", self.format_text)
        self.assertIn("Separation of Evidence vs. Reproducibility", self.analyzer_text)
        self.assertIn("Do not treat reproducibility as equivalent to evidence quality", self.comparator_text)

    def test_comparability_gate_dimensions_and_rules(self):
        """18. Quantitative comparison requires a comparability assessment."""
        self.assertIn("Comparability Gate", self.format_text)
        self.assertIn("Comparability Gate", self.comparator_text)
        for dim in [
            "Research question",
            "Study design",
            "Population",
            "Data source",
            "Outcome definition",
            "Index time",
            "Prediction horizon",
            "Predictor availability",
            "Validation design",
            "Metric definition",
            "Survey or sampling design",
        ]:
            self.assertIn(dim, self.format_text)
            self.assertIn(dim, self.comparator_text)

    def test_cross_sectional_vs_longitudinal_invariance(self):
        """19. Cross-sectional prevalent disease and longitudinal incident prediction cannot be compared directly."""
        self.assertIn("cross_sectional", self.format_text)
        self.assertIn("long_term_risk", self.format_text)
        self.assertIn("**CANNOT** be compared numerically to", self.format_text)
        self.assertIn("CANNOT be compared to longitudinal incident prediction", self.comparator_text)

    def test_holdout_vs_external_validation_invariance(self):
        """20. Random same-source holdout cannot be treated as equivalent to external validation."""
        self.assertIn("Internal Holdout vs. External Validation", self.format_text)
        self.assertIn("**CANNOT** be compared numerically to temporal or multi-center external validation", self.format_text)
        self.assertIn("Internal random holdout CANNOT be compared to external or temporal validation", self.comparator_text)

    def test_claim_provenance_integration(self):
        """21. Claim provenance remains required for manuscript-level claims."""
        self.assertIn("Claim Provenance Integration", self.format_text)
        self.assertIn("claim", self.format_text)
        self.assertIn("source", self.format_text)
        self.assertIn("doi", self.format_text)
        self.assertIn("location", self.format_text)
        self.assertIn("support", self.format_text)
        self.assertIn("confidence", self.format_text)

    def test_lock_file_updated_with_round_13_2(self):
        """Verify SKILLS_LOCK.md documents Round 13.2 local patch."""
        self.assertIn("Round 13.2", self.lock_text)
        self.assertIn("literature_review_formats.md", self.lock_text)


if __name__ == "__main__":
    unittest.main()
