#!/usr/bin/env python3
"""
pdf-extract — high-fidelity scientific PDF -> extracted.md

Goal: a FAITHFUL, COMPLETE, STRUCTURE-PRESERVING markdown that an LLM agent
(paper-analyzer) can read to understand >90% of the paper without opening the PDF.
NOT a summary/digest — interpretation is the analyzer's job.

Engines (auto-selected):
  - docling  (PRIMARY): layout-aware reading order, TableFormer table structure,
             OCR for scanned pages. Best for 2-column scientific papers & tables.
             Processed in PAGE CHUNKS to bound memory (avoids std::bad_alloc on
             long papers / low-RAM machines).
  - pymupdf4llm (FALLBACK): pure-wheel, fast, decent multicolumn; weaker tables.

Pipeline: probe -> extract -> clean (strip running headers/footers/watermarks/
license, de-hyphenate) -> QA score -> write extracted.md + extraction_report.json

QA is ground-truth aware: table coverage is measured against the 'Table N'
captions found in the SOURCE pdf text, and a tail-snippet check catches silent
truncation (dropped pages).

Usage:
  python extract.py <paper_dir|source.pdf> [--engine auto|docling|pymupdf]
                    [--ocr auto|on|off] [--chunk 6] [--force]
"""
import sys, os, re, json, argparse, time, traceback, gc, tempfile
from pathlib import Path

os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")

# ----------------------------- helpers -----------------------------

def _alnum(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())

def _table_numbers(text):
    """Distinct main-text 'Table N' numbers, EXCLUDING 'Supplementary/Suppl. Table N'.

    Supplementary tables live in a separate file, not in source.pdf, so counting
    them as ground-truth captions over-inflates the table-coverage denominator
    (a Nature/Springer paper citing 'Supplementary Table 9' must not be penalised
    for a table that isn't in the PDF)."""
    nums = set()
    for m in re.finditer(r"\b[Tt]able[\s ]+(\d{1,2})\b", text):
        pre = text[max(0, m.start() - 16):m.start()].lower()
        if "suppl" in pre:
            continue
        nums.add(int(m.group(1)))
    return sorted(nums)

def _page_has_fullpage_image(page):
    """True if a single image covers >=45% of the page (hallmark of a scanned page)."""
    parea = float(page.rect.width) * float(page.rect.height)
    if parea <= 0:
        return False
    try:
        imgs = page.get_images(full=True)
    except Exception:
        return False
    for img in imgs:
        try:
            rects = page.get_image_rects(img[0])
        except Exception:
            rects = []
        for r in rects:
            if (r.width * r.height) > 0.45 * parea:
                return True
    return False

# ----------------------------- PDF probe -----------------------------

def probe_pdf(pdf_path):
    import pymupdf
    doc = pymupdf.open(pdf_path)
    pages = doc.page_count
    per_page, full = [], []
    for i in range(pages):
        p = doc[i]
        t = p.get_text("text")
        per_page.append({"chars": len(t.strip()), "images": len(p.get_images()),
                         "big_img": _page_has_fullpage_image(p)})
        full.append(t)
    total = sum(pp["chars"] for pp in per_page)
    ftext = "\n".join(full)
    caps = _table_numbers(ftext)
    figs = sorted(set(int(x) for x in re.findall(r"\b[Ff]ig(?:ure)?\.?[\s ]+(\d{1,2})\b", ftext)))
    # image-only / scanned page: near-full-page image AND little real text
    scanned = [i + 1 for i, pp in enumerate(per_page)
               if pp["big_img"] and pp["chars"] < 800]
    mostly_scanned = pages > 0 and len(scanned) >= max(1, 0.5 * pages)
    # completeness check: several short alnum slices from the last substantial page(s)
    tail_text = ""
    for i in range(pages - 1, -1, -1):
        if len(_alnum(full[i])) > 250:
            tail_text = _alnum(full[i])
            if i - 1 >= 0:
                tail_text = _alnum(full[i - 1])[-300:] + tail_text
            break
    last_snippets = []
    if len(tail_text) > 200:
        L = len(tail_text)
        for frac in (0.2, 0.45, 0.7, 0.9):
            st = int(L * frac)
            last_snippets.append(tail_text[st:st + 30])
    # defective text layer: spaced-colon decimals ("0 : 946") or dropped fi/fl ligatures
    spaced_dec = len(re.findall(r"\d\s:\s\d", ftext))
    drop_lig = len(re.findall(r"\b(?:classi|speci|con|signi|coef|bene|ef) [a-z]{2,}", ftext))
    defective = (spaced_dec >= 5) or (drop_lig >= 8)
    doc.close()
    return {
        "pages": pages, "source_text_chars": total,
        "scanned_pages": scanned, "mostly_scanned": bool(mostly_scanned),
        "src_table_captions": caps, "src_fig_captions": figs,
        "last_snippets": last_snippets,
        "defective_text_layer": bool(defective),
        "defective_signal": {"spaced_decimals": spaced_dec, "dropped_ligatures": drop_lig},
    }

