---
name: paper-comparator
description: |
  So sanh chi tiet mot bai bao trong `searched_papers/` voi cac bai
  bao con lai trong CUNG LAYER (va optionally voi `chosed_papers/`
  cung layer) — tim diem trung, diem khac biet, diem vuot troi, gap.
inputs:
  - searched_papers/Layer_<n>/<target_paper_id>/analysis.html
  - searched_papers/Layer_<n>/<target_paper_id>/summary.json   # rob_audit neu co
  - searched_papers/Layer_<n>/*/analysis.html
  - searched_papers/Layer_<n>/*/summary.json                   # rob_audit cac bai khac
  - chosed_papers/Layer_<n>/*/analysis.html  (optional)
outputs:
  - searched_papers/Layer_<n>/<target_paper_id>/comparison.md   # hoac comparison.v2.md neu da co
---

# paper-comparator

## Muc dich
Tra loi 1 cau hoi: "Paper nay co gi NEW / BETTER / OVERLAP so voi
nhung paper khac trong layer?" — de user nhanh chong quyet dinh loai
bo paper trung va promote paper noi bat len `chosed_papers/`.

## Quy trinh
1. Lay `analysis.html` + `summary.json` cua paper target + tat ca paper khac cung layer.
2. **Chi so sanh bai cung `prediction_horizon` VA cung `label_type`**:
   - Cung horizon + cung label: so metric truc tiep.
   - Khac horizon: chi so phuong phap tiep can, KHONG so metric so.
   - Khac label_type (binary vs multiclass_staging): KHONG so metric, note ro.
3. Doi chieu cac truc:
   - **Prediction horizon** (§3b): cung horizon moi so truc tiep
   - **Dataset**: cung / khac / mo rong?
   - **Method**: trung / cai tien / moi hoan toan?
   - **Metric & ket qua**: ai cao hon? Tren cung dataset (cung horizon)?
   - **Han che**: paper target co khac phuc limit cua paper khac khong?
   - **Rob audit** (neu co summary.json voi rob_audit): so sanh muc do vi pham ro ri.
4. Xuat `comparison.md` (hoac `comparison.v2.md` neu da co) gom:
   - `## Trung lap` — cac paper lam tuong tu
   - `## Khac biet / Vuot troi` — diem paper target hon
   - `## Gap con lai` — diem paper target chua giai quyet
   - `## Bang claim-evidence` (moi — xem schema duoi)
   - `## So lieu nghi thoi phong` (moi — xem duoi)
   - `## Verdict`: `promote` / `keep_in_searched` / `reject` + 1 cau ly do

---

## Bang claim-evidence (them 2026-09-21)

Sau phan So sanh metric, PHAI xuat bang nay:

```markdown
## Bang claim-evidence

| paper_id | metric | dataset | validation | Co ro ri (tu rob_audit)? | So sanh duoc voi Paper_01? |
|----------|--------|---------|-----------|--------------------------|---------------------------|
| gr2024 | AUROC 0.89 (Table 3) | PIMA | internal CV | CP3: SMOTE truoc split (E) | KHONG — khac horizon (cross_sectional vs early_detection) |
| nipa2023 | Acc 98.7% (Table 5) | PIMA | 1 split co dinh | E: winner curse (25/34 bai) | KHONG — khong co calibration, winner curse |
| sgchoi2023 | AUROC 0.827 (Table 4) | KNHANES | external temporal | Khong xac dinh ro ri | CO — cung early_detection, co external val |
```

**Quy tac dien bang**:
- `paper_id`: ma paper theo AGENTS.md §5
- `metric`: so + don vi + nguon (Table X / Fig Y). Thieu → UNKNOWN.
- `dataset`: ten dataset
- `validation`: loai validation (internal CV / temporal / external / 1 split / UNKNOWN)
- `Co ro ri`: lay tu `summary.json.rob_audit.probe_hits[]` + `leakage_types[]` neu co. Neu chua co rob_audit → ghi "Chua co rob_audit, can kiem tra".
- `So sanh duoc voi Paper_01?`: Y + ly do ngan, hoac N + ly do ngan.
  - Y chi khi: cung `prediction_horizon`, cung hoac tuong tu `label_type`, co metric tren tap test/external khong ro ri.
  - N neu: khac horizon, metric tu tren val set duy nhat bi winner-curse, co F-leakage ro rang.

---

## Muc "So lieu nghi thoi phong" (them 2026-09-21)

Neu co bat ky bai nao trong comparison co `role: inflation` (AGENTS.md §5) HOAC co cac dau hieu:
- AUROC/Acc > 0.95 tren PIMA hay Sylhet khong co nested CV
- Winner curse ro rang (1 split co dinh, nhieu model, lay cao nhat)
- F-leakage (glucose/HbA1c trong feature)

Thi them muc:

```markdown
## So lieu nghi thoi phong

| paper_id | metric | ly do nghi | evidence_ref | can verify truoc khi cite? |
|----------|--------|-----------|--------------|---------------------------|
| nipa2023 | Acc 98.7% | Winner curse: 35 classifier, 1 split, tu nhan "no validation methods" | Sec 3 | CO — khong duoc cite so nay nhu benchmark that |
| olisah2022 | AUROC 1.00 | F-leakage: relabel theo glucose trong feature | Table 2 | CO — so nay khong co gia tri tham chieu |
```

> Muc nay giup user tranh viet so bi thoi phong vao Discussion cua Paper_01.

---

## Rang buoc
- So sanh metric chi hop le khi **cung `prediction_horizon` + cung dataset**; khac horizon thi so phuong phap.
- **Neu comparison.md da co → ghi `comparison.v2.md`**, ghi chu o dau file "Phien ban 2 - co them bang claim-evidence + muc thoi phong".
- KHONG tu move paper sang `chosed_papers/`. Chi goi y verdict.
- So sanh PHAI dua tren `analysis.html` + `summary.json` da co, khong tu doc lai PDF.
- Neu paper khac thieu analysis.html → bo qua, note ro trong comparison.md.

## Changelog cuc bo

| Ngay | Thay doi | Nguoi thuc hien |
|------|---------|----------------|
| 2026-09-21 | v2: Chi so sanh metric bai cung prediction_horizon + label_type. Them bang claim-evidence (paper_id|metric|dataset|validation|ro ri|so sanh Paper_01). Them muc "so lieu nghi thoi phong" (role:inflation). Neu comparison.md da co → ghi comparison.v2.md. | agent (chore/skills-upgrade) |
