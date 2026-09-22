# SKILLS_LOCK.md — Khoá phiên bản skill bên thứ ba

> **Mục đích**: ghi lại nguồn gốc, phiên bản, chỉnh sửa cục bộ của mọi skill cài từ bên ngoài.
> Đây là file khoá nguồn chân lý (canonical lock file) duy nhất của repository.
> Cập nhật file này khi thêm/xoá/nâng cấp skill. KHÔNG tự động cập nhật.

---

## Nguồn

| Mục | Giá trị |
|-----|---------|
| Repository | https://github.com/Aperivue/medsci-skills |
| Commit hash | d7df5142971efe58ef40b1986711fabc50ebc6ec |
| Branch | main (không có tag semver) |
| License | **MIT** — Copyright (c) 2026 Aperivue |
| Ngày cài | 2026-09-21 |
| Ngày kiểm tra tiếp theo | Thủ công, khuyến nghị mỗi 3 tháng |

---

## Danh sách skill đã cài (Tầng 0)

| Skill | Mục đích trong NCKH | Chỉnh sửa cục bộ |
|-------|--------------------|-----------------|
| design-study | Gate leakage + cohort design + validation strategy cho tabular ML | Thêm Changelog |
| analyze-stats | Thống kê tái lập, kiểm tra separation | Thêm Changelog |
| radiomics-ml | CHỈ gate learner-agnostic (nested-CV, calibration) - bỏ qua pyradiomics/IBSI | Thêm Changelog |
| check-reporting | TRIPOD+AI, PROBAST+AI checklist | Thêm Changelog |
| verify-refs | Xác minh DOI, claim fidelity qua PubMed/CrossRef | Email patch + Changelog |
| self-review | Self-critique bản thảo Paper_01 | Thêm Changelog |
| peer-review | Probe CP1-CP6 + O11 cho RoB mini-audit paper trong kho | NCKH scope note + Changelog |
| polish-language | Lint consistency + ESL clarity | Thêm Changelog |

---

## Skill chưa cài (Tầng 1 - cài sau khi Paper_01 có kết quả chốt)

| Skill | Điều kiện cài |
|-------|--------------|
| write-paper | Khi T0.16 done (tuần 15) |
| search-lit | Cùng lúc write-paper |
| manage-refs | Cùng lúc write-paper |
| make-figures | Cùng lúc write-paper |
| find-journal | Khi Table 3 xong (M2) |
| define-variables | Khi T1.3 bắt đầu |

---

## Skill KHÔNG cài

| Skill | Lý do |
|-------|-------|
| orchestrate | Router tham chiếu skill không có trong repo |
| humanize | Ngoài scope nghiên cứu |
| fulltext-retrieval | Trùng với pdf-fetch đã có |

---

## Chỉnh sửa cục bộ (chi tiết)

1. verify-refs/scripts/verify_refs.py: thay email default thanh phandienmanhthienk16@siu.edu.vn
2. peer-review/SKILL.md: them section NCKH scope (probe CP1-CP6 + O11 only)
3. Tat ca 8 SKILL.md: them section Changelog cuc bo

---

## Cách cập nhật thủ công

  git clone --depth 1 https://github.com/Aperivue/medsci-skills /tmp/medsci-new
  diff /tmp/medsci-new/skills/<skill>/SKILL.md .agents/skills/<skill>/SKILL.md
  # Copy thu cong + ap lai chinh sua cuc bo + cap nhat commit hash tren
  # Dong bo mirror sang .claude/skills/:
  # python scripts/skills/research_skill_mirror.py --sync

KHONG dung installer/updater tu dong (npx, setup-medsci, auto-update hooks).
