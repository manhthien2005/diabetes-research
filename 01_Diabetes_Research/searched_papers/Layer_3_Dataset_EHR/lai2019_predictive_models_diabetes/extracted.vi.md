<!-- extracted by pdf-extract | engine=docling | pages=9 | ocr=False | tables=7/7 | density=1.02 | score=100 -->

## BÀI BÁO NGHIÊN CỨU

## Các mô hình dự đoán đái tháo đường sử dụng kỹ thuật học máy

Hang Lai 1,2 , Huaxiong Huang 1,2 , Karim Keshavjee 3,2 , Aziz Guergachi 1,2,4 và Xin Gao 1,2*

## Tóm tắt

Bối cảnh: Đái tháo đường (Diabetes Mellitus) là một bệnh mạn tính ngày càng phổ biến, đặc trưng bởi việc cơ thể không có khả năng chuyển hóa glucose. Mục tiêu của nghiên cứu này là xây dựng một mô hình dự đoán hiệu quả với độ nhạy (sensitivity) và độ chọn lọc (selectivity) cao để nhận diện tốt hơn các bệnh nhân Canada có nguy cơ mắc Đái tháo đường dựa trên dữ liệu nhân khẩu học của bệnh nhân và các kết quả xét nghiệm trong các lần đến cơ sở y tế của họ.

Phương pháp: Sử dụng các bản ghi gần nhất của 13,309 bệnh nhân Canada trong độ tuổi từ 18 đến 90 tuổi, cùng với thông tin xét nghiệm của họ (tuổi, giới tính, đường huyết lúc đói, chỉ số khối cơ thể, lipoprotein tỷ trọng cao, triglyceride, huyết áp và lipoprotein tỷ trọng thấp), chúng tôi đã xây dựng các mô hình dự đoán sử dụng kỹ thuật Logistic Regression và Gradient Boosting Machine (GBM). Diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (area under the receiver operating characteristic curve, AROC) được sử dụng để đánh giá khả năng phân biệt của các mô hình này. Chúng tôi đã sử dụng phương pháp điều chỉnh ngưỡng (adjusted threshold method) và phương pháp trọng số lớp (class weight method) để cải thiện độ nhạy - tỷ lệ bệnh nhân Đái tháo đường được mô hình dự đoán đúng. Chúng tôi cũng so sánh các mô hình này với các kỹ thuật học máy khác như Decision Tree và Random Forest.

Kết quả: AROC của mô hình GBM được đề xuất là 84.7% với độ nhạy 71.6% và AROC của mô hình Logistic Regression được đề xuất là 84.0% với độ nhạy 73.4%. Các mô hình GBM và Logistic Regression hoạt động tốt hơn các mô hình Random Forest và Decision Tree.

Kết luận: Khả năng của mô hình chúng tôi trong việc dự đoán bệnh nhân mắc Đái tháo đường bằng cách sử dụng một số kết quả xét nghiệm thường dùng là cao với độ nhạy đạt yêu cầu. Các mô hình này có thể được tích hợp vào một chương trình máy tính trực tuyến để hỗ trợ bác sĩ trong việc dự đoán những bệnh nhân có khả năng mắc đái tháo đường trong tương lai và cung cấp các can thiệp phòng ngừa cần thiết. Mô hình được phát triển và kiểm định trên quần thể dân số Canada, do đó cụ thể hơn và mạnh mẽ hơn khi áp dụng cho bệnh nhân Canada so với các mô hình hiện có được phát triển từ quần thể dân số Hoa Kỳ hoặc các quần thể khác. Đường huyết lúc đói, chỉ số khối cơ thể, lipoprotein tỷ trọng cao và triglyceride là những yếu tố dự báo quan trọng nhất trong các mô hình này.

Từ khóa: Đái tháo đường, Học máy, Gradient boosting machine, Mô hình dự đoán, Chi phí phân loại sai

## Bối cảnh

Đái tháo đường (Diabetes Mellitus, DM) là một bệnh mạn tính ngày càng phổ biến, đặc trưng bởi việc cơ thể không có khả năng chuyển hóa glucose. Phát hiện bệnh ở giai đoạn sớm giúp giảm chi phí y tế và nguy cơ bệnh nhân gặp phải các vấn đề sức khỏe phức tạp hơn. Wilson và cộng sự [18] đã phát triển Mô hình Tính điểm Nguy cơ Đái tháo đường Framingham

* Tác giả liên hệ: xingao@mathstat.yorku.ca

1 Khoa Toán học và Thống kê, Đại học York, 4700 Keele Street, Toronto, Ontario M3J 1P3, Canada

2 Viện Fields về Nghiên cứu Khoa học Toán học, Phòng thí nghiệm Trung tâm Phân tích và Mô hình hóa Định lượng (CQAM), 222 College Street,

Toronto, Ontario M5T 3J1, Canada

Danh sách đầy đủ thông tin tác giả có ở cuối bài báo (Framingham Diabetes Risk Scoring Model, FDRSM) để dự đoán nguy cơ phát triển DM ở người trưởng thành Hoa Kỳ trung niên (từ 45 đến 64 tuổi) sử dụng Logistic Regression. Các yếu tố nguy cơ được xem xét trong mô hình lâm sàng đơn giản này là tiền sử DM của cha mẹ, béo phì, huyết áp cao, mức cholesterol lipoprotein tỷ trọng cao thấp, mức triglyceride tăng cao và rối loạn đường huyết lúc đói. Số lượng đối tượng trong mẫu là 3140 và diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (AROC) được báo cáo là 85.0%. Hiệu năng của thuật toán này đã được đánh giá trên một quần thể dân số Canada bởi Mashayekhi và cộng sự [11] sử dụng cùng các yếu tố dự báo như Wilson và cộng sự [18] với

## Truy cập Mở

ngoại lệ là tiền sử DM của cha mẹ. Số lượng đối tượng trong mẫu là 4403 và AROC được báo cáo là 78.6%.

Các kỹ thuật khai phá dữ liệu đã được sử dụng rộng rãi trong các nghiên cứu về DM để khám phá các yếu tố nguy cơ của DM [5, 6, 8, 12]. Các phương pháp học máy, chẳng hạn như logistic regression, mạng nơ-ron nhân tạo và decision tree, đã được Meng và cộng sự [12] sử dụng để dự đoán DM và tiền đái tháo đường. Dữ liệu bao gồm 735 bệnh nhân mắc DM hoặc tiền đái tháo đường và 752 người khỏe mạnh từ Quảng Châu, Trung Quốc. Độ chính xác được báo cáo là 77.87% khi sử dụng mô hình decision tree; 76.13% khi sử dụng mô hình logistic regression; và 73.23% khi sử dụng quy trình Mạng nơ-ron nhân tạo (Artificial Neural Network, ANN). Các phương pháp học máy khác, chẳng hạn như Random Forest, Support Vector Machines (SVM), k-nearest Neighbors (KNN) và naïve Bayes cũng đã được sử dụng như trong [6 -8, 10, 11, 21]. Sisodia, D. và Sisodia, D.S [17]. gần đây đã sử dụng ba thuật toán phân loại: Naïve Bayes, Decision Tree và SVM để phát hiện DM. Kết quả của họ cho thấy thuật toán Naïve Bayes hoạt động tốt hơn hai thuật toán còn lại.

