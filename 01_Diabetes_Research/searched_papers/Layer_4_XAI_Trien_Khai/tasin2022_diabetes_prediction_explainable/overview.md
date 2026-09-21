# Overview - Layer 4: XAI / Triển khai

## Đọc 1 phút

| Câu hỏi | Trả lời ngắn |
|---|---|
| Paper làm gì? | Diabetes prediction + XAI + web/Android deployment |
| Dataset | PIMA + private RTML Bangladesh dataset |
| Model chính | XGBoost |
| Best setup | XGBoost + ADASYN |
| Kết quả chính | Accuracy 81%, F1-score 0.81, AUC 0.84 trên merged dataset |
| XAI | SHAP + LIME |
| Deployment | Website + Android app |
| Giá trị layer | Biến model thành demo có giải thích |
| Cảnh báo | Private dataset nhỏ, app/demo không đồng nghĩa clinical validation |

## 1. Thông tin paper

| Mục | Nội dung |
|---|---|
| Tên paper | Diabetes prediction using machine learning and explainable AI techniques |
| Tác giả | Isfafuzzaman Tasin, Tansin Ullah Nabil, Sanjida Islam, Riasat Khan |
| Đơn vị | North South University, Dhaka, Bangladesh |
| Năm | 2023 (Volume 10, Issue 1-2; received 2022-09-01, accepted 2022-11-29) |
| Nguồn | Healthcare Technology Letters, Wiley / IET (Open Access) |
| DOI | 10.1049/htl2.12039 |
| PMC full text | https://pmc.ncbi.nlm.nih.gov/articles/PMC10107388/ |
| GitHub/code/data | https://github.com/tansin-nabil/Diabetes-Prediction-Using-Machine-Learning |
| File PDF | `papers/Diabetes prediction using machine learning and explainable AI techniques.pdf` |
| Ghi chú nguồn | PDF được lưu dưới dạng ảnh nên text extract rỗng; mọi trích dẫn đều từ PMC full text |

## 2. Paper giải quyết gì?

| Thành phần | Nội dung |
|---|---|
| Bài toán | Diabetes prediction/classification |
| Mục tiêu | Dự đoán sớm + giải thích model + triển khai demo |
| Input | Health features kiểu PIMA |
| Output | Diabetes / non-diabetes + explanation |
| Điểm khác Layer 1-3 | Có SHAP/LIME và web/Android app |
| Không phải | Không phải clinical diagnosis đã được phê duyệt |

## 3. Vì sao là Layer 4?

| Lý do | Giải thích |
|---|---|
| Có XAI | Dùng SHAP và LIME để giải thích dự đoán |
| Có deployment | Website và Android app |
| Có code/data | GitHub public theo paper |
| Có dataset thực địa | Private RTML Bangladesh dataset |
| Gần sản phẩm | Không chỉ train/evaluate model |
| Hoàn thiện lộ trình | Sau pipeline/model/EHR, layer này thêm explainability + demo |

## 4. Dataset chính

| Dataset | Số mẫu | Public? | Ghi chú |
|---|---:|---|---|
| PIMA Indian dataset | 768 | Public | Benchmark quen thuộc; 268 diabetic / 500 non-diabetic |
| RTML private Bangladesh dataset | 203 | Có trên GitHub kèm paper | Nữ 18–77 tuổi, thu tại Rownak Textile Mills Ltd, Dhaka; 6 feature (thiếu insulin và diabetes pedigree function) |
| Merged dataset | ~877 mẫu sau khi loại `DiabetesPedigreeFunction` (mục 2.2 PMC) | Một phần public/GitHub | Phân bố: 302 diabetic / 669 non-diabetic trước oversampling; dùng để train/test chính + thử domain adaptation |
| Domain adaptation | Train PIMA → test RTML | — | Thực hiện trong Table 6 của paper để đánh giá tính chuyển giao |

## 5. Pipeline chính

| Bước | Kỹ thuật | Mục đích |
|---:|---|---|
| 1 | Load PIMA + RTML | Gộp/so sánh dataset |
| 2 | Handle zero/missing values | Thay giá trị bất thường (skin thickness=0, BMI=0...) bằng mean |
| 3 | Predict missing insulin | XGB regressor học trên **PIMA** (so RMSE với SVR/GPR ở Table 3) rồi predict insulin cho RTML (semi-supervised) |
| 4 | Feature selection | Mutual information; loại `DiabetesPedigreeFunction` vì điểm thấp nhất |
| 5 | Normalize | Min-Max normalization |
| 6 | Holdout split | Stratified 8:2 train–test (mục 3, PMC) |
| 7 | Balance | SMOTE / ADASYN áp dụng **chỉ** trên training set |
| 8 | Train models | DT, KNN, RF, SVM, LR, AdaBoost, XGBoost, Voting, Bagging |
| 9 | Tune | GridSearchCV cho mỗi model |
| 10 | Explain | SHAP + LIME trên XGBoost + ADASYN |
| 11 | Deploy | Website (HTML/CSS + Spyder/Anaconda) + Android (Android Studio + Java) host trên Heroku |

## 6. Điểm mạnh

| Điểm mạnh | Vì sao đáng giá |
|---|---|
| Có XAI | Giúp người dùng/bác sĩ hiểu feature ảnh hưởng |
| Có deployment | Có website và Android app, không chỉ notebook |
| Có GitHub | Dễ kiểm tra code/data hơn |
| Dùng private dataset | Thêm dữ liệu ngoài PIMA |
| Dùng SMOTE/ADASYN | Xử lý class imbalance |
| Dùng GridSearchCV | Có tuning hyperparameter |
| XGBoost phù hợp tabular | Model mạnh cho dữ liệu bảng |

## 7. Điểm yếu / rủi ro

| Điểm yếu | Rủi ro khi trình bày |
|---|---|
| Private RTML nhỏ | 203 mẫu, khó khái quát |
| Dataset nữ | Generalization sang nam/nhóm khác hạn chế |
| Insulin được dự đoán | Feature nhân tạo có thể mang lỗi mô hình phụ |
| SMOTE/ADASYN dễ leakage | Nếu áp dụng trước split sẽ làm metric ảo |
| XAI không đảm bảo đúng y khoa | SHAP/LIME giải thích model, không giải thích nguyên nhân bệnh |
| App/web chưa clinical validation | Demo không phải sản phẩm y tế |
| Accuracy 81% không quá cao | Cần trình bày trung thực, không thổi phồng |

## 8. Câu chốt

| Ý chính | Cách nói khi thuyết trình |
|---|---|
| Layer này là gì? | “Layer 4 biến model thành hệ thống có giải thích và demo.” |
| Model thắng | “XGBoost + ADASYN tốt nhất trong paper.” |
| XAI làm gì? | “SHAP/LIME cho biết feature nào đẩy dự đoán lên/xuống.” |
| Deployment làm gì? | “Website/Android app giúp người dùng nhập chỉ số và xem kết quả.” |
| Cảnh báo | “Demo chỉ hỗ trợ sàng lọc, không thay bác sĩ.” |
