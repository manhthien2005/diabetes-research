# Result - Layer 4: XAI / Triển khai

## Đọc 1 phút

| Ý chính | Kết luận |
|---|---|
| Paper học được gì? | Model cần giải thích và demo để dùng được ngoài notebook |
| Best model | XGBoost + ADASYN |
| Kết quả chính | Accuracy 81%, F1-score 0.81, AUC 0.84 |
| XAI | SHAP + LIME |
| Deployment | Website + Android app |
| Giá trị layer | Hoàn thiện hệ thống: predict → explain → deploy |
| Rủi ro lớn | Dataset nhỏ/private, demo chưa clinical validation |

## 1. Kết quả chính

| Setup | Accuracy | F1-score | AUC | Nguồn |
|---|---:|---:|---:|---|
| **XGBoost + ADASYN** trên merged dataset (best chính) | **81%** | **0.81** | **0.84** | PMC mục 3, Table 5, Fig. 8 |
| Bagging + SMOTE trên merged (best của SMOTE) | 79% | 0.79 | 0.87 | PMC mục 3, Table 4 |
| Domain adaptation: train PIMA → test RTML | Xem Table 6 của paper | — | — | PMC mục 3, Table 6 |
| Confusion matrix (XGBoost + ADASYN) | TP=43, TN=98, tổng đúng 141/175 test | — | — | PMC Fig. 7 |

Ghi chú: Local PDF (image-only) không trích được bảng. Mọi số ở đây đều lấy từ PMC full text. Holdout split 8:2 stratified.

## 2. Model / balancing insight

| Thành phần | Kết luận |
|---|---|
| XGBoost | Best-performing classifier trong paper |
| ADASYN | Cho best setup với XGBoost → chọn cho deployment |
| SMOTE | Best là Bagging (Acc 79%, AUC 0.87 — AUC còn cao hơn ADASYN; nhưng paper chọn ADASYN+XGBoost theo accuracy + F1) |
| GridSearchCV | Dùng tuning để giảm overfitting (PMC mục 2.3) |
| Voting/Bagging | Có thử ensemble; trong nhánh SMOTE, Bagging thắng |
| Domain adaptation | Train PIMA → test RTML để chuyển giao; PMC nhấn “versatility of the proposed system” |

## 3. XAI insight

| Tool | Paper dùng để làm gì? | Giá trị |
|---|---|---|
| SHAP | Feature importance/global-local explanation | Cho biết feature đẩy prediction tăng/giảm |
| LIME | Giải thích từng prediction cụ thể | Dễ trình bày cho người dùng/bác sĩ |

## 4. Deployment insight

| Thành phần | Kết quả |
|---|---|
| Website | Có triển khai prediction system |
| Android app | Có triển khai smartphone app |
| Frontend | HTML/CSS |
| Android | Android Studio, Java |
| Hosting | Heroku |
| Giá trị | Cho thấy đường đi từ model sang demo thực tế |

## 5. Điểm mạnh

| Điểm mạnh | Tác dụng |
|---|---|
| Có XAI | Không chỉ trả label, còn giải thích |
| Có deployment | Website/Android giúp demo dễ hiểu |
| Có GitHub | Dễ kiểm tra code/data |
| Có dataset ngoài PIMA | RTML Bangladesh giúp tăng tính thực địa |
| Có imbalance handling | SMOTE/ADASYN phù hợp tabular medical data |
| Có tuning | GridSearchCV giúp kiểm soát hyperparameter |
| Kết quả không thổi phồng | Accuracy 81% thực tế hơn nhiều paper quá cao |

## 6. Điểm yếu / hạn chế

| Hạn chế | Hậu quả |
|---|---|
| RTML chỉ 203 mẫu | Generalization yếu |
| Dataset có thể lệch giới | Nếu chủ yếu female, khó áp dụng rộng |
| Insulin ước lượng bằng model phụ | Sai số truyền sang model chính |
| Không external hospital validation | Chưa biết chạy tốt ngoài dataset paper |
| XAI không phải causal | SHAP/LIME không chứng minh nguyên nhân bệnh |
| Web/app chỉ demo | Không phải medical device |
| Privacy/security chưa rõ | App sức khỏe cần bảo mật nghiêm |

## 7. Bài học rút ra

| Bài học | Ý nghĩa |
|---|---|
| XAI cần cho ứng dụng y tế | Người dùng cần biết vì sao model dự đoán |
| Deployment tạo giá trị trình bày | Web/app giúp nghiên cứu dễ thuyết phục |
| XGBoost vẫn mạnh | Tabular diabetes data hợp với boosting |
| ADASYN/SMOTE phải dùng đúng | Chỉ áp dụng trên train set |
| Dataset thực địa nhỏ vẫn có ích | Nhưng không đủ để kết luận lâm sàng |
| Cần disclaimer | Screening support, không diagnosis |

## 8. Nên áp dụng vào project

| Nên dùng | Cách dùng |
|---|---|
| XGBoost | Model chính cho demo |
| SHAP | Global feature importance + local explanation |
| LIME | Giải thích từng bệnh nhân/demo case |
| Streamlit/FastAPI | Triển khai nhanh hơn Android full |
| ADASYN/SMOTE | Chỉ trên training data |
| GitHub repo paper | Tham khảo data/code |
| Disclaimer UI | Tránh hiểu nhầm y khoa |

## 9. Không nên áp dụng máy móc

| Không nên | Lý do |
|---|---|
| Gọi app là chẩn đoán | Sai học thuật/y khoa |
| Tin SHAP/LIME là nguyên nhân bệnh | Chỉ là explanation của model |
| Đưa app public nhập dữ liệu thật | Chưa xử lý privacy/security |
| Dùng dataset nhỏ để kết luận rộng | RTML 203 mẫu không đủ |
| Oversampling trước split | Leakage |
| Bỏ kiểm thử external | Không biết generalization |

## 10. Câu chốt khi thuyết trình

| Mục | Câu nói ngắn |
|---|---|
| Layer này là gì? | “Layer 4 đưa model ra demo và thêm explainability.” |
| Model chính? | “XGBoost + ADASYN đạt Accuracy 81%, F1 0.81, AUC 0.84.” |
| XAI để làm gì? | “SHAP/LIME giúp giải thích feature ảnh hưởng đến dự đoán.” |
| Deployment? | “Paper có website và Android app.” |
| Giới hạn? | “App chỉ hỗ trợ sàng lọc, cần validation trước khi dùng y tế.” |
