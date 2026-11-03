# Extraction review — Huang 2026

Reviewed on 2026-11-03. Source: user-provided publisher PDF, DOI `10.1111/dom.71289`.

## Source integrity and extraction scope

- Original PDF: 12 pages; printed pages 10574–10585. PDF page number = printed page − 10573.
- SHA256: `b360e3a2210dd230ee796beeecd595bdb5939570dc4d7bfc31ee4890b24284c1`.
- Docling completed all 12 pages without OCR. Automated QA found both main-text tables, with no garbled table warning. Its score of 100 is a structural heuristic, not a claim of perfect scientific extraction.
- `extracted.prev.md` preserves the unmodified automated extraction. `extracted.md` includes the documented manual corrections below; it remains an extraction, not an interpretation.

## Manual corrections and checks

1. **Risk-score equations:** compared the publisher equation images with PDF page 7 / printed page 10580, §3.3.1. Automated line breaks had lost or displaced signs. Restored the two expressions, including LASSO-selected coefficients −28 for high SES, −9 for intermediate SES and −136 for height; RSF-selected coefficients −178 for height, −37 for high SES, −12 for intermediate SES, −24 for TG and −39 for HDL-C. Full original equation images are linked beside the corrected transcription. `equation_01.jpg` is the RSF-selected equation; `equation_02.jpg` is the LASSO-selected equation.
2. **Figure 1:** visually checked the participant flow on PDF page 3 / printed page 10576. The main sequence is 8815 → 7979 → 7488 → 6431, with 4502 training and 1929 test participants. Linked the original publisher figure in the extraction.
3. **Figure 2:** inspected the original nomogram, PDF page 8 / printed page 10581. Panel A uses LASSO-selected variables; panel B uses RSF-selected variables. Linked the original figure; no numerical digitization of nomogram axes was attempted.
4. **Main Table 2:** checked PDF page 6 / printed page 10579. It reports three candidate Cox models, three horizons, and separate WHII Test and ELSA results. These time-dependent C-indices must not be confused with the rounded risk-score or risk-group C-indices in §3.3.1.

## Supplementary material

`supplementary.docx` is the original publisher file extracted from the previously obtained Europe PMC supporting-files archive. `supplementary.extracted.md` preserves body-order text and 29 tables. There are 34 drawing objects that this text extraction does not transcribe. Selected supplementary tables were consulted during analysis; this is not a certification that every supplementary plot, equation or embedded image has been independently checked. Use the original DOCX when an embedded object is needed.

## Limits of reuse

The restored equations are source transcriptions, not a validated clinical calculator. Risk-score points are not absolute probabilities. Unit conversions, variable coding, baseline survival and target-population validation must be checked before any implementation. Neither the extraction nor its QA establishes clinical usefulness, absence of bias, or reproducibility on the original cohorts.
