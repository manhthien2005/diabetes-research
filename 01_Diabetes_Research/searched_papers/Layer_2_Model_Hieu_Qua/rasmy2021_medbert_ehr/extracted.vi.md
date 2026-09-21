<!-- extracted by pdf-extract | engine=docling | pages=13 | ocr=False | tables=4/4 | density=1.09 | score=100 -->

1234567890():,;

## ARTICLE OPEN

## Med-BERT: các embedding ngữ cảnh hóa được tiền huấn luyện trên hồ sơ sức khỏe điện tử có cấu trúc quy mô lớn cho dự đoán bệnh

Laila Rasmy 1,3 , Yang Xiang 2,3 ✉ , Ziqian Xie 1,3 , Cui Tao 1 and Degui Zhi 1 ✉

Các mô hình dự đoán dựa trên học sâu (DL) từ hồ sơ sức khỏe điện tử (EHR) đem lại hiệu năng ấn tượng trong nhiều nhiệm vụ lâm sàng. Tuy nhiên, các mô hình này thường đòi hỏi các đoàn hệ huấn luyện lớn để đạt độ chính xác cao, gây cản trở việc áp dụng các mô hình dựa trên DL trong các kịch bản có dữ liệu huấn luyện hạn chế. Gần đây, bidirectional encoder representations from transformers (BERT) và các mô hình liên quan đã đạt những thành công to lớn trong lĩnh vực xử lý ngôn ngữ tự nhiên. Việc tiền huấn luyện BERT trên một kho ngữ liệu huấn luyện rất lớn sinh ra các embedding ngữ cảnh hóa có thể tăng cường hiệu năng của các mô hình được huấn luyện trên các bộ dữ liệu nhỏ hơn. Lấy cảm hứng từ BERT, chúng tôi đề xuất Med-BERT, vốn điều chỉnh khung BERT (ban đầu được phát triển cho lĩnh vực văn bản) cho lĩnh vực EHR có cấu trúc. Med-BERT là một mô hình embedding ngữ cảnh hóa được tiền huấn luyện trên một bộ dữ liệu EHR có cấu trúc gồm 28,490,650 bệnh nhân. Các thí nghiệm tinh chỉnh (fine-tuning) cho thấy Med-BERT cải thiện đáng kể độ chính xác dự đoán, nâng diện tích dưới đường cong đặc trưng vận hành của bộ thu (AUC) lên 1.21 -6.14% trong hai nhiệm vụ dự đoán bệnh từ hai cơ sở dữ liệu lâm sàng. Đặc biệt, Med-BERT đã tiền huấn luyện đạt hiệu năng đầy hứa hẹn trên các nhiệm vụ có tập huấn luyện tinh chỉnh nhỏ và có thể nâng AUC hơn 20% hoặc đạt một AUC cao bằng một mô hình được huấn luyện trên một tập huấn luyện lớn gấp mười lần, so với các mô hình học sâu không có Med-BERT. Chúng tôi tin rằng Med-BERT sẽ có lợi cho các nghiên cứu dự đoán bệnh với các bộ dữ liệu huấn luyện cục bộ nhỏ, giảm chi phí thu thập dữ liệu, và đẩy nhanh tốc độ chăm sóc sức khỏe có sự hỗ trợ của trí tuệ nhân tạo.

npj Digital Medicine (2021) 4:86  ; https://doi.org/10.1038/s41746-021-00455-y

## INTRODUCTION

Dự đoán bệnh có sự hỗ trợ của trí tuệ nhân tạo (AI) đã trải qua sự phát triển đáng kể trong những năm gần đây 1 -3 . Hiện nay, nó có thể cải thiện độ chính xác của chẩn đoán, cho phép phòng bệnh bằng cảnh báo sớm, hợp lý hóa việc ra quyết định lâm sàng, và giảm chi phí chăm sóc sức khỏe 4 -7 . Các công cụ AI mạnh mẽ, học máy quy ước tiên tiến 8 -10 , và các cách tiếp cận học sâu 11 -14 cũng đã được áp dụng rộng rãi trong mô hình hóa dự đoán lâm sàng và đạt được nhiều thành công. Với đủ mẫu huấn luyện, các mô hình học sâu có thể đạt hiệu năng tương đương hoặc thậm chí tốt hơn các chuyên gia lĩnh vực trong chẩn đoán một số bệnh nhất định 15 -19 . Một điều kiện tiên quyết của các phương pháp dựa trên học sâu điển hình là sự sẵn có của các bộ dữ liệu có chú thích lớn và chất lượng cao, vốn được dùng để mô hình hóa ngữ nghĩa phức tạp tiềm ẩn của lĩnh vực đầu vào càng nhiều càng tốt và để tránh dưới khớp (under-fitting) trong huấn luyện mô hình 20,21 . Tuy nhiên, dữ liệu EHR lớn thường không truy cập được vì nhiều lý do, bao gồm số ca hạn chế cho các tình trạng mới hoặc hiếm; khó khăn trong làm sạch và chú thích dữ liệu, đặc biệt nếu thu thập từ nhiều nguồn khác nhau; và các vấn đề quản trị cản trở việc thu thập dữ liệu 22 .

Học chuyển giao (transfer learning) được phát triển để giải quyết vấn đề này, theo đó một số biểu diễn trước tiên được tiền huấn luyện trên khối lượng lớn các bộ dữ liệu không chú thích rồi sau đó được điều chỉnh thêm để hướng dẫn các nhiệm vụ khác 23 . Một xu hướng gần đây trong học chuyển giao là dùng học tự giám sát trên các bộ dữ liệu tổng quát lớn để rút ra một mô hình tiền huấn luyện đa dụng nắm bắt cấu trúc nội tại của dữ liệu, có thể được áp dụng cho một nhiệm vụ cụ thể với một bộ dữ liệu cụ thể bằng tinh chỉnh. Mô thức tiền huấn luyện - tinh chỉnh này đã được chứng minh là cực kỳ hiệu quả trong xử lý ngôn ngữ tự nhiên (NLP) 24 -30 và, gần đây, thị giác máy tính 31,32 . Bidirectional encoder representations from transformers (BERT) là một trong những mô hình phổ biến nhất để xử lý các đầu vào tuần tự, ví dụ văn bản, với nhiều biến thể 29,33 -39 . BERT cũng đã được lĩnh vực lâm sàng đón nhận 33,34,40 . Tuy nhiên, các mô hình này được tiền huấn luyện trên văn bản lâm sàng và chỉ dành cho các nhiệm vụ NLP lâm sàng.

EHR có cấu trúc, là nguồn đầu vào chính cho dự đoán bệnh, cung cấp thông tin phong phú và có cấu trúc tốt phản ánh tiến triển bệnh của từng bệnh nhân và là một trong những nguồn tài nguyên giá trị nhất cho phân tích dữ liệu sức khỏe 41,42 . Điều chỉnh khung học chuyển giao cho EHR có cấu trúc là một ý tưởng tự nhiên dựa trên sự tương đồng giữa văn bản ngôn ngữ tự nhiên và EHR, tức là cả hai đều là các phương thức tuần tự gồm các token từ một bộ từ vựng lớn. Tuy nhiên, một ánh xạ một-một giữa các phần tử của ngôn ngữ tự nhiên và EHR có cấu trúc là không có sẵn.

Có một lượng tài liệu ngày càng tăng về học chuyển giao cho EHR. Một số nhà nghiên cứu trực tiếp tái sử dụng các lớp bên trong của các mô hình sâu đã huấn luyện (ví dụ RNN) cho một nhiệm vụ hiện có sang một nhiệm vụ mới 43 nhưng học chuyển giao kiểu này có thể quá gắn chặt với các nhiệm vụ cụ thể và khả năng tổng quát hóa của nó chưa được thiết lập rõ. Đối với học chuyển giao kiểu tiền huấn luyện, các nghiên cứu trước trên EHR có cấu trúc đã cho thấy một số thành công 44,45 nhưng chúng chủ yếu tập trung vào các embedding tĩnh như word2vec 24 và GloVe 25 , vốn không nắm bắt được thông tin ngữ cảnh sâu.

Trong công trình này, chúng tôi chọn khung BERT, bao gồm kiến trúc và phương pháp huấn luyện của nó, để huấn luyện các mô hình trên dữ liệu EHR lớn. Đáng chú ý, các khung embedding tiền huấn luyện ngữ cảnh hóa khác từ lĩnh vực NLP, như ULMFiT 46 và ELMo 26 , cũng có thể được thử nghiệm trong lĩnh vực EHR. Tuy nhiên, chúng tôi chọn BERT trong công trình này vì nó được áp dụng rộng rãi với thành công đã được chứng minh.

Theo hiểu biết tốt nhất của chúng tôi, chỉ có hai nghiên cứu liên quan trong tài liệu của lĩnh vực lâm sàng: BEHRT 47 và GBERT 48 . Tuy nhiên, các mô hình này có những hạn chế sau. BEHRT nhằm phát triển các mô hình tiền huấn luyện để dự đoán sự tồn tại của bất kỳ mã y khoa nào trong một số lần khám nhất định. Nó dùng các embedding vị trí

1 School of Biomedical Informatics, University of Texas Health Science Center at Houston, Houston, TX, USA. 2 Peng Cheng Laboratory, Shenzhen, China. 3 These authors contributed equally: Laila Rasmy, Yang Xiang, Ziqian Xie. ✉ email: xiangy@pcl.ac.cn; Degui.Zhi@uth.tmc.edu

1234567890():,;

2

| Bảng 1. So sánh Med-BERT với BEHRT và G-BERT từ nhiều góc độ.                        | Bảng 1. So sánh Med-BERT với BEHRT và G-BERT từ nhiều góc độ.                        | Bảng 1. So sánh Med-BERT với BEHRT và G-BERT từ nhiều góc độ.                        | Bảng 1. So sánh Med-BERT với BEHRT và G-BERT từ nhiều góc độ.                        |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Tiêu chí                                                                            | BEHRT                                                                               | G-BERT                                                                              | Med-BERT                                                                            |
| Type of input code                                                                  | Caliber code for diagnosis developed by a college in London                         | Selected ICD-9 code for diagnosis + ATC code for medication                         | ICD-9 + ICD-10 code for diagnosis                                                   |
| Vocabulary size                                                                     | 301                                                                                 | <4 K                                                                                | 82 K                                                                                |
| Pretraining data source                                                             | CPRD (primary care data) 63                                                         | MIMIC III (ICU data) 64                                                             | Cerner Health Facts (general EHR)                                                   |
| Input structure                                                                     | Code + visit + age embeddings                                                       | Code embeddings from ontology + visit embeddings                                    | Code + visit + code serialization embeddings                                        |
| Pretraining sample unit                                                             | Patient ' s visit sequence                                                          | Single visit                                                                        | Patient ' s visit sequence                                                          |
| Total number of pretraining patients                                                | 1.6M                                                                                | 20 K                                                                                | 20M                                                                                 |
| Average number of visits for each patient for pretraining                           | Not reported but >5                                                                 | <2                                                                                  | 8                                                                                   |
| Pretraining task                                                                    | Masked LM                                                                           | Modi fi ed Masked LM                                                                | Masked LM + prediction of prolonged length of stay in hospital                      |
| Evaluation task                                                                     | Diagnosis code prediction in different time windows                                 | Medication code prediction                                                          | Disease predictions according to strict inclusion/exclusion criteria                |
| Total number of patients in evaluation tasks                                        | 699 K, 391 K, and 342 K for different time windows                                  | 7 K                                                                                 | 50 K, 20 K, and 20 K for three task cohorts                                         |

các embedding để phân biệt các lần khám khác nhau và thêm một lớp tuổi để ngụ ý các thứ tự thời gian. Tuy nhiên, định nghĩa của các tác giả về diện tích dưới đường cong đặc trưng vận hành của bộ thu (AUC) là một định nghĩa phi tiêu chuẩn, khiến khó so sánh kết quả của họ với các nghiên cứu trước. G-BERT áp dụng một mô hình mạng nơ-ron đồ thị (GNN) để mở rộng ngữ cảnh của mỗi mã lâm sàng thông qua các ontology và huấn luyện chung các embedding GNN và BERT. Nó sửa đổi nhiệm vụ tiền huấn luyện masked language model (Masked LM) thành các nhiệm vụ đặc thù lĩnh vực, bao gồm tối đa hóa khoảng cách giữa các mã tồn tại và không tồn tại và dùng các loại mã khác nhau để dự đoán lẫn nhau. Tuy nhiên, các đầu vào của G-BERT đều là các mẫu một-lần-khám, vốn không đủ để nắm bắt thông tin ngữ cảnh dài hạn trong EHR. Ngoài ra, kích thước bộ dữ liệu tiền huấn luyện của họ không lớn, khiến khó đánh giá đầy đủ tiềm năng của nó. Hơn nữa, cả BEHRT lẫn G-BERT đều không dùng các nhiệm vụ dự đoán bệnh làm phép đánh giá mô hình tiền huấn luyện của họ bằng tinh chỉnh.

