<!-- extracted by pdf-extract | engine=docling | pages=15 | ocr=False | tables=6/6 | density=1.03 | score=100 -->

## BÀI BÁO NGHIÊN CỨU

## Truy cập Mở

## Một cách tiếp cận hướng-dữ-liệu để dự đoán đái tháo đường và bệnh tim mạch bằng học máy

An Dinh 1† , Stacey Miertschin 2† , Amber Young 3† and Somya D. Mohanty 4*

## Tóm tắt

Bối cảnh: Đái tháo đường và bệnh tim mạch là hai trong những nguyên nhân chính gây tử vong ở Hoa Kỳ. Việc nhận diện và dự đoán các bệnh này ở bệnh nhân là bước đầu tiên hướng tới việc ngăn chặn tiến triển của chúng. Chúng tôi đánh giá khả năng của các mô hình học máy trong việc phát hiện các bệnh nhân có nguy cơ bằng dữ liệu khảo sát (và kết quả xét nghiệm), và xác định các biến then chốt trong dữ liệu góp phần gây ra các bệnh này ở bệnh nhân.

Phương pháp: Nghiên cứu của chúng tôi khám phá các cách tiếp cận hướng-dữ-liệu sử dụng các mô hình học máy có giám sát để nhận diện các bệnh nhân mắc các bệnh như vậy. Sử dụng bộ dữ liệu Khảo sát Kiểm tra Sức khỏe và Dinh dưỡng Quốc gia (NHANES), chúng tôi tiến hành một tìm kiếm vét cạn trên tất cả các biến đặc trưng có sẵn trong dữ liệu để phát triển các mô hình phát hiện tim mạch, tiền đái tháo đường, và đái tháo đường. Bằng cách dùng các khung thời gian và các tập đặc trưng khác nhau cho dữ liệu (dựa trên dữ liệu xét nghiệm), nhiều mô hình học máy (hồi quy logistic, máy vector hỗ trợ, rừng ngẫu nhiên, và gradient boosting) được đánh giá về hiệu năng phân loại của chúng. Các mô hình sau đó được kết hợp để phát triển một mô hình tập hợp có trọng số, có khả năng tận dụng hiệu năng của các mô hình khác biệt để cải thiện độ chính xác phát hiện. Độ lợi thông tin (information gain) của các mô hình dựa trên cây được dùng để xác định các biến then chốt trong dữ liệu bệnh nhân góp phần vào việc phát hiện các bệnh nhân có nguy cơ trong mỗi lớp bệnh bởi các mô hình học từ dữ liệu.

Kết quả: Mô hình tập hợp được phát triển cho bệnh tim mạch (dựa trên 131 biến) đạt điểm Diện tích Dưới - Đường cong Đặc trưng Hoạt động của Bộ thu nhận (AU-ROC) là 83.1% khi không dùng kết quả xét nghiệm, và 83.9% độ chính xác với kết quả xét nghiệm. Trong phân loại đái tháo đường (dựa trên 123 biến), mô hình eXtreme Gradient Boost (XGBoost) đạt điểm AU-ROC là 86.2% (không có dữ liệu xét nghiệm) và 95.7% (với dữ liệu xét nghiệm). Đối với bệnh nhân tiền đái tháo đường, mô hình tập hợp có điểm AU-ROC hàng đầu là 73.7% (không có dữ liệu xét nghiệm), và đối với dữ liệu dựa trên xét nghiệm XGBoost hoạt động tốt nhất ở 84.4%. Năm bộ dự đoán hàng đầu ở bệnh nhân đái tháo đường là 1) vòng eo, 2) tuổi, 3) cân nặng tự báo cáo, 4) chiều dài chân, và 5) lượng natri nạp vào. Đối với các bệnh tim mạch, các mô hình xác định 1) tuổi, 2) huyết áp tâm thu, 3) cân nặng tự báo cáo, 4) sự xuất hiện đau ngực, và 5) huyết áp tâm trương là các yếu tố đóng góp then chốt.

Kết luận: Chúng tôi kết luận rằng các mô hình học máy dựa trên bảng câu hỏi khảo sát có thể cung cấp một cơ chế nhận diện tự động cho các bệnh nhân có nguy cơ mắc đái tháo đường và các bệnh tim mạch. Chúng tôi cũng xác định các yếu tố đóng góp then chốt cho dự đoán, có thể được khám phá thêm về các hàm ý của chúng đối với hồ sơ sức khỏe điện tử.

Từ khóa: Học máy, Phân tích sức khỏe, Học tập hợp (Ensemble learning), Học đặc trưng (Feature learning)

*Liên hệ: sdmohant@uncg.edu

† An Dinh, Stacey Miertschin và Amber Young đóng góp ngang nhau cho công trình này.

4 Department of Computer Science, University of North Carolina at Greensboro, Greensboro, NC USA Danh sách đầy đủ thông tin tác giả có ở cuối bài báo

## Bối cảnh

Đái tháo đường và bệnh tim mạch (CVD) là hai trong những bệnh mạn tính phổ biến nhất dẫn đến tử vong ở Hoa Kỳ. Năm 2015, khoảng 9% dân số Hoa Kỳ đã được chẩn đoán đái tháo đường trong khi 3% khác chưa được chẩn đoán. Hơn nữa, khoảng 34% mắc tiền đái tháo đường. Tuy nhiên, trong số những người trưởng thành mắc tiền đái tháo đường gần 90% trong số họ không nhận biết được tình trạng của mình [1]. Mặt khác, CVD là nguyên nhân hàng đầu của cứ bốn ca tử vong thì có một ca mỗi năm ở Hoa Kỳ [2]. Xấp xỉ 92.1 triệu người trưởng thành Mỹ đang sống với một dạng CVD nào đó hoặc các di chứng của đột quỵ, nơi chi phí chăm sóc sức khỏe trực tiếp và gián tiếp được ước tính là hơn $329.7 [3]. Ngoài ra, có một mối tương quan giữa CVD và đái tháo đường. Hiệp hội Tim mạch Hoa Kỳ báo cáo ít nhất 68% người từ 65 tuổi trở lên mắc đái tháo đường tử vong vì bệnh tim [4]. Trong một tổng quan tài liệu hệ thống của Einarson và cộng sự [5], các tác giả đã kết luận rằng 32.2% tất cả bệnh nhân đái tháo đường type 2 bị ảnh hưởng bởi bệnh tim.

Trong thế giới dữ liệu ngày càng tăng nơi các bệnh viện đang dần áp dụng các hệ thống dữ liệu lớn [6], có những lợi ích lớn khi dùng phân tích dữ liệu trong hệ thống chăm sóc sức khỏe để cung cấp các hiểu biết, tăng cường chẩn đoán, cải thiện kết quả, và giảm chi phí [7]. Cụ thể, việc triển khai thành công học máy nâng cao công việc của các chuyên gia y tế và cải thiện hiệu suất của hệ thống chăm sóc sức khỏe [8]. Các cải thiện đáng kể về độ chính xác chẩn đoán đã được cho thấy qua hiệu năng của các mô hình học máy cùng với các bác sĩ lâm sàng [9]. Các mô hình học máy kể từ đó đã được dùng trong dự đoán nhiều bệnh phổ biến [10, 11], gồm dự đoán đái tháo đường [12, 13], phát hiện tăng huyết áp ở bệnh nhân đái tháo đường [14], và phân loại bệnh nhân mắc CVD trong số các bệnh nhân đái tháo đường [15].

Các mô hình học máy có thể hữu ích trong việc nhận diện các bệnh nhân mắc đái tháo đường hoặc bệnh tim. Thường có nhiều yếu tố góp phần vào việc nhận diện các bệnh nhân có nguy cơ mắc các bệnh phổ biến này. Các phương pháp học máy có thể giúp nhận diện các mẫu hình ẩn trong các yếu tố này mà nếu không thì có thể bị bỏ sót.

Trong bài báo này, chúng tôi dùng các mô hình học máy có giám sát để dự đoán đái tháo đường và bệnh tim mạch. Mặc dù có mối liên hệ đã biết giữa các bệnh này, chúng tôi thiết kế các mô hình để dự đoán CVD và đái tháo đường riêng biệt nhằm mang lại lợi ích cho một phạm vi bệnh nhân rộng hơn. Đổi lại, chúng tôi có thể xác định các điểm chung về đặc trưng giữa các bệnh ảnh hưởng đến dự đoán của chúng. Chúng tôi cũng xét đến dự đoán tiền đái tháo đường và đái tháo đường chưa được chẩn đoán. Bộ dữ liệu Khảo sát Kiểm tra Sức khỏe và Dinh dưỡng Quốc gia (NHANES) được dùng để huấn luyện và kiểm tra nhiều mô hình cho việc dự đoán các bệnh này. Bài báo này cũng khám phá một mô hình tập hợp có trọng số kết hợp các kết quả của nhiều mô hình học có giám sát để tăng khả năng dự đoán.

## Dữ liệu NHANES

Khảo sát Kiểm tra Sức khỏe và Dinh dưỡng Quốc gia (NHANES) [16] là một chương trình được thiết kế bởi Trung tâm Thống kê Y tế Quốc gia (NCHS), được dùng để đánh giá tình trạng sức khỏe và dinh dưỡng của dân số Hoa Kỳ. Bộ dữ liệu là độc đáo ở khía cạnh nó kết hợp các cuộc phỏng vấn khảo sát với các kiểm tra thể chất và các xét nghiệm được tiến hành tại các địa điểm y tế. Dữ liệu khảo sát gồm các câu hỏi về kinh tế-xã hội, nhân khẩu học, chế độ ăn, và liên quan đến sức khỏe. Các xét nghiệm gồm các phép đo y khoa, nha khoa, thể chất, và sinh lý được tiến hành bởi nhân viên y tế.

