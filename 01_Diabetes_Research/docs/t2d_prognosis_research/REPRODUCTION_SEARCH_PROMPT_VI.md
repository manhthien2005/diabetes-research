# Prompt tìm bài tái lập độc lập

Sao chép phần dưới cho từng agent. Lượt đầu nên dùng cùng bối cảnh và tiêu chí, không đưa sẵn bài được agent khác chọn.

---

Tôi là sinh viên Khoa học máy tính, đang học nghiên cứu dự báo nguy cơ mắc mới đái tháo đường type 2 (T2D) theo thời gian từ dữ liệu sức khỏe dạng bảng. Mục tiêu hiện tại chỉ là chọn một bài để tái lập nhằm hiểu quy trình; chưa cần tính mới hoặc mô hình phức tạp.

Hãy tự tìm kiếm trên web và đề xuất tối đa 3 bài, sau đó chọn 1 bài phù hợp nhất để bắt đầu. Không chọn theo AUC cao hoặc số trích dẫn. Được chọn bài cũ nếu thực hành được tốt hơn.

Phạm vi bắt buộc:
- Người chưa mắc T2D tại baseline; dự báo T2D mắc mới sau baseline, chẳng hạn 3/5/10 năm. Ưu tiên survival/time-to-event có thời gian theo dõi, biến cố và cách xử lý censoring rõ.
- Đầu vào là các chỉ số khám sức khỏe thường quy hoặc tabular EHR. Không chọn ảnh, ECG, CGM, genomics/proteomics, biến chứng hoặc tử vong ở người đã mắc bệnh làm bài chính.
- Ưu tiên dữ liệu miễn phí có thể lấy ngay, phương pháp vừa sức và code của chính bài. Hiện tôi chưa được cấp WHII/ELSA/UK Biobank. Không xem dữ liệu đang chờ cấp là đã sử dụng được.

Với từng bài, hãy xác minh bằng nguồn gốc:
1. Tên, tác giả, năm, DOI và tình trạng đính chính/rút bài qua nhà xuất bản, PubMed/CrossRef.
2. Đọc Methods, Data/Code Availability và phụ lục nếu lấy được. Ghi rõ mức đã đọc: abstract, một phần full text, toàn văn hay phụ lục; không suy đoán từ tóm tắt của AI.
3. Dataset chính xác, phiên bản, link, điều kiện truy cập và tình trạng tải: đã tải được / chỉ thấy trang liệt kê / cần đăng ký / bị chặn. Phân biệt raw cohort với mẫu tác giả đã lọc. Chỉ kiểm tra metadata/header nếu chưa cần đọc dữ liệu từng người.
4. Code gốc: link trực tiếp, thư mục/script chạy chính, môi trường và dữ liệu đi kèm nếu kiểm tra được. Thư viện Cox/DeepSurv chung hoặc demo của người khác không phải code của bài. Chưa xác minh thì ghi UNKNOWN.
5. Cohort, số người/số biến cố, thời gian theo dõi, horizon, định nghĩa T2D, thời điểm đo predictor; chỉ ra thông tin thiếu có thể cản tái lập.
6. Pipeline chọn biến–tiền xử lí–mô hình–validation; kiểm tra leakage và cách xử lý censoring. Phân biệt internal random split, temporal validation và external validation. Không xem random split là ngoại kiểm.
7. Metric và kết quả cụ thể nào có thể tái lập: bảng cohort, hệ số, C-index/AUC theo thời gian, calibration hoặc Brier. Dẫn đúng section/table của nguồn; không bịa vị trí.

Đầu ra:
- Bảng so sánh tối đa 3 bài theo: đúng bài toán, dữ liệu, code, độ rõ phương pháp, giới hạn, độ khó và sản phẩm thực nghiệm có thể dựng lại.
- Một bài ưu tiên, một bài dự phòng nếu đủ bằng chứng; giải thích vì sao phù hợp cho lần tái lập đầu tiên.
- Phân biệt rõ: (A) chạy code gốc trên đúng dữ liệu; (B) tự dựng lại phương pháp trên đúng dữ liệu; (C) chuyển phương pháp sang dữ liệu khác. Không gọi cả ba là tái lập chính xác.
- Nêu 3 việc cần làm đầu tiên và các thông tin còn UNKNOWN. Không hứa khớp từng con số nếu chưa chạy kiểm chứng.
- Dẫn nguồn trực tiếp cho các kết luận quan trọng. Nếu không có ứng viên đủ bằng chứng, hãy nói rõ thay vì tự hoàn thiện thông tin.

Không cần tải hàng loạt PDF hoặc huấn luyện mô hình. Một đường tải bị chặn thì ghi lại; không thử liên tục nhiều cách vòng tránh.

---

## Câu hỏi phản biện dùng sau lượt tìm độc lập

Một ứng viên khác đang được cân nhắc là Cai et al. (2021), DOI **10.2147/DMSO.S304994**, dự báo T2D 5 năm ở người không béo phì trên NAGALA. Hãy kiểm tra độc lập điểm mạnh, lỗi/thiếu sót phương pháp, khả năng lấy đúng dữ liệu và code, rồi đối chiếu với bài bạn đã chọn. Liệu nên giữ bài này cho lần tái lập đầu hay có bài thay thế thuận lợi hơn? Không cần đồng ý với đề cử sẵn có.
