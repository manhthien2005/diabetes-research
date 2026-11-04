# Bài tiếp theo sau Huang: học Cox trên dữ liệu có thể tiếp cận

Ngày kiểm tra: **04/11/2026**. Đây là ưu tiên đọc và đề xuất thực hành; chưa chọn baseline chính thức hay đóng băng đề tài.

**Khuyến nghị: đọc `cai2021_nonobese_five_year` trước, rồi `sasagawa2024_deepsurv_jecoh`.** Hai bài đã xuất hiện trong bảng anh tìm; lượt này kiểm tra nguồn gốc và phân vai cụ thể hơn. Không cần đọc thêm một danh sách dài trước khi bắt đầu.

## 1. Bài nên đọc trước: Cai 2021

**Derivation and Validation of a Prediction Model for Predicting the 5-Year Incidence of Type 2 Diabetes in Non-Obese Adults: A Population-Based Cohort Study.** DOI: **10.2147/DMSO.S304994**.

[Thông tin PubMed](https://pubmed.ncbi.nlm.nih.gov/34007195/) · [Toàn văn PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8123981/) · [Dữ liệu Dryad](https://datadryad.org/dataset/doi:10.5061/dryad.8q0p192).

| Cần biết | Nội dung đã kiểm tra |
|---|---|
| Câu hỏi của bài | Dự đoán nguy cơ T2D trong 5 năm ở người trưởng thành không béo phì |
| Dữ liệu phân tích | NAGALA tại Nhật; 12.940 người, 201 ca mắc mới; tập phát triển 9.651 người và tập kiểm tra 3.289 người |
| Mô hình | LASSO chọn biến → Cox → nomogram, tức biểu đồ cộng điểm để tra nguy cơ |
| Biến cuối | Tuổi, gan nhiễm mỡ, GGT, triglyceride, HbA1c, glucose đói |
| Kiểm định | Chia ngẫu nhiên trong cùng cohort; có bootstrap, đánh giá phân biệt và calibration |

Nguồn: Abstract; Materials and Methods / Data Source; Results / Table 1 và Establishment of a Predicting Nomogram. **Tập kiểm tra này là nội bộ, không phải ngoại kiểm.**

**Vì sao phù hợp với bước hiện tại:** có thể học chuỗi dữ liệu baseline → thời gian/biến cố → nguy cơ 5 năm bằng một mô hình đủ gọn. Dryad hiện liệt kê tệp Excel công khai. Điều này tạo cơ hội dựng lại pipeline trong lúc chờ WHII/ELSA; chưa đồng nghĩa đã chạy lại đúng kết quả tác giả.

**Điểm phải đọc có phản biện:** chỉ 201 biến cố, trong đó 47 ở tập kiểm tra; không có ngoại kiểm; phân tích thứ cấp trên một quần thể đã được chọn lọc. Không lấy tuyên bố hữu ích lâm sàng của tác giả làm bằng chứng đã cải thiện chăm sóc ngoài thực tế. Chưa xác nhận code tác giả, seed chia mẫu, hoặc toàn bộ chi tiết ước lượng. Khi truy cập lượt này, PMC có browser challenge; phần đối chiếu dựa trên các đoạn toàn văn được lập chỉ mục và PubMed, chưa phải audit đầy đủ từng dòng/phụ lục.

## 2. Bài đọc sau: Sasagawa 2024

**Application of deep neural survival networks to the development of risk prediction models for diabetes mellitus, hypertension, and dyslipidemia.** DOI: **10.1097/HJH.0000000000003626**.

[Toàn văn PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10842670/) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/38088426/).

Bài so sánh DeepSurv với Cox để dự đoán nguy cơ 7 năm trên J-ECOH. Với diabetes, AUROC lần lượt 0,878 và 0,872; tác giả không ghi nhận khác biệt có ý nghĩa ở AUROC/Brier, dù NRI/IDI cải thiện. Đây là lý do đáng đọc trước khi quyết định dùng neural network. Nguồn: Statistical analysis; Table 3; Discussion.

Dữ liệu không được công khai do hạn chế đạo đức/pháp lý. Vì vậy, ưu tiên bài này để học cách so sánh mô hình; hiện chưa phù hợp bằng Cai cho việc chạy lại trên đúng dữ liệu. Kết cục diabetes cũng chưa tách riêng các type. Nguồn: Discussion; Acknowledgements / Data availability. Năm 2024 là năm số báo; online từ 13/12/2023.

## 3. Sau khi đọc Cai, anh cần trả lời được bốn câu

1. **Ai được dự đoán?** Người không béo phì trong cohort này khác gì quần thể mình muốn phục vụ?
2. **Khi nào bắt đầu và kết thúc theo dõi?** Với người chưa mắc bệnh khi ngừng theo dõi, dữ liệu được ghi nhận thế nào?
3. **Đầu ra nghĩa là gì?** Phân biệt hệ số/hazard ratio của Cox với xác suất mắc bệnh trong 5 năm.
4. **Bằng chứng nào cho thấy dự đoán đáng tin?** Phân biệt discrimination, calibration và lợi ích lâm sàng; tập kiểm tra có thật sự độc lập không?

## 4. Bài thực hành khả thi được đề xuất

**Mục tiêu nhỏ:** dựng lại một pipeline Cox cho nguy cơ T2D 5 năm theo Cai, rồi đối chiếu những kết quả có thể khôi phục. Đây là bài học, chưa phải đóng góp nghiên cứu mới.

Thứ tự: kiểm tra giấy phép/codebook và đơn vị → xác minh cột thời gian, biến cố, tiêu chí lọc → tái dựng cohort → chia dữ liệu trước mọi bước học tham số → Cox và đường cong nguy cơ → đánh giá có xử lý censoring → ghi rõ khác biệt so với bài gốc.

Trước khi chạy phải làm rõ mốc thời gian là lúc phát hiện hay lúc khởi phát thực sự, quy tắc censoring và số người còn theo dõi ở năm thứ 5. Không biến mọi người chưa có chẩn đoán thành nhãn âm tính tại năm 5. HbA1c/FPG baseline không tự động là leakage khi dự báo biến cố tương lai, nhưng phải xác minh thời điểm và loại bệnh hiện có tại baseline.

**Đánh giá hiện tại:** khả thi có điều kiện để tái hiện phương pháp; chưa hứa tái lập chính xác từng con số. Chưa tải hay kiểm tra dữ liệu từng người, chưa huấn luyện mô hình. Dùng NAGALA để học không thay thế quyết định cuối về dataset nghiên cứu.

Chi tiết truy vấn, integrity, mức đọc và provenance: [evidence/next_reading_20261104.json](evidence/next_reading_20261104.json).
