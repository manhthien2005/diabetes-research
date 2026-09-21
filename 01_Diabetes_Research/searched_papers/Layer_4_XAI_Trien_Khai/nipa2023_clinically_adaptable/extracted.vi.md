<!-- extracted by pdf-extract | engine=docling | pages=11 | ocr=False | tables=3/3 | density=1.04 | score=100 -->

## Bài báo Nghiên cứu

## Mô hình học máy có thể thích ứng lâm sàng để nhận diện các đặc trưng sớm đáng chú ý của đái tháo đường

Nurjahan Nipa 1 , Mahmudul Hasan Riyad 2 , Shahriare Satu 3 , Walliullah 2 , Koushik Chandra Howlader 4 , 5 , Mohammad Ali Moni 6 , ∗

- 1 Department of Information and Communication Technology, Bangabandhu Sheikh Mujibur Rahman Digital University, Bangladesh, Kaliakair, Gazipur, 1750 Bangladesh
- 2 Department of Applied Mathematics, Noakhali Science and Technology University, Noakhali, 3814, Bangladesh
- 3 Department of Management Information Systems, Noakhali Science and Technology University, Noakhali, 3814, Bangladesh
- 4 Department of Computer Science and Telecommunication Engineering, Noakhali Science and Technology University, Noakhali, 3814, Bangladesh
- 5 Department of Computer Science, North Dakota State University, Fargo, 58105, ND, United States
- 6 School of Health and Rehabilitation Sciences, Faculty of Health and Behavioural Sciences, The University of Queensland, St Lucia, QLD 4072, Australia

## t h ô n g t i n b à i b á o

Từ khóa: Đái tháo đường Các đặc trưng sớm Học máy

Phân loại

## 1. Giới thiệu

Đái tháo đường là một bệnh mạn tính xảy ra do tuyến tụy sản xuất một lượng insulin không đủ hoặc khi lượng

## t ó m t ắ t

Mục tiêu Đái tháo đường là một bệnh nghiêm trọng nơi cơ thể của các bệnh nhân bị ảnh hưởng không sản xuất đủ insulin gây ra một bất thường về đường huyết. Bệnh này xảy ra vì một số lý do gồm lối sống hiện đại, thái độ uể oải, tiêu thụ thực phẩm không lành mạnh, tiền sử gia đình, tuổi, thừa cân, v.v. Mục đích của nghiên cứu này là đề xuất một mô hình dự đoán dựa trên học máy phát hiện đái tháo đường từ giai đoạn đầu.

Phương pháp Trong công trình này, chúng tôi đã thu thập 520 hồ sơ bệnh nhân từ kho lưu trữ học máy của University of California, Irvine (UCI) của Sylhet Diabetes Hospital, Sylhet. Sau đó, một bảng câu hỏi tương tự của bệnh viện đó được tuân theo và tập hợp 558 hồ sơ bệnh nhân từ khắp Bangladesh qua bảng câu hỏi này. Tuy nhiên, chúng tôi đã tích lũy các hồ sơ bệnh nhân của hai bộ dữ liệu này. Ở bước tiếp theo, các bộ dữ liệu này được làm sạch và áp dụng ba mươi lăm bộ phân loại hiện đại nhất như logistic regression (LR), K nearest neighbors (KNN), support vector classifier (SVC), Nave Byes (NB), decision tree (DT), random forest (RF), stochastic gradient descent (SGD), Perceptron, AdaBoost, XGBoost, passive aggressive classifier (PAC), ridge classifier (RC), Nu-support vector classifier (NuSVC), linear support vector classifier (LSVC), calibrated classifier CV (CCCV), nearest centroid (NC), Gaussian process classifier (GPC), multinomial NB (MNB), complement NB, Bernoulli NB (BNB), categorical NB, Bagging, extra tree(ET), gradiant boosting classifier (GBC), Hist gradiant boosting classifier (HGBC), one vs rest classifier (OVsRC), multi-layer perceptron (MLP), label propagation (LP), label spreading (LS), stacking, ridge classifier CV (RCCV), logistic regression CV (LRCV), linear discriminant analysis (LDA), quadratic discriminant analysis (QDA), và light gradient boosting machine (LGBM) để khám phá mô hình dự đoán ổn định tốt nhất. Hiệu năng của các bộ phân loại đã được đo bằng năm thước đo như accuracy, precision, recall, F1-score, và area under the receiver operating characteristic. Cuối cùng, các kết cục này được diễn giải bằng các phương pháp Shapley additive explanations và xác định các đặc trưng liên quan đến việc xảy ra đái tháo đường.

Kết quả Trong công trình này, các bộ phân loại khác nhau đã thể hiện hiệu năng của chúng nơi ET vượt trội hơn bất kỳ bộ phân loại nào khác với độ chính xác 97.11% cho bộ dữ liệu Sylhet Diabetes Hospital (SDHD) và MLP cho thấy độ chính xác tốt nhất (96.42%) cho bộ dữ liệu được thu thập. Tiếp theo, HGBC và LGBM cung cấp độ chính xác cao nhất 94.90% cho các bộ dữ liệu kết hợp một cách riêng lẻ.

Kết luận LGBM, stacking, HGBC, RF, ET, bagging, và GBC có thể đại diện cho các kết quả dự đoán ổn định hơn cho mỗi bộ dữ liệu.

insulin được sản xuất không được sử dụng đúng cách. Khoảng bình thường của đường huyết được tìm thấy là 70-100 mg/dl cho một người khỏe mạnh. Nếu mức vượt quá khoảng này, nó được gọi là đái tháo đường [1] . Theo Liên đoàn Đái tháo đường Quốc tế (IDF), xấp xỉ 463 triệu người trên toàn

∗ Tác giả liên hệ: Mohammad Ali Moni, School of Health and Rehabilitation Sciences, Faculty of Health and Behavioural Sciences, The University of Queensland, St Lucia, QLD 4072, Australia (Email: m.moni@uq.edu.au ).

Nội dung có sẵn tại ScienceDirect

## Intelligent Medicine

trang chủ tạp chí: www.elsevier.com/locate/imed

thế giới bị ảnh hưởng bởi bệnh này. Có một lo ngại rằng con số này sẽ tăng lên đến 578 triệu vào năm 2030 cũng như 700 triệu vào năm 2045 [2] . Theo nghiên cứu, cứ 1 trong 5 người trên 65 tuổi bị ảnh hưởng bởi bệnh này. Tình trạng chưa được chẩn đoán gây ra nhiều biến chứng khác nhau như bệnh võng mạc, bệnh thần kinh, bệnh thận, bệnh vi mạch và bệnh mạch máu lớn, v.v. Các bệnh nhân của bệnh này dễ bị nhiễm nhiều bệnh khác nhau như viêm phổi, lao, cắt cụt chi dưới, và tim mạch bao gồm các bệnh thận [2] . Năm 2019, nó gây ra cái chết của gần 4.2 triệu người trên toàn thế giới. Bên cạnh đó, tỷ lệ nhiễm bệnh không ngừng tăng ở các quốc gia thu nhập thấp và trung bình nơi gần 79% người trưởng thành đang mang bệnh này [3] . Đái tháo đường được chia thành ba loại là Type 1, Type 2, và đái tháo đường thai kỳ (GDM). Type 1 xảy ra do insulin được sản xuất không đủ hoặc không có và chủ yếu phát triển ở các độ tuổi trẻ hơn, mặc dù có thể phát triển ở bất kỳ độ tuổi nào. Đái tháo đường Type 2 xảy ra thường xuyên hơn các loại đái tháo đường khác nơi insulin được sản xuất không được sử dụng đúng cách do thiếu vận động thể chất, hành vi ít vận động, tiêu thụ thực phẩm không lành mạnh, v.v. GDM xảy ra ở phụ nữ mang thai do đường huyết cao, làm tăng các biến chứng cho cả mẹ và con. Theo nghiên cứu [3] , cứ 1 trong 6 trẻ sinh ra còn sống với bệnh này. Loại đái tháo đường này thường kết thúc sau giai đoạn mang thai, nhưng sau đó họ có nguy cơ cao hơn bị ảnh hưởng bởi đái tháo đường type 2.

Hơn nữa, chi phí do chi tiêu y tế cho đái tháo đường là 760 tỷ USD vào năm 2019 trên toàn thế giới. Số tiền này sẽ tăng lên 825 tỷ USD vào năm 2030 và 845 tỷ USD vào năm 2045 [4] . Ở Bangladesh, chi tiêu trung bình là $ 864.7 USD mỗi người vào năm 2017 [5] . Năm 2011, khoảng 9.7% người trưởng thành đang bị ảnh hưởng bởi bệnh này và nó được dự kiến sẽ là 13.7 triệu vào năm 2045 [5] . Chi phí của đái tháo đường tạo ra một gánh nặng lớn lên chi tiêu tự nhiên ở các quốc gia thu nhập thấp và trung bình. Tuy nhiên, các phương pháp nghiệm pháp dung nạp glucose đường uống (OGTT) và HbA1c đang được dùng để phát hiện bệnh này trên toàn cầu. Nhưng, các phương pháp này tốn kém, mất thời gian, cũng như đòi hỏi kỹ thuật viên chuyên môn để thực hiện xét nghiệm này [6] . Tuy nhiên, các xét nghiệm này không được thực hiện đúng cách ở các vùng nông thôn. Việc chẩn đoán và điều trị bị trì hoãn làm tăng độ phức tạp của bệnh này lên một mức độ lớn. Do đó, một số yếu tố như tuổi, glucose, chỉ số khối cơ thể (BMI), huyết áp, độ dày da, hàm phả hệ đái tháo đường (diabetes pedigree function), insulin, thai kỳ, v.v. được yêu cầu để nhận diện đái tháo đường hiệu quả hơn. Tuy nhiên, chẩn đoán sớm đái tháo đường giảm thiểu bệnh suất của bệnh nhân và giúp tránh bất kỳ biến chứng nghiêm trọng nào. Hơn nữa, đó là một nhiệm vụ thách thức vì tính phi tuyến cũng như độ phức tạp của dữ liệu.

