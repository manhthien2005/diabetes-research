# Đề cử bài tái lập đầu tiên để học

Ngày kiểm tra: **05/11/2026**. Mục tiêu hiện tại là học bằng cách dựng lại một nghiên cứu có phạm vi vừa sức. Đây là khuyến nghị để cùng đối chiếu với kết quả tìm độc lập, chưa chọn baseline nghiên cứu hay thay đổi đề tài.

**Đề cử tạm thời: `cai2021_nonobese_five_year`, DOI 10.2147/DMSO.S304994.**

Tên bài: *Derivation and Validation of a Prediction Model for Predicting the 5-Year Incidence of Type 2 Diabetes in Non-Obese Adults: A Population-Based Cohort Study*.

[PubMed](https://pubmed.ncbi.nlm.nih.gov/34007195/) · [Toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC8123981/) · [Dữ liệu được bài dẫn](https://datadryad.org/dataset/doi:10.5061/dryad.8q0p192).

## Vì sao phù hợp với lần đầu

Bài dự báo T2D mắc mới trong 5 năm trên người không béo phì; dùng LASSO chọn biến rồi Cox, tạo nomogram. Mẫu phân tích gồm 12.940 người, 201 biến cố; sáu biến cuối là tuổi, gan nhiễm mỡ, GGT, TG, HbA1c và FPG. Nguồn: Abstract; Data Source; Table 1; Establishment of a Predicting Nomogram.

Suy luận của em: quy trình này đủ nhỏ để học cách chuyển dữ liệu baseline, thời gian theo dõi và biến cố thành nguy cơ tuyệt đối, đồng thời đủ đầy để học kiểm định. Nguồn dữ liệu công khai được định danh rõ giúp tránh phụ thuộc ngay vào việc cấp quyền WHII/ELSA. Đây là lý do chọn để học, không phải kết luận bài có chất lượng cao nhất trong toàn bộ lĩnh vực.

## Điều kiện và giới hạn còn mở

| Thành phần | Đã xác minh đến đâu? |
|---|---|
| Danh tính | DOI/title khớp CrossRef và PubMed; không thấy thông báo đính chính/rút bài trong các bản ghi và truy vấn đã kiểm tra |
| Full text | Đã kiểm tra abstract và các đoạn toàn văn được lập chỉ mục; chưa audit đầy đủ PDF/phụ lục |
| Dữ liệu | Dryad liệt kê `Data set Int J Obesity.xlsx`; lượt tải tự động 05/11 nhận HTTP 403; chưa tải hay kiểm tra workbook |
| Biến thời gian và biến cố | Bài nói có follow-up duration và incident T2D; chưa xác minh tên cột/cách mã hóa trực tiếp trong workbook |
| Code | UNKNOWN; chưa xác nhận repository hoặc script hoàn chỉnh của tác giả |
| Tái lập số liệu y hệt | Chưa bảo đảm; cần seed/split, cấu hình, đơn vị và chi tiết estimator |
| Giới hạn phương pháp | Chia ngẫu nhiên cùng cohort là kiểm định nội bộ; chỉ 47 biến cố ở tập kiểm tra; cần audit cách xử lý censoring trong calibration/DCA |

Các rào cản truy cập tự động không chứng minh dữ liệu không công khai hoặc người dùng không tải được qua trình duyệt. Nếu anh chọn bài này sau đối chiếu, bước tiếp theo là lấy PDF và workbook bằng một đường tải rõ ràng; nếu bị chặn thì nhờ anh tải, không dò nhiều đường vòng.

## Bài mới tìm được để đối chiếu

`liu2026_index_component_prediction`: *Composite indices of insulin resistance and sensitivity versus matched component-variable models for incident diabetes prediction*. DOI **10.3389/fendo.2026.1957473**, đăng 08/10/2026, PMID 42923095.

[Toàn văn](https://pmc.ncbi.nlm.nih.gov/articles/PMC13686858/) · [Nhà xuất bản](https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2026.1957473/full).

Bài so sánh các chỉ số TyG, SPISE, METS-IR với mô hình từ chính các biến thành phần; dự báo 3 năm, phát triển trên RICH và vận chuyển mô hình sang NAGALA. Có IPCW AUC/Brier, calibration, bootstrap và leave-one-center-out. Data availability dẫn hai dataset Dryad công khai. Nguồn: Abstract / Methods; Sections 2.1, 2.6; Data availability.

Suy luận: đây là đầu mối tốt hơn để học ngoại kiểm và đánh giá nguy cơ tuyệt đối về sau. Tuy nhiên, để tái lập toàn bộ cần nhiều phân tích, cả hai cohort và các sensitivity analyses; chưa xác nhận code hoặc đọc phụ lục. Vì vậy chưa ưu tiên hơn Cai cho lần đầu. Không diễn giải DCA của bài thành bằng chứng đã thiết lập lợi ích lâm sàng; tác giả tự giới hạn phần này là exploratory.

## Những đầu mối chưa được ưu tiên

- `huang2026_british_short_long_risk`: sát đề tài và đã có reading pack, nhưng dữ liệu WHII/ELSA chưa được cấp cho nhóm; code chưa xác nhận. Hồ sơ cũ giữ nguyên.
- `sasagawa2024_deepsurv_jecoh`: hữu ích để học Cox–DeepSurv, nhưng dữ liệu J-ECOH hạn chế công khai. Hồ sơ đã kiểm tra trước được dùng lại, không giả vờ vừa đọc lại toàn bộ.
- *A prediction nomogram for the 3-year risk of incident diabetes among Chinese adults*, DOI 10.1038/s41598-020-78716-1: đã kiểm tra danh tính; các mô hình cuối là logistic, nên không thay thế bài thực hành survival đầu tiên. Không loại vĩnh viễn khỏi kho.
- Nhiều kết quả tìm mang chữ diabetes nhưng kết cục là tử vong, biến chứng, tiền đái tháo đường, hoặc dùng ảnh/genomics; chúng không trả lời đúng yêu cầu hiện tại.

## Mức tái lập cần phân biệt

1. **Chạy lại code gốc trên đúng dữ liệu**: hiện chưa xác nhận đủ điều kiện cho Cai.
2. **Tái dựng phương pháp trên đúng dữ liệu**: mục tiêu khả thi có điều kiện đang được đề cử.
3. **Áp dụng phương pháp lên dữ liệu khác**: học được kỹ thuật nhưng không phải tái lập kết quả gốc.

Nếu chọn Cai, sản phẩm học tập đầu tiên nên là sơ đồ cohort và thống kê mẫu đối chiếu Table 1, sau đó mới đến Cox và đánh giá 5 năm. Chưa cần SNN, nâng cấp mô hình hay tìm đóng góp mới. Những khác biệt không khôi phục được phải được ghi lại, không tự đổi quy tắc để ép số liệu khớp.

## Cùng các agent khác lựa chọn

Dùng [prompt tìm độc lập](REPRODUCTION_SEARCH_PROMPT_VI.md) ở lượt đầu, chưa đưa tên bài em đề cử để giảm neo vào kết quả sẵn có. Sau đó dùng câu hỏi phản biện ở cuối prompt để kiểm tra Cai trực tiếp. Một bài có code thực sự chạy được, dữ liệu truy cập được và thiết kế phù hợp hơn có thể thay thế đề cử này.

Nguồn, truy vấn và các giới hạn truy cập được ghi tại [evidence/reproduction_search_20261105.json](evidence/reproduction_search_20261105.json). Khảo sát có chủ đích, không phải tổng quan hệ thống; chưa chứng minh đã tìm hết bài tốt.
