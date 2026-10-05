# Báo cáo với giảng viên hướng dẫn: so sánh bảy mô hình phân loại trạng thái đái tháo đường tự báo cáo trong BRFSS 2025

**Bản dùng để trao đổi học thuật — cập nhật 05/10/2026.** Đây là báo cáo thực nghiệm trên dữ liệu khảo sát, có tham khảo nghiên cứu trước; chưa phải systematic review hay một bài survey tổng quan tài liệu. Bản giải thích chi tiết nằm trong [GIAI_THICH_FULL_STUDY_VI.md](GIAI_THICH_FULL_STUDY_VI.md).

## 1. Câu hỏi và giá trị của công việc

Câu hỏi nghiên cứu là: **khi dùng cùng bộ biến, cách xử lý dữ liệu và tập đánh giá, bảy cấu hình classifier khác nhau thế nào về khả năng xếp hạng, nhận diện nhãn dương và chất lượng xác suất?** Logistic Regression (LR) là mô hình tham chiếu đơn giản.

Giá trị hiện có là một benchmark có thể kiểm tra lại: từ định nghĩa nhãn, xử lý mã khảo sát, cô lập preprocessing trong training folds đến đối chiếu nhiều thước đo trên cùng người trả lời. Đây là một đóng góp thực nghiệm ở mức vừa phải. Chưa có thuật toán mới, chưa chứng minh vượt nghiên cứu trước hoặc đem lại lợi ích lâm sàng; việc dùng một năm dữ liệu mới tự nó không đủ tạo novelty.

BRFSS đã được dùng để so sánh classifier, chẳng hạn Xie và cộng sự (2019, Methods/Results); Li và cộng sự (2024) nghiên cứu GA-XGBoost và stacking. Hai công trình này cung cấp bối cảnh lựa chọn phương pháp, không phải đối chứng để so trực tiếp các điểm AUC với study hiện tại. Outcome, cohort, feature set và cách xử lý dữ liệu phải tương thích trước khi kết luận một nghiên cứu tốt hơn nghiên cứu khác. [R1–R2]

## 2. Dữ liệu, nhãn và thiết kế

| Thành phần | Thiết kế đã thực hiện |
|---|---|
| Nguồn | Public-use CDC BRFSS 2025; 356.158 người, 283 biến trong XPT |
| Phạm vi địa lý | 47 bang, District of Columbia, Guam và Puerto Rico |
| Thời gian phỏng vấn đã kiểm tra | 05/01/2025–16/03/2026; “2025” là tên bản phát hành |
| Nhãn dương | `DIABETE4=1`: trả lời đã được thông báo mắc đái tháo đường |
| Nhãn âm | `DIABETE4=3`: trả lời “không”; không được coi là xác nhận âm tính bằng xét nghiệm |
| Loại khỏi cohort | Chỉ mắc trong thai kỳ, prediabetes/borderline, không biết, từ chối và thiếu nhãn |
| Cohort | 342.539 người; 51.827 nhãn dương, tương ứng 15,13% mẫu chưa áp trọng số |
| Development / test | 274.031 / 68.508; stratified 80/20, seed 42 |
| Đầu vào | 20 predictors, thành 82 cột trong fit trên toàn bộ training set |
| Preprocessing | Bốn biến liên tục: median + standardization; 16 biến categorical: missing category + one-hot |
| Đánh giá trong development | Stratified 5-fold CV; fit preprocessing riêng trong mỗi training fold |
| Class distribution | Không SMOTE, không class weighting; giữ phân bố của mẫu phân tích |
| Ngưỡng phân loại | Probability 0,5; Linear SVM dùng decision margin 0 |

Nhãn phản ánh **trạng thái tự báo cáo tại cuộc khảo sát**, không phải phát hiện đái tháo đường chưa chẩn đoán, không tách riêng type 2 và không dự báo mắc bệnh sau vài năm. Thông tin bệnh đi kèm có thể xuất hiện sau chẩn đoán; vì vậy không diễn giải predictor thành nguyên nhân gây bệnh.

## 3. Kết quả chính

