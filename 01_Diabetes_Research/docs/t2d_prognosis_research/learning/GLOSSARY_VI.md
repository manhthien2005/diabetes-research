# Từ điển nhập môn: 34 thuật ngữ

Tài liệu học, không phải protocol cuối cùng. **Mọi người, con số và tình huống ví dụ bên dưới đều giả định**, không phải kết quả nghiên cứu hay khuyến cáo điều trị. Horizon 5 năm chỉ để luyện đọc.

Đọc cùng [lộ trình](LEARNING_PATH_VI.md) và [Bài 1](LESSON_01_VI.md). Không cần nhớ hết trong một lần.

## Câu hỏi và dữ liệu

1. **Diagnosis — chẩn đoán / mô hình chẩn đoán:** Đánh giá tình trạng bệnh đang tồn tại tại thời điểm quan tâm. Ví dụ giả định: dùng thông tin ở một lần khám để ước tính người đó hiện có T2D hay không. Không chứng minh khả năng dự báo mới mắc nhiều năm sau.

2. **Prognosis — tiên lượng / dự báo tương lai:** Ước tính một outcome sẽ xảy ra sau thời điểm dự báo. Ví dụ: với người chưa có T2D tại `t0`, ước tính nguy cơ được xác định T2D trong vài năm tới. Không nhất thiết dự đoán chính xác ngày mắc bệnh của từng người.

3. **Prevalent vs incident disease — bệnh có sẵn và bệnh mới mắc:** Prevalent là đã có bệnh tại mốc xét; incident là biến cố mới trong thời gian theo dõi ở người đủ điều kiện ban đầu. Ví dụ: mã chẩn đoán xuất hiện muộn không đủ chứng minh bệnh thực sự mới khởi phát nếu lịch sử trước đó thiếu.

4. **Cohort — đoàn hệ:** Nhóm người xác định bằng tiêu chí chung và được quan sát theo thời gian. Có thể dựng hồi cứu từ hồ sơ đã tồn tại. Ví dụ: người đủ điều kiện tại lần khám ban đầu được theo dõi tiếp; “hồi cứu” vẫn có thể trả lời câu hỏi tiên lượng nếu thứ tự thời gian được giữ đúng.

5. **Tabular data / EHR — dữ liệu bảng / bệnh án điện tử:** Bảng lưu hàng và cột; EHR có thể chứa nhiều bảng, lần khám và thời điểm cho một người. Ví dụ: bảng xét nghiệm có ba dòng cho cùng bệnh nhân; ba dòng không tự động là ba người độc lập.

6. **Predictor / covariate — biến đầu vào:** Thông tin dùng để dự báo, phải có sẵn tại thời điểm dự báo đã định. Ví dụ: tuổi tại `t0` là ứng viên; kết quả xét nghiệm hai năm sau không được đưa vào mô hình chỉ dùng baseline.

7. **Outcome / endpoint — kết cục / biến cố đích:** Điều nghiên cứu muốn dự đoán, kèm cách xác định rõ. Ví dụ: “lần đầu ghi nhận T2D theo quy tắc hồ sơ đã xác minh”. Endpoint chẩn đoán được ghi nhận không đồng nghĩa thời điểm onset sinh học; tần suất khám có thể ảnh hưởng lúc phát hiện.

8. **HbA1c / FPG — chỉ số đường huyết:** HbA1c là hemoglobin gắn glucose; FPG là glucose huyết tương lúc đói. Chúng có thể tham gia xác định tình trạng đường huyết. Không suy ra đơn vị hay ngưỡng chẩn đoán chỉ từ tên cột; cần codebook và nguồn lâm sàng chính thức.

## Thời gian quan sát

9. **Index time (`t0`) — mốc dự báo:** Thời điểm đứng tại đó để dự báo. Ví dụ: cuối buổi khám, sau khi thông tin đầu vào cần dùng đã có. Nếu xét nghiệm trả kết quả sau `t0`, phải xem lại khả năng dùng nó; ngày lấy mẫu chưa chắc là ngày thông tin sẵn có.

