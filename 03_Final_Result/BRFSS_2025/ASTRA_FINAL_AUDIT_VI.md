# Audit độc lập cuối — BRFSS 2025

| Kết luận | Đánh giá |
|---|---|
| Verdict xuất bản | **MAJOR REVISION** trước khi nộp tạp chí |
| Phần được bảo vệ | Benchmark mô tả, nội bộ, không trọng số; số liệu chính được kiểm tra lại từ dự đoán đóng băng |
| Điểm | **69/100 trước sửa → 82/100 sau sửa** |
| Phát hiện ban đầu | **0 FATAL · 4 MAJOR · 9 MINOR · 2 IMPROVEMENT** |
| Sau xử lý | 8 corrected; 2 partially_corrected; 4 accepted_limitation; 1 author_required |
| MAJOR còn thật sự tồn tại | Hai giới hạn thiết kế A01/A02; đã công khai, chưa và không thể sửa hồi tố |
| Thay đổi thí nghiệm đóng băng | Không; không refit, đổi split/nhãn/biến/ngưỡng hoặc tối ưu kết quả |

## 1. Phán quyết và phạm vi

Nghiên cứu vượt qua kiểm tra tính nhất quán tính toán cho **phân loại tình trạng đã được chẩn đoán đái tháo đường do người trả lời tự báo cáo**. Tuy nhiên, không đủ cơ sở gọi đây là so sánh xác nhận giữa bảy mô hình cùng được định trước khi thấy test. Việc chỉnh tài liệu tăng độ trung thực và khả năng kiểm tra, không tạo ra validation độc lập mới.

Không phát hiện bằng chứng giả tạo dữ liệu/kết quả trong các nguồn đã kiểm tra. Điều này không phải chứng nhận toàn diện về tác giả hoặc mọi nguồn bên ngoài. Không phát hiện trực tiếp biến cấu thành nhãn trong X, nhưng các biến bệnh đồng mắc và tiếp cận y tế có thể phản ánh hậu quả chẩn đoán. Kết quả không hỗ trợ incidence tương lai, Type 2 riêng biệt, chẩn đoán bằng xét nghiệm, nhân quả, hiệu năng đại diện dân số, tương đương thống kê, công bằng hoặc lợi ích lâm sàng.

## 2. Chấm điểm độc lập

| Lĩnh vực | Tối đa | Trước | Sau |
|---|---:|---:|---:|
| Câu hỏi và phạm vi | 8 | 6 | 7 |
| Nguồn và tính toàn vẹn dữ liệu | 8 | 7 | 8 |
| Nhãn và biến dự báo | 10 | 7 | 8 |
| Rò rỉ và pipeline | 12 | 7 | 8 |
| Thiết kế và so sánh mô hình | 10 | 8 | 8 |
| Validation và thống kê | 14 | 8 | 9 |
| Metrics, mất cân bằng và calibration | 10 | 7 | 9 |
| Tài liệu và chất lượng bằng chứng | 8 | 5 | 7 |
| Khả năng tái lập và mã nguồn | 8 | 6 | 7 |
| Báo cáo và diễn giải | 8 | 5 | 7 |
| Kỷ luật phát biểu và giới hạn | 4 | 3 | 4 |
| **Tổng** | **100** | **69** | **82** |

Đây là rubric đánh giá hồ sơ theo yêu cầu, không phải thang PROBAST đã được thẩm định hoặc xác suất được nhận bài. Điểm69 được lưu trước khi sửa nội dung trọng yếu (`qc/astra_pre_fix.json`). Lý do từng điểm sau sửa có trong `qc/astra_issue_ledger.json`. Điểm tăng chủ yếu nhờ truy xuất nguồn, tái tính, công khai giới hạn và sửa diễn giải; không nhờ tăng performance.

## 3. Bốn phát hiện MAJOR