Khai phá dữ liệu được yêu cầu để khám phá nhiều loại hồ sơ đái tháo đường khác nhau nhằm chẩn đoán bệnh này hiệu quả hơn. Các phương pháp này không chỉ giảm tỷ lệ tử vong và biến chứng mà còn tiết kiệm thời gian và công sức cho cả bệnh nhân và các chuyên gia y tế. Trong nghiên cứu này, chúng tôi đã khảo sát tiềm năng của các kỹ thuật học máy để dự đoán đái tháo đường ở giai đoạn sớm. Đầu tiên, chúng tôi đã thu thập các thể hiện bệnh nhân của Sylhet Diabetes Hospital ở Sylhet, Bangladesh từ kho lưu trữ học máy UCI được gọi là SDHD. Do đó, chúng tôi đã thu thập các hồ sơ bệnh nhân đái tháo đường qua một bảng câu hỏi tương tự bởi các chuyên gia y tế (tức là từ SDHD). Sau đó, chúng tôi kết hợp hai bộ dữ liệu này và tạo ra một bộ dữ liệu hợp nhất (MDD). Trong các bước làm việc, chúng tôi đã làm sạch các bộ dữ liệu này và áp dụng nhiều bộ phân loại khác nhau như logistic regression (LR), K nearest neighbors (KNN), support vector classifier (SVC), Nave Byes (NB), decision tree (DT), random forest (RF), stochastic gradient descent (SGD), Perceptron, AdaBoost, XGBoost, passive aggressive classifier (PAC), ridge classifier (RC), Nu-support vector classifier (Nu SVC), linear support vector classifier (LSVC), calibrated classifier CV (CCCV), nearest centroid (NC), Gaussian process classifier (GPC), multinomial NB (MNB), complement NB, Bernoulli NB (BNB), categorical NB, Bagging, extra tree(ET), gradiant boosting classifier (GBC), Hist gradiant boosting classifier (HGBC), one vs rest classifier (OVsRC), multi-layer perceptron (MLP), label propagation (LP), label spreading (LS), stacking, ridge classifier CV (RCCV), logistic regression CV (LRCV), linear discriminant analysis (LDA), quadratic discriminant analysis (QDA), và light gradient boosting machine (LGBM) vào các bộ dữ liệu này tương ứng.

Cuối cùng, chúng tôi đã tìm thấy các mô hình dự đoán ổn định tốt nhất cho mỗi bộ dữ liệu. Sau đó, các đặc trưng có ý nghĩa cho mỗi bộ phân loại đã được diễn giải bằng các giá trị SHapley Additive exPlanations (SHAP).

Mục 2 mô tả các bộ dữ liệu và các phương pháp luận được dùng trong công trình này, Mục 3 chứa các kết quả thực nghiệm, và Mục 4 bao gồm các công trình liên quan của thời gian gần đây và so sánh công trình này với các công trình hiện đại nhất và cuối cùng, Mục 5 bao gồm kết luận và các kế hoạch tương lai về công trình này.

## 2. Dữ liệu và phương pháp

Phương pháp luận được đề xuất ( Hình 1 ) để phát hiện đái tháo đường được trình bày trong một số mục như sau:

## 2.1. Mô tả bộ dữ liệu

Đầu tiên, chúng tôi đã thu thập một bộ dữ liệu dự đoán nguy cơ đái tháo đường giai đoạn sớm của Sylhet Diabetes Hospital (tức là gọi là SDHD) từ kho lưu trữ học máy UCI [6] . Nó chứa 520 hồ sơ với 17 thuộc tính được mô tả ngắn gọn trong Bảng 1 . Bộ dữ liệu này chứa thông tin về các bệnh nhân mới bị ảnh hưởng có các dấu hiệu và triệu chứng của đái tháo đường. Trong số 520 thể hiện, có 320 ca đái tháo đường và 200 ca bình thường nơi tỷ lệ nam và nữ được tìm thấy lần lượt là 63% : 37%. Khoảng tuổi được xác định trong khoảng 20 đến 65 của các bệnh nhân và tất cả các thuộc tính là danh nghĩa (nominal) ngoại trừ tuổi. Sau đó, chúng tôi đã xét các thuộc tính gần như tương tự của SDHD, và bảng câu hỏi này được rà soát và phê duyệt bởi ban nghiên cứu (research cell), tại Noakhali Science and Technology University. Sau đó, chúng tôi đã thu thập thủ công 558 hồ sơ (tức là, bộ dữ liệu này được đặt tên là prediagnosis diabetes (PDD)) có 19 thuộc tính nơi khoảng tuổi của các bệnh nhân được tìm thấy trong khoảng 10 đến 90 tuổi. Trong bộ dữ liệu này, 191 ca được quan sát là đái tháo đường và 367 ca được nhận thức là các ca bình thường. Một mô tả ngắn gọn về các thuộc tính khác nhau trong các bộ dữ liệu này được trình bày trong Bảng 1 . Sau đó, chúng tôi kết hợp SDHD và PDD được đổi tên là MDD. Để trộn chúng, chúng tôi đã xét 14 thuộc tính tương tự giữa hai bộ dữ liệu (tức là, chi tiết trong Bảng 1 ).

## 2.2. Tiền xử lý dữ liệu

Các thể hiện thô thường chứa các giá trị nhiễu và thiếu. Do đó, cần tiền xử lý dữ liệu sơ cấp để tạo ra các kết cục tốt. Trong PDD, chúng tôi đã quy đổi (impute) một giá trị thiếu cho tuổi bằng cách dùng trung bình của tuổi. Sau đó, năm giá trị thiếu được quy đổi cho hút thuốc bằng giá trị xuất hiện nhiều nhất 'No'. Hơn nữa, chúng tôi đã chuyển đổi cân nặng và tất cả các thuộc tính phân loại thành số tương ứng. Trước khi sang bước tiếp theo, chúng tôi đã kiểm tra các điểm ngoại lai (outliers) của các bộ dữ liệu này bằng cách dùng phương pháp khoảng tứ phân vị (IQR) [7-9] . Hơn nữa, chúng tôi đã thực hiện một phân tích tương quan và kiểm định t trên các bộ dữ liệu này. Khi hai thuộc tính tương quan cao, một trong số chúng cần được loại bỏ để đạt được các kết quả tốt hơn.

## 2.3. Các bộ phân loại học máy

Chúng tôi đã áp dụng 35 bộ phân loại là, LR, KNN, SVC, NB, DT, RF, SGD, Perceptron, AdaBoost, XGBoost, PAC, RC, Nu-SVC, LSVC, CCCV, NC, GPC, MNB, Complement NB, BNB, Categorical NB, Bagging, ET, GBC, HGBC, OVsRC, MLP, LP, LS, Stacking, RCCV, LRCV, LDA, QDA, LGBM vào ba bộ dữ liệu này. Một số mô hình ML hoạt động tốt này được mô tả ngắn gọn như sau:

## 2.3.1. Extra tree (ET)

ET [10] là một phương pháp tập hợp gồm các cây quyết định khác nhau như RF [11] . Nhưng, nó khác với RF theo hai cách. ET giảm thiểu độ chệch (bias) và phương sai nơi độ chệch được giảm bằng cách huấn luyện toàn bộ các mẫu dữ liệu của mỗi cây quyết định thay vì các mẫu bootstrap, không như RF. Bên cạnh đó, việc giảm phương sai được đạt được bằng cách chọn các điểm cắt trong khi việc tách nút được thực hiện ngẫu nhiên. Việc tách ngẫu nhiên giảm thời gian thực thi của thuật toán.

Hình 1. Quy trình làm việc của sơ đồ khái niệm. SDHD: bộ dữ liệu Sylhet Diabetes Hospital; PDD: bộ dữ liệu prediagnosis diabetes; MDD: SDHD và PDD kết hợp.

Bảng 1 Các thuộc tính khác nhau của các bộ dữ liệu

|   Số | Thuộc tính          | Loại      | Giá trị         | SDHD   | PDD   | MDD   |
|----------|---------------------|-----------|-----------------|--------|-------|-------|
|        1 | Age (years)         | Numerical | (10-90)/(20-65) | ✓      | ✓     | ✓     |
|        2 | Gender              | Nominal   | Male or Female  | ✓      | ✓     | ✓     |
|        3 | Polyuria            | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|        4 | Polydipsia          | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|        5 | Sudden weight loss  | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|        6 | Weakness            | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|        7 | Polyphagia          | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|        8 | Genital thrush      | Nominal   | Yes or No       | ✓      |       |       |
|        9 | Blurred vision      | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       10 | Itching             | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       11 | Irritability        | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       12 | Delayed healing     | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       13 | Partial paresis     | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       14 | Muscle stiffness    | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       15 | Alopecia            | Nominal   | Yes or No       | ✓      | ✓     | ✓     |
|       16 | Obesity             | Nominal   | Yes or No       | ✓      |       |       |
|       17 | Weight              | Nominal   | Yes or No       |        | ✓     |       |
|       18 | Smoking             | Nominal   | Yes or No       |        | ✓     |       |
|       19 | High blood pressure | Nominal   | Yes or No       |        | ✓     |       |
|       20 | Parental diabetes   | Nominal   | Yes or No       |        | ✓     |       |

SDHD: bộ dữ liệu Sylhet Diabetes Hospital; PDD: bộ dữ liệu prediagnosis diabetes; MDD: SDHD và PDD kết hợp.

## 2.3.2. Bagging

