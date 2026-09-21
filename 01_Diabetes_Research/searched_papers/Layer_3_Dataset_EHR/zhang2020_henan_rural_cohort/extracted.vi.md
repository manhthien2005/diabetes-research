<!-- extracted by pdf-extract | engine=docling | pages=10 | ocr=False | tables=4/4 | density=1.07 | score=100 -->

open

## Học máy để mô tả đặc điểm nguy cơ đái tháo đường týp 2 ở một quần thể nông thôn Trung Quốc: Nghiên cứu Đoàn hệ Nông thôn Hà Nam (Henan Rural Cohort Study)

Liying Zhang 1,2 ,  Yikang Wang 2 , Miaomiao ni u 2 , Chongjian Wang 2 &amp; Zhenfei Wang 1*

Cùng với sự phát triển của khai phá dữ liệu (data mining), học máy (machine learning) mang đến cơ hội cải thiện khả năng phân biệt bằng cách phân tích các tương tác phức tạp giữa số lượng khổng lồ các biến. Để kiểm tra khả năng của các thuật toán học máy trong việc dự đoán nguy cơ đái tháo đường týp 2 (T2DM) ở một quần thể nông thôn Trung Quốc, chúng tôi tập trung vào tổng cộng 36,652 người tham gia đủ điều kiện từ Nghiên cứu Đoàn hệ Nông thôn Hà Nam (Henan Rural Cohort Study). Các mô hình đánh giá nguy cơ T2DM được xây dựng bằng sáu thuật toán học máy, bao gồm hồi quy logistic (logistic regression, LR), cây phân loại và hồi quy (classification and regression tree, CART), mạng nơ-ron nhân tạo (artificial neural networks, ANN), máy vector hỗ trợ (support vector machine, SVM), rừng ngẫu nhiên (random forest, RF) và máy tăng cường gradient (gradient boosting machine, GBM). Hiệu năng mô hình được đo bằng diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (area under the receiver operating characteristic curve), độ nhạy (sensitivity), độ đặc hiệu (specificity), giá trị tiên đoán dương (positive predictive value), giá trị tiên đoán âm (negative predictive value) và diện tích dưới đường cong precision-recall (area under precision recall curve). Tầm quan trọng của các biến được xác định dựa trên từng bộ phân loại và phương pháp giải thích cộng tính Shapley (shapley additive explanations). Khi sử dụng tất cả các biến sẵn có, tất cả các mô hình dự đoán nguy cơ T2DM đều thể hiện hiệu năng dự đoán mạnh, với AUC dao động giữa 0.811 và 0.872 khi dùng dữ liệu xét nghiệm và từ 0.767 đến 0.817 khi không dùng dữ liệu xét nghiệm. Trong số đó, mô hình GBM cho hiệu năng tốt nhất (AUC: 0.872 với dữ liệu xét nghiệm và 0.817 khi không có dữ liệu xét nghiệm). Hiệu năng của các mô hình đạt trạng thái bão hòa khi đưa 30 biến vào mỗi mô hình, ngoại trừ mô hình CART. Trong số 10 biến hàng đầu trên tất cả các phương pháp có: vị ngọt (sweet flavor), glucose niệu (urine glucose), tuổi, nhịp tim, creatinine, vòng eo, acid uric, áp lực mạch (pulse pressure), insulin và tăng huyết áp. Các yếu tố nguy cơ quan trọng mới (các chỉ số nước tiểu, vị ngọt) không được tìm thấy trong các phương pháp dự đoán nguy cơ trước đây, nhưng đã được học máy xác định trong nghiên cứu của chúng tôi. Thông qua các kết quả này, các phương pháp học máy đã chứng tỏ năng lực trong việc dự đoán nguy cơ T2DM, mang lại những hiểu biết sâu sắc hơn về các yếu tố nguy cơ bệnh tật mà không cần giả định trước về quan hệ nhân quả.

Đái tháo đường týp 2 (T2DM) là một rối loạn chuyển hóa lâu dài với tỷ lệ mắc bệnh cao ở con người trên toàn thế giới. Tỷ lệ hiện mắc đái tháo đường đang gia tăng nhanh chóng trên toàn cầu, bao gồm cả Trung Quốc 1 . Tại Trung Quốc, theo báo cáo của liên đoàn đái tháo đường quốc tế (international diabetes federation) năm 2017, đái tháo đường được ước tính ảnh hưởng đến 144.4 triệu người trong độ tuổi 20-79 2 . Tỷ lệ hiện mắc đái tháo đường ở quần thể nông thôn tỉnh Hà Nam cao, điều này có thể thấy trong Nghiên cứu Đoàn hệ Nông thôn Hà Nam 3 . Mặc dù đái tháo đường là một bệnh không thể đảo ngược, nó phần lớn có thể phòng ngừa được 4 . Nguy cơ phát triển đái tháo đường sẽ được giảm thiểu thông qua phát hiện sớm và các can thiệp lối sống. Đối với việc chăm sóc từng bệnh nhân, các bác sĩ có sự chuẩn bị tốt để nhận diện những người có nguy cơ mắc T2DM. Tuy nhiên, khi cố gắng sàng lọc hàng nghìn bệnh nhân có các tình trạng nguy cơ cao, những thách thức mà các bác sĩ phải đối mặt trở nên rõ ràng. Cần có các kỹ thuật phân tích để hỗ trợ sàng lọc hàng loạt T2DM.

Nhiều thang điểm nguy cơ dựa trên kiến thức thống kê đã được phát triển để dự đoán nguy cơ phát triển T2DM của từng cá nhân, chẳng hạn như công thức đánh giá nguy cơ 5 , mô hình đái tháo đường được kiểm chứng qua thử nghiệm Archimedes 6 , thang điểm nguy cơ đái tháo đường (the diabetes risk score) 7 , thang điểm nguy cơ di truyền (genetic risk score) 8 , Thang điểm Nguy cơ Đái tháo đường Trung Quốc Mới (New Chinese Diabetes Risk Score) 42  và mô hình nguy cơ của Học viện Bác sĩ Gia đình Hoa Kỳ (American Academy of Family Physicians) 9 . Những phương pháp này đưa ra giả định ngầm rằng mỗi yếu tố nguy cơ có quan hệ tuyến tính với kết cục. Các mối quan hệ phức tạp giữa các yếu tố tương tác phi tuyến có thể bị đơn giản hóa quá mức, dẫn đến khả năng mất mát thông tin liên quan 10,11 . Hơn nữa, khi số lượng biến tăng lên, phương pháp kiểm định giả thuyết

ͷ School of Information Engineering, Zhengzhou University, Zhengzhou, Henan, P.R. China. ͸ Department of Epidemiology and Biostatistics, College of Public Health, Zhengzhou University, Zhengzhou, Henan, P.R. China.

*email: iezfwang@zzu.edu.cn