Các giá trị dưới đây là point estimates trên cùng 68.508 người trong internal test. “Recall” và “precision” đều được đối chiếu với nhãn khảo sát.

| Model | ROC-AUC ↑ | AP ↑ | Recall ↑ | Precision ↑ | Brier ↓ |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0,8262 | 0,4466 | 0,1882 | 0,5715 | 0,1033 |
| Decision Tree | 0,6021 | 0,2053 | 0,3380 | 0,3102 | 0,2134 |
| Random Forest | 0,8045 | 0,4025 | 0,1889 | 0,5213 | 0,1076 |
| Gradient Boosting | 0,8260 | 0,4483 | 0,1723 | 0,5860 | 0,1031 |
| XGBoost | 0,8263 | 0,4417 | 0,1964 | 0,5574 | 0,1035 |
| Linear SVM | 0,8262 | 0,4479 | 0,1208 | 0,6244 | Không áp dụng |
| Gaussian Naive Bayes | 0,7886 | 0,3641 | 0,7082 | 0,3192 | 0,2523 |

Mũi tên chỉ chiều thuận lợi của từng metric khi các điều kiện đánh giá tương đương, không phải hướng dẫn chọn model cho lâm sàng. AP là Average Precision; Brier đo sai số xác suất tổng thể, không đo riêng calibration. SVM sinh margin, chưa có probability calibration nên không tính Brier.

**Ba quan sát cần nhớ:**

1. LR, GB, XGBoost và Linear SVM có ROC-AUC quan sát rất gần nhau, khoảng 0,826. Độ phức tạp cao hơn chưa cho thấy lợi thế ROC-AUC rõ so với LR trong các cấu hình này.
2. Tại ngưỡng 0,5, LR nhận đúng **1.951/10.365 nhãn dương**, bỏ sót 8.414 và báo dương nhầm 1.463 người. Accuracy 85,58% không đồng nghĩa phát hiện được 85,58% người mang nhãn dương. Luôn dự đoán âm đã đạt khoảng 84,87% accuracy.
3. GNB có recall 70,82%, nhưng báo dương nhầm **15.658** người và precision chỉ 31,92%. Chưa thể chọn nó cho sàng lọc chỉ vì recall cao: cần so sánh ở mục tiêu/ngưỡng phù hợp trong một nghiên cứu khác.

## 4. Độ chắc chắn của so sánh

Paired bootstrap lấy lại cùng người cho cả hai model rồi tính chênh lệch, giữ mối liên hệ giữa các dự đoán. Supplement 5.000 replicates dùng frozen predictions, không huấn luyện lại.

| Contrast, LR trừ comparator | Difference ROC-AUC | Khoảng 95% chưa hiệu chỉnh |
|---|---:|---|
| LR − GB | +0,000152 | [−0,001003; +0,001272] |
| LR − XGBoost | −0,000122 | [−0,001546; +0,001332] |
| LR − Linear SVM | +0,000010 | [−0,000650; +0,000669] |

Ba khoảng đều chứa 0; **không phát hiện khác biệt rõ không đồng nghĩa đã chứng minh tương đương**. LR có AP cao hơn XGBoost 0,004919, khoảng chưa hiệu chỉnh [0,000173; 0,009649]. Đây là khác biệt nhỏ theo một metric, mang tính exploratory; kiểm tra nhạy cảm Bonferroni cho sáu contrasts cho khoảng chứa 0. Không suy ra overall superiority.

Calibration được kiểm tra bằng đường calibration và logistic intercept/slope. LR có joint intercept 0,0135, slope 1,0133; các giá trị gần mốc tham chiếu 0 và 1 trong mẫu này. Calibration supplement là diagnostic, không được dùng để điều chỉnh primary predictions.

## 5. Những giới hạn cần chủ động trình bày

