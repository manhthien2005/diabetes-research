<!-- extracted by pdf-extract | engine=docling | pages=24 | ocr=False | tables=10/10 | density=1.30 | score=80 -->

## RESEARCH

## Dự đoán bệnh đái tháo đường sử dụng một tập hợp (ensemble) các mô hình đa-phân-loại học máy

Karlo Abnoosian 1 , Rahman Farnoosh 2* and Mohammad Hassan Behzadi 1

*Liên hệ: rfarnoosh@iust.ac.ir

1 Department of Statistics, Science and Research Branch, Islamic Azad University, Tehran, Iran

2 School of Mathematics, Iran University of Science and Technology, Tehran, Iran

## Tóm tắt

Bối cảnh và mục tiêu: Đái tháo đường là một bệnh mạn tính đe dọa tính mạng với tỷ lệ hiện mắc toàn cầu đang gia tăng, đòi hỏi chẩn đoán và điều trị sớm để ngăn ngừa các biến chứng nặng. Học máy đã nổi lên như một cách tiếp cận đầy hứa hẹn cho chẩn đoán đái tháo đường, nhưng các thách thức như dữ liệu được gán nhãn hạn chế, giá trị thiếu thường xuyên, và mất cân bằng bộ dữ liệu cản trở việc phát triển các mô hình dự đoán chính xác. Do đó, cần một khung mới để giải quyết các thách thức này và cải thiện hiệu năng.

Phương pháp: Trong nghiên cứu này, chúng tôi đề xuất một khung đa-phân-loại dựa trên pipeline đầy sáng tạo để dự đoán đái tháo đường thành ba lớp: đái tháo đường, không đái tháo đường, và tiền đái tháo đường, sử dụng bộ dữ liệu mất cân bằng Iraqi Patient Dataset of Diabetes. Khung của chúng tôi kết hợp nhiều kỹ thuật tiền xử lý, bao gồm loại bỏ mẫu trùng lặp, chuyển đổi thuộc tính, nội suy giá trị thiếu, chuẩn hóa và tiêu chuẩn hóa dữ liệu, lựa chọn đặc trưng, và kiểm định chéo k-fold. Hơn nữa, chúng tôi triển khai nhiều mô hình học máy, như k-NN, SVM, DT, RF, AdaBoost, và GNB, và giới thiệu một cách tiếp cận ensemble có trọng số dựa trên diện tích dưới đường cong đặc trưng vận hành của bộ thu (AUC) để giải quyết mất cân bằng bộ dữ liệu. Tối ưu hiệu năng đạt được thông qua grid search và tối ưu Bayes cho việc tinh chỉnh siêu tham số.

Kết quả: Mô hình đề xuất của chúng tôi vượt trội các mô hình học máy khác, bao gồm k-NN, SVM, DT, RF, AdaBoost, và GNB, trong dự đoán đái tháo đường. Mô hình đạt các giá trị accuracy, precision, recall, F1-score, và AUC trung bình cao lần lượt là 0.9887, 0.9861, 0.9792, 0.9851, và 0.999.

Kết luận: Khung đa-phân-loại dựa trên pipeline của chúng tôi chứng minh các kết quả đầy hứa hẹn trong việc dự đoán chính xác đái tháo đường sử dụng một bộ dữ liệu mất cân bằng của các bệnh nhân đái tháo đường người Iraq. Khung đề xuất giải quyết các thách thức liên quan tới dữ liệu được gán nhãn hạn chế, giá trị thiếu, và mất cân bằng bộ dữ liệu, dẫn tới hiệu năng dự đoán được cải thiện. Nghiên cứu này làm nổi bật tiềm năng của các kỹ thuật học máy trong chẩn đoán và quản lý đái tháo đường, và khung đề xuất có thể đóng vai trò là một công cụ giá trị cho dự đoán chính xác và chăm sóc bệnh nhân tốt hơn. Nghiên cứu sâu hơn có thể xây dựng trên công trình của chúng tôi để tinh chỉnh và tối ưu khung này và khám phá khả năng áp dụng của nó trên các bộ dữ liệu và quần thể đa dạng.

© The Author(s) 2023, corrected publication 2023. Open Access This article is licensed under a Creative Commons Attribution 4.0 International License, which permits use, sharing, adaptation, distribution and reproduction in any medium or format, as long as you give appropriate credit to the original author(s) and the source, provide a link to the Creative Commons licence, and indicate if changes were made. The images or other third party material in this article are included in the article's Creative Commons licence, unless indicated otherwise in a credit line to the material. If material is not included in the article's Creative Commons licence and your intended use is not permitted by statutory regulation or exceeds the permitted use, you will need to obtain permission directly from the copyright holder. To view a copy of this licence, visit http://  creat  iveco  mmons.  org/  licen  ses/  by/4.  0/. The Creative Commons Public Domain Dedication waiver (http://  creat  iveco mmons.  org/  publi  cdoma  in/  zero/1.  0/) applies to the data made available in this article, unless otherwise stated in a credit line to the data.

## Open Access

Từ khóa: Dự đoán bệnh đái tháo đường, Các bộ phân loại học máy, Các mô hình học máy ensemble, Cây quyết định, Random forest, Lựa chọn đặc trưng

## Giới thiệu

Bệnh mạn tính là một bệnh hoặc tình trạng diễn tiến liên tục hoặc có các tác động vĩnh viễn [1, 2]. Tuy nhiên, hậu quả của loại bệnh này có thể có nhiều tác động tiêu cực khác nhau lên chất lượng cuộc sống, và một phần lớn ngân sách quốc gia được chi cho các bệnh mạn tính [3, 4]. Đái tháo đường là một trong những bệnh mạn tính đó, gây ra một rủi ro sức khỏe lớn và số nguyên nhân y khoa gây tử vong đang tăng mỗi năm, khiến nó trở thành một trong những vấn đề lớn nhất ở các quốc gia mới nổi và phát triển [5, 6]. Mức đường huyết cao đã được liên hệ với đái tháo đường. Hormone insulin, vốn khiến glucose từ thức ăn vào cơ thể đi vào dòng máu, được sản xuất bởi một trong các loại tế bào beta trong tụy. Đái tháo đường gây ra bởi sự thiếu hụt hormone này [7]. Bệnh này có thể làm tăng cơn khát, đói, bệnh tim, bệnh thận, v.v., và thậm chí dẫn tới tử vong của bệnh nhân [8, 9]. Đái tháo đường có thể chia thành hai loại: type 1 và type 2. Bệnh nhân đái tháo đường type 1 thường trẻ và hầu hết dưới 30 tuổi. Tăng cơn khát và mức đường huyết cũng như tiểu nhiều là các dấu hiệu lâm sàng thường gặp [10]. Ở type 2, người trung niên và cao tuổi dễ mắc bệnh hơn và thường liên quan tới béo phì, tăng huyết áp, rối loạn lipid máu, xơ vữa động mạch, và các vấn đề sức khỏe khác. Thuốc đơn thuần không đủ để điều trị loại đái tháo đường này, và tiêm insulin cũng là thiết yếu [11, 12]. Tuy nhiên, chưa có cách chữa lâu dài nào được phát hiện cho bệnh này, nhưng nó có thể được kiểm soát bằng chẩn đoán và tiên lượng sớm ở các giai đoạn đầu của bệnh, và ở các giai đoạn sau của bệnh, điều trị có thể dễ hơn nhiều. Do đó, dự đoán đái tháo đường đã trở thành một chủ đề gây tranh luận để học tập và nghiên cứu [10-13].

