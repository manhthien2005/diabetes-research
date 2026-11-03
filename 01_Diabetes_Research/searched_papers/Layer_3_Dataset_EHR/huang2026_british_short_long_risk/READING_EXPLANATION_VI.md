# Đọc Huang 2026: từ hồ sơ ban đầu đến nguy cơ T2D trong tương lai

**Paper:** `huang2026_british_short_long_risk` — *Improving Short- and Long-Term Type 2 Diabetes Risk Prediction for Middle-Aged British Adults*. Tác giả: Cunrong Huang, Andre Lopes, Annie Britton. Tài liệu hướng dẫn học, cập nhật 03/11/2026; không phải protocol hay quyết định chọn đề tài cuối cùng.

Mở [PDF gốc](source.pdf) bên cạnh tài liệu này. “PDF 2 / 10575” nghĩa là trang thứ 2 trong tệp, mang số trang tạp chí 10575. Có thể tìm chữ trong [bản trích xuất](extracted.md), đối chiếu [phụ lục văn bản/bảng](supplementary.extracted.md), và xem [phân tích khoa học](analysis.html). Các số liệu dưới đây đã đối chiếu PDF hoặc bảng phụ lục; ví dụ tự tạo được đánh dấu riêng. Chưa xem đầy đủ mọi hình nhúng trong [DOCX phụ lục](supplementary.docx); bản trích xuất không chép nội dung hình thành dữ liệu.

## 1. Đọc để hiểu câu hỏi trước

Bài hỏi: với người **chưa có diabetes ở ban đầu**, thông tin sức khỏe hiện có giúp ước tính nguy cơ được xác định T2D trong **5, 10 và 15 năm** thế nào? Đây là prognosis, khác việc phân loại “đang có bệnh hay không” ở một lần khám. Đầu ra gồm xác suất theo thời gian, điểm số liên tục, bốn nhóm nguy cơ tương đối và nomogram để đọc điểm bằng hình. Bài không dự đoán chính xác ngày khởi phát sinh học của từng người. *(Abstract: PDF 1 / 10574; mục 2.2–2.4: PDF 2 / 10575.)*

Đọc theo thứ tự: Hình 1 → mục 2.3–2.5 → Bảng 2 → mục 3.3 và Hình 2 → mục 4.3. Đừng bắt đầu bằng cách chép công thức điểm số: phải biết mô hình học từ ai và đang dự báo điều gì.

## 2. Hình 1: “dataset” thực ra hình thành qua nhiều cửa

Whitehall II (WHII) cung cấp dữ liệu phát triển; **Phase 3, 1991–1994** là baseline, theo dõi đến **Phase 9, 2007–2009**. `t0` là ngày khảo sát Phase 3 của từng người, không phải một ngày chung cho cả cohort. Trong [Hình 1](figures/figure_01.webp), đọc từ trên xuống:

| Bước | Số người và ý nghĩa |
|---|---|
| Có mặt ở Phase 3 | 8.815 |
| Loại thiếu chiều cao/cân nặng/vòng eo | 836; các nhóm thiếu có chồng lấp, không cộng riêng từng biến |
| Còn đủ đo nhân trắc | 7.979 |
| Loại diabetes có sẵn và không có follow-up outcome | Lần lượt 271 và 220 |
| Loại thiếu ít nhất một candidate predictor khác | 1.057 |
| Cohort phân tích hoàn chỉnh | 6.431 |
| Chia ngẫu nhiên trong WHII | Train 4.502; test nội bộ 1.929 |

Đây là **complete-case analysis**: người thiếu dữ liệu bị loại khỏi phân tích chính. Vì vậy, mô hình phản ánh nhóm còn lại, chưa chắc đại diện người thiếu xét nghiệm hoặc ít đi khám. Bảng S2 mô tả thêm missingness; đây không phải quy trình tự động “dữ liệu thiếu thì xóa là xong”. *(Hình 1: PDF 3 / 10576; mục 2.2: PDF 2 / 10575.)*

WHII ghi nhận tổng cộng **782 biến cố**, trung vị follow-up **16,1 năm**; train có **547**, test có **235** biến cố (Bảng S5). Kiểm định bên ngoài dùng **ELSA**, baseline **Wave 2, 2004–2005**, theo dõi tới **Wave 10, 2021–2023**: **2.190 người, 255 biến cố**, trung vị **14,2 năm**. ELSA già hơn: tuổi trung bình **63,08**, so với **49,95** của toàn WHII. *(Mục 3.1.1: PDF 4 / 10577; Bảng 1: PDF 5 / 10578; mục 3.2.1: PDF 6 / 10579; S5/S10.)*

