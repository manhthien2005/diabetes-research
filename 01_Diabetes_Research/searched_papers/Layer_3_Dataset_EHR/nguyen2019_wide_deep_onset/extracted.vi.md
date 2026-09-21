<!-- extracted by pdf-extract | engine=docling | pages=9 | ocr=False | tables=4/4 | density=1.01 | score=100 -->

Nội dung có sẵn tại ScienceDirect

## Computer Methods and Programs in Biomedicine

trang chủ tạp chí:

www.elsevier.com/locate/cmpb

## Dự đoán sự khởi phát đái tháo đường type 2 bằng học rộng và sâu (wide and deep learning) với hồ sơ sức khỏe điện tử

Binh P. Nguyen a , 1 , ∗ , Hung N. Pham b , 1 , Hop Tran a , 1 , Nhung Nghiem c , Quang H. Nguyen b , Trang T.T. Do d , Cao Truong Tran e , Colin R. Simpson f , g

a School of Mathematics and Statistics, Victoria University of Wellington, Kelburn Parade, Wellington 6140, New Zealand

b School of Information and Communication Technology, Hanoi University of Science and Technology, 1 Dai Co Viet Road, Hanoi 10 0 0 0 0, Vietnam

c Department of Public Health, University of Otago, 23A Mein Street, Wellington 6021, New Zealand

d Institute for Infocomm Research, Agency for Science, Technology and Research, 1 Fusionopolis Way, Singapore 138632, Singapore

e Faculty of Information Technology, Le Quy Don Technical University, 236 Hoang Quoc Viet Street, Hanoi 10 0 0 0 0, Vietnam

f Faculty of Health, Victoria University of Wellington, Kelburn Parade, Wellington 6140, New Zealand

g Usher Institute, The University of Edinburgh, Edinburgh, EH89AG, United Kingdom

## t h ô n g t i n b à i b á o

Lịch sử bài báo: Nhận ngày 7 tháng 3 năm 2019 Sửa đổi ngày 17 tháng 8 năm 2019 Chấp nhận ngày 27 tháng 8 năm 2019

Từ khóa: Hồ sơ sức khỏe điện tử Tỷ lệ mắc mới Khởi phát Dự đoán Đái tháo đường type 2

Học rộng và sâu (Wide and deep learning)

## 1. Giới thiệu

Đái tháo đường là nguyên nhân gây ra đáng kể tình trạng bệnh tật, sử dụng dịch vụ chăm sóc sức khỏe và tử vong ở cả các quốc gia phát triển và đang phát triển -

∗ Tác giả liên hệ.

Địa chỉ E-mail: b.nguyen@vuw.ac.nz (B.P. Nguyen).

1 Các tác giả này đóng góp ngang nhau.

## t ó m t ắ t

Mục tiêu: Đái tháo đường là nguyên nhân gây ra đáng kể tình trạng bệnh tật, sử dụng dịch vụ chăm sóc sức khỏe và tử vong ở cả các quốc gia phát triển và đang phát triển. Hiện nay, các phương pháp điều trị đái tháo đường còn chưa đầy đủ và tốn kém nên việc phòng ngừa trở thành một bước quan trọng trong việc giảm gánh nặng của đái tháo đường và các biến chứng của nó. Hồ sơ sức khỏe điện tử (electronic health records - EHRs) cho mỗi cá nhân hoặc một quần thể đã trở thành công cụ quan trọng trong việc hiểu các xu hướng phát triển của bệnh tật. Việc sử dụng EHRs để dự đoán sự khởi phát đái tháo đường có thể cải thiện chất lượng và hiệu quả của chăm sóc y tế. Trong bài báo này, chúng tôi áp dụng một mô hình học rộng và sâu (wide and deep learning) kết hợp sức mạnh của một mô hình tuyến tính tổng quát (generalised linear model) với nhiều đặc trưng khác nhau và một mạng nơ-ron truyền thẳng sâu (deep feed-forward neural network) để cải thiện việc dự đoán sự khởi phát đái tháo đường type 2 (type 2 diabetes mellitus - T2DM).

Vật liệu và phương pháp: Phương pháp đề xuất được triển khai bằng cách huấn luyện nhiều mô hình khác nhau vào một hàm mất mát logistic (logistic loss function) sử dụng phương pháp giảm gradient ngẫu nhiên (stochastic gradient descent). Chúng tôi áp dụng mô hình này bằng cách sử dụng dữ liệu hồ sơ bệnh viện công được cung cấp bởi EHRs của Practice Fusion cho quần thể dân số Hoa Kỳ. Bộ dữ liệu bao gồm các hồ sơ sức khỏe điện tử đã được khử định danh của 9948 bệnh nhân, trong đó 1904 người đã được chẩn đoán mắc T2DM. Dự đoán đái tháo đường trong năm 2012 được dựa trên dữ liệu thu được từ các năm trước (2009-2011). Lớp mất cân bằng của mô hình được xử lý bằng Kỹ thuật quá lấy mẫu thiểu số tổng hợp (Synthetic Minority Oversampling Technique - SMOTE) cho mỗi fold huấn luyện kiểm định chéo (cross-validation) để phân tích hiệu năng khi các mẫu tổng hợp cho lớp thiểu số được tạo ra. Chúng tôi sử dụng SMOTE ở mức 150 và 30 0 phần trăm, trong đó 30 0 phần trăm có nghĩa là ba thể hiện (instance) tổng hợp mới được tạo cho mỗi thể hiện lớp thiểu số. Điều này dẫn đến các phân bố xấp xỉ đái tháo đường:không đái tháo đường trong tập huấn luyện lần lượt là 1:2 và 1:1.

Kết quả: Mô hình tổ hợp (ensemble) cuối cùng của chúng tôi không sử dụng SMOTE đạt độ chính xác (accuracy) 84.28%, diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (area under the receiver operating characteristic curve - AUC) là 84.13%, độ nhạy (sensitivity) 31.17% và độ đặc hiệu (specificity) 96.85%. Việc sử dụng SMOTE ở mức 150 và 300 phần trăm không cải thiện AUC (lần lượt là 83.33% và 82.12%) nhưng làm tăng độ nhạy (lần lượt là 49.40% và 71.57%) với sự giảm vừa phải độ đặc hiệu (lần lượt là 90.16% và 76.59%).

Bàn luận và kết luận: Thuật toán của chúng tôi đã tối ưu hóa hơn nữa việc dự đoán sự khởi phát đái tháo đường bằng cách sử dụng một thuật toán học máy hiện đại mới: kiến trúc mạng nơ-ron học rộng và sâu (wide and deep learning neural network architecture).

© 2019 Elsevier B.V. Bảo lưu mọi quyền.

quốc gia. Trên toàn cầu, vào năm 2017 ước tính có 425 triệu người mắc đái tháo đường - con số này được dự đoán sẽ tăng lên 629 triệu vào cuối năm 2045 [1] . Đái tháo đường type 2 (T2DM) là loại đái tháo đường phổ biến nhất (95%) ở Hoa Kỳ (United States - US) [2] . Tại Hoa Kỳ, hơn 30 triệu người mắc đái tháo đường vào năm 2017 [1] . Chi phí điều trị bệnh viện cao và tỷ lệ tái nhập viện cao liên quan đến đái tháo đường có nghĩa là việc phòng ngừa sớm và điều trị hiệu quả là rất quan trọng [3] . Do đó, việc dự đoán sớm sự khởi phát đái tháo đường bằng dữ liệu thường có sẵn như hồ sơ sức khỏe điện tử (electronic health records - EHRs) là quan trọng [4] .

