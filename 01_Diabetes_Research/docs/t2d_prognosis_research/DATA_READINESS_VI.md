# Dataset nào thực sự phục vụ được đề tài?

Cập nhật 03/11/2026. Đây là bảng chuẩn bị tìm và kiểm tra dữ liệu, **không phải danh sách dataset đã được chọn**. Trong hồ sơ mới này chưa tải hoặc kiểm tra dữ liệu cá nhân ở mức từng dòng.

## 1. Thông tin anh nên lưu khi gặp một dataset

Gửi hoặc ghi URL nguồn chính thức, tên/phiên bản, bài mô tả cohort, giấy phép hoặc điều kiện truy cập, codebook và danh mục tệp nếu có. Không cần chọn dataset chỉ vì nhiều dòng hoặc có sẵn notebook.

## 2. Các câu kiểm tra bắt buộc

| Cần xác minh | Lý do |
|---|---|
| Có theo dõi cùng một người qua thời gian? | Ghép các năm khảo sát cắt ngang không tạo thành cohort dọc |
| Baseline loại được bệnh đã có bằng cách nào? | Người chưa được chẩn đoán vẫn có thể đã mắc bệnh |
| Outcome có phân biệt T2D với loại khác? | Không suy subtype từ một cột `diabetes` |
| Biến cố được xác định bằng chẩn đoán, xét nghiệm hay tự báo cáo? | Các cách xác định có thể không tương đương |
| Có thời gian từ baseline tới biến cố/lần cuối theo dõi? | Cần để xử lý follow-up và censoring; không coi mất theo dõi là không mắc bệnh |
| Thời gian là lúc ghi nhận hay chỉ nằm giữa hai lần khám? | Cần phân biệt detection time, onset sinh học và interval censoring |
| Mỗi predictor được đo khi nào? | Không dùng thông tin sau thời điểm dự báo |
| Có bao nhiêu người và biến cố thực tế tại horizon? | Nhiều dòng không bảo đảm đủ thông tin cho mô hình |
| Có tử vong, hao hụt theo dõi hoặc tần suất khám khác nhau? | Có thể ảnh hưởng nguy cơ tuyệt đối và cách quan sát bệnh |
| Missingness, đơn vị, mã từ chối và thay đổi assay ra sao? | Cần codebook; định nghĩa chưa rõ phải xử lý trước modeling |
| Có ID lặp lại, site, gia đình, trọng số/strata/PSU không? | Chia tập và suy luận phải tôn trọng đơn vị phụ thuộc và thiết kế khảo sát |
| Quyền sử dụng và điều kiện công bố có phù hợp không? | Có đường xin dữ liệu khác với đã có quyền dùng |

Nếu chỉ có hai lần xét nghiệm và không biết ngày mắc bệnh, vẫn có thể nghiên cứu một câu hỏi thích hợp, nhưng không tự tạo event date chính xác hoặc mặc định dùng pipeline right-censoring thông thường.

## 3. Bốn nguồn tham khảo ban đầu

Đây là mô tả mức metadata, chưa đánh giá đủ tính phù hợp hoặc khả thi trong năm tháng.

| Nguồn | Đã xác nhận ở nguồn chính thức | Chưa xác nhận trong hồ sơ này |
|---|---|---|
| [NAGALA / Dryad](https://datadryad.org/dataset/doi:10.5061/dryad.8q0p192) | Trang dataset liệt kê tệp Excel của cohort nghiên cứu dọc | Cột, codebook, subtype, số biến cố theo horizon và tính phù hợp với quần thể định chọn |
| [ARIC / BioLINCC](https://biolincc.nhlbi.nih.gov/studies/aric/) | Có các đợt khám và follow-up trong gói được niêm yết cho yêu cầu truy cập | Quyền đã được cấp, bản release thực nhận, định nghĩa incident diabetes và biến cần dùng |
| [ELSA](https://www.elsa-project.ac.uk/data-and-documentation) | Có phỏng vấn dọc, health visits và đường truy cập qua UK Data Service | Các wave xét nghiệm ghép được, subtype, thời hạn phù hợp, số biến cố và quyền dùng |
| [DPP / NIDDK](https://www.niddk.nih.gov/about-niddk/research-areas/diabetes/diabetes-prevention-program-dpp) | Trang chương trình chính thức mô tả thử nghiệm có nhóm lối sống, metformin và placebo, đồng thời dẫn tới kho tài liệu | Quyền dùng, codebook và bản dữ liệu chưa xác minh; trang repository trực tiếp bị HTTP 403; cần tính đến can thiệp khi xác định mục tiêu dự báo |

Không xếp DPP là dữ liệu đã sẵn sàng. NAGALA là nguồn tham khảo đang có, không phải mặc định tốt nhất. Danh sách mở cho dataset anh tìm được.

## 4. Khi nào dữ liệu được coi là đủ để thiết kế nghiên cứu?

Khi quyền dùng và codebook đã rõ, có dữ liệu thật để xác định cohort, timing và outcome, các điểm bất định quan trọng đã được giải quyết, và ước lượng được mức độ thông tin tại horizon. Dataset lớn hơn nhưng nhãn hoặc timing kém hơn không mặc nhiên phù hợp hơn.

Định nghĩa biến, đơn vị và nhãn chính thức sẽ đi qua `define-variables` trước khi modeling. Chưa chọn split, threshold, model hoặc kết quả kỳ vọng trong bảng này.

Nguồn và mức độ xác minh được lưu ở [data_sources.json](evidence/data_sources.json).
