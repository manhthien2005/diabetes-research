<!-- extracted by pdf-extract | engine=docling+ocr | pages=16 | ocr=True | tables=9/9 | density=1.00 | score=100 -->

peunor sa uado maa pide reundosipan

Nhận April 6, 2020, chấp nhận April 18, 2020, ngày công bố April 23, 2020, ngày của phiên bản hiện tại May 7, 2020

Digital Object Identifier 10.1109/ACCESS.2020.2989857

## Dự đoán Đái tháo đường Dùng Tập hợp (Ensembling) của các Bộ phân loại Học máy Khác nhau

MD. KAMRUL HASAN1, MD. ASHRAFUL ALAM', DOLA DAS2,

- Department of Electrical and Electronic Engineering, Khulna University of Engineering & Technology, Khulna 9203, Bangladesh

3Oregon Renewable Energy Center(OREC), Department of Electrical Engineering and Renewable Energy, Oregon Institute of Technology, Klamath Falls, OR 97601, USA

2Department of ComputerScience and Engineering, Khulna University of Engineering & Technology Khulna 9203 Bangladesh

Tác giả liên hệ: Md. Kamrul Hasan (m.k.hasan @ eee.kuet.ac.bd)

TÓM TẮT Đái tháo đường, cũng được biết đến là bệnh mạn tính, là một nhóm các bệnh chuyển hóa do mức đường cao trong máu trong một thời gian dài. Yếu tố nguy cơ và mức độ nghiêm trọng của đái tháo đường có thể được giảm đáng kể do số lượng dữ liệu được gán nhãn giới hạn và cũng do sự hiện diện của các điểm ngoại lai (hoặc các giá trị thiếu) trong các bộ dữ liệu đái tháo đường. Trong tài liệu này, chúng tôi đề xuất một khung bền vững cho dự đoán đái tháo đường nơi việc loại bỏ điểm ngoại lai, điền các giá trị thiếu, tiêu chuẩn hóa dữ liệu, lựa chọn đặc trưng, kiểm định chéo K-fold, và các bộ phân loại Học máy (ML) khác nhau (k-nearest Neighbour, Decision Trees, Random Forest, AdaBoost, Naive Bayes, và XGBoost) và Multilayer Perceptron (MLP) được dùng. Tập hợp có trọng số của các mô hình ML khác nhau cũng được đề xuất, trong tài liệu này, để cải thiện dự đoán đái tháo đường nơi các trọng số được ước tính từ Diện tích Dưới Đường cong ROC (AUC) tương ứng của mô hình ML. AUC được chọn làm thước đo hiệu năng, sau đó được tối đa hóa trong khi tinh chỉnh siêu tham số dùng kỹ thuật tìm kiếm lưới (grid search). Tất cả các thí nghiệm, trong tài liệu này, được tiến hành dưới cùng các điều kiện thí nghiệm dùng Pima Indian Diabetes Dataset. Từ tất cả các thí nghiệm mở rộng, bộ phân loại tập hợp được đề xuất của chúng tôi là bộ phân loại hoạt động tốt nhất với sensitivity, specificity, false omission rate, diagnostic odds ratio, và AUC lần lượt là 0.789, 0.934, 0.092, 66.234, và 0.950 vốn vượt trội hơn các kết quả hiện đại nhất 2.00 % về AUC. Khung được đề xuất của chúng tôi cho dự đoán đái tháo đường vượt trội hơn các phương pháp khác được thảo luận trong bài báo. Nó cũng có thể cung cấp các kết quả tốt hơn trên cùng bộ dữ liệu vốn có thể dẫn đến hiệu năng tốt hơn trong dự đoán đái tháo đường. Mã nguồn của chúng tôi cho dự đoán đái tháo đường được công khai.

:CÁC TỪ KHÓA CHỈ MỤC 5 Dự đoán đái tháo đường, bộ phân loại tập hợp, học máy, multilayer perceptron, các giá trị thiếu và các điểm ngoại lai, Pima Indian Diabetic dataset.

## I.GIỚI THIỆU

Đái tháo đường là một từ rất quen thuộc trong thế giới hiện tại và là các thách thức quan trọng ở cả các quốc gia phát triển và đang phát triển [1]. Hormone insulin trong cơ thể được sản xuất bởi tuyến tụy cho phép glucose đi từ thức ăn vào dòng máu. Sự thiếu hormone đó do tuyến tụy trục trặc hình thành đái tháo đường vốn có thể dẫn đến hôn mê, suy thận và suy võng mạc, sự phá hủy bệnh lý của

Biên tập viên cộng tác điều phối việc rà soát bản thảo này và phê duyệt nó cho công bố là Wei Wei ID

GitHub: https://github.com/kamruleee51/Diabetes-Prediction-UsingMLClassifiers

các tế bào beta tuyến tụy, rối loạn chức năng tim mạch, rối loạn chức năng mạch máu não, các bệnh mạch máu ngoại biên, rối loạn chức năng tình dục, suy khớp, sụt cân, loét, và các tác động gây bệnh lên miễn dịch [2]. Nghiên cứu về các bệnh nhân đái tháo đường chứng minh rằng đái tháo đường ở người trưởng thành (trên 18 tuổi) đã tăng từ 4.7% lên 8.5% lần lượt trong 1980 đến 2014 và đang tăng nhanh ở các quốc gia thế giới thứ hai và thứ ba [3]. Các kết quả thống kê năm 2017 cho thấy 451 triệu người đang sống với đái tháo đường trên toàn thế giới, sẽ tăng lên 693 triệu vào năm 2045 [4]. Một nghiên cứu thống kê khác trong [5] cho thấy mức độ nghiêm trọng của đái tháo đường, nơi họ báo cáo rằng nửa tỷ người mắc đái tháo đường trên toàn thế giới, và con số sẽ tăng lên lần lượt 25 % và 51% trong 2030 và 2045.

Tuy nhiên, không có cách chữa dài hạn cho đái tháo đường, nhưng nó có thể được kiểm soát và phòng ngừa nếu một dự đoán sớm là chính xác khả thi. Dự đoán đái tháo đường là một nhiệm vụ thách thức, vì phân bố các lớp cho tất cả các thuộc tính không phân tách tuyến tính được như được mô tả trong Hình 1.

Trong những năm gần đây, nhiều phương pháp đã được đề xuất và công bố cho dự đoán đái tháo đường. Một khung dựa trên ML được đề xuất trong [7] nơi các tác giả đã triển khai Linear Discriminant Analysis (LDA) [8], Quadratic Discriminant Analysis (QDA) [9], Naive Bayes (NB) [10], Gaussian Process Classification (GPC) [11], Support Vector Machine (SVM) [12], Artificial Neural Network (ANN) [13], Decision Tree (DT) [16], và Random Forest (RF) [17] với các kỹ thuật giảm chiều và kiểm định chéo khác nhau. Họ cũng thực hiện các thí nghiệm mở rộng về việc loại bỏ điểm ngoại lai và điền các giá trị thiếu để tăng cường hiệu năng của mô hình ML, nơi họ đã có thể đạt được AUC cao nhất có thể là 0.930. Trong [18], các tác giả dùng ba bộ phân loại ML khác nhau như DT, SVM, và NB để dự báo khả năng đái tháo đường với độ chính xác tối đa. Họ chứng minh rằng NB là mô hình hoạt động tốt nhất với AUC là 0.819. Các kỹ thuật tập hợp AB và bagging dùng J48 (c4.5)-DT, làm một bộ học cơ sở và kỹ thuật khai phá dữ liệu độc lập (J48), đã được nghiên cứu và triển khai trong [19] cho phân loại đái tháo đường. Các kết quả thí nghiệm của họ chứng minh rằng phương pháp tập hợp AB tốt hơn bagging và J48-DT độc lập. Lập trình di truyền (Genetic programming) cho dự đoán đái tháo đường đã được đề xuất trong [20] nơi khung vượt trội hơn so với các kỹ thuật khác được triển khai bởi họ. Các tác giả, trong [21], dùng bốn phương pháp ML như DT, ANN, LR, và NB để phân loại nguy cơ đái tháo đường, nơi họ tăng cường độ bền vững bằng các kỹ thuật bagging và boosting. Các kết quả thí nghiệm cho thấy thuật toán RF cho các kết quả tối ưu trong số tất cả các thuật toán được dùng. Kỹ thuật phân loại dựa trên Gaussian Process (GP) được đề xuất, trong [22], dùng ba kernel khác nhau (linear, polynomial, và radial basis function) và so sánh với LDA, QDA, và NB truyền thống. Các tác giả cũng thực hiện các thí nghiệm mở rộng để tìm giao thức kiểm định chéo tốt nhất. Các thí nghiệm của họ chứng minh rằng bộ phân loại dựa trên GP với giao thức kiểm định chéo K10 là bộ phân loại hoạt động tốt nhất cho dự đoán đái tháo đường. Mặc dù có nhiều khung đã được công bố, trong những năm gần đây, vẫn cần cải thiện về độ chính xác và độ bền vững cho dự đoán đái tháo đường.

Trong tài liệu này, chúng tôi đề xuất một pipeline mới cho dự đoán đái tháo đường từ bộ dữ liệu PIMA Indians Diabetes. Tiền xử lý, trong pipeline được đề xuất, là trái tim của việc đạt được kết quả hiện đại nhất, gồm loại bỏ điểm ngoại lai, điền các giá trị thiếu, tiêu chuẩn hóa dữ liệu, lựa chọn đặc trưng, và kiểm định chéo K-fold. Chúng tôi xét giá trị trung bình (mean) ở vị trí thiếu của thuộc tính thay vì giá trị trung vị (median), vì nó có xu hướng trung tâm hơn về phía trung bình của phân bố thuộc tính đó. Việc gấp (folding) bộ dữ liệu cho kiểm định chéo được thực hiện cẩn thận để bảo toàn phần trăm tỷ lệ lớp, giống như trong bộ dữ liệu gốc. Các bộ phân loại ML khác nhau (k-nearest Neighbour (k-NN), RF, DT, NB, AB, và XGBoost (XB)) và MLP được triển khai trong pipeline được đề xuất của chúng tôi. Chúng tôi áp dụng kỹ thuật tìm kiếm lưới để chọn số lớp ẩn, số nơ-ron trong mỗi lớp ẩn, hàm kích hoạt, bộ khởi tạo nơ-ron, kích thước batch, tốc độ học, epoch, phần trăm nơ-ron bị bỏ, hàm mất mát, một bộ tối ưu hóa của MLP và các siêu tham số của các mô hình ML. Các thí nghiệm mở rộng được thực hiện trên các tổ hợp khác nhau của tiền xử lý và các bộ phân loại ML để tối đa hóa AUC của dự đoán đái tháo đường dưới cùng các điều kiện thí nghiệm và bộ dữ liệu. Bộ phân loại ML tốt nhất sau đó được đặt làm một mô hình cơ sở để đánh giá định lượng bộ phân loại được đề xuất của chúng tôi cho dự đoán đái tháo đường một cách chính xác. Hơn nữa, chúng tôi đề xuất một bộ phân loại tập hợp bằng tổ hợp của các mô hình ML để tăng cường dự đoán đái tháo đường. Để tập hợp các mô hình ML, bỏ phiếu mềm có trọng số (soft-weighted voting) được dùng, nơi trọng số cho mô hình riêng lẻ được ước tính từ AUC tương ứng. AUC của mô hình ML được chọn làm trọng số của mô hình đó cho tập hợp bỏ phiếu thay vì accuracy vì AUC không thiên lệch với phân bố lớp. Các thí nghiệm mở rộng trên các tổ hợp khác nhau của các mô hình ML được hoàn thành để tìm bộ phân loại tập hợp tốt nhất nơi tiền xử lý hoạt động tốt nhất từ các thí nghiệm trước được dùng.

