<!-- extracted by pdf-extract | engine=docling | pages=17 | ocr=False | tables=9/9 | density=1.01 | score=100 -->

## BÀI BÁO NGHIÊN CỨU

## Phân loại Đái tháo đường dựa trên Lấy mẫu quá mức Ngẫu nhiên (Random Oversampling) thông qua các Thuật toán Học máy

G. R. Ashisha 1 · X. Anitha Mary 2 · E. Grace Mary Kanaga 3 · J. Andrew 4 · R. Jennifer Eunice 5

Nhận: 12 July 2024 / Chấp nhận: 10 October 2024 © (Các) Tác giả 2024

## Tóm tắt

Đái tháo đường được xem là một trong những nguyên nhân chính gây tử vong trên toàn thế giới. Nếu đái tháo đường không được điều trị và chẩn đoán sớm hơn, nó có thể gây ra một số vấn đề sức khỏe khác, như bệnh thận, bệnh thần kinh, các vấn đề về thị lực, và các vấn đề về não. Phát hiện sớm đái tháo đường giảm chi phí chăm sóc sức khỏe và giảm thiểu khả năng xảy ra các biến chứng nghiêm trọng. Trong công trình này, chúng tôi đề xuất một mô hình chẩn đoán điện tử (e-diagnostic) cho phân loại đái tháo đường thông qua một thuật toán học máy có thể được thực thi trên Internet vạn vật Y tế (IoMT). Nghiên cứu sử dụng và phân tích hai bộ dữ liệu chuẩn (benchmarking), PIMA Indian Diabetes Dataset (PIDD) và bộ dữ liệu đái tháo đường Behavioral Risk Factor Surveillance System (BRFSS), để phân loại đái tháo đường. Mô hình được đề xuất gồm phương pháp random oversampling để cân bằng dải các lớp, kỹ thuật phát hiện điểm ngoại lai dựa trên khoảng tứ phân vị (interquartile range) để loại bỏ dữ liệu ngoại lai, và thuật toán Boruta để lựa chọn các đặc trưng tối ưu từ các bộ dữ liệu. Cách tiếp cận được đề xuất xét các thuật toán ML như random forest, gradient boosting models, light gradient boosting classifiers, và decision trees, vì chúng là các thuật toán phân loại được dùng rộng rãi cho dự đoán đái tháo đường. Chúng tôi đánh giá tất cả bốn thuật toán ML qua các chỉ số hiệu năng như accuracy, F 1 score, recall, precision, và AUC-ROC. Phân tích so sánh của mô hình này gợi ý rằng thuật toán random forest vượt trội hơn tất cả các bộ phân loại còn lại, với độ chính xác lớn nhất 92% trên bộ dữ liệu đái tháo đường BRFSS và 94% độ chính xác trên bộ dữ liệu PIDD, lớn hơn 3% độ chính xác được báo cáo trong nghiên cứu hiện có. Nghiên cứu này hữu ích để hỗ trợ các bác sĩ chuyên khoa đái tháo đường trong việc phát triển các phác đồ điều trị chính xác cho các bệnh nhân đái tháo đường.

Từ khóa Kỹ thuật Boruta · Khoảng tứ phân vị (Interquartile range) · Light gradient boosting classifier · Random forest · Random oversampling

* X. Anitha Mary anithamary@karunya.edu
* J. Andrew andrew.j@manipal.edu
- G. R. Ashisha ashisha@karunya.edu
- E. Grace Mary Kanaga grace@karunya.edu
- R. Jennifer Eunice jennifer.r@manipal.edu
- 1 Department of Electronics and Instrumentation Engineering, Karunya Institute of Technology and Sciences, Coimbatore, Tamil Nadu, India
- 2 Department of Robotics Engineering, Karunya Institute of Technology and Sciences, Coimbatore, Tamil Nadu, India
- 3 Department of Computer Science Engineering, Karunya Institute of Technology and Sciences, Coimbatore, Tamil Nadu, India
- 4 Department of Computer Science Engineering, Manipal Institute of Technology, Manipal Academy of Higher Education, Manipal, Karnataka, India
- 5 Department of Mechatronics Engineering, Manipal Institute of Technology, Manipal Academy of Higher Education, Manipal, Karnataka, India

## 1  Giới thiệu

Đái tháo đường là một bệnh mạn tính âm thầm ảnh hưởng đến những người không có đủ hormone insulin hoặc khi các tế bào cơ thể phát triển sự kháng insulin. Insulin là một hormone được sinh ra bởi một tuyến nằm dưới dạ dày gọi là tuyến tụy. Insulin là thiết yếu để kiểm soát mức đường huyết vì nó giúp các tế bào hấp thu glucose từ dòng máu để nó có thể được dùng ngay cho năng lượng hoặc lưu trữ cho việc dùng trong tương lai. Khi mức đường huyết tăng theo thời gian mà không được kiểm soát (đái tháo đường), cơ thể trải qua các vấn đề sức khỏe nghiêm trọng như mất chi dưới, nhìn mờ, bệnh tim, và đột quỵ [1].

Cụ thể, có ba dạng đái tháo đường. Đái tháo đường Type 1 (T1D) là một trạng thái nơi tuyến tụy hoặc không sinh ra insulin hoặc không thể sinh ra đủ insulin. Đái tháo đường Type 1 phổ biến hơn ở trẻ em và người trẻ. Nếu bệnh nhân T1D ở nguy cơ rất cao, họ sẽ cần sự chăm sóc y tế chuyên sâu [2]. Đái tháo đường Type 2 (T2D) là một trạng thái trong đó insulin được sản xuất không thể giữ mức đường huyết ổn định khắp cơ thể, và nó phổ biến nhất xảy ra ở các cá nhân trên 40 tuổi. Loại đái tháo đường phổ biến nhất là T2D, chiếm 90-95% tất cả các trường hợp đái tháo đường đã được chẩn đoán trên toàn thế giới [3]. Một dạng đái tháo đường khác được gọi là 'đái tháo đường thai kỳ' xảy ra khi các mô của cơ thể không phản ứng với insulin, mặc dù tuyến tụy sinh ra các mức insulin bình thường. Nếu đái tháo đường thai kỳ không được điều trị, nó có thể tăng khả năng phát triển T2D trong tương lai [4]. Theo Tổ chức Y tế Thế giới (WHO), năm 2019, tỷ lệ tử vong được ước tính khoảng 1.9 triệu vì đái tháo đường, và đái tháo đường được xem là nguyên nhân chính gây tử vong trên toàn cầu [1]. Liên đoàn Đái tháo đường Quốc tế (IDF) báo cáo rằng số cá nhân bị ảnh hưởng bởi đái tháo đường sẽ tăng lên 783 triệu vào năm 2045 [5]. Do đó, có thể phân loại và ước tính khả năng đái tháo đường, điều này có thể giảm đáng kể chi phí chăm sóc sức khỏe [6]. Trong các tình huống như vậy, một sự tích hợp của Internet vạn vật Y tế (IoMT) và các thuật toán học máy (ML) có thể sẵn sàng để giúp các chuyên gia y tế phát hiện và chẩn đoán đái tháo đường sớm hơn bằng cách cung cấp các công cụ dự đoán để cho phép việc ra quyết định nhanh hơn và hiệu quả hơn.

Mục tiêu của nghiên cứu này là tạo ra một ứng dụng IoMT có thể phân loại đái tháo đường thông qua một mô hình chẩn đoán điện tử (e-diagnosis). Các mô hình trí tuệ nhân tạo (AI) được dùng rộng rãi để xây dựng các mô hình phân loại bằng dữ liệu y tế. ML là một nhánh của AI tập trung vào thiết kế các thuật toán ML có khả năng xử lý các nhiệm vụ thách thức như phân loại, dự đoán, hoặc đánh giá lượng dữ liệu khổng lồ. Các nghiên cứu gần đây [7-9] đã đề xuất nhiều thuật toán ML để phân loại dữ liệu đái tháo đường, như decision tree

(DT), logistic regression (LR), và các bộ phân loại XGBoost (XGB) [8, 9]. Tuy nhiên, các DT đạt độ chính xác thấp hơn vì sự mất cân bằng dữ liệu và thiếu một thuật toán lựa chọn đặc trưng. Thuật toán LR nhạy với dữ liệu mất cân bằng, nơi một lớp có nhiều mẫu hơn lớp kia nhiều, dẫn đến độ chính xác kém đối với dữ liệu. Nếu dữ liệu chứa các điểm ngoại lai và các giá trị thiếu, phương pháp LR có thể dẫn đến phân loại không chính xác. Độ chính xác của bộ phân loại XGBoost bị tác động bởi chất lượng kém của dữ liệu được thu thập từ các nguồn không đồng nhất, dẫn đến độ chính xác mô hình kém.

Ngoài các vấn đề trên, các bộ dữ liệu rất mất cân bằng, với mức độ thiên lệch cao về một lớp cụ thể. Do đó, cân bằng dữ liệu và xử lý dữ liệu thiếu là các bước quan trọng. Hơn nữa, tiền xử lý dữ liệu liên quan đến việc xử lý dữ liệu thiếu sao cho nó không đưa thiên lệch vào các kết quả. Do đó, công trình giải quyết khía cạnh quan trọng này bằng cách xử lý hiệu quả các giá trị thiếu và dữ liệu ngoại lai qua việc quy đổi (imputation) bằng trung bình và các kỹ thuật tứ phân vị (IQR) tương ứng. Quy đổi bằng trung bình là một kỹ thuật đơn giản không có ước tính phức tạp, và nó cho phép tiền xử lý dữ liệu nhanh. Kỹ thuật phát hiện điểm ngoại lai IQR được giới thiệu trong công trình này để xử lý các điểm ngoại lai trong dữ liệu sao cho nó có thể loại bỏ tất cả các phân phối phi chuẩn trong bộ dữ liệu. Ngoài ra, random oversampling được thêm vào để giải quyết dữ liệu mất cân bằng lớp và để tăng độ chính xác của mô hình. Các kỹ thuật này có thể nâng cao hiệu năng tổng thể của hệ thống và giúp đạt được độ chính xác tốt hơn.

