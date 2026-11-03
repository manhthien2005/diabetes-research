# Prompt tìm bài báo cùng khảo sát đề tài

Ngày chuẩn bị: 03/11/2026. Có thể dùng với công cụ tìm tài liệu hoặc công cụ research có truy cập web. Kết quả trả về là đầu mối để kiểm chứng, chưa phải bài đã được nhóm lựa chọn. Không yêu cầu công cụ tìm một hướng nâng cấp khác.

## Prompt để sao chép

Bạn là trợ lý tìm tài liệu nghiên cứu y khoa. Hãy tìm các bài báo gốc sát nhất với câu hỏi:

**“Among adults without diabetes at baseline, how accurately can routinely available baseline health data predict incident type 2 diabetes over a defined future horizon, especially five years?”**

Tôi là sinh viên công nghệ phần mềm, đang khảo sát tính khả thi và giá trị của đề tài dự báo mắc mới T2D. Tôi chưa chốt dataset hoặc thuật toán, muốn giữ độ khó vừa phải. Cox, survival machine learning và survival neural networks là các phương pháp cần tìm hiểu, không phải điều kiện bắt buộc phải dùng. Hiện chưa chọn một hướng nâng cấp.

Yêu cầu tìm kiếm:

1. Ưu tiên nghiên cứu cohort/EHR dọc, dữ liệu tabular, người chưa mắc bệnh tại baseline, dùng thông tin có sẵn tại baseline để dự báo mắc bệnh trong tương lai. Ưu tiên mốc năm năm; nhận bài ba hoặc mười năm nhưng ghi riêng horizon. Không nhầm độ dài follow-up với horizon.
2. Tìm bài từ năm 2020 tới 03/11/2026, bổ sung bài nền tảng cũ hơn nếu thật sự cần. Ưu tiên các bài gần câu hỏi, không chỉ bài AUC cao hoặc nhiều trích dẫn.
3. Tìm cả Cox, survival ML/neural và mô hình dự báo nhị phân tại horizon cố định. Kiểm tra họ xử lý người mất theo dõi/chưa theo dõi đủ như thế nào. Không loại một nghiên cứu chỉ vì không dùng survival; không xem mọi pipeline đã công bố là đúng.
4. Loại khỏi danh sách chính: phân loại bệnh đang có trên dữ liệu cắt ngang, PIMA/BRFSS không có theo dõi mắc mới, dự báo biến chứng/tử vong ở người đã mắc bệnh, ảnh y khoa và CGM. Nghiên cứu tiên lượng có outcome “diabetes” chung được ghi là gần chủ đề/phương pháp, không gọi là T2D đã xác nhận.
5. Chọn tối đa tám bài. Với mỗi bài ghi: tên, tác giả, năm, DOI/PMID và link chính thức; quần thể/dataset; tổng mẫu và số ca mắc mới nếu có; horizon; predictor baseline; phương pháp; cách xử lý censoring; loại validation; có calibration và đánh giá utility không; đường truy cập dữ liệu/code.
6. Phân biệt rõ dữ liệu tải công khai, cần đăng ký/DUA, xin tác giả, hạn chế hoặc UNKNOWN. Open-access article không đồng nghĩa open dataset. Không loại bài có dữ liệu private khỏi nhóm bằng chứng khoa học; chỉ đánh giá khả năng tái lập riêng.
7. Xác minh danh tính bài bằng PubMed, CrossRef hoặc trang nhà xuất bản. Không tạo DOI, dataset, số liệu hay khoảng trống nghiên cứu. Ghi mức đã đọc: abstract hay toàn văn; ghi section/table/page cho nhận định quan trọng khi xác định được. Thiếu thông tin ghi UNKNOWN. Giữ rõ lỗi truy cập, preprint và ngày online khác năm số báo.

Ba DOI đã có trong hồ sơ để làm điểm xuất phát và tìm theo trích dẫn: **10.1111/dom.71289**, **10.2188/jea.JE20220329**, **10.1097/HJH.0000000000003626**. Nếu gặp lại, đánh dấu “đã có”; ưu tiên bổ sung bài sát chủ đề hơn hoặc có dữ liệu dễ tiếp cận hơn.

Trả lời bằng tiếng Việt, gồm một bảng ngắn và ba bài đáng đọc trước, giải thích lý do. Cuối cùng tách rõ: điều đã được nghiên cứu; câu hỏi còn cần kiểm chứng; dữ liệu khả thi tới đâu. Không chốt đề tài, không khẳng định “đầu tiên/chưa ai làm” hoặc đề xuất mô hình phức tạp chỉ để tạo tính mới. Cung cấp URL toàn văn hợp pháp nếu tìm được.

## Cách gửi kết quả về để đối chiếu

Giữ nguyên DOI/PMID, URL và phần chưa xác minh. Có thể gửi bảng kết quả hoặc danh sách link. Nếu lấy được PDF/phụ lục hợp pháp, lưu cùng nguồn; không cần trả phí mua bài để thực hiện lượt tìm ban đầu. Các bản ghi sẽ được đối chiếu với [khảo sát ban đầu](LITERATURE_SCAN_VI.md) và [lượt tìm bổ sung](FOLLOWUP_SEARCH_20261103_VI.md), không tự động trở thành bài được chọn.
