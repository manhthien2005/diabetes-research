# Bài 1 — Đứng ở hôm nay để dự báo tương lai

Thời lượng gợi ý: 20–30 phút. Không cần code. Đọc mục 1–3 trong 10 phút, dành 5–10 phút cho câu hỏi và đáp án; mục 4 có thể đọc thêm cuối buổi. Đây là bài học nhập môn, **không phải protocol cuối cùng hoặc bằng chứng về hiệu quả mô hình**.

Hướng làm việc: dự báo T2D mới mắc trong một khoảng tương lai từ thông tin ban đầu. **5 năm là mốc tạm dùng để học**, chưa được đóng băng; chưa chọn dataset hay thuật toán. [Lộ trình](LEARNING_PATH_VI.md) cho biết bước tiếp theo; [từ điển](GLOSSARY_VI.md) giải thích các từ mới.

## 1. Câu hỏi đến trước thuật toán

Hai câu hỏi có thể dùng cùng tên bệnh nhưng khác bài toán:

| Câu hỏi | Thông tin cần làm rõ | Loại bài toán |
|---|---|---|
| “Ở lần khám này, người này có T2D không?” | Cách xác định bệnh đang có tại lần khám | Diagnosis: chẩn đoán hiện tại |
| “Người chưa có T2D hôm nay có nguy cơ được xác định T2D trong vài năm tới thế nào?” | Bệnh có sẵn, mốc bắt đầu, outcome tương lai và theo dõi | Prognosis: tiên lượng |