Mặc dù các thuật toán ML phổ biến trong các lĩnh vực chăm sóc sức khỏe, tỷ lệ ứng dụng lâm sàng thực tế của chúng khá thấp vì thiếu sự giải thích các đặc trưng có ý nghĩa và cách mà việc lựa chọn các đặc trưng tác động đến hiệu năng của mô hình qua trích xuất đặc trưng.

Các đóng góp của nghiên cứu này như sau:

- Tập trung vào việc loại bỏ các giá trị thiếu và xử lý các điểm ngoại lai qua các kỹ thuật quy đổi và IQR tương ứng
- Các đặc trưng có ý nghĩa được lựa chọn bằng cách giới thiệu các thuật toán PCA và Boruta.
- Bốn mô hình ML khác nhau, light gradient boosting method, gradient boosting algorithm, RF, và bộ phân loại DT, được đề xuất để phân loại đái tháo đường.
- Một khung ML mới cho phân loại đái tháo đường đã được thiết kế.

Phần còn lại của bài báo được cấu trúc như sau. Mục 2 trình bày công trình liên quan dựa trên các kỹ thuật ML dự đoán cho phân loại đái tháo đường và việc dùng các kỹ thuật boosting để cải thiện hiệu năng mô hình. Mục 3 trình bày các chi tiết của các bộ dữ liệu chuẩn PIMA và BRFSS và trình bày phân tích phân bố dữ liệu. Mục 4 mô tả cách tiếp cận được đề xuất, nơi các kỹ thuật IQR và random oversampling được trình bày. Mục 5 trình bày phân tích hiệu năng của các bộ dữ liệu trên trên các tham số được chọn, với một phân tích so sánh với các cách tiếp cận trước đó, và cuối cùng, Mục 6 trình bày kết luận và phạm vi tương lai của công trình.

## 2    Công trình Liên quan

Việc dùng Internet vạn vật (IoT) trong ngành y tế đề cập đến Internet vạn vật Y tế. IoMT liên kết các thiết bị y tế và các ứng dụng liên quan của chúng với công nghệ thông tin chăm sóc sức khỏe (IT). Tiến bộ này đã chuyển đổi lĩnh vực y tế với mô hình chăm sóc y tế từ xa sáng tạo của nó bằng các lợi thế xã hội và chẩn đoán chính xác [6]. Việc thu được từ tính toán liên tục của IoT làm cho việc đạt được các mục tiêu chăm sóc sức khỏe như dữ liệu lâm sàng, đơn thuốc, thiết bị y tế, và các điều trị trở nên đơn giản hơn. Sự tăng trưởng của IoMT đã chuyển đổi đáng kể việc quản lý bệnh, cải thiện các cách tiếp cận chẩn đoán và điều trị bệnh, và giảm chi phí và sai sót chăm sóc sức khỏe. Tính hữu ích của IoMT đang tăng như một hệ quả của sự nổi lên hiệp đồng của AI. Tuy nhiên, một trong những biến chứng lớn do tiến bộ mà nhiều học giả đã đối mặt là việc sinh dữ liệu. Do khối lượng dữ liệu khổng lồ được thu thập qua công nghệ ML, vốn xuất sắc trong phân tích, diễn giải, và trích xuất thông tin hữu ích từ lượng dữ liệu lớn, dữ liệu có thể được hiển thị.

Cụ thể, sự tích hợp của AI và IoMT có thể cung cấp hai lợi thế cho việc phát hiện và quản lý các bệnh mạn tính. Lợi thế thứ nhất là một mô hình chẩn đoán điện tử được hỗ trợ bởi AI đánh giá và phân loại hiệu quả dữ liệu bệnh nhân được thu thập trong IoMT để tạo ra chẩn đoán ban đầu. Nó cũng có thể hỗ trợ chẩn đoán cuối cùng của bác sĩ và việc lập kế hoạch điều trị. Một lợi thế khác là công nghệ chẩn đoán điện tử này cho phép giám sát và theo dõi bệnh nhân từ xa cho những người mắc bệnh mạn tính. Hình 1 cho thấy một công nghệ chẩn đoán điện tử cho phân loại đái tháo đường ở các bệnh nhân IoMT. Hệ thống này dùng công nghệ ML để phân loại đái tháo đường bằng dữ liệu bệnh nhân, cung cấp cho các bác sĩ một chẩn đoán ban đầu, và cung cấp cho các bệnh nhân phản hồi về các khuyến nghị của bác sĩ về giám sát đường huyết và chế độ ăn. Hơn nữa, IoMT tạo thuận lợi cho khả năng tương tác của thiết bị y tế, các ứng dụng, và các hệ thống, như được mô tả ở phía bên trái của Hình 1. Kết quả là, bất kể họ là các bệnh viện nông thôn hay các tổ chức chăm sóc sức khỏe lớn, các bác sĩ từ nhiều tổ chức chăm sóc sức khỏe khác nhau có thể chia sẻ và đánh giá dữ liệu của các bệnh nhân từ xa qua internet. Điều này cho phép giảm đáng kể số hồ sơ y tế và loại bỏ nhu cầu bệnh nhân phải đến cùng một bệnh viện hoặc thậm chí cho các cuộc hẹn tiếp theo trực tiếp.

Một số nghiên cứu đã dùng ML hoặc AI để dự đoán đái tháo đường. Trong mục này, chúng tôi trình bày các mô hình ML khác nhau được dùng cho dự đoán đái tháo đường. Mô hình dự đoán T2D [7] được triển khai trên một bộ dữ liệu dân số Hàn Quốc. Các thuộc tính có ý nghĩa được lựa chọn qua thuật toán lựa chọn đặc trưng hướng-dữ-liệu. Các đặc trưng này được dùng trong XGBoost, RF, và LR để thiết kế mô hình dự đoán. Sau khi mô hình được kiểm tra, một độ chính xác tối đa 73% đạt được qua thuật toán RF. Kandhasamy và cộng sự [8] so sánh hiệu suất của K-nearest neighbors, bộ phân loại random forest (RF), máy vector hỗ trợ (SVM), và bộ phân loại J48 DT. Họ dùng dữ liệu của California University cho nghiên cứu. Trong số tất cả các kỹ thuật khác, thuật toán J48 DT hoạt động tốt, với độ chính xác 73.82%. Mohamed Ahmed [9] giới thiệu một mô hình dự đoán đái tháo đường dựa trên naïve Bayes (NB), một thuật toán logistic, và thuật toán J48. Nghiên cứu này dùng dữ liệu thời gian thực từ các bệnh viện Hoa Kỳ để tiến hành khảo sát. Mô hình được huấn luyện bằng ba kích thước dữ liệu huấn luyện: 50%, 65%, và 80%. Đối với 80% dữ liệu huấn luyện, độ chính xác tối đa 74.4% đạt được qua thuật toán LR.

Hình 1 Công nghệ chẩn đoán điện tử cho phân loại đái tháo đường ở các bệnh nhân IoMT

Về tiền xử lý dữ liệu, Azrar và cộng sự [10] dùng một số kỹ thuật khai phá dữ liệu, như thay thế các giá trị thiếu bằng trung bình và chuyển đổi dữ liệu thành các dạng phân loại để tiền xử lý. Sau khi ba thuật toán dự đoán khác nhau được phân tích, thuật toán DT tạo ra một độ chính xác tối đa 75.65%. Trong dự đoán đái tháo đường, các thuật toán dựa trên ontology được xét bởi các tác giả trong Tài liệu [10], và họ đạt được một độ chính xác dự đoán 77.5%, vượt qua SVM, NB, LR, và các thuật toán DT [11]. Các thuật toán trích xuất đặc trưng như phân cụm k-means, phân tích thành phần chính (PCA), và xếp hạng tầm quan trọng đặc trưng được thực hiện trên PIMA Indian Diabetes Dataset (PIDD) [12]. Các độ chính xác dự đoán của RF, NB, và J48 DT được kiểm tra trên cơ sở 3 đặc trưng có ý nghĩa và 5 đặc trưng có ý nghĩa. Khi mô hình RF với ba đặc trưng được dùng, độ chính xác lớn nhất 79.57% đạt được. Các nghiên cứu đái tháo đường cũng đã dùng máy vector hỗ trợ [13], CN2 rule induction [14], và bộ phân loại XGBoost [15], tạo ra các độ chính xác lần lượt là 74%, 8.7%, và 81%.

Kỹ thuật dự đoán được nâng cao bởi các tác giả của Tài liệu [16], những người đã đề xuất các kỹ thuật XDAGBoost và AdaBoost SVM trong PIDD. Nghiên cứu cho thấy rằng, so với XGBoost, DT, LR, SVM, và RF, thuật toán AdaBoost hoạt động tốt, đạt được một độ chính xác 83%. Sarangani và cộng sự [17] triển khai kỹ thuật trích xuất đặc trưng dựa trên PCA với bộ phân loại RF trong PIDD và đạt một độ chính xác 83%, trong khi họ triển khai bộ phân loại SVM và đạt được 81.24% độ chính xác. Nhiều thước đo hiệu năng khác nhau, như độ nhạy và độ đặc hiệu, cũng được khảo sát trong nghiên cứu này. Trái với ML, các thuật toán dựa trên học sâu (DL) được chọn để thiết kế các mô hình dự đoán tự động [18]. Các mô hình lai Soft voting XRL được giới thiệu trong bộ dữ liệu NHANES cùng với các bộ phân loại XGBoost, RF, và LightGBM để thiết kế mô hình chẩn đoán đái tháo đường dựa trên ML [19]. Mô hình XRL tạo ra 89.46% và vượt trội hơn tất cả ba thuật toán khác.