Dữ liệu NHANES liên tục được khởi xướng vào năm 1999, và đang tiếp diễn với một mẫu mỗi năm gồm 5000 người tham gia. Việc lấy mẫu sử dụng một mẫu dân sự đại diện cho toàn quốc được xác định qua một thiết kế lấy mẫu xác suất đa giai đoạn. Ngoài các kết quả xét nghiệm của các cá nhân, tỷ lệ hiện mắc các tình trạng mạn tính trong dân số cũng được thu thập. Ví dụ, thông tin về thiếu máu, bệnh tim mạch, đái tháo đường, phơi nhiễm môi trường, các bệnh về mắt, và mất thính lực được thu thập.

NHANES cung cấp dữ liệu sâu sắc đã có những đóng góp quan trọng cho người dân ở Hoa Kỳ. Nó cung cấp cho các nhà nghiên cứu các manh mối quan trọng về các nguyên nhân gây bệnh dựa trên phân bố các vấn đề sức khỏe và các yếu tố nguy cơ trong dân số. Nó cũng cho phép các nhà hoạch định y tế và các cơ quan chính phủ phát hiện và thiết lập các chính sách, lập kế hoạch nghiên cứu, và các chương trình thúc đẩy sức khỏe để cải thiện tình trạng sức khỏe hiện tại và ngăn ngừa các vấn đề sức khỏe tương lai. Ví dụ, dữ liệu của các khảo sát trước được dùng để tạo các biểu đồ tăng trưởng để đánh giá sự tăng trưởng của trẻ em, vốn đã được điều chỉnh và áp dụng trên toàn thế giới như một tiêu chuẩn tham chiếu. Các chương trình giáo dục và phòng ngừa tăng cường nhận thức công chúng, nhấn mạnh chế độ ăn và tập thể dục đã được tăng cường dựa trên chỉ báo về đái tháo đường chưa được chẩn đoán, tỷ lệ hiện mắc thừa cân, tăng huyết áp và các con số về mức cholesterol.

## Các mô hình Học máy

Trong nghiên cứu của chúng tôi, chúng tôi dùng nhiều mô hình học có giám sát để phân loại các bệnh nhân có nguy cơ. Trong học có giám sát, thuật toán học được cung cấp dữ liệu huấn luyện chứa cả các quan sát được ghi nhận và các nhãn tương ứng cho hạng mục của các quan sát. Thuật toán dùng thông tin này để xây dựng một mô hình mà, khi được cung cấp các quan sát mới, có thể dự đoán nhãn đầu ra nào nên được liên kết với mỗi quan sát mới. Trong các đoạn sau, các mô hình được dùng trong dự án này được mô tả ngắn gọn.

- Hồi quy Logistic (Logistic Regression) là một mô hình thống kê tìm các hệ số của mô hình tuyến tính khớp tốt nhất nhằm mô tả mối quan hệ giữa biến đổi logit của một biến phụ thuộc nhị phân, và một hoặc nhiều biến độc lập. Mô hình này là một cách tiếp cận đơn giản đối với dự đoán, cung cấp các điểm độ chính xác cơ sở để so sánh với các mô hình học máy phi tham số khác [17].

- Các mô hình tập hợp (Ensemble) tổng hợp các kết quả của nhiều thuật toán học để có được hiệu năng tốt hơn các thuật toán riêng lẻ. Nếu được dùng đúng cách, chúng giúp giảm phương sai và độ chệch (bias), cũng như cải thiện các dự đoán. Ba mô hình tập hợp được dùng trong nghiên cứu của chúng tôi là rừng ngẫu nhiên, gradient boosting, và một mô hình tập hợp có trọng số.
- Máy vector hỗ trợ (SVM) phân loại dữ liệu bằng cách phân tách các lớp bằng một ranh giới, tức là một đường thẳng hoặc một siêu phẳng đa chiều. Tối ưu hóa đảm bảo rằng sự phân tách ranh giới rộng nhất của các lớp được đạt được. Trong khi SVM thường vượt trội hơn hồi quy logistic, độ phức tạp tính toán của mô hình dẫn đến thời gian huấn luyện dài cho việc phát triển mô hình [18].
- -Bộ phân loại Rừng ngẫu nhiên (RFC) là một mô hình tập hợp phát triển nhiều cây quyết định ngẫu nhiên qua một phương pháp bagging [19]. Mỗi cây là một sơ đồ phân tích mô tả các kết cục khả dĩ. Dự đoán trung bình giữa các cây được tính đến cho phân loại toàn cục. Điều này giảm nhược điểm của phương sai lớn trong các cây quyết định. Các phép tách quyết định được thực hiện dựa trên độ bất thuần và độ lợi thông tin [20].
- -Cây Gradient Boosted (GBT) [21] cũng là một mô hình dự đoán tập hợp dựa trên các cây quyết định. Trái với Rừng ngẫu nhiên, mô hình này xây dựng các cây quyết định liên tiếp bằng cách dùng giảm gradient (gradient descent) nhằm tối thiểu hóa một hàm mất mát. Một dự đoán cuối cùng được thực hiện bằng cách dùng một phép bỏ phiếu đa số có trọng số của tất cả các cây quyết định.
- trees. Chúng tôi xét một cách triển khai của gradient boosting, XGBoost [22], được tối ưu hóa cho tốc độ và hiệu năng.
- -Một Mô hình Tập hợp có Trọng số (WEM) kết hợp các kết quả của tất cả các mô hình nói trên cũng được dùng trong phân tích của chúng tôi. Mô hình cho phép nhiều dự đoán từ các mô hình khác biệt được lấy trung bình với các trọng số dựa trên hiệu năng của từng mô hình riêng lẻ. Trực giác đằng sau mô hình là tập hợp có trọng số có thể hưởng lợi tiềm năng từ các thế mạnh của nhiều mô hình nhằm tạo ra các kết quả chính xác hơn.

Dựa trên nghiên cứu trước đó [12, 13] trong lĩnh vực này, các mô hình Hồi quy logistic và SVM được chọn làm các mô hình cơ sở hiệu năng cho nghiên cứu của chúng tôi. Các mô hình dựa trên RFC, GBT, và WEM được phát triển trong nghiên cứu của chúng tôi nhằm tận dụng các mối quan hệ phi tuyến có thể tồn tại trong dữ liệu cho dự đoán bệnh. Nghiên cứu chọn loại trừ các mạng nơ-ron khỏi phân tích của nó do bản chất 'hộp đen' (không minh bạch) của cách tiếp cận [23].

## Phương pháp

Hình 1 mô tả luồng từ dữ liệu thô qua việc phát triển các mô hình dự đoán, và pipeline đánh giá của chúng hướng tới việc nhận diện các xác suất nguy cơ đái tháo đường hoặc bệnh tim mạch ở các đối tượng. Pipeline gồm ba giai đoạn vận hành riêng biệt: 1) Khai phá dữ liệu và mô hình hóa, 2) Phát triển mô hình, và 3) Đánh giá mô hình.

## Khai phá dữ liệu và Mô hình hóa — Tiền xử lý bộ dữ liệu

Giai đoạn đầu tiên của pipeline liên quan đến các phương pháp và kỹ thuật khai phá dữ liệu để chuyển đổi các hồ sơ bệnh nhân thô sang một định dạng chấp nhận được cho việc huấn luyện và kiểm tra các mô hình học máy. Trong giai đoạn này, dữ liệu thô của bệnh nhân được trích từ cơ sở dữ liệu NHANES để được biểu diễn như các bản ghi trong bước tiền xử lý. Giai đoạn tiền xử lý cũng chuyển đổi bất kỳ giá trị không thể giải mã nào (lỗi về kiểu dữ liệu và định dạng chuẩn) từ cơ sở dữ liệu thành các biểu diễn null.

Các hồ sơ bệnh nhân sau đó được biểu diễn như một khung dữ liệu (data frame) gồm các đặc trưng và một nhãn lớp trong bước trích xuất đặc trưng. Các đặc trưng là một mảng thông tin bệnh nhân được thu thập qua các phương pháp xét nghiệm, nhân khẩu học, và khảo sát. Nhãn lớp là một biến phân loại sẽ được biểu diễn như một phân loại nhị phân của các bệnh nhân: 0 Không-ca, 1 - Ca. Các đặc trưng phân loại được mã hóa bằng các giá trị số để phân tích. Chuẩn hóa được thực hiện trên dữ liệu bằng mô hình tiêu chuẩn hóa sau: x ′ = x -¯ x σ , trong đó x là vector đặc trưng gốc, ¯ x là trung bình của vector đặc trưng đó, và σ là độ lệch chuẩn của nó.

Các nỗ lực trước đây để dự đoán đái tháo đường bằng các mô hình học máy dùng dữ liệu NHANES đã đưa ra một danh sách các biến quan trọng [12, 13]. Trong công trình của Yu và cộng sự [13], các tác giả đã xác định mười bốn biến quan trọng - tiền sử gia đình, tuổi, giới tính, chủng tộc và sắc tộc, cân nặng, chiều cao, vòng eo, BMI, tăng huyết áp, hoạt động thể chất, hút thuốc, sử dụng rượu, học vấn, và thu nhập hộ gia đình, để huấn luyện các mô hình học máy của họ. Việc lựa chọn đặc trưng dựa trên các phương pháp kết hợp SVM với các chiến lược lựa chọn đặc trưng như được mô tả trong Chen và cộng sự [24]. Semerdjian và cộng sự [12] đã chọn cùng các đặc trưng như Yu và cộng sự và thêm hai biến nữa - cholesterol và chiều dài chân. Các đặc trưng dựa trên phân tích được thực hiện bởi Langner và cộng sự [25], nơi họ dùng các thuật toán di truyền và phân loại dựa trên cây để nhận diện các đặc trưng then chốt cho dự đoán đái tháo đường.

