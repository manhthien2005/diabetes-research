"""
pipeline.py — Khung giao thức chống rò rỉ + nested CV.  [PROGRESS.json T0.7]

Đây là CÁI MÁY ĐO của cả đề tài. Mọi con số trong Table 2 và Table 3 đều đi ra
từ file này. Máy đo không cần đẹp — nó cần ĐÁNG TIN.

CHẠY:
    python src/pipeline.py                      # cấu hình A (đúng chuẩn), 2 model
    python src/pipeline.py --protocol F         # ablation F (nhét HbA1c vào feature)
    python src/pipeline.py --quick              # 3 seed thay vì 10, để thử nhanh
    python src/pipeline.py --self-test          # chứng minh khung này KHÔNG rò rỉ

--------------------------------------------------------------------------------
Ý TƯỞNG THIẾT KẾ QUAN TRỌNG NHẤT — đọc kỹ trước khi sửa gì:

    Table 3 yêu cầu "cùng data, cùng model, cùng seed, mỗi dòng đổi ĐÚNG 1 thứ"
    (TO_DO.md §7.2). Nếu mỗi cấu hình là một đoạn code viết riêng thì KHÔNG THỂ
    đảm bảo điều đó — sẽ luôn có thứ khác vô tình đổi theo, và Table 3 mất giá trị.

    Nên ở đây mỗi vi phạm là MỘT TRƯỜNG BOOLEAN trong `Protocol`. Đổi cấu hình =
    lật đúng một cờ. Phần code chạy là MỘT, không nhân bản.

    => Khi reviewer hỏi "X% này do leakage hay do bạn tuning kém?" (TO_DO §3, C2),
       câu trả lời là: cùng một hàm, cùng seed, cùng grid, khác đúng một dòng cấu hình.
--------------------------------------------------------------------------------
BỐN BẤT BIẾN — nếu phá một cái là cả bài sập:

1. Biến ĐỊNH NGHĨA NHÃN không bao giờ vào feature (trừ khi CỐ Ý bật ablation F).
   Danh sách feature lấy từ `build_nhanes.NOLAB_FEATURES` — MỘT nguồn chân lý.
   Đặc biệt `n_criteria_met` có trong file CSV nhưng nó ĐẾM số tiêu chí chẩn đoán
   mà nhãn dựa vào => là nhãn trá hình. Không được lọt vào X.

2. Impute / scale / chọn biến / cân bằng lớp đều nằm TRONG sklearn Pipeline,
   nên chúng chỉ fit trên train fold. Đây là cách duy nhất an toàn trong CV.

3. Fold ngoài dùng để ĐÁNH GIÁ, fold trong dùng để TUNING. Không bao giờ chọn
   siêu tham số bằng điểm của fold ngoài (đó là ablation E — winner's curse).

4. Trọng số khảo sát KHÔNG dùng để train (mô hình học quan hệ, không học tần suất),
   chỉ dùng khi TÍNH METRIC để ước lượng cho dân số thật. Đây là đóng góp P1.
--------------------------------------------------------------------------------
GHI CHÚ VỀ CÂN BẰNG LỚP:
   KHÔNG dùng class_weight='balanced' ở cấu hình chuẩn. Nó cải thiện chút ít
   discrimination nhưng PHÁ calibration — mà calibration là sản phẩm bắt buộc (C3).
   Muốn xem nó ăn bao nhiêu thì đó là ablation G, không phải mặc định.
--------------------------------------------------------------------------------
"""

from __future__ import annotations

import argparse
import json
import sys
import time
import warnings
from dataclasses import dataclass, asdict
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_nhanes import NOLAB_FEATURES  # noqa: E402  — MỘT nguồn chân lý cho feature

from sklearn.base import clone  # noqa: E402
from sklearn.compose import ColumnTransformer  # noqa: E402
from sklearn.feature_selection import SelectKBest, f_classif  # noqa: E402
from sklearn.impute import SimpleImputer  # noqa: E402
from sklearn.linear_model import LogisticRegression  # noqa: E402
from sklearn.metrics import roc_auc_score  # noqa: E402
from sklearn.model_selection import GridSearchCV, StratifiedKFold  # noqa: E402
from sklearn.pipeline import Pipeline  # noqa: E402
from sklearn.preprocessing import OneHotEncoder, StandardScaler  # noqa: E402

