<!-- extracted by pdf-extract | engine=docling | pages=11 | ocr=False | tables=6/6 | density=1.21 | score=100 -->

Bài báo

## Dự đoán Nguy cơ Đái tháo đường Type 2 và Đánh giá Hiệu quả của nó Dựa trên Mô hình XGBoost

Liyang Wang 1 , Xiaoya Wang 1 , Angxuan Chen 2 , Xian Jin 3 và Huilian Che 1, *

- 1 Beijing Advanced Innovation Center for Food Nutrition and Human Health, College of Food Science and Nutritional Engineering, China Agricultural University, Beijing 100083, China; 18259800533@163.com (L.W.); 15384665858@163.com (X.W.)
- 2 College of Information and Electrical Engineering, China Agricultural University, Beijing 100083, China; cauapplexian@163.com
- 3 College of Economics and Management, China Agricultural University, Beijing 100083, China; applexian@cau.edu.cn
* Liên hệ: chehuilian@cau.edu.cn

Nhận bài: 14 June 2020; Chấp nhận: 29 July 2020; Xuất bản: 31 July 2020

Tóm tắt: Xét đến tác hại của đái tháo đường đối với dân số, chúng tôi đã giới thiệu một thuật toán học tập hợp (ensemble learning) - EXtreme Gradient Boosting (XGBoost) để dự đoán nguy cơ đái tháo đường type 2 và so sánh nó với các thuật toán Support Vector Machines (SVM), Random Forest (RF) và K-Nearest Neighbor (K-NN) nhằm cải thiện hiệu quả dự đoán của các mô hình hiện có. Sự kết hợp giữa lấy mẫu thuận tiện (convenient sampling) và lấy mẫu quả cầu tuyết (snowball sampling) ở Quận Xicheng, Beijing đã được sử dụng để tiến hành một khảo sát bằng bảng câu hỏi về dữ liệu cá nhân, thói quen ăn uống, tình trạng tập thể dục và tiền sử bệnh trong gia đình của 380 người trung niên và cao tuổi. Sau đó, chúng tôi huấn luyện các mô hình và thu được chỉ số nguy cơ bệnh cho từng mẫu bằng kiểm định chéo 10-fold (10-fold cross-validation). Các thí nghiệm đã được thực hiện để so sánh các thuật toán học máy thường dùng nêu trên và chúng tôi nhận thấy XGBoost có hiệu quả dự đoán tốt nhất, với độ chính xác trung bình là 0.8909 và diện tích dưới đường cong đặc trưng hoạt động của người nhận (AUC) là 0.9182. Do đó, nhờ tính ưu việt của kiến trúc của nó, XGBoost có độ chính xác dự đoán và khả năng tổng quát hóa nổi bật hơn các thuật toán hiện có trong việc dự đoán nguy cơ đái tháo đường type 2, điều này có lợi cho việc phòng ngừa và kiểm soát đái tháo đường một cách thông minh trong tương lai.

Từ khóa: học tập hợp (ensemble learning); dự đoán nguy cơ bệnh; mô hình XGBoost; học máy truyền thống; phân tích so sánh

## 1. Giới thiệu

Đái tháo đường là một hội chứng lâm sàng tương tác với các yếu tố môi trường và di truyền và nó cũng là một bệnh mãn tính điển hình mà người trung niên và cao tuổi phải chịu đựng rất nhiều. Đái tháo đường được đặc trưng bởi đường huyết cao, với nhiều biến chứng như biến chứng vi mạch, biến chứng mạch máu lớn và biến chứng thần kinh thực sự phổ biến. Ví dụ, các biến chứng vi mạch có thể gây ra tổn thương mắt do đái tháo đường, dẫn đến nhìn mờ, mù lòa, bệnh võng mạc đái tháo đường và bệnh thận đái tháo đường. Đối với bệnh thận đái tháo đường, protein niệu xuất hiện đầu tiên, sau đó chức năng thận dần suy giảm và cuối cùng suy thận sẽ xuất hiện và phát triển thành urê huyết, gây hại nghiêm trọng cho sức khỏe con người. Theo nghiên cứu gần đây [1,2], hơn một nửa số người trung niên và cao tuổi không có ý thức phòng ngừa bệnh mạnh mẽ, và không có khái niệm về hành vi tự quản lý đối với đái tháo đường. Do đó, việc thiết lập một hệ thống cảnh báo hợp lý đối với nguy cơ đái tháo đường sẽ cung cấp sự trợ giúp tiện lợi cho người trung niên và cao tuổi để phòng ngừa đái tháo đường và chú ý hơn đến nó, điều này có ý nghĩa to lớn trong việc giảm tỷ lệ mắc đái tháo đường ở Trung Quốc [3].

/gid00001

Các mô hình thống kê được áp dụng rộng rãi trong cảnh báo sớm nguy cơ bệnh mãn tính truyền thống, chẳng hạn như hồi quy đa tuyến tính (multilinear regression) và hồi quy đa logistic (multi-logistic regression), vốn thường được sử dụng hơn [4]. Phương pháp này sử dụng một hệ số hồi quy để chỉ ra mức độ tương quan giữa các yếu tố nguy cơ và bệnh, nhưng thuật toán của nó tương đối đơn nhất và kết quả không thể đưa ra chính xác các giá trị xác suất cụ thể. Hiện nay, với sự phát triển của trí tuệ nhân tạo, học máy ngày càng được sử dụng để đánh giá nguy cơ của các bệnh mãn tính. Nó tổng hợp và học các yếu tố liên quan đến bệnh mãn tính, và cuối cùng đạt được một điểm số đánh giá về các kết quả có thể xảy ra của bệnh. Ví dụ, Finkelstein và cộng sự [5] đã dự đoán các cơn hen suyễn bằng cách sử dụng bộ phân loại Naive Bayes, mạng Bayes thích nghi, và Support Vector Machines (SVM), với độ nhạy là 0.80, 1.00 và 0.84; độ đặc hiệu là 0.77, 1.00 và 0.80, và độ chính xác là 0.77, 1.00 và 0.80. Đồng thời, các nghiên cứu tương tự đã được tiến hành trong lĩnh vực dự đoán đái tháo đường. Trong những năm gần đây, Park và cộng sự [6] đã áp dụng perceptron đa lớp tuần tự học lan truyền ngược (SMLP) để thu được xác suất dự đoán đái tháo đường, nhận thấy rằng kết quả vượt trội hơn các mô hình hồi quy. Zhu và cộng sự [7] đã cải tiến thuật toán hồi quy logistic một cách thông minh, và độ chính xác được cải thiện 1.98% trong dự đoán đái tháo đường. Ngoài ra, Sudharsan và cộng sự [8] đã sử dụng các mô hình học máy để dự đoán các sự kiện hạ đường huyết xảy ra trong 24 giờ ở bệnh nhân đái tháo đường, dẫn đến độ nhạy 92% và độ đặc hiệu 70%. Tuy nhiên, việc dự đoán đái tháo đường thông qua học máy chủ yếu dựa trên các thuật toán phân loại truyền thống trong nghiên cứu hiện nay, nhưng các báo cáo về ứng dụng thuật toán Boosting mạnh mẽ trong lĩnh vực này tương đối khan hiếm.