Với mục tiêu phát triển một mô hình hướng-dữ-liệu, tất cả các biến khả dĩ được trích từ bộ dữ liệu NHANES thô cho các đặc trưng sơ bộ. Dữ liệu sau đó được kiểm tra về tính liên tục và sự sẵn có của mỗi biến qua các hạng mục và năm cụ thể. Điều này quan trọng vì cấu trúc dữ liệu NHANES nền tảng, nơi mỗi chu kỳ hai năm được tách thành nhiều bộ dữ liệu dựa trên hạng mục của biến. Phân tích cho thấy dữ liệu thiếu là kết quả của dữ liệu được ghi nhận bởi các câu hỏi có điều kiện dựa trên các câu trả lời cho các câu hỏi trước (như tuổi, giới tính, hoặc tình trạng mang thai). Hơn nữa, một số sự gián đoạn của các biến là do việc thu thập dữ liệu không nhất quán bởi NHANES qua các chu kỳ khác nhau. Một số biến đơn giản là được đặt các tên khác nhau trong các chu kỳ khác nhau. Dựa trên phân tích thủ công, việc mã hóa lại một số tên biến đã được thực hiện. Sau khi thực hiện các bước nói trên trên bộ dữ liệu thô, chỉ 189 biến trong số xấp xỉ 3900 biến từ cơ sở dữ liệu NHANES là liên tục qua tất cả các chu kỳ từ 1999 đến 2014. Dữ liệu được phân tích thêm về các giá trị thiếu trong các biến, và bất kỳ biến nào có hơn 50% giá trị thiếu đã bị loại khỏi bộ dữ liệu. Điều này dẫn đến một sự giảm thêm về số biến có sẵn xuống 123 cho chu kỳ 1999-2014.

Đối với bộ dữ liệu đái tháo đường, hai bộ dữ liệu khác nhau được tạo ra dựa trên các chu kỳ sử dụng biến. Điều này được làm nhằm tối đa hóa sự sẵn có của biến qua các khung thời gian khác nhau và nghiên cứu tác động của nó lên các mô hình học máy. Bộ dữ liệu thứ nhất dựa trên khung thời gian gốc 1999-2014 gồm 123 biến, trong khi bộ dữ liệu thứ hai có khung thời gian 2003-2014 với 168 biến.

Đối với bộ dữ liệu CVD, một khung thời gian 2007-2014 được dùng, tối đa hóa số biến có sẵn lên 131. Cụ thể, bộ dữ liệu bao gồm các biến hoạt động thể chất vốn được xem là các yếu tố quan trọng của bệnh tim mạch [26].

Mỗi bộ dữ liệu được phân loại thêm thành bộ dữ liệu xét nghiệm (chứa các kết quả xét nghiệm) so với bộ dữ liệu không xét nghiệm (chỉ dữ liệu khảo sát). Các kết quả xét nghiệm là bất kỳ biến đặc trưng nào trong bộ dữ liệu được thu được qua xét nghiệm máu hoặc nước tiểu. Việc phân loại lại dữ liệu thành các nhóm này cho phép phân tích hiệu năng của các mô hình học máy trong các trường hợp mà kết quả xét nghiệm không có sẵn cho bệnh nhân, điều này tạo thuận lợi cho việc phát hiện các bệnh nhân có nguy cơ chỉ dựa trên một bảng câu hỏi khảo sát.

## Loại trừ đối tượng và Gán nhãn

Trong nghiên cứu của chúng tôi, tất cả các bộ dữ liệu được giới hạn ở các đối tượng không mang thai và người trưởng thành ít nhất hai mươi tuổi. Điều này cho phép chúng tôi tập trung vào dự đoán Đái tháo đường Type II, và loại trừ các loại khác như đái tháo đường thai kỳ, vốn chỉ riêng ở phụ nữ mang thai, và Đái tháo đường Type I, vốn thường phát triển ở trẻ em và thanh thiếu niên. Sự loại trừ này nhất quán với nghiên cứu trước được tiến hành bởi Yu và cộng sự [13] và Semerdjian và cộng sự [12].

Đối với phân loại đái tháo đường, các nhãn được gán cho bộ dữ liệu theo hai sơ đồ khác nhau 1) Đái tháo đường (Diabetic) và 2) Tiền/Chưa chẩn đoán đái tháo đường (Pre/Undiagnosed Diabetic). Điều này tương tự các sơ đồ phân loại được thiết lập bởi Yu và cộng sự [13]. Trong sơ đồ thứ nhất, các đối tượng được xem là mắc đái tháo đường ( label = 1) nếu họ trả lời 'Yes' cho câu hỏi 'Have you ever been told by a doctor that you have diabetes?' hoặc có mức đường huyết lớn hơn hoặc bằng 126 mg/dl, các đối tượng khác được xem là không mắc đái tháo đường ( label = 0). Sơ đồ phân loại kết quả được đặt tên là Case I.

Sơ đồ phân loại thứ hai - Case II - được phát triển để dự đoán các đối tượng có đái tháo đường chưa được chẩn đoán hoặc tiền đái tháo đường. Các đối tượng được gán nhãn đái tháo đường chưa chẩn đoán ( label = 1) nếu họ trả lời 'No' cho câu hỏi 'Have you ever been told by a doctor that you have diabetes?' và có mức đường huyết lớn hơn hoặc bằng 126 mg/dl. Các đối tượng được gán nhãn tiền đái tháo đường ( label = 1) nếu mức đường huyết của họ ở giữa 100 và 125 mg/dl. Các đối tượng đái tháo đường đã được chẩn đoán bị loại trừ khỏi Case II, và tất cả các đối tượng khác được xem là không-ca ( label = 0). Các đối tượng có giá trị thiếu cho phân loại đái tháo đường bị loại trừ khỏi dữ liệu cho cả hai trường hợp.

Đối với phân loại CVD, các đối tượng được gán nhãn là mắc bệnh ( label = 1) nếu họ trả lời 'Yes' cho các triệu chứng/tình trạng tim mạch được biểu diễn bởi câu hỏi: 'Have you ever been told by a doctor that you had congestive heart failure, coronary heart disease, a heart attack, or a stroke?' Nếu đối tượng trả lời 'No' cho cả bốn tình trạng, thì đối tượng được gán nhãn là không mắc bệnh ( label = 0). Lưu ý rằng các tình trạng này là các chỉ báo phổ biến của bệnh tim mạch [27].

Bảng 1 tóm tắt các tiêu chí phân loại đái tháo đường, và việc gán nhãn tương ứng cho mỗi trường hợp được trình bày trong Bảng 2. Các phân loại và gán nhãn cho CVD được tóm tắt trong Bảng 3. Các sơ đồ phân loại được áp dụng cho ba khung thời gian được mô tả trước đó trong Mục 4. Điều này dẫn đến năm bộ dữ liệu riêng biệt cho phân loại: bốn cho phân loại đái tháo đường, và một cho phân loại CVD. Khung thời gian, số biến, số quan sát, và số ca ( label = 1) và không-ca ( label = 0) cho mỗi bộ dữ liệu đều được tóm tắt trong Bảng 4.

## Phát triển mô hình

Các bộ dữ liệu thu được từ giai đoạn Khai phá dữ liệu và Mô hình hóa nói trên (Mục 4) đều được tách thành các bộ dữ liệu huấn luyện và kiểm tra. Lấy mẫu giảm (Downsampling) được dùng để tạo ra một phép tách huấn luyện/kiểm tra cân bằng 80/20. Trong giai đoạn huấn luyện của việc phát triển mô hình, bộ dữ liệu huấn luyện được dùng để tạo ra các mô hình đã học cho dự đoán. Trong giai đoạn kiểm định, các mô hình được kiểm tra với các đặc trưng của bộ dữ liệu kiểm tra để đánh giá chúng về việc chúng dự đoán tốt như thế nào các nhãn lớp tương ứng của bộ dữ liệu kiểm tra. Đối với mỗi mô hình, một cách tiếp cận tìm kiếm lưới (grid-search) với đánh giá hiệu năng song song hóa để tinh chỉnh tham số mô hình được dùng để tạo ra các tham số mô hình tốt nhất. Tiếp theo, mỗi mô hình trải qua một kiểm định chéo 10-fold (10 lần gấp huấn luyện và kiểm tra với phép tách dữ liệu ngẫu nhiên hóa)

Bảng 1 Các tiêu chí phân loại đái tháo đường

| Tiêu chí                                                                                                            | Phân loại            |
|---------------------------------------------------------------------------------------------------------------------|----------------------|
| Answered 'yes' to 'Have you been told by a doctor that you have dia- betes' γ or had a Plasma Glucose ≥ 126 mg/dl δ | Diabetic             |
| Answered 'no', but had a Plasma Glucose ≥ 126 mg/dl                                                                 | Undiagnosed diabetic |
| Had a Plasma Glucose between 100 - 125 mg/dl                                                                        | Prediabetic          |
| Had a Plasma Glucose ≤ 100 mg/dl                                                                                    | Not diabetic         |

Bảng 2 Gán nhãn cho Case I và Case II

| Phân loại            |   Case I | Case II   |
|----------------------|----------|-----------|
| Diabetic             |        1 | Excluded  |
| Undiagnosed diabetic |        1 | 1         |
| Prediabetic          |        0 | 1         |
| Not diabetic         |        0 | 0         |

Case I - Các bản ghi chứa bệnh nhân đái tháo đường, tiền/chưa chẩn đoán và không đái tháo đường. Case II - Các bản ghi chỉ chứa bệnh nhân tiền/chưa chẩn đoán và không đái tháo đường. 1 Bản ghi dương tính cho trường hợp; 0 - Bản ghi âm tính cho trường hợp (bệnh nhân không đái tháo đường)

nhằm có được một phép đo chính xác về hiệu năng mô hình.

## Mô hình Tập hợp có Trọng số

