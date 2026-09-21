<!-- extracted by pdf-extract | engine=docling | pages=10 | ocr=True | tables=10/0 | density=1.00 | score=100 -->

LETTER

## Dự đoán đái tháo đường bằng học máy và các kỹ thuật AI giải thích được (explainable AI)

IsfafuzzamanTasin

1|Tansin Ullah Nabil丨Sanjida Islam

Riasat Khan

Electrical and Computer Engineering, North South University, Dhaka, Bangladesh

## Liên hệ

Riasat Khan, Electrical and Computer Engineering, North South University, Dhaka-1229, Bangladesh. Email: riasat.khan@northsouth.edu

## 1|GIỚI THIỆU

Đái tháo đường là một bệnh mạn tính ảnh hưởng trực tiếp đến tuyến tụy, và cơ thể không có khả năng sản xuất insulin [22]. Insulin chủ yếu chịu trách nhiệm duy trì mức đường huyết. Nhiều yếu tố, chẳng hạn như thừa cân nặng, ít vận động thể chất, huyết áp cao và mức cholesterol bất thường, có thể khiến một người bị đái tháo đường [23]. Bệnh có thể gây ra nhiều biến chứng, nhưng tăng đi tiểu là một trong những

## Tóm tắt

Trên toàn cầu, đái tháo đường ảnh hưởng đến 537 million người, khiến nó trở thành bệnh không lây nhiễm gây tử vong nhiều nhất và phổ biến nhất. Nhiều yếu tố có thể khiến một người bị đái tháo đường, như thừa cân nặng, mức cholesterol bất thường, tiền sử gia đình, ít vận động thể chất, thói quen ăn uống không tốt, v.v. Tăng đi tiểu là một trong những triệu chứng phổ biến nhất của bệnh này. Người mắc đái tháo đường lâu dài có thể gặp nhiều biến chứng như rối loạn tim, bệnh thận, tổn thương thần kinh, bệnh võng mạc đái tháo đường, v.v. Nhưng nguy cơ của nó có thể được giảm bớt nếu được dự đoán sớm. Trong bài báo này, một hệ thống dự đoán đái tháo đường tự động đã được phát triển bằng cách sử dụng một bộ dữ liệu riêng của các bệnh nhân nữ ở Bangladesh và nhiều kỹ thuật học máy khác nhau. Các tác giả đã sử dụng bộ dữ liệu Pima Indian diabetes và thu thập thêm các mẫu từ 203 cá nhân từ một nhà máy dệt may địa phương ở Bangladesh. Thuật toán chọn lọc đặc trưng mutual information đã được áp dụng trong công trình này. Một mô hình bán giám sát (semi-supervised) với extreme gradient boosting đã được sử dụng để dự đoán đặc trưng insulin của bộ dữ liệu riêng. Các phương pháp SMOTE và ADASYN đã được sử dụng để xử lý vấn đề mất cân bằng lớp. Các tác giả đã sử dụng các phương pháp phân loại học máy, tức là decision tree, SVM, Random Forest, Logistic Regression, KNN và nhiều kỹ thuật ensemble khác nhau, để xác định thuật toán nào tạo ra kết quả dự đoán tốt nhất. Sau khi huấn luyện và kiểm thử tất cả các mô hình phân loại, hệ thống đề xuất cho kết quả tốt nhất với bộ phân loại XGBoost cùng phương pháp ADASYN với 81% accuracy, hệ số F1 0.81 và AUC 0.84. Hơn nữa, phương pháp domain adaptation đã được triển khai để chứng minh tính linh hoạt của hệ thống đề xuất. Phương pháp explainable AI với các framework LIME và SHAP được triển khai để hiểu cách mô hình dự đoán ra kết quả cuối cùng. Cuối cùng, một khung website và một ứng dụng điện thoại thông minh Android đã được phát triển để nhập các đặc trưng khác nhau và dự đoán đái tháo đường ngay lập tức. Bộ dữ liệu riêng của các bệnh nhân nữ Bangladesh và mã lập trình có sẵn tại đường dẫn sau: https://github.com/tansin-nabil/Diabetes-PredictionUsing-Machine-Learning.

triệu chứng phổ biến nhất [24]. Nó có thể làm tổn thương da, thần kinh và mắt, và nếu không được điều trị sớm, đái tháo đường có thể gây suy thận và bệnh võng mạc đái tháo đường ở mắt. Theo thống kê của IDF (International Diabetes Federation), 537 million người đã mắc đái tháo đường trên toàn thế giới vào năm 2021 [1]. Tại Bangladesh, khoảng 7.10 million người đã chịu ảnh hưởng của bệnh này, theo thống kê năm 2019 [2].