Trong những năm gần đây, đã có những tiến bộ đáng kể trong việc phát triển và công bố nhiều phương pháp khác nhau để dự đoán bệnh, bao gồm nhưng không giới hạn ở đái tháo đường, Covid-19, và các bệnh khác [14, 15]. Đồng thời, sự tiến bộ nhanh chóng của các mô hình học máy đã dẫn tới việc chúng được sử dụng rộng rãi trong nhiều ứng dụng, đặc biệt trong lĩnh vực y khoa, cho chẩn đoán chính xác nhiều bệnh khác nhau [13-16]. Nhìn chung, các mô hình học máy nhằm mô tả và dự đoán dữ liệu và có thể giúp con người đưa ra các phán đoán sớm về bệnh dựa trên tình trạng thể chất của họ và chẩn đoán bệnh ở các giai đoạn đầu cho tới khi điều trị hoàn tất [14]. Amit Kishor và Chinmay Chakraborty đã đề xuất một mô hình chăm sóc sức khỏe tiên tiến dựa trên các kỹ thuật học máy, nhằm nâng cao độ chính xác và tính kịp thời của chẩn đoán đái tháo đường. Trong mô hình này, họ dùng một tập gồm năm bộ phân loại học máy, bao gồm logistic regression, K-nearest neighbor, Naive Bayes, random forest, và support vector machine. Hơn nữa, để cải thiện hiệu năng của mô hình, họ dùng phương pháp lựa chọn đặc trưng fast correlation-based filter để loại bỏ các đặc trưng không liên quan và áp dụng kỹ thuật artificial minority oversampling để giải quyết các bộ dữ liệu mất cân bằng [17]. Zou và cộng sự [18] dùng các mô hình cây quyết định J48, RF, và ANN để dự đoán đái tháo đường từ một bộ dữ liệu khám bệnh viện ở Luzhou, Trung Quốc. Để đảm bảo khả năng áp dụng rộng rãi của các phương pháp của họ, các tác giả chọn các kỹ thuật hoạt động tốt nhất cho các kiểm tra thực nghiệm độc lập. Chen và Pan [19] thực hiện một nghiên cứu toàn diện để dự đoán đái tháo đường sử dụng nhiều phương pháp học máy khác nhau và xác định mô hình hiệu quả và chính xác nhất. Nghiên cứu dùng một bộ dữ liệu với 520 mẫu và 17 đặc trưng, bao gồm polyuria, gender, age, sudden weight loss, polydipsia, polyphagia, weakness, irritability, genital thrush, itching, vision blurring, muscle stiffness, alopecia, và obesity. Các tác giả so sánh hiệu năng của tám thuật toán phân loại, bao gồm Support Vector Classifier (SVC), Gaussian Naive Bayes (GNB), Random Forest (RF), Decision Tree Classifier (DTC), Logistic Regression (LR), Extra Tree Classifier (ETC), K-Nearest Neighbors (KNN), và XGBoost (XGB), và thấy rằng Extra Tree Classifier (ETC) đạt độ chính xác cao nhất 98.55%. Các kết quả này chứng minh rằng ETC là kỹ thuật phân loại học máy hiệu quả và chính xác nhất để chẩn đoán đái tháo đường dựa trên các tham số đã nêu. Zhu và cộng sự [20] đề xuất một cách tiếp cận sáng tạo cho dự đoán đái tháo đường bằng cách kết hợp các kỹ thuật PCA và K-Means, đem lại một bộ dữ liệu rất hiệu quả và phân cụm tốt. Mô hình gồm ba thành phần: phân tích thành phần chính, phân cụm K-Means, và logistic regression, cùng với tiêu chuẩn hóa dữ liệu. Các kết quả thực nghiệm chứng minh rằng PCA nâng cao đáng kể độ chính xác của phương pháp phân cụm K-Means và bộ phân loại logistic regression, với K-Means phân loại chính xác 25 điểm dữ liệu và tăng độ chính xác logistic regression lên 1.98%, qua đó vượt các phát hiện trước đó. Lukmanto và cộng sự [21] dùng fuzzy support vector machines và lựa chọn đặc trưng F-exponential để nhận diện và phân loại đái tháo đường. Lựa chọn đặc trưng được dùng để trích các đặc tính hữu ích từ bộ dữ liệu, và đầu ra được phân loại bằng phương pháp suy luận fuzzy. Bộ dữ liệu được huấn luyện bằng SVM, đem lại độ chính xác ấn tượng 89.02% khi áp dụng cho bộ dữ liệu PIMA Indian Diabetes. Hơn nữa, cách tiếp cận dùng một số lượng tối ưu các luật fuzzy, duy trì một mức độ chính xác xuất sắc. Raja và cộng sự [22] đề xuất một kỹ thuật khai phá dữ liệu mới cho dự đoán đái tháo đường type 2, kết hợp particle swarm optimization (PSO) và phân cụm fuzzy (FCM) để tạo một mô hình dự đoán rất hiệu quả. Cách tiếp cận được đánh giá qua các thí nghiệm trên bộ dữ liệu PIMA Indian diabetes, dùng các độ đo cho accuracy, sensitivity, và specificity. Các kết quả chứng minh rằng mô hình đề xuất vượt trội các phương pháp khác, cho thấy tăng 8.26% độ chính xác so với các phương pháp khác. Khanam và cộng sự [23] dùng bảy phương pháp học máy và mạng nơ-ron để dự đoán đái tháo đường trên bộ dữ liệu PIMA diabetes. Các tác giả tạo nhiều mô hình mạng nơ-ron với số lớp ẩn khác nhau cho các khoảng thời gian khác nhau. Các kết quả thực nghiệm cho thấy các mô hình Logistic Regression (LR) và Support Vector Machine (SVM) rất hiệu quả trong dự đoán đái tháo đường và rằng các mạng nơ-ron với hai lớp ẩn đạt độ chính xác ấn tượng 88.6%. Rajendra và cộng sự [24] thực hiện các thí nghiệm trên bộ dữ liệu PIMA diabetes, so sánh các thuật toán logistic regression và các kỹ thuật học ensemble cho dự đoán đái tháo đường. Nghiên cứu chứng minh rằng logistic regression là một trong những kỹ thuật hiệu quả nhất để tạo các mô hình dự đoán và rằng việc dùng lựa chọn đặc trưng, tiền xử lý dữ liệu, và các chiến lược tích hợp có thể nâng cao đáng kể độ chính xác của mô hình. Rawat và cộng sự [25] thực hiện các nghiên cứu so sánh trên bộ dữ liệu PIMA diabetes, dùng các phương pháp học máy như Naive Bayesian (NB), Support Vector Machine (SVM), và Neural Network. Các kết quả thực nghiệm cho thấy mạng nơ-ron đạt độ chính xác cao nhất trong tất cả các bộ phân loại, với độ chính xác ấn tượng 98%. Phương pháp mạng nơ-ron được coi là hiệu quả nhất trong phát hiện sớm đái tháo đường. Zhou và cộng sự [26] đề xuất một mô hình dự đoán đái tháo đường dựa trên lựa chọn đặc trưng Boruta và học ensemble, vốn dùng phân cụm không giám sát của dữ liệu bằng thuật toán K-Means + + và stacking một phương pháp học ensemble cho phân loại. Mô hình được kiểm chứng trên bộ dữ liệu PIMA Indian diabetes, đạt tỷ lệ độ chính xác cực cao 98%, vượt các mô hình dự đoán đái tháo đường khác, và làm nổi bật hiệu năng vượt trội của nó trong dự đoán đái tháo đường. Việc kết hợp lựa chọn đặc trưng Boruta và học ensemble trong mô hình này cung cấp một cách tiếp cận đầy hứa hẹn cho chẩn đoán và điều trị đái tháo đường chính xác. Shilpi và cộng sự [27] dùng hai thuật toán boosting thường gặp, Adaboost.M1 và LogitBoost, để thiết lập các mô hình học máy cho chẩn đoán đái tháo đường dựa trên dữ liệu xét nghiệm lâm sàng từ tổng cộng 35,669 cá nhân. Các kết quả thực nghiệm chứng minh rằng mô hình phân loại LogitBoost vượt trội mô hình phân loại Adaboost.M1, đạt độ chính xác tổng thể ấn tượng 95.30% với kiểm định chéo tenfold. Các tác giả kết luận rằng các thuật toán boosting này thể hiện hiệu năng xuất sắc cho các mô hình phân loại đái tháo đường dựa trên dữ liệu y khoa lâm sàng. Các yếu tố phân biệt đáng kể giữa quần thể đái tháo đường và quần thể chung thu được từ quá trình chọn các mục xét nghiệm ưu tiên có thể được dùng làm các yếu tố nguy cơ tham chiếu cho đái tháo đường. Mô hình cũng bền vững và có một mức độ chức năng tiền chẩn đoán, do ma trận hệ số của dữ liệu gốc là một ma trận thưa do các kết quả xét nghiệm thiếu, một số trong đó liên quan trực tiếp tới chẩn đoán bệnh.

Các tiến bộ nhịp độ nhanh trong học máy đã cho thấy các kết quả đầy hứa hẹn trong phát hiện sớm bệnh. Tuy nhiên, phát triển một mô hình dự đoán chính xác để chẩn đoán đái tháo đường vẫn còn nhiều thách thức. Điều này do vài yếu tố như sự sẵn có hạn chế của dữ liệu được gán nhãn, sự xuất hiện thường xuyên của các giá trị không đầy đủ hoặc thiếu trong bộ dữ liệu, và bản chất mất cân bằng của bộ dữ liệu. Các vấn đề này khiến khó đạt hiệu năng tối ưu và đòi hỏi phát triển các kỹ thuật mới để giải quyết chúng. Trong bài báo này, chúng tôi trình bày một khung dựa trên pipeline đầy sáng tạo để dự đoán đái tháo đường trong ba lớp người (đái tháo đường, không đái tháo đường, và tiền đái tháo đường) sử dụng Iraqi Patient Dataset for Diabetes patients (IPDD), một bộ dữ liệu mất cân bằng. Tiền xử lý là một phần quan trọng của khung đề xuất để đạt một kết quả chất lượng cao. Nó bao gồm vài bước, như loại bỏ mẫu trùng lặp, điền các giá trị thiếu, chuẩn hóa và tiêu chuẩn hóa dữ liệu, chọn các đặc trưng liên quan, và thực hiện kiểm định chéo k-fold để đảm bảo dữ liệu chất lượng cao. Đã tham vấn một chuyên gia để hoàn thành các giá trị thuộc tính thiếu dùng phương pháp k-NN Imputation. Chúng tôi triển khai nhiều mô hình học máy, bao gồm MLMs, k-NN, SVM, DT, RF, AdaBoost, và GNB, và dùng các kỹ thuật tối ưu Bayes và grid search để tìm các siêu tham số tối ưu cho các MLM. Vì bộ dữ liệu của chúng tôi mất cân bằng, đánh giá riêng độ chính xác không phải là một thước đo tốt cho đánh giá mô hình, và do đó chúng tôi dùng diện tích dưới đường cong ROC (AUC) làm một thước đo bổ sung để đánh giá các mô hình. Để đánh giá các mô hình. Dưới cùng các điều kiện thực nghiệm và bộ dữ liệu, nhiều thí nghiệm được thực hiện với các tổ hợp tiền xử lý khác nhau và các mô hình học máy để tối đa hóa diện tích dưới đường cong của việc dự đoán đái tháo đường. Sau đó mô hình học máy tối ưu được dùng làm mô hình cơ sở cho khung đề xuất để dự đoán đái tháo đường một cách tối ưu. Sau đó chúng tôi đề xuất một mô hình học máy ensemble (EMLM) với một sự kết hợp các MLM để cải thiện độ chính xác dự đoán và AUC của các bệnh đái tháo đường. Kết hợp các mô hình khác nhau có thể giúp giải quyết các điểm yếu của việc dùng các mô hình đơn lẻ khi bộ dữ liệu mất cân bằng. Để kết hợp các mô hình học máy, chúng tôi dùng AUC với cách tiếp cận phân loại đa lớp One-Vs-One (OVO) làm trọng số cho EMLM này. AUC trong EMLM đề xuất không thiên lệch với phân phối lớp, và do đó, chúng tôi chọn nó làm trọng số của mô hình trong ensemble bỏ phiếu thay vì độ chính xác. Chúng tôi thực hiện nhiều thí nghiệm với các tổ hợp MLM khác nhau để thu được tập tối ưu các EMLM bằng cách áp dụng tiền xử lý tối ưu từ các thí nghiệm trước.

Lựa chọn đặc trưng và giảm chiều có tầm quan trọng tối cao trong nghiên cứu chẩn đoán bệnh, vì chúng cho phép xây dựng một mô hình với số đặc trưng giảm. Một mô hình như vậy đơn giản hơn, ít tốn thời gian hơn cho huấn luyện và kiểm tra, và đặc biệt mạnh mẽ trong dự đoán bệnh. Trong nghiên cứu này, chúng tôi đánh giá tính hiệu quả của phương pháp lựa chọn đặc trưng MRMR, cũng như các phương pháp giảm chiều PCA và ICA, trong việc xác định các đặc trưng quan trọng nhất ảnh hưởng tới biến mục tiêu, tức là các yếu tố có tác động đáng kể nhất tới việc xác định lớp.

Khung đề xuất của chúng tôi chứng minh độ chính xác và AUC cao trong dự đoán đái tháo đường, và chúng tôi tin rằng nó cũng có thể được áp dụng cho các quần thể bệnh nhân khác. Bằng cách dùng các phương pháp này, chúng tôi đã phát triển một mô hình với ít đặc trưng hơn, điều đã đem lại độ chính xác tăng trong dự đoán đái tháo đường. Nghiên cứu của chúng tôi cung cấp các hiểu biết giá trị về việc phát triển một mô hình dự đoán đái tháo đường hiệu quả hơn, điều có thể đóng góp đáng kể vào sự hồi phục của các bệnh nhân đái tháo đường.