Tổ chức của phần còn lại của bài báo như sau: Mục II trình bày bộ dữ liệu, phương pháp luận được đề xuất, và các thước đo đánh giá. Trong mục III, các kết quả thí nghiệm khác nhau được báo cáo với sự diễn giải. Cuối cùng, bài báo được kết luận với các công trình tương lai trong mục IV.

## II.VẬT LIỆU VÀ PHƯƠNG PHÁP

Mục này tập trung vào các vật liệu và phương pháp được dùng cho nghiên cứu này, trong tài liệu, nơi các mục con II-A, II-B, và II-C lần lượt giải thích bộ dữ liệu, khung được đề xuất, và phần cứng & các thước đo được dùng để đánh giá khung.

## A.BỘ DỮ LIỆU

Các mô hình ML được huấn luyện và kiểm tra trên bộ dữ liệu PIMA Indians Diabetes (PID) có sẵn công khai gồm 768 bệnh nhân đái tháo đường nữ từ quần thể Pima Indian gần Phoenix, Arizona [6]. Bộ dữ liệu này gồm 268 bệnh nhân đái tháo đường (dương tính) và 500 bệnh nhân không đái tháo đường (âm tính) với tám thuộc tính khác nhau. Các mô tả của các thuộc tính và tóm tắt thống kê ngắn gọn được trình bày trong Bảng 1. Pedigree (Diabetes Pedigree Function) được tính [6] như trong (1).

trong đó i và j lần lượt ký hiệu các họ hàng đã phát triển và KHÔNG phát triển đái tháo đường. K là phần trăm các gene được chia sẻ bởi các họ hàng (K = 0.500 cho cha mẹ hoặc anh chị em ruột, K = 0.250 cho anh chị em cùng cha khác mẹ, ông bà, cô dì hoặc chú bác và K = 0.125 cho cô dì cùng cha khác mẹ, chú bác cùng cha khác mẹ hoặc anh em họ thứ nhất). ADM; và ACLj lần lượt là tuổi của họ hàng, tính bằng năm, tại thời điểm chẩn đoán và tại lần xét nghiệm không đái tháo đường cuối cùng.

HÌNH 1. Phân bố quần thể của tất cả các thuộc tính trong PIMA Indian Diabetes Dataset [6] nơi phân bố màu xanh dương và cam lần lượt ký hiệu lớp không đái tháo đường và đái tháo đường.

BẢNG 1. Tổng quan về cohort bệnh nhân đái tháo đường.

|   SN | Attributes    | Description                                                    | Mean ± Std     |
|------|---------------|----------------------------------------------------------------|----------------|
|    1 | Pregnant (F1) | Number of times pregnant                                       | 3.85 ± 3.37    |
|    2 | Glucose (F2)  | PlasmaGlucoseConcentrationat2HoursinanOralGlucoseToleranceTest | 120.90 ± 31.97 |
|    3 | Pressure (F3) | Diastolic Blood Pressure (mm Hg)                               | 69.11 ± 19.36  |
|    4 | Triceps (F4)  | Triceps Skin Fold Thickness (mm)                               | 20.54 ± 15.95  |
|    5 | Insulin (F5)  | 2-Hour Serum Insulin (μU/ml)                                   | 79.81 ± 115.24 |
|    6 | BMI (F6)      | Body Mass Index (Weight in kg / (Height in inches)²)           | 32.00 ± 7.88   |
|    7 | Pedigree (F7) | DiabetesPedigree Function                                      | 0.47±0.33      |
|    8 | Age (F8)      | Age in years                                                   | 33.24 ± 11.76  |

## B.KHUNG ĐƯỢC ĐỀ XUẤT

Khung được đề xuất, trong tài liệu này, đã được minh họa trong Hình 2 nơi tiền xử lý dữ liệu thô là bước không thể thiếu trong pipeline được đề xuất, vì chất lượng dữ liệu có thể thúc đẩy các bộ phân loại học trực tiếp.

## 1)TIỀN XỬ LÝ

Trong khung được đề xuất, bước tiền xử lý gồm loại bỏ điểm ngoại lai (P), điền các giá trị thiếu (Q), tiêu chuẩn hóa (R), và lựa chọn đặc trưng của thuộc tính được mô tả ngắn gọn như sau:

Điểm ngoại lai (outlier) [23] là một quan sát lệch rõ rệt khỏi các quan sát khác. Nó cần được loại bỏ khỏi phân bố dữ liệu vì các bộ phân loại rất nhạy với dải dữ liệu và phân bố của các thuộc tính. Công thức toán học cho việc loại bỏ điểm ngoại lai trong tài liệu này có thể được viết như trong (2).

(2)

trong đó x là các thể hiện của vector đặc trưng nằm trong không gian n chiều, x ∈ Rn. Q1, Q3, và IQR lần lượt là tứ phân vị thứ nhất, tứ phân vị thứ ba, và khoảng tứ phân vị của các thuộc tính, nơi Q1, Q3, IQR ∈ Rn.

Các thuộc tính, sau khi loại bỏ điểm ngoại lai, được xử lý để điền các giá trị thiếu hoặc null [24] vì chúng có thể dẫn đến dự đoán sai cho bất kỳ bộ phân loại nào. Trong khung được đề xuất, các giá trị thiếu hoặc null được quy đổi (impute) bằng các giá trị trung bình của các thuộc tính thay vì bỏ, vốn có thể được công thức hóa như trong (3). Quy đổi bằng trung bình có lợi vì nó quy đổi dữ liệu liên tục mà không đưa vào các điểm ngoại lai.

trong đó x là các thể hiện của vector đặc trưng nằm trong không gian n chiều, x ∈ Rn.

Tiêu chuẩn hóa hoặc chuẩn hóa Z-score là kỹ thuật để tái tỷ lệ các thuộc tính nhằm đạt được phân phối chuẩn tắc với trung bình bằng không và phương sai đơn vị. Tiêu chuẩn hóa (R), như được trình bày trong (4), cũng giảm độ lệch (skewness) của phân bố dữ liệu.

trong đó x là các thể hiện n chiều của vector đặc trưng, x∈Rn. x∈Rn và σ∈Rn là trung bình và độ lệch chuẩn của các thuộc tính. Tuy nhiên, trong nhiều mô hình ML như các mô hình dựa trên cây có lẽ là các mô hình, nơi tiêu chuẩn hóa đặc trưng không thể cung cấp một sự đảm bảo cho cải thiện đáng kể.

HÌNH 2. Sơ đồ khối được đề xuất của một dự đoán đái tháo đường bền vững và tự động.

Độ chính xác của các bộ phân loại tăng với sự gia tăng số chiều của thuộc tính. Tuy nhiên, hiệu năng của các bộ phân loại sẽ có xu hướng giảm khi số chiều của thuộc tính tăng mà không tăng số mẫu. Một kịch bản như vậy, trong học máy, được gọi là lời nguyền của số chiều (curse of dimensionality). Do lời nguyền của số chiều, không gian của đặc trưng trở nên thưa hơn và thưa hơn vốn buộc các bộ phân loại bị quá khớp bằng cách mất khả năng tổng quát hóa. Trong tài liệu này, ba phương pháp được dùng phổ biến nhất cho lựa chọn đặc trưng là Principle Component Analysis (PCA) [25], Independent Component Analysis (ICA) [26], và kỹ thuật dựa trên Correlation [27] được dùng để so sánh hiệu năng của chúng cho bộ dữ liệu PID. Thuật toán chi tiết của PCA, ICA và kỹ thuật dựa trên Correlation lần lượt được cho trong Phụ lục A, Phụ lục B, và Phụ lục C.

## 2)KIỂM ĐỊNH CHÉO CROSS-FOLD

Kỹ thuật Kiểm định chéo K-fold (KCV) là một trong những cách tiếp cận được dùng rộng rãi nhất bởi các nhà thực hành cho việc lựa chọn mô hình và ước tính lỗi của các bộ phân loại [28]. Trình bày bằng hình ảnh của việc tách dữ liệu (kiểm định chéo 5-fold), được dùng trong tài liệu này, được trình bày trong Hình 3. Bộ dữ liệu PID đã được phân vùng thành K fold. K-1 fold được dùng để huấn luyện và tinh chỉnh các siêu tham số trong vòng lặp bên trong nơi thuật toán tìm kiếm lưới [29] được dùng. Trong vòng lặp bên ngoài (K lần), các siêu tham số tốt nhất và dữ liệu kiểm tra được dùng để đánh giá mô hình. Vì bộ dữ liệu PID chứa các mẫu dương tính và âm tính mất cân bằng, KCV phân tầng (stratified) [30] đã được dùng để bảo toàn phần trăm các mẫu cho mỗi lớp giống như trong phần trăm gốc. Thước đo hiệu năng cuối cùng được ước tính dùng phương trình như trong (5).

trong đó M là thước đo hiệu năng cuối cùng cho các bộ phân loại và Pn ∈ R, n = 1, 2, ..., K là thước đo hiệu năng cho mỗi fold.

## 3)MÔ HÌNH ML VÀ TẬP HỢP

Các mô hình ML khác nhau như k-NN [31], DT, AB, RF, NB, và XB [32] đã được huấn luyện (lần lượt xem Phụ lục D, Phụ lục E, Phụ lục F, Phụ lục G, Phụ lục H, và Phụ lục I) và kiểm tra trong khung được đề xuất. Các siêu tham số sẽ được tinh chỉnh, trong vòng lặp bên trong, được trình bày trong Bảng 2. Tập hợp của mô hình ML là kỹ thuật nổi tiếng để tăng cường hiệu năng dùng một nhóm các bộ phân loại [33], [34]. Trong tập hợp, sự tổng hợp đầu ra từ các mô hình khác nhau có thể cải thiện độ chính xác của dự đoán. Đầu ra từ mỗi mô hình, Yj(i = 1, 2, 3, ..., m = 6) ∈ RC gán C = 2 (hoặc mắc đái tháo đường, C1 hoặc không, C2) các giá trị tin cậy P; ∈ R(i = 1, 2) C cho dữ liệu kiểm tra chưa thấy nơi P; ∈ [0, 1] và >~ P; = 1. i=1

sự tổng hợp có trọng số của các mô hình ML khác nhau trong tài liệu này được thực hiện dùng phương trình như trong (6).

trong đó trọng số, W; là AUC tương ứng của bộ phân loại thứ j đó. Vì chúng tôi đang đề xuất một tập hợp bỏ phiếu mềm có trọng số, chúng tôi cần một thước đo mất cân bằng, như trong bộ dữ liệu PID, không thiên lệch làm trọng số. Đó là lý do tại sao chúng tôi chọn AUC làm trọng số cho bộ phân loại tập hợp được đề xuất. Đầu ra của mô hình được tập hợp, Y ∈ RC có các giá trị tin cậy Pen ∈ [0, 1]. Nhãn lớp cuối cùng của dữ liệu chưa thấy, X ∈ Rn từ mô hình được tập hợp sẽ là C; nếu Pen = max(Y(X)).

## 4)MULTILAYER PERCEPTRON(MLP)

Một mạng nơ-ron gồm các đơn vị xử lý, gọi là nơ-ron, nơi mỗi nơ-ron được kết nối với các nơ-ron khác bằng các kết nối một chiều của các trọng số khác nhau [35]. Một mạng nơ-ron truyền thẳng (feed-forward) hoặc MLP được dùng, trong bài báo này, được trình bày trong Hình 4 với các lớp. Vector đầu vào D chiều của bất kỳ lớp nào của MLP tạo ra vector đầu ra N chiều, f(x) : RD → RV. Đầu ra của mỗi đơn vị xử lý có thể được biểu diễn như trong (7).

HÌNH 3. Việc phân vùng bộ dữ liệu PID cho KCV cho cả việc tinh chỉnh siêu tham số và đánh giá.

