"""
build_nhanes.py — Dựng bảng phân tích NHANES cho bài toán:
    "Sàng lọc đái tháo đường CHƯA ĐƯỢC CHẨN ĐOÁN bằng biến KHÔNG-XÉT-NGHIỆM (no-lab)"

Xem TO_DO.md §4.2 để biết vì sao chọn đúng những biến này.

CHẠY:
    python src/build_nhanes.py                 # mặc định chu kỳ 2017-2018
    python src/build_nhanes.py --cycles 2013 2015 2017
    python src/build_nhanes.py --out data/nhanes.parquet

KẾT QUẢ: in ra prevalence + lưu 1 file bảng sạch. Không train model gì cả.
Mục tiêu của file này CHỈ là: anh thấy được con số thật, và tin rằng dữ liệu đã đúng.

--------------------------------------------------------------------------------
GHI CHÚ QUAN TRỌNG (đã kiểm chứng ngày 2026-07-26 — đừng bỏ qua):

1. URL của CDC ĐÃ ĐỔI. Pattern cũ mà hầu hết tutorial/paper còn dùng:
       https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/DEMO_J.XPT
   nay trả về HTTP 200 kèm một trang HTML "Page Not Found" (~20 KB).
   => Script nào không kiểm tra nội dung sẽ HỎNG ÂM THẦM, không báo lỗi.
   Pattern ĐÚNG hiện tại:
       https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/{startyear}/DataFiles/{FILE}.xpt
   Hàm _download() bên dưới có kiểm tra magic-bytes để chặn đúng cái bẫy này.

2. OGTT (nghiệm pháp dung nạp glucose) ĐÃ BỊ NGỪNG sau chu kỳ 2015-2016.
   OGTT_J (2017-2018) = 404. Nên với chu kỳ >= 2017, nhãn chỉ dựa HbA1c + FPG.
   => Phải khai báo điều này trong phần Methods của bài báo, và đây là một
      hạn chế thật (định nghĩa nhãn không đồng nhất giữa các chu kỳ).

3. Đây MỚI LÀ BƯỚC DỰNG DỮ LIỆU. Chưa có chia train/test, chưa có model.
   Mọi thao tác impute / scale / feature-select PHẢI nằm trong sklearn Pipeline
   và fit TRONG TỪNG FOLD ở bước sau (TO_DO.md §5 Phase 2). Đừng impute ở đây.
--------------------------------------------------------------------------------
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import pandas as pd

BASE = "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/{year}/DataFiles/{fname}.xpt"

# Hậu tố file theo chu kỳ NHANES (năm bắt đầu -> chữ cái)
CYCLE_SUFFIX = {
    2005: "D", 2007: "E", 2009: "F", 2011: "G",
    2013: "H", 2015: "I", 2017: "J",
}

# Các file cần tải và cột lấy từ mỗi file.
# (tên file không hậu tố, danh sách cột, bắt buộc hay không)
COMPONENTS = [
    ("DEMO", ["SEQN", "RIDAGEYR", "RIAGENDR", "RIDRETH3", "INDFMPIR",
              "RIDSTATR", "RIDEXPRG", "WTMEC2YR", "SDMVPSU", "SDMVSTRA"], True),
    ("DIQ",  ["SEQN", "DIQ010", "DIQ160"], True),
    ("GHB",  ["SEQN", "LBXGH"], True),                       # HbA1c (%)
    ("GLU",  ["SEQN", "LBXGLU", "WTSAF2YR"], True),          # glucose đói (mg/dL)
    ("OGTT", ["SEQN", "LBXGLT"], False),                     # OGTT 2h — chỉ <= 2015
    ("BMX",  ["SEQN", "BMXBMI", "BMXWAIST", "BMXHT", "BMXWT"], True),
    # BPXPLS = mạch 60 giây. Có trong 2017-2018 (đã kiểm chứng) -> harmonize được
    # đúng bộ feature "resting heart rate" của sgchoi2023 (KNHANES). Xem CHEATSHEET.md §2.
    ("BPX",  ["SEQN", "BPXSY1", "BPXSY2", "BPXSY3",
              "BPXDI1", "BPXDI2", "BPXDI3", "BPXPLS"], False),
    ("BPQ",  ["SEQN", "BPQ020"], True),                      # từng được chẩn tăng HA
    ("MCQ",  ["SEQN", "MCQ300C"], True),                     # người thân ruột bị ĐTĐ
    ("SMQ",  ["SEQN", "SMQ020", "SMQ040"], True),
    ("PAQ",  ["SEQN", "PAQ605", "PAQ620", "PAQ650", "PAQ665"], False),
]

XPORT_MAGIC = b"HEADER RECORD"


def _download(year: int, fname: str, cache_dir: Path) -> Path | None:
    """Tải 1 file .xpt, có cache. Trả None nếu file không tồn tại cho chu kỳ này."""
    import urllib.error
    import urllib.request

    suffix = CYCLE_SUFFIX[year]
    remote_name = f"{fname}_{suffix}"
    url = BASE.format(year=year, fname=remote_name)
    dest = cache_dir / f"{remote_name}.xpt"

    if dest.exists() and dest.stat().st_size > 0:
        return dest

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=120) as r:
            blob = r.read()
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise

    # BẪY: CDC trả HTTP 200 + trang HTML khi sai URL. Phải kiểm nội dung.
    if not blob.startswith(XPORT_MAGIC):
        head = blob[:120].decode("utf-8", "replace")
        raise RuntimeError(
            f"{remote_name}: máy chủ trả về nội dung KHÔNG PHẢI file XPORT "
            f"(có thể là trang HTML lỗi). 120 byte đầu: {head!r}"
        )

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(blob)
    return dest


def _read(path: Path, cols: list[str]) -> pd.DataFrame:
    df = pd.read_sas(path, format="xport")
    df.columns = [c.strip() for c in df.columns]
    keep = [c for c in cols if c in df.columns]
    missing = sorted(set(cols) - set(keep))
    if missing:
        print(f"    ! thiếu cột {missing} trong {path.name}", file=sys.stderr)
    return df[keep].copy()


def load_cycle(year: int, cache_dir: Path) -> pd.DataFrame:
    print(f"\n[chu kỳ {year}-{year + 1}]")
    out: pd.DataFrame | None = None
    for fname, cols, required in COMPONENTS:
        path = _download(year, fname, cache_dir)
        if path is None:
            msg = f"    - {fname}: KHÔNG CÓ cho chu kỳ này"
            if required:
                raise RuntimeError(f"{msg} (nhưng là file bắt buộc)")
            print(msg + " (bỏ qua — không bắt buộc)")
            continue
        part = _read(path, cols)
        print(f"    - {fname}: {len(part):>6,} dòng, {part.shape[1]} cột")
        out = part if out is None else out.merge(part, on="SEQN", how="left")

    assert out is not None
    out["cycle"] = f"{year}-{year + 1}"
    out["cycle_start"] = year
    return out


# ------------------------------------------------------------------ nhãn & feature

def build_label(df: pd.DataFrame) -> pd.DataFrame:
    """
    Nhãn = ĐTĐ CHƯA ĐƯỢC CHẨN ĐOÁN (undiagnosed diabetes).

    Tiêu chí ADA áp lên người TỰ KHAI CHƯA từng được bác sĩ chẩn đoán:
        HbA1c >= 6.5%  HOẶC  glucose đói >= 126 mg/dL  HOẶC  OGTT 2h >= 200 mg/dL

    ĐIỂM MẤU CHỐT của cả đề tài (TO_DO.md §2.2-1):
    ba biến định nghĩa nhãn ở trên TUYỆT ĐỐI KHÔNG được nằm trong feature.
    Hàm build_features() bên dưới không đụng tới chúng — đó là lý do
    thiết kế này leakage-safe theo CẤU TRÚC, không phải theo nỗ lực.
    """
    d = df.copy()

    # DIQ010: 1=Có, 2=Không, 3=Ranh giới, 7=Từ chối, 9=Không biết
    diagnosed = d["DIQ010"].eq(1)

    a1c = d.get("LBXGH")
    fpg = d.get("LBXGLU")
    ogtt = d.get("LBXGLT") if "LBXGLT" in d.columns else pd.Series(np.nan, index=d.index)

    hit_a1c = a1c.ge(6.5)
    hit_fpg = fpg.ge(126.0)
    hit_ogtt = ogtt.ge(200.0)

    has_any_test = a1c.notna() | fpg.notna() | ogtt.notna()
    meets = hit_a1c.fillna(False) | hit_fpg.fillna(False) | hit_ogtt.fillna(False)

    d["diagnosed_dm"] = diagnosed
    d["has_any_test"] = has_any_test
    d["n_criteria_met"] = (
        hit_a1c.fillna(False).astype(int)
        + hit_fpg.fillna(False).astype(int)
        + hit_ogtt.fillna(False).astype(int)
    )
    d["y_undiagnosed_dm"] = np.where(diagnosed, np.nan, meets.astype(float))
    return d


def apply_eligibility(df: pd.DataFrame) -> tuple[pd.DataFrame, list[tuple[str, int]]]:
    """Áp tiêu chí chọn mẫu. Trả (bảng sạch, log từng bước) — log này chính là Fig 1."""
    steps: list[tuple[str, int]] = [("Tổng người tham gia NHANES", len(df))]
    d = df

    d = d[d["RIDSTATR"].eq(2)]
    steps.append(("Có đến trung tâm khám (MEC examined)", len(d)))

    d = d[d["RIDAGEYR"].ge(20)]
    steps.append(("Từ 20 tuổi trở lên", len(d)))

    if "RIDEXPRG" in d.columns:
        d = d[~d["RIDEXPRG"].eq(1)]
        steps.append(("Loại phụ nữ đang mang thai", len(d)))

    d = d[~d["diagnosed_dm"]]
    steps.append(("Loại người ĐÃ được chẩn đoán ĐTĐ", len(d)))

    d = d[d["has_any_test"]]
    steps.append(("Có ít nhất 1 xét nghiệm để xác định nhãn", len(d)))

    return d.copy(), steps


# Feature KHÔNG-XÉT-NGHIỆM. Không có HbA1c / glucose / OGTT — có chủ ý.
NOLAB_FEATURES = [
    "RIDAGEYR",   # tuổi
    "RIAGENDR",   # giới
    "RIDRETH3",   # chủng tộc/dân tộc
    "INDFMPIR",   # tỉ lệ thu nhập gia đình / ngưỡng nghèo
    "BMXBMI",     # BMI
    "BMXWAIST",   # vòng eo
    "BMXHT",      # chiều cao
    "BMXWT",      # cân nặng
    "sbp",        # huyết áp tâm thu (trung bình các lần đo)
    "dbp",        # huyết áp tâm trương
    "BPXPLS",     # mạch/nhịp tim nghỉ — để so trực tiếp với sgchoi2023
    "BPQ020",     # từng được nói bị tăng huyết áp
    "MCQ300C",    # người thân ruột bị ĐTĐ
    "SMQ020",     # từng hút >=100 điếu
    "smoke_now",  # hiện có hút
    "pa_vigorous",
    "pa_moderate",
]


def build_features(df: pd.DataFrame) -> pd.DataFrame:
    d = df.copy()

    sy = [c for c in ["BPXSY1", "BPXSY2", "BPXSY3"] if c in d.columns]
    di = [c for c in ["BPXDI1", "BPXDI2", "BPXDI3"] if c in d.columns]
    d["sbp"] = d[sy].replace(0, np.nan).mean(axis=1) if sy else np.nan
    d["dbp"] = d[di].replace(0, np.nan).mean(axis=1) if di else np.nan

    # SMQ040: 1=hằng ngày, 2=thỉnh thoảng, 3=không hút nữa. CHỈ hỏi người đã SMQ020=1.
    # => NaN ở SMQ040 KHÔNG phải "thiếu" nếu người đó chưa từng hút (SMQ020=2): đó là 0 thật.
    #    Nhưng NaN khi SMQ020 cũng NaN thì mới là thiếu thật. Phân biệt hai ca này.
    if "SMQ040" in d.columns:
        now = d["SMQ040"].where(d["SMQ040"].isin([1, 2, 3]))  # bỏ mã 7/9
        smoke = now.isin([1, 2]).astype(float).where(now.notna())
        never = d["SMQ020"].eq(2) if "SMQ020" in d.columns else pd.Series(False, index=d.index)
        d["smoke_now"] = smoke.mask(never, 0.0)
    else:
        d["smoke_now"] = np.nan

    # PAQ605/PAQ650 vận động mạnh (việc/giải trí); PAQ620/PAQ665 vận động vừa. 1=Có, 2=Không.
    # CẨN THẬN: .eq(1).any() biến NaN thành False -> mất dấu vết dữ liệu thiếu.
    # Chỉ kết luận "Không" khi có ÍT NHẤT một câu trả lời hợp lệ.
    def _yes(cols):
        cols = [c for c in cols if c in d.columns]
        if not cols:
            return pd.Series(np.nan, index=d.index)
        block = d[cols].where(d[cols].isin([1, 2]))       # loại mã 7/9
        answered = block.notna().any(axis=1)
        return block.eq(1).any(axis=1).astype(float).where(answered)

    d["pa_vigorous"] = _yes(["PAQ605", "PAQ650"])
    d["pa_moderate"] = _yes(["PAQ620", "PAQ665"])

    # Mã "từ chối trả lời"(7) và "không biết"(9) là THIẾU, không phải giá trị.
    for c in ["BPQ020", "MCQ300C", "SMQ020"]:
        if c in d.columns:
            d[c] = d[c].replace({7: np.nan, 9: np.nan})
            d[c] = d[c].map({1: 1.0, 2: 0.0})

    feats = [c for c in NOLAB_FEATURES if c in d.columns]
    keep = (["SEQN", "cycle", "cycle_start", "y_undiagnosed_dm", "n_criteria_met"]
            + feats + ["WTMEC2YR", "WTSAF2YR", "SDMVPSU", "SDMVSTRA"])
    return d[[c for c in keep if c in d.columns]].copy()


# ------------------------------------------------------------------ báo cáo

def report(d: pd.DataFrame, steps: list[tuple[str, int]], n_cycles: int) -> None:
    line = "=" * 74
    print(f"\n{line}\nFIG 1 — SƠ ĐỒ CHỌN MẪU (dán thẳng vào bài báo)\n{line}")
    prev = None
    for label, n in steps:
        drop = "" if prev is None else f"   (loại {prev - n:,})"
        print(f"  {label:<48} {n:>7,}{drop}")
        prev = n

    y = d["y_undiagnosed_dm"]
    n, k = len(y), int(y.sum())
    print(f"\n{line}\nNHÃN\n{line}")
    print(f"  Cỡ mẫu phân tích                    {n:>7,}")
    print(f"  ĐTĐ chưa được chẩn đoán             {k:>7,}")
    print(f"  Prevalence THÔ (không trọng số)     {k / n * 100:>7.2f} %")

    # Ước lượng có trọng số khảo sát — đây là con số ĐÚNG cho dân số Mỹ.
    # Ghép nhiều chu kỳ thì chia trọng số cho số chu kỳ (hướng dẫn chính thức của NCHS).
    w = d["WTMEC2YR"] / n_cycles
    m = w.notna() & y.notna()
    wp = float(np.average(y[m], weights=w[m])) * 100
    print(f"  Prevalence CÓ TRỌNG SỐ khảo sát     {wp:>7.2f} %   <- con số đúng cho dân số Mỹ")
    print(f"  Chênh lệch                          {wp - k / n * 100:>+7.2f} điểm %")

    print(f"\n{line}\nĐỘ PHỦ FEATURE (tỉ lệ thiếu — quyết định chiến lược impute sau này)\n{line}")
    feats = [c for c in NOLAB_FEATURES if c in d.columns]
    for c in sorted(feats, key=lambda x: d[x].isna().mean(), reverse=True):
        miss = d[c].isna().mean() * 100
        flag = "  <-- thiếu nhiều, cân nhắc bỏ" if miss > 30 else ""
        print(f"  {c:<14} thiếu {miss:>5.1f} %{flag}")

    print(f"\n{line}\nKIỂM TRA CHỐNG RÒ RỈ (bắt buộc, TO_DO.md C1)\n{line}")
    banned = {"LBXGH", "LBXGLU", "LBXGLT", "DIQ010", "DIQ160"}
    leaked = banned & set(d.columns)
    if leaked:
        print(f"  ✗ THẤT BẠI — biến định nghĩa nhãn còn trong bảng: {sorted(leaked)}")
    else:
        print("  ✓ ĐẠT — không biến định-nghĩa-nhãn nào (HbA1c/glucose/OGTT/DIQ) nằm trong feature.")
        print("    Đây là điều làm đề tài này leakage-safe theo CẤU TRÚC.")
    print(line)


def main() -> int:
    # Console Windows mặc định là cp1252, không in được tiếng Việt -> ép UTF-8.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--cycles", type=int, nargs="+", default=[2017],
                    choices=sorted(CYCLE_SUFFIX), help="năm BẮT ĐẦU của chu kỳ")
    ap.add_argument("--cache", type=Path, default=Path("data/raw"))
    ap.add_argument("--out", type=Path, default=Path("data/nhanes_nolab.csv"))
    args = ap.parse_args()

    args.cache.mkdir(parents=True, exist_ok=True)

    frames = []
    for year in args.cycles:
        raw = load_cycle(year, args.cache)
        raw = build_label(raw)
        clean, steps = apply_eligibility(raw)
        frames.append((build_features(clean), steps))

    data = pd.concat([f for f, _ in frames], ignore_index=True)

    if len(frames) == 1:
        steps = frames[0][1]
    else:
        steps = [(lab, sum(s[i][1] for s in [x[1] for x in frames]))
                 for i, (lab, _) in enumerate(frames[0][1])]

    report(data, steps, n_cycles=len(args.cycles))

    args.out.parent.mkdir(parents=True, exist_ok=True)
    data.to_csv(args.out, index=False)
    print(f"\n→ Đã lưu {len(data):,} dòng × {data.shape[1]} cột vào {args.out}")
    print("→ Bước tiếp theo: TO_DO.md §5 Phase 2 (baseline FINDRISC/ADA trước, model sau)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