| Giới hạn | Hệ quả đối với kết luận |
|---|---|
| Self-report, cross-sectional | Không chẩn đoán xét nghiệm, không suy nhân quả hoặc dự báo tương lai |
| Cùng nguồn dữ liệu cho train/test | Chưa chứng minh dùng tốt ở năm, địa phương hay hệ thống y tế khác |
| Không dùng survey weighting/design-based inference | Không coi 15,13% hoặc performance là ước lượng đại diện toàn dân |
| Chưa có subgroup/fairness evaluation | Chưa biết hiệu năng khác nhau thế nào giữa các nhóm |
| Bảy cấu hình cố định | Không đại diện hiệu năng tối ưu của từng algorithm family |
| Bootstrap điều kiện trên frozen models và sample | Không bao gồm biến thiên huấn luyện, split khác hoặc survey design |
| A01: chưa đủ evidence về prospective joint prespecification / test exposure | Không claim confirmatory comparison được khóa toàn bộ trước test; chưa chứng minh adaptive model selection |
| A02: xem covariate coverage trước split | Counterfactual train-only trước đó không cho thấy practical feature-set impact; không gọi chung là feature-selection leakage |

Đồng thuận hai reviewer là **MINOR REVISION FOR STATED SCOPE**: evidence hiện tại chưa chứng minh FATAL/MAJOR scientific-validity defect chưa giải quyết. Đây là kết luận review nội bộ, không phải sự chấp thuận của journal. Điểm lịch sử 69→82 không dùng như readiness score. Tests kỹ thuật không tự chứng minh giá trị khoa học.

## 6. Kết luận và đề nghị trao đổi với thầy

Trong benchmark nội bộ này, LR đạt khả năng xếp hạng nhãn gần các cấu hình GB/XGBoost/Linear SVM về ROC-AUC quan sát; khác biệt giữa các model thể hiện rõ ở ngưỡng quyết định và chất lượng xác suất. Kết quả hỗ trợ một cách so sánh có kiểm soát và diễn giải trade-off, chưa xác lập một model thắng toàn diện hay một công cụ lâm sàng.

Ba câu hỏi để xin định hướng: (1) mức đóng góp benchmark hiện tại đã phù hợp mục tiêu học phần/nghiên cứu nhỏ chưa; (2) thầy muốn ưu tiên đào sâu tổng quan phương pháp hay thiết kế một câu hỏi thực nghiệm mới; (3) nếu làm thí nghiệm mới, câu hỏi nào có ý nghĩa nhất và cần khóa protocol trước khi chạy? Chưa tự động thêm model, tối ưu ngưỡng hay external validation chỉ để làm báo cáo dài hơn.

## Nguồn và cách kiểm tra

- Dữ liệu: [CDC BRFSS 2025](https://www.cdc.gov/brfss/annual_data/annual_2025.html); [codebook](https://www.cdc.gov/brfss/annual_data/2025/zip/codebook25_llcp-v2-508.zip). Counts, dates và identity checks: `../../02_Implementation/BRFSS_Survey/qc/astra_data_evidence.json`, `astra_interview_dates.json`.
- Bảng model: `../../02_Implementation/BRFSS_Survey/qc/astra_statistics_point_metrics.csv`; intervals: [supplement](supplement/top4_paired_bootstrap_5000_robustness.csv); calibration: [supplement](supplement/calibration_intercept_slope.csv). Chỉ trình bày lại kết quả đã có.
- R1. Xie Z, Nikolayeva O, Luo J, Li D. Building Risk Prediction Models for Type 2 Diabetes Using Machine Learning Techniques. *Preventing Chronic Disease*. 2019;16:E130. [doi:10.5888/pcd16.190109](https://doi.org/10.5888/pcd16.190109).
- R2. Li W, Peng Y, Peng K. Diabetes prediction model based on GA-XGBoost and stacking ensemble algorithm. *PLOS ONE*. 2024;19:e0311222. [doi:10.1371/journal.pone.0311222](https://doi.org/10.1371/journal.pone.0311222).
- R3. Collins GS, Moons KGM, Dhiman P, et al. TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods. *BMJ*. 2024;385:e078378. [doi:10.1136/bmj-2023-078378](https://doi.org/10.1136/bmj-2023-078378). Dùng làm khung kiểm tra reporting, không tuyên bố đã hoàn tất mọi mục hay đã có manuscript nộp báo.
- Diễn giải review hiện hành: [FINAL_CONSENSUS.md](FINAL_CONSENSUS.md). Audit cũ được giữ để theo dõi lịch sử.
