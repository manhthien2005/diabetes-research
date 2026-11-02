# Lộ trình học: dự báo nguy cơ đái tháo đường type 2 mới mắc

Cập nhật: 03/11/2026. Dành cho sinh viên công nghệ phần mềm mới bắt đầu nghiên cứu dự đoán y khoa.

Đây là tài liệu học, **không phải protocol cuối cùng**. Hướng làm việc hiện tại là: dùng thông tin sức khỏe dạng bảng hoặc EHR tại ban đầu để dự báo nguy cơ đái tháo đường type 2 (T2D) mới mắc trong một khoảng tương lai. **5 năm chỉ là mốc minh họa đang cân nhắc**. Chưa chọn dataset, thuật toán hay đóng băng đề tài. Cox, survival neural network (SNN) và NAGALA hiện là các tên để tìm hiểu, không phải lựa chọn đã chốt.

## Bắt đầu ngay: một buổi 25 phút

1. Trong 5 phút, viết hai câu: “Người này hiện có bệnh không?” và “Người này có nguy cơ mắc bệnh trong tương lai không?”. Khoanh câu tương ứng với hướng nghiên cứu đang học.
2. Dành 12 phút đọc [Bài 1](LESSON_01_VI.md), tự giải bảng bốn người trước khi xem đáp án.
3. Trong 5 phút, vẽ một trục thời gian: thông tin đầu vào → thời điểm dự báo `t0` → theo dõi → biến cố hoặc kết thúc quan sát.
4. Trong 3 phút, ghi lại một điều đã hiểu và một điều còn khó. Có thể gửi chính hai dòng này cho trợ lý để điều chỉnh buổi tiếp theo.

Kết quả cần có hôm nay: giải thích bằng lời tại sao một người mất liên lạc ở năm 2 không được tự động gán “không mắc bệnh trong 5 năm”. Chưa cần cài thư viện hay viết mạng neural.

## Kiến thức cần trước và cách bù

| Nền tảng | Mức đủ để bắt đầu | Nếu còn yếu |
|---|---|---|
| Bảng dữ liệu | Hiểu hàng là người, cột là thuộc tính; ngày và đơn vị có ý nghĩa | Tự vẽ bảng bốn người ở Bài 1 |
| Python | Đọc biến, điều kiện và DataFrame là thuận lợi; chưa bắt buộc ở tuần 1 | Thực hành lọc một bảng nhỏ khi đã hiểu câu hỏi |
| Xác suất | Hiểu 20% là một mức bất định, không phải khẳng định một cá nhân chắc chắn mắc bệnh | Dùng ví dụ giả định trong từ điển |
| ML cơ bản | Phân biệt train, validation và test | Đọc mục data leakage của scikit-learn ở tuần 3 |
| Y khoa | Chỉ cần biết T2D là outcome đang nghiên cứu | Tra nghĩa HbA1c/FPG ở [từ điển](GLOSSARY_VI.md); định nghĩa lâm sàng chính thức sẽ xác minh sau |

## Bốn mô-đun, có thể học trong bốn tuần

Nhịp gợi ý: ba buổi 30–45 phút/tuần. Có thể kéo dài một mô-đun nếu chưa giải thích lại được; đây không phải lịch bắt buộc hoặc hạn chốt đề tài.

| Mô-đun | Học gì | Bài tập nhỏ | Tự kiểm tra trước khi đi tiếp |
|---|---|---|---|
| 1 — Câu hỏi và thời gian | Prognosis/diagnosis; người chưa có bệnh ban đầu; `t0`; event; follow-up; censoring | Hoàn thành Bài 1; viết câu hỏi với các ô “ai / biết gì tại t0 / dự báo gì / trong bao lâu” | Giải thích được right và interval censoring; không đồng nhất ngày chẩn đoán với onset sinh học |
| 2 — Đọc dữ liệu và đọc paper | Cohort dọc; cách xác định bệnh có sẵn/mới mắc; khả năng tiếp cận dữ liệu; hazard/risk; Cox/PH | Chọn một paper do trợ lý đang nghiên cứu và điền phiếu đọc bên dưới; thiếu thông tin thì ghi UNKNOWN | Chỉ được nguồn, mục hoặc bảng cho mỗi điều ghi lại; phân biệt HR với risk ratio |
| 3 — Đánh giá trung thực | Chia dữ liệu theo người; preprocessing trong fold; tuning; C-index, AUC theo thời gian, calibration, Brier score | Vẽ luồng train → validation → test; đánh dấu nơi được học median và chọn tham số | Giải thích được vì sao accuracy và C-index chưa đủ chứng minh dự báo xác suất tốt |
| 4 — Từ hiểu sang câu hỏi khả thi | So sánh các thiết kế tìm được; endpoint; follow-up; giới hạn khái quát hóa; báo cáo | Viết một trang “đã biết / chưa biết / cần kiểm chứng”, cùng hai phương án nghiên cứu còn mở | Nêu được trade-off của từng phương án mà chưa tuyên bố dataset hay SNN thắng |