Để giảm nhẹ các vấn đề nêu trên và để đánh giá một mô hình embedding ngữ cảnh hóa tiền huấn luyện đặc thù cho dự đoán bệnh, chúng tôi thiết kế Med-BERT, một sự điều chỉnh phương pháp BERT cho phương thức EHR có cấu trúc. Med-BERT được huấn luyện trên dữ liệu chẩn đoán có cấu trúc được mã hóa bằng các mã International Classification of Diseases (ICD), khác với BERT gốc và hầu hết các biến thể của nó vốn được huấn luyện trên văn bản tự do. Lưu ý rằng chúng tôi cũng có thể bao gồm các loại mã khác như thuốc và xét nghiệm cận lâm sàng, và chúng tôi để việc khảo sát nó cho công trình tương lai.

Chúng tôi so sánh Med-BERT với BEHRT và G-BERT trong Bảng 1. Đáng chú ý, Med-BERT có bộ từ vựng lớn hơn nhiều và một đoàn hệ tiền huấn luyện lớn hơn nhiều so với hai mô hình kia, giúp cung cấp một phép kiểm tra thực tế cho các mô hình EHR dựa trên BERT. Kích thước đoàn hệ lớn hơn và các chuỗi lần khám dài hơn trong tập tiền huấn luyện của Med-BERT sẽ rất có lợi cho mô hình trong việc học ngữ nghĩa ngữ cảnh toàn diện hơn. Chúng tôi cũng tin rằng, bằng cách dùng một bộ từ vựng lớn và truy cập công khai, tức ICD-9 và ICD-10, và tiền huấn luyện mô hình trên một bộ dữ liệu đa cơ sở (Cerner), Med-BERT có khả năng dễ dàng triển khai tới các cơ sở và kịch bản lâm sàng khác nhau. Hơn nữa, trong tất cả các mô hình tiền huấn luyện này, chỉ Med-BERT đã được kiểm tra chéo thành công bằng một nhiệm vụ tinh chỉnh trên một nguồn dữ liệu bên ngoài (Truven).

Tương tự BEHRT và G-BERT, Med-BERT thực hiện vài sửa đổi đối với phương pháp BERT tổng thể để khớp với phương thức dữ liệu EHR. Med-BERT dùng các code embedding để biểu diễn mỗi mã lâm sàng, các visit embedding để phân biệt các lần khám, và cấu trúc transformer để nắm bắt các mối tương quan giữa các mã. Trong mỗi lần khám, chúng tôi định nghĩa các serialization embedding để biểu thị thứ tự tương đối của mỗi mã, trong khi cả BEHRT lẫn G-BERT đều không đưa vào thứ tự mã trong một lần khám. Ngoài ra, chúng tôi thiết kế một nhiệm vụ tiền huấn luyện đặc thù lĩnh vực là dự đoán thời gian nằm viện kéo dài (Prolonged LOS), một vấn đề lâm sàng phổ biến đòi hỏi mô hình hóa thông tin ngữ cảnh để đánh giá mức độ nặng của tình trạng sức khỏe của bệnh nhân theo tiến triển bệnh và không cần chú thích của con người. Chúng tôi kỳ vọng rằng việc thêm nhiệm vụ này có thể giúp mô hình học nhiều đặc trưng lâm sàng và ngữ cảnh hóa hơn cho mỗi chuỗi lần khám và tạo thuận lợi cho một số nhiệm vụ.

Tính hữu ích của Med-BERT tiền huấn luyện được đánh giá bằng tinh chỉnh trên hai nhiệm vụ dự đoán bệnh sau: dự đoán suy tim ở bệnh nhân đái tháo đường (DHF) và dự đoán khởi phát ung thư tụy (PaCa), dùng ba đoàn hệ bệnh nhân từ hai cơ sở dữ liệu EHR khác nhau là Cerner Health Facts ® và Truven Health MarketScan ® . Các nhiệm vụ này khác với các nhiệm vụ dự đoán tiền huấn luyện (Masked LM và Prolonged LOS) và do đó là các nhiệm vụ đánh giá tốt để kiểm tra khả năng tổng quát hóa của mô hình tiền huấn luyện. Ngoài ra, chúng tôi chọn các nhiệm vụ này vì chúng nắm bắt nhiều độ phức tạp hơn so với chỉ sự tồn tại của một số mã chẩn đoán nhất định, và dựa trên các thuật toán phenotyping đã được thiết lập, tích hợp thêm nhiều mẩu thông tin ngoài các mã chẩn đoán, như ràng buộc về cửa sổ thời gian, số lần xuất hiện chẩn đoán, thuốc, và các giá trị xét nghiệm cận lâm sàng.

Các thí nghiệm tinh chỉnh được tiến hành cho các mục đích sau: (1) kiểm tra các mức tăng hiệu năng khi thêm Med-BERT vào ba mô hình dự đoán tốt nhất hiện có; (2) so sánh Med-BERT với một embedding tiền huấn luyện không ngữ cảnh hóa, embedding kiểu word2vec lâm sàng 45 ; và (3) xem Med-BERT đóng góp bao nhiêu cho các dự đoán bệnh với các kích thước tập huấn luyện tinh chỉnh khác nhau.

Các đóng góp chính của chúng tôi được tóm tắt như sau:

- (1) Công trình này là minh chứng proof-of-concept đầu tiên cho thấy một mô hình kiểu BERT cho EHR có cấu trúc có thể đem lại mức tăng hiệu năng có ý nghĩa trong các nhiệm vụ mô hình hóa dự đoán hướng tới thực tế.
- (2) Chúng tôi thiết kế một cách sáng tạo một nhiệm vụ tiền huấn luyện liên-lần-khám đặc thù lĩnh vực, phổ biến trong dữ liệu EHR và hiệu quả trong việc nắm bắt ngữ nghĩa ngữ cảnh.
- (3) Công trình này là minh chứng đầu tiên về hiệu năng được nâng đáng kể so với các phương pháp tốt nhất hiện có trên nhiều nhiệm vụ lâm sàng với các đoàn hệ đã phenotype.

- (4) Công trình này là công trình đầu tiên trình bày khả năng tổng quát hóa của các mô hình EHR BERT bằng cách nâng hiệu năng trên một bộ dữ liệu (Truven) khác với bộ dữ liệu huấn luyện (Cerner).
- (5) Mức tăng hiệu năng của Med-BERT được quan sát trên tất cả các kích thước mẫu, chứng tỏ sức mạnh kích hoạt của các mô hình tiền huấn luyện cho các nhiệm vụ lâm sàng mà chỉ có dữ liệu huấn luyện hạn chế.
- (6) Chúng tôi cung cấp một công cụ trực quan hóa để chứng minh ngữ nghĩa phụ thuộc trong EHR, tạo thuận lợi cho khả năng diễn giải của mô hình.
- (7) Chúng tôi công bố các mô hình tiền huấn luyện và mã của chúng tôi, cho phép các nhà nghiên cứu khác ứng dụng.

## RESULTS

## Data source

Chúng tôi trích xuất các đoàn hệ của mình từ hai cơ sở dữ liệu: Cerner Health Facts ® (phiên bản 2017) (Cerner) và Truven Health MarketScan ® (Truven). Cerner là một cơ sở dữ liệu EHR đã khử định danh gồm hơn 600 bệnh viện và phòng khám ở Hoa Kỳ. Nó đại diện cho hơn 68 triệu bệnh nhân duy nhất và bao gồm dữ liệu dọc từ 2000 tới 2017. Cơ sở dữ liệu nghiên cứu Truven Health MarketScan ® (phiên bản 2015) là một bộ dữ liệu yêu cầu bồi thường (claims) ở cấp bệnh nhân đã khử định danh. Nó đại diện cho hơn 170 triệu bệnh nhân từ 2011 tới 2015 từ bảo hiểm thương mại, yêu cầu bồi thường bổ sung Medicare, và yêu cầu bồi thường Medicaid.

Đoàn hệ tiền huấn luyện của chúng tôi cho Med-BERT gồm 28 triệu bệnh nhân được trích xuất từ Cerner (Hình 1). Để đánh giá mô hình, chúng tôi trích xuất ba đoàn hệ đã phenotype, hai trong số đó từ Cerner (DHF-Cerner và PaCa-Cerner) và một từ Truven (PaCaTruven). Phân tích mô tả của các đoàn hệ này được trình bày trong Bảng 2, xem ' Methods ' : Cohort definition để biết chi tiết.

Cerner HealthFacts® Patients [68,696,329]

Patients with Diagnosis Information [39,398,846]

## The data modality of structured EHR

Chúng tôi định nghĩa dữ liệu EHR có cấu trúc của mỗi bệnh nhân là một chuỗi các lần khám, mỗi lần là một danh sách các mã. Đây là một cách phát biểu kinh điển thường dùng trong tài liệu 12,49 -51 . Các mã trong một lần khám có thể có thứ tự hoặc không có thứ tự. Nếu không có thứ tự, dữ liệu EHR cho mỗi bệnh nhân có thể được rút gọn thành một chuỗi các tập. Khung Med-BERT có thể xử lý cả các mã có thứ tự lẫn không thứ tự trong một lần khám. Trong bài báo này, chúng tôi có quyền truy cập tới mức ưu tiên của các mã chẩn đoán như được mã hóa bởi các nhân viên lập hóa đơn, ví dụ, chẩn đoán chính chủ yếu được gán ưu tiên thứ nhất, tiếp theo là chẩn đoán quan trọng thứ hai, v.v., và do đó chúng tôi mã hóa thông tin đó để đưa vào thứ tự.

Cả EHR có cấu trúc lẫn văn bản ngôn ngữ tự nhiên đều là dữ liệu tuần tự với các token. Do đó, phương thức dữ liệu của EHR tương tự văn bản theo nhiều cách. Tuy nhiên, dữ liệu EHR có các đặc điểm riêng biệt (Hình 2). Một so sánh trực tiếp giữa các phương thức dữ liệu của dữ liệu EHR có cấu trúc với văn bản ngôn ngữ tự nhiên được trình bày trong Bảng 3.

## Med-BERT architecture

Trong công trình này, chúng tôi về cơ bản dùng cùng kiến trúc transformer như trong bài báo BERT gốc 29 , bao gồm các embedding đa cấp và các transformer hai chiều. Chúng tôi cũng áp dụng các kỹ thuật tiền huấn luyện tương tự (cùng hàm mất mát cho các nhiệm vụ tiền huấn luyện masking và phân loại). Tuy vậy, do các khác biệt ngữ nghĩa giữa EHR và văn bản, việc điều chỉnh phương pháp BERT cho EHR có cấu trúc không hề tầm thường. Ví dụ, trong khi phương thức đầu vào của BERT gốc là một chuỗi từ 1 chiều, phương thức đầu vào của chúng tôi là EHR có cấu trúc được ghi theo kiểu đa lớp và đa quan hệ. Không có quy tắc rõ ràng về cách làm phẳng EHR có cấu trúc thành một chuỗi 1 chiều và cách mã hóa các ' cấu trúc ' của EHR có cấu trúc trong kiến trúc transformer BERT. Ngoài ra, chưa rõ cách tổ chức dữ liệu EHR hiệu quả để khớp với các đầu vào có cấu trúc của một mô hình tiền huấn luyện

Exclude Patients with wrong dates [196,319]

Exclude Patients with &lt;3 unique diagnosis codes [10,711,877]

Pretraining Cohort [28,490,650]

Hình 1 Quy trình chọn đoàn hệ tiền huấn luyện từ Cerner HealthFacts. Luồng bắt đầu từ trái sang phải. Số bệnh nhân được ghi trong dấu ngoặc vuông.

