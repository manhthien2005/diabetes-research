# Cai 2021 — bộ tài liệu đọc và chuẩn bị tái lập

Cập nhật: **05/11/2026** · DOI: **10.2147/DMSO.S304994** · NAGALA · Dự báo mắc mới T2D trong 5 năm.

**Bắt đầu bằng [bản giải thích tiếng Việt](READING_EXPLANATION_VI.md), rồi đọc bài gốc song song với bản dịch.** Đây là bài thực hành để hiểu quy trình LASSO → Cox → nomogram; chưa phải đề tài cuối cùng hoặc mô hình đã tái lập.

## Mở tài liệu

| Tài liệu | Nội dung |
|---|---|
| [Research Hub — đọc và đánh dấu](http://127.0.0.1:3000/paper/Layer_3_Dataset_EHR/cai2021_nonobese_five_year) | Chọn **PDF + Bản dịch**, **Đọc song ngữ** hoặc **Ghi chú**. Web cần chạy trên máy anh. |
| [PDF gốc — 15 trang](source.pdf) | Bản xuất bản, trang tạp chí 2087–2101. |
| [Toàn văn tiếng Việt](extracted.vi.md) | Dịch toàn bộ phần văn bản và chú thích; giữ số liệu, bảng và trích dẫn. |
| [Toàn văn tiếng Anh](extracted.md) | Bản đọc đối chiếu với PDF và XML của nhà xuất bản. |
| [Giải thích để học](READING_EXPLANATION_VI.md) | Câu hỏi nghiên cứu, cách hiểu thuật ngữ, pipeline và thứ tự đọc. |
| [Phân tích phương pháp](analysis.html) | Tám phần phân tích, bảng kiểm 48 mục, tính giá trị và khả năng tái lập. |

## Đọc với ba câu hỏi

1. Họ xác định ai chưa mắc bệnh tại thời điểm ban đầu, theo dõi bao lâu và ghi nhận biến cố như thế nào?
2. LASSO chọn biến rồi Cox ước tính nguy cơ 5 năm ra sao? AUC, C-index, calibration và DCA trả lời những câu hỏi khác nhau nào?
3. Nếu tự dựng lại, mình đã có đủ dữ liệu, định nghĩa biến, cách chia tập, hệ số và baseline survival chưa?

## Những giới hạn cần biết trước

- Phần dịch giữ nguyên cả phát biểu và bất nhất của tác giả. Nhận xét phê bình nằm trong bản phân tích, không chen vào toàn văn dịch.
- Có **3 bảng, 7 hình và 73 tài liệu tham khảo**. Chú thích hình được dịch; chữ bên trong ảnh gốc và danh mục tài liệu tham khảo giữ nguyên tiếng Anh.
- Chia ngẫu nhiên trong cùng NAGALA là **kiểm định nội bộ**, chưa chứng minh khả năng dùng trên quần thể Việt Nam.
- Dataset công khai được bài báo dẫn tới [Dryad](https://datadryad.org/dataset/doi:10.5061/dryad.8q0p192). Tệp dữ liệu và codebook chưa được tải, kiểm tra ở bước này; mã chạy gốc và seed chưa được xác minh. Việc dựng lại phương pháp có triển vọng nhưng chưa thể hứa khớp từng con số.
- Chưa chạy mô hình, chưa chọn dataset cuối cùng, chưa chuyển bài vào `chosed_papers/`.

## Nguồn và kiểm tra chất lượng

PDF gốc từ kho phân phối công khai của NCBI; XML nhà xuất bản qua [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8123981/fullTextXML). Bản xuất bản mang giấy phép **CC BY-NC 3.0**; bản dịch phục vụ đọc và học, không phải bản dịch được tác giả phê duyệt. Giữ tên tác giả, DOI và nguồn khi sử dụng.

Các tệp kiểm tra: [trích xuất](extraction_manual_review.md), [đối chiếu bản dịch](translation_report.json), [kiểm tra bộ đọc](reading_pack_validation.json), [claims và nguồn](summary.json), [rà soát phương pháp](rob_audit.json). Tệp `extracted.prev.md` giữ kết quả Docling ban đầu; `source.fulltext.xml` giữ nguyên XML nguồn. Các hình gốc nằm trong `figures/`; web dùng bản WebP nhẹ với cùng nội dung.

## Làm rõ khả năng tái lập — 05/11/2026

**Dataset được công khai trên Dryad.** Trang chính thức liệt kê `Data set Int J Obesity.xlsx` (3.26 MB). Lần thử tải trực tiếp bằng công cụ trả HTTP 403, nên chưa có tệp để kiểm tra. Không suy từ lỗi này rằng dữ liệu không public. Xem [bản kiểm tra](data_access_check_20261105.json).

**Dựng lại phương pháp để học: mức trung bình, có điều kiện**, cần tải và kiểm tra workbook/codebook. **Khớp chính xác kết quả tác giả: chưa xác nhận**, do chưa kiểm chứng code gốc, seed chia tập và một số cấu hình. Nhãn `low` trước đây xét mục tiêu khớp chính xác và đã gây hiểu nhầm khi hiển thị chung trên web; đánh giá hiện tại đã tách hai mục tiêu.