Xét đến sự thiếu hụt biểu hiện của học tập hợp mới mẻ và hiệu quả trong nghiên cứu đánh giá nguy cơ đái tháo đường type 2, kết hợp với những lợi thế của nó trong lĩnh vực khai thác dữ liệu, chúng tôi đã xây dựng một mô hình EXtreme Gradient Boosting (XGBoost) [9-12] để dự đoán nguy cơ đái tháo đường ở 368 người trung niên và cao tuổi, và cuối cùng rút ra xác suất cụ thể của mỗi bệnh nhân tiềm năng. Theo hiểu biết của chúng tôi, đây là một ứng dụng đổi mới của thuật toán XGBoost trong lĩnh vực này. Đồng thời, để phản ánh tính ưu việt của phương pháp này, chúng tôi cũng đã so sánh nó với các mô hình học máy truyền thống trong đánh giá nguy cơ đái tháo đường. Nghiên cứu này chỉ ra rằng mặc dù lượng dữ liệu được sử dụng để huấn luyện nhỏ, mô hình XGBoost vẫn thể hiện hiệu suất ổn định và xuất sắc.

## 2. Vật liệu và Phương pháp

Quy trình làm việc của bài báo này được thể hiện trong Figure 1. Các bảng câu hỏi thu thập được đã được chuyển đổi thành các vectơ đặc trưng dưới dạng mã nhị phân sau khi lựa chọn nghiêm ngặt. Đồng thời, nghiên cứu đã sử dụng 4 mô hình học máy (XGBoost, SVM, Random Forest (RF) và K-Nearest Neighbor (K-NN)) để tiến hành các thí nghiệm, và đánh giá hiệu suất của các thuật toán khác nhau thông qua kiểm định chéo 10-fold (10-fold cross-validation). Cuối cùng, chúng tôi đã chọn mô hình tối ưu để dự đoán nguy cơ đái tháo đường type 2. Healthcare 2020 , 8 , x 3 of 14

Figure 1. Quy trình làm việc của nghiên cứu này. Figure 1. Quy trình làm việc của nghiên cứu này.

2.1. Dữ liệu Thí nghiệm

Một khảo sát bằng bảng câu hỏi kết hợp lấy mẫu thuận tiện (convenient sampling) với lấy mẫu quả cầu tuyết (snowball sampling) đã được

tiến hành ở quận Xicheng của Beijing, và nhóm đối tượng mục tiêu chính là người trung niên

(từ 45 đến 54 tuổi) và người cao tuổi (55 tuổi trở lên). Trong nghiên cứu của chúng tôi, địa điểm và

khoảng thời gian của khảo sát, tuổi, giới tính và tình trạng bệnh của những người được hỏi đã được chọn ngẫu nhiên. Nội dung

khảo sát có thể được chia thành 4 loại thông tin, đó là thông tin cá nhân, thói quen ăn

## 2.1. Dữ liệu Thí nghiệm

Một khảo sát bằng bảng câu hỏi kết hợp lấy mẫu thuận tiện (convenient sampling) với lấy mẫu quả cầu tuyết (snowball sampling) đã được tiến hành ở quận Xicheng của Beijing, và nhóm đối tượng mục tiêu chính là người trung niên (từ 45 đến 54 tuổi) và người cao tuổi (55 tuổi trở lên). Trong nghiên cứu của chúng tôi, địa điểm và khoảng thời gian của khảo sát, tuổi, giới tính và tình trạng bệnh của những người được hỏi đã được chọn ngẫu nhiên. Nội dung khảo sát có thể được chia thành 4 loại thông tin, đó là thông tin cá nhân, thói quen ăn uống, tình trạng tập thể dục và tiền sử gia đình, trong đó mỗi loại có nhiều câu hỏi. Mỗi câu hỏi ngoại trừ thông tin cá nhân và tiền sử gia đình lấy tần suất làm các lựa chọn, bao gồm 3 lần một ngày trở lên, 2 lần một ngày, 1 lần một ngày, 4-6 lần một tuần, 1-3 lần một tuần, 1-3 lần mỗi tháng và không bao giờ. Tổng cộng 380 bảng câu hỏi đã được phân phát trong khảo sát, và 368 bảng câu hỏi hợp lệ cuối cùng đã thu được sau khi dữ liệu được làm sạch.

Đáng chú ý là tỷ lệ mắc đái tháo đường type 2 của mỗi người được hỏi đã được xác nhận nghiêm ngặt (tham chiếu theo tiêu chuẩn của World Health Organization, FPG lớn hơn hoặc bằng 7.0 mmol / L được coi là đái tháo đường). Ngoài ra, thông tin bảng câu hỏi do các điều tra viên điền đã được xác nhận nghiêm ngặt để ngăn ngừa sai sót do con người gây ra bởi chính lý do của các điều tra viên.

Cần nhấn mạnh rằng không có đối tượng con người nào được sử dụng trong nghiên cứu này, chúng tôi chỉ sử dụng thông tin cá nhân của họ để phân tích với sự cho phép của các đối tượng bảng câu hỏi. Đồng thời, công trình này đã được phê duyệt bởi Human Research Ethics Committee tại China Agricultural University (số phê duyệt: CAUHR-2020003).

## 2.2. Biểu diễn Vectơ Đặc trưng

