# Extraction review — Cai 2021

Reviewed on 2026-11-05. This is a document-fidelity check, not a certification of the study's scientific validity.

## Sources and method

- `source.pdf`: original 15-page published article, journal pages 2087–2101; DOI 10.2147/DMSO.S304994. SHA256 recorded in `metadata.json`.
- `source.fulltext.xml`: publisher JATS obtained through Europe PMC for PMC8123981.
- Docling processed all 15 PDF pages without OCR or failed pages. The raw output is retained as `extracted.prev.md`.
- The canonical `extracted.md` uses publisher paragraphs, table cells, captions and reference order to remove PDF column/page-boundary artifacts. Author correspondence was restored from JATS author notes. Inline citation formatting was normalized without changing citation numbers. Neither source wording nor source numerical discrepancies were corrected.
- The automated extraction score of 100 concerns the original Docling heuristics; it does not replace these fidelity checks or a scientific review.

## Coverage and source locations

| Item | Source location | Canonical reader |
|---|---|---|
| Table 1, cohort characteristics | PDF page 6 / journal page 2092 | All rows and numeric cells retained |
| Table 2, LASSO coefficients | PDF page 7 / journal page 2093 | All six predictors and lambda note retained; these are not labelled final Cox coefficients |
| Table 3, discrimination | PDF page 9 / journal page 2095 | Derivation and validation values, intervals and source column headings retained |
| Figures 1–7 | PDF pages 5, 7, 8, 9, 10, 10, 11 | Seven original figures, captions and page mappings in `figures/manifest.json` |
| References | End matter | All 73 entries in original order; same entries in the translation |
| Headings | Front matter, body and end matter | 36 sections aligned between English and Vietnamese |

The original PDF was visually inspected at the title, statistical methods, cohort characteristics and forest-plot pages. The seven figure assets preserve original English labels; captions are translated in the Vietnamese reader. WebP display copies reduce download size without changing figure content.

## Source discrepancies deliberately preserved

- Narrative candidate-variable count versus Figure 2 caption: 18 versus 19.
- Figure 2 caption mentions both partial likelihood and binomial deviance; the executable LASSO family remains unresolved.
- Recruitment dates in Figure 1 versus the Study Population narrative differ.
- The transition from 15,744 to 12,940 participants is not fully accounted for in the inspected reporting; no exclusion count was invented.
- The crude-incidence wording and units require caution; event counts alone do not supply person-time.
- Statements about retrospective-design bias and insulin resistance are translated as published; methodological critique is separate in `analysis.html`.

Final hashes, bilingual alignment and web checks are recorded in `reading_pack_validation.json` and `translation_report.json`.
