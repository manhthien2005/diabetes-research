<!-- extracted by pdf-extract | engine=docling | pages=8 | ocr=False | tables=9/8 | density=1.12 | score=100 -->

Có sẵn trực tuyến tại www.sciencedirect.com

## ScienceDirect

ICT Express 7 (2021) 432-439

## So sánh các thuật toán học máy cho dự đoán đái tháo đường

Jobeda Jamal Khanam, Simon Y. Foo ∗

Khoa Kỹ thuật Điện và Máy tính, Trường Kỹ thuật FAMU-FSU, Tallahassee, FL 32310, USA

Nhận ngày 20 tháng 8 năm 2020; nhận bản chỉnh sửa ngày 2 tháng 1 năm 2021; chấp nhận ngày 11 tháng 2 năm 2021

Có sẵn trực tuyến ngày 20 tháng 2 năm 2021

## Tóm tắt

Đái tháo đường là một căn bệnh không có cách chữa khỏi vĩnh viễn; do đó cần phát hiện sớm. Khai phá dữ liệu (Data mining), các thuật toán học máy (machine learning, ML) và các phương pháp Mạng nơ-ron (Neural Network, NN) được sử dụng trong dự đoán đái tháo đường trong nghiên cứu của chúng tôi. Chúng tôi đã sử dụng bộ dữ liệu Pima Indian Diabetes (PID) cho nghiên cứu của mình, được thu thập từ Kho lưu trữ Học máy UCI (UCI Machine Learning Repository). Bộ dữ liệu chứa thông tin về 768 bệnh nhân và chín thuộc tính duy nhất tương ứng của họ. Chúng tôi đã sử dụng bảy thuật toán ML trên bộ dữ liệu để dự đoán đái tháo đường. Chúng tôi nhận thấy rằng mô hình với Hồi quy Logistic (Logistic Regression, LR) và Máy vectơ hỗ trợ (Support Vector Machine, SVM) hoạt động tốt trong dự đoán đái tháo đường. Chúng tôi đã xây dựng mô hình NN với lớp ẩn khác nhau với nhiều epoch khác nhau và quan sát thấy NN với hai lớp ẩn cho độ chính xác 88.6%.

