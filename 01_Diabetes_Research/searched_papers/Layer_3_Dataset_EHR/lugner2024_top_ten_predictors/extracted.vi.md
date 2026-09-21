<!-- extracted by pdf-extract | engine=docling | pages=9 | ocr=False | tables=3/3 | density=1.03 | score=100 -->

## OPEN

## Xác định mười yếu tố dự báo hàng đầu của đái tháo đường týp ͸ thông qua phân tích học máy trên dữ liệu UK Biobank

Moa Lugner ͷ * , Araz Rawshani  ͷ , Edvin Helleryd ͷ  &amp; Björn Eliasson ͸

Nghiên cứu nhằm xác định các yếu tố có giá trị dự báo cao nhất đối với sự phát triển của đái tháo đường týp ͸. Sử dụng mô hình phân loại XGboost, chúng tôi dự báo tỷ lệ mới mắc đái tháo đường týp ͸ trong khung thời gian ͷͶ năm. Chúng tôi chủ động giảm thiểu việc lựa chọn các yếu tố ban đầu (baseline) để khai thác trọn vẹn bộ dữ liệu phong phú từ UK Biobank. Giá trị dự báo của các đặc trưng được đánh giá bằng giá trị shap, với hiệu năng mô hình được đánh giá thông qua Diện tích Dưới Đường cong Đặc trưng Hoạt động của Bộ thu (Receiver Operating Characteristic Area Under the Curve), độ nhạy và độ đặc hiệu. Dữ liệu từ UK Biobank, bao gồm một quần thể rộng lớn với dữ liệu nhân khẩu học và sức khỏe toàn diện, đã được sử dụng. Nghiên cứu tuyển vào ͺͻͶ,ͶͶͶ người tham gia trong độ tuổi ͺͶ-ͼͿ, loại trừ những người đã có sẵn đái tháo đường. Trong số ͺͺ;,͸ͽͽ người tham gia, ͷ͸,ͷͺ; người đã phát triển đái tháo đường týp ͸ trong vòng một thập kỷ. HbAͷc nổi lên là yếu tố dự báo hàng đầu, tiếp theo là BMI, vòng eo, đường huyết, tiền sử gia đình mắc đái tháo đường, gamma-glutamyl transferase, tỷ số eo-hông, HDL cholesterol, tuổi và urate. Mô hình XGboost của chúng tôi đạt Diện tích Dưới Đường cong Đặc trưng Hoạt động của Bộ thu là Ͷ.Ϳ đối với dự báo đái tháo đường týp ͸ trong ͷͶ năm, với mô hình rút gọn ͷͶ đặc trưng đạt Ͷ.;;. Các yếu tố sinh học dễ đo lường vượt trội hơn các yếu tố nguy cơ truyền thống như chế độ ăn, hoạt động thể chất và tình trạng kinh tế-xã hội trong việc dự báo đái tháo đường týp ͸. Hơn nữa, độ chính xác dự báo cao có thể được duy trì chỉ với ͷͶ yếu tố sinh học hàng đầu, với những yếu tố bổ sung chỉ mang lại cải thiện không đáng kể. Những phát hiện này nhấn mạnh tầm quan trọng của các dấu ấn sinh học trong dự báo đái tháo đường týp ͸.

## Các từ viết tắt

GGT

Gamma-glutamyl transferase

BMI

Chỉ số khối cơ thể (Body mass index)

ROC-AUC

Diện tích dưới đường cong đặc trưng hoạt động của bộ thu (Receiver operating characteristic area under the curve)

eGFR

Độ lọc cầu thận ước tính (Estimated glomerular filtration rate)

Đái tháo đường týp 2 đã nổi lên như một trong những bệnh mạn tính phổ biến nhất trên toàn thế giới, đặt ra gánh nặng kinh tế và sức khỏe đáng kể cho cả cá nhân và xã hội 1 . Tuy nhiên, ở một mức độ nào đó, bệnh có thể được phòng ngừa hoặc trì hoãn thông qua các can thiệp lối sống và dược trị liệu. Các nghiên cứu trước đây đã chứng minh hiệu quả của những biện pháp như vậy trong việc phòng ngừa hoặc trì hoãn khởi phát đái tháo đường týp 2 2-5 .

Hơn nữa, các nghiên cứu gần đây đã cho thấy gần một nửa số người trưởng thành bị ảnh hưởng bởi đái tháo đường týp 2 không được chẩn đoán cũng như không nhận thức được tình trạng của mình 1 . Bản chất không triệu chứng của các giai đoạn đầu của tiền đái tháo đường và đái tháo đường làm tăng khả năng phát triển các biến chứng vi mạch và đại mạch trước khi khởi động các can thiệp quản lý đường huyết 6 . Việc xác định những cá nhân nguy cơ cao ngay cả trước khi khởi phát tiền đái tháo đường cho phép khởi động theo dõi toàn diện trong quần thể này, qua đó đảm bảo chẩn đoán kịp thời và quản lý đường huyết.

Những tiến bộ gần đây trong học máy và "dữ liệu lớn" (big data) mang lại tiềm năng chuyển đổi trong nghiên cứu sức khỏe, cho phép có những hiểu biết sâu sắc hơn từ các bộ dữ liệu phức tạp mà trước đây khó nắm bắt. Tuy nhiên, khi nói đến việc dự báo đái tháo đường týp 2, lĩnh vực này bộc lộ một sự thiếu nhất quán rõ rệt, đặc biệt trong việc lựa chọn đặc trưng 7 . Hầu hết các nghiên cứu ưu tiên đạt được độ chính xác dự báo cao, điều này thường khiến họ loại bỏ các đặc trưng được cho là ít có tác động hơn. Đã có bằng chứng cho thấy một tỷ lệ lớn các mô hình dự báo được huấn luyện trên ít hơn 20 đặc trưng 8 . Trong một số trường hợp, các đặc trưng cụ thể được sử dụng thậm chí không được trình bày 8 . Có sự thiếu đồng thuận về việc nên đưa vào những đặc trưng nào

ͷ Institute  of  Medicine, Sahlgrenska Academy, University of Gothenburg, Gothenburg, Sweden. ͸ Department of Medicine, Sahlgrenska University Hospital, Gothenburg, Sweden. * email: Moa.lugner@gu.se

o.:ȋͬͭͮ

trong các mô hình dự báo đái tháo đường týp 2, và nghiên cứu của chúng tôi tìm cách lấp đầy khoảng trống này. Mục đích của nghiên cứu này là xác định các yếu tố có ý nghĩa nhất dự báo đái tháo đường týp 2 về sau. Một cách tiếp cận bất khả tri (agnostic) với tối thiểu định kiến và can thiệp của con người sẽ được sử dụng để đạt được mục tiêu này. Việc khai thác lượng thông tin khổng lồ được thu thập trong UK Biobank, kết hợp với các công nghệ học máy tiên tiến, mang lại cơ hội phát hiện những yếu tố chưa được nhận diện trước đây góp phần vào nguy cơ đái tháo đường. Cách tiếp cận này cũng cho phép chúng tôi làm sáng tỏ mối quan hệ giữa các yếu tố nguy cơ đã được thiết lập, và xác định những yếu tố nào có sức mạnh dự báo cao nhất đối với đái tháo đường týp 2.

## Phương pháp

## Dữ liệu