Ví dụ thứ hai là hướng đang tìm hiểu. Không thể lấy một bảng chỉ chứa nhãn bệnh tại một lần khám rồi đổi tên thành “dự báo 5 năm”. Mô hình tiên lượng cần thông tin outcome sau mốc dự báo. TRIPOD+AI dùng cho cả mô hình chẩn đoán và tiên lượng; việc xác định rõ câu hỏi giúp người đọc hiểu mô hình phục vụ mục đích gì. [Hướng dẫn gốc](https://pmc.ncbi.nlm.nih.gov/articles/PMC11019967/).

## 2. Đặt mốc `t0` và giữ đúng thứ tự

Hãy tưởng tượng đang đóng băng màn hình hồ sơ tại thời điểm dự báo `t0`. Mô hình chỉ được biết những thông tin có sẵn ở màn hình đó.

```text
Thông tin baseline đã có       t0              Theo dõi tương lai
tuổi, thông tin sức khỏe  ------|--------------------->
                               dự báo         event hoặc dừng quan sát
```

Baseline có thể bao gồm một cửa sổ thông tin trước `t0`, theo quy tắc nghiên cứu. “Được đo” chưa chắc “đã sẵn có”: một xét nghiệm lấy mẫu hôm nay nhưng mai mới trả kết quả không có sẵn cho dự báo hôm nay nếu `t0` đặt trước lúc trả kết quả.

Với T2D mới mắc, trước hết cần loại người đã có T2D ở baseline bằng định nghĩa có nguồn, phù hợp dataset. “Chưa thấy mã chẩn đoán” chưa chắc “chưa có bệnh”. Bài này không đặt ngưỡng ADA; quy tắc chẩn đoán, đơn vị xét nghiệm và cách loại bệnh có sẵn sẽ được xác minh riêng.

Đường huyết baseline **không tự động là leakage** khi mục tiêu là T2D tương lai và bệnh có sẵn đã được loại đúng. Xét nghiệm baseline và xét nghiệm follow-up là các phép đo khác thời điểm, cần phân vai rõ. Ngược lại, dùng chính kết quả follow-up tạo nhãn làm predictor, hoặc dùng cùng phép đo để suy ra nhãn hiện tại rồi gọi đó là tiên lượng, là sai thứ tự thông tin.

## 3. Bốn người hư cấu và hai cách đặt endpoint

**Toàn bộ bảng sau được tự tạo chỉ để học. Không có bệnh nhân thật, không phải dữ liệu tải về, không phải kết quả nghiên cứu.** Các năm là thời gian kể từ `t0` riêng của mỗi người, không phải năm lịch. Giả sử cả bốn đã được xác nhận đủ điều kiện, chưa có T2D tại baseline; các đánh giá trạng thái trong ví dụ được xem là đúng. Giả định này để học, không được mặc nhiên áp dụng cho EHR thật.

Endpoint dùng cho cột mã hóa là **thời gian đến lần đầu ghi nhận T2D trong hệ thống theo dõi giả định**. Không tuyên bố đó là ngày khởi phát sinh học.

| Người hư cấu | Những gì biết sau baseline | Time cho endpoint ghi nhận (năm) | Event | Điều có thể kết luận |
|---|---|---:|---:|---|
| A | Lần đầu ghi nhận T2D ở năm 3 | 3 | 1 | Có event ghi nhận ở năm 3; chưa biết onset sinh học chính xác |
| B | Được xác nhận chưa có T2D ở năm 2 rồi mất liên lạc | 2 | 0 | Right censored tại năm 2; trạng thái năm 5 chưa biết |
| C | Được theo dõi tới hết năm 5, chưa ghi nhận T2D và đánh giá cuối chưa có bệnh | 5 | 0 | Chưa có event tới năm 5; right censored tại mốc kết thúc |
| D | Đánh giá năm 1 chưa có T2D; lần đánh giá tiếp ở năm 4 xác định T2D | 4 | 1 | Lần đầu phát hiện tại năm 4; thời điểm chuyển trạng thái chỉ biết nằm trong `(1, 4]` |

`Event=0` ở B và C nói về **chưa quan sát event trước khi dừng theo dõi**, không phải “không bao giờ mắc”. B vẫn cung cấp thông tin tới năm 2; không cần xóa B vì chưa đủ 5 năm. C đủ thông tin để biết không có event trong 5 năm theo giả định bài tập, nhưng vẫn có thể mắc sau đó. Đây là ý tưởng của right censoring. [scikit-survival — Survival Data](https://scikit-survival.readthedocs.io/en/stable/user_guide/00-introduction.html).

Với D, có hai câu hỏi khác nhau:

- Nếu endpoint là **lần đầu ghi nhận**, thời gian ghi nhận là năm 4 trong hệ thống giả định này.
- Nếu endpoint là **thời điểm chuyển sang trạng thái bệnh giữa các lần đánh giá**, chỉ biết khoảng `(1, 4]`: đây là interval censoring. Không được tự coi năm 4 là thời điểm chuyển trạng thái chính xác, hoặc lấy điểm giữa làm sự thật. Ngay cả khoảng chuyển trạng thái xác định bằng xét nghiệm cũng không đồng nghĩa biết đầy đủ quá trình onset sinh học.

Phải chọn và mô tả endpoint trước phân tích thật. Khám nhiều hơn có thể dẫn tới phát hiện sớm hơn; mô hình có thể học cả quá trình phát hiện nếu không xem kỹ cách ghi nhận. [lifelines — Interval censored data](https://lifelines.readthedocs.io/en/latest/Survival%20analysis%20with%20lifelines.html#interval-censored-data).

## 4. “Survival” không mặc định là sống hay chết

Khi event là T2D, `S(t)` biểu diễn xác suất chưa có event T2D sau mốc `t`, theo định nghĩa mô hình. Nó không phải mặc định xác suất còn sống. Trong thiết lập chỉ một loại event phù hợp, nguy cơ tích lũy tới `t` là `1−S(t)`. [Đại lượng nền tảng](https://scikit-survival.readthedocs.io/en/stable/user_guide/understanding_predictions.html).

Nếu người đó tử vong trước khi có T2D, tử vong ngăn việc mắc T2D về sau: đó là competing risk. Khi muốn nguy cơ T2D thực tế trong bối cảnh có tử vong cạnh tranh, không tự lấy `1−S(t)` từ phân tích coi tử vong là kiểm duyệt thông thường; cần xác định đại lượng đích và cách ước tính cumulative incidence. Bảng bốn người cố ý chưa thêm trường hợp này để tránh trộn hai bài học. [Nguồn về competing risks](https://scikit-survival.readthedocs.io/en/stable/user_guide/competing-risks.html).

Hazard là **tốc độ tức thời có điều kiện**, có đơn vị theo thời gian; probability/risk là **xác suất trong một khoảng**, nằm từ 0 đến 1. HR so sánh hazard, RR so sánh risk. Ví dụ hoàn toàn giả định: risk 5 năm 20% so với 10% cho RR=2; chỉ biết HR=2 không đủ kết luận hai risk này. [lifelines — Interpretation](https://lifelines.readthedocs.io/en/latest/Survival%20Regression.html#interpretation).

## 5. Tự làm trước khi xem đáp án

1. Bảng bốn người đang minh họa diagnosis hay prognosis? Vì sao cần xác nhận không có T2D tại baseline?
2. Có được gán B “không mắc trong 5 năm” không? B có hoàn toàn vô dụng không?
3. `(time=5, event=0)` của C có nghĩa là gì? Có biết C không mắc ở năm 7 không?
4. Với D, năm 4 và khoảng `(1, 4]` lần lượt mô tả cái gì?
5. Nếu có kết quả xét nghiệm của A ở năm 2, có được thêm vào mô hình dự báo **tại baseline** không?
6. Xét nghiệm đường huyết thật sự có sẵn tại baseline có luôn bị cấm không?
7. Nếu HR=2, có thể nói “xác suất mắc trong 5 năm gấp đôi” không?
8. Nếu chuẩn hóa dữ liệu bằng trung bình của toàn bộ train và test rồi báo accuracy cao, còn thiếu/sai điều gì?

## 6. Đáp án và cách tự sửa

1. **Prognosis:** outcome ở tương lai. Loại bệnh có sẵn để không gọi người vốn đã mắc bệnh là ca mới; cần quy tắc xác minh thay vì chỉ dựa vào chỗ trống trong hồ sơ.
2. **Không gán nhãn âm năm 5.** B có thông tin tới năm 2. Phương pháp phù hợp có thể tận dụng phần quan sát đó dưới các giả định cần kiểm tra, gồm cơ chế kiểm duyệt.
3. C chưa có event tới hết năm 5, rồi dừng quan sát. Năm 7 chưa biết. Horizon 5 năm và thời gian một người được theo dõi là hai khái niệm khác nhau.
4. Năm 4 là lúc phát hiện/ghi nhận; `(1, 4]` là khoảng chuyển trạng thái theo giả định đánh giá định kỳ của bài tập. Chọn endpoint nào thì phải phân tích và diễn giải theo endpoint đó.
5. **Không**, vì năm 2 nằm sau `t0`. Mô hình cập nhật dự báo ở một mốc mới là thiết kế khác, cần định nghĩa riêng chứ không trộn vào baseline model.
6. **Không luôn cấm.** Có thể dùng baseline glycemia để dự báo bệnh tương lai khi bệnh có sẵn được loại đúng, thông tin sẵn có và phép đo follow-up tạo outcome được tách biệt. Chưa thể quyết định cho dataset thật khi chưa đọc codebook.
7. **Không.** HR không phải RR; muốn risk 5 năm cần thông tin/mô hình xác suất tương ứng, không chỉ một HR.
8. Trung bình đã học từ test nên rò rỉ. Chia dữ liệu trước, học imputation/scaling/feature selection trong training fold; chọn tham số/ngưỡng bằng validation hoặc inner folds, giữ final test độc lập. Accuracy không phải thước đo mặc định cho survival với censoring. Cần các phép đánh giá phù hợp thời gian và kiểm duyệt, cùng calibration. [scikit-learn — leakage](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage), [scikit-survival — evaluation](https://scikit-survival.readthedocs.io/en/stable/user_guide/evaluating-survival-models.html).

## 7. Kết thúc buổi học

Viết lại bằng lời của mình: “Tại `t0`, biết ___; trong nhóm ___; muốn dự báo ___ tới ___; nếu mất theo dõi trước đó thì ___”. Giữ các phần chưa chốt bằng chữ “chưa xác minh”. Nếu giải được câu 2, 4 và 5 mà không xem đáp án, có thể chuyển sang mô-đun đọc cohort và paper. Nếu còn khó, chỉ cần luyện lại bảng bốn người, chưa cần học công thức Cox hay mạng sâu.

Các nguồn trên là tài liệu phương pháp, không cung cấp bằng chứng lựa chọn dataset, tính khả thi hoặc hiệu quả của đề tài T2D này. Phần đã truy cập được ghi trong [nhật ký nguồn](learning_sources.json).
