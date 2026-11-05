import sys
import unittest
from pathlib import Path
import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'src'))


class EvaluationTests(unittest.TestCase):
    def test_rare_event_calibration_returns_finite_slope(self):
        from survival_eval import calibration
        rng = np.random.default_rng(0)
        x = rng.normal(size=12940)
        t = rng.exponential(200000 / np.exp(.7*x))
        c = rng.uniform(100, 4500, len(x))
        d = pd.DataFrame({'time': np.minimum(t, c), 'event': (t <= c).astype(int)})
        p = 1-np.exp(-1826.25/200000*np.exp(.7*x))
        result, _ = calibration(d.iloc[:9705], d.iloc[9705:], p[9705:], 1826.25)
        self.assertIsNotNone(result['slope'])
        self.assertTrue(np.isfinite(result['slope']))

    def test_survival_metrics_handle_early_censoring(self):
        from survival_eval import metric_values, calibration
        rng = np.random.default_rng(25)
        t = rng.exponential(3000, size=600)+1
        c = rng.uniform(500, 5000, size=600)
        d = pd.DataFrame({'time': np.minimum(t, c), 'event': (t <= c).astype(int)})
        dev, test = d.iloc[:400], d.iloc[400:]
        risks = rng.uniform(.01, .5, len(test))
        result = metric_values(dev, test, risks, risks, 1826.25)
        self.assertTrue(all(np.isfinite(list(result.values()))))
        self.assertTrue(0 <= result['auc_5y_ipcw'] <= 1)
        diagnostic, groups = calibration(dev, test, risks, 1826.25)
        self.assertGreater(diagnostic['early_censored_n'], 0)
        self.assertEqual(int(groups.n.sum()), len(test))

    def test_lasso_selection_on_synthetic_development_only(self):
        from cox_model import select_lasso
        rng = np.random.default_rng(8)
        x = pd.DataFrame({'age': rng.normal(size=350), 'ggt': rng.normal(size=350)})
        t = rng.exponential(2000 / np.exp(x.age.to_numpy() * .9))+1
        c = rng.uniform(1500, 5000, len(x))
        config = {'alpha_max': .1, 'alpha_min': .001, 'alpha_count': 10, 'cv_folds': 3, 'seed': 8}
        features, table, detail = select_lasso(x, np.minimum(t, c), (t <= c).astype(int), config)
        self.assertIn('age', features)
        self.assertEqual(int(table.selected.sum()), 1)
        self.assertEqual(detail['candidate_features'], ['age', 'ggt'])


if __name__ == '__main__':
    unittest.main()