Trong bài báo này, chúng tôi trình bày các mô hình dự đoán sử dụng kỹ thuật Gradient Boosting Machine và Logistic Regression để dự đoán xác suất bệnh nhân mắc DM dựa trên thông tin nhân khẩu học và kết quả xét nghiệm của họ từ các lần đến cơ sở y tế. Chúng tôi cũng so sánh các phương pháp này với các kỹ thuật học máy được sử dụng rộng rãi khác như Rpart và Random Forest. Gói MLR (Machine Learning in R) trong R [2] đã được sử dụng để phát triển tất cả các mô hình.

## Phương pháp

Dữ liệu sử dụng trong nghiên cứu này được lấy từ CPCSSN (www.cpcssn.ca). Định nghĩa ca bệnh đái tháo đường được mô tả trong [19]. ' Đái tháo đường bao gồm đái tháo đường type 1 và type 2, được kiểm soát hoặc không được kiểm soát, và loại trừ đái tháo đường thai kỳ, đái tháo đường do hóa chất gây ra (thứ phát), đái tháo đường sơ sinh, hội chứng buồng trứng đa nang, tăng đường huyết, tiền đái tháo đường, hoặc các trạng thái hay tình trạng tương tự ' (trang 4 trong [19]). Bộ dữ liệu được tạo ra như sau: 1) Mọi chỉ số đo huyết áp (hơn 6 triệu) được rút vào một bảng cho tất cả bệnh nhân trên 17 tuổi cùng với mã bệnh nhân, tuổi của họ vào ngày khám và giới tính của họ. 2) Đối với mỗi chỉ số đo huyết áp, chúng tôi ghép nối các bản ghi gần nhất về thời gian, trong một khoảng thời gian cụ thể, dựa trên loại phép đo: BMI ± 1 năm, LDL ± 1 năm, HDL ± 1 năm, triglyceride (TG) ± 1 năm, đường huyết lúc đói (Fasting blood sugar, FBS) ± 1 tháng, HbA1c ± 3 tháng. 3) Chúng tôi đã loại bỏ các bản ghi bị thiếu dữ liệu ở bất kỳ cột nào trong số đó. Việc này còn lại khoảng 880,000 bản ghi, trong đó khoảng 255,000 bản ghi là từ những bệnh nhân mắc đái tháo đường. 4) Các bệnh nhân dùng insulin, những người có thể mắc đái tháo đường Type 1, và bệnh nhân dùng corticosteroid, vốn có thể ảnh hưởng đến mức đường huyết, đã được loại khỏi bộ dữ liệu, còn lại 811,000 bản ghi với 235,000 từ những bệnh nhân mắc DM. 5) Sau đó chúng tôi tuyển chọn một bộ dữ liệu cho các bản ghi của những bệnh nhân trước thời điểm khởi phát DM và xác định những bệnh nhân có ít nhất 10 lần khám có dữ liệu. Đối với những bệnh nhân chưa phát triển DM, chúng tôi đã loại bỏ năm cuối cùng của các bản ghi trước khi kết thúc cơ sở dữ liệu để giảm thiểu tác động của những bệnh nhân có thể đang trên bờ vực trở thành người mắc đái tháo đường.

Có 215,544 bản ghi liên quan đến các lần khám của bệnh nhân trong bộ dữ liệu. Biến kết cục là Đái tháo đường, được mã hóa thành một biến nhị phân, với loại 0 chỉ những bệnh nhân không mắc DM và loại 1 chỉ những bệnh nhân mắc DM. Các yếu tố dự báo được quan tâm là: Sex (Giới tính), Age (Tuổi vào ngày khám), BMI (Chỉ số khối cơ thể), TG (Triglyceride), FBS (Đường huyết lúc đói), sBP (Huyết áp tâm thu), HDL (Lipoprotein tỷ trọng cao) và LDL (Lipoprotein tỷ trọng thấp). Vì một bệnh nhân có thể có nhiều bản ghi đại diện cho nhiều lần đến cơ sở y tế của họ, chúng tôi đã lấy lần khám cuối cùng của mỗi bệnh nhân để có được một bộ dữ liệu gồm 13,317 bệnh nhân. Trong bước phân tích dữ liệu khám phá, chúng tôi tìm thấy một số giá trị cực đoan ở BMI và TG, và sau đó, đã loại trừ các giá trị này để có được bộ dữ liệu phân tích cuối cùng gồm 13,309 bệnh nhân.

Khoảng 20.9% bệnh nhân trong mẫu này mắc DM. 40% bệnh nhân là nam và khoảng 60% là nữ (Tệp bổ sung 1: Bảng S1). Tuổi của bệnh nhân trong bộ dữ liệu này dao động từ 18 đến 90 tuổi với trung vị khoảng 64 tuổi. Tuổi cũng được mã hóa thành một biến phân loại được biểu diễn bởi bốn nhóm: Young (Trẻ tuổi), Middle-Aged (Trung niên), Senior (Cao niên) và Elderly (Người già). Khoảng 44.6% bệnh nhân là trung niên, từ 40 đến 64 tuổi; 47.8% là cao niên, từ 65 đến 84; 4.8% là người già lớn hơn 85 tuổi; và 2.9% trẻ hơn 40 tuổi. Chỉ số khối cơ thể được tính bằng cách chia cân nặng của bệnh nhân (tính bằng kilôgam) cho bình phương chiều cao của bệnh nhân (tính bằng mét). Chỉ số khối cơ thể dao động từ 11.2 đến 70 với trung vị là 28.9. Các phân bố của BMI, FBS, HDL và TG đều lệch phải (Tệp bổ sung 2: Hình S1).

Bảng 1 cho thấy trung vị của BMI, FBS và TG của nhóm bệnh nhân mắc DM cao hơn so với nhóm bệnh nhân không mắc DM; trung vị HDL cao hơn ở nhóm bệnh nhân không mắc DM trong khi trung vị LDL, trung vị sBP và trung vị Tuổi là tương tự nhau.

