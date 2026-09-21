<!-- extracted by pdf-extract | engine=docling | pages=18 | ocr=False | tables=9/9 | density=1.07 | score=100 -->

Danh mục nội dung có sẵn tại ScienceDirect

## Information Fusion

trang chủ tạp chí: www.elsevier.com/locate/inffus

## Cải thiện các giải thích chẩn đoán cục bộ của đái tháo đường bằng tổ hợp các bộ lọc nhiễu nhãn

Che Xu a , Peng Zhu a,* , Jiacun Wang b , Giancarlo Fortino c

- a Trường Kinh tế và Quản lý, Đại học Khoa học và Công nghệ Nam Kinh, Nam Kinh, Giang Tô, Trung Quốc
- b Khoa Khoa học Máy tính và Kỹ thuật Phần mềm, Đại học Monmouth, West Long Branch, NJ, Hoa Kỳ
- c Khoa Tin học, Mô hình hóa, Điện tử và Hệ thống (DIMES), Đại học Calabria, Via P. Bucci, Rende, CS, Ý

## THÔNG TIN BÀI BÁO

Từ khóa: Nhiễu nhãn (Label noise) Tổ hợp các bộ lọc nhiễu nhãn (Ensemble of label noise filters) Trí tuệ nhân tạo giải thích được (Explainable artificial intelligence) LIME Đái tháo đường (Diabetes mellitus)

## 1. Giới thiệu

Đái tháo đường (DM) là một bệnh mạn tính điển hình trải dài trên mọi nhóm tuổi, và triệu chứng chính của bệnh nhân DM là mức đường huyết cao [1,2]. Đặc biệt sau khi ăn, cơ thể người chuyển hóa thức ăn thành glucose. Ở người khỏe mạnh, cơ thể giải phóng insulin để thúc đẩy sự phân giải và chuyển hóa đường huyết, tăng tốc chu trình chuyển hóa glucose trong dòng máu để kiểm soát mức đường huyết. Tuy nhiên, bệnh nhân DM thường gặp khó khăn trong việc sản xuất đủ insulin để hỗ trợ quá trình này, dẫn đến tăng mức glucose trong dòng máu, gọi là tăng đường huyết. Các nghiên cứu hiện có chỉ ra rằng mức đường huyết cao thường có thể dẫn đến các biến chứng nghiêm trọng ở bệnh nhân, như tổn thương thần kinh, bệnh tim, đột quỵ, v.v. Tổ chức Y tế Thế giới (WHO) đã xác nhận rằng DM hiện đứng thứ chín trong tất cả các bệnh gây tử vong trên thế giới, và số lượng bệnh nhân DM tiếp tục tăng [3]. DM đã trở thành một bệnh nguy cơ cao mà

* Tác giả liên hệ. Địa chỉ E-mail: pzhu@njust.edu.cn (P. Zhu).

Nhận ngày 24 tháng 10 năm 2024; Nhận bản sửa ngày 22 tháng 12 năm 2024; Chấp nhận ngày 1 tháng 1 năm 2025

## TÓM TẮT

Trong kỷ nguyên dữ liệu lớn, việc chẩn đoán chính xác đái tháo đường (DM) thường đòi hỏi hợp nhất nhiều loại thông tin khác nhau. Học máy đã nổi lên như một cách tiếp cận phổ biến để đạt được điều này. Mặc dù có tiềm năng, sự chấp nhận lâm sàng vẫn còn hạn chế, chủ yếu do thiếu khả năng giải thích trong các dự đoán chẩn đoán. Sự xuất hiện của trí tuệ nhân tạo giải thích được (XAI) mang lại một giải pháp đầy hứa hẹn, tuy nhiên cả mô hình giải thích được và không giải thích được đều phụ thuộc nhiều vào các tập dữ liệu không nhiễu. Các bộ lọc nhiễu nhãn (LNFs) đã được thiết kế để nâng cao chất lượng tập dữ liệu bằng cách nhận diện và loại bỏ các mẫu bị gán nhãn sai, vốn có thể cải thiện hiệu năng dự đoán của các mô hình chẩn đoán. Tuy nhiên, tác động của nhiễu nhãn lên các giải thích chẩn đoán vẫn chưa được khám phá. Để giải quyết vấn đề này, bài báo này đề xuất một khung tổ hợp cho các LNFs hợp nhất thông tin từ các LNFs khác nhau qua ba pha. Ở pha thứ nhất, một bể đa dạng các LNFs được sinh ra. Thứ hai, kỹ thuật LIME (Giải thích cục bộ độc lập mô hình và diễn giải được) được sử dụng rộng rãi được dùng để cung cấp khả năng giải thích cục bộ cho các dự đoán chẩn đoán do các mô hình hộp đen tạo ra. Cuối cùng, bốn chiến lược tổ hợp được thiết kế để sinh ra các giải thích chẩn đoán cục bộ cuối cùng cho bệnh nhân DM. Ưu thế lý thuyết của tổ hợp cũng được chứng minh. Khung đề xuất được đánh giá toàn diện trên bốn tập dữ liệu DM để đánh giá khả năng giảm thiểu tác động bất lợi của nhiễu nhãn lên các giải thích chẩn đoán, so với 24 LNFs cơ sở. Kết quả thực nghiệm chứng minh rằng các LNFs riêng lẻ không thể đảm bảo nhất quán chất lượng của các giải thích chẩn đoán, trong khi tổ hợp LNF dựa trên các giải thích cục bộ cung cấp một giải pháp khả thi cho thách thức này.

đòi hỏi sự chú ý rộng rãi.

Theo các lý do làm tăng mức đường huyết, bệnh nhân DM được phân loại lâm sàng thành ba loại: type I, type II, và DM thai kỳ [2]. Bệnh nhân type 1 DM thường phát triển bệnh do tổn thương cơ quan tụy, dẫn đến khó khăn trong việc sản xuất đủ insulin để duy trì mức glucose máu bình thường. Ngoài việc tăng đường huyết, bệnh nhân loại này thường biểu hiện các triệu chứng như khát nước quá mức, giảm cân nhanh, và mờ mắt, vốn thường được chẩn đoán trong thời thơ ấu và thanh thiếu niên. Các tế bào của bệnh nhân type II DM kháng với insulin, làm cho việc duy trì mức đường huyết bình thường trở nên khó khăn, trong khi DM thai kỳ chỉ phát triển ở phụ nữ mang thai không có tiền sử trải nghiệm đái tháo đường. Type II DM phổ biến hơn trong dân số so với hai loại còn lại, trong đó khoảng 90% bệnh nhân được chẩn đoán mắc type II DM, nhưng mức độ nghiêm trọng của nó kém xa chúng [4]. Nhìn chung, tiêm insulin từng ngày có thể kiểm soát hiệu quả mức đường huyết cho bệnh nhân type 1 DM, và đái tháo đường thai kỳ biến mất sau khi em bé chào đời. Do đó, làm thế nào để chẩn đoán chính xác type II DM luôn là một trọng tâm trong lĩnh vực y tế, vốn rất quan trọng đối với việc quản lý chăm sóc sức khỏe của bệnh nhân DM. C. Xu et al.

Là một thành phần quan trọng của trí tuệ nhân tạo, học máy (ML) đã trải qua sự phát triển đáng kể trong những năm gần đây. Nhiều mô hình ML đã được đề xuất kể từ thế kỷ trước, qua đó làm phong phú nền tảng lý thuyết liên quan. Đồng thời, các ứng dụng thực tiễn của ML đã dần mở rộng để bao quát nhiều lĩnh vực đa dạng như y học [5,6], kinh doanh [7,8], và điện toán biên [9]. Đặc biệt trong y học, ML tìm thấy tính hữu dụng trong nhiều trường hợp khác nhau bao gồm chẩn đoán bệnh, khám phá thuốc, và điều trị cá nhân hóa. Tận dụng dữ liệu lâm sàng của bệnh nhân, các mô hình ML có thể dự báo sự xảy ra hoặc tiến triển của bệnh [10]. Hiện nay, tính hiệu quả của các mô hình ML trong việc chẩn đoán chính xác bệnh nhân DM đã được xác nhận bởi nhiều nghiên cứu rộng rãi [4,11-13], nhưng việc áp dụng chúng trong lĩnh vực y tế vẫn còn rất hiếm, đặc biệt khi so với mức độ phổ biến của chúng trong nghiên cứu lý thuyết. Lý do cơ bản của hiện tượng này là vì sự đánh đổi giữa độ chính xác và khả năng giải thích của các mô hình ML [14]. Khả năng giải thích đề cập đến khả năng của các mô hình ML cung cấp các dự đoán minh bạch và dễ hiểu cho con người. Vì các mô hình ML, đặc biệt là các mô hình phức tạp như Random Forests nông và Neural Networks sâu [15], thường được xem là hộp đen, khả năng giải thích nhằm cung cấp hiểu biết về cách các mô hình này đưa ra dự đoán hoặc quyết định. Sự minh bạch này là then chốt trong chẩn đoán lâm sàng DM, nơi các quyết định do mô hình ML đưa ra có thể có hậu quả đáng kể. Kết quả là, các quy trình chẩn đoán dựa trên các mô hình hộp đen này thường khó được các bác sĩ lâm sàng chấp nhận. May mắn thay, sự xuất hiện của các kỹ thuật giải thích hậu kỳ (PHETs) [16] cung cấp nhiều giải pháp khả thi. Là một trong những kỹ thuật Trí tuệ nhân tạo giải thích được (XAI) tiêu biểu, PHETs nhìn chung nhận một mô hình hộp đen làm mô hình dự đoán và sử dụng một mô hình hộp trắng làm mô hình giải thích. Mặc dù quy trình cụ thể thay đổi tùy thuộc vào dạng cuối cùng của các giải thích đầu ra, nó phù hợp với cách con người tự nhiên giải thích các quyết định hoặc quy trình [17]. Do đó, PHETs cũng đóng vai trò trung gian giữa các mô hình ML không giải thích được và giải thích được và thường được áp dụng trong các kịch bản mà cả hai mô hình một mình đều không thể đáp ứng các yêu cầu thực tiễn. Chẩn đoán DM là một ví dụ điển hình của các kịch bản này, nơi cả độ chính xác và khả năng giải thích cần được duy trì đồng thời. Vì lý do này, một số PHETs chủ đạo đã được dùng rộng rãi trong chẩn đoán DM để đảm bảo khả năng giải thích chẩn đoán [18,19], và LIME (Giải thích cục bộ độc lập mô hình và diễn giải được) là tiêu biểu nhất trong số đó. LIME được ưa chuộng hơn các PHETs khác vì hai lý do chính: bản chất độc lập mô hình của nó, vốn cho phép nó được kết hợp với bất kỳ mô hình ML nào, và khả năng sinh ra các quyết định hoặc dự đoán vừa chính xác vừa giải thích được [17].

Cho trước dự đoán của một mẫu do một mô hình không giải thích được tạo ra, LIME trước tiên xây dựng một mô hình minh bạch tuyến tính để xấp xỉ dự đoán này. Vì LIME thuộc loại PHETs cục bộ, mô hình tuyến tính được xây dựng là một mô hình thay thế cục bộ. Do đó, các giải thích do LIME cung cấp là các giải thích cục bộ và chỉ áp dụng cho một mẫu cụ thể, không phải tất cả các mẫu. Việc cung cấp các giải thích cục bộ khác nhau cho mỗi mẫu có ý nghĩa to lớn đối với cả việc phát triển các chiến lược điều trị cá nhân hóa cho bệnh nhân DM và việc hướng dẫn các bác sĩ thực hành lâm sàng, nhưng việc đạt được mục tiêu này liên quan chặt chẽ đến chất lượng của tập dữ liệu chẩn đoán đã thu thập. Thông thường, dữ liệu chất lượng cao cung cấp thông tin đầy đủ và đáng tin cậy, cho phép mô hình hộp đen đầu vào LIME học các khuôn mẫu chẩn đoán chính xác và mô hình minh bạch đầu ra của LIME trích xuất các giải thích cục bộ đáng tin cậy. Tuy nhiên, việc thu thập dữ liệu y tế như vậy thường là thách thức trong thực tế, đặc biệt ở các nước như Trung Quốc, nơi tài nguyên y tế cực kỳ khan hiếm. Việc đảm bảo tính đúng đắn của dữ liệu chẩn đoán liên quan trong hồ sơ y tế điện tử (EMRs) của bệnh nhân là không dễ dàng. Hơn nữa, hồ sơ chẩn đoán của mỗi bệnh nhân được gán nhãn một cách chủ quan bởi các bác sĩ, vốn có thể đưa vào các lỗi, đặc biệt khi khả năng chẩn đoán của một số bác sĩ bị hạn chế hoặc họ không nắm đủ thông tin. Những lỗi này trong dữ liệu chẩn đoán y tế thường được gọi là nhiễu nhãn [20,21]. Nhiều kỹ thuật đã được đề xuất để giảm thiểu tác động bất lợi của nhiễu nhãn lên hiệu năng chẩn đoán cuối cùng. Kỹ thuật được dùng phổ biến nhất là cách tiếp cận xóa, còn gọi là bộ lọc nhiễu nhãn (LNF), vốn cải thiện chất lượng tập dữ liệu bằng cách loại bỏ các mẫu bị gán nhãn sai [22]. Giống như LIME, LNF cũng độc lập mô hình và có thể được dùng trước bất kỳ mô hình ML nào. Mặc dù tính hiệu quả của một số LNFs chủ đạo đã được khảo sát bởi các nghiên cứu hiện có, điều đó vẫn chưa đủ để chứng minh rằng chúng có thể được áp dụng thành công trong chẩn đoán giải thích được của DM. Các lý do chính có ba mặt. Thứ nhất, LNF phụ thuộc dữ liệu [23,24], cho thấy rằng các tập dữ liệu khác nhau thường đòi hỏi các LNFs khác nhau. Việc không chọn được LNF phù hợp cho một tập dữ liệu cụ thể có thể làm suy yếu sự đảm bảo nhất quán về các lợi ích tích cực do LNFs mang lại. Lý do thứ hai liên quan chặt chẽ với lý do thứ nhất, nơi bản chất phụ thuộc dữ liệu của LNFs đặt ra một thách thức đáng kể cho việc nhận diện LNF tối ưu được điều chỉnh phù hợp với tập dữ liệu đích. Lý do thứ ba là phần lớn các nghiên cứu hiện có chủ yếu tập trung vào tác động của LNF lên việc nâng cao độ chính xác dự đoán, bỏ qua tác động của nó lên khả năng giải thích. Nói cách khác, liệu LNFs có thể giảm thiểu tác động bất lợi của nhiễu nhãn lên các giải thích cục bộ của dự đoán hay không vẫn chưa được biết. Vấn đề này đặc biệt rõ rệt trong chẩn đoán giải thích được của DM dựa trên LIME vì tác động hiển hiện không chỉ trong pha dự đoán mà còn trong quá trình giải thích [25]. Nếu tính đúng đắn và độ tin cậy của các giải thích chẩn đoán cuối cùng không được đảm bảo, nó sẽ cản trở đáng kể sự hiểu biết về toàn bộ quá trình chẩn đoán và cản trở sự cải thiện khả năng của bác sĩ.

