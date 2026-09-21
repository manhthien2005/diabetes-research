<!-- extracted by pdf-extract | engine=docling | pages=13 | ocr=False | tables=8/8 | density=1.07 | score=100 -->

## BÀI BÁO NGHIÊN CỨU

## Phương pháp học sâu để dự đoán đái tháo đường sử dụng bộ dữ liệu PIMA Indian

Huma Naz 1 &amp; Sachin Ahuja 1

Ngày nhận: 6 November 2019 /Ngày chấp nhận: 20 March 2020 # Springer Nature Switzerland AG 2020 Xuất bản trực tuyến: 14 April 2020 /

## Tóm tắt

Mục đích Liên đoàn Đái tháo đường Quốc tế (International Diabetes Federation, IDF) cho biết có 382 triệu người đang sống chung với bệnh đái tháo đường trên toàn thế giới. Trong vài năm qua, tác động của đái tháo đường đã gia tăng mạnh mẽ, khiến nó trở thành một mối đe dọa toàn cầu. Hiện nay, Đái tháo đường liên tục được liệt kê ở vị trí hàng đầu như một nguyên nhân chính gây tử vong. Số người mắc bệnh sẽ tăng lên tới 629 triệu, tức là tăng 48% vào năm 2045. Tuy nhiên, đái tháo đường phần lớn có thể phòng ngừa được và có thể tránh được bằng cách thay đổi lối sống. Những thay đổi này cũng có thể làm giảm nguy cơ phát triển bệnh tim mạch và ung thư. Vì vậy, có một nhu cầu cấp thiết về một công cụ tiên lượng có thể giúp các bác sĩ phát hiện sớm bệnh và do đó có thể khuyến nghị những thay đổi lối sống cần thiết để ngăn chặn sự tiến triển của căn bệnh nguy hiểm này.

Phương pháp Đái tháo đường nếu không được điều trị có thể trở nên gây tử vong và trực tiếp hoặc gián tiếp kéo theo nhiều bệnh khác như nhồi máu cơ tim, suy tim, đột quỵ não và nhiều bệnh khác nữa. Do đó, việc phát hiện sớm đái tháo đường là rất quan trọng để có thể hành động kịp thời và có thể ngăn chặn sự tiến triển của bệnh nhằm tránh các biến chứng nặng hơn. Các tổ chức chăm sóc sức khỏe tích lũy một lượng dữ liệu khổng lồ bao gồm hồ sơ sức khỏe điện tử (Electronic health records), hình ảnh, dữ liệu omics và văn bản nhưng việc thu được kiến thức và hiểu biết sâu sắc về dữ liệu vẫn là một thách thức then chốt. Những tiến bộ mới nhất trong công nghệ Học máy (Machine learning) có thể được áp dụng để thu được các mẫu ẩn, có thể chẩn đoán đái tháo đường ở giai đoạn sớm. Bài báo nghiên cứu này trình bày một phương pháp luận để dự đoán đái tháo đường sử dụng một thuật toán học máy đa dạng dùng bộ dữ liệu PIMA.

Kết quả Độ chính xác đạt được bởi các bộ phân loại chức năng Mạng nơ-ron Nhân tạo (Artificial Neural Network, ANN), Naive Bayes (NB), Cây Quyết định (Decision Tree, DT) và Học sâu (Deep Learning, DL) nằm trong khoảng 90 -98%. Trong bốn bộ này, DL cho kết quả tốt nhất đối với việc khởi phát đái tháo đường với tỷ lệ chính xác 98.07% trên bộ dữ liệu PIMA. Do đó, hệ thống được đề xuất này cung cấp một công cụ tiên lượng hiệu quả cho các cán bộ y tế. Các kết quả thu được có thể được sử dụng để phát triển một công cụ tiên lượng tự động mới lạ có thể hữu ích trong việc phát hiện sớm bệnh.

Kết luận Kết quả của nghiên cứu xác nhận rằng DL cho kết quả tốt nhất với các đặc trưng được trích xuất hứa hẹn nhất. DL đạt độ chính xác 98.07% có thể được sử dụng để phát triển thêm công cụ tiên lượng tự động. Độ chính xác của phương pháp DL có thể được nâng cao thêm nữa bằng cách bao gồm dữ liệu omics để dự đoán sự khởi phát của bệnh.

Từ khóa Dự đoán đái tháo đường . Học sâu . Thuật toán khai phá dữ liệu . Mạng nơ-ron . Bộ dữ liệu PIMA Indian

## Bằng chứng trước nghiên cứu này

Tại Hoa Kỳ, số người mắc đái tháo đường và trên 18 tuổi được tính là 30.3 triệu, tức là 9.4% tổng dân số Hoa Kỳ theo báo cáo đái tháo đường quốc gia, 2017 [1].

* Huma Naz huma.naz@chitkara.edu.in

1 Chitkara University Institute of Engineering and Technology, Chitkara University, Punjab, India

Hơn nữa, Trung Quốc đang dẫn đầu về căn bệnh này với 98 triệu người bị ảnh hưởng hay khoảng 10% dân số và Ấn Độ là quốc gia đứng thứ hai trên thế giới như thể hiện trong Hình 1 với 65.1 triệu người mắc đái tháo đường tính đến năm 2013 [2]. Đái tháo đường liên tục được liệt kê ở vị trí hàng đầu là một nguyên nhân chính gây tử vong ở Mỹ [3]. Theo thống kê chính thức năm 2017, ước tính 8.8% dân số toàn cầu mắc đái tháo đường và con số này có khả năng tăng lên 9.9% vào năm 2045 [4].

Trong những năm phát triển vừa qua ở Trung Quốc, số người mắc đái tháo đường đang gia tăng đáng báo động và điều này đã tác động sâu sắc đến cuộc sống của mọi người. Tỷ lệ người bị ảnh hưởng bởi đái tháo đường ở nữ giới cao hơn nam giới như thể hiện trong Hình 2. Theo thống kê chính thức, số người bị ảnh hưởng bởi căn bệnh này là gần 110 triệu vào năm 2017 [5].

Fig. 1 Số người mắc đái tháo đường trên toàn thế giới

## Giới thiệu

Đái tháo đường có thể được coi là một trong những thách thức chính trong cộng đồng chăm sóc sức khỏe trên toàn thế giới và tác động của nó đang gia tăng với tốc độ rất nhanh. Do đó, nó là nguyên nhân lớn thứ bảy gây ra tỷ lệ tử vong sớm vào năm 2016 trên toàn thế giới được Tổ chức Y tế Thế giới (World Health Organization, WHO) đề cập [1]. Theo mức độ phổ biến toàn cầu của đái tháo đường, 1.6 triệu người đã tử vong mỗi năm vì đái tháo đường [2]. WHO đã chứng minh trong báo cáo toàn cầu đầu tiên của mình rằng số người mắc đái tháo đường tăng từ 108 triệu (4.2%) lên 422 triệu (8.5%) tính đến cuối năm 2014 [6]. Vào ngày đái tháo đường thế giới 2018, WHO đã cùng các đối tác từ khắp nơi trên thế giới để giới thiệu tác động của đái tháo đường. Theo WHO, 1 trong 3 người trưởng thành được báo cáo là thừa cân và vấn đề này đang gia tăng từng ngày. Đái tháo đường bị kết luận là nguyên nhân chính gây nhồi máu cơ tim, suy thận và mù lòa do đột quỵ [1].

Fig. 2 Sự gia tăng số nam và nữ được chẩn đoán đái tháo đường từ 1990 đến 2016

Đái tháo đường có thể được coi là một bệnh mãn tính trong đó glucose (đường huyết) không được chuyển hóa trong cơ thể (glucose được tạo ra từ thức ăn chúng ta ăn); do đó, nó làm tăng mức đường trong máu vượt quá giới hạn chấp nhận được. Ở đái tháo đường, cơ thể không thể tạo ra insulin hoặc không thể đáp ứng với insulin được tạo ra. Đái tháo đường cho đến nay vẫn chưa chữa khỏi được, nhưng có thể phòng ngừa được bằng kiến thức sớm. Một người mắc đái tháo đường dễ gặp các biến chứng nghiêm trọng như tổn thương thần kinh, nhồi máu cơ tim, suy thận và đột quỵ. Mức glucose cao trong cơ thể có thể gây ra vấn đề tăng đường huyết (hyperglycemia), dẫn đến những bất thường trong hệ tim mạch [4] và cũng gây ra các vấn đề nghiêm trọng trong hoạt động của nhiều cơ quan khác nhau của con người như mắt, thận và thần kinh.