# ----------------------------- Engines -----------------------------

def docling_available():
    try:
        import docling  # noqa
        return True
    except Exception:
        return False

def _make_docling_converter(ocr_mode):
    """ocr_mode: 'off' | 'auto' (ocr image regions only) | 'full' (force full-page ocr)."""
    from docling.document_converter import DocumentConverter, PdfFormatOption
    from docling.datamodel.base_models import InputFormat
    from docling.datamodel.pipeline_options import PdfPipelineOptions
    po = PdfPipelineOptions()
    po.do_table_structure = True
    try:
        from docling.datamodel.pipeline_options import TableFormerMode
        po.table_structure_options.mode = TableFormerMode.ACCURATE
    except Exception:
        pass
    try:
        po.table_structure_options.do_cell_matching = True
    except Exception:
        pass
    po.do_ocr = (ocr_mode != "off")
    if po.do_ocr:
        force = (ocr_mode == "full")
        # prefer RapidOCR (onnx, cpu) if available; else fall back to default engine
        try:
            from docling.datamodel.pipeline_options import RapidOcrOptions
            po.ocr_options = RapidOcrOptions(force_full_page_ocr=force)
        except Exception:
            try:
                po.ocr_options.force_full_page_ocr = force
            except Exception:
                pass
    return DocumentConverter(
        format_options={InputFormat.PDF: PdfFormatOption(pipeline_options=po)})

def extract_docling(pdf_path, ocr_mode, chunk_size=6):
    """Chunked conversion to bound peak memory. Returns (markdown, failed_pages)."""
    import pymupdf
    conv = _make_docling_converter(ocr_mode)
    src = pymupdf.open(pdf_path)
    n = src.page_count
    try:
        if n <= chunk_size:
            md = conv.convert(str(pdf_path)).document.export_to_markdown()
            return md, []
        parts, failed = [], []
        tmpdir = tempfile.mkdtemp(prefix="pdfx_")
        try:
            for start in range(0, n, chunk_size):
                end = min(start + chunk_size, n)
                chunk = pymupdf.open()
                chunk.insert_pdf(src, from_page=start, to_page=end - 1)
                cpath = os.path.join(tmpdir, "chunk_%03d.pdf" % start)
                chunk.save(cpath); chunk.close()
                try:
                    md = conv.convert(cpath).document.export_to_markdown()
                    parts.append(md)
                except Exception as e:
                    failed.extend(range(start + 1, end + 1))
                    parts.append("\n<!-- chunk pages %d-%d failed: %s -->\n"
                                 % (start + 1, end, e))
                finally:
                    try: os.remove(cpath)
                    except Exception: pass
                    gc.collect()
        finally:
            try: os.rmdir(tmpdir)
            except Exception: pass
        return "\n\n".join(parts), failed
    finally:
        src.close()

def extract_pymupdf(pdf_path):
    import pymupdf4llm
    return pymupdf4llm.to_markdown(str(pdf_path), table_strategy="lines_strict",
                                   show_progress=False), []

# ----------------------------- Cleanup -----------------------------

