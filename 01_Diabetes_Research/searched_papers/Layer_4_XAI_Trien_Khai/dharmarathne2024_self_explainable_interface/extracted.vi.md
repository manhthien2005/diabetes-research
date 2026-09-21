<!-- extracted by pdf-extract | engine=docling | pages=13 | ocr=True | tables=12/4 | density=1.00 | score=100 -->

Nội dung có sẵn tại ScienceDirect

## Healthcare Analytics

trang chủ tạp chí: www.elsevier.com/locate/health

## Một cách tiếp cận học máy mới để chẩn đoán đái tháo đường với một giao diện tự giải thích

Gangani Dharmarathne a,b , Thilini N. Jayasinghe a,b , Madhusha Bogahawaththa c , D.P.P. Meddage c , Upaka Rathnayake d,*

- a The Charles Perkins Centre, The University of Sydney, Sydney, NSW, 2006, Australia
- b School of Dentistry, Faculty of Medicine and Health, The University of Sydney, Sydney, NSW, 2006, Australia
- c School of Engineering and Information Technology, University of New South Wales, Canberra, Australia
- d Department of Civil Engineering and Construction, Faculty of Engineering and Design, Atlantic Technological University, Sligo, Ireland

## T H Ô N G T I N B À I B Á O

Biên tập viên xử lý: Madijd Tavana

Từ khóa: Học máy Đái tháo đường Phân tích dự đoán Giao diện tự giải thích Chăm sóc sức khỏe Chẩn đoán

## 1. Giới thiệu

Mức glucose cao trong máu được gọi là đái tháo đường, và nó đã trở thành một tình trạng y tế mạn tính trên toàn thế giới trong vài thập kỷ qua. Hormone chịu trách nhiệm kiểm soát mức đường huyết là insulin, và sự sản xuất không đủ và sử dụng không hiệu quả của nó là các lý do chính cho đái tháo đường. Theo thời gian, đái tháo đường có thể dẫn đến nhiều biến chứng sức khỏe khác nhau có thể ảnh hưởng đến nhiều cơ quan trong cơ thể người [1]. Năm 2017, 452 triệu bệnh nhân đái tháo đường được nhận diện, và con số này được dự kiến tăng lên 694 triệu vào năm 2045 [2]. Theo một nghiên cứu khác, đến năm 2030 và 2045, nó được kỳ vọng tăng lên lần lượt 25% và 51% dân số [2]. Chủ yếu, ba loại đái tháo đường có thể được nhận diện, là 'đái tháo đường type 1, đái tháo đường type 2, và đái tháo đường thai kỳ' [3]. Đái tháo đường type 1 xảy ra khi hệ miễn dịch vô tình tấn công các tế bào beta trong tuyến tụy và phá hủy quá trình sản xuất insulin [4]. Trong số ba loại đái tháo đường, đái tháo đường type 2 là dạng phổ biến nhất và luôn liên quan đến các hành vi lối sống [5 -8], thói quen ăn uống [9], béo phì, các hành vi ít vận động, và

* Tác giả liên hệ. Địa chỉ E-mail: Upaka.Rathnayake@atu.ie (U. Rathnayake).

## https://doi.org/10.1016/j.health.2024.100301

## T Ó M T Ắ T

Nghiên cứu này giới thiệu giao diện tự giải thích đầu tiên từ trước đến nay để chẩn đoán các bệnh nhân đái tháo đường bằng học máy. Chúng tôi đề xuất bốn mô hình phân loại (Decision Tree (DT), K-nearest Neighbor (KNN), Support Vector Classification (SVC), và Extreme Gradient Boosting (XGB)) dựa trên bộ dữ liệu đái tháo đường có sẵn công khai. Để làm sáng tỏ các hoạt động bên trong của các mô hình này, chúng tôi đã dùng phương pháp diễn giải học máy được biết đến là Shapley Additive Explanations (SHAP). Tất cả các mô hình thể hiện độ chính xác đáng khen ngợi trong việc chẩn đoán các bệnh nhân đái tháo đường, với mô hình XGB cho thấy một chút ưu thế hơn các mô hình khác. Sử dụng SHAP, chúng tôi đi sâu vào mô hình XGB, cung cấp các hiểu biết chuyên sâu về lý luận đằng sau các dự đoán của nó ở mức độ chi tiết. Tiếp theo, chúng tôi đã tích hợp mô hình XGB và các giải thích cục bộ của SHAP vào một giao diện để dự đoán đái tháo đường ở bệnh nhân. Giao diện này phục vụ một vai trò quan trọng vì nó chẩn đoán các bệnh nhân và cung cấp các giải thích minh bạch cho các quyết định được đưa ra, cung cấp cho người dùng một nhận thức nâng cao về các tình trạng sức khỏe hiện tại của họ. Với bản chất rủi ro cao của lĩnh vực y tế, giao diện được phát triển này có thể được nâng cao thêm bằng cách bao gồm dữ liệu lâm sàng rộng hơn, cuối cùng hỗ trợ các chuyên gia y tế trong các quá trình ra quyết định của họ.

sức khỏe tinh thần [10]. Trong đái tháo đường type 2, tuyến tụy thất bại trong việc sản xuất đủ insulin để đáp ứng nhu cầu, và cơ thể trở nên kháng insulin [11]. Do đó, nó không còn có thể kiểm soát mức đường huyết, và những người mắc đái tháo đường type 2 cũng phải trải qua các loại thuốc khác nhau và duy trì các hành vi của họ để giữ đúng hướng [12]. Đái tháo đường Thai kỳ phát triển trong khi mang thai và thường giải quyết sau khi sinh con [13]. Nó có thể tăng nguy cơ biến chứng cho cả mẹ và bé.

Tùy theo loại đái tháo đường cụ thể, có thể có một phạm vi rộng các triệu chứng. Tuy nhiên, đi tiểu thường xuyên, sụt cân không giải thích được, đói tăng, kiệt sức, nhìn mờ, tê, và nhiễm trùng lặp lại là một số triệu chứng điển hình [14]. Các dấu hiệu sớm của đái tháo đường thường gồm khát và đi tiểu tăng, và các cá nhân mắc bệnh có thể sụt cân mặc dù có đói tăng [1]. Nhìn mờ là kết quả của thủy tinh thể của mắt bị tác động bởi mức đường huyết cao. Mức đường huyết cao có thể làm tổn hại hệ miễn dịch, làm cho nhiễm trùng dễ xảy ra hơn và các vết thương và vết cắt khó lành hơn. Có nhiều cách tiếp cận để kiểm soát đường huyết, tùy theo loại đái tháo đường. Trong khi đái tháo đường type 2 có thể đòi hỏi thuốc uống hoặc tiêm insulin tùy theo mức độ nghiêm trọng, đái tháo đường type 1 thường được kiểm soát bằng liệu pháp insulin. Các bệnh nhân đái tháo đường có thể kiểm soát mức đường huyết của họ bằng cách kiểm tra chúng thường xuyên và điều chỉnh các phác đồ thuốc của họ khi cần thiết. Chế độ ăn cũng quan trọng trong tình huống này. Để điều trị đái tháo đường hiệu quả, một chế độ ăn cân bằng, bổ dưỡng phải được áp dụng, cùng với sự chú ý cẩn thận đến lượng carbohydrate nạp vào và kiểm soát khẩu phần. Hoạt động thể chất giúp điều hòa mức đường huyết, giảm cân, và nâng cao độ nhạy insulin.

Thông qua sự tích hợp của các kỹ thuật học máy, trí tuệ nhân tạo đã tác động mạnh mẽ đến sự tiến bộ của một phổ rộng các lĩnh vực, đặc biệt là lĩnh vực y học [15 -17]. Điều này sẽ dẫn đến độ chính xác chẩn đoán được cải thiện, sắp xếp điều trị, và chăm sóc bệnh nhân. Các công nghệ tiên tiến này được dùng rộng rãi trong các hồ sơ y tế bệnh nhân, ghi chú lâm sàng, hình ảnh y tế, và dữ liệu bộ gene. Các cách tiếp cận hướng-dữ-liệu này giúp các chuyên gia chăm sóc sức khỏe nhận diện các mẫu và tương quan và hỗ trợ trong việc hiểu cách các kỹ thuật khai phá dữ liệu tiết lộ các xu hướng trong bộ dữ liệu. Tầm quan trọng này xuất phát từ sự tiến bộ nhanh chóng của công nghệ trí tuệ nhân tạo và sự tích hợp của nó vào lĩnh vực y học [18,19]. Hơn nữa, điều này có thể dẫn đến một lợi ích kép là giảm chi phí điều trị trong khi đồng thời cải thiện các tình trạng sức khỏe tổng thể. Xét đến sự sẵn có của dữ liệu liên quan đến đái tháo đường, nhiều nhà nghiên cứu đã dùng nhiều thuật toán học máy khác nhau để phân tích tình trạng [20]. Trong số các kỹ thuật này, mạng nơ-ron nhân tạo (ANN), cây quyết định (DT), hồi quy logistic, K-nearest neighbors (KNN), random forest (RF) và extreme gradient boosting (XGB) thường được dùng cho phân loại.

Với việc dùng học máy, cộng đồng nghiên cứu đã có thể chẩn đoán đái tháo đường một cách chính xác. Tuy nhiên, các mô hình không minh bạch, và điều này nêu lên các câu hỏi quan trọng về cách chúng chẩn đoán các bệnh nhân. Mọi người đã chuyển sang các mô hình trí tuệ nhân tạo giải thích được (explainable) diễn giải các mô hình học máy để giải quyết vấn đề này. Các phương pháp này làm sáng tỏ các yếu tố chi phối đằng sau chẩn đoán và cách mô hình đi đến một quyết định cụ thể. Tuy nhiên, việc dùng trí tuệ nhân tạo giải thích được đã bị hạn chế trong bối cảnh dự đoán đái tháo đường. Chủ yếu, các giải thích toàn cục (global) đã được dùng trong công trình liên quan.