Trong chẩn đoán Sớm, việc dự đoán và chẩn đoán bệnh được phân tích thông qua kiến thức và kinh nghiệm của bác sĩ, nhưng điều đó có thể không chính xác và dễ sai sót. Ngành Chăm sóc sức khỏe thu thập một lượng dữ liệu khổng lồ liên quan đến chăm sóc sức khỏe, nhưng dữ liệu đó không thể nhận biết các mẫu chưa được phát hiện để đưa ra quyết định hiệu quả [7]. Vì các quyết định thủ công có thể rất nguy hiểm cho việc chẩn đoán bệnh sớm vì chúng dựa trên quan sát và phán đoán của cán bộ y tế vốn không phải lúc nào cũng chính xác [7]. Có thể có một số mẫu vẫn ẩn và có thể tác động đến các quan sát và kết quả. Kết quả là, bệnh nhân nhận được chất lượng dịch vụ thấp; do đó cần một cơ chế tiên tiến để phát hiện sớm bệnh với chẩn đoán tự động và độ chính xác tốt hơn. Nhiều lỗi không phát hiện được và các mẫu ẩn làm nảy sinh các thuật toán khai phá dữ liệu và máy đa dạng có thể rút ra kết quả hiệu quả với độ chính xác đáng tin cậy [8]. Do tác động ngày càng tăng từng ngày của đái tháo đường, một loạt các thuật toán khai phá dữ liệu đã được giới thiệu để thu thập các mẫu ẩn từ dữ liệu chăm sóc sức khỏe lớn. Hơn nữa, dữ liệu đó có thể được sử dụng để chọn đặc trưng và dự đoán tự động đái tháo đường [4].

Mục đích chính của công trình nghiên cứu này là đề xuất việc phát triển một công cụ tiên lượng để dự đoán và phát hiện đái tháo đường sớm với độ chính xác cải thiện. Đã có một lượng dữ liệu và bộ dữ liệu khổng lồ có sẵn trên internet hoặc các nguồn bên ngoài và bộ dữ liệu PIMA được sử dụng trong công trình này là một trong những bộ dữ liệu được sử dụng rộng rãi nhất trong nhiều nghiên cứu và nó được thu thập bởi Viện Quốc gia về Đái tháo đường và các Bệnh Tiêu hóa và Thận (National Institute of Diabetes and Digestive and Kidney Diseases, NIDDK). Công trình nghiên cứu này thể hiện các nghiên cứu toàn diện được thực hiện trên các bộ dữ liệu PIMA sử dụng các thuật toán khai phá dữ liệu như DT, NB, ANN và DL [9]. Việc so sánh các thuật toán được trình bày theo cách hợp lý và có tổ chức tốt từ đó DL cung cấp kết quả hiệu quả và nổi bật hơn. DL là một công nghệ tự học từ dữ liệu và được sử dụng hiệu quả để dự đoán đái tháo đường ngày nay [4]. Một mạng DL là một kỹ thuật sử dụng các thuộc tính ANN trong đó các nơ-ron được kết nối với nhau với nhiều lớp biểu diễn [4, 6, 10]. DL học cách biểu diễn dữ liệu bằng cách mở rộng mức độ xem xét từ một lớp sang lớp khác do đó tăng độ chính xác [9]. Mô hình đạt độ chính xác cao 98.07% bằng cách sử dụng DL trong công cụ RapidMiner đề xuất một kiến thức đái tháo đường có cấu trúc tốt được định dạng cho cán bộ y tế và người hành nghề. Hơn nữa, nhiệm vụ là giảm bớt công sức và cung cấp kết quả tốt hơn so với các phương pháp truyền thống [11]. Các phương pháp học máy này có xu hướng cải thiện độ chính xác của các phương pháp hiện có. Nhưng DL và ANN cho kết quả tốt nhất vì chúng đáng tin cậy hơn, mạnh mẽ và chính xác hơn về mặt dự đoán bệnh.

Phần còn lại của bài báo được tổ chức theo cách sau: phần thứ ba trình bày công trình quan trọng trước đây đã được thực hiện về dự đoán đái tháo đường sử dụng các thuật toán khai phá dữ liệu. Phần thứ tư của bài báo trình bày mô tả bộ dữ liệu, quá trình tiền xử lý dữ liệu, và phương pháp luận được đề xuất. Phần thứ năm bao quát phần kết quả và thảo luận. Bài báo kết luận ở phần thứ sáu cùng với phạm vi tương lai.

## Công trình liên quan

Các kỹ thuật khai phá dữ liệu đã vượt qua các phương pháp luận hiện có với dự đoán, độ chính xác và độ chuẩn xác tốt hơn. Hơn nữa, Học máy là một công nghệ của trí tuệ nhân tạo học các mối quan hệ giữa các nút mà không cần huấn luyện chúng trước [12]. Khả năng chính của các kỹ thuật học máy để dẫn dắt mô hình dự đoán mà không cần huấn luyện mạnh liên quan đến cơ chế cơ bản. Các phương pháp khai phá dữ liệu và học máy giúp phát hiện dữ liệu vẫn ẩn trong khi sử dụng cách tiếp cận tiên tiến [13]. Trong phần này, chúng tôi sẽ điểm lại một số nghiên cứu trước đây để chứng minh khái niệm về khả năng sử dụng của các phương pháp khai phá dữ liệu trong mô hình dự đoán điều khiển, chủ yếu cho đái tháo đường.

Swapna G và những người khác [4] đã thực hiện một nghiên cứu rằng thực hành Học máy đã chứng minh là hữu ích và hiệu quả để xây dựng một mô hình dự đoán cho đái tháo đường sử dụng tín hiệu HRV trong cách tiếp cận DL. Tác giả được thúc đẩy bởi những cái chết do đái tháo đường gây ra mỗi năm trên thế giới đòi hỏi phải tránh biến chứng của bệnh. Tác giả đã phát triển một mô hình dự đoán mới sử dụng mạng nơ-ron tích chập (convolutional neural network, CNN), bộ nhớ dài-ngắn hạn (long short-term memory, LSTM) và một mô hình tổ hợp (ensemble) để phát hiện các đặc tính theo trình tự thời gian phức hợp của dữ liệu HRV đầu vào. Sau đó SVM được áp dụng cho những đặc tính được phát hiện đó để phân loại dữ liệu. Hệ thống được đề xuất có thể hữu ích cho cán bộ y tế và bác sĩ lâm sàng để phân tích đái tháo đường sử dụng tín hiệu ECG. Nesreen Samer El\_Jerjawi và Samy S. Abu-Naser [14] đã đề xuất một mô hình dự đoán cho đái tháo đường sử dụng ANN (Artificial Neural Network) có thể rất hữu ích cho cán bộ y tế và người hành nghề. Tác giả được thúc đẩy bởi biến chứng cực kỳ nguy hiểm của bệnh. Ông đã phát triển một mô hình ANN để giảm thiểu hàm lỗi trong quá trình huấn luyện. Vì vậy hàm lỗi trung bình được tính là 0.01% và độ chính xác đạt được thông qua ANN là 87.3%.

Sajida Perveen et al. [15] đã khuyến nghị công nghệ AdaBoost. Một mô hình tổ hợp AdaBoost vượt trội hơn bagging và J48 trong việc phân loại bệnh nhân đái tháo đường. Tác giả được truyền cảm hứng từ tác động ngày càng tăng của đái tháo đường trên toàn thế giới, do đó, việc dự đoán và phòng ngừa đái tháo đường (diabetes mellitus) đang đạt được tầm quan trọng trong cộng đồng chăm sóc sức khỏe [16]. Tác giả trình bày một mô hình dự đoán với hiệu suất cải thiện để phân loại bệnh nhân đái tháo đường trong dân số Canada qua ba độ tuổi khác nhau. Có ba mô hình tổ hợp (bagging, AdaBoost và J48) được áp dụng trên dữ liệu kiểm tra để đánh giá hiệu suất và độ chính xác. Kết quả cho thấy AdaBoost vượt trội hơn các mô hình khác về độ chính xác. Theo các tác giả AdaBoost có thể được áp dụng cho bệnh khác như bệnh tim mạch vành, tăng huyết áp để dự đoán tốt hơn.

Nahla H. Barakat et al. [17] đã trình bày một mô hình SVM thông minh để chẩn đoán đái tháo đường. Theo các tác giả đái tháo đường là một vấn đề sức khỏe lớn trên toàn thế giới và tiết lộ rằng có 80% biến chứng của đái tháo đường type 2 có thể được ngăn ngừa nếu được phát hiện ở giai đoạn sớm. Trong kịch bản được đề xuất, nhiều thuật toán khai phá dữ liệu và học máy đã được phân tích để dự đoán đái tháo đường. Các tác giả đề xuất mô hình SVM với một mô-đun bổ sung để biến mô hình 'hộp đen' của SVM thành một mô tả dễ hiểu. Hệ thống đưa ra quyết định về phân loại SVM với độ chính xác nổi bật. Han Wu et al. [5] đã đề xuất một mô hình mới lạ để phát hiện và tiên lượng đái tháo đường type-2 sử dụng các thuật toán K-means và hồi quy logistic. Phương pháp được đề xuất đảm bảo sự khuếch đại trong độ chính xác dự đoán bao gồm cả phương pháp cụm và lớp. Các phương pháp được đề xuất nâng cao độ chính xác lên 3% trong việc dự đoán đái tháo đường.

