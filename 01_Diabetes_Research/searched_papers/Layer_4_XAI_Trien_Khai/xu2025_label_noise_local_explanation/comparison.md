# So sánh: xu2025_label_noise_local_explanation (Layer 4)

> Bài MỚI vừa phân tích (verdict=maybe). So với baseline đã chọn của Layer 4 (tasin2022)
> và 4 peer cùng layer. `prediction_horizon` của bài: **cross_sectional**.
>
> **Lưu ý §3b**: metric chỉ so trực tiếp khi **CÙNG horizon + CÙNG/đè dataset**.
> xu2025 chỉ báo **explanation difference `d` = ||δ_g − δ||₂** (càng nhỏ càng tốt) —
> KHÔNG báo accuracy/AUC. Mọi paper còn lại trong layer báo **accuracy/AUC/F1**.
> → **Khác TRỤC METRIC hoàn toàn**: KHÔNG có cặp số nào so trực tiếp được, kể cả khi
> trùng dataset (PIMA / Sylhet). Bảng dưới chỉ định vị cách tiếp cận, không so con số.

## Bảng đối chiếu

| Tiêu chí | xu2025 (bài mới) | tasin2022 (BASELINE đã chọn) | ahmed2024 | dharmarathne2024 | kaliappan2024 | nipa2023 |
|---|---|---|---|---|---|---|
| Horizon | cross_sectional | cross_sectional | cross_sectional | cross_sectional | cross_sectional | early_detection |
| Trọng tâm XAI | **Độ ỔN ĐỊNH của local explanation (LIME) dưới nhãn nhiễu** | Thêm SHAP+LIME + deploy | So sánh LIME vs SHAP (định tính) | Interface tự-giải-thích nhúng SHAP local | FeatSel đa-dataset + SHAP/LIME | SHAP early-feature + thích ứng lâm sàng |
| Metric chính | **explanation difference `d`** (nhỏ=tốt) — KHÔNG acc/AUC | Acc 81% / F1 0.81 / AUC 0.84 | Acc 86% (LR) | Acc 0.77 test / AUC 0.82 (XGB) | Acc 0.99 (RF, nghi augment) | Acc 97.11% SDHD (ET) |
| So số trực tiếp? | — | **KHÔNG** (khác trục metric) | **KHÔNG** | **KHÔNG** | **KHÔNG** | **KHÔNG** (khác cả horizon) |
| Dataset | D1=Sylhet/Early-Stage, D2=PIMA, D3/D4 **UNKNOWN** | PIMA + RTML (merged) | BRFSS-2015 | PIMA | Kaggle-2019, diab-pred, Sylhet, PIMA | SDHD/Sylhet, PDD, MDD |
| Trùng dataset với xu2025 | — | PIMA (1 phần) | không | PIMA | PIMA + Sylhet | Sylhet |
| Method lõi | Ensemble 24 Label Noise Filter → XGBoost → LIME → gộp theo local-explanation (Eq.7) | XGBoost+ADASYN, GridSearchCV | LR/RF | DT/KNN/SVC/XGB, chọn XGB | filter/wrapper FS + stacking | 35 classifier benchmark |
| Kiểm định thống kê | **Có** — paired t-test (Table 9), chứng minh lý thuyết | Không nêu | Không | Không | Không | Không |
| K-fold CV | **Có** (5-fold × 5 lần) | Không (1 split 8:2) | Không (80/20) | Không (70/30) | Không (1 split) | Không (80/20) |
| Code public | ❌ (chỉ pseudocode) | ✅ GitHub | ❌ | ❌ | ❌ | ❌ |
| Deployment | ❌ (phương pháp luận thuần) | ✅ Web + Android | ❌ | ✅ app Tkinter cục bộ | ❌ | ❌ |
| Venue | **Information Fusion (Elsevier, IF rất cao)** | Healthcare Technology Letters | hội nghị/tạp chí thường | tạp chí thường | tạp chí thường | tạp chí thường |
| Citations (§7) | 27 (~1.9/tháng — **CHƯA đạt mốc 5/tháng cho bài <1 năm**) | 266 (đạt) | 115 (đạt) | 89 (đạt) | — | 32 (đạt) |