Đối với mỗi mô hình riêng lẻ, các giá trị xác suất mắc bệnh được ghi nhận cho mỗi đối tượng bằng một kiểm định chéo 10-fold. Sau đó một xác suất mới được tạo ra cho mỗi đối tượng từ trung bình có trọng số của các xác suất từ các mô hình riêng lẻ. Đây là mô hình tập hợp có trọng số dùng một trung bình có trọng số của các kết quả mô hình riêng lẻ. Các trọng số dựa trên hiệu năng của mỗi mô hình theo điểm AUC của nó. Giả sử chúng ta gán nhãn bốn mô hình (hồi quy logistic, SVM, rừng ngẫu nhiên, và gradient boosting) lần lượt là các mô hình 1,2,3, và 4. Trọng số cho mô hình riêng lẻ thứ i được xác định bởi

<!-- formula-not-decoded -->

Xác suất mới cho mỗi đối tượng sau đó được tính là

<!-- formula-not-decoded -->

Mỗi đối tượng sau đó được phân loại dựa trên xác suất có trọng số mới.

Bảng 3 Các tiêu chí phân loại bệnh tim mạch và Gán nhãn

| Tiêu chí                                                                                                                        | Phân loại                 |   Gán nhãn |
|---------------------------------------------------------------------------------------------------------------------------------|---------------------------|--------------------|
| Answered 'yes' to having had one of the following γ : congestive heart failure, coronary heart disease, heart attack, or stroke | Having heart diseases     |                  1 |
| If they answered 'no' to all condi- tions                                                                                       | Not having heart diseases |                  0 |

Bảng 4 Cấu trúc của các bộ dữ liệu được dùng cho phân loại đái tháo đường và tim mạch

| Năm       | Case    |   Số quan sát |   Số biến |   Số lượng 0 |   Số lượng 1 |
|-----------|---------|----------------|-------------|-------------|-------------|
| 1999-2014 | Case I  |         21,131 |         123 |      15,599 |       5,532 |
| 1999-2014 | Case II |         16,426 |         123 |       9,944 |       6,482 |
| 2003-2014 | Case I  |         16,443 |         168 |      11,977 |       4,466 |
| 2003-2014 | Case II |         12,636 |         168 |       7,503 |       5,133 |
| 2007-2014 | Cardio  |          8,459 |         131 |       7,012 |       1,447 |

Các bộ dữ liệu Case I và II là cho phân loại đái tháo đường, bộ dữ liệu Cardio là cho phân loại CVD. 1 - Các bản ghi dương tính cho bệnh; 0 - Các bản ghi âm tính cho bệnh

## Lựa chọn đặc trưng

Với mục tiêu tạo ra một mô hình chính xác dựa vào một tập giới hạn các đặc trưng có sẵn, tức là các đặc trưng không đòi hỏi việc hỏi hoặc xét nghiệm quá mức ở bệnh nhân, chúng tôi đã đánh giá sự phụ thuộc đặc trưng của các mô hình cho dự đoán đái tháo đường và CVD. Phân tích được thực hiện dựa trên bộ phân loại tập hợp XGBoost (dựa trên hiệu năng mô hình), nơi một thước đo tỷ lệ lỗi được dùng để xếp hạng các đặc trưng. Cụ thể hơn, trong các mô hình XGBoost, các điểm tầm quan trọng đặc trưng được tính cho mỗi cây quyết định bằng việc điểm tách (split-point) cho mỗi đặc trưng cải thiện tỷ lệ lỗi phân loại nhị phân bao nhiêu - được trọng số hóa bởi số quan sát mà điểm tách đó chịu trách nhiệm. Tỷ lệ lỗi được tính là số quan sát bị phân loại sai trên tổng số quan sát. Cuối cùng, các điểm tầm quan trọng được lấy trung bình trên tất cả các cây trong mô hình để tạo ra một điểm tầm quan trọng cuối cùng cho mỗi đặc trưng [28].

24 đặc trưng quan trọng nhất hàng đầu được xác định trong mỗi bộ dữ liệu. Ngưỡng cắt 24 đặc trưng dựa trên kiểm định chéo của các mô hình, nơi thấp hơn 24 đặc trưng dẫn đến sự sụt giảm đáng kể về hiệu năng mô hình ( > 2% sụt giảm điểm AU-ROC). 24 đặc trưng sau đó được dùng để kiểm tra các mô hình khác, nơi không có sự sụt giảm đáng kể nào về hiệu năng được ghi nhận.

## Các thước đo hiệu năng

Trong giai đoạn cuối của pipeline được minh họa trong Hình 1, các điểm của các mô hình được so sánh để đánh giá hiệu năng của chúng trong việc dự đoán các ca. Đánh giá mô hình nhị phân (ca so với không-ca) dựa trên các thống kê hiệu năng theo độ nhạy ( TP TP + FP ) và độ đặc hiệu ( TN TN + FN ) trong đó TP , FP , TN , và FN lần lượt biểu diễn số dương tính thật, dương tính giả, âm tính thật, và âm tính giả. Một dương tính giả sẽ là một quan sát được dự đoán là một ca, nhưng thực ra không phải là một ca. Một âm tính giả có thể được định nghĩa tương tự. Diện tích dưới đường cong (AUC) và đặc trưng hoạt động của bộ thu nhận (ROC) được dùng để hiểu mối quan hệ giữa hai biến hiệu năng. Các điểm F1 cũng được dùng để đo độ chính xác của một mô hình; F 1 =

2 precision ∗ recall precision + recall trong đó precision = TP TP + FP và recall = TP TP + FN . Nói cách khác, điểm F1 [29] là trung bình điều hòa của precision và recall cho phép so sánh hiệu năng của các mô hình khác nhau trong việc nhận diện các dự đoán bệnh thật so với các dương tính giả.

## Kết quả

Bảng 5 mô tả các điểm độ chính xác so sánh của các mô hình khác nhau cho dự đoán đái tháo đường qua các 1) trường hợp khác nhau (Case I và II), 2) các khung thời gian, và 3) loại biến đặc trưng (dữ liệu có xét nghiệm hoặc chỉ các biến khảo sát). Như được mô tả trong Mục 4 (và được trình bày trong Bảng 4), mỗi bộ dữ liệu có số quan sát khác nhau và các biến được dùng cho các mô hình học máy.

Trong khung thời gian 1999-2014 cho dự đoán đái tháo đường Case I (dữ liệu loại trừ kết quả xét nghiệm), mô hình dựa trên GBT là XGBoost (eXtreme Gradient Boosting) hoạt động tốt nhất trong số tất cả các bộ phân loại với một Diện tích Dưới - Đường cong Đặc trưng Hoạt động của Bộ thu nhận (AU-ROC) là 86.2%. Các điểm Precision, recall, và F1 ở mức 0.78 cho tất cả các thước đo khi dùng kiểm định chéo 10-fold của mô hình. Mô hình hoạt động kém nhất trong lớp là mô hình tuyến tính Hồi quy Logistic với AU-ROC là 82.7%. Mô hình SVM tuyến tính gần với các mô hình dựa trên tập hợp về hiệu năng với AU-ROC ở 84.9%. Việc bao gồm các kết quả xét nghiệm trong Case I đã tăng sức mạnh dự đoán của các mô hình với một biên độ lớn, với XGBoost đạt điểm AU-ROC là 95.7%. Các điểm precision, recall, và F1 cũng được ghi nhận ở 0.89 cho mô hình.

Trong dự đoán các bệnh nhân tiền đái tháo đường và đái tháo đường chưa được chẩn đoán - Case II (với khung thời gian 19992014), Mô hình Tập hợp có Trọng số (WEM) được phát triển có điểm hiệu năng AU-ROC hàng đầu là 73.7%. Precision, recall, và F1-score được ghi nhận ở 0.68. Mô hình WEM được theo sát bởi các mô hình khác là Hồi quy Logistic, SVM, RFC (Bộ phân loại Rừng ngẫu nhiên), và XGBoost mỗi mô hình báo cáo một độ chính xác 73.1 -73.4% với kiểm định chéo 10-fold. Các điểm precision, recall, và F1-score tương tự nhau qua các mô hình. Phân tích hiệu năng Case II với các biến xét nghiệm cũng dẫn đến một sự tăng hiệu năng lớn lên điểm AU-ROC là 80.2% trong khung thời gian 1999-2014 và 83.4% trong khung thời gian 2003-2014, đạt được bởi XGBoost trong cả hai trường hợp.

Trực quan hóa hiệu năng mô hình với các đặc trưng hoạt động của bộ thu nhận (ROC), Hình 2 và 3 cho thấy sự so sánh sức mạnh dự đoán nhị phân ở các ngưỡng khác nhau (tỷ lệ dương tính giả - FPR). Các đường cong mô hình hóa độ nhạy - tỷ lệ bệnh nhân đái tháo đường thực sự được nhận diện đúng là như vậy, so với FPR hoặc 1 - độ đặc hiệu, trong đó độ đặc hiệu - tỷ lệ bệnh nhân không đái tháo đường

Bảng 5 Kết quả dùng kiểm định chéo 10-fold cho phân loại đái tháo đường

