# So sánh: lu2021_patient_network_t2dm vs Layer 2 (Model hiệu quả)

**Bài target:** `lu2021_patient_network_t2dm` — horizon `early_detection`, dataset CBHS administrative claim (Úc, riêng tư), RF AUC 0.91 / Acc 84.95%, không code.

**Quy tắc (AGENTS.md §3b):** chỉ so metric trực tiếp khi CÙNG `prediction_horizon` + CÙNG/đè dataset. Khác horizon hoặc khác dataset → so cách tiếp cận, KHÔNG so con số.

## Bảng đối chiếu

| Paper | Horizon | Dataset | Best metric | Code | So metric trực tiếp với lu2021? |
|---|---|---|---|---|---|
| **lu2021 (target)** | early_detection | CBHS claim Úc, 2.056 BN (riêng tư) | RF AUC 0.91 / Acc 84.95% | ❌ | — |
| hasan2020 (baseline đã chọn) | cross_sectional | PIMA 768 (public) | AUC 0.950, Sn 0.789, Sp 0.934 | ✅ | ❌ khác horizon + khác dataset |
| yang2021 | **early_detection** | EHR Luzhou 1.5M (riêng tư) | XGBoost AUC 0.8763 | ❌ | ⚠️ cùng horizon NHƯNG khác dataset → không so số |
| wang2020 | cross_sectional | Khảo sát Bắc Kinh n=368 (riêng tư) | XGBoost AUC 0.9182 ± 0.0130 | ❌ | ❌ khác horizon + khác dataset |
| khanam2021 | cross_sectional | PIMA 768 (public) | NN Acc 88.6% (K-fold ~76%) | ❌ | ❌ khác horizon + khác dataset |
| li2020 (BEHRT) | long_term_risk | CPRD UK 1.6M (gated) | AUROC 0.958 / APS 0.525 (multi-label 301 bệnh) | ✅ | ❌ khác horizon + bài toán multi-label |
| rasmy2021 (Med-BERT) | long_term_risk | Cerner 28M + Truven (gated) | AUC 85.39 (DHF biến chứng) | ✅ | ❌ khác horizon + dự đoán biến chứng |

> Lưu ý: lu2021 KHÔNG có bài nào cùng horizon **và** cùng/đè dataset → không có so sánh con số fair. yang2021 là peer duy nhất cùng horizon `early_detection`, nhưng dataset hoàn toàn khác (CBHS claim Úc vs EMR Luzhou TQ) → chỉ so cách tiếp cận, không kết luận ai cao hơn từ AUC 0.91 vs 0.8763.

## Trùng lặp

- **Cùng họ model ensemble thắng tabular:** lu2021 (RF thắng) / yang2021 + wang2020 (XGBoost thắng) / hasan2020 (AB+XB ensemble) — đều là Layer 2 "ensemble boosting/bagging thắng classifier cổ điển". Trục so-sánh-nhiều-model (8 model) trùng tinh thần với khanam2021 (10 biến thể) và wang2020 (XGBoost vs SVM/RF/KNN).
- **Cùng cảnh "dữ liệu thật + riêng tư + không code":** lu2021 ⟂ wang2020 ⟂ yang2021 — cả ba đều gated, no-code, `reproducible` low/medium → cùng nhóm "tham chiếu phương pháp, không phải benchmark tái lập".

## Khác biệt / Vượt trội

- **Góc đóng góp MỚI cho cả layer:** lu2021 là bài DUY NHẤT dùng **patient network + centrality làm feature ẩn** (graph feature engineering). Không bài Layer 2 nào (hasan2020/khanam2021/wang2020/yang2021/li2020/rasmy2021) khai thác quan hệ patient–patient. Ablation (Table 3: RF chỉ network 83.98% vs chỉ patient 71.36%) là bằng chứng network feature là nguồn signal chính — đây là điểm độc nhất.
- **Khác hẳn yang2021 dù cùng horizon:** yang2021 mạnh ở SCALE (1.5M mẫu) + fusion 3 nhóm chỉ số khám + cascade scorecard triển khai; lu2021 mạnh ở PHƯƠNG PHÁP feature (graph). Hai bài bổ sung nhau, không thay thế.
- **So baseline hasan2020 (khác horizon → so cách tiếp cận, không so số):** lu2021 hơn ở NOVELTY (graph hiếm trong kho) và dữ liệu thật quy mô lớn hơn PIMA. hasan2020 hơn ở tái lập (PIMA public + code GitHub), metric y khoa đầy đủ (AUC+Sn+Sp), CV chuẩn mean±std, citations 433 vs 137.

## Gap còn lại

- **Không tái lập được:** dataset CBHS riêng tư + không code → con số 0.91 không kiểm chứng được (giống wang2020, yang2021; thua hasan2020/li2020/rasmy2021 đều có code public).
- **Nguy cơ leakage graph:** patient network dựng trên TOÀN cohort trước split → centrality một bệnh nhân phụ thuộc cả test fold; paper không nói dựng mạng riêng mỗi CV fold. Cùng loại lỗi "tiền xử lý trên toàn dataset" như khanam2021 (imputation toàn cục) nhưng tinh vi hơn.
- **Metric mỏng:** chỉ Acc + AUC, không Sn/Sp riêng (thua hasan2020), không std/CI của CV (thua wang2020 báo mean±95%CI, thua rasmy2021 báo mean±std 10 run).
- **So sánh model không fair:** LR/SVM/DT/NB để default sklearn, chỉ tuning KNN/RF/XGBoost.
- **Không external validation, không SHAP/LIME, không deployment** (chưa chạm Layer 4).

## Verdict

**keep_in_searched** — lu2021 NEW (góc graph/centrality feature engineering độc nhất trong cả Layer 2) nên có giá trị tham chiếu phương pháp, nhưng dataset riêng tư + không code + nguy cơ leakage graph khiến nó không thể làm benchmark tái lập như baseline hasan2020 đã chọn (code public), và cũng không OVERLAP đủ để loại; giữ trong searched_papers như tham chiếu hướng kỹ thuật mới.