WATERMARK_PATTERNS = [
    r"^\s*Downloaded from .*", r".*onlinelibrary\.wiley\.com.*",
    r".*See the Terms and Conditions.*", r".*Creative Commons License\s*$",
    r"^\s*www\.nature\.com/scientificreports/?\s*$",
    r"^\s*Content courtesy of .*", r"^\s*\d{6,}, \d{4}, .*Downloaded.*",
    r"^\s*VOLUME \d+, \d{4}\s*$", r"^\s*Page \d+ of \d+\s*$",
    r"^\s*Ready to submit your research.*", r".*biomedcentral\.com/submissions.*",
    r"^\s*At BMC, research is always in progress.*",
    r"^\s*(fast, convenient online submission|thorough peer review|"
    r"rapid publication on acceptance|gold Open Access|maximum visibility for your research).*",
]
WATERMARK_RE = re.compile("|".join("(?:%s)" % p for p in WATERMARK_PATTERNS), re.I)

LICENSE_BLOCK_RE = re.compile(
    r"(Open Access[ ]+This article is licensed|This article is licensed under|"
    r"The images or other third party material).*?(creativecommons\.org\S*|"
    r"publicdomain/zero/1\.0/?)", re.I | re.S)

def normalize_line(s):
    s = re.sub(r"\d+", "#", s)
    return re.sub(r"\s+", " ", s).strip().lower()

def detect_running_lines(md, pages):
    from collections import Counter
    c = Counter()
    for ln in md.split("\n"):
        s = ln.strip()
        if not s or s[0] in "#|!" :
            continue
        if len(s) > 120:
            continue
        c[normalize_line(s)] += 1
    thresh = max(4, int(0.30 * max(pages, 1)))
    return {k for k, v in c.items() if v >= thresh and len(k) >= 3}

def clean_markdown(md, pages):
    md = LICENSE_BLOCK_RE.sub("", md)
    running = detect_running_lines(md, pages)
    out, removed = [], 0
    for ln in md.split("\n"):
        s = ln.strip()
        if s.startswith("#"):
            # boilerplate ads (e.g. "## At BMC, research is always in progress.")
            # get promoted to headings by docling; strip if the heading TEXT is a
            # known watermark. Real section titles never match these patterns.
            if WATERMARK_RE.match(s.lstrip("#").strip()):
                removed += 1; continue
        elif s and s[0] != "|":
            if WATERMARK_RE.match(s):
                removed += 1; continue
            if len(s) <= 120 and normalize_line(s) in running:
                removed += 1; continue
        out.append(ln)
    md = "\n".join(out)
    md = re.sub(r"([A-Za-z])-\n([a-z])", r"\1\2", md)        # de-hyphenate
    md = md.replace("­", "").replace("​", "").replace("﻿", "")  # soft-hyphen, ZWSP, BOM
    md = re.sub("[  -   　]", " ", md)  # unicode spaces -> regular space
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md.strip() + "\n", removed

# ----------------------------- QA scoring -----------------------------

def count_md_tables(md):
    n, in_t = 0, False
    for ln in md.split("\n"):
        s = ln.strip()
        row = s.startswith("|") and s.count("|") >= 2
        if row and not in_t:
            n += 1; in_t = True
        elif not row:
            in_t = False
    return n

def distinct_table_captions(md):
    return len(_table_numbers(md))

def _iter_md_tables(md):
    """Yield each markdown table as a list of rows (row = list of cell strings)."""
    tables, cur = [], []
    for ln in md.split("\n"):
        s = ln.strip()
        if s.startswith("|") and s.count("|") >= 2:
            cells = [c.strip() for c in s.strip("|").split("|")]
            if set("".join(cells)) <= set("-: "):   # separator row
                continue
            cur.append(cells)
        else:
            if cur:
                tables.append(cur); cur = []
    if cur:
        tables.append(cur)
    return tables

def analyze_table_quality(md):
    """Detect STRUCTURALLY GARBLED tables (TableFormer failure on complex/borderless
    grids): values shattered into wrong cells, 'x ± y' split into standalone '±' cells,
    runaway-sparse layout. A table coverage count alone scores a garbled grid as
    'present' — this catches the difference. Conservative: flags only unambiguous
    corruption so clean tables with legitimate '-'/repeated cells are NOT penalised."""
    n_garbled, details = 0, []
    for i, rows in enumerate(_iter_md_tables(md)):
        cells = [c for r in rows for c in r]
        n = len(cells) or 1
        empty = sum(1 for c in cells if c == "")
        lone_pm = sum(1 for c in cells if c in ("±", "∓"))
        empty_pct = round(100 * empty / n)
        if lone_pm >= 3 or (empty_pct >= 50 and n >= 100):
            n_garbled += 1
            details.append({"table_index": i, "cells": n, "empty_pct": empty_pct,
                            "lone_pm_cells": lone_pm, "rows": len(rows)})
    return n_garbled, details