**A01 — Mô hình được xây dựng tuần tự sau khi đã có kết quả trước đó.** Git ghi nhận LR results `3e557b2` trước DT implementation `20b29c9`, DT results `0b7cdfc` trước RF implementation `c68cda0`; tài liệu RF viện dẫn DT test-AUC. Mã thực thi không cho thấy tối ưu hyperparameter/ngưỡng riêng từng mô hình trên test, nhưng lịch sử không chứng minh cả roster và LR primary contrast đã được định trước lần xem test đầu tiên. Phải coi so sánh là mô tả/thăm dò. Thay chữ “prespecified” không sửa được giới hạn thiết kế này.

**A02 — Sàng lọc độ phủ biến đã nhìn phân phối toàn bộ cohort.** Feature freeze `c0d2431` có trước split `79c28c9`, dựa một phần vào missingness/coverage toàn file. Đây là sử dụng thông tin covariate của phần sau này trở thành test. Không tìm thấy supervised feature selector theo nhãn; median/scaling/encoding được fit trong training/folds. Hai nhận định đó cùng đúng. Không thể ước lượng mức optimism bằng chính holdout đã bị quan sát.

**A03 — Tài liệu tham chiếu bị diễn giải quá mức.** Muhammad et al. (2025) (alias P03 trong hồ sơ cũ) xếp pregnancy diabetes vào dương tính và prediabetes vào âm tính, khác nhãn của benchmark. Methods mô tả MICE/backward screening trước bước ML; train-only SMOTE không chứng minh tất cả bước đã cô lập trong từng fold. Không thể dùng P02–P05 như một chứng nhận chung về leakage-safe pipeline. Đã sửa literature review/matrix/notebook và claim-level audit. Sleep có tiền lệ trực tiếp ở Appendix của Xie et al. (2019) (P02); dẫn P03 cho sleep không được xác minh trong main text. PERSDOC3 được ghi là lựa chọn domain của nghiên cứu, chưa có bằng chứng trực tiếp tương ứng từ P02/P03.

**A04 — Supplement thiếu chi tiết đủ để tái lập.** Đã tìm được quy ước tái tạo chính xác sáu CI 5000: PCG64/default_rng seed 20251010, lấy mẫu phân tầng cùng respondent indices cho mọi model, nối positive rồi negative, **không shuffle**, percentile linear. Sai số endpoint tối đa dưới 1e−16. Đây là khôi phục quy trình khớp số, không phải tìm thấy script gốc. Calibration dùng hồi quy logistic chung intercept+slope với logit xác suất chặn ở epsilon 1e−6; tái tính khớp hệ số/SE trong 5e−9. Intercept chung không phải calibration-in-the-large (CITL); đã thêm phân biệt và độ nhạy clipping.

## 4. Dữ liệu, biến và pipeline

Nguồn CDC tải lại có SHA-256 giống bản lưu.356158 dòng gốc →342539 đủ điều kiện,51827 dương tính và290712 âm tính. Loại2671 pregnancy-only,10166 prediabetes/borderline,580 unknown,196 refused và6 thiếu nhãn. Split seed 42 tái tạo đúng68508 respondent IDs và nhãn theo đúng thứ tự trong artifact;10365 test events và41462 training events.

Raw XPT NAMESTR và layout chính thức đều có283 biến; pandas đọc đủ tên theo thứ tự. Codebook có282 mục, thiếu ICFQSTVR. Con số284 trên landing page không phù hợp với file và layout; không có bằng chứng parser làm mất cột. IDATE cho thấy phỏng vấn **05/01/2025–16/03/2026**, không chỉ trong năm 2025. Không có full-row duplicates, không trùng `_STATE`+`SEQNO`, không giao identity giữa train/test.365 test rows có cùng mẫu20 predictors với training không đồng nghĩa cùng người.

Đã kiểm tra20 biến, valid codes, missing sentinels và đơn vị từ codebook. BMI chia100, không coi9999 là missing sentinel; unhealthy days88→0,77/99→missing.16 categorical variables one-hot và4 numeric variables median+scale tạo82 cột ở training fit. Missingness theo eligible cohort có bảng riêng, không nhầm denominator với bảng sàng lọc raw-file cũ. `_RFCHOL3` có thể thiếu do chưa đo/routing; không được khẳng định MAR. Predictor timing trước chẩn đoán chưa biết.

