<!-- extracted by pdf-extract | engine=docling | pages=12 | ocr=False | tables=10/10 | density=1.21 | score=100 -->

Danh mục nội dung có tại ScienceDirect

## Computer Methods and Programs in Biomedicine

trang chủ tạp chí: www.elsevier.com/locate/cmpb

## Dự đoán và chẩn đoán đái tháo đường từ góc nhìn tiền xử lý dữ liệu và học máy

Chollette C. Olisah ∗ , Lyndon Smith , Melvyn Smith

Centre for Machine Vision, Bristol Robotics Laboratory, University of the West of England, Bristol, UK

## thông tin bài báo

Lịch sử bài báo: Nhận ngày 3 August 2021 Chỉnh sửa 25 January 2022 Chấp nhận 22 March 2022

## Từ khóa:

Đái tháo đường Học máy Mạng nơ-ron sâu Tiền xử lý dữ liệu Hồi quy đa thức

Tương quan Spearman

## 1. Giới thiệu

Đái tháo đường (diabetes mellitus) là một rối loạn chuyển hóa đặc trưng bởi tăng đường huyết, xuất phát từ việc cơ thể không đủ khả năng tiết và đáp ứng với insulin [1] . Thông thường, bệnh biểu hiện theo nhiều cách khác nhau: tiền đái tháo đường (prediabetes) — đường huyết cao hơn bình thường, đái tháo đường rõ: type I và type II, hoặc đái tháo đường thai kỳ, phát sinh từ thai nghén. Đái tháo đường đã được y học chứng minh là có liên hệ với tổn thương lâu dài ở các cơ quan trọng yếu, gồm mắt, thận, thần kinh, tim và mạch máu. Đáng báo động hơn là tác động của nó lên

## tóm tắt

Bối cảnh và Mục tiêu: Đái tháo đường là một rối loạn chuyển hóa đặc trưng bởi tăng đường huyết, xuất phát từ việc cơ thể không đủ khả năng tiết và đáp ứng với insulin. Nếu không được quản lý đúng cách hoặc chẩn đoán kịp thời, đái tháo đường có thể gây nguy cơ cho các cơ quan trọng yếu như mắt, thận, thần kinh, tim và mạch máu, và do đó có thể đe dọa tính mạng. Nhiều năm nghiên cứu về chẩn đoán đái tháo đường bằng tính toán đã chỉ ra học máy là một giải pháp khả thi cho dự đoán đái tháo đường. Tuy nhiên, tỷ lệ chính xác cho tới nay cho thấy vẫn còn nhiều dư địa để cải thiện. Trong bài báo này, chúng tôi đề xuất một khung học máy cho dự đoán và chẩn đoán đái tháo đường sử dụng bộ dữ liệu PIMA Indian và bộ dữ liệu đái tháo đường của phòng xét nghiệm Bệnh viện Medical City Hospital (LMCH). Chúng tôi đưa ra giả thuyết rằng việc áp dụng các phương pháp lựa chọn đặc trưng và nội suy giá trị thiếu có thể nâng cao hiệu năng của các mô hình phân loại trong dự đoán và chẩn đoán đái tháo đường.

Phương pháp: Trong bài báo này, một khung bền vững để xây dựng mô hình dự đoán đái tháo đường nhằm hỗ trợ chẩn đoán lâm sàng đái tháo đường được đề xuất. Khung này bao gồm việc áp dụng tương quan Spearman và hồi quy đa thức cho lựa chọn đặc trưng và nội suy giá trị thiếu, theo một góc tiếp cận giúp tăng cường hiệu năng của chúng. Hơn nữa, các mô hình học máy có giám sát khác nhau — mô hình random forest (RF), mô hình support vector machine (SVM), và mô hình mạng nơ-ron sâu tăng trưởng gấp đôi (twice-growth deep neural network, 2GDNN) do chúng tôi thiết kế — được đề xuất cho phân loại. Các mô hình được tối ưu bằng cách tinh chỉnh siêu tham số sử dụng grid search và kiểm định chéo k-fold phân tầng lặp lại, và được đánh giá về khả năng mở rộng tới bài toán dự đoán.

Kết quả: Qua các thí nghiệm trên bộ dữ liệu PIMA Indian và LMCH, các điểm precision, sensitivity, F1-score, train-accuracy và test-accuracy lần lượt đạt 97.34%, 97.24%, 97.26%, 99.01%, 97.25 và 97.28%, 97.33%, 97.27%, 99.57%, 97.33 với mô hình 2GDNN đề xuất.

Kết luận: Các phương pháp tiền xử lý dữ liệu và các bộ phân loại với tối ưu siêu tham số được đề xuất trong khung học máy đem lại một mô hình học máy bền vững, vượt trội so với các kết quả tốt nhất hiện có trong dự đoán và chẩn đoán đái tháo đường. Mã nguồn cho các mô hình của khung học máy đề xuất đã được công bố công khai.

Crown Copyright © 2022 Published by Elsevier B.V.

