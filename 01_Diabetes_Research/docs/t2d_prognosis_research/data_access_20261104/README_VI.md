# Tiếp cận dữ liệu WHII và ELSA

Cập nhật 04/11/2026. Mục tiêu hiện tại là kiểm tra khả năng tiếp cận dữ liệu cho tiên lượng T2D và tái lập phương pháp Huang 2026. Chưa chốt dataset, giả thuyết hoặc thời hạn dự báo của nghiên cứu mới.

## Độ phù hợp với câu hỏi nghiên cứu

| Nguồn | Đánh giá cho dự đoán mắc mới theo thời gian |
|---|---|
| WHII | Sát nhất nếu muốn tái lập phần phát triển mô hình của Huang. Cần được cấp đúng dữ liệu và xác minh biến, thời điểm ghi nhận bệnh, cách kiểm duyệt. |
| ELSA | Sát phần đánh giá bên ngoài của Huang; có thể xem xét cho nghiên cứu độc lập. Cần audit kết cục tự báo cáo, xét nghiệm và số biến cố thực nhận. |
| CHARLS | Cũng là dữ liệu theo dõi dọc; chưa có căn cứ xếp dưới WHII/ELSA cho mọi đề tài. Cần so quần thể, xét nghiệm, cách nhận diện ca mắc mới và quyền dùng. |
| BRFSS / continuous NHANES thông thường | Chủ yếu là dữ liệu cắt ngang. Có giá trị cho sàng lọc hoặc hiện mắc; các tệp thông thường không tự cung cấp một cohort theo dõi T2D như bài Huang. Ghép các chu kỳ không biến thành theo dõi cùng người. Các nguồn liên kết hoặc nghiên cứu follow-up riêng cần đánh giá riêng. |

Đây là đánh giá độ khớp thiết kế, chưa chứng minh dataset nào tốt nhất. Nhãn diabetes không tự bảo đảm phân biệt được type 2, và nhiều wave không tự bảo đảm ngày xảy ra bệnh chính xác.

## Hai đường tiếp cận

**ELSA:** [trang truy cập chính thức](https://www.elsa-project.ac.uk/accessing-elsa-data) dẫn đến UK Data Service. Người dùng ngoài Anh có thể yêu cầu username; dữ liệu End User Licence có đường tiếp cận khác với Special Licence/Secure Access. Phải kiểm tra đúng release và biến cần dùng sau khi được cấp quyền. [Biểu mẫu username](https://beta.ukdataservice.ac.uk/myaccount/credentials).

**WHII:** đã gửi thư hỏi điều kiện tới `whitehall2@ucl.ac.uk`. [Trang UCL](https://www.ucl.ac.uk/brain-sciences/psychiatry/research/mental-health-older-people/projects/whitehall-ii/data-sharing/collaborating-whitehall-ii) mô tả tuyến cộng tác và tuyến DPUK. Tuy nhiên cổng DPUK hiện chuyển tới [NDP Dementias Hub](https://dementiashub.ndp.serp.ac.uk/), nơi thông báo báo giá cho yêu cầu mới. Không dùng thông tin DPUK miễn phí trên trang cũ làm cam kết hiện tại. Chờ xác nhận tuyến áp dụng, giá và điều kiện sinh viên từ đơn vị quản lý.

[Quy trình NDP hiện hành](https://dementiashub.ndp.serp.ac.uk/apply-for-access/application-process-2025/) yêu cầu sinh viên có academic sponsor/supervisor làm Lead Researcher; dữ liệu được phân tích trong môi trường từ xa. [Applicant Guide](https://dementiashub.ndp.serp.ac.uk/wp-content/uploads/2026/10/NDP_Dementias_Hub_Applicant_Guide.pdf) còn yêu cầu CV và hồ sơ bổ sung khi dùng AI/ML. Chưa có hồ sơ NDP được nộp, hợp đồng được ký hoặc khoản phí được cam kết.

## Hồ sơ đã chuẩn bị

- [Nội dung khoa học sơ bộ bằng tiếng Anh](APPLICATION_CORE_EN.md): để hoàn thiện hồ sơ sau khi có codebook và xác nhận quyền tiếp cận.
- [Nội dung thư WHII](WHII_ENQUIRY.html): đã gửi từ email trường; xác nhận gửi trong [trạng thái](STATUS.json).
- [Nguồn và bằng chứng](access_evidence.json): phân biệt thông tin từ bài báo với quy trình truy cập hiện hành.
- [Nhật ký tải biểu mẫu](official_forms/manifest.json): mỗi URL đã thử một lần và đều trả HTTP 403. Các tệp gốc chưa tải được; đường dẫn chính thức được giữ trong nhật ký, không thử thêm tuyến tải.

Anh đã trực tiếp xác minh email, tạo mật khẩu và chấp nhận điều khoản; em điền các thông tin được cung cấp và gửi yêu cầu username. Chữ ký, tài khoản người hướng dẫn và thỏa thuận dữ liệu riêng vẫn do người có thẩm quyền thực hiện. Hồ sơ không chứa mật khẩu, mã xác thực hoặc địa chỉ nhà. Ghi chú, highlights và PDF của bài Huang được giữ nguyên.

## Nguồn đối chiếu thiết kế

- [CHARLS — mô tả của Peking University](https://www.isss.pku.edu.cn/english/data/charls/index.htm).
- [BRFSS — thiết kế khảo sát của CDC](https://portugues.cdc.gov/brfss/data_documentation/index.htm).
- [NHANES — mô tả mẫu cắt ngang trong tài liệu phương pháp NCHS](https://www.cdc.gov/nchs/data/datalinkage/2019ndi-linkage-methods-and-analytic-considerations-508.pdf), §2.1.2.