trở nên phức tạp 12 . Trái ngược với các phương pháp truyền thống, học máy có thể học các tương tác phi tuyến một cách lặp đi lặp lại từ lượng lớn dữ liệu bằng các thuật toán máy tính 13 , vốn đã được áp dụng trong nhiều lĩnh vực khác nhau, chẳng hạn như đánh giá và dự đoán nguy cơ bệnh tật 14,15 . Nghiên cứu gần đây cho thấy các phương pháp học máy có thể mô tả đặc điểm của bệnh nhân và nhận diện những bệnh nhân có nguy cơ phát triển T2DM 16,17 . Một nghiên cứu đã minh họa hiệu năng của máy vector hỗ trợ trong việc phát hiện những người mắc đái tháo đường và tiền đái tháo đường 18 . Để đánh giá khả năng ước lượng nguy cơ phát triển T2DM, một nghiên cứu đã đánh giá hiệu năng của các kỹ thuật học máy và thống kê khác nhau, và kết quả thực nghiệm cho thấy hiệu năng tổng thể của các tổ hợp (ensembles) ANN tốt hơn các mô hình khác 19 . Một quy trình khai phá dữ liệu dựa trên thuật toán phân loại đã được xây dựng để dự đoán các biến chứng T2DM dựa trên dữ liệu hồ sơ sức khỏe điện tử (electronic health record) từ gần một nghìn bệnh nhân, điều này cho thấy tính hợp lệ của phương pháp học máy 20 . Một phương pháp tổ hợp (ensemble) sử dụng phương pháp bỏ phiếu (vote) với ba Cây Quyết định (Decision Trees) đã được phát triển để dự đoán đái tháo đường mới mắc bằng 13 thuộc tính 21 , và đã cải thiện giá trị AUC lên 0.922. Một phương pháp gom cụm và phân loại kết hợp (joint clustering and classification, JCC) mới mẻ có thể khám phá các đặc trưng cụm ẩn trong các mẫu bệnh nhân đã được phát triển để dự đoán đái tháo đường, và phương pháp này cho hiệu năng tốt nhất trong số các phương pháp có thể áp dụng cho việc diễn giải dự đoán 22 . Một nghiên cứu đã sử dụng mạng nơ-ron, cây quyết định và rừng ngẫu nhiên để dự đoán đái tháo đường với 14 thuộc tính, và kết quả cho thấy phương pháp có độ chính xác cao nhất là rừng ngẫu nhiên 23 . Một nghiên cứu khác đã so sánh hiệu năng của nhiều kỹ thuật học máy để dự đoán nguy cơ phát triển T2DM trong ngắn hạn, trung hạn và dài hạn, và kết quả cho thấy hồi quy logistic vượt trội trong ngắn hạn và trung hạn, trong khi máy vector hỗ trợ thể hiện hiệu năng tốt hơn trong dài hạn 24 . Một khung làm việc dựa trên học máy để nhận diện các đối tượng mắc T2DM từ EHR đã được xây dựng thông qua kỹ thuật xây dựng đặc trưng (feature engineering), và kết quả cho thấy khung này thực hiện nhận diện tốt hơn so với thuật toán chuyên gia 25 .

Tuy nhiên, các phương pháp hiện tại chỉ tập trung vào việc so sánh hiệu năng của các kỹ thuật dự đoán với số lượng biến cố định, và chúng cũng được thực hiện trên một mẫu quần thể nhỏ. Cho đến nay, chưa có nghiên cứu quy mô lớn nào áp dụng học máy để đánh giá nguy cơ trong quần thể nông thôn chung. Do đó, mục đích của nghiên cứu này là (1) đánh giá một loạt các thuật toán học máy để dự đoán nguy cơ T2DM ở một quần thể nông thôn Trung Quốc; (2) nhận diện các biến quan trọng, và (3) chỉ ra hiệu năng của từng mô hình trên các số lượng biến khác nhau.

## Phương pháp

Đối tượng nghiên cứu. Đối tượng của nghiên cứu này đến từ Nghiên cứu Đoàn hệ Nông thôn Hà Nam (Henan Rural Cohort Study) (Số đăng ký: ChiCTR-OOC-15006699). Tổng cộng 39259 người tham gia trong độ tuổi từ 18 đến 79 tuổi đã được tuyển chọn từ năm vùng nông thôn ở tỉnh Hà Nam, Trung Quốc trong khoảng thời gian từ tháng Bảy 2015 đến tháng Chín 2017. Thiết kế và các đặc điểm quần thể của nghiên cứu đã được mô tả trong các bài báo trước đây 26-28 . Dữ liệu về các đặc điểm nhân khẩu học - xã hội, thông tin khám sức khỏe thể chất và dữ liệu xét nghiệm đã được thu thập. Người tham gia bị loại trừ nếu họ: (1) được chẩn đoán suy thận (N = 18) hoặc ung thư (N = 332); (2) mắc đái tháo đường týp 1 (N = 4); (3) mắc đái tháo đường thai kỳ (N = 634); (4) có thông tin không đầy đủ về chẩn đoán T2DM (N = 63); và (5) có thông tin không đầy đủ về các biến số tiềm năng (n = 2127). Cuối cùng, 36,652 người tham gia được đưa vào nghiên cứu hiện tại.

Định nghĩa T2DM. Sau khi loại trừ những người tham gia mắc đái tháo đường týp 1, đái tháo đường thai kỳ và các týp đái tháo đường đặc biệt khác, T2DM được định nghĩa là tiền sử tự báo cáo về việc đã được bác sĩ chẩn đoán đái tháo đường hoặc mức glucose huyết tương lúc đói ≥ 7.0 mmol/L theo tiêu chuẩn chẩn đoán của Hiệp hội Đái tháo đường Hoa Kỳ (American Diabetes Association, ADA) 29 .

Các phương pháp học máy. Chúng tôi đã sử dụng hồi quy logistic, mạng nơ-ron nhân tạo, cây phân loại và hồi quy, máy vector hỗ trợ, và học tổ hợp (ensemble learning) (rừng ngẫu nhiên và máy tăng cường gradient) để xây dựng mô hình đánh giá nguy cơ. Từ mô tả về các đặc điểm cơ bản của nhóm không mắc T2DM và nhóm mắc T2DM, dữ liệu bị mất cân bằng. Mô hình có khả năng bị thiên lệch về phía lớp chiếm ưu thế, với độ chính xác kém trong việc phân loại các trường hợp âm tính. Trước vấn đề này, thuật toán Kỹ thuật Lấy mẫu Tăng cường Lớp Thiểu số Tổng hợp (Synthetic Minority Over-Sampling Technique, SMOTE) 24,30,31 đã được sử dụng để xử lý dữ liệu. Tất cả các mô hình được xây dựng bằng gói sklearn (0.21.3) của ngôn ngữ lập trình Python 3.7.

Mạng nơ-ron nhân tạo. Mạng nơ-ron nhân tạo 32 là các hệ thống tính toán dựa trên các nơ-ron của não người. ANN có thể học tất cả các tương tác phức tạp và phi tuyến giữa các biến để tìm kiếm các mẫu trong dữ liệu. ANN được chia thành mạng nơ-ron nhiều lớp ẩn và mạng nơ-ron một lớp ẩn. Mỗi lớp chứa một số nơ-ron được kết nối bằng các cung có hướng với trọng số biến đổi. Trong nghiên cứu của chúng tôi, mạng nơ-ron gồm ba lớp: một lớp đầu vào để tiếp nhận tất cả các yếu tố nguy cơ, một lớp ẩn để xử lý thông tin và một lớp đầu ra để tính toán các phản hồi.

Cây phân loại và hồi quy. Cây quyết định là một cấu trúc cây trong đó mỗi nút nội bộ đại diện cho một phép kiểm tra trên một thuộc tính, mỗi nhánh đại diện cho một kết quả kiểm tra, và mỗi nút lá đại diện cho một danh mục 33 . Các thuật toán điển hình của cây quyết định bao gồm ID3, C4.5, CART, và những thuật toán khác. Xét đến việc ứng dụng rộng rãi của CART trong nghiên cứu lâm sàng và cơ bản, chúng tôi đã sử dụng CART trong nghiên cứu này 34 . CART là một công nghệ học cây quyết định phi tham số, tạo ra cây phân loại hoặc cây hồi quy tùy theo biến phụ thuộc là phân loại hay số 35 .