Chúng tôi cần chuyển đổi thông tin bảng câu hỏi thành các vectơ đặc trưng có thể được đưa vào các mô hình học máy. Ở đây, một phương pháp biểu diễn đặc trưng dựa trên mã hóa nhị phân được cung cấp. Đối với thông tin cá nhân và tiền sử gia đình, thí nghiệm chuyển đổi câu trả lời có / không của mỗi câu hỏi (chẳng hạn như có tiền sử gia đình hay không, v.v.) thành một số 1 / 0. Ngoài ra, thói quen ăn uống và tình trạng tập thể dục là một cách khác. Cụ thể hơn, đối với K câu hỏi về thói quen ăn uống, mỗi câu hỏi có 7 lựa chọn, giả sử một bệnh nhân đáp ứng lựa chọn đầu tiên, biểu thức là f ( q1 ) = (1, 0, : : : , 0); nếu nó khớp với lựa chọn thứ hai, biểu thức là f ( q1 ) = (0, 1, : : : , 0), và cứ tiếp tục như vậy. Theo cùng một cách, đối với M câu hỏi về tình trạng tập thể dục, biểu thức tương tự. Công thức tương ứng như sau.

trong đó F đại diện cho vectơ đặc trưng của thói quen ăn uống và tình trạng tập thể dục của mỗi mẫu. Vectơ đặc trưng tổng thể cũng yêu cầu mã hóa thông tin cá nhân và tiền sử gia đình.

## 2.3. Thuật toán EXtreme Gradient Boosting

Đầu tiên, các câu trả lời cho tất cả các câu hỏi trong mỗi mẫu được chuyển đổi thành một vectơ đặc trưng, đóng vai trò là vectơ đầu vào của mô hình XGBoost. Bài báo này được lập trình bằng Python 3.8 và được mô hình hóa và huấn luyện trên cấu hình của Hệ điều hành Windows 10 (Microsoft, Redmond, WA, USA), và CPU là Intel Core I7-6700HQ, 3.5 GHz, với bộ nhớ 4 GB.

XGBoost là một thuật toán học máy mới mẻ ra đời vào tháng 2 năm 2014. Thuật toán này đã thu hút sự chú ý rộng rãi nhờ hiệu quả học tập xuất sắc và tốc độ huấn luyện hiệu quả. Thuật toán XGBoost là một cải tiến của cây quyết định tăng cường gradient (GBDT) và có thể được sử dụng cho cả vấn đề phân loại và hồi quy. Đáng chú ý là XGBoost cũng là một trong các thuật toán cây boosting, tức là tích hợp nhiều bộ phân loại yếu với nhau để tạo thành một bộ phân loại mạnh. Mô hình cây mà nó sử dụng là mô hình cây phân loại và hồi quy (CART).

Ý tưởng của thuật toán này là liên tục thêm cây, và liên tục chia tách các đặc trưng để phát triển một cây. Mỗi lần bạn thêm một cây, bạn thực sự học một hàm mới để khớp với phần dư dự đoán cuối cùng. Khi chúng tôi hoàn thành huấn luyện để thu được k cây, chúng tôi phải dự đoán điểm số của một mẫu. Trên thực tế, theo các đặc điểm của mẫu này, một nút lá tương ứng sẽ rơi vào mỗi cây, và mỗi nút lá tương ứng với một điểm số. Điểm số tương ứng với mỗi cây cần được cộng lại để trở thành giá trị dự đoán của mẫu. Cụ thể, quy trình làm việc của thuật toán như sau.

1. Trước khi bắt đầu lặp cây mới, tính toán ma trận đạo hàm bậc nhất và bậc hai của hàm mất mát tương ứng với mỗi mẫu.
2. Mỗi lần lặp thêm một cây mới, và mỗi cây khớp với phần dư của cây trước đó.
3. Đếm giá trị độ lợi chia tách (split gain) của hàm mục tiêu để chọn điểm chia tách tốt nhất, và sử dụng thuật toán tham lam (greedy algorithm) để xác định cấu trúc tốt nhất của cây.
4. Thêm một cây mới vào mô hình và nhân nó với một hệ số để ngăn ngừa overfitting. Khi khớp phần dư, bước nhảy (step size) hoặc tốc độ học (learning rate) thường được sử dụng để kiểm soát tối ưu hóa, nhằm dành nhiều không gian tối ưu hóa hơn cho việc học tiếp theo.
5. Sau khi huấn luyện, một mô hình gồm nhiều cây được thu được, trong đó mỗi cây có nhiều nút lá.
6. Trong mỗi cây, mẫu rơi vào một số nút lá theo các giá trị riêng (eigenvalues). Giá trị dự đoán cuối cùng là điểm số của nút lá tương ứng với mỗi cây nhân với trọng số của cây.

Từ góc độ biểu diễn mô hình, giả sử chúng tôi lặp t vòng, có nghĩa là chúng tôi muốn tạo ra t cây phần dư. Lúc này, biểu thức của giá trị dự đoán mô hình như sau:

trong đó ft(xi ) đại diện cho giá trị dự đoán của cây phần dư thứ t đối với phần dư thứ t của xi . yi đại diện cho giá trị dự đoán của mô hình, f t là số phần dư của vòng thứ t, và F là không gian hàm của cây phần dư. Ngoài ra, hàm mất mát cũng là một phần không thể thiếu của thuật toán này, và các nguồn lỗi của nó chủ yếu là: lỗi huấn luyện và độ phức tạp của mô hình. Công thức chính của nó như sau:

trong đó l đại diện cho hàm mất mát và W là số hạng điều chuẩn (regularization term). Đối với vòng huấn luyện thứ t, biểu thức mất mát ở trên thỏa mãn mối quan hệ sau:

Do đó, mất mát của vòng thứ t kết hợp với khai triển Taylor bậc hai có thể được đơn giản hóa thành dạng sau:

Trong hàm mục tiêu này, gi và hi là các tham số của cây phần dư thứ t, vì vậy giá trị nhỏ nhất của hàm chỉ có thể thu được bằng cách xác định các tham số theo số nút lá. Cũng cần nhấn mạnh rằng kết quả tối ưu của mô hình cũng phụ thuộc vào cấu trúc của cây, và XGBoost áp dụng thuật toán tham lam (greedy algorithm) để tạo ra kiến trúc cụ thể của cây. Cụ thể, thuật toán bắt đầu ở nút gốc và duyệt tất cả các đặc trưng. Đối với mỗi đặc trưng, nếu nó là một đặc trưng liên tục, nó được sắp xếp từ nhỏ đến lớn. Có 368 mẫu trong thí nghiệm này, vì vậy có 367 điểm chia tách cho đặc trưng liên tục này, và một giá trị độ lợi chia tách được tính tại mỗi điểm chia tách. Giá trị này được sử dụng để xác định xem nút hiện tại có cần được chia tách hay không và để chọn điểm chia tách tốt nhất.

