# Result - Layer 3: Dataset thực tế / EHR

## Đọc 1 phút

| Ý chính | Kết luận |
|---|---|
| Paper học được gì? | EHR có thể dùng để screening T2D trước diagnosis |
| Model thắng | Deep Metric Learning |
| 2-year result | AUROC 0.969 trên AoU |
| 7-year result | AUROC 0.754 trên AoU |
| Subtyping | Green, Yellow, Red |
| Clinical insight | Red nhiều obesity/comorbidity hơn; Green response metformin tốt hơn |
| Giá trị layer | Gần thực tế lâm sàng hơn PIMA |
| Rủi ro lớn | EHR bias, private data, chưa prospective validation |

## 1. Kết quả onset prediction

| Setting | Model | AUROC | Nguồn |
|---|---|---:|---|
| AoU, 7-year before diagnosis | DML | 0.754 | Abstract / Fig. 2a |
| AoU, 7-year before diagnosis | Logistic Regression | 0.706 | Abstract / Fig. 2a |
| AoU, 7-year before diagnosis | Risk-Factors | 0.693 | Abstract / Fig. 2a |
| AoU, 7-year before diagnosis | Glycemic | 0.632 | Abstract / Fig. 2a |
| AoU, 2-year prediction | DML | 0.969 | Fig. 2b |
| AoU, 2-year prediction | LR | 0.954 | Fig. 2b |
| AoU, 2-year prediction | Risk-Factors | 0.802 | Fig. 2b |
| AoU, 2-year prediction | Glycemic | 0.773 | Fig. 2b |
| AoU, 2-year prediction | SCARF | 0.918 | Fig. 2b |
| AoU, 2-year prediction | TabTransformer | 0.909 | Fig. 2b |
| AoU, 2-year prediction | CVAE | 0.795 | Fig. 2b |
| AoU, 2-year prediction | ConvAE | 0.571 | Fig. 2b |
| AoU, 2-year prediction | PCA | 0.816 | Fig. 2b |
| AoU, 2-year prediction | UMAP | 0.790 | Fig. 2b |

## 2. Transfer result

| Train | Test | Model | AUROC | Ý nghĩa |
|---|---|---|---:|---|
| MGB | MGB | DML | 0.908 | 2-year prediction strong |
| MGB | MGB | LR | 0.898 | LR gần DML trong MGB |
| MGB | AoU | DML | 0.829 | Có transfer nhưng giảm performance |
| MGB | AoU | LR | 0.861 | LR transfer tốt hơn DML trong số này |

## 3. Subtype result

| Subtype | Vị trí | Đặc điểm chính |
|---|---|---|
| Green | Gần controls | Ít comorbidity hơn, HbA1c response tốt hơn sau metformin |
| Yellow | Trung gian | Mức risk/complication giữa Green và Red |
| Red | Xa controls | BMI cao hơn, obesity/cardiovascular/mental health comorbidity cao hơn |

## 4. Comorbidity khác biệt Green vs Red

| Condition | AoU Green | AoU Red | MGB Green | MGB Red | Kết luận |
|---|---:|---:|---:|---:|---|
| Obesity | 54.6% | 71.1% | 71.3% | 93.1% | Red cao hơn rõ |
| GERD | 48.3% | 68.1% | 63.5% | 79.4% | Red cao hơn |
| Sleep apnea | 33.1% | 47.0% | 37.5% | 48.9% | Red cao hơn |
| Hyperlipidemia | 80.2% | 86.9% | 93.1% | 98.5% | Red cao hơn |
| Hypertension | 54.6% | 68.7% | 89.7% | 95.4% | Red cao hơn |
| Depressive disorder | 44.8% | 60.9% | 31.4% | 54.2% | Red cao hơn |
| Cataract | 31.4% | 46.2% | 36.5% | 48.9% | Red cao hơn |
| Neuropathy | 66.3% | 73.2% | 81.1% | 92.4% | Red cao hơn |

## 5. Medication / HbA1c insight