Chẩn đoán đái tháo đường sớm và chính xác, đặc biệt trong giai đoạn phát triển ban đầu, là một thách thức đối với các chuyên gia y tế. Các kỹ thuật trí tuệ nhân tạo và học máy, khi cung cấp một tham chiếu, có thể giúp họ có được kiến thức sơ bộ về bệnh này và giảm khối lượng công việc tương ứng. Một số lượng đáng kể các nghiên cứu đã được thực hiện để dự đoán đái tháo đường một cách tự động bằng các kỹ thuật học máy và ensemble. Hầu hết các công trình này sử dụng bộ dữ liệu mã nguồn mở Pima Indian [6]. Một số bài báo về dự đoán đái tháo đường tự động sử dụng bộ dữ liệu Pima Indian được thảo luận ngắn gọn trong các đoạn sau. Ví dụ, Kumar và cộng sự [4] đã sử dụng thuật toán random forest để thiết kế một hệ thống có thể dự đoán đái tháo đường nhanh chóng và chính xác. Bộ dữ liệu sử dụng trong công trình này được thu thập từ kho lưu trữ học máy UCI. Đầu tiên, các tác giả đã sử dụng các kỹ thuật tiền xử lý dữ liệu thông thường, bao gồm làm sạch, tích hợp và rút gọn dữ liệu. Mức độ chính xác đạt 90% khi sử dụng thuật toán random forest, cao hơn nhiều khi so sánh với các thuật toán khác. Trong một bài báo gần đây [5], Mohan và Jain đã sử dụng thuật toán SVM để phân tích và dự đoán đái tháo đường với sự trợ giúp của Pima Indian Diabetes Dataset. Công trình này đã sử dụng bốn loại kernel: linear, polynomial, RBF và sigmoid, để dự đoán đái tháo đường trên nền tảng học máy. Các tác giả thu được nhiều độ chính xác khác nhau ở các kernel khác nhau, dao động trong khoảng 0.69 và 0.82. Kỹ thuật SVM với hàm radial basis kernel đạt độ chính xác cao nhất là 0.82. Goyal và nhóm của ông [9] đã tạo ra một sơ đồ giám sát sức khỏe tại nhà thông minh để phát hiện đái tháo đường. Các tác giả cũng sử dụng bộ dữ liệu Pima Indian cho nghiên cứu của mình. Để dự đoán tình trạng huyết áp, họ sử dụng ra quyết định theo điều kiện (conditional decision making) và để dự đoán đái tháo đường, họ sử dụng SVM, KNN và decision tree. Trong số các mô hình này, SVM hoạt động tốt hơn khi họ đạt 75% accuracy, tốt hơn các thuật toán phân loại khác. Hassan và cộng sự [10] đã cố gắng dự đoán đái tháo đường bằng các thuật toán học máy dựa trên phương pháp ensemble khác nhau và bộ dữ liệu Pima Indian. Các tác giả xem AUC (area under the ROC curve) là thước đo độ chính xác. Cuối cùng, bộ phân loại ensemble đề xuất đạt giá trị AUC 0.95. Jackins và cộng sự [17] đã đề xuất một hệ thống dự đoán đa bệnh, bao gồm đái tháo đường, bằng các kỹ thuật học máy và bộ dữ liệu Pima Indian. Theo các tác giả, Naive Bayes hoạt động tốt hơn kỹ thuật random forest với mức tăng độ chính xác 0.43%. Mounika và cộng sự [19] đã dự đoán xác suất đái tháo đường bằng các kỹ thuật học máy. Công trình này sử dụng bộ dữ liệu công khai Pima Indian và nhiều framework học máy. Kumari và cộng sự [21] đã cố gắng áp dụng một phương pháp ensemble dựa trên bộ phân loại soft voting để dự đoán đái tháo đường. Bộ phân loại soft voting đề xuất đạt accuracy và F1 score tổng thể cao nhất lần lượt là 0.791 và 0.716. Prabhu và Selvabharathi [3] đã sử dụng bộ dữ liệu mã nguồn mở Pima Indian diabetes để dự đoán đái tháo đường bằng mô hình deep belief network. Các tác giả xây dựng mô hình theo ba giai đoạn, tức là tiền xử lý dữ liệu bằng chuẩn hóa min-max, xây dựng mô hình mạng, và tinh chỉnh bộ dữ liệu kiểm thử để loại bỏ bất kỳ thiên lệch nào bằng phân loại NN-FF. Cuối cùng, các tác giả đã thực hiện toàn bộ việc triển khai và mô phỏng mô hình bằng MATLAB. Các tác giả báo cáo F1 score 0.808, đây là chỉ số hiệu năng tốt nhất so với các phương pháp phân loại khác.

Đây là một bài báo truy cập mở theo các điều khoản của Creative Commons Attribution License, cho phép sử dụng, phân phối và sao chép trên bất kỳ phương tiện nào, miễn là công trình gốc được trích dẫn đúng cách.

2022 The Authors. Healthcare Technology Letters published by John Wiley &amp; Sons Ltd on behalf of The Institution of Engineering and Technology.

Một số công trình này sử dụng các bộ dữ liệu tùy chỉnh hoặc kết hợp các bộ dữ liệu khác nhau. Trong [14], các tác giả đề xuất một hệ thống dự đoán sớm đái tháo đường type 2 bằng các phương pháp học máy. Các tác giả sử dụng một bộ dữ liệu riêng với hơn 253,000 dữ liệu tình nguyện viên từ một bệnh viện địa phương ở Hàn Quốc trong 6 năm. Các thuật toán oversampling tổng hợp, SMOTE và undersampling được áp dụng để xử lý vấn đề mất cân bằng dữ liệu. Nhiều phương pháp học máy khác nhau được sử dụng để dự đoán bệnh này cho năm tiếp theo từ dữ liệu của bệnh nhân năm trước. Cả bộ phân loại random forest và SVM đều đạt F1 score cao nhất là 74%. Pranto và cộng sự [12] đã sử dụng Pima Indian và một bộ dữ liệu riêng từ một bệnh viện địa phương ở Bangladesh để thiết kế một hệ thống dự đoán đái tháo đường tự động. Công trình này đã huấn luyện một số kỹ thuật học máy trên bộ dữ liệu Pima Indian. Các mô hình KNN và decision tree đạt độ chính xác 81.2% và 79.2% trên bộ dữ liệu riêng tương ứng. Olisah và cộng sự [15] đã triển khai dự báo đái tháo đường bằng cách sử dụng chọn lọc đặc trưng nâng cao và các mô hình học máy. Các tác giả sử dụng hai bộ dữ liệu mã nguồn mở, tức là cơ sở dữ liệu Pima Indian và LMCH Iraqi. Một kỹ thuật tiền xử lý dựa trên hồi quy đa thức (polynomial regression) được sử dụng để dự đoán các mẫu bị thiếu. Việc tinh chỉnh siêu tham số (hyperparameter tuning) đã được thực hiện cho các framework random forest, decision tree và deep neural network. Kỹ thuật DNN đề xuất với các siêu tham số được tối ưu hóa đạt độ chính xác cao nhất là 0.972 và 0.973 cho các bộ dữ liệu Pima và LMCH tương ứng.

Các mô hình học máy được áp dụng đã được triển khai vào một website hoặc ứng dụng điện thoại thông minh trong một số bài báo. Trong một nghiên cứu, các tác giả [16] đã thiết kế một website cho việc dự đoán đái tháo đường tự động. Công trình này sử dụng hai bộ dữ liệu mã nguồn mở và nhiều phương pháp học máy phổ biến. Các bộ phân loại decision tree và random forest đạt hiệu năng cao nhất cho công trình này với độ chính xác 0.968. Ramesh và cộng sự [18] đã thiết kế một hệ thống từ xa và tự động để dự báo đái tháo đường với bộ dữ liệu Pima Indian. Các tác giả sử dụng các kỹ thuật tiền xử lý dữ liệu khác nhau, tức là feature scaling, chọn lọc đặc trưng và SMOTE. SVM với RBF kernel đạt độ chính xác tối đa 83.2%. Framework ML đề xuất được sử dụng trong một ứng dụng Android.

Chúng tôi rút ra kết luận rằng các nhà nghiên cứu đã kết hợp thành công nhiều thuật toán học máy với các phương pháp tiền xử lý dữ liệu đa dạng để phát hiện đái tháo đường tự động qua việc xem xét các bài báo liên quan. Hầu hết các công trình tập trung vào một thước đo độ chính xác duy nhất, sử dụng bộ dữ liệu mã nguồn mở Pima Indian, và không phát triển khả năng giải thích được của dự đoán của các framework học máy. Những lý do này đã thúc đẩy chúng tôi đánh giá hệ thống dự đoán đề xuất của mình dựa trên accuracy, precision, recall và F1 score, sử dụng thêm dữ liệu tùy chỉnh để hợp nhất với bộ dữ liệu hiện có, và áp dụng một kỹ thuật explainable AI.