Hồi quy logistic. Hồi quy logistic (LR) là một mô hình phân tích hồi quy tuyến tính tổng quát, hoạt động để tìm mô hình phù hợp nhất có thể mô tả mối quan hệ giữa các biến phụ thuộc và các yếu tố dự đoán độc lập 36 . Mô hình LR được sử dụng rộng rãi nhất khi người ta quan tâm đến việc dự đoán bệnh tật hoặc tình trạng sức khỏe 37 . Mô hình LR có thể tính toán xác suất một cá nhân phát triển T2DM dựa trên các yếu tố nguy cơ được nhập vào. Nếu một www.nature.com/scientificreports đối tượng mắc T2DM, giá trị của Y là 1; ngược lại, Y là 0. Chúng tôi định nghĩa xác suất một cá nhân phát triển T2DM là = | = p Y X p X ( 1 ) ( ). Khi đó, công thức của mô hình LR được định nghĩa như sau.

<!-- formula-not-decoded -->

và tương đương, sau khi lấy hàm mũ cả hai vế:

<!-- formula-not-decoded -->

Xác suất một cá nhân phát triển T2DM là

<!-- formula-not-decoded -->

Trong đó  X X X X ( , ) k 1 2 = đại diện cho các yếu tố nguy cơ,  β β β β = ( , ) k 1 2 là các hệ số được ước lượng bằng phương pháp hợp lý cực đại (maximum likelihood).

Máy vector hỗ trợ. Máy vector hỗ trợ (SVM) là một loại bộ phân loại tuyến tính tổng quát phân loại dữ liệu nhị phân theo học có giám sát (supervised learning). Ranh giới quyết định của nó là siêu phẳng có lề tối đa (maximum margin hyper plane) cho các lớp dương và âm 38 . Trong nghiên cứu của chúng tôi, mỗi mẫu dữ liệu gồm 60 đặc trưng. Giá trị của mỗi đặc trưng là một vector của một chiều cụ thể. Sau đó, chúng tôi đã sử dụng SVM để xây dựng một siêu phẳng trong không gian nhiều chiều, có thể phân biệt tốt hai lớp.

Học tổ hợp. Học tổ hợp (ensemble learning) là một thuật toán kết hợp các bộ học cơ bản như cây quyết định và bộ phân loại tuyến tính. Ý tưởng chính của học tổ hợp là sử dụng nhiều thuật toán học để đạt được hiệu năng tốt hơn bất kỳ thuật toán học thành phần nào một mình. Các loại tổ hợp phổ biến là boosting, bagging, không gian con ngẫu nhiên (random subspace).

Rừng ngẫu nhiên (RF) là một thuật toán kết hợp lý thuyết học tổ hợp bagging với phương pháp không gian con ngẫu nhiên. RF tạo ra nhiều cây quyết định để phân tách dữ liệu một cách ngẫu nhiên tại thời điểm huấn luyện. Đối với mỗi nút của cây quyết định cơ sở, một tập con chứa K thuộc tính được chọn ngẫu nhiên từ tập thuộc tính của nút đó, và sau đó một thuộc tính tối ưu được chọn từ tập con để phân chia. Mỗi cây cung cấp một phân loại như một lá phiếu cho mỗi cây, và RF cuối cùng chọn phân loại có nhiều phiếu nhất 39 .

Máy tăng cường gradient (GBM) là một thuật toán lặp mà ý tưởng cốt lõi là huấn luyện các bộ phân loại khác nhau (bộ phân loại yếu) cho cùng một tập huấn luyện, rồi kết hợp các bộ phân loại yếu này để tạo thành một bộ phân loại cuối cùng mạnh hơn (bộ phân loại mạnh). Thông qua một loạt các vòng lặp để tối ưu hóa kết quả phân loại, mỗi vòng lặp được đưa vào một bộ phân loại yếu, nhằm khắc phục những hạn chế hiện có của tổ hợp bộ phân loại yếu. GBM dựa trên phần dư của dữ liệu huấn luyện được khớp bởi bộ phân loại yếu trước đó để tăng cường mô hình khi huấn luyện mỗi bộ phân loại yếu. So với hầu hết các thuật toán học, nó ít có xu hướng quá khớp (over fitting) hơn.

Hình 1 trình bày phương pháp luận của nghiên cứu này. Trong nghiên cứu này, các mô hình đánh giá nguy cơ T2DM được phát triển bằng 6 thuật toán ML trên tất cả các biến. Tiếp theo, các thuật toán được đưa vào một cách lặp đi lặp lại với số lượng biến được xếp hạng tăng dần (5/10/15/ … ) do chính thuật toán lựa chọn. Tất cả các mô hình được huấn luyện và kiểm tra bằng kiểm định chéo 10 lần (10-fold cross-validation) trong mỗi quá trình lặp, được lặp lại 100 lần. Hiệu năng của tất cả các mô hình được tính toán trên các mẫu kiểm tra. Tất cả các tham số của mô hình được xác định bằng kiểm định chéo 10 lần và tìm kiếm dạng lưới (grid search) trên dữ liệu huấn luyện (Supplementary Table 2).

Phân tích thống kê và đánh giá mô hình. Hiệu năng mô hình: Khả năng phân biệt (Discrimination) đề cập đến khả năng của mô hình trong việc nhận diện ai có nguy cơ phát triển T2D và ai không. Chúng tôi đã sử dụng độ nhạy, độ đặc hiệu, giá trị tiên đoán dương (PPV), giá trị tiên đoán âm (NPV), diện tích dưới đường cong precision-recall (AUPR) và diện tích dưới đường cong (AUC) để đánh giá khả năng phân biệt. Độ nhạy là từ đồng nghĩa với tỷ lệ thu hồi (recall rate), tỷ lệ dương tính thật, và đại diện cho tỷ lệ các mẫu dương tính thực sự được nhận diện chính xác. Ví dụ, trong nghiên cứu của chúng tôi, đối tượng được chẩn đoán T2DM được định nghĩa là 1, tức là mẫu dương tính. Ngược lại, đó là mẫu âm tính (0). Độ đặc hiệu cho biết tỷ lệ các mẫu âm tính thực sự có thể được phát hiện chính xác. PPV biểu thị tỷ lệ kết quả dương tính trong các xét nghiệm chẩn đoán là kết quả dương tính thật. NPV là tỷ lệ kết quả âm tính trong các xét nghiệm chẩn đoán là kết quả âm tính thật. Đối với các mô hình phân loại nhị phân, AUC và AUPR cũng được sử dụng để đánh giá hiệu năng.

Tầm quan trọng của biến: Đối với nghiên cứu đái tháo đường, chúng tôi cũng liệt kê tầm quan trọng của các biến. Đối với mô hình LR và SVM, tầm quan trọng của biến được xác định bởi độ lớn hiệu ứng của hệ số. Mô hình CART ước lượng tầm quan trọng của biến bằng cách cộng các thay đổi trong sai số bình phương trung bình do các phép phân tách trên mỗi biến và chia tổng đó cho số nút nhánh. Tầm quan trọng của biến của RF được ước lượng bằng cách hoán vị các quan sát biến ngoài túi (out-of-bag). GBM tính tầm quan trọng của biến bằng cách cộng các ước lượng này trên tất cả các bộ học yếu trong phương pháp tổ hợp phân loại. ANN sử dụng tổng trọng số kết nối của biến để lọc các biến 40 . Để kết hợp tầm quan trọng của biến của từng phương pháp, tầm quan trọng của biến cũng được ước lượng bằng phương pháp giải thích cộng tính Shapley (shapley additive explanations), đây là một phương pháp thống nhất để giải thích đầu ra của bất kỳ mô hình học máy nào 41 .

Các biến phân loại được mô tả dưới dạng phần trăm (%), và các biến liên tục được trình bày dưới dạng trung bình ± độ lệch chuẩn (SD). Sự khác biệt về các đặc điểm của nhóm T2DM và nhóm Non-T2DM được xác định bằng kiểm định chi bình phương cho các biến phân loại và kiểm định t cho các biến liên tục. Tất cả các phân tích thống kê được thực hiện bằng SPSS (v.21, IBM) và giá trị P hai phía &lt; 0.05 được coi là có ý nghĩa thống kê.

