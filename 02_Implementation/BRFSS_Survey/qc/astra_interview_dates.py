"""Aggregate interview-date audit from the unchanged public XPT; no model fit."""
import json
from pathlib import Path
import pandas as pd
from astra_data_audit import resolve, digest


def main():
    source = resolve('data/extracted/LLCP2025.XPT')
    expected = 'd99262f8854f018a600c3538ee78e4308569af700abe6b92b36180336c24dec2'
    assert digest(source) == expected, 'Unexpected source XPT'
    parts = [chunk[['IDATE', 'DIABETE4']]
             for chunk in pd.read_sas(source, format='xport', encoding='utf-8', chunksize=40000)]
    data = pd.concat(parts)
    dates = pd.to_datetime(data.IDATE, format='%m%d%Y', errors='coerce')
    report = {}
    for label, mask in [('raw', pd.Series(True, index=data.index)),
                        ('eligible', data.DIABETE4.isin([1, 3]))]:
        selected = dates[mask]
        report[label] = {'minimum': str(selected.min().date()),
                         'maximum': str(selected.max().date()),
                         'unparseable': int(selected.isna().sum()), 'n': len(selected)}
    target = Path(__file__).with_suffix('.json')
    target.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