Shankar và cộng sự [20] khảo sát siêu tìm kiếm gray wolf optimization (GWO) để phát hiện đái tháo đường trên bộ dữ liệu PIMA. Nghiên cứu đã cho thấy rằng GWO vượt trội hơn phương pháp ant colony và đạt được 81% độ chính xác. Lukmanto [21] dùng cách tiếp cận SVM cho phân loại đái tháo đường. Phương pháp F-exponential được đề xuất để lựa chọn các đặc trưng có ý nghĩa từ tất cả các đặc trưng. Dữ liệu huấn luyện sau đó được đưa vào thuật toán SVM cho phân loại đái tháo đường, đạt được 89.2% độ chính xác trên bộ dữ liệu PIMA. Beschi và cộng sự [22] giới thiệu một hệ thống mới để phân loại các bệnh nhân đái tháo đường trên cơ sở phân cụm fuzzy C-means (FCM) và tối ưu hóa bầy hạt (PSO). Một đánh giá phân tích hiệu năng tiết lộ rằng mô hình đạt được 82.6% độ chính xác. Saloni [23] triển khai một bộ phân loại bỏ phiếu lai dùng ba thuật toán ML, RF, LR, và NB, và đạt được 79.04% độ chính xác. Nghiên cứu được đề cập ở trên dùng nhiều mô hình ML với các mức độ chính xác khác nhau để dự đoán bệnh đái tháo đường. Các mô hình lai Soft voting XRL được giới thiệu trong bộ dữ liệu NHANES cùng với các bộ phân loại XGBoost, RF, và LightGBM [24]. Các thuật toán tối ưu hóa với AI, như thuật toán Greylag Goose optimization (GGO) [41], pressure optimizer [40], và particle swarm optimizer [39], cũng đã được triển khai.

Học máy gần đây đã trải qua nhiều nghiên cứu để nhận diện sự tồn tại của đái tháo đường một cách hiệu quả ở các giai đoạn sớm. Theo nghiên cứu gần đây, các nhà nghiên cứu đã giới thiệu nhiều mô hình ML khác nhau để đạt được các kết quả hợp lý. Mặc dù họ đạt được độ chính xác tốt hơn, họ thất bại trong việc giải quyết thiên lệch, cân bằng bộ dữ liệu, loại bỏ các điểm ngoại lai, và lựa chọn các tham số đái tháo đường có ý nghĩa. Do đó, rõ ràng là kết quả không được kiểm định vì sự hiện diện của thiên lệch, bộ dữ liệu mất cân bằng, và sự vắng mặt của một thuật toán lựa chọn đặc trưng dẫn đến độ chính xác sai. Trong tài liệu, việc xử lý các giá trị thiếu, tập trung vào phát hiện điểm ngoại lai, cân bằng bộ dữ liệu, và tập trung vào các phương pháp lựa chọn đặc trưng được quan sát là các bước quan trọng cho nghiên cứu phân loại đái tháo đường. Khi có nhiều giá trị thiếu hơn trong bộ dữ liệu, các mô hình học máy thường gặp khó khăn trong việc tạo ra các kết quả xuất sắc trong giai đoạn huấn luyện. Việc nhận diện và xử lý các giá trị thiếu cho mỗi đặc trưng đầu vào là một bước quan trọng trong giai đoạn tiền xử lý. Các phát hiện chứng minh rằng dữ liệu được tiền xử lý cung cấp một mức độ chính xác phân loại cao hơn [25]. Mục đích chính của công trình này là giới thiệu một phương pháp phù hợp để xử lý dữ liệu thiếu, các điểm ngoại lai, và các bộ dữ liệu mất cân bằng. Nó cũng tập trung vào việc lựa chọn kỹ thuật trích xuất đặc trưng tốt nhất để nhận diện các đặc trưng có ý nghĩa nhất và chọn kỹ thuật ML tốt nhất trong số bốn mô hình thay thế cho phân loại đái tháo đường. Trong nghiên cứu này, các bộ phân loại ML light gradient boosting model, boosting classifier, RF, và DT được dùng để nghiên cứu các bộ dữ liệu PIDD và BRFSS. Việc đánh giá các bộ phân loại được dùng cũng được cấu trúc tốt trong công trình này.

## 3    Bộ dữ liệu

## 3.1    Thu thập Dữ liệu

Trong công trình này, chúng tôi sử dụng hai bộ dữ liệu khác nhau: bộ dữ liệu PIDD (PIMA Indian Diabetes Dataset) [26] và BRFSS (Behavioral Risk Factor Surveillance System) [27].

## 3.1.1    PIDD (PIMA Indian Diabetes Dataset)

PIMA Indians Diabetes Dataset (PIDD) [28] là một bộ dữ liệu nổi tiếng được dùng trong học máy và khoa học dữ liệu để dự đoán các kết cục đái tháo đường, cụ thể là đái tháo đường type 2. Nó được thu thập bởi National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) và gồm 768 hồ sơ của các bệnh nhân nữ từ quần thể PIMA Indian, một nhóm có tỷ lệ mới mắc đái tháo đường cao. Bộ dữ liệu gồm 8 đặc trưng chẩn đoán: số lần mang thai, nồng độ glucose huyết tương (đo 2 h sau một nghiệm pháp dung nạp glucose đường uống), huyết áp tâm trương (mm Hg), độ dày nếp gấp da (một thước đo mỡ cơ thể), các mức insulin, chỉ số khối cơ thể (BMI), hàm phả hệ đái tháo đường (chỉ khả năng đái tháo đường trên cơ sở tiền sử gia đình), và tuổi bệnh nhân. Biến mục tiêu là một nhãn nhị phân chỉ liệu bệnh nhân đã được chẩn đoán đái tháo đường (1) hay không (0). Bộ dữ liệu đặc biệt hữu ích cho các mô hình phân loại và đã được áp dụng rộng rãi để dự đoán các kết cục đái tháo đường qua nhiều kỹ thuật học máy. Các thuộc tính được thu thập biểu diễn các phép đo sức khỏe phổ biến, và nhãn kết cục nhị phân cho phép các nhiệm vụ học có giám sát nhằm dự đoán nguy cơ đái tháo đường trên cơ sở các đặc trưng được cung cấp [24]. Bảng 1 cho thấy các đặc trưng của bộ dữ liệu PIMA.

Các biểu đồ tần suất (histogram) của các bộ dữ liệu PIMA và BRFSS được trình bày trong Hình 2 và 3.

Bảng 1 Các đặc trưng của bộ dữ liệu PIMA

| Đặc trưng                  | Loại    |
|----------------------------|---------|
| Glucose                    | Integer |
| Pregnancies                | Integer |
| Skin thickness             | Integer |
| Blood pressure             | Integer |
| Insulin                    | Integer |
| Diabetes pedigree function | Float   |
| BMI                        | Float   |
| Age                        | Integer |
| Outcome                    | Integer |

Sơ đồ biểu đồ tần suất của bộ dữ liệu PIMA giúp trực quan hóa bằng đồ thị phân bố của các đặc trưng của nó. Đồ thị này cho thấy rõ ràng rằng, ngoại trừ đặc trưng 'Outcome', tất cả các đặc trưng khác thay đổi về phạm vi, trong khi outcome là '1' hoặc '0'. Trong bộ dữ liệu PIMA, 8 đặc trưng đầu tiên được đưa làm các thuộc tính đầu vào cho mô hình được đề xuất, và đặc trưng cuối cùng, 'outcome,' được lấy làm lớp mục tiêu.

## 3.1.2    BRFSS (Behavioral Risk Factor Surveillance System)

Bộ dữ liệu Behavioral Risk Factor Surveillance System (BRFSS) [29] là một trong những khảo sát sức khỏe được tiến hành liên tục lớn nhất trên thế giới và được phát triển bởi Centers for Disease Control and Prevention (CDC). Nó thu thập dữ liệu từ cư dân Hoa Kỳ về các hành vi nguy cơ liên quan đến sức khỏe của họ, các tình trạng sức khỏe mạn tính, và việc dùng các dịch vụ phòng ngừa. Khảo sát được tiến hành hằng năm và được dùng để theo dõi các xu hướng sức khỏe theo thời gian, với một trọng tâm đặc biệt vào các bệnh mạn tính như đái tháo đường. Bộ dữ liệu gồm một phạm vi rộng các thuộc tính, như các biến nhân khẩu học (tuổi, giới tính, chủng tộc, trình độ học vấn, và thu nhập), các hành vi lối sống (như hút thuốc, tiêu thụ rượu, hoạt động thể chất, và chế độ ăn), và các biến tình trạng sức khỏe (gồm chỉ số khối cơ thể, các mức cholesterol, và huyết áp). Bảng 2 cho thấy các đặc trưng của BRFSS.

Đối với các kết cục đái tháo đường, khảo sát BRFSS hỏi cụ thể những người tham gia liệu họ đã bao giờ được chẩn đoán đái tháo đường bởi một chuyên gia chăm sóc sức khỏe hay chưa. Các câu trả lời được dùng để gán nhãn các cá nhân là đái tháo đường (1) hoặc không đái tháo đường (0). Ngoài ra, đái tháo đường thai kỳ (đái tháo đường trong khi mang thai) thường được xử lý riêng trong phân tích. Bộ dữ liệu cung cấp các hiểu biết quan trọng về cách các yếu tố hành vi và nhân khẩu học góp phần vào tỷ lệ hiện mắc của đái tháo đường, làm cho nó có giá trị cho nghiên cứu y tế công cộng, lập kế hoạch chính sách, và các can thiệp chăm sóc sức khỏe phòng ngừa. Sự phong phú của bộ dữ liệu BRFSS, kết hợp với kích thước mẫu lớn của nó, làm cho nó là một nguồn lực then chốt để nghiên cứu các hành vi và kết cục sức khỏe liên quan đến đái tháo đường qua các quần thể khác nhau.