Tất cả dữ liệu được sử dụng trong nghiên cứu này đều thu được từ UK Biobank, một cơ sở dữ liệu y sinh toàn diện đã tích lũy thông tin sức khỏe phong phú từ 502,625 cá nhân cư trú tại Vương quốc Anh. Trong giai đoạn 2006 đến 2010, các đánh giá ban đầu (baseline) được tiến hành trên những người tham gia trong độ tuổi 40 đến 69 thông qua sự kết hợp của bảng hỏi màn hình cảm ứng, phỏng vấn do điều dưỡng dẫn dắt, và nhiều xét nghiệm cùng phép đo khác nhau. Thông tin về thói quen ăn uống được thu thập bằng bảng hỏi tần suất thực phẩm, đã được chứng minh là xếp hạng người tham gia một cách đáng tin cậy theo lượng tiêu thụ các nhóm thực phẩm chính 9 . Mức độ hoạt động thể chất của người tham gia được đánh giá bằng một phiên bản điều chỉnh của bảng hỏi hoạt động thể chất quốc tế (international physical activity questionnaire, IPAQ) 10 . Trong cuộc phỏng vấn bằng lời, người tham gia được hỏi về nhiều khía cạnh khác nhau của tiền sử cá nhân và y tế của họ, bao gồm các yếu tố thời kỳ đầu đời, tình trạng việc làm, các tình trạng bệnh lý, thuốc men, và các thủ thuật phẫu thuật trong quá khứ. Các phép đo thể chất được thực hiện tại đánh giá ban đầu bao gồm huyết áp, độ cứng động mạch, mật độ xương, lực nắm tay, kiểm tra thính lực, các phép đo mắt, và hô hấp ký. Ba mươi xét nghiệm máu, được lựa chọn dựa trên việc chúng là yếu tố nguy cơ đã xác lập đối với bệnh tật hoặc là các phép đo chẩn đoán, đã được thu thập, cùng với tám xét nghiệm nước tiểu.

## Kết cục

Tiêu chí kết cục chính của nghiên cứu này là tỷ lệ mới mắc đái tháo đường týp 2 trong vòng 10 năm sau đánh giá ban đầu (3650 ngày). Để xác định kết cục này, chúng tôi sử dụng danh mục "first occurrence" trong UK Biobank, vốn chứa hai trường dữ liệu cho mỗi mã được ánh xạ tới ICD-10 3 ký tự. Trường thứ nhất biểu thị ngày báo cáo đầu tiên của mã ICD, và trường thứ hai chứa nguồn nơi mã được ghi nhận lần đầu. Các nguồn bao gồm thông tin mã Read trong dữ liệu Chăm sóc ban đầu (Primary Care), mã ICD-9 và ICD-10 trong dữ liệu Bệnh nhân nội trú (Hospital inpatient), mã ICD-10 trong hồ sơ Sổ đăng ký Tử vong (Death Register), và mã tình trạng bệnh lý tự báo cáo được khai tại các lần thăm khám trung tâm đánh giá UK Biobank về sau. Trong nghiên cứu này, biến kết cục được định nghĩa là bất kỳ báo cáo nào về mã ICD E11 (đái tháo đường không phụ thuộc insulin) trong giai đoạn nghiên cứu 10 năm.

## Tiêu chí loại trừ

Những cá nhân đã mắc đái tháo đường tại thời điểm ban đầu bị loại khỏi nghiên cứu. Cụ thể, những người hoặc tự báo cáo mắc đái tháo đường tại cuộc phỏng vấn ban đầu hoặc có HbA1c đo được &gt; 48 mmol/mol hoặc có chẩn đoán đái tháo đường được ghi nhận trong hồ sơ bệnh viện hay chăm sóc ban đầu của họ, bất kể loại đái tháo đường. Tuy nhiên, phụ nữ chỉ mắc đái tháo đường trong thai kỳ không bị loại trừ. Ngoài ra, những người tham gia không có đủ 3650 ngày theo dõi do tử vong hoặc rút lại sự đồng thuận cũng bị loại khỏi nghiên cứu.

## Lựa chọn biến

Cách tiếp cận lựa chọn biến của chúng tôi vừa có chủ đích vừa dựa trên phán đoán chuyên môn. Ngay từ đầu, mục tiêu chính của chúng tôi là bảo toàn càng nhiều thông tin càng tốt nhằm tạo điều kiện cho một phân tích không thiên lệch và giàu chi tiết về người tham gia. Với mục tiêu này, chúng tôi bắt đầu bằng việc loại bỏ bất kỳ biến nào được thu thập sau đánh giá ban đầu, vì chúng tôi cam kết chỉ sử dụng dữ liệu ban đầu cho mô hình dự báo. Tiếp đó, chúng tôi đánh giá tỉ mỉ dữ liệu ban đầu để đảm bảo tính liên quan và chính xác của nó. Đánh giá này là một quy trình thủ công, trong đó mỗi biến được đánh giá về đóng góp của nó vào sự hiểu biết toàn diện về sức khỏe, lối sống và tình trạng kinh tế-xã hội của người tham gia. Chỉ những biến được cho là không liên quan đến các lĩnh vực then chốt này, hoặc không cung cấp thêm hiểu biết, mới được gạt sang một bên. Ví dụ, các thuộc tính dữ liệu như số sê-ri của thiết bị đo, thời lượng của các xét nghiệm, hoặc lý do bỏ qua một số xét nghiệm đã bị bỏ qua vì chúng không truyền tải thông tin có ý nghĩa về người tham gia. Trong các tình huống có biến trùng lặp, như hai phép đo huyết áp riêng biệt của một người tham gia, chúng tôi lấy trung bình các giá trị và biểu diễn chúng bằng một biến duy nhất. Sau đó, chúng tôi xác định được 111 biến có hơn 70% quan sát bị thiếu và những biến này đã bị loại khỏi bộ dữ liệu. Để nâng cao giá trị thông tin của bộ dữ liệu, một số biến vốn thiếu trong UK Biobank đã được tạo ra bằng cách sử dụng dữ liệu sẵn có. Điều này bao gồm việc tạo ra các biến như độ lọc cầu thận ước tính (eGFR), tổng lượng rượu tiêu thụ hằng tuần, áp lực mạch và áp lực động mạch trung bình. Ngoài ra, thông tin về người thân thế hệ thứ nhất mắc đái tháo đường týp 2 được kết hợp thành một điểm số dao động từ 0 đến 2 tùy thuộc vào số lượng người thân mắc đái tháo đường (2 biểu thị hai hoặc nhiều người thân mắc đái tháo đường). Sau quy trình lựa chọn và tinh chỉnh tỉ mỉ này, bộ dữ liệu của chúng tôi gồm 419 biến được cho là phù hợp nhất để phát triển mô hình, và một danh sách toàn diện của các biến này có thể được tìm thấy trong một tài liệu riêng, cùng với công thức để tạo các biến mới (Phần bổ sung).

## Phát triển mô hình

