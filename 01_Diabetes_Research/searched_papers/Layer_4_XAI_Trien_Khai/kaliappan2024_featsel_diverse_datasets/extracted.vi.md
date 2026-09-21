<!-- extracted by pdf-extract | engine=docling | pages=23 | ocr=False | tables=11/10 | density=1.07 | score=100 -->

## OPEN ACCESS

## EDITED BY

Anderson Rodrigues dos Santos,

Federal University of Uberlandia, Brazil

REVIEWED BY Alaa F. Sheta, Southern Connecticut State University, United States Abhimanyu Banerjee, Illumina, United States

*CORRESPONDENCE Yassine Himeur yhimeur@ud.ac.ae

NHẬN 22 April 2024 CHẤP NHẬN 24 July 2024 CÔNG BỐ

21 August 2024

## CITATION

Kaliappan J, Saravana Kumar IJ, Sundaravelan S, Anesh T, Rithik RR, Singh Y, Vera-Garcia DV, Himeur Y, Mansoor W, Atalla S and Srinivasan K (2024) Analyzing classification and feature selection strategies for diabetes prediction across diverse diabetes datasets. Front. Artif. Intell. 7:1421751. doi: 10.3389/frai.2024.1421751

## COPYRIGHT

© 2024 Kaliappan, Saravana Kumar, Sundaravelan, Anesh, Rithik, Singh, Vera-Garcia, Himeur, Mansoor, Atalla and Srinivasan. This is an open-access article distributed under the terms of the Creative Commons Attribution License (CC BY). The use, distribution or reproduction in other forums is permitted, provided the original author(s) and the copyright owner(s) are credited and that the original publication in this journal is cited, in accordance with accepted academic practice. No use, distribution or reproduction is permitted which does not comply with these terms.

## Phân tích các chiến lược phân loại và lựa chọn đặc trưng cho dự đoán đái tháo đường trên các bộ dữ liệu đái tháo đường đa dạng

Jayakumar Kaliappan 1 , I. J. Saravana Kumar 1 , S. Sundaravelan 1 , T. Anesh 1 , R. R. Rithik 1 , Yashbir Singh 2 , Diana V. Vera-Garcia 2 , Yassine Himeur 3 *, Wathiq Mansoor 3 , Shadi Atalla 3 and Kathiravan Srinivasan 1

1 School of Computer Science and Engineering, Vellore Institute of Technology, Vellore, India, 2 Radiology, Mayo Clinic, Rochester, MN, United States, 3 College of Engineering and Information Technology, University of Dubai, Dubai, United Arab Emirates

Giới thiệu: Trong bối cảnh đang tiến hóa của chăm sóc sức khỏe và y học, sự hợp nhất của các bộ dữ liệu y khoa khổng lồ với các khả năng mạnh mẽ của các mô hình học máy (ML) mở ra một cơ hội đáng kể để biến đổi chẩn đoán, điều trị, và chăm sóc bệnh nhân.

Phương pháp: Bài báo nghiên cứu này đi sâu vào lĩnh vực chăm sóc sức khỏe dựa trên dữ liệu, đặt trọng tâm đặc biệt vào việc xác định các mô hình ML hiệu quả nhất cho dự đoán đái tháo đường và khám phá các đặc trưng then chốt hỗ trợ cho dự đoán này. Hiệu năng dự đoán được phân tích dùng nhiều mô hình ML, như Random Forest (RF), XG Boost (XGB), Linear Regression (LR), Gradient Boosting (GB), và Support Vector Machine (SVM), trên nhiều bộ dữ liệu y khoa. Nghiên cứu về tầm quan trọng đặc trưng được tiến hành dùng các phương pháp bao gồm các kỹ thuật dựa trên Filter, dựa trên Wrapper, và Trí tuệ Nhân tạo Khả diễn giải (Explainable AI). Bằng cách dùng các kỹ thuật Explainable AI, cụ thể là Local Interpretable Model-agnostic Explanations (LIME) và SHapley Additive exPlanations (SHAP), quá trình ra quyết định của các mô hình được đảm bảo minh bạch, qua đó củng cố niềm tin vào các quyết định do AI dẫn dắt.

Kết quả: Các đặc trưng được xác định bởi RF trong các kỹ thuật dựa trên Wrapper và Chi-square trong các kỹ thuật dựa trên Filter đã được cho thấy là nâng cao hiệu năng dự đoán. Các giá trị precision và recall đáng chú ý, đạt tới 0.9 đạt được trong dự đoán đái tháo đường.

Thảo luận: Cả hai cách tiếp cận đều được thấy là gán tầm quan trọng đáng kể cho các đặc trưng như tuổi, tiền sử gia đình mắc đái tháo đường, polyuria, polydipsia, và huyết áp cao, vốn liên hệ mạnh với đái tháo đường. Trong thời đại chăm sóc sức khỏe dựa trên dữ liệu này, nghiên cứu trình bày ở đây mong muốn cải thiện đáng kể các kết cục chăm sóc sức khỏe.

## KEYWORDS

machine learning, diabetes prediction, explainable AI, filter-based feature selection, wrapper-based feature selection

## 1 Giới thiệu

Đái tháo đường (Diabetes Mellitus), thường được gọi là diabetes, là một mối lo ngại sức khỏe toàn cầu phổ biến. Trong lịch sử, nó chủ yếu phổ biến ở những người trung niên và cao tuổi. Tuy nhiên, các diễn biến gần đây, như các tiến bộ công nghệ và sự sẵn có ngày càng tăng của thức ăn nhanh, đã góp phần vào tỷ lệ mắc gia tăng của nó ở các quần thể trẻ hơn. Nguyên nhân học chính của đái tháo đường được đặc trưng bởi mức đường huyết tăng cao do sử dụng insulin không hiệu quả trong cơ thể người. Có hai loại đái tháo đường chính: Type 1, được đặc trưng bởi sự thiếu hụt insulin tuyệt đối với cơ sở tự miễn, và Type 2, do đề kháng insulin (Alam et al., 2014). Các triệu chứng chẩn đoán của đái tháo đường được nhận diện bởi nồng độ glucose huyết tương vượt 11.1 mmol/L, kèm theo khát nước quá mức (polydipsia), sụt cân không giải thích được, và tiểu nhiều (polyuria) (Deshmukh et al., 2015). Đái tháo đường liên quan tới các rủi ro sức khỏe lâu dài đáng kể, bao gồm đột quỵ, bệnh tim mạch, nhồi máu cơ tim, suy thận, và bệnh động mạch ngoại biên, cũng như các biến chứng ở mạch máu và thần kinh (Nathan, 1993; Krasteva et al., 2014). Quần thể toàn cầu bị ảnh hưởng bởi đái tháo đường được dự báo sẽ hơn gấp đôi vào năm 2030, ngay cả trong kịch bản khó xảy ra rằng tỷ lệ béo phì giữ nguyên. Sự gia tăng dự kiến này được quy cho các tác động của đô thị hóa và quần thể già hóa. Xu hướng này gây lo ngại đáng kể do tỷ lệ béo phì leo thang trên toàn thế giới và vai trò đáng kể mà béo phì đóng vai trò là một yếu tố nguy cơ cho đái tháo đường (Setacci et al., 2009). Các biện pháp phòng ngừa đái tháo đường bao gồm thúc đẩy tăng cường hoạt động thể chất, tuân thủ một chế độ ăn cân bằng, duy trì một chỉ số khối cơ thể khỏe mạnh, và chấm dứt các hành vi sức khỏe có hại, như hút thuốc (Suryasa et al., 2021). Các cá nhân mắc đái tháo đường phụ thuộc insulin và những người ở các giai đoạn đầu của bệnh võng mạc tăng sinh là hai nhóm hưởng lợi đáng kể từ phát hiện sớm và điều trị kịp thời đái tháo đường (Bennett and Knowler, 1984). Đối với một tỷ lệ đáng kể bệnh nhân, quản lý đái tháo đường kịp thời và hiệu quả được thấy là giúp ngăn ngừa các biến chứng mạch máu và làm chậm sự suy giảm thêm của chức năng tế bào beta vốn đã suy yếu (Ambady and Chamukuttan, 2008).

Trong ngành chăm sóc sức khỏe, dữ liệu lớn bao gồm các bộ dữ liệu sức khỏe điện tử phức tạp mà các công cụ phần mềm truyền thống thường khó quản lý hiệu quả (Habchi et al., 2023). Phân tích chăm sóc sức khỏe liên quan tới việc sử dụng có phương pháp các bộ dữ liệu này để trích các hiểu biết giá trị, hỗ trợ các quá trình ra quyết định, hỗ trợ lập kế hoạch, thúc đẩy học hỏi, và cho phép dự đoán và phát hiện bệnh sớm thông qua nhiều mô hình và cách tiếp cận khác nhau (Asri et al., 2015; Dash et al., 2019). Sự tiến bộ liên tục của học máy (ML) là một xu hướng đang diễn ra được ngành chăm sóc sức khỏe theo dõi sát sao (Patel et al., 2023; Singh et al., 2023). Các nguyên lý ML là công cụ hỗ trợ các chuyên gia chăm sóc sức khỏe và bác sĩ phẫu thuật trong việc cứu mạng, tạo thuận lợi cho nhận diện bệnh sớm, cải thiện quản lý bệnh nhân, nâng cao sự tham gia của bệnh nhân vào quá trình hồi phục của họ, và nhiều ứng dụng khác (Farrelly et al., 2023). Trên toàn cầu, các tổ chức chăm sóc sức khỏe đang tận dụng các giải pháp do AI dẫn dắt và các mô hình ML để nâng cao việc cung cấp các dịch vụ y khoa, cuối cùng tạo thuận lợi cho việc phát triển các phương pháp điều trị cho các bệnh nặng với hiệu quả lớn hơn (Javaid et al., 2022; Dixit et al., 2023).

Các đóng góp đề xuất của nghiên cứu này bao gồm:

- Điểm mới trong công trình này là việc chọn các đặc trưng tốt nhất từ các cách tiếp cận dựa trên filter và wrapper cho bốn bộ dữ liệu này.
- Theo hiểu biết tốt nhất của chúng tôi, đây là lần đầu tiên nghiên cứu về tầm quan trọng đặc trưng được áp dụng cho bốn bộ dữ liệu này.
- Việc so sánh giữa hiệu năng của các cách tiếp cận lựa chọn đặc trưng và học ensemble cho dự đoán đái tháo đường được thực hiện.
- Các kỹ thuật khả diễn giải SHAP và LIME giúp các bác sĩ lâm sàng hiểu rõ quyết định của thuật toán ML và xác định các mối quan hệ giữa các đặc điểm bệnh nhân và nguy cơ đái tháo đường.

## 2 Tổng quan tài liệu

## 2.1 Dự đoán đái tháo đường dựa trên trích xuất đặc trưng

Trích xuất đặc trưng được thực hiện dùng phân tích thành phần chính, theo sau là việc áp dụng các bộ lọc tái lấy mẫu. Ba phương pháp phân loại được dùng: K-Nearest Neighbors (KNN), Naive Bayes, và Decision Tree. Độ chính xác cao nhất đạt được, 94.4%, thu được với bộ phân loại Decision Tree (Saru and Subashree, 2019). Xây dựng trên cách tiếp cận này, Sisodhia cũng bao gồm tiền xử lý trong phân tích của họ, dùng các bộ phân loại như Naive Bayes, SVM, và Decision Tree. Người ta thấy rằng Naive Bayes thể hiện độ chính xác cao nhất trong ba bộ phân loại (Sisodia and Sisodia, 2018). Mở rộng việc dùng ML cho chẩn đoán sức khỏe, Sarwar et al. (2018) phát triển một mô hình cho phát hiện sớm đái tháo đường. Mô hình này dùng một bộ dữ liệu bao gồm các đặc trưng then chốt như hàm phả hệ đái tháo đường và Body Mass Index (BMI). Vài thuật toán ML được kiểm tra, với SVM và KNN đạt các điểm độ chính xác cao nhất, chứng minh tiềm năng của các kỹ thuật này trong các ứng dụng lâm sàng.

Tương tự, Sharma et al. (2021) chọn bộ dữ liệu Pima Indian Diabetic và áp dụng bốn mô hình ML để phân tích. Trong các mô hình này, độ chính xác cao nhất, ghi nhận ở 80.43%, đạt được bởi thuật toán Logistic Regression, minh họa tính hiệu quả của mô hình cụ thể này cho bộ dữ liệu này. Trong một nỗ lực nhắm tới giảm các lỗi chẩn đoán, Mujumdar and Vaidehi (2019) tập trung vào giảm nhẹ các false negative, false positive, và các lỗi không phân loại được dùng một cách tiếp cận năm-mô-đun có cấu trúc. Các mô-đun này bao gồm thu thập dữ liệu, tiền xử lý, phân cụm, phát triển mô hình, và đánh giá. Phân cụm K-means chứng minh một tương quan đáng kể giữa các thuộc tính 'Glucose' và 'Age'. Sau đó, Logistic Regression được xác định là mô hình hiệu quả nhất với độ chính xác 96%. Ngoài ra, khi các kỹ thuật pipeline được áp dụng, bộ phân loại AdaBoost đạt độ chính xác 98%, cho thấy lợi ích của tiền xử lý tiên tiến và các phương pháp ensemble. Giải quyết mất cân bằng lớp, Tasin et al. (2023) tập trung vào dự đoán các đặc tính insulin dùng một mô hình bán giám sát với high gradient boosting. Các kỹ thuật như Synthetic Minority Over-sampling Technique (SMOTE) và Adaptive Synthetic (ADASYN) sampling được dùng. Cách tiếp cận này dẫn tới một bộ phân loại XGBoost đạt độ chính xác cao nhất 81%, một AUC 0.84, và một F1 score 0.81, điều làm nổi bật tính hữu dụng của gradient boosting trong việc quản lý các phân phối dữ liệu lệch.