## Trùng lặp

- **Cùng dùng LIME/SHAP trên cross_sectional ĐTĐ** với cả 5 bài (PIMA/Sylhet là dataset chung của xu2025 với tasin2022, dharmarathne2024, kaliappan2024, nipa2023).
- **kaliappan2024** trùng nhiều nhất về *bề mặt*: cùng đa-dataset có PIMA + Sylhet và cùng dùng SHAP/LIME — nhưng kaliappan dừng ở giải thích định tính để "tạo niềm tin", còn xu2025 đo *định lượng độ ổn định* của giải thích. Trùng dataset nhưng KHÁC mục tiêu.
- **ahmed2024** trùng ở chỗ "soi chất lượng giải thích XAI": ahmed so LIME vs SHAP theo fidelity/stability/consistency (định tính), xu2025 đo stability bằng số (`d`). Cùng quan tâm "giải thích có đáng tin không" → trùng HƯỚNG, khác phương pháp (định tính vs định lượng + ensemble).

## Khác biệt / Vượt trội

- **Tính mới cao nhất layer**: bài *đầu tiên* nghiên cứu tác động của **nhãn nhiễu (label noise) lên LỜI GIẢI THÍCH cục bộ** (không chỉ accuracy). Không peer nào trong layer chạm tới trục "độ tin cậy của giải thích dưới data bẩn".
- **Phương pháp luận chặt nhất layer**: là bài DUY NHẤT có **K-fold CV (5×5)** + **kiểm định thống kê (paired t-test, Table 9)** + chứng minh lý thuyết (Eq. 9-13). Cả baseline tasin2022 lẫn 4 peer đều chỉ 1 split, không CV, không t-test.
- **Venue đỉnh nhất layer**: Information Fusion (IF rất cao) — cao hơn baseline tasin2022 và mọi peer.
- **Kỹ thuật khả dụng ngay**: "gộp local explanation bằng trung bình hệ số δ (Eq. 7)" có thể bổ vào pipeline SHAP/LIME của tasin2022 để làm giải thích ổn định hơn — một *điểm nâng cấp khác biệt* cho đề tài.

## Gap còn lại

- **Khác TRỤC metric với toàn layer**: KHÔNG báo accuracy/AUC → không thể đặt cạnh tasin2022 (baseline) hay peer làm baseline số, dù trùng dataset PIMA/Sylhet.
- **Không code public** (chỉ pseudocode) — kém baseline tasin2022 (GitHub) và kém dharmarathne (có app), ngang ahmed/kaliappan/nipa.
- **Không deployment** — kém tasin2022 (web+Android) và dharmarathne (app Tkinter).
- **Dataset đích danh không rõ**: D1=Sylhet, D2=PIMA suy ra được, nhưng **D3 (1000/7) và D4 (4303/17) UNKNOWN** + data "on request" → khó tái lập đúng bản tác giả.
- **Hyperparameter LIME (T, σ) không công bố**; nhãn nhiễu là **tiêm nhân tạo** (LNS1/LNS2), chưa chắc khái quát lên noise EMR thật; lợi thế giảm khi nhiễu ≥0.5; chỉ rõ rệt với AdaBoost.
- **Gate §7 chưa đạt**: 27 cite ~1.9/tháng < mốc rising-star 5/tháng cho bài <1 năm — yếu tố cảnh báo trước khi promote (peer tasin/ahmed/dharmarathne/nipa đều đã qua mốc cite).

## Verdict

**keep_in_searched** — Hướng mới lạ nhất layer (label-noise × local-explanation), phương pháp chặt (CV + t-test) và venue đỉnh, NHƯNG khác trục metric (không acc/AUC), không code/deploy, dataset D3/D4 mù và cite ~1.9/tháng chưa đạt §7 → giữ làm **nguồn ý tưởng/phương pháp** (kỹ thuật gộp hệ số explanation để ổn định LIME), KHÔNG dùng làm baseline số; baseline tasin2022 vẫn vượt trội về code + deploy + acc/AUC + citations.
