<!-- extracted by pdf-extract | engine=docling | pages=14 | ocr=False | tables=3/3 | density=1.23 | score=100 -->

Bài báo

## Dự đoán Đái tháo đường Type 2 dựa trên Thuật toán Học máy

Henock M. Deberneh and Intaek Kim *

Department of Information and Communications Engineering, Myongji University, 116 Myongji-ro, Yongin,

Gyeonggi 17058, Korea; henockmamo54@gmail.com

* Liên hệ: kit@mju.ac.kr; Tel.: +82-10-4206-0879

Tóm tắt: Dự đoán sự xuất hiện của đái tháo đường type 2 (T2D) cho phép một người có nguy cơ thực hiện các hành động có thể ngăn ngừa khởi phát hoặc làm chậm tiến triển của bệnh. Trong nghiên cứu này, chúng tôi đã phát triển một mô hình học máy (ML) để dự đoán sự xuất hiện T2D trong năm tiếp theo (Y + 1) bằng cách dùng các biến trong năm hiện tại (Y). Bộ dữ liệu cho nghiên cứu này được thu thập tại một cơ sở y tế tư nhân dưới dạng hồ sơ sức khỏe điện tử từ 2013 đến 2018. Để xây dựng mô hình dự đoán, các đặc trưng then chốt được lựa chọn trước tiên bằng kiểm định ANOVA, kiểm định chi bình phương (chi-squared), và phương pháp loại bỏ đặc trưng đệ quy (recursive feature elimination). Các đặc trưng thu được là đường huyết tương lúc đói (FPG), HbA1c, triglyceride, BMI, gamma-GTP, tuổi, axit uric, giới tính, hút thuốc, uống rượu, hoạt động thể chất, và tiền sử gia đình. Sau đó chúng tôi sử dụng hồi quy logistic, rừng ngẫu nhiên, máy vector hỗ trợ, XGBoost, và các thuật toán học máy tập hợp (ensemble) dựa trên các biến này để dự đoán kết quả là bình thường (không đái tháo đường), tiền đái tháo đường (prediabetes), hoặc đái tháo đường. Dựa trên các kết quả thực nghiệm, hiệu năng của mô hình dự đoán được chứng minh là khá tốt trong việc dự báo sự xuất hiện của T2D ở quần thể Hàn Quốc. Mô hình có thể cung cấp cho các bác sĩ lâm sàng và bệnh nhân thông tin dự đoán giá trị về khả năng phát triển T2D. Các kết quả kiểm định chéo (CV) cho thấy các mô hình tập hợp có hiệu năng vượt trội so với các mô hình đơn lẻ. Hiệu năng CV của các mô hình dự đoán được cải thiện bằng cách kết hợp thêm tiền sử y tế từ bộ dữ liệu.

Từ khóa: đái tháo đường type 2 (type 2 diabetes); học máy (machine learning); dự đoán (prediction)

## 1. Giới thiệu

Đái tháo đường là một rối loạn chuyển hóa mạn tính được nhận diện bởi mức đường huyết bất thường, gây ra bởi việc sử dụng insulin không hiệu quả hoặc sản xuất insulin không đủ [1]. Tỷ lệ hiện mắc đái tháo đường năm 2010 được ước tính là 285 triệu người trên toàn thế giới (6.4% người trưởng thành). Đến năm 2030, con số đó dự kiến tăng lên 552 triệu [2]. Dựa trên tốc độ tăng trưởng hiện tại của bệnh, vào năm 2040, có thể dự kiến cứ mười người trưởng thành thì có một người mắc đái tháo đường [3]. Tỷ lệ hiện mắc đái tháo đường ở Hàn Quốc cũng đã tăng đáng kể; các nghiên cứu gần đây cho thấy 13.7% tổng số người trưởng thành Hàn Quốc mắc đái tháo đường, và gần một phần tư mắc tiền đái tháo đường [4].

Vì những người mắc đái tháo đường thường thiếu hiểu biết về bệnh hoặc bản thân không có triệu chứng, đái tháo đường thường không được phát hiện; gần một phần ba bệnh nhân đái tháo đường không nhận biết được tình trạng của mình [5]. Đái tháo đường không được kiểm soát dẫn đến tổn thương nghiêm trọng lâu dài cho nhiều cơ quan và hệ thống cơ thể, gồm thận, tim, thần kinh, mạch máu, và mắt [1]. Do đó, phát hiện sớm bệnh cho phép những người có nguy cơ thực hiện hành động phòng ngừa để ức chế tiến triển của bệnh và cải thiện chất lượng cuộc sống [6].

Để giảm tác động của đái tháo đường và cải thiện chất lượng chăm sóc bệnh nhân, nghiên cứu đã được tiến hành trong nhiều lĩnh vực khác nhau, gồm học máy (ML) và trí tuệ nhân tạo (AI) [3,7,8]. Các phương pháp dựa trên ML để dự đoán sự xuất hiện đái tháo đường đã được báo cáo trong nhiều nghiên cứu [3,9-11]. Các phương pháp này có hai loại: nhận diện tình trạng hiện tại (sàng lọc, chẩn đoán) và các cách tiếp cận dự đoán tiến (forward prediction). Các phương pháp nhận diện tình trạng hiện tại xử lý việc phân loại các thể hiện dữ liệu hiện tại; các phương pháp dự đoán tiến

/gid00001

Trích dẫn: Deberneh, H.M.; Kim, I. Prediction of Type 2 Diabetes Based on Machine Learning Algorithm. Int. J. Environ. Res. Public Health 2021 , 18 , 3317. https://doi.org/10.3390/ ijerph18063317

Biên tập viên học thuật: Giuseppe Banfi

Nhận: 2 February 2021

Chấp nhận: 17 March 2021

Xuất bản: 23 March 2021

Ghi chú của Nhà xuất bản: MDPI giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã công bố và liên kết thể chế.