Train/test WHII là kiểm định **nội bộ**; ELSA là cohort độc lập nên là **external validation**. Tuy nhiên, cả hai đều ở Anh. Kết quả chưa chứng minh dùng được cho sinh viên trẻ hoặc người Việt Nam.

## 3. Outcome và thời gian: đừng nhầm “phát hiện” với “bắt đầu bệnh”

Mục 2.4 mô tả incident T2D qua glucose đói, glucose sau nghiệm pháp, báo cáo bác sĩ chẩn đoán, thuốc hoặc hồ sơ bệnh viện. Nhưng mục hạn chế nói rõ outcome ở **ELSA là tự báo cáo**. Do đó, không được suy rằng hai cohort được xác định bệnh bằng cùng một quy trình xét nghiệm. *(PDF 2 / 10575 và PDF 10 / 10583.)*

Theo dõi dừng tại biến cố hoặc mốc sớm nhất trong tử vong, di cư, lần follow-up cuối, kết thúc hành chính. Người chưa có event trước lúc dừng là **right censored**, không phải “âm tính vĩnh viễn”. **Ví dụ hư cấu:** người mất theo dõi ở năm 3 chưa được gán chắc chắn không mắc trong 5 năm.

Một câu hỏi cần đọc kỹ hơn: nếu khám định kỳ, lần trước chưa có bệnh và lần sau có bệnh thì thời điểm chuyển trạng thái chỉ nằm trong một **khoảng** — interval censoring. Ngày ghi nhận chẩn đoán vẫn có thể là endpoint quan sát, nhưng không tự thành ngày onset sinh học. Đây là **nhận xét phương pháp của người đọc**; phần mô tả được kiểm tra chưa đủ để khẳng định bài đã xử lý interval censoring đầy đủ.

Glucose baseline được dùng dự báo outcome tương lai. Điều này có thể hợp lệ khi đã loại bệnh có sẵn; phép đo baseline khác phép đo follow-up tạo outcome. Không nên học thành quy tắc “glucose luôn leakage”, cũng không cho phép lấy xét nghiệm tương lai làm đầu vào tại `t0`.

## 4. Pipeline: 21 biến → ba cách chọn → ba mô hình Cox

Nhóm **21 candidate variables** gồm:

| Nhóm | Biến được cân nhắc ban đầu |
|---|---|
| Nhân khẩu, kích thước cơ thể | Tuổi, giới, ethnicity, chiều cao, BMI, WHtR |
| Huyết áp và chuyển hóa | SBP, DBP, TG, LDL-C, HDL-C, TyG, glucose đói |
| Tiền sử và lối sống | Tiền sử gia đình diabetes, hút thuốc, uống rượu, rau/quả, vận động |
| Xã hội và tim mạch | SES, chẩn đoán CVD baseline, thuốc CVD |

WHtR là vòng eo/chiều cao; TyG kết hợp triglyceride và glucose. **Đơn vị rất quan trọng:** bảng báo TG/glucose theo mmol/L, nhưng công thức TyG dùng mg/dL; không thay số trực tiếp qua hai hệ đơn vị. SES trong WHII dựa cấp bậc công việc, không đơn giản là thu nhập. *(Mục 2.3: PDF 2 / 10575; chú thích Bảng 1: PDF 5 / 10578; S3.)*

Trong **train**, tác giả chọn biến theo ba đường:

1. **LASSO-Cox:** phạt hệ số để loại bớt biến; chọn mức phạt bằng cross-validation 10 fold theo quy tắc một sai số chuẩn. Lặp trên **1.000 bootstrap**, giữ biến xuất hiện ít nhất **70%** lần.
2. **RSF:** dùng rừng survival đánh giá permutation importance; giữ biến có importance vượt biến nhiễu tham chiếu.
3. **Best subset:** so các tập biến, chọn tập có AIC thấp nhất theo mô tả bài. AIC cân đối độ khớp và số tham số; không phải accuracy của tập test.