Tiếp tục tập trung vào đái tháo đường Type 1, Xue et al. (2020) nhấn mạnh tầm quan trọng của nhận diện sớm do tổn thương lâu dài tiềm tàng cho các cơ quan trọng yếu. Nghiên cứu thấy SVM hoạt động tốt nhất trong nhận diện các triệu chứng đái tháo đường sớm, nhấn mạnh nhu cầu về các bộ phân loại hiệu quả và chính xác trong tiên lượng y khoa. Khám phá thêm các phương pháp ensemble, Vijayan and Anjali (2015) đề xuất một hệ thống hỗ trợ quyết định dùng thuật toán AdaBoost với một Decision Stump làm bộ phân loại cơ sở. Khi Decision Tree được dùng làm bộ phân loại cơ sở, AdaBoost đạt độ chính xác 80.72%, cho thấy tính hiệu quả của việc kết hợp nhiều thuật toán học để cải thiện độ chính xác dự đoán. Về mặt phân tích hiệu năng, Lyngdoh et al. (2021) tiến hành các nghiên cứu trên năm thuật toán ML có giám sát để dự đoán nguy cơ đái tháo đường. Việc bao gồm nhất quán tất cả các biến nguy cơ hiện có dẫn tới một sự gia tăng độ chính xác, với bộ phân loại KNN đạt tới 76% độ chính xác. Phát hiện này nhấn mạnh tầm quan trọng của lựa chọn đặc trưng toàn diện trong phát triển các mô hình dự đoán (Lyngdoh et al., 2021).

Tripathi and Kumar (2020) đóng góp vào việc cá nhân hóa chẩn đoán bệnh nhân, căn chỉnh các kết quả sát với các kết cục lâm sàng. Dùng bốn phương pháp ML, RF được thấy vượt các thuật toán phân loại khác với độ chính xác cao nhất 87.66%, chứng minh tính bền vững của nó trong việc xử lý dữ liệu lâm sàng đa dạng. Trong một nghiên cứu liên quan, Shafi and Ansari (2021) khảo sát hiệu năng của Fasting Plasma Glucose (FPG) và Hemoglobin A1c (HbA1c) làm các đặc trưng dự đoán cho đái tháo đường. Nhiều bộ phân loại ML và các kỹ thuật loại bỏ đặc trưng được dùng để đạt các kết quả thuận lợi, càng nhấn mạnh vai trò của lựa chọn đặc trưng trong nâng cao hiệu năng phân loại. Cuối cùng, Sisodia and Sisodia (2018) và Ahmad et al. (2021) đều tập trung vào nâng cao độ chính xác trong dự đoán khả năng mắc đái tháo đường. Nghiên cứu của Ahmad et al. (2021), dùng ba phương pháp phân loại ML, thấy Naive Bayes đặc biệt hiệu quả với độ chính xác 76.30%. Trong khi đó, Sisodia and Sisodia (2018) phát triển một khung toàn diện nhằm tối đa hóa độ chính xác của phát hiện đái tháo đường dùng nhiều kỹ thuật ML, dùng bộ dữ liệu Pima Indian Diabetes từ kho UCI. Cùng nhau, các nghiên cứu này minh họa các tiến bộ đang diễn ra trong ML cho dự đoán đái tháo đường, với trọng tâm vào độ chính xác và phát hiện sớm.

## 2.2 Các khung đa-phân-loại cho dự đoán đái tháo đường

Abnoosian et al. (2023) trình bày một khung đa-phân-loại dùng nhiều mô hình học máy (k-NN, SVM, DT, RF, AdaBoost, và GNB) và một cách tiếp cận ensemble có trọng số để giải quyết các thách thức như dữ liệu được gán nhãn hạn chế, giá trị thiếu thường xuyên, và mất cân bằng bộ dữ liệu. Khung này, áp dụng cho Iraqi Patient Dataset of Diabetes, đạt hiệu năng cao với độ chính xác trung bình 98.87% và AUC 0.999. Reza et al. (2023) đề xuất một kernel phi tuyến cải tiến cho mô hình SVM để nâng cao phân loại đái tháo đường Type 2 dùng bộ dữ liệu PIMA. Cách tiếp cận của họ giải quyết các giá trị thiếu và mất cân bằng lớp, đem lại các thước đo hiệu năng cải thiện như độ chính xác 85.5% và AUC 85.5%.

## 2.3 Học ensemble và các mô hình lai (hybrid)

Ganie et al. (2023) tập trung vào việc dùng năm thuật toán boosting trên bộ dữ liệu Pima diabetes, với Gradient Boosting đạt tỷ lệ độ chính xác cao nhất 92.85%. Họ chứng minh khả năng áp dụng của mô hình cho các bệnh khác có chỉ định tương tự. Do˘ gru et al.

(2023) phát triển một mô hình học super ensemble với bốn baselearner và một meta-learner (SVM), đạt các kết quả độ chính xác cao nhất cho dự đoán nguy cơ đái tháo đường giai đoạn sớm (99.6%), PIMA (92%), và các bộ dữ liệu diabetes 130-US hospitals (98%). Zhou et al. (2023) đề xuất một mô hình dự đoán đái tháo đường dùng lựa chọn đặc trưng Boruta và học ensemble, được kiểm chứng trên bộ dữ liệu PIMA Indian diabetes, đạt một tỷ lệ độ chính xác 98%.

## 2.4 Các cách tiếp cận học sâu

El-Bashbishy and El-Bakry (2024) trình bày một mô hình dựa trên học sâu dùng một thuật toán multi-layer perceptron (MLP) dựa trên DNN cho dự đoán đái tháo đường sớm, đạt một tỷ lệ độ chính xác cao 99.8% trên bộ dữ liệu Mansoura University Children's Hospital Diabetes (MUCHD).

## 2.5 Các đánh giá so sánh và các kỹ thuật lai

Saxena et al. (2023) cung cấp một đánh giá so sánh các mô hình học máy cổ điển và ensemble trên bộ dữ liệu PIMA Indian diabetes và một bộ dữ liệu dự đoán nguy cơ đái tháo đường giai đoạn sớm. Mô hình superlearner cung cấp độ chính xác tốt nhất 86% cho PIMA và 97% cho bộ dữ liệu dự đoán nguy cơ đái tháo đường giai đoạn sớm. Tasin et al. (2023) phát triển một hệ thống dự đoán đái tháo đường tự động dùng nhiều kỹ thuật học máy và một bộ dữ liệu riêng tư của các bệnh nhân nữ ở Bangladesh. Bộ phân loại XGBoost với cách tiếp cận ADASYN cung cấp các kết quả tốt nhất với 81% độ chính xác. Tripathi et al. (2023) phân tích nhiều thuật toán học máy và bộ phân loại trên bộ dữ liệu PIMA diabetes, dùng các kỹ thuật ensemble bỏ phiếu mềm (soft voting) để đạt độ chính xác cao nhất.

## 2.6 Các thuật toán sáng tạo và lấy cảm hứng từ tự nhiên

Jain and Singhal (2024) dùng các thuật toán metaheuristic lấy cảm hứng từ tự nhiên như Bat Algorithm và bộ phân loại Voting với Smote cho dự đoán đái tháo đường, đạt độ chính xác tối đa 98%. Alnowaiser (2024) đề xuất một phương pháp tự động để dự đoán đái tháo đường dùng KNN imputer và một bộ phân loại Tri-ensemble voting, đạt độ chính xác 97.49%. Shimpi et al. (2024) trình bày một mô hình phân tích dùng SVM, KNN, và Random Forest được tối ưu với decision-level fusion và Particle Swarm Optimization, đạt một tỷ lệ dự đoán 94.27%.

## 2.7 Khai phá dữ liệu và hợp nhất mô hình

Rastogi and Bansal (2023) đề xuất một mô hình dự đoán đái tháo đường dùng các kỹ thuật khai phá dữ liệu và bốn bộ phân loại, với Logistic Regression đạt độ chính xác cao nhất 82.46%. Zohair et al. (2024) phát triển một mô hình lai dùng ANN, AdaBoost, và RF với Logistic Regression cho phân loại nhị phân và đa lớp của đái tháo đường, đạt 97% độ chính xác cho phân loại nhị phân và 99%

TABLE 1 So sánh các nghiên cứu khác nhau về dự đoán đái tháo đường.

| Tài liệu                         | Mô hình sử dụng                                                                                                    | Loại dữ liệu hoặc bộ dữ liệu                                                  | Ứng dụng                               | Giá trị hiệu năng tốt nhất                                                        | Hạn chế                                                                |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Abnoosian et al. (2023)          | k-NN, SVM, DT, RF, AdaBoost, GNB                                                                                   | Iraqi Patient Dataset of Diabetes                                             | Diabetes prediction in three classes   | Accuracy: 0.9887, Precision: 0.9861, Recall: 0.9792, F1-score: 0.9851, AUC: 0.999 | Limited labeled data, frequent missing values, dataset imbalance       |
| Reza et al. (2023)               | SVMwith improved non-linear kernel                                                                                 | PIMA dataset                                                                  | Type 2 diabetes classification         | ACC: 85.5, Recall: 87.0, Precision: 83.4, F1 score: 85.2, AUC: 85.5               | Kernel function choice impacts performance                             |
| Ganie et al. (2023)              | Gradient Boosting                                                                                                  | Pima diabetes dataset (UCI repository)                                        | Early diabetes prediction              | Accuracy: 92.85%                                                                  | Limited to Pima dataset, potential overfitting                         |
| Saxena et al. (2023)             | Superlearner model                                                                                                 | PIMA Indian diabetes dataset, early-stage diabetes risk prediction dataset    | Diabetes risk prediction               | Accuracy: 86% (PIMA), 97% (risk prediction dataset)                               | Performance varies with dataset                                        |
| Tasin et al. (2023)              | XGBoost with ADASYN                                                                                                | Pima Indian diabetes dataset, private dataset of female Bangladeshi patients  | Diabetes prediction                    | Accuracy: 81%, F1 score: 0.81, AUC: 0.84                                          | Dataset-specific performance, need for domain adaptation               |
| Tripathi et al. (2023)           | Various MLalgorithms and classifiers                                                                               | Standardized PIMA diabetes data                                               | Diabetes prediction                    | Highest accuracy achieved using soft voting ensemble techniques                   | Limited to standardized PIMA data                                      |
| Do˘ gru et al. (2023)            | Super learner model (logistic regression, DT, RF, gradient boosting, SVM)                                          | Early-stage diabetes risk prediction, PIMA, diabetes 130-US hospitals dataset | Early diagnosis of diabetes mellitus   | Accuracy: 99.6% (risk prediction), 92% (PIMA), 98% (130-US hospitals)             | Dataset-specific performance, complexity of super learner model        |
| Rastogi and Bansal (2023)        | RF, SVM, Logistic Regression, Naive Bayes                                                                          | Kaggle dataset                                                                | Diabetes prediction                    | Accuracy: 82.46% (Logistic Regression)                                            | Lower accuracy compared to other studies                               |
| Zhou et al. (2023)               | Boruta feature selection, K-Means++, stacking ensemble                                                             | PIMA Indian diabetes dataset                                                  | Early detection of diabetes            | Accuracy: 98%                                                                     | Limited to PIMA dataset                                                |
| El-Bashbishy and El-Bakry (2024) | DNN-based MLP algorithm                                                                                            | MUCHDdataset                                                                  | Early diabetes prediction              | Accuracy: 99.8%                                                                   | Dataset-specific performance, potential for overfitting                |
| Modak and Jha (2024)             | Logistic Regression, SVM, Näve Bayes, Random Forest, XGBoost, LightGBM, CatBoost, Adaboost, Bagging                | Kaggle dataset                                                                | Diabetes prediction                    | Accuracy: 95.4% (CatBoost), AUC-ROC: 0.99                                         | Limited to Kaggle dataset, ensemble methods complexity                 |
| Zambrana et al. (2024)           | Ridge Classifier, Random Forest, Decision Tree                                                                     | Two diabetes datasets                                                         | Diabetes classification                | Accuracy: 95% (Random Forest, Decision Tree)                                      | Limited dataset, potential overfitting                                 |
| Wee et al. (2024)                | Machine learning and deep learning models                                                                          | Various datasets                                                              | Diabetes identification/classification | Accuracy: 86.7% (deep learning), 80.6% (machine learning)                         | Limited dataset availability, "black-box" nature of deep learning      |
| Jain and Singhal (2024)          | Ant Colony Optimization, Bat Algorithm, Cuttlefish Algorithm, Elephant Herd Optimization, Artificial Bee Algorithm | Specific dataset                                                              | Diabetes prediction                    | Accuracy: 98% (Voting classifier with Smote and Bat Algorithm)                    | Dataset-specific performance, complexity of nature-inspired algorithms |
| Shimpi et al. (2024)             | SVM, KNN, Random Forest, Particle Swarm Optimization (PSO)                                                         | Indian Pima diabetes dataset                                                  | Diabetes detection                     | Accuracy: 94.27% (Hybrid classifiers)                                             | Tedious hyper-parameter tuning, dataset-specific performance           |

(Continued)

TABLE 1 (Continued)

