<!-- extracted by pdf-extract | engine=docling | pages=11 | ocr=False | tables=2/2 | density=1.06 | score=100 -->

## Tầm soát cơ hội đái tháo đường type 2 bằng học đo lường sâu (deep metric learning) sử dụng hồ sơ sức khỏe điện tử OPEN

Qixuan Jin 1  , Haoran Zhang 1 , Lukasz Szczerbinski 2,3,4,8,9 , Jiacheng Zhu 1 , Walter Gerych 1,13 , Xuhai Xu 12 , Kai Wang 5 , Sarah Hsu 2,3,4 , Ravi Mandla 2,3,4,10 , Aaron J. Deutsch 2,3,4,11 , Alisa Manning 3,4,7,11 , Josep M. Mercader 2,3,4,11 , Thomas Hartvigsen 6 , Miriam S. Udler 2,3,4,11 &amp; Marzyeh Ghassemi 1

Các mô hình học sâu khai thác hồ sơ sức khỏe điện tử (EHR) để tầm soát cơ hội đái tháo đường type 2 (T2D) có thể cải thiện các thực hành hiện tại bằng cách nhận diện những cá nhân có thể cần thêm xét nghiệm đường huyết. Dự đoán chính xác thời điểm khởi phát và phân nhóm dưới (subtyping) là rất quan trọng cho các can thiệp có mục tiêu, nhưng các phương pháp hiện có xử lý hai nhiệm vụ này riêng rẽ, do đó hạn chế tính hữu ích lâm sàng. Trong bài báo này, chúng tôi giới thiệu một mô hình học đo lường sâu (deep metric learning - DML) mới hợp nhất cả hai nhiệm vụ bằng cách học một không gian tiềm ẩn dựa trên độ tương đồng giữa các mẫu. Trong dự đoán khởi phát, mô hình DML dự đoán khởi phát T2D sau 7 năm với AUC là 0.754, vượt trội hơn hồi quy logistic (AUC 0.706), các yếu tố nguy cơ lâm sàng (AUC 0.693), và các chỉ số đường huyết (AUC 0.632). Đối với phân nhóm dưới, chúng tôi xác định ba phân nhóm dưới với các tỷ lệ hiện mắc khác nhau của các tình trạng liên quan đến béo phì, tim mạch, và sức khỏe tâm thần. Ngoài ra, phân nhóm dưới có ít bệnh đồng mắc hơn cho thấy việc khởi đầu metformin sớm hơn và mức giảm HbA1c lớn hơn. Chúng tôi đã kiểm chứng những phát hiện này bằng dữ liệu từ 300 bệnh viện ở Hoa Kỳ trong chương trình All of Us (T2D, n =  7567) và Massachusetts General Brigham Biobank (T2D, n =  3298), chứng minh khả năng chuyển giao của mô hình và các phân nhóm dưới của chúng tôi giữa các đoàn hệ (cohort).

Đái tháo đường type 2 (T2D) là một bệnh mạn tính, phức tạp ảnh hưởng đến khoảng 11% dân số Hoa Kỳ tính đến năm 2021 1 , với số ca toàn cầu được dự báo tăng từ 380 triệu vào năm 2013 lên 590 triệu vào năm 2035 2 . Bất chấp tỷ lệ hiện mắc ngày càng tăng, việc tầm soát vẫn dựa vào các tiêu chí đơn giản như tuổi và béo phì 3 trong khi các xét nghiệm chẩn đoán phụ thuộc vào HbA1c và mức glucose 4,5 , không nắm bắt được tính phức tạp của bệnh. T2D biểu hiện thông qua các cơ chế bệnh sinh riêng biệt, chẳng hạn như đề kháng insulin, rối loạn chức năng tế bào beta, khuynh hướng di truyền, và các yếu tố môi trường 6-8 .  Cách tiếp cận một-giải-pháp-cho-tất-cả (one-size-fits-all) hiện tại đối với phòng ngừa và quản lý là không đủ, nhấn mạnh nhu cầu phân nhóm dưới để cho phép các can thiệp có mục tiêu và y học chính xác (precision medicine).

Nhiều nỗ lực phân nhóm dưới T2D trước đây dựa vào các đặc trưng không được thu thập phổ biến trong thực hành thường quy 9 . Một nghiên cứu nền tảng đã xác định năm phân nhóm dưới với các quỹ đạo bệnh riêng biệt, nhưng việc tái lập đòi hỏi các dấu ấn sinh học chuyên biệt như chức năng tế bào beta và đề kháng insulin 10 .  Phân nhóm dưới di truyền cũng đã được khám phá 11 , mặc dù nó loại trừ các ảnh hưởng môi trường và thiếu tính khả thi lâm sàng trong dân số chung. Wagner và cộng sự đã xác định sáu cụm tiền đái tháo đường với các nguy cơ khác nhau về biến chứng T2D và tử vong, nhưng đòi hỏi thu thập các chỉ số đường huyết như nghiệm pháp dung nạp glucose đường uống và các đặc điểm nhân trắc học, hạn chế khả năng áp dụng vào thực hành lâm sàng 12 .

Để khắc phục những hạn chế này, nghiên cứu gần đây sử dụng dữ liệu hồ sơ sức khỏe điện tử (EHR) sẵn có để dự đoán và phân nhóm dưới T2D. Anderson và cộng sự đã chứng minh rằng các mô hình học máy được huấn luyện trên dữ liệu EHR toàn diện

1 Department of Electrical Engineering and Computer Science, Massachusetts Institute of Technology, Cambridge, MA, USA. 2 Diabetes Unit, Endocrine Division, Department of Medicine, Massachusetts General Hospital, Boston, MA,  USA. 3 Center  for  Genomic  Medicine,  Mass  General  Research  Institute,  Boston,  MA,  USA. 4 Programs  in Metabolism  and  Medical  &amp;  Population  Genetics,  Broad  Institute  of  MIT  and  Harvard,  Cambridge,  MA,  USA. 5 School of Computational Science and Engineering, Georgia Institute of Technology, Atlanta, GA, USA. 6 School of Data Science, University of Virginia, Charlottesville, VA, USA. 7 Clinical and Translational Epidemiology Unit, Mass General Research Institute, Boston, MA, USA. 8 Department of Endocrinology, Diabetology and Internal Medicine, Medical  University  of  Bialystok,  Bialystok,  Poland. 9 Clinical  Research  Centre,  Medical  University  of  Bialystok, Bialystok, Poland. 10 Cardiology Division, Department of Medicine and Cardiovascular Research Institute, University of  California  San  Francisco,  San  Francisco,  USA. 11 Department  of  Medicine,  Harvard  Medical  School,  Boston, MA, USA. 12 Department of Biomedical Informatics, Columbia University, New York, NY, USA. 13 Department of Computer Science, Worcester Polytechnic Institute, Worcester, USA.  email: qixuanj@mit.edu vượt trội hơn các mô hình sử dụng các yếu tố nguy cơ hạn chế 13 . Các cách tiếp cận sử dụng mạng tích chập (convolutional networks) và quy trình Gauss (Gaussian processes) xác định các phân nhóm dưới với các hồ sơ bệnh đồng mắc và mức độ nghiêm trọng riêng biệt 14,15 . Một phương pháp phân cụm (clustering) cũng đã tiết lộ các phân nhóm dưới, bao gồm một nhóm trẻ hơn, không béo phì, có hoàn cảnh kinh tế khó khăn 16 .  Tuy nhiên, các cách tiếp cận này chỉ giải quyết hoặc dự đoán hoặc phân nhóm dưới riêng rẽ, thiếu một khung thống nhất cho cả hai nhiệm vụ.

Chúng tôi đề xuất một khung học sâu thống nhất để dự đoán khởi phát T2D và các phân nhóm dưới bằng cách sử dụng các đặc trưng EHR phổ biến. Khai thác độ tương đồng giữa các bệnh nhân trong học đo lường sâu (DML), mô hình xác định các phân nhóm dưới với các bệnh đồng mắc, đáp ứng thuốc, và điểm nguy cơ đa gen (polygenic risk scores - PRS) riêng biệt. Cụ thể, các phân nhóm dưới khác nhau về tỷ lệ bệnh đồng mắc, chẳng hạn như béo phì, trầm cảm, và tăng huyết áp. Phân nhóm dưới Green đáp ứng tốt hơn với điều trị metformin ban đầu so với phân nhóm dưới Red, làm nổi bật tiềm năng cho các can thiệp được điều chỉnh riêng. Mô hình mà chúng tôi phát triển có thể được tích hợp vào các hệ thống EHR hiện có để đồng thời tầm soát và phân nhóm dưới các cá nhân, hỗ trợ chẩn đoán thêm và chăm sóc cá nhân hóa trong khi giảm thiểu khối lượng công việc lâm sàng bổ sung (Hình 1).

## Kết quả Lựa chọn đoàn hệ, tiền xử lý dữ liệu, và huấn luyện mô hình

Chúng tôi sử dụng hai bộ dữ liệu: bộ dữ liệu All of Us (AoU), bao gồm hồ sơ sức khỏe điện tử (EHR) theo chiều dọc và dữ liệu di truyền từ một đoàn hệ đa dạng gồm hơn 400,000 người tham gia trên hơn 340 trung tâm ở Hoa Kỳ 17 , và Massachusetts General Brigham (MGB) Biobank, chứa dữ liệu EHR và di truyền từ một hệ thống chăm sóc sức khỏe tích hợp lớn ở Massachusetts, bao gồm hơn 1.5 triệu bệnh nhân duy nhất mỗi năm 18 .  Dữ liệu MGB Biobank được truy xuất vào ngày 10/12/2022, trong khi bộ dữ liệu AoU chứa dữ liệu đến 01/01/2022 (Controlled Tier v6).

