# So sánh: yang2021_bigdata_physical_exam_fusion (Layer 2)

> Bài MỚI: **yang2021_bigdata_physical_exam_fusion** — fusion 3 nhóm chỉ số khám sức khỏe trên EHR Luzhou 1.5M mẫu, IFS chọn 6 feature, XGBoost + WoE scorecard online (DRSC).
> Horizon: **early_detection** (paper tự đặt khung "large-scale early screening / cascade screening"; `horizon_uncertain: true` vì feature & label OGTT đo cùng lần khám).
> So với **baseline đã chọn** hasan2020 + 4 **peer cùng Layer 2**.
>
> **Quy tắc §3b**: chỉ so con số metric khi **cùng `prediction_horizon` + cùng/đè dataset**. yang2021 là bài DUY NHẤT mang horizon `early_detection` trong nhóm này, lại dùng dataset PRIVATE riêng (EHR Luzhou) → **không có paper nào để so AUC trực tiếp**. Mọi đối chiếu dưới đây là so **cách tiếp cận / quy mô / tái lập**, KHÔNG so con số thắng-thua.

---

## Bảng đối chiếu

| Tiêu chí | yang2021 (MỚI) | hasan2020 (baseline) | li2020 (peer) | rasmy2021 (peer) | wang2020 (peer) | khanam2021 (peer) |
|---|---|---|---|---|---|---|
| Horizon | **early_detection** | cross_sectional | long_term_risk | long_term_risk | cross_sectional | cross_sectional |
| Dataset | EHR Luzhou **1.5M** (private) | PIMA 768 (public) | CPRD UK 1.6M (gated) | Cerner/Truven **28M** (gated) | Khảo sát Bắc Kinh n=368 (private) | PIMA 768 (public) |
| Method chính | Fusion 3 nhóm + IFS → **XGBoost** + WoE scorecard | **AB+XB ensemble** (AUC-weighted) | **Transformer/BERT** (BEHRT) multi-label 301 bệnh | **Transformer/BERT** (Med-BERT) structured EHR | **XGBoost** vs SVM/RF/KNN | 7 ML + 3 NN, Pearson FS |
| Best metric (paper tự báo) | AUC **0.8763** (Test) / 0.8713 (5-fold) | AUC **0.950** (5-fold) | APS 0.525 / AUROC 0.958 (Next-6m, multi-label) | AUC 85.39 (Bi-GRU, DHF cohort) | AUC **0.9182** (10-fold) | NN Acc 88.6% (K-fold ~76%) |
| So metric trực tiếp với yang2021? | — | ❌ khác horizon + khác dataset | ❌ khác horizon + multi-label | ❌ khác horizon + cohort biến chứng | ❌ khác horizon + khác dataset | ❌ khác horizon + khác dataset |
| Xử lý imbalance | Class weight (1.22M vs 0.29M) | ❌ (chỉ dùng AUC) | (multi-label, không nêu) | (cohort phenotyped) | ❌ (n nhỏ mất cân bằng) | ❌ |
| Triển khai / ứng dụng | ✅ **Scorecard + web tool DRSC online** | ❌ chỉ notebook | ❌ (research) | ❌ (research) | ❌ | ❌ |
| Code public | ❌ Không (chỉ web tool) | ✅ GitHub 18⭐ | ✅ GitHub | ✅ GitHub | ❌ | ❌ |
| Dataset public | ❌ Private (xin tác giả) | ✅ Kaggle | ❌ gated (ISAC) | ❌ gated (DUA) | ❌ private | ✅ Kaggle |
| Tái lập | **Low** | **High** | Medium | Medium | Medium | Medium |
| Citations | 189 (venue IF cao) | 433 | 526 | 824 | (xem summary) | (xem summary) |

> **Lưu ý đọc bảng**: cột "Best metric" của mỗi bài đo trên **dataset + horizon riêng** — KHÔNG xếp hạng theo cột này. AUC 0.8763 của yang2021 thấp hơn 0.950 (hasan2020 PIMA) hay 0.9182 (wang2020 khảo sát) KHÔNG có nghĩa kém: dữ liệu EHR thật triệu mẫu noise hơn benchmark sạch nhỏ, và đó là 3 bài toán khác nhau (§3b).

---

## Trùng lặp (paper làm tương tự)