EHRs là các hệ thống điện tử tương đối hoàn chỉnh có tiềm năng lưu trữ thông tin từ hàng triệu bệnh nhân trên nhiều cơ sở chăm sóc sức khỏe, bao gồm nhân khẩu học bệnh nhân, dữ liệu y tế (ví dụ: chẩn đoán, xét nghiệm và thuốc), ghi chú lâm sàng và v.v. [5,6] . Trong quá khứ, EHRs được sử dụng bởi bác sĩ, nhân viên y tế và nhân viên y tế công cộng để lưu trữ và trích xuất thông tin của bệnh nhân cho chăm sóc lâm sàng [7] . Việc sử dụng thứ cấp dữ liệu EHR để phát triển công cụ nhằm hỗ trợ các nhân viên y tế và những người làm chính sách khởi xướng hoặc điều chỉnh các can thiệp, hiểu được tiến triển của bệnh và đưa ra hoặc cải thiện các chính sách để giúp phòng ngừa bệnh [8] . Thông tin bệnh nhân trong EHRs rất đa dạng về số chiều, dữ liệu mất cân bằng lớp (i.e., một mẫu không đồng nhất gồm bệnh nhân đái tháo đường và không đái tháo đường) [4] và dữ liệu khuyết thiếu [6] , khiến cho khó khăn trong việc phát triển các mô hình phân tích hiệu quả bằng các phương pháp phân tích thống kê cổ điển [9] . Sự sẵn có của các hồ sơ sức khỏe điện tử (EHRs) cùng với những tiến bộ về phần cứng (Bộ xử lý trung tâm (Central Processing Units - CPUs) và Bộ xử lý đồ họa (Graphical Processing Units - GPUs)) và các thuật toán máy tính (học máy và đặc biệt là lĩnh vực con của nó là học sâu) làm cho việc dự đoán sự khởi phát bệnh với độ chính xác cao trở nên khả thi. Đối với đái tháo đường, hầu hết các nghiên cứu sử dụng EHRs đã sử dụng và so sánh hiệu năng của các thuật toán học máy phổ biến ( k -Nearest Neighbors, Naive Bayes, Decision Tree, Random Forest, Support Vector Machine, và Logistic Regression) trong dự đoán sự tiến triển của đái tháo đường [10-17] .

Các thuật toán học sâu đã được sử dụng trong những năm gần đây để dự đoán sự khởi phát bệnh dựa trên việc sử dụng thứ cấp EHRs. Đối với nghiên cứu chăm sóc sức khỏe, các mô hình học sâu có thể vượt trội hơn các phương pháp học máy cổ điển vốn đòi hỏi nhiều kỹ thuật đặc trưng (feature engineering) thủ công hơn [6] . Hơn nữa, các dữ liệu đặc trưng có tính sự kiện theo chiều dọc (longitudinal) và giám sát liên tục từ EHRs cho phép huấn luyện các mô hình học sâu phức tạp và đầy thách thức [6] . So với các mô hình thống kê để dự đoán sự khởi phát đái tháo đường bằng các yếu tố nguy cơ (hồi quy logistic [18] ) và tử vong bệnh nhân bằng các tỷ số nguy hại (phân tích sống còn [19] ), và học máy cổ điển (cây quyết định, random forest và support vector machine [20] ), học sâu có khả năng tự động học các đặc trưng được biểu diễn từ dữ liệu đầu vào và sau đó giảm thiểu kỹ thuật đặc trưng [21] . Để đạt được hiệu năng hiện đại với ít tài nguyên tính toán hơn, một khung học rộng và sâu (wide and deep learning framework) đã được Google phát triển để đạt được cả khả năng ghi nhớ (memorisation) và khái quát hóa (generalisation) [22] . Ghi nhớ là việc học một tập hợp rộng các biến đổi đặc trưng tích chéo (crossed-product feature transformations) biểu diễn mối tương quan giữa sự đồng xuất hiện của một cặp đặc trưng và nhãn mục tiêu. Khái quát hóa đạt được bằng cách khớp các đặc trưng khác nhau ở gần nhau trong một không gian nhúng (embedding space) được tạo ra bởi một mạng nơ-ron truyền thẳng sâu. Trong khung này, phần rộng (wide part) đại diện cho một mô hình tuyến tính tổng quát và thành phần sâu (deep element) đại diện cho một mạng nơ-ron truyền thẳng. Bằng cách kết hợp các ưu điểm của cả hai thành phần, khung này có khả năng sử dụng một cấu trúc dữ liệu rất đa dạng và phức tạp. Theo hiểu biết tốt nhất của chúng tôi, có rất ít công trình trước đây đã sử dụng các cách tiếp cận học sâu để phát triển điểm số nguy cơ (risk scores) bằng dữ liệu chăm sóc sức khỏe lớn [23-27] .

Miottothe và cộng sự [8] đã phát triển một thuật toán học sâu không giám sát mới (Deep Patient) để dự đoán tương lai của bệnh nhân bằng cách sử dụng 70 0,0 0 0 hồ sơ từ EHRs của Mount Sinai. Họ đã sử dụng thông tin nhân khẩu học (tuổi, giới tính và chủng tộc), ghi chú lâm sàng dưới dạng mã ICD-9, đơn thuốc y tế, thủ thuật và xét nghiệm. Họ thiết kế một mạng nơ-ron biểu diễn sâu nhiều lớp được tối ưu hóa bằng phương pháp giảm gradient ngẫu nhiên theo một tiêu chí không giám sát cục bộ. Mô hình của họ được kiểm tra bằng 76,214 bệnh nhân bao gồm 78 bệnh. Việc dự đoán T2DM có biến chứng trong vòng một năm bằng điểm số AUC là 90.7%. Thuật toán được phát hiện cải thiện việc dự đoán nhiều bệnh khác nhau trong EHRs và các tác vụ khác như kiểm tra thử nghiệm lâm sàng và gợi ý điều trị.

Trong công trình gần đây, Pham và cộng sự [27] đã giới thiệu một khung mạng nơ-ron động sâu (deep dynamic neural network framework) (DeepCare) thực hiện nhiều tác vụ khác nhau bao gồm đánh giá quỹ đạo bệnh nhân và dự đoán các kết cục bệnh trong tương lai. Bộ dữ liệu chứa hơn 12,0 0 0 bệnh nhân từ năm 2002 đến năm 2013 với 7191 bệnh nhân được chọn. Bộ dữ liệu được chia thành ba phần: 67% để ước lượng tham số, 16.5% để tinh chỉnh, và 16.5% để kiểm tra. Hiệu năng của DeepCare khi sử dụng max-pooling trên bộ dữ liệu đái tháo đường là điểm F-score gần 60%.

