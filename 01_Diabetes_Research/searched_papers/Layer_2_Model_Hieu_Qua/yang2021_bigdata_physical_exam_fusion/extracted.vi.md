<!-- extracted by pdf-extract | engine=docling | pages=10 | ocr=False | tables=8/7 | density=1.09 | score=100 -->

## Bài báo đầy đủ

## Dự đoán nguy cơ đái tháo đường: Khai phá dữ liệu lớn với sự hợp nhất nhiều chỉ số khám sức khỏe thể chất

Hui Yang a , Yamei Luo b , Xiaolei Ren c,d , Ming Wu c , Xiaolin He c , Bowen Peng e , Kejun Deng a , Dan Yan f , Hua Tang g,h,* , Hao Lin a,*

- a School of Life Science and Technology, Center for Informational Biology, University of Electronic Science and Technology of China, Chengdu 610054, China

b School of Medical Information and Engineering, Southwest Medical University, Luzhou 646000, China

c Heima Digital Technology Ltd, Luzhou 646000, China

d Chuanjiang Science and Technology Research Institute Ltd, Luzhou 646000, China

e Division of International Cooperation, Health Commission of Sichuan Province, Chengdu, 610041, China

f Beijing Friendship Hospital, Captial Medical University, Beijing 100050, China

g School of Basic Medical Sciences, Southwest Medical University, Luzhou 646000, China

- h Central Nervous System Drug Key Laboratory of Sichuan Province, Luzhou 646000, China

## T Ó M T Ắ T

Đái tháo đường là một đại dịch toàn cầu. Phơi nhiễm lâu dài với tăng đường huyết có thể gây tổn thương mạn tính cho nhiều mô khác nhau. Do đó, chẩn đoán sớm đái tháo đường là rất quan trọng. Trong nghiên cứu này, chúng tôi đã thiết kế một hệ thống tính toán để dự đoán nguy cơ đái tháo đường bằng cách hợp nhất nhiều loại dữ liệu khám sức khỏe thể chất. Chúng tôi đã thu thập 1,507,563 dữ liệu khám sức khỏe của người khỏe mạnh và bệnh nhân đái tháo đường, cũng như 387,076 dữ liệu khám sức khỏe từ các hồ sơ theo dõi (follow-up) trong giai đoạn 2011 đến 2017 của bệnh nhân đái tháo đường tại thành phố Lư Châu (Luzhou), Trung Quốc. Ba loại chỉ số khám sức khỏe thể chất đã được phân tích thống kê: nhân khẩu học (demographics), dấu hiệu sinh tồn (vital signs) và giá trị xét nghiệm (laboratory values). Để phân biệt bệnh nhân đái tháo đường với người khỏe mạnh, một mô hình dựa trên eXtreme Gradient Boosting (XGBoost) đã được phát triển, có thể tạo ra diện tích dưới đường cong đặc trưng hoạt động của bộ thu nhận (AUC) bằng 0.8768. Hơn nữa, để cải thiện sự tiện lợi và linh hoạt của mô hình trong các kịch bản lâm sàng và đời thực, một thẻ điểm nguy cơ đái tháo đường (scorecard) đã được thiết lập dựa trên hồi quy logistic, có thể đánh giá sức khỏe con người. Cuối cùng, chúng tôi đã phân tích thống kê dữ liệu từ các hồ sơ theo dõi để xác định các yếu tố then chốt ảnh hưởng đến khả năng kiểm soát tình trạng bệnh của bệnh nhân. Để cải thiện sàng lọc theo bậc thang (cascade screening) đái tháo đường và quản lý lối sống cá nhân, một hệ thống đánh giá nguy cơ đái tháo đường trực tuyến đã được thiết lập, có thể truy cập miễn phí tại http://lin-group.cn/server/DRSC/index.html. Hệ thống này được kỳ vọng cung cấp hướng dẫn cho việc quản lý sức khỏe con người.

## 1. Giới thiệu

Đái tháo đường hiện được xem là một đại dịch toàn cầu [1]. Phơi nhiễm lâu dài với tăng đường huyết có thể dẫn đến tổn thương mạn tính cho nhiều mô khác nhau [2,3]. Do đó, phát hiện sớm và can thiệp sớm đái tháo đường là rất quan trọng để phòng ngừa đái tháo đường hoặc làm chậm các biến chứng của đái tháo đường mạn tính. Tuy nhiên, hiện chỉ một nửa số bệnh nhân đái tháo đường được chẩn đoán do điều kiện kinh tế và hiểu biết hạn chế về tình trạng sức khỏe của họ [1]. Với sự tăng trưởng khổng lồ của dữ liệu khám sức khỏe và sự phát triển nhanh chóng của trí tuệ nhân tạo, việc dùng dữ liệu khám sức khỏe để thiết lập một mô hình đánh giá nguy cơ bệnh tật có thể cung cấp hướng dẫn lâm sàng và sàng lọc sớm trên quy mô lớn [4]. Các nghiên cứu gần đây đã cho thấy các bệnh mạn tính, đặc biệt là đái tháo đường, đóng vai trò quan trọng trong sự sống còn của bệnh do virus corona mới 2019 (COVID-19) [5-7]. Hơn nữa, việc hiểu nguy cơ đường huyết của một cá nhân cũng có thể định hướng các chiến lược phòng ngừa và điều trị bệnh do virus corona mới [6].

* Các tác giả liên hệ.

E-mail addresses: huatang@swmu.edu.cn (H. Tang), hlin@uestc.edu.cn (H. Lin).

Một số nghiên cứu đã tập trung vào việc thiết kế các mô hình phát hiện đái tháo đường khác nhau [8-10]. Gao và cộng sự [10] đã sử dụng tuổi, giới tính, vòng eo, huyết áp tâm thu và tiền sử gia đình mắc đái tháo đường làm đặc trưng để nhận diện đái tháo đường, nhưng AUC chỉ đạt 0.635. Trên cơ sở các đặc trưng tương tự, AUC được cải thiện lên 0.748 bằng cách dùng hồi quy logistic đa biến [11]. Hiệu năng của các mô hình này không thỏa đáng vì các đặc tính của dữ liệu xét nghiệm chưa đầy đủ. Một nghiên cứu khác [12] đã giới thiệu chiến lược lựa chọn đặc trưng để xây dựng mô hình dự đoán. Tuy nhiên, bộ dữ liệu dùng trong nghiên cứu đó được lấy từ kho lưu trữ học máy Kaggle [13], vốn khác biệt với tình huống thực tế ở một mức độ nhất định. Zou và cộng sự [14] đã phát triển một mô hình dự đoán đái tháo đường ở người Trung Quốc, nhưng không cung cấp một hệ thống hay một thẻ điểm nguy cơ đái tháo đường. Hơn nữa, hầu hết các mô hình này dùng dữ liệu không đầy đủ và thiếu dữ liệu xét nghiệm, dẫn đến hiệu năng không thỏa đáng. Vì vậy, tất cả các mô hình đã công bố này đều không

Nội dung có sẵn tại ScienceDirect

## Information Fusion

trang chủ tạp chí: www.elsevier.com/locate/inffus H. Yang et al.

phù hợp cho sàng lọc theo bậc thang quy mô lớn.

Để khắc phục nhược điểm của các mô hình trước đây, chúng tôi đã phát triển một hệ thống mới để đánh giá nguy cơ đái tháo đường. Trong hệ thống này, một lượng lớn dữ liệu khám sức khỏe được thu thập từ hồ sơ bệnh án điện tử (EMR). Các dữ liệu này có một số ưu điểm, gồm độ bao phủ rộng, khối lượng lớn và dễ thu thập. Chúng tôi đề xuất một hệ thống đánh giá nguy cơ đái tháo đường theo bậc thang dựa trên ba loại đặc tính khám sức khỏe thể chất: nhân khẩu học, dấu hiệu sinh tồn và giá trị xét nghiệm. Hệ thống gồm ba mô-đun: mô hình đánh giá nguy cơ đái tháo đường, thẻ điểm nguy cơ đái tháo đường và mô hình mức độ hài lòng theo dõi (follow-up satisfaction model). Hệ thống có thể đánh giá nguy cơ đái tháo đường từ nhiều cấp độ khác nhau. Do đó, nó không chỉ áp dụng được cho hệ thống y tế công cộng mà còn thuận tiện cho việc cấy ghép các thiết bị đeo hoặc hệ thống nhà thông minh dựa trên Internet vạn vật (IoT) [15-17]. Bằng cách tích hợp các chỉ số thu thập từ các thiết bị gia đình khác nhau, hệ thống có thể thực hiện cảnh báo sớm và giám sát liên tục nguy cơ của từng cá nhân [18]. Nó cũng có thể cung cấp một cơ sở trực tiếp để các công ty bảo hiểm đánh giá trước nguy cơ bồi thường của các cá nhân mua bảo hiểm thương mại.

Các đóng góp chính của nghiên cứu này được liệt kê như sau:

- Ba loại đặc trưng lâm sàng được hợp nhất dựa trên một lượng lớn dữ liệu khám sức khỏe để xây dựng một hệ thống đánh giá nguy cơ đái tháo đường theo bậc thang.
- Một tập con tối ưu các chỉ số khám sức khỏe được thu được nhờ lựa chọn đặc trưng để đánh giá nguy cơ đái tháo đường.
- Một mô hình đánh giá nguy cơ đái tháo đường được phát triển để thực hiện sàng lọc quy mô lớn ở cấp độ hệ thống.
- Một thẻ điểm nguy cơ đái tháo đường được thiết kế dựa trên phân nhóm theo tần suất bằng nhau (equal-frequency binning) để cải thiện tính linh hoạt của mô hình trong các ứng dụng lâm sàng.
- Các yếu tố then chốt ảnh hưởng đến khả năng kiểm soát tình trạng bệnh của bệnh nhân được xác định dựa trên hồ sơ theo dõi.
- Một công cụ trực tuyến để quản lý nguy cơ đái tháo đường được thiết lập.

