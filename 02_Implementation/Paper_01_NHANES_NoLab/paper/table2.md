# Table 2 — Hiệu năng, giao thức A

> Sinh tự động bởi `src/evaluate.py`. Mean ± SD qua các seed của nested CV.

| Model | AUROC | AUPRC | AUPRC/prev | PPV@Sn80 | % flagged | Brier | Calib. slope |
|---|---|---|---|---|---|---|---|
| Hồi quy logistic | 0.765 ± 0.005 | 0.141 ± 0.006 | 2.8× | 0.100 | 40.3% | 0.046 | 0.88 |
| FINDRISC (không train) | 0.751 | 0.168 | 3.3× | 0.082 | 51.1% | 0.194 | 0.42 |
| ADA/CDC (không train) | 0.742 | 0.116 | 2.3× | 0.092 | 44.1% | 0.206 | 0.46 |
| LightGBM | 0.742 ± 0.010 | 0.133 ± 0.012 | 2.6× | 0.088 | 46.2% | 0.047 | 0.75 |

Đường nền AUPRC = prevalence = 0.0502.

# Table 6 — Cùng bảng, CÓ trọng số khảo sát (giao thức A)

| Model | AUROC | AUPRC | PPV@Sn80 | Brier | ΔAUROC vs không trọng số |
|---|---|---|---|---|---|
| Hồi quy logistic | 0.795 ± 0.007 | 0.117 ± 0.005 | 0.065 | 0.029 | +0.029 |
| FINDRISC (không train) | 0.760 | 0.120 | 0.055 | 0.183 | +0.009 |
| ADA/CDC (không train) | 0.770 | 0.089 | 0.066 | 0.187 | +0.028 |
| LightGBM | 0.765 ± 0.014 | 0.104 ± 0.019 | 0.060 | 0.030 | +0.023 |
