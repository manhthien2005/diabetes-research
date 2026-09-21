<!-- extracted by pdf-extract | engine=docling | pages=12 | ocr=False | tables=3/3 | density=1.01 | score=100 -->

## Một mô hình học máy dựa trên mạng lưới bệnh nhân để dự đoán bệnh: Trường hợp đái tháo đường type 2

Haohui Lu 1 · Shahadat Uddin 1 · Farshid Hajati 2 · MohammadAli Moni 3 · Matloob Khushi 4

Chấp nhận: 13 May 2021 © The Author(s), under exclusive licence to Springer Science+Business Media, LLC, part of Springer Nature 2021 / Xuất bản trực tuyến: 10 June 2021

## Tóm tắt

Trong những năm gần đây, tỷ lệ mắc các bệnh mạn tính như đái tháo đường type 2 (T2DM) đã gia tăng, tạo gánh nặng lớn cho các hệ thống chăm sóc sức khỏe. Trong khi việc theo dõi bệnh nhân định kỳ tốn kém và không thực tế, việc hiểu được tiến triển của bệnh mạn tính và xác định những bệnh nhân có nguy cơ phát triển các bệnh đồng mắc là rất quan trọng. Nghiên cứu này đã sử dụng một bộ dữ liệu yêu cầu bồi thường hành chính (administrative claim dataset) thực tế về T2DM để phát triển một phương pháp tích hợp (ensemble) kết hợp mạng lưới bệnh nhân đổi mới và học máy nhằm dự đoán bệnh. Dữ liệu chăm sóc sức khỏe của 1,028 bệnh nhân T2DM và 1,028 bệnh nhân không mắc T2DM được trích xuất từ dữ liệu đã ẩn danh để dự đoán nguy cơ T2DM. Mô hình được đề xuất dựa trên 'mạng lưới bệnh nhân' (patient network), thể hiện các mối quan hệ tiềm ẩn giữa các tình trạng sức khỏe đối với một nhóm bệnh nhân được chẩn đoán cùng một bệnh bằng cách sử dụng lý thuyết đồ thị (graph theory). Bên cạnh các đặc điểm nhân khẩu học - xã hội và hành vi của bệnh nhân, các thuộc tính của 'mạng lưới bệnh nhân' (ví dụ, độ đo trung tâm - centrality measure) khám phá các đặc trưng tiềm ẩn (latent features) của bệnh nhân, vốn hiệu quả trong dự đoán nguy cơ. Chúng tôi áp dụng tám mô hình học máy (Logistic Regression, K-Nearest Neighbours, Support Vector Machine, Naïve Bayes, Decision Tree, Random Forest, XGBoost và Artificial Neural Network) cho các đặc trưng được trích xuất để dự đoán nguy cơ bệnh mạn tính. Các thử nghiệm mở rộng cho thấy khung được đề xuất với các bộ phân loại học máy có hiệu năng với Diện tích Dưới Đường cong (Area Under Curve - AUC) dao động từ 0.79 đến 0.91. Mô hình Random Forest vượt trội hơn các mô hình khác; trong khi đó, độ đo trung tâm vector riêng (eigenvector centrality) và độ đo trung tâm gần kề (closeness centrality) của mạng lưới và tuổi của bệnh nhân là những đặc trưng quan trọng nhất đối với mô hình. Hiệu năng nổi bật của mô hình của chúng tôi mang lại các ứng dụng tiềm năng đầy hứa hẹn trong các dịch vụ chăm sóc sức khỏe. Đồng thời, chúng tôi cung cấp bằng chứng mạnh mẽ rằng các đặc trưng tiềm ẩn được trích xuất là thiết yếu trong dự đoán nguy cơ bệnh. Phương pháp được đề xuất mang lại hiểu biết quan trọng về dự đoán nguy cơ bệnh mạn tính, có thể mang lại lợi ích cho các nhà cung cấp dịch vụ chăm sóc sức khỏe và các bên liên quan của họ.

Từ khóa Dự đoán bệnh · Đái tháo đường type 2 · Dữ liệu hành chính · Phân tích mạng lưới · Học máy

## 1 Giới thiệu

Đái tháo đường type 2 (T2DM) là một rối loạn chuyển hóa dài hạn với độ thâm nhập cao ở con người trên toàn thế giới [1]. T2DM là một nguyên nhân hàng đầu gây tử vong và góp phần làm tăng các bệnh đồng mắc [2]. Gần 1 triệu người trưởng thành Úc đã mắc T2DM trong giai đoạn 2017-18, và nó gây ra tử vong cho khoảng 3,300 người mỗi năm trong giai đoạn từ 1985 đến 2018. Đồng thời, T2DM là yếu tố đóng góp chính vào gánh nặng bệnh tật của Úc; một lượng đáng kể chi tiêu cho bệnh tật trong hệ thống chăm sóc sức khỏe của Úc được quy cho đái tháo đường [3].

/envelopeback Shahadat Uddin shahadat.uddin@sydney.edu.au

1 School of Project Management, The University of Sydney, Sydney, Australia

2 College of Engineering and Science, Victoria University Sydney, Sydney, Australia

3 School of Public Health and Community Medicine, Faculty of Medicine, The University of New South wales, Sydney, Australia

4 School of Computer Science, The University of Sydney, Sydney, Australia

Mặc dù T2DM là một bệnh không thể đảo ngược, may mắn thay, nó là một bệnh có thể phòng ngừa được [4]. Phát hiện sớm những bệnh nhân có nguy cơ và can thiệp lối sống sẽ làm giảm nguy cơ T2DM. Tuy nhiên, nhiều bệnh nhân không nhận thức được các bệnh mạn tính của mình trong các giai đoạn đầu cho đến khi các triệu chứng xuất hiện hoặc sau đó được chẩn đoán mắc các bệnh đồng mắc [5]. Các bác sĩ đã được chuẩn bị tốt để xác định những người có nguy cơ T2DM. Tuy nhiên, sẽ không thực tế nếu sàng lọc và theo dõi định kỳ mọi bệnh nhân có các tình trạng nguy cơ cao [6, 7]. Trong những năm gần đây, lượng dữ liệu yêu cầu bồi thường hành chính đã tăng vọt. Mặc dù mục đích chính của dữ liệu yêu cầu bồi thường hành chính là truy xuất thông tin bệnh nhân và thực hiện các tác vụ chăm sóc sức khỏe hành chính, nó mang lại cơ hội để áp dụng các mô hình dự đoán thống kê nhằm cải thiện hiệu năng của các hệ thống chăm sóc sức khỏe [2]. Kết quả là, việc dự đoán nguy cơ T2DM bằng dữ liệu yêu cầu bồi thường hành chính và thực hiện các biện pháp để phòng ngừa đái tháo đường có thể giảm đáng kể tỷ lệ mắc và chi phí chăm sóc sức khỏe.

Trong tài liệu, một lượng nghiên cứu đáng kể đã được dành cho việc mô hình hóa nguy cơ dự đoán của các bệnh khác nhau, bao gồm T2DM [8-13] và các tình trạng mạn tính khác [14-17]. Hầu hết các công trình này huấn luyện các mô hình dự đoán bằng cách sử dụng các yếu tố dự báo khác nhau, chẳng hạn như tuổi, chỉ số khối cơ thể, giới tính và các triệu chứng. Họ gán điểm cho các yếu tố dự báo, sau đó sử dụng các điểm số để ước tính tỷ lệ mới mắc T2DM. Đồng thời, dự đoán bệnh bằng dữ liệu chăm sóc sức khỏe gần đây đã cho thấy một ứng dụng tiềm năng cho các phương pháp học máy [18]. Việc áp dụng các kỹ thuật học máy trên dữ liệu yêu cầu bồi thường hành chính cung cấp các công cụ mạnh mẽ cho sức khỏe dân số và tạo ra các giả thuyết lâm sàng để khám phá các yếu tố nguy cơ [19]. Mặc dù các mô hình học máy hiện có có thể nắm bắt bản chất của các bệnh mạn tính, việc dự đoán nguy cơ của một bệnh mạn tính là phức tạp do chia sẻ các yếu tố nguy cơ chung với các tình trạng khác [20, 21]. Các phương pháp hiện có tập trung vào việc sử dụng các phương pháp học máy với các đặc điểm của bệnh nhân để dự đoán nguy cơ của các bệnh mạn tính. Tuy nhiên, các mối quan hệ tiềm ẩn tồn tại giữa các bệnh mạn tính và các bệnh đồng mắc của chúng; thông tin ẩn này có thể ảnh hưởng đến hiệu năng của các dự đoán.