10. **Baseline — thông tin ban đầu:** Thông tin trước hoặc tại `t0`, trong cửa sổ đã định. Ví dụ: tuổi ở `t0` và một xét nghiệm trước đó có thể là baseline nếu thiết kế cho phép. Baseline không nhất thiết nghĩa là đúng một ngày duy nhất.

11. **Prediction horizon — khoảng dự báo:** Khoảng từ `t0` đến mốc tương lai muốn ước tính nguy cơ. Ví dụ: 5 năm là câu hỏi “có biến cố trước hoặc tại năm 5 không?”. Nó khác với việc mỗi người thực tế đều được theo dõi đủ 5 năm.

12. **Follow-up — theo dõi:** Thời gian và quá trình quan sát sau `t0`. Ví dụ: một người được quan sát tới năm 2, người khác tới năm 6. Cần biết quan sát bằng khám định kỳ, hồ sơ liên kết hay cách khác, không chỉ đọc một cột thời gian.

13. **Time-to-event / observed time — thời gian đến biến cố / thời gian quan sát:** Với biến cố ghi nhận chính xác, observed time là thời gian đến biến cố hoặc đến lúc dừng quan sát, tùy điều nào trước. Ví dụ: biến cố ở năm 3 cho time=3; mất theo dõi ở năm 2 cho time=2, nhưng chưa biết thời gian biến cố thật.

14. **Event indicator — chỉ báo biến cố:** Trong mã hóa right censoring đơn giản, `1` là đã quan sát biến cố, `0` là chưa quan sát trước khi dừng. Ví dụ: `(2, 0)` nghĩa là bị kiểm duyệt tại năm 2, không phải chắc chắn không bao giờ mắc bệnh. Competing risks cần mã loại biến cố riêng.

