#!/usr/bin/env python3
"""
Verify re-generated analyses WITHOUT spending API tokens.

For every searched_papers/Layer_*/<id>/ this checks:
  1. analysis.html exists and is self-contained (no external <img src="http>, no CDN <link>/<script src>)
  2. summary.json exists with all 15 required keys (non-empty)
  3. metadata.json has analysis_status == "analyzed" and a valid prediction_horizon
  4. anti-fabrication: the numbers quoted in summary.json["best_metric"] actually
     appear in extracted.md (catches hallucinated headline metrics). OCR papers are
     reported but not failed (OCR may perturb digits slightly).

Usage:
  python .claude/skills/paper-analyzer/verify_analyses.py [--only <substr>]
Exit code 0 if all PASS, 1 if any FAIL.
"""
import sys, json, re, argparse
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REQUIRED_SUMMARY_KEYS = [
    "paper_id", "layer", "prediction_horizon", "contribution", "method",
    "best_metric", "datasets", "has_code", "code_url", "reproducible",
    "vs_baseline", "gap", "verdict", "verdict_reason", "analyzed_at",
]
VALID_HORIZON = {"cross_sectional", "early_detection", "long_term_risk"}
HDR_RE = re.compile(r"^<!-- extracted by pdf-extract \|.*?-->\s*", re.S)
# Anti-fabrication targets only METRIC-LIKE numbers: decimals (0.950, 97.11) and
# integer-percents (88%). A fabricated headline metric is always one of these.
# Bare integers (sample sizes 768, table/figure refs "Table 8", "Fig 6-8",
# feature counts) are descriptive and frequently reformatted/inferred -> they
# caused false positives, so they are intentionally NOT checked.
NUM_RE = re.compile(r"\d[\d,]*\.\d+|\d{1,3}%")


def jload(p):
    try:
        return json.loads(Path(p).read_text(encoding="utf-8", errors="replace"))
    except Exception:
        return None


def norm_nums(text):
    return {n.replace(",", "").rstrip("%") for n in NUM_RE.findall(text)}


# A headline-metric number is never a sample size. Strip count phrases first so
# magnitudes ("~1.5M mẫu") and Euro-formatted counts ("2.009 mẫu", "n=368") are
# not mistaken for fabricated metrics. (yang2021 1.5M, fazakis2021 2009 samples.)
COUNT_CTX = re.compile(
    r"~?\s*\d[\d,\.]*\s*"
    r"(?:M\b|million|triệu|k\b|nghìn|mẫu|mau|samples?|records?|"
    r"bệnh\s*nhân|patients?|rows?)",
    re.I,
)
NEQ = re.compile(r"n\s*=\s*\d[\d,\.]*", re.I)


def strip_counts(text):
    return NEQ.sub(" ", COUNT_CTX.sub(" ", text))


def check(d):
    issues, warns = [], []
    md = d / "extracted.md"
    body = ""
    if md.exists():
        body = HDR_RE.sub("", md.read_text(encoding="utf-8", errors="replace"))
    else:
        issues.append("no extracted.md")

    # 1. analysis.html
    ah = d / "analysis.html"
    if not ah.exists():
        issues.append("no analysis.html")
    else:
        h = ah.read_text(encoding="utf-8", errors="replace")
        if re.search(r'<img[^>]+src=["\']https?://', h):
            issues.append("analysis.html has external <img> (not self-contained)")
        if re.search(r'<(?:link|script)[^>]+(?:href|src)=["\']https?://', h):
            issues.append("analysis.html loads external CDN asset")
        if len(h) < 3000:
            warns.append("analysis.html suspiciously small (<3KB)")

    # 2. summary.json 15 keys
    s = jload(d / "summary.json")
    best_metric = ""
    ocr = bool((jload(d / "extraction_report.json") or {}).get("ocr_used"))
    if s is None:
        issues.append("no/invalid summary.json")
    else:
        missing = [k for k in REQUIRED_SUMMARY_KEYS if k not in s]
        if missing:
            issues.append("summary.json missing keys: " + ",".join(missing))
        empty = [k for k in REQUIRED_SUMMARY_KEYS
                 if k in s and (s[k] is None or s[k] == "" or s[k] == [])
                 and k not in ("code_url", "has_code")]
        if empty:
            warns.append("summary.json empty fields: " + ",".join(empty))
        if s.get("prediction_horizon") not in VALID_HORIZON:
            issues.append("summary.json prediction_horizon invalid: %r" % s.get("prediction_horizon"))
        best_metric = str(s.get("best_metric", "") or "")

    # 3. metadata.json
    m = jload(d / "metadata.json")
    if m is None:
        issues.append("no/invalid metadata.json")
    else:
        if m.get("analysis_status") != "analyzed":
            issues.append("metadata analysis_status != analyzed (%r)" % m.get("analysis_status"))
        if m.get("prediction_horizon") not in VALID_HORIZON:
            warns.append("metadata prediction_horizon invalid/missing")

    # 4. anti-fabrication on best_metric numbers
    if best_metric and body:
        nums = list(norm_nums(strip_counts(best_metric)))  # metric-like, counts stripped
        src = norm_nums(body)
        missing_nums = [n for n in nums if n not in src]
        if missing_nums:
            tag = "best_metric numbers not in extracted.md: %s" % missing_nums
            if ocr:
                warns.append(tag + " (OCR — verify vs source.pdf)")
            else:
                issues.append(tag)

    return issues, warns


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="01_Diabetes_Research/searched_papers")
    ap.add_argument("--only", default="")
    a = ap.parse_args()
    dirs = sorted(p.parent for p in Path(a.root).glob("Layer_*/*/extracted.md"))
    if a.only:
        dirs = [d for d in dirs if a.only in d.name]

    n_fail = 0
    for d in dirs:
        issues, warns = check(d)
        status = "FAIL" if issues else ("WARN" if warns else "PASS")
        if issues:
            n_fail += 1
        print("%-4s %s" % (status, d.name))
        for i in issues:
            print("       ✗ " + i)
        for w in warns:
            print("       ! " + w)

    print("\n%d papers | %d FAIL" % (len(dirs), n_fail))
    sys.exit(1 if n_fail else 0)


if __name__ == "__main__":
    main()