Gần đây, các phương pháp mạng lưới đã được áp dụng cho dữ liệu chăm sóc sức khỏe hành chính để phát triển các mạng lưới bệnh [22-24]. Folino và cộng sự [24] đã sử dụng một phương pháp mạng lưới và khai thác luật kết hợp (association rule mining) để dự đoán nguy cơ bệnh trong tương lai của bệnh nhân. Các phương pháp phân tích mạng lưới và dự đoán cũng được triển khai để dự đoán các bệnh mạn tính. Chúng đã được áp dụng trong các nghiên cứu khác nhau để đạt được độ chính xác nổi bật [7, 24]. Tuy nhiên, các công trình này tập trung vào mối quan hệ bệnh - bệnh đồng mắc. Họ đã sử dụng một phương pháp mạng lưới để phân tích mối quan hệ tiềm ẩn giữa mạng lưới bệnh nhân và bệnh. Tuy nhiên, rất ít nghiên cứu khám phá một cách rõ ràng mối quan hệ bệnh nhân - bệnh nhân bằng cách sử dụng dữ liệu chăm sóc sức khỏe hành chính để xây dựng một mô hình dự đoán nguy cơ bệnh.

Chúng tôi trình bày một dự đoán nguy cơ bệnh cho các bệnh nhân T2DM bằng cách sử dụng một mô hình mạng lưới bệnh nhân kết hợp với các kỹ thuật học máy, khai thác thông tin ẩn trong dữ liệu yêu cầu bồi thường chăm sóc sức khỏe hành chính. Mục đích chính của nghiên cứu này là phát triển các mô hình dự đoán cho T2DM bằng cách sử dụng thông tin nhân khẩu học - xã hội và hành vi của bệnh nhân cùng các thuộc tính mạng lưới từ mạng lưới bệnh nhân tương ứng của họ. Chúng tôi áp dụng một kỹ thuật kỹ nghệ đặc trưng (feature engineering) để xây dựng một mạng lưới bệnh nhân bằng phép chiếu mạng lưới hai phía (bipartite network projection) nhằm đạt được mục tiêu này. Chúng tôi xem xét các đặc trưng mạng lưới được suy ra (ví dụ, độ đo trung tâm bậc - degree centrality, độ đo trung tâm vector riêng - eigenvector centrality, và độ đo trung tâm gần kề - closeness centrality) và các đặc điểm của bệnh nhân để huấn luyện các mô hình học máy và dự đoán nguy cơ của bệnh. Mặc dù nghiên cứu này đã tập trung vào T2DM như một tình trạng mạn tính quan trọng, mô hình được đề xuất có thể được áp dụng cho bất kỳ bệnh nào khác.

## 2 Vật liệu và phương pháp

## 2.1 Lựa chọn dữ liệu và đoàn hệ

Dữ liệu yêu cầu bồi thường chăm sóc sức khỏe hành chính cho nghiên cứu này được thu thập từ công ty quỹ y tế CBHS health funds tại Úc. Có khoảng 18,700,000 hồ sơ nhập viện thuộc về khoảng 124,000 bệnh nhân đã được ẩn danh, được thu thập từ 1995 đến 2018. Bộ dữ liệu chứa một ID bệnh nhân duy nhất, giới tính, tuổi, vị trí, ID nhà cung cấp, ngày nhập viện và xuất viện, ID yêu cầu bồi thường, ID đợt điều trị (episode ID), mã thủ thuật chẩn đoán, mã bệnh, và mã nhóm liên quan đến chẩn đoán (diagnosis-related group code). Mã bệnh là các phiên bản sửa đổi của Úc thứ 9 và thứ 10 (ICD-9-AM và ICD-10-AM) của mã phân loại bệnh quốc tế, vốn tuân thủ các tiêu chuẩn quốc tế và việc báo cáo các bệnh và tình trạng sức khỏe [25]. Trong nghiên cứu này, chúng tôi quan tâm đến thông tin của bệnh nhân, chẳng hạn như tuổi, giới tính, và mã bệnh, để phát triển mô hình.

Để kiểm thử mô hình được đề xuất, chúng tôi chọn T2DM như một bệnh mạn tính cụ thể. Chúng tôi sử dụng một chiến lược lọc và kỹ thuật tiền xử lý dữ liệu để chọn các bệnh nhân có hồ sơ liên quan đến T2DM (mã ICD-10-AM 'E11' hoặc mã ICD-9-AM '250.*'). Chiến lược lọc bao gồm: (i) các bệnh nhân có ít nhất hai lần nhập viện trong thời gian nghiên cứu; (ii) loại trừ các hồ sơ trùng lặp và các mã ICD liên quan đến sốt và chấn thương; (iii) số lần nhập viện tối đa được đặt là 50 trong thời gian nghiên cứu, một số bệnh nhân có thể cần nhập viện thường xuyên để điều trị liên tục, chẳng hạn như hóa trị hoặc lọc thận; (iv) Lấy cảm hứng từ Khan và cộng sự [7], giả sử kết cục M là kết quả của các đặc điểm A , B , và C , và kết cục N là kết quả của các đặc điểm B , C , và D . Trong trường hợp này, chúng ta có thể kết luận rằng các đặc điểm B và C gây ra M hoặc N hoặc cả hai. Nói cách khác, nếu một bệnh nhân có các đặc điểm B hoặc C hoặc cả hai, chúng ta không thể kết luận kết cục nào ( M hoặc N ) sẽ xảy ra vì B và C đều hiện diện trong cả hai kết cục có thể có. Mặt khác, nếu bệnh nhân có một trong hai đặc điểm A hoặc C , thì có thể dự đoán tốt hơn. Do đó, chúng ta nên xem xét ảnh hưởng của các đặc điểm đối với mô hình mạng lưới bệnh nhân được đề xuất. Hình 1 cho thấy các quy trình lựa chọn dữ liệu được tuân theo trong nghiên cứu này.

Đối với kỹ thuật tiền xử lý dữ liệu, chúng tôi chuyển đổi tất cả các mã ICD sang chữ hoa và tiến hành các quy trình phát hiện điểm ngoại lai (outlier detection). Để dự đoán nguy cơ T2DM và giải quyết vấn đề mất cân bằng lớp, chúng tôi chọn hai đoàn hệ: bệnh nhân T2DM và bệnh nhân không mắc T2DM. Chúng tôi đã chọn ngẫu nhiên bệnh nhân từ đoàn hệ không mắc T2DM với ít nhất một mã ICD không có trong đoàn hệ T2DM. Sau các bước xử lý dữ liệu này, chúng tôi thu được dữ liệu chăm sóc sức khỏe cho 1,028 bệnh nhân T2DM và 1,028 bệnh nhân không mắc T2DM. Hình 2 trình bày khung nghiên cứu được tuân theo trong nghiên cứu này.

Fig. 1 Một minh họa về quy trình lựa chọn dữ liệu

## 2.2 Mã ICD

Dữ liệu hành chính thường được mã hóa thành các định dạng ICD-9AM và ICD-10-AM; mỗi định dạng có hơn 20,000 mã duy nhất và đang hoạt động [26]. Sẽ không thực tế khi nghiên cứu từng mã ICD đơn lẻ, điều này gây ra vấn đề thưa thớt dữ liệu (data sparsity). Do đó, chúng tôi lọc và chỉ nghiên cứu các mã bệnh liên quan đến các bệnh đồng mắc. Với mục đích này, có một số danh sách chỉ số bệnh đồng mắc đã được thiết lập tốt, chẳng hạn như các chỉ số Charlson [27] và Elixhauser [28]. Ở đây, chúng tôi áp dụng chỉ số bệnh đồng mắc Elixhauser vì nó được phát triển dựa trên dữ liệu hành chính. Chúng tôi chỉ nghiên cứu các mã ICD trong chỉ số bệnh đồng mắc Elixhauser thay vì tất cả các mã ICD. Ngoài ra, chúng tôi xác định các mã ICD-9 '3051', '64900', '64901', '64902', '64903', '64904', 'V1582'

và các mã ICD-10 'F17', 'F17.*', 'T65.2', 'P04.2', 'Z72.0', 'Z86.43', 'Z58.7' là hành vi hút thuốc.

## 2.3 Mạng lưới bệnh nhân

Chúng tôi đã sử dụng các khái niệm từ lý thuyết đồ thị để xây dựng một mạng lưới bệnh nhân. Một mạng lưới hai phía (bipartite network) được sử dụng để biểu diễn các bệnh mà một bệnh nhân gặp phải theo thời gian. Một đồ thị hai phía là một đồ thị mà các đỉnh của nó có thể được chia thành hai tập con rời nhau và độc lập [29]. Nghiên cứu này sử dụng các đồ thị hai phía để biểu diễn mối quan hệ bệnh nhân - bệnh như sau.