Hình 1. Phương pháp luận. Viết tắt: LR, hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ; PPV, giá trị tiên đoán dương; NPV , giá trị tiên đoán âm; AUC, diện tích dưới đường cong; AUPR, diện tích dưới đường cong precision-recall.

Phê duyệt đạo đức. Phê duyệt đạo đức được lấy từ 'Zhengzhou University Life Science Ethics Committee', và sự đồng thuận có hiểu biết bằng văn bản đã được lấy từ tất cả người tham gia. Mã phê duyệt đạo đức: [2015] MEC (S128). Nghiên cứu hiện tại được thực hiện phù hợp với các hướng dẫn của Tuyên ngôn Helsinki.

## Kết quả

Các đặc điểm cơ bản. Các đặc điểm chung của quần thể nghiên cứu được trình bày trong Bảng 1. Quần thể nghiên cứu gồm 14,375 nam và 22,277 nữ. So với những người tham gia không mắc T2DM, các cá nhân mắc T2DM có xu hướng có tuổi, BMI, vòng eo, nhịp tim, tỷ lệ eo trên chiều cao, glucose niệu, cholesterol lipoprotein tỷ trọng thấp cao hơn, và có nhiều khả năng có tiền sử gia đình mắc T2DM, tăng huyết áp, bệnh tim mạch vành. Ngược lại, ở những người tham gia không mắc T2DM, creatinine cao hơn, cholesterol lipoprotein tỷ trọng cao hơn, và acid uric cao hơn phổ biến hơn. Chi tiết thêm được trình bày trong Supplementary Table 1.

Phân tích tầm quan trọng của biến. 10 biến hàng đầu theo tầm quan trọng của biến của mỗi thuật toán được trình bày trong Bảng 2 (Supplementary Table 3). Mức glucose niệu tăng cao được trình bày là biến được xếp hạng cao nhất bởi tất cả các thuật toán. Các chỉ số béo phì lặp đi lặp lại xuất hiện ở đầu danh sách, chẳng hạn như tỷ lệ eo trên hông và tỷ lệ eo trên chiều cao. Hiện tượng này xác nhận rằng béo phì là một yếu tố nguy cơ của T2DM. Tăng huyết áp được hầu hết các mô hình xếp hạng là một yếu tố quan trọng của T2DM, có lẽ phản ánh mối quan hệ giữa tăng huyết áp và sự phát triển của T2DM. Các yếu tố nguy cơ trong Thang điểm Nguy cơ Đái tháo đường Trung Quốc Mới (New Chinese Diabetes Risk Score) bao gồm giới tính, tuổi, tiền sử gia đình mắc đái tháo đường, vòng eo, BMI, SBP . Một số yếu tố nguy cơ của Thang điểm Nguy cơ Đái tháo đường Trung Quốc Mới (tuổi, tiền sử gia đình mắc đái tháo đường, giới tính và SBP) đã xuất hiện trong danh sách các biến được xếp hạng cao nhất trong nghiên cứu của chúng tôi. Các biến phổ biến cho đái tháo đường cũng được các phương pháp học máy nhận diện, chẳng hạn như các yếu tố di truyền, tăng huyết áp, insulin, và những yếu tố khác. Ngoài ra, các biến quan trọng mới (các thông số nước tiểu) không được tìm thấy trong các phương pháp dự đoán nguy cơ trước đây nhưng đã được học máy xác định. Hơn nữa, các mô hình LR, SVM và ANN ưu tiên yếu tố di truyền và các thông số nước tiểu, chẳng hạn như tiền sử T2DM của mẹ/cha, glucose niệu, protein niệu, và những thông số khác.

Chúng tôi đã phân tích tầm quan trọng của các biến dựa trên tất cả các mô hình bằng phương pháp giải thích cộng tính Shapley (shapley additive explanations) (Supplementary Table 4). Như được thể hiện trong Bảng 3. Trong số 10 biến hàng đầu trên tất cả các phương pháp có vị ngọt, glucose niệu, tuổi, nhịp tim, creatinine, vòng eo, acid uric, áp lực mạch, insulin và tăng huyết áp.

So sánh hiệu năng mô hình. Bảng 4 trình bày kết quả so sánh của các thuật toán học máy. Khi sử dụng tất cả các biến sẵn có, tất cả các mô hình dự đoán nguy cơ T2DM đều thể hiện hiệu năng dự đoán mạnh, với AUC dao động giữa 0.811 và 0.872. Mô hình GBM cho hiệu năng tốt nhất (AUC = 0.872 với các biến xét nghiệm), và cũng cho độ đặc hiệu tốt hơn (81.71%), giá trị tiên đoán dương (28.83%), và AUPR

Bảng 1. Các đặc điểm chung của quần thể nghiên cứu. Viết tắt: SD, độ lệch chuẩn; HDL-C, cholesterol lipoprotein tỷ trọng cao; LDL-C, cholesterol lipoprotein tỷ trọng thấp; T2DM, đái tháo đường týp 2.

| Biến                                     | Tổng (n = 36652)   | Non-T2DM (n 1 = 33296)   | T2DM (n 2 = 3356)   | Giá trị P   |
|------------------------------------------|---------------------|--------------------------|---------------------|-----------|
| Tuổi (năm)                               | 55.60 ± 12.17       | 55.11 ± 12.32            | 60.51 ± 9.20        | < 0.001   |
| Nam, n (%)                               | 14375(39.22)        | 13114(39.39)             | 1261(37.54)         | 0.040     |
| Học vấn, n (%)                           |                     |                          |                     | < 0.001   |
| ≤ Tiểu học                               | 16432(44.83)        | 14567(43.75)             | 1865(55.57)         |           |
| Trung học cơ sở                          | 14614(39.87)        | 13507(40.57)             | 1107(32.99)         |           |
| ≥ Trung học phổ thông                    | 5606(15.30)         | 5222(15.68)              | 384(11.44)          |           |
| Hôn nhân, n (%)                          |                     |                          |                     | 0.027     |
| Kết hôn/sống chung                       | 32927(89.84)        | 29949(89.95)             | 29877(88.74)        |           |
| Ly hôn/góa/chưa kết hôn                  | 3725(10.16)         | 3347(10.05)              | 378(11.26)          |           |
| Thu nhập cá nhân trung bình hàng tháng, n (%) |                |                          |                     | < 0.001   |
| < 1000                                   | 25111(68.51)        | 22709(68.20)             | 2402(71.57)         |           |
| 1000~                                    | 8833(24.10)         | 8083(24.28)              | 750(22.35)          |           |
| ≥ 2000                                   | 2708(7.39)          | 2504(7.52)               | 204(6.08)           |           |
| Chế độ ăn nhiều chất béo, ( ≥ 75g/ngày)  | 7088(19.34)         | 6544(19.65)              | 544(16.21)          | < 0.001   |
| Vị ngọt, n (%)                           |                     |                          |                     | < 0.001   |
| Không                                    | 15872(43.30)        | 13495(40.53)             | 2377(70.83)         |           |
| Nhẹ                                      | 14217(38.79)        | 13500(40.55)             | 717(21.36)          |           |
| Trung bình                               | 5720(15.61)         | 5494(16.50)              | 226(6.73)           |           |
| Nặng                                     | 843(2.30)           | 807(2.42)                | 36(1.07)            |           |
| Vòng eo (cm)                             | 84.13 ± 10.33       | 83.62 ± 10.22            | 89.32 ± 10.01       | < 0.001   |
| Chỉ số khối cơ thể (kg/m 2 )             | 24.85 ± 3.53        | 24.72 ± 3.49             | 26.20 ± 3.62        | < 0.001   |
| Tỷ lệ eo trên hông                       | 0.89 ± 0.07         | 0.88 ± 0.07              | 0.93 ± 0.07         | < 0.001   |
| Áp lực mạch(mmHg)                        | 48.25 ± 13.08       | 47.72 ± 12.85            | 53.45 ± 14.22       | < 0.001   |
| Nhịp tim (nhịp/phút)                     | 75.72 ± 11.12       | 75.34 ± 10.94            | 79.54 ± 12.13       | < 0.001   |
| Cholesterol toàn phần (mmol/l)           | 4.75 ± 0.97         | 4.72 ± 0.95              | 5.01 ± 1.11         | < 0.001   |
| Triglyceride (mmol/l)                    | 1.68 ± 1.12         | 1.64 ± 1.07              | 2.13 ± 1.44         | < 0.001   |
| HDL-C (mmol/l)                           | 1.32 ± 0.33         | 1.33 ± 0.33              | 1.23 ± 0.32         | < 0.001   |
| LDL-C (mmol/l)                           | 2.87 ± 0.81         | 2.85 ± 0.80              | 3.06 ± 0.93         | < 0.001   |
| Insulin (ug/l)                           | 10.85 ± 5.30        | 10.69 ± 5.04             | 12.51 ± 7.19        | < 0.001   |
| Creatinine (umol/L)                      | 62.07 ± 14.00       | 62.31 ± 13.75            | 59.61 ± 16.08       | < 0.001   |
| Acid uric(umol/L)                        | 286.50 ± 79.29      | 287.77 ± 79.19           | 273.87 ± 79.22      | < 0.001   |
| Protein niệu, n (%)                      | 1087(2.97)          | 797(2.39)                | 290(8.64)           | < 0.001   |
| Glucose niệu, n (%)                      | 915(2.50)           | 125(0.38)                | 790(23.54)          | < 0.001   |
| Tăng huyết áp, n (%)                     | 11943(32.58)        | 10225(30.71)             | 1718(51.19)         | < 0.001   |
| Bệnh tim mạch vành, n (%)                | 1620(4.42)          | 1368(4.11)               | 252(7.51)           | < 0.001   |
| Tiền sử T2DM của mẹ, n (%)               | 1070(2.92)          | 813(2.44)                | 257(7.66)           | < 0.001   |
| Tiền sử T2DM của cha, n (%)              | 532(1.45)           | 432(1.30)                | 100(1.45)           | < 0.001   |