Các bước xây dựng hệ thống được trình bày trong Hình 1, và được mô tả chi tiết.

## 2. Vật liệu và phương pháp

## 2.1. Bộ dữ liệu

Một lượng dữ liệu thực đủ lớn là nền tảng để xây dựng một mô hình học máy hiệu năng cao đáng tin cậy. Chúng tôi đã thu được dữ liệu khám sức khỏe từ EMR của Ủy ban Y tế Thành phố Lư Châu (Luzhou Municipal Health Commission) tại Trung Quốc trong giai đoạn 2011 đến 2017. Dữ liệu này bao gồm kết quả khám sức khỏe của người khỏe mạnh, dữ liệu khám sức khỏe của những người được chẩn đoán đái tháo đường (cả Type I và Type II), và dữ liệu theo dõi của những người mắc đái tháo đường. Công cụ chẩn đoán dùng để chẩn đoán tất cả bệnh nhân đái tháo đường là nghiệm pháp dung nạp glucose đường uống 75 g (OGTT) [19].

Để loại bỏ nhiễu trong dữ liệu ban đầu và nhờ đó đạt được dữ liệu chất lượng cao, chúng tôi đã loại bỏ các đặc trưng có tỷ lệ thiếu > 10% và sau đó mã hóa các đặc tính dạng văn bản thành biến rời rạc. Tiếp theo, chúng tôi loại bỏ các giá trị bất thường do thao tác không đúng của hệ thống gây ra. Các mẫu có giá trị thiếu đã được loại trừ, và các mẫu trùng lặp đã bị xóa. Cuối cùng chúng tôi thu được dữ liệu cohort gồm 1221,598 mẫu khám sức khỏe cho người khỏe mạnh, 285,965 cho bệnh nhân đái tháo đường, và 387,076 dữ liệu theo dõi. Khoảng tuổi của quần thể mẫu là 20 -99 tuổi. Phân bố được trình bày trong Hình 2.

Chúng tôi tạo ra hai bộ dữ liệu chuẩn (benchmark). Bộ dữ liệu chuẩn thứ nhất S 1 được dùng để xây dựng mô hình đánh giá nguy cơ đái tháo đường và thẻ điểm, được công thức hóa là

Hình 2. Phân bố tuổi của người khỏe mạnh (màu Xanh) và bệnh nhân đái tháo đường (màu Vàng). (Để diễn giải các tham chiếu về màu sắc trong chú thích hình này, người đọc tham khảo phiên bản web của bài báo.)

Hình 1. lưu đồ toàn bộ quy trình của hệ thống đánh giá nguy cơ đái tháo đường.

trong đó S 1 + chứa 285,965 mẫu cá nhân mắc đái tháo đường, và S 1 chứa 1221,598 mẫu người khỏe mạnh.

Bộ dữ liệu chuẩn thứ hai S2 được xây dựng dựa trên dữ liệu mô hình theo dõi và được công thức hóa là

trong đó S 2 + bao gồm 39,547 mẫu những người không hài lòng với việc kiểm soát đái tháo đường, và S 2 bao gồm 347,529 mẫu những người hài lòng với việc kiểm soát đái tháo đường.

Dữ liệu được phân chia bằng phương pháp holdout 70 -30 để điều chỉnh tham số và đo lường hiệu năng của mô hình.

## 2.2. Hợp nhất đặc trưng

Chúng tôi đã hợp nhất ba loại dữ liệu khám sức khỏe: nhân khẩu học, dấu hiệu sinh tồn và giá trị xét nghiệm, trong mô hình tính toán của mình. Các đặc trưng hợp nhất này có thể cung cấp đủ thông tin để nhận diện nguy cơ đái tháo đường. Chúng tôi nhận thấy số lượng đặc tính ban đầu khác nhau giữa các mẫu dương tính và âm tính. Đối với ba loại dữ liệu khám sức khỏe, các mẫu từ cá nhân khỏe mạnh chứa 27 đặc tính ban đầu, và các mẫu từ bệnh nhân đái tháo đường chứa 67 đặc tính ban đầu. Các đặc trưng này được liệt kê trong Bảng S1 và S2 của Tài liệu bổ sung. Chúng tôi đã loại bỏ một số đặc trưng độc lập với nhãn và loại trừ các đặc trưng có tỷ lệ thiếu > 10%. Các chỉ số mới được thêm vào tùy theo nhu cầu thực tế và kinh nghiệm lâm sàng. Chiều cao và vòng eo không đánh giá được tình trạng béo phì của một người. Tỷ lệ eo trên chiều cao (WHtR) là chỉ số hợp lý hơn để đánh giá liệu một người có tích tụ mỡ nội tạng hay không. Để đơn giản hóa việc thu thập đặc trưng cho ứng dụng lâm sàng, chúng tôi dùng huyết áp tâm thu trung bình (MSP) thay cho huyết áp tâm thu trái (LSP) và huyết áp tâm thu phải (RSP), cũng như huyết áp tâm trương trung bình (MDP) thay cho huyết áp tâm thu trái (LDP) và huyết áp tâm thu phải (RDP). Để khảo sát mối quan hệ giữa chênh lệch huyết áp ở hai chi và đái tháo đường, hai chỉ số là chênh lệch huyết áp tâm thu (SPD) và chênh lệch huyết áp tâm trương (DPD) đã được thêm vào để đo trạng thái bệnh lý của các chi. Các bác sĩ lâm sàng đã khuyến nghị dùng các chỉ số mới này để đánh giá tình trạng của bệnh nhân đái tháo đường [20,21].

Năm đặc trưng mới được tính toán như sau:

(6)

| WHtR   | = W / H       | (3)   |
|--------|---------------|-------|
| MSP    | = LSP + RSP 2 | (4)   |
| MDP    | = LDP + RDP 2 | (5)   |
| SPD    | = LSP RSP     | (6)   |

Bảng 1 Phân tích đơn biến cho các đặc trưng khám sức khỏe.

| Nhóm              | Đặc trưng  | Tổng( n = 1,507,563)    | khỏe mạnh ( n = 1,221,598) | đái tháo đường ( n = 285,965) | giá trị p |   AUC (95% CI) |
|-------------------|------------|-------------------------|---------------------------|---------------------------|-----------|----------------|
| Nhân khẩu học     | Age        | 59.65 ± 13.89           | 58.07 ± 14.18             | 66.37 ± 10.13             | < 0.01    |         0.6893 |
|                   | Breath     | 18.59 ± 1.62            | 18.58 ± 1.60              | 18.61 ± 1.69              | < 0.01    |         0.5106 |
|                   | WHtR       | 0.51 ± 0.06             | 0.51 ± 0.06               | 0.55 ± 0.06               | < 0.01    |         0.6952 |
|                   | BMI        | 23.43 ± 3.36            | 23.10 ± 3.22              | 24.83 ± 3.60              | < 0.01    |         0.6430 |
| Dấu hiệu sinh tồn | MSP        | 126.88 ± 16.90          | 124.57 ± 15.47            | 136.78 ± 19.01            | < 0.01    |         0.6965 |
|                   | MDP        | 76.93 ± 9.51            | 76.15 ± 9.11              | 80.26 ± 10.45             | < 0.01    |         0.6193 |
|                   | SPD        | 4.79 ± 4.12             | 4.70 ± 4.01               | 5.17 ± 4.58               | < 0.01    |         0.5372 |
|                   | DPD        | 4.01 ± 3.16             | 3.97 ± 3.10               | 4.17 ± 3.38               | < 0.01    |         0.5368 |
| Giá trị xét nghiệm| FBG        | 5.97 ± 2.42             | 5.34 ± 1.18               | 8.63 ± 4.01               | < 0.01    |         0.8307 |
|                   | HDL        | 1.58 ± 0.63             | 1.60 ± 0.63               | 1.49 ± 0.62               | < 0.01    |         0.5761 |
|                   | LDL        | 2.70 ± 0.91             | 2.67 ± 0.90               | 2.83 ± 0.96               | < 0.01    |         0.5551 |
|                   | SC         | 76.18 ± 20.50           | 75.66 ± 19.78             | 78.41 ± 23.17             | < 0.01    |         0.5439 |
|                   | TG         | 1.70 ± 1.23             | 1.61 ± 1.16               | 2.06 ± 1.45               | < 0.01    |         0.6158 |
|                   | TC         | 4.90 ± 1.16             | 4.86 ± 1.13               | 5.08 ± 1.24               | < 0.01    |         0.5574 |
|                   | BUN        | 5.48 ± 1.96             | 5.44 ± 1.95               | 5.66 ± 2.02               | < 0.01    |         0.5327 |
|                   | UGLU       | -/1 + /2 + /3 +         | -/1 + /2 + /3 +           | -/1 + /2 + /3 +           | < 0.01    |         0.5576 |

trong đó W và H lần lượt ký hiệu vòng eo và chiều cao; LSP và RSP lần lượt biểu diễn huyết áp tâm thu trái và huyết áp tâm thu phải; và LDP và RDP lần lượt là huyết áp tâm trương trái và huyết áp tâm trương phải.