Một trong những ứng dụng quan trọng nhất của việc sử dụng EHRs thứ cấp là phát triển các công cụ hoặc phần mềm dựa trên web để dự đoán các kết cục trong tương lai. Một trong những ví dụ về các công cụ và phần mềm trực tuyến này là QDiabetes TM -2018 [28] , một thuật toán được phát triển bằng các mô hình nguy hại tỷ lệ Cox (Cox proportional hazards models) bởi ClinRisk Ltd sử dụng thông tin từ cơ sở dữ liệu QResearch ở Anh ( https://www. qresearch.org ). QDiabetes là một thuật toán dự đoán nguy cơ tính toán nguy cơ T2DM của một cá nhân trong 10 năm tiếp theo đối với những người tuổi từ 25 đến 84, có tính đến các yếu tố nguy cơ cá nhân của họ (tuổi, giới tính, dân tộc, các giá trị lâm sàng và chẩn đoán) [29] . Công cụ này được sử dụng để dự đoán nguy cơ phát triển T2DM và được tích hợp vào các hệ thống máy tính của bác sĩ với chỉ số thống kê đường cong vận hành bộ thu trung bình là 0.85 đối với phụ nữ và 0.83 đối với nam giới.

Tóm lại, so với các mô hình học máy cổ điển, học sâu có thể trích xuất thông tin hữu ích từ EHRs bằng cách học các đặc trưng liên quan đến các kết cục đái tháo đường và do đó giúp nhắm mục tiêu vào những người có khả năng phát triển bệnh để họ có thể thay đổi lối sống. Thông tin này quan trọng cho việc phát triển các công cụ và phần mềm cho việc sử dụng thứ cấp EHRs. Trong nghiên cứu này, chúng tôi áp dụng một cách tiếp cận học rộng và sâu để dự đoán sự khởi phát đái tháo đường type 2 bằng cách sử dụng bộ dữ liệu EHR của Practice Fusion và so sánh hiệu năng của cách tiếp cận này với một cách tiếp cận học máy được sử dụng bởi Pimentel và cộng sự [17] . Cách tiếp cận học rộng và sâu ngày càng được sử dụng nhiều cho dự đoán và phân loại nguy cơ lâm sàng. Người ta dự đoán rằng việc mô hình hóa dự đoán bằng dữ liệu từ EHRs sẽ thúc đẩy y học cá thể hóa dẫn đến cải thiện chất lượng chăm sóc sức khỏe. Thông tin này quan trọng cho việc phát triển các công cụ tiềm năng để hỗ trợ các nhân viên y tế (bác sĩ/người làm lâm sàng) trong việc tiên lượng bệnh đái tháo đường và những người làm chính sách trong việc tạo ra các can thiệp phù hợp để giảm gánh nặng của đái tháo đường.

## 2. Vật liệu và phương pháp

## 2.1. Nguồn dữ liệu

Chúng tôi đã sử dụng một bộ dữ liệu EHR công khai từ Hoa Kỳ được Practice Fusion phát hành năm 2012 cho một cuộc thi khoa học dữ liệu và so sánh hiệu năng mô hình của chúng tôi với một nghiên cứu khác của Pimentel và cộng sự [17] , những người đã áp dụng một random forest với các đặc trưng thời gian (temporal features) và lựa chọn đặc trưng (feature selection) để dự đoán khởi phát T2DM bằng cách sử dụng bộ dữ liệu này. Bộ dữ liệu bao gồm các hồ sơ sức khỏe điện tử đã được khử định danh của 9948 bệnh nhân, với 1904 người được chẩn đoán mắc T2DM trong khoảng thời gian bốn năm (2009-2012). Bộ dữ liệu cũng bao gồm các bản ghi chép của bác sĩ với chẩn đoán, xét nghiệm và thuốc. Để ngăn ngừa sai lệch (biases) trong việc dự đoán đái tháo đường, thông tin trực tiếp liên quan đến đái tháo đường trong bộ dữ liệu đã được Practice Fusion loại bỏ để làm cho bài toán phân loại trở nên khó khăn hơn cho cuộc thi với một số sửa đổi bổ sung. Sửa đổi đầu tiên là loại trừ các bệnh nhân có chẩn đoán biến chứng đái tháo đường mà không có chẩn đoán cơ bản về T2DM. Sửa đổi thứ hai là loại bỏ các mã ICD-9 (250, 250.0, 250. ∗ 0, 250. ∗ 2, 357.2, và 362.0 ∗ ). Sửa đổi thứ ba là loại bỏ các thuốc đái tháo đường khỏi hồ sơ thuốc. Sửa đổi cuối cùng là loại bỏ các xét nghiệm xác định các xét nghiệm liên quan đến glucose hoặc insulin.

Hình 1. Tính toán độ tương đồng của mỗi cột đặc trưng x i và cột nhãn (mục tiêu) y bằng cách đo khoảng cách cosine. Nếu cột đặc trưng x i liên quan nhiều hơn đến cột y ( cos i tiến tới 1) thì đó là một cột đặc trưng tốt để được lựa chọn.

## 2.2. Trích xuất và lựa chọn đặc trưng

Bộ dữ liệu được xử lý bằng cách trích xuất và lựa chọn đặc trưng. Quá trình này có thể được sử dụng để giảm số chiều của bộ dữ liệu bằng cách lựa chọn các đặc trưng chính và quan trọng. Chúng tôi nhóm 1312 đặc trưng thành (1) các đặc trưng cơ bản và cố định (tuổi, giới tính, chỉ số khối cơ thể (body mass index - BMI) và huyết áp), (2) các đặc trưng có thể điều chỉnh (các đặc trưng chẩn đoán dựa trên mã ICD-9, thuốc và xét nghiệm) với các nhãn được mã hóa thành các vector nhị phân tương ứng với ba phép nhúng (embeddings) và (3) các đặc trưng chéo (crossed features) bằng cách lựa chọn các đặc trưng chẩn đoán hàng đầu để giao chéo với các đặc trưng thuốc hàng đầu. Các phép nhúng là một ánh xạ của một biến phân loại tới một vector các số liên tục, hữu ích cho việc giảm số chiều của các biến phân loại và biểu diễn các phạm trù một cách có ý nghĩa trong không gian đã được biến đổi. Ba loại đặc trưng (chẩn đoán, thuốc và xét nghiệm) được mã hóa nhãn thành các vector nhị phân. Mỗi loại đặc trưng sau đó được ánh xạ vào các phép nhúng tương ứng bằng cách sử dụng một lớp tuyến tính của mạng nơ-ron từ phần sâu (deep part) của mô hình học.

Các bước thực hiện để trích xuất và lựa chọn đặc trưng được mô tả dưới đây:

(1) Các giá trị ngoại lai (outliers) của các biến BMI, chiều cao và cân nặng được làm sạch cho mỗi bệnh nhân.

(2) Các đặc trưng liên quan đến BMI được tạo ra từ dữ liệu BMI cho mỗi bệnh nhân bao gồm giá trị trung vị, giá trị tối thiểu, giá trị tối đa của BMI, isOverweight, isObese và sự chênh lệch giữa giá trị BMI tối thiểu và BMI tối đa. Các đặc trưng isOverweight và isObese được xác định dựa trên một số ngưỡng cắt (cut-offs) (các khoảng) của giá trị trung vị BMI của mỗi bệnh nhân. Dữ liệu BMI đã được tính toán từ chiều cao và cân nặng của mỗi bệnh nhân. Mỗi bệnh nhân có thể có nhiều hơn một bản ghi dữ liệu BMI. Dữ liệu này được sử dụng để tạo ra 6 đặc trưng liên quan đến BMI.

(3) Huyết áp tâm thu và tâm trương được tính toán để tạo ra các đặc trưng huyết áp (giá trị trung vị, tối thiểu và tối đa), sự chênh lệch giữa giá trị tối thiểu và tối đa của huyết áp, liệu một bệnh nhân có bị huyết áp cao (high blood pressure - HBP) ở giai đoạn thứ nhất, thứ hai hay không. Các đặc trưng HBP này (1/0 ∼ có/không) được xác định dựa trên một khoảng các giá trị ngưỡng của huyết áp cho mỗi bệnh nhân được xếp hạng trong nghiên cứu y khoa.

Bảng 1 Các bệnh đặc biệt và mã ICD-9 của chúng.

| Các bệnh đặc biệt                                                                                                                                                                                      | Mã ICD-9                                                                                                                                                                                               |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| heartDisease CHF Stroke sleepApnea gestDiab polyOvary frozenShoulder Hemochr Hepatitis kidneyFailure Dementia Acanthosis Blindness preDiabetes sDysfunction EssentialHypertension MixedHyperlipidemia | 410-414, 420-425, 427, 429, 745, 746 426 430, 431, 433-436, 997.02 727.23, 780.57 648.8 256.4 726.0 275.03 070.2, 070.3 584, 585 331, 290, 294, 797 701.2 369 790.29 302.7 401, 401.0, 401.1, 401.9 272.2 |

(4) Dữ liệu chẩn đoán được phân tích để trích xuất các mã ICD-9, loại trừ dữ liệu năm 2012, có tổng cộng 3903 mã khác nhau cho tất cả các bệnh nhân. Các đặc trưng chẩn đoán này được mã hóa với các nhãn dưới dạng một vector nhị phân thưa (mỗi mã ICD-9 được gắn nhãn với giá trị 1, nếu không là 0) cho mỗi bệnh nhân.

Để giảm số chiều của các vector đặc trưng chẩn đoán cho tất cả các bệnh nhân, mỗi vector cột tương ứng với một đặc trưng mã ICD-9 cột được gán một điểm số đặc trưng quan trọng (important feature score) bằng cách đo khoảng cách cosine giữa vector đặc trưng cột và vector cột nhãn (mục tiêu) (được gắn nhãn 1/0 tương ứng với có/không đái tháo đường). Hình 1 minh họa phương pháp được sử dụng để đánh giá điểm số đặc trưng quan trọng của cột x i bằng một đại lượng đo tính toán cosine của góc giữa cột đặc trưng x i và cột nhãn y . Tất cả các cột đặc trưng liên quan đến các đặc trưng chẩn đoán được đánh giá bằng điểm số đặc trưng quan trọng. Một biểu đồ tần suất (histogram) của các điểm số đặc trưng quan trọng được sử dụng để chọn một giá trị ngưỡng. Các cột đặc trưng có điểm số đặc trưng quan trọng lớn hơn ngưỡng này được chọn làm các đặc trưng quan trọng để tạo ra một tập đặc trưng mới. Các đặc trưng ít quan trọng hơn chứa các mã ICD-9 được loại bỏ để giảm số chiều của vector đặc trưng chẩn đoán.

(5) Dữ liệu thuốc được phân tích để trích xuất tên thuốc bằng cách sử dụng dữ liệu từ năm 2009 đến năm 2011. Có 2553 loại thuốc được trích xuất, và tương tự như các đặc trưng chẩn đoán, các nhãn của thuốc được mã hóa dưới dạng một vector nhị phân thưa cho mỗi bệnh nhân. Một phương pháp tương tự như đối với vector đặc trưng chẩn đoán được áp dụng để giảm số chiều của vector đặc trưng thuốc.

(6) Dữ liệu xét nghiệm được phân tích để trích xuất thông tin về các xét nghiệm đã hoàn thành cho mỗi bệnh nhân được minh họa bằng một thông điệp HL7. Mỗi thông điệp HL7 chứa một hoặc nhiều đoạn (segments) trong đó mỗi đoạn bao gồm một hoặc nhiều thành phần ghép (composites) (các trường). Tổng cộng có 334 xét nghiệm được báo cáo cho tất cả các bệnh nhân. Vector đặc trưng xét nghiệm được lựa chọn theo cách tương tự như các đặc trưng chẩn đoán ( Hình 1 và bước 4) và các đặc trưng thuốc (bước 5).

(7) Các đặc trưng đặc biệt được tạo ra bằng cách phân tích các mã ICD-9 tương ứng với một số nhóm bệnh đặc biệt như bệnh tim, bệnh cơ tim, suy thận, mù lòa và v.v. Có tổng cộng 17 đặc trưng đặc biệt như vậy bao gồm các yếu tố nguy cơ đối với T2DM ( Bảng 1 ).

(8) Các mô tả chẩn đoán được nhóm theo các mã ICD-9 để tạo ra các thuộc tính mới. Có 19 nhóm mã ICD-9 được sử dụng ( Bảng 2 ).

(9) Các đặc trưng tích chéo (crossed-product features) được tạo ra từ các đặc trưng mô tả chẩn đoán và các đặc trưng tên thuốc ( Hình 2 ). Các đặc trưng mô tả chẩn đoán kết hợp với các đặc trưng tên thuốc tạo ra các đặc trưng tích chéo có tiềm năng khái quát hóa dữ liệu tốt hơn. Chỉ có các đặc trưng mô tả chẩn đoán hàng đầu và các đặc trưng tên thuốc hàng đầu được sử dụng để thực hiện việc giao chéo đặc trưng (feature crossing). Trong thiết lập của chúng tôi, 27 đặc trưng mô tả chẩn đoán từ hơn 500 quan sát được sử dụng để giao chéo với 33 đặc trưng tên thuốc trên 200 quan sát. Các giá trị giao chéo được mã hóa thành các vector nhị phân, trở thành các đặc trưng giao chéo chẩn đoán-thuốc.

Bảng 2 Các nhóm mô tả chẩn đoán và mã ICD-9 của chúng.

| Nhóm chẩn đoán                                                                                                                                                                                              | Mã ICD-9                                                                                                                                                                                                        |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| neoplasms endoctrine blood mental health nervous sense circulatory respiratory digestive genitourinary pregnancy skin musculoskeletal congenital perinatal symptoms or ill-defined injuries suppl infectious | 140-149, 200-239 240-279 280-289 290-299, 300-319 320-359 360-389 390-399, 400-459 460-499, 500-519 520-579 580-599, 600-629 630-679 680-699, 700-709 710-739 740-759 760-779 780-799 800-899, 900-999 E, V others |

(10) Các đặc trưng cơ bản (tuổi và giới tính) được trích xuất cho mỗi bệnh nhân.

Các thuộc tính nêu trên được kết hợp để tạo ra 1312 đặc trưng cho mỗi bệnh nhân (số lượng đặc trưng có thể điều chỉnh với các tham số được chọn trong thiết lập hiện tại). Trong tổng số 9948 bệnh nhân (43% nam và 57% nữ) tuổi từ 21 đến 93 tuổi, 1890 bệnh nhân (19%) có chẩn đoán đái tháo đường.

## 2.3. Kiến trúc mô hình rộng và sâu

Trong nghiên cứu này, chúng tôi đã phát triển một thuật toán để dự đoán sự khởi phát đái tháo đường dựa trên khung học rộng và sâu [22] . Khung này được sử dụng vì nó có khả năng kết hợp các lợi ích của ghi nhớ và khái quát hóa với ít kỹ thuật đặc trưng hơn, hữu ích cho việc phân tích dữ liệu EHR.

Bộ dữ liệu được chia thành một tập phát triển (development set) (70%) và một tập kiểm tra (testing set) (30%), trong đó tập phát triển (áp dụng một cách tiếp cận tương tự như Pimentel và cộng sự [17] ) được chia thành 10 fold (9 fold để huấn luyện và 1 fold để xác thực) để chúng tôi có thể so sánh kết quả của mình với Pimentel và cộng sự [17] . Quy trình làm việc để dự đoán sự khởi phát T2DM bằng mô hình rộng và sâu được minh họa trong Hình 3 .

1312 đặc trưng bệnh nhân được xử lý bởi một kiến trúc rộng và sâu ( Hình 4 ) bao gồm một thành phần rộng (wide component) và một thành phần sâu (deep component).

Thành phần rộng là một mô hình tuyến tính tổng quát được sử dụng cho các bài toán hồi quy và phân loại quy mô lớn [22] . Thành phần này chịu trách nhiệm ghi nhớ các tương tác đặc trưng.

Thành phần sâu là một mạng nơ-ron sâu có thể khái quát hóa tốt hơn cho các đặc trưng mới bằng cách sử dụng phép nhúng dày đặc chiều thấp (low-dimensional dense embedding). Trong khung của chúng tôi, thành phần này được cấu thành từ hai loại lớp: lớp nhúng (embedding) và lớp ẩn (hidden). Các lớp nhúng bao gồm ba phép nhúng tương ứng với ba nhóm đặc trưng: (1) chẩn đoán với 151 đặc trưng đầu vào, (2) thuốc với

Hình 2. Tạo các đặc trưng giao chéo mới từ mô tả chẩn đoán và tên thuốc bằng cách sử dụng tích chéo (crossed product). Các giá trị giao chéo được mã hóa nhãn thành vector nhị phân của các đặc trưng giao chéo.

Hình 4. Cấu trúc mô hình rộng và sâu để dự đoán sự khởi phát đái tháo đường.

Hình 5. Mất mát huấn luyện và mất mát xác thực khi huấn luyện Mô hình 1 trong Bảng 3 với 5 mức tốc độ học (learning rate) (xem văn bản để biết chi tiết).

134 đặc trưng đầu vào, và (3) xét nghiệm với 80 đặc trưng đầu vào. Chúng tôi áp dụng một lớp tuyến tính cho mỗi phép nhúng để học từ một vector nhị phân thưa thành một vector dày đặc 16 chiều. Chúng tôi áp dụng các lớp ẩn với hai lớp ẩn gồm 256 và 128 nơ-ron.

Tất cả các đặc trưng được đưa vào phần rộng vốn bao gồm các đặc trưng giao chéo được kết hợp với đầu ra của phần sâu ở lớp cuối cùng để tạo thành một vector 1439 chiều. Lớp đầu ra cuối cùng của khung là một lớp tuyến tính 128-tới-1 với hàm kích hoạt sigmoid. Hàm kích hoạt ở các lớp khác là đơn vị tuyến tính chỉnh lưu (rectified linear unit - ReLU) [30] .

## 2.4. Các thiết lập thực nghiệm

Dương tính thật (true positive - TP), âm tính thật (true negative - TN), dương tính giả (false positive - FP) và âm tính giả (false negative - FN) được sử dụng để đo lường hiệu năng của các bộ phân loại bằng các chỉ số đánh giá sau:

Độ nhạy (sensitivity) được định nghĩa là tỷ lệ các đối tượng có đái tháo đường được phân loại đúng là có đái tháo đường. Độ đặc hiệu (specificity) được định nghĩa là tỷ lệ những người không có đái tháo đường được phân loại đúng. Độ chính xác (accuracy) được định nghĩa là tỷ lệ tất cả các đối tượng được phân loại đúng.

Sử dụng kiểm định chéo 10-fold (10-fold cross-validation - CV), 10 mô hình dự đoán tương ứng với 10 tập dữ liệu huấn luyện và xác thực khác nhau được xây dựng. Bộ tối ưu giảm gradient ngẫu nhiên (stochastic gradient descent - SGD) và hàm mất mát entropy chéo nhị phân (binary cross entropy loss function) [30] được sử dụng trong việc huấn luyện mô hình của chúng tôi. Mỗi mô hình được huấn luyện với năm mức tốc độ học (1e3, 5e-4, 1e-4, 5e-5 và 1e-5) tương ứng với năm giá trị kiên nhẫn (patience) (40, 40, 30, 20 và 20 epoch). Một patience là số epoch chờ đợi nếu mất mát xác thực không giảm trước khi chuyển sang tốc độ học tiếp theo hoặc dừng lại nếu tốc độ học cuối cùng đã được sử dụng. Khi chuyển sang tốc độ học tiếp theo, ảnh chụp nhanh (snapshot) tương ứng với mất mát xác thực nhỏ nhất hiện tại được nạp vào. Sau khi dừng lại, ảnh chụp nhanh tương ứng với mất mát xác thực tốt nhất được sử dụng làm mô hình cuối cùng.

Bảng 3 Kết quả dưới dạng phần trăm thu được từ tập kiểm tra bằng 10 mô hình từ một kiểm định chéo phân tầng 10-fold và mô hình tổ hợp cuối cùng.

| Mô hình    |   AUC |   Độ nhạy |   Độ đặc hiệu |   Độ chính xác |
|----------|-------|---------------|---------------|------------|
| 1        | 83.31 |         29.59 |         96.27 |      83.51 |
| 2        | 82.90 |         25.56 |         97.22 |      83.52 |
| 3        | 83.34 |         25.56 |         97.05 |      83.38 |
| 4        | 83.59 |         31.52 |         95.81 |      83.51 |
| 5        | 82.96 |         30.64 |         95.36 |      82.98 |
| 6        | 82.72 |         26.44 |         96.27 |      82.91 |
| 7        | 82.43 |         28.37 |         96.39 |      83.38 |
| 8        | 83.40 |         32.74 |         96.06 |      83.95 |
| 9        | 82.79 |         37.30 |         94.53 |      83.58 |
| 10       | 83.95 |         34.32 |         95.89 |      84.12 |
| Ensemble | 84.13 |         31.17 |         96.85 |      84.28 |

Hình 5 cho thấy mất mát huấn luyện (màu xanh dương) và mất mát xác thực (màu cam) khi huấn luyện một mô hình (Mô hình 1 trong Bảng 3 ). Các đường dọc nét đứt biểu thị các epoch tại đó một tốc độ học mới được sử dụng vì giá trị patience tương ứng đã đạt được. Đường dọc màu đỏ tươi (magenta) biểu thị epoch tại đó mất mát xác thực là tối thiểu, và ảnh chụp nhanh tại epoch đó được sử dụng làm mô hình đã huấn luyện.

Các mẫu từ tập kiểm tra sau đó được dự đoán bởi 10 mô hình tối ưu sau khi huấn luyện. Hiệu năng của mỗi mô hình được đánh giá trên tập kiểm tra bằng các chỉ số sau: độ chính xác, AUC, độ nhạy và độ đặc hiệu. Một mô hình tổ hợp được tạo ra bằng cách tính trung bình của các xác suất đầu ra từ 10 mô hình tốt nhất nêu trên và so sánh với một ngưỡng (0.5) để xác định đái tháo đường. Mô hình tổ hợp này được sử dụng làm mô hình dự đoán cuối cùng về sự khởi phát T2DM.

Vì bộ dữ liệu mất cân bằng (chỉ có 19% đối tượng có đái tháo đường), Kỹ thuật quá lấy mẫu thiểu số tổng hợp (Synthetic Minority Over-sampling Technique - SMOTE) [31] được sử dụng trong mỗi fold huấn luyện CV để phân tích hiệu năng khi các mẫu tổng hợp cho lớp thiểu số được tạo ra. Tương tự như Pimentel và cộng sự [17] ), chúng tôi sử dụng SMOTE ở mức 150% và 30 0%, trong đó 30 0% có nghĩa là ba thể hiện tổng hợp mới được tạo cho mỗi thể hiện lớp thiểu số. Điều này dẫn đến các phân bố xấp xỉ đái tháo đường:không đái tháo đường trong tập huấn luyện lần lượt là 1:2 và 1:1.