Stefan Ravizza et al. [18] giải thích về việc sử dụng các kỹ thuật khai phá dữ liệu trong chăm sóc sức khỏe và đề xuất một mô hình để đo lường nguy cơ của bệnh không thuyên giảm. Họ đã áp dụng chiến lược lựa chọn đặc tính, dựa trên dữ liệu và được hỗ trợ chăm sóc sức khỏe trên dữ liệu thực tế thay vì chiến lược Deep Patient và so sánh nó với dữ liệu lâm sàng bằng cách áp dụng nó trên các thuật toán trực tiếp. Miotto et al. [19], đã đề xuất một phương pháp luận không giám sát có tên là Deep Patient, để dự đoán nguy cơ liên quan đến nhiều bệnh bằng cách áp dụng các đặc trưng đa dạng. Do đó DL giúp trích xuất các đặc trưng chính xác hơn để phân tích dựa trên dữ liệu. Về bản chất của việc sử dụng học máy trong tiên lượng bệnh Alade et al. [20] đã trình bày một phương pháp để tiên đoán đái tháo đường bằng cách thiết kế mạng ANN và mạng Bayesian cùng với kiến trúc ANN bốn lớp cho phương pháp lan truyền ngược (back-propagation) và thuật toán điều chỉnh Bayesian để huấn luyện và kiểm tra bộ dữ liệu. Dữ liệu đã được huấn luyện theo cách mà nó hiển thị kết quả chính xác trên biểu đồ hồi quy. Chẩn đoán có thể được thực hiện từ xa thông qua mô hình này và nó có thể giao tiếp với bệnh nhân mà không cần ở bên cạnh họ.

Vào năm 2017 Carrera et al. [21] đã đề xuất một phương pháp luận có sự hỗ trợ của máy tính để phát hiện bệnh võng mạc đái tháo đường (diabetic retinopathy), dựa trên xử lý tín hiệu số của các hình ảnh võng mạc. Khát vọng chính của cách tiếp cận được đề xuất này là phân loại vị trí của bệnh võng mạc đái tháo đường không tăng sinh tại bất kỳ hình ảnh võng mạc nào. Ưu điểm chính của cách tiếp cận này là nó mạnh mẽ về bản chất nhưng độ chuẩn xác và độ chính xác cần được cải thiện cho vấn đề ứng dụng được ghi nhận. Bệnh võng mạc đái tháo đường là mãn tính và đã trở thành căn bệnh lối sống hàng đầu. Một quá trình dài của căn bệnh này có thể gây suy tim, suy thận; hoạt động không đúng của dạ dày, mức đường huyết tăng cao kéo dài và nhiều biểu hiện khác. Bằng cách xem xét vấn đề này Huang et al. [22] đã đề xuất các phương pháp luận SVM và entropy cho ứng dụng của ba bộ dữ liệu khác nhau (võng mạc đái tháo đường Debrecen, cột sống, và khối u vú) để đo lường độ chính xác. Các tác giả đã thử nghiệm cách tiếp cận kết hợp DL và SVM để đánh giá bộ dữ liệu huấn luyện theo từng lớp và thuộc tính quan trọng nhất được lấy để xây dựng cây quyết định. Phương pháp được đề xuất đạt độ chuẩn xác phân loại hứa hẹn. Kết quả là, người ta đã quan sát thấy rằng võng mạc đái tháo đường Debrecen và khối u vú cho kết quả và hiệu quả chính xác hơn.

## Phương pháp luận

## Dữ liệu chăm sóc sức khỏe

Bộ dữ liệu được sử dụng cho nghiên cứu là bộ dữ liệu PIMA Indian (PIMA Indian dataset, PID) bởi NIDDK. Động lực chính đằng sau việc sử dụng bộ dữ liệu PIMA là hầu hết dân số trong thế giới ngày nay theo một lối sống tương tự với sự phụ thuộc cao hơn vào thực phẩm chế biến sẵn cùng với sự suy giảm hoạt động thể chất. PID là một nghiên cứu thuần tập dài hạn từ năm 1965 bởi NIDDK vì nguy cơ đái tháo đường tối đa. Bộ dữ liệu chứa một số tham số chẩn đoán và đo lường nhất định thông qua đó bệnh nhân có thể được xác định với bất kỳ loại bệnh mãn tính hoặc đái tháo đường nào trước thời điểm. Tất cả những Người tham gia trong PID đều là nữ và ít nhất 21 tuổi. PID gồm tổng cộng 768 trường hợp, trong đó 268 mẫu được xác định là mắc đái tháo đường và 500 mẫu không mắc đái tháo đường. 8 thuộc tính có ảnh hưởng nhất góp phần vào việc dự đoán đái tháo đường như sau: số lần mang thai của bệnh nhân, BMI, mức insulin, tuổi, Huyết áp, Độ dày da, Glucose, DiabetesPedigreeFunction với nhãn kết quả (Bảng 1). Hình 3 chứng minh các đặc tính đa dạng của mỗi thuộc tính và phạm vi của chúng được sử dụng trong bộ dữ liệu PIMA dưới dạng đồ họa.

Bộ dữ liệu Pima Indian được lấy từ URL https://data. world/data-society/pima-indians-diabetes-database và chia theo tỷ lệ 80/20% thành tập huấn luyện và tập xác thực. Phần xác thực là 20% của bộ dữ liệu đầu vào đã được chọn để định hướng việc lựa chọn các siêu tham số (hyperparameters).

Table 1 Mô tả các thuộc tính của bộ dữ liệu PIMA Indian

|   Sr. no. | Các thuộc tính được chọn từ bộ dữ liệu PIMA Indian   | Mô tả các thuộc tính được chọn                                                                      | Phạm vi        |
|-----------|------------------------------------------------|---------------------------------------------------------------------------------------------------------|--------------|
|        1. | Pregnancy                                      | Number of times a participant is pregnant                                                               | 0 - 17       |
|        2. | Glucose                                        | Plasma glucose concentration a 2 h in an oral glucose tolerance test                                    | 0 - 199      |
|        3. | Diastolic Blood pressure                       | It consists of Diastolic blood pressure (when blood exerts into arteries between heart)(mm Hg)          | 0 - 122      |
|        4. | Skin Thickness                                 | Triceps skinfold thickness (mm).It concluded by the collagen content                                    | 0 - 99       |
|        5. | Serum Insulin                                  | 2-Hour serum insulin (mu U/ml)                                                                          | 0 - 846      |
|        6. | BMI                                            | Body mass index (weight in kg/(height in m)^2)                                                          | 0 - 67.1     |
|        7. | Diabetes pedigree Function                     | An appealing attributed used in diabetes prognosis                                                      | 0.078 - 2.42 |
|        8. | Age                                            | Age of participants                                                                                     | 21 - 81      |
|        9. | Outcome                                        | Diabetes class variable, Yes represent the patient is diabetic and no represent patient is not diabetic | Yes/No       |

Về mặt kỹ thuật, tập xác thực thực hiện huấn luyện các siêu tham số trước khi tối ưu hóa [23]. Kiểm định chéo (Cross-validation) đã được sử dụng để ước tính hiệu suất thống kê của mô hình học. Nó thực thi hai quá trình con là kiểm tra và huấn luyện. Quá trình con huấn luyện được sử dụng để huấn luyện một mô hình và sau đó mô hình học được áp dụng trong quá trình con Kiểm tra để đo lường độ chính xác.

Lý do chọn bộ dữ liệu Pima Indian là sự phổ biến cao của đái tháo đường type 2 trong nhóm Pima của Người Mỹ Bản địa sống ở khu vực mà ngày nay được gọi là trung và nam Arizona. Nhóm này đã sống sót với một chế độ ăn nghèo nàn carbohydrate trong nhiều năm vì khuynh hướng di truyền [24]. Trong những năm gần đây, nhóm Pima có chỉ số đái tháo đường cao do sự chuyển đổi đột ngột từ cây trồng truyền thống sang thực phẩm chế biến sẵn.

## Tiền xử lý dữ liệu