(0.546). Về độ chính xác và giá trị tiên đoán âm, dữ liệu cho thấy mô hình RF vẫn duy trì hiệu năng dự đoán mạnh (85.90%, và 97.52% tương ứng). Độ nhạy của mô hình ANN là tốt nhất trong số tất cả các mô hình. Khi chỉ sử dụng dữ liệu không xét nghiệm, chẳng hạn như BMI, tuổi, đã dẫn đến sự sụt giảm lớn về hiệu năng mô hình. Hơn nữa, các mô hình chỉ với dữ liệu không xét nghiệm cũng tốt hơn đáng kể so với Thang điểm Nguy cơ Đái tháo đường Trung Quốc Mới (New Chinese Diabetes Risk Score) 42 dựa trên kiến thức thống kê chỉ sử dụng dữ liệu không xét nghiệm (AUC = 0.728, p &lt; 0.05) (Supplementary Figure 1).

Hình 2 hiển thị các đường cong đặc trưng hoạt động của bộ thu nhận của mỗi mô hình với tất cả các biến. Hình ảnh trực quan này cho thấy GBM thực hiện tương tự như mô hình RF, và hai mô hình thể hiện sự vượt trội hơn so với mô hình ANN ( p &lt; 0.05 ), với 0.872, 0.868 và 0.858 tương ứng. Ba mô hình trên (GBM, RF và ANN) thực hiện tốt hơn đáng kể so với CART (AUC = 0.11), LR (AUC = 0.841), và SVM (AUC = 0.835) ( p &lt; 0.05 ). Diện tích dưới đường cong precision-recall cũng cho thấy các kết quả tương tự (Hình 3).

Hiệu năng mô hình với số lượng biến khác nhau. Để so sánh hiệu năng của các mô hình khác nhau trên số lượng biến khác nhau, 5/10/15 … biến được xếp hạng cao nhất của mỗi mô hình được đưa vào liên tiếp vào mỗi mô hình. Như được thể hiện trong Hình 4. Nhìn chung, khi số lượng biến tăng lên, đồ thị cho thấy sự gia tăng các giá trị AUC ngoại trừ mô hình CART. Trước khi đưa vào 30 biến, các mô hình LR, GBM, ANN, SVM và RF thể hiện xu hướng tăng mạnh về các giá trị AUC. Hiệu năng của www.nature.com/scientificreports năm mô hình đạt trạng thái bão hòa khi đưa 30 biến vào mỗi mô hình. Sau đó, tất cả các xu hướng cho thấy sự dao động nhẹ, nhưng các thay đổi là không đáng kể. Mô hình CART duy trì một xu hướng giá trị AUC không đổi.

Bảng 2. 10 biến được xếp hạng hàng đầu theo tầm quan trọng của biến đối với mỗi thuật toán. Viết tắt: LR, hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ.

| Hạng   | Thuật toán học máy                  | Thuật toán học máy            | Thuật toán học máy            | Thuật toán học máy            | Thuật toán học máy            | Thuật toán học máy                  |
|--------|-------------------------------------|-------------------------------|-------------------------------|-------------------------------|-------------------------------|-------------------------------------|
| Hạng   | LR                                  | CART                          | GBM                           | ANN                           | RF                            | SVM                                 |
| 1      | Urine glucose                       | Urine glucose                 | Urine glucose                 | Urine glucose                 | Urine glucose                 | Urine glucose                       |
| 2      | Diabetes history of mother          | Sweet flavor                  | Sweet flavor                  | Diabetes history of mother    | Sweet flavor                  | Urinary protein                     |
| 3      | Urinary protein                     | Sour flavor                   | Waist to hip ratio            | Urinary protein               | Waist to hip ratio            | Diabetes history of mother          |
| 4      | Diabetes history of father          | Waist to hip ratio            | Hypertension                  | Urine latent blood            | Age                           | Diabetes history of father          |
| 5      | Urine ketone bodies                 | Age                           | More vegetables and fruits    | Sweet flavor                  | Creatinine                    | Urine ketone bodies                 |
| 6      | Hypertension                        | Diabetes history of mother    | Age                           | Diabetes history of father    | Uric acid                     | Hypertension                        |
| 7      | Coronary heart disease              | Waist to height ratio         | Urinary vitaminC              | Urine ketone bodies           | Heart rate                    | Coronary heart disease              |
| 8      | Low-density lipoprotein cholesterol | Insulin                       | UrinePH                       | Gender                        | Insulin                       | Low-density lipoprotein cholesterol |
| 9      | UrinePH                             | Pulse pressure                | Sour flavor                   | Systolic blood pressure       | Triglyceride                  | UrinePH                             |
| 10     | Urine nitrite                       | Heart rate                    | Diabetes history of mother    | Hypertension                  | Waist to height ratio         | Urine nitrite                       |

Bảng 3. Xếp hạng biến dựa trên hạng trung bình của tất cả các mô hình dựa trên phương pháp giải thích cộng tính Shapley (shapley additive explanations). LR chỉ hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ.

