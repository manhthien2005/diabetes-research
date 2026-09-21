"""
evaluate.py — Bộ đánh giá TRUNG THỰC.  [PROGRESS.json T0.8]

Sinh ra Table 2 + Fig 2 (ROC & PR) + Fig 3 (calibration).

CHẠY:
    python src/pipeline.py --protocol A     # phải chạy TRƯỚC (sinh results/oof_A_*.npz)
    python src/evaluate.py --protocol A
    python src/evaluate.py --protocol A --md paper/table2.md

--------------------------------------------------------------------------------
VÌ SAO FILE NÀY TỒN TẠI (TO_DO.md C3):

    AUROC 0.77 nghe khá. Nhưng ở prevalence 3.9%, nó KHÔNG cho anh biết
    "trong 10 người bị gắn cờ thì mấy người thật sự có bệnh".

    Nên mọi mô hình ở đây bị chấm bằng NĂM cái thước cùng lúc, trên CÙNG một bảng:
        · AUROC              — phân biệt được không (thước cả lĩnh vực đang dùng)
        · AUPRC              — kèm đường nền = prevalence. Đây mới là thước đúng khi bệnh hiếm
        · PPV @ Sn = 80%     — con số bác sĩ thật sự cần
        · Brier + calib slope— xác suất dự đoán có ĐÚNG không, hay chỉ xếp hạng đúng
        · % dân số bị gắn cờ — cái giá phải trả khi triển khai

    Trong 35 bài đã phân tích của anh: ~3 bài báo AUPRC, ~2 bài báo calibration.
--------------------------------------------------------------------------------
ĐÓNG GÓP P1 — MỌI metric được báo SONG SONG hai bản:
    · KHÔNG trọng số  — cách cả lĩnh vực đang làm
    · CÓ trọng số khảo sát — ước lượng cho DÂN SỐ MỸ THẬT
  Chênh lệch giữa hai cột chính là đóng góp P1. dinh2019 (434 cite) không hề nhắc tới.
--------------------------------------------------------------------------------
⚠️ MỘT ĐIỂM PHẢI KHAI BÁO TRONG BÀI:
  Ngưỡng cho "Sn = 80%" được chọn TRÊN CHÍNH tập out-of-fold đang dùng để báo cáo.
  Đó là một chút lạc quan (optimism) không tránh được nếu không có tập test riêng.
  Phải ghi rõ trong Methods. Ở bản tạp chí, nên chọn ngưỡng trên fold trong.
--------------------------------------------------------------------------------
Nhãn hình vẽ để TIẾNG ANH có chủ ý — hình đi thẳng vào bản thảo quốc tế.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from scores import auc_weighted  # noqa: E402  — Mann-Whitney có trọng số, xử lý đúng tie

EPS = 1e-9


# ================================================================== metric
def auprc_weighted(y: np.ndarray, p: np.ndarray, w: np.ndarray | None = None) -> float:
    """
    Average precision có trọng số = diện tích dưới đường Precision-Recall.

    Đường nền (baseline) của chỉ số này = prevalence, KHÔNG phải 0.5.
    Luôn phải báo kèm đường nền, nếu không con số vô nghĩa.
    """
    w = np.ones_like(y, dtype=float) if w is None else w
    m = ~(np.isnan(y) | np.isnan(p) | np.isnan(w))
    y, p, w = y[m], p[m], w[m]

    order = np.argsort(-p)
    y, p, w = y[order], p[order], w[order]
    tp = np.cumsum(w * y)
    fp = np.cumsum(w * (1 - y))
    total_pos = tp[-1]
    if total_pos <= 0:
        return float("nan")

    recall = tp / total_pos
    precision = tp / np.maximum(tp + fp, EPS)
    # Chỉ cộng ở những chỗ recall THỰC SỰ tăng (bỏ qua các điểm trùng giá trị p)
    dr = np.diff(np.concatenate([[0.0], recall]))
    return float(np.sum(precision * dr))


def threshold_for_sensitivity(y: np.ndarray, p: np.ndarray, target: float,
                              w: np.ndarray | None = None) -> float:
    """Ngưỡng CAO NHẤT (đặc hiệu nhất) mà vẫn đạt độ nhạy >= target."""
    w = np.ones_like(y, dtype=float) if w is None else w
    order = np.argsort(-p)
    ys, ps, ws = y[order], p[order], w[order]
    tp = np.cumsum(ws * ys)
    total_pos = float(np.sum(ws * ys))
    if total_pos <= 0:
        return float("nan")
    hit = np.flatnonzero(tp / total_pos >= target)
    return float(ps[hit[0]]) if hit.size else float(ps[-1])


def operating(y, p, thr, w=None) -> dict:
    w = np.ones_like(y, dtype=float) if w is None else w
    pred = p >= thr
    tp = w[pred & (y == 1)].sum(); fn = w[~pred & (y == 1)].sum()
    fp = w[pred & (y == 0)].sum(); tn = w[~pred & (y == 0)].sum()
    d = lambda a, b: a / b if b > EPS else float("nan")  # noqa: E731
    return dict(sn=d(tp, tp + fn), sp=d(tn, tn + fp), ppv=d(tp, tp + fp),
                npv=d(tn, tn + fn), flagged=d(tp + fp, tp + fp + tn + fn))


def calibration(y: np.ndarray, p: np.ndarray, w: np.ndarray | None = None) -> dict:
    """
    Brier + hồi quy hiệu chuẩn (calibration slope & intercept).

    Ý nghĩa:
        slope = 1, intercept = 0  -> xác suất dự đoán ĐÚNG
        slope < 1                 -> dự đoán quá "cực đoan" (hay gặp khi overfit)
        intercept != 0            -> lệch nền (calibration-in-the-large)

    Một mô hình có AUROC cao vẫn có thể sai bét ở đây — đó là lý do phải báo cả hai.
    """
    from sklearn.linear_model import LogisticRegression
    w = np.ones_like(y, dtype=float) if w is None else w
    m = ~(np.isnan(y) | np.isnan(p) | np.isnan(w)) & (w > 0)
    y, p, w = y[m], p[m], w[m]

    brier = float(np.average((p - y) ** 2, weights=w))
    pc = np.clip(p, 1e-6, 1 - 1e-6)
    logit = np.log(pc / (1 - pc)).reshape(-1, 1)
    lr = LogisticRegression(C=np.inf, solver="lbfgs", max_iter=1000)
    lr.fit(logit, y, sample_weight=w)
    return dict(brier=brier, slope=float(lr.coef_[0][0]), intercept=float(lr.intercept_[0]))


def all_metrics(y, p, w, sn_target=0.80) -> dict:
    """Toàn bộ thước đo cho MỘT bộ dự đoán, cả bản không trọng số và có trọng số."""
    out = {}
    for tag, ww in (("raw", None), ("wt", w)):
        thr = threshold_for_sensitivity(y, p, sn_target, ww)
        op = operating(y, p, thr, ww)
        cal = calibration(y, p, ww)
        prev = float(np.average(y, weights=ww if ww is not None else np.ones_like(y)))
        out[tag] = dict(
            auroc=auc_weighted(y, p, ww), auprc=auprc_weighted(y, p, ww),
            prevalence=prev, thr=thr, **op, **cal)
        out[tag]["auprc_lift"] = out[tag]["auprc"] / prev if prev > 0 else float("nan")
    return out


# ================================================================== gom kết quả
def summarise(y, preds, w, name, is_prob: bool = True) -> dict:
    """
    preds = (n_seeds, n) hoặc (n,). Báo mean ± SD qua các seed.

    is_prob = đầu ra CÓ PHẢI xác suất thật không.
    Thang điểm lâm sàng trả về ĐIỂM (0–26), không phải xác suất. Chấm chúng bằng
    Brier/calibration slope là DÙNG SAI THƯỚC — đúng loại lỗi bài này đi phê phán,
    chỉ khác chiều. Nên các ô đó được đánh dấu "—" thay vì in một con số vô nghĩa.
    """
    preds = np.atleast_2d(preds)
    rows = [all_metrics(y, p, w) for p in preds]
    out = {"name": name, "n_seeds": len(rows), "is_prob": is_prob}
    for tag in ("raw", "wt"):
        for k in rows[0][tag]:
            v = np.array([r[tag][k] for r in rows], dtype=float)
            out[f"{tag}_{k}"] = float(np.nanmean(v))
            out[f"{tag}_{k}_sd"] = float(np.nanstd(v, ddof=1)) if len(v) > 1 else 0.0
    return out


def _fmt(m, k, dec=3) -> str:
    v, sd = m[k], m.get(f"{k}_sd", 0.0)
    return f"{v:.{dec}f}" + (f" ± {sd:.{dec}f}" if sd > 5e-4 else "")


# ================================================================== hình vẽ
def make_figures(y, series, w, outdir: Path, protocol: str) -> None:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from sklearn.metrics import precision_recall_curve, roc_curve

    prev = float(y.mean())

    # ---- Fig 2 — ROC + PR cạnh nhau
    fig, ax = plt.subplots(1, 2, figsize=(11, 4.6))
    for name, p, _ in series:
        fpr, tpr, _t = roc_curve(y, p)
        ax[0].plot(fpr, tpr, lw=1.6,
                   label=f"{name} (AUROC {auc_weighted(y, p):.3f})")
        pr, rc, _t = precision_recall_curve(y, p)
        ax[1].plot(rc, pr, lw=1.6, label=f"{name} (AUPRC {auprc_weighted(y, p):.3f})")

    ax[0].plot([0, 1], [0, 1], "k--", lw=0.8, label="Chance")
    ax[0].set(xlabel="1 - Specificity", ylabel="Sensitivity", title="(a) ROC")
    ax[1].axhline(prev, ls="--", c="k", lw=0.8,
                  label=f"Prevalence baseline ({prev:.3f})")
    ax[1].set(xlabel="Recall (Sensitivity)", ylabel="Precision (PPV)",
              title="(b) Precision-Recall", ylim=(0, max(0.35, prev * 6)))
    for a in ax:
        a.legend(fontsize=7.5, loc="best")
        a.grid(alpha=.25)
    fig.suptitle(f"Fig 2 — Discrimination, protocol {protocol} "
                 f"(undiagnosed diabetes, non-laboratory features)", fontsize=10)
    fig.tight_layout()
    f2 = outdir / f"fig2_roc_pr_{protocol}.png"
    fig.savefig(f2, dpi=160)
    plt.close(fig)

    # ---- Fig 3 — calibration.
    # CHỈ vẽ mô hình trả về XÁC SUẤT THẬT. Thang điểm lâm sàng cho ra ĐIỂM 0–26;
    # đặt chúng lên trục "predicted probability" sau khi co tuyến tính về [0,1] sẽ
    # làm chúng trông hiệu chuẩn thảm hại — trong khi thực ra chỉ là SAI THƯỚC.
    # Muốn so calibration với thang điểm thì phải hiệu chuẩn lại chúng trước
    # (logistic recalibration) — việc đó thuộc Phase 3, không phải ở đây.
    prob_series = [(n, p) for n, p, is_prob in series if is_prob]
    fig, axc = plt.subplots(figsize=(5.4, 5.0))
    for name, p in prob_series:
        q = pd.qcut(pd.Series(p).rank(method="first"), 10, labels=False)
        obs = [y[q == i].mean() for i in range(10)]
        exp = [p[q == i].mean() for i in range(10)]
        axc.plot(exp, obs, "o-", ms=4.5, lw=1.4, label=name)
    lim = max(max(p.max() for _, p in prob_series), y.mean() * 4) * 1.05
    axc.plot([0, lim], [0, lim], "k--", lw=0.9, label="Perfect calibration")
    axc.set(xlabel="Predicted probability", ylabel="Observed frequency",
            title=f"Fig 3 — Calibration, protocol {protocol}\n"
                  f"(probability outputs only; risk scores are not probabilities)",
            xlim=(0, lim), ylim=(0, lim))
    axc.legend(fontsize=8)
    axc.grid(alpha=.25)
    fig.tight_layout()
    f3 = outdir / f"fig3_calibration_{protocol}.png"
    fig.savefig(f3, dpi=160)
    plt.close(fig)
    print(f"\n  → {f2}\n  → {f3}")


# ================================================================== báo cáo
def report(rows: list[dict], protocol: str, n_used: int, n_all: int, subset: str) -> None:
    L = "=" * 108
    print(f"\n{L}\nTABLE 2 — HIỆU NĂNG (giao thức {protocol}) · KHÔNG trọng số khảo sát")
    print(f"          n = {n_used:,}/{n_all:,} · tập so sánh '{subset}' "
          f"(mọi mô hình chấm trên CÙNG những người này)\n{L}")
    hdr = (f"  {'Mô hình':<34}{'AUROC':>15}{'AUPRC':>15}{'so nền':>8}"
           f"{'PPV@Sn80':>11}{'gắn cờ':>9}{'Brier':>8}{'calib':>8}")
    def line(m: dict, tag: str) -> str:
        # Brier / calibration slope CHỈ có nghĩa khi đầu ra là XÁC SUẤT.
        # Thang điểm lâm sàng trả về ĐIỂM (0–26) -> in "—", không in số vô nghĩa.
        brier = f"{m[f'{tag}_brier']:.3f}" if m["is_prob"] else "—"
        slope = f"{m[f'{tag}_slope']:.2f}" if m["is_prob"] else "—"
        return (f"  {m['name']:<34}{_fmt(m, f'{tag}_auroc'):>15}{_fmt(m, f'{tag}_auprc'):>15}"
                f"{m[f'{tag}_auprc_lift']:>7.1f}x{m[f'{tag}_ppv']:>11.3f}"
                f"{m[f'{tag}_flagged'] * 100:>8.1f}%{brier:>8}{slope:>8}")

    print(hdr + "\n  " + "-" * 106)
    for m in rows:
        print(line(m, "raw"))

    print(f"\n{L}\nTABLE 6 — CÙNG BẢNG NHƯNG CÓ TRỌNG SỐ KHẢO SÁT (ước lượng cho dân số Mỹ)\n{L}")
    print(hdr + "\n  " + "-" * 106)
    for m in rows:
        print(line(m, "wt"))

    print(f"\n{L}\nP1 — CHÊNH LỆCH DO TRỌNG SỐ KHẢO SÁT (đóng góp phụ, dinh2019 không có)\n{L}")
    print(f"  {'Mô hình':<34}{'ΔAUROC':>10}{'ΔAUPRC':>10}{'ΔPPV':>10}")
    for m in rows:
        print(f"  {m['name']:<34}{m['wt_auroc'] - m['raw_auroc']:>+10.3f}"
              f"{m['wt_auprc'] - m['raw_auprc']:>+10.3f}{m['wt_ppv'] - m['raw_ppv']:>+10.3f}")

    prev = rows[0]["raw_prevalence"]
    prev_w = rows[0]["wt_prevalence"]
    print(f"\n{L}\nĐỌC BẢNG NÀY THẾ NÀO\n{L}")
    print(f"  · Đường nền AUPRC = prevalence = {prev:.3f} (thô) / {prev_w:.3f} (có trọng số).")
    print(f"    Cột 'so nền' cho biết mô hình hơn phép đoán mù bao nhiêu LẦN.")
    lo = min(r["raw_ppv"] for r in rows) * 100
    hi = max(r["raw_ppv"] for r in rows) * 100
    print(f"  · PPV@Sn80: giữ độ nhạy 80% thì trong 100 người bị gắn cờ, chỉ "
          f"~{lo:.0f}–{hi:.0f} người thật sự có bệnh.")
    print("  · calib (slope): =1 là hoàn hảo. <1 = dự đoán quá cực đoan; >1 = quá dè dặt.")
    print("  · Cột 'gắn cờ' = tỉ lệ dân số phải đi xét nghiệm tiếp. Đây là CÁI GIÁ.")
    print(L)


def write_md(rows: list[dict], path: Path, protocol: str) -> None:
    L = [f"# Table 2 — Hiệu năng, giao thức {protocol}", "",
         "> Sinh tự động bởi `src/evaluate.py`. Mean ± SD qua các seed của nested CV.", "",
         "| Model | AUROC | AUPRC | AUPRC/prev | PPV@Sn80 | % flagged | Brier | Calib. slope |",
         "|---|---|---|---|---|---|---|---|"]
    for m in rows:
        L.append(f"| {m['name']} | {_fmt(m, 'raw_auroc')} | {_fmt(m, 'raw_auprc')} | "
                 f"{m['raw_auprc_lift']:.1f}× | {m['raw_ppv']:.3f} | "
                 f"{m['raw_flagged'] * 100:.1f}% | {m['raw_brier']:.3f} | {m['raw_slope']:.2f} |")
    L += ["", f"Đường nền AUPRC = prevalence = {rows[0]['raw_prevalence']:.4f}.", "",
          f"# Table 6 — Cùng bảng, CÓ trọng số khảo sát (giao thức {protocol})", "",
          "| Model | AUROC | AUPRC | PPV@Sn80 | Brier | ΔAUROC vs không trọng số |",
          "|---|---|---|---|---|---|"]
    for m in rows:
        L.append(f"| {m['name']} | {_fmt(m, 'wt_auroc')} | {_fmt(m, 'wt_auprc')} | "
                 f"{m['wt_ppv']:.3f} | {m['wt_brier']:.3f} | "
                 f"{m['wt_auroc'] - m['raw_auroc']:+.3f} |")
    L.append("")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(L), encoding="utf-8")
    print(f"  → {path}")


# ================================================================== main
def main() -> int:
    for s in (sys.stdout, sys.stderr):
        try:
            s.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):
            pass

    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--protocol", default="A")
    ap.add_argument("--results", type=Path, default=Path("results"))
    ap.add_argument("--scores", type=Path, default=Path("data/nhanes_scores.csv"))
    ap.add_argument("--md", type=Path, default=Path("paper/table2.md"))
    ap.add_argument("--no-figures", action="store_true")
    ap.add_argument("--subset", choices=["common", "full"], default="common",
                    help="common = chỉ những người tính được ĐỦ cả 2 thang điểm "
                         "(so sánh công bằng, MẶC ĐỊNH) · "
                         "full = toàn bộ mẫu, điểm thiếu gán trung vị (thiên vị ML)")
    args = ap.parse_args()

    files = sorted(args.results.glob(f"oof_{args.protocol}_*.npz"))
    if not files:
        print(f"✗ Không thấy results/oof_{args.protocol}_*.npz. Chạy trước:\n"
              f"    python src/pipeline.py --protocol {args.protocol}", file=sys.stderr)
        return 1

    # ── Nạp điểm thang lâm sàng TRƯỚC, để biết tập so sánh chung ────────────────
    #
    # ⚠️ BẪY ĐÃ DÍNH THẬT (26/07/2026) — đọc kỹ, đây là loại lỗi bài này đi phê phán:
    #   Bản đầu gán TRUNG VỊ cho 9,8% người thiếu điểm FINDRISC để "so trên cùng cỡ mẫu".
    #   Hậu quả: FINDRISC tụt 0.751 -> 0.695, tức là thủ thuật xử lý dữ liệu thiếu
    #   TỰ TAY tạo ra khoảng cách +0.07 AUROC cho ML. Đúng cái ảo giác mà claim C5
    #   nói là phải bóc ra. So sánh không công bằng theo hướng có lợi cho mình là
    #   lỗi NẶNG HƠN so sánh sai theo hướng bất lợi.
    #
    # Cách đúng: so mọi mô hình trên TẬP CHUNG — nơi cả FINDRISC, ADA và feature
    # đều tính được. Đây là điều reviewer sẽ đòi (phản biện #5, TO_DO §9).
    score_cols = [("findrisc_score", "FINDRISC (không train)"),
                  ("ada_score", "ADA/CDC (không train)")]
    raw_scores: list[tuple[str, np.ndarray]] = []
    if args.scores.exists():
        sc = pd.read_csv(args.scores)
        keep = sc["y_undiagnosed_dm"].notna().to_numpy()
        for col, nice in score_cols:
            if col in sc.columns:
                raw_scores.append((nice, sc.loc[keep, col].to_numpy(float)))

    z0 = np.load(files[0])
    n_all = len(z0["y"])
    mask = np.ones(n_all, dtype=bool)
    for _, s in raw_scores:
        mask &= ~np.isnan(s)
    if args.subset == "full":
        mask = np.ones(n_all, dtype=bool)

    n_used = int(mask.sum())
    print(f"\n  Tập so sánh: {args.subset}  →  {n_used:,}/{n_all:,} mẫu "
          f"({n_used / n_all * 100:.1f}%)")
    if args.subset == "common" and n_used < n_all:
        print(f"  (loại {n_all - n_used:,} người không tính được đủ cả 2 thang điểm — "
              f"để so sánh công bằng)")

    rows, series = [], []
    y = w = None
    for f in files:
        z = np.load(f)
        y, w = z["y"][mask], z["w"][mask]
        kind = f.stem.split("_", 2)[2]
        nice = {"logreg": "Hồi quy logistic", "lgbm": "LightGBM"}.get(kind, kind)
        rows.append(summarise(y, z["oof"][:, mask], w, nice, is_prob=True))
        # Đường cong vẽ từ dự đoán TRUNG BÌNH các seed (như một ensemble) nên AUROC
        # trong chú giải hình có thể CAO HƠN cột AUROC của bảng vài phần nghìn —
        # bảng báo trung bình AUROC TỪNG seed. Hai con số trả lời hai câu khác nhau.
        series.append((nice, z["oof"][:, mask].mean(axis=0), True))
        print(f"  đọc {f.name}  ({z['oof'].shape[0]} seed)")

    for nice, s in raw_scores:                       # thang điểm KHÔNG train -> 1 "seed"
        s = s[mask]
        if np.isnan(s).any():                        # chỉ xảy ra ở --subset full
            s = np.where(np.isnan(s), np.nanmedian(s), s)
            print(f"  ! {nice}: {int(np.isnan(s).sum())} giá trị thiếu đã gán trung vị "
                  f"(chỉ hợp lệ ở --subset full; KHAI BÁO trong Methods)")
        p = (s - s.min()) / (s.max() - s.min() + EPS)   # co về [0,1] chỉ để vẽ ROC/PR
        rows.append(summarise(y, p, w, nice, is_prob=False))
        series.append((nice, p, False))

    rows.sort(key=lambda m: -m["raw_auroc"])
    report(rows, args.protocol, n_used, n_all, args.subset)

    if args.md:
        write_md(rows, args.md, args.protocol)
    if not args.no_figures:
        make_figures(y, series, w, args.results, args.protocol)

    print("\n  ⚠ Thang điểm lâm sàng được co về [0,1] tuyến tính để vẽ calibration —")
    print("    cột Brier/slope của chúng KHÔNG so trực tiếp được với mô hình ML.")
    print("    Chỉ AUROC/AUPRC/PPV của chúng là so được. Ghi rõ điều này trong Methods.")
    print("\n→ Bước tiếp theo: T0.9 (decision curve / net benefit — Fig 4)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
