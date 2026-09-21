<!-- extracted by pdf-extract | engine=docling+ocr | pages=19 | ocr=True | tables=5/5 | density=1.00 | score=100 -->

Nhận ngày 17 tháng 5 năm 2024, chấp nhận ngày 28 tháng 6 năm 2024, ngày công bố 3 tháng 7 năm 2024, ngày phiên bản hiện tại 3 tháng 3 năm 2025.

Định danh Đối tượng Số (Digital Object Identifier) 10.1109/ACCESS.2024.3422319

## Một phân tích so sánh các bộ diễn giải LIME và SHAP với các dự đoán đái tháo đường dựa trên ML giải thích được

SHAMIM AHMED1, M. SHAMIM KAISER1, (Thành viên Cao cấp, IEEE), MOHAMMAD SHAHADAT HOSSAIN2, (Thành viên Cao cấp, IEEE), VÀ KARL ANDERSSON3, (Thành viên Cao cấp, IEEE)

2Khoa Khoa học Máy tính và Kỹ thuật, Đại học Chittagong, Chattogram 4331, Bangladesh

Viện Công nghệ Thông tin, Đại học Jahangirnagar, Savar, Dhaka 1342, Bangladesh

3Khoa Khoa học Máy tính, Kỹ thuật Điện và Không gian, Đại học Công nghệ Lulea, 93187 Skelleftea, Thụy Điển

Các tác giả liên hệ: Karl Andersson (karl.andersson@Itu.se) và M. Shamim Kaiser (mskaiser@juniv.edu)

Công trình này được hỗ trợ bởi Viện Công nghệ Thông tin, Đại học Jahangirnagar, Savar, Dhaka, Bangladesh.

TÓM TẮT Trí tuệ nhân tạo giải thích được có lợi trong việc chuyển đổi các mô hình học máy mờ đục thành các mô hình minh bạch và phác thảo cách mỗi mô hình đưa ra quyết định trong ngành chăm sóc sức khỏe. Để hiểu các biến ảnh hưởng đến việc ra quyết định liên quan đến dự đoán đái tháo đường mà có thể được giải thích bằng các kỹ thuật độc lập mô hình. Trong dự án này, chúng tôi điều tra cách sinh các giải thích cục bộ và toàn cục cho một mô hình học máy được xây dựng trên một kiến trúc hồi quy logistic. Chúng tôi đã huấn luyện trên 253,680 phản hồi khảo sát từ các bệnh nhân đái tháo đường bằng các kỹ thuật AI giải thích được LIME và SHAP. LIME và SHAP sau đó được các tập kiểm chứng và kiểm tra. Với một thảo luận về công trình tương lai, phân tích so sánh và thảo luận về các phát hiện thí nghiệm khác nhau giữa LIME và SHAP được cung cấp, cùng với các điểm mạnh và điểm yếu của chúng về mặt diễn giải. Với độ chính xác cao 86% trên tập kiểm tra, chúng tôi đã dùng kiến trúc LR với một cơ chế chú ý không gian, chứng minh khả năng hợp nhất học máy và AI giải thích được để cải thiện dự đoán, chẩn đoán, và điều trị đái tháo đường. Chúng tôi cũng tập trung vào các ứng dụng, khó khăn, và các hướng tương lai có thể của các mô hình học máy cho các bộ diễn giải LIME và SHAP.

CÁC THUẬT NGỮ CHỈ MỤC 5 Trí tuệ nhân tạo, dự đoán đái tháo đường, chăm sóc sức khỏe, khả năng diễn giải, LIME, học máy, y học, SHAP, XAI.

## 1. GIỚI THIỆU

Học máy đang ngày càng phổ biến trong các khoa học y tế và sức khỏe (ML). Tonekaboni và cộng sự [1] đã điều tra "điều mà các bác sĩ lâm sàng mong muốn" trong bối cảnh đảm bảo niềm tin vào hợp tác người-AI. Họ hiểu rằng đối với các bác sĩ lâm sàng, ngay cả việc có các mô hình ML cực kỳ chính xác cũng không đủ; ví dụ, một con số đơn lẻ như độ chính xác phân loại không cung cấp bối cảnh cho việc kết quả đã được đạt đến như thế nào hoặc chiều sâu cho

Biên tập viên cộng sự điều phối việc rà soát bản thảo này và phê duyệt nó để công bố là Tony Thomas.

khả năng áp dụng của mô hình [2]. Bộ môn y học đòi hỏi sự rõ ràng do tính giòn của dữ liệu.

Là một trong những bệnh phổ biến nhất trên thế giới, đái tháo đường là một nguyên nhân hàng đầu gây tử vong và tàn tật và đang ngày càng phổ biến hơn, đặc biệt ở các nước đang phát triển. Có 382 triệu cá nhân trên toàn cầu bị ảnh hưởng [3]. Hơn 75% bệnh nhân mắc đái tháo đường Type 2, và số bệnh nhân T2D đang tăng mỗi năm, vốn là một nguồn lo ngại đáng kể cho WHO. Một số tổ chức đang nỗ lực lớn để ngăn chặn làn sóng bằng cách tạo các chương trình nâng cao nhận thức, các hệ thống chăm sóc sức khỏe, các kỹ thuật chẩn đoán tiên tiến, và các loại thuốc cải tiến, cùng những thứ khác. Để đái tháo đường được kiểm soát hiệu quả,

việc phát hiện sớm và chính xác là thiết yếu. Mặt khác, sự phát triển của các kỹ thuật học máy giải quyết vấn đề then chốt này. Các thuật toán học máy là một phương pháp tiềm năng để phát hiện bệnh. Trong những năm gần đây, nhiều kỹ thuật Học máy (ML) hoặc Khai phá Dữ liệu đã được áp dụng để dự đoán đái tháo đường [4]. Một quá trình ra quyết định có thể hiệu quả hơn bằng cách áp dụng khai phá dữ liệu, vốn thu thập thông tin hoặc đặc trưng từ dữ liệu [4]. Các ví dụ về phương pháp học máy bao gồm Support Vector Machine (SVM), Random Forest, Decision Tree (DT), Logistic Regression, K-Nearest Neighbor (KNN), Artificial Neural Network (ANN), bộ phân loại Naive Bayes (NB), và những thứ khác [5], [6].

Một lĩnh vực nghiên cứu gần đây trong AI được gọi là Trí tuệ Nhân tạo Giải thích được (XAI) (AI). XAI có thể trả lời nhiều câu hỏi hơn và mô tả cách AI đạt đến một kết luận cụ thể. Trong các ứng dụng quan trọng nơi niềm tin và sự cởi mở là thiết yếu, như quân sự, chăm sóc sức khỏe, luật pháp và trật tự, và xe tự lái, cùng những thứ khác, khả năng giải thích là then chốt. Nhiều chiến lược XAI đã được tạo ra cho đến nay với mục tiêu này trong tâm trí.

Hiệu năng của một mô hình học máy và khả năng tạo ra các dự đoán dễ hiểu và giải thích được có tương quan với nhau. Người ta có thể xem xét các kỹ thuật "hộp đen" như học sâu và các tổ hợp [7], [8], [9], [10]. Ngược lại, các mô hình gọi là "hộp trắng" hay "hộp kính" cho ra các kết quả dễ hiểu; các ví dụ phổ biến là các mô hình tuyến tính [11] và dựa trên cây quyết định [12]. So với các mô hình cũ hơn, các mô hình sau kém hiệu quả hơn và không đạt hiệu năng tiên tiến, ngay cả khi chúng đơn giản hơn để hiểu và dùng. Thiết kế chất lượng thấp của chúng là nguyên nhân gốc của hiệu năng kém và sự dễ hiểu cùng giải thích. Các phương pháp có thể được dùng cho bất kỳ mô hình nào để diễn giải các mô hình hộp đen. Local interpretable model-agnostic explanations, hay LIME, là một chiến lược diễn giải nổi tiếng cho các mô hình hộp đen. Nó ban đầu được định nghĩa trong [13]. LIME có thể nhanh chóng và hiệu quả đánh giá bất kỳ điểm dự đoán nào được sinh bởi bất kỳ bộ phân loại nào. Dữ liệu lấy mẫu ngẫu nhiên mô phỏng từ vùng xung quanh được tạo cho mỗi mẫu đầu vào và dự đoán đi kèm. Shapley Additive Explanations (SHAP) là một kỹ thuật lấy cảm hứng từ lý thuyết trò chơi để nâng cao khả năng diễn giải bằng cách đánh giá tầm quan trọng của mỗi thuộc tính cho mỗi dự báo (SHAP [14]). Ba thuộc tính mong muốn được các giá trị SHAP xem xét như một thước đo đơn lẻ về tầm quan trọng của đặc trưng: tính nhất quán, tính thiếu vắng, và độ chính xác cục bộ.

Trong công trình này, chúng tôi đã dùng các đóng góp đáng kể sau xảy ra khi các kỹ thuật XAI được áp dụng trong học máy để dự đoán đái tháo đường giai đoạn sớm của bệnh nhân bằng một mô hình dựa trên hồi quy logistic:

- . Chúng tôi xây dựng một mô hình diễn giải học máy dùng LIME và SHAP để diễn giải các dự đoán và so sánh các bộ diễn giải LIME và SHAP nhằm hỗ trợ các nhà nghiên cứu tương lai trong việc xác định cái nào là tốt nhất cho các bộ diễn giải ML dựa trên thách thức của họ.
- · Chúng tôi cũng làm nổi bật một số điểm mạnh và nhược điểm của LIME và SHAP bằng cách tạo một mô hình diễn giải ML với LIME và SHAP, vốn sẽ cung cấp một tổng quan toàn diện về việc triển khai dễ dàng và thành công của chúng tùy theo tình huống.
- . Trong khi cả LIME và SHAP đều được dùng rộng rãi để giải thích các dự đoán mô hình, việc chọn các công cụ diễn giải phù hợp đòi hỏi biết mỗi công cụ hoạt động như thế nào trong bối cảnh các nhiệm vụ dự đoán đái tháo đường.
- . Để cải thiện sự hiểu biết của chúng tôi về khả năng diễn giải mô hình trong bối cảnh lâm sàng và để khuyến khích việc sử dụng các mô hình dự đoán minh bạch và đáng tin cậy cho các ứng dụng chăm sóc sức khỏe, một phân tích so sánh các bộ diễn giải LIME và SHAP với các dự đoán đái tháo đường dựa trên học máy giải thích được được trình bày.

Phần còn lại của bài báo được cấu trúc như sau: Các công trình liên quan được thể hiện trong Phần II. Tập dữ liệu, phương pháp luận đề xuất, và mô hình học máy được trình bày trong Phần III. Các cách tiếp cận diễn giải LIME và SHAP được bao quát trong Phần IV. Nghiên cứu kết thúc với một thảo luận về các vấn đề, ứng dụng, và công trình tương lai trong phần thứ năm. Một phân tích so sánh và thảo luận về các dữ liệu thí nghiệm khác nhau được cung cấp, cùng với việc diễn giải chúng.

## II. TỔNG QUAN TÀI LIỆU

Từ "đái tháo đường", vốn tạo ra các vấn đề lớn ở cả các nước công nghiệp hóa và đang phát triển, được công chúng ngày nay biết đến rõ [15]. Rối loạn chức năng tụy là nguyên nhân chính của đái tháo đường. Nó có thể dẫn đến nhiều vấn đề sức khỏe như các vấn đề mạch máu tim và não, sự phá hủy bệnh lý các tế bào beta tụy, suy thận và võng mạc, hôn mê, sụt cân, loét, và các phản ứng miễn dịch có hại [16]. Các kỹ thuật cho Trí tuệ Nhân tạo Giải thích được (XAI) — các đồ thị Kỳ vọng Có Điều kiện Cá nhân (ICE) và SHAP đã được dùng để nhận diện và làm sáng tỏ các yếu tố quyết định chính của chi phí phí bảo hiểm y tế trong tập dữ liệu [17]. Các phát hiện chứng minh rằng mọi mô hình được tạo ra đều cho kết quả đáng chú ý, và các đóng góp của nghiên cứu sẽ hỗ trợ các nhà ra quyết định trong thị trường bảo hiểm y tế, các công ty bảo hiểm, và các khách hàng tiềm năng trong việc chọn các gói tốt nhất phù hợp với yêu cầu của họ. Việc ra quyết định lâm sàng trong lĩnh vực y tế có thể được cải thiện đáng kể bằng các Hệ thống Hỗ trợ Quyết định Lâm sàng dựa trên ML (CDSS) [18]. Nhưng để việc áp dụng được hiệu quả, các chuyên gia và các bên liên quan phải làm việc cùng nhau và dùng các đánh giá hiệu năng, trí tuệ lai, và kiểm chứng bên ngoài. Các phương pháp dựa trên XAI để chẩn đoán bệnh Alzheimer (AD) đã được thảo luận trong suốt mười năm qua. Các câu hỏi nghiên cứu được chế tác cẩn thận để phân loại các mô hình AI thành các khung khái niệm và kỹ thuật khác nhau (LIME, SHAP, GradCAM, LRP, v.v.) của XAI. Phân loại này bao quát một phạm vi rộng các diễn giải, từ các khuôn mẫu nội tại đến các khuôn mẫu phức tạp, và nó mở rộng tầm với của các giải thích cục bộ đến một giải thích toàn cục [19]. Để xác định liệu một bệnh nhân có bệnh thận mạn (CKD) hay không, các tác giả đã dùng bộ phân loại học máy XGBoost. Họ đã dùng phân tích SHAP để minh họa cách Đặc trưng ảnh hưởng đến các mô hình ML. Hemoglobin và albumin đã được xác định là các dấu ấn chính để nhận diện CKD bằng phân tích SHAP và thuật toán BBO [20]. Trong nghiên cứu này [21], các tác giả khám phá việc dự đoán bệnh thận mạn (CKD) bằng một kỹ thuật dựa trên trí tuệ nhân tạo giải thích được (XAI) vốn tận dụng các đặc trưng lâm sàng. Diện tích dưới đường cong (AUC) và độ chính xác được dùng để xác định mô hình tốt nhất. Tác động của các đặc điểm lên mô hình lý tưởng được minh họa thêm bằng các thuật toán SHAP và LIME. Việc sử dụng các kỹ thuật SHAP và LIME cải thiện khả năng diễn giải của các mô hình ML và tạo điều kiện cho các bác sĩ hiểu lý do đằng sau các kết quả được dự đoán. Trong những năm gần đây, nhiều thuật toán dự đoán đái tháo đường đã được phát triển và công bố. Các tác giả đề xuất một khung học máy [22] trong đó họ kết hợp nhiều kỹ thuật giảm chiều và kiểm định chéo với Linear Discriminant Analysis, Quadratic Discriminant Analysis, Naive Bayes, Gaussian Process Classification, Support Vector Machine, Artificial Neural Network [23], AdaBoost [24], Logistic Regression [25], Decision Tree [26], và các phương pháp Random Forest. Loại bỏ điểm ngoại lai, chuẩn hóa dữ liệu, chọn đặc trưng, kiểm định chéo K-fold, nhiều bộ phân loại học máy (k-nearest Neighbor, Decision Trees, Random Forest, AdaBoost, Naive Bayes, và XGBoost), và Multilayer Perceptron đã được dùng để tạo một khung bền vững cho dự đoán đái tháo đường [27]. Về độ nhạy, độ đặc hiệu, tỷ lệ bỏ sót sai, tỷ số odds chẩn đoán, và AUC, họ nêu rằng bộ phân loại lắp ráp vượt trội các phát hiện tiên tiến 2%.