Hình 6. Đường cong ROC tương ứng với mô hình tổ hợp trong Bảng 3 .

Bảng 4 Kết quả dưới dạng phần trăm thu được từ tập kiểm tra của 10 phân chia dữ liệu khác nhau và so sánh với kết quả từ Pimentel và cộng sự [17] .

| SMOTE   | Mô hình              |   AUC |   Độ nhạy |   Độ đặc hiệu |
|---------|--------------------|-------|---------------|---------------|
| 0%      | Mô hình tổ hợp của chúng tôi | 84.01 |         29.12 |         96.18 |
|         | Mô hình tốt nhất trong [17] | 83.19 |         16.07 |         99.28 |
| 150%    | Mô hình tổ hợp của chúng tôi | 83.33 |         49.40 |         90.16 |
|         | Mô hình tốt nhất trong [17] | 84.22 |         29.19 |         96.42 |
| 300%    | Mô hình tổ hợp của chúng tôi | 82.12 |         71.57 |         76.59 |
|         | Mô hình tốt nhất trong [17] | 84.11 |         36.23 |         93.77 |

## 3. Kết quả và bàn luận

Bảng 3 cho thấy hiệu năng thu được từ tập kiểm tra bằng 10 mô hình từ một kiểm định chéo phân tầng 10-fold và mô hình tổ hợp cuối cùng. Mô hình tổ hợp tạo ra AUC là 84.13% ( Hình 6 ) cao hơn so với từng mô hình riêng lẻ. Điều này có nghĩa là tổ hợp trung bình hóa mô hình (modeling averaging ensemble) bền vững hơn và tạo ra hiệu năng tốt hơn trung bình so với một mô hình đơn lẻ.

