# Đọc Cai2021 để hiểu một nghiên cứu tiên lượng

> Paper ID: cai2021_nonobese_five_year · DOI: 10.2147/DMSO.S304994.
> Bản giải thích nhập môn, không thay toàn văn/bản dịch và chưa phải kết quả tái lập thực nghiệm. Số trang là trang tạp chí; PDF page = số trang −2086.

## 1. Bài này hỏi điều gì?

Hãy hình dung một người đến khám sức khỏe hôm nay, không béo phì và chưa diabetes theo tiêu chí tuyển chọn. Ta biết tuổi, gan nhiễm mỡ, GGT, TG, HbA1c và FPG lúc này. Câu hỏi: người đó có nguy cơ mới mắc T2D trong **5 năm tới** bao nhiêu?

Đó là tiên lượng tương lai, khác câu hỏi “người này hiện đã mắc bệnh nhưng chưa được chẩn đoán hay chưa?”. Mục tiêu 5 năm xuất hiện ngay ở title/Purpose (p.2087). Horizon là long_term_risk.

## 2. Dữ liệu đến từ đâu?

Cai và cộng sự phân tích lại cohort NAGALA của nhóm Okamura, công bố qua Dryad. Người tham gia khám sức khỏe tại Murakami Memorial Hospital, Gifu, Nhật Bản. Cơ quan tác giả ở Trung Quốc không biến dữ liệu thành cohort Trung Quốc (Data Source/Study Population, pp.2088–2089).

Đây là **secondary historical cohort analysis**. “Retrospective” không tự bảo đảm ít bias: chọn người đủ dữ liệu và tần suất tái khám vẫn có thể ảnh hưởng kết quả. Tác giả thừa nhận complete-case selection có thể gây selection bias (Discussion, p.2099).

Hai mốc lịch chưa thống nhất: Study Population ghi 2004–2015; Figure 1 ghi registration 1/5/1994–31/12/2016. Ta giữ cả hai và ghi chưa hòa giải, không tự chọn mốc thuận tiện.

## 3. N lớn, vì sao vẫn nhìn số events?

N là số người; events là số mới mắc bệnh quan sát được. Table 1 (p.2092):

| Tập | Người | Events |
|---|---:|---:|
| Toàn cohort | 12,940 | 201 |
| Derivation | 9651 | 154 |
| Internal validation | 3289 | 47 |

Mô hình học sự khác biệt liên quan đến events, nên không chỉ nhìn N rồi kết luận dữ liệu dư. Holdout có 47 events, các chỉ số còn bất định. Điều này không chứng minh mô hình sai; nó yêu cầu giữ confidence interval khi báo số.

Event proportion 1.55% trên toàn follow-up không phải cumulative incidence chuẩn hóa đúng 5 năm của toàn dân. Mỗi người theo dõi khác nhau. Median 2016 ngày không có nghĩa tất cả được theo dõi đúng 2016 ngày.

Văn bản p.2090 ghi crude incidence 1.6/1.4 cases per 100 person-years. “Phần trăm có event” khác “ca/100 người-năm”. Chưa có tổng person-time để tính lại hoặc sửa rate nguồn.

## 4. Censoring là gì?

Người chưa thấy bệnh sau 2 năm rồi ngừng tái khám không chứng minh rằng họ chắc chắn không mắc bệnh trong 5 năm. Ta chỉ biết đến lần quan sát cuối. Đó là **right censoring**.

Cox dùng event và thời gian, thay vì ép mọi người thành nhãn 0/1 ở 5 năm khi chưa đủ thông tin. Khi tự dựng phải tìm đúng cột event/follow-up và đơn vị ngày/năm. Follow-up duration thuộc outcome/censoring; không đưa vào predictors baseline vì chưa biết lúc dự báo.

Bài nói dùng Cox và time-dependent ROC (Statistical Analyses, p.2090), nhưng chưa mô tả đủ estimator/censoring handling để chạy lại chính xác mọi chỉ số.

## 5. LASSO, Cox, nomogram làm gì?

**LASSO chọn biến.** Penalty làm một số hệ số về 0. Lambda được chọn bằng 10-fold CV trong development. Sáu biến giữ lại: age, fatty liver, GGT, TG, HbA1c, FPG (pp.2091–2093).

**Cox mô hình hóa hazard theo thời gian.** Sáu biến vào multivariable Cox. HR là tỷ số hazard theo mô hình, không phải “xác suất mắc bệnh tăng đúng từng ấy phần trăm”. Không so HR khác đơn vị để xếp tầm quan trọng.

**Nomogram trình bày mô hình bằng hình.** Figure 4 (p.2095) đổi giá trị từng biến thành points, cộng Total Points rồi tra nguy cơ 5 năm. Nó không phải mô hình mới được train sau Cox.

Điểm dễ nhầm nhất: **Table 2 (p.2093) là hệ số LASSO, không phải hệ số Cox cuối.** Không chép Table 2 vào risk calculator. Xác suất Cox còn cần baseline survival, coefficients, encoding và centering đúng.

## 6. Đủ hướng dẫn để code y hệt chưa?

Chưa. Hai chỗ phải giữ Unclear:

- Results ghi 18 indicators; Figure 2 caption ghi 19 features. Chưa có codebook xác nhận số biến hay số dummy columns.
- Figure 2 ghi “partial likelihood deviance (binomial deviance)”. Family/loss mơ hồ; không tự khẳng định Cox-LASSO hoặc logistic-LASSO.