Ma trận tương quan của các biến liên tục (Age, BMI, TG, FBS, sBP, HDL, LDL) cho thấy không có tương quan đáng chú ý giữa các biến, ngoại trừ một tương quan âm vừa phải -0.39 giữa HDL và TG.

Bảng 1 So sánh trung vị của các biến liên tục giữa nhóm mắc DM và nhóm không mắc DM

| Nhóm    |   BMI |   FBS |   HDL |   TG |   LDL |   sBP |   Age |
|---------|-------|-------|-------|------|-------|-------|-------|
| DM      | 31.16 |  6.10 |  1.20 | 1.56 |  2.71 |   130 | 64.00 |
| No DM   | 28.32 |  5.20 |  1.40 | 1.24 |  2.74 |   130 | 66.00 |

Gradient Boosting Machine là một kỹ thuật học máy mạnh mẽ đã cho thấy thành công đáng kể trong nhiều ứng dụng thực tế [14]. Trong nghiên cứu này, chúng tôi đã sử dụng kỹ thuật Logistic Regression và Gradient Boosting Machine trong gói MLR của R để xây dựng các mô hình dự đoán. Sau đó chúng tôi so sánh các phương pháp này với hai kỹ thuật học máy hiện đại khác là Decision Tree Rpart và Random Forest.

## Quy trình

Đầu tiên chúng tôi tạo một bộ dữ liệu huấn luyện bằng cách chọn ngẫu nhiên 80% tất cả bệnh nhân trong bộ dữ liệu và tạo một bộ dữ liệu kiểm tra với 20% bệnh nhân còn lại. Bộ dữ liệu huấn luyện có 10,647 bệnh nhân và bộ dữ liệu kiểm tra có 2662 bệnh nhân. Chúng tôi sử dụng bộ dữ liệu huấn luyện để huấn luyện mô hình và sử dụng bộ dữ liệu kiểm tra để đánh giá mức độ hoạt động tốt của mô hình dựa trên một bộ dữ liệu chưa từng thấy. Sử dụng bộ dữ liệu huấn luyện và phương pháp kiểm định chéo 10 lần (10-fold cross-validation), chúng tôi đã tinh chỉnh các siêu tham số của mô hình để có được tập hợp các siêu tham số tối ưu mang lại diện tích lớn nhất dưới đường cong đặc trưng hoạt động của bộ thu nhận (AROC). (Vui lòng xem Tệp bổ sung 3 để biết quy trình tinh chỉnh mô hình của chúng tôi).

Vì bộ dữ liệu mất cân bằng với chỉ 20.9% bệnh nhân trong nhóm DM, chúng tôi đã sử dụng các chi phí phân loại sai khác nhau để tìm ngưỡng tối ưu (hoặc giá trị cắt) cho lớp DM (tức là Diabetes Mellitus =1). Trong cách tiếp cận tinh chỉnh ngưỡng, chúng tôi thiết lập một ma trận chi phí phân loại sai trong đó các phần tử trên đường chéo bằng không và tỷ lệ giữa chi phí của một âm tính giả với chi phí của một dương tính giả là 3 trên 1. Chúng tôi đã kiểm định mô hình với các siêu tham số tối ưu sử dụng kiểm định chéo 10 lần. Trong bước này, chúng tôi đo cả các giá trị AROC và các chi phí phân loại sai. Chúng tôi đã tinh chỉnh ngưỡng cho lớp dương tính (Diabetes = 1) bằng cách chọn ngưỡng mang lại chi phí phân loại sai kỳ vọng thấp nhất. Chúng tôi thu được mô hình cuối cùng bằng cách khớp mô hình với tập hợp siêu tham số tối ưu trên toàn bộ bộ dữ liệu huấn luyện. Cuối cùng, sử dụng ngưỡng tối ưu, chúng tôi đánh giá hiệu năng của mô hình cuối cùng trên bộ dữ liệu kiểm tra.

Độ nhạy được tính bằng cách chia số bệnh nhân DM được mô hình dự đoán cho số bệnh nhân DM quan sát được. Độ đặc hiệu (Specificity) được tính bằng cách chia số bệnh nhân không mắc DM được mô hình dự đoán cho số bệnh nhân không mắc DM quan sát được. Tỷ lệ phân loại sai là số bệnh nhân bị phân loại không chính xác chia cho tổng số bệnh nhân.

## Kết quả

Tập hợp siêu tham số tối ưu mà chúng tôi thu được cho mô hình GBM này như sau: số lần lặp (n.trees) là 257; độ sâu tương tác (interaction.depth) là 2; số quan sát tối thiểu trong các nút lá (n.minobsinnode) là 75; tốc độ co rút (shrinkage) là 0.126. Vì biến kết cục là một biến nhị phân, chúng tôi đã sử dụng hàm mất mát Bernoulli và các bộ học dựa trên cây trong mô hình GBM này. Sử dụng phương pháp kiểm định chéo để kiểm định mô hình này, chúng tôi thu được các giá trị AROC dao động từ 81.6 đến 85.0% với AROC trung bình là 83.6%, cho thấy độ tin cậy cao của phương pháp. Ngưỡng tối ưu cho lớp DM sử dụng phương pháp ma trận chi phí phân loại sai là 0.24. Chúng tôi cũng sử dụng phương pháp chia train/test để kiểm định mô hình này và thu được kết quả tương tự với AROC trung bình là 83.3%.

Khi kiểm tra mô hình trên bộ dữ liệu kiểm tra, chúng tôi thu được các kết quả sau: AROC là 84.7%; tỷ lệ phân loại sai là 18.9%; độ nhạy là 71.6% và độ đặc hiệu là 83.7%. Chúng tôi nhận thấy có một sự đánh đổi giữa độ nhạy và tỷ lệ phân loại sai. Sử dụng ngưỡng mặc định 0.5, tỷ lệ phân loại sai của mô hình GBM là 15%; độ nhạy thấp ở mức 48.3%; độ đặc hiệu là 95.2%; và AROC vẫn giữ nguyên ở mức 84.7%.