Để giải quyết các vấn đề trên, bài báo này phát triển một khung tổ hợp của các LNFs cho chẩn đoán giải thích được của DM dựa trên LIME. Ban đầu, một bể đa dạng các LNF nền tảng được sinh ra. Nhận thấy rằng việc kết hợp các LNFs giống hệt nhau không đem lại bất kỳ cải thiện nào, cả các chiến lược đồng nhất và không đồng nhất đều được trình bày trong pha này để đảm bảo tính đa dạng giữa các LNFs được sinh ra. Mỗi LNF, khi được áp dụng cho tập dữ liệu gốc, xuất ra một vectơ kết quả chỉ ra các mẫu nào có thể bị nhiễm nhiễu nhãn và các mẫu nào không. Các vectơ này có thể được tổng hợp theo hai phương pháp riêng biệt: chúng có thể được kết hợp một lần để lọc tập dữ liệu hoặc được dùng tuần tự để tạo ra nhiều tập dữ liệu đã lọc. Phương pháp thứ nhất cho ra một tập dữ liệu đã lọc duy nhất, trong khi phương pháp sau sinh ra một số tập, cho phép kết hợp các LNFs cả trước và sau khi sinh các giải thích chẩn đoán cục bộ bằng LIME. Theo đó, hai cách tổ hợp tĩnh được thiết kế cho LNFs. Xây dựng trên tổ hợp tĩnh, tổ hợp động của LNFs cũng được phát triển, giả định rằng các LNFs hoạt động như các chuyên gia trong các lĩnh vực tương ứng của chúng. Cuối cùng, khung đề xuất bao gồm bốn cách tổ hợp khác nhau, hiệu lực của chúng được kiểm chứng bằng bốn tập dữ liệu DM thực tế. Phân tích so sánh với hai mươi bốn LNFs chuẩn không chỉ chứng minh rằng nhiễu nhãn làm suy giảm chất lượng của các giải thích cục bộ, mà còn làm nổi bật ưu thế của khung đề xuất trong việc giảm thiểu các tác động bất lợi của nhiễu nhãn lên các giải thích chẩn đoán cục bộ. Các thí nghiệm, vốn bao gồm hai loại nhiễu nhãn và năm thuật toán hộp đen, còn xác nhận thêm rằng khung đề xuất cũng độc lập mô hình và có thể tương thích với nhiều thuật toán ML khác nhau.

Theo hiểu biết tốt nhất của chúng tôi, đây là công trình đầu tiên khám phá cách nhiễu nhãn ảnh hưởng đến các giải thích dự đoán cục bộ và đề xuất một giải pháp hiệu quả để giảm thiểu tác động của nó. Bài báo này đóng góp ba điểm chính: (1) một khung tổ hợp cho LNFs được đề xuất để giải quyết thách thức của việc chọn LNF phù hợp nhất; (2) một giao thức thí nghiệm toàn diện được thiết kế để đánh giá khách quan tính hiệu quả của các LNFs khác nhau trong việc giảm tác động của nhiễu nhãn lên các giải thích cục bộ; và (3) hiệu năng của khung đề xuất được khảo sát bằng bốn tập dữ liệu chẩn đoán DM và hai chiến lược tiêm nhiễu.

Phần còn lại của bài báo này được tổ chức như sau. Phần 2 bao quát bối cảnh nghiên cứu, bao gồm các nguyên lý cơ bản của LNF và các phát triển gần đây trong chẩn đoán DM. Phần 3 trình bày chi tiết về khung đề xuất, C. Xu et al.

Hình 1. Quá trình huấn luyện mô hình dựa trên lọc nhiễu nhãn.

trong khi Phần 4 trình bày một nghiên cứu thực nghiệm để đánh giá tính hiệu quả của nó. Cuối cùng, Phần 5 kết luận bài báo này bằng cách tóm tắt các đóng góp nghiên cứu và phác thảo các hướng tiềm năng cho nghiên cứu tương lai.

## 2. Bối cảnh nghiên cứu

Phần này trình bày bối cảnh nghiên cứu của bài báo này từ hai khía cạnh. Một khía cạnh tập trung vào sự phát triển gần đây trong các LNFs, trong khi khía cạnh kia tập trung vào chẩn đoán giải thích được của DM.

## 2.1. Các bộ lọc nhiễu nhãn

Để ngăn hiệu năng dự đoán khỏi bị ảnh hưởng bởi nhiễu nhãn, nhiều LNFs khác nhau đã được đề xuất trong tài liệu. Như thể hiện trong Hình 1, LNF thường được dùng như một bước trung gian trước khi huấn luyện mô hình. Sau bước này, các mẫu (instance) nhiễu được nhận diện và xóa khỏi tập dữ liệu huấn luyện nhiễu. Do đó, kích thước của tập dữ liệu huấn luyện đã làm sạch thường nhỏ hơn tập dữ liệu gốc. Với tập dữ liệu huấn luyện đã làm sạch, mô hình ML hạ nguồn được xây dựng và hiệu năng của nó cũng được đánh giá để cung cấp phản hồi về tính hiệu quả của LNF. Nói rộng ra, các LNFs hiện có có thể được chia thành hai loại: LNFs dựa trên khoảng cách và LNFs dựa trên bộ phân loại [22]. LNF dựa trên khoảng cách phổ biến nhất là thuật toán K-Nearest Neighbor (KNN) phi tham số, vốn dùng khoảng cách Euclid để kiểm tra tính đúng đắn của nhãn mẫu. Nguyên lý cơ bản của KNN là nhãn của bất kỳ mẫu nào cũng nên nhất quán với nhãn đa số trong các lân cận gần nhất của nó. Điều này cho phép hiệu năng của KNN khá nhạy với nhiễu nhãn và do đó phù hợp với các nhiệm vụ lọc. Hiện nay, nhiều LNFs dựa trên KNN, như ENNF [26], AKNNF [27], và NCNF [28], đã được đề xuất trong tài liệu để bù đắp cho thiếu sót của KNN truyền thống từ các góc nhìn khác nhau. Mặc dù các biến thể này khác nhau ở một số chi tiết kỹ thuật của việc phát hiện nhiễu, chúng giả định rằng các mẫu tương tự nên có nhãn giống hoặc tương tự. Do đó, việc chọn các độ đo tương tự thường rất quan trọng cho sự thành công của chúng.

Chìa khóa cho sự thành công của các LNFs dựa trên bộ phân loại là việc chọn các thuật toán phân loại. Với sự trợ giúp của chiến lược kiểm định chéo, bất kỳ thuật toán phân loại nào về mặt lý thuyết đều có thể chấp nhận để phát hiện nhiễu. Các mẫu bị phân loại sai trong các fold xác thực được coi là nhiễu [29]. Các phương pháp ML chủ đạo, bao gồm Decision Trees, Support Vector Machines, và Naïve Bayes, đã được dùng để thực hiện nhiệm vụ này [22,30], và không lâu sau, tiềm năng của các bộ phân loại tổ hợp về khía cạnh này cũng được nhận diện. So với bộ phân loại riêng lẻ, rủi ro loại bỏ quá nhiều mẫu được giảm đáng kể nhờ việc áp dụng các mô hình tổ hợp [31,32]. Người ta đã thừa nhận rộng rãi rằng nếu một mẫu bị phân loại sai bởi hầu hết các bộ phân loại của một mô hình tổ hợp, mẫu này nhiều khả năng là nhiễu ở mức độ lớn. Sơ đồ bỏ phiếu như vậy thực sự nâng cao tính bền vững của các LNFs dựa trên bộ phân loại đối với nhiễu nhãn, nhưng một số nghiên cứu cũng nhận thấy rằng nó không thể đảm bảo hiệu năng lọc trong mọi trường hợp, đặc biệt khi đối mặt với các loại và mức độ nhiễu nhãn khác nhau [21,24]. Điều này nhất quán với định lý không có bữa trưa miễn phí (no free lunch), vốn phát biểu rằng không một mô hình nào có thể hoạt động tốt nhất trong mọi tình huống. Do đó, các LNFs khác nhau có thể cần được sử dụng cho các tập dữ liệu đích khác nhau; nếu không, việc áp dụng LNFs không phù hợp có thể dẫn đến việc loại bỏ các mẫu sạch rộng rãi hoặc nhận diện không đủ các mẫu nhiễu. Nói cách khác, nếu chúng ta muốn thiết kế một LNF tổng quát hơn, kết hợp nhiều LNFs có sẵn khác nhau sẽ là một cách khả thi vì mỗi LNF có năng lực trong một số kịch bản cụ thể [33]. Theo ý tưởng này, Khoshgoftaar và Rebours [32] kết hợp hai LNFs chuyên biệt cho nhiệm vụ dự đoán chất lượng phần mềm. Sáez và cộng sự [31] đề xuất một LNF lai dựa trên một số chiến lược lọc khác nhau và kiểm chứng tính hiệu quả của nó bằng 25 tập dữ liệu thực. Với sự cân nhắc về các lợi ích của cơ chế lấy mẫu con, Sabzevari và cộng sự [34] phát triển một LNF hai giai đoạn để nâng cao tính bền vững đối với nhiễu. Lưu ý rằng việc xây dựng LNF dựa trên mô hình tổ hợp cũng thuộc khuôn mẫu này vì các bộ phân loại khác nhau cũng bổ trợ nhau trong việc phát hiện nhiễu. Quan trọng hơn, số lượng lớn các bộ phân loại có sẵn cung cấp một cách dễ dàng để thu được các LNFs đa dạng trong điều kiện này [29]. Theo ý tưởng này, một khung tổ hợp mới cũng được đề xuất cho LNFs trong bài báo này. So với việc hợp nhất LNFs trước đây, khung này tập trung nhiều hơn vào việc giảm tác động của nhiễu nhãn lên các giải thích chẩn đoán. Cụ thể hơn, bốn chiến lược tổ hợp khác nhau được thiết kế để đạt được mục tiêu này dựa trên một bể các LNFs đa dạng.

## 2.2. Chẩn đoán giải thích được của đái tháo đường

Nhiều mô hình ML đã được dùng để hỗ trợ các chuyên gia y tế trong việc chẩn đoán các bệnh nhân có thể mắc DM. Hầu hết các mô hình này được áp dụng để dự đoán sự xảy ra của type II DM từ EMRs và đã đạt được kết quả tốt trên nhiều chỉ số hiệu năng khác nhau [4,35]. Tuy nhiên, do không có khả năng cung cấp các quá trình tính toán nội bộ minh bạch, các bác sĩ lâm sàng vẫn nghi ngờ độ tin cậy của các khuyến nghị chẩn đoán mà chúng cung cấp. May mắn thay, sự xuất hiện của các kỹ thuật XAI cung cấp một cơ hội để cải thiện tình huống này. Các kỹ thuật XAI được chia thành các mô hình minh bạch và PHETs [17]. Loại trước hàm ý rằng bản thân mô hình là giải thích được, trong khi loại sau được thiết kế để cung cấp khả năng giải thích cho các mô hình không giải thích được [17]. Nhiều kỹ thuật XAI khác nhau đã được khám phá cho chẩn đoán DM, nâng cao khả năng giải thích của các kết quả chẩn đoán đồng thời hỗ trợ bệnh nhân hiểu các nguyên lý đằng sau chẩn đoán của họ, qua đó cải thiện điều trị cá nhân hóa.

Các mô hình giải thích được được áp dụng trong chẩn đoán DM chủ yếu vì sự minh bạch vốn có của chúng [36]. Ví dụ, Abdullah và Selvakumar [37] phân tích các yếu tố nguy cơ liên quan đến type II DM bằng cách dùng Decision Trees minh bạch và cung cấp khả năng giải thích cho chẩn đoán của nó dựa trên các kết quả tương quan. Suyanto và cộng sự [38] phát triển một khung phát hiện giải thích được cho bệnh nhân type II DM trong đó KNN minh bạch được kết hợp với autoencoders để cung cấp khả năng giải thích dựa trên khoảng cách giữa các bệnh nhân. Dựa trên các kỹ thuật biến đổi đặc trưng, Wu và cộng sự [39] xây dựng một mô hình hồi quy logistic minh bạch cho chẩn đoán type II DM. Để duy trì đủ khả năng giải thích, các mô hình minh bạch thường bị giới hạn về kích thước và độ phức tạp trong các ứng dụng thực tiễn, nếu không, chúng cũng sẽ không thể chấp nhận được. Một ví dụ điển hình là Random Forests, vốn là một sự kết hợp của nhiều Decision Trees nhưng không thể được diễn giải [40]. PHETs cũng đã được dùng để cung cấp khả năng giải thích cho chẩn đoán DM, và C. Xu et al.

Hình 2. Lưu đồ của khung đề xuất. (a) Tổ hợp tĩnh của LNFs theo các bước sau: thu thập một tập dữ liệu chẩn đoán lịch sử, sinh nhiều LNF nền tảng, lọc tuần tự tập dữ liệu bằng tất cả các LNF nền tảng, kết hợp các LNFs dựa trên phát hiện nhiễu hoặc các giải thích cục bộ, và sinh các giải thích chẩn đoán cục bộ cuối cùng bằng LIME. Tất cả các LNFs được dùng để cải thiện các giải thích chẩn đoán cục bộ cho mỗi bệnh nhân mới. (b) Xây dựng trên tổ hợp tĩnh, tổ hợp động của LNFs kết hợp việc ước lượng năng lực dựa trên các vùng tương tự để chọn động các LNFs có năng lực nhất cho mỗi bệnh nhân mới. Các LNFs được chọn sau đó được kết hợp dựa trên các đầu ra của chúng để sinh các giải thích chẩn đoán cục bộ cuối cùng bằng LIME. Quá trình này đảm bảo rằng các LNFs khác nhau được sử dụng để cải thiện các giải thích chẩn đoán cho các bệnh nhân khác nhau.

hầu hết chúng dựa trên đặc trưng. Hai PHETs dựa trên đặc trưng được dùng phổ biến là LIME [41] và SHAP [42]. Như đã đề cập trước đó, LIME cung cấp khả năng giải thích cho các khuyến nghị chẩn đoán không giải thích được bằng cách huấn luyện các mô hình diễn giải được sử dụng dữ liệu nhiễu loạn cục bộ. Nó đã được Wang và cộng sự [43] áp dụng để sinh các giải thích chẩn đoán cho bệnh nhân DM dưới dạng các quy tắc quyết định đơn giản. Joseph và cộng sự [44] xây dựng một kiến trúc TabNet giải thích được cho chẩn đoán đái tháo đường trong đó LIME được dùng để đảm bảo khả năng giải thích cục bộ. Dựa trên LIME, Curia [41] phát triển một hệ thống hỗ trợ quyết định để đánh giá các yếu tố khác nhau ảnh hưởng đến sự phát triển của đái tháo đường như thế nào. SHAP là một C. Xu et al.

Bảng 1 Các ký hiệu toán học chính được sử dụng trong khung.

