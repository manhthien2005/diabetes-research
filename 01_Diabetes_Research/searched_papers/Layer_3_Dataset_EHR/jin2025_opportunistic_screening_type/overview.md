# Overview - Layer 3: Dataset thực tế / EHR

## Đọc 1 phút

| Câu hỏi | Trả lời ngắn |
|---|---|
| Paper làm gì? | Screening T2D bằng EHR + Deep Metric Learning |
| Dataset | All of Us + MGB Biobank |
| Link dataset | AoU: https://www.researchallofus.org/ ; MGB: không public |
| Điểm chính | Dự đoán onset + chia subtype trong cùng latent space |
| Model chính | Deep Metric Learning (DML) |
| Kết quả mạnh | 2-year AUROC 0.969 trên AoU |
| Kết quả xa | 7-year AUROC 0.754 trên AoU |
| Subtype | Green, Yellow, Red |
| Giá trị layer | Chuyển từ benchmark PIMA sang EHR thực tế |
| Cảnh báo | Dữ liệu EHR private/controlled, bias bệnh viện, chưa clinical deployment |

## 1. Thông tin paper

| Mục | Nội dung |
|---|---|
| Tên paper | Opportunistic screening of type 2 diabetes with deep metric learning using electronic health records |
| Tác giả chính | Qixuan Jin, Haoran Zhang, Lukasz Szczerbinski, Jiacheng Zhu, Walter Gerych, Xuhai Xu, Kai Wang, Sarah Hsu, Ravi Mandla, Aaron J. Deutsch, Alisa Manning, Josep M. Mercader, Thomas Hartvigsen, Miriam S. Udler, Marzyeh Ghassemi |
| Năm | 2025 |
| Nguồn | Scientific Reports |
| DOI | 10.1038/s41598-025-25759-x |
| File PDF | `papers/Opportunistic screening of type 2 diabetes with deep metric learning using electronic health records.pdf` |
| Nguồn trích | Abstract; Results; Methods; Data availability; Tables 1-2; Fig. 1-3 |

## 2. Paper giải quyết gì?

| Thành phần | Nội dung |
|---|---|
| Bài toán 1 | Predict T2D onset trước diagnosis |
| Bài toán 2 | Subtyping T2D patients thành nhóm lâm sàng khác nhau |
| Input | Routine EHR data trước ngày censor |
| Output | T2D risk + subtype Green/Yellow/Red |
| Mục tiêu | Opportunistic screening, precision prevention |
| Không phải | Không phải chẩn đoán y khoa tự động |

## 3. Vì sao là Layer 3?

| Lý do | Giải thích |
|---|---|
| Dataset thực tế | Dùng EHR longitudinal từ AoU/MGB |
| Quy mô lớn | AoU >400k participants; MGB system >1.5M patients/year |
| Có cohort validation | AoU và MGB, có transfer test |
| Có timeline | Censor date ít nhất 2 năm trước diagnosis |
| Gần thực tế hơn PIMA | Dữ liệu điều kiện, thuốc, lab, measurement, demographics |
| Chưa phải Layer 4 | Có screening integration idea nhưng chưa XAI/deployment app cụ thể |

## 4. Dataset chính

| Dataset | Quy mô / cohort | Ghi chú |
|---|---:|---|
| All of Us (AoU) | >400,000 participants, >340 centers | Controlled Tier, cần đăng ký nghiên cứu |
| AoU T2D cases | 7,567 | Xác định bằng eMERGE algorithm |
| AoU PopControl | 7,567 | Match 1:1 age/sex/healthcare utilization |
| AoU GenControl | 77,567 | General controls, phản ánh prevalence thực tế hơn |
| MGB Biobank | 109,768 individuals trong biobank | Data extract 10/12/2022 |
| MGB T2D cases | 3,298 | Xác định bằng PheCAP |
| MGB PopControl | 3,298 | Match 1:1 |
| MGB GenControl | 81,787 | General controls |
| MGB public? | Không | Paper nói MGB không public; có kế hoạch synthetic examples |

## 5. Link dataset / truy cập dữ liệu

| Nguồn | Link / trạng thái | Ghi chú |
|---|---|---|
| Paper DOI | https://doi.org/10.1038/s41598-025-25759-x | Bài báo gốc |
| All of Us Research Program | https://www.researchallofus.org/ | Có Researcher Workbench; cần đăng ký/quyền Controlled Tier |
| MGB Biobank | Không public | Dữ liệu bệnh viện/private, không có link tải trực tiếp |
| Code | Chưa thấy link trong paper trích xuất | Cần kiểm tra lại trang paper/GitHub tác giả nếu muốn tái lập code |
| Synthetic MGB examples | Paper nói sẽ release after acceptance | Chưa thấy link cụ thể trong phần trích xuất |

## 6. Đóng góp chính

| Đóng góp | Ý nghĩa |
|---|---|
| DML latent space | Học similarity giữa bệnh nhân |
| Unified task | Vừa predict onset vừa subtype |
| Leakage control | Censor date ít nhất 2 năm trước diagnosis |
| EHR features rộng | Conditions, meds, measurements, labs, demographics |
| 698 features | Vector hoá dữ liệu EHR đa thời gian |
| 3 subtype | Green, Yellow, Red theo risk/complication continuum |
| Cross-cohort transfer | Train MGB, test AoU vẫn còn predictive power |
| Clinical insight | Subtype khác nhau về obesity, comorbidity, medication response |

## 7. Điểm mạnh

| Điểm mạnh | Vì sao đáng giá |
|---|---|
| Dữ liệu thực tế | EHR longitudinal gần clinical workflow hơn PIMA |
| Có timeline rõ | Predict trước diagnosis, không chỉ classify hiện tại |
| Có chống leakage | Censor date trước diagnosis, loại proxy T2D indicators |
| So sánh nhiều baseline | LR, clinical risk, glycemic, SCARF, TabTransformer, CVAE, ConvAE, PCA, UMAP |
| Kết quả mạnh | 2-year AUROC 0.969 trên AoU |
| Có subtype | Không chỉ risk score, còn hỗ trợ precision medicine |
| Có external cohort | AoU + MGB, transfer evaluation |

## 8. Điểm yếu / rủi ro

| Điểm yếu | Rủi ro khi trình bày |
|---|---|
| AoU controlled access | Không tải tự do như Kaggle |
| MGB không public | Tái lập đầy đủ khó |
| EHR bias | Hospital-based retrospective data overrepresent high utilization patients |
| Latent clusters mượt | Subtype là continuum, không phải ranh giới cứng |
| Thiếu family history | Có thể giảm predictive power |
| Label từ EHR algorithms | eMERGE/PheCAP có thể có phenotyping error |
| 2-year AUROC rất cao | Cần kiểm tra proxy leakage/feature gần diagnosis |
| Chưa prospective trial | Chưa chứng minh cải thiện outcome thật |

## 9. Kết luận nhớ nhanh

| Ý chính | Cách nói khi thuyết trình |
|---|---|
| Layer này là gì? | “Layer 3 đưa bài toán từ PIMA sang EHR thực tế.” |
| Model chính | “DML học latent space theo similarity bệnh nhân.” |
| Khác Layer 1-2 | “Không chỉ classify, mà predict theo thời gian và subtype.” |
| Giá trị lâm sàng | “Có thể hỗ trợ screening và precision prevention.” |
| Cảnh báo | “EHR private, bias bệnh viện, cần validation triển khai thật.” |
