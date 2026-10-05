"""Regression tests for material audit/release failure modes."""
import copy
import csv
from pathlib import Path
import unittest

import astra_release_gate as gate

FINAL = Path(__file__).resolve().parents[3] / '03_Final_Result/BRFSS_2025'


class ReleaseTests(unittest.TestCase):
    def test_duplicate_calibration_model_is_rejected(self):
        with (FINAL / 'supplement/calibration_intercept_slope.csv').open() as f:
            rows = list(csv.DictReader(f))
        gate.validate_calibration(rows)
        rows[-1] = rows[0].copy()
        with self.assertRaises(ValueError):
            gate.validate_calibration(rows)

    def test_nonfinite_intercept_is_rejected(self):
        with (FINAL / 'supplement/calibration_intercept_slope.csv').open() as f:
            rows = list(csv.DictReader(f))
        rows[0]['calibration_intercept'] = 'nan'
        with self.assertRaises(ValueError):
            gate.validate_calibration(rows)

    def test_negative_slope_is_a_result_not_invalid_input(self):
        with (FINAL / 'supplement/calibration_intercept_slope.csv').open() as f:
            rows = list(csv.DictReader(f))
        rows[0]['calibration_slope'] = '-0.2'
        gate.validate_calibration(rows)

    def test_duplicate_contrast_is_rejected(self):
        with (FINAL / 'supplement/top4_paired_bootstrap_5000_robustness.csv').open() as f:
            rows = list(csv.DictReader(f))
        gate.validate_robustness(rows)
        rows[-1] = rows[0].copy()
        with self.assertRaises(ValueError):
            gate.validate_robustness(rows)

    def test_code_signature_allows_prose_but_detects_scientific_change(self):
        nb = {'cells': [{'cell_type': 'markdown', 'source': ['old']},
                        {'cell_type': 'code', 'source': ['C = 1.0\n']}]}
        changed = copy.deepcopy(nb)
        changed['cells'][0]['source'] = ['new']
        self.assertEqual(gate.code_signature(nb), gate.code_signature(changed))
        changed['cells'][1]['source'] = ['C = 2.0\n']
        self.assertNotEqual(gate.code_signature(nb), gate.code_signature(changed))

    def test_workflow_checks_the_requested_revision(self):
        workflow = FINAL.parents[1] / '.github/workflows/brfss-presubmission-gate.yml'
        gate.validate_checkout(workflow.read_text(encoding='utf-8'))
        self.assertIn('python-version: "3.12"', workflow.read_text(encoding='utf-8'))

    def test_figure_csv_hash_tolerates_checkout_newlines_only(self):
        self.assertEqual(gate.figure_digest('bins.csv', b'value\r\n0.5\r\n'),
                         gate.figure_digest('bins.csv', b'value\n0.5\n'))
        self.assertNotEqual(gate.figure_digest('bins.csv', b'value\n0.5\n'),
                            gate.figure_digest('bins.csv', b'value\n0.6\n'))
        self.assertNotEqual(gate.figure_digest('plot.png', b'a\r\nb'),
                            gate.figure_digest('plot.png', b'a\nb'))


if __name__ == '__main__':
    unittest.main()