| Notations                           | Meanings                                        | Notations                      | Meanings                                                                             |
|-------------------------------------|-------------------------------------------------|--------------------------------|--------------------------------------------------------------------------------------|
| Tr ¼ { x n , y n )} N n = 1         | The training dataset                            | a                              | The example of interested test (patient) samples                                     |
| x n                                 | The feature vector of the n -th sample in Tr    | G ( ⋅ )                        | The explainable model output from LIME                                               |
| y n                                 | The diagnostic result of the n -th sample in Tr | B = ( b 1 , b 2 , … , b T )    | The synthetic neighborhood of the sample a                                           |
| N                                   | The number of patient samples in Tr             | b t                            | The t -th sample in B                                                                |
| E                                   | The dimension of the feature vector x n         | π a ( b t )                    | The proximity between samples b t and a                                              |
| lnf = { lnf 1 , lnf 2 , … , lnf M } | The pool of LNFs                                | b t , e                        | The e -th feature of b t                                                             |
| lnf m                               | The m -th LNF in lnf                            | I m = ( I m ,1 , … , I m , N ) | The noise identification result of lnf m                                             |
| M                                   | The number of LNFs                              | TrE                            | The training dataset obtained by integrating the noise identification results of lnf |
| Tr m                                | The training dataset filtered by the lnf m      | α = { α 1 , … , α E }          | The local explanations generated for sample a                                        |
| F ( ⋅ )                             | The black-box prediction model provided to LIME | N m = { s m ,1 , … , s m , K } | The similar region of sample a determined from Tr m                                  |

phương pháp giải thích bằng nhiễu loạn nhận diện các đặc trưng quan trọng đối với các khuyến nghị chẩn đoán. Khác với LIME, nó dùng các giá trị Shapley từ lý thuyết trò chơi để tính toán và so sánh tầm quan trọng của các đặc trưng khác nhau [45]. Kibria và cộng sự [46] phát triển một mô hình tổ hợp để phân loại bệnh nhân đái tháo đường và không đái tháo đường và họ dùng tầm quan trọng hoán vị (permutation importance) và các biểu đồ SHAP để đạt được mức độ giải thích cao. Với sự trợ giúp của SHAP, Annuzzi và cộng sự [47] đã đạt được hiểu biết rõ ràng về cách các yếu tố dinh dưỡng tác động đến glucose máu của DM. Ngoài ra, một số PHETs khác, như các quy tắc quyết định [19] và các xác suất có điều kiện [48], cũng đã được dùng trong chẩn đoán bệnh nhân DM.

## 3. Khung đề xuất

Khi xây dựng các mô hình chẩn đoán y tế bằng các kỹ thuật ML, việc xử lý nhiễu đã trở thành một pha thiết yếu do các khiếm khuyết vốn có trong dữ liệu chẩn đoán đã thu thập [49]. Việc áp dụng một LNF để loại bỏ các mẫu bị gán nhãn sai (nhiễu) là một cách phổ biến để cải thiện chất lượng dữ liệu trong pha này. Tuy nhiên, việc chọn LNF hiệu quả nhất đặt ra một thách thức đáng kể, do sự đa dạng rộng lớn của các LNFs có sẵn trong tài liệu. Vì mỗi LNF có thể hoạt động tối ưu trong việc phát hiện nhiễu ở các vùng cụ thể của tập dữ liệu, phần này giới thiệu một khung tổ hợp của các LNFs được thiết kế để giảm thiểu tình thế tiến thoái lưỡng nan trong việc chọn lựa. Hình 2 mô tả sơ đồ triển khai của tổ hợp LNF, và các chi tiết kỹ thuật tương ứng được cung cấp dưới đây. Để rõ ràng, Bảng 1 tóm tắt các ký hiệu chính được dùng trong khung đề xuất.

## 3.1. Sinh các LNF nền tảng cho tổ hợp

Giả sử rằng trong chẩn đoán DM, một tập dữ liệu chẩn đoán của bệnh nhân được thu thập là Tr = { xn , yn )} N n = 1, trong đó xn là một vectơ đặc trưng E chiều mô tả các triệu chứng của bệnh nhân thứ n, và yn biểu thị kết quả chẩn đoán liên quan. Đối với những người không mắc đái tháo đường, kết quả chẩn đoán của họ được ghi là yn = 0, trong khi đối với những người mắc đái tháo đường, kết quả chẩn đoán của họ được ghi là yn = 1 trong tập dữ liệu này. Theo định nghĩa gốc [50], nhiễu nhãn trong tập dữ liệu này đề cập đến các lỗi mà kết quả chẩn đoán của một người khỏe mạnh bị đổi thành 1 hoặc kết quả chẩn đoán của một bệnh nhân đái tháo đường bị đổi thành 0. Cả hai loại lỗi đều rất có hại và cần được xem xét nghiêm túc. Để xử lý chúng, một bể các LNFs lnf = { lnf 1, lnf 2, … , lnfM } được sinh ra trong bước đầu tiên của khung đề xuất để lọc tập dữ liệu chẩn đoán đã thu thập Tr. Lưu ý rằng điều này rất giống với học tổ hợp [51] vốn sinh ra một bể các bộ phân loại nền tảng để phân loại tốt hơn [52]. Việc dùng các thuật toán phân loại khác nhau trong học tổ hợp có thể sinh ra các bộ phân loại nền tảng đa dạng để cải thiện hiệu năng phân loại cuối cùng [53,54]. Tương tự, để nhận diện nhiễu tốt hơn từ các khía cạnh khác nhau, giả định rằng M LNFs được sinh ra cũng cần khác nhau trong khung đề xuất. Không thể thu được kết quả khác bằng cách kết hợp cùng một LNF lặp đi lặp lại. Theo bài tổng quan về LNF do Frénay và Verleysen [50] thực hiện, hai chiến lược có thể giúp chúng tôi đạt được mục tiêu này.

- (1) Các cấu hình đa dạng của một LNF đơn lẻ: Tương tự học tổ hợp đồng nhất, việc dùng các cấu hình đa dạng (bao gồm các tham số, kiến trúc, tập dữ liệu huấn luyện, và tập đặc trưng) cho cùng một LNF có thể thúc đẩy tính đa dạng trong lnf được sinh ra. Ví dụ, bộ lọc Edited Nearest Neighborhood cổ điển [26] có thể được biến đổi bằng cách điều chỉnh số lân cận gần nhất, cho ra nhiều biến thể LNF. Ngoài ra, LNF dựa trên Bagging đạt được tính đa dạng bằng cách áp dụng các tập con khác nhau của tập dữ liệu huấn luyện để tạo ra các biến thể LNF.
- (2) Các LNFs với nền tảng lý thuyết khác nhau: Việc dùng các LNFs dựa trên các nền tảng lý thuyết khác nhau cũng góp phần vào tính đa dạng. Sự biến thiên trong bể LNF lnf phát sinh từ các khác biệt nội tại giữa các LNFs, làm cho việc đo lường trực tiếp trở nên thách thức. Một cách tiếp cận lai, như kết hợp các LNFs dựa trên bộ phân loại [28] với các LNFs dựa trên độ tương tự [20], minh họa cho ý tưởng của chiến lược này.

Nhiều chiến lược khác đã được đề xuất trong tài liệu, nhưng hầu hết chúng là các kết hợp của hai cách tiếp cận nói trên. Ví dụ, phương pháp LNF lặp do Sáez và cộng sự [31] đề xuất tích hợp cả các thiết lập đa dạng của cùng một LNF và các loại LNFs khác nhau. Khi một mẫu được nhận diện nhất quán là nhiễu bởi nhiều LNFs, nó nhiều khả năng là nhiễu thực sự. Ngược lại, các kết quả không nhất quán giữa các LNFs đòi hỏi phân tích sâu hơn. Bằng cách đưa tập dữ liệu huấn luyện gốc Tr = { xn , yn )} N n = 1 vào M LNFs được sinh ra, nhiều phiên bản của tập dữ liệu đã lọc Tr có thể được suy ra. Đặt Tr m = { x m n , y m n )} Nm n = 1 biểu thị tập dữ liệu huấn luyện được lọc bởi LNF lnfm ( m = 1, 2, … , M ).

## 3.2. Chẩn đoán giải thích được cục bộ của đái tháo đường

Sử dụng tập dữ liệu huấn luyện đã lọc Tr m ( m = 1, 2, … , M ), nhiều phương pháp ML khác nhau có thể được dùng để xây dựng các mô hình chẩn đoán. Cho rằng các bác sĩ lâm sàng đòi hỏi các chẩn đoán vừa chính xác vừa giải thích được, khung đề xuất kết hợp một số phương pháp mà mặc dù vốn không giải thích được, vẫn đảm bảo độ chính xác cao. Để đáp ứng nhu cầu về khả năng giải thích, phương pháp LIME độc lập mô hình được dùng, cung cấp các giải thích cục bộ bền vững cho mỗi mẫu chẩn đoán. Như đã đề cập trước đó, LIME xuất sắc trong việc làm rõ cách các đặc trưng riêng lẻ đóng góp vào mỗi chẩn đoán, đảm bảo sự minh bạch của các dự đoán của mô hình [55]. Đặt F ( ⋅ ) biểu thị mô hình hộp đen được huấn luyện trên tập dữ liệu huấn luyện. Để giải thích dự đoán chẩn đoán F ( a ) cho một bệnh nhân quan tâm a, được đặc trưng bởi một tập E đặc trưng quan sát được, một mô hình tuyến tính cục bộ G ( ⋅ ) được sinh ra trong khung LIME để xấp xỉ hàm phức tạp F ( ⋅ ) [56]. Độ trung thực của mô hình thay thế G ( ⋅ ) với mẫu bệnh nhân a được đảm bảo thông qua một quá trình xấp xỉ, được biểu diễn hình thức như sau:

## Algorithm 1

Static LNF ensemble based on noise detection.

Input: original training dataset with label noise Tr = { xn , yn )} N n = 1 pool of LNFs lnf = { lnf 1, lnf 2, … , lnfM } black-box learning algorithm F ( ⋅ ) feature vector of the test sample a fixed threshold θ Output: Local explanations α 1 RM = ∅ 2 for m = 1, 2, … , M do 3 filter Tr with the lnfm to obtain the I m 4 RM = RM ∪ I m 5 end for 6 TrE = ∅ 7 for n = 1, 2, … , N do 8 calculate the sum ∑ M m = 1 Im , n of the n -th column of the matrix RM 9 if ∑ M m = 1 Im , n ≤ θ then 10 TrE = TrE ∪ ( xn, yn ) 11 end if 12 end for 13 use TrE to construct the black-box prediction model F ( ⋅ ) 14 generate the neighborhood B for sample a using random perturbation 15 solve the optimization model shown in Eq. (3) 16 extract the local explanations α = { α 1, … , α E } 17 return α

## Algorithm 2

Static LNF ensemble based on local explanations.

Input: original training dataset with label noise Tr pool of LNFs lnf = { lnf 1, lnf 2, … , lnfM } black-box learning algorithm F ( ⋅ ) feature vector of the test sample a Output: Local explanations α 1 CM = ∅ 2 for m = 1, 2, … , M do 3 filter Tr with lnfm to obtain Tr m 4 use Tr m to construct the black-box prediction model F ( ⋅ ) 5 generate the neighborhood B for sample a using random perturbation 6 solve the optimization model shown in Eq. (3) 7 extract the learned feature coefficients { α m , 1, … , α m , E } 8 CM = CM ∪ { α m , 1, … , α m , E } 9 end for 10 calculate the α with Eq. (7) 11 return α

## Bảng 2

Thông tin mô tả của các tập dữ liệu thí nghiệm.

| Id   |   Feature number |   Sample Number | Approximate category ratio (0:1)   |
|------|------------------|-----------------|------------------------------------|
| D1   |               16 |             520 | 8:5                                |
| D2   |                8 |             768 | 2:1                                |
| D3   |                7 |            1000 | 2.3:1                              |
| D4   |               17 |            4303 | 3:1                                |

## Algorithm 3

Injection of pairwise class noise.

Input: copy of original training dataset Tr = { xn , yn )} N n = 1 noise level nl Output: corrupted training dataset CTr 1 for n = 1, 2, … , N do 2 generate a random number between 0 and 1 3 if the random number is less than the noise level nl then 4 if the sample xn belongs to the majority class then 5 change the label yn of xn to the minority class 6 end if 7 end if 8 end for 9 CTr = Tr 10 return CTr

Ở đây, B = ( b 1, b 2, … , bT ) biểu thị lân cận tổng hợp của mẫu bệnh nhân a, vốn được sinh ra qua nhiễu loạn ngẫu nhiên, π a ( bt ) định lượng độ gần giữa các mẫu bt và a, và Ω ( G ) đo độ phức tạp của mô hình thay thế tuyến tính. Đối với các tập dữ liệu dạng bảng, π a ( bt ) thường được định nghĩa là

trong đó σ 2 biểu thị độ rộng nhân (kernel width). Cho trước các giá trị đặc trưng dạng bảng của

## Algorithm 4

Injection of uniform class noise.

Input: copy of original training dataset Tr = { xn , yn )} N n = 1

noise level nl

Output: corrupted training dataset CTr

1 calculate the number of samples whose labels will be changed, i.e., ⌊ N ⋅ nl ⌋

2 randomly select ⌊ N ⋅ nl ⌋ samples from Tr to be modified

- 3 for each selected sample do

- 4 replace its label with the opposite class label

5 end for

6 CTr = Tr

7 return CTr

Bảng 3

Các cấu hình chi tiết cho các LNFs được dùng trong các thí nghiệm của chúng tôi.

| Indexes   | LNFs   | Variants   | Configurations                                                                                                                                    |
|-----------|--------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| 1         | AKNNF  | AKNNF3     | Set the neighborhood size to 3                                                                                                                    |
| 2         |        | AKNNF5     | Set the neighborhood size to 5                                                                                                                    |
| 3         |        | AKNNF7     | Set the neighborhood size to 7                                                                                                                    |
| 4         | ENNF   | ENNF3      | Set the neighborhood size to 3                                                                                                                    |
| 5         |        | ENNF5      | Set the neighborhood size to 5                                                                                                                    |
| 6         |        | ENNF7      | Set the neighborhood size to 7                                                                                                                    |
| 7         | MKNNF  | MKNNF3     | Set the neighborhood size to 3                                                                                                                    |
| 8         |        | MKNNF5     | Set the neighborhood size to 5                                                                                                                    |
| 9         |        | MKNNF7     | Set the neighborhood size to 7                                                                                                                    |
| 10        | CF     | CFDT       | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy '                                                                         |
| 11        |        | CFLDA      | ) Five-fold cross validation LinearDiscriminantAnalysis()                                                                                         |
| 12        |        | CFSVM      | Five-fold cross validation SVC(kernel = ' linear ' , probability = True)                                                                          |
| 13        |        | CFMLP      | Five-fold cross validation MLPClassifier()                                                                                                        |
| 14        | MVEF   | MVEF1      | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1) LinearDiscriminantAnalysis()    |
| 15        | CEF    | CEF1       | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1) LinearDiscriminantAnalysis()    |
| 16        | MVEF   | MVEF2      | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1)                                 |
| 17        | CEF    | CEF2       | MLPClassifier() Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1) MLPClassifier() |
| 18        | ELF    | ELFBG      | Five-fold cross validation BaggingClassifier(max_samples = 0.7, n_estimators = 10)                                                                |
| 19        |        | ELFAB      | Five-fold cross validation AdaBoostClassifier(n_estimators = 10)                                                                                  |
| 20        |        | ELFXB      | Five-fold cross validation xgb.XGBClassifier(n_estimators = 10)                                                                                   |
| 21        |        | ELFRF      | Five-fold cross validation RandomForestClassifier(criterion = ' entropy ' , n_estimators = 10)                                                    |
| 22        | NCNF   |            | Five-fold cross validation NearestCentroid()                                                                                                      |
| 23 24     | CMNNF  |            | See reference [61]                                                                                                                                |
|           | CNDCF  |            | See reference [62]                                                                                                                                |

