# BRFSS 2025 Survey Data

This directory contains the public-use **2025 Behavioral Risk Factor Surveillance System (BRFSS)** combined landline and cellphone dataset published by the U.S. CDC.

## Source

- Official CDC dataset URL: https://www.cdc.gov/brfss/annual_data/2025/files/LLCP2025XPT.zip
- CDC survey documentation: https://www.cdc.gov/brfss/annual_data/annual_2025.html
- Format: SAS Transport (XPT)
- CDC reports: 356,158 records and 284 variables
- Archive SHA-256: 
- Archive size:  bytes
- Extracted file: 
- Extracted SHA-256: 
- Extracted size:  bytes

## Directory layout

- : original ZIP archive, preserved byte-for-byte.
- : the single validated XPT payload extracted from the archive.
- : archive inventory captured before extraction.

## Cleaning decision

The ZIP archive is preserved unchanged. Before extraction, every archive member is inventoried and checked for unsafe paths. Extraction proceeds only when exactly one XPT payload is present. Only that XPT payload is materialized into ; no unverified archive member is silently deleted.

## Storage

The ZIP and extracted XPT are tracked with Git LFS because the extracted public-use dataset is larger than GitHub's normal per-file limit.