Trong bài báo này, chúng tôi đã sử dụng các kỹ thuật học máy và explainable AI để phát hiện đái tháo đường. Cùng với một bộ dữ liệu riêng từ nhân viên của một ngành công nghiệp dệt may địa phương ở Bangladesh, chúng tôi đã sử dụng bộ dữ liệu Pima Indian trong bài báo này [6]. Vì có nhiều giá trị thiếu ở một số thuộc tính, chúng tôi đã thay thế chúng bằng giá trị trung bình của từng đặc trưng. Chúng tôi đã sử dụng kỹ thuật holdout validation để chia dữ liệu. Trong bài báo nghiên cứu này, chúng tôi đã áp dụng nhiều thuật toán phân loại dựa trên học máy, tức là decision tree, logistic regression, KNN, random forest, SVM và các kỹ thuật ensemble. Tiếp theo, hiệu năng của các bộ phân loại này đã được đánh giá theo precision, recall và thước đo F1. Cuối cùng, bộ phân loại tốt nhất đã được chọn làm mô hình cuối cùng để triển khai vào một ứng dụng điện thoại thông minh Android.

Bài báo này triển khai dự đoán đái tháo đường thông qua học máy. Đóng góp quan trọng của công trình này như sau:

- ·Một đóng góp quan trọng của công trình này là trình bày một bộ dữ liệu độc đáo về đái tháo đường chứa 203 mẫu. Bộ dữ liệu riêng này được thu thập từ các nhân viên nữ của Rownak Textile Mills Ltd, Dhaka, Bangladesh, được gọi là 'bộ dữ liệu RTML' trong bài báo này. Chúng tôi đã thu thập sáu đặc trưng từ 203 cá nhân, tức là pregnancy, glucose, blood pressure, skin thickness, BMI, age và kết quả cuối cùng của đái tháo đường.
- ·Một đóng góp khác của công trình này là giữ sự tương đồng với các đặc trưng của bộ dữ liệu Pima Indian. Đặc trưng insulin bị thiếu của bộ dữ liệu RTML được dự đoán bằng một kỹ thuật bán giám sát (semi-supervised).
- ·Các kỹ thuật SMOTE và ADASYN được triển khai để giảm thiểu vấn đề mất cân bằng lớp. Việc tinh chỉnh siêu tham số cũng đã được thực hiện trong công trình này.
- ·Kỹ thuật explainable AI với các thư viện SHAP và LIME được triển khai để hiểu cách mô hình dự đoán ra quyết định. Phương pháp này giúp diễn giải những đặc trưng nào đóng vai trò quan trọng nhất về mặt dự đoán.
- ·Một website và một ứng dụng Android đã được phát triển với mô hình hoạt động tốt nhất được hoàn thiện của công trình nghiên cứu này để đưa ra các dự đoán tức thời với dữ liệu thời gian thực.

Tính mới của công trình này là triển khai một website và ứng dụng Android dự đoán đái tháo đường tự động cho một bộ dữ liệu riêng của các bệnh nhân nữ Bangladesh bằng các kỹ thuật học máy và ensemble.

Đoạn sau đây là phần phân tích cấu trúc của bài báo. Hệ thống dự đoán đái tháo đường tự động đề xuất đã được thảo luận và minh họa trong Section 2 với các hình và lưu đồ phù hợp. Kết quả cuối cùng của nghiên cứu được trình bày trong Section 3. Cuối cùng, Section 4 kết luận bài báo với một số khuyến nghị cho những cải tiến trong tương lai.

## 2丨HỆ THỐNG ĐỀ XUẤT

Phần này mô tả các quy trình làm việc và việc triển khai các kỹ thuật học máy khác nhau để thiết kế hệ thống dự đoán đái tháo đường tự động đề xuất. Figure 1 cho thấy các giai đoạn khác nhau của công trình nghiên cứu này. Đầu tiên, bộ dữ liệu được thu thập và tiền xử lý để loại bỏ những sai lệch cần thiết khỏi bộ dữ liệu, ví dụ, thay thế các trường hợp null bằng giá trị trung bình, xử lý các vấn đề mất cân bằng lớp, v.v. Sau đó bộ dữ liệu được tách thành tập huấn luyện và tập kiểm thử bằng kỹ thuật holdout validation theo kết quả Yes. Tiếp theo, các thuật toán phân loại khác nhau được áp dụng để tìm thuật toán phân loại tốt nhất cho bộ dữ liệu này. Cuối cùng, mô hình dự đoán hoạt động tốt nhất được triển khai vào khung website và ứng dụng điện thoại thông minh đề xuất.

FIGURE 1 Các trình tự làm việc của hệ thống dự đoán đái tháo đường đề xuất

FIGURE 2 Tỷ lệ phần trăm người mắc đái tháo đường trong bộ dữ liệu Pima Indian

## 2.1|Bộ dữ liệu

Bộ dữ liệu Pima Indian là một bộ dữ liệu mã nguồn mở [] có sẵn công khai cho phân loại học máy, đã được sử dụng trong công trình này cùng với một bộ dữ liệu riêng. Nó chứa dữ liệu của 768 bệnh nhân, và 268 trong số đó đã phát triển đái tháo đường.

Figure 2 cho thấy tỷ lệ người mắc đái tháo đường trong bộ dữ liệu Pima Indian. Table 1 thể hiện tám đặc trưng của bộ dữ liệu mã nguồn mở Pima Indian.

Bộ dữ liệu riêng RTML: Một đóng góp quan trọng của công trình này là trình bày một bộ dữ liệu riêng từ Rownak Textile Mills Ltd, Dhaka, Bangladesh, được gọi là RTML, cho cộng đồng khoa học. Sau khi giải thích ngắn gọn về nghiên cứu cho các tình nguyện viên nữ, họ đã tự nguyện đồng ý tham gia nghiên cứu. Bộ dữ liệu này bao gồm sáu đặc trưng, tức là pregnancy, glucose, blood pressure, skin thickness, BMI, age và kết quả của đái tháo đường từ 203 cá nhân nữ trong độ tuổi từ 18 đến 77. Trong công trình này, đường huyết được đo bằng máy đo đường huyết GlucoLeader Enhance. Huyết áp và độ dày da của những người tham gia được lấy bằng máy OMRON HEM-7156T và máy đo lượng mỡ cơ thể (body fat caliper) kỹ thuật số LCD tương ứng. Table 2 minh họa các đặc trưng riêng biệt của bộ dữ liệu riêng RTML với các giá trị tối thiểu, tối đa và trung bình của chúng.

TABLE 1 Các đặc trưng của bộ dữ liệu Pima Indian

| Pregnancies    | Skin thickness   | Diabetespedigreefunction   |
|----------------|------------------|----------------------------|
| Glucose        | Insulin          | Age                        |
| Blood pressure | BMI              |                            |

TABLE 2 Các đặc trưng của bộ dữ liệu riêng RTML

