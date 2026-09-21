<!-- extracted by pdf-extract | engine=docling | pages=14 | ocr=False | tables=5/5 | density=1.18 | score=100 -->

Bài báo

## Học máy như một công cụ hỗ trợ chẩn đoán Đái tháo đường Type 2

Antonio Agliata 1,2 , Deborah Giordano 3 , Francesco Bardozzo 1 , Salvatore Bottiglieri 2 , Angelo Facchiano 3, * và Roberto Tagliaferri 1

- 1 Dipartimento di Scienze Aziendali, Management and Innovation Systems, Universit à degli Studi di Salerno, 84084 Fisciano, Italy
- 2 BC Soft, Centro Direzionale, Via Taddeo da Sessa Isola F10, 80143 Napoli, Italy
- 3 National Research Council, Institute of Food Science, Via Roma 64, 83100 Avellino, Italy
* Liên hệ: angelo.facchiano@isa.cnr.it

Tóm tắt: Đái tháo đường là một bệnh chuyển hóa mạn tính đặc trưng bởi nồng độ đường huyết cao. Trong số các loại đái tháo đường chính, type 2 là loại phổ biến nhất. Chẩn đoán và điều trị sớm có thể ngăn ngừa hoặc trì hoãn khởi phát các biến chứng. Các nghiên cứu trước đây đã khảo sát việc ứng dụng các kỹ thuật học máy để dự đoán bệnh lý này, và ở đây một mạng nơ-ron nhân tạo (artificial neural network) cho thấy những kết quả rất hứa hẹn như một công cụ hỗ trợ có giá trị tiềm năng trong quản lý và phòng ngừa đái tháo đường. Ngoài ra, khả năng vượt trội của nó trong các dự đoán dài hạn khiến nó trở thành lựa chọn lý tưởng cho lĩnh vực nghiên cứu này. Chúng tôi đã sử dụng các phương pháp học máy để khám phá những mối liên hệ trước đây chưa được phát hiện giữa tình trạng sức khỏe của một cá nhân và sự phát triển của đái tháo đường type 2, với mục tiêu dự đoán chính xác sự khởi phát của nó hoặc xác định mức độ nguy cơ của cá nhân. Nghiên cứu của chúng tôi sử dụng một bộ phân loại nhị phân (binary classifier), được huấn luyện từ đầu (trained on scratch), để nhận diện các mối quan hệ phi tuyến tiềm năng giữa sự khởi phát của đái tháo đường type 2 và một tập hợp các tham số thu được từ các phép đo trên bệnh nhân. Ba bộ dữ liệu đã được sử dụng, tức là khảo sát hai năm một lần của National Center for Health Statistics (NHANES), MIMIC-III và MIMIC-IV. Các bộ dữ liệu này sau đó được kết hợp để tạo thành một bộ dữ liệu duy nhất với số lượng cá nhân có và không có đái tháo đường type 2 bằng nhau. Vì bộ dữ liệu đã cân bằng, thước đo đánh giá chính của mô hình là độ chính xác (accuracy). Kết quả của nghiên cứu này rất đáng khích lệ, với mô hình đạt mức độ chính xác lên tới 86% và giá trị ROC AUC là 0.934. Cần điều tra thêm để cải thiện độ tin cậy của mô hình bằng cách xem xét nhiều phép đo từ cùng một bệnh nhân theo thời gian.

Từ khóa:

T2DM; mạng nơ-ron (neural network); trí tuệ nhân tạo (artificial intelligence)

## 1. Giới thiệu

Đái tháo đường là một rối loạn chuyển hóa mạn tính đặc trưng bởi nồng độ đường huyết cao, được xác định bởi sự sản xuất hoặc chức năng không đủ của insulin, một hormone do tuyến tụy tiết ra, điều hòa sự hấp thu và chuyển hóa glucose, nguồn năng lượng chính cho các tế bào của cơ thể.

Bệnh lý này có thể được phân loại thành ba nhóm cụ thể: đái tháo đường type 1 (T1DM), đái tháo đường type 2 (T2DM), và đái tháo đường thai kỳ (gestational diabetes mellitus, GDM), liên quan đến các nguyên nhân khác nhau. Trong T1DM, còn được gọi là đái tháo đường vị thành niên hoặc đái tháo đường phụ thuộc insulin, một cơ chế tự miễn phá hủy các tế bào sản xuất insulin trong tuyến tụy dẫn đến sự thiếu hụt hoàn toàn việc sản xuất insulin. Trong T2DM, dạng phổ biến nhất và thường liên quan đến béo phì và lối sống ít vận động, các nguyên nhân đa yếu tố (như yếu tố di truyền và môi trường) gây ra sự đề kháng với tác dụng của insulin, và tuyến tụy không thể sản xuất đủ insulin để cân bằng sự đề kháng này. GDM thường được chẩn đoán trong tam cá nguyệt thứ hai/thứ ba của thai kỳ ở những phụ nữ không bị ảnh hưởng trước khi mang thai. Trong nhóm cuối cùng thay vào đó là những bệnh nhân có đái tháo đường do thuốc hoặc do hóa chất gây ra hoặc do các bệnh lý khác như bệnh của tuyến tụy ngoại tiết hoặc các hội chứng đơn gen (tức là đái tháo đường sơ sinh và đái tháo đường khởi phát ở người trẻ tuổi). T1DM và T2DM là các bệnh không đồng nhất, thường không dễ

Trích dẫn: Agliata, A.; Giordano, D.; Bardozzo, F.; Bottiglieri, S.; Facchiano, A.; Tagliaferri, R. Machine Learning as a Support for the Diagnosis of Type 2 Diabetes. Int. J. Mol. Sci. 2023 , 24 , 6775. https://doi.org/10.3390/ ijms24076775

Biên tập viên học thuật: Maria Vittoria Cubellis và Anna Marabotti

Nhận bài: 15 February 2023

Sửa đổi: 31 March 2023

Chấp nhận: 3 April 2023

Xuất bản: 5 April 2023