Trong các thí nghiệm của chúng tôi, XGBoost được triển khai trong thư viện học máy scikit-learn dưới Python 3.8. Chúng tôi đã tối ưu hóa các tham số của mô hình trong quá trình kiểm định chéo 10-fold.

## 2.4. Các Thuật toán Cơ sở

Để phản ánh tính ưu việt của XGBoost trong lĩnh vực dự đoán nguy cơ đái tháo đường, ba thuật toán dự đoán bệnh mãn tính thường dùng (SVM, RF, K-NN) đã được chọn để so sánh với các phương pháp ở trên. Quá trình huấn luyện được thực hiện trong Python 3.8 với kiểm định chéo 10 fold, và các tham số được điều chỉnh ở mức tương đối cao.

Cụ thể, bài báo này thiết kế một mô hình SVM phi tuyến tính thực hiện nhiệm vụ phân loại nhị phân, và hàm nhân (kernel function) của nó là RBF. SVM có thể dễ dàng thu được mối quan hệ phi tuyến tính giữa dữ liệu và các đặc trưng khi kích thước mẫu nhỏ. Nó có thể tránh việc sử dụng lựa chọn cấu trúc mạng nơ-ron và các vấn đề cực tiểu cục bộ. Nó có khả năng diễn giải mạnh và có thể giải quyết các vấn đề chiều cao.

Random forest được sử dụng như một thuật toán học tập hợp kinh điển để so sánh với XGBoost. Trong thí nghiệm này, phương pháp Bootstraping được sử dụng để chọn ngẫu nhiên một mẫu nhất định từ tập huấn luyện ban đầu. Tổng cộng n\_tree = 20 mẫu được lấy mẫu để tạo ra n\_tree = 20 tập huấn luyện. Mỗi lần chia tách của mỗi mô hình cây quyết định dựa trên độ lợi thông tin (information gain) để chọn đặc trưng tốt nhất. Mỗi cây đã được chia tách theo cách này cho đến khi tất cả các ví dụ huấn luyện của nút thuộc cùng một lớp. Chúng tôi quyết định kết quả phân loại cuối cùng theo các phiếu bầu của nhiều bộ phân loại cây.

Hơn nữa, chúng tôi đã áp dụng thuật toán K-NN để tính khoảng cách giữa dữ liệu mới và các giá trị đặc trưng của dữ liệu huấn luyện, và sau đó chọn K (K 1) láng giềng gần nhất để phân loại hoặc hồi quy. Nếu K = 1, thì dữ liệu mới sẽ được gán cho lớp láng giềng của nó. Sau các thí nghiệm liên tục, người ta nhận thấy rằng mô hình hoạt động tốt nhất khi K = 5.

## 2.5. Điều chỉnh Tham số

Thí nghiệm sử dụng phương pháp GridSearchCV để điều chỉnh tham số tự động. Chúng tôi đã sử dụng phương pháp này để chọn các tham số tối ưu của 4 mô hình ở trên. Các tham số then chốt cuối cùng được thể hiện trong Tables 1-4. Cần nhấn mạnh rằng GridSearchCV chỉ phù hợp với các tập dữ liệu nhỏ hơn, trong khi các tập dữ liệu lớn sẽ gặp các vấn đề như huấn luyện tốn thời gian và tìm kiếm chậm.

Table 1. Các tham số then chốt của mô hình EXtreme Gradient Boosting (XGBoost).

| Tên Tham số      |   Giá trị |
|------------------|---------|
| gamma            |     0.1 |
| max_depth        |     0.5 |
| lambda           |     3.0 |
| subsample        |     0.7 |
| silent           |     1.0 |
| eta              |     0.1 |
| seed             |  1000.0 |

Table 2. Các tham số then chốt của mô hình Support Vector Machines (SVM).

| Tên Tham số      | Giá trị   |
|------------------|---------|
| C                | 1.0     |
| degree           | 3.0     |
| epsilon          | 0.2     |
| gamma            | auto    |
| tol              | 0.001   |

Table 3. Các tham số then chốt của mô hình Random Forest (RF).

| Tên Tham số            |   Giá trị |
|------------------------|---------|
| n_estimators max_depth |      60 |
|                        |      13 |
| max_features           |       9 |
| Random_state oob_score |      20 |
|                        |    True |

Table 4. Các tham số then chốt của mô hình K-Nearest Neighbor (K-NN).

| Tên Tham số        | Giá trị   |
|--------------------|---------|
| n_neighbors n_jobs | 5 1     |

## 2.6. Phân tích Thống kê

Sau khi huấn luyện mô hình ở trên, chúng tôi đã dự đoán xác suất mắc bệnh đái tháo đường và thực hiện so sánh và đánh giá cho các mô hình thông qua kiểm định chéo 10-fold. Các chỉ số đánh giá dựa trên độ chính xác (Acc), độ nhạy (Sens), độ đặc hiệu (Spec), độ chuẩn xác (Prec), và hệ số tương quan Matthew (MCC) (các công thức tính tương ứng như sau). Ngoài ra, các đường cong Receiver Operating Characteristics (ROC) và các giá trị AUC cũng được tính đến.

trong đó, TP (true positive) là tỷ lệ các mẫu dương được phân loại đúng, FP (false positive) là tỷ lệ các mẫu được phân loại đúng là thuộc một lớp cụ thể khi thực tế chúng không thuộc lớp đó, TN (true negative) là tỷ lệ các mẫu âm được phân loại đúng và FN (false negative) đại diện cho số mẫu được phân loại là không thuộc một lớp cụ thể khi thực tế chúng thuộc lớp đó.

## 3. Kết quả

## 3.1. Kết quả Thống kê

Chúng tôi đã thu thập tổng cộng 380 mẫu trong khảo sát này; sau khi loại bỏ 12 trường hợp bị thiếu và rõ ràng không nhất quán, còn lại 368 mẫu để phân tích. Table 5 đếm thông tin chi tiết của bảng câu hỏi, bao gồm thông tin cá nhân của điều tra viên, thói quen ăn uống, tình trạng tập thể dục, và tiền sử bệnh trong gia đình, và tóm tắt số lượng và tỷ lệ người được hỏi tại mỗi điểm.