Dựa trên quá trình trên, 16 đặc trưng đã được chọn làm các đặc trưng dự đoán sơ bộ trong hệ thống đánh giá nguy cơ đái tháo đường. Các đặc trưng này gồm bốn đặc tính nhân khẩu học (age, breath, WHtR, và BMI), bốn dấu hiệu sinh tồn (MSP, MDP, SPD, và DPD), và tám giá trị xét nghiệm (đường huyết lúc đói (FBG), lipoprotein tỷ trọng cao (HDL), LDL, creatinine huyết thanh (SC), triglyceride, cholesterol toàn phần (TC), nitơ urê máu (BUN), glucose niệu (UGLU)). Đối với mô hình dữ liệu theo dõi, sáu đặc trưng đã được dùng: (huyết áp tâm thu (SP), huyết áp tâm trương (DP), BMI, FBG, trạng thái tâm lý (PS), tuân thủ dùng thuốc (MA)). Chúng tôi đã thực hiện phân tích đơn biến các chỉ số này. Kết quả được tóm tắt trong Bảng 1 và 2.

## 2.3. Mô hình đánh giá nguy cơ đái tháo đường

Trước tiên chúng tôi phát triển một mô hình đánh giá nguy cơ đái tháo đường để đánh giá nguy cơ đái tháo đường. Ba kỹ thuật lựa chọn đặc trưng được đề xuất để xếp hạng các đặc trưng. Mỗi tập con đặc trưng sau đó được đưa vào ba loại thuật toán để xác định mô hình tối ưu. Chi tiết được mô tả bên dưới.

Bảng 2 Phân tích đơn biến cho các đặc trưng theo dõi đái tháo đường.

| Đặc trưng           | Tổng( n = 387,076)                                                                                                                                                           | Hài lòng ( n = 347,529)                                                                                                                                                      | Không hài lòng ( n = 39,547)                                                                                                                                              | giá trị p                   | AUC (95% CI)                             |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|------------------------------------------|
| SP DP BMI FBG PS MA | 127.91 ± 8.60 77.20 ± 6.27 22.96 ± 2.31 6.25 ± 0.71 good ( n = 228,600) /general (156,590) /bad (1881) regular (280,552) /Intermittent (58,579) /Not taking medicine (47,945) | 127.67 ± 8.29 77.00 ± 6.02 22.95 ± 2.30 6.14 ± 0.62 good ( n = 210,789) /general (135,683) /bad (1057) regular (265,367) /intermittent (41,904) /not taking medicine (40,258) | 130.09 ± 10.71 78.94 ± 7.87 23.03 ± 2.37 7.25 ± 0.64 good ( n = 20,912) /general (17,811) /bad (824) regular (16,675) /intermittent (15,185) /not taking medicine (7687) | < 0.01 < 0.01 < 0.01 < 0.01 | 0.6227 0.588 0.5277 0.9150 0.5804 0.7026 |

## 2.3.1. Lựa chọn đặc trưng

Trong các mô hình dựa trên học máy, một số lượng lớn đặc trưng thông tin thường được thu thập, vì các đặc trưng như vậy có thể cung cấp đủ thông tin để mô hình cho ra kết quả phân biệt tốt. Tuy nhiên, trong các ứng dụng lâm sàng, chúng ta thường bị giới hạn bởi việc thu thập dữ liệu. Số lượng đặc trưng càng lớn thì độ khó của việc thu thập dữ liệu càng cao. Ngoài ra, các đặc trưng nhiều chiều có thể sinh ra dư thừa thông tin hoặc nhiễu, điều này có thể dẫn đến độ chính xác dự đoán thấp. Do đó, chúng ta phải tìm tập có số lượng đặc trưng nhỏ nhất mà vẫn cho kết quả dự đoán tốt nhất. Một số kỹ thuật lựa chọn đặc trưng đã được đề xuất để giải quyết các vấn đề này. Trong lựa chọn đặc trưng, bước đầu tiên là xếp hạng các đặc trưng dựa trên điểm số quan trọng (importance score) thu được từ một số thuật toán. Chiến lược thêm-dần hoặc giảm-dần đặc trưng được dùng để xác định tập con đặc trưng tối ưu có thể cho kết quả dự đoán tốt nhất. Việc áp dụng lựa chọn đặc trưng trong các bài toán dự đoán không chỉ tránh được thảm họa nhiều chiều và quá khớp (overfitting) mà còn cải thiện hiệu suất của các thao tác thực tế.

Trong nghiên cứu này, để đánh giá tầm quan trọng của các đặc trưng nói trên, các kỹ thuật lựa chọn đặc trưng đã được áp dụng, gồm thông tin tương hỗ (MI) [22], phân tích phương sai (ANOVA) [23], và độ bất thuần Gini (GI) [24]. Lựa chọn đặc trưng tăng dần (IFS) [25] sau đó được dùng để xác định tập con đặc trưng tối ưu. Ba kỹ thuật lựa chọn đặc trưng được mô tả như sau.

2.3.1.1. Thông tin tương hỗ (MI). Thông tin tương hỗ là một thước đo sự phụ thuộc lẫn nhau của các biến. MI của hai biến ngẫu nhiên rời rạc x và y có thể được định nghĩa là

Đối với các biến ngẫu nhiên liên tục,

trong đó p ( x , y ) là hàm phân phối xác suất đồng thời của x và y , và p ( x ) và p ( y ) lần lượt là các hàm phân phối xác suất biên của x và y .

2.3.1.2. Phân tích phương sai (ANOVA). Mục tiêu của ANOVA là xác định mối quan hệ tuyến tính giữa hai nhóm dữ liệu và đánh giá ảnh hưởng của các yếu tố có thể kiểm soát bằng cách phân tích và nghiên cứu đóng góp của các biến thiên từ các nguồn khác nhau vào tổng biến thiên. Chúng tôi dùng trung bình bình phương giữa nhóm (MSB) để mô tả phương sai của mỗi nhóm so với tổng thể và sai số bình phương trung bình (MSE) để biểu diễn trung bình bình phương trong nhóm. ANOVA do đó có thể được định nghĩa là tỷ số giữa MSB và MSE, biểu diễn là

Chi tiết của ANOVA được trình bày trong Tài liệu tham khảo [26].

2.3.1.3. Độ bất thuần Gini. Độ bất thuần Gini được dùng để đo độ bất định của kết quả. GI càng lớn thì tầm quan trọng của đặc trưng càng cao. Nó được định nghĩa là

trong đó t đại diện cho một nút cho trước, i đại diện cho một phân loại bất kỳ của nhãn, và p ( it ) đại diện cho tỷ lệ của phân loại nhãn i trên nút t .

## 2.3.2. Các thuật toán phân loại

Sau khi các đặc trưng được sắp xếp bằng các kỹ thuật lựa chọn đặc trưng nói trên, XGBoost ban đầu được dùng làm bộ phân loại cơ sở để tạo ra các đặc trưng tối ưu. Hiệu năng dự đoán của ba phương pháp học máy -XGBoost [24], hồi quy logistic (LR) [10], và rừng ngẫu nhiên (RF) [27] -đã được đánh giá để đạt được dự đoán tốt nhất. Ba thuật toán được giới thiệu ngắn gọn dưới đây.

2.3.2.1. Extreme Gradient Boosting. XGBoost là một công nghệ học máy phi tuyến dựa trên cây. So với các công nghệ hộp đen như máy vector hỗ trợ (SVM) và mạng nơ-ron nhân tạo (ANN), XGBoost có thể dễ dàng đánh giá tầm quan trọng của tất cả các đặc trưng đầu vào. Điểm số quan trọng của một đặc trưng có thể được tính bằng tổng thông tin khi thực hiện các lần tách (phân nhánh cây) bằng đặc trưng đó.

2.3.2.2. Hồi quy Logistic. LR là một mô hình phân tích hồi quy tuyến tính tổng quát hóa và thường được dùng trong khai phá dữ liệu, chẩn đoán bệnh tự động, dự báo kinh tế và các lĩnh vực khác. Trong dự đoán nguy cơ đái tháo đường, hai nhóm mẫu được chọn: nhóm khỏe mạnh và nhóm đái tháo đường. Nhãn là biến phụ thuộc của hai nhóm, và các đặc trưng là biến độc lập. Bằng phân tích hồi quy logistic, trọng số của biến độc lập được thu được. Xác suất một người mắc đái tháo đường được dự đoán dựa trên trọng số đặc trưng.

2.3.2.3. Rừng ngẫu nhiên. Rừng ngẫu nhiên cũng là một bộ phân loại dựa trên cây chứa nhiều cây quyết định. Hạng mục đầu ra được xác định bởi mode (giá trị xuất hiện nhiều nhất) của hạng mục do từng cây riêng lẻ xuất ra.

Bằng cách so sánh hiệu năng phân loại của ba bộ phân loại, thuật toán có hiệu năng dự đoán tốt nhất được chọn làm thuật toán cuối cùng để xây dựng mô hình dự đoán đái tháo đường. Chúng tôi đã điều chỉnh trọng số trong các thuật toán phân loại để giải quyết sự mất cân bằng giữa các mẫu dương tính và âm tính. Các tham số mô hình được liệt kê trong Bảng S3 của Tài liệu bổ sung.

## 2.4. Thẻ điểm nguy cơ đái tháo đường

