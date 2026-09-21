"""
scores.py — Cài đặt hai thang điểm lâm sàng ĐỐI CHỨNG trên NHANES:
    · FINDRISC          (Lindström & Tuomilehto 2003) — 8 mục, 0–26 điểm
    · ADA/CDC Risk Test (Prediabetes Risk Test)        — 7 mục, 0–11 điểm

Đây là ĐỐI THỦ mà mô hình của anh phải so (TO_DO.md claim C5). Không có nó thì
"ML hơn thang điểm lâm sàng bao nhiêu" là câu vô nghĩa.

CHẠY:
    python src/build_nhanes.py          # phải chạy TRƯỚC (sinh data/nhanes_nolab.csv)
    python src/scores.py
    python src/scores.py --mapping-md paper/score_mapping.md

--------------------------------------------------------------------------------
BỐN ĐIỀU PHẢI ĐỌC TRƯỚC KHI DÙNG SỐ TỪ FILE NÀY:

1. HAI THANG ĐIỂM NÀY KHÔNG ĐƯỢC TRAIN.
   Hệ số là hằng số công bố trong bài gốc. Không fit, không tune, không nhìn nhãn.
   Đó chính là lý do chúng là baseline CÔNG BẰNG: chúng không thể overfit tập của anh.
   Nếu có lúc nào anh thấy mình muốn "chỉnh lại điểm cho khớp NHANES" — dừng lại.
   Việc đó biến baseline thành một mô hình đã train, và claim C5 sập.

2. RÒ RỈ: các biến chỉ-dùng-cho-thang-điểm ĐƯỢC TẢI RIÊNG, KHÔNG vào feature.
   FINDRISC mục 7 cần DIQ160 ("từng được nói bị tiền ĐTĐ") — mà build_nhanes.py
   đã CỐ Ý CẤM biến này (nó nằm trong `banned` của kiểm tra chống rò rỉ).
   File này tải DIQ160/BPQ040A/BPQ050A/RHQ162 vào một bảng TÁCH BIỆT, join theo
   SEQN chỉ để tính điểm, và KHÔNG BAO GIỜ ghi chúng vào ma trận feature.
   => Bất biến leakage-safe của đề tài không bị phá.

3. MỤC 7 CỦA FINDRISC TỰ NÓ ĐÃ LÀ MỘT PHÁT HIỆN.
   FINDRISC tự nhận là thang điểm "không cần xét nghiệm", nhưng mục 7 hỏi
   "đã từng được phát hiện đường huyết cao chưa" — tức là nó MƯỢN kết quả của một
   lần xét nghiệm trong quá khứ, và cho mục đó tận 5/26 điểm.
   Nên file này tính SONG SONG hai biến thể:
       findrisc_score        — 8 mục đầy đủ (bản chuẩn, để so công bằng với y văn)
       findrisc_nolab_score  — ép mục 7 = 0 (no-lab thuần)
   Khoảng cách giữa hai cái đó = phần hiệu năng FINDRISC vay mượn từ xét nghiệm cũ.
   Đây là một con số RẺ và MỚI cho phần Discussion. Chưa thấy bài nào trong kho tách ra.

4. KHÔNG CẦN sklearn. AUC tính bằng Mann–Whitney có trọng số (chính xác, kể cả khi
   có điểm trùng). Chạy được ngay cả khi T0.5 (pip install) chưa xong.
--------------------------------------------------------------------------------
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_nhanes import CYCLE_SUFFIX, _download, _read  # noqa: E402

# ---------------------------------------------------------------- biến phụ trợ
# CHỈ để tính thang điểm. TUYỆT ĐỐI không đưa vào NOLAB_FEATURES.
AUX_COMPONENTS = [
    # DIQ160 = "từng được bác sĩ nói bị tiền đái tháo đường / đường huyết cao"
    ("DIQ", ["SEQN", "DIQ160"], True),
    # BPQ040A = từng được BẢO uống thuốc HA; BPQ050A = HIỆN đang uống
    ("BPQ", ["SEQN", "BPQ020", "BPQ040A", "BPQ050A"], True),
    # RHQ162 = trong thai kỳ từng được nói bị ĐTĐ (đái tháo đường thai kỳ)
    ("RHQ", ["SEQN", "RHQ162"], False),
]


def load_aux(cycles: list[int], cache_dir: Path) -> pd.DataFrame:
    """Tải bảng biến-chỉ-dùng-cho-thang-điểm. TÁCH BIỆT khỏi bảng feature."""
    frames = []
    for year in cycles:
        print(f"\n[phụ trợ · chu kỳ {year}-{year + 1}]")
        out: pd.DataFrame | None = None
        for fname, cols, required in AUX_COMPONENTS:
            path = _download(year, fname, cache_dir)
            if path is None:
                msg = f"    - {fname}: KHÔNG CÓ cho chu kỳ này"
                if required:
                    raise RuntimeError(f"{msg} (nhưng bắt buộc để tính thang điểm)")
                print(msg + " (bỏ qua)")
                continue
            part = _read(path, cols)
            print(f"    - {fname}: {len(part):>6,} dòng, {part.shape[1]} cột")
            out = part if out is None else out.merge(part, on="SEQN", how="outer")
        assert out is not None
        out["cycle_start"] = year
        frames.append(out)
    return pd.concat(frames, ignore_index=True)


def _yes_no(s: pd.Series) -> pd.Series:
    """
    Chuẩn hoá biến có/không về 1.0/0.0.

    ⚠️ BẪY ĐÃ DÍNH THẬT (26/07/2026): hàm này nhận CẢ HAI kiểu mã hoá, vì các cột đi
    qua build_nhanes.py đã bị đổi mã sẵn, còn cột tải trực tiếp thì chưa:
        · mã NHANES gốc      : 1=Có, 2=Không, 7=Từ chối, 9=Không biết
        · đã chuẩn hoá sẵn   : 1.0=Có, 0.0=Không   (build_nhanes.build_features)
    Bản đầu chỉ map {1:1, 2:0} nên giá trị 0.0 ("Không") rơi thành NaN → 85% mẫu mất
    điểm, và chỉ người trả lời "Có" mới tính được điểm (FINDRISC min = 5 vì ai cũng
    được +5 tiền sử gia đình). Phải map cả 0.
    """
    return s.map({1: 1.0, 1.0: 1.0, 2: 0.0, 0: 0.0, 0.0: 0.0})


# ---------------------------------------------------------------- FINDRISC
def findrisc(d: pd.DataFrame) -> pd.DataFrame:
    """
    FINDRISC — Lindström J, Tuomilehto J. Diabetes Care 2003;26:725-31. Tổng 0–26.

    Mọi ngưỡng dưới đây là HẰNG SỐ của bài gốc. Không được chỉnh theo dữ liệu.
    """
    o = pd.DataFrame(index=d.index)

    # Mục 1 — Tuổi: <45=0 · 45-54=2 · 55-64=3 · >64=4
    age = d["RIDAGEYR"]
    o["fr1_age"] = np.select(
        [age.lt(45), age.le(54), age.le(64), age.gt(64)], [0, 2, 3, 4], default=np.nan)
    o.loc[age.isna(), "fr1_age"] = np.nan

    # Mục 2 — BMI: <25=0 · 25-30=1 · >30=3
    bmi = d["BMXBMI"]
    o["fr2_bmi"] = np.select([bmi.lt(25), bmi.le(30), bmi.gt(30)], [0, 1, 3], default=np.nan)
    o.loc[bmi.isna(), "fr2_bmi"] = np.nan

    # Mục 3 — Vòng eo, ngưỡng KHÁC NHAU theo giới (RIAGENDR: 1=nam, 2=nữ)
    #   Nam: <94=0 · 94-102=3 · >102=4      Nữ: <80=0 · 80-88=3 · >88=4
    w, male = d["BMXWAIST"], d["RIAGENDR"].eq(1)
    lo = np.where(male, 94.0, 80.0)
    hi = np.where(male, 102.0, 88.0)
    o["fr3_waist"] = np.select([w.lt(lo), w.le(hi), w.gt(hi)], [0, 3, 4], default=np.nan)
    o.loc[w.isna() | d["RIAGENDR"].isna(), "fr3_waist"] = np.nan

    # Mục 4 — Vận động >=30 phút/ngày: Có=0 · Không=2      [XẤP XỈ]
    # NHANES PAQ hỏi có/không vận động mạnh|vừa trong tuần điển hình, KHÔNG hỏi >=30 phút/ngày.
    pa = d[["pa_vigorous", "pa_moderate"]]
    answered = pa.notna().any(axis=1)
    o["fr4_activity"] = np.where(pa.eq(1).any(axis=1), 0.0, 2.0)
    o.loc[~answered, "fr4_activity"] = np.nan

    # Mục 5 — Ăn rau/quả hằng ngày: Có=0 · Không=1         [KHÔNG CÓ TRONG NHANES]
    # Xử lý ở hàm gọi (tham số --veg-policy). Mặc định 0 điểm = giả định ăn hằng ngày.
    o["fr5_veg"] = np.nan

    # Mục 6 — Từng dùng thuốc hạ huyết áp đều đặn: Không=0 · Có=2   [XẤP XỈ]
    # BPQ050A = HIỆN đang uống (gần nhất với "đều đặn"). BPQ020=2 (chưa từng bị nói
    # tăng HA) => chắc chắn Không.
    med = pd.Series(np.nan, index=d.index)
    if "BPQ050A" in d.columns:
        med = _yes_no(d["BPQ050A"])
    if "BPQ040A" in d.columns:
        med = med.fillna(_yes_no(d["BPQ040A"]))
    if "BPQ020" in d.columns:
        med = med.mask(_yes_no(d["BPQ020"]).eq(0) & med.isna(), 0.0)
    o["fr6_bpmed"] = med * 2

    # Mục 7 — Từng được phát hiện đường huyết cao: Không=0 · Có=5
    # ⚠️ Đây là mục MƯỢN kết quả xét nghiệm cũ — xem ghi chú §3 đầu file.
    o["fr7_highglu"] = _yes_no(d["DIQ160"]) * 5 if "DIQ160" in d.columns else np.nan

    # Mục 8 — Tiền sử gia đình: Không=0 · họ hàng xa=3 · cha/mẹ/anh/chị/em/con=5  [XẤP XỈ]
    # MCQ300C chỉ hỏi "người thân ruột thịt" — KHÔNG phân biệt được bậc quan hệ.
    # Chọn 5 (bậc gần) vì MCQ300C của NHANES định nghĩa là cha/mẹ/anh/chị/em ruột.
    o["fr8_family"] = _yes_no(d["MCQ300C"]) * 5 if "MCQ300C" in d.columns else np.nan
    return o


# ---------------------------------------------------------------- ADA / CDC
def ada(d: pd.DataFrame) -> pd.DataFrame:
    """ADA/CDC Prediabetes Risk Test — 7 mục, tổng 0–11. Ngưỡng nguy cơ cao: >= 5."""
    o = pd.DataFrame(index=d.index)

    # Mục 1 — Tuổi: <40=0 · 40-49=1 · 50-59=2 · >=60=3
    age = d["RIDAGEYR"]
    o["ada1_age"] = np.select(
        [age.lt(40), age.lt(50), age.lt(60), age.ge(60)], [0, 1, 2, 3], default=np.nan)
    o.loc[age.isna(), "ada1_age"] = np.nan

    # Mục 2 — Giới: nam=1 · nữ=0
    o["ada2_male"] = d["RIAGENDR"].map({1: 1.0, 2: 0.0})

    # Mục 3 — ĐTĐ thai kỳ (chỉ nữ): Có=1 · Không=0
    if "RHQ162" in d.columns:
        gdm = _yes_no(d["RHQ162"])
        o["ada3_gdm"] = gdm.where(d["RIAGENDR"].eq(2), 0.0).fillna(0.0)
    else:
        o["ada3_gdm"] = np.where(d["RIAGENDR"].eq(1), 0.0, np.nan)

    # Mục 4 — Cha/mẹ hoặc anh/chị/em ruột bị ĐTĐ: Có=1 · Không=0
    o["ada4_family"] = _yes_no(d["MCQ300C"]) if "MCQ300C" in d.columns else np.nan

    # Mục 5 — Từng được chẩn đoán tăng huyết áp: Có=1 · Không=0   [KHỚP CHÍNH XÁC]
    o["ada5_htn"] = _yes_no(d["BPQ020"]) if "BPQ020" in d.columns else np.nan

    # Mục 6 — KHÔNG vận động thể chất: Không vận động=1 · Có=0    [XẤP XỈ]
    pa = d[["pa_vigorous", "pa_moderate"]]
    answered = pa.notna().any(axis=1)
    o["ada6_inactive"] = np.where(pa.eq(1).any(axis=1), 0.0, 1.0)
    o.loc[~answered, "ada6_inactive"] = np.nan

    # Mục 7 — Nhóm cân nặng (bảng chiều cao × cân nặng của ADA, xấp xỉ bằng BMI):
    #          <25=0 · 25-<30=1 · 30-<40=2 · >=40=3
    bmi = d["BMXBMI"]
    o["ada7_weight"] = np.select(
        [bmi.lt(25), bmi.lt(30), bmi.lt(40), bmi.ge(40)], [0, 1, 2, 3], default=np.nan)
    o.loc[bmi.isna(), "ada7_weight"] = np.nan
    return o


# ---------------------------------------------------------------- đánh giá
def auc_weighted(y: np.ndarray, s: np.ndarray, w: np.ndarray | None = None) -> float:
    """
    AUC = xác suất một ca dương được chấm điểm cao hơn một ca âm (xử lý ĐÚNG điểm trùng).

    Dùng dạng Mann–Whitney có trọng số. Thang điểm là số nguyên nên rất nhiều điểm
    trùng nhau — nếu bỏ qua tie sẽ báo AUC cao hơn thực tế.
    """
    m = ~(np.isnan(y) | np.isnan(s))
    if w is None:
        w = np.ones_like(y, dtype=float)
    m &= ~np.isnan(w)
    y, s, w = y[m], s[m], w[m]
    if len(y) == 0 or y.sum() == 0 or (1 - y).sum() == 0:
        return float("nan")

    _, inv = np.unique(s, return_inverse=True)
    wpos = np.bincount(inv, weights=w * y)
    wneg = np.bincount(inv, weights=w * (1 - y))
    below = np.concatenate([[0.0], np.cumsum(wneg)[:-1]])
    return float(np.sum(wpos * (below + 0.5 * wneg)) / (wpos.sum() * wneg.sum()))


def auc_ci(y, s, w=None, n_boot=1000, seed=42):
    """CI 95% bằng bootstrap phân tầng (giữ nguyên số ca dương/âm mỗi lần lấy mẫu)."""
    m = ~(np.isnan(y) | np.isnan(s))
    y, s = y[m], s[m]
    w = np.ones_like(y) if w is None else np.nan_to_num(w[m], nan=0.0)
    rng = np.random.default_rng(seed)
    ip, ineg = np.flatnonzero(y == 1), np.flatnonzero(y == 0)
    out = np.empty(n_boot)
    for b in range(n_boot):
        idx = np.concatenate([rng.choice(ip, ip.size, True), rng.choice(ineg, ineg.size, True)])
        out[b] = auc_weighted(y[idx], s[idx], w[idx])
    return tuple(np.nanpercentile(out, [2.5, 97.5]))


def operating_point(y, s, cutoff, w=None):
    """Sn/Sp/PPV/NPV tại một ngưỡng — TÍNH Ở PREVALENCE THẬT (có trọng số khảo sát)."""
    m = ~(np.isnan(y) | np.isnan(s))
    w = np.ones_like(y, dtype=float) if w is None else w
    m &= ~np.isnan(w)
    y, s, w = y[m], s[m], w[m]
    pred = s >= cutoff
    tp, fn = w[(pred) & (y == 1)].sum(), w[(~pred) & (y == 1)].sum()
    fp, tn = w[(pred) & (y == 0)].sum(), w[(~pred) & (y == 0)].sum()
    d = lambda a, b: a / b if b > 0 else float("nan")  # noqa: E731
    return dict(sn=d(tp, tp + fn), sp=d(tn, tn + fp),
                ppv=d(tp, tp + fp), npv=d(tn, tn + fn),
                flagged=d(tp + fp, tp + fp + tn + fn))


# ---------------------------------------------------------------- bảng ánh xạ
MAPPING = [
    # (thang, mục, biến NHANES, mức khớp, ghi chú)
    ("FINDRISC", "1. Tuổi", "RIDAGEYR", "CHÍNH XÁC", "—"),
    ("FINDRISC", "2. BMI", "BMXBMI", "CHÍNH XÁC", "—"),
    ("FINDRISC", "3. Vòng eo", "BMXWAIST + RIAGENDR", "GẦN ĐÚNG",
     "NHANES đo vòng eo ở mào chậu; FINDRISC đo ngang rốn/dưới sườn. Ngưỡng cm giữ nguyên."),
    ("FINDRISC", "4. Vận động ≥30 phút/ngày", "PAQ605/620/650/665", "XẤP XỈ",
     "NHANES hỏi CÓ/KHÔNG vận động mạnh hoặc vừa trong tuần điển hình, không hỏi thời lượng ≥30 phút/ngày."),
    ("FINDRISC", "5. Ăn rau/quả hằng ngày", "(không có)", "**THIẾU**",
     "NHANES không có mục tần suất rau/quả tương đương. Xử lý theo --veg-policy; PHẢI khai báo trong Methods."),
    ("FINDRISC", "6. Thuốc hạ huyết áp", "BPQ050A → BPQ040A → BPQ020", "XẤP XỈ",
     "BPQ050A = HIỆN đang uống, gần nhất với 'đều đặn'. FINDRISC hỏi 'ĐÃ TỪNG dùng đều đặn' → có thể thấp hơn thực tế."),
    ("FINDRISC", "7. Từng phát hiện đường huyết cao", "DIQ160", "GẦN ĐÚNG",
     "⚠️ Mục này MƯỢN kết quả một lần xét nghiệm trong quá khứ (5/26 điểm). Xem biến thể findrisc_nolab_score."),
    ("FINDRISC", "8. Tiền sử gia đình", "MCQ300C", "XẤP XỈ",
     "MCQ300C không phân biệt bậc quan hệ (3 điểm vs 5 điểm). Đã chọn 5 vì MCQ300C hỏi người thân ruột bậc 1."),
    ("ADA/CDC", "1. Tuổi", "RIDAGEYR", "CHÍNH XÁC", "—"),
    ("ADA/CDC", "2. Giới", "RIAGENDR", "CHÍNH XÁC", "—"),
    ("ADA/CDC", "3. ĐTĐ thai kỳ", "RHQ162", "GẦN ĐÚNG",
     "Chỉ hỏi nữ trong độ tuổi sinh sản; nam gán 0. Chu kỳ thiếu RHQ → mục này = 0 cho mọi người."),
    ("ADA/CDC", "4. Cha/mẹ hoặc anh/chị/em ruột bị ĐTĐ", "MCQ300C", "GẦN ĐÚNG",
     "MCQ300C = 'người thân ruột thịt', hơi rộng hơn 'cha/mẹ hoặc anh/chị/em'."),
    ("ADA/CDC", "5. Từng chẩn đoán tăng huyết áp", "BPQ020", "CHÍNH XÁC", "—"),
    ("ADA/CDC", "6. Không vận động thể chất", "PAQ605/620/650/665", "XẤP XỈ", "Như FINDRISC mục 4."),
    ("ADA/CDC", "7. Nhóm cân nặng", "BMXBMI", "GẦN ĐÚNG",
     "ADA dùng bảng chiều cao × cân nặng; ở đây xấp xỉ bằng dải BMI 25/30/40."),
]


def write_mapping(path: Path) -> None:
    L = ["# Bảng ánh xạ thang điểm lâm sàng → biến NHANES", "",
         "> Sinh tự động bởi `src/scores.py`. Bảng này BẮT BUỘC có trong phần Methods —",
         "> reviewer sẽ hỏi *“bạn tính FINDRISC trên NHANES bằng cách nào?”* (phản biện #5, TO_DO §9).", "",
         "| Thang | Mục | Biến NHANES | Mức khớp | Ghi chú |", "|---|---|---|---|---|"]
    for row in MAPPING:
        L.append("| %s | %s | `%s` | %s | %s |" % row)
    L += ["", "**Quy ước mức khớp:** `CHÍNH XÁC` = biến NHANES đúng nghĩa mục gốc · ",
          "`GẦN ĐÚNG` = cùng khái niệm, khác chi tiết đo/định nghĩa · ",
          "`XẤP XỈ` = phải thay thế bằng biến khác nghĩa gần nhất · `THIẾU` = NHANES không có.", ""]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(L), encoding="utf-8")
    print(f"\n→ Đã ghi bảng ánh xạ vào {path}")


# ---------------------------------------------------------------- báo cáo
def report(d: pd.DataFrame, n_cycles: int, items: pd.DataFrame) -> None:
    line = "=" * 78
    y = d["y_undiagnosed_dm"].to_numpy(float)
    w = (d["WTMEC2YR"] / n_cycles).to_numpy(float)

    specs = [("findrisc_score", "FINDRISC (8 mục, 0–26)", 11),
             ("findrisc_nolab_score", "FINDRISC ép mục 7 = 0 (no-lab thuần)", 11),
             ("ada_score", "ADA/CDC Risk Test (7 mục, 0–11)", 5)]

    # Điểm chỉ tính được khi ĐỦ mọi mục. Bảng này cho biết mục nào đang ăn mất mẫu.
    print(f"\n{line}\nĐỘ PHỦ TỪNG MỤC (mục thiếu nhiều = mục quyết định cỡ mẫu)\n{line}")
    for c in items.columns:
        miss = items[c].isna().mean() * 100
        flag = "  <-- nút thắt" if miss > 5 else ""
        print(f"  {c:<16} thiếu {miss:>5.1f} %{flag}")

    print(f"\n{line}\nPHÂN BỐ ĐIỂM\n{line}")
    for col, name, _ in specs:
        s = d[col]
        print(f"  {name}")
        print(f"    n={s.notna().sum():,}  thiếu={s.isna().mean() * 100:.1f}%  "
              f"min={s.min():.0f}  trung vị={s.median():.0f}  max={s.max():.0f}  "
              f"trung bình={s.mean():.2f}")

    print(f"\n{line}\nAUC — ĐỘ PHÂN BIỆT (thang điểm KHÔNG train)\n{line}")
    print(f"  {'Thang điểm':<40} {'AUC thô':>9} {'AUC có trọng số':>17}  {'CI 95% (thô)':>20}")
    aucs = {}
    for col, name, _ in specs:
        s = d[col].to_numpy(float)
        a_raw = auc_weighted(y, s)
        a_w = auc_weighted(y, s, w)
        lo, hi = auc_ci(y, s)
        aucs[col] = a_raw
        print(f"  {name:<40} {a_raw:>9.3f} {a_w:>17.3f}  {f'[{lo:.3f}, {hi:.3f}]':>20}")

    gap = aucs["findrisc_score"] - aucs["findrisc_nolab_score"]
    print(f"\n  → FINDRISC mất {gap:+.3f} AUC khi bỏ mục 7 (“từng phát hiện đường huyết cao”).")
    print("    Đó là phần hiệu năng mà một thang điểm 'không cần xét nghiệm' đang")
    print("    vay mượn từ một lần xét nghiệm trong quá khứ. Số này vào Discussion.")

    print(f"\n{line}\nĐIỂM VẬN HÀNH tại ngưỡng công bố (ở PREVALENCE THẬT, có trọng số)\n{line}")
    print(f"  {'Thang điểm':<40} {'Ngưỡng':>7} {'Sn':>7} {'Sp':>7} {'PPV':>7} {'% bị gắn cờ':>12}")
    for col, name, cut in specs:
        r = operating_point(y, d[col].to_numpy(float), cut, w)
        print(f"  {name:<40} {'>=' + str(cut):>7} {r['sn']:>7.3f} {r['sp']:>7.3f} "
              f"{r['ppv']:>7.3f} {r['flagged'] * 100:>11.1f}%")

    print("\n  Đọc cột PPV cho kỹ: đây chính là bài học §7.1 mục 3 của TO_DO.")
    print("  Ở prevalence ~4%, một thang điểm Sn cao vẫn cho PPV rất thấp — nghĩa là")
    print("  phần lớn người bị gắn cờ KHÔNG mắc bệnh. AUROC không nói cho anh điều đó.")

    print(f"\n{line}\nKIỂM TRA CHỐNG RÒ RỈ\n{line}")
    banned = {"LBXGH", "LBXGLU", "LBXGLT", "DIQ010", "DIQ160",
              "BPQ040A", "BPQ050A", "RHQ162"}
    leaked = sorted(banned & set(d.columns))
    if leaked:
        print(f"  ✗ THẤT BẠI — biến chỉ-dùng-cho-thang-điểm bị lẫn vào bảng: {leaked}")
        print("    Chúng chỉ được phép sống trong bảng phụ trợ, không vào ma trận feature.")
    else:
        print("  ✓ ĐẠT — bảng xuất ra chỉ có điểm số + feature no-lab.")
        print("    DIQ160/BPQ040A/BPQ050A/RHQ162 đã bị loại sau khi tính điểm xong.")
    print(line)

    lo_b, hi_b = 0.72, 0.83
    ok = lo_b <= aucs["ada_score"] <= hi_b
    print(f"\n  KIỂM TRA MỤC TIÊU (PROGRESS.json T0.6): AUC ADA cần nằm trong [{lo_b}, {hi_b}]")
    print(f"  → ADA = {aucs['ada_score']:.3f}  {'✓ ĐẠT' if ok else '✗ NGOÀI KHOẢNG — xem lại ánh xạ'}")
    if not ok:
        print("    Nếu lệch: nghi đầu tiên là mục vận động (PAQ) và mục tiền sử gia đình (MCQ300C).")


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data", type=Path, default=Path("data/nhanes_nolab.csv"))
    ap.add_argument("--cache", type=Path, default=Path("data/raw"))
    ap.add_argument("--out", type=Path, default=Path("data/nhanes_scores.csv"))
    ap.add_argument("--mapping-md", type=Path, default=None,
                    help="ghi bảng ánh xạ mục↔biến ra file markdown (dán vào Methods)")
    ap.add_argument("--veg-policy", choices=["zero", "missing"], default="zero",
                    help="FINDRISC mục 5 (rau/quả) NHANES không có: "
                         "zero = cho 0 điểm (giả định ăn hằng ngày, mặc định) · "
                         "missing = để thiếu, điểm tổng thành NaN")
    args = ap.parse_args()

    if not args.data.exists():
        print(f"✗ Không thấy {args.data}. Chạy trước:\n    python src/build_nhanes.py", file=sys.stderr)
        return 1

    d = pd.read_csv(args.data)
    cycles = sorted(d["cycle_start"].unique().astype(int))
    print(f"Đọc {len(d):,} dòng × {d.shape[1]} cột từ {args.data}")
    print(f"Chu kỳ: {', '.join(f'{c}-{c + 1}' for c in cycles)}")

    aux = load_aux(cycles, args.cache)
    before = len(d)
    d = d.merge(aux, on=["SEQN", "cycle_start"], how="left", suffixes=("", "_aux"))
    assert len(d) == before, "merge làm đổi số dòng — SEQN bị trùng giữa các chu kỳ?"

    fr, ad = findrisc(d), ada(d)

    if args.veg_policy == "zero":
        fr["fr5_veg"] = 0.0
        print("\n! FINDRISC mục 5 (rau/quả): NHANES không có → cho 0 điểm cho mọi người.")
        print("  Hệ quả: điểm FINDRISC bị ƯỚC LƯỢNG THẤP tối đa 1/26 cho người không ăn rau quả")
        print("  hằng ngày. PHẢI khai báo trong Methods (bảng ánh xạ có sẵn ở --mapping-md).")

    d["findrisc_score"] = fr.sum(axis=1, min_count=len(fr.columns))
    d["findrisc_nolab_score"] = (fr.drop(columns=["fr7_highglu"])
                                 .sum(axis=1, min_count=len(fr.columns) - 1))
    d["ada_score"] = ad.sum(axis=1, min_count=len(ad.columns))
    d = pd.concat([d, fr, ad], axis=1)

    # Loại biến chỉ-dùng-cho-thang-điểm NGAY khi tính điểm xong, TRƯỚC report —
    # để kiểm tra chống rò rỉ trong report() soi đúng cái bảng sẽ được lưu,
    # chứ không soi bản nháp trong bộ nhớ.
    drop = [c for c in ["DIQ160", "BPQ040A", "BPQ050A", "RHQ162"] if c in d.columns]
    d = d.drop(columns=drop)

    report(d, n_cycles=len(cycles), items=pd.concat([fr, ad], axis=1))

    args.out.parent.mkdir(parents=True, exist_ok=True)
    d.to_csv(args.out, index=False)
    print(f"\n→ Đã lưu {len(d):,} dòng × {d.shape[1]} cột vào {args.out}")
    print(f"→ Đã loại khỏi bảng lưu (chỉ dùng để tính điểm): {drop}")

    if args.mapping_md:
        write_mapping(args.mapping_md)

    print("\n→ Bước tiếp theo: T0.5 (pip install scikit-learn lightgbm matplotlib) rồi T0.7 (pipeline).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