Một phương pháp [28] để ước tính chính xác hơn mức độ nguy cơ đái tháo đường của một bệnh nhân, các Mô hình được tạo bằng các cách tiếp cận phân loại như Decision Tree, ANN, Naive Bayes, và các thuật toán SVM. Một số kỹ thuật đang được điều tra để ngăn ngừa đái tháo đường và các bệnh liên quan đến đái tháo đường. Các tác giả của công trình đề xuất [29] đã dùng các phương pháp học máy Support Vector Machine (SVM) và Random Forest (RF) để ước tính nguy cơ mắc các rối loạn liên quan đến đái tháo đường. Các tác giả trình bày một hệ thống dự đoán đái tháo đường dựa trên các kỹ thuật Học máy (ML) [30]. Họ so sánh các thuật toán học máy cổ điển với các kỹ thuật học sâu. Theo các phát hiện của thí nghiệm, RF dự đoán đái tháo đường tốt hơn SVM và các cách tiếp cận học sâu. Một số thuật toán học máy được dùng để dự đoán đái tháo đường bằng một tập dữ liệu được tạo từ các mẫu của tập dữ liệu PIMA Indian Diabetes và tập dữ liệu đái tháo đường in vivo. Thật đáng khích lệ khi biết rằng các nghiên cứu tương lai có thể dẫn đến một chiến lược không xâm lấn hiệu quả về chi phí cho phát hiện đái tháo đường sớm [4] tùy thuộc vào dữ liệu thu thập được hoặc các mẫu được khảo sát, cũng như độ chính xác của các kết luận của chúng. Đề xuất một hệ chuyên gia [31] để xác định đáng tin cậy liệu một bệnh nhân có đái tháo đường hay không. Khai phá dữ liệu là một công cụ thiết yếu trong nghiên cứu đái tháo đường do khả năng của nó trong việc trích thông tin ẩn từ lượng lớn dữ liệu liên quan đến đái tháo đường có thể tiếp cận. Hệ thống được xây dựng [32] nhắm tới dự đoán nguy cơ đái tháo đường bằng cách dùng, đánh giá, và kết hợp các thành phần kỹ thuật KDD cụ thể (Knowledge Discovery in Database). Chọn đặc trưng, sinh tập dữ liệu, và các phân loại mô hình ML Có giám sát khác nhau đều là các yếu tố quan trọng. Mô hình ML tổ hợp Weighted Voting LRRFs được đề xuất để cải thiện dự đoán đái tháo đường. Diện tích Dưới Đường cong (AUC) của Đường cong ROC là 0.884. Thí nghiệm này áp dụng sáu thuật toán học máy cho một tập dữ liệu hồ sơ y tế của bệnh nhân. So sánh và khảo sát tính hiệu quả và độ chính xác của các thuật toán liên quan [33]. Trong công trình này, các tác giả [34] cho thấy có bao nhiêu triệu chứng liên kết với các rối loạn gây ra đái tháo đường và cách phát hiện sớm các bệnh như vậy. Kết quả là, mười một cách tiếp cận phân loại học máy đã được áp dụng trong nghiên cứu này.

Trong nhiều trường hợp, việc hiểu lý do đằng sau các dự đoán của một mô hình cũng quan trọng như việc hiểu dự đoán chính xác đến mức nào. Kết quả là, một số cách tiếp cận hỗ trợ người dùng giải mã các dự đoán của các mô hình phức tạp gần đây đã được đề xuất, mặc dù đôi khi không rõ các cách tiếp cận này liên hệ với nhau như thế nào và khi nào một cách tiếp cận vượt trội cách khác. Các tác giả của nghiên cứu này [13] đề xuất LIME, một chiến lược giải thích mới xây dựng một mô hình dễ hiểu cục bộ quanh dự đoán để giải thích trung thực và dễ hiểu các dự đoán của bất kỳ bộ phân loại nào. Trong nhiều trường hợp, việc hiểu lý do của mô hình đằng sau một dự báo cụ thể cũng quan trọng như độ chính xác của dự đoán. SHAP, một khung thống nhất để phân tích các dự đoán, được trình bày trong [15] SHAP [14]. Đối với mỗi dự đoán, SHAP gán một xếp hạng ý nghĩa cho mỗi Đặc trưng. Chúng cung cấp các chiến lược đổi mới về hiệu năng và khả năng tương thích với trực giác con người. Bài báo này [35] dùng phân tích tác động ra quyết định để cung cấp một phương pháp lấy máy làm trung tâm hơn để đánh giá tính hiệu quả của các phương pháp giải thích trên các mạng nơ-ron sâu. Các tác giả đưa ra một tổng quan về các cách tiếp cận diễn giải và các ví dụ về khả năng diễn giải học máy thực tiễn trong một số bối cảnh chăm sóc sức khỏe, bao gồm cải thiện tính hiệu quả của những thứ liên quan đến sức khỏe [36]. Một sự đánh đổi giữa tính nhất quán của một giải thích và sự tuân thủ mô hình học máy. Đây [37] là một ví dụ. Dựa trên khám phá đột phá của họ, họ cung cấp một khung để tối ưu tính ổn định trong khi vẫn giữ một mức tuân thủ nhất định. Với OptiLIME, người dùng có thể tự do chọn mức đánh đổi tuân thủ-ổn định lý tưởng trong khi xem các đặc điểm toán học của giải thích được phục hồi. Khung [38] cho phép một cách mới để cung cấp các diễn giải hậu kỳ của một mô hình dự đoán hộp đen dựa trên một khung mở rộng của các mạng Bayes cho một dự đoán cụ thể, cũng như việc trích xuất một mạng Bayes làm một xấp xỉ của chính mô hình hộp đen. Mục tiêu của nghiên cứu này [39] là chứng minh cách Giải thích được để biến đổi các mô hình Hộp đen thành Máy Bậc ba Giải thích được các bộ phát hiện hình dạng thiết yếu và các mô hình tuyến tính. Họ quan sát rằng tổng của các gradient tích hợp trên các siêu pixel LIME giống với các hệ số diễn giải được của LIME cho các bức ảnh đối với các mô hình trơn. Bằng cách phân tích bốn mô hình học máy khác nhau, các tác giả của nghiên cứu [49] đã xác định bốn dấu ấn sinh học quan trọng nhất ảnh hưởng đến các mức độ nghiêm trọng của bệnh nhân COVID-19. Nhân viên y tế có thể dùng học máy diễn giải được để tích hợp các hiểu biết từ các mô hình với kinh nghiệm y tế trước đó của họ nhằm nhanh chóng khám phá các chỉ báo thiết yếu trong chẩn đoán sớm và, có thể, thắng cuộc đua chống lại đại dịch.

## III. MÔ HÌNH ĐỀ XUẤT

Cách tiếp cận đề xuất được thể hiện trong Hình 1 dưới đây như một sơ đồ mô hình. Hình thể hiện tiến trình của nghiên cứu được thực hiện để tạo mô hình.

Tiền xử lý là việc thay đổi dữ liệu trước khi gửi nó đến một thuật toán. Kỹ thuật chuẩn bị dữ liệu chuyển đổi dữ liệu thô thành một tập dữ liệu duy nhất, dễ hiểu. Trước khi triển khai mô hình học máy, chúng tôi thực hiện nhiều nhiệm vụ chuẩn bị dữ liệu, bao gồm làm sạch, tích hợp, biến đổi, giảm, và giải mã. Sau xử lý, tập dữ liệu được chia thành hai nhóm huấn luyện và kiểm tra, mỗi nhóm chứa 80% và 20% tổng số. Mô hình được phân loại, và các kết quả được đánh giá sau khi xử lý dữ liệu được thực hiện cho chọn đặc trưng. Nó tóm tắt các phát hiện, vẽ các tham số đầu vào, và mô phỏng cách các đầu vào và đầu ra tương tác. Phân loại nhị phân chỉ ra liệu một người có đái tháo đường (tiền đái tháo đường hoặc đái tháo đường). Nghiên cứu này dùng phân loại hồi quy logistic (LR) để dự đoán sự phát triển đái tháo đường dựa trên dữ liệu đầu vào.

Cuối cùng, chúng tôi phát triển một mô hình học máy giải thích được vốn giải thích các dự đoán của mô hình bằng các phương pháp giải thích LIME và SHAP. Các bác sĩ lâm sàng tốt hơn đáng kể nếu họ có thể phán đoán bằng một mô hình có các giải thích rõ ràng. Trong báo cáo nghiên cứu này, chúng tôi đã xem xét cách các kỹ thuật giải thích hộp đen như LIME và SHAP hoạt động, phác thảo các điểm mạnh và giới hạn của mỗi phương pháp để giúp các nhà nghiên cứu tương lai hiểu.

HÌNH 1. Kiến trúc mô hình đề xuất của hệ thống chúng tôi.

Các tầng. XAI nhằm xác định tầm quan trọng của một đặc trưng trong việc dự đoán đóng góp của một mô hình. Bài báo này [40] khảo sát các chiến lược này từ một góc nhìn đa phương thức (văn bản, hình ảnh, âm thanh, và video). Các lợi ích và nhược điểm của các chiến thuật khác nhau và các khuyến nghị cho nghiên cứu thêm đã được thảo luận. Các tác giả cho thấy rằng các cách tiếp cận giải thích hậu kỳ như LIME và SHAP, vốn dựa vào nhiễu loạn đầu vào, là không đáng tin cậy. Họ chứng minh cách các bộ phân loại thiên lệch cao (phân biệt chủng tộc) trong khung của họ có thể dễ dàng đánh lừa các kỹ thuật giải thích được dùng rộng rãi như LIME và SHAP để sinh ra các giải thích sai không tính đến các thiên lệch nền tảng [41].

Trong nghiên cứu Hồ sơ Sức khỏe Điện tử (EHRs) phức tạp, các giải thích của các kỹ thuật XAI đã được so sánh [42]. Để hiểu rõ hơn cách Squeezenet thực hiện phân loại, hai công cụ tên là SHAP và LIME đã được phát triển [43]. Các tài nguyên này mô tả và phân tích quá trình phân loại được Squeezenet dùng. Trong bài báo này [44], họ đã phát triển một mô hình dự đoán bằng extreme gradient boosting (XGBoost), so sánh nó với logistic regression (LR) và random forest (RF), làm nổi bật mức liên quan của đặc trưng theo các lĩnh vực lâm sàng, và dùng SHAP để diễn giải trực quan. Các tác giả cung cấp ExMed, một khung cho phép các chuyên gia lĩnh vực thực hiện phân tích dữ liệu XAI mà không cần kiến thức lập trình phức tạp. Nó cung cấp cho phân tích dữ liệu một phạm vi rộng các cách tiếp cận quy gán đặc trưng để giải thích các phân loại và hồi quy ML [45]. Trong công bố [46], nhiều cách tiếp cận học máy diễn giải được được thể hiện để hiểu các khía cạnh ảnh hưởng đến việc ra quyết định trong dự đoán đái tháo đường mà có thể được giải thích bằng các phương pháp độc lập mô hình. Trong nghiên cứu này [47], các cách tiếp cận XAI cho các mô hình phân loại COVID-19 được đề xuất, phát triển, và so sánh. Các kết quả chứng minh rằng bằng cách cung cấp cho các bác sĩ thông tin chi tiết hơn từ các kết quả của các mô hình XAI đã học, các trực quan hóa định lượng và định tính có thể hỗ trợ các bác sĩ lâm sàng trong việc hiểu và hỗ trợ việc ra quyết định được cải thiện. Phân tích lý thuyết ban đầu về các bức ảnh LIME [48]. Họ chứng minh rằng các giải thích được cung cấp là hợp lệ cho

BẢNG 1. Các thuộc tính và mô tả tập dữ liệu.

HÌNH 2. Các đồ thị thuộc tính khác nhau cho tập dữ liệu.

| Properties     | Description                                                                                                                                                                                                                                                                                            |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Datasetname    | diabetes_binary_health_indicators_BRFSS2015                                                                                                                                                                                                                                                            |
| Data types     | conditionsforthediabeticdataset.                                                                                                                                                                                                                                                                       |
| Dataset Source | TheBRFSS is a yearly telephone survey conducted by the CDC on health-related issues.TheKaggle dataset is accessible.                                                                                                                                                                                   |
| Context        | One of the illnesses that are spreading like an epidemic all over the world is diabetes.As does every generation, children, teenagers, young adults, and seniors seem to be affected. Long-term consequences can cause death as well as organ failure, includingliver,kidney,heart,and stomachfailure. |
| Total Rows     | 253681                                                                                                                                                                                                                                                                                                 |
| Total Columns  | 22                                                                                                                                                                                                                                                                                                     |
| Attributes     | Diabetes binary,HighBP,HighChol, CholCheck,BMI,Smoker,Stroke,HeartDisease or Attack,Physical Activity,Fruits and Vegetables,Heavy Alcohol Consumption,AnyHealthcare,NoDoctor'sVisit Cost,General Health,Mental Health,Physical Health,DiffWalk, Sex,Age, Education, and Income.                        |
| Target Level   | Diabetes_binary is a target variable with two classifications. O indicates no diabetes, whereas 1 indicates prediabetes or diabetes.                                                                                                                                                                   |

## A. TẬP DỮ LIỆU

Tệp diabetes\_binary\_health\_indicators\_BRFSS2015.csv chứa 253,680 phản hồi khảo sát cho CDC. Có hai loại trong biến mục tiêu diabetes binary. O chỉ ra không đái tháo đường cũng không tiền đái tháo đường, nhưng 1 chỉ ra một trong hai. Tập dữ liệu mất cân bằng này có 21 biến đặc trưng. CDC và Phòng ngừa thực hiện BRFSS Hành vi, một khảo sát điện thoại hàng năm về sức khỏe. Hơn 400,000 người Mỹ tham gia khảo sát mỗi năm, cung cấp chi tiết về việc sử dụng các dịch vụ phòng ngừa, các hành vi rủi ro, và các vấn đề sức khỏe mạn tính của họ. Kể từ năm 1984, nó được tổ chức hàng năm. Mặc dù không có cách chữa khỏi đái tháo đường được biết đến, nhiều người có thể hưởng lợi từ các thay đổi lối sống, bao gồm giảm cân, ăn uống lành mạnh, tập thể dục, và tìm kiếm sự chăm sóc y tế.