Hầu hết dữ liệu được thu thập có khả năng bị ảnh hưởng theo cách bất cẩn. Bên cạnh đó, chất lượng dữ liệu rất quan trọng vì nó ảnh hưởng đến kết quả dự đoán và độ chính xác ở một mức độ lớn [4]. Do đó, các Bộ dữ liệu cần được cân bằng và phân chia đúng cách giữa dữ liệu kiểm tra và huấn luyện theo một tỷ lệ nhất định, Để việc lấy mẫu có thể được thực hiện hiệu quả nhằm có kết quả dự đoán tốt hơn. Lấy mẫu là một quá trình chọn một phần đại diện của dữ liệu để trích xuất các đặc tính và tham số từ các bộ dữ liệu lớn một cách nhất quán; do đó, nó có thể đóng góp một cách tốt hơn liên quan đến mô hình huấn luyện của máy. Để duy trì sự nhất quán đó chúng ta cần áp dụng một số kỹ thuật lấy mẫu (lấy mẫu tuyến tính, lấy mẫu xáo trộn, lấy mẫu phân tầng, và lấy mẫu tự động) trên bộ dữ liệu, các kỹ thuật lấy mẫu đó chia ngẫu nhiên bộ dữ liệu thành các tập con và đánh giá mô hình dự đoán. Những kỹ thuật lấy mẫu đa dạng đó thực hiện hoán vị và kết hợp khác nhau của một tập đại diện thông tin từ dữ liệu được thu thập được hiển thị ở đây.

Fig. 3 Biểu đồ của các đặc tính khác nhau trong bộ dữ liệu Pima Indian

- &amp; Lấy mẫu tuyến tính (Linear sampling): Kỹ thuật lấy mẫu này chia tuyến tính bộ dữ liệu thành các phân vùng làm đại diện cho bộ dữ liệu. Cùng với đó, nó không thay đổi trình tự của các bộ (tuples) và trường trong các tập con.
- &amp; Lấy mẫu xáo trộn (Shuffled sampling): Kỹ thuật lấy mẫu này chia bộ dữ liệu một cách ngẫu nhiên và xây dựng các tập con từ bộ dữ liệu được áp dụng. Dữ liệu được chọn tùy ý để lắp ráp các tập con.
- &amp; Lấy mẫu phân tầng (Stratified sampling): Kỹ thuật lấy mẫu này chia bộ dữ liệu một cách tùy ý và xây dựng các tập con. Nhưng phương pháp cũng chứng nhận rằng phân phối của lớp phải tĩnh trên toàn bộ bộ dữ liệu. Ví dụ, nếu bộ dữ liệu được sử dụng đã sử dụng phân loại nhị thức (binominal), thì phương pháp lấy mẫu phân tầng xây dựng các tập con tùy ý theo cách mà mọi tập con bao gồm xấp xỉ cùng tỷ lệ của hai giá trị của nhãn lớp.
- &amp; Tự động (Automatic): Phương pháp lấy mẫu tự động sử dụng lấy mẫu phân tầng làm kỹ thuật lấy mẫu mặc định phụ thuộc vào các đặc trưng của bộ dữ liệu. Nếu kỹ thuật không phù hợp với loại dữ liệu thì nó sử dụng một kỹ thuật phù hợp.

## Công trình được đề xuất

Mục tiêu chính của nghiên cứu này là trình bày các đặc trưng hứa hẹn nhất cần thiết để dự đoán bệnh nhân mắc đái tháo đường ở giai đoạn sớm. Một lượng lớn công trình nghiên cứu đã được thực hiện về việc phát hiện tự động xâm lấn đái tháo đường. Do đó, tất cả phụ thuộc vào những đặc trưng nào được trích xuất và loại bộ phân loại nào được áp dụng để thu được kết quả tối đa. Vì vậy, Sự đa dạng của việc học đã được phân tích rằng những yếu tố này của bộ dữ liệu có thể được áp dụng để phân loại các yếu tố nguy cơ đa dạng cho việc tiên đoán [25, 26]. Bài báo này trình bày các nghiên cứu toàn diện được thực hiện trên bộ dữ liệu PIMA. Sự liên kết của các thuật toán phân loại đa dạng được đánh giá trên các tầng khác nhau sẽ duy trì một định dạng có tổ chức tốt cho việc phát hiện đái tháo đường cùng với việc quản lý các thứ nguyên nguy cơ và chiến lược điều trị cho các bác sĩ y khoa.

Phương pháp luận được đề xuất này bao gồm hai phần chính, thứ nhất là làm thế nào để thu được độ chính xác sử dụng các mô hình phân loại đa dạng và thứ hai là xác thực mô hình. Có nhiều phương pháp luận học máy sẵn có mang tính xây dựng để phân tích các mẫu chưa được phát hiện nhằm đánh giá các yếu tố nguy cơ trong các bệnh như đái tháo đường. Hơn nữa, người ta quan sát thấy rằng việc trình bày của các phương pháp truyền thống không đạt đến mức chấp nhận trong nhận dạng giọng nói và đối tượng vì số chiều cao của dữ liệu [4]. Sự không đầy đủ của các thuật toán học máy đã thúc đẩy nghiên cứu DL và nó có xu hướng tạo ra kết quả chính xác hơn và chiếm ưu thế so với các thuật toán khác về độ chính xác. Rất nhiều nghiên cứu đã được thực hiện trong chăm sóc sức khỏe bằng cách triển khai DL trong phát hiện bất thường. Liên quan đến dự đoán đái tháo đường, mô hình được đề xuất của chúng tôi đạt độ chính xác cao nhất cho đến nay trên bộ dữ liệu PIMA tức là 98.07%.

Bốn thuật toán khai phá dữ liệu tức là DT, NB, ANN, và DL được áp dụng trên bộ dữ liệu PIMA để đánh giá hiệu quả tỷ lệ thuận trực tiếp với các quyết định chính xác. Phương pháp được đề xuất của chúng tôi đã được chọn dựa trên một nhiệm vụ liên quan đến việc tiên đoán bệnh đái tháo đường. Rapid miner cung cấp một Giao diện người dùng đồ họa thân thiện và tương tác để lắp ráp các mô hình dự đoán và tiền xử lý dữ liệu với độ chính xác hiệu quả trong thời gian tối thiểu. Do đó, Rapid miner Studio 9.2.000 đã được sử dụng trong phương pháp luận được đề xuất của chúng tôi; nó có các tính năng khác nhau như kéo và thả, trí tuệ đám đông và nhiều tính năng khác để gợi ý thực hành trong quá trình quy trình làm việc. Rapid miner cung cấp 400 toán tử bổ sung cho nhiều khía cạnh khai phá dữ liệu mà không có sẵn trong Weka. 400 toán tử bổ sung này chứa các kỹ thuật phân loại đa dạng, các phương pháp tiền xử lý, xác thực, và các kỹ thuật trực quan hóa không có sẵn trong Weka. Vì giao diện người dùng của rapid miner rất thuận tiện, do đó tất cả công việc đã được thực hiện trên công cụ này vốn tiết kiệm thời gian cho một nhà nghiên cứu khi so sánh với ngôn ngữ lập trình [27]. Ngoài giao diện rapid miner có nhiều ưu điểm hơn được minh họa thêm.

Khả năng sử dụng có thể được coi là một trong những ưu điểm đầu tiên của rapidminer vì luồng dữ liệu trong rapid miner giống như cấu trúc dựa trên cây. Nó đảm bảo các xác thực và tối ưu hóa tự động cho khai phá dữ liệu quy mô lớn vốn hơi phức tạp và khó khăn trong bố cục dựa trên đồ thị. Ưu điểm thứ hai của rapid miner là hiệu quả vì người dùng đã quan sát thấy rằng rapidminer có thể xử lý các bộ dữ liệu lớn hơn với mức tiêu thụ bộ nhớ tối thiểu so với Weka [27]. Hình 4 cho thấy lưu đồ của mô hình được đề xuất.

## Học sâu &amp; kiến trúc của nó

Học máy là một kỹ thuật rộng rãi của trí tuệ nhân tạo nghiên cứu các mối quan hệ từ dữ liệu mà không được lập trình một cách rõ ràng và không định nghĩa trước

Fig. 4 Lưu đồ của mô hình được đề xuất cho Dự đoán đái tháo đường

mối quan hệ giữa các phần tử dữ liệu [4, 5]. DL là một dạng của Học máy khác với các phương pháp truyền thống ở chỗ nó học từ nhiều biểu diễn khác nhau của dữ liệu thô. Nó cho phép các mô hình tính toán khác nhau chứa nhiều lớp xử lý dựa trên ANN để xử lý và biểu diễn dữ liệu với các mức trừu tượng khác nhau [28].