def count_equationish(md):
    return sum(1 for ln in md.split("\n")
               if "=" in ln and re.search(r"[A-Za-z]", ln) and len(ln.strip()) < 80)

def qa_score(md, probe, ocr_used, failed_pages):
    out_chars = len(md)
    n_tbl = count_md_tables(md)
    src_caps = len(probe.get("src_table_captions", []))
    src = max(probe["source_text_chars"], 1)
    density = (out_chars / src) if not ocr_used else 1.0
    warnings, score = [], 100

    if probe["mostly_scanned"] and not ocr_used:
        score -= 60; warnings.append("scanned PDF but OCR not applied")
    if ocr_used and out_chars < 300 * max(probe["pages"], 1):
        score -= 25
        warnings.append("OCR output sparse (%d chars / %d pages)" % (out_chars, probe["pages"]))

    if failed_pages:
        score -= 30
        warnings.append("%d page(s) failed during extraction: %s"
                        % (len(failed_pages), failed_pages[:12]))

    # completeness: at least one tail slice of the last page(s) must appear in output.
    # Snippets are sampled from the EMBEDDED text layer, so this check is only valid
    # when we extracted from that layer — skip it for OCR output (the text layer of a
    # scanned PDF is empty/watermark garbage and never matches the OCR'd content).
    snips = probe.get("last_snippets", [])
    if snips and not ocr_used:
        amd = _alnum(md)
        found = sum(1 for s in snips if s and s in amd)
        if found == 0:
            score -= 25
            warnings.append("tail of last page(s) not found in output (possible truncation)")

    if not ocr_used and density < 0.65:
        score -= 20
        warnings.append("low text density %.2f vs source" % density)

    # table coverage vs SOURCE captions (ground truth)
    cov = 1.0
    if src_caps >= 2:
        cov = min(1.0, n_tbl / src_caps)
        if cov < 0.5:
            score -= 30
            warnings.append("table coverage %.0f%% (%d md-tables / %d source 'Table N')"
                            % (100 * cov, n_tbl, src_caps))
        elif cov < 0.85:
            score -= 12
            warnings.append("partial table coverage %.0f%% (%d/%d)"
                            % (100 * cov, n_tbl, src_caps))

    # structural table integrity: a garbled grid is counted as 'present' by coverage
    # but its data is unreadable -> penalise proportionally to the fraction garbled.
    n_garbled, garble_details = analyze_table_quality(md)
    if n_garbled and n_tbl:
        garble_frac = n_garbled / n_tbl
        pen = min(45, round(50 * garble_frac))
        score -= pen
        warnings.append(
            "%d/%d markdown table(s) structurally garbled (split ±/scattered cells); "
            "analyzer should consult source.pdf for these: tables %s"
            % (n_garbled, n_tbl, [d["table_index"] for d in garble_details]))

    if WATERMARK_RE.search(md):
        score -= 8; warnings.append("residual watermark/boilerplate")

    score = max(0, min(100, score))
    return {
        "out_chars": out_chars, "n_markdown_tables": n_tbl,
        "source_table_captions": src_caps, "table_coverage": round(cov, 3),
        "n_garbled_tables": n_garbled, "garbled_tables": garble_details,
        "n_equationish_lines": count_equationish(md),
        "text_density": round(density, 3), "score": score, "warnings": warnings,
    }

# ----------------------------- Driver -----------------------------

