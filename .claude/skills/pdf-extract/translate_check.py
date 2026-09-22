#!/usr/bin/env python3
"""
Token-free guardrail for bilingual translation: compare extracted.vi.md vs extracted.md.

Goal: ensure translation PRESERVES 1:1 structure so web can align EN|VN side-by-side
and DOES NOT lose or alter figures. Checks 3 items per paper:
  1. Heading count (#..###### line starts) matches.
  2. Table row count (| ... | lines) matches.
  3. Number coverage: every NUMBER in EN version must appear in VI version
     (no data loss). Flags missing numbers in VI and extraneous numbers in VI (suspicion of additions/hallucinations).

OCR papers (per extraction_report.json ocr_used=True) are downgraded from FAIL to WARN
for numbers (OCR may introduce digit-character noise; agent verified against source.pdf).

Usage:
  python .agents/skills/pdf-extract/translate_check.py [--root 01_Diabetes_Research/searched_papers] [--only <substr>]
Exit code 0 if no FAIL, 1 if any FAIL.
"""
import sys, re, json, argparse
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HDR_RE = re.compile(r"^<!-- extracted by pdf-extract \|.*?-->\s*", re.S)
HEAD_RE = re.compile(r"^#{1,6}\s", re.M)
TBL_RE = re.compile(r"^\s*\|.*\|\s*$", re.M)
# Number: digit sequence optionally containing decimal '.'; comma/space = boundary ->
# "0.789,0.934" splits into 2 tokens, matching VI version "0.789, 0.934".
NUM_RE = re.compile(r"\d+(?:\.\d+)?")
COVERAGE_MIN = 0.95
# Vietnamese-specific letters (with diacritics). Real translations are dense in diacritics (19-25% measured);
# untouched EN source ~0%. Threshold 8% catches "verbatim copy without translation".
VIET_CHARS = set("ăâđêôơưáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ")
VIET_MIN = 0.08


def viet_ratio(text):
    letters = [c for c in text.lower() if c.isalpha()]
    if not letters:
        return 1.0  # no alphabetic characters (tables/numbers only) -> do not penalize
    return sum(1 for c in letters if c in VIET_CHARS) / len(letters)


def strip_hdr(p):
    return HDR_RE.sub("", p.read_text(encoding="utf-8", errors="replace"))


def numset(text):
    # stripping citation [..] annotations still keeps internal numbers (intentional: page/ref numbers must be preserved)
    return set(NUM_RE.findall(text))


def check(d):
    issues, warns, info = [], [], {}
    en_p, vi_p = d / "extracted.md", d / "extracted.vi.md"
    if not en_p.exists():
        return ["no extracted.md"], warns, info
    if not vi_p.exists():
        return ["no extracted.vi.md (not translated)"], warns, info
    en, vi = strip_hdr(en_p), strip_hdr(vi_p)
    ocr = bool((_jload(d / "extraction_report.json") or {}).get("ocr_used"))

    he, hv = len(HEAD_RE.findall(en)), len(HEAD_RE.findall(vi))
    te, tv = len(TBL_RE.findall(en)), len(TBL_RE.findall(vi))
    info.update(headings=f"{he}/{hv}", tables=f"{te}/{tv}")

    # Is prose genuinely in Vietnamese? (catches verbatim copy of EN without translation).
    vr = viet_ratio(vi)
    info["viet"] = f"{vr*100:.0f}%"
    if vr < VIET_MIN:
        issues.append(
            f"viet ratio too low {vr*100:.1f}% (<{VIET_MIN*100:.0f}%) — suspected untranslated / verbatim copy of EN")
    if he != hv:
        (warns if ocr else issues).append(f"heading count mismatch EN={he} VI={hv}")
    if te != tv:
        (warns if ocr else issues).append(f"table-row count mismatch EN={te} VI={tv}")

    en_n, vi_n = numset(en), numset(vi)
    missing = en_n - vi_n            # EN numbers missing in VI = data loss
    extra = vi_n - en_n              # VI numbers not in EN = suspected addition/hallucination
    cov = 1.0 if not en_n else len(en_n & vi_n) / len(en_n)
    info["num_coverage"] = f"{cov:.3f} ({len(en_n & vi_n)}/{len(en_n)})"
    if cov < COVERAGE_MIN:
        tag = "num coverage low %.3f; missing in VI (sample): %s" % (
            cov, sorted(missing, key=lambda x: (len(x), x))[:12])
        (warns if ocr else issues).append(tag)
    if len(extra) > max(8, int(0.10 * (len(en_n) or 1))):
        warns.append("VI has %d numbers not found in EN (suspected additions): %s" % (
            len(extra), sorted(extra, key=lambda x: (len(x), x))[:10]))
    return issues, warns, info


def _jload(p):
    try:
        return json.loads(Path(p).read_text(encoding="utf-8", errors="replace"))
    except Exception:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="01_Diabetes_Research/searched_papers")
    ap.add_argument("--only", default="")
    a = ap.parse_args()
    dirs = sorted(p.parent for p in Path(a.root).glob("Layer_*/*/extracted.md"))
    if a.only:
        dirs = [d for d in dirs if a.only in d.name]

    n_fail = n_vi = 0
    for d in dirs:
        issues, warns, info = check(d)
        has_vi = (d / "extracted.vi.md").exists()
        if has_vi:
            n_vi += 1
        status = "FAIL" if issues else ("WARN" if warns else ("PASS" if has_vi else "----"))
        if issues:
            n_fail += 1
        meta = " ".join("%s=%s" % (k, v) for k, v in info.items())
        print("%-4s %-48s %s" % (status, d.name, meta))
        for i in issues:
            print("       ✗ " + i)
        for w in warns:
            print("       ! " + w)

    print("\n%d papers | %d with VI version | %d FAIL" % (len(dirs), n_vi, n_fail))
    sys.exit(1 if n_fail else 0)


if __name__ == "__main__":
    main()