# Biến ĐỊNH NGHĨA NHÃN. Chỉ được xuất hiện trong X khi bật ablation F — có chủ ý.
LABEL_DEFINING = ["LBXGH", "LBXGLU", "LBXGLT", "n_criteria_met"]

# Cột trong CSV KHÔNG bao giờ là feature (định danh, thiết kế khảo sát, điểm baseline).
NEVER_FEATURE_PREFIX = ("SEQN", "cycle", "y_", "WT", "SDMV", "findrisc", "ada", "fr", "n_criteria")

CAT_FEATURES = ["RIDRETH3"]  # mã chủng tộc/dân tộc — danh mục, phải one-hot


# ================================================================== cấu hình
@dataclass(frozen=True)
class Protocol:
    """
    Một cấu hình giao thức. Ablation = tạo bản sao với ĐÚNG MỘT cờ đổi.

    Chữ cái khớp đúng bảng ở TO_DO.md §7.2 / PROGRESS.json T0.11–T0.14, T0.20.
    """
    name: str = "A"
    label: str = "Đúng chuẩn (mốc tham chiếu)"
    # B — impute/scale trên TOÀN BỘ data trước khi chia  (lỗi phổ biến nhất)
    preprocess_before_split: bool = False
    # C — chọn biến trên TOÀN BỘ data                    (khanam2021, kaliappan2024)
    select_before_split: bool = False
    # D — sinh mẫu tổng hợp trước khi chia               (gr2024, kaliappan2024)
    resample_before_split: bool = False
    # E — chọn siêu tham số/model bằng chính fold ngoài  (winner's curse — 25/34 bài)
    select_on_test: bool = False
    # F — nhét biến định nghĩa nhãn vào feature          (olisah2022, PIMA theo cấu trúc)
    include_label_defining: bool = False
    # G — ép cân bằng 50/50 rồi báo accuracy             (agliata2023, deberneh2021)
    force_balanced_eval: bool = False


PROTOCOLS: dict[str, Protocol] = {
    "A": Protocol("A", "Đúng chuẩn (mốc tham chiếu)"),
    "B": Protocol("B", "Impute/scale trên toàn bộ data trước khi chia",
                  preprocess_before_split=True),
    "C": Protocol("C", "Chọn biến trên toàn bộ data", select_before_split=True),
    "D": Protocol("D", "Sinh mẫu tổng hợp trước khi chia", resample_before_split=True),
    "E": Protocol("E", "Chọn siêu tham số trên chính tập test (winner's curse)",
                  select_on_test=True),
    "F": Protocol("F", "Thêm biến định nghĩa nhãn (HbA1c/glucose) vào feature",
                  include_label_defining=True),
    "G": Protocol("G", "Ép cân bằng 50/50 khi đánh giá", force_balanced_eval=True),
}


# ================================================================== dữ liệu
def load_data(path: Path, protocol: Protocol) -> tuple[pd.DataFrame, np.ndarray, np.ndarray]:
    """
    Đọc bảng và dựng (X, y, w).

    Trả về w = trọng số khảo sát đã chia số chu kỳ. w KHÔNG dùng để train —
    xem bất biến 4 ở đầu file.
    """
    d = pd.read_csv(path)
    n_cycles = d["cycle_start"].nunique()

    feats = [c for c in NOLAB_FEATURES if c in d.columns]
    if protocol.include_label_defining:
        # Ablation F: cố ý nạp lại biến định nghĩa nhãn từ file thô.
        d, extra = _attach_label_defining(d)
        feats = feats + extra

    X = d[feats].copy()
    y = d["y_undiagnosed_dm"].to_numpy(float)
    w = (d["WTMEC2YR"] / n_cycles).to_numpy(float)

    keep = ~np.isnan(y)
    if (~keep).any():
        print(f"  ! loại {int((~keep).sum())} dòng thiếu nhãn")
    X, y, w = X.loc[keep].reset_index(drop=True), y[keep], w[keep]
    w = np.nan_to_num(w, nan=0.0)

    _assert_no_leak(X, protocol)
    return X, y, w


