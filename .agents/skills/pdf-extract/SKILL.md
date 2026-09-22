---
name: pdf-extract
description: |
  Extract scientific PDFs into `extracted.md` with HIGH FIDELITY, COMPLETENESS, and
  STRUCTURE PRESERVATION (tables→markdown, multi-column reading order, OCR for scanned pages)
  so paper-analyzer / paper-comparator can understand >90% of the paper without opening the PDF.
  DO NOT summarize — interpretation belongs to analyzer.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/source.pdf
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extracted.md           # high-fidelity markdown
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extraction_report.json # QA score + warnings
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extracted.prev.md      # previous extract backup (1x)
---

# pdf-extract

## Purpose
Convert scientific PDFs (multi-column, numerous tables, occasionally scanned images) into **complete
and structurally sound** markdown. Principle: **preserve ground truth, no fabrication, no omissions**.
Summarizing / assigning horizon is the responsibility of `paper-analyzer`, NOT performed here.

## Engine
- **docling** (PRIMARY): layout-aware reading order (resolves column mixing), TableFormer
  (borderless tables → markdown), OCR (RapidOCR) for scanned pages. Runs on CPU.
- **pymupdf4llm** (FALLBACK): used only when docling is unavailable. Weaker table parsing.

One-time installation:
```
python -m pip install pymupdf4llm pdfplumber docling rapidocr-onnxruntime onnxruntime
```

## Execution
Single paper:
```
python .agents/skills/pdf-extract/extract.py 01_Diabetes_Research/searched_papers/Layer_X/<paper_id> --force
```
Batch run (each paper in a separate subprocess → reset RAM, prevent cumulative OOM):
```
python .agents/skills/pdf-extract/run_all.py            # run all, write extraction_summary.json
python .agents/skills/pdf-extract/run_all.py --min-skip 95   # skip papers already achieving >=95
python .agents/skills/pdf-extract/run_all.py --only tasin    # matching names only
```
`extract.py` flags: `--engine auto|docling|pymupdf`, `--ocr auto|on|off`, `--chunk 6`, `--force`.

Recompute QA scoring only (modified scoring formula) — WITHOUT re-running docling:
```
python .agents/skills/pdf-extract/recompute_qa.py      # re-probe + re-clean + re-score
```
Because docling output is deterministic and saved to disk, changing *scoring logic* or
*cleaner rules* requires only re-scoring `extracted.md` (re-probing via pymupdf, seconds per paper),
avoiding expensive re-extraction (docling ~12s/page, OCR ~6-10 min/paper).

## Critical Techniques (Resolving Real-World Issues)
- **Chunk 6 pages/batch**: docling renders entire document into RAM simultaneously → `std::bad_alloc`
  dropping final pages (losing References + results tables) on long papers or low RAM machines. Splitting
  PDF via pymupdf then concatenating → bounds memory, prevents dropped pages.
- **Scan detection by image area**: page with image coverage ≥45% + low text count = scanned.
  Watermarks (e.g. Wiley ~360 chars/page) mislead naive character counts → must use image area.
  ≥50% scanned pages → full-page OCR; sparse scanned pages → OCR image region only.
- **Boilerplate cleanup**: strip download watermarks, running headers/footers (lines repeated ≥30% of
  pages), full Creative Commons license paragraphs, publisher ads (even when pushed by docling into
  **headings** `## At BMC…`); rejoin hyphenated line-end words; remove zero-width characters;
  normalize no-break space (U+00A0) and unicode spaces to regular space.

## Automated QA (extraction_report.json) — Evidence-Based Scoring
- `table_coverage` = count of markdown tables / count of "Table N" captions in **original PDF text**
  (ground truth, not self-referential output → catches dropped tables).
  **EXCLUDE "Supplementary/Suppl. Table N"** from denominator: supplement tables reside in separate files,
  not present in source.pdf → counting them penalizes unfairly (e.g. Nature/Springer citing
  "Supplementary Table 9" when main paper has only Tables 1–2).
- **Tail check**: end snippet of final text page must appear in output → catches silent truncation.
  **BYPASS during OCR**: snippet is sourced from embedded text layer; scanned papers have empty/watermark
  text layer that never matches OCR content → would trigger false truncation warning. Checked only on text layer.
- **Table-garble check** (`analyze_table_quality`): counts tables with *grid present but shattered structure*
  ("x ± y" split into standalone "±" cell ≥3, or large grid ≥50% empty). `table_coverage` only counts
  *presence* of tables → CANNOT catch fractured tables; this check penalizes based on broken table ratio,
  lists table indices, and prompts analyzer to inspect source.pdf for those tables. Occurs on transposed /
  borderless / dense multi-tier matrices (TableFormer & pymupdf both struggle — tool limitation, not pipeline bug).
- `failed_pages`, `text_density`, scan-without-OCR / sparse OCR / remaining watermark warnings.
- `score` 0–100. **<85 = requires review** (listed at end of run_all).
- Header in `extracted.md` records: engine | pages | ocr | tables | density | score.
- Changing QA formula → run `recompute_qa.py` to re-score all, without re-running docling.

## Constraints
- DO NOT overwrite directly: previous version is backed up to `extracted.prev.md` (1x) before replacement.
- Scanned pages → OCR (minor OCR digit variance accepted; far superior to leaving blank). Papers with
  zero text where OCR also fails → low score, alert user.
- Run in MAIN LOOP (local script, 0 API tokens). Do not delegate PDF fetching to subagents.