| Lab      | Năm & Case    | Mô hình       |   AUC |   Độ chuẩn xác |   Độ nhạy |   F 1 |
|----------|---------------|---------------|-------|-------------|----------|-------|
| No lab   |               | Logistic Reg. | 0.827 |        0.75 |     0.75 |  0.75 |
|          | 1999-2014     | SVM           | 0.849 |        0.77 |     0.77 |  0.77 |
|          | Diab. Case I  | Random Forest | 0.855 |        0.78 |     0.78 |  0.78 |
|          |               | XGBoost       | 0.862 |        0.78 |     0.78 |  0.78 |
|          |               | Ensemble      | 0.859 |        0.78 |     0.78 |  0.78 |
|          |               | Logistic Reg. | 0.732 |        0.67 |     0.67 |  0.67 |
|          | 1999-2014     | SVM           | 0.734 |        0.68 |     0.68 |  0.68 |
|          | Diab. Case II | Random Forest | 0.731 |        0.67 |     0.67 |  0.67 |
|          |               | XGBoost       | 0.734 |        0.67 |     0.67 |  0.67 |
|          |               | Ensembl e     | 0.737 |        0.68 |     0.68 |  0.68 |
|          |               | Logistic Reg. | 0.800 |        0.72 |     0.72 |  0.72 |
|          | 2003-2014     | SVM           | 0.822 |        0.75 |     0.75 |  0.75 |
|          | Diab. Case I  | RandomForest  | 0.841 |        0.77 |     0.76 |  0.76 |
|          |               | XGBoost       | 0.837 |        0.75 |     0.75 |  0.75 |
|          |               | Ensemble      | 0.834 |        0.75 |     0.75 |  0.75 |
|          |               | Logistic Reg. | 0.718 |        0.66 |     0.66 |  0.66 |
|          | 2003-2014     | SVM           | 0.716 |        0.66 |     0.66 |  0.66 |
|          | Diab. Case II | Random Forest | 0.719 |        0.67 |     0.67 |  0.66 |
|          |               | XGBoost       | 0.725 |        0.67 |     0.67 |  0.67 |
|          |               | Ensemble      | 0.725 |        0.66 |     0.66 |  0.66 |
| With lab |               | Logistic Reg. | 0.866 |        0.79 |     0.79 |  0.79 |
|          | 1999-2014     | SVM           | 0.887 |        0.81 |     0.81 |  0.81 |
|          | Diab. Case I  | Random Forest | 0.937 |        0.86 |     0.86 |  0.86 |
|          |               | XGBoost       | 0.957 |        0.89 |     0.89 |  0.89 |
|          |               | Ensemble      | 0.944 |        0.87 |     0.87 |  0.87 |
|          |               | Logistic Reg. | 0.724 |        0.67 |     0.67 |  0.67 |
|          | 1999-2014     | SVM           | 0.737 |        0.68 |     0.68 |  0.68 |
|          | Diab. Case II | Random Forest | 0.738 |        0.68 |     0.68 |  0.68 |
|          |               | XGBoost       | 0.802 |        0.74 |     0.74 |  0.74 |
|          |               | Ensemble      | 0.783 |        0.71 |     0.71 |  0.71 |
|          |               | Logistic Reg. | 0.877 |        0.80 |     0.80 |  0.80 |
|          | 2003-2014     | SVM           | 0.882 |        0.81 |     0.80 |  0.80 |
|          | Diab. Case I  | Random Forest | 0.939 |        0.86 |     0.86 |  0.86 |
|          |               | XGBoost       | 0.962 |        0.89 |     0.89 |  0.89 |
|          |               | Ensemble      | 0.948 |        0.88 |     0.88 |  0.88 |
|          |               | Logistic Reg. | 0.738 |        0.68 |     0.68 |  0.68 |
|          | 2003-2014     | SVM           | 0.737 |        0.68 |     0.68 |  0.68 |
|          | Diab. Case II | Random Forest | 0.740 |        0.68 |     0.68 |  0.67 |
|          |               | XGBoost       | 0.834 |        0.75 |     0.75 |  0.75 |
|          |               | Ensemble      | 0.798 |        0.72 |     0.72 |  0.72 |

AUC - Diện tích Dưới Đường cong, Precision = TP TP + FP , Recall = TP TP + FN (trong đó TP - Dương tính Thật, FP - Dương tính Giả, FN - Âm tính Giả), và F1 (score) = 2 precision ∗ recall precision + recall . Phông chữ in đậm biểu thị kết quả mô hình hoạt động tốt nhất

được nhận diện đúng là như vậy trong các mô hình. Phân tích các mô hình trong Case I được trình bày trong Hình 2, và đối với Case II, Hình 3 so sánh hiệu năng của các mô hình khác nhau.

Sử dụng các điểm tầm quan trọng đặc trưng cho mô hình XGBoost, Hình 4 và 5 cho thấy tầm quan trọng so sánh của 24 biến/đặc trưng trong các bộ dữ liệu dựa trên không-xét-nghiệm và dựa trên xét nghiệm cho phát hiện đái tháo đường tương ứng. Các kết quả dựa trên tỷ lệ lỗi trung bình thu được bởi số phân loại sai của các quan sát được tính trên tất cả các cây tuần tự trong một bộ phân loại XGBoost. Ngưỡng cắt 24 đặc trưng thu được bằng cách phát triển các mô hình cho mỗi tập kết hợp đặc trưng (sắp xếp theo tầm quan trọng), và dùng một ngưỡng cắt ≤ 2% sụt giảm điểm AU-ROC kiểm định chéo. Các điểm tầm quan trọng cũng được lấy trung bình cho các mô hình đái tháo đường (Case I) và tiền đái tháo đường/chưa chẩn đoán (Case II).

Hình 2 Các đường cong ROC từ các mô hình Đái tháo đường Case I 1999-2014. Đồ thị này cho thấy các đường cong ROC được tạo ra từ các mô hình khác nhau áp dụng cho các bộ dữ liệu Đái tháo đường Case I 1999-2014 không xét nghiệm

Hướng tới phân loại CVD, Bảng 6 so sánh các thước đo hiệu năng của các mô hình khác nhau. Trong các kết quả, WEM hoạt động tốt nhất với một điểm AU-ROC là 83.1% cho dữ liệu không-xét-nghiệm. Precision, recall, và F1-score của mô hình khá nhất quán ở 0.75. Việc bao gồm các biến dựa trên xét nghiệm không cho thấy bất kỳ sự tăng đáng kể nào về hiệu năng, với một điểm AU-ROC quan sát được là 83.9% đạt được bởi bộ phân loại WEM hoạt động hàng đầu. Các thước đo hiệu năng (Hình 6) của các mô hình khác nhau - Hồi quy Logistic, SVM, Rừng ngẫu nhiên, và WEM, cho thấy các điểm độ chính xác tương tự được ghi nhận bởi tất cả các mô hình (trong vòng 2% điểm AU-ROC). Các kết quả tương tự được thấy trong các đường cong ROC cho mỗi mô hình như được trình bày trong Hình 6. Trong khi đường cong ROC cho thấy các mô hình dựa trên cây - Rừng ngẫu nhiên và XGBoost (cùng với WEM)

Hình 3 Các đường cong ROC từ các mô hình Đái tháo đường Case II 1999-2014. Đồ thị này cho thấy các đường cong ROC được tạo ra từ các mô hình khác nhau áp dụng cho các bộ dữ liệu Đái tháo đường Case II 1999-2014 không xét nghiệm

Hình 4 Các đường cong ROC từ các mô hình tim mạch. Đồ thị này cho thấy các đường cong ROC được tạo ra từ các mô hình khác nhau áp dụng cho các bộ dữ liệu bệnh tim mạch 1999-2007 không xét nghiệm

hoạt động tốt hơn các mô hình khác, sự khác biệt là tối thiểu.

Hình 7 và 8, làm nổi bật các biến/đặc trưng quan trọng nhất được quan sát bởi các mô hình được huấn luyện trên các bộ dữ liệu không-xét-nghiệm và xét nghiệm tương ứng. Vì XGBoost là mô hình hoạt động hàng đầu trong hạng mục, độ lợi thông tin (dựa trên tỷ lệ lỗi) được dùng để so sánh các giá trị giữa các biến trong mô hình. Dùng cách tiếp cận tương tự với phân tích đái tháo đường, tầm quan trọng đặc trưng trung bình được đo với một ngưỡng cắt ở 24 biến.

## Bàn luận

## Dự đoán Đái tháo đường

Các mô hình được huấn luyện trên các bệnh nhân đái tháo đường (Case I) nhìn chung có được một sức mạnh dự đoán cao hơn (86.2%) khi so với các mô hình Case II vốn có độ chính xác cao nhất ghi nhận là 73.7%. Sự sụt giảm hiệu năng phát hiện so với Case I chủ yếu là do hai yếu tố - Lab - Kết quả xét nghiệm, AUC - Diện tích Dưới Đường cong, Precision = TP TP + FP , Recall = TP TP + FN (trong đó TP - Dương tính Thật, FP - Dương tính Giả, FN - Âm tính Giả), và F1 (score) = 2 precision ∗ recall precision + recall . Phông chữ in đậm biểu thị kết quả mô hình hoạt động tốt nhất

Hình 5 Tầm quan trọng đặc trưng trung bình cho các bộ phân loại đái tháo đường không có kết quả xét nghiệm. Đồ thị này cho thấy các đặc trưng quan trọng nhất không bao gồm kết quả xét nghiệm để dự đoán đái tháo đường

Bảng 6 Kết quả dùng kiểm định chéo 10-fold cho phân loại bệnh tim mạch

| Lab      | Năm       | Mô hình       |   AUC |   Độ chuẩn xác |   Độ nhạy |   F 1 |
|----------|-----------|---------------|-------|-------------|----------|-------|
| No lab   |           | Logistic Reg. | 0.822 |        0.74 |     0.74 |  0.74 |
|          | 2007-2014 | SVM           | 0.816 |        0.74 |     0.74 |  0.74 |
|          |           | Random Forest | 0.829 |        0.75 |     0.74 |  0.74 |
|          |           | XGBoost       | 0.830 |        0.74 |     0.74 |  0.74 |
|          |           | Ensemble      | 0.831 |        0.75 |     0.75 |  0.75 |
| With lab |           | Logistic Reg. | 0.827 |        0.75 |     0.75 |  0.75 |
|          | 2007-2014 | SVM           | 0.825 |        0.75 |     0.75 |  0.75 |
|          |           | Random Forest | 0.836 |        0.76 |     0.76 |  0.76 |
|          |           | XGBoost       | 0.838 |        0.76 |     0.76 |  0.76 |
|          |           | Ensemble      | 0.839 |        0.76 |     0.76 |  0.76 |

