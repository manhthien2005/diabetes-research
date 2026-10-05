"""Offline audit consistency gate. PASS is not certification of study validity."""
import ast
import csv
import hashlib
import json
import math
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[3]
STUDY = ROOT / '02_Implementation/BRFSS_Survey'
FINAL = ROOT / '03_Final_Result/BRFSS_2025'
MODELS = {'logistic_regression', 'decision_tree', 'random_forest',
          'gradient_boosting', 'xgboost', 'gaussian_naive_bayes'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def code_signature(nb):
    sources = [ast.dump(ast.parse(''.join(c['source'])), include_attributes=False)
               for c in nb['cells'] if c['cell_type'] == 'code']
    return hashlib.sha256(json.dumps(sources, separators=(',', ':')).encode()).hexdigest()


def validate_calibration(rows):
    require(len(rows) == 6 and {r['model_id'] for r in rows} == MODELS,
            'Calibration must contain each of the six probability models exactly once')
    for r in rows:
        for key in ['calibration_intercept', 'calibration_slope',
                    'calibration_intercept_se', 'calibration_slope_se',
                    'observed_prevalence', 'mean_predicted_probability', 'brier_score']:
            value = float(r[key])
            require(math.isfinite(value), f'Nonfinite {key}')
            if key.endswith('_se'):
                require(value >= 0, f'Negative standard error: {key}')
            if key in {'observed_prevalence', 'mean_predicted_probability', 'brier_score'}:
                require(0 <= value <= 1, f'Invalid range: {key}')


def validate_robustness(rows):
    expected = {(m, k) for m in ['gradient_boosting', 'xgboost', 'linear_svm']
                for k in ['roc_auc', 'average_precision']}
    require(len(rows) == 6 and {(r['model_b'], r['metric']) for r in rows} == expected,
            'Missing or duplicate robustness contrast')
    for r in rows:
        require(r['model_a'] == 'logistic_regression', 'Incorrect reference model')
        require(int(r['bootstrap_reps']) == 5000, 'Incorrect replicate count')
        lo, pt, hi = [float(r[k]) for k in ['ci95_lower', 'point_difference_a_minus_b', 'ci95_upper']]
        require(all(math.isfinite(x) and -1 <= x <= 1 for x in (lo, pt, hi)),
                'Invalid bounded-metric contrast')
        require(lo <= hi, 'Reversed interval')


def validate_checkout(source):
    require(not re.search(r'^\s+ref:\s*implement/BRFSS_survey\s*$', source, re.M),
            'Gate must check the requested event revision, not a hard-coded branch')


def figure_digest(filename, data):
    if filename.endswith('.csv'):
        data = data.replace(b'\r\n', b'\n')
    return hashlib.sha256(data).hexdigest()


def main():
    manifest = json.loads((STUDY / 'qc/astra_evidence_manifest.json').read_text(encoding='utf-8'))
    nb = json.loads((ROOT / manifest['canonical_notebook']).read_text(encoding='utf-8'))
    require(code_signature(nb) == manifest['scientific_code_ast_sha256'], 'Scientific code changed')
    ids = [c.get('id') for c in nb['cells']]
    require(all(ids) and len(set(ids)) == len(ids), 'Missing or duplicate cell IDs')
    for c in nb['cells']:
        if c['cell_type'] == 'code':
            compile(''.join(c['source']), c['id'], 'exec')
    for relative, expected in manifest['immutable_files_sha256'].items():
        actual = hashlib.sha256((ROOT / relative).read_bytes()).hexdigest()
        require(actual == expected, f'Frozen artifact changed: {relative}')
    with (FINAL / 'supplement/calibration_intercept_slope.csv').open() as f:
        validate_calibration(list(csv.DictReader(f)))
    with (FINAL / 'supplement/top4_paired_bootstrap_5000_robustness.csv').open() as f:
        validate_robustness(list(csv.DictReader(f)))
    validate_checkout((ROOT / '.github/workflows/brfss-presubmission-gate.yml').read_text(encoding='utf-8'))
    for pattern in ['bootstrap_1000_model_metrics_summary.csv', 'bootstrap_1000_pairwise_differences.csv']:
        require(not list(FINAL.rglob(pattern)), f'Known-invalid artifact present: {pattern}')
    for filename in ['ASTRA_FINAL_AUDIT_VI.md', 'ASTRA_REVIEWER_MATRIX.md',
                     'ASTRA_CHANGELOG.md', 'ASTRA_FINAL_STATE.md']:
        require((FINAL / filename).is_file(), f'Missing handoff: {filename}')
    stats = json.loads((STUDY / 'qc/astra_statistics_evidence.json').read_text(encoding='utf-8'))
    require(stats['source_sha256'] == manifest['prediction_sha256'], 'Prediction source mismatch')
    require(stats['n'] == 68508 and stats['positive_n'] == 10365, 'Cohort mismatch')
    require(stats['validation']['paired_200_bootstrap_max_abs_error'] < 1e-6, 'Bootstrap mismatch')
    require(stats['validation']['mcnemar_max_abs_error'] < 1e-10, 'McNemar mismatch')
    data = json.loads((STUDY / 'qc/astra_data_evidence.json').read_text(encoding='utf-8'))
    require(data['official_zip']['matches_local'], 'Official source mismatch')
    require(data['frozen_prediction_identity']['test_row_id_matches_in_order'] and
            data['frozen_prediction_identity']['y_true_matches_in_order'], 'Split mismatch')
    ledger = json.loads((STUDY / 'qc/astra_issue_ledger.json').read_text(encoding='utf-8'))
    require(not [i for i in ledger['issues'] if i['severity'] == 'FATAL'], 'FATAL issue remains')
    require(not [i for i in ledger['issues'] if i['severity'] == 'MAJOR' and i['status'] == 'open'],
            'Correctable MAJOR issue remains open')
    require(sum(x['before'] for x in ledger['rubric']) == ledger['score_before'], 'Pre-score mismatch')
    require(sum(x['after'] for x in ledger['rubric']) == ledger['score_after'], 'Post-score mismatch')
    required_issue_fields = {'id', 'severity', 'domain', 'finding', 'evidence',
                             'scientific_risk', 'decision', 'fix', 'verification',
                             'remaining_limitation', 'status'}
    require(all(required_issue_fields <= set(i) for i in ledger['issues']), 'Incomplete issue schema')
    reporting = json.loads((STUDY / 'qc/astra_reporting_matrix.json').read_text(encoding='utf-8'))
    require(len(reporting['items']) == 52 and
            len({i['item'] for i in reporting['items']}) == 52, 'TRIPOD item coverage mismatch')
    require(all(i['status'] in {'PRESENT', 'PARTIAL', 'MISSING', 'NA'}
                for i in reporting['items']), 'Invalid reporting status')
    reconstruction = json.loads((STUDY / 'qc/astra_bootstrap_reconstruction.json').read_text(encoding='utf-8'))
    require(len(reconstruction['results']) == 6 and
            all(0 <= r['max_abs_error'] < 1e-12 for r in reconstruction['results']),
            'Original 5000-replicate bootstrap not reproduced')
    figures = json.loads((STUDY / 'qc/astra_figure_manifest.json').read_text(encoding='utf-8'))
    require(figures['source_prediction_sha256'] == manifest['prediction_sha256'], 'Figure source mismatch')
    for filename, expected in figures['outputs_sha256'].items():
        require(figure_digest(filename, (FINAL / 'supplement/astra_figures' / filename).read_bytes())
                == expected, f'Figure output drift: {filename}')
    print(json.dumps({'status': 'PASS', 'scientific_code_unchanged': True,
                      'frozen_files_verified': len(manifest['immutable_files_sha256']),
                      'interpretation': 'Artifact consistency only; declared methodological limitations remain.'}, indent=2))


if __name__ == '__main__':
    main()