| Features               |   Minimum |   Maximum |   Average |
|------------------------|-----------|-----------|-----------|
| Pregnancies            |         0 |         8 |      1.61 |
| Glucose (mg/dL)        |      52.2 |       274 |    109.39 |
| Blood pressure (mm Hg) |       5.9 |       115 |     71.09 |
| Skin thickness (mm)    |       2.9 |      23.3 |     10.78 |
| BMI (kg/m2)            |      2.61 |     41.62 |     22.69 |
| (a) )                  |        17 |        77 |     27.02 |

## 2.2 | Tiền xử lý bộ dữ liệu

Trong bộ dữ liệu đã hợp nhất, chúng tôi phát hiện một vài giá trị zero ngoại lệ. Ví dụ, skin thickness và Body Mass Index (BMI) không thể bằng zero. Giá trị zero đã được thay thế bằng giá trị trung bình tương ứng của nó. Bộ dữ liệu huấn luyện và kiểm thử đã được tách bằng kỹ thuật holdout validation, trong đó 80% là dữ liệu huấn luyện và 20% là dữ liệu kiểm thử.

Mutual Information: Mutual information cố gắng đo lường sự phụ thuộc lẫn nhau của các biến. Nó tạo ra information gain, và các giá trị cao hơn của nó cho thấy mức độ phụ thuộc lớn hơn [8].

Figure 3 cho thấy mutual information của nhiều đặc trưng khác nhau, tức là tầm quan trọng của từng thuộc tính của bộ dữ liệu này. Ví dụ, theo hình này, diabetes pedigree function có vẻ ít quan trọng hơn theo kỹ thuật mutual information này.

Học bán giám sát (Semi-supervised learning): Một bộ dữ liệu kết hợp đã được sử dụng trong công trình này bằng cách tích hợp các bộ dữ liệu mã nguồn mở Pima Indian và bộ dữ liệu riêng RTML. Theo Table 2, bộ dữ liệu RTML không chứa đặc trưng insulin, được dự đoán bằng một phương pháp bán giám sát. Trước khi hợp nhất bộ dữ liệu thu thập được với bộ dữ liệu Pima Indian, một mô hình đã được tạo ra bằng kỹ thuật extreme gradient boosting (XGB regressor). Nhiều kỹ thuật hồi quy và ensemble learning đã được sử dụng thành công trong nhiều công trình để dự đoán các giá trị bị thiếu [25, 26]. Một cuộc điều tra mở rộng đã được thực hiện khi chọn kỹ thuật regressor hoạt động tốt nhất để dự đoán đặc trưng insulin của bộ dữ liệu RTML từ bộ dữ liệu Pima Indian. Vì giá trị thực của insulin không có sẵn trong bộ dữ liệu RTML, bộ dữ liệu Pima Indian ban đầu được sử dụng để chọn mô hình hồi quy tốt nhất. Đầu tiên, bộ dữ liệu Pima Indian được chia theo tỷ lệ 8:2 và ba mô hình hồi quy có giám sát, extreme gradient boosting (XGB), support vector regression (SVR) và Gaussian process regression (GPR), đã được sử dụng để dự đoán kết quả được chọn, tức là insulin của các mẫu validation của bộ dữ liệu Pima Indian. Tiếp theo, chúng tôi tính root mean square error (RMSE) của nhiều framework hồi quy như sau

FIGURE 3 Phân cấp tầm quan trọng của đặc trưng

TABLE 3 RMSE của các mô hình hồi quy khác nhau trên bộ dữ liệu Pima Indian

| Regression model   |   RMSE |
|--------------------|--------|
| XGB                |   0.36 |
| SVR                |   0.45 |
| GPR                |   0.43 |

trong đó N biểu thị tổng số mẫu validation của bộ dữ liệu Pima Indian.

Theo Table 3, kỹ thuật XGB thể hiện RMSE của insulin thấp nhất trên bộ dữ liệu Pima Indian. Do đó, mô hình này đã được sử dụng để dự đoán cột insulin bị thiếu của bộ dữ liệu RTML thu thập được từ bộ dữ liệu Pima Indian. Các bước làm việc của việc dự đoán insulin trong bộ dữ liệu RTML đã được minh họa trong Figure 4.

Bộ dữ liệu đã hợp nhất: Sau phương pháp bán giám sát, chúng tôi đã dự đoán đặc trưng insulin và hợp nhất bộ dữ liệu RTML với bộ dữ liệu Pima Indian. Bộ dữ liệu đã hợp nhất chứa 877 dữ liệu với tất cả các đặc trưng, ngoại trừ diabetes pedigree function, vì đây là đặc trưng ít quan trọng nhất theo mutual information.

SMOTE và ADASYN cho mất cân bằng lớp: Bộ dữ liệu đã hợp nhất được sử dụng trong công trình này gồm có vấn đề mất cân bằng với

FIGURE 4 Các bước làm việc của việc dự đoán insulin của bộ dữ liệu RTML

302 và 669 mẫu đái tháo đường và không đái tháo đường tương ứng. Để xử lý vấn đề này, các kỹ thuật SMOTE và ADASYN đã được áp dụng cho bộ dữ liệu huấn luyện, để lại dữ liệu kiểm thử không bị ảnh hưởng. Adaptive Synthetic Sampling, được biết đến là ADASYN, là một kỹ thuật tạo dữ liệu tổng hợp với đặc điểm không sao chép các mẫu lớp thiểu số và tạo ra nhiều dữ liệu hơn cho các ví dụ "khó học hơn" [13]. Kết quả là, lớp thiểu số sẽ được lấy mẫu đến mức tương đương với lớp đa số.

Chuẩn hóa Min-Max: Trong nghiên cứu này, chúng tôi sử dụng kỹ thuật chuẩn hóa min-max. Dữ liệu đã được điều chỉnh tỷ lệ về cùng một khoảng bằng phương trình sau:

trong đó Xmax và Xmin biểu thị các giá trị tối đa và tối thiểu trong cột đặc trưng riêng lẻ tương ứng.

## 2.3 | Các bộ phân loại học máy

Trong công trình này, nhiều kỹ thuật học máy và ensemble khác nhau đã được sử dụng để triển khai hệ thống dự đoán đái tháo đường tự động, được thảo luận ngắn gọn dưới đây. Framework GridSearchCV đã được sử dụng trong nghiên cứu này để tìm các giá trị tối ưu của các siêu tham số khác nhau cho tất cả các mô hình học máy nhằm ngăn ngừa overfitting.

Decision tree: Một decision tree biểu diễn hàm học được cung cấp bởi một tập các quy tắc. Kỹ thuật học decision tree thực hiện một phương pháp để xấp xỉ các hàm mục tiêu có giá trị rời rạc. Gini hoặc entropy [7] được sử dụng để xác định information gain, và mỗi nút được chọn dựa trên các hệ số này, được biểu diễn như sau