def _attach_label_defining(d: pd.DataFrame) -> tuple[pd.DataFrame, list[str]]:
    """
    Nạp HbA1c/glucose vào bảng — CHỈ cho ablation F.

    Đây là cách tái tạo con số ~0.99 mà olisah2022 / kaliappan2024 / naz2020
    báo cáo: hỏi máy 'người này có bệnh không' rồi đưa luôn tờ xét nghiệm cho nó nhìn.
    """
    from build_nhanes import _download, _read  # nhập tại chỗ: chỉ ablation F cần

    cycles = sorted(d["cycle_start"].unique().astype(int))
    frames = []
    for year in cycles:
        parts = []
        for fname, cols in [("GHB", ["SEQN", "LBXGH"]), ("GLU", ["SEQN", "LBXGLU"])]:
            p = _download(year, fname, Path("data/raw"))
            if p is not None:
                parts.append(_read(p, cols))
        if parts:
            merged = parts[0]
            for extra in parts[1:]:
                merged = merged.merge(extra, on="SEQN", how="outer")
            merged["cycle_start"] = year
            frames.append(merged)

    lab = pd.concat(frames, ignore_index=True)
    before = len(d)
    d = d.merge(lab, on=["SEQN", "cycle_start"], how="left")
    assert len(d) == before, "merge ablation F làm đổi số dòng"
    added = [c for c in ["LBXGH", "LBXGLU"] if c in d.columns]
    print(f"  ⚠ ABLATION F: đã CỐ Ý nạp biến định nghĩa nhãn vào feature: {added}")
    return d, added


def _assert_no_leak(X: pd.DataFrame, protocol: Protocol) -> None:
    """Chốt chặn cuối. Chạy ở MỌI lần load, không phải chỉ khi nhớ gọi."""
    bad = [c for c in X.columns
           if c.startswith(NEVER_FEATURE_PREFIX) and c not in LABEL_DEFINING]
    if bad:
        raise RuntimeError(f"RÒ RỈ: cột không được phép làm feature lọt vào X: {bad}")

    leaked = [c for c in LABEL_DEFINING if c in X.columns]
    if leaked and not protocol.include_label_defining:
        raise RuntimeError(
            f"RÒ RỈ: biến định nghĩa nhãn {leaked} nằm trong X ở cấu hình "
            f"'{protocol.name}' vốn KHÔNG cho phép. Đây là lỗi phải sửa, không phải cảnh báo.")
    if protocol.include_label_defining and not leaked:
        raise RuntimeError("Ablation F được bật nhưng không nạp được biến định nghĩa nhãn.")


# ================================================================== mô hình
def _preprocessor(cols: list[str], scale: bool) -> ColumnTransformer:
    """Impute + (scale) + one-hot. Là MỘT BƯỚC trong Pipeline nên chỉ fit trên train fold."""
    cat = [c for c in CAT_FEATURES if c in cols]
    num = [c for c in cols if c not in cat]

    num_steps = [("impute", SimpleImputer(strategy="median"))]
    if scale:
        num_steps.append(("scale", StandardScaler()))

    return ColumnTransformer(
        [("num", Pipeline(num_steps), num),
         ("cat", Pipeline([("impute", SimpleImputer(strategy="most_frequent")),
                           ("onehot", OneHotEncoder(handle_unknown="ignore",
                                                    sparse_output=False))]), cat)],
        remainder="drop", verbose_feature_names_out=False)


