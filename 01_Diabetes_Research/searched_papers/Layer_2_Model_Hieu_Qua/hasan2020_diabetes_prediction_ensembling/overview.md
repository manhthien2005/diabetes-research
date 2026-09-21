# Overview - Layer 2: Model hiệu quả

## Đọc 1 phút

| Câu hỏi | Trả lời ngắn |
|---|---|
| Paper làm gì? | Dự đoán diabetes bằng ensemble nhiều ML classifiers |
| Dataset | PIMA Indians Diabetes Dataset / PID |
| Điểm chính | Weighted soft voting, trọng số = AUC từng model |
| Model tốt nhất | AdaBoost + XGBoost |
| Metric chính | AUC |
| Kết quả chính | AUC 0.950, Sensitivity 0.789, Specificity 0.934 |
| Vai trò layer | Nâng từ baseline pipeline sang model hiệu quả hơn |
| Cảnh báo | PIMA nhỏ, dễ overfit/leakage nếu preprocessing/CV làm sai |

## 1. Thông tin paper

| Mục | Nội dung |
|---|---|
| Tên paper | Diabetes Prediction Using Ensembling of Different Machine Learning Classifiers |
| Tác giả | Md. Kamrul Hasan, Md. Ashraful Alam, Dola Das, Eklas Hossain, Mahmudul Hasan |
| Năm | 2020 |
| Nguồn | IEEE Access, Special Section on Deep Learning Algorithms for Internet of Medical Things |
| DOI | 10.1109/ACCESS.2020.2989857 |
| File PDF | `papers/Diabetes Prediction Using Ensembling of Different Machine Learning Classifiers.pdf` |
| Code | https://github.com/kamruleee51/Diabetes-Prediction-Using-MLClassifiers |
| Data | https://www.kaggle.com/uciml/pima-indians-diabetes-database |
| Nguồn trích | Abstract trang 1; Sections II-III; Tables 3-9; Fig. 8 |

## 2. Paper giải quyết gì?

| Thành phần | Nội dung |
|---|---|
| Bài toán | Diabetes prediction/classification trên PIMA |
| Mục tiêu | Tăng hiệu quả dự đoán bằng ensemble ML |
| Dữ liệu | 768 nữ bệnh nhân PIMA Indian population |
| Vấn đề dữ liệu | Ít mẫu, outliers, missing/null values, imbalance |
| Hướng giải | Preprocessing + feature selection + K-fold CV + grid search + weighted ensemble |
| Không phải | Không phải EHR theo thời gian; không phải clinical diagnosis system |

## 3. Vì sao là Layer 2?

| Lý do | Giải thích |
|---|---|
| Trọng tâm là model | Paper tập trung chọn/tối ưu classifier tốt nhất |
| Ensemble rõ | Soft weighted voting nhiều model |
| Nâng cấp Layer 1 | Không chỉ pipeline; thêm chiến lược kết hợp model |
| Metric hợp lý hơn | Dùng AUC làm mục tiêu tuning và trọng số ensemble |
| Chưa phải Layer 3 | Không dùng EHR/biobank thực tế |
| Chưa phải Layer 4 | Chưa có XAI/deployment thật, chỉ có code public |

## 4. Đóng góp chính

| Đóng góp | Ý nghĩa |
|---|---|
| Robust preprocessing | Outlier rejection, mean imputation, standardization |
| Feature selection | PCA, ICA, correlation-based feature selection |
| Nested-style KCV | Stratified 5-fold CV + grid search hyperparameter |
| Nhiều classifier | k-NN, DT, RF, AdaBoost, Naive Bayes, XGBoost, MLP |
| Weighted ensemble | Weight = AUC từng model, dùng soft voting |
| Best model | AdaBoost + XGBoost |
| Code public | Tăng khả năng tái lập |

## 5. Kết quả chính

| Metric | Giá trị | Nguồn |
|---|---:|---|
| Sensitivity | 0.789 | Abstract / Table 7-8 |
| Specificity | 0.934 | Abstract / Table 7-8 |
| False Omission Rate | 0.092 | Abstract / Table 7-8 |
| Diagnostic Odds Ratio | 66.234 | Abstract / Table 7-8 |
| AUC | 0.950 | Abstract / Table 7-9 |
| Precision | 84.2% | Section III-D, Fig. 8 discussion |
| Best single ML | XGBoost, AUC 0.946 ± 0.020 | Section III-B |
| Best MLP | AUC 0.902 ± 0.020 | Section III-C |

## 6. Điểm mạnh

| Điểm mạnh | Vì sao đáng giá |
|---|---|
| Dùng AUC làm metric chính | Phù hợp hơn accuracy khi class imbalance |
| Ensemble có nguyên lý | Trọng số dựa trên AUC từng classifier |
| So sánh nhiều model | Có ML truyền thống, boosting, MLP |
| Có hyperparameter tuning | Grid search trong K-fold CV |
| Có code public | Dễ tái lập hơn nhiều paper khác |
| Có nhiều metric y khoa | Sn, Sp, FOR, DOR, AUC |
| Kết quả tốt hơn baseline | AB+XB đạt AUC 0.950 |

## 7. Điểm yếu / rủi ro

| Điểm yếu | Rủi ro khi trình bày |
|---|---|
| Chỉ dùng PIMA | Dataset nhỏ, cũ, bias dân số |
| Không external validation | Chưa chứng minh chạy tốt ngoài PIMA |
| Preprocessing phức tạp | Dễ leakage nếu fit ngoài CV fold |
| Feature selection correlation-based | Nếu làm trước split/CV sẽ lộ label test |
| AUC cao | Cần kiểm tra code/split/tuning kỹ |
| MLP không mạnh | Deep learning không phù hợp khi data quá nhỏ |
| Không có XAI | Model ensemble khó giải thích |
| Không deployment lâm sàng | Chỉ code nghiên cứu, không app dùng thật |

## 8. Câu chốt

| Ý chính | Cách nói khi thuyết trình |
|---|---|
| Layer này là gì? | “Layer 2 tối ưu hiệu quả model bằng AUC-weighted ensemble.” |
| Model thắng | “AdaBoost + XGBoost tốt nhất vì kết hợp sequential boosting và parallel boosting.” |
| Bài học lớn | “AUC tốt hơn accuracy khi dữ liệu mất cân bằng.” |
| Cảnh báo lớn | “PIMA nhỏ nên kết quả 0.950 AUC cần đọc thận trọng.” |
| Kết nối layer | “Sau pipeline Layer 1, Layer 2 học cách nâng hiệu quả classifier.” |
