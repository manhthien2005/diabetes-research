---
name: paper-analyzer
description: |
  Phan tich SAU mot bai bao trong `searched_papers/Layer_X/<paper_id>/`,
  xuat ra `analysis.html` (tieng Viet, 8 khoi theo AGENTS.md §6) VA
  `summary.json` (may doc duoc, de sinh research brief). Muc tieu: user
  quyet promote/loai ma khong can mo PDF.
inputs:
  - searched_papers/Layer_<n>/<paper_id>/extracted.md
  - searched_papers/Layer_<n>/<paper_id>/source.pdf
  - searched_papers/Layer_<n>/<paper_id>/metadata.json
  - chosed_papers/Layer_<n>/
outputs:
  - searched_papers/Layer_<n>/<paper_id>/analysis.html
  - searched_papers/Layer_<n>/<paper_id>/summary.json
  - searched_papers/Layer_<n>/<paper_id>/rob_audit.json
---

# paper-analyzer

## Muc dich
Bien 1 PDF khoa hoc thanh phan tich tieng Viet SAU + mot ban tom tat may
doc duoc, de user quyet "promote len `chosed_papers/` hay loai".

## Quy trinh
1. **Doc full text**: uu tien `extracted.md`. Neu chua co → chay `pdf-extract`.
2. Doc `metadata.json` + doc paper trong `chosed_papers/Layer_<n>/` cung layer.
3. Render `analysis.html` theo **8 khoi** (AGENTS.md §6). KHONG doi cau truc.
4. Ghi `summary.json` (schema duoi) — bao gom key `rob_audit` moi.
5. Ghi `rob_audit.json` (ban rieng cho QC).
6. Set `analysis_status: "analyzed"` + xac nhan `prediction_horizon` trong metadata.

## Di SAU — bat buoc moi du
Khong dung o mo ta chung. PHAI rut duoc:
- **Prediction horizon** (§3b)
- **Pipeline chinh xac**: tung buoc tien xu ly → can bang → feature → model → tuning
- **Dataset & split**: ten, so mau, so feature, ti le train/test, CV, can bang lop
- **Metric kem NGUON**: ghi "Table X / Fig Y / Section Z". Khong co → UNKNOWN.
- **Kha nang tai lap** (high/medium/low) + ly do
- **So voi baseline**: hon/kem cu the
- **Gap / diem yeu**: co hoi cai tien cho de tai

## RoB mini-audit (them 2026-09-21)

Sau khi phan tich pipeline, chay **6 probe CP + 1 probe O11** (tu skill peer-review):

### Probe CP1-CP6 (Clinical Prediction Model)
- **CP1**: Co nested CV hoac held-out test set that su? (Tuning va reporting TACH biet?)
- **CP2**: Feature selection co nam TRONG fold khong, hay fit tren toan data?
- **CP3**: Oversampling/SMOTE co TRONG fold khong, hay truoc khi split?
- **CP4**: Co bao calibration (slope, intercept, calibration plot) khong?
- **CP5**: Co external/temporal validation khong?
- **CP6**: Co bien dinh-nghia-nhan (HbA1c/FPG/OGTT/glucose) nam trong feature khong?

### Probe O11 (Complex Survey / NHANES)
- **O11**: Neu dung NHANES/BRFSS/KNHANES: co ap survey weights? Co bao prevalence co trong so?

### Taxonomy ro ri (LEAKAGE_MAP.md §2)
Doi chieu voi 6 dang vi pham:
- **B**: Impute/scale tren toan bo data truoc split
- **C**: Feature selection tren toan bo data
- **D**: SMOTE/oversample truoc split
- **E**: Chon model tren test set (winner curse)
- **F**: Bien dinh-nghia-nhan trong feature
- **G**: Ep 50/50 roi doc accuracy o prevalence gia

Ghi vao `leakage_types[]` moi loai vi pham tim thay (ky hieu "B"..."G").

---

## summary.json (schema)