mẫu bt ( t = 1, … , T ) trên E đặc trưng quan sát được, tức là bt , e ( e = 1, … , E ), công thức trên có thể được biểu diễn tương đương như sau:

trong đó

Các hệ số đã học α e cung cấp hiểu biết về cách các đặc trưng riêng lẻ ảnh hưởng đến dự đoán F ( a ), với α e cao hơn cho thấy rằng các thay đổi trong đặc trưng thứ e có tác động lớn hơn lên F ( a ) [25]. Dấu của hệ số cũng cho chúng ta biết liệu tác động là dương hay âm, và hơn nữa, nó có thể được dùng để xác định hướng thay đổi đặc trưng nếu có nhu cầu thay đổi dự đoán. Khi tập dữ liệu huấn luyện không có nhiễu nhãn, mô hình hộp đen được huấn luyện F ( ⋅ ) được coi là đáng tin cậy, và mô hình thay thế tuyến tính G ( ⋅ ) cũng đáng tin cậy. Do đó, các hệ số của G ( ⋅ ) có thể phản ánh hiệu quả tầm quan trọng của các đặc trưng khác nhau trong quá trình chẩn đoán DM và do đó có thể được dùng làm các giải thích cục bộ. Cách tiếp cận này cho phép 'chẩn đoán giải thích được' cho bệnh nhân DM. Tuy nhiên, sự hiện diện của nhiễu nhãn phá vỡ quá trình học của mô hình hộp đen F ( ⋅ ), điều này lại tác động bất lợi đến quá trình xấp xỉ nói trên. Khi mức nhiễu tăng, độ tin cậy của các dự đoán chẩn đoán có thể suy giảm đáng kể. Xem xét các giới hạn vốn có của các LNFs riêng lẻ, các cách tổ hợp tĩnh và động của LNFs được trình bày dưới đây để giảm thiểu ảnh hưởng của nhiễu nhãn lên LIME.

## 3.3. Tổ hợp tĩnh của LNFs cho các giải thích cục bộ

Tương tự các tổ hợp bộ phân loại, tổ hợp của LNFs nhằm cải thiện việc phát hiện nhiễu nhãn bằng cách tận dụng giả thuyết rằng các LNFs khác nhau cung cấp các góc nhìn bổ trợ. Trong tổ hợp tĩnh, tất cả các thành viên của lnf = { lnf 1, lnf 2, … , lnfM } được dùng để cải thiện các giải thích chẩn đoán cục bộ cho tất cả các bệnh nhân DM quan tâm. Theo pha mà sự kết hợp xảy ra, tổ hợp tĩnh của LNFs có thể được chia thành tổ hợp dựa trên phát hiện nhiễu và tổ hợp dựa trên các giải thích cục bộ.

## 3.3.1. Tổ hợp LNF tĩnh dựa trên phát hiện nhiễu

Giả định chính của cách tiếp cận tổ hợp này là đầu ra của mỗi LNF có thể được biểu diễn dưới dạng một vectơ, chỉ ra các mẫu nào là nhiễu và các mẫu nào không. Theo giả định này, các đầu ra của tất cả các LNFs được tổng hợp để lọc tập dữ liệu chẩn đoán đã thu thập Tr, và tập dữ liệu đã lọc sau đó được dùng để xây dựng một mô hình hộp đen F ( ⋅ ) cho chẩn đoán DM. Giả sử rằng kết quả nhận diện của bộ lọc thứ m lnfm cho tập dữ liệu Tr được xuất ra là I m = ( Im ,1 , … , Im , N ), trong đó mẫu thứ n được phát hiện là nhiễu nhãn nếu Im , n = 1, và ngược lại, Im , n = 0. Ví dụ, cho trước một tập dữ liệu chẩn đoán gồm năm mẫu { x 1, x 2, x 3, x 4, x 5}, đầu ra của bộ lọc lnfm có thể là (0, 1, 0, 1, 0), chỉ ra rằng các mẫu x 2 và x 4 được đánh dấu là nhiễu nhãn bởi lnfm, trong khi các mẫu khác thì không. Sau khi xử lý tập dữ liệu gốc Tr qua M bộ lọc theo trình tự, ma trận thu được như sau:

Rõ ràng là nếu mẫu xn ( n = 1, … , N ) được đánh dấu là nhiễu bởi đa số các bộ lọc, tổng của cột thứ n của ma trận RM sẽ C. Xu et al.

Bảng 4 Hiệu năng giải thích trung bình của khung đề xuất và các LNFs cơ sở trên bốn tập dữ liệu. Kết quả tốt nhất cho mỗi trường hợp được in đậm. Nhiễu được tiêm

bằng LNS1.

| Id   |   Noise level |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|---------------|--------|--------|--------|--------|---------|------------------------|
| D1   |           0.1 | 0.2829 | 0.2025 | 0.2823 | 0.2069 |  0.2747 |                 0.2756 |
|      |           0.2 | 0.2862 | 0.2099 | 0.2816 | 0.2131 |  0.2779 |                 0.2764 |
|      |           0.3 | 0.2864 | 0.2155 | 0.2815 | 0.2183 |  0.2815 |                 0.2825 |
|      |           0.4 | 0.2897 | 0.2228 | 0.2847 | 0.2264 |  0.2804 |                 0.2791 |
|      |           0.5 | 0.2834 | 0.2293 | 0.2816 | 0.2331 |  0.2794 |                 0.2823 |
| D2   |           0.1 | 0.2324 | 0.1718 | 0.2333 |  0.176 |  0.2272 |                 0.2277 |
|      |           0.2 | 0.2319 | 0.1769 | 0.2305 | 0.1815 |  0.2183 |                  0.226 |
|      |           0.3 | 0.2301 | 0.1801 | 0.2283 | 0.1831 |  0.2179 |                 0.2258 |
|      |           0.4 | 0.2279 | 0.1817 |  0.228 | 0.1848 |  0.2224 |                 0.2216 |
|      |           0.5 | 0.2250 | 0.1852 | 0.2237 | 0.1893 |  0.2209 |                 0.2216 |
| D3   |           0.1 | 0.1347 | 0.0939 | 0.1331 | 0.0956 |  0.1125 |                 0.1282 |
|      |           0.2 | 0.1399 | 0.0962 | 0.1385 | 0.0976 |  0.1015 |                  0.135 |
|      |           0.3 | 0.1392 | 0.0965 |  0.137 | 0.0977 |  0.0969 |                 0.1357 |
|      |           0.4 | 0.1391 | 0.0988 | 0.1403 |    0.1 |  0.1014 |                 0.1365 |
|      |           0.5 | 0.1368 | 0.0995 | 0.1357 | 0.1004 |  0.1219 |                 0.1319 |
| D4   |           0.1 |   0.35 | 0.2646 | 0.3426 | 0.2693 |  0.3279 |                 0.3466 |
|      |           0.2 | 0.3391 | 0.2658 | 0.3265 | 0.2715 |  0.3031 |                 0.3338 |
|      |           0.3 | 0.3272 | 0.2658 | 0.3267 | 0.2692 |  0.3213 |                 0.3221 |
|      |           0.4 |  0.317 | 0.2675 | 0.3152 | 0.2714 |  0.3136 |                 0.3144 |
|      |           0.5 | 0.3107 | 0.2716 |  0.308 | 0.2775 |  0.3073 |                  0.309 |

Hiệu năng giải thích trung bình của khung đề xuất và các LNFs cơ sở trên bốn tập dữ liệu. Kết quả tốt nhất cho mỗi trường hợp được in đậm. Nhiễu được tiêm

Bảng 5 bằng LNS2.

| Id   |   Noise level |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|---------------|--------|--------|--------|--------|---------|------------------------|
| D1   |           0.1 | 0.2735 | 0.2084 | 0.2714 | 0.2116 |  0.2678 |                  0.268 |
|      |           0.2 | 0.2753 | 0.2252 | 0.2742 | 0.2269 |  0.2719 |                 0.2722 |
|      |           0.3 | 0.2861 | 0.2449 |  0.285 | 0.2457 |  0.2823 |                 0.2833 |
|      |           0.4 | 0.3021 |  0.269 |    0.3 | 0.2691 |  0.2966 |                 0.2986 |
|      |           0.5 | 0.3266 |  0.292 |  0.324 | 0.2935 |  0.3113 |                 0.3198 |
| D2   |           0.1 | 0.2289 | 0.1759 | 0.2313 | 0.1786 |  0.2252 |                 0.2236 |
|      |           0.2 | 0.2261 |  0.184 | 0.2261 | 0.1867 |  0.2235 |                 0.2236 |
|      |           0.3 | 0.2298 | 0.1941 | 0.2296 |  0.197 |   0.216 |                 0.2285 |
|      |           0.4 | 0.2327 |  0.206 | 0.2295 |  0.208 |  0.2167 |                 0.2336 |
|      |           0.5 | 0.2497 | 0.2193 | 0.2464 | 0.2189 |  0.2123 |                 0.2445 |
| D3   |           0.1 | 0.1327 |  0.094 | 0.1325 | 0.0952 |  0.1185 |                 0.1273 |
|      |           0.2 | 0.1416 | 0.0989 | 0.1404 | 0.1003 |  0.1112 |                 0.1338 |
|      |           0.3 | 0.1443 | 0.1018 |  0.145 |  0.103 |  0.0999 |                 0.1369 |
|      |           0.4 | 0.1498 | 0.1065 | 0.1543 | 0.1064 |     0.1 |                 0.1441 |
|      |           0.5 |   0.15 | 0.1032 | 0.1475 | 0.1032 |  0.0983 |                 0.1418 |
| D4   |           0.1 | 0.3346 | 0.2655 | 0.3346 | 0.2686 |  0.3301 |                 0.3328 |
|      |           0.2 | 0.3161 | 0.2723 |  0.316 | 0.2752 |  0.3065 |                 0.3149 |
|      |           0.3 | 0.3108 | 0.2839 | 0.3105 | 0.2869 |  0.3071 |                 0.3096 |
|      |           0.4 | 0.3169 | 0.3002 | 0.3179 | 0.3024 |  0.3123 |                 0.3158 |
|      |           0.5 | 0.3296 | 0.3167 | 0.3297 | 0.3172 |  0.3163 |                 0.3272 |

gần với M. Khi tổng là 0 hoặc M, chúng ta có thể quyết đoán giữ lại hoặc loại bỏ mẫu xn. Tuy nhiên, trong các kịch bản thực tế, hiếm khi gặp một tình huống lý tưởng như vậy. Do tính đa dạng giữa các LNFs được sinh ra, mỗi cột thường chứa cả 1 và 0. Trong ngữ cảnh này, một ngưỡng cố định θ = M /2 được đặt để xác định liệu một mẫu có phải là nhiễu hay không. Cụ thể, khi ∑ M m = 1 Im , n &gt; θ, mẫu thứ n được loại bỏ khỏi tập dữ liệu đã thu thập Tr. Đặt TrE biểu thị tập dữ liệu chẩn đoán được lọc bởi thao tác này. Bằng cách xây dựng mô hình hộp đen F ( ⋅ ) với TrE, mô hình thay thế tuyến tính G ( ⋅ ) thu được để giải mô hình tối ưu được thể hiện trong Eq. (3). Các hệ số đã học được dùng làm các giải thích cục bộ α = { α 1, … , α E } cho dự đoán chẩn đoán của bệnh nhân DM đích a. Algorithm 1 tóm tắt quá trình trên.

Độ phức tạp tính toán của Algorithm 1 có thể được phân tích như sau. Các Bước 1-6 có độ phức tạp xấp xỉ O ( M ⋅ N ), trong khi các Bước 7-12 biểu hiện độ phức tạp tương tự O ( N ⋅ M ). Đối với Bước 13, vì độ phức tạp tính toán của mô hình hộp đen F ( ⋅ ) và kích thước của TrE không thể được xác định trước, nó được giả định là O ( F ). Bước 14 có độ phức tạp ước tính O ( T ⋅ E ), và Bước 15 đòi hỏi xấp xỉ O ( T ⋅ E 2 + E 3 ). Do đó, độ phức tạp tính toán tổng thể của tổ hợp tĩnh dựa trên phát hiện nhiễu là khoảng O (2 M ⋅ N + F + T ⋅ E + T ⋅ E 2 + E 3 ).

## 3.3.2. Tổ hợp LNF tĩnh dựa trên các giải thích cục bộ

Quá trình tổ hợp này được thực hiện sau khi sinh các giải thích chẩn đoán cục bộ thông qua từng bộ lọc riêng lẻ. Để giải thích dự đoán chẩn đoán cho bệnh nhân a, các tập dữ liệu huấn luyện được lọc bởi M bộ lọc được dùng tuần tự để sinh các giải thích cục bộ. Theo Phần 3.2, LIME xuất ra một tập các hệ số α e làm các giải thích cục bộ của dự đoán chẩn đoán. Có M tập các giải thích chẩn đoán cục bộ. Đối với bệnh nhân quan tâm a, hãy ký hiệu tập các hệ số học được từ tập dữ liệu huấn luyện Tr m là α m = { α m , 1, … , α m , E } ( m = 1, … , M ). M tập các hệ số tạo thành ma trận sau

Bảng 6 Thiết lập tham số của các thuật toán hộp đen.

| Algorithms   | Codes                                                                                                                                                    |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| XB           | import xgboost as xgb blackBoxModel = xgb.XGBClassifier(n_estimators = 10, random_state = 123)                                                           |
| GB           | from sklearn.ensemble import GradientBoostingClassifier blackBoxModel = GradientBoostingClassifier(n_estimators = 10, random_state = 123)                |
| AB           | from sklearn.ensemble import AdaBoostClassifier blackBoxModel = AdaBoostClassifier(n_estimators = 10, random_state = 123)                                |
| RF           | from sklearn.ensemble import RandomForestClassifier blackBoxModel = RandomForestClassifier(criterion = ' gini ' , n_estimators = 10, random_state = 123) |
| NN           | from sklearn.neural_network import MLPClassifier blackBoxModel = MLPClassifier(hidden_layer_sizes = (10,), random_state = 123)                           |
| SVM          | from sklearn.svm import SVC blackBoxModel = SVC(kernel = ' rbf ' , probability = True, random_state = 123)                                               |