Trong (3) và (4), n biểu thị số lượng các giá trị lớp riêng biệt. Chúng tôi quan sát thấy rằng max depth = 2, minimum samples leaf = 50, và thước đo độ thuần khiết 'Gini' hoạt động tốt trong bộ dữ liệu được sử dụng trong công trình này bằng việc tinh chỉnh siêu tham số GridSearchCV.

KNN classifier: Một hàm có giá trị rời rạc có thể được xấp xỉ bằng K bộ phân loại lân cận gần nhất [8]. Để phân loại, nó tạo ra một mặt phẳng với các điểm huấn luyện có sẵn và tính khoảng cách giữa điểm truy vấn và các điểm đã huấn luyện. Nó xác định số K láng giềng (tùy thuộc vào bộ dữ liệu) và phân loại chúng bằng biểu quyết đa số. Trong nghiên cứu của chúng tôi, chúng tôi sử dụng K = 5 cho phân loại nhị phân.

Random forest: Random forest là một hệ thống học máy lấy trung bình các dự đoán của nhiều decision tree. Kết quả là, random forest có thể được coi là một mô hình ensemble learning [7]. Trong nghiên cứu này, chúng tôi đã áp dụng random forest với estimators = 400, minimum samples leaf = 5, và thước đo độ thuần khiết 'Gini' bằng việc tinh chỉnh siêu tham số.

Support vector machine: SVM thực hiện phân loại có giám sát bằng cách chọn hyperplane tốt nhất [11]. Trong nghiên cứu này, chúng tôi đã thử nghiệm với nhiều kernel SVM khác nhau trong tập huấn luyện. Cuối cùng, chúng tôi phát hiện ra rằng SVM với kernel tuyến tính, các tham số C = 10 và gamma = 1, tạo ra kết quả tốt nhất trong bộ dữ liệu này.

Logistic regression: Logistic regression có thể được sử dụng để dự đoán một lớp nhị phân. Để dự đoán kết quả, nó khớp một hàm hình chữ 'S' [8]. Kỹ thuật tối ưu hóa siêu tham số thu được số lần lặp tối đa cho sự hội tụ của mô hình logistic regression là 150.

AdaBoost: AdaBoost là một kỹ thuật ensemble. Bộ phân loại này ban đầu hoạt động trên bộ dữ liệu gốc, sau đó khớp các bản sao lặp lại của bộ phân loại vào cùng một bộ dữ liệu. Framework này điều chỉnh các trọng số của các trường hợp được phân loại sai sao cho các bộ phân loại kế tiếp tập trung nhiều hơn vào các tình huống khó. Chúng tôi đã áp dụng AdaBoost với estimator = 50 và learning rate = 0.10 trong công trình này.

XGBoost: XGBoost là một kỹ thuật học máy ensemble dựa trên decision tree, sử dụng phương pháp gradient boosting [20]. Các tham số được sử dụng cho bộ phân loại XGBoost đề xuất như sau: estimators' maximum depth = 4 và hàm mục tiêu 'binary logistic'.

Voting classifier: Đây là một kỹ thuật ensemble để cải thiện việc phân loại bằng cách biểu quyết [7]. Bài báo này triển khai một voting classifier chọn lớp đa số được dự đoán bởi mỗi bộ phân loại với siêu tham số biểu quyết 'soft'.

Bagging: Các bộ phân loại bagging là các bộ phân loại ensemble khớp các bộ phân loại cơ sở vào các tập con ngẫu nhiên của bộ dữ liệu gốc và sau đó tổng hợp các dự đoán riêng lẻ của chúng bằng biểu quyết để tạo ra một phân loại cuối cùng [8]. Trong bộ phân loại bagging được triển khai, base estimators = 500, maximum number of samples = 100, và out-of-bag score = 'True' được sử dụng làm các siêu tham số khác nhau.

FIGURE 5 Phát triển ứng dụng web

FIGURE 6 Các trình tự làm việc của việc phát triển ứng dụng Android đề xuất

## 2.4| Triển khai hệ thống dự đoán

Hệ thống dự đoán đái tháo đường dựa trên học máy đề xuất đã được triển khai vào khung website và ứng dụng điện thoại thông minh để hoạt động tức thời trên dữ liệu thực.

Ứng dụng Web: Chúng tôi đã sử dụng HTML và CSS cho phần frontend của website đề xuất. Sau đó, chúng tôi hoàn thiện mô hình học máy XGBoost với ADASYN, vì nó cung cấp hiệu năng tốt nhất. Việc triển khai mô hình đã được thực hiện với Spyder, một nền tảng môi trường Python hoạt động với Anaconda. Figure 5 cho thấy minh họa quá trình phát triển ứng dụng website.

Ứng dụng điện thoại thông minh Android: Để minh họa hệ thống dự báo đái tháo đường tự động trong thời gian thực, chúng tôi cũng đã thiết kế một ứng dụng điện thoại thông minh Android để kiểm tra hiệu năng của nó. Android Studio được sử dụng cho phần frontend của ứng dụng này. Chúng tôi sử dụng Java làm ngôn ngữ lập trình cần thiết. Sau đó, mô hình đã được triển khai trong Android Studio bằng gói pickle. Trong khi phát triển API, chúng tôi đã sử dụng Heroku để lưu trữ mô hình của mình trên máy chủ lưu trữ tương ứng. Figure 6 minh họa các bước cần thiết trong việc phát triển ứng dụng Android đề xuất.

TABLE 4 Các chỉ số hiệu năng của các bộ phân loại khác nhau với kỹ thuật SMOTE trong bộ dữ liệu đã hợp nhất

| Classifier          |   Precision |   Recall |   F1 Score | Accuracy   |   AUC |
|---------------------|-------------|----------|------------|------------|-------|
| Logistic regression |        0.78 |     0.77 |       0.77 | 77%        |  0.88 |
| KNN                 |        0.78 |     0.76 |       0.76 | 76%        |  0.85 |
| Random forest       |        0.78 |     0.78 |       0.78 | 78%        |  0.87 |
| Decision tree       |        0.75 |     0.73 |       0.73 | 73%        |  0.75 |
| Bagging             |        0.80 |     0.79 |       0.79 | 79%        |  0.87 |
| Adaboost            |        0.79 |     0.78 |       0.78 | 78%        |  0.85 |
| XGboost             |        0.78 |     0.78 |       0.78 | 78%        |  0.84 |
| Voting              |        0.79 |     0.79 |       0.79 | 79%        |  0.86 |
| SVM                 |        0.78 |     0.75 |       0.76 | 75%        |  0.87 |

## 3— KẾT QUẢ VÀ THẢO LUẬN

Phần này trình bày kết quả và thảo luận về hệ thống dự đoán đái tháo đường tự động đề xuất. Đầu tiên, hiệu năng của các kỹ thuật học máy khác nhau được thảo luận. Tiếp theo, khung website và ứng dụng điện thoại thông minh Android được triển khai được minh họa. Chúng tôi đã sử dụng precision, recall, F1 score, AUC và độ chính xác phân loại để đánh giá các mô hình ML khác nhau. Các phương trình của những chỉ số này được biểu diễn như sau