1) số quan sát nhỏ hơn, và 2) các điều kiện biên cho các quan sát được ghi nhận. Case II chỉ có 16,426 quan sát có sẵn so với 21,091 quan sát có sẵn trong Case I. Mô hình cũng gặp khó khăn trong việc phân biệt các ca rìa của bệnh nhân, tức là các bệnh nhân ở ranh giới giữa đái tháo đường và bình thường. Độ chính xác cũng giảm nhẹ (AU-ROC ở 72.5% cho XGBoost) đối với khung thời gian 2003-2014, nơi thậm chí có số quan sát có sẵn thấp hơn cho một số lượng biến lớn hơn. Tính nhất quán của các giá trị precision, recall, và F1 gợi ý các mô hình ổn định với sức mạnh dự đoán tương tự cho các bệnh nhân đái tháo đường ( label = 1) và không đái tháo đường (bình thường label = 0).

Các mô hình WEM và XGBoost được phát triển trong nghiên cứu vượt qua nghiên cứu trước được thực hiện bởi Yu và cộng sự [13] nơi họ thu được 83.5% (Case I) và 73.2% (Case II) khi dùng các mô hình SVM phi tuyến. Trong khi số quan sát và các biến đặc trưng bổ sung đóng một phần then chốt trong độ chính xác tăng của các mô hình của chúng tôi, mô hình dựa trên tập hợp nhất quán vượt trội hơn SVM trong nghiên cứu đái tháo đường (đặc biệt cho Case I). So sánh các khung thời gian trong dữ liệu của chúng tôi, chúng tôi quan sát thấy đối với cửa sổ 2003-2014 mô hình hoạt động tốt nhất (RFC) có một điểm AU-ROC thấp hơn ở 84.1% cho Case I. Trong khi khung thời gian có một tập đặc trưng lớn hơn (168 so với 123), sự sụt giảm về số quan sát (16,443 so với 21,091) dẫn đến sự giảm độ chính xác đi 2% khi so với 1999-2014. Các kết quả tương tự cũng được quan sát trong Case II nơi AU-ROC giảm 1.2% do kết quả của sự giảm số lượng từ 16,446 (trong 1999-2014) xuống 12,636 (trong 2003-2014).

Việc bao gồm các kết quả xét nghiệm trong Case I (khung thời gian 1999-2014) dẫn đến sự tăng đáng kể các khả năng dự đoán (điểm AU-ROC của XGBoost - 95.7%). Trái với các quan sát trước, trong khung thời gian 2003-2014, độ chính xác tăng lên 96.2% với XGBoost hoạt động tốt nhất. Điều này gợi ý sự sẵn có của các biến xét nghiệm then chốt trong khung thời gian 2003-2014, dẫn đến độ chính xác tăng. Phân tích hiệu năng Case II với các biến xét nghiệm cũng dẫn đến một sự tăng hiệu năng lớn lên điểm AU-ROC là 80.2% trong khung thời gian 1999-2014 và 83.4% trong khung thời gian 2003-2014. Các mô hình XGBoost hoạt động tốt nhất trong các kết quả xét nghiệm trong mỗi trường hợp, được theo sát bởi mô hình WEM.

Các thước đo hiệu năng mô hình cho Case I cho thấy các mô hình tập hợp dựa trên cây - Rừng ngẫu nhiên và XGBoost cùng với mô hình WEM liên tục vượt trội hơn các mô hình tuyến tính như Hồi quy Logistic và Máy vector hỗ trợ. Điều này được làm nổi bật thêm trong các đường cong ROC trong Hình 2. Trong Case II, sự phân biệt ít rõ ràng hơn với hiệu năng tương tự được ghi nhận từ tất cả các mô hình như được trình bày trong Hình 3. Trong trường hợp như vậy, các mô hình ít đòi hỏi tính toán như Hồi quy Logistic có thể được dùng để đạt được hiệu năng phân loại tương tự khi so với các mô hình phức tạp khác như SVM hoặc các bộ phân loại tập hợp.

Phân tích các biến đặc trưng trong các mô hình dựa trên không-xét-nghiệm (trong dữ liệu đái tháo đường) cho thấy các đặc trưng như vòng eo, tuổi, cân nặng (tự báo cáo và thực tế), chiều dài chân, huyết áp, BMI, thu nhập hộ gia đình, v.v. góp phần đáng kể vào dự đoán của mô hình. Điều này tương tự các quan sát và các biến được dùng trong nghiên cứu trước [12, 13]. Tuy nhiên, trong nghiên cứu của chúng tôi, chúng tôi quan sát thấy một số biến chế độ ăn như lượng natri, carbohydrate, chất xơ, và canxi nạp vào góp phần lớn vào phát hiện đái tháo đường trong các mô hình của chúng tôi. Tiêu thụ caffeine và rượu, cùng với người thân mắc đái tháo đường, sắc tộc, tình trạng sức khỏe được báo cáo, và cholesterol cao cũng đóng vai trò then chốt. Trong dữ liệu dựa trên xét nghiệm, các phép đo tầm quan trọng đặc trưng gợi ý độ thẩm thấu máu (blood osmolality), hàm lượng nitơ urê máu, triglyceride, và LDL cholesterol là các yếu tố then chốt trong phát hiện đái tháo đường. Mỗi biến này đã được cho thấy trong nghiên cứu trước [30-33] là các yếu tố đóng góp hoặc các dấu hiệu nhận diện then chốt ở bệnh nhân đái tháo đường. Tuổi, vòng eo, chiều dài chân, cân nặng, và lượng natri nạp vào hoạt động như các biến quan trọng chung cho dự đoán giữa dữ liệu xét nghiệm và khảo sát.

Nghiên cứu trước trong lĩnh vực dự đoán đái tháo đường đã báo cáo các kết quả với mức độ chính xác cao. Sử dụng một cách tiếp cận dựa trên mạng nơ-ron để dự đoán đái tháo đường trong bộ dữ liệu Pima Indian, Ayon và cộng sự [34] quan sát thấy một F1-score tổng thể là 0.99. Phân tích dựa trên dữ liệu chỉ được thu thập từ nữ giới gốc Pima Indian, và chứa đường huyết tương và insulin huyết thanh (vốn là các chỉ báo then chốt của đái tháo đường) làm các đặc trưng cho dự đoán. So sánh, cách tiếp cận của chúng tôi là một mô hình tổng quát hơn nơi nhân khẩu của các bệnh nhân không bị giới hạn và không chứa mức đường huyết tương và insulin huyết thanh (ngay cả trong các mô hình dựa trên xét nghiệm của chúng tôi). Trong [35] các tác giả so sánh J48, AdaboostM1, SMO, Bayes Net, và Naïve Bayes, để nhận diện đái tháo đường dựa trên các đặc trưng không xâm lấn. Nghiên cứu báo cáo một điểm F1 là 0.95, và xác định tuổi là đặc trưng liên quan nhất trong việc dự đoán đái tháo đường, cùng với tiền sử đái tháo đường, căng thẳng công việc, BMI, sở thích đồ ăn mặn, hoạt động thể chất, tăng huyết áp, giới tính, và tiền sử bệnh tim mạch hoặc đột quỵ. Trong khi tuổi, BMI, lượng muối nạp vào, và giới tính, cũng được xác định trong nghiên cứu của chúng tôi là các biến thích đáng, bộ dữ liệu NHANES không chứa

(hoặc có tỷ lệ phần trăm giá trị thiếu cao) các đặc trưng về căng thẳng, tiền sử bệnh tim mạch, và hoạt động thể chất. Kết quả là độ chính xác tổng thể của hai nghiên cứu không thể được so sánh trực tiếp. Heydari và cộng sự [36] cũng so sánh SVM, mạng nơ-ron nhân tạo (ANN), cây quyết định, lân cận gần nhất (nearest neighbors), và các mạng Bayes, với ANN báo cáo độ chính xác cao nhất là 98%. Tuy nhiên, nghiên cứu đã tiền sàng lọc đái tháo đường type 2 và đã có thể thu thập các đặc trưng về tiền sử gia đình mắc đái tháo đường, và các lần xuất hiện trước đó của đái tháo đường, đái tháo đường thai kỳ, huyết áp cao, dùng thuốc cho huyết áp cao, mang thai và sảy thai. Trong cách tiếp cận của chúng tôi, chúng tôi xét cả các bệnh nhân tiền đái tháo đường và đái tháo đường. Do đó, các kết quả của bài báo này nên chính xác hơn khi áp dụng cho một quần thể đa dạng chưa được sàng lọc cho bất kỳ tình trạng có sẵn nào.

## Dự đoán Tim mạch (CVD)

Hiệu năng mô hình hướng tới phát hiện các bệnh nhân có nguy cơ mắc bệnh tim mạch khá nhất quán qua tất cả các mô hình (khác biệt AU-ROC là 1%, Hình 6). Trong khi WEM hoạt động tốt nhất (AU-ROC 83.9%), các mô hình đơn giản khác như hồi quy logistic có thể cung cấp các kết quả tương tự. Điều này một phần do sự thiếu số lượng lớn quan sát trong dữ liệu, với tổng số mẫu ở 8,459, và cũng do kết quả của một mức độ cao dữ liệu mất cân bằng với các mẫu âm tính (nhãn 0) so với dương tính (nhãn 1) lần lượt ở 7,012 và 1,447. Tính áp dụng được của các mô hình dựa trên tập hợp (WEM, RFC, và XGBoost) có thể được khám phá thêm trong các tình huống mà lượng lớn quan sát huấn luyện có sẵn, nhưng trong các trường hợp với số quan sát giới hạn, các mô hình đơn giản về tính toán như Hồi quy Logistic có thể được dùng.

