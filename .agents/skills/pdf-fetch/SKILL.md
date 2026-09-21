---
name: pdf-fetch
description: |
  Tải `source.pdf` cho một paper trong `searched_papers/Layer_X/<paper_id>/`.
  Ghi lại PLAYBOOK các route tải PDF đã kiểm chứng (IEEE staging, Europe PMC
  render, ScienceDirect/Akamai chặn, Unpaywall repository, closed-access).
inputs:
  - searched_papers/Layer_<n>/<paper_id>/metadata.json   # doi, open_access_pdf, pdf_url
outputs:
  - searched_papers/Layer_<n>/<paper_id>/source.pdf
  - cập nhật metadata: source_pdf, page_count, pdf_status, pdf_fetch_attempts, download_link
---

# pdf-fetch

## ⚠️ Ràng buộc QUAN TRỌNG (đọc trước)
**Việc tải PDF PHẢI chạy ở MAIN LOOP** (Bash `curl`/`python` trong phiên chính).
**KHÔNG** giao cho subagent / Workflow: subagent bị **403 với mọi HTTP API ngoài**
(Unpaywall, Crossref, IEEE, Europe PMC...). Subagent CHỈ làm tốt việc đọc/ghi file
local (phân tích PDF đã có). → fetch = main loop; analyze = parallel (xem
`paper-analyzer`).

## Mục đích
Biến 1 paper "chỉ có metadata" thành có `source.pdf` để `pdf-extract` + `paper-analyzer`
xử lý. Mỗi bài thử theo cây quyết định dưới; ghi lại ĐÃ THỬ GÌ vào `pdf_fetch_attempts`.

## Cây quyết định (thử theo thứ tự)

### 0. Hỏi Unpaywall trước (luôn luôn)
```bash
curl -s "https://api.unpaywall.org/v2/<DOI>?email=phandienmanhthienk16@siu.edu.vn" | python -m json.tool
```
Xem `is_oa`, `best_oa_location.url_for_pdf`, và mảng `oa_locations[]`
(chú ý `host_type`: `publisher` / `repository`). Có `url_for_pdf` trực tiếp → thử curl ngay (route 4).

### 1. IEEE Access / IEEE Xplore  → STAGING server (KHÔNG bị Akamai)
Crossref trả link "similarity-checking" trỏ tới server **staging** tải được:
```bash
curl -s "https://api.crossref.org/works/<DOI>" | python -c "import sys,json;[print(l['URL']) for l in json.load(sys.stdin)['message'].get('link',[])]"
# → http://xplorestaging.ieee.org/ielx7/.../<ARNUMBER>.pdf?arnumber=<ARNUMBER>
curl -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -e "https://ieeexplore.ieee.org/" \
  -o source.pdf "<staging-url>"
```
✅ Đã chạy được: ahmed2024, fazakis2021.

### 2. Bài OA có trên PMC  → Europe PMC render route
```bash
# tìm PMCID
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%22<DOI>%22&format=json&resultType=core" \
  | python -c "import sys,json;r=json.load(sys.stdin)['resultList']['result'];print(r[0].get('pmcid'))"
# tải bản render
curl -L -A "Mozilla/5.0" -e "https://europepmc.org/" -o source.pdf \
  "https://europepmc.org/articles/<PMCID>?pdf=render"
```
✅ Đã chạy được: rasmy2021 (Med-BERT, PMC8137882), lai2019 (PMC6794897).

### 3. Elsevier gold-OA (ScienceDirect, có license CC-BY)  → BỊ CHẶN
`pdfft` của ScienceDirect bị **Akamai chặn 403** kể cả khi giả lập browser header.
→ **KHÔNG tự tải được**. Đặt `pdf_status:"blocked_..."`, ghi `download_link` =
`https://www.sciencedirect.com/science/article/pii/<PII>` và NHỜ USER tải tay.
(Đã gặp: dharmarathne2024, nipa2023 — user tải tay thành công.)

### 4. Link OA trực tiếp (Unpaywall `url_for_pdf`, MDPI, Springer-OA, BMC...)
```bash
curl -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -e "<DOI landing or publisher home>" \
  -o source.pdf "<url_for_pdf>"
```
Kiểm tra file đầu ra là PDF thật (xem mục Verify), không phải trang HTML chặn.

### 5. Green-OA / repository (author copy)
Unpaywall `oa_locations[*]` với `host_type:"repository"` có thể cho bản author-copy.
Thử curl với referer = trang repository. Một số repo **chặn hotlink** (vd Edge Hill →
403 mọi route, kể cả CORE download endpoint) → nhờ user tải tay.
CORE (nếu có): `https://api.core.ac.uk/v3/.../download` kèm `Authorization: Bearer $CORE_API_KEY` (trong `.env`).

### 6. Closed access (Elsevier/Springer không OA)  → user tải qua quyền trường
Không có route tự động. Dựng link landing rồi nhờ user:
```bash
# PII (Elsevier) lấy từ Crossref alternative-id:
curl -s "https://api.crossref.org/works/<DOI>" | python -c "import sys,json;print(json.load(sys.stdin)['message'].get('alternative-id'))"
# → https://www.sciencedirect.com/science/article/pii/<PII>
# Springer: https://link.springer.com/article/<DOI>
```
Ghi `download_link` vào metadata + thêm vào `PENDING_DOWNLOADS.md`. Đặt
`pdf_status:"pending_closed_access"`, `analysis_status:"none"`.

## Sau khi có source.pdf — cập nhật metadata
```jsonc
"source_pdf": "source.pdf",
"page_count": <số trang thật>,
"pdf_status": "downloaded",        // hoặc blocked_closed_access / pending_closed_access
"pdf_fetch_attempts": "YYYY-MM-DD: <route nào chạy / chặn gì>"
```

## Verify file tải về là PDF THẬT (không phải HTML chặn)
```bash
head -c 5 source.pdf            # phải là "%PDF-"
ls -l source.pdf               # vài trăm KB+; vài KB = trang chặn → xoá
pdftotext -layout source.pdf - | wc -w   # >1000 từ = có text layer
```
⚠️ Lệnh `file` đôi khi báo SAI số trang (vd báo "1 page" cho PDF 12 trang). Đếm trang
thật bằng form-feed: `pdftotext -layout source.pdf - | python -c "import sys;print(sys.stdin.read().count(chr(12))+1)"`.
Nếu tải nhầm HTML (vài trăm KB toàn `<html>`) → `rm -f source.pdf`, đánh dấu blocked.

## API tham khảo (CHỈ chạy ở main loop)
- Unpaywall: `api.unpaywall.org/v2/{doi}?email=phandienmanhthienk16@siu.edu.vn`
- Crossref: `api.crossref.org/works/{doi}` (field `link`, `alternative-id`)
- Europe PMC: `www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:"{doi}"&format=json&resultType=core`
- OpenAlex (polite pool): thêm `&mailto=phandienmanhthienk16@siu.edu.vn`
- Semantic Scholar: `api.semanticscholar.org/graph/v1/paper/DOI:{doi}`
- CORE: `api.core.ac.uk/v3/...` + `Authorization: Bearer $CORE_API_KEY` (trong `.env`)
