# Bảng ánh xạ thang điểm lâm sàng → biến NHANES

> Sinh tự động bởi `src/scores.py`. Bảng này BẮT BUỘC có trong phần Methods —
> reviewer sẽ hỏi *“bạn tính FINDRISC trên NHANES bằng cách nào?”* (phản biện #5, TO_DO §9).

| Thang | Mục | Biến NHANES | Mức khớp | Ghi chú |
|---|---|---|---|---|
| FINDRISC | 1. Tuổi | `RIDAGEYR` | CHÍNH XÁC | — |
| FINDRISC | 2. BMI | `BMXBMI` | CHÍNH XÁC | — |
| FINDRISC | 3. Vòng eo | `BMXWAIST + RIAGENDR` | GẦN ĐÚNG | NHANES đo vòng eo ở mào chậu; FINDRISC đo ngang rốn/dưới sườn. Ngưỡng cm giữ nguyên. |
| FINDRISC | 4. Vận động ≥30 phút/ngày | `PAQ605/620/650/665` | XẤP XỈ | NHANES hỏi CÓ/KHÔNG vận động mạnh hoặc vừa trong tuần điển hình, không hỏi thời lượng ≥30 phút/ngày. |
| FINDRISC | 5. Ăn rau/quả hằng ngày | `(không có)` | **THIẾU** | NHANES không có mục tần suất rau/quả tương đương. Xử lý theo --veg-policy; PHẢI khai báo trong Methods. |
| FINDRISC | 6. Thuốc hạ huyết áp | `BPQ050A → BPQ040A → BPQ020` | XẤP XỈ | BPQ050A = HIỆN đang uống, gần nhất với 'đều đặn'. FINDRISC hỏi 'ĐÃ TỪNG dùng đều đặn' → có thể thấp hơn thực tế. |
| FINDRISC | 7. Từng phát hiện đường huyết cao | `DIQ160` | GẦN ĐÚNG | ⚠️ Mục này MƯỢN kết quả một lần xét nghiệm trong quá khứ (5/26 điểm). Xem biến thể findrisc_nolab_score. |
| FINDRISC | 8. Tiền sử gia đình | `MCQ300C` | XẤP XỈ | MCQ300C không phân biệt bậc quan hệ (3 điểm vs 5 điểm). Đã chọn 5 vì MCQ300C hỏi người thân ruột bậc 1. |
| ADA/CDC | 1. Tuổi | `RIDAGEYR` | CHÍNH XÁC | — |
| ADA/CDC | 2. Giới | `RIAGENDR` | CHÍNH XÁC | — |
| ADA/CDC | 3. ĐTĐ thai kỳ | `RHQ162` | GẦN ĐÚNG | Chỉ hỏi nữ trong độ tuổi sinh sản; nam gán 0. Chu kỳ thiếu RHQ → mục này = 0 cho mọi người. |
| ADA/CDC | 4. Cha/mẹ hoặc anh/chị/em ruột bị ĐTĐ | `MCQ300C` | GẦN ĐÚNG | MCQ300C = 'người thân ruột thịt', hơi rộng hơn 'cha/mẹ hoặc anh/chị/em'. |
| ADA/CDC | 5. Từng chẩn đoán tăng huyết áp | `BPQ020` | CHÍNH XÁC | — |
| ADA/CDC | 6. Không vận động thể chất | `PAQ605/620/650/665` | XẤP XỈ | Như FINDRISC mục 4. |
| ADA/CDC | 7. Nhóm cân nặng | `BMXBMI` | GẦN ĐÚNG | ADA dùng bảng chiều cao × cân nặng; ở đây xấp xỉ bằng dải BMI 25/30/40. |

**Quy ước mức khớp:** `CHÍNH XÁC` = biến NHANES đúng nghĩa mục gốc · 
`GẦN ĐÚNG` = cùng khái niệm, khác chi tiết đo/định nghĩa · 
`XẤP XỈ` = phải thay thế bằng biến khác nghĩa gần nhất · `THIẾU` = NHANES không có.