Chúng tôi tiếp tục kiểm tra thuật toán bằng cách sử dụng kiểm định chéo 10-fold và mô hình tổ hợp cuối cùng được chọn để đánh giá hiệu năng từ tập kiểm tra của 10 phân chia dữ liệu khác nhau (10 tập kiểm định chéo 10-fold). Mô hình không sử dụng SMOTE cho thấy điểm số AUC cao hơn các mô hình khác sử dụng SMOTE (150% và 300%) ( Bảng 4 ). Việc sử dụng SMOTE với sự thay đổi tỷ lệ thiểu số và đa số chỉ cải thiện độ nhạy nhưng không cải thiện các chỉ số hiệu năng khác. Mô hình tổ hợp không sử dụng SMOTE, trung bình, đạt điểm số AUC là 84.01%, điểm số độ nhạy là 29.12% và độ đặc hiệu là 96.18% ( Bảng 4 ).

Các kết quả về so sánh mô hình ( Bảng 4 ) cho thấy mô hình tổ hợp không có SMOTE hoạt động tốt hơn mô hình tổ hợp sử dụng SMOTE (150% và 300%) với điểm số AUC cao hơn (lần lượt là 0.68% và 1.89%) và độ đặc hiệu cao hơn (lần lượt là 6.02% và 19.59%). Tuy nhiên, các mô hình sử dụng SMOTE làm tăng độ nhạy (lần lượt là 24.34% và 42.45%). Các kết quả này trái ngược với một nghiên cứu khác của Pimentel và cộng sự [17] , những người báo cáo rằng hiệu năng của mô hình random forest của họ sử dụng SMOTE (150% và 300%) cải thiện đáng kể điểm số AUC và độ nhạy. Trong một nghiên cứu khác, Alghamdi và cộng sự [4] cho thấy rằng việc sử dụng SMOTE với học máy tổ hợp cải thiện đáng kể hiệu năng của mô hình cho việc dự đoán tỷ lệ mắc mới T2DM. Việc sử dụng một cách tiếp cận dựa trên tổ hợp với SMOTE đã được phát hiện đạt độ chính xác cao trong việc dự đoán tỷ lệ mắc mới đái tháo đường tại khu vực đô thị Detroit, Michigan ở Hoa Kỳ [4] .