Mô hình phân loại được sử dụng trong nghiên cứu này áp dụng thuật toán cây tăng cường gradient cực hạn (extreme gradient boosting, XGBoost), một kỹ thuật học tập tổ hợp (ensemble learning) được sử dụng rộng rãi 11 . XGBoost được biết đến với độ chính xác dự báo cao và hiệu quả tính toán, khiến nó trở thành lựa chọn phổ biến cho các nhiệm vụ phân loại và hồi quy 12,13 . Bước đầu tiên trong phân tích là chia dữ liệu thành hai tập, một tập dữ liệu huấn luyện, và một tập dữ liệu kiểm định. Tập huấn luyện chứa 80% tổng số quan sát, trong khi 20% còn lại được phân bổ cho tập kiểm định. Để đảm bảo tỷ lệ cá nhân có kết cục quan tâm được cân bằng ở cả hai tập, việc chia tách được phân tầng dựa trên biến kết cục. Sau khi hoàn tất việc chia tách, tập dữ liệu huấn luyện trải qua thêm tiền xử lý. Tất cả các đặc trưng phân loại được chuyển đổi thành các biến số bằng mã hóa one-hot (one-hot encoding). Các biến có phương sai rất thấp được xác định và loại bỏ để nâng cao tính ổn định của mô hình. Đáng chú ý, để giải quyết tình trạng mất cân bằng lớp trong dữ liệu huấn luyện, lớp đa số đã được lấy mẫu giảm (downsampled) để đạt tỷ lệ 1:3. Việc lấy mẫu giảm này chỉ được áp dụng cho tập huấn luyện.

Mặc dù một số bước tiền xử lý như mã hóa one-hot và lọc phương sai được học từ dữ liệu huấn luyện, các phép biến đổi của chúng được áp dụng nhất quán cho cả tập huấn luyện và tập kiểm định. Tuy nhiên, bước lấy mẫu giảm chỉ được áp dụng riêng cho dữ liệu huấn luyện và không ảnh hưởng đến tập dữ liệu kiểm định.

## Tinh chỉnh siêu tham số

Lấy mẫu siêu khối Latinh (Latin hypercube sampling) là một phương pháp tạo ra các tập giá trị tham số được phân bố đều khắp không gian tham số. Phương pháp này có thể được sử dụng để tinh chỉnh siêu tham số trong học máy nhằm tìm kiếm hiệu quả tổ hợp siêu tham số tối ưu 14 . Thuật toán tìm kiếm lưới (grid search) liên quan đến việc xác định một lưới các siêu tham số cần thử nghiệm, trong khi phương pháp lấy mẫu siêu khối Latinh chọn ngẫu nhiên các giá trị cho siêu tham số trong các giới hạn đã xác định. Kỹ thuật xác thực chéo năm lần (five-fold cross-validation) liên quan đến việc chia dữ liệu thành năm tập con, huấn luyện mô hình trên bốn tập con, và kiểm tra trên tập con thứ năm, rồi lặp lại quá trình này năm lần. Hiệu năng trung bình qua tất cả các lần lặp được dùng làm thước đo đánh giá. Các siêu tham số được tinh chỉnh bao gồm số biến được lấy mẫu ngẫu nhiên làm ứng viên tại mỗi điểm chia (mtry), số cây (trees), kích thước nút tối thiểu (min\_n), độ sâu của cây (tree depth), mức giảm tổn thất tối thiểu cần có để thực hiện một phân chia tiếp theo trên một nút lá (loss reduction), và tỷ lệ mẫu được dùng để huấn luyện mỗi cây (sample size). Mục tiêu là tìm tổ hợp siêu tham số mang lại diện tích dưới đường cong đặc trưng hoạt động của bộ thu (ROC-AUC) cao nhất.

## Đánh giá mô hình

Mặc dù thước đo hiệu năng chính là ROC-AUC, do độ tin cậy của nó trên các bộ dữ liệu mất cân bằng 13,14 , chúng tôi cũng cung cấp một bộ thước đo toàn diện khác nhằm minh bạch. Những thước đo này bao gồm độ chính xác (accuracy), độ nhạy (sensitivity), độ đặc hiệu (specificity), độ chuẩn xác (precision), thước đo F1 (F1-measure), PR-AUC, và ma trận nhầm lẫn (confusion matrices). Khoảng tin cậy 95% được tính cho tất cả các thước đo hiệu năng bằng cách bootstrap với 1000 lần lặp lại nhằm định lượng độ bất định của việc đánh giá mô hình. Tất cả các đánh giá được tiến hành trên tập dữ liệu kiểm định, vốn được loại khỏi việc huấn luyện mô hình.

## Giá trị Shapley ȋkhả năng diễn giải mô hình và tầm quan trọng của đặc trưngȌ

Giải thích Cộng tính Shapley (SHapley Additive explanation, Shap) là một kỹ thuật được sử dụng để giải thích các dự báo do mô hình học máy đưa ra 15,16 . Nó bắt nguồn từ lý thuyết trò chơi hợp tác và dựa trên khái niệm giá trị Shapley. Giá trị Shap của một đặc trưng là đóng góp biên trung bình của đặc trưng đó vào dự báo của mô hình, sau khi tính đến tất cả các tổ hợp đặc trưng có thể có. Để tính giá trị Shap, tác động của một đặc trưng lên dự báo của mô hình được so sánh khi có và khi không có đặc trưng đó. Điều này cung cấp một thước đo về tầm quan trọng của đặc trưng, có xét đến các tương tác của nó với các đặc trưng khác. Kỹ thuật Shap có thể được sử dụng cho cả khả năng diễn giải cục bộ, để hiểu các dự báo riêng lẻ, và khả năng diễn giải toàn cục, để xác định các động lực của dự báo trên toàn bộ bộ dữ liệu. Trong nghiên cứu này, chỉ các công cụ diễn giải toàn cục được sử dụng.

## Mô hình với các đặc trưng được lựa chọn

Mô hình chính chứa 419 đặc trưng, và 10 đặc trưng hàng đầu có giá trị dự báo cao nhất được xác định bằng giá trị Shap. Một mô hình XGBoost rút gọn được phát triển bằng cách sử dụng cùng phép chia huấn luyện/kiểm định, tiền xử lý đặc trưng, và tinh chỉnh siêu tham số như mô hình chính. Hiệu năng của cả mô hình chính và mô hình rút gọn được so sánh dựa trên khả năng dự báo của chúng bằng nhiều thước đo khác nhau như ROC-AUC, độ chính xác, độ nhạy và độ đặc hiệu.

## Các mô hình theo giới tính

Để so sánh các yếu tố dự báo quan trọng của đái tháo đường ở phụ nữ và nam giới một cách riêng biệt, hai mô hình bổ sung được xây dựng bằng cách chia tổng quần thể theo giới tính. Sau đó, các biểu đồ tóm tắt Shap được dùng để mô tả 10 yếu tố dự báo quan trọng nhất cho mỗi giới. Việc phát triển những mô hình này tuân theo cùng quy trình như mô hình chính, ngoại trừ việc bổ sung các yếu tố đặc thù theo giới tính vốn không được đưa vào mô hình chính. Đối với nhóm nữ, 30 yếu tố liên quan đến kinh nguyệt, thai nghén, sinh đẻ, mãn kinh, và việc sử dụng liệu pháp thay thế hormone đã được đưa vào. Đối với nhóm nam, các đặc trưng được bổ sung bao gồm tuổi tương đối khi có râu mặt đầu tiên, tuổi tương đối khi vỡ giọng, kiểu tóc/hói, và số con đã sinh.

Tất cả việc chuẩn bị dữ liệu và xây dựng mô hình được thực hiện bằng R với RStudio Workbench phiên bản 1.4.1717-3. Khung Tidymodels được sử dụng để xây dựng các mô hình 17 .

## Chấp thuận đạo đức