Tóm lại, nghiên cứu của chúng tôi làm nổi bật tầm quan trọng của lựa chọn đặc trưng và giảm chiều trong nghiên cứu chẩn đoán bệnh, và nhấn mạnh tiềm năng của các kỹ thuật này trong việc phát triển các mô hình dự đoán chính xác và hiệu quả. Các phát hiện của chúng tôi có thể đóng vai trò là một nguồn tài nguyên giá trị cho các nhà nghiên cứu và người thực hành trong lĩnh vực chẩn đoán và điều trị đái tháo đường, và có thể mở đường cho các nghiên cứu tương lai nhằm cải thiện độ chính xác và tính hiệu quả của các mô hình dự đoán đái tháo đường.

Bài báo này được tổ chức như sau. Mục "Methods" đề cập tới các phương pháp dùng trong nghiên cứu này, đặc biệt là sơ đồ luồng của mô hình đề xuất trong mục đó. Mục "Machine learning models" đề cập tới các mô hình học máy, đặc biệt là EMLM đề xuất trong mục đó. Mục "Evaluation metrics" mô tả các thước đo đánh giá (metrics) của các mô hình đề xuất trong bài báo này, và mục "Results" mô tả các kết quả của các thí nghiệm khác nhau được thực hiện. Cuối cùng, các thảo luận được đưa ra trong mục "Discussion and future work".

## Methods

## Dataset

Iraqi Patient Dataset for Diabetes (IPDD) [28] được thu thập từ 1000 mẫu, gồm 565 nam và 435 nữ tuổi 20-79, trong các lần khám sức khỏe nội viện tại Specialized Center for Endocrinology and Diabetes-Al-Kindy Teaching Hospital ở Iraq. Bộ dữ liệu này được chia thành ba vùng: Diabetic (Y) với 837 mẫu, Non-Diabetic (N) với 103 mẫu, và Predicted Diabetic (P) với 53 mẫu. Các vùng này bao gồm 11 chỉ số khám thể chất. Bảng 1 liệt kê các mô tả thuộc tính, và phân phối của mỗi thuộc tính trong bộ dữ liệu được trình bày trong Hình 1, nơi các phân phối màu xanh lá, xanh dương, và vàng lần lượt biểu thị các lớp đái tháo đường, không đái tháo đường, và đái tháo đường được dự đoán.

Bảng 1 Tổng quan về Iraqi Patient Dataset on Diabetes (IPDD)

| Thuộc tính                     | Mô tả                                                                                   | Mean ± Std.      |
|--------------------------------|-----------------------------------------------------------------------------------------|------------------|
| Gender                         | 0 for females and 1 for male                                                            | 0.565 ± 0.4958   |
| Age                            | Age in years                                                                            | 53.739 ± 8.8557  |
| Fasting blood sugar (FBS)      | result of a blood sample taken after a patient fasted for at least eight hours (mmol/l) | 10.1443 ± 5.0844 |
| High blood urea nitrogen (BUN) | BUN is the amount of urea nitrogen that's in your blood (mmol/l)                        | 5.1808 ± 3.3486  |
| Chromium (Cr)                  | blood levels of chromium (mmol/l)                                                       | 69.28 ± 62.2764  |
| Chol                           | Fast Cholesterol levels (mmol/l)                                                        | 4.9092 ± 2.004   |
| TG                             | Concentration Tri Glycoside Levels (mmol/l)                                             | 2.3506 ± 1.3988  |
| LDL                            | Low-Density Lipoprotein (mmol/l)                                                        | 2.6145 ± 1.1175  |
| HDL                            | High-Density Lipoprotein (mmol/l)                                                       | 1.2067 ± 0.6594  |
| BMI                            | Body Mass Index (Weight in kg / (Height in m) 2 )                                       | 29.4255 ± 4.8553 |
| Gyrated hemoglobin (HBA1C)     | For the previous two to three months, average blood glucose (sugar) levels (mmol/l)     | 8.2623 ± 2.5370  |

Hình 1 Phân phối quần thể của tất cả các thuộc tính của bộ dữ liệu Iraqi Patient dataset for Diabetes (IPDD), với các phân phối màu xanh lá, xanh dương, và vàng lần lượt biểu thị các lớp cá nhân đái tháo đường (Y), không đái tháo đường (N), và đái tháo đường được dự đoán (P)

## Khung đề xuất

Khung đề xuất trong nghiên cứu này được trình bày trong Hình 2, nơi tiền xử lý dữ liệu thô là một giai đoạn quan trọng trong pipeline, vì chất lượng dữ liệu có thể ảnh hưởng trực tiếp tới việc huấn luyện các bộ phân loại.

## Tiền xử lý dữ liệu

Theo khung đề xuất để dự đoán bệnh đái tháo đường trong nghiên cứu này (Hình 2), tiền xử lý dữ liệu là bước đầu tiên và quan trọng nhất vì nó có thể cải thiện chất lượng dữ liệu và chất lượng dữ liệu thu được có thể có tác động trực tiếp tới các mô hình phân loại học. Các bước tiền xử lý trong khung đề xuất bao gồm Loại bỏ Mẫu Trùng lặp, Chuyển đổi Thuộc tính, điền các giá trị thiếu hoặc

Hình 2 trình bày một mô hình tiềm năng cho dự đoán đái tháo đường đáng tin cậy và tự động

null (I), Chuẩn hóa (Normalization, N), Tiêu chuẩn hóa (Standardization, Z), và lựa chọn đặc trưng thuộc tính, được mô tả ngắn gọn như sau:

- Loại bỏ Mẫu Trùng lặp Trong nghiên cứu này, sau khi kiểm tra tất cả 1000 mẫu dữ liệu, chúng tôi kết luận rằng bảy trong số các mẫu này hoàn toàn giống nhau và do đó bị loại bỏ, còn lại 993 mẫu.
- Chuyển đổi Thuộc tính Vì, trong bộ dữ liệu của nghiên cứu này, các giá trị của các thuộc tính Gender và nhãn Class là các giá trị định tính (phi số), để dùng trong các mô hình, chúng tôi dùng các Phương trình (1) và (2), chuyển các giá trị của các thuộc tính này thành các giá trị số.

<!-- formula-not-decoded -->

<!-- formula-not-decoded -->

- Xử lý Giá trị Thiếu hoặc Null Các giá trị thiếu hoặc null là các giá trị có thể dẫn tới các dự đoán hoặc suy luận không chính xác cho mỗi lớp trong phân loại [29, 30], nên ở đây, một số nhỏ các giá trị thuộc tính được hoàn thành (giá trị thiếu) với sự tham vấn của một bác sĩ chuyên về nội tiết và chuyển hóa dùng phương pháp k-NN Imputation. Kết quả của quá trình này được trình bày trong Hình 3.
- Chuẩn hóa (Normalization) Chuẩn hóa dữ liệu là một yếu tố then chốt trong cải thiện hiệu năng của các thuật toán học máy [31]. Chuẩn hóa giúp giảm độ thiên lệch từ các đặc trưng có đóng góp số cao, đảm bảo xem xét công bằng mỗi biến trong quá trình học. Nó cũng nâng cao tính ổn định số, giảm thời gian huấn luyện, và tạo thuận lợi cho các so sánh đặc trưng có ý nghĩa. Vì một số thuộc tính liên tục trong dữ liệu có dải giá trị rộng, điều này có thể có tác động đáng kể tới hiệu năng của bộ phân loại. Để chuyển dải các đặc trưng liên tục về một khoảng [0,1], chúng tôi dùng chuẩn hóa min-max [32] như trong Phương trình (3).

<!-- formula-not-decoded -->

trong đó thuộc tính gốc và thuộc tính đã chuyển bằng xij và N ( xij ) .

- Tiêu chuẩn hóa (Standardization) Z-score [33] là một phương pháp tiêu chuẩn hóa dùng để chuyển các giá trị số thuộc tính liên tục thành các điểm chuẩn, với trung bình bằng không và độ lệch chuẩn bằng một. Công thức tiêu chuẩn hóa Z-score được trình bày trong Phương trình (4).

<!-- formula-not-decoded -->

Trung bình và độ lệch chuẩn của thuộc tính thứ j bằng xj và σ j tương ứng.

## k-fold cross-validation

K-fold Cross-Validation (kCV) là một cách tiếp cận thống kê dùng để đánh giá và so sánh tính hiệu quả của các bộ phân loại trong các thuật toán học máy. Nó chia dữ liệu thành hai phần: một để huấn luyện một mô hình và phần kia để kiểm định hoặc kiểm tra [34]. Trong kCV, dữ liệu được tách thành k đoạn (hoặc fold) bằng nhau (hoặc gần bằng nhau). Sau đó, k vòng lặp huấn luyện và kiểm định được thực hiện, mỗi vòng lặp dùng một fold khác nhau của dữ liệu để kiểm định và k-trừ-một fold còn lại để huấn luyện [35, 36]. Trong vòng lặp trong, nơi các thuật toán tối ưu siêu tham số (tối ưu Bayes và grid search) [37-39] được áp dụng, các siêu tham số được huấn luyện và tinh chỉnh dùng bốn fold. Dữ liệu kiểm tra được dùng để đánh giá mô hình trong vòng lặp ngoài dùng các siêu tham số tối ưu tìm được ở bước huấn luyện, được lặp lại năm lần (Hình 4).

## Lựa chọn đặc trưng

Các chiến lược lựa chọn đặc trưng có thể giúp giảm số thuộc tính và tránh dùng các đặc trưng dư thừa. Có nhiều phương pháp khác nhau cho lựa chọn đặc trưng và giảm chiều. Để giảm chiều và lựa chọn đặc trưng trong nghiên cứu này, chúng tôi dùng PCA và ICA và Maximum Relevance Minimum Redundancy (MRMR). Trong mục này, chúng tôi mô tả các phương pháp PCA và ICA cũng như MRMR. Ngoài ra, mã của các phương pháp này được bao gồm trong Additional file 1: Appendix 1A.

## PCA (principal component analysis)

Phân tích thành phần chính (PCA) [40] là một cách tiếp cận toán học để giảm chiều của dữ liệu bằng cách tìm và bảo toàn phần lớn nhất của biến thiên trong bộ dữ liệu bằng cách định nghĩa các hướng gọi là các Thành phần Chính (Principal Components). Thay vì một số lượng lớn các biến, mỗi mẫu có thể được biểu diễn bằng vài thành phần [18].

## ICA (independent component analysis)