Trong đó, G ký hiệu đồ thị hai phía vô hướng được xây dựng từ bộ dữ liệu cho trước, bao gồm u thuộc tính bệnh nhân có v loại nút khác nhau biểu thị các bệnh. Các cạnh giữa hai nút biểu diễn mối quan hệ giữa bệnh nhân và bệnh. Do đó, bệnh nhân được chẩn đoán mắc các bệnh liên quan được kết nối trong đồ thị hai phía.

Mặc dù có các kỹ thuật, độ đo, và thuật toán cụ thể để phân tích mạng lưới một phương thức (one-mode network) (các mạng lưới có một tập nút tương tự nhau), nhưng nó bị hạn chế đối với đồ thị hai phía. Phép chiếu (projection) thường được áp dụng để nén một mạng lưới hai phía thành một mạng lưới đơn phía (unipartite) và tiến hành phân tích thêm như một mạng lưới một phương thức [30]. Trong khi dữ liệu từ đồ thị hai phía bệnh nhân - bệnh ban đầu có thể hữu ích, nó rất khó để phân tích và trích xuất thông tin. Mặc dù các nghiên cứu trước đây đã phát triển các mạng lưới để phân tích các mối quan hệ bệnh - bệnh đồng mắc [2, 7], chúng tôi quan tâm đến các kết nối tiềm ẩn giữa các bệnh nhân mắc cùng một bệnh. Nếu hai cá nhân mắc cùng một bệnh, chúng ta có thể kết luận rằng cả hai bệnh nhân đều có một mối quan hệ tiềm ẩn. Ví dụ, họ có thể có hành vi và chỉ số khối cơ thể tương tự. Ngoài ra, bệnh đồng mắc phản ánh các cơ chế phân tử chung của các yếu tố môi trường giữa các bệnh [31]. Nghiên cứu trước đây cũng đề xuất rằng các yếu tố di truyền góp phần vào sự phát triển của các bệnh mạn tính, và các mối liên hệ bệnh - gen chỉ ra nguồn gốc di truyền chung của các bệnh [32, 33]. Các bệnh nhân mắc một bệnh mạn tính chung được liên kết với nhau vì họ có thể có các mối quan hệ tiềm ẩn như các gen liên quan đến bệnh chung, các yếu tố nguy cơ tương tự và lối sống.

Để trích xuất thông tin tiềm ẩn, chúng tôi chuyển đổi đồ thị hai phía bệnh nhân - bệnh thành một đồ thị đơn phía đơn giản nắm bắt các mối quan hệ bằng phép chiếu đồ thị hai phía (bipartite graph projection) [34]. Trong đồ thị được chiếu, các bệnh nhân được nối với nhau bằng liên kết bất đối xứng và được liên kết với nhau nếu họ được chẩn đoán mắc cùng (các) bệnh. Tương tự, chúng tôi biến đổi đồ thị hai phía thành một đồ thị đơn phía nắm bắt các bệnh được chẩn đoán cho bệnh nhân, tương tự như mạng lưới bệnh của các nghiên cứu hiện có [7, 24]. Fig. 3 minh họa một phép chiếu của một mạng lưới bệnh nhân bằng cách sử dụng một bộ dữ liệu trừu tượng. Thông tin bệnh của bốn bệnh nhân được hiển thị ở phía bên trái của hình này). Đồng thời, mạng lưới hai phía bệnh nhân - bệnh tương ứng được hiển thị ở giữa hình. Cuối cùng, 'mạng lưới bệnh nhân' (patient network), vốn dựa trên mạng lưới hai phía bệnh nhân - bệnh, được trình bày ở phía bên phải của hình. Trong mạng lưới bệnh nhân này, bệnh nhân P 1 có một liên kết với tất cả các bệnh nhân còn lại khác vì bệnh nhân P 1 đã được chẩn đoán mắc ít nhất một bệnh chung với P 2 (T2DM), P 3 (bệnh tim mạch, CVD) và P 4 (CVD). Tương tự, có một cạnh giữa các bệnh nhân P 2 và P 3 vì họ có bệnh gan chung. Cũng có một cạnh giữa các bệnh nhân P 3 và P 4 vì cả hai đều đã được chẩn đoán mắc CVD. Nghiên cứu này đã xây dựng một mạng lưới bệnh nhân dựa trên các mạng lưới hai phía bệnh nhân - bệnh cho tất cả các bệnh nhân T2DM và không mắc T2DM, và xem xét các độ đo mạng lưới khác nhau của nó như các thuộc tính cho phân tích phân loại học máy.

## 2.4 Xây dựng đặc trưng cho các mô hình dự đoán nguy cơ

Sau khi tạo ra một mạng lưới bệnh nhân toàn diện, chúng tôi suy ra hai loại đặc trưng: đặc trưng mạng lưới và đặc trưng bệnh nhân. Hai vector đặc trưng này được nối lại với nhau để huấn luyện một mô hình dự đoán nguy cơ. Trong các tiểu mục sau đây, chúng tôi sẽ giải thích chi tiết việc xây dựng đặc trưng.

## 2.4.1 Đặc trưng mạng lưới

Trích xuất các đặc trưng hiệu quả từ mạng lưới bệnh nhân là chìa khóa để đạt được độ chính xác dự đoán cao. Trong nghiên cứu này, chúng tôi áp dụng mô hình được đề xuất cho dự đoán nguy cơ T2DM như một bệnh mạn tính quan trọng. Với mục đích này, chúng tôi trích xuất năm loại đặc trưng từ mạng lưới bệnh nhân toàn diện (tức là, độ đo trung tâm bậc - degree centrality, độ đo trung tâm vector riêng - eigenvector centrality, độ đo trung tâm gần kề - closeness centrality, độ đo trung tâm trung gian - betweenness centrality và hệ số phân cụm - clustering coefficient) để phát triển mô hình dự đoán nguy cơ. Trong các đoạn sau đây, chúng tôi sẽ giải thích chi tiết từng loại đặc trưng.

Độ đo trung tâm bậc (degree centrality) là khái niệm đầu tiên và đơn giản nhất trong độ đo trung tâm nút [35], đó là một chỉ số biểu thị số lượng nút được liên kết với nút này. Độ đo trung tâm bậc của một nút u được tính như sau

Trong đó, du là bậc của một nút u .

Trong nghiên cứu này, chúng tôi sử dụng một dạng chuẩn hóa của độ đo trung tâm bậc như sau

Trong đó, n là kích thước của mạng lưới (số lượng nút).

Độ đo trung tâm vector riêng (eigenvector centrality) được đề xuất bởi Bonacich [36]. Ý tưởng là một nút có vai trò quan trọng nếu nó được bao quanh bởi các nút lân cận quan trọng. Có ma trận kề A, Auv = 1 nếu nút u được kết nối với nút j . Khi đó, độ đo trung tâm vector riêng cho nút u là

Trong đó, λ là một hệ số dương.

Theo độ đo trung tâm gần kề (closeness centrality), một nút là quan trọng nếu nó có độ dài đường đi ngắn nhất nhỏ đến tất cả các nút khác [37]. Độ đo trung tâm gần kề của nút u , Cc (u) , được định nghĩa là

Trong đó, N là tập các nút trong mạng lưới và d(u, v) là độ dài đường đi ngắn nhất giữa u và v .

Hơn nữa, độ đo trung tâm trung gian (betweenness centrality) đo lường một nút là quan trọng khi nó nằm trên nhiều đường đi ngắn nhất giữa các nút khác [35]. Độ đo trung tâm trung gian của nút u , Cb (u) , được định nghĩa là

Trong đó, σst (u) là số đường đi ngắn nhất giữa s và t có chứa u , và σst là các đường đi ngắn nhất giữa s và t .

Cuối cùng, hệ số phân cụm (clustering coefficient) đo lường mức độ mà các nút trong một mạng lưới có xu hướng phân cụm với nhau [38]. Ở cấp độ nút, hệ số phân cụm của một nút định lượng mức độ chặt chẽ mà các nút lân cận của nó được kết nối để tạo thành một đồ thị đầy đủ. Hệ số phân cụm của một nút u là

Trong đó, T (u) là số tam giác đi qua nút u và deg (u) là bậc của u .

## 2.4.2 Đặc trưng bệnh nhân