| Tài liệu             | Mô hình sử dụng                            | Loại dữ liệu hoặc bộ dữ liệu       | Ứng dụng                | Giá trị hiệu năng tốt nhất                                            | Hạn chế                                                  |
|----------------------|--------------------------------------------|------------------------------------|-------------------------|-----------------------------------------------------------------------|----------------------------------------------------------|
| Alnowaiser (2024)    | KNNimputer, Tri-ensemble voting classifier | Various datasets                   | Diabetes prediction     | Accuracy: 97.49%, Precision: 98.16%, Recall: 99.35%, F1 score: 98.84% | Handling of missing data, model complexity               |
| Zohair et al. (2024) | ANN, AdaBoost, RF, Logistic Regression     | Various datasets                   | Diabetes classification | Accuracy: 97% (binary), 99% (multiclass)                              | Dataset-specific performance, complexity of hybrid model |
| Talari et al. (2024) | SMO, SMOTE, Bagging Decision Trees         | Pima Indian Diabetes (PID) dataset | Diabetes prediction     | Accuracy: 99.07%, Runtime: 0.1 ms                                     | Limited to PID dataset, potential overfitting            |

cho đa lớp. Bảng 1 trình bày một so sánh các nghiên cứu khác nhau về dự đoán đái tháo đường dựa trên ML.

## 3 Phương pháp đề xuất

Phương pháp đề xuất để dự đoán đái tháo đường, như minh họa trong Hình 1, bắt đầu với tiền xử lý dữ liệu, một bước thiết yếu để đảm bảo dữ liệu sạch và dùng được. Giai đoạn tiền xử lý được theo sau bởi việc áp dụng hai phạm trù phương pháp chấm điểm tầm quan trọng đặc trưng: các kỹ thuật dựa trên filter và các phương pháp wrapper. Các phương pháp dựa trên filter được triển khai bao gồm Chi-square, Fisher's Score, phân tích các giá trị thiếu, và Information Gain, trong khi các phương pháp wrapper kết hợp các mô hình như Random Forest (RF), XGBoost Classifier, Gradient Boosting (GB) Classifier, Support Vector Machine (SVM), và Logistic Regression (LR).

Tập đặc trưng tốt nhất từ các phương pháp dựa trên filter và wrapper được chọn. Độ chính xác của bộ dữ liệu được đánh giá bằng cách xét cả tập đầy đủ các đặc trưng lẫn tập con các đặc trưng then chốt được xác định qua chấm điểm tầm quan trọng đặc trưng. Các mô hình ML được dùng cho đánh giá hiệu năng bao gồm XGBoost, Gradient Boosting, SVM, và Random Forest. Tiếp theo, nghiên cứu về phương pháp dùng một phương pháp ensemble, bộ phân loại stacking, được dùng để so sánh hiệu năng, với các mô hình nêu trên đóng vai trò là các mô hình cơ sở và Logistic Regression làm meta-model. Cuối cùng, để diễn giải và kiểm chứng các kết quả do các thuật toán ML tạo ra, các kỹ thuật explainable AI như Local Interpretable Model-agnostic Explanations (LIME) và SHapley Additive exPlanations (SHAP) được áp dụng. Các thước đo hiệu năng như điểm accuracy, precision, recall, và F1 score được đo cho cả tập đặc trưng đầy đủ lẫn các đặc trưng then chốt để hiểu toàn diện tác động của chúng lên dự đoán đái tháo đường.

## 3.1 Lựa chọn tầm quan trọng đặc trưng

Lựa chọn đặc trưng, còn được gọi là lựa chọn biến, lựa chọn thuộc tính, hoặc lựa chọn tập con biến, là một giai đoạn then chốt trong ML và phân tích dữ liệu. Từ toàn bộ tập các đặc trưng trong bộ dữ liệu, một tập con các đặc trưng liên quan (các biến dự báo, đặc điểm, hoặc biến đầu vào) được chọn để xây dựng một mô hình. Mục tiêu của lựa chọn đặc trưng là nâng cao khả năng diễn giải, giảm độ phức tạp tính toán, và cải thiện hiệu năng mô hình bằng cách tập trung vào các đặc điểm giàu thông tin và phân biệt nhất (Wei et al., 2020).

## 3.2 Lựa chọn đặc trưng dựa trên wrapper

Lựa chọn đặc trưng dựa trên wrapper là một kỹ thuật ML tiếp cận quá trình chọn các tập con đặc trưng như một bài toán tìm kiếm. Phương pháp này liên quan tới việc huấn luyện và đánh giá tính hiệu quả của các mô hình ML với nhiều tập con đặc trưng khác nhau để xác định tập con cung cấp hiệu năng dự đoán tốt nhất. Các phương pháp wrapper đánh giá các tập con đặc trưng bằng cách áp dụng một thuật toán ML cụ thể như một 'wrapper' (lớp bọc) quanh quá trình lựa chọn đặc trưng.

## 3.2.1 Random forest

Random Forest là một kỹ thuật trong đó vô số cây quyết định được xây dựng trong khi huấn luyện dùng ML ensemble, và các dự đoán của chúng sau đó được tổng hợp để tạo một dự đoán cuối cùng. Nó được áp dụng rộng rãi trong các bài toán liên quan tới cả hồi quy lẫn phân loại do độ chính xác và tính bền vững của nó.

Công thức cho Random Forest (tầm quan trọng đặc trưng dùng Gini impurity):

Trong Random Forest, tầm quan trọng đặc trưng thường được tính dựa trên mức giảm Gini impurity trung bình quy cho mỗi đặc trưng trên tất cả các cây trong rừng. Gọi imp( F ) biểu diễn điểm tầm quan trọng cho đặc trưng ( F ) và nó được tính dùng Phương trình 1.

- N trees là tổng số cây trong Random Forest.
- imp( F , i ) là mức giảm Gini impurity cho đặc trưng ( F ) trong cây thứ i .

Điểm tầm quan trọng ( F ) càng cao, đặc trưng càng liên quan trong việc đóng góp vào hiệu năng dự đoán của mô hình Random Forest.

## 3.2.2 Gradient boosting

Gradient Boosting là một phương pháp ensemble trong ML kết hợp một cách hệ thống các dự đoán của vài bộ học yếu (weak learner), thường là các cây quyết định, sao cho mỗi bộ học mới giải quyết các thiếu sót của bộ học trước. Cách tiếp cận này liên quan tới việc dùng gradient descent để tối thiểu hóa một hàm mất mát trong khi huấn luyện, qua đó tạo một mô hình dự đoán mạnh mẽ.

Công thức cho Gradient Boosting (tầm quan trọng đặc trưng dùng gain):

Trong Gradient Boosting, tầm quan trọng đặc trưng thường được tính dựa trên gain (hoặc mức cải thiện) trung bình trong hàm mất mát quy cho mỗi đặc trưng trên tất cả các vòng lặp boosting. Gọi gain( F ) biểu diễn gain trung bình cho một đặc trưng ( F ) được tính dùng Phương trình 2.

- M là tổng số vòng lặp boosting.
- Nm là số mẫu tại vòng lặp m .
- Gain( F , i , m ) là gain cho đặc trưng ( F ) tại vòng lặp m cho mẫu i .

Gain trung bình gain( F ) càng cao, đặc trưng càng quan trọng trong việc đóng góp vào hiệu năng dự đoán của mô hình.

## 3.2.3 Lựa chọn đặc trưng XGBoost

Gradient boosting được thực thi một cách hiệu quả và có khả năng mở rộng bởi XGBoost, một kỹ thuật ML ensemble. XGBoost dần xây dựng một chuỗi các bộ học yếu, thường là các cây quyết định, và dùng gradient descent để tối thiểu hóa một hàm mất mát. Cách tiếp cận này góp phần vào hiệu năng cao và sự sử dụng rộng rãi của XGBoost trong nhiều nhiệm vụ ML.

XGBoost tính tầm quan trọng đặc trưng dựa trên gain (hoặc mức cải thiện) trung bình trong hàm mất mát quy cho mỗi đặc trưng trên tất cả các vòng lặp boosting. Gọi gain( F ) biểu diễn gain trung bình cho đặc trưng ( F ) và nó được tính dùng Phương trình 3.

- M là tổng số vòng lặp boosting.
- Gain( F , m ) là gain cho đặc trưng ( F ) tại vòng lặp ( m ).

Gain trung bình gain( F ) càng cao, đặc trưng càng quan trọng trong việc đóng góp vào hiệu năng dự đoán của mô hình.

## 3.2.4 Support vector machine

SVM là một kỹ thuật ML có giám sát thành thạo dùng để giải quyết các bài toán hồi quy và phân loại. Chúng xác định biên quyết định tối ưu (siêu phẳng) để phân tách các lớp khác nhau hoặc dự đoán các giá trị bằng cách tối ưu khoảng cách giữa các điểm dữ liệu và siêu phẳng.

Trong SVM, tầm quan trọng của các đặc trưng có thể được đánh giá dùng các giá trị tuyệt đối của các trọng số gán cho mỗi đặc trưng trong siêu phẳng tối ưu. Gọi wi biểu diễn trọng số cho đặc trưng ( i ), và imp( Fi ) biểu diễn tầm quan trọng của đặc trưng ( i ) được tìm dùng Phương trình 4.

Trọng số tuyệt đối | wi | càng cao, đặc trưng càng quan trọng trong việc định nghĩa siêu phẳng và đóng góp vào hiệu năng dự đoán của SVM.

## 3.2.5 Linear regression

Linear regression là một kỹ thuật ML có giám sát cơ bản cho các ứng dụng hồi quy. Nó minh họa mối quan hệ giữa một biến phụ thuộc (y) và một hoặc nhiều biến độc lập (x) bằng cách khớp một phương trình tuyến tính với dữ liệu quan sát được. Để tối thiểu hóa sự chênh lệch giữa các giá trị thực và dự đoán, đường khớp tốt nhất (hoặc siêu phẳng ở các chiều cao hơn) phải được tìm.

Trong Linear Regression, tầm quan trọng đặc trưng có thể được đánh giá dùng các giá trị tuyệt đối của các hệ số gán cho mỗi đặc trưng trong phương trình tuyến tính. Gọi β i biểu diễn hệ số cho đặc trưng ( i ), và imp( Fi ) biểu diễn tầm quan trọng của đặc trưng ( i ). Phương trình 5 cho thấy imp( Fi ) được xác định thế nào.

Hệ số tuyệt đối | β i | càng cao, đặc trưng càng quan trọng trong việc xác định kết cục và đóng góp vào hiệu năng dự đoán của mô hình Linear Regression.

## 3.3 Mô hình dựa trên filter

Lựa chọn đặc trưng dựa trên filter là một phương pháp lựa chọn đặc trưng ML đánh giá tầm quan trọng của mỗi đặc trưng một cách độc lập, dùng các đo lường thống kê hoặc toán học, mà không tham chiếu tới bất kỳ mô hình ML cụ thể nào. Trong cách tiếp cận này, các đặc trưng được xếp hạng hoặc chấm điểm dựa trên các đặc điểm của chúng, và một tập con các đặc trưng giàu thông tin nhất được chọn để dùng tiếp trong huấn luyện mô hình. Quá trình này được tiến hành như một bước tiền xử lý trước khi huấn luyện một mô hình ML, qua đó tạo thành một phần không thể thiếu của quá trình lựa chọn đặc trưng.

## 3.3.1 Chi-square

Kiểm định Chi-Square, một kỹ thuật thống kê cho lựa chọn đặc trưng, đặc biệt hữu ích cho dữ liệu phân loại. Nó đánh giá liệu có sự phụ thuộc hoặc mối quan hệ giữa một đặc trưng phân loại và biến mục tiêu hay không bằng cách so sánh tần số quan sát được của mỗi phạm trù với tần số kỳ vọng dưới giả định độc lập.

Đối với một đặc trưng F cho trước với các phạm trù C 1, C 2, . . . , Ck và biến mục tiêu ( T ), thống kê Chi-Square χ 2 cho đặc trưng đó có thể được tính như cho trong Phương trình 6:

- Oi là tần số quan sát được của phạm trù Ci trong đặc trưng ( F ).
- Ei là tần số kỳ vọng của phạm trù Ci trong đặc trưng ( F ), giả định độc lập giữa ( F ) và ( T ).

Giá trị χ 2 càng cao, đặc trưng càng quan trọng trong mối liên hệ với biến mục tiêu.

## 3.3.2 Fisher's score

Fisher's Score được công nhận là một kỹ thuật thống kê then chốt cho lựa chọn đặc trưng trong lĩnh vực ML. Phương pháp này đánh giá sức mạnh phân biệt của một đặc trưng bằng cách phân tích tỷ số của phương sai trong mỗi lớp với sự chênh lệch về các giá trị trung bình giữa các lớp khác nhau.

Đối với một đặc trưng ( F ) cho trước với ( K ) phạm trù và một biến mục tiêu ( T ), Fisher's Score F ( F ) được tính theo Phương trình 7:

- Mean difference between classes ( F ) đo sự khác biệt về trung bình của đặc trưng ( F ) giữa các lớp khác nhau.
- Variance within classes ( F ) đo phương sai của đặc trưng ( F ) trong mỗi lớp.

Một Fisher's Score cao hơn chỉ một đặc trưng phân biệt hơn có thể được coi là quan trọng cho lựa chọn.

## 3.3.3 Giá trị thiếu