DL là một mô hình dựa trên perceptron truyền thẳng (feed-forward) đa lớp cũng tạo điều kiện cho các thuộc tính của ANN và được huấn luyện với hạ gradient ngẫu nhiên (stochastic gradient descent) sử dụng lan truyền ngược (back-propagation). Mạng là một tập hợp của bốn lớp mô phỏng các nút và nơ-ron, được định hướng theo một chiều (kết nối một chiều). Mỗi nút được kết nối với nút tiếp theo trong một kết nối một chiều và chứa hai lớp ẩn nơi mỗi nút huấn luyện một bản sao của các tham số mô hình toàn cục bằng cách áp dụng dữ liệu cục bộ của nó. Hơn nữa, nó sử dụng nhiều luồng (threads) để xử lý mô hình và áp dụng tính trung bình để đóng góp vào truy cập mô hình trên toàn bộ mạng. Mô hình học sử dụng huấn luyện hạ gradient ngẫu nhiên sử dụng lan truyền ngược và các nơ-ron của lớp ẩn cho phép các đặc trưng nâng cao hơn như kích hoạt tanh, rectifier và maxout, tốc độ học, ủ tốc độ (rate annealing). Trong tất cả các phương pháp kích hoạt, maxout cho kết quả nổi bật nhất. Mô hình được đề xuất của chúng tôi đã sử dụng một lớp Đầu vào để nhập dữ liệu, một lớp đầu ra cho kết quả dự đoán và hai lớp ẩn để thực thi lặp bộ dữ liệu trong mạng nơ-ron DL như được biểu diễn trong Hình 5.

Tối ưu hóa mô hình hay thiết lập tham số là một trong những thách thức khó khăn nhất trong việc triển khai mô hình của học máy. Thông thường tối ưu hóa mô hình đề cập đến việc tối ưu hóa mã để giảm thiểu lỗi kiểm tra, tuy nhiên, học sâu tối ưu hóa mô hình của nó bằng cách điều chỉnh các phần tử nằm ngoài mô hình nhưng có ảnh hưởng lớn đến hành vi và phân loại của nó. Tiêu chí của các tập tham số linh hoạt và ẩn, do đó có các đặc trưng nâng cao như tốc độ học thích ứng (adaptive learning rate), độ chệch trung bình (mean bias), huấn luyện động lượng (momentum training), dropout, và điều chuẩn (regularization) L1 hoặc L2 đã được xem xét để giảm thiểu lỗi kiểm tra [23]. Một số tham số then chốt được thảo luận trong Bảng 2.

Tốc độ Học được gọi là mẹ của tất cả các siêu tham số, nó đo lường tốc độ tiến bộ học trong một mô hình để nó có thể được sử dụng để tối ưu hóa năng lực của nó. Tham số tiếp theo của một thuật toán học sâu là Số đơn vị Ẩn, nó là một tham số kinh điển trong các thuật toán học sâu, vì nó điều chỉnh năng lực biểu diễn của mô hình. Một tham số khác là Điều chuẩn L1 &amp; L2, là một tham số then chốt để ngăn chặn quá khớp (overfitting) trong mô hình. Một số phương pháp điều chuẩn được triển khai để tạo ra một mô hình ít phức tạp hơn và để giải quyết quá khớp, lựa chọn đặc trưng. Nếu một mô hình sử dụng kỹ thuật điều chuẩn L1 thì mô hình sẽ được gọi là Hồi quy Lasso (Lasso Regression) và mô hình sử dụng L2 được gọi là Hồi quy Ridge (Ridge Regression) [29].

Fig. 5 Mạng nơ-ron DL đa lớp được sử dụng làm mô hình dự đoán

Hồi quy Lasso (Least Absolute Shrinkage and Selection Operator) hay điều chuẩn L1 thêm 'giá trị tuyệt đối của độ lớn' của hệ số như một số hạng điều chuẩn vào hàm mất mát để tránh thiếu khớp (underfitting). Nó có thể được tính bằng (1) và một ưu điểm khác của Hồi quy Lasso là nó co các tham số ít quan trọng hơn về không để huấn luyện mô hình với các tham số quan trọng nhất.

Hồi quy Ridge hay điều chuẩn L2 thêm 'độ lớn bình phương' của hệ số như một số hạng điều chuẩn vào hàm mất mát. Điều này hoạt động tốt khi bộ dữ liệu có ít đặc trưng hơn trong bộ dữ liệu, do đó quá khớp phải được tránh trong khi huấn luyện và kiểm tra mô hình [30]. Hàm chi phí của hồi quy Ridge có thể được thiết kế sử dụng (2).

Table 2 Các tham số then chốt được sử dụng trong tối ưu hóa mô hình DL

|   Layers |   Units | Type      | Dropout   | L1       | L2       | Mean     | Momentum   | Mean Weight   | Weight RMS   | Mean Bias   | Bias RMS   |
|----------|---------|-----------|-----------|----------|----------|----------|------------|---------------|--------------|-------------|------------|
|        1 |       8 | Input     | 0.00%     | -        | -        | -        | -          | -             | -            | -           | -          |
|        2 |      50 | Rectifier | 0.00%     | 0.000010 | 0.000000 | 0.002799 | 0.000000   | 0.000422      | 0.193671     | 0.463731    | 0.052644   |
|        3 |      50 | Rectifier | 0.00%     | 0.000010 | 0.000000 | 0.015552 | 0.000000   | - 0.005877    | 0.145696     | 0.985745    | 0.024486   |
|        4 |       2 | Softmax   | -         | 0.000010 | 0.000000 | 0.001496 | 0.000000   | - 0.050042    | 0.430350     | 0.000000    | 0.004501   |

## Cây quyết định

DT là một đồ thị được sử dụng trong phân tích quyết định và minh họa kết quả như một quy tắc chia tách cho mỗi thuộc tính cụ thể. Nó là một đồ thị phân nhánh có thể được áp dụng một cách trực quan và rõ ràng cho kết quả ra quyết định. Mỗi thuộc tính được coi là một nút phân nhánh và xây dựng một quy tắc ở cuối nhánh chia các giá trị thuộc về các lớp khác nhau. Nó là một cấu trúc giống cây như tên gọi của nó và kết luận một số quyết định ở cuối được gọi là lá của cây. Gốc là thuộc tính tiềm năng nhất có thể được áp dụng để dự đoán kết quả của việc hình thành quy tắc. Một DT đơn giản và dễ triển khai, cùng với những ưu điểm này, nó dự đoán kết quả chính xác hơn [31]. Việc xây dựng các nút mới được lặp lại cho đến khi một điều kiện cơ sở chưa được đáp ứng. Thuộc tính nhãn lớp được xác quyết dựa trên giá trị tối đa của quy tắc, dẫn đến nút lá trong quá trình phân tích DT [32]. DT được xây dựng lộn ngược với gốc ở trên cùng nhưng các cây quyết định dễ bị quá khớp. Quá khớp là một vấn đề khi một cây trở nên quá thành thạo với dữ liệu và lá của nó cho thấy độ tạp chất tối thiểu, do đó tiền cắt tỉa (pre-pruning) là quá trình cắt các lá không đáng kể và có ý nghĩa cho việc xây dựng cây. Tiền cắt tỉa xác định rằng tiêu chí cơ sở phải lớn nhất hơn độ sâu của cây để tạo ra một mô hình DT. Hơn nữa, tiền cắt tỉa giúp tăng độ chính xác dự đoán. Một tiêu chí quan trọng khác cho việc chia DT là Độ lợi thông tin (Information gain), vốn phù hợp để chính xác hơn cho việc dự đoán kết quả từ tất cả các tiêu chí khác. Trong phương pháp này, entropy được tính cho mỗi thuộc tính và sau đó thuộc tính có entropy tối thiểu được chọn cho việc chia.

Vì cây quyết định chủ yếu là một mô hình phân loại, nên việc tối ưu hóa tham số trong cây quyết định là tìm kiếm tập các ràng buộc sẽ tối ưu hóa kiến trúc mô hình [33]. Các tham số cần điều chỉnh trong cây quyết định là độ sâu tối đa, tiêu chí, độ tin cậy, độ lợi tối thiểu, kích thước lá tối thiểu và kích thước tối thiểu cho một lần chia được thảo luận ở đây.

Tham số đầu tiên cần điều chỉnh trong một cây quyết định là tiêu chí. Tham số này điều chỉnh các tiêu chí mà trên đó độ tạp chất của một lần chia được đo lường và giá trị chia được tối ưu hóa cho mỗi tiêu chí liên quan đến tiêu chí được chọn. Vì tiêu chí chia có thể là độ lợi thông tin, tỷ lệ độ lợi và chỉ số Gini [34]. Chỉ số Gini và entropy của một cây quyết định được thiết kế sử dụng (3) và (4) để chọn tiêu chí chia tốt nhất. Cây quyết định được áp dụng đang sử dụng độ lợi thông tin cho tiêu chí chia, vì tất cả các ưu điểm của nó như đã giải thích.

Nhiều nhà nghiên cứu nói rằng các tiêu chí chia không tạo nhiều khác biệt về mặt hiệu suất cây vì mỗi tiêu chí có ưu điểm và nhược điểm riêng [34]. Một tham số tối ưu khác trong cây quyết định là Độ sâu Tối đa. Độ sâu của cây thay đổi tùy thuộc vào các đặc tính và kích thước của bộ dữ liệu. Cây càng sâu, nó sẽ càng có nhiều lần chia và nó sẽ thu thập nhiều thông tin hơn về dữ liệu. Do đó, theo bộ dữ liệu kích thước cây đã được thiết lập trong phạm vi 1 -20. Độ tin cậy có xu hướng là một tham số quan trọng khác của DT vốn xác định mức độ tin cậy được sử dụng cho việc tính toán độ bi quan cho quá trình cắt tỉa. Mức độ tin cậy được coi là 0.1 cho cây quyết định nêu trên.