Tài liệu cho thấy rằng tuổi, giới tính, và hành vi là các yếu tố nguy cơ đối với T2DM [39]. Chúng tôi cũng đã xem xét ba đặc trưng này trong mô hình được đề xuất. Yếu tố nguy cơ tuổi được chuẩn hóa bằng cách tái tỷ lệ giá trị tuổi về [0,1]. Yếu tố nguy cơ giới tính là một điểm số phân loại: 0 nếu bệnh nhân là nữ và 1 nếu bệnh nhân là nam. Điểm số cho yếu tố nguy cơ hành vi (hút thuốc) là một giá trị rời rạc, và chúng tôi sử dụng các mã ICD để xác định liệu một bệnh nhân có hút thuốc hay không. Nếu có ít nhất một mã ICD khớp, bệnh nhân có điểm nguy cơ hành vi là 1, ngược lại là 0.

## 2.5 Dự đoán nguy cơ

Các thuật toán học máy là một loại trí tuệ nhân tạo (artificial intelligence - AI) được thiết kế để mô phỏng trí thông minh của con người bằng cách khám phá các mẫu và đưa ra suy luận dựa trên dữ liệu có sẵn [40]. Sự kết hợp của dữ liệu lớn và học máy là một công nghệ tuyệt vời có thể tác động đến ngành chăm sóc sức khỏe. Một số kỹ thuật học máy đã được sử dụng trong dự đoán bệnh [18]. Ở đây, chúng tôi áp dụng tám kỹ thuật học máy có giám sát tiên tiến (tức là, Logistic Regression, k-Nearest Neighbour, Support Vector Machine, Naïve Bayes, Decision Tree, Random Forest, XGBoost, và Artificial Neural Network) để phát triển các mô hình dự đoán.

Logistic Regression (LR) là một phần mở rộng của hồi quy tuyến tính được sử dụng trong các tác vụ phân loại, và biến được dự đoán là định danh [41]. LR khớp dữ liệu với một đường cong logistic để khám phá khả năng một thực thể mới thuộc về một lớp nhất định. K-Nearest Neighbour (KNN) phân loại điểm dữ liệu dựa trên cách lân cận của nó được phân loại, và nó phân loại các điểm dữ liệu mới dựa trên độ đo tương đồng của các điểm dữ liệu đã được lưu trữ trước đó [42]. Support Vector Machine (SVM) phân biệt hai loại bằng cách tạo ra một siêu phẳng (hyperplane) sau khi dữ liệu đầu vào đã chuyển đổi sự phân tách tốt nhất giữa các lớp vào một không gian nhiều chiều một cách toán học [43]. Naïve Bayes (NB) là một phân loại dựa trên định lý Bayes [44]. Mô hình này giả định rằng các đặc trưng dự đoán là độc lập có điều kiện với nhau, khi cho trước lớp. Bộ phân loại NB học xác suất có điều kiện của mỗi biến của một nhãn lớp cho trước từ dữ liệu quan sát được. Sau đó tính xác suất bằng cách áp dụng quy tắc Bayes và sử dụng xác suất hậu nghiệm cao nhất để dự đoán lớp. Cây quyết định (Decision tree - DT) là một thuật toán sử dụng một đồ thị dạng cây và các hệ quả có thể có của nó [45]. Nó bắt đầu từ gốc và kiểm tra các giá trị của các thuộc tính cho đến khi nó đạt đến một nút lá; sau đó trả về lớp của nút lá để dự đoán lớp. Ngoài DT, Random Forests (RF) là một bộ phân loại heuristic, về cơ bản được cấu thành từ nhiều cây quyết định [46]. RF sử dụng bagging và chọn thuộc tính quan trọng nhất trong khi xây dựng một cây quyết định, và nó được sử dụng để tạo ra sự đa dạng và giảm tương quan giữa các cây quyết định. XGBoost là một thuật toán học máy tích hợp dựa trên cây tương đối mới, một hệ thống học máy có khả năng mở rộng cho việc boosting cây. Nó có độ chính xác dự đoán cao hơn vì nó sử dụng các thuật toán xấp xỉ chính xác [47]. Cuối cùng, Artificial Neural Network (ANN) lần đầu tiên được đề xuất bởi McCulloch và Pitts [48] và trở nên phổ biến nhờ các công trình của Rumelhart, Hinton [49]. Một mạng nơ-ron kết nối đầy đủ bao gồm một loạt các lớp kết nối đầy đủ kết nối mọi nơ-ron trong một lớp với mọi nơ-ron trong lớp khác. Thuật toán ANN có thể được biểu diễn dưới dạng một tập các nút kết nối đầy đủ. Đầu vào của các nút có thể là đầu ra của các nút từ các lớp trước. Các nút và các cạnh có trọng số, và các trọng số này có thể được điều chỉnh bằng cách tối thiểu hóa hàm mất mát thông qua lan truyền ngược (backpropagation). Dựa trên việc huấn luyện ANN, các đầu ra của các nút trong lớp cuối cùng có thể phân loại hoặc dự đoán dữ liệu kiểm thử.

## 3 Kết quả

Kiểm định chéo k-lần (k-fold cross-validation - CV) được sử dụng để xác thực mô hình được đề xuất. Trong k-fold CV, dữ liệu được chia thành k lần (phân vùng), và mỗi lần được sử dụng làm tập kiểm thử tại một thời điểm nào đó trong khi các lần khác được sử dụng làm tập huấn luyện [50]. K-fold CV có k lần lặp. Trong mỗi lần lặp, mô hình được huấn luyện bằng cách sử dụng k -1 lần dữ liệu và được kiểm thử trên lần thứ k . Độ chính xác tổng thể là độ chính xác trung bình qua k lần lặp. Ở đây, chúng tôi sử dụng 10-fold CV chia tập huấn luyện (tức là, các bệnh nhân T2DM và không mắc T2DM) thành 10 phân vùng có kích thước bằng nhau. Nghiên cứu này sử dụng một số lượng bệnh nhân bằng nhau từ mỗi đoàn hệ (tức là, các bệnh nhân T2DM và không mắc T2DM) để tránh vấn đề mất cân bằng lớp. Chúng tôi cũng sử dụng diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (receiver operating characteristic curve - AUC) để đo lường hiệu năng của bộ phân loại [51]. AUC cho thấy mức độ mà mô hình có thể phân biệt giữa các lớp; một giá trị AUC cao hơn cho thấy bộ phân loại có sức mạnh dự đoán cao hơn. Sau khi áp dụng kỹ thuật tiền xử lý, các bệnh nhân T2DM và không mắc T2DM được xác định bằng cách tìm kiếm các mã ICD tương ứng. Tổng cộng, chúng tôi đã tìm thấy 1,028 bệnh nhân có mã ICD10-AM 'E11' hoặc mã ICD-9-AM '250.*' (Đái tháo đường type 2) đáp ứng các điều kiện. Sau đó, chúng tôi chọn ngẫu nhiên một số lượng bệnh nhân không mắc T2DM bằng nhau từ các bệnh nhân còn lại. Các tiểu mục sau đây thảo luận về các thuộc tính của mạng lưới bệnh nhân, độ chính xác, hiệu năng, và đánh giá của các mô hình học máy.

## 3.1 Các thuộc tính mạng lưới của mạng lưới bệnh nhân

Chúng tôi sử dụng các tiêu chí lựa chọn bệnh đồng mắc để tạo ra một mạng lưới bệnh nhân toàn diện PN từ các bệnh nhân T2DM và không mắc T2DM. Trong mạng lưới, các nút là các bệnh nhân (với ID bệnh nhân duy nhất), và các cạnh là các mối quan hệ giữa các bệnh nhân; các bệnh nhân được chẩn đoán mắc cùng một bệnh được kết nối bằng một cạnh. Một số đặc điểm ở cấp độ nút và cấp độ đồ thị được xem xét cho mạng lưới bệnh nhân toàn diện PN . Bảng 1 tóm tắt các đặc điểm của mạng lưới bệnh nhân toàn diện được tạo ra.

Như có thể thấy, số lượng nút trong PN nhỏ hơn tổng số bệnh nhân được chọn vì một số bệnh nhân không có bất kỳ mã ICD chung nào. Đồng thời, số lượng cạnh tương đối lớn, và bậc trung bình là 86; điều này cho thấy các bệnh nhân có các bệnh chung trong PN .

Table 1 Các đặc điểm của mạng lưới bệnh nhân toàn diện

| Đặc điểm                       |   Mạng lưới bệnh nhân |
|--------------------------------|-------------------|
| Number of nodes                |             1,981 |
| Number of edges                |            85,412 |
| Average degree                 |            86.231 |
| Modularity                     |              0.57 |
| Number of communities          |                37 |
| Network diameter               |                 7 |
| Average path length            |             2.994 |
| Graph density                  |             0.044 |
| Average clustering coefficient |             0.808 |