Trước khi áp dụng các mô hình ML, điều thiết yếu là xác định và giải quyết các mẫu hoặc đặc trưng chứa dữ liệu thiếu. Việc quản lý các giá trị thiếu này được tiến hành dùng một phương pháp dựa trên filter. Cách tiếp cận này xác định các chiến lược để xử lý hoặc nội suy các giá trị thiếu, được hướng dẫn bởi các cân nhắc thống kê hoặc các yếu tố đặc thù cho bộ dữ liệu.

Phương pháp nội suy trung bình nêu trong Phương trình 8 thay các giá trị thiếu bằng trung bình của các giá trị không thiếu cho một đặc trưng cụ thể ( F ):

- N là số giá trị không thiếu (hợp lệ) cho đặc trưng ( F ).
- ValidValues i biểu diễn mỗi giá trị hợp lệ của đặc trưng ( F ).

Phương pháp nội suy trung vị cho trong Phương trình 9 thay các giá trị thiếu bằng trung vị của các giá trị không thiếu cho một đặc trưng cụ thể ( F ):

- Median(ValidValues i ) là trung vị của các giá trị không thiếu (hợp lệ) cho đặc trưng ( F ).

Tính hiệu quả của việc xử lý các giá trị thiếu trong dữ liệu dựa vào các thước đo thống kê được rút trực tiếp từ bộ dữ liệu, đặc trưng hóa các phương pháp nội suy này là dựa trên filter. Điều quan trọng cần thừa nhận là nội suy dùng các giá trị trung bình hoặc trung vị có thể đưa vào các độ thiên lệch. Do đó, các phương pháp như vậy phải được dùng thận trọng, xét tác động của chúng lên tính toàn vẹn của toàn bộ bộ dữ liệu và các hàm ý cho nghiên cứu tương lai.

## 3.3.4 Information gain

Information Gain là một thước đo thống kê then chốt được dùng trong lĩnh vực ML cho mục đích lựa chọn đặc trưng. Thước đo này định lượng mức độ kiến thức thu được về biến mục tiêu thông qua việc biết giá trị của một đặc trưng. Một Information Gain cao hơn chỉ ra rằng đặc trưng đóng góp đáng kể vào dự đoán biến mục tiêu, nhấn mạnh tính hữu dụng của nó trong mô hình.

Information Gain IG( F ) cho một đặc trưng ( F ) được tính dùng entropy, một thước đo lượng bất định trong một tập dữ liệu như trình bày trong Phương trình 10. Gọi H ( T ) biểu diễn entropy của biến mục tiêu, và H ( T | F ) biểu diễn entropy có điều kiện của biến mục tiêu cho trước đặc trưng ( F ).

Entropy của biến mục tiêu H ( T ) và entropy có điều kiện H ( T | F ) được cho trong Phương trình 11 và Phương trình 12

- c là số lớp trong biến mục tiêu.
- pi là tỷ lệ các mẫu trong lớp ( i ).
- k là số giá trị duy nhất trong đặc trưng ( F ).
- ∣ Fj ∣ là số mẫu có một giá trị ( j ) trong đặc trưng ( F ).
- ∣ ∣ · | T | là tổng số mẫu.
- H ( Tj ) là entropy của biến mục tiêu cho các mẫu có một giá trị ( j ) trong đặc trưng ( F ).

## 3.4 Lựa chọn đặc trưng trong ML

Trong bối cảnh lựa chọn đặc trưng cho ML, sự liên quan và tính hữu dụng của một đặc trưng trong việc dự đoán biến mục tiêu tỷ lệ thuận với Information Gain của nó. Một Information Gain lớn hơn biểu thị một đặc trưng thích hợp và có lợi hơn trong việc dự báo các kết cục.

## 4 Phân loại dùng các mô hình ML

Phân loại trong ML liên quan tới việc huấn luyện một thuật toán hoặc mô hình, được gọi là bộ phân loại, để phân loại hoặc gán nhãn các điểm dữ liệu đầu vào dựa trên việc nhận diện các mẫu và thuộc tính trong dữ liệu. Mục tiêu chính của một bộ phân loại là thiết lập một ánh xạ từ các thuộc tính đầu vào tới các phạm trù hoặc lớp định trước, sau đó được dùng để đưa ra các dự đoán trên các điểm dữ liệu mới, chưa thấy.

## 4.1 Bộ phân loại random forest

Bộ phân loại Random Forest, một kỹ thuật ML ensemble, tận dụng sức mạnh tập thể của nhiều cây quyết định để đem lại các dự đoán hoặc phân loại chính xác hơn. Được giới thiệu bởi Leo Breiman và Adele Cutler, phương pháp này đã được áp dụng rộng rãi trong nhiều nhiệm vụ khoa học dữ liệu và ML. Đáng chú ý, độ chính xác của cách tiếp cận Random Forest cải thiện với sự mở rộng của bộ dữ liệu. Hơn nữa, một sự gia tăng dữ liệu với tỷ lệ ca tương tự cũng nâng cao độ chính xác. Người ta đã quan sát thấy rằng kết hợp Genetic Algorithm với phương pháp Random Forest đem lại độ chính xác cao hơn cho các bộ dữ liệu đái tháo đường so với các biến thể khác của phương pháp Random Forest. Công thức dự đoán được cho trong Phương trình 13.

- n = số cây trong random forest,
- Ci = biểu diễn dự đoán hồi quy của cây quyết định thứ i .

## 4.1.1 Bộ phân loại gradient boosting

Gradient Boosting biểu diễn một cách tiếp cận học ensemble, trong đó nhiều bộ học yếu, như các cây quyết định, được huấn luyện liên tiếp để phát triển một mô hình cộng (additive). Mỗi bộ học kế tiếp được thiết kế để sửa các lỗi do các bộ học trước gây ra. Công thức dự đoán cuối cùng được cho trong Phương trình 14.

- F ( x ) là dự đoán cuối cùng cho dữ liệu đầu vào x ,
- M là tổng số bộ học trong ensemble,
- fm ( x ) là một dự đoán của bộ học yếu thứ m ,
- α m là tốc độ học cho bộ học yếu thứ m .

## 4.1.2 Support vector machine

Một Support Vector Machine là một mô hình ML được thiết kế để tối ưu lề giữa các lớp riêng biệt trong một bộ dữ liệu bằng cách xác định siêu phẳng tối ưu theo Phương trình 15. Cách tiếp cận này hiệu quả cho cả nhiệm vụ phân loại lẫn hồi quy.

- w · x là tích vô hướng của yếu tố trọng số w và vector đặc trưng x ,
- b là số hạng độ chệch,
- sign(.) là hàm dấu trả về +1 hoặc -1.

## 4.1.3 Bộ phân loại XGBoost

XGBoost, hay Extreme Gradient Boosting, tăng cường khung gradient boosting với các kỹ thuật như điều chuẩn (regularization), tính toán song song, và cắt tỉa cây (tree-pruning). Công thức dự đoán được cho trong Phương trình 16.

- Fm ( x ) biểu diễn dự đoán được tạo bởi cây quyết định thứ m ,
- γ là tốc độ học.

## 4.2 Cách tiếp cận ensemble

Trong nghiên cứu này, phương pháp ensemble được dùng cho so sánh hiệu năng là bộ phân loại stacking, vốn nâng cao độ chính xác dự đoán bằng cách kết hợp nhiều mô hình ML. Cách tiếp cận stacking ensemble liên quan tới việc dùng vài mô hình cơ sở để đưa ra các dự đoán riêng lẻ, rồi một meta-model để tích hợp các dự đoán này thành một đầu ra cuối cùng. Cụ thể, các mô hình cơ sở được dùng trong phương pháp này là Random Forest, Gradient Boosting, Support Vector Machine, và XGBoost. Các mô hình này được chọn vì các cách tiếp cận thuật toán đa dạng và hiệu năng mạnh mẽ của chúng trong các nhiệm vụ phân loại. Meta-model được dùng là Logistic Regression, được chọn vì tính đơn giản và hiệu quả của nó trong việc tổng hợp các đầu ra của các mô hình cơ sở. Bằng cách tận dụng các điểm mạnh của mỗi mô hình cơ sở và meta-model, stacking ensemble nhằm cải thiện hiệu năng dự đoán tổng thể so với việc dùng một mô hình đơn lẻ.

## 4.3 Đánh giá hộp đen (Blackbox)

Sự tiến bộ của các thuật toán ML đã nâng cao đáng kể các khả năng dự đoán, thường phải đánh đổi bằng khả năng diễn giải. Các mô hình hiện đại, dù có khả năng đưa ra các dự đoán rất chính xác, thường đặt ra các thách thức trong việc hiểu các quá trình ra quyết định của chúng. Để giảm nhẹ điều này, Explainable AI (Trí tuệ Nhân tạo Khả diễn giải) đã được phát triển để tạo các mô hình không chỉ có hiệu năng cao mà còn dễ diễn giải hơn.

Hai phương pháp nổi bật được dùng cho việc đánh giá và giải thích hiệu năng mô hình ML là LIME và SHAP:

LIME (Local Interpretable Model-Agnostic Explanations) : LIME tập trung vào việc làm sáng tỏ các đầu ra của các bộ phân loại hoặc bộ hồi quy. Điều này được thực hiện bằng cách xấp xỉ hành vi của một mô hình phức tạp bằng một mô hình đơn giản hơn, dễ diễn giải hơn, nâng cao sự hiểu của con người. Tính hiệu quả của LIME nằm ở khả năng của nó trong việc cung cấp các hiểu biết về quá trình ra quyết định của một mô hình cho các dự đoán cụ thể. Nó cung cấp tùy chọn chọn giữa hai bộ phân loại có thể diễn giải và đã chứng minh khả năng tổng quát hóa đáng kể trong nhiều ứng dụng.

SHAP (SHapley Additive exPlanations) : SHAP mở rộng khả năng giải thích này bằng cách cung cấp một điểm tầm quan trọng đặc trưng cho mỗi thuộc tính trong mỗi dự đoán. Nó định lượng đóng góp của mỗi đặc trưng cho một dự đoán cụ thể, qua đó cho phép một hiểu biết sâu hơn về chức năng của mô hình. SHAP nổi bật nhờ việc giới thiệu một lớp mới các chỉ số ý nghĩa đặc trưng tích lũy, góp phần vào một đánh giá toàn diện hơn về tầm quan trọng đặc trưng. Phương pháp này cũng khám phá nhiều thuộc tính đáng mong muốn để giải thích các dự đoán mô hình, làm tăng tính bền vững của nó.

Tóm lại, LIME và SHAP là các công cụ không thể thiếu trong lĩnh vực ML cho đánh giá và diễn giải mô hình. Trong khi LIME tạo thuận lợi cho việc tạo các mô hình cục bộ, dễ diễn giải vốn xấp xỉ hành vi của các hệ thống phức tạp hơn, SHAP cung cấp các hiểu biết chi tiết về cách mỗi đặc trưng ảnh hưởng tới các dự đoán riêng lẻ. Các cách tiếp cận này nâng cao tính minh bạch và đáng tin cậy của các mô hình AI, đóng vai trò then chốt trong việc áp dụng chúng trong các ngành then chốt như chăm sóc sức khỏe, tài chính, và các hệ thống tự hành.

## 4.4 Các thước đo hiệu năng

Phân loại nhị phân của việc mắc đái tháo đường tạo ra bốn kết cục: True Positive (TP), True Negative (TN), False Positive (FP), và False Negative (FN).

- True Positive (TP) : Dự đoán dương tính đúng
- True Negative (TN) : Dự đoán âm tính đúng
- False Positive (FP) : Dự đoán dương tính sai
- False Negative (FN) : Dự đoán âm tính sai

## 4.4.1 Accuracy

Độ chính xác dự đoán của mô hình được định nghĩa là tỷ số của các mẫu được nhận diện đúng trên tổng số mẫu bởi mô hình và nó được cho trong Phương trình 17.

## 4.4.2 Precision

Công thức precision cho trong Phương trình 18 thể hiện tỷ số của các giá trị dương tính được phân loại thành công trên tất cả các mẫu dương tính được dự kiến, đóng vai trò là một đại lượng thay thế cho độ chính xác của mô hình.

## 4.4.3 Recall

Tỷ số của các mẫu dương tính được dự đoán chính xác trên tất cả các mẫu dương tính được gọi là recall của một mô hình và nó được cho trong Phương trình 19.

## 4.4.4 F1-Score

Điểm F1 của mô hình xác định trung bình điều hòa của Precision và Recall được tìm dùng Phương trình 20.

## 5 Kết quả và thảo luận

## 5.1 Mô tả bộ dữ liệu

Bốn bộ dữ liệu đái tháo đường được dùng trong công trình của chúng tôi và tất cả chúng đều có một biến dự báo nhị phân. Bộ dữ liệu-1 được tạo vào năm 2020, nó có 17 thuộc tính. Bộ dữ liệu-2 cũng bao gồm dữ liệu nhân khẩu học, nó chứa 9 thuộc tính. Bộ dữ liệu-3 chứa 17 thuộc tính dùng trong chẩn đoán sớm đái tháo đường. Bộ dữ liệu-4 chứa 8 thuộc tính đặc thù cho nữ giới. Chi tiết các bộ dữ liệu được cho trong Bảng 2.

## 5.2 Các biểu đồ hộp (Box plot)