## Naive Bayes

NB là một thuật toán phân loại có giám sát dựa trên DT [35] vốn chỉ khác nhau ở việc biểu diễn kết quả của nó. Trong khi DT cung cấp các quy tắc ở cuối, NB định nghĩa xác suất. Cả hai thuật toán đều được sử dụng cho mục đích dự đoán. Hơn nữa, NB cung cấp một xác suất có điều kiện. Ưu điểm chính của NB là nó có thể xử lý một bộ dữ liệu nhỏ và bộ phân loại phương sai thấp vượt qua cao của nó hoạt động sử dụng định lý Bayes và tìm tính khả thi của thuộc tính liên kết với một đối tượng bằng cách sử dụng thông tin quan trọng. Cùng với điều này, nó dễ triển khai và có chi phí tính toán thấp. Trong NB tất cả các giá trị thuộc tính độc lập với nhau, do đó, nó không tốn kém về tính toán và đơn giản hóa riêng biệt giả định và tính toán sử dụng (5). Trong bộ phân loại Naive Bayes việc điều chỉnh tham số và tối ưu hóa bị hạn chế [36].

## Mạng nơ-ron nhân tạo

ANN là một kỹ thuật khác cho phân loại vốn là một thuật toán học máy và cung cấp kết quả chính xác hơn so với các thuật toán hiện có. Nó là một mô hình toán học được lấy cảm hứng từ hoạt động và cấu trúc của các nơ-ron sinh học. Một mạng nơ-ron là một kết nối của nhiều nơ-ron được kết nối như não người là một kết nối của 86 tỷ nơ-ron sinh học. Tính kết nối chức năng trong các nơ-ron nhân tạo là tính kết nối dạng lưới và mỗi nơ-ron có trọng số bằng nhau [37]. Tính liên kết của các nơ-ron hoạt động trên nguyên tắc của cách tiếp cận liên kết (connectionist) (nguyên tắc của connectionist tuân theo rằng các hiện tượng tinh thần được mô tả bởi tính kết nối đơn giản và đồng nhất của các nơ-ron). Cùng với điều này ANN bao gồm một hoặc nhiều lớp ẩn xử lý thông tin thông qua các nơ-ron và mỗi nút hoạt động như một nút kích hoạt; nó phân loại kết quả của các nơ-ron nhân tạo để có kết quả tốt hơn. Phát hiện chính của một ANN

Table 3 Nghiên cứu so sánh các công trình nghiên cứu liên quan để phát hiện đái tháo đường với bộ dữ liệu Pima Indian

| Authors       | Methods                                               | Accuracy obtained (in %)   |
|---------------|-------------------------------------------------------|----------------------------|
| [40]          | Firefly and Cuckoo Search Algorithms                  | 81%                        |
| [41]          | Feedforward NN                                        | 82%                        |
| [42]          | NB                                                    | 79.56%                     |
| [43]          | SVM                                                   | 78%                        |
| [44]          | LDA - MWSVM                                           | 89.74%                     |
| [45]          | Neural Network with Genetic Algorithm                 | 87.46%                     |
| [46]          | K-means and DT                                        | 90.03%                     |
| [47]          | PCA, K-Means Algorithm                                | 72%                        |
| Proposed Work | DL,ANN,SVM and DT(Highest accuracy achieved using DT) | 98.07%                     |

| Table 4                        | Cây Quyết định (Độ chính xác: 96.62%)   | Cây Quyết định (Độ chính xác: 96.62%)   | Cây Quyết định (Độ chính xác: 96.62%)   |
|--------------------------------|------------------------------------|------------------------------------|------------------------------------|
| Actual Values Predicted Values | True No                            | True Yes                           | Class Precision                    |
| Predicted No                   | 137                                | 4                                  | 97.16%                             |
| Predicted yes                  | 3                                  | 63                                 | 95.45%                             |
| Class recall                   | 97.86%                             | 94.03%                             |                                    |

là nó tìm các mối quan hệ phức tạp giữa dữ liệu và rút ra các mẫu hữu ích [38].

Việc lựa chọn tham số và tối ưu hóa đóng một vai trò quan trọng trong một bộ phân loại. Do đó siêu tham số được chọn cho việc triển khai bộ phân loại này được thảo luận ở đây. Có Số lượng tham số có thể được tối ưu hóa để giảm lỗi huấn luyện, do đó các đơn vị ẩn trên mỗi lớp được chọn như một trong các tham số vốn xác định tên và kích thước của các lớp, và nó cho phép người dùng thiết lập cấu trúc của mạng nơ-ron. Hơn nữa, các lớp này phải được chọn một cách thực tế để tìm một điểm ngọt ngào giữa độ chệch cao và phương sai và cuối cùng, nó phụ thuộc vào kích thước dữ liệu được sử dụng cho huấn luyện. Do đó, theo dữ liệu huấn luyện, hai lớp ẩn đã được sử dụng để thiết lập cấu trúc được áp dụng của mạng nơ-ron. Tham số tiếp theo là Chu kỳ Huấn luyện vốn xác định số chu kỳ cần thiết cho việc huấn luyện mạng nơ-ron. Số chu kỳ huấn luyện được sử dụng trong mô hình được triển khai này là 500. Kỹ thuật tối ưu hóa tiếp theo là hạ gradient vốn tìm cực tiểu, kiểm soát phương sai và theo đó cập nhật các tham số của mô hình có thể được tính sử dụng (6).

Một tham số tối ưu khác của ANN là tốc độ học, nó thay đổi trọng số ở mỗi bước và chịu trách nhiệm cho các đặc tính học cốt lõi trong mô hình. Nó phải được chọn rất khôn ngoan vì tốc độ học quá cao có thể làm phức tạp việc lựa chọn cực tiểu và quá thấp có thể làm chậm tốc độ học. Nó phải được chọn theo lũy thừa của 10, cụ thể là 0.001, 0.01, 0.1,1. Giá trị của tốc độ học trong mô hình được thiết lập là 0.1.

Table 5 Naive Bayes (Độ chính xác: 76.33%)

| Actual Values Predicted Values   | True No   | True Yes   | Class Precision   |
|----------------------------------|-----------|------------|-------------------|
| Predicted No                     | 118       | 27         | 81.38%            |
| Predicted yes                    | 22        | 40         | 64.52%            |
| Class recall                     | 84.29%    | 59.70%     |                   |

| Table 6                        | Mạng Nơ-ron (Độ chính xác: 90.34%)   | Mạng Nơ-ron (Độ chính xác: 90.34%)   | Mạng Nơ-ron (Độ chính xác: 90.34%)   |
|--------------------------------|-------------------------------------|-------------------------------------|-------------------------------------|
| Actual Values Predicted Values | True No                             | True Yes                            | Class Precision                     |
| Predicted No                   | 128                                 | 8                                   | 94.12%                              |
| Predicted yes                  | 12                                  | 59                                  | 83.10%                              |
| Class recall                   | 91.43%                              | 88.06%                              |                                     |

## Kết quả và thảo luận

Trong công trình nghiên cứu này, các kết quả đạt được bằng cách áp dụng bốn thuật toán phân loại (DL, ANN, NB, và DL) để hiển thị độ chính xác tối đa trong dự đoán đái tháo đường. Từ bốn bộ phân loại này, DL và DT cung cấp độ chính xác hứa hẹn (98.07%) có thể được chứng minh là một công cụ nổi bật cho việc dự đoán đái tháo đường ở giai đoạn sớm. Trong hệ thống được đề xuất của chúng tôi, chúng tôi sử dụng bộ dữ liệu PIMA và áp dụng nó trên cách tiếp cận DL. Hơn nữa, nó có thể giúp người hành nghề chăm sóc sức khỏe và có thể là ước tính thứ hai cho việc cải thiện các quyết định phụ thuộc vào các đặc trưng được trích xuất [39]. Nhiều nhà nghiên cứu đã từng làm việc trên bộ dữ liệu PIMA với thuật toán đa dạng để dự đoán đái tháo đường. Do đó công trình của một số nhà nghiên cứu đã được thể hiện với các phương pháp được áp dụng của họ và độ chính xác đạt được. Bảng 3 cho thấy tất cả các công trình hứa hẹn được thực hiện trên bộ dữ liệu Pima cho đến nay và phương pháp được đề xuất của chúng tôi đạt độ chính xác cao nhất tức là 98.7 trên bộ dữ liệu PIMA Indian.