Bagging gọi là tổng hợp bootstrap (bootstrap aggregation) là một phương pháp tập hợp để giảm thiểu độ chệch và phương sai [12] . Nó xây dựng nhiều tập huấn luyện bằng cách lấy các mẫu dùng phương pháp bootstrap [13] . Sau đó, các kỹ thuật phân loại khác nhau được áp dụng vào các tập con huấn luyện này. Cuối cùng, các kết quả dự đoán được thu được từ mỗi mô hình nơi các kết cục này được tổng hợp để tạo ra đầu ra cuối cùng [14] . Kỹ thuật này thường rất hiệu quả để cung cấp hiệu năng cao hơn các bộ phân loại đơn lẻ.

## 2.3.3. Máy vector hỗ trợ (SVC)

SVC là một trong những thuật toán có giám sát phổ biến và hiệu quả nhất với khả năng tổng quát hóa xuất sắc được dùng cho cả các bài toán phân loại và hồi quy [15-17] . Nó chia các điểm dữ liệu bằng cách tạo một siêu phẳng nơi một số điểm dữ liệu gần với đường này hơn được gọi là các vector hỗ trợ. Trong SVC tuyến tính, nó tạo ra một sự phân biệt giữa hai lớp trong một không gian /u1D45B chiều với một siêu phẳng tối đa /u1D45B -1 chiều. Đường được chọn từ một số siêu phẳng với lề tối đa. Bên cạnh đó, sự phân tách các điểm dữ liệu không dễ dàng hơn. Một số điểm dữ liệu có thể rơi vào vùng 'xám'. Trong các kịch bản như vậy, SVC bỏ qua vị trí sai của các điểm dữ liệu tùy thuộc vào tham số do người dùng chỉ định cân bằng lỗi phân loại và tối đa hóa lề. Nó dùng một số thủ thuật kernel như các hàm tuyến tính, đa thức, sigmoid, và hàm cơ sở bán kính (RBF) ánh xạ các mẫu từ không gian chiều thấp lên cao.

## 2.3.4. Multi-layer perceptron (MLP)

Perceptron là một mô hình phân loại đơn giản được dùng cho phân loại nhị phân. Trong phương pháp này, đầu ra được tính bằng tổng có trọng số của các đặc trưng đầu vào và một số hạng độ chệch. Một perceptron cụ thể được kích hoạt tùy thuộc vào giá trị của kết quả đầu ra. Một perceptron gồm một lớp đầu vào và đầu ra. Trái lại, MLP chứa ít nhất 3 lớp gồm các lớp đầu vào, ẩn, và đầu ra. Bộ phân loại này được dùng rộng rãi để thực hiện nhiều nhiệm vụ khác nhau như phân tích dự đoán [ 18-19 ], nhận dạng hình ảnh [ 20-21 ], nhận dạng giọng nói, dịch máy, v.v. Nó là một mạng nơ-ron truyền thẳng kết nối đầy đủ (FFNN) nơi dữ liệu đầu vào truyền từ lớp đầu vào, ẩn đến lớp đầu ra. Đối với phân tích dữ liệu phức tạp, các lớp ẩn và đầu ra được dùng trong các hàm truyền phi tuyến vào MLP. Tuy nhiên, nó giảm thiểu lỗi dự đoán vào một khoảng chấp nhận được bằng cách dùng thuật toán lan truyền ngược (backpropagation).

## 2.3.5. Extreme gradient boosting (XgBoost)

XgBoost [22] , một biến thể cập nhật của Gradient Boosting Machine (GBM) là một bộ phân loại tập hợp được dùng rộng rãi trong các bài toán dự đoán, phân loại, cũng như hồi quy [23-26] . Nó tích hợp một số bộ học yếu để tạo ra một bộ học mạnh về khả năng mở rộng, tốc độ thực thi, và hiệu năng. Các bộ học yếu kế tiếp giảm lỗi dư của các bộ học trước đó bằng cách tìm các gradient bậc hai.

## 2.3.6. Gradiant boosting classifier (GBC)

GBC [27] là một phương pháp tập hợp mạnh kết hợp các bộ học yếu để tạo ra một bộ học mạnh cho các nhiệm vụ phân loại và dự đoán [28] . Nó gồm ba phần chính: hàm mất mát, một số bộ học yếu, và một mô hình cộng tính. GBC cải thiện độ chính xác của nó bằng cách giảm các mất mát của các bộ học cơ sở trước đó trong mỗi lần lặp.

## 2.3.7. Quadratic discriminant analysis (QDA)

QDA là phần mở rộng của LDA phân tách các điểm dữ liệu của mỗi lớp bằng cách tạo một siêu phẳng trong khi QDA phân biệt các điểm dữ liệu của mỗi điểm bằng một bề mặt bậc hai. Khi phương sai dữ liệu tương đối nhỏ, LDA cho các kết quả tốt hơn QDA. Trong khi kích thước dữ liệu lớn và các phương sai trở nên lớn hơn, QDA cung cấp các kết quả tốt trong khi LDA không cung cấp các đầu ra tốt trong thời gian dài hơn. Trong hai bộ phân loại, các quan sát của các lớp này tuân theo phân phối Gauss và dùng lý thuyết Bayes cho phân loại. Không như LDA, hiệp phương sai của mỗi lớp không tương tự nhau trong QDA.

## 2.3.8. Light gradient boosting machine (LGBM)

LightGBM [29] là một phương pháp tập hợp dựa trên gradient boosting hiệu quả cho các nhiệm vụ dự đoán [26,30] . Nó kết hợp nhiều cây quyết định khác nhau và việc tách được thực hiện theo lá (leafwise). Để xử lý một số lượng lớn các mẫu dữ liệu và đặc trưng, nó dùng kỹ thuật Gradient-based One-Side Sampling (GOSS) và Exclusive Feature Bundling (EFB).

## 2.3.9. Hist gradient boosting classifier (HGBC)

Trong khi gradient boosting chậm hơn để huấn luyện và không hiệu quả cho 10,000 mẫu dữ liệu, HGBC là một kỹ thuật bền vững để huấn luyện một lượng mẫu lớn hơn.

## 2.3.10. Stacking

Stacking là một kỹ thuật tập hợp dự đoán các kết quả bằng cách dùng hai lớp mô hình học. Ở lớp đầu tiên, các bộ học cơ sở khác nhau được huấn luyện bởi các tập con của bộ dữ liệu sơ cấp. Sau đó, các đầu ra của các bộ học này được dùng trong tập con của mô hình học lớp thứ 2 hoặc bộ học meta (meta learner). Bên cạnh đó, biến phụ thuộc vẫn giống như bộ dữ liệu sơ cấp, chỉ có đầu ra được tạo ra từ các mô hình cơ sở được đưa làm đầu vào cho bộ học meta [31] .

## 2.3.11. Decision tree (DT)

DT là một mô hình phân loại dễ dùng và diễn giải, ngay cả với người dùng mới. Nó phân tích các hồ sơ của các đặc tính khác nhau và chia không gian đầu vào theo thứ bậc cho đến khi nó đạt một hạng mục. Nó có ba loại nút như nút gốc, nội bộ, và cuối/lá. Nút gốc có không hoặc nhiều cạnh đi ra trong khi nó không có cạnh đi vào. Trái lại, các nút lá chứa các cạnh đi vào, nhưng không có bất kỳ cạnh đi ra nào. Các nút nội bộ có hai hoặc nhiều cạnh đi ra nhưng chứa chính xác một cạnh đi vào. Cả nút gốc và nội bộ đều khảo sát các thể hiện dựa trên các thuộc tính và các quy tắc tách. Bộ phân loại này phân tích các hồ sơ chưa biết bằng cách sắp xếp chúng từ nút gốc đến nút lá.

## 2.3.12. K nearest neighbors (KNN)

KNN là một bộ phân loại được dùng rộng rãi thu thập các thể hiện có các đặc tính tương tự trong vùng lân cận của chúng. Thuật toán này được dùng để nhận diện các hồ sơ chưa biết dựa trên nhãn lớp của các thể hiện lân cận. Nó xét một số thể hiện lân cận bằng cách chọn số k và các hồ sơ chưa biết được phân loại một cách phù hợp. Trong số k nhỏ, KNN dễ bị quá khớp do dữ liệu huấn luyện nhiễu. Các thể hiện được xem là các điểm trong không gian n chiều và bị ảnh hưởng trong việc gán nhãn của giá trị k. Các khoảng cách của các thể hiện có thể được thao tác qua nhiều thước đo khác nhau. Vị trí thực tế của các hồ sơ trong không gian n chiều không được xem là vấn đề chính mà là các khoảng cách tương đối. Trong phương pháp này, khoảng cách của các thể hiện tương tự thấp hơn trong khi khoảng cách của các thể hiện lớp khác nhau được xác định là cao hơn.

## 2.3.13. Random forest (RF)

RF [32] là một phương pháp học tập hợp phổ biến được dùng cho phân loại, hồi quy, và các nhiệm vụ khác. Kỹ thuật này tạo nên một số cây quyết định để giải quyết một bài toán cụ thể. Trong một cây quyết định tổng quát, RF chọn ngẫu nhiên các nút riêng lẻ bằng các phép tách tốt nhất thứ /u1D45B và xây dựng các cây từ một tập con khác nhau của một nút. Sau đó, một mẫu kiểm tra được dự đoán bởi mỗi cây và được tổng hợp để dự đoán nó.

## 2.4. Diễn giải mô hình cho tầm quan trọng đặc trưng