Trong nghiên cứu này, các tác giả nhắm tới phát triển giao diện tự giải thích đầu tiên từ trước đến nay để chẩn đoán đái tháo đường bằng các phương pháp học máy. Điều này ngụ ý một giao diện để dự đoán liệu một cá nhân có khả năng mắc đái tháo đường hay không với lý luận đằng sau. Hơn nữa, các tác giả đã tiến hành một phân tích chuyên sâu về các mô hình dùng AI giải thích được. Cho việc này, họ đã dùng một cơ sở dữ liệu đái tháo đường có sẵn công khai để huấn luyện các mô hình (https://www.kaggle.com/datasets/mathchi/diabetes-data-se t). Động lực đằng sau nghiên cứu này xuất phát từ tỷ lệ hiện mắc đái tháo đường đang tăng và nhu cầu về các giải pháp sáng tạo để nâng cao phát hiện sớm và nhận thức. Là điểm mới của công trình này, cách tiếp cận không chỉ chẩn đoán đái tháo đường bằng học máy mà còn cung cấp lý luận đằng sau nó bằng trí tuệ nhân tạo giải thích được, cùng với một giao diện thân thiện với người dùng. Các cá nhân có thể dùng giao diện này để tự chẩn đoán các tình trạng hiện hành của họ với một mức độ chính xác nhất định và hiểu các lý do đằng sau chúng. Bằng cách dùng học máy theo cách này, các tác giả dự định triển khai nó trong các ứng dụng thực tế để cải thiện nhận thức của mọi người về đái tháo đường, vốn là một tình trạng quan trọng. Các kết cục được cung cấp bởi giao diện có thể giáo dục mọi người về việc liệu họ có nên tìm kiếm các điều trị y tế hay không. Nghiên cứu nhắm tới thu hẹp khoảng cách giữa công nghệ và y tế công cộng, cung cấp một cách tiếp cận chủ động cho quản lý đái tháo đường và có khả năng giảm gánh nặng tổng thể lên các hệ thống chăm sóc sức khỏe.

## 2. Tổng quan tài liệu

Học máy, một tập con của AI, tập trung vào việc tạo ra các hệ thống máy tính có khả năng khám phá các mẫu trong dữ liệu khổng lồ, cho phép cả các nhiệm vụ phân loại và dự đoán khi được trình bày với các minh họa dữ liệu mới [21,22]. Học máy dùng các công cụ từ khai phá dữ liệu, thống kê, và nhiều thủ tục tối ưu hóa khác nhau để xây dựng các mô hình hiệu quả. Một khía cạnh có ý nghĩa khác của học máy là học biểu diễn (representational learning), một lĩnh vực con tập trung vào việc tự động nhận diện biểu diễn dữ liệu phù hợp nhất để trừu tượng hóa kiến thức [15]. Nhiều thuật toán học máy đã được đề xuất và điều chỉnh theo nhiều dạng khác nhau để tối ưu hóa hiệu năng cho các nhiệm vụ như nhiệm vụ đang xét. Trong các phát triển gần đây, ảnh hưởng này mở rộng đến các cách tiếp cận chẩn đoán và điều trị cá nhân hóa [23,24]. Việc áp dụng trí tuệ nhân tạo và học máy vào các thủ tục và điều trị y tế đánh dấu một sự thay đổi lớn trong cách chăm sóc sức khỏe được cung cấp [25 -27]. Bằng cách dùng kiến thức thu được từ phân tích dữ liệu lớn, các công nghệ này giúp phát triển các phương pháp chẩn đoán và điều trị hiệu quả hơn và cá thể hóa hơn. Điều này, đến lượt nó, cho phép các chuyên gia chăm sóc sức khỏe đưa ra các quyết định sáng suốt hơn và kịp thời hơn về chăm sóc bệnh nhân [28]. Ví dụ, trong ung thư học, các mô hình học máy có thể hỗ trợ trong việc dự đoán các đáp ứng điều trị và điều chỉnh các phác đồ trị liệu dựa trên các hồ sơ bệnh nhân riêng lẻ, do đó tối ưu hóa các kết cục và giảm thiểu các tác dụng phụ.

Mức đường huyết cao trong máu được gọi là đái tháo đường và đái tháo đường type 2 là dạng đái tháo đường phổ biến nhất [29]. Nó được đặc trưng bởi khả năng suy giảm của hệ thống chuyển hóa để điều hòa các mức carbohydrate và lipid do insulin trục trặc. Điều này dẫn đến mức đường huyết cao, một tình trạng được biết đến là tăng đường huyết. Trong các trường hợp tăng đường huyết dai dẳng, đặc biệt trong đái tháo đường phụ thuộc insulin (type 1) không có liệu pháp insulin, nguy cơ nhiễm toan ceton (ketoacidosis) tăng [30]. Đái tháo đường type 1 phổ biến hơn ở trẻ em và được đặc trưng bởi sự phá hủy tự miễn của các tế bào beta trong tuyến tụy [31,32]. Ngược lại, đái tháo đường type 2, cũng được biết đến là đái tháo đường không phụ thuộc insulin, phổ biến hơn ở các cá nhân từ 40 tuổi trở lên. Tuy nhiên, nó ngày càng được quan sát ở những người dưới 40 tuổi, đặc biệt ở các quốc gia phát triển nơi tỷ lệ béo phì đang tăng. Ở những người trẻ hơn mắc đái tháo đường type 2, các bất thường di truyền có thể dẫn đến kháng insulin, thiếu hụt insulin, hoặc cả hai. Chẩn đoán sớm đái tháo đường, đặc biệt type 2, cung cấp cho các cá nhân một cơ hội tốt hơn để giảm thiểu các biến chứng nghiêm trọng liên quan đến tình trạng [31, 33 -35]. Các biến chứng này gồm suy thận, mù lòa, đau tim, đột quỵ, và thậm chí cắt cụt chi do các vấn đề tuần hoàn [34,36]. Kết quả là, Hiệp hội Đái tháo đường Hoa Kỳ (ADA) khuyến nghị sàng lọc mọi người cho các tình trạng tiền đái tháo đường. Để đạt được điều này, một nghiệm pháp dung nạp glucose đường uống được dùng để thiết lập một ngưỡng [33].

Bên cạnh việc kiểm tra mức đường huyết, có các chỉ báo khác có thể giúp chẩn đoán đái tháo đường. Đã được nhấn mạnh rằng có một tương quan giữa đái tháo đường và béo phì, đặc biệt khi đái tháo đường type 2 lần đầu xuất hiện, cũng như kháng insulin [37]. Các nhà nghiên cứu [38] đã nhận diện một số hóa chất, như glycerol tăng, cytokinins, axit béo không ester hóa, các dấu hiệu tiền viêm, và nhiều chất khác nhau, là các biến góp phần vào sự phát triển kháng insulin ở các cá nhân béo phì. Ngoài béo phì, các biến thiên về độ nhạy insulin cũng đã được quan sát, với sự kháng tăng được thấy trong khi mang thai, dậy thì, và lão hóa, như được báo cáo bởi các nhà nghiên cứu khác nhau [37,39,40]. Việc tiêu thụ carbohydrate và mức hoạt động thể chất cũng đã được liên kết với các dao động về độ nhạy insulin [37], với béo phì nổi lên là yếu tố có tác động lớn nhất [37, 41]. Một yếu tố quyết định khác của độ nhạy insulin là sự phân bố mỡ cơ thể. Các nghiên cứu đã cho thấy rằng các cá nhân với phân bố mỡ ngoại vi thể hiện độ nhạy insulin tốt hơn so với những người với phân bố mỡ tập trung quanh các vùng bụng và/hoặc ngực [41]. Hơn nữa, đã được thiết lập vững chắc rằng Chỉ số Khối Cơ thể (BMI) thể hiện một tương quan mạnh với cả đái tháo đường và kháng insulin.

Một nghiên cứu được tiến hành ở Thiên Tân (Tianjin), Trung Quốc, đã khảo sát nhiều yếu tố khác nhau ảnh hưởng đến việc quản lý đái tháo đường [42]. Trong số 29 đặc tính họ khảo sát, họ đã nhận diện 12 chủ đề góp phần vào tính dễ tổn thương tăng cao của các bệnh nhân đái tháo đường. Các chủ đề này gồm hòa nhập xã hội, các giới hạn lối sống, các điều chỉnh lối sống, mức độ nghiêm trọng của bệnh, hiểu biết về sức khỏe, các ràng buộc tài chính, các niềm tin về sức khỏe, môi trường y tế, các ràng buộc thời gian, sức khỏe tinh thần, các mức hỗ trợ, và các trải nghiệm chuyển tiếp [43]. Hơn nữa, Derraik và cộng sự [44] chứng minh rằng tuổi, BMI, giới tính, và tình trạng dậy thì đều ảnh hưởng đến độ dày da liên quan đến đái tháo đường. Do đó, quản lý đái tháo đường thành công đòi hỏi các điều chỉnh lối sống đáng kể. Nghiên cứu gần đây đã nhận diện các lĩnh vực then chốt, như các điều chỉnh chế độ ăn và hoạt động thể chất thường xuyên, nơi các bệnh nhân gặp các thách thức và cơ hội để cải thiện [45].

Tầm quan trọng của trí tuệ nhân tạo và học máy trong việc định hình lại các thực hành y tế được minh chứng bởi các công trình của các nhà nghiên cứu như [46 -50]. Các phát hiện của họ nhấn mạnh tiềm năng của các công nghệ này trong việc cải thiện chăm sóc bệnh nhân qua các khả năng dự đoán nâng cao và các chiến lược điều trị cá nhân hóa. Ví dụ, Adlung và cộng sự chứng minh tính hiệu quả của các DT trong việc dự đoán các kết cục bệnh dựa trên dữ liệu bệnh nhân, làm nổi bật tính hữu ích của nó trong việc ra quyết định y tế [24]. Ngoài ra, công trình của Uddin và các đồng nghiệp đã trình bày tính hiệu quả của các thuật toán K-nearest neighbor trong việc nhận diện các mẫu trong hình ảnh chẩn đoán, góp phần vào việc phát hiện bệnh được cải thiện [51]. Support vector classification đã được nghiên cứu rộng rãi cho các ứng dụng của nó trong chẩn đoán y tế, như được thấy trong nghiên cứu được tiến hành bởi Cervantes và cộng sự, nơi họ đã dùng thành công SVC để phân loại các hình ảnh y tế với độ chính xác cao [52]. Hơn nữa, công trình của Zhang và cộng sự cung cấp các hiểu biết giá trị về việc áp dụng extreme gradient boosting cho các khuyến nghị điều trị cá nhân hóa, nhấn mạnh tác động tiềm năng của nó lên chăm sóc bệnh nhân riêng lẻ [25].

Các nghiên cứu gần đây về dự đoán đái tháo đường đã chứng kiến việc áp dụng rộng rãi các mô hình học máy đa dạng, từ các thuật toán truyền thống như Logistic Regression và k-Nearest Neighbors đến các kỹ thuật tiên tiến như Artificial Neural Networks, Random Forests, và Deep Neural Networks. Nghiên cứu của Darolia & Chhillar đã phân tích bộ dữ liệu đái tháo đường dùng các thuật toán phổ biến Artificial Neural Network, Random Forest và Logistic Regression [53]. Đáng chú ý, các phát hiện của họ chỉ ra rằng Logistic Regression vượt trội hơn các thuật toán khác, trình bày tính hiệu quả của nó trong dự đoán đái tháo đường. Ferbian và cộng sự đã có một cách tiếp cận khác bằng cách dùng các kỹ thuật học máy có giám sát, cụ thể đối đầu hai thuật toán k-Nearest Neighbor với thuật toán Naive Bayes cho dự đoán đái tháo đường [54]. Thú vị là, nghiên cứu của họ kết luận rằng thuật toán Naive Bayes thể hiện hiệu năng vượt trội khi so với KNN trong bối cảnh này [54]. Mousa và cộng sự đã tiến hành một nghiên cứu so sánh toàn diện tập trung vào ba mô hình được dùng rộng rãi: Long Short-Term Memory, Random Forest và Convolutional Neural Network cho chẩn đoán đái tháo đường [55]. Nghiên cứu này làm sáng tỏ các thế mạnh khác nhau của các mô hình này và cung cấp các hiểu biết giá trị về khả năng áp dụng của chúng trong bối cảnh dự đoán đái tháo đường [55]. Reza và cộng sự tập trung vào việc nâng cao hiệu năng của Support Vector Machines cho dự đoán đái tháo đường type II, cụ thể bằng cách giới thiệu một kernel phi tuyến được cải thiện [55]. Cách tiếp cận tinh tế này góp phần vào các nỗ lực đang diễn ra để tối ưu hóa độ chính xác và độ tin cậy của các mô hình dự đoán cho đái tháo đường. Ovass và cộng sự đã giới thiệu một mô hình Deep Neural Network (DNN) cho dự đoán đái tháo đường [56]. Sự khám phá của họ vào các kỹ thuật học sâu cung cấp một góc nhìn đương đại về tiềm năng của các mạng nơ-ron trong lĩnh vực chẩn đoán đái tháo đường [56]. Phân tích so sánh của Kuchariapati và cộng sự đã dùng các kỹ thuật khai phá dữ liệu trong dự đoán [57], trong khi nghiên cứu của Ayushi và cộng sự tập trung vào các thuật toán học máy có giám sát [58].

Các kỹ thuật trí tuệ nhân tạo và học máy đã thu hút sự chú ý đáng kể trong những năm gần đây cho việc phân tích đái tháo đường [21,22,59]. Các công nghệ tiên tiến này cung cấp các hiểu biết giá trị về phòng ngừa và quản lý bệnh [15]. Các phát hiện nghiên cứu chứng minh tác động sâu sắc của trí tuệ nhân tạo và học máy trong việc làm sáng tỏ các mẫu và mối quan hệ phức tạp trong các bộ dữ liệu lớn liên quan đến đái tháo đường [1,46]. Trong trạng thái quản lý bệnh, trí tuệ nhân tạo học máy đã chứng minh là công cụ then chốt. Công trình gần đây của Bergoeing và cộng sự đã trình bày việc dùng các công nghệ này trong việc cung cấp các kế hoạch điều trị nâng cao và cá nhân hóa cho các bệnh nhân đái tháo đường, dẫn đến các kết cục được cải thiện và chăm sóc lấy bệnh nhân làm trung tâm được nâng cao [60]. Ngoài ra, nghiên cứu được tiến hành bởi Levy-Loboda và cộng sự đã làm nổi bật khả năng của các thuật toán học máy để tối ưu hóa liều insulin dựa trên dữ liệu thời gian thực, minh họa tiềm năng cho các chiến lược điều trị được điều chỉnh riêng và động [23].

Mặc dù có tài liệu hiện có về dự đoán đái tháo đường, sự chú ý không đủ đã được dành cho các đặc tính của các mô hình bền vững có thể hoạt động hiệu quả khi dữ liệu bị giới hạn. Hơn nữa, trí tuệ nhân tạo giải thích được chủ yếu đã được dùng để diễn giải tầm quan trọng của các yếu tố theo cách toàn cục. Trí tuệ nhân tạo giải thích được có thể được dùng ở một mức độ tinh hơn, làm sáng tỏ các chi tiết nhỏ vốn bắt buộc để đi đến một quyết định. Ngoài ra, không nghiên cứu nào đã phát triển một giao diện tự giải thích dự đoán đái tháo đường với lý luận nền tảng. Do đó, nghiên cứu hiện tại dự định giải quyết khoảng trống nghiên cứu này bằng cách cung cấp một kết cục giá trị cho cộng đồng nghiên cứu.

## 3. Phương pháp luận

## 3.1. Phân tích hồ sơ sức khỏe điện tử

Nói chung, các hồ sơ sức khỏe chứa các kết quả chẩn đoán quan trọng, và các nhà thực hành đủ tiêu chuẩn theo truyền thống thu thập các hồ sơ y tế. Ngày nay, việc dùng các hồ sơ y tế này đã tăng, và chẩn đoán y tế cho thấy các kết quả hứa hẹn với các bản ghi dữ liệu này. Bộ dữ liệu được dùng có sẵn trực tuyến trên Kaggle và được công bố từ Pima Indians Diabetes Database từ National Institute of Diabetes and Digestive and Kidney Diseases. Tất cả dữ liệu được thu thập từ 768 cá nhân từ 21 đến 81 tuổi, và các đặc trưng chi tiết được trình bày trong Bảng 1. Bộ dữ liệu gồm tám thuộc tính: pregnancies, glucose, blood pressure, skin thickness, insulin, Body Mass Index (BMI), diabetes pedigree function, và age.

Bộ dữ liệu được cung cấp đã được phân tích để xác định các tương quan thuộc tính dùng hệ số tương quan Pearson và nhận diện các khía cạnh giá trị nhất. Các tương quan giữa các đặc tính được trình bày trong ma trận tương quan trong Hình 1. Mỗi thuộc tính có một tương quan một-đối-một với các thuộc tính khác, dẫn đến một giá trị tương quan. Các thuộc tính với các giá trị tương quan cao hơn thể hiện hoặc các liên kết dương rất cao hoặc âm rất cao. Tương quan dương cao nhất được quan sát giữa age và pregnancies, với một giá trị dương mạnh 0.54. Glucose và outcome cho thấy một giá trị tương quan 0.47, chỉ một liên kết mạnh với outcome trong mẫu. Ngược lại, age và skin thickness có liên kết nhỏ nhất, với một giá trị 0.11.

Đáng chú ý, glucose thể hiện tương quan dương nhất với outcome, điều này được kỳ vọng vì đái tháo đường được liên kết với mức đường huyết cao. Nhìn chung, như được mô tả trong ma trận tương quan (Hình 1), không đặc trưng nào thể hiện các tương quan đặc biệt cao với nhau. Điều này gợi ý rằng mỗi đặc tính ảnh hưởng độc lập đến dự đoán đái tháo đường. Dữ liệu đã trải qua tiền xử lý để giải quyết các đầu vào không chính xác và quản lý chúng hiệu quả hơn. Tiếp theo, bộ dữ liệu được dùng cho huấn luyện mô hình.

Bảng 1

Các thuộc tính trong bộ dữ liệu và mô tả của chúng.

| Đặc trưng                  | Mô tả                                            | Khoảng                       |
|----------------------------|--------------------------------------------------|------------------------------|
| Pregnancies                | Number of times the individual was pregnant      | 0 - 17                       |
| Glucose                    | Concentration of plasma glucose                  | 0 - 199                      |
| Blood pressure             | Diastolic blood pressure (mmHg)                  | 0 - 122                      |
| Skin thickness             | Triceps skin fold thickness in mm                | 0 - 99                       |
| Insulin                    | 2-h serum insulin (muU/ml)                       | 0 - 846                      |
| Body Mass Index (BMI)      | Body mass index (weight in kg/(height in m) 2    | 0 - 67.1                     |
| Diabetes pedigree function | Diabetes Pedigree Function between 0.08 and 2.42 | 0.08 - 2.42                  |
| Age                        | Measured in years                                | 21 - 81                      |
| Outcome                    | Diabetes/No diabetes                             | Diabetes = 1 No diabetes = 0 |

Hình 1. Ma trận tương quan của EHR đái tháo đường được dùng cho nghiên cứu này.

## 3.2. Các mô hình học máy

Học máy được thực hiện dùng lập trình Python [61] và thư viện học máy phổ biến: Sci-Kit learn [62]. Trong nghiên cứu này, chúng tôi đã dùng các mô hình học máy đa dạng, gồm Decision Tree (DT), K-Nearest Neighbor (KNN), Support Vector Classifier (SVC), và Extreme Gradient Boosting (XGB), để phân loại đái tháo đường với độ chính xác tốt. Cây quyết định được biết đến vì bản chất diễn giải được và cấu trúc thứ bậc của chúng, làm cho chúng giá trị để tiết lộ các đường quyết định quan trọng trong dữ liệu. K-Nearest Neighbor tận dụng sự gần gũi của các điểm dữ liệu cho phân loại, cung cấp một cách tiếp cận bền vững cho nhận dạng mẫu. Support Vector Classifier xuất sắc trong việc phân tách các bộ dữ liệu phức tạp, nhiều chiều bằng cách tìm các siêu phẳng tối ưu. Cuối cùng, Extreme Gradient Boosting khai thác sức mạnh của học tập hợp để cải thiện độ chính xác dự đoán bằng cách tối ưu hóa tuần tự các bộ học yếu. Việc dùng các mô hình này cho phép chúng tôi khám phá một phạm vi rộng các kỹ thuật cho phân loại đái tháo đường và cung cấp các hiểu biết giá trị về ứng dụng chăm sóc sức khỏe quan trọng này.

## 3.3. Shapley additive explanation (SHAP)

SHAP được dùng để tiết lộ tầm quan trọng của mỗi thuộc tính trong việc dự đoán trạng thái bệnh [63]. Điều này cung cấp một phương pháp để đánh giá mức ý nghĩa của mỗi đặc trưng trong bộ dữ liệu, bắt nguồn từ các nguyên tắc lý thuyết trò chơi [64]. Kỹ thuật này tạo thuận lợi cho việc tổng hợp các kết cục mô hình, theo đó đóng góp tăng dần của mỗi đặc trưng qua tất cả các tổ hợp đặc trưng khả dĩ được lấy trung bình để xác định trọng số tương đối của nó trong mô hình [65 -68]. Nói đơn giản hơn, SHAP đánh giá cách việc bao gồm hoặc loại trừ mỗi yếu tố tác động đến độ chính xác của các kết quả [69 -72]. Tận dụng phương pháp này, chúng ta có thể biến đổi các mô hình học máy phức tạp thành các mô hình diễn giải được, làm sáng tỏ các yếu tố thúc đẩy các dự đoán và nâng cao sự hiểu biết của chúng ta về quá trình dự đoán bệnh.

## 4. Kết quả và bàn luận

## 4.1. Đánh giá mô hình

Để huấn luyện mô hình, 70% tổng bộ dữ liệu được dùng, trong khi tập còn lại được dành cho kiểm định mô hình. Phương pháp tìm kiếm ngẫu nhiên (random search) được dùng để tối ưu hóa các siêu tham số trong mỗi bộ phân loại học máy. Sau khi tối ưu hóa mỗi mô hình, chúng tôi đã so sánh bốn mô hình khác nhau để đánh giá tính hiệu quả của chúng, dùng nhiều thước đo khác nhau gồm sensitivity, precision, accuracy, F1 score, và false positive rate, như được tóm tắt trong Bảng 2. Sensitivity, được đánh giá qua phương trình (1), đo khả năng của một mô hình để nhận diện chính xác các ca dương tính, xét cả các dương tính thật và âm tính giả. Đáng chú ý, mô hình XGB chứng minh sensitivity cao nhất, đạt được các điểm 76% cho huấn luyện và 73% cho dữ liệu kiểm tra. Precision, được tính dùng phương trình (2), biểu thị khả năng của một mô hình để giảm thiểu các dương tính giả. Để đánh giá độ chính xác mô hình tổng thể, chúng tôi đã dùng tỷ lệ accuracy được định nghĩa trong phương trình (3), biểu diễn phần trăm các mẫu được dự đoán đúng trong tổng số mẫu. Mô hình XGB thể hiện accuracy cao nhất, đạt 80% cho huấn luyện và 77% cho kiểm tra, trong khi DT

Bảng 2

Đánh giá hiệu năng của các mô hình học máy ((Giai đoạn; T: Huấn luyện, V: Kiểm tra (kiểm định).

| Mô hình | Giai đoạn |   Precision |   Recall/TPR/ Sensitivity |   F1 score |   Accuracy |   FPR |
|---------|---------|-------------|---------------------------|------------|------------|-------|
| DT      | T       |        0.62 |                      0.70 |       0.66 |       0.78 |   0.2 |
|         | V       |        0.63 |                      0.68 |       0.65 |       0.76 |   0.2 |
| SVC     | T       |        0.78 |                       0.5 |       0.61 |       0.78 |   0.1 |
|         | V       |        0.60 |                      0.72 |       0.65 |       0.77 |   0.2 |
| KNN     | T       |        0.60 |                      0.73 |       0.66 |       0.79 |  0.22 |
|         | V       |        0.60 |                      0.69 |       0.64 |       0.77 |  0.21 |
| XGB     | T       |        0.62 |                      0.76 |       0.68 |       0.80 |  0.20 |
|         | V       |        0.60 |                      0.73 |       0.65 |       0.77 |   0.2 |

mô hình cho thấy accuracy thấp nhất trong kiểm tra. Điểm F1, được suy ra từ công thức trong (4), tạo một sự cân bằng giữa recall của các ca dương tính của một bộ phân loại và precision của nó trong việc nhận diện chúng. Cuối cùng, chúng tôi đã tính False Positive Rate (FPR) của mỗi mô hình dùng phương trình (5). Đáng chú ý là mô hình XGB thể hiện độ chính xác đáng kể trong nghiên cứu này, trình bày tính linh hoạt và hiệu suất của nó trong việc dự đoán các chẩn đoán đái tháo đường.

Bảng 2 trình bày các chỉ số hiệu năng giới hạn, thúc đẩy các tác giả trình bày một ma trận nhầm lẫn để làm nổi bật khả năng phân loại của mỗi mô hình. Các ma trận này phân loại các kết quả phân loại của chúng tôi thành bốn nhóm riêng biệt: dương tính thật (TP), âm tính thật (TN), dương tính giả (FP), và âm tính giả (FN), như được minh họa trong Hình 2. Phân tích của chúng tôi tiết lộ rằng mô hình K-Nearest Neighbors (KNN) đạt các giá trị TP cao nhất. Trong huấn luyện, các mô hình DT, SVC, KNN và XGB đã nhận diện lần lượt 132, 106, 127 và 131 bệnh nhân mắc đái tháo đường, trong khi trong tập kiểm tra, đã nhận diện 33 -34 bệnh nhân là mắc đái tháo đường. Ngoài ra, mô hình nhận biết hiệu quả các bệnh nhân khỏe mạnh không mắc đái tháo đường, biểu diễn hạng mục TN. Tuy nhiên, có các trường hợp mà mô hình phân loại sai các bệnh nhân khỏe mạnh là mắc đái tháo đường, dẫn đến các ca FP. Ngược lại, các ca FN, nơi mô hình nhầm xem các bệnh nhân mắc đái tháo đường là khỏe mạnh, có thể tác động đáng kể đến các kết quả. Đáng chú ý, mô hình XGB chứng minh ít ca FN nhất trong cả tập huấn luyện và kiểm tra, với chỉ 41 và 13 trường hợp tương ứng. Điều này ngụ ý rằng mô hình XGB đặc biệt giỏi trong việc giảm thiểu nguy cơ thất bại trong việc nhận diện các bệnh nhân mắc đái tháo đường. Các phát hiện này làm sáng tỏ cách các mô hình của chúng tôi hoạt động đúng và sai trong việc phân loại các bệnh nhân, với mô hình DT xuất sắc trong phát hiện TP và mô hình XGB cho thấy độ tin cậy đáng kể trong việc giảm thiểu các ca FN, một yếu tố quan trọng trong chẩn đoán y tế.

Biểu diễn đồ họa về khả năng của một mô hình để phân biệt giữa các lớp dương và âm qua các ngưỡng quyết định khác nhau được trình bày trong các đường cong đặc trưng hoạt động của bộ thu nhận (ROC). Trong trường hợp của một mô hình tốt hơn, các đường cong ROC nên bao phủ hầu hết diện tích dưới đường cong (AUC) và gần với tọa độ 0, 1 hơn (tham khảo Hình 3). Ngoài ra, các đường cong đỏ và xanh dương nên gần như sát nhau. Trong nghiên cứu này, tất cả bốn mô hình thể hiện các biến thiên tương tự trong các đường cong ROC của chúng mặc dù có các khác biệt về độ lớn AUC của chúng. Các giá trị AUC thấp nhất được ghi nhận cho các mô hình DT và KNN, cả hai đều cho thấy các giá trị AUC tương đương cho dữ liệu huấn luyện và kiểm tra. Tuy nhiên, mô hình XGB đạt một AUC 0.856 cho huấn luyện và 0.82 cho kiểm tra, chỉ các đặc tính mô hình vượt trội về phân loại đái tháo đường.

Bảng 3 sau đây trình bày công trình liên quan đã dùng học máy cho các dự đoán đái tháo đường. Trong việc so sánh hiệu năng của nhiều mô hình dự đoán khác nhau cho đái tháo đường qua các nghiên cứu khác nhau, các biến thiên đáng chú ý nổi lên trong các thước đo precision, accuracy, recall, và F1 score. Nghiên cứu hiện tại đã đạt được hiệu năng gần như tốt so với các nghiên cứu còn lại. Tuy nhiên, điều quan trọng cần lưu ý là một số nghiên cứu thiếu các thước đo cụ thể hoặc việc dùng trí tuệ nhân tạo giải thích được (XAI). Các hiểu biết so sánh này nhấn mạnh sự đa dạng trong hiệu năng và tính diễn giải của mô hình qua các cách tiếp cận khác nhau đối với dự đoán đái tháo đường trong nghiên cứu học máy. Không chỉ các tác giả dùng XAI, mà chúng tôi còn phát triển nó thành một giao diện để cung cấp một giao diện người dùng giải thích được.

Nhìn chung, từ phân tích, các tác giả quan sát thấy rằng mô hình XGB vượt trội hơn các mô hình còn lại. Tuy nhiên, các mô hình này chỉ cung cấp kết cục mà không cung cấp hiểu biết về lý luận nền tảng đằng sau các dự đoán. Để giải quyết điều này, các tác giả đã dùng các giải thích SHAP trên mô hình XGB để khảo sát quá trình ra quyết định của mô hình. Các giải thích này có thể được phân loại là toàn cục (global) hoặc cục bộ (local), tùy theo những gì đang được giải thích. Các giải thích toàn cục bao gồm các giải thích được quan sát cho toàn bộ mô hình hoặc một phần của mô hình chứa nhiều hơn một thể hiện đơn lẻ. Trái lại, các giải thích cục bộ cung cấp các diễn giải cho một thể hiện đơn lẻ, cung cấp một góc nhìn chi tiết hơn về các dự đoán của mô hình.

## 5. Các giải thích mô hình

## 5.1. Các giải thích toàn cục

Theo Hình 4, rõ ràng là các mức glucose tác động ý nghĩa nhất lên dự đoán đái tháo đường. Thanh màu ở phía bên phải ký hiệu các giá trị cao hơn hoặc thấp hơn của bất kỳ đặc trưng nào. Ví dụ, nếu một đặc trưng nằm trong khoảng giữa 0 và 100, các giá trị gần 100 sẽ được ký hiệu màu đỏ, và các giá trị gần 0 sẽ được ký hiệu màu xanh dương. Một sự tăng các mức glucose (được chỉ bởi vùng màu đỏ) nhất quán tác động tích cực đến khả năng đái tháo đường, như được phản ánh trong các giá trị SHAP dương. Ngược lại, hạ thấp các mức glucose có một tác động âm, giảm khả năng đái tháo đường. Đặc trưng chiếm ưu thế thứ hai là BMI (Body Mass Index). Các giá trị BMI cao hơn thể hiện một ảnh hưởng tương đối nhỏ nhưng dương lên dự đoán đái tháo đường, trong khi các giá trị BMI thấp hơn giảm khả năng đái tháo đường. Một xu hướng tương tự được quan sát cho age; các cá nhân lớn tuổi hơn có khả năng mắc đái tháo đường hơn so với các cá nhân trẻ hơn.

Các đặc trưng còn lại góp phần ở mức độ ít hơn vào phân loại của mô hình nhưng vẫn có các tác động cụ thể, như được trình bày trong Hình 5. Trong Hình 5, tác động trung bình của mỗi tham số lên dự đoán đái tháo đường được biểu diễn. Năm đặc trưng đầu tiên (màu đỏ) có một tác động dương lên mô hình, biểu thị rằng một sự tăng mỗi đặc trưng này nâng cao khả năng mắc đái tháo đường. BMI và age có các tác động tương đương lên dự đoán đái tháo đường, trong khi diabetes pedigree function và số lần mang thai có một tác động nhỏ nhưng dương lên outcome. Skin thickness và mức insulin, mặt khác, có một tác động rất tối thiểu nhưng âm lên việc chẩn đoán đái tháo đường. Tăng skin thickness và mức insulin giảm khả năng đái tháo đường. Đáng chú ý, blood pressure có một tác động không đáng kể lên dự đoán đái tháo đường, theo mô hình.

Tiếp theo, các tác giả đi sâu vào một khảo sát chuyên sâu về ba đặc trưng đầu tiên và cách các giá trị của chúng tác động đến khả năng chẩn đoán đái tháo đường. Hình 6 a minh họa rằng một sự tăng các mức glucose lên đến 75 không tác động đáng kể đến khả năng đái tháo đường. Các mức glucose lên đến 100 thậm chí giảm khả năng của một chẩn đoán đái tháo đường. Tuy nhiên, khi các mức glucose vượt quá 100, điều này bắt đầu tăng khả năng đái tháo đường. Tương tự, các mức BMI trên 30 và age trên 30 nói chung tác động tích cực đến khả năng đái tháo đường, như được mô tả trên trục bên trái (giá trị SHAP).

Ở phía bên phải, thanh màu biểu diễn các đặc trưng thứ cấp chủ yếu liên kết với đặc trưng chính. Trong trường hợp các mức glucose, age là đặc trưng liên kết chính. Đối với BMI và age, glucose là đặc trưng liên kết chính. Tuy nhiên, các giá trị đặc trưng (được biểu diễn bởi màu đỏ hoặc xanh dương) thể hiện một biến thiên hỗn hợp trong việc chẩn đoán đái tháo đường. Tuy nhiên, đặc trưng age chứng minh một số biến thiên đáng chú ý trong các mức glucose. Các trường hợp nơi age lớn hơn 30 được liên kết với các chấm màu đỏ thường xuyên hơn, chỉ rằng các mức glucose cao hơn phổ biến hơn được liên kết với các cá nhân lớn tuổi hơn trong bối cảnh chẩn đoán đái tháo đường.

Dựa trên các đặc trưng chiếm ưu thế, các tác giả đã phân đoạn các giải thích để khám phá thêm các mẫu trong bộ dữ liệu, như được hiển thị trong Hình 7.

Hình 2. Các ma trận nhầm lẫn của bốn bộ phân loại học máy (Huấn luyện và Kiểm tra).

| DT training        | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 132      | 81          |
| diabetes 2         | 56       | 345         |

| SVC training       | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 106      | 31          |
| diabetes 2         | 107      | 370         |

| KNN       | KNN        | Actual   | Actual      |
|-----------|------------|----------|-------------|
| training  | training   | Diabetes | No diabetes |
| Predicted | Diabetes   | 127      | 86          |
| Predicted | diabetes 2 | 46       | 355         |

| XGB training       | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 131      | 82          |
| diabetes 2         | 41       | 360         |

| DT testing         | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 34       | 21          |
| diabetes 2         | 16       | 83          |

| SVC       | SVC         | Actual   | Actual      |
|-----------|-------------|----------|-------------|
| testing   | testing     | Diabetes | No diabetes |
| Predicted | Diabetes    | 33       | 22          |
| Predicted | diabetes ON | 13       | 86          |

| KNN       | KNN         | Actual   | Actual      |
|-----------|-------------|----------|-------------|
| testing   | testing     | Diabetes | No diabetes |
| Predicted | Diabetes    | 33       | 22          |
| Predicted | diabetes No | 15       | 84          |

| XGB testing        | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 33       | 22          |
| diabetes No        | 13       | 86          |

Hình 3. Các đường cong ROC thu được cho các mô hình học máy cho huấn luyện và kiểm tra.

Bảng 3 Hiệu năng mô hình thu được từ các nghiên cứu liên quan gần đây để dự đoán đái tháo đường.

| Tài liệu      | Precision   | Accuracy   | Recall   | F1 Score   | FPR      |
|---------------|-------------|------------|----------|------------|----------|
| Nghiên cứu này | 60 - 78%    | 76 - 80%   | 50 - 76% | 61 - 68%   | 10 - 22% |
| [53]          | -           | 74 - 77%   | -        | -          | -        |
| [54]          | 70 - 73%    | 73 - 76%   | 69 - 71% | -          | -        |
| [55]          | 75 - 82%    | 78 - 85%   | 72 - 78% | 73 - 80%   | -        |
| [73]          | 62 - 72%    | -          | 6 - 87%  | 62 - 79%   | -        |
| [74]          | 73 - 80%    | 73 - 79%   | 73 - 79% | 73 - 79%   | -        |
| [75]          | 70 - 89%    | 74 - 79%   | 79 - 89% | 78 - 85%   | -        |
| [56]          | -           | 70 - 80%   | -        | -          | -        |
| [76]          | 64 - 72%    | -          | 68 - 74% | 64 - 72%   | -        |
| [57]          | -           | 72 - 75%   | -        | -          | -        |
| [58]          | 0 - 65%     | 68 - 75%   | 0 - 66%  | 55 - 64%   | -        |

Ví dụ, Hình 7a minh họa các giải thích của các bệnh nhân với các mức glucose dưới 100. Trong phân đoạn này, các mức glucose thấp hơn góp phần vào một khả năng giảm mắc đái tháo đường. Ngoài ra, BMI và age của họ cũng đóng một vai trò trong việc hạ thấp nguy cơ đái tháo đường. Ngược lại, khi các mức glucose cao hơn 100, như được trình bày trong Hình 7 b, tác động của các mức glucose cao hơn, BMI cao hơn, và age lớn hơn chủ yếu góp phần vào khả năng mắc đái tháo đường. Điều này được chỉ bởi vùng màu đỏ khá rõ (biểu diễn đầu ra mô hình dương) trong Hình 7b. Một biến thiên tương tự được quan sát trong các phân đoạn nơi BMI và age đều lớn hơn 30, giống mẫu được thấy trong Hình 7b. Do đó, có thể kết luận rằng glucose, BMI, và age đóng các vai trò then chốt trong các dự đoán của mô hình so với các đặc trưng còn lại. Kiểm soát các yếu tố này có thể ảnh hưởng đáng kể đến chẩn đoán đái tháo đường của một người. Do đó, các phương pháp giải thích được cho phép các phân tích tinh hơn và tiên tiến hơn này để làm nổi bật các vùng tinh tế trong bộ dữ liệu có thể chứa các mẫu ẩn. Tiết lộ các mẫu như vậy cực kỳ quan trọng trong bối cảnh y tế, vì nó là một lĩnh vực với rủi ro cao.

Hình 4. Giải thích toàn cục của mô hình XGB.

Hình 5. Giải thích trung bình toàn cục của mô hình XGB.

## 5.2. Các giải thích cục bộ

Đối với các giải thích cục bộ, các tác giả đã chọn bốn cá nhân ngẫu nhiên (Bảng 4) để giải thích. Việc lựa chọn ngẫu nhiên không đưa vào các thiên lệch vì bất kỳ bệnh nhân nào cũng có thể được giải thích dùng SHAP (tham khảo Hình 8), và các giải thích này độc lập. Bệnh nhân đầu tiên, như được hiển thị trong Hình 8a, có các thuộc tính sau: pregnancies = 3; glucose = 141; blood pressure = 0; skin thickness = 0; insulin = 0; BMI = 30; diabetes pedigree function = 0.761; age = 27. Bệnh nhân này đã được chẩn đoán đái tháo đường, chủ yếu do các mức glucose và BMI cao hơn, được chỉ bởi các giá trị SHAP dương (đỏ). Diabetes pedigree function cũng góp phần tích cực vào chẩn đoán, cùng với một tác động dương tương đối thấp hơn từ skin thickness. Tuy nhiên, age của bệnh nhân góp phần âm, chỉ rằng mô hình xem age của bệnh nhân (27) ít có khả năng góp phần vào đái tháo đường.

Thể hiện thứ hai và thứ ba (Hình 8b và c) trình bày hai bệnh nhân không mắc đái tháo đường. Lý do chính cho điều này là các mức glucose thấp hơn của họ (102 và 65), vốn ảnh hưởng quyết định đến outcome. Theo Hình 8b, bệnh nhân 27 tuổi có một tác động âm lên nguy cơ đái tháo đường do yếu tố age của anh, cùng với BMI của anh. Trái lại, bệnh nhân thứ ba, 42 tuổi, có một yếu tố thúc đẩy dương, tăng nguy cơ đái tháo đường, cùng với BMI và pregnancies của anh. Tuy nhiên, các yếu tố thúc đẩy dương này có độ lớn thấp hơn trong việc xác định khả năng đái tháo đường. Các yếu tố còn lại có tác động ít hơn lên quyết định về xác suất đái tháo đường.

Bệnh nhân thứ tư (Hình 8d) có một mức glucose cao hơn (158), vốn là lý do chính cho chẩn đoán đái tháo đường của họ. Ngoài ra, age của họ (66) và BMI góp phần tích cực vào khả năng mắc đái tháo đường. Đáng chú ý là BMI không phải luôn tương quan với age nếu cá nhân duy trì một lối sống lành mạnh. Ví dụ, ở độ tuổi trẻ hơn, sự thiếu một lối sống phù hợp có thể dẫn đến các giá trị BMI cao hơn, vốn có thể góp phần vào

Hình 6. Các đồ thị phụ thuộc đặc trưng.

Hình 7. Các giải thích toàn cục của các phần được chọn của bộ dữ liệu.

## 5.3. Giao diện tự giải thích mới

Từ nghiên cứu này, chúng tôi đã phát triển một giao diện tự giải thích mới để chẩn đoán đái tháo đường (Hình 9). Giao diện này cũng được phát triển chủ yếu dùng ngôn ngữ python. Giao diện này dựa trên mô hình XGB và bộ giải thích SHAP được dùng trong nghiên cứu này. Để tạo giao diện, chúng tôi đã dùng thư viện 'Tkinter" được cung cấp bởi Python [77]. Bước đầu tiên liên quan đến việc viết mô hình XGB vào giao diện. Mô hình đã huấn luyện được lưu vào giao diện và các đầu vào được phép được lấy từ người dùng. Vì các đầu vào có thể được nhập sai bởi người dùng, các đầu vào được định nghĩa với các ranh giới số (tối đa và tối thiểu). Nếu bất kỳ văn bản hoặc đầu vào không liên quan nào được nhập, giao diện cung cấp một thông báo lỗi. Dựa trên đầu vào của người dùng, giao diện xác định liệu họ có mắc đái tháo đường hay không. Điều này được đạt được bằng cách gọi bộ giải thích cục bộ SHAP trong giao diện.

Điểm mới của giao diện này nằm ở khả năng của nó để giải thích cho người dùng tại sao họ có thể mắc đái tháo đường, cung cấp các giải thích cho các lý do khả dĩ cùng với các độ lớn của chúng liên quan đến kết cục được dự đoán. Chúng tôi tin chắc đây là nghiên cứu đầu tiên phát triển một giao diện tự giải thích để chẩn đoán đái tháo đường. Về ứng dụng này, màu xanh dương

Bảng 4 Các cá nhân được chọn cho các giải thích cục bộ.

| Đặc trưng                  | Instance 1   | Instance 2   | Instance 3   | Instance 4   |
|----------------------------|--------------|--------------|--------------|--------------|
| Pregnancies                | 3            | 0            | 8            | 2            |
| Gluicose                   | 141          | 102          | 65           | 158          |
| Bloodpressure              | 0            | 86           | 72           | 90           |
| Skin thickness             | 0            | 17           | 23           | 0            |
| Insulin                    | 0            | 105          | 0            | 0            |
| BMI                        | 30           | 29.3         | 32           | 31.6         |
| Diabetes pedigree function | 0.761        | 0.695        | 0.6          | 0.805        |
| Age                        | 27           | 27           | 42           | 66           |
| Diabetes (Yes/No)          | Yes          | No           | No           | Yes          |

đái tháo đường. Tương tự, mỗi bệnh nhân có thể được giải thích về việc tại sao và như thế nào họ được hoặc không được chẩn đoán đái tháo đường. Thông tin này có ý nghĩa vì, trong số nhiều yếu tố liên quan, việc nhận diện các yếu tố có ảnh hưởng nhất dùng học máy cung cấp các hiểu biết giá trị về thứ tự và độ lớn tác động của chúng.

Hình 8. Các giải thích cục bộ trên bốn điểm được chọn.

các thanh màu chỉ rằng đặc trưng giúp giảm nguy cơ chẩn đoán đái tháo đường, và màu đỏ chỉ rằng đặc trưng góp phần vào đái tháo đường. Vì đái tháo đường là một yếu tố quan trọng chịu trách nhiệm cho hàng nghìn cái chết của con người mỗi năm, ứng dụng này có tầm quan trọng đáng kể cho cộng đồng, cho phép các cá nhân có được sự hiểu biết tốt hơn về tình trạng của họ mà không đòi hỏi kiến thức chuyên sâu về giải phẫu người. Trong khi ứng dụng cung cấp các hiểu biết về cách các yếu tố nhất định có thể ảnh hưởng đến khả năng đái tháo đường, điều thiết yếu là các cá nhân tìm kiếm các tư vấn y tế phù hợp cho việc điều trị của họ. Cho nghiên cứu thêm, giao diện này có thể được mở rộng để kết hợp các đầu vào khác nhau và các bộ dữ liệu lâm sàng lớn hơn để nâng cao khả năng tổng quát hóa của ứng dụng.

## 6. Kết luận

Nghiên cứu này nhắm tới phát triển một giao diện tự giải thích mới để dự đoán đái tháo đường, với tầm quan trọng toàn cầu của nó như một nguyên nhân hàng đầu gây tử vong. Bốn thuật toán học máy được dùng để phân loại đái tháo đường chỉ dựa trên dữ liệu lâm sàng nguồn mở. Tiếp theo, một phân tích toàn diện được tiến hành để nhận diện các nguyên nhân gốc dùng các mô hình trí tuệ nhân tạo giải thích được. Các phát hiện then chốt của nghiên cứu này như sau:

- Các phương pháp học máy chứng minh độ chính xác cao trong việc chẩn đoán đái tháo đường, với tất cả các mô hình đạt độ chính xác huấn luyện > 0.78 và độ chính xác kiểm tra > 0.76. Các đường cong đặc trưng hoạt động của bộ thu nhận (ROC) cho huấn luyện thể hiện diện tích dưới đường cong (AUC) > 0.85, và AUC > 0.795 cho kiểm tra trong mỗi mô hình.
- Dựa trên phân tích, mô hình extreme gradient boosting (XGB) nổi lên là mô hình hoạt động hàng đầu để chẩn đoán các bệnh nhân mắc đái tháo đường. Nó đạt độ chính xác kiểm tra cao hơn so với ba mô hình khác và có AUC cao nhất cho cả huấn luyện và kiểm tra.
- Xét đến các nghiên cứu đã dùng cùng bộ dữ liệu và nghiên cứu gần đây khác, nghiên cứu hiện tại đã đạt được các chỉ số hiệu năng tốt. Ví dụ, precision của các mô hình hiện tại nằm trong khoảng giữa 60% và 78%, trong khi công trình liên quan thể hiện precision nằm trong khoảng từ giá trị tối thiểu 0% (chỉ hiệu năng kém) và mở rộng tới 89%. Các điểm accuracy và recall trong nghiên cứu hiện tại thay đổi từ 76% đến 80% và 50% -76% tương ứng, trong khi công trình trước báo cáo các độ chính xác nằm trong khoảng từ 68% đến 86% và các điểm recall từ 6% đến 89%. Tuy nhiên, nghiên cứu hiện tại không chỉ tập trung vào accuracy mà còn cung cấp tính giải thích được của các dự đoán so với công trình liên quan. Không có tính giải thích được, ngay cả khi mô hình đạt độ chính xác rất cao, các chuyên gia lĩnh vực sẽ không tin tưởng các ứng dụng này. Cả accuracy và tính giải thích được đều quan trọng khi các nhà ra quyết định tham gia như những người dùng cuối.
- Việc áp dụng các phương pháp trí tuệ nhân tạo giải thích được, cụ thể là SHAP, cho phép nhận diện các yếu tố nền tảng trong mô hình học máy dẫn đến các quyết định cụ thể. Điều này làm cho các mô hình phức tạp trở nên diễn giải được và dễ tiếp cận với các cá nhân không có nền tảng kỹ thuật hoặc y tế. SHAP làm nổi bật glucose, BMI, và age là ba yếu tố chiếm ưu thế ảnh hưởng đến đái tháo đường, cùng với các độ lớn tác động tương ứng của chúng.
- Giao diện tự giải thích được phát triển trong nghiên cứu này cung cấp cho người dùng thông tin về tình trạng hiện tại của họ, chỉ liệu

Hình 9. Giao diện dự đoán đái tháo đường tự giải thích mới (Màu Đỏ: tăng khả năng đái tháo đường, Màu Xanh dương (giảm khả năng đái tháo đường). (Để diễn giải các tham chiếu về màu sắc trong chú thích hình này, người đọc tham khảo phiên bản Web của bài báo.)

họ có khả năng mắc đái tháo đường hay không. Đây là một phát triển có ý nghĩa, xét rằng đái tháo đường là một nguyên nhân hàng đầu gây tử vong trên toàn thế giới, thường do thiếu nhận thức và chăm sóc y tế phù hợp. Do đó, ứng dụng này phục vụ như một công cụ giá trị để giáo dục các cá nhân về tình trạng của họ và các lý do đằng sau quyết định thu được từ giao diện.

- Việc dùng các phương pháp học máy giải thích được trong y học là quan trọng, xét đến rủi ro cao liên quan trong chăm sóc sức khỏe. Nhận thức sớm có thể tác động đáng kể đến các kết cục bệnh nhân bằng cách ngăn ngừa sự tiến triển của các bệnh như đái tháo đường, vốn hiện không có cách chữa. Do đó, triển khai học máy giải thích được một cách tương tác có thể giúp giảm thiểu các rủi ro liên quan đến đái tháo đường bằng cách cải thiện nhận thức.
- Tóm lại, nghiên cứu này cung cấp các hiểu biết giá trị về chẩn đoán chính xác đái tháo đường dùng học máy và cung cấp một giao diện tự giải thích, thân thiện với người dùng để nâng cao nhận thức và can thiệp sớm, cuối cùng góp phần vào các kết cục chăm sóc sức khỏe tốt hơn.

## Tài trợ

Nghiên cứu này không nhận tài trợ bên ngoài nào.

## Tuyên bố về xung đột lợi ích

Các tác giả tuyên bố rằng họ không có lợi ích tài chính cạnh tranh hoặc quan hệ cá nhân nào được biết đến có thể đã xuất hiện ảnh hưởng đến công trình được báo cáo trong bài báo này.

## Tính sẵn có của dữ liệu

Dữ liệu sẽ được cung cấp theo yêu cầu.

## Tài liệu tham khảo

- [1] A. Dutta, et al., Early prediction of diabetes using an ensemble of machine learning models, Int. J. Environ. Res. Publ. Health 19 (19) (2022) 12378 [Online]. Available: https://www.mdpi.com/1660-4601/19/19/12378.
- [2] J.M. Lawrence, et al., Trends in prevalence of Type 1 and Type 2 diabetes in children and adolescents in the US, 2001-2017, JAMA 326 (8) (Aug 24 2021) 717 -727, https://doi.org/10.1001/jama.2021.11165, in eng.
- [3] M. Gollapalli, et al., A novel stacking ensemble for detecting three types of diabetes mellitus using a Saudi Arabian dataset: pre-diabetes, T1DM, and T2DM, Comput. Biol. Med. 147 (2022) 105757.
- [4] S. Owens-Collins, Beta Cell Regulation, Function, Dysfunction and Eventual Destruction in Type 1 Diabetes, 2023.
- [5] N.M. Asril, K. Tabuchi, M. Tsunematsu, T. Kobayashi, M. Kakehashi, Predicting healthy lifestyle behaviours among patients with type 2 diabetes in Rural Bali, Indonesia, Clin. Med. Insights Endocrinol. Diabetes 13 (2020) 1179551420915856, https://doi.org/10.1177/1179551420915856.
- [6] K.I. Galaviz, K.M.V. Narayan, F. Lobelo, M.B. Weber, Lifestyle and the prevention of Type 2 diabetes: a status report, Am. J. Lifestyle Med. 12 (1) (2018) 4 -20, https://doi.org/10.1177/1559827615619159.
- [7] C. Ye, et al., Genetic susceptibility, family history of diabetes and healthy lifestyle factors in relation to diabetes: a gene -environment interaction analysis in Chinese adults, J. Diabetes Investig. 12 (11) (2021) 2089 -2098, https://doi.org/10.1111/ jdi.13577.
- [8] S. Yuan, D. Gill, E.L. Giovannucci, S.C. Larsson, Obesity, Type 2 diabetes, lifestyle factors, and risk of Gallstone disease: a Mendelian randomization investigation, Clin. Gastroenterol. Hepatol. 20 (3) (2022) e529 -e537, https://doi.org/10.1016/j. cgh.2020.12.034.
- [9] L. Rasmussen, C.W. Poulsen, U. Kampmann, S.B. Smedegaard, P.G. Ovesen, J. Fuglsang, Diet and healthy lifestyle in the management of gestational diabetes mellitus, Nutrients 12 (10) (2020) 3050 [Online]. Available: https://www.mdpi. com/2072-6643/12/10/3050.
- [10] H. Li, et al., Genetic risk, adherence to a healthy lifestyle, and type 2 diabetes risk among 550,000 Chinese adults: results from 2 independent Asian cohorts, Am. J. Clin. Nutr. 111 (3) (2020) 698 -707, https://doi.org/10.1093/ajcn/nqz310.
- [11] C.J. Nolan, M. Prentki, Insulin resistance and insulin hypersecretion in the metabolic syndrome and type 2 diabetes: time for a conceptual framework shift, Diabetes Vasc. Dis. Res. 16 (2) (2019) 118 -127.
- [12] L.R. Saslow, et al., Psychological support strategies for adults with type 2 diabetes in a very low -carbohydrate web-based program: randomized controlled trial, JMIR Diabetes 8 (2023) e44295.

- [13] P. Qian, et al., How breastfeeding behavior develops in women with gestational diabetes mellitus: a qualitative study based on health belief model in China, Front. Endocrinol. 13 (2022) 955484.
- [14] M. Dwivedi, A.R. Pandey, Diabetes mellitus and its treatment: an overview, J. Adv. Pharmacol. 1 (1) (2020) 48 -58.
- [15] S. Dev, H. Wang, C.S. Nwosu, N. Jain, B. Veeravalli, D. John, A predictive analytics approach for stroke prediction using machine learning and neural networks, Healthcare Anal. 2 (2022) 100032, https://doi.org/10.1016/j. health.2022.100032.
- [16] D. Dutta, D. Paul, P. Ghosh, Analysing feature importances for diabetes prediction using machine learning, in: 2018 IEEE 9th Annual Information Technology, Electronics and Mobile Communication Conference (IEMCON), vol. 1, 2018, pp. 924 -928, https://doi.org/10.1109/IEMCON.2018.8614871.
- [17] L. Fregoso-Aparicio, J. Noguez, L. Montesinos, J.A. García-García, Machine learning and deep learning predictive models for type 2 diabetes: a systematic review, Diabetol. Metab. Syndrome 13 (1) (2021) 148, https://doi.org/10.1186/ s13098-021-00767-9.
- [18] M.U. Saleem, M. Aslam, A. Akgül, M. Farman, R. Bibi, Controllability of PDEs model for type 1 diabetes, Math. Methods Appl. Sci. 45 (15) (2022) 8800 -8808.
- [19] M. Farman, A. Akgül, A. Ahmad, Analysis and simulation of fractional-order diabetes model, Adv. Theory Nonlinear Anal. Appl. 4 (4) (2020) 483 -497.
- [20] B.A. Goldstein, A.M. Navar, M.J. Pencina, J.P.A. Ioannidis, Opportunities and challenges in developing risk prediction models with electronic health records data: a systematic review, J. Am. Med. Inf. Assoc. 24 (1) (2016) 198 -208, https:// doi.org/10.1093/jamia/ocw042.
- [21] N. Abdulhadi, A. Al-Mousa, Diabetes detection using machine learning classification methods, in: 2021 International Conference on Information Technology (ICIT), 14-15 July 2021, 2021, pp. 350 -354, https://doi.org/10.1109/ ICIT52682.2021.9491788.
- [22] G. Briganti, O. Le Moine, Artificial intelligence in medicine: today and tomorrow, Front. Med., Perspect. vol. 7 (2020), https://doi.org/10.3389/fmed.2020.00027 (in English).
- [23] T. Levy-Loboda, E. Sheetrit, I.F. Liberty, A. Haim, N. Nissim, Personalized insulin dose manipulation attack and its detection using interval-based temporal patterns and machine learning algorithms, J. Biomed. Inf. 132 (2022) 104129.
- [24] L. Adlung, Y. Cohen, U. Mor, E. Elinav, Machine learning in clinical decision making (in eng), M ´ ed 2 (6) (2021) 642 -665, https://doi.org/10.1016/j. medj.2021.04.006.
- [25] A. Zhang, L. Xing, J. Zou, J.C. Wu, Shifting machine learning for healthcare from development to deployment and from models to data, Nat. Biomed. Eng. 6 (12) (2022) 1330 -1345.
- [26] H. Zhang, et al., Prediction of acute kidney injury after cardiac surgery: model development using a Chinese electronic health record dataset, J. Transl. Med. 20 (1) (2022) 166.
- [27] K. Santosh, L. Gaur, Artificial Intelligence and Machine Learning in Public Healthcare: Opportunities and Societal Impact, Springer Nature, 2022.
- [28] W. Zhang, et al., Combined diabetic ketoacidosis and hyperosmolar hyperglycemic state in type 1 diabetes mellitus induced by immune checkpoint inhibitors: underrecognized and underreported emergency in ICIs-DM, Front. Endocrinol. 13 (2023) 1084441.
- [29] M. Halim, A. Halim, The effects of inflammation, aging and oxidative stress on the pathogenesis of diabetes mellitus (type 2 diabetes), Diabetes Metabol. Syndr.: Clin. Res. Rev. 13 (2) (2019) 1165 -1172.
- [30] R. van Wilpe, A.H. Hulst, S.E. Siegelaar, J.H. DeVries, B. Preckel, J. Hermanides, Type 1 and other types of diabetes mellitus in the perioperative period. What the anaesthetist should know, J. Clin. Anesth. 84 (2023) 111012.
- [31] G. Bereda, Difference between type 1 and 2 diabetes mellitus, J. Med. Res. Health Sci. 5 (12) (2022) 2375 -2379.
- [32] A. Mansoori, et al., Prediction of type 2 diabetes mellitus using hematological factors based on machine learning approaches: a cohort study analysis, Sci. Rep. 13 (1) (2023) 663.
- [33] A. Bonnefond, R.K. Semple, Achievements, prospects and challenges in precision care for monogenic insulin-deficient and insulin-resistant diabetes, Diabetologia 65 (11) (2022) 1782 -1795.
- [34] J.M. Forbes, M.E. Cooper, Mechanisms of diabetic complications, Physiol. Rev. 93 (1) (2013) 137 -188.
- [35] F. Moradi, et al., Comparing the associated factors on lifestyle between type 2 diabetic patients and healthy people: a case-control study, Commun. Health Equity Res. Policy 43 (3) (2023) 293 -299.
- [36] E. Ekpor, S. Akyirem, P. Adade Duodu, Prevalence and associated factors of overweight and obesity among persons with type 2 diabetes in Africa: a systematic review and meta-analysis, Ann. Med. 55 (1) (2023) 696 -713.
- [37] L.E. Wagenknecht, et al., Trends in incidence of youth-onset type 1 and type 2 diabetes in the USA, 2002 -18: results from the population-based SEARCH for Diabetes in Youth study, Lancet Diabetes Endocrinol. 11 (4) (2023) 242 -250, https://doi.org/10.1016/S2213-8587(23)00025-6.
- [38] Y.T. Wondmkun, Obesity, insulin resistance, and type 2 diabetes: associations and therapeutic implications, Diabetes Metab. Syndr. Obes. 13 (2020) 3611 -3616, https://doi.org/10.2147/dmso.S275898 (in eng).
- [39] S.R. Bernstein, C. Kelleher, R.A. Khalil, Gender-based research underscores sex differences in biological processes, clinical disorders and pharmacological interventions, Biochem. Pharmacol. (2023) 115737.
- [40] T. Ciarambino, P. Crispino, G. Guarisco, M. Giordano, Gender differences in insulin resistance: new knowledge and perspectives, Curr. Issues Mol. Biol. 45 (10) (2023) 7845 -7861.
- [41] J.E. Shaw, D.J. Magliano, SEARCHing for answers to youth-onset type 2 diabetes, Lancet Diabetes Endocrinol. 11 (4) (2023) 219 -220, https://doi.org/10.1016/ S2213-8587(23)00037-2.
- [42] J. Chen, et al., Assessment of factors affecting diabetes management in the City Changing Diabetes (CCD) study in Tianjin, PLoS One 14 (2) (2019) e0209222, https://doi.org/10.1371/journal.pone.0209222.
- [43] A. Collier, et al., Relationship of skin thickness to duration of diabetes, glycemic control, and diabetic complications in male IDDM patients, Diabetes Care 12 (5) (1989) 309 -312, https://doi.org/10.2337/diacare.12.5.309.
- [44] J.G.B. Derraik, et al., Effects of age, gender, BMI, and anatomical site on skin thickness in children and adults with diabetes, PLoS One 9 (1) (2014) e86637, https://doi.org/10.1371/journal.pone.0086637.
- [45] M. Zakir, et al., Cardiovascular complications of diabetes: from microvascular to macrovascular pathways, Cureus 15 (9) (2023).
- [46] T. Mahboob Alam, et al., A model for early prediction of diabetes, Inform. Med. Unlocked 16 (2019) 100204, https://doi.org/10.1016/j.imu.2019.100204.
- [47] M. Maniruzzaman, et al., Comparative approaches for classification of diabetes mellitus data: machine learning paradigm, Comput. Methods Progr. Biomed. 152 (2017) 23 -34, https://doi.org/10.1016/j.cmpb.2017.09.004.
- [48] M.W. Nadeem, H.G. Goh, V. Ponnusamy, I. Andonovic, M.A. Khan, M. Hussain, A fusion-based machine learning approach for the prediction of the onset of diabetes, Healthcare 9 (10) (2021) 1393 [Online]. Available: https://www.mdpi. com/2227-9032/9/10/1393.
- [49] A. Esteva, et al., Deep learning-enabled medical computer vision, NPJ Digit. Med. 4 (1) (2021) 5.
- [50] M. Barakat-Johnson, et al., Reshaping wound care: evaluation of an artificial intelligence app to improve wound assessment and management amid the COVID19 pandemic, Int. Wound J. 19 (6) (2022) 1561 -1577.
- [51] S. Uddin, I. Haque, H. Lu, M.A. Moni, E. Gide, Comparative performance analysis of K-nearest neighbour (KNN) algorithm and its different variants for disease prediction, Sci. Rep. 12 (1) (2022) 6256.
- [52] J. Cervantes, F. Garcia-Lamont, L. Rodríguez-Mazahua, A. Lopez, A comprehensive survey on support vector machine classification: applications, challenges and trends, Neurocomputing 408 (2020) 189 -215.
- [53] A. Darolia, R.S. Chhillar, Analyzing three predictive algorithms for diabetes mellitus against the Pima Indians dataset, ECS Trans. 107 (1) (2022) 2697, https:// doi.org/10.1149/10701.2697ecst.
- [54] M.E. Febrian, F.X. Ferdinan, G.P. Sendani, K.M. Suryanigrum, R. Yunanda, Diabetes prediction using supervised machine learning, Procedia Comput. Sci. 216 (2023) 21 -30, https://doi.org/10.1016/j.procs.2022.12.107.
- [55] A. Mousa, W. Mustafa, R.B. Marqas, S.H.M. Mohammed, A comparative study of diabetes detection using the PIMA Indian diabetes database, J. Donghua Univ. 26 (2) (2023) 277 -288, https://doi.org/10.26682/sjuod.2023.26.2.24.
- [56] O. S. Zargar, A. Baghat, and T. A. Teli, "A DNN Model for Diabetes Mellitus Prediction on PIMA Dataset," INFOCOMP J. Comput. Sci., vol. 21, no. 2, 12/19 2022. [Online]. Available: https://infocomp.dcc.ufla.br/index.php/infocomp/ article/view/2476.
- [57] K. Varma, B. Panda, Comparative analysis of Predicting Diabetes Using Machine Learning Techniques, vol. 6, 2019, pp. 522 -530.
- [58] A. Bansal, A. Singhrova, Performance Analysis of Supervised Machine Learning Algorithms for Diabetes and Breast Cancer Dataset, in: 2021 International Conference on Artificial Intelligence and Smart Systems (ICAIS), 2021, pp. 137 -143.
- [59] G. Hu, C. Yin, M. Wan, Y. Zhang, Y. Fang, Recognition of diseased Pinus trees in UAV images using deep learning and AdaBoost classifier, Biosyst. Eng. 194 (2020/ 06/01/2020) 138 -151, https://doi.org/10.1016/j.biosystemseng.2020.03.021.
- [60] M. Bergoeing, et al., Exploring the potential of an AI-integrated cloud-based mHealth platform for enhanced Type 2 diabetes mellitus management, in: International Conference on Ubiquitous Computing and Ambient Intelligence, Springer, 2023, pp. 100 -111.
- [61] M. Lutz, Programming python, O ' Reilly Media, Inc., 2001.
- [62] F. Pedregosa, et al., Scikit-learn: machine learning in Python, J. Mach. Learn. Res. 12 (2011) 2825 -2830.
- [63] P. Thisovithan, H. Aththanayake, D. Meddage, I. Ekanayake, U. Rathnayake, A novel explainable AI-based approach to estimate the natural period of vibration of masonry infill reinforced concrete frame structures using different machine learning techniques, Results Eng. 19 (2023) 101388.
- [64] S.M. Lundberg, S.-I. Lee, A unified approach to interpreting model predictions, Adv. Neural Inf. Process. Syst. 30 (2017).
- [65] D. Meddage, et al., Explainable Machine Learning (XML) to predict external wind pressure of a low-rise building in urban-like settings, J. Wind Eng. Ind. Aerod. 226 (2022) 105027.
- [66] D. Meddage, I.U. Ekanayake, A. Weerasuriya, C. Lewangamage, Tree-based regression models for predicting external wind pressure of a building with an unconventional configuration, in: 2021 Moratuwa Engineering Research Conference (MERCon), IEEE, 2021, pp. 257 -262.
- [67] D. Meddage, I. Ekanayake, S. Herath, R. Gobirahavan, N. Muttil, U. Rathnayake, Predicting bulk average velocity with rigid vegetation in open channels using treebased machine learning: a novel approach using explainable artificial intelligence, Sensors 22 (12) (2022) 4398.
- [68] I. Ekanayake, S. Palitha, S. Gamage, D. Meddage, K. Wijesooriya, D. Mohotti, Predicting adhesion strength of micropatterned surfaces using gradient boosting models and explainable artificial intelligence visualizations, Mater. Today Commun. 36 (2023) 106545.
- [69] I. Ekanayake, D. Meddage, U. Rathnayake, A novel approach to explain the blackbox nature of machine learning in compressive strength predictions of concrete

## G. Dharmarathne et al.

using Shapley additive explanations (SHAP), Case Stud. Constr. Mater. 16 (2022) e01059.

- [70] W. Kulasooriya, R. Ranasinghe, U.S. Perera, P. Thisovithan, I. Ekanayake, D. Meddage, Modeling strength characteristics of basalt fiber reinforced concrete using multiple explainable machine learning with a graphical user interface, Sci. Rep. 13 (1) (2023) 13138.
- [71] P. Meddage, I. Ekanayake, U.S. Perera, H.M. Azamathulla, M.A. Md Said, U. Rathnayake, Interpretation of machine-learning-based (black-box) wind pressure predictions for low-rise gable-roofed buildings using Shapley additive explanations (SHAP), Buildings 12 (6) (2022) 734.
- [72] J.S. Madushani, R.K. Sandamal, D. Meddage, H. Pasindu, P.A. Gomes, Evaluating expressway traffic crash severity by using logistic regression and explainable &amp; supervised machine learning classifiers, Transport Eng. 13 (2023) 100190.
- [73] S.S. Bhat, V. Selvam, G.A. Ansari, M.D. Ansari, M.H. Rahman, Prevalence and early prediction of diabetes using machine learning in North Kashmir: a case study of

District Bandipora, Comput. Intell. Neurosci. 2022 (2022) 2789760, https://doi. org/10.1155/2022/2789760.

- [74] J.J. Khanam, S.Y. Foo, A comparison of machine learning algorithms for diabetes prediction, Ict Express 7 (4) (2021) 432 -439.
- [75] V. Chang, J. Bailey, Q.A. Xu, Z. Sun, Pima Indians diabetes mellitus classification based on machine learning (ML) algorithms, Neural Comput. Appl. 35 (22) (2023) 16157 -16173, https://doi.org/10.1007/s00521-022-07049-z.
- [76] M.F. Faruque, Asaduzzaman, I.H. Sarker, Performance analysis of machine learning techniques to predict diabetes mellitus, in: 2019 International Conference on Electrical, Computer and Communication Engineering (ECCE), 7-9 Feb. 2019, 2019, pp. 1 -4, https://doi.org/10.1109/ECACE.2019.8679365.
- [77] F. Lundh, An introduction to tkinter. , 1999. http://www.pythonware.com/ library/tkinter/introduction/index.htm.