Độ chính xác phân loại có thể được mô tả là 'tỷ lệ phần trăm của dự đoán đúng' hay nó là tổng của dương tính thật và âm tính thật chia cho tổng giá trị lớp được dự đoán, nó có thể được tính sử dụng (7).

Ở đây X biểu thị độ chính xác phân loại, t là số phân loại đúng và n là tổng số mẫu. Khi một mô hình mạnh mẽ đã được đề xuất, độ chính xác đơn thuần không đủ để quyết định liệu mô hình có đủ tốt để giải quyết vấn đề hay không. Do đó cần các thước đo bổ sung để đánh giá hiệu suất của bộ phân loại. Do đó các thước đo bổ sung này là Độ thu hồi lớp (Class recall), độ chuẩn xác lớp (class precision), và F-measure. Độ thu hồi lớp có thể được mô tả là số thuộc tính được phân loại đúng. Nó có thể được giải thích theo một cách khác, rằng nó là số tổng dự đoán dương tính chia cho số tổng giá trị lớp dương tính, Nó cũng có thể được gọi là Độ nhạy (Sensitivity) hay Tỷ lệ Dương tính Thật (True Positive Rate) như được biểu diễn trong (8).

Table 7 Học sâu (Độ chính xác: 98.07%)

| Actual Values Predicted Values   | True No   | True Yes   | Class Precision   |
|----------------------------------|-----------|------------|-------------------|
| Predicted No                     | 139       | 3          | 97.89%            |
| Predicted yes                    | 1         | 64         | 98.46%            |
| Class recall                     | 99.29%    | 95.52%     |                   |

Table 8 Đánh giá Hiệu suất của các kỹ thuật Dự đoán Đái tháo đường

| Measures        | Methods   | Methods   | Methods   | Methods   |
|-----------------|-----------|-----------|-----------|-----------|
|                 | DL        | DT        | ANN       | NB        |
| Accuracy (%)    | 98.07     | 96.62     | 90.34     | 76.33     |
| Precision (%)   | 95.22     | 94.02     | 88.05     | 59.07     |
| Recall (%)      | 98.46     | 95.45     | 83.09     | 64.51     |
| F-Measure (%)   | 96.81     | 94.72     | 85.98     | 61.67     |
| Specificity (%) | 99.29     | 97.86     | 91.43     | 84.29     |
| Sensitivity (%) | 95.52     | 94.03     | 88.06     | 59.70     |

Thước đo thứ hai cho đánh giá hiệu suất là Độ chuẩn xác Lớp, Nó có thể được định nghĩa là tổng của dương tính thật và âm tính thật. Theo một cách khác, nó là số dự đoán Dương tính Thật chia cho số Dương tính Thật và Dương tính Giả như được hiển thị sử dụng (9).

Một thước đo khác cho đánh giá hiệu suất là F-measure hay F-score, nó truyền tải sự cân bằng giữa độ thu hồi và dự đoán. Công thức để biểu diễn F-score được cho như (10).

Độ chính xác đạt được thông qua các bộ phân loại đa dạng được hiển thị bên dưới bởi ma trận nhầm lẫn (confusion matrix) bao gồm độ chuẩn xác lớp, dự đoán đái tháo đường có, dự đoán đái tháo đường không, độ thu hồi lớp. Một thước đo hiệu suất khác có thể là Độ đặc hiệu (Specificity), là tỷ lệ các giá trị không có bệnh mà có kết quả âm tính. Dưới dạng xác suất, ký hiệu Độ nhạy có thể được tính sử dụng (11).

Bảng 4 biểu diễn ma trận nhầm lẫn thu được thông qua việc phân tích DT với độ chính xác 96.62%.

Bảng 5 cho thấy các kết quả của Bộ phân loại Naive Bayes có độ chính xác 76.33%.

Bảng 6 cho thấy các kết quả của Mạng Nơ-ron có độ chính xác 90.34%.

Bảng 7 cho thấy độ chính xác của kiến trúc học sâu ở mức 98.07%.

Bảng 8 biểu diễn bốn thước đo hiệu suất (Accuracy, Precision, Recall, F-measure) cho tất cả các thuật toán phân loại được áp dụng cho bộ dữ liệu PIMA để dự đoán đái tháo đường. Điều này cho biết rằng DL vượt trội trong tất cả các tham số hiệu suất và cung cấp kết quả tốt nhất cho việc khởi phát đái tháo đường với độ chính xác 98.07%. Hình 6 và 7 cho thấy sự so sánh giữa các ma trận hiệu suất của kỹ thuật dự đoán đái tháo đường.

Như được hiển thị trong các Hình 6 và 7 nêu trên DL cung cấp độ chính xác cao nhất trong tất cả các thuật toán và được chứng minh là thuật toán bộ phân loại tốt nhất cho dự đoán đái tháo đường. Độ chính xác 98.07% đã đạt được trên bộ dữ liệu PIMA vốn là độ chính xác cao nhất thu được cho đến nay. Độ chính xác tối đa có thể đạt được bằng việc thu thập dữ liệu hệ quả và đáng kể. Những thuộc tính không đóng góp cho kết quả phân loại nên được cắt tỉa. Trong nghiên cứu này, chúng tôi có một số sự thật về thuật toán phân loại rằng độ lợi thông tin cho kết quả tốt hơn trong bộ phân loại DT và kích hoạt nên là maxout tại thời điểm hoạt động trong DL để có kết quả tốt hơn.

Fig. 6 So sánh Độ chính xác, Độ nhạy và Độ đặc hiệu cho các Phương pháp Phân loại Khác nhau

Fig. 7 So sánh Độ chính xác, Độ chuẩn xác, Độ thu hồi và F-score cho các Phương pháp Phân loại Khác nhau

## Tuân thủ các tiêu chuẩn đạo đức

Xung đột lợi ích Các tác giả tuyên bố rằng họ không có xung đột lợi ích nào.

Nghiên cứu liên quan đến người tham gia là con người và/hoặc động vật Không có sự tham gia trực tiếp của con người trong bản thảo.

Sự đồng thuận có hiểu biết Sự đồng thuận có hiểu biết đã được thu thập từ tất cả các cá nhân tham gia liên quan đến nghiên cứu.

## Tài liệu tham khảo

1. 'Global Report on Diabetes, 2016'. Available at: https://apps.who.int/ iris/bitstream/handle/10665/204871/9789241565257\_eng.pdf; jsessionid=2BC28035503CFAFF295E70CFB4A0E1DF?Sequence=1.
2. 'Diabetes: Asia's 'silent killer'', November 14, 2013'. Available at: www.bbc.com/news/world-asia-24740288.
3. Mathers CD, Loncar D. Projections of global mortality and burden of disease from 2002 to 2030. 2015;3(11). https://doi.org/10.1371/ journal.pmed.0030442.
4. Swapna G, Vinayakumar R, Soman KP. Diabetes detection using deep learning algorithms. ICT Express. 2018;4(4):243 -6. https:// doi.org/10.1016/j.icte.2018.10.005. Elsevier B.V .
5. Wu H, et al. Type 2 diabetes mellitus prediction model based on data mining. Informatics in Medicine Unlocked. 2018;10:100 -7. https://doi.org/10.1016/j.imu.2017.12.006. Elsevier Ltd.
6. Emerging T, Factors R. Diabetes mellitus , fasting blood glucose concentration , and risk of vascular disease : a collaborative metaanalysis of 102 prospective studies. The Lancet. 2010;375(9733): 2215 -22. https://doi.org/10.1016/S0140-6736(10)60484-9 Elsevier Ltd.
7. Palaniappan S, Awang R. Intelligent heart disease prediction system using data mining techniques. 2008 IEEE/ACS International

## Kết luận và công trình tương lai

Bài báo này nhằm triển khai một mô hình dự đoán để đo lường nguy cơ của đái tháo đường. Như đã thảo luận trước đó, một phần lớn dân số loài người đang nằm trong sự kìm kẹp của bệnh đái tháo đường. Nếu vẫn không được điều trị, thì nó sẽ tạo ra một nguy cơ khổng lồ cho thế giới. Do đó Trong nghiên cứu được đề xuất của chúng tôi, chúng tôi đã áp dụng vào thực tế các bộ phân loại đa dạng trên bộ dữ liệu PIMA và chứng minh rằng thuật toán khai phá dữ liệu và học máy có thể giảm các yếu tố nguy cơ và cải thiện kết quả về mặt hiệu quả và độ chính xác. Kết quả đạt được trên bộ dữ liệu PIMA Indian cao hơn các phương pháp luận được đề xuất khác trên cùng bộ dữ liệu sử dụng các thuật toán khai phá dữ liệu như đã thảo luận trong Bảng 1. Độ chính xác đạt được bởi bốn bộ phân loại (DT, ANN, NB, và DL) nằm trong phạm vi 90 -98% vốn cao đáng kể so với các phương pháp sẵn có. Trong số bốn bộ phân loại được đề xuất, DL được coi là hiệu quả và hứa hẹn nhất để phân tích đái tháo đường với tỷ lệ chính xác 98.07%. Trong tương lai, chúng tôi dự định phát triển một hệ thống mạnh mẽ dưới dạng một ứng dụng hoặc một trang web có thể sử dụng thuật toán DL được đề xuất để giúp các chuyên gia chăm sóc sức khỏe trong việc phát hiện sớm đái tháo đường.