Để thuận tiện cho các ứng dụng lâm sàng, chúng tôi tiếp tục thiết kế một thẻ điểm (scorecard) để đánh giá nguy cơ đái tháo đường bằng hồi quy logistic [28,29]. Thẻ điểm có thể chuyển các biến liên tục thành các phân nhóm (bin) ở tần suất bằng nhau. Các đặc trưng dùng trong thẻ điểm nguy cơ đái tháo đường là các tập con đặc trưng tối ưu thu được từ mô hình nguy cơ đái tháo đường đã đề cập trong Mục 2.3.1. Mỗi cá nhân với một mức nguy cơ đái tháo đường khác nhau có một điểm số khác nhau trên thẻ điểm; do đó, mỗi đặc trưng cần được chia thành các hộp (box). Trong nghiên cứu hiện tại, chúng tôi đã dùng trọng số bằng chứng (WoE) [30,31] để đo xác suất mắc bệnh cho mỗi hộp và dùng phân nhóm để rời rạc hóa các biến liên tục. Quá trình được thực hiện như sau:

- 1)  Các biến liên tục được chia thành 50 -100 nhóm biến phụ;
- 2)  Mỗi nhóm được đảm bảo chứa các mẫu dương tính và âm tính;
- 3)  Kiểm định Chi-square được thực hiện trên các nhóm liền kề, và hai nhóm có giá trị p lớn nhất trong kiểm định Chi-square được gộp lại cho đến khi số nhóm nhỏ hơn số hộp đã đặt;
- 4) Một đặc trưng được chia thành một số hộp đã đặt. Các thay đổi về giá trị thông tin (IV) dưới mỗi tập hộp được quan sát, và số hộp phù hợp nhất được xác định (Tài liệu bổ sung Hình S1);
- 5)  Sau khi phân nhóm, giá trị WoE của mỗi hộp được tính.

WoE và IV được tính như sau:

trong đó N là số hộp cho một đặc trưng, i đại diện cho mỗi hộp, H. Yang et al.

và HP % là tỷ lệ của các cá nhân khỏe mạnh trong hộp so với các cá nhân khỏe mạnh trong toàn bộ đặc trưng, D % là tỷ lệ của các bệnh nhân đái tháo đường trong hộp so với các bệnh nhân đái tháo đường trong toàn bộ đặc trưng. Sau khi phân nhóm đặc trưng, chúng tôi đã tính WoE của mỗi hộp và thay thế WoE bằng điểm dữ liệu chuẩn gốc S1 để đảm bảo rằng tất cả các bộ dữ liệu có thể được bao phủ bởi WoE .

Điểm số trong thẻ điểm được tính là

trong đó odds là tỷ số giữa các cá nhân khỏe mạnh và bệnh nhân đái tháo đường, và A và B là hai hằng số được xác định như sau.

Đầu tiên, hai tỷ số cụ thể có thể được đặt: odds và 2 × odds và hai điểm số tương ứng P 0 và P 0 + PDO (Point-to-Double Odds). Do đó,

trong đó P 0 và PDO là các khoảng điểm được đặt thủ công. A và B có thể được xác định dựa trên hai giá trị này. Điểm nguy cơ đái tháo đường sau đó có thể được tính theo Eq. (14).

Thứ hai, điểm cơ sở không bị ảnh hưởng bởi mỗi đặc trưng được tính bằng hệ số chặn của ln (odds). Hệ số hồi quy logistic sau đó được xét trong tính toán để xác định điểm của mỗi đặc trưng tại mỗi vị trí, như sau:

trong đó ω i ký hiệu hệ số của đặc trưng thứ i trong LR; ω 0 là hệ số chặn; và xi là giá trị của đặc trưng thứ i . Điểm của mỗi đặc trưng có thể được nhân với WoE của mỗi hộp trong đặc trưng để xác định điểm của mỗi hộp.

Cuối cùng, thẻ điểm được hiệu chỉnh để xác định tổng điểm nằm giữa 0 và 100 điểm. Thẻ điểm cuối cùng gồm điểm cơ sở và điểm của mỗi hộp trong mỗi đặc trưng.

## 2.5. Mô hình mức độ hài lòng theo dõi

Chúng tôi đã xây dựng một mô hình mức độ hài lòng theo dõi để phân tích và đánh giá mối quan hệ giữa các chỉ số theo dõi và mức độ hài lòng với việc kiểm soát tình trạng bệnh của bệnh nhân. Sáu chỉ số theo dõi -SP, DP, BMI, FBG, PS, và MA -được kết hợp với XGBoost để xây dựng mô hình. Chúng tôi cũng đánh giá ảnh hưởng của các đặc trưng này lên mức độ hài lòng theo dõi.

## 2.6. Đánh giá mô hình

Đối với mỗi mô hình, bộ phân loại được huấn luyện trên tập huấn luyện và đánh giá trên tập kiểm tra tương ứng. Các chỉ số đánh giá gồm độ chính xác (accuracy), độ chuẩn xác (precision), độ nhạy (recall), tỷ lệ dương tính giả (FPR), và F1 [32,33], được tính như sau:

trong đó TP đại diện cho các kết quả dương tính thật, mô tả số mẫu dương tính được dự đoán đúng; FP ký hiệu các kết quả dương tính giả, biểu diễn số mẫu âm tính được dự đoán là dương tính; FN chỉ các kết quả âm tính giả, biểu diễn số mẫu dương tính bị phân loại là âm tính; TN ký hiệu các kết quả âm tính thật, biểu diễn số mẫu được dự đoán đúng là âm tính.

Đường cong đặc trưng hoạt động của bộ thu nhận (ROC) thường được dùng để đo khả năng dự đoán của phương pháp hiện tại trên toàn bộ dải giá trị quyết định của thuật toán [34]. Tọa độ dọc và ngang của đường cong ROC lần lượt là tỷ lệ dương tính thật (TPR) và tỷ lệ dương tính giả (FPR). ROC có thể bộc lộ mối quan hệ giữa độ nhạy và độ đặc hiệu. Chúng tôi dùng diện tích dưới đường cong ROC, gọi là AUC, để đánh giá hiệu năng của mô hình, với AUC = 0.5 tương đương dự đoán ngẫu nhiên và AUC = 1 biểu diễn dự đoán hoàn hảo. Trên đường cong ROC, điểm gần góc trên bên trái nhất của đồ thị được xem là điểm tốt nhất để phân loại. Giá trị ngưỡng (cutoff) tương ứng là giá trị tối ưu để xây dựng mô hình cuối cùng, phản ánh sự cân bằng tốt giữa độ nhạy và độ đặc hiệu.

Kiểm định chéo (cross-validation) là một kỹ thuật thường dùng để đánh giá kết quả của phân tích thống kê. Nó có thể được dùng để đánh giá khách quan hiệu năng của các mô hình phân loại. Ba phương pháp kiểm định chéo được dùng rộng rãi là kiểm định trên tập dữ liệu độc lập, kiểm định chéo n-fold, và kiểm định chéo jackknife [35]. Trong nghiên cứu hiện tại, kiểm định chéo 5-fold và kiểm định trên tập dữ liệu độc lập đã được dùng để đánh giá hiệu năng của các mô hình khác nhau.

## 2.7. Tính khả dụng của dữ liệu

Bộ dữ liệu dùng trong nghiên cứu này được lấy từ Ủy ban Y tế Thành phố Lư Châu và đã được khử nhạy cảm (desensitized). Bộ dữ liệu này chưa được công bố. Các học giả có ý định sử dụng dữ liệu theo yêu cầu hợp lý nên liên hệ tác giả liên hệ của nghiên cứu này.

Tất cả các phân tích thống kê trong nghiên cứu này được thực hiện bằng Python 3.6. Tất cả các thuật toán được triển khai bằng thư viện học máy 'sklearn' [36].

## 3. Kết quả

## 3.1. Lựa chọn chỉ số lâm sàng

Trước tiên chúng tôi thảo luận về đóng góp của 16 đặc trưng (được mô tả trong Mục 2.2) vào việc phát hiện đái tháo đường. Nếu một mô hình được tạo ra bằng dữ liệu với 16 đặc trưng lâm sàng, các bác sĩ lâm sàng phải thu thập 16 đặc trưng này cho mỗi người được khám sức khỏe. Chúng tôi nhận thấy một số trong 16 đặc trưng cản trở ứng dụng lâm sàng. Ví dụ, các xét nghiệm lipid máu liên quan đến HDL và LDL là hai chỉ số xét nghiệm lâm sàng thường bị ảnh hưởng bởi thói quen ăn uống. Do đó, nên tránh uống rượu và chế độ ăn nhiều chất béo 3 ngày trước khi xét nghiệm. Để phát hiện đặc trưng dư thừa, trước tiên chúng tôi dùng hệ số tương quan Pearson để bộc lộ tương quan giữa bất kỳ hai đặc trưng nào; sau đó chúng tôi trình bày các tương quan bằng cách dùng một biểu đồ nhiệt (Hình 3). Như được trình bày trong hình, MSP tương quan dương với MDP, trong khi HDL tương quan âm với BMI, WHtR, và FBG. Do đó, nên dùng lựa chọn đặc trưng để loại trừ các đặc trưng dư thừa này.