Dữ liệu đa biến quan sát được, thường được trình bày như một cơ sở dữ liệu lớn các mẫu, được biến đổi thành một mô hình sinh (generative model) bởi ICA [41, 42]. Các biến dữ liệu trong mô hình được xem là các hỗn hợp tuyến tính của các biến tiềm ẩn chưa biết, cũng như hệ thống hỗn hợp. Các thành phần độc lập của dữ liệu quan sát được kỳ vọng là các biến tiềm ẩn phi-Gaussian và độc lập lẫn nhau. ICA có thể định vị các thành phần riêng biệt này, thường được gọi là các nguồn hoặc yếu tố. PCA và phân tích nhân tố có một mối quan hệ bề mặt với ICA. Khi các phương pháp truyền thống này thất bại, ICA là một phương pháp hiệu quả hơn nhiều có thể khám phá các nguyên nhân hoặc nguồn tiềm ẩn. Thuật toán FastICA được dùng trong nghiên cứu này [43, 44].

Hình 4 Việc phân chia bộ dữ liệu IPDD cho kCV cho cả việc tinh chỉnh siêu tham số và cho việc đánh giá

## MRMR (minimum redundancy maximum relevance)

Các đặc trưng nên có khoảng cách Euclid tối đa hoặc có các tương quan từng cặp càng thấp càng tốt. Các tiêu chuẩn Minimum Redundancy Maximum Relevance (MRMR), như thông tin tương hỗ cực đại và các kiểu hình mục tiêu, thường được dùng để bổ sung các chuẩn dư thừa tối thiểu. Lợi ích của điều này có thể đạt được theo hai cách. Thứ nhất, tập đặc trưng MRMR có thể có một kiểu hình mục tiêu đại diện hơn để tổng quát hóa lớn hơn với cùng số đặc trưng. Thứ hai, chúng ta có thể phủ hiệu quả cùng một không gian với một tập đặc trưng MRMR nhỏ hơn như chúng ta có thể với một tập đặc trưng thường lớn hơn bằng cách dùng một tập đặc trưng MRMR nhỏ hơn [45-48].

## Machine learning models

## Single models

Trong nghiên cứu này, chúng tôi dùng các Mô hình Học máy (MLM) phân loại khác nhau như k-NN [49, 50], multi-support vector machine Multi-Class SVM [51], DT [52], RF [53], Multi-Class AdaBoost [54-56], và GNB [57] để huấn luyện và kiểm tra khung đề xuất. Vì các biên lớp có thể chồng lấp, phân loại đa lớp có thể hoạt động kém hơn phân loại nhị phân. Có hai phương pháp để mở rộng các thuật toán phân loại nhị phân sang chế độ đa lớp được nghiên cứu: cách tiếp cận One-Vs-One (OVO) và kỹ thuật One-Vs-All (OVA). Tuy nhiên, các nghiên cứu thực nghiệm cho thấy cách tiếp cận OVO cho kết quả tốt hơn cách tiếp cận OVA [58]. Vì bài toán của chúng tôi trong nghiên cứu này là một phân loại đa lớp, chúng tôi dùng cách tiếp cận phân loại đa lớp OVO [59], tất cả đều là các mã giả (pseudo-code) trong Additional file 1: Appendix 1B.

Sau khi chọn MLM, chúng tôi tối ưu các siêu tham số của mô hình (xem Bảng 2) dùng các phương pháp tối ưu siêu tham số tối ưu Bayes và grid search cho bài toán mong muốn của chúng tôi.

## Tập hợp các mô hình học máy đề xuất (ensemble)

Trong các cộng đồng trí tuệ tính toán và học máy, các hệ thống đa-bộ-phân-loại, thường được gọi là các hệ thống ensemble, đã nhận được nhiều sự chú ý. Trong một dải rộng các lĩnh vực bài toán và các ứng dụng thực tế, các hệ thống ensemble đã chứng minh là cực kỳ thành công và linh hoạt; do đó sự chú ý này là xứng đáng [60-62]. Tập hợp các Mô hình Học máy (EMLM) là một cách tiếp cận nổi tiếng để cải thiện hiệu năng bằng cách nhóm một tập các bộ phân loại (đặc biệt ở đây nơi dữ liệu mất cân bằng) [63, 64]. Việc tổng hợp đầu ra từ các mô hình khác nhau có thể cải thiện độ chính xác của dự đoán [39]. Đối với một ensemble các MLM, đầu ra của mỗi MLM là một hàm Y = f j : X → R C gán C giá trị tin cậy Pi ∈ R cho một mẫu kiểm tra chưa thấy X , trong đó P e i ∈ [0, 1] cho i = 1, 2, . . . , C , và ∑ C i = 1 Pi = 1 , và j = 1, 2, 3, . . . , m là số MLM. (Trong trường hợp của chúng tôi, các giá trị P 1, P 2, và P 3 chỉ các giá trị tin cậy cho mỗi MLM). Trong nghiên cứu này, chúng tôi dùng một mô hình tổng hợp có trọng số trong đó tổng các độ tin cậy riêng lẻ được tính như:

Bảng 2 trình bày các MLM khác nhau với các siêu tham số có thể được tinh chỉnh trong vòng lặp trong dùng các cách tiếp cận tối ưu

| MLMs     | Siêu tham số                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| K-NN     | The number of neighbors to inspect in a k-NN Algorithm for computing nearest neighbors Ball Tree: A D-dimension hyper -parameter or ball is defined by Node KDTree: A D-dimension point is the Leaf node Brute: based on the search using brute-force The size of the leaf for BT or KDT is determined by the nature of the problem The distance metric to use for the tree [Manhattan ( L 1 - norm) or Euclidean ( L 2 - norm)]                 |
| SVM      | The type of kernel function (Linear, Polynomial, RBF, sigmoid) C : Penalty parameter (The C parameter controls how much you want to punish your model for each misclassified point for a given curve) Gama: Kernel coefficient (Gamma parameter in Radial basis function, polynomial, and sigmoid kernels, controls the distance of influence of a single training point) Decision _function_shape or multi-classification approach (OVA or OVO) |
| DT       | Criterion function: Gini (Gini impurity) or entropy (information gain) The method for selecting the split at each node The tree's maximum depth The bare minimum of samples is needed to split an internal node The bare minimum of samples is required at each leaf node. The total weights'minimum weighted fraction The number of features to take into account when looking for the ideal split                                              |
| RF       | The N of Decision Trees in the forest The Criteria which to split on at each node of the trees: (Gini or Entropy for classification) The maximum depth of the individual trees At an internal node, a minimal number of samples to divide on. Maximum number of leaf nodes Number of random features                                                                                                                                             |
| AdaBoost | The boosting algorithm Real boosting Discrete boosting Learning rate to shrink the contribution of each classifier The maximum number of estimators to terminate the boosting                                                                                                                                                                                                                                                                    |
| GNB      | Variance smoothing (the portion of the largest variance of all features)                                                                                                                                                                                                                                                                                                                                                                         |

<!-- formula-not-decoded -->

trong đó Pij ký hiệu độ tin cậy của MLMj rằng X (một mẫu kiểm tra chưa thấy) thuộc lớp ci và Aj là trọng số tương ứng với AUC theo cách tiếp cận OVO của MLM thứ j đó. Số hạng chuẩn hóa được dùng để chuyển các giá trị P EMLM i về một khoảng [0, 1] cho i = 1, 2, 3 sao cho ∑ 3 i = 1 P EMLM i = 1 . Đầu ra của mô hình ensemble, Y ∈ R C , có các giá trị tin cậy P EMLM i . Cuối cùng, mẫu kiểm tra chưa thấy X thuộc lớp có xác suất cực đại; Tức là, Ci , nếu P EMLM i = max ( Y = f ( X )) .

## Evaluation metrics

Trong nghiên cứu này, chúng tôi dùng nhiều thước đo khác nhau cho việc đánh giá Mô hình Phân loại Đa lớp để đo hiệu năng của các MLM [65, 66], như trình bày trong Bảng 3.

TN là viết tắt của True Negative, và nó chỉ số ca đã được chẩn đoán đúng là âm tính. TP là viết tắt của True Positive, và nó chỉ số ví dụ dương tính đã được phát hiện đúng. Các chữ FP là viết tắt của False Positive, chỉ số ca âm tính thực bị phân loại là dương tính; FN là viết tắt của False Negative, chỉ số ví dụ dương tính thực bị phân loại là âm tính; và k là viết tắt của tổng số lớp. Thay vì đưa ra các kết quả tuyệt đối, chúng tôi dùng Receiver Operating Characteristics (ROC) và diện tích dưới đường cong ROC (AUC) để xác định các dự đoán được đánh giá tốt thế nào.

Bảng 3 Tóm tắt tất cả các thước đo đo lường đánh giá hiệu năng của các mô hình phân loại Đa lớp

| Measures         | Definitions                                                                                                                                                 | Formula                                                                                                                                                     |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Average accuracy | The classifier's average per-class effectiveness                                                                                                            | ∑ k i = 1 tp i + tn i tp i + tn i + fp i + fn i k (8)                                                                                                       |
| Micro-averaging  |                                                                                                                                                             |                                                                                                                                                             |
| Precision        | The genuine class labels'average per-class agreement with the classifier's labels                                                                           | ∑ k i = 1 tp i ∑ k i = 1 tp i + fp i (9)                                                                                                                    |
| Recall           | A classifier's average per-class efficacy in identifying class labels                                                                                       | ∑ k i = 1 tp i ∑ k i = 1 ( tp i + fn i ) (10)                                                                                                               |
| F1-score         | The macro-average precision and recall's harmonic mean                                                                                                      | 2 × Precision × Recall Precision + Recall (11)                                                                                                              |
| ROC (AUC)        | Receiver operating characteristics (ROC) with the area under the ROC curve (AUC also measured the ranking of predictions rather than their absolute values) | Receiver operating characteristics (ROC) with the area under the ROC curve (AUC also measured the ranking of predictions rather than their absolute values) |

Bảng 4 minh họa MLM và tiền xử lý hoạt động tối ưu, cũng như các siêu tham số đã tinh chỉnh với AAC cao nhất

| MLMs     | Tiền xử lý hoạt động tối ưu          | Phương pháp tinh chỉnh siêu tham số | Siêu tham số tối ưu                                                                                                                   | Hiệu năng     |
|----------|-------------------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|---------------|
| k-NN     | I + N MRMR = 6                      | Grid search                      | Algorithm = auto leaf_size = 5 n_neighbors = 25 weight = uniform L 2 - norm (Euclidean)                                               | 0.971 ± 0.003 |
| SVM      | I + N                               | Bayesian optimization            | C = 1 Gamma = 0.1 Kernel = RBF Decision_function_shape = OVO                                                                          | 0.948 ± 0.003 |
| DT       | I + Z MRMR = 10                     | Bayesian optimization            | Criterion = gini bootstrap = True min_samples_leaf = 1 max_depth = 8 max_features = auto min_samples_leaf = 2 min_samples_split = 0.2 | 0.968 ± 0.003 |
| RF       | I + N MRMR = 6,8,10                 | Bayesian optimization            | Criterion = gini n_estimator = 150 bootstrap = True min_samples_leaf = 1 max_depth = 8 max_features = sqrt                            | 0.988 ± 0.003 |
| GNB      | I + Z + PCA = 12                    | Grid search                      | var_smoothing = 08112                                                                                                                 | 0.926 ± 0.006 |
| AdaBoost | I + MMR = 10                        | Grid search                      | boosting algorithm = AdaBoost.MH n_estimator = 150 learninh_rate = 0.1                                                                | 0.961 ± 0.003 |

