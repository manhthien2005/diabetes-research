"""Regenerate source-bound metadata after the workbook audit, no individual data."""
import argparse
import json
from pathlib import Path
from nagala_data import HEADER, CANDIDATES, UNITS, read_source, dump_json


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--data', required=True)
    p.add_argument('--output', required=True)
    args = p.parse_args()
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    raw, data, audit = read_source(args.data)
    evidence = [{'type': 'codebook', 'title': 'Dryad original workbook header, Sheet 1 row 1',
                 'url_or_identifier': '10.5061/dryad.8q0p192', 'location': 'Sheet 1; header row; SHA256 '+audit['workbook_sha256'], 'accessed_or_verified_date': '2026-11-05'},
                {'type': 'publication', 'title': 'Cai et al. 2021', 'url_or_identifier': '10.2147/DMSO.S304994', 'location': 'Data Source; Definitions; Table 1', 'accessed_or_verified_date': '2026-11-05'}]
    definitions = []
    codes = {'sex': {'0': 'women', '1': 'men'}, 'fatty_liver': {'0': 'no', '1': 'yes'}, 'exercise': {'0': 'no', '1': 'yes'},
             'alcohol': {'1': 'non/minimal', '2': 'light', '3': 'moderate', '4': 'heavy'},
             'smoking': {'1': 'never', '2': 'past', '3': 'current'}, 'event': {'0': 'no event observed by own last follow-up (censored)', '1': 'incident diabetes during follow-up'}}
    for name in CANDIDATES + ['patient_id', 'time', 'event']:
        role = 'predictor' if name in CANDIDATES else {'patient_id': 'identifier', 'time': 'time_anchor', 'event': 'outcome'}[name]
        definitions.append({
            'canonical_name': name, 'role': role,
            'concept': {'event': 'Supplied incident diabetes during follow-up: reported FPG >=126 mg/dL or HbA1c >=48 mmol/mol or self-report; not a five-year binary label',
                        'time': 'Supplied duration to observed incident diabetes or last follow-up; exact visit history unavailable',
                        'patient_id': 'Anonymous source participant identifier'}.get(name, 'Baseline '+name),
            'prediction_horizon': 'long_term_risk',
            'source_bindings': [{'dataset': 'NAGALA Dryad', 'cycle': '2019-02-19', 'source_name': HEADER[name], 'source_label': HEADER[name], 'source_reference': evidence[0]}],
            'timing': {'availability': 'at_index' if role == 'predictor' else 'post_index' if name in ['event', 'time'] else 'not_applicable',
                       'index_time_definition': 'NAGALA baseline health examination', 'measurement_window': 'baseline' if role == 'predictor' else 'baseline through last observed follow-up'},
            'unit': {'source_unit': UNITS.get(name), 'analysis_unit': UNITS.get(name), 'conversion': None},
            'coding': {'type': 'identifier' if name == 'patient_id' else 'categorical' if name in ['alcohol', 'smoking'] else 'binary' if name in codes else 'continuous',
                       'source_codes': codes.get(name), 'analysis_mapping': codes.get(name)},
            'missingness': {'source_missing_codes': [0] if name == 'hdl' else [], 'structural_missingness': False,
                            'skip_pattern': 'HDL mmol/L=0 only when paired mg/dL is blank' if name == 'hdl' else None,
                            'planned_handling': 'paired zero to missing; fold-isolated median imputation' if name == 'hdl' else 'stop on undocumented missingness'},
            'derivation': {'is_derived': False, 'formula_or_rule': None, 'components': []},
            'verification': {'status': 'verified', 'evidence': evidence, 'conflicts': []},
            'leakage_assessment': {'status': 'allowed_predictor' if role == 'predictor' else 'not_a_predictor',
                                   'reason': 'Measured at baseline; future distinct measurements ascertain outcome' if role == 'predictor' else 'Identifier or post-index outcome/time: barred from all feature sets'},
        })
    registry = {'study_id': 'cai2021_nonobese_five_year', 'dataset': 'NAGALA Dryad 10.5061/dryad.8q0p192', 'registry_version': '2026-11-05.1',
                'prediction_horizon': 'long_term_risk', 'definitions': definitions,
                'resolved_discrepancies': ['Sex header says 2=women but observed 0=women: verified via Dryad 8430 men/7034 women and Cai Table 1 6534 men/6406 women; human delegated resolution.',
                                           'HDL mmol/L zeros paired with missing mg/dL: 11 source, 8 eligible; treat as missing.'],
                'limits': ['Verified source-field semantics, not independently adjudicated visit-level diagnosis.', 'Undocumented upstream exclusions cannot be re-derived.']}
    dump_json(output/'variable_registry.json', registry)
    rows = ['# NAGALA data dictionary', '', 'Workbook SHA256: `'+audit['workbook_sha256']+'`.', '',
            'All predictors are baseline measurements. Event/time are post-index and excluded. Raw data are unchanged.', '',
            '| Concept | Exact source header | Unit | Role / encoding |', '|---|---|---|---|']
    for d in definitions:
        name = d['canonical_name']
        rows.append('| '+name+' | '+HEADER[name]+' | '+str(UNITS.get(name, 'unitless'))+' | '+d['role']+'; '+str(codes.get(name, 'continuous'))+' |')
    rows += ['', 'Raw columns not selected: ethanol amount, body weight, waist/BMI binary cutoffs, obesity phenotype, duplicate unit columns. Obesity phenotype has heterogeneous code formats and is not decoded or used.',
             '', 'Sex mapping is resolved from independent aggregate counts; original header mismatch is retained in provenance. HDL zeros are missing only when the companion mg/dL cell is blank. No generic zero-to-missing conversion is applied.',
             '', 'Event=0 means censored at the recorded time, not necessarily diabetes-free at five years. FPG/HbA1c baseline values are distinct from future outcome-defining measurements.', '']
    (output/'DATA_DICTIONARY.md').write_text('\n'.join(rows), encoding='utf-8')
    dump_json(output/'raw_column_inventory.json', {'columns': [{'source_header': c, 'dtype': str(raw[c].dtype), 'missing': int(raw[c].isna().sum())} for c in raw.columns]})


if __name__ == '__main__':
    main()
