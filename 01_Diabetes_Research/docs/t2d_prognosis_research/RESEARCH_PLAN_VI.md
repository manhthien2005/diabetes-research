# Kế hoạch khảo sát đề tài gốc

Ngày: 03/11/2026. **Trạng thái: khảo sát; chưa chốt đề tài cụ thể.**

## 1. Phạm vi làm việc đã được anh yêu cầu giữ lại

Tiên lượng nguy cơ mắc mới đái tháo đường type 2 từ dữ liệu sức khỏe dạng bảng hoặc EHR, ở người chưa mắc bệnh tại thời điểm dự báo. Tập trung trước vào thông tin baseline; mốc năm năm là ứng viên cần kiểm tra bằng dữ liệu, không phải thông số đã được đóng băng.

Không mặc định số biến hoặc thuật toán. Không đưa thiếu HbA1c, khám lặp lại, dự báo lợi ích can thiệp, nhiều trạng thái hoặc competing-risk modeling thành yêu cầu mới. Nếu cohort đòi hỏi xử lý competing risks để ước tính nguy cơ đúng, đó là yêu cầu về tính hợp lệ cần đánh giá, không được bỏ qua để giảm độ khó.

## 2. Câu hỏi nền để khảo sát

> Với thông tin thực sự có sẵn ở một lần khám, có thể ước tính đáng tin cậy nguy cơ mắc mới T2D trong những năm tiếp theo đến mức nào?

Đây là câu hỏi định hướng tìm hiểu, chưa phải giả thuyết cuối cùng. Cần biết nghiên cứu hiện có, dữ liệu và người dùng trước khi xác định đóng góp riêng.

| Thành phần thiết kế | Trạng thái hiện tại |
|---|---|
| Đơn vị phân tích | Dự kiến là người; cần kiểm tra encounter lặp lại và cluster |
| Đối tượng | Chưa mắc bệnh ở baseline; tuổi, địa điểm, tiêu chí loại trừ chưa chọn |
| Index time | Lần khám có đủ đầu vào dự kiến; thời điểm chính xác chưa xác định |
| Kết cục | Mắc mới; cần xác minh tiêu chuẩn, subtype T2D, chẩn đoán ghi nhận hay xét nghiệm |
| Horizon | Năm năm là ứng viên; phải phù hợp thời gian theo dõi và số ca thực tế |
| Comparator | Mô hình survival đơn giản được xây dựng tốt; công cụ lâm sàng nếu có đủ biến và cùng mục tiêu |
| Validation | Chưa thiết kế; random holdout chỉ là internal test |
| Đánh giá | Discrimination, calibration, sai số dự báo, khoảng tin cậy; utility theo quyết định có cơ sở |
| Reporting | TRIPOD+AI cho prediction; STROBE/RECORD bổ trợ khi phù hợp thiết kế |

## 3. Bốn câu phải có bằng chứng trước khi chọn đề tài

### A. Kết quả hỗ trợ quyết định nào?

Xác định người sử dụng, thông tin họ đang có và hành động có thể thực hiện sau dự báo. Theo dõi hoặc hỗ trợ dự phòng là tình huống sử dụng cần thẩm định, chưa có xác nhận quy trình bệnh viện. Dự báo tốt không tự chứng minh giảm số ca mắc bệnh hoặc tiết kiệm chi phí.

### B. Đóng góp riêng là gì?

Đọc công trình gần nhất, không chỉ tổng quan. Tách ba việc: mô hình đã tồn tại; kết quả đã được kiểm định trên đâu; điều nào còn cần trả lời trên quần thể và quyết định định chọn. Không coi thay thuật toán, thêm SHAP, web demo hoặc chỉ có external validation là tính mới tự thân. Kết quả âm không mặc nhiên có giá trị nếu thiếu chính xác hoặc không giúp trả lời quyết định.

### C. Có dữ liệu đúng và đủ không?

Dùng [bảng kiểm dữ liệu](DATA_READINESS_VI.md). Quyền truy cập, codebook và dữ liệu thật phải được kiểm tra. Tổng số dòng không thay thế số người, số biến cố và độ dài theo dõi. Nếu không phân biệt được T2D, không tự đổi nhãn đái tháo đường chung thành T2D.

### D. Có làm được với nguồn lực hiện tại không?

Khoảng năm tháng là ràng buộc lập kế hoạch từ hồ sơ hiện có, không phải cam kết tiến độ. Chỉ ước lượng khối lượng sau khi biết thời gian xin dữ liệu, harmonization, xử lý outcome và hỗ trợ phương pháp. Giới hạn số so sánh và số dataset theo câu hỏi thật; không giảm rigor để khớp hạn.

