"""One-shot locked study runner, shared by local checks and Kaggle."""
import argparse
import hashlib
import importlib.metadata
import json
import os
import platform
import subprocess
import sys
import traceback
from datetime import datetime, timezone
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split

from nagala_data import audit_source, design_matrix, dump_json, PUBLISHED_SIX
from cox_model import fit_cox, predict_risk, linear_predictor, select_lasso
from survival_eval import bootstrap_metrics, calibration

ROOT = Path(__file__).resolve().parents[1]


def source_hash(root=ROOT):
    paths = sorted(list((root/'src').glob('*.py')) + [root/'config.json', root/'requirements.txt'])
    h = hashlib.sha256()
    for path in paths:
        h.update(path.relative_to(root).as_posix().encode()+b'\0'+path.read_bytes())
    return h.hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--data', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--config', default=str(ROOT/'config.json'))
    parser.add_argument('--audit-only', action='store_true')
    args = parser.parse_args()
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=False)
    config = json.loads(Path(args.config).read_text(encoding='utf-8'))
    manifest = {'study_id': config['study_id'], 'started_at_utc': datetime.now(timezone.utc).isoformat(),
                'status': 'running', 'config': config, 'source_sha256': source_hash(),
                'config_sha256': hashlib.sha256(Path(args.config).read_bytes()).hexdigest(),
                'python': platform.python_version(), 'platform': platform.platform(),
                'libraries': {p: importlib.metadata.version(p) for p in ['numpy', 'pandas', 'scipy', 'scikit-learn', 'scikit-survival', 'lifelines', 'openpyxl', 'matplotlib']},
                'git_commit': os.environ.get('SOURCE_GIT_COMMIT'), 'kaggle_notebook': os.environ.get('KAGGLE_NOTEBOOK_REF'),
                'kaggle_version': os.environ.get('KAGGLE_NOTEBOOK_VERSION'),
                'kaggle_run_type': os.environ.get('KAGGLE_KERNEL_RUN_TYPE'),
                'output_path': str(output), 'final_test_used': False}
    if (ROOT/'source_provenance.json').exists():
        manifest['packaged_source'] = json.loads((ROOT/'source_provenance.json').read_text())
        manifest['git_commit'] = manifest['packaged_source'].get('git_commit')
    dump_json(output/'run_manifest.json', manifest)
    try:
        cohort, audit = audit_source(args.data, config, output)
        manifest['dataset_sha256'] = audit['workbook_sha256']
        if args.audit_only:
            manifest['status'] = 'audit_complete'
            return
        x = design_matrix(cohort)
        tr, te = train_test_split(np.arange(len(cohort)), test_size=config['test_fraction'], random_state=config['seed'], stratify=cohort.event)
        dev, test = cohort.iloc[tr].copy(), cohort.iloc[te].copy()
        for column in x.columns:
            dev[column] = x.iloc[tr][column].to_numpy()
            test[column] = x.iloc[te][column].to_numpy()
        if set(dev.patient_id) & set(test.patient_id):
            raise ValueError('Subject overlap')
        # IDs are hashed in the public manifest, never exported as public tables.
        manifest['split'] = {label: {'n': len(d), 'events': int(d.event.sum()),
                                      'sorted_ids_sha256': hashlib.sha256(','.join(map(str, sorted(d.patient_id))).encode()).hexdigest()}
                             for label, d in [('development', dev), ('internal_test', test)]}
        selected, cv_table, selection = select_lasso(x.iloc[tr], dev.time.to_numpy(), dev.event.to_numpy(), config)
        cv_table.to_csv(output/'lasso_cv.csv', index=False)
        dump_json(output/'lasso_selection.json', selection)
        bundles = {}
        for name, features in [('published_six_cox', PUBLISHED_SIX), ('lasso_cox', selected)]:
            model, bundle, ph = fit_cox(dev, features)
            bundle['model_name'] = name
            dump_json(output/(name+'_model.json'), bundle)
            ph.to_csv(output/(name+'_ph_test.csv'), index=False)
            model.summary.to_csv(output/(name+'_coefficients.csv'))
            bundles[name] = bundle
        # This immutable file is written BEFORE computing test predictions/metrics.
        freeze = {'source_sha256': manifest['source_sha256'], 'config_sha256': manifest['config_sha256'],
                  'models_sha256': {name: hashlib.sha256((output/(name+'_model.json')).read_bytes()).hexdigest() for name in bundles},
                  'frozen_before_final_test': True, 'test_used_for_model_selection': False}
        dump_json(output/'pipeline_freeze.json', freeze)
        manifest['final_test_used'] = True
        dump_json(output/'run_manifest.json', manifest)
        results = {}
        for name, bundle in bundles.items():
            risks = predict_risk(bundle, test, config['horizon_days'])
            linear = linear_predictor(bundle, test)
            result = bootstrap_metrics(dev, test, risks, linear, config['horizon_days'], config['bootstrap_replicates'], config['seed']+1)
            # Preserve each completed evaluation even if a later diagnostic fails.
            dump_json(output/(name+'_test_metrics.json'), result)
            cal, groups = calibration(dev, test, risks, config['horizon_days'])
            result['calibration'] = cal
            dump_json(output/(name+'_test_metrics.json'), result)
            results[name] = result
            dump_json(output/'test_results.json', results)
            groups.to_csv(output/(name+'_calibration.csv'), index=False)
            fig, ax = plt.subplots(figsize=(5, 4))
            ax.plot(groups.mean_predicted, groups.observed_km_5y, 'o-', label='Internal test: 1-KM')
            limit = max(groups.mean_predicted.max(), groups.observed_km_5y.max()) * 1.1
            ax.plot([0, limit], [0, limit], '--', color='grey')
            ax.set(xlabel='Mean predicted five-year risk', ylabel='Observed five-year risk (Kaplan-Meier)', title=name)
            ax.legend(); fig.tight_layout(); fig.savefig(output/(name+'_calibration.png'), dpi=180); plt.close(fig)
        dump_json(output/'test_results.json', results)
        manifest['status'] = 'complete'
        manifest['diagnostic_warnings'] = [name+': calibration optimization failed' for name, r in results.items()
                                           if r['calibration']['slope'] is None or r['calibration']['intercept_slope_fixed_one'] is None]
        if manifest['diagnostic_warnings']:
            manifest['status'] = 'complete_with_diagnostic_warnings'
    except Exception as exc:
        manifest['status'] = 'failed'
        manifest['error_type'] = type(exc).__name__
        manifest['error'] = str(exc)
        (output/'traceback.txt').write_text(traceback.format_exc(), encoding='utf-8')
        raise
    finally:
        manifest['finished_at_utc'] = datetime.now(timezone.utc).isoformat()
        dump_json(output/'run_manifest.json', manifest)
        print(json.dumps({'status': manifest['status'], 'output': str(output), 'source_sha256': manifest['source_sha256']}))


if __name__ == '__main__':
    main()