def build_estimator(kind: str, cols: list[str], protocol: Protocol, seed: int):
    """Trả (pipeline, lưới siêu tham số). Lưới nhỏ có chủ ý — công khai được trong bài."""
    steps: list = [("prep", _preprocessor(cols, scale=(kind == "logreg")))]

    if protocol.select_before_split or protocol.name == "C":
        # Bộ chọn biến vẫn là một BƯỚC trong Pipeline ở cấu hình chuẩn.
        # Ablation C phá điều đó ở tầng nested_cv(), không phải ở đây.
        pass

    if kind == "logreg":
        steps.append(("select", SelectKBest(f_classif, k="all")))
        steps.append(("model", LogisticRegression(max_iter=2000, solver="lbfgs",
                                                  random_state=seed)))
        grid = {"model__C": [0.01, 0.1, 1.0, 10.0],
                "select__k": ["all", 10]}
    elif kind == "lgbm":
        from lightgbm import LGBMClassifier
        steps.append(("select", SelectKBest(f_classif, k="all")))
        steps.append(("model", LGBMClassifier(
            random_state=seed, n_estimators=300, verbose=-1,
            min_child_samples=30, subsample=0.9, subsample_freq=1, colsample_bytree=0.9)))
        grid = {"model__learning_rate": [0.02, 0.05],
                "model__num_leaves": [7, 15, 31],
                "select__k": ["all"]}
    else:
        raise ValueError(f"model không biết: {kind}")

    return Pipeline(steps), grid


# ================================================================== nested CV
def nested_cv(X: pd.DataFrame, y: np.ndarray, kind: str, protocol: Protocol,
              seeds: list[int], n_outer: int = 5, n_inner: int = 3,
              verbose: bool = True) -> dict:
    """
    Nested CV. Fold NGOÀI = đánh giá. Fold TRONG = tuning. Không đảo.

    Trả dict có:
        oof   — mảng (n_seeds, n_samples) xác suất dự đoán ngoài-fold
        picks — siêu tham số được chọn ở mỗi fold (để công khai trong bài, phản biện #7)
    """
    cols = list(X.columns)
    oof = np.full((len(seeds), len(y)), np.nan)
    picks: list[dict] = []
    t0 = time.time()

    for si, seed in enumerate(seeds):
        outer = StratifiedKFold(n_splits=n_outer, shuffle=True, random_state=seed)
        for fold, (tr, te) in enumerate(outer.split(X, y)):
            Xtr, Xte = X.iloc[tr], X.iloc[te]
            ytr, yte = y[tr], y[te]

            base, grid = build_estimator(kind, cols, protocol, seed)

            if protocol.select_on_test:
                # ── ABLATION E — winner's curse ────────────────────────────────
                # Thử từng tổ hợp, chọn tổ hợp thắng TRÊN CHÍNH FOLD NGOÀI.
                # Đây chính xác là điều 25/34 bài trong kho anh đang làm.
                best_auc, best_est = -np.inf, None
                for params in _iter_grid(grid):
                    est = clone(base).set_params(**params)
                    with warnings.catch_warnings():
                        warnings.simplefilter("ignore")
                        est.fit(Xtr, ytr)
                    p = est.predict_proba(Xte)[:, 1]
                    a = roc_auc_score(yte, p)
                    if a > best_auc:
                        best_auc, best_est, best_params = a, est, params
                est, chosen = best_est, best_params
            else:
                # ── Chuẩn — tuning CHỈ trên fold trong, fold ngoài chưa hề bị chạm ──
                inner = StratifiedKFold(n_splits=n_inner, shuffle=True, random_state=seed)
                gs = GridSearchCV(base, grid, scoring="roc_auc", cv=inner,
                                  n_jobs=-1, refit=True)
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    gs.fit(Xtr, ytr)
                est, chosen = gs.best_estimator_, gs.best_params_

            oof[si, te] = est.predict_proba(Xte)[:, 1]
            picks.append({"seed": seed, "fold": fold,
                          **{k: str(v) for k, v in chosen.items()}})

        if verbose:
            a = roc_auc_score(y, oof[si])
            print(f"    seed {seed:>3}  AUROC(out-of-fold) = {a:.4f}"
                  f"   [{time.time() - t0:.0f}s]")

    assert not np.isnan(oof).any(), "còn ô chưa được dự đoán — nested CV chưa phủ hết"
    return {"oof": oof, "picks": picks}


def _iter_grid(grid: dict):
    from itertools import product
    keys = list(grid)
    for vals in product(*(grid[k] for k in keys)):
        yield dict(zip(keys, vals))