Các biểu đồ hộp cung cấp một tóm tắt trực quan về nhiều bộ dữ liệu, cho phép một so sánh rõ ràng về các đặc điểm phân phối giữa các nhóm hoặc điều kiện khác nhau. Mỗi biểu đồ hộp trong các hình biểu diễn phân phối thống kê của các đặc trưng trong bộ dữ liệu tương ứng, nhấn mạnh trung vị, các tứ phân vị, và các giá trị ngoại lai tiềm năng. Supplementary Figures 1, 2 minh họa phân phối của các đặc trưng trong bốn bộ dữ liệu được dùng trong đánh giá thực nghiệm. Khoảng tứ phân vị (IQR), vốn biểu diễn 50% giữa của dữ liệu, được làm nổi bật, cùng với bất kỳ giá trị ngoại lai tiềm năng nào được đánh dấu là các điểm riêng lẻ vượt ra ngoài các râu (whisker). Các biểu đồ hộp này là các công cụ thiết yếu cho phân tích dữ liệu sơ bộ, cung cấp một hiểu biết trực quan nhanh về cấu trúc của dữ liệu, và làm nổi bật các khác biệt giữa các bộ dữ liệu có thể đáng được khảo sát thêm.

TABLE 2 Mô tả bộ dữ liệu.

| Tên bộ dữ liệu | Danh sách đặc trưng                                                                                                                                                                                                  |   Số thuộc tính |   Số bản ghi huấn luyện |   Số bản ghi kiểm tra |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|------------------------|-----------------------|
| Dataset-1      | Age, Gender, Family Diabetes, High BP, Physically Active, BMI, Smoking, Alcohol, Sleep, Soundsleep, Regular medicine, Junk food, Stress, Bp level, Pregnancies, Pdiabetes, Urination Freq, Diabetic a               |                  17 |                    760 |                   191 |
| Dataset-2      | Gender, Age, Hypertension, Heart disease, Smoking history, Bmi, HbA1c level, Blood glucose level, Diabetes b                                                                                                        |                   8 |                   1199 |                   300 |
| Dataset-3      | Alopecia, Delayed healing, Visual blurring, Polydipsia, Obesity, Age, Polyphagia, Muscle stiffness, Gender, Itching, Partial paresis, Polyuria, Sudden weight loss, Genital thrush, Irritability, Weakness, Class c |                  16 |                    416 |                   104 |
| Dataset-4      | BMI, Age, Pregnancies, Insulin, Glucose, Diabetes Pedigree Function, Blood pressure, Skin thickness, Outcome d                                                                                                      |                   8 |                   2214 |                   554 |

## 5.3 Ma trận tương quan

Tương quan quan sát được trong Bộ dữ liệu-1 và Bộ dữ liệu-2, như minh họa trong Hình 2, gợi ý một liên hệ dương tính đáng kể giữa thuốc dùng đều đặn, huyết áp cao, và tiền sử gia đình mắc đái tháo đường với tỷ lệ mắc đái tháo đường. Ngược lại, mức huyết áp và tuổi chứng minh một tương quan âm đáng chú ý. Do đó, suy ra rằng các yếu tố này đóng vai trò then chốt trong việc dự đoán khả năng mắc đái tháo đường ở bệnh nhân.

Dựa trên thông tin trong Hình 3, có thể kết luận rằng BMI và glucose có một liên hệ dương mạnh với đái tháo đường, gợi ý rằng các biến này có tác động lớn trong việc dự đoán khả năng mắc đái tháo đường của một bệnh nhân. Mặt khác, không có đặc trưng nào trong bộ dữ liệu này thể hiện một liên hệ âm với đái tháo đường.

## 5.4 Các điểm tầm quan trọng đặc trưng dùng các phương pháp dựa trên wrapper

Các điểm tầm quan trọng đặc trưng được tìm dùng các phương pháp dựa trên wrapper với các bộ phân loại Random forest (Supplementary Figure 3), XGBoost (Supplementary Figure 4), Gradient Boosting (Supplementary Figure 5), SVM (Supplementary Figure 6), và Linear regression (Supplementary Figure 7) làm các wrapper.

Trong phân tích Bộ dữ liệu 1, vài kỹ thuật dựa trên wrapper được dùng để đánh giá các điểm tầm quan trọng đặc trưng của nhiều thuộc tính khác nhau. Đáng chú ý, trong các đặc trưng được đánh giá, thuốc dùng đều đặn, tuổi, và BMI được thấy thể hiện các mức tầm quan trọng đặc trưng cao nhất. Ngược lại, các thuộc tính như giới tính, hút thuốc, và tiêu thụ thức ăn nhanh thể hiện các mức tầm quan trọng đặc trưng thấp nhất trong bộ dữ liệu.

Nhiều kỹ thuật dựa trên wrapper khác nhau được dùng để đánh giá ý nghĩa của các thuộc tính trong Bộ dữ liệu 2. Người ta quan sát thấy rằng mức HbA1c, mức đường huyết, và BMI nổi lên là các thuộc tính có các điểm tầm quan trọng đặc trưng cao nhất trong bộ dữ liệu này. Ngược lại, giới tính và tiền sử hút thuốc được xác định là có các mức tầm quan trọng thấp nhất.

Một loạt các kỹ thuật dựa trên wrapper được áp dụng để xác định các điểm tầm quan trọng đặc trưng của các thuộc tính trong Bộ dữ liệu 3. Đáng chú ý là polyuria, polydipsia, và giới tính được xác định là các thuộc tính có các mức tầm quan trọng đặc trưng cao nhất trong bộ dữ liệu này. Ngược lại, béo phì, suy nhược, và genital thrush nằm trong số các đặc trưng thể hiện các mức tầm quan trọng thấp nhất.

Vài kỹ thuật dựa trên wrapper được dùng để đánh giá các điểm tầm quan trọng đặc trưng của các thuộc tính trong Bộ dữ liệu 4. Người ta quan sát thấy rằng glucose, BMI, và Diabetes Pedigree Function là các thuộc tính có các mức tầm quan trọng đặc trưng cao nhất trong bộ dữ liệu này. Ngược lại, các thuộc tính như số lần mang thai, huyết áp, độ dày da, insulin, và tuổi được thấy thể hiện các mức tầm quan trọng thấp nhất.

## 5.5 Các đặc trưng quan trọng dùng các phương pháp dựa trên filter

Các phương pháp dựa trên filter được dùng để xác định các đặc trưng quan trọng nhất trong Bộ dữ liệu 1. Theo các kết quả được ghi trong Bảng 3, tuổi, tiền sử gia đình mắc đái tháo đường, và huyết áp cao được xác định là các yếu tố then chốt trong bộ dữ liệu theo các phương pháp dựa trên filter này.

Các phương pháp dựa trên filter được dùng để nhận diện các đặc trưng quan trọng nhất trong Bộ dữ liệu 2. Các phát hiện, chi tiết trong Bảng 4, chỉ ra rằng trong khi hầu hết các đặc trưng thể hiện các mức tầm quan trọng tương tự, tuổi, tăng huyết áp, và BMI được phân biệt là các yếu tố then chốt đáng chú ý trong bộ dữ liệu, theo các phương pháp dựa trên filter này.

Các yếu tố chính trong Bộ dữ liệu 3 được xác định dùng các kỹ thuật dựa trên filter. Theo các kết quả chi tiết trong Bảng 5, các yếu tố đáng kể trong bộ dữ liệu, như được xác định bởi các cách tiếp cận dựa trên filter này, là giới tính, polyuria, và polydipsia.

Các yếu tố chính trong Bộ dữ liệu-4 được nhận biết thông qua việc áp dụng các kỹ thuật dựa trên filter. Như chỉ ra bởi các kết quả trong Bảng 6, các yếu tố đáng kể trong bộ dữ liệu này, như được xác định bởi các cách tiếp cận dựa trên filter này, bao gồm số lần mang thai, glucose, và độ dày da.

Bước tiếp theo liên quan tới việc xác định các đặc trưng tốt nhất được đề xuất bởi các cách tiếp cận filter và wrapper vốn chung cho mỗi bộ dữ liệu. Bảng 7 trình bày các tập đặc trưng tốt nhất được chọn cho bốn bộ dữ liệu.

TABLE 3 Top 7 đặc trưng của Dataset-1 dùng các phương pháp dựa trên filter.

| Phương pháp      | Đặc trưng 1      | Đặc trưng 2     | Đặc trưng 3 | Đặc trưng 4      | Đặc trưng 5      | Đặc trưng 6 | Đặc trưng 7 |
|------------------|------------------|-----------------|-------------|------------------|------------------|-------------|-------------|
| Chi-Square       | Age              | Family_Diabetes | HighBP      | BMI              | Regular medicine | BPLevel     | Pdiabetes   |
| Fisher's score   | Age              | Family_Diabetes | HighBP      | BMI              | Regular medicine | Stress      | BPLevel     |
| Missing value    | Age              | Family_Diabetes | HighBP      | Regular medicine | Stress           | BPLevel     | Pdiabetes   |
| Information gain | Regular medicine | Age             | BPLevel     | HighBP           | BMI              | Stress      | Pregnancies |

TABLE 4 Top 5 đặc trưng của Dataset-2 dùng các phương pháp dựa trên filter.

| Phương pháp      | Đặc trưng 1 | Đặc trưng 2  | Đặc trưng 3         | Đặc trưng 4 | Đặc trưng 5         |
|------------------|-------------|--------------|---------------------|-------------|---------------------|
| Chi-Square       | Age         | Hypertension | BMI                 | HbA1c_level | blood_glucose_level |
| Fisher's score   | Age         | Hypertension | BMI                 | HbA1c_level | blood_glucose_level |
| Missing value    | Age         | Hypertension | BMI                 | HbA1c_level | blood_glucose_level |
| Information gain | BMI         | HbA1c_level  | blood_glucose_level | Age         | Hypertension        |

TABLE 5 Top 7 đặc trưng của Dataset-3 dùng các phương pháp dựa trên filter.

| Phương pháp      | Đặc trưng 1 | Đặc trưng 2 | Đặc trưng 3 | Đặc trưng 4        | Đặc trưng 5        | Đặc trưng 6     | Đặc trưng 7     |
|------------------|-------------|-------------|-------------|--------------------|--------------------|-----------------|-----------------|
| Chi-Square       | Age         | Gender      | Polyuria    | Polydipsia         | Sudden weight loss | Irritability    | Partial paresis |
| Fisher's score   | Gender      | Polyuria    | Polydipsia  | Sudden weight loss | polyphagia         | Irritability    | Partial paresis |
| Missing value    | Gender      | Polyuria    | Polydipsia  | Sudden weight loss | Irritability       | Partial paresis | Alopecia        |
| Information gain | Polyuria    | Polydipsia  | Age         | Gender             | Sudden weight loss | Partial paresis | Polyphagia      |

## 5.6 Các thước đo trước lựa chọn đặc trưng

Accuracy, precision, recall, và F1-score cho các bộ phân loại khác nhau áp dụng cho bốn bộ dữ liệu được ghi trong Bảng 8. Các kết quả này cho thấy bộ phân loại Random Forest vượt các bộ khác trên Bộ dữ liệu-1, thể hiện các giá trị cao nhất về accuracy, recall, và F1-score. Theo sau Random Forest, XGBClassifier chứng minh hiệu năng thấp hơn không đáng kể, trong khi Gradient Boosting Classifier xếp thứ ba về accuracy.

Về Bộ dữ liệu-2, bộ phân loại Gradient Boosting đạt accuracy, precision, recall, và F1-score cao nhất, theo sau là bộ phân loại Random Forest, XGB classifier, và SVM. Bên cạnh đó, bộ phân loại Random Forest vượt các bộ khác trên Bộ dữ liệu-3, đạt các giá trị cao nhất về accuracy, recall, và F1-score. Hơn nữa, Gradient Boosting Classifier và XGB Classifier chứng minh hiệu năng tương đương. Ngoài ra, cả bộ phân loại Random Forest lẫn XGB Classifier đều vượt các bộ phân loại khác trên Bộ dữ liệu-4, thể hiện các giá trị gần như bằng nhau và cao nhất về accuracy, recall, và F1-score. Ngược lại, Gradient Boosting Classifier và SVM có các giá trị thấp nhất về các thước đo này.

## 5.7 Đánh giá hiệu năng sau lựa chọn đặc trưng

Các kết quả đánh giá hiệu năng sau khi dùng lựa chọn đặc trưng được mô tả trong Bảng 9. Ví dụ, về Bộ dữ liệu-1, các đặc trưng được chọn bao gồm Regular Medicine, Age, BMI, Sound Sleep, BP Level, Stress, và physical activity. Thông qua nhiều thuật toán phân loại khác nhau, người ta xác định rằng độ chính xác cao nhất đạt được dùng cả bộ phân loại random forest lẫn bộ phân loại XGBoost. Tuy nhiên, đáng chú ý là độ chính xác tổng thể, khi dùng các đặc trưng quan trọng, thấp hơn đáng kể so với độ chính xác của các bộ phân loại không dùng các đặc trưng then chốt này. Tiến tới, đối với Bộ dữ liệu-2, các đặc trưng được chọn để phân tích là tuổi, tăng huyết áp, HbA1c, mức đường huyết, và BMI. Bộ phân loại random forest chứng minh độ chính xác cao nhất trong các thuật toán được kiểm tra. Hơn nữa, độ chính xác của mô hình sau lựa chọn đặc trưng lớn hơn độ chính xác đạt được trước lựa chọn đặc trưng. Ngoài ra, trên Bộ dữ liệu-3. Thông thường, các đặc trưng được chọn bao gồm Polyuria, Polydipsia, Gender, Age, partial paresis, Irritability, và Genital thrush. Độ chính xác cao nhất đạt được dùng bộ phân loại XGBoost. Cũng lưu ý rằng trong khi độ chính xác cao nhất sau lựa chọn đặc trưng vẫn giữ nguyên như trước lựa chọn đặc trưng, một số mô hình thể hiện độ chính xác tăng sau lựa chọn đặc trưng. Cuối cùng, dựa trên hiệu năng thu được trên Bộ dữ liệu-4, các đặc trưng được chọn cho bộ dữ liệu này là glucose, insulin, BMI, age, và pregnancies. Bộ phân loại random forest đạt độ chính xác cao nhất trong các mô hình được kiểm tra. Hơn nữa, độ chính xác cao nhất sau lựa chọn đặc trưng lớn hơn độ chính xác trước lựa chọn đặc trưng.