Đối với dân số chung và các chuyên gia y tế công cộng, các mô hình dự đoán cho nguy cơ đái tháo đường là các công cụ thiết yếu vì chẩn đoán sớm có thể dẫn đến các thay đổi lối sống và điều trị thành công hơn. Các đồ thị đặc trưng khác nhau cho tập dữ liệu đái tháo đường của chúng tôi được thể hiện trong Hình 2. Hình 3 thể hiện đồ thị heatmap minh họa các đặc điểm của tập dữ liệu đái tháo đường. Các thuộc tính và mô tả của tập dữ liệu đái tháo đường được thể hiện trong Bảng 1.

## B. MÔ HÌNH ML HỒI QUY LOGISTIC

Mô hình học máy hồi quy logistic được dùng rộng rãi được dùng cho các vấn đề phân loại nhị phân. Theo các đặc trưng đầu vào, thuật toán học có giám sát này tạo một ranh giới quyết định để chia các điểm dữ liệu thành hai nhóm. Sau đây là các bước chính trong việc phát triển một mô hình hồi quy logistic:

- . Thu thập dữ liệu: Mỗi mẫu trong tập dữ liệu được gán nhãn của chúng tôi gồm một tập các thuộc tính đầu vào và một nhị phân khớp

HÌNH 3. Đồ thị heatmap của tập dữ liệu đái tháo đường.

kết quả chỉ định liệu nó thuộc lớp (O hoặc 1).

- . Chuẩn bị dữ liệu: Chúng tôi thực hiện các quy trình tiền xử lý cần thiết, như điền các chỗ trống, loại bỏ các điểm ngoại lai, và biến đổi các biến.
- Chia Train-Test: Hai tập con, đại diện cho 80% và 20% tổng tập dữ liệu, được sinh ra: các tập kiểm tra và huấn luyện. Tập huấn luyện tạo mô hình hồi quy logistic, trong khi tập kiểm tra đánh giá hiệu năng của mô hình trên dữ liệu chưa quan sát.
- Scale Đặc trưng: Chúng tôi scale để đảm bảo các thuộc tính đầu vào đều ở cùng một scale. Tiêu chuẩn hóa (trừ trung bình khỏi độ lệch chuẩn và chia cho nó) và chuẩn hóa (scale dữ liệu về một khoảng giữa O và 1) là các kỹ thuật thường gặp.
- Huấn luyện Mô hình: Chúng tôi huấn luyện mô hình hồi quy logistic bằng dữ liệu huấn luyện. Mô hình xác định các hệ số (trọng số) lý tưởng cho mỗi đặc điểm đầu vào theo thời gian. Điều này đạt được bằng cách tối thiểu hóa một hàm chi phí, thường với một quy trình tối ưu như gradient descent. Mất mát binary cross-entropy là hàm chi phí thường được dùng nhất cho hồi quy logistic.
- Đánh giá Mô hình: Dùng tập kiểm tra làm cơ sở, chúng tôi đánh giá mô hình đã huấn luyện. Các chỉ số đánh giá như độ chính xác, precision, recall, và F1 score thường được dùng cho phân loại nhị phân. Các chỉ số này cho thấy mô hình phân loại đúng các mẫu của tập kiểm tra hiệu quả như thế nào.
- Dự đoán: Một khi mô hình đã được huấn luyện và đánh giá, các dự đoán có thể được thực hiện bằng dữ liệu mới, chưa dùng. Mô hình dùng hàm sigmoid để xác định khả năng là một thành viên của lớp dương tính

cho trước các đặc điểm đầu vào. Sau đó, một ranh giới quyết định được áp dụng để gán các nhãn lớp.

Trong công trình này, chúng tôi cung cấp một mô hình ML dựa trên học logistic cho dự đoán đái tháo đường. Hồi quy logistic là một kỹ thuật để xác định xác suất của một kết quả rời rạc cho trước một biến đầu vào. Đầu ra nhị phân của hầu hết các mô hình hồi quy logistic có thể là đúng hoặc sai hoặc một trong hai giá trị tiềm năng khác. Một kỹ thuật phân tích cho các vấn đề phân loại là hồi quy logistic, vốn có thể được dùng để xác định liệu một mẫu mới có thuộc một nhóm cụ thể hay không. Hồi quy logistic là một phương pháp đơn giản và hiệu quả hơn để giải các vấn đề phân loại tuyến tính và nhị phân. Nó là một mô hình phân loại dễ dùng với các lớp tách tuyến tính được cho ra các kết quả xuất sắc. Bảng 2 dưới đây hiển thị Precision, Recall, F1-score, Support, và Accuracy của mô hình LR cho dự đoán đái tháo đường.

## trong đó:

- · P(Y = 1|X) biểu thị xác suất của biến phụ thuộc Y bằng 1 cho trước các biến đầu vào X1, X2, ..., Xn.
- βo, β1, β2, ..., βn là các hệ số hoặc tham số của mô hình hồi quy logistic.
- X1, X2, ..., Xn là các biến đầu vào hoặc các yếu tố dự đoán.
- é là cơ số của logarit tự nhiên, xấp xỉ bằng 2.71828.

Phương trình hồi quy logistic kết hợp tuyến tính các biến đầu vào bằng hàm logistic, thường gọi là hàm sigmoid. Hàm sigmoid phù hợp

BẢNG 2. Hiển thị precision, recall, F1-score, support, và accuracy của mô hình LR cho dự đoán đái tháo đường.

HÌNH 4. Hiển thị ma trận nhầm lẫn giữa các nhãn thực tế và dự đoán.

|                        |   Precision |   Recall |   F1-score |   Support |
|------------------------|-------------|----------|------------|-----------|
| 0.0(The targetValue)   |        0.87 |     0.98 |       0.92 |     65376 |
| 1.0 (The target Value) |        0.51 |     0.15 |       0.23 |     10728 |
| The macro avg          |        0.69 |     0.56 |       0.58 |     76104 |
| The weighted avg       |        0.82 |     0.86 |       0.83 |     76104 |
| The accuracy           |             |     0.86 |            |     76104 |

cho việc mô hình hóa các xác suất vì nó chuyển đổi bất kỳ số nguyên có giá trị thực nào thành một số giữa O và 1.

Các hệ số βo, β1, β2, ..., βn xác định tác động của mỗi biến đầu vào lên xác suất của kết quả. Bằng cách điều chỉnh các hệ số này, hồi quy logistic ước tính khả năng của biến kết quả thuộc một lớp cụ thể dựa trên các biến đầu vào.

Hình 5 thể hiện cách Đường cong Precision-Recall và điểm ROC AUC của mô hình LR tính toán tương quan hạng giữa các dự đoán và các mục tiêu để cho thấy mô hình của chúng tôi hiệu quả như thế nào trong việc xếp hạng các dự báo sao cho chúng tôi có thể đưa ra một lựa chọn được thông tin về câu hỏi hóc búa precision/recall nổi tiếng. Hình 4 hiển thị dữ liệu như một ma trận, với các lớp thực trên trục Y và các lớp được dự đoán trên trục X.

AUC được tính như là Diện tích Dưới Đường cong Sensitivity (TPR)(1 - Specificity)(FPR).

Các chỉ số đánh giá cho phép chúng tôi đánh giá hiệu năng của các mô hình học máy khi phân loại các quan sát. Để đánh giá mô hình của chúng tôi, chúng tôi đã dùng nhiều thước đo đánh giá khác nhau, bao gồm Precision, Recall, F1-score, Sensitivity, Specificity, và AUC. Chúng tôi đã dự đoán hiệu quả đái tháo đường ở bệnh nhân bằng mô hình học máy của chúng tôi dùng hồi quy logistic dựa trên độ chính xác 86% trên tập dữ liệu đái tháo đường.

## IV. CÁC KỸ THUẬT GIẢI THÍCH LIME VÀ SHAP

Giá trị của khả năng diễn giải mô hình trong quá trình khoa học dữ liệu. Việc hiểu hoạt động bên trong của một mô hình có lợi vì một số lý do, như xây dựng niềm tin vào các dự đoán của mô hình, tuân thủ các yêu cầu pháp lý, gỡ lỗi các mô hình, và đảm bảo an toàn mô hình, cùng những thứ khác. LIME và SHAP đều là các tài nguyên hữu ích cho việc giải thích mô hình. LIME và SHAP có thể có lợi cho Naive Bayes, Logistic Regression, Linear Regression, Decision Tree, Random Forest, Gradient Boosted Tree, SVM, Neural Network, và các mô hình học máy diễn giải khác.

LIME xấp xỉ bất kỳ mô hình học máy hộp đen nào bằng một mô hình cục bộ, diễn giải được để cung cấp các giải thích dự đoán cá nhân [13]. Bất kỳ dạng dữ liệu nào, bao gồm hình ảnh, văn bản, dữ liệu dạng bảng, và video, đều có thể được dùng với kỹ thuật này. LIME có thể đưa ra lý do theo cách này cho bất kỳ mô hình học có giám sát nào. LIME, vốn tính các đặc điểm liên quan gần một ví dụ ngoại lệ cụ thể, cung cấp các giải thích tối ưu cục bộ. LIME được dùng cho dữ liệu văn bản, đồ họa, và dạng bảng và có tính hỗ trợ trong không gian XAI. Đặc điểm chính của LIME là tính áp dụng và tính mở rộng của nó cho tất cả các bộ môn học máy quan trọng.

HÌNH 5. (a) Hiển thị đường cong AUC và (b) hiển thị đường cong recall và precision của mô hình LR.

BẢNG 3. So sánh các phương pháp diễn giải LIME và SHAP trên các miền đầu vào khác nhau (dữ liệu hình ảnh, văn bản, dạng bảng, và cảm giác).

| ExplanationStyle                | Explanation Method   | Image   | Text   | Tabular   | Audio   | Sensory data   |
|---------------------------------|----------------------|---------|--------|-----------|---------|----------------|
| Superimposition overtest input  | LIME                 | Yes     | Yes    | Yes       | No      | No             |
| Superimposition over test input | SHAP                 | Yes     | Yes    | Yes       | Yes     | Yes            |

SHAP là một kỹ thuật để giải mã các dự đoán cá nhân mà Lundberg và Lee đã tạo bằng các giá trị Shapley vốn lý tưởng về mặt lý thuyết cho trò chơi. Một kỹ thuật lý thuyết trò chơi hợp tác với một số đặc điểm hấp dẫn là các giá trị Shapley. Các giá trị đặc trưng của một mẫu dữ liệu là các thành viên liên minh. Đóng góp biên trung bình của một giá trị đặc trưng trên tất cả các liên minh tiềm năng được gọi là giá trị Shapley [14]. Bảng 3 so sánh các kỹ thuật diễn giải được LIME và SHAP dùng cho dữ liệu từ các miền đầu vào khác nhau, bao gồm các bức ảnh, văn bản, dạng bảng, và dữ liệu cảm giác. Bảng 4 chứng minh cách các cách tiếp cận khả năng diễn giải học máy tập trung vào các phương pháp giúp người dùng hiểu các biện minh cho các dự đoán của mô hình.

InterpretML là một thư viện Python mã nguồn mở được Nori và cộng sự [50] phát triển vốn kết hợp các kỹ thuật khả năng diễn giải học máy vào một gói duy nhất. Nó dễ dùng, có thể thích nghi, và có thể được dùng để huấn luyện các mô hình diễn giải được hộp kính có thể được dùng để giải thích các mô hình ML. Để giúp người dùng thấy và đánh giá hiệu năng mô hình cho các thay đổi tập dữ liệu khác nhau, InterpretML cung cấp các bảng điều khiển tương tác với các tùy chọn lọc dữ liệu và hình thành nhóm. InterpretML tập trung vào các kỹ thuật diễn giải giúp người dùng hiểu cách mô hình đạt đến các dự đoán của nó.

## A. DIỄN GIẢI MÔ HÌNH BẰNG LIME

Các phương pháp học máy phổ biến để diễn giải các mô hình bao gồm LIME. Nó hỗ trợ việc hiểu và làm sáng tỏ

các dự đoán được cung cấp bởi các mô hình tinh vi, đặc biệt là những mô hình dựa trên trí tuệ nhân tạo và học máy. LIME cung cấp các giải thích cục bộ bằng cách mô phỏng gần đúng hành vi của mô hình quanh một mẫu hoặc dự báo quan tâm. LIME là một cách tiếp cận độc lập mô hình, vốn có thể được dùng với bất kỳ mô hình học máy nào mà không cần biết nó hoạt động bên trong như thế nào. Nó làm cho việc hiểu và có niềm tin vào các dự đoán được cung cấp bởi các hệ thống AI trở nên đơn giản hơn bằng cách bắc cầu khoảng cách giữa các mô hình tinh vi và khả năng diễn giải của con người. Điều quan trọng cần nhớ là LIME có các thuộc tính.

