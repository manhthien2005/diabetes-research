"""Source-bound NAGALA audit. Never mutates or exports participant source records."""
import hashlib
import io
import json
import zipfile
from pathlib import Path

import numpy as np
import pandas as pd

HEADER = {
    'patient_id': 'Patient Number',
    'sex': 'Sex, 1:Men, 2:Women',
    'age': 'Baseline Age, yrs',
    'ethanol': 'Baseline Ethanol consumption g/wk',
    'fatty_liver': 'Baseline Fatty liver 0/1',
    'bmi': 'Baseline BMI, kg/m2',
    'waist': 'Baseline Waist circumference(WC), cm',
    'time': 'Follow up duration, days',
    'alt': 'Baseline ALT, IU/L',
    'ast': 'Baseline AST, IU/L',
    'weight': 'Baseline Body Weight, kg',
    'exercise': 'Baseline Habit of exercise 0/1',
    'ggt': 'Baseline GGT, IU/L',
    'hdl_mg': 'Baseline HDL-cholesterol, mg/dL',
    'hdl': 'Baseline HDL-cholesterol, mmol/L',
    'tc': 'Baseline Total Cholesterol, mmol/L',
    'tg': 'Baseline Triglycerides, mmol/L',
    'hba1c': 'Baseline HbA1c, mmol/mol',
    'alcohol': 'Baseline Alcohol consumption, non:1, light:2, moderate:3, heavy:4',
    'smoking': 'Baseline Smoking status, 1:never, 2:past, 3:current',
    'fpg': 'Baseline Fasting plasma glucose, mg/dl',
    'sbp': 'Baseline Systolic blood pressure, mmHg',
    'dbp': 'Baseline Diastolic blood pressure, mmHg',
    'event': 'Incident DM 0/1',
}
CANDIDATES = ['age', 'bmi', 'waist', 'alt', 'ast', 'ggt', 'hdl', 'tc', 'tg', 'hba1c', 'fpg', 'sbp', 'dbp', 'sex', 'fatty_liver', 'exercise', 'alcohol', 'smoking']
PUBLISHED_SIX = ['age', 'fatty_liver', 'ggt', 'tg', 'hba1c', 'fpg']
UNITS = {'age': 'years', 'bmi': 'kg/m2', 'waist': 'cm', 'alt': 'IU/L', 'ast': 'IU/L', 'ggt': 'IU/L', 'hdl': 'mmol/L', 'tc': 'mmol/L', 'tg': 'mmol/L', 'hba1c': 'mmol/mol', 'fpg': 'mg/dL', 'sbp': 'mmHg', 'dbp': 'mmHg', 'time': 'days', 'weight': 'kg', 'ethanol': 'g/week'}


def sha256(blob):
    return hashlib.sha256(blob).hexdigest()


def dump_json(path, value):
    Path(path).write_text(json.dumps(value, indent=2, ensure_ascii=False, allow_nan=False) + '\n', encoding='utf-8')


def read_source(path, expected_sha=None):
    path = Path(path)
    blob = path.read_bytes()
    archive_sha = None
    if path.suffix.lower() == '.zip':
        archive_sha = sha256(blob)
        with zipfile.ZipFile(io.BytesIO(blob)) as archive:
            names = [n for n in archive.namelist() if n.lower().endswith('.xlsx')]
            if len(names) != 1:
                raise ValueError('Expected exactly one source workbook in ZIP')
            name = names[0]
            blob = archive.read(name)
    else:
        name = path.name
    digest = sha256(blob)
    if expected_sha and digest != expected_sha:
        raise ValueError('Workbook checksum differs from audited source')
    sheets = pd.read_excel(io.BytesIO(blob), sheet_name=None)
    if list(sheets) != ['Sheet 1']:
        raise ValueError('Unexpected workbook sheets; audit before modeling')
    raw = sheets['Sheet 1']
    if not set(HEADER.values()).issubset(raw.columns):
        raise ValueError('Required source headers differ; no positional guessing')
    canonical = raw.rename(columns={v: k for k, v in HEADER.items()})
    paired = canonical.hdl.eq(0) & canonical.hdl_mg.isna()
    if not canonical.hdl.eq(0).equals(paired):
        raise ValueError('Unexpected HDL zero without paired missing mg/dL value')
    canonical.loc[paired, 'hdl'] = np.nan
    return raw, canonical, {
        'source_file': name, 'workbook_sha256': digest, 'archive_sha256': archive_sha,
        'source_bytes': len(blob), 'sheet_names': list(sheets),
        'raw_shape': list(raw.shape),
        'raw_missing': {c: int(v) for c, v in raw.isna().sum().items()},
        'hdl_paired_zero_missing': int(paired.sum()),
        'duplicate_rows': int(raw.duplicated().sum()),
        'duplicate_ids': int(canonical.patient_id.duplicated().sum()),
        'source_event_counts': {str(k): int(v) for k, v in canonical.event.value_counts().items()},
        'source_sex_counts': {str(k): int(v) for k, v in canonical.sex.value_counts().items()},
    }