| Mô hình         |                     |   LR |   CART |   GBM |   ANN |   RF |   SVM |   Hạng trung bình |
|-----------------|---------------------|------|--------|-------|-------|------|-------|-------------|
| Đặc trưng       | Sweet flavor        |    3 |      2 |     1 |     4 |    1 |     3 |        2.33 |
| Đặc trưng       | Urine glucose       |    5 |      1 |     3 |     6 |    2 |     1 |           3 |
| Đặc trưng       | Age                 |    2 |      4 |     2 |     5 |    4 |     2 |        3.17 |
| Đặc trưng       | Heart rate          |    8 |     10 |     4 |    10 |    6 |     8 |        7.67 |
| hạng tầm quan trọng | Creatinine          |    7 |     13 |     6 |     9 |    9 |     6 |        8.33 |
| hạng tầm quan trọng | Waist circumference |    4 |     20 |    11 |     7 |   11 |     4 |         9.5 |
| hạng tầm quan trọng | Uric acid           |   10 |     19 |     7 |    14 |   12 |     7 |        11.5 |
| hạng tầm quan trọng | Pulse pressure      |   16 |      7 |    10 |    11 |   10 |    20 |       12.33 |
| hạng tầm quan trọng | Insulin             |   12 |      8 |    14 |    15 |   18 |    13 |       13.33 |
| hạng tầm quan trọng | Hypertension        |   15 |     32 |     9 |    18 |    5 |    11 |          15 |

## Bàn luận

Bằng các phương pháp học máy, nghiên cứu này đã phát triển một số mô hình đánh giá nguy cơ để mô tả đặc điểm nguy cơ phát triển T2DM. Hiệu năng dự đoán cao đã đạt được bởi tất cả các mô hình, với AUC dao động từ 0.811 đến 0.872. So với các mô hình khác, mô hình GBM thực hiện tốt nhất, với giá trị AUC là 0.872 (95% 0.858-0.886) và hiệu năng của các mô hình tốt hơn đáng kể so với thang điểm nguy cơ truyền thống. Ngoài các yếu tố phổ biến cho đái tháo đường, các yếu tố quan trọng mới (các thông số nước tiểu) không được tìm thấy trong các phương pháp đánh giá nguy cơ trước đây, nhưng đã được học máy xác định trong nghiên cứu của chúng tôi. Nghiên cứu của chúng tôi đã chứng minh rằng các công nghệ học máy có vị thế độc đáo để nhận diện các yếu tố nguy cơ quan trọng trong các nghiên cứu dịch tễ học quy mô lớn.

Theo hiểu biết của chúng tôi, đây là nghiên cứu đầu tiên đánh giá tầm quan trọng của các biến và mô tả đặc điểm nguy cơ phát triển T2DM bằng cách sử dụng các phương pháp học máy khác nhau ở một quần thể nông thôn Trung Quốc. Kết quả của chúng tôi nhất quán với các phát hiện trước đây. Thang điểm Nguy cơ Đái tháo đường Trung Quốc Mới (New Chinese Diabetes Risk Score) cho thấy giới tính, tuổi, tiền sử gia đình mắc đái tháo đường, vòng eo, BMI, SBP là các yếu tố nguy cơ quan trọng 42 . Kết quả của chúng tôi cũng cho thấy sự hiện diện nổi bật của chúng trong 10 yếu tố then chốt hàng đầu cho T2DM. Dữ liệu của chúng tôi cũng chỉ ra rằng béo phì là một yếu tố nguy cơ chính cho sự phát triển của T2DM 43 . Các nghiên cứu trước đây đã chứng minh vai trò quan trọng của phương pháp boosting trong các lĩnh vực y học khác, chẳng hạn như nhiễm trùng đường tiết niệu 44 , chẩn đoán ung thư biểu mô tế bào gan 45 , dự đoán gãy xương hông 46 . Kết quả của chúng tôi xác nhận hiệu năng vượt trội của phương pháp boosting trong đánh giá nguy cơ T2DM.

Bảng 4. Hiệu năng của các thuật toán học máy. Viết tắt: LR, hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ.

| Xét nghiệm | Mô hình | AUC               |   Độ chính xác(%) |   Độ nhạy(%) |   Độ đặc hiệu(%) |   PPV(%) |   NPV(%) |   AUPR |
|----------|---------|---------------------|---------------|------------------|------------------|----------|----------|--------|
| Có xét nghiệm | LR      | 0.841 (0.825-0.858) |         75.23 |            78.49 |            74.91 |    23.37 |    97.28 |  0.493 |
|          | CART    | 0.811 (0.793-0.829) |         80.06 |            66.97 |            81.33 |    25.91 |    96.19 |  0.433 |
|          | GBM     | 0.872 (0.858-0.886) |         81.20 |            76.04 |            81.71 |    28.83 |    97.22 |  0.546 |
|          | ANN     | 0.858 (0.842-0.873) |         74.01 |            80.95 |            73.34 |    22.83 |    97.53 |  0.520 |
|          | RF      | 0.868 (0.854-0.883) |         85.90 |            79.57 |            78.14 |    26.19 |    97.52 |  0.538 |
|          | SVM     | 0.835 (0.818-0.851) |         76.42 |            74.65 |            76.59 |    23.71 |    96.88 |  0.490 |
| Không xét nghiệm | LR      | 0.804 (0.787-0.821) |         75.06 |            72.35 |            75.33 |    22.23 |    96.55 |  0.313 |
|          | CART    | 0.767 (0.749-0.784) |         62.79 |            79.26 |            61.18 |    16.60 |    96.80 |  0.235 |
|          | GBM     | 0.817 (0.801-0.833) |         70.28 |            78.96 |            69.43 |    20.11 |    97.13 |  0.345 |
|          | ANN     | 0.808 (0.791-0.825) |         70.52 |            78.03 |            69.79 |    20.11 |    97.02 |  0.328 |
|          | RF      | 0.803 (0.786-0.820) |         70.77 |            75.58 |            70.30 |    19.87 |    96.73 |  0.327 |
|          | SVM     | 0.800 (0.783-0.818) |         76.46 |            70.51 |            77.04 |    23.03 |    96.40 |  0.316 |

Hình 2. Đường cong đặc trưng hoạt động của bộ thu nhận của các mô hình học máy khác nhau. Viết tắt: LR, hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ.

Việc nhận diện các yếu tố then chốt có ý nghĩa lâm sàng to lớn trong đánh giá nguy cơ T2DM. Mức độ nghiêm trọng của T2DM thường được ước lượng thông qua rất nhiều yếu tố ở các khía cạnh khác nhau, bao gồm các đặc điểm nhân khẩu học - xã hội, các phép đo nhân trắc và dữ liệu xét nghiệm. Xét đến sự đa dạng và đồ sộ của các yếu tố trong giai đoạn phát triển của T2DM, rất khó để chọn một số lượng biến cụ thể cho đánh giá nguy cơ. So với các mô hình không có dữ liệu xét nghiệm, việc đưa vào dữ liệu xét nghiệm đã dẫn đến sự gia tăng đáng kể về khả năng nhận diện của các mô hình. Hiện tượng này cho thấy việc thêm dữ liệu xét nghiệm hiệu quả có thể giúp nhận diện nguy cơ của bệnh nhân T2DM. Nghiên cứu của chúng tôi cũng cho thấy tầm quan trọng của các yếu tố khác nhau phụ thuộc vào kỹ thuật mô hình hóa. Đối với các mô hình LR, SVM và ANN, các yếu tố di truyền và các chỉ số nước tiểu, chẳng hạn như tiền sử đái tháo đường của mẹ/cha, glucose niệu, chiếm vị trí trung tâm trong đánh giá nguy cơ T2DM. Hơn nữa, kết quả của chúng tôi cho thấy cần 30-35 biến khi hiệu năng mô hình đạt trạng thái bão hòa, và hiệu năng mô hình sẽ không được cải thiện với quá nhiều biến. Trong thập kỷ qua, khả năng thu thập dữ liệu đã trở nên nhanh hơn và rẻ hơn, nhưng chúng ta cần chú ý nhiều hơn đến mô hình có quá nhiều đặc trưng.

Hình 3. Đường cong precision-recall của các mô hình học máy khác nhau. Viết tắt: LR, hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ.

Hình 4. Sự biến thiên hiệu năng của các mô hình khác nhau trên số lượng biến khác nhau. LR chỉ hồi quy logistic; CART, cây phân loại và hồi quy; GBM, máy tăng cường gradient; ANN, mạng nơ-ron nhân tạo; RF, Rừng ngẫu nhiên; SVM, Máy vector hỗ trợ.