trong đó TP biểu thị mô hình dự đoán dương tính, và kết quả cũng dương tính. FP cho biết dự đoán dương tính của mô hình, nhưng kết quả là âm tính. TV biểu thị mô hình dự đoán âm tính, và kết quả cũng âm tính. FV cho biết mô hình dự đoán âm tính, nhưng kết quả là dương tính. Trong công trình này, phương pháp holdout validation với chia train-test phân tầng (stratified) 8:2 đã được sử dụng cho tất cả các mô hình học máy.

Table 4 so sánh các chỉ số hiệu năng khác nhau của các bộ phân loại khác nhau cho bộ dữ liệu đã hợp nhất với kỹ thuật oversampling tổng hợp SMOTE. Theo bảng này, bộ phân loại bagging đạt hiệu năng tổng thể tốt nhất với 79% accuracy và F1 score và AUC lần lượt là 0.79 và 0.87.

Table 5 cho thấy các chỉ số hiệu năng khác nhau của tất cả các bộ phân loại sử dụng phương pháp ADASYN trong các bộ dữ liệu đã hợp nhất. Theo Table 4, framework XGBoost hoạt động tốt hơn các bộ phân loại khác với 81% accuracy và 0.84 AUC. Ngược lại, phương pháp decision tree đạt accuracy và F1 score thấp nhất.

Tiếp theo, phương pháp domain adaptation đã được áp dụng, trong đó mô hình học máy được huấn luyện và đánh giá trên các mẫu khác nhau, tức là bộ dữ liệu nguồn (source) và đích (target) tương ứng. Trong công trình này, ban đầu, mô hình dự đoán đái tháo đường tự động được huấn luyện trên bộ dữ liệu mã nguồn mở Pima Indian có kích thước lớn hơn. Cuối cùng, mô hình được đánh giá trên bộ dữ liệu riêng RTML

TABLE 5 Các chỉ số hiệu năng của các bộ phân loại khác nhau sử dụng ADASYN trong bộ dữ liệu đã hợp nhất

| Classifier          |   Precision |   Recall |   F1 Score | Accuracy   |   Auc |
|---------------------|-------------|----------|------------|------------|-------|
| Logistic regression |        0.76 |     0.75 |       0.75 | 75%        |  0.84 |
| KNN                 |        0.76 |     0.73 |       0.73 | 73%        |  0.82 |
| Random forest       |        0.76 |     0.76 |       0.76 | 76%        |  0.84 |
| Decision tree       |        0.81 |     0.72 |       0.72 | 72%        |  0.78 |
| Bagging             |        0.80 |     0.79 |       0.79 | 79%        |  0.84 |
| AdaBoost            |        0.75 |     0.76 |       0.76 | 76%        |  0.84 |
| XGBoost             |        0.81 |     0.81 |       0.81 | 81%        |  0.84 |
| Voting              |        0.77 |     0.77 |       0.77 | 77%        |  0.84 |
| SVM                 |        0.78 |     0.78 |       0.77 | 78%        |  0.83 |

TABLE 6 Các chỉ số hiệu năng cho bộ dữ liệu riêng (kỹ thuật domain adaptation)

FIGURE 7 Ma trận nhầm lẫn (confusion matrix) cho XGBoost với kỹ thuật ADASYN

|   Precision |   Recall |   F1 score | Accuracy   |
|-------------|----------|------------|------------|
|        0.95 |     0.96 |       0.95 | 96%        |

với chiều kích thước nhỏ hơn nhiều. Table 6 thể hiện các chỉ số hiệu năng cho bộ dữ liệu riêng. Điều thú vị cần lưu ý là framework XGBoost với ADASYN đã được áp dụng trong bộ dữ liệu huấn luyện trong trường hợp này.

Figure 7 mô tả ma trận nhầm lẫn cho XGBoost với ADASYN. Theo hình này, kỹ thuật XGBoost đã phân loại chính xác 141 trường hợp với TP = 43 và ZV = 98.

Đường cong ROC của XGBoost với phương pháp ADASYN đã được minh họa trong Figure 8. Hình này cho thấy giá trị AUC của XGBoost là 0.84.

Tiếp theo, các kỹ thuật explainable AI với các framework SHAP và LIME được triển khai để hiểu cách mô hình dự đoán ra quyết định. Figure 9 cho thấy tầm quan trọng của đặc trưng của XGBoost với ADASYN với sự trợ giúp của explainable AI, thư viện SHAP.

FIGURE 8 Đường cong ROC và giá trị AUC cho XGBoost với ADASYN

FIGURE 9 Diễn giải explainable AI về tầm quan trọng của đặc trưng của XGBoost với ADASYN

FIGURE 10 ）Diễn giải dự đoán explainable AI bằng LIME

Figure 10 minh họa một diễn giải của mô hình XGBoost được triển khai bằng phương pháp explainable AI LIME. Theo hình này, mô hình dự đoán đái tháo đường chính xác cho người cụ thể này với độ tin cậy 80%. Mô hình ML dự đoán lớp này vì người đó có mức glucose trên 140.25 và có số lần mang thai (pregnancies) trên 6.

Cuối cùng, hệ thống dự đoán đái tháo đường tự động đề xuất đã được triển khai vào một website và ứng dụng điện thoại thông minh Android sử dụng framework học máy XGBoost với ADASYN. Figure 11 cho thấy một dự đoán đái tháo đường tức thời bằng ứng dụng web được thiết kế với dữ liệu thực.

Figure 12 hiển thị màn hình chính của ứng dụng di động Android đề xuất được tạo bằng thuật toán phân loại tốt nhất XGBoost (DiabetesAid Diabetes Test Contact). Cuối cùng, một khảo sát đã được tiến hành, trong đó người dùng đánh giá các tính năng khác nhau của ứng dụng. Figure 13 minh họa chi tiết đánh giá về kết quả khảo sát của ứng dụng Android được triển khai. Tổng cộng có mười sáu tình nguyện viên đã đánh giá ứng dụng, và tất cả họ đều là nữ. Những người tham gia đánh giá mỗi tính năng trên thang điểm từ 1 đến 10, và giá trị trung bình của họ được tính toán. Theo hình này, các tính năng dự đoán đái tháo đường và biểu đồ chế độ ăn hàng ngày của ứng dụng đạt các đánh giá cao nhất lần lượt là 8.40 và 8.

FIGURE 11 Dự đoán đái tháo đường tức thời bằng ứng dụng web được thiết kế

FIGURE 12 Màn hình chính của ứng dụng Android đề xuất

FIGURE 13 Các đánh giá xếp hạng của ứng dụng Android

TABLE 7 Các chỉ số hiệu năng của các bộ phân loại trong bộ dữ liệu đã hợp nhất (insulin của RTML lấy từ giá trị trung bình của Pima Indian)