def assert_predictors(names):
    allowed = set(CANDIDATES) | {'alcohol_2', 'alcohol_3', 'alcohol_4', 'smoking_2', 'smoking_3'}
    if not names or len(set(names)) != len(names) or not set(names).issubset(allowed):
        raise ValueError('Empty/duplicated/unapproved predictor or outcome/time/identifier leakage')


def select_cohort(data):
    if data.patient_id.isna().any() or data.patient_id.duplicated().any():
        raise ValueError('Missing or repeated participant IDs')
    if data[['bmi', 'time', 'event']].isna().any().any():
        raise ValueError('Missing cohort, event or time field')
    if not data.event.isin([0, 1]).all() or not np.isfinite(data.time).all() or (data.time <= 0).any():
        raise ValueError('Invalid event code or follow-up time')
    return data.loc[data.bmi < 25].copy()


def design_matrix(cohort):
    out = cohort[CANDIDATES].copy()
    for field, levels in [('alcohol', [1, 2, 3, 4]), ('smoking', [1, 2, 3])]:
        if not out[field].isin(levels).all():
            raise ValueError('Undocumented categorical code: ' + field)
        for level in levels[1:]:
            out[f'{field}_{level}'] = (out[field] == level).astype(float)
        out = out.drop(columns=field)
    for field in ['sex', 'fatty_liver', 'exercise']:
        if not out[field].isin([0, 1]).all():
            raise ValueError('Undocumented binary code: ' + field)
    if out.drop(columns='hdl').isna().any().any() or np.isinf(out.to_numpy()).any():
        raise ValueError('Undocumented missing/nonfinite candidate value')
    assert_predictors(out.columns.tolist())
    return out.astype(float)


def audit_source(path, config, output):
    raw, data, provenance = read_source(path, config['dataset_sha256'])
    cohort = select_cohort(data)
    design_matrix(cohort)
    provenance['cohort'] = {
        'rule': 'baseline BMI <25 kg/m2; supplied source cohort upstream exclusions not independently reconstructable',
        'raw_n': len(data), 'excluded_bmi_ge25': int((data.bmi >= 25).sum()),
        'n': len(cohort), 'events_all_followup': int(cohort.event.sum()),
        'followup_quantiles_days': {str(k): float(v) for k, v in cohort.time.quantile([0, .25, .5, .75, 1]).items()},
        'censored_before_five_years': int(((cohort.event == 0) & (cohort.time < config['horizon_days'])).sum()),
        'events_by_five_years': int(((cohort.event == 1) & (cohort.time <= config['horizon_days'])).sum()),
        'at_risk_at_five_years': int((cohort.time >= config['horizon_days']).sum()),
        'missing_after_sentinel_handling': {c: int(n) for c, n in cohort[CANDIDATES].isna().sum().items()},
        'sex_counts': {str(k): int(v) for k, v in cohort.sex.value_counts().items()},
        'fatty_liver_counts': {str(k): int(v) for k, v in cohort.fatty_liver.value_counts().items()},
        'exercise_counts': {str(k): int(v) for k, v in cohort.exercise.value_counts().items()},
    }
    provenance['matches_published_n_and_events'] = len(cohort) == 12940 and int(cohort.event.sum()) == 201
    provenance['coding_resolution'] = config['sex_resolution']
    Path(output).mkdir(parents=True, exist_ok=True)
    dump_json(Path(output) / 'data_audit.json', provenance)
    return cohort, provenance