Table 5. Thống kê chi tiết của thông tin bảng câu hỏi.

| Loại Thông tin        | Loại Thông tin        | Phân loại                                                    | Số Người (Cá nhân)              | Tỷ lệ (%)        |
|-----------------------|-----------------------|--------------------------------------------------------------|---------------------------------|------------------|
|                       | Education Level       | High Educational Background High School Degree or Even Lower | 237 131                         | 64.40 35.60      |
|                       |                       | Married                                                      | 304                             | 82.61            |
|                       | Marriage              | Unmarried                                                    | 64                              | 17.39            |
|                       |                       | Three Times a Day or Even More                               | 324                             | 88.04            |
|                       | Rice                  | Twice a Day                                                  | 20                              | 5.43             |
|                       |                       | Once a Day or Even Not                                       | 24                              | 6.52             |
|                       |                       | Three Times a Day or Even More                               | 312                             | 84.78            |
|                       | Buns                  | Twice a Day                                                  | 32                              | 8.70             |
|                       |                       |                                                              | 24                              | 6.52             |
|                       |                       | Once a Day or Even Not                                       |                                 |                  |
|                       | Noodles               | Three Times a Day or Even More                               | 38                              | 10.33            |
|                       |                       | Twice a Day                                                  | 67                              | 18.21            |
|                       |                       | Once a Day or Even Not                                       | 263                             | 71.47            |
|                       |                       | Three Times a Day or Even More                               | 156                             | 42.39            |
|                       | Pork                  | Twice a Day                                                  | 127                             | 34.51            |
|                       |                       | Once a Day or Even Not                                       | 85                              | 23.10            |
|                       | Beef                  | Three Times a Day or Even More                               | 120                             | 32.61            |
|                       |                       | Twice a Day                                                  | 93                              | 25.27            |
|                       |                       | Once a Day or Even Not                                       | 155                             | 42.12            |
|                       |                       | Three Times a Day or Even More                               | 145                             | 39.40            |
|                       | Fish                  | Twice a Day Once a Day or Even Not                           | 129 94                          | 35.05 25.54      |
|                       |                       | Three Times a Day or Even More                               | 31                              | 8.42             |
|                       | Seafood               |                                                              | 54                              | 14.67            |
|                       |                       | Twice a Day Once a Day or Even Not                           | 283                             | 76.90            |
|                       |                       | Three Times a Day or Even More                               | 62                              | 16.85            |
|                       | Dairy Products        | Twice a Day                                                  | 88                              | 23.91            |
|                       |                       | Once a Day or Even Not                                       | 218                             | 59.24            |
|                       |                       | Three Times a Day or Even More                               | 89                              | 24.18            |
|                       | Fruits                | Twice a Day                                                  | 172                             | 46.74            |
|                       |                       | Once a Day or Even Not                                       | 107                             | 29.08            |
|                       |                       | Three Times a Day or Even More                               | 217                             | 58.97            |
|                       | Vegetables            | Twice a Day                                                  | 102                             | 27.72            |
|                       |                       | Once a Day or Even Not                                       | 49                              | 13.32            |
|                       |                       | Twice a Day or Even More                                     | 102                             | 27.72            |
|                       | Leisure Sports        | Once a Day                                                   | 132                             | 35.87            |
|                       |                       |                                                              | 134                             | 36.41            |
|                       | Vigorous Sports       | 4 To 6 Times a Week or Even Less                             | 22                              | 5.98             |
|                       |                       | Twice a Day or Even More                                     |                                 | 11.68            |
|                       |                       | Once a Day                                                   | 43                              |                  |
|                       |                       | 4 To 6 Times a Week or Even Less                             | 303                             | 82.34            |
|                       | Medical History       | Have                                                         | 101                             | 27.45            |
|                       |                       | Don't Have                                                   | 267                             | 72.55            |

## 3.2. Phân bố Tập Huấn luyện và Tập Kiểm tra

Trong bài báo này, phương pháp kiểm định chéo 10-fold đã được sử dụng, tức là tập dữ liệu được chia thành 10 phần, trong đó 9 phần lần lượt được lấy làm tập huấn luyện, 1 phần làm tập kiểm tra, và giá trị trung bình của 10 kết quả được sử dụng làm giá trị đánh giá hiệu suất thuật toán. Đồng thời, thí nghiệm lặp lại quá trình trên 10 lần và 10 giá trị đánh giá đã thu được cho mỗi mô hình, và các giá trị trung bình của chúng cùng khoảng tin cậy 95% tương ứng đã được đếm. Ngoài ra, toàn bộ tập dữ liệu có 108 mẫu dương thực nghiệm và 260 mẫu âm. Các mẫu dương và âm được chia theo tỷ lệ thành tập huấn luyện và tập kiểm tra trong quá trình kiểm định chéo.

## 3.3. So sánh Các Mô hình

## 3.3.1. Kết quả Mô hình XGBoost

Sau khi điều chỉnh tham số, mô hình XGBoost đạt được hiệu suất tương đối xuất sắc thông qua kiểm định chéo 10-fold, với độ chính xác huấn luyện là 0.9492. Sau đó, chúng tôi đã đánh giá kết quả của 10 lần kiểm định chéo, và kiểm tra cho thấy mô hình có hiệu quả dự đoán tốt đối với bệnh đái tháo đường của 37 bệnh nhân tiềm năng ngẫu nhiên (tập kiểm tra được phân bổ ngẫu nhiên trong quá trình kiểm định chéo). Độ chính xác dự đoán trung bình là 0.8909, độ nhạy là 0.9388, độ đặc hiệu là 0.7571, độ chuẩn xác là 0.7944, hệ số tương quan Matthew là 0.6589 và giá trị AUC là 0.9182.

## 3.3.2. So sánh với Cơ sở