Nghiên cứu hiện tại tuân thủ các chuẩn mực đạo đức của Cơ quan Thẩm định Đạo đức Thụy Điển (Swedish Ethical Review Authority), cơ quan đã phê duyệt phương pháp luận nghiên cứu, xác nhận sự tuân thủ các nguyên tắc và hướng dẫn đạo đức liên quan. Tất cả các thủ tục liên quan đến người tham gia là con người được thực hiện theo Tuyên ngôn Helsinki (Declaration of Helsinki) và các hướng dẫn/quy định liên quan. UK Biobank đã thu được sự đồng thuận có hiểu biết bằng văn bản từ tất cả người tham gia trước khi đưa họ vào nghiên cứu, đảm bảo rằng tất cả các phương pháp được tiến hành phù hợp với các chuẩn mực đạo đức nói trên.

## Kết quả

Nghiên cứu đã tuyển vào tổng cộng 448,277 người tham gia, trong đó 43.9% là nam giới. Thời gian theo dõi trung vị là 4440 ngày, tức khoảng 12.16 năm, với khoảng tứ phân vị là 502 ngày. Trong giai đoạn này, 12,148 cá nhân đã phát triển đái tháo đường týp 2. Những cá nhân phát triển đái tháo đường được phát hiện có, trung bình, tuổi tuyển chọn cao hơn 2.5 năm, chỉ số khối cơ thể (BMI) cao hơn ở mức 31.5 kg/m 2 so với 27.0 kg/ m 2 , và phần trăm mỡ cơ thể cao hơn ở mức 34.9% so với 31.2%. Về các yếu tố lối sống, nhóm cá nhân phát triển đái tháo đường thể hiện tần suất hút thuốc và tiêu thụ thực phẩm chế biến sẵn cao hơn, trong khi lượng rượu tiêu thụ hằng tuần của họ tương tự với nhóm không phát triển đái tháo đường. Ngoài ra, một tỷ lệ cao hơn các cá nhân trong nhóm đái tháo đường có nền tảng sắc tộc không phải da trắng. Huyết áp tâm thu trung bình được phát hiện tăng đáng kể ở nhóm đái tháo đường, với giá trị ghi nhận là 144 mmHg, so với 137.3 mmHg ở nhóm không có đái tháo đường (Bảng 1).

HbA1c thể hiện sức mạnh dự báo mạnh nhất đối với đái tháo đường týp 2, tiếp theo là BMI, vòng eo, mức đường huyết, số lượng người thân thế hệ thứ nhất mắc đái tháo đường, GGT, tỷ số eo-hông, HDL cholesterol, tuổi, và mức urate. Giá trị biến thô tăng cao có liên quan tích cực đến nguy cơ đái tháo đường gia tăng trên tất cả các biến ngoại trừ HDL cholesterol, nơi giá trị cao tương ứng với nguy cơ đái tháo đường giảm (Hình 1).

Các biểu đồ phụ thuộc cung cấp hiểu biết sâu hơn về mối liên hệ giữa một biến nhất định và nguy cơ phát triển đái tháo đường. Trong trường hợp HbA1c, biểu đồ cho thấy những cá nhân có mức HbA1c &lt; 38 mmol/ mol ít có khả năng phát triển đái tháo đường hơn so với những người có mức HbA1c &gt; 38 mmol/mol (như được biểu thị bởi điểm trên trục x tại y = 0). Hơn nữa, nguy cơ phát triển đái tháo đường týp 2 tăng gần như tuyến tính sau khi giá trị HbA1c vượt 30 mmol/mol. Trong trường hợp BMI, ngưỡng này xấp xỉ 28 kg/m 2 . Nguy cơ dường như thấp và tương tự nhau đối với các giá trị giữa 18 và 25; tuy nhiên, nó bắt đầu tăng mạnh tại 25 kg/m 2 . Đường cong đạt đến mức bình nguyên ở khoảng 40 kg/m 2 , vượt qua đó tất cả các giá trị dường như mang lại nguy cơ gần như giống nhau. Việc không có bất kỳ người thân thế hệ thứ nhất nào mắc đái tháo đường liên quan đến giá trị Shap âm, trong khi có hai hoặc nhiều người thân thế hệ thứ nhất mắc đái tháo đường liên quan đến nguy cơ phát triển đái tháo đường cao nhất. Tuổi dường như có mối quan hệ tuyến tính với nguy cơ đái tháo đường, với nguy cơ tăng tỷ lệ thuận với số năm. Trong trường hợp urate huyết thanh, ngưỡng dường như nằm tại 300 µMol/L, với các giá trị trên mức này liên quan đến nguy cơ đái tháo đường cao hơn. (Hình 2).

Dựa trên phân tích, năm yếu tố dự báo hàng đầu đối với nam giới được phát hiện là HbA1c, glucose huyết tương, BMI, tiền sử gia đình mắc đái tháo đường, và GGT. Đối với nữ giới, các yếu tố dự báo có ý nghĩa nhất là HbA1c, vòng eo, glucose huyết tương, tiền sử gia đình mắc đái tháo đường, và urate huyết thanh (Phần bổ sung).

## So sánh mô hình

Các siêu tham số được lựa chọn cho mô hình chính dựa trên ROC-AUC và bao gồm mtry = 273, trees = 1306, min\_n = 32, tree depth = 11, loss reduction = 0.0006507575, và sample size = 0.6880322. Mô hình rút gọn sử dụng các siêu tham số cuối cùng là mtry = 2, trees = 1931, min\_n = 39, tree depth = 8, loss reduction = 10.91671, và sample size = 0.5617388. Khi áp dụng mô hình chính để dự báo kết cục trên tập kiểm định, nó có thể phát hiện 1554 cá nhân mắc đái tháo đường, nhưng bỏ sót 941 cá nhân. So với đó, mô hình rút gọn phát hiện 1419 cá nhân mắc đái tháo đường, nhưng bỏ sót 1076. Mô hình chính xác định chính xác 81,259 cá nhân không phát triển đái tháo đường, trong khi mô hình rút gọn xác định 81,185 cá nhân (Bảng 2).

ROC-AUC cho mô hình chính trên tập kiểm định là 0.90 và ROC-AUC cho mô hình rút gọn là 0.88. Độ chính xác của cả hai mô hình là 0.92. Độ nhạy và độ đặc hiệu của mô hình chính lần lượt là 0.62 và 0.93, trong khi mô hình rút gọn có độ nhạy 0.57 và độ đặc hiệu 0.93 (Bảng 3).

Bảng 1. Đặc điểm ban đầu của quần thể nghiên cứu được phân tầng theo tỷ lệ mới mắc đái tháo đường trong giai đoạn nghiên cứu. Đối với các biến liên tục, giá trị trung bình và độ lệch chuẩn được báo cáo. Đối với các biến phân loại, phần trăm được báo cáo. Lượng rượu tiêu thụ được trình bày theo số đơn vị chuẩn tiêu thụ mỗi tuần, với một đơn vị được định nghĩa là 10 ml hoặc 8 g rượu nguyên chất theo hướng dẫn của NHS.