Để xác định những người mắc đái tháo đường type 2 (T2D), chúng tôi áp dụng thuật toán eMERGE 19,20 cho bộ dữ liệu AoU ( n = 7567) và thuật toán PheCap 21 cho bộ dữ liệu MGB ( n = 3298). Thuật toán eMERGE định nghĩa các ca T2D bằng cách sử dụng mã tình trạng, mã thuốc đái tháo đường, và các giá trị HbA1c bất thường, loại trừ các mã đái tháo đường type 1 (T1D). Thuật toán PheCap, một phương pháp dựa trên học máy sử dụng cả dữ liệu EHR có cấu trúc và các ghi chú lâm sàng phi cấu trúc, được phát triển và kiểm chứng nội bộ tại MGH để lựa chọn đoàn hệ T2D. Các chi tiết tiền xử lý bổ sung được cung cấp trong Supplementary Note 2.

Để huấn luyện mô hình mạnh mẽ, chúng tôi đã chọn các đối chứng nguy cơ cao chưa phát triển T2D, đảm bảo mô hình học cách phân biệt những khác biệt tinh tế giữa các ca và đối chứng có các yếu tố nguy cơ tương tự. Chúng tôi định nghĩa một đoàn hệ đối chứng khớp theo dân số (PopControl) bằng cách ghép mỗi ca T2D với một đối chứng được khớp theo tuổi, giới tính, và mức sử dụng dịch vụ chăm sóc sức khỏe. Đối với các bộ dữ liệu kiểm tra trong quá trình đánh giá, chúng tôi sử dụng dân số chung không mắc T2D (GenControl) ở tỷ lệ hiện mắc bệnh tự nhiên.

Trong cả hai bộ dữ liệu AoU và MGB, chúng tôi xây dựng các đặc trưng đầu vào từ dữ liệu EHR, bao gồm các tình trạng ( n =  71), thuốc ( n =  89), các phép đo thể chất ( n =  6), giá trị xét nghiệm ( n =  21), và các biến nhân khẩu học như tuổi và giới tính. Đối với mỗi đặc trưng, chúng tôi tính giá trị trung bình, nhỏ nhất, và lớn nhất trên ba cửa sổ thời gian: 6 tháng, 2 năm, và toàn bộ lịch sử EHR trước ngày kiểm duyệt (censor date). Để tránh rò rỉ dữ liệu (data leakage), chúng tôi đặt ngày kiểm duyệt ít nhất 2 năm trước chẩn đoán, tối đa lên đến 10 năm. Các giá trị bị thiếu được điền (imputed) bằng giá trị trung bình của dân số.