Trong công trình này, nhiều bộ phân loại học máy khác nhau được dùng để phân tích dữ liệu đái tháo đường và xác định các kết quả chính xác hơn để nhận diện bệnh này. Tuy nhiên, cần khám phá thuộc tính/đặc trưng nào có ý nghĩa để suy ra các kết quả này. Có nhiều kỹ thuật như SHAP, Local Interpretable Model-agnostic Explanations (LIME), Kernel SHAP, DeepLIFT, v.v. để diễn giải các đặc trưng của bất kỳ mô hình học máy nào. Trong công trình này, chúng tôi đã dùng mô hình SHAP để có được các hiểu biết và kiến thức Tích cực Tiêu cực về các đặc trưng riêng lẻ của mô hình. Mô hình này được đề xuất bởi Lundberg và Lee [33] , để diễn giải và xếp hạng các đặc trưng khác nhau theo đóng góp của chúng vào việc tạo ra đầu ra. Nó dùng các phương pháp giải thích cục bộ [34] cũng như các quy tắc lý thuyết trò chơi [35] để chọn các đặc trưng và đưa ra quyết định. Đóng góp của mỗi đặc trưng /u1D44E của một mô hình được ký hiệu bởi /u1D719 /u1D44E nơi đầu ra được gán bằng cách tính đóng góp biên của chúng. Gọi /u1D440 là một tập của tất cả các đặc trưng đầu vào nơi các giá trị Shaply được thu được qua nhiều tiên đề khác nhau để phân bổ đóng góp của mỗi đặc trưng và dự đoán đầu ra /u1D453 ( /u1D440 ) , bằng cách tuân theo Phương trình (1) nơi /u1D446 biểu diễn tập các chỉ số khác không trong /u1D466 ′ cũng như /u1D45A biểu diễn số đặc trưng đầu vào.

Hình 2. Ma trận nhầm lẫn.

Một hàm tuyến tính /u1D459 của một biến nhị phân được mô hình hóa bởi một phương pháp gán thuộc tính đặc trưng cộng tính dùng Phương trình (2) sau đây.

Trong Phương trình (2) nói trên, /u1D719 /u1D44E /u1D716 ℝ và /u1D466 ′ /u1D716 {0 , 1} /u1D443 là 1 nếu một đặc trưng có mặt, ngược lại, nó bằng 0.

## 2.5. Thước đo hiệu năng

Các thước đo đánh giá như accuracy, sensitivity, specificity, precision, và AUROC được dùng để xác định khả năng của các bộ phân loại để phát hiện đái tháo đường. Phép đo này được thao tác bằng một ma trận nhầm lẫn vốn là một biểu diễn giống ma trận của lớp được dự đoán so với lớp thực tế. Do đó, một số giá trị ước tính được cung cấp như sau ( Hình 2 ):

- Dương tính thật (TP): Nó ước tính các thể hiện dương tính của lớp được dự đoán nơi lớp thực tế cũng dương tính.
- Âm tính thật (TN): Nó ước tính các thể hiện âm tính của lớp được dự đoán nơi lớp thực tế cũng âm tính.
- Dương tính giả (FP): Nó ước tính các thể hiện dương tính của lớp được dự đoán nơi lớp thực tế âm tính.
- Âm tính giả (FN): Nó ước tính các thể hiện âm tính của lớp được dự đoán nơi lớp thực tế dương tính.

Sau đó, các thước đo đánh giá khác nhau được thao tác được trình bày như sau:

## 2.5.1. Accuracy

Accuracy được dùng để đánh giá hiệu năng của bất kỳ bộ phân loại nào dựa trên các thể hiện được dự đoán đúng so với toàn bộ thể hiện được tính bằng Phương trình (3) .

Khi lớp mất cân bằng, accuracy cao nhất là không đủ để tuyên bố một bộ phân loại là mô hình tốt nhất.

## 2.5.2. Precision

Nó tính tỷ số giữa các giá trị dương tính thật và tất cả các dự đoán dương tính trong Phương trình (4) . Giá trị precision giảm khi mô hình đưa ra nhiều giả định dương tính giả hơn.

## 2.5.3. Recall

Nó tính tỷ số giữa các giá trị dương tính thật và tất cả các giá trị dương tính của bất kỳ mô hình dự đoán nào trong Phương trình (5) .

## 2.5.4. F1-score

F1-score được định nghĩa trong Phương trình (6) là trung bình điều hòa của precision và recall nơi giá trị của F1-score nằm trong khoảng từ 0 đến 1. Giá trị cao hơn của thước đo này được tạo ra cho các giá trị âm tính giả và dương tính giả thấp.

## 2.5.5. Diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (AUROC)

AUROC là một thước đo đánh giá xây dựng một kết quả bằng cách thao tác các tỷ lệ dương tính giả và dương tính thật tương ứng. Giá trị này gần nhất với 1 được xem là một mô hình tốt.

## 3. Kết quả

## 3.1. Huấn luyện và đánh giá mô hình

Chúng tôi đã khảo sát SDHD, PDD, và MDD với 35 bộ phân loại như LR, KNN, SVC, NB, DT, RF, SGD, Perceptron, AdaBoost, XGBoost, PAC, RC, Nu-SVC, LSVC, CCCV, NC, GPC, MNB, CNB, BNB, CategoricalNB, Bagging, ET, GBC, HGBC, OneVSRest, MLP, LP, LS, Stacking, RCCV, LRCV, LDA, QDA, và LGBM bằng các thư viện Scikit learn trong python. Tất cả các thí nghiệm được thực hiện trên Google Colaboratory. Hiệu năng của mỗi bộ phân loại được đánh giá với năm thước đo đánh giá là accuracy, precision, recall, F1-score, và AUROC. Trong trường hợp này, tỷ lệ phép tách huấn luyện và kiểm tra được chọn là 80:20. Kết quả của các thí nghiệm được trình bày trong Bảng 2 .