BẢNG 2. Các mô hình ML khác nhau với các siêu tham số được tinh chỉnh bằng kỹ thuật tìm kiếm lưới trong vòng lặp bên trong.

| ML Models   | hyperparameters                                                                                                                                                                                                                                                                                                                                                               |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| k-NN        | 1）Number of neighbors for queries 2）Computing algorithm for nearest neighbors ·Ball Tree (BT):Node defines a D-dimensional hypersphere or ball .KD Tree (KDT): Leaf node is a D-dimensional point ·Brute:Based on thebrute-force search 3）Leaf size for BT orKDT which depends on the nature of problem 4）Metric (Manhattan distance (Li-norm)orEuclidean distance (L2-norm)) |
| DT          | 1）Measuringfunction:Gini impurity or Entropy 2）The strategy used to choose the split at each node 3）The minimum samples for an internal node 4）The minimum samples for a leaf node.                                                                                                                                                                                           |
| RF          | 1）The trees in the forest. 2）Measuringfunction:Gini impurity orEntropy                                                                                                                                                                                                                                                                                                        |
| AB          | 1）The boosting algorithm (Realboosting or Discrete boosting) 2）Learning rate to shrink the contribution of each classifier 3）The maximum number of estimators to terminate the boosting                                                                                                                                                                                       |
| NB          | 1）Portion of thelargest variance of the attributes                                                                                                                                                                                                                                                                                                                            |
| XB          | 1）Minimum sum of instance weight (Hessian) 2）Minimumlossreductionforfurtherpartitioning on theleaf node 3）Subsample ratio of the training instance 4）Subsample ratio for constructing each tree 5）Maximum tree depth                                                                                                                                                          |

trong đó xj, wj, b và Φ lần lượt là các đầu vào, trọng số, độ chệch (bias) đến nơ-ron và hàm kích hoạt phi tuyến. Các tham số của nơ-ron được cập nhật như trong (8) trong khi huấn luyện dùng lan truyền ngược (back-propagation) [36] để giảm thiểu lỗi, = ytrue — youtput·

trong đó n là tốc độ học, là lượng mà các trọng số được cập nhật trong khi huấn luyện. Tuy nhiên, nó là các lớp (Hm) và các nơ-ron (Nm) ở mỗi lớp ẩn vì chúng phụ thuộc nhiều vào bộ dữ liệu. Số lớp và nơ-ron càng nhiều sẽ có nhiều tham số hơn vốn không thể cung cấp bất kỳ đảm bảo nào để có hiệu năng tốt hơn. Càng nhiều tham số, càng nhiều mẫu cần trong bộ dữ liệu huấn luyện. Tuy nhiên, trong bài báo này, chúng tôi đang học các siêu tham số đó từ bộ dữ liệu PID. Các siêu tham số như số lớp ẩn, số nơ-ron trong mỗi lớp ẩn, hàm kích hoạt, bộ khởi tạo nơ-ron, kích thước batch, tốc độ học, epoch, phần trăm nơ-ron bị bỏ, hàm mất mát, bộ tối ưu hóa sẽ được dùng trong tìm kiếm lưới để tối ưu hóa nhằm tối đa hóa AUC.

HÌNH 4. Kiến trúc MLP, với M lớp ẩn (H) và Nm nơ-ron trong lớp Hm, cho dự đoán đái tháo đường trong khung được đề xuất.

## C.CÁC THƯỚC ĐO ĐÁNH GIÁ

Các mô hình được triển khai dùng ngôn ngữ lập trình Python với các API Python và Keras khác nhau và các thí nghiệm được tiến hành trên một máy chạy hệ điều hành Windows 10 với cấu hình phần cứng sau: bộ xử lý Intel CoreTM i7-7700 HQ CPU @ 2.80 GHz với bộ nhớ cài đặt (RAM): 16.0GB và GPU GeForce GTX 1060 với bộ nhớ 6 GB GDDR5.

Tất cả các thí nghiệm mở rộng được đánh giá dùng một số thước đo nơi mỗi thước đo có một ý nghĩa đánh giá khác nhau. Ma trận nhầm lẫn của True Positive (TP), False Positive (FP), False Negative (FN), và True Negative (TN) cùng với các thước đo khác nhau ví dụ Sensitivity (Sn), Specificity (Sp), Precision (Pr), False Omission Rate (FOR), và Diagnostic Odds Ratio (DOR) [37] đã được báo cáo. Sn (bệnh nhân có triệu chứng dương tính, nhưng bị bỏ sót sai) và lỗi loại-I (bệnh nhân có triệu chứng âm tính, nhưng được phát hiện là dương tính). Pr, FOR, và DOR đã được dùng để lần lượt đánh giá phần trăm các bệnh nhân đái tháo đường được phân loại đúng có các tình trạng dương tính, tỷ lệ các cá nhân với một kết quả xét nghiệm âm tính, mà điều kiện thật là dương tính, và tính hiệu quả của một xét nghiệm chẩn đoán. Ngoài ra, Receiver Operating Characteristics (ROC) với Area Under the ROC Curve (AUC) cũng được báo cáo để đo các dự đoán được xếp hạng tốt như thế nào, thay vì các giá trị tuyệt đối của chúng.

## III.KẾT QUẢ VÀ BÀN LUẬN

Mục này trình bày các thí nghiệm mở rộng khác nhau với các kết quả tương ứng trong một số mục con. Các kết quả cho tiền xử lý và mô hình ML lần lượt được mô tả trong các mục con III-A và III-B. Các mục con III-C và III-D lần lượt được dành để biểu diễn các kết quả cho MLP và các bộ phân loại tập hợp, và mục con III-E so sánh các kết quả.

## A.KẾT QUẢ CHO TIỀN XỬ LÝ

Phân bố theo lớp của các thuộc tính (xem Hình 1) chứng minh độ phức tạp của việc phân biệt đái tháo đường dương tính và âm tính trong bộ dữ liệu PID. Hầu hết các thuộc tính cũng có độ lệch (skewness) (dương và âm) và phân bố leptokurtic. Tuy nhiên, sự hiện diện của điểm ngoại lai đưa vào độ lệch và độ nhọn (kurtosis) (xem Hình 5 (a)) trong phân bố của thuộc tính nơi độ nhọn cao là một chỉ báo của đuôi nặng hoặc các điểm ngoại lai trong bộ dữ liệu PID. Sự hiện diện của độ lệch và độ nhọn sẽ có xu hướng lần lượt đánh giá thấp và đánh giá cao giá trị kỳ vọng. Kết quả cho loại bỏ điểm ngoại lai (xem Hình 5) chứng minh rằng độ lệch của phân bố di chuyển về phía trung bình bằng không, vốn chỉ rằng trung bình và trung vị của thuộc tính đã trùng nhau xấp xỉ (xem Hình 5 (b)). Phân bố leptokurtic (kurtosis > 3) của bộ dữ liệu PID cũng di chuyển sang một phân bố mesokurtic (kurtosis = 3). Ma trận nhầm lẫn của tương quan (xem Hình 6) trình bày kết quả cho việc loại bỏ điểm ngoại lai và điền các giá trị thiếu cùng nhau. Phân tích định tính và định lượng trên Hình 6 (a) và Hình 6 (b) chứng minh rằng tương quan của thuộc tính với kết cục mục tiêu đã cải thiện sau khi áp dụng loại bỏ điểm ngoại lai và điền các giá trị thiếu nơi hệ số tương quan, đặc biệt cho F3, F4, và F5, đã cải thiện đáng kể. Tương quan được cải thiện là người hưởng lợi cho lựa chọn đặc trưng dựa trên tương quan (xem Phụ lục C).

(b) Sau khi loại bỏ điểm ngoại lai.

các thuộc tính F4 (trái sang phải) và hàng thứ hai là cho các thuộc tính F5, F6, F7, và F8 (trái sang phải) cho cả (a) & (b).

HÌNH 6. Ma trận nhầm lẫn của tương quan thuộc tính với kết cục cho bộ dữ liệu PID (a) thô và (b) được tiền xử lý.

## B.KẾT QUẢ CHO MÔ HÌNH ML

Bảng 3 cho thấy các kết quả định lượng cho việc lựa chọn tiền xử lý và mô hình ML hoạt động tốt nhất nơi AUC

với độ lệch chuẩn được báo cáo cho việc so sánh giữa chúng. Tóm tắt khả năng của mỗi mô hình để đạt được AUC tốt nhất từ pipeline được đề xuất, với tiền xử lý và thuật toán lựa chọn thuộc tính tốt nhất tương ứng cũng như số thuộc tính được chọn, đã được báo cáo trong Bảng 4. Các siêu tham số được tinh chỉnh tốt nhất dùng tìm kiếm lưới cũng được trình bày trong Bảng 4. Việc khảo sát trên Bảng 3 cung cấp bằng chứng về việc có được các kết quả tốt hơn từ các mô hình khác nhau khi chúng tôi dùng tiền xử lý phù hợp cho chúng.

Tất cả các bộ phân loại chứng minh các kết quả tốt nhất tương ứng của chúng cho loại bỏ điểm ngoại lai và điền các giá trị thiếu khi lựa chọn đặc trưng dựa trên tương quan được dùng (xem Bảng 3 và Bảng 4). Hai thí nghiệm đầu tiên, như được trình bày trong Bảng 3, cho thấy rằng các bộ phân loại boosting (AB & XB) đánh bại tất cả các bộ phân loại về AUC. AB hoạt động tốt hơn cho dữ liệu thô (x ∈ R*), và XB hoạt động tốt hơn khi chỉ các điểm ngoại lai được loại bỏ (x ∈ R8) khỏi bộ dữ liệu PID. Hiệu năng của XB đã cải thiện một biên 0.6% khi chỉ các điểm ngoại lai được loại bỏ (P). Hai thí nghiệm này cho thấy rằng XB bị ảnh hưởng bởi điểm ngoại lai, trong bộ dữ liệu PID, nhiều hơn AB, mặc dù XB có các khả năng extreme gradient boosting. Có một khả năng quá khớp trong XB vì nó gán trọng số bằng nhau cho tất cả các bộ học cơ sở yếu, trong khi AB gán nhiều trọng số hơn cho các bộ học cơ sở yếu có hiệu năng tốt hơn. Việc xây dựng một cây mới phụ thuộc vào các phần dư (residuals) của cây trước, nơi các điểm ngoại lai sẽ có các phần dư lớn hơn nhiều so với các điểm không ngoại lai. XB không phạt các phần dư đó như trong AB. Hơn nữa, sau khi áp dụng PCA và ICA trên dữ liệu đã loại bỏ điểm ngoại lai, bộ phân loại NB cho hiệu năng tốt hơn về AUC bằng cách cải thiện AUC của tất cả các bộ phân loại khác (k-NN, DT, và RF), thậm chí các bộ phân loại boosting (AB & XB). Lý do có thể cho rằng PCA và ICA trả về vector đặc trưng với các đặc trưng loại trừ lẫn nhau và không tương quan. Vì lý do đó, NB hoạt động tốt hơn các bộ phân loại khác. Tuy nhiên, đối với lựa chọn đặc trưng dựa trên tương quan, XB vượt trội hơn các bộ phân loại khác, thậm chí các bộ phân loại NB cho tiền xử lý của P. Vì các đặc trưng từ lựa chọn dựa trên tương quan tương quan với kết cục và không còn không tương quan với nhau như trong lựa chọn đặc trưng dựa trên PCA và ICA. Vì lý do đó, NB thất bại trở thành người chiến thắng trong thí nghiệm này.

