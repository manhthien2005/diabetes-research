# 🎓 TO_DO.md — Lộ trình xây một bài báo có thể phản biện được

> **Viết cho:** anh (sinh viên NCKH) · **Ngày:** 2026-07-26 · **Người viết:** Claude (agent của dự án)
> **Căn cứ:** 40 bài trong `searched_papers/` (35 bài đã deep-analyze), `QA_LOG.md` Q001–Q006,
> `DECISION_BOARD.md`, `READING_LIST.md`, `RESEARCH_BRIEF.md`, + kiểm chứng web ngày 26/07/2026.
> **Ràng buộc anh đã chốt:** deadline **3–6 tháng** · đầu ra **để em tư vấn** ·
> dữ liệu **"chạy tốt trên bộ chuẩn trước, lấy đó làm chuẩn để xin data bệnh viện"** ·
> **chưa từng viết bài báo khoa học**.

---

> ## ⚠️ CẬP NHẬT 2026-07-26 (chiều) — ĐỌC TRƯỚC KHI ĐỌC TIẾP
>
> Anh phản hồi rằng file này khiến anh thấy **đề tài quá rộng** và **ngán đọc paper**.
> Phản hồi đó đúng. File này viết ra **đích đến đầy đủ**, không phải **việc bắt buộc phải xong**.
>
> **→ Hãy đọc [START_HERE.md](START_HERE.md) trước.** Ở đó em đã cắt xuống còn **3 việc bắt buộc**
> (Tầng 0), phần còn lại là nâng cấp tuỳ chọn.
>
> **→ §6 (danh sách đọc) đã bị thay thế** bởi [CHEATSHEET.md](CHEATSHEET.md): mọi thông tin cần
> thiết đã được trích sẵn, anh chỉ mở PDF khi cần xác minh một con số. Số bài thật sự phải đọc: **2**.
>
> **→ Phase 2 bước 1 ĐÃ XONG:** [src/build_nhanes.py](src/build_nhanes.py) đã chạy thật trên máy anh
> (4.170 mẫu · prevalence có trọng số 3.91% · kiểm tra chống rò rỉ ĐẠT).

## §0. Cách dùng file này

File này **không phải danh sách việc vặt**. Nó là một **lập luận** gồm 4 tầng, đọc theo thứ tự:

| Tầng | Mục | Trả lời câu hỏi |
|---|---|---|
| **A. Chẩn đoán** | §1 | Anh đang ở đâu? Cái gì đang cản anh? |
| **B. Quyết định** | §2–§4 | Làm ĐỀ TÀI GÌ, CHỨNG MINH GÌ, bằng DỮ LIỆU NÀO |
| **C. Thi công** | §5–§8 | Làm THẾ NÀO, theo thứ tự nào, cần học gì, chạy trên đâu |
| **D. Phòng thủ** | §9–§12 | Reviewer sẽ đánh vào đâu, anh trả lời thế nào, khi nào thì DỪNG |

Ô `[ ]` là việc cần tick. **Đừng nhảy xuống §5 đọc lịch trước** — không hiểu §2 thì lịch vô nghĩa.

---

# TẦNG A — CHẨN ĐOÁN

## §1. Anh đang ở đâu (thật lòng)

### 1.1. Ba thứ anh đang có mà 90% sinh viên NCKH không có

Em nói cái này không phải để khen. Nói để anh **biết mình đang đứng trên cái gì**, vì phần lớn
những gì em đề xuất bên dưới chỉ khả thi *nhờ* ba thứ này:

1. **Một kho 40 bài đã được gate cứng và đọc sâu.** Mỗi bài có `summary.json` với
   `best_metric` truy được đến `Table X`, và có mục "gap/hạn chế" cụ thể. Đây là thứ người ta
   thường mất 6 tháng đầu để làm. Anh đã xong.
2. **Một mũi nhọn đã được tranh luận và chốt** (QA_LOG Q001→Q004): leakage-safe + external
   validation + đánh giá trung thực kiểu lâm sàng. Đây là hướng ĐÚNG, em không sửa.
3. **Một quan hệ với bác sĩ** — thứ quyết định bài này có "sống" ngoài đời hay chỉ là bài tập.

### 1.2. Một thứ đang giết anh: **anh đang đọc mà không có "chỗ để cất"**

Anh nói: *"anh không biết làm gì ngoài việc đọc các bài báo một cách vô nghĩa"*.

Chẩn đoán: **không phải anh đọc sai bài. Anh đọc mà chưa có một CÂU HỎI để mỗi bài trả lời vào.**
Đọc paper không có câu hỏi thì giống đổ nước vào rổ — đọc bao nhiêu cũng thấy trống.

Cách chữa duy nhất: **chốt một câu claim TRƯỚC, rồi đọc để phục vụ nó.** Từ giây phút anh có
câu claim, mỗi bài báo lập tức rơi vào đúng 1 trong 4 ô:

| Ô | Vai trò của bài báo | Anh làm gì với nó |
|---|---|---|
| **Nền** | Cho anh phương pháp / thiết kế để dùng lại | Đọc kỹ, chép protocol |
| **Đối thủ** | Gần đề tài anh nhất — anh phải hơn nó ở điểm nào | Đọc kỹ nhất, tìm khe hở |
| **Bằng chứng gap** | Chứng minh vấn đề anh nêu là THẬT | Trích số vào Introduction |
| **Related work** | Chỉ để trích dẫn, không dùng | Đọc abstract + bảng metric, xong |

§6 bên dưới đã xếp sẵn 40 bài của anh vào 4 ô này. Nhưng nó chỉ có nghĩa **sau khi** anh đọc §2.

### 1.3. Một thứ sẽ giết anh nếu không xử lý: **chưa từng viết bài báo**

Đây là rủi ro lớn nhất trong 3–6 tháng, lớn hơn cả rủi ro kỹ thuật. Vì:
- Code chạy ra số ≠ có bài báo. Khoảng cách giữa hai thứ đó thường là **6–8 tuần**.
- Người chưa viết bao giờ hay mắc lỗi: làm hết thí nghiệm rồi mới ngồi viết → phát hiện thiếu
  một thí nghiệm bắt buộc → phải chạy lại → trễ deadline.

**Cách chữa (áp dụng từ tuần 1, không đợi):** viết bài báo **ngược** — viết Bảng kết quả rỗng
trước, rồi đi làm thí nghiệm để điền vào. Chi tiết ở §5 Phase 0.

---

# TẦNG B — QUYẾT ĐỊNH

## §2. Chốt đề tài (đây là phần quan trọng nhất file này)

### 2.1. Câu claim đề xuất — đọc kỹ từng chữ

> **"Trên bài toán sàng lọc đái tháo đường CHƯA ĐƯỢC CHẨN ĐOÁN bằng biến không-xét-nghiệm,
> phần lớn khoảng cách hiệu năng mà tài liệu công bố giữa mô hình học máy và thang điểm
> lâm sàng sẽ TỰ BIẾN MẤT khi ta (a) chặn rò rỉ đúng cách, (b) đánh giá ở tỉ lệ mắc thật
> bằng AUPRC + calibration + net benefit, và (c) kiểm chứng ngoại vi sang quần thể khác.
> Chúng tôi ĐỊNH LƯỢNG chính xác mỗi yếu tố ăn mất bao nhiêu phần trăm, và giao lại một
> protocol + bộ code tái lập được."**

### 2.2. Vì sao là chính nó — 7 lý do, mỗi lý do là một lớp phòng thủ

**(1) Nhãn và feature tách bạch BY DESIGN → leakage-safe không phải cố gắng, mà là cấu trúc.**

Đây là điểm đẹp nhất của đề tài. "Đái tháo đường chưa được chẩn đoán" được định nghĩa bằng
**xét nghiệm** (HbA1c ≥ 6.5% hoặc đường huyết đói ≥ 126 mg/dL hoặc OGTT 2h ≥ 200 mg/dL, ở người
**tự khai chưa từng được bác sĩ chẩn đoán**). Còn feature của anh là **không-xét-nghiệm**: tuổi,
giới, BMI, vòng eo, huyết áp, tiền sử gia đình, hút thuốc, vận động.