Các mô hình được phát triển dựa trên các biến dựa trên xét nghiệm không cho thấy bất kỳ sự tăng hiệu năng đáng kể nào với một sự tăng chỉ 0.7%. Điều này gợi ý một mô hình dự đoán chỉ dựa trên dữ liệu khảo sát có thể cung cấp một cách tiếp cận tự động chính xác hướng tới phát hiện các bệnh nhân tim mạch. Phân tích các đặc trưng có trong dữ liệu không-xét-nghiệm, các đặc trưng quan trọng nhất gồm tuổi, huyết áp tâm trương và tâm thu, cân nặng lớn nhất tự báo cáo, đau ngực, tiêu thụ rượu, và tiền sử gia đình đau tim cùng các yếu tố khác. Các trường hợp đau ngực, tiêu thụ rượu, và tiền sử gia đình về các vấn đề tim mạch đã được xác định trong nghiên cứu trước [37-39] là các yếu tố nguy cơ cao cho bệnh tim. Như được trình bày trong nghiên cứu được tiến hành bởi Lloyd-Jones và cộng sự [40], tuổi của bệnh nhân là một biến nguy cơ then chốt ở bệnh nhân cũng được xác định bởi các mô hình của chúng tôi. Một số lượng lớn các biến tầm quan trọng đặc trưng là chung qua các bệnh nhân đái tháo đường và tim mạch, như các đặc tính thể chất, lượng nạp vào chế độ ăn, và các đặc tính nhân khẩu học. Các yếu tố tương tự (ngoài các biến chế độ ăn) được xác định bởi nghiên cứu được tiến hành bởi Stamler và cộng sự

[41], nơi họ xác định đái tháo đường, tầng tuổi, và nền tảng sắc tộc là các yếu tố đóng góp then chốt cho bệnh tim mạch.

Phân tích dữ liệu dựa trên xét nghiệm gợi ý các đặc trưng như tuổi, LDL và HDL cholesterol, đau ngực, huyết áp tâm trương và tâm thu, cân nặng lớn nhất tự báo cáo, lượng calo nạp vào, và tiền sử gia đình về các vấn đề tim mạch là các biến quan trọng. LDL và HDL cholesterol đã được cho thấy là các yếu tố nguy cơ cao của các bệnh tim mạch trong nghiên cứu trước [42, 43]. Số lượng bạch cầu trung tính phân đoạn (segmented neutrophils), bạch cầu đơn nhân (monocyte), tế bào lympho (lymphocyte) và bạch cầu ái toan (eosinophils) được ghi nhận trong các biến xét nghiệm cũng có tầm quan trọng trong mô hình phân loại này. Tương tự các kết quả không-xét-nghiệm, các biến chế độ ăn như lượng calo, carbohydrate, và canxi nạp vào tái xuất hiện trong danh sách các đặc trưng quan trọng.

## Kết luận

Nghiên cứu của chúng tôi tiến hành một tìm kiếm vét cạn trên dữ liệu NHANES để phát triển một phân tích so sánh các mô hình học máy về hiệu năng của chúng hướng tới phát hiện các bệnh nhân có tình trạng tim mạch và đái tháo đường. So với cách tiếp cận phát hiện đái tháo đường dựa trên Máy vector hỗ trợ bởi Yu và cộng sự [13], các mô hình được phát triển (dựa trên các biến không-xét-nghiệm) trong nghiên cứu của chúng tôi cho thấy một sự tăng nhỏ về độ chính xác (3% trong Case I và 0.4% trong Case II) đạt được bởi các mô hình tập hợp - XGBoost và Mô hình Tập hợp có Trọng số (WEM). Việc bao gồm các biến dựa trên xét nghiệm tăng độ chính xác của các mô hình đã học lên 13% và 14% lần lượt cho Case I và II. Trong khi các mô hình dựa trên xét nghiệm không trình bày một mô hình thực tế, các đặc trưng được xác định bởi các mô hình có thể được dùng tiềm năng để phát triển các hệ thống khuyến nghị cho các bệnh nhân có nguy cơ.

Bài báo cũng khám phá tính hữu ích của các mô hình như vậy đối với phát hiện các bệnh nhân mắc bệnh tim mạch trong các bộ dữ liệu khảo sát. Nghiên cứu của chúng tôi cho thấy các mô hình học máy dựa trên cách tiếp cận WEM có thể đạt được gần 84% độ chính xác trong việc nhận diện các bệnh nhân có các vấn đề tim mạch. Chúng tôi cũng có thể cho thấy các mô hình được huấn luyện chỉ trên các câu trả lời dựa trên khảo sát hoạt động gần ngang bằng với dữ liệu bao gồm cả kết quả xét nghiệm, gợi ý rằng một mô hình chỉ dựa trên khảo sát có thể rất hiệu quả trong phát hiện các bệnh nhân tim mạch.

Một đóng góp then chốt của nghiên cứu là việc nhận diện các đặc trưng góp phần vào các bệnh. Ở bệnh nhân đái tháo đường, các mô hình của chúng tôi có thể nhận diện các hạng mục - các đặc tính thể chất (tuổi, vòng eo, chiều dài chân, v.v.), lượng nạp vào chế độ ăn (lượng natri, chất xơ, và caffeine nạp vào), và nhân khẩu học (sắc tộc và thu nhập) góp phần vào phân loại bệnh. Các bệnh nhân mắc bệnh tim mạch được nhận diện bởi các mô hình chủ yếu dựa trên các đặc tính thể chất của họ (tuổi, huyết áp, cân nặng, v.v.), các vấn đề về sức khỏe của họ (đau ngực và các lần nhập viện), và các thuộc tính chế độ ăn (lượng calo, carbohydrate, chất xơ nạp vào, v.v.). Một tập lớn các thuộc tính chung tồn tại giữa cả hai bệnh, gợi ý rằng các bệnh nhân có vấn đề đái tháo đường cũng có thể có nguy cơ về các vấn đề tim mạch và ngược lại.

Như được trình bày trong phân tích của chúng tôi, các mô hình học máy cho thấy các kết quả hứa hẹn trong phát hiện các bệnh nói trên ở bệnh nhân. Một khả năng áp dụng thực tế của một mô hình như vậy có thể ở dạng một công cụ dựa trên web, nơi một bảng câu hỏi khảo sát có thể được dùng để đánh giá nguy cơ bệnh của những người tham gia. Dựa trên điểm số, những người tham gia có thể chọn tiến hành một cuộc kiểm tra kỹ lưỡng hơn với bác sĩ. Như một phần của các nỗ lực tương lai của chúng tôi, chúng tôi cũng dự định khám phá hiệu quả của các biến trong hồ sơ sức khỏe điện tử hướng tới việc phát triển các mô hình chính xác hơn.

## Các từ viết tắt

AU-ROC: Diện tích dưới - đặc trưng hoạt động của bộ thu nhận; CDC: Trung tâm kiểm soát bệnh tật; GBT: Cây gradient boosted; NCHS: Trung tâm thống kê y tế quốc gia; NHANES: Khảo sát kiểm tra sức khỏe và dinh dưỡng quốc gia; RFC: Bộ phân loại rừng ngẫu nhiên; SVM: Máy vector hỗ trợ; WEM: Một mô hình tập hợp có trọng số; XGBoost: eXtreme gradient boosting

## Lời cảm ơn

Chúng tôi biết ơn sự hỗ trợ của University of North Carolina - Greensboro trong việc tổ chức REU và NSF vì đã cung cấp hỗ trợ tài trợ để tiến hành nghiên cứu.

## Đóng góp của các tác giả

SDM đã hình thành nghiên cứu và cố vấn cho AD, SM, và AY. AD đã làm việc về tiền xử lý dữ liệu và phát triển mô hình học máy cho các bệnh tim mạch. SM đã phát triển các mô hình SVM cho các bệnh nhân đái tháo đường và tiền đái tháo đường. AY đã phát triển các mô hình gradient boosted cho các bệnh nhân đái tháo đường và tiền đái tháo đường. SDM đã phát triển khung của bài báo và đóng góp vào phần giới thiệu, phương pháp luận, kết quả/bàn luận, và kết luận. AD, SM, và AY đã phát triển phương pháp luận cho mỗi thành phần của họ. AD, SM, AY, và SDM đã tham gia đọc soát lỗi và phê duyệt cuối cùng bản thảo.

## Tài trợ

Nghiên cứu được hỗ trợ bởi Research and Undergraduate Education (REU) của National Science Foundations theo Grant No. DMS - 1560332.

## Tính sẵn có của dữ liệu và vật liệu

Dữ liệu liên tục của Khảo sát Kiểm tra Sức khỏe và Dinh dưỡng Quốc gia (NHANES) được dùng trong nghiên cứu có sẵn công khai tại trang web của Center Disease Control (CDC) tại: https://www.cdc.gov/nchs/tutorials/nhanes/Preparing/Download/ intro.htm. Tài liệu về cách tải và sử dụng dữ liệu được cung cấp tại: https://www.cdc.gov/nchs/tutorials/NHANES/index\_continuous. htm

## Phê duyệt đạo đức và đồng ý tham gia

