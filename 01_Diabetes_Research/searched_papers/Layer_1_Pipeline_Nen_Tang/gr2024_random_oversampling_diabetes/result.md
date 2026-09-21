# Result - Layer 1: Pipeline nền tảng

## Đọc 1 phút

| Ý chính | Kết luận |
|---|---|
| Paper học được gì? | Pipeline ML sạch quan trọng hơn chỉ chọn model |
| Model thắng | Random Forest + Boruta |
| Kết quả mạnh nhất | 94% PIDD, 92% BRFSS |
| Giá trị cho đề tài | Baseline cho Layer 2-4 |
| Rủi ro lớn nhất | Data leakage + overfitting |
| Cách trình bày | “Layer 1 = nền móng preprocessing + baseline model” |

## 1. Kết quả chính

| Dataset | Cấu hình tốt nhất | Accuracy | Precision | Recall | F1-score | Nguồn |
|---|---|---:|---:|---:|---:|---|
| PIDD | RF + Boruta | 94% | 92% | 95% | 94% | Table 6 |
| BRFSS | RF + Boruta | 92% | 88% | 98% | 93% | Table 6 |
| PIDD | RF + Boruta + 10-fold CV | 94.03% | 92.02% | 95.06% | 94.00% | Table 7 |
| BRFSS | RF + Boruta + 10-fold CV | 92.00% | 88.06% | 98.05% | 93.06% | Table 8 |

## 2. Bài học rút ra

| Bài học | Ý nghĩa |
|---|---|
| Preprocessing rất quan trọng | Missing/outlier/imbalance ảnh hưởng mạnh đến metric |
| Random Forest mạnh với tabular data | Ổn định, không cần deep learning cho dataset nhỏ |
| Boruta hữu ích | Chọn feature tốt hơn PCA trong paper |
| Recall cao quan trọng | Screening diabetes cần giảm false negative |
| Accuracy cao chưa đủ | Phải kiểm tra leakage, validation, dataset bias |
| Dataset quyết định giới hạn | PIMA nhỏ; BRFSS survey nên còn bias |

## 3. Điểm mạnh

| Điểm mạnh | Tác dụng |
|---|---|
| Pipeline rõ | Dễ giải thích, dễ tái lập |
| Dùng 2 dataset | So sánh benchmark và survey data |
| Nhiều model | Có baseline và model mạnh |
| Nhiều metric | Không lệ thuộc accuracy |
| Có cross-validation | Tăng độ tin cậy hơn hold-out đơn |
| Dataset public | Sinh viên dễ làm lại |

## 4. Điểm yếu / hạn chế

| Hạn chế | Hậu quả |
|---|---|
| PIDD chỉ 768 mẫu | Dễ overfit, khó khái quát |
| PIDD bias dân số | Không đại diện nhiều nhóm bệnh nhân |
| BRFSS self-report | Nhãn/feature có thể nhiễu |
| Chưa external validation | Chưa biết chạy tốt trên bệnh viện thật |
| Chưa XAI | Khó giải thích quyết định |
| Chưa deployment thật | Chưa chứng minh vận hành thực tế |
| Quy trình oversampling cần kiểm kỹ | Làm sai → leakage → metric ảo |

## 5. Nên áp dụng vào project

| Nên dùng | Cách dùng |
|---|---|
| PIMA | Baseline đầu tiên |
| BRFSS | Dataset mở rộng |
| RF + Boruta | Baseline mạnh |
| Stratified split | Giữ tỷ lệ class |
| `imblearn.pipeline.Pipeline` | Tránh leakage khi CV |
| Confusion matrix | Giải thích false positive/false negative |
| ROC-AUC + Recall | Metric quan trọng hơn accuracy đơn lẻ |

## 6. Không nên áp dụng máy móc

| Không nên | Lý do |
|---|---|
| Chạy theo 94% accuracy | Có thể phụ thuộc split/preprocessing |
| Oversampling trước split | Leakage |
| Fit PCA/Boruta trước split | Leakage |
| Test trên data oversampled | Metric sai thực tế |
| Gọi là chẩn đoán | Paper chỉ làm classification/screening |
| Kết luận dùng mọi dân số | Dataset có bias |

## 7. Câu chốt khi thuyết trình

| Mục | Câu nói ngắn |
|---|---|
| Layer này là gì? | “Layer 1 xây pipeline nền tảng cho diabetes classification.” |
| Vì sao quan trọng? | “Nếu preprocessing sai, metric đẹp cũng không đáng tin.” |
| Kết quả chính? | “Random Forest + Boruta đạt tốt nhất: 94% PIDD, 92% BRFSS.” |
| Giới hạn? | “Chưa có external validation, chưa XAI, chưa triển khai thật.” |
| Sang Layer 2 để làm gì? | “Từ baseline này, Layer 2 tối ưu bằng ensemble learning.” |