## Results

Bảng 4 minh họa các kết quả định lượng cho việc chọn tiền xử lý và mô hình học máy hiệu quả nhất, với độ chính xác trung bình (AAC) và độ lệch chuẩn được trình bày để so sánh. Khả năng của mỗi mô hình đạt AAC tối ưu

Bảng 5 Kết quả của thí nghiệm thứ nhất theo AAC cho các MLM, dùng tất cả các đặc trưng trong các chế độ tổ hợp tiền xử lý khác nhau

| BestMLM       | RF                    | RF                          | RF                          |
|---------------|-----------------------|-----------------------------|-----------------------------|
| AdaBoost      | 0.961 ± 0.001         | 0.960 ± 0.002               | 0.962 ± 0.002               |
| GNB           | 0.920 ± 0.000         | 0.957 ± 0.001               | 0.958 ± 0.002               |
| RF            | ± 0.001 0.974 ± 0.001 | 0.929 ± 0.004 0.975 ± 0.002 | 0.964 ± 0.003 0.978 ± 0.003 |
| DT            | 01 0.964              | 03                          | 02                          |
| SVM           | ± 0.0 00 0.960        | ± 0.004 0.964               | ± 0.002 0.968               |
| k-NN          | 11 0.928              | 0.962                       | 0.960                       |
| N             |                       | 11                          | 11                          |
| Preprocessing | I                     | I + N                       | I + Z                       |

Bảng 6 Kết quả của thí nghiệm thứ hai theo AAC cho các MLM, dùng thuật toán lựa chọn đặc trưng MRMR trong các chế độ tổ hợp tiền xử lý khác nhau

| BestMLM       | RF                  | RF            | RF             | RF                           | RF            | RF          | RF            | RF          | RF                | RF              | RF            | RF            | RF            | RF            | RF            | RF            | RF            | RF            | RF            |
|---------------|---------------------|---------------|----------------|------------------------------|---------------|-------------|---------------|-------------|-------------------|-----------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|---------------|
|               | 0.001               |               | 0.002          | 0.002                        | 0.002         | 0.002       | 0.003         | 0.003       |                   | 2               | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         |
|               | 0.002               |               |                |                              |               |             |               |             | 0.001             | 0.00            |               |               |               |               |               |               |               |               |               |
| AdaBoost      | ±                   | ±             | ±              | ±                            | ±             | ±           | ±             | ±           | ±                 | ±               | ±             | ±             | ±             | ±             | ±             | ±             | ±             | ±             | ±             |
|               | 0.940               | 0.950         | 0.954          | 0.961                        | 0.940         | 0.952       | 0.944         | 0.946       | 0.942             | 0.940           | 0.943         | 0.945         | 0.945         | 0.945         | 0.945         | 0.945         | 0.945         | 0.945         | 0.945         |
|               |                     |               |                |                              |               |             |               | 0.003       | 0.001             |                 |               |               |               |               |               |               |               |               |               |
| GNB           | 0.922 ± 0.001 0.936 | ± 0.002       | 0.940 ± 0.002  | 0.946                        | ± 0.002       | ± 0.950 ±   | 0.952 ± 0.003 | ± 0.956 ±   | 0.931 ± ± 0.960 ± | ± 0.962 ± 0.001 | 0.964 ± 0.003 |               |               |               |               |               |               |               |               |
| N k-NN        | 0.931 ±             | 0.941         | 0.930          | ± 0.002                      | 0.948 ±       | 0.002       | 8             | 10 0.958    | 4 0.940           | 6               | 8             | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       |
|               | 4                   | 6             | 8              | 0.962 ± 0.002 0.985 ± 0.00 2 | 2             |             |               |             |                   |                 |               | 0.916 ± 0.003 | 0.916 ± 0.003 | 0.916 ± 0.003 | 0.916 ± 0.003 | 0.916 ± 0.003 | 0.916 ± 0.003 | 0.916 ± 0.003 | 0.916 ± 0.003 |
|               |                     | MRMR          |                |                              | 4             | 6           |               |             | MRMR              | MRMR            | MRMR          |               |               |               |               |               |               |               |               |
| Algorithm     | MRMR                |               |                |                              | MRMR          |             | MRMR          | MRMR        |                   |                 |               |               |               |               |               |               |               |               |               |
|               |                     |               |                |                              |               | MRMR        |               |             |                   |                 |               |               |               |               |               |               |               |               |               |
|               |                     |               |                | MRMR                         |               |             |               |             |                   |                 |               |               |               |               |               |               |               |               |               |
|               | 0.981 ± 0.001       | ± 0.00 2      | 0.986 ± 0.00 2 |                              | ± 0.00        | ± 0.00 2    | ± 0.00 3      | 3           | 1                 | ± 0.00 2        | ± 0.00 2      | ± 0.002       | ± 0.002       | ± 0.002       | ± 0.002       | ± 0.002       | ± 0.002       | ± 0.002       | ± 0.002       |
|               |                     |               |                |                              |               |             |               | 0.971       | ± 0.00            |                 |               |               |               |               |               |               |               |               |               |
| RF            |                     | 0.986         |                |                              |               |             |               | ± 0.00      |                   | 0.984           | 0.976         | 0.977         | 0.977         | 0.977         | 0.977         | 0.977         | 0.977         | 0.977         | 0.977         |
|               | 0.916 ± 0.001       | 0.963 ± 0.002 | 0.950 ± 0.002  |                              | 0.002 0.981   | 0.002 0.985 | 0.003 0.986   | 0.003 0.988 | 0.001 0.972       | 0.002           | 0.002         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         | 0.003         |
| DT            | 0.001               |               | 0.002          |                              | 0.944         | 0.935       | 0.931 ±       | ± 0.003     | ± 0.001           | 0.947           | 0.948 ±       |               |               |               |               |               |               |               |               |
| SVM           | 0.920 ±             | ± 0.002       | 0.928 ±        | 0.932 ± 0.002                | 0.940 ± 0.002 | ± 0.002     | ± 0.003       | 0.948       |                   | ± 0.002         | ± 0.002       |               |               |               |               |               |               |               |               |
|               |                     | 0.924         |                |                              | 0.001         | 0.944       | 0.931         | 0.003       | 0.913             | 0.920           | 0.930         |               |               |               |               |               |               |               |               |
|               | 0.001               | ± 0.002       | ± 0.002        | ± 0.002                      | ±             | 0.002       | 0.964 ± 0.003 | ±           | 0.001             | ± 0.002         | ± 0.002       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       | ± 0.003       |
|               |                     |               |                | 0.914                        |               | 0.958 ±     |               |             |                   | 0.930           | 0.930         |               |               |               |               |               |               |               |               |
|               |                     |               |                | 10                           | 0.969         |             |               |             |                   |                 |               | 10 0.924      | 10 0.924      | 10 0.924      | 10 0.924      | 10 0.924      | 10 0.924      | 10 0.924      | 10 0.924      |
|               |                     |               |                |                              |               |             |               |             |                   |                 |               | MRMR          | MRMR          | MRMR          | MRMR          | MRMR          | MRMR          | MRMR          | MRMR          |
|               |                     |               | MRMR           |                              |               |             |               |             |                   |                 |               |               |               |               |               |               |               |               |               |
|               |                     |               |                |                              |               |             |               |             | Z                 |                 |               |               |               |               |               |               |               |               |               |
| Preprocessing | I                   |               |                |                              | I             |             |               |             | I                 |                 |               |               |               |               |               |               |               |               |               |
|               |                     |               |                |                              | N             |             |               |             |                   |                 |               |               |               |               |               |               |               |               |               |
|               |                     |               |                |                              | +             |             |               |             |                   |                 |               |               |               |               |               |               |               |               |               |
|               |                     |               |                |                              |               |             |               |             | +                 |                 |               |               |               |               |               |               |               |               |               |

Bảng 7 Kết quả của thí nghiệm thứ hai theo AAC cho các MLM, dùng thuật toán giảm chiều PCA trong các trường hợp tổ hợp tiền xử lý khác nhau

| RF      | RF      | GNB     | GNB     | GNB     | GNB     |
|---------|---------|---------|---------|---------|---------|
| 0.001   | 0.002   | 0.003   | 0.001   | 0.005   | 0.006   |
| ±       | ±       | ±       | ±       | ±       | ±       |
| 0.854   | 0.900   | 0.914   | 0.918   | 0.920   | 0.926   |
| 0.002   | 0.004   | 0.001   | 0.002   | 0.002   | 0.001   |
| ±       | ±       | ±       | 0.974 ± | ±       |         |
| 0.962   |         |         |         |         | ±       |
|         | 0.966   | 0.971   |         | 0.972   |         |
|         |         |         |         |         | 0.977   |
| ± 0.003 | ± 0.003 | ± 0.003 | ± 0.003 | ±       | 0.001   |
|         |         |         |         | 0.002   | ±       |
| 0.968   |         |         |         |         |         |
|         | 0.960   | 0.964   | 0.962   | 0.970   | 0.964   |
| ± 0.001 | ± 0.002 | ± 0.001 | ± 0.003 | ± 0.004 | ± 0.005 |
| 0.934   | 0.953   | 0.952   | 0.820   | 0.867   | 0.901   |
| ± 0.001 |         |         | 0.005   | 0.004   |         |
|         |         |         |         |         | 0.006   |
|         | 0.002   | 0.003   |         | ±       |         |
|         | ±       | ±       | ±       |         | ±       |
| 0.900   |         |         | 0.910   | 0.914   |         |
|         | 0.902   | 0.908   |         |         | 0.919   |
| 0.030   | 0.034   |         | 0.004   | 0.001   | 0.0 20  |
| ±       |         | 0.008   |         | ±       | ±       |
| 0.754   | ±       | ±       | 0.826 ± | 0.829   | 0.830   |
|         | 0.757   | 0.817   |         |         |         |
|         |         |         |         | 11      |         |
| 10      | 11      | 12      | 10      |         | 12      |
| PCA     | PCA     | PCA     |         | PCA     |         |
|         |         |         | PCA     |         | PCA     |
| + N     |         |         | + Z     |         |         |

