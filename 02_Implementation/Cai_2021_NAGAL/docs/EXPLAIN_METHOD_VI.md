# Đọc pipeline và giải thích kết quả

## Một dòng dữ liệu trả lời điều gì?

Mỗi người có các giá trị tại khám ban đầu, một thời gian theo dõi và cờ biến cố. Nếu `event=1`, duration là thời gian tới biến cố được ghi nhận. Nếu `event=0`, duration là thời gian tới lần theo dõi cuối, chưa quan sát thấy biến cố. Cờ 0 không cho biết người đó sẽ không mắc bệnh sau khi mất theo dõi.

Ví dụ, người được theo dõi 2 năm rồi mất theo dõi vẫn đóng góp thông tin trong 2 năm đó. Không được gán người này vào nhóm chắc chắn không mắc sau 5 năm. Cox sử dụng các risk sets theo thời gian để tận dụng thông tin này; các thước đo tại 5 năm phải xử lý censoring.

Baseline FPG/HbA1c được phép dự báo biến cố tương lai vì đó là phép đo trước biến cố, khác phép đo follow-up dùng xác định outcome. Nếu dùng chúng để đoán chính trạng thái đái tháo đường tại lần khám baseline, câu hỏi và nguy cơ leakage sẽ khác hẳn.

## Vì sao LASSO rồi mới Cox?

LASSO thêm một khoản phạt khiến các hệ số nhỏ có thể về 0. Mức phạt lớn thường giữ ít biến hơn. Trong bản tái dựng, ten-fold CV chỉ dùng development để so các mức phạt; imputation và standardization được fit lại riêng ở mỗi training fold. Quy tắc 1-SE ưu tiên mức phạt mạnh nhất có CV loss vẫn nằm trong một standard error của loss nhỏ nhất. Đây là cách ưu tiên mô hình gọn trong vùng có độ bất định tương tự, không bảo đảm đúng sáu biến hay tối ưu trong quần thể khác.

Sau đó, Cox được fit lại trên các biến chọn được bằng toàn development. Việc refit không phạt sau selection có thể làm hệ số và p-value lạc quan; không dùng chúng làm bằng chứng nhân quả. Mô hình Cox sáu biến công bố được fit riêng như một đối chiếu đã chỉ định trước, không giả vờ rằng LASSO của mình tự tìm lại được sáu biến đó.

## Cox cho xác suất 5 năm như thế nào?

Với predictor vector x, mô hình lưu hệ số β, centering μ và baseline cumulative hazard H₀(t). Nguy cơ được tính bằng:

`risk(t | x) = 1 − exp[−H₀(t) × exp((x − μ)β)]`.

Chỉ có β chưa đủ tính nguy cơ tuyệt đối. Bản lưu của mình có cả H₀(t), thứ tự predictors, centering và median dùng imputation. `tests/test_integrity.py` kiểm tra rằng lưu–đọc lại bundle khôi phục dự báo của thư viện tại các thời điểm baseline tương ứng. Ngoài khoảng thời gian development hỗ trợ, chương trình dừng thay vì ngoại suy ngầm.

Hazard ratio là tỷ số hazard tức thời có điều kiện theo mô hình; không đồng nghĩa với tỷ số xác suất mắc trong 5 năm. Kiểm tra proportional hazards bằng Schoenfeld residuals trong development giúp phát hiện khi giả định tác động tương đối không đổi theo thời gian không phù hợp. Nếu có vi phạm, phải báo cáo; không sửa mô hình dựa vào hiệu năng test.

## Đọc các thước đo

| Thước đo | Câu hỏi | Cách đọc |
|---|---|---|
| Harrell C-index | Mô hình xếp người có biến cố sớm vào nguy cơ cao hơn tốt đến đâu trong các cặp so sánh được? | Càng cao càng tốt; xét toàn follow-up và có giới hạn khi censoring nhiều |
| IPCW AUC tại 5 năm | Xếp hạng người có biến cố trước 5 năm so với người chưa có biến cố tại mốc này ra sao? | Càng cao càng tốt; không phải ROC nhị phân gán mọi event=0 thành âm |
| IPCW Brier tại 5 năm | Dự báo xác suất sai bao nhiêu sau khi xử lý censoring? | Càng thấp càng tốt; không phải accuracy |
| Calibration plot | Nhóm được dự báo khoảng r% có tỷ lệ mắc ước tính gần r% không? | So mean predicted với 1−KM(5 năm), xét số người còn at risk trong từng nhóm |
| Calibration intercept / slope | Xác suất có lệch hệ thống hoặc quá phân tán/thu hẹp không? | Mốc lý tưởng intercept=0, slope=1; diagnostic không tự chỉnh lại mô hình |

IPCW dùng inverse probability of censoring weighting: người có trạng thái tại horizon quan sát được được gán trọng số bù cho những người mất theo dõi. Censoring distribution ở đây được ước lượng từ development. Cách này dựa vào giả định censoring phù hợp; nó không chứng minh mất theo dõi là hoàn toàn ngẫu nhiên.

Bootstrap CI trong thực hành này giữ mô hình đã fit cố định và lấy mẫu lại người trong internal test. CI phản ánh bất định do mẫu test có điều kiện trên mô hình đó, không bao gồm mọi bất định từ chọn biến, split hay việc xây lại mô hình. Không diễn giải CI là bảo đảm hiệu năng ngoài NAGALA.

## Khi kết quả khác Cai

Đối chiếu trước tiên population và horizon, rồi split, số biến cố, preprocessing, loss/lambda và cách tính metric. Hai con số gần nhau không chứng minh cùng một pipeline; hai con số khác nhau cũng chưa chứng minh code sai. Trong bài thực hành này, seed gốc, mã chạy gốc và nhiều chi tiết thực thi vẫn chưa được xác minh. Không tìm seed hoặc thay pipeline theo test để đuổi số công bố.

Một lần chạy đúng có thể cho kết quả kém hơn kỳ vọng. Đầu ra cần giải thích được và chạy lại được; khả năng áp dụng lâm sàng hoặc tại Việt Nam cần nghiên cứu validation độc lập.