## Học song song với trợ lý đang nghiên cứu

Mỗi khi trợ lý gửi một paper, chỉ cần trả lời sáu câu sau, không cần hiểu toàn bộ công thức:

1. Họ dự đoán hiện trạng hay tương lai? T2D có thực sự là outcome không?
2. Ai được đưa vào cohort? Đã loại người có bệnh ban đầu bằng cách nào?
3. `t0` là lúc nào? Những predictor nào có sẵn ở đó?
4. Event được ghi nhận bằng gì, khi nào? Có mất theo dõi hoặc khám định kỳ không?
5. Horizon và độ dài follow-up có được báo rõ không? Họ dùng thước đo gì?
6. Điều nào có thể học theo, điều nào chưa đủ nguồn hoặc chưa phù hợp với điều kiện của mình?

Với mỗi câu trả lời từ paper, thêm `section/table/page` nếu nguồn cung cấp. Nếu chưa thấy, ghi `UNKNOWN`, không suy ra từ tiêu đề. Tách “mình đã hiểu khái niệm” khỏi “paper đã báo cáo đủ”. Trợ lý tiếp tục tìm và đối chiếu bằng chứng; người học không cần hoàn thành cả lộ trình mới tham gia thảo luận.

## Các nguồn đọc ngắn, theo thứ tự

- Mô-đun 1: [scikit-survival — Introduction](https://scikit-survival.readthedocs.io/en/stable/user_guide/00-introduction.html), chỉ đọc “What is Survival Analysis?” và “Survival Data”; bỏ qua code lúc đầu.
- Mô-đun 2: [Understanding Predictions](https://scikit-survival.readthedocs.io/en/stable/user_guide/understanding_predictions.html), đọc “Basic Quantities”; tiếp theo [lifelines — Survival regression](https://lifelines.readthedocs.io/en/latest/Survival%20Regression.html), xem ý nghĩa Cox/HR, không cần chạy ví dụ.
- Khi gặp giả định Cox: [lifelines — PH assumption](https://lifelines.readthedocs.io/en/latest/jupyter_notebooks/Proportional%20hazard%20assumption.html), chú ý “Modify the functional form”. Cox có thể thêm spline/tương tác để mô tả quan hệ phi tuyến giữa predictor và log-hazard. Phi tuyến theo predictor khác với hiệu ứng thay đổi theo thời gian.
- Mô-đun 3: [scikit-survival — Evaluating Survival Models](https://scikit-survival.readthedocs.io/en/stable/user_guide/evaluating-survival-models.html), đọc phần tổng quan đầu trang; [scikit-learn — Data leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage), đọc quy tắc fit trên train.
- Mô-đun 4: [TRIPOD+AI chính thức](https://www.tripod-statement.org/) và [bài hướng dẫn gốc](https://pmc.ncbi.nlm.nih.gov/articles/PMC11019967/). Đây là hướng dẫn báo cáo nghiên cứu dự đoán, dùng cho cả regression và ML; không phải chứng nhận mô hình đúng hoặc một thuật toán bắt buộc.

Tài liệu ngoại ngữ có ví dụ bệnh khác; chỉ học phương pháp, không dùng số liệu đó làm bằng chứng cho T2D. Nhật ký đã đọc và mức truy cập nằm ở [learning_sources.json](learning_sources.json).

## Những phần để học sau khi cần

Chưa cần học đạo hàm Cox partial likelihood, thiết kế mạng sâu hoặc tìm hyperparameter SNN ngay. Sau khi hiểu dữ liệu theo thời gian mới xem Kaplan–Meier, spline, regularization và từng họ survival model. Một số SNN như DeepSurv vẫn dùng giả định PH; “neural” không tự động giải quyết non-PH. Có thể đọc [paper DeepSurv](https://pmc.ncbi.nlm.nih.gov/articles/PMC5828433/) để hiểu điểm này, không coi đó là khuyến nghị chọn mô hình.

Nếu dataset không cung cấp ngày hoặc khoảng follow-up phù hợp, đó là điều phải xác minh khi đánh giá tính khả thi, không phải lý do tự đổi câu hỏi dự báo tương lai thành chẩn đoán hiện tại. Các yêu cầu nâng cao sẽ được cân nhắc theo bằng chứng và điều kiện thực tế, không tự động trở thành điều kiện khóa đề tài.