Khảo sát NHANES vận hành dưới sự phê duyệt của National Center for Health Statistics Research Ethics Review Board (Protocols #2005-06, and #201117), có tại www.cdc.gov/nchs/nhanes/irba98.htm. Tất cả dữ liệu NHANES đáp ứng các điều kiện được mô tả trong Research Using Publicly Available Datasets (Secondary Analysis) - Policy #39 - để sử dụng mà không cần đơn xin tới Institutional Review Board. Tất cả những người tham gia nghiên cứu đã cung cấp đồng ý tham gia bằng văn bản.

## Đồng ý công bố

Không áp dụng.

## Xung đột lợi ích

Các tác giả tuyên bố rằng họ không có xung đột lợi ích.

## Chi tiết tác giả

1 Department of Mathematics and Computer Science, Eastern Oregon University, La Grande, OR USA. 2 Department of Mathematics and Statistics, Winona State University, Winona, MN USA. 3 Department of Statistics, Purdue University, West Lafayette, IN USA. 4 Department of Computer Science, University of North Carolina at Greensboro, Greensboro, NC USA.

## Nhận: 3 October 2018 Chấp nhận: 20 September 2019

## Tài liệu tham khảo

1. Center for Disease Control and Prevention (CDC). National Diabetes Statistics Report; 2017. Center for Disease Control and Prevention (CDC). https://www.cdc.gov/diabetes/data/statistics-report/index.html. Accessed 15 Dec 2018.
2. Center for Disease Control and Prevention (CDC). Heart Disease Fact Sheet; 2017. Center for Disease Control and Prevention (CDC). https:// www.cdc.gov/dhdsp/data\_statistics/fact\_sheets/fs\_heart\_disease.htm. Accessed 15 Dec 2018.
3. Association AH, et al. Heart disease and stroke statistics 2017 at-a-glance; 2017. http://www.heart.org/idc/groups/ahamahpublic/@wcm/@sop/ @smd/documents/downloadable/ucm\_491265.pdf. Accessed 15 Dec 2018.
4. American Heart Association. Cardiovascular Disease and Diabetes; 2019. American Heart Association. https://www.heart.org/en/health-topics/ diabetes/why-diabetes-matters/cardiovascular-disease--diabetes. Accessed 15 Dec 2018.
5. Einarson TR, Acs A, Ludwig C, Panton UH. Prevalence of cardiovascular disease in type 2 diabetes: a systematic literature review of scientific evidence from across the world in 2007-2017. Cardiovasc Diabetol. 2018;17(1):83.
6. Gans D, Kralewski J, Hammons T, Dowd B. Medical groups' adoption of electronic health records and information systems. Health Aff. 2005;24(5): 1323-33.
7. Raghupathi W, Raghupathi V. Big data analytics in healthcare: promise and potential. Health Inf Sci Syst. 2014;2(1):3.
8. Magoulas GD, Prentza A. Machine learning in medical applications. In: Advanced Course on Artificial Intelligence. Berlin: Springer; 1999. p. 300-7.
9. Kukar M, Kononenko I, Grošelj C, Kralj K, Fettich J. Analysing and improving the diagnosis of ischaemic heart disease with machine learning. Artif Intell Med. 1999;16(1):25-50.
10. Alexopoulos E, Dounias G, Vemmos K. Medical diagnosis of stroke using inductive machine learning. Mach Learn Appl Mach Learn Med Appl. 199920-3.
11. Kourou K, Exarchos TP, Exarchos KP, Karamouzis MV, Fotiadis DI. Machine learning applications in cancer prognosis and prediction. Comput Struct Biotechnol J. 2015;13:8-17. https://doi.org/10.1016/j.csbj.2014.11.005.
12. Semerdjian J, Frank S. An Ensemble Classifier for Predicting the Onset of Type II Diabetes. ArXiv e-prints. 2017. 1708.07480.
13. Yu W, Liu T, Valdez R, Gwinn M, Khoury MJ. Application of support vector machine modeling for prediction of common diseases: the case of diabetes and pre-diabetes. BMC Med Inf Decis Making. 2010;10(1):16. https://doi.org/10.1186/1472-6947-10-16.
14. Teimouri M, Ebrahimi E, Alavinia SA. Comparison of various machine learning methods in diagnosis of hypertension in diabetics with/without consideration of costs. Iran J Epidemiol. 2016;11(4):. http://irje.tums.ac.ir/article-1-5462-en.pdf. Accessed 15 Dec 2018.
15. Parthiban G, Srivatsa SK. Applying machine learning methods in diagnosing heart disease for diabetic patients. Int J Appl Inf Syst (IJAIS). 2012;3:2249-0868.
16. Center for Disease Control and Prevention (CDC), National Center for Health Statistics (NCHS). National Health and Nutrition Examination Survey (NHANES). 2018. http://www.cdc.gov/nchs/nhanes/ about\_nhanes.htm. Accessed 15 Dec 2018.
17. Cox DR. The regression analysis of binary sequences. J R Stat Soc Ser B Methodol. 1958;20(2):215-42.
18. Cortes C, Vapnik VN. Support-vector networks. Mach Learn. 1995;20(3): 273-97.
19. Ho TK. Random decision forests. In: Proceedings of 3rd international conference on document analysis and recognition. Vol. 1. IEEE; 1995. p. 278-82.
20. Quinlan JR. Induction of decision trees. Mach Learn. 1986;1(1):81-106.
21. Friedman JH. Greedy function approximation: A gradient boosting machine. Ann Stat. 2001;29(5):1189-232. https://doi.org/10.1214/aos/ 1013203451.
22. Chen T, Guestrin C. Xgboost: A scalable tree boosting system. In: Proceedings of the 22Nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, KDD '16. New York: ACM; 2016. p. 785-94. https://doi.org/10.1145/2939672.2939785, http://doi.acm.org/10. 1145/2939672.2939785.
23. Tu JV. Advantages and disadvantages of using artificial neural networks versus logistic regression for predicting medical outcomes. J Clin Epidemiol. 1996;49(11):1225-31.
24. Chen Y-W, Lin C-J. In: Guyon I, Nikravesh M, Gunn S, Zadeh LA, editors. Combining SVMs with Various Feature Selection Strategies. Berlin, Heidelberg: Springer; 2006, pp. 315-24. https://doi.org/10.1007/978-3540-35488-8\_13, https://doi.org/10.1007/978-3-540-35488-8\_13.
25. Heredia-Langner A, Jarman KH, Amidan BG, Pounds JG. Genetic algorithms and classification trees in feature discovery: diabetes and the nhanes database. In: Proceedings of the International Conference on Data Mining (DMIN); 2013. p. 1. The Steering Committee of The World Congress in Computer Science, Computer Engineering and Applied Computing (WorldComp).
26. Powell KE, Thompson PD, Caspersen CJ, Kendrick JS. Physical activity and the incidence of coronary heart disease. Annu Rev Public Health. 1987;8(1):253-87.
27. Center for Disease Control and Prevention (CDC). Indicator Definitions Cardiovascular Disease. 2018. Center for Disease Control and Prevention (CDC). https://www.cdc.gov/cdi/definitions/cardiovascular-disease.html. Accessed 15 Dec 2018.
28. Elith J, Leathwick JR, Hastie T. A working guide to boosted regression trees. J Anim Ecol. 2008;77(4):802-13.
29. Goutte C, Gaussier E. A probabilistic interpretation of precision, recall and F-score, with implication for evaluation. In: European Conference on Information Retrieval. Berlin, Heidelberg: Springer; 2005. p. 345-59.
30. Nesto RW. Ldl cholesterol lowering in type 2 diabetes: what is the optimum approach? Clin Diabetes. 2008;26(1):8-13.
31. Kersten JR, Toller WG, Gross ER, Pagel PS, Warltier DC. Diabetes abolishes ischemic preconditioning: role of glucose, insulin, and osmolality. Am J Physiol-Heart Circ Physiol. 2000;278(4):1218-24.
32. West KM, Ahuja M, Bennett PH, Czyzyk A, De Acosta OM, Fuller JH, Grab B, Grabauskas V, Jarrett RJ, Kosaka K, et al. The role of circulating glucose and triglyceride concentrations and their interactions with other 'risk factors' as determinants of arterial disease in nine diabetic population samples from the who multinational study. Diabetes care. 1983;6(4):361-9.
33. Xie Y, Bowe B, Li T, Xian H, Yan Y, Al-Aly Z. Higher blood urea nitrogen is associated with increased risk of incident diabetes mellitus. Kidney Int. 2018;93(3):741-52.
34. Ayon SI, Islam MM. Diabetes prediction: A deep learning approach. Int J Inf Eng Electron Bus. 2019;11(2):21.
35. Pei D, Gong Y, Kang H, Zhang C, Guo Q. Accurate and rapid screening model for potential diabetes mellitus. BMC Med Inf Dec Making. 2019;19(1):41.
36. Heydari M, Teimouri M, Heshmati Z, Alavinia SM. Comparison of various classification algorithms in the diagnosis of type 2 diabetes in iran. Int J Diabetes Dev Countries. 2016;36(2):167-73.
37. Nilsson S, Scheike M, Engblom D, Karlsson L-G, Mölstad S, Akerlind I, Ortoft K, Nylander E. Chest pain and ischaemic heart disease in primary care. Br J Gen Pract. 2003;53(490):378-82.
38. Britton A, McKee M. The relation between alcohol and cardiovascular disease in eastern europe: explaining the paradox. J Epidemiol Community Health. 2000;54(5):328-32.
39. Friedlander Y, Siscovick DS, Weinmann S, Austin MA, Psaty BM, Lemaitre RN, Arbogast P, Raghunathan T, Cobb LA. Family history as a risk factor for primary cardiac arrest. Circulation. 1998;97(2):155-160.
40. Lloyd-Jones DM, Leip EP, Larson MG, d'Agostino RB, Beiser A, Wilson PW, Wolf PA, Levy D. Prediction of lifetime risk for cardiovascular disease by risk factor burden at 50 years of age. Circulation. 2006;113(6):791-8.
41. Stamler J, Vaccaro O, Neaton JD, Wentworth D, Group MRFITR, et al. Diabetes, other risk factors, and 12-yr cardiovascular mortality for men screened in the multiple risk factor intervention trial. Diabetes Care. 1993;16(2):434-444.
42. Shepherd J, Barter P, Carmena R, Deedwania P, Fruchart J-C, Haffner S, Hsia J, Breazna A, LaRosa J, Grundy S, et al. Effect of lowering ldl cholesterol substantially below currently recommended levels in patients

with coronary heart disease and diabetes: the treating to new targets (tnt) study. Diabetes Care. 2006;29(6):1220-6.

43. Gordon DJ, Probstfield JL, Garrison RJ, Neaton JD, Castelli WP, Knoke JD, Jacobs Jr DR, Bangdiwala S, Tyroler HA. High-density lipoprotein cholesterol and cardiovascular disease. four prospective american studies. Circulation. 1989;79(1):8-15.

## Ghi chú của Nhà xuất bản

Springer Nature giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã công bố và liên kết thể chế.