Theo Mục 2.3.1, ba kỹ thuật lựa chọn đặc trưng -MI, ANOVA, và GI -được dùng để xếp hạng các đặc trưng. IFS sau đó được kết hợp với XGBoost để xác định tập con đặc trưng tối ưu. Do đó, chúng tôi đã khảo sát hiệu năng dự đoán của 48 (16 × 3) tập con đặc trưng được tạo ra bởi ba kỹ thuật lựa chọn đặc trưng, với tập con thể hiện hiệu năng dự đoán tốt nhất là tập con đặc trưng tối ưu. Kết quả chi tiết được trình bày trong Bảng 3 và Hình 4. Chúng tôi nhận thấy sáu đặc trưng tối ưu (FGB, MSP, age, WHtR, BMI, và UGLU) được tạo ra bởi GI và ANOVA có thể đạt AUC tối đa 0.8712 trong kiểm định chéo 5-fold. Đối với kỹ thuật lựa chọn đặc trưng dựa trên MI, H. Yang et al.

Hình 3. Biểu đồ nhiệt thể hiện tương quan Pearson của các đặc trưng.

Bảng 3 Lựa chọn đặc trưng bằng ba phương pháp trong chiến lược IFS.

| MI       | ANOVA   | ANOVA    | ANOVA   | GI       | GI     |
|----------|---------|----------|---------|----------|--------|
| đặc trưng | 5V_AUC  | đặc trưng | 5V_AUC  | đặc trưng | 5V_AUC |
| FBG      | 0.8042  | FBG      | 0.8042  | FBG      | 0.8042 |
| Age      | 0.8507  | MSP      | 0.8406  | MSP      | 0.8406 |
| WHtR     | 0.8628  | WHtR     | 0.8507  | Age      | 0.8628 |
| MSP      | 0.8695  | Age      | 0.8695  | WHtR     | 0.8695 |
| BMI      | 0.8707  | BMI      | 0.8707  | BMI      | 0.8707 |
| MDP      | 0.8702  | UGLU     | 0.8712  | UGLU     | 0.8712 |
| UGLU     | 0.8707  | MDP      | 0.8707  | MDP      | 0.8707 |
| TG       | 0.8705  | TG       | 0.8705  | HDL      | 0.8703 |
| HDL      | 0.8700  | TC       | 0.8700  | TG       | 0.8697 |
| BUN      | 0.8696  | HDL      | 0.8694  | BUN      | 0.8696 |
| TC       | 0.8690  | BUN      | 0.8690  | TC       | 0.8690 |
| Breath   | 0.8688  | LDL      | 0.8683  | LDL      | 0.8683 |
| SC       | 0.8678  | SC       | 0.8680  | SC       | 0.8680 |
| LDL      | 0.8673  | SPD      | 0.8673  | SPD      | 0.8673 |
| DPD      | 0.8667  | Breath   | 0.8664  | Breath   | 0.8664 |
| SPD      | 0.8664  | DPD      | 0.8664  | DPD      | 0.8664 |

Hình 4. Kết quả IFS cho ba kỹ thuật lựa chọn đặc trưng dùng XGBoost.

AUC tối đa là 0.8708 hơi thấp hơn các giá trị đạt được khi dùng GI và ANOVA. Hơn nữa, cả GI và ANOVA chỉ cần sáu đặc trưng để xác định dự đoán tốt nhất. Bất kể kỹ thuật lựa chọn đặc trưng nào được dùng, tập con đặc trưng tối ưu luôn chứa sáu đặc trưng (FBG, MSP, age, WHtR, BMI, và UGLU), cho thấy tầm quan trọng của các đặc trưng này trong chẩn đoán đái tháo đường. Việc thêm nhiều đặc trưng hơn vào các tập con đặc trưng tối ưu không thể cải thiện hiệu năng của các mô hình dự đoán và thậm chí làm giảm AUC, gợi ý rằng các đặc trưng này là thông tin dư thừa hoặc nhiễu.

Để thể hiện ảnh hưởng của các đặc trưng lên hiệu năng của mô hình, chúng tôi đã vẽ GI và AUC của mỗi đặc trưng, cũng như đường cong IFS (Hình 5). Tính diễn giải được và tính dễ hiểu của mô hình nhờ đó được tăng cường.

## 3.2. Đánh giá nguy cơ đái tháo đường

Sử dụng sáu đặc trưng tối ưu trên dữ liệu kiểm tra độc lập, chúng tôi đã so sánh hiệu năng của ba bộ phân loại khác nhau (RF, XGBoost và LR). Năm chỉ số đánh giá (AUC, accuracy, precision, recall, và F1) của ba mô hình đã được tính. Như được trình bày trong Bảng 4 và Hình 6, mô hình dựa trên XGBoost với tập con đặc trưng tối ưu có thể đạt AUC tối đa 0.8763. Do đó, XGBoost được chọn làm thuật toán cuối cùng để xây dựng mô hình đánh giá nguy cơ đái tháo đường. Trong các ứng dụng thực tế, ngưỡng ROC phải được điều chỉnh tùy theo mục đích của mô hình. Khi mục tiêu là nhận diện nhiều bệnh nhân đái tháo đường hơn, nhiều cá nhân bình thường cũng có thể bị chẩn đoán sai. Do đó, ngưỡng ROC nên được đặt thiên về độ nhạy (recall) cao. Nếu chúng ta nhắm tới nhận diện chính xác bệnh nhân đái tháo đường, một số bệnh nhân có thể bị đánh giá nhầm là bình thường. Do đó, ngưỡng ROC cần được điều chỉnh thiên về FDR cao. Để cân bằng giữa hai trường hợp, chúng tôi đã chọn điểm gần góc trên bên trái nhất của đồ thị làm ngưỡng tối ưu.

## 3.3. Thẻ điểm nguy cơ đái tháo đường

Một thẻ điểm nguy cơ đái tháo đường có thể được dùng để đánh giá nguy cơ đái tháo đường bằng cách tính điểm số cá nhân. Để tạo một thẻ điểm, mỗi đặc trưng được chia thành các hộp, và các giá trị WOE cho mỗi hộp được tính. Bằng cách ánh xạ các giá trị WOE trở lại dữ liệu chuẩn S1 và dùng hồi quy logistic để xây dựng mô hình, một thẻ điểm được thiết lập. Trong nghiên cứu, chúng tôi đặt điểm số nằm giữa 0 và 100. Do đó, trong thiết kế thẻ điểm, chúng tôi đã gán hai giá trị giả định P0 và PDO lần lượt là 81.3 và 4.5. Theo các Eq. (15 -18), A và B được tính lần lượt là 66.3 và 6.5. Điểm số của sáu đặc trưng lâm sàng được xác định bằng Eq. (14). Kết quả được liệt kê trong

Hình 5. Đồ thị thể hiện (A) lựa chọn đặc trưng dùng Gini, (B) giá trị Gini và (C) AUC cho mỗi đặc trưng.

Bảng 4 Các chỉ số hiệu năng của các mô hình học máy.

| Thuật toán — Mô hình đánh giá nguy cơ đái tháo đường | Độ đặc hiệu   | Độ nhạy  | Độ chính xác | Độ chuẩn xác | F1     | Test_AUC   | 5V_AUC   |
|--------------------------------------------|---------------|----------|------------|-------------|--------|------------|----------|
| LR                                         | 0.8361        | 0.7342   | 0.8007     | 0.6216      | 0.6765 | 0.8650     | 0.8614   |
| XGBoost                                    | 0.8473        | 0.7383   | 0.7274     | 0.5097      | 0.6397 | 0.8763     | 0.8713   |
| Random Forest                              | 0.8347        | 0.7534   | 0.8059     | 0.6289      | 0.6856 | 0.8740     | 0.8687   |
| Thuật toán — Thẻ điểm nguy cơ đái tháo đường | Độ đặc hiệu   | Độ nhạy  | Độ chính xác | Độ chuẩn xác | F1     | Test_AUC   | 5V_AUC   |
| LR                                         | 0.8609        | 0.7147   | 0.704      | 0.4868      | 0.6226 | 0.8681     | 0.8695   |
| Thuật toán — Mô hình dựa trên hồ sơ theo dõi | Độ đặc hiệu   | Độ nhạy  | Độ chính xác | Độ chuẩn xác | F1     | Test_AUC   | 5V_AUC   |
| XGBoost(Contain FGB)                       | 0.9425        | 0.8831   | 0.9455     | 0.6812      | 0.7671 | 0.9632     | 0.945    |
| XGBoost(Remove FGB)                        | 0.7655        | 0.6848   | 0.7745     | 0.2637      | 0.3766 | 0.7876     | 0.7742   |

Hình 6. Các đường cong ROC của Mô hình đánh giá nguy cơ đái tháo đường dùng RF, XGBoost và LR.

Bảng 5 Thẻ điểm nguy cơ đái tháo đường.

