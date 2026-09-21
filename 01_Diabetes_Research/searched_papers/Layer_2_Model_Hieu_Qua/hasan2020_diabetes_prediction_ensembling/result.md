# Result - Layer 2: Model hiệu quả

## Đọc 1 phút

| Ý chính | Kết luận |
|---|---|
| Paper học được gì? | Ensemble có thể tăng AUC so với model đơn |
| Best single ML | XGBoost, AUC 0.946 ± 0.020 |
| Best MLP | AUC 0.902 ± 0.020 |
| Best ensemble | AdaBoost + XGBoost |
| Kết quả ensemble | AUC 0.950 |
| Giá trị layer | Nâng pipeline Layer 1 thành model hiệu quả hơn |
| Rủi ro lớn | PIMA nhỏ + preprocessing/CV leakage |

## 1. Kết quả chính

| Model / cấu hình | Sensitivity | Specificity | FOR | DOR | AUC | Nguồn |
|---|---:|---:|---:|---:|---:|---|
| Proposed ensemble AB+XB (P + Q + correlation) | 0.789 | 0.934 | 0.092 | 66.234 | 0.950 | Abstract; Section III-D |
| XGBoost single (P + Q + correlation) | Sn/Sp/FOR/DOR chưa trích được ở Table 3-4 trong PDF này | — | — | — | 0.946 ± 0.020 | Section III-B |
| MLP best (M=3 hidden, N1=16, N2=64, N3=64) | Tương tự — | — | — | — | 0.902 ± 0.020 | Section III-C; Fig. 7 |

Ghi chú: Paper lấy AUC làm metric chính để tuning và tính weight ensemble. Tài liệu này đã trích đủ con số ensemble từ Abstract/Table 4 (“best performing classifier”), còn số liệu Sn/Sp riêng cho XGBoost single được đề cập ở Table 3-4 của paper nhưng không được dùng ở cột này để tránh chuyển số sai từ bảng PDF khó đọc.

## 2. So sánh ngắn

| Nhóm model | Kết luận paper |
|---|---|
| Classical ML | Boosting classifiers mạnh nhất |
| XGBoost | Best single classifier với AUC 0.946 ± 0.020 |
| MLP | Kém hơn ensemble; data nhỏ dễ overfit |
| AB+XB | Best overall, AUC 0.950 |
| All 6 models ensemble | Không tốt bằng AB+XB theo AUC |

## 3. Vì sao AB+XB thắng?

| Lý do | Giải thích |
|---|---|
| Cùng là boosting | Cả hai đều mạnh với tabular classification |
| AdaBoost | Sequential boosting, tập trung sample khó |
| XGBoost | Gradient boosting, tối ưu loss mạnh |
| Soft voting | Kết hợp probability thay vì hard label |
| Weight theo AUC | Model tốt hơn có trọng số lớn hơn |
| Ít model hơn nhưng chất hơn | Kết hợp tất cả 6 model không nhất thiết tốt hơn |

## 4. Bài học rút ra

| Bài học | Ý nghĩa |
|---|---|
| AUC nên ưu tiên | Class imbalance làm accuracy dễ gây hiểu nhầm |
| Feature selection quan trọng | Correlation-based selection tốt hơn PCA/ICA trong paper |
| Preprocessing ảnh hưởng lớn | Outlier rejection + imputation cải thiện rõ |
| Standardization không luôn giúp | Tree/boosting model không phụ thuộc scale mạnh |
| Deep learning không luôn tốt | PIMA nhỏ, MLP dễ overfit |
| Ensemble phải chọn lọc | Nhiều model hơn không đồng nghĩa tốt hơn |

## 5. Điểm mạnh

| Điểm mạnh | Tác dụng |
|---|---|
| AUC-weighted soft voting | Ensemble có logic rõ |
| Dùng nhiều metric | Có Sn, Sp, Precision, FOR, DOR, AUC |
| Grid search | Tối ưu hyperparameter có hệ thống |
| Stratified K-fold | Giữ tỷ lệ class trong fold |
| Code public | Tăng khả năng kiểm chứng |
| So sánh rộng | ML models + MLP + ensembles |

## 6. Điểm yếu / hạn chế

| Hạn chế | Hậu quả |
|---|---|
| Chỉ PIMA | Khó khái quát ra dữ liệu thực tế |
| Dataset nhỏ | AUC dễ nhạy với split/CV |
| Chưa external validation | Chưa biết hiệu quả ở bệnh viện khác |
| Preprocessing có nguy cơ leakage | Nếu fit ngoài fold, metric ảo |
| Correlation feature selection dùng label | Cần đặt trong CV fold |
| Ensemble khó giải thích | Bác sĩ khó hiểu lý do dự đoán |
| Chưa deployment/XAI | Chưa đủ cho hệ thống thực tế |

## 7. Nên áp dụng vào project

| Nên dùng | Cách dùng |
|---|---|
| XGBoost | Strong baseline sau RF |
| AdaBoost + XGBoost | Ensemble thử nghiệm chính |
| AUC-weighted voting | Cách ensemble dễ giải thích toán học |
| Stratified CV | Bắt buộc với PIMA imbalance |
| Grid search theo AUC | Tối ưu đúng metric |
| FOR + Sensitivity | Hợp với bài toán sàng lọc |
| Code public | Dùng để đối chiếu tái lập |

## 8. Không nên áp dụng máy móc

| Không nên | Lý do |
|---|---|
| Tin AUC 0.950 là đủ | Chưa external validation |
| Gộp mọi model vào ensemble | Có thể giảm AUC |
| Dùng MLP vì “deep learning hay hơn” | Data nhỏ, MLP kém hơn |
| Fit feature selection toàn data | Leakage |
| Chỉ báo AUC | Cần Sn/Sp/FOR/DOR |
| Gọi model là diagnosis tool | Paper chỉ làm prediction/classification |

## 9. Câu chốt khi thuyết trình

| Mục | Câu nói ngắn |
|---|---|
| Layer này là gì? | “Layer 2 tìm model hiệu quả bằng ensemble.” |
| Model mạnh nhất? | “AdaBoost + XGBoost weighted soft voting.” |
| Kết quả? | “AUC đạt 0.950, cao hơn XGBoost đơn.” |
| Bài học? | “Ensemble tốt khi chọn model bổ sung nhau, không phải gộp càng nhiều càng tốt.” |
| Giới hạn? | “PIMA nhỏ nên cần external validation trước khi dùng thực tế.” |