- Conference on Computer Systems and Applications 2008;108 -15. https://doi.org/10.1109/AICCSA.2008.4493524.
8. Huang CL, Chen MC, Wang CJ. Credit scoring with a data mining approach based on support vector machines. Expert Syst Appl. 2007;33(4):847 -56. https://doi.org/10.1016/j.eswa.2006.07.007.
9. Zhang LM. Genetic deep neural networks using different activation functions for financial data mining. In: Proceedings - 2015 IEEE International Conference on Big Data, IEEE Big Data 2015; 2015. p. 2849 -51. https://doi.org/10.1109/BigData.2015.7364099.
10. Grundy SM. Obesity, Metabolic Syndrome , and Cardiovascular Disease. 2004;89(6):2595 -600. https://doi.org/10.1210/jc.2004-0372.
11. Palaniappan S. Intelligent heart disease prediction system using data mining techniques, (march 2008). 2017. https://doi.org/10.1109/ AICCSA.2008.4493524.
12. Craven MW, Shavlik JW. Using neural networks for data mining. Futur Gener Comput Syst. 1997;13(2 -3):211 -29. https://doi.org/ 10.1016/s0167-739x(97)00022-8.
13. Radhimeenakshi S. Classification and prediction of heart disease risk using data mining techniques of support vector machine and artificial neural networks. In: 2016 International Conference on Computing for Sustainable Global Development (INDIACom); 2016;3107 -11.
14. El-Jerjawi NS, Abu-Naser SS. Diabetes prediction using artificial neural network. International Journal of Advanced Science and Technology. 2018;121:55 -64. https://doi.org/10.14257/ijast.2018.121.05.
15. Perveen S, Shahbaz M, Keshavjee K, Guergachi A. Metabolic syndrome and development of diabetes mellitus: predictive modeling based on machine learning techniques, IEEE Access. IEEE. 2019;7: 1365 -75. https://doi.org/10.1109/ACCESS.2018.2884249.
16. Perveen S, et al. Performance analysis of data mining classification techniques to predict diabetes. Procedia Computer Science. 2016;82:115 -21. https://doi.org/10.1016/j.procs.2016.04.016 Elsevier Masson SAS.
17. Barakat N, Bradley AP, Barakat MNH. Intelligible support vector machines for diagnosis of diabetes mellitus. IEEE Trans Inf Technol Biomed. 2010;14(4):1114 -20. https://doi.org/10.1109/TITB.2009. 2039485.
18. Ravizza S, Huschto T, Adamov A, Böhm L, Büsser A, Flöther FF, et al. Predicting the early risk of chronic kidney disease in patients with diabetes using real-world data. Nature Medicine. 2019;25(1): 57 -9. https://doi.org/10.1038/s41591-018-0239-8. Springer US.
19. Miotto R, Wang F, Wang S, Jiang X, Dudley JT. Deep learning for healthcare: review, opportunities and challenges. Brief Bioinform. 2017;19(6):1236 -46. https://doi.org/10.1093/bib/bbx044.
20. Alade OM, Sowunmi OY. Information technology science. 2018;724:14 -22. https://doi.org/10.1007/978-3-319-74980-8.
21. Carrera EV, Carrera R. Automated detection of diabetic retinopathy using SVM, 2017. pp. 6 -9.
22. Huang YP, Nashrullah M. SVM-based decision tree for medical knowledge representation. In: 2016 International Conference on Fuzzy Theory and Its Applications, iFuzzy 2016; 2017. https:// doi.org/10.1109/iFUZZY.2016.8004949.
23. Young SR, et al. Optimizing deep learning hyper-parameters through an evolutionary algorithm, (November). 2015. https://doi. org/10.1145/2834892.2834896.
24. 'Machine Learning: Pima Indians Diabetes', April 14, 2018. Available at: https://www.andreagrandi.it/2018/04/14/machinelearning-pima-indians-diabetes/.
25. Anderson KM, et al. Cardiovascular disease risk profiles. American Heart Journal. 1991;121(1 PART 2):293 -8.
26. Kim JK, Kang S. Neural network-based coronary heart disease risk prediction using feature correlation analysis. Journal of healthcare engineering. 2017;2017(2017):1 -13.
27. Mierswa I, et al. YALE : rapid prototyping for complex data mining tasks. 2006.
28. Davazdahemami B, Delen D. The confounding role of common diabetes medications in developing acute renal failure: a data mining approach with emphasis on drug-drug interactions. Expert Systems with Applications. 2019;123:168 -77. https://doi.org/10. 1016/j.eswa.2019.01.006. Elsevier Ltd.
29. 'Intuitions on L1 and L2 Regularisation, Dec 26, 2018'. Available at: https://towardsdatascience.com/intuitions-on-l1-and-l2regularisation-235f2db4c261.
30. 'Lasso and Ridge Regularization, May 18, 2017'. Available at: https://medium.com/@dk13093/lasso-and-ridge-regularization7b7b847bce34.
31. Design L, et al. Pipe failure modelling for water distribution networks using boosted decision trees. Structure and Infrastructure Engineering. 2018;14(10):1402 -11. Taylor &amp; Francis.
32. Pei D, et al. Identification of potential type II diabetes in a Chinese population with a sensitive decision tree approach. Journal of Diabetes Research. 2019;2019:1 -7. https://doi.org/10.1155/2019/4248218.
33. Mantovani RG. An empirical study on hyperparameter tuning of decision trees ' arXiv : 1812 . 02207v2 [ cs . LG ]. 2019.
34. Raileanu LE, Stoffel K. Theoretical comparison between the Gini index and information gain criteria, (2100), pp. 77 -93. 2004.
35. Jaafari A, Zenner EK, Thai B. Wildfire spatial pattern analysis in the Zagros Mountains , Iran : A comparative study of decision tree based classifiers. Ecological informatics. 2018;43(2018):200 -11.
36. Supian S, Wahyuni S. Optimization of candidate selection using naive bayes: case study in Company X. 2018.
37. Amato F, et al. Artificial neural networks in medical diagnosis. 2013:47 -58. https://doi.org/10.2478/v10136-012-0031.
38. Fayyad U, Piatetsky-shapiro G, Smyth P. From data mining to knowledge discovery in databases. AI Mag. 1996;17(3):37 -54.
39. Masih N, Ahuja S. Prediction of heart diseases using data mining techniques: application on Framingham heart study. International Journal of Big Data and Analytics in Healthcare (IJBDAH). 2018;3(2):1 -9.
40. Haritha R, Babu DS, Sammulal P. A Hybrid Approach for Prediction of Type-1 and Type-2 Diabetes using Firefly and Cuckoo Search Algorithms. 2018;13(2):896 -907.
41. Zhang Y, et al. A feed-forward neural network model for the accurate prediction of diabetes mellitus. International Journal of Scientific and Technology Research. 2018;7(8):151 -5. Available at: https://www. scopus.com/inward/record.uri?eid=2-s2.085059910862&amp;partnerID= 40&amp;md5=40cdc4d37e47645feb76229e7b9c9dfd.
42. Iyer A, Jeyalatha S, Sumbaly R. Diagnosis of diabetes using classification mining techniques. arXiv preprint arXiv: 1502.03774. 2015.
43. Kumari VA, Chitra R. Classification of diabetes disease using support vector machine. Int J Eng Res Appl. 2013;3(2):1797 -801.
44. Çali ş ir D, Do ǧ antekin E. An automatic diabetes diagnosis system based on LDA-wavelet support vector machine classifier. Expert Syst Appl. 2011;38(7):8311 -5. https://doi.org/10.1016/j.eswa.2011.01.017.
45. Mohammad S, Dadgar H, Kaardaan M. A Hybrid Method of Feature Selection and Neural Network with Genetic Algorithm to Predict Diabetes. 2017;7(24):3397 -404.
46. Chen W, et al. A hybrid prediction model for type 2 diabetes using K-means and decision tree. In: Proceedings of the IEEE International Conference on Software Engineering and Service Sciences, ICSESS, 2017-Novem(61272399); 2018. p. 386 -90. https://doi.org/10.1109/ICSESS.2017.8342938.
47. Patil RN, Patil RN. International Journal of Computer Engineering and Applications , A novel scheme for predicting type 2 diabetes in women : using K-means with PCA as dimensionality reduction. International Journal of Computer Engineering and Applications. n.d.;XI(Viii):76 -87.

Publisher ' s note Springer Nature vẫn giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ được xuất bản và các liên kết tổ chức.