| Bảng 2. Phân tích mô tả của các đoàn hệ.        |             |            |             |             |
|-------------------------------------------------|-------------|------------|-------------|-------------|
| Characteristic                                  | Pretraining | DHF-Cerner | PaCa-Cerner | PaCa-Truven |
| Cohort size ( n )                               | 28,490,650  | 672,647    | 29,405      | 42,721      |
| Percent of patients with the event a            | 15%         | 14%        | 0.07%       | 0.06%       |
| Average age on last/index encounter (std)       | 41          | 61         | 65          | 63          |
| Gender - Male (%)                               | 45%         | 47%        | 45%         | 48%         |
| Race                                            |             |            |             |             |
| White (%)                                       | 68%         | 72%        | 77%         | NA          |
| African American (%)                            | 15%         | 16%        | 13%         |             |
| Asian/Paci fi c Islander (%)                    | 2%          | 2%         | 2%          |             |
| African American (%)                            | 2%          | 2%         | 1%          |             |
| Average number of visits per patient            | 8           | 17         | 7           | 19          |
| Average number of codes per patient             | 15          | 33         | 14          | 18          |
| Vocabulary size                                 | 82,603      | 26,427     | 13,071      | 7002        |
| ICD-10 codes (%)                                | 33.8%       | 13.3%      | 20.7%       | 0%          |

a Sự kiện cho tiền huấn luyện là một lần nằm viện kéo dài &gt;7 ngày. Sự kiện cho DHF-Cerner là sự phát triển suy tim cho bệnh nhân đái tháo đường. Sự kiện cho PaCa-Cerner và PaCa-Truven là chẩn đoán ung thư tụy và tỷ lệ phần trăm tính từ tổng dân số của bộ dữ liệu.

3

4

Hình 2 Một ví dụ về dữ liệu EHR có cấu trúc của một bệnh nhân giả định như sẽ có sẵn từ một hệ thống EHR điển hình (ví dụ Cerner hoặc Truven). Đối với bệnh nhân này, bốn lần khám với ngày tháng và loại lần tiếp xúc được tổ chức theo thứ tự thời gian ở phía dưới. Thông tin chi tiết bao gồm các mã nhân khẩu học và y khoa với dấu thời gian được hiển thị ở phía trên. Lưu ý rằng không phải tất cả thông tin đều được ghi, như trong hệ thống ghi EHR thực tế.

| Bảng 3. So sánh đặc điểm của dữ liệu EHR so với dữ liệu ngôn ngữ tự nhiên.          | Bảng 3. So sánh đặc điểm của dữ liệu EHR so với dữ liệu ngôn ngữ tự nhiên.                                                                                                                                                                                 | Bảng 3. So sánh đặc điểm của dữ liệu EHR so với dữ liệu ngôn ngữ tự nhiên.                                                                                          |
|------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Criteria                                                                           | Natural language                                                                                                                                                                                                                                            | EHR                                                                                                                                                                |
| Token granularity                                                                  | The basic token is a word, which is a compressed semantic unit in language and can express some basic meaning. But in many cases, an integrated semantic unit (e.g., a named entity or a prepositional phrase) requires the combination of multiple tokens. | The basic token is a clinical code, which can represent an integrated semantic unit, e.g., a disease description, a drug, or a procedure.                          |
| Syntactic: Hierarchical structure                                                  | A paragraph (document) contains multiple sentences, and a sentence contains multiple words.                                                                                                                                                                 | More complex, a patient ' s information contains multiple visits, and a visit contains multiple codes of different categories.                                     |
| Syntactic: Sequential order                                                        | Simple and clear.                                                                                                                                                                                                                                           | The visits are sorted sequentially according to time but the codes within a visit may be unordered or with certain prioritized orders.                             |
| Semantic                                                                           | Dependency relations among sentences (e.g., discourse relations) as well as words within each sentence (e.g., syntactic dependency, semantic roles) are clear.                                                                                              | Dependency relationships are not always clear, e.g., adjacent visits may be of little relevance owing to large time intervals.                                     |
| Time interval                                                                      | Regular, one between adjacent words.                                                                                                                                                                                                                        | Usually no explicit intervals between codes, and irregular intervals between adjacent visits.                                                                      |
| Data completeness                                                                  | Relatively complete for regular texts such as written language.                                                                                                                                                                                             | Usually incomplete and sometimes erroneous due to the nature of EHR.                                                                                               |
| Sequence length                                                                    | Within a relatively narrow range: the maximum sequence length of words in a sentence rarely reaches a hundred.                                                                                                                                              | More variable: a patient ' s medical records can include anywhere from one to hundreds of visits. In a single visit, a patient can have hundreds of medical codes. |

như BERT, và các nhiệm vụ đặc thù lĩnh vực thích hợp cho tiền huấn luyện là gì.

Hình 3 giới thiệu thiết kế của chúng tôi về các lớp embedding của Med-BERT để phù hợp với phương thức mới. Cụ thể, ba loại embedding được lấy làm đầu vào cho Med-BERT. Các embedding này được chiếu từ các mã chẩn đoán, thứ tự của các mã trong mỗi lần khám, và vị trí của mỗi lần khám và lần lượt được gọi là code embedding, serialization embedding, và visit embedding. Code embedding là các biểu diễn chiều thấp của mỗi mã chẩn đoán; serialization embedding biểu thị thứ tự tương đối, trong trường hợp của chúng tôi là thứ tự ưu tiên, của mỗi mã trong mỗi lần khám; và visit embedding được dùng để phân biệt mỗi lần khám trong chuỗi.

Khác với BERT, chúng tôi không dùng các token cụ thể [CLS] và [SEP] tại lớp đầu vào. Lựa chọn của chúng tôi chủ yếu do các khác biệt trong định dạng đầu vào của EHR và văn bản. Trong BERT, chỉ hai câu liền kề được đưa vào cho mỗi mẫu đầu vào, và token [SEP] đóng vai trò là dấu phân tách của hai câu cho nhiệm vụ tiền huấn luyện dự đoán câu kế tiếp. Tuy nhiên, dự đoán câu kế tiếp không có trong các nhiệm vụ của chúng tôi (như giải thích ở tiểu mục kế tiếp). Chúng tôi lập luận rằng các visit embedding có thể phân tách tốt mỗi lần khám và rằng việc thêm [SEP] sẽ chỉ là thừa. Trong BERT, token [CLS] được dùng chủ yếu để tóm tắt thông tin từ hai câu. Tuy nhiên, các chuỗi EHR thường dài hơn nhiều; ví dụ, một chuỗi có thể chứa mười lần khám trở lên, và đơn giản dùng một token tóm tắt sẽ tất yếu dẫn tới mất thông tin. Do đó, đối với các nhiệm vụ phân loại, dù là nhiệm vụ tiền huấn luyện prolonged LOS hay các nhiệm vụ dự đoán bệnh hạ nguồn, nơi thông tin của một chuỗi tầm xa thường cần thiết, chúng tôi thêm một lớp truyền thẳng (FFL) vào tổng đầu ra từ tất cả các mã trong các lần khám để biểu diễn một chuỗi, thay vì chỉ dùng một token đơn lẻ. Tất nhiên, cũng có thể dùng một lớp dự đoán RNN thay vì một FFL đơn giản trên đỉnh MedBERT.

## Pretraining Med-BERT

Chúng tôi dùng cùng thuật toán tối ưu và các siêu tham số được khuyến nghị (xem ' Implementation details ' ) của mô hình BERT gốc 29 trong giai đoạn tiền huấn luyện Med-BERT. Chúng tôi huấn luyện các tham số của mô hình Med-BERT trên thông tin chẩn đoán của một đoàn hệ gồm 20 triệu bệnh nhân dùng các nhiệm vụ sau.

Masked language model (Masked LM) . Nhiệm vụ này được thừa kế trực tiếp từ bài báo BERT gốc, vốn được dùng để dự đoán sự tồn tại của bất kỳ mã nào, cho trước ngữ cảnh của nó. Cụ thể, có 80% khả năng một mã bị thay bằng [MASK], 10% khả năng mã bị thay bằng một mã ngẫu nhiên, và 10% khả năng khác nó được giữ nguyên. Nhiệm vụ này là cốt lõi của mô hình embedding ngữ cảnh hóa.

Prediction of prolonged length of stay (Prolonged LOS) in hospital . Đối với nhiệm vụ phân loại, thay vì dùng các cặp câu hỏi - câu trả lời như trong BERT, chúng tôi quyết định chọn một vấn đề lâm sàng có tỷ lệ hiện mắc tương đối cao trong bộ dữ liệu tiền huấn luyện của chúng tôi và không đặc thù cho bệnh nào để đảm bảo khả năng tổng quát hóa tốt hơn của mô hình tiền huấn luyện. Ba chỉ số chất lượng chăm sóc thường dùng nhất — tử vong, tái nhập viện sớm, và Prolonged LOS trong bệnh viện — được chọn và kiểm tra. Qua so sánh, chúng tôi thấy các nhiệm vụ tử vong và tái nhập viện sớm tương đối dễ: mô hình nhanh chóng hội tụ tới độ chính xác &gt;99%. Do đó, chúng tôi chọn prolonged LOS, nhiệm vụ đánh giá mỗi bệnh nhân về việc liệu một biến cố nằm viện kéo dài (LOS &gt; 7 ngày) đã từng xảy ra trong toàn bộ chuỗi EHR của bệnh nhân hay chưa, làm một nhiệm vụ tiền huấn luyện. Chúng tôi dùng phiên bản đơn giản hóa này của dự đoán prolonged LOS bằng cách nhắm tới cấp bệnh nhân thay vì cấp lần khám để giảm độ phức tạp tiền huấn luyện. Ngoài ra, tương tự nhiệm vụ Masked LM, chúng tôi không nhằm định nghĩa một nhiệm vụ dự đoán tương lai thực sự trong giai đoạn tiền huấn luyện.

Chúng tôi thấy rằng nhiệm vụ prolonged LOS cho tiền huấn luyện tận dụng cấu trúc hai chiều của Med-BERT. Một prolonged LOS không chỉ phản ánh tình trạng sức khỏe của bệnh nhân được ghi trong các lần khám trước mà còn có tác động tới các lần khám sau. Mặt khác, các nhiệm vụ như dự đoán khởi phát bệnh hoặc tử vong sẽ luôn kết thúc tại lần khám cuối cùng của chuỗi bệnh nhân, dữ liệu đầu vào của nó chỉ có thể được xây dựng theo một chiều.

## Applying Med-BERT for downstream prediction tasks by fi netuning

Med-BERT, tương tự BERT, tuân theo mô thức tiền huấn luyện - tinh chỉnh. Bản thân mô hình tiền huấn luyện chỉ sinh ra embedding ngữ cảnh hóa cho mỗi token đầu vào. Mô hình xuất ra một embedding đa dụng và không trực tiếp xuất ra bất kỳ nhãn dự đoán nào. Đối với bất kỳ nhiệm vụ dự đoán hạ nguồn cụ thể nào, một lớp phân loại (đầu dự đoán) cần được thêm trên đỉnh mô hình Med-BERT. Có thể dùng một đầu dự đoán đơn giản như FFL trên đỉnh đầu ra tuần tự từ lớp Med-BERT cuối cùng. Đối với các mô hình dự đoán EHR, một đầu dự đoán thường dùng là RNN cuộn qua đầu ra của các token embedding.

Trong khi tinh chỉnh, theo BERT gốc, chúng tôi gắn một đầu dự đoán trên đỉnh kiến trúc Med-BERT. Các tham số của phần Med-BERT được tải và khởi tạo từ mô hình tiền huấn luyện, rồi các tham số của cả phần Med-BERT lẫn đầu dự đoán được cập nhật bằng gradient descent. Đầu vào của mô hình là dữ liệu từ một đoàn hệ huấn luyện đặc thù bệnh, mà chúng tôi gọi là đoàn hệ tinh chỉnh. Để hiểu các giá trị gia tăng do Med-BERT tiền huấn luyện đem lại (đặc biệt là tính hữu ích của dữ liệu huấn luyện lớn), chúng tôi so sánh kết quả của việc tinh chỉnh mô hình tiền huấn luyện và mô hình chưa huấn luyện (cùng kiến trúc với các lớp embedding token + segment + position được khởi tạo ngẫu nhiên và các lớp transformer đa đầu). Tất cả các mô hình được tinh chỉnh trên một tập kiểm định (một phần của đoàn hệ tinh chỉnh) và các con số được báo cáo là kết quả trên tập kiểm tra.