Mật độ đồ thị (graph density) là tỷ lệ giữa số lượng cạnh và số lượng cạnh có thể có, cho thấy xấp xỉ 4.4% chuyển tiếp có thể có giữa các bệnh nhân có cùng các bệnh. Trong khi đó, hệ số phân cụm trung bình là 0.808, có nghĩa là các bệnh nhân được kết nối chặt chẽ. Cuối cùng, số lượng cộng đồng và độ mô-đun (modularity) lần lượt là 38 và 0.57. Điều này cho thấy rằng sự chuyển tiếp nội cộng đồng tổng thể có thể không khác biệt đáng kể so với sự chuyển tiếp giữa các cộng đồng. Hình 4 trực quan hóa mạng lưới bệnh nhân toàn diện bằng cách sử dụng phần mềm phân tích mạng lưới xã hội, Gephi [52]. Chúng tôi đã sử dụng bố cục Force Atlas; các nút biểu diễn các bệnh nhân, và các cạnh biểu diễn liên kết giữa các bệnh nhân. Chúng tôi sử dụng một màu sắc khác nhau cho việc phân cụm để biểu diễn các nút. Mạng lưới bệnh nhân cho thấy một số lượng lớn các cạnh giữa các nút, và màu sắc cho biết cụm mà chúng bắt nguồn.

Fig. 4 Trực quan hóa mạng lưới bệnh nhân toàn diện được tạo ra. Các nút là bệnh nhân và các nút có cùng màu thuộc về cùng một cộng đồng. Các cạnh đề cập đến liên kết giữa các bệnh nhân mắc một bệnh chung

## 3.2 Hiệu năng của các mô hình dự đoán dựa trên học máy

Tám kỹ thuật học máy có giám sát (tức là, LR, KNN, SVM, NB, DT, RF, XGBoost, và ANN) được áp dụng để dự đoán nguy cơ. Sau bước tiền xử lý dữ liệu, mỗi đoàn hệ T2DM và không mắc T2DM chứa 1,028 bệnh nhân. Chúng tôi nối các đoàn hệ bệnh nhân và chia chúng thành hai tập một cách ngẫu nhiên. Tập đầu tiên (80% bệnh nhân) được sử dụng để huấn luyện các mô hình, và tập thứ hai (20% bệnh nhân) được sử dụng để kiểm thử các mô hình. Chúng tôi áp dụng kỹ thuật 10-fold CV để chia dữ liệu huấn luyện thành mười phân vùng cho tập huấn luyện. Đồng thời, các siêu tham số được tối ưu hóa cho các mô hình học máy và học sâu để tìm độ chính xác tốt nhất. Chúng tôi đã sử dụng python và gói Scikitlearn (sklearn) [53] để huấn luyện các mô hình học máy và Keras [54] để huấn luyện ANN. Đối với mô hình dự đoán KNN, chúng tôi đã sử dụng tìm kiếm lưới (grid search) để tìm giá trị k có độ chính xác cao nhất, trong đó giá trị k được đặt là 12. Đối với các mô hình LR, SVM, DT và NB, chúng tôi đã sử dụng các siêu tham số mặc định trong sklearn. Để phát triển mô hình RF, chúng tôi đã sử dụng phương pháp tổng hợp bootstrap (bootstrap aggregation) để tích hợp các DT. Độ sâu tối đa được đặt là 10, sử dụng tiêu chí entropy và số lượng bộ ước lượng được đặt là 200. Chúng tôi đã sử dụng điều chỉnh siêu tham số để tìm hiệu năng tốt nhất cho XGBoost. Cuối cùng, chúng tôi đã huấn luyện một ANN ba lớp, kết nối đầy đủ với bộ tối ưu hóa Adam [55], 4000 epoch, và tốc độ học là 0.001. Chúng tôi đã sử dụng tập kiểm thử để đánh giá hiệu năng của các mô hình. Bảng 2 trình bày độ chính xác và độ đo hiệu năng của các mô hình.

Fig. 5 ROC cho các mô hình học máy khác nhau

mà chính xác hơn các mô hình riêng lẻ khác. Bên cạnh đó, công nghệ RF có thể xử lý một lượng lớn dữ liệu với hàng nghìn biến. Khi một lớp ít xuất hiện hơn các lớp khác trong dữ liệu, nó có thể tự động cân bằng bộ dữ liệu. Phương pháp này cũng có thể xử lý các biến một cách nhanh chóng, khiến nó phù hợp với các tác vụ phức tạp.

RF cho thấy độ chính xác cao nhất là 84.95% trong số tám mô hình, theo sau là ANN và XGBoost, lần lượt là 82.52%. Trong tài liệu gần đây, mô hình dự đoán nguy cơ cho đái tháo đường sử dụng RF có độ chính xác tốt nhất [2, 56, 57]. Trong nghiên cứu này, RF cũng vượt trội hơn các mô hình khác. RF là một bộ phân loại tích hợp chứa nhiều DT; mỗi mô hình sẽ được xây dựng một cách tuần tự vì mỗi mô hình sử dụng phản hồi từ các mô hình trước đó và cố gắng có một cái nhìn tập trung vào việc phân loại sai. Sự tương quan thấp giữa các DT mang lại các lợi thế so với các mô hình khác, các dự đoán tích hợp. Đối với các phương pháp phân loại LR và DT, số lượng dương tính giả nhiều hơn âm tính giả. Mặt khác, các mô hình KNN, SVM, NB, RF, XGboost và ANN có nhiều dự đoán âm tính giả hơn dương tính giả. Đối với các dương tính giả, một số bệnh nhân có thể được dự đoán là có nguy cơ cao mắc bệnh mạn tính ngay cả khi họ không nằm trên quỹ đạo bệnh mạn tính đó. Điều này là mong muốn đối với nghiên cứu của chúng tôi vì mục đích của nghiên cứu là dự đoán nguy cơ bệnh mạn tính một cách chính xác hơn. Tốt hơn là dự đoán các bệnh nhân có nguy cơ thấp hơn là có nguy cơ mạn tính (tức là, dương tính giả) hơn là dự đoán họ theo cách ngược lại (tức là, âm tính giả). Có nhiều âm tính giả hơn trong dự đoán sẽ khiến những bệnh nhân thực sự đang trên con đường mắc bệnh mạn tính không được phát hiện. Điều này có thể dẫn đến các biến chứng thêm cho sự tiến triển của bệnh.

Hình 5 cho thấy các đường cong ROC của các mô hình được áp dụng. Mô hình RF có AUC cao nhất trong số tám mô hình. AUC của XGBoost thấp hơn một chút so với RF, là 0.8950. Đồng thời, AUC cho tất cả các mô hình đều trên 0.75, điều này cho thấy mô hình được đề xuất có thể dự đoán nguy cơ T2DM một cách hiệu quả.

Table 2 Hiệu năng của các mô hình học máy (bao gồm các đặc trưng mạng lưới bệnh nhân)

|                |    LR |   KNN |   SVM |    NB |    DT |    RF |   XGBOOST |   ANN |
|----------------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Accuracy (%)   | 74.27 | 81.31 | 78.64 | 65.29 | 80.83 | 84.95 |     82.52 | 82.52 |
| Precision (%)  | 74.53 | 82.25 | 78.64 | 69.56 | 80.84 | 85.97 |     82.98 | 82.52 |
| Recall (%)     | 74.27 | 81.31 | 78.64 | 65.29 | 80.83 | 84.95 |     81.52 | 82.52 |
| F1 Score (%)   | 74.26 | 81.10 | 78.64 | 62.72 | 80.83 | 84.79 |     82.42 | 82.52 |
| True Positive  |   155 |   142 |   155 |    77 |   161 |   150 |       150 |   162 |
| True Negative  |   151 |   193 |   169 |   192 |   172 |   200 |       190 |   178 |
| False Positive |    62 |    20 |    44 |    21 |    41 |    13 |        23 |    35 |
| False Negative |    44 |    57 |    44 |   122 |    38 |    49 |        49 |    37 |

Table 3 Hiệu năng của các mô hình học máy (loại trừ các đặc trưng mạng lưới bệnh nhân).

| Mô hình |   Độ chính xác chỉ với đặc trưng bệnh nhân (%) |   Độ chính xác chỉ với đặc trưng mạng lưới (%) |
|---------|------------------------------------------|------------------------------------------|
| LR      |                                    59.71 |                                    70.63 |
| KNN     |                                    75.00 |                                    82.77 |
| SVM     |                                    67.72 |                                    77.18 |
| NB      |                                    70.87 |                                    63.83 |
| DT      |                                    72.33 |                                    81.31 |
| RF      |                                    71.36 |                                    83.98 |
| XGBoost |                                    70.63 |                                    78.16 |
| ANN     |                                    72.33 |                                    81.31 |