Khi các giá trị thiếu được điền (Q) bằng trung bình thay vì loại bỏ cùng với loại bỏ điểm ngoại lai (P), hiệu năng phân loại đã được tăng cường đáng kể. XB đã thắng cho tất cả các trường hợp lựa chọn đặc trưng khi cả P và Q được dùng. Đối với P+Q và PCA hoặc ICA, XB vượt trội hơn NB, nơi NB là bộ phân loại tốt nhất cho quá trình, P và PCA hoặc ICA. Tiền xử lý (P + Q) có nhiều mẫu hơn so với tiền xử lý, P một mình, vì các mẫu bị loại bỏ khi nó là một điểm ngoại lai hoặc bị thiếu trong P một mình. Đối với tiền xử lý (P + Q) và lựa chọn đặc trưng dựa trên tương quan, tất cả các bộ phân loại cho thấy thành công to lớn của chúng, vì không có các giá trị thiếu và điểm ngoại lai, nơi RF và XB lần lượt vượt trội hơn hiện đại nhất một biên 0.9 % và 1.6 % về AUC.

Việc thêm tiêu chuẩn hóa như một tiền xử lý không thể tăng hiệu năng của các bộ phân loại vì nó không phải luôn được đảm bảo để cải thiện hiệu năng. Các mô hình dựa trên cây không phải các mô hình dựa trên khoảng cách, và do đó tiêu chuẩn hóa không thể cải thiện hiệu năng của hầu hết các mô hình ML trong tài liệu này (xem Bảng 3). Hơn nữa, tiêu chuẩn hóa của bộ dữ liệu nhỏ hơn với ít thể hiện hơn được dùng trong tài liệu này có thể tăng khả năng mất thông tin về trung bình và độ lệch chuẩn vì sự biến thiên là ít.

Đáng chú ý, việc dùng lựa chọn đặc trưng dựa trên tương quan thay vì dùng các kỹ thuật dựa trên PCA và ICA cải thiện AUC của tất cả các mô hình ML khi chúng tôi áp dụng xử lý P và Q. PCA biến đổi không gian chiều cao hơn thành một không gian chiều thấp hơn dựa trên các phép chiếu trực giao chứa phương sai cao nhất. Phương sai cao hơn giữa các đặc trưng sẽ có hiệp phương sai thấp hơn, trong khi dữ liệu không tương quan chỉ độc lập một phần theo lý thuyết ICA. Hiệu năng của thuật toán PCA phụ thuộc vào số PC được dùng, nơi sự phân tách của các lớp rõ rệt hơn theo hướng phương sai nhỏ hơn. Vì ICA tìm các thành phần độc lập lẫn nhau được xác định trước mới, có một khả năng mất tương quan với kết cục mục tiêu. Cả PCA và ICA tìm các thành phần mới theo một kỹ thuật không giám sát. Vì lý do đó, không có đảm bảo về việc có hiệu năng tốt hơn trong bộ dữ liệu PID dùng PCA hoặc ICA. Mặt khác, lựa chọn đặc trưng dựa trên tương quan dùng tương quan giữa đặc trưng và kết cục mục tiêu để chọn các đặc trưng.

Từ Bảng 4, cũng được nhận thấy rằng hầu hết các bộ phân loại hoạt động tốt hơn với 6 thuộc tính so với 4 hoặc 8 thuộc tính vốn là F1, F2, F4, F5, F6, và F8. Thí nghiệm này cũng cho thấy rằng các đặc trưng như huyết áp tâm trương và diabetes pedigree function có thể được loại bỏ khỏi bộ dữ liệu PID cho dự đoán đái tháo đường, vì chúng mang ít thông tin về đái tháo đường so với các đặc trưng khác, như trong bộ dữ liệu PID. So sánh tất cả các mô hình ML trong Bảng 3 và Bảng 4, XB cung cấp hiệu năng tốt nhất với AUC (± std.) là 0.946 ± 0.020, vì nó có khả năng extreme gradient boosting để giảm thiểu mất mát khi thêm các mô hình mới song song. Hiệu năng tốt nhất của dự đoán đái tháo đường từ pipeline được đề xuất dùng mô hình XB đạt được khi tổng trọng số thể hiện trong một nút lá nhỏ hơn 5 với độ sâu cây 5. Việc giảm mất mát tối thiểu để thực hiện một phân vùng thêm trên một nút lá của cây và tỷ lệ con mẫu (subsample) để xây cây lần lượt là 1.5 và 0.6 để có được các kết quả cao nhất có thể dùng mô hình XB từ pipeline được đề xuất.

## C.KẾT QUẢ CHO MLP

Các thí nghiệm mở rộng được tiến hành trên bộ dữ liệu PID cho dự đoán đái tháo đường để có được kiến trúc MLP tốt nhất. Tám mô hình MLP khác nhau, với 1 ～ 8 lớp ẩn, được triển khai và kiểm tra, nơi số nơ-ron là siêu tham số để chọn các số tối ưu. Các kết quả thí nghiệm được trình bày trong Hình 7, nơi nó cho thấy rằng kiến trúc MLP của M = 3 lớp ẩn (H1, H2, và H3) với N1=16, N2=64, và N3=64 nơ-ron được chọn làm kiến trúc tốt nhất. Việc thêm nhiều lớp ẩn hơn với ít mẫu hơn như trong bộ dữ liệu PID

BẢNG 3. Tóm tắt tất cả các thí nghiệm mở rộng cho việc lựa chọn tiền xử lý, các phương pháp lựa chọn đặc trưng với các số thuộc tính được chọn, và bộ phân loại hoạt động tốt nhất. Cột cuối cùng biểu diễn bộ phân loại hoạt động tốt nhất cho bất kỳ tiền xử lý nào, trong khi màu xanh dương gạch chân ký hiệu tiền xử lý tốt nhất cho mỗi bộ phân loại.

| Preprocessing   | Algorithm   |   N | k-NN          | DT            | RF            | AB            | NB            | XB            | Winner   |
|-----------------|-------------|-----|---------------|---------------|---------------|---------------|---------------|---------------|----------|
| RawData         | N/A         |   8 | 0.813± 0.034  | 0.790 ± 0.052 | 0.826± 0.035  | 0.831 ± 0.026 | 0.816± 0.027  | 0.828±0.030   | AB       |
| P               | N/A         |   8 | 0.811 ± 0.046 | 0.772 ± 0.056 | 0.827± 0.039  | 0.827± 0.043  | 0.815± 0.030  | 0.834± 0.039  | XB       |
| P               | PCA         |   4 | 0.802± 0.027  | 0.760 ± 0.041 | 0.796 ± 0.056 | 0.794± 0.050  | 0.803±0.040   | 0.795± 0.061  | NB       |
| P               |             |   6 | 0.816 ± 0.004 | 0.784 ± 0.059 | 0.803± 0.037  | 0.810± 0.040  | 0.818± 0.036  | 0.812± 0.048  | NB       |
| P               | ICA         |   4 | 0.801 ± 0.055 | 0.751 ± 0.043 | 0.776 ± 0.035 | 0.780± 0.040  | 0.802±0.039   | 0.790 ± 0.044 | NB       |
| P               |             |   6 | 0.808± 0.037  | 0.754 ± 0.038 | 0.801 ± 0.037 | 0.809 ±0.053  | 0.815±0.038   | 0.811 ± 0.046 | NB       |
| P               | Corr        |   4 | 0.785 ± 0.044 | 0.765 ± 0.060 | 0.763 ± 0.045 | 0.803±0.034   | 0.801 ± 0.029 | 0.807± 0.038  | XB       |
| P               |             |   6 | 0.816± 0.039  | 0.805 ± 0.046 | 0.810 ± 0.041 | 0.837 ± 0.041 | 0.824 ± 0.037 | 0.838± 0.044  | XB       |
| P+Q             | N/A         |   8 | 0.926± 0.022  | 0.899 ± 0.030 | 0.934 ± 0.014 | 0.938±0.016   | 0.869± 0.022  | 0.943 ± 0.022 | XB       |
| P+Q             | PCA         |   4 | 0.912± 0.024  | 0.880 ± 0.021 | 0.915± 0.023  | 0.905 ± 0.022 | 0.867± 0.024  | 0.915 ± 0.019 | XB       |
| P+Q             |             |   6 | 0.913 ± 0.023 | 0.871 ± 0.019 | 0.918± 0.016  | 0.912± 0.017  | 0.869 ± 0.030 | 0.919± 0.015  | XB       |
| P+Q             | ICA         |   4 | 0.923 ± 0.015 | 0.912± 0.019  | 0.927±0.009   | 0.941 ± 0.014 | 0.874 ± 0.02  | 0.943 ± 0.013 | XB       |
| P+Q             |             |   6 | 0.886± 0.023  | 0.883 ± 0.030 | 0.897± 0.025  | 0.891 ± 0.021 | 0.871 ± 0.038 | 0.904 ± 0.020 | XB       |
| P+Q             | Corr        |   4 | 0.923± 0.015  | 0.912± 0.019  | 0.927± 0.009  | 0.941 ± 0.014 | 0.874± 0.020  | 0.943±0.013   | XB       |
| P+Q             |             |   6 | 0.926 ± 0.022 | 0.911 ± 0.007 | 0.939 ± 0.019 | 0.940±0.018   | 0.879 ± 0.025 | 0.946 ± 0.020 | XB       |
| P+Q+R           | N/A         |   8 | 0.912±0.018   | 0.899 ± 0.030 | 0.935± 0.015  | 0.938 ±0.016  | 0.876± 0.024  | 0.943± 0.022  | XB       |
| P+Q+R           | PCA         |   4 | 0.889± 0.039  | 0.880± 0.021  | 0.915 ±0.023  | 0.905 ±0.022  | 0.861± 0.032  | 0.915±0.019   | XB       |
| P+Q+R           |             |   6 | 0.904 ± 0.020 | 0.871 ± 0.019 | 0.918±0.016   | 0.912± 0.017  | 0.872 ± 0.028 | 0.919 ± 0.017 | XB       |
| P+Q+R           | ICA         |   4 | 0.891 ± 0.040 | 0.852± 0.058  | 0.905±0.020   | 0.885± 0.031  | 0.857± 0.034  | 0.904± 0.028  | RF       |
| P+Q+R           |             |   6 | 0.886 ± 0.023 | 0.883 ±0.030  | 0.897±0.025   | 0.891 ± 0.021 | 0.871 ± 0.038 | 0.904 ± 0.020 | XB       |
| P+Q+R           | Corr        |   4 | 0.918 ± 0.013 | 0.912 ± 0.019 | 0.927±0.008   | 0.941 ± 0.014 | 0.875± 0.018  | 0.943± 0.013  | XB       |
| P+Q+R           |             |   6 | 0.922 ± 0.021 | 0.911 ± 0.007 | 0.938 ±0.017  | 0.940± 0.018  | 0.877 ± 0.025 | 0.946 ± 0.020 | XB       |

Ghi chú: P: Loại bỏ điểm ngoại lai, Q: Điền giá trị thiếu, R: Tiêu chuẩn hóa, N: Số thuộc tính, và Corr: Lựa chọn đặc trưng dựa trên tương quan.

| ML Models   | Best preprocessing                 | Best hyperparameters                                                                 | Performance   |
|-------------|------------------------------------|--------------------------------------------------------------------------------------|---------------|
| k-NN        | P+Q Correlation (n_Attributes = 6) | n_neighbors = 27 leaf_size = 30 algorithm = brute L1-norm (manhattan_distance)       | 0.926 ± 0.022 |
| DT          | P+Q Correlation (n_Attributes = 4) | criterion = gini min_samples_split = 0.1 min_samples_leaf = 1 splitter = best        | 0.912 ± 0.019 |
| RF          | P+Q Correlation (n_Attributes = 6) | criterion = gini n_estimator =100                                                    | 0.939 ± 0.019 |
| AB          | P+Q Correlation (n_Attributes=4)   | algorithm =SAMME.R n_estimator =200 learning_rate= 0.1                               | 0.941 ± 0.014 |
| NB          | P+Q Correlation (n_Attributes = 6) | var_smoothing = 0.01                                                                 | 0.879 ± 0.025 |
| XB          | P+Q Correlation (n_Attributes = 6) | min_child_weight = 5 gamma = 1.5 subsample= 1.0 colssample_bytree =0.6 max_depth = 5 | 0.946±0.020   |