def extract_one(pdf_path, engine="auto", ocr="auto", chunk=6, force=False):
    pdf_path = Path(pdf_path)
    out_dir = pdf_path.parent
    md_path = out_dir / "extracted.md"
    rep_path = out_dir / "extraction_report.json"

    if md_path.exists():
        bak = out_dir / "extracted.prev.md"
        if not bak.exists():
            bak.write_text(md_path.read_text(encoding="utf-8", errors="replace"),
                           encoding="utf-8")
        if not force:
            return {"paper": out_dir.name, "status": "SKIP (exists, use --force)"}

    probe = probe_pdf(pdf_path)
    # decide OCR mode: off | auto (ocr image regions) | full (force full-page)
    if ocr == "off":
        ocr_mode = "off"
    elif ocr == "on":
        ocr_mode = "full"
    else:  # auto
        if probe["mostly_scanned"]:
            ocr_mode = "full"
        elif probe["scanned_pages"]:
            ocr_mode = "auto"
        else:
            ocr_mode = "off"
    want_ocr = ocr_mode != "off"

    use_docling = engine in ("docling", "auto") and docling_available()
    t0 = time.time()
    try:
        if use_docling:
            raw, failed = extract_docling(pdf_path, ocr_mode, chunk_size=chunk)
            used = "docling"
            # safety net: near-empty output but the PDF has images -> force OCR
            if len(raw.strip()) < 200 and ocr_mode == "off" and probe["scanned_pages"]:
                ocr_mode = "full"; want_ocr = True
                raw, failed = extract_docling(pdf_path, ocr_mode, chunk_size=chunk)
        else:
            raw, failed = extract_pymupdf(pdf_path)
            used = "pymupdf4llm"; want_ocr = False
    except Exception as e:
        report = {"paper": out_dir.name, "status": "FAILED", "engine": used if use_docling else "pymupdf",
                  "error": "%s: %s" % (type(e).__name__, e),
                  "trace": traceback.format_exc()[-1500:], "probe": probe}
        rep_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
        return report

    md, removed = clean_markdown(raw, probe["pages"])
    qa = qa_score(md, probe, ocr_used=want_ocr, failed_pages=failed)

    # OCR-retry-and-pick-best: defective text layer / image tables / low table coverage.
    # OCR bypasses a corrupted text layer ("0 : 946" -> "0.946") and lets TableFormer
    # read image-based tables. Keep whichever output is quantitatively richer.
    def _decimals(m):
        return len(re.findall(r"\d\.\d", m))
    weak = ((not want_ocr) and use_docling and (
        probe.get("defective_text_layer")
        or (qa["table_coverage"] < 0.5 and qa["source_table_captions"] >= 3)))
    if weak:
        try:
            raw2, failed2 = extract_docling(pdf_path, "full", chunk_size=chunk)
            md2, removed2 = clean_markdown(raw2, probe["pages"])
            qa2 = qa_score(md2, probe, ocr_used=True, failed_pages=failed2)
            cur = (qa["n_markdown_tables"], _decimals(md), qa["score"])
            new = (qa2["n_markdown_tables"], _decimals(md2), qa2["score"])
            if new > cur:
                md, removed, qa, failed = md2, removed2, qa2, failed2
                want_ocr = True; used = "docling+ocr"
        except Exception:
            pass

    header = ("<!-- extracted by pdf-extract | engine=%s | pages=%d | ocr=%s | "
              "tables=%d/%d | density=%.2f | score=%d -->\n\n"
              % (used, probe["pages"], want_ocr, qa["n_markdown_tables"],
                 qa["source_table_captions"], qa["text_density"], qa["score"]))
    md_path.write_text(header + md, encoding="utf-8")

    report = {
        "paper": out_dir.name, "status": "OK", "engine": used,
        "ocr_used": want_ocr, "secs": round(time.time() - t0, 1),
        "pages": probe["pages"], "failed_pages": failed,
        "source_text_chars": probe["source_text_chars"],
        "scanned_pages": probe["scanned_pages"], "mostly_scanned": probe["mostly_scanned"],
        "removed_boilerplate_lines": removed, "qa": qa,
    }
    rep_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    return report

def resolve_pdf(arg):
    p = Path(arg)
    if p.is_dir():
        cand = p / "source.pdf"
        if cand.exists():
            return cand
        raise FileNotFoundError("no source.pdf in %s" % p)
    if p.suffix.lower() == ".pdf":
        return p
    raise FileNotFoundError(arg)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("target")
    ap.add_argument("--engine", default="auto", choices=["auto", "docling", "pymupdf"])
    ap.add_argument("--ocr", default="auto", choices=["auto", "on", "off"])
    ap.add_argument("--chunk", type=int, default=6)
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    pdf = resolve_pdf(a.target)
    rep = extract_one(pdf, engine=a.engine, ocr=a.ocr, chunk=a.chunk, force=a.force)
    print(json.dumps(rep, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
