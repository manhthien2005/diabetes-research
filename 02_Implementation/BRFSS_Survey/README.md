# BRFSS 2025 Survey Data

This implementation area contains the official **2025 Behavioral Risk Factor Surveillance System (BRFSS)** public-use data used for the diabetes classification project.

## Source integrity

- CDC source: https://www.cdc.gov/brfss/annual_data/2025/files/LLCP2025XPT.zip
- CDC documentation: https://www.cdc.gov/brfss/annual_data/annual_2025.html
- Original ZIP: `data/raw/LLCP2025XPT.zip`
- Original ZIP size: **64,642,184 bytes**
- Original ZIP SHA-256: `d26a8b391aa2966b58dc2a3ffddf8da050e9f38eb143d0f5ca7b3d21ece08f98`
- Original CDC archive member name: `LLCP2025.XPT ` (note the trailing space)
- Normalized extracted filename: `LLCP2025.XPT`
- XPT size: **799,971,280 bytes**
- XPT SHA-256: `d99262f8854f018a600c3538ee78e4308569af700abe6b92b36180336c24dec2`

The original CDC ZIP is preserved byte-for-byte in Git LFS. The normalized XPT changes only the filesystem/archive member name; the XPT payload bytes are unchanged.

## Kaggle workspace

Primary compute environment: **Kaggle + GitHub**.

- Private Kaggle dataset: https://www.kaggle.com/datasets/manhthien2005/brfss-2025-survey
- Kaggle notebook: https://www.kaggle.com/code/manhthien2005/brfss-2025-data-exploration
- Production workflow: `.github/workflows/kaggle-brfss-bootstrap.yml`

GitHub Actions authenticates with legacy Kaggle credentials stored as repository secrets:

- `KAGGLE_USERNAME`
- `KAGGLE_KEY`

Secrets are never committed to the repository.

## Verified initial load

The first successful Kaggle EDA run loaded:

- **356,158 rows**
- **283 columns**
- DataFrame memory usage: approximately **0.828 GiB**
- Target: `DIABETE4`
- Missing target values: **6**

CDC's annual documentation describes the 2025 file as having **284 variables**, while the SAS Transport file loaded by pandas currently yields **283 columns**. This discrepancy is intentionally recorded and should be reconciled against the official 2025 variable layout/codebook before freezing the feature set.

### Raw DIABETE4 distribution

| Code | Count | Percent |
|---:|---:|---:|
| 3 | 290,712 | 81.6244% |
| 1 | 51,827 | 14.5517% |
| 4 | 10,166 | 2.8544% |
| 2 | 2,671 | 0.7499% |
| 7 | 580 | 0.1628% |
| 9 | 196 | 0.0550% |
| Missing | 6 | 0.0017% |

No target recoding or model training was performed in this initial notebook.

## Directory layout

```text
BRFSS_Survey/
├── README.md
├── data/
│   ├── ARCHIVE_CONTENTS.txt
│   ├── raw/
│   │   └── LLCP2025XPT.zip
│   └── extracted/
│       └── LLCP2025.XPT
└── kaggle/
    ├── dataset/
    │   └── dataset-metadata.json
    └── notebook/
        ├── kernel-metadata.json
        └── 01_brfss_data_exploration.ipynb
```

## Next step

Reconcile the official codebook/variable layout with the loaded XPT columns, inspect `DIABETE4` coding, classify variables by core/optional module and leakage risk, then define the candidate feature set before any cleaning or modeling.