sẽ có xu hướng giới hạn khả năng tổng quát hóa của mô hình MLP, như được mô tả trong Hình 7. Độ sâu mở rộng trong mô hình MLP cũng có thể dẫn mô hình bị quá khớp và thường có các vấn đề gradient mờ (fading) do số lượng dữ liệu giới hạn, như trong bộ dữ liệu PID.

Các kết quả về kiến trúc MLP tốt nhất cho các tiền xử lý khác nhau được trình bày trong Bảng 6, nơi tất cả các nơ-ron được khởi tạo và kích hoạt lần lượt bởi một phân phối chuẩn và hàm ReLU [38]. Chúng tôi dùng lớp dropout [39] bằng cách bỏ ngẫu nhiên 60 % nơ-ron để xử lý quá khớp. Chúng tôi đã huấn luyện mô hình MLP của chúng tôi trên 200 epoch với tốc độ học và kích thước batch tương ứng là 0.001 và 8. Các kết quả trong Bảng 6 chứng minh rằng việc loại bỏ điểm ngoại lai và điền các giá trị thiếu thúc đẩy hiệu năng của mô hình MLP. Ghi chú: P: Loại bỏ điểm ngoại lai, Q: Điền giá trị thiếu, R: Tiêu chuẩn hóa, và Corr: Lựa chọn đặc trưng dựa trên tương quan.

BẢNG 5. Các kiến trúc MLP khác nhau với số lớp ẩn tương ứng và số nơ-ron.

| DifferentArchitectures   | Number of hiddenlayerswith correspondingneurons       |
|--------------------------|-------------------------------------------------------|
| Architecture-1           | H1ER32                                                |
| Architecture-2           | H1 E R64, H2 E R16                                    |
| Architecture-3           | H1 ER16, H2 E R64, H3 E R64                           |
| Architecture-4           | H1 ER32,H2 E R32,H3 E R16,H4 E R16                    |
| Architecture-5           | H1 ER16,H2 ∈R16,H3ER16,H4 ER16,H5 ∈R32                |
| Architecture-6           | H1 ER32,H2 ER32,H3∈R64,H4 ∈R32,H5 ∈R16,H6 ∈R64        |
| Architecture-7           | H ER16,H2R16,H3∈R16,H4∈R16,H5∈R64,H6R32,HR32          |
| Architecture-8           | H∈R64,H2∈R32,H3∈R64,H4∈R64,H5∈R32,H6∈R16,H∈R32,H8∈R16 |

BẢNG 6. Tóm tắt tất cả các thí nghiệm mở rộng trên mô hình MLP, nơi tất cả các siêu tham số từ tìm kiếm lưới được giữ không đổi suốt thí nghiệm.

| Raw Data      | P P+Q         | P P+Q          | P P+Q       | P P+Q        | P P+Q        | P P+Q          | P P+Q          |                |             |             |              |         |             |              | P+Q+R        | P+Q+R          | P+Q+R        | P+Q+R        | P+Q+R          | P+Q+R        | P+Q+R       |
|---------------|---------------|----------------|-------------|--------------|--------------|----------------|----------------|----------------|-------------|-------------|--------------|---------|-------------|--------------|--------------|----------------|--------------|--------------|----------------|--------------|-------------|
| Raw Data      | N/A           | PCA            | PCA         | ICA          | ICA          | Corr           | Corr           | N/A PCA        | N/A PCA     | ICA         | ICA          | Corr    | Corr        | N/A          | N/A          | PCA            | PCA          | ICA          | ICA            | Corr         | Corr        |
| 8             | 8             | 4              | 6           | 4            | 6            | 4              | 6              | 8              | 4           | 6           | 4            | 6       | 4           | 6            | 8            | 4              | 6            | 4            | 6              | 4            | 6           |
| ±0.040 .821 0 | ±0.032 .796 0 | 0.029 H .738 0 | 0.044 770 0 | 0.045 .787 0 | 0.045 .829 0 | 0.051 H .793 0 | 0.045 H .818 0 | 0.019 H .892 0 | 0.029 846 0 | 0.025 + 8 二 | 0.037 + .901 | 0.039 + | .902± 0.020 | 0.013 .890 0 | 0.024 .884 0 | 0.032 H .890 0 | 0.019 H .881 | 0.019 .889 0 | 0.031 H .885 0 | 0.016 H .867 | 0.015 H 884 |

HÌNH 7. Hiệu năng của các kiến trúc MLP khác nhau để chọn kiến trúc tốt nhất với AUC cao nhất, nơi các mô hình tương ứng tốt nhất được trình bày trong Bảng 5.

một biên 7.1 % về AUC từ dữ liệu thô. Chỉ tiền xử lý (P) không thể cải thiện hiệu năng do ít mẫu hơn, vì cả các điểm ngoại lai và các giá trị thiếu bị loại bỏ trong quá trình, P. AUC cao nhất từ mô hình MLP là 0.902 với một độ lệch chuẩn 0.020 khi chúng tôi thực hiện cả loại bỏ điểm ngoại lai và điền các giá trị thiếu (P + Q). Cũng được chứng minh rằng lựa chọn đặc trưng dựa trên tương quan tốt hơn trong bộ dữ liệu PID cho dự đoán đái tháo đường tương tự các thí nghiệm trước trên các mô hình ML (xem mục con III-B). ICA cũng hoạt động giống như lựa chọn đặc trưng dựa trên tương quan, độ lệch chuẩn cho cái sau ít hơn nhiều so với cái trước. Vì lý do đó cái sau có ít biến thiên giữa các fold hơn. Việc thêm tiêu chuẩn hóa với loại bỏ điểm ngoại lai và điền các giá trị thiếu không thể cải thiện các kết quả, vì có một khả năng mất thông tin về trung bình và độ lệch chuẩn do sự biến thiên ít hơn trong bộ dữ liệu PID.

## D.KẾT QUẢ CHO MÔ HÌNH TẬP HỢP

Vì các mô hình ML được tập hợp để tăng cường hiệu năng của dự đoán đái tháo đường, tiền xử lý tốt nhất từ mục con III-B và Bảng 3 & Bảng 4 được dùng trong thí nghiệm này. Tổ hợp của các mô hình ML trên, chỉ mô hình tập hợp hoạt động tốt nhất với 2, 3, 4, 5, và 6 mô hình cơ sở được báo cáo trong Bảng 7 với các kết quả tương ứng của chúng. Tổ hợp của AB và XB cung cấp các kết quả tốt nhất cho dự đoán đái tháo đường cho ba trong số năm thước đo, như được trình bày trong Bảng 7, bằng cách đánh bại các tổ hợp khác lần lượt một biên 1.20 %, 14.81 %, và 0.90 % về Sp, DOR, và AUC. Phép đo độc lập với tỷ lệ hiện mắc (DOR) của AB+XB (xem Bảng 7) có một giá trị lớn hơn các tổ hợp khác, vốn được xem là một xét nghiệm rất tốt [40] cho dự đoán đái tháo đường. Ma trận nhầm lẫn và đường cong ROC của mô hình tập hợp tốt nhất (AB+XB) lần lượt được trình bày trong Hình 8 (a) và Hình 8 (b). Tỷ lệ các bệnh nhân được phân loại đúng trong số tất cả các dự đoán dương tính là 84.2% dùng tổ hợp của AB và XB. Từ đường cong ROC (xem Hình 8 (b)), thấy rằng đối với tỷ lệ dương tính giả 0.066, xác suất có được tỷ lệ dương tính thật là 0.788 ở độ chính xác của mô hình (xem điểm sao đỏ trong Hình 8 (b)). Từ đường cong ROC, cũng được quan sát rằng biến thiên giữa các fold của AUC cũng ít vốn chứng minh độ bền vững của bộ phân loại tập hợp tốt nhất (AB+XB). Hiệu năng của AB+XB cho dự đoán đái tháo đường trên bộ dữ liệu PID là vượt trội, vì cả AB và XB là các bộ phân loại loại boosting, nơi AB là boosting tuần tự và XB là boosting song song. Tổ hợp của các mô hình ML khác với các mô hình loại boosting (AB & XB) không thể dự đoán đái tháo đường tốt như các loại boosting một mình, như được trình bày trong Bảng 7 (hàng thứ 2 ～ 5). Mặc dù tổ hợp của tất cả 6 mô hình (xem Bảng 7 (hàng thứ 5)) đánh bại tổ hợp tốt nhất (AB+XB) trong hai trong số năm thước đo, nó đã thất bại trong phép đo không thiên lệch (AUC) một biên 1.0 %. Hệ quả là, chúng tôi có thể tuyên bố rằng cho dự đoán đái tháo đường từ bộ dữ liệu PID, bỏ phiếu mềm có trọng số của

BẢNG 7. So sánh các mô hình tập hợp khác nhau để chọn bộ phân loại tốt nhất.

| EnsembleModels      | Sn            | Sp            | FOR           | DOR             | AUC           |
|---------------------|---------------|---------------|---------------|-----------------|---------------|
| AB+XB               | 0.789 ± 0.077 | 0.934 ± 0.012 | 0.092± 0.032  | 66.234±33.323   | 0.950 ± 0.021 |
| k-NN+DT+XB          | 0.793 ± 0.064 | 0.920 ± 0.019 | 0.092± 0.026  | 53.614 ± 26.766 | 0.941 ± 0.015 |
| DT+AB+RF+XB         | 0.793 ± 0.057 | 0.922 ± 0.015 | 0.091 ± 0.024 | 50.367± 13.421  | 0.943 ± 0.013 |
| k-NN+DT+RF+XB+NB    | 0.808 ± 0.047 | 0.920 ± 0.013 | 0.086 ± 0.020 | 54.135 ± 20.053 | 0.939 ± 0.016 |
| k-NN+DT+RF+AB+NB+XB | 0.813± 0.052  | 0.920 ± 0.013 | 0.084 ± 0.022 | 57.688± 24.538  | 0.940 ± 0.016 |

1.0

HÌNH 8. (a) Ma trận nhầm lẫn của phân loại đái tháo đường cao nhất có thể (b) Đường cong ROC của mô hình tập hợp được đề xuất của chúng tôi.

BẢNG 8. So sánh tất cả các mô hình được triển khai cho dự đoán đái tháo đường

| EnsembleModels   | Sn            | Sp            | FOR           | DOR             | AUC           |
|------------------|---------------|---------------|---------------|-----------------|---------------|
| XB               | 0.768± 0.072  | 0.943 ± 0.016 | 0.100 ± 0.030 | 71.369 ± 41.245 | 0.946 ± 0.020 |
| MLP              | 0.757±0.059   | 0.900 ± 0.045 | 0.107± 0.022  | 32.748± 7.570   | 0.902 ± 0.020 |
| AB+XB            | 0.789 ± 0.077 | 0.934 ± 0.012 | 0.092 ± 0.032 | 66.234± 33.323  | 0.950 ± 0.021 |

các bộ phân loại boosting nối tiếp và song song hoạt động tốt hơn bộ phân loại boosting nối tiếp hoặc song song một mình.

## E.SO SÁNH KẾT QUẢ

Trong mục con này, cả ba thí nghiệm (xem mục con III-B, III-C, và III-D) được so sánh và tóm tắt. Cuối cùng, thí nghiệm tốt nhất được so sánh với hiện đại nhất để kiểm chứng các đóng góp của chúng tôi trong tài liệu này.