|                                          | Overall      | No diabetes   | Diabetes     |
|------------------------------------------|--------------|---------------|--------------|
| n                                        | 448,277      | 436,129       | 12,148       |
| Male (%)                                 | 43.9         | 43.6          | 55.5         |
| Age (mean (SD))                          | 56.1 (8.1)   | 56.0 (8.1)    | 58.6 (7.5)   |
| BMI (mean (SD))                          | 27.2 (4.6)   | 27.0 (4.5)    | 31.5 (5.5)   |
| Body fat percentage (mean (SD))          | 31.3 (8.5)   | 31.2 (8.5)    | 34.9 (8.4)   |
| Currently smoking (%)                    | 33.8         | 33.7          | 38.7         |
| Weekly alcohol intake (n. of units/week) | 14.8 (18.8)  | 14.8 (18.7)   | 14.3 (21.8)  |
| Systolic blood pressure (mean (SD))      | 137.4 (18.6) | 137.3 (18.6)  | 143.9 (18.5) |
| Diastolic blood pressure (mean (SD))     | 82.3 (10.1)  | 82.2 (10.1)   | 85.3 (10.4)  |
| HbA1c (mean (SD))                        | 35.0 (3.7)   | 34.8 (3.6)    | 40.1 (4.2)   |
| LDL (mean (SD))                          | 3.6 (0.9)    | 3.6 (0.8)     | 3.5 (0.9)    |
| HDL (mean (SD))                          | 1.5 (0.4)    | 1.5 (0.4)     | 1.2 (0.3)    |
| Triglycerides (mean (SD))                | 1.7 (1.0)    | 1.7 (1.0)     | 2.4 (1.3)    |
| Lipid lowering treatment (%)             | 16.3         | 15.8          | 34.1         |

Hình 1. Biểu đồ tóm tắt Shap mô tả các giá trị Shap tuyệt đối trung bình được xếp hạng cho mỗi biến trong bộ dữ liệu trên trục y. Mỗi cá nhân trong nghiên cứu được biểu diễn bằng một chấm trên biểu đồ dựa trên giá trị Shap tương ứng của họ. Các điểm được xếp chồng theo chiều dọc ở nơi có mật độ giá trị shap cao. Màu của mỗi chấm tương ứng với giá trị biến thô của cá nhân và đặc trưng đó, với màu tím biểu thị giá trị thô cao và màu vàng biểu thị giá trị thô thấp.

Hình 2. ( a -j ) Các biểu đồ phụ thuộc Shap được trình bày dưới dạng biểu đồ phân tán, với mỗi người tham gia được biểu diễn bằng một điểm dữ liệu. Các biểu đồ phân tán này mô tả giá trị Shap được vẽ theo giá trị thô cơ sở cho các biến đang xem xét. Các giá trị Shap vượt quá đường y = 0 biểu thị nguy cơ phát triển đái tháo đường cao hơn, trong khi những giá trị nằm dưới đường này liên quan đến nguy cơ thấp hơn. Do các tương tác với các biến khác, cùng một giá trị biến thô có thể tạo ra các giá trị Shap khác nhau. Để minh họa, biểu đồ tuổi hiển thị một dải rộng các giá trị Shap cho cùng số năm, qua đó cho thấy tác động của các biến khác.

Bảng 2. Mô hình chính: mô hình XGBoost với tất cả các đặc trưng sẵn có được đưa vào. Mô hình rút gọn: mô hình XGBoost chỉ với 10 đặc trưng có ảnh hưởng nhất dựa trên giá trị Shap. Các ma trận này tóm tắt hiệu năng của mỗi mô hình trong việc phân loại các trường hợp là dương tính (1) hoặc âm tính (0).

| Confusion matrix for main model   |   Confusion matrix for main model | Confusion matrix for main model   | Confusion matrix for main model   | Confusion matrix for reduced model   |   Confusion matrix for reduced model | Confusion matrix for reduced model   | Confusion matrix for reduced model   |
|-----------------------------------|-----------------------------------|-----------------------------------|-----------------------------------|--------------------------------------|--------------------------------------|--------------------------------------|--------------------------------------|
|                                   |                                   | Truth                             | Truth                             |                                      |                                      | Truth                                | Truth                                |
|                                   |                                   | 1                                 | 0                                 |                                      |                                      | 1                                    | 0                                    |
| Prediction                        |                                 1 | 1554                              | 5902                              | Prediction                           |                                    1 | 1419                                 | 5976                                 |
| Prediction                        |                                 0 | 941                               | 81,259                            | Prediction                           |                                    0 | 1076                                 | 81,185                               |

Bảng 3. ROC-AUC: Vẽ tỷ lệ dương tính thật theo tỷ lệ dương tính giả. AUC biểu thị diện tích dưới đường cong này. Độ chính xác (Accuracy): (TP + TN)/(TP + TN + FP + FN). Độ nhạy (hay Recall): TP/(TP + FN). Độ đặc hiệu (Specificity): TN/ (TN + FP). Thước đo F1 (F1-measure): Trung bình điều hòa của độ chuẩn xác và độ nhạy. Độ chuẩn xác (Precision): TP/(TP + FP). PR-AUC: Diện tích dưới đường cong precision-recall, vẽ độ chuẩn xác theo recall. TP = Dương tính thật (True Positive); TN = Âm tính thật (True Negative); FP = Dương tính giả (False Positive); FN = Âm tính giả (False Negative).

| Model performance   | Model performance          | Model performance          |
|---------------------|----------------------------|----------------------------|
| Metric              | Main model                 | Reduced model              |
| ROC-AUC             | 0.903 (95% CI 0.900-0.909) | 0.881 (95% CI 0.875-0.888) |
| Accuracy            | 0.924 (95% CI 0.922-0.925) | 0.921 (95% CI 0.920-0.923) |
| Sensitivity         | 0.623 (95% CI 0.603-0.641) | 0.569 (95% CI 0.549-0.587) |
| Specificity         | 0.932 (95% CI 0.930-0.934) | 0.931 (95% CI 0.930-0.933) |
| F1-measure          | 0.311 (95% CI 0.300-0.323) | 0.287 (95% CI 0.275-0.300) |
| Precision           | 0.207 (95% CI 0.198-0.217) | 0.192 (95% CI 0.183-0.201) |
| PR-AUC              | 0.291 (95% CI 0.275-0.309) | 0.255(95% CI 0.239-0.272)  |

## Bàn luận

Trong nghiên cứu này, phân tích của chúng tôi cho thấy mức HbA1c đo tại thời điểm ban đầu là yếu tố có ảnh hưởng nhất trong việc dự báo nguy cơ phát triển đái tháo đường týp 2 trong khung thời gian 10 năm. BMI, vòng eo, glucose huyết tương, tiền sử gia đình mắc đái tháo đường, GGT, tỷ số eo-hông, HDL cholesterol, tuổi, và mức urate huyết thanh cũng thể hiện sức mạnh dự báo đáng kể. Bằng cách sử dụng 10 biến sẵn có và tiết kiệm chi phí này, chúng tôi đã có thể dự báo nguy cơ đái tháo đường với độ chính xác cao.

Các kỹ thuật học máy trước đây đã được chứng minh là dự báo chính xác nguy cơ đái tháo đường tương lai và các bệnh mạn tính khác. Mục tiêu của nghiên cứu của chúng tôi không phải là thiết lập tính khả thi của những dự báo như vậy mà là xác định các yếu tố quan trọng nhất ảnh hưởng đến nguy cơ phát triển đái tháo đường. UK Biobank mang lại lợi thế về thông tin ban đầu chi tiết về người tham gia, bao gồm thói quen lối sống, thành phần cơ thể, và nền tảng kinh tế-xã hội. Kết quả của chúng tôi cho thấy các yếu tố sinh học là những yếu tố dự báo có ý nghĩa nhất đối với nguy cơ đái tháo đường, trong khi thông tin về thói quen lối sống, sở thích thực phẩm, tình trạng kinh tế-xã hội, và hoạt động thể chất chỉ có tác động nhỏ đến độ chính xác dự báo trong nhóm thuần tập UK Biobank.

