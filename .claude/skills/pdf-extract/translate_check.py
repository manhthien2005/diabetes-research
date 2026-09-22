#!/usr/bin/env python3
"""
Token-free guardrail cho bản dịch song ngữ: so extracted.vi.md vs extracted.md.

Mục tiêu: bảo đảm bản dịch GIỮ NGUYÊN cấu trúc để web canh mục EN|VN 1:1 và
KHÔNG mất/sai số liệu. Kiểm 3 thứ mỗi bài:
  1. Số heading (dòng bắt đầu #..######) khớp nhau.
  2. Số hàng bảng (dòng dạng | ... |) khớp nhau.
  3. Phủ số (number coverage): mọi CON SỐ trong bản EN phải xuất hiện ở bản VI
     (không mất dữ liệu). Báo số bị thiếu ở VI và số "dư" ở VI (nghi thêm/bịa).

Bài OCR (theo extraction_report.json ocr_used=True) được hạ FAIL->WARN ở phần
số (OCR có thể nhiễu chữ-số; agent đã đối chiếu source.pdf).

Dùng:
  python .claude/skills/pdf-extract/translate_check.py [--root 01_Diabetes_Research/searched_papers] [--only <substr>]
Exit 0 nếu không có FAIL, 1 nếu có.
"""
import sys, re, json, argparse
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HDR_RE = re.compile(r"^<!-- extracted by pdf-extract \|.*?-->\s*", re.S)
HEAD_RE = re.compile(r"^#{1,6}\s", re.M)
TBL_RE = re.compile(r"^\s*\|.*\|\s*$", re.M)
# Số: chuỗi chữ số có thể kèm '.' thập phân; dấu phẩy/space = ranh giới ->
# "0.789,0.934" tách 2 token, khớp với bản VI "0.789, 0.934".
NUM_RE = re.compile(r"\d+(?:\.\d+)?")
COVERAGE_MIN = 0.95
# Chữ cái riêng của tiếng Việt (có dấu). Bản dịch thật đặc dấu (đo được 19-25%);
# bản EN nguyên si ~0%. Ngưỡng 8% bắt lỗi "copy nguyên văn không dịch".
VIET_CHARS = set("ăâđêôơưáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ")
VIET_MIN = 0.08


def viet_ratio(text):
    letters = [c for c in text.lower() if c.isalpha()]
    if not letters:
        return 1.0  # không có chữ (toàn bảng/số) -> không phạt
    return sum(1 for c in letters if c in VIET_CHARS) / len(letters)


def strip_hdr(p):
    return HDR_RE.sub("", p.read_text(encoding="utf-8", errors="replace"))


def numset(text):
    # bỏ chú thích citation [..] sẽ vẫn giữ số bên trong (cố ý: số trang/ref cũng phải giữ)
    return set(NUM_RE.findall(text))


def check(d):
    issues, warns, info = [], [], {}
    en_p, vi_p = d / "extracted.md", d / "extracted.vi.md"
    if not en_p.exists():
        return ["no extracted.md"], warns, info
    if not vi_p.exists():
        return ["no extracted.vi.md (chưa dịch)"], warns, info
    en, vi = strip_hdr(en_p), strip_hdr(vi_p)
    ocr = bool((_jload(d / "extraction_report.json") or {}).get("ocr_used"))

    he, hv = len(HEAD_RE.findall(en)), len(HEAD_RE.findall(vi))
    te, tv = len(TBL_RE.findall(en)), len(TBL_RE.findall(vi))
    info.update(headings=f"{he}/{hv}", tables=f"{te}/{tv}")

    # Văn xuôi có thật sự là tiếng Việt? (bắt lỗi copy nguyên văn EN, không dịch).
    vr = viet_ratio(vi)
    info["viet"] = f"{vr*100:.0f}%"
    if vr < VIET_MIN:
        issues.append(
            f"viet ratio quá thấp {vr*100:.1f}% (<{VIET_MIN*100:.0f}%) — nghi CHƯA dịch / copy nguyên văn EN")
    if he != hv:
        (warns if ocr else issues).append(f"heading count lệch EN={he} VI={hv}")
    if te != tv:
        (warns if ocr else issues).append(f"table-row count lệch EN={te} VI={tv}")

    en_n, vi_n = numset(en), numset(vi)
    missing = en_n - vi_n            # số EN biến mất ở VI = mất dữ liệu
    extra = vi_n - en_n              # số VI không có ở EN = nghi thêm/bịa
    cov = 1.0 if not en_n else len(en_n & vi_n) / len(en_n)
    info["num_coverage"] = f"{cov:.3f} ({len(en_n & vi_n)}/{len(en_n)})"
    if cov < COVERAGE_MIN:
        tag = "num coverage thấp %.3f; thiếu ở VI(mẫu): %s" % (
            cov, sorted(missing, key=lambda x: (len(x), x))[:12])
        (warns if ocr else issues).append(tag)
    if len(extra) > max(8, int(0.10 * (len(en_n) or 1))):
        warns.append("VI có %d số không thấy ở EN (nghi thêm): %s" % (
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

    print("\n%d papers | %d có bản VI | %d FAIL" % (len(dirs), n_vi, n_fail))
    sys.exit(1 if n_fail else 0)


if __name__ == "__main__":
    main()