TABLE 6 Top 5 đặc trưng của Dataset-4 dùng các phương pháp dựa trên filter.

| Phương pháp      | Đặc trưng 1                | Đặc trưng 2 | Đặc trưng 3    | Đặc trưng 4 | Đặc trưng 5                |
|------------------|----------------------------|-------------|----------------|-------------|----------------------------|
| Chi-Square       | Pregnancies                | Glucose     | Skin Thickness | Insulin     | BMI                        |
| Fischer's score  | Pregnancies                | Glucose     | Blood pressure | Insulin     | BMI                        |
| Missing value    | Pregnancies                | Glucose     | Skin thickness | BMI         | Diabetes pedigree function |
| Information gain | Diabetes pedigree function | BMI         | Glucose        | Insulin     | Age                        |

TABLE 7 Tập đặc trưng tốt nhất cho bởi các cách tiếp cận dựa trên filter và wrapper.

|   Bộ dữ liệu | Tập đặc trưng tốt nhất                                                                |
|-----------|--------------------------------------------------------------------------------------|
|         1 | Regular medicine, Age, BMI, Sound sleep, BP level, Stress, and Physical activity     |
|         2 | Age, Hypertension, HbA1c, Blood glucose level, and BMI                               |
|         3 | Polyuria, Polydipsia, Gender, Age, Partial paresis, Irritability, and Genital thrush |
|         4 | Glucose, Insulin, BMI, Age, and Pregnancies                                          |

## 5.7.1 Nâng cao hiệu năng

Trong khi lựa chọn đặc trưng không nâng cao hiệu năng một cách phổ quát trong nghiên cứu này, nó vẫn nắm giữ các lợi ích tiềm năng cho việc giảm độ phức tạp mô hình và cải thiện khả năng diễn giải. Bằng cách khám phá các phương pháp thay thế, tinh chỉnh các siêu tham số, và kết hợp kiến thức lĩnh vực, có thể đạt hiệu năng tốt hơn và các mô hình hiệu quả hơn.

- Người ta quan sát thấy rằng quá trình lựa chọn đặc trưng không nâng cao hiệu năng của mô hình một cách nhất quán trên tất cả các bộ dữ liệu. Kết cục này có thể được quy cho nhiều yếu tố, như các đặc điểm nội tại của các bộ dữ liệu và các phương pháp lựa chọn đặc trưng cụ thể được dùng.
- Lựa chọn đặc trưng nói chung được kỳ vọng cải thiện hiệu năng mô hình bằng cách loại bỏ các đặc trưng không liên quan hoặc dư thừa. Tuy nhiên, trong một số trường hợp, nó có thể dẫn tới mất thông tin giá trị, điều có thể ảnh hưởng tiêu cực tới độ chính xác của mô hình.

## 5.7.2 Độ phức tạp mô hình

Mặc dù quá trình lựa chọn đặc trưng không cải thiện hiệu năng một cách phổ quát, điều then chốt là thừa nhận tác động tiềm năng của nó lên độ phức tạp mô hình. Bằng cách giảm số đặc trưng, độ phức tạp của mô hình có thể được giảm, điều có thể dẫn tới:

- Thời gian huấn luyện và dự đoán nhanh hơn.
- Giảm nguy cơ quá khớp, đặc biệt trong các trường hợp bộ dữ liệu nhỏ hoặc số đặc trưng lớn.
- Diễn giải mô hình đơn giản hơn, giúp các chuyên gia lĩnh vực dễ hiểu các yếu tố đóng góp vào các dự đoán của mô hình.

## 5.7.3 Các gợi ý để cải thiện

- Các phương pháp lựa chọn đặc trưng thay thế: Có thể có lợi khi khám phá các kỹ thuật lựa chọn đặc trưng khác nhau, như Recursive Feature Elimination (RFE), Principal Component Analysis (PCA), hoặc các phương pháp giảm chiều khác. Các cách tiếp cận này có thể đem lại một tập đặc trưng tối ưu hơn, nâng cao hiệu năng mô hình và giảm độ phức tạp.
- Các phương pháp ensemble: Dùng các phương pháp ensemble kết hợp nhiều kỹ thuật lựa chọn đặc trưng có thể dẫn tới một tập đặc trưng bền vững hơn. Cách tiếp cận này có thể giúp giữ lại các đặc trưng quan trọng trong khi loại bỏ các đặc trưng dư thừa.
- Tinh chỉnh siêu tham số: Tinh chỉnh các siêu tham số của các thuật toán lựa chọn đặc trưng và các bộ phân loại có thể cải thiện hiệu năng tổng thể. Các phương pháp grid search hoặc random search có thể được dùng để xác định các thiết lập siêu tham số tốt nhất.

TABLE 8 Các thước đo phân loại không có lựa chọn đặc trưng cho các bộ dữ liệu 1-4.

| Bộ dữ liệu | Mô hình                    |   Accuracy |   Precision |   Recall |   F1-Score |
|-----------|----------------------------|------------|-------------|----------|------------|
| Dataset-1 | XGBClassifier              |      0.937 |       0.937 |    0.937 |      0.952 |
|           | RandomForestClassifier     |      0.942 |       0.942 |    0.942 |      0.956 |
|           | GradientBoostingClassifier |      0.932 |       0.932 |    0.932 |      0.948 |
|           | Support Vector Machine     |      0.832 |       0.830 |    0.832 |      0.874 |
| Dataset-2 | XGBClassifier              |      0.923 |       0.921 |    0.923 |      0.768 |
|           | RandomForestClassifier     |      0.933 |       0.936 |    0.933 |      0.778 |
|           | GradientBoostingClassifier |      0.937 |       0.937 |    0.937 |      0.796 |
|           | Support Vector Machine     |      0.910 |       0.907 |    0.910 |      0.703 |
| Dataset-3 | XGBClassifier              |      0.971 |       0.974 |    0.971 |      0.978 |
|           | RandomForestClassifier     |      0.990 |       0.991 |    0.990 |      0.993 |
|           | GradientBoostingClassifier |      0.971 |       0.974 |    0.971 |      0.978 |
|           | Support Vector Machine     |      0.894 |       0.895 |    0.894 |      0.922 |
| Dataset-4 | XGBClassifier              |      0.982 |       0.982 |    0.982 |      0.973 |
|           | RandomForestClassifier     |      0.982 |       0.982 |    0.982 |      0.973 |
|           | GradientBoostingClassifier |      0.881 |       0.880 |    0.881 |      0.813 |
|           | Support Vector Machine     |      0.780 |       0.775 |    0.780 |      0.623 |

TABLE 9 Hiệu năng thu được trên các Bộ dữ liệu 1-4 sau lựa chọn đặc trưng.

| Bộ dữ liệu | Mô hình                    |   Accuracy |   Precision |   Recall |   F1-Score |
|-----------|----------------------------|------------|-------------|----------|------------|
| Dataset-1 | XGBClassifier              |      0.937 |       0.937 |    0.937 |      0.952 |
| Dataset-1 | RandomForestClassifier     |      0.937 |       0.937 |    0.937 |      0.952 |
| Dataset-1 | GradientBoostingClassifier |      0.932 |       0.932 |    0.932 |      0.948 |
| Dataset-1 | Support Vector Machine     |      0.801 |       0.811 |    0.801 |      0.840 |
| Dataset-2 | XGBClassifier              |      0.933 |       0.933 |    0.933 |      0.787 |
| Dataset-2 | RandomForestClassifier     |      0.940 |       0.942 |    0.940 |      0.804 |
| Dataset-2 | GradientBoostingClassifier |      0.937 |       0.937 |    0.937 |      0.796 |
| Dataset-2 | Support Vector Machine     |      0.913 |       0.912 |    0.913 |      0.711 |
| Dataset-3 | XGBClassifier              |      0.990 |       0.991 |    0.990 |      0.993 |
| Dataset-3 | RandomForestClassifier     |      0.990 |       0.991 |    0.990 |      0.993 |
| Dataset-3 | GradientBoostingClassifier |      0.981 |       0.982 |    0.981 |      0.986 |
| Dataset-3 | Support Vector Machine     |      0.923 |       0.924 |    0.923 |      0.945 |
| Dataset-4 | XGBClassifier              |      0.982 |       0.982 |    0.982 |      0.973 |
| Dataset-4 | RandomForestClassifier     |      0.986 |       0.986 |    0.986 |      0.978 |
| Dataset-4 | GradientBoostingClassifier |      0.847 |       0.845 |    0.847 |      0.762 |
| Dataset-4 | Support Vector Machine     |      0.767 |       0.760 |    0.767 |      0.610 |

- Kiểm định chéo: Triển khai các kỹ thuật kiểm định chéo có thể cung cấp một đánh giá đáng tin cậy hơn về hiệu năng và khả năng tổng quát hóa của mô hình. Cách tiếp cận này giúp đảm bảo rằng các kết quả không bị thiên lệch do một sự chia train-test cụ thể.
- Kiến thức lĩnh vực: Kết hợp kiến thức lĩnh vực vào quá trình lựa chọn đặc trưng có thể có giá trị. Tham vấn các chuyên gia lĩnh vực để xác định các đặc trưng liên quan nhất dựa

trên chuyên môn của họ có thể nâng cao hiệu năng và khả năng diễn giải của mô hình.

## 5.8 Cách tiếp cận ensemble

Cách tiếp cận stacking ensemble, dùng bốn mô hình cơ sở và một meta-model Logistic Regression, được áp dụng cho bốn bộ dữ liệu, với các kết quả được lập bảng một cách hệ thống trong Bảng 10. Các phát hiện chỉ ra rằng hiệu năng của cách tiếp cận stacking ensemble vượt các thước đo thông thường cho mỗi bộ dữ liệu. Tuy nhiên, hiệu năng của nó kém hơn so với hiệu năng đạt được dùng phương pháp lựa chọn đặc trưng.

## 5.9 Explainable AI

Hình 4 chỉ ra rằng bản ghi thứ mười ba trong bộ dữ liệu đã được dự đoán mắc đái tháo đường với mức tin cậy 74%. Dự đoán này chủ yếu được ảnh hưởng bởi các yếu tố như thuốc dùng đều đặn, tiền sử gia đình mắc đái tháo đường, và hoạt động thể chất, vốn cùng nhau đóng góp vào mức tin cậy cao trong chẩn đoán đái tháo đường. Trái lại, cùng bản ghi đó đã được dự đoán không mắc đái tháo đường, dù với mức tin cậy thấp hơn 26%. Dự đoán đối lập này được ảnh hưởng bởi các giá trị của BP level (mức huyết áp) và tuổi, vốn dường như chỉ một nguy cơ đái tháo đường thấp hơn. Tóm lại, dự đoán cho bản ghi thứ mười ba nghiêng về một chẩn đoán đái tháo đường do một số đặc trưng nhất định, trong khi các đặc trưng khác gợi ý sự vắng mặt của đái tháo đường, dẫn tới một mức tin cậy 74% cho đái tháo đường và 26% cho không đái tháo đường.

Phương pháp SHAP được dùng để phân tích Bộ dữ liệu 1, với các kết quả được trình bày dưới dạng một hình. Trong Hình 5, lớp 1 biểu thị các bệnh nhân không đái tháo đường, trong khi lớp 2 biểu diễn các bệnh nhân đái tháo đường. Rõ ràng là hầu hết các đặc trưng thể hiện tầm quan trọng ngang nhau cho cả hai lớp, chỉ ra một tác động cân bằng lên việc phân loại cả đái tháo đường lẫn không đái tháo đường.

Tuy nhiên, một phân tích chi tiết cho thấy hai yếu tố, thuốc dùng đều đặn và tuổi, đóng vai trò đáng kể trong quá trình phân loại. Các đặc trưng này then chốt trong việc xác định tình trạng đái tháo đường hay không của một bệnh nhân. Ngược lại, các đặc trưng như tiền đái tháo đường và hút thuốc có ảnh hưởng tối thiểu lên phân loại, gợi ý chúng đóng góp ít hơn vào sự phân biệt giữa hai nhóm.

Phân tích Hình 6, người ta quan sát thấy rằng các cá nhân tuân thủ một chế độ thuốc dùng đều đặn cao có xu hướng không đái tháo đường. Điều này gợi ý một liên hệ giữa việc dùng thuốc đều đặn và một nguy cơ đái tháo đường giảm. Ngoài ra, đái tháo đường phổ biến hơn ở những người cao tuổi so với những người trẻ hơn, chỉ ra rằng tuổi là một yếu tố đáng kể trong việc dự đoán đái tháo đường, với những người lớn tuổi dễ mắc hơn. Việc sử dụng rộng rãi thuốc đều đặn, kết hợp với ảnh hưởng của tuổi, nhấn mạnh tầm quan trọng của các yếu tố này trong việc dự đoán đái tháo đường. Ngược lại, các đặc trưng như đái tháo đường và hút thuốc dường như có tác động không đáng kể hoặc không có lên dự đoán đái tháo đường.

TABLE 10 Hiệu năng dùng cách tiếp cận stacking ensemble.