| Base_score:62   | Base_score:62   |       |         |                              |         |
|-----------------|-----------------|-------|---------|------------------------------|---------|
| Đặc trưng       | Ngưỡng          | Điểm  | Đặc trưng | Ngưỡng                     | Điểm    |
| FGB             | (-inf, 5.8]     | 6.3   | WHtR    | (-inf, 0.493] (0.493, 0.531] | 4.7 0.8 |
|                 | (5.8, 6.8]      | 0.5   |         |                              |         |
|                 | (6.8, 7.5]      | 7     |         | (0.531, 0.569]               | 1.8     |
|                 | (7.5, 8.8]      | 12.6  |         | (0.569, 0.627]               | 4.3     |
|                 | (8.8, inf]      | 20.9  |         | (0.627, inf]                 | 7.5     |
| Đặc trưng       | Ngưỡng          | Điểm  | Đặc trưng | Ngưỡng                     | Điểm    |
| Age             | (-inf, 38.0]    | 17.7  | MSP     | (-inf, 111.0]                | 5.4     |
|                 | (38.0, 48.0]    | 7.8   |         | (111.0, 123.0]               | 3       |
|                 | (48.0, 53.0]    | 3.4   |         | (123.0, 137.0]               | 0.1     |
|                 | (53.0, 63.0]    | 0.7   |         | (137.0, 143.0]               | 3.7     |
|                 | (63.0, inf]     | 2.7   |         | (143.0, inf]                 | 6.8     |
| Đặc trưng       | Ngưỡng          | Điểm  | Đặc trưng | Ngưỡng                     | Điểm    |
| BMI             | (-inf, 21.4]    | 3.6   | UGLU    | (-inf, 0.0]                  | 0.5     |
|                 | (21.4, 24.34]   | 0.7   |         | (0.0, 1.0]                   | 7.6     |
|                 | (24.34, 26.84]  | 2     |         | (1.0, 2.0]                   | 13.6    |
|                 | (26.84, inf]    | 4.5   |         | (2.0, inf]                   | 19.7    |

## Bảng 5.

Để đặt khoảng nguy cơ, đường cong Kolmogorov -Smirnov (KS) (Hình 7) được dùng để mô tả tổng điểm. Giá trị KS càng lớn thì khả năng phân đoạn của ngưỡng tương ứng cho mô hình càng cao. Như được trình bày trong Hình 7, điểm uốn cực đại đạt được khi điểm số là 60. Do đó, chúng tôi đặt 60 làm ngưỡng. Đối với bất kỳ cá nhân nào được kiểm tra, điểm số càng thấp thì nguy cơ đái tháo đường càng lớn; ngược lại, điểm số càng cao thì nguy cơ đái tháo đường càng thấp. Để cung cấp cho người dùng hiệu ứng chấm điểm trực tiếp hơn, chúng tôi đặt bốn điểm uốn chấm điểm -20, 40, 60, và 80 -theo biểu đồ KS. Do đó, tổng điểm có thể được chia thành năm khoảng, tương ứng với các mức nguy cơ cao, tương đối cao, trung bình, tương đối thấp, và thấp (Bảng 6).

Hình 7. Đường cong KS cho Thẻ điểm nguy cơ đái tháo đường.

Bảng 6 Ngưỡng của Nhóm nguy cơ trong Thẻ điểm nguy cơ đái tháo đường.

|   Score_start |   Score_end |   Tỷ lệ khỏe mạnh |   Tỷ lệ đái tháo đường |   KS_value | Nhóm nguy cơ |
|---------------|-------------|------------------------|--------------------------|------------|--------------|
|             0 |          20 |                 0.0002 |                   0.0275 |     0.0272 | very high    |
|            20 |          40 |                 0.0084 |                   0.2822 |     0.2738 | high         |
|            40 |          60 |                 0.1551 |                   0.7117 |     0.5567 | normal       |
|            60 |          80 |                 0.8035 |                   0.9895 |     0.1859 | low          |
|            80 |         100 |                      1 |                        1 |          0 | very low     |

Để đánh giá hiệu năng của thẻ điểm, chúng tôi đã vẽ đường cong ROC của thẻ điểm trong Hình 8, với giá trị AUC là 0.8671. So với mô hình đánh giá nguy cơ đái tháo đường, thẻ điểm cho thấy mức tổn thất hiệu năng khá nhỏ, gợi ý rằng phương pháp thiết lập thẻ điểm nguy cơ đái tháo đường là hợp lý.

Hình 8. Đường cong ROC của Thẻ điểm nguy cơ đái tháo đường.

Cuối cùng, chúng tôi trình bày phương pháp dùng thẻ điểm để xác định điểm của những người được khám sức khỏe. Theo Bảng 5, sáu chỉ số xét nghiệm lâm sàng của mỗi người được gán để thu được các điểm khoảng cho sáu đặc trưng lâm sàng. Tổng điểm sau đó được thu được bằng cách cộng các điểm khoảng này với các điểm cơ sở. Sức khỏe của các cá nhân có nguy cơ mắc đái tháo đường có thể được đánh giá dựa trên tổng điểm. Bảng 6 trình bày nguy cơ bệnh tật của các bệnh nhân, điểm số càng cao thì cá nhân càng khỏe mạnh. Điểm số = 60 được xem là trung vị, và nguy cơ tăng gấp đôi cho mỗi 10 điểm giảm trong điểm số.

## 3.4. Đánh giá mô hình mức độ hài lòng theo dõi

Chúng tôi đã thiết lập một mô hình hồ sơ theo dõi để quan sát ảnh hưởng của các đặc trưng theo dõi lên khả năng kiểm soát tình trạng bệnh của bệnh nhân.

Mô hình dựa trên XGBoost được xây dựng dựa trên sáu chỉ số theo dõi (FBG, SP, DP, MS, PS, và BMI). Như được trình bày trong Hình 9(a), AUC đạt 96%. Các đặc trưng, được xếp hạng bằng GI, được liệt kê trong Hình 9(b). FBG có ảnh hưởng lớn nhất đến mức độ hài lòng của bệnh nhân về kiểm soát bệnh. Bệnh nhân có FBG cao gặp khó khăn đáng kể trong việc kiểm soát tình trạng của họ, điều này nhất quán với các quan sát khác. Các phát hiện của chúng tôi cũng cho thấy tầm quan trọng của chẩn đoán sớm đái tháo đường. Chúng tôi đã xây dựng một mô hình mới với XGBoost sau khi loại bỏ chỉ số FBG. Hình 9(c) cho thấy AUC của mô hình giảm xuống 77%. Bằng cách sắp xếp lại các đặc trưng còn lại được trình bày trong Hình 9(d), chúng tôi đã xác định trạng thái tuân thủ dùng thuốc là yếu tố quan trọng nhất để kiểm soát đái tháo đường, gợi ý rằng bệnh nhân đái tháo đường nên dùng thuốc một cách hợp lý và đúng giờ.

## 3.5. So sánh với các mô hình hiện có

Để đánh giá thêm hiệu năng của hệ thống của chúng tôi, chúng tôi đã so sánh mô hình đề xuất với các phương pháp hiện đại nhất (state-of-the-art) [10,11]. Kết quả được liệt kê trong Bảng 7. Gao và cộng sự [10] đã xét tuổi, giới tính, vòng eo, huyết áp tâm thu, và tiền sử gia đình mắc đái tháo đường làm đặc trưng và đạt AUC = 0.635 bằng hồi quy logistic. Zhou và cộng sự [11] đã cải thiện AUC lên 0.748 bằng cách dùng hồi quy logistic đa biến làm bộ phân loại, dựa trên một số lượng đặc trưng lớn hơn (tuổi, giới tính, BMI, vòng eo, huyết áp tâm thu, và tiền sử gia đình dương tính mắc đái tháo đường). Mô hình đề xuất của chúng tôi thể hiện tính ưu việt cho nghiên cứu đái tháo đường.

Bảng 7 So sánh với các mô hình hiện có.

| Tác giả     | đặc trưng                                                                       |   AUC |
|-------------|---------------------------------------------------------------------------------|-------|
| Gao et al.  | Age, Gender, Waist circumference, SBP and Family history of diabetes            | 0.635 |
| Zhou et al. | Age, Gender, BMI, Waist circumference, SBP, Positive family history of diabetes | 0.748 |
| Nghiên cứu này | BMI, FGB, Age, WHtR, MSP, UGLU                                                | 0.881 |

Chúng tôi đã dùng XGBoost làm bộ phân loại cơ sở để xây dựng các mô hình đánh giá nguy cơ đái tháo đường và các mô hình mức độ hài lòng theo dõi. Một lý do là XGBoost hoạt động hiệu quả đối với các chỉ số đánh giá khác nhau. Một lý do quan trọng khác là thuật toán học máy có thể thiết lập mối quan hệ giữa các đặc trưng và đóng góp của mô hình thông qua GI. Đối với các bài toán y khoa, các đặc trưng cần được quan sát bằng các mô hình. Mối quan hệ giữa mô hình và các đặc trưng cần được khám phá để làm sáng tỏ quá trình ra quyết định của các mô hình. Bằng cách khám phá mối quan hệ giữa mô hình và các đặc trưng, các chỉ số lâm sàng then chốt có thể được xác định để cung cấp cho các bác sĩ lâm sàng một cơ sở cho việc phát triển các chiến lược điều trị.

## 4. Bàn luận

Các kết quả lựa chọn đặc trưng (Hình 5) dễ dàng xác định FBG là đặc trưng quan trọng nhất trong đánh giá nguy cơ đái tháo đường. Chúng tôi đã đánh giá hiệu năng của FBG để nhận diện đái tháo đường và tính được AUC là 0.8307 (Bảng 1) -tức là thấp hơn so với mô hình được xây dựng dựa trên sáu đặc trưng hợp nhất. Chúng tôi tiếp tục phân tích thống kê phân bố của sáu đặc trưng tối ưu để trình bày chi tiết các khác biệt giữa bệnh nhân đái tháo đường và các cá nhân khỏe mạnh (Hình 10). Ngoài chỉ số FBG, năm chỉ số khác cũng thể hiện các khác biệt thống kê và đóng góp vào dự đoán nguy cơ đái tháo đường. Việc hợp nhất các đặc trưng khác nhau có thể cải thiện độ bền vững, độ tin cậy và độ chính xác của mô hình đề xuất cho chẩn đoán đái tháo đường. Trên thực tế, sáu đặc trưng này đã được chứng minh có liên quan chặt chẽ với đái tháo đường trong nghiên cứu liên quan đến đái tháo đường [37,38], với tuổi là một trong những yếu tố nguy cơ quan trọng nhất [1]. Nguy cơ đái tháo đường tăng theo tuổi, điều này nhất quán với các nghiên cứu đã công bố [39]. Do đó, sau tuổi 40, mọi người nên khám sức khỏe định kỳ hằng năm. WHtR và BMI là hai chỉ số H. Yang et al.