## 3.3 Đánh giá các đặc trưng mạng lưới và các đặc trưng bệnh nhân

Để đánh giá mô hình được đề xuất của chúng tôi, chúng tôi cũng đã huấn luyện và kiểm thử các mô hình học máy mà không sử dụng các đặc trưng mạng lưới (tức là, độ đo trung tâm bậc, độ đo trung tâm vector riêng, độ đo trung tâm gần kề, độ đo trung tâm trung gian và hệ số phân cụm) và các đặc trưng bệnh nhân (giới tính, tuổi và hút thuốc). Bảng 3 cho thấy độ chính xác của tám mô hình không có các đặc trưng mạng lưới và các mô hình không có các mạng lưới bệnh nhân. Kết quả cho thấy độ chính xác của các mô hình chỉ với đặc trưng bệnh nhân là 59.71% đến 75.00%, thấp hơn đáng kể so với các kết quả với các đặc trưng mạng lưới. Ngoài ra, độ chính xác của các mô hình chỉ với các đặc trưng mạng lưới dao động từ 63.83% đến 83.98%, gần với các mô hình có cả đặc trưng bệnh nhân và đặc trưng mạng lưới. Do đó, chúng ta có thể kết luận rằng các đặc trưng mạng lưới đóng một vai trò quan trọng trong dự đoán bệnh, và mô hình được đề xuất của chúng tôi đã cải thiện đáng kể độ chính xác của dự đoán nguy cơ T2DM.

Chúng tôi sử dụng độ quan trọng đặc trưng theo hoán vị (permutation feature importance) [58] để kiểm tra các đặc trưng mạng lưới giúp cải thiện kết quả dự đoán của Bảng 3. Hình 6 thể hiện độ quan trọng theo hoán vị qua các mô hình về mặt các đặc trưng mạng lưới. Các mô hình LR, KNN và SVM đánh giá hệ số phân cụm là đặc trưng quan trọng nhất, trong khi DT, RF, XGboost và ANN đánh giá độ đo trung tâm vector riêng là đặc trưng mạng lưới quan trọng nhất giúp cải thiện dự đoán. Đối với các đặc trưng ít quan trọng hơn, kết quả khác nhau. LR, KNN, SVM, NB, DT và ANN đánh giá độ đo trung tâm trung gian là đặc trưng ít quan trọng nhất. RF đánh giá độ đo trung tâm bậc là đặc trưng ít quan trọng nhất. Đồng thời, độ đo trung tâm bậc và độ đo trung tâm gần kề là các đặc trưng ít quan trọng nhất đối với thuật toán XGBoost.

## 3.4 Độ quan trọng đặc trưng trong mô hình có hiệu năng tốt nhất

Vì RF có một kết quả vượt trội, điều quan trọng là phải xác định những đặc trưng nào là thiết yếu để diễn giải mô hình tốt hơn. Là một bộ phân loại, RF thực hiện lựa chọn đặc trưng ngầm định và chỉ sử dụng một phần nhỏ các 'biến mạnh' (strong variables) để phân loại [59], điều này dẫn đến hiệu năng vượt trội của nó trên dữ liệu nhiều chiều. Kết quả của việc lựa chọn đặc trưng ngầm định này của RF có thể được trực quan hóa bằng 'độ quan trọng Gini' (Gini importance) [46]. Độ quan trọng đặc trưng của RF được trực quan hóa trong Hình 7. Độ đo trung tâm vector riêng, độ đo trung tâm gần kề và tuổi là các đặc trưng có tác động mạnh đến hiệu năng của mô hình, có độ quan trọng đặc trưng cao hơn 0.15. Như đã đề cập ở trên, độ đo trung tâm vector riêng là một độ đo về ảnh hưởng của một bệnh nhân trong mạng lưới bệnh nhân, mỗi bệnh nhân trong mạng lưới sẽ được cho một điểm số: điểm số càng cao, mức độ ảnh hưởng trong mạng lưới bệnh nhân càng lớn. Trong khi đó, độ đo trung tâm gần kề chấm điểm mỗi bệnh nhân dựa trên 'độ gần kề' của họ với tất cả các bệnh nhân khác trong mạng lưới bệnh nhân. Các bệnh nhân có điểm số cao có thể có một số đặc điểm tiềm ẩn rõ ràng, và các đặc trưng mạng lưới này ảnh hưởng đến việc phân loại bệnh nhân. Do đó, các đặc trưng mạng lưới đóng một vai trò thiết yếu so với các đặc trưng bệnh nhân. Mặt khác, tuổi là một yếu tố quan trọng đối với mô hình có hiệu năng tốt nhất của chúng tôi về mặt các đặc trưng bệnh nhân. Về mặt lâm sàng, người lớn tuổi có nguy cơ cao, và hầu hết các bệnh nhân T2DM đều trên 45 tuổi [60]. Điều này nhất quán với kết quả của mô hình của chúng tôi.

Fig. 6 Độ quan trọng của mỗi đặc trưng mạng lưới đối với các thuật toán học máy được áp dụng

Fig. 7 Độ quan trọng đặc trưng dựa trên mô hình Random Forest

## 4 Thảo luận

Nghiên cứu này đã phát triển các mô hình dự đoán để đặc trưng hóa nguy cơ phát triển T2DM bằng cách sử dụng các bộ phân loại học máy và phân tích mạng lưới. Các hiệu năng dự đoán nổi bật đã đạt được bởi tám mô hình, với các giá trị AUC dao động từ 0.79 đến 0.91. Mô hình RF có hiệu năng tốt nhất, với AUC là 0.91 và độ chính xác dự đoán 85%. Ngoài các yếu tố nguy cơ từ các nghiên cứu trước đây, các đặc trưng mạng lưới mới đã được thêm vào các mô hình của chúng tôi. Kết quả cho thấy độ đo trung tâm vector riêng và độ đo trung tâm gần kề của mạng lưới và tuổi của bệnh nhân là các đặc trưng quan trọng trong mô hình RF; độ quan trọng Gini của các đặc trưng này lớn hơn ngưỡng 0.15.

[62, 63], tuổi của bệnh nhân đã được tìm thấy là đặc trưng quan trọng thứ ba. Hai đặc trưng quan trọng đầu tiên là độ đo trung tâm vector riêng và độ đo trung tâm gần kề. Một mật độ đồ thị thấp (0.044) cho thấy rằng mạng lưới bệnh nhân tổng hợp thu được là một mạng lưới thưa. Tuy nhiên, hệ số phân cụm trung bình của mạng lưới rất cao (0.808), giống như các bệnh nhân được kết nối tốt trong các nhóm nhỏ trong mạng lưới. Các bệnh nhân thuộc về hai loại (T2DM và không mắc T2DM) có một mức độ kết nối liên nhóm khác nhau.

Theo hiểu biết của chúng tôi, đây là nghiên cứu đầu tiên phát triển mạng lưới bệnh nhân và sử dụng các đặc trưng từ mạng lưới, sau đó kết hợp với các đặc trưng bệnh nhân để dự đoán nguy cơ T2DM bằng cách sử dụng các thuật toán học máy khác nhau. Hầu hết các nghiên cứu trước đây tập trung vào nhân khẩu học, các giá trị xét nghiệm lâm sàng và các dấu hiệu sinh tồn để dự đoán nguy cơ T2DM [61]. Gần đây, Khan và cộng sự [7] đã sử dụng một phương pháp mạng lưới so sánh quỹ đạo của một bệnh nhân với mạng lưới bệnh kết hợp và các phương pháp học máy để phát triển các mô hình dự đoán nguy cơ. Nghiên cứu này trực tiếp sử dụng các đặc trưng của mạng lưới bệnh nhân, điều này khác với các nghiên cứu trước đây sử dụng phương pháp mạng lưới. Đồng thời, kết quả của chúng tôi nhất quán với các phát hiện trước đó; tuổi đã được tìm thấy là một đặc trưng quan trọng, và người lớn tuổi có nguy cơ cao mắc T2DM.

Độ chính xác cao hơn của các thuật toán học máy chỉ dựa trên các đặc trưng mạng lưới cho thấy rằng các bệnh nhân T2DM có xu hướng có các thuộc tính mạng lưới tương tự. Đáng chú ý, không giống như nhiều nghiên cứu khác trong tài liệu nơi tuổi của bệnh nhân đã được tìm thấy là yếu tố dự báo quan trọng nhất của T2DM