Đối với nhiệm vụ dự đoán khởi phát, chúng tôi huấn luyện một số mô hình—học đo lường sâu (DML), hồi quy logistic (LR), các mô hình học sâu (SCARF 22 , TabTransformer 23 ,  CVAE 24 ,  ConvAE 14 , và các phương pháp giảm chiều (PCA 25 ,  UMAP 26 —sử dụng một tập nhất quán gồm 698 đặc trưng đã tiền xử lý. Với LR, chúng tôi cũng tái lập các mô hình lâm sàng đã thiết lập: một mô hình yếu tố nguy cơ từ Wilson và cộng sự 27 (Risk-Factors) và một mô hình dựa trên đường huyết đại diện cho các tiêu chuẩn chẩn đoán hiện tại 4,28   (Glycemic). Do các ràng buộc tiền xử lý dữ liệu trong hệ thống MGB, chỉ các mô hình DML và LR được áp dụng cho bộ dữ liệu MGB. Hiệu năng mô hình được đánh giá bằng diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (area under the receiver operating characteristic curve - AUROC).

Tính mới cốt lõi của phương pháp chúng tôi là bộ mã hóa DML có dung lượng cao học một biểu diễn tiềm ẩn hữu ích cho cả dự đoán khởi phát và phân nhóm dưới. Đối với dự đoán khởi phát, chúng tôi áp dụng một bộ phân loại tuyến tính đơn giản trên các biểu diễn đã học. Trong trường hợp của chúng tôi, chúng tôi sử dụng hồi quy logistic làm bộ phân loại để cho phép so sánh trực tiếp với một hồi quy logistic cơ sở được huấn luyện trên đầu vào thô. Đối với phân nhóm dưới, phân cụm K-Means được sử dụng trên biểu diễn tiềm ẩn của đoàn hệ ca T2D. Trong phân tích của chúng tôi, chúng tôi xác định ba phân nhóm dưới (k = 3), được đặc trưng bởi khoảng cách của chúng tới nhóm đối chứng (xem Supplementary Fig. 10 để biết lý do chọn k = 3). Cách tiếp cận của chúng tôi khác với công trình trước đây ở chỗ học các phân nhóm dưới chỉ từ dữ liệu EHR chung sẵn có đến hai năm trước chẩn đoán T2D, mà không kết hợp các đặc trưng như thông tin di truyền hoặc các dấu ấn sinh học tiên tiến. Việc phân cụm chỉ dựa trên các thước đo khoảng cách tiềm ẩn. Để hiểu rõ hơn các đặc điểm lâm sàng của các cụm được xác định, chúng tôi đã tiến hành các phân tích hậu kiểm (post hoc) bằng cách xem xét các khác biệt về tỷ lệ bệnh đồng mắc 10,14 ,  hiệu ứng thuốc 29 ,  và điểm nguy cơ đa gen 30 . Mặc dù các đặc trưng này có giá trị cho việc làm giàu (enrichment) và kiểm chứng, chúng không được sử dụng trong huấn luyện mô hình vì chúng không được thu thập thường quy ở những cá nhân có nguy cơ đái tháo đường.

Hình 1 .  Mô hình học đo lường sâu (DML) của chúng tôi sử dụng dữ liệu EHR thường quy để dự đoán và phân nhóm dưới T2D trong tương lai. Mô hình của chúng tôi đóng vai trò như một công cụ tiền tầm soát, phân tích dữ liệu EHR thường quy để nhận diện các cá nhân có nguy cơ T2D mà không làm tăng gánh nặng lâm sàng. Mô hình cũng dự đoán các phân nhóm dưới T2D trong tương lai, cho phép chăm sóc cá nhân hóa và y học chính xác.

## Dự đoán khởi phát T2D bằng DML

Đầu tiên, chúng tôi điều tra liệu không gian tiềm ẩn DML có thể học thông tin từ dữ liệu EHR quá khứ để dự đoán các chẩn đoán T2D trong tương lai hay không. Để định lượng tác động của các đặc trưng đầu vào, chúng tôi so sánh mô hình DML với hồi quy logistic (LR) 13,31,32 dưới ba thiết lập: EHR đầy đủ (LR), một mô hình yếu tố nguy cơ lâm sàng đã kiểm chứng (Risk-Factors) 27 , và chỉ các chỉ số đường huyết (Glycemic) 4,5 . Để so sánh với các phương pháp nhúng không gian tiềm ẩn khác, chúng tôi tiếp tục so sánh mô hình DML với học sâu (SCARF 22 , TabTransformer 23 , CVAE 24 , ConvAE 14 và các cơ sở giảm chiều (PCA 25 , UMAP 26 .

Các mô hình sử dụng dữ liệu EHR đầy đủ (DML và LR) liên tục vượt trội hơn các mô hình đặc trưng hạn chế khi sử dụng dữ liệu từ 2 đến 7 năm trước chẩn đoán (Hình 2a). Khoảng cách này nhấn mạnh các hạn chế của việc áp dụng các mô hình yếu tố nguy cơ lâm sàng truyền thống trong bối cảnh EHR, nơi dữ liệu được thu thập thụ động thường thiếu các đặc trưng then chốt (Supplementary Figs. 15-16). Tại 7 năm trước chẩn đoán, DML đạt AUROC là 0.754, vượt trội hơn LR (0.706), Risk-Factors (0.693), và Glycemic (0.632). Vượt quá thời điểm này, chất lượng dữ liệu nhìn chung suy giảm, và tất cả các mô hình đối mặt với khó khăn ngày càng tăng trong các dự đoán.

Để đánh giá thêm mô hình DML, chúng tôi so sánh dự đoán khởi phát T2D 2 năm của nó với một loạt các cơ sở (baseline) sử dụng bộ dữ liệu AoU (Hình 2b). Mô hình DML đạt AUROC cao nhất (0.969), vượt trội hơn các cơ sở LR (LR: 0.954, Risk-factors: 0.802, Glycemic: 0.773), các cơ sở học sâu (SCARF: 0.918, TabTransformer: 0.909, CVAE: 0.795, ConvAE: 0.571), và các cơ sở giảm chiều (PCA: 0.816, UMAP: 0.790). Mặc dù các không gian tiềm ẩn của các cơ sở học sâu và giảm chiều cũng hợp lý cho phân nhóm dưới cũng như dự đoán khởi phát (Supplementary Fig. 21), mô hình DML của chúng tôi mang lại không gian tiềm ẩn có khả năng dự đoán cao nhất. Điều này nhấn mạnh sức mạnh của khung DML như một biểu diễn thống nhất cho cả phân nhóm dưới và dự đoán khởi phát.

Hình 2 .  Hiệu năng dự đoán khởi phát T2D. ( a ) Hiệu năng theo thời gian của các mô hình DML, LR, Glycemic, và Wilson trên dữ liệu AoU PopControl với các khoảng kiểm duyệt từ 10 năm đến 0 năm trước chẩn đoán (95% CIs qua 500 lần lặp bootstrap). ( b ) Biểu đồ cột của dự đoán khởi phát T2D 2 năm. AUROC của DML với các cơ sở LR (LR, Risk-Factors, Glycemic), các cơ sở học sâu (SCARF, TabTransformer, CVAE, ConvAE), và các cơ sở giảm chiều (PCA, UMAP). 95% CIs được tính qua 500 lần lặp bootstrap. ( c ) Hiệu năng chuyển giao của các mô hình DML và LR được huấn luyện trên MGB được đánh giá trên dữ liệu AoU. ( d ) Các biểu diễn không gian tiềm ẩn từ mô hình DML AoU được trực quan hóa thông qua giảm chiều với UMAP.

Để đánh giá khả năng tổng quát hóa, chúng tôi đã huấn luyện các mô hình DML và LR trên bộ dữ liệu MGB, với hiệu năng mạnh cho dự đoán 2 năm (AUROC: DML 0.908, LR 0.898). Khi áp dụng trực tiếp vào dữ liệu AoU, cả hai mô hình đều giữ được sức mạnh dự đoán (AUROC: DML 0.829, LR 0.861), mặc dù có sự sụt giảm hiệu năng đáng chú ý (Hình 2c, Supplementary Table 4). Điều này gợi ý rằng các đặc trưng EHR chung có khả năng dự đoán giữa các đoàn hệ. Cuối cùng, chúng tôi đã thực hiện phân tích tầm quan trọng đặc trưng và quan sát thấy rằng mô hình DML ưu tiên các đặc trưng liên quan đến cân nặng (ví dụ: BMI, trọng lượng cơ thể) 33,34 (Supplementary Table 3), trong khi LR dựa nhiều hơn vào các chỉ số đường huyết 1,4,35 (Supplementary Table 2).

## Định nghĩa các phân nhóm dưới DML dọc theo phổ liên tục nguy cơ T2D

Ngoài dự đoán khởi phát T2D, việc phân nhóm dưới các cá nhân dựa trên quỹ đạo sức khỏe tương lai cho phép các can thiệp có mục tiêu. Các mô hình DML tạo ra các không gian tiềm ẩn được tối ưu hóa nhằm gom cụm các cá nhân tương tự và tách biệt những cá nhân không tương tự, cho phép các phân nhóm dưới nổi lên một cách tự nhiên. Cả các cá nhân MGB và AoU phát triển T2D đều tạo thành một phổ liên tục, với các đối chứng gom cụm ở một đầu (Hình 2d). Phân nhóm dưới được thực hiện trên toàn bộ đoàn hệ các cá nhân T2D dương tính (ca) trong mỗi bộ dữ liệu, độc lập với nhóm đối chứng, để mô tả đặc điểm biến thiên trong dân số T2D. Sử dụng KMeans (k = 3), chúng tôi định nghĩa các phân nhóm dưới Green, Yellow, và Red dựa trên độ gần với các đối chứng. Sử dụng KMeans (k = 3), chúng tôi định nghĩa các phân nhóm dưới Green, Yellow, và Red dựa trên độ gần với các đối chứng. Việc chiếu các cá nhân AoU lên các phân nhóm dưới MGB cho thấy sự liên kết mạnh, xác nhận rằng các phân nhóm dưới của chúng tôi có thể chuyển giao giữa các dân số (Supplementary Fig. 2).

Chúng tôi phân tích nhân khẩu học của các phân nhóm dưới và các dấu ấn chẩn đoán chính (Bảng 1) và không tìm thấy khác biệt có ý nghĩa (Supplementary Table 5), gợi ý rằng nhân khẩu học không chi phối biến thiên giữa các phân nhóm dưới. Mức glucose máu ngẫu nhiên không cho thấy khác biệt có ý nghĩa trước hoặc sau chẩn đoán ( P =  0.745 trước, P =  0.874 sau, kiểm định KS; Supplementary Fig. 4).  Mức HbA1c chỉ khác biệt có ý nghĩa sau chẩn đoán ( P =  0.09 trước, P =  0.014 sau, kiểm định KS;  Supplementary  Fig.  3).  Những phát hiện này chỉ ra rằng các phân nhóm dưới nổi lên độc lập với các khác biệt nhân khẩu học hoặc chẩn đoán trước chẩn đoán nhưng vẫn liên quan đến các chiến lược chẩn đoán và điều trị trong tương lai.

## Tỷ lệ hiện mắc bệnh đồng mắc khác nhau giữa các phân nhóm dưới DML

Để kiểm chứng tính đặc hiệu của phân nhóm dưới, chúng tôi so sánh các phân nhóm dưới Green (gần các đối chứng nhất) và Red (xa nhất) bằng cách sử dụng các mã chẩn đoán có tỷ lệ hiện mắc ít nhất 5%, đánh giá các tình trạng liên quan đến T2D thông qua các kiểm định tỷ lệ nhị thức

Bảng 1 .  Thống kê nhân khẩu học và sinh hiệu trên các ca T2D, đối chứng, và các phân nhóm dưới T2D được xác định trong các bộ dữ liệu AoU và MGB. T2D total đại diện cho tổng hợp trên cả ba phân nhóm dưới được xác định. Tuổi, HbA1c, BMI được tính theo trung vị của phân nhóm vào ngày chẩn đoán T2D. Các đặc trưng giới tính, chủng tộc, dân tộc, và thu nhập là tĩnh.

| AoU           | AoU          | Green T2D subtype ( n =172)   | Yellow T2D subtype ( n =833)   | Red T2D subtype ( n =496)   |
|---------------|--------------|-------------------------------|--------------------------------|-----------------------------|
| Sex           | Female       | 63.40%                        | 62.20%                         | 56.20%                      |
| Sex           | Male         | 34.30%                        | 34.90%                         | 41.40%                      |
| Race          | Asian        | 4.70%                         | 2.30%                          | 1.80%                       |
| Race          | Black        | 20.30%                        | 27.30%                         | 27.40%                      |
| Race          | White        | 57.60%                        | 48.30%                         | 53.80%                      |
| Ethnicity     | Non-Hispanic | 81.40%                        | 77.60%                         | 84.20%                      |
| Ethnicity     | Hispanic     | 14.50%                        | 17.80%                         | 11.60%                      |
| Age at diag   | Median       | 58                            | 57                             | 57                          |
| HbA1c at Diag | Median       | 6.7                           | 6.5                            | 6.4                         |
| BMI at diag   | Median       | 31.4                          | 34.1                           | 36.2                        |
| eGFR at diag  | Median       | 72                            | 63                             | 60                          |
| MGB           | MGB          | Green T2D Subtype ( n =408)   | Yellow T2D Subtype ( n =631)   | Red T2D Subtype ( n =131)   |
| Sex           | Male         | 51.50%                        | 54.40%                         | 36.60%                      |
| Sex           | Female       | 48.50%                        | 45.60%                         | 63.40%                      |
| Race          | Asian        | 1.00%                         | 1.30%                          | 1.50%                       |
| Race          | Black        | 10.80%                        | 11.10%                         | 13.70%                      |
| Race          | White        | 80.40%                        | 76.90%                         | 73.30%                      |
| Ethnicity     | Non-Hispanic | 88.2%                         | 90.0%                          | 89.3%                       |
| Ethnicity     | Hispanic     | 2.0%                          | 1.7%                           | 1.5%                        |
| Age at diag   | Median       | 57.8                          | 55.9                           | 56.1                        |
| HbA1c at diag | Median       | 6.8                           | 6.7                            | 6.6                         |
| BMI at diag   | Median       | 31.8                          | 34.0                           | 36.1                        |
| eGFR at diag  | Median       | 59.5                          | 60                             | 60                          |

(Bảng 2) 36-40 . Các giá trị p có ý nghĩa thống kê được biểu thị bằng * (có ý nghĩa tại α = 0.05) hoặc ** (có ý nghĩa sau hiệu chỉnh Bonferroni với 50 kiểm định tại α/50 = 0.001).

Phân nhóm dưới Red liên tục cho thấy tỷ lệ béo phì cao hơn (AoU P =  7.2e-05**,  MGB P =  2.8E-07**) với sự phân kỳ sớm hơn ở MGB (5 năm trước chẩn đoán) so với AoU (2 năm). Các tình trạng liên quan đến béo phì, chẳng hạn như bệnh trào ngược dạ dày thực quản (GERD), ngưng thở khi ngủ, và tăng lipid máu, phổ biến hơn ở Red, với các khoảng cách nới rộng theo thời gian. Các tình trạng tim mạch (AoU) và các rối loạn sức khỏe tâm thần như trầm cảm (AoU P =  2.3E-04**,  MGB P =  2.4E-06*) và lo âu (MGB P =  2.3E-07**) tăng cao có ý nghĩa. Red cũng có tỷ lệ bệnh thần kinh (neuropathy) cao hơn (MGB P =  7.1E-08**) và tỷ lệ đục thủy tinh thể (cataract) (AoU P =  7.2E-04**). Các xu hướng của phân nhóm dưới Red và Green này nhất quán trên cả hai bộ dữ liệu AoU và MGB, minh họa tính mạnh mẽ và khả năng tái lập của các phân biệt giữa các phân nhóm dưới. Xem Supplementary Figs. 5-9 để biết các trực quan hóa.

Riêng béo phì không giải thích đầy đủ những khác biệt này. Sau khi điều chỉnh theo BMI 41 (Supplementary Table 6), các bệnh đồng mắc tim mạch 42,43 và sức khỏe tâm thần 44,45 vẫn khác biệt có ý nghĩa, gợi ý rằng các phân nhóm dưới nắm bắt thêm các biến thiên liên quan đến T2D.

## Mức sử dụng và hiệu ứng thuốc khác nhau giữa các phân nhóm dưới DML

Một khác biệt có ý nghĩa khác giữa các phân nhóm dưới là mức sử dụng thuốc của họ trong tương lai sau chẩn đoán. Chúng tôi phân loại thuốc thành metformin, insulin, và các thuốc liên quan đến T2D khác, xem xét thời điểm khởi đầu và đáp ứng HbA1c. Metformin có xu hướng được kê đơn sớm hơn trong quá trình bệnh, trong khi insulin thường được khởi đầu muộn hơn (Hình 3a,b). Mặc dù phân nhóm dưới Green bắt đầu thuốc sớm hơn phân nhóm dưới Red (Hình 3a), khác biệt không có ý nghĩa thống kê. Tuy nhiên, thời gian để đạt kiểm soát HbA1c (&lt; 6.5) ngắn hơn có ý nghĩa ở phân nhóm dưới Green (metformin: P =  2.4E-04;  các thuốc T2D khác: P =  2.4E-03, ANOVA), cho thấy khả năng đáp ứng tốt hơn (Hình 3c). Ở AoU, phân nhóm dưới Green cho thấy mức giảm HbA1c lớn hơn có ý nghĩa sau khi khởi đầu metformin ( P =  4.0E-03, ANOVA), với mức giảm trung bình là - 0.64 so với - 0.27 ở nhóm Red (Hình 3d), mặc dù các đáp ứng với các thuốc khác không khác biệt.

## Đóng góp di truyền vào sự phát triển T2D giữa các phân nhóm dưới DML

Để khám phá đóng góp của di truyền vào sự phát triển T2D giữa các phân nhóm dưới được xác định, chúng tôi đã tính điểm nguy cơ đa gen (PRS) T2D 20,46 , đã điều chỉnh cho các hiệp biến chính gồm 10 thành phần chính hàng đầu, tuổi, và giới tính. Chúng tôi nhận thấy rằng trong khi các ca T2D cho thấy khác biệt rõ ràng về PRS so với các đối chứng (Supplementary Fig. 11), các phân nhóm dưới T2D DML phần lớn tương tự nhau về mặt di truyền với nhau trong cả hai bộ dữ liệu (Supplementary Tables 7-8; kiểm định ý nghĩa Tukey theo cặp). Cụ thể, PRS của nhóm đối chứng thấp hơn có ý nghĩa so với các phân nhóm dưới T2D (AoU P = 1.45e-10, MGB P = 6.65E-55, ANOVA).

Chúng tôi tiếp tục xem xét đóng góp di truyền bằng cách sử dụng các điểm đa gen phân vùng (partitioned polygenic scores - pPS) được suy ra từ 12 cụm di truyền được xác định trong một nghiên cứu trước đây (Smith và cộng sự 47 ). Các pPS này được tạo ra bằng cách tính tổng có trọng số của các biến thể di truyền trong mỗi cụm. Phân tích của chúng tôi không tiết lộ khác biệt có ý nghĩa nào giữa ba phân nhóm dưới DML trong cả hai bộ dữ liệu (Supplementary Table 9, Supplementary Fig. 12). Do đó, trong khi nhóm T2D cho thấy đóng góp di truyền rõ ràng vào sự phát triển bệnh so với các đối chứng, không có khác biệt nào được quan sát thấy giữa các phân nhóm dưới DML.

Cuối cùng, chúng tôi đã so sánh hiệu năng của các mô hình dựa trên điểm nguy cơ đa gen (PRS) với các mô hình dựa trên EHR của chúng tôi trong việc dự đoán khởi phát và phân nhóm dưới T2D trong đoàn hệ AoU PopControl. Các mô hình PRS (AUROC = 0.642-0.745) hoạt động kém hơn mô hình DML của chúng tôi (AUROC = 0.969) trong việc dự đoán khởi phát bệnh, và các phân nhóm dưới PRS bộc lộ các thiên lệch nhân khẩu học không hiện diện trong các phân nhóm dưới DML của chúng tôi. Ngoài ra, các phân nhóm dưới PRS xác định ít bệnh đồng mắc có ý nghĩa hơn và không cho thấy khác biệt có ý nghĩa nào về hiệu ứng thuốc lên HbA1c, khiến chúng kém hiệu quả hơn cho các hiểu biết lâm sàng so với các mô hình dựa trên EHR. Xem Supplementary Tables 10-12, Supplementary Figs. 13-14 để biết chi tiết.

Bảng 2 .  Các khác biệt về tỷ lệ bệnh đồng mắc cho các phân nhóm dưới green và red. Các giá trị p có ý nghĩa thống kê được biểu thị bằng * (có ý nghĩa tại α = 0.05) hoặc ** (có ý nghĩa sau hiệu chỉnh bonferroni với 50 kiểm định tại α/50 = 0.001). Tên các tình trạng được đánh dấu sao theo mức ý nghĩa tối đa giữa các bộ dữ liệu.

|                                   | AoU       | AoU     | AoU        | MGB       | MGB     | MGB        |
|-----------------------------------|-----------|---------|------------|-----------|---------|------------|
| Condition                         | Green (%) | Red (%) | p -value   | Green (%) | Red (%) | p -value   |
| Obesity**                         | 54.6%     | 71.1%   | 7.26e-05** | 71.3%     | 93.1%   | 2.88E-07** |
| Gastroesophageal reflux disease** | 48.3%     | 68.1%   | 3.22E-06** | 63.5%     | 79.4%   | 7.29E-04** |
| Obstructive sleep apnea*          | 33.1%     | 47.0%   | 1.61E-03*  | 37.5%     | 48.9%   | 0.021*     |
| Hyperlipidemia*                   | 80.2%     | 86.9%   | 0.034*     | 93.1%     | 98.5%   | 0.020*     |
| Hypertension**                    | 54.6%     | 68.7%   | 8.20E-04** | 89.7%     | 95.4%   | 0.046*     |
| Angina pectoris**                 | 12.8%     | 26.8%   | 1.74E-04** | 43.4%     | 51.1%   | 0.120      |
| Coronary atherosclerosis*         | 20.3%     | 32.7%   | 2.28E-03*  | 56.4%     | 46.6%   | 0.050      |
| Atrial fibrillation*              | 11.0%     | 19.4%   | 0.013*     | 33.3%     | 26.0%   | 0.114      |
| Depressive disorder**             | 44.8%     | 60.9%   | 2.36E-04** | 31.4%     | 54.2%   | 2.47E-06*  |
| Nicotine dependence*              | 29.7%     | 31.7%   | 0.625      | 22.1%     | 33.6%   | 7.90E-03*  |
| Insomnia**                        | 26.7%     | 36.3%   | 0.023*     | 53.9%     | 73.3%   | 9.05E-05** |
| Anxiety disorder*                 | 47.7%     | 54.2%   | 0.138      | 56.6%     | 68.7%   | 0.014*     |
| Chronic kidney disease            | 20.3%     | 24.4%   | 0.280      | 49.3%     | 44.3%   | 0.320      |
| Cataract**                        | 31.4%     | 46.2%   | 7.28E-04** | 36.5%     | 48.9%   | 0.012*     |
| Neuropathy*                       | 66.3%     | 73.2%   | 0.084      | 81.1%     | 92.4%   | 2.35E-03*  |

Hình 3 .  Các thời điểm sử dụng thuốc T2D và hiệu ứng lên mức HbA1c và giữa các phân nhóm dưới AoU PopControl. ( a ) Thời gian từ ngày chẩn đoán T2D đến khi bắt đầu sử dụng thuốc ( b ) thời gian từ lần đo HbA1c ≥ 6.5 đầu tiên đến khi bắt đầu dùng thuốc ( c ), thời gian từ khi bắt đầu dùng thuốc đến lần đầu tiên khi tất cả HbA1c &lt; 6.5 sau đó ( d ), thay đổi về mức HbA1c đáp ứng với việc bắt đầu dùng thuốc trong 3 tháng (trước-thuốc: [12, 0] tháng; sau-thuốc: [3, 15] tháng). Các thanh sai số của biểu đồ cột biểu thị khoảng tin cậy 95%. Các nhóm thuốc có khác biệt có ý nghĩa tại α = 0 . 05 được biểu thị bằng *.

## Bàn luận

Công trình của chúng tôi chứng minh sức mạnh của học đo lường sâu (DML) trong việc dự đoán khởi phát T2D và xác định các phân nhóm dưới T2D tương lai hai năm hoặc nhiều hơn trước chẩn đoán. Khác với các nghiên cứu trước đây, mô hình của chúng tôi giải quyết cả hai nhiệm vụ với dữ liệu EHR sẵn có thường quy, cho phép can thiệp sớm và phòng ngừa chính xác.

DML mang lại một lợi thế then chốt bằng cách kết hợp giám sát nhận biết lớp (class-aware supervision) với các hàm mất mát dựa trên thước đo (metric-based losses) để định hình trực tiếp không gian tiềm ẩn xoay quanh các kết cục bệnh. Ngược lại, SCARF dựa vào học tương phản tự giám sát (self-supervised contrastive learning) và không sử dụng nhãn kết cục để dẫn dắt việc học biểu diễn. TabTransformer được thông tin bởi kết cục (outcome-informed), nhưng không áp đặt cấu trúc một cách tường minh trong không gian tiềm ẩn. CVAE áp đặt cấu trúc thông qua một nút thắt cổ chai biến phân (variational bottleneck), nhưng dựa vào giám sát dựa trên bộ phân loại yếu hơn. Các nhúng theo thời gian của ConvAE không phụ thuộc vào các kết cục. PCA và UMAP hoàn toàn không giám sát và bỏ qua thông tin kết cục. Nhìn chung, sự kết hợp giữa giám sát phân biệt (discriminative supervision) và cấu trúc dựa trên thước đo của DML hỗ trợ một cách độc đáo cả dự đoán chính xác và phân tầng bệnh nhân có thể diễn giải.

Mô hình của chúng tôi có thể tích hợp liền mạch vào các hệ thống EHR như một công cụ tầm soát tự động, không xâm lấn, nhận diện thụ động các cá nhân nguy cơ cao mà không thêm gánh nặng lâm sàng. Nó tổng quát hóa tốt sang các đoàn hệ mới và đòi hỏi tiền xử lý tối thiểu. Bằng cách khai thác một loạt rộng các đặc trưng EHR, nó vượt qua các xét nghiệm chẩn đoán tiêu chuẩn (HbA1c, glucose) 3,4 trong đánh giá nguy cơ, có khả năng mang lại lợi ích cho ước tính 98 triệu người trưởng thành ở Hoa Kỳ mắc tiền đái tháo đường 48 . Mặc dù cần kiểm chứng lâm sàng thêm, cách tiếp cận này mang lại một giải pháp có khả năng mở rộng cho tầm soát cơ hội trên toàn dân số 49,50 .

Các phân nhóm dưới được suy ra từ DML của chúng tôi cho thấy cả sự chồng lấp và phân biệt với các phân loại T2D hiện có. Phân nhóm dưới Red giống nhất với nhóm SIRD của Ahlqvist 10 , với BMI cao và các bệnh đồng mắc chuyển hóa. Tuy nhiên, khác với mô hình Ahlqvist, các phân nhóm dưới của chúng tôi không khác biệt có ý nghĩa theo tuổi khởi phát. Thay vào đó, chúng phản ánh một phổ liên tục về sức khỏe chuyển hóa và mức độ nghiêm trọng của biến chứng—trải dài từ phân nhóm dưới Green khỏe mạnh hơn đến phân nhóm dưới Red nguy cơ cao hơn. Phổ chuyển tiếp này nổi lên trong một dân số có tuổi nền và HbA1c tương tự, gợi ý các khác biệt về tiến triển bệnh và đáp ứng điều trị. Phân nhóm dưới Red cũng phù hợp với Cluster 5 của Wagner (béo phì tạng, nguy cơ T2D và mạch máu cao), trong khi phân nhóm dưới Green giống Cluster 2 (khỏe mạnh hơn về chuyển hóa) 12 . So với các phân nhóm dưới học sâu của Landi và cộng sự 14 , nhóm Green của chúng tôi tương ứng với Subtype I (biến chứng nhẹ hơn) và nhóm Red phù hợp với Subtype III (biến chứng tim mạch nặng). Khác với mô hình của Landi, ba phân nhóm dưới của chúng tôi tạo thành một phổ liên tục rõ ràng hơn về mức độ nghiêm trọng (Supplementary Figs. 17-18). Tóm lại, khi giới hạn ở việc phân nhóm dưới chỉ sử dụng dữ liệu EHR, các phân nhóm dưới DML của chúng tôi mang lại một khung có thể diễn giải lâm sàng và dựa trên dữ liệu để tổ chức các bệnh nhân theo nguy cơ T2D và mức độ nghiêm trọng của biến chứng.

Nghiên cứu của chúng tôi cũng có một số hạn chế. Không gian tiềm ẩn của mô hình DML cho thấy các chuyển tiếp mượt mà về mức độ nghiêm trọng của bệnh đồng mắc hơn là các cụm riêng biệt, đòi hỏi phân tích xu hướng thêm. Việc thiếu dữ liệu tiền sử gia đình có thể hạn chế hiệu năng dự đoán. Cuối cùng, phân tích của chúng tôi có thể bị ảnh hưởng bởi các thiên lệch vốn có trong các nghiên cứu hồi cứu dựa trên bệnh viện, vì việc thu thập dữ liệu có xu hướng đại diện quá mức cho các cá nhân có mức sử dụng dịch vụ chăm sóc sức khỏe cao hơn.

Tóm lại, DML mang lại một cách tiếp cận có khả năng mở rộng, chính xác cho dự đoán và phân nhóm dưới T2D sớm, hỗ trợ sự tiến bộ của y học chính xác trong chăm sóc đái tháo đường.

## Phương pháp

## Mô tả bộ dữ liệu

## Bộ dữ liệu All of Us

Chương trình All of Us (AoU) thu thập dữ liệu EHR theo chiều dọc từ 400,000 người tham gia trên hơn 340 trung tâm ở Hoa Kỳ 17 , nhấn mạnh các nhóm chưa được đại diện đầy đủ (Supplementary Table 1). Người tham gia được tuyển mộ thông qua các trung tâm nghiên cứu học thuật hợp tác, các trung tâm y tế cộng đồng, và tự tuyển mộ trực tuyến. Chúng tôi sử dụng Controlled Tier Dataset v6, với dữ liệu đến 01/13/2023.

Tuyên bố đạo đức: Tất cả các phương pháp đã được thực hiện phù hợp với các hướng dẫn và quy định liên quan. Nghiên cứu này sử dụng dữ liệu người đã ẩn danh từ Chương trình Nghiên cứu All of Us (Controlled Tier), được truy cập thông qua All of Us Researcher Workbench theo một thỏa thuận sử dụng dữ liệu đã được phê duyệt. Nghiên cứu đã được phê duyệt bởi Hội đồng Đánh giá Thể chế (IRB) All of Us (IRB Protocol 2021-02-TN-001). Do bản chất hồi cứu của nghiên cứu, yêu cầu lấy đồng thuận tham gia có hiểu biết đã được miễn bởi IRB All of Us.

## Bộ dữ liệu Massachusetts general Brigham

Massachusetts General Brigham (MGB) là một hệ thống chăm sóc sức khỏe lớn phục vụ hơn 1.5 triệu bệnh nhân mỗi năm 18 . Quy trình liên quan đến việc chia sẻ dữ liệu đã ẩn danh với MIT đã được xem xét bởi Mass General Brigham. Chúng tôi sử dụng một biobank được trích xuất vào ngày 10/12/2022, với 109,768 cá nhân.

Tuyên bố đạo đức: Tất cả các phương pháp đã được thực hiện phù hợp với các hướng dẫn và quy định liên quan. Nghiên cứu sử dụng dữ liệu Mass General Brigham (MGB) đã được phê duyệt bởi Hội đồng Đánh giá Thể chế (IRB) MGB theo quy trình 2022P000611. Đồng thuận tham gia có hiểu biết đã được lấy từ tất cả người tham gia thông qua MGB Partners Biobank theo quy trình 2009P002312, đã được phê duyệt bởi IRB MGB vào ngày 01/17/2022.

## Xây dựng đoàn hệ

Đoàn hệ T2D

Trong AoU, chúng tôi xác định các ca T2D bằng thuật toán eMERGE ( n = 7567) 19 . Ngày chẩn đoán T2D được xác định bởi ngày sớm nhất trong số: bất kỳ mã ICD T2D nào, bất kỳ mã thuốc T2D nào, và bất kỳ HbA1c &gt; 6.5 nào. Các ca MGB ( n = 3298) được xác định bằng PheCAP 21 , một thuật toán ML tùy chỉnh được phát triển tại MGB với PPV 95%.

## Đối chứng khớp theo dân số (PopControl)

Các đối chứng được lựa chọn bằng thuật toán k-láng giềng gần nhất (k-nearest neighbors) 51 dựa trên các đặc trưng tuổi, giới tính, và mức sử dụng dịch vụ chăm sóc sức khỏe, đảm bảo một sự khớp 1:1 với các ca T2D (AoU n =  7567,  MGB n =  3298). Mức sử dụng dịch vụ chăm sóc sức khỏe được xấp xỉ bằng tổng số phép đo EHR trên mỗi hồ sơ. Đoàn hệ này được sử dụng cho huấn luyện mô hình để ngăn việc học các đường tắt (shortcuts).

## Đối chứng chung (GenControl)

Đoàn hệ rộng hơn này bao gồm các cá nhân không có bất kỳ mã liên quan đến T2D hoặc T1D nào (AoU n =  77,567,  MGB n =  81,787). Các mô hình được đánh giá trên đoàn hệ này để phản ánh tốt hơn tỷ lệ hiện mắc bệnh trong thế giới thực và các đặc điểm dân số lâm sàng.

## Tiền xử lý dữ liệu

Chúng tôi xây dựng các đặc trưng đầu vào từ các tình trạng EHR (m = 71), thuốc (m = 89), các phép đo thể chất (m = 6), xét nghiệm (m = 21), và các yếu tố nhân khẩu học (tuổi, giới tính). Các đặc trưng được lựa chọn theo tỷ lệ hiện mắc (xuất hiện nhiều nhất) và mối liên hệ với T2D (các yếu tố nguy cơ đã biết). Các chỉ báo đại diện (proxy) cho T2D (ví dụ: 'Complication due to type 2 diabetes') được loại trừ để ngăn rò rỉ nhãn (label leakage). Đối với các đặc trưng liên tục, chúng tôi tính giá trị trung bình, lớn nhất, và nhỏ nhất trên

7

6 tháng, 2 năm vừa qua, và toàn bộ lịch sử (Supplementary Fig. 20). Các đặc trưng rời rạc (tình trạng, thuốc) được nhị phân hóa tương tự. Giới tính được mã hóa one-hot, tuổi được chuẩn hóa về [0,1]. Tất cả các đặc trưng đầu vào được nối lại thành một vector 698 chiều. Chúng tôi chia ngẫu nhiên cả đoàn hệ ca và đối chứng thành các tập huấn luyện (70%), kiểm định (10%), và kiểm tra (20%), đảm bảo không có sự chồng lấp trong các hồ sơ bệnh nhân giữa các lần chia. Tập kiểm định được sử dụng để tinh chỉnh siêu tham số, và tất cả các kết quả thực nghiệm cuối cùng được báo cáo trên tập kiểm tra giữ lại (hold-out) độc lập. Xem Supplementary Fig. 1 để biết chi tiết.

## Các mô hình

## Mô hình DML

Mục tiêu của mô hình học đo lường sâu (DML) là học một phép chiếu ϕ : χ → Φ ánh xạ các đặc trưng EHR chiều cao vào một không gian thước đo chiều thấp hơn sao cho các cá nhân có tình trạng T2D tương tự gần nhau hơn, trong khi các cá nhân không tương tự xa nhau hơn. Một cách hình thức, đối với hai cá nhân x 1 , x 2 ∈ χ , khoảng cách đã học d ( ϕ ( x 1 ) , ϕ ( x 2 )) phản ánh độ tương đồng lâm sàng có ý nghĩa. Ví dụ, hàm mất mát DML bộ ba (triplet) 52 dựa trên các khoảng cách giữa truy vấn x , ví dụ dương x p và ví dụ âm x n sẽ được tính

như max

(0

,

‖

ϕ

(

x

)

-

ϕ

(

x

p

)

‖

+

‖

ϕ

(

x

)

-

ϕ

(

x

n

)

‖

+

m

)

, với

m

là một siêu tham số cho lề (margin)

khoảng cách giữa các cặp dương và âm. Chúng tôi sử dụng một bộ mã hóa mạng nơ-ron gồm 3-4 lớp kết nối đầy đủ với các hàm kích hoạt ReLU và dropout ( p =  0.2)  để học phép chiếu DML. Bộ mã hóa được huấn luyện trên cả các cá nhân T2D dương tính và đối chứng (T2D âm tính) để nắm bắt các phân biệt liên quan trong không gian tiềm ẩn. Các biểu diễn đã học cho tất cả các cá nhân được sử dụng để huấn luyện một mô hình hồi quy logistic (LR) nhằm dự đoán khởi phát T2D hai năm trong tương lai (kiểm định chéo 3-fold). Đối với phân nhóm dưới, chúng tôi giới hạn phân tích vào các biểu diễn đã học của các ca T2D dương tính, được phân cụm để xem xét tính dị biệt trong dân số T2D. Để biết thêm chi tiết triển khai, xem Supplementary Note 4. Để biết trực quan hóa kiến trúc mô hình, xem Supplementary Fig. 19.

## Các mô hình cơ sở

Đối với dự đoán khởi phát, chúng tôi so sánh DML với Hồi quy Logistic (LR), được triển khai trong scikit-learn 53 , sử dụng kiểm định chéo 3-fold. Các cơ sở LR bổ sung bao gồm một mô hình yếu tố nguy cơ 27 (tuổi, chỉ số khối cơ thể, huyết áp, lipoprotein tỷ trọng cao, triglyceride, glucose, HbA1c) và một mô hình đường huyết 4,35 (HbA1c, glucose). Đối với các cơ sở học sâu, chúng tôi so sánh với các mô hình nhúng tiềm ẩn tiên tiến nhất với học tương phản (SCARF 22 , các bộ mã hóa dựa trên transformer (TabTransformer 23 , các bộ tự mã hóa biến phân có điều kiện (CVAE 24 , và một mô hình phân nhóm dưới T2D trước đây (ConvAE) từ Landi và cộng sự 14 .  ConvAE trích xuất các mẫu chuỗi EHR thông qua tự mã hóa tích chập (convolutional autoencoding). Cuối cùng, chúng tôi so sánh với các phương pháp giảm chiều PCA 25 và UMAP 26 . Một chiều nhúng tiềm ẩn 64 được sử dụng để duy trì tính nhất quán giữa các so sánh.

## Huấn luyện và đánh giá

## Chi tiết huấn luyện

Chúng tôi huấn luyện mô hình DML trong PyTorch với các hàm mất mát triplet 52 , N-pair 54 , Lifted 55 , và ProxyNCA 56 , thay đổi chiều (d ∈ {32, 64}) và các lớp bộ mã hóa (l ∈ {3,4}). Quá trình huấn luyện chạy trong 50 epoch sử dụng Adam (tỷ lệ học 1e-4). Chúng tôi chọn hàm mất mát DML tốt nhất và các siêu tham số mô hình dựa trên AUROC kiểm định.

## Phân nhóm dưới thông qua phân cụm

Các bệnh nhân T2D được nhúng vào một không gian tiềm ẩn, sau đó được phân cụm thành ba phân nhóm dưới bằng KMeans 57 (k = 3, xem Supplementary Fig. 10 để biết lựa chọn k). Chúng tôi chỉ định các phân nhóm dưới bằng màu sắc dựa trên khoảng cách tương đối giữa phân nhóm dưới và nhóm đối chứng trong không gian biểu diễn. Phân nhóm dưới Green là gần nhất và chồng lấp đáng kể với nhóm đối chứng, trong khi phân nhóm dưới Yellow ở xa hơn dọc theo phổ chuyển tiếp. Phân nhóm dưới Red là xa nhất so với các đối chứng.

## Điểm nguy cơ đa gen (PRS)

Điểm nguy cơ đa gen (PRS) được tạo ra bằng phần mềm PRS-CS 58 với đầu vào là các thống kê tóm tắt được phân tích gộp (meta-analyzed) từ phân tích gộp GWAS tập con tổ tiên châu Âu về T2D trong Vujkovic và cộng sự 61 và nghiên cứu tương quan toàn bộ hệ gen (genome-wide association study) về T2D bởi FINNGEN Consortium 60 . Tất cả các PRS được hiệu chỉnh với các hiệp biến gồm tuổi, giới tính, và các thành phần chính di truyền trong quá trình kiểm định ý nghĩa.

## Đánh giá dự đoán khởi phát

Các mô hình được đánh giá thông qua diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (AUROC) 61 , với khoảng tin cậy (CIs) 95% được định lượng qua 500 lần lặp bootstrap. Tầm quan trọng đặc trưng được đánh giá thông qua các hệ số LR và các kiểm định hoán vị (permutation tests) 62 . Khả năng tổng quát hóa mô hình được kiểm tra bằng cách chuyển giao mô hình được huấn luyện trên MGB sang AoU.

## Đánh giá phân nhóm dưới lâm sàng

Các kiểm định ý nghĩa được sử dụng để định lượng các biến thiên đặc trưng giữa các phân nhóm dưới. Đối với các đặc trưng nhân khẩu học, chúng tôi thực hiện kiểm định chi-bình phương Pearson 63 cho các đặc trưng nhị phân và kiểm định ANOVA 64 cho các đặc trưng liên tục. Đối với các đặc trưng nhị phân như bệnh đồng mắc, chúng tôi thực hiện kiểm định hai mẫu tỷ lệ nhị thức (binomial proportion two-sample test). Đối với các đặc trưng liên tục như giá trị xét nghiệm, chúng tôi thực hiện kiểm định Kolmogorov-Smirnov (KS) hai mẫu 65 . Vì chúng tôi đã thực hiện tổng cộng 50 kiểm định ý nghĩa độc lập, chúng tôi đã hiệu chỉnh ngưỡng giá trị p cho ý nghĩa bằng cách áp dụng hiệu chỉnh Bonferroni 66 (0 . 05 / 50 = 0 . 001) . .

2

2

## Tính sẵn có của dữ liệu

Bộ dữ liệu All of Us có sẵn để cộng đồng nghiên cứu sử dụng sau khi đăng ký thông qua trung tâm nghiên cứu chính thức của họ ([https://www.researchallofus.org/]). Bộ dữ liệu MGB không thể truy cập công khai. Tuy nhiên, chúng tôi sẽ phát hành một đoàn hệ bệnh nhân gồm các ví dụ tổng hợp (synthetic) được tạo ra từ đoàn hệ MGB cho hiệu năng tương tự với các mô hình đã huấn luyện của chúng tôi khi bài báo được chấp nhận.

Nhận ngày: 25 March 2025; Chấp nhận: 24 October 2025

## Tài liệu tham khảo

1.  CDC. Type 2 Diabetes [Internet]. Centers for Disease Control and Prevention. 2023 [cited 2024 Feb 14].   h  t  t  p  s  :  /  /  w  w  w  .  c  d  c  .  g  o  v  /  d  i  a b  e  t e  s /  b a  s i  c s  / t  y p  e  2 .  h t  m  l
2.  Guariguata, L. et al. Global estimates of diabetes prevalence for 2013 and projections for 2035. Diabetes Res. Clin. Pract. 103 (2), 137-149 (2014).
3.  US Preventive Services Task Force. Screening for prediabetes and type 2 diabetes: US preventive services task force recommendation statement. JAMA 326 (8), 736-743 (2021).
4.  ElSayed,  N.  A.  et  al.  2.  Classification  and  diagnosis  of  diabetes:  standards  of  care  in  Diabetes-2023. Diabetes  Care . 46 (Supplement\_1), S19-40 (2022).
5.  CDC. Diabetes Testing [Internet]. Centers for Disease Control and Prevention. 2023 [cited 2024 Feb 14].   h  t  t  p  s  :  /  /  w  w  w  .  c  d  c  .  g  o  v  /  d  i  a b  e  t e  s /  b a  s i  c s  / g  e t  t i  n g  t  e s  t e  d  . h  t  m  l
6.  Hu, F. B. Metabolic profiling of diabetes: from Black-Box epidemiology to systems epidemiology. Clin. Chem. 57 (9), 1224-1226 (2011).
7.  Dimas, A. S. et al. Impact of type 2 diabetes susceptibility variants on quantitative glycemic traits reveals mechanistic heterogeneity. Diabetes 63 (6), 2158-2171 (2014).
8.  Franks, P . W ., Pearson, E. &amp; Florez, J. C. Gene-environment and gene-treatment interactions in type 2 diabetes: Progress, pitfalls, and prospects. Diabetes Care . 36 (5), 1413-1421 (2013).
9.  Deutsch, A. J., Ahlqvist, E. &amp; Udler, M. S. Phenotypic and genetic classification of diabetes. Diabetologia 65 (11), 1758-1769 (2022).
10.  Ahlqvist, E. et al. Novel subgroups of adult-onset diabetes and their association with outcomes: a data-driven cluster analysis of six variables. Lancet Diabetes Endocrinol. 6 (5), 361-369 (2018).
11.  Kim, H. et al. High-throughput genetic clustering of type 2 diabetes loci reveals heterogeneous mechanistic pathways of metabolic disease. Diabetologia 66 (3), 495-507 (2023).
12.  Pathophysiology-based subphenotyping of. individuals at elevated risk for type 2 diabetes | Nature Medicine [Internet]. [cited 2024 Apr 23]. https://www.nature.com/articles/s41591-020-1116-9
13.  Anderson, A. E. et al. Electronic health record phenotyping improves detection and screening of type 2 diabetes in the general united States population: A cross-sectional, unselected, retrospective study. J. Biomed. Inf. 60 , 162-168 (2016).
14.  Landi, I. et al. Deep representation learning of electronic health records to unlock patient stratification at scale. NPJ Digit. Med. 3 (1), 96 (2020).
15.  Lou, J., Wang, Y., Li, L. &amp; Zeng, D. Learning latent heterogeneity for type 2 diabetes patients using longitudinal health markers in electronic health records. Stat. Med. 40 (8), 1930 (2021).
16.  Bej, S. et al. Identification and epidemiological characterization of Type-2 diabetes sub-population using an unsupervised machine learning approach. Nutr. Diabetes . 12 (1), 27 (2022).
17.  Ramirez, A. H. et al. The all of Us research program: data quality, utility, and diversity. Patterns . 3 (8). (2022).
18.  Boutin, N. T. et al. The evolution of a large biobank at mass general Brigham. J. Pers. Med. 12 (8), 1323 (2022).
19.  Type 2 Diabetes Mellitus | PheKB [Internet]. [cited 2024 Feb 13].   h  t  t  p  s  :  /  /  p  h  e  k  b  .  o  r  g  /  p  h  e  n  o  t  y  p  e  /  t  y  p  e  -  2  -  d  i  a  b  e  t  e  s  m  e  l l  i t  u  s
20.  Szczerbinski,  L.  et  al.  Algorithms  for  the  identification  of  prevalent  diabetes  in  the  All  of  Us  Research  Program  validated using  polygenic  scores-a  new  resource  for  diabetes  precision  medicine  [Internet].  medRxiv;  2023  [cited  2024  Apr  12].  p. 2023.09.05.23295061. https://www.  medrxiv.org/  content/  https://d  oi.org/10.1101/2023.09.05.23295061v1
21.  Zhang, Y. et al. High-throughput phenotyping with electronic medical record data using a common semi-supervised approach (PheCAP). Nat. Protoc. 14 (12), 3426-3444 (2019).
22.  Bahri, D., Jiang, H., Tay, Y. &amp; Metzler, D. SCARF: Self-Supervised Contrastive Learning using Random Feature Corruption. arXiv; [cited 2025 Jun 9]. (2022). http://arxiv.org/abs/2106.15147
23.  Huang,  X.,  Khetan,  A.,  Cvitkovic,  M.  &amp;  Karnin,  Z.  TabTransformer:  Tabular  Data  Modeling  Using  Contextual  Embeddings [Internet]. arXiv; [cited 2025 Jun 9]. (2020). http://arxiv.org/abs/2012.06678
24.  Kingma, D. P., Rezende, D. J., Mohamed, S. &amp; Welling, M. Semi-Supervised Learning with Deep Generative Models [Internet]. arXiv; [cited 2025 Jun 9]. (2014). http://arxiv.org/abs/1406.5298
25.  Principal Component Analysis [Internet]. New York: Springer-Verlag. [cited 2025 Jun 9]. (Springer Series in Statistics).   h  t  t  p  :  /  /  l  i  n  k .  s  p  r  i  n  g  e  r  .  c  o  m  / (2002). https://doi.org/10.1007/b98835
26.  McInnes, L., Healy, J. &amp; Melville, J. UMAP: Uniform manifold approximation and projection for dimension reduction. arXiv; [cited 2025 Jun 9]. (2020). http://arxiv.org/abs/1802.03426
27.  Wilson, P . W . F. et al. Sr. Prediction of incident diabetes mellitus in Middle-aged adults: the Framingham offspring study. Arch. Intern. Med. 167 (10), 1068-1074 (2007).
28.  Tests of Glycemia for the Diagnosis of Type 2 Diabetes Mellitus. | Annals of Internal Medicine [Internet]. [cited 2024 Feb 14]. https://www.  acpjournals.  org/doi/full  /  h  t  t  p  s  :  /  /  d  o  i  .  o  r  g  /  1  0 .  7 3  2  6 /  0 0  0  3 -  4 8  1  9 -  1 3  7  4  2  0  0 2  0  8 2  0  0 -  0 0  0  1  1
29.  Shepherd, M. H. et al. A UK nationwide prospective study of treatment change in MODY: genetic subtype and clinical characteristics predict optimal glycaemic control after discontinuing insulin and Metformin. Diabetologia 61 (12), 2520-2527 (2018).
30.  DiCorpo, D. et al. Type 2 diabetes partitioned polygenic scores associate with disease outcomes in 454,193 individuals across 13 cohorts. Diabetes Care . 45 (3), 674-683 (2022).
31.  Edlitz, Y. &amp; Segal, E. Prediction of type 2 diabetes mellitus onset using logistic regression-based scorecards. eLife 11 , e71862 (2022).
32.  Brisimi, T. S. et al. Predicting Chronic Disease Hospitalizations from Electronic Health Records: An Interpretable Classification Approach [Internet]. arXiv; [cited 2025 Mar 1]. (2018). http://arxiv.org/abs/1801.01204
33.  Ganz, M. L. et al. The association of body mass index with the risk of type 2 diabetes: a case-control study nested in an electronic health records system in the united States. Diabetol. Metab. Syndr. 6 (1), 50 (2014).
34.  Lee, D. H. et al. Comparison of the association of predicted fat mass, body mass index, and other obesity indicators with type 2 diabetes risk: two large prospective studies in US men and women. Eur. J. Epidemiol. 33 (11), 1113-1123 (2018).
35.  Barr, R. G., Nathan, D. M., Meigs, J. B. &amp; Singer, D. E. Tests of glycemia for the diagnosis of type 2 diabetes mellitus. Ann. Intern. Med. 137 (4), 263-272 (2002).
36.  Sevilla-González, M., del Quintana-Mendoza, R. &amp; Aguilar-Salinas, B. M. Interaction between depression, obesity, and type 2 diabetes: A complex picture. Arch. Med. Res. 48 (7), 582-591 (2017).
37.  Schlienger, J. L. Type 2 diabetes complications. Presse Medicale Paris Fr. 42 (5), 839-848 (2013).

38.  The Mental Health Comorbidities. of Diabetes | Diabetes | JAMA | JAMA Network [Internet]. [cited 2024 Apr 7].   h  t  t  p  s  :  /  /  j  a  m  a  n  e  t w  o  r k  . c  o  m  / j  o u  r  n a  l s  / j  a m  a  / a  r t  i c  l e  a  b  s t  r a  c t  / 1  8  8 8  6  8  1
39.  Mechanisms of Disease. hepatic steatosis in type 2 diabetes-pathogenesis and clinical relevance | Nature Reviews Endocrinology [Internet]. [cited 2024 Apr 7]. https://www.nature.com/articles/ncpendmet0190
40.  Changing epidemiology of type 2 diabetes mellitus. and associated chronic kidney disease | Nature Reviews Nephrology [Internet]. [cited 2024 Apr 7]. https://www.nature.com/articles/nrneph.2015.173
41.  CDC. Defining Adult Overweight and Obesity [Internet]. Centers for Disease Control and Prevention. 2022 [cited 2024 Feb 13].   h t  t p  s :  / /  w  w  w  . c  d  c .  g o  v  / o  b  e s  i t  y /  b a  s i  c s  / a  d  u l  t -  d e  fi n i  n g  . h  t  m  l
42.  Ortega, F. B., Lavie, C. J. &amp; Blair, S. N. Obesity and cardiovascular disease. Circ. Res. 118 (11), 1752-1770 (2016).
43.  Khan, S. S. et al. Association of body mass index with lifetime risk of cardiovascular disease and compression of morbidity. JAMA Cardiol. 3 (4), 280-287 (2018).
44.  Magallares, A. &amp; Pais-Ribeiro, J. L. Mental health and obesity: A meta-analysis. Appl. Res. Qual. Life . 9 (2), 295-308 (2014).
45.  Scott, K. M. et al. Obesity and mental disorders in the general population: results from the world mental health surveys. Int. J. Obes. 32 (1), 192-200 (2008).
46.  Deutsch, A. J. et al. Type 2 diabetes polygenic score predicts the risk of Glucocorticoid-Induced hyperglycemia in patients without diabetes. Diabetes Care . 46 (8), 1541-1545 (2023).
47.  Smith, K. et al. Multi-ancestry polygenic mechanisms of type 2 diabetes. Nat. Med. 30 (4), 1065-1074 (2024).
48.  CDC. Prediabetes - Your Chance to Prevent Type 2 Diabetes [Internet]. Centers for Disease Control and Prevention. 2021 [cited 2024 Feb 15]. http://bit.ly/2hMpYrt
49.  Jiang, L. Y. et al. Health system-scale language models are all-purpose prediction engines. Nature 619 (7969), 357-362 (2023).
50.  van Leeuwen, K. G., Schalekamp, S., Rutten, M. J. C. M., van Ginneken, B. &amp; de Rooij, M. Artificial intelligence in radiology: 100 commercially available products and their scientific evidence. Eur. Radiol. 31 (6), 3797-3804 (2021).
51.  Fix, E. &amp; Hodges, J. L. Discriminatory Analysis. Nonparametric discrimination: consistency properties. Int. Stat. Rev. Rev. Int. Stat. 57 (3), 238-247 (1989).
52.  Ge, W . Deep metric learning with hierarchical triplet loss. In Proceedings of the European Conference on Computer Vision (ECCV) , 269-285 (2018).
53.  Pedregosa, F. et al. Scikit-learn: machine learning in python. J. Mach. Learn. Res. 12 (85), 2825-2830 (2011).
54.  Sohn,  K.  Improved  deep  metric  learning  with  multi-class  n-pair  loss  objective.  In Advances in Neural Information Processing Systems , 1857-1865 (2016).
55.  Oh Song, H., Xiang, Y., Jegelka, S. &amp; Savarese, S. Deep metric learning via lifted structured feature embedding. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition , 4004-4012 (2016).
56.  Movshovitz-Attias, Y., Toshev, A., Leung, T. K., Ioffe, S. &amp; Singh, S. No fuss distance metric learning using proxies. In Proceedings of the IEEE International Conference on Computer Vision (ICCV) (2017).
57.  Lloyd, S. Least squares quantization in PCM. IEEE Trans. Inf. Theory . 28 (2), 129-137 (1982).
58.  Ge, T., Chen, C. Y., Ni, Y., Feng, Y. C. A. &amp; Smoller, J. W . Polygenic prediction via bayesian regression and continuous shrinkage priors. Nat. Commun. 10 (1), 1776 (2019).
59.  Discovery of 318 new risk loci for type 2 diabetes and related vascular outcomes among 1.4 million participants in a multi-ancestry meta-analysis | Nature Genetics [Internet]. [cited 2024 Feb 16].  https://www.nature.com/articles/s41588-020-0637-y
60.  FinnGen provides genetic. insights from a well-phenotyped isolated population | Nature [Internet]. [cited 2024 Feb 16].   h  t  t  p  s  :  /  /  w w  w  . n  a  t u  r e  . c  o  m  / a  r t  i c  l e  s /  s 4  1  5 8  6  0  2  2 -  0 5  4  7 3  -  8
61.  Hajian-Tilaki, K. Receiver operating characteristic (ROC) curve analysis for medical diagnostic test evaluation. Casp. J. Intern. Med. 4 (2), 627-635 (2013).
62.  Altmann, A., Toloşi, L., Sander, O. &amp; Lengauer, T. Permutation importance: a corrected feature importance measure. Bioinformatics 26 (10), 1340-1347 (2010).
63.  Pearson, K. X. On the criterion that a given system of deviations from the probable in the case of a correlated system of variables is such that it can be reasonably supposed to have arisen from random sampling. Lond. Edinb. Dublin Philos. Mag J. Sci. 50 (302), 157-175 (1900).
64.  Girden, E. R. ANOVA: Repeated Measures , 88 (SAGE, 1992).
65.  Massey, F. J. The Kolmogorov-Smirnov test for goodness of fit. J. Am. Stat. Assoc. 46 (253), 68-78 (1951).
66.  Armstrong, R. A. When to use the bonferroni correction. Ophthalmic Physiol. Opt. J. Br. Coll. Ophthalmic Opt. Optom. 34 (5), 502-508 (2014).

## Lời cảm ơn

The All of Us Research Program is supported by the National Institutes of Health, Office of the Director: Regional Medical Centers: 1 OT2 OD026549; 1 OT2 OD026554; 1 OT2 OD026557; 1 OT2 OD026556; 1 OT2 OD026550; 1 OT2 OD 026552; 1 OT2 OD026553; 1 OT2 OD026548; 1 OT2 OD026551; 1 OT2 OD026555; IAA #: AOD 16037; Federally Qualified Health Centers: HHSN 263201600085U; Data and Research Center: 5 U2C OD023196; Biobank: 1 U24 OD023121; The Participant Center: U24 OD023176; Participant Technology Systems Center: 1 U24 OD023163; Communications and Engagement: 3 OT2 OD023205; 3 OT2 OD023206; and Community Partners: 1 OT2 OD025277; 3 OT2 OD025315; 1 OT2 OD025337; 1 OT2 OD025276. In addition, the All of Us Research Program would not be possible without the partnership of its participants. Supported in part by Quanta Computing, a National Science Foundation (NSF) 22-586 Faculty Early Career Development Award (#2339381), a Gordon &amp; Betty Moore Foundation award, a Google Research Scholar award and the AI2050 Program at Schmidt Sciences.

## Đóng góp của tác giả

Q.J. and H.Z. performed the experiments, prepared the figures, and wrote the main manuscript text. M. G. and M.U. supervised the project. L.S. provided the main point of clinical support. J.Z., W .G., X.X., K.W., and T.H. contributed to manuscript writing. S.H., R.M., A.D., A.M., and J.M. provided valuable dataset support and technical guidance. All authors reviewed and edited the manuscript.

## Tuyên bố

## Lợi ích cạnh tranh

Các tác giả tuyên bố không có lợi ích cạnh tranh.

## Thông tin bổ sung

Thông tin Bổ sung Phiên bản trực tuyến chứa tài liệu bổ sung có sẵn tại   h  t  t  p  s  :  /  /  d  o  i  .  o  r  g  /  1 0  . 1  0  3 8  / s  4 1  5  9 8  0  2  5 -  2 5  7  5 9  x  .

Thư từ trao đổi và yêu cầu tài liệu nên được gửi đến Q.J.

Thông tin về tái bản và quyền có sẵn tại www.nature.com/reprints.

Lưu ý của nhà xuất bản Springer Nature giữ thái độ trung lập đối với các tuyên bố về quyền tài phán trong các bản đồ đã công bố và các liên kết thể chế.

Truy cập Mở (Open Access) Bài báo này được cấp phép theo Giấy phép Quốc tế Creative Commons Attribution-NonCommercial-NoDerivatives 4.0, cho phép bất kỳ việc sử dụng phi thương mại, chia sẻ, phân phối và tái sản xuất nào trong bất kỳ phương tiện hoặc định dạng nào, miễn là bạn ghi nhận thích đáng tác giả gốc và nguồn, cung cấp một liên kết đến giấy phép Creative Commons, và chỉ ra liệu bạn có sửa đổi tài liệu được cấp phép hay không. Bạn không có quyền theo giấy phép này để chia sẻ tài liệu được phỏng theo (adapted material) được suy ra từ bài báo này hoặc các phần của nó. Các hình ảnh hoặc tài liệu bên thứ ba khác trong bài báo này được bao gồm trong giấy phép Creative Commons của bài báo, trừ khi được chỉ định khác trong một dòng ghi nhận đối với tài liệu. Nếu tài liệu không được bao gồm trong giấy phép Creative Commons của bài báo và việc sử dụng dự kiến của bạn không được phép bởi quy định pháp luật hoặc vượt quá mức sử dụng được cho phép, bạn sẽ cần xin phép trực tiếp từ chủ sở hữu bản quyền. Để xem một bản sao của giấy phép này, hãy truy cập   h  t  t  p  :  /  /  c  r  e  a  t  i  v  e  c  o  m  m  o n  s .  o r  g /  l i  c e  n  s e  s /  b y  n  c  n  d  / 4  . 0  /  .

© The Author(s) 2025