| Classifier    |   Precision |   Recall |   F1 Score | Accuracy   |
|---------------|-------------|----------|------------|------------|
| AdaBoost      |        0.77 |     0.77 |       0.77 | 77%        |
| Random Forest |        0.77 |     0.76 |       0.76 | 76%        |
| XGBoost       |        0.78 |     0.78 |       0.78 | 78%        |

TABLE 8 Các chỉ số hiệu năng của các bộ phân loại trong bộ dữ liệu đã hợp nhất (insulin của RTML lấy từ giá trị trung vị của Pima Indian)

| Classifier    |   Precision |   Recall |   F1 Score | Accuracy   |
|---------------|-------------|----------|------------|------------|
| AdaBoost      |        0.78 |     0.78 |       0.78 | 78%        |
| Random Forest |        0.76 |     0.76 |       0.76 | 76%        |
| XGBoost       |        0.77 |     0.76 |       0.76 | 76%        |

Cần lưu ý rằng đặc trưng insulin của bộ dữ liệu RTML đã được dự đoán từ bộ dữ liệu Pima Indian bằng cách áp dụng kỹ thuật hồi quy XGB cho tất cả các kết quả được thảo luận ở trên. Tuy nhiên, các điều tra thay thế đã được tiến hành để thu được đặc trưng insulin của bộ dữ liệu RTML, tức là, gán giá trị trung bình (mean) và trung vị (median) của insulin của nhiều bệnh nhân trong bộ dữ liệu Pima Indian. Table 7 và 8 thể hiện các chỉ số hiệu năng khác nhau của các mô hình học máy với kỹ thuật ADASYN khi các đặc trưng insulin bị thiếu của bộ dữ liệu RTML được lấy từ các giá trị trung bình và trung vị của bộ dữ liệu Pima Indian.

TABLE 9 Các chỉ số hiệu năng của các bộ phân loại trong bộ dữ liệu đã hợp nhất (insulin bị loại bỏ khỏi Pima Indian)

| Classifier    |   Precision |   Recall |   F1 Score | Accuracy   |
|---------------|-------------|----------|------------|------------|
| AdaBoost      |        0.73 |     0.71 |       0.72 | 72%        |
| Random Forest |        0.72 |     0.70 |       0.71 | 71%        |
| XGBoost       |        0.74 |     0.73 |       0.73 | 74%        |

TABLE 10 So sánh hệ thống đề xuất với các công trình dự đoán đái tháo đường tương tự

| Reference   | Classifier                |   F1 score | Accuracy   | Other metrics                |
|-------------|---------------------------|------------|------------|------------------------------|
| [3]         | Deep belief network model |       0.81 | N/A        | Precision: 0.68 Recall: 1.0  |
| [5]         | SVM with RBF kernel       |            | 82%        |                              |
| [9]         | SVM                       |       0.73 | 75%        | Precision: 0.72 Recall: 0.75 |
| [01]        | Ensemble (XGBoost)        |       0.81 | 88.8%      | Precision: 0.84 Recall: 0.79 |
| [21]        | Soft voting               |       0.72 | 79.1%      | Precision: 0.73 Recall: 0.72 |
| This work   | XGBoost with ADASYN       |       0.81 | 88.5%      | Precision: 0.82 Recall: 0.80 |

Cuối cùng, một kịch bản khác đã được xem xét, trong đó đặc trưng insulin của bộ dữ liệu Pima Indian đã bị loại bỏ để duy trì sự nhất quán với bộ dữ liệu RTML. Table 9 mô tả các chỉ số hiệu năng khác nhau của bộ dữ liệu đã hợp nhất sau khi loại bỏ đặc trưng insulin. Theo bảng này, hiệu năng của tất cả các mô hình dự đoán đều suy giảm.

Table 10 minh họa việc so sánh hiệu năng của hệ thống dự đoán đái tháo đường tự động đề xuất với các công trình tương tự trên bộ dữ liệu Pima Indian. Theo bảng này, kỹ thuật XGBoost đề xuất với ADASYN vượt trội hơn hầu hết các công trình hiện có về accuracy và F1 score.

Nghiên cứu này nhằm dự đoán đái tháo đường một cách tự động bằng cách sử dụng các kỹ thuật học máy. Bộ dữ liệu Pima Indian và một bộ dữ liệu RTML mới gồm dữ liệu khám sức khỏe thể chất từ các bệnh nhân nữ địa phương của Bangladesh đã được sử dụng. Các giá trị đặc trưng insulin bị thiếu của bộ dữ liệu RTML đã được dự đoán từ bộ dữ liệu Pima Indian. Nghiên cứu của chúng tôi phát hiện rằng kỹ thuật hồi quy XGB đạt sai số RMS thấp nhất trong việc dự đoán insulin. Thuật toán chọn lọc đặc trưng dựa trên mutual information cho thấy mức glucose, BMI, age và insulin là những đặc trưng nổi bật nhất trong việc dự đoán đái tháo đường. Dữ liệu tổng hợp SMOTE và ADASYN đã được áp dụng. Kỹ thuật XGBoost với ADASYN đạt hiệu năng tốt nhất. Các framework explainable AI LIME và SHAP diễn giải dự đoán được cung cấp bởi các phương pháp ML. Một hạn chế của nghiên cứu này là sự không có sẵn của đặc trưng insulin của bộ dữ liệu RTML được sử dụng. Dự đoán insulin thu được từ XGB regressor và được tạo ra từ các giá trị trung bình và trung vị của bộ dữ liệu Pima India gồm có một độ lệch trung bình về độ chính xác phân loại lần lượt khoảng 1.33% và 2.33%.

## 4|KẾT LUẬN

Đái tháo đường có thể là một lý do làm giảm tuổi thọ và chất lượng cuộc sống. Việc dự đoán rối loạn mạn tính này sớm hơn có thể làm giảm nguy cơ và biến chứng của nhiều bệnh về lâu dài. Trong bài báo này, một hệ thống dự đoán đái tháo đường tự động sử dụng nhiều phương pháp học máy khác nhau đã được đề xuất. Bộ dữ liệu mã nguồn mở Pima Indian và một bộ dữ liệu riêng của các bệnh nhân nữ Bangladesh đã được sử dụng trong công trình này. Các kỹ thuật tiền xử lý SMOTE và ADASYN đã được áp dụng để xử lý vấn đề mất cân bằng lớp. Bài báo nghiên cứu này báo cáo các chỉ số hiệu năng khác nhau, tức là precision, recall, accuracy, F1 score và AUC cho các kỹ thuật học máy và ensemble khác nhau. Bộ phân loại XGBoost đạt hiệu năng tốt nhất với 81% accuracy và F1 score và AUC lần lượt là 0.81 và 0.84, với phương pháp ADASYN. Tiếp theo, kỹ thuật domain adaptation đã được áp dụng để chứng minh tính linh hoạt của hệ thống dự đoán đề xuất. Cuối cùng, framework XGBoost hoạt động tốt nhất đã được triển khai tức thời. Có một số hướng phát triển trong tương lai của công trình này, ví dụ, chúng tôi khuyến nghị thu thập thêm dữ liệu riêng với một nhóm bệnh nhân lớn hơn để có được kết quả tốt hơn. Một mở rộng khác của công trình này là kết hợp các mô hình học máy với fuzzy logic