So với cách tiếp cận học máy của Pimentel và cộng sự [17] , những người đã áp dụng random forest với các đặc trưng thời gian và lựa chọn đặc trưng sử dụng cùng bộ dữ liệu và các thiết lập thực nghiệm như của chúng tôi, hiệu năng trên tập kiểm tra của mô hình chúng tôi cao hơn (điểm số AUC (84.01%) và điểm số độ nhạy (29.12%)) so với mô hình của họ (điểm số AUC (83.19%) và điểm số độ nhạy (16.07%)) khi không sử dụng SMOTE. Điểm số độ nhạy cao hơn trong mô hình của chúng tôi sẽ là một sự bù đắp cho việc có thể dự đoán tốt hơn tỷ lệ các đối tượng có đái tháo đường được phân loại đúng là có đái tháo đường. Các kết quả của chúng tôi ( Bảng 4 ) làm nổi bật một số hàm ý quan trọng. Cả độ nhạy và độ đặc hiệu đều hữu ích nhất khi lớp mục tiêu (dương tính) thường nhỏ hơn với một hậu quả đáng kể nếu bị phân loại sai. Do đó, sự đánh đổi giữa độ nhạy và độ đặc hiệu cần được cân nhắc kỹ lưỡng để có được sự cân bằng tốt. Mô hình tổ hợp của chúng tôi sử dụng SMOTE 300%, khi so sánh với các mô hình khác, có độ nhạy tốt hơn với một sự giảm khiêm tốn về độ đặc hiệu. Một mô hình dự đoán đái tháo đường type 2 với độ nhạy tốt sẽ giảm nguy cơ các can thiệp và liệu pháp không cần thiết được áp dụng cho những người có nguy cơ tương lai thấp. Tuy nhiên, sự đánh đổi của việc sử dụng mô hình SMOTE 300% là việc giảm độ đặc hiệu có thể dẫn đến một số người không mắc đái tháo đường type 2 sẽ dương tính khi sàng lọc và do đó có khả năng nhận được các điều tra thêm không cần thiết. Từ góc độ lâm sàng, các nhà lâm sàng, khi đưa ra các quyết định chung với bệnh nhân, sẽ tự tin hơn khi sử dụng một mô hình dự đoán có độ nhạy cao [32] .

Để có một sự so sánh sơ lược, đáng lưu ý các nghiên cứu khác sử dụng các cách tiếp cận học máy khác để dự đoán T2DM mặc dù có sự khác biệt về bộ dữ liệu và các thiết lập thực nghiệm. Mani và cộng sự [10] đã khảo sát các thuật toán học máy khác nhau với lựa chọn đặc trưng để đánh giá nguy cơ phát triển T2DM từ sáu tháng đến một năm. Họ đã sử dụng một bộ dữ liệu EHR đã được khử định danh do Trung tâm Y khoa Đại học Vanderbilt quản lý. Bộ dữ liệu này bao gồm các biến nhân khẩu học (tuổi, giới tính và chủng tộc), ghi chú lâm sàng (chỉ số khối cơ thể (body mass index - BMI) và tình trạng đái tháo đường) và xét nghiệm của 2280 bệnh nhân với 10% được chẩn đoán mắc T2DM. Để thực hiện tác vụ mô hình hóa dự đoán này, họ đã sử dụng nhiều dạng bộ phân loại khác nhau (tuyến tính, dựa trên cây quyết định, dựa trên kernel và dựa trên lấy mẫu). Quần thể được chia ngẫu nhiên thành hai nhóm để phát triển mô hình (50%) và xác thực (50%). Một khung kiểm định chéo lồng nhau năm fold (five-fold nested cross-validation) được triển khai để tối ưu hóa các tham số của thuật toán phân loại. Hiệu năng của mô hình cuối cùng được đánh giá bằng cách lấy trung bình của k mô hình tốt nhất. Độ chính xác cao nhất được báo cáo với điểm số AUC lớn hơn 80% cho việc tiên lượng T2DM ở 180 ngày và 365 ngày.

Razavian và cộng sự [11] đã áp dụng hồi quy logistic với điều chuẩn L1 (L1 regularisation) để dự đoán các yếu tố nguy cơ liên quan đến T2DM giữa năm 2009 và 2011 sử dụng một bộ dữ liệu yêu cầu bảo hiểm điện tử do công ty bảo hiểm Independence Blue Cross ở Pennsylvania, Hoa Kỳ cung cấp. Bộ dữ liệu chứa thông tin yêu cầu bảo hiểm (giấy tờ hành chính, hồ sơ dược phẩm, sử dụng dịch vụ chăm sóc sức khỏe và xét nghiệm) của 793,153 trường hợp khớp với các tiêu chí lựa chọn. Bộ dữ liệu được chia ngẫu nhiên thành một tập huấn luyện (67%) và một tập kiểm tra (33%) bằng cách sử dụng kiểm định chéo năm fold. Mô hình cuối cùng cải thiện độ chính xác dự đoán với điểm số AUC là 80% và có thể dự đoán các yếu tố nguy cơ liên quan đến sự khởi phát đái tháo đường.