Nghiên cứu này chỉ xem xét các mã ICD chung mà các bệnh nhân đã được điều trị trong thời gian mắc bệnh của họ để xác định mạng lưới bệnh nhân. Theo cùng một cách, các mạng lưới bệnh nhân có thể được tạo ra, ví dụ, dựa trên các kết cục chẩn đoán lâm sàng chung và các mối liên hệ bệnh - gen. Điều này sẽ cho phép một nghiên cứu so sánh hiệu năng của các mạng lưới bệnh nhân khác nhau cho dự đoán nguy cơ T2DM. Nghiên cứu trong tương lai có thể giải quyết phạm vi này bằng cách xem xét dữ liệu nghiên cứu từ các nguồn khác cho cùng một đoàn hệ bệnh nhân.

Tuy nhiên, nghiên cứu này có một số hạn chế. Nghiên cứu này đã sử dụng dữ liệu chăm sóc sức khỏe thực tế trong đó chất lượng của các hồ sơ dữ liệu nằm ngoài tầm kiểm soát, và các phong cách ghi chép có thể khác nhau giữa các nhà thực hành. Một số mã bệnh trong bộ dữ liệu bị thiếu, không đầy đủ, và các định dạng khác nhau. Đồng thời, bộ dữ liệu chỉ chứa tóm tắt nhập viện và xuất viện từ một công ty bảo hiểm. Các lần khám bên ngoài bệnh viện và thông tin của các công ty bảo hiểm khác đối với các bệnh nhân có nhiều nhà cung cấp bảo hiểm bị thiếu. Tuy nhiên, các hạn chế này là cố hữu trong hầu hết dữ liệu chăm sóc sức khỏe thực tế.

## 5 Kết luận

Nghiên cứu này đã trình bày một mô hình mới để dự đoán T2DM bằng cách sử dụng một phương pháp mạng lưới và các kỹ thuật học máy. Các hồ sơ bệnh nhân từ bảo hiểm y tế tư nhân được biểu diễn dưới dạng một đồ thị hai phía và được chiếu thành mạng lưới bệnh nhân.

Sau đó, chúng tôi đã sử dụng các đặc trưng mạng lưới bệnh nhân cùng với các đặc điểm của bệnh nhân để huấn luyện tám mô hình học máy nhằm dự đoán nguy cơ T2DM. Các kết quả thực nghiệm cho thấy tính hiệu quả của các mô hình với một AUC dao động từ 0.79 đến 0.91. Đồng thời, các phát hiện của chúng tôi cho thấy các đặc trưng mạng lưới là thiết yếu đối với mô hình được đề xuất. Các kết quả cho thấy rằng mô hình được đề xuất, vốn kết hợp phân tích mạng lưới và kỹ thuật học máy, có thể được sử dụng thành công cho dự đoán nguy cơ bệnh, dẫn đến những hiểu biết quan trọng hơn về các yếu tố nguy cơ bệnh.

## Tuyên bố

Xung đột lợi ích Các tác giả tuyên bố rằng họ không có bất kỳ xung đột lợi ích nào.

Đóng góp của tác giả HL: Viết, Phân tích dữ liệu và Thiết kế nghiên cứu; SU: Thiết kế nghiên cứu, Viết, Xây dựng khái niệm và Giám sát; FH: Hiệu đính phản biện và Viết; MAM: Hiệu đính phản biện; và MK: Hiệu đính phản biện.

## Tài liệu tham khảo

1. World Health Organization (2020) Diabetes. https://www.who.int/ news-room/fact-sheets/detail/diabetes. Accessed 8 March 2021
2. Hossain ME, Uddin S, Khan A (2021) Network analytics and machine learning for predictive risk modelling of cardiovascular disease in patients with type 2 diabetes. Expert Syst Appl 164:113918
3. Australian Institute of Health and Welfare (2021) Diabetes. https://www.aihw.gov.au/reports/diabetes/diabetes/contents/ what-is-diabetes. Accessed 8 March 2021
4. Jermendy G (2005) Can type 2 diabetes mellitus be considered preventable? Diabetes Res Clin Practice 68:S73S81
5. Rathmann W, Haastert B, Icks A, L¨ owel H, Meisinger C, Holle R, Giani G (2003) High prevalence of undiagnosed diabetes mellitus in southern germany: target populations for efficient screening. the kora survey 2000. Diabetologia 46(2):182-189
6. Zhang L, Wang Y, Niu M, Wang C, Wang Z (2020) Machine learning for characterizing risk of type 2 diabetes mellitus in a rural chinese population: The henan rural cohort study. Sci Rep 10(1):1-10
7. Khan A, Uddin S, Srinivasan U (2019) Chronic disease prediction using administrative data and graph theory: The case of type 2 diabetes. Expert Syst Appl 136:230-241
8. Collins GS, Mallett S, Omar O, Yu L-M (2011) Developing risk prediction models for type 2 diabetes: a systematic review of methodology and reporting. BMC Med 9(1):1-14
9. Fiorini S, Hajati F, Barla A, Girosi F (2019) Predicting diabetes second-line therapy initiation in the australian population via time span-guided neural attention network. PloS One 14(10):e0211844
10. Kopitar L, Kocbek P, Cilar L, Sheikh A, Stiglic G (2020) Early detection of type 2 diabetes mellitus using machine learning-based prediction models. Sci Rep 10(1):1-12
11. Sahoo AK, Pradhan C, Das H (2020) Performance evaluation of different machine learning methods and deep-learning based convolutional neural network for health decision making. In: Nature inspired computing for data science. Springer, pp 201212
12. Heydari M, Teimouri M, Heshmati Z, Alavinia SM (2016) Comparison of various classification algorithms in the diagnosis of type 2 diabetes in iran. Int J Diabetes Dev Count 36(2):167173
13. Samant P, Agarwal R (2018) Machine learning techniques for medical diagnosis of diabetes using iris images. Comput Methods Program Biomed 157:121-128
14. Xiao Q, Dai J, Luo J, Fujita H (2019) Multi-view manifold regularized learning-based method for prioritizing candidate disease mirnas. Knowl-Based Syst 175:118-129
15. Butt AH, Rovini E, Fujita H, Maremmani C, Cavallo F (2020) Data-driven models for objective grading improvement of parkinson's disease. Ann Biomed Eng 48(12):2976-2987
16. Zhang X, Yang Y, Li T, Zhang Y, Wang H, Fujita H (2021) Cmc: A consensus multi-view clustering model for predicting alzheimers disease progression. Comput Methods Prog Biomed 199:105895
17. Lei X, Tie J, Fujita H (2020) Relational completion based nonnegative matrix factorization for predicting metabolite-disease associations. Knowl-Based Syst 204:106238
18. Uddin S, Khan A, Hossain ME, Moni MA (2019) Comparing different supervised machine learning algorithms for disease prediction. BMC Med Inf Decis Making 19(1):1-16
19. Razavian N, Blecker S, Schmidt AM, Smith-McLallen A, Nigam S, Sontag D (2015) Population-level prediction of type 2 diabetes from claims data and analysis of risk factors. Big Data 3(4):277287
20. Barabsi A-L (2007) Network medicine -from obesity to the 'diseasome'. England J Med 357(4):404-407
21. Loscalzo J, Kohane I, Barabasi A-L (2007) Human disease classification in the postgenomic era: a complex systems approach to human pathobiology. Mol Syst Biol 3(1):124
22. Fotouhi B, Momeni N, Riolo MA, Buckeridge DL (2018) Statistical methods for constructing disease comorbidity networks from longitudinal inpatient data. Appl Netw Sci 3(1):1-34
23. Aguado A, Moratalla-Navarro F, L´ opez-Simarro F, Moreno V (2020) Morbinet: multimorbidity networks in adult general population. analysis of type 2 diabetes mellitus comorbidity. Sci Rep 10(1):1-12
24. Folino F, Pizzuti C, Ventura M (2010) A comorbidity network approach to predict disease risk. In: International Conference on Information Technology in Bio-and Medical Informatics. Springer, pp 102-109
25. World Health Organization (2020) International classification of diseases (ICD) information sheet. https://www.who.int/ classifications/icd/factsheet/en/. Accessed 8 March 2021
26. The Australian Classification of Health Interventions (2020) ICD10-AM. http://www.accd.net.au/icd-10-am-achi-acs/. Accessed 8 March 2021
27. Charlson ME, Pompei P, Ales KL, MacKenzie CR (1987) A new method of classifying prognostic comorbidity in longitudinal studies: development and validation. J Chron Diseas 40(5):373383
28. Elixhauser A, Steiner C, Harris DR, Coffey RM (1998) Comorbidity measures for use with administrative data. Med Care:8-27
29. Asratian AS, Denley TristanMJ, H¨ aggkvist R (1998) Bipartite graphs and their applications, vol 131. Cambridge university press
30. Zweig KA, Kaufmann M (2011) A systematic approach to the one-mode projection of bipartite graphs. Soc Netw Anal Min 1(3):187-218
31. Capobianco E et al (2013) Comorbidity: a multidimensional approach. Trends Mol Med 19(9):515-521
32. Goh K-I, Cusick ME, Valle D, Childs B, Vidal M, Barab´ asi A-L (2007) The human disease network. Proc Natl Acad Sci 104(21):8685-8690