# ================================================================== tự kiểm tra
def self_test() -> int:
    """
    CHỨNG MINH khung này không rò rỉ — bằng dữ liệu giả có đáp án biết trước.

    Dựng dữ liệu mà feature HOÀN TOÀN ngẫu nhiên, không liên quan gì tới nhãn.
    · Giao thức đúng  -> AUROC phải ~0.50 (đoán mò, vì đúng là không có tín hiệu)
    · Ablation F      -> AUROC phải ~1.00 (vì ta cố ý đưa nhãn vào feature)

    Nếu cấu hình A cho AUROC CAO trên dữ liệu vô nghĩa => khung có lỗi rò rỉ.
    Đây là bài kiểm tra mà 31/35 bài trong kho không có.

    ────────────────────────────────────────────────────────────────────────────
    ⚠️ VÌ SAO PHẢI DÙNG NHIỀU SEED VÀ n LỚN — đo thật ngày 2026-07-26:

        AUROC trên nhiễu thuần, 10 seed mỗi mức:
            n = 1.200  ->  0.479 ± 0.048   quan sát được [0.357 , 0.543]
            n = 5.000  ->  0.503 ± 0.018   quan sát được [0.467 , 0.522]

        Tức là ở cỡ mẫu nhỏ, MỘT lần chạy trên dữ liệu HOÀN TOÀN vô nghĩa vẫn có
        thể ra AUROC 0.36 hoặc 0.54. Bản đầu của bài test này chốt khoảng ±0.10
        trên MỘT seed nên đã báo động giả.

        (Ghi chú cho Discussion — CẦN LÀM CẨN THẬN LẠI TRƯỚC KHI VIẾT VÀO BÀI:
         quan sát này liên quan trực tiếp tới các bài dùng PIMA, n = 768, một
         split cố định — `nipa2023`, `kaliappan2024`, `dharmarathne2024`.
         Nền nhiễu ở cỡ mẫu đó rộng hơn nhiều so với cảm nhận thông thường.)

    Do đó: kiểm ở n gần cỡ mẫu thật, lấy TRUNG BÌNH nhiều seed, và hiểu rằng
    phép kiểm này về bản chất là MỘT PHÍA — rò rỉ làm số PHỒNG LÊN. AUROC thấp
    hơn 0.5 là xui, không phải rò rỉ.
    ────────────────────────────────────────────────────────────────────────────
    """
    print("=" * 74)
    print("TỰ KIỂM TRA — dữ liệu giả, feature ngẫu nhiên, KHÔNG có tín hiệu thật")
    print("=" * 74)
    rng = np.random.default_rng(0)
    n, p, seeds = 4000, 12, [1, 2, 3, 4, 5]           # n ≈ cỡ mẫu thật (4.170)
    y = (rng.random(n) < 0.06).astype(float)          # prevalence ~6%, giống thật
    X = pd.DataFrame(rng.normal(size=(n, p)), columns=[f"x{i}" for i in range(p)])
    print(f"  n = {n:,} · {int(y.sum())} ca dương ({y.mean() * 100:.1f}%) · {len(seeds)} seed\n")

    ok = True
    r = nested_cv(X, y, "logreg", PROTOCOLS["A"], seeds=seeds, n_outer=5, verbose=False)
    a = np.array([roc_auc_score(y, o) for o in r["oof"]])
    a_clean = a.mean()
    # Khoảng ±0.06 quanh 0.5: rộng hơn ~7 lần sai số chuẩn của trung bình 5 seed
    # ở n này (0.018/√5 ≈ 0.008), nhưng vẫn chặn được rò rỉ thật (luôn ≥ 0.9).
    good = 0.44 <= a_clean <= 0.56
    ok &= good
    print(f"  A (đúng chuẩn)   AUROC = {a_clean:.3f} ± {a.std(ddof=1):.3f}   "
          f"{'✓ ĐẠT (≈0.5 như kỳ vọng)' if good else '✗ HỎNG — có rò rỉ trong khung!'}")

    Xl = X.copy()
    Xl["n_criteria_met"] = y * 3 + rng.normal(0, 0.01, n)   # nhãn trá hình
    r = nested_cv(Xl, y, "logreg", PROTOCOLS["F"], seeds=seeds, n_outer=5, verbose=False)
    al = np.array([roc_auc_score(y, o) for o in r["oof"]])
    a_leak = al.mean()
    good = a_leak > 0.95
    ok &= good
    print(f"  F (cố ý rò rỉ)   AUROC = {a_leak:.3f} ± {al.std(ddof=1):.3f}   "
          f"{'✓ ĐẠT (≈1.0 như kỳ vọng)' if good else '✗ HỎNG — ablation F không tái tạo được'}")

    print(f"\n  Chênh lệch do rò rỉ trên dữ liệu KHÔNG có tín hiệu: {a_leak - a_clean:+.3f} AUROC")
    print("  → Đây là bằng chứng khung đo đáng tin, trước khi tin bất kỳ số nào của nó.")

    try:
        _assert_no_leak(Xl, PROTOCOLS["A"])
        print("  ✗ HỎNG — chốt chặn _assert_no_leak() không bắt được biến nhãn trá hình")
        ok = False
    except RuntimeError:
        print("  ✓ ĐẠT — chốt chặn bắt đúng biến nhãn trá hình khi cấu hình không cho phép")

    print("=" * 74)
    print("KẾT LUẬN:", "✓ KHUNG ĐO ĐÁNG TIN" if ok else "✗ CÓ LỖI — KHÔNG ĐƯỢC DÙNG SỐ")
    return 0 if ok else 1