## 4    Phương pháp Đề xuất

Trong mục này, phương pháp được đề xuất cho phân loại đái tháo đường dựa trên ML được giải thích. Hình 4 trình bày các chi tiết, nơi luồng mô hình được tổ chức thành sáu giai đoạn. Việc triển khai mô hình hoàn chỉnh được thực hiện trong Google Colab qua Python. Các gói Pandas, Sklearn, Pandas, Numpy và Matplotlib được dùng để đánh giá các bộ dữ liệu PIMA và BRFSS.

## 4.1    Tiền xử lý

Trước khi giới thiệu các thuật toán ML, các bộ dữ liệu cần được tiền xử lý. Hiệu năng của mô hình ML bị ảnh hưởng bởi sự hiện diện của dữ liệu thiếu trong các đặc trưng. Để tìm các giá trị thiếu, một bước kiểm tra giá trị thiếu được áp dụng vào bộ dữ liệu. Một trong các phương pháp phổ biến hơn để giải quyết các giá trị thiếu là quy đổi (imputation) [30]. Trung bình của đặc trưng phù hợp được dùng để thay thế dữ liệu thiếu. Nó thay thế các giá trị thiếu bằng trung bình của các giá trị không thiếu trong đặc trưng đó. Trong nghiên cứu này, quy đổi bằng trung bình được ưa chuộng vì nó đơn giản để áp dụng và không ảnh hưởng đến kích thước mẫu của dữ liệu. Một thuật toán gọi là nhận diện điểm ngoại lai IQR đã được dùng để tìm các điểm ngoại lai. Phương pháp IQR, một công cụ chuẩn để phát hiện điểm ngoại lai, được ưa chuộng hơn các kỹ thuật khác vì nó có thể cung cấp một biểu diễn đáng tin cậy hơn về sự phân tán ngay cả khi dữ liệu không được phân phối chuẩn.

Các bước dưới đây thảo luận quá trình được tuân theo trong đánh giá IQR.

1. Bắt đầu quá trình
2. Sắp xếp bộ dữ liệu theo thứ tự tăng dần
3. Xác định Q1 (trung vị của nửa dưới của các đặc trưng)
4. Xác định Q3 (trung vị của nửa trên của các đặc trưng)
5. Tính IQR (hiệu giữa Q3 và Q1)
6. Nhận diện các điểm ngoại lai:
- Bất kỳ giá trị nào dưới Q1 - 1.5 (IQR) Bất kỳ giá trị nào trên Q3 + 1.5 (IQR) Loại bỏ các điểm ngoại lai khỏi bộ dữ liệu của các đặc trưng)

