---
name: pdf-fetch
description: |
  Fetch `source.pdf` for a paper in `01_Diabetes_Research/searched_papers/Layer_X/<paper_id>/`.
  Documents PLAYBOOK of verified PDF fetch routes (IEEE staging, Europe PMC
  render, ScienceDirect/Akamai blocked, Unpaywall repository, closed-access).
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/metadata.json   # doi, open_access_pdf, pdf_url
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/source.pdf
  - update metadata: source_pdf, page_count, pdf_status, pdf_fetch_attempts, download_link
---

# pdf-fetch

## ⚠️ CRITICAL Constraint (Read First)
**PDF fetching MUST run in the MAIN LOOP** (Bash `curl`/`python` in primary session).
**DO NOT** delegate to subagent / Workflow: subagents receive **403 on all external HTTP APIs**
(Unpaywall, Crossref, IEEE, Europe PMC...). Subagents ONLY excel at local file reading/writing
(analyzing existing PDFs). → fetch = main loop; analyze = parallel (see `paper-analyzer`).

## Purpose
Convert a "metadata-only" paper into one with `source.pdf` for processing by `pdf-extract` + `paper-analyzer`.
Each paper is attempted according to the decision tree below; record WHAT WAS ATTEMPTED in `pdf_fetch_attempts`.

## Decision Tree (Attempt in Order)

### 0. Query Unpaywall First (Always)
```bash
curl -s "https://api.unpaywall.org/v2/<DOI>?email=phandienmanhthienk16@siu.edu.vn" | python -m json.tool
```
Inspect `is_oa`, `best_oa_location.url_for_pdf`, and the `oa_locations[]` array
(note `host_type`: `publisher` / `repository`). If direct `url_for_pdf` is present → attempt curl immediately (route 4).

### 1. IEEE Access / IEEE Xplore  → STAGING Server (Bypasses Akamai)
Crossref returns a "similarity-checking" link pointing to a downloadable **staging** server:
```bash
curl -s "https://api.crossref.org/works/<DOI>" | python -c "import sys,json;[print(l['URL']) for l in json.load(sys.stdin)['message'].get('link',[])]"
# → http://xplorestaging.ieee.org/ielx7/.../<ARNUMBER>.pdf?arnumber=<ARNUMBER>
curl -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -e "https://ieeexplore.ieee.org/" \
  -o source.pdf "<staging-url>"
```
✅ Verified working: ahmed2024, fazakis2021.

### 2. OA Paper on PMC  → Europe PMC Render Route
```bash
# find PMCID
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%22<DOI>%22&format=json&resultType=core" \
  | python -c "import sys,json;r=json.load(sys.stdin)['resultList']['result'];print(r[0].get('pmcid'))"
# download rendered version
curl -L -A "Mozilla/5.0" -e "https://europepmc.org/" -o source.pdf \
  "https://europepmc.org/articles/<PMCID>?pdf=render"
```
✅ Verified working: rasmy2021 (Med-BERT, PMC8137882), lai2019 (PMC6794897).

### 3. Elsevier Gold-OA (ScienceDirect, CC-BY License)  → BLOCKED
ScienceDirect's `pdfft` is **Akamai blocked 403** even when emulating browser headers.
→ **Cannot download autonomously**. Set `pdf_status:"blocked_..."`, set `download_link` =
`https://www.sciencedirect.com/science/article/pii/<PII>`, and ASK USER to download manually.
(Encountered: dharmarathne2024, nipa2023 — user successfully downloaded manually.)

### 4. Direct OA Link (Unpaywall `url_for_pdf`, MDPI, Springer-OA, BMC...)
```bash
curl -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -e "<DOI landing or publisher home>" \
  -o source.pdf "<url_for_pdf>"
```
Verify resulting file is a genuine PDF (see Verify section), not a blocked HTML page.

### 5. Green-OA / Repository (Author Copy)
Unpaywall `oa_locations[*]` with `host_type:"repository"` may provide an author copy.
Attempt curl with referer = repository landing page. Some repositories **block hotlinking** (e.g. Edge Hill →
403 on all routes, including CORE download endpoint) → ask user to download manually.
CORE (if available): `https://api.core.ac.uk/v3/.../download` with `Authorization: Bearer $CORE_API_KEY` (in `.env`).

### 6. Closed Access (Elsevier/Springer Non-OA)  → User Downloads via Institutional Access
No automated route exists. Construct landing link and request user download:
```bash
# PII (Elsevier) extracted from Crossref alternative-id:
curl -s "https://api.crossref.org/works/<DOI>" | python -c "import sys,json;print(json.load(sys.stdin)['message'].get('alternative-id'))"
# → https://www.sciencedirect.com/science/article/pii/<PII>
# Springer: https://link.springer.com/article/<DOI>
```
Write `download_link` to metadata + add to `01_Diabetes_Research/docs/PENDING_DOWNLOADS.md`. Set
`pdf_status:"pending_closed_access"`, `analysis_status:"none"`.

## After Acquiring source.pdf — Update metadata.json
```jsonc
"source_pdf": "source.pdf",
"page_count": <actual page count>,
"pdf_status": "downloaded",        // or blocked_closed_access / pending_closed_access
"pdf_fetch_attempts": "YYYY-MM-DD: <route executed / reason blocked>"
```

## Verify Downloaded File is a GENUINE PDF (Not Blocked HTML)
```bash
head -c 5 source.pdf            # must be "%PDF-"
ls -l source.pdf               # several hundred KB+; few KB = blocked page → delete
pdftotext -layout source.pdf - | wc -w   # >1000 words = has text layer
```
⚠️ The `file` command sometimes reports INCORRECT page counts (e.g. reporting "1 page" for a 12-page PDF). Count
true pages via form-feed: `pdftotext -layout source.pdf - | python -c "import sys;print(sys.stdin.read().count(chr(12))+1)"`.
If HTML was mistakenly downloaded (several hundred KB of `<html>`) → `rm -f source.pdf`, mark blocked.

## Reference APIs (Run in Main Loop ONLY)
- Unpaywall: `api.unpaywall.org/v2/{doi}?email=phandienmanhthienk16@siu.edu.vn`
- Crossref: `api.crossref.org/works/{doi}` (fields `link`, `alternative-id`)
- Europe PMC: `www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:"{doi}"&format=json&resultType=core`
- OpenAlex (polite pool): add `&mailto=phandienmanhthienk16@siu.edu.vn`
- Semantic Scholar: `api.semanticscholar.org/graph/v1/paper/DOI:{doi}`
- CORE: `api.core.ac.uk/v3/...` + `Authorization: Bearer $CORE_API_KEY` (in `.env`)