Anderson và cộng sự [12] đã sử dụng các thuật toán học máy (hồi quy logistic đa biến và random forest) để khảo sát việc phát hiện và sàng lọc T2DM cho quần thể dân số Hoa Kỳ sử dụng cùng bộ dữ liệu được sử dụng trong nghiên cứu của chúng tôi. Họ đã so sánh ba mô hình riêng biệt: (1) một mô hình đầy đủ bao gồm các đơn thuốc y tế và các điểm số nguy cơ thông thường, (2) một mô hình hạn chế tương tự như (1) nhưng loại trừ các ghi chú y tế, và (3) một mô hình thông thường chứa một số điểm số nguy cơ thông thường với các tương tác (BMI, tuổi, giới tính, hút thuốc và tăng huyết áp). Đối với hồi quy logistic, hiệu năng được báo cáo dưới dạng điểm số AUC lần lượt là 84.9%, 83.2%, và 75.0%. Đối với random forest, các điểm số AUC lần lượt là 81.3%, 79.6%, và 74.8%. Việc đưa vào kiểu hình EHR (EHR phenotyping) cải thiện đáng kể hiệu năng của việc phát hiện và sàng lọc T2DM trong nghiên cứu này.

Brisimi và cộng sự [15] đã phát triển các mô hình dự đoán cho việc nhập viện liên quan đến đái tháo đường dựa trên EHRs của 40,921 bệnh nhân từ năm 2001 đến năm 2012 từ bệnh viện mạng lưới an toàn (safety net hospital) lớn nhất ở New England. Phương pháp gom cụm/phân loại kết hợp (joint clustering/classification) mới của họ đạt được AUC là 89%.

Zou và cộng sự [16] đã áp dụng các kỹ thuật học máy (cây quyết định, random forest và mạng nơ-ron) để dự đoán đái tháo đường sử dụng dữ liệu khám sức khỏe bệnh viện chứa 14 thuộc tính ở Lư Châu (Luzhou), Trung Quốc. Một kiểm định chéo năm fold được sử dụng để đánh giá các mô hình. Độ chính xác cao nhất được báo cáo khi sử dụng random forest với độ chính xác lớn hơn 80%.

So với các hệ thống học máy khác và thống kê tần suất (frequentist statistics) được trình bày ở trên, ưu điểm chính của mô hình rộng và sâu là nó kết hợp kỹ thuật đặc trưng thủ công thông qua việc lựa chọn các đặc trưng và thiết kế các đặc trưng giao chéo đi vào phần rộng và kỹ thuật đặc trưng tự động bằng cách sử dụng các mạng nơ-ron sâu trong phần sâu.

Độ chính xác của mô hình chúng tôi bị ảnh hưởng bởi một số yếu tố. Một trong những thách thức chính trong nghiên cứu của chúng tôi là số chiều cao và độ thưa của bộ dữ liệu. Vì nhiều thuật toán học máy nói chung không thể xử lý dữ liệu không đầy đủ và mất cân bằng nơi các lớp không được biểu diễn ngang nhau, không có gì ngạc nhiên khi cách tiếp cận sử dụng học rộng và sâu của chúng tôi bị ảnh hưởng nghiêm trọng bởi cùng vấn đề này. Trong thiết lập mô hình của chúng tôi, 27 đặc trưng mô tả chẩn đoán và 33 đặc trưng thuốc được lựa chọn để tạo ra các đặc trưng tích chéo nhưng số lượng quan sát trong các nhóm này mất cân bằng do một mẫu không đồng nhất gồm các bệnh nhân có chẩn đoán đái tháo đường và không đái tháo đường và một số đặc trưng chứa các giá trị khuyết thiếu hoặc thông tin không chính xác. Công trình của Habibi và cộng sự [33] cho thấy rằng cây quyết định có thể được sử dụng để sàng lọc T2DM mà không cần sử dụng xét nghiệm. Thật vậy, ngoài các mô hình hồi quy cổ điển, có một số nghiên cứu thành công sử dụng học sâu để cải thiện độ chính xác của dự đoán nguy cơ đái tháo đường [8,34] . Tuy nhiên, công trình của chúng tôi là nỗ lực đầu tiên áp dụng học rộng và sâu cho việc dự đoán sự khởi phát đái tháo đường sử dụng EHRs. Mặc dù mô hình của chúng tôi đạt được khả năng dự đoán cao hơn so với các phương pháp học máy cổ điển, tương tự như các mô hình học sâu khác [8,34] , mô hình rộng và sâu sẽ không thể dự đoán một số yếu tố nguy cơ quan trọng được tích hợp vào mô hình.

## 4. Kết luận

Trong nghiên cứu này, chúng tôi đề xuất một kiến trúc mạng nơ-ron học rộng và sâu để dự đoán sự khởi phát đái tháo đường sử dụng một bộ dữ liệu EHR công khai. Mô hình tổ hợp của chúng tôi cải thiện các điểm số nguy cơ AUC và độ đặc hiệu và cải thiện đáng kể độ nhạy cho việc dự đoán khởi phát T2DM so với các thuật toán học máy khác sử dụng cùng bộ dữ liệu và các thiết lập thực nghiệm [17] . Trong tương lai, chúng tôi sẽ tích hợp một phương pháp lựa chọn đặc trưng tự động để thiết kế các đặc trưng giao chéo và lựa chọn các đặc trưng cho phần rộng của mô hình. Việc sử dụng một phương pháp nhúng tinh vi hơn cho phần sâu có thể là một cách khác để cải thiện hiệu năng của mô hình.

## Tuyên bố về Xung đột Lợi ích

Tất cả các tác giả tuyên bố rằng họ không có xung đột lợi ích nào liên quan đến việc công bố bài báo này.

## Lời cảm ơn

B. P. Nguyen và Q. H. Nguyen trân trọng ghi nhận sự hỗ trợ của NVIDIA Corporation về việc tài trợ các GPU được sử dụng cho nghiên cứu này.

## Tài liệu bổ sung

Tài liệu bổ sung liên quan đến bài báo này có thể được tìm thấy, trong phiên bản trực tuyến, tại doi: 10.1016/j.cmpb.2019.105055 .

## Tài liệu tham khảo