Hình 9. Đường cong ROC và tầm quan trọng đặc trưng của mô hình mức độ hài lòng theo dõi.

Hình 10. Phân tích thống kê cho sáu đặc trưng tối ưu ở người khỏe mạnh (màu Xanh) và bệnh nhân đái tháo đường (màu Vàng). (Để diễn giải các tham chiếu về màu sắc trong chú thích hình này, người đọc tham khảo phiên bản web của bài báo.)

liên quan đến lối sống. Nguy cơ đái tháo đường có thể được giảm bằng cách quản lý cấu trúc ăn uống (như kiểm soát lượng protein, chất béo, và đường nạp vào) và thói quen tập thể dục [40].

Trong các giai đoạn đầu của bệnh hoặc trước khi phát hiện đái tháo đường, một người ít có khả năng chủ động đến bệnh viện để khám tập trung vào đái tháo đường. Cách tiếp cận tốt nhất để sàng lọc đái tháo đường quy mô lớn vẫn chưa được xác định. Trong nghiên cứu này, chúng tôi đã thiết lập một mô hình dựa trên học máy với một lượng lớn dữ liệu khám sức khỏe. Nhờ độ bao phủ tương đối rộng của khám sức khỏe, mô hình phù hợp cho sàng lọc đái tháo đường sớm quy mô lớn. Mô hình đánh giá nguy cơ đái tháo đường của chúng tôi có thể được áp dụng trực tiếp vào cơ sở dữ liệu khám sức khỏe để tạo thuận lợi cho việc nhận diện quy mô lớn các hồ sơ đái tháo đường nguy cơ cao trong hệ thống, hiểu tỷ lệ nguy cơ đái tháo đường tiềm ẩn ở cấp độ y tế công cộng, và tiếp tục thúc đẩy các chiến lược phòng ngừa và kiểm soát đái tháo đường. Việc xây dựng một thẻ điểm đánh giá nguy cơ đái tháo đường tạo thuận lợi cho các bác sĩ lâm sàng và các cá nhân tự kiểm tra, tiếp tục tăng tỷ lệ sàng lọc theo bậc thang đái tháo đường, và cải thiện việc quản lý lối sống cá nhân. Do đó, việc dùng dữ liệu khám sức khỏe quy mô lớn để đạt được cảnh báo nguy cơ sớm và sàng lọc đái tháo đường là có ý nghĩa quan trọng cho việc kiểm soát sớm đái tháo đường.

Việc áp dụng mô hình đánh giá nguy cơ đái tháo đường không chỉ phù hợp cho y tế công cộng mà còn thuận tiện cho việc cấy ghép các thiết bị đeo hoặc các hệ thống nhà thông minh IOT. Bằng cách tích hợp các chỉ số được thu thập bởi nhiều thiết bị gia đình khác nhau, mô hình có thể cung cấp cảnh báo sớm và giám sát liên tục nguy cơ của từng cá nhân.

## 5. Tóm tắt

Trong nghiên cứu này, chúng tôi đã thiết kế một hệ thống đánh giá nguy cơ đái tháo đường dựa trên dữ liệu khám sức khỏe được lấy từ EMR của Ủy ban Y tế Thành phố Lư Châu tại Trung Quốc. Hệ thống này bao gồm ba mô-đun: mô hình đánh giá nguy cơ đái tháo đường, thẻ điểm nguy cơ đái tháo đường, và mô hình mức độ hài lòng theo dõi. Ba loại chỉ số -nhân khẩu học, dấu hiệu sinh tồn, và giá trị xét nghiệm -được đưa vào XGBoost để xây dựng mô hình đánh giá nguy cơ đái tháo đường. Hồi quy logistic được giới thiệu để thiết lập một thẻ điểm nguy cơ đái tháo đường, nhờ đó cải thiện tính áp dụng được của mô hình trong các bối cảnh lâm sàng và đời thực. Mô hình mức độ hài lòng theo dõi cuối cùng được xây dựng để xác định các yếu tố then chốt ảnh hưởng đến khả năng kiểm soát tình trạng sức khỏe của bệnh nhân. Chúng tôi cũng đã cung cấp một công cụ chấm điểm nguy cơ đái tháo đường trực tuyến, có thể truy cập miễn phí qua http://lin-group.cn/server/DRSC/index.html. Công cụ có thể tính nguy cơ đái tháo đường dựa trên sáu chỉ số được gửi trực tuyến. Kết quả có thể được dùng để thúc đẩy quản lý sức khỏe cá nhân. Trong nghiên cứu tương lai, chúng tôi nhắm tới tập trung vào tiến bộ của các thuật toán trong các lĩnh vực liên quan và áp dụng các thuật toán mới và hiệu quả hơn [41,42], như mạng nơ-ron sâu [43], để giải quyết các vấn đề hiện tại. Chúng tôi dự định thu thập thêm dữ liệu, như dữ liệu lối sống và dữ liệu hình ảnh, cải thiện chất lượng thu thập dữ liệu, cập nhật hệ thống và xây dựng các mô hình đáng tin cậy hơn.

## Tuyên bố đóng góp tác giả theo CRediT

Hui Yang: Ý tưởng, Phương pháp luận, Phần mềm, Kiểm chứng, Trực quan hóa, Phân tích hình thức, Viết -bản thảo gốc, Viết -rà soát & biên tập. Yamei Luo: Nguồn lực, Quản lý dữ liệu. Xiaolei Ren: Nguồn lực, Quản lý dữ liệu. Ming Wu: Nguồn lực, Quản lý dữ liệu. Xiaolin He: Nguồn lực, Quản lý dữ liệu. Bowen Peng: Nguồn lực, Quản lý dữ liệu. Kejun Deng: Phân tích hình thức. Dan Yan: Phân tích hình thức. Hua Tang: Ý tưởng, Viết -rà soát & biên tập. Hao Lin: Ý tưởng, Phương pháp luận, Phần mềm, Kiểm chứng, Trực quan hóa, Viết -bản thảo gốc, Viết -rà soát & biên tập, Giám sát.

## Tuyên bố về xung đột lợi ích

Các tác giả tuyên bố rằng họ không có xung đột lợi ích.

## Lời cảm ơn

Công trình này được tài trợ bởi Quỹ Khoa học Tự nhiên Quốc gia Trung Quốc (National Nature Scientific Foundation of China) (61772119, 61702430), Quỹ Khoa học Tỉnh Tứ Xuyên dành cho Học giả Trẻ Xuất sắc (Sichuan Provincial Science Fund for Distinguished Young Scholars) (2020JDJQ0012).

## Tài liệu tham khảo

- [1] R.L. Thomas, S. Halim, S. Gurudas, S. Sivaprasad, D.R. Owens, IDF Diabetes Atlas: a review of studies utilising retinal photography on the global prevalence of diabetes related retinopathy between 2015 and 2018, Diabetes Res. Clin. Pract. 157 (2019), 107840.
- [2] U. Alam, O. Asghar, S. Azmi, R.A. Malik, General aspects of diabetes mellitus, Handb. Clin. Neurol. 126 (2014) 211 -222.
- [3] K.A. Adeshara, A.G. Diwan, R.S. Tupe, Diabetes and Complications: cellular Signaling Pathways, Current Understanding and Targeted Therapies, Curr. Drug Targets 17 (2016) 1309 -1328.
- [4] I. Kavakiotis, O. Tsave, A. Salifoglou, N. Maglaveras, I. Vlahavas, I. Chouvarda, Machine Learning and Data Mining Methods in Diabetes Research, Comput. Struct. Biotechnol. J. 15 (2017) 104 -116.
- [5] A. Hussain, B. Bhowmik, N.C. do Vale Moreira, COVID-19 and diabetes: knowledge in progress, Diabetes Res. Clin. Pract. 162 (2020), 108142.
- [6] G.P. Fadini, M.L. Morieri, E. Longato, A. Avogaro, Prevalence and impact of diabetes among people infected with SARS-CoV-2, J. Endocrinol. Invest. 43 (2020) 867 -869.
- [7] C. Cristelo, C. Azevedo, J.M. Marques, R. Nunes, B. Sarmento, SARS-CoV-2 and diabetes: new challenges for the disease, Diabetes Res. Clin. Pract. 164 (2020), 108228.
- [8] W. Bao, F.B. Hu, S. Rong, Y. Rong, K. Bowers, E.F. Schisterman, L. Liu, C. Zhang, Predicting risk of type 2 diabetes mellitus with genetic risk models on the basis of established genome-wide association markers: a systematic review, Am. J. Epidemiol. 178 (2013) 1197 -1207.
- [9] M. Imamura, D. Shigemizu, T. Tsunoda, M. Iwata, H. Maegawa, H. Watada, H. Hirose, Y. Tanaka, K. Tobe, K. Kaku, A. Kashiwagi, R. Kawamori, S. Maeda, Assessing the clinical utility of a genetic risk score constructed using 49 susceptibility alleles for type 2 diabetes in a Japanese population, J. Clin. Endocrinol. Metab. 98 (2013) E1667 -E1673.
- [10] X. Zhou, Q. Qiao, L. Ji, F. Ning, W. Yang, J. Weng, Z. Shan, H. Tian, Q. Ji, L. Lin, Q. Li, J. Xiao, W. Gao, Z. Pang, J. Sun, Nonlaboratory-based risk assessment algorithm for undiagnosed type 2 diabetes developed on a nation-wide diabetes survey, Diabetes Care. 36 (2013) 3944 -3952.
- [11] W.G. Gao, Y.H. Dong, Z.C. Pang, H.R. Nan, S.J. Wang, J. Ren, L. Zhang, J. Tuomilehto, Q. Qiao, A simple Chinese risk score for undiagnosed diabetes, Diabetic medicine: a journal of the British Diabetic Association 27 (2010) 274 -281.
- [12] A.U. Haq, J.P. Li, J. Khan, M.H. Memon, S. Nazir, S. Ahmad, G.A. Khan, A. Ali, Intelligent Machine Learning Approach for Effective Recognition of Diabetes in EHealthcare Using Clinical Data, Sensors 20 (9) (2020) 2649.
- [13] H.F. Germany, Diabetes Data Set., in, Available online: https://www.kaggle.com/j ohndasilva/diabetes, (accessed on 15 September 2019).
- [14] Q. Zou, K. Qu, Y. Luo, D. Yin, Y. Ju, H. Tang, Predicting Diabetes Mellitus With Machine Learning Techniques, Front. Genet. 9 (2018) 515.
- [15] A. Bonacaro, I. Rubbi, D. Sookhoo, The use of wearable devices in preventing hospital readmission and in improving the quality of life of chronic patients in the homecare Setting: a Narrative Literature Review, Prof. Inferm. 72 (2019) 143 -151.