Cả bảy bộ learning parameters khớp JSON đóng băng; XGBoost có thêm `verbosity=0` chỉ điều khiển logging.57 code cells giữ nguyên nội dung/AST so với mốc thực thi. No SMOTE, class weighting hoặc hyperparameter search trong benchmark. Nested CV không bắt buộc cho bảy cấu hình cố định không tuning; sẽ cần training-only nested selection nếu mở thí nghiệm tuning. CV mean/SD giữa năm folds không phải CI độc lập cho population performance.

DT không giới hạn độ sâu và RF100 trees không phải phiên bản tối ưu của hai họ thuật toán. Train–test gap lớn phản ánh overfitting của cấu hình cụ thể. Gaussian NB trên các cột one-hot vi phạm giả định Gaussian độc lập một cách rõ ràng, nên có giá trị baseline/stress test hơn là mô hình xác suất đáng tin cậy. LinearSVM sử dụng margin để tính ROC/AP; không gán Brier hoặc calibration cho margin thô.

## 5. Thống kê và kết luận cuối

Toàn bộ threshold metrics/confusion counts, ROC-AUC/AP/Brier được tính lại từ68508 dự đoán đóng băng. Sai khác rất nhỏ do lưu số thực vẫn dưới tolerance1e−6; không thay số primary.200 bootstrap/model và paired200 khớp ở mức dưới 1.1e−10;21 exact McNemar/Holm khớp dưới 5e−15.15/21 pairs có Holm p<0.05; cả sáu cặp giữa LR/GB/XGB/LinearSVM không rõ khác biệt về lỗi phân loại ở ngưỡng cố định. McNemar không kiểm định ROC-AUC.

LR ROC-AUC 0.82617, AP 0.44663; GB ROC-AUC 0.82602, AP 0.44832; XGB ROC-AUC 0.82629, AP 0.44171; LinearSVM ROC-AUC 0.82616, AP 0.44788. Các CI ghép cặp ROC của LR so với ba challenger đều cắt0. Không phát hiện khác biệt không chứng minh equivalence; cần margin và thiết kế tương đương được định trước nếu muốn kết luận đó.

LR−XGB AP delta 0.004919 có CI 95% gốc[0.000173;0.009649]. Ba stream5000 mới cho lower bound khoảng0.000045–0.000080; diagnostic Bonferroni cho family sáu contrasts đều chứa0. Sai số Monte Carlo ở tail gần2.5% khiến việc diễn giải endpoint rất nhỏ cần thận trọng. Không tuyên bố ưu thế xác nhận sau multiplicity. Bootstrap tail fraction không phải p-value định trước.

Always-negative accuracy 0.8487, trong khi LR 0.8558 nhưng recall chỉ0.1882 tại0.5. GNB recall 0.7082/F1 0.4400 đi cùng precision 0.3192, specificity 0.7307 và Brier 0.2523. GB Brier 0.10314 nhỏ hơn LR 0.10325 một chút; Brier là overall probability error, không tự nó chứng minh calibration tốt hơn. Không có một model thắng mọi tiêu chí.

Calibration slope rất nhạy với clipping ở các model có xác suất cực trị: epsilon 1e−6→1e−15 làm RF 0.67775→0.46655, DT 0.04334→0.01734, GNB 0.09697→0.05388. Không dùng các diagnostic fits để thay dự đoán primary. Sáu hình mới hiển thị AP đúng tên, số bin thực tế và giới hạn feature importance; DT chỉ có2 populated quantile bins.

## 6. Survey, reporting và bằng chứng

`_LLCPWT`, `_STSTR`, `_PSU` không làm predictors. Phân tích không trọng số hợp lý cho mục tiêu mô tả mẫu đã phân tích; không cho suy luận population performance. Bootstrap respondent có điều kiện trên fitted models và class counts, không chứa training/split variation, lựa chọn biến hay survey-design uncertainty. File bao gồm47 bang+DC+Guam+Puerto Rico, thiếuCalifornia/Mississippi/Nevada/USVI. Một phân tích weighted/design-aware riêng sẽ hữu ích nếu mục tiêu chuyển sang dân số; không được lẫn với primary hiện tại.