Các kỹ thuật phân tích dữ liệu hoặc khả năng khớp mô hình rất quan trọng trong đánh giá và dự đoán nguy cơ bệnh tật. Khi sử dụng các phương pháp thống kê truyền thống, nhiều thang điểm nguy cơ và mô hình dự đoán đã được phát triển dựa trên hồi quy logistic. Nếu mối quan hệ giữa các dữ liệu có thể phân tách tuyến tính, các phương pháp truyền thống sẽ khớp tốt hơn 47,48 . Nếu không, các mô hình như vậy có thể đơn giản hóa quá mức các mối quan hệ phức tạp giữa các yếu tố với các tương tác phi tuyến, dẫn đến khả năng mất mát thông tin liên quan quan trọng. Điều này gợi ý tầm quan trọng của việc chọn một mô hình phù hợp theo các đặc điểm của tập dữ liệu. Theo các đặc điểm dữ liệu của Nghiên cứu Đoàn hệ Nông thôn Hà Nam, kết quả của chúng tôi cho thấy mô hình boosting khớp dữ liệu tốt nhất.

Hiệu năng của mô hình chẩn đoán dựa trên học máy sẽ tốt hơn nếu số lượng mẫu huấn luyện lớn 49 . So với các nghiên cứu trước đây, điểm mạnh chính của nghiên cứu của chúng tôi là cỡ mẫu tương đối lớn bao gồm 36652 đối tượng từ quần thể nông thôn ở Trung Quốc. Ngoài ra, chúng tôi đã so sánh hiệu năng mô hình từ hai khía cạnh: số lượng biến cố định và số lượng biến động, điều này xác nhận rằng các mô hình với một số biến có thể thực hiện không tệ hơn mô hình với tất cả các biến 50 . Hơn nữa, tính vượt trội và tính khả thi của các thuật toán phi tham số đã được chứng minh so với mô hình dựa trên hồi quy logistic.

Tuy nhiên, một số hạn chế đáng được đề cập. Thứ nhất, các phát hiện nghiên cứu được rút ra từ một nghiên cứu cắt ngang không có dữ liệu theo dõi; do đó, chúng tôi có thể không xác định được các mối liên hệ nhân quả và theo thời gian. Thứ hai, chúng tôi cần thực hiện nghiên cứu trong tương lai với kiểm chứng ngoài (external validation) và các phương pháp học máy khác

www.nature.com/scientificreports www.nature.com/scientificreports để đánh giá hiệu năng mô hình. Ngoài ra, rất khó để giải thích sự phức tạp vốn có của các tương tác giữa các biến và tác động của chúng lên kết cục do bản chất 'hộp đen' (black box) của các phương pháp học máy.

Tóm lại, bằng cách sử dụng một loạt các mô hình học máy, chúng tôi đã phát triển một phương pháp khai phá dữ liệu để mô tả đặc điểm nguy cơ T2DM và so sánh hiệu năng mô hình từ số lượng biến cố định và số lượng biến động. Kết quả của chúng tôi cho thấy khả năng vượt trội của học máy trong việc nhận diện các yếu tố nguy cơ và dự đoán các kết cục trên một phạm vi rộng dữ liệu và số lượng biến ngày càng tăng, điều này mang lại những hiểu biết sâu sắc hơn về các yếu tố nguy cơ bệnh tật mà không cần giả định trước về quan hệ nhân quả.

Tuyên bố chia sẻ dữ liệu. Tất cả các dữ liệu liên quan đều nằm trong bài báo và các tệp Thông tin Hỗ trợ của nó. Liên hệ với Dr. Chongjian Wang (tjwcj2005@126.com) để biết thêm thông tin về việc truy cập dữ liệu.

Received: 11 September 2019; Accepted: 19 February 2020; Published: xx xx xxxx

## Tài liệu tham khảo

1.  Xu, Y. et al . Prevalence and control of diabetes in Chinese adults. JAMA. 310 , 948-59 (2013).
2.  International Diabetes Federation. IDF diabetes atlas. 8th. http://www.diabetesatlas.org/ (2017).
3.  Liu, X. et al . Prevalence, awareness, treatment, control of type 2 diabetes mellitus and risk factors in Chinese rural population: the RuralDiab study. Sci. Rep. 6 , 31426 (2016).
4.  Li, Y. et al . Time trends of dietary and lifestyle factors and their potential impact on diabetes burden in china. Diabetes Care. 40 , 1685-1694 (2017).
5.  Collins, G. S., Mallett, S., Omar, O. &amp; Yu, L. Developing risk prediction models for type 2 diabetes: a systematic review of methodology and reporting. BMC Med. 9 , 1-14 (2011).
6.  Eddy, D. M. &amp; Schlessinger, L. Archimedes: a trial-validated model of diabetes. Diabetes Care. 26 , 3093-3101 (2003).
7.  Lindstrom, J. &amp; Tuomilehto, J. The Diabetes Risk Score: a practical tool to predict type 2 diabetes risk. Diabetes Care. 26 , 725-731 (2003).
8.  Cornelis, M. C. et al . Joint effects of common genetic variants on the risk for type 2 diabetes in U.S. men and women of European ancestry. Ann. Intern. Med. 150 , 541-550 (2009).
9.  Pippiti, K., Li, M. &amp; Gurgle, H. Diabetes mellitus: screening and diagnosis. Am. Fam. Phys. 93 , 103-9 (2016).
10.  Obermeyer, Z. &amp; Emanuel, E. J. Predicting the Future-Big Data, Machine Learning, and Clinical Medicine. N. Engl. J. Med. 375 , 1216-9 (2016).
11.  Harrell, F. Regression Modeling Strategies: With Applications to Linear Models, Logistic and Ordinal Regression, and Survival Analysis, Springer. (2015).
12.  Dag, A., Oztekin, A., Yucel, A., Bulur, S. &amp; Megahed, F. M. Predicting heart transplantation outcomes through data analytics. Decis. Support Syst. 94 , 42-52 (2017).
13.  Lagani, V ., Koumakis, L., Chiarugi, F., Lakasing, E. &amp; Tsamardinos, I. A systematic review of predictive risk models for diabetes complications based on large scale clinical studies. J. Diabetes Complications 27 , 407-413 (2013).
14.  Deo, R. C. Machine learning in medicine. Circulation 132 , 1920-1930 (2015).
15.  Ambale-Venkatesh, B. et al . Cardiovascular event prediction by machine learning: The Multi-Ethnic Study of Atherosclerosis. Circ. Res. 121 , 1092-1101 (2017).
16.  Dinh, A., Miertschin, S., Y oung, A. &amp; Mohanty, S. D. A data-driven approach to predicting diabetes and cardiovascular disease with machine learning. BMC Med. Inform. Decis. Mak. 19 , 211 (2019).
17.  Ramezankhani, A. et al . Applying decision tree for identification of a low risk population for type 2 diabetes. Tehran Lipid and Glucose Study. Diabetes research and clinical practice 105 , 391-398 (2014).
18.  Y u, W ., Liu, T., Valdez, R., Gwinn, M. &amp; Khoury, M. J. Application of support vector machine modeling for prediction of common diseases: the case of diabetes and pre-diabetes. BMC Med. Inform. Decis. Mak. 10 , 16 (2010).
19.  Dalakleidi, K., Zarkogianni, K., Thanopoulou, A. &amp; Nikita, K. Comparative assessment of statistical and machine learning techniques towards estimating the risk of developing type2 diabetes and cardiovascular complications. Expert Systems. 34 , e12214 (2017).
20.  Dagliati, A. et al . Machine learning methods to predict diabetes complications. J. Diabetes Sci. Technol. 12 , 295-302 (2018).
21.  Alghamdi, M. et al . Predicting diabetes mellitus using SMOTE and ensemble machine learning approach: the Henry Ford ExercIse
22. Testing (FIT) project. PLoS ONE. 12 , e0179805 (2017).
22.  Brisimi, T. S. et al . Predicting Chronic Disease Hospitalizations from Electronic Health Records: An Interpretable Classification Approach. Proceedings of the IEEE 106 , 690-707 (2018).
23.  Zou, Q. et al . Predicting Diabetes Mellitus With Machine Learning Techniques. Front. Genet. 9 , 515 (2018).
24.  Amir, T. K. &amp; Wilson, J. M. Identifying People at Risk of Developing Type 2 Diabetes: A Comparison of Predictive Analytics Techniques and Predictor Variables. International Journal of Medical Informatics. 119 , 22-38 (2018).
25.  Zheng, T. et al . A machine learning-based framework to identify type 2 diabetes through electronic health records. International Journal of Medical Informatics. 7 , 120-127 (2017).
26.  Liu, X. et al . The Dynamics of Type 2 Diabetes Mellitus Prevalence and Management Rates among Rural Population in Henan Province, China. Journal of Diabetes Research 2017 , 1-9 (2017).
27.  Li, N. et al . Associations of long-term exposure to ambient PM1 with hypertension and blood pressure in rural Chinese population: The Henan rural cohort study. Environ Int. 128 , 95-102 (2019).
28.  Liu, X. et al . The Henan Rural Cohort: a prospective study of chronic non-communicable diseases. Int J Epidemiol. 48 , 1756-1756j (2019).
29.  American Diabetes Association. Diagnosis and classifcation of diabetes mellitus. Diabetes care. 32 , Suppl 1, S62-S67 (2009).
30.  Chawla, N. V ., Bowyer, K. W ., Hall, L. O. &amp; Kegelmeyer, W . P . SMOTE: synthetic minority over-sampling technique. J. Artif. Intell. Res. 16 , 321-57 (2002).
31.  Chawla, N. V . Data mining for imbalanced datasets: an overview. Data Mining and Knowledge Discovery Handbook , 853-867(2005).
32.  Amato, F. et al . Artificial neural networks in medical diagnosis. Journal of Applied Biomedicine. 11 , 47-58 (2013).
33.  Liao, Z. J., Wan, S., He, Y. &amp; Zou, Q. Classification of small GTPases with hybrid protein features and advanced machine learning techniques. Curr.Bioinform. 13 , 492-500 (2018).
34.  Trendowicz A., Jeffery R. Classification and Regression Trees. In: Software Project Effort Estimation. Springer, Cham . 295-304 (2014).
35.  Esmaily, H. et al . A Comparison between Decision Tree and Random Forest in Determining the Risk Factors Associated with Type 2. Diabetes. J. Res. Health Sci. 18 , e00412 (2018).
36.  Bagley, S. C., White, H. &amp; Golomb, B. A. Logistic regression in the medical literature: standards for use and reporting, with particular attention to one medical domain. J. Clin. Epidemiol. 54 , 979-985 (2001).

