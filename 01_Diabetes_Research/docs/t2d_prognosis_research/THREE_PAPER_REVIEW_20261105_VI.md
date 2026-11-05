# Kiểm chứng ba bài và chọn bài thực hành tái lập đầu tiên

**Lựa chọn duy nhất cho mục tiêu hiện tại: `cai2021_nonobese_five_year`.** Lựa chọn dựa trên khối lượng tái dựng một quy trình survival để học, không phải xếp hạng chất lượng khoa học chung hay so AUC giữa các nghiên cứu.

Ngày kiểm tra: **05/11/2026**. Không đóng băng đề tài, không chạy mô hình, không đưa bài vào `chosed_papers/`.

## Mức kiểm chứng

- Đối chiếu DOI/title trên CrossRef và PubMed của cả ba. Han online ngày 02/12/2022, số báo tháng 03/2023; gọi Han 2023 là phù hợp. Không thấy thông báo đính chính/rút bài liên quan trong các bản ghi và truy vấn đã kiểm tra; không coi sự vắng mặt của notice là bảo đảm tuyệt đối.
- Đọc trực tiếp Methods, phần Results liên quan, Data Availability và chú thích bảng/hình trên HTML PMC của cả ba. Chưa kiểm tra toàn bộ PDF và mọi hình ở độ phân giải gốc.
- Phụ lục Excel của Han hiện được liệt kê, nhưng một lượt mở trả cache miss; **chưa biết nội dung workbook**, không gọi nó là code hay dữ liệu đã xử lý. Phụ lục Liu chưa đọc, theo trạng thái truy cập đã ghi trong lượt trước.
- Hai dataset Dryad được liệt kê công khai. Lượt tải tự động NAGALA trước đó cùng ngày trả 403; lượt tải RICH lần này cũng trả 403. Chưa tải/đọc workbook, chưa kiểm tra header, đơn vị và mã dữ liệu. Không thử nhiều đường vòng. Những lỗi này không chứng minh người dùng không thể tải thủ công.