| OptimalMLM    | RF      | GNB     | GNB     | GNB     |
|---------------|---------|---------|---------|---------|
|               |         | 0.003   | 0.004   | 0.003   |
|               | 0.002   |         |         |         |
|               | ±       | ±       | ±       | ±       |
| AdaBoost      | 0.930   | 0.931   | 0.938   | 0.941   |
|               | 0.003   | 0.002   | 0.001   | 0.003   |
|               | ±       | ±       | ±       | ±       |
| GNB           | 0.951   | 0.957   | 0.962   | 0.966   |
|               | 0.010   | 0.010   | 0.005   | 0.003   |
| RF            | ±       | 0.958   | 0.956 ± | ±       |
|               | 0.951   |         |         |         |
|               |         | ±       |         | 0.961   |
|               | 0.004   |         | 0.002   | ± 0.006 |
| DT            | 0.950 ± | ± 0.005 | 0.959 ± | 0.961   |
|               |         | 0.956   |         |         |
|               |         |         | 0.004   | 0.004   |
|               | 0.010   | 0.010   | ±       | ±       |
|               | ±       | ±       |         |         |
| SVM           | 0.890   | 0.900   | 0.908   | 0.910   |
|               |         |         | 0.014   |         |
|               | 0.011   | 0.012   |         | 0.011   |
|               | ±       | ±       | ±       | ±       |
|               |         | 0.867   | 0.880   | 0.892   |
| k-NN          | 0.826   |         |         |         |
| N             |         |         |         |         |
|               |         |         | 4       |         |
|               |         | 5       |         |         |
|               | 4       |         |         | 5       |
|               | ICA     | ICA     |         |         |
| Algorithm     |         |         | ICA     | ICA     |
|               | I       |         | I +     |         |
|               | N       |         | Z       |         |
| Preprocessing |         | +       |         |         |

dùng pipeline đề xuất được tóm tắt trong Bảng 4, cùng với kỹ thuật tiền xử lý và lựa chọn đặc trưng hiệu quả, cũng như số thuộc tính được chọn. Các siêu tham số được tinh chỉnh tối ưu dùng các phương pháp tối ưu siêu tham số cũng được trình bày trong Bảng 4.

Các Bảng 5, 6, 7 và 8 cho thấy rằng dùng tiền xử lý thích hợp có thể cải thiện kết quả của các mô hình khác nhau.

Như có thể thấy, chúng tôi dùng bốn thí nghiệm khác nhau và tích hợp để so sánh các MLM phân loại (Bảng 5, 6, 7 và 8). Khi mười một đặc trưng được dùng, tất cả các bộ phân loại cho thấy hiệu năng tối ưu cho việc điền giá trị thiếu (I) và tiêu chuẩn hóa (Z) (Bảng 5). Theo Bảng 5, thí nghiệm thứ nhất cho thấy bộ phân loại RF vượt trội các bộ phân loại khác khi dùng tất cả các đặc trưng với các tổ hợp tiền xử lý dữ liệu khác nhau. Với tiền xử lý I + N, bộ phân loại k-NN thể hiện AAC cao nhất so với các phương pháp tiền xử lý khác cho bộ phân loại này. Tương tự, các bộ phân loại SVM, DT, GNB, và AB đạt AAC cao nhất dùng tiền xử lý I + Z, vượt các kỹ thuật tiền xử lý khác.

Trong thí nghiệm thứ hai (Bảng 6) và dùng MRMR (với 10 đặc trưng) để chọn các đặc trưng của bộ phân loại k-NN trong trường hợp tiền xử lý I + N, nó có AAC cao nhất so với các tiền xử lý khác cho bộ phân loại này. Trong thí nghiệm này, bộ phân loại SVM cũng có AAC cao nhất so với các tiền xử lý khác và lựa chọn đặc trưng bằng MRMR cho thuật toán này bằng cách chọn 10 đặc trưng bằng MRMR và dùng I + N. Các bộ phân loại DT, GNB, và AB cũng lần lượt có giá trị AAC cao nhất với tiền xử lý I + Z, I + Z, và I và số đặc trưng bằng 10, 10, và 8 trong thí nghiệm này so với các tiền xử lý khác và số đặc trưng được chọn bằng MRMR. Tuy nhiên, đối với bộ phân loại RF, trong thí nghiệm này, việc dùng tiền xử lý I + N 10 đặc trưng thu được giá trị AAC cao nhất so với tất cả các trạng thái khác của thí nghiệm này và được chọn làm bộ phân loại tối ưu trong thí nghiệm này.

Theo Bảng 7, như bạn có thể thấy, dùng PCA để giảm chiều trong ba trường hợp với phương sai giải thích bằng 90%, 95%, và 98%, và với tất cả các trường hợp tiền xử lý khác nhau không cải thiện giá trị AAC so với các thí nghiệm khác. Do đó, trong dữ liệu này, không thích hợp dùng PCA để giảm chiều (trong thí nghiệm thứ ba).

Cuối cùng, trong thí nghiệm thứ tư, dùng ICA với năm thành phần và tiền xử lý I + Z, các bộ phân loại khác nhau được tối ưu về hiệu năng, và các giá trị AAC được tối ưu hơn so với các thí nghiệm khác. Trong tất cả các bộ phân loại, GNB có thể hoạt động tối ưu về hiệu năng AAC (Bảng 8). Vì GNB nhạy với hình dạng phân phối và giả định rằng dữ liệu được rút ra từ một phân phối chuẩn, chúng tôi quan sát trong tất cả các thí nghiệm rằng, sau khi tiêu chuẩn hóa giá trị ngoại lai, hiệu năng AAC của bộ phân loại này cũng tăng (Bảng 5, 6, 7 và 8).

Hình 5 so sánh trực quan các kết quả tối ưu của mỗi trong bốn thí nghiệm. Hình 5a cho thấy rằng, trong thí nghiệm thứ nhất với 11 đặc trưng, bộ phân loại RF với tiền xử lý I + Z hoạt động thành công hơn so với các trường hợp khác. Phần b của Hình 5 cũng cho thấy rằng, trong thí nghiệm thứ hai, bộ phân loại RF và việc chọn 6, 8, và 10

Hình 5 So sánh các MLM khác nhau theo AAC trong 4 thí nghiệm. a So sánh các MLM khác nhau theo AAC dùng tất cả các đặc trưng. b So sánh các MLM khác nhau theo AAC dùng lựa chọn đặc trưng MRMR. c So sánh các MLM khác nhau theo AAC và PCA. d So sánh các MLM khác nhau theo AAC và ICA

đặc trưng dùng MRMR và tiền xử lý I + N hoạt động tốt hơn về AAC so với các trường hợp khác. Phần c cũng cho thấy các kết quả của thí nghiệm thứ ba, vốn dùng PCA để giảm chiều, rằng bộ phân loại GNB với PCA, một giá trị phương sai 98%, và tiền xử lý I + Z cung cấp hiệu năng tốt hơn các trường hợp khác. Cuối cùng, phần d cũng cho thấy các kết quả của việc dùng ICA, và trong trường hợp này, bộ phân loại GNB với ICA, một số thành phần là 5, và tiền xử lý I + Z có giá trị AAC cao nhất so với các trường hợp khác.

Tiền xử lý tối ưu từ Bảng 4 được dùng trong thí nghiệm này. Sự kết hợp của sáu MLM cung cấp vài EMLM. Bảng 9 cho thấy EMLM hoạt động tối ưu với hai, ba, bốn, năm, và sáu mô hình cơ sở, cũng như các kết quả của chúng. Như trình bày trong Bảng 9, sự kết hợp của K-NN, AB, DT, RF, và tiền xử lý I đem lại các kết quả cao nhất cho dự đoán đái tháo đường trên tất cả các thước đo đánh giá hiệu năng. Biểu đồ cột AUC của các EMLM tối ưu được trình bày trong Hình 6a. Đường cong của Hình 6b cho thấy mô hình EMLM tối ưu theo AUC.

Cuối cùng, như trình bày trong Bảng 10, sự kết hợp của K-NN, AB, DT, và RF cho các kết quả cao nhất cho dự đoán đái tháo đường trong tất cả các tiêu chí đánh giá hiệu năng so với các mô hình duy nhất được trình bày trên bộ dữ liệu PIDD (mô hình Hybrid được trình bày bởi Soukaena Hassan và cộng sự [67]). Ngoài ra, các biểu đồ cột trình bày trong Hình 7 so sánh đồ họa hai mô hình này với nhau theo các tiêu chí đánh giá độ chính xác.

Bảng 9 Hiệu năng so sánh của các mô hình học máy ensemble trên các thước đo micro-averaging khác nhau

| AUC       | 0.974 ± 0.002   | 0.965 ± 0.006   | 0.999 ± 0.000   | 0.988 ± 0.001   | 0.980 ± 0.004   |
|-----------|-----------------|-----------------|-----------------|-----------------|-----------------|
| Accuracy  | ± 0.0001        | ± 0.0000        | ± 0.0007        | 0.998 ± 0.0003  | ± 0.0003        |
| F1-Score  | 0.877 ± 0.002   | 0.870 ± 0.410   | 0.985 ± 0.001   | 0.897 ± 0.010   | 0.910 ± 0.001   |
| Recall    | 0.857 ±         | 0.870 ± 0.00    | 0.979 ±         | 0.873 ± 0.006   |                 |
| Precision | 0.910 ± 0.002   | 0.903 ± 0.002   | 0.986 ± 0.001   | 0.940 ± 0.002   | 0.940 ± 0.002   |
|           |                 |                 |                 | AB              | AB + SVM        |
|           |                 |                 | 0.998           |                 | 0.998           |
|           |                 | 0.998           |                 |                 |                 |
|           | 0.996           |                 |                 |                 |                 |
|           |                 |                 |                 |                 | 0.903 ± 0.160   |
|           |                 | 5               | 0.002           |                 |                 |
|           | 0.002           |                 |                 |                 |                 |
|           |                 |                 | + RF            | RF DT           | + + + RF + DT + |
|           |                 | + RF            |                 | +               |                 |
|           | + RF            |                 | DT              |                 |                 |
|           |                 | GNB             |                 | GNB             |                 |
|           |                 | +               | AB +            |                 | GNB             |
|           |                 |                 |                 | +               | +               |
|           | K-NN            |                 | +               |                 |                 |
|           | +               | K-NN            |                 | K-NN            |                 |
|           |                 |                 | K-NN            |                 |                 |
|           | N               |                 |                 | +               |                 |
| EMLMs     |                 |                 |                 |                 |                 |
|           | +               |                 | +               | I               | K-NN            |
|           | I               | I +             | I               |                 | I +             |

Hình 6 Hiệu năng so sánh của các a MLM đề xuất khác nhau, và b đường cong ROC của EMLM đề xuất tối ưu của chúng tôi. a Hiệu năng so sánh của các EMLM đề xuất khác nhau. b Đường cong ROC của EMLM đề xuất tối ưu của chúng tôi