## Evaluation of Med-BERT

Chúng tôi tiến hành đánh giá trên hai nhiệm vụ dự đoán bệnh trên ba đoàn hệ từ hai cơ sở dữ liệu. Hai nhiệm vụ là DHF và PaCa. Chúng tôi dùng Cerner cho cả hai nhiệm vụ, tạo thành đoàn hệ DHF-Cerner và PaCa-Cerner; và dùng Truven chỉ cho nhiệm vụ dự đoán ung thư tụy, tạo thành đoàn hệ PaCa-Truven, để đánh giá khả năng tổng quát hóa. Các định nghĩa đoàn hệ chi tiết được trình bày trong phần ' Methods '. Khác với BEHRT và G-BERT, mà các nhiệm vụ đánh giá chỉ đơn giản là dự đoán một số mã nhất định tương tự các nhiệm vụ trong tiền huấn luyện, định nghĩa của chúng tôi về các nhiệm vụ dự đoán bệnh phức tạp hơn, vì nó đòi hỏi phenotyping từ nhiều góc độ, ví dụ sự tồn tại của một số mã chẩn đoán, đơn thuốc, thủ thuật, kết quả xét nghiệm cận lâm sàng, và đôi khi là tần suất các biến cố trong các cửa sổ thời gian định trước. Do đó, chúng tôi khẳng định các nhiệm vụ đánh giá của chúng tôi thực tế hơn (so với BEHRT) và hữu ích hơn trong việc thiết lập khả năng tổng quát hóa của Med-BERT.

Đối với cả ba nhiệm vụ, chúng tôi tiến hành ba thí nghiệm: (1) Ex-1: đánh giá Med-BERT có thể đóng góp thế nào cho các phương pháp tốt nhất hiện có; (2) Ex-2: so sánh Med-BERT với một embedding tĩnh kiểu word2vec lâm sàng tốt nhất hiện có, t-W2V (được huấn luyện trên toàn bộ đoàn hệ Cerner) 45 ; và (3) Ex-3: khảo sát mô hình tiền huấn luyện có thể giúp bao nhiêu trong học chuyển giao với các kích thước mẫu huấn luyện khác nhau.

Đối với mỗi nhiệm vụ tinh chỉnh, chúng tôi chọn ngẫu nhiên một tập con của đoàn hệ gốc và tiếp tục chia nó thành các tập huấn luyện, kiểm định, và kiểm tra với tỷ lệ 7:1:2. Vì chúng tôi có đủ bệnh nhân không được bao gồm trong tiền huấn luyện, chúng tôi ưu tiên gán các mẫu vào tập kiểm tra để đảm bảo các tập kiểm tra của chúng tôi không bao gồm bất kỳ bệnh nhân nào trước đó đã được đưa vào tập tiền huấn luyện Med-BERT. Để đo hiệu năng, chúng tôi dùng AUC làm độ đo đánh giá chính, vốn đã được nhiều nghiên cứu dự đoán bệnh trước đây áp dụng rộng rãi 12,14,52 . Các độ đo đánh giá hiệu năng bổ sung được báo cáo trong Supplementary Tables 1 và 2.

Đối với Ex-1, để đánh giá sức mạnh được tăng cường của Med-BERT tiền huấn luyện trên đỉnh các mô hình cơ sở tốt nhất hiện có, chúng tôi so sánh hiệu năng của chỉ các mô hình cơ sở và hiệu năng của các mô hình cơ sở trên đỉnh Med-BERT. Chúng tôi dùng GRU 53 , Bi-GRU 54 , và RETAIN 12 làm các mô hình mạng nơ-ron hồi quy (RNN) cơ sở. Trong khi các GRU được cho thấy là các mô hình cơ sở rất cạnh tranh,

6

chúng tôi cũng bao gồm RETAIN, một mô hình dự đoán bệnh phổ biến với hai GRU kèm attention. Chúng tôi cũng trình bày kết quả khi chỉ dùng Med-BERT; tức là chỉ FFL được thêm trên đỉnh lớp cuối cùng của Med-BERT. Mô hình chỉ-Med-BERT này sẽ cung cấp một đánh giá vượt ra ngoài các mô hình dựa trên RNN. Ngoài ra, để đánh giá tác động của tiền huấn luyện dùng dữ liệu lớn, chúng tôi so sánh hiệu năng của Med-BERT tiền huấn luyện với kiến trúc Med-BERT chưa huấn luyện. Để cho đầy đủ, chúng tôi cũng bao gồm logistic regression có điều chuẩn L2 (L2LR) và random forest (RF), hai phương pháp không học sâu phổ biến, dùng định dạng đầu vào multihot tiêu chuẩn, làm các mô hình cơ sở.

Đối với Ex-2, để so sánh Med-BERT với các embedding tĩnh, chúng tôi chọn mô hình t-W2V. Quyết định dùng t-W2V để đại diện cho các embedding tĩnh không ngữ cảnh hóa dựa trên một nghiên cứu trước 45 nơi các kỹ thuật embedding tĩnh khác nhau bao gồm word2vec 24 , fasttext 55 , và pointwise positive mutual information-singular value decomposition 56 được so sánh và t-W2V được thấy là hoạt động tốt nhất trong nhiệm vụ dự đoán bệnh được đánh giá. Đáng chú ý, Glove 25 là một lựa chọn thay thế đủ năng lực cho word2vec (w2c) cho embedding khái niệm EHR tĩnh nhưng nó được ghi nhận có hiệu năng tương đương với w2c. Do đó, chúng tôi chọn t-W2V làm cơ sở cho embedding tĩnh để thuận tiện.

Đối với Ex-3, để đánh giá giá trị gia tăng của Med-BERT với các kích thước huấn luyện tinh chỉnh khác nhau, chúng tôi chọn các mẫu với kích thước tăng dần từ dữ liệu huấn luyện cho mỗi đoàn hệ để tinh chỉnh. Theo trực giác, mô hình tiền huấn luyện sẽ hữu ích hơn khi kích thước huấn luyện nhỏ hơn, vì nó giúp tiêm vào một phạm vi kiến thức rộng hơn.

Đối với Ex-1 và Ex-2, nơi chúng tôi dùng toàn bộ đoàn hệ huấn luyện tinh chỉnh, chúng tôi báo cáo AUC trung bình và độ lệch chuẩn cho mỗi mô hình, dựa trên mười lần chạy với các trọng số đầu dự đoán được khởi tạo ngẫu nhiên. Đối với tất cả các vòng lặp trong Ex-3, chúng tôi tiến hành lấy mẫu bootstrap ngẫu nhiên mười lần và báo cáo AUC trung bình và độ lệch chuẩn cho mỗi đoàn hệ.

## Performance boost of Med-BERT on fi ne-tuning tasks

Bảng 4 trình bày các AUC cho Ex-1 trên ba nhiệm vụ đánh giá tinh chỉnh. Các xu hướng của các độ đo đánh giá hiệu năng bổ sung (Supplementary Tables 1 và 2) phần lớn nhất quán với xu hướng của AUC thể hiện trong Bảng 4 và Hình 4. Đối với DHF-Cerner, đáng chú ý là Bi-GRU + Med-BERT và RETAIN + Med-BERT đạt kết quả tốt nhất và hoạt động tương đương, theo sau là Med-

Bảng 4. Các giá trị AUC trung bình và độ lệch chuẩn (trong ngoặc) cho các phương pháp khác nhau cho ba nhiệm vụ đánh giá.

| Model                      | DHF-Cerner    | PaCa-Cerner   | PaCa-Truven   |
|----------------------------|---------------|---------------|---------------|
| GRU                        | 83.93 (0.13)  | 78.26 (0.84)  | 78.17 (0.21)  |
| GRU + t-W2V                | 83.95 (0.24)  | 80.08 (1)     | 77.54 (0.27)  |
| GRU + Med-BERT             | 85.14 (0.06)  | 82.13 (0.24)  | 80.37 (0.12)  |
| Bi-GRU                     | 82.82 (0.17)  | 76.09 (0.61)  | 76.79 (0.29)  |
| Bi-GRU + t-W2V             | 84.23 (0.06)  | 79.35 (0.27)  | 77.44 (0.22)  |
| Bi-GRU + Med-BERT          | 85.39 ( 0.05) | 82.23 ( 0.29) | 80.57 ( 0.21) |
| RETAIN                     | 83.28 (0.16)  | 79.68 (0.32)  | 78.02 (0.19)  |
| RETAIN + t-W2V             | 84.98 (0.02)  | 81.8 (0.17)   | 79.46 (0.18)  |
| RETAIN + Med-BERT          | 85.33 (0.09)  | 81.3 (0.55)   | 79.98 (0.17)  |
| Med-BERT_only (FFL)        | 85.18 (0.12)  | 81.67 (0.31)  | 79.98 (0.26)  |
| untrained Med-BERT only    | 82.76 (0.13)  | 75.16 (0.77)  | 75.9 (0.18)   |
| Logistic Regression (LR) a | 81.01 (0)     | 79.94 (0)     | 77.28 (0)     |
| Random Forest (RF) a       | 81.88 (0.08)  | 79.48 (0.31)  | 77.00 (0.12)  |

Các con số in đậm chỉ AUROC cao nhất cho mỗi nhiệm vụ.

BERT\_only và GRU + Med-BERT. Đối với mỗi mô hình cơ sở, việc thêm tW2V (trừ GRU) nói chung sẽ đạt kết quả tốt hơn, nhưng thêm Med-BERT cải thiện kết quả xa hơn nhiều. Điều đáng chú ý là những mô hình dựa trên học sâu mạnh mẽ đó, như GRU, Bi-GRU, và RETAIN vốn đã đạt trên 0.83 về AUC với dữ liệu huấn luyện tương đối lớn, ví dụ 50 K mẫu, việc thêm Med-BERT vẫn tạo một mức tăng hiệu năng đáng kể.

Đối với PaCa-Cerner, các xu hướng tương tự cũng được quan sát, theo đó BiGRU + Med-BERT, Med-BERT\_only, và GRU + Med-BERT nói chung vượt trội các phương pháp không có Med-BERT và việc thêm MedBERT nâng các AUC của các mô hình cơ sở lên 1.62 -6.14%. Đối với PaCa-Truven, AUC tốt nhất đạt được bởi GRU + Med-BERT, trong khi các mô hình liên quan tới Med-BERT khác cũng có kết quả tốt hơn các mô hình không có Med-BERT. Trên bộ dữ liệu Truven này, chúng tôi vẫn quan sát các mức tăng hiệu năng 1.96 -3.78%, mặc dù các AUC cải thiện trung bình có vẻ thấp hơn một chút so với trên PaCa-Cerner. Tuy nhiên, thật yên tâm khi thấy rằng Med-BERT có thể tổng quát hóa tốt tới một bộ dữ liệu khác mà phân phối dữ liệu của nó có thể khá khác với Cerner, nơi nó được tiền huấn luyện.

Là một thí nghiệm ablation, chúng tôi cũng thực hiện một so sánh giữa kết quả của Med-BERT tiền huấn luyện và kết quả của Med-BERT chưa huấn luyện, trong đó ' chưa huấn luyện ' nghĩa là chúng tôi không đưa vào mô hình dữ liệu EHR lớn cho một tiền huấn luyện tự giám sát mà chỉ tận dụng cấu trúc của nó. Bảng 4 cho thấy Med-BERT chưa huấn luyện hoạt động tệ hơn nhiều so với Med-BERT only và thậm chí không vượt trội phương pháp cơ sở logistic regression (LR) cho các nhiệm vụ dự đoán PaCa. Do đó, chúng tôi có thể kết luận rằng giai đoạn tiền huấn luyện đóng vai trò quan trọng hơn cho hiệu năng được nâng cao. Các trường hợp Med-BERT chưa huấn luyện không vượt trội LR cơ sở có khả năng do quá khớp, mặc dù chúng tôi đã dùng thực hành tiêu chuẩn của cả early stopping lẫn dropout để giảm khả năng quá khớp trong huấn luyện mô hình. Điều này có thể do thực tế là Med-BERT chưa huấn luyện là một mô hình tham số hóa quá mức (khoảng 17 triệu tham số) với một số lượng cấu hình khổng lồ, nên nó có thể quá khớp với dữ liệu huấn luyện 57 . Mặt khác, mô hình tiền huấn luyện bắt đầu với một cấu hình tốt vốn bền vững với một bộ dữ liệu rất lớn cho tiền huấn luyện, và do đó có khả năng tổng quát hóa tốt.