## ĐÓNG GÓP CỦA CÁC TÁC GIẢ

Tansin Ullah Nabil: Conceptualization; Data curation; Investigation; Methodology; Software; Validation; Visualization; Writing - original draft. Sanjida Islam: Data curation; Methodology; Visualization. Riasat Khan: Project administration; Supervision; Writing - review &amp; editing.

## XUNG ĐỘT LỢI ÍCH

Các tác giả tuyên bố không có xung đột lợi ích.

## THÔNG TIN TÀI TRỢ

Các tác giả không nhận được tài trợ cụ thể nào cho công trình này.

## TUYÊN BỐ VỀ TÍNH SẴN CÓ CỦA DỮ LIỆU

Bộ dữ liệu riêng của các bệnh nhân nữ Bangladesh và mã lập trình có sẵn tại đường dẫn sau: https://github.com/tansin-nabil/Diabetes-Prediction-UsingMachine-Learning.

## ORCID

Riasat Khan  https://orcid.org/0000-0002-5429-2235

## TÀI LIỆU THAM KHẢO

- 1.Atlas,G.: Diabetes. International Diabetes Federation. 10th ed., IDF Diabetes Atlas.
2. Akhtar, S., et al.: Prevalence of diabetes and pre-diabetes in Bangladesh: A systematic review and meta-analysis. BMJ Open 10, e036086 (2020)
- 3.Prabhu,P,Selvabharathi, S.: Deep belief neural network model for prediction of diabetes mellitus. In: International Conference on Imaging, Signal Processing and Communication, pp. 138-142 (2019)

- 4.VijiyaKumar, K., Lavanya, B., Nirmala, I., Caroline, S.S.: Random forest algorithm for the prediction of diabetes. In: International Conference on System, Computation, Automation and Networking, Pp. 1-5 (2019)
- 5.Mohan, N., Jain,V: Performance analysis of support vector machine in diabetes prediction. In: International Conference on Electronics, Communication and Aerospace Technology, Pp.1-3 (2020)
- 6.Smith, J.W.,Everhart, J.E., Dickson, W.C., Knowler, W.C., Johannes, R.S.: Using the ADAP learning algorithm to forecast the onset of diabetes mellitus. In: Annual Symposium on Computer Applications in Medical Care Pp. 261-265 (1998)
- 7.Aurelien, G.:Hands-On Machine Learning with Scikit-Learn and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems. O'Reilly Media, Inc., Sebastopol, CA
8. Mitchell, T.M.: Machine Learning. McGraw-Hill, Inc., New York
- 9.Chatrati, S.P, Hossain, G., Goyal, A., et al.: Smart home health monitoring system for predicting type 2 diabetes and hypertension. J. King Saud Univ. Comput. Inf. Sci. 34(3), 862870 (2020)
10. Hasan, M.K., Alam, M.A., Das, D., Hossain, E., Hasan, M.: Diabetes prediction using ensembling of different machine learning classifiers. IEEE Access 8, 76516-76531, (2020)
- 11.Cervantes, J., Garcia-Lamont, F, Rodriguez, L., Lopez-Chau, A.: A comchallenges and trends. Neurocomputing 408, 189-215 (2020)
13. He, H., Bai, Y, Garcia, E.A., Li, S.: ADASYN: Adaptive synthetic sampling approach for imbalanced learning. In: International Joint Conference on Neural Networks (IEEE World Congress on Computational Intelligence, Pp. 1322-1328 (2008)
12. Pranto, B., et al: Evaluating machine learning methods for predicting diabetes among female patients in Bangladesh. Information 11,1-20 (2020)
14. Deberneh, H.M., Kim, I.: Prediction of type 2 diabetes based on machine learning algorithm. Int. J. Environ. Res. Public Health 18, 1-14 (2021)
- 15.Olisah, C.C.,Smith, L., Smith, M.: Diabetes mellitus prediction and diagnosis from a data preprocessing and machine learning perspective. Comput. Methods Programs Biomed. 220, 1-12 (2022)
16. Ahmed, N., et al.: Machine learning based diabetes prediction and development of smart web application. Int. J. Cogn. Comput. Eng. 2, 229-241 (2021)
17. Jackins, V., Vimal, S., Kaliappan, M., Lee, M.Y: AI-based smart prediction of clinical disease using random forest classifier and Naive Bayes. J. Supercomput. 77,5198-5219 (2021)
- 18.Ramesh, J., Aburukba, R.,Sagahyroon, A.:A remote healthcare monitoring framework for diabetes prediction using machine learning. Healthcare Technol. Lett. 8, 45-57 (2021)
- 19.Mounika, V., Neeli, D.S., Sree, G.S., Mourya, P., Babu, M.A.: Prediction of type-2 diabetes using machine learning algorithms. In:International Conference on Artificial Intelligence and Smart Systems, Pp. 127-131 (2021)
- 20.Panchavati, S.,et al.: Retrospective validation of a machine learning clinical decision support tool for myocardial infarction risk stratification. Healthcare Technol. Lett. 8, 139-147 (2021)
21. Kumari, S., Kumar, D., Mittal, M.: An ensemble approach for classification and prediction of diabetes mellitus using soft voting classifier. Int. J. Cognit.Comput.Eng.2,40-46 (2021)
22. Kharroubi, A.T., Darwish, H.M.: Diabetes mellitus: The epidemic of the century. World J. Diabetes 6, 850-867 (2015)
23. Wu, Y, Ding, Y., Tanaka, Y., Zhang, W: Risk factors contributing to type 2 diabetes and recent advances in the treatment and prevention. Int. J. Med. Sci. 11, 11851200 (2014)
- 24.Papatheodorou, K., Banach, M., Edmonds, M., Papanas, N., Papazoglou D.: Complications of diabetes.J. Diabetes Res. 2015, 1-6 (2015)
- 25.Tran, C.T., Zhang, M., Andreae, P., Xue, B., Bui, L.T.: Multiple imputation and ensemble learning for classification with incomplete data. In: Intelligent and Evolutionary Systems; New York: Springer, pp. 401-415 (2017)
- 26.Yu, L., Liu, L, Peace, K.E.: Regression multiple imputation for missing data analysis. Stat. Methods Med. Res. 29, 26472464 (2020)

Cách trích dẫn bài báo này: Tasin, I., Nabil, T.U., Islam, S., Khan, R.: Diabetes prediction using machine learning and explainable AI techniques.Healthc.Technol.Lett. 10, 1-10 (2023). https://doi.org/10.1049/htl2.12039