Thuật toán nhận mô hình phức tạp f, mẫu cần được giải thích x', tập các mô hình diễn giải được G, hàm trọng số Ux', và số hạng phạt độ phức tạp Ω(g) làm đầu vào. Nó xuất ra xấp xỉ cục bộ f(x') của mô hình phức tạp f tại mẫu x'. Thuật toán LIME được thể hiện trong Algorithm 1.

Xác suất dự báo của hai lớp "O = Không đái tháo đường" và "1 = Có tiền đái tháo đường hoặc đái tháo đường" được thể hiện trong ô ngoài cùng bên trái của hình. Các đặc điểm chính với các giá trị biên của chúng được thể hiện trong biểu đồ giữa, và giá trị đặc trưng tương ứng thực tế trong hàng quan sát được truyền vào được thể hiện trong bảng bên phải. Giải thích này được áp dụng cho hàng thứ tám của tập dữ liệu. Chúng tôi đã quyết định diễn giải dự báo của LIME trong hàng thứ 8. Mô hình hồi quy logistic, model\_logreg, cũng được truyền vào. LIME sau đó có thể dùng predict\_proba để kiểm tra các phát hiện dự đoán, cho phép nó dự đoán mẫu đó.

BẢNG 4. Các cách tiếp cận khả năng diễn giải học máy tập trung vào các kỹ thuật hỗ trợ người dùng hiểu lý do đằng sau các dự đoán do mô hình thực hiện.

| Interpretability Techniques      | Advantages         | Drawbacks   |                                                                                                                   | Model          | Scope        | ClassificationRegression   |     |
|----------------------------------|--------------------|-------------|-------------------------------------------------------------------------------------------------------------------|----------------|--------------|----------------------------|-----|
| LIME                             | Plug and based     | play        | It is discovered that the ensuing ex- planations are unstable. The rank- ing does not consider featurere- liance. | Model Agnostic | Local        | Yes                        | Yes |
| SHAP (Kernel SHAP and Tree SHAP) | Optimized speed up | for         | Differentexplanationsresult from little perturbations that do not mod- ify the prediction.                        | Model Agnostic | Local Global | Yes                        | Yes |

HÌNH 6. Dùng LIME để sinh một giải thích cho dự đoán với mười đặc trưng để diễn giải dự báo của LIME trong hàng thứ 8. LIME đã đưa ra khả năng dự đoán như sau: không đái tháo đường với xác suất 0.74 và tiền đái tháo đường hoặc đái tháo đường với xác suất 0.26.

o.02

HÌNH 7. Dùng LIME để sinh một giải thích cho dự đoán với 12 đặc trưng để diễn giải dự báo của LIME trong hàng thứ 10. LIME đã đưa ra khả năng dự đoán như sau: không đái tháo đường với xác suất 0.76 và tiền đái tháo đường hoặc đái tháo đường với xác suất 0.24.

Cuối cùng, chúng tôi định nghĩa các đặc điểm và nhãn của tập dữ liệu với num features bằng mười và top labels bằng 0.74. LIME đã đưa ra khả năng dự đoán như sau: không đái tháo đường với xác suất O.74 và tiền đái tháo đường hoặc đái tháo đường với xác suất 0.26, như thấy trong Hình 6. Sau đây là các quy tắc: GenHlth &gt; 3.00, HighBP &lt;= 1.00, HighChol &lt;= 1.00, BMI &gt; 31.0, và cứ thế ở phía âm (trái), và Age &lt;= 6.00, NoDocbcCost &gt; 0.00, và Fruits &lt;= 1.00 và cứ thế ở phía dương (phải). Hình 7 minh họa cách hiểu dự báo của LIME trong hàng thứ 10 bằng cách dùng 12 thuộc tính để giải thích dự đoán. Không đái tháo đường có xác suất 0.76, nhưng tiền đái tháo đường hoặc đái tháo đường có xác suất 0.24, theo khả năng dự đoán của LIME.

## B. DIỄN GIẢI MÔ HÌNH BẰNG SHAP

Một phương pháp diễn giải mô hình học máy phổ biến khác là SHAP (SHapley Additive ExPlanations). SHAP đưa ra các xếp hạng mức liên quan của các đặc điểm dựa trên mức độ chúng đóng góp vào dự đoán, đưa ra lý do cho cụ thể Algorithm 1 LIME (Local Interpretable Model-Agnostic Explanations)

HÌNH 8. Giá trị Shapley tuyệt đối trung bình được dùng để đo lường ý nghĩa của đặc trưng SHAP. Yếu tố quan trọng nhất, huyết áp cao, tăng khả năng mắc đái tháo đường tuyệt đối trung bình 6.4 điểm phần trăm (0.064 trên trục X).

## Require:

- f : Complex model to be explained
- x':Instance to be explained
- G:Set of interpretable models
- Jxv:Weighting function
- Ω(g): Complexity penalty term

## Ensure:

f(x'): Local approximation of f at x'

- 0: procedure LIME f,x',G,πx',Ω(g)
- 1: X' &lt; Generate neighborhood around x'
- 2: W ← Jx(X)
- 4: f(x') ←g(x′)
- 3: g &lt; arg mingeG Z(x,y)exi w(x, y) · L(f , g, x, y) + S2(g)
- 5: return f(x')
- 5: end procedure=0

các dự báo. Nền tảng của SHAP là lý thuyết trò chơi hợp tác, chính xác hơn là các giá trị Shapley, vốn đo lường giá trị của sự tham gia của mỗi người chơi trong một trò chơi cộng tác. SHAP có thể được dùng trong nhiều mô hình tuyến tính, dựa trên cây, và học sâu khác nhau. Nó làm cho một kỹ thuật diễn giải linh hoạt, trung lập với mô hình trở nên khả thi.

Thuật toán nhận mô hình f cần được giải thích và mẫu x cần được giải thích làm đầu vào. Nó xuất ra các giá trị SHAP Φ cho mỗi Đặc trưng, biểu thị đóng góp của mỗi Đặc trưng vào dự đoán cho mẫu x. Thuật toán SHAP được thể hiện trong Algorithm 2.

## Algorithm 2 SHAP (SHapley Additive exPlanations)

## Require:

- f : Model to be explained
- x:Instance to be explained

## Ensure:

- Φ:SHAPvaluesfor eachfeature
- O:procedure SHAP (f,x)
- 1: Initialize Φ as an empty vector for each feature j in x do end

Sample K background instances Z1, Z2, ...,ZK

- 2: Compute the Shapley value Φ; for feature j:
- = [f(zπ=k,xπ)-f(zπ,xπ)

5:

- 5: Append Φ; to Φ
- 6: return Φ
- 6: end procedure=0

Điều then chốt cần nhớ là việc diễn giải các mô hình phức tạp là một lĩnh vực nghiên cứu hiện tại, và tùy thuộc vào mô hình và tập dữ liệu cụ thể, các kỹ thuật diễn giải khác nhau — như LIME và SHAP — có thể cung cấp các phát hiện khác nhau. Hình 8 thể hiện tầm quan trọng của đặc trưng SHAP cho các mô hình học máy đã huấn luyện trước khi dự đoán đái tháo đường vốn ảnh hưởng trung bình lên đầu ra mô hình. HighBP là đặc trưng quan trọng nhất, vốn thay đổi xác suất đái tháo đường tuyệt đối được tiền định trung bình 6.4 điểm phần trăm (O.064 trên trục X). GenHlth là đặc trưng quan trọng thứ hai, vốn thay đổi xác suất của

-0.06148

-0.01148

Income = 3

higher lower

f(x)

0.03).03852

BMI = 40

HighBP = 1

GenHlth=5

SHAP value (impact on model output)

HÌNH 9. Huyết áp cao thấp hơn làm giảm nguy cơ đái tháo đường, nhưng huyết áp cao nhiều hơn làm tăng nguy cơ đó, và cứ thế. Tất cả các tác động mô tả hành vi của mô hình và tác động của nó lên đầu ra.

IS

base value

Age=9

HighChol = 1

HÌNH 10. Đồ họa SHAP Force nhận diện các đặc điểm ảnh hưởng nhiều nhất đến dự báo của mô hình cho một quan sát đơn lẻ. Biến mục tiêu nhị phân 0 chỉ ra không đái tháo đường, trong khi 1 chỉ ra hoặc tiền đái tháo đường hoặc đái tháo đường. Điểm mô hình là 0.03.

điểm (O.06 trên trục X). Một thay thế cho ý nghĩa của các đặc điểm hoán vị là mức liên quan của các đặc trưng SHAP. Cả hai phép đo tầm quan trọng khác nhau đáng kể theo các cách sau: Sự suy giảm hiệu năng mô hình xác định tính áp dụng của đặc trưng hoán vị. Kích thước của các quy gán đặc trưng là nền tảng của thuật toán SHAP. Mặc dù đồ thị ý nghĩa đặc trưng có ích, nó không cung cấp chi tiết bổ sung nào.

Mức liên quan của các đặc điểm và các tác động của chúng được kết hợp trong đồ thị tóm tắt thể hiện trong Hình 9. Mỗi điểm trên đồ thị tóm tắt biểu thị một giá trị Shapley cho cả một mẫu và một đặc trưng. Trong khi giá trị Shapley xác định vị trí trên trục x, đặc trưng xác định vị trí trên trục y. Màu sắc chỉ ra giá trị của thuộc tính, dao động từ thấp đến cao. Phân bố giá trị Shapley cho mỗi đặc trưng được chỉ ra bằng cách làm rung các chấm chồng lấn theo hướng trục y. Các đặc tính được trình bày theo thứ tự mức liên quan.

Đồ thị force thể hiện trong Hình 10 và Hình 11 minh họa cách các đặc tính ảnh hưởng đến khả năng của mô hình trong việc dự đoán một quan sát. Việc có thể giải thích cho ai đó cách mô hình của chúng tôi đạt đến các kết luận mà nó đã đạt cho một quan sát cụ thể là phù hợp. Diabetes\_binary là một biến mục tiêu nhị phân với hai phân loại. O chỉ ra rằng bạn không có đái tháo đường, và 1 gợi ý tiền đái tháo đường hoặc đái tháo đường. Điểm của mô hình cho quan sát này là Bold 0.03 trong đồ thị trên. 0 cho mô hình điểm thấp và 1 cho mô hình điểm cao, tương ứng. Đỏ chỉ ra các đặc trưng làm tăng điểm mô hình, và xanh dương chỉ ra các đặc trưng làm giảm nó. Các đặc trưng này thiết yếu trong việc phát triển dự báo cho quan sát này, và chúng được mô tả lần lượt bằng màu đỏ và xanh dương. Đặc trưng càng gần đường đỏ-xanh, nó càng có nhiều tác động lên điểm, và kích thước của thanh phản ánh điều này.

Một danh sách hai màu của bản đồ màu, màu đầu cho các giá trị SHAP dương như HighBP và GenHlth, và màu thứ hai cho các giá trị SHAP âm như HighBP. Nhiều tùy chọn khác nhau có sẵn, như sắp xếp mẫu theo độ tương tự, sắp xếp mẫu theo giá trị đầu ra, v.v.

## C. CÁC CHỈ SỐ ĐÁNH GIÁ CỦA LIME VÀ SHAP

Chúng tôi đã dùng một số phép đo và yếu tố để đánh giá mức độ LIME và SHAP hoạt động như các kỹ thuật giải thích được cho mô hình của chúng tôi. Thứ nhất, độ trung thực (fidelity): độ trung thực đo lường mức độ giải thích của phương pháp nắm bắt chính xác hành vi của mô hình nền tảng. Trong bối cảnh LIME, tính trung thành có thể được đánh giá bằng cách đối chiếu các dự đoán do mô hình gốc thực hiện với mô hình thay thế cục bộ trong vùng lân cận của mẫu đang được giải thích. Tương tự, SHAP cung cấp một chỉ báo đơn lẻ về chất lượng giải thích cho tất cả các trường hợp. Thứ

HÌNH 11. Bản đồ SHAP Force nhận diện các đặc điểm có ảnh hưởng lớn nhất đến các dự đoán của mô hình. Đồ thị SHAP Force minh họa thứ tự mẫu theo giá trị đầu ra ở (a) và thứ tự mẫu theo độ tương tự ở (b).

hai là tính ổn định, vốn đánh giá phương pháp giải thích các hiện tượng tốt như thế nào trong các trường hợp tương đương hoặc khi dữ liệu đầu vào bị nhiễu loạn. Các giải thích tương tự cho các trường hợp tương đương nên được sinh ra qua một kỹ thuật giải thích ổn định. Việc đo lường tính biến thiên của các giải thích trong khi nhiễu loạn mẫu đang được giải thích là một cách để đánh giá tính ổn định của LIME. Tính ổn định là một sản phẩm phụ tự nhiên của SHAP do cơ sở toán học của nó trong các giá trị Shapley. Thứ ba, tính nhất quán định lượng cách các giải thích thay đổi để đáp lại các sửa đổi trong dữ liệu hoặc mô hình. Việc hiểu tính kiên cường của các giải thích trên nhiều mô hình hoặc tập dữ liệu đòi hỏi một sự tập trung đặc biệt vào tính nhất quán. Việc so sánh các giải thích được sinh bởi SHAP hoặc LIME khi áp dụng cho một số mô hình được huấn luyện trên các tập dữ liệu tương đương hoặc liên quan là quá trình đánh giá tính nhất quán. Thứ tư, tính dễ hiểu đo lường mức độ đơn giản để con người hiểu và tạo ý nghĩa cho các giải thích do phương pháp cung cấp. Việc đánh giá tính hữu dụng và rõ ràng của các giải thích do LIME và SHAP tạo ra có thể chủ quan và đòi hỏi nghiên cứu người dùng hoặc các đánh giá của chuyên gia. Nhìn chung, các tiêu chí định lượng như độ trung thực, tính ổn định, tính nhất quán, và các đánh giá định tính về tính dễ hiểu được dùng để đánh giá mức độ LIME và SHAP hoạt động trong trí tuệ nhân tạo giải thích được (XAI). Khi quyết định giữa LIME và SHAP cho một ứng dụng nhất định, cũng then chốt khi cân nhắc các đánh đổi giữa khả năng diễn giải, hiệu quả tính toán, và khả năng mở rộng.

## V. PHÂN TÍCH SO SÁNH VÀ THẢO LUẬN

A. MỘT PHÂN TÍCH SO SÁNH GIỮA CÁC BỘ DIỄN GIẢI LIME VÀ SHAP

Trong phần này, chúng tôi đưa ra một phân tích so sánh bằng cách áp dụng một phương pháp học máy diễn giải để thấy nhiều

ưu điểm và nhược điểm dựa trên các trọng số LIME và các giá trị SHAP nhằm quyết định phương pháp nào sẽ được các nhà nghiên cứu hiểu rõ hơn cho các nghiên cứu tương lai. Các điểm hay và nhược điểm của các hệ thống diễn giải LIME và SHAP được so sánh trong Bảng 5.

## B. THẢO LUẬN

Đối với các giải thích mô hình, SHAP và LIME là hai module Python nổi bật. Bài báo này giải thích cách chọn giữa SHAP và LIME và một số khác biệt. Cả hai hệ thống đều có ưu điểm và nhược điểm của chúng. Mặc dù LIME và SHAP sinh các tham số cho các đóng góp đặc trưng ở mức quan sát (diễn giải cục bộ), các thuật toán dẫn đến các kết luận này khác nhau. Chúng tôi dùng một phương pháp ML diễn giải để xem xét các ưu điểm và nhược điểm khác nhau dựa trên trọng số LIME và các giá trị SHAP nhằm xác định cách nào vượt trội hoặc khác biệt là gì để xác định đóng góp của các biến ở mức cục bộ.

LIME và SHAP khác nhau đáng kể trong phương pháp luận được dùng để áp dụng các trọng số cho mô hình tuyến tính hồi quy. Dùng phép đo cosine, LIME so sánh các bức ảnh gốc và đã thay đổi. Các trọng số trong SHAP được tính bằng công thức Shapley. Các kỹ thuật LIME và SHAP có các nhược điểm: chúng không chỉ định kích thước giải thích tối ưu, không xem xét sự phụ thuộc đặc trưng, và chỉ áp dụng cho một lớp dự đoán.

Các giá trị Shapley xem xét tất cả các dự đoán tiềm năng, ví dụ, dùng tất cả các tổ hợp đầu vào có sẵn trong SHAP. SHAP có thể đảm bảo các khía cạnh như tính tương thích và độ chính xác cục bộ nhờ phương pháp luận toàn diện này. LIME tạo một mô hình tuyến tính thưa quanh mỗi dự đoán để

BẢNG 5. Bảng so sánh các phương pháp diễn giải LIME và SHAP với các điểm mạnh và điểm yếu của chúng.

|   SN. | LIME                                                                                                                                                                                                                 | SHAP                                                                                                                                                                              |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     1 | Model-agnostic                                                                                                                                                                                                       | Model-agnostic                                                                                                                                                                    |
|     2 | Locally interpretable                                                                                                                                                                                                | LaJhggHEdq5yKkPJdBXLMoAubyHwAB4ttD                                                                                                                                                |
|     3 | Lack of stability,consistency,and missingness.                                                                                                                                                                       | All three properties (stability, consistency, and missingness) are fulfilled by SHAP.                                                                                             |
|     4 | LIME does not guarantee that eachvariable's contribution will be distributed fairly.                                                                                                                                 | A fair distribution of contribution for each of the variablesis ensured by the Shapley value.                                                                                     |
|     5 | LIME assumes that the local model is linear.                                                                                                                                                                         | SHAP does not have any such assumptions.                                                                                                                                          |
|     6 | A Single prediction explanation.                                                                                                                                                                                     | Entire model (single or variable)explanation                                                                                                                                      |
|     7 | The complexity of a machine learning model makes compre- hension challenging.                                                                                                                                        | An entire machine learning modelis simpleto comprehend.                                                                                                                           |
|     8 | It doesn't produce the best visualizationlook.                                                                                                                                                                       | It produces a great visualization look.                                                                                                                                           |
|     6 | LIME is less widely used and less acceptable.                                                                                                                                                                        | Due to its theoretical guarantees and simplicity, SHAP is widelyused andmaybemoreacceptable.                                                                                      |
|    10 | Local models like LIME do not have contrastive explanations.                                                                                                                                                         | The Shapley value allows for opposing explanations. Instead of using the average forecast from the entire dataset,we may compare a prediction to a subset or just one data point. |
|    11 | Fast and relatively simple.                                                                                                                                                                                          | Slow andrelativelycomplex.                                                                                                                                                        |
|    12 | It requires less computing time.                                                                                                                                                                                     | Calculating the Shapley value takes a long time.                                                                                                                                  |
|    13 | Explanations created with the LIME method use selective explanations of the features.                                                                                                                                | The Shapley value approach always uses all the aspects in an explanation.                                                                                                         |
|    14 | For the top-ranked features,LIME is more stable than SHAP [51].                                                                                                                                                      | When the majority of features are present, SHAP is more stable.                                                                                                                   |
|    15 | Forthe top-ranked characteristics,LIMEis at least astrustwor- thy as SHAP,and both LIME and SHAP are more dependable than MDA.Consequently,LIME is ideal forhuman interpreta- tion of a machine-learning model [51]. | SHAPis just as stable as LIME for the top-ranked features.                                                                                                                        |
|    16 | On the traits with high relevance scores,LIME is more stable thanMDA andSHAP[52].                                                                                                                                    | Regarding the qualities with high relevance scores, SHAP is lessstable thanLIME                                                                                                   |

mô tả cách mô hình hộp đen hoạt động trong vùng tức thời đó. SHAP chứng minh rằng các giá trị Shapley là sự đảm bảo duy nhất về tính nhất quán và tính đúng đắn và rằng LIME là một tập con của SHAP nhưng thiếu các thuộc tính tương tự [13].

Vậy, tại sao bất kỳ ai lại dùng LIME ngay từ đầu? Đã nói rằng LIME tính các giá trị nhanh chóng, trong khi Shapley mất một thời gian dài. Khi cố gắng giữ các đặc điểm Shapley đẹp đẽ, module SHAP Python hỗ trợ với khó khăn tính toán này bằng cách dùng đoán và khi chúng tôi thuê một mô hình với tối ưu SHAP; kết quả chính xác và đáng tin cậy. SHAP hiện không tối ưu cho mọi loại mô hình.

SHAP có một bộ trục xuất cây hoạt động nhanh trên các cây như một cây gradient-boosted từ XGBoost và một random forest từ sci-kit learn, nhưng nó chậm không thể chấp nhận cho các mô hình như k-nearest neighbours, ngay cả trên các tập dữ liệu nhỏ. Chúng tôi cũng có thể dùng LIME như một tùy chọn. LIME dùng cùng mô hình KNN trong thời gian thực và không đòi hỏi tóm tắt k-means. Về việc gán các giá trị cho các động lực vỡ nợ tín dụng được thuật toán XGBoost khám phá, các động lực mà chúng tôi tìm kiếm sức mạnh phân biệt, các giá trị SHAP có vẻ vượt trội các trọng số LIME [14].

LIME dựa vào khả năng làm gián đoạn các mẫu một cách có ý nghĩa. Dùng sự gây phiền này trên cơ sở từng trường hợp. Ví dụ, nó thêm các từ ngẫu nhiên vào mỗi đặc trưng trong dữ liệu dạng bảng; trong các bức ảnh, nó thay thế các siêu pixel bằng một giá trị trung bình hoặc không; và trong văn bản, nó loại bỏ các từ khỏi văn bản. Xem xét bất kỳ tác dụng phụ nào của các chiến thuật gây bối rối này trong dữ liệu của bạn để tăng niềm tin của bạn vào diễn giải.

Đối với các vấn đề phân loại, LIME hoạt động với các mô hình xuất ra xác suất. Các mô hình như SVM không được xây dựng với đầu ra tiềm năng trong tâm trí. Điều này có thể hàm ý rằng các giải thích bị lệch. SHAP ước tính một giá trị cơ sở hoặc kỳ vọng bằng các tập dữ liệu nền. Việc dùng cả một tập dữ liệu cho các tập dữ liệu khổng lồ là tốn kém về tính toán; do đó, chúng tôi phải dựa vào các ước tính. Điều này có hệ quả đối với độ chính xác của giải thích. SHAP cho thấy cách tập dữ liệu huấn luyện ước tính một độ lệch dự báo khỏi giá trị kỳ vọng hoặc cơ sở. Tùy thuộc vào ứng dụng, việc tính giá trị dự đoán bằng một phần của tập huấn luyện thay vì cả tập có thể hữu ích hơn.

Các tác giả [48] đã điều tra LIME và nhận thấy rằng khi lớn, các giải thích LIME tập trung quanh một số giới hạn — đó là số mẫu được sinh ra. Trong bài học này, người mới đi vào chi tiết hơn về bộ phát hiện hình dạng và mô hình tuyến tính. Họ đã khám phá một liên kết giữa LIME và gradient tích hợp, một cách tiếp cận giải thích khác, như một kết quả của cuộc điều tra này. Giải thích do LIME cung cấp tương tự các gradient tổng hợp tích hợp trên các siêu pixel được dùng trong các bước tiền xử lý của LIME. Hai nhược điểm chính của việc áp dụng LIME cho NLP là nó chỉ cung cấp khả năng diễn giải cục bộ và không ổn định, vốn gợi ý rằng việc lấy mẫu khác nhau quanh cùng dữ liệu vùng có thể cung cấp các phát hiện giải thích khác nhau đáng kể [53].

Các tác giả của [54] trình bày một ví dụ trong đó SHAP thành công khắc phục vấn đề, nhưng giải thích của LIME vi phạm tính toàn vẹn cục bộ. Ngay cả khi LIME-Counterfactual (LIME-C) và SHAP Counterfactual (SHAP-C) cung cấp tốc độ tính toán nhanh và đáng tin cậy, SEDC (một phương pháp tìm kiếm best-first heuristic) nhìn chung hiệu quả hơn [55]. Về tính hiệu quả, LIME-C và SHAP-C khám phá các giải thích phản thực hợp lý, nếu không phải lúc nào cũng là tốt nhất. Mặt khác, SHAP-C dường như gặp khó khăn với dữ liệu mất cân bằng dữ dội. Hiệu năng tổng thể tốt hơn của LIME-C làm cho nó có vẻ là một thay thế tiềm năng cho SEDC, vốn, do chiến lược tìm kiếm heuristic của nó, không thể tìm các phản thực cho một số mô hình phi tuyến.

Các tác giả khẳng định rằng các đồ họa SHAP [42] cung cấp nhiều hơn chỉ một dự báo để hỗ trợ điều mà các bác sĩ lâm sàng tìm kiếm thông qua logic; thay vào đó, chúng đưa ra sự rõ ràng khi cung cấp cả một giải thích cục bộ và toàn cục cho một vấn đề. Việc mở rộng kiến thức đến mức bậc ba có thể nâng cao niềm tin, hỗ trợ lý luận của chuyên gia con người, và tăng tỷ lệ suy diễn trường hợp. Cả ba hệ thống (SHAP, LIME, và Scoped Rules) đồng ý rằng M-Best là yếu tố quan trọng nhất trong việc dự báo tỷ lệ tử vong của một bệnh nhân. Tuy nhiên, chúng khác nhau trong việc chọn các tiêu chí thứ cấp hoặc bậc ba nhất quán với kiến thức y tế hiện tại. Theo nghiên cứu của họ [56], các giải thích (Data + ML Model Score + Explanations) chỉ cải thiện độ chính xác một chút so với Data + ML Model Score nhưng thiếu hụt so với độ chính xác đạt được trong tùy chọn chỉ Data. Cuối cùng, các nhà phân tích xác định rằng LIME là kỹ thuật giải thích ít được ưa chuộng nhất trong số ba bộ giải thích được khảo sát, có thể do thiếu sự đa dạng giải thích của nó.

Trong ngành chăm sóc sức khỏe, các bộ giải thích LIME và SHAP được dùng để dự đoán đái tháo đường bằng một số công trình gần đây về các mô hình dựa trên ML và DL trên nhiều loại khác nhau. Nhân tạo giải thích được mỗi cái đưa ra quyết định trong ngành chăm sóc sức khỏe. Trong ví dụ về dự đoán đái tháo đường, các tác giả trình bày [46] nhiều kỹ thuật học máy diễn giải được khác nhau để hiểu các khía cạnh ảnh hưởng đến việc ra quyết định mà có thể được giải thích bằng các phương pháp độc lập mô hình. Trong bài báo này [57], các tác giả đã dùng extreme boosting (XGBoost) để so sánh và triển khai các kỹ thuật diễn giải mô hình hiện tại, LIME, SHAP, và tầm quan trọng đặc trưng hoán vị. Trên tập dữ liệu đái tháo đường, một thí nghiệm được chạy để xác định đặc điểm có tác động đáng kể nhất lên đầu ra mô hình. Theo các kết quả thí nghiệm, glucose máu dường như có tác động nhiều nhất lên độ chính xác của các dự đoán mô hình. Các vùng và đặc điểm trong các bức ảnh đầu vào quan trọng nhất đối với các dự đoán được mô hình học sâu sinh ra có thể được LIME và SHAP nhận diện chính xác, cung cấp các hiểu biết thiết yếu về cách mô hình học sâu đưa ra quyết định. Kiến trúc InceptionV3 với một cơ chế chú ý không gian đạt độ chính xác ngoại lệ 97 phần trăm trên tập kiểm tra, nhấn mạnh tiềm năng của việc hợp nhất học sâu với AI dễ hiểu để cải thiện điều trị và chẩn đoán u nguyên bào võng mạc như được trình bày ở đây [58]. Trong công trình này [59], sự phù hợp của hai bộ giải thích mô hình phổ biến nhất, LIME và SHAP, cho dự đoán bệnh tự động đã được điều tra. Dùng tập dữ liệu dự đoán nguy cơ đái tháo đường giai đoạn sớm (ESDRPD) và tập dữ liệu Pima

Indians diabetes (PIDD), tương ứng, mô hình đề xuất [60] vượt trội tất cả các mô hình được đối chuẩn với độ chính xác cao 92.2% và 99.4%. Các kết quả XAI làm cho rõ ràng rằng Insulin và Polyuria là các thuộc tính có ý nghĩa nhất cho phân loại đái tháo đường bằng PIDD và ESDRPD. Các nhà nghiên cứu đã xem qua [61] các số liệu thống kê chưa xử lý từ các quốc gia nghèo để nhận diện đái tháo đường ở giai đoạn sớm. Các tập dữ liệu này được tiền xử lý, và các bộ phân loại khác nhau được áp dụng để dự đoán đái tháo đường ở bệnh nhân. Sau đó, các giá trị SHAP được khảo sát để đánh giá mỗi bộ phân loại tốt nhất hoạt động tốt như thế nào. Kết quả là, họ khám phá một số đặc điểm thiết yếu chịu trách nhiệm cao cho sự phát triển đái tháo đường.

## C. CÁC THÁCH THỨC CỦA MÔ HÌNH HỌC MÁY DIỄN GIẢI LIME VÀ SHAP

LIME và SHAP là các phương pháp phổ biến được dùng để diễn giải các mô hình học máy. Trong khi chúng là các công cụ giá trị để hiểu các dự đoán mô hình, chúng cũng đi kèm với một số thách thức nhất định. Đây là một số thách thức gắn với các bộ diễn giải LIME và SHAP:

- · Độ phức tạp: Cả các phương pháp LIME và SHAP đều đòi hỏi các tính toán và thuật toán phức tạp. Việc đưa các phương pháp này vào thực hành có thể là thách thức, đặc biệt đối với những người không quen với lĩnh vực khả năng diễn giải trong học máy. Lý thuyết xác suất, lý thuyết trò chơi, và các chiến lược tối ưu phải được hiểu kỹ lưỡng để nắm các tinh tế đầy đủ.
- . Chi phí Tính toán: LIME và SHAP có thể tốn kém về tính toán cho các tập dữ liệu lớn và các mô hình phức tạp. Các bộ diễn giải này thường đòi hỏi tạo nhiều mẫu nhiễu loạn và các đánh giá mô hình, vốn có thể làm chậm đáng kể quá trình diễn giải. Khi chiều và độ phức tạp của các đặc trưng đầu vào tăng, thách thức này trở nên rõ ràng hơn.
- · Khả năng Diễn giải Hộp đen: Mặc dù LIME và SHAP được dự định để giải thích các mô hình hộp đen, các diễn giải của chúng vẫn có thể có vấn đề để những người không phải chuyên gia hiểu. Mặc dù cung cấp tầm quan trọng đặc trưng cục bộ hoặc các giá trị đóng góp, có thể cần có các kỹ thuật giải thích bổ sung hoặc kiến thức lĩnh vực để chuyển đổi các giá trị này thành các hiểu biết có thể hành động.
- Đánh đổi Khả năng Diễn giải: Độ trung thực mô hình bị hy sinh cho khả năng diễn giải ở cả LIME và SHAP. Các mô hình thay thế diễn giải được do LIME tạo ra xấp xỉ gần đúng hành vi của mô hình gốc, trong khi các điểm tầm quan trọng đặc trưng được SHAP xác định bằng lý thuyết trò chơi hợp tác. Các xấp xỉ và các điểm tầm quan trọng đặc trưng này có thể không phản ánh chính xác tất cả các khía cạnh của hành vi của mô hình gốc, vốn có thể dẫn đến mất độ trung thực.
- Không gian Đặc trưng Nhiều chiều: LIME và SHAP có thể gặp khó khăn trong việc đưa ra các biện minh rõ ràng khi xử lý các không gian đặc trưng nhiều chiều. Do

lời nguyền của chiều, khả năng diễn giải của các giải thích có thể trở nên thách thức hơn khi số đặc trưng tăng. Có thể cần dùng các kỹ thuật chọn đặc trưng hoặc giảm chiều để diễn giải các mô hình với nhiều đặc trưng đầu vào nhằm khắc phục vấn đề này.

- . Tính nhạy với các Phương pháp Nhiễu loạn: Việc tạo các mẫu nhiễu loạn quanh dữ liệu đầu vào là một thành phần then chốt của LIME, trong khi SHAP đặt các giá trị Shapley của nó trên các hoán vị đặc trưng. Việc chọn phương pháp hoán vị hoặc nhiễu loạn có thể tác động đến tính ổn định và tính nhất quán của các diễn giải. Một số tính chủ quan và không nhất quán có thể được đưa vào khi dùng các chiến lược nhiễu loạn khác nhau dẫn đến các giải thích khác.
- Thiên lệch Khả năng Diễn giải: Việc đưa ra các giả định và chọn các phương pháp cụ thể cho một giải thích là cần thiết khi diễn giải các mô hình học máy. Các quyết định này có thể đưa thiên lệch vào quá trình diễn giải, vốn có thể dẫn đến các diễn giải sai hoặc các biểu diễn không công bằng. Để đảm bảo rằng các kỹ thuật khả năng diễn giải không củng cố hoặc khuếch đại các thiên lệch tồn tại sẵn trong dữ liệu hoặc mô hình, điều then chốt là nhận thức về thiên lệch khả năng diễn giải và kiểm chứng cẩn thận các phương pháp.

Khi áp dụng các bộ diễn giải LIME và SHAP trong bối cảnh y tế công cộng và chăm sóc sức khỏe, có các thách thức cụ thể cần xem xét. Các thách thức này bao gồm:

- · Chuyên môn Lĩnh vực: Kiến thức lĩnh vực sâu là cần thiết để diễn giải các mô hình học máy y tế công cộng. Các vấn đề y tế công cộng thường liên quan đến các mối quan hệ phức tạp giữa nhiều yếu tố, làm cho chúng phức tạp và đa diện. Việc có các chuyên gia hiểu các sắc thái của dữ liệu y tế công cộng và các cơ chế nhân quả nền tảng là thiết yếu để diễn giải các dự đoán mô hình một cách chính xác.
- Chất lượng Dữ liệu và Thiên lệch: Các vấn đề chất lượng dữ liệu, như các giá trị thiếu, các lỗi đo lường, hoặc lấy mẫu thiên lệch, có thể ảnh hưởng đến các tập dữ liệu y tế công cộng. Các vấn đề này có thể làm cho các mô hình khó diễn giải và dẫn đến các biện minh không chính xác. Ngoài ra, nếu các diễn giải do LIME và SHAP cung cấp bị thiên lệch, các thiên lệch đã có sẵn trong dữ liệu có thể bị khuếch đại hoặc củng cố.
- · Cân nhắc Đạo đức: Các vấn đề đạo đức nảy sinh khi diễn giải các mô hình học máy cho y tế công cộng. Các diễn giải do LIME và SHAP cung cấp có thể bao gồm thông tin riêng tư hoặc có các hàm ý khác cho thông tin đó. Điều thiết yếu là thực hiện các biện pháp phòng ngừa để đảm bảo rằng quá trình diễn giải tuân thủ các luật và tiêu chuẩn về quyền riêng tư trong khi vẫn cung cấp thông tin hữu ích cho việc ra quyết định.
- Khả năng Tổng quát hóa: Thường cần thiết để các mô hình y tế công cộng tổng quát hóa tốt trên nhiều dân số và bối cảnh khác nhau. Các diễn giải LIME và SHAP, tuy nhiên, thường cục bộ và có thể không phản ánh chính xác hành vi tổng thể của mô hình. Các bộ diễn giải này
- việc sử dụng trong các ứng dụng y tế công cộng có thể bị hạn chế bởi tính không áp dụng được của các giải thích của chúng cho các nhóm dân số hoặc vùng địa lý khác nhau.
- Độ phức tạp của các Vấn đề Y tế Công cộng: Các phụ thuộc lẫn nhau phức tạp giữa các yếu tố sinh học, xã hội, môi trường, và hành vi có mặt trong các vấn đề y tế công cộng. LIME và SHAP có thể gặp khó khăn trong việc nắm bắt đầy đủ các mối quan hệ phức tạp này. Các diễn giải của các phương pháp này có thể đơn giản hóa quá mức bản chất phức tạp của các vấn đề y tế công cộng, vốn có thể dẫn đến các giải thích sai hoặc không đầy đủ.
- . Giao tiếp và Tương tác với các Bên liên quan: Giao tiếp hiệu quả với nhiều bên liên quan, bao gồm các nhà hoạch định chính sách, nhân viên y tế, và công chúng, là cần thiết để diễn giải các mô hình học máy trong y tế công cộng. Một thách thức đáng kể trong các ứng dụng y tế công cộng là chuyển đổi các giải thích kỹ thuật phức tạp do LIME và SHAP cung cấp thành các hiểu biết có thể hành động mà những người không phải chuyên gia có thể nhanh chóng hiểu và dùng.
- Các Ràng buộc Pháp lý và Quy định: Các khung pháp lý và quy định kiểm soát việc chia sẻ dữ liệu, khả năng diễn giải mô hình, và việc ra quyết định áp dụng cho y tế công cộng. Các quy tắc này phải được tuân theo khi các bộ diễn giải LIME và SHAP được dùng, vốn có thể làm cho quá trình khó hơn và đòi hỏi suy nghĩ cẩn thận về các trách nhiệm đạo đức và pháp lý.

Trong khi LIME và SHAP có thể hỗ trợ trong việc hiểu các mô hình học máy trong y tế công cộng, việc vượt qua các trở ngại này là cần thiết để đảm bảo việc diễn giải đúng và áp dụng đạo đức các mô hình này cho việc xây dựng các chính sách y tế công cộng và việc ra quyết định. Sự hợp tác giữa các nhà khoa học dữ liệu, các chuyên gia y tế công cộng, và các nhà hoạch định chính sách là thiết yếu để điều hướng các thách thức này một cách thành công.

## D. CÁC ỨNG DỤNG CỦA MÔ HÌNH ML DIỄN GIẢI LIME VÀ SHAP

LIME có thể được áp dụng theo nhiều cách khác nhau trong lĩnh vực y tế công cộng để có được các hiểu biết và cải thiện khả năng diễn giải của các mô hình học máy. Đây là một số ứng dụng tiềm năng của các bộ diễn giải LIME trong y tế công cộng:

- · Đánh giá Nguy cơ Sức khỏe: Việc hiểu các đặc điểm hoặc đặc điểm ảnh hưởng nhiều nhất đến các nguy cơ hoặc kết quả sức khỏe có thể được LIME hỗ trợ. Ví dụ, LIME có thể chỉ ra các yếu tố chính chịu trách nhiệm cho các dự đoán khi xác định nguy cơ của một người mắc một bệnh hoặc tình trạng cụ thể. Dữ liệu này có thể hữu ích cho các can thiệp nhắm mục tiêu và lời khuyên sức khỏe cá nhân hóa.
- . Phân bổ Tài nguyên Chăm sóc Sức khỏe: LIME có thể làm sáng tỏ các biến ảnh hưởng đến cách các tài nguyên y tế được dùng. LIME có thể nhận diện các yếu tố thiết yếu dẫn đến việc sử dụng tài nguyên cao, như nhập viện lại hoặc các lần đến phòng cấp cứu, bằng cách diễn giải các dự đoán của các mô hình học máy. Việc lập kế hoạch cho

- năng lực, phân bổ tài nguyên, và cải thiện cung cấp chăm sóc sức khỏe đều có thể hưởng lợi từ thông tin này.
- . Chọn Đặc trưng cho các Nghiên cứu Dịch tễ học: Khi chọn các đặc điểm hoặc yếu tố nguy cơ liên quan cho các nghiên cứu dịch tễ học, LIME có thể hữu ích. Bằng cách khảo sát các dự đoán do các mô hình học máy được huấn luyện trên các tập dữ liệu sức khỏe lớn sinh ra, LIME có thể chỉ ra các đặc điểm quan trọng nhất trong việc dự đoán các kết quả sức khỏe. Điều này có thể giúp các nhà nghiên cứu quyết định các yếu tố liên quan nào cần ưu tiên cho nghiên cứu thêm.
- . Các Can thiệp Y tế Công cộng: Bằng cách phân tích các dự đoán do các mô hình được huấn luyện trên dữ liệu can thiệp thực hiện, LIME có thể hỗ trợ trong việc hiểu tính hiệu quả của các can thiệp y tế công cộng. LIME, ví dụ, có thể chỉ ra các yếu tố thiết yếu cần thiết để các can thiệp nhắm vào các dân số hoặc hành vi sức khỏe cụ thể thành công. Việc thiết kế và cải thiện các can thiệp có thể được hướng dẫn bởi thông tin này để tối đa hóa tác động của chúng.
- . Giám sát Bệnh nhân và Tuân thủ: Các dự đoán của các mô hình học máy theo dõi sự tuân thủ của bệnh nhân với các kế hoạch điều trị hoặc các phác đồ thuốc có thể được diễn giải bằng LIME. LIME có thể cung cấp các hiểu biết về các yếu tố ảnh hưởng đến các dự đoán tuân thủ, cho phép các nhà cung cấp chăm sóc sức khỏe sửa đổi các can thiệp và các kế hoạch hỗ trợ theo các rào cản và yếu tố tạo điều kiện cho tuân thủ.

Trong y tế công cộng, bộ diễn giải SHAP có thể được dùng theo nhiều cách khác nhau để có được kiến thức và nâng cao khả năng diễn giải của các mô hình học máy. Sau đây là một số cách dùng y tế công cộng có thể cho bộ diễn giải SHAP:

- · Tầm quan trọng Đặc trưng trong Dự đoán Nguy cơ Bệnh: Các hiểu biết về ý nghĩa của các yếu tố nguy cơ hoặc đặc điểm khác nhau trong việc dự đoán các kết quả bệnh có thể có được từ SHAP. Các nhà nghiên cứu y tế công cộng có thể xác định đóng góp tương đối của mỗi đặc trưng vào dự đoán bằng cách áp dụng các giá trị SHAP cho các mô hình học máy được huấn luyện trên dữ liệu sức khỏe. Kiến thức này có thể hỗ trợ trong việc phát triển các chiến lược phòng ngừa nhắm mục tiêu và ưu tiên các can thiệp.
- . Hiểu các Chênh lệch Sức khỏe: Việc hiểu các yếu tố gây ra các chênh lệch sức khỏe giữa các dân số khác nhau có thể được SHAP hỗ trợ. Các nhà nghiên cứu có thể đánh giá các tác động của các yếu tố nhân khẩu học, kinh tế-xã hội, và môi trường khác nhau lên các kết quả sức khỏe bằng cách dùng các giá trị SHAP. Thông tin này có thể hướng dẫn các chính sách và can thiệp y tế công cộng để giảm các chênh lệch sức khỏe.
- . Diễn giải các Mô hình Dự đoán cho các Can thiệp Y tế Công cộng: Các mô hình dự đoán thường được dùng trong các can thiệp y tế công cộng để hỗ trợ việc ra quyết định. Các mô hình này có thể được diễn giải bằng SHAP để xác định các yếu tố hoặc can thiệp nào ảnh hưởng nhiều nhất đến các kết quả dự đoán. Thông tin này có thể ảnh hưởng đến việc lập kế hoạch và thực thi các can thiệp dựa trên bằng chứng để nâng cao sức khỏe dân số.
- . AI Giải thích được trong các Hệ thống Hỗ trợ Quyết định Lâm sàng: SHAP có thể đưa ra các biện minh cho các dự đoán
- do các mô hình học máy trong các hệ thống hỗ trợ quyết định lâm sàng thực hiện. Điều này tăng niềm tin và hỗ trợ việc ra quyết định bằng cách cho phép các nhà cung cấp chăm sóc sức khỏe hiểu lý do đằng sau các khuyến nghị của mô hình. Dùng SHAP, các chuyên gia chăm sóc sức khỏe và bệnh nhân có thể thảo luận các đặc điểm nền tảng của các dự đoán.
- · Chọn Đặc trưng cho Đánh giá Nguy cơ Sức khỏe: Việc chọn các đặc trưng liên quan cho các mô hình đánh giá nguy cơ sức khỏe có thể được hướng dẫn bởi các giá trị SHAP. Các nhà nghiên cứu y tế công cộng có thể chỉ ra các yếu tố có ảnh hưởng đáng kể nhất lên việc dự đoán các nguy cơ sức khỏe bằng cách đánh giá các đóng góp của mỗi đặc trưng. Điều này có thể hỗ trợ trong việc ưu tiên các nỗ lực thu thập dữ liệu và cải thiện độ chính xác cùng tính hiệu quả của các mô hình đánh giá nguy cơ.
- Phân bổ và Lập kế hoạch Tài nguyên Chăm sóc Sức khỏe: SHAP có thể làm sáng tỏ các yếu tố ảnh hưởng đến cách các tài nguyên y tế được dùng. SHAP có thể xác định các đặc điểm có ảnh hưởng đáng kể nhất lên việc phân bổ tài nguyên, như các tỷ lệ nhập viện lại hoặc các chi phí chăm sóc sức khỏe, bằng cách diễn giải các dự đoán của các mô hình học máy. Dữ liệu này có thể hỗ trợ việc lập kế hoạch hiệu quả trong các hệ thống y tế công cộng và hướng dẫn các chiến lược phân bổ tài nguyên.

## E. CÁC HƯỚNG TƯƠNG LAI

Đây là một vài hướng tiềm năng mà nghiên cứu này có thể đi trong tương lai. Nhiều phương pháp ML diễn giải được hơn có sẵn, trong khi nghiên cứu tập trung vào LIME và SHAP. Các nghiên cứu thêm có thể khảo sát và đánh giá tính hiệu quả của các bộ diễn giải khác nhau, như TreeInterpreter, Anchors, hoặc RuleFit, trong dự đoán đái tháo đường. Điều này sẽ cung cấp một kiến thức kỹ lưỡng hơn về các lợi ích và nhược điểm của các phương pháp luận diễn giải được khác nhau và sự phù hợp của chúng để dùng với các mô hình dự đoán đái tháo đường.

Việc kết hợp nhiều bộ diễn giải có thể dẫn đến các giải thích cơ bắp hơn và kỹ lưỡng hơn so với việc dựa vào một bộ. Để phát triển một sự hiểu biết toàn diện hơn về các dự đoán của mô hình ML cho đái tháo đường hoặc các bệnh khác, các nghiên cứu tương lai có thể xem xét các ưu điểm và nhược điểm của việc kết hợp LIME với SHAP hoặc các phương pháp luận diễn giải được khác. Các kỹ thuật tổ hợp hoặc các cách tiếp cận siêu diễn giải có thể được điều tra để tổng hợp các kết quả của nhiều bộ diễn giải một cách thành công.

Nghiên cứu có thể đã tập trung vào các phương pháp ML diễn giải được trong bối cảnh các mô hình ML đơn giản. Việc hiểu các quá trình ra quyết định của các kiến trúc ML, như các mô hình học sâu hoặc các mô hình tổ hợp, đang ngày càng khó hơn. Nghiên cứu tương lai có thể khảo sát cách các phương pháp diễn giải được như LIME, SHAP, hoặc các phương pháp khác có thể được mở rộng hoặc sửa đổi để đưa ra các biện minh có ý nghĩa cho các dự đoán do các kiến trúc ML tinh vi sinh ra trong các nhiệm vụ dự đoán bệnh.

Các giải thích trong bài báo nghiên cứu có thể chủ yếu được dự định cho các học giả hoặc người thực hành. Tuy nhiên, điều then chốt là xem xét những người dùng cuối có thể thiếu năng lực ML trong các tình huống đời thực. Các nghiên cứu tương lai nên xem xét các cách để cung cấp các giải thích lấy người dùng làm trung tâm liên quan đến các nhu cầu và nền tảng của những người dùng các hệ thống dự đoán đái tháo đường hoặc bệnh khác mà dễ hiểu và có thể hành động. Điều này có thể đòi hỏi tạo các công cụ tương tác, đồ họa thông tin, hoặc các giao diện người dùng làm cho việc hiểu các dự đoán ML cho các tình trạng như đái tháo đường dễ dàng hơn.

Thí nghiệm có kiểm soát của bài báo nghiên cứu có thể đã khảo sát LIME và SHAP. Các nghiên cứu tương lai có thể xem xét phê duyệt và triển khai các phương pháp diễn giải được này trong các bối cảnh chăm sóc sức khỏe. Việc đánh giá giá trị và tính hiệu quả của các mô hình ML diễn giải được cho dự đoán đái tháo đường hoặc bệnh khác có thể đòi hỏi làm việc với các người thực hành chăm sóc sức khỏe, thu thập đầu vào, và thực hiện các nghiên cứu người dùng. Việc xem xét các hàm ý về quyền riêng tư và đạo đức của việc áp dụng các mô hình ML trong các bối cảnh chăm sóc sức khỏe là thiết yếu.

XAI là một chủ đề phổ biến và đã được áp dụng hiệu quả trong y tế công cộng và y học, và nhiều nghiên cứu dựa trên XAI đã được thực hiện gần đây. Một mô hình dự đoán đái tháo đường [62] vốn hiệu quả cao và dễ diễn giải. SHAP và LIME cung cấp một giải thích toàn cục và cục bộ về các kết quả dự đoán. Các phát hiện thí nghiệm cho thấy rằng phương pháp eXtreme Gradient Boosting (XGBoost) cung cấp hiệu năng dự đoán tối ưu. Các phương pháp luận XAI đã được hiển thị cung cấp thông tin giải thích đáng kể hỗ trợ trong việc hiểu nguy cơ đái tháo đường và các kết quả dự đoán bởi bệnh nhân và các nhà cung cấp chăm sóc sức khỏe. Hiệu năng của các mô hình học máy khác nhau và chức năng của các cách tiếp cận trí tuệ nhân tạo giải thích được (XAI) là then chốt [63], vốn tập trung vào chẩn đoán và dự đoán sớm đái tháo đường. Tính hiệu quả của nhiều mô hình học máy được đánh giá và đối chiếu. Bằng cách phân tích các đầu ra của mô hình hiệu quả nhất bằng các kỹ thuật XAI, SHAP, và LIME, việc ra quyết định của mô hình trở nên dễ hiểu hơn. Các phương pháp học máy minh họa thành công như vậy việc nhận diện và chẩn đoán sớm đái tháo đường. Sự nhấn mạnh được đặt vào khả năng giải thích và các ứng dụng thực tiễn của các mô hình áp dụng này.

## VI. KẾT LUẬN

Đái tháo đường là một bệnh chuyển hóa dài hạn được đánh dấu bởi các mức đường huyết tăng cao (tăng đường huyết) gây ra bởi việc tổng hợp insulin không đủ hoặc việc sử dụng insulin không hiệu quả bởi cơ thể. Đây là một mối quan tâm sức khỏe toàn cầu ảnh hưởng đến hàng triệu người trên toàn thế giới. Việc chẩn đoán và điều trị đái tháo đường được cải thiện đáng kể bởi trí tuệ nhân tạo và học máy. Dự đoán Nguy cơ, Phát hiện Sớm, Phân tích Hình ảnh, Giám sát Glucose, Điều trị Cá nhân hóa, Giám sát Từ xa, và Hỗ trợ chỉ là một vài cách AI và học máy giúp ích cho điều trị đái tháo đường. Điều quan trọng cần lưu ý là trong khi AI và học máy hứa hẹn cải thiện chẩn đoán và quản lý đái tháo đường, chúng nên bổ sung, chứ không phải thay thế, các chuyên gia chăm sóc sức khỏe. Chuyên môn y tế và phán đoán của con người là then chốt để diễn giải các kết quả và đưa ra các quyết định được thông tin.

Tóm lại, hồi quy logistic là một kỹ thuật học máy xuất sắc dự báo thành công diễn tiến của đái tháo đường. Bằng cách kết hợp thuật toán này với các mô hình diễn giải được như LIME và SHAP, chúng tôi có thể có được các hiểu biết giá trị về các yếu tố thúc đẩy các dự đoán và tăng tính minh bạch cùng độ tin cậy của mô hình. Ngoài việc đạt các dự đoán chính xác, việc dùng LIME và SHAP cung cấp thông tin sâu sắc về các kết nối nền tảng giữa các đặc điểm và biến mục tiêu. Sự kết hợp độ chính xác và khả năng diễn giải này là then chốt trong chăm sóc sức khỏe, nơi việc hiểu lý do đằng sau các dự đoán là tối quan trọng đối với cả các chuyên gia y tế và bệnh nhân.

Chúng tôi so sánh và đối chiếu các mô hình dựa trên học máy diễn giải được LIME và SHAP. Đối với tiên lượng đái tháo đường, một khung hoàn chỉnh và dễ hiểu được cung cấp bởi hồi quy logistic với các bộ diễn giải LIME và SHAP. Điều này cho phép các dự báo chính xác và nâng cao sự hiểu biết của chúng tôi về các quá trình ra quyết định được mô hình dùng, cho phép các điều trị được thông tin tốt hơn và thành công hơn để giảm nguy cơ đái tháo đường. Mô hình đề xuất của chúng tôi chính xác 86% trong việc dự đoán đái tháo đường, vốn có tiềm năng to lớn để nâng cao các kết quả chăm sóc sức khỏe và tăng niềm tin vào các ứng dụng học máy trong ngành y tế. Trong khi cả LIME và SHAP đều được dùng rộng rãi để giải thích các dự đoán mô hình, việc chọn các công cụ diễn giải phù hợp đòi hỏi một kiến thức về cách mỗi công cụ hoạt động trong bối cảnh các nhiệm vụ dự đoán đái tháo đường. Các nhà nghiên cứu có thể đánh giá sự rõ ràng và dễ hiểu của các giải thích được mỗi cách tiếp cận tạo ra bằng cách đối chiếu LIME và SHAP. Các bác sĩ lâm sàng và các bên liên quan khác phải hiểu lý do đằng sau các dự đoán mô hình để tin tưởng và dùng chúng một cách phù hợp do đó kiến thức này là then chốt. Việc biết các khác biệt phương pháp luận giữa LIME và SHAP trong việc tạo các giải thích có thể giúp hướng dẫn nghiên cứu tương lai và việc tạo ra các hệ thống học máy diễn giải được. Để cải thiện sự hiểu biết của chúng tôi về khả năng diễn giải mô hình trong một bối cảnh lâm sàng và để khuyến khích việc sử dụng các mô hình dự đoán minh bạch và đáng tin cậy cho các ứng dụng chăm sóc sức khỏe, một phân tích so sánh các bộ diễn giải LIME và SHAP với các dự đoán đái tháo đường dựa trên học máy giải thích được được trình bày. Chúng tôi cũng tập trung vào nhiều ứng dụng, thách thức, và các hướng tương lai tiềm năng của mô hình học máy diễn giải LIME và SHAP.

Khi so sánh LIME và SHAP, điều thiết yếu là xem xét các yêu cầu cụ thể của phân tích và các đánh đổi giữa khả năng diễn giải cục bộ và toàn cục. LIME phù hợp khi tập trung vào các dự đoán cá nhân và hiểu các lý do cụ thể của chúng. Nó có thể có giá trị trong các tình huống cần các can thiệp hoặc giải thích cá nhân hóa. Mặt khác, SHAP rất phù hợp để có được sự hiểu biết rộng hơn về tầm quan trọng của các đặc trưng và nhận diện các khuôn mẫu nhất quán trong tập dữ liệu. Nó có thể giúp ưu tiên các yếu tố nguy cơ và hướng dẫn các can thiệp ở mức dân số. Cuối cùng, việc chọn giữa LIME và SHAP phụ thuộc vào trường hợp sử dụng cụ thể và mức độ khả năng diễn giải được yêu cầu. Cả hai phương pháp đóng góp đáng kể vào sự hiểu biết của chúng tôi về các mô hình dự đoán đái tháo đường và cho phép việc ra quyết định được thông tin trong chăm sóc sức khỏe. Bằng cách kết hợp các điểm mạnh của LIME và SHAP, các nhà nghiên cứu và người thực hành có thể có được một góc nhìn toàn diện về hành vi của mô hình, từ các dự đoán cá nhân đến tầm quan trọng đặc trưng toàn cục, tạo điều kiện cho các kết quả chăm sóc sức khỏe được cải thiện và thúc đẩy niềm tin vào các ứng dụng học máy cho dự đoán đái tháo đường.

## REFERENCES

- [1]S.Tonekaboni, S.Joshi,M. D. McCradden,and A.Goldenberg,"What clinicians want:Contextualizingexplainable machine learningfor clinical end use"in Proc.Mach.Learn.Healthcare Conf.,2019,pp.359-380.
- [2]F. Doshi-Velez and B. Kim, "Towards a rigorous science of interpretable machinelearning,"2017,arXiv:1702.08608.
- usingPIMAIndian dataset,"J.Diabetes MetabolicDisorders,vol.19, no.1,pp. 391403,Jun.2020.
- [4]V.C. Bavkar and A.A.Shinde,"Machine learning algorithms for diabetes prediction and neural network method for blood glucose measurement," Indian J. Sci. Technol., vol. 14, no.10, pp.869-880, Mar. 2021.
- [5]M.Rout and A.Kaur,"Prediction of diabetes risk based on machine learning techniques,"inProc.Int.Conf.Intell.Eng.Manage.(ICiEM), Jun.2020,pp.246-251.
- [6]T. Van Steenkiste, D. Deschrijver, and T. Dhaene, "Interpretable ECG beat embedding using disentangled variational auto-encoders,"in Proc. IEEE 32nd Int.Symp. Comput.-Based Med.Syst.(CBMS), Jun.2019, pp. 373-378.
- [7]Y. LeCun, Y. Bengio, and G. Hinton, "Deep learning," Nature, vol. 521, no. 7553,pp. 436-444,2015.
- [8]T. Chen and C. Guestrin,"XGBoost: A scalable tree boosting system," inProc.22ndACMSIGKDDInt.Conf.Knowl.Discovery Data Mining, Aug.2016,pp.785-794.
- [9]A. Liaw and M. Wiener,"Classification and regression by randomForest," R News,vol.2,no.3,pp.18-22,2002.
- [10] R.Polikar,"Ensemble learning"in Ensemble Machine Learning, C.Zhang and Y. Ma, Eds., New York, NY, USA: Springer, 2012, doi: 10.1007/978-1-4419-9326-7\_1.
- [11]S.Weisberg,Applied Linear Regression,vol. 528.Hoboken,NJ,USA: Wiley, 2005.
- [12]S.R.Safavian and D.Landgrebe,"A survey of decision tree classifier methodology"IEEE Trans.Syst.,Man, Cybern.,vol.21,no.3, Pp. 660-674,Aug. 1991.
- [13]M.T. Ribeiro,S.Singh,and C.Guestrin,"Why should I trust you?" in Proc.22nd ACM SIGKDD Int.Conf.Knowl.Discovery Data Mining, Aug. 2016, pp. 1135-1144.
- [14]S. M. Lundberg and S.-I. Lee, "A unified approach to interpreting model predictions,"in Proc. Adv. Neural Inf. Process.Syst.,vol. 30, 2017, Pp. 4768-4777.
- [15] A. Misra,H. Gopalan, R. Jayawardena, A.P. Hills, M. Soares, A.A.Reza-Albarran, and K.L.Ramaiya,"Diabetes in developing countries,"J. Diabetes,vol.11, no.7,pp.522-539, 2019.
- [16]R.Vaishali, R. Sasikala, S.Ramasubbareddy,S.Remya, and S.Nalluri, "Genetic algorithm based feature selection and MOEfuzzy classification algorithm on pima Indians diabetes dataset,"in Proc.Int. Conf. Comput. Netw. Informat.(ICCNI),Oct.2017,pp.1-5.
- [17]U. Orji and E.Ukwandu,"Machine learning for an explainable cost prediction of medical insurance,"Mach.Learn.Appl.,vol. 15,Mar. 2024, Art. no.100516.
- [18] H. C. Cubukcu, D. 1. Topcu, and S.Yenice,"Machine learning-based clinical decision support using laboratory data,"Clin.Chem.Lab.Med. (CCLM),vol.62,no.5,pp.793-823,2023.
- [19]V. Viswan, N. Shaffi, M. Mahmud, K. Subramanian, and F. Hajamohideen, "ExplainableartificialintelligenceinAlzheimer'sdisease classification:A systematic review"Cognit. Comput.,vol.16, no.1,pp.1-44, Jan.2024.
- [20] M.J. Raihan, M.A.-M. Khan, S.-H.Kee, and A.-A.Nahid,"Detection of the chronic kidney disease using XGBoost classifier and explaining the influence of the attributes on the model using SHAP, Sci. Rep., vol. 13, no.1,p. 6263,Apr. 2023.
- [21]S.K. Ghosh and A. H. Khandoker,"Investigation on explainable machine learning models to predict chronic kidney diseases,"Sci. Rep.,vol. 14, no.1,p.3687,Feb.2024.
- [22]M.Maniruzzaman,M.J.Rahman,M.Al-MehediHasan,H.S.Suri, M.M.Abedin,A.El-Baz,and J.S.Suri,"Accurate diabetes risk stratificationusingmachinelearning:Role ofmissingvalue and outliers， J. Med. Syst., vol. 42, no.5,pp.1-17, May 2018.
- [23]A.Reinhardt,"Using neural networks for prediction of the subcellular location of proteins,"Nucleic Acids Res.,vol.26,no.9,pp.2230-2236, May1998.
- arXiv:1312.6086.
- [25]B.P.Tabaei and W.H.Herman,"A multivariate logistic regression equation to screen for diabetes:Development and validation,"Diabetes Care, vol.25,no.11,pp.1999-2003,2002.
- [26]I. Jenhani, N. B. Amor, and Z. Elouedi, "Decision trees as possibilistic classifiers," Int. J. Approx. Reasoning,vol. 48,no.3,pp.784807, Aug.2008.
- [27] Md. K. Hasan, Md. A.Alam, D. Das, E. Hossain, and M. Hasan,"Diabetes prediction using ensembling of different machine learning classifiers, IEEE Access,vol.8,pp.76516-76531,2020.
- [28] M. N. Imtiaz and M. A. Haque, "Predicting type 2 diabetes using machine learningandfeatureselectiontechniques,"inAdvancementofComputer Technology and Its Applications,vol. 3, no.3.Uttar Pradesh,India:HBRP Publication Pvt.Ltd.,2020.
- [29]A.Priyadarshini and J. Aravinth,"Correlation based breast cancer detection using machine learning," in Proc.Int. Conf. Recent Trends Electron.,Inf.,Commun.Technol.(RTEICT),2021,pp.499-504.
- [30]A.Yahyaoui, A. Jamil, J. Rasheed, and M. Yesiltepe, "A decision support system for diabetes predictionusing machine learning and deeplearning techniques,"inProc.1st Int.Informat.Softw.Eng.Conf.(UBMYK),2019, Pp. 14.
- [31] A. Mujumdar and V. Vaidehi, "Diabetes prediction using machine learning algorithms,"Proc.Comput.Sci.,vol.165,pp.292-299,2019.
- [32] N. Fazakis,O.Kocsis, E.Dritsas, S. Alexiou, N. Fakotakis, and K.Moustakas,"Machine learning tools for long-term type 2 diabetes risk prediction,"IEEE Access, vol.9,pp.103737-103757,2021.
- [33]M.A.Sarwar, N.Kamal,W.Hamid, and M.A.Shah,"Prediction of diabetes using machine learning algorithms in healthcare,"in Proc. 24th Int.Conf.Autom.Comput.(ICAC),Sep.2018,pp.1-6.
- [34]M.U.Emon, M.S.Keya,Md.S.Kaiser, Md.A.islam,T. Tanha,and Md.S. Zulfiker,"Primary stage of diabetes prediction using machine learning approaches,"in Proc.Int.Conf. Artif. Intell. Smart Syst.(ICAIS), Mar. 2021, pp. 364367.
- [35]Z. Qiu Lin, M. Javad Shafiee, S. Bochkarev, M. St. Jules, X.Yu Wang, and A.Wong,"Do explanations reflect decisions?A machine-centric arXiv:1910.07387.
- [36]G.Stiglic,P.Kocbek,N.Fijacko,M.Zitnik,K.Verbert, and L.Cilar, "Interpretability of machine learning-based prediction models in healthcare,"Wiley Interdiscipl.Rev.,Data Mining Knowl.Discovery,vol.10, no.5,p.e1379, 2020.
- [37] G.Visani, E.Bagli, and F. Chesani,"OptiLIME:Optimized LIME explanations for diagnostic computer algorithms,"2020,arXiv:2006.05714.
- [38] C.Moreira,Y.-L.Chou,M.Velmurugan,C.Ouyang,R.Sindhgatta, demystifying black-box predictive models,"Decis.Support Syst.,vol.150, Nov. 2021, Art. no. 113561.
- [39]J.Andrew Duell, "A comparative approach to explainable artificial intelligencemethodsinapplicationtohigh-dimensionalelectronichealth records:Examining theusability ofXAI"2021,arXiv:2103.04951.
- [40]P. Gohel,P. Singh,and M.Mohanty,"Explainable AI:Current status and future directions,"2021,arXiv:2107.07045.
- [41]D.Slack,S.Hilgard,E.Jia,S.Singh, and H.Lakkaraju,"Fooling LIME and SHAP: Adversarial attacks on post hoc explanation methods,"in Proc. AAAI/ACM Conf.AI,Ethics,Soc.,Feb.2020,pp.180-186.
- [42]J. Duell, X. Fan,B.Burnett,G.Aarts, and S.-M.Zhou,"A comparison of explanations given by explainable artificial intelligence methods on analysingelectronichealthrecords,"inProc.IEEEEMBSInt.Conf. Biomed. Health Informat.(BHI), 2021,pp.1-4.

- [43]J. H. Ong,K.M.Goh,and L.L. Lim,"Comparative analysis of explainable Pp. 185-190.
- [44]C.-A.Hu, C.-M. Chen, Y.-C. Fang, S.-J. Liang, H.-C.Wang, W.-F. Fang, C.-C. Sheu, W.-C.Perng,K.-Y. Yang,K.-C.Kao, C.-L.Wu, C.-S.Tsai, M.-Y. Lin, and W.-C. Chao, ""Using a machine learning approach to predict mortalityin criticallyillinfluenza patients:Across-sectionalretrospective multicentre study in Taiwan,"BMJ Open,vol.10,no.2,Feb.2020, Art.n0.e033898.
- [45]M.Kapcia,H.Eshkiki,J. Duell,X.Fan, S.Zhou,and B.Mora,"ExMed: An AI tool for experimenting explainable AI techniques on medical data analytics,"in Proc.IEEE 33rd Int.Conf. Tools Artif.Intell.(ICTAI), Nov. 2021, pp. 841-845.
- [47]Q.Ye,J.Xia,and G.Yang,"Explainable AIfor COVID-19 CT classifiers: Aninitialcomparisonstudy，"inProc.IEEE34thInt.Symp.ComputerBased Med.Syst.(CBMS), Jun. 2021,pp.521-526.
- [46]N.Gandhi and S.Mishra,"Explainable AI for healthcare:A study for interpreting diabetes prediction,"in Proc.Mach.Learn.Big Data AnalyticsInt.Conf.Mach.Learn.BigDataAnalytics(ICMLBDA).Cham, Switzerland: Springer, 2022,pp.95-105.
- [48]D. Garreau and D. Mardaoui, "What does lime really see in images?" in Proc.Int.Conf.Mach.Learn.,2021,pp.3620-3629.
- [50]H. Nori, S.Jenkins, P. Koch,and R. Caruana, ""InterpretML:A unified framework for machine learning interpretability,"2019, arXiv:1909.09223.
- [49]H.Wu,W.Ruan,J.Wang,D.Zheng,B.Liu,Y. Geng,X.Chai,J. Chen, K. Li, S. Li, and S. Helal, "Interpretable machine learning for COVID-19: Anempiricalstudyonseveritypredictiontask,"IEEETrans.Artif.Intell., vol. 4, no. 4, pp. 764-777, Aug. 2021.
- [51] X. Man and E.Chan,"The best way to select features?' 2020, arXiv:2005.12483.
- [52]X.Man and E.P.Chan,"The best way to select features?Comparing MDA, LIME,and SHAP"J. Financial Data Sci.,vol. 3,no.1,pp.127-139, Jan. 2021.
- [53]L.G.McCoy,C.T.A.Brenna, S.S.Chen, K.Vold, and S.Das, "Believinginblackboxes:Machinelearningforhealthcare does not need explainability to be evidence-based,J. Clin.Epidemiology,vol.142, Pp. 252-257,Feb. 2022.
- [54]J. He and S.Mazumdar,"Comparing LIME and SHAP using synthetic polygonal data clusters,"Int. J. Infonomics, vol. 14, no.1,pp.2059-2067, Jun.2021.
- [55]Y. Ramon,D.Martens,F.Provost, and T.Evgeniou,"A comparison ofinstance-levelcounterfactualexplanationalgorithmsforbehavioral andtextualdata:SEDC,LIME-C andSHAP-C，"Adv.Data Anal. Classification,vol.14,no.4,pp.801-819,Dec.2020.
- [56]S.Jesus,C.Belem,V. Balayan, J. Bento,P.Saleiro,P.Bizarro,and J. Gama, "How can i choose an explainer?An application-grounded evaluation of post-hoc explanations,"inProc.ACMConf.Fairness,Accountability, Transparency,2021,pp.805-815.
- [58]B.Aldughayfiq, F. Ashfaq, N. Z.Jhanjhi, and M. Humayun, "Explainable AI for retinoblastoma diagnosis:Interpreting deeplearning models with LIME and SHAP,Diagnostics, vol. 13, no.11, p. 1932,Jun. 2023.
- [57]T. A.Assegie, T. Karpagam, R. Mothukuri, R. L. Tulasi, and M. Fentahun Engidaye，"Extraction of humanunderstandableinsight from machine learning model for diabetes prediction,"Bull.Electr. Eng.Informat., vol. 11, no. 2,pp. 1126-1133, Apr. 2022.
- [59] S. Rao, S. Mehta, S. Kulkarni, H. Dalvi, N.Katre, and M. Narvekar, "A study of LIME and SHAP model explainers for autonomous disease predictions,"in Proc.IEEE Bombay Sect.Signature Conf.(IBSSC), Dec. 2022, pp. 1-6.
- [60]L.P. Joseph, E.A.Joseph, and R.Prasad,"Explainable diabetes classification using hybrid Bayesian-optimized TabNet architecture," Comput.Biol.Med.,vol.151,Dec.2022,Art.no.106178.
- [61]N. Nipa, M. H. Riyad, S. Satu, Walliullah, K. C. Howlader, and M. A. Moni, "Clinically adaptablemachine learning model toidentify early appreciable features of diabetes,"Intell. Med.,vol. 4, no.1,pp. 22-32,Feb. 2024.
- [62]Y.Zhao,J.K.Chaw,M.C.Ang,M.M.Daud, and L.Liu,"A diabetespredictionmodelwithvisualizedexplainableartificialintelligence (XAI) technology,"in Advances in Visual Informatics (Lecture Notes in Computer Science), vol. 14322,H. B.Zaman et al.,Eds., Singapore: Springer,2024,doi:10.1007/978-981-99-7339-2\_52.
- [63]H.Guler,D.Avci,M.Ulas,and T. Omma,"Performance comparison of machine learning models powered by SHAP and LIME based explainability techniques on diabetes dataset,"SSRN.[Online].Available: https://ssrn.com/abstract=4713039

SHAMIM AHMED nhận bằng B.S. và M.S. về khoa học máy tính và kỹ thuật từ Đại học Kỹ thuật và Công nghệ Dhaka, Gazipur, Bangladesh, lần lượt vào năm 2010 và 2013. Hiện ông đang theo học bằng Ph.D. về công nghệ thông tin tại Viện Công nghệ Thông tin (IIT), Đại học Jahangirnagar (JU), Savar, Dhaka, Bangladesh. Năm 2011, ông là Giảng viên tại Khoa Khoa học Máy tính và Kỹ thuật, Đại học

International University, Dhaka. Năm 2013, ông gia nhập Khoa Khoa học Máy tính và Kỹ thuật, Đại học Kinh doanh và Công nghệ Bangladesh, Dhaka, với tư cách Giảng viên, nơi ông đã là Phó Giáo sư từ năm 2015. Các mối quan tâm nghiên cứu của ông bao gồm trí tuệ nhân tạo, thị giác máy tính, học máy, học sâu, robot, xử lý ảnh số, các hệ thống, và mạng.

M. SHAMIM KAISER (Thành viên Cao cấp, IEEE) nhận bằng cử nhân và thạc sĩ về vật lý ứng dụng, điện tử, và kỹ thuật truyền thông từ Đại học Dhaka, Dhaka, Bangladesh, lần lượt vào năm 2002 và 2004, và bằng Ph.D. về kỹ thuật viễn thông từ Viện Công nghệ Châu Á (AIT), Pathum Thani, Thái Lan, vào năm 2010. Từ năm 2011, ông đã làm việc tại Viện Công nghệ Thông tin, Đại học Jahangirnagar, Dhaka, với tư cách

Trợ lý Giáo sư, nơi ông trở thành Phó Giáo sư vào năm 2015, và Giáo sư Đầy đủ vào năm 2019. Ông đã là tác giả của hơn 250 bài báo trong các tạp chí và hội nghị bình duyệt khác nhau. Các mối quan tâm nghiên cứu hiện tại của ông bao gồm phân tích dữ liệu, học máy, mạng không dây và xử lý tín hiệu, mạng radio nhận thức, dữ liệu lớn và an ninh mạng, và năng lượng tái tạo. Ông là Thành viên Trọn đời của Hội Điện tử Bangladesh và Hội Vật lý Bangladesh, và Thành viên Cao cấp của IEICE, Nhật Bản. Ông cũng là Tình nguyện viên của IEEE Bangladesh Section và Chủ tịch Chương sáng lập của Chương Hội Máy tính IEEE Bangladesh Section.

MOHAMMAD SHAHADAT HOSSAIN (Thành viên Cao cấp, IEEE) nhận bằng M.Phil. và Ph.D. về tính toán từ Viện Khoa học và Công nghệ (UMIST), Đại học Manchester, Vương quốc Anh, lần lượt vào năm 1999 và 2002. Hiện ông là Giáo sư khoa học máy tính và kỹ thuật tại Đại học Chittagong, Bangladesh, và Giáo sư Thỉnh giảng tại Đại học Công nghệ Lulea, Thụy Điển. Các mối quan tâm nghiên cứu hiện tại của ông bao gồm chính phủ điện tử, mô

hình hóa các rủi ro và bất định bằng các kỹ thuật tính toán tiến hóa, việc điều tra các công cụ và phương pháp phát triển phần mềm thực dụng, các hệ thống thông tin nói chung, và các hệ chuyên gia.

KARL ANDERSSON (Thành viên Cao cấp, IEEE) nhận bằng M.Sc. về khoa học máy tính và công nghệ từ Viện Công nghệ Hoàng gia, Stockholm, Thụy Điển, và bằng Ph.D. về các hệ thống di động từ Đại học Công nghệ Lulea, Thụy Điển. Sau khi thực hiện Nghiên cứu Sau Tiến sĩ với Phòng thí nghiệm Internet Thời gian Thực, Đại học Columbia, Thành phố New York, NY, Hoa Kỳ, và Viện Quốc gia về Công nghệ Thông tin và Truyền thông, Tokyo, Nhật Bản, ông

hiện là Giáo sư về điện toán phổ biến và di động tại Đại học Công nghệ Lulea. Các mối quan tâm nghiên cứu của ông bao gồm điện toán xanh và di động, Internet vạn vật, các công nghệ đám mây, và an ninh thông tin.
