# Audit dữ liệu NAGALA — 05/11/2026

Nguồn máy đọc được: `qc/phase_a_20261105/data_audit.json`. Audit không fit mô hình và không dùng hiệu năng test để chọn cohort.

| Bước | Số người | Biến cố toàn follow-up | Căn cứ |
|---|---:|---:|---|
| Workbook gốc, Sheet 1 | 15.464 | 373 | Đếm trực tiếp; một ID duy nhất mỗi dòng |
| Loại BMI ≥25 kg/m² | 2.524 | 172 | Ngưỡng non-obese của Cai, Definitions |
| Cohort BMI <25 | 12.940 | 201 | Khớp Table 1, không tìm seed/loại thêm người để ép khớp |

Có 31 cột; không có dòng trùng hay ID trùng. Trung vị theo dõi cohort là 2.016 ngày, IQR 1.017–3.465,25; khớp Table 1. Có 76 biến cố được quan sát trong 5 năm, 5.820 người censor trước mốc này và 7.044 người còn at risk tại mốc. **201 là số biến cố toàn follow-up, không phải số mắc trong đúng 5 năm.**

Workbook chỉ cung cấp baseline, duration và incident event. Không có đủ thông tin để tự adjudicate từng chẩn đoán hoặc tái dựng toàn bộ tiêu chí loại trừ upstream. Cai Methods ghi 15.744 người ở nghiên cứu gốc, trong khi workbook có 15.464; phải giữ sự khác biệt này trong báo cáo. Không tự tạo các bước loại trừ giả để giải thích.

## Những mâu thuẫn đã xử lý

- **Giới tính:** header ghi 1=nam, 2=nữ; mã quan sát là 0/1. Mã 1 có 8.430 người, mã 0 có 7.034, đúng số nam/nữ của trang Dryad. Trong BMI <25, mã 1=6.534, mã 0=6.406, đúng Table 1 của Cai. Theo yêu cầu anh giao quyền xác định và chốt, dùng 1=nam, 0=nữ, giữ nguyên workbook. Đây là giải quyết mâu thuẫn bằng đối chiếu nguồn và số lượng; không giả định mã 2 xuất hiện trong dữ liệu.
- **HDL thiếu ẩn:** 11 ô trống ở cột mg/dL đi với 11 số 0 ở cột mmol/L; trong cohort có 8 cặp như vậy. Chỉ chuyển các số 0 **có cặp mg/dL bị thiếu** thành missing trong bản phân tích; không quy mọi số 0 của mọi biến thành missing. Median imputation chỉ học trong training fold/development. Đây là cải thiện xử lý dữ liệu được nêu riêng vì bài không mô tả cách xử lý này.
- **Fatty liver và exercise:** giá trị 0/1 được đối chiếu Table 1. Fatty liver 1=1.337 người, exercise 1=2.326 người; nhóm 0 lần lượt là 11.603 và 10.614.
- **Obesity phenotype:** cột này có các dạng mã không đồng nhất. Không giải mã theo phỏng đoán và không dùng trong predictors; BMI và các biến baseline có header rõ đủ để dựng cohort.

## Điều được xác minh và giới hạn

Workbook SHA256: `671359aea2019c848f969395f88e57f888eaba8463ea0351bcda8f1c947f5523`. ZIP SHA256: `87faa363be28075ffdaf5faeec567e21d7a250aaed4739bc9de34305e1edd940`. Người dùng tải từ Dryad sau khi một lần thử tự động trả HTTP 403. Chưa có checksum do Dryad phát hành để đối chiếu; đây là dấu nhận diện tệp đã audit, không phải chữ ký xác thực của nhà cung cấp.

Các đơn vị được lấy từ header workbook, không suy từ độ lớn: lipid mmol/L, HbA1c mmol/mol, FPG mg/dL, enzyme IU/L. Chỉ chọn một cột cho mỗi đại lượng; không đưa hai bản đơn vị vào LASSO. Baseline FPG/HbA1c dự báo **biến cố tương lai**, không dùng chính phép đo baseline để dựng nhãn hiện mắc. Follow-up và incident event không được phép đi vào predictors.

Registry gồm 21 biến đã qua schema và validator; còn 19 cảnh báo về danh sách missing sentinel rỗng cho các trường không có mã thiếu được tài liệu hóa. Giữ cảnh báo và dừng nếu phát hiện missing/coding mới; không tự bịa sentinel để làm sạch báo cáo. NAGALA là cohort kiểm tra sức khỏe tại một trung tâm, không phải survey NHANES; không tự thêm survey weights/strata/PSU.