Bản quyền: © 2023 bởi các tác giả. Bên được cấp phép MDPI, Basel, Switzerland. Bài báo này là một bài báo truy cập mở được phân phối theo các điều khoản và điều kiện của giấy phép Creative Commons Attribution (CC BY) (https:// creativecommons.org/licenses/by/ 4.0/).

phân loại ở bệnh nhân, biểu hiện lâm sàng dưới dạng tăng đường huyết. Một khi tăng đường huyết xảy ra, những người mắc tất cả các dạng đái tháo đường đều có nguy cơ phát triển các biến chứng mạn tính giống nhau, chẳng hạn như bệnh thận, bệnh tim, đột quỵ, tổn thương thần kinh, và mất thị lực, mặc dù tốc độ tiến triển có thể khác nhau [1]. Chẩn đoán và điều trị sớm, bao gồm thay đổi lối sống và dùng thuốc, có thể ngăn ngừa hoặc trì hoãn khởi phát các biến chứng, đặc biệt là trong T2DM.

Đái tháo đường là một trong mười nguyên nhân gây tử vong hàng đầu trên toàn thế giới. Theo phiên bản thứ 10 của IDF Diabetes Atlas, tỷ lệ hiện mắc đái tháo đường toàn cầu ở những người 20-79 tuổi vào năm 2021 được ước tính là 10.5% (536.6 triệu người), và các dự báo ước tính nó sẽ tăng lên 12.2% (783.2 triệu) vào năm 2045 [2]. Ngày nay, việc quản lý đái tháo đường vẫn còn là một thách thức bởi vì, mặc dù 11.5% tổng chi tiêu y tế toàn cầu được chi cho đái tháo đường, gần một trong hai người trưởng thành mắc bệnh lý này vẫn không biết về tình trạng của mình [3].

Trí tuệ nhân tạo (artificial intelligence, AI) áp dụng khoa học máy tính và công nghệ vào việc giải quyết vấn đề dựa trên các tập dữ liệu lớn. Đây là một lĩnh vực phát triển nhanh, đã tìm thấy nhiều ứng dụng trong nghiên cứu sinh học và y học, như đã được chứng minh trong một khối lượng lớn tài liệu khoa học [4-7], và cũng trong các nghiên cứu về đái tháo đường, không chỉ trong giám sát điều trị mà còn trong dự đoán đái tháo đường mới khởi phát, và các biến chứng tương lai liên quan đến bệnh lý này, và người ta ước tính rằng phương pháp này sẽ giúp giảm tỷ lệ hiện mắc đái tháo đường toàn cầu là 8.8% [8].

Trong số các kỹ thuật AI, các mô hình học máy (machine learning, ML) và học sâu (deep learning, DL) được sử dụng rộng rãi. Cụ thể, ML có giám sát (supervised ML) được định nghĩa là khi một hệ thống được huấn luyện bằng cách sử dụng một cơ sở dữ liệu gồm các ví dụ tham chiếu đã được giải mã và các mô hình (đã được trang bị tất cả các thuộc tính hữu ích có thể giúp hệ thống học phân loại và sắp xếp các ví dụ một cách chính xác). Bằng cách này, các thuật toán ML sẽ có thể phân tích dữ liệu chính xác hơn và giải quyết các vấn đề hoặc nhiệm vụ một cách tự động, dựa trên kinh nghiệm trước đó và các ví dụ được cung cấp được chỉ định là 'phù hợp'. Một thuật toán học có giám sát có thể tạo ra một giả thuyết quy nạp, tức là một mô hình giải quyết cho các vấn đề tổng quát, bắt đầu từ một tập hợp các vấn đề cụ thể. DL dựa trên các mạng nơ-ron nhân tạo, được cấu thành bởi các nút (hoặc nơ-ron), tức là thành phần tính toán cơ bản, được tổ chức thành các lớp: một lớp đầu vào (input layer) gồm một nút đầu vào cho mỗi đặc trưng đầu vào riêng lẻ, và nhận dữ liệu đầu vào thô; một hoặc nhiều lớp ẩn (hidden layers) thực hiện các phép tính trên các tín hiệu đầu vào nhận được từ lớp trước, áp dụng một tổng có trọng số của các đầu vào của nó, thêm một số hạng bias, với các trọng số và bias được học trong quá trình huấn luyện để tối ưu hóa hiệu suất của mạng, và áp dụng một hàm kích hoạt (activation function) để tạo ra một tín hiệu đầu ra được gửi đến lớp tiếp theo của mạng; lớp sau cùng là lớp đầu ra (output layer) tạo ra đầu ra cuối cùng của mạng, có thể ở dạng nhãn phân loại, giá trị hồi quy, phân phối xác suất, hoặc bất kỳ loại đầu ra nào khác mà mạng được thiết kế để tạo ra.

Các phương pháp tiếp cận này đã được sử dụng để tạo ra các mô hình dự báo nguy cơ đái tháo đường không xâm lấn bằng cách phân tích các đặc điểm hình thái như lưỡi [9] hoặc hình ảnh đáy mắt võng mạc [10], hoặc từ các mẫu phân bố mỡ cơ thể đặc biệt khai thác hình ảnh từ chụp cắt lớp vi tính bụng [11] hoặc cộng hưởng từ [12]. Trong trường hợp sau, các mô hình được huấn luyện cho độ nhạy insulin, hemoglobin glycat hóa A1c (HbA1c), tuổi, giới tính, Chỉ số khối cơ thể (Body Mass Index, BMI), tiền đái tháo đường, và sự xuất hiện của đái tháo đường, đạt AUC ở mức 87% cho việc phân biệt T2DM và 68% cho tiền đái tháo đường. Một số nghiên cứu chứng minh rằng ML có thể là một công cụ hứa hẹn để tối đa hóa dự đoán đái tháo đường mới khởi phát hơn các mô hình thống kê thông thường, báo cáo độ chính xác biến đổi từ 71% đến 94% và khai thác một bộ dữ liệu gồm tối thiểu 3700 bệnh nhân lên đến tối đa 2 triệu [13]. Cụ thể, Ravault và các đồng nghiệp [14] đã áp dụng phương pháp tiếp cận ML cho dữ liệu hành chính y tế được thu thập định kỳ của hơn 2 triệu dân số nói chung với tỷ lệ hiện mắc DM chỉ 1% và đã khảo sát hơn 300 đặc trưng được suy ra từ chi tiết nhân khẩu học, thông tin địa lý, các bệnh mạn tính, và lịch sử sử dụng dịch vụ chăm sóc sức khỏe. Phương pháp này đã có khả năng phát hiện DM mới khởi phát trong vòng 5 năm với hiệu suất AUC 0.8026.

Các ứng dụng ML và DL cũng được sử dụng để quản lý T2MD và các diễn biến của nó; ví dụ, một chế độ ăn nhắm mục tiêu sau ăn được cá nhân hóa, dựa trên một thuật toán ML tích hợp các đặc trưng lâm sàng và hệ vi sinh vật, đã được sử dụng để dự đoán phản ứng glucose sau ăn của cá nhân, nhằm kiểm soát sức khỏe đường huyết và chuyển hóa ở bệnh nhân T2DM mới được chẩn đoán [15]. Một lần nữa, một phương pháp tiếp cận từng bước, dựa trên sự kết hợp của các phương pháp học máy, các mô hình đồ thị xác suất, các công cụ mô hình hóa thống kê cổ điển, và thuật toán nội bộ, đã được đề xuất để lựa chọn các tổ hợp thuốc nhằm bù trừ chuyển hóa carbohydrate cho bệnh nhân T2DM [16]. Các bộ dự đoán dựa trên ML được suy ra từ mức HbA1c ban đầu, các bệnh đồng mắc, các biến nhân khẩu học, và liều metformin ban đầu đã được khai thác để dự đoán việc đạt được và cả việc duy trì HbA1c &lt; 7.0% sau một năm điều trị bằng metformin [17]. Hơn nữa, một thiết bị sử dụng các mạng nơ-ron tích chập được huấn luyện để diễn giải hình ảnh võng mạc [18] đã được FDA cấp phép để theo dõi bệnh nhân đái tháo đường về sự phát triển của bệnh võng mạc đái tháo đường và một ứng dụng di động, được huấn luyện để diễn giải hình ảnh bàn chân [19], đã được phát triển nhằm giám sát bệnh lý bàn chân đái tháo đường.

Tuy nhiên, mặc dù những tiến bộ to lớn của AI trong T2DM, việc lựa chọn đặc trưng và thành phần bộ dữ liệu vẫn còn là một điểm khó để xử lý. Việc phân tích dữ liệu đái tháo đường rất phức tạp bởi vì hầu hết dữ liệu liên quan đều là phi tuyến, không tuân theo phân phối chuẩn, và có cấu trúc tương quan, dẫn đến sự thiếu hụt dữ liệu hỗ trợ để xây dựng các thuật toán hợp lý và chính xác. Hơn nữa, đối với bệnh này, các tập dữ liệu khổng lồ được tạo ra chỉ vì bản chất không đồng nhất và diễn tiến mạn tính của bệnh lý [8]. Do đó, để khắc phục khó khăn này, nhiều thuật toán ML và DL đã được phát triển, và người ta thường tin rằng việc sử dụng một lượng lớn dữ liệu có tổ chức sẽ cải thiện đáng kể độ chính xác dự đoán của việc chẩn đoán, phòng ngừa, và điều trị bệnh trong đái tháo đường [13]. Thực tế, đối với gần như tất cả các ứng dụng đã được trích dẫn trước đó, các mô hình dự đoán được kết hợp, được sử dụng trong các bộ dữ liệu khác nhau để đánh giá tình trạng bệnh nhân, và được huấn luyện trên các đặc trưng của một nhóm bệnh nhân lớn và không đồng nhất để nâng cao tính khả thi của việc tiên lượng các yếu tố. Điều này nhấn mạnh rằng các thuật toán ML và DL là những phương pháp tiếp cận hứa hẹn để kiểm soát đường huyết và đái tháo đường; tuy nhiên, chúng nên được cải thiện và sử dụng trong các bộ dữ liệu lớn để khẳng định khả năng áp dụng của chúng [20].

Việc lựa chọn đặc trưng, như đã đề cập, không phải là một điểm tầm thường; sự lựa chọn phụ thuộc vào loại hình của bộ dự đoán mà chuyên gia muốn hiện thực hóa nhưng cũng phụ thuộc vào tính sẵn có của dữ liệu. Không có sự đồng thuận về các đặc trưng cụ thể để tạo ra một mô hình dự đoán cho T2DM. Đôi khi việc xem xét một số lượng lớn các đặc trưng có thể dẫn đến hiệu quả lớn hơn của bộ dự đoán, nhưng thường thì độ chính xác giảm đáng kể khi bộ dữ liệu quá lớn và phức tạp [21]. Hơn nữa, lượng dữ liệu được chọn càng lớn, thì việc thu thập chúng theo thời gian càng khó khăn. Thường thì, một số dữ liệu phát sinh từ những phân tích tốn kém và/hoặc xâm lấn không thể áp dụng để sàng lọc theo dõi tất cả các bệnh nhân tham gia trong bộ dữ liệu, do đó rủi ro là mất dữ liệu theo thời gian. Trong những trường hợp khác, thay vào đó, không phải tất cả các đặc trưng được chọn đều hóa ra liên quan đến độ chính xác của bộ dự đoán, các đặc trưng nhân khẩu học, và insulin, chẳng hạn, đã không thêm bất kỳ cải thiện hiệu suất nào cho việc dự báo đái tháo đường [22]. Hơn nữa, các yếu tố nguy cơ đái tháo đường và các đặc trưng liên quan của chúng thực sự rất nhiều, và thường thì mối tương quan thực sự của chúng với T2DM vẫn còn đang được tranh luận [23].

Trong nghiên cứu hiện tại, để tạo ra một mô hình dự đoán T2DM chính xác, chúng tôi đã quyết định chọn một tập hợp hạn chế các đặc trưng không đòi hỏi việc hỏi han hoặc xét nghiệm quá mức đối với bệnh nhân, dễ thu thập cũng như trong một khoảng thời gian kéo dài, và có sẵn các nghiên cứu tài liệu đã tương quan chúng với bệnh lý quan tâm. Chúng tôi đã quyết định sử dụng, lần đầu tiên, dữ liệu được cấu thành từ các đặc trưng phù hợp được thu thập từ ba bộ dữ liệu khác nhau: khảo sát hai năm một lần National Health and Nutrition Examination Survey (NHANES) của National Center for Health Statistics [24], các bộ dữ liệu MIMIC-III [25], và MIMIC-IV [26], chứa dữ liệu lâm sàng của các bệnh nhân từ Beth Israel Deaconess Medical Center. Một bộ dữ liệu cân bằng đã được tạo ra bằng cách sử dụng các bộ dữ liệu này, và một bộ phân loại nhị phân đã được phát triển.

## 2. Kết quả

## 2.1. Thống kê bộ dữ liệu

Dữ liệu được truy xuất từ ba bộ dữ liệu được hợp nhất và tiền xử lý (xem Mục 4) để loại bỏ các đặc trưng không quan tâm và các giá trị không hợp lý, và để thu được một bộ dữ liệu cân bằng cho việc phân tích. Chúng tôi báo cáo trong Bảng 1 và 2 các thống kê của dữ liệu, tương ứng trước và sau giai đoạn tiền xử lý. Các cột xác định số lần xuất hiện (số đếm) của các giá trị khác không (tức là các giá trị số không bằng không), giá trị trung bình, độ lệch chuẩn, giá trị nhỏ nhất, và giá trị lớn nhất.

Bảng 1. Thống kê dữ liệu trước khi tiền xử lý.

| Đặc trưng                     |   Số đếm |    Trung bình | Độ lệch chuẩn   |   Giá trị nhỏ nhất |   Giá trị lớn nhất |
|-------------------------------|---------|---------|----------------------|-----------------|-----------------|
| Gender/Sex a                  |  52,640 |   1.512 | 0.499                |             1.0 |             2.0 |
| Age (years)                   |  52,640 |  43.764 | 24 336               |            12.0 |           300.0 |
| Diabetes b                    |  52,640 |   0.130 | 0.337                |             0.0 |             1.0 |
| HDL-cholesterol (mg/dL)       |  52,640 |  52.112 | 15.535               |             3.0 |           226.0 |
| Glucose (mg/dL)               |  52,640 | 103.255 | 36.607               |            21.0 |           683.0 |
| Systolic: Blood pres (mm/Hg)  |  52,640 | 121.440 | 18.820               |            51.0 |           270.0 |
| Diastolic: Blood pres (mm/Hg) |  52,640 |  68.041 | 12.938               |            21.9 |           676.1 |
| Triglycerides (mg/dL)         |  52,640 | 139.093 | 122.210              |             9.0 |          6057.0 |
| Weight (kg)                   |  52,640 |  78.153 | 21.506               |            25.1 |           371.0 |
| Body Mass Index (kg/m 2 )     |  52,640 |  33.061 | 948.424              |            3.24 |           215.7 |

Bảng 2. Thống kê dữ liệu sau khi tiền xử lý.

| Đặc trưng                     |   Số đếm |    Trung bình |   Độ lệch chuẩn |   Giá trị nhỏ nhất |   Giá trị lớn nhất |
|-------------------------------|---------|---------|----------------------|-----------------|-----------------|
| Gender/Sex a                  |  13,687 |   1.543 |                0.498 |             1.0 |             2.0 |
| Age (years)                   |  13,687 |  51.947 |               21.179 |            12.0 |            99.0 |
| Diabetes b                    |  13,687 |   0.498 |                0.500 |             0.0 |             1.0 |
| HDL-cholesterol (mg/dL)       |  13,687 |  49.914 |               15.607 |             3.0 |           158.0 |
| Glucose (mg/dL)               |  13,687 | 124.347 |               56.437 |            21.0 |           649.0 |
| Systolic: Blood pres (mm/Hg)  |  13,687 | 124.506 |               19.873 |            51.0 |           242.0 |
| Diastolic: Blood pres (mm/Hg) |  13,687 |  67.498 |               12.430 |            21.9 |           202.3 |
| Triglycerides (mg/dL)         |  13,687 | 152.276 |              107.965 |            12.0 |           896.0 |
| Weight (kg)                   |  13,687 |  82.788 |               22.865 |            27.8 |           273.0 |
| Body Mass Index (kg/m 2 )     |  13,687 |  29.456 |                7.313 |             3.2 |            97.4 |

Sau giai đoạn tiền xử lý, một bộ dữ liệu cuối cùng gồm 13,687 hàng đã được thu được, với số lượng cân bằng các cá nhân không mắc đái tháo đường và mắc đái tháo đường. Hình 1 cho thấy các biểu đồ phân bố cho dân số của bộ dữ liệu cuối cùng, được phân chia theo các khoảng tuổi, giới tính, và dân tộc.

## 2.2. Tinh chỉnh siêu tham số

Để xác định số nút tối ưu trong lớp ẩn, một phương pháp tìm kiếm lưới (grid search) đã được sử dụng. Số nút tối thiểu và tối đa được xem xét lần lượt là năm và mười lăm. Kết quả là, mười thí nghiệm đã được tiến hành, mỗi thí nghiệm cho mỗi số nút được xem xét. Đối với mỗi thí nghiệm, một mô hình với các đặc điểm sau đây đã được tạo ra:

- Tốc độ học (Learning rate): 0.001;
- Hàm mất mát (Loss Function): Binary cross-entropy;
- Thuật toán tối ưu hóa (Optimization algorithm): Stochastic Gradient Descent;
- Hàm kích hoạt cho lớp ẩn (Trigger function for hidden layer): ReLU;

Int. J. Mol. Sci.

2022

,

23

, x FOR PEER REVIEW

- Hàm kích hoạt cho lớp đầu ra (Trigger function for the output layer): sigmoids;
- Số nút trong lớp ẩn: x ∈ [5,15].

Hình 1. Các biểu đồ phân bố cho dân số của bộ dữ liệu cuối cùng. Bảng ( A ) báo cáo phân bố theo các khoảng tuổi, bảng ( B ) theo các nhóm dân tộc, và bảng ( C ) theo giới tính. Hình 1. Các biểu đồ phân bố cho dân số của bộ dữ liệu cuối cùng. Bảng ( A ) báo cáo phân bố theo các khoảng tuổi, bảng ( B ) theo các nhóm dân tộc, và bảng ( C ) theo giới tính.

2.2. Tinh chỉnh siêu tham số Để xác định số nút tối ưu trong lớp ẩn, một phương pháp tìm kiếm lưới đã được sử dụng. Số nút tối thiểu và tối đa được xem xét lần lượt là năm và mười lăm. Kết quả là, mười thí nghiệm đã được tiến hành, mỗi thí nghiệm cho mỗi Mô hình được huấn luyện trong một trăm epoch để đánh giá giá trị độ chính xác đạt được với cấu hình nút đó trên một tập kiểm định (validation set), được trích trước đó từ tập huấn luyện, với kích thước bằng 20% của tổng số. Tất cả các thí nghiệm được lặp lại mười lần, và các giá trị độ chính xác trung bình được tính toán. Bảng 3 hiển thị các giá trị độ chính xác trung bình cho mỗi thí nghiệm, được sắp xếp theo thứ tự giảm dần (càng cao càng tốt).

số nút được xem xét. Đối với mỗi thí nghiệm, một mô hình với các đặc điểm sau

được tạo ra: Bảng 3. Các giá trị độ chính xác trung bình cho mỗi thí nghiệm (càng cao càng tốt).

·

·

·

·

·

·

các giá trị cho mỗi thí nghiệm, được sắp xếp theo thứ tự giảm dần (càng cao càng tốt).

| Learning rate: 0.001; Function: Binary cross-entropy; Hidden Nodes   | Accuracy                          |
|----------------------------------------------------------------------|-----------------------------------|
| Optimization algorithm: Stochastic Gradient 12                       | 0.838                             |
| hidden 13                                                            | 0.838                             |
| Trigger function for layer: ReLU; 14                                 | 0.837                             |
| Trigger function for the output layer: 15                            | 0.837                             |
| Number of nodes in the hidden layer: 11                              | 0.837                             |
| model was trained for a hundred 10                                   | evaluate the accuracy value 0.836 |
| 7                                                                    | 0.835                             |
| configuration of nodes on a validation 5                             | was previously extracted 0.835    |
| training set, with a size of 20% of the 9                            | experiments were repeated 0.835   |
| average accuracy values were calculated. 6                           | displays the average 0.834        |

Bảng 3. Các giá trị độ chính xác trung bình cho mỗi thí nghiệm (càng cao càng tốt). Hidden Nodes Accuracy 12 0.838 Các thí nghiệm đã được tiến hành để nhận diện bộ tối ưu hóa (optimizer) cung cấp hiệu suất tốt nhất. Bốn thuật toán tối ưu hóa đã được xem xét: Stochastic Gradient Descent (SGD), Adaptive Moment Estimation (ADAM) [27], Root Mean Squared Propagation (RMSPROP) [28] và Levenberg-Marquardt (LM) [29].

13 0.838 14 0.837 15 0.837 Trong trường hợp này, kiểm định chéo k-fold (k-fold cross-validation) đã được sử dụng như kỹ thuật kiểm định, với k bằng 9. Các thí nghiệm được lặp lại nhiều lần, với tổng cộng 11 lần lặp. Bảng 4 trình bày độ chính xác trung bình thu được cho mỗi bộ tối ưu hóa cho mỗi fold trong mỗi

11

10

0.837

0.836

5  of  15

Int. J. Mol. Sci.

2022

,

23

trong số mười một thí nghiệm cùng với độ lệch chuẩn, minh họa rằng ADAM là thuật toán hiệu quả nhất.

Bảng 4. Các giá trị độ chính xác trung bình cho mỗi bộ tối ưu hóa (càng cao càng tốt).

| Optimizer   |   Mean (Accuracy) |   Standard Deviation (Accuracy) |
|-------------|-------------------|---------------------------------|
| ADAM        |             0.855 |                           0.008 |
| SGD         |             0.853 |                           0.009 |
| RMSPROP     |             0.852 |                           0.009 |
| LM          |             0.835 |                           0.049 |

## 2.3. Tổ hợp mô hình (Model Ensemble)

Đối với mỗi bộ tối ưu hóa, người ta đã quyết định sử dụng một tổ hợp (ensemble) của 9 × 11 mô hình thu được trong bước trước. Một sơ đồ bỏ phiếu (voting scheme) đã được sử dụng, trong đó tất cả các mô hình trong tổ hợp trả về một kết quả, và kết quả được trả về bởi đa số các mô hình sau đó được trả về như là dự đoán cuối cùng. Tổ hợp ban đầu được huấn luyện trên tập huấn luyện và sau đó được đánh giá về hiệu suất trên tập kiểm tra (test set). Các kết quả được hiển thị trong Bảng 5.

Bảng 5. Các giá trị độ chính xác trung bình cho mỗi thí nghiệm trên các mô hình tổ hợp (càng cao càng tốt).

| Model   |   Accuracy |
|---------|------------|
| SGD     |      0.862 |
| RMSPROP |      0.861 |
| ADAM    |      0.858 |
| LM      |      0.840 |

## 2.4. Giảm đặc trưng (Feature Reduction)

Một phương pháp giảm đặc trưng cũng đã được thử nghiệm; một đặc trưng được loại bỏ tuần tự ở mỗi bước (những đặc trưng ít quan trọng nhất trên tập kiểm định), và mô hình được huấn luyện lại bằng cách sử dụng bộ tối ưu hóa ADAM trên tập huấn luyện. Quy trình này được lặp lại ba mươi lần, và độ chính xác trung bình thu được từ mỗi lần lặp được tính toán. Các đặc trưng được loại bỏ từng cái một theo thứ tự là triglycerides, tuổi, Chỉ số khối cơ thể, và Huyết áp tâm thu. Hiệu suất của các mô hình trên tập kiểm tra cuối cùng được đánh giá. Biểu đồ trong Hình 2 minh họa mức độ suy giảm hiệu suất của mô hình do kết quả của việc giảm đặc trưng. Việc giảm đặc trưng dựa trên độ chính xác. Khi những đặc trưng ít quan trọng hơn được loại bỏ từng cái một, độ chính xác không thay đổi cho đến khi còn lại sáu đặc trưng. , x FOR PEER REVIEW 7  of  15

Hình 2. Độ chính xác của mô hình bằng cách loại bỏ tuần tự 1 đặc trưng ở mỗi lần. Hình 2. Độ chính xác của mô hình bằng cách loại bỏ tuần tự 1 đặc trưng ở mỗi lần.

2.5. Kiểm định (Validation)

Để kiểm định mô hình tốt nhất thu được (xem Mục 4.5 để biết chi tiết về phương pháp luận

),  ROC  (Receiver  Operating  Characteristic)  và  điểm  ROC AUC tương ứng

(Area Under Curve) đã được tính toán. Biểu đồ với đường cong ROC liên quan là

Hình 2.

Độ chính xác của mô hình bằng cách loại bỏ tuần tự 1 đặc trưng ở mỗi lần.

2.5. Kiểm định

Để kiểm định mô hình tốt nhất thu được (xem Mục 4.5 để biết chi tiết về phương pháp luận), ROC (Receiver Operating Characteristic) và điểm ROC AUC tương ứng (Area Under Curve) đã được tính toán. Biểu đồ với đường cong ROC liên quan được hiển thị trong Hình 3. Giá trị ROC AUC được tính toán là 0.934. Để kiểm định mô hình tốt nhất thu được (xem Mục 4.5 để biết chi tiết về phương pháp luận),  ROC  (Receiver  Operating  Characteristic)  và  điểm  ROC AU tương ứng (Area Under Curve) đã được tính toán. Biểu đồ với đường cong ROC liên quan được hiển thị trong Hình 3. Giá trị ROC AUC được tính toán là 0.934.

## 2.5. Kiểm định

Hình 3. Đường cong ROC (AUC) của mô hình tổ hợp. Hình 3. Đường cong ROC (AUC) của mô hình tổ hợp.

## 2.6. Hiệu chuẩn (Calibration)

2.6. Hiệu chuẩn Khi sử dụng các bộ phân loại ML, có thể thích hơn nếu mô hình ước tính xác suất dữ liệu thuộc về mỗi lớp tiềm năng thay vì các nhãn lớp đơn giản. Việc có quyền truy cập Khi sử dụng các bộ phân loại ML, có thể thích hơn nếu mô hình ước tính xác suất dữ liệu thuộc về mỗi lớp tiềm năng thay vì các nhãn lớp đơn giản. Việc có quyền truy cập vào xác suất hữu ích cho việc đưa ra một diễn giải sắc thái hơn cho các phản hồi hoặc nhận diện các sai sót của mô hình. Nếu một mô hình ML tạo ra các xác suất đã hiệu chuẩn, thì nó đã được hiệu chuẩn. Chi tiết hơn, các xác suất được hiệu chuẩn sao cho một dự báo lớp được đưa ra với độ tin cậy p là chính xác 100 *p% số lần. Bằng cách sử dụng các xác suất đã hiệu chuẩn, chúng ta có thể lấy các giá trị thu được và diễn giải chúng như đại diện cho độ tin cậy của mô hình. Việc tạo ra một biểu đồ hiệu chuẩn (calibration plot) là phương pháp điển hình nhất để đánh giá sự hiệu chuẩn của mô hình. Biểu đồ hiệu chuẩn cho tổ hợp đã được tính toán trên tập kiểm tra, thu được biểu đồ được hiển thị trong Hình 4A. Nó trình bày hai đường: đường gạch nét đại diện cho một mô hình lý tưởng được hiệu chuẩn hoàn hảo, và đường còn lại chỉ ra tổ hợp cần được kiểm định. Đường sau càng gần đường trước, mô hình càng được hiệu chuẩn tốt. Để không chỉ dựa vào dữ liệu trực quan khi đánh giá sự hiệu chuẩn của mô hình, điểm Brier (Brier score) cũng đã được sử dụng; về cơ bản nó là cùng một phép tính được thực hiện cho sai số bình phương trung bình, nhưng nó được áp dụng khi so sánh các dự đoán xác suất với các kết quả thực tế của các sự kiện cụ thể đã được quan sát. Điểm Brier dao động từ 0 đến 1 (giá trị càng thấp càng tốt), với 0 biểu thị sự hiệu chuẩn hoàn hảo, nơi xác suất dự đoán khớp chính xác với các xác suất quan sát được. Giá trị thu được trong trường hợp của chúng tôi là 0.101 cho tổ hợp, trong khi nó bằng 0.103 trong trường hợp mạng nơ-ron SGD (Hình 4B).

Int. J. Mol. Sci.

2022

,

23

, x FOR PEER REVIEW

Hình 4. Các biểu đồ hiệu chuẩn. Đường gạch nét đại diện cho một mô hình lý tưởng được hiệu chuẩn hoàn hảo; đường liền nét đại diện cho mô hình được áp dụng. Bảng ( A ): biểu đồ hiệu chuẩn cho mô hình tổ hợp. Bảng ( B Hình 4. Các biểu đồ hiệu chuẩn. Đường gạch nét đại diện cho một mô hình lý tưởng được hiệu chuẩn hoàn hảo; đường liền nét đại diện cho mô hình được áp dụng. Bảng ( A ): biểu đồ hiệu chuẩn cho mô hình tổ hợp. Bảng ( B ): biểu đồ hiệu chuẩn cho mô hình SGD.

## biểu đồ hiệu chuẩn cho mô hình SGD. 3. Thảo luận

3. Thảo luận Nhiều nỗ lực được định hướng tới những cải thiện trong phòng ngừa, chẩn đoán, và chăm sóc đái tháo đường. Các ứng dụng của các phương pháp AI là phương pháp tiếp cận tiên tiến nhất dựa trên các tài nguyên tính toán. Dữ liệu thu được từ các nghiên cứu lâm sàng nên được tích hợp một cách thích hợp trong các phương pháp tiếp cận AI, cũng như thông tin từ các cuộc điều tra ở cấp độ phân tử và tế bào. Như một ví dụ, vai trò của các tham số được sử dụng trong công trình của chúng tôi như là các đặc trưng là Nhiều nỗ lực được định hướng tới những cải thiện trong phòng ngừa, chẩn đoán, và chăm sóc đái tháo đường. Các ứng dụng của các phương pháp AI là phương pháp tiếp cận tiên tiến nhất dựa trên các tài nguyên tính toán. Dữ liệu thu được từ các nghiên cứu lâm sàng nên được tích hợp một cách thích hợp trong các phương pháp tiếp cận AI, cũng như thông tin từ các cuộc điều tra ở cấp độ phân tử và tế bào. Như một ví dụ, vai trò của các tham số được sử dụng trong công trình của chúng tôi như là các đặc trưng là đối tượng của các nghiên cứu được báo cáo trong tài liệu [30-35], và các dấu ấn sinh học mới cho việc đánh giá đái tháo đường và các biến chứng liên quan đến đái tháo đường có thể được thêm vào trong tương lai, như được chứng minh bởi các nghiên cứu về vai trò của hồng cầu [36].

đối tượng của các nghiên cứu được báo cáo trong tài liệu [30-35], và các dấu ấn sinh học mới cho việc đánh giá

đái tháo đường và các biến chứng liên quan đến đái tháo đường có thể được thêm vào trong tương lai, như được chứng minh

bởi các nghiên cứu về vai trò của hồng cầu [36].

Vì số lượng dữ liệu là một điểm then chốt trong việc đại diện cho một hiện tượng

nhất định, công trình của chúng tôi đã tập trung vào việc có thể xây dựng một bộ dữ liệu với dữ liệu lớn, chất lượng cao

9  of  15

):

Vì số lượng dữ liệu là một điểm then chốt trong việc đại diện cho một hiện tượng nhất định, công trình của chúng tôi đã tập trung vào việc có thể xây dựng một bộ dữ liệu với dữ liệu lớn, chất lượng cao. Một bộ dữ liệu được thiết kế tốt là thiết yếu cho sự thành công của việc huấn luyện và đánh giá các mạng nơ-ron, vì chất lượng và tính đại diện của dữ liệu sẽ tác động đáng kể đến hiệu suất của mạng. Chúng tôi đã sử dụng ba bộ dữ liệu công khai để trích xuất dữ liệu, nhằm đưa tính không đồng nhất vào dữ liệu. Dữ liệu được trích xuất được tiền xử lý để loại bỏ dữ liệu có giá trị thiếu cho các đặc trưng quan tâm, thu được một bộ dữ liệu cuối cùng gồm 13,687 cá nhân, tức là với số lượng cá nhân có và không có T2DM tương tự nhau. Bằng cách này, chúng tôi đã thu được một bộ dữ liệu cân bằng với số lượng phù hợp. Các đặc trưng được lựa chọn vì bằng chứng về các mối quan hệ với T2DM và vì sự dễ dàng trong việc thu thập chúng, là các phép đo trong thực hành thông thường.

Chúng tôi đã quyết định không áp dụng bất kỳ kỹ thuật tăng cường dữ liệu (data augmentation) nào, để bảo toàn chất lượng của thông tin, vốn là yếu tố cơ bản cho các thuật toán học máy khi chúng tìm kiếm các mối tương quan trong dữ liệu; tất cả các hàng có giá trị không hợp lý hoặc thiếu cho ít nhất một đặc điểm đều bị loại bỏ. Việc sử dụng một bộ dữ liệu gồm ít nhất 13,000 mẫu đại diện cho bước đầu tiên hướng tới các mô hình với hiệu suất ngày càng đại diện cho khả năng thực sự của chúng trên dữ liệu chưa biết.

Việc sử dụng một mạng nơ-ron như một mô hình học máy được chọn do khả năng của nó trong việc xấp xỉ bất kỳ hàm nào với mức độ chính xác cao [37]. Các mô hình này đã được sử dụng rộng rãi trong chẩn đoán các bệnh khác nhau như lao [38], u hắc tố ác tính [39], và u nguyên bào thần kinh [40]. Hơn nữa, các mạng nơ-ron đã cho thấy tiềm năng trong việc nâng cao độ chính xác dự đoán khi các kết nối giữa các biến là phi tuyến hoặc chưa biết. Các nghiên cứu đã chứng minh rằng các mạng nơ-ron thể hiện khả năng dự đoán dài hạn vượt trội ở bệnh nhân phẫu thuật giảm béo [41] khi so sánh với các mô hình hồi quy tuyến tính [42] và hồi quy logistic [43].

Nghiên cứu của chúng tôi gợi ý rằng mô hình được áp dụng cho bộ dữ liệu được tạo ra có thể dự đoán trạng thái T2DM với hiệu suất rất cao, dựa trên các đặc trưng được chọn bởi tài liệu khoa học [30-35].

Các đặc trưng quan trọng nhất là nồng độ đường huyết, nồng độ HDL trong máu, huyết áp tâm trương, giới tính, và cân nặng, trong khi triglycerides, tuổi, BMI, và huyết áp tâm thu hóa ra ít quan trọng hơn.

Đường cong ROC là một phương pháp thường được sử dụng để đánh giá hiệu suất của các mô hình phân loại (nhị phân). Nó sử dụng một sự kết hợp của tỷ lệ dương tính thật (tỷ lệ phần trăm các ví dụ dương tính được dự đoán đúng, được định nghĩa là recall) và tỷ lệ dương tính giả (tỷ lệ phần trăm các ví dụ âm tính được dự đoán sai) để thu được một bức ảnh nhanh về hiệu suất phân loại.

Bằng cách phân tích các đường cong ROC, người ta đánh giá khả năng của bộ phân loại trong việc phân biệt giữa, ví dụ, một dân số khỏe mạnh và một dân số bị bệnh, bằng cách tính diện tích dưới đường cong ROC (Area Under Curve (AUC)). Giá trị AUC, giữa 0 và 1, tương đương với xác suất rằng kết quả của bộ phân loại áp dụng cho một cá nhân được rút ngẫu nhiên từ nhóm bị bệnh cao hơn kết quả thu được khi áp dụng nó cho một cá nhân được rút ngẫu nhiên từ nhóm khỏe mạnh.

Diện tích dưới đường cong ROC (AUC) càng cao, bộ phân loại càng tốt. Một bộ phân loại với AUC cao hơn 0.5 tốt hơn một bộ phân loại ngẫu nhiên. Nếu AUC nhỏ hơn 0.5, thì có điều gì đó sai với mô hình. Một mô hình hoàn hảo sẽ có AUC bằng 1. Các đường cong ROC được sử dụng rộng rãi bởi vì chúng tương đối đơn giản để hiểu, nắm bắt nhiều hơn một khía cạnh của phân loại (xem xét cả dương tính giả và âm tính giả), và cho phép so sánh trực quan và ít công sức về hiệu suất của các loại mô hình khác nhau. Trong nghiên cứu của chúng tôi, giá trị ROC AUC được tính toán là 0.934. Giá trị này gợi ý một giá trị dự đoán cao cho phương pháp được phát triển.

Để xác minh rằng tính không đồng nhất của dân tộc không gây thiên lệch cho các kết quả cuối cùng, chúng tôi đã thực hiện một phân tích cho mỗi nhóm dân tộc, thu được các kết quả rất tương tự (xem Tài liệu bổ sung).

Như có thể thấy từ Hình 4, mạng nơ-ron đơn tốt nhất (SGD) và các dự đoán tổ hợp dường như được hiệu chuẩn, do đó có thể diễn giải như là các xác suất thuộc về một lớp này hay lớp kia. Điều này cũng được xác nhận bởi điểm Brier, mà các giá trị cực kỳ thấp của nó mang lại cho chúng tôi sự tin tưởng về độ chính xác của các dự đoán theo thuật ngữ xác suất. Sự hiệu chuẩn của các mô hình phải được kiểm tra cẩn thận bởi vì sự hiệu chuẩn sai có thể dẫn đến các quyết định tồi, và việc báo cáo cả hai là then chốt cho các mô hình dự đoán [44].

## 4. Vật liệu và Phương pháp

## 4.1. Các đặc trưng

Một tập hợp các đặc trưng đã được chọn dựa trên bằng chứng tài liệu [30-35], và nó bao gồm nồng độ glucose trong máu, được đo bằng mg/dL, nồng độ triglycerides trong máu, được đo bằng mg/dL, nồng độ HDL trong máu, được đo bằng mg/dL, huyết áp tâm thu, được đo bằng mm/Hg, huyết áp tâm trương, được đo bằng mm/Hg, giới tính được biểu thị dưới dạng giá trị số nhị phân, tuổi, được biểu thị bằng năm, cân nặng, được đo bằng kg, và Chỉ số khối cơ thể (BMI), được biểu thị bằng kg/m 2 . Các giá trị của các đặc trưng này, cùng với trạng thái đái tháo đường, được trích xuất từ các bộ dữ liệu được mô tả trong đoạn tiếp theo.

## 4.2. Các bộ dữ liệu

Các nghiên cứu trước đây đã làm nổi bật tính sẵn có của các bộ dữ liệu từ nhiều khảo sát được tiến hành giữa năm 1999 và 2018 bởi National Center for Health Statistics (National Health and Nutrition Examination Survey, NHANES) [24] cũng như hai bộ dữ liệu chứa dữ liệu lâm sàng, MIMIC-III [25] và MIMIC-IV [26].

Các bộ dữ liệu NHANES 1999-2018 cung cấp một mẫu đại diện cấp quốc gia về các công dân Hoa Kỳ trưởng thành, từ 18 tuổi trở lên, trong khoảng bảy nghìn cá nhân cho mỗi năm. MIMIC-III là một cơ sở dữ liệu có thể truy cập công khai chứa thông tin liên quan đến sức khỏe đã được ẩn danh về hơn 40,000 bệnh nhân được chăm sóc ICU tại Beth Israel Deaconess Medical Center giữa năm 2001 và 2012. MIMIC-IV là một bản nâng cấp của MIMIC-III bổ sung dữ liệu hiện đại và cải thiện nhiều thành phần của phiên bản trước.

Mỗi mục nhập trong toàn bộ bộ dữ liệu NHANES có một khóa, được gọi là SEQN, đóng vai trò là định danh của đối tượng mà dữ liệu đề cập đến.

Vì dữ liệu trong bộ dữ liệu NHANES được phân phối trên nhiều bộ dữ liệu, quá trình thu thập dữ liệu đòi hỏi một giai đoạn ban đầu tìm kiếm dữ liệu vector đặc trưng và một giai đoạn tiếp theo hợp nhất chúng, cho việc đó Python 3.8.11 cùng với thư viện Pandas 1.2.4 đã được sử dụng.

Các đặc trưng như glucose và triglycerides được phân phối trong các bộ dữ liệu khác nhau. Đối với cả hai, quy trình truy xuất và hợp nhất dữ liệu sau đây đã được thực hiện; các bộ dữ liệu khác nhau với đặc trưng quan tâm được tải xuống, và sau đó, dựa trên các giá trị trong cột SEQN, các hàng có giá trị này giống nhau được hợp nhất, và những hàng không giống nhau được hợp nhất vào một bảng duy nhất. Cụ thể, đối với các hàng được hợp nhất, những hàng mà tất cả đều có giá trị Nan (Not a Number) đã bị loại bỏ. Mặt khác, nếu tập hợp các hàng có cùng định danh có ít nhất một giá trị không phải Nan, thì giá trị đầu tiên theo thứ tự đọc được lấy.

Các đặc trưng quan tâm còn lại mỗi đặc trưng nằm trong một bộ dữ liệu duy nhất. Chúng sau đó được trích xuất và hợp nhất vào một bảng duy nhất dựa trên khóa SEQN. Quá trình này được lặp lại tuần tự cho mỗi bộ dữ liệu từ năm 1999 đến 2018 và sau đó được hợp nhất vào một bảng duy nhất, dựa trên khóa SEQN, cho tất cả các bộ dữ liệu. Khi kết thúc quá trình, một bộ dữ liệu một phần gồm 48,067 ví dụ đã được thu được, trong đó chỉ có 4415 mẫu mắc đái tháo đường type 2.

Cả hai bộ dữ liệu MIMIC (tức là III và IV) đều có kích thước, theo số hàng tương ứng với các bệnh nhân riêng biệt, hơn 40,000 ví dụ. Các phương pháp truy xuất dữ liệu là giống nhau. Vì thông tin được trải rộng trên nhiều bảng, phương pháp tiếp cận được thực hiện là truy xuất, dựa trên một khóa định danh một lần nhập viện cụ thể của một bệnh nhân nhất định, mỗi đặc điểm riêng lẻ và sau đó kết hợp chúng vào một bảng duy nhất. Một số đặc trưng như tuổi, giới tính, HDL, và triglycerides có thể truy cập trực tiếp từ các mã định danh. Tuy nhiên, các đặc trưng khác, Tất cả các bệnh nhân có các dạng đái tháo đường khác ngoài type 2 đều bị loại trừ khỏi việc lựa chọn. Để có các giá trị glucose lúc đói, các giá trị được truy xuất tương ứng với các phân tích được thực hiện không muộn hơn mười giờ sáng, giả định rằng bệnh nhân đã nhịn ăn ít nhất tám giờ. Khi kết thúc giai đoạn này, 2997 bệnh nhân được trích xuất từ MIMIC-III, và chỉ 1576 từ MIMIC-IV, là tập con lớn nhất các bệnh nhân chứa tất cả các đặc điểm đòi hỏi một số bước bổ sung trước khi được truy xuất: BMI không có trong dữ liệu và do đó được tính toán từ cân nặng (w) và chiều cao (h) bằng công thức: BMI = w/h 2 . đặc điểm mà chúng tôi quan tâm. Khả năng lấp đầy các khoảng trống bị thiếu bằng các hàm tổng hợp trên dữ liệu hiện có đã bị loại bỏ, vì các khoảng trống rất lớn; trên thực tế, đối với một số Tất cả các bệnh nhân có các dạng đái tháo đường khác ngoài type 2 đều bị loại trừ khỏi việc lựa chọn. Để có các giá trị glucose lúc đói, các giá trị được truy xuất tương ứng với các phân tích được thực hiện không muộn hơn mười giờ sáng, giả định rằng bệnh nhân đã nhịn ăn ít nhất tám giờ. Khi kết thúc giai đoạn này, 2997 bệnh nhân được trích xuất từ MIMIC-III, và chỉ 1576 từ MIMIC-IV, là tập con lớn nhất các bệnh nhân chứa tất cả các đặc điểm mà chúng tôi quan tâm. Khả năng lấp đầy các khoảng trống bị thiếu bằng các hàm tổng hợp trên dữ liệu hiện có đã bị loại bỏ, vì các khoảng trống rất lớn; trên thực tế, đối với một số đặc trưng, lên tới 70% các hàng bị thiếu thông tin cụ thể đó. đặc trưng, lên tới 70% các hàng bị thiếu thông tin cụ thể đó. 4.3. Tiền xử lý Ở giai đoạn này, dữ liệu được truy xuất được sàng lọc, được mã hóa một cách thích hợp, và cuối cùng được hợp nhất vào một bộ dữ liệu duy nhất. Các hàng có ít nhất một giá trị không hợp lý cho bất kỳ đặc trưng nào hoặc có nó là null

(tức là nó không có giá trị) đã bị loại bỏ. Các giá trị không hợp lý được xem xét trên

4.3. Tiền xử lý các tiêu chí sau đây: (i) các giá trị huyết áp tâm trương vượt quá 220 mm/Hg; (ii) các giá trị

Ở giai đoạn này, dữ liệu được truy xuất được sàng lọc, được mã hóa một cách thích hợp, và cuối cùng được hợp nhất vào một bộ dữ liệu duy nhất. BMI lớn hơn 100 kg/m 2 ; (iii) các giá trị tuổi lớn hơn 100; (iv) các giá trị Triglyceride lớn hơn 900 (mg/dL). Các hàng bị loại bỏ do các giá trị không hợp lý là 95. Các giá trị ngoại lai (Outliers) không

Tại thời điểm này, các hàng từ ba bộ dữ liệu được nối lại với nhau và, vì số lượng người không mắc đái tháo đường lớn hơn nhiều so với số người mắc đái tháo đường, một sự lấy mẫu thiếu (under-sampling) của lớp thứ nhất đã được thực hiện, dẫn đến một bảng khoảng 13,000 hàng, với số lượng cân bằng người không mắc đái tháo đường và người mắc đái tháo đường. số lượng cân bằng người không mắc đái tháo đường và người mắc đái tháo đường. Tất cả dữ liệu trải qua một quá trình chuẩn hóa, vì các đặc điểm vector quan tâm có các đơn vị khác nhau.

Các hàng có ít nhất một giá trị không hợp lý cho bất kỳ đặc trưng nào hoặc có nó là null (tức là nó không có giá trị) đã bị loại bỏ. Các giá trị không hợp lý được xem xét trên các tiêu chí sau đây: (i) các giá trị huyết áp tâm trương vượt quá 220 mm/Hg; (ii) các giá trị BMI lớn hơn 100 kg/m 2 ; (iii) các giá trị tuổi lớn hơn 100; (iv) các giá trị Triglyceride lớn hơn 900 (mg/dL). Các hàng bị loại bỏ do các giá trị không hợp lý là 95. Các giá trị ngoại lai không bị loại bỏ. bị loại bỏ. Tại thời điểm này, các hàng từ ba bộ dữ liệu được nối lại với nhau và, vì số lượng người không mắc đái tháo đường lớn hơn nhiều so với số người mắc đái tháo đường, một sự lấy mẫu thiếu của lớp thứ nhất đã được thực hiện, dẫn đến một bảng khoảng 13,000 hàng, với số lượng cân bằng

Tất cả dữ liệu trải qua một quá trình chuẩn hóa, vì các đặc điểm vector quan tâm có các đơn vị khác nhau. 4.4. Mạng nơ-ron: Kiến trúc của Mô hình

Mạng nơ-ron được thiết kế như một kiến trúc kết nối đầy đủ nông (shallow fully connected), có

4.4. Mạng nơ-ron: Kiến trúc của Mô hình một lớp ẩn duy nhất. Kiến trúc này được đặc trưng bởi tính chất rằng mỗi nơ-ron

Mạng nơ-ron được thiết kế như một kiến trúc kết nối đầy đủ nông, có một lớp ẩn duy nhất. Kiến trúc này được đặc trưng bởi tính chất rằng mỗi nơ-ron trong mỗi lớp nhận các kết nối từ tất cả các nơ-ron trong lớp trước, ngoại trừ lớp đầu vào. Trong Hình 5, chúng tôi báo cáo một bản vẽ sơ đồ về kiến trúc của mạng nơ-ron. trong mỗi lớp nhận các kết nối từ tất cả các nơ-ron trong lớp trước, ngoại trừ lớp đầu vào. Trong Hình 5, chúng tôi báo cáo một bản vẽ sơ đồ về kiến trúc của mạng nơ-ron.

Hình 5. Sơ đồ minh họa kiến trúc của mạng nơ-ron. Lớp đầu vào được đại diện bởi ô vuông màu xám, với các lớp ẩn và lớp đầu ra được mô tả bằng màu xanh dương. Các hàm kích hoạt Hình 5. Sơ đồ minh họa kiến trúc của mạng nơ-ron. Lớp đầu vào được đại diện bởi ô vuông màu xám, với các lớp ẩn và lớp đầu ra được mô tả bằng màu xanh dương. Các hàm kích hoạt được sử dụng được chỉ ra bằng màu đỏ. Số đơn vị trên mỗi lớp được chỉ định bên trong mỗi ô vuông tương ứng.

được sử dụng được chỉ ra bằng màu đỏ. Số đơn vị trên mỗi lớp được chỉ định bên trong mỗi

ô vuông tương ứng.

## 4.5. Kiểm định

4.5. Kiểm định Một khi bộ dữ liệu đã cân bằng, nó được chia thành hai tập con: một tập huấn luyện có kích thước 80% của tổng số, và một tập kiểm tra với 20% còn lại. Tập trước ban đầu được sử dụng cho việc tìm kiếm tối ưu số nút trong lớp ẩn của mạng nơ-ron. Trên thực tế, nó được phân chia thêm, theo tỷ lệ 80:20, thành một tập huấn luyện bổ sung Một khi bộ dữ liệu đã cân bằng, nó được chia thành hai tập con: một tập huấn luyện có kích thước 80% của tổng số, và một tập kiểm tra với 20% còn lại. Tập trước ban đầu được sử dụng cho việc tìm kiếm tối ưu số nút trong lớp ẩn của mạng nơ-ron. Trên thực tế, nó được phân chia thêm, theo tỷ lệ 80:20, thành một tập huấn luyện bổ sung và một tập kiểm định. Một tìm kiếm lưới được thực hiện trên hai tập này trong một không gian tìm kiếm, được hiểu là số nút, bằng khoảng [5,15]. Đối với việc tìm kiếm thuật toán tối ưu hóa tốt nhất, tập huấn luyện thứ nhất được sử dụng, trên đó một kiểm định chéo k-fold với k = 9 đã được áp dụng, với các thí nghiệm được lặp lại 11 lần. Các thuật toán được xem xét là Adam, SGD,

và một tập kiểm định. Một tìm kiếm lưới được thực hiện trên hai tập này trong một không gian tìm kiếm, được

hiểu là số nút, bằng khoảng [5,15]. Đối với việc tìm kiếm thuật toán tối ưu

hóa tốt nhất, tập huấn luyện thứ nhất được sử dụng, trên đó một kiểm định chéo k-fold với

## Tài liệu tham khảo

1. American Diabetes Association Professional Practice Committee. 2. Classification and Diagnosis of Diabetes: Standards of Medical Care in Diabetes-2022. Diabetes Care 2022 , 45 (Suppl. S1), S17-S38. [CrossRef] [PubMed]
2. Sun, H.; Saeedi, P.; Karuranga, S.; Pinkepank, M.; Ogurtsova, K.; Duncan, B.B.; Stein, C.; Basit, A.; Chan, J.C.N.; Mbanya, J.C.; et al. IDF Diabetes Atlas: Global, regional and country-level diabetes prevalence estimates for 2021 and projections for 2045. Diabetes Res. Clin. Pract. 2022 , 183 , 109119. [CrossRef] [PubMed]
3. International Diabetes Federation. IDF Diabetes Atlas , 10th ed.; International Diabetes Federation: Brussels, Belgium, 2021. Available online: https://www.diabetesatlas.org (accessed on 15 February 2023).
4. Liu, P.R.; Lu, L.; Zhang, J.Y.; Huo, T.T.; Liu, S.X.; Ye, Z.W. Application of Artificial Intelligence in Medicine: An Overview. Curr. Med. Sci. 2021 , 41 , 1105-1115. [CrossRef] [PubMed]
5. Chicco, D.; Heider, D.; Facchiano, A. Editorial: Artificial Intelligence Bioinformatics: Development and Application of Tools for Omics and Inter-Omics Studies. Front. Genet. 2020 , 11 , 309. [CrossRef]

RSM-prop, và Levenberg-Marquardt (LM). Một tổ hợp gồm 99 mô hình được tạo ra cho mỗi bộ tối ưu hóa, hiệu suất của chúng được đánh giá trên tập kiểm tra. Đường cong ROC và giá trị AUC thu được cũng được tính toán trên tập kiểm tra này.

## 4.6. Các biểu đồ hiệu chuẩn

Có thể có việc các mô hình thống kê tạo ra các dự đoán chưa được hiệu chuẩn, có nghĩa là các giá trị dự đoán thiếu xác suất bao phủ danh nghĩa. Các xác suất xuất hiện cho các loài phổ biến trong phân loại học máy khiến điều này dễ nhận thấy nhất. Trước khi đánh giá hoặc lấy trung bình các dự đoán xác suất chưa hiệu chuẩn theo cách xác suất, trước tiên chúng nên được hiệu chuẩn [45]. Người ta đã chỉ ra rằng sự hiệu chuẩn của một mô hình, hay mức độ các nguy cơ được tính toán khớp với tỷ lệ sự kiện được quan sát, có tác động đến tính hữu ích lâm sàng [46].

## 5. Kết luận

Nghiên cứu chứng minh tiềm năng của các bộ phân loại nhị phân được huấn luyện từ đầu để tổng quát hóa sự khởi phát của đái tháo đường trong các mối quan hệ phi tuyến với các phép đo cụ thể trên bệnh nhân. Nghiên cứu cắt bỏ (ablation study) đã tiết lộ rằng một tổ hợp các bộ phân loại nhị phân với kiến trúc nông được tối ưu hóa bằng thuật toán Adam đã đạt được một mức độ chính xác thỏa đáng (khoảng 86% trên tập kiểm tra) và một giá trị ROC AUC là 0.934.

Phương pháp tiếp cận dựa trên mạng nơ-ron này có thể cung cấp thông tin chính xác cho y học cá nhân hóa, khiến nó trở thành một tài nguyên có giá trị cho việc ra quyết định.

Các nghiên cứu sâu hơn kết hợp nhiều thông tin của cùng một bệnh nhân theo thời gian có thể dẫn đến sự phát triển của một mô hình tiên tiến cho việc phòng ngừa bệnh. Điều này sẽ có thể bằng cách nhận diện các mẫu hình, chẳng hạn như các mẫu hình ngữ cảnh trong các xu hướng của các phép đo, sử dụng các mạng nơ-ron tiên tiến như các mô hình Long-Short-Term-Memory.

Tài liệu bổ sung: Thông tin hỗ trợ sau đây có thể được tải xuống tại: https://www.mdpi.com/article/10.3390/ijms24076775/s1.

Đóng góp của tác giả: Khái niệm hóa, A.A., A.F. và R.T.; phương pháp luận, A.A., F.B., A.F. và R.T.; phần mềm, A.A. và S.B.; kiểm định, D.G. và F.B.; phân tích chính thức, A.A. và S.B.; điều tra, A.A. và S.B.; quản lý dữ liệu, A.A. và S.B.; viết-chuẩn bị bản thảo gốc, A.A., D.G. và A.F.; viết-rà soát và biên tập, D.G., F.B., A.F. và R.T.; giám sát, A.F. và R.T. Tất cả các tác giả đã đọc và đồng ý với phiên bản được xuất bản của bản thảo.

Tài trợ: D.G. được hỗ trợ trong khuôn khổ của 'CIR01\_00017-'CNRBiOmics Centro Nazionale di Ricerca in Bioinformatica per le Scienze Omiche'-Rafforzamento del capitale umano'-CUP B56J20000960001.

Tuyên bố của Hội đồng Đánh giá Thể chế: Không áp dụng.

Tuyên bố Đồng ý Có thông tin: Không áp dụng.

Tuyên bố về Tính sẵn có của Dữ liệu: Dữ liệu được sử dụng trong nghiên cứu này là từ các bộ dữ liệu công khai (xem Mục 4).

Xung đột Lợi ích: Các tác giả tuyên bố không có xung đột lợi ích.

6. Chicco, D.; Facchiano, A.; Tavazzi, E.; Longato, E.; Vettoretti, M.; Bernasconi, A.; Avesani, S.; Cazzaniga, P. (Eds.) Computational Intelligence Methods for Bioinformatics and Biostatistics. In Proceedings of the 17th International Meeting, CIBB 2021, Virtual Event, 15-17 November 2021; Springer: Cham, Switzerland, 2022. Available online: https://link.springer.com/book/10.1007/97 8-3-031-20837-9 (accessed on 15 February 2023).
7. Sheng, B.; Chen, X.; Li, T.; Ma, T.; Yang, Y.; Bi, L.; Zhang, X. An overview of artificial intelligence in diabetic retinopathy and other ocular diseases. Front. Public Health 2022 , 10 , 971943. [CrossRef]
8. Ellahham, S. Artificial Intelligence: The Future for Diabetes Care. Am. J. Med. 2020 , 133 , 895-900. [CrossRef]
9. Balasubramaniyan, S.; Jeyakumar, V.; Nachimuthu, D.S. Panoramic tongue imaging and deep convolutional machine learning model for diabetes diagnosis in humans. Sci. Rep. 2022 , 12 , 186. [CrossRef]
10. Zhang, K.; Liu, X.; Xu, J.; Yuan, J.; Cai, W.; Chen, T.; Wang, K.; Gao, Y.; Nie, S.; Xu, X.; et al. Deep-learning models for the detection and incidence prediction of chronic kidney disease and type 2 diabetes from retinal fundus images. Nat. Biomed. Eng. 2021 , 5 , 533-545. [CrossRef]
11. Tang, Y.; Gao, R.; Lee, H.H.; Wells, Q.S.; Spann, A.; Terry, J.G.; Carr, J.J.; Huo, Y.; Bao, S.; Landman, B.A. Prediction of type II diabetes onset with computed tomography and electronic medical records. In Multimodal Learning for Clinical Decision Support and Clinical Image-Based Procedures ; Lecture Notes in Computer Science; CLIP ML-CDS 2020 2020; Springer: Cham, Switzerland, 2020; pp. 13-23. [CrossRef]
12. Dietz, B.; Machann, J.; Agrawal, V.; Heni, M.; Schwab, P.; Dienes, J.; Reichert, S.; Birkenfeld, A.L.; Haring, H.U.; Schick, F.; et al. Detection of diabetes from whole-body MRI using deep learning. JCI Insight 2021 , 6 , e146999. [CrossRef]
13. Nomura, A.; Noguchi, M.; Kometani, M.; Furukawa, K.; Yoneda, T. Artificial Intelligence in Current Diabetes Management and Prediction. Curr. Diab. Rep. 2021 , 21 , 61. [CrossRef]
14. Ravaut, M.; Harish, V.; Sadeghi, H.; Leung, K.K.; Volkovs, M.; Kornas, K.; Watson, T.; Poutanen, T.; Rosella, L.C. Development and Validation of a Machine Learning Model Using Administrative Health Data to Predict Onset of Type 2 Diabetes. JAMA Netw. Open 2021 , 4 , e2111315. [CrossRef]
15. Rein, M.; Ben-Yacov, O.; Godneva, A.; Shilo, S.; Zmora, N.; Kolobkov, D.; Cohen-Dolev, N.; Wolf, B.-C.; Kosower, N.; LotanPompan, M.; et al. Effects of personalized diets by prediction of glycemic responses on glycemic control and metabolic health in newly diagnosed T2DM: A randomized dietary intervention pilot trial. BMC Med. 2022 , 20 , 56. [CrossRef]
16. Pavlovskii, V.V.; Derevitskii, I.V.; Kovalchuk, S.V. Hybrid genetic predictive modeling for finding optimal multipurpose multicomponent therapy. J. Comput. Sci. 2022 , 63 , 101772. [CrossRef]
17. Murphree, D.H.; Arabmakki, E.; Ngufor, C.; Storlie, C.B.; McCoy, R.G. Stacked classifiers for individualized prediction of glycemic control following initiation of metformin therapy in type 2 diabetes. Comput. Biol. Med. 2018 , 103 , 109-115. [CrossRef] [PubMed]
18. Abr à moff, M.D.; Lavin, P.T.; Birch, M.; Shah, N.; Folk, J.C. Pivotal trial of an autonomous AI-based diagnostic system for detection of diabetic retinopathy in primary care offices. NPJ Digit. Med. 2018 , 1 , 39. [CrossRef] [PubMed]
19. Yap, M.H.; Chatwin, K.E.; Ng, C.C.; Abbott, C.A.; Bowling, F.L.; Rajbhandari, S.; Boulton, A.J.M.; Reeves, N.D. A New Mobile Application for Standardizing Diabetic Foot Images. J. Diabetes Sci. Technol. 2018 , 12 , 169-173. [CrossRef]
20. Afsaneh, E.; Sharifdini, A.; Ghazzaghi, H.; Ghobadi, M.Z. Recent applications of machine learning and deep learning models in the prediction, diagnosis, and management of diabetes: A comprehensive review. Diabetol. Metab. Syndr. 2022 , 14 , 196. [CrossRef]
21. Fregoso-Aparicio, L.; Noguez, J.; Montesinos, L.; Garc í a-Garc í a, J.A. Machine learning and deep learning predictive models for type 2 diabetes: A systematic review. Diabetol. Metab. Syndr. 2021 , 13 , 148. [CrossRef]
22. Abbas, H.T.; Alic, L.; Erraguntla, M.; Ji, J.X.; Abdul-Ghani, M.; Abbasi, Q.H.; Qaraqe, M.K. Predicting long-term type 2 diabetes with support vector machine using oral glucose tolerance test. PLoS ONE 2019 , 14 , e0219636. [CrossRef] [PubMed]
23. Ismail, L.; Materwala, H.; Al Kaabi, J. Association of risk factors with type 2 diabetes: A systematic review. Comput. Struct. Biotechnol. J. 2021 , 19 , 1759-1785. [CrossRef]
24. National Health and Nutrition Examination Survey. National Center for Health Statistics, 1999-2018. Available online: https: //www.cdc.gov/nchs/nhanes/index.htm (accessed on 15 February 2023).
25. Johnson, A.; Pollard, T.; Mark, R. MIMIC-III Clinical Database (version 1.4). PhysioNet 2016 . [CrossRef]
26. Johnson, A.; Bulgarelli, L.; Pollard, T.; Horng, S.; Celi, L.A.; Mark, R. MIMIC-IV (version 2.1). PhysioNet 2022 . [CrossRef]
27. De, S.; Mukherjee, A.; Ullah, E. Convergence guarantees for RMSProp and Adam in non-convex optimization and and empirical comparison to Nesterov acceleration. arXiv 2018 , arXiv:1807.06766.
28. Hinton, G. Coursera Neural Networks for Machine Learning Lecture 6, 2018. Available online: https://www.coursera.org/learn/ neural-networks-deep-learning (accessed on 15 February 2023).
29. Bishop, C. Neural Networks for Pattern Recognition ; Oxford University Press: Oxford, UK, 1995; ISBN 9780198538646.
30. Bitzur, R.; Cohen, H.; Kamari, Y.; Shaish, A.; Harats, D. Triglycerides and HDL cholesterol: Stars or second leads in diabetes? Diabetes Care 2009 , 32 (Suppl. S2), S373-S377. [CrossRef]
31. Muhammad, I.F.; Bao, X.; Nilsson, P.M.; Zaigham, S. Triglyceride-glucose (TyG) index is a predictor of arterial stiffness, incidence of diabetes, cardiovascular disease, and all-cause and cardiovascular mortality: A longitudinal two-cohort analysis. Front. Cardiovasc. Med. 2023 , 9 , 1035105. [CrossRef]
32. Aikens, R.C.; Zhao, W.; Saleheen, D.; Reilly, M.P.; Epstein, S.E.; Tikkanen, E.; Salomaa, V.; Voight, B.F. Systolic Blood Pressure and Risk of Type 2 Diabetes: A Mendelian Randomization Study. Diabetes 2017 , 66 , 543-550. [CrossRef]

33. Malone, J.I.; Hansen, B.C. Does obesity cause type 2 diabetes mellitus (T2DM)? Or is it the opposite? Pediatr. Diabetes 2019 , 20 , 5-9. [CrossRef]
34. Gray, N.; Picone, G.; Sloan, F.; Yashkin, A. Relation between BMI and diabetes mellitus and its complications among US older adults. South Med. J. 2015 , 108 , 29-36. [CrossRef]
35. Kautzky-Willer, A.; Harreiter, J.; Pacini, G. Sex and Gender Differences in Risk, Pathophysiology and Complications of Type 2 Diabetes Mellitus. Endocr. Rev. 2016 , 37 , 278-316. [CrossRef]
36. Wang, Y.; Yang, P.; Yan, Z.; Liu, Z.; Ma, Q.; Zhang, Z.; Wang, Y.; Su, Y. The Relationship between Erythrocytes and Diabetes Mellitus. J. Diabetes Res. 2021 , 2021 , 6656062. [CrossRef] [PubMed]
37. Hornik, K.; Stinchcombe, M.; White, H. Multilayer feedforward networks are universal approximators. Neural Netw. 1989 , 2 , 359-366. [CrossRef]
38. Elveren, E.; Yumu¸ sak, N. Tuberculosis disease diagnosis using artificial neural network trained with genetic algorithm. J. Med. Syst. 2011 , 35 , 329-332. [CrossRef] [PubMed]
39. Ercal, F.; Chawla, A.; Stoecker, W.V.; Lee, H.C.; Moss, R.H. Neural network diagnosis of malignant melanoma from color images. IEEE Trans. Biomed. Eng. 1994 , 41 , 837-845. [CrossRef] [PubMed]
40. Cangelosi, D.; Pelassa, S.; Morini, M.; Conte, M.; Bosco, M.C.; Eva, A.; Sementa, A.R.; Varesio, L. Artificial neural network classifier predicts neuroblastoma patients' outcome. BMC Bioinform. 2016 , 17 (Suppl. S12), 347. [CrossRef]
41. Cao, Y.; Raoof, M.; Montgomery, S.; Ottosson, J.; Näslund, I. Predicting Long-Term Health-Related Quality of Life after Bariatric Surgery Using a Conventional Neural Network: A Study Based on the Scandinavian Obesity Surgery Registry. J. Clin. Med. 2019 , 8 , 2149. [CrossRef] [PubMed]
42. Courcoulas, A.P.; Christian, N.J.; O'Rourke, R.W.; Dakin, G.; Patchen Dellinger, E.; Flum, D.R.; Melissa Kalarchian, P.D.; Mitchell, J.E.; Patterson, E.; Pomp, A.; et al. Preoperative factors and 3-year weight change in the Longitudinal Assessment of Bariatric Surgery (LABS) consortium. Surg. Obes. Relat. Dis. 2015 , 11 , 1109-1118. [CrossRef] [PubMed]
43. Hatoum, I.J.; Blackstone, R.; Hunter, T.D.; Francis, D.M.; Steinbuch, M.; Harris, J.L.; Kaplan, L.M. Clinical Factors Associated With Remission of Obesity-Related Comorbidities After Bariatric Surgery. JAMA Surg. 2016 , 151 , 130-137. [CrossRef]
44. Wang, W.; Kiik, M.; Peek, N.; Curcin, V.; Marshall, I.J.; Rudd, A.G.; Wang, Y.; Douiri, A.; Wolfe, C.D.; Bray, B. A systematic review of machine learning models for predicting outcomes of stroke with structured data. PLoS ONE 2020 , 15 , e0234722. [CrossRef]
45. Dormann, C.F. Calibration of probability predictions from machine-learning and statistical models. Glob. Ecol Biogeogr. 2020 , 29 , 760-765. [CrossRef]
46. Van Calster, B.; Vickers, A.J. Calibration of Risk Prediction Models: Impact on Decision-Analytic Performance. Med. Decis. Mak. 2015 , 35 , 162-169. [CrossRef]

Tuyên bố từ chối trách nhiệm/Ghi chú của Nhà xuất bản: Các tuyên bố, ý kiến và dữ liệu chứa trong tất cả các ấn phẩm hoàn toàn thuộc về (các) tác giả và (các) cộng tác viên cá nhân chứ không phải của MDPI và/hoặc (các) biên tập viên. MDPI và/hoặc (các) biên tập viên từ chối trách nhiệm đối với bất kỳ thương tích nào cho con người hoặc tài sản do bất kỳ ý tưởng, phương pháp, hướng dẫn hoặc sản phẩm nào được đề cập đến trong nội dung.