Bảng 10 So sánh các mô hình dự đoán đái tháo đường theo tiêu chí hiệu năng ACC

| Nhà nghiên cứu              | Mô hình đề xuất                                                                       |   ACC (%) |
|-----------------------------|---------------------------------------------------------------------------------------|-----------|
| Soukaena Hassan et al. [67] | Designing a diabetes Hybrid diagnosis system by combining KNN, and ID3 algorithms (I) |     98.25 |
| Current study               | Combination of K-NN, AB, DT, and RF classification models (I)                         |     99.87 |

## Discussion and future work

Đái tháo đường là một tình trạng mạn tính ảnh hưởng đáng kể tới chất lượng cuộc sống của các cá nhân, nhấn mạnh nhu cầu thiết yếu về các phương pháp dự đoán chính xác trong việc quản lý và phòng ngừa nó. Trong nghiên cứu của chúng tôi, chúng tôi đi sâu vào phân tích và diễn giải các kết quả thu được từ các mô hình học máy ensemble của chúng tôi, vốn được thiết kế để dự đoán đái tháo đường dùng bộ dữ liệu IPDD. Chúng tôi cũng khám phá các hàm ý của các phát hiện của chúng tôi, thảo luận các hạn chế của nghiên cứu, và cung cấp các khuyến nghị cho nghiên cứu tương lai.

Đóng góp chính của nghiên cứu này nằm ở việc giới thiệu một khung dựa trên pipeline của các mô hình học máy đa lớp cho dự đoán đái tháo đường. Khung dùng bộ dữ liệu IPDD, vốn bao gồm ba nhóm riêng biệt: các đối tượng đái tháo đường (Y), các đối tượng không đái tháo đường (N), và các đối tượng đái tháo đường được dự đoán (P). Bản chất sáng tạo của khung này nằm ở khả năng phân loại hiệu quả các cá nhân vào các phạm trù này, qua đó nâng cao hiểu biết của chúng ta về dự đoán đái tháo đường. Cách tiếp cận này giải quyết bài toán phân loại đa lớp và đảm bảo một đánh giá toàn diện về hiệu năng bằng cách dùng nhiều thước đo đánh giá để định lượng tính hiệu quả của các mô hình đề xuất của chúng tôi. Tiền xử lý dữ liệu đóng vai trò sống còn trong nâng cao độ chính xác và tính hiệu quả của các mô hình dự đoán. Trong mô hình đề xuất của chúng tôi, chúng tôi dùng vài kỹ thuật tiền xử lý, như điền giá trị thiếu, tiêu chuẩn hóa, chuẩn hóa, lựa chọn đặc trưng, và giảm chiều. Các kỹ thuật này được triển khai để chuẩn bị tỉ mỉ dữ liệu, cải thiện hiệu năng mô hình, và giảm nhẹ tác động của dữ liệu không đầy đủ hoặc không nhất quán. Các kết quả của nghiên cứu của chúng tôi nhấn mạnh tầm quan trọng của tiền xử lý dữ liệu trong việc đạt các dự đoán chính xác cho đái tháo đường. Bằng cách tận dụng trí tuệ tập thể của nhiều bộ phân loại riêng lẻ, cách tiếp cận ensemble của chúng tôi chứng minh tính hiệu quả của nó qua hiệu năng tổng thể và độ chính xác được cải thiện trong dự đoán đái tháo đường. Cách tiếp cận này giải quyết các độ thiên lệch và lỗi vốn có trong các bộ phân loại riêng lẻ, điều đặc biệt quan trọng xét các thách thức do dữ liệu mất cân bằng và các giá trị thuộc tính thiếu trong dự đoán đái tháo đường. Các thí nghiệm của chúng tôi liên tục cho thấy rằng mô hình random forest, kết hợp với các giai đoạn tiền xử lý dữ liệu MRMR và I + N, vượt trội các mô hình khác. Điều này làm nổi bật tầm quan trọng của các kỹ thuật lựa chọn đặc trưng và giảm chiều trong nâng cao độ chính xác dự đoán đái tháo đường. Việc dùng lựa chọn đặc trưng MRMR và các phương pháp giảm chiều PCA/ICA cho phép xác định các đặc trưng then chốt ảnh hưởng đáng kể tới việc xác định lớp. Hơn nữa, kết hợp các mô hình K-NN, AB, DT, và RF với 11 đặc trưng và tiền xử lý I thể hiện hiệu năng vượt trội trong dự đoán đái tháo đường trong bộ dữ liệu IPDD. Điều này nhấn mạnh tầm quan trọng của việc dùng một tập đa dạng các mô hình học máy trong một cách tiếp cận ensemble để nâng cao độ chính xác dự đoán. Bằng cách khai thác các điểm mạnh của các mô hình này, chúng tôi đạt các dự đoán bền vững và đáng tin cậy hơn. Điều quan trọng cần lưu ý là việc đánh giá các mô hình của chúng tôi không chỉ dựa trên độ chính xác do bản chất mất cân bằng của bộ dữ liệu. Thay vào đó, chúng tôi dùng nhiều thước đo đánh giá, bao gồm diện tích dưới đường cong ROC (AUC), để cung cấp một đánh giá toàn diện về hiệu năng mô hình. AUC đặc biệt phù hợp cho các bộ dữ liệu mất cân bằng vì nó xét đến sự đánh đổi giữa true positive rate và false positive rate, đem lại một biểu diễn chính xác hơn về sức mạnh dự đoán của mô hình. Mặc dù đem lại các kết quả đầy hứa hẹn, nghiên cứu của chúng tôi có một số hạn chế. Thứ nhất, bộ dữ liệu IPDD dùng trong nghiên cứu của chúng tôi có thể có các độ thiên lệch và hạn chế vốn có có thể ảnh hưởng tới khả năng tổng quát hóa của các phát hiện của chúng tôi cho các quần thể khác. Các nghiên cứu tương lai nên xem xét việc kết hợp các bộ dữ liệu từ các quần thể bệnh nhân đa dạng để kiểm chứng tính hiệu quả của các mô hình đề xuất của chúng tôi. Thứ hai, mặc dù chúng tôi dùng nhiều kỹ thuật tiền xử lý dữ liệu, có thể có các cách tiếp cận thay thế có thể tối ưu hơn nữa hiệu năng của các mô hình của chúng tôi. Khám phá các kỹ thuật tiền xử lý thay thế và so sánh tính hiệu quả của chúng có thể là một hướng giá trị cho nghiên cứu tương lai. Các mô hình ensemble có các hạn chế của chúng, bao gồm độ phức tạp mô hình tăng, thời gian huấn luyện và kiểm tra dài hơn, và yêu cầu dữ liệu toàn diện cho việc xây dựng và cấu hình mô hình. Ngoài ra, việc diễn giải các kết quả từ các mô hình này có thể là một thách thức do độ phức tạp của chúng qua các bộ dữ liệu khác nhau, có khả năng dẫn tới các kết cục không kết luận được. Do đó, trước khi dùng các mô hình này, một sự kiểm tra tỉ mỉ và phân tích sâu về các đặc trưng, kích thước dữ liệu, và các khía cạnh khác của chúng là bắt buộc.

Tóm lại, nghiên cứu của chúng tôi chứng minh tiềm năng của các mô hình học máy ensemble, cùng với các kỹ thuật tiền xử lý dữ liệu toàn diện, trong việc dự đoán chính xác đái tháo đường dùng bộ dữ liệu IPDD. Các kết quả làm nổi bật tầm quan trọng của lựa chọn đặc trưng và giảm chiều trong cải thiện độ chính xác dự đoán. Các mô hình đề xuất của chúng tôi đem lại một cách tiếp cận đầy hứa hẹn cho dự đoán đái tháo đường bằng cách giải quyết các thách thức do dữ liệu mất cân bằng và các giá trị thuộc tính thiếu. Các phát hiện của nghiên cứu này đóng góp vào lĩnh vực chẩn đoán và điều trị đái tháo đường, cung cấp các hiểu biết giá trị cho các nhà nghiên cứu và người thực hành. Nghiên cứu tương lai của chúng tôi sẽ tập trung vào việc kiểm chứng các mô hình của chúng tôi với các bộ dữ liệu lớn hơn và đa dạng hơn, khảo sát các kỹ thuật tiền xử lý bổ sung để nâng cao hiệu năng của các mô hình dự đoán đái tháo đường, cũng như khám phá các phương pháp mới cho phát hiện sớm bệnh COVID-19 và các ứng dụng trong tính toán di động và sản xuất cho chẩn đoán bệnh sớm toàn diện.

## Supplementary Information

The online version contains supplementary material available at https://  doi.  org/  10.  1186/  s12859-  023-  05465-z.

Additional file 1. Appendix for diabetes disease predication, (a) algorithms for reduce dimensionality and feature selection and (b) MLMs.

## Acknowledgements

Authors would like to express our sincere gratitude to Dr. Silva Hovsepian, Assistant Professor of Metabolic Liver Diseases Research Center at Isfahan University of Medical Sciences, for her invaluable guidance and expertise in the medical aspects of this work. Her contributions were instrumental in shaping the direction of our research, and we are truly grateful for her support. Thank you, Dr. Hovsepian!

## Author contributions

KA and RF conceived the method. KA developed the algorithm and performed the simulations. KA, RF, and MHB analyzed the results and wrote the paper. All authors read and approved the final manuscript.

## Funding

Not applicable.

## Availability of data and materials