Đó là một thực hành tiêu chuẩn rằng mô hình BERT tiền huấn luyện không được dùng đơn lẻ cho dự đoán, mà cần một đầu dự đoán cho các nhiệm vụ tinh chỉnh 29 . Vì Med-BERT là một mô hình tiền huấn luyện không giám sát, tinh chỉnh nên được thực hiện với một số cấu hình nhất định cho các nhiệm vụ khác nhau, đặc biệt về định dạng dữ liệu đầu vào. Tuy nhiên, trong Bảng 4, chúng tôi quan sát thấy một mô hình Med-BERT chỉ với một FFL trên đỉnh lớp cuối cùng (Med-BERT\_only (FFL)) cũng có thể đạt hiệu năng cạnh tranh.

Trong Hình 4 chúng tôi cho thấy Med-BERT có thể giúp nâng hiệu năng dự đoán của các mô hình học sâu cơ sở bao nhiêu bằng cách kết hợp thông tin ngữ cảnh thông qua tiền huấn luyện. Trong biểu đồ đường của DHF-Cerner, chúng tôi nhận thấy rằng, không có Med-BERT, khó để chỉ GRU có một AUC vượt 0.65 khi cho ít hơn 1000 mẫu huấn luyện. Tuy nhiên, việc thêm Med-BERT làm tăng đáng kể các AUC khoảng 20% và giúp mô hình đạt 0.75, thậm chí khi huấn luyện trên 500 mẫu. Đối với BiGRU, các cải thiện đáng kể cũng có thể quan sát được, nhưng chúng không cao như đối với GRU. Đối với RETAIN, Med-BERT có vẻ hữu ích hơn khi tập huấn luyện chứa hơn 500 mẫu.

Đối với PaCa-Cerner, các cải thiện lớn khi thêm Med-BERT vào GRU và Bi-GRU được chứng minh cho gần như tất cả các kích thước huấn luyện. Đặc biệt, đối với Bi-GRU, Med-BERT giúp AUC đạt 0.75 khi huấn luyện chỉ trên 300 mẫu. Các biểu đồ cho PaCa-Truven cho thấy các xu hướng tương tự, nhưng các giá trị AUC tổng thể thấp hơn so với trên PaCa-Cerner khi huấn luyện trên các kích thước mẫu nhỏ hơn.

LR, một thuật toán học máy không-DL phổ biến, đóng vai trò nhất quán như một mô hình cơ sở cạnh tranh, đặc biệt trên các bộ dữ liệu

Hình 4 So sánh AUC dự đoán cho các tập kiểm tra khi huấn luyện trên các kích thước dữ liệu khác nhau trên các đoàn hệ khác nhau giữa các phương pháp có hoặc không có lớp Med-BERT tiền huấn luyện. Kết quả logistic regression (LR) được bao gồm làm cơ sở. a Đoàn hệ: DHF-Cerner, phương pháp: GRU; b đoàn hệ: DHF-Cerner, phương pháp: bidirectional GRU; c đoàn hệ: DHF-Cerner, phương pháp: RETAIN; d đoàn hệ: PaCa-Cerner, phương pháp: GRU; e đoàn hệ: PaCaCerner, phương pháp: bidirectional GRU; f đoàn hệ: PaCa-Cerner, phương pháp: RETAIN; g đoàn hệ: PaCa-Truven, phương pháp: GRU; h đoàn hệ: PaCa-Truven, phương pháp: bidirectional GRU; i đoàn hệ: PaCa-Truven, phương pháp: RETAIN. Các vùng bóng mờ chỉ độ lệch chuẩn.

Hình 5 Ví dụ về các kết nối khác nhau của cùng một mã, ' type 2 diabetes mellitus ' , trong các lần khám khác nhau. a Lần khám thứ nhất, b lần khám thứ hai. Các đường kết nối từ mã ở khung trái tới mã ở khung phải chỉ các attention của mô hình Med-BERT. Màu của đường chỉ đầu attention riêng lẻ, và cường độ của đường chỉ trọng số attention.

nhỏ. Thật vậy, đối với các kích thước huấn luyện nhỏ như 500 trở xuống trong thí nghiệm của chúng tôi, L2LR cho thấy hiệu năng khá tốt. Tuy nhiên, MedBERT vượt trội L2LR trong tất cả các nhiệm vụ dự đoán khi kích thước mẫu trên 1000.

## Visualization of attention patterns in Med-BERT

Med-BERT không chỉ đem lại cải thiện độ chính xác dự đoán mà còn cho phép diễn giải dự đoán. Thật thú vị và có ý nghĩa khi khám phá mô hình tiền huấn luyện đã học thế nào bằng cách dùng cấu trúc phức tạp và một khối lượng dữ liệu khổng lồ. Chúng tôi cho thấy vài ví dụ về cách các mã được kết nối với nhau theo các trọng số attention từ các lớp transformer, thành phần cốt lõi của Med-BERT.

Công cụ bertviz 58 được điều chỉnh và cải tiến để trực quan hóa tốt hơn các mẫu attention trong mỗi lớp của mô hình tiền huấn luyện. Chúng tôi thêm các token ' SEP ' giữa các lần khám chỉ cho mục đích trực quan hóa. Chúng tôi quan sát các mẫu riêng biệt trong các lớp khác nhau của mô hình. Trong mô hình tiền huấn luyện, trong sáu lớp của mô hình transformer BERT, các kết nối của hai lớp đầu tiên chủ yếu mang tính cú pháp, một số đầu attention bị giới hạn trong một lần khám, và một số chỉ tới cùng các mã qua các lần khám khác nhau. Trong hai lớp giữa, một số mẫu attention có ý nghĩa y khoa nắm bắt thông tin ngữ cảnh và phụ thuộc lần khám xuất hiện.

Đối với một vài lớp cuối cùng, các mẫu attention trở nên khuếch tán và khó diễn giải.

Hình 5 là một ví dụ về cùng một mã trong các lần khám khác nhau, cho thấy các mẫu attention khác nhau. Điều này chứng tỏ khả năng của Med-BERT trong việc học các biểu diễn ngữ cảnh hóa. Mã type 2 DM xuất hiện sớm hơn chủ yếu tập trung vào mã sử dụng insulin lâu dài trong cùng lần khám, nhưng mã đái tháo đường xuất hiện sau tập trung vào mã insulin, ở cả lần khám hiện tại lẫn các lần khám trước. Điều này có thể chỉ ra rằng mô hình học được mối quan hệ thời gian giữa các lần khám thông qua segment embedding. Thêm các ví dụ được cung cấp trong Supplementary Fig. 3.

Các mẫu attention của mô hình đã tinh chỉnh thì khác. Các mô hình đã tinh chỉnh thể hiện các mẫu phụ thuộc nhiệm vụ riêng biệt qua các lớp khác nhau, cho thấy khả năng tổng quát hóa và thích nghi của mô hình trong việc học các cấp kiến thức khác nhau trong các kịch bản thực tế. Hình 6 cung cấp một ví dụ về mô hình MedBERT đã tinh chỉnh trên bộ dữ liệu DHF-Cerner với attention hội tụ vào vài mã liên quan ở lớp thứ hai. Hình 7 là một ví dụ về mẫu attention ở lớp thứ tư của mô hình Med-BERT đã tinh chỉnh trên bộ dữ liệu PaCa-Cerner, nắm bắt mối tương quan liên quan giữa các mã chẩn đoán. Thêm các mẫu trực quan hóa có thể thấy trong Supplementary Fig. 3. Chúng tôi tin rằng các loại mẫu trực quan hóa này có thể giúp chúng tôi hiểu tốt hơn cơ chế bên trong của mô hình mạng nơ-ron và xây dựng giao tiếp tin cậy và tốt hơn về thông tin sức khỏe.

Hình 6 Ví dụ về các kết nối phụ thuộc trong đoàn hệ DHF-Cerner. Các đường kết nối từ mã ở khung trái tới mã ở khung phải chỉ các attention của mô hình Med-BERT. Màu của đường chỉ đầu attention riêng lẻ, và cường độ của đường chỉ trọng số attention.

Hình 7 Ví dụ về các kết nối phụ thuộc trong đoàn hệ PaCa-Cerner. Các đường kết nối từ mã ở khung trái tới mã ở khung phải chỉ các attention của mô hình Med-BERT. Màu của đường chỉ đầu attention riêng lẻ, và cường độ của đường chỉ trọng số attention.

## DISCUSSION

Med-BERT cho thấy sức mạnh của nó trong việc giúp cải thiện hiệu năng dự đoán trên nhiều nhiệm vụ với các cấu hình khác nhau, và nó đặc biệt hiệu quả trong các mô thức ' học chuyển giao cực hạn ', tức là tinh chỉnh chỉ trên vài trăm mẫu.

Các mô hình dự đoán dựa trên học sâu thường đòi hỏi ít nhất hàng nghìn mẫu. Các mô hình này cần học ngữ nghĩa phức tạp thông qua việc đưa vào các mẫu truyền tải các tiến triển bệnh tiềm ẩn khác nhau và thông tin ngữ cảnh biến thiên để chúng có thể có khả năng xử lý các ca chưa thấy phức tạp. Tuy nhiên, hầu hết các thuật toán học sâu không đủ trong việc mô hình hóa dữ liệu một cách toàn diện do hạn chế của chúng trong việc hiểu sâu các đầu vào. Các mô hình tiền huấn luyện có thể giải quyết tốt vấn đề này bằng cách dùng các cấu trúc tinh vi hơn để nắm bắt tốt hơn

10

ngữ nghĩa phức tạp của các đầu vào, hoạt động như một bình chứa kiến thức, và tiêm kiến thức vào các nhiệm vụ mới. Tương tự các mô hình tiền huấn luyện trên các lĩnh vực khác, Med-BERT, bằng cách dùng transformer hai chiều và cấu trúc sâu cũng như dữ liệu lớn, cũng đã được cho thấy trong nghiên cứu này là cực kỳ hữu ích khi chuyển giao sang các nhiệm vụ mới.

Masked LM và Prolonged LOS được thiết kế và bao gồm để củng cố việc mô hình hóa thông tin ngữ cảnh và để giúp thu thập các phụ thuộc tuần tự. Nhãn cho cả hai có thể được sinh theo cách không giám sát, tức là không cần chú thích của con người. Trong Masked LM, mục tiêu là dự đoán một mã bị che dùng thông tin tuần tự từ các chiều thuận và nghịch. Trong Prolonged LOS, mục tiêu là xác định liệu một bệnh nhân có liên quan tới bất kỳ lần khám nào là một lần nằm kéo dài hay không, điều cũng dựa vào các ngữ cảnh tích lũy. Chúng tôi tin rằng, bằng cách bao gồm các nhiệm vụ dự đoán từ cả cấp mã lẫn cấp bệnh nhân (chuỗi), Med-BERT có thể củng cố thêm việc học biểu diễn của các chuỗi EHR từ các mức độ chi tiết khác nhau.

Theo trực giác, một khởi tạo tham số tốt hơn của các mô hình học sâu có thể dẫn tới hiệu năng tốt hơn và hội tụ nhanh hơn. Tuy nhiên, các lợi ích này sẽ giảm dần với sự tăng trưởng của các mẫu huấn luyện. Chúng tôi coi 50 và 20 K là các quy mô mẫu chấp nhận được để huấn luyện các mô hình học sâu thỏa đáng (hội tụ). Tuy nhiên, khi chúng tôi thêm Med-BERT, các cải thiện đáng kể cũng có thể quan sát được. Ví dụ, RETAIN đạt hiệu năng thỏa đáng trên cả ba nhiệm vụ, nhưng việc thêm Med-BERT đem lại các cải thiện thêm 1.62 -2.05%. Ngoài ra, đối với GRU và Bi-GRU, mà các cấu trúc mô hình đơn giản hơn RETAIN, các cải thiện có thể lớn hơn nhiều, đưa các mô hình đơn giản này tới một mức tương đương hoặc thậm chí tốt hơn RETAIN. Hơn nữa, theo các kết quả của Med-BERT\_only, vốn cũng đạt hiệu năng tốt, chúng tôi có thể kết luận rằng Med-BERT có khả năng sẽ giải phóng các nhà nghiên cứu khỏi việc phát triển các mô hình phức tạp cho các vấn đề dự đoán bệnh.