Bản quyền: © 2021 bởi các tác giả. Người được cấp phép MDPI, Basel, Switzerland. Bài báo này là một bài báo truy cập mở được phân phối theo các điều khoản và điều kiện của giấy phép Creative Commons Attribution (CC BY) (https:// creativecommons.org/licenses/by/ 4.0/).

dự báo tỷ lệ mới mắc đái tháo đường trước thời điểm bằng cách dùng các hồ sơ y tế hiện tại và trước đó [12].

Trong nghiên cứu này, chúng tôi nhắm tới phát triển một mô hình học máy (ML) để dự đoán sự xuất hiện đái tháo đường type 2 (T2D) trong năm tiếp theo (Y+1) bằng cách dùng các giá trị đặc trưng trong năm hiện tại (Y). Các mô hình dự đoán nhóm thể hiện dữ liệu đầu vào vào tình trạng được chỉ định: bình thường (không đái tháo đường), tiền đái tháo đường, hoặc đái tháo đường. Để xây dựng mô hình dự đoán, các đặc trưng then chốt được lựa chọn trước tiên bằng một kỹ thuật lựa chọn đặc trưng hướng-dữ-liệu gồm kiểm định phân tích phương sai (ANOVA), kiểm định chi bình phương, và các phương pháp loại bỏ đặc trưng đệ quy. Chúng tôi đã so sánh hiệu năng của các mô hình dự đoán - hồi quy logistic (LR), máy vector hỗ trợ (SVM), rừng ngẫu nhiên (RF), và thuật toán XGBoost. Chúng tôi cũng dùng các kỹ thuật tập hợp như cách tiếp cận tích hợp bộ phân loại dựa trên ma trận nhầm lẫn (CIM), bỏ phiếu mềm (soft voting), và các phương pháp xếp chồng bộ phân loại (classifier stacking) và so sánh hiệu năng với các mô hình đơn lẻ [13-19].

## 2. Bối cảnh

## 2.1. Các công trình liên quan

Sự sẵn có của các bộ sưu tập hồ sơ y tế điện tử lớn được biên soạn từ nhiều cơ sở y tế cung cấp một cơ hội trong các xu hướng ML và AI hiện tại để cách mạng hóa các hệ thống chẩn đoán [12]. Mặc dù có một số hạn chế trong việc báo cáo và diễn giải hiệu năng của các cách tiếp cận này, khả năng chẩn đoán của chúng tương tự như của các chuyên gia y tế. Các chuyên gia về những kỹ thuật này có thể giúp các bác sĩ lâm sàng hiểu dữ liệu nào là tối ưu để giải quyết các bài toán mục tiêu, như các nhiệm vụ sàng lọc và dự báo, và dữ liệu đó có thể thu được như thế nào và khi nào [12,20].

Để tạo thuận lợi cho phát hiện sớm T2D, nhiều nghiên cứu sử dụng các kỹ thuật ML đã được tiến hành. Các nghiên cứu này gồm việc phát triển các công cụ sàng lọc, chẩn đoán, và dự đoán để phát hiện sự xuất hiện của bệnh và khả năng khởi phát của nó [5,21]. Các phương pháp sàng lọc tiền đái tháo đường dùng các mô hình ML cho quần thể Hàn Quốc được trình bày trong [5], nghiên cứu này đã phát triển một mô hình sàng lọc dựa trên trí tuệ cho tiền đái tháo đường bằng một bộ dữ liệu từ Khảo sát Kiểm tra Sức khỏe và Dinh dưỡng Quốc gia Hàn Quốc (KNHANES) [22]. Bộ dữ liệu KNHANES 2010, với 4685 thể hiện, được dùng để huấn luyện các mô hình dựa trên SVM và mạng nơ-ron nhân tạo (ANN), và bộ dữ liệu KNHANES 2011 được dùng để kiểm định. Các tác giả tuyên bố rằng mô hình SVM hoạt động tốt hơn mô hình ANN, với giá trị diện tích dưới đường cong (AUC) là 0.73. Nghiên cứu chỉ giới hạn ở việc nhận diện một tình trạng tiền đái tháo đường.

Một mô hình để dự đoán khởi phát đái tháo đường type 2 ở bệnh nhân không đái tháo đường có bệnh tim mạch được trình bày trong [21]. Nghiên cứu đã báo cáo một mô hình dự đoán T2D để dự báo sự xuất hiện của bệnh trong giai đoạn theo dõi. Các hồ sơ sức khỏe điện tử (EHR) cho nghiên cứu được thu thập từ Bệnh viện Guro Đại học Hàn Quốc (KUGH). Tổng số đặc trưng là 28, với 8454 đối tượng trong hơn năm năm theo dõi. Các tác giả tuyên bố rằng họ đã đạt được giá trị 78.0 ở thước đo AUC cho mô hình hồi quy logistic (LR). Trong nghiên cứu này, bộ dữ liệu chỉ bao gồm các cá nhân có nguy cơ tim mạch.

Một nghiên cứu toàn diện về các kỹ thuật học máy để nhận diện đái tháo đường được trình bày trong [23]. Nghiên cứu đã phân tích hai bộ xử lý dữ liệu thiết yếu: PCA (Phân tích Thành phần Chính) và LDA (Phân tích Phân biệt Tuyến tính) cho nhiều thuật toán học máy khác nhau. Qua một thí nghiệm, họ đã xác định bộ tiền xử lý dữ liệu tốt nhất cho mỗi thuật toán và tiến hành tinh chỉnh tham số để tìm hiệu năng tối ưu. Bộ dữ liệu Pima Indian được dùng để kiểm tra hiệu năng của các thuật toán. Độ chính xác cao nhất thu được trong số năm thuật toán được dùng (mạng nơ-ron, Máy vector hỗ trợ, Cây quyết định, Hồi quy logistic, và Naïve Bayes) là 77.86% khi dùng kiểm định chéo 10-fold.

Các thuật toán học máy cũng đã được dùng để chẩn đoán các loại bệnh mạn tính khác. Nghiên cứu được trình bày trong [24] đã dùng các thuật toán ML để dự đoán thành công điều trị trong một cohort hen suyễn nhi khoa. Nghiên cứu đã dự đoán kết quả điều trị ở trẻ em mắc hen suyễn từ nhẹ đến nặng, dựa trên các thay đổi về kiểm soát hen suyễn, chức năng phổi, và các giá trị nitric oxide thở ra phân đoạn (FENO) sau sáu tháng dùng thuốc kiểm soát. Các khả năng dự đoán được kiểm tra bằng các thuật toán học máy Rừng ngẫu nhiên (RF) và Adaptive Boosting (AdaBoost). Các kết quả của nghiên cứu này sẽ giúp tạo điều kiện tối ưu hóa điều trị và triển khai khái niệm y học chính xác trong điều trị hen suyễn nhi khoa.

## 2.2. Đái tháo đường Type 2 (T2D)

Đái tháo đường là một nhóm bất thường chuyển hóa được nhận diện bởi tăng đường huyết do các khiếm khuyết trong tiết insulin, tác động của insulin, hoặc cả hai [1]. Theo hướng dẫn của Hiệp hội Đái tháo đường Hoa Kỳ (ADA), T2D được định nghĩa bởi mức đường huyết tương lúc đói (FPG) trên 125 mg/dL; khoảng bình thường (không đái tháo đường) là dưới 100 mg/dL [25]. Nó bị ảnh hưởng mạnh bởi các hoạt động lối sống, như uống rượu, tập thể dục, và thói quen ăn uống. T2D làm giảm chất lượng cuộc sống và hạ tuổi thọ. Một số nghiên cứu đã cho thấy rằng sự kết hợp giữa cải thiện lối sống và can thiệp bằng thuốc có thể ngăn ngừa các biến chứng từ bệnh. Do đó, cả chẩn đoán sớm và điều trị T2D đều then chốt trong việc ngăn ngừa các biến chứng nghiêm trọng và có khả năng đe dọa tính mạng ở bệnh nhân [21]. Trong nghiên cứu này, T2D được chẩn đoán theo hướng dẫn của ADA. T2D được định nghĩa bởi mức FPG trên 125 mg/dl; khoảng bình thường là dưới 100 mg/dL và giữa 100 và 125 mg/dL được xem là tiền đái tháo đường.

## 2.3. Các kỹ thuật lựa chọn đặc trưng

Lựa chọn đặc trưng là quá trình lựa chọn một tập con các đặc trưng liên quan nhất trong bộ dữ liệu để mô tả biến mục tiêu. Nó cải thiện thời gian tính toán, hiệu năng tổng quát hóa, và các vấn đề diễn giải trong các bài toán ML [26,27]. Các kỹ thuật lựa chọn đặc trưng được phân loại thành loại dựa trên lọc (filter), dựa trên bao bọc (wrapper), và loại nhúng (embedded). Các kỹ thuật dựa trên lọc sàng lọc các đặc trưng dựa trên một số tiêu chí được chỉ định. Các phương pháp dựa trên bao bọc dùng một thuật toán mô hình hóa được xem như một hộp đen để đánh giá và xếp hạng các đặc trưng. Các phương pháp nhúng có các cách tiếp cận lựa chọn đặc trưng tích hợp sẵn như toán tử co rút và lựa chọn tuyệt đối nhỏ nhất (Lasso) và các phương pháp lựa chọn đặc trưng rừng ngẫu nhiên (RF) [28]. Có một số loại kỹ thuật lựa chọn đặc trưng, gồm tìm kiếm vét cạn, kỹ thuật tương quan Pearson, kỹ thuật chi bình phương, loại bỏ đặc trưng đệ quy, Lasso, và các kỹ thuật lựa chọn đặc trưng dựa trên cây. Trong nghiên cứu này, chúng tôi đã dùng một kỹ thuật trích xuất đặc trưng hướng-dữ-liệu, kết hợp kiểm định ANOVA, kiểm định chi bình phương, và một kỹ thuật loại bỏ đặc trưng đệ quy dựa trên cây.

## 2.3.1. Phân tích phương sai

Phân tích phương sai (ANOVA) là một phương pháp thống kê nổi tiếng để xác định liệu có khác biệt về trung bình giữa hai nhóm hay không [29]. Trong nghiên cứu này, kiểm định ANOVA được dùng để lựa chọn các đặc trưng số có ý nghĩa trong việc dự đoán sự xuất hiện của T2D. Kiểm định ANOVA dùng thống kê F để xếp hạng đặc trưng. Giá trị của thống kê F càng lớn thì khả năng phân biệt của đặc trưng càng tốt [30]. Giá trị F được tính như sau:

<!-- formula-not-decoded -->

trong đó SSB (tổng bình phương giữa các nhóm) là biến thiên của các trung bình nhóm so với trung bình tổng quát toàn bộ, và SSW (tổng bình phương trong các nhóm) là tổng các độ lệch bình phương từ các trung bình nhóm và mỗi quan sát. Bậc tự do cho trung bình bình phương giữa và trong lần lượt được định nghĩa bởi df b và dfw [31]. Đối với tất cả các đặc trưng số trong bộ dữ liệu, giá trị F được tính bằng Phương trình (1) và các đặc trưng có giá trị lớn hơn được lựa chọn.

## 2.3.2. Kiểm định chi bình phương

Kiểm định chi bình phương là một phương pháp phân tích thống kê phi tham số. Kỹ thuật này tính giá trị chi bình phương bằng Phương trình (2) và lựa chọn n đặc trưng hàng đầu [32]. Trong công trình này, kiểm định chi bình phương được dùng để xếp hạng các đặc trưng phân loại (categorical) theo mức ý nghĩa của chúng trong việc nhận diện lớp mục tiêu. Phương trình (2) được biểu diễn là

<!-- formula-not-decoded -->

trong đó xi là các tần số quan sát, Ei là các tần số kỳ vọng, và n là số hạng mục trong bảng tiếp liên (contingency table). Đối với tất cả các đặc trưng phân loại trong bộ dữ liệu, giá trị chi bình phương được tính bằng Phương trình (1) và các đặc trưng có giá trị lớn hơn được lựa chọn.

## 2.3.3. Loại bỏ đặc trưng đệ quy

Loại bỏ đặc trưng đệ quy (RFE) là một thủ tục đệ quy để lựa chọn các đặc trưng theo độ chính xác của mô hình. Thước đo xác định khả năng phân biệt của các đặc trưng. Ở mỗi lần lặp, thước đo điểm xếp hạng được tính, và các đặc trưng xếp hạng thấp bị loại bỏ. Thủ tục đệ quy được lặp lại cho đến khi đạt được số đặc trưng mong muốn [33-35]. Trong nghiên cứu này, RFE được dùng làm giai đoạn cuối của thủ tục lựa chọn đặc trưng. Chi tiết của thủ tục lựa chọn đặc trưng được trình bày trong Mục 3.2.

## 3. Phương pháp

Mục này mô tả các phương pháp được dùng để phát triển một mô hình dự đoán nhằm dự báo sự xuất hiện của T2D trong năm tiếp theo. Để tạo ra mô hình, các thủ tục tiền xử lý dữ liệu, lựa chọn đặc trưng, tinh chỉnh siêu tham số (hyperparameter), huấn luyện, kiểm tra, và đánh giá mô hình đã được thực hiện.

## 3.1. Bộ dữ liệu

Bộ dữ liệu được dùng trong nghiên cứu này là một hồ sơ y tế điện tử sáu năm được thu thập từ 2013 đến 2018 tại một cơ sở y tế tư nhân tên là Hanaro Medical foundation ở Seoul, Hàn Quốc. Nó có 535,169 thể hiện được thu thập từ 253,395 đối tượng và mỗi thể hiện có 1444 đặc trưng. Các đối tượng trong bộ dữ liệu được đưa vào bộ dữ liệu không có bất kỳ hạn chế nào về nghề nghiệp, giới tính, hay giới. Để bảo vệ quyền riêng tư, bộ dữ liệu không chứa bất kỳ dữ liệu cá nhân nào, gồm tên đối tượng và thông tin nhận dạng cá nhân. Tuổi trung bình của các đối tượng là 41.2, với khoảng tuổi 18-108 và tỷ lệ giới tính (nam/nữ) là 1.25. Các giá trị đặc trưng trong bộ dữ liệu là sự kết hợp của xét nghiệm máu (xét nghiệm sinh hóa), các phép đo nhân trắc học, và các kết quả chẩn đoán khác. Ngoài ra, nó chứa một bảng câu hỏi được bệnh nhân trả lời tại bệnh viện trong quá trình khám. Trong tổng số đặc trưng, 140 trong số đó là từ các bảng câu hỏi. Tiếp theo, bộ dữ liệu là sự kết hợp của các giá trị số từ các kết quả chẩn đoán xét nghiệm và các giá trị phân loại từ các câu trả lời bảng câu hỏi.

## 3.1.1. Lựa chọn bộ dữ liệu cho thí nghiệm

Bộ dữ liệu chứa các hồ sơ của các đối tượng đã đến cơ sở y tế từ một đến sáu năm qua giai đoạn theo dõi. Tổng số đối tượng được dùng trong nghiên cứu này là 253,395. Các đối tượng có ít nhất hai năm kiểm tra y tế hằng năm liên tục trong giai đoạn theo dõi được lựa chọn làm nhóm mục tiêu cho thí nghiệm. Chúng tôi đã loại trừ các đối tượng đã được chẩn đoán đái tháo đường, tăng lipid máu, hoặc tăng huyết áp, cũng như những người đã dùng ít nhất một loại thuốc cho các bệnh đó, vì bộ dữ liệu cho thí nghiệm đòi hỏi một sự chuyển tiếp từ bình thường sang ba trạng thái.

## 3.1.2. Xử lý dữ liệu thiếu

Tiền xử lý dữ liệu là một trong những bước quan trọng trong ML và khai phá dữ liệu. Nó cải thiện chất lượng dữ liệu và hiệu năng của các mô hình ML. Kỹ thuật này đề cập đến việc làm sạch và biến đổi dữ liệu thô để làm cho nó phù hợp hơn để huấn luyện và đánh giá các mô hình dự đoán. Tiền xử lý dữ liệu gồm chuẩn bị dữ liệu, làm sạch, lựa chọn đặc trưng, xử lý giá trị thiếu, và biến đổi dữ liệu. Kết quả kỳ vọng sau tiền xử lý dữ liệu là một bộ dữ liệu cuối cùng, có thể được xem là chính xác và hữu ích cho các thuật toán khai phá dữ liệu tiếp theo [36].

Các EHR được thu thập là một bộ dữ liệu nhiều chiều. Khó có khả năng tất cả các đặc trưng đều được thu thập trong quá trình khám y tế vì các phép đo cần thiết phụ thuộc vào các đối tượng. Để giải quyết vấn đề giá trị thiếu, một số giải pháp đã được xem xét, gồm bỏ hàng có giá trị null và thay thế các giá trị thiếu bằng các giá trị trung bình, trung vị, hoặc mode của các giá trị đặc trưng [37]. Xét đến kích thước lớn của bộ dữ liệu, các hồ sơ có giá trị đặc trưng null đã bị loại trừ khỏi bộ dữ liệu.

## 3.1.3. Vấn đề mất cân bằng lớp

Hầu hết các thuật toán học máy giả định rằng các lớp mục tiêu chia sẻ các xác suất tiên nghiệm tương tự nhau. Tuy nhiên, trong nhiều ứng dụng thực tế, giả định này bị vi phạm. Khi làm việc với các bộ dữ liệu có sự mất cân bằng lớp, bộ phân loại học máy có xu hướng thiên về lớp đa số nhiều hơn, gây ra phân loại kém cho lớp thiểu số. Trong các bài toán như vậy, hầu hết các ví dụ được gán nhãn là một lớp, trong khi ít ví dụ hơn được gán nhãn là lớp kia [38,39].

Trong bộ dữ liệu của chúng tôi, các thể hiện lớp bình thường chiếm 68.1% của bộ dữ liệu, đái tháo đường chiếm 4.3%, và tiền đái tháo đường chiếm phần còn lại. Phân bố của ba lớp này cho thấy một sự mất cân bằng, điều này có thể đã dẫn đến hiệu năng dự đoán kém trên lớp thiểu số đối với mô hình dự đoán [38]. Để khắc phục vấn đề, các phương pháp under-sampling lớp đa số và over-sampling thiểu số tổng hợp (SMOTE) đã được dùng [40,41].

## 3.2. Thủ tục lựa chọn đặc trưng hướng-dữ-liệu

Mục này trình bày một cách tiếp cận hướng-dữ-liệu để lựa chọn các đặc trưng dự đoán sự xuất hiện T2D bằng các phương pháp thống kê và ML. Bộ dữ liệu thu được qua các thủ tục trên chứa cả các biến số từ các kết quả chẩn đoán và các thực thể phân loại từ các câu trả lời bảng câu hỏi. Việc lựa chọn đặc trưng nhắm tới tìm một tập các đặc trưng tối ưu có thể phân biệt ba lớp một cách hiệu quả.

Thủ tục lựa chọn đặc trưng được trình bày trong Hình 1. Ở bước đầu tiên, tập đặc trưng được tách làm hai, dựa trên các loại dữ liệu: số và phân loại. Sau đó, thước đo phù hợp được áp dụng để xếp hạng tầm quan trọng của các đặc trưng. Đối với các đặc trưng số, một kiểm định ANOVA được dùng làm thước đo để lựa chọn các đặc trưng số, trong khi một kiểm định chi bình phương được dùng cho các đặc trưng phân loại. Các đặc trưng được lựa chọn từ cả hai loại dữ liệu được kết hợp, và kỹ thuật RFE được dùng. RFE được tiến hành cho đến khi đạt được hiệu năng và số đặc trưng mong muốn. Trong kỹ thuật này, một cách tiếp cận dựa trên cây được dùng để xếp hạng các đặc trưng dựa trên mức độ quan trọng của chúng. Cuối cùng, các đặc trưng có ý nghĩa nhất được lựa chọn theo tầm quan trọng của chúng, như được trình bày trong Hình 2. Các đặc trưng được lựa chọn là đường huyết tương lúc đói (FPG), chỉ số khối cơ thể (BMI), Gamma glutamyl transpeptidase (gamma-GTP), triglyceride, giới tính, tuổi, axit uric, hemoglobin A1c (HbA1c), hút thuốc, uống rượu, hoạt động thể chất, và tiền sử gia đình. Tình trạng hút thuốc được chia thành 'hiện đang hút thuốc thường xuyên', 'chưa bao giờ hút thuốc' và 'đã bỏ thuốc'. Hoạt động thể chất chỉ số ngày đối tượng đã tham gia tập thể dục như chạy, đi bộ đường đồi, leo cầu thang, nhảy dây trong tối thiểu 20 phút. Tiền sử gia đình mắc đái tháo đường chỉ xét cha mẹ và anh chị em ruột được chẩn đoán T2D và uống rượu chỉ số ngày đối tượng tiêu thụ đồ uống có cồn.

Hình 1. Thủ tục lựa chọn đặc trưng.

Tầm quan trọng đặc trưng được tính như độ bất thuần của nút (node impurity) được trọng số hóa bởi xác suất đạt tới nút. Xác suất nút được định nghĩa bởi tỷ số giữa số mẫu đạt tới nút và tổng số mẫu [42]. Trục x trong Hình 2 chỉ giá trị chuẩn hóa của tầm quan trọng đặc trưng. Giá trị càng cao thì đặc trưng càng quan trọng. Nhìn chung, phương pháp lựa chọn đặc trưng hướng-dữ-liệu được đề xuất đã chỉ ra các đặc trưng quan trọng và liên quan nhất để biểu thị sự xuất hiện của đái tháo đường, và nó nhất quán với một số nghiên cứu [43-50].

Hình 2. Xếp hạng tầm quan trọng đặc trưng (FPG = đường huyết tương lúc đói, HbA1c = hemoglobin A1c, BMI = chỉ số khối cơ thể, gamma-GTP = gamma glutamyl transpeptidase).

## 3.3. Mô hình dự đoán

Mục này giải thích luồng của mô hình dự đoán sự xuất hiện đái tháo đường được đề xuất. Mô hình được đề xuất có các giai đoạn tiền xử lý dữ liệu, huấn luyện, và kiểm tra (Hình 3). Giai đoạn tiền xử lý dữ liệu xử lý việc làm sạch dữ liệu và lựa chọn đặc trưng. Dữ liệu đã tiền xử lý được tách thành các bộ dữ liệu huấn luyện và kiểm tra. Trong giai đoạn huấn luyện, mô hình dự đoán được huấn luyện bằng dữ liệu huấn luyện đã gán nhãn, và tinh chỉnh siêu tham số được áp dụng để tối ưu hóa các tham số của mô hình nhằm có hiệu năng tốt hơn. Để thu được các tham số tối ưu, chúng tôi đã dùng một tìm kiếm lưới (grid search) kiểm định chéo mười lần (tenfold) trên các tham số có thể tinh chỉnh của các mô hình. Đầu tiên, chúng tôi áp dụng một tìm kiếm tổng quát với một dải tham số rộng hơn. Sau đó, chúng tôi áp dụng một tìm kiếm lưới tinh hơn ở lân cận của lựa chọn đầu tiên để tìm các giá trị tốt nhất cho các siêu tham số. Hiệu năng của bộ phân loại được đánh giá trong giai đoạn kiểm tra. Các thuật toán RF, SVM, và XGBoost được dùng để tạo ra các mô hình dự đoán.

Hình 3. Kiến trúc của mô hình dự đoán (RF = rừng ngẫu nhiên, XGB = XGBoost, SVM = máy vector hỗ trợ).

Nhiều bộ phân loại được tạo ra bằng cách dùng một sự kết hợp khác nhau của các tập đặc trưng và được tổng hợp để hình thành bộ dự đoán cuối cùng. Vì các phương pháp tập hợp (CIM, ST, và SV) dùng tất cả thông tin các bộ phân loại sẵn có, hiệu năng của chúng tốt hơn và/hoặc bền vững hơn trong hầu hết các ứng dụng [51]. Trong nghiên cứu này, chúng tôi đã dùng mô hình tích hợp bộ phân loại với một bảng nhầm lẫn [52], bỏ phiếu mềm [18], và các mô hình bộ phân loại xếp chồng [19].

Ba bộ thí nghiệm đã được tiến hành để khảo sát hiệu năng của mô hình dự đoán được đề xuất. Bộ thí nghiệm thứ nhất xử lý việc đánh giá các mô hình bằng bộ dữ liệu kiểm tra và kỹ thuật kiểm định chéo mười lần (CV). Kỹ thuật CV chia ngẫu nhiên bộ dữ liệu thành mười tập con, và các thí nghiệm được tiến hành lặp lại mười lần. Ở mỗi lần lặp, một trong mười tập con được dùng làm dữ liệu kiểm tra, và chín tập con còn lại được dùng làm tập huấn luyện. Bộ thí nghiệm thứ hai được thực hiện để khảo sát hiệu năng của mô hình dự đoán so với số năm theo dõi y tế được dùng để huấn luyện mô hình dự đoán. Bộ dữ liệu huấn luyện cho các thí nghiệm được tạo ra bằng cách nối các hồ sơ y tế qua các năm. Số năm được dùng để huấn luyện bộ dữ liệu dao động từ hai đến bốn. Bộ thí nghiệm cuối cùng trình bày so sánh hiệu năng kiểm định chéo giữa tập 12 đặc trưng được lựa chọn và các bộ dự đoán truyền thống nổi tiếng của T2D. Các kết quả chi tiết của các thí nghiệm được trình bày trong Mục 4.

## 4. Kết quả

Mục này trình bày các kết quả thực nghiệm của các mô hình được đề xuất. Các thuật toán RF, SVM, và XGBoost được dùng để xây dựng các mô hình dự đoán, và hiệu năng của chúng được đánh giá bằng các thước đo độ chính xác (accuracy), độ chuẩn xác (precision), độ nhạy (recall), và F1-score.

## 4.1. Các thước đo đánh giá

Các thước đo đánh giá được dùng để đánh giá hiệu năng của mô hình. Trong nghiên cứu này, chúng tôi đã dùng độ chính xác, độ chuẩn xác, độ nhạy, và F1-score cho các thước đo của dự đoán. Chúng biểu diễn các giá trị thực và các giá trị dự đoán gần nhau như thế nào, và mỗi định nghĩa được trình bày trong Bảng 1.

Bảng 1. Các thước đo đánh giá.

| Thước đo                           | Định nghĩa                                                                                            |
|------------------------------------|-------------------------------------------------------------------------------------------------------|
| Accuracy Precision Recall F1-score | = TP + TN TP + FP + FN + TN = TP TP + FP = TP TP + FN = 2 ∗ ( recall ∗ precision ) recall + precision |

TP = dương tính thật, TN = âm tính thật, FP = dương tính giả, FN = âm tính giả.

## 4.2. Hiệu năng mô hình

Công trình này đã phát triển một mô hình dự đoán để dự báo sự xuất hiện của T2D trong năm tiếp theo. Mô hình dự đoán được phát triển đã phân loại thể hiện dữ liệu đầu vào là bình thường, tiền đái tháo đường, hoặc đái tháo đường. Nghiên cứu này đã dùng các hồ sơ y tế trước đó để tạo ra các mô hình dự đoán. Kích thước của các bộ dữ liệu huấn luyện và kiểm tra lần lượt là 17,131 và 200, cho mỗi lớp.

Để chứng minh hiệu quả của mô hình dự đoán, chúng tôi đã tiến hành các thí nghiệm bằng các thuật toán LR, RF, XGBoost, SVM, CIM, bộ phân loại xếp chồng (ST), và bỏ phiếu mềm (SV). Các bộ phân loại cơ sở cho các kỹ thuật tập hợp (CIM, ST, và SV) được tạo ra bằng các tập đặc trưng khác nhau và các thuật toán đã đề cập ở trên. Các kết quả thực nghiệm so sánh của các mô hình dự đoán, theo độ chính xác, độ chuẩn xác, độ nhạy, F1-score, Hệ số Tương quan Matthews (MCC), và điểm kappa của Cohen (KC) được trình bày trong Bảng 2.

Bảng 2. So sánh hiệu năng của các mô hình dự đoán được tạo ra trên bộ dữ liệu kiểm tra

|                     |   Accuracy |   Precision |   Recall |   F1-score |   MCC |   KC |
|---------------------|------------|-------------|----------|------------|-------|------|
| LR                  |       0.71 |        0.71 |     0.71 |       0.71 |  0.56 | 0.56 |
| RF                  |       0.73 |        0.74 |     0.73 |       0.74 |  0.60 | 0.60 |
| XGBoost             |       0.72 |        0.74 |     0.72 |       0.73 |  0.58 | 0.58 |
| SVM                 |       0.73 |        0.74 |     0.74 |       0.74 |  0.60 | 0.60 |
| CIM                 |       0.73 |        0.73 |     0.73 |       0.73 |  0.59 | 0.59 |
| Stacking classifier |       0.72 |        0.75 |     0.72 |       0.73 |  0.58 | 0.58 |
| Soft voting         |       0.73 |        0.74 |     0.73 |       0.73 |  0.59 | 0.59 |

LR = hồi quy logistic, RF = rừng ngẫu nhiên, SVM = máy vector hỗ trợ, CIM = cách tiếp cận tích hợp bộ phân loại dựa trên ma trận nhầm lẫn, MCC = Hệ số Tương quan Matthews, và KC = điểm kappa của Cohen.

Theo các kết quả thực nghiệm, sự khác biệt hiệu năng giữa các mô hình đơn lẻ (các thuật toán LR, RF, SVM, và XGBoost) là không đáng kể. Độ chính xác tốt nhất đạt được cho việc dự đoán sự xuất hiện của đái tháo đường là 73% trên bộ dữ liệu kiểm tra, và thấp nhất là 71% từ mô hình LR, vốn được xem là cách tiếp cận phân tích thống kê hiện có. Ma trận nhầm lẫn của mô hình RF được trình bày trong Bảng 3. Như có thể thấy từ ma trận nhầm lẫn, phần lớn lỗi phân loại là từ lớp tiền đái tháo đường. Các giá trị độ chuẩn xác suy ra từ ma trận nhầm lẫn cho các lớp bình thường, tiền đái tháo đường, và đái tháo đường lần lượt là 70%, 61%, và 90%. Giá trị độ chuẩn xác thấp nhất là từ lớp tiền đái tháo đường, dẫn đến độ chuẩn xác tổng thể giảm. Khó khăn trong việc nhận diện lớp tiền đái tháo đường là kết quả của sự chồng lấp của lớp tiền đái tháo đường với các lớp bình thường và đái tháo đường. Như được trình bày trong Bảng 3, các thể hiện dương tính giả cao nhất trong việc dự đoán cả lớp bình thường và đái tháo đường là từ tiền đái tháo đường, lần lượt với 58 và 16 thể hiện. Hơn nữa, mô hình có các thể hiện dương tính giả cao nhất từ lớp tiền đái tháo đường. Do đó, mức độ chồng lấp lớp cao giữa các lớp là một trong những thách thức chính làm giảm độ chính xác của bộ phân loại.

Bảng 3. Ma trận nhầm lẫn của mô hình RF.

| Normal               | Normal Normal 148   | Prediabetes Prediabetes 58   | Diabetes Diabetes 4   |
|----------------------|---------------------|------------------------------|-----------------------|
| Normal Prediabetes   | 148 51              | 58 126                       | 4 29                  |
| Prediabetes Diabetes | 51 1                | 126 16                       | 29 167                |
| Diabetes             | 1                   | 16                           | 167                   |

Để kiểm chứng hiệu năng kiểm định chéo (CV) của các mô hình, các thí nghiệm được tiến hành 10 lần, và trung bình và độ lệch chuẩn của các giá trị độ chính xác, độ chuẩn xác, độ nhạy, và F1-score tích lũy được dùng làm các thước đo đánh giá. Hình 4 mô tả biểu đồ hộp (box plot) cho các kết quả kiểm định chéo của các mô hình. Dựa trên các kết quả thực nghiệm, chúng tôi thấy rõ rằng sự khác biệt hiệu năng giữa các thuật toán là không đáng kể. Tuy nhiên, các cách tiếp cận bộ phân loại tập hợp (CIM, ST, và SV) cho thấy một sự cải thiện hiệu năng trên các kết quả kiểm định chéo so với các mô hình đơn lẻ.

Hình 4. Biểu đồ hộp cho điểm CV của các mô hình dự đoán (LR = hồi quy logistic, RF = rừng ngẫu nhiên, XGB = XGBoost, SVM = máy vector hỗ trợ, ST = bộ phân loại xếp chồng, CIM = cách tiếp cận tích hợp bộ phân loại dựa trên ma trận nhầm lẫn): ( a ) độ chính xác, ( b ) độ chuẩn xác, ( c ) độ nhạy, ( d ) F1-score.

Để khảo sát thêm độ chính xác của mô hình dự đoán so với số năm theo dõi y tế, chúng tôi đã tiến hành các thí nghiệm bằng cách tăng số năm được dùng để huấn luyện các mô hình dự đoán. Số năm được dùng để huấn luyện mô hình dự đoán dao động từ một năm (Y) đến bốn năm (Y, Y-1, Y-2, Y-3). Hình 5 cho thấy các kết quả kiểm định chéo mười lần. Rõ ràng là khi số năm được dùng để huấn luyện mô hình tăng lên, độ chính xác của các mô hình dự đoán cũng tăng lên.

Hình 5. So sánh độ chính xác khi dùng số năm khác nhau cho dữ liệu huấn luyện (RF = rừng ngẫu nhiên, XGB = XGBoost, SVM = máy vector hỗ trợ, Avg. = trung bình).

Hình 6 mô tả so sánh hiệu năng giữa tập 12 đặc trưng được lựa chọn và các bộ dự đoán truyền thống nổi tiếng của T2D (tập 5 đặc trưng): FPG, HbA1c, BMI, tuổi, và giới tính. Đồ thị chỉ so sánh độ chính xác trung bình của các kết quả kiểm định chéo của các mô hình bộ phân loại. Dựa trên kết quả thực nghiệm, độ chính xác của các mô hình với tập 12 đặc trưng vượt trội hơn các tập đặc trưng truyền thống. Các đặc trưng được thêm vào các bộ dự đoán truyền thống - triglyceride, gamma-GTP, axit uric, hút thuốc, uống rượu, hoạt động thể chất, và tiền sử gia đình - đã cải thiện hiệu năng của các mô hình dự đoán. Do đó, ngoài các bộ dự đoán truyền thống của T2D, các bác sĩ lâm sàng nên chú ý đến các thay đổi về gamma-GTP, axit uric, và triglyceride qua các năm.

Hình 6. So sánh độ chính xác giữa tập 12 đặc trưng được lựa chọn và các bộ dự đoán truyền thống (tập 5 đặc trưng) khi dùng số năm khác nhau cho dữ liệu huấn luyện.

## 5. Bàn luận

Trong nghiên cứu này, một bộ dữ liệu lớn và các kỹ thuật ML tập hợp đã được dùng để phát triển các mô hình dự đoán so với các nghiên cứu đã đề cập ở trên. Hơn nữa, tác động của dữ liệu y tế tích lũy lên độ chính xác dự đoán cũng được trình bày bằng cách thay đổi số năm được dùng để huấn luyện các mô hình. Một lựa chọn đặc trưng hướng-dữ-liệu đã được dùng để tìm các bộ dự đoán có ý nghĩa cho việc phát hiện các lớp riêng biệt trong bộ dữ liệu.

Nghiên cứu này đề xuất một mô hình học máy để dự đoán sự xuất hiện của T2D trong năm tiếp theo. Trong khi các công trình trước đây trong [21] và [53] đã phát triển một sơ đồ để dự báo sự xuất hiện của đái tháo đường, bài báo này xử lý sự chuyển tiếp khả dĩ giữa ba lớp: bình thường, tiền đái tháo đường, và đái tháo đường. Ít nghiên cứu đã giải quyết việc dự đoán tiền đái tháo đường, vì hầu hết nghiên cứu đã tập trung vào dự đoán đái tháo đường chưa được chẩn đoán. 12 đặc trưng thu được là FPG, HbA1c, triglyceride, BMI, gamma-GTP, tuổi, axit uric, giới tính, hút thuốc, uống rượu, hoạt động thể chất, và tiền sử gia đình. FPG và HbA1c là các bộ dự đoán quan trọng nhất dựa trên tiêu chí độ lợi thông tin (information-gain); chúng được theo sau bởi gamma-GTP, BMI, triglyceride, và tuổi. So với việc dùng năm bộ dự đoán truyền thống của T2D (FPG, HbA1c, BMI, tuổi, và giới tính), các mô hình được đề xuất dùng các đặc trưng được lựa chọn cho thấy một hiệu năng dự đoán vượt trội. Khi bốn năm dữ liệu được dùng trong huấn luyện, độ chính xác CV tối đa là 81% cho các đặc trưng được lựa chọn và 77% cho các đặc trưng truyền thống. Có thể kết luận rằng bảy đặc trưng bổ sung đã đóng góp vào việc cải thiện độ chính xác của dự đoán. Chúng tôi cũng lưu ý rằng ngoài các bộ dự đoán truyền thống, các bác sĩ lâm sàng phải chú ý đến các thay đổi về gamma-GTP, axit uric, và triglyceride qua các năm.

Nghiên cứu được trình bày trong [5] đã báo cáo việc áp dụng một mô hình ML để nhận diện sự xuất hiện của tiền đái tháo đường trước thời điểm. Trong nghiên cứu của họ, họ đã chỉ ra các khó khăn của việc dự đoán tình trạng tiền đái tháo đường. Độ chính xác tốt nhất được trình bày là 69.9% cho bộ dữ liệu KNHANES. Các kết quả thực nghiệm của chúng tôi đã cho thấy một hiệu năng dự đoán tốt hơn trong việc dự đoán sự xuất hiện không chỉ của đái tháo đường và bình thường mà còn cả tình trạng tiền đái tháo đường nữa. Độ chính xác phân loại CV cao nhất quan sát được là 78% khi dùng các hồ sơ y tế của năm ngoái làm dữ liệu huấn luyện. Tuy nhiên, hiệu năng của mô hình dự đoán được cải thiện bằng cách tăng số năm để huấn luyện các mô hình. Nghiên cứu được trình bày trong [53] đã báo cáo một so sánh ba mô hình khai phá dữ liệu để dự đoán đái tháo đường hoặc tiền đái tháo đường theo các yếu tố nguy cơ. Bộ dữ liệu cho nghiên cứu được thu thập từ hai cộng đồng ở Quảng Châu, Trung Quốc: 735 bệnh nhân được xác nhận mắc đái tháo đường hoặc tiền đái tháo đường và 752 đối chứng bình thường. Các yếu tố nguy cơ (bộ dự đoán) được dùng là tuổi, tiền sử gia đình mắc đái tháo đường, tình trạng hôn nhân, trình độ học vấn, căng thẳng công việc, thời lượng giấc ngủ, hoạt động thể chất, sở thích đồ ăn mặn, giới tính, ăn cá, uống cà phê, và chỉ số khối cơ thể. Ba thuật toán ML: hồi quy logistic, mạng nơ-ron nhân tạo (ANN), và các mô hình cây quyết định đã được dùng để dự đoán đái tháo đường hoặc tiền đái tháo đường bằng các bộ dự đoán. Mô hình cây quyết định (C5.0) có độ chính xác phân loại tốt nhất (77.87%), theo sau là mô hình hồi quy logistic (76.13%), và ANN cho độ chính xác thấp nhất (73.23%).

Các thuật toán LR, RF, SVM, XGBoost, CIM, bộ phân loại xếp chồng, và bỏ phiếu mềm đã được dùng để tạo ra các mô hình dự đoán. Các kết quả thực nghiệm cho thấy các mô hình dự đoán được tạo ra hoạt động tốt hơn một chút so với mô hình LR, phương pháp phân tích thống kê hiện có. Tuy nhiên, sự khác biệt hiệu năng giữa các thuật toán là không đáng kể trên dữ liệu kiểm tra. Điều này có thể được giải thích bởi sự chồng lấp lớp trong không gian đặc trưng. Lớp tiền đái tháo đường đặc biệt có mức độ chồng lấp lớp cao với các lớp bình thường và đái tháo đường. Các kết quả ma trận nhầm lẫn đã xác nhận rằng hầu hết các lỗi dự đoán là từ lớp tiền đái tháo đường. Điều này làm giảm hiệu năng tổng thể của các mô hình dự đoán và giới hạn độ chính xác tối đa ở 73%.

Các kết quả CV cho thấy một sự khác biệt hiệu năng đáng kể giữa các mô hình dự đoán. Các mô hình tập hợp (CIM, ST, và SV) có một hiệu năng CV vượt trội so với các mô hình đơn lẻ bao gồm cả LR. Hiệu năng CV của các mô hình dự đoán được cải thiện bằng cách kết hợp thêm tiền sử y tế từ bộ dữ liệu. Nhìn chung, các kết quả của nghiên cứu hiện tại đã chứng minh rằng các mô hình dự đoán được tạo ra hoạt động tốt hơn mô hình sàng lọc lâm sàng hiện có (LR). Việc áp dụng các mô hình dự đoán được phát triển và các phát hiện của nghiên cứu này đem lại lợi ích cho cả các bác sĩ lâm sàng và bệnh nhân. Các mô hình có thể được dùng như một sự hỗ trợ khả thi trong việc ra quyết định lâm sàng và tư vấn bệnh nhân cho các nhà thực hành. Hơn nữa, dự đoán sớm bệnh cho phép các bệnh nhân đái tháo đường và những người có nguy cơ đái tháo đường thực hiện các biện pháp phòng ngừa có thể làm chậm tiến triển của bệnh và các biến chứng đe dọa tính mạng của nó.

Nghiên cứu này có một số hạn chế nhất định. Thứ nhất, mức FPG là phép đo duy nhất được dùng để định nghĩa bình thường, tiền đái tháo đường, và đái tháo đường; HbA1c và nghiệm pháp dung nạp glucose đường uống (OGTT) không được xét đến. Tuy nhiên, việc dùng mức FPG nhất quán với mô hình được phát triển bởi [5,54]. Thứ hai, trong nghiên cứu này kiểm định chéo 10-fold được dùng trong việc đánh giá các mô hình. Tuy nhiên, việc phát triển và kiểm định của

## Tài liệu tham khảo

1. WHO. Diabetes. Available online: https://www.who.int/news-room/fact-sheets/detail/diabetes (accessed on 20 May 2020).
2. Shaw, J.; Sicree, R.; Zimmet, P. Global estimates of the prevalence of diabetes for 2010 and 2030. Diabetes Res. Clin. Pract. 2010 , 87 , 4-14. [CrossRef] [PubMed]
3. Zou, Q.; Qu, K.; Luo, Y.; Yin, D.; Ju, Y.; Tang, H. Predicting diabetes mellitus with machine learning techniques. Front. Genet. 2018 , 9 , 515. [CrossRef] [PubMed]
4. Won, J.C.; Lee, J.H.; Kim, J.H.; Kang, E.S.; Won, K.C.; Kim, D.J.; Lee, M.-K. Diabetes fact sheet in Korea, 2016: An appraisal of current status. Diabetes Metab. J. 2018 , 42 , 415-424. [CrossRef] [PubMed]
5. Choi, S.B.; Kim, W.J.; Yoo, T.K.; Park, J.S.; Chung, J.W.; Lee, Y.-H.; Kang, E.S.; Kim, D.W. Screening for prediabetes using machine learning models. Comput. Math. Methods Med. 2014 , 2014 , 1-8. [CrossRef] [PubMed]
6. Deberneh, H.M.; Kim, I.; Park, J.H.; Cha, E.; Joung, K.H.; Lee, J.S.; Lim, D.S. 1233-P: Prediction of type 2 diabetes occurrence using machine learning model. Am. Diabetes Assoc. 2020 , 69 , 1233. [CrossRef]
7. Buch, V.; Varughese, G.; Maruthappu, M. Artificial intelligence in diabetes care. Diabet. Med. 2018 , 35 , 495-497. [CrossRef] [PubMed]
8. Dankwa-Mullan, I.; Rivo, M.; Sepulveda, M.; Park, Y.; Snowdon, J.; Rhee, K. Transforming diabetes care through artificial intelligence: The future is here. Popul. Health Manag. 2019 , 22 , 229-242. [CrossRef] [PubMed]
9. Woldaregay, A.Z.; Årsand, E.; Botsis, T.; Albers, D.; Mamykina, L.; Hartvigsen, G. Data-driven blood glucose pattern classification and anomalies detection: Machine-learning applications in type 1 diabetes. J. Med. Internet Res. 2019 , 21 , e11030. [CrossRef]

các mô hình được tiến hành chỉ với một bộ dữ liệu. Do đó, bắt buộc phải dùng các nguồn dữ liệu bổ sung để kiểm chứng các mô hình được suy ra trong nghiên cứu này.

Nghiên cứu của chúng tôi gợi ý hai khảo sát bổ sung đáng theo đuổi. Thứ nhất sẽ là kết hợp các bộ dữ liệu đa dạng để giảm thiểu khó khăn của việc phân loại tiền đái tháo đường, vốn xuất phát từ sự chồng lấp với các lớp bình thường và đái tháo đường. Thứ hai sẽ là tăng khả năng tiếp cận của các mô hình dự đoán và cải thiện trải nghiệm người dùng cho các ứng dụng web và di động.

## 6. Kết luận

Trong bài báo này, chúng tôi đã đề xuất một mô hình dự đoán sự xuất hiện T2D có thể dự báo sự xuất hiện của T2D trong năm tiếp theo (Y + 1) là bình thường, tiền đái tháo đường, hoặc đái tháo đường. Các thuật toán LR, RF, XGBoost, SVM, và các bộ phân loại tập hợp (CIM, ST, và SV) đã được dùng để tạo ra các mô hình dự đoán. Lựa chọn đặc trưng được dùng để lựa chọn các đặc trưng có ý nghĩa nhất có thể phân biệt ba lớp một cách hiệu quả. Các đặc trưng được lựa chọn là FPG, HbA1c, triglyceride, BMI, gamma-GTP, giới tính, tuổi, axit uric, hút thuốc, uống rượu, hoạt động thể chất, và tiền sử gia đình. Các kết quả thực nghiệm cho thấy hiệu năng của mô hình dự đoán được tạo ra là khá tốt trong việc dự báo tỷ lệ mới mắc T2D ở quần thể Hàn Quốc. Mô hình có thể cung cấp cho cả các bác sĩ lâm sàng và bệnh nhân thông tin giá trị về tỷ lệ mới mắc T2D trước thời điểm, điều này sẽ giúp bệnh nhân thực hiện các biện pháp để giảm thiểu nguy cơ T2D, tiến triển, và các biến chứng liên quan. Hơn nữa, nó có thể được dùng như một sự hỗ trợ khả thi trong việc ra quyết định lâm sàng cho các nhà thực hành và các nhà giáo dục đái tháo đường để cải thiện chất lượng cuộc sống của bệnh nhân.

Author Contributions: Conceptualization, H.M.D., and I.K.; methodology, H.M.D., and I.K.; formal analysis, H.M.D., and I.K.; investigation, H.M.D., and I.K.; writing-original draft preparation, H.M.D.; writing-review and editing, I.K.; funding acquisition, I.K. Both authors have read and agreed to the published version of the manuscript.

Funding: This research received no external funding.

Institutional Review Board Statement: Ethical review and approval were waived for this study, because the study uses existing data.

Informed Consent Statement: Not applicable.

Data Availability Statement: The data presented in this study are available on reasonable request from the corresponding author. The data are not publicly available due to ethical requirements.

Conflicts of Interest: The authors declare no conflict of interest.

10. Maniruzzaman Kumar, N.; Abedin, M.; Islam, S.; Suri, H.S.; El-Baz, A.S.; Suri, J.S. Comparative approaches for classification of diabetes mellitus data: Machine learning paradigm. Comput. Methods Programs Biomed. 2017 , 152 , 23-34. [CrossRef]
11. Kavakiotis, I.; Tsave, O.; Salifoglou, A.; Maglaveras, N.; Vlahavas, I.; Chouvarda, I. Machine learning and data mining methods in diabetes research. Comput. Struct. Biotechnol. J. 2017 , 15 , 104-116. [CrossRef] [PubMed]
12. Ravaut, M.; Sadeghi, H.; Leung, K.K.; Volkovs, M.; Rosella, L.C. Diabetes mellitus forecasting using population health data in Ontario, Canada. Proc. Mach. Learn. Res. 2019 , 85 , 1-18.
13. Böhning, D. Multinomial logistic regression algorithm. Ann. Inst. Stat. Math. 1992 , 44 , 197-200. [CrossRef]
14. Breiman, L. Random forests. Mach. Learn. 2001 , 45 , 5-32. [CrossRef]
15. Cortes, C.; Vapnik, V. Support-vector networks. Mach. Learn. 1995 , 20 , 273-297. [CrossRef]
16. Chen, T.; Guestrin, C. Xgboost: A Scalable Tree Boosting System. In Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, San Francisco, CA, USA, 13-17 August 2016; pp. 785-794.
17. Park, D.-C.; Jeong, T.; Lee, Y.; Min, S.-Y. Satellite Image Classification using a Classifier Integration Model. In Proceedings of the 2011 9th IEEE/ACS International Conference on Computer Systems and Applications (AICCSA), Sharm El-Sheikh, Egypt, 27-30 June 2011; pp. 90-94.
18. Raschka, S. Python Machine Learning ; Packt Publishing Ltd: Birmingham, UK, 2015.
19. Aggarwa, C.C. Data Classification: Algorithms and Applications ; Data Mining and Knowledge Discovery Series; CRC Press: Boca Raton, FL, USA, 2014.
20. Liu, X.; Faes, L.; Kale, A.U.; Wagner, S.K.; Fu, D.J.; Bruynseels, A.; Mahendiran, T.; Moraes, G.; Shamdas, M.; Kern, C.; et al. Acomparison of deep learning performance against health-care professionals in detecting diseases from medical imaging: A systematic review and meta-analysis. Lancet Digit. Health 2019 , 1 , e271-e297. [CrossRef]
21. Choi, B.G.; Rha, S.-W.; Kim, S.W.; Kang, J.H.; Park, J.Y.; Noh, Y.-K. Machine learning for the prediction of new-onset diabetes mellitus during 5-year follow-up in non-diabetic patients with cardiovascular risks. Yonsei Med. J. 2019 , 60 , 191-199. [CrossRef] [PubMed]
22. Choi, E.-S. The Korea National Health and Nutrition Examination Survey (KNHANES) 2007-2016. Available online: https: //data.mendeley.com/datasets/jc3rwftjnf/1 (accessed on 9 March 2021).
23. Wei, S.; Zhao, X.; Miao, C. A comprehensive exploration to the machine learning techniques for diabetes identification. In Proceedings of the 2018 IEEE 4th World Forum on Internet of Things (WF-IoT), Singapore, 5-8 February 2018; pp. 291-295.
24. Lovric, M.; Banic, I.; Lacic, E.; Kern, R.; Pavlovic, K.; Turkalj, M. Predicting treatment outcomes using explainable machine learning in children with asthma. Authorea Prepr. 2020 . [CrossRef]
25. ADA. Diagnosis. Available online: https://www.diabetes.org/a1c/diagnosis (accessed on 9 March 2021).
26. Weston, J.; Mukherjee, S.; Chapelle, O.; Pontil, M.; Poggio, T.; Vapnik, V. Feature selection for SVMs. In Advances in Neural Information Processing Systems 13 (NIPS 2000) ; MIT Press: Cambridge, MA, USA, 2001.
27. Kira, K.; Rendell, L.A. The Feature Selection Problem: Traditional Methods and a New Algorithm ; Association for the Advancement of Artificial Intelligence (AAAI): Menlo Park, CA, USA, 1992; Volume 2, pp. 129-134.
28. Jovic, A.; Brkic, K.; Bogunovic, N. A Review of Feature Selection Methods with Applications. In Proceedings of the 2015 38th International Convention on Information and Communication Technology, Electronics and Microelectronics (MIPRO), Opatija, Croatia, 25-29 May 2015; pp. 1200-1205.
29. Ding, H.; Feng, P.-M.; Chen, W.; Lin, H. Identification of bacteriophage virion proteins by the ANOVA feature selection and analysis. Mol. BioSyst. 2014 , 10 , 2229-2235. [CrossRef] [PubMed]
30. Bakar, Z.A.; Ispawi, D.I.; Ibrahim, N.F.; Tahir, N.M. Classification of Parkinson's Disease based on Multilayer Perceptrons (MLPs) Neural Network and ANOVA as a Feature Extraction. In Proceedings of the 2012 IEEE 8th International Colloquium on Signal Processing and its Applications, Melaka, Malaysia, 23-25 March 2015; pp. 63-67.
31. Kim, H.-Y. Analysis of variance (ANOVA) comparing means of more than two groups. Restor. Dent. Endod. 2014 , 39 , 74-77. [CrossRef]
32. Zibran, M.F. Chi-Squared Test of Independence ; University of Calgary: Calgary, AB, Canada, 2007.
33. You, W.; Yang, Z.; Ji, G. Feature selection for high-dimensional multi-category data using PLS-based local recursive feature elimination. Expert Syst. Appl. 2014 , 41 , 1463-1475. [CrossRef]
34. Granitto, P.M.; Furlanello, C.; Biasioli, F.; Gasperi, F. Recursive feature elimination with random forest for PTR-MS analysis of agroindustrial products. Chemom. Intell. Lab. Syst. 2006 , 83 , 83-90. [CrossRef]
35. Yin, Z.; Zhang, J. Operator functional state classification using least-square support vector machine based recursive feature elimination technique. Comput. Methods Programs Biomed. 2014 , 113 , 101-115. [CrossRef]
36. Garc í a, S.; Luengo, J.; Herrera, F. Data Preprocessing in Data Mining ; Springer: Berlin/Heidelberg, Germany, 2015; Volume 72.
37. Saar-Tsechansky, M.; Provost, F. Handling missing values when applying classification models. J. Mach. Learn. Res. 2007 , 8 , 1623-1657.
38. Rahman, M.M.; Davis, D.N. Addressing the class imbalance problem in medical datasets. Int. J. Mach. Learn. Comput. 2013 , 3 , 224-228. [CrossRef]
39. Guo, X.; Yin, Y.; Dong, C.; Yang, G.; Zhou, G. On the Class Imbalance Problem. In Proceedings of the 2008 Fourth International Conference on Natural Computation, Jinan, China, 18-20 October 2008; Volume 4, pp. 192-201.

40. Chawla, N.V.; Bowyer, K.W.; Hall, L.O.; Kegelmeyer, W.P. SMOTE: Synthetic minority over-sampling technique. J. Artif. Intell. Res. 2002 , 16 , 321-357. [CrossRef]
41. Bunkhumpornpat, C.; Sinapiromsaran, K.; Lursinsap, C. MUTE: Majority under-sampling technique. In Proceedings of the 2011 8th International Conference on Information, Communications &amp; Signal Processing; Institute of Electrical and Electronics Engineers (IEEE), Singapore, 13-16 December 2011; pp. 1-4.
42. Ronaghan, S. The Mathematics of Decision Trees, Random Forest and Feature Importance in Scikit-learn and Spark. Available online: https://towardsdatascience.com/the-mathematics-of-decision-trees-random-forest-and-feature-importance-in-scikitlearn-and-spark-f2861df67e3 (accessed on 9 March 2021).
43. Inoue, K.; Matsumoto, M.; Kobayashi, Y. The combination of fasting plasma glucose and glycosylated hemoglobin predicts type 2 diabetes in Japanese workers. Diabetes Res. Clin. Pract. 2007 , 77 , 451-458. [CrossRef] [PubMed]
44. Norberg, M.; Eriksson, J.W.; Lindahl, B.; Andersson, C.; Rolandsson, O.; Stenlund, H.; Weinehall, L. A combination of HbA1c, fasting glucose and BMI is effective in screening for individuals at risk of future type 2 diabetes: OGTT is not needed. J. Intern. Med. 2006 , 260 , 263-271. [CrossRef]
45. ˇ Cauševi´ c, A.; Semiz, S.; Maci´ c-Džankovi´ c, A.; Cico, B.; Duji´ c, T.; Malenica, M.; Bego, T. Relevance of uric acid in progression of type 2 diabetes mellitus. Bosn. J. Basic Med. Sci. 2010 , 10 , 54-59. [CrossRef]
46. Hutchinson, M.S.; Joakimsen, R.M.; Njølstad, I.; Schirmer, H.; Figenschau, Y.; Svartberg, J.; Jorde, R. Effects of age and sex on estimated diabetes prevalence using different diagnostic criteria: The Tromsø OGTT Study. Int. J. Endocrinol. 2013 , 2013 , 1-9. [CrossRef] [PubMed]
47. Sturm, R. The effects of obesity, smoking, and drinking on medical problems and costs. Health Aff. 2002 , 21 , 245-253. [CrossRef] [PubMed]
48. Ding, E.L.; Song, Y.; Malik, V.S.; Liu, S. Sex differences of endogenous sex hormones and risk of type 2 diabetes: A systematic review and meta-analysis. JAMA 2006 , 295 , 1288-1299. [CrossRef]
49. Howard, A.A.; Arnsten, J.H.; Gourevitch, M.N. Effect of alcohol consumption on diabetes mellitus: A systematic review. Ann. Intern. Med. 2004 , 140 , 211-219. [CrossRef]
50. Eliasson, B. Cigarette smoking and diabetes. Prog. Cardiovasc. Dis. 2003 , 45 , 405-413. [CrossRef]
51. Smola, A.J.; Schölkopf, B. A tutorial on support vector regression. Stat. Comput. 2004 , 14 , 199-222. [CrossRef]
52. Jang, M.; Park, D.-C. Application of classifier integration model with confusion table to audio data classification. Int. J. Mach. Learn. Comput. 2019 , 9 , 368-373. [CrossRef]
53. Tigga, N.P.; Garg, S. Prediction of type 2 diabetes using machine learning classification methods. Procedia Comput. Sci. 2020 , 167 , 706-716. [CrossRef]
54. Lee, Y.-H.; Bang, H.; Kim, H.C.; Park, S.W.; Kim, D.J. A simple screening score for diabetes for the korean population: Development, validation, and comparison with other scores. Diabetes Care 2012 . [CrossRef] [PubMed]
