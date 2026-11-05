# Nghiên cứu tiên lượng nguy cơ mắc mới T2D

Cập nhật: **03/11/2026**. Nhánh làm việc: `codex/t2d-prognosis-research`.

## Điểm xuất phát

**Ước tính nguy cơ một người chưa mắc đái tháo đường sẽ mắc mới bệnh trong một khoảng thời gian tương lai, từ thông tin sức khỏe có sẵn lúc dự báo.**

Mốc năm năm là giả định làm việc để khảo sát, **chưa đóng băng**. Dataset, quần thể, định nghĩa kết cục, bộ biến và thuật toán cũng chưa được chọn. Cox, SNN và NAGALA trong tài liệu người đi trước là nguồn tham khảo.

Theo chỉ đạo ngày 03/11/2026: giữ hướng gốc, nghiên cứu tình hình và giá trị trước; việc nâng cấp hoặc chuyển hướng sẽ dựa trên bằng chứng và được bàn lại. Hai ý tưởng thiếu HbA1c và thêm lịch sử khám đang tạm gác, không phải yêu cầu triển khai.

## Hai việc đang làm song song

| Anh bắt đầu học | Em nghiên cứu và tổng hợp |
|---|---|
| Bài toán tiên lượng, thời điểm dự báo, biến cố và censoring | Công trình gần nhất đã giải quyết gì |
| Đọc được một nghiên cứu survival cơ bản | Giá trị thực tiễn nào có thể kiểm định |
| Hiểu ý nghĩa đầu ra và giới hạn kết luận | Dữ liệu nào thật sự trả lời được câu hỏi |

## Anh mở gì trước?

1. [Bài 1 — hiểu đúng bài toán](learning/LESSON_01_VI.md): một buổi học ngắn, có ví dụ giả định và đáp án.
2. [Lộ trình học](learning/LEARNING_PATH_VI.md): học theo mô-đun, không cần học tất cả ngay.
3. [Từ điển thuật ngữ](learning/GLOSSARY_VI.md): tra khi gặp từ mới.
4. [Bài báo đầu tiên — Huang 2026](learning/READ_FIRST_HUANG2026_VI.md): cách đọc trong một buổi và sáu câu để cùng thảo luận.

Đã có [thư mục đọc Huang 2026](../../searched_papers/Layer_3_Dataset_EHR/huang2026_british_short_long_risk/README.md), gồm PDF anh cung cấp, phụ lục, toàn văn trích xuất, bản giải thích tiếng Việt và phân tích phương pháp. Anh có thể bắt đầu trực tiếp bằng [bản giải thích](../../searched_papers/Layer_3_Dataset_EHR/huang2026_british_short_long_risk/READING_EXPLANATION_VI.md) bên cạnh PDF.

## Theo dõi phần nghiên cứu

- [Review độc lập Cai–Han–Liu — 05/11](THREE_PAPER_REVIEW_20261105_VI.md): kiểm chứng ba ứng viên theo cùng tiêu chí; chọn Cai 2021 cho bài thực hành đầu tiên, kèm giới hạn và mục tiêu đối chiếu.
- [Đề cử tái lập để học — 05/11](REPRODUCTION_CHOICE_20261105_VI.md): đánh giá Cai 2021, đối chiếu thêm Liu 2026 và [prompt tìm độc lập cho các agent](REPRODUCTION_SEARCH_PROMPT_VI.md).
- [Bài tiếp theo sau Huang — 04/11](NEXT_READING_20261104_VI.md): Cai 2021 để học và chuẩn bị dựng lại Cox trên NAGALA; Sasagawa 2024 để học cách so sánh DeepSurv–Cox.
- [Xin tiếp cận WHII và ELSA — 04/11](data_access_20261104/README_VI.md): đã gửi thư hỏi WHII và yêu cầu username UK Data Service; đang chờ phản hồi, chưa có quyền dùng dữ liệu.

- [Kế hoạch khảo sát](RESEARCH_PLAN_VI.md): câu hỏi, phạm vi và điều kiện để tiến tới chọn đề tài cụ thể.
- [Khảo sát tài liệu vòng đầu](LITERATURE_SCAN_VI.md): nguồn đã đọc và mức kết luận hiện có.
- [Lượt tìm bổ sung 03/11](FOLLOWUP_SEARCH_20261103_VI.md): đối chiếu ba bài sát và kiểm tra đầu mối dữ liệu RICH.
- [Prompt để anh tìm bài song song](HUMAN_SEARCH_PROMPT_VI.md): phạm vi tìm kiếm và thông tin cần giữ để đối chiếu.
- [Kiểm tra mức sẵn sàng của dữ liệu](DATA_READINESS_VI.md): tiêu chí để anh tìm dataset và để em kiểm tra lại.
- [Trạng thái công việc](STATUS.json): chỉ quản lý hồ sơ khảo sát này; không thay thế `PROGRESS.json` của nghiên cứu khác.
- `evidence/`: nguồn, truy vấn, mức độ đã đọc và provenance. Một bản ghi nguồn không có nghĩa là bài đã được đọc sâu hoặc được chọn làm baseline.

## Giới hạn của hồ sơ

Đây là hồ sơ khảo sát và học tập, chưa phải đề cương nghiên cứu đã phê duyệt. Chưa chạy mô hình, chưa có kết quả thực nghiệm mới, chưa xác nhận tính mới hay khả năng triển khai lâm sàng. Khảo sát ban đầu có chủ đích, không phải tổng quan hệ thống và không chứng minh đã tìm hết tài liệu.

Tài liệu cũ tại `../topic_selection_2026_10/` được giữ nguyên như bối cảnh. Hồ sơ này ghi nhận chỉ đạo mới nhất, không sửa các nghiên cứu hoặc thông số đã đóng băng.