Thí nghiệm cũng đã so sánh mô hình được đề xuất với các mô hình cơ sở (SVM, RF, K-NN). Các tham số được điều chỉnh tốt và giá trị trung bình của 10 kết quả kiểm tra được sử dụng làm giá trị đánh giá mô hình cuối cùng, như được thể hiện trong Table 6. Không khó để nhận thấy rằng các thuật toán học máy truyền thống không tốt bằng các thuật toán XGBoost về độ chính xác dự đoán hoặc giá trị AUC. Trong số các thuật toán truyền thống, SVM có độ chính xác cao nhất (0.8158), độ đặc hiệu cao nhất (0.6364), độ chuẩn xác cao nhất (0.8111) và hệ số tương quan Matthew cao nhất (0.5410) trong khi K-NN có độ nhạy cao nhất (0.9630). Ngoài ra, SVM (0.8550) có giá trị AUC cao nhất trong số các thuật toán học máy truyền thống, nhưng nó thấp hơn giá trị AUC của XGBoost (0.9182). Các đường cong ROC của mỗi mô hình được thể hiện trong Figure 2. Healthcare 2020 , 8 , x

11 of 14

Figure 2. Các đường cong Receiver Operating Characteristics (ROC) cho mỗi mô hình. ( A ) là đường cong ROC của mô hình XGBoost; ( B ) là đường cong ROC của mô hình SVM; ( C ) là đường cong ROC của mô hình RF; ( D ) là đường cong ROC của mô hình K-NN. Figure 2. Các đường cong Receiver Operating Characteristics (ROC) cho mỗi mô hình. ( A ) là đường cong ROC của mô hình XGBoost; ( B ) là đường cong ROC của mô hình SVM; ( C ) là đường cong ROC của mô hình RF; ( D ) là đường cong ROC của mô hình K-NN.

3.4. Dự đoán Nguy cơ Đái tháo đường

Xét đến độ chính xác của XGBoost trong việc dự đoán nguy cơ đái tháo đường type 2, chúng tôi đã đếm các

giá trị xác suất dự đoán của tập kiểm tra trong quá trình kiểm định chéo sau khi mô hình được

Table 6. So sánh hiệu quả cho mỗi mô hình.

| Mô hình Học máy          | Các Chỉ số Đánh giá     | Các Chỉ số Đánh giá     | Các Chỉ số Đánh giá     | Các Chỉ số Đánh giá     | Các Chỉ số Đánh giá     | Các Chỉ số Đánh giá     |
|--------------------------|-------------------------|-------------------------|-------------------------|-------------------------|-------------------------|-------------------------|
| Mô hình Học máy          | Acc                     | Sens                    | Spec                    | Prec                    | MCC                     | AUC                     |
| XGBoost                  | 0.8909 0.0177           | 0.9388 0.0251           | 0.7571 0.0405           | 0.7944 0.0296           | 0.6589 0.0537           | 0.9182 0.0130           |
| SVM                      | 0.8158 0.0112           | 0.8889 0.0255           | 0.6364 0.0239           | 0.8571 0.0227           | 0.5410 0.0650           | 0.8550 0.0479           |
| RF                       | 0.7895 0.0308           | 0.9259 0.0219           | 0.4545 0.0328           | 0.8065 0.0365           | 0.4451 0.0921           | 0.7167 0.0356           |
| K-NN                     | 0.7368 0.0225           | 0.9630 0.0199           | 0.1818 0.0240           | 0.7429 0.0294           | 0.2548 0.0554           | 0.6397 0.0295           |

Ghi chú: các giá trị đại diện cho giá trị trung bình và khoảng tin cậy 95% của chúng.

## 3.4. Dự đoán Nguy cơ Đái tháo đường

Xét đến độ chính xác của XGBoost trong việc dự đoán nguy cơ đái tháo đường type 2, chúng tôi đã đếm các giá trị xác suất dự đoán của tập kiểm tra trong quá trình kiểm định chéo sau khi mô hình được huấn luyện. Tức là, việc sử dụng mô hình học tập hợp có thể xác định xác suất của các mẫu dương và âm của dữ liệu chưa biết. Nó cũng có thể cung cấp tự quản lý và cảnh báo sớm tiện lợi, thông minh cho đông đảo các nhóm người trung niên và cao tuổi trong tương lai, điều này có lợi cho việc ngăn ngừa sự xuất hiện của đái tháo đường giảm tỷ lệ mắc đái tháo đường.

## 4. Thảo luận

Các nghiên cứu trước đây đã chỉ ra rằng các mô hình hồi quy logistic thường được áp dụng trong đánh giá nguy cơ đái tháo đường đơn yếu tố hoặc đa yếu tố, chẳng hạn như Abdullah và cộng sự [13] đã sử dụng các yếu tố nguy cơ môi trường và di truyền để dự đoán nguy cơ đái tháo đường type 2 ở Malaysia với một mô hình hồi quy logistic đa biến được khớp và kết quả là, giá trị AUC là 0.75-0.83. Tuy nhiên, mô hình hồi quy logistic không thể vừa thực hiện nghiên cứu đặc trưng của dữ liệu mẫu vừa thu được kết quả dự đoán của các mẫu chưa biết, điều này có nghĩa là nó có những hạn chế lớn. Với sự phát triển của trí tuệ nhân tạo, nhiều mô hình học máy đã được sử dụng trong nghiên cứu dự đoán nguy cơ đái tháo đường sớm. Phổ biến nhất là mô hình giám sát SVM. Nó chọn không gian đặc trưng để xây dựng siêu phẳng tối ưu trên cơ sở tóm tắt lý thuyết tối thiểu hóa rủi ro cấu trúc, cho phép bộ phân loại đạt được tối ưu hóa toàn cục, và đáp ứng một cận trên nhất định với một giá trị xác suất nhất định trong kỳ vọng không gian mẫu. Các nghiên cứu trước đây đã chỉ ra rằng SVM có khả năng tổng quát hóa mạnh và hoạt động xuất sắc trong nhiều vấn đề dự báo [14-16]. SVM cũng được sử dụng rộng rãi trong lĩnh vực dự đoán đái tháo đường, ví dụ, Xiong và cộng sự [17] đã sử dụng các thuật toán học máy để xây dựng một mô hình dự đoán đái tháo đường type 2, nhận thấy kết quả thực sự đáng hài lòng. Trong nghiên cứu của chúng tôi, SVM hoạt động tốt nhất trong các thuật toán học máy truyền thống, với độ nhạy 0.8889 và giá trị AUC 0.8550. RF là một thuật toán học tích hợp Bagging kinh điển, có thể xử lý dữ liệu chiều cao hơn đồng thời giảm tác động của dữ liệu mất cân bằng cùng một lúc, nhưng đôi khi nó dễ bị overfitting khi đề cập đến các vấn đề phân loại của nhiễu quá lớn. Đồng thời, RF được sử dụng rộng rãi trong lĩnh vực dự đoán nguy cơ đái tháo đường [18,19]. Trong thí nghiệm của chúng tôi, RF không hoạt động tốt như SVM sau khi tích hợp; lý do có thể nằm ở hiệu quả phân loại kém khi xử lý lượng dữ liệu nhỏ hoặc dữ liệu chiều thấp. K-NN là một thuật toán thường dùng khác trong nghiên cứu dự đoán đái tháo đường với thuật toán đơn giản, quá trình huấn luyện không phức tạp và khả năng diễn giải yếu, nhưng nó có độ chính xác dự đoán thấp cho các loại hiếm khi mẫu mất cân bằng. Tập dữ liệu đái tháo đường type 2 trong nghiên cứu của chúng tôi mất cân bằng và số lượng mẫu dương tương đối nhỏ, vì vậy độ nhạy của thí nghiệm cao (0.9630) trong khi độ đặc hiệu cực kỳ thấp (0.1818). Do đó, mẫu không thể được dự đoán tốt.