Đối với mô hình Logistic Regression của chúng tôi, AROC là 84.0%; tỷ lệ phân loại sai là 19.6%; độ nhạy là 73.4% và độ đặc hiệu là 82.3%. Ngưỡng tối ưu được ước tính là 0.24 và Tuổi được xử lý như một biến phân loại trong mô hình này. Chúng tôi đã kiểm định mô hình này sử dụng phương pháp kiểm định chéo và thu được các giá trị AROC dao động từ 80.6 đến 85.7% với AROC trung bình là 83.2%. Đường huyết lúc đói, lipoprotein tỷ trọng cao, chỉ số khối cơ thể và triglyceride là những yếu tố dự báo rất có ý nghĩa trong mô hình này ( P &lt; 0.0001). Điều thú vị là, dựa trên dữ liệu mẫu này, chúng tôi nhận thấy rằng tuổi cũng là một yếu tố có ý nghĩa (Bảng 2); bệnh nhân người già và cao niên có khả năng mắc DM thấp hơn đáng kể so với bệnh nhân trung niên, với điều kiện tất cả các yếu tố khác được giữ nguyên. Khi kiểm tra các giả định của mô hình, chúng tôi không tìm thấy hiện tượng đa cộng tuyến nghiêm trọng; tất cả các biến đều có giá trị hệ số phóng đại phương sai (variance inflation factor, VIF) nhỏ hơn 1.5.

Bảng 2 Các yếu tố dự báo liên quan đến mô hình logistic regression

| Biến                  | Hệ số ước tính          |   Tỷ số odds | KTC 95% cho tỷ số odds   | Giá trị P |
|-----------------------|-------------------------|--------------|-------------------------|-----------|
| Intercept             | - 11.816                |              |                         | < 0.0001  |
| Age                   |                         |              |                         |           |
| Middle-Aged (40 - 64) | (Reference)             |        1.000 |                         |           |
| Elderly (85 - 90)     | - 0.829                 |        0.436 | (0.31, 0.61)            | < 0.0001  |
| Senior (65 - 84)      | - 0.127                 |        0.881 | (0.78, 0.99)            | 0.036     |
| Young (< 40)          | 0.238                   |        1.269 | (0.90, 1.79)            | 0.170     |
| Male                  | - 0.250                 |        0.779 | (0.69, 0.88)            | < 0.0001  |
| FBS                   | 1.963                   |        7.122 | (6.45, 7.87)            | < 0.0001  |
| BMI                   | 0.023                   |        1.024 | (1.01, 1.03)            | < 0.0001  |
| HDL                   | - 0.894                 |        0.409 | (0.34, 0.49)            | < 0.0001  |
| TG                    | 0.158                   |        1.171 | (1.09, 1.26)            | < 0.0001  |
| sBP                   | - 0.001                 |        0.999 | (0.96, 1.00)            | 0.560     |
| LDL                   | - 0.011                 |        0.990 | (0.93, 1.05)            | 0.740     |

Các biến FBS, SBP, TG và BMI đều có liên kết tuyến tính mạnh với kết cục DM trên thang logit. Đối với các phần dư chuẩn hóa, có 9 giá trị ngoại lai dao động từ 3.1 đến 3.4. Vì số lượng các quan sát có khả năng gây ảnh hưởng không lớn, tất cả bệnh nhân đã được giữ lại trong bộ dữ liệu.

Dựa trên tiêu chí độ lợi thông tin (information gain) đo lường lượng thông tin thu được bởi mỗi yếu tố dự báo, chúng tôi cũng nhận thấy rằng đường huyết lúc đói là yếu tố dự báo quan trọng nhất, tiếp theo là lipoprotein tỷ trọng cao, chỉ số khối cơ thể và triglyceride; rồi đến tuổi, giới tính, huyết áp và lipoprotein tỷ trọng thấp (Hình 1).

Để so sánh hiệu năng của các mô hình Logistic Regression và GBM thu được với các kỹ thuật học máy khác, chúng tôi đã sử dụng cùng bộ dữ liệu huấn luyện, bộ dữ liệu kiểm tra và quy trình trên các kỹ thuật Rpart và Random Forest. Các giá trị AROC từ các mô hình được trình bày trong Bảng 3.

Các kết quả trong Bảng 3 cho thấy mô hình GBM hoạt động tốt nhất dựa trên giá trị AROC cao nhất, tiếp theo là mô hình Logistic Regression và mô hình Random Forest. Mô hình Rpart cho giá trị AROC thấp nhất ở mức 78.2%.

Hình 2 minh họa các đường cong đặc trưng hoạt động của bộ thu nhận (Receiver Operating Curves, ROC) của bốn mô hình.

Các ma trận nhầm lẫn của bốn mô hình này được trình bày trong Tệp bổ sung 1: Bảng S2, S3, S4 và S5.

Các mô hình của chúng tôi có thể được triển khai trong thực tế. Đối với mô hình Logistic Regression, chúng tôi phác thảo một thuật toán để ước tính nguy cơ DM. sBP và LDL đã được loại khỏi mô hình này vì đóng góp của chúng không có ý nghĩa thống kê.

Bảng 3 So sánh các giá trị AROC với các kỹ thuật học máy khác

| Mô hình             | Diện tích dưới đường cong ROC, AROC   |
|---------------------|----------------------------------|
| GBM                 | 84.7%                            |
| LOGISTIC REGRESSION | 84.0%                            |
| RANDOM FOREST       | 83.4%                            |
| RPART               | 78.2%                            |

Đối với mô hình GBM, việc hiển thị các phương trình một cách tường minh khó khăn hơn. Tuy nhiên, có thể thiết lập một chương trình dự đoán nguy cơ DM trực tuyến theo thời gian thực sao cho nguy cơ phát triển DM của một bệnh nhân có thể được báo cáo khi các giá trị yếu tố dự báo của bệnh nhân được nhập vào. Mô hình GBM đã huấn luyện có thể được lưu ở định dạng Predictive Model Markup Language (PMML), vốn là một định dạng dựa trên XML, sử dụng gói r2pmml trong R. Sau đó, mô hình có thể được triển khai để đưa ra dự đoán sử dụng nền tảng Java (các gói Scoruby và Goscore) hoặc nền tảng Yellowfin.

Để so sánh hiệu năng của bốn mô hình, chúng tôi đã tiến hành kiểm định chéo 10 lần trên toàn bộ bộ dữ liệu với các bước sau:

1. Chia bộ dữ liệu thành 10 phần. Dùng 9 phần làm bộ dữ liệu huấn luyện và phần cuối cùng làm bộ dữ liệu kiểm tra.
2. Huấn luyện cả bốn 4 mô hình trên bộ dữ liệu huấn luyện.
3. Đo AROC cho mỗi mô hình dựa trên bộ dữ liệu kiểm tra

## 4. Lặp lại cho cả 10 lần (folds)

Xáo trộn toàn bộ bộ dữ liệu và lặp lại quy trình trên thêm 2 lần nữa.

Dựa trên 30 giá trị AROC thu được cho mỗi mô hình (với tuổi được xử lý như một biến liên tục), chúng tôi đã ước tính giá trị trung bình của các giá trị AROC của chúng như được hiển thị trong Bảng 4.

