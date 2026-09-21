<!-- extracted by pdf-extract | engine=docling | pages=12 | ocr=False | tables=16/10 | density=1.37 | score=100 -->

Danh mục nội dung có sẵn tại ScienceDirect

## Artificial Intelligence In Medicine

trang chủ tạp chí: www.elsevier.com/locate/artmed

## Xử lý hiệu quả điểm ngoại lai và mất cân bằng lớp cho dự đoán đái tháo đường

Nonso Nnamoko, Ioannis Korkontzelos*

Khoa Khoa học Máy tính, Đại học Edge Hill, Ormskirk, Vương quốc Anh

## THÔNG TIN BÀI BÁO

Từ khóa: Phát hiện điểm ngoại lai (Outlier detection) Dữ liệu mất cân bằng (Imbalanced data) Học máy (Machine learning) Tiền xử lý dữ liệu (Data preprocessing) Tăng mẫu (Oversampling) SMOTE

## 1. Giới thiệu

Mặc dù đã có nhiều năm nghiên cứu về học máy, việc phân loại dữ liệu mất cân bằng vẫn nằm trong số những khó khăn lớn của lĩnh vực này. Thuật toán học tiêu chuẩn giả định rằng các lớp trong tập dữ liệu huấn luyện gần như cân bằng. Ngoài ra, các chỉ số đánh giá hiệu năng học thường giả định tầm quan trọng ngang nhau giữa các lớp trong tập dữ liệu. Đáng tiếc, các tập dữ liệu cân bằng hiếm gặp trong các kịch bản đời thực và lớp ít được đại diện thường có chi phí phân loại sai cao hơn [1]. Ví dụ, hãy xét bài toán phân loại nhị phân dân số Vương quốc Anh (UK) thành có hoặc không có đái tháo đường. Các ước tính hiện nay cho thấy 4.6% dân số mắc đái tháo đường [2], tức còn lại 95.4% trường hợp không mắc. Một mô hình dự đoán phân loại đúng toàn bộ lớp đa số và sai toàn bộ lớp thiểu số sẽ cho Accuracy rất cao nhưng gây hiểu nhầm là 95.4%. Chi phí của việc phân loại sai những người mắc đái tháo đường có thể dẫn đến hậu quả nghiêm trọng.

Phân loại các điểm ngoại lai (outlier) là một vấn đề then chốt khác trong học máy. Vấn đề này nảy sinh vì các mẫu dữ liệu hiếm khi tuân theo một khuôn mẫu rõ ràng. Cụ thể, một số mẫu dữ liệu có thể mang đặc điểm rất khác biệt so với các mẫu khác thuộc cùng một lớp, và do đó nằm cách xa khối dữ liệu chính của lớp đó. Trong các tập dữ liệu y khoa, những mẫu như vậy có thể chỉ ra các cá nhân hoặc nhóm có hành vi rất khác biệt so với số đông trong cùng một lớp. Ví dụ, trong một bài toán phân loại nhị phân gồm nhóm khỏe mạnh và nhóm không khỏe mạnh, một võ sĩ quyền anh hạng nặng được xếp vào nhóm khỏe mạnh có thể nằm cách xa khối quan sát

⁎ Tác giả liên hệ.

Địa chỉ E-mail: nnamokon@edgehill.ac.uk (N. Nnamoko), Yannis.Korkontzelos@edgehill.ac.uk (I. Korkontzelos).