Hội chứng chuyển hóa thường được định nghĩa là một tình trạng bệnh lý đặc trưng bởi béo bụng, kháng insulin, tăng huyết áp, và tăng lipid máu 18 . Nói cách khác, đó là sự hiện diện của nhiều yếu tố nguy cơ chuyển hóa đối với bệnh tim mạch và đái tháo đường 18 . Một số yếu tố dự báo mạnh nhất trong nghiên cứu của chúng tôi đã được liên kết với tình trạng này. Vai trò then chốt của HbA1c và glucose huyết tương trong các mô hình dự báo đái tháo đường bắt nguồn từ khả năng của chúng đóng vai trò là các dấu ấn đáng tin cậy của rối loạn chuyển hóa glucose, qua đó làm tăng nguy cơ phát triển đái tháo đường. Rối loạn glucose lúc đói (impaired fasting glucose, IFG) chỉ mức glucose huyết thanh thấp hơn tiêu chí chẩn đoán đái tháo đường (7 mmol/L) nhưng cao hơn các giá trị bình thường, và những cá nhân có các giá trị trung gian như vậy đã được chứng minh là thể hiện nguy cơ phát triển đái tháo đường týp 2 cao hơn (20). Trong nghiên cứu của chúng tôi, ngưỡng cắt cho glucose huyết tương vừa trên 5 mmol/l, nơi các giá trị cao hơn liên quan đến nguy cơ đái tháo đường týp 2 về sau cao hơn. Ngưỡng cắt cho HbA1c được xác định tại 38 mmol/mol trong nghiên cứu của chúng tôi. Nghiên cứu trước đây đã cho thấy những cá nhân có mức HbA1c giữa 39 và 46 mmol/mol có nguy cơ cao phát triển đái tháo đường týp 2, như được nêu bởi Hiệp hội Đái tháo đường Hoa Kỳ (American Diabetes Association) (20). Các phát hiện của chúng tôi về cả mức glucose và HbA1c đều nhất quán với nghiên cứu trước, dù cho thấy rằng ngưỡng để gia tăng nguy cơ có thể thấp hơn một chút.

GGT là một enzyme thường được sử dụng trong môi trường lâm sàng như một dấu ấn của chức năng gan và tiêu thụ rượu. Tuy nhiên, bằng chứng mới nổi gợi ý một mối liên hệ đáp ứng liều có ý nghĩa và tích cực giữa mức GGT và tỷ lệ mới mắc đái tháo đường týp 2 19 . Urate được biết là có liên quan đến cả hội chứng chuyển hóa và đái tháo đường. Mức urate tăng cao đã được chứng minh là đi trước khởi phát của cả hai tình trạng, cho thấy urate có thể liên kết chặt chẽ với sự phát triển đái tháo đường 20 . Ngoài ra, các nghiên cứu đã chứng minh rằng kháng insulin có thể được cải thiện bằng cách hạ mức axit uric trong điều kiện in vitro, càng củng cố vai trò tiềm tàng của urate trong sự phát triển đái tháo đường 21 .

Ba trong số mười yếu tố dự báo có ảnh hưởng nhất trong nghiên cứu của chúng tôi là các phép đo nhân trắc học, cụ thể là chỉ số khối cơ thể (BMI), vòng eo, và tỷ số eo-hông. Mặc dù BMI thường được sử dụng, nó cung cấp

thông tin về béo phì toàn thân, trong khi vòng eo và tỷ số eo-hông phản ánh rõ hơn béo phì trung tâm, vốn có mối liên hệ thậm chí mạnh hơn với các thay đổi chuyển hóa bất lợi trong cơ thể. Tuy nhiên, nghiên cứu so sánh sức mạnh dự báo của BMI và các phép đo vòng eo đối với đái tháo đường đã cho ra các kết quả mâu thuẫn 22,23 . Tuy vậy, dường như việc sử dụng kết hợp các phép đo này là một yếu tố dự báo vững chắc và được ưa chuộng hơn so với việc sử dụng chúng riêng lẻ 24 .

Mặc dù đái tháo đường týp 2 có nền tảng di truyền mạnh, nghiên cứu này chủ yếu tập trung vào các đặc điểm kiểu hình. Trong khi nhiều locus di truyền đã được liên kết với nguy cơ cao hơn của đái tháo đường týp 2, khả năng của chúng trong việc dự báo chính xác khởi phát của bệnh đã được chứng minh là, tốt nhất, ở mức khiêm tốn 25,26 . Khi được tích hợp vào các mô hình vốn đã bao gồm các yếu tố nguy cơ đã xác lập và tiền sử gia đình mắc đái tháo đường, sự cải thiện về độ chuẩn xác là tối thiểu hoặc không tồn tại 27 . Trong nghiên cứu của chúng tôi, chúng tôi phát hiện rằng tiền sử gia đình mắc đái tháo đường là một yếu tố dự báo đáng chú ý của đái tháo đường. Nghiên cứu trước đây đã chỉ ra rằng việc biết được người thân thế hệ thứ nhất mắc đái tháo đường là một yếu tố dự báo vững chắc hơn so với các biến thể di truyền đã xác lập đối với đái tháo đường týp 2 27 . Điều này gợi ý rằng tiền sử gia đình nắm bắt không chỉ toàn bộ thông tin di truyền có thể di truyền được, bao gồm các gen nguy cơ chưa được xác định, mà còn cả các yếu tố không di truyền như hành vi và thói quen. Hiện tại, hiểu biết của chúng tôi về tính di truyền của đái tháo đường týp 2 không ủng hộ việc đưa các yếu tố nguy cơ di truyền vào các mô hình dự báo. Tuy nhiên, điều này có thể thay đổi trong tương lai khi hiểu biết của chúng tôi về di truyền học phức tạp nền tảng của bệnh được mở rộng.

Các khác biệt theo giới tính trong các yếu tố dự báo quan trọng của đái tháo đường đã được quan sát trong nghiên cứu của chúng tôi. Đối với nam giới, hai dấu ấn liên quan đến chức năng thận (microalbumin trong nước tiểu và cystatin C) nằm trong số 10 yếu tố dự báo hàng đầu. Điều thú vị là, các phát hiện của chúng tôi cho thấy urate là một trong những yếu tố dự báo có ý nghĩa nhất của đái tháo đường týp 2, vượt qua các yếu tố đã được xác lập rõ như mức độ hoạt động và thói quen ăn uống. Đáng chú ý, sức mạnh dự báo của urate mạnh hơn ở phụ nữ so với nam giới. Quan sát này nhất quán với các nghiên cứu trước đây, bao gồm một nghiên cứu ở Trung Quốc phát hiện rằng mức urate cao liên quan đến nguy cơ đái tháo đường tăng chỉ ở phụ nữ, chứ không ở nam giới 28 .