Chúng tôi cũng tạo một biểu đồ hộp (box plot) để so sánh các giá trị AROC của bốn mô hình (Hình 3).

Biểu đồ hộp cho thấy trung vị của các giá trị AROC của GBM, Logistic Regression và Random Forest khá gần nhau và tất cả đều lớn hơn của mô hình Rpart.

Do các giả định về tính độc lập và tính chuẩn của kiểm định t, có thể không an toàn khi sử dụng kiểm định t bắt cặp (paired t-test) để kiểm tra sự bằng nhau giữa các giá trị AROC trung bình của bất kỳ hai mô hình nào dựa trên các giá trị AROC mà chúng tôi thu được. Do đó, để ước tính tính nhất quán của năng lực dự đoán cho mỗi mô hình, chúng tôi đã sử dụng kiểm định DeLong [3] để tìm độ lệch chuẩn và khoảng tin cậy 95% cho giá trị AROC của mỗi mô hình. Chúng tôi cũng sử dụng phương pháp DeLong để so sánh các giá trị AROC của hai đường cong ROC tương quan. Đối với mỗi cặp, chúng tôi muốn kiểm tra sự bằng nhau của các AROC của hai đường cong ROC và liệu giá trị AROC của mô hình thứ nhất có lớn hơn đáng kể giá trị của mô hình thứ hai hay không. Phương pháp DeLong là một phương pháp phi tham số được triển khai trong gói pROC trong R [20]. Các kết quả thu được được trình bày trong Bảng 5 và 6.

Hình 2 Các đường cong đặc trưng hoạt động của bộ thu nhận cho các mô hình Rpart, random forest, logistic regression và GBM

Các độ lệch chuẩn nhỏ và các khoảng tin cậy không rộng. Điều này cho thấy rằng các giá trị AROC của bốn mô hình là nhất quán.

Các kết quả này cho thấy rằng giá trị AROC của mô hình GBM lớn hơn đáng kể giá trị của các mô hình Random Forest và Rpart ( P &lt; 0.001), nhưng không lớn hơn đáng kể giá trị của mô hình Logistic Regression ( P &gt; 0.05). Mô hình Logistic Regression cũng có giá trị AROC lớn hơn của Random Forest và của Rpart. Giá trị AROC của mô hình Random Forest cũng lớn hơn đáng kể giá trị của mô hình Rpart. Chúng tôi cũng lưu ý rằng việc so sánh các kiểm định có ý nghĩa thống kê nhưng hiệu năng tương đối này có thể bị giới hạn đối với quần thể dân số và dữ liệu cụ thể mà chúng tôi đang xử lý.

Bảng 4 Trung bình AROC cho bốn mô hình từ kết quả kiểm định chéo

|                     | Mean   |
|---------------------|--------|
| GBM                 | 83.9%  |
| Logistic Regression | 83.5%  |
| Random Forest       | 83.0%  |
| Rpart               | 77.1%  |