Bảng 8 chứng minh rằng tập hợp có trọng số được đề xuất của AB và XB tạo ra dự đoán tốt nhất cho ba trong số năm thước đo, trong khi hoạt động như cao thứ hai về Sp và phép đo độc lập với tỷ lệ hiện mắc (DOR). Mô hình tập hợp được đề xuất (AB+XB) cho hiệu năng tốt nhất về Sn, FOR, và AUC bằng cách cải thiện XB lần lượt một biên 2.1 %, 0.8 %, và 0.6 %. Nó cũng đánh bại mô hình MLP về Sn, Sp, FOR, và AUC lần lượt một biên 3.2 %, 3.4 %, 1.5 %, và 4.8 %. Mô hình tập hợp (AB+XB) cải thiện tỷ lệ dương tính thật so với mô hình XB một mình, vì có ít khả năng phân loại sai trong mô hình tập hợp hơn. Các giá trị FOR ít hơn trong mô hình tập hợp (xem Bảng 8) chứng minh rằng giá trị dự đoán âm tính cao với lỗi loại II ít hơn trong dự đoán đái tháo đường. Hơn nữa, cũng được quan sát rằng mô hình tập hợp được đề xuất (AB+XB) cho các hiệu năng tốt nhất cho độ chính xác cân bằng (trung bình của Sn và Sp) bằng cách cải thiện các kết quả XB và MLP lần lượt 0.6 % và 3.3 %, khi tiền xử lý được đề xuất (P+Q và lựa chọn đặc trưng dựa trên tương quan) được dùng. Như một hệ quả từ các thảo luận trên trong các mục con III-B, III-C, III-D, và III-E, có thể được kết luận như sau:

Bộ phân loại tập hợp được đề xuất (AB+XB) có vẻ phù hợp hơn cho dự đoán đái tháo đường từ bộ dữ liệu PID. Đối với tập hợp, các bộ phân loại cơ sở nên có một tương quan tối thiểu giữa chúng để đạt được độ chính xác cao hơn trong dự đoán đái tháo đường (xem Bảng 7). Tập hợp của hai bộ phân loại loại boosting (thích nghi (AB) và gradient (XB)) là tổ hợp tốt nhất cho dự đoán đái tháo đường. Tổ hợp tốt nhất (AB+XB), cùng với tiền xử lý được đề xuất của chúng tôi (P+Q và lựa chọn đặc trưng dựa trên tương quan), có thể đạt được thành công to lớn cho dự đoán đái tháo đường trong bộ dữ liệu PID.

BẢNG 9. Hiệu năng so sánh của phương pháp được đề xuất của chúng tôi với các công trình hiện đại nhất trên cùng bộ dữ liệu như được trình bày trong Bảng 1.

|   SL# | AuthorsandYear                  | MVIT            | ORT    | FRT         |   NSF | Classifier                | Performance                   |
|-------|---------------------------------|-----------------|--------|-------------|-------|---------------------------|-------------------------------|
|    01 | Li (2014) [41]                  | NA              | NA     | NA          |     8 | Ensembling of SVM,ANN,&NB | Sn:0.583 AUC: Sp:0.868        |
|    02 | M.Pradhan et al.(2015) [20]     | NA              | NA     | NA          |     8 | GPA                       | AUC:- Sn:0.880 Sp:0.900       |
|    03 | A.K. Dewangan et al.(2015) [42] | NA              | NA     | Manual      |     6 | Ensembling of MLP&NB      | AUC:- Sn : 0.641 Sp:0.909     |
|    04 | S.Bashir et al.(2016)[43]       | k-NN impute     | ESD    | NA          |     8 | HM-BagMoov                | AUC:- Sn:0.787 Sp:0.926       |
|    05 | M.Maniruzzaman et al.(2017)[22] | Median          | NA     | NA          |     8 | GPC                       | AUC: Sn:0.918 Sp:0.633        |
|    06 | H.Kaur et al.(2018)[44]         | k-NN impute     | NA     | BWA         |     4 | k-NN                      | AUC:0.920 Sn: Sp:-            |
|    07 | D.Sisodia et al.(2018)[18]      | NA              | NA     | NA          |     8 | Naive Bayes               | AUC:0.819 Sn:0.763 Sp:-       |
|    08 | M.Maniruzzaman et al.(2018) [7] | Groupmedian     | Median | RF          |     4 | RF                        | AUC:0.930 Sn:0.960 Sp : 0.797 |
|    09 | Q. Wang et al.(2019) [45]       | NB method       |        |             |     8 | RF                        | AUC:0.928 Sn:0.854 Sp:        |
|    10 | S.P.Chatrati et al.2020[46]     | NA              |        | NA          |     8 | DA                        | AUC:0.700 Sn:0.720 Sp:760     |
|    11 | OurProposed (2020)              | Attribute'sMean | IQR    | Correlation |     6 | Ensembling of AB&XB       | AUC:0.950 Sn:0.789 Sp:0.934   |

NSF: Số đặc trưng được chọn, GPA: Genetic Programming Algorithm, IQR: Interquartile range, BWA: Boruta Wrapper Algorithm, ESD: Extreme Studentized Deviate, DA: Discriminant Analysis, và GPC: Gaussian Process Classification.

Từ Bảng 9, được quan sát rằng tất cả các mô hình hoạt động tốt hơn hoặc trong dự đoán đái tháo đường dương tính hoặc âm tính, trong khi mô hình được đề xuất đánh bại chúng với độ chính xác cân bằng hoặc AUC hoặc cả hai được cải thiện. Khung được đề xuất trong [43], [44] dùng kỹ thuật k-NN để quy đổi các giá trị thiếu, nơi thuật toán tìm lân cận thứ k làm một giá trị thiếu. Trong một kỹ thuật như vậy, giá trị mới được quy đổi có thể xa khỏi xu hướng trung tâm của phân bố quần thể. Hiệu năng trong pipeline (xem Bảng 9) được dùng trong [18], [20], [41], [42], [46] ít hơn so với khung được đề xuất và các khung khác trong [7], [44], [45]. Các hiệu năng ít hơn đó chỉ rõ ràng vai trò của loại bỏ điểm ngoại lai và điền các giá trị thiếu trong bộ dữ liệu PID. Lựa chọn đặc trưng thủ công [42] mà không xét tương quan và hiệp phương sai với các đặc trưng và nhãn mục tiêu là lý do khả dĩ cho việc có được các tỷ lệ dương tính thật ít hơn. Thảo luận trên và Bảng 9 xác nhận rằng bộ phân loại tập hợp được đề xuất của chúng tôi (AB+XB) để dự đoán đái tháo đường là một chẩn đoán tốt hơn, với một AUC là 0.950, khi bỏ phiếu mềm có trọng số theo AUC và pipeline tiền xử lý được đề xuất được dùng so với các phương pháp khác.

## IV.KẾT LUẬN VÀ CÔNG TRÌNH TƯƠNG LAI

Trong tài liệu này, dự đoán đái tháo đường đã được hoàn thành dùng mô hình tập hợp được đề xuất từ bộ dữ liệu PID, nơi tiền xử lý đóng một vai trò quan trọng trong dự đoán bền vững và chính xác. Chất lượng của bộ dữ liệu được cải thiện bởi sơ đồ tiền xử lý được đề xuất, nơi loại bỏ điểm ngoại lai và điền các giá trị thiếu là một mối quan tâm cốt lõi. Thuật toán 1 Các Bước Triển khai Lựa chọn Đặc trưng Dựa trên PCA Đầu vào: Dữ liệu n chiều gốc, X ∈ Rn với N số mẫu và ngưỡng phương sai, Tvariance Đầu ra: Dữ liệu k chiều được giảm, Y ∈ Rk N

- 1 Tải X ∈ Rn và tính trung bình của nó, X = Xi, i=1

trong đó X ∈ Rn

- 2 Tính ma trận hiệp phương sai n x n,

- 3 Tính phân rã eigen của Cnxn như PDP-1, trong đó P ∈ Rn là ma trận của các vector riêng và Dnxn là ma trận đường chéo với các giá trị riêng trên đường chéo
- 4 Sắp xếp các vector riêng theo thứ tự giảm dần để chọn k vector riêng đầu tiên sẽ có phương sai ≥ Tvariance và tạo một ma trận chiếu mới, Wnxk
- 5 Chiếu dữ liệu X vào một không gian k chiều mới bằng Y = WTx, trong đó Y ∈ Rk

một tiền xử lý như vậy có thể cải thiện độ nhọn và độ lệch của phân bố thuộc tính trong bộ dữ liệu PID. Lựa chọn thuộc tính dựa trên tương quan có thể cải thiện tương quan giữa thuộc tính và kết cục mục tiêu, trong khi PCA và ICA quan tâm

## Thuật toán 2 Các Bước Triển khai Lựa chọn Đặc trưng Dựa trên ICA

Đầu vào: Dữ liệu n chiều gốc, X ∈ Rn Đầu ra: Dữ liệu k chiều được giảm, Y ∈ Rk