Trong bài báo này, một thuật toán học tập hợp mới mẻ đã được sử dụng để dự đoán nguy cơ đái tháo đường type 2, và đây là một ví dụ thành công về ứng dụng của XGBoost trong nghiên cứu đánh giá nguy cơ bệnh mãn tính. Chúng tôi tin rằng điều này có thể không tách rời khỏi tính ưu việt của chính thuật toán. XGBoost là một thuật toán học tập hợp, thuộc loại thuật toán boosting trong ba phương pháp tập hợp thường dùng (bagging, boosting, stacking). Nó là một mô hình cộng, và bộ học cơ sở của nó có thể là mô hình CART hoặc bộ phân loại tuyến tính [20]. Cụ thể, XGBoost được cải tiến bởi thuật toán GBDT

. Ý tưởng cơ bản của nó là khớp độ lệch của mô hình trước đó thông qua mô hình cơ sở mới, từ đó liên tục giảm độ lệch của mô hình cộng. Trong thí nghiệm này, nó có những lợi thế sau. Trước hết, XGBoost thêm các số hạng điều chuẩn vào hàm mục tiêu, điều này tránh việc overfitting mô hình do kích thước mẫu không đủ ở bệnh nhân đái tháo đường. Thứ hai, thuật toán tính đến thực tế rằng dữ liệu huấn luyện là thưa thớt. Bạn có thể chỉ định hướng mặc định của nhánh cho các giá trị bị thiếu hoặc các giá trị được chỉ định, điều này có thể cải thiện đáng kể hiệu quả của thuật toán. Lợi thế này làm giảm độ khó của huấn luyện. Hơn nữa, nó cũng vay mượn từ thực tiễn của random forests-nó hỗ trợ lấy mẫu cột, điều này không chỉ có thể giảm overfitting, mà còn giảm tính toán. So với sự đơn giản và đơn nhất của kiến trúc thuật toán truyền thống, XGBoost có lợi thế về nguyên lý, điều này khiến nó nổi bật trong việc dự đoán nguy cơ đái tháo đường type 2.

Mặc dù mô hình XGBoost hoạt động tốt hơn thuật toán truyền thống trong bài báo này, không thể phủ nhận rằng nó áp dụng nguyên lý sắp xếp trước (pre-sorting). Trước khi lặp, mô hình sắp xếp trước các đặc điểm của các nút và duyệt để chọn điểm chia tách tối ưu. Điều này dẫn đến việc phát hiện rằng thuật toán tham lam tối ưu mất nhiều thời gian và độ khó huấn luyện tăng lên khi lượng dữ liệu lớn. Do đó, thuật toán XGBoost phù hợp hơn với việc huấn luyện mẫu nhỏ tương tự như nhiệm vụ này.

Nghiên cứu của chúng tôi cũng có một số khiếm khuyết nhất định, đáng được cải thiện trong tương lai. Thứ nhất, kích thước mẫu thí nghiệm nên được mở rộng thêm để có thể rút ra các kết luận đáng tin cậy hơn. Thứ hai, thông tin bệnh nhân được đưa vào mô hình cần được cải thiện thêm, vì chỉ có thông tin toàn diện mới có thể dự đoán đái tháo đường type 2 chính xác hơn. Thứ ba, vì học máy có đặc tính 'hộp đen' (black box), chúng tôi không thể giải thích cách nó hoạt động vào lúc này. Sẽ cần những nỗ lực trong tương lai theo hướng này. Ngoài ra, dữ liệu cắt ngang có những khiếm khuyết vốn có, và nghiên cứu tiến cứu hoặc hồi cứu quy mô lớn sẽ tiếp tục được thực hiện trong tương lai.

## 5. Kết luận

Nghiên cứu nhằm giải quyết vấn đề rằng độ chính xác dự đoán và hiệu suất tổng quát hóa của các mô hình không được hài lòng trong lĩnh vực dự đoán nguy cơ mắc đái tháo đường. Nghiên cứu của chúng tôi đã sử dụng mô hình XGBoost, một trong các thuật toán học tập hợp, để thực hiện đánh giá nguy cơ bệnh đái tháo đường type 2 cho các bệnh nhân tiềm năng, và sau đó so sánh nó với các thuật toán chủ đạo hiện nay (SVM, RF và K-NN). Tỷ lệ mắc của các mẫu ngẫu nhiên được dự đoán dựa trên thông tin cá nhân, thói quen ăn uống, điều kiện tập thể dục và tiền sử gia đình mắc đái tháo đường của những người trung niên và cao tuổi được khảo sát, và sau đó tính chỉ số mắc đái tháo đường. Kết quả cho thấy XGBoost có khả năng tổng quát hóa và độ chính xác dự đoán mạnh nhất, có thể ước tính tốt hơn nguy cơ của các bệnh nhân tiềm năng và cung cấp những ý tưởng mới cho việc phòng ngừa thông minh các bệnh mãn tính trong tương lai.