Để xem các mô hình của chúng tôi hoạt động như thế nào trên một bộ dữ liệu khác, chúng tôi đã sử dụng Bộ dữ liệu Pima Indians, vốn được công bố công khai [15]. Tất cả bệnh nhân trong bộ dữ liệu này là nữ ít nhất 21 tuổi có nguồn gốc Pima Indian. Có 768 quan sát với 9 biến như sau: Pregnant, số lần mang thai; Glucose, nồng độ glucose huyết tương (nghiệm pháp dung nạp glucose); BP, huyết áp tâm trương (mm/Hg); Thickness (độ dày nếp gấp da cơ tam đầu (mm)); Insulin (insulin huyết thanh 2 giờ (mu U/ ml); BMI (chỉ số khối cơ thể (cân nặng tính bằng kg/(chiều cao tính bằng m) bình phương)); Pedigree (hàm phả hệ đái tháo đường); Age (Tuổi của bệnh nhân tính bằng năm); Diabetes (biến nhị phân với 1 cho Đái tháo đường và 0 cho Không Đái tháo đường).

Khi làm việc trên bộ dữ liệu này, chúng tôi nhận thấy có nhiều hàng bị thiếu dữ liệu và các giá trị bị thiếu ở Glucose, BP, Thickness và BMI được gắn nhãn là 0. Ví dụ, khoảng 48.7% giá trị Insulin bị thiếu. Với mục đích kiểm định các phương pháp của chúng tôi, chúng tôi chọn không

Bảng 5 AROC, độ lệch chuẩn và khoảng tin cậy 95% của AROC cho bốn mô hình sử dụng phương pháp DeLong

|                     | AROC   | Độ lệch chuẩn        | KTC 95%      |
|---------------------|--------|----------------------|--------------|
| GBM                 | 84.5%  | 0.97%                | (82.6, 86.4) |
| Logistic Regression | 84.1%  | 1.01%                | (82.1, 86.1) |
| Random Forest       | 83.2%  | 1.05%                | (81.1, 85.2) |
| Rpart               | 78.1%  | 1.10%                | (76.0, 80.3) |

Bảng 6 Kiểm định DeLong một phía bắt cặp để so sánh các giá trị AROC của bốn mô hình

| Tên kiểm định                         |   thống kê z   |   giá trị p |
|---------------------------------------|---------------|------------|
| GBM vs. Logistic Regression           |         1.392 |      0.081 |
| GBM vs. Random Forest                 |         3.885 |   5.13e-05 |
| GBM vs. Rpart                         |         8.914 |   2.20e-16 |
| Logistic Regression vs. Random Forest |         2.038 |      0.021 |
| Logistic Regression vs. Rpart         |         8.006 |   5.95e-16 |
| Random Forest vs. Rpart               |         7.028 |   1.05e-12 |

điền (impute) dữ liệu mà loại bỏ tất cả các hàng có giá trị bị thiếu. Còn lại 392 quan sát trong bộ dữ liệu làm việc, trong đó 130 bệnh nhân mắc đái tháo đường và 262 không mắc đái tháo đường. Chúng tôi đã áp dụng các phương pháp của mình trên bộ dữ liệu này để dự đoán liệu một bệnh nhân có mắc đái tháo đường hay không. Chúng tôi cũng chia bộ dữ liệu PIMA thành bộ dữ liệu huấn luyện (80% số quan sát) và bộ dữ liệu kiểm tra (20% số quan sát). Chúng tôi đã huấn luyện bốn mô hình trên bộ dữ liệu huấn luyện và kiểm định các mô hình trên bộ dữ liệu kiểm tra. Trên bộ dữ liệu kiểm tra, chúng tôi thu được AROC là 84.7% cho mô hình GBM, 88.0% cho mô hình Logistic Regression, 87.1% cho mô hình Random Forest và 77.0% cho mô hình Rpart (Tệp bổ sung 1: Bảng S8).

Chúng tôi cũng tiến hành kiểm định chéo 10 lần và lặp lại quy trình thêm hai lần nữa.

Dưới đây là các kết quả của chúng tôi dựa trên 30 giá trị AROC từ các kết quả kiểm định chéo được tiến hành trên bộ dữ liệu PIMA Indian.

Các kết quả mà chúng tôi thu được cho bộ dữ liệu này khá nhất quán với những gì chúng tôi quan sát được trong bộ dữ liệu chính của mình (Bảng 7). Dựa trên các kết quả này, GBM, Logistic Regression và Random Forest có thể so sánh được và tất cả đều cho AROC trung bình cao hơn của mô hình Rpart trên bộ dữ liệu kiểm tra. Chúng tôi cũng tạo một biểu đồ hộp để so sánh các phân bố lấy mẫu của các giá trị AROC cho bốn mô hình.

Biểu đồ hộp (Hình 4) cho thấy độ biến thiên trong các giá trị AROC của GBM, Logistic Regression và Random Forest khá giống nhau và nhỏ hơn của mô hình Rpart.

## Thảo luận

Trong nghiên cứu này, chúng tôi đã sử dụng các kỹ thuật học máy Logistic Regression và GBM để xây dựng một mô hình dự đoán xác suất mà một bệnh nhân phát triển DM dựa trên thông tin cá nhân và các kết quả xét nghiệm gần đây của họ. Chúng tôi cũng so sánh các mô hình này với các mô hình học máy khác để thấy rằng các mô hình Logistic Regression và GBM hoạt động tốt nhất và cho các giá trị AROC cao nhất.

Bảng 7 So sánh các giá trị AROC của bốn mô hình sử dụng bộ dữ liệu PIMA Indian

|                     | Mean   |
|---------------------|--------|
| GBM                 | 85.1%  |
| Logistic Regression | 84.6%  |
| Random Forest       | 85.5%  |
| Rpart               | 80.5%  |

Hình 4 Biểu đồ hộp của các giá trị AROC cho các mô hình Rpart, random forest, logistic regression và GBM được áp dụng trên bộ dữ liệu PIMA Indian

Trong quá trình phân tích, chúng tôi cũng sử dụng phương pháp trọng số lớp cho bộ dữ liệu mất cân bằng của mình. Đầu tiên chúng tôi tinh chỉnh trọng số lớp cho lớp DM để tìm trọng số lớp tối ưu giúp tối thiểu hóa chi phí phân loại trung bình. Chúng tôi nhận thấy rằng trọng số lớp tối ưu cho mô hình GBM là 3 và trọng số lớp tối ưu cho Logistic Regression là 3.5. Các trọng số lớp tối ưu này sau đó được tích hợp vào mô hình trong quá trình huấn luyện. Chúng tôi thu được kết quả tương tự cho mô hình GBM, Logistic Regression và Random Forest. Tuy nhiên, mô hình Decision Tree Rpart cho AROC cao hơn ở mức 81.8% so với 78.2% khi sử dụng phương pháp điều chỉnh ngưỡng (Tệp bổ sung 1: Bảng S6). Chúng tôi cũng đã áp dụng một phép biến đổi logarit tự nhiên trên các biến liên tục, tuy nhiên, điều này không cải thiện AROC và độ nhạy.

So với mô hình lâm sàng đơn giản được trình bày bởi Wilson và cộng sự [18], giá trị AROC từ mô hình GBM của chúng tôi rất tương tự. Giá trị AROC của mô hình Logistic Regression của chúng tôi thấp hơn, xét đến việc tiền sử bệnh của cha mẹ không có sẵn trong dữ liệu mẫu của chúng tôi. Chúng tôi cũng lưu ý rằng các đặc điểm của dữ liệu mẫu được sử dụng trong nghiên cứu này không giống với những đặc điểm được sử dụng bởi Wilson và cộng sự [18]. Ví dụ, tuổi của bệnh nhân trong bộ dữ liệu của chúng tôi dao động từ 18 đến 90, trong khi các bệnh nhân được nghiên cứu bởi Wilson và cộng sự [18] dao động từ 45 đến 64. Schmid và cộng sự [16] đã tiến hành một nghiên cứu trên bệnh nhân Thụy Sĩ để so sánh các hệ thống điểm số khác nhau được sử dụng để ước tính nguy cơ phát triển đái tháo đường type 2 chẳng hạn như điểm nguy cơ 9 năm từ Balkau và cộng sự [1], Điểm Nguy cơ Đái tháo đường Phần Lan (Finnish Diabetes Risk Score, FINDRISC) [13], điểm nguy cơ đái tháo đường chưa được chẩn đoán hiện hành từ Griffin và cộng sự [4], các điểm nguy cơ 10 năm từ Kahn và cộng sự [9], điểm nguy cơ 8 năm từ Wilson và cộng sự [18], và điểm nguy cơ từ Hiệp hội Đái tháo đường Thụy Sĩ. Kết quả của họ chỉ ra rằng nguy cơ phát triển đái tháo đường type 2 dao động đáng kể giữa các hệ thống tính điểm được nghiên cứu. Họ cũng khuyến nghị rằng các hệ thống tính điểm nguy cơ khác nhau nên được kiểm định cho mỗi quần thể dân số được xem xét để phòng ngừa đái tháo đường type 2 một cách thỏa đáng. Các hệ thống tính điểm này đều bao gồm yếu tố tiền sử đái tháo đường của cha mẹ và các giá trị AROC được báo cáo trong các hệ thống tính điểm này dao động từ 71 đến 86%. Mashayekhi và cộng sự [11] trước đây đã áp dụng mô hình lâm sàng đơn giản của Wilson cho quần thể dân số Canada. So sánh kết quả của chúng tôi với các kết quả được báo cáo bởi Mashayekhi và cộng sự, các giá trị AROC gợi ý rằng các mô hình GBM và Logistic Regression của chúng tôi hoạt động tốt hơn về khả năng dự đoán. Sử dụng cùng các yếu tố dự báo liên tục từ mô hình lâm sàng đơn giản với ngoại lệ là tiền sử đái tháo đường của cha mẹ, chúng tôi cũng thu được AROC là 83.8% cho mô hình Logistic Regression trên bộ dữ liệu kiểm tra.

## Kết luận

Đóng góp chính của nghiên cứu của chúng tôi là đề xuất hai mô hình dự đoán sử dụng các kỹ thuật học máy, Gradient Boosting Machine và Logistic Regression, nhằm nhận diện các bệnh nhân có nguy cơ cao phát triển DM. Chúng tôi đã áp dụng cả mô hình thống kê cổ điển và các kỹ thuật học máy hiện đại cho bộ dữ liệu mẫu của mình. Chúng tôi đã giải quyết vấn đề dữ liệu mất cân bằng bằng cách sử dụng phương pháp điều chỉnh ngưỡng và phương pháp trọng số lớp. Khả năng phát hiện bệnh nhân mắc DM sử dụng các mô hình của chúng tôi là cao với độ nhạy khá tốt. Các mô hình dự đoán này được phát triển và kiểm định trên quần thể dân số Canada, phản ánh các mẫu hình nguy cơ của DM trong số các bệnh nhân Canada. Các mô hình này có thể được thiết lập trong một chương trình máy tính trực tuyến để hỗ trợ bác sĩ trong việc đánh giá nguy cơ phát triển Đái tháo đường của bệnh nhân Canada.

## Thông tin bổ sung

Thông tin bổ sung đi kèm bài báo này tại https://doi.org/10. 1186/s12902-019-0436-6.

Tệp bổ sung 1: Bảng S1. Tóm tắt các đặc điểm của bệnh nhân trong bộ dữ liệu. Bảng S2. Ma trận nhầm lẫn cho mô hình Gradient Boosting Machine (GBM) với ngưỡng 0.24. Bảng S3. Ma trận nhầm lẫn cho mô hình Logistic Regression với ngưỡng 0.24. Bảng S4. Ma trận nhầm lẫn cho mô hình Random Forest với ngưỡng 0.24. Bảng S5. Ma trận nhầm lẫn cho mô hình Rpart với ngưỡng 0.18. Bảng S6. So sánh AROC với các kỹ thuật học máy khác sử dụng phương pháp trọng số lớp. Bảng S7. Các giá trị Độ nhạy, Độ đặc hiệu, Tỷ lệ phân loại sai và AROC của bốn mô hình trên bộ dữ liệu được nghiên cứu. Bảng S8. Các giá trị Độ nhạy, Độ đặc hiệu, Tỷ lệ phân loại sai và AROC của bốn mô hình trên bộ dữ liệu PIMA Indians.

Tệp bổ sung 2: Hình S1 . Ma trận biểu đồ phân tán của các biến liên tục.

Tệp bổ sung 3. Mô tả quy trình tinh chỉnh mô hình. Sơ đồ mô hình.

## Từ viết tắt

AROC: Diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận; BMI: Chỉ số khối cơ thể; DM: Đái tháo đường; FBS: Đường huyết lúc đói; GBM: Gradient boosting machine; HDL: Lipoprotein tỷ trọng cao; LDL: Lipoprotein tỷ trọng thấp; sBP: Huyết áp tâm thu; TG: Triglyceride

## Lời cảm ơn

Chúng tôi xin cảm ơn Hội đồng Nghiên cứu Khoa học Tự nhiên và Kỹ thuật Canada (Natural Sciences and Engineering Research Council of Canada, NSERC), Quỹ Đổi mới Canada (Canada Foundation for Innovation, CFI) và Viện Fields về Nghiên cứu Khoa học Toán học vì sự hỗ trợ của họ. Đồng thời, chúng tôi xin ghi nhận Mạng lưới Giám sát Trọng điểm Chăm sóc Sức khỏe Ban đầu Canada (Canadian Primary Care Sentinel Surveillance Network, CPCSSN) vì sự hào phóng trong việc cung cấp bộ dữ liệu được sử dụng trong nghiên cứu này. Chúng tôi cũng cảm ơn Biên tập viên và các phản biện vì những nhận xét hữu ích của họ, đã giúp chúng tôi cải thiện bản thảo.

## Đóng góp của các tác giả

XG và HH đã có những đóng góp đáng kể vào việc hình thành ý tưởng và thiết kế công trình. KK và AG cung cấp dữ liệu và hướng dẫn y khoa. HL phân tích dữ liệu và diễn giải các kết quả. Tất cả các tác giả đã biên tập bản thảo. Tất cả các tác giả đã đọc và phê duyệt bản thảo cuối cùng.

## Thông tin của các tác giả

XG (PhD) là giáo sư tại Khoa Toán học và Thống kê, Đại học York, Toronto, Ontario, Canada. Email: xingao@mathstat.yorku.ca HH (PhD) là giáo sư tại Khoa Toán học và Thống kê, Đại học York và là Phó Giám đốc Viện Fields về Nghiên cứu Khoa học Toán học, Toronto, Ontario, Canada. Email:

## hhuang@mathstat.yorku.ca.

AG (PhD) là giáo sư tại Trường Quản lý Ted Rogers - Quản lý Công nghệ Thông tin, Đại học Ryerson và là giáo sư thỉnh giảng tại Khoa Toán học và Thống kê, Đại học York, Toronto, Ontario, Canada. Email: a2guerga@ryerson.ca

KK (MD, MBA) là giáo sư thỉnh giảng và là một kiến trúc sư IT lâm sàng đang hành nghề tại Viện Chính sách, Quản lý và Đánh giá Y tế, Đại học Toronto, Toronto, Ontario, Canada.

## Email: karim.keshavjee@ryerson.ca

HL (MSc, MA) là nghiên cứu sinh tiến sĩ tại Khoa Toán học và Thống kê, Đại học York, và là giảng viên thỉnh giảng tại Đại học Guelph-Humber Toronto, Ontario, Canada.

Email: hang68@mathstat.yorku.ca.

## Tài trợ

Nghiên cứu này được tài trợ một phần bởi khoản tài trợ NSERC do Gao nắm giữ.

## Tính sẵn có của dữ liệu và tài liệu

Dữ liệu hỗ trợ các phát hiện của nghiên cứu này có sẵn từ CPCSSN (www.cpcssn.ca) nhưng có những hạn chế áp dụng đối với tính sẵn có của các dữ liệu này, vốn được sử dụng theo giấy phép cho nghiên cứu hiện tại, và do đó không được công bố công khai. Tuy nhiên, dữ liệu có sẵn từ các tác giả theo yêu cầu hợp lý và với sự cho phép của CPCSSN.

## Phê duyệt đạo đức và sự đồng ý tham gia

Chúng tôi đã được cấp miễn trừ của Hội đồng Đạo đức Nghiên cứu (Research Ethics Board, REB) từ Đại học Ryerson. Số Đơn REB là: REB 2016 -034 cho nghiên cứu mang tên: Sử dụng Học máy và Các Phương pháp Dự đoán Khác để Nhận diện Tốt hơn Các Bệnh nhân Có Nguy cơ Mắc Đái tháo đường và Bệnh Tim mạch.

Phê duyệt đạo đức được miễn trừ vì những lý do sau:

1. Các phê duyệt đạo đức đã được lấy từ 10 hội đồng đạo đức nghiên cứu (REB) của các trường đại học trên khắp Canada và từ REB của Health Canada cho việc trích xuất dữ liệu ban đầu.

2. Dữ liệu đã được ẩn danh hoàn toàn bằng cách sử dụng một phần mềm đặc biệt (PARAT từ Privacy Analytics) giúp khử định danh dữ liệu và sử dụng các định danh được phân bổ ngẫu nhiên không thể liên kết với các bộ dữ liệu khác.
3. Dữ liệu không có bất kỳ phương pháp nào để nhận diện những người có nguồn gốc Bản địa.

## Sự đồng ý cho việc xuất bản

Không áp dụng

## Lợi ích cạnh tranh

Các tác giả tuyên bố rằng họ không có lợi ích cạnh tranh nào.

## Thông tin chi tiết về tác giả

1 Khoa Toán học và Thống kê, Đại học York, 4700 Keele Street, Toronto, Ontario M3J 1P3, Canada. 2 Viện Fields về Nghiên cứu Khoa học Toán học, Phòng thí nghiệm Trung tâm Phân tích và Mô hình hóa Định lượng (CQAM), 222 College Street, Toronto, Ontario M5T 3J1, Canada. 3 Viện Chính sách, Quản lý và Đánh giá Y tế, Đại học Toronto, 155 College Street, Suite 425, Toronto, Ontario M5T 3M6, Canada. 4 Trường Quản lý Ted Rogers - Quản lý Công nghệ Thông tin, Đại học Ryerson, 350 Victoria Street, Toronto, Ontario M5B 2K3, Canada.

## Đã nhận: 23 December 2018 Đã chấp nhận: 30 September 2019

## Tài liệu tham khảo

1. Balkau B, Lange C, Fezeu L, et al. Predicting diabetes: clinical, biological, and genetic approaches: data from the epidemiological study on the insulin resistance syndrome (DESIR). Diabetes Care. 2008;31:2056 -61.
2. Bischl B, Lang M, Kotthoff L, Schiffner J, Richter J, et al. mlr: machine learning in R. J Mach Learn Res. 2016;17(170):1 -5.
3. DeLong ER, DeLong DM, Clarke-Pearson DL. Comparing the areas under two or more correlated receiver operating characteristic curves: a nonparametric approach. Biometrics. 1988;44:837 -45.
4. Griffin SJ, Little PS, Hales CN, Kinmonth AL, Wareham NJ. Diabetes risk score: towards earlier detection of type 2 diabetes in general practice. Diabetes Metab Res Rev. 2000;16:164 -71.
5. Habibi S, Ahmadi M, Alizadeh S. Type 2 diabetes mellitus screening and risk factors using decision tree: results of data mining. Global J Health Sci. 2015; 7(5):304 -10.
6. Iyer A, Jeyalatha S, Sumbaly R. Diagnosis of diabetes using classification mining techniques. Int J Data Min Knowl Manage Process (IJDKP). 2015; 5(1):1 -14.
7. Ioannis K, Olga T, Athanasios S, Nicos M, et al. Machine learning and data mining methods in diabetes research. Comput Struct Biotechnol J. 2017;15: 104 -16.
8. Jayalakshmi T, Santhakumaran A. A novel classification method for diagnosis of diabetes mellitus using artificial neural networks, International conference on data storage and data engineering, India; 2010. p. 159 -63.
9. Kahn HS, Cheng YJ, Thompson TJ, Imperatore G, Gregg EW. Two riskscoring systems for predicting incident diabetes mellitus in U.S. adults age 45 to 64 years. Ann Intern Med. 2009;150:741 -51.
10. Kandhasamy JP, Balamurali S. Performance analysis of classifier models to predict diabetes mellitus. Procedia Comput Sci. 2015;47:45 -51.
11. Mashayekhi M, Prescod F, Shah B, Dong L, Keshavjee K, Guergachi A. Evaluating the performance of the Framingham diabetes risk scoring model in Canadian electronic medical records. Can J Diabetes. 2015;39(30):152 -6.
12. Meng XH, Huang YX, Rao DP, Zhang Q, Liu Q. Comparison of three data mining models for predicting diabetes or prediabetes by risk factors. Kaohsiung J Med Sci. 2013;29(2):93 -9.
13. Lindström J, Tuomilehto J. The diabetes risk score: a practical tool to predict type 2 diabetes risk. Diabetes Care. 2003;26:725 -31.
14. Natekin A, Knoll A. Gradient boosting machines, a tutorial. Front Neurorobot. 2013;7:21. Published online 2013 Dec 4. https://doi.org/10.3389/ fnbot.2013.00021.
15. Pima-Indians-Diabetes-Dataset-Missing-Value-Imputation. https://github. com/ashishpatel26/Pima-Indians-Diabetes-Dataset-Missing-ValueImputation/blob/master/Readme.md. Accessed 20 Apr 2019.
16. Schmid R, Vollenweider P, Waeber G, Marques-Vidal P. Estimating the risk of developing type 2 diabetes: a comparison of several risk scores: the Cohorte Lausannoise study. Diabetes Care. 2011;34:1863 -8.
17. Sisodia D, Sisodia DS. Prediction of diabetes using classification algorithms. Procedia Comput Sci. 2018;132:1578 -85.
18. Wilson PW, Meigs JB, Sullivan L, Fox CS, Nathan DM, et al. Prediction of incident diabetes mellitus in middle-aged adults: the Framingham offspring study. Arch Intern Med. 2007;167:1068 -74.
19. Williamson T, Green ME, Birtwhistle R, Khan S, Garies S, Wong ST, Natarajan N, Manca D, Drummond N. Validating the 8 CPCSSN case definitions for chronic disease surveillance in a primary care database of electronic health records. Ann Fam Med. 2014;12(4):367 -72. https://doi.org/10.1370/afm.1644 PubMed PMID: 25024246; PubMed Central PMCID: PMC4096475.
20. Robin X, Turck N, Hainard A, Tiberti N, Lisacek F, Sanchez J-C, Müller M. pROC: an open-source package for R and S+ to analyze andcompare ROC curves. BMC Bioinformatics. 2011;12:77. https://doi.org/10.1186/ 1471-2105-12-77.
21. Zou Q, Qu K, Luo Y, et al. Predicting diabetes mellitus with machine learning techniques. Front Genet. 2018;9:515.

## Lưu ý của Nhà xuất bản

Springer Nature giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã xuất bản và các liên kết thể chế.