Đây là bài báo truy cập mở theo giấy phép CC BY ( http://creativecommons.org/licenses/by/4.0/ )

thai nghén — khoảng 7% số ca thai nghén bị ảnh hưởng bởi đái tháo đường mỗi năm [2] , điều này là nguy cơ kép đe dọa tính mạng cho cả người mẹ lẫn đứa con chưa sinh. Số người mắc đái tháo đường đang gia tăng và ước tính rằng khoảng 48% dân số thế giới sẽ mắc đái tháo đường vào năm 2045 [3] .

∗ Tác giả liên hệ. Địa chỉ E-mail: Chollette.olisah@uwe.ac.uk (C.C. Olisah).

Việc phát hiện đái tháo đường trên lâm sàng dựa vào mức glucose huyết tương lúc đói lớn hơn 126 mg/dl (7.0 mmol/l) hoặc nghiệm pháp dung nạp glucose đường uống 2h/3h cho kết quả glucose huyết tương lớn hơn 200 mg/dl (11.1 mmol/l) [1] . Tuy nhiên, các ngưỡng đường huyết để phát hiện đái tháo đường có thể thay đổi theo chủng tộc. Điều này là vì các nhóm sắc tộc khác nhau có mức nguy cơ đường huyết khác nhau. Do đó, các bác sĩ lâm sàng đối mặt với vấn đề gây tranh cãi là xác định một ngưỡng đường huyết để chẩn đoán đái tháo đường bất kể nhóm sắc tộc của cá nhân, kèm theo câu hỏi hệ trọng là liệu có tồn tại một ngưỡng có thể chính xác mà không cần một loạt xét nghiệm dự phòng để xác nhận chẩn đoán hay không [2] . Việc đạt tới một quyết định có ý nghĩa trong một lần chẩn đoán lâm sàng duy nhất là rất khó với con người, vì phải thực hiện nhiều xét nghiệm đường huyết cả trước lẫn sau bữa ăn. Tuy nhiên, quá trình chẩn đoán có thể được đơn giản hóa bằng tính toán.

Trong những năm qua, đã có vô số nỗ lực tính toán, chủ yếu xoay quanh việc áp dụng các thuật toán học máy trong nghiên cứu đái tháo đường nhằm giúp các bác sĩ lâm sàng đưa ra quyết định chẩn đoán nhanh và có ý nghĩa. Đó là các thuật toán dựa trên mạng nơ-ron (NN) như multilayered perceptron (MLP), deep neural networks (DNN) [4-10] , và các mô hình học máy quy ước (CML) [ 6,7,11-17 ]. Ngoài ra, với sự phát triển ngày càng nhiều của các công cụ xét nghiệm đái tháo đường [18] và [19] , các cá nhân có thể tham gia đánh giá tình trạng đái tháo đường cá nhân hóa để điều chỉnh lối sống tốt hơn.

Mặc dù có nhiều nỗ lực nghiên cứu trong dự đoán khởi phát đái tháo đường, tỷ lệ chính xác cho tới nay cho thấy vẫn còn nhiều dư địa để cải thiện. Điều này càng cần thiết bởi thực tế là đái tháo đường gây ra những thách thức sức khỏe nghiêm trọng nếu không được quản lý đúng cách hoặc chẩn đoán kịp thời. Trong bài báo này, chúng tôi đề xuất một khung học máy bền vững để xây dựng mô hình dự đoán đái tháo đường nhằm hỗ trợ chẩn đoán lâm sàng đái tháo đường. Các đóng góp của bài báo được tóm tắt như sau:

1. Xét rằng hầu hết dữ liệu thực tế không thỏa mãn giả định phân phối chuẩn: tương quan Spearman (SC) được dùng cho lựa chọn đặc trưng trong khi hồi quy đa thức (PR) được dùng cho nội suy giá trị thiếu. Cả hai phương pháp đều được tiếp cận theo cách tận dụng tốt nhất chức năng của chúng cho bất kỳ dữ liệu cho trước nào.
2. Chúng tôi đề xuất một bộ phân loại dựa trên CML và thiết kế một bộ phân loại dựa trên DNN có khả năng mở rộng tới bài toán dự đoán đái tháo đường. Sau đó chúng tôi khảo sát việc tối ưu siêu tham số của chúng. Tiếp đó, chúng tôi so sánh với các thuật toán phân loại tốt nhất hiện có.
3. Chúng tôi gán nhãn lại bộ dữ liệu PIMA Indian để bao gồm cả dự đoán tiền đái tháo đường nhằm phục vụ một chẩn đoán lâm sàng toàn diện về đái tháo đường.

Phần còn lại của bài báo được tổ chức như sau. Phần 2 trình bày tài liệu về các phương pháp tốt nhất hiện có trong nghiên cứu dự đoán đái tháo đường và Phần 3 giới thiệu khung đề xuất. Phần 4 báo cáo về các thí nghiệm, kết quả và thảo luận. Hạn chế và hướng làm việc tương lai của bài báo được trình bày ở Phần 5, và cuối cùng, Phần 6 kết luận bài báo.

## 2. Công trình liên quan

Các thảo luận về tài liệu hiện có sẽ được trình bày từ góc độ tiền xử lý dữ liệu và phân loại theo cách làm nổi bật các đóng góp của bài báo này. Tuy nhiên, chúng tôi sẽ giới hạn phần điểm luận ở các bài báo công bố gần đây vì chỉ gần đây độ chính xác hiệu năng trong nghiên cứu đái tháo đường mới bắt đầu cải thiện. Để có tóm tắt về hiệu năng lịch sử và hiện tại của các thuật toán trong nghiên cứu đái tháo đường, độc giả nên tham khảo lần lượt [20] và [21] .

Họ các phương pháp dựa trên NN vẫn tiếp tục cho thấy cải thiện về độ chính xác trong nghiên cứu đái tháo đường. Trong [4] , họ áp dụng chuẩn hóa min-max và một variational autoencoder sparse autoencoder để xử lý lần lượt việc chuẩn hóa dữ liệu, mất cân bằng và tăng cường đặc trưng. MLP sau đó được dùng để phân loại đạt độ chính xác 92.31%. Một cải thiện thêm về độ chính xác có thể thấy ở [5] , nơi mạng nơ-ron gradient liên hợp tỉ lệ lan truyền ngược nhân tạo (ABP-SCGNN) của họ được báo cáo đạt 93% độ chính xác mà không cần tiền xử lý dữ liệu. Một hiệu năng tốt khác ghi nhận với các mô hình dựa trên NN thể hiện trong công trình [6] . Trong công trình của họ, nội suy giá trị trung vị, k-nearest neighbor (K-NN) và một iterative imputer được so sánh cho nội suy giá trị thiếu. Sau đó, MLP được dùng để phân loại đạt F1-score 98%. Khanam và Foo 2021 [7] áp dụng tương quan Pearson và nội suy giá trị trung vị cho lựa chọn đặc trưng và nội suy giá trị thiếu. Họ còn chuẩn hóa dữ liệu và loại bỏ giá trị ngoại lai bằng khoảng tứ phân vị. Mô hình phân loại dựa trên DNN của họ với các số lớp ẩn khác nhau đạt độ chính xác 88.6%. Trong [8] , một mô hình deep neural network (DNN) đạt độ chính xác 98.07%. Dù các tác giả tuyên bố đã áp dụng làm sạch dữ liệu, phương pháp dùng không được nêu trong công trình. Trong [9] , phân tích thành phần chính (PCA) và giá trị trung vị được dùng lần lượt cho lựa chọn đặc trưng và nội suy giá trị thiếu. MLP sau đó được áp dụng để phân loại đạt độ chính xác 75.7%. Ngoài ra, trong [10] PCA và minimum redundancy, maximum relevance (mRMR) được dùng lần lượt cho lựa chọn đặc trưng và nội suy giá trị thiếu. Sau đó, với MLP, họ đạt độ chính xác phân loại 73.90%.

Điều thú vị là các phương pháp dựa trên CML cho thấy hiệu năng độ chính xác tương đương với các phương pháp dựa trên NN. Trong [6] sau khi tiền xử lý dữ liệu, nhóm đánh giá hiệu năng của các bộ phân loại khác nhau: RF, light gradient boosting machine (LGBM), linear regression (LR), và support vector machines (SVM), về hiệu năng phân loại của chúng. LGBM nổi lên là mô hình tốt nhất với độ chính xác 86%. Trong [7] hiệu năng phân loại của decision tree (DT), RF, naïve Bayesian (NB), K-NN, Adaptive boosting (AB) được so sánh, với AB đạt độ chính xác tốt nhất 79.42%. Trong [11] , họ áp dụng cái họ gọi là chiến lược lựa chọn đặc trưng tiến và lùi với PCA và giá trị trung bình lần lượt cho lựa chọn đặc trưng và nội suy giá trị thiếu. Họ sau đó so sánh hiệu năng phân loại của RF và SVM, trong đó mô hình RF nổi lên tốt nhất với độ chính xác 83%. Gnanadass Iswaria [12] áp dụng giá trị trung bình của mỗi cột dữ liệu để xử lý giá trị thiếu rồi huấn luyện trên các mô hình phân loại khác nhau: NB, linear regression (LR), RF, AB, gradient boosting machine (GBM), và extreme gradient boosting (XGBoost). XGBoost nổi lên là mô hình tốt nhất với độ chính xác 77.54%. Trong [13] , họ so sánh hiệu năng của các mô hình phân loại khác nhau: SVM, K-NN, NB, Gradient boosting (GB), và RF. RF xếp cao nhất với độ chính xác 98.48%. Hasan và cộng sự [14] áp dụng tương quan Pearson và nội suy giá trị trung bình lần lượt cho lựa chọn đặc trưng và nội suy giá trị thiếu. Với phương pháp grid search để tinh chỉnh siêu tham số trong thiết lập kiểm định chéo K-fold, họ thí nghiệm về hiệu năng của các mô hình phân loại khác nhau: extreme boosting (XB), AB, RF, DT, và K-NN. XB xếp tốt nhất với độ chính xác 94.6%. Singh và Singh [15] dùng một tập hợp xếp chồng (stacked ensemble) của Linear SVM, Radial Basis function SVM, DT, và K-NN cho phân loại và đạt độ chính xác 83.8%. Trong [16] , họ đạt độ chính xác 87.1% với một sự kết hợp các phương pháp: NB cho nội suy giá trị thiếu và bộ phân loại RF. Maniruzzaman và cộng sự [17] dùng phương pháp nội suy trung vị theo nhóm và trung vị để xử lý giá trị thiếu và giá trị ngoại lai, và áp dụng RF cho lựa chọn đặc trưng. Sau đó họ so sánh hiệu năng của SVM, NB, linear discriminant analysis (LDA), linear regression (LR), DT, RF, AB, gaussian process classification (GPC), quadratic discriminant analysis (QDA) trong đó RF xếp tốt nhất với độ chính xác 92.26%. Trong [10] sau khi tiền xử lý dữ liệu, hiệu năng của các bộ phân loại DT và RF được so sánh, trong đó RF xếp tốt nhất với độ chính xác 76.04%. Các điểm luận này được tóm tắt ở Bảng 1 .

Nhìn chung, các cách tiếp cận tiền xử lý dữ liệu là lựa chọn đặc trưng và nội suy giá trị thiếu đã được chứng minh là rất liên quan đáng kể tới hiệu năng phân loại trong dự đoán đái tháo đường. Tuy nhiên, hầu hết các phương pháp được áp dụng cho tiền xử lý dữ liệu đã cho thấy hoạt động tốt nhất khi phân phối của dữ liệu là chuẩn. Trong trường hợp dữ liệu vi phạm giả định phân phối chuẩn, các phương pháp phi tuyến sẽ phù hợp hơn với bài toán và được kỳ vọng đóng góp lớn vào các mức tăng hiệu năng của một bộ phân loại. Do đó, các phương pháp tiền xử lý phi tuyến và các bộ phân loại phi tuyến sẽ được khảo sát trong bài báo này cho tiền xử lý dữ liệu.

Bảng 1 Tóm tắt điểm luận tài liệu.

| Tác giả                                     | Năm                                         | Lựa chọn đặc trưng (FS) & Nội suy giá trị thiếu (MVI)                              | Phân loại                                                         | Ghi chú                                        |
|---------------------------------------------|---------------------------------------------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------|
| Neural network-based methods                | Neural network-based methods                | Neural network-based methods                                                      | Neural network-based methods                                      | Neural network-based methods                   |
| Garcia-Ordas et al. [4]                     | 2021                                        | FS: none specified; MVI: removed missing values;                                  | MLP                                                               | MLP achieved the best accuracy, 92.31%         |
| Bukhari et al. [5]                          | 2021                                        | FS: none specified; MVI: none specified                                           | ANN trained with ABS conjugate gradient neural network (ABP-CGNN) | Achieved 93% accuracy                          |
| Roy et al. [6]                              | 2021                                        | Median value, K-NN, and iterative imputer were used for missing value imputation. | ANN                                                               | ANN achieved 98% accuracy                      |
| Khanam et al. [7]                           | 2021                                        | FS: Pearson correlation MVI: Median value for missing values imputation.          | DNN run with different hidden layers                              | Achieved 86.26% accuracy with 2 hidden layers. |
| Naz and Ahuja [8]                           | 2020                                        | Method not stated                                                                 | MLP and DL with 2 hidden layers                                   | DL achieved best accuracy of 98.07%            |
| Alam et al. [9]                             | 2019                                        | FS: PCA; MVI: Median value                                                        | MLP                                                               | Achieved 75.7% accuracy                        |
| Zou et al. [10]                             | 2018                                        | FS: PCA; MVI: redundancy and minimum relevance                                    | MLP                                                               | Achieved 73.90% accuracy                       |
| Conventional machine learning-based methods | Conventional machine learning-based methods | Conventional machine learning-based methods                                       | Conventional machine learning-based methods                       | Conventional machine learning-based methods    |
| Roy et al. [6]                              | 2021                                        | Median value, K-NN, and iterative imputer were used for missing value imputation. | LR, SVM, RF, LGBM                                                 | LGBM achieved 86%                              |
| Khanam et al. [7]                           | 2021                                        | FS: Pearson correlation; MVI: Median value for missing values imputation;         | DT, RF, NB, K-NN, AB                                              | Adaboost achieved 79.42%                       |
| Sivaranjani et al. [11]                     | 2021                                        | FS: Step-forward + Backward FS + PCA; MVI: mean value                             | RF, SVM                                                           | RF achieved best accuracy of 83%               |
| Gnanadass [12]                              | 2020                                        | MVI: mean value                                                                   | NB, LR, RF, AB, GBM, XGBoost                                      | XGBoost achieved best accuracy of 77.54%       |
| Reddy et al. [13]                           | 2020                                        | FS: none specified; MVI: none specified                                           | SVM, K-NN, NB, GB, RF, LR                                         | RF achieved best accuracy of 98.48%            |
| Hasan et al. [14]                           | 2020                                        | FS: correlation; MVI: mean value                                                  | XB, AB, RF, DT, K-NN                                              | XB achieved best accuracy of 94.6%             |
| Singh et al. [15]                           | 2020                                        | FS: none specified; MVI: none specified                                           | Ensemble models Radial basis SVM, DT, linear SVM, K-NN            | Achieved 83.8% accuracy                        |
| Wang et al. [16]                            | 2019                                        | FS: none specified; MVI: NB for predictive imputation                             | RF                                                                | Achieved 87.1% accuracy                        |
| Maniruzzaman et al. [17]                    | 2018                                        | FS: RF for predictive feature selection; MVI: median value                        | SVM, NB, LDA, LR, DT, RF, Adaboost, GPC, QDA, j48                 | RF achieved best accuracy of 92.26%            |
| Zou et al. [10]                             | 2018                                        | FS: PCA; MVI: redundancy and minimum relevance                                    | DT, and RF                                                        | RF achieved best accuracy of 76.04%            |

## 3. Phương pháp

Khung đề xuất của chúng tôi gồm hai giai đoạn: tiền xử lý dữ liệu và phân loại. Khung này được thiết kế để giải quyết những gì chúng tôi cho là ảnh hưởng tới độ chính xác trong chẩn đoán sớm đái tháo đường. Đó là: (1) không phải tất cả thuộc tính đều là đặc trưng quan trọng cho dự đoán, (2) có rất nhiều giá trị thiếu, (3) liệu có một bộ phân loại phù hợp hơn với dữ liệu? Trong Hình 1 , khung đề xuất được minh họa bằng sơ đồ. Sau đây, mỗi giai đoạn sẽ được thảo luận chi tiết. Các thảo luận của chúng tôi sẽ bắt đầu với các thuật toán cấu thành nên mỗi thành phần của khung.

## 3.1. Tương quan Spearman

Tương quan Spearman (SC) là một ước lượng phi tham số về cường độ và chiều của các liên hệ đơn điệu giữa hai biến, được tính dựa trên thứ hạng. Hệ số SC có thể được tính từ quan hệ sau [22] :

trong đó r là hệ số tương quan mẫu, d là hiệu giữa các thứ hạng, /Sigma1 d i 2 là tổng các giá trị d bình phương và n là số lượng mẫu.

Vì hệ số SC tập trung vào các khác biệt trong thứ tự hạng của dữ liệu thay vì các khác biệt về giá trị trung bình, nó phù hợp cho dữ liệu liên tục phân phối không chuẩn và cho dữ liệu có giá trị ngoại lai. Thông thường, các hệ số được co giãn trong khoảng [ -1, + 1] trong đó ( p = + 1, -1) mô tả một liên hệ đơn điệu hoàn hảo và r = 0 mô tả sự thiếu liên hệ.

Để đánh giá ý nghĩa của kiểm định thống kê, kiểm định giả thuyết được sử dụng rộng rãi [23] nhằm ước lượng cường độ của mối quan hệ trong tổng thể mà từ đó dữ liệu được lấy mẫu. Có hai cách tiếp cận ý nghĩa của kiểm định: dùng hệ số tương quan, hoặc giá trị p. Nếu giá trị của r không nằm giữa các giá trị tới hạn dương và âm, thì kiểm định thống kê là có ý nghĩa, ngược lại thì không có ý nghĩa. Đối với giá trị p, quyết định bác bỏ hay chấp nhận giả thuyết không nằm ở cường độ bằng chứng của giá trị p so với giá trị ý nghĩa. Thông thường, giá trị ý nghĩa có thể được đặt là 0.05 hoặc 0.01, lần lượt là: có ý nghĩa thống kê và có ý nghĩa thống kê cao. Tương tự, nếu giá trị p &lt; = 0.05, hoặc giá trị p &lt; = 0.01, thì có bằng chứng mạnh, hoặc rất mạnh, để bác bỏ giả thuyết không nghiêng về giả thuyết thay thế.

Hình 1. Khung học máy bền vững đề xuất cho dự đoán đái tháo đường.

## 3.2. Hồi quy đa thức

Hồi quy đa thức (PR) là một trường hợp đặc biệt của hồi quy tuyến tính, mô hình hóa một quan hệ phi tuyến (đường cong) giữa biến dự báo và biến kết cục. PR đủ dùng với mục tiêu khớp đường hồi quy vào một tập điểm cong, tức là các mẫu phi tuyến giữa biến dự báo và biến kết cục khi tính tuyến tính không được thỏa mãn. Các mô hình đa thức có thể xấp xỉ các hàm liên tục với độ chính xác, điều này khiến chúng mạnh hơn trong việc xử lý phi tuyến. Trong PR, một biến dự báo đơn lẻ được biểu diễn như:

Phương trình (2) là một mô hình đa thức bậc k của một biến; trong đó β 0 là số hạng độ chệch, β 1 , β 2 , /22c5/22c5/22c5 , β k là các hệ số cần xác định và x là biến dự báo với các biến bổ sung x 2 , …, x k được tạo ra bằng cách nâng x lên một số mũ.

Bảng 1 Tóm tắt điểm luận tài liệuLuôn luôn có thể khớp một mô hình đa thức bậc n-1 một cách hoàn hảo với một tập dữ liệu gồm n điểm. Tuy nhiên, điều này gần như chắc chắn dẫn tới quá khớp. Do đó, một mô hình bậc thấp nên được ưu tiên hơn mô hình bậc cao miễn là mô hình cung cấp một mức khớp 'tốt' với dữ liệu. Một đa thức bậc thấp điển hình như đa thức bậc 2 có thể được biểu diễn như:

Với một đa thức bậc 2, chỉ một biến mới được thêm vào. Ví dụ, dùng một vector dự báo cho trước, x , với x = [ 1 x 11 x 22 · · · x nm ] T , một hệ phương trình tuyến tính có thể được tạo như:

Sau đó từ Phương trình (4) một đa thức bậc n có thể được tạo từ các lũy thừa của vector x như:

## 3.3. Các mô hình phân loại học máy

Bài báo này chỉ xét các bộ phân loại phi tuyến cho bài toán phân loại.

## 3.3.1. Mô hình random forest

Random forest là một thuật toán học có giám sát để xây dựng một tập hợp dự báo gồm các cây quyết định, thường được huấn luyện bằng phương pháp 'bagging', phát triển trong các không gian con được chọn ngẫu nhiên của dữ liệu. Bằng bagging, ý nói là nhiều mô hình học cây quyết định được kết hợp để dự đoán chính xác và ổn định. Như Breiman [24] đề xuất, mỗi cây trong tập hợp cây xuất ra một dự đoán, tuy nhiên chỉ lớp có nhiều phiếu bầu nhất mới được coi là dự đoán của mô hình [ 25 , 26 ]. Tuy nhiên, dự đoán của mô hình có thể mang hai dạng: nếu đầu ra là một giá trị trung bình, thì RF giải bài toán hồi quy, còn nếu đầu ra là một mode của các lớp, thì RF giải bài toán phân loại. Về bản chất, độ ổn định dự đoán của RF được hình thành từ các bộ phân loại/hồi quy có tương quan yếu.

Để RF có khả năng nhận diện và đáp ứng các đặc trưng tốt nhất trong một tập con đặc trưng ngẫu nhiên, nó phải không nhạy với các biến nhiễu [27] và ổn định khi có lượng dữ liệu nhỏ [ 28 , 29 ]. Tuy nhiên, khả năng không nhạy với biến nhiễu của RF có thể không phải lúc nào cũng đúng. Do đó, bằng cách đảm bảo các đặc trưng tốt nhất được đưa vào, hiệu năng cao hơn là khả dĩ hơn.

## 3.3.2. Support vector machines

SVM là một thuật toán học máy có giám sát [30] nhằm tìm biên tối ưu giữa các điểm dữ liệu trong không gian đặc trưng. Theo truyền thống, SVM cố tìm đường khớp tốt nhất, một siêu phẳng, tối đa hóa lề phân tách giữa hai lớp. Tuy nhiên, hầu hết dữ liệu thực tế phần lớn là phi tuyến. Các bài toán phi tuyến trong SVM được giải bằng cách ánh xạ không gian đầu vào n chiều tới một không gian đặc trưng nhiều chiều nơi SVM vẫn có thể hoạt động tuyến tính. Tương tự, trong một bài toán phân loại nhiều lớp, SVM tạo ra nhiều bộ phân loại nhị phân để phân tách tuyến tính các điểm dữ liệu của các cặp lớp trong một không gian đặc trưng nhiều chiều. Điều này đạt được bằng cái thường được gọi là kernel trick [30] . SVM đã được khảo sát phổ biến cho các bài toán phân loại nhị phân trong nghiên cứu đái tháo đường [ 13 , 15 ], và [17] .

Hình 2. Kiến trúc của mô hình mạng nơ-ron sâu tăng trưởng gấp đôi (2GDNN) đề xuất cho dự đoán đái tháo đường.

## 3.3.3. Deep neural network

Deep neural network (DNN) được quan tâm trong bài báo này là một lớp DNN truyền thẳng, trích xuất một đặc trưng và biến đổi nó bằng các hàm kích hoạt phi tuyến. Các lớp của DNN gồm lớp đầu vào, lớp ẩn và lớp đầu ra. Kết nối giữa các lớp này bắt đầu từ lớp đầu vào với các trọng số liên kết tới các lớp ẩn rồi tới lớp đầu ra. Để bất kỳ nơ-ron nào trong mỗi lớp truyền dữ liệu sang lớp kế tiếp, đầu ra của nút đó phải vượt một giá trị ngưỡng xác định bởi một hàm kích hoạt. Trong khi huấn luyện, trọng số của một nơ-ron được cập nhật bằng lan truyền ngược [31] để tối thiểu hóa sai số của mạng nhằm tổng quát hóa cho các mẫu chưa thấy. Khả năng bổ sung của các DNN đến từ độ sâu của các lớp ẩn. Tùy vào bài toán, càng sâu thì khả năng tổng quát hóa của mạng càng tốt [32] . Điều này đặc biệt đúng với các bài toán dựa trên ảnh. Các DNN đã được áp dụng cho dự đoán đái tháo đường [ 7,8 ].

Trong bài báo này, mô hình học sâu của chúng tôi được thiết kế để gấp đôi, hoặc gấp hai về kích thước, và được lặp lại hai lần. Vì vậy, chúng tôi gọi nó là mạng nơ-ron sâu tăng trưởng gấp đôi (2GDNN). Về bản chất, các lớp ẩn tăng trưởng gấp hai về kích thước của đầu vào và được lặp lại hai lần. Kiến trúc 2GDNN của chúng tôi được mô tả trong Hình 2 và gồm một lớp đầu vào, bốn lớp ẩn, và một lớp đầu ra. Quyết định truyền một nơ-ron từ lớp này sang lớp khác phụ thuộc vào hàm f , tác động lên một nơ-ron x , để truyền hoặc không truyền nơ-ron đó. Điều này được biểu diễn như:

trong đó x, w, b , φ lần lượt là đầu vào, trọng số, độ chệch, và hàm kích hoạt. Trong khi học, mạng cập nhật w i và b của nó bằng phương pháp lan truyền ngược [31] để tối thiểu hóa khác biệt giữa đầu ra mục tiêu của một bài toán và đầu ra dự đoán của mạng. Các tham số của 2GDNN và mô tả của chúng được cung cấp trong Bảng 4 .

Hình 3. Đánh giá các phương pháp nội suy giá trị thiếu trong khung ML đề xuất.

## 3.4. Khung đề xuất

## 3.4.1. Dữ liệu

Các bộ dữ liệu được dùng trong bài báo này là bộ dữ liệu đái tháo đường PIMA Indian công khai và bộ dữ liệu đái tháo đường công khai từ phòng xét nghiệm của Medical City Hospital (LMCH). Bộ trước gồm 768 mẫu: 268 bệnh nhân thuộc lớp đái tháo đường và 500 bệnh nhân thuộc lớp không đái tháo đường. Dữ liệu đái tháo đường được lấy mẫu từ

quần thể người Pima Indian gần Phoenix, Arizona [ 33 ]. Mỗi bệnh nhân được mô tả bằng các thuộc tính sau: số lần mang thai, glucose, huyết áp, độ dày da, insulin, chỉ số khối cơ thể (BMI), hàm phả hệ đái tháo đường, và tuổi. Mô tả bộ dữ liệu PIMA Indian được cung cấp trong Bảng 2 . Bộ sau gồm dữ liệu từ 10 0 0 bệnh nhân là công dân Iraq thu thập từ LMCH [34] . Tổng cộng, khoảng 103, 53, và 844 bệnh nhân lần lượt thuộc lớp bình thường, tiền đái tháo đường, và đái tháo đường. Mỗi bệnh nhân được mô tả bằng các thuộc tính sau: số lượng bệnh nhân, mức đường trong máu, tuổi, giới tính, tỷ lệ creatinine (Cr), BMI, urea, cholesterol (Chol), hồ sơ lipid lúc đói bao gồm total, LDL, VLDL, Triglycerides (TG) và HDL Cholesterol, HBA1C. Không có mô tả sẵn có cho các thuộc tính này.

## 3.4.2. Tiền xử lý dữ liệu

Là bộ dữ liệu cơ sở, bộ dữ liệu PIMA Indian được phân tích về tính chuẩn bằng một biểu đồ hộp ria (whisker plot). Đây là một công cụ thống kê thường dùng trong phân tích dữ liệu thăm dò. Từ Hình 2 , có thể quan sát thấy rằng giá trị của một số đặc trưng bị lệch, đó là dấu hiệu vi phạm giả định phân phối chuẩn. Xét rằng bộ dữ liệu PIMA Indian không thỏa mãn giả định phân phối chuẩn, chúng tôi tiếp cận tiền xử lý dữ liệu theo cách khác. Là bước khởi đầu của tiền xử lý, bộ dữ liệu được gán nhãn lại để bao gồm lớp tiền đái tháo đường. Đó là vì nghiên cứu đái tháo đường hiện tại chỉ giới hạn ở việc dự đoán các lớp bình thường và đái tháo đường. Tuy nhiên, nếu nghiên cứu nhắm tới chẩn đoán đái tháo đường, thì cần có lớp tiền đái tháo đường. Kết quả là, bộ dữ liệu được gán nhãn lại dựa trên các mức glucose để phù hợp với các bảng y khoa cung cấp trực tuyến 1 về các thực hành lâm sàng trong chẩn đoán đái tháo đường. Sau đó, các phương pháp SC và PR được dùng lần lượt cho lựa chọn tầm quan trọng đặc trưng và nội suy giá trị thiếu.

## 3.4.3. Tầm quan trọng và lựa chọn đặc trưng

Vì bộ dữ liệu PIMA Indian chứa nhiều giá trị thiếu, như thể hiện trong Bảng 2 , điều có khả năng làm lệch lựa chọn đặc trưng, bộ dữ liệu được sao chép để dùng cho lựa chọn đặc trưng. Với bộ dữ liệu được sao chép, mỗi hàng có giá trị thiếu cho tất cả đặc trưng được loại bỏ để loại trừ độ lệch mà các mục bằng không sẽ gây ra cho quá trình lựa chọn đặc trưng. Tiếp theo, SC được áp dụng cho các mục khác không của bộ dữ liệu để sinh ra các giá trị p. Một giá trị p đo xác suất về ý nghĩa của tương quan giữa mỗi biến dự báo và biến kết cục — tức là giá trị p càng nhỏ, tầm quan trọng đặc trưng càng cao. Ngưỡng ý nghĩa T được đặt là 0.01 cho mức tin cậy 99%. Để giải quyết vấn đề các đặc trưng cạnh tranh tầm quan trọng, các giá trị p được co giãn. Điều này nhằm khuếch đại tầm quan trọng của một đặc trưng so với đặc trưng khác. Các giá trị p đã co giãn được trình bày trong Bảng 3 . Sau đó, các đặc trưng quan trọng nhất được chọn bằng cách đánh giá giá trị p đã co giãn so với T . Nếu một giá trị p đã co giãn nhỏ hơn T , giả thuyết không H 0 bị bác bỏ nghiêng về giả thuyết thay thế H 1 , ngược lại thì được chấp nhận. Cấu trúc thuật toán của các bước này được trình bày trong Thuật toán 1 và giả thuyết được phát biểu như sau: H 0 : Không có tương quan có ý nghĩa giữa mỗi đặc trưng ( f 1 , f 2 , …, f n ) và biến kết cục.

1 https://www.niddk.nih.gov/health-information/diabetes/overview/ tests-diagnosis#type1

Bảng 2 Mô tả bộ dữ liệu đái tháo đường PIMA Indian

dataset.

|   S/N | Đặc trưng                        | Mô tả                                                                                                                 |   Giá trị thiếu |
|-------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------|-----------------|
|     1 | Pregnancies                      | Number of pregnancies                                                                                                 |             110 |
|     2 | Glucose                          | Glucose concentration (2h oral test)                                                                                  |               5 |
|     3 | Blood Pressure (BP)              | Diastolic blood pressure                                                                                              |              35 |
|     4 | Skin Thickness (ST)              | Skin fold thickness in mm                                                                                             |             227 |
|     5 | Insulin                          | 2h insulin serum (mm u/ml)                                                                                            |             374 |
|     6 | BMI                              | Body mass index = weight in kg / height in m ^ 2                                                                      |              11 |
|     7 | Diabetes Pedigree Function (DPF) | Likelihood value computed from the relationship between the patient and the genetic history of the patient's relative |               0 |
|     8 | Age                              | Age in years                                                                                                          |               0 |

## Thuật toán 1

Xác định tầm quan trọng đặc trưng.

```
Input: data: nonzero entries of the original PIMA Indian diabetes dataset Output: sorted feature: list of features sorted in the order of importance based on the probability value Initialization p = ← [] // p-value list for all features Initialization label ← [] // feature labels list t = r × f √ 1 -r 2 // t -statistics p = tdist ( t, f, k ) // probability values where r is the correlation coefficient, n is the sample size, and p is the associated p-value given t -statistics with degrees of freedom, f, and a number of tails, which is usually 2. for i, j in data do check set k to the index of the response variable set the significance threshold, T scale j [ k ] if scaled j [ k ] ≤ T then add j [ k ] to p add i to label end if end for
```

H 1 : Có một tương quan có ý nghĩa giữa mỗi đặc trưng ( f 1 , f 2 , …, f n ) và biến kết cục

Bảng 3 cho thấy rằng glucose, huyết áp, insulin, và tuổi có tương quan đáng kể với biến kết cục. Do đó, H 1 được chấp nhận và dẫn tới việc chọn các đặc trưng được coi là quan trọng và sẽ tạo thành một tập con của bộ dữ liệu PIMA Indian gốc. Mặc dù tồn tại các đa cộng tuyến giữa các đặc trưng dự báo được chọn như chứng tỏ từ Bảng 3 , chúng không đáng kể vì chúng không ảnh hưởng tới dự đoán các quan sát mới [35] . Cùng thuật toán lựa chọn đặc trưng đó được áp dụng cho bộ dữ liệu LMCH và có thể thích nghi với bất kỳ dữ liệu nào khác.

## 3.4.4. Nội suy giá trị thiếu

Một thực hành phổ biến trong nghiên cứu đái tháo đường là dùng trung bình và trung vị để nội suy các giá trị thiếu. Tuy nhiên, các phương pháp này rất có khả năng làm tăng độ lệch dữ liệu [36] . Một phương pháp khác là nội suy bội các giá trị thiếu (MICE) [37] . Phương pháp này được biết là vượt trội hơn các cách tiếp cận trung bình và trung vị; tuy nhiên, MICE chịu sự suy giảm hiệu năng khi có phi tuyến trong các biến dự báo [38] . Trong bài báo này, chúng tôi dùng một cách tiếp cận dự báo cho nội suy giá trị thiếu sử dụng PR, một bộ hồi quy phi tuyến. Đầu vào cho quá trình nội suy giá trị thiếu

Bảng 3 Ý nghĩa thống kê của giá trị p đã co giãn của các biến dự báo và biến kết cục cho lựa chọn đặc trưng.

| Biến        | Preg     | Glucose   | BP       | ST       | Insulin   | BMI      | DPF   | Age      | Output   |
|-------------|----------|-----------|----------|----------|-----------|----------|-------|----------|----------|
| Preg        | 0        | 0.022     | 0.061    | > 0.1    | > 0.1     | > 0.1    | > 0.1 | < 0.0001 | 0.043    |
| Glucose     | 0.022    | 0         | 0.086    | > 0.1    | < 0.0001  | > 0.1    | > 0.1 | < 0.0001 | < 0.0001 |
| BP          | 0.061    | 0.086     | 0        | > 0.1    | > 0.1     | 0.0007   | > 0.1 | < 0.0001 | 0.007    |
| ST          | > 0.1    | > 0.1     | > 0.1    | 0        | > 0.1     | < 0.0001 | > 0.1 | 0.062    | > 0.1    |
| Insulin     | > 0.1    | < 0.0001  | > 0.1    | > 0.1    | 0         | < 0.0001 | > 0.1 | 0.003    | < 0.0001 |
| BMI         | > 0.1    | > 0.1     | 0.0007   | < 0.0001 | < 0.0001  | 0        | > 0.1 | > 0.1    | > 0.1    |
| DPF         | > 0.1    | > 0.1     | > 0.100  | > 0.1    | > 0.1     | > 0.1    | 0     | > 0.1    | > 0.1    |
| Age         | < 0.0001 | < 0.0001  | < 0.0001 | 0.062    | 0.003     | > 0.1    | > 0.1 | 0        | < 0.0001 |
| Output      | 0.043    | < 0.0001  | 0.007    | > 0.1    | < 0.0001  | > 0.1    | > 0.1 | < 0.0001 | 0        |

- ST -Skin Thickness, DPF - Diabetes Pedigree Function, Preg - Pregnancy.

là tập con của bộ dữ liệu PIMA Indian chỉ với các đặc trưng được chọn. Các bước như sau:

- i. Thứ nhất, tỷ lệ phần trăm giá trị thiếu cho mỗi đặc trưng được chọn được kiểm tra so với một ngưỡng quyết định 5%. Quyết định là: nếu số mục bằng không trong dữ liệu tập con lớn hơn 5%, PR được áp dụng, ngược lại mục đó bị loại bỏ. Từ bộ dữ liệu đái tháo đường PIMA, Insulin được quan sát có trên 5% mục bằng không.
- ii. Thứ hai, đặc trưng từ dữ liệu tập con có tương quan cao với Insulin trở thành biến dự báo để dự đoán Insulin. Biến đó là Glucose.
- iii. Cuối cùng, các điểm dữ liệu được chia thành các tập khác không và bằng không, trong đó tập khác không được dùng để huấn luyện và kiểm tra còn tập bằng không được dự đoán. Đầu ra thu được được kết hợp với tập khác không để tạo thành bộ dữ liệu cuối cùng.

## 3.4.5. Tối ưu bộ phân loại

Chúng tôi đưa ra giả thuyết rằng: với không gian đặc trưng đã giảm, các siêu tham số tốt nhất của mỗi bộ phân loại RF, SVM có thể được tối ưu. Chúng tôi định nghĩa không gian các siêu tham số cho RF, SVM là: /Lambda1 1 , /Lambda1 2 , /22c5/22c5/22c5 , /Lambda1 n , nhận giá trị nguyên. Với thiết lập siêu tham số λ ∈ /Lambda1 , các tổ hợp giá trị siêu tham số tốt nhất khả dĩ có thể thu được bằng:

trong đó hàm mục tiêu f ( λ ) là tối đa hóa độ chính xác với các tổ hợp siêu tham số λ .

Trong bài báo này, các siêu tham số được dùng cho mỗi bộ phân loại RF, SVM và 2DGNN được mô tả ngắn gọn trong Bảng 4 . Tuy nhiên, các tham số RF và SVM được tối ưu vì chỉ một phần nhỏ các siêu tham số đóng góp vào hiệu năng phân loại [39] . Để tìm cấu hình tốt nhất của λ ∈ /Lambda1 , một cơ chế tìm kiếm đơn giản vét cạn, phương pháp grid search, được áp dụng, đặc biệt vì siêu tham số thuộc không gian đã giảm. Kết quả là, vấn đề lời nguyền số chiều có thể tránh được. Chúng tôi chỉ định một tập hữu hạn các giá trị cho các siêu tham số, để đánh giá /Lambda1 = /Lambda1 1 × /Lambda1 2 × /22c5/22c5/22c5 /Lambda1 n , tích Descartes của các tập. Sau đó, grid search cho tinh chỉnh siêu tham số tuân theo kiểm định chéo lặp lại có phân tầng. Phân tầng nghĩa là sắp xếp dữ liệu thành các nhóm con nhỏ hơn gọi là strata, sao cho mỗi nhóm là đại diện tốt của toàn thể. Biến đầu ra được phân tầng, và bộ dữ liệu được chia giả ngẫu nhiên thành k-fold để đảm bảo các strata khác nhau có mặt theo tỷ lệ trong mỗi fold. Sau đó số lần lặp lại kiểm định chéo được tối thiểu hóa. Điều này nhằm tránh dư thừa [40] . Cuối cùng, tinh chỉnh siêu tham số đem lại một mô hình, được coi là mô hình tốt nhất thu được từ tổ hợp các siêu tham số với độ chính xác kiểm định chéo cao nhất. Tuy nhiên, tìm tổ hợp tốt nhất của các siêu tham số không phải là một nhiệm vụ tầm thường và do đó có thể không phải lúc nào cũng cho độ chính xác tốt nhất.

## 3.4.6. Đánh giá

Các thiết lập thí nghiệm để đánh giá khung học máy đề xuất cho dự đoán đái tháo đường là (1) đánh giá các phương pháp tiền xử lý dữ liệu đề xuất trong khung ML, (2) đánh giá hiệu năng của các bộ phân loại học máy khác nhau có và không có tối ưu và đánh giá mức độ nặng của mô hình tốt nhất trong dự đoán đái tháo đường, (3) đánh giá hiệu năng của mô hình học sâu đề xuất qua các bộ dữ liệu, và (4) so sánh với các phương pháp tốt nhất hiện có. Hiệu năng trong mỗi thiết lập được đánh giá bằng các độ đo sau: sensitivity, precision, F1-score, specificity, và accuracy, được thảo luận ngắn gọn trong các tiểu mục sau.

3.4.6.1. Specificity. Đây là tỷ lệ bệnh nhân không bị đái tháo đường, các mẫu âm tính, được xác định là không đái tháo đường và được tính là tỷ số của true negatives (TN) trên tổng TN và false positives (FP).

3.4.6.2. Sensitivity. Đây là tỷ lệ bệnh nhân bị đái tháo đường, các mẫu dương tính, được xác định đúng là đái tháo đường và được tính là tỷ số của true positives (TP) trên tổng TP và false negatives (FN).

3.4.6.3. Precision. Đây là tỷ lệ bệnh nhân bị đái tháo đường, các mẫu dương tính, được xác định đúng là đái tháo đường trong tất cả bệnh nhân đái tháo đường và được tính là tỷ số của TP trên tổng TP và false positives (FP).

3.4.6.4. F1-Score. Đây là trung bình có trọng số của precision và recall. Kết quả là, điểm này xét cả false positives lẫn false negatives.

3.4.6.5. Accuracy. Đây là tỷ số của tổng số dự đoán đúng trên tổng số dự đoán, và được biểu diễn như sau.

Khác với thực hành phổ biến trong nghiên cứu đái tháo đường, bài báo này cũng sẽ báo cáo độ chính xác huấn luyện và kiểm tra của mỗi mô hình cho từng thí nghiệm.

## 4. Kết quả

Kết quả của các thí nghiệm cùng các thảo luận hỗ trợ sẽ được trình bày theo thứ tự của các kịch bản thí nghiệm.

## 4.1. Đánh giá hiệu năng của các phương pháp tiền xử lý dữ liệu đề xuất

Chúng tôi sẽ bắt đầu đánh giá các phương pháp tiền xử lý dữ liệu trong khung ML đề xuất từ góc độ lựa chọn đặc trưng. Để phân tích đóng góp của phương pháp lựa chọn đặc trưng vào hiệu năng của khung ML, bộ dữ liệu LMCH được

Bảng 4 Thiết lập thí nghiệm và tham số cho các bộ phân loại có và không có tối ưu.

| Mục         |              | Mô tả                                                                                                          | Không tối ưu           | Có tối ưu           |
|-------------|--------------|----------------------------------------------------------------------------------------------------------------|------------------------|---------------------|
| RF          | Max-Depth    | Controls how specialized each tree is to the training dataset. The more the value the more likely overfitting. | 2                      | 3                   |
|             | Max-Features | The maximum allowable number of trees the RF will consider for each split.                                     | 3                      | 4                   |
|             | n-Estimators | The number of trees you want the algorithm to build.                                                           | 50                     | 50                  |
| SVM         | C            | A regularization parameter that controls the error of the misclassification of SVC to data.                    | 100                    | 1000                |
|             | Kernel       | A non-linear transformation function to map data to a high-dimensional space                                   | rbf                    | rbf                 |
|             | Gamma        | A nonlinear parameter that represents the separation line or decision region between classes.                  | 0.0001                 | 0.001               |
|             | Optimizer    | An algorithm that minimizes the loss function of the network during training.                                  | Adam                   | RMSProb             |
| 2GDNN       | Epoch        | Defines the number of passes made to the entire training dataset during training.                              | 100                    | 200                 |
|             | Batch_size   | The number of samples utilized in one iteration.                                                               | 1                      | 5                   |
| K-Fold      | n-Splits     | The number of different validations set to create from the given train data.                                   | 10                     | 10                  |
|             | n-repeats    | The Number of times cross-validation is repeated.                                                              | -                      | 3                   |
| PIMA (#728) | Train        | Percentage of the dataset for training                                                                         | 582                    | 582                 |
|             | Test         | Percentage of the dataset for testing                                                                          | 146                    | 146                 |
| MCH         | Train        |                                                                                                                | 700                    | 700                 |
|             | Test         |                                                                                                                | 150                    | 150                 |

Bảng 5 Đánh giá hiệu năng của lựa chọn đặc trưng trong khung ML.

| Tập     | Mô hình |   Precision(%) |   Recall(%) |   F1-Score(%) |   Train Acc.(%) |   TestAcc.(%) |
|---------|---------|----------------|-------------|---------------|-----------------|---------------|
| No FS   | SVM     |         94.385 |      94.000 |        93.714 |          95.429 |        94.000 |
|         | RF      |         88.651 |      92.500 |        90.432 |          92.000 |        92.500 |
| With FS | 2GDNN   |         96.212 |      96.000 |        96.051 |             100 |        95.999 |
|         | SVM     |         94.116 |      94.667 |        94.272 |          95.286 |        94.667 |
|         | RF      |         96.653 |      96.500 |        95.976 |          97.375 |        96.500 |
|         | 2GDNN   |         97.348 |      96.667 |        96.965 |          98.714 |        96.667 |

FS - feature selection.

Bảng 6 Đánh giá hiệu năng của các phương pháp nội suy giá trị thiếu.

| Bộ tiền xử lý dữ liệu |   Precision(%) |   Recall(%) |   F1-Score(%) |   Train Accuracy(%) |   Test Accuracy(%) |
|---------------------|----------------|-------------|---------------|---------------------|--------------------|
| FS + Mean           |         97.045 |      96.753 |        96.761 |              98.208 |             96.753 |
| FS + Median         |         97.045 |      96.753 |        96.761 |              98.208 |             96.753 |
| FS + Mice           |         96.054 |      95.455 |        95.552 |              98.208 |             95.455 |
| FS + PR             |         98.119 |      97.931 |        97.954 |              98.618 |             97.931 |

FS - feature selection, MVI - missing value imputation method, PR - polynomial regression.

được dùng. Đó là vì nó vốn đi kèm một lớp tiền đái tháo đường và không có giá trị thiếu. Do đó, sẽ dễ quy một khác biệt về độ chính xác cho phương pháp lựa chọn đặc trưng qua các thiết lập thí nghiệm khác nhau có và không có lựa chọn đặc trưng. Bảng 5 cho thấy rằng lựa chọn đặc trưng cải thiện hiệu năng của các bộ phân loại lần lượt 0.68%, 4%, và 0.67% cho các mô hình 2GDNN, RF, và SVM. Kết quả này cho thấy hiệu năng của mô hình RF được nâng cao đáng kể sau lựa chọn đặc trưng. Sau đó, mọi phân tích sẽ dùng tập con của các bộ dữ liệu sau lựa chọn đặc trưng làm đầu vào.

Tiếp theo, chúng tôi đánh giá hiệu năng của phương pháp nội suy giá trị thiếu đề xuất. Điều này đạt được bằng cách dùng tập con đặc trưng đã chọn của bộ dữ liệu PIMA Indian, trở thành đầu vào của khung ML. Thí nghiệm này so sánh hiệu năng của các phương pháp nội suy giá trị thiếu mean, median, MICE với phương pháp PR đề xuất. Điều này nhằm xác định phương pháp tốt nhất xử lý giá trị thiếu trong khung ML đề xuất. Để đơn giản hóa thí nghiệm, chỉ mô hình RF được dùng làm bộ phân loại cơ sở cho thí nghiệm này và không có tối ưu.

Hình 4. Đồ thị khớp đường hồi quy đa thức của dữ liệu dự báo (Glucose) với các giá trị dự đoán của Insulin. Một đa thức bậc n là 2, 7,12, và 17 được vẽ. Tóm tắt hiệu năng cho thấy một đa thức bậc 7 khớp tốt hơn.

Bảng 6 cho thấy phương pháp nội suy dự báo PR tốt hơn trong xử lý giá trị thiếu so với các phương pháp mean, median thường dùng trong tài liệu với khác biệt 1.2% về độ chính xác. Như mong đợi, MICE kém về hiệu năng với khác biệt 2.5% về độ chính xác so với PR. Điều này có lẽ do tính nhạy của nó với phi tuyến trong dữ liệu. Hơn nữa, kết quả cho thấy mean và median hoạt động ngang nhau trên các độ đo đánh giá, cho thấy cả hai phương pháp bị ảnh hưởng như nhau khi phân phối dữ liệu là phi tuyến. Mặt khác, MICE được quan sát bị ảnh hưởng nhiều hơn bởi phi tuyến của dữ liệu với độ chính xác 98.2% trên dữ liệu huấn luyện và 95.5% trên dữ liệu kiểm tra, một khác biệt 2.7%. Tuy nhiên, với khác biệt 0.69% giữa độ chính xác huấn luyện và kiểm tra, phương pháp nội suy dự báo PR cho thấy nó là một phương pháp tốt hơn để xử lý giá trị thiếu cho dữ liệu phân phối phi tuyến.

Sâu hơn, sức mạnh dự báo của PR phụ thuộc vào đánh giá thí nghiệm về đa thức bậc n tốt nhất để tìm khớp cho dữ liệu insulin. Dùng sai số căn bậc hai trung bình bình phương (RMSE) và sai số R-squared (R2), từ Hình 4 có thể suy ra rằng đa thức bậc 7 khớp tốt hơn với dữ liệu. Do đó, PR được sinh ra với đa thức bậc 7.

## 4.2. Đánh giá hiệu năng của các bộ phân loại học máy có và không có tối ưu

Dùng một tập con của bộ dữ liệu PIMA Indian đã chọn đặc trưng và xử lý giá trị thiếu bằng phương pháp PR, kết quả của các thuật toán phân loại có giám sát: SVM, PR, và 2GDNN đề xuất được đánh giá có và không có tối ưu và so sánh để xác định mô hình khớp tốt nhất với bài toán cho trước. Để quyết định thuật toán phân loại cho một bài toán phân loại cho trước, điều quan trọng là chọn một mô hình tổng quát hóa tốt nhất cho các mẫu thăm dò chưa thấy. Độ chính xác kiểm tra càng xa độ chính xác huấn luyện thì khả năng tổng quát hóa của mô hình cho các điểm dữ liệu chưa thấy càng kém. Bảng 7 cho thấy hiệu năng của bộ phân loại theo thứ tự từ tốt nhất tới kém nhất: ORF, RF, O2GDNN, SVM, OSVM, 2GDNN về độ chính xác cho cả hai kịch bản của bộ phân loại có và không có tối ưu. RF tối ưu (ORF) và RF không chỉ đạt độ chính xác cao hơn các bộ phân loại khác mà cả hai còn có thể tổng quát hóa tốt nhất cho các điểm dữ liệu chưa thấy. Chúng đạt khác biệt lần lượt 0% và 0.68% giữa độ chính xác huấn luyện và kiểm tra. 2GDNN cũng có cơ hội tốt hơn tổng quát hóa cho dữ liệu chưa thấy với khác biệt 1.76% giữa độ chính xác huấn luyện và kiểm tra sau khi các tham số tốt nhất cho dữ liệu cho trước được sắp xếp.

Hơn nữa, chúng tôi khảo sát mức độ nặng của dự đoán đái tháo đường của bệnh nhân bằng các mô hình ORF và O2GDNN. Để thăm dò hiệu năng của bộ phân loại RF đề xuất, chúng tôi tạo sáu mẫu dữ liệu để giống các mẫu bình thường, tiền đái tháo đường, và đái tháo đường thực tế như trình bày trong [41] . Từ Bảng 8 , có thể quan sát thấy mô hình 2GDNN cho xác suất xác định mức độ nặng của chẩn đoán cao hơn ORF. Tuy nhiên, 2GDNN thất bại tại một điểm trong việc đưa ra chẩn đoán đúng, điều khiến ORF tốt hơn một cách khiêm tốn trong xử lý chẩn đoán chính xác mức độ nặng đái tháo đường. Trong bối cảnh rộng hơn, O2GDNN tốt hơn khi dùng với số lượng điểm dữ liệu lớn, và trong kịch bản đó, ORF được kỳ vọng sẽ thất bại vì nó chỉ được biết là ổn định với lượng dữ liệu nhỏ [ 28 , 29 ].

## 4.3. Đánh giá hiệu năng của mô hình học sâu đề xuất qua các bộ dữ liệu

Đối với thí nghiệm này, hiệu năng của mô hình 2GNN đề xuất được đánh giá qua bộ dữ liệu PIMA Indian và bộ dữ liệu LMCH. Kết quả của thí nghiệm này được trình bày trong Bảng 9 và Hình 5 . Các bộ dữ liệu được tiền xử lý trước khi phân loại dựa trên nhu cầu của bộ dữ liệu. Hiệu năng của mô hình 2GDNN đề xuất qua các bộ dữ liệu cho thấy nó là một phương pháp tốt nhất hiện có đầy hứa hẹn.

Bảng 7 Đánh giá hiệu năng của các thuật toán phân loại trong khung ML đề xuất.

| Bộ tiền xử lý dữ liệu | Bộ phân loại |   Precision (%) |   Recall (%) |   F1-Score (%) |   Train Accuracy(%) |   Test Accuracy(%) |
|---------------------|--------------|-----------------|--------------|----------------|---------------------|--------------------|
| FS + MVI            | SVM          |          96.668 |       96.330 |         96.333 |              99.407 |             96.330 |
|                     | OSVM         |          95.605 |       95.412 |         95.421 |                 100 |             95.412 |
|                     | RF           |          98.119 |       97.931 |         97.954 |              98.620 |             97.931 |
|                     | ORF          |             100 |          100 |            100 |                 100 |                100 |
|                     | 2GDNN        |          95.156 |       94.495 |         94.504 |              99.802 |             94.495 |
|                     | O2GDNN       |          97.342 |       97.245 |         97.255 |              99.012 |             97.248 |

Bảng 8 Xác định mức độ nặng của một mô hình dự đoán cho chẩn đoán đái tháo đường.

|   S/N | Trạng thái BN   |   Glucose |   Insulin |   Huyết áp |   Age |   Dự đoán |         |            | Xác suất mức độ nặng ĐTĐ (%)           | Xác suất mức độ nặng ĐTĐ (%)           | Xác suất mức độ nặng ĐTĐ (%)           | Xác suất mức độ nặng ĐTĐ (%)           |
|-------|-----------------|-----------|-----------|------------------|-------|-------------|---------|------------|----------------------------------------|----------------------------------------|----------------------------------------|----------------------------------------|
|       |                 |           |           |                  |       |             | N       |            | P                                      | D                                      |                                        |                                        |
|       |                 |           |           |                  |       |             | ORF (%) | O2GDNN (%) | ORF (%)                                | O2GDNN (%)                             | ORF (%)                                | O2GDNN (%)                             |
|     1 | N               |        80 |       232 |               75 |    45 |           0 | 97.13   | 94.96      | 0.71                                   | 0.48                                   | 2.16                                   | 4.56                                   |
|     2 | D               |       126 |        34 |               35 |    38 |           2 | 0.00    | 0.00       | 4.54                                   | 82.74                                  | 95.46                                  | 17.26                                  |
|     3 | P               |       100 |       190 |               80 |    45 |           1 | 3.22    | 4.59       | 94.39                                  | 94.84                                  | 2.40                                   | 0.57                                   |
|     4 | D               |       130 |        20 |              100 |    50 |           2 | 0       | 0.00       | 3.07                                   | 0.00                                   | 96.93                                  | 100                                    |
|     5 | N               |        90 |       210 |               72 |    25 |           0 | 97.13   | 99.68      | 0.71                                   | 0.00                                   | 2.16                                   | 0.31                                   |
|     6 | P               |       121 |       181 |               76 |    30 |           1 | 3.22    | 0.00       | 94.39                                  | 99.99                                  | 2.40                                   | 0.00                                   |

Bảng 9 Đánh giá hiệu năng của khung ML đề xuất trên các bộ dữ liệu khác nhau.

| Dữ liệu | Mô hình           |   Precision |   Recall |   F1-Score |   Train Acc(%) |   Train Loss |   TestAcc |   TestLoss |
|--------|-------------------|-------------|----------|------------|----------------|--------------|-----------|------------|
| PIMA   | FS + MVI + 2GDNN  |      95.156 |   94.495 |     94.504 |         99.802 |        1.000 |    94.495 |      0.152 |
|        | FS + MVI + O2GDNN |      97.342 |   97.245 |     97.255 |         99.012 |        0.018 |    97.248 |      0.042 |
| LMCH   | FS + 2GDNN        |      97.348 |   96.667 |     96.965 |         98.714 |        3.600 |    96.667 |      2.151 |
|        | FS + O2GDNN       |      97.281 |   97.333 |     97.265 |         99.571 |        0.788 |    97.333 |     13.781 |

Bảng 10 So sánh các phương pháp đề xuất với

|                         | TLTK                          | Năm                           | FS                            | MVIM                  | Bộ phân loại     | Precision (%)   | Recall (SN) (%)   | SP (%)   | F1-S (%)    | Train Acc (%)   | Test Acc (%)   |
|-------------------------|-------------------------------|-------------------------------|-------------------------------|-----------------------|------------------|-----------------|-------------------|----------|-------------|-----------------|----------------|
| NN based Models         | [10]                          | 2018                          | PCA + mRMR                    | Remove missing values | NN               | -               | 79.42             | 75.08    | -           | -               | 77.25          |
|                         | [9]                           | 2019                          | PCA                           |                       | ANN              | -               | 75.00             | 29.00    | -           | -               | 75.7           |
|                         |                               |                               | Median Value                  |                       | Deep Learning    | 95.22           | 98.46             | 99.29    | 96.81       | -               | 98.07          |
|                         | [6]                           | 2021                          | -                             | Median value          | ANN              | 98.00           | 98.00             | 99.00    | 98.00       | -               | -              |
|                         | [7]                           | 2021                          | Pearson Correlation           | Mean Values           | MLP              | -               | -                 | -        | -           | 78.96           | 88.57          |
|                         | Our proposed (2GDNN + O2GDNN) | Our proposed (2GDNN + O2GDNN) | Our proposed (2GDNN + O2GDNN) |                       |                  | 97.342          | 97.245            | 97.255   | 97.351      | 99.012          | 97.248         |
| CCML based Models       | [10]                          | 2018                          | PCA + mRMR                    | Remove missing values | RF               | -               | 74.58             | 79.85    | -           | -               | 77.21          |
|                         | [17]                          | 2018                          | RF                            | Group Median          | RF               | -               | 95.96             | 79.72    | -           | -               | 92.26          |
|                         | [16]                          | 2019                          | -                             | NB                    | RF               | 80.60           | 85.40             | -        | 83.00       | -               | 87.10          |
|                         | [9]                           | 2019                          | PCA                           | Median Value          | RF               | -               | 74.00             | 29.00    | -           | -               | 75.70          |
|                         | [15]                          | 2019                          | -                             | Median                | Stacked models   | -               | 96.10             | 79.90    | 88.80       | -               | 83.80          |
|                         | [14]                          | 2020                          | Correlation Based             | Mean Value            | Ensemble Methods | 84.20           | 78.90             | 93.40    | -           | -               | -              |
|                         | [12]                          | 2020                          | -                             | Mean Value            | RF               | 90.00           | 79.41             | 79.07    | -           | -               | 76.54          |
|                         | [13]                          | 2020                          | -                             | -                     | RF & Others      | 98.00           | 95.57             | -        | 97.73       | -               | 98.48          |
|                         | [11]                          | 2020                          | Step Forward + PCA            | Mean Values           | RF & Others      | 83              | 82                | -        | -           | -               | 77.61          |
|                         | [7]                           | 2021                          | Pearson Correlation           | Mean Values           | RF KNN           | 77.90 80.40     | 77.10 79.40       | - -      | 77.40 79.80 | -               | 79.42          |
|                         | [6]                           | 2021                          | -                             | Median                | RF               | 85.00           | 85.00             | 81.00    | 85.00       | -               | -              |
|                         |                               |                               |                               |                       | GB               | 86.00           | 87.00             | 79.00    | 87.00       | -               | -              |
|                         |                               |                               |                               |                       |                  | 98.119          | 97.931            | 97.238   | 97.954      | 98.620          | 97.931         |
| Our proposed (RF + ORF) | Our proposed (RF + ORF)       | Our proposed (RF + ORF)       | Our proposed (RF + ORF)       |                       |                  | 100             | 100               | 100      | 100         | 100             | 100            |

Hình 5. Hiệu năng của 2GDNN đề xuất trên (a) bộ dữ liệu đái tháo đường PIMA Indian và (b) Laboratory of Medical City Hospital.

bộ phân loại khớp tốt với khung dự đoán và chẩn đoán đái tháo đường học máy đề xuất. Cụ thể, mô hình 2GDNN đạt độ chính xác kiểm tra 97.248% trên bộ dữ liệu PIMA Indian và đạt độ chính xác 97.333% trên bộ dữ liệu LMCH. So sánh thêm được thực hiện để so sánh 2GDNN với công trình duy nhất trong tài liệu [42] , theo tìm kiếm của chúng tôi, nơi bộ dữ liệu LMCH được dùng. Trong [42] , họ đạt độ chính xác 98.95% với 392 điểm dữ liệu được lấy mẫu ngẫu nhiên của bộ dữ liệu LMCH. So với mô hình 2GDNN đề xuất của chúng tôi vốn dùng toàn bộ 10 0 0 điểm dữ liệu của LMCH, một khác biệt 1.617% về độ chính xác được quan sát.

## 4.4. So sánh với các phương pháp tốt nhất hiện có

So sánh công trình của chúng tôi với các phương pháp tốt nhất hiện có chỉ tập trung vào tài liệu gần đây nhất và đặc biệt là nơi các phương pháp tiền xử lý dữ liệu là một thành phần đáng kể của công trình được báo cáo. So sánh sẽ dành cho các phương pháp dự đoán đái tháo đường dựa trên NN và dựa trên CML với bộ dữ liệu PIMA Indian. Từ Bảng 10 , các mô hình dựa trên NN cho thấy mức tăng hiệu năng thú vị về độ chính xác từ 75.70% năm 2018 tới 98.07% năm 2020 với bộ dữ liệu PIMA Indian. So sánh sát cho thấy khung ML đề xuất của chúng tôi với 2GDNN đạt mức tăng hiệu năng 21.99%, 21.35%, -0.82%, 8.68% khi so với công trình trong [ 10 , 9 , 6 ], và [7] . Ngoài ra, khung ML đề xuất với RF đạt mức tăng hiệu năng 20.71%, 5.67%, 10.83%, 22.2%, 14.13%, 21.4%, 20.4%, -0.55%, 20.32% và 18.54% so với công trình trong [ 10 , 17 , 16 , 9 , 15 , 14 , 12 , 13 , 11 ], và [7] . Điều thú vị là khác biệt giữa độ chính xác kiểm tra của mô hình RF trong khung ML đề xuất của chúng tôi và độ chính xác huấn luyện là 1.04%, gợi ý mô hình không quá khớp. Mặc dù phương pháp trong [13] có hiệu năng tốt hơn về độ chính xác, công trình của chúng tôi vượt trội về F1-score 0.224%.

## 5. Hạn chế và hướng làm việc tương lai

Bộ dữ liệu đái tháo đường PIMA Indian chứa thông tin của 768 phụ nữ từ một quần thể gần Phoenix, Arizona, ở Mỹ. Bộ dữ liệu có thể được giả định cho thông tin đái tháo đường thai kỳ vì có các phụ nữ mang thai được biểu diễn. Mặt khác, bộ dữ liệu LMCH gồm 10 0 0 bệnh nhân là công dân Iraq, và dù là một bộ dữ liệu gần đây hơn nó vẫn không giải quyết một số hạn chế của bộ dữ liệu PIMA Indian vì chỉ có thông tin bệnh nhân nam và nữ trưởng thành được trình bày. Vì thế, cần một biểu diễn cắt ngang qua nam giới, nữ giới (dù mang thai hay không), cũng như trẻ em, và đặc biệt người gốc Phi, những người có nguy cơ phát triển đái tháo đường cao hơn. Điều này nhằm giúp mô hình đề xuất tổng quát hóa tốt cho một quần thể đái tháo đường rộng hơn. Để giải quyết hạn chế này, chúng tôi đề xuất mở rộng phạm vi nghiên cứu vượt ra ngoài các bộ dữ liệu PIMA Indian và LMCH và tham gia thu thập dữ liệu đái tháo đường không thiên lệch. Sau đó, khảo sát khả năng tổng quát hóa của khung ML đề xuất so với các thuật toán học máy khác trên dữ liệu thu thập được. Mục tiêu sẽ là phát triển một giải pháp chăm sóc sức khỏe đáp ứng nhu cầu chẩn đoán đái tháo đường cá nhân hóa của bệnh nhân, bất kể giới tính, tuổi, hay chủng tộc.

## 6. Kết luận

Trong bài báo này, chúng tôi đề xuất một khung học máy bền vững để cải thiện hiệu năng dự đoán đái tháo đường sử dụng các bộ dữ liệu PIMA Indian và LMCH. Khung này tích hợp các cách tiếp cận tiền xử lý dữ liệu, tương quan Spearman, và hồi quy đa thức, theo một góc tiếp cận giúp tăng cường hiệu năng của chúng. Khung đề xuất hoạt động cho SVM, RF, và mô hình 2GDNN đề xuất của chúng tôi và cho thấy giải quyết tốt bài toán phân loại đái tháo đường. Điều này được chứng minh bằng độ chính xác phân loại xuất sắc 97.931% và 100% đạt được trên bộ dữ liệu PIMA Indian. Tương tự, một độ chính xác 97.333% đạt được trên bộ dữ liệu LMCH. Các hiệu năng này xếp hạng tương đương với hiệu năng tốt nhất hiện có cho các mô hình dựa trên NN và tốt nhất cho các mô hình dựa trên CML. Do đó, có thể nói rằng khung đề xuất trình bày một mô hình bền vững cho dự đoán và chẩn đoán đái tháo đường.

## Tuyên bố đóng góp tác giả (Credit authorship contribution statement)

Chollette C. Olisah : Conceptualization, Statistical Investigation, Methodology, Code writing, Validation, Testing, and Writing -original draft. Lyndon Smith : Validation, Writing -review &amp; editing. Melvyn Smith : Writing -review &amp; editing.

## Tuyên bố về xung đột lợi ích

Các tác giả tuyên bố rằng họ không có xung đột lợi ích.

## Phụ lục

Mã nguồn có tại https://github.com/chollette/2GDNN-forDiabetes-Prediction-and-Diagnosis .

## References

- [1] R.M.M. Khan , Z.J.Y. Chua , J.C. Tan , Y. Yang , Z. Liao , Y. Zhao , From pre-diabetes to diabetes: diagnosis, treatments and translational research, Medicina (B Aires) 55 (9) (2019) 546 .
- [2] Y.W. Cheng , A.B. Caughey , Gestational diabetes: diagnosis and management, J. Perinatol. 28 (10) (2008) 657-664 .
- [3] E. Standl , K. Khunti , T.B. Hansen , O. Schnell , The global epidemics of diabetes in the 21st century: current situation and perspectives, Eur. J. Prev. Cardiol. 26 (2019) 7-14 (2\_suppl) .
- [4] M.T. García-Ordás , C. Benavides , J.A. Benítez-Andrades , H. Alaiz-Moretón , I. García-Rodríguez , Diabetes detection using deep learning techniques with oversampling and feature augmentation, Comput. Method. Program. Biomed. 202 (2021) 105968 .
- [5] M.M. Bukhari , B.F. Alkhamees , S. Hussain , A. Gumaei , A. Assiri , S.S. Ullah , An improved artificial neural network model for effective diabetes prediction, Complexity (2021) 2021 .
- [6] K. Roy , M. Ahmad , K. Waqar , K. Priyaah , J. Nebhen , S.S. Alshamrani , M.A. Raza , I. Ali , An enhanced machine learning framework for Type 2 diabetes classification using imbalanced data with missing values, Complexity (2021) 2021 .
- [7] J.J. Khanam , S.Y. Foo , A comparison of machine learning algorithms for prediction, ICT Express (2021) .
8. diabetes
- [8] H. Naz , S. Ahuja , Deep learning approach for diabetes prediction using PIMA Indian dataset, J. Diabete. Metabol. Disord. 19 (1) (2020) 391-403 .
- [9] T.M. Alam , M.A. Iqbal , Y. Ali , A. Wahab , S. Ijaz , T.I. Baig , A. Hussain , M.A. Malik , M.M. Raza , S. Ibrar , Z. Abbas , A model for early prediction of diabetes, Inf. Med. Unlocked 16 (2019) 100204 .
- [10] Q. Zou , K. Qu , Y. Luo , D. Yin , Y. Ju , H. Tang , Predicting diabetes mellitus with machine learning techniques, Front. Genetic. 9 (2018) 515 .
- [11] S. Sivaranjani , S. Ananya , J. Aravinth , R. Karthika , Diabetes prediction using machine learning algorithms with feature selection and dimensionality reduction, in: 2021 7th International Conference on Advanced Computing and Communication Systems (ICACCS), IEEE, 2021, pp. 141-146. vol. 1 .
- [12] I. Gnanadass , Prediction of gestational diabetes by machine learning algorithms, IEEE Potentials 39 (6) (2020) 32-37 .
- [13] D.J. Reddy , B. Mounika , S. Sindhu , T.P. Reddy , N.S. Reddy , G.J. Sri , K. Swaraja , K. Meenakshi , P. Kora , Predictive machine learning model for early detection and analysis of diabetes, in: Materials Today: Proceedings, 2020 .
- [14] M.K. Hasan , M.A. Alam , D. Das , E. Hossain , M. Hasan , Diabetes prediction using ensembling of different machine learning classifiers, IEEE Access 8 (2020) 76516-76531 .
- [15] N. Singh , P. Singh , Stacking-based multi-objective evolutionary ensemble framework for prediction of diabetes mellitus, Biocybernetic. Biomed. Eng. 40 (1) (2020) 1-22 .
- [16] Q. Wang , W. Cao , J. Guo , J. Ren , Y. Cheng , D.N. Davis , DMP\_MI: an effective diabetes mellitus classification algorithm on imbalanced data with missing values, IEEE Access 7 (2019) 102232-102238 .
- [17] M. Maniruzzaman , M.J. Rahman , M. Al-MehediHasan , H.S. Suri , M.M. Abedin , A. El-Baz , J.S. Suri , Accurate diabetes risk stratification using machine learning: role of missing value and outliers, J. Med. Syst. 42 (5) (2018) 1-17 .
- [18] R.A . Sowah , A .A . Bampoe-Addo , S.K. Armoo , F.K. Saalia , F. Gatsi , B. SarkodieMensah , Design and development of diabetes management system using machine learning, Int. J. Telemed. Appl. (2020) 2020 .
- [19] W.K. Lee , A. Forbes , R.T. Demmer , C. Barton , J. Enticott , K. De Silva , Use and performance of machine learning models for type 2 diabetes prediction in community settings: a systematic review and meta-analysis, Int. J. Med. Inform. (2020) 104268 .
- [20] M. Maniruzzaman , N. Kumar , M.M. Abedin , M.S. Islam , H.S. Suri , A.S. El-Baz , J.S. Suri , Comparative approaches for classification of diabetes mellitus data: machine learning paradigm, Comput. Methods Programs Biomed. 152 (2017) 23-34 .
- [21] F.A. Khan , K. Zeb , M. Alrakhami , A. Derhab , S.A.C. Bukhari , Detection and Prediction of Diabetes using Data Mining: A Comprehensive Review, IEEE Access, 2021 .
- [22] C. Spearman , The proof and measurement of association between two things, Am. J. Psychol. 15 (1) (1904) 72 Available: 10.2307/1412159 [Accessed 23 June 2021] .
- [23] G. Corder , D. Foreman , in: Nonparametric Statistics: A Step-By-Step Approach, 2nd Edition, Wiley, 2021, pp. 978-1118840313 .
- [24] L. Breiman , Random forests, Mach. Learn. 45 (1) (2001) 5-32 .
- [25] V. Podgorelec , P. Kokol , B. Stiglic , I. Rozman , Decision trees: an overview and their use in medicine, J. Med. Syst. 26 (5) (2002) 445-463 Available: 10.1023/a:1016409317640 .
- [26] R. Marshall , The use of classification and regression trees in clinical epidemiology, J. Clin. Epidemiol. 54 (6) (2001) 603-609 .
- [27] G. Biau , Analysis of a random forests model, J. Mach. Learn. Res. 13 (1) (2012) 1063-1095 .
- [28] D. Opitz , R. Maclin , Popular ensemble methods: an empirical study, J. Artific. Intelligence Res. 11 (1999) 169-198 .
- [29] L. Breiman , Bagging predictors, Mach. Learn. 24 (2) (1996) 123-140 .
- [30] A.J. Smola , B. Schölkopf , Learning with kernels, GMD-Forschungszentrum Informationstechnik 4 (1998) .
- [31] A.S. Miller , B.H. Blott , Review of neural network applications in medical imaging and signal processing, Med. Biol. Eng. Comput. 30 (5) (1992) 449-464 .
- [32] N. Huma , S. Ahuja , Deep learning approach for diabetes prediction using PIMA Indian dataset, J. Diabet Metabol. Disord. 19 (1) (2020) 391-403 .
- [33] J. Smith , J. Everhart , W. Dickson , W. Knowler , R. Johannes , Using the ADAP learning algorithm to forecast the onset of diabetes mellitus, Proc. Annu. Symp. Comput. Appl. Med. Care (1988) 261-265 .
- [34] A. Rashid. 'Diabetes Dataset', Mendeley Data, v1, doi: 10.17632/wj9rwkp9c2.1 , 2020.
- [35] E. Ziegel , J. Neter , M. Kutner , C. Nachtsheim , W. Wasserman , in: Applied Linear Statistical Models, McGraw-Hill Irwin, Boston, 2005, p. 283. vol. 5 .
- [36] Z. Zhang , Missing data imputation: focusing on single imputation, Ann. Transl. Med. 4 (1) (2016) .
- [37] Multiple imputation of missing values, Stata J. 4 (3) (2004) 227-241 .
- [38] H. Shangzhi , H.S. Lynn , Accuracy of random-forest-based imputation of missing data in the presence of non-normality, non-linearity, and interaction, BMC Med. Res. Methodol. 20 (1) (2020) 1-12 .
- [39] P. Probst , Hyperparameters, Tuning and Meta-Learning for Random Forest and Other Machine Learning Algorithms, Informatik und Statistik der Ludwig-Maximilians-Universität München, 2019 .
- [40] D. Krstajic , L. Buturovic , D. Leahy , S. Thomas , Cross-validation pitfalls when selecting and assessing regression and classification models, J. Cheminform. 6 (1) (2014) .
- [41] V. Mohan , et al. , Associations of β -cell function and insulin resistance with youth-onset type 2 diabetes and prediabetes among Asian Indians, Diabetes Technol. Ther. 15 (4) (2013) 315-322 .
- [42] P. Nuankaew , C. Supansa , T. Punnarumol , Average weighted objective distance-based method for type 2 diabetes prediction, IEEE Access 9 (2021) 137015-137028 2021 .