Đóng góp của Tác giả: Khái niệm hóa, L.W. và H.C.; phương pháp luận, L.W.; phần mềm, L.W.; xác thực, A.C. và X.W.; phân tích chính thức, X.J.; quản lý dữ liệu, X.W.; viết-chuẩn bị bản thảo gốc, L.W., H.C. và A.C.; viết-rà soát và biên tập, A.C.; trực quan hóa, X.W. và X.J.; quản trị dự án, H.C.; huy động kinh phí, H.C. Tất cả các tác giả đã đọc và đồng ý với phiên bản đã xuất bản của bản thảo.

Tài trợ: Công trình này được tài trợ bởi National Natural Science Foundation of China (81773435).

Xung đột Lợi ích: Các tác giả tuyên bố không có xung đột lợi ích.

## Tài liệu tham khảo

1. Ahola, A.J.; Groop, P.-H. Barriers to self-management of diabetes. Diabet. Med. 2013 , 30 , 413-420. [CrossRef] [PubMed]
2. Wang, Q.; Zhang, X.; Fang, L.; Guan, Q.; Guan, L.; Li, Q. Prevalence, awareness, treatment and control of diabetes mellitus among middle-aged and elderly people in a rural Chinese population: A cross-sectional study. PLoS ONE 2018 , 13 , e0198343. [CrossRef] [PubMed]

3. Jen, C.-H.; Wang, C.-C.; Jiang, B.C.; Chu, Y.-H.; Chen, M.-S. Application of classification techniques on development an early-warning system for chronic illnesses. Expert Syst. Appl. 2012 , 39 , 8852-8858. [CrossRef]
4. Farwell, W.R.; Gaziano, J.M.; Norkus, E.P.; Sesso, H.D. The Relationship between Total Plasma Carotenoids and Risk Factors for Chronic Disease among Middle-Aged and Older Men. Br. J. Nutr. 2008 , 100 , 883-889. [CrossRef] [PubMed]
5. Finkelstein, J.; Jeong, I.C. Machine learning approaches to personalize early prediction of asthma exacerbations. Ann. N. Y. Acad. Sci. 2017 , 1387 , 153-165. [CrossRef] [PubMed]
6. Park, J.; Edington, D.W. A sequential neural network model for diabetes prediction. Artif. Intell. Med. 2001 , 23 , 277-293. [CrossRef]
7. Zhu, C.-S.; Idemudia, C.U.; Feng, W. Improved logistic regression model for diabetes prediction by integrating PCA and K-means techniques. Inform. Med. Unlocked 2019 , 17 . [CrossRef]
8. Sudharsan, B.; Peeples, M.; Shomali, M. Hypoglycemia Prediction Using Machine Learning Models for Patients with Type 2 Diabetes. J. Diabetes Sci. Technol. 2014 , 9 , 86-90. [CrossRef] [PubMed]
9. Zhang, D.; Qian, L.; Mao, B.; Huang, C.; Huang, B.; Si, Y. A Data-Driven Design for Fault Detection of Wind Turbines Using Random Forests and XGBoost. IEEE Access 2018 , 6 , 21020-21031. [CrossRef]
10. Li, C.; Zheng, X.; Yang, Z.; Kuang, L. Predicting Short-Term Electricity Demand by Combining the Advantages of ARMA and XGBoost in Fog Computing Environment. Wirel. Commun. Mob. Comput. 2018 , 2018 , 5018053. [CrossRef]
11. Dhaliwal, S.; Nahid, A.A.; Abbas, R. E ective Intrusion Detection System Using XGBoost. Information 2018 , 9 , 149. [CrossRef]
12. Dong, H.; Xu, X.; Wang, L.; Pu, F. Gaofen-3 PolSAR Image Classification via XGBoost and Polarimetric Spatial Information. Sensors 2018 , 18 , 611. [CrossRef] [PubMed]
13. Abdullah, N.; Murad, N.A.; Hanif, E.A.M.; Syafruddin, S.E.; Attia, J.; Oldmeadow, C.; Kamaruddin, M.; Jalal, N.A.; Ismail, N.; Ishak, M.; et al. Predicting type 2 diabetes using genetic and environmental risk factors in a multi-ethnic Malaysian cohort. Public Health 2017 , 149 , 31-38. [CrossRef] [PubMed]
14. Murugan, A.; Nair, S.A.H.; Kumar, K.P.S. Detection of Skin Cancer Using SVM, Random Forest and kNN Classifiers. J. Med. Syst. 2019 , 43 , 269. [CrossRef] [PubMed]
15. Ang, J.C.; Haron, H.; Hamed, H.N.A. Semi-supervised SVM-based Feature Selection for Cancer Classification using Microarray Gene Expression Data. In Current Approaches in Applied Artificial Intelligence ; Springer: Cham, Switzerland, 2005; Volume 9101, pp. 468-477.
16. Zhao, C.; Zhang, H.; Zhang, X.; Liu, M.; Hu, Z.; Fan, B. Application of Support Vector Machine (SVM) for Prediction Toxic Activity of Di erent Data Sets. Toxicology 2006 , 217 , 105-119. [CrossRef] [PubMed]
17. Xiong, X.-L.; Zhang, R.-X.; Bi, Y.; Zhou, W.-H.; Yu, Y.; Zhu, D. Machine Learning Models in Type 2 Diabetes Risk Prediction: Results from a Cross-sectional Retrospective Study in Chinese Adults. Curr. Med Sci. 2019 , 39 , 582-588. [CrossRef] [PubMed]
18. L ó pez, B.; Torrent-Fontbona, F.; Viñas, R.; Fernandez-Real, J.-M. Single Nucleotide Polymorphism relevance learning with Random Forests for Type 2 diabetes risk prediction. Artif. Intell. Med. 2018 , 85 , 43-49. [CrossRef] [PubMed]
19. Nai-Arun, N.; Moungmai, R. Comparison of Classifiers for the Risk of Diabetes Prediction. Procedia Comput. Sci. 2015 , 69 , 132-142. [CrossRef]
20. Zhong, J.; Sun, Y.; Peng, W.; Xie, M.; Yang, J.; Tang, X. XGBFEMF: An XGBoost-based Framework for Essential Protein Prediction. IEEE Trans. NanoBiosci. 2018 , 17 , 243-250. [CrossRef] [PubMed]

' 2020 bởi các tác giả. Người được cấp phép MDPI, Basel, Switzerland. Bài báo này là một bài báo truy cập mở được phân phối theo các điều khoản và điều kiện của giấy phép Creative Commons Attribution (CC BY) (http: // creativecommons.org / licenses / by / 4.0 / ).