Data were used from a publicly available dataset [28] (https://  data.  mende  ley.  com/  datas  ets/  wj9rw  kp9c2/1) (Note: Of course, it should be noted that the data set in this link does not have the attribute value FBS. Through correspondence with the person responsible for this dataset [67] we obtained the values of this feature and added it to the dataset).

## Declarations

## Ethics approval and consent to participate

Not applicable.

## Consent for publication

Not applicable.

## Competing interests

The authors declare no competing interests.

Received: 30 March 2023   Accepted: 4 September 2023 Published: 12 September 2023

## References

1. Goodman RA, Posner SF, Huang ES, Parekh AK, Koh HKJ. Peer reviewed: defining and measuring chronic conditions: imperatives for research, policy, program, and practice. Prev Chronic Dis. 2013;10:E66.
2. Casey R, Ballantyne PJ. Diagnosed chronic health conditions among injured workers with permanent impairments and the general population. J Occup Environ Med. 2017;59(5):486-96.
3. Tan MHP, Ong SC, Vasan Thakumar A, Mustafa NJR. Quantifying health-related quality of life in Malaysian type 2 diabetes: focusing on complication types and severity. Qual Life Res. 2023;32:1-17.
4. Chhim S, et al. Healthcare usage and expenditure among people with type 2 diabetes and/or hypertension in Cambodia: results from a cross-sectional survey. BMJ Open. 2023;13(1):e061959.

5. Skyler JS, et al. Differentiation of diabetes by pathophysiology, natural history, and prognosis. Diabetes. 2017;66(2):241-55.
6. Falvo D, Holland BE. Medical and psychosocial aspects of chronic illness and disability. Jones &amp; Bartlett Learning; 2017.
7. Pandeeswari L, et al. K-means clustering and Naïve Bayes classifier for categorization of diabetes patients. Eng Technol. 2015;2(1):179-85.
8. Sahoo P, Bhuyan P. Primitive diabetes prediction using machine learning models: an empirical investigation. J Comput Math Educ. 2021;12:229-36.
9. Teju V, et al. Detection of diabetes melittus, kidney disease with ML. In: 2021 3rd international conference on advances in computing, communication control and networking (ICAC3N), 2021, pp. 217-222: IEEE.
10. Shah K, Punjabi R, Shah P . Real time diabetes prediction using naïve bayes classifier on big data of healthcare. Int Res J Eng Technol. 2020;7(5):102-7.
11. Halpern A, et al. (2010) Metabolic syndrome, dyslipidemia, hypertension and type 2 diabetes in youth: from diagnosis to treatment. Diabetol Metab Syndr. 2010;2(1):1-20.
12. Chaudhury A, et al. Clinical review of antidiabetic drugs: implications for type 2 diabetes mellitus management. Front Endocrinol. 2017;8:6.
13. Alam TM, et al. A model for early prediction of diabetes. Inf Med Unlock. 2019;16:100204.
14. Ahsan MM, Siddique Z. Machine learning-based heart disease diagnosis: a systematic literature review. Artif Intell Med. 2022;128:102289.
15. Muhammad L, Algehyne EA, Usman SS, Ahmad A, Chakraborty C, Mohammed IA. Supervised machine learning models for prediction of COVID-19 infection using epidemiology dataset. SN Comput Sci. 2021;2:1-13.
16. Dash TK, Chakraborty C, Mahapatra S, Panda G. Gradient boosting machine and efficient combination of features for speech-based detection of COVID-19. J Biomed Health Inf. 2022;26(11):5364-71.
17. Kishor A, Chakraborty C. Early and accurate prediction of diabetics based on FCBF feature selection and SMOTE. Int J Syst Assur Eng Manag. 2021;1-9:2021.
18. Zou Q, Qu K, Luo Y, Yin D, Ju Y, Tang H. Predicting diabetes mellitus with machine learning techniques. Front Genet. 2018;9:515.
19. Chen P, Pan C. Diabetes classification model based on boosting algorithms. BMC Bioinf. 2018;19:1-9.
20. Zhu C, Idemudia CU, Feng W. Improved logistic regression model for diabetes prediction by integrating PCA and K-means techniques. Inf Med Unlock. 2019;17:100179.
21. Lukmanto RB, Nugroho A, Akbar H. Early detection of diabetes mellitus using feature selection and fuzzy support vector machine. Proc Comput Sci. 2019;157:46-54.
22. Raja JB, Pandian S. PSO-FCM based data mining model to predict diabetic disease. Comput Methods Progr Biomed. 2020;196:105659.
23. Khanam JJ, Foo S. A comparison of machine learning algorithms for diabetes prediction. Ict Express. 2021;7(4):432-9.
24. Rajendra P, Latifi S. Prediction of diabetes using logistic regression and ensemble techniques. Comput Methods Progr Biomed Update. 2021;1:100032.
25. Rawat V, Joshi S, Gupta S, Singh DP , Singh N. Machine learning algorithms for early diagnosis of diabetes mellitus: a comparative study. Mater Today Proc. 2022;56:502-6.
26. Zhou H, Xin Y, Li S. A diabetes prediction model based on Boruta feature selection and ensemble learning. BMC Bioinf. 2023;24(1):1-34.
27. Harnal S, Jain A, et al. Comparative approach for early diabetes detection with machine learning. In: 2023 International conference on emerging smart computing and informatics (ESCI), 2023, pp. 1-6: IEEE.
28. Diabetes Dataset. In: Rashid A, editor. Diabetes dataset, 1 ed. Mendeley 2020.
29. Palanivinayagam A, Damaševičius R. Effective handling of missing values in datasets for classification using machine learning methods. Information. 2023;14(2):92.
30. Emmanuel T, Maupong T, Mpoeleng D, Semong T, Mphago B, Tabona O. A survey on missing data in machine learning. J Big Data. 2021;8(1):1-37.
31. Singh D, Singh B. Investigating the impact of data normalization on classification performance. Appl Soft Comput. 2020;97:105524.
32. Ali PJM, Faraj RH, Koya E, Ali PJM, Faraj RH. Data normalization and standardization: a technical report. Mach Learn Tech Rep. 2014;1:1-6.
33. Mohamad IB, Usman D. Research article standardization and its effects on k-means clustering algorithm. Res J Appl Sci Eng Technol. 2013;6(17):3299-303.
34. Refaeilzadeh P , Tang L, Liu H. Cross-validation; 2009. pp. 532-538.
35. Anguita D, Ghelardoni L, Ghio A, Oneto L, Ridella S. The'K'in K-fold Cross Validation. In ESANN ; 2012, pp. 441-446.
36. Kovalerchuk B, etc. Enhancement of cross validation using hybrid visual and analytical means with Shannon function. In: Beyond Traditional Probabilistic Data Processing Techniques: Interval, Fuzzy etc. Methods and Their Applicationsp; 2020.pp. 517-543.
37. Syarif I, Prugel-Bennett A, Wills G. SVM parameter optimization using grid search and genetic algorithm to improve classification performance. Elecommun Comput Electr Control. 2016;14(4):1502-9.
38. Claesen M. Easy hyperparameter search using optunity, 2014.
39. Wu J, et al. Hyperparameter optimization for machine learning models based on Bayesian optimization. J Electr Sci Technol. 2019;17(1):26-40.
40. Jackson DA. Stopping rules in principal components analysis: a comparison of heuristical and statistical approaches. Ecology. 1993;74(8):2204-14.
41. Hyttinen A, Pacela VB, Hyvärinen A. Binary independent component analysis: a non-stationarity-based approach. In: Uncertainty in Artificial Intelligence, 2022, pp. 874-884: PMLR.
42. Mohammad HK. Republic of Iraq Ministry of Higher Education and Scintific Research Al-Furat Al-Awsat Technical University.

43. Yuan H, Wu N, Chen XM. Mechanical compound fault analysis method based on shift invariant dictionary learning and improved FastICA algorithm. Machines. 2021;9(8):144.
44. Abbas NAM, Salman HM. Enhancing linear independent component analysis: comparison of various metaheuristic methods. Iraqi J Electr Electr Eng. 2020;16:1.
45. Ramírez-Gallego S, et al. Fast-mRMR: fast minimum redundancy maximum relevance algorithm for high-dimensional big data. Int J Intell Syst. 2017;32(2):134-52.
46. Sakar CO, Kursun O, Gurgen F. A feature selection method based on kernel canonical correlation analysis and the minimum redundancy-maximum relevance filter method. Expert Syst Appl. 2012;39(3):3432-7.
47. Sun L, Yin T, Ding W, Qian Y, Xu J. Feature selection with missing labels using multilabel fuzzy neighborhood rough sets and maximum relevance minimum redundancy. IEEE Trans Fuzzy Syst. 2021;30(5):1197-211.
48. Yang H, et al. iRSpot-Pse6NC: identifying recombination spots in Saccharomyces cerevisiae by incorporating hexamer composition into general PseKNC. Int J Biol Sci. 2018;14(8):883.
49. Cunningham P, Delany SJ. k-Nearest neighbour classifiers-A Tutorial. ACM Comput Surv. 2021;54(6):1-25.
50. Yu Z, Chen H, Liu J, You J, Leung H, Han G. Hybrid $ k $-nearest neighbor classifier. IEEE Trans Cybern. 2015;46(6):1263-75.
51. Angulo C, Ruiz FJ, González L, Ortega JA. Multi-classification by using tri-class SVM. Neural Process Lett. 2006;23:89-101.
52. Charbuty B, Abdulazeez A. Classification based on decision tree algorithm for machine learning. Appl Sci Technol Trends. 2021;2(1):20-8.
53. Belgiu M, Drăguţ L. Random forest in remote sensing: a review of applications and future directions. ISPRS J Photogr Remote Sens. 2016;114:24-31.
54. Hastie T, Rosset S, Zhu J, Zou H. Multi-class adaboost. Statistics and its. Interface. 2009;2(3):349-60.
55. Schapire RE, Singer Y. Improved boosting algorithms using confidence-rated predictions. In: Proceedings of the eleventh annual conference on computational learning theory, 1998, pp. 80-91.
56. Kégl B. The return of AdaBoost. MH: multi-class Hamming trees. 2013.
57. Xu S. Bayesian Naïve Bayes classifiers to text classification. J Inf Sci. 2018;44(1):48-59.
58. Fernández A, López V, Galar M, Del Jesus MJ, Herrera F. Analysing the classification of imbalanced data-sets with multiple classes: binarization techniques and ad-hoc approaches. Knowl-Based Syst. 2013;42:97-110.
59. Santosa B. Multiclass classification with cross entropy-support vector machines. Proc Comp Sci. 2015;72:345-52.
60. RJEmlM. Polikar and applications. In: Ensemble learning, 2012. pp. 1-34
61. Dong X, Yu Z, Cao W, Shi Y. A survey on ensemble learning. Front Comp Sci. 2020;14:241-58.
62. Serrano-Lopez R, Morandini A. Fibroblasts at the curtain call: from ensemble to principal dancers in immunometabolism and inflammaging. J Appl Oral Sci. 2023;31:e20230050.
63. Hsieh S-L, et al. Design ensemble machine learning model for breast cancer diagnosis. J Med Syst. 2012;36:2841-7.
64. Harangi B. Skin lesion classification with ensembles of deep convolutional neural networks. J Biomed Inform. 2018;86:25-32.
65. Hossin M, Sulaiman M. A review on evaluation metrics for data classification evaluations. Int J Data Min Knowl Manag Process. 2015;5(2):1.
66. Grandini M, Bagli E, Visani G. Metrics for multi-class classification: an overview. 2020.
67. Hassan S, Karbat AR, Towfik ZS. Propose hybrid KNN-ID3 for diabetes diagnosis system.

## Publisher's Note

Springer Nature remains neutral with regard to jurisdictional claims in published maps and institutional affiliations.

## Ready to submit y our researc h ?  Choose BMC and benefit fr om:

- fast, convenient online submission
- thorough peer review by experienced researchers in your  eld
- rapid publication on acceptance
- support for research data, including large and complex data types
- gold Open Access which fosters wider collaboration and increased citations
- maximum visibility for your research: over 100M website views per year ·
