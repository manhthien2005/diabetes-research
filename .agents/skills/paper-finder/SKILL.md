---
name: paper-finder
description: |
  Tim bai bao moi ve DU DOAN dai thao duong (diabetes prediction, binary
  classification, tabular & EHR), gan dung Layer 1-4 + prediction_horizon,
  dat vao `searched_papers/Layer_X/<paper_id>/` de doi phan tich.
inputs:
  - chosed_papers/Layer_<1..4>/        # nen tang de so chieu chu de
  - AGENTS.md                          # §1 scope, §3 Layer, §3b prediction_horizon
outputs:
  - searched_papers/Layer_<1..4>/<paper_id>/source.pdf
  - searched_papers/Layer_<1..4>/<paper_id>/metadata.json  # gom ca field integrity moi
---

# paper-finder

## Muc dich
Mo rong kho `searched_papers/` bang cac bai bao **du doan dai thao duong**, phan
ngay vao Layer phu hop + gan `prediction_horizon`, dua tren chu de chinh:

| Layer | Trong tam |
|-------|-----------|
| 1 — Pipeline_Nen_Tang | Tien xu ly, imbalance, oversampling, feature engineering |
| 2 — Model_Hieu_Qua    | So sanh model / ensemble / boosting / deep tabular |
| 3 — Dataset_EHR       | EHR that, MIMIC, eICU, NHANES, cohort thuc te |
| 4 — XAI_Trien_Khai    | Explainability, SHAP/LIME, deployment, clinical impact |

**Dong thoi gan `prediction_horizon`** (truc thu 2 — AGENTS.md §3b, doc lap Layer):

| Horizon | Khi nao |
|---------|---------|
| `cross_sectional` | Du doan tu feature hien tai, khong follow-up |
| `early_detection` | Phat hien som / sang loc nguoi chua chan doan, prediabetes — **UU TIEN** |
| `long_term_risk`  | Onset sau N nam, cohort longitudinal — **UU TIEN (kho dang thieu)** |

## Rang buoc cung (lay tu AGENTS.md §7)
0. **Dung scope §1**: phai la bai DU DOAN dai thao duong (tabular/EHR). Khong phai → loai ngay.
1. Citations >= 100 (>3y) hoac >= 30 (1–3y) hoac rising-star (>5 cite/thang neu <1y).
2. Dataset public + license cho research.
3. Co code reproducible hoac mo ta method du chi tiet.

## Cong toan ven (them 2026-09-21) — TRUOC khi tao folder

Truoc khi tao `searched_papers/Layer_X/<paper_id>/`, PHAI chay day du 3 kiem tra:

### Kiem tra 1: DOI phan giai qua CrossRef
```bash
# Lay doi tu Semantic Scholar hoac Unpaywall
curl -s "https://api.crossref.org/works/<DOI>" | python -c "
import sys, json
d = json.load(sys.stdin)
m = d.get('message', {})
print('title:', m.get('title', ['UNKNOWN'])[0])
print('year:', m.get('published', {}).get('date-parts', [[None]])[0][0])
print('doi:', m.get('DOI'))
print('status: ok')
"
```
- Neu CrossRef tra ve `Resource not found` hoac `status != ok` → ghi `integrity.doi_resolved: false`, KHONG tao folder.
- Doi chieu title CrossRef vs title paper tim duoc: khac lon (>30% words) → canh bao, can kiem tra tay.

### Kiem tra 2: Khop title
- Title tu CrossRef phai khop phan lon voi title tu Semantic Scholar/PubMed.
- Neu khac → ghi `integrity.title_match: false`, canh bao user.

### Kiem tra 3: Retraction / Correction check
```bash
# Kiem tra Retraction Watch Database qua CrossRef
curl -s "https://api.crossref.org/works/<DOI>" | python -c "
import sys, json
d = json.load(sys.stdin)
m = d.get('message', {})
# check update-policy, relation, type
updates = m.get('relation', {}).get('is-retraction-of', [])
corr = m.get('relation', {}).get('is-correction-of', [])
upd_to = m.get('relation', {}).get('is-updated-by', [])
print('retraction:', bool(updates))
print('correction:', bool(corr or upd_to))
print('type:', m.get('type'))
"
```
- Neu co `is-retraction-of` → KHONG tao folder, ghi vao `rejected.json` voi `reason: retracted`.
- Neu co `is-correction-of` / `is-updated-by` → tao folder nhung ghi `integrity.has_correction: true`.

### Ghi vao metadata.json: field `integrity` (moi)
```json
"integrity": {
  "doi_resolved": true,
  "title_match": true,
  "crossref_type": "journal-article",
  "retracted": false,
  "has_correction": false,
  "checked_at": "<ISO-8601>",
  "check_source": "crossref"
}
```
- Field `integrity` la field MOI THEM — khong dung field cu, khong pha webapp.
- Neu CrossRef khong tra loi (timeout/404) → ghi `integrity.doi_resolved: null`, `check_source: "unavailable"`.

---

## Quy trinh
1. Doc 4 layer trong `chosed_papers/` de biet dang co gi → tranh trung lap.
2. De xuat <= 5 paper moi moi lan, moi paper kem:
   - `paper_id` theo format `<lastname><year>_<3-word-slug>`
   - Layer duoc gan + ly do (1 cau)
   - `prediction_horizon` (1 trong 3) + ly do (1 cau)
   - **UU TIEN CAP BIET** bai thuoc `early_detection` hoac `long_term_risk` (kho dang thieu)
3. Chay **cong toan ven** (3 buoc tren) voi moi paper de xuat truoc khi de xuat user.
   Neu kiem tra that bai → khong de xuat bai do, thay the bang bai khac.
4. Sau khi user duyet, tao folder va chay pdf-fetch.

## Khi khong chac Layer / horizon
- Khong chac Layer → mac dinh Layer 2, `layer_uncertain: true`.
- Khong chac horizon → mac dinh `cross_sectional`, `horizon_uncertain: true`.

## Changelog cuc bo

| Ngay | Thay doi | Nguoi thuc hien |
|------|---------|----------------|
| 2026-09-21 | v2: Them cong toan ven (DOI phan giai, khop title, retraction check qua CrossRef). Them field `integrity` vao metadata.json. Uu tien de xuat early_detection + long_term_risk. | agent (chore/skills-upgrade) |
