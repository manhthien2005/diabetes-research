#!/usr/bin/env python3
"""
Re-score existing extracted.md files WITHOUT re-running docling.

docling output is deterministic and already saved to disk, so a change to the QA
*scorer* (e.g. excluding 'Supplementary Table N' from the ground-truth caption
count) does not require re-extraction. This re-probes each source.pdf (fast,
pymupdf only), re-scores the saved markdown body, and refreshes the header line
in extracted.md plus the qa block in extraction_report.json.

Usage:
  python .claude/skills/pdf-extract/recompute_qa.py [--root 01_Diabetes_Research/searched_papers] [--only <substr>]
"""
import sys, json, argparse, re
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from extract import probe_pdf, qa_score, clean_markdown  # noqa: E402

HEADER_RE = re.compile(r"^<!-- extracted by pdf-extract \|.*?-->\s*\n+", re.S)

def strip_header(text):
    return HEADER_RE.sub("", text, count=1)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="01_Diabetes_Research/searched_papers")
    ap.add_argument("--only", default="")
    a = ap.parse_args()

    mds = sorted(Path(a.root).glob("Layer_*/*/extracted.md"))
    if a.only:
        mds = [m for m in mds if a.only in str(m)]

    changed = []
    for md_path in mds:
        d = md_path.parent
        pdf = d / "source.pdf"
        rep_path = d / "extraction_report.json"
        if not pdf.exists() or not rep_path.exists():
            print("SKIP (missing pdf/report):", d.name); continue
        rep = json.loads(rep_path.read_text(encoding="utf-8"))
        body = strip_header(md_path.read_text(encoding="utf-8", errors="replace")).lstrip("\n")
        probe = probe_pdf(pdf)
        # re-run cleanup so cleaner improvements (e.g. boilerplate-as-heading) apply
        # without a full docling re-extraction; clean_markdown is idempotent.
        body, _ = clean_markdown(body, probe["pages"])
        ocr_used = bool(rep.get("ocr_used"))
        failed = rep.get("failed_pages", []) or []
        old_score = rep.get("qa", {}).get("score")
        old_caps = rep.get("qa", {}).get("source_table_captions")
        qa = qa_score(body, probe, ocr_used=ocr_used, failed_pages=failed)

        header = ("<!-- extracted by pdf-extract | engine=%s | pages=%s | ocr=%s | "
                  "tables=%d/%d | density=%.2f | score=%d -->\n\n"
                  % (rep.get("engine", "docling"), probe["pages"], ocr_used,
                     qa["n_markdown_tables"], qa["source_table_captions"],
                     qa["text_density"], qa["score"]))
        md_path.write_text(header + body, encoding="utf-8")
        rep["qa"] = qa
        rep["source_text_chars"] = probe["source_text_chars"]
        rep["scanned_pages"] = probe["scanned_pages"]
        rep["mostly_scanned"] = probe["mostly_scanned"]
        rep_path.write_text(json.dumps(rep, indent=2, ensure_ascii=False), encoding="utf-8")

        tag = ""
        if old_score != qa["score"] or old_caps != qa["source_table_captions"]:
            tag = "  <== score %s->%s  caps %s->%s" % (
                old_score, qa["score"], old_caps, qa["source_table_captions"])
            changed.append(d.name)
        print("%3d | %2d/%-2d | %-46s%s" %
              (qa["score"], qa["n_markdown_tables"], qa["source_table_captions"],
               d.name, tag))

    print("\nrescored %d papers; %d changed: %s"
          % (len(mds), len(changed), ", ".join(changed) or "none"))

if __name__ == "__main__":
    main()