- [1] I.D. Federation, IDF diabetes atlas, eighth ed., 2017, ( http://diabetesatlas.org/ IDF \_ Diabetes \_ Atlas \_ 8e \_ interactive \_ EN/ Brussels, Belgium).
- [2] R.L. Richesson, S.A. Rusincovitch, D. Wixted, B.C. Batch, M.N. Feinglos, M.L. Miranda, W.E. Hammond, R.M. Califf, S.E. Spratt, A comparison of phenotype definitions for diabetes mellitus, J. Am. Med. Inform. Assoc. 20 (e2) (2013) e319e326, doi: 10.1136/amiajnl-2013-001952 .
- [3] D.J. Rubin, Correction to: hospital readmission of patients with diabetes, Curr. Diabetes Rep. 18 (21) (2018) 1-9, doi: 10.1007/s1189201809891 .
- [4] M. Alghamdi, M. Al-Mallah, S. Keteyian, C. Brawner, J. Ehrman, S. Sakr, Predicting diabetes mellitus using SMOTE and ensemble machine learning approach: the Henry Ford exercise testing (FIT) project, PLoS One 12 (7) (2017) 1-15, doi: 10.1371/journal.pone.0179805 .
- [5] J.A. Casey, B.S. Schwartz, W.F. Stewart, N.E. Adler, Using electronic health records for population health research: a review of methods and applications, Ann. Rev. Public Health 37 (2016) 61-81, doi: 10.1146/annurevpublhealth032315021353 .
- [6] C. Xiao, E. Choi, J. Sun, Opportunities and challenges in developing deep learning models using electronic health records data: a systematic review, J. Am. Med. Inform. Assoc. 25 (10) (2018) 1419-1428, doi: 10.1093/jamia/ocy068 .
- [7] W.R. Hersh , Adding value to the electronic health record through secondary use of data for quality assurance, research, and surveillance, Am. J. Manag. Care 13 (6) (2007) 277-278 .
- [8] R. Miotto, L. Li, B.A. Kidd, J.T. Dudley, Deep patient: an unsupervised representation to predict the future of patients from the electronic health records, Sci. Rep. 6 (26094) (2016) 1-10, doi: 10.1038/srep26094 .

- [9] B.A . Goldstein, A .M. Navar, M.J. Pencina, J.P.A. loannidis, Opportunities and challenges in developing risk prediction models with electronic health records data: a systematic review, J. Am. Med. Inform. Assoc. 24 (1) (2017) 198-208, doi: 10.1093/jamia/ocw042 .
- [10] S. Mani , Y. Chen , T. Elasy , W. Clayton , J. Denny , Type 2 diabetes risk forecasting from EMR data using machine learning, in: Proceedings of the AMIA Annual Symposium, American Medical Informatics Association, 2012, pp. 606615 .
- [11] N. Razavian, S. Blecker, A.M. Schmidt, A. Smith-McLallen, S. Nigam, D. Sontag, Population-level prediction of type 2 diabetes from claims data and analysis of risk factors, Big Data 3 (4) (2015) 277-287, doi: 10.1089/big.2015.0020 .
- [12] A.E. Anderson, W.T. Kerra, A. Thames, T. Li, J. Xiao, M.S. Cohen, Electronic health record phenotyping improves detection and screening of type 2 diabetes in the general United States population: a cross-sectional, unselected, retrospective study, J. Biomed. Inform. 60 (2016) 162-168, doi: 10.1016/j.jbi. 2015.12.006 .
- [13] J.P. Anderson, J.R. Parikh, D.K. Shenfeld, V. Ivanov, C. Marks, B.W. Church, J.M. Laramie, J. Mardekian, B.A. Piper, R.J. Willke, D.A. Rublee, Reverse engineering and evaluation of prediction models for progression to type 2 diabetes: an application of machine learning using electronic health records, J. Diabetes Sci. Technol. 10 (1) (2016) 6-18, doi: 10.1177/1932296815620200 .
- [14] T. Zheng, W. Xie, L. Xu, X. He, Y. Zhang, M. You, G. Yang, Y. Chen, A machine learning-based framework to identify type 2 diabetes through electronic health records, Int. J. Med. Inform. 97 (1) (2017) 120-127, doi: 10.1016/j.ijmedinf.2016. 09.014 .
- [15] T.S. Brisimi, T. Xu, T. Wang, W. Dai, I.C. Paschalidis, Predicting diabetes-related hospitalizations based on electronic health records, Stat. Methods Med. Res. (2018), doi: 10.1177/0962280218810911 .
- [16] Q. Zou, K. Qu, Y. Luo, D. Yin, Y. Ju, H. Tang, Predicting diabetes mellitus with machine learning techniques, Front. Genet. 9 (2018) 515, doi: 10.3389/fgene. 2018.00515 .
- [17] A . Pimentel, A .V. Carreiro, R.T. Ribeiro, H. Gamboa, Screening diabetes mellitus 2 based on electronic health records using temporal features, Health Inform. J. 24 (2) (2018) 194-205, doi: 10.1177/1460458216663023 .
- [18] P. Ruscitti, F. Ursini, P. Cipriani, V. Liakouli, F. Carubbi, O. Berardicurti, G. De Sarro, R. Giacomelli, Poor clinical response in rheumatoid arthritis is the main risk factor for diabetes development in the short-term: a 1-year, single-centre, longitudinal study, PLoS One 12 (7) (2017) 1-16, doi: 10.1371/journal.pone. 0181203 .
- [19] T. Kümler, G.H. Gislason, L. Køber, C. Torp-Pedersen, Diabetes is an independent predictor of survival 17 years after myocardial infarction: follow-up of the TRACE registry, Cardiovasc. Diabetol. 9 (22) (2010) 1-8, doi: 10.1186/ 14752840922 .
- [20] G.-M. Huang, K.-Y. Huang, T.-Y. Lee, J.T.-Y. Weng, An interpretable rule-based diagnostic classification of diabetic nephropathy among type 2 diabetes patients, BMC Bioinform. 16 (Suppl 1) (2015) S5:1-10, doi: 10.1186/1471-210516S1S5 .
- [21] S. Purushotham, C. Meng, Z. Che, Y. Liu, Benchmarking deep learning models on large healthcare datasets, J. Biomed. Inform. 83 (2018) 112-134, doi: 10.1016/ j.jbi.2018.04.007 .
- [22] H.-T. Cheng, L. Koc, J. Harmsen, T. Shaked, T. Chandra, H. Aradhye, G. Anderson, G. Corrado, W. Chai, M. Ispir, R. Anil, Z. Haque, L. Hong, V. Jain, X. Liu, H. Shah, Wide &amp; deep learning for recommender systems, in: Proceedings of the First Workshop on Deep Learning for Recommender Systems (DLRS 2016), ACM, 2016, pp. 7-10, doi: 10.1145/2988450.2988454 .
- [23] Z. Liang, G. Zhang, J.X. Huang, Q.V. Hu, Deep learning for healthcare decision making with EMRs, in: Proceedings of the IEEE International Conference on Bioinformatics and Biomedicine (BIBM 2014), IEEE, 2014, pp. 556-559, doi: 10. 1109/BIBM.2014.6999219 .
- [24] T. Tran, T.D. Nguyen, D. Phung, S. Venkatesh, Learning vector representation of medical objects via EMR-driven nonnegative restricted Boltzmann machines (eNRBM), J. Biomed. Inform. 83 (2015) 96-105, doi: 10.1016/j.jbi.2015.01.012 .
- [25] J. Futoma, J. Morris, J. Lucas, A comparison of models for predicting early hospital readmissions, J. Biomed. Inform. 56 (2015) 229-238, doi: 10.1016/j.jbi. 2015.05.016 .
- [26] E. Choi , M.T. Bahadori , J. Sun , J. Kulas , A. Schuetz , W. Stewart , RETAIN: an interpretable predictive model for healthcare using reverse time attention mechanism, in: D.D. Lee, M. Sugiyama, U.V. Luxburg, I. Guyon, R. Garnett (Eds.), Proceedings of the Advances in Neural Information Processing Systems, volume 29, Curran Associates, Inc., 2016, pp. 3504-3512 .
- [27] T. Pham, T. Tran, D. Phung, S. Venkatesh, Predicting healthcare trajectories from medical records: a deep learning approach, J. Biomed. Inform. 69 (2017) 218229, doi: 10.1016/j.jbi.2015.05.016 .
- [28] J. Hippisley-Cox, C. Coupland, Development and validation of QDiabetes-2018 risk prediction algorithm to estimate future risk of type 2 diabetes: cohort study, BMJ 359 (j5019) (2017) 1-18, doi: 10.1136/bmj.j5019 .
- [29] J. Hippisley-Cox, C. Coupland, J. Robson, A. Sheikh, P. Brindle, Predicting risk of type 2 diabetes in england and wales: prospective derivation and validation of QDScore, BMJ 338 (b880) (2009) 1-15, doi: 10.1136/bmj.b880 .
- [30] I. Goodfellow , Y. Bengio , A. Courville , Deep Learning, Adaptive Computation and Machine Learning Series, The MIT Press, 2016 .
- [31] N.V. Chawla, K.W. Bowyer, L.O. Hall, W.P. Kegelmeyer, SMOTE: synthetic minority over-sampling technique, J. Artif. Intell. Res. 16 (2002) 321-â357, doi: 10. 1613/jair.953 .
- [32] W.M. Strull, B. Lo, G. Charles, Do patients want to participate in medical decision making? JAMA 252 (21) (1984) 2990-2994, doi: 10.1001/jama.1984. 03350210038026 .
- [33] S. Habibi, M. Ahmadi, S. Alizadeh, Type 2 diabetes mellitus screening and risk factors using decision tree: results of data mining, Glob. J. Health Sci. 7 (5) (2015) 304-310, doi: 10.5539/gjhs.v7n5p304 .
- [34] H.N. Mhaskar, S.V. Pereverzyev, M.D. van der Walt, A deep learning approach to diabetic blood glucose prediction, Front. Appl. Math. Stat. 3 (14) (2017) 1-11, doi: 10.3389/fams.2017.0 0 014 .