| Insight | Kết quả |
|---|---|
| Green starts medication earlier | Có xu hướng sớm hơn Red, nhưng không significant |
| Time to HbA1c control | Green ngắn hơn đáng kể |
| Metformin | Green giảm HbA1c nhiều hơn Red |
| Mean HbA1c reduction after metformin | Green: -0.64; Red: -0.27 |
| Ý nghĩa | Subtype có thể gợi ý khác biệt treatment response |

## 6. Bài học rút ra

| Bài học | Ý nghĩa |
|---|---|
| EHR mạnh hơn feature ít | Full EHR DML/LR vượt risk-factor/glycemic models |
| DML không chỉ predict | Latent space dùng được cho subtype |
| Timeline quan trọng | Predict trước diagnosis mới đúng screening |
| Subtype là continuum | Green→Yellow→Red phản ánh severity gradient |
| EHR feature cần lọc kỹ | Proxy T2D features gây leakage |
| External cohort cần thiết | Transfer MGB→AoU cho thấy performance drop |

## 7. Điểm mạnh

| Điểm mạnh | Tác dụng |
|---|---|
| Dữ liệu EHR lớn | Gần thực tế hơn PIMA |
| Có hai cohort | AoU + MGB tăng độ tin cậy |
| Leakage control rõ | Censor trước diagnosis, loại proxy indicators |
| So sánh baseline mạnh | LR, clinical, glycemic, deep models, PCA/UMAP |
| Kết quả cao | DML 2-year AUROC 0.969 |
| Có subtype clinically interpretable | Green/Yellow/Red liên quan comorbidity/treatment |
| Có data availability rõ | AoU controlled; MGB không public |

## 8. Điểm yếu / hạn chế

| Hạn chế | Hậu quả |
|---|---|
| MGB không public | Khó tái lập full |
| AoU cần đăng ký | Không dễ tải ngay |
| Hospital retrospective bias | Người đi khám nhiều có nhiều data hơn |
| Thiếu family history | Có thể giảm dự đoán |
| Subtype không ranh giới cứng | Cần tránh diễn giải quá mức |
| Chưa prospective validation | Chưa chứng minh lợi ích khi dùng thật |
| 2-year AUROC cao | Cần kiểm kỹ feature gần diagnosis/proxy leakage |

## 9. Nên áp dụng vào project

| Nên dùng | Cách dùng |
|---|---|
| Censor date | Dạy cách tránh leakage theo thời gian |
| Patient-level split | Không cho cùng patient xuất hiện train/test |
| EHR feature groups | Conditions, meds, labs, measurements, demographics |
| DML latent space | Nếu có data đủ lớn |
| Subtyping concept | Làm phần mở rộng sau prediction |
| AUROC + transfer test | Đánh giá thực tế hơn accuracy |
| Green/Yellow/Red slide | Rất dễ thuyết trình |

## 10. Không nên áp dụng máy móc

| Không nên | Lý do |
|---|---|
| Dùng PIMA rồi gọi là EHR | Sai bản chất dataset |
| Dùng dữ liệu sau diagnosis | Leakage |
| Bỏ external validation | Không biết model generalize |
| Coi subtype là diagnosis category | Paper chỉ data-driven subtype |
| Claim personalized treatment chắc chắn | Paper mới chỉ association/response analysis |
| Deploy bệnh viện ngay | Cần prospective clinical validation |

## 11. Câu chốt khi thuyết trình

| Mục | Câu nói ngắn |
|---|---|
| Layer này là gì? | “Layer 3 đưa diabetes prediction vào dữ liệu EHR thực tế.” |
| Model chính? | “DML học latent space để vừa predict onset vừa subtype.” |
| Kết quả? | “DML đạt AUROC 0.969 cho 2-year prediction và 0.754 cho 7-year prediction.” |
| Giá trị? | “Không chỉ biết ai risk cao, còn biết nhóm bệnh nhân có complication/treatment response khác nhau.” |
| Giới hạn? | “EHR private và bias; cần validation thật trước khi triển khai.” |