Chưa xác minh split seed, code gốc, encoding/standardization hoặc đầy đủ absolute-risk specification. Bài nói R 3.6.1 (p.2090), chưa đủ tái tạo môi trường.

Tác giả ghi baseline exclusion FPG ≥6.1 mmol/L (p.2089), còn outcome follow-up dùng ≥126 mg/dL. Tái dựng phải giữ bộ lọc nguồn rồi kiểm tra codebook; không ngầm sửa thành guideline khác.

## 7. Train, CV và test khác nhau ra sao?

Derivation 9651 người dùng chọn biến và fit. 10-fold CV chọn lambda trong development. Validation 3289 người là random holdout cùng nguồn (Statistical Analyses, p.2090; Table 1, p.2092).

Đó là **internal validation**, không phải external. CV/bootstrap cũng không tự tạo external validation.

Một genuine held-out test có thể đánh giá pipeline mà không bắt buộc nested CV trong mọi thiết kế. Điều thiết yếu là preprocessing, selection và tuning không nhìn test. Bài mô tả LASSO trên derivation; code và per-fold workflow chưa kiểm tra. Không kết luận selection toàn cohort khi thiếu bằng chứng.

## 8. AUC 0.829 có nghĩa accuracy 82.9% không?

Không. AUC là discrimination, không phải accuracy ở một threshold. Validation 5-year AUC 0.829 (95% CI 0.753–0.905), Results p.2094; C-index 0.837 (0.760–0.914), Table 3 p.2095.

Đọc ba câu hỏi riêng:

1. **Discrimination:** mô hình sắp thứ tự nguy cơ tốt đến đâu? C-index/AUC giúp trả lời.
2. **Calibration:** người có risk dự báo 10% có tần suất event phù hợp khoảng 10% không, với xử lý censoring phù hợp? Bài có curves và H–L P >0.05, không có slope/intercept định lượng. P >0.05 không chứng minh calibration hoàn hảo.
3. **Clinical utility:** ở decision setting cụ thể, mô hình có net benefit hơn mặc định không? DCA không tự chứng minh giảm số ca bệnh hoặc chi phí thực tế.

DCA dùng **toàn cohort**, có người train. Bài có 1000 bootstrap nhưng chưa đủ chi tiết xác nhận correction cho toàn pipeline; đây chưa phải clinical utility đánh giá hoàn toàn độc lập (pp.2090, 2094, 2097).

## 9. HbA1c/FPG có phải leakage không?

Không thể chỉ nhìn tên biến. Predictor là **HbA1c/FPG baseline**, outcome là diabetes **sau baseline**. Biomarker hiện tại dự báo tiến triển tương lai có thể hợp lệ.

Nếu dùng cùng giá trị HbA1c/FPG tạo nhãn diabetes hiện tại rồi đưa lại vào predictors, đó là tình huống khác. Cần kiểm tra cột, thời điểm đo và index time. Bản phân tích này không có bằng chứng gán fatal F-leakage cho Cai2021.

Không lấy ví dụ này để thêm labs vào Paper_01_NHANES_NoLab: dự án đó là cross-sectional no-lab theo PROGRESS.json. Khác target/horizon nên không so AUC trực tiếp.

## 10. Tái lập nào phù hợp lần học đầu?

Chọn **B — conditional same-data method reconstruction**: có workbook/codebook xác minh rồi tự viết pipeline theo mô tả, ghi assumptions và giải thích số khác. Mục tiêu là hiểu và tạo quy trình audit được, không hứa tái tạo từng chữ số.

**A — exact numerical replication** cần code/split/setting/data khớp, hiện chưa đủ. **C — adaptation** dùng câu hỏi/data khác là nghiên cứu mới.

Dryad 10.5061/dryad.8q0p192 được công bố trong bài. Automated workbook retrieval trong phiên này trả 403; không đồng nghĩa dataset không tồn tại hoặc không public. Workbook/codebook chưa được xem. Code availability là UNKNOWN, không phải “không có code”. Đây là ứng viên dựng lại phương pháp có điều kiện; cần kiểm tra tệp và định nghĩa biến trước khi chạy. Đánh giá mức trung bình áp dụng cho mục tiêu học này; việc khớp chính xác kết quả gốc chưa được xác nhận.

Khi có dữ liệu: kiểm tra cohort counts và event/time/units trước; lập variable contract; ghi family/seed/encoding/estimator là assumptions nếu nguồn thiếu; tách test; phát triển trong train; đánh giá test sau khi chốt. Nếu không ra N 12,940/E 201, giải thích cohort trước khi tối ưu. Không sửa pipeline theo test để đuổi AUC 0.829.

## 11. Một vòng đọc có điểm dừng

Lần 1: Purpose/Abstract (p.2087), Figure 1 (p.2091), Table 1 (p.2092), để nói được ai vào mẫu và outcome là gì.

Lần 2: Statistical Analyses (p.2090), Table 2/Figure 2 (p.2093), Figure 4 (p.2095), để phân biệt selection, modeling, visualization.

Lần 3: Results (pp.2093–2094), Figures 5–7 (pp.2096–2097), limitations (pp.2098–2099), để nói được validation đến mức nào.

Dừng khi giải thích được baseline khác follow-up, ai censored trước 5 năm, vì sao Table 2 không phải risk calculator, internal khác external và DCA chưa chứng minh giảm incidence. Chưa cần học nhiều thuật toán để hiểu một pipeline.

Chi tiết: analysis.html (8 blocks, 48 trường), summary.json, rob_audit.json. Khuyến nghị giữ pool và chuẩn bị B; chưa training, không promotion và không đổi đề tài frozen.