- [16] Y. Zhang, R. Gravina, H.M. Lu, M. Villari, G. Fortino, PEA: parallel electrocardiogram-based authentication for smart healthcare systems, J. Netw. Comput. Appl. 117 (2018) 10 -16.
- [17] Y. Zhang, GroRec: a Group-Centric Intelligent Recommender System Integrating Social, Mobile and Big Data Technologies, IEEE T Serv. Comput. 9 (2016) 786 -795.
- [18] M. Zitnik, F. Nguyen, B. Wang, J. Leskovec, A. Goldenberg, M.M. Hoffman, Machine Learning for Integrating Data in Biology and Medicine: principles, Practice, and Opportunities, Inf. Fusion 50 (2019) 71 -91.
- [19] A. American Diabetes, Classification and diagnosis of diabetes, Diabetes Care. 38 (Suppl(2)) (2015) S8 -S16.
- [20] C.A. Emdin, K. Rahimi, B. Neal, T. Callender, V. Perkovic, A. Patel, Blood pressure lowering in type 2 diabetes: a systematic review and meta-analysis, JAMA 313 (2015) 603 -615.
- [21] K. Radholm, J. Chalmers, T. Ohkuma, S. Peters, N. Poulter, P. Hamet, S. Harrap, M. Woodward, Use of the waist-to-height ratio to predict cardiovascular risk in patients with diabetes: results from the ADVANCE-ON study, Diabetes Obes. Metab. 20 (2018) 1903 -1910.
- [22] Y. Liao, M.S. Leeson, Q. Cai, Q. Ai, Q. Liu, Mutual-Information-Based Incremental Relaying Communications for Wireless Biomedical Implant Systems, Sensors 18 (2) (2018) 515.
- [23] J.N. Rouder, C.R. Engelhardt, S. McCabe, R.D. Morey, Model comparison in ANOVA, Psychon. Bull. Rev. 23 (2016) 1779 -1786.
- [24] T.Q. Chen, C. Guestrin, XGBoost: a Scalable Tree Boosting System, in: Kdd ' 16: Proceedings Of the 22nd Acm Sigkdd International Conference on Knowledge Discovery And Data Mining, 2016, pp. 785 -794.
- [25] Z.Y. Zhang, Y.H. Yang, H. Ding, D. Wang, W. Chen, H. Lin, Design powerful predictor for mRNA subcellular location prediction in Homo sapiens, Brief. Bioinformatics 22 (1) (2021) 526 -535.
- [26] J.W. Tukey, Dyadic anova, an analysis of variance for vectors, Hum. Biol. 21 (1949) 65 -110.
- [27] V. Svetnik, A. Liaw, C. Tong, J.C. Culberson, R.P. Sheridan, B.P. Feuston, Random forest: a classification and regression tool for compound classification and QSAR modeling, J. Chem. Inf. Comput. Sci. 43 (2003) 1947 -1958.
- [28] S. Israel, A. Caspi, D.W. Belsky, H. Harrington, S. Hogan, R. Houts, S. Ramrakha, S. Sanders, R. Poulton, T.E. Moffitt, Credit scores, cardiovascular disease risk, and human capital, Proc. Natl. Acad. Sci. U.S.A. 111 (2014) 17087 -17092.
- [29] L.T. Dean, E.A. Knapp, S. Snguon, Y. Ransome, D.M. Qato, K. Visvanathan, Consumer credit, chronic disease and risk behaviours, J. Epidemiol. Community Health 73 (2019) 73 -78.
- [30] D.J. Kirkland, M. Aardema, N. Banduhn, P. Carmichael, R. Fautz, J.R. Meunier, S. Pfuhler, In vitro approaches to develop weight of evidence (WoE) and mode of action (MoA) discussions with positive in vitro genotoxicity results, Mutagenesis 22 (2007) 161 -175.
- [31] A.T. Hall, S.E. Belanger, P.D. Guiney, M. Galay-Burgos, G. Maack, W. Stubblefield, O. Martin, New approach to weight-of-evidence assessment of ecotoxicological

effects in regulatory decision-making, Integr. Environ. Assess Manag. 13 (2017) 573 -579.

- [32] H. Tang, R.Z. Cao, W. Wang, T.S. Liu, L.M. Wang, C.M. He, A two-step discriminated method to identify thermophilic proteins, Int. J. Biomath. 10 (2017) 1750050.
- [33] S. Basith, B. Manavalan, T.H. Shin, G. Lee, iGHBP: computational identification of growth hormone binding proteins from sequences using extremely randomised tree, Comput. Struct. Biotechnol. J. 16 (2018) 412 -420.
- [34] H. Ma, A.I. Bandos, D. Gur, On the use of partial area under the ROC curve for comparison of two diagnostic tests, Biom. J. 57 (2015) 304 -320.
- [35] J.X. Tan, H. Lv, F. Wang, F.Y. Dao, W. Chen, H. Ding, A Survey for Predicting Enzyme Family Classes Using Machine Learning Methods, Curr. Drug Targets 20 (2019) 540 -550.
- [36] A. Swami, R. Jain, Scikit-learn: machine Learning in Python, J. Machine Learn. Res. 12 (2013) 2825 -2830.
- [37] Y. Tian, C. Jiang, M. Wang, R. Cai, Y. Zhang, Z. He, H. Wang, D. Wu, F. Wang, X. Liu, Z. He, P. An, M. Wang, Q. Tang, Y. Yang, J. Zhao, S. Lv, W. Zhou, B. Yu, J. Lan, X. Yang, L. Zhang, H. Tian, Z. Gu, Y. Song, T. Huang, L.R. McNaughton, BMI, leisure-time physical activity, and physical fitness in adults in China: results from a series of national surveys, 2000-14, Lancet Diabetes Endocrinol. 4 (2016) 487 -497.
- [38] J.A. Nazare, J.D. Smith, A.L. Borel, S.M. Haffner, B. Balkau, R. Ross, C. Massien, N. Almeras, J.P. Despres, Ethnic influences on the relations between abdominal subcutaneous and visceral adiposity, liver fat, and cardiometabolic risk profile: the International Study of Prediction of Intra-Abdominal Adiposity and Its Relationship With Cardiometabolic Risk/Intra-Abdominal Adiposity, Am. J. Clin. Nutr. 96 (2012) 714 -726.
- [39] S. Zoungas, M. Woodward, Q. Li, M.E. Cooper, P. Hamet, S. Harrap, S. Heller, M. Marre, A. Patel, N. Poulter, B. Williams, J. Chalmers, A.C. group, Impact of age, age at diagnosis and duration of diabetes on the risk of macrovascular and microvascular complications and death in type 2 diabetes, Diabetologia 57 (2014) 2465 -2474.
- [40] H.C. Looker, W.C. Knowler, R.L. Hanson, Changes in BMI and weight before and after the development of type 2 diabetes, Diabetes Care. 24 (2001) 1917 -1922.
- [41] S. Basith, B. Manavalan, T. Hwan Shin, G. Lee, Machine intelligence in peptide therapeutics: a next-generation tool for rapid disease screening, Med. Res. Rev. 40 (4) (2020) 1276 -1314, https://doi.org/10.1002/med.21658.
- [42] W. Shoombuatong, N. Schaduangrat, R. Pratiwi, C. Nantasenamat, THPep: a machine learning-based approach for predicting tumor homing peptides, Comput. Biol. Chem. 80 (2019) 441 -451.
- [43] N. Stephenson, E. Shane, J. Chase, J. Rowland, D. Ries, N. Justice, J. Zhang, L. Chan, R. Cao, Survey of Machine Learning Techniques in Drug Discovery, Curr. Drug Metab. 20 (2019) 185 -193.