- 1 Đặt hàm phi tuyến không bậc hai, G cho việc xấp xỉ neg-entropy
- 2 Khởi tạo W của W×H=X, trong đó W, H, và X lần lượt là các tỷ lệ của các nguồn trong khi trộn, ma trận chứa các thành phần khác nhau, và đầu ra được trộn.
- 3 Thực hiện PCA trên X bằng X = PCA(X) như trong IV-A
- 4 trong khi W thay đổi do
- 5 W = mean(X * G(W · X)) - mean(G'(wT : X)), trong đó G' là đạo hàm thứ nhất của hàm phi tuyến không bậc hai, G
- W = orthogonalize(W)
- 7 Tính, Y = W · X, trong đó Y ∈ Rk

## Thuật toán 3 Các Bước Triển khai Lựa chọn Đặc trưng Dựa trên Tương quan

Đầu vào: Dữ liệu n chiều gốc, X ∈ Rn và kết cục kỳ vọng, Yr∈R

Đầu ra: Dữ liệu k chiều được giảm, Y ∈ Rk

- 1 for i≤ n do

- 3 Sắp xếp tương quan, rir theo thứ tự giảm dần để chọn k đặc trưng đầu tiên cho Y ∈ Rk

## Thuật toán 4 Các Bước Triển khai k-Nearest Neighbour (k-NN)

Đầu vào: Dữ liệu n chiều, X ∈ Rn và kết cục mục tiêu, Y∈ R

- 1 Tính các khoảng cách hình học, Dh cho k điểm truy vấn,

thể hiện truy vấn, q = order [47].

- 2 Tạo một tập, S với k điểm gần nhất

chỉ sự dư thừa giữa các thuộc tính (inter-attribute redundancy). Trong trường hợp bộ phân loại dựa trên cây, tiêu chuẩn hóa dữ liệu không thể cung cấp bất kỳ đảm bảo nào để cải thiện hiệu năng. Việc kiểm chứng độ bền vững của

## Thuật toán 5 Các Bước Triển khai Decision Tree (DT)

Đầu vào: Dữ liệu n chiều, X ∈ Rn và kết cục mục tiêu, Y ∈ R

- 1 Tách θ = (j, tm) thành các tập con Qleft(0) và Qright(0), trong đó θ gồm một đặc trưng, j và ngưỡng, tm

- 2 Tính độ bất thuần ở nút thứ k dùng một hàm bất thuần (H),

- 3 Tối thiểu hóa độ bất thuần bằng cách chọn các tham số, 0*= argming G(Q,0)
- 4 Lặp lại các quá trình trên cho các tập con Qleft(o*) và Qright(0*) cho đến khi độ sâu đạt Nm < minsamples hoặc Nm = 1

## Thuật toán 6 Các Bước Triển khai AdaBoost (AB)

Đầu vào: Dữ liệu n chiều, X ∈ Rn với N số mẫu và kết cục mục tiêu, Y ∈ R

(đái tháo đường hiện diện (C1) hoặc không (C2))

- 1 Khởi tạo trọng số mẫu, D(i) = , trong đó

- 2 for t ≤ T(n\_Classifiers) do

Huấn luyện một bộ học yếu dùng phân phối Dt [48].

- Chọn một giả thuyết yếu, ht : Rn → R với lỗi trọng số thấp, Et = Pri~D,[ht(xi)≠ Y]
- 5 Chọn α = ln() và cập nhật, Dt+1(i) = D(i)e-αx mhi(x), trong đó i = 1, ..., N và zt là Z.t

hệ số chuẩn hóa.

- 6 Đầu ra xác suất hậu nghiệm: P(x) = sign(≥7=1 azh;(x))

XB, MLP, và bộ phân loại tập hợp được đề xuất được kiểm chứng bằng cách dùng kiểm định chéo 5-fold. Các siêu tham số của các bộ phân loại khác nhau có thể thúc đẩy khả năng học của các bộ phân loại đó, vốn được tối ưu hóa dùng một kỹ thuật tìm kiếm lưới trong khung được đề xuất của chúng tôi. AUC làm một trọng số để xây dựng một bộ phân loại tập hợp tổng quát tốt hơn, vì nó xét nhiều ưu tiên hơn cho mô hình có nhiều AUC hơn. Các bộ phân loại dựa trên cây ngẫu nhiên rất phù hợp cho dữ liệu được phân loại khi

## Thuật toán 7 Các Bước Triển khai Random Forest (RF)

Đầu vào: Dữ liệu n chiều, X ∈ Rn và kết cục mục tiêu, Y ∈ R

- 1 for b = 1 to N (n\_Bagging) do

- Vẽ một mẫu bootstrap, (Xb, Yb) từ (X ∈ Rn, Y ∈ R) cho trước
- Trồng một cây random-forest T, dùng X, và Y, bằng cách lặp lại đệ quy dùng các bước sau cho đến khi kích thước nút tối thiểu là nmin.
- 1）Chọn ngẫu nhiên m biến từ n biến cho trước
- 2）Chọn biến hoặc điểm tách tốt nhất trong số m biến
- 3）Tách nút thành hai nút con

Đầu ra tập hợp các cây sẽ là {Tp}↑

- 4 Xác suất hậu nghiệm, PRF(x) = Voting(Pk(x), trong đó Pk(x) là dự đoán lớp của random-forest thứ k.

## Thuật toán 8 Các Bước Triển khai Naive Bayes (NB)

Đầu vào: Dữ liệu n chiều, X ∈ Rn và kết cục mục tiêu, Y∈ R

(đái tháo đường hiện diện (C1) hoặc không (C2))

- 1 Tính các xác suất tiên nghiệm cho mỗi lớp [49], P(Y = Ci) = N và P(Y = C2) = NC2 N trong đó N là số mẫu
- 2 Đầu ra xác suất hậu nghiệm của lớp cho P(X) cho trước P(X|Ci) là khả năng (likelihood) của bộ dự đoán cho một lớp cho trước và P(X) là xác suất tiên nghiệm của bộ dự đoán.

sự dư thừa giữa các lớp (inter-class redundancy) cao hơn nhiều (không phân tách tuyến tính), như trong bộ dữ liệu PID. Các kết quả so sánh chứng minh rằng khung được đề xuất của chúng tôi đã vượt trội hơn các khung khác về AUC, vốn đã cho thấy tiềm năng lớn cho dự đoán đái tháo đường từ bộ dữ liệu PID. Tập hợp của hai bộ phân loại loại boosting (AB và XB) là tổ hợp tốt nhất cho dự đoán đái tháo đường, vì các bộ phân loại cơ sở nên có một tương quan tối thiểu giữa chúng. Độ chính xác cao hơn trong dự đoán đái tháo đường từ bộ dữ liệu PID dùng tổ hợp tốt nhất (AB+XB) có thể đạt được khi tiền xử lý được đề xuất của chúng tôi (P + Q và lựa chọn đặc trưng dựa trên tương quan) được áp dụng. Trong tương lai, mô hình được đề xuất

## Thuật toán 9 Các Bước Triển khai XGboost (XB)

Đầu vào: Dữ liệu n chiều, X ∈ Rn và kết cục mục tiêu, Y ∈ R

- 1 Khởi tạo mô hình với giá trị hằng:

mẫu

- 2 for m = 1 to M (n\_Iterations) do
- 8F(Xi) trong đó i = 1, 2, ..., N
- 4 Khớp một cây cơ sở, hm dùng tập huấn luyện (X;, rim) cho i=1, 2, ..., N
- Tính bộ nhân m bằng

- Cập nhật mô hình bằng Fm(x) = Fm-1(x) + Ymhm(x)
- 7 Fm(x) là xác suất hậu nghiệm mong muốn, P ∈ [0, 1]

mô hình đã huấn luyện sẽ được dùng để xây dựng một ứng dụng web với một giao diện thân thiện với người dùng. Ngoài ra, khung được đề xuất sẽ được áp dụng vào các bối cảnh y tế khác để kiểm chứng tính tổng quát của chúng.

## PHỤ LỤC CÁC THUẬT TOÁN CHO LỰA CHỌN ĐẶC TRƯNG VÀ CÁC BỘ PHÂN LOẠI ML CHO DỰ ĐOÁN ĐÁI THÁO ĐƯỜNG

- A.LỰA CHỌN ĐẶC TRƯNG DỰA TRÊN PCA xem Thuật toán 1.
- B.LỰA CHỌN ĐẶC TRƯNG DỰA TRÊN ICA xem Thuật toán 2.
- C.LỰA CHỌN ĐẶC TRƯNG DỰA TRÊN TƯƠNG QUAN xem Thuật toán 3.
- D.THUẬT TOÁN ĐỂ TRIỂN KHAI K-NEAREST NEIGHBOUR xem Thuật toán 4.
- E.CÁC THUẬT TOÁN ĐỂ TRIỂN KHAI DECISION TREE xem Thuật toán 5.
- F.CÁC THUẬT TOÁN ĐỂ TRIỂN KHAI AdaBoost xem Thuật toán 6.
- G.CÁC THUẬT TOÁN ĐỂ TRIỂN KHAI RANDOM FOREST xem Thuật toán 7.

H.CÁC THUẬT TOÁN ĐỂ TRIỂN KHAI NAIVE BAYES xem Thuật toán 8.

I.CÁC THUẬT TOÁN ĐỂ TRIỂN KHAI XGboost xem Thuật toán 9.

## XUNG ĐỘT LỢI ÍCH

Các tác giả không có bất kỳ xung đột nào để tiết lộ trong nghiên cứu này.

## TÀI LIỆU THAM KHẢO

- [1]A. Misra, H. Gopalan, R. Jayawardena, A. P. Hills, M. Soares, A.A.Reza-Albarran, and K.L.Ramaiya, "Diabetes in developing countries,"J.Diabetes,vol.11,no.7,pp.522-539,Mar.2019.
- [2]R.Vaishali,R.Sasikala,S.Ramasubbareddy,S.Remya,and S.Nalluri, "Genetic algorithm basedfeature selection and MOEfuzzy classification algorithm on pima indians diabetes dataset," in Proc. Int. Conf. Comput. Netw.Informat.(ICCNI),Oct.2017,pp.1-5.
- [3]The Emerging Risk Factors Collaboration,"Diabetes mellitus,fasting bloodglucose concentration,andrisk of vascular disease:Acollaborative meta-analysis of 102 prospective studies,"Lancet, vol. 375, pp. 2215-2222,Jun.2010.
- [4]N.H. Cho,J.E.Shaw, S.Karuranga,Y.Huang,J. D. da Rocha Fernandes, A.W.Ohlrogge,and B.Malanda,"IDF diabetes atlas:Global estimates of diabetes prevalence for 2017 and projections for 2045,"Diabetes Res. Clin.Pract.,vol.138,pp.271-281,Apr.2018.
- [5]P. Saeedi,I.Petersohn,P.Salpea,B.Malanda,S.Karuranga,N.Unwin, S.Colagiuri,L.Guariguata,A.A.Motala,K.Ogurtsova,J.E.Shaw, D.Bright, and R. Williams,"Global and regional diabetes prevalence estimates for 2019 and projectionsfor 2030 and 2045:Results from the international diabetesfederation diabetes atlas,9thedition,"DiabetesRes. Clin.Pract.,vol.157,Nov.2019,Art.no.107843.
- [6]J.W.Smith,J.E.Everhart,W.C.Dickson,W.C.Knowler, and R.S.Johannes,"Using the ADAP learning algorithm to forecast the onset of diabetes mellitus,"in Proc.Annu. Symp.Comput.Appl. Med. Care, Nov.1988,pp. 261-265.
- [7] M. Maniruzzaman, M.J. Rahman, M. Al-MehediHasan,H. S. Suri, M.M.Abedin,A.El-Baz,and J.S.Suri,"Accurate diabetes risk stratification using machine learning: Role of missing value and outliers,"J. Med. Syst.,vol.42,no.5,p.92,May 2018.
- [8]G.J.McLachlan,Discriminant analysis and statistical pattern recognition,J.Roy.Stat.Soc.,Ser.A,Statist.Soc.,vol.168,no.3,pp.635-636, Jun.2005.
- [9]T. M. Cover, "Geometrical and statistical properties of systems of linear tron.Comput.,vols.EC-14,no.3,pp.326-334,Jun.1965.
- [10]G.I. Webb, J. R. Boughton, and Z. Wang,"Not so naive bayes: Aggregating one-dependence estimators,"Mach.Learn.,vol.58,no.1,pp.5-24, Jan.2005.
- [11] S. Brahim-Belhouari and A.Bermak, "Gaussian process for nonstationary time series prediction,"Comput. Statist. Data Anal.,vol.47,no.4, Pp. 705-712, Nov. 2004.
- [12]C.Cortes and V. Vapnik,"Support-vector networks,"Mach.Learn., vol. 20, pp. 237-297, Sep. 1995.
- [13]A.Reinhardt and T. Hubbard,""Using neural networks for prediction of the subcellular location of proteins,"Nucleic Acids Res., vol. 26, no.9, pp.2230-2236,May 1998.
- [14]B.Kegl,"The return ofAdaBoost.MH:Multi-class Hamming trees,"2013, arXiv:1312.6086.[Online].Available:http://arxiv.org/abs/1312.6086
- [15]B. P. Tabaei and W. H. Herman, "A multivariate logistic regression equation to screen for diabetes:Development and validation,"Diabetes Care, vol. 25, no.11, pp. 1999-2003, Nov. 2002.
- [16] I. Jenhani, N. B. Amor, and Z. Elouedi, "Decision trees as possibilistic classifiers," Int. J. Approx. Reasoning,vol. 48, no. 3, pp.784807, Aug.2008.
- [17]L.Breiman,"Random forests,"Mach.Learn.,vol.45,no.1,pp.5-32, Oct.2001.
- [18]D. Sisodia and D. S.Sisodia, "Prediction of diabetes using classification algorithms"Procedia Comput.Sci.,vol.132,pp.1578-1585,Jan.2018.
- [19]S.Perveen,M.Shahbaz,A.Guergachi,and K.Keshavjee,"Performance analysis of data mining classification techniques to predict diabetes， Procedia Comput.Sci.,vol.82,pp.115-121,2016.
- [20]M.Pradhan and G.R.Bamnote,"Design of classifier for detection of diabetes mellitus using genetic programming,"in Proc.3rd Int. Conf. Frontiers Intell.Comput.,Theory Appl.,Nov.2015,pp.763-770.
- [21]N.Nai-arun and R.Moungmai,"Comparison of classifiers for the risk of diabetes prediction,"Procedia Comput.Sci.,vol. 69,pp.132-142, Dec.2015.
- [22] M. Maniruzzaman, N. Kumar, M. M. Abedin, M. S. Islam, H. S. Suri, A.S. El-Baz, and J. S. Suri,"Comparative approaches for classification of diabetes mellitus data:Machine learning paradigm," Comput.Methods Programs Biomed.,vol.152,pp.23-34,Dec.2017.
- [23]R.Bansal,N.Gaur, and S.N.Singh,"Outlier detection:Applications and techniques indata mining,"inProc.6thInt.Conf.Cloud Syst.BigData Eng.(Confluence),Jan.2016,pp.373-377.
- [24]D. Cousineau and S. Chartier, "Outliers detection and treatment: A review"Int.J.Psychol.Res.,vol.3,no.1,pp.58-67,Mar.2010.
- [25]C. R. Rao,"The use and interpretation of principal component analysis in applied research,"Sankhya,Indian J.Statist.,Ser.A,vol.26,pp.329-358, Dec.1964.
- [26]A.Hyvarinen and E.Oja,"Independent component analysis:Algorithms and applications,"Neural Netw.,vol.13,nos.45,pp.411430,Jun.2000.
- [27] F. Han and H. Liu, ""Statistical analysis of latent generalized correlation matrixestimation in transelliptical distribution,"Bernoulli,vol.23,no.1, Pp. 23-57,Feb. 2017.
- [28]S.Arlot and A.Celisse,"A survey ofcross-validationprocedures for model selection,"Statist. Surv.,vol. 4,pp. 40-79, Jul. 2010.
- [29]D.Krstajic,L.J.Buturovic,D.E.Leahy,and S.Thomas,"Cross-validation pitfalls when selecting and assessing regression and classification models," J. Cheminformatics,vol.6, no.1,p.10,Dec.2014.
- [30]X.Zeng and T.R.Martinez,"Distribution-balanced stratified crossvalidation for accuracyestimation,"J.Experim.Theor.Artif.Intell., vol. 12, no. 1,pp. 1-12, Jan. 2000.
- [31]P. Cunningham and S.J. Delany,"k-Nearest neighbour classifiers,"Multiple Classifier Syst.,vol.34,pp.1-17,Mar. 2007.
- [32]T. Chen and C. Guestrin,"XGBoost:A scalable tree boosting system,"in Proc.22ndACMSIGKDDInt.Conf.Knowl.DiscoveryDataMiningKDD, 2016, pp. 785-794.
- [33]S.-L.Hsieh,S.-H.Hsieh,P.-H. Cheng,C.-H. Chen,K.-P.Hsu,I.-S.Lee, Z.Wang,and F. Lai,"Design ensemble machine learning model for breast cancer diagnosis,"J. Med. Syst.,vol. 36,no.5,pp.2841-2847, Oct.2012.
- [34]B.Harangi,"Skin lesion classification with ensembles of deep convolutional neural networks,"J.Biomed.Informat.,vol.86,pp.25-32, Oct.2018.
- [35]A.S.Miller, B.H.Blott, and T.K.Hames,"Review of neural network Comput.,vol. 30,no.5,pp.449464,Sep.1992.
- [36]D. E.Rumelhart, G.E. Hinton, and J. Ronald,"Review of neural network applications in medical imaging and signal processing,"Nature,vol. 323, no.6088,pp.533-536,0ct.1986.
- [37] A. S. Glas, J. G. Lijmer, M. H. Prins, G. J. Bonsel, and P. M. M. Bossuyt, "The diagnostic odds ratio:A single indicator of test performance," J. Clin. Epidemiology,vol.56,no.11,pp.1129-1135,Nov.2003.
- [38]P. Ramachandran,B.Zoph, and Q.V.Le,"Searching for activation abs/1710.05941
- [39]N. Srivastava, G.Hinton, A.Krizhevsky, I. Sutskever, and R. SalakhutdiJ. Mach.Learn.Res.,vol.15, no.1,pp.1929-1958,Jan.2014.
- [40]J.J. Deeks,"Systematic reviews of evaluations of diagnostic and screening tests,"Brit.Med.J.,vol.323,no.7305,pp.157-162,Jul.2001.
- [41]L. Li, "Diagnosis of diabetes using a weight-adjusted voting approach," in Proc.IEEE Int.Conf.Bioinf.Bioeng.,Nov.2014,pp.320-324.
- [42]A.K.Dewangan and P.Agrawal,"Classification of diabetes mellitus using machine learning techniques,"Int. J. Eng.Appl. Sci.,vol. 2, no.5, Pp. 145-148, May 2015.
- [43]S.Bashir,U.Qamar, and F.H.Khan,"IntelliHealth:A medical decision framework,"J.Biomed.Informat.,vol.59,pp.185-200,Feb.2016.
- [44]H.Kaur and V.Kumari,"Predictive modelling and analytics for diabetes using a machine learning approach,"Appl. Comput. Informat.,Dec.2018.
- [45]Q.Wang,W.Cao,J.Guo,J.Ren,Y.Cheng,and D.N.Davis,"DMP\_MI: An effective diabetesmellitus classification algorithm onimbalanced data with missing values,"IEEE Access, vol. 7,pp.102232-102238, Jul. 2019.

- [46]S. P.Chatrati, G. Hossain, A.Goyal,A.Bhan,S. Bhattacharya, D. Gaurav, and S. M. Tiwari, "Smart home health monitoring system for predicting type 2 diabetes and hypertension," J. King Saud Univ. Comput. Inf. Sci., Jan. 2020.
- Neighbor for classification,"inProc.4thInt.Conf.FuzzySyst.Knowl. Discovery(FSKD),Aug.2007,pp.679-683.
- [48]R.E.Schapire,"Explaining AdaBoost,"in Empirical Inference.Berlin, Germany:Springer,Oct.2013,pp.37-52.
- [49]S. Taheri and M. Mammadov, "Learning the naive Bayes classifier with optimization models,"Int.J. Appl. Math.Comput.Sci.,vol.23,no.4, Pp.787-795,Dec.2013.

MD. KAMRUL HASAN sinh ra ở Tangail, Bangladesh, năm 1992. Anh nhận các bằng B.Sc. và M.Sc. kỹ thuật về kỹ thuật điện và điện tử (EEE) từ Khulna University of Engineering & Technology (KUET), lần lượt năm 2014 và 2017, và bằng M.Sc. về hình ảnh y khoa và ứng dụng (MAIA) từ University of Burgundy, Pháp, University of Cassino and Southern Lazio, Ý, và University of Girona, Tây Ban Nha,

như một Học giả Erasmus, năm 2019.

Anh hiện đang làm việc như một Trợ lý Giáo sư với Khoa EEE, KUET. Trong khi học MAIA, anh tập trung vào các phương thức khác nhau của phân tích hình ảnh y khoa và học máy để xây dựng một hệ thống chẩn đoán có máy tính hỗ trợ tổng quát. Anh cũng đang làm việc như một Người hướng dẫn với một số sinh viên đại học về các phương thức khác nhau của phân loại, phân đoạn, và đăng ký hình ảnh y khoa. Anh đã công bố một số bài báo tạp chí quốc tế và các bài báo hội nghị về xử lý hình ảnh và tín hiệu y khoa. Các mối quan tâm nghiên cứu của anh gồm phân tích hình ảnh và dữ liệu y khoa, học máy, mạng nơ-ron tích chập sâu, tái tạo hình ảnh y khoa, và robot phẫu thuật. Anh đã nhận Huy chương Vàng Đại học do giành vị trí thứ 1 trong lớp của anh tại KUET.

MD. ASHRAFUL ALAM hiện đang theo học bằng về kỹ thuật điện và điện tử (EEE) với Khulna University of Engineering & Technology (KUET). Các mối quan tâm nghiên cứu của anh gồm xử lý hình ảnh và dữ liệu y khoa, thị giác máy tính, và học sâu. Anh cũng đang làm việc về phân tích dữ liệu y khoa, phân loại ung thư da, và phân đoạn toàn bộ tim đa nhãn từ CT và MRI như một luận văn B.Sc.

DOLA DAS sinh ra ở Khulna, Bangladesh, năm 1997. Cô nhận bằng B.Sc. kỹ thuật về khoa học máy tính và kỹ thuật (CSE) từ Khulna University of Engineering & Technology (KUET), năm 2019, nơi cô hiện đang theo học bằng M.Sc. kỹ thuật.

Cô cũng đang làm việc như một Giảng viên với Khoa CSE, KUET. Các mối quan tâm nghiên cứu của cô là học máy, mạng nơ-ron sâu, khai phá dữ liệu, và kỹ thuật y sinh. Cô đã

công bố một số bài báo hội nghị trong các lĩnh vực này. Cô cũng đang làm việc về một số bài báo về các chủ đề này với các sinh viên và đồng nghiệp của cô.

IEEE Access

EKLAS HOSSAIN (Senior Member, IEEE) nhận bằng B.S. về kỹ thuật điện và điện tử từ Khulna University of Engineering & Technology, Bangladesh, năm 2006, bằng M.S. về kỹ thuật cơ điện tử và robot từ International Islamic University of Malaysia, Malaysia, năm 2010, và bằng Ph.D. từ College of Engineering and Applied Science, University of Wisconsin-Milwaukee (UWM).

Từ 2015, anh đã là một Trợ lý Giáo sư với Department of Electrical Engineering and Renewable Energy, Oregon Tech, nơi anh tham gia một số dự án nghiên cứu về năng lượng tái tạo và hệ thống microgrid kết nối lưới. Anh hiện đang làm việc như một Nhà nghiên cứu Cộng tác với Oregon Renewable Energy Center (OREC). Anh cũng là một Kỹ sư Chuyên nghiệp Đã đăng ký (PE) ở bang Oregon, USA. Anh cũng là một (REP). Anh đã làm việc trong các lĩnh vực hệ thống điện phân tán và tích hợp năng lượng tái tạo trong mười năm qua. Anh đang mong muốn khám phá các phương pháp để làm cho các hệ thống điện bền vững hơn, hiệu quả về chi phí và an toàn hơn thông qua nghiên cứu và phân tích mở rộng về lưu trữ năng lượng, các hệ thống microgrid, và các nguồn năng lượng tái tạo, với nhóm nghiên cứu tận tâm của anh. Anh đã công bố một số bài báo nghiên cứu và poster trong lĩnh vực này. Các mối quan tâm nghiên cứu của anh gồm mô hình hóa, phân tích, thiết kế, và điều khiển các thiết bị điện tử công suất, các hệ thống lưu trữ năng lượng; các nguồn năng lượng tái tạo, tích hợp các hệ thống phát điện phân tán, các ứng dụng microgrid và smart grid, robot, và các hệ thống điều khiển tiên tiến. Anh là một Senior Member của Association of Energy Engineers (AEE). Anh là người chiến thắng Giải Rising Faculty Scholar Award, năm 2019, từ Oregon Institute of Technology vì đóng góp xuất sắc của anh cho giảng dạy. Anh cũng đang phục vụ như một Associate Editor cho IEEE Access.

MAHMUDUL HASAN sinh ra ở Bangladesh, vào tháng Hai 1994. Anh nhận bằng B.Sc. về khoa học máy tính và kỹ thuật từ Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh, năm 2018. Anh hiện đang theo học bằng Ph.D. về khoa học máy tính với Stony Brook University, Stony Brook, NY, USA.

Từ 2018, anh đã là một Giảng viên với KUET. Anh cũng là một Trợ giảng Sau đại học với

Stony Brook University. Mối quan tâm nghiên cứu trước đây của anh áp dụng cho học máy và học sâu. Mối quan tâm nghiên cứu hiện tại của anh là về thị giác máy tính. Từ 2017 đến 2018, anh cũng làm việc như Chủ tịch Chi nhánh Sinh viên IEEE.