Bằng cách lấy tổng mỗi cột của ma trận CM, tầm quan trọng trung bình của đặc trưng thứ e trong việc dự đoán chẩn đoán của mẫu a được tính là

Cuối cùng, α = { α 1 , … , α E } được xuất ra làm các giải thích chẩn đoán cục bộ của bệnh nhân a. Toàn bộ quy trình được tóm tắt trong Algorithm 2.

Độ phức tạp tính toán của Algorithm 2 được phân tích như sau. Bước 3 có độ phức tạp xấp xỉ O ( N ). Tương tự Bước 13 của Algorithm 1, độ phức tạp tính toán của Bước 4 cũng được giả định là O ( F ). Bước 5 có độ phức tạp O ( T ⋅ E ), trong khi Bước 6 đòi hỏi xấp xỉ O ( T ⋅ E 2 + E 3 ). Vì các bước này được thực hiện cho mỗi LNF, độ phức tạp tính toán tổng thể của tổ hợp tĩnh dựa trên các giải thích cục bộ là khoảng O ( M ⋅ ( N + F + T ⋅ E + T ⋅ E 2 + E 3 ) + M ⋅ E ).

## 3.4. Tổ hợp động của LNFs cho các giải thích cục bộ

Ngược lại với tổ hợp tĩnh của LNFs, vốn kết hợp tất cả các LNFs có sẵn để nâng cao các giải thích chẩn đoán cục bộ, cách tiếp cận tổ hợp động hoạt động dưới giả định rằng việc dùng các LNFs có năng lực nhất là đủ để đảm bảo các giải thích cục bộ chất lượng cao cho một mẫu cho trước. Do đó, việc đánh giá năng lực của mỗi LNF khá quan trọng đối với toàn bộ quá trình. Để xác định năng lực của một LNF cho mẫu bệnh nhân a, một vùng tương tự N m = { sm ,1 , … , sm , K } của a được nhận diện từ tập dữ liệu đã lọc Tr m ( m = 1, 2, … , M ) bằng thuật toán KNN [57]. Theo nguyên lý tự nhiên rằng các mẫu bệnh nhân tương tự nên có các giải thích chẩn đoán cục bộ tương tự, năng lực của mỗi bộ lọc lnfm được đánh giá dựa trên hiệu năng của nó trong việc cung cấp các giải thích cục bộ cho vùng tương tự N m sử dụng tập dữ liệu Tr m. Đánh giá này được thực hiện độc lập với hiệu năng của các bộ lọc khác. Bằng cách cung cấp tập dữ liệu đã lọc Tr m cho LIME được mô tả trong Phần 3.2, các giải thích chẩn đoán cục bộ cho mẫu tương tự sm , k ( m = 1, … , M, k = 1, … , K ) thu được là { α k m , 1 , … , α k m , E }. Mức năng lực clm của bộ lọc lnfm ( m = 1, 2, … , M ) được định nghĩa là tính nhất quán nội bộ giữa K tập các giải thích cục bộ {{ α k m , e } E e = 1 } K k = 1, được tính là

Một giá trị clm thấp hơn cho thấy tính nhất quán cao hơn giữa các giải thích cục bộ được suy ra từ tập dữ liệu Tr m, phản ánh hiệu năng tốt hơn của bộ lọc lnfm. Dựa trên các kết quả ước lượng năng lực của M bộ lọc, một ngưỡng định trước δ được dùng để phân loại các LNFs là có năng lực hoặc không có năng lực. Để đảm bảo tính thích nghi trong tổ hợp động, ngưỡng này được đặt thành hiệu năng trung bình của tất cả các LNFs, cụ thể là δ