| Bộ dữ liệu |   Accuracy |   Precision |   Recall |   F1-Score |
|-----------|------------|-------------|----------|------------|
| Dataset-1 |      0.963 |       0.963 |    0.963 |      0.940 |
| Dataset-2 |      0.933 |       0.933 |    0.933 |      0.787 |
| Dataset-3 |      0.981 |       0.982 |    0.981 |      0.986 |
| Dataset-4 |      0.982 |       0.982 |    0.982 |      0.973 |

Hình 7 cho thấy rằng bản ghi thứ mười ba trong dữ liệu đã được dự đoán mắc đái tháo đường với mức tin cậy 98%. Mức tin cậy cao này trong dự đoán đái tháo đường chủ yếu được ảnh hưởng bởi các giá trị của mức đường huyết và tuổi. Trái lại, cùng bản ghi đó đã được dự đoán không mắc đái tháo đường, nhưng với mức tin cậy thấp hơn đáng kể 2%. Mức tin cậy giảm này trong sự vắng mặt của đái tháo đường được quy cho các giá trị của mức HbA1c, tăng huyết áp, và BMI. Phương pháp SHAP được dùng để phân tích Bộ dữ liệu 2, với các phát hiện được trình bày bằng đồ họa.

Trong Hình 8, lớp 0 biểu thị các bệnh nhân không đái tháo đường, trong khi lớp 1 biểu diễn các bệnh nhân đái tháo đường. Đáng chú ý, hầu hết các đặc trưng cho thấy các đóng góp tương tự cho cả hai lớp, ngụ ý một tác động đáng kể ngang nhau lên việc phân loại các cá nhân là đái tháo đường hay không đái tháo đường.

Một xem xét sâu hơn về các chi tiết cụ thể cho thấy ba yếu tố — mức HbA1c, mức đường huyết, và tuổi — đóng vai trò then chốt trong quá trình phân loại. Các đặc trưng này gây ảnh hưởng rõ rệt lên việc xác định tình trạng đái tháo đường của một bệnh nhân. Ngược lại, các đặc trưng như bệnh tim và giới tính có tác động tối thiểu lên phân loại, gợi ý chúng kém đáng kể trong việc phân biệt giữa hai nhóm.

Khi xem xét Hình 9, trở nên rõ ràng rằng các cá nhân có mức HbA1c tăng cao có khả năng cao hơn được chẩn đoán mắc đái tháo đường. Tương tự, mức đường huyết cao thường liên quan tới đái tháo đường. Quan sát này ngụ ý rằng cả mức HbA1c lẫn mức đường huyết đều là các yếu tố then chốt trong việc dự đoán đái tháo đường. Sự xuất hiện thường xuyên của các mức HbA1c và đường huyết cao nhấn mạnh tầm quan trọng của chúng trong việc đưa ra các dự đoán chính xác về đái tháo đường. Ngược lại, các đặc trưng như bệnh tim và giới tính dường như có tác động tối thiểu tới không có lên dự đoán đái tháo đường, chỉ ra đóng góp hạn chế của chúng trong việc phân biệt giữa các cá nhân đái tháo đường và không đái tháo đường.

Hình 10 cho thấy rằng bản ghi thứ mười ba trong bộ dữ liệu đã được dự đoán mắc đái tháo đường với mức tin cậy 80%. Dự đoán tự tin này về đái tháo đường chủ yếu dựa trên các giá trị của giới tính, polydipsia, polyuria, và tuổi. Trái lại, cùng bản ghi đó đã được dự đoán không mắc đái tháo đường, dù với mức tin cậy thấp hơn 20%. Phương pháp SHAP được dùng để phân tích Bộ dữ liệu 3, với các kết quả được mô tả trong một hình. Trong Hình 11, lớp 0 biểu diễn các bệnh nhân không đái tháo đường, trong khi lớp 1 tương ứng với các bệnh nhân đái tháo đường. Đáng chú ý, hầu hết các đặc trưng chứng minh các đóng góp tương tự cho cả hai lớp, chỉ ra một tác động ngang nhau lên việc phân loại các cá nhân là đái tháo đường hay không đái tháo đường.

Một xem xét chi tiết cho thấy ba yếu tố — polyuria, polydipsia, và giới tính — đóng vai trò đáng kể trong quá trình phân loại. Các đặc trưng này then chốt trong việc xác định tình trạng đái tháo đường của một bệnh nhân. Ngược lại, các đặc trưng như cứng cơ và béo phì dường như gây ảnh hưởng tối thiểu lên phân loại, gợi ý chúng kém then chốt trong việc phân biệt giữa hai nhóm.

Khi phân tích Hình 12, trở nên rõ ràng rằng các cá nhân có mức polyuria cao có khả năng cao hơn được chẩn đoán mắc đái tháo đường. Tương tự, sự hiện diện của polydipsia thường liên quan tới tình trạng này. Quan sát này chỉ ra rằng cả polyuria lẫn polydipsia đều là các yếu tố then chốt trong việc dự đoán đái tháo đường. Sự xuất hiện thường xuyên của các triệu chứng này nhấn mạnh tầm quan trọng của chúng trong việc đưa ra các dự đoán chính xác về đái tháo đường. Mặt khác, các đặc trưng như cứng cơ và béo phì dường như có tác động tối thiểu tới không có lên dự đoán đái tháo đường, gợi ý rằng chúng đóng vai trò ít đáng kể hơn trong việc phân biệt giữa các cá nhân đái tháo đường và không đái tháo đường.

Hình 13 chỉ ra rằng bản ghi thứ mười ba trong bộ dữ liệu đã được dự đoán mắc đái tháo đường với một mức tin cậy cao 97%. Dự đoán mạnh mẽ này về đái tháo đường chủ yếu được ảnh hưởng bởi các giá trị của mức glucose, Diabetes Pedigree Function, số lần mang thai, và tuổi.

Trái lại, cùng bản ghi đó đã được dự đoán không mắc đái tháo đường, dù với một mức tin cậy thấp 3%. Dự đoán kém tin cậy này được quy cho các giá trị của insulin và BMI (Body Mass Index).

Phương pháp SHAP được dùng để phân tích Bộ dữ liệu 4, với các kết quả được trình bày bằng đồ họa trong Hình 14. Trong hình này, lớp 0 biểu thị các bệnh nhân không đái tháo đường, trong khi lớp 1 biểu thị các bệnh nhân đái tháo đường. Rõ ràng từ phân tích rằng hầu hết các đặc trưng đóng góp tương tự cho cả hai lớp, gợi ý một tác động ngang nhau lên việc phân loại các cá nhân là đái tháo đường hay không đái tháo đường.

Một sự xem xét kỹ hơn các chi tiết cụ thể cho thấy ba yếu tố — mức glucose, BMI (Body Mass Index), và tuổi — nắm giữ các vai trò then chốt trong quá trình phân loại. Các đặc trưng này then chốt trong việc xác định tình trạng đái tháo đường của một bệnh nhân. Ngược lại, các đặc trưng như độ dày da và huyết áp dường như gây ảnh hưởng tối thiểu lên phân loại, chỉ ra đóng góp ít hơn của chúng trong việc phân biệt giữa các cá nhân đái tháo đường và không đái tháo đường.

Khi phân tích Hình 15, trở nên rõ ràng rằng các cá nhân có mức glucose cao có khả năng cao hơn được chẩn đoán mắc đái tháo đường. Tương tự, một BMI (Body Mass Index) cao thường liên quan tới tình trạng này. Quan sát này chỉ ra rằng cả mức glucose lẫn BMI đều là các yếu tố then chốt trong việc dự đoán đái tháo đường. Sự xuất hiện thường xuyên của các mức glucose cao và BMI cao nhấn mạnh tầm quan trọng của chúng trong việc đưa ra các dự đoán chính xác về đái tháo đường. Ngược lại, các đặc trưng như độ dày da và huyết áp dường như có tác động tối thiểu tới không có lên dự đoán đái tháo đường, gợi ý vai trò hạn chế của chúng trong việc phân biệt giữa các cá nhân đái tháo đường và không đái tháo đường.

## 6 Kết luận

Tỷ lệ hiện mắc đái tháo đường gia tăng đòi hỏi việc phát triển các mô hình dự đoán chính xác và đáng tin cậy cho chẩn đoán sớm và quản lý hiệu quả bệnh. Các mô hình này có thể xác định các cá nhân có nguy cơ, cho phép các can thiệp kịp thời để ngăn ngừa hoặc trì hoãn sự khởi phát của các biến chứng liên quan tới đái tháo đường. Hơn nữa, các mô hình dự đoán hỗ trợ các nhà cung cấp chăm sóc sức khỏe trong việc cá nhân hóa các kế hoạch điều trị dựa trên các hồ sơ nguy cơ cá nhân, cuối cùng cải thiện các kết cục của bệnh nhân. Trong nghiên cứu của chúng tôi, tương tự các phát hiện của Walaa Hassan (Sheta et al., 2024), người đã xác định 'Pregnancies,' 'Glucose, ' 'BMI,' 'Pedigree Function,' và 'Age'

là các đặc trưng quan trọng, chúng tôi xác định rằng 'Age,' 'Glucose,' và 'BMI' nằm trong số các yếu tố đáng kể nhất trong việc dự đoán đái tháo đường. Nhìn chung, bộ phân loại Random Forest vượt các bộ phân loại khác trong việc xử lý các bộ dữ liệu đái tháo đường. Tương tự, các bộ phân loại dùng các phương pháp dựa trên wrapper thường đạt độ chính xác cao hơn so với các bộ dùng các phương pháp dựa trên filter, với các ngoại lệ đáng chú ý. Độ chính xác của mô hình có xu hướng giảm khi giới hạn chỉ ở các đặc trưng quan trọng thay vì dùng tất cả các đặc trưng sẵn có. Trong các phương pháp dựa trên wrapper khác nhau, Gradient Boosting liên tục đem lại các kết quả vượt trội, nổi lên là bộ hoạt động tốt nhất. Ngược lại, Fisher's Score được xác định là hiệu quả nhất trong các phương pháp dựa trên filter.

Trong nghiên cứu này, chúng tôi triển khai một cách tiếp cận stacking ensemble dùng bốn mô hình cơ sở và một meta-model Logistic Regression trên bốn bộ dữ liệu. Các kết quả được lập bảng một cách hệ thống cho thấy rằng hiệu năng của cách tiếp cận stacking ensemble vượt các thước đo thông thường cho mỗi bộ dữ liệu, mặc dù nó kém hơn một chút so với phương pháp lựa chọn đặc trưng. Ngoài ra, việc tích hợp các kỹ thuật explainable AI, như Local Interpretable Model-agnostic Explanations (LIME) và SHapley Additive exPlanations (SHAP), cung cấp các hiểu biết giá trị về các quá trình ra quyết định của các mô hình dự đoán. Các phương pháp này nhấn mạnh tầm quan trọng của các đặc trưng như tuổi và Body Mass Index (BMI) như các yếu tố then chốt trong dự đoán đái tháo đường. Việc bao gồm các cách tiếp cận explainable AI này nâng cao tính minh bạch và khả năng diễn giải của các mô hình, làm nổi bật ý nghĩa của các đặc trưng cụ thể trong việc cải thiện độ chính xác dự đoán đái tháo đường. Cách tiếp cận toàn diện này minh họa tiềm năng của việc kết hợp các phương pháp ensemble với lựa chọn đặc trưng và explainable AI để phát triển các mô hình dự đoán bền vững cho đái tháo đường.

Các mô hình dự đoán đề xuất của nghiên cứu cho chẩn đoán đái tháo đường cho thấy các hạn chế như khả năng tổng quát hóa giảm do tính đặc thù của bộ dữ liệu, độ chính xác giảm khi chỉ dùng các đặc trưng quan trọng được chọn, và sự phụ thuộc hiệu năng vào các bộ phân loại cụ thể như Random Forest. Các sự không nhất quán trong tầm quan trọng đặc trưng giữa các bộ dữ liệu và phương pháp khác nhau, cùng với các thách thức do việc tích hợp các kỹ thuật explainable AI đặt ra, cho thấy rằng một số đặc trưng tác động tối thiểu lên các dự đoán, gợi ý các bất hiệu quả tiềm năng trong diễn giải mô hình. Ngoài ra, trong khi các phương pháp ensemble như stacking nâng cao hiệu năng, chúng làm tăng độ phức tạp mô hình, điều có thể làm phức tạp việc duy trì hiệu năng mà không quá khớp. Các hạn chế này gợi ý các lĩnh vực cho tinh chỉnh tương lai để nâng cao tính bền vững và khả năng áp dụng của các mô hình trên các bối cảnh lâm sàng đa dạng.

## Data availability statement

Publicly available datasets were analyzed in this study. This data can be found here: https://www.kaggle.com/datasets/tigganeha4/ diabetes-dataset-2019 (accessed February 12, 2024); https://www. kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset (accessed February 12, 2024); https://www.kaggle.com/datasets/ andrewmvd/early-diabetes-classification (accessed February 12, 2024); https://www.kaggle.com/datasets/mathchi/diabetes-dataset (accessed February 12, 2024).

## Author contributions