16/16 reference identities được đối chiếu CrossRef qua công cụ verify-refs, không phát hiện FABRICATED/MISMATCH. Đây chỉ là xác minh danh tính trích dẫn. Bằng chứng nội dung có mức direct/partial/contextual/unsupported trong `astra_literature_claims.json`; P04 full text, P03 supplemental DOCX và một số implementation claims chưa được chứng minh. Nguồn chưa truy cập được không được sử dụng để bảo đảm pipeline. Paper P07–P10 giữ vai trò bối cảnh, không làm chuẩn số hoặc bằng chứng trực tiếp cho nhãn/raw2025.

TRIPOD+AI52 subitems: **26 PRESENT,13 PARTIAL,5 MISSING,8 NA theo scope**. PRESENT không có nghĩa low risk of bias. PROBAST+AI concept audit nêu concern cao ở analysis nếu dùng để xác nhận chọn model/clinical validation; chưa hoàn thành official signaling form và không chứng nhận low risk. Bảng đặc điểm20 predictors full/train/test và ngày phỏng vấn đã thêm. Fitted estimators không có trong93-file artifact; code/config cho phép retrain nhưng không bảo đảm tái tạo bitwise phiên chạy cũ.

## 7. Giới hạn còn lại và việc cần tác giả

Hai MAJOR thiết kế A01/A02 tồn tại thực sự. Single internal split, self-report, temporal ambiguity, limited coverage, informative missingness, unweighted inference, conditional CIs và không có subgroup/fairness assessment vẫn giới hạn bài. Novelty chủ yếu là benchmark cùng pipeline và audit tái lập trên bản phát hành mới; chưa chứng minh lợi ích dự báo một câu trả lời có thể hỏi trực tiếp.

Ethics/waiver, funding, COI, protocol/registration, PPI và contributions vẫn **AUTHOR_REQUIRED**. Không tự suy ra “không tài trợ/không xung đột/miễn ethics”. Cần bản thảo và abstract theo tạp chí. GitHub artifact có thể hết hạn; chưa có archive lâu dài cho fitted models/predictions. Không báo “submission-ready” chỉ vì gate PASS.

## 8. Khuyến nghị và truy xuất

Có thể gửi **hồ sơ benchmark đã chỉnh** để phản biện phương pháp nội bộ. Chưa khuyến nghị nộp như nghiên cứu mô hình lâm sàng đã được validation. Nếu nhắm xuất bản rộng hơn, ưu tiên một protocol riêng được chốt trước truy cập outcome evaluation: chọn biến/threshold/tuning chỉ trên development, temporal hoặc geographic validation chưa bị quan sát, subgroup và survey-aware sensitivity phù hợp estimand. DCA chỉ khi xác định được quyết định thực tế, đối tượng và thresholds có cơ sở. Không thêm DCA/tuning để làm đẹp hồ sơ này.

Nguồn và đường dẫn: [CDC2025](https://www.cdc.gov/brfss/annual_data/annual_2025.html), [layout](https://www.cdc.gov/brfss/annual_data/2025/llcp_varlayout_25_onecolumn.html), [Xie2019](https://www.cdc.gov/pcd/issues/2019/19_0109.htm), [Muhammad2025](https://doi.org/10.1177/21501319251400546), [Li2024 §3.1](https://doi.org/10.1371/journal.pone.0311222), [TRIPOD+AI supplement](https://www.tripod-statement.org/wp-content/uploads/2024/04/TRIPODAI-Supplement.pdf), [PROBAST+AI](https://doi.org/10.1136/bmj-2024-082505). Các primary methods về survey metrics được ghi như định hướng nghiên cứu trong literature review, không dùng để đổi estimand hồi tố.

Đọc kèm [reviewer matrix](ASTRA_REVIEWER_MATRIX.md), [changelog](ASTRA_CHANGELOG.md), [final state](ASTRA_FINAL_STATE.md), [supplement methods](supplement/README.md). Mọi số audit truy về `02_Implementation/BRFSS_Survey/qc/`; pre-fix snapshot, issue ledger, source manifest, data/statistical/reference/reporting evidence được lưu riêng. Không có kết quả primary nào bị ghi đè.