→ Feature **không thể** chứa biến định nghĩa nhãn. Cái bẫy đã giết `zhang2020` (đường niệu là
biến #1 mà nhãn lại định nghĩa bằng đường huyết), `deberneh2021` (FPG vừa là nhãn vừa là feature),
`lai2019` (FBS), `fazakis2021` (fglu/hba1c), `olisah2022` (relabel theo glucose → ORF 100%)
— **không áp dụng được cho anh**. Anh miễn nhiễm ngay từ thiết kế.

So sánh với hướng "staging 3 lớp" ở Q006: hướng đó **rò rỉ nhãn kép** và anh phải liên tục
biện hộ. Hướng này thì không cần biện hộ gì cả.

**(2) Nó có ý nghĩa lâm sàng thật, và đúng thứ bác sĩ của anh quan tâm.**

Mô hình no-lab = **một bảng câu hỏi + cái thước dây + máy đo huyết áp**. Không lấy máu, không
tốn tiền, làm được ở trạm y tế xã. Đây là thứ có thể triển khai ở Việt Nam thật, khác hoàn toàn
với "AUC 0.95 trên PIMA". Khi anh cầm cái này đi gặp bác sĩ, câu chuyện là:
*"Em có pipeline đã kiểm chứng trên 2–3 quần thể quốc gia, giờ em muốn xem nó chạy thế nào trên
bệnh nhân Việt Nam"* — đó là một lời đề nghị **hợp tác nghiên cứu**, không phải xin xỏ dữ liệu.
Đây chính xác là chiến lược anh đã nói.

**(3) Dữ liệu chuẩn có sẵn, MIỄN PHÍ, đúng loại — và cho phép external validation THẬT.**

Chi tiết ở §4. Tóm tắt: **NHANES** (Mỹ, tải ngay không đăng ký) → huấn luyện; **KNHANES**
(Hàn Quốc, miễn phí) và/hoặc **CHARLS** (Trung Quốc, đăng ký free ~1 tuần) → kiểm chứng ngoại vi
trên quần thể **khác chủng tộc, khác quốc gia, khác tỉ lệ mắc**. Đây là external validation loại
mạnh nhất (cross-population), không phải loại yếu (random split).

**(4) Anh đã có 6 bài neo trong kho — anh KHÔNG bắt đầu từ số 0.**

`yu2010` (NHANES no-lab SVM, 457 cite) · `dinh2019` (NHANES, có-lab vs no-lab, 434 cite) ·
`choi2014` (KNHANES + external năm sau, 111 cite) · `sgchoi2023` (KNHANES no-lab + external
temporal + SHAP, 40 cite) · `zhang2020` (no-lab GBM 0.817 + AUPR + PPV thật) ·
`lugner2024` (hình mẫu báo cáo trung thực: Acc 0.92 nhưng PR-AUC 0.29).

**(5) Đối thủ gần nhất đã tự để lộ khe hở — và nó nằm đúng chỗ anh cắm cờ.**

Bài medRxiv 2025.09.05.25335151 (*ML vs FINDRISC*, đối thủ được cảnh báo từ Q002) kết luận:
> *"without laboratory data, FINDRISC still matches or exceeds ML"*

Nghĩa là: **họ đã thấy hiện tượng nhưng chỉ báo cáo nó như một nhận xét phụ.** Họ không:
- phân rã xem *bao nhiêu phần* của khoảng cách là do leakage, bao nhiêu do đánh giá sai chỉ số,
  bao nhiêu do không external;
- đánh giá bằng **net benefit / decision curve** (thứ trả lời "dùng thì có lợi hơn không dùng không");
- kiểm chứng chéo **quần thể** (chỉ external trong cùng khung dữ liệu).

Anh làm đúng ba thứ đó. **Từ "nhận xét phụ của người khác" thành "kết quả chính có định lượng của anh"** —
đây là một dạng đóng góp hợp lệ và rất khó bị chê incremental.

**(6) Có một khe hở kỹ thuật mà em vừa kiểm chứng được trong chính kho của anh.**

NHANES **không phải mẫu ngẫu nhiên đơn giản** — nó là *complex survey* có trọng số mẫu
(`WTMEC2YR`/`WTSAF2YR`), có phân tầng (`SDMVSTRA`) và cụm (`SDMVPSU`). Nếu không dùng trọng số,
mọi con số anh báo cáo **không ước lượng cho dân số Mỹ**, mà chỉ cho cái mẫu đã bị lấy quá đại diện
ở vài nhóm.

Em đã grep toàn bộ `extracted.md`:
- **`dinh2019`** (434 cite, NHANES): **0 lần** nhắc survey weight / complex survey / WTMEC.
- **`yu2010`** (457 cite, NHANES): có dùng **SUDAAN** — nhưng **chỉ cho mô hình hồi quy logistic
  đối chứng**, còn SVM thì không. Tức là **so sánh bất đối xứng**: baseline thống kê được xử lý
  đúng thiết kế khảo sát, còn mô hình ML thì không.

→ Đây là một quan sát phương pháp luận **mới, cụ thể, kiểm chứng được, và rẻ để sửa**. Nó cho anh
một đóng góp phụ rất "sạch": *đánh giá có nhận thức về thiết kế khảo sát (survey-design-aware
evaluation) cho mô hình ML trên NHANES*.

> ⚠️ **Anh phải tự xác minh lại** hai điều này bằng cách mở `source.pdf` của `yu2010` và
> `dinh2019` đọc phần Methods, trước khi viết vào bài. Grep có thể sót. Đây là **claim về người
> khác** — sai là mất uy tín cả bài. Việc này nằm trong §5 Phase 1.

**(7) Nó chống được rủi ro "kết quả âm" — thứ giết phần lớn đề tài sinh viên.**

Câu hỏi anh phải tự hỏi: *"Nếu chạy xong mà mô hình của em KHÔNG hơn FINDRISC thì sao? Bỏ à?"*

Với đề tài "tôi đề xuất mô hình mới tốt hơn" → **hỏng, phải làm lại.**
Với claim ở §2.1 → **đó CHÍNH LÀ kết quả.** Vì claim của anh không phải "mô hình tôi tốt hơn",
mà là **"khoảng cách được công bố phần lớn là ảo giác đo lường, và đây là số đo cụ thể"**.

Đây là lý do em chọn đúng câu claim này cho một sinh viên có 3–6 tháng: **nó không thể thất bại
về mặt khoa học.** Mọi kết quả đều là kết quả. Rủi ro duy nhất còn lại là rủi ro thi công.

### 2.3. Hai phương án em ĐÃ CÂN NHẮC VÀ LOẠI — và vì sao

Em loại công khai để anh không quay lại nhặt chúng lên giữa chừng.

| Phương án | Vì sao hấp dẫn | **Vì sao LOẠI (với ràng buộc của anh)** |
|---|---|---|
| **Staging 3 lớp** (Bình thường→Tiền ĐTĐ→ĐTĐ) — Q006 | Anh vừa nghĩ ra, nghe mới | Q006 đã xác minh niche gần **rỗng** ở ngưỡng citation (chỉ `abnoosian2023`). Anh sẽ phải tự dựng cả related work. Cộng thêm **rò rỉ nhãn kép** phải biện hộ suốt bài. **Với 3–6 tháng và bài báo đầu tiên: quá nhiều mặt trận cùng lúc.** → Cất lại làm bài thứ 2. |
| **Foundation model EHR** (Med-BERT / BEHRT hướng `rasmy2021`, `li2020`) | Sang, hợp thời AI 2026 | Dữ liệu Cerner/CPRD **không thể tiếp cận** (DUA cấp viện). Compute: `rasmy2021` train 1 tuần trên V100 với 28M bệnh nhân. **Ngoài tầm tuyệt đối.** → Chỉ trích dẫn ở Related Work, **KHÔNG tái lập**. |

> **📌 Sửa lại `READING_LIST.md`:** file đó đang xếp `rasmy2021` là *"Tier 1 — đọc kỹ nhất"*.
> Nó được viết ngày 05/07 khi chưa biết deadline và ràng buộc dữ liệu của anh. **Với ràng buộc
> hiện tại, xếp hạng đó không còn đúng.** Xếp hạng đọc mới ở §6 — hãy dùng §6, đừng dùng
> READING_LIST cũ.

### 2.4. Tên đề tài (bản nháp, sẽ chỉnh ở Phase 4)

> **Tiếng Việt:** *Sàng lọc đái tháo đường chưa được chẩn đoán không dùng xét nghiệm: học máy có
> thật sự hơn thang điểm lâm sàng? Một đánh giá chống rò rỉ, có kiểm chứng chéo quần thể và
> đánh giá theo lợi ích lâm sàng.*
>
> **English:** *Does machine learning actually beat clinical risk scores for non-laboratory
> screening of undiagnosed diabetes? A leakage-controlled, cross-population, decision-analytic
> re-evaluation.*

Đặt tên dạng **câu hỏi** là có chủ ý: nó cho phép câu trả lời là "không" mà bài vẫn đứng vững.

---

## §3. Anh phải CHỨNG MINH được gì — bảng claim ⇄ bằng chứng ⇄ phản biện

Đây là **xương sống của bài báo**. In ra dán lên tường. Mỗi dòng = một mục trong phần Results.

Ký hiệu: **C1–C5** = claim. Cột "Phản biện sẽ là" = câu reviewer chắc chắn hỏi.

| # | Claim (anh khẳng định) | Bằng chứng bắt buộc phải có | Reviewer sẽ vặn | Anh chuẩn bị sẵn |
|---|---|---|---|---|
| **C1** | Định nghĩa nhãn + feature của tôi **không thể rò rỉ** | Bảng liệt kê **từng** feature + cột "có nằm trong tiêu chí chẩn đoán không" (tất cả = Không). Sơ đồ thời gian nhãn/feature | *"Vòng eo/BMI chẳng phải hệ quả của tăng đường huyết à?"* | Phân biệt **yếu tố nguy cơ** (đo trước, nhân quả xuôi) vs **hệ quả sinh hoá của bệnh** (đường niệu, HbA1c). Trích `zhang2020` làm ví dụ đối lập |
| **C2** | Làm ĐÚNG quy trình thì hiệu năng **tụt X%** so với cách làm ẩu phổ biến | **Bảng ablation rò rỉ** — cùng data, cùng model, chỉ đổi 1 thứ mỗi dòng (§7.2) | *"X% này do leakage hay do bạn tuning kém?"* | Mỗi dòng ablation chạy **cùng seed, cùng grid, cùng fold**; báo mean ± SD trên ≥10 seed; chỉ đổi ĐÚNG 1 biến |
| **C3** | Ở tỉ lệ mắc **thật**, AUROC che giấu việc mô hình gần như vô dụng khi triển khai | AUROC **và** AUPRC **và** PPV@sensitivity 80% **và** calibration plot **và** decision curve — trên **cùng một bảng** | *"AUPRC thấp là do bệnh hiếm thôi, mô hình có sai đâu"* | Đúng — và đó là **luận điểm**: hãy so AUPRC với đường baseline = prevalence. Cộng net benefit để trả lời "vậy dùng có lợi không" |
| **C4** | Mô hình **không chuyển được** sang quần thể khác nếu không hiệu chỉnh lại | Bảng: train NHANES → test NHANES held-out **vs** test KNHANES/CHARLS. Báo **cả** discrimination **và** calibration (calibration-in-the-large, slope) | *"Tụt là do dữ liệu bạn harmonize sai, không phải do quần thể khác"* | Bảng **harmonization** công khai: biến gốc mỗi cohort → biến chung, đơn vị, cách mã hoá. Cộng bảng **Table 1** so đặc điểm 3 cohort |
| **C5** | Với biến no-lab, **ML ≈ thang điểm lâm sàng** (hoặc hơn không đáng kể) | So ML vs **FINDRISC** vs **ADA/CDC Risk Test** vs **hồi quy logistic** trên cùng split. Kèm **DeLong test** + CI bootstrap | *"Bạn chưa tuning ML đủ mạnh nên nó mới thua"* | Công khai grid + số lần thử; báo cả **best** lẫn **phân phối** kết quả tuning; dùng **nested CV** để không tự ăn gian |

### 3.1. Đóng góp phụ — mỗi cái là một "vé" thêm để bài được nhận

- **P1 — Survey-design-aware evaluation.** Báo cáo song song: metric *không* trọng số (cách cả
  lĩnh vực đang làm) vs metric *có* trọng số khảo sát (ước lượng cho dân số thật). Chỉ ra chênh
  lệch. *(Xuất phát từ §2.2-(6). Rẻ, mới, khó cãi.)*
- **P2 — Protocol chống rò rỉ dạng checklist** cho bài toán sàng lọc no-lab, kèm bảng
  "vi phạm nào làm phồng bao nhiêu" (chính là C2). **Đây là sản phẩm kiến tạo** — bắt buộc phải
  có, để bài không bị đọc là "chỉ đi chê người khác" (cảnh báo từ Q002).
- **P3 — Repo công khai** + `environment.yml` + seed cố định + script tải/tiền xử lý từng cohort.
  Trong 35 bài đã phân tích của anh, chỉ **4** có code public. Đây là điểm rẻ nhất để nổi bật.
- **P4 — Model card** ghi rõ: dùng cho quần thể nào, ngưỡng nào, PPV kỳ vọng bao nhiêu, **không**
  dùng cho ai. Đây là thứ anh đưa cho bác sĩ đọc.

### 3.2. Bảng bằng chứng gap — số liệu anh dùng cho Introduction

Từ **chính kho 35 bài đã phân tích của anh** (em grep `extracted.md` ngày 26/07/2026):

| Thực hành đúng | Số bài có / 35 | Ghi chú |
|---|---|---|
| **Decision curve analysis / net benefit** | **0** | Không một bài nào |
| Calibration (plot / Brier / slope) | ~2 thực chất | `agliata2023` (Brier 0.101), `vinh2026` |
| PR-AUC / AUPRC báo cáo tường minh | ~3 | `lugner2024` (0.29), `zhang2020` (AUPR 0.546) |
| External validation thật | ~3 | `choi2014`, `sgchoi2023`, `phan2025` |
| Trọng số khảo sát khi dùng NHANES | 1 phần | chỉ `yu2010`, và chỉ cho baseline LR |
| Code public | 4 | `hasan2020`, `olisah2022`, `li2020`, `rasmy2021`, `tasin2022` |

Đối chiếu tài liệu ngoài (để anh trích dẫn, không phải tự tuyên bố):
- **Endocrine Connections 2025** (Li et al., systematic review + meta-analysis): **65 nghiên cứu /
  97 mô hình**; external validation chỉ **21 mô hình**; **>80% mô hình nguy cơ chệch cao (PROBAST)**;
  hồi quy logistic chiếm 97.9%; ML báo AUC lên tới **0.998** *(cờ đỏ)*.
- **npj Digital Medicine 2023** (PMC10600138, scoping review): **5/40** external · **5/40**
  calibration · **4/40** code · **4/40** SHAP.
- **TRIPOD+AI** (BMJ 2024) và **PROBAST+AI** (BMJ 2025) đã ra đời — nhưng khảo sát cuối 2025 cho
  thấy chỉ ~**28%** bài ML đạt yêu cầu TRIPOD+AI (thấp hơn cả bài hồi quy ~38%).

> ⚠️ **Bảng trên là kết quả grep tự động — có thể sót** (ví dụ `zhang2020` viết "AUPR" chứ không
> phải "AUPRC"). **Trước khi đưa vào bài, anh phải đếm tay lại** và đổi câu chữ thành
> *"trong N bài chúng tôi khảo sát"* chứ không phải *"trong y văn"*. Xem §5 Phase 1.

---

## §4. Kế hoạch dữ liệu

### 4.1. Ba tầng, theo đúng chiến lược anh đã nói

```
TẦNG 1 — Bộ chuẩn, tải ngay          →  Xây & chứng minh pipeline
TẦNG 2 — Bộ chuẩn, đăng ký free      →  External validation cross-population  ← LÕI CỦA BÀI
TẦNG 3 — Dữ liệu bệnh viện VN        →  Bài thứ 2 / phần mở rộng  (SAU khi có Tầng 1+2)
```

### 4.2. Tầng 1 — NHANES (bắt đầu ngay hôm nay, không cần đăng ký gì)

| Hạng mục | Chi tiết |
|---|---|
| Nguồn | `wwwn.cdc.gov/nchs/nhanes/` — tải trực tiếp file `.XPT`, **không đăng ký, không DUA** |
| Chu kỳ đề xuất | 2005-2006 → 2017-2018 (7 chu kỳ). *Cân nhắc thêm 2017-Mar 2020 và 2021-2023, nhưng **để riêng** — COVID làm gián đoạn thiết kế khảo sát, đừng trộn vào mà không kiểm tra* |
| **Nhãn** | `DIQ010` (bác sĩ từng nói bạn bị ĐTĐ?) + `LBXGH` (HbA1c) + `LBXGLU` (glucose đói) + `LBXGLT` (OGTT 2h) |
| Định nghĩa | **Undiagnosed DM** = `DIQ010` ≠ Có **VÀ** (HbA1c ≥ 6.5% **HOẶC** FPG ≥ 126 **HOẶC** OGTT2h ≥ 200). Loại khỏi mẫu: người đã được chẩn đoán, phụ nữ có thai |
| **Feature (no-lab)** | `RIDAGEYR` tuổi · `RIAGENDR` giới · `BMXBMI` · `BMXWAIST` vòng eo · `BPXSY/BPXDI` huyết áp · `BPQ020` từng được chẩn tăng HA · `MCQ300C` tiền sử gia đình ĐTĐ · `PAQ*` vận động · `SMQ020` hút thuốc · `RIDRETH3` chủng tộc · `INDFMPIR` thu nhập |
| **Trọng số** | `WTMEC2YR` (khám) hoặc `WTSAF2YR` (mẫu nhịn đói) + `SDMVSTRA` + `SDMVPSU`. **Phải ghép trọng số nhiều chu kỳ đúng cách** (chia cho số chu kỳ) — NCHS có hướng dẫn chính thức, đọc kỹ |
| Thư viện | Python: `pandas.read_sas()`; phân tích có trọng số: `samplics` hoặc `statsmodels`. R: `survey` (chuẩn vàng — **cân nhắc dùng R chỉ cho phần trọng số**) |

- [ ] **Việc tuần này:** tải NHANES 2017-2018 (1 chu kỳ thôi), dựng được bảng có nhãn + 10 feature,
      đếm prevalence undiagnosed DM. Nếu ra khoảng **3–5%**, anh đã làm đúng.

### 4.3. Tầng 2 — chọn 1 (hoặc 2) trong 3, để external validation

| Cohort | Ma sát | Được gì | Rủi ro |
|---|---|---|---|
| **KNHANES** (Hàn) 🥇 | Miễn phí, **site tiếng Hàn** → cần dịch trang. Không cần DUA | **Anh em sinh đôi thiết kế của NHANES** → harmonize dễ nhất. Quần thể Đông Á, BMI thấp hơn nhiều → phép thử transportability rất mạnh. **Có 2 bài neo sẵn trong kho** (`choi2014`, `sgchoi2023`) | Rào cản ngôn ngữ khi tìm biến |
| **CHARLS** (Trung) 🥈 | Đăng ký free, duyệt **~1 tuần**. Có bản **Harmonized** | Có HbA1c + glucose (2011, 2015) → làm được cả undiagnosed **và** incident diabetes. Trung niên/cao tuổi, nông thôn nhiều → gần bối cảnh VN nhất | Chờ duyệt; ít biến hơn NHANES |
| **HRS / ELSA** 🥉 | Đăng ký free (Michigan / UK Data Service) | Cùng họ harmonized với CHARLS → sau này mở rộng 4–5 quốc gia rất rẻ | Biomarker thuộc tầng "sensitive", phải xin thêm |

**Đề xuất của em:** **KNHANES là ưu tiên 1** (harmonize dễ nhất, có bài neo). **Nộp đơn CHARLS
NGAY tuần này** (miễn phí, chờ 1 tuần, không mất gì) làm phương án dự phòng + cohort thứ 3 nếu kịp.

- [ ] **Việc tuần này:** đăng ký CHARLS (10 phút, rồi quên đi chờ duyệt). Mở KNHANES, xác nhận
      tải được ≥1 năm dữ liệu.

> **Quy tắc cứng:** cohort external **KHÔNG được đụng vào** cho đến Phase 3. Không nhìn, không
> tune, không "thử xem sao". Nhìn trước = tự tay phá C4. Nếu lỡ nhìn, phải khai báo trong bài.

### 4.4. Tầng 3 — dữ liệu bệnh viện Việt Nam (KHÔNG làm trong 3–6 tháng này)

Anh đã tự chốt đúng: có bộ chuẩn trước rồi mới xin. Em bổ sung **cái anh cần chuẩn bị sẵn** để
khi gặp bác sĩ là có ngay, không phải hẹn lại:

- [ ] **1 trang A4** (tiếng Việt): mục tiêu, mô hình đã validate trên mấy quần thể, cần đúng
      những biến nào (danh sách ≤ 15 biến), **không cần biến định danh nào**
- [ ] **Danh sách biến tối thiểu** — càng ít càng dễ được đồng ý
- [ ] **Cam kết:** dữ liệu ẩn danh, không mang ra khỏi máy, chỉ báo cáo số tổng hợp
- [ ] Hỏi bác sĩ về quy trình **hội đồng đạo đức (IRB)** của bệnh viện — **hỏi sớm**, thường mất
      1–3 tháng, là đường găng dài nhất
- [ ] Chuẩn bị tinh thần: nhiều nơi trả lời "dữ liệu không có sẵn dạng bảng". Hỏi luôn:
      *"Bệnh viện đang lưu ở dạng nào ạ?"*

---

# TẦNG C — THI CÔNG

## §5. Lộ trình 20 tuần

**Giả định công suất: ~12 giờ/tuần ≈ 240 giờ.** Nếu anh làm được nhiều hơn, đừng thêm scope —
hãy **kết thúc sớm**. Scope creep là kẻ giết deadline số 1 (Q002 đã cảnh báo: "mài 1 lưỡi").

### Phase 0 — Tuần 1: Viết bài báo TRƯỚC khi làm thí nghiệm

Nghe ngược đời nhưng đây là kỹ thuật quan trọng nhất em dạy anh trong file này.

- [ ] Tạo `paper/outline.md`, viết **IMRaD rỗng**: Introduction / Methods / Results / Discussion
- [ ] Trong Results, **vẽ sẵn 6 bảng và 4 hình — CHỈ có tiêu đề và tên cột, ô số để trống**:
  - Table 1 — Đặc điểm 3 cohort (tuổi, giới, BMI, prevalence…)
  - Table 2 — Hiệu năng chính (AUROC, AUPRC, PPV@Sn80, Brier, calib slope) × các model
  - **Table 3 — Ablation rò rỉ** ← trái tim bài báo (C2)
  - Table 4 — External validation: nội bộ vs KNHANES/CHARLS (C4)
  - Table 5 — ML vs FINDRISC vs ADA score vs LR + DeLong p (C5)
  - Table 6 — Có trọng số khảo sát vs không (P1)
  - Fig 1 sơ đồ CONSORT-style chọn mẫu · Fig 2 ROC+PR · Fig 3 calibration ·
    **Fig 4 decision curve** ← không bài nào trong kho anh có
- [ ] Viết **Abstract giả định** 150 từ — điền số bịa vào chỗ trống

**Vì sao:** giây phút anh vẽ xong Table 3, anh biết **chính xác** phải chạy bao nhiêu thí nghiệm.
Không thừa một cái. Không thiếu một cái. Cuối dự án anh chỉ việc thay số bịa bằng số thật.

> **Definition of Done Phase 0:** có file `outline.md` với 6 bảng rỗng + abstract giả định.

### Phase 1 — Tuần 2–4: Đọc có mục đích + xác minh

- [ ] Đọc **Tầng A (5 bài)** ở §6 — mỗi bài viết `notes.md` **≤ 1 trang**, đúng 3 mục:
      *(1) tôi lấy gì từ bài này · (2) bài này thiếu gì mà tôi có · (3) tôi phải trích nó ở câu nào*
- [ ] **Xác minh 2 claim về người khác** (bắt buộc, §2.2-6): mở `source.pdf` của `yu2010` và
      `dinh2019`, đọc Methods, xác nhận việc xử lý trọng số khảo sát. **Ghi lại số trang.**
- [ ] **Đếm tay** lại bảng §3.2 trên 35 bài → chốt số thật cho Introduction
- [ ] Đọc **đối thủ** medRxiv 2025.09.05.25335151 (bản PDF trên medRxiv). Viết
      `notes-competitor.md`: nó dùng cohort nào, báo metric nào, **thiếu gì**
- [ ] Cài Zotero, import toàn bộ DOI trong kho (nếu chưa dùng bao giờ: 30 phút là xong)

> **DoD Phase 1:** 6 file notes + 1 bảng đếm tay + biết chính xác đối thủ thiếu gì.

### Phase 2 — Tuần 5–9: Xây pipeline trên NHANES (một mình, chưa đụng external)

- [ ] Repo Git sạch: `data/` (gitignore) · `src/` · `notebooks/` · `results/` · `paper/`
- [ ] `src/data_nhanes.py`: tải + ghép chu kỳ + dựng nhãn + dựng feature + ghép trọng số
- [ ] **Fig 1** sơ đồ chọn mẫu (bao nhiêu người → loại vì sao → còn bao nhiêu). Làm sớm, hay bị bỏ quên
- [ ] **Table 1** đặc điểm mẫu
- [ ] Baseline **theo thứ tự này, không đảo**:
      1. **FINDRISC** (8 mục) và **ADA/CDC Risk Test** — tính theo công thức gốc, KHÔNG train
      2. **Hồi quy logistic** đơn giản
      3. **LightGBM / XGBoost** — tuning bằng **nested CV**
      4. *(tuỳ chọn, sau khi 1–3 xong)* **TabPFN v2** — xem §8
- [ ] Chốt **protocol chống rò rỉ** và viết thành `src/protocol.md`:
      impute/scale/feature-select **đặt trong Pipeline của sklearn, fit trong từng fold** ·
      cân bằng lớp (nếu dùng) **chỉ trên train fold** · chọn ngưỡng **trên validation** ·
      test set **chạm đúng 1 lần**
- [ ] Đánh giá đầy đủ: AUROC · **AUPRC** · **PPV@Sn=80%** · **Brier + calibration slope** ·
      **decision curve** · CI bootstrap 1000 lần

> **DoD Phase 2:** Table 1, 2 và Fig 1–4 **đã có số thật** trên NHANES. Chạy lại từ đầu ra
> đúng số cũ (seed cố định).

### Phase 3 — Tuần 10–14: Ablation + External — phần tạo ra giá trị

**Tuần 10–11 — Table 3, ablation rò rỉ.** Cùng data, cùng model, cùng seed, mỗi dòng đổi ĐÚNG 1 thứ.

> **⚠️ CẬP NHẬT 2026-07-26 (Q009) — thứ tự ưu tiên đã ĐỔI.** Bảng dưới đây trước kia xếp theo
> phỏng đoán. Sau khi quét 35 bài trong kho ([LEAKAGE_MAP.md](LEAKAGE_MAP.md)), mỗi dòng giờ có
> **tần suất đo được**, và thứ tự đã được sắp lại theo đúng tần suất đó. Cột "Trong kho anh"
> là số liệu anh trích thẳng vào Results.

| Ưu tiên | Cấu hình | **Trong kho anh** | Ai dính (ví dụ trích được) | Kỳ vọng |
|---|---|---|---|---|
| — | **A. Đúng chuẩn** — mọi thứ trong fold, test chạm 1 lần | 1/34 | `lai2019` (dùng DeLong thay vì lấy best) | *(mốc tham chiếu)* |
| **1** | **E. Chọn model trên chính test set** | **25/34** | `nipa2023` quét **35 classifier** trên 1 split, tự nhận *"no validation methods being used"* | phồng theo số model thử |
| **2** | **F. Biến định nghĩa nhãn nằm trong feature** | **20/25** | `olisah2022` (relabel theo glucose → ORF 100%) · `zou2018` (glucose là root node) · **+10 bài PIMA dính theo cấu trúc dataset** | **phồng cực mạnh → ~0.99** |
| **3** | **C. Feature selection trên toàn bộ data** | **13/30** | `khanam2021`, `kaliappan2024`, `nguyen2019` (chọn biến bằng khoảng cách tới chính cột nhãn) | phồng vừa |
| 4 | **G. Ép cân bằng 50/50 rồi báo accuracy** | **12/12** | `agliata2023`, `dinh2019`, `deberneh2021` (test 200 mẫu/lớp) | accuracy đẹp, PPV thật sụp |
| 5 | **D. SMOTE/oversample trước khi split** | **1/10** | Chỉ `kaliappan2024` nghi sai; **5/10 bài dùng SMOTE đã làm ĐÚNG** | phồng — nhưng **hiếm gặp trong thực tế** |
| 6 | **B. Impute/scale trên toàn bộ data** | 4/33 — nhưng **26/33 bài không nêu** | `khanam2021`, `hasan2020`, `abnoosian2023` (CV liệt kê SAU tiền xử lý ngay trong abstract) | phồng nhẹ |

> **Dòng F vẫn là kết quả mạnh nhất trong bài anh** — nó tái tạo con số ~0.99–1.00 mà
> `olisah2022`/`kaliappan2024`/`abnoosian2023`/`naz2020` báo cáo, chỉ bằng cách cố ý vi phạm
> một quy tắc. Nhưng phải **tách làm hai loại**: rò rỉ do **lỗi tác giả** (10 bài) và rò rỉ do
> **cấu trúc dataset** (10 bài dùng PIMA — cột `Glucose` chính là đường huyết 2h OGTT mà nhãn PIMA
> lại định nghĩa bằng ngưỡng OGTT 2h). Gộp chung là vu oan hàng loạt.
>
> **Dòng D bị hạ từ "giữ bằng mọi giá" xuống ưu tiên 5.** Lý do: `TO_DO` bản cũ gộp
> under-sampling với over-sampling. **Under-sampling KHÔNG rò rỉ** — không có mẫu tổng hợp nào
> vượt rào train↔test, nó chỉ làm sai prevalence ⇒ thuộc **dòng G**, không phải D.

**Tuần 12–13 — External validation.** Bây giờ mới mở KNHANES (và/hoặc CHARLS).
- [ ] Bảng **harmonization** công khai: biến gốc → biến chung → đơn vị → cách mã hoá
- [ ] Áp mô hình **đã khoá** (không train lại) → Table 4
- [ ] Báo **cả** discrimination **và** calibration. Nếu tụt → **đó là kết quả**, không phải thất bại
- [ ] Thêm: **recalibration** (chỉ chỉnh intercept/slope, không train lại) → cải thiện bao nhiêu?

**Tuần 14 — Table 5 (ML vs score, DeLong) + Table 6 (trọng số khảo sát).**

> **DoD Phase 3:** Table 3–6 có số thật. Anh trả lời được: *"leakage ăn X điểm AUC, thiếu external
> ăn Y điểm, đánh giá sai chỉ số che giấu Z."*

### Phase 4 — Tuần 15–18: Viết

- [ ] Điền số thật vào outline Phase 0
- [ ] **Bám TRIPOD+AI** — tải checklist 27 mục, tick từng mục. Nộp kèm bản tick
- [ ] **Tự chấm PROBAST+AI** cho chính bài mình, đăng kết quả trong Limitations.
      *(Rất ít bài dám làm. Reviewer thích điều này.)*
- [ ] Discussion phải có: *"kết quả của chúng tôi mâu thuẫn/đồng thuận với X ở điểm nào"*
- [ ] Limitations **tự nêu trước** mọi thứ ở §9 — reviewer thấy anh đã biết thì không đánh nữa
- [ ] Dọn repo: README, `environment.yml`, seed, script chạy 1 lệnh ra toàn bộ bảng

### Phase 5 — Tuần 19–20: Phản biện & nộp

- [ ] **Tự đóng vai 3 reviewer** (§9), viết review thật gắt cho chính mình, rồi sửa
- [ ] Nhờ **bác sĩ** đọc phần Introduction + Discussion: *"đọc có thấy vô lý về mặt lâm sàng không?"*
- [ ] Nhờ 1 bạn **không** làm ML đọc Abstract: nếu bạn ấy không hiểu bài này để làm gì → viết lại
- [ ] Nộp

### 5.1. Đường găng (critical path) — chỉ 4 việc này trễ mới thật sự trễ

```
① Dựng được nhãn NHANES đúng (Phase 2, tuần 5-6)
② Table 3 ablation rò rỉ        (Phase 3, tuần 10-11)   ← giá trị lõi
③ External validation chạy được  (Phase 3, tuần 12-13)
④ Bắt đầu viết đúng tuần 15      (Phase 4)              ← đừng dời
```
Mọi thứ khác (TabPFN, SHAP, cohort thứ 3, web demo) là **tuỳ chọn** — cắt không thương tiếc nếu trễ.

---

## §6. Đọc gì, để làm gì (thay thế xếp hạng cũ trong `READING_LIST.md`)

**Nguyên tắc:** anh **không đọc để biết**, anh **đọc để lấy một thứ cụ thể**. Cột "Lấy gì" là
mệnh lệnh. Đọc xong mà chưa lấy được thứ đó = chưa đọc xong.

### 🅐 Đọc để lấy THIẾT KẾ — 5 bài, BẮT BUỘC, tuần 2–3

| Bài | Vì sao đọc | **Lấy gì cụ thể** |
|---|---|---|
| **`sgchoi2023`** ⭐ *gần đề tài anh nhất* | KNHANES 2014-2020, no-lab, external temporal, ML vs thống kê, SHAP. AUC 0.819 vs score 0.765 | Định nghĩa undiagnosed DM · danh sách feature no-lab · **và điểm anh vượt nó: nó chỉ external theo THỜI GIAN trong cùng Hàn Quốc; anh external theo QUẦN THỂ** |
| **`choi2014`** | KNHANES 2010 → external KNHANES 2011, so với score hồi quy | Khuôn mẫu external "sạch" · cách so ML vs clinical score · **kết luận trung thực: ML chỉ hơn ~0.02 AUC** — chuẩn bị tinh thần cho C5 |
| **`yu2010`** | NHANES no-lab SVM, 457 cite, kinh điển | Scheme I / Scheme II (2 cách định nghĩa ca bệnh) · **và bằng chứng cho P1**: nó dùng SUDAAN cho LR nhưng không cho SVM → xác minh lại ở trang nào |
| **`dinh2019`** | NHANES, có-lab AUC 0.957 → no-lab 0.737 | **Con số "bỏ lab thì tụt bao nhiêu"** — dùng làm mốc so sánh trực tiếp · **và bằng chứng P1**: không nhắc trọng số khảo sát lần nào |
| **`lugner2024`** | UK Biobank 448k | **Hình mẫu BẢNG KẾT QUẢ của anh**: Acc 0.92 nhưng PR-AUC 0.29, Sens 0.62. Bắt chước cách báo cáo này |

### 🅑 Đọc để lấy PHƯƠNG PHÁP — 4 bài, tuần 3–4

| Bài | **Lấy gì** |
|---|---|
| **`nnamoko2020`** (repro=high) | **Protocol chống rò rỉ mẫu mực**: chia fold từ data GỐC rồi mới xử lý + **McNemar test**. Chép nguyên cách này |
| **`lai2019`** | **DeLong test** so 2 AUC (cho C5) · cost-sensitive FN:FP · chọn ngưỡng theo mục tiêu lâm sàng |
| **`zhang2020`** | No-lab GBM AUC 0.817 (mốc so sánh) · **cách báo AUPR 0.546 + PPV 28.83%** — trung thực dưới prevalence thật |
| **`hasan2020`** (có code) | Ensemble sạch + **đọc code thật** để thấy pipeline chuẩn trông thế nào |

### 🅒 Đọc để ĐỊNH VỊ mình — 3 nguồn, tuần 2

| Nguồn | **Lấy gì** |
|---|---|
| **medRxiv 2025.09.05.25335151** — *ML vs FINDRISC* | **ĐỐI THỦ GẦN NHẤT.** Xác định chính xác nó thiếu: net benefit? phân rã leakage? cross-population? → đó là chỗ anh cắm cờ |
| **Endocrine Connections 2025** (Li et al.) | Số gap để trích Introduction: 65 nghiên cứu/97 mô hình, 21 external, >80% high RoB |
| **`phan2025`** (REMED-T2D, đã promote) | SOTA gần nhất trong kho, có 3 external dataset → xem họ external thế nào |

### 🅓 Đọc để lấy DẪN CHỨNG THỔI PHỒNG — 4 bài, **lướt 20 phút mỗi bài**

`olisah2022` (ORF **100%** + relabel theo glucose) · `naz2020` (DL **98.07%** PIMA, không CV) ·
`kaliappan2024` (RF **0.990**, 1 split cố định) · `abnoosian2023` (**0.9887** micro-avg 3 lớp).

→ **Lấy:** 4 con số này để viết một câu Introduction rất mạnh:
*"Các mô hình gần đây báo cáo accuracy 0.98–1.00 trên dữ liệu ĐTĐ tabular; chúng tôi cho thấy
mức này có thể tái tạo được chỉ bằng việc cố ý vi phạm một quy tắc chống rò rỉ duy nhất
(Bảng 3, dòng F)."*

### 🅔 Đọc SAU, chỉ khi còn thời gian

`tasin2022` (code+SHAP+LIME+deploy — khuôn mẫu nếu anh làm demo) · `ahmed2024` (LIME vs SHAP) ·
`vinh2026` (đồ án VN — 16 lần nhắc calibration, xem người đi trước làm gì).

### 🅕 **KHÔNG đọc sâu trong 3–6 tháng này**

`rasmy2021` · `li2020` (Med-BERT/BEHRT) — dữ liệu không tiếp cận được, compute ngoài tầm.
**Chỉ trích dẫn 1 câu ở Related Work.** `lu2021` · `yang2021` · `nguyen2019` · `hennebelle2023` ·
`khanam2021` · `dharmarathne2024` · `xu2025` — related work, lướt abstract.

> Tổng: **12 bài đọc kỹ + 4 bài lướt**. Không phải 40. Đây là điều em muốn anh nhẹ người nhất:
> **anh đã đọc đủ rồi. Vấn đề chưa bao giờ là số lượng.**

---

## §7. Cần học gì — và tiêu chí "đã biết"

Chỉ học đúng thứ dùng trong bài. Mỗi mục có **tiêu chí kiểm tra** — tự trả lời được thì tick.

### 7.1. Bắt buộc trước Phase 2 (~15 giờ)

| # | Chủ đề | Tiêu chí "đã biết" |
|---|---|---|
| 1 | **AUROC vs AUPRC** | Giải thích được: *vì sao ở prevalence 4%, AUROC 0.85 nghe hay nhưng AUPRC có thể chỉ 0.15?* Biết baseline của AUPRC = prevalence |
| 2 | **Calibration** | Vẽ được calibration plot; giải thích Brier score và calibration slope; hiểu *"mô hình phân biệt tốt vẫn có thể dự đoán xác suất sai bét"* |
| 3 | **PPV/NPV phụ thuộc prevalence** | Tính tay được: Sn=80%, Sp=70%, prevalence=4% → PPV = ? *(≈10% — con số này sẽ làm anh tỉnh ngộ)* |
| 4 | **Nested CV & winner's curse** | Giải thích được vì sao chọn model trên test set làm số phồng lên (QA_LOG Q003 đã có sẵn lập luận) |
| 5 | **Pipeline của sklearn** | Viết được `Pipeline([imputer, scaler, selector, model])` và biết vì sao **bắt buộc** phải bọc vào Pipeline mới an toàn trong CV |

### 7.2. Bắt buộc trước Phase 3 (~10 giờ)

| # | Chủ đề | Tiêu chí |
|---|---|---|
| 6 | **Decision curve analysis / net benefit** | Giải thích được trục hoành (threshold probability) nghĩa là gì về mặt lâm sàng. *(Đây là vũ khí của anh — 0/35 bài trong kho có)* |
| 7 | **DeLong test + bootstrap CI** | So 2 AUC ra p-value; dựng CI 95% bằng bootstrap |
| 8 | **Complex survey (trọng số NHANES)** | Hiểu weight / strata / PSU; biết cách ghép trọng số nhiều chu kỳ |
| 9 | **External validation vs recalibration** | Phân biệt: đổi discrimination vs chỉ đổi calibration |

### 7.3. Bắt buộc trước Phase 4 (~8 giờ)

| # | Chủ đề | Tiêu chí |
|---|---|---|
| 10 | **TRIPOD+AI** (BMJ 2024) | Đã tải checklist 27 mục và tick thử cho bài mình |
| 11 | **PROBAST+AI** (BMJ 2025) | Tự chấm risk-of-bias cho chính bài mình |
| 12 | **Cấu trúc IMRaD + cách viết** | Biết mỗi phần trả lời câu hỏi gì; Abstract viết cuối cùng |
| 13 | **Zotero + BibTeX** | Import DOI → sinh trích dẫn tự động |

### 7.4. Tuỳ chọn — chỉ khi thừa thời gian

TabPFN v2 (§8) · SHAP local · Streamlit demo cho bác sĩ xem.

> **Cái anh KHÔNG cần học:** Transformer cho EHR, xử lý chuỗi thời gian, kiến trúc deep tabular,
> huấn luyện phân tán, MLOps/blockchain (`hennebelle2023`). Không dùng đến. Học vào là mất tuần.

---

## §8. Hạ tầng & compute — **đừng thuê GPU**

Nói thẳng để anh khỏi tốn tiền: **đề tài này gần như không cần GPU.**

| Việc | Cần gì | Thời gian |
|---|---|---|
| Xử lý NHANES (~70k dòng × ~30 cột) | **Laptop.** pandas | vài giây |
| LightGBM/XGBoost + nested CV + 10 seed | **Laptop CPU** (hoặc Kaggle CPU) | vài phút → 1–2 giờ |
| Bootstrap CI 1000 lần | Laptop, chạy song song | vài phút |
| Toàn bộ Table 2–6 | Laptop | < 1 ngày tính tổng |
| **TabPFN v2** *(tuỳ chọn)* | **GPU** — nhưng chỉ ≤10k mẫu/lần → **Kaggle T4 miễn phí là quá đủ** | vài phút |

- **Kaggle**: ~30 giờ GPU/tuần miễn phí (T4×2 hoặc P100), phiên tối đa ~12 giờ, chạy nền được.
  **Nhiều hơn nhu cầu của anh nhiều lần.**
- **Colab free**: dùng cho việc lặt vặt.
- **Thuê GPU (vast.ai/RunPod)**: ❌ **Không cần.** Nếu có lúc nào anh thấy cần thuê GPU cho
  đề tài này, đó là **tín hiệu anh đang đi lạc scope**, không phải tín hiệu thiếu máy.

**Dùng tiền vào đâu thì đáng hơn:** phí mở (open access) nếu tạp chí yêu cầu — nhưng nhiều tạp chí
tốt miễn phí (xem §11).

**Điểm "hợp thời đại AI 2026" — làm đúng 1 việc, rẻ và sắc:**
thêm **TabPFN v2** (mô hình nền cho dữ liệu bảng, Nature 2025) vào Table 5 như một baseline hiện đại.
Nó biến câu chuyện thành: *"kể cả mô hình nền tabular mới nhất cũng không thay đổi kết luận C5"*
— mạnh hơn nhiều so với việc chỉ so XGBoost. Chi phí: vài giờ. **Nhưng chỉ làm sau khi Table 3
và Table 4 đã xong.**

---

# TẦNG D — PHÒNG THỦ

## §9. Reviewer sẽ đánh vào đâu — và anh trả lời thế nào

Đây là phần "phản biện được" mà anh yêu cầu. **In ra. Trước khi nộp, phải trả lời được cả 12 câu.**

| # | Câu reviewer hỏi | Anh phải có sẵn |
|---|---|---|
| 1 | *"Đóng góp mới ở đâu? Toàn kỹ thuật đã biết."* | Novelty ở **mô liên kết + định lượng**: Table 3 (phân rã leakage) chưa ai làm cho bài toán này; Fig 4 (net benefit) 0/35 bài có; cross-population external chưa ai làm giữa NHANES↔KNHANES |
| 2 | *"AUC của bạn thấp hơn nhiều bài khác."* | **Đúng, và đó là luận điểm.** Chỉ vào Table 3 dòng F: tái tạo được 0.99 chỉ bằng cách cố ý vi phạm 1 quy tắc |
| 3 | *"Sao không dùng deep learning?"* | Có: TabPFN v2 + MLP trong Table 5, không đổi kết luận. Trích thêm `zou2018`, `khanam2021` — DL không thắng trên tabular cỡ này |
| 4 | *"Chỉ 2–3 cohort là ít."* | Thừa nhận trong Limitations. Nhưng chỉ ra: y văn hiện tại có **21/97 mô hình** external (EC 2025) — 2 external cross-country vẫn nằm nhóm trên |
| 5 | *"Harmonize sai thì kết quả external vô nghĩa."* | Bảng harmonization đầy đủ + Table 1 so đặc điểm + **phân tích độ nhạy**: bỏ bớt biến khó harmonize xem kết luận có đổi không |
| 6 | *"Mô hình không dùng được lâm sàng vì PPV quá thấp."* | **Đồng ý — và đó là phát hiện.** Đưa net benefit: ở ngưỡng nào thì sàng lọc còn có lợi hơn không sàng lọc |
| 7 | *"Bạn chưa tuning ML đủ mạnh."* | Công khai grid + số lần thử + nested CV + **phân phối** kết quả tuning, không chỉ best |
| 8 | *"Nhãn NHANES chỉ dựa 1 lần đo, ADA yêu cầu xác nhận lần 2."* | **Câu này rất hay và anh phải chuẩn bị.** Thừa nhận là hạn chế cố hữu của dữ liệu khảo sát; làm **phân tích độ nhạy**: định nghĩa chặt (cần ≥2 tiêu chí cùng dương) vs lỏng |
| 9 | *"Vì sao loại người đã được chẩn đoán? Mất thông tin."* | Vì mục tiêu là **sàng lọc người chưa biết mình bệnh** — người đã chẩn đoán không phải đối tượng. Giải thích trong Methods, đừng để reviewer tự đoán |
| 10 | *"Không có ý nghĩa thống kê giữa các model."* | **Đó là kết quả (C5).** Có DeLong p-value + CI chồng lấn để chứng minh, chứ không phải "không đo được" |
| 11 | *"Kết quả có tổng quát cho quần thể khác không?"* | Chính là Table 4. Và nói rõ giới hạn tuyên bố theo QA_LOG **Q004**: *"mô hình cho quần thể giống X"*, không phải *"mô hình tốt nhất"* |
| 12 | *"Code đâu?"* | Link repo + `environment.yml` + seed + 1 lệnh chạy ra toàn bộ bảng |

### 9.1. Tự phản biện — làm ở Phase 5

Đóng vai **3 reviewer khác nhau**, mỗi vai viết review gắt cho chính bài mình:
- **R1 — nhà thống kê y sinh:** soi định nghĩa nhãn, calibration, CI, trọng số khảo sát, kiểm định
- **R2 — kỹ sư ML:** soi leakage, nested CV, tuning, seed, tái lập
- **R3 — bác sĩ lâm sàng:** soi *"dùng cái này ở phòng khám thì sao?"*, PPV, ngưỡng, tác hại của FP/FN

> Nhờ Claude ở phiên sau đóng cả 3 vai. Nhưng **anh phải viết bản tự phản biện trước**, rồi mới
> so — nếu để agent làm hộ ngay, anh mất đúng cái kỹ năng mà NCKH sinh ra để dạy anh.

---

## §10. Bẫy phải tránh — rút từ chính kho của anh

| Bẫy | Ai đã dính (trong kho anh) | Anh tránh bằng cách |
|---|---|---|
| **Accuracy trên dữ liệu ép cân bằng 50/50** | `agliata2023`, `deberneh2021` (test 200/lớp) | Luôn đánh giá ở **prevalence thật**. Muốn cân bằng chỉ được làm **trong train fold** |
| **SMOTE/oversample trước khi split** | nghi ngờ ở `gr2024`, `kaliappan2024` | Đưa vào `imblearn.Pipeline`, chỉ fit trên train |
| **Feature selection trên toàn bộ data** | `khanam2021`, `kaliappan2024`, `tasin2022` (MI) | Selector là 1 bước trong Pipeline |
| **Biến định nghĩa nhãn nằm trong feature** | `olisah2022`, `zhang2020`, `lai2019`, `deberneh2021`, `fazakis2021` | Đề tài anh miễn nhiễm — nhưng **phải nói rõ** trong Methods rằng anh cố ý loại |
| **Một split cố định, không CV** | `nipa2023`, `kaliappan2024`, `dharmarathne2024` | Nested CV + ≥10 seed + báo mean ± SD |
| **Chỉ báo AUROC** | phần lớn kho | AUROC + AUPRC + calibration + net benefit trên **cùng bảng** |
| **Không có code** | 31/35 bài | Repo công khai từ ngày đầu |
| **Bỏ trọng số khảo sát trên NHANES** | `dinh2019`; `yu2010` chỉ làm một nửa | P1 — báo cáo song song có/không trọng số |
| **Scope creep** | — | §5.1 đường găng. Cắt không thương tiếc |

---

## §11. Chọn đầu ra — tư vấn như anh nhờ

Anh chọn *"chưa rõ — muốn em tư vấn"*. Đây là khuyến nghị của em, **chiến lược 2 tầng, một codebase**:

### Tầng 1 — Hội nghị trong nước, nộp khoảng **tuần 16** (tháng 11–12/2026)
**FAIR / NICS / KSE / RIVF** hoặc hội nghị của trường.
**Vì sao đây là bước đi đúng, không phải bước lùi:**
- Anh **chưa từng viết bài báo**. Vòng phản biện đầu tiên nên là vòng **rẻ và nhanh**, không phải
  vòng 4 tháng chờ tạp chí quốc tế rồi ăn desk-reject.
- Có phản biện thật từ người thật → sửa → bản quốc tế mạnh hơn hẳn.
- Có thành tích tính điểm NCKH ngay.

### Tầng 2 — Tạp chí quốc tế **Q2–Q3**, nộp khoảng **tháng 2–4/2027**
Ứng viên (xếp theo độ hợp):
1. **BMC Medical Informatics and Decision Making** — Q2, rất hợp bài prediction model + TRIPOD. *(APC — kiểm tra chính sách miễn giảm)*
2. **Diagnostics** (MDPI) — Q2, nhanh, hợp bài sàng lọc
3. **Scientific Reports** — Q1/Q2, uy tín, `lugner2024` và `zhang2020` đều ở đây
4. **JMIR Medical Informatics** — Q2, mạnh về clinical decision support
5. **IEEE Access** — Q2, nhanh, dễ với bài thiên kỹ thuật *(`hasan2020`, `fazakis2021` ở đây)*
6. **PLOS ONE** — Q2, chấp nhận kết quả âm — **rất hợp với claim C5 của anh**

> ⚠️ **Quy tắc phải nhớ:** bản tạp chí phải có **≥30% nội dung mới** so với bản hội nghị (ví dụ:
> hội nghị chỉ NHANES + ablation; tạp chí thêm external + net benefit + TabPFN) và **phải khai báo**
> bản hội nghị trong cover letter. Không khai = self-plagiarism, hậu quả nặng.

### Vì sao em **KHÔNG** khuyên nhắm Q1 ngay
Không phải vì đề tài yếu — đề tài này đủ mạnh. Mà vì với **bài báo đầu tiên + làm một mình +
6 tháng**, tỉ lệ desk-reject rất cao và anh sẽ mất 3–4 tháng chỉ để biết điều đó. Đi tầng 1 → tầng 2
là đường **nhanh hơn** đến một bài quốc tế thật, không phải đường vòng.

---

## §12. Mốc kiểm tra & tiêu chí DỪNG

### 12.1. Ba mốc — nếu trượt thì phải cắt scope ngay, đừng cố

| Mốc | Hạn | Nếu chưa đạt thì làm gì |
|---|---|---|
| **M1** — dựng được nhãn NHANES, prevalence undiagnosed ~3–5% | hết **tuần 6** | Trễ 1 tuần: bỏ luôn cohort thứ 3. Trễ 2 tuần: giảm còn 3 chu kỳ NHANES |
| **M2** — Table 3 (ablation rò rỉ) có số | hết **tuần 11** | Cắt cấu hình **B, D, G** — **giữ bằng mọi giá E, F, C** *(đổi 26/07 theo Q009 — xem [LEAKAGE_MAP.md §3.1](LEAKAGE_MAP.md); bản cũ ghi "giữ D, E, F" là sai vì gộp under-sampling với over-sampling)* |
| **M3** — External chạy được trên ≥1 cohort | hết **tuần 13** | Đổi sang **temporal external** trong chính NHANES (train chu kỳ cũ → test chu kỳ mới). Yếu hơn nhưng vẫn là external thật, và vẫn ra bài |

### 12.2. Khi nào thì DỪNG thêm thí nghiệm

Dừng ngay khi trả lời được **cả 5 câu** này bằng **số cụ thể**:

1. Làm đúng chuẩn thì AUROC/AUPRC là bao nhiêu? *(C1, C3)*
2. Mỗi kiểu rò rỉ làm phồng lên bao nhiêu điểm? *(C2)*
3. Sang quần thể khác thì tụt bao nhiêu, và recalibration cứu lại được bao nhiêu? *(C4)*
4. ML hơn FINDRISC/ADA bao nhiêu, p bằng bao nhiêu, CI có chồng lấn không? *(C5)*
5. Ở ngưỡng nào thì mô hình còn có net benefit dương? *(C3)*

**Trả lời được 5 câu này = anh có một bài báo.** Thêm thí nghiệm nữa không làm bài mạnh hơn —
chỉ làm anh trễ.

### 12.3. Việc của TUẦN NÀY (26/07 – 02/08/2026)

- [ ] Đọc hết file này một lượt. Ghi lại **chỗ nào anh không đồng ý** → hỏi lại em
- [ ] Đăng ký **CHARLS** (10 phút, rồi quên đi)
- [ ] Tải **NHANES 2017-2018**, dựng bảng nhãn + 10 feature, đếm prevalence
- [ ] Tạo repo Git + `paper/outline.md` với **6 bảng rỗng** (Phase 0)
- [ ] Đọc **`sgchoi2023`** — bài gần đề tài anh nhất

---

## §13. Một lời cuối, với tư cách người hướng dẫn

Anh nói anh đang *"đọc các bài báo một cách vô nghĩa"*. Em muốn anh nhìn lại: anh đã dựng được
một kho 40 bài có gate cứng, có phân tích sâu, có nhật ký tư duy 6 entry. **Đó không phải công
việc vô nghĩa. Đó là phần mà hầu hết người ta bỏ dở.** Anh chỉ đang thiếu đúng một thứ: một
**câu hỏi** để cất tất cả những gì đã đọc vào.

§2.1 là câu hỏi đó. Từ giờ mỗi bài anh đọc đều có chỗ để về.

Và điều em muốn anh giữ nhất — đây cũng là điều làm một bài báo *có thể phản biện được*, khác với
một bài chỉ *nghe hay*:

> **Một bài báo mạnh không phải bài có con số đẹp nhất. Mà là bài mà người phản biện gắt nhất
> cũng không tìm ra chỗ nào anh chưa tự nghĩ tới trước họ.**

Con số 0.99 trên PIMA thì ai cũng có. Cái không ai có, là một bảng chỉ ra **0.99 đó từ đâu ra**.

Anh có mọi thứ cần để làm bảng đó.

---

### 📎 Phụ lục — file liên quan

| File | Vai trò | Còn dùng không |
|---|---|---|
| `QA_LOG.md` | Tư duy & nguyên tắc đã chốt (Q001–Q007) | ✅ đọc đầu mỗi phiên |
| `RESEARCH_BRIEF.md` | Trạng thái kho paper | ✅ nhưng đã cũ (21/06) — kho giờ 40 bài |
| `DECISION_BOARD.md` | Gợi ý promote | ⚠️ viết trước khi chốt đề tài §2 — đọc có chọn lọc |
| `READING_LIST.md` | Xếp hạng đọc cũ | ❌ **thay bằng §6** — nó viết khi chưa biết ràng buộc của anh |
| `AGENTS.md` | Quy ước cho agent | ✅ không đổi |
| **`TO_DO.md`** *(file này)* | **Lộ trình thi công** | ✅ nguồn chân lý cho việc "làm gì tiếp theo" |