c ⃝ 2021 Viện Truyền thông và Khoa học Thông tin Hàn Quốc (The Korean Institute of Communications and Information Sciences, KICS). Dịch vụ xuất bản bởi Elsevier B.V. Đây là một bài báo truy cập mở theo giấy phép CC BY-NC-ND (http://creativecommons.org/licenses/by-nc-nd/4.0/).

Từ khóa: Học máy; Khai phá dữ liệu; Mạng nơ-ron; Kiểm định chéo K-fold (K-fold Cross Validation); Độ chính xác

## 1. Giới thiệu

WHO (Tổ chức Y tế Thế giới) đã báo cáo rằng khoảng 1.6 triệu người chết do đái tháo đường mỗi năm [1]. Đái tháo đường là một loại bệnh xảy ra khi mức glucose máu/đường huyết trong cơ thể con người rất cao. Theo các chuyên gia y tế, đái tháo đường xảy ra khi tuyến của cơ thể con người gọi là tụy không thể sản xuất đủ insulin (đái tháo đường Type 1), và insulin được sản xuất không thể được sử dụng bởi tế bào của cơ thể (đái tháo đường Type 2) [2]. Khi chúng ta ăn thức ăn, sau quá trình tiêu hóa, glucose được giải phóng. Insulin là một hormone trong máu di chuyển từ máu đến các tế bào và hướng dẫn các tế bào tiêu thụ glucose máu và chuyển hóa nó thành năng lượng. Khi tụy không thể sản xuất đủ insulin, các tế bào không thể hấp thụ glucose, và glucose vẫn còn trong máu. Do đó glucose máu/đường huyết tăng lên trong máu ở mức rất không thể chấp nhận được [3]. Do đường huyết cao, một số triệu chứng phát sinh trong cơ thể con người, chẳng hạn như đói cồn cào, khát dữ dội, và đi tiểu thường xuyên. Phạm vi thông thường của mức glucose trong cơ thể con người là 70 đến 99 mg trên mỗi deciliter. Nếu mức glucose nhiều hơn 126 mg/dl, nó chỉ ra đái tháo đường. Một người được coi là có tiền đái tháo đường (prediabetes) nếu nồng độ glucose của cơ thể là 100 đến 125 mg/dl [4]. Nếu

∗ Tác giả liên hệ.

Địa chỉ E-mail: jk16c@my.fsu.edu (J.J. Khanam),

foo@eng.famu.fsu.edu (S.Y. Foo).

Bình duyệt thuộc trách nhiệm của Viện Truyền thông và Khoa học Thông tin Hàn Quốc (The Korean Institute of Communications and Information Sciences, KICS).

mức đường huyết của cơ thể con người trở nên quá cao, các biến chứng sắp xảy ra có thể là bệnh tim, suy thận, đột quỵ, và tổn thương thần kinh [5,6]. Không có cách chữa khỏi vĩnh viễn cho đái tháo đường [7]. Đái tháo đường lâu dài phổ biến nhất gây ra các vấn đề sức khỏe, đó là các biến chứng mạch máu lớn (macrovascular) và mạch máu nhỏ (microvascular). Biến chứng mạch máu lớn là tổn thương các mạch máu lớn của tim, não, và chân. Biến chứng mạch máu nhỏ làm tổn thương các mạch máu nhỏ, gây ra các vấn đề ở thận, mắt, bàn chân, và thần kinh [8]. Việc kiểm soát hiệu quả đái tháo đường là có thể nếu nó có thể được phát hiện sớm. Duy trì một hệ thống thể chất hiệu quả và thói quen ăn uống cân bằng có thể giúp ngăn ngừa đái tháo đường [9]. Nếu một bệnh nhân có tiền đái tháo đường, việc giảm cân cơ thể bằng cách hoạt động thể chất có thể làm giảm nguy cơ phát triển đái tháo đường Type 2. Chương trình Phòng ngừa Đái tháo đường Quốc gia do Trung tâm Kiểm soát và Phòng ngừa Bệnh tật (Center for Disease Control and Prevention, CDC) dẫn dắt, một chương trình thay đổi lối sống, có thể giúp thay đổi lối sống của bệnh nhân tiền đái tháo đường và ngăn ngừa phát triển đái tháo đường Type 2 [10]. Ngành chăm sóc sức khỏe thu thập một lượng dữ liệu khổng lồ bao gồm hồ sơ bệnh viện, hồ sơ y tế của bệnh nhân, và kết quả của các cuộc khám nghiệm y tế. Để chẩn đoán bệnh sớm, dự đoán của bệnh được phân tích thông qua kinh nghiệm và kiến thức của bác sĩ, nhưng điều đó có thể không chính xác và dễ sai sót. Do đó các quyết định thủ công có thể đáng báo động. Mẫu hình ẩn của dữ liệu có thể không được chú ý, điều này có thể tác động đến việc ra quyết định; do đó, bệnh nhân bị tước mất phương pháp điều trị phù hợp. Việc nhận diện tự động với độ chính xác tốt hơn là thiết yếu cho việc phát hiện sớm đái tháo đường [11-13].

Khai phá dữ liệu và học máy đã phát triển, là các công cụ đáng tin cậy và hỗ trợ trong lĩnh vực y tế trong những năm gần đây. Phương pháp khai phá dữ liệu được sử dụng để tiền xử lý và lựa chọn các đặc trưng liên quan từ dữ liệu chăm sóc sức khỏe, và phương pháp học máy giúp tự động hóa dự đoán đái tháo đường [14]. Các thuật toán khai phá dữ liệu và học máy có thể giúp nhận diện mẫu hình ẩn của dữ liệu bằng phương pháp tiên tiến; do đó, một quyết định độ chính xác đáng tin cậy là có thể. Khai phá Dữ liệu (Data Mining) là một quá trình nơi nhiều kỹ thuật được tham gia, bao gồm học máy, thống kê, và hệ thống cơ sở dữ liệu để khám phá một mẫu hình từ lượng dữ liệu khổng lồ [15]. Theo Nvidia: Học máy sử dụng nhiều thuật toán khác nhau để học từ dữ liệu đã phân tích cú pháp và đưa ra dự đoán [16].

## 2. Tổng quan tài liệu

Một số học giả đã sử dụng phương pháp học máy (ML) để dự đoán đái tháo đường bằng bộ dữ liệu Pima Indian diabetes (PIDD). Bộ dữ liệu Pima Indian Diabetes (PIDD) có: 9 thuộc tính, 768 bản ghi mô tả bệnh nhân nữ. Một số công trình liên quan chặt chẽ được thảo luận trong phần này [17-21].

Alam, T.M. và cộng sự [17] cho thấy độ chính xác 75.7% bằng cách áp dụng kỹ thuật ANN trên PIDD. Sajida Perveen và cộng sự [22] đã sử dụng một bộ dữ liệu được tích hợp trong nghiên cứu này được lấy từ Mạng Giám sát Theo dõi Chăm sóc Ban đầu Canada (Canadian Primary Care Sentinel Surveillance Network, CPCSSN). Bộ dữ liệu CPCSSN chứa trong nghiên cứu này bao gồm thông tin liên quan đến huyết áp tâm thu (systolic blood pressure, sBP), huyết áp tâm trương (diastolic blood pressure, dBP), HDL, triglyceride (TG), BMI, đường huyết lúc đói (fasting blood sugar, FBS), và giới tính. Họ đã sử dụng Bootstrap aggregating, Adaptive Boosting, và mô hình cây quyết định. Họ nhận thấy để có độ chính xác tốt hơn, Adaboost có thể được áp dụng để dự đoán các bệnh như đái tháo đường, bệnh tim mạch vành, và tăng huyết áp. Sisodia và cộng sự [18] nhận thấy rằng, trong số các phương pháp học máy được áp dụng SVM, NB, và DT trên PIDD, bộ phân loại NB cho thấy độ chính xác tốt hơn ở mức 76.30%. Tigga và cộng sự trong [19] đã áp dụng hồi quy logistic trên PIDD cho dự đoán đái tháo đường. Họ nhận thấy số lần mang thai, BMI, và mức glucose là các biến quan trọng nhất cho dự đoán đái tháo đường trong số tất cả các đặc trưng trong PIDD. Bộ dữ liệu Pima Indian Diabetes được lấy để phân tích, và RStudio được sử dụng để xử lý và trực quan hóa kết quả. Mô hình của họ đang cho thấy dự đoán khá tốt với độ chính xác 75.32%. Trong nghiên cứu của Amour Diwani và cộng sự [20], tất cả dữ liệu của bệnh nhân được huấn luyện và kiểm tra bằng 10 kiểm định chéo (cross-validations) với Naive Bayes và cây quyết định. Sau đó hiệu suất được đánh giá, khảo sát, và so sánh với các thuật toán phân loại khác bằng WEKA. Kết quả dự đoán rằng thuật toán tốt nhất là Naive Bayes với độ chính xác 76.3021%. Trong nghiên cứu của Zou và cộng sự [21], họ đã áp dụng Random Forest, Decision Tree, ANN cho thuật toán phân loại trên PIDD sau khi giảm đặc trưng bằng các phương pháp Phân tích Thành phần Chính (Principal Component Analysis, PCA) và Minimum Redundancy Maximum Relevance (mRMR). Họ nhận thấy rằng độ chính xác tốt nhất của Pima Indians là 77.21% thu được từ random forest với phương pháp giảm đặc trưng mRMR.

Vấn đề quan trọng nhất trong phương pháp học máy là chọn các đặc trưng hợp lý và bộ phân loại phù hợp. Trong công trình của chúng tôi, chúng tôi đã sử dụng phương pháp tương quan Pearson (Pearson's correlation) để tìm các đặc trưng hợp lý. Công trình nghiên cứu của chúng tôi là dự đoán một bệnh nhân có bị đái tháo đường hay không. Trong công trình này, để dự đoán đái tháo đường ở một bệnh nhân, các thuật toán phân loại học máy khác nhau như Naive Bayes (NB), SVM, Hồi quy Tuyến tính (Linear Regression, LR), Adaboost, Random Forest, K Nearest Neighbor (KNN), Decision Tree (DT), và Mạng nơ-ron (Neural Network, NN) với lớp ẩn khác nhau được sử dụng và đánh giá trên bộ dữ liệu. Việc đánh giá hiệu suất của tất cả các phương pháp phân loại được thực hiện với nhiều phương pháp đo lường khác nhau.

## 3. Phương pháp

## 3.1. Dữ liệu, đặc trưng, và công cụ phần mềm

Trong nghiên cứu của chúng tôi, bộ dữ liệu Pima Indian diabetes (PID) được thu thập từ Kho lưu trữ Học máy UCI (UCI Machine Learning Repository), có nguồn gốc từ viện quốc gia về đái tháo đường và các bệnh tiêu hóa và thận (national institute of diabetes and digestive and kidney diseases, NIDDK). Trong bộ dữ liệu PID, tất cả các bệnh nhân đều là nữ, và ít nhất 21 tuổi. Bộ dữ liệu chứa thông tin về 768 bệnh nhân và chín thuộc tính duy nhất tương ứng của họ. Bảng 1 cho thấy mô tả của các thuộc tính của bộ dữ liệu này. Chín thuộc tính được sử dụng cho dự đoán đái tháo đường là Pregnancy, BMI, Insulin level, Age, Blood pressure, Skin thickness, Glucose, Diabetes pedigree function, và Outcome. Thuộc tính 'outcome' được lấy làm biến phụ thuộc hoặc biến mục tiêu, và tám thuộc tính còn lại được lấy làm biến độc lập/biến đặc trưng. Thuộc tính đái tháo đường 'outcome' gồm giá trị nhị phân trong đó 0 nghĩa là không đái tháo đường, và 1 ngụ ý đái tháo đường [23]. Trong nghiên cứu của chúng tôi, chúng tôi đã sử dụng các thuật toán khai phá dữ liệu và học máy để dự đoán một bệnh nhân có bị đái tháo đường hay không với độ chính xác được nâng cao. Béo phì làm tăng đáng kể nguy cơ phát triển đái tháo đường Type 2 của con người. Bảng 1 cho thấy rằng chỉ số khối cơ thể trung bình là 32 cho 768 bệnh nhân. Bộ dữ liệu dành cho bệnh nhân đái tháo đường Type 2, vì những người có BMI từ 30 trở lên được coi là béo phì [24].

Chúng tôi đã sử dụng Weka, một công cụ phần mềm học máy và khai phá dữ liệu mã nguồn mở cho phân tích hiệu suất của bộ dữ liệu đái tháo đường. Weka chứa các công cụ cho tiền xử lý dữ liệu, phân cụm, phân loại, hồi quy, trực quan hóa, và lựa chọn đặc trưng [25]. Mạng nơ-ron được triển khai trong Jupyter Notebook, và ngôn ngữ lập trình Python được sử dụng để viết mã [26].

## 3.2. Tiền xử lý dữ liệu

Tiền xử lý giúp biến đổi dữ liệu để có thể xây dựng một mô hình học máy tốt hơn, cung cấp độ chính xác cao hơn. Tiền xử lý thực hiện nhiều chức năng khác nhau: loại bỏ ngoại lệ, điền các giá trị thiếu, chuẩn hóa dữ liệu, lựa chọn đặc trưng để cải thiện chất lượng dữ liệu. Trong bộ dữ liệu, 268 mẫu được phân loại là đái tháo đường, và 500 là không đái tháo đường.

## 3.2.1. Nhận diện giá trị thiếu

Sử dụng công cụ excel và weka, chúng tôi đã thu được các giá trị thiếu trong các bộ dữ liệu, được hiển thị trong Bảng 2. Chúng tôi đã thay thế giá trị thiếu bằng giá trị trung bình tương ứng.

Bảng 2

Số lượng giá trị thiếu trong bộ dữ liệu PIMA.

Hình 1. Số lượng giá trị ngoại lệ và giá trị cực trị.

| Thuộc tính    |   Số giá trị thiếu |
|---------------|-------------------------|
| Preg          |                       0 |
| Glucose       |                       5 |
| BP            |                      35 |
| SkinThickness |                     227 |
| Insulin       |                     374 |
| BMI           |                      11 |
| DPF           |                       0 |
| Age           |                       0 |

## 3.2.2. Nhận diện và loại bỏ ngoại lệ

Sử dụng công cụ Weka, chúng tôi đã lọc bộ dữ liệu để phát hiện các ngoại lệ và giá trị cực trị dựa trên khoảng tứ phân vị. Số lượng ngoại lệ và giá trị cực trị được hiển thị trong Hình 1, nơi chúng tôi có thể thấy rằng có 45 ngoại lệ và 26 giá trị cực trị. Có 699 thực thể sau khi loại bỏ các ngoại lệ và giá trị cực trị này khỏi bộ dữ liệu.

## 3.2.3. Lựa chọn đặc trưng

Phương pháp tương quan Pearson (Pearson's correlation) là một phương pháp phổ biến để tìm các thuộc tính/đặc trưng liên quan nhất. Hệ số tương quan được tính trong phương pháp này, hệ số này tương quan với các thuộc tính đầu ra và đầu vào. Giá trị hệ số nằm trong khoảng giữa -1 và 1. Giá trị trên 0.5 và dưới -0.5 chỉ ra một tương quan đáng chú ý, và giá trị bằng không nghĩa là không có tương quan. Trong Weka, bộ lọc tương quan được sử dụng để tìm hệ số tương quan, và kết quả được hiển thị trong Bảng 3. Chúng tôi đã sử dụng 0.2

Bảng 1

Các thuộc tính của bộ dữ liệu PIMA.

Bảng 3

| Thuộc tính    | Mô tả                                                                | Loại    | Trung bình/Mean |
|---------------|---------------------------------------------------------------------|---------|----------------|
| Preg          | Số lần mang thai.                                                    | Numeric | 3.85           |
| Glucose       | Nồng độ glucose huyết tương 2 giờ trong nghiệm pháp dung nạp glucose đường uống. | Numeric | 120.89         |
| BP            | Huyết áp tâm trương (mm Hg).                                         | Numeric | 69.11          |
| SkinThickness | Độ dày nếp gấp da cơ tam đầu (mm).                                   | Numeric | 20.54          |
| Insulin       | Insulin huyết thanh 2 giờ ( µ lU/mL).                               | Numeric | 79.80          |
| BMI           | Chỉ số khối cơ thể (kg/m 2 ).                                        | Numeric | 32             |
| DPF           | Hàm phả hệ đái tháo đường.                                           | Numeric | 0.47           |
| Age           | Tuổi (năm).                                                          | Numeric | 33             |
| Outcome       | Kết quả chẩn đoán đái tháo đường (tested_positive: 1, tested_negative: 0)  | Nominal | -              |

Tương quan giữa các thuộc tính đầu vào và đầu ra.

| Thuộc tính    |   Hệ số tương quan |
|---------------|---------------------------|
| Glucose       |                     0.484 |
| BMI           |                     0.316 |
| Insulin       |                     0.261 |
| Preg          |                     0.226 |
| Age           |                     0.224 |
| SkinThickness |                     0.193 |
| BP            |                     0.183 |
| DPF           |                     0.178 |

Bảng 4 Trung bình và độ lệch chuẩn sau khi chuẩn hóa.

| Thuộc tính   |   Trung bình |   Độ lệch chuẩn |
|--------------|--------|----------------------|
| Preg         |   0.23 |                 0.20 |
| Glucose      |   0.48 |                 0.19 |
| Insulin      |   0.50 |                 0.18 |
| BMI          |   0.35 |                 0.17 |
| Age          |   0.20 |                 0.19 |

làm ngưỡng cắt cho các thuộc tính liên quan. Do đó các đặc trưng SkinThickness, BP, DPF bị loại bỏ. Glucose, BMI, Insulin, Preg, và Age là năm thuộc tính đầu vào liên quan nhất của chúng tôi.

## 3.2.4. Chuẩn hóa

Chúng tôi đã thực hiện co giãn đặc trưng (feature scaling) bằng cách chuẩn hóa dữ liệu từ phạm vi 0 đến 1, điều này đã tăng tốc độ tính toán của thuật toán [27]. Kết quả trung bình và độ lệch chuẩn cho tất cả các thuộc tính sau khi chuẩn hóa được hiển thị trong Bảng 4.

Trong Hình 2, chúng tôi có thể thấy rằng, sau khi hoàn thành tiền xử lý, chúng tôi có 699 mẫu/thực thể trong đó 466 bệnh nhân không bị đái tháo đường, và 233 bệnh nhân bị đái tháo đường. Sau khi tiền xử lý, tương quan giữa các thuộc tính đầu vào và đầu ra được hiển thị trong Hình 3. Trong Hình 3, chúng tôi có thể thấy rằng 'Glucose' và 'Outcome' có hệ số tương quan 0.46. Do đó chúng có tương quan cao.

## 3.3. Phương pháp huấn luyện và kiểm tra bộ dữ liệu

Sau khi làm sạch dữ liệu và tiền xử lý, bộ dữ liệu trở nên sẵn sàng để huấn luyện và kiểm tra. Chúng tôi đã sử dụng kiểm định chéo K-fold (K-fold cross-validation) và phương pháp chia tách huấn luyện/kiểm tra (train/test splitting) 85% riêng biệt để kiểm tra hiệu suất của các mô hình học máy khác nhau. Trong phương pháp train/split, chúng tôi chia bộ dữ liệu ngẫu nhiên thành tập huấn luyện và tập kiểm tra. Trong phương pháp kiểm định chéo K, dữ liệu được chia thành K fold. Một fold được sử dụng để xác thực/kiểm tra, và K-1 fold còn lại được sử dụng để huấn luyện. Quy trình sẽ tiếp tục cho đến khi mỗi K fold đơn lẻ là một tập kiểm tra. Hiệu suất được đo bằng trung bình của tất cả các điểm số được ghi nhận của lần kiểm tra thứ K.

Bảng 5 Ma trận nhầm lẫn cho các bộ phân loại DT, KNN, RF, NB, AB, LR, SVM.

| Test method             |   LR |   LR |   KNN |   KNN |   KNN |   SVM |   SVM |   SVM |   NB |   NB |   NB |   DT |   DT |   DT |   RF | RF    |   RF |   AB |   AB |   AB |
|-------------------------|------|------|-------|-------|-------|-------|-------|-------|------|------|------|------|------|------|------|-------|------|------|------|------|
| K-fold cross-validation |      |    0 |     1 |     0 |       |     1 |       |     0 |    1 |      |    0 |    1 |    0 |    1 |      | 0     |    1 |      |    0 |    1 |
| K-fold cross-validation |    0 |  409 |    57 |     0 |   387 |    79 |     0 |   414 |   52 |    0 |  386 |   80 |  382 |   84 |      | 0 391 |   75 |    0 |  401 |   65 |
| K-fold cross-validation |    0 |  105 |   128 |     1 |    95 |   138 |     1 |   110 |  123 |    1 |   91 |  142 |   96 |  137 |    1 | 100   |  133 |    1 |  117 |  116 |
| K-fold cross-validation |    0 |      |     1 |       |     0 |     1 |       |     0 |    1 |    0 |    1 |      |    0 |    1 |      | 0     |    1 |      |    0 |    1 |
| Train/test splitting    |    0 |  101 |    18 |     0 |    97 |    22 |     0 |   101 |   18 |    0 |   98 |   21 |   94 |   25 |    0 | 96    |   23 |    0 |  102 |   17 |
| Train/test splitting    |    1 |   19 |    37 |     1 |    14 |    42 |     1 |    21 |   35 |    1 |   17 |   39 |   22 |   34 |    1 | 17    |   39 |    1 |   19 |   37 |

Hình 2. Sau khi tiền xử lý số lượng bệnh nhân đái tháo đường và không đái tháo đường.

Hình 3. Sau khi tiền xử lý tương quan giữa các thuộc tính đầu vào và đầu ra.

## 3.4. Thiết kế và triển khai mô hình phân loại

Trong công trình nghiên cứu này, các nghiên cứu toàn diện được thực hiện trên PIDD áp dụng các kỹ thuật phân loại ML khác nhau như DT, KNN, RF, NB, AB, LR, SVM, và mạng nơ-ron (NN). Chúng tôi đã sử dụng giá trị Kth = 7 cho thuật toán KNN. Sơ đồ mô hình được đề xuất được hiển thị trong Hình 4.

## 3.5. Triển khai mô hình mạng nơ-ron

Chúng tôi đã xây dựng ba mô hình mạng nơ-ron khác nhau với các mức độ lớp ẩn khác nhau. Chúng tôi đã triển khai mạng nơ-ron với các lớp ẩn 1, 2, và 3 với các epoch khác nhau (200, 400,

Hình 4. Sơ đồ mô hình được đề xuất.

800), và kết quả được so sánh. Trong ANN, tổng có trọng số của đầu vào được xử lý bởi hàm kích hoạt trong lớp ẩn. Chúng tôi đã sử dụng hai loại hàm kích hoạt trong công trình của mình, sigmoid và RELU. Chúng tôi đã sử dụng thư viện Keras và TensorFlow để tạo các mô hình mạng nơ-ron. Chúng tôi đã sử dụng lớp Sequential từ thư viện Keras. Biến mục tiêu là thuộc tính 'Outcome'. Trong ANN, bộ tối ưu hóa (optimizer) được yêu cầu để giảm lỗi đầu ra trong phương pháp lan truyền ngược (backpropagation). Chúng tôi đã sử dụng SGD (Stochastic Gradient Descent) làm bộ tối ưu hóa. Tốc độ học (learning rate) là một tham số trong thuật toán tối ưu hóa kiểm soát việc điều chỉnh trọng số đối với gradient của hàm mất mát. Chúng tôi đã sử dụng các tốc độ học khác nhau để tìm một tốc độ hiệu quả. Từ thư viện scikit-learn, chúng tôi đã sử dụng hàm train test split để thực hiện tác vụ chia tách huấn luyện/kiểm tra. Chúng tôi đã sử dụng hàm cross val score từ thư viện scikit learn cho tác vụ kiểm định chéo K-fold. Vì biến mục tiêu là nhị phân, kỹ thuật 'StratifiedKfold' được sử dụng trong công trình của chúng tôi.

## 3.5.1. Phát triển một mô hình NN với một lớp ẩn

Đầu tiên, chúng tôi đã xây dựng một mạng nơ-ron với một lớp ẩn cùng với lớp đầu vào và đầu ra. Chúng tôi đã định nghĩa lớp đầu vào có năm nơ-ron, vì có năm đặc trưng. Lớp ẩn có năm nơ-ron và hàm kích hoạt RELU. Lớp đầu ra có một nơ-ron và một hàm kích hoạt sigmoid. Tóm tắt mô hình của NN với một lớp ẩn được đưa ra dưới đây trong Hình 5.

## 3.5.2. Phát triển một NN nơ-ron với hai lớp ẩn

Ở đây, chúng tôi đã định nghĩa một mô hình NN với bốn lớp dense. Lớp thứ nhất và thứ tư lần lượt là lớp đầu vào và đầu ra, có cùng hình dạng đầu vào, nơ-ron, và hàm kích hoạt như NN với một lớp ẩn. Lớp thứ hai gồm một lớp ẩn với 26 nơ-ron, và lớp thứ ba gồm một lớp ẩn với 5 nơ-ron. Hàm kích hoạt của các nơ-ron của mỗi lớp ẩn là RELU. Tóm tắt mô hình của NN với hai lớp ẩn được đưa ra dưới đây trong Hình 6.

Hình 5. Mô hình NN với một lớp ẩn.

Hình 6. Mô hình NN với hai lớp ẩn.

## 3.5.3. Phát triển một mô hình NN với ba lớp ẩn

Ở đây, chúng tôi đã phát triển một mô hình có năm lớp dense. Lớp thứ nhất và thứ năm lần lượt là lớp đầu vào và đầu ra, có cùng hình dạng đầu vào, nơ-ron, và hàm kích hoạt như NN với một lớp ẩn. Lớp ẩn thứ hai, thứ ba, và thứ tư lần lượt có 16, 10, 5 nơ-ron. Hàm kích hoạt của các nơ-ron của mỗi lớp ẩn là RELU. Tóm tắt mô hình của NN với ba lớp ẩn được đưa ra dưới đây trong Hình 7.

## 4. Kết quả và thảo luận

## 4.1. Kết quả cho phương pháp ML DT, KNN, RF, NB, AB, LR, SVM

Độ chính xác của thuật toán học máy có thể được tính từ ma trận nhầm lẫn (confusion matrix). Theo thuật ngữ trừu tượng, ma trận nhầm lẫn được đưa ra dưới đây.

|                | Predicted No (0)   | Predicted Yes (1)   |
|----------------|--------------------|---------------------|
| Actual No (0)  | TN                 | FP                  |
| Actual Yes (1) | FN                 | TP                  |

Ở đây, FP = Dương tính Giả (False Positive), FN = Âm tính Giả (False Negative), TN = Âm tính Thật (True Negative), và TP = Dương tính Thật (True Positive). Các phương trình (1)-(4) được sử dụng để tính phép đo lường hiệu suất của phương pháp phân loại.

Hình 7. Mô hình NN với ba lớp ẩn.

Bảng 6 Phép đo lường hiệu suất của tất cả các phương pháp phân loại cho

phương pháp kiểm định chéo K-fold và chia tách Huấn luyện/Kiểm tra.

| Phân loại        |   Precision |   Recall |   F-measure | Accuracy   |
|------------------|-------------|----------|-------------|------------|
| DT (K-fold)      |       0.739 |    0.742 |       0.741 | 74.24%     |
| DT (Splitting)   |       0.735 |    0.731 |       0.733 | 73.14%     |
| RF (K-fold)      |       0.744 |    0.750 |       0.746 | 74.96%     |
| RF (Splitting)   |       0.779 |    0.771 |       0.774 | 77.14%     |
| NB (K-fold)      |       0.753 |    0.755 |       0.754 | 75.53%     |
| NB (Splitting)   |       0.787 |    0.783 |       0.785 | 78.28%     |
| LR (K-fold)      |       0.761 |    0.768 |       0.761 | 76.82%     |
| LR (Splitting)   |       0.788 |    0.789 |       0.788 | 78.85%     |
| KNN (K-fold)     |       0.747 |    0.751 |       0.749 | 75.10%     |
| KNN (Splitting)  |       0.804 |    0.794 |       0.798 | 79.42%     |
| AB (K-fold)      |       0.730 |    0.740 |       0.730 | 73.96%     |
| AB (Splitting)   |       0.792 |    0.794 |       0.793 | 79.42%     |
| SVM (K-fold)     |       0.761 |    0.768 |       0.759 | 76.82%     |
| SVM (Splitting)  |       0.774 |    0.777 |       0.775 | 77.71%     |

Ma trận nhầm lẫn của các bộ phân loại DT, KNN, RF, NB, AB, LR, SVM cho kiểm định chéo, và chia tách Huấn luyện/Kiểm tra được hiển thị trong Bảng 5. Giá trị phép đo lường hiệu suất của tất cả các thuật toán phân loại được sử dụng trên PIDD được hiển thị trong Bảng 6. Trong Bảng 6, chúng tôi có thể thấy rằng độ chính xác của tất cả các phương pháp phân loại là trên 70%. Hơn nữa, cả hai phương pháp LR và SVM đều đang cho thấy độ chính xác tốt hơn cho cả hai phương pháp kiểm tra.

Hiệu suất của tất cả các bộ phân loại dựa trên các phép đo khác nhau với phương pháp kiểm định chéo K-fold và chia tách huấn luyện/kiểm tra được vẽ qua một biểu đồ trong Hình 8 và 9.

## 4.2. Kết quả cho mạng nơ-ron

Trong NN với lớp ẩn 1, với 200 epoch, chúng tôi đã thay đổi tốc độ học 0.1, 0.01, 0.005, được hiển thị trong Bảng 7. Chúng tôi nhận thấy rằng tốc độ học ở mức 0.01 cung cấp độ chính xác tốt hơn. Do đó mỗi trường hợp, chúng tôi đã sử dụng tốc độ học = 0.01.

Hình 8. Trình bày đồ họa hiệu suất của tất cả các bộ phân loại với phương pháp kiểm định chéo 10-fold.

Hình 9. Trình bày đồ họa hiệu suất của bộ phân loại với phương pháp chia tách huấn luyện/kiểm tra.

Bảng 8 cho thấy tác động của epoch trong một mạng nơ-ron với các lớp ẩn 1, 2, và 3 ở tốc độ học 0.01. Chúng tôi nhận thấy rằng mô hình NN với hai lớp ẩn với 400 epoch ở tốc độ học 0.01 cung cấp độ chính xác tốt nhất 88.6%. Hơn nữa, mô hình NN cho nhiều độ chính xác hơn, độ chính xác Huấn luyện, và độ chính xác Kiểm tra trong số tất cả các mô hình mạng nơ-ron. Mạng nơ-ron của mô hình NN tốt nhất của chúng tôi, bao gồm hai lớp ẩn, được hiển thị trong Hình 10. Đường cong ROC (đường cong đặc trưng hoạt động của bộ thu, receiver operating characteristic curve) cho 2 lớp ẩn với 400 epoch được hiển thị trong Hình 11. Với K = 10 kiểm định chéo fold, chúng tôi cũng đã tính độ chính xác cho mô hình NN hai lớp ẩn với 200 epoch. Độ chính xác trung bình thu được là 76%.

Bảng 7 Tác động của tốc độ học lên phép đo độ chính xác.

|   Tốc độ học |   Độ chính xác |
|-----------------|------------|
|             0.1 |      0.829 |
|            0.01 |      0.838 |
|           0.005 |      0.800 |

Bảng 8 Ở tốc độ học 0.01 với các thay đổi lớp ẩn tác động lên độ chính xác.

Hình 10. Mô hình NN với hai lớp ẩn.

|   Lớp ẩn |   Epoch |   Độ chính xác | Độ chính xác huấn luyện   | Độ chính xác kiểm tra   |
|----------------|----------|------------|---------------------|--------------------|
|              1 |      200 |      0.838 | 76.43%              | 83.81%             |
|                |      400 |      0.848 | 77.27%              | 84.76%             |
|                |      800 |      0.829 | 79.46%              | 82.86%             |
|              2 |      200 |      0.876 | 76.77%              | 87.62%             |
|                |      400 |      0.886 | 78.96%              | 88.57%             |
|                |      800 |      0.857 | 81.65%              | 87.62%             |
|              3 |      200 |      0.829 | 76.77%              | 82.86%             |
|                |      400 |      0.838 | 83.00%              | 83.81%             |
|                |      800 |      0.790 | 87.04%              | 79.05%             |

Hình 11. Đường cong ROC cho NN 2 lớp ẩn với 400 epoch.

## Kết luận

Phát hiện sớm đái tháo đường là một trong những thách thức quan trọng trong ngành chăm sóc sức khỏe. Trong nghiên cứu của chúng tôi, chúng tôi đã thiết kế một hệ thống, có thể dự đoán đái tháo đường với độ chính xác cao. Chúng tôi đã tiền xử lý dữ liệu bằng công cụ WEKA. Sử dụng phương pháp giảm đặc trưng, chúng tôi đã loại bỏ ba đặc trưng. Chúng tôi đã sử dụng năm đặc trưng đầu vào (Glucose, BMI, Insulin, Pregnancy, và Age) và một đặc trưng đầu ra (outcome) trong bộ dữ liệu PIMA. Chúng tôi đã sử dụng bảy thuật toán học máy khác nhau, bao gồm DT, KNN, RF, NB, AB, LR, SVM trên PIDD để dự đoán đái tháo đường và đánh giá hiệu suất trên nhiều phép đo khác nhau. Tất cả các mô hình cho thấy kết quả tốt cho một số tham số như accuracy, precision, recall, và F-measure. Tất cả các mô hình cung cấp độ chính xác lớn hơn 70%. LR và SVM cung cấp xấp xỉ 77%-78% độ chính xác cho cả phương pháp chia tách huấn luyện/kiểm tra và kiểm định chéo K-fold. Chúng tôi cũng đã triển khai mô hình NN cho dự đoán đái tháo đường của PIDD. Chúng tôi đã sử dụng các lớp ẩn 1, 2, 3 trong mô hình mạng nơ-ron thay đổi các epoch 200, 400, 800. Lớp ẩn 2 với 400 epoch cung cấp độ chính xác 88.6%, đây là độ chính xác cao nhất trong số các mô hình được triển khai của chúng tôi cho PIDD. Trong số tất cả các mô hình được đề xuất, NN với hai lớp ẩn được coi là hiệu quả nhất và hứa hẹn nhất để phân tích đái tháo đường với tỷ lệ độ chính xác xấp xỉ 86% cho tất cả các epoch thay đổi (200, 400, 800). Độ chính xác tìm thấy cho hồi quy logistic (78.8571%), Naive Bayes (78.2857%), random forest (77.3429%), và ANN (88.57)% tốt hơn độ chính xác của các nghiên cứu của Tigga và cộng sự [19] (LR ∼ 75.32%), Sisodia và cộng sự [18] (NB ∼ 76.30%), Amour Diwani và cộng sự [20] (NB ∼ 76.3021%), Zou và cộng sự [21] (RF ∼ 77.21%), và Alam, T.M. và cộng sự [17] (ANN ∼ 75.7%).

## Tuyên bố đóng góp tác giả CRediT

Jobeda Jamal Khanam: Khái niệm hóa, Phương pháp luận, Phần mềm, Quản lý dữ liệu, Viết - bản thảo gốc, Trực quan hóa. Simon Y. Foo: Phương pháp luận, Giám sát, Điều tra, Phần mềm, Tài nguyên, Thẩm định, Viết - rà soát &amp; biên tập, Thu hút tài trợ.

## Tuyên bố về xung đột lợi ích

Các tác giả tuyên bố rằng họ không có lợi ích tài chính cạnh tranh hoặc mối quan hệ cá nhân nào đã biết có thể xuất hiện ảnh hưởng đến công trình được báo cáo trong bài báo này.

## Lời cảm ơn

Công trình này được tài trợ một phần bởi Đại học Florida A&amp;M và Đại học Bang Florida, USA.

## Tài liệu tham khảo

- [1] https://www.who.int/health-topics/diabetes.
- [2] https://www.medicalnewstoday.com/articles/325018#how-is-the-pancre as-linked-with-diabetes.
- [3] https://www.webmd.com/diabetes/diabetes-causes.
- [4] https://www.mayoclinic.org/diseases-conditions/prediabetes/diagnosis-t reatment/drc-20355284.

- [5] https://www.niddk.nih.gov/healthinformation/diabetes/overview/sympto ms-causes.
- [6] https://www.diabetes.co.uk/diabetes\_care/blood-sugar-level-ranges.html .
- [7] https://www.healthgrades.com/right-care/diabetes/is-there-a-cure-for-di abetes.
- [8] https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/dia betes-long-term-effects.
- [9] S.A. Kaveeshwar, J. Cornwall, The current state of diabetes mellitus in India, Australas. Med. J. 7 (1) (2014) 45.
- [10] https://www.cdc.gov/diabetes/basics/prediabetes.html.
- [11] C.L. Huang, M.C. Chen, C.J. Wang, Credit scoring with a data mining approach based on support vector machines, Expert Syst. Appl. 33 (4) (2007) 847-856, http://dx.doi.org/10.1016/j.eswa.2006.07.007.
- [12] J. Chaki, S. Thillai Ganesh, S.K. Cidham, S. Ananda Theertan, Machine learning and artificial intelligence-based diabetes mellitus detection and self-management: A systematic review, J. King Saud Univ. - Comput. Inf. Sci. (2020).
- [13] I. Contreras, J. Vehi, Artificial intelligence for diabetes management and decision support: Literature review, J. Med. Internet Res. 20 (5) (2018) e10775.
- [14] G. Swapna, R. Vinayakumar, K.P. Soman, Soman KP diabetes detection using deep learning algorithms, ICT Express 4 (4) (2018) 243-246, http://dx.doi.org/10.1016/j.icte.2018.10.005, Elsevier B.V.
- [15] M.W. Craven, J.W. Shavlik, Using neural networks for data mining, Future Gener. Comput. Syst. 13 (2-3) (1997) 211-229, http://dx.doi. org/10.1016/s0167-739x(97)00022-8.
- [16] https://blogs.nvidia.com/blog/2016/07/29/whats-difference-artificialintelligence-machine-learning-deep-learning-ai/.
- [17] T.M. Alam, et al., Informatics in medicine unlocked a model for early prediction of diabetes, Inform. Med. Unlocked 16 (2019) 100204.
- [18] D. Sisodia, D.S. Sisodia, Prediction of diabetes using classification algorithms, Procedia Comput. Sci. 132 (2018) 1578-1585.
- [19] N.P. Tigga, S. Garg, Predicting type 2 Diabetes using Logistic Regression accepted to publish in: Lecture Notes of Electrical Engineering, Springer.
- [20] Salim Amour Diwani, Anael Sam, Diabetes forecasting using supervised learning techniques, Adv. Comput. Sci.: Int. J. [S.l.] (ISSN: 2322-5157) (2014) 10-18, Available at: &lt;http://www.acsij.org/acsij/ article/view/156&gt;.
- [21] Q. Zou, K. Qu, Y. Luo, D. Yin, Y. Ju, H. Tang, Predicting Diabetes Mellitus with Machine Learning Techniques, Vol. 9, Frontiers in genetics, 2018, p. 515, http://dx.doi.org/10.3389/fgene.2018.00515.
- [22] S. Perveen, M. Shahbaz, A. Guergachi, K. Keshavjee, Performance analysis of data mining classification techniques to predict diabetes, Procedia Comput. Sci. 82 (2016) 115-121.
- [23] M. Lichman, Pima Indians diabetes database, ed. Center for machine learning and intelligent systems.: UCI Machine Learning repository.
- [24] https://www.cdc.gov/obesity/adult/defining.html.
- [25] S.R. Garner, Weka: The Waikato environment for knowledge analysis, in: Proceedings of the New Zealand Computer Science Research Students Conference, Citeseer, 1995, pp. 57-64.
- [26] https://en.wikipedia.org/wiki/Project\_Jupyter.
- [27] H. Benhar, A. Idri, J. Fernández-Alemán, Data preprocessing for decision making in medical informatics: potential and analysis, in: World Conference on Information Systems and Technologies, 2018, pp. 1208-1218.