Tương tự Med-BERT, phương pháp embedding tĩnh t-W2V cũng có thể đóng vai trò là một bộ tăng cường hiệu năng tốt cho các mô hình học sâu cơ sở. Tuy nhiên, các cải thiện của t-W2V nhỏ hơn so với Med-BERT trong hầu hết các trường hợp. Một lời giải thích có khả năng là t-W2V có hạn chế trong việc mô hình hóa thông tin chuỗi-dài, xét cấu trúc nông của nó và kích thước hạn chế của cửa sổ ngữ cảnh vốn không thể được đảm bảo hoạt động tốt trong mọi tình huống.

Trong thực hành, Med-BERT sẽ giúp giảm đáng kể gánh nặng gán nhãn dữ liệu, điều có thể thấy qua việc so sánh các kích thước mẫu huấn luyện cần thiết để đạt một số mức AUC nhất định. Ex-3 chứng minh tính hiệu quả của việc chuyển giao Med-BERT sang các nhiệm vụ dự đoán bệnh thực tế. Hầu hết các biểu đồ trong Hình 4 phản ánh rằng Med-BERT có thể nâng đáng kể hiệu năng của các mô hình cơ sở trên các mẫu nhỏ. Ví dụ, trong biểu đồ con đầu tiên của PaCa-Cerner trong Hình 4, nếu chúng ta vẽ một đường ngang qua vạch y 0.75, chúng ta sẽ thấy một yêu cầu 1000 mẫu cho GRU + MedBERT và hơn 10,000 mẫu cho chỉ GRU. Tương tự, chúng ta có thể thấy Bi-GRU + Med-BERT huấn luyện trên 5000 mẫu có thể cung cấp hiệu năng tốt hơn một chút so với chỉ Bi-GRU huấn luyện trên hơn 50,000 mẫu như xuất hiện trong Supplementary Table 2A.

Do đó, Med-BERT đưa hiệu năng mô hình ngang bằng với một tập huấn luyện lớn gấp gần mười lần. Chi phí thu thập dữ liệu của hơn 9000 mẫu này, vốn đôi khi có thể khá đắt, sẽ được tiết kiệm đáng kể bằng cách dùng Med-BERT. Trong tình huống này, với Med-BERT, các nhà nghiên cứu và bác sĩ lâm sàng có thể nhanh chóng có được một hiểu biết tổng quát và chấp nhận được về các tiến triển của các bệnh mới trước khi thu thập đủ các mẫu có chú thích.

Phải thừa nhận, mặc dù Med-BERT tăng cường sức mạnh cho các mô hình học sâu trên tất cả các kích thước mẫu huấn luyện được kiểm tra, các mô hình được Med-BERT tăng cường vẫn không vượt trội mô hình cơ sở không-học-sâu LR cho các kích thước mẫu huấn luyện nhỏ nhất ( n &lt; 500).

Điều này nhất quán với tài liệu rằng LR vẫn là một mô hình dự đoán cạnh tranh cho các kích thước mẫu huấn luyện nhỏ trong một số nghiên cứu 14 . LR hưởng lợi từ cấu trúc đơn giản và nông của nó, vốn dễ khớp hơn nhiều dựa trên thậm chí chỉ một vài mẫu so với cấu trúc phức tạp và không gian tham số khổng lồ của các mô hình học sâu. Tuy nhiên, lợi thế này dần yếu đi khi kích thước huấn luyện tăng. Do đó, trong thực hành, chúng tôi sẽ khuyến nghị dùng tinh chỉnh Med-BERT cho các kịch bản nơi kích thước mẫu huấn luyện đủ lớn (ví dụ n &gt; 500).

Bộ từ vựng của phiên bản hiện tại của Med-BERT là hợp của các mã ICD-9 và ICD-10 với 82,000 token. So với BEHRT và G-BERT, bộ từ vựng của chúng tôi có độ phủ rộng hơn và được áp dụng rộng rãi trong thực hành. Chúng tôi tin rằng nó sẽ tạo thuận lợi lớn cho khả năng chuyển giao của mô hình, vì ICD là một chuẩn thông tin sức khỏe toàn cầu được Tổ chức Y tế Thế giới khuyến nghị và được các cơ sở khác nhau từ hơn 100 quốc gia trên thế giới sử dụng. Điều này có thể được chứng minh trong đánh giá PaCa-Truven của chúng tôi, trong đó chúng tôi kiểm tra hiệu lực của các mô hình của mình dùng một đoàn hệ được trích xuất từ một bộ dữ liệu bảo hiểm y tế.

Trong công trình này, chúng tôi chọn BERT, một phương pháp embedding ngữ cảnh hóa tiên tiến trong NLP, cho phương thức EHR. Tuy nhiên, có các ý tưởng thay thế: như ULMFiT 46 , ELMo 26 GPTs 27,28,59 , v.v. Có lẽ cần đánh giá các phương án thay thế này cho tiền huấn luyện và tinh chỉnh trên EHR. Chúng tôi sẽ để nó cho công trình tương lai.

Vẫn còn vài hạn chế của công trình hiện tại. Thứ nhất, chúng tôi chỉ dùng thông tin chẩn đoán ở định dạng ICD. Thứ hai, chúng tôi không bao gồm độ dài các khoảng thời gian giữa các lần khám trong nghiên cứu này, điều có thể gây một số mất thông tin thời gian. Thứ ba, chúng tôi không khám phá đầy đủ thứ tự của các khái niệm trong mỗi lần khám, và thiết lập hiện tại dựa trên các ưu tiên mã có thể không đủ đáng tin cậy. Trong tương lai, sẽ tiến hành thêm nghiên cứu về thiết kế các nhiệm vụ tiền huấn luyện khác nhau, và các loại nhiệm vụ tinh chỉnh khác ngoài dự đoán bệnh cũng sẽ được kiểm tra. Chúng tôi cũng dự định bao gồm các nguồn khác, như thời gian, thuốc, thủ thuật, và xét nghiệm cận lâm sàng, làm đầu vào của Med-BERT. Ngoài ra, các trực quan hóa và diễn giải đặc thù nhiệm vụ là các lĩnh vực khác mà chúng tôi dự định khám phá.

Tóm lại, chúng tôi đề xuất Med-BERT, một mô hình embedding ngữ cảnh hóa được tiền huấn luyện trên một khối lượng lớn dữ liệu EHR có cấu trúc, và đánh giá thêm mô hình trong các nhiệm vụ dự đoán bệnh. Các định dạng đầu vào đặc thù lĩnh vực và các nhiệm vụ tiền huấn luyện được thiết kế. Các thí nghiệm sâu rộng chứng minh rằng Med-BERT có khả năng giúp nâng hiệu năng dự đoán của các mô hình học sâu cơ sở trên các kích thước mẫu huấn luyện khác nhau và có thể đạt các kết quả đầy hứa hẹn. Mô-đun trực quan hóa cho phép chúng tôi nhìn sâu hơn vào ngữ nghĩa tiềm ẩn của dữ liệu và các cơ chế hoạt động của mô hình, trong đó chúng tôi quan sát các ví dụ có ý nghĩa. Các ví dụ đó được các chuyên gia lâm sàng kiểm chứng thêm, chỉ ra rằng Med-BERT có thể nắm bắt ngữ nghĩa giữa các EHR trong cả tiền huấn luyện lẫn tinh chỉnh. Về mặt phương pháp luận, công trình của chúng tôi thiết lập tính khả thi và hữu ích của embedding ngữ cảnh hóa của dữ liệu EHR có cấu trúc. Về mặt thực tiễn, mô hình tiền huấn luyện của chúng tôi cho phép huấn luyện các mô hình dự đoán học sâu mạnh mẽ với các tập huấn luyện hạn chế.

## METHODS

## Med-BERT pretraining cohort

Cerner Health Facts ® (phiên bản 2017) là một cơ sở dữ liệu EHR đã khử định danh gồm hơn 600 bệnh viện và phòng khám ở Hoa Kỳ. Nó đại diện cho hơn 68 triệu bệnh nhân duy nhất và bao gồm dữ liệu dọc từ 2000 tới 2017. Cơ sở dữ liệu gồm dữ liệu cấp bệnh nhân, bao gồm nhân khẩu học, siêu thông tin lần tiếp xúc, chẩn đoán, thủ thuật, kết quả xét nghiệm, đơn thuốc, quản lý thuốc, dấu hiệu sinh tồn, vi sinh, các ca phẫu thuật, các quan sát lâm sàng khác, và các thuộc tính hệ thống y tế. Dữ liệu trong Health Facts ® được trích xuất trực tiếp từ các EMR của các bệnh viện mà Cerner có thỏa thuận sử dụng dữ liệu. Siêu thông tin lần tiếp xúc bao gồm việc xác định nhà thuốc, phòng xét nghiệm lâm sàng và vi sinh, và thông tin nhập viện và lập hóa đơn từ các địa điểm chăm sóc bệnh nhân liên kết. Tất cả các lần nhập viện, đơn thuốc và cấp phát, yêu cầu xét nghiệm, và mẫu bệnh phẩm đều được đóng dấu ngày và giờ, cung cấp một mối quan hệ thời gian giữa các mẫu điều trị và thông tin lâm sàng. Tập đoàn Cerner đã thiết lập các chính sách vận hành tuân thủ Health Insurance Portability and Accountability Act để thiết lập khử định danh cho Health Facts ® .

Trong giai đoạn tiền xử lý dữ liệu cho tiền huấn luyện, đối với mỗi bệnh nhân trong đoàn hệ, chúng tôi tổ chức các lần khám theo thứ tự thời gian và xếp hạng các mã chẩn đoán trong mỗi lần khám theo ba tiêu chí: (1) chẩn đoán được gắn cờ là hiện diện lúc nhập viện; (2) chẩn đoán được ghi nhận trong lần khám (ví dụ nằm viện) hoặc chỉ tại giai đoạn lập hóa đơn; và (3) ưu tiên chẩn đoán được cung cấp bởi cơ sở dữ liệu Cerner, chỉ một số ưu tiên của các chẩn đoán, ví dụ chẩn đoán chính/phụ (ưu tiên được cung cấp bởi cơ sở dữ liệu, nhưng nó có thể không phải là một xếp hạng ưu tiên hoàn hảo)

Đối với mỗi lần khám, chúng tôi trích xuất các mã chẩn đoán (được biểu diễn bởi ICD, Ninth Revision, Clinical Modification (ICD-9) và ICD, Tenth Revision, Clinical Modification (ICD-10)) và độ dài thời gian nằm viện. Sau đó chúng tôi xếp hạng các mã trong mỗi lần khám theo ba tiêu chí trên và xác định thứ tự bằng cách dùng (1) → (2) → (3) theo trình tự. Tuy nhiên, chúng tôi chỉ quan sát được các mức tăng hiệu năng rất hạn chế khi thêm thứ tự mã trong khi đánh giá, so với việc rải các mã ngẫu nhiên. Do đó, chúng tôi đặt nó ở đây như một placeholder và giả định rằng các thứ tự hiệu quả hơn có thể được định nghĩa trong tương lai.

Các bệnh nhân có ít hơn ba mã chẩn đoán trong hồ sơ cũng như những người có thông tin thời gian ghi sai, ví dụ ngày xuất viện trước ngày nhập viện, đã bị loại khỏi dân số. Tổng cộng, chúng tôi có 28,490,650 bệnh nhân duy nhất (Hình 1), được chia tiếp thành các tập huấn luyện, kiểm định, và kiểm tra theo tỷ lệ 7:1:2 trên cả giai đoạn tiền huấn luyện lẫn đánh giá.

## Diabetes heart failure cohort (DHF)

Ban đầu chúng tôi xác định 3,668,780 bệnh nhân có ít nhất một lần tiếp xúc với chẩn đoán đái tháo đường, dựa trên các mã ICD-9/10 liên quan. Chúng tôi quyết định loại các bệnh nhân có bất kỳ tiền sử đái tháo nhạt, đái tháo đường thai kỳ, đái tháo đường thứ phát, đái tháo đường sơ sinh (DM), hoặc DM type I khỏi đoàn hệ của chúng tôi, vì chúng tôi tập trung vào các bệnh nhân DM type II và cần tránh bất kỳ khả năng mã hóa sai nào, xét rằng hầu hết dữ liệu EHR dựa trên nhập liệu thủ công của người dùng và rằng có một khả năng liên quan cao về lỗi nhập liệu. Vì cùng lý do, chúng tôi quyết định bao gồm các bệnh nhân có hơn một lần tiếp xúc với một mã chẩn đoán đái tháo đường. Ngoài ra, đối với các bệnh nhân DM type II, chúng tôi kiểm chứng rằng chỉ số A1C của bệnh nhân là ≥ 6.5 hoặc rằng họ đang dùng một thuốc chống đái tháo đường, bao gồm metformin, chlorpropamide, glimepiride, glyburide, glipizide, tolbutamide, tolazamide, pioglitazone, rosiglitazone, sitagliptin, saxagliptin, alogliptin, linagliptin, repaglinide, nateglinide, miglitol, acarbose, hoặc insulin.