15. **Right censoring — kiểm duyệt phải:** Biết chưa xảy ra biến cố tới lần quan sát cuối nhưng chưa biết sau đó. Ví dụ: theo dõi kết thúc năm 4 khi người đó chưa có biến cố. Không được biến thành nhãn âm tính ở năm 5. Nguồn nền: [scikit-survival Introduction](https://scikit-survival.readthedocs.io/en/stable/user_guide/00-introduction.html).

16. **Interval censoring — kiểm duyệt khoảng:** Biết biến cố xảy ra giữa hai mốc, không biết chính xác lúc nào. Ví dụ: lần đánh giá năm 1 chưa có bệnh, năm 3 đã có bệnh, nên thời điểm chuyển trạng thái nằm trong `(1, 3]` nếu các đánh giá phản ánh đúng trạng thái. Ngày phát hiện ở năm 3 là endpoint khác. Xem [lifelines — Interval censored data](https://lifelines.readthedocs.io/en/latest/Survival%20analysis%20with%20lifelines.html#interval-censored-data).

17. **Non-informative censoring — kiểm duyệt không mang thông tin về tiên lượng:** Giả định kỹ thuật rằng sau khi xét thông tin đã điều kiện hóa, việc bị kiểm duyệt không còn tiết lộ thêm nguy cơ biến cố. Ví dụ: người bỏ khám vì sức khỏe xấu có thể làm giả định này đáng nghi; không phải cứ `event=0` là giả định đã đúng.

18. **Competing risk / cumulative incidence function (CIF) — biến cố cạnh tranh / hàm tỷ lệ mới mắc tích lũy:** Biến cố cạnh tranh ngăn biến cố đích xảy ra sau đó, như tử vong trước T2D. CIF ước tính xác suất xảy ra một loại biến cố theo thời gian khi tính các loại cạnh tranh. Không thể tự xử lý tử vong như mất liên lạc rồi diễn giải `1−Kaplan–Meier` là xác suất T2D thực tế. [Nguồn](https://scikit-survival.readthedocs.io/en/stable/user_guide/competing-risks.html).

## Nguy cơ và mô hình

19. **Absolute risk — nguy cơ tuyệt đối:** Xác suất biến cố trước một mốc cụ thể, phải gắn với outcome và quần thể. Ví dụ giả định: “nguy cơ 10% trong 5 năm” không có nghĩa xác suất 10% mỗi năm hoặc chắc chắn đúng cho một cá nhân.

20. **Survival function `S(t)` — hàm chưa có biến cố:** Xác suất thời gian đến biến cố vượt quá `t`. Nếu event là T2D, “survival” nói về chưa có T2D, không tự động là còn sống. Trong thiết lập một biến cố phù hợp, `1−S(t)` là xác suất biến cố tới `t`; với competing risks phải xác định đúng estimand/CIF. [Nguồn về đại lượng](https://scikit-survival.readthedocs.io/en/stable/user_guide/understanding_predictions.html).

21. **Hazard — cường độ biến cố tức thời:** Tốc độ xảy ra biến cố quanh một thời điểm, với điều kiện chưa có biến cố tới đó; có đơn vị nghịch đảo thời gian. Nó không phải xác suất tích lũy, có thể lớn hơn 1. Ví dụ giả định: hazard `0,2/năm` không tự có nghĩa risk 5 năm là 20%.

22. **Hazard ratio (HR) — tỷ số hazard:** So sánh hai hazard tại cùng thời điểm, theo điều kiện của mô hình. Ví dụ giả định: HR=2 mô tả hazard gấp đôi; không suy ra xác suất 5 năm gấp đôi, cũng không tự chứng minh nguyên nhân. Xem [lifelines — Interpretation](https://lifelines.readthedocs.io/en/latest/Survival%20Regression.html#interpretation).

23. **Risk ratio (RR) — tỷ số nguy cơ:** So sánh hai xác suất trong cùng khoảng thời gian. Ví dụ giả định: risk 5 năm là 20% và 10% thì RR=2, chênh lệch tuyệt đối là 10 điểm phần trăm. HR=2 không đủ để suy ra hai xác suất này.

24. **Cox proportional hazards model — mô hình Cox PH:** Mô hình liên hệ predictor với hazard và một baseline hazard theo thời gian. Để ra xác suất theo mốc cần cả thông tin baseline survival/hazard, không chỉ hệ số HR. Ví dụ: tuổi và BMI có thể cùng đi vào mô hình. Đây là phương án cần hiểu, chưa được chọn cho đề tài.

25. **Proportional hazards (PH) — hazard tỷ lệ:** Trong Cox PH với predictor cố định, tỷ số hazard giữa hai cấu hình predictor giữ không đổi theo thời gian trong cùng tầng mô hình. Không có nghĩa hazard không đổi. Ví dụ: cả hai hazard có thể tăng theo tuổi theo dõi mà tỷ số vẫn giữ nguyên. [Nguồn](https://lifelines.readthedocs.io/en/latest/jupyter_notebooks/Proportional%20hazard%20assumption.html).

26. **Nonlinear effect / interaction — hiệu ứng phi tuyến / tương tác:** Phi tuyến: thay đổi predictor không tạo cùng mức thay đổi log-hazard ở mọi vùng. Tương tác: liên hệ của một predictor phụ thuộc predictor khác. Cox có thể dùng spline và tương tác; không phải mọi quan hệ đầu vào đều buộc là đường thẳng. Điều này khác non-PH theo thời gian. [Nguồn](https://lifelines.readthedocs.io/en/latest/Survival%20Regression.html).

27. **Survival neural network (SNN) — mạng neural cho time-to-event:** Tên chung cho nhiều mô hình dùng neural network và xử lý dữ liệu thời gian/kiểm duyệt. Không phải một thuật toán duy nhất. Nhiều kiến trúc Cox-based vẫn giữ PH; DeepSurv là ví dụ. Phải đọc kiến trúc và loss trước khi kết luận nó xử lý non-PH. [Paper gốc DeepSurv](https://pmc.ncbi.nlm.nih.gov/articles/PMC5828433/).

## Đánh giá và độ tin cậy

28. **Discrimination / C-index — khả năng phân biệt / chỉ số concordance:** Discrimination là khả năng xếp hạng người theo nguy cơ. C-index kiểm tra thứ tự dự báo trên các cặp so sánh được với thời gian biến cố. Không phải phần trăm người được chẩn đoán đúng; chưa cho biết xác suất dự báo có sát thực tế không. [Nguồn đánh giá](https://scikit-survival.readthedocs.io/en/stable/user_guide/evaluating-survival-models.html).

29. **Time-dependent AUC — AUC theo thời gian:** Đánh giá phân biệt tại một hay nhiều mốc, với định nghĩa và cách xử lý kiểm duyệt phù hợp. Ví dụ: AUC ở năm 3 và năm 5 trả lời các câu hỏi khác nhau. Không lấy ROC-AUC phân loại thông thường trên nhãn âm giả của người mất theo dõi.

30. **Calibration / Brier score — độ phù hợp xác suất / điểm Brier:** Calibration xem xác suất dự báo có phù hợp tần suất biến cố ước tính không. Ví dụ giả định: nhóm dự báo 10% nên có tỷ lệ biến cố ước tính gần mức đó tại cùng mốc. Brier score đo sai số dự báo xác suất; bản survival cần xử lý kiểm duyệt và phản ánh cả phân biệt lẫn calibration, không phải chỉ calibration.

31. **Data leakage / preprocessing isolation — rò rỉ / cô lập tiền xử lý:** Dùng thông tin không có lúc dự báo hoặc để dữ liệu đánh giá ảnh hưởng quá trình học. Ví dụ: học median từ cả train và test là leakage; median phải học trong từng training fold rồi áp dụng sang phần kiểm tra. Predictor hậu `t0` cũng là leakage. [Nguồn](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage).

32. **Train / validation / test; tuning — huấn luyện / lựa chọn / kiểm tra; tinh chỉnh:** Train học mô hình, validation chọn cấu hình, test đánh giá sau khi đã chốt cách làm. Ví dụ: chọn số lớp SNN hoặc ngưỡng quyết định theo điểm test làm mất tính độc lập của test. Cross-validation cần cô lập các bước học dữ liệu trong mỗi fold.

33. **Internal / temporal / external validation — kiểm định nội bộ / theo thời gian / bên ngoài:** Chia ngẫu nhiên cùng nguồn là nội bộ. Một cohort ở giai đoạn sau đánh giá khả năng chuyển sang thời gian mới; cohort độc lập ở hệ thống khác đánh giá khả năng chuyển bối cảnh. Ví dụ: đổi random seed không tạo external validation. Phải mô tả quan hệ nguồn dữ liệu thay vì chỉ gắn nhãn.

34. **TRIPOD+AI — hướng dẫn báo cáo mô hình dự đoán:** Khung báo cáo giúp người đọc hiểu câu hỏi, dữ liệu, cách làm và đánh giá, áp dụng cả regression lẫn ML. Không đảm bảo không có bias hoặc mô hình dùng được lâm sàng. Ví dụ: dùng checklist để phát hiện paper không nói rõ thời điểm predictor được đo. [Trang chính thức](https://www.tripod-statement.org/).

## Ba câu dễ nhầm cần nhớ

- “Accuracy cao” không đủ đánh giá survival prediction: thời gian và kiểm duyệt cần được xử lý; C-index, AUC theo mốc, calibration và Brier score trả lời những phần khác nhau.
- Xét nghiệm đường huyết **tại baseline** có thể là predictor hợp lệ cho **biến cố tương lai**, khi đã loại bệnh có sẵn và xác minh thời điểm sẵn có. Không được dùng cùng phép đo tạo nhãn hiện tại để giả vờ dự báo tương lai; biến baseline và follow-up phải được tách rõ.
- Predictor quan trọng hoặc HR khác 1 không tự chứng minh tác động nhân quả. Đây đang là học về dự đoán, chưa phải nghiên cứu điều trị.

Đường dẫn và phần nguồn đã đọc được ghi trong [learning_sources.json](learning_sources.json). Các định nghĩa chỉ phục vụ nhập môn; trước phân tích thật cần đối chiếu protocol, codebook và nguồn lâm sàng tương ứng.
