"""Test the undocumented original 5000-replicate shuffle convention, no refitting."""
import json
from pathlib import Path
import numpy as np
import pandas as pd
from astra_statistics_audit import FrozenMetric, weights, TOP

Q = Path(__file__).resolve().parent
df = pd.read_csv(Q / 'astra_statistics_source/model_comparison/paired_test_predictions.csv.gz',
                 float_precision='round_trip')
y = df.y_true.to_numpy()
pos, neg = np.flatnonzero(y == 1), np.flatnonzero(y == 0)
engines = [FrozenMetric(y, df[m+'_pred'].to_numpy(), df[m+'_score'].to_numpy(),
                       m != 'linear_svm') for m in TOP]
rng = np.random.default_rng(20251010)
values = np.empty((5000, 4, 2))
for b in range(5000):
    w, _ = weights(rng, pos, neg, len(y), shuffle=False)
    for j, e in enumerate(engines):
        values[b, j] = e.rank(w)
old = pd.read_csv(Q.parents[2] / '03_Final_Result/BRFSS_2025/supplement/top4_paired_bootstrap_5000_robustness.csv')
rows = []
for j, model in enumerate(TOP[1:], 1):
    for k, metric in enumerate(['roc_auc', 'average_precision']):
        lo, hi = np.quantile(values[:, 0, k] - values[:, j, k], [.025, .975])
        r = old[(old.model_b == model) & (old.metric == metric)].iloc[0]
        rows.append(dict(model_b=model, metric=metric, ci95_lower=float(lo), ci95_upper=float(hi),
                         max_abs_error=max(abs(lo-r.ci95_lower), abs(hi-r.ci95_upper))))
report = dict(rng='numpy.random.default_rng (PCG64)', seed=20251010, replicates=5000,
              shuffle=False, quantile_method='linear', paired_indices=True, results=rows,
              note='Reverse-engineered matching convention, not recovered original generation code.')
(Q / 'astra_bootstrap_reconstruction.json').write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(report, indent=2))