= ∑ M m = 1 clm M. Một bộ lọc lnfm được coi là phù hợp cho mẫu bệnh nhân a nếu clm &lt; δ. Đối với mẫu bệnh nhân a, đặt các LNFs được chọn được ký hiệu là lnf a = { lnf a 1 , … , lnf a J } sao cho J &lt; M. Nếu các đầu ra của J bộ lọc này được thu thập làm các vectơ phát hiện nhiễu, quy trình tổ hợp tĩnh phác thảo trong Algorithm 1 được dùng để kết hợp chúng. Thay vào đó, nếu các đầu ra của J bộ lọc được thu thập làm các giải thích cục bộ, quy trình tổ hợp tĩnh mô tả trong Algorithm 2 được dùng cho việc kết hợp chúng. Do đó, hai phương pháp tổ hợp động riêng biệt cũng được phát triển trong khung đề xuất, tùy thuộc vào các đầu ra của J bộ lọc cần được kết hợp. Độ phức tạp tính toán của quá trình đánh giá động mô tả trên là khoảng O ( M ⋅ ( N + N log N + F + K ( T ⋅ E + T ⋅ E 2 + E 3 ) + K 2 ⋅ E ). Đối với tổ hợp tĩnh kế tiếp, cho trước J LNFs được chọn, độ phức tạp của tổ hợp dựa trên phát hiện nhiễu là xấp xỉ O (2 J ⋅ N + F + T ⋅ E + T ⋅ E 2 + E 3 ), trong khi tổ hợp dựa trên các giải thích cục bộ có độ phức tạp xấp xỉ O ( J ⋅ ( N + F + T ⋅ E + T ⋅ E 2 + E 3 ) + J ⋅ E ).

## 3.5. Phân tích lý thuyết

Trong phần này, chúng tôi chứng minh về mặt lý thuyết cơ sở đằng sau tổ hợp LNF. Để tiện phân tích, chúng tôi giả định rằng các LNFs được sinh ra độc lập với nhau và rằng tất cả các LNFs có cùng tỷ lệ lỗi phát hiện nhiễu, ký hiệu là er. Đối với một mẫu xn, lỗi phát hiện er của LNF thứ m lnfm được tính là

trong đó yn chỉ ra liệu mẫu xn có phải là nhiễu hay không. Khi các kết quả phát hiện nhiễu của M LNFs được kết hợp với chiến lược kết hợp trung bình, kết quả phát hiện tổ hợp cuối cùng có thể được biểu diễn về mặt toán học như sau

trong đó II ( ⋅ ) là hàm chỉ thị. Do đó, nếu có ∑ M m = 1 Im , n &gt; M / 2, tổ hợp LNF quyết định rằng mẫu xn là nhiễu, và lỗi phát hiện của tổ hợp được tính là

Cho rằng quyết định tổ hợp được xác định bởi một ngưỡng cố định θ = M /2, có hai trường hợp khác nhau cần xem xét. Trường hợp thứ nhất là khi mẫu xn không phải là nhiễu, tức là yn = 0. Trong trường hợp này, lỗi tổ hợp có thể được biểu diễn lại như sau

Vì các đầu ra của LNFs độc lập và chỉ có hai giá trị khả dĩ, lỗi tổ hợp có thể được ước tính bằng phân phối Nhị thức, vốn là xác suất ít nhất M /2 LNFs cung cấp các kết quả phát hiện sai [58]. Cho trước tỷ lệ lỗi phát hiện er, xác suất mà mỗi LNF nhận diện đúng nhiễu là 1 er. Do đó, đối với mẫu sạch xn, xác suất mà tổ hợp LNF phân loại nó là nhiễu có thể được ước tính là

Dựa trên luật số lớn và định lý giới hạn trung tâm, chúng ta có thể kết luận rằng khi M tăng, lỗi phát hiện tổ hợp E hội tụ về er và được giảm thêm nhờ thao tác lấy trung bình. Trong trường hợp thứ hai, nơi yn = 1, phép chứng minh tuân theo một quá trình tương tự và được bỏ qua cho ngắn gọn. Cuối cùng, chúng ta có thể kết luận rằng tổ hợp của C. Xu et al.

Hình 3. Các kết quả hiệu năng của tất cả các LNFs cơ sở trên tập dữ liệu D1.

nhiều LNFs cải thiện chất lượng tổng thể của tập dữ liệu bằng cách giảm các lỗi phát hiện nhiễu.

## 4. Thí nghiệm

Chúng tôi khảo sát hiệu năng của khung đề xuất bằng bốn tập dữ liệu thực của bệnh nhân DM. Các quy trình thí nghiệm chi tiết được phác thảo như sau.

## 4.1. Mô tả và xử lý tập dữ liệu

Bảng 2 tóm tắt bốn tập dữ liệu DM lấy từ UCI và Kaggle được dùng trong các thí nghiệm của chúng tôi. Các tập dữ liệu này khác nhau về số đặc trưng, dao động từ 7 đến 17, và về số mẫu, dao động từ 520 đến 4303. Các đặc trưng chung trên các tập dữ liệu này bao gồm Age, BMI, và Blood Pressure. Tỷ lệ bệnh nhân DM so với bệnh nhân Non-DM khác nhau giữa các tập dữ liệu, nhưng nhìn chung, tỷ lệ bệnh nhân Non-DM thấp hơn, phản ánh tỷ lệ mắc DM thấp hơn trong dân số. Điều quan trọng cần lưu ý là các tập dữ liệu gốc chứa các mẫu thiếu, vốn được loại bỏ trước các thí nghiệm của chúng tôi. Các mẫu còn lại được chuẩn hóa về khoảng từ 0 đến 1 cho mỗi đặc trưng bằng chuẩn hóa Min-Max. Kiểm định chéo 5-fold được dùng để phân hoạch mỗi tập dữ liệu thành năm tập con không chồng lấn có kích thước bằng nhau. Bốn trong số các tập con này được dùng làm tập dữ liệu chẩn đoán đã thu thập, tức là tập dữ liệu huấn luyện gốc Tr, trong khi tập con còn lại đóng vai trò là tập dữ liệu kiểm tra để cung cấp mẫu bệnh nhân kiểm tra a. Để đảm bảo tính công bằng, tất cả các phương pháp được so sánh đều được đánh giá bằng cùng các fold, và kiểm định chéo được lặp lại năm lần. Hiệu năng cuối cùng được báo cáo là trung bình trên năm lần chạy lặp này.

Để mô phỏng các kịch bản thực tế nơi dữ liệu chẩn đoán bao gồm các kết quả không đúng, chúng tôi triển khai hai chiến lược sinh nhiễu nhãn riêng biệt: nhiễu lớp theo cặp (pairwise class noise) [30] và nhiễu lớp đồng đều (uniform class noise) [24]. Nhiễu lớp theo cặp giả định nhiễu chỉ xảy ra ở các mẫu từ lớp đa số, trong khi nhiễu lớp đồng đều giả định tất cả các mẫu có xác suất bị nhiễm như nhau. Các chiến lược này được gọi là LNS1 và LNS2 tương ứng, và được áp dụng độc lập. Algorithms 3-4

Hình 4. Các kết quả hiệu năng của tất cả các LNFs cơ sở trên tập dữ liệu D2.

trình bày chi tiết các quy trình tiêm LNS1 và LNS2 vào một bản sao của tập dữ liệu huấn luyện gốc Tr. Để phân biệt, tập dữ liệu huấn luyện bị nhiễm được ký hiệu là CTr. Cả khung đề xuất và các phương pháp LNF cơ sở được so sánh đều được xây dựng trên CTr. Năm mức nhiễu nhãn khác nhau, tức là 10 %, 20 %, 30 %, 45 %, và 50 %, được xem xét trong các thí nghiệm của chúng tôi.

## 4.2. Thiết lập thí nghiệm

Để tạo một bể các LNFs đa dạng, các LNFs chủ đạo được xem xét và triển khai trong các thí nghiệm của chúng tôi. Chúng bao gồm AKNNF [27], ENNF [26], MKNNF [59], CF [28], MVEF [31,60], CEF [31,34], ELF [31], NCNF [28], CMNNF [61], và CNDCF [62]. Bằng cách đặt các tham số khác nhau, cuối cùng chúng tôi suy ra 24 biến thể riêng biệt của các LNFs này, và cả các LNFs đồng nhất và không đồng nhất đều được kết hợp trong khung đề xuất. Các mô tả chi tiết về 24 biến thể này được trình bày dưới đây, và các cấu hình của chúng được thể hiện trong Bảng 3. 24 biến thể này cũng đóng vai trò là các phương pháp cơ sở trong các thí nghiệm của chúng tôi.

- AKNNF: Phương pháp này mở rộng thuật toán KNN truyền thống bằng cách tăng dần số lân cận (K) từ 1 đến K. Các mẫu bị phân loại sai cho tất cả K giá trị được gán nhãn là nhiễu và loại bỏ. Trong các thí nghiệm của chúng tôi, chúng tôi đặt K là 3, 5, và 7, tương ứng với AKNNF3, AKNNF5, và AKNNF7.
- ENNF: Phương pháp này dùng trực tiếp thuật toán KNN truyền thống với một K cố định để lọc các mẫu. Các mẫu có nhãn khác với K lân cận gần nhất của chúng được coi là nhiễu và loại bỏ. Trong các thí nghiệm của chúng tôi, K được đặt là 3, 5, và 7, với các LNFs tương ứng được ghi là ENNF3, ENNF5, và ENNF7.

Hình 5. Các kết quả hiệu năng của tất cả các LNFs cơ sở trên tập dữ liệu D3.

- MKNNF: Phương pháp này đưa vào lân cận gần nhất tương hỗ (MNN) làm tiêu chí lọc nhiễu. Mặc dù khác với KNN, nó vẫn đòi hỏi một tham số K, cũng được đặt là 3, 5, và 7. Các LNFs tương ứng là MKNNF3, MKNNF5, và MKNNF7.
- CF: Sử dụng kỹ thuật kiểm định chéo, phương pháp này chia tập dữ liệu thành năm tập con. Bốn tập được dùng để huấn luyện một bộ phân loại, trong khi các mẫu bị phân loại sai trong tập thứ năm được nhận diện là nhiễu và loại bỏ. Chúng tôi áp dụng Decision Trees, Linear Discriminant Analysis, Support Vector Machine, và Multi-layer Perceptron làm các bộ phân loại. Chúng được triển khai bằng gói scikit-learn của Python, và các LNFs thu được là CFDT, CFLDA, CFSVM, và CFMLP.
- MVEF và CEF: Cả hai phương pháp đều mở rộng CF bằng cách kết hợp nhiều bộ phân loại. MVEF dùng bỏ phiếu đa số, trong khi CEF dùng chiến lược đồng thuận chặt chẽ hơn. Hai nhóm bộ phân loại được dùng: (1) KNN, Decision Trees, và Linear Discriminant Analysis, và (2) Decision Trees, KNN, và Multi-layer Perceptron. Các LNFs thu được là MVEF1, CEF1, MVEF2, và CEF2.
- ELF: Phương pháp này dùng kiểm định chéo và các thuật toán học tổ hợp (Bagging, AdaBoosting, XGBoost, và Random Forest) để nhận diện các mẫu nhiễu. Các mẫu bị phân loại sai được loại bỏ. Các LNFs thu được là ELFBG, ELFAB, ELFXB, và ELFRF. Gói scikit-learn của Python triển khai tất cả các thuật toán ngoại trừ XGBoost.
- NCNF: Phương pháp này thay thế KNN truyền thống bằng các lân cận trọng tâm K gần nhất (K-nearest centroid neighbors) để phát hiện nhiễu. Các mẫu bị phân loại sai được loại bỏ. Phương pháp này được triển khai bằng gói scikit-learn của Python với các tham số mặc định.
- CMNNF: Phương pháp này huấn luyện hai mạng nơ-ron bổ trợ, một mạng với tập dữ liệu gốc và mạng kia với phần bù nhãn của nó. Các mẫu bị phân loại sai bởi cả hai mạng được loại bỏ làm nhiễu. Các tham số mạng nhất quán với các tham số trong [61].
- CNDCF: Phương pháp này kết hợp các bộ lọc dựa trên tổ hợp và dựa trên khoảng cách. Trước tiên, các mẫu nhiễu được phân loại là nhiễu mạnh hoặc nhiễu yếu bằng phương pháp ELF. Sau đó, một bộ lọc dựa trên khoảng cách loại bỏ các mẫu nhiễu

Hình 6. Các kết quả hiệu năng của tất cả các LNFs cơ sở trên tập dữ liệu D4.

dựa trên phân bố của chúng. Các tham số nhất quán với các tham số trong [62].

Mục tiêu của chúng tôi là đánh giá liệu khung đề xuất có thể giảm thiểu các tác động của nhiễu nhãn lên chẩn đoán giải thích được của bệnh nhân DM hay không. Hiệu năng được đánh giá dựa trên các giải thích chẩn đoán cục bộ do LIME sinh ra. Các giải thích cục bộ được tạo ra từ tập dữ liệu huấn luyện gốc Tr đóng vai trò là chuẩn tham chiếu cho việc khảo sát hiệu năng của khung đề xuất. Nếu khung đề xuất hoặc LNF chuẩn đủ mạnh, các giải thích cục bộ được sinh ra bởi đầu ra cuối cùng của nó nên xấp xỉ gần với chuẩn tham chiếu. Đối với một bệnh nhân cho trước a, sự khác biệt như vậy giữa các giải thích cục bộ có thể được định nghĩa như sau:

trong đó α g biểu thị các giải thích cục bộ được sinh ra từ tập dữ liệu huấn luyện sạch Tr và α biểu thị các giải thích cục bộ được sinh ra từ tập dữ liệu huấn luyện bị nhiễm CTr bằng khung đề xuất. Tương tự, bằng cách thay α bằng các giải thích cục bộ được sinh ra dựa trên CTr xuất ra bởi mỗi LNF cơ sở lnfm ( m = 1, … , M ), hiệu năng của LNF riêng lẻ tương ứng cũng có thể được đánh giá. Sự khác biệt trên càng nhỏ thì hiệu năng càng tốt. Đối với mô hình hộp đen F ( ⋅ ) được dùng trong LIME, chúng tôi áp dụng thuật toán XGBoost (XB) để cung cấp dự đoán không giải thích được do sự phổ biến của nó trong chẩn đoán DM [63,64]. Số bộ học nền tảng trong XB được đặt là 10 và các tham số khác là các thiết lập mặc định trong gói xgboost 1, như được trình bày chi tiết trong Bảng 6.

## 4.3. Kết quả và phân tích

Để tiện so sánh và phân tích, khung đề xuất dựa trên bốn chiến lược tổ hợp khác nhau được gọi là PMSN (Tổ hợp tĩnh C. Xu et al.

1 https://xgboost.readthedocs.io/en/latest/parameter.html

Bảng 7 Hiệu năng giải thích trung bình của khung đề xuất dưới các thuật toán hộp đen khác. Nhiễu được tiêm bằng LNS1.

| Id   | Algorithms   |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|--------------|--------|--------|--------|--------|---------|------------------------|
| D1   | GB           | 0.1667 | 0.1393 | 0.1642 | 0.1415 |  0.1612 |                 0.1618 |
|      | AB           | 0.0741 | 0.0665 | 0.0723 | 0.0664 |  0.0711 |                 0.0756 |
|      | RF           | 0.2401 | 0.1917 | 0.2382 | 0.1928 |  0.2316 |                 0.2395 |
|      | NN           | 0.2281 | 0.1994 | 0.2274 | 0.2018 |  0.2238 |                 0.2243 |
|      | SVM          | 0.2508 | 0.2288 | 0.2504 | 0.2346 |  0.2333 |                 0.2517 |
| D2   | GB           |  0.122 | 0.1022 | 0.1214 | 0.1049 |  0.1185 |                 0.1188 |
|      | AB           | 0.0561 | 0.0391 |  0.051 |  0.039 |  0.0524 |                  0.053 |
|      | RF           | 0.2124 | 0.1686 | 0.2136 |  0.171 |  0.2108 |                 0.2108 |
|      | NN           | 0.0563 | 0.0438 | 0.0555 | 0.0449 |  0.0512 |                 0.0515 |
|      | SVM          | 0.1851 | 0.1687 | 0.1861 | 0.1811 |  0.1849 |                 0.1856 |
| D3   | GB           | 0.0472 | 0.0341 | 0.0465 | 0.0339 |  0.0447 |                 0.0446 |
|      | AB           | 0.0318 | 0.0247 | 0.0287 | 0.0227 |  0.0265 |                 0.0267 |
|      | RF           | 0.1757 | 0.1291 | 0.1787 |  0.131 |  0.1485 |                 0.1744 |
|      | NN           | 0.0345 | 0.0308 | 0.0349 | 0.0328 |  0.0334 |                 0.0344 |
|      | SVM          | 0.0204 | 0.0195 | 0.0196 | 0.0137 |  0.0171 |                  0.017 |
| D4   | GB           | 0.1736 | 0.1552 | 0.1727 | 0.1589 |  0.1724 |                 0.1735 |
|      | AB           | 0.2064 | 0.1556 | 0.2053 | 0.1577 |  0.2047 |                 0.2054 |
|      | RF           | 0.2571 | 0.2118 | 0.2574 | 0.2156 |  0.2562 |                 0.2612 |
|      | NN           | 0.2805 | 0.2483 | 0.2789 | 0.2523 |  0.2783 |                   0.28 |
|      | SVM          | 0.2956 |  0.271 | 0.2994 | 0.2864 |  0.2972 |                 0.3012 |

Bảng 8 Hiệu năng giải thích trung bình của khung đề xuất dưới các thuật toán hộp đen khác. Nhiễu được tiêm bằng LNS2.

| Id   | Algorithms   |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|--------------|--------|--------|--------|--------|---------|------------------------|
| D1   | GB           | 0.1904 | 0.1798 | 0.1892 | 0.1803 |  0.1874 |                 0.1892 |
|      | AB           | 0.0874 | 0.0797 | 0.0839 | 0.0795 |   0.082 |                 0.0848 |
|      | RF           |  0.295 | 0.2585 |  0.295 | 0.2601 |  0.2763 |                 0.2944 |
|      | NN           | 0.2635 | 0.2493 | 0.2639 | 0.2501 |  0.2584 |                 0.2588 |
|      | SVM          |  0.261 | 0.2601 |  0.261 |   0.26 |  0.2607 |                 0.2611 |
| D2   | GB           | 0.1283 | 0.1219 | 0.1279 | 0.1221 |  0.1274 |                 0.1266 |
|      | AB           | 0.0474 | 0.0418 | 0.0461 |  0.041 |  0.0444 |                 0.0444 |
|      | RF           | 0.2381 | 0.1987 | 0.2329 | 0.2003 |  0.1981 |                 0.2355 |
|      | NN           | 0.0563 | 0.0438 | 0.0555 | 0.0449 |   0.055 |                 0.0554 |
|      | SVM          | 0.1924 | 0.1914 |  0.192 |  0.191 |  0.1912 |                 0.1919 |
| D3   | GB           | 0.0531 | 0.0374 | 0.0518 | 0.0377 |  0.0447 |                 0.0484 |
|      | AB           |  0.028 | 0.0235 | 0.0265 | 0.0214 |  0.0243 |                 0.0243 |
|      | RF           | 0.1844 | 0.1337 | 0.1785 | 0.1355 |  0.1306 |                  0.184 |
|      | NN           | 0.0325 | 0.0287 |  0.033 | 0.0299 |   0.032 |                 0.0322 |
|      | SVM          | 0.0234 | 0.0185 | 0.0211 | 0.0157 |  0.0158 |                  0.022 |
| D4   | GB           | 0.1873 | 0.1858 | 0.1873 | 0.1859 |  0.1871 |                 0.1871 |
|      | AB           | 0.1857 | 0.1854 | 0.1857 | 0.1852 |  0.1854 |                 0.1855 |
|      | RF           | 0.2961 | 0.2683 |  0.293 | 0.2695 |  0.2697 |                 0.2974 |
|      | NN           | 0.2877 | 0.2858 | 0.2883 | 0.2856 |   0.286 |                 0.2868 |
|      | SVM          | 0.3111 | 0.3109 | 0.3109 | 0.3109 |  0.3109 |                  0.311 |

dựa trên phát hiện nhiễu), PMSL (Tổ hợp tĩnh dựa trên các giải thích cục bộ), PMDN (Tổ hợp động dựa trên phát hiện nhiễu), và PMDL (Tổ hợp động dựa trên các giải thích cục bộ) tương ứng. Các kết quả hiệu năng trung bình của các chiến lược này được trình bày chi tiết trong Bảng 4 và 5. Để tiện so sánh hơn nữa, các kết quả hiệu năng của LNF cơ sở tốt nhất trong số 24 LNFs được đánh giá cũng được trình bày trong hai bảng, với hiệu năng riêng lẻ của mỗi LNF được minh họa trong Hình 3-6. Trong các hình này, trục hoành biểu thị chỉ số của mỗi LNF, với 1 tương ứng với LNF đầu tiên và 24 với LNF cuối cùng. LNF cơ sở tốt nhất sau đây được gọi là BILNF. Bảng 4 và 5 cho thấy rằng các giải thích chẩn đoán cục bộ do khung đề xuất sinh ra không nhất quán gần với chuẩn tham chiếu hơn so với các giải thích do các LNFs riêng lẻ tạo ra. Cụ thể, cả PMSN và PMDN có hiệu năng tương tự các LNFs riêng lẻ. Để chứng minh tác động của nhiễu nhãn lên các giải thích chẩn đoán cục bộ, sự khác biệt giữa các giải thích được sinh ra từ tập dữ liệu huấn luyện gốc sạch Tr và các giải thích từ tập dữ liệu huấn luyện bị nhiễm CTr được tính là benchmark difference (khác biệt chuẩn), như thể hiện trong các cột cuối của Bảng 4 và 5. Trên bốn tập dữ liệu, rõ ràng là trong khi áp dụng một LNF đơn lẻ cho CTr có thể giảm sự khác biệt này, mức giảm không phải lúc nào cũng đáng kể, và trong một số trường hợp, nó thậm chí có thể có tác dụng ngược lại. Hiện tượng này cũng được quan sát tương tự với PMSN và PMDN, nhưng không với PMSL và PMDL. Đáng chú ý, PMSL và PMDL vượt trội PMSN và PMDN trong việc tối thiểu hóa sự khác biệt này. Tuy nhiên, cần lưu ý rằng ưu thế này giảm dần khi mức nhiễu tăng, cho thấy các giới hạn của khung đề xuất. Khi tập dữ liệu bị nhiễm nặng bởi nhiễu nhãn, khung đề xuất sẽ thất bại. Điều này khá bình thường vì khi một tập dữ liệu đầy nhiễu nhãn, các khác biệt chuẩn được báo cáo trong các cột cuối của Bảng 4 và 5 cũng sẽ trở nên lớn hơn. Ngoài ra, bất kể khung đề xuất hay BILNF được dùng, việc chọn LNS1 hay LNS2 để tiêm nhiễu không ảnh hưởng đáng kể đến hiệu năng. Điều này gợi ý rằng loại nhiễu nhãn có tác động hạn chế lên các giải thích chẩn đoán cục bộ so với mức nhiễu. Dựa trên các phát hiện này, khuyến nghị nên kết hợp các LNFs dựa trên các giải thích cục bộ thay vì phát hiện nhiễu, do hiệu năng kém hơn của loại sau.

Hình 3-5 mô tả sự so sánh hiệu năng của 24 LNFs cơ sở trên bốn tập dữ liệu, cho ra ba quan sát chính. Thứ nhất, có những chênh lệch hiệu năng đáng chú ý giữa các LNFs, đặc biệt giữa các LNFs không đồng nhất, hơn là giữa các LNFs đồng nhất. Ví dụ, C. Xu et al.

Hình 7. So sánh các phiếu thắng, hòa, và thua giữa PMSL và các phương pháp khác.

mặc dù mức nhiễu tăng, sự khác biệt hiệu năng giữa ba LNFs đồng nhất đầu tiên (tức là AKNNF3, AKNNF5, và AKNNF7) vẫn ở mức tối thiểu. Tuy nhiên, so sánh LNF thứ sáu và thứ bảy trong Hình 3(b) cho thấy một khoảng cách hiệu năng đáng kể giữa ENNF và MKNNF. Điều này chỉ ra rằng nếu chúng ta muốn thu được một tập dữ liệu chất lượng cao, việc chọn một LNF phù hợp là một vấn đề cần được xem xét nghiêm túc. Thứ hai, nhiễu lớp đồng đều (LNS2) dường như có tác động lớn hơn lên hiệu năng LNF trong việc cải thiện chất lượng các giải thích cục bộ so với nhiễu lớp theo cặp (LNS1). Trong các tập dữ liệu D1 và D2, việc tăng mức nhiễu lớp theo cặp không ảnh hưởng đáng kể đến hiệu năng LNF về mặt này. Tuy nhiên, như thể hiện trong Hình 3(b) và Hình 4(b), tình huống này hoàn toàn khác khi nhiễu được chuyển sang nhiễu lớp đồng đều. Khi mức nhiễu đồng đều tăng, sự khác biệt giữa các giải thích cục bộ được sinh ra từ CTr và các giải thích từ Tr trở nên lớn dần. Hơn nữa, sự khác biệt này có thể có một mối quan hệ hàm số với mức nhiễu lớp đồng đều vì khi mức nhiễu tăng, sự khác biệt này cũng tăng theo. Tuy nhiên, mối quan hệ này nằm ngoài phạm vi của nghiên cứu này và đáng được điều tra thêm. Dù sao đi nữa, các phát hiện này gợi ý rằng dùng LNS2 thay vì LNS1 để tiêm nhiễu có thể cho ra các kết quả phân biệt hơn nếu chúng ta muốn triển khai một đánh giá hiệu quả về hiệu năng của LNF trong việc cải thiện các giải thích cục bộ. Phát hiện thứ ba liên quan đến kích thước của tập dữ liệu. Trong ba tập dữ liệu đầu tiên, các khác biệt giải thích nhìn chung tăng với các mức nhiễu lớp đồng đều cao hơn. Ngược lại, trong tập dữ liệu cuối cùng, việc thêm bất kỳ loại nhiễu nào dường như giảm các khác biệt này. Như mô tả trong Hình 6, khác biệt giải thích lớn nhất luôn được quan sát khi mức nhiễu là 0.1, bất kể LNF được dùng. Bảng 4 và 5 chứng thực quan sát này, gợi ý rằng khi kích thước tập dữ liệu tăng, tính hiệu quả của các LNFs trong việc cải thiện các giải thích cục bộ có thể giảm.

## 4.4. Thảo luận

Để khám phá cách nhiễu nhãn ảnh hưởng đến các giải thích chẩn đoán của DM, bài báo này phát triển một khung tổ hợp cho LNFs dựa trên LIME. Trong thí nghiệm trên, XB được chọn làm mô hình dự đoán hộp đen để đảm bảo hiệu năng của khung đề xuất. Tuy nhiên, C. Xu et al.

Bảng 9 Các kết quả kiểm định t ghép cặp cho mỗi so sánh.

| Comparisons         |   Statistics |   p -values | Significant?   |
|---------------------|--------------|-------------|----------------|
| PMSN vs. PMSL       |        8.729 |    2.13E-11 | Yes            |
| PMSN vs. PMDN       |        4.172 |      0.0001 | Yes            |
| PMSN vs. PMDL       |        8.538 |    4.06E-11 | Yes            |
| PMSL vs. PMDN       |        8.412 |    6.22E-11 | Yes            |
| PMSL vs. PMDL       |        3.228 |      0.0023 | Yes            |
| PMDN vs. PMDL       |        8.283 |    9.65E-11 | Yes            |
| PMSN vs. BILNF      |         4.65 |    2.72E-05 | Yes            |
| PMSL vs. BILNF      |        5.678 |    8.24E-07 | Yes            |
| PMDN vs. BILNF      |        4.324 |    7.92E-05 | Yes            |
| PMDL vs. BILNF      |        5.432 |    1.93E-06 | Yes            |
| PMSN vs. Benchmark  |        4.824 |    1.52E-05 | Yes            |
| PMSL vs. Benchmark  |        7.987 |    2.66E-10 | Yes            |
| PMDN vs. Benchmark  |        1.903 |      0.0632 | No             |
| PMDL vs. Benchmark  |        7.881 |    3.84E-10 | Yes            |
| BILNF vs. Benchmark |        3.872 |     0.00033 | Yes            |

Hình 8. So sánh các phiếu thắng, hòa, và thua giữa PMDL và các phương pháp khác.

xem xét bản chất độc lập mô hình của LIME, liệu khung đề xuất có cũng có bản chất này hay không vẫn cần được kiểm chứng thêm. Do đó, phần này sẽ thảo luận bản chất của khung đề xuất về phương diện này. Cũng dưới khung thí nghiệm trên, phần này chọn bốn thuật toán khác, bao gồm Gradient Boosting (GB), AdaBoost (AB), Random Forests (RF), Neural Networks (NN), và Support Vector Machines (SVM), để thay thế mô hình XB được xây dựng trong thí nghiệm trên. Năm thuật toán này được chọn chủ yếu vì ứng dụng rộng rãi của chúng trong DM, như [36,41,43]. Năm thuật toán được chọn đều được triển khai trong Python, và các thiết lập tham số cụ thể được thể hiện trong Bảng 7. Có thể thấy từ Bảng 4 và 5 rằng khi mức nhiễu là 0.5, hiệu năng của khung đề xuất chỉ tốt hơn một chút so với BILNF cơ sở và benchmark difference. Do đó, trong phần thảo luận này, hiệu năng của khung đề xuất dưới các thuật toán hộp đen khác chủ yếu được thảo luận khi mức nhiễu là 0.5. Các kết quả thí nghiệm được thể hiện trong Bảng 7 và 8.

Bảng 7 và 8 minh họa rằng việc chọn các thuật toán dự đoán khác nhau có tác động đáng chú ý lên hiệu năng của khung đề xuất. Đối với các tập dữ liệu D1, D2, và D3, khi mô hình hộp đen được xây dựng bằng AB, nhiễu nhãn dường như có tác động tối thiểu lên các giải thích cục bộ được sinh ra, như được chứng tỏ bởi các khác biệt chuẩn tương đối nhỏ. Mặc dù khung đề xuất giảm thêm sự khác biệt giải thích này, mức độ cải thiện không đáng kể. Tuy nhiên, khi dùng bốn thuật toán khác (tức là GB, RF, NN, và SVM) để xây dựng các mô hình hộp đen, tác động của nhiễu nhãn lên các giải thích cục bộ tương ứng trở nên rõ rệt hơn. Các kết quả này chỉ ra rằng, trong khi LIME độc lập mô hình, hiệu năng của khung đề xuất không nhất quán trên các mô hình hộp đen khác nhau. Do đó, đối với LIME, việc chọn một thuật toán hộp đen phù hợp nên được điều chỉnh theo các đặc điểm của tập dữ liệu. Ví dụ, trong ngữ cảnh của thí nghiệm này, việc chọn thuật toán AB để xây dựng mô hình hộp đen cho các tập dữ liệu D1 và D2 có thể loại bỏ nhu cầu xử lý nhiễu, vì nó có thể đảm bảo chất lượng của các giải thích được sinh ra gần với chuẩn tham chiếu α g. Ngược lại, khi các thuật toán khác được chọn, có thể vẫn cần xem xét các chiến lược để giảm thiểu tác động của nhiễu lên các giải thích dự đoán. So sánh giữa Bảng 4, 5, 7, và 8 cho thấy rằng khi mô hình hộp đen được chuyển từ XB sang các thuật toán khác, khung đề xuất dường như thất bại. Điều này gợi ý rằng ngay cả khi dùng khung đề xuất, các khác biệt trong các giải thích được sinh ra từ Tr và CTr không được giảm đáng kể. Một ví dụ điển hình có thể được tìm thấy trong Bảng 8, nơi hiệu năng của khung đề xuất trên các tập dữ liệu D1, D2, và D4 không lệch đáng kể khỏi các khác biệt chuẩn. Tuy nhiên, khung đề xuất vẫn vượt trội BILNF về mặt này, cho thấy rằng việc tổng hợp nhiều LNFs vẫn là một cách tiếp cận hiệu quả để giảm thiểu tác động của nhiễu lên các giải thích dự đoán. Cuối cùng, bất kể thuật toán nào được chọn để xây dựng mô hình hộp đen, cả PMSL và PMDL đều nhất quán vượt trội PMSN, PMDN, và BILNF.

Để tiện phân tích, Hình 7 và 8 minh họa các số đếm thắng, hòa, và thua của PMSL và PMDL so với các phương pháp khác trên tất cả các thuật toán dưới mức nhiễu 0.5. Các kết quả so sánh được ghi lại như sau: ở đây lấy hàng kết quả đầu tiên của Bảng 7 làm ví dụ, nếu hiệu năng giải thích trung bình của PMSL nhỏ hơn của PMSN, PMSL được tính là một phiếu thắng; ngược lại, nó được tính là một phiếu thua. So sánh PMSL với các phương pháp khác (tức là PMSN, PMDN, PMDL, BILNF, và Benchmark) cũng được thực hiện theo quy trình đếm này. Các kết quả so sánh của PMDL với tất cả các phương pháp cơ sở cũng có thể thu được theo cách tương tự. Tổng cộng, PMSL và PMDL được so sánh 48 lần bằng hai chiến lược tiêm nhiễu và sáu thuật toán tương ứng. Chúng ta có thể thấy rằng PMSL và PMDL có thể thắng trong hầu hết các so sánh, và số phiếu thắng của PMSL cũng cao hơn của PMDL.

Dựa trên hiệu năng giải thích trung bình của tất cả các phương pháp được so sánh trên 48 so sánh, một kiểm định t ghép cặp [62] cũng được dùng để khảo sát tính tương thích của khung đề xuất với các thuật toán khác nhau từ góc nhìn thống kê. Bảng 9 trình bày các kết quả của mỗi so sánh liên quan đến phương pháp đề xuất. Khác với so sánh trước đó (xem Hình 7 và 8), vốn dựa trên các phiếu thắng/thua, các kết quả kiểm định t ghép cặp được tính dựa trên hiệu năng giải thích của mỗi cặp phương pháp được so sánh. Ví dụ, trong hàng kết quả đầu tiên của Bảng 9, 'PMSN vs. PMSL' chỉ ra một so sánh giữa hiệu năng giải thích trung bình của phương pháp PMSN và của phương pháp PMSL. Trong quá trình tính toán, hiệu năng giải thích trung bình của PMSN dưới các điều kiện khác nhau (bao gồm sáu thuật toán hộp đen và hai chiến lược tiêm nhiễu) được coi là một tập quan sát, trong khi của PMSL tạo thành một tập quan sát khác. Mỗi cặp quan sát từ hai tập này, thu được dưới cùng điều kiện, được dùng để tính thống kê. Ở mức tin cậy 0.05, rõ ràng là hầu hết các kết quả đều có ý nghĩa thống kê. Xem xét dấu của thống kê trong cột thứ hai của Bảng 9, dễ dàng quan sát rằng, bất kể thuật toán nào được chọn, PMSL và PMDL nhất quán vượt trội PMSN và PMDN. Mặc dù PMSL và PMDL biểu hiện hiệu năng tương tự trong các thí nghiệm đã đề cập ở trên, vẫn có một khác biệt có ý nghĩa thống kê giữa chúng vì 0.0023 &lt; 0.05. Hiệu năng của cả PMSN và PMDN đều kém hơn của BILNF, gợi ý rằng việc tổng hợp LNF dựa trên các kết quả phát hiện nhiễu không giảm hiệu quả tác động của nhiễu lên các giải thích. Ngược lại, chỉ việc tổng hợp LNF dựa trên các giải thích cục bộ được sinh ra mới đạt được mục tiêu này. Điều này chỉ ra rằng, bất kể thuật toán nào được chọn, việc kết hợp LNF dựa trên các giải thích cục bộ vượt trội BILNF, trong khi bản thân BILNF vượt trội việc kết hợp LNF dựa trên phát hiện nhiễu. Các so sánh từng cặp với các khác biệt chuẩn chứng tỏ rằng việc dùng PMSL hoặc PMDL cải thiện chất lượng của các giải thích được suy ra từ LIME ở một mức độ nào đó, bất kể thuật toán nào được chọn. Tóm lại, trong khi khung đề xuất tương thích với các thuật toán khác nhau dựa trên LIME, có thể cần khám phá thêm để xác định thuật toán nào là tối ưu cho một tập dữ liệu cho trước.

## 5. Kết luận và công trình tương lai

Bài báo này cung cấp các hiểu biết giá trị về tác động của nhiễu nhãn lên các giải thích chẩn đoán cục bộ và đề xuất một khung tổ hợp mới để giảm thiểu tác động này. Đổi mới quan trọng nhất của khung đề xuất là bốn chiến lược tổ hợp riêng biệt được thiết kế để sinh các giải thích chẩn đoán cục bộ cuối cùng cho bệnh nhân DM. Sử dụng bốn tập dữ liệu DM thực, chúng tôi so sánh hiệu năng của khung đề xuất với 24 LNFs khác nhau về khả năng giảm tác động của nhiễu lên các giải thích dự đoán cục bộ. Các kết quả thí nghiệm cho thấy một số phát hiện quan trọng. Thứ nhất, việc tổng hợp nhiều LNFs dựa trên các kết quả phát hiện nhiễu của chúng thường hoạt động tương tự các LNFs riêng lẻ có hiệu năng tốt nhất. Điều này chứng minh rằng việc chỉ kết hợp nhiều LNFs không nhất thiết cải thiện chất lượng của các giải thích cục bộ được sinh ra so với việc dùng một LNF riêng lẻ. Thứ hai, việc tổng hợp các giải thích cục bộ được sinh ra bởi mỗi tập dữ liệu được lọc bằng LNF dẫn đến các kết quả vượt trội đáng kể. Do đó, các chiến lược tổ hợp dựa trên các giải thích cục bộ (PMSL và PMDL) nhất quán vượt trội các chiến lược dựa trên phát hiện nhiễu (PMSN và PMDN). Ngoài ra, tiêu chí chọn LNF động dựa trên tính nhất quán của các giải thích cục bộ trên lân cận của các mẫu không cải thiện hiệu năng cuối cùng. Điều này gợi ý rằng cần điều tra thêm về các chiến lược tổ hợp động thay thế để nâng cao chất lượng của các giải thích dự đoán cục bộ. Thứ ba, hiệu năng của khung đề xuất thay đổi theo việc chọn các mô hình dự đoán hộp đen. Trong khi khung đạt được các cải thiện đáng chú ý với AB, nó cho thấy hiệu năng giảm với GB, RF, NN, và SVM, làm nổi bật ảnh hưởng của việc chọn mô hình dự đoán lên chất lượng giải thích. Hơn nữa, các phát hiện nhấn mạnh rằng trong khi việc tổng hợp các LNFs giúp tạo ra các giải thích tốt hơn, tính hiệu quả của khung giảm ở các mức nhiễu cao hơn, vốn phù hợp với trực giác rằng nhiễu cực đoan làm suy giảm chất lượng dữ liệu huấn luyện.

Mặc dù khung đề xuất cung cấp một giải pháp thực tiễn để giảm thiểu nhiễu nhãn trong các giải thích cục bộ, với các hàm ý cho việc cải thiện độ tin cậy của các mô hình AI giải thích được trong môi trường nhiễu nhãn, các phát hiện trên cũng gợi ý rằng nghiên cứu tương lai nên khám phá các chiến lược để nâng cao hiệu năng khung dưới các điều kiện nhiễu nặng. Trong công trình tương lai, chúng tôi nhắm tới việc mở rộng nghiên cứu này theo bốn khía cạnh: (1) phát triển các tiêu chí chọn động mới để cải thiện hiệu năng tổ hợp của LNFs và khám phá các chiến lược điều chỉnh ngưỡng hiệu quả hơn dựa trên các đặc điểm tập dữ liệu; (2) nâng cao tính áp dụng của khung trong việc xử lý các tập dữ liệu nhiều chiều bằng cách tích hợp một cơ chế chọn đặc trưng hiệu quả; (3) khảo sát tính tương thích của khung đề xuất với các PHETs khác; và (4) điều tra tính hiệu quả của khung này trong việc hỗ trợ chẩn đoán cho các bệnh khác.

## Tuyên bố đóng góp tác giả CRediT

Che Xu: Viết -bản thảo gốc, Kiểm chứng, Phần mềm, Tài nguyên, Phương pháp luận, Điều tra, Khái niệm hóa. Peng Zhu: Kiểm chứng, Giám sát, Thu xếp tài trợ, Phân tích hình thức, Quản lý dữ liệu. Jiacun Wang: Viết -rà soát &amp; biên tập, Kiểm chứng, Tài nguyên, Phương pháp luận, Phân tích hình thức. Giancarlo Fortino: Viết -rà soát &amp; biên tập, Kiểm chứng, Giám sát, Tài nguyên, Phương pháp luận, Điều tra.

## Tuyên bố về xung đột lợi ích

Các tác giả tuyên bố rằng họ không có lợi ích tài chính cạnh tranh hoặc các mối quan hệ cá nhân đã biết nào có thể có vẻ ảnh hưởng đến công trình được báo cáo trong bài báo này.

## Lời cảm ơn

Nghiên cứu này được hỗ trợ bởi Quỹ Khoa học Tự nhiên Quốc gia Trung Quốc (Grant Nos. 72301135, 72174087, 72474103 and 71874082), Quỹ Khoa học Xã hội của Tỉnh Giang Tô (Grant No. 22TQB004), và Kế hoạch R &amp; D Trọng điểm của Tỉnh Giang Tô (Grant No. BE2022712).

## Tính sẵn có của dữ liệu

Dữ liệu sẽ được cung cấp khi có yêu cầu.

## References

- [1] M.R. Islam, S. Banik, K.N. Rahman, M.M. Rahman, A comparative approach to alleviating the prevalence of diabetes mellitus using machine learning, Comput. Methods Programs Biomed. Update 4 (2023) 100113.
- [2] A. Singh, A. Dhillon, N. Kumar, M.S. Hossain, G. Muhammad, M. Kumar, eDiaPredict: an ensemble-based framework for diabetes prediction, ACM Trans. Multimedia Comput. Commun. Appl. 17 (2021) 66.
- [3] F. Navazi, Y. Yuan, N. Archer, An examination of the hybrid meta-heuristic machine learning algorithms for early diagnosis of type II diabetes using big data feature selection, Healthc. Anal. 4 (2023) 100227.
- [4] S.M. Ganie, M.B. Malik, An ensemble machine learning approach for predicting Type-II diabetes mellitus based on lifestyle indicators, Healthc. Anal. 2 (2022) 100092.
- [5] M.R. Hassan, M.F. Islam, M.Z. Uddin, G. Ghoshal, M.M. Hassan, S. Huda, G. Fortino, Prostate cancer classification from ultrasound and MRI images using deep learning based explainable artificial intelligence, Future Gener. Comput. Syst. 127 (2022) 462 -472.
- [6] M.R. Hassan, S. Huda, M.M. Hassan, J. Abawajy, A. Alsanad, G. Fortino, Early detection of cardiovascular autonomic neuropathy: a multi-class classification model based on feature selection and deep learning feature fusion, Inf. Fusion 77 (2022) 70 -80.
- [7] Y. Zhang, J.Y. Du, X. Ma, H.Y. Wen, G. Fortino, Aspect-based sentiment analysis for user reviews, Cogn. Comput. 13 (2021) 1114 -1127.
- [8] H. Han, J. Yi Lin Forrest, J. Wang, S. Yuan, F. Han, D. Li, Explainable machine learning for high frequency trading dynamics discovery, Inf. Sci. 684 (2024) 121286.
- [9] G. Fortino, L. Fotia, F. Messina, D. Rosaci, G.M.L. Sarn ` e, A social edge-based IoT framework using reputation-based clustering for enhancing competitiveness, IEEE Trans. Comput. Soc. Syst. 10 (2023) 2051 -2060.
- [10] H. Han, Y. Wu, J. Wang, A. Han, Interpretable machine learning assessment, Neurocomputing 561 (2023) 126891.
- [11] A.Z. Woldaregay, E. Årsand, S. Walderhaug, D. Albers, L. Mamykina, T. Botsis, G. Hartvigsen, Data-driven modeling and prediction of blood glucose dynamics: machine learning applications in type 1 diabetes, Artif. Intell. Med. 98 (2019) 109 -134.
- [12] J.A. Carter, C.S. Long, B.P. Smith, T.L. Smith, G.L. Donati, Combining elemental analysis of toenails and machine learning techniques as a non-invasive diagnostic tool for the robust classification of type-2 diabetes, Expert Syst. Appl. 115 (2019) 245 -255.
- [13] F.J. Shang, C.F. Ran, An entity recognition model based on deep learning fusion of text feature, Inf. Process. Manag. 59 (2022) 102841.
- [14] A. Gosiewska, A. Kozak, P. Biecek, Simpler is better: lifting interpretabilityperformance trade-off via automated feature engineering, Decis. Support Syst. 150 (2021) 113556.
- [15] A. Kamel Rahimi, O.J. Canfell, W. Chan, B. Sly, J.D. Pole, C. Sullivan, S. Shrapnel, Machine learning models for diabetes management in acute care using electronic medical records: a systematic review, Int. J. Med. Inform. 162 (2022) 104758.
- [16] M. Moradi, M. Samwald, Post-hoc explanation of black-box classifiers using confident itemsets, Expert Syst. Appl. 165 (2021) 113941.
- [17] A.B. Arrieta, N. Díaz-Rodríguez, J. Del Ser, A. Bennetot, S. Tabik, A. Barbado, S. García, S. Gil-L ´ opez, D. Molina, R. Benjamins, Explainable Artificial Intelligence (XAI): concepts, taxonomies, opportunities and challenges toward responsible AI, Inf. Fusion 58 (2020) 82 -115.
- [18] V.V. Khanna, K. Chadaga, N. Sampathila, R. Chadaga, S. Prabhu, S. K S, A. S. Jagdale, D. Bhat, A decision support system for osteoporosis risk prediction using machine learning and explainable artificial intelligence, Heliyon 9 (2023) e22456.
- [19] T.C.T. Chen, H.C. Wu, M.C. Chiu, A deep neural network with modified random forest incremental interpretation approach for diagnosing diabetes in smart healthcare, Appl. Soft Comput. 152 (2024) 111183.
- [20] Q.Q. Chen, G.X. Jiang, F.Y. Cao, C.Q. Men, W.J. Wang, A general elevating framework for label noise filters, Pattern Recognit 147 (2024) 110072.
- [21] J.A. S ´ aez, E. Corchado, ANCES: a novel method to repair attribute noise in classification problems, Pattern Recognit 121 (2022) 108198.
- [22] J.M. Johnson, T.M. Khoshgoftaar, A survey on classifying big data with label noise, ACM J. Data Inf. Qual. 14 (2022) 1 -43.
- [23] J.A. S ´ aez, B. Krawczyk, M. Wo ´ zniak, On the influence of class noise in medical data classification: Treatment using noise filtering methods, Appl. Artif. Intell. 30 (2016) 590 -609.
- [24] J.A. S ´ aez, M. Galar, J. Luengo, F. Herrera, Tackling the problem of classification with noisy data using multiple classifier systems: Analysis of the performance and robustness, Inf. Sci. 247 (2013) 1 -20.
- [25] G. Visani, E. Bagli, F. Chesani, A. Poluzzi, D. Capuzzo, Statistical stability indices for LIME: Obtaining reliable explanations for machine learning models, J. Oper. Res. Soc. 73 (2022) 91 -101.
- [26] D.L. Wilson, Asymptotic properties of nearest neighbor rules using edited data, IEEE Trans. Syst. Man Cybern. 2 (1972) 408 -421.
- [27] I. Tomek, An experiment with the edited nearest-neighbor rule, IEEE Trans. Syst. Man Cybern. 6 (1976) 448 -452.
- [28] J.S. S ´ anchez, R. Barandela, A.I. Marqu ´ es, R. Alejo, J. Badenas, Analysis of new techniques to obtain quality training sets, Pattern Recognit. Lett. 24 (2003) 1015 -1022.
- [29] B. Sluban, N. Lavra ˇ c, Relating ensemble diversity and performance: A study in class noise detection, Neurocomputing 160 (2015) 120 -131.
- [30] D.F. Nettleton, A. Orriols-Puig, A. Fornells, A study of the effect of different types of noise on the precision of supervised learning techniques, Artif. Intell. Rev. 33 (2010) 275 -306.
- [31] J.A. S ´ aez, M. Galar, J. Luengo, F. Herrera, INFFC: an iterative class noise filter based on the fusion of classifiers with noise sensitivity control, Inf. Fusion 27 (2016) 19 -32.
- [32] T.M. Khoshgoftaar, P. Rebours, Improving software quality prediction by noise filtering techniques, J. Comput. Sci. Technol. 22 (2007) 387 -396.
- [33] X.Q. Zhu, X.D. Wu, Class noise vs. attribute noise: a quantitative study, Artif. Intell. Rev. 22 (2004) 177 -210.
- [34] M. Sabzevari, G. Martínez-Mu ˜ noz, A. Su ´ arez, A two-stage ensemble method for the detection of class-label noise, Neurocomputing 275 (2018) 2374 -2383.
- [35] V. Jaiswal, A. Negi, T. Pal, A review on current advances in machine learning based diabetes prediction, Prim. Care Diabetes 15 (2021) 435 -443.
- [36] H. Hakkoum, A. Idri, I. Abnane, Global and local interpretability techniques of supervised machine learning black box models for numerical medical data, Eng. Appl. Artif. Intell. 131 (2024) 107829.
- [37] A.S. Abdullah, S. Selvakumar, Assessment of the risk factors for type II diabetes using an improved combination of particle swarm optimization and decision trees by evaluation with Fisher ' s linear discriminant analysis, Soft Comput 23 (2019) 9995 -10017.
- [38] S. Suyanto, S. Meliana, T. Wahyuningrum, S. Khomsah, A new nearest neighborbased framework for diabetes detection, Expert Syst. Appl. 199 (2022) 116857.
- [39] Y.L. Wu, Q.J. Zhang, Y.Q. Hu, W.K. Sun, X.Y. Zhang, H.M. Zhu, S.Y. Li, Novel binary logistic regression model based on feature transformation of XGBoost for type 2 diabetes mellitus prediction in healthcare systems, Future Gener. Comput. Syst. 129 (2022) 1 -12.
- [40] D. Gunning, M. Stefik, J. Choi, T. Miller, S. Stumpf, G.Z. Yang, XAI -Explainable artificial intelligence, Sci. Robot. 4 (2019) eaay7120.
- [41] F. Curia, Explainable and transparency machine learning approach to predict diabetes develop, Health Technol 13 (2023) 769 -780.

- [42] I. Uysal, Interpretable diabetes prediction using XAI in healthcare application, J. Multidiscip. Dev. 8 (2023) 20 -38.
- [43] Y.C. Wang, T.C.T. Chen, M.C. Chiu, A systematic approach to enhance the explainability of artificial intelligence in healthcare with application to diagnosis of diabetes, Healthc. Anal. 3 (2023) 100183.
- [44] L.P. Joseph, E.A. Joseph, R. Prasad, Explainable diabetes classification using hybrid Bayesian-optimized TabNet architecture, Comput. Biol. Med. 151 (2022) 106178.
- [45] F.D. Martino, F. Delmastro, Explainable AI for clinical and remote health applications: a survey on tabular and time series data, Artif. Intell. Rev. 56 (2023) 5261 -5315.
- [46] H.B. Kibria, M. Nahiduzzaman, F.M.O. Goni, M. Ahsan, J. Haider, An ensemble approach for the prediction of diabetes mellitus using a soft voting classifier with an explainable AI, Sensors 22 (2022) 7268.
- [47] G. Annuzzi, A. Apicella, P. Arpaia, L. Bozzetto, S. Criscuolo, E.D. Benedetto, M. Pesola, R. Prevete, Exploring nutritional influence on blood glucose forecasting for type 1 diabetes using explainable AI, IEEE J. Biomed. Health Inform. 28 (2024) 3123 -3133.
- [48] C. Moreira, Y.L. Chou, M. Velmurugan, C. Ouyang, R. Sindhgatta, P. Bruza, LINDABN: an interpretable probabilistic approach for demystifying black-box predictive models, Decis. Support Syst. 150 (2021) 113561.
- [49] J. Luengo, S.O. Shim, S. Alshomrani, A. Altalhi, F. Herrera, CNC-NOS: class noise cleaning by ensemble filtering and noise scoring, Knowl.-Based Syst 140 (2018) 27 -49.
- [50] B. Fr ´ enay, M. Verleysen, Classification in the presence of label noise: a survey, IEEE Trans. Neural Netw. Learn. Syst. 25 (2014) 845 -869.
- [51] F. Giampaolo, F. Gatta, E. Prezioso, S. Cuomo, M.C. Zhou, G. Fortino, F. Piccialli, ENCODE-Ensemble neural combination for optimal dimensionality encoding in time-series forecasting, Inf. Fusion 100 (2023) 101918.
- [52] Y.F. Li, L.Z. Guo, Z.H. Zhou, Towards safe weakly supervised learning, IEEE Trans. Pattern Anal. Mach. Intell. 43 (2021) 334 -346.
- [53] L.I. Kuncheva, C.J. Whitaker, Measures of diversity in classifier ensembles and their relationship with the ensemble accuracy, Mach. Learn. 51 (2003) 181 -207.
- [54] S.S. Mao, J.W. Chen, L.C. Jiao, S.P. Gou, R.F. Wang, Maximizing diversity by transformed ensemble learning, Appl. Soft Comput. 82 (2019) 105580.
- [55] G.D. Pelegrina, L.T. Duarte, M. Grabisch, A k-additive Choquet integral-based approach to approximate the SHAP values for local interpretability in machine learning, Artif. Intell. 325 (2023) 104014.
- [56] M.T. Ribeiro, S. Singh, C. Guestrin, Why should I trust you?": explaining the predictions of any classifier, in: Proc. 22nd ACM SIGKDD Int. Conf. Knowl. Discov. Data Min, 2016, pp. 1135 -1144.
- [57] B. Jiao, Y. Guo, D. Gong, Q. Chen, Dynamic ensemble selection for imbalanced data streams with concept drift, IEEE Trans. Neural Netw. Learn. Syst. 35 (2024) 1278 -1291.
- [58] Z. Jiing, W. Ming, S.V. S, Ensemble learning from crowds, IEEE Trans. Knowl. Data Eng. 31 (2019) 1506 -1519.
- [59] H.W. Liu, S.C. Zhang, Noisy data elimination using mutual k-nearest neighbor for classification mining, J. Syst. Softw. 85 (2012) 1067 -1074.
- [60] C.E. Brodley, M.A. Friedl, Identifying mislabeled training data, J. Artif. Intell. Res. 11 (1999) 131 -167.
- [61] P. Jeatrakul, K.W. Wong, C.C. Fung, Data cleaning for classification using misclassification analysis, J. Adv. Comput. Intell. Intell. Informatics 14 (2010) 297 -302.
- [62] Z. Nematzadeh, R. Ibrahim, A. Selamat, Improving class noise detection and classification performance: a new two-filter CNDC model, Appl. Soft Comput. 94 (2020) 106428.
- [63] A. Nicolucci, L. Romeo, M. Bernardini, M. Vespasiani, M.C. Rossi, M. Petrelli, A. Ceriello, P. Di Bartolo, E. Frontoni, G. Vespasiani, Prediction of complications of type 2 diabetes: a machine learning approach, Diabetes Res. Clin. Pract. 190 (2022) 110013.
- [64] M. Zhao, J. Wan, W.Z. Qin, X. Huang, G.D. Chen, X.Y. Zhao, A machine learningbased diagnosis modelling of type 2 diabetes mellitus with environmental metal exposure, Comput. Methods Programs Biomed. 235 (2023) 107537.
