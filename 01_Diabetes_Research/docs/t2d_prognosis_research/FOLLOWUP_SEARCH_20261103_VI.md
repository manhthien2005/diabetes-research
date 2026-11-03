# Lượt tìm bổ sung và phối hợp tìm bài — 03/11/2026

## Nhận định hiện tại

**Chưa có bằng chứng cần đổi hướng vì đề tài đã hết giá trị hoặc không tồn tại dữ liệu.** Bài toán chung đã có nhiều tiền lệ; tính mới của nghiên cứu riêng chưa được xác định. Khả thi chưa thể xếp là thấp hay cao khi chưa kiểm tra codebook, quyền dùng và số biến cố của dataset thật. Việc một bài mới được xuất bản không tự chứng minh chất lượng hoặc đóng góp của đề tài riêng.

Giữ hướng baseline prognosis để khảo sát. Không chốt dataset, horizon, thuật toán hoặc các hướng nâng cấp đang tạm gác.

## Ba bài đang có nên đối chiếu trước

| Bài trong hồ sơ | Vì sao sát | Giới hạn cần giữ |
|---|---|---|
| `huang2026_british_short_long_risk`, DOI [10.1111/dom.71289](https://pubmed.ncbi.nlm.nih.gov/42649111/) | Baseline health data, có nguy cơ năm năm, phát triển Whitehall II và external validation ELSA. Bài online 26/08/2026, số báo 11/2026. | Lượt này kiểm tra lại PubMed/định danh; nội dung toàn văn chọn lọc đã đọc ở vòng đầu. Chưa xác minh quyền truy cập dữ liệu hoặc tính phù hợp riêng với mình. |
| `xu2024_jphc_five_year`, DOI [10.2188/jea.JE20220329](https://www.jstage.jst.go.jp/article/jea/34/4/34_JE20220329/_article) | Dự báo năm năm từ chỉ số thường quy, JPHC phát triển và J-ECOH kiểm định; có comparator không xét nghiệm và có xét nghiệm. | Hiện vẫn mới đọc abstract/metadata, chưa audit toàn bộ attrition và censoring; logistic ở horizon cố định không tự động là thiết kế sai. Trang chính thức có link PDF. |
| `sasagawa2024_deepsurv_jecoh`, DOI [10.1097/HJH.0000000000003626](https://pubmed.ncbi.nlm.nih.gov/38088426/) | So sánh DeepSurv và Cox, liên quan trực tiếp việc tìm hiểu neural survival. | Horizon bảy năm; outcome diabetes chung và internal split cùng cohort. Không coi là bằng chứng thuần T2D hoặc độc lập về khả năng chuyển quần thể. |

Các bài này đã có trong khảo sát tám nghiên cứu, không được tính là ba phát hiện mới. DOI/title/first-author được đối chiếu CrossRef và PubMed; lỗi 429 ở lượt gọi đầu được giữ trong nhật ký. Không có notice correction/retraction trong metadata CrossRef đã kiểm tra, nhưng đây không phải integrity audit toàn diện. Riêng JPHC có thông tin cập nhật phiên bản online trên J-STAGE; chưa xác định có thay đổi thực chất nào và cần đọc tài liệu trước khi tái lập.

## Đầu mối bổ sung: công bố và dataset là hai thứ khác nhau

`wu2021_three_year_incident_diabetes`, DOI [10.3389/fpubh.2021.626331](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2021.626331/full), là một nghiên cứu baseline dùng ML/chọn biến để dự báo mắc mới diabetes ba năm trên dữ liệu RICH. Đã đọc chọn lọc Abstract, Study Design and Participants, Discussion và Data availability statement. DOI/title/first-author xác minh được qua CrossRef và PubMed.

**Điểm phương pháp phải ghi lại:** phần *Study Design and Participants* nói nghiên cứu loại người mất theo dõi trong ba năm và loại dữ liệu censored. Đây là lý do phải thẩm định selection/attrition trước khi dùng làm mẫu; không sao chép pipeline chỉ vì bài gần đề tài. Chưa đánh giá risk of bias toàn bài, không kết luận mô hình chắc chắn sai và không suy dữ liệu gốc không dùng được.

Đề xuất tạm thời cho bài này: `needs_more_review`, Layer 2, `long_term_risk`; có thể là evidence candidate về tiền lệ và phương pháp cần kiểm tra. Chưa gán reproduction candidate vì chưa audit dữ liệu/code. Không tạo paper folder, promote hoặc reject.

Nguồn dữ liệu RICH được [Dryad chính thức](https://datadryad.org/dataset/doi:10.5061/dryad.ft8750v) liệt kê một workbook. Metadata mô tả baseline chưa có bệnh và follow-up; trung vị theo dõi 3,1 năm. Vì vậy, nguồn dữ liệu có tồn tại nhưng không thể mặc định đủ thông tin để dự báo năm năm. Chưa tải workbook, chưa xác minh nhãn subtype T2D, codebook hoặc số ca thực tế tại horizon. NAGALA cũng đã có trong [bảng kiểm dữ liệu](DATA_READINESS_VI.md), chưa là dataset được chọn.

## Phối hợp với anh

Anh có thể dùng [prompt tìm bài](HUMAN_SEARCH_PROMPT_VI.md) để tìm trên công cụ khác và gửi kết quả. Phần trợ lý tập trung đối chiếu bài gốc, nhãn, timing, cách xử lý follow-up và đường dữ liệu. Kết quả của hai bên sẽ được khử trùng theo DOI/PMID. Một bài private có thể có giá trị bằng chứng dù không tái lập được; một dataset public vẫn phải kiểm tra khả thi.

Nhật ký nguồn, truy vấn và claims của lượt này: [followup_search_20261103.json](evidence/followup_search_20261103.json). Đây vẫn là tìm có mục tiêu, chưa phải systematic review hoặc kết luận đã tìm đủ.