Dữ liệu mất cân bằng là một trở ngại thường gặp khi phát triển các mô hình phân loại cho các tình trạng như đái tháo đường týp 2. Do phần lớn người tham gia sẽ không phát triển bệnh, dữ liệu nghiêng mạnh về lớp lớn hơn (không đái tháo đường), tạo ra một lớp thiểu số nhỏ bé (đái tháo đường). Sự bất tương xứng này thường gây thiên lệch cho việc phát triển mô hình, với nhiều thuật toán ưu tiên việc xác định chính xác lớp đa số. Để giải quyết điều này, nghiên cứu của chúng tôi đã sử dụng lấy mẫu giảm lớp đa số trong quá trình huấn luyện mô hình.

Mặc dù có những biện pháp này, khi xem xét các thước đo đánh giá nhạy cảm với mất cân bằng dữ liệu, rõ ràng là mô hình của chúng tôi không nhất quán đạt mục tiêu. Nghiên cứu chỉ ra rằng các bộ dữ liệu gọn gàng, sạch sẽ với số lượng mẫu và đặc trưng hạn chế có xu hướng tạo ra các dự báo chính xác hơn 7 . Tuy nhiên, phù hợp với mục tiêu chính của chúng tôi, chúng tôi chọn giữ lại càng nhiều dữ liệu càng tốt, thừa nhận rằng điều này có thể làm tổn hại hiệu năng dự báo. Điều then chốt cần nhấn mạnh là chủ đích của mô hình này không phải là để dự báo mà chỉ nhằm xác định và xếp hạng ưu tiên tầm quan trọng của đặc trưng.

Một hạn chế khác của nghiên cứu bao gồm hiệu ứng "tình nguyện viên khỏe mạnh" (healthy volunteer), nơi những người tham gia trong UK Biobank có xu hướng khỏe mạnh hơn dân số chung 29 . Ngoài ra, vì nhóm thuần tập chủ yếu gồm những cá nhân trung niên, đa phần da trắng cư trú ở Vương quốc Anh, khả năng khái quát hóa của các kết quả có thể bị giới hạn ở các quần thể tương tự. Một ràng buộc nữa là sự thiếu vắng C-peptide và kháng thể trong bộ dữ liệu UK Biobank. Do đó, một số cá nhân có thể bị phân loại sai là đã phát triển đái tháo đường týp 2 trong khi họ đã phát triển đái tháo đường týp 1 hoặc LADA (đái tháo đường tự miễn tiềm ẩn ở người lớn, Latent autoimmune diabetes in adults). Hơn nữa, C-peptide có thể đóng vai trò là một yếu tố dự báo quan trọng vì nó là một phép đo sản xuất insulin.

Mô hình dự báo của chúng tôi bao gồm các cá nhân tiền đái tháo đường, điều này phù hợp với ứng dụng dự kiến của nó trên một quần thể không mắc đái tháo đường rộng. Mặc dù việc đưa vào này có thể nâng một số thước đo nhất định, chẳng hạn ROC-AUC, nó cũng đảm bảo tính hữu ích lâm sàng của mô hình trong việc xác định những người có nguy cơ cao nhất, những người có thể hưởng lợi đáng kể từ các chiến lược can thiệp sớm. Một phân tích độ nhạy, được cung cấp trong tài liệu bổ sung, chứng minh hiệu năng mô hình nhất quán ngay cả khi loại trừ những người tiền đái tháo đường, củng cố tính ổn định của mô hình. Chúng tôi thừa nhận tác động tiềm tàng đến ý nghĩa của các yếu tố dự báo như một hạn chế và đề xuất các hướng nghiên cứu sâu hơn để nâng cao độ chuẩn xác của mô hình.

Nghiên cứu này có một thế mạnh đáng kể ở bộ dữ liệu rộng lớn và phần lớn không được tuyển chọn, cho phép một phân tích không thiên lệch. Theo hiểu biết của chúng tôi, đây là nghiên cứu toàn diện nhất về các yếu tố kiểu hình để dự báo đái tháo đường tương lai. Ngoài ra, nghiên cứu sử dụng các thuật toán học máy tiên tiến nhất như XGboost và Giá trị Shap, điều này tăng thêm tính vững chắc và độ chính xác của các kết quả.

## Kết luận

Các kết quả của nghiên cứu này gợi ý rằng các yếu tố sinh học dễ đo lường là những yếu tố dự báo có ý nghĩa nhất của đái tháo đường týp 2, vượt trội hơn các yếu tố nguy cơ đã biết như các yếu tố chế độ ăn, mức độ hoạt động thể chất, và tình trạng kinh tế-xã hội. Nghiên cứu cũng chứng minh rằng có thể đạt được độ chính xác cao trong việc dự báo đái tháo đường týp 2 chỉ với 10 đặc trưng quan trọng nhất, trong khi việc bổ sung nhiều yếu tố khác chỉ cải thiện độ chuẩn xác một cách không đáng kể.

## Tính sẵn có của dữ liệu

Các bộ dữ liệu được sử dụng và phân tích trong nghiên cứu này bắt nguồn từ UK Biobank theo mã dự án ID 70236. Vì các bộ dữ liệu là tài sản của UK Biobank, chúng không sẵn có để yêu cầu trực tiếp. Tuy nhiên, các nhà nghiên cứu quan tâm có thể đăng ký quyền truy cập thông qua Hệ thống Quản lý Truy cập UK Biobank (UK Biobank Access Management System) tại https://  www.  ukbio  bank.  ac.  uk/ enable-  your-  resea  rch/  access-  our-  data/.

Nhận ngày: 17 September 2023; Chấp nhận ngày: 12 January 2024

## Tài liệu tham khảo