JK: Conceptualization, Data curation, Investigation, Methodology, Software, Writing -original draft. IJS: Data curation, Investigation, Methodology, Software, Writing -original draft, Formal analysis. SS: Data curation, Investigation, Software, Writing -original draft, Conceptualization. TA: Conceptualization, Data curation, Investigation, Software, Writing - original draft, Methodology. RRR: Methodology, Investigation, Software, Writing - original draft. YS: Formal analysis, Project administration, Supervision, Validation, Visualization, Writing - review &amp; editing. DV-G: Writing - review &amp; editing, Funding acquisition. YH: Writing - review &amp; editing, Funding acquisition, Resources, Formal analysis, Project administration, Supervision, Visualization. WM: Funding acquisition, Project administration, Supervision, Validation, Visualization, Writing - review &amp; editing. SA: Funding acquisition, Project administration, Resources, Supervision, Visualization, Writing -review &amp; editing. KS: Formal analysis, Project administration, Supervision, Validation, Visualization, Writing - review &amp; editing.

## Funding

The author(s) declare that no financial support was received for the research, authorship, and/or publication of this article.

## Conflict of interest

The authors declare that the research was conducted in the absence of any commercial or financial relationships that could be construed as a potential conflict of interest.

The author(s) declared that they were an editorial board member of Frontiers, at the time of submission. This had no impact on the peer review process and the final decision.

## Publisher's note

All claims expressed in this article are solely those of the authors and do not necessarily represent those of their affiliated organizations, or those of the publisher, the editors and the reviewers. Any product that may be evaluated in this article, or claim that may be made by its manufacturer, is not guaranteed or endorsed by the publisher.

## Supplementary material

The Supplementary Material for this article can be found online at: https://www.frontiersin.org/articles/10.3389/frai.2024. 1421751/full#supplementary-material

## References

Abnoosian, K., Farnoosh, R., and Behzadi, M. H. (2023). Prediction of diabetes disease using an ensemble of machine learning multi-classifier models. BMC Bioinfor . 24:337. doi: 10.1186/s12859-023-05465-z

Ahmad, H. F., Mukhtar, H., Alaqail, H., Seliaman, M. E., and Alhumam, A. (2021). Investigating health-related features and their impact on the prediction of diabetes using machine learning. Appl. Sci . 11:1173. doi: 10.3390/app110 31173

Alam, U., Asghar, O., Azmi, S., and Malik, R. A. (2014). 'General aspects of diabetes mellitus, ' in Handbook of Clinical Neurology , D. W. Zochodne, and R. A. Malik (New York: Elsevier), 211-222. doi: 10.1016/B978-0-444-53480-4.00015-1

Alnowaiser, K. (2024). Improving healthcare prediction of diabetic patients using KNN imputed features and tri-ensemble model. IEEE Access . 12, 16783-16793. doi: 10.1109/ACCESS.2024.3359760

Ambady, R., and Chamukuttan, S. (2008). Early diagnosis and prevention of diabetes in developing countries. Rev. Endocr. Metab. Disor . 9, 193-201. doi: 10.1007/s11154-008-9079-z

Asri, H., Mousannif, H., Moatassime, H. A., and Noel, T. (2015). 'Big data in healthcare: challenges and opportunities, ' in Proceedings 2015 International Conference Cloud Technology Applied (CloudTech) (Marrakech, Morocco), 1-7. doi: 10.1109/CloudTech.2015.7337020

Bennett, P. H., and Knowler, W. C. (1984). Early detection and intervention in diabetes mellitus: Is it effective? J. Chronic Dis . 37, 653-666. doi: 10.1016/0021-9681(84)90116-4

Dash, S., et al. (2019). Big data in healthcare: management, analysis and future prospects. J. Big Data 6:54. doi: 10.1186/s40537-019-0217-0

Deshmukh, C. D., Jain, A., and Nahata, B. (2015). Diabetes mellitus: a review. Int. J. Pure Appl. Biosci . 3, 224-230. doi: 10.23893/1307-2080.APS.0555

Dixit, S., Bohre, K., Singh, Y., Himeur, Y., Mansoor, W., Atalla, S., et al. (2023). A comprehensive review on ai-enabled models for parkinson's disease diagnosis. Electronics 12:783. doi: 10.3390/electronics12040783

Do˘ gru, A., Buyruko˘ glu, S., and Arı, M. (2023). A hybrid super ensemble learning model for the early-stage prediction of diabetes risk. Med. Biol. Eng. Comput . 61, 785-797. doi: 10.1007/s11517-022-02749-z

El-Bashbishy, A. E.-S., and El-Bakry, H. M. (2024). Pediatric diabetes prediction using deep learning. Sci. Rep . 14:4206. doi: 10.1038/s41598-024-51438-4

Farrelly, C., Singh, Y., Hathaway, Q. A., Carlsson, G., Choudhary, A., Paul, R., et al. (2023). 'Current topological and machine learning applications for bias detection in text, ' in 2023 6th International Conference on Signal Processing and Information Security (ICSPIS) (IEEE), 190-195. doi: 10.1109/ICSPIS60075.2023.103 43824

Ganie, S. M., Pramanik, P. K. D., Bashir Malik, M., Mallik, S., and Qin, H. (2023). An ensemble learning approach for diabetes prediction using boosting techniques. Front. Genet . 14:1252159. doi: 10.3389/fgene.2023.1252159

Habchi, Y., Himeur, Y., Kheddar, H., Boukabou, A., Atalla, S., Chouchane, A., et al. (2023). Ai in thyroid cancer diagnosis: Techniques, trends, and future directions. Systems 11:519. doi: 10.3390/systems11100519

Jain, A., and Singhal, A. (2024). Bio-inspired approach for early diabetes prediction and diet recommendation. SN Comput. Sci . 5:182. doi: 10.1007/s42979-023-02481-x

Javaid, M., Haleem, A., Singh, R. P., Suman, R., and Rab, S. (2022). Significance of machine learning in healthcare: Features, pillars and applications. Int. J. Intell. Netw . 3, 58-73. doi: 10.1016/j.ijin.2022.05.002

Krasteva, A., Panov, V., Krasteva, A., Kisselova-Yaneva, A., and Krastev, Z. (2014). Oral cavity and systemic diseases' diabetes mellitus. Biotechnol. Biotechnol. Equip . 25, 2183-2186. doi: 10.5504/BBEQ.2011.0022

Lyngdoh, C., Choudhury, N. A., and Moulik, S. (2021). 'Diabetes disease prediction using machine learning algorithms, ' in Proceedings 2020 IEEE-EMBS Conf. on Biomedical Engineering and Sciences (IECBES) (Langkawi Island, Malaysia), 517-521. doi: 10.1109/IECBES48179.2021.9398759

Modak, S. K. S., and Jha, V. K. (2024). Diabetes prediction model using machine learning techniques. Multimed. Tools Appl . 83, 38523-38549. doi: 10.1007/s11042-023-16745-4

Mujumdar, A., and Vaidehi, V. (2019). Diabetes prediction using machine learning algorithms. Procedia Comput. Sci . 165, 292-299. doi: 10.1016/j.procs.2020.01.047

Nathan, D. M. (1993). Long-term complications of diabetes mellitus. N. Engl. J. Med . 328, 1676-1685. doi: 10.1056/NEJM199306103282306

Patel, H., Farrelly, C., Hathaway, Q. A., Rozenblit, J. Z., Deepa, D., Singh, Y., et al. (2023). 'Topology-aware gan (topogan): Transforming medical imaging advances,' in 2023 Tenth International Conference on Social Networks Analysis, Management and Security (SNAMS) (IEEE), 1-3. doi: 10.1109/SNAMS60348.2023. 10375442

Rastogi, R., and Bansal, M. (2023). Diabetes prediction model using data mining techniques. Measurement 25:100605. doi: 10.1016/j.measen.2022.100605

Reza, M. S., Hafsha, U., Amin, R., Yasmin, R., and Ruhi, S. (2023). Improving svm performance for type ii diabetes prediction with an improved non-linear kernel: Insights from the pima dataset. Comput. Methods Progr. Biomed. Update 4:100118. doi: 10.1016/j.cmpbup.2023.100118

Saru, S., and Subashree, S. (2019). Analysis and prediction of diabetes using machine learning. Int. J. Emer. Technol. Innovat. Eng . 5:308.

Sarwar, M. A., Kamal, N., Hamid, W., and Shah, M. A. (2018). 'Prediction of diabetes using machine learning algorithms in healthcare,' in Proceedings 2018 24th Int. Conf. Automation and Computing (ICAC) (Newcastle Upon Tyne, UK), 1-6. doi: 10.23919/IConAC.2018.8748992

Saxena, S., Mohapatra, D., Padhee, S., and Sahoo, G. K. (2023). Machine learning algorithms for diabetes detection: a comparative evaluation of performance of algorithms. Evolut. Intell . 16, 587-603. doi: 10.1007/s12065-021-00685-9

Setacci, C., De Donato, G., Setacci, F., and Chisci, E. (2009). Diabetic patients: epidemiology and global impact. J. Cardiovasc. Surg . 50, 263-273.

Shafi, S., and Ansari, G. A. (2021). 'Early prediction of diabetes disease and classification of algorithms using machine learning approach,' in Proceedings of the International Conference on Smart Data Intelligence (ICSMDI 2021) . doi: 10.2139/ssrn.3852590

Sharma, A., Guleria, K., and Goyal, N. (2021). 'Prediction of diabetes disease using machine learning model,' in Lecture Notes in Electrical Engineering , eds. V. Bindhu, J. M. R. S. Tavares, A. A. A. Boulogeorgos, and C. Vuppalapati (Singapore: Springer). doi: 10.1007/978-981-33-4909-4\_53

Sheta, A., Elashmawi, W. H., Al-Qerem, A., and Othman, E. S. (2024). Utilizing various machine learning techniques for diabetes mellitus feature selection and classification. Int. J. Adv. Comput. Sci. Appl . 15. doi: 10.14569/IJACSA.2024.01503134

Shimpi, J. K., Shanmugam, P., and Stonier, A. A. (2024). Analytical model to predict diabetic patients using an optimized hybrid classifier. Soft Comput . 28, 1883-1892. doi: 10.1007/s00500-023-09487-w

Singh, Y., Farrelly, C., Hathaway, Q. A., Carrubba, A. R., Deepa, D., Friebe, M., et al. (2023). 'The critical role of homotopy continuation in roboticassisted surgery-future perspective, ' in 2023 Tenth International Conference on Social Networks Analysis, Management and Security (SNAMS) (IEEE), 1-5. doi: 10.1109/SNAMS60348.2023.10375412

Sisodia, D., and Sisodia, D. S. (2018). Prediction of diabetes using classification algorithms. Procedia Comput. Sci . 132, 1578-1585. doi: 10.1016/j.procs.2018.05.122

Suryasa, I. W., Rodríguez-Gámez, M., and Koldoris, T. (2021). Health and treatment of diabetes mellitus. Int. J. Health Sci . 5, 1-5. doi: 10.53730/ijhs.v5n1.2864

Talari, P., N, B., Kaur, G., Alshahrani, H., Al Reshan, M. S., Sulaiman, A., et al. (2024). Hybrid feature selection and classification technique for early prediction and severity of diabetes type 2. PLoS ONE 19:e0292100. doi: 10.1371/journal.pone.0292100

Tasin, I., Nabil, T. U., Islam, S., and Khan, R. (2023). Diabetes prediction using machine learning and explainable AI techniques. Healthcare Technol. Lett . 10, 1-10. doi: 10.1049/htl2.12039

Tripathi, G., and Kumar, R. (2020). 'Early prediction of diabetes mellitus using machine learning,' in Proceedings 2020 8th International Conference on Reliability, Infocom Technologies and Optimization (Trends and Future Directions) ( ICRITO) (Noida, India), 1009-1014. doi: 10.1109/ICRITO48877.2020.9197832

Tripathi, R. P., Sharma, M., Gupta, A. K., Pandey, D., Pandey, B. K., Shahul, A., et al. (2023). Timely prediction of diabetes by means of machine learning practices. Augmented Hum. Res . 8:1. doi: 10.1007/s41133-023-00062-4

Vijayan, V. V., and Anjali, C. (2015). 'Prediction and diagnosis of diabetes mellitus-a machine learning approach,' in Proceedings 2015 IEEE Recent Advances in Intelligent Computational Systems (RAICS) (Trivandrum, India). doi: 10.1109/RAICS.2015.7488400

Wee, B. F., Sivakumar, S., Lim, K. H., Wong, W. K., and Juwono, F. H. (2024). Diabetes detection based on machine learning and deep learning approaches. Multimed. Tools Appl . 83, 24153-24185. doi: 10.1007/s11042-023-16407-5

Wei, G., Zhao, J., Feng, Y., He, A., and Yu, J. (2020). A novel hybrid feature selection method based on dynamic feature importance. Appl. Soft Comput . 93:106337. doi: 10.1016/j.asoc.2020.106337

Xue, J., Min, F., and Ma, F. (2020). 'Research on diabetes prediction method based on machine learning,' in Journal of Physics: Conference Series (Shanghai, China). doi: 10.1088/1742-6596/1684/1/012062

Zambrana, A., Fanek, L., Carrera, P. S., Ali, M. L., and Narasareddygari, M. R. (2024). 'Machine learning algorithms for diabetes diagnosis prediction, ' in 2024 6th International Conference on Image, Video and Signal Processing , 192-199. doi: 10.1145/3655755.3655781

Zhou, H., Xin, Y., and Li, S. (2023). A diabetes prediction model based on boruta feature selection and ensemble learning. BMC Bioinfor . 24:224. doi: 10.1186/s12859-023-05300-5

Zohair, M., Chandra, R., Tiwari, S., and Agarwal, S. (2024). A model fusion approach for severity prediction of diabetes with respect to binary and multiclass classification. Int. J. Inf. Technol . 16, 1955-1965. doi: 10.1007/s41870-023-01463-9