1 Tập dữ liệu đã bị gỡ khỏi kho UCI do hạn chế về quyền (xem archive.ics.uci.edu/ml//datasets/Pima+Indians+Diabetes. Tuy nhiên, nó có sẵn tại kaggle.com/uciml/pima-indians-diabetes-database.)

## TÓM TẮT

Học từ điểm ngoại lai và dữ liệu mất cân bằng vẫn là một trong những khó khăn lớn đối với các bộ phân loại học máy. Trong số rất nhiều kỹ thuật chuyên dụng để xử lý vấn đề này, các giải pháp tiền xử lý dữ liệu được biết đến là hiệu quả và dễ triển khai. Trong bài báo này, chúng tôi đề xuất một phương pháp tiền xử lý dữ liệu có chọn lọc, nhúng tri thức về các điểm ngoại lai vào một tập con được sinh nhân tạo nhằm đạt được phân bố đồng đều. Kỹ thuật tăng mẫu thiểu số tổng hợp (SMOTE) được dùng để cân bằng dữ liệu huấn luyện bằng cách đưa vào các mẫu thiểu số nhân tạo. Tuy nhiên, điều này chỉ được thực hiện sau khi các điểm ngoại lai đã được nhận diện và tăng mẫu (bất kể lớp nào). Mục tiêu là cân bằng tập dữ liệu huấn luyện đồng thời kiểm soát ảnh hưởng của điểm ngoại lai. Các thí nghiệm chứng minh rằng việc tăng mẫu có chọn lọc như vậy giúp tăng cường SMOTE, cuối cùng dẫn đến hiệu năng phân loại được cải thiện.

trong nhóm này. Đây là vì mẫu đó nhiều khả năng thể hiện các đặc điểm thường gắn với nhóm không khỏe mạnh như chỉ số khối cơ thể (BMI) cao. Động lực học này có khả năng làm nhiễu cơ chế học của một thuật toán, cuối cùng dẫn đến phân loại sai.

Nhiều kỹ thuật đã được đề xuất để xử lý điểm ngoại lai và tập dữ liệu mất cân bằng, có thể được nhóm thành hai cách tiếp cận rộng, đó là kỹ thuật ở mức thuật toán và kỹ thuật ở mức dữ liệu. Cách thứ nhất nhằm sửa đổi thuật toán học để thích ứng với tập dữ liệu [3] và được biết là có chi phí tính toán tương đối cao [4]. Cách thứ hai độc lập với bộ phân loại và tương đối dễ áp dụng vì nó tập trung vào các kỹ thuật tiền xử lý dữ liệu [5]. Ví dụ, để xử lý điểm ngoại lai, một số nhà nghiên cứu nhận diện và loại bỏ chúng hoàn toàn [6], trong khi những người khác kiểm soát số lượng điểm ngoại lai cần loại bỏ [7]. Tương tự, một số nhà nghiên cứu xử lý mất cân bằng lớp bằng cách giảm mẫu lớp đa số hoặc tăng mẫu lớp thiểu số [4].

Trong bài báo này, chúng tôi đề xuất một phương pháp tiền xử lý dữ liệu hai bước để quản lý các điểm ngoại lai và mất cân bằng lớp. Chúng tôi sử dụng tập dữ liệu Pima Indians Diabetes 1 lấy từ kho dữ liệu công khai UCI [8]. Tập dữ liệu gồm 768 mẫu, trong đó 500 mẫu cho kết quả âm tính và 268 mẫu dương tính. Ở bước thứ nhất, chúng tôi nhận diện các điểm ngoại lai bằng thuật toán Khoảng tứ phân vị (IQR) [9] và sau đó tăng mẫu chúng có hoàn lại [10]. Ở bước thứ hai, chúng tôi áp dụng Kỹ thuật tăng mẫu thiểu số tổng hợp (SMOTE) [11] để thu được tập dữ liệu cân bằng.

Nghiên cứu này được thúc đẩy bởi khó khăn trong việc nhận diện các cá nhân có nguy cơ cao mắc đái tháo đường. Theo Diabetes UK [12], bệnh nhân đái tháo đường trung bình đã mắc bệnh 9-12 năm trước khi được phát hiện và gần một trong 70 người ở Anh đang sống chung với đái tháo đường chưa được chẩn đoán. Điều này chủ yếu do hệ thống quản lý mang tính phản ứng, trong đó xét nghiệm chẩn đoán chỉ được chỉ định khi bệnh nhân xuất hiện các biến chứng đã biết liên quan đến đái tháo đường [13]. Hơn nữa, các nghiên cứu y sinh trong lĩnh vực này phần lớn là những nỗ lực hồi cứu nhằm ước tính/dự phóng số ca có thể chưa được chẩn đoán [14-19]. Do đó, các cách tiếp cận chủ động dẫn đến việc nhận diện sớm những cá nhân có nguy cơ mắc bệnh là rất quan trọng để có thể khởi động các chiến lược phòng ngừa [20-22].

Học máy có tiềm năng học từ các quan sát trước đó sao cho mô hình thu được có thể dùng để đưa ra các quyết định chủ động trên các mẫu mới chưa từng thấy. Vì vậy, các thí nghiệm trình bày trong bài báo này dựa trên phân loại học máy thực hiện trên một tập dữ liệu khám sức khỏe y tế về đái tháo đường. Nhiệm vụ là huấn luyện các thuật toán học với tập dữ liệu sao cho chúng có thể dự đoán khởi phát đái tháo đường. Bốn thuật toán học được xem xét, đó là bộ phân loại Máy vectơ hỗ trợ với nhân hàm cơ sở bán kính (SVM-RBF) [23], cây quyết định C4.5 [24], Naïve Bayes [25] và Lặp lại Cắt tỉa Tăng dần để Tạo ra Giảm Lỗi (RIPPER) [26]. Hiệu năng của chúng được đánh giá khi các tham số như tỷ lệ phần trăm điểm ngoại lai và lớp thiểu số được thay đổi trên dữ liệu huấn luyện. Do đó, thay vì loại bỏ các điểm ngoại lai và/hoặc chỉ tăng mẫu lớp thiểu số, ban đầu chúng tôi nhận diện và tăng mẫu các điểm ngoại lai (bất kể lớp nào) trước khi áp dụng SMOTE để cân bằng tập dữ liệu. Chúng tôi sử dụng SMOTE vì nó đưa vào các mẫu nhân tạo dựa trên phân bố lân cận của lớp thiểu số. Các đóng góp chính của bài báo này bao gồm:

- Sự kết hợp các kỹ thuật tiền xử lý dữ liệu được áp dụng để cải thiện hiệu năng. Trước tiên chúng tôi tăng mẫu (có hoàn lại) các mẫu dữ liệu cụ thể (điểm ngoại lai) bất kể lớp nào nhằm giảm thiên lệch phân loại về phía các mẫu thông thường. Điều này giúp phơi bày các thuộc tính riêng nhúng trong các điểm ngoại lai cho thuật toán SMOTE.
- Sự cải thiện phân loại đạt được như một kết quả trực tiếp của tổ hợp tiền xử lý dữ liệu. Phương pháp đề xuất dẫn đến các cải thiện về Accuracy so với các nghiên cứu tương tự sử dụng cùng tập dữ liệu trong tài liệu.

Việc đánh giá dựa trên các chỉ số phân loại truyền thống, bao gồm Accuracy, Precision, Recall, F-score và Cohen's Kappa. 2 Chúng tôi cũng dùng kiểm định McNemar để đo mức ý nghĩa của bất kỳ cải thiện nào đạt được. Làm cơ sở (baseline), chúng tôi huấn luyện AdaBoostM1 [28] và Random Forest [29] trên tập dữ liệu gốc. Cả hai bộ phân loại đều được biết là hoạt động tốt với phân bố lớp mất cân bằng [28]. Kết quả của chúng được dùng để đo hiệu năng của phương pháp chúng tôi khi áp dụng cho bốn bộ phân loại khác được xem xét trong nghiên cứu này. Hơn nữa, chúng tôi kiểm tra tính hợp lệ của phương pháp trong các lĩnh vực khác bằng cách lặp lại các thí nghiệm với hai tập dữ liệu có đặc điểm tương tự tập dữ liệu Pima diabetes (tức là mất cân bằng lớp lớn và có điểm ngoại lai), nhưng không liên quan đến y tế.

Phần còn lại của bài báo được tổ chức như sau. Phần bối cảnh và công trình liên quan ngắn gọn được trình bày trong Phần 2, tiếp theo là giải thích chi tiết phương pháp thí nghiệm trong Phần 3. Kết quả được trình bày và phân tích trong Phần 4 trước Phần kết luận.

## 2. Bối cảnh và công trình liên quan

Khoảng 3.3M người trưởng thành (4.6% dân số Anh) hiện đang sống chung với đái tháo đường [2] và con số này được dự phóng đạt 5 triệu vào năm 2025 [30]. Con số này chưa tính đến 549,000 người trưởng thành được ước tính mắc đái tháo đường chưa được chẩn đoán [30]. Do đó, không có gì ngạc nhiên khi các bộ phân loại học máy ngày càng được dùng để hỗ trợ ra quyết định lâm sàng về đái tháo đường [31]. Thông thường, các thuật toán học máy được dùng để học từ một mẫu các ca đã quan sát nhằm tạo ra các mô hình chẩn đoán hoặc tiên lượng có thể chẩn đoán hoặc dự đoán các ca mới. Những mô hình đã học như vậy có thể được dùng để định hướng quyết định của bác sĩ, và đôi khi được chứng minh là vượt trội hơn dự đoán của chuyên gia [32].

2 Cohen's Kappa đo mức độ đồng thuận giữa hai người đánh giá, mỗi người phân loại N mục vào C danh mục loại trừ lẫn nhau [27].

Tập dữ liệu được dùng trong nghiên cứu này cũng đã được sử dụng trong một số nghiên cứu khác [33-39]. Các nghiên cứu này tiếp cận nhiệm vụ phân loại theo những cách khác nhau và đạt được các kết quả khác nhau. Ví dụ, Ramezani và cộng sự [39] đề xuất một bộ phân loại lai tên là Hệ suy luận mờ dựa trên mạng thích nghi logistic (LANFIS). LANFIS là sự kết hợp của hồi quy logistic và hệ suy luận mờ dựa trên mạng thích nghi. Về cơ bản, LANFIS không sử dụng các thuộc tính không đáng kể trong quá trình phân loại và có khả năng xử lý các mẫu có giá trị bị thiếu, vốn phổ biến với tập dữ liệu Pima diabetes. Sử dụng kiểm định chéo 3-fold, LANFIS đạt được 88.05% Accuracy trên tập dữ liệu.

Polat và cộng sự [37] đề xuất một hệ học theo tầng dựa trên Phân tích Phân biệt Tổng quát hóa (GDA) và Máy vectơ hỗ trợ bình phương tối thiểu (LS-SVM). Hệ thống gồm hai giai đoạn, trong đó GDA được dùng làm công cụ tiền xử lý để phân biệt giữa mẫu khỏe mạnh và mẫu đái tháo đường; còn LS-SVM được dùng để phân loại. Áp dụng kiểm định chéo 10-fold trên tập dữ liệu Pima diabetes, hệ thống đạt 82.05% Accuracy, cao hơn 3.84% so với Accuracy đạt được chỉ với LS-SVM (78.21%).

Carpenter và Markuzon [33] khảo sát tập dữ liệu Pima diabetes bằng một bộ phân loại mạng nơ-ron tên là ARTMAP-IC; một mở rộng của mạng nơ-ron ARTMAP [40-42]. Mục tiêu của họ là giải các bài toán phân loại trong đó các mẫu dữ liệu đầu vào giống hệt nhau lại thuộc các lớp khác nhau, vốn phổ biến trong dữ liệu Pima diabetes. Sử dụng kiểm định hold-out với 576 mẫu huấn luyện và 192 mẫu kiểm tra, ARTMAP-IC tạo ra 81.00% Accuracy.

Trong một nghiên cứu so sánh, Kayer và Yildirim [35] cũng áp dụng kiểm định holdout với 576 mẫu huấn luyện và 192 mẫu kiểm tra trên dữ liệu Pima diabetes và so sánh kết quả với ARTMAP-IC cùng các nghiên cứu tương tự. Họ thực hiện bảy thí nghiệm với ba cấu trúc mạng nơ-ron, tức là năm dựa trên Perceptron đa lớp (MLP), và mỗi loại một cho Hàm cơ sở bán kính (RBF) và Mạng nơ-ron hồi quy tổng quát (GRNN). Kết quả Accuracy của họ dao động từ 76.56% đến 80.21%, gần với 81.00% đạt được bởi ARTMAP-IC. Tuy nhiên, kết quả Accuracy cao nhất đạt được với GRNN (80.21%) tốt hơn 12 nghiên cứu khác được xem xét. Điều này bao gồm cả Bản đồ tự tổ chức tiến hóa (ESOM) [34] vốn tốt hơn sáu phương pháp tiên tiến với 78.4% Accuracy.

Temurtas và cộng sự [38] sử dụng kiểm định chéo 10-fold trên dữ liệu Pima diabetes. Tuy nhiên, các tác giả nhận thấy rằng kiểm định hold-out với 576 mẫu huấn luyện và 192 mẫu kiểm tra cho Accuracy tốt hơn là 82.37% khi áp dụng cho một bộ phân loại mạng nơ-ron, tức là Mạng nơ-ron đa lớp (MLNN) huấn luyện với bộ phân loại Levenberg-Marquardt (LM). Họ cũng huấn luyện một Mạng nơ-ron xác suất (PNN) với cả hai phương pháp kiểm định nhưng kết quả thấp hơn.

Thực tế, tìm kiếm tài liệu của chúng tôi cho thấy hơn 70 nghiên cứu khai thác tập dữ liệu Pima diabetes, trong đó 60 nghiên cứu được Winiarski [36] báo cáo với độ chính xác dao động từ 59.5% đến 77.7%. Không rõ Winiarski [36] đã kiểm định các mô hình như thế nào, tức là hold-out hay kiểm định chéo.

Khó có thể tổng quát hóa các lý do đằng sau các kết quả khác nhau thu được trong các nghiên cứu trước, nhưng thành phần dữ liệu, phân bố lớp và chắc chắn là thuật toán học nền tảng đóng vai trò quan trọng. Ví dụ, tất cả các nghiên cứu đã thảo luận trước đó đều dựa vào (các) thuật toán nền tảng để tạo ra kết quả hiệu năng tốt. Lý tưởng nhất, các thuật toán này chỉ nên trích xuất các mẫu hữu ích từ dữ liệu huấn luyện và bỏ qua các mẫu giả. Đáng tiếc, dữ liệu huấn luyện thường còn lâu mới hoàn hảo, như trường hợp tập dữ liệu thí nghiệm của chúng tôi. Một số khiếm khuyết trong dữ liệu Pima diabetes bao gồm điểm ngoại lai, mất cân bằng lớp, kích thước mẫu nhỏ và giá trị bị thiếu.

Tiền xử lý dữ liệu là một phương pháp thay thế thường dùng để giảm thiểu các khiếm khuyết như tỷ lệ lớp mất cân bằng. Thường thì điều này đạt được bằng cách giảm hoặc tăng mẫu khi cần [4]. Ví dụ, lớp thiểu số có thể được tăng mẫu có hoặc không hoàn lại. Lấy mẫu có hoàn lại nghĩa là một đối tượng được thay thế mỗi khi nó được rút ra từ một bể đối tượng và có thể được rút lại [10]. Phương pháp này thường được dùng khi yêu cầu tăng mẫu lớn hơn số lượng có sẵn trong bể. Tuy nhiên, tồn tại các cách tiếp cận tinh vi hơn như SMOTE [11], vốn sinh ra các ví dụ tổng hợp mới bằng cách sử dụng tri thức về các lân cận xung quanh một đối tượng cho trước trong bể, như được thảo luận thêm trong Phần 2.1.

SMOTE gốc đã được nghiên cứu rộng rãi với nhiều cải tiến được đề xuất. Ví dụ, Chawla và cộng sự [43] đề xuất SMOTEBoost bằng cách kết hợp thuật toán SMOTE gốc với một quy trình boosting. Borderline-SMOTE [44] tăng mẫu các mẫu dữ liệu thiểu số ở các vùng không an toàn. Safe-Level-SMOTE [45] đi theo hướng ngược lại bằng cách tập trung vào các mẫu dữ liệu an toàn nhất. LN-SMOTE [46] khai thác thông tin cục bộ về các lân cận của các mẫu dữ liệu được tăng mẫu. MWMOTE [47] mở rộng thuật toán SMOTE bằng cách sửa đổi quy trình sinh dữ liệu tổng hợp để dùng một cách tiếp cận phân cụm.

Trong khi tăng mẫu là cách tiếp cận chủ đạo, một số nghiên cứu tập trung vào giảm mẫu. Trong số đó, quy tắc làm sạch lân cận [48] loại bỏ các mẫu lớp thiểu số chồng lấn nhiều với lớp đa số. Liu và cộng sự [49] kết hợp giảm mẫu với các bộ phân loại tổ hợp để cải thiện hiệu năng. García và Herrera [50] kết hợp giảm mẫu với các thuật toán tiến hóa. Nghiên cứu này sau đó được Galar và cộng sự [51] mở rộng bằng cách thêm một thuật toán boosting. Koziarski và Wozniak [52] kết hợp giảm mẫu và tăng mẫu để cải thiện hiệu năng phân loại. Ban đầu họ làm sạch các lân cận của các mẫu thiểu số bằng cách loại bỏ các đối tượng khỏi lớp đa số. Việc này nhằm đơn giản hóa nhiệm vụ phân loại các mẫu từ lớp thiểu số. Sau đó họ tăng mẫu có chọn lọc các mẫu lớp thiểu số bằng cách sinh các mẫu tổng hợp gần với các mẫu thiểu số trong vùng kém an toàn nhất, tức là nơi lớp đa số chiếm ưu thế.

Thực tế, chúng tôi tìm thấy hai nghiên cứu [53,54] đặc biệt nhằm xử lý mất cân bằng lớp trong dữ liệu Pima diabetes thông qua một hình thức giảm mẫu nào đó. Raghuwanshi và Shukla [54] đề xuất một Máy học cực hạn được nhân hóa dựa trên Underbagging (UBKELM) để xử lý mất cân bằng lớp. Thuật toán tạo ra nhiều tập con huấn luyện cân bằng bằng cách giảm mẫu ngẫu nhiên các mẫu lớp đa số. Sau đó một Máy học cực hạn (ELM) được nhân hóa được dùng làm bộ phân loại thành phần để tạo các tổ hợp. Điều này được kiểm tra với dữ liệu Pima diabetes và cho ra 75.84% G-mean 3 và 80.55% AUC. 4

Nanni và cộng sự [53] cũng dùng dữ liệu Pima diabetes để kiểm tra hai phương pháp tổ hợp của các tổ hợp được thiết kế để xử lý mất cân bằng lớp. Cách tiếp cận của họ dựa trên giảm mẫu giống Raghuwanshi và Shukla [54], ngoại trừ việc nó không được thực hiện ngẫu nhiên. Một trong các phương pháp, gọi là EasyEnsemble, lấy mẫu lớp đa số thành nhiều tập con độc lập được dùng để huấn luyện các bộ phân loại riêng biệt. Các đầu ra này được kết hợp để tạo ra quyết định phân loại. Phương pháp thứ hai gọi là BalanceCascade tập trung vào các khuôn mẫu huấn luyện khó phân loại và các mô hình đã huấn luyện được dùng để định hướng quy trình lấy mẫu cho các bộ phân loại kế tiếp. Kết quả tốt nhất của họ cho dữ liệu Pima diabetes là 84.18% AUC, 69.17% F-score 5 và 75.77% G-mean.

Jegierski và Saganowski [55] gần đây đề xuất một giải pháp 'ngoài khuôn khổ' cho mất cân bằng lớp, trong đó dữ liệu bên ngoài nhưng tương tự được dùng để làm giàu các mẫu của lớp thiểu số. Họ dùng nhiều tập dữ liệu khác nhau để kiểm tra ba lựa chọn làm giàu dữ liệu, đó là Làm giàu Ngẫu nhiên (RanE), Làm giàu Bán tham lam (SemE) và Làm giàu Có giám sát (SupE). RanE chỉ đơn giản chọn các mẫu ngẫu nhiên từ tập dữ liệu bên ngoài và thêm chúng vào lớp thiểu số. SemE lặp đi lặp lại việc chọn/xác thực các mẫu từ tập dữ liệu bên ngoài có thể tăng hiệu năng phân loại. SupE chỉ chọn các mẫu biên từ tập dữ liệu bên ngoài để giúp xác định ranh giới giữa các lớp. Cách tiếp cận của họ hoạt động tốt hơn chín phương pháp nổi tiếng để giảm thiểu mất cân bằng lớp, bao gồm bốn phiên bản của SMOTE.

3 G-mean là viết tắt của trung bình hình học và được định nghĩa là căn của tích độ nhạy theo từng lớp, tức là tỷ lệ dương tính thật và tỷ lệ âm tính thật

4 AUC nghĩa là diện tích dưới đường đặc trưng hoạt động của bộ thu (ROC). Đường ROC là đồ thị của độ nhạy so với tỷ lệ dương tính giả (1 trừ độ đặc hiệu).

5 F-score là trung bình điều hòa của Recall và Precision

Tuy nhiên, điều quan trọng cần lưu ý là sự bất cân xứng lớp trong dữ liệu thường không tự nó gây ra vấn đề. Các đặc điểm cục bộ của lớp thiểu số cũng quan trọng không kém [4]. Theo Stefanowski và cộng sự [56], mất cân bằng lớp chỉ ảnh hưởng đến việc nhận diện lớp thiểu số khi kết hợp với các yếu tố gây khó khăn dữ liệu khác như điểm ngoại lai, lớp chồng lấn, v.v. Do đó, các yếu tố như vậy (điểm ngoại lai trong trường hợp của chúng tôi) phải được xem xét khi khám phá các cách mới để xử lý dữ liệu mất cân bằng. Napierała và cộng sự [57] đo lường tác động của các mẫu dữ liệu nhiễu và mẫu biên từ lớp thiểu số lên hiệu năng phân loại. Họ nhận thấy rằng sự suy giảm hiệu năng của một bộ phân loại bị ảnh hưởng mạnh bởi số lượng mẫu dữ liệu biên. Skryjomski và Krawczyk [4] cũng đề xuất một phương pháp cải thiện hiệu năng phân loại bằng cách tăng mẫu các mẫu dữ liệu biên từ lớp thiểu số bằng SMOTE.

Cách tiếp cận đề xuất trong bài báo này không phiến diện (tức là chỉ tập trung vào lớp thiểu số) mà tập trung vào toàn bộ tập dữ liệu (bất kể lớp nào). Chúng tôi nhận diện các điểm ngoại lai từ tập dữ liệu gốc và sau đó tăng mẫu các điểm đó có hoàn lại. Mục tiêu của bước này là tăng số lượng các ca hiếm này trong tập dữ liệu sao cho khi áp dụng SMOTE để đạt cân bằng lớp, nhiều mẫu tổng hợp hơn sẽ được sinh ra gần lân cận của các điểm ngoại lai. Trên thực tế, cách tiếp cận của chúng tôi phơi bày cho thuật toán học nhiều ca hiếm hơn, vốn có thể khó học. Không có nghiên cứu nào khác trong tài liệu được tìm thấy đã kết hợp các kỹ thuật tiền xử lý dữ liệu này theo cùng một cách. Trước khi trình bày chi tiết thiết lập các thí nghiệm, các kỹ thuật tiền xử lý dữ liệu, SMOTE và IQR, được dùng trong các thí nghiệm được thảo luận ngắn gọn.

## 2.1. Kỹ thuật tăng mẫu thiểu số tổng hợp (SMOTE)

SMOTE là một kỹ thuật tăng mẫu được Chawla và cộng sự [11] giới thiệu. Khác với các phương pháp khác tăng mẫu các mẫu một cách ngẫu nhiên bằng cách nhân bản, SMOTE tạo ra các mẫu nhân tạo mới bằng cách sử dụng tri thức về các lân cận bao quanh mỗi mẫu trong lớp thiểu số. Mã giả trong Thuật toán 1 mô tả phương pháp này.

## Thuật toán 1. Thuật toán SMOTE [4]

các lân cận gần nhất của một mẫu dữ liệu thiểu số cho trước, dữ liệu từ lân cận. (Lưu ý: k là một giá trị nguyên được cung cấp làm đầu vào). Trong mã giả, Dminority là số lượng mẫu lớp thiểu số và Npercent là tỷ lệ phần trăm mẫu sẽ được SMOTE sinh ra. Khoảng cách lân cận có thể được tính bằng nhiều độ đo khác nhau, nhưng đối với thí nghiệm được báo cáo trong bài báo này, khoảng cách Euclid được dùng. Khoảng cách Euclid giữa hai điểm xi và xj là độ dài của đoạn thẳng nối chúng x x M ¯ T i j [58]. k lân cận (5 trong trường hợp của chúng tôi) được nhận diện cho mỗi mục dữ liệu. Để sinh một mẫu nhân tạo, một trong k lân cận này của một mẫu thiểu số gốc được chọn ngẫu nhiên và dùng để xử lý tiếp. Số lượng mẫu tổng hợp được tạo ra trên mỗi mẫu gốc được xác định bởi Npercent, được cung cấp làm đầu vào cho thuật toán SMOTE. Mỗi mẫu mới được tạo ra bằng cách thêm vào các đặc trưng của mẫu thiểu số gốc (Di) các hiệu (diff) giữa các đặc trưng tương ứng của mẫu lân cận được chọn và mẫu gốc; nhân với một số ngẫu nhiên (gap) giữa 0 và 1. Điều này giúp xác định vị trí cuối cùng của mẫu được sinh ra, vị trí này có thể ở cùng chỗ với mẫu thiểu số gốc, lân cận được chọn ngẫu nhiên hoặc bất kỳ đâu giữa hai vị trí. Bằng cách đó, sự đa dạng của mẫu được sinh ra tăng lên, từ đó cho phép khai thác tốt hơn không gian quyết định.

## 2.2. Thuật toán khoảng tứ phân vị (IQR)

IQR là một kỹ thuật tiền xử lý dữ liệu được dùng để phát hiện các điểm ngoại lai và giá trị cực trị. Nó đo độ phân tán bằng cách chia một tập dữ liệu đã sắp hạng thành bốn phần bằng nhau, gọi là tứ phân vị [9]. Các giá trị chia mỗi phần được ký hiệu là Q1, Q2 và Q3, trong đó Q1 và Q3 là giá trị giữa của nửa thứ nhất và nửa thứ hai của tập dữ liệu đã sắp hạng tương ứng; và Q2 là giá trị trung vị trong toàn bộ tập. IQR khi đó bằng Q3 trừ Q1. Điểm ngoại lai ở đây là các mẫu dữ liệu rơi xuống dưới Q1-1.5 IQR hoặc trên Q3 + 1.5 IQR.

Trong biểu đồ hộp ở Hình 1, các giá trị xuất hiện cao nhất và thấp nhất trong giới hạn này được biểu thị bằng các râu của hộp và bất kỳ điểm ngoại lai nào dưới dạng các điểm riêng lẻ. Q1, Q2 và Q3 lần lượt là 7, 8.5 và 9. IQR=Q3-Q1=2. Râu dưới=Q1-1.5×IQR=7-3=4. Râu trên = Q3 + 1.5 × IQR = 9 + 3 = 12. Các điểm dữ liệu 0.5 và 3.5 là điểm ngoại lai, có lẽ thuộc các lớp khác nhau.

## 3. Phương pháp

Trong phần này, chúng tôi trình bày cách tiếp cận của mình để giảm thiên lệch phân loại về phía một lớp trong dữ liệu huấn luyện, đồng thời thừa nhận sự hiện diện của các điểm ngoại lai. Cách tiếp cận liên quan đến việc tiền xử lý nhiều lần dữ liệu huấn luyện như minh họa trong Hình 2. Trước tiên, chúng tôi tìm kiếm các điểm ngoại lai trong dữ liệu huấn luyện gốc bằng thuật toán IQR. Các điểm ngoại lai sau đó được tăng mẫu có hoàn lại và sau đó được thêm trở lại dữ liệu gốc. Tỷ lệ phần trăm tăng mẫu được chọn tùy ý tùy thuộc vào số lượng điểm ngoại lai trong dữ liệu, với mục tiêu cuối cùng là tăng mạnh sự hiện diện của chúng trong dữ liệu. Vì quá trình này có thể dẫn đến mất cân bằng lớp, chúng tôi đưa SMOTE vào để làm đồng đều phân bố lớp trước khi phân loại. Mô tả chi tiết về dữ liệu được trình bày trong Phần 3.1, tiếp theo là thiết lập thí nghiệm trong Phần 3.2.

Hình 1. Biểu đồ hộp mẫu thể hiện các điểm ngoại lai.

## 3.1. Tập dữ liệu

Để phục vụ mục đích thí nghiệm, một tập dữ liệu đái tháo đường đã được lấy từ kho dữ liệu công khai UCI [8]. Nó gồm 768 phụ nữ gốc Pima Indian từ 21 tuổi trở lên đã tham gia một chương trình kiểm tra sức khỏe quốc gia nhằm chẩn đoán đái tháo đường. Có 500 mẫu âm tính và 268 mẫu dương tính. 9 đặc trưng được thu thập cho mỗi cá nhân, bao gồm cả biến lớp như thể hiện trong Bảng 1.

Các biến thể của dữ liệu gốc đã được tạo ra và dùng để huấn luyện các thuật toán phân loại được xem xét trong nghiên cứu này. Các biến thể này được thể hiện trong Bảng 2. Dữ liệu SMOTEd thu được bằng cách tăng mẫu lớp thiểu số trong dữ liệu gốc bằng SMOTE. Tỷ lệ tăng mẫu được đặt là 90% ( n =241) để các lớp gần như cân bằng, tức là 509 mẫu dương tính và 500 mẫu âm tính. Tập dữ liệu IQRd+SMOTEd được tạo ra bằng phương pháp mô tả trong Phần 3. Chúng tôi tìm kiếm các điểm ngoại lai trong dữ liệu gốc bằng thuật toán IQR, vốn nhận diện 49 điểm ngoại lai. Các điểm này được tăng mẫu có hoàn lại 500%, dẫn đến 245 điểm ngoại lai; và sau đó được thêm trở lại dữ liệu gốc, tức là (768 - 49) + 245 = 964 mẫu. Chúng tôi tăng mẫu có hoàn lại do số lượng điểm ngoại lai nhỏ mà nếu không sẽ không cho phép sinh ra 196 điểm ngoại lai bổ sung. Tỷ lệ phần trăm tăng mẫu, tức 500%, được chọn tùy ý với mục tiêu cuối cùng là tăng mạnh số lượng điểm ngoại lai. Quá trình này không dẫn đến một tập dữ liệu cân bằng, vì các điểm ngoại lai được tăng mẫu bất kể lớp nào. Do đó, chúng tôi tăng mẫu lớp thiểu số của dữ liệu mới thêm 50% ( n =193) bằng SMOTE để các lớp được phân bố đồng đều, tức là 579 mẫu dương tính và 578 mẫu âm tính.

## 3.2. Thiết lập thí nghiệm

Ba biến thể dữ liệu được mô tả trong Phần 3.1 đã được dùng để huấn luyện bốn bộ phân loại, đó là: Naïve Bayes, SVM-RBF, cây quyết định C4.5 và RIPPER. Các bộ phân loại này được chọn vì sự phổ biến của chúng trong lĩnh vực học máy. Để tạo ra một cơ sở (baseline) mà phương pháp của chúng tôi được đo lường so với nó, chúng tôi cũng huấn luyện các bộ phân loại AdaBoostM1 [28] và Random Forest [29] bằng dữ liệu gốc, tức là không tiền xử lý. Chúng tôi chọn các bộ phân loại này vì chúng được biết là giảm thiểu tác động của phân bố lớp lệch trong dữ liệu huấn luyện [28]. AdaBoostM1 hoạt động bằng cách chạy lặp đi lặp lại một thuật toán học nền tảng trên nhiều phân bố khác nhau của tập dữ liệu huấn luyện, rồi kết hợp các đầu ra của chúng thành một bộ phân loại tổng hợp duy nhất. Chúng tôi áp dụng Decision Stump [59] làm thuật toán nền tảng cho AdaBoostM1 trong bài báo này. Một Decision Stump đơn giản là một mô hình Cây quyết định một mức đưa ra dự đoán dựa trên giá trị của một đặc trưng đầu vào duy nhất. Tuy nhiên, Random Forest dựa trên sự kết hợp của các cây dự đoán sao cho mỗi cây phụ thuộc vào các giá trị của một vectơ ngẫu nhiên được lấy mẫu độc lập và có cùng phân bố cho tất cả các cây trong rừng [29].

Năm chỉ số hiệu năng truyền thống đã được xem xét để đánh giá hiệu năng, bao gồm Accuracy, Precision, Recall, F-score và Kappa [27]. Ngoại trừ Kappa, các chỉ số này được diễn giải trên thang từ 0 (thấp nhất) đến 1 (cao nhất). Kappa được diễn giải trên thang từ -1 (thấp nhất) đến 1 (cao nhất). Để ước tính mức ý nghĩa của cải thiện nhờ phương pháp đề xuất, kiểm định McNemar [60] đã được dùng. Đây là một kiểm định phi tham số trên một bảng phân loại 2 × 2, thể hiện trong Bảng 3, để đo sự khác biệt giữa các tỷ lệ ghép cặp.

Nff biểu thị số lần cả hai bộ phân loại đều phân loại sai các mẫu và Nss biểu thị thành công cho cả hai bộ phân loại. Hai giá trị này không cung cấp nhiều thông tin về hiệu năng của các bộ phân loại vì chúng không cho biết hiệu năng của chúng khác nhau như thế nào. Hai tham số còn lại, Nsf và Nfs, phản ánh các trường hợp một trong các bộ phân loại thất bại và bộ kia thành công, cho thấy sự chênh lệch hiệu năng.

Nhiều lần đánh giá độc lập sử dụng kiểm định chéo phân tầng k-fold ( k =10) đã được thực hiện để đo hiệu năng của cách tiếp cận của chúng tôi. Trong kiểm định chéo phân tầng k-fold, dữ liệu huấn luyện được

Hình 2. Sơ đồ tổng quan của phương pháp đề xuất.

## 4. Phân tích kết quả

Trong phần này, chúng tôi trình bày và phân tích hiệu năng của bốn bộ phân loại khi được huấn luyện với các tập dữ liệu gốc và đã tiền xử lý được mô tả trong Phần 3.1; đặc biệt là IQRd+SMOTEd. Chúng tôi cũng lặp lại các thí nghiệm với các tập dữ liệu khác không liên quan đến đái tháo đường. Điều này nhằm khảo sát xem phương pháp đề xuất có mở rộng sang các tập dữ liệu và lĩnh vực khác hay không. Để rõ ràng, kết quả với Pima diabetes và các tập dữ liệu khác không liên quan được phân tích trong các Phần 4.1 và 4.2 riêng biệt tương ứng. Mỗi Phần cũng trình bày các kết quả cơ sở (baseline) tương ứng thu được với AdaBoostM1 và Random Forest.

## 4.1. Kết quả với tập dữ liệu đái tháo đường

Phần này trình bày các kết quả thu được với các tập dữ liệu Pima diabetes được mô tả trong Phần 3.1. Bảng 4 thể hiện các kết quả đánh giá cho mỗi bộ phân loại được huấn luyện với các tập dữ liệu Pima diabetes gốc và đã tiền xử lý. Đối với mỗi nhóm mô hình bộ phân loại được trình bày trong bảng, chúng tôi dùng kiểu chữ in đậm để chỉ ra kết quả tốt nhất trên tất cả các chỉ số hiệu năng. Rõ ràng là các mô hình được huấn luyện với tập dữ liệu IQRd+SMOTEd luôn cho Accuracy tốt nhất. Trong bốn bộ phân loại được xem xét, C4.5 cho Accuracy tốt nhất còn Naïve Bayes cho thấp nhất. Tuy nhiên, điều quan trọng cần lưu ý là ngay cả mô hình Naïve Bayes có hiệu năng kém nhất cũng cho Accuracy tốt hơn cơ sở (baseline). Về Kappa, phương pháp đề xuất sử dụng IQRd+SMOTEd cũng dẫn đến kết quả tốt hơn baseline ở tất cả các bộ phân loại trừ SVM-RBF, nơi hiệu năng thấp hơn.

Nhìn chung, Naïve Bayes và SVM-RBF cho kết quả hỗn hợp ở tất cả các chỉ số hiệu năng và chúng rõ ràng không phản ứng tốt với phương pháp tiền xử lý dữ liệu có chọn lọc được áp dụng. Ví dụ, Naïve Bayes được huấn luyện với SMOTEd cho Precision tốt hơn một chút so với IQRd+SMOTEd, cao hơn 0.001%. Tương tự, mô hình SVM-RBF chính xác hơn 0.60% khi được huấn luyện với tập dữ liệu SMOTEd so với IQRd+SMOTEd. Tuy nhiên, công bằng mà nói thì các khác biệt này là không đáng kể và khó có ý nghĩa thống kê.

Trong khi kết quả hỗn hợp được ghi nhận cho Naïve Bayes và SVM-RBF, hai bộ phân loại còn lại, tức RIPPER và C4.5, phản ứng tốt với dữ liệu IQRd+SMOTEd, như phản ánh trong tất cả các chỉ số hiệu năng. Thực tế, kiểm định McNemar được thực hiện trên các mô hình cho thấy cả hai bộ phân loại được huấn luyện với dữ liệu IQRd+SMOTEd đều tạo ra cải thiện có ý nghĩa thống kê khi so với hiệu năng của chúng với các phiên bản dữ liệu huấn luyện khác. Kết quả này có thể thấy rõ trong Bảng 5, vốn trình bày các kết quả của các mô hình được huấn luyện IQRd+SMOTEd so với original và SMOTEd cho tất cả các bộ phân loại. Các khác biệt có ý nghĩa thống kê giữa hai mô hình được chỉ ra bằng dấu ' ★ '. Mức cải thiện có thể thấy rõ trong các cột thành công dự đoán ( Nfs ) và thất bại ( Nsf ) của Bảng 5, vốn chuyển thành giá trị được trình bày trong cột diff. Ví dụ, khi tính đến số lần thành công và thất bại, các mô hình dẫn đến khác biệt có ý nghĩa đã thành công trong việc dự đoán đúng lớp thật thường xuyên hơn ( Nfs ) so với dự đoán sai ( Nsf ). Sự

Bảng 1 Các đặc trưng dữ liệu thí nghiệm.

| Số đặc trưng      | Mô tả                                                                                                                                                                                                                                                                                      |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 2 3 4 5 6 7 8 9 | Number of times pregnant Plasma glucose concentration in a 2 h oral glucose tolerance test Diastolic blood pressure (mmHg) Triceps skin fold thickness (mm) 2-h serum insulin (μIU/ml) Body mass index (weight in kg/(height in m 2 ) Diabetes pedigree function Age (years) Class (0, 1) |

Bảng 2 Đặc điểm của các tập dữ liệu gốc và đã tiền xử lý.

Bảng 3

| Tập dữ liệu |   Dương tính |   Âm tính |   Tổng |
|-------------|------------|------------|---------|
| Original    |        268 |        500 |     768 |
| SMOTEd      |        509 |        500 |    1009 |
| IQRd+SMOTEd |        579 |        578 |    1157 |

Bảng McNemar đơn giản thể hiện kết quả của hai bộ phân loại.

|                                            | Classifier B failed   | Classifier B succeeded   |
|--------------------------------------------|-----------------------|--------------------------|
| Classifier A failed Classifier A succeeded | N ff N sf             | N fs N ss                |

được phân hoạch ngẫu nhiên thành 10 tập con có kích thước bằng nhau, có tính đến phân bố lớp. Trong quá trình huấn luyện, một trong k tập con được giữ lại làm dữ liệu xác thực, và k-1 tập con còn lại được dùng làm dữ liệu huấn luyện. Quá trình được lặp lại k lần, với mỗi tập trong k tập con được dùng đúng một lần làm dữ liệu xác thực. k kết quả từ các fold sau đó được kết hợp để tạo ra một kết quả duy nhất.

Để bảo đảm các kết quả không thiên lệch, đồng thời cho phép so sánh chéo giữa các bộ phân loại khác nhau, chúng tôi đã dùng đúng các fold được sinh ra từ dữ liệu gốc để đánh giá tất cả các mô hình bộ phân loại được huấn luyện với các phiên bản đã tiền xử lý của dữ liệu. Về cơ bản, kiểm định chéo phân tầng k-fold được áp dụng cho dữ liệu gốc để sinh ra 10 fold. Sau đó, dữ liệu gốc được tiền xử lý để sinh ra phiên bản SMOTEd và IQRd+SMOTEd của dữ liệu. Trong mỗi lần lặp kiểm định chéo, chúng tôi xem một fold của tập dữ liệu gốc là tập kiểm tra. Tất cả các mẫu của fold này được loại bỏ khỏi phiên bản đã tiền xử lý của dữ liệu, và các mẫu còn lại được xem là dữ liệu huấn luyện cho lần lặp đó. Điều này nghĩa là mỗi fold huấn luyện trong tập dữ liệu SMOTEd hoặc IQRd+SMOTEd bao gồm toàn bộ tập dữ liệu đã tiền xử lý trừ đi các mẫu của fold kiểm tra. Quá trình thí nghiệm được minh họa trong các khác biệt giữa ( Nfs ) và ( Nsf ) là tối thiểu với Naïve Bayes và SVM-RBF, điều này giải thích cải thiện không đáng kể. Mặt khác, các khác biệt lớn hơn với RIPPER và C4.5, cuối cùng dẫn đến cải thiện đáng kể.

Hình 3. Sơ đồ tổng quan của thiết lập thí nghiệm.

Như đã quan sát trước đó trong Bảng 4, bộ phân loại C4.5 được huấn luyện với dữ liệu IQRd+SMOTEd cho kết quả tốt nhất nhìn chung. Mức cải thiện Accuracy của nó so với các bộ phân loại khác dao động từ 5.9% đến 12.5%. Để chứng minh bằng thực nghiệm mức ý nghĩa của cải thiện này, chúng tôi đã thực hiện một kiểm định McNemar để so sánh các dự đoán của nó với các mô hình hiệu năng tốt nhất của các bộ phân loại khác, bao gồm cả cơ sở (baseline): AdaBoostM1 và Random Forest. Kết quả được thể hiện trong Bảng 6, vốn xác nhận rằng các khác biệt thực sự có ý nghĩa. Phương pháp đề xuất chứng tỏ tạo ra cải thiện đáng kể về hiệu năng phân loại khi áp dụng cho một bộ phân loại phản ứng tốt với tập dữ liệu đã tiền xử lý, tức là C4.5 trong trường hợp này.

trong tất cả các nghiên cứu trước đây được trình bày trong Bảng 7, Ramezani và cộng sự [39] cho Accuracy tốt nhất (88.05%), bằng cách áp dụng kiểm định chéo 3-fold trên LANFIS. Rất có thể kết quả của họ sẽ khác nếu họ dùng một cách tiếp cận kiểm định khác. Quan điểm của chúng tôi là các kết quả này có thể so sánh được ở một mức độ nào đó, bất kể phương pháp hay cách tiếp cận kiểm định được dùng. Đây là vì tất cả các nghiên cứu đều dùng cùng dữ liệu cho thí nghiệm và mục tiêu chung là cải thiện kết quả với phương pháp đề xuất trong khi đảm bảo rằng tập dữ liệu kiểm tra không bị phơi bày cho bộ phân loại trong quá trình huấn luyện. Hơn nữa, với kích thước khiêm tốn của dữ liệu Pima diabetes, kiểm định chéo 10-fold được dùng trong thí nghiệm của chúng tôi có vẻ phù hợp hơn vì việc kiểm tra dựa trên tất cả các mẫu thay vì một tập con nhỏ của dữ liệu. Ngay cả khi so sánh chỉ với các nghiên cứu trước đây đã dùng kiểm định chéo 10-fold [37,38,34], cách tiếp cận của chúng tôi cho Accuracy tốt hơn, với mức cải thiện dao động từ 7.13% đến 11.1%.

Như đã lưu ý trong Phần 2, chúng tôi tìm thấy hơn 70 nghiên cứu đã công bố sử dụng tập dữ liệu Pima diabetes, vì vậy chúng tôi so sánh kết quả của họ với kết quả của chúng tôi trong Bảng 7. Rõ ràng cách tiếp cận tiền xử lý dữ liệu có chọn lọc của chúng tôi áp dụng cho bộ phân loại C4.5 cho Accuracy tốt hơn các nghiên cứu trước, với mức cải thiện dao động từ 1.45% đến 30%. Cần lưu ý rằng các phương pháp (tức là cách tiếp cận phân loại) và cách tiếp cận kiểm định (tức là cách chia dữ liệu huấn luyện và kiểm tra) khác nhau giữa các nghiên cứu này và điều này có thể ảnh hưởng đến kết quả được báo cáo. Ví dụ, Temurtas và cộng sự [38] áp dụng cả kiểm định chéo 10-fold và cách chia dữ liệu 576:192 cho cùng một bộ phân loại và nhận thấy cách thứ hai thuận lợi hơn như thể hiện trong Bảng 7. Trong số một số nghiên cứu trước được thảo luận trong Phần 2 không đo hiệu năng dựa trên Accuracy, do đó không được trình bày trong Bảng 7. Cụ thể, Nanni và cộng sự [53] báo cáo hiệu năng theo F-score, G-mean và AUC trong khi Raghuwanshi và Shukla [54] chỉ báo cáo G-mean và AUC. Cả hai nghiên cứu đều nhằm cụ thể giảm thiểu mất cân bằng lớp trong dữ liệu huấn luyện và họ kiểm tra các phương pháp của mình với dữ liệu Pima diabetes. Vì C4.5 ( IQRd+SMOTEd ) là mô hình hiệu năng tốt nhất của chúng tôi trên dữ liệu Pima diabetes, chúng tôi đã tính F-score, G-mean và AUC, và so sánh với các kết quả tốt nhất từ Nanni và cộng sự [53] và Raghuwanshi và Shukla [54]. Như thể hiện trong Bảng 8, cách tiếp cận của chúng tôi hoạt động tốt hơn ở cả ba chỉ số được xem xét.

Bảng 4 Hiệu năng bộ phân loại với các phiên bản gốc và đã tiền xử lý của tập dữ liệu Pima diabetes.

| Bộ phân loại/dữ liệu | Bộ phân loại/dữ liệu |   Accuracy |   Precision |   Recall |   F-Score |   Kappa |
|-------------------|-------------------|------------|-------------|----------|-----------|---------|
| Baseline          | AdaBoostM1        |      0.746 |       0.740 |    0.746 |     0.741 |   0.638 |
|                   | Random Forest     |      0.755 |       0.749 |    0.755 |     0.750 |   0.650 |
| Naïve Bayes       | Original          |      0.760 |       0.758 |    0.760 |     0.760 |   0.650 |
|                   | SMOTEd            |      0.762 |       0.770 |    0.762 |     0.764 |   0.611 |
|                   | IQRd+SMOTEd       |      0.770 |       0.769 |    0.769 |     0.768 |   0.653 |
| SVM-RBF           | Original          |      0.760 |       0.758 |    0.760 |     0.755 |   0.660 |
|                   | SMOTEd            |      0.768 |       0.792 |    0.768 |     0.773 |   0.585 |
|                   | IQRd+SMOTEd       |      0.777 |       0.786 |    0.777 |     0.779 |   0.641 |
| RIPPER            | Original          |      0.772 |       0.772 |    0.772 |     0.766 |   0.676 |
|                   | SMOTEd            |      0.776 |       0.808 |    0.776 |     0.781 |   0.582 |
|                   | IQRd+SMOTEd       |      0.836 |       0.842 |    0.836 |     0.836 |   0.743 |
| C4.5              | Original          |      0.747 |       0.753 |    0.747 |     0.744 |   0.621 |
|                   | SMOTEd            |      0.810 |       0.835 |    0.810 |     0.814 |   0.653 |
|                   | IQRd+SMOTEd       |      0.895 |       0.900 |    0.894 |     0.895 |   0.835 |

Bảng 5

Kiểm định McNemar thể hiện các khác biệt hiệu năng giữa các phiên bản dữ liệu Pima diabetes. Mỗi tập dữ liệu ở cột thứ hai được so sánh với IQRd+SMOTEd.

| Classifier/data          | Classifier/data          | Nff                                                                                                                                      | N fs                                                                                                                                     | N sf                                                                                                                                     | N ss                                                                                                                                     | diff                                                                                                                                     | 95% CI                                                                                                                                   | P -value                                                                                                                                 |
|--------------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| NB                       | Original SMOTEd          | 162 157                                                                                                                                  | 22 26                                                                                                                                    | 15 20                                                                                                                                    | 569 565                                                                                                                                  | 0.91 0.78                                                                                                                                | [-0.64, 2.46] [-0.95, 2.51]                                                                                                              | 0.3240 0.4614                                                                                                                            |
| SVM                      | Original SMOTEd          | 136 125                                                                                                                                  | 48 53                                                                                                                                    | 55 46                                                                                                                                    | 549 544                                                                                                                                  | 1.69 0.91                                                                                                                                | [-0.63, 4.01] [-1.63, 3.45]                                                                                                              | 0.1875 0.5467                                                                                                                            |
| RIPPER                   | Original SMOTEd          | 81 78                                                                                                                                    | 94 94                                                                                                                                    | 45 48                                                                                                                                    | 548 548                                                                                                                                  | 6.38 5.99                                                                                                                                | [3.41, 9.36] [2.98, 9.00]                                                                                                                | <0.0001 ★ 0.0001 ★                                                                                                                       |
| C4.5                     | Original SMOTEd          | 63 59                                                                                                                                    | 131 87                                                                                                                                   | 18 22                                                                                                                                    | 556 600                                                                                                                                  | 14.71 8.46                                                                                                                               | [11.78, 17.65] [5.87, 11.06]                                                                                                             | <0.0001 ★ <0.0001 ★                                                                                                                      |
| Nff : both models failed | Nff : both models failed | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded | N fs : IQRd+SMOTEd trained model succeeded and the other model failed N : IQRd+SMOTEd trained model failed and the other model succeeded |

Bảng 6 C4.5 được huấn luyện IQRd+SMOTEd so với bộ phân loại tốt nhất trong các bộ khác bao gồm các mô hình cơ sở (baseline).

| Classifier                                                                         | N ff           | N fs               | N sf           | N ss                | diff                         | 95% CI                                                                 | P -value                                          |
|------------------------------------------------------------------------------------|----------------|--------------------|----------------|---------------------|------------------------------|------------------------------------------------------------------------|---------------------------------------------------|
| AdaBoostM1 vs C4.5 Random Forest vs C4.5 NB vs C4.5 SVM-RBF vs C4.5 RIPPER vs C4.5 | 64 35 63 69 53 | 131 153 114 102 73 | 17 46 18 12 28 | 556 534 573 585 614 | 14.84 13.93 12.50 11.72 5.86 | [11.92, 17.77] [10.47, 17.39] [9.70, 15.30] [9.12, 14.31] [3.33, 8.39] | <0.0001 ★ <0.0001 ★ <0.0001 ★ <0.0001 ★ <0.0001 ★ |

## 4.2. Kết quả với các tập dữ liệu khác

Phần này trình bày các kết quả thu được bằng cách áp dụng phương pháp của chúng tôi được mô tả trong Phần 3 cho các tập dữ liệu khác không liên quan đến đái tháo đường. Chúng tôi tin điều này là cần thiết vì kích thước khiêm tốn của dữ liệu Pima diabetes không cho phép một quá trình kiểm định mở rộng, ví dụ như có một tập hold-out cho mục đích kiểm tra. Kịch bản lý tưởng sẽ là kiểm tra trên một tập dữ liệu bên ngoài tương tự nhưng chúng tôi không thể tìm thấy một tập dữ liệu khác có các đặc trưng và nhãn lớp tương tự.

Nhắc lại từ Phần 2 rằng Jegierski và Saganowski [55] đề xuất ba chiến lược, tức là Làm giàu Ngẫu nhiên (RanE), Làm giàu Bán tham lam (SemE) và Làm giàu Có giám sát (SupE), cho mất cân bằng lớp sử dụng dữ liệu bên ngoài nhưng tương tự để làm giàu các mẫu của lớp thiểu số. Khi được kiểm tra với Random Forest [29] trên một tập dữ liệu ung thư vú, 6 các chiến lược này được chứng minh tạo ra F-score tốt hơn chín phương pháp nổi tiếng để giảm thiểu mất cân bằng lớp, bao gồm bốn phiên bản của SMOTE.

Để phục vụ mục đích so sánh, chúng tôi đã tái lặp cách tiếp cận của mình với Random Forest trên cùng tập dữ liệu ung thư vú, vốn chứa 569 mẫu, trong đó 357 là Lành tính (Benign) và 212 là Ác tính (Malignant). Về cơ bản, chúng tôi nhận diện 11 điểm ngoại lai và các điểm này được tăng mẫu có hoàn lại 500% trước khi áp dụng SMOTE để tăng lớp thiểu số thêm 35%. Để kiểm tra, chúng tôi áp dụng kiểm định chéo 10-fold trên dữ liệu gốc và tính trung bình F-score giống như Jegierski và Saganowski [55]. Như thể hiện trong Bảng 9, cách tiếp cận của chúng tôi có thể so sánh với SupE (không có SemE) nhưng tốt hơn RanE, SemE và SupE (có SemE).

Để xác định xem cách tiếp cận của chúng tôi có áp dụng được cho các lĩnh vực ngoài y tế hay không, chúng tôi cũng đã tái lặp các thí nghiệm của mình (được mô tả trong Phần 3.2) với hai tập dữ liệu không liên quan đến y tế. Cả hai tập dữ liệu, tức là German Credit 7 và QSAR Biodegradation 8 được lấy từ kho dữ liệu công khai UCI [8], và chúng thể hiện các đặc điểm tương tự dữ liệu Pima diabetes, tức là mất cân bằng nặng và chứa các điểm ngoại lai. Bảng 10 thể hiện phân bố lớp cho cả hai tập dữ liệu bao gồm các phiên bản gốc và đã tiền xử lý của chúng.

6 Tập dữ liệu ung thư vú có sẵn tại archive.ics.uci.edu/ml/datasets/Breast

+Cancer+Wisconsin+(Diagnostic).

Để bài báo giữ được sự tập trung, chỉ những điểm nổi bật của kết quả thí nghiệm thu được với cả hai tập dữ liệu được thảo luận trong phần thân chính của bài báo này. Các chi tiết khác của các thí nghiệm được trình bày trong Phụ lục A cho tập dữ liệu German Credit, và Phụ lục B cho tập dữ liệu QSAR Biodegradation.

Như mong đợi, các kết quả theo khuôn mẫu tương tự với kết quả thu được với tập dữ liệu Pima diabetes. Ngoài các thí nghiệm với Naïve Bayes vốn cho kết quả hỗn hợp trên các chỉ số hiệu năng, tất cả các thí nghiệm liên quan đến dữ liệu IQRd+SMOTEd đều cho kết quả tốt nhất trong các nhóm bộ phân loại tương ứng của chúng. Cụ thể, SVM-RBF được huấn luyện với IQRd+SMOTEd cho hiệu năng tổng thể tốt nhất trên cả hai tập dữ liệu thí nghiệm, tức là German Credit và QSAR Biodegradation. Cũng cần lưu ý rằng hiệu năng với IQRd+SMOTEd (trừ các thí nghiệm với Naïve Bayes) tốt hơn hoặc gần khớp với cơ sở (baseline). Điều này được thể hiện rõ trong các Bảng A.1 và B.1 đính kèm.

Đối với mỗi bộ phân loại được xem xét trong nghiên cứu này, chúng tôi cũng kiểm tra mức ý nghĩa của cải thiện giữa mô hình được huấn luyện IQRd+SMOTEd và các mô hình khác. Một lần nữa, khác biệt có ý nghĩa được quan sát trong hầu hết các trường hợp, đặc biệt khi so với các bộ phân loại được huấn luyện với dữ liệu gốc, nhưng không phải với các phiên bản SMOTEd của chúng như thể hiện trong các Bảng A.2 và B.2 đính kèm. Mặc dù phương pháp của chúng tôi không phải lúc nào cũng dẫn đến khác biệt có ý nghĩa,

7 Dữ liệu German credit có sẵn tại archive.ics.uci.edu/ml/datasets/statlog

+(german+credit+data).

8 Dữ liệu QSAR Biodegradation có sẵn tại archive.ics.uci.edu/ml/datasets/ QSAR+biodegradation.

Bảng 7 Kết quả so sánh với các nghiên cứu trước dựa trên Accuracy

.

Bảng 8 Kết quả so sánh với các nghiên cứu trước dựa trên G-Mean, AUC và F-Score

| Tác giả/bài báo             | Phương pháp                                                                                                                                                                                                          | Accuracy                                                                                         |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| Our work                    | C4.5 ( IQRd+SMOTEd ) Validation: 10-fold CV                                                                                                                                                                         | 89.5%                                                                                            |
| Winiarski [36]              | Comparative study with 60 different classifiers Validation: undisclosed                                                                                                                                             | Range= 59.5-77.7%                                                                                |
| Polat et al. [37]           | • Least Square Support Vector Machine (LS-SVM) • Ensemble of Generalised Discriminant Analysis (GDA) and LS-SVM Validation: 10-fold CV                                                                              | • LS-SVM=78.21% • GDA+LS-SVM=82%                                                                 |
| Kayaer and Yildirim [35]    | • General Regression Neural Network (GRNN) • Radial Basis Function (RBF) • Levenberg-Marquardt (LM) • Gradient Descent (GD) • GD with momentum (M) • GD with M and adaptive learning rate (ALR) • BFGS quasi Newton | • GRNN=80.21% • RBF=68.23% • LM=77.08% • GD=77.60% • GD+M=76.56% • GD+M+ADL=77.60% • BFGS=77.08% |
| Temurtas et al. [38]        | • MLNN+LN (576:192) • PNN (576:192) • MLNN+LN (10-fold CV) • PNN (10-fold CV)                                                                                                                                       | • MLNN+LN=82.37% • PNN=78.13% • MLNN+LN=79.62% • PNN=78.05%                                      |
| Carpenter and Markuzon [33] | ARTMAP-Instance Counting (ARTMAP-IC) Validation: hold-out (576:192)                                                                                                                                                 | ARTMAP-IC=81%                                                                                    |
| Deng and Kasabov [34]       | Evolving Self Organising Maps (ESOM) Validation: 10-fold CV                                                                                                                                                         | ESOM=78.4%                                                                                       |
| Ramezani et al. [39]        | Logistic Adaptive Network-based Fuzzy Inference System (LANFIS) Validation: 3-fold CV                                                                                                                               | LANFIS=88.05%                                                                                    |

.

Bảng 9

| Tác giả/bài báo                 |   AUC (%) |   G-mean (%) | F-Score (%)   |
|---------------------------------|-----------|--------------|---------------|
| Our work - C4.5 ( IQRd+SMOTEd ) |      94.6 |         88.8 | 89.5          |
| Nanni et al. [53]               |      84.2 |         75.8 | 69.2          |
| Raghuwanshi and Shukla [54]     |      81.6 |         75.8 | N/A           |

Kết quả so sánh với dữ liệu ung thư vú dựa trên F-Score.

| Phương pháp/tác giả                      |   F-Score (%) |
|------------------------------------------|---------------|
| Our work - Random Forest ( IQRd+SMOTEd ) |          94.7 |
| RanE [55]                                |          92.3 |
| SemE [55]                                |          93.6 |
| SupE (with SemE) [55]                    |          86.5 |
| SupE (without SemE) [55]                 |          95.1 |

Bảng 10 Đặc điểm của hai tập dữ liệu được dùng để kiểm định phương pháp trong các lĩnh vực khác.

| Dữ liệu/biến thể | Dữ liệu/biến thể |   Dương tính |   Âm tính |   Tổng |
|------------------|------------------|------------|------------|---------|
| Credit           | Original         |        700 |        300 |    1000 |
|                  | SMOTEd           |        700 |        690 |    1390 |
|                  | IQRd+SMOTEd      |        722 |        723 |    1445 |
| Biodeg           | Original         |        356 |        699 |    1055 |
|                  | SMOTEd           |        697 |        699 |    1396 |
|                  | IQRd+SMOTEd      |        946 |        948 |    1894 |

khác biệt, nó chắc chắn tạo ra một dạng cải thiện nào đó ở tất cả các bộ phân loại trừ Naïve Bayes. Hiệu năng như vậy cung cấp một nền tảng có thể được xây dựng thêm để cải thiện hơn nữa. Ví dụ, các bộ phân loại cải thiện hiệu năng nhưng không đủ để tạo ra khác biệt có ý nghĩa có thể được tối ưu nội bộ để cải thiện Accuracy dự đoán.

Chúng tôi biết từ các Bảng A.1 và B.1 rằng SVM-RBF được huấn luyện với IQRd+SMOTEd cho kết quả tốt nhất. Để chứng minh bằng thực nghiệm mức ý nghĩa của cải thiện này, so với các mô hình hiệu năng tốt nhất từ các bộ phân loại khác, bao gồm các mô hình cơ sở - AdaBoostM1 và Random Forest; chúng tôi đã thực hiện một kiểm định McNemar để so sánh các dự đoán của chúng. Các kết quả được thể hiện trong các Bảng A.3 và B.3 đính kèm. Một lần nữa, các kết quả rất giống với kết quả thu được với dữ liệu Pima diabetes. Hiệu năng của SVM-RBF được huấn luyện với dữ liệu IQRd+SMOTEd dẫn đến cải thiện đáng kể ở tất cả trừ một bộ phân loại, tức là Random Forest trong Bảng B.3 đính kèm. Tuy nhiên, kết quả là một dấu hiệu rõ ràng rằng với bộ phân loại phù hợp, các mô hình được huấn luyện bằng phương pháp tiền xử lý dữ liệu có chọn lọc được trình bày trong nghiên cứu này nhìn chung phản ứng tích cực với mất cân bằng lớp và điểm ngoại lai.

## 5. Kết luận

Các thí nghiệm trình bày trong bài báo này đã chứng minh trực giác của chúng tôi rằng phương pháp tiền xử lý dữ liệu có chọn lọc được đề xuất trong bài báo này có thể được dùng để đạt Accuracy cao hơn so với công trình hiện có thực hiện với dữ liệu Pima diabetes. Để đạt được điều này, chúng tôi đã khảo sát các tác động của điểm ngoại lai và mất cân bằng dữ liệu lên hiệu năng phân loại. Lý do kết hợp hai yếu tố này là vì bằng chứng từ tài liệu gợi ý rằng mất cân bằng lớp không phải là nguồn duy nhất gây khó khăn học tập từ dữ liệu huấn luyện trong các nhiệm vụ phân loại. Trước tiên chúng tôi phân tích toàn bộ phân bố dữ liệu để kiểm tra các yếu tố khác ngoài mất cân bằng lớp, có khả năng gây phân loại sai. Điều này dẫn đến các điểm ngoại lai vốn thường thưa thớt trong dữ liệu huấn luyện, do đó khó cho các bộ phân loại nắm bắt. Như một giải pháp, chúng tôi nhận diện các điểm ngoại lai bằng thuật toán IQR, tăng cường sự hiện diện của chúng thông qua tăng mẫu và xử lý mất cân bằng lớp bằng SMOTE. Bằng cách ban đầu tăng mẫu các điểm ngoại lai và sau đó tạo các mẫu trong phân bố lân cận của chúng thông qua SMOTE, phương pháp đề xuất mang lại cho các thuật toán học khả năng nhìn rộng hơn về các mẫu thưa thớt và do đó một nền tảng học tốt hơn để cải thiện hiệu năng.

Các thí nghiệm với Naïve Bayes, SVM-RBF, C4.5 và RIPPER cho thấy phương pháp tiền xử lý dữ liệu có chọn lọc của chúng tôi áp dụng cho cây quyết định C4.5 cho kết quả tốt hơn ba bộ phân loại còn lại với 89.5% Accuracy, 90% Precision, 89.4% Recall, 89.5% F-score và 83.5% Kappa. Các kết quả này cũng tốt hơn các thí nghiệm cơ sở được thực hiện với AdaBoostM1 và Random Forest. Thật vậy, đại đa số các thí nghiệm được báo cáo về dự đoán đái tháo đường chỉ nâng Accuracy phân loại lên đến 82% [61], thấp hơn 7.5% so với kết quả của chúng tôi. Tuy nhiên, không phải tất cả nghiên cứu dự đoán đái tháo đường có sẵn trong tài liệu đều dựa trên cùng tập dữ liệu áp dụng cho nghiên cứu của chúng tôi, vì vậy chúng tôi đã xác định những nghiên cứu có cùng tập dữ liệu và so sánh kết quả. Tìm kiếm cho thấy tổng cộng 71 nghiên cứu khai thác cùng tập dữ liệu, với kết quả Accuracy dao động từ 59.5% đến 88.05%. Điều này rõ ràng cho thấy cách tiếp cận của chúng tôi đã tăng Accuracy trong khoảng từ 1.45% đến 30%. Bằng cách phơi bày có chọn lọc cho SMOTE tri thức về các điểm ngoại lai (bất kể lớp nào), phương pháp của chúng tôi dẫn đến hiệu năng được cải thiện. Điều này cũng đúng khi

## Phụ lục A. Dữ liệu tín dụng Đức

Dữ liệu German credit từ lĩnh vực tài chính được dùng để xác định một người có đáng tin cậy về tín dụng hay không. Dữ liệu chứa 1000 mẫu, mỗi mẫu có 20 đặc trưng đặc trưng cho các mẫu như tuổi (age), việc làm (employment), v.v. Phiên bản SMOTEd của dữ liệu được tạo ra bằng cách đơn giản tăng mẫu lớp thiểu số thêm 130% bằng SMOTE. Từ phiên bản gốc, chúng tôi nhận diện 25 điểm ngoại lai bằng thuật toán IQR. Các điểm này được tăng mẫu (có hoàn lại) thêm 200% để sinh thêm 50 điểm và sau đó được thêm trở lại dữ liệu, tức là tổng cộng 75 điểm ngoại lai hiện tồn tại. Cuối cùng, lớp thiểu số được tăng mẫu thêm 105% bằng SMOTE để tạo ra phiên bản IQRd+SMOTEd của dữ liệu.

Các kết quả được trình bày trong các Bảng A.1-A.3. Chúng tôi dùng kiểu chữ in đậm để chỉ ra hiệu năng tốt nhất trong các nhóm bộ phân loại, và dấu ' ★ ' để chỉ ra khác biệt có ý nghĩa thống kê.

Bảng A.1

Hiệu năng bộ phân loại với các phiên bản gốc và đã tiền xử lý của tập dữ liệu credit.

| Bộ phân loại/dữ liệu | Bộ phân loại/dữ liệu |   Accuracy |   Precision |   Recall |   F-Score | Kappa   |
|-------------------|-------------------|------------|-------------|----------|-----------|---------|
| Baseline          | AdaBoostM1        |      0.719 |       0.688 |    0.714 |     0.687 | -0.735  |
|                   | Random Forest     |      0.772 |       0.758 |    0.767 |     0.750 | - 0.274 |
| Naïve Bayes       | Original          |      0.762 |       0.752 |    0.759 |     0.754 | 0.059   |
|                   | SMOTEd            |      0.743 |       0.753 |    0.741 |     0.764 | 0.234   |
|                   | IQRd+SMOTEd       |      0.759 |       0.762 |    0.757 |     0.759 | 0.223   |
| SVM-RBF           | Original          |      0.716 |       0.689 |    0.708 |     0.615 | -8.793  |
|                   | SMOTEd            |      0.939 |       0.939 |    0.939 |     0.939 | 0.798   |
|                   | IQRd+SMOTEd       |      0.953 |       0.953 |    0.953 |     0.953 | 0.843   |
| RIPPER            | Original          |      0.735 |       0.718 |    0.731 |     0.721 | -0.173  |
|                   | SMOTEd            |      0.770 |       0.770 |    0.768 |     0.769 | 0.236   |
|                   | IQRd+SMOTEd       |      0.772 |       0.775 |    0.770 |     0.772 | 0.272   |
| C4.5              | Original          |      0.719 |       0.698 |    0.715 |     0.702 | -0.784  |
|                   | SMOTEd            |      0.819 |       0.818 |    0.817 |     0.817 | 0.380   |

so với việc tăng mẫu đồng đều lớp thiểu số, không có lựa chọn điểm ngoại lai.

Như một sự kiểm định trong các lĩnh vực khác, chúng tôi đã áp dụng phương pháp của mình cho hai tập dữ liệu không liên quan đến lĩnh vực y tế. Lần này, SVM-RBF thay vì C4.5 cho kết quả tốt nhất và hiệu năng nhất quán tốt hơn với phương pháp tiền xử lý dữ liệu của chúng tôi, ở tất cả các bộ phân loại trừ Naïve Bayes. Trong tương lai, chúng tôi dự định phát triển phương pháp tiền xử lý dữ liệu thành một công cụ độc lập nhận diện và nhúng tri thức điểm ngoại lai vào phiên bản tiêu chuẩn của thuật toán SMOTE. Điều này sẽ cho phép chúng tôi so sánh giữa phương pháp của mình và các phiên bản khác của thuật toán SMOTE được mô tả trong Phần 2. Chúng tôi cũng dự định điều tra lý do tại sao Naïve Bayes không phản ứng tốt với phương pháp. Có lẽ hướng nghiên cứu này sẽ cung cấp các khuôn mẫu hữu ích có thể được dùng để xác định, dựa trên một tập dữ liệu cho trước, các bộ phân loại khác nhau sẽ phản ứng với phương pháp như thế nào.

## Xung đột lợi ích

## Không có khai báo nào.

## Lời cảm ơn

Nghiên cứu này được thực hiện như một phần của Dự án CROSSMINER, vốn đã nhận được tài trợ từ Chương trình Nghiên cứu và Đổi mới Horizon 2020 của Liên minh Châu Âu theo Thỏa thuận Tài trợ Số 732223.

Bảng A.2

Kiểm định McNemar thể hiện các khác biệt hiệu năng giữa các phiên bản dữ liệu credit. Mỗi tập dữ liệu ở cột thứ hai được so sánh với IQRd+SMOTEd.

Bảng A.3 SVM-RBF được huấn luyện IQRd+SMOTEd

| Classifier/data                                    | Classifier/data                                    | Nff                                                                                                             | N fs                                                                                                            | N sf                                                                                                            | N ss                                                                                                            | diff                                                                                                            | 95% CI                                                                                                          | P -value                                                                                                        |
|----------------------------------------------------|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| NB                                                 | Original SMOTEd                                    | 173 97                                                                                                          | 65 161                                                                                                          | 78 144                                                                                                          | 694 598                                                                                                         | -0.30 1.70                                                                                                      | [-2.56, 1.96] [-1.72, 5.12]                                                                                     | 0.8624 0.3596                                                                                                   |
| SVM                                                | Original SMOTEd                                    | 16 31                                                                                                           | 268 30                                                                                                          | 31 16                                                                                                           | 685 923                                                                                                         | 23.70 1.40                                                                                                      | [20.65, 26.75] [0.073, 2.73]                                                                                    | <0.0001 ★ 0.0541                                                                                                |
| RIPPER                                             | Original SMOTEd                                    | 145 142                                                                                                         | 120 88                                                                                                          | 83 86                                                                                                           | 652 684                                                                                                         | 3.70 0.20                                                                                                       | [0.92, 6.48] [-2.39, 2.79]                                                                                      | 0.0113 ★ 0.9396                                                                                                 |
| C4.5                                               | Original SMOTEd                                    | 109 126                                                                                                         | 172 55                                                                                                          | 55 38                                                                                                           | 664 781                                                                                                         | 11.70 1.70                                                                                                      | [8.84, 14.56] [-0.19, 3.59]                                                                                     | <0.0001 ★ 0.0966                                                                                                |
| Nff : both models failed N : both models succeeded | Nff : both models failed N : both models succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded | N fs : IQRd+SMOTEd succeeded and the other model failed N sf : IQRd+SMOTEd failed and the other model succeeded |

so với bộ phân loại tốt nhất trong các bộ khác bao gồm các mô hình cơ sở (Credit).

| Classifier                                                                             |   N ff | N fs                                                         | N sf    | N ss                 | diff                                                         | 95% CI                                                       | P -value                                                     |
|----------------------------------------------------------------------------------------|--------|--------------------------------------------------------------|---------|----------------------|--------------------------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
| AdaBoostM1 vs SVM-RBF Random Forest vs NB vs SVM-RBF RIPPER vs SVM-RBF C4.5 vs SVM-RBF |     14 | 267                                                          | 33      | 686                  | 23.40                                                        | [20.33, 26.47]                                               | <0.0001 ★                                                    |
| SVM-RBF                                                                                |      9 | 219                                                          | 38      | 734                  | 18.10                                                        | [15.16, 21.04]                                               | <0.0001 ★                                                    |
|                                                                                        |     10 | 228                                                          | 37      | 725                  | 19.10                                                        | [16.14, 22.06]                                               | <0.0001 ★                                                    |
|                                                                                        |     10 | 218                                                          | 37      | 735                  | 18.10                                                        | [15.18, 21.02]                                               | <0.0001 ★                                                    |
|                                                                                        |     14 | 150                                                          | 33      | 803                  | 11.70                                                        | [9.15, 14.25]                                                | <0.0001 ★                                                    |
| Nff : both models failed N ss : both models succeeded                                  |        | N fs : C4.5 succeeded and the other classifier failed N sf : | and the | classifier succeeded | N fs : C4.5 succeeded and the other classifier failed N sf : | N fs : C4.5 succeeded and the other classifier failed N sf : | N fs : C4.5 succeeded and the other classifier failed N sf : |

## Phụ lục B. Dữ liệu phân hủy sinh học QSAR

Dữ liệu QSAR Biodegradation từ lĩnh vực hóa học được dùng để phân loại các hóa chất thành các phân tử dễ phân hủy sinh học (ready) và không dễ phân hủy sinh học (non-ready). Dữ liệu chứa 1055 mẫu, mỗi mẫu có 41 mô tả phân tử làm đặc trưng. Phiên bản SMOTEd của dữ liệu được tạo ra bằng cách đơn giản tăng mẫu lớp thiểu số thêm 96% bằng SMOTE. Từ phiên bản gốc, chúng tôi nhận diện 366 điểm ngoại lai bằng thuật toán IQR. Các điểm này được tăng mẫu (không hoàn lại) thêm 100% để sinh thêm 366 điểm và sau đó được thêm trở lại dữ liệu, tức là tổng cộng 732 điểm ngoại lai hiện tồn tại. Cuối cùng, lớp thiểu số được tăng mẫu thêm 100% bằng SMOTE để tạo ra phiên bản IQRd+SMOTEd của dữ liệu.

Các kết quả được trình bày trong các Bảng B.1-B.3. Chúng tôi dùng kiểu chữ in đậm để chỉ ra hiệu năng tốt nhất trong các nhóm bộ phân loại, và dấu ' ★ ' để chỉ ra khác biệt có ý nghĩa thống kê.

Bảng B.1

Hiệu năng bộ phân loại với các phiên bản gốc và đã tiền xử lý của tập dữ liệu Biodegradation.

| Bộ phân loại/dữ liệu | Bộ phân loại/dữ liệu |   Accuracy |   Precision |   Recall |   F-Score |   Kappa |
|-------------------|-------------------|------------|-------------|----------|-----------|---------|
| Baseline          | AdaBoostM1        |      0.811 |       0.813 |    0.811 |     0.812 |   0.711 |
|                   | Random Forest     |      0.857 |       0.857 |    0.857 |     0.857 |   0.783 |
| Naïve Bayes       | Original          |      0.759 |       0.825 |    0.759 |     0.766 |   0.493 |
|                   | SMOTEd            |      0.756 |       0.817 |    0.756 |     0.763 |   0.498 |
|                   | IQRd+SMOTEd       |      0.743 |       0.815 |    0.743 |     0.750 |   0.447 |
| SVM-RBF           | Original          |      0.850 |       0.848 |    0.850 |     0.848 |   0.786 |
|                   | SMOTEd            |      0.874 |       0.878 |    0.874 |     0.875 |   0.801 |
|                   | IQRd+SMOTEd       |      0.885 |       0.890 |    0.885 |     0.887 |   0.817 |
| RIPPER            | Original          |      0.822 |       0.819 |    0.822 |     0.818 |   0.748 |
|                   | SMOTEd            |      0.842 |       0.846 |    0.842 |     0.843 |   0.751 |
|                   | IQRd+SMOTEd       |      0.858 |       0.864 |    0.858 |     0.860 |   0.772 |
| C4.5              | Original          |      0.824 |       0.824 |    0.824 |     0.824 |   0.734 |
|                   | SMOTEd            |      0.853 |       0.857 |    0.853 |     0.854 |   0.769 |
|                   | IQRd+SMOTEd       |      0.856 |       0.862 |    0.856 |     0.858 |   0.769 |

Bảng B.2 Kiểm định McNemar thể hiện các khác biệt hiệu năng giữa các phiên bản dữ liệu Biodegradation. Mỗi tập dữ liệu ở cột thứ hai được so sánh với IQRd+SMOTEd

.

Bảng B.3

| Classifier/data          | Classifier/data          | Nff                                                     | N fs                                                    | N sf                                                    | N ss                                                    | diff                                                    | 95% CI                                                  | P -value                                                |
|--------------------------|--------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------|
| NB                       | Original SMOTEd          | 81 247                                                  | 173 10                                                  | 190 24                                                  | 611 774                                                 | -1.61 -1.33                                             | [-5.15, 1.93] [-2.41, -0.25]                            | 0.4011 0.0243 ★                                         |
| SVM                      | Original SMOTEd          | 22 103                                                  | 136 30                                                  | 99 18                                                   | 798 904                                                 | 3.51 1.14                                               | [0.67, 6.35] [-0.15, 2.42]                              | 0.0187 ★ 0.1114                                         |
| RIPPER                   | Original SMOTEd          | 30 82                                                   | 158 85                                                  | 120 68                                                  | 747 820                                                 | 3.60 1.61                                               | [0.51, 6.69] [-0.68, 3.91]                              | 0.0263 ★ 0.1957                                         |
| C4.5                     | Original SMOTEd          | 27 84                                                   | 159 71                                                  | 125 68                                                  | 744 832                                                 | 3.22 0.28                                               | [0.098, 6.35] [-1.91, 2.47]                             | 0.0500 0.8654                                           |
| Nff : both models failed | Nff : both models failed | N fs : IQRd+SMOTEd succeeded and the other model failed | N fs : IQRd+SMOTEd succeeded and the other model failed | N fs : IQRd+SMOTEd succeeded and the other model failed | N fs : IQRd+SMOTEd succeeded and the other model failed | N fs : IQRd+SMOTEd succeeded and the other model failed | N fs : IQRd+SMOTEd succeeded and the other model failed | N fs : IQRd+SMOTEd succeeded and the other model failed |

SVM-RBF được huấn luyện IQRd+SMOTEd so với bộ phân loại tốt nhất trong các bộ khác bao gồm các mô hình cơ sở (tập dữ liệu biodegeneration).

| Classifier                   |   N ff | N fs                                                  | N sf                                                  | N ss                                                  | diff                                                  | 95% CI         | P -value   |
|------------------------------|--------|-------------------------------------------------------|-------------------------------------------------------|-------------------------------------------------------|-------------------------------------------------------|----------------|------------|
| AdaboostM1 vs SVM-RBF        |     21 | 178                                                   | 1- 00                                                 | 756                                                   | 7.39                                                  | [4.33, 10.46]  | <0.00001 ★ |
| Random Forest vs SVM-RBF     |     15 | 136                                                   | 1- 06                                                 | 798                                                   | 2.84                                                  | [-0.041, 5.73] | 0.0621     |
| NB vs SVM-RBF                |     31 | 223                                                   | 90                                                    | 711                                                   | 12.61                                                 | [9.41, 15.80]  | <0.0001 ★  |
| RIPPER vs SVM-RBF            |     68 | 82                                                    | 53                                                    | 852                                                   | 2.75                                                  | [0.60, 4.90]   | 0.0158 ★   |
| C4.5 vs SVM-RBF              |     65 | 87                                                    | 56                                                    | 847                                                   | 2.94                                                  | [0.72, 5.15]   | 0.0118 ★   |
| N ff : both models failed    |        | N fs : C4.5 succeeded and the other classifier failed | N fs : C4.5 succeeded and the other classifier failed | N fs : C4.5 succeeded and the other classifier failed | N fs : C4.5 succeeded and the other classifier failed |                |            |
| N ss : both models succeeded |        | N sf : C4.5 failed and the other classifier succeeded | N sf : C4.5 failed and the other classifier succeeded | N sf : C4.5 failed and the other classifier succeeded | N sf : C4.5 failed and the other classifier succeeded |                |            |

## Tài liệu tham khảo

- [1] Zhai J, Zhang S, Wang C. The classification of imbalanced large data sets based on mapreduce and ensemble of elm classifiers. Int J Mach Learn Cybern 2017;8(3):1009-17. https://doi.org/10.1007/s13042-015-0478-7.
- [2] Diabetes UK. Number of people with diabetes up 60 per cent in last decade. 2015 [accessed 29 July 2017]. https://www.diabetes.org.uk/About\_us/News/diabetesup-60-per-cent-in-last-decade-/.
- [3] Czarnecki WM, Tabor J. Extreme entropy machines: robust information theoretic classification. Pattern Anal Appl 2017;20(2):383-400. https://doi.org/10.1007/ s10044-015-0497-8.
- [4] Skryjomski P, Krawczyk B. Influence of minority class instance types on smote imbalanced data oversampling. In: Torgo L, Krawczyk B, Branco P, Moniz N, editors. Proceedings of the first international workshop on learning with imbalanced domains: theory and applications (LIDTA 2017), Vol. 74 of proceedings of machine learning research, PMLR. Skopje, Macedonia: ECML-PKDD; 2017. p. 7-21http:// proceedings.mlr.press/v74/skryjomski17a.html.
- [5] Krawczyk B. Learning from imbalanced data: open challenges and future directions. Prog Artif Intell 2016;5(4):221-32. https://doi.org/10.1007/s13748-016-0094-0.
- [6] Ferdowsi H, Jagannathan S, Zawodniok M. An online outlier identification and removal scheme for improving fault detection performance. IEEE Trans Neural Netw Learn Syst 2014;25(5):908-19. https://doi.org/10.1109/TNNLS.2013. 2283456.
- [7] Kaneda Y, Pei Y, Zhao Q, Liu Y. Improving the performance of the decision boundary making algorithm via outlier detection. J Inform Process 2015;23(4):497-504. https://doi.org/10.2197/ipsjjip.23.497.
- [8] Dua D, Graff C. UCI machine learning repository. 2017http://archive.ics.uci. edu/ml.
- [9] Upton G, Cook I. Understanding statistics. Oxford University Press; 1996.
- [10] Cochran WG. Sampling techniques. 3rd Edition John Wiley; 1977.
- [11] Chawla NV, Bowyer KW, Hall LO, Kegelmeyer WP. Smote: synthetic minority oversampling technique. J Artif Intell Res 2002;16(1):321-57http://dl.acm.org/ citation.cfm?id=1622407.1622416.
- [12] Diabetes UK. Diabetes: facts and stats. 2015 [accessed 6 May 2018]. https://www. mrc.ac.uk/documents/pdf/diabetes-uk-facts-and-stats-june-2015/.
- [13] Roche MM, Wang PP. Factors associated with a diabetes diagnosis and late diabetes diagnosis for males and females. J Clin Transl Endocrinol 2014;1(3):77-84. https:// doi.org/10.1016/j.jcte.2014.07.002.
- [14] Holt TA, Stables D, Hippisley-Cox J, O'Hanlon S, Majeed A. Identifying undiagnosed diabetes: cross-sectional survey of 3.6 million patients' electronic records. Br J Gen

Pract 2008;58(548):192-6. https://doi.org/10.3399/bjgp08X277302.

- [15] Holt TA, Gunnarsson CL, Cload PA, Ross SD. Identification of undiagnosed diabetes and quality of diabetes care in the united states: cross-sectional study of 11.5 million primary care electronic records. CMAJ Open 2014;2(4):E248-55. https://doi. org/10.9778/cmajo.20130095.
- [16] Leong A, Dasgupta K, Chiasson J-L, Rahme E. Estimating the population prevalence of diagnosed and undiagnosed diabetes. Diabetes Care 2013;36(10):3002-8. https://doi.org/10.2337/dc12-2543.
- [17] Bagheri N, McRae I, Konings P, Butler D, Douglas K, Del Fante P, et al. Undiagnosed diabetes from cross-sectional gp practice data: an approach to identify communities with high likelihood of undiagnosed diabetes. BMJ Open 2014;4:e005305. https:// doi.org/10.1136/bmjopen-2014-005305.
- [18] Sentell T, Cheng Y, Saito E, Seto T, Miyamura J, Mau M, et al. The burden of diagnosed and undiagnosed diabetes in native Hawaiian and Asian American hospitalized patients. J Clin Transl Endocrinol 2015;2(4):115-24. https://doi.org/10. 1016/j.jcte.2015.08.002.
- [19] Selvin E, Wang D, Lee A, Bergenstal RM, Coresh J. Identifying trends in undiagnosed diabetes in U.S. adults by using a confirmatory definition: a cross-sectional study. Ann Intern Med 2017;167(11):769-76. https://doi.org/10.7326/M171272.
- [20] Knowler WC, Barrett-Connor E, Fowler SE, Hamman RF, Lachin JM, Walker EA, et al. Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin. N Engl J Med 2002;346(6):393-403. https://doi.org/10.1056/ NEJMoa012512.
- [21] Knowler WC, Fowler SE, Hamman RF, Christophi CA, Hoffman HJ, Brenneman AT, et al. 10-year follow-up of diabetes incidence and weight loss in the diabetes prevention program outcomes study. Lancet 2009;374(9702):1677-86. https://doi. org/10.1016/S0140-6736(09)61457-4.
- [22] The 10-year cost-effectiveness of lifestyle intervention or metformin for diabetes prevention. Diabetes Care 2012;35(4):723-30. https://doi.org/10.2337/dc111468.
- [23] Rohwer R, Wynne-Jones M, Wysotzki F. Neural networks, Ellis Horwood series in artificial intelligence. Ellis Horwood; 1994. p. 84-106 The above book (originally published in 1994 by Ellis Horwood) is now out of print. The copyright now resides with the editors who have decided to make the material freely available on the web http://www1.maths.leeds.ac.uk/charles/statlog/.
- [24] Quinlan JR. C4. 5: Programs for Machine Learning. San Francisco, CA, USA: Morgan Kaufmann Publishers Inc; 1993.
- [25] John GH, Langley P. Estimating continuous distributions in Bayesian classifiers. Proceedings of the eleventh conference on uncertainty in artificial intelligence, UAI'95. San Francisco, CA, USA: Morgan Kaufmann Publishers Inc; 1995. p.

338-45http://dl.acm.org/citation.cfm?id=2074158.2074196.

- [26] Cohen WW. Fast effective rule induction. Proceedings of the twelfth international conference on international conference on machine learning, ICML'95. San Francisco, CA, USA: Morgan Kaufmann Publishers Inc; 1995. p. 115-23http://dl. acm.org/citation.cfm?id=3091622.3091637.
- [27] Cohen J. A coefficient of agreement for nominal scales. Educ Psychol Meas 1960;20(1):37-46. https://doi.org/10.1177/001316446002000104.
- [28] Freund Y, Schapire RE. Experiments with a new boosting algorithm. Proceedings of the thirteenth international conference on international conference on machine learning, ICML'96. San Francisco, CA, USA: Morgan Kaufmann Publishers Inc; 1996. p. 148-56http://dl.acm.org/citation.cfm?id=3091696.3091715.
- [29] Breiman L. Random forests. Mach Learn 2001;45(1):5-32. https://doi.org/10. 1023/A:1010933404324.
- [30] Diabetes UK. Diabetes prevalence. 2017 [accessed 29 July 2017]. http://www. diabetes.co.uk/diabetes-prevalence.html.
- [31] Kavakiotis I, Tsave O, Salifoglou A, Maglaveras N, Vlahavas I, Chouvarda I. Machine learning and data mining methods in diabetes research. Comput Struct Biotechnol J 2017;15:104-16. https://doi.org/10.1016/j.csbj.2016.12.005.
- [32] Cao XH, Stojkovic I, Obradovic Z. A robust data scaling algorithm to improve classification accuracies in biomedical data. BMC Bioinformatics 2016;17(1):359. https://doi.org/10.1186/s12859-016-1236-x.
- [33] Carpenter GA, Markuzon N. Artmap-ic and medical diagnosis: Instance counting and inconsistent cases. Neural Netw: Off J Int Neural Netw Soc 1998;11(2):323-36.
- [34] Deng D, Kasabov N. On-line pattern analysis by evolving self-organizing maps. Neurocomputing 2003;51:87-103. https://doi.org/10.1016/S0925-2312(02) 00599-4.
- [35] Kayaer K, Yildirim T. Medical diagnosis on pima indian diabetes using general regression neural networks. Proceedings of the international conference on artificial neural networks and neural information processing (ICANN/ICONIP) 2003:181-4.
- [36] Winiarski T. Pima diabetes. 2003 [accessed 15 October 2018]. http://www.is.umk. pl/twin/pima\_res.html.
- [37] Polat K, Günes S, Arslan A. A cascade learning system for classification of diabetes disease: generalized discriminant analysis and least square support vector machine. Expert Syst Appl 2008;34(1):482-7. https://doi.org/10.1016/j.eswa.2006.09.012.
- [38] Temurtas H, Yumusak N, Temurtas F. A comparative study on diabetes disease diagnosis using neural networks. Expert Syst Appl 2009;36(4):8610-5. https://doi. org/10.1016/j.eswa.2008.10.032.
- [39] Ramezani R, Maadi M, Khatami SM. A novel hybrid intelligent system with missing value imputation for diabetes diagnosis. Alexandria Eng J 2017. https://doi.org/10. 1016/j.aej.2017.03.043.
- [40] Carpenter GA, GrossBerg S. Pattern Recognition by Self-organizing Neural Networks. Massachusetts: MIT Press; 1991.
- [41] Carpenter GA, Grossberg S, Reynolds JH. ARTMAP: supervised real-time learning and classification of nonstationary data by a self-organizing neural network. Neural Netw 1991;4(5):565-88. https://doi.org/10.1016/0893-6080(91)90012-T.
- [42] Carpenter GA, GrossBerg S, Markuzon N, Reynolds JH, Rosen DB. Fuzzy ARTMAP: a neural network architecture for incremental supervised learning of analog multidimensional maps. IEEE Trans Neural Netw 1992;3(5):698-713.
- [43] Chawla NV, Lazarevic A, Hall LO, Bowyer KW. Smoteboost: improving prediction of the minority class in boosting. In: Lavrač N, Gamberger D, Todorovski L, Blockeel H, editors. Knowledge discovery in databases: PKDD 2003. Berlin, Heidelberg: Springer Berlin Heidelberg; 2003. p. 107-19.
- [44] Han H, Wang W-Y, Mao B-H. Borderline-smote: a new over-sampling method in imbalanced data sets learning. In: Huang D-S, Zhang X-P, Huang G-B, editors. Advances in intelligent computing. Berlin, Heidelberg: Springer Berlin Heidelberg; 2005. p. 878-87.
- [45] Bunkhumpornpat C, Sinapiromsaran K, Lursinsap C. Safe-level-smote: safe-levelsynthetic minority over-sampling technique for handling the class imbalanced problem. In: Theeramunkong T, Kijsirikul B, Cercone N, Ho T-B, editors. Advances in knowledge discovery and data mining. Berlin, Heidelberg: Springer Berlin Heidelberg; 2009. p. 475-82.
- [46] Maciejewski T, Stefanowski J. Local neighbourhood extension of smote for mining imbalanced data. 2011 IEEE symposium on computational intelligence and data mining (CIDM) 2011:104-11. https://doi.org/10.1109/CIDM.2011.5949434.
- [47] Barua S, Islam MM, Yao X, Murase K. Mwmote-majority weighted minority oversampling technique for imbalanced data set learning. IEEE Trans Knowl Data Eng 2014;26(2):405-25. https://doi.org/10.1109/TKDE.2012.232.
- [48] Laurikkala J. Improving identification of difficult small classes by balancing class distribution. Proceedings of the 8th conference on AI in medicine in Europe: artificial intelligence medicine, AIME'01. Berlin, Heidelberg: Springer-Verlag; 2001. p. 63-6http://dl.acm.org/citation.cfm?id=648155.757340.
- [49] Liu X-Y, Wu J, Zhou Z-H. Exploratory undersampling for class-imbalance learning. IEEE Trans Syst Man Cybern Part B Cybern 2009;39(2):539-50. https://doi.org/10. 1109/TSMCB.2008.2007853.
- [50] García S, Herrera F. Evolutionary undersampling for classification with imbalanced datasets: proposals and taxonomy. Evol Comput 2009;17(3):275-306. https://doi. org/10.1162/evco.2009.17.3.275.
- [51] Galar M, Fernandez A, Barrenechea E, Bustince H, Herrera F. A review on ensembles for the class imbalance problem: bagging-, boosting-, and hybrid-based approaches. IEEE Trans Syst Man Cybern Part C Appl Rev 2012;42(4):463-84. https://doi.org/ 10.1109/TSMCC.2011.2161285.
- [52] Koziarski M, Wozniak M. Ccr: a combined cleaning and resampling algorithm for imbalanced data classification. Int J Appl Math Comput Sci 2017;27(4):727-36. https://doi.org/10.1515/amcs-2017-0050.
- [53] Nanni L, Fantozzi C, Lazzarini N. Coupling different methods for overcoming the class imbalance problem. Neurocomputing 2015;158:48-61. https://doi.org/10. 1016/j.neucom.2015.01.068.
- [54] Raghuwanshi BS, Shukla S. Class imbalance learning using UnderBagging based kernelized extreme learning machine. Neurocomputing 2019;329:172-87. https:// doi.org/10.1016/j.neucom.2018.10.056.
- [55] Jegierski H, Saganowski S. An 'outside the box' solution for imbalanced data classification. 2019arXiv:1911.06965.
- [56] Stefanowski J, Krawiec K, Wrembel R. Exploring complex and big data. Int J Appl Math Comput Sci 2017;27(4):669-79. https://doi.org/10.1515/amcs-2017-0046.
- [57] Napierała K, Stefanowski J, Wilk S. Learning from imbalanced data in presence of noisy and borderline examples rough sets and current trends in computing. Vol. 6086 of Lecture Notes in Computer Science. Berlin, Heidelberg: Springer Berlin /Heidelberg; 2010. p. 158-67. https://doi.org/10.1007/978-3-642-13529-3\_18 [chapter 18].
- [58] Deza MM, Deza E. Encyclopedia of distances. Springer Berlin Heidelberg; 2009. https://doi.org/10.1007/978-3-642-00234-2\_1.
- [59] Iba W, Langley P. Induction of one-level decision trees. Proceedings of the ninth international workshop on machine learning, ML'92. San Francisco, CA, USA: Morgan Kaufmann Publishers Inc; 1992. p. 233-40http://dl.acm.org/citation.cfm? id=645525.757759.
- [60] McNemar Q. Note on the sampling error of the difference between correlated proportions or percentages. Psychometrika 1947;12(2):153-7. https://doi.org/10. 1007/BF02294363.
- [61] Collins GS, Mallett S, Omar O, Yu L-M. Developing risk prediction models for type 2 diabetes: a systematic review of methodology and reporting. BMC Med 2011;9(1):103. https://doi.org/10.1186/1741-7015-9-103.