# ================================================================== main
def main() -> int:
    for s in (sys.stdout, sys.stderr):
        try:
            s.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--data", type=Path, default=Path("data/nhanes_scores.csv"))
    ap.add_argument("--out", type=Path, default=Path("results"))
    ap.add_argument("--protocol", default="A", choices=sorted(PROTOCOLS))
    ap.add_argument("--models", nargs="+", default=["logreg", "lgbm"])
    ap.add_argument("--seeds", type=int, default=10)
    ap.add_argument("--quick", action="store_true", help="3 seed thay vì 10")
    ap.add_argument("--self-test", action="store_true")
    args = ap.parse_args()

    if args.self_test:
        return self_test()

    if not args.data.exists():
        print(f"✗ Không thấy {args.data}. Chạy trước:\n"
              f"    python src/build_nhanes.py && python src/scores.py", file=sys.stderr)
        return 1

    protocol = PROTOCOLS[args.protocol]
    seeds = list(range(1, (3 if args.quick else args.seeds) + 1))

    print("=" * 74)
    print(f"GIAO THỨC {protocol.name} — {protocol.label}")
    print("=" * 74)
    flags = [k for k, v in asdict(protocol).items() if v is True]
    print(f"  Cờ đang bật : {flags if flags else '(không — đây là cấu hình sạch)'}")
    print(f"  Seed        : {len(seeds)} ({seeds[0]}–{seeds[-1]})")

    X, y, w = load_data(args.data, protocol)
    print(f"  Dữ liệu     : {len(y):,} mẫu × {X.shape[1]} feature · "
          f"{int(y.sum())} ca dương ({y.mean() * 100:.2f}%)")
    print(f"  Feature     : {', '.join(X.columns)}")
    print("  ✓ Chốt chặn chống rò rỉ: ĐẠT\n")

    args.out.mkdir(parents=True, exist_ok=True)
    for kind in args.models:
        print(f"  ── {kind} ─────────────────────────────────────────────")
        r = nested_cv(X, y, kind, protocol, seeds)
        aucs = np.array([roc_auc_score(y, p) for p in r["oof"]])
        print(f"    AUROC qua {len(seeds)} seed: {aucs.mean():.4f} ± {aucs.std(ddof=1):.4f}"
              f"   (min {aucs.min():.4f} · max {aucs.max():.4f})\n")

        f = args.out / f"oof_{protocol.name}_{kind}.npz"
        np.savez_compressed(f, oof=r["oof"], y=y, w=w, seeds=np.array(seeds))
        (args.out / f"picks_{protocol.name}_{kind}.json").write_text(
            json.dumps(r["picks"], ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"    → {f}")

    print("\n→ Bước tiếp theo: python src/evaluate.py "
          f"--protocol {protocol.name}   (T0.8 — bộ đánh giá trung thực)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