33. Sandford AJ, Weir TD, Pare PD (1997) Genetic risk factors for chronic obstructive pulmonary disease. Eur Respir J 10(6):13801391
34. Zhou T, Ren J, Medo M, Zhang Y-C (2007) Bipartite network projection and personal recommendation. Phys Rev E 76(4):046115
35. Shaw ME (1954) Group structure and the behavior of individuals in small groups. J Psychol 38(1):139-149
36. Bonacich P (1972) Factoring and weighting approaches to status scores and clique identification. J Math Sociol 2(1):113-120
37. Freeman LC (1978) Centrality in social networks conceptual clarification. Soc Netw 1(3):215-239
38. Holland PW, Leinhardt S (1971) Transitivity in structural models of small groups. Comp Group Stud 2(2):107-124
39. Kavanagh A, Bentley RJ, Turrell G, Shaw J, Dunstan D, Subramanian SV (2010) Socioeconomic position, gender, health behaviours and biomarkers of cardiovascular disease and diabetes. Soc Sci Med 71(6):1150-1160
40. Agah A (2013) Medical applications of artificial intelligence, 1st edn. Taylor &amp; Francis Group, Baton Rouge
41. Kleinbaum DG, Dietz K, Gail M, Klein M, Klein M (2002) Logistic regression. Springer
42. Cover T, Hart P (1967) Nearest neighbor pattern classification. IEEE Trans Inf Theory 13(1):21-27
43. Cortes C, Vapnik V (1995) Support-vector networks. Mach Learn 20(3):273-297
44. Lindley DV (1958) Fiducial distributions and bayes' theorem. J R Stat Soc Ser B (Methodol) 20(1):102-107
45. Quinlan JR (1986) Induction of decision trees. Mach Learn 1(1):81-106
46. Breiman L (2001) Random forests. Mach Learn 45(1):5-32
47. Chen T, Guestrin C (2016) Xgboost: A scalable tree boosting system. In: Proceedings of the 22 nd ACM SIGKDD international conference on knowledge discovery and data mining, pp 785-794
48. McCulloch WS, Pitts W (1943) A logical calculus of the ideas immanent in nervous activity. Bullet Math Biophys 5(4):115-133
49. Rumelhart DE, Hinton GE, Williams RJ (1986) Learning representations by back-propagating errors. Nature 323(6088):533
50. Kohavi R et al (1995) A study of cross-validation and bootstrap for accuracy estimation and model selection. In: IJCAI, vol 14, Montreal, pp 1137-1145
51. Fawcett T (2006) An introduction to roc analysis. Pattern Recogn Lett 27(8):861-874
52. Bastian M, Heymann S, Jacomy M (2009) Gephi: an open source software for exploring and manipulating networks. In: Proceedings of the International AAAI Conference on Web and Social Media, vol 3
53. Pedregosa F, Varoquaux G, Gramfort A, Michel V, Thirion B, Grisel O, Blondel M, Prettenhofer P, Weiss R, Dubourg V et al (2011) Scikit-learn: Machine learning in python. J Mach Learn Res 12:2825-2830
54. Chollet F et al (2015) Keras. https://keras.io
55. Kingma DP, Ba J (2014) Adam: A method for stochastic optimization. arXiv:1412.6980
56. Mani S, Chen Y, Elasy T, Clayton W, Denny J (2012) Type 2 diabetes risk forecasting from emr data using machine learning. In: AMIA Ann Symp Proc, vol 2012. American Medical Informatics Association, p 606
57. Yang J, Yao D, Zhan X, Zhan X (2014) Predicting disease risks using feature selection based on random forest and support vector machine. In: International Symposium on Bioinformatics Research and Applications. Springer, pp 1-11
58. Altmann A, Tolos ¸i L, Sander O, Lengauer T (2010) Permutation importance: a corrected feature importance measure. Bioinformatics 26(10):1340-1347
59. Scornet E, Biau G, Vert J-P (2015) Consistency of random forests. Ann Stat 43(4):1716-1741
60. Pippitt K, Li M, Gurgle HE (2016) Diabetes mellitus: screening and diagnosis. Amer Family Phys 93(2):103-109
61. Kavakiotis I, Tsave O, Salifoglou A, Maglaveras N, Vlahavas I, Chouvarda I (2017) Machine learning and data mining methods in diabetes research. Comput Struct Biotechnol J 15:104-116
62. Dinh A, Miertschin S, Young A, Mohanty SD (2019) A datadriven approach to predicting diabetes and cardiovascular disease with machine learning. BMC Med Inf Decis Making 19(1):1-15
63. Venugopala PS, Barh D, Ashwini B et al (2021) Artificial intelligence techniques for predicting type 2 diabetes. In: Advances in Artificial Intelligence and Data Engineering. Springer, pp 411-430

Publisher's note Springer Nature remains neutral with regard to jurisdictional claims in published maps and institutional affiliations.

và học sâu.

Haohui Lu nhận bằng Cử nhân Thương mại về quản lý vận hành và khoa học quyết định vào năm 2011 và bằng thạc sĩ về quản lý dự án vào năm 2012 từ University of Sydney, Australia. Anh hiện đang theo đuổi Nghiên cứu Bậc cao (Higher Degree Research - HDR) tại School of Project Management của Faculty of Engineering, The University of Sydney. Anh hiện đang nghiên cứu mô hình hóa nguy cơ dự đoán của các bệnh mạn tính bằng cách sử dụng học máy

Dr Shahadat Uddin là Giảng viên Cao cấp tại Faculty of Engineering của University of Sydney, Australia. Ông có các mối quan tâm nghiên cứu về tin học y tế, mạng lưới phức hợp, khoa học dữ liệu, trí tuệ nhân tạo và phân tích dự án. Dr Uddin đã công bố trong một số tạp chí quốc tế và đa ngành, bao gồm Expert Systems with Applications, Complexity, International Journal of Medical Informatics, Scientific Reports và Journal of

Informetrics . Dr Uddin đã được trao tặng nhiều giải thưởng học thuật cho sự xuất sắc nổi bật trong nghiên cứu của mình, bao gồm Top Researcher Award (Bangladesh University of Engineering &amp; Technology Alumni Australia, 2020), Campus Director Leadership Award (Central Queensland University 2006), Certificate for Research Excellence (University of Sydney 2010), Deans Research Award (University of Sydney, 2014).

Dr Farshid Hajati nhận bằng cử nhân kỹ thuật từ K. N. Toosi University of Technology, Iran, vào năm 2003 và bằng thạc sĩ và tiến sĩ về kỹ thuật điện tử từ Amirkabir University of Technology, Iran, lần lượt vào năm 2006 và 2011. Vào năm 2020, ông nhận bằng tiến sĩ thứ hai về khoa học dữ liệu sức khỏe từ Western Sydney University, Australia. Từ năm 2020, ông

đã là giảng viên cao cấp của College of Engineering and Science tại Victoria University Sydney. Mối quan tâm nghiên cứu của ông bao gồm học máy, khoa học dữ liệu, và sức khỏe số.

Mohammad Ali Moni nhận bằng tiến sĩ về Trí tuệ Nhân tạo và Tin sinh học từ University of Cambridge, the UK, vào năm 2014. Từ năm 2015 đến 2017, ông là nghiên cứu viên sau tiến sĩ tại Garvan Institute of Medical Research ở Sydney cũng như làm việc với tư cách là giảng viên liên kết tại University of New South Wales, Australia. Vào cuối năm 2017, ông được trao học bổng Deputy Vice-Chancellor của University of Sydney

và làm việc cho đến năm 2020. Vào năm 2020, ông gia nhập WHO Collaborating Center for eHealth, UNSW Digital Health, University of New South Wales, Australia. Mối quan tâm nghiên cứu của ông bao gồm Trí tuệ Nhân tạo, Học máy, Khoa học Dữ liệu và Tin sinh học lâm sàng.

Dr Matloob Khushi nhận bằng tiến sĩ từ University of Sydney vào năm 2016. Ông giữ các vị trí học thuật tại University of Sydney, Australia, và tại University of Suffolk, UK.