Sau đó **cả ba tập biến đều được đưa vào Cox regression**. Bài không phải cuộc đấu dự báo cuối “RSF đối đầu Cox”; tên mô hình trong Bảng 2 gắn với **phương pháp chọn biến**. *(Mục 2.5.1.1–2: PDF 2–3 / 10575–10576.)*

| Nhánh | Tập biến cuối |
|---|---|
| LASSO chọn **9** | Ethnicity, WHtR, chiều cao, TyG, glucose đói, tiền sử gia đình, hút thuốc, BMI, SES |
| RSF chọn **13** | Tuổi, ethnicity, BMI, chiều cao, SBP, DBP, tiền sử gia đình, SES, WHtR, TG, HDL-C, glucose đói, TyG |
| Best subset chọn **12** | Tuổi, giới, ethnicity, hút thuốc, vận động, DBP, tiền sử gia đình, thuốc CVD, WHtR, glucose đói, TyG, HDL-C |

“9 biến” không nhất thiết là 9 hệ số: biến phân loại nhiều mức cần cách mã hóa phù hợp. Tuổi không được LASSO giữ lại cũng **không** chứng minh tuổi không liên quan bệnh; chọn biến phụ thuộc các thông tin còn lại và cách phạt. *(Mục 3.1.2: PDF 4 / 10577; chú thích Bảng 2: PDF 6 / 10579.)*

## 5. Cox tạo ra nguy cơ 5/10/15 năm bằng cách nào?

Có thể hiểu bằng ba dòng, chưa cần học đạo hàm:

```text
η = tổng các hệ số × giá trị biến đã mã hóa
S(t | x) = S0(t) ^ exp(η)
Nguy cơ tới t = 1 − S(t | x)   [thiết lập một biến cố, với caveat bên dưới]
```

`η` là điểm tuyến tính; `S0(t)` là baseline survival học từ dữ liệu. Công thức là dạng Cox chuẩn để giải thích, **không phải công thức calculator đã phục dựng của bài**: còn phải xác minh hệ số chính xác, mã hóa và quy ước centering. Một mô hình cho đường cong theo thời gian, rồi đọc tại 5/10/15 năm; không cần ba classifier độc lập. *(Bài mô tả ước tính hệ số và baseline survival ở mục 2.5.1.5: PDF 4 / 10577.)*

**Hazard** là tốc độ biến cố tức thời ở người chưa có biến cố; **risk** là xác suất tích lũy tới một mốc. **HR** so hazard, không phải tỷ số risk. Ví dụ **hoàn toàn hư cấu**, HR=2 không cho phép kết luận risk 5 năm phải tăng từ 10% lên 20%.

Cox PH thường giả định tỷ số hazard không đổi theo thời gian; hazard bản thân vẫn có thể thay đổi. Cox cũng có thể thêm spline cho quan hệ phi tuyến theo predictor. Bài đã thử restricted cubic splines nhưng giữ dạng tuyến tính vì hiệu năng gần nhau (S4/S11–S13; PDF 6 / 10579). Chưa thấy mô tả kiểm tra PH trong phần bài và mục phụ lục đã đọc; không được xem việc thử spline là đã kiểm tra PH.

**Caveat:** tử vong ngăn T2D về sau. Bài không phân tích competing risks và thừa nhận coi chết là censoring có thể làm cao nguy cơ dài hạn. Vì vậy `1−S` ở đây không tự được bảo đảm là xác suất T2D thực tế có tính tử vong cạnh tranh. *(Hạn chế: PDF 10 / 10583.)*

## 6. Đọc Bảng 2: chỉ số nào đang nói về đối tượng nào?

Bảng 2 nằm ở **PDF 6 / 10579**, báo **time-dependent C-index** của các candidate Cox models:

| Tập kiểm định / mô hình | 5 năm | 10 năm | 15 năm |
|---|---:|---:|---:|
| WHII test / LASSO-selected | 0,753 | 0,792 | 0,806 |
| WHII test / RSF-selected | 0,764 | 0,792 | 0,804 |
| ELSA / LASSO-selected | 0,878 | 0,820 | 0,784 |
| ELSA / RSF-selected | 0,876 | 0,822 | 0,785 |

Các số trên chỉ chép **ước lượng điểm** để đọc bảng; PDF có khoảng tin cậy 95%. Ví dụ ELSA 10 năm: LASSO **0,820 (0,786–0,849)**, RSF **0,822 (0,790–0,851)**. Chênh lệch nhỏ này chưa đủ để khẳng định RSF-selected vượt trội.