Trong SDHD, ET vượt trội hơn các bộ phân loại khác nơi nó cho accuracy tốt nhất (97.11%) và một F1-score (98.10%). Nó cũng cho precision tốt (98.52%), recall (97.10%), AUROC (96.67%). Các bộ phân loại khác như SC, RF, LGBM, GBC, Bagging, HGBC, LR, SGD, AdaBoost, và CCCV cung cấp hiệu năng xuất sắc về tất cả các thước đo. Tương tự các bộ phân loại nói trên, XGBoost, DT, LP, LS, SGD, AdaBoost, và GPC cũng hoạt động tốt, nhưng các bộ phân loại này thất bại trong việc nhận diện một số thể hiện đái tháo đường thật là dương tính. Trong PDD, MLP hoạt động tốt nhất về accuracy (96.42%) trong khi các giá trị của các thước đo khác như precision, recall, F1-score, và AUROC được tính lần lượt là 92.50%, 97.37%, 94.87%, và 92.18%. Cùng với sáu bộ phân loại, các bộ phân loại còn lại cho một điểm accuracy trên 90%. Về accuracy, các bộ phân loại tiếp theo tạo ra các kết quả tốt hơn như RF(96.40%), XGBoost (96.40%), SC (95.53%), LGBMC (95.53%), Bagging (94.64%), GBC (94.64%), HGBC (94.64%), LRCV(94.64%), LR (94.60%). Xét về AUROC, ET và LRCV tạo ra các kết quả cao nhất (94.53%). Trong khi đó, QDA đạt được F1-score tốt nhất (94.93%). Cuối cùng, chúng tôi đã khảo sát bộ dữ liệu MDD (xem Bảng 3 nơi bộ dữ liệu này gần như cân bằng, HGBC, và LGBM cho thấy hiệu năng cao nhất (94.90% accuracy, 95.87% precision, 93.00% recall, 94.41% F1-score, và 94.92% AUROC). LGBM cung cấp các kết quả gần như tương tự HGBC với 94.90% accuracy, 95.87% precision, 93.00% recall, 94.41% F1-score, và 94.54% AUROC. Về AUROC, Stacking hoạt động tốt nhất (AUC 95.47%). Do đó, ET và GPC cho thấy hiệu năng tốt hơn các bộ phân loại này. Một số bộ phân loại như LSVC, SGD, NC, SVC, và Perceptron hoạt động kém cho các bộ dữ liệu MDD.

Bảng 2 Kết quả thí nghiệm của bộ dữ liệu Sylhet Diabetes Hospital và bộ dữ liệu prediagnosis diabetes (%)

|                | SDHD     | SDHD      | SDHD   | SDHD     | SDHD   | PDD      | PDD       | PDD    | PDD      | PDD   |
|----------------|----------|-----------|--------|----------|--------|----------|-----------|--------|----------|-------|
| Bộ phân loại   | Accuracy | Precision | Recall | F1-score | AUROC  | Accuracy | Precision | Recall | F1-score | AUROC |
| LR             | 92.30    | 94.02     | 94.02  | 94.02    | 92.75  | 94.60    | 87.10     | 93.10  | 90.00    | 92.68 |
| KNN            | 80.70    | 100.00    | 70.15  | 82.40    | 87.66  | 93.70    | 86.60     | 89.60  | 88.10    | 90.33 |
| SVC            | 64.40    | 64.40     | 100    | 78.30    | 50.00  | 92.80    | 83.80     | 89.60  | 86.60    | 90.33 |
| NB             | 87.50    | 90.90     | 89.50  | 90.20    | 90.26  | 93.70    | 84.30     | 93.10  | 88.50    | 93.35 |
| DT             | 91.30    | 96.70     | 89.50  | 93.02    | 94.71  | 91.90    | 83.30     | 86.20  | 84.70    | 88.39 |
| RF             | 96.15    | 97.01     | 97.01  | 97.01    | 95.82  | 96.40    | 93.10     | 93.10  | 93.10    | 93.94 |
| SGD            | 92.30    | 91.50     | 97.01  | 94.20    | 89.30  | 88.40    | 86.30     | 65.50  | 75.50    | 86.45 |
| Perceptron     | 64.40    | 64.40     | 100    | 78.30    | 89.09  | 88.40    | 83.30     | 68.90  | 75.40    | 87.47 |
| AdaBoost       | 90.40    | 92.50     | 92.50  | 92.50    | 92.49  | 92.80    | 83.90     | 89.60  | 86.60    | 91.50 |
| XGBoost        | 91.30    | 96.70     | 89.50  | 93.02    | 95.82  | 96.40    | 93.10     | 93.10  | 93.10    | 93.35 |
| PAC            | 80.70    | 96.22     | 73.91  | 83.60    | 91.85  | 73.21    | 78.57     | 28.94  | 42.30    | 92.18 |
| RC             | 86.50    | 95.08     | 84.05  | 89.23    | 92.69  | 92.85    | 84.09     | 97.37  | 90.24    | 92.09 |
| Nu-SVC         | 84.60    | 94.90     | 81.16  | 87.50    | 92.75  | 91.96    | 82.22     | 97.37  | 89.15    | 90.33 |
| LSVC           | 83.60    | 83.30     | 94.20  | 88.40    | 90.79  | 79.46    | 62.29     | 100    | 76.76    | 67.65 |
| CCCV           | 90.40    | 94.02     | 91.30  | 92.60    | 91.64  | 93.75    | 86.04     | 97.37  | 91.36    | 93.35 |
| NC             | 58.65    | 77.08     | 53.62  | 63.24    | 61.88  | 91.96    | 82.22     | 97.36  | 89.15    | 90.33 |
| GP             | 89.42    | 98.33     | 85.50  | 91.47    | 94.12  | 91.96    | 83.72     | 94.73  | 88.88    | 89.74 |
| MNB            | 84.61    | 90.77     | 85.50  | 88.07    | 87.46  | 90.17    | 78.72     | 97.36  | 87.05    | 91.00 |
| Complement NB  | 84.61    | 94.91     | 81.15  | 87.50    | 90.21  | 89.28    | 77.08     | 97.36  | 86.04    | 91.00 |
| BNB            | 81.73    | 91.67     | 79.71  | 85.27    | 89.10  | 89.28    | 79.54     | 92.10  | 85.36    | 90.24 |
| Categorical NB | 81.73    | 91.67     | 79.71  | 85.27    | 90.21  | 91.96    | 83.72     | 94.73  | 88.88    | 92.68 |
| Bagging        | 94.23    | 98.46     | 92.75  | 95.52    | 96.93  | 94.64    | 90.00     | 94.73  | 92.30    | 93.36 |
| ET             | 97.11    | 98.52     | 97.10  | 98.10    | 96.67  | 93.75    | 89.74     | 92.10  | 90.90    | 94.53 |
| GBC            | 95.20    | 97.05     | 95.65  | 96.35    | 95.82  | 94.64    | 90.00     | 94.73  | 92.30    | 93.35 |
| HGBC           | 94.23    | 97.01     | 94.20  | 95.60    | 95.82  | 94.64    | 90.00     | 94.73  | 92.30    | 93.35 |
| OVsRC          | 66.34    | 66.34     | 100    | 79.77    | 50.00  | 91.96    | 82.22     | 97.36  | 89.15    | 90.33 |
| MLP            | 88.46    | 93.84     | 88.40  | 91.04    | 88.31  | 96.42    | 92.50     | 97.37  | 94.87    | 92.18 |
| LP             | 91.34    | 98.38     | 88.40  | 93.13    | 93.60  | 91.96    | 83.72     | 94.73  | 88.88    | 89.74 |
| LS             | 91.34    | 98.38     | 88.40  | 93.13    | 92.75  | 91.96    | 83.72     | 94.73  | 88.88    | 89.74 |
| Stacking       | 96.15    | 97.10     | 97.10  | 97.10    | 95.82  | 95.53    | 90.24     | 97.37  | 93.67    | 90.09 |
| RCCV           | 81.73    | 86.44     | 82.26  | 84.30    | 89.36  | 93.75    | 86.04     | 97.37  | 91.36    | 93.94 |
| LRCV           | 88.46    | 86.76     | 95.16  | 90.76    | 92.75  | 94.64    | 88.09     | 97.37  | 92.50    | 94.53 |
| LDA            | 82.70    | 87.93     | 82.25  | 85.00    | 92.69  | 92.85    | 84.09     | 97.36  | 90.24    | 92.09 |
| QDA            | 87.50    | 84.50     | 96.77  | 90.22    | 93.33  | 90.17    | 78.72     | 97.37  | 94.93    | 93.35 |
| LGBM           | 96.15    | 96.77     | 96.77  | 96.77    | 95.82  | 95.53    | 92.30     | 94.73  | 93.50    | 93.35 |

Bên cạnh đó, các kết cục của 35 mô hình được so sánh về accuracy, F1-score, và AUROC cho ba bộ dữ liệu được mô tả trong Hình 3 , 4 , và 5 tương ứng. Quan sát thấy rằng LGBMC, SC, HGBC, RF, ET, Bagging, và GBC cung cấp hiệu năng trung bình và ổn định cho tất cả các bộ dữ liệu.

## 3.2. Tầm quan trọng đặc trưng dùng các giá trị SHAP

Chúng tôi đã dùng giá trị SHAP để diễn giải các kết cục của mô hình tốt nhất trong mỗi bộ dữ liệu. Các hiểu biết về đóng góp đặc trưng của đầu ra MLP được mô tả trong Hình 6 a nơi trục X ký hiệu các giá trị Shap và trục y chứa các đặc trưng. Màu sắc chỉ các giá trị thấp hơn và cao hơn cho mỗi quan sát của đặc trưng. Tím chỉ các giá trị đặc trưng cao hơn trong khi xanh dương chỉ các giá trị đặc trưng thấp hơn. Màu tím ở bên trái và bên phải của đồ thị lần lượt nghĩa là tương quan âm và dương với dự đoán đái tháo đường. Sau khi phân tích Hình 6 a, có thể nói rằng tuổi có một tác động lớn hơn lên đầu ra MLP, theo sau là delayed healing và polyphagia. Các giá trị SHAP lệch ký hiệu các đặc trưng quan trọng nhất. Tuy nhiên, các giá trị SHAP tuyệt đối trung bình được trình bày trong Hình 6 b chứng minh tầm quan trọng đặc trưng từ MLP theo thứ tự giảm dần và chúng tôi kết luận rằng age, delayed healing, polyphagia, polyuria, irritability có một tác động lớn lên các kết quả theo sau bởi parental diabetes mellitus, high blood pressure, muscle stiffness, smoking, và weakness. Mặt khác, partial paresis, polydipsia, blurred vision, itching, sudden weight loss, weight, alopecia, và gender có tác động ít hơn lên đầu ra.

Hình 7 a và 7 b cho thấy các đồ thị SHAP cho ET trong trường hợp SDHD. Thấy rằng polyuria là đặc trưng có ảnh hưởng cao nhất lên đầu ra, theo sau là polydipsia, gender, itching, và sudden weight loss. Giá trị cao hơn của polyuria, polydipsia, sudden weight loss, partial paresis, irritability, visual blurring, và weakness dẫn đến một nguy cơ đái tháo đường cao hơn. Trái lại, giá trị thấp hơn của gender, itching, delayed healing, alopecia, muscle stiffness, age, và obesity gây ra ít nguy cơ đái tháo đường hơn.

Hình 8 a và 8 b cho thấy các đồ thị SHAP của các đặc trưng cho HGBC trong trường hợp MDD. Quan sát thấy rằng age có ảnh hưởng cao nhất lên đầu ra mô hình, theo sau là polyuria, delayed healing, và polyphagia. Giá trị cao hơn của age, polyuria, delayed healing, polyphagia, blurred vision, và sudden weight loss dẫn đến kết quả dương tính của đái tháo đường. Trái lại, giá trị thấp hơn của itching, gender, alopecia, irritability, và weakness gây ra ít nguy cơ đái tháo đường hơn.

## 4. Bàn luận

Nhiều mô hình học máy khác nhau được đề xuất để khám phá và phát hiện đái tháo đường chính xác hơn. Từ các nghiên cứu riêng lẻ, nhiều phương pháp được dùng rộng rãi như ET, MLP, SVM, NB, KNN, LR, LDA, QDA, GPC, RBF, GNB, và DT được dùng để khảo sát bệnh này. Tuy nhiên, được nhận thấy rằng các phương pháp dựa trên học tập hợp như bagging, boosting, decorate cũng như stacking hoạt động tốt hơn các mô hình riêng lẻ trong nhiều công trình. Le và cộng sự [7] đề xuất một phương pháp MLP dựa trên Grey Wolf Optimization (GWO) và Adaptive Particle Swam Optimization (APSO)

Hình 3. So sánh các mô hình về accuracy.

Hình 4. So sánh các mô hình về F1-score.

nơi họ phát hiện các điểm ngoại lai dùng IQR và dùng mô hình được đề xuất cùng với SVM, DT, KNN, NB, RF, LR vào bộ dữ liệu đái tháo đường SDHD. Trong trường hợp này, MLP dựa trên APGWO vượt trội hơn các bộ phân loại khác với accuracy 97%, recall 97%, precision 99%, và F1-score 98%. Chaves và Marques [36] so sánh hiệu năng của NB, NN, AdaBoost, KNN, RF, và SVM cho SDHD nơi NN cho accuracy cao nhất (98.08%), F1-score (0.984), và AUC (0.983) với kiểm định chéo 10 fold.

Yadav và Pal [12] triển khai các kỹ thuật boosting và bagging dùng Decision Table, OneR, và JRIP vào Pima Indians Diabetes Database (PIDD). Trước đó, họ đã quy đổi các giá trị thiếu, thực hiện chuẩn hóa, và dùng phương pháp chi bình phương để tạo ra một tập con đặc trưng. Trong công trình đó, họ đã tìm thấy báo cáo 98% accuracy, 98% precision, 98% recall, và 97% F1-score dùng cách tiếp cận bagging. Islam và cộng sự [14] đã thu thập các hồ sơ bệnh nhân đái tháo đường từ Khulna Diabetes Center, Khulna, Bangladesh, và dùng hai kỹ thuật tập hợp như Diverse Ensemble Creation by Oppositional Relabeling of Artificial Training Examples (DECORATE) [ 37-38 ] và phương pháp bagging trên bộ dữ liệu đó. Tuy nhiên, DECORATE vượt trội hơn kỹ thuật bagging với accuracy cao nhất (98.53%). RF được tìm thấy là một trong những thuật toán bagging hiệu quả để phát hiện bệnh này. Nurjahan và cộng sự [39] dùng DT, KNN, NB, SVM, LR, MLP, và XGB vào nhiều tập con đặc trưng khác nhau của SDHD và PIDD nơi RF cho các kết cục tốt nhất (tức là, 97.5% accuracy, 97.5% f-measure, AUC 99.80%) cho các tập con đặc trưng GRAE. Tuy nhiên, LR cung cấp 77.7% accuracy, 77% f-measure cho IGAE, và AUC 83% cho CSSSE và CAE trong PIDD. Hơn nữa, Islam và cộng sự [6] đã khảo sát SDHD với NB, LR, và RF nơi RF cho thấy accuracy tốt nhất (97.4%) và f-measure (0.974) cho phép tách phần trăm. Oladimeji và cộng sự [40] đã tiền xử lý và cân bằng SDHD dùng Synthetic Minority Oversampling Technique (SMOTE). Sau đó, các tập con đặc trưng Symmetrical Uncert Attribute Evaluator (SU), IGAE, GRAE, và CAE được tạo ra từ bộ dữ liệu đó, và RF, NB, J48, và KNN được áp dụng vào SDHD và các tập con đặc trưng của nó. Do đó, RF cung cấp kết cục tốt nhất với 98.31% Accuracy, 98.30% f-measure, và 99.90 AUROC tương ứng. Shahriare Satu và cộng sự [9] đã triển khai AdaBoost, NB, Bayes net (BN), MLP, LDA, QDA, KNN, sequential minimum optimization (SMO), simple logistic (SL), J48, và RF trên PIDD nơi RF cho thấy accuracy tốt nhất (99.067%), thống kê kappa (98.09%), precision (99.10%), recall(99.10%), f-measure (99.10%), hệ số tương quan Matthews (98.10%), AUROC (99.90%), diện tích dưới đường cong precision-recall (99.90%). Maniruzzaman và cộng sự [41] áp dụng NB, DT, AB, và RF vào bộ dữ liệu National Health and Nutrition Examination Survey(NHANES) nơi RF cho các kết cục tốt nhất gồm 94.25% accuracy, 96.88% f-measure và 95% AUROC. Các thuật toán boosting khác nhau như AdaBoost, MultiBoost, real AdaBoost, Xgboost, GBM, LightGBM, và Catboost cũng cho thấy các kết cục hiệu quả để phát hiện đái tháo đường. Kumar và cộng sự [42] dùng Catboost đạt được 100% accuracy để phát hiện bệnh này. Taser [43] đã triển khai các bộ phân loại dựa trên cây là C4.5, random tree, reduced error pruning tree (REPTree), decision stump, Hoeffding tree, NBTree, và một số cách tiếp cận bagging và boosting dựa trên các bộ phân loại này trên SDHD nơi AdaBoost và bagging với NBTree cho thấy accuracy tốt nhất 98.65%.

Hình 5. So sánh các mô hình về AUROC.

Hình 6. Các đồ thị SHAP trong trường hợp PDD. (a) Tác động tầm quan trọng đặc trưng dùng MLP. Mỗi giá trị được mã hóa màu, màu xanh dương biểu diễn giá trị thấp hơn và màu tím biểu diễn giá trị cao hơn của các thuộc tính. (b) Đồ thị tầm quan trọng đặc trưng cho MLP. (Để diễn giải các tham chiếu về màu sắc trong chú thích hình này, người đọc tham khảo phiên bản web của bài báo.)

Hầu hết các công trình xảy ra dựa trên PIDD vốn chứa dữ liệu từ các bệnh nhân nữ có tuổi trên 21 năm. Rahman và cộng sự [44] đề xuất convolutional long short-term memory dựa trên mạng nơ-ron hồi quy (Conv-LSTM), convolutional neural network (CNN), traditional LSTM (T-LSTM), và CNN-LSTM trên PIDD để phát hiện đái tháo đường. Họ đã dùng thuật toán Boruta cho trích xuất đặc trưng và phương pháp Grid Search để tối ưu hóa các tham số của các bộ phân loại riêng lẻ và Conv-LSTM cho thấy kết quả tốt nhất với 97.26% accuracy. Naz và Ahuja [45] áp dụng DT, ANN, NB, và học sâu (DL) sau khi lấy mẫu PIDD để tạo một bộ dữ liệu cân bằng và dự đoán đái tháo đường. Ngoài ra, Sahoo và cộng sự [19] đã triển khai bảy bộ phân loại như KNN, LR, DT, RF, SVM, MLP, và CNN vào PIDD và CNN cho accuracy cao nhất (93.2%). Trong PIDD, Zhu và cộng sự [46] đã giảm chiều dùng phân tích thành phần chính (PCA) và loại bỏ các điểm ngoại lai dùng k-means, và cuối cùng áp dụng LR (tức là cho 97.40% accuracy) để phát hiện đái tháo đường. Ngoài đó, có một số nghiên cứu nơi các kỹ thuật gần đây đã được dùng để phát hiện đái tháo đường trong các ngày đầu [ 47-50 ].

Nghiên cứu này khám phá nhiều kỹ thuật học máy khác nhau để dự đoán đái tháo đường ở các giai đoạn sớm. Đã không có đủ công trình để khảo sát đái tháo đường ở các quốc gia đang phát triển như Bangladesh. Do đô thị hóa, lối sống của con người đang thay đổi nhanh chóng và hầu hết họ không ưu tiên các thói quen lành mạnh. Do đó, số bệnh nhân đái tháo đường đang tăng làm tăng tốc tỷ lệ tử vong và chi tiêu y tế của các cá nhân. Do thiếu các bộ dữ liệu, phần lớn công trình đã không xảy ra. Do đó, chúng tôi tập trung vào các bệnh nhân đái tháo đường ở những loại vùng như vậy nơi chúng tôi đã thu thập nhiều loại hồ sơ từ các địa điểm khác nhau ở Bangladesh. Hơn nữa, các thể hiện này được thu thập với các câu hỏi rất dễ và bảo mật, do đó các cá nhân thấy tốt hơn để trả lời chính xác. Trong công trình này, chúng tôi đã dùng nhiều mô hình để dự đoán đái tháo đường vốn không xảy ra trong hầu hết các công trình trước đó.

Hình 7. Các đồ thị SHAP trong trường hợp SDHD. (a) Tác động tầm quan trọng đặc trưng dùng ET. Mỗi giá trị được mã hóa màu, màu xanh dương biểu diễn giá trị thấp hơn và màu tím biểu diễn giá trị cao hơn của các thuộc tính. (b) Đồ thị tầm quan trọng đặc trưng cho ET. (Để diễn giải các tham chiếu về màu sắc trong chú thích hình này, người đọc tham khảo phiên bản web của bài báo.)

Hình 8. Các đồ thị SHAP trong trường hợp bộ dữ liệu MDD. (a) Tác động tầm quan trọng đặc trưng dùng HGBC. Mỗi giá trị được mã hóa màu, màu xanh dương biểu diễn giá trị thấp hơn và màu tím biểu diễn giá trị cao hơn của các thuộc tính. (b) Đồ thị tầm quan trọng đặc trưng cho HGBC. (Để diễn giải các tham chiếu về màu sắc trong chú thích hình này, người đọc tham khảo phiên bản web của bài báo.)

Một số công trình đã xảy ra trên SDHD nơi một phân tích so sánh với một số trong số chúng được mô tả trong Hình 9 . Quan sát thấy rằng mô hình được đề xuất cung cấp các kết quả tốt hơn khi xét SDHD [7,5153] . Cuối cùng, chúng tôi đã diễn giải các kết quả được dự đoán của các mô hình này bằng cách phân tích các giá trị SHAP và ảnh hưởng của mỗi đặc trưng đã được nhận diện một cách trực quan hơn. Trong công trình này, chúng tôi đã tạo ra ba bộ dữ liệu riêng biệt nơi các bộ phân loại khác nhau cung cấp một số kết quả quá khớp cho SDHD (Xem Bảng 2 ). Do đó, chúng tôi đã thu thập thêm các hồ sơ dùng bảng câu hỏi gần như tương tự của SDHD nơi các bộ phân loại khác nhau cho thấy các kết quả ổn định hơn cho PDD. Bên cạnh đó, các bộ phân loại riêng lẻ cũng cho các kết quả ổn định hơn SDHD. Do đó, chúng tôi có thể giảm vấn đề quá khớp của SDHD trong công trình này. Một lần nữa, chúng tôi đã diễn giải các kết quả tốt nhất cho các bộ dữ liệu riêng lẻ dùng phương pháp SHAP nơi các yếu tố nguy cơ khác nhau được xác định vốn chịu trách nhiệm cao cho việc xảy ra đái tháo đường. Trong trường hợp này, age, polyuria, polyphagia, delayed healing, và irritability được tìm thấy là các yếu tố nguy hiểm nhất cho việc xảy ra đái tháo đường. Mặt khác, gender, itching, alopecia, và weakness có thể được xem là các yếu tố nguy cơ ít hơn của việc xảy ra đái tháo đường. Do đó, phân tích này đã giúp các bác sĩ phát hiện đái tháo đường hiệu quả hơn dựa trên các yếu tố này. Do các yếu tố này, các cá nhân đang cẩn thận hơn về các yếu tố này và dẫn dắt các lối sống lành mạnh để bảo vệ chống lại bệnh này. Có một số điểm cần xét như số mẫu dữ liệu thấp, không có phương pháp kiểm định nào được dùng, và hiệu năng của mô hình dự đoán không được kiểm chứng dùng các nguồn dữ liệu bên ngoài.

Bảng 3 Kết quả thí nghiệm của MDD (%)

| Bộ phân loại   |   Accuracy |   Precision |   Recall |   F1-score |   AUROC |
|----------------|------------|-------------|----------|------------|---------|
| LR             |      87.50 |       86.60 |    83.80 |      85.20 |   88.65 |
| KNN            |      85.20 |       83.50 |    81.70 |      82.60 |   89.89 |
| SVC            |      72.70 |       63.50 |    86.02 |      73.06 |   80.60 |
| NB             |      83.30 |       79.40 |    82.80 |      81.05 |   84.07 |
| DT             |      91.60 |       87.10 |    94.60 |      90.70 |   93.55 |
| RF             |      92.10 |       88.00 |    94.60 |      91.20 |   94.11 |
| SGD            |      76.80 |       67.70 |    88.20 |      76.60 |   85.09 |
| Perceptron     |      63.40 |       88.90 |    17.20 |      28.80 |   69.07 |
| AdaBoost       |      87.50 |       87.50 |    82.80 |      85.08 |   91.81 |
| XGBoost        |      86.50 |       84.80 |    83.90 |      84.30 |   92.31 |
| PAC            |      83.79 |       91.14 |    72.00 |      80.44 |   85.16 |
| RC             |      87.03 |       91.86 |    79.00 |      84.94 |   87.34 |
| Nu-SVC         |      81.48 |       73.80 |    93.00 |      82.30 |   83.52 |
| LSVC           |      80.55 |       95.31 |    61.00 |      74.39 |   83.96 |
| CCCV           |      87.96 |       90.21 |    83.00 |      86.46 |   90.07 |
| NC             |      75.92 |       71.81 |    79.00 |      75.24 |   76.44 |
| GP             |      93.05 |       92.07 |    93.00 |      92.53 |   89.71 |
| MNB            |      82.41 |       82.98 |    78.00 |      80.41 |   82.02 |
| Complement NB  |      83.33 |       83.33 |    80.00 |      81.63 |   81.03 |
| BNB            |      81.94 |       82.79 |    77.00 |      79.79 |   81.34 |
| Categorical NB |      86.57 |       87.36 |    83.00 |      85.12 |   85.45 |
| Bagging        |      92.59 |       94.68 |    89.00 |      91.75 |   92.80 |
| ET             |      93.05 |       93.81 |    91.00 |      92.38 |   93.18 |
| GBC            |      91.66 |       93.61 |    88.00 |      90.72 |   92.25 |
| HGBC           |      94.90 |       95.87 |    93.00 |      94.41 |   94.92 |
| OVsRC          |      79.16 |       72.00 |    90.00 |      79.99 |   80.60 |
| MLP            |      89.35 |       90.52 |    86.00 |      88.20 |   90.88 |
| LP             |      92.13 |       93.68 |    89.00 |      91.28 |   92.56 |
| LS             |      91.66 |       92.70 |    89.00 |      90.81 |   92.07 |
| Stacking       |      93.51 |       93.87 |    92.00 |      92.92 |   95.47 |
| RCCV           |      87.04 |       91.86 |    79.00 |      84.94 |   87.75 |
| LRCV           |      88.42 |       89.47 |    85.00 |      87.17 |   89.58 |
| LDA            |      87.04 |       91.86 |    79.00 |      84.94 |   87.34 |
| QDA            |      91.20 |       89.32 |    92.00 |      90.64 |   88.03 |
| LGBM           |      94.90 |       95.87 |    93.00 |      94.41 |   94.54 |

Hình 9. So sánh với các công trình hiện có.

Tóm lại, chúng tôi đã khảo sát các bộ dữ liệu thô của các quốc gia đang phát triển để phát hiện đái tháo đường ở giai đoạn sớm. Đầu tiên, chúng tôi đã thu thập một số dữ liệu từ kho lưu trữ UCI và tạo ra một bảng câu hỏi trực tiếp dùng các truy vấn tương tự của SDHD và các đặc trưng liên quan khác. Sau đó, bảng câu hỏi này được kiểm định bởi các chuyên gia và chúng tôi đã thu thập các thể hiện từ người dân khắp Bangladesh. Cùng với SDHD, chúng tôi đã tạo ra PDD và MDD để phân tích thêm. Sau đó, chúng tôi đã tiền xử lý các bộ dữ liệu này và áp dụng một số bộ phân loại được dùng trong các bộ dữ liệu này để dự đoán đái tháo đường ở bệnh nhân. Sau đó, hiệu năng của mỗi bộ phân loại tốt nhất được diễn giải bằng cách phân tích các giá trị SHAP. Do đó, chúng tôi đã tìm thấy một số đặc trưng có ý nghĩa vốn chịu trách nhiệm cực kỳ cao cho việc xảy ra đái tháo đường. Chúng tôi cũng đã so sánh công trình này với một số công trình hiện có khác nơi mô hình được đề xuất cho thấy hiệu năng tốt hơn các công trình khác. Nhưng, chúng tôi đã không dùng nhiều thể hiện hơn để khảo sát đái tháo đường và cần nhiều phép đo lâm sàng hơn để khảo sát đái tháo đường. Trong tương lai, chúng tôi sẽ thêm các thể hiện đa dạng hơn làm mẫu và khảo sát giai đoạn sớm của đái tháo đường ở vùng này chính xác hơn. Mặt khác, có một số yếu tố quan trọng khác như thiếu ngủ và tiêu thụ một số thuốc được kê đơn cần được xét để phát hiện. Cuối cùng, chúng tôi sẽ thiết kế một ứng dụng web và di động để cung cấp lợi thế của mô hình học máy dự đoán cho một số lượng lớn người dùng miễn phí.

## Tuyên bố về xung đột lợi ích

Các tác giả tuyên bố rằng không có xung đột lợi ích.

## Tài trợ

Việc thu thập dữ liệu và tiền xử lý dữ liệu của nghiên cứu này được hỗ trợ bởi University Grant Commission, Bangladesh theo giải thưởng nghiên cứu (Award No: 37-01-0000-073-07-016-19/1759).

## Đóng góp của các tác giả

Nurjahan Nipa: Writing - original draft, Writing - review & editing. Mahmudul Hasan Riyad: Investigation. Shahriare Satu: Validation, Writing -review & editing. Walliullah: Investigation. Koushik Chandra Howlader: Data curation. Mohammad Ali Moni: Writing - review & editing.

## Tài liệu tham khảo

- [1] Gogebakan K, Sah M. A review of recent advances for preventing, diagnosis and treatment of diabetes mellitus using semantic web. In: Proceedings of 2021 3rd International congress on human-computer interaction, optimization and robotic applications (HORA). Ankara, Turkey: IEEE; 2021. doi: 10.1109/HORA52670.2021.9461282 .
- [2] John JE, John NA. Imminent risk of COVID-19 in diabetes mellitus and undiagnosed diabetes mellitus patients. Pan Afr Med J 2020;36. doi: 10.11604/pamj.2020.36. 158.24011 .
- [3] Facts &amp; figures. Available from https://idf.org/aboutdiabetes/what-is-diabetes/factsfigures.html .
- [4] Williams R, Karuranga S, Malanda B, et al. Global and regional estimates and projections of diabetes-related health expenditure: results from the international diabetes federation diabetes atlas, 9th edition. Diabetes Res Clin Pract 2020;162:108072. doi: 10.1016/j.diabres.2020.108072 .
- [5] Afroz A, Alam K, Ali L, et al. Type 2 diabetes mellitus in Bangladesh: a prevalence based cost-of-illness study. BMC Health Serv Res 2019;19(1):601. doi: 10.1186/ s12913-019-4440-3 .
- [6] Islam MMF, Ferdousi R, Rahman S, et al. Likelihood prediction of diabetes at early stage using data mining techniques. Computer vision and machine intelligence in medical image analysis, 992. Singapore: Springer Singapore; 2020. p. 113-25. doi: 10.1007/978-981-13-8798-2\_12 .
- [7] Le TM, Vo TM, Pham TM, et al. A novel wrapper based feature selection for early diabetes prediction enhanced with a metaheuristic. IEEE Access 2021;9:7869-84. doi: 10.1109/ACCESS.2020.3047942 .
- [8] Maniruzzaman M, Rahman MJ, Al-MehediHasan M, et al. Accurate diabetes risk stratification using machine learning: role of missing value and outliers. J Med Syst 2018;42(5):92. doi: 10.1007/s10916-018-0940-7 .
- [9] Shahriare Satu M, Atik ST, Moni MA. A novel hybrid machine learning model to predict diabetes mellitus. Proceedings of international joint conference on computational intelligence. Singapore: Springer Singapore; 2020. p. 453-65. doi: 10.1007/978-981-15-3607-6\_36 .
- [10] Geurts P, Ernst D, Wehenkel L. Extremely randomized trees. Mach Learn 2006;63(1):3-42. doi: 10.1007/s10994-006-6226-1 .
- [11] Ishaq A, Sadiq S, Umer M, et al. Improving the prediction of heart failure patients survival using SMOTE and effective data mining techniques. IEEE Access 2021;9:39707-16. doi: 10.1109/ACCESS.2021.3064084 .
- [12] Yadav DC, Pal S. An experimental study of diversity of diabetes disease features by bagging and boosting ensemble method with rule based machine learning classifier algorithms. SN Comput Sci 2021;2(1):50. doi: 10.1007/s42979-020-00446-y .
- [13] Kuo KM, Talley P, Kao Y, et al. A multi-class classification model for supporting the diagnosis of type II diabetes mellitus. PeerJ 2020;8:e9920. doi: 10.7717/peerj.9920 .
- [14] Islam MT, Raihan M, Akash SRI, et al. Diabetes mellitus prediction using ensemble machine learning techniques. Advances in computational intelligence, security and internet of things. Vol, 1192. Singapore: Springer Singapore; 2020. p. 453-67. doi: 10.1007/978-981-15-3666-3\_37 .

- [15] Abbas HT, Alic L, Erraguntla M, et al. Predicting long-term type 2 diabetes with support vector machine using oral glucose tolerance test. PLoS ONE 2019;14(12):e0219636. doi: 10.1371/journal.pone.0219636 .
- [16] Kaur H, Kumari V. Predictive modelling and analytics for diabetes using a machine learning approach. Appl Comput Inf 2020. doi: 10.1016/j.aci.2018.12.004 .
- [17] Yu W, Liu T, Valdez R, et al. Application of support vector machine modeling for prediction of common diseases: the case of diabetes and pre-diabetes. BMC Med Inform Decis Mak 2010;10(1):16. doi: 10.1186/1472-6947-10-16 .
- [18] Hasan MK, Alam MA, Das D, et al. Diabetes prediction using ensembling of different machine learning classifiers. IEEE Access 2020;8:76516-31. doi: 10.1109/ACCESS.2020.2989857 .
- [19] Sahoo AK, Pradhan C, Das H. Performance evaluation of different machine learning methods and deep-learning based convolutional neural network for health decision making. In: Nature inspired computing for data science, Vol. 871. Cham: Springer International Publishing; 2020. p. 201-12. doi: 10.1007/978-3-030-33820-6\_8 .
- [20] Hanbal IF, Ingosan JS, Oyam NAA, et al. Classifying wastes using random forests, gaussian nave bayes, support vector machine and multilayer perceptron. IOP Conf Ser Mater SciEng 2020;803:012017. doi: 10.1088/1757-899X/803/1/012017 .
- [21] Cordeiro LS, Lima JS, Rocha Ribeiro AI, et al. Pill image classification using machine learning. 2019 8th Brazilian conference on intelligent systems (BRACIS). Salvador, Brazil: IEEE; 2019. p. 556-61. doi: 10.1109/BRACIS.2019.00103 .
- [22] Chen T, Guestrin C. XGBoost: a scalable tree boosting system. In: Proceedings of the 22nd ACM SIGKDD international conference on knowledge discovery and data mining. San Francisco California USA: ACM; 2016. p. 785-94. doi: 10. 1145/2939672.2939785 .
- [23] Athanasiou M, Sfrintzeri K, Zarkogianni K, et al. An explainable XGBoost based approach towards assessing the risk of cardiovascular disease in patients with Type 2 diabetes mellitus. Cincinnati, OH, USA: IEEE; 2020. p. 859-64. doi: 10.1109/BIBE50027.2020.00146 .
- [24] Wang L, Wang X, Chen A, et al. Prediction of type 2 diabetes risk and its effect evaluation based on the XGBoost model. Healthcare 2020;8(3):247. doi: 10.3390/healthcare8030247 .
- [25] Rashed-Al-Mahfuz M, Haque A, Azad A, et al. Clinically applicable machine learning approaches to identify attributes of chronic kidney disease (CKD) for use in low-cost diagnostic screening. IEEE J Transl Eng Health Med 2021;9:1-11. doi: 10.1109/JTEHM.2021.3073629 .
- [26] Kopitar L, Kocbek P, Cilar L, et al. Early detection of type 2 diabetes mellitus using machine learning-based prediction models. Sci Rep 2020;10(1):11981. doi: 10.1038/s41598-020-68771-z .
- [27] Friedman JH. Greedy function approximation: a gradient boosting machine. Ann Stat 2001;29(5). doi: 10.1214/aos/1013203451 .
- [28] Ghosh P, Azam S, Jonkman M, et al. Efficient prediction of cardiovascular disease using machine learning algorithms with relief and LASSO feature selection techniques. IEEE Access 2021;9:19304-26. doi: 10.1109/ACCESS.2021.3053759 .
- [29] Ke G, Meng Q, Finley T, et al. LightGBM: a highly efficient gradient boosting decision tree. Adv Neural Inf Process Syst 2017;30:3146-54 .
- [30] Shobana G, Umamaheswari K. Prediction of liver disease using gradient boost machine learning techniques with feature scaling. Erode, India: IEEE; 2021. p. 1223-9. doi: 10.1109/ICCMC51019.2021.9418333 .
- [31] Singh N, Singh P. A stacked generalization approach for diagnosis and prediction of type 2 diabetes mellitus. Advances in intelligent systems and computing. Singapore: Springer; 2020. p. 559-70. doi: 10.1007/978-981-13-8676-3\_47 .
- [32] Breiman L. Random forests. Mach Learn 2001;45(1):5-32. doi: 10.1023/A: 1010933404324 .
- [33] Lundberg SM, Lee SI. A unified approach to interpreting model predictions. Advances in neural information processing systems, Vol 30. Curran Associates, Inc; 2017 .
- [34] Ribeiro MT, Singh S, Guestrin C. 'Why should i trust you? ': Explaining the predictions of any classifier. Proceedings of the 22nd ACM SIGKDD international

conference on knowledge discovery and data mining. San Francisco California USA: ACM; 2016. p. 1135-44. doi: 10.1145/2939672.2939778 .

- [35] Trumbelj E, Kononenko I. Explaining prediction models and individual predictions with feature contributions. Knowl Inf Syst 2014;41(3):647-65. doi: 10.1007/ s10115-013-0679-x .
- [36] Chaves L, Marques G. Data mining techniques for early diagnosis of diabetes: a comparative study. Appl Sci 2021;11(5):2218. doi: 10.3390/app11052218 .
- [37] Melville P, Mooney RJ. Constructing diverse classifier ensembles using artificial training examples. Eighteenth international joint conference on artificial intelligence; 2003. p. 505-10 .
- [38] Melville P, Mooney RJ. Creating diversity in ensembles using artificial data. Inf Fusion Special Issue on Diversity in Multiclassifier Syst 2004 .
- [39] Nurjahan, Rony MAT, Satu MS, et al. Mining significant features of diabetes through employing various classification methods. Dhaka, Bangladesh: IEEE; 2021. p. 240-4. doi: 10.1109/ICICT4SD50815.2021.9397006 .
- [40] Oladimeji OO, Oladimeji A, Oladimeji O. Classification models for likelihood prediction of diabetes at early stage using feature selection. Appl Comput Inf 2021. doi: 10.1108/ACI-01-2021-0022 .
- [41] Maniruzzaman M, Rahman MJ, Ahammed B, et al. Classification and prediction of diabetes disease using machine learning paradigm. Health Inf Sci Syst 2020;8(1):7. doi: 10.1007/s13755-019-0095-z .
- [42] Kumar PS, K AK, Mohapatra S, et al. CatBoost ensemble approach for diabetes risk prediction at early stages. Bhubaneswar, India: IEEE; 2021. p. 1-6. doi: 10.1109/ODICON50556.2021.9428943 .
- [43] Taser PY. Application of bagging and boosting approaches using decision tree-based algorithms in diabetes risk prediction. Proceedings 2021;74(1):6. doi: 10.3390/proceedings2021074006 .
- [44] Rahman M, Islam D, Mukti RJ, et al. A deep learning approach based on convolutional LSTM for detecting diabetes. Comput Biol Chem 2020;88:107329. doi: 10.1016/j.compbiolchem.2020.107329 .
- [45] Naz H, Ahuja S. Deep learning approach for diabetes prediction using PIMA Indian dataset. J Diabetes Metab Disord 2020;19(1):391-403. doi: 10.1007/ s40200-020-00520-5 .
- [46] Zhu C, Idemudia CU, Feng W. Improved logistic regression model for diabetes prediction by integrating PCA and K-means techniques. Inf Med Unlocked 2019;17:100179. doi: 10.1016/j.imu.2019.100179 .
- [47] Hazarika BB, Gupta D. Random vector functional link with /u1D700 -insensitive Huber loss function for biomedical data classification. Comput Methods Programs Biomed 2022;215:106622. doi: 10.1016/j.cmpb.2022.106622 .
- [48] Gupta D, Choudhury A, Gupta U, et al. Computational approach to clinical diagnosis of diabetes disease: a comparative study. Multimed Tools Appl 2021;80(20):30091116. doi: 10.1007/s11042-020-10242-8 .
- [49] Gupta D, Borah P, Sharma UM, et al. Data-driven mechanism based on fuzzy Lagrangian twin parametric-margin support vector machine for biomedical data analysis. Neural Comput Appl 2022;34(14):11335-45. doi: 10.1007/s00521021-05866-2 .
- [50] Kalita J, Balas VE, Borah S, et al. Recent developments in machine learning and data analytics: IC3 2018 Advances in intelligent systems and computing, 740. Singapore: Springer Singapore; 2019. doi: 101007/978-981-13-1280-9 .
- [51] Ma J. Machine learning in predicting diabetes in the early stage. Proceedings of 2020 2nd International conference on machine learning, big data and business intelligence (MLBDBI). Taiyuan, China: IEEE; 2020. p. 167-72. doi: 10.1109/MLBDBI51377.2020.00037 .
- [52] Permana BAC, Ahmad R, Bahtiar H, et al. Classification of diabetes disease using decision tree algorithm (C4.5). J Phys Conf Ser 2021;1869(1):012082. doi: 10.1088/1742-6596/1869/1/012082 .
- [53] Xue J, Min F, Ma F. Research on diabetes prediction method based on machine learning. J Phys Conf Ser 2020;1684:012062. doi: 10.1088/1742-6596/1684/1/012062 .
