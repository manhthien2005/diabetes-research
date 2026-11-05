import importlib.util
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'src'))


class IntegrityTests(unittest.TestCase):
    def test_outcome_and_duration_cannot_enter_predictors(self):
        from nagala_data import assert_predictors
        for name in ['event', 'time', 'patient_id']:
            with self.assertRaises(ValueError):
                assert_predictors(['age', name])

    def test_early_censoring_is_unknown_not_control(self):
        from survival_eval import horizon_status
        self.assertEqual(horizon_status([100, 100, 2000, 2000], [0, 1, 0, 1], 1826.25), [None, 1, 0, 0])

    def test_cohort_bmi_boundary(self):
        import pandas as pd
        from nagala_data import select_cohort
        d = pd.DataFrame({'bmi': [24.99, 25., 26.], 'event': [1, 0, 1], 'time': [300, 400, 500], 'patient_id': [1, 2, 3]})
        self.assertEqual(select_cohort(d).patient_id.tolist(), [1])

    def test_duplicate_subjects_are_rejected(self):
        import pandas as pd
        from nagala_data import select_cohort
        d = pd.DataFrame({'bmi': [22., 23.], 'event': [0, 1], 'time': [300, 400], 'patient_id': [1, 1]})
        with self.assertRaises(ValueError):
            select_cohort(d)

    def test_saved_cox_bundle_recovers_library_step_survival(self):
        import json
        import numpy as np
        import pandas as pd
        from cox_model import fit_cox, predict_risk
        rng = np.random.default_rng(81)
        x = rng.normal(size=400)
        t = rng.exponential(2000 / np.exp(x * .4)) + 1
        c = rng.uniform(1000, 5000, size=400)
        d = pd.DataFrame({'age': x, 'time': np.minimum(t, c), 'event': (t <= c).astype(int)})
        model, bundle, _ = fit_cox(d, ['age'])
        # Evaluate at an exact baseline jump: both methods then use the same step.
        horizon = float(model.baseline_survival_.index[len(model.baseline_survival_) // 2])
        expected = 1-model.predict_survival_function(d[['age']], times=[horizon]).iloc[0].to_numpy()
        actual = predict_risk(json.loads(json.dumps(bundle)), d, horizon)
        np.testing.assert_allclose(actual, expected, atol=1e-12)
        with self.assertRaises(ValueError):
            predict_risk(bundle, d, float(d.time.max()) + 1)

    def test_scaling_is_fitted_on_training_only(self):
        import numpy as np
        import pandas as pd
        from cox_model import scale_fold
        tr = pd.DataFrame({'age': [0., 2.]})
        va = pd.DataFrame({'age': [1000.]})
        a, b, scaler = scale_fold(tr, va)
        np.testing.assert_allclose(scaler.mean_, [1.])
        self.assertGreater(b[0, 0], 900)


if __name__ == '__main__':
    unittest.main()