Đối với các ca này, chúng tôi xác định các bệnh nhân có biến cố suy tim (HF) (dùng các mã tương đương ICD-9, như 428, hoặc trong 404.03, 404.13, 402.11, 404.11, 402.01, 404.01, 402.91, 398.91, 404.93, và 404.91, hoặc các mã tương đương ICD-10, như I50%, hoặc trong I11.0, I09.81, I13.2, I97.13, I97.131, I13.0, và I97.130). Ngoài ra, chúng tôi kiểm chứng rằng các ca đủ điều kiện hoặc được kê một thuốc lợi tiểu, có B-type natriuretic peptide cao hoặc đã trải qua các thủ thuật liên quan, bao gồm lọc máu hoặc một thủ thuật liên quan tim nhân tạo theo 60 . Chúng tôi chỉ bao gồm những bệnh nhân báo cáo HF ít nhất 30 ngày sau lần tiếp xúc đầu tiên của họ với một mã DM type II và loại các bệnh nhân chỉ có một lần tiếp xúc HF.

Việc làm sạch dữ liệu thêm bao gồm loại các bệnh nhân có dữ liệu không chính xác hoặc không đầy đủ, ví dụ, các bệnh nhân được ghi nhận là đã tử vong trong khoảng giữa lần tiếp xúc đầu tiên của họ và biến cố của chúng tôi (lần tiếp xúc HF đầu tiên cho ca bệnh hoặc lần tiếp xúc cuối cho ca chứng) cũng như các bệnh nhân nhỏ hơn 18 tuổi tại lần chẩn đoán đái tháo đường đầu tiên của họ. Đoàn hệ cuối cùng được trình bày trong Supplementary Fig. 1 và bao gồm 39,727 ca bệnh và 632,920 ca chứng.

## Pancreatic cancer cohort (PaCa)

Dùng các mã ICD-9 bắt đầu bằng 157 và các mã ICD-10 bắt đầu bằng C25, ban đầu chúng tôi xác định khoảng 45,000 bệnh nhân ung thư tụy từ bộ dữ liệu Cerner Health Facts, trong đó 11,486 ca là các cá nhân từ 45 tuổi trở lên không báo cáo bất kỳ bệnh ung thư nào khác trước lần chẩn đoán ung thư tụy đầu tiên của họ đủ điều kiện đưa vào đoàn hệ này. Thêm chi tiết về định nghĩa đoàn hệ được trình bày trong Supplementary Fig. 2.

11

Tương tự, chúng tôi trích xuất một đoàn hệ PaCa từ Truven Health MarketScan ® Research Databases cho mục đích đánh giá. Truven Health MarketScan ® Research Databases (phiên bản 2015) là một họ các bộ dữ liệu nghiên cứu tích hợp đầy đủ dữ liệu sức khỏe cấp bệnh nhân đã khử định danh (y khoa, thuốc, và nha khoa), năng suất (vắng mặt tại nơi làm việc, khuyết tật ngắn và dài hạn, và bồi thường cho người lao động), kết quả xét nghiệm, đánh giá nguy cơ sức khỏe, các lần xuất viện, và hồ sơ y tế điện tử vào các bộ dữ liệu sẵn có cho nghiên cứu chăm sóc sức khỏe. Nó nắm bắt việc sử dụng lâm sàng, chi tiêu, và đăng ký theo từng người qua các dịch vụ nội trú, ngoại trú, thuốc kê đơn, và dịch vụ carve-out. Các cơ sở dữ liệu y khoa hằng năm bao gồm dữ liệu sức khỏe khu vực tư nhân từ ~350 đơn vị chi trả. Trong lịch sử, hơn 20 tỷ bản ghi dịch vụ có sẵn trong các cơ sở dữ liệu MarketScan. Các dữ liệu này đại diện cho trải nghiệm y khoa của các nhân viên được bảo hiểm và người phụ thuộc của họ đối với các nhân viên đang làm việc, người về hưu sớm, những người tiếp tục theo Consolidated Omnibus Budget Reconciliation Act, và người về hưu đủ điều kiện Medicare với các kế hoạch Medicare Supplementary do chủ lao động cung cấp. Hầu hết các mã chẩn đoán trong Truven là mã ICD-9, vì phiên bản cơ sở dữ liệu chúng tôi dùng là 2015, nhưng việc triển khai ICD-10 bắt đầu vào October 2015 61 .

## Implementation details

Đối với kiến trúc transformer của Med-BERT, chúng tôi dùng sáu lớp, sáu đầu attention, và một chiều ẩn là 192 ( L = 6, H = 192, A = 6). Chúng tôi đặt feed-forward/filter size là 64.

Đối với tiền huấn luyện, chúng tôi đặt độ dài chuỗi tối đa là 512 token. Chúng tôi che một mã chẩn đoán cho mỗi bệnh nhân trong Masked LM. Chúng tôi dùng bộ tối ưu BERT mặc định, bộ tối ưu AdamWeight decay. Chúng tôi dùng tốc độ học được khuyến nghị là 5e -5, và một tỷ lệ dropout là 0.1. Chúng tôi dùng mã TensorFlow của BERT gốc từ https://github.com/googleresearch/bert (phiên bản February 2019). Chúng tôi dùng một GPU Nvidia Tesla V100 đơn với dung lượng bộ nhớ đồ họa 32 GB, và chúng tôi huấn luyện mô hình trong một tuần cho hơn 45 triệu bước, mà mỗi bước gồm 32 bệnh nhân (batch size).

Trước khi tinh chỉnh, trước tiên chúng tôi chuyển mô hình tiền huấn luyện sang phiên bản PyTorch, dùng gói HuggingFace (phiên bản 2.3) 62 . Để tinh chỉnh, chúng tôi dùng codebase đã thiết lập của mình https://github.com/ZhiGroup/ pytorch\_ehr cho việc triển khai các mô hình BERT\_only, GRU, bi-GRU, và RETAIN với sửa đổi nhỏ để triển khai các embedding đa lớp thay vì các embedding cấp lần khám. Chúng tôi dùng bộ tối ưu Adam và một tốc độ học 1e -5 cho hầu hết các mô hình ngoại trừ GRU một chiều với embedding tĩnh mà với nó một tốc độ học 0.001 cho kết quả tốt nhất. Đối với các nhiệm vụ đánh giá, chúng tôi dùng các GPU Nvidia GeForce RTX 2080 Ti với bộ nhớ 12 GB.

Đối với L2LR và RF, chúng tôi dùng gói scikit-learn phiên bản 0.24. Chúng tôi dùng các siêu tham số mặc định cho cả bộ phân loại LR lẫn RF.

## On ethical data use related to this manuscript

IBM ® MarketScan ® Research Databases (trước đây là Truven ® ) chứa thông tin yêu cầu bồi thường chăm sóc sức khỏe cấp cá nhân, đã khử định danh, từ các chủ lao động, kế hoạch sức khỏe, bệnh viện, và các chương trình Medicare và Medicaid. Dữ liệu trong Health Facts ® được trích xuất trực tiếp từ EMR của các bệnh viện mà Cerner có thỏa thuận sử dụng dữ liệu. Cả IBM lẫn Tập đoàn Cerner đã thiết lập các chính sách vận hành tuân thủ Health Insurance Portability and Accountability Act để thiết lập khử định danh cho IBM ® MarketScan ® Research Databases và Health Facts ® . Việc sử dụng IBM ® MarketScan ® Research Databases và Cerner Health Facts ® bắt buộc tuân thủ tất cả các nghĩa vụ hợp đồng của nhà cung cấp; có liên quan đạo đức cụ thể là chỉ thị ràng buộc pháp lý rằng không người dùng nào của các dữ liệu này được phép cố tái định danh dữ liệu đã khử định danh. Là một biện pháp bảo vệ bổ sung, ở cấp cơ sở, các nhà nghiên cứu UTHealth dùng IBM ® MarketScan ® Research Databases và Cerner Health Facts ® cho các nghiên cứu của họ chịu sự giám sát và phê duyệt bởi Committee for the Protection of Human Subjects (UTHSC-H IRB) theo nghị định thư HSC-SBMI-13-0549. Việc sử dụng IBM ® MarketScan ® Research Databases và Cerner Health Facts ® cho nghiên cứu này được bao phủ bởi sự phê duyệt của Committee for the Protection of Human Subjects (UTHSC-H IRB) theo nghị định thư HSC-SBMI-13-0549.

## Reporting summary

Thêm thông tin về thiết kế nghiên cứu có trong Nature Research Reporting Summary liên kết với bài báo này.

12

## DATA AVAILABILITY

The data that support the fi ndings of this study are available from the Data Service Of fi ce at the University of Texas Health Science Center at Houston School of Biomedical Informatics (SBMI) but restrictions apply to the availability of these data, which were used under license from the data provider.

## CODE AVAILABILITY

To facilitate reproducibility and bene fi t other EHR-based studies, we shared our source code as well as our visualization tool on https://github.com/ZhiGroup/MedBERT. The pretrained models are available from the authors upon request and with permission of the SBMI Data Service Of fi ce.

Received: 27 May 2020; Accepted: 14 April 2021;

## REFERENCES