```json
{
  "paper_id": "<id>",
  "layer": 2,
  "prediction_horizon": "cross_sectional|early_detection|long_term_risk",
  "contribution": "1 cau dong gop chinh",
  "method": "method/ky thuat chinh",
  "best_metric": "vd: 98.2% acc tren PIMA (Table 3)",
  "datasets": ["pima-indians-diabetes"],
  "has_code": true,
  "code_url": "<url hoac null>",
  "reproducible": "high|medium|low",
  "vs_baseline": "hon <paper_id> o <diem cu the>",
  "gap": "diem yeu / khoang trong chinh",
  "verdict": "strong|maybe|weak",
  "verdict_reason": "1 cau vi sao",
  "analyzed_at": "<ISO-8601>",
  "rob_audit": {
    "probe_hits": ["CP2", "E"],
    "leakage_types": ["C", "E"],
    "validation_level": "internal|temporal|external|UNKNOWN",
    "calibration_reported": true,
    "survey_design_handled": null,
    "prevalence_realistic": false,
    "evidence_ref": "Table 2 / Sec 2.3",
    "confidence": "high|medium|low"
  }
}
```

**Ghi chu schema rob_audit**:
- `probe_hits[]`: probe THAT BAI (CP1-CP6, O11). Rong = khong tim thay vi pham.
- `leakage_types[]`: loai vi pham ro ri (B-G). Rong = khong xac dinh.
- `validation_level`: cap do cao nhat (external > temporal > internal > UNKNOWN).
- `calibration_reported`: co bao calibration khong.
- `survey_design_handled`: chi dien neu paper dung NHANES/BRFSS; else null.
- `prevalence_realistic`: danh gia co o prevalence thuc te khong.
- `evidence_ref`: nguon bang chung ("Table X / Sec Y") hoac UNKNOWN.
- `confidence`: muc tin cay (high=co quote, medium=suy luan, low=thieu thong tin).

---

## rob_audit.json (ban rieng QC)
```json
{
  "paper_id": "<id>",
  "audited_at": "<ISO-8601>",
  "auditor": "paper-analyzer v2",
  "probe_hits": [],
  "leakage_types": [],
  "validation_level": "UNKNOWN",
  "calibration_reported": false,
  "survey_design_handled": null,
  "prevalence_realistic": true,
  "evidence_ref": "UNKNOWN",
  "confidence": "low",
  "notes": ""
}
```

> **Khi kiem thu (Buoc 5)**: ghi `rob_audit.json` canh `summary.json` nhung KHONG sua `summary.json` o luot thu. Sau khi user duyet moi merge.

---

## Tu reject khi bai do (user da uy quyen — AGENTS.md §11)
Neu phan tich thay bai KHONG dat → them vao `rejected.json` kem ly do cu the, `by: "Codex"`, set `status: "rejected"`. KHONG xoa folder.

## Rang buoc
- `analysis.html` doc lap (inline CSS, khong CDN), tieng Viet, giu thuat ngu EN.
- Khoi **Header** PHAI co badge Horizon tu `prediction_horizon`.
- **8 KHOI HTML KHONG DOI** — rob_audit KHONG xuat hien trong analysis.html.
- KHONG bia so. Thieu → UNKNOWN.
- KHONG ghi de `analysis.html` da co → tao `analysis.v2.html`.
- KHONG tu dung `chosed_papers/`.

## Orchestration
- **Tai PDF**: MAIN LOOP (skill pdf-fetch). Subagent bi 403.
- **Phan tich**: parallel hoa duoc (doc/ghi file local).

## Changelog cuc bo

| Ngay | Thay doi | Nguoi thuc hien |
|------|---------|----------------|
| 2026-09-21 | v2: Them buoc RoB mini-audit (probe CP1-CP6 + O11), taxonomy ro ri tu LEAKAGE_MAP. Them key `rob_audit` vao summary.json. Them output `rob_audit.json`. KHONG doi 8 khoi HTML, KHONG doi field webapp doc. | agent (chore/skills-upgrade) |
