#!/usr/bin/env python3
"""
Batch-run pdf-extract over every paper under 01_Diabetes_Research/searched_papers/.

Each paper is processed in a SEPARATE subprocess so docling/torch C++ memory is
fully released between papers (prevents cumulative std::bad_alloc on long runs).

Writes extraction_summary.json at the project root and prints a score table.

Usage:
  python .agents/skills/pdf-extract/run_all.py [--root 01_Diabetes_Research/searched_papers]
                                               [--only <substr>] [--min-skip 95]
"""
import sys, json, time, subprocess, argparse
from pathlib import Path

EXTRACT = Path(__file__).parent / "extract.py"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="01_Diabetes_Research/searched_papers")
    ap.add_argument("--only", default="", help="only papers whose path contains this substring")
    ap.add_argument("--min-skip", type=int, default=-1,
                    help="skip papers whose existing report score >= this")
    a = ap.parse_args()

    pdfs = sorted(Path(a.root).glob("Layer_*/*/source.pdf"))
    if a.only:
        pdfs = [p for p in pdfs if a.only in str(p)]
    rows = []
    t_all = time.time()
    for i, pdf in enumerate(pdfs, 1):
        name = pdf.parent.name
        repf = pdf.parent / "extraction_report.json"
        if a.min_skip >= 0 and repf.exists():
            try:
                prev = json.loads(repf.read_text(encoding="utf-8"))
                if (prev.get("qa", {}).get("score", -1)) >= a.min_skip:
                    print("[%d/%d] SKIP (score %s) %s" %
                          (i, len(pdfs), prev["qa"]["score"], name), flush=True)
                    rows.append({"paper": name, **_row(prev)})
                    continue
            except Exception:
                pass
        print("[%d/%d] %s ..." % (i, len(pdfs), name), flush=True)
        t0 = time.time()
        r = subprocess.run([sys.executable, str(EXTRACT), str(pdf.parent), "--force"],
                           capture_output=True, text=True)
        rep = {}
        if repf.exists():
            try:
                rep = json.loads(repf.read_text(encoding="utf-8"))
            except Exception:
                pass
        if not rep:
            rep = {"paper": name, "status": "NO_REPORT",
                   "stderr": (r.stderr or "")[-600:]}
        row = {"paper": name, **_row(rep)}
        rows.append(row)
        print("    -> score=%s tables=%s/%s ocr=%s %.0fs warn=%s" %
              (row["score"], row["tables"], row["src_caps"], row["ocr"],
               (time.time() - t0), row["warn"]), flush=True)

    Path("extraction_summary.json").write_text(
        json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8")

    print("\n==== SUMMARY (by score asc) ====", flush=True)
    for r in sorted(rows, key=lambda x: (x.get("score") if x.get("score") is not None else -1)):
        print("%3s | %3s/%-3s | ocr=%-5s | %-46s %s" %
              (r.get("score"), r.get("tables"), r.get("src_caps"),
               str(r.get("ocr")), r["paper"], r.get("warn") or ""), flush=True)
    scores = [r["score"] for r in rows if isinstance(r.get("score"), int)]
    print("\nN=%d  mean_score=%.1f  min=%s  total_time=%.0fs" %
          (len(rows), (sum(scores) / max(len(scores), 1)),
           (min(scores) if scores else "NA"), time.time() - t_all), flush=True)
    low = [r["paper"] for r in rows if isinstance(r.get("score"), int) and r["score"] < 85]
    if low:
        print("NEEDS REVIEW (<85): " + ", ".join(low), flush=True)

def _row(rep):
    qa = rep.get("qa", {})
    return {"status": rep.get("status"), "engine": rep.get("engine"),
            "ocr": rep.get("ocr_used"), "pages": rep.get("pages"),
            "tables": qa.get("n_markdown_tables"), "src_caps": qa.get("source_table_captions"),
            "cov": qa.get("table_coverage"), "score": qa.get("score"),
            "warn": qa.get("warnings", [])}

if __name__ == "__main__":
    main()