1. Jiang, F. et al. Arti fi cial intelligence in healthcare: past, present and future. Stroke Vasc. Neurol. 2 , 230 -243 (2017).
2. Yu, K.-H., Beam, A. L. &amp; Kohane, I. S. Arti fi cial intelligence in healthcare. Nat. Biomed. Eng. 2 , 719 -731 (2018).
3. Chen, M., Hao, Y., Hwang, K., Wang, L. &amp; Wang, L. Disease prediction by machine learning over big data from healthcare communities. IEEE Access 5 , 8869 -8879 (2017).
4. Wang, H. et al. Predicting hospital readmission via cost-sensitive deep learning. IEEE/ACM Trans. Comput. Biol. Bioinforma. 15 , 1968 -1978 (2018).
5. Davenport, T. &amp; Kalakota, R. The potential for arti fi cial intelligence in healthcare. Future Healthc. J. 6 , 94 (2019).
6. Lysaght, T., Lim, H. Y., Xa fi s, V. &amp; Ngiam, K. Y. AI-assisted decision-making in healthcare. Asian Bioeth. Rev. 11 , 299 -314 (2019).
7. Ahmed, Z., Mohamed, K., Zeeshan, S. &amp; Dong, X. Arti fi cial intelligence with multifunctional machine learning platform development for better healthcare and precision medicine. Database 2020 , baaa010 (2020). https://doi.org/10.1093/ database/baaa010.
8. Manogaran, G. &amp; Lopez, D. Health data analytics using scalable logistic regression with stochastic gradient descent. Int. J. Adv. Intell. Paradig. 10 , 118 -132 (2018).
9. Keerthika, T. &amp; Premalatha, K. An effective feature selection for heart disease prediction with aid of hybrid kernel SVM. Int. J. Bus. Intell. Data Min. 15 , 306 -326 (2019).
10. Sadek, R. M. et al. Parkinson ' s disease prediction using arti fi cial neural network. Int. J. Academic Health Med. Res. 3 , 1 -8 (2019).
11. Payan, A. &amp; Montana, G. Predicting Alzheimer ' s disease: a neuroimaging study with 3D convolutional neural networks. Preprint at http://arxiv.org/abs/ 1502.02506 (2015).
12. Choi, E. et al. RETAIN: An Interpretable Predictive Model for Healthcare using Reverse Time Attention Mechanism. Adv. Neural Inf. Process. Syst. 29 , 3504 -3512 (2016)
13. Choi, E., Bahadori, M. T., Schuetz, A., Stewart, W. F. &amp; Sun, J. Doctor AI: Predicting Clinical Events via Recurrent Neural Networks. In Machine Learning for Healthcare Conference, 301 -318 (MLHC, 2016).
14. Rajkomar, A. et al. Scalable and accurate deep learning with electronic health records. NPJ Digital Med. 1 , 18 (2018).
15. Esteva, A. et al. Dermatologist-level classi fi cation of skin cancer with deep neural networks. Nature 542 , 115 -118 (2017).
16. Poplin, R. et al. Prediction of cardiovascular risk factors from retinal fundus photographs via deep learning. Nat. Biomed. Eng. 2 , 158 (2018).
17. Coudray, N. et al. Classi fi cation and mutation prediction from non -small cell lung cancer histopathology images using deep learning. Nat. Med. 24 , 1559 -1567 (2018).
18. Chung, S. W. et al. Automated detection and classi fi cation of the proximal humerus fracture by using deep learning algorithm. Acta Orthop. 89 , 468 -473 (2018).
19. Shen, J. et al. Arti fi cial intelligence versus clinicians in disease diagnosis: systematic review. JMIR Med. Inform. 7 , e10010 (2019).
20. Sun, C., Shrivastava, A., Singh, S. &amp; Gupta, A. In Proceedings of the IEEE International Conference on Computer Vision, 843 -852.
21. Cho, J., Lee, K., Shin, E., Choy, G. &amp; Do, S. How much data is needed to train a medical image deep learning system to achieve necessary high accuracy? Preprint at https://arxiv.org/abs/1511.06348 (2015).
22. Gentil, M.-L. et al. Factors in fl uencing the development of primary care data collection projects from electronic health records: a systematic review of the literature. BMC Med. Inform. Decis. Mak. 17 , 139 (2017).
23. Pan, S. J. &amp; Yang, Q. A survey on transfer learning. IEEE Trans. Knowl. Data Eng. 22 , 1345 -1359 (2009).
24. Mikolov, T., Sutskever, I., Chen, K., Corrado, G. S. &amp; Dean, J. Distributed representations of words and phrases and their compositionality. In Advances in Neural Information Processing Systems, 3111 -3119 (NIPS, 2013).
25. Pennington, J., Socher, R. &amp; Manning, C. D. Glove: global vectors for word representation. In Proceedings of the 2014 Conference on Empirical Methods in Natural Language Processing (EMNLP) , 1532 -1543 (ACL, 2014).
26. Peters, M. et al. Deep Contextualized Word Representations. in Proceedings of the 2018 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long Papers) , 2227 -2237 (ACL, 2018).
27. Radford, A., Narasimhan, K., Salimans, T. &amp; Sutskever, I. Improving language understanding by generative pre-training. https://s3-us-west-2.amazonaws.com/ openai-assets/researchcovers/languageunsupervised/ languageunderstandingpaper.pdf (2018).
28. Radford, A. et al. Language models are unsupervised multitask learners. OpenAI Blog 1 , 9 (2019).
29. Devlin, J., Chang, M.-W., Lee, K. &amp; Toutanova, K. BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. in Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers) , 4171 -4186 (ACL, 2019).
30. Yang, Z. et al. XLNet: Generalized Autoregressive Pretraining for Language Understanding. In Advances in Neural Information Processing Systems 32, 5754 -5764 (NIPS, 2019).
31. Chen, T., Kornblith, S., Norouzi, M. &amp; Hinton, G. A Simple Framework for Contrastive Learning of Visual Representations. In International Conference on Machine Learning, 1597 -1607 (ICML, 2020).
32. Sun, C., Myers, A., Vondrick, C., Murphy, K. &amp; Schmid, C. VideoBERT: A Joint Model for Video and Language Representation Learning. In Proceedings of the IEEE International Conference on Computer Vision , 7464 -7473 (IEEE, 2019).
33. Lee, J. et al. BioBERT: a pre-trained biomedical language representation model for biomedical text mining. Bioinformatics 36 , 1234 -1240 (2020).
34. Alsentzer, E. et al. Publicly Available Clinical BERT Embeddings. In Proceedings of the 2nd Clinical Natural Language Processing Workshop, 72 -78 (ACL, 2019).
35. Zhang, Z. et al. ERNIE: Enhanced Language Representation with Informative Entities. In Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics , 1441 -1451 (ACL, 2019).
36. Lan, Z. et al. ALBERT: A Lite BERT for Self-supervised Learning of Language Representations. In International Conference on Learning Representations (ICLR, 2019).
37. Adhikari, A., Ram, A., Tang, R., Hamilton, W. L. &amp; Lin, J. Exploring the Limits of Simple Learners in Knowledge Distillation for Document Classi fi cation with DocBERT. In Proceedings of the 5th Workshop on Representation Learning for NLP, 72 -77 (ACL, 2020).
38. Pires, T., Schlinger, E. &amp; Garrette, D. How Multilingual is Multilingual BERT? In Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics , 4996 -5001 (ACL, 2019).
39. Beltagy, I., Lo, K. &amp; Cohan, A. SciBERT: a pretrained language model for scienti fi c text. In Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing and the 9th International Joint Conference on Natural Language Processing (EMNLP-IJCNLP ), 3606 -3611 (ACL, 2019).
40. Huang, K., Altosaar, J. &amp; Ranganath, R. ClinicalBert: modeling clinical notes and predicting hospital readmission. Preprint at http://arxiv.org/abs/1904.05342 (2019).
41. Jha, A. K. et al. Use of electronic health records in US hospitals. N. Engl. J. Med. 360 , 1628 -1638 (2009).
42. Blumenthal, D. &amp; Tavenner, M. The ' meaningful use ' regulation for electronic health records. N. Engl. J. Med. 363 , 501 -504 (2010).
43. Gupta, P., Malhotra, P., Narwariya, J., Vig, L. &amp; Shroff, G. Transfer learning for clinical time series analysis using deep neural networks. J. Healthc. Inform. Res. 4 , 112 -137 (2020).
44. Beam, A. L. et al. Clinical Concept Embeddings Learned from Massive Sources of Multimodal Medical Data. Pac. Symp. Biocomput. 25 , 295 -306 (2020).
45. Xiang, Y. et al. Time-sensitive clinical concept embeddings learned from large electronic health records. BMC Med. Inf. Decis. Mak. 19 , 58 (2019).
46. Howard, J. &amp; Ruder, S. Universal Language Model Fine-tuning for Text Classi fi cation. In Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), 328 -339 (ACL, 2018).
47. Li, Y. et al. BeHRt: transformer for electronic Health Records. Sci. Rep. 10 , 1 -12 (2020).
48. Shang, J., Ma, T., Xiao, C. &amp; Sun, J. Pre-training of Graph Augmented Transformers for Medication Recommendation. In Proceedings of the Twenty-Eighth International Joint Conference on Arti fi cial Intelligence , 5953 -5959 (IJCAI, 2019).

49. Ma, F. et al. Dipole: Diagnosis Prediction in Healthcare via Attention-based Bidirectional Recurrent Neural Networks. In Proceedings of the 23rd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining , 1903 -1911 (ACM, 2017).
50. Xiao, C., Ma, T., Dieng, A. B., Blei, D. M. &amp; Wang, F. Readmission prediction via deep contextual embedding of clinical concepts. PLoS ONE 13 , e0195024 (2018).
51. Xiang, Y. et al. Asthma exacerbation prediction and risk factor analysis based on a time-sensitive, attentive neural network: retrospective cohort study. J. Med. Internet Res. 22 , e16981 (2020).
52. Baytas, I. M. et al. Patient Subtyping via Time-Aware LSTM Networks. In Proceedings of the 23rd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining , 65 -74 (ACM, 2017).
53. Chung, J., Gulcehre, C., Cho, K. &amp; Bengio, Y. Empirical evaluation of gated recurrent neural networks on sequence modeling. In NIPS 2014 Workshop on Deep Learning, December 2014 (NIPS, 2014).
54. Zhao, R. et al. Machine health monitoring using local feature-based gated recurrent unit networks. IEEE Trans. Ind. Electron. 65 , 1539 -1548 (2017).
55. Bojanowski, P., Grave, E., Joulin, A. &amp; Mikolov, T. Enriching word vectors with subword information. Trans. Assoc. Comput. Linguist. 5 , 135 -146 (2017).
56. Levy, O., Goldberg, Y. &amp; Dagan, I. Improving distributional similarity with lessons learned from word embeddings. Trans. Assoc. Comput. Linguist. 3 , 211 -225 (2015).
57. Erhan, D. et al. Why Does Unsupervised Pre-training Help Deep Learning? J. Mach. Learn. Res. 11 , 625 -660 (2010).
58. Vig, J. A Multiscale Visualization of Attention in the Transformer Model. In Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics: System Demonstrations, 37 -42 (ACL, 2019).
59. Brown, T. et al. Language Models are Few-Shot Learners. Adv. Neural Inf. Process. Syst. 33 , 1877 -1901 (2020).
60. Hicks, K. A. et al. 2017 Cardiovascular and stroke endpoint de fi nitions for clinical trials. J. Am. Coll. Cardiol. 71.9 , 1021 -1034 (2018).
61. ICD-10 | CMS. http://www.cms.gov/Medicare/Coding/ICD10 (last accessed May 2021).
62. Wolf, T. et al. Transformers: State-of-the-Art Natural Language Processing. In Proceedings of the 2020 Conference on Empirical Methods in NaturalLanguage Processing: System Demonstrations (2020), 38 -45 (ACL, 2020)..
63. Herrett, E. et al. Data resource pro fi le: clinical practice research datalink (CPRD). Int. J. Epidemiol. 44 , 827 -836 (2015).
64. Johnson, A. E. et al. MIMIC-III, a freely accessible critical care database. Sci. Data 3 , 160035 (2016).

## ACKNOWLEDGEMENTS

We are grateful for our collaborators, David Aguilar, MD, Masayuki Nigo, MD, and Bijun S. Kannadath, MBBS, MS, for the helpful discussions on cohorts ' de fi nitions and results ' evaluation. This research was undertaken with the assistance of resources and services from the School of Biomedical Informatics Data Service, which is supported in part by CPRIT Grant RP170668. Speci fi cally, we would like to acknowledge the use of Cerner Health Facts ® and the IBM Truven MarketScan ™ datasets as well as the assistance provided by the UTHealth SBMI Data Service team to extract the data. The Nvidia GPU hardware is partly supported through Xiaoqian Jiang ' s UT Star Award. We are also grateful to the NVIDIA Corporation for supporting our research by donating a Tesla GPU. CT and DZ are supported by the American Heart Association under award number 19GPSGC35180031 and partly supported by the Cancer Prevention and Research Institute of Texas (CPRIT) Grant RP170668. LR is supported by UTHealth Innovation for Cancer Prevention Research Training Program Pre-Doctoral Fellowship (CPRIT Grant RP160015). The content is solely the responsibility of the authors and does not necessarily represent the of fi cial views of the Cancer Prevention and Research Institute of Texas.

## AUTHOR CONTRIBUTIONS

LR, YX, and ZX are co- fi rst authors. DZ initialized the conceptualization of the project. LR, YX, ZX, and DZ designed the methods. LR led the implementation of the methods, with substantial inputs from YX and ZX. YX and DZ led the design of experiments. LR conducted the experiments and produced results. ZX led the visualization. YX, LR, and DZ led the writing, with substantial inputs from ZX and CT. YX, DZ, and CT supervised the execution of the project.

## COMPETING INTERESTS

The authors declare no competing interests.

## ADDITIONAL INFORMATION

Supplementary information The online version contains supplementary material available at https://doi.org/10.1038/s41746-021-00455-y.

Correspondence and requests for materials should be addressed to Y.X. or D.Z.

Reprints and permission information is available at http://www.nature.com/ reprints

Publisher ' s note Springer Nature remains neutral with regard to jurisdictional claims in published maps and institutional af fi liations.

Open Access This article is licensed under a Creative Commons Attribution 4.0 International License, which permits use, sharing,

adaptation, distribution and reproduction in any medium or format, as long as you give appropriate credit to the original author(s) and the source, provide a link to the Creative Commons license, and indicate if changes were made. The images or other third party material in this article are included in the article ' s Creative Commons license, unless indicated otherwise in a credit line to the material. If material is not included in the article ' s Creative Commons license and your intended use is not permitted by statutory regulation or exceeds the permitted use, you will need to obtain permission directly from the copyright holder. To view a copy of this license, visit http://creativecommons. org/licenses/by/4.0/.

© The Author(s) 2021