- **Cùng dùng XGBoost làm model lõi**: yang2021, wang2020 (XGBoost vs SVM/RF/KNN), và hasan2020 (XGBoost là 1 trong 2 base của ensemble) đều theo triết lý "boosting thắng classifier cổ điển". → trùng **kỹ thuật model**, nhưng yang2021 không thử ensemble/stacking (chỉ single XGBoost), khác hasan2020 (ensemble có chiến lược) và khác wang2020 (chỉ so 4 classifier trên n=368).
- **Cùng họ "feature engineering + chọn subset"**: yang2021 (IFS 16→6) ↔ hasan2020 (correlation-based FS) ↔ khanam2021 (Pearson FS 5 feature) — đều rút gọn feature, nhưng yang2021 là bài duy nhất **fusion 3 nhóm nguồn (demographics + vital signs + lab) + 5 chỉ số dẫn xuất** trước khi chọn.
- **Cùng "EHR/dữ liệu thật quy mô lớn"** (đối lập PIMA): yang2021 (1.5M), li2020 (1.6M), rasmy2021 (28M). Nhưng li2020/rasmy2021 là **Transformer trên chuỗi mã ICD, horizon long_term_risk** (dự đoán bệnh tương lai / biến chứng), khác hẳn yang2021 (tabular fusion, screening early_detection). → trùng "quy mô EHR", KHÔNG trùng phương pháp lẫn horizon.

## Khác biệt / Vượt trội (điểm yang2021 hơn)

- **Horizon mới lấp chỗ trống**: yang2021 là bài **duy nhất mang `early_detection`** trong cả baseline lẫn 4 peer — hasan2020/wang2020/khanam2021 là cross_sectional, li2020/rasmy2021 là long_term_risk. Kho đang nghiêng cross_sectional/PIMA → yang2021 bù trực tiếp horizon screening (đúng ưu tiên AGENTS.md §3b).
- **Quy mô + tính thực tế của dataset**: 1.5M bản ghi EMR thực tế ở Luzhou, chẩn đoán bằng 75g OGTT — lớn hơn PIMA (768) ~2000×, thực tế hơn khảo sát Bắc Kinh (n=368) và PIMA. Là **bằng chứng pipeline tabular chạy được trên EHR thật triệu mẫu**, đối trọng cho hasan2020/khanam2021 (PIMA) và wang2020 (n nhỏ).
- **Fusion đa nguồn feature**: gộp demographics + vital signs + lab + 5 chỉ số dẫn xuất (WHtR/MSP/MDP/SPD/DPD) rồi IFS → 6 feature dễ thu thập — chiến lược feature engineering bài bản hơn correlation/Pearson FS đơn thuần của hasan2020/khanam2021.
- **Triển khai thực tế duy nhất trong nhóm**: chưng cất model thành **scorecard WoE+LR (DRSC) chạy online** — không peer/baseline nào trong nhóm này có deployment (hasan2020/wang2020/khanam2021 chỉ notebook; li2020/rasmy2021 chỉ research). Cầu nối model→ứng dụng lâm sàng.
- **Có xử lý imbalance** (class weight trên 1.22M khỏe vs 0.29M ĐTĐ) — hasan2020 và khanam2021 không xử lý imbalance.

## Gap còn lại (yang2021 chưa giải quyết)

- **Tái lập THẤP**: dataset **PRIVATE** (chỉ "reasonable request" tới tác giả TQ) + **không code repo** (chỉ web tool) → không chạy lại được. Đây là điểm **kém hẳn baseline hasan2020** (code GitHub + data Kaggle, tái lập High) và kém peer li2020/rasmy2021 (có code public dù data gated).
- **Chỉ single XGBoost**, không thử ensemble/stacking/deep tabular — thua hasan2020 về "chiến lược model" (AB+XB AUC-weighted voting). Chênh RF/LR rất nhỏ (~1–2% AUC) nên không khai thác ensemble.
- **Recall chỉ 0.738** (bỏ sót ~26% ca dương) — đáng kể cho bài toán screening, nơi recall quan trọng hơn.
- **Không external validation** (1 vùng Luzhou) → bias dân số, chưa biết khái quát hóa.
- **Interpretability mới ở mức GI feature importance + scorecard**, chưa SHAP/LIME → chưa chạm Layer 4.

---

## Verdict

**keep_in_searched** — yang2021 là bài MỚI giá trị: lấp horizon `early_detection` còn thiếu và là bằng chứng scale-up trên EHR thật triệu mẫu + fusion đa nguồn + deployment scorecard mà baseline hasan2020 không có; nhưng dataset private + không code (tái lập Low) khiến nó chỉ dùng làm **tham chiếu phương pháp/bằng chứng scale**, BỔ SUNG chứ không thay thế baseline hasan2020 (vốn mạnh ở tái lập + ensemble có chiến lược), nên giữ trong searched_papers để user cân nhắc promote, không tự nâng.