37.  Kengne, A. P . et al . Non-invasive risk scores for prediction of type 2 diabetes (EPIC-InterAct): a validation of existing models. The Lancet Diabetes &amp; Endocrinology 2 , 19-29 (2014).
38.  Noble, W . S. What is a support vector machine? Nature Biotechnology 24 , 1565-1567 (2006).
39.  Svetnik, V . et al . Random forest: a classification and regression tool for compound classification and QSAR modeling. J. Chem. Inform. Comput. Sci. 43 , 1947-1958 (2003).
40.  Weng, S. F., Reps, J., Kai, J., Garibaldi, J. M. &amp; Qureshi, N. Can machine-learning improve cardiovascular risk prediction using routine clinical data? PLoS ONE 12 , e0174944 (2017).
41.  Lundberg, S., Lee, S. I. A unified approach to interpreting model predictions. In Advances in Neural Information Processing Systems , 4765-4774 (2017).
42.  Zhou, X. et al . Nonlaboratory-based risk assessment algorithm for undiagnosed type 2 diabetes developed on a nation-wide diabetes survey. Diabetes Care. 36 , 3944-3952 (2013).
43.  Tian, Z. et al . Gender-specific associations of body mass index and waist circumference with type 2 diabetes mellitus in Chinese rural adults: The Henan Rural Cohort Study. J Diabetes Complications. 32 , 824-829 (2018).
44.  Taylor, R. A., Moore, C. L., Cheung, K.-H. &amp; Brandt, C. Predicting urinary tract infections in the emergency department with machine learning. PloS ONE. 13 , e0194085 (2018).
45.  Sato, M. et al . Machine-learning Approach for the Development of a Novel predictive Model for the Diagnosis of Hepatocellular Carcinoma. Sci. Rep. 9 , 7704 (2019).
46.  Kruse, C., Eiken, P. &amp; Vestergaard, P. Machine Learning Principles Can Improve Hip Fracture Prediction. Calcified tissue international 100 , 348-360 (2017).
47.  Wu, X., Zhu, X., Wu, G. Q. &amp; Ding, W . Data mining with big data. IEEE transactions on knowledge and data engineering 26 , 97-107 (2014).
48.  Hengl, S., Kreutz, C., Timmer, J. &amp; Maiwald, T. Data-based identifiability analysis of non-linear dynamical models. Bioinformatics 23 , 2612-2618 (2007).
49.  Zacksenhouse, M., Braun, S., Feldman, M. &amp; Sidahmed, M. Toward helicopter gearbox diagnostics from a small number of examples. Mechanical Systems and Signal Processing. 14 , 523-543 (2000).
50.  Yun, Y. H., Deng, B. C., Cao, D. S., Wang, W. T. &amp; Liang, Y. Z. Variable importance analysis based on rank aggregation with applications in metabolomics for biomarker discovery. Analytica Chimica Acta 911 , 27-34 (2016).

## Lời cảm ơn

Các tác giả cảm ơn tất cả những người tham gia, điều phối viên và quản trị viên vì sự hỗ trợ và giúp đỡ của họ trong quá trình nghiên cứu. Nghiên cứu này được hỗ trợ bởi National Key Research and Development Program Precision Medicine Initiative of China (Grant NO: 2016YFC0900803), National Natural Science Foundation of China (Grant NO: 81573243, 81602925, 21806146), Henan Natural Science Foundation of China (Grant NO: 182300410293), Science and Technology Foundation for Innovation Talent of Henan Province (Grant NO: 164100510021), Science and Technology Innovation Talents Support Plan of Henan Province Colleges and Universities (Grant NO: 14HASTIT035). Các nhà tài trợ không có vai trò trong thiết kế nghiên cứu, thu thập và phân tích dữ liệu, quyết định xuất bản, hoặc chuẩn bị bản thảo.

## Đóng góp của tác giả

Z.F.W. và C.J.W. đã hình thành ý tưởng và thiết kế nghiên cứu. L.Y.Z., M.M.N. và Y.K.W. điều phối việc thu thập dữ liệu. L.Y.Z. và Y.K.W. thực hiện các phân tích. L.Y.Z. viết bản thảo. Tất cả các đồng tác giả đã phản biện bản thảo một cách nghiêm túc.

## Lợi ích cạnh tranh

Các tác giả tuyên bố không có lợi ích cạnh tranh.

## Thông tin bổ sung

Thông tin bổ sung có sẵn cho bài báo này tại https://doi.org/10.1038/s41598-020-61123-x.

Thư từ và yêu cầu tài liệu nên được gửi đến Z.W .

Thông tin về việc tái bản và cấp phép có sẵn tại www.nature.com/reprints.

Ghi chú của nhà xuất bản Springer Nature giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã xuất bản và các đơn vị trực thuộc thể chế.

© The Author(s) 2020