Dừng quá trình Xác định Q3 (trung vị của nửa trên

Sau khi áp dụng thuật toán IQR này vào các bộ dữ liệu PIMA và BRFSS, các điểm ngoại lai được loại bỏ, và điều này có thể được thấy bằng cách vẽ các biểu đồ hộp (boxplot) của các bộ dữ liệu PIMA và BRFSS. Các bộ dữ liệu PIDD và BRFSS không được phân bố đều, nơi một lớp có số lượng dữ liệu thấp hơn không cân xứng so với lớp kia. Trong các tình huống này, hệ thống có thể không hoạt động tốt trên lớp thiểu số vì không có đủ dữ liệu lớp thiểu số để huấn luyện nó đúng cách. Để xử lý trường hợp này, một kỹ thuật random oversampling được đề xuất cho mô hình này. Phương pháp random oversampling được chọn hơn các kỹ thuật lấy mẫu khác vì hiệu suất và sự đơn giản của nó [24]. Nghiên cứu cũng cho thấy rằng kỹ thuật random oversampling hoạt động tốt hơn cho các bộ dữ liệu mất cân bằng so với các phương pháp lấy mẫu khác [24]. Nó cân bằng bộ dữ liệu và nâng cao hiệu năng bộ phân loại bằng cách lấy mẫu quá mức ngẫu nhiên hoặc tùy ý nhóm thiểu số. Cách tiếp cận random oversampling này tăng số dữ liệu trong nhóm thiểu số và cung cấp nhiều thông tin hơn cho bộ phân loại ML để học nhiều hơn. Kết quả là, mô hình có thể cải thiện hiệu năng của nó bằng cách học cả hai lớp (lớp thiểu số và

Hình 3 Biểu đồ tần suất (Histplot) của bộ dữ liệu BRFSS

lớp đa số) và tạo ra độ chính xác tốt hơn. Ngoài ra, nó đã được chứng minh là nâng cao hiệu năng bộ phân loại trên các bộ dữ liệu mất cân bằng, đặc biệt khi lớp thiểu số rất nhỏ.

Trong nghiên cứu của chúng tôi, chúng tôi đã dùng phương pháp khoảng tứ phân vị (IQR) cho lựa chọn đặc trưng để lọc ra các điểm ngoại lai và lựa chọn các đặc trưng góp phần đáng kể vào hiệu năng của mô hình. Cách tiếp cận này giúp đảm bảo rằng chỉ các đặc trưng liên quan được giữ lại trong khi duy trì độ bền vững của mô hình bằng cách giảm nhiễu. Để xử lý mất cân bằng lớp, chúng tôi đã áp dụng random oversampling. Kỹ thuật này được chọn để giải quyết vấn đề các lớp mất cân bằng bằng cách nhân bản các thể hiện từ lớp thiểu số, do đó ngăn mô hình bị thiên lệch về lớp đa số.

Tách bộ dữ liệu là kỹ thuật phổ biến nhất được dùng trong các mô hình ML để kiểm định mô hình. Trong trường hợp này, dữ liệu trong bộ dữ liệu được tách thành các tập kiểm tra và huấn luyện. Một cách phổ biến.

Tỷ lệ huấn luyện-kiểm tra là 80:20, trong đó 80% dữ liệu được dùng làm tập huấn luyện và 20% dữ liệu được dùng làm dữ liệu kiểm tra. Nhiều tỷ lệ khác, như 60:40, 50:30, và 70:30, cũng có thể được dùng để xử lý [31]. Hầu hết các bài báo nghiên cứu gần đây về phân loại đái tháo đường đã dùng các tỷ lệ 80:20 và 70:20 để kiểm định các mô hình của họ. Trong công trình này, hàm tách huấn luyện-kiểm tra được dùng để chọn ngẫu nhiên 20% hoặc 30% các bộ dữ liệu để kiểm tra và 80% hoặc 70% các bộ dữ liệu để huấn luyện. Hệ thống được huấn luyện bằng dữ liệu huấn luyện. Dữ liệu kiểm tra được dùng để kiểm tra hiệu năng của mô hình và xác định độ chính xác của nó.

Bảng 2 Các đặc trưng của bộ dữ liệu BRFSS

| Đặc trưng           | Loại    |
|---------------------|---------|
| High blood pressure | Integer |
| High cholesterol    | Integer |
| Cholesterol check   | Integer |
| BMI                 | Integer |
| Smoking             | Integer |
| Stroke              | Integer |
| Heart attack        | Integer |
| Physical exercise   | Integer |
| Fruits              | Integer |
| Veggies             | Integer |
| Heavy alcohol       | Integer |
| Health care         | Integer |
| NonDocbcCost        | Integer |
| GenHlth             | Integer |
| Physical health     | Integer |
| Walk                | Integer |
| Gender              | Integer |
| Age                 | Integer |
| Education           | Integer |
| Income              | Integer |
| Diabetes            | Integer |

## 4.2    Trích xuất Đặc trưng

Trích xuất đặc trưng là một yếu tố quan trọng trong nghiên cứu đái tháo đường vì nó giúp tăng độ chính xác của mô hình ML và giảm thiểu độ phức tạp của thiết kế. Nó liên quan đến việc chọn các thuộc tính thích đáng nhất từ bộ dữ liệu có một liên kết tích cực với sự xuất hiện của đái tháo đường. Điều này giúp giảm số chiều của bộ dữ liệu bằng cách hạ thấp nhiễu và dư thừa dữ liệu. Hai thuật toán trích xuất đặc trưng được đề xuất trong hệ thống này: phân tích thành phần chính (PCA) và thuật toán Boruta.

## 4.2.1    Phân tích Thành phần Chính

PCA là một kỹ thuật lựa chọn đặc trưng được ưa thích trong phân tích dữ liệu và ML. Lý do dùng phương pháp PCA này trong công trình này là nó là một kỹ thuật giảm chiều phổ biến, tạo ra các thuộc tính không tương quan định nghĩa hiệu quả lớp [32, 33]. Nó hoạt động bằng cách nhận diện thành phần chính của bộ dữ liệu. Các thành phần này là các tổ hợp tuyến tính của các thuộc tính gốc, và chúng được xếp hạng theo khả năng nắm bắt phương sai nhiều nhất của chúng. Sự biến thiên nhiều nhất đạt được bởi thành phần chính đầu tiên, theo sau bởi thành phần thứ hai và cứ thế. Để áp dụng PCA vào một cơ sở dữ liệu, đầu tiên, dữ liệu nên được tiêu chuẩn hóa sao cho tất cả các đặc trưng có một thang đo đồng nhất.

Trong căn giữa trung bình (mean centering), A cen được ước tính qua trung bình của mỗi thuộc tính (1),

trong đó x chỉ các thuộc tính, n chỉ dữ liệu, và A chỉ ma trận của bộ dữ liệu. Ma trận hiệp phương sai của dữ liệu được tiêu chuẩn hóa sau đó được ước tính, cho thấy các đặc trưng khác nhau khác nhau như thế nào so với nhau. Ma trận hiệp phương sai CO được ước tính qua Eq. (2):

Các thành phần chính của ma trận hiệp phương sai này được biểu diễn bởi các vector riêng (eigenvectors), và phương sai được giải thích bởi mỗi thành phần được biểu diễn bởi các giá trị riêng (eigenvalues) liên quan trong Eq. (3):

trong đó e i biểu diễn các vector riêng và trong đó Y i chỉ các giá trị riêng. Bằng cách chỉ giữ k thành phần hàng đầu, chúng ta có thể giảm thiểu số chiều của các cơ sở dữ liệu từ n xuống k , nơi k thường nhỏ hơn n đáng kể.

Các bước được nêu dưới đây phải được thực hiện để tiến hành cách tiếp cận PCA. Quá trình từng bước của PCA được trình bày dưới đây.

Đầu vào: Bộ dữ liệu đái tháo đường. Đầu ra: High BP, BMI, heart disease, sex, age, pregnancies, và fruits.

1. Dữ liệu huấn luyện được dùng để tính ma trận tương quan PCA.
2. Các giá trị riêng được ước tính bằng cách xác định det(∑Y i ).
3. Các vector riêng được ước tính bằng cách giải ∑ e i = Y i e i 4. Chọn các vector riêng thuộc về k giá trị riêng có ý nghĩa nhất đầu tiên.
5. Xác định tác động của kết quả PCA.

## 4.2.2    Thuật toán Boruta

Boruta là một kỹ thuật trích xuất đặc trưng được dùng để tìm các đặc trưng thích đáng từ một bộ dữ liệu. Thuật toán Boruta được ưa chuộng trong nghiên cứu này vì, không như các phương pháp lựa chọn đặc trưng khác, các phương pháp lựa chọn đặc trưng này chọn tập các thuộc tính phù hợp tốt cho mô hình ML. Nó là một thuật toán lựa chọn đặc trưng phổ biến vì nó có thể được áp dụng cho bất kỳ bộ phân loại ML nào, xử lý dữ liệu nhiễu và phức tạp, và dễ triển khai [34]. Thuật toán RF làm nền tảng cho thuật toán Boruta và được tạo ra bởi Kursa và Rudnicki. Bằng cách hoán vị riêng các giá trị của mỗi thuộc tính, Boruta tạo ra các đặc trưng 'bóng' (shadow) được so sánh với tầm quan trọng của các thuộc tính gốc trong cơ sở dữ liệu. Sự thích đáng của các đặc tính bóng, vốn chỉ nhiễu của dữ liệu, được dùng làm một mốc chuẩn để so sánh.

Hình 4 Cách tiếp cận được đề xuất để dự đoán đái tháo đường dùng ML

Các bước của mô hình Boruta như sau:

Đầu vào: Bộ dữ liệu đái tháo đường.

Đầu ra: High BP, BP, high Chol, BMI, heart disease, physical health, sex, age, pregnancies, và glucose2.

1. Tạo một ma trận đặc trưng mới. Mỗi đặc trưng của ma trận, A , được dùng để tạo ma trận thuộc tính bóng A \_S. Ràng buộc ma trận bóng A \_S vào ma trận gốc, A , để tạo ra một ma trận mới An . An được cho trong Eq. (4),

2. Kết cục của phương pháp lựa chọn đặc trưng được huấn luyện, và mô hình dùng ma trận mới, An .
3. Tính Z \_Score của thuộc tính bóng cao nhất, S max, cho ma trận, M , và ma trận đặc trưng mới, M \_ S .
4. Tìm đặc trưng có ý nghĩa và không có ý nghĩa bằng cách kiểm tra điều kiện. Z \_Score > S max được lấy làm một đặc trưng có ý nghĩa, và Z \_Score < S max được lấy làm một đặc trưng không có ý nghĩa. Tính Z \_Score của thuộc tính bóng cao nhất, S max, cho ma trận, M , và ma trận đặc trưng mới, M \_S.
5. Tất cả các thuộc tính bóng được loại bỏ.
6. Tất cả các bước trên được lặp lại cho đến khi tất cả các đặc trưng có ý nghĩa được lựa chọn.

## 4.3    Các Mô hình Học máy

## 4.3.1    Light Gradient Boost

Light gradient boosting là một kỹ thuật ML nổi tiếng thường được dùng cho các ứng dụng phân loại. Nó vận hành trên cơ sở của sự kết hợp của một phương pháp học dựa trên cây và một mô hình gradient boosting. Bộ phân loại LightGBM nhận diện một hàm f ( x ) ánh xạ các thuộc tính x sang mục tiêu y . Mô hình này được chọn cho khung này vì hiệu suất và sức mạnh của nó. Lượng dữ liệu cần được xử lý trong mỗi lần lặp của thuật toán gradient boosting được giảm qua một phương pháp tiên tiến gọi là gradient-based one-sided sampling (GOSS). Biểu thức số của GOSS được biểu diễn trong (5)-(9),

Hàm mất mát của máy light gradient boost có thể được ước tính qua Eq. (13):

trong đó i chỉ bản ghi dữ liệu đã cho.

trong đó Gj ( d ) tính độ lợi phương sai (variance gain) qua S 1 U S 2:

## 4.3.2    Gradient Boost Classifier

Bộ phân loại gradient boosting hoạt động bằng cách xây dựng một tập các DT, nơi mỗi và mọi DT cố gắng sửa đúng các lỗi đã xảy ra bởi DT trước đó trong sự sắp xếp. Đầu ra của thuật toán này là một tổng của các dự đoán của tất cả các DT. Cách tiếp cận này là phương pháp mạnh nhất và đạt được độ chính xác cao trên một bộ dữ liệu lớn. Trong thuật toán này, việc tinh chỉnh đúng các siêu tham số khác nhau, như tốc độ huấn luyện, độ sâu của DT, và số DT cần cho chuỗi, là cần thiết để đạt được độ chính xác cao. Dữ liệu huấn luyện D trong Eq. (14) được

biểu diễn như sau:

Mục tiêu của bộ phân loại gradient boost là giảm giá trị của hàm mất mát, F (l). Thuật toán bộ phân loại này xây dựng một hàm xấp xỉ trên cơ sở của Eqs. (15)-(16):

trong đó Qq ký hiệu trọng số của hàm xấp xỉ thứ q , Hq ( x ):

Thay vì giải vấn đề tối ưu hóa trực tiếp, Hq có thể được huấn luyện qua Eq. (17) như sau:

- (6)

Phương pháp này cho phép LightGBM vượt trội hơn các thuật toán gradient boosting nổi tiếng như XGBoost và CatBoost về độ chính xác và thời gian huấn luyện. Biểu thức của hàm mục tiêu (10) được dùng trong thuật toán LightGBM như sau:

trong đó θ là tập các biến mà mô hình học qua huấn luyện, T là tổng số cây, l là hàm mất mát, và y i là nhãn/kết cục thật. Thuật toán này dùng một phương pháp gradient boosting để xây dựng một DT lai để xấp xỉ f ( x ). Tập hợp các DT được huấn luyện dùng các đặc trưng đầu vào để thực hiện phân loại. Dự đoán của DT ( PT ) và các giá trị được dự đoán của DT ( Pv ) được cho về mặt toán học trong (11)-(12) như sau:

trong đó p oi (18) là một pseudoresidual và có thể được ước tính qua Eq. (18):

Dự đoán của bộ phân loại gradient boost dựa trên biểu thức Eq. (19) sau đây: | |

trong đó T biểu diễn tổng số cây của hệ thống, Ƴ t biểu diễn hệ số co rút/tốc độ học, và PT biểu diễn dự đoán của cây được tạo ra trên cơ sở các tham số của nó, ⊝ t .

## 4.3.3    Random Forest

Bộ phân loại RF là một loại thuật toán ML được dùng cho các mục đích phân loại. Nó là một phương pháp ML lai kết hợp nhiều DT hơn để đưa ra các dự đoán. Số cây ngẫu nhiên hóa này cùng nhau tạo thành (20)-(21):

trong đó ⊝ ký hiệu biến ngẫu nhiên hóa và Ds biểu diễn bộ dữ liệu:

Sự kiện (22) có thể được biểu diễn bởi biểu thức sau đây:

trong đó Bn ( x ,  ⊝) biểu diễn ô chữ nhật của cây ngẫu nhiên hóa Eq. (23):

Trong phương pháp này, một tập các thuộc tính được chọn ngẫu nhiên. Các DT trong bộ phân loại này dùng các thuộc tính được lấy mẫu ngẫu nhiên này để huấn luyện mỗi cây. Thuật toán random forest tạo ra một đầu ra dự đoán bằng cách thu thập một phiếu bầu từ tất cả các DT. Biểu thức cho dự đoán của thuật toán RF Eq. (24) như sau:

trong đó T ký hiệu số cây trong mô hình và PT ( x ) là dự đoán của cây.

## 4.3.4    Decision Tree (DT)

Cây quyết định về cơ bản là một lưu đồ bắt đầu ở gốc và dùng các đặc trưng đầu vào để phân nhánh một cây với một số quyết định. Mỗi nút lá trong DT chỉ một kết cục, trong khi mỗi nút nội bộ biểu diễn một quyết định được hình thành trên cơ sở thuộc tính.

Hãy xét Eqs. (25)-(27) để tách các nút của DT thành các hàm hữu ích:

trong đó Dr và Dz là nút gốc và nút thứ z , Nr biểu diễn các mẫu trong nút gốc, và Nz ký hiệu các mẫu trong nút thứ z :

trong đó Dl 1 và Dr 1 là các nút lá, và Nl 1 và Nr 1 là tổng dữ liệu trong các nút lá trái và phải tương ứng:

trong đó p ( u / w ) là phần trăm các mẫu liên kết với một lớp và một nút t . Chỉ số Gini, I GINI, , được cho trong Eq. (28):

Thước đo lỗi có thể được biểu diễn qua Eq. (29):

Quá trình xây dựng một DT liên quan đến việc chọn đặc trưng tốt nhất để chia dữ liệu tại mỗi nút nội bộ trên cơ sở một độ lợi thông tin. Quá trình này giúp tăng độ chính xác dự đoán của hệ thống trong khi giảm độ phức tạp. Biểu thức cho dự đoán được thực hiện qua kỹ thuật DT được cho trong Eq. (30):

trong đó f ( x ; ⊝) là hàm được dự đoán và f ( x ) là giá trị được dự đoán.

## 4.3.5    Đánh giá và Kiểm định

Đánh giá các mô hình ML là một bước quan trọng trong giai đoạn phát triển. Nó hữu ích để đánh giá tính hiệu quả của mô hình và xác định liệu nó có đang vận hành ở mức độ chính xác và độ tin cậy phù hợp hay không. Việc đánh giá hiệu năng của hệ thống cho phép chúng ta xác định độ chính xác, độ chuẩn xác, độ nhạy của nó và nhiều thước đo khác, giúp ước tính hiệu lực của mô hình. Đánh giá một số mô hình có thể hữu ích cho việc chọn mô hình tối ưu thỏa mãn một nhu cầu cụ thể. Bằng cách đánh giá hiệu năng của mô hình (31)-(33), chúng ta có thể nhận diện các vùng vấn đề và tối ưu hóa các siêu tham số, kiến trúc, hoặc các yếu tố khác có thể nâng cao hiệu năng của mô hình:

Bảng 3 Phân tích hiệu năng dữ liệu kiểm tra 30% không có trích xuất đặc trưng

Bảng 4 Phân tích hiệu năng dữ liệu kiểm tra 20% không có trích xuất đặc trưng

Bảng 5 Phân tích hiệu năng dữ liệu kiểm tra 30% có trích xuất đặc trưng

| Mô hình ML  | PIDD   | PIDD   | PIDD   | PIDD   | BRFSS   | BRFSS   | BRFSS   | BRFSS   |
|-------------|--------|--------|--------|--------|---------|---------|---------|---------|
|             | Acc    | Pre    | Recall | F 1    | Acc     | Pre     | Recall  | F 1     |
| LightGBM    | 85     | 87     | 90     | 89     | 70      | 70      | 76      | 70      |
| GBC         | 88     | 83     | 88     | 85     | 75      | 70      | 72      | 75      |
| RF          | 89     | 89     | 90     | 92     | 90      | 85      | 90      | 89      |
| DT          | 85     | 89     | 85     | 89     | 72      | 69      | 76      | 74      |

| Mô hình ML  | PIDD   | PIDD   | PIDD   | PIDD   | BRFSS   | BRFSS   | BRFSS   | BRFSS   |
|-------------|--------|--------|--------|--------|---------|---------|---------|---------|
|             | Acc    | Pre    | Recall | F 1    | Acc     | Pre     | Recall  | F 1     |
| LightGBM    | 90     | 91     | 89     | 89     | 71      | 70      | 76      | 72      |
| GBC         | 89     | 85     | 89     | 88     | 71      | 69      | 75      | 74      |
| RF          | 91     | 90     | 92     | 91     | 89      | 86      | 90      | 90      |
| DT          | 87     | 90     | 88     | 87     | 75      | 72      | 78      | 75      |

| Mô hình ML  | Trích xuất đặc trưng | PIDD   | PIDD   | PIDD   | PIDD   | BRFSS   | BRFSS   | BRFSS   | BRFSS   |
|-------------|----------------------|--------|--------|--------|--------|---------|---------|---------|---------|
|             |                      | Acc    | Pre    | Recall | F 1    | Acc     | Pre     | Recall  | F 1     |
| LightGBM    | PCA                  | 85     | 80     | 88     | 90     | 70      | 74      | 80      | 72      |
| GBC         |                      | 88     | 86     | 86     | 85     | 71      | 68      | 72      | 70      |
| RF          |                      | 89     | 84     | 83     | 88     | 85      | 91      | 90      | 90      |
| DT          |                      | 82     | 81     | 84     | 90     | 71      | 75      | 81      | 73      |
| LightGBM    | Boruta               | 90     | 91     | 93     | 92     | 72      | 73      | 79      | 72      |
| GBC         |                      | 90     | 85     | 90     | 87     | 79      | 72      | 76      | 75      |
| RF          |                      | 91     | 89     | 90     | 92     | 90      | 85      | 90      | 89      |
| DT          |                      | 85     | 88     | 87     | 90     | 74      | 70      | 79      | 76      |

Kỹ thuật random oversampling có thể dẫn đến quá khớp nếu nó không được dùng cẩn thận. Điều này là vì các thể hiện trùng lặp trong lớp thiểu số có thể khiến bộ phân loại quá thiên lệch về lớp thiểu số, dẫn đến hiệu năng kém trên dữ liệu mới. Để đảm bảo rằng bộ phân loại tổng quát hóa thành công sang dữ liệu mới, điều quan trọng là kết hợp random oversampling với các cách tiếp cận bổ sung như kiểm định chéo và chính quy hóa (regularization).

Cách tiếp cận kiểm định chéo mười lần (tenfold) là một cách tiếp cận mạnh và hiệu quả để đánh giá hiệu năng của các mô hình ML và được ưa chuộng vì khả năng giảm thiểu thiên lệch, sử dụng dữ liệu một cách hệ thống, cung cấp một ước tính chính xác hơn về hiệu năng, và đảm bảo tổng quát hóa sang dữ liệu mới.

|                 | F 1    | 74       | 78   | 90   | 75   | 76 76    | 93   | 77   |
|-----------------|--------|----------|------|------|------|----------|------|------|
|                 |        | 81       | 77   | 90   | 80   | 80 79    | 98   | 81   |
|                 | Recall |          |      |      |      |          |      |      |
|                 | Pre    | 72       | 73   | 84   | 76   | 73 73    | 88   | 74   |
| BRFSS           | Acc    | 73       | 72   | 90   | 74   | 75 75    | 92   | 76   |
|                 | F 1    | 93       | 89   | 89   | 91   | 92 91    | 94   | 90   |
|                 | Recall | 90       | 91   | 90   | 86   | 91 92    | 95   | 92   |
|                 | Pre    | 87       | 90   | 88   | 83   | 92 89    | 92   | 93   |
| PIDD            | Acc    | 89       | 91   | 90   | 88   | 93 93    | 94   | 91   |
| Feature extrac- | tion   | PCA      |      |      |      | Boruta   |      |      |
|                 |        | LightGBM |      |      |      | LightGBM |      |      |
| ML models       |        |          | GBC  | RF   | DT   | GBC      | RF   | DT   |

## 5    Phân tích Hiệu năng

Mô hình được đề xuất được kiểm tra trên 20% và 30% dữ liệu kiểm tra. Hơn nữa, hai thuật toán trích xuất đặc trưng, là phân tích thành phần chính (PCA) và thuật toán Boruta, được giới thiệu. Hiệu năng của các mô hình học máy được xem xét riêng dưới mỗi điều kiện qua một ma trận nhầm lẫn. Bảng 3 cho thấy rằng, đối với 30% dữ liệu kiểm tra PIDD, thuật toán random forest (RF), dùng phương pháp lựa chọn đặc trưng PCA, đạt một độ chính xác 89%, trong khi độ chính xác của kỹ thuật RF dùng phương pháp lựa chọn đặc trưng Boruta là 91%. Trái lại, RF với thuật toán lựa chọn đặc trưng Boruta đạt 90% độ chính xác, trong khi RF với kỹ thuật lựa chọn đặc trưng PCA chỉ đạt 85% độ chính xác cho 30% dữ liệu BRFSS.

Bảng 3 và 4 mô tả hiệu năng của các mô hình ML cho cả các bộ dữ liệu PIDD và BRFSS mà không giới thiệu các kỹ thuật trích xuất đặc trưng cho các tỷ lệ dữ liệu huấn luyện 70:30 và 80:20 tương ứng. Bảng cho thấy rằng không mô hình ML nào đạt được độ chính xác tốt hơn.

Theo Bảng 5 và 6, thuật toán lựa chọn đặc trưng Boruta có thể cung cấp các kết quả với độ chính xác cao hơn phương pháp lựa chọn đặc trưng PCA. Ngoài ra, độ chính xác tối đa 94% cho bộ dữ liệu PIDD và 92% độ chính xác cho bộ dữ liệu BRFSS đạt được qua bộ phân loại random forest. Nếu dữ liệu kiểm tra là 20% cho cả hai bộ dữ liệu, hiệu năng của các mô hình ML được nâng cao lên 94% cho PIDD (Hình 5) và 92% cho BRFSS (Hình 6).

Hiệu năng của các mô hình ML tốt hơn khi tỷ lệ huấn luyện:kiểm tra là 80:20. Khi dữ liệu trong bộ dữ liệu có chất lượng tốt, nó giúp một mô hình ML học dữ liệu dễ dàng và đạt được độ chính xác tốt ngay cả với 20% dữ liệu kiểm tra. So với các tỷ lệ 70:30, các tỷ lệ 80:20 có khả năng học hiệu quả các khái niệm và ý tưởng cơ bản của dữ liệu trong giai đoạn huấn luyện. Hiệu năng tốt đạt được qua sự kết hợp của thuật toán lựa chọn đặc trưng Boruta và mô hình thuật toán RF cho cả các bộ dữ liệu PIDD và BRFSS.

Điều này là vì phương pháp lựa chọn đặc trưng Boruta cho phép lựa chọn các đặc trưng quan trọng nhất từ bộ dữ liệu, và mô hình RF giúp giải quyết các đặc trưng có ảnh hưởng và các liên kết phức tạp của chúng với phân loại đái tháo đường. Điều này dẫn đến độ chính xác tốt trong các phân loại với kỹ thuật kiểm định chéo mười lần.

Để đánh giá hiệu năng của các mô hình ML, một cách tiếp cận kiểm định chéo mười lần [35] cũng được bao gồm trong công trình được đề xuất. Dữ liệu ban đầu được tách thành 10 phần (fold) bằng nhau, sau đó thuật toán ML được tự do thực hiện huấn luyện 10 lần với các phần khác nhau mỗi lần. Hiệu năng của phương pháp này đáng tin cậy hơn so với một phép tách huấn luyện-kiểm tra [36].

Hình 5 Hiệu năng trên bộ dữ liệu PIMA

Hình 6 Hiệu năng trên bộ dữ liệu BRFSS

Bảng 7 Kết quả kiểm định chéo mười lần cho PIDD

| Fold số    |   Độ chính xác (%) |   Độ chuẩn xác (%) |   Độ nhạy (%) |   F 1 score ( %) |
|------------|----------------|-----------------|--------------|------------------|
| 1          |          94.20 |           91.20 |         94.6 |            94.00 |
| 2          |          93.20 |           92.20 |        95.00 |            93.70 |
| 3          |          94.60 |           92.90 |        94.90 |            92.80 |
| 4          |          93.90 |           90.90 |        94.80 |            94.70 |
| 5          |          93.60 |           89.03 |        94.70 |            94.50 |
| 6          |          93.30 |           92.80 |        95.00 |            93.90 |
| 7          |          94.80 |           91.60 |        95.80 |            94.20 |
| 8          |          93.80 |           92.70 |        94.90 |            94.80 |
| 9          |          94.09 |           92.99 |        95.00 |            93.50 |
| 10         |          94.90 |           93.90 |        95.90 |            94.00 |
| Trung bình |          94.03 |           92.02 |        95.06 |            94.00 |

Bảng 8 Kết quả kiểm định chéo mười lần cho BRFSS

| Fold số   |   Độ chính xác (%) |   Độ chuẩn xác (%) |   Độ nhạy (%) |   F 1 score (%) |
|-----------|----------------|-----------------|--------------|-----------------|
| 1         |          91.39 |           87.00 |        98.00 |           92.96 |
| 2         |          91.30 |           88.80 |        98.10 |           93.28 |
| 3         |          91.58 |           87.60 |        98.00 |           93.39 |
| 4         |          92.80 |           86.98 |        98.30 |           93.76 |
| 5         |          92.30 |           87.90 |        98.03 |           93.00 |
| 6         |          91.89 |           88.40 |        98.01 |           93.01 |
| 7         |          91.97 |           88.50 |        97.98 |           92.99 |
| 8         |          91.80 |           88.52 |        98.01 |           92.37 |
| 9         |          92.70 |           88.70 |        98.05 |           92.07 |
| 10        |          92.30 |           88.20 |        98.11 |           93.78 |
| Trung bình |          92.00 |           88.06 |        98.05 |           93.06 |

Bảng 9 Phân tích so sánh của cách tiếp cận được đề xuất với các cách tiếp cận hiện đại nhất

| Tài liệu      | Mô hình ML             |   Độ chính xác (%) |
|---------------|------------------------|----------------|
| [7]           | Random forest          |             73 |
| [8]           | J48 Decision tree      |          73.82 |
| [13]          | Support vector machine |             74 |
| [9]           | Logistic regression    |           74.4 |
| [10]          | Decision tree          |          75.65 |
| [11]          | Ontology classifier    |           77.5 |
| [12]          | Random forest          |           79.5 |
| [14]          | CN2 rule induction     |           80.7 |
| [15]          | XGBoost                |             81 |
| [16]          | AdaBoost               |             83 |
| [17]          | Random forest          |             83 |
| [18]          | XRL model              |          89.46 |
| Công trình đề xuất | RF for PIDD            |             94 |
|               | RF for BRFSS           |             92 |

Bằng cách lấy trung bình các kết quả của tất cả mười lần lặp, tính hiệu quả của mô hình được đánh giá. Trên cơ sở kiểm định được tiến hành qua cách tiếp cận kiểm định chéo mười lần [37], hiệu năng của mô hình bộ phân loại RF với phương pháp trích xuất đặc trưng Boruta (Bảng 7 và 8) [38] được kiểm định. Kết quả là, bằng cách tích hợp với cách tiếp cận trích xuất đặc trưng Boruta, bộ phân loại RF hoạt động tốt hơn.

Bảng 9 cho thấy phân tích so sánh của nhiều phương pháp hiện có với mô hình được đề xuất của chúng tôi trên bộ dữ liệu PIMA. Bảng cho thấy rằng các mô hình được đề xuất vượt trội hơn các mô hình ML đái tháo đường khác đã được nghiên cứu trong phân tích. Chúng tôi đã đánh giá và kiểm định mô hình này, nên nó có thể được dùng cho mục đích thực tế để giúp các bác sĩ phân loại đái tháo đường.

## 6    Kết luận và Phạm vi Tương lai

Trong bài báo này, chúng tôi gợi ý một hệ thống phát hiện hỗ trợ dựa trên một phân tích bốn thuật toán ML trong hai bộ dữ liệu riêng biệt, trong đó việc làm sạch dữ liệu đóng một vai trò chính trong phân loại. Tiêu chuẩn của bộ dữ liệu được nâng cao bằng quy đổi dữ liệu thiếu, phát hiện điểm ngoại lai và một cách tiếp cận random oversampling. Trong bối cảnh này, cân bằng dữ liệu là một mối quan tâm tập trung, nơi kỹ thuật random-over-sampling được giới thiệu để cân bằng cả hai bộ dữ liệu. Nhiều kỹ thuật đo lường, gồm accuracy và recall cùng với F 1 score, được so sánh để khảo sát hiệu năng của các phương pháp ML khác nhau. Các phát hiện phân loại thu được chỉ ra rằng thuật toán random forest hoạt động tốt hơn và cung cấp phân loại chính xác hơn. Tuy nhiên, một số kỹ thuật bổ sung được dùng trong công trình này cũng tạo ra các kết quả lý tưởng nhất so với các phương pháp khác hiện có trong tài liệu.

Mục đích chính của nghiên cứu này là hỗ trợ các bác sĩ chuyên khoa đái tháo đường trong việc phát triển một phác đồ điều trị chính xác cho các bệnh nhân đái tháo đường. Công trình này có thể mở đường cho việc tạo ra một hệ thống chăm sóc sức khỏe kỹ thuật số cho các bệnh nhân đái tháo đường vì độ chuẩn xác cao, chẩn đoán bệnh nhanh, và điều trị nhanh của nó. Nghiên cứu này có một vài lĩnh vực nơi nó có thể được nâng cao hoặc phát triển trong tương lai, như chẩn đoán đái tháo đường qua học sâu và các kỹ thuật lai và việc tạo ra một giải pháp dùng một ứng dụng Android để hỗ trợ mọi người trong việc xác định liệu họ có đái tháo đường hay không. Một số tùy chọn có ý nghĩa sẽ nâng cao hiệu năng của nghiên cứu là dùng các thuật toán phân cụm hoặc các kỹ thuật di truyền như một mô hình tính toán.

Nghiên cứu này đề xuất một ứng dụng IoMT cho công nghệ chẩn đoán điện tử cho phân loại đái tháo đường. Hơn nữa, mô hình này cũng đóng góp vào việc chăm sóc và quan sát từ xa các bệnh nhân đái tháo đường. Việc triển khai IoMT có thể đơn giản hóa quá trình thu thập và đánh giá dữ liệu. Trong tương lai, các phương pháp tự động và máy tính hóa mới với IoMT có thể được tạo ra để cải thiện phân loại đái tháo đường và các bệnh mạn tính khác.

Công trình tương lai có thể bao gồm việc kiểm tra các phương pháp tiền xử lý dữ liệu tinh vi hơn, áp dụng mô hình vào các bệnh khác nhau, hoặc tích hợp các kỹ thuật học sâu để tăng hiệu năng. Hơn nữa, việc thảo luận các thách thức tiềm năng trong việc triển khai các mô hình này trong các môi trường thực tế, như các mối quan ngại về quyền riêng tư dữ liệu, tính diễn giải của mô hình, và khả năng mở rộng qua các hệ thống chăm sóc sức khỏe khác nhau, và gợi ý các giải pháp, sẽ thêm chiều sâu cho nghiên cứu. Việc giải quyết các cân nhắc thực tế này sẽ làm cho nghiên cứu toàn diện hơn và có giá trị hơn cho cả các ứng dụng học thuật và thực tế.

Đóng góp của Tác giả Conceptualization, G.R.A. and X.A.M.; Methodology, X.A.M. and E.G.M.K.; Validation, A.J. and J.E.R.; Investigation, X.A.M. and E.G.M.K.; Resources, A.J. and J.E.R.; Writing - Original Draft Preparation, G.R.A. X.A.M. and E.G.M.K.; Writing - Review & Editing, A.J. and J.E.R.; Supervision, X.A.M. and A.J.

Tài trợ Tài trợ truy cập mở được cung cấp bởi Manipal Academy of Higher Education, Manipal. Nghiên cứu này được thực hiện không có bất kỳ hỗ trợ tài trợ công hay tư nào. Tài trợ truy cập mở được cung cấp bởi Manipal Academy of Higher Education.

Tính sẵn có của Dữ liệu Dữ liệu được dùng cho nghiên cứu này có sẵn công khai trong các liên kết sau: https://  data.  world/  uci/  pima-  india  ns-  diabe  tes; https://  www.  kaggle.  com/  datas  ets/  cdc/  behav  ioral-  risk-  factor-  surve  illan ce-  system. Không có bộ dữ liệu nào khác được tạo ra trong nghiên cứu hiện tại.

## Tuyên bố

Xung đột lợi ích Các tác giả báo cáo rằng không có lợi ích cạnh tranh nào để tuyên bố. Tất cả các tác giả của bản thảo này không có xung đột lợi ích nào để tuyên bố.

## Tài liệu tham khảo

1. Diabetes. https://  www.  who.  int/  news-  room/  fact-  sheets/  detail/ diabe  tes
2. Hassanein, M.: Diabetes and Ramadan: practical guidelines. Diabetes Res. Clin. Pract. 126 , 33-316 (2017)
3. Reed, J., Bain, S., Kanamarlapudi, V.: A review of current trends with type 2 diabetes epidemiology, etiology, pathogenesis, treatments and future perspectives. Diabetes Metab. Syndr. Obes. 14 , 3567-3602 (2021)
4. ElSayed, N.A.: Classification and diagnosis of diabetes: standards of care in diabetes. Diabetes Care 46 , S19-S40 (2020)
5. Facts &amp; Figures. https://  idf.  org/  about  diabe  tes/  what-  is-  diabe  tes/ facts-  figur  es.  html
6. Lu, H., Hajati, S., Moni, F., Khushi, M.: A patient networkbased machine learning model for disease prediction: the case of type 2 diabetes mellitus. Appl. Intell. 52 (3), 2411-2422 (2021)
7. Kim, H.M., Kim, L.: Prediction of type 2 diabetes based on machine learning algorithm. Int. J. Environ. Res. Public Health 18 (6), 3317 (2021)
8. Kandhasamy, J.P., Balamurali, S.: Performance analysis of classifier models to predict diabetes mellitus. Procedia Comput. Sci. 47 , 45-51 (2015)
9. Mohamed Ahmed, T.: Using data mining to develop model for classifying diabetic patient control level based on historical medical records. PJ Theor. Appl. Inf. Technol. 20 (2), 876-880 (2016)
10. Azrar, A., Awais, M., Ali, Y., Zaheer, K.Z.: Data mining models comparison for diabetes prediction. Int. J. Adv. Comput. Sci. Appl. 9 (8), 320-323 (2018)
11. El Massari, H., Mhammedi, S., Sabouri, Z., Gherabi. N.: Ontology based machine learning to predict diabetes patients. In: Lecture notes in networks and system , vol. 357. 2022. pp. 437-445. https:// doi.  org/  10.  1007/  978-3-  030-  91738-8\_  40
12. Chang, V., Vidmar, R.J.: On the use of atmospheric plasmas as electromagnetic reflectors. IEEE Trans. Plasma Sci. 21 (3), 876880 (1992)
13. Chang, N., Singh, J.: Comparative analysis of predictive machine learning algorithms for diabetes mellitus. Bull. Electr. Eng. Inform. 12 (3), 1728-1737 (2023)
14. Sihlangu, N., Millham, R.C.: Analysis of machine learning methods to determine the best data analysis method for diabetes prediction. In: Conference on Information Communication Technology and Society. 2023. https://  ieeex  plore.  ieee.  org/  docum  ent/  10082  727
15. Tasin, R.I., Nabil, T.U., Islam, S., Khan, R.: Diabetes prediction using machine learning and explainable AI techniques. Healthc. Technol. Lett. 10 , 1-2 (2022). https://  doi.  org/  10.  1049/  htl2.  12039
16. Farajollahi, B., Mehmannavaz, B., Mehrjoo, H., Moghbeli, F., Sayadi, M.J.: Diabetes diagnosis using machine learning. Front. Health Inform. 10 (1), 65 (2021)
17. Sivaranjani, S., Ananya, S., Aravinth, J., Karthika., R.: Diabetes prediction using machine learning algorithms with feature selection and dimensionality reduction. In: Conference on Advanced Computing and Communication Systems. 2021. pp. 141-146. https://  ieeex  plore.  ieee.  org/  docum  ent/  10082  727
18. Naz, H., Ahuja, S.: Deep learning approach for diabetes prediction using PIMA Indian dataset. J. Diabetes Metab. Disord. 19 (1), 391-403 (2020)
19. Zhao, M., Wan, J., Qin, W., Huang, X., Chen, G., Zhao, X.: A machine learning based diagnosis modeling of type 2 diabetes mellitus with environmental metal exposure. Comput. Methods Programs Biomed. 235 , 107537 (2023)
20. Siva Shankar, G., Manikandan, K.: Diagnosis of diabetes diseases using optimized fuzzy rule set by gray wolf optimization. Pattern Recognit. Lett. 125 , 432-438 (2019)
21.  Lukmanto, R., Suharjito, B., Nugroho, A., Akbar, H.: Early detection of diabetes mellitus using feature selection and fuzzy support vector machine. Procedia Comput. Sci. 157 ,  46-54 (2019)
22. Raja, J.B., Pandian, S.C.: PSO-FCM based data mining model to predict diabetic disease. Comput. Methods Programs Biomed. 196 , 105659 (2020)
23. Kumari, S., Kumar, D., Mittal, M.: An ensemble approach for classification and prediction of diabetes mellitus using soft voting classifier. Int. J. Cogn. Comput. Eng. 2 , 40-46 (2021)
24. Wongvorachan, T., He, S., Bulut, O.: A comparison of undersampling, oversampling, and SMOTE methods for dealing with imbalanced classification in educational data mining. Information 14 (1), 54 (2023)
25. Sankar Ganesh, P.V., Sripriya, P.: A comparative review of prediction methods for PIMA Indians diabetes dataset. In: Advances in Intelligent Systems and Computing , vol. 1108. pp. 735-750 (2020). https://  doi.  org/  10.  1007/  978-3-  030-  37218-7\_  83
26. Pima Indians Diabetes dataset by UCI | data world. https://  data. world/  uci/  pima-  india  ns-  diabe  tes
27. Diabetes Health Indicators Dataset | Kaggle. https://  www.  kaggle. com/  datas  ets/  alext  eboul/  diabe  tes-  health-  indic  ators-  datase?  resou rce=  dowlo  ad
28. Pima Indians Diabetes Dataset Database | Kaggle. https://  www. kaggle.  com/  datas  ets/  uciml/  pima-  india  ns-  diabe  tes-  datab  ase
29. Behavioral Risk Factor Surveillance System | Kaggle. https:// www.  kaggle.  com/  datas  ets/  cdc/  behav  ioral-  risk-  factor-  surve  illan ce-  system
30. Garcia, G., Luengo, J., Herrera, F.: Intelligent systems reference library 72 data preprocessing in data mining. https://  www.  sprin ger.  com/  series/  8578
31. Joseph, V.R.: Optimal ratio for data splitting. Stat. Anal. Data Min. ASA Data Sci. J. 15 (4), 531-538 (2022). https://  doi.  org/  10. 1002/  sam.  11583
32. Drikvandi, R., Lawal, O.: Sparse principal component analysis for natural language processing. Ann. Data Sci. 10 (1), 25-41 (2023). https://  doi.  org/  10.  1007/  s40745-  020-  00277-x
33. Hassan, D., Hussein, H.I., Hassan, M.: Heart disease prediction based on pretrained deep neural networks combined with principal component analysis. Biomed. Signal Process. Control 79 , 104019 (2023)
34. Zhou, H., Xin, Y., Li, S.: A diabetes prediction model based on Boruta feature selection and ensemble learning. BMC Bioinform. (2023). https://  doi.  org/  10.  1186/  s12859-  023-  05300-5
35. Jaiswal, S., Gupta, P.: Diabetes prediction using bidirectional long short term memory. SN Comput. Sci. 4 (4), 1-10 (2023)
36. Salawu, S.O., Obalalu, A.M., Shamshuddin, M.D.: Non linear solar thermal radiation efficiency and energy optimization for

- magnetized hybrid Prandti-Eyring nanoliquid in aircrafts. Arab. J. Sci. Eng. (2023). https://  doi.  org/  10.  1007/  s13369-  022-  07080-1
37. Mahadeva,  R.,  Kumar,  M.,  Anubhav  Goel,  P.,  Shashikant and Gaurav Manik: A novel AGPS03 based ANN prediction approach:application to the RO desalination plant. Arab. J. Sci. Eng. (2023). https://  doi.  org/  10.  1007/  s13369-  023-  07631-0
38. Tang, Y., Tan, S., Zhou, D.: An improved failure mode and effects analysis method using belief Jensen Shannon divergence and entropy measure in the evidence theory. Arab. J. Sci. Engg. 48 (5), 7163-7176 (2023). https://  doi.  org/  10.  1007/  s13369-  022-  07560-4
39. Towfek, S., Khodadadi, N., Abualigah, L., Rizk, F.: AI in higher education: insights from student surveys and predictive analytics using PSO-guided WOA and linear regression. J. Artif. Intell. Eng. Pract. 1 (1), 1-17 (2024). https://  doi.  org/  10.  21608/  jaiep. 2024.  354003
40. Abdollahzadeh, B., Khodadadi, N., Barshandeh, S., Trojovský, P., Gharehchopogh, F.S., El-kenawy, E.S.M., et al.: Puma optimizer (PO): a novel metaheuristic optimization algorithm and its application in machine learning. Clust. Comput. 27 , 5235-5283 (2024)
41. El-Kenawy, E.S.M., Khodadadi, N., Mirjalili, S., Abdelhamid, A.A., Eid, M.M., Ibrahim, A.: Graylag goose optimization: natureinspired optimization algorithm. Expert Syst. Appl. 238 , 122147 (2024)

Ghi chú của Nhà xuất bản Springer Nature giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã công bố và liên kết thể chế.