C-index đánh giá **thứ tự nguy cơ so với thời gian biến cố**, với cách xử lý censoring của estimator. C-index 0,8 không có nghĩa “80% bệnh nhân được chẩn đoán đúng”, không có nghĩa xác suất người này mắc bệnh là 80%, cũng không chứng minh giảm được 80% số ca. Ví dụ **hư cấu**: mô hình có thể xếp A nguy cơ cao hơn B đúng thứ tự, nhưng dự báo cả hai xác suất quá cao.

## 7. Điểm liên tục, nhóm quartile và nomogram là ba cách trình bày

Tác giả làm tròn hệ số, nhân 100 để trình bày điểm. Sau đó chia **phân bố điểm trong train** thành bốn quartile: very low, low, medium, high. Đây là nhóm **tương đối**, không phải bốn ngưỡng điều trị đã chứng minh. Các điểm cắt LASSO là **985 / 1.046 / 1.114**; điểm bằng ranh giới vào nhóm cao hơn. *(Mục 2.5.1.5: PDF 4 / 10577; 3.3.1: PDF 7 / 10580.)*

Mục 3.3.1 báo ở ELSA: **điểm liên tục** LASSO có C-index **0,800 (0,773–0,827)**, còn **nhóm quartile** là **0,737 (0,715–0,759)**; RSF tương ứng **0,801 (0,774–0,827)** và **0,727 (0,707–0,748)**. Đừng ghép 0,800 với 0,820 ở Bảng 2 như cùng một phép đánh giá: Bảng 2 theo từng horizon, đoạn này đánh giá score/group. Chia nhóm làm nhiều người đồng hạng nên mất thông tin; dễ truyền đạt hơn chưa chắc dự báo tốt hơn.

Mở [Hình 2](figures/figure_02.webp), **PDF 8 / 10581**:

- Panel **A** là Cox với 9 biến LASSO-selected; **B** là Cox với 13 biến RSF-selected.
- Tìm giá trị mỗi predictor trên trục của nó, dóng lên trục **Points**, cộng lại thành **Total Points**.
- Dóng tổng xuống ba trục **5-year / 10-year / 15-year diabetes risk**. Cùng một tổng điểm có xác suất khác nhau theo thời hạn.
- Chú thích ghi mã ethnicity, SES, tiền sử gia đình, hút thuốc và các đơn vị. Chiều cao dùng **m**, glucose dùng **mmol/L**; hướng trục không phải predictor nào cũng tăng cùng chiều.

Nomogram là cách nhìn mô hình trên giấy, không phải một mô hình thứ tư. **Total Points trên nomogram không được tự coi bằng điểm score in ở mục 3.3.1.** Không dựng calculator lâm sàng từ hình hoặc hệ số làm tròn khi chưa xác minh đầy đủ baseline survival và cách mã hóa.

## 8. Calibration khác DCA, và cả hai khác hiệu quả triển khai

**Calibration:** xác suất dự báo có phù hợp tần suất biến cố không? S9 báo slope và observed/expected (O/E) cho **WHII**; O/E gần 1 là phù hợp về tổng mức, dưới 1 gợi ý dự báo cao hơn quan sát, trên 1 gợi ý thấp hơn. Cần xét cả khoảng tin cậy và đường cong. Không suy “calibration ELSA hoàn hảo” chỉ từ C-index hoặc một bảng theo nhóm. *(Mục 2.5.1.3: PDF 3 / 10576; S9, S15–S17.)*

**DCA:** nếu chọn hành động khi risk vượt ngưỡng, lợi ích ròng có tốt hơn chiến lược làm cho tất cả/không ai không? Nó cân đối việc nhận diện đúng với tác hại của báo động sai theo ngưỡng, không phải đếm số ca bệnh thực sự được ngăn ngừa.

Bài đặt ngưỡng **25%, 50%, 75%** để so mô hình vì chưa có ngưỡng được chấp nhận chung cho các horizon này. Tác giả ghi net benefit hạn chế ở 50%/75%, nhất là WHII ở 5/10 năm. Đây **không phải khuyến cáo** “risk ≥25% thì điều trị”. Cần xác định hành động, chi phí, tác hại và ngưỡng hợp lý trước ứng dụng. Kết luận của chính tác giả vẫn yêu cầu nghiên cứu thêm về clinical utility trước triển khai. *(Mục 2.5.1.4: PDF 4 / 10577; 3.2.3: PDF 6 / 10579; kết luận: PDF 10 / 10583.)*