Nguồn chính: [Cai / PMID 34007195](https://pubmed.ncbi.nlm.nih.gov/34007195/), [Han / PMID 36321466](https://pubmed.ncbi.nlm.nih.gov/36321466/), [Liu / PMID 42923095](https://pubmed.ncbi.nlm.nih.gov/42923095/).

## Ma trận kiểm chứng cùng tiêu chí

| Tiêu chí | Cai 2021 | Han 2023 | Liu 2026 |
|---|---|---|---|
| DOI | 10.2147/DMSO.S304994 | 10.1111/dom.14910 | 10.3389/fendo.2026.1957473 |
| Câu hỏi | T2D mắc mới ở người không béo phì | Tiền đái tháo đường tiến triển thành diabetes | Chỉ số tổng hợp so với biến thành phần để dự báo diabetes |
| Horizon | 5 năm | 5 năm | 3 năm; có phân tích thêm |
| Dataset gốc | NAGALA, Nhật | RICH, Trung Quốc | RICH phát triển; NAGALA ngoại kiểm |
| Mẫu phân tích | 12.940 người, 201 biến cố | 26.018 người, 2.640 biến cố | RICH 112.070/1.425; NAGALA 15.453/373, người/biến cố toàn follow-up |
| Mẫu train/test | 9.651/3.289; 154/47 biến cố | 12.947/13.071; 1.315/1.325 biến cố | Bootstrap và leave-one-center-out trong RICH; cohort khác ở NAGALA |
| Theo dõi | Trung vị toàn mẫu 2.016 ngày | Trung vị 3,05 năm | RICH 2,99 năm; NAGALA 5,39 năm |
| Baseline và endpoint | Baseline; FPG, HbA1c hoặc tự báo trong follow-up | Baseline FPG 5,6–6,9 mmol/L; endpoint FPG ≥7 hoặc tự báo | Baseline; RICH dùng FPG/tự báo, NAGALA thêm HbA1c |
| Số biến/mô hình cuối | Sáu biến | Bảy biến ở mô hình liên tục; thêm risk score phân nhóm | Nhiều mô hình base/index/component, thường tới tám đầu vào cho so sánh chính |
| Chọn biến | LASSO rồi Cox | LASSO rồi full/stepwise/MFP; chọn stepwise, tạo nomogram và score | So sánh các bộ biến định trước, công thức ràng buộc và trọng số tự do |
| Missing data | Cohort đã loại thiếu dữ liệu; không có quy trình MI phức tạp trong bài chính | Multiple imputation; nhiều biến thiếu cao | Complete-case; có kiểm tra chọn mẫu liên quan HDL-C |
| Validation | Random split nội bộ; mô tả bootstrap 1.000 | Random split nội bộ | Optimism correction, leave-one-center-out và ngoại kiểm |
| Metric được thấy | Harrell C-index, AUC theo thời gian, calibration; DCA toàn mẫu | AUC, time-dependent ROC ở phụ lục, calibration, DCA, các metric theo ngưỡng | IPCW AUC/Brier, O:E, calibration intercept/slope/curve; bootstrap CI |
| Kiểm tra PH | Chưa thấy mô tả kiểm tra trong main text đã đọc | Chưa thấy trong main text đã đọc | Schoenfeld; có spline và time-varying sensitivity analyses |
| Code của chính bài | UNKNOWN; chưa xác minh repository/script chạy | UNKNOWN; R + EmpowerStats không phải code công khai | UNKNOWN; không thấy link code trong main text đã kiểm tra |
| Môi trường | R 3.6.1; chưa có lockfile/package versions đầy đủ | R và EmpowerStats 2.0; chưa có môi trường tái tạo đầy đủ | R 4.6.1; chưa có môi trường tái tạo đầy đủ |
| Truy cập dữ liệu thực tế | Trang liệt kê có; chưa tải được | Trang liệt kê có; chưa tải được; phụ lục Excel chưa đọc | Phụ thuộc cả hai dataset trên |
| Tái lập loại A: chạy code gốc | Chưa xác nhận | Chưa xác nhận | Chưa xác nhận |
| Tái dựng loại B: đúng dữ liệu | Có điều kiện; ít bước nhất trong ba bài | Có điều kiện; MI và pipeline nhiều nhánh cần dựng lại | Có điều kiện; nhiều so sánh, estimator và resampling |
| Kết luận cho lần đầu | **Chọn** | Chưa chọn | Chưa chọn |

Vị trí nguồn: Cai: Data Source, Definitions, Statistical Analyses, Table 1–3, Figure 2/5–7. Han: Sections 2.3–2.5, 3.1, 3.3–3.7, Table 1–2, Supporting information. Liu: Sections 2.1–2.6, 3.1, 3.7, Table 3, Data availability.

**Không so trực tiếp AUC để chọn bài:** quần thể, endpoint, horizon và validation khác nhau. Cùng ghi “5 năm” cũng không làm Cai và Han trở thành một benchmark chung. Median follow-up dưới horizon không tự làm mô hình sai; phải kiểm tra số người còn at risk và độ bất định tại horizon.

## Rà rủi ro phương pháp và khả năng khôi phục

### Cai: gọn nhưng có chi tiết phải gắn cờ

Chú thích Figure 2 ghi lẫn “Partial likelihood deviance (binomial deviance)”, còn Results/caption dùng các số ứng viên 18/19 khác nhau. Không suy đoán tác giả thực sự chạy LASSO-Cox hay LASSO logistic. Table 2 là hệ số LASSO, **không phải bộ hệ số Cox cuối**. Chưa thấy giá trị baseline survival độc lập trong main text đã kiểm tra. Vì vậy code, objective, seed/split và cách dự đoán xác suất tuyệt đối vẫn là các điểm cần khôi phục.

DCA dùng toàn cohort; báo cáo bootstrap chưa đủ để xác nhận toàn bộ chọn biến/calibration/DCA đều được optimism-corrected đúng. Hosmer–Lemeshow p > 0,05 không đủ chứng minh calibration tốt với censoring. Chưa thấy mô tả kiểm tra PH. Những điểm này là câu hỏi audit, không phải bằng chứng khẳng định tác giả đã leakage.

### Han: ưu thế về số biến cố, thêm gánh nặng MI

Han có nhiều biến cố hơn, nên lợi thế về thông tin phát triển và đánh giá là thực chất. Tuy nhiên, Section 2.4.4 báo HDL-C thiếu 40,70%, AST 56,53%, smoking/alcohol mỗi biến 66,28%; HDL-C còn nằm trong mô hình cuối. Cần làm rõ cách MI, số bộ imputation so với số iterations, pooling và thứ tự imputation/split. Không khẳng định đã impute trước split khi nguồn chưa xác nhận.

Bài cung cấp β cuối và S₀(5 năm) ở Section 3.5, thuận lợi hơn Cai cho khôi phục phương trình. Tuy vậy, mức làm tròn S₀ rất gần 1 và cách hiển thị số mũ cần đối chiếu bản gốc trước khi tính nguy cơ. Random split vẫn là nội bộ. Chuỗi MI → LASSO → so full/stepwise/MFP → nomogram → score khiến tái dựng toàn bài nặng hơn lần học đầu.

### Liu: kiểm định rõ hơn, phạm vi toàn bài lớn hơn

Methods nêu rõ Efron ties, robust SE theo trung tâm, PH, IPCW, đóng băng hệ số/scaling/baseline risk khi chuyển cohort và các vòng bootstrap. Có phân biệt kết quả sensitivity apparent với optimism-corrected và giới hạn DCA exploratory. Đây là điểm mạnh về cách báo cáo.

Complete-case vẫn có nguy cơ chọn mẫu; main text Section 3.7 xem xét nhóm bị loại vì HDL-C. Số biến cố NAGALA trong 3 năm chỉ là 101, khác với tổng 373 trong toàn follow-up. Tái dựng đầy đủ còn gồm nhiều bộ so sánh, công thức chuyển đơn vị, Holm correction, spline/time-varying coefficients và hai cohort. Chưa có code/phụ lục được kiểm tra để giảm khối lượng này.

Nguồn full text: [Cai](https://pmc.ncbi.nlm.nih.gov/articles/PMC8123981/), [Han](https://pmc.ncbi.nlm.nih.gov/articles/PMC10107751/), [Liu](https://pmc.ncbi.nlm.nih.gov/articles/PMC13686858/). Nhận xét về độ khó ở trên là đánh giá của người đọc, không phải kết quả thực nghiệm của ba bài.

## Kết luận và phạm vi thực hành được chọn

**Chọn Cai 2021 cho lần thực hành đầu tiên.** Lý do quyết định là một cohort, một tuyến chọn biến–Cox tương đối ngắn, sáu biến cuối và các mốc kết quả kiểm tra được. Không phải vì AUC cao hơn hoặc vì nó được nhắc đầu danh sách. Han không bị đánh giá thấp về số biến cố; Liu không bị đánh giá thấp về độ rõ validation.

Mục tiêu hiện tại là **loại B: tự tái dựng phương pháp trên đúng dữ liệu**, có ghi sai khác. Loại A chưa được xác nhận cho bất kỳ bài nào; chuyển sang dataset khác sẽ là loại C, không gọi là tái lập kết quả gốc.

Ba việc đầu tiên:

1. **Lấy và kiểm tra NAGALA**: xác nhận điều kiện tái sử dụng, workbook/version, header, đơn vị, mã biến cố và thời gian; tái dựng cohort, đối chiếu **Table 1: 12.940 người/201 biến cố**. Chưa khớp phải tìm nguyên nhân, không sửa nhãn hoặc loại người để ép số khớp.
2. **Lập bảng quyết định tái dựng**: predictor timing, mã hóa, split/seed có hay không, LASSO objective, quy tắc λ và chi tiết chưa báo cáo. Nếu phải chọn một cấu hình thay thế, ghi rõ đó là quyết định tái dựng; fit mọi bước học tham số trong train.
3. **Dựng Cox và đánh giá 5 năm**: đối chiếu hướng/độ lớn HR ở Figure 3, C-index ở Table 3, AUC(t) ở Figure 5, calibration ở Figure 6. Dùng estimator xử lý censoring rõ ràng; chưa tự gọi DCA toàn mẫu là lợi ích triển khai. DCA/nomogram làm sau khi luồng chính chạy và kiểm tra đúng.

Không bảo đảm các metric khớp chính xác do chưa có code, seed và estimator đầy đủ. Nếu cohort không thể tái dựng hoặc objective chọn biến không khôi phục được, ghi nhận giới hạn trước khi tiếp tục. Chưa cần SNN hay một đề tài nâng cấp để hoàn thành bài thực hành này.

Chi tiết claim provenance, identity, access log và CP1–CP6: [evidence/three_paper_review_20261105.json](evidence/three_paper_review_20261105.json).
