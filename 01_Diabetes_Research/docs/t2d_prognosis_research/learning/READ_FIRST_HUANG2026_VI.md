# Bài báo đọc đầu tiên: Huang 2026

Ngày chọn để đọc: **03/11/2026**. Đây là lựa chọn học và đối chiếu câu hỏi, chưa phải chọn paper baseline, dataset, protocol hoặc promote bài vào kho đã chọn.

**Cập nhật cùng ngày:** anh đã cung cấp PDF gốc. [Thư mục đọc](../../../searched_papers/Layer_3_Dataset_EHR/huang2026_british_short_long_risk/README.md) hiện có PDF, toàn văn trích xuất, phụ lục và phân tích chi tiết. Mở [bản giải thích tiếng Việt](../../../searched_papers/Layer_3_Dataset_EHR/huang2026_british_short_long_risk/READING_EXPLANATION_VI.md) để học từng phần. Ghi chú truy cập web bên dưới phản ánh lượt khảo sát trước khi nhận PDF.

## 1. Một bài cụ thể

**Cunrong Huang, Andre Lopes, Annie Britton (2026)** — *Improving Short- and Long-Term Type 2 Diabetes Risk Prediction for Middle-Aged British Adults*.

- Journal: *Diabetes, Obesity and Metabolism*.
- DOI: [10.1111/dom.71289](https://doi.org/10.1111/dom.71289).
- [PubMed — nhận dạng và abstract](https://pubmed.ncbi.nlm.nih.gov/42649111/).
- [Toàn văn PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC13646339/). Trang PMC gặp browser challenge trong lượt kiểm tra này; PubMed vẫn có abstract và liên kết toàn văn. Hồ sơ ban đầu đã ghi mức đọc chọn lọc toàn văn, chưa phải methodological audit đầy đủ.

## 2. Vì sao nên đọc bài này trước?

Nó gần với câu hỏi hiện tại: người chưa mắc bệnh, thông tin sức khỏe baseline, nguy cơ tương lai có mốc năm năm. Bài phát triển trên Whitehall II và kiểm định ở ELSA; có discrimination, calibration và decision curve analysis. Các điểm này được báo cáo trong Abstract / Materials and Methods và Conclusions.

**Một chi tiết phương pháp cần đọc đúng:** LASSO-Cox, RSF và best subset được dùng để chọn các bộ predictor; sau đó tác giả xây ba mô hình Cox. Đây không đơn thuần là phép so sánh mô hình dự báo cuối RSF với mô hình cuối Cox. Không dùng tên RSF để suy diễn vai trò của thuật toán.

Bài có cả mốc 5/10/15 năm. Lượt đầu anh chỉ tập trung cách họ đặt câu hỏi, dùng đầu vào và trình bày nguy cơ năm năm. Không cần tái lập toàn bộ bài hoặc hiểu mọi thuật toán trước khi đọc được ý chính.

## 3. Cách đọc trong một buổi khoảng 30–45 phút

| Phần | Việc cần làm |
|---|---|
| Abstract | Gạch dưới đối tượng, outcome, horizon, dataset phát triển và dataset kiểm định |
| Introduction | Viết một câu: tác giả nói công cụ của họ cần thiết vì điều gì? Đây là lập luận của tác giả, chưa phải khoảng trống của mình |
| Methods và flow chart | Xác định người nào được đưa vào/loại, baseline nằm ở đâu, disease outcome ghi nhận bằng gì |
| Methods — predictors/models | Tách vai trò chọn biến khỏi thuật toán dự báo cuối |
| Results | Tìm cách họ phân biệt discrimination, calibration và utility; đọc phần năm năm trước |
| Discussion/limitations | Ghi hai giới hạn và điều chúng làm mình chưa thể kết luận |

Lần đầu chưa cần tính lại C-index, học công thức Cox hoặc học cách dựng nomogram. Từ khó tra ở [từ điển](GLOSSARY_VI.md); timing và censoring xem lại [Bài 1](LESSON_01_VI.md).

## 4. Sáu câu anh thử trả lời

1. Người tham gia là ai và tác giả loại người đã mắc bệnh ban đầu như thế nào?
2. Dự báo được đưa ra ở thời điểm nào, cho khoảng tương lai nào? Horizon có khác follow-up không?
3. Mô hình được biết những thông tin gì tại thời điểm dự báo?
4. Thuật toán nào chọn biến, thuật toán nào tạo dự báo cuối?
5. Họ kiểm tra mô hình trên ai? Discrimination và calibration lần lượt trả lời điều gì?
6. Bài này cho thấy điều gì có thể học theo, và chưa chứng minh điều gì cho đề tài của mình?

Mỗi câu chỉ cần 2–3 dòng; thêm section/table/page nếu tìm được. Nếu chưa hiểu hoặc chưa thấy trong nguồn, ghi **UNKNOWN/chưa hiểu**. Đây là phiếu đọc để cùng thảo luận, không phải bài kiểm tra phải làm hoàn hảo.

## 5. Đối chiếu hai kết quả tìm kiếm anh gửi

Đã đủ đầu mối để chuyển từ tìm rộng sang đọc một bài. Chưa cần thêm bảng tổng quát ở bước này. Toàn bộ bảng AI vẫn là đầu vào cần kiểm chứng; mức “đã đọc toàn văn” trong bảng là mức công cụ đó tự báo, không phải mức đọc đã xác nhận của nhóm.

- **Nhận dạng Sasagawa:** DOI `10.1097/HJH.0000000000003626` và PMID `38088426` thuộc Sasagawa và cộng sự; chữ “Ikeda” ở bảng Perplexity là nhầm tác giả. [PubMed](https://pubmed.ncbi.nlm.nih.gov/38088426/).
- **Wu 2021:** bảng Sonnet ghi external validation NAGALA có căn cứ. Bài gốc nêu cohort Nhật Bản dùng kiểm định ngoài trong *Statistical Analysis* và *External Validation*. Ghi chú trước của trợ lý mới nhấn mạnh random internal split, cần bổ sung điều này. Điều đó không xóa vấn đề loại censored/complete-case đã ghi trước. [Nguồn gốc](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2021.626331/full).
- **Review và preprint:** có thể giúp tìm nguồn, nhưng không được tính như một cohort gốc peer-reviewed tương đương chỉ từ bảng tổng hợp. UNKNOWN về calibration không có nghĩa là bài không làm calibration.
- **Cai, Satoh, Ravaut và Lee:** giữ làm đầu mối sau; lượt này chưa xác nhận toàn bộ cột phương pháp/dataset của các bảng. Đọc trước Huang không phải đánh giá các bài còn lại kém hơn.

Nhật ký tiếp nhận và claims được kiểm tra: [human_results_review_20261103.json](../evidence/human_results_review_20261103.json). Sau buổi đọc này mới quyết định cần thêm toàn văn, phụ lục hoặc tìm một câu hỏi cụ thể nào.