## 9. Bài nói gì, người đọc cần dè dặt ở đâu?

| Điều bài báo cáo | Cách diễn giải có giới hạn |
|---|---|
| Ba cách chọn biến cho hiệu năng gần nhau | Chưa chứng minh thuật toán chọn biến nào luôn tốt nhất hoặc cần SNN |
| Hai công cụ LASSO/RSF được phát triển tiếp | Lựa chọn dựa một phần trên kết quả test/ELSA làm nảy sinh selection-induced optimism; tác giả thừa nhận ở PDF 10 / 10583 |
| MICE sensitivity cho C-index gần complete-case | Chưa xóa được selection bias, chưa chứng minh mọi khía cạnh calibration giống nhau; cần kiểm tra cách chia dữ liệu trong imputation |
| Có đánh giá spline trên WHII test | Khi dùng test để quyết định dạng mô hình, vai trò đánh giá độc lập bị suy yếu; đây là nhận xét phương pháp, không cáo buộc sai số đã được định lượng |
| TyG và TG cùng xuất hiện | Có thông tin chồng lấp; VIF TyG **15,24**, TG **13,12** ở nhánh RSF, có thể giảm ổn định hệ số *(PDF 6 / 10579; S14)* |
| ELSA là external validation | Outcome tự báo cáo, quần thể già hơn và vẫn ở Anh giới hạn cách khái quát hóa |

Không diễn giải hệ số hay trục nomogram thành “thay đổi predictor sẽ ngăn bệnh”: đây là mô hình dự đoán quan sát, không phải thử nghiệm can thiệp. Tuổi, SES, ethnicity hoặc thuốc CVD có thể chứa nhiều thông tin bối cảnh; association không phải causal effect.

## 10. Nên học và tái sử dụng điều gì?

Học cấu trúc **cohort → index time → outcome/follow-up → chọn biến trong train → Cox → kiểm định → công cụ trình bày**; học báo cáo cả discrimination, calibration và DCA; học so lợi ích của thêm xét nghiệm với độ phức tạp. Không sao chép nguyên danh sách predictor, điểm cắt quartile hoặc ngưỡng DCA sang dataset khác.

Khi tự làm, giữ imputation/scaling/chọn biến/tuning trong training folds; validation phục vụ lựa chọn, final test dành đánh giá sau khi chốt. Nếu so nhiều mô hình, kiểm soát việc lựa chọn sau khi nhìn kết quả. Thiết kế censoring, competing risks và định nghĩa outcome phải xuất phát từ dữ liệu thật, không chỉ từ thuật toán quen dùng.

Tự trả lời ba câu trước khi đọc tiếp: **(1)** RSF làm nhiệm vụ nào trong bài? **(2)** Vì sao 0,800 và 0,737 cùng xuất hiện cho LASSO ở ELSA? **(3)** Dự báo 15 năm khác gì khẳng định một người mắc đúng năm 15? Đáp án: chọn biến; score liên tục khác nhóm quartile; xác suất trong khoảng không phải ngày khởi phát cá nhân. Hiểu ba điều này đã đủ để đọc bài theo đúng logic, chưa cần xây ứng dụng.

### Bản đồ tra nguồn cho lần đọc thứ hai

- **Bảng 1, PDF 5 / 10578:** đặc điểm baseline và chênh lệch train/test; không dùng p-value ở đây để tự chọn predictor.
- **Bảng 2, PDF 6 / 10579:** time-dependent C-index và CI tại từng horizon.
- **Phụ lục S1–S5:** cohort, missingness, định nghĩa, spline và follow-up; **S7:** tần suất LASSO chọn biến; **S8–S10:** discrimination/calibration và ELSA.
- **S11–S14:** phi tuyến và cộng tuyến; **S15–S17:** dự báo/quan sát theo nhóm; **S18–S21:** công cụ best subset bổ sung; **S22–S23:** sensitivity thêm WHtR/xét nghiệm.
- Hình phụ lục có chú thích trong bản trích xuất, nhưng muốn đánh giá trực quan calibration/DCA phải mở hình gốc trong DOCX. Tài liệu này không khẳng định đã đọc hết mọi hình phụ lục hoặc xác minh độc lập toàn bộ reference list của bài.
