"""Fetch one terminal Kaggle notebook version and verify scientific provenance."""
import argparse
import hashlib
import json
from pathlib import Path
from kaggle.api.kaggle_api_extended import KaggleApi

ROOT = Path(__file__).resolve().parents[1]


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--launch', required=True)
    p.add_argument('--output', required=True)
    args = p.parse_args()
    launch = json.loads(Path(args.launch).read_text(encoding='utf-8'))
    ref = launch['notebook_ref']+'/'+str(launch['notebook_version'])
    api = KaggleApi(); api.authenticate()
    status = api.kernels_status(ref).to_dict()
    if status['status'] not in ['COMPLETE', 'ERROR', 'CANCELLED']:
        print(json.dumps(status)); return
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=False)
    api.kernels_output(ref, str(output), force=False, quiet=True)
    report = {'platform_status': status['status'], 'notebook_ref': launch['notebook_ref'],
              'notebook_version': launch['notebook_version'], 'kernel_id': launch['kernel_id'],
              'expected_git_commit': launch['source_commit'], 'checks': {}}
    manifests = list(output.rglob('run_manifest.json'))
    if len(manifests) == 1:
        study = manifests[0].parent
        manifest = json.loads(manifests[0].read_text(encoding='utf-8'))
        report['study_path'] = str(study)
        report['study_status'] = manifest['status']
        report['final_test_used'] = manifest['final_test_used']
        report['checks']['commit'] = manifest['git_commit'] == launch['source_commit']
        report['checks']['workbook'] = manifest.get('dataset_sha256') == launch['workbook_sha256']
        report['checks']['notebook_version'] = str(manifest['kaggle_version']) == str(launch['notebook_version'])
        report['checks']['notebook_ref'] = manifest['kaggle_notebook'] == launch['notebook_ref']
        if (study/'pipeline_freeze.json').exists():
            freeze = json.loads((study/'pipeline_freeze.json').read_text(encoding='utf-8'))
            report['checks']['freeze_before_test'] = freeze['frozen_before_final_test'] and not freeze['test_used_for_model_selection']
            report['checks']['source_freeze'] = freeze['source_sha256'] == manifest['source_sha256']
            report['checks']['config_freeze'] = freeze['config_sha256'] == manifest['config_sha256']
            for name, expected in freeze['models_sha256'].items():
                report['checks'][name+'_model'] = hashlib.sha256((study/(name+'_model.json')).read_bytes()).hexdigest() == expected
        else:
            report['checks']['freeze_before_test'] = False
        if status['status'] == 'COMPLETE':
            if manifest['status'] not in ['complete', 'complete_with_diagnostic_warnings'] or not all(report['checks'].values()):
                raise ValueError('Kaggle terminal completion did not pass provenance checks')
    else:
        report['study_status'] = 'manifest_unavailable; inspect kernel log'
    report['files_sha256'] = {f.relative_to(output).as_posix(): hashlib.sha256(f.read_bytes()).hexdigest() for f in output.rglob('*') if f.is_file()}
    (output/'readback_verification.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k != 'files_sha256'}))


if __name__ == '__main__':
    main()