1.  Saeedi, P . et al. Global and regional diabetes prevalence estimates for 2019 and projections for 2030 and 2045: Results from the international diabetes federation diabetes atlas, 9(th) edition. Diabetes Res. Clin. Pract. 157 , 107843 (2019).
2.  Group, T.D.P .P .R. The diabetes prevention program (dpp): Description of lifestyle intervention. Diabetes Care. 25 (12), 2165-2171 (2002).
3.  Knowler, W . C. et al. Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin. N. Engl. J. Med. 346 (6), 393-403 (2002).
4.  Gillies, C. L. et al. Pharmacological and lifestyle interventions to prevent or delay type 2 diabetes in people with impaired glucose tolerance: Systematic review and meta-analysis. BMJ. 334 (7588), 299 (2007).
5.  Uusitupa, M. et al. Prevention of type 2 diabetes by lifestyle changes: A systematic review and meta-analysis. Nutrients. 11 (11), 2611 (2019).
6.  Gedebjerg, A. et al. Prevalence of micro- and macrovascular diabetes complications at time of type 2 diabetes diagnosis and associated clinical characteristics: A cross-sectional baseline study of 6958 patients in the Danish dd2 cohort. J. Diabetes Complicat. 32 (1), 34-40 (2018).
7.  Fregoso-Aparicio, L., Noguez, J., Montesinos, L. &amp; Garcia-Garcia, J. A. Machine learning and deep learning predictive models for type 2 diabetes: A systematic review. Diabetol. Metab. Syndr. 13 (1), 148 (2021).
8.  Silva, K. et al. Use and performance of machine learning models for type 2 diabetes prediction in community settings: A systematic review and meta-analysis. Int. J. Med. Inform. 143 , 104268 (2020).
9.  Bradbury, K. E., Young, H. J., Guo, W . &amp; Key, T. J. Dietary assessment in uk biobank: An evaluation of the performance of the touchscreen dietary questionnaire. J. Nutr. Sci. 7 , e6 (2018).
10.  Craig, C. L. et al. International physical activity questionnaire: 12-country reliability and validity. Med. Sci. Sports Exerc. 35 (8), 1381-1395 (2003).
11.  Chen, T. &amp; Guestrin, C. editors. Xgboost: A scalable tree boosting system. In Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (2016).
12.  Mitchell, R. &amp; Frank, E. Accelerating the XGBoost algorithm using GPU computing. PeerJ Comput. Sci. 3 , e127 (2017).
13.  Davagdorj, K., Pham, V. H., Theera-Umpon, N. &amp; Ryu, K. H. Xgboost-based framework for smoking-induced noncommunicable disease prediction. Int. J. Environ. Res. Public Health. 17 (18), 6513 (2020).
14.  Helton, J. C. &amp; Davis, F. J. Latin hypercube sampling and the propagation of uncertainty in analyses of complex systems. Reliab. Eng. Syst. Saf. 81 (1), 23-69 (2003).
15.  Lundberg, S. M., Erion, G. G. &amp; Lee, S.-I. Consistent individualized feature attribution for tree ensembles (2018) [arXiv:  1802. 03888]. https://  ui.  adsabs.  harva  rd.  edu/  abs/  2018a  rXiv1  80203  888L.
16.  Lundberg, S. M. &amp; Lee, S.-I. A unified approach to interpreting model predictions. Adv. Neural Inf. Process. Syst. 30 , 4-5 (2017).
17.  Kuhn, M. |&amp; Silge, J. Tidy modeling with r: O'Reilly Media (2022).
18.  Alberti, K. G. M. M. et al. Harmonizing the metabolic syndrome. Circulation. 120 (16), 1640-1645 (2009).
19.  Lee, D. H. et al. Gamma-glutamyltransferase and diabetes-A 4 year follow-up study. Diabetologia. 46 (3), 359-364 (2003).
20.  Krishnan, E., Pandya, B. J., Chung, L., Hariri, A. &amp; Dabbous, O. Hyperuricemia in young adults and risk of insulin resistance, prediabetes, and diabetes: A 15-year follow-up study. Am. J. Epidemiol. 176 (2), 108-116 (2012).
21.  Baldwin, W. et al. Hyperuricemia as a mediator of the proinflammatory endocrine imbalance in the adipose tissue in a murine model of the metabolic syndrome. Diabetes. 60 (4), 1258-1269 (2011).
22.  Vazquez, G., Duval, S., Jacobs, D. R. Jr. &amp; Silventoinen, K. Comparison of body mass index, waist circumference, and waist/hip ratio in predicting incident diabetes: A meta-analysis. Epidemiol. Rev. 29 , 115-128 (2007).
23.  Stevens, J. et al. Sensitivity and specificity of anthropometrics for the prediction of diabetes in a biracial cohort. Obes. Res. 9 (11), 696-705 (2001).
24.  de Koning, L. et al. Anthropometric measures and glucose levels in a large multi-ethnic cohort of individuals at risk of developing type 2 diabetes. Diabetologia. 53 (7), 1322-1330 (2010).
25.  Lyssenko, V . et al. Clinical risk factors, DNA variants, and the development of type 2 diabetes. N. Engl. J. Med. 359 (21), 2220-2232 (2008).
26.  Lyssenko, V. &amp; Laakso, M. Genetic screening for the risk of type 2 diabetes: Worthless or valuable?. Diabetes Care. 36 (Suppl 2), S120-S126 (2013).
27.  Meigs, J. B. et al. Genotype score in addition to common risk factors for prediction of type 2 diabetes. N. Engl. J. Med. 359 (21), 2208-2219 (2008).
28.  Cheng, D. et al. Serum uric acid and risk of incident diabetes in middle-aged and elderly chinese adults: Prospective cohort study. Front. Med. 14 (6), 802-810 (2020).
29.  Fry, A. et al. Comparison of sociodemographic and health-related characteristics of uk biobank participants with those of the general population. Am. J. Epidemiol. 186 (9), 1026-1034 (2017).

## Đóng góp của các tác giả

M.L. là tác giả chính và đã đóng góp đáng kể vào việc hình thành ý tưởng, thiết kế, và soạn thảo bản thảo. M.L., B.E., và A.R. đều đóng vai trò then chốt trong việc phát triển thiết kế nghiên cứu, cũng như diễn giải các kết quả. M.L. và E.H. chịu trách nhiệm tiến hành phân tích dữ liệu, và tất cả các tác giả đều tham gia vào việc xem xét và chỉnh sửa bản thảo. B.E. là người bảo đảm (guarantor) của công trình và chịu trách nhiệm về tính toàn vẹn của dữ liệu và độ chính xác của phân tích. Tác giả liên hệ chứng thực rằng tất cả các tác giả được liệt kê đều đáp ứng tiêu chí tác giả và không có ai khác đáp ứng tiêu chí bị bỏ sót.

## Tài trợ

Tài trợ truy cập mở được cung cấp bởi University of Gothenburg.

## Xung đột lợi ích

B.E báo cáo các khoản phí cá nhân (hội đồng chuyên gia, bài giảng) từ Amgen, AstraZeneca, Bayer, Boehringer Ingelheim, Eli Lilly, Merck Sharp &amp; Dohme, Mundipharma, Navamedic, Novo Nordisk, RLS Global, và Sanofi, tất cả đều ngoài phạm vi công trình đã nộp. B.E cũng được hỗ trợ bởi "Konung Gustav V:s och Drottning Victorias Stiftelse' . Tất cả các tác giả khác tuyên bố rằng không có mối quan hệ hoặc hoạt động nào có thể gây thiên lệch, hoặc bị nhận thức là gây thiên lệch, cho đóng góp của họ vào bản thảo này.

## Thông tin bổ sung

Thông tin Bổ sung Phiên bản trực tuyến chứa tài liệu bổ sung có sẵn tại https://  doi.  org/ 10.  1038/  s41598-  024-  52023-5.

Thư từ và yêu cầu tài liệu nên được gửi đến M.L.

Thông tin về in lại và quyền hạn có sẵn tại www.nature.com/reprints.

Lưu ý của nhà xuất bản Springer Nature giữ lập trường trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã công bố và các đơn vị trực thuộc tổ chức.

Truy cập Mở Bài báo này  được  cấp phép  theo  Giấy phép  Creative  Commons  Attribution  4.0  International, cho phép sử dụng, chia sẻ, phỏng theo, phân phối và sao chép dưới bất kỳ phương tiện hay định dạng nào, miễn là bạn ghi nhận đúng tác giả gốc và nguồn, cung cấp liên kết tới giấy phép Creative Commons, và chỉ rõ nếu có thay đổi nào được thực hiện. Hình ảnh hoặc tài liệu của bên thứ ba khác trong bài báo này được bao gồm trong giấy phép Creative Commons của bài báo, trừ khi được chỉ định khác trong dòng ghi nhận đối với tài liệu. Nếu tài liệu không được bao gồm trong giấy phép Creative Commons của bài báo và mục đích sử dụng dự kiến của bạn không được quy định cho phép hoặc vượt quá mức sử dụng được phép, bạn sẽ cần xin phép trực tiếp từ người giữ bản quyền. Để xem một bản sao của giấy phép này, hãy truy cập http://  creat  iveco  mmons.  org/  licen  ses/  by/4.  0/.

© The Author(s) 2024
