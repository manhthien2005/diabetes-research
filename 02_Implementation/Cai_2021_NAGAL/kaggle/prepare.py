"""Build new Kaggle upload folders from committed source; never uploads by itself."""
import argparse
import hashlib
import io
import json
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
MODULE = ROOT.relative_to(REPO).as_posix()


def git(*args):
    return subprocess.check_output(['git', *args], cwd=REPO)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--username', required=True)
    p.add_argument('--data', required=True)
    p.add_argument('--public', action='store_true')
    p.add_argument('--suffix', default='20261105')
    args = p.parse_args()
    commit = git('rev-parse', 'HEAD').decode().strip()
    tracked = git('ls-tree', '-r', '--name-only', 'HEAD', MODULE).decode().splitlines()
    selected = [f for f in tracked if f.startswith(MODULE+'/src/') or f.startswith(MODULE+'/tests/') or f in [MODULE+'/config.json', MODULE+'/requirements.txt']]
    if not selected:
        raise ValueError('Commit module source before preparing Kaggle')
    # Reject uncommitted executable differences; package only immutable Git bytes.
    for path in selected:
        if (REPO/path).read_bytes() != git('show', 'HEAD:'+path):
            raise ValueError('Uncommitted executable source: '+path)
    output = ROOT/'kaggle/upload'/args.suffix
    output.mkdir(parents=True, exist_ok=False)
    dataset = output/'dataset'; notebook = output/'notebook'
    dataset.mkdir(); notebook.mkdir()
    blob = Path(args.data).read_bytes()
    if Path(args.data).suffix.lower() == '.zip':
        with zipfile.ZipFile(io.BytesIO(blob)) as z:
            names = [n for n in z.namelist() if n.lower().endswith('.xlsx')]
            if len(names) != 1:
                raise ValueError('Expected one workbook')
            blob = z.read(names[0])
    config = json.loads(git('show', 'HEAD:'+MODULE+'/config.json'))
    if hashlib.sha256(blob).hexdigest() != config['dataset_sha256']:
        raise ValueError('Workbook checksum mismatch')
    (dataset/'Data set Int J Obesity.xlsx').write_bytes(blob)
    data_ref = args.username+'/cai2021-nagala-original-'+args.suffix
    notebook_ref = args.username+'/cai2021-nagala-reconstruction-'+args.suffix
    meta = {'title': 'Cai2021 NAGALA Original '+args.suffix, 'id': data_ref, 'licenses': [{'name': 'CC0-1.0'}],
            'description': 'Unmodified workbook from Okamura et al., Dryad 10.5061/dryad.8q0p192, listed version 2019-02-19. Original study DOI 10.1038/s41366-018-0076-3. Rehosted for same-data method reconstruction of Cai 2021 (10.2147/DMSO.S304994). Cite the original data creators. Workbook SHA256: '+config['dataset_sha256']}
    (dataset/'dataset-metadata.json').write_text(json.dumps(meta, indent=2), encoding='utf-8')
    (dataset/'data_source.json').write_text(json.dumps({'dataset_doi': '10.5061/dryad.8q0p192', 'release': '2019-02-19', 'workbook_sha256': config['dataset_sha256'], 'modified': False}, indent=2), encoding='utf-8')
    files = {f[len(MODULE)+1:]: hashlib.sha256(git('show', 'HEAD:'+f)).hexdigest() for f in selected}
    nb = json.loads(git('show', 'HEAD:'+MODULE+'/kaggle/Cai_2021_NAGALA.ipynb'))
    for cell in nb['cells']:
        if cell['cell_type'] == 'code':
            cell['source'] = ''.join(cell['source']).replace('__SOURCE_COMMIT__', commit).replace('__MODULE_PATH__', MODULE).replace('__NOTEBOOK_REF__', notebook_ref).replace('__SOURCE_FILES_JSON__', repr(files))
            compile(cell['source'], '<Kaggle notebook cell>', 'exec')
    (notebook/'Cai_2021_NAGALA.ipynb').write_text(json.dumps(nb, indent=2, ensure_ascii=False), encoding='utf-8')
    kernel_meta = {'id': notebook_ref, 'title': 'Cai2021 NAGALA Reconstruction '+args.suffix,
                   'code_file': 'Cai_2021_NAGALA.ipynb', 'language': 'python', 'kernel_type': 'notebook',
                   'is_private': not args.public, 'enable_gpu': False, 'enable_tpu': False, 'enable_internet': True,
                   'dataset_sources': [data_ref], 'competition_sources': [], 'kernel_sources': []}
    (notebook/'kernel-metadata.json').write_text(json.dumps(kernel_meta, indent=2), encoding='utf-8')
    record = {'git_commit': commit, 'dataset': data_ref, 'notebook': notebook_ref, 'requested_public': args.public,
              'workbook_sha256': config['dataset_sha256'], 'source_files': files, 'upload_path': str(output)}
    (output/'prepared.json').write_text(json.dumps(record, indent=2), encoding='utf-8')
    print(json.dumps({k: record[k] for k in ['git_commit', 'dataset', 'notebook', 'requested_public', 'upload_path']}))


if __name__ == '__main__':
    main()