## 4. Vòng nghiên cứu đầu tiên

### Vòng 1 — dựng bản đồ nhỏ

- Khoảng 6–8 nghiên cứu đại diện: mô hình lâm sàng nền; Cox so với survival ML/neural; kiểm định độc lập; công trình gần nhất với bài toán baseline, mắc mới.
- Phân biệt prognosis, phát hiện bệnh hiện có và dự báo biến chứng ở người đã mắc bệnh. Tài liệu ngoài mục tiêu chỉ là bối cảnh hoặc phương pháp.
- Ghi truy vấn, ngày tìm, URL/DOI/PMID, mức đã đọc và giới hạn. Xác minh nhận dạng bằng PubMed/CrossRef khi truy cập được.
- Mọi nhận định thực chứng có location và support. Không suy diễn từ abstract thành toàn bộ phương pháp đã được kiểm tra.

**Đầu ra:** `LITERATURE_SCAN_VI.md` và `evidence/literature_scan.json`. Đây là khảo sát có chủ đích, không có claim bão hòa tìm kiếm.

### Vòng 2 — đọc sâu các bài gần nhất

Chọn khoảng ba công trình từ vòng 1 theo mức trùng câu hỏi, không theo citation count. Kiểm tra cohort, nhãn, timing, preprocessing, tuning, calibration, xử lý censoring, nguồn công thức/code và tính khả thi tái lập. Phân biệt giá trị bằng chứng với khả năng tái lập.

**Đầu ra dự kiến:** bảng so sánh có claim provenance và một nhận định được giới hạn đúng: bài nào đã trả lời điều gì, phần nào vẫn chưa xác minh. Chưa tạo hồ sơ `searched_papers/` hoặc chuyển bài vào `chosed_papers/` trong giai đoạn thiết lập này.

### Vòng 3 — kiểm tra một đường dữ liệu thực tế

Anh có thể tìm và cung cấp nguồn dataset khác; em sẽ đối chiếu codebook và cấu trúc. Trước phân tích xác nhận, cần kiểm tra quyền dùng và bản dữ liệu cụ thể. Không suy từ việc có trang đăng ký thành đã được cấp quyền. Không xin tài khoản, ký thỏa thuận hoặc liên hệ tác giả thay anh trong hồ sơ này.

**Đầu ra dự kiến:** data-readiness report với số người đủ điều kiện, số biến cố theo horizon, thời gian theo dõi, missingness và điểm chưa giải quyết. Chưa dùng dữ liệu để chọn mô hình hay tối ưu trên final test.

### Vòng 4 — trình phương án cụ thể

Tổng hợp một đề xuất chính và tối đa một phương án thay thế nếu bằng chứng cần. Viết rõ câu hỏi, cohort, outcome, horizon, comparator, đánh giá, đóng góp có thể kiểm định và rủi ro còn lại. Anh quyết định; không tự tuyên bố đã chốt hoặc âm thầm nâng cấp phạm vi.

## 5. Trạng thái bằng chứng và việc tiếp theo

Vòng 1 là đầu ra ban đầu của lần thiết lập này. Vòng 2–4 còn phải thực hiện; không ghi thành đã hoàn tất. Hai luồng học và nghiên cứu có thể tiến hành song song. Anh có thể bắt đầu [bài 1](learning/LESSON_01_VI.md) trong khi phần khảo sát tiếp tục.

Ba bài ưu tiên cho vòng đọc sâu tiếp theo, dựa trên bản đồ hiện tại:

1. `huang2026_british_short_long_risk`: baseline, có mốc năm năm và kiểm định trên ELSA.
2. `xu2024_jphc_five_year`: dự báo năm năm trên cohort Nhật Bản và kiểm định ở cohort khác; vòng đầu mới đọc abstract.
3. `lugner2024_ukb_top_predictors`: thông tin baseline và mô hình rút gọn; horizon mười năm cần giữ riêng khi so sánh.

Danh sách này là thứ tự đọc để hiểu công trình gần nhất, không phải quyết định chọn baseline hoặc dataset. Nhận dạng và mức đã đọc được ghi trong [khảo sát vòng đầu](LITERATURE_SCAN_VI.md).

Các hợp đồng áp dụng: [Evidence policy](../../../docs/agent/EVIDENCE_POLICY.md), [Decision authority](../../../docs/agent/DECISION_AUTHORITY.md), [Experiment policy](../../../docs/agent/EXPERIMENT_POLICY.md). Các hợp đồng này chi phối việc chọn và thực hiện nghiên cứu sau này.
