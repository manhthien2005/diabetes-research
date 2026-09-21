# 🧠 QA_LOG — Nhật ký Hỏi–Đáp định hướng (để "huấn luyện" agent về sau)

> **Mục đích.** Lưu lại các câu hỏi *chiến lược / định hướng / phương pháp luận* của anh (user)
> và câu trả lời đã chốt, để mọi AI agent ở các phiên SAU đọc và hiểu **cách anh nghĩ, anh ưu tiên
> gì, anh đã quyết gì** — thay vì trả lời lại từ đầu mỗi lần. Đây là "bộ nhớ huấn luyện" của dự án.
>
> **Khác với các file khác:**
> - `RESEARCH_BRIEF.md` = trạng thái *dữ liệu/paper* hiện tại.
> - `DECISION_BOARD.md` = gợi ý *promote/loại* từng paper.
> - **`QA_LOG.md` (file này)** = *tư duy & nguyên tắc định hướng* của anh, dạng Hỏi–Đáp.
>
> **Quy ước (xem `AGENTS.md` §12):**
> 1. Agent **ĐỌC file này đầu mỗi phiên** (cùng `RESEARCH_BRIEF.md`) để nắm định hướng.
> 2. Sau MỖI câu hỏi chiến lược/định hướng của anh + câu trả lời đã chốt → agent **append 1 entry mới**
>    (không sửa entry cũ; nếu một quyết định bị đảo → thêm entry mới ghi rõ "thay thế Q###").
> 3. Mỗi entry phải có trường **`Nguyên tắc rút ra`** — phần giá trị nhất cho việc huấn luyện
>    (1–3 câu nguyên tắc tái dùng được, không phải tóm tắt dài).
> 4. Bản máy đọc song song: **`qa_log.json`** (cùng nội dung, để export làm dữ liệu fine-tune sau này).
>
> **Định dạng 1 entry:** xem mẫu bên dưới.

---

## 📑 Mục lục

| ID | Ngày | Chủ đề | Một câu |
|----|------|--------|---------|
| [Q001](#q001) | 2026-06-22 | Chiến lược đóng góp · tổng hợp nhiều paper thành 1 bài | Ghép thành phần từ nhiều bài có cho "đóng góp cao" không? |
| [Q002](#q002) | 2026-06-23 | Phán quyết mũi nhọn · ưu/nhược · tại sao ít ai làm | Hướng leakage-safe + external + đánh giá thật có nên là mũi nhọn? |
| [Q003](#q003) | 2026-06-23 | Chọn mô hình tốt nhất · winner's curse · model selection | "Chạy N mô hình, lấy cái chính xác nhất" có chuẩn thực tế? |
| [Q004](#q004) | 2026-06-23 | Model–population matching · No Free Lunch · cherry-pick | Mô hình khác thắng trên dataset khác → lấy theo dataset, đúng ý nghĩa y khoa? |
| [Q005](#q005) | 2026-07-01 | Làm giàu kho · sub-agent · bão hòa tìm kiếm | Có thể tìm liên tục đến khi gần như đủ paper đạt chuẩn không? |
| [Q006](#q006) | 2026-07-06 | Đề tài mới · phân loại giai đoạn · scope · kiểm phủ kho | Kho đủ bài cho 2 đề tài (phát hiện sớm + phân loại giai đoạn) chưa? |
| [Q007](#q007) | 2026-07-26 | CHỐT ĐỀ TÀI · lộ trình 20 tuần · TO_DO.md · chọn venue | Anh cần làm gì để có model ý nghĩa + bài báo phản biện được? |
| [Q008](#q008) | 2026-07-26 | Duyệt lại toàn kho · chạy lại verdict · trục `role` · từ điển thuật ngữ | Verdict cũ có còn đúng sau khi đề tài đã chốt không? |
| [Q009](#q009) | 2026-07-26 | Đóng góp tiếp theo · research thêm vs phân loại · bản đồ vi phạm | Em còn làm gì được cho đề tài — tìm thêm bài hay phân loại bài toán? |
| [Q010](#q010) | 2026-07-26 | CHỐT PHẠM VI · hệ thống web+app+server · XAI · dữ liệu bệnh viện | Xây cả hệ thống tạo "vòng tuần hoàn" có đúng không, có đáp ứng yêu cầu không? |

---
<!-- ENTRIES_BELOW -->

<a id="q010"></a>
## Q010 — CHỐT PHẠM VI: KHÔNG xây hệ thống web+app+server; đảo lịch tiếp cận dữ liệu bệnh viện lên sớm

**Ngày:** 2026-07-26 · **Tags:** `chot-pham-vi` · `chong-scope-creep` · `vong-tuan-hoan-khong-khep` · `nhan-can-xet-nghiem` · `app-da-bao-hoa` · `benh-vien-la-nguon-du-lieu` · `irb-thoi-gian-cho` · `xai-phuc-vu-c5` · `repo-tai-lap` · **Cách tạo:** Claude đọc `TO_DO.md` (full), `START_HERE.md`, `QA_LOG.md` Q001–Q009; grep 40 `summary.json` tìm bài đã có deploy/app; 2 lượt kiểm chứng web ngày 26/07/2026 (ADA/CDC risk test, FINDRISC calculator + triển khai eHealth, JMIR mHealth 2018). KHÔNG dùng sub-agent (theo global CLAUDE.md).

**❓ Câu hỏi (anh):**
> Để bài NCKH này trở nên hoàn chỉnh, chúng ta không những xây dựng một model mà còn xây dựng cả một hệ thống (web, app mobile, server, data) kết hợp lại, tạo nên một vòng tuần hoàn mạnh mẽ. Em thấy vậy có đúng không? Với anh, một sinh viên chuyên ngành viết phần mềm, làm điều đó cũng đúng và đáp ứng yêu cầu đúng không?
>
> *(3 câu hỏi nối tiếp)* Nhưng cần có XAI mà · Đó giờ không có app nào sao? · Trường hợp xây app liên kết đến data của một bệnh viện, bệnh nhân dự đoán ĐTĐ qua chỉ số họ khám / bệnh viện lưu / khám định kỳ thì sao?

**✅ Trả lời (đã chốt):**

**1. Lý do bác KHÔNG phải "không đủ thời gian" — mà là vòng tuần hoàn KHÔNG KHÉP ĐƯỢC về cấu trúc.**
Nhãn của đề tài định nghĩa bằng **xét nghiệm máu** (HbA1c ≥ 6.5% / FPG ≥ 126 / OGTT2h ≥ 200 — `TO_DO §4.2`), feature là **no-lab**. Đó chính là điểm đẹp chống rò rỉ (§2.2-1), nhưng hệ quả trực tiếp: **một app no-lab không bao giờ quan sát được nhãn** ⇒ không retrain, không đo đúng/sai, không có vòng lặp. Dữ liệu chảy vào rồi nằm chết. Lập luận này mạnh hơn lập luận lịch trình vì nó **không bị phản bác bằng "cố gắng hơn thì được"**.

**2. App không phải gap — ô này đã bão hoà, và đã có bằng chứng trong chính kho anh.**
Ngoài đời: [ADA 60-Second Risk Test](https://diabetes.org/diabetes-risk-test) (web, miễn phí, chính là baseline C5), FINDRISC calculator trên QxMD/Medscape + triển khai eHealth quy mô dân số ở Mỹ Latinh–Caribe (PMC10332265), và **JMIR mHealth 2018** — *"A Mobile App for Identifying Individuals With Undiagnosed Diabetes and Prediabetes"*, nghiên cứu tiến cứu 2 năm — **đúng ý tưởng của anh, đăng từ 8 năm trước**.
Trong kho: `tasin2022` (**320 cite**) có web **+ app Android** + SHAP + LIME + code public — và verdict của chính kho vẫn chấm nó *"không K-fold CV, XAI định tính, vài số liệu lệch nội tại"*. `phan2025` có web deploy nhưng *"không có code repository"*. `hennebelle2023` có cả MLOps + IoT + blockchain nhưng *"đóng góp đo được mỏng"*. **⇒ App không cứu được bài yếu phương pháp.** Ô trống thật vẫn là **0/35 bài có net benefit** và **31/35 không có code**.

**3. Ý "app nối dữ liệu bệnh viện" của anh ĐÚNG HƯỚNG hơn hẳn — nó tự sửa vấn đề ở mục 1 (bệnh viện có xét nghiệm ⇒ có nhãn). Nhưng phải tách hai khái niệm:**

> **Bệnh viện là NGUỒN DỮ LIỆU, không phải NƠI TRIỂN KHAI.**

| | Vì sao |
|---|---|
| **Sai chỗ triển khai** | Bệnh nhân khám định kỳ **đã có HbA1c** ⇒ là người **ít cần mô hình no-lab nhất**. Dự đoán cho họ = dùng biến yếu đoán thứ đã biết chắc. Mô hình no-lab sinh ra cho người **không đến bệnh viện** (trạm y tế xã, sàng lọc cộng đồng) |
| **Đúng chỗ dùng** | Dữ liệu **hồi cứu** đã có sẵn nhãn ⇒ **external validation trên quần thể VN**, mạnh hơn KNHANES với hội đồng VN |
| **App thêm 0 giá trị khoa học** | *CSV ẩn danh* vs *app nối HIS* cho ra **cùng một bảng kết quả**. Nhưng app cần thêm: phòng CNTT + nhà cung cấp HIS (VNPT-HIS/FPT.eHospital, hệ đóng) + nghĩa vụ bảo mật PHI + Nghị định 13/2023. Bác sĩ thân xin được **bản xuất dữ liệu**; gần như không bác sĩ nào xin được **quyền API vào HIS** |
| **Hệ quả khoa học phải khai báo** | **Spectrum bias** — người đến viện ≠ dân số chung ⇒ 1 dòng bắt buộc trong Limitations, tự nêu trước để chặn reviewer R3 |

**4. ⚠️ ĐẢO LỊCH — sửa một chỗ trong `TO_DO §4.4`.** File đó ghi *"Tầng 3 — KHÔNG làm trong 3–6 tháng này"*. Giữ nguyên phần **LÀM**, nhưng **phần HỎI thì xếp sai**: IRB mất 1–3 tháng là **thời gian CHỜ, không tốn giờ trên đường găng**. ⇒ Đi gặp bác sĩ + nộp IRB nên làm **tuần 2–3**, không phải tuần 20. Đây là **quyền chọn miễn phí**: kịp tuần 12 → cohort VN vào Table 4; không kịp → KNHANES vẫn tải được trong 1 buổi, **không mất gì**.

**5. XAI: giữ, nhưng nó là BẰNG CHỨNG CHO C5, không phải một mục riêng.** Mô hình chỉ ~10 biến no-lab ⇒ SHAP gần như hiển nhiên, và **đó chính là giá trị**: nếu SHAP cho thấy mô hình đang học đúng 8 mục của FINDRISC theo đúng thứ tự → có **bằng chứng cơ chế** cho C5 (*"ML hoà FINDRISC không phải vì tuning kém — nó đang tái phát hiện lại chính FINDRISC từ dữ liệu"*), chặn thẳng reviewer câu 7. **Chi phí ~1 ngày** (`shap.TreeExplainer` + 1 beeswarm + 1 bar), xếp **Tầng 1**. **KHÔNG** làm: SHAP vs LIME vs Anchors (`ahmed2024` làm rồi), XAI local từng bệnh nhân, "module giải thích" — niche đã bão hoà trong chính Layer 4 của kho.

**6. Phần mềm ĐƯỢC GIỮ — ~2 tuần, nằm ở CUỐI, không nằm ở ĐẦU:**

| Thứ | Bắt buộc? | Chi phí | Lý do |
|---|---|---|---|
| **Repo 1 lệnh ra hết bảng/hình**, seed cố định, `environment.yml` | ✅ | ~1 tuần | **31/35 bài không có** (P3). Reviewer câu 12. Đây là chỗ lợi thế dân phần mềm đổi được thành uy tín khoa học |
| **SHAP global** | ✅ nên | ~1 ngày | Phục vụ C5 (mục 5) |
| **Model card** (P4) | ✅ nên | ~1 ngày | Thứ đưa bác sĩ đọc |
| **Demo 1 trang, KHÔNG lưu dữ liệu** | 🟡 tuỳ chọn, cuối cùng | ~3 ngày | Để hội đồng bấm thử + thuyết phục bác sĩ. **Không lưu = không IRB, không rủi ro PHI** |
| Web + mobile + server + vòng dữ liệu | ❌ | 200–400h | Bài 2 / sản phẩm chuyển giao, **sau** khi có Table 2–4 |

**7. Sửa cách phát biểu mục tiêu (anh tự hỏi lại: *"chỉ cần xây model + có bài báo"*).**
**Không phải "xây được model" — mà là "ĐO ĐƯỢC".** Vì claim C5 nói *ML ≈ FINDRISC*, nên nếu anh đặt mục tiêu là *model tốt*, anh sẽ tune AUC lên và **làm việc chống lại chính luận điểm của mình**. Model chỉ là **cái máy đo** để ra 5 con số ở `§12.2`. Máy đo không cần đẹp — cần **đáng tin**.
> **Sản phẩm đầu cuối chốt: 1 phép đo sạch → 5 con số → 1 bài báo + 1 repo tái lập.**

**8. Trả lời thật câu *"có chắc chắn là tốt nhất không"*:** chắc **trong ràng buộc của anh** (bài đầu tiên, một mình, 20 tuần, không kinh phí) — không phải trần cao nhất tuyệt đối (cohort tiến cứu VN cao hơn, nhưng cần 1–2 năm). Hai chỗ hở phải biết: (a) rủi ro thật là **bị nhóm medRxiv 2025.09.05.25335151 công bố phần phân rã trước** ⇒ chống bằng **đi nhanh**, không phải làm rộng; (b) nó **chỉ tốt nhất nếu làm xong** — kế hoạch hoàn hảo bỏ dở tuần 14 thua bài Tầng 0 nộp đúng hạn.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Khi user — vốn là dân phần mềm — đề xuất mở rộng sang **HỆ THỐNG** (web/app/server/"vòng tuần hoàn dữ liệu"), **đừng bác bằng lý do lịch trình**; hãy kiểm tra trước xem **vòng phản hồi có KHÉP ĐƯỢC không**. Một app chỉ retrain được nếu nó **quan sát được NHÃN**; với đề tài no-lab thì nhãn nằm ở xét nghiệm máu ⇒ vòng tuần hoàn **bất khả thi về CẤU TRÚC, không phải về nguồn lực**. Lập luận cấu trúc không bị phản bác bằng *"em cố gắng hơn thì được"*, lập luận lịch trình thì có. Luôn tách **NGUỒN DỮ LIỆU** khỏi **NƠI TRIỂN KHAI**: người đã xét nghiệm máu là người **ít cần** mô hình no-lab nhất nhưng lại là **dữ liệu validation tốt nhất** — nhầm hai thứ này là triển khai đúng vào chỗ mô hình vô dụng. Khi bác một đề xuất, **bắt buộc trả lại phiên bản hẹp có giá trị** (ở đây: bỏ hệ thống, **giữ repo tái lập** — thứ 31/35 bài không có ⇒ lợi thế phần mềm được tiêu đúng chỗ mua được uy tín khoa học). Việc chỉ tốn **THỜI GIAN CHỜ** mà không tốn giờ đường găng (IRB, đăng ký cohort) phải khởi động **sớm nhất có thể**, kể cả khi sản phẩm của nó thuộc về bài sau — đó là quyền chọn miễn phí. Cuối cùng, khi claim của bài là *"A ≈ B"*, đừng để user đặt mục tiêu là *"xây model tốt"* — mục tiêu đúng là **phép đo sạch**, nếu không user sẽ tối ưu ngược lại chính luận điểm của mình.

**🔗 Liên quan:** [[Q007]] (đề tài chốt · `TO_DO §4.4` Tầng 3 — mục 4 ở trên **đảo phần HỎI lên sớm**, giữ phần LÀM) · [[Q002]] (cảnh báo scope creep "mài 1 lưỡi") · [[Q009]] (nguyên tắc: từ chối làm giàu KHO, trả lại phiên bản hẹp) · `START_HERE.md` §2 (3 việc Tầng 0) + Tầng 2 (web demo tuỳ chọn — nay chốt là ~3 ngày, không lưu dữ liệu) · `TO_DO.md` §3.1 (P3 repo, P4 model card) · §5.1 (đường găng) · §12.2 (5 câu hỏi = định nghĩa DỪNG) · `searched_papers/Layer_4_XAI_Trien_Khai/tasin2022_*` (bằng chứng app đã bão hoà) · ADA 60-Second Risk Test · JMIR mHealth 2018 (10662).

<a id="q009"></a>
## Q009 — Đóng góp tiếp theo: research thêm paper hay phân loại bài toán? (sinh ra `LEAKAGE_MAP.md`)

**Ngày:** 2026-07-26 · **Tags:** `dong-gop-tiep-theo` · `bao-hoa-tim-kiem` · `phan-loai-vi-pham` · `ablation-table3` · `pima-circularity` · `winners-curse-tan-suat` · `minh-bach-bao-cao` · **Cách tạo:** Claude đọc `QA_LOG` Q001–Q008 + `TO_DO.md` + `START_HERE.md` + `PROGRESS.json`; quét regex 2 vòng trên 35 `extracted.md` (vòng 1 theo từ khoá, vòng 2 chỉ lấy câu/đoạn NÊU THỨ TỰ) + đối chiếu 35 `summary.json`. KHÔNG dùng sub-agent (theo global CLAUDE.md).

**❓ Câu hỏi (anh):**
> Bây giờ em còn có thể làm gì để cống hiến cho đề tài này? Em có thể research thêm bài báo để làm giàu trường hợp không? Hay là phân lớp và phân loại các bài toán, và làm giàu theo từng loại để từ đó làm nền tảng cho việc xây dựng model?

**✅ Trả lời (đã chốt):**

**1. Cả hai đề xuất đều ĐÚNG HƯỚNG nhưng SAI PHIÊN BẢN — và lý do giống nhau: chúng làm giàu KHO, trong khi thứ đang thiếu là làm giàu BÀI BÁO.**
- *Research thêm paper*: kho đã bão hoà cho đề tài đã chốt (Q005 gate §7 + Q007 cắt còn 12 bài đọc kỹ + `START_HERE §4` cắt tiếp còn **2 bài phải mở PDF**). Bài thứ 41 chỉ làm to mẫu số, không đẩy được mốc nào trong 4 mốc đường găng. Phiên bản đáng làm là một cuộc tìm **hẹp 2 câu hỏi**: (a) có ai đã công bố DCA/net-benefit cho sàng lọc no-lab chưa (nếu có thì C3 phải đổi cách phát biểu — biết SỚM, không phải tuần 15); (b) đối thủ medRxiv thiếu gì (`V4`).
- *Phân loại bài toán*: trục anh mô tả **đã tồn tại hai lần** — `prediction_horizon` (§3b) và `role` 🅐–🅕 (Q008) — và Q007 đã cố ý **thu về đúng một ô**. Làm giàu các ô còn lại = xây nền cho *bài thứ 2*.

**2. Phiên bản ĐÚNG của đề xuất 2 = phân loại theo VI PHẠM, không theo chủ đề.** Anh chọn hướng này. Sản phẩm: **`LEAKAGE_MAP.md` + `leakage_map.json`** — 35 bài × 6 cấu hình ablation B–G của `TO_DO §7.2`. Nó đổi Table 3 từ *7 dòng do agent phỏng đoán* thành *7 dòng có tần suất đo được từ chính kho anh*.

**3. Quyết định thiết kế quan trọng nhất: 4 trạng thái, KHÔNG phải 2.**
`✗ vi phạm` / `✓ làm đúng` / **`? không nêu`** / `– N/A`. Ép về nhị phân là tự tạo claim sai về người khác. Kèm 3 mức bằng chứng: `quote` (trích nguyên văn có số dòng — hiện **17 ô**) · `analysis` (từ `summary.json`) · `structural` (suy từ cách dựng dataset). Mọi ô không phải `quote` đều PHẢI mở `source.pdf` trước khi viết vào bài.

**4. Bốn kết quả — trong đó một cái ĐẢO ưu tiên đã ghi trong `TO_DO`:**

| # | Kết quả | Hệ quả |
|---|---|---|
| a | **Dòng D gần như dòng chết.** Chỉ 10/35 bài dùng oversampling sinh mẫu tổng hợp; trong đó **5 bài nêu rõ đã làm ĐÚNG**, 4 không nêu, 1 nghi sai | `TO_DO §12.1` đang viết *"giữ bằng mọi giá D, E, F"* — **sai**. Ưu tiên đúng theo số liệu là **E → F → C**. Phân biệt then chốt: **under-sampling KHÔNG rò rỉ** (không có mẫu tổng hợp vượt rào), nó chỉ làm sai prevalence ⇒ thuộc dòng **G**, không phải D |
| b | **Winner's curse (E) là vi phạm phổ biến nhất: 25/34.** Nặng nhất `nipa2023` — quét **35 classifier** trên **1 split cố định**, tự thừa nhận *"no validation methods being used"* | Nâng giá trị `T0.13`; đường cong "độ phồng theo số model" có mốc thật để neo: N = 2, 5, 10, **35** |
| c | **PIMA rò rỉ theo CẤU TRÚC.** Cột `Glucose` = đường huyết 2h OGTT, mà nhãn PIMA lại định nghĩa bằng chính ngưỡng OGTT 2h ≥ 200 mg/dL ⇒ **10 bài** trong kho đưa biến định-nghĩa-nhãn vào feature mà tác giả không cố ý | Câu Introduction mạnh và rẻ. Tách bạch với **10 bài** rò rỉ vì lỗi của chính tác giả (`olisah2022` relabel theo glucose, `zou2018` glucose là root node, `zhang2020` urine glucose…) — hai loại khác bản chất, phải nói rõ bài nào thuộc loại nào |
| d | **26/35 bài không nêu thứ tự tiền xử lý so với split** (dòng B: chỉ 4 ✗ và 3 ✓) | Phát biểu an toàn: *"chỉ 3/35 nghiên cứu mô tả đủ rõ để người đọc kiểm chứng được rằng không xảy ra rò rỉ"* — nói về **mức độ báo cáo**, không nói về ý định tác giả ⇒ không thể bị cãi. Dẫn thẳng vào đóng góp **P2** |

**5. Hai bài tự viết ra thứ tự rò rỉ trong chính abstract của mình** — `hasan2020` (L21, L39) và `abnoosian2023` (L19, L37) đều liệt kê pipeline dạng *"… feature selection, **K-fold cross-validation**, và các classifier"*, tức CV nằm SAU tiền xử lý và chọn biến. Đây là 2 ô `quote` đắt nhất trong bản đồ.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Khi user hỏi *"còn làm gì được nữa"* ở giai đoạn THI CÔNG, mặc định đúng là **từ chối mọi việc làm giàu KHO** và chuyển năng lượng sang làm giàu BÀI BÁO — vì việc làm giàu kho luôn *cảm thấy* năng suất và không có điểm dừng, đó chính là cái bẫy đã sinh ra `START_HERE.md`. Nhưng đừng bác bỏ trắng: mỗi đề xuất của user thường có một **phiên bản hẹp** đi thẳng vào đường găng — hãy tìm phiên bản đó và trả lại (ở đây: "phân loại bài toán" → **phân loại theo VI PHẠM**, biến ablation từ phỏng đoán thành tần suất đo được). Khi lập bản đồ vi phạm của người khác, **BẮT BUỘC dùng 4 trạng thái chứ không 2**: `?không nêu` phải là một trạng thái hạng nhất, vì phần lớn paper im lặng, và *"chỉ N/35 bài mô tả đủ rõ để kiểm chứng"* là một claim mạnh mà **không thể bị cãi**, trong khi *"N bài vi phạm"* thì cãi được. Luôn tách **rò rỉ do CẤU TRÚC DATASET** (PIMA) khỏi **rò rỉ do lỗi tác giả** — gộp chung là vu oan hàng loạt. Và phải phân biệt **under-sampling (làm sai prevalence, không rò rỉ)** với **over-sampling tổng hợp (rò rỉ thật)** — gộp hai thứ này chính là lý do `TO_DO §12.1` đặt sai ưu tiên.

**🔗 Liên quan:** [[Q003]] (winner's curse — nay đã có tần suất 25/34) · [[Q005]] (bão hoà tìm kiếm — nền của kết luận "không tìm thêm") · [[Q007]] (đề tài chốt · `TO_DO §7.2` 7 cấu hình · §12.1 ưu tiên cần sửa) · [[Q008]] (quy tắc claim về người khác phải xác minh 2 nguồn) · **`LEAKAGE_MAP.md` + `leakage_map.json` (sản phẩm chính của phiên này)** · `PROGRESS.json` `T0.11`–`T0.15`, `V3`.

---

<a id="q008"></a>
## Q008 — Duyệt lại toàn kho + chạy lại verdict sau khi đề tài đã chốt (sinh ra trục `role`)

**Ngày:** 2026-07-26 · **Tags:** `duyet-lai-kho` · `chay-lai-verdict` · `vai-tro-paper` · `schema-metadata` · `citation-refresh` · `openalex-duplicate` · `prediction-horizon` · `tu-dien-thuat-ngu` · **Cách tạo:** duyệt tay 40 `metadata.json` + 35 `summary.json` + 35 `analysis.html`; kiểm chứng citation live OpenAlex **2 endpoint** (26/07/2026); đọc `extracted.md` của `deberneh2021` để xác minh horizon; script vá read-modify-write có backup. KHÔNG dùng sub-agent (theo global CLAUDE.md).

**❓ Câu hỏi (anh):**
> Chạy duyệt qua lại các bài báo. Fix nếu thấy có vấn đề. Thêm phần **thuật ngữ cần biết** trong thư viện (mục kế bên Code/Dataset) để anh biết các thuật ngữ chuyên ngành. Chạy lại **verdict** các bài đã chọn lọc — xác định xem có vấn đề gì cần giải quyết không? Fix luôn.

**✅ Trả lời (đã chốt):**

**1. Vấn đề gốc của verdict — không phải sai số, mà sai NGHĨA.**
Toàn bộ verdict trong kho được viết 06–07/2026, khi câu hỏi còn là *"bài này có tốt không"*. Từ Q007 đề tài đã chốt, câu hỏi đúng đã thành *"bài này dùng vào việc gì"*. Hệ quả cụ thể và nguy hiểm: `rasmy2021` và `li2020` mang badge **Strong** trong Thư viện, trong khi `TO_DO §6 🅕` đã chốt là **KHÔNG tái lập được** (Cerner/CPRD gated, compute ngoài tầm tuyệt đối) — badge đang mời anh đi sai hướng đúng lúc anh cần tập trung.

**2. Cách sửa — thêm trục, không ép một trường gánh hai nghĩa.**
Thêm trường **`role`** (6 giá trị = 🅐–🅕 của `TO_DO §6`) vào `metadata.json` + `summary.json`, hiện ra Thư viện thành cột **Vai trò** + chip lọc + sort **"Thứ tự đọc"** (mặc định). Verdict giữ nguyên nghĩa *chất lượng bài*; role trả lời *dùng vào việc gì*. Phân bố: **5 Thiết kế · 4 Phương pháp · 1 Định vị · 4 Dẫn chứng thổi phồng · 3 Đọc sau · 23 Related work**.

**3. Bốn verdict THỰC SỰ đổi** (verdict cũ giữ ở `verdict_prev` / `verdict_reason_prev`, không xoá):

| Bài | Cũ → Mới | Vì sao lập luận cũ hỏng |
|---|---|---|
| `deberneh2021` | strong → **maybe** | Lý do cũ là *"bài neo hiếm cho `early_detection` thực thụ"*. Horizon đã sửa đúng thành `long_term_risk` (dự đoán onset năm Y+1 từ feature năm Y, có follow-up — §3b) mà nhánh đó đã có 5 bài ⇒ lý do bốc hơi. Cộng: nhãn 3 lớp định nghĩa bằng FPG trong khi FPG là feature #1 (rò rỉ), data + code private, không báo AUC. |
| `olisah2022` | strong → **maybe** | Dữ kiện không đổi (243 cite, CMPB, code public) nhưng kết luận đổi: bài relabel theo glucose rồi đưa glucose vào feature và báo **ORF 100%** là **ĐỐI TƯỢNG bị đề tài phê phán**, không phải baseline để "chạy lại". Vai trò đúng = 🅓 lấy đúng 1 con số. |
| `xu2025` | maybe → **weak** | Kiểm lại OpenAlex 26/07: **vẫn 27 cite** (khung 1–3 năm cần ≥30) — kỳ vọng *"đạt ≥30 sau ~2 tháng"* ghi trong `rejected.json` KHÔNG thành. |
| `jin2025` | maybe → **weak** | Vẫn 0 cite, code null, MGB private — trượt cả 3 gate §7, đã nằm trong `rejected.json`; "maybe" gây hiểu nhầm là còn cân nhắc. |

**4. Lỗi dữ liệu đã vá — còn 0 vi phạm trên 40 bài.**
`xu2025` `status:"kept"` (ngoài enum §5, lại mâu thuẫn với `rejected.json`) → `rejected` + `reject_reason` · `jin2025` `layer:null` → `3` · 8 bài `pdf_status:null` dù có `source.pdf` → `downloaded` · 36 bài thiếu `label_type` → backfill (`abnoosian2023` & `deberneh2021` = `multiclass_staging` vì nhãn 3 lớp thật) · 3 bài `horizon_uncertain:null` → `false` · `deberneh2021` horizon sửa ở CẢ `metadata.json`, `summary.json` và `analysis.html` (4 chỗ) · `ahmed2024` badge Horizon đưa về đúng khối badges §6.

**5. ⚠️ Bẫy kỹ thuật mới — OpenAlex có bản ghi TRÙNG theo DOI.**
Endpoint `/works/doi:<doi>` trả về **0 citations** cho `yu2010` (khớp nhầm một bản ghi 2008); endpoint `/works?filter=doi:<doi>` trả `meta.count = 2` và bản đúng có **524 citations**. Nếu tin số trực tiếp thì `yu2010` — **bài neo 🅐 của đề tài** — đã bị kết luận sai là trượt §7. **Quy tắc: luôn tra bằng `filter=doi:` và kiểm `meta.count == 1`.**

**6. Citation làm mới toàn kho** (31/40 bài đổi số): `hasan2020` 433→**589** · `khanam2021` 378→**483** · `naz2020` 272→**340** · `tasin2022` 266→**320** · `ahmed2022` 237→**288** · `dutta2022` 125→**161**. Đồng bộ luôn số trong header `analysis.html` (32 file) và trong văn xuôi `summary.json` (17 chỗ). `phan2025` giữ số **Scopus 7** trong analysis.html và ghi thêm **OpenAlex 4** bên cạnh — KHÔNG ghi đè con số có nguồn khác.

**7. §7 là cổng NHẬN VÀO, không phải cổng duy trì.**
Hôm nay 4 bài không đạt ngưỡng: `gr2024` (11 cite) và `phan2025` (4 cite) — **cả hai anh tự promote**, quyền của anh; `agliata2023` (61) và `nipa2023` (32) vừa vượt mốc 3 năm nên ngưỡng nhảy từ 30 lên 100. **Không loại bài nào.** Đã ghi `s7_recheck` vào cả 40 `metadata.json` để phiên sau khỏi tranh luận lại.

**8. Từ điển thuật ngữ** — tab **"Thuật ngữ"** cạnh "Code / Dataset": **87 mục / 8 nhóm**, mỗi mục có nghĩa tiếng Việt · giải thích dễ hiểu · **"vì sao quan trọng với đề tài anh"** · bẫy hay gặp · công thức. API dò `extracted.md` để chấm xanh thuật ngữ **thật sự có trong bài** kèm trích đoạn ngữ cảnh (`yu2010`: 28 mục · `nnamoko2020`: 32 mục).

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Khi đề tài được CHỐT, mọi verdict viết trước đó **lỗi thời về NGHĨA chứ không chỉ về số**: chúng trả lời *"bài này tốt không"* trong khi câu hỏi đúng đã thành *"bài này dùng vào việc gì"*. Đừng ép một trường gánh hai nghĩa — **thêm trục `role` mới**, và chỉ sửa verdict ở những bài mà **LẬP LUẬN cũ đã hỏng** (không phải ở mọi bài), giữ verdict cũ trong `verdict_prev`. Khi làm mới số liệu từ API, **luôn kiểm chứng qua HAI endpoint và đối chiếu ngày xuất bản** — OpenAlex có bản ghi trùng theo DOI, và một lần tra sai đủ để kết luận sai về một bài neo. Cổng chất lượng kiểu §7 là **cổng NHẬN VÀO tại thời điểm tìm được, không phải cổng duy trì**: đừng loại một bài chỉ vì nó già đi qua mốc, nhưng PHẢI ghi lại kết quả kiểm (`s7_recheck`) để phiên sau không tranh luận lại.

**🔗 Liên quan:** [[Q007]] (đề tài chốt — nguồn của 6 vai trò) · [[Q003]] (winner's curse — nền của nhóm "Rò rỉ" trong từ điển) · [[Q005]] (gate §7) · `AGENTS.md` §3b/§5/§7/§11 · `TO_DO.md` §6 · `CHEATSHEET.md` §7 · `rejected.json` · `webapp/src/lib/glossary.ts` · `webapp/src/lib/roles-public.ts`.

---

<a id="q007"></a>
## Q007 — CHỐT đề tài + lộ trình thi công 20 tuần (sinh ra `TO_DO.md`)

**Ngày:** 2026-07-26 · **Tags:** `chot-de-tai` · `lo-trinh` · `to-do` · `undiagnosed-diabetes` · `no-lab` · `cross-population-external` · `decision-curve` · `survey-weights` · `chon-venue` · `scope-sinh-vien` · **Cách tạo:** Claude đọc trực tiếp toàn kho (40 paper metadata + 35 `summary.json`), grep định lượng `extracted.md` toàn kho về calibration/PR-AUC/DCA/external/survey-weight, + 12 lượt kiểm chứng web ngày 26/07/2026 (TabPFN v2, TRIPOD+AI/PROBAST+AI, Endocrine Connections 2025, đối thủ medRxiv 2025.09.05.25335151, khả năng tiếp cận NHANES/KNHANES/CHARLS/HRS/ELSA, quota Kaggle), + 4 câu hỏi ràng buộc hỏi trực tiếp anh. KHÔNG dùng sub-agent (theo global CLAUDE.md).

**❓ Câu hỏi (anh):**
> Biến em thành một người thầy. Đọc toàn bộ bài báo + research trên các nền tảng. Để anh xây được model thật sự có ý nghĩa và bài báo mang tính khoa học, **phản biện được** — anh cần làm gì? Viết `TO_DO.md` liệt kê phải đọc bài nào, đóng góp gì, tự thiết kế & xây bài xịn cần làm gì, **chứng minh được gì**. Anh là sinh viên, chỉ có Kaggle hoặc thuê 1 GPU rẻ. Anh đang không rõ định hướng, chỉ đọc paper một cách vô nghĩa.

**📌 Ràng buộc anh chốt khi được hỏi:** deadline **3–6 tháng** · đầu ra **nhờ em tư vấn chọn** · dữ liệu: **"cần chạy tốt trên một bộ dữ liệu CHUẨN trước, lấy đó làm chuẩn mới xin được dữ liệu từ bệnh viện"** (anh có quan hệ với một bác sĩ) · **chưa từng viết bài báo khoa học**.

**✅ Trả lời (đã chốt) — chốt 1 đề tài duy nhất + lộ trình 20 tuần, xuất ra `TO_DO.md`:**
- **Chẩn đoán gốc rễ:** anh không đọc sai bài — anh **đọc mà chưa có một CÂU CLAIM để cất bài vào**. Chữa bằng cách chốt claim TRƯỚC, rồi mỗi paper rơi vào đúng 1 trong 4 ô: Nền / Đối thủ / Bằng chứng-gap / Related-work.
- **ĐỀ TÀI CHỐT:** *sàng lọc ĐTĐ **chưa được chẩn đoán** bằng biến **không-xét-nghiệm (no-lab)**; định lượng xem khoảng cách ML-vs-thang-điểm-lâm-sàng còn lại bao nhiêu sau khi (a) chặn rò rỉ, (b) đánh giá ở prevalence thật bằng AUPRC + calibration + **net benefit**, (c) external **cross-population**.* Chọn vì: **nhãn (HbA1c/FPG/OGTT) và feature (no-lab) tách bạch BY DESIGN → leakage-safe theo cấu trúc, không phải theo cố gắng** — miễn nhiễm đúng cái bẫy đã giết zhang2020/deberneh2021/lai2019/fazakis2021/olisah2022; có 6 bài neo sẵn (yu2010, dinh2019, choi2014, sgchoi2023, zhang2020, lugner2024); và **không thể thất bại về mặt khoa học** (kết quả âm CHÍNH LÀ claim).
- **LOẠI có lý do:** (1) staging 3 lớp (Q006) — niche gần rỗng + rò rỉ nhãn kép phải biện hộ suốt bài → quá nhiều mặt trận cho bài đầu tiên trong 6 tháng, cất làm bài 2; (2) foundation model EHR (rasmy2021/li2020) — Cerner/CPRD không tiếp cận được, compute ngoài tầm tuyệt đối → **chỉ trích dẫn Related Work, KHÔNG tái lập**. ⚠️ Hệ quả: **`READING_LIST.md` xếp rasmy2021 "Tier 1 đọc kỹ nhất" là KHÔNG còn đúng** với ràng buộc mới → §6 của `TO_DO.md` thay thế nó.
- **2 khe hở kỹ thuật mới tìm được (chưa có trong Q001–Q006):**
  - **DCA = 0/35.** Grep toàn kho: **KHÔNG MỘT BÀI NÀO** dùng decision curve analysis / net benefit; calibration ~2/35; PR-AUC ~3/35; external thật ~3/35; code public 4/35. Đây là bằng chứng gap lấy từ **chính kho anh**, không phải đi mượn.
  - **Survey-design-aware evaluation.** NHANES là complex survey (WTMEC2YR/SDMVSTRA/SDMVPSU). `dinh2019` (434 cite): **0 lần** nhắc trọng số. `yu2010` (457 cite): dùng SUDAAN **chỉ cho baseline hồi quy logistic, KHÔNG cho SVM** → **so sánh bất đối xứng**. Rẻ, mới, khó cãi. ⚠️ Anh phải **mở source.pdf xác minh tay** trước khi viết (claim về người khác).
- **Khe hở của đối thủ gần nhất** (medRxiv 2025.09.05.25335151, đã cảnh báo từ Q002): nó *đã kết luận* "without lab data, FINDRISC still matches or exceeds ML" nhưng **chỉ như nhận xét phụ** — không phân rã leakage, không net benefit, không cross-population. Anh biến nhận xét phụ của họ thành **kết quả chính có định lượng**.
- **Dữ liệu 3 tầng** (khớp đúng chiến lược anh): Tầng 1 **NHANES** (tải ngay, không đăng ký) → Tầng 2 **KNHANES** (ưu tiên 1, harmonize dễ nhất, có 2 bài neo) + **CHARLS** (đăng ký free ~1 tuần, nộp ngay tuần này làm dự phòng) → Tầng 3 **bệnh viện VN sau**. Quy tắc cứng: **cohort external không được đụng tới trước Phase 3**.
- **5 claim C1–C5** kèm bằng chứng bắt buộc + câu phản biện + câu trả lời chuẩn bị sẵn; **Table 3 = ablation rò rỉ 7 cấu hình** là trái tim bài (dòng F tái tạo được ~0.99 bằng cách cố ý vi phạm 1 quy tắc → giải thích được luôn con số của olisah2022/naz2020/kaliappan2024/abnoosian2023).
- **Compute: KHÔNG cần thuê GPU.** Tabular ~70k dòng → laptop CPU đủ; Kaggle 30h GPU/tuần chỉ cần nếu thử TabPFN v2 (Nature 2025 — điểm "hợp thời đại AI 2026", thêm vào Table 5, làm SAU Table 3/4). *Nếu thấy cần thuê GPU = tín hiệu đi lạc scope.*
- **Venue (anh nhờ tư vấn) — chiến lược 2 tầng, một codebase:** hội nghị trong nước (FAIR/NICS/KSE/RIVF) tuần ~16 để lấy vòng phản biện RẺ và NHANH trước (vì anh chưa viết bài bao giờ) → tạp chí **Q2–Q3** tháng 2–4/2027 (BMC MIDM, Diagnostics, Sci Reports, JMIR MI, IEEE Access, PLOS ONE — PLOS ONE hợp nhất vì nhận kết quả âm). **KHÔNG nhắm Q1 ngay**: không vì đề tài yếu mà vì bài đầu + làm một mình + 6 tháng ⇒ desk-reject tốn 3–4 tháng. ⚠️ Bản tạp chí cần **≥30% nội dung mới** + khai báo bản hội nghị.
- **Kỹ thuật chống trễ quan trọng nhất — viết bài báo NGƯỢC:** Phase 0 (tuần 1) vẽ **6 bảng + 4 hình RỖNG** trước khi chạy thí nghiệm nào → biết chính xác phải chạy bao nhiêu thí nghiệm, không thừa không thiếu. **Đường găng chỉ 4 việc**: nhãn NHANES (t6) → Table 3 ablation (t11) → external (t13) → **bắt đầu viết đúng tuần 15**. Mọi thứ khác cắt được.
- **Tiêu chí DỪNG:** trả lời được 5 câu bằng số cụ thể = đã có bài báo, thêm thí nghiệm không làm mạnh hơn, chỉ làm trễ.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Khi user "đọc paper mà thấy vô nghĩa", bệnh KHÔNG phải đọc thiếu/đọc sai bài — mà là **chưa có một câu claim để cất bài vào**; chữa bằng cách chốt claim TRƯỚC rồi phân mỗi paper vào 4 ô Nền/Đối thủ/Bằng-chứng-gap/Related-work (kết quả: 12 bài đọc kỹ + 4 bài lướt, KHÔNG phải 40). **Chọn đề tài mà tính leakage-safe đến từ CẤU TRÚC bài toán chứ không từ nỗ lực của tác giả** (nhãn định nghĩa bằng xét nghiệm × feature no-lab ⇒ không thể rò rỉ) — đó là cách rẻ nhất để một sinh viên có bài phản biện được. **Ưu tiên claim mà kết quả âm VẪN LÀ kết quả** ("khoảng cách công bố phần lớn là ảo giác đo lường, đây là số đo") thay vì claim "mô hình tôi tốt hơn" — nó loại bỏ rủi ro khoa học, chỉ còn rủi ro thi công. Trước khi tư vấn scope PHẢI hỏi 4 ràng buộc: deadline, đầu ra nhắm tới, ma sát dữ liệu chịu được, nền tảng hiện có — thiếu chúng thì kế hoạch hoặc quá sức hoặc quá nhẹ. Gap mạnh nhất là gap **đo được từ chính kho của user** (DCA 0/35) chứ không phải gap trích từ review của người khác. Với bài báo ĐẦU TIÊN: đi hội nghị trong nước trước rồi nâng cấp lên Q2–Q3 là đường NHANH HƠN tới bài quốc tế, không phải đường vòng — và luôn nói rõ "không cần thuê GPU" khi bài toán là tabular.

**🔗 Liên quan:** [[Q001]] (mô liên kết) · [[Q002]] (mũi nhọn leakage-safe + phải đọc đối thủ medRxiv) · [[Q003]] (winner's curse → Table 3 dòng E) · [[Q004]] (giới hạn tuyên bố theo quần thể → C4/phản biện #11) · [[Q006]] (staging — hoãn lại làm bài 2) · **`TO_DO.md` (sản phẩm chính của phiên này)** · `READING_LIST.md` (bị §6 của TO_DO thay thế) · Nguồn ngoài: Endocrine Connections 2025 (65 study/97 model, 21 external, >80% high RoB), TRIPOD+AI (BMJ 2024), PROBAST+AI (BMJ 2025), TabPFN v2 (Nature 2025), medRxiv 2025.09.05.25335151.

---

<a id="q006"></a>
## Q006 — Kiểm tra kho cho 2 đề tài + gợi ý về "phân loại giai đoạn bệnh" (đề tài mới)

**Ngày:** 2026-07-06 · **Tags:** `de-tai-moi` · `phan-loai-giai-doan` · `multi-class-staging` · `scope-decision` · `leakage-safe` · `niche-thin` · **Cách tạo:** 2 workflow (audit độ phủ 4 nhánh + synth phản biện; tìm+kiểm chứng §7 anchor 3 nhánh + synth), citation verify OpenAlex live 2026-07-06, deep-analyze `yu2010` song song.

**❓ Câu hỏi (anh):**
> Kiểm tra kho đã có đầy đủ bài về 2 đề tài chưa: (1) phát hiện sớm bệnh tiểu đường; (2) phân loại chính xác **giai đoạn** bệnh — đặc biệt đề tài 2 anh mới nghĩ đến. "Giai đoạn" = xác định lúc nào ở giai đoạn 1, lúc nào giai đoạn 2… Em cho gợi ý tốt nhất về chủ đề này.

**✅ Trả lời (đã chốt về mặt phân tích; scope + duyệt bài chờ anh quyết):**
- **Đề tài 1 (phát hiện sớm) = GẦN ĐỦ.** Kho đã làm giàu mạnh: **13 bài** `early_detection` (RESEARCH_BRIEF cũ nói "mỏng" là lỗi thời). "Đủ" tùy nghĩa: TẦM SOÁT undiagnosed → gần đủ; DỰ BÁO onset tương lai có external validation → còn thiếu (chỉ ~2/13 đúng nghĩa temporal). 5/13 mới `searched` chưa analyze; đã deep-analyze **yu2010** (457 cite) trong phiên này.
- **Đề tài 2 (phân loại giai đoạn) = GẦN NHƯ TRỐNG + VƯỢT SCOPE §1.** Kho chỉ có 2 bài tình cờ chạm multi-class (abnoosian2023, deberneh2021); islam2019 xác minh là BINARY. §1 khai báo chủ đề DUY NHẤT là binary; trục kho là `prediction_horizon`, không có trục staging.
- **Phát hiện quan trọng (OpenAlex 06/07/2026):** niche "**3-lớp glycemic staging THUẦN đạt §7**" gần như **RỖNG** — bài 3-lớp glycemic thuần đủ citation DUY NHẤT là abnoosian2023 (đã trong kho). Các bài 3/4-lớp khác đều trượt citation (iraqi2024 5c, normoglycemia2024 8c, diabetology2025 4-lớp marker phân tử n=260 9c).
- **Gợi ý tốt nhất:** "giai đoạn" nghĩa khả thi nhất trên tabular/EHR = thang tiến triển **Bình thường→Tiền ĐTĐ→ĐTĐ**. Nhưng chỉ "chạy multi-class lấy accuracy" = rơi bẫy Q003 + **rò rỉ nhãn KÉP** (nhãn định nghĩa bằng HbA1c/FPG; giữ chúng làm feature = đọc lại định nghĩa → 0.99 giả, đúng như abnoosian2023 0.9887 & IPDD ~100%). **Reframe đề tài 2 = "LEAKAGE-SAFE glycemic staging + PROGRESSION":** (1) phân giai đoạn KHÔNG dùng biomarker định nghĩa nhãn (lõi); (2) dự đoán chuyển giai đoạn theo thời gian (nâng cao). TRÁNH: T1D immune staging (Type 1), phân độ biến chứng bằng ảnh võng mạc (ngoài scope §1).
- **Anchor §7 cho đề tài 2:** choi2014 (111c PASS, KNHANES public + external, leakage-safe), sgchoi2023 (40c PASS, KNHANES n=32.827, feature phi-glycemic + external temporal), cahn2020 (106c BORDERLINE — progression nhưng data private + no code). **Dataset:** NHANES (mở, 3-lớp, có HbA1c/FPG/OGTT) + cohort longitudinal (CHARLS ít ma sát / CARDIA-ARIC qua DUA) + KNHANES external; TRÁNH IPDD làm benchmark chính (leaky-by-construction).
- **Landmark đề tài 1 còn thiếu:** zou2018 (914c PASS, bài ML-ĐTĐ cite cao nhất kho chưa có), choi2014 (111c PASS); borderline (data private/no-code): kopitar2020 (362c, neo phản biện "ML không hơn hồi quy cho phát hiện sớm"), razavian2015 (216c, claims population-level).
- **Anh chọn:** LÀM SONG SONG cả hai.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Trước khi cam kết một ĐỀ TÀI/sub-topic MỚI, phải kiểm chứng có TỒN TẠI đủ literature đạt §7 để xây trên đó — không giả định "nghe hợp lý là có bài". Với "phân loại giai đoạn ĐTĐ": niche 3-lớp glycemic THUẦN gần như rỗng ở ngưỡng citation (chỉ abnoosian2023), nên reframe thành "LEAKAGE-SAFE glycemic staging + progression" — vì staging định nghĩa nhãn bằng HbA1c/FPG nên giữ chúng làm feature = rò rỉ nhãn kép (biến thành bẫy Q003, ~100% giả). Đề tài mới phải khớp xương sống leakage-safe/đánh-giá-trung-thực (Q002/Q003), không phải một bài multi-class accuracy nữa. Mở rộng scope §1 (binary→multi-class) là quyết định của USER; agent chỉ nêu nó vượt scope + soạn đề xuất, không tự nới.

**🔗 Liên quan:** [[Q002]] (mũi nhọn leakage-safe) · [[Q003]] (winner's curse / leakage) · `AGENTS.md` §1/§3b · `searched_papers/.../yu2010_svm_prediabetes_detection` · `rejected.json`.

---

<a id="q005"></a>
## Q005 — Làm giàu kho paper bằng sub-agent đến bão hòa tìm kiếm

**Ngày:** 2026-07-01 · **Tags:** `paper-discovery` · `sub-agent` · `search-saturation` · `quality-gates` · `horizon-balance` · **Cách tạo:** `paper-finder` + 3 nhánh agent độc lập (`early_detection`, `long_term_risk`, khoảng trống kỹ thuật), đối chiếu kho/rejected và kiểm chứng §7.

**❓ Câu hỏi (anh):**
> Kho `searched_papers` đã có nhiều bài; có thể phân sub-agent và làm việc liên tục đến khi tìm gần như hầu hết các bài liên quan, cần thiết và đạt đầy đủ yêu cầu không?

**✅ Trả lời (đã chốt) — CÓ, nhưng dừng theo bão hòa có thể kiểm chứng:**
- Chia tìm kiếm thành các nhánh độc lập theo horizon/khoảng trống kỹ thuật; mỗi nhánh dùng nhiều query và snowballing, rồi khử trùng với `searched_papers` + `rejected.json`.
- Chỉ nhận paper vượt đồng thời ba gate §7: citation Semantic Scholar đủ ngưỡng, dataset public/có procedure access rõ, code hoặc method đủ tái lập; không nới gate để tăng số lượng.
- “Gần như hầu hết” không phải bao phủ tuyệt đối Internet; điểm dừng là nhiều vòng query/snowball liên tiếp không sinh thêm paper hợp lệ mới (search saturation), đồng thời lưu lý do các bài gần đạt bị loại.
- Theo `paper-finder`, mỗi đợt đề xuất tối đa 5 `paper_id`; chỉ tạo folder/tải PDF sau khi user duyệt.
- Vòng đầu cho thấy citation + data access là nút thắt thật: nhánh `long_term_risk` bão hòa cục bộ mà không có bài mới vượt đủ ba gate; ba bài `early_detection` vượt gate đã được user duyệt để nhập kho.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Làm giàu kho theo quy trình **search đa nhánh → khử trùng → kiểm chứng ba gate → lặp đến bão hòa**, không theo quota số lượng. “Gần như đủ” phải được chứng minh bằng nhiều lượt không còn paper hợp lệ mới; bài hay nhưng trượt citation, data access hoặc reproducibility vẫn phải loại. Ưu tiên `early_detection`/`long_term_risk`, nhưng không nới §7 vì kho mỏng.

**🔗 Liên quan:** `AGENTS.md` §1/§3b/§7 · `.agents/skills/paper-finder/SKILL.md` · `RESEARCH_BRIEF.md` · `rejected.json`.

---

<a id="q004"></a>
## Q004 — Mô hình khác nhau thắng trên dataset khác nhau → chọn theo dataset, có đúng ý nghĩa ngành y?

**Ngày:** 2026-06-23 · **Tags:** `model-population-matching` · `no-free-lunch` · `dataset-shift` · `cherry-picking` · `fairness-lam-sang` · `external-validation` · **Cách tạo:** Claude phân tích trực tiếp; làm rõ khác biệt với [[Q003]].

**❓ Câu hỏi (anh):**
> Không phải winner's curse — mà là: mô hình A tốt trên dataset X nhưng yếu trên Y, mô hình B lại tốt trên Y, nên lấy B để diễn tả (cho Y). Vậy có đúng ý nghĩa ngành y không?

**✅ Trả lời (đã chốt) — CÓ ý nghĩa y khoa (đây là No Free Lunch + dataset shift, khác Q003), nhưng chỉ "đúng" khi thỏa 3 điều:**
- **Vì sao có nghĩa:** quần thể bệnh nhân khác nhau thật (tuổi/BMI/chủng tộc/prevalence/yếu-tố-nguy-cơ/biomarker có sẵn) → quan hệ feature→bệnh khác nhau → mô hình khác thắng là CHUYỆN THẬT, không phải lỗi. Chọn B cho đúng quần thể Y đại diện = 'locally adapted model', thực hành đúng.
- **(a) Phải hiểu VÌ SAO B thắng trên Y:** lý do quần thể (khác biệt sinh học/dịch tễ) = có nghĩa; artifact (Y nhỏ/may rủi, preprocessing khác, ĐỊNH NGHĨA NHÃN khác, LEAKAGE chỉ trên Y) = vô nghĩa & nguy hiểm. Bắt buộc phân biệt.
- **(b) KHÔNG cherry-pick:** báo cáo B trên CẢ X lẫn Y, không chỉ Y nơi nó thắng; chọn Y sau khi thấy B thắng = thiên lệch (selective reporting). Y khoa: giấu dataset mô hình yếu = che giấu chênh lệch hiệu năng giữa nhóm = vấn đề ĐẠO ĐỨC.
- **(c) Giới hạn phạm vi tuyên bố:** kết luận = 'B cho quần thể giống Y', KHÔNG phải 'B tốt nhất'. Áp B (yếu trên X) lên quần thể X có thể GÂY HẠI → vấn đề công bằng & an toàn lâm sàng (tốt nhóm này, hại nhóm kia).
- **Phiên bản có nghĩa y khoa cao nhất:** đặc tả MODEL–POPULATION MATCHING — chỉ ra đặc điểm quần thể nào quyết định mô hình nào thắng & tại sao, kiểm chứng xuyên cohort. Biến 'B thắng trên Y' thành insight lâm sàng (quần thể nào cần mô hình nào). Đây = phân tích heterogeneity + external validation, trùng mũi nhọn [[Q002]].
- **Thực tế triển khai:** mỗi site phải tự validate (+ đôi khi chọn/hiệu chỉnh lại) vì mô hình tốt ở viện này thường tụt ở viện khác (dataset shift) → 'mô hình khác cho quần thể khác' là triển khai có trách nhiệm.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Mô hình khác thắng trên quần thể khác là THẬT và có nghĩa y khoa (No Free Lunch + dị biệt quần thể + dataset shift) — KHÁC winner's curse [[Q003]]. Nhưng chỉ "đúng" khi: (a) biết VÌ SAO thắng (lý do quần thể = ok; artifact/leakage = không), (b) KHÔNG cherry-pick (báo cáo trên mọi dataset, không chỉ cái thắng — giấu = che chênh lệch nhóm = vấn đề đạo đức/công bằng), (c) giới hạn tuyên bố theo quần thể ('B cho nhóm giống Y', không phải 'B tốt nhất'; áp lên nhóm khác có thể gây hại). Đóng góp thật = đặc tả 'đặc điểm quần thể ↔ mô hình thắng' + calibration theo quần thể + external validation, KHÔNG phải chỉ chọn winner per dataset.

**🔗 Liên quan:** [[Q003]] (winner's curse — khác) · [[Q002]] (mũi nhọn external/heterogeneity) · `DECISION_BOARD.md` · `AGENTS.md` §3b (đa quần thể/horizon).

---

<a id="q003"></a>
## Q003 — "Chạy nhiều mô hình, lấy mô hình chính xác nhất" có chuẩn thực tế không?

**Ngày:** 2026-06-23 · **Tags:** `model-selection` · `winners-curse` · `data-leakage` · `phuong-phap-luan` · `validation` · `trien-khai-lam-sang` · **Cách tạo:** Claude phân tích trực tiếp (vấn đề phương pháp luận kinh điển), grounded vào đề tài; không chạy workflow (tránh chạm hạn mức 402).

**❓ Câu hỏi (anh):**
> Bài kiểu: khởi tạo nhiều mô hình chạy, mô hình nào cho kết quả chính xác nhất trên tập dữ liệu đó thì lấy mô hình đó. VD: thiết kế app liên kết bệnh viện, lấy dataset bệnh nhân, chạy hết 4 mô hình, mô hình nào ra kết quả cao nhất & chính xác nhất thì lấy kết quả mô hình đó. Như vậy có **chuẩn thực tế** không?

**✅ Trả lời (đã chốt) — Ý tưởng hợp lệ & phổ biến, NHƯNG cách mô tả có 1 lỗi khái niệm + 1 lỗ hổng chí mạng:**
- **Lỗi khái niệm — trộn 2 thời điểm:** "chọn mô hình chính xác nhất" CHỈ làm được lúc **PHÁT TRIỂN** (có nhãn). Lúc **dự đoán bệnh nhân MỚI** (chưa có nhãn) thì BẤT KHẢ THI — vì muốn biết "chính xác" phải có đáp án thật. ⇒ Phải chọn best **một lần** rồi **KHOÁ** mô hình; mọi ca mới đi qua đúng 1 mô hình đã khoá, không chọn lại theo từng ca.
- **Lỗ hổng chí mạng — Winner's curse / rò rỉ test set qua model selection:** nếu chọn mô hình thắng trên **chính tập đó** rồi lấy luôn con số làm kết quả công bố → số **thổi phồng hệ thống** (càng thử nhiều mô hình, kẻ thắng càng do may rủi, hợp với nhiễu của đúng tập test). Đây CHÍNH là loại lỗi đề tài anh muốn vạch (vì sao olisah2022 = 100%, 91.8% model PROBAST high-RoB).
- **Cách làm chuẩn:** chia **train / validation / test** (hoặc **nested CV**); CHỌN trên validation, BÁO CÁO trên test **chưa-đụng-khi-chọn**; chọn bằng **AUROC/AUPRC/sensitivity@ngưỡng + calibration**, KHÔNG bằng accuracy (lệch lớp ~3–13% → "đoán không-bệnh hết" vẫn ~90% acc); **external/temporal validation** (viện B / thời điểm sau) vì best-trên-viện-A chưa chắc tổng quát; **khoá mô hình + theo dõi drift**.
- **Chuẩn thực tế cho triển khai:** thêm **IRB/đạo đức/đồng thuận/ẩn danh** trước khi lấy dữ liệu bệnh nhân; báo cáo theo **TRIPOD-AI**, rủi ro theo **PROBAST**.
- **Cơ hội:** "chạy N mô hình chọn best" là điều cả lĩnh vực làm (kể cả baseline hasan2020) và cũng là nơi sinh optimism/leakage. Làm ĐÚNG quy trình + **định lượng số tụt** so với cách ngây thơ → biến "lỗi ai cũng mắc" thành phát hiện công bố được. Trùng đúng mũi nhọn [[Q002]].

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> "Chọn mô hình tốt nhất" là hợp lệ NHƯNG phải chọn trên **validation** và báo cáo trên **test chưa-đụng** — nếu chọn-và-chấm trên cùng tập = **winner's curse / rò rỉ test set**, số thổi phồng. Phân biệt 2 thời điểm: chọn-best chỉ làm lúc PHÁT TRIỂN (có nhãn); lúc dự đoán ca mới (chưa nhãn) KHÔNG thể "chọn cái chính xác nhất" → phải KHOÁ 1 mô hình. Chọn bằng AUROC/AUPRC + lâm sàng, không bằng accuracy. Bắt buộc external validation + (triển khai thật) IRB/TRIPOD-AI/PROBAST. Làm đúng + định lượng độ thổi phồng = đóng góp, không phải lỗi.

**🔗 Liên quan:** [[Q002]] (mũi nhọn leakage-safe) · [[Q001]] · `DECISION_BOARD.md` · `AGENTS.md` §11 (leakage trong kho).

---

<a id="q002"></a>
## Q002 — Phán quyết: hướng này có nên là MŨI NHỌN không (ưu/nhược · tại sao người khác không làm)

**Ngày:** 2026-06-23 · **Tags:** `phan-quyet` · `mui-nhon` · `novelty` · `external-validation` · `leakage` · `gap-that-hay-bay` · **Cách tạo:** workflow `phan-quyet-mui-nhon` — phần khảo cứu literature bằng web hoàn thành (11 nguồn); các lăng kính ưu/nhược + phán quyết tổng hợp trượt vì hết hạn mức usage (402), Claude tự tổng hợp từ kết quả web + kho.

**❓ Câu hỏi (anh):**
> Xây ưu/nhược điểm của việc làm này. Hướng đi này có nên là mũi nhọn của chúng ta không? Đáng làm không? **Tại sao người khác không làm?**

**✅ Trả lời (đã chốt) — NÊN, CÓ ĐIỀU KIỆN; phải mài về 1 mũi nhọn thay vì trải đều 4 Layer:**
- **Gap là THẬT, không phải bẫy** (bằng chứng web, citable): chỉ **8–31%** nghiên cứu dự đoán ĐTĐ làm external validation; **91.8%** model HIGH risk of bias (PROBAST, Endocrine Connections 2025); external 8% + calibration 13% (Ghafoor 2025); scoping review npj 2023: 5/40 external, 5/40 calibration, 4/40 code, 4/40 SHAP. Lĩnh vực TỰ KÊU THIẾU đúng thứ anh nhắm.
- **Novelty khuếch tán — cảnh báo lớn:** mỗi MẢNH của spine đã có tiền lệ trong primary study (multi-cohort external: eClinicalMedicine 2025 Hàn–Nhật–Anh; benchmark+SHAP+external: medRxiv Sept 2025 ML-vs-FINDRISC; chống leakage tường minh: Sci Reports Nov 2025). ⇒ Novelty KHÔNG ở một thành phần đơn lẻ nào, mà ở **"mô liên kết": làm ĐỒNG THỜI tất cả trong 1 khung 4 Layer × 3 horizon + ablation định lượng + đánh giá thống nhất theo prevalence thật + code công khai** — chưa bài nào làm trọn.
- **⚠️ Điều kiện #1 (bắt buộc trước khi chốt):** đọc kỹ **medRxiv Sept 2025 (ML vs FINDRISC benchmark)** — đối thủ gần nhất; xác minh nó THIẾU gì (PR-AUC/PPV theo prevalence thật? leakage protocol tường minh? ablation theo Layer?). Khe hở của nó = chỗ cắm cờ.
- **Tại sao người khác không làm (gap thật):** (1) lệch incentive — accuracy-chasing dễ publish hơn rigor; (2) **reward asymmetry — làm đúng thì số TỆ HƠN** trên bảng so sánh nên ít ai tự nhận thiệt; (3) rào cản dữ liệu EHR/multi-cohort (DUA/IRB/harmonize); (4) kỹ thuật nặng mà không hào nhoáng (leakage-safe + harmonize cohort dị thể); (5) đòi liên ngành (calibration/prevalence/PPV cần hiểu lâm sàng). Đây là dấu hiệu GAP THẬT (cộng đồng kêu thiếu + ngại khó/ngại thiệt), KHÔNG phải vùng đã-giải-quyết.
- **Mũi nhọn đề xuất:** *"Đo hiệu năng dự đoán ĐTĐ bị thổi phồng bao nhiêu bởi leakage + thiếu external validation — và giao một benchmark leakage-safe, đánh giá theo prevalence thật, external đa cohort, tái lập được."* 4 Layer = THÂN GIÁO (ráp pipeline + ablation); leakage+external+đánh giá-thật = MŨI NHỌN (claim cắm cờ); protocol+benchmark+code công khai = HOOK KIẾN TẠO (để không bị coi là chỉ phê phán).
- **Điều kiện bắt buộc khác:** scope-down (2–3 dataset harmonize được + 1–2 horizon, ưu tiên early/long-term đang mỏng; KHÔNG ôm cả 3×4); ablation định lượng; đóng khung "số tụt" thành PHÁT HIỆN ("leakage thổi phồng X%") kèm sản phẩm tái dùng.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Một hướng nghiên cứu là MŨI NHỌN đáng làm khi: (a) gap chứng minh được bằng số citable, (b) lĩnh vực tự kêu thiếu, (c) lý do người khác né mang tính CẤU TRÚC (incentive lệch, reward asymmetry "làm đúng số tệ hơn", rào cản dữ liệu) chứ không phải "đã giải quyết rồi" — đó là dấu hiệu gap thật, không phải bẫy. Khi mỗi THÀNH PHẦN của hướng đi đều đã có tiền lệ, novelty phải nằm ở "mô liên kết" (tích hợp đồng thời + ablation + đánh giá thống nhất + công khai), và BẮT BUỘC đọc đối thủ gần nhất để xác định khe hở trước khi cắm cờ. Bài thuần phê phán khó publish — luôn kèm sản phẩm kiến tạo (protocol/benchmark/code). Mài 1 lưỡi, đừng trải đều.

**🔗 Liên quan:** [[Q001]] (tiền đề "mô liên kết") · `DECISION_BOARD.md` · `AGENTS.md` §3b (horizon mỏng) · Nguồn chính: npj Digital Medicine 2023 (PMC10600138), Endocrine Connections 2025 (PROBAST), Ghafoor 2025 Diabetic Medicine, **medRxiv 2025.09.05.25335151 (đối thủ gần nhất — phải đọc)**, eClinicalMedicine 2025, Sci Reports s41598-025-25759-x.

---

<a id="q001"></a>
## Q001 — Chiến lược đóng góp: tổng hợp nhiều paper thành 1 bài

**Ngày:** 2026-06-22 · **Tags:** `chien-luoc-dong-gop` · `novelty` · `phuong-phap-luan` · `synthesis` · `leakage` · **Cách tạo:** workflow đọc-grounded vào kho (28 paper) + DECISION_BOARD + đánh giá agent (phần phản biện đa-góc bị lỗi 503 gateway, không ảnh hưởng kết luận).

**❓ Câu hỏi (anh):**
> Làm NCKH không chỉ tái lập paper, mà tạo ra một bài báo / mô hình đóng góp có ý nghĩa. Ý định: **tổng hợp nhiều paper**, mỗi bài đóng góp một phần vào workflow anh xây (dataset, mô hình tối ưu, cách lọc dữ liệu chuẩn…) → đúc kết thành một bài thật sự ý nghĩa. **Khả năng đóng góp rất cao — em có thấy vậy không?**

**✅ Trả lời (đã chốt) — Đồng ý CÓ ĐIỀU KIỆN:**
- **Hướng đúng, nhưng "tổng hợp" tự nó CHƯA phải đóng góp.** Reviewer phân biệt *ghép các thành phần đã biết* ("integration / bag-of-tricks" → dễ bị chê incremental) với *tổng hợp tạo ra cái MỚI*. Cấu trúc 4-Layer của anh là **bộ khung tốt**; giá trị nằm ở **"mô liên kết"**, không ở hành động ghép.
- **Cạm bẫy chí mạng:** chạy theo accuracy cao trên dataset bão hoà (PIMA). Kho đã có dấu hiệu: olisah2022 ORF **100%** (cờ leakage), abnoosian2023 0.9887, kaliappan2024 0.990 → reviewer đọc là *red flag*, không phải mạnh.
- **Điều kiện để đóng góp THỰC SỰ cao** (cần ≥1, lý tưởng nhiều): (1) **một yếu tố mới thật** — vd hình thức hoá "cách lọc dữ liệu chuẩn / chống leakage" thành protocol; (2) **ablation định lượng** vai trò từng Layer; (3) **external / cross-cohort validation** (PIMA→BRFSS→NHANES→EHR) — gần như cả kho đang THIẾU; (4) **lấp horizon mỏng** `early_detection` + `long_term_risk`; (5) **đánh giá trung thực kiểu lâm sàng** (PR-AUC + calibration + PPV theo prevalence thật, không accuracy trên 50/50 ép cân bằng) + **XAI local định lượng**.
- **Xương sống đề xuất (chính):** pipeline dự đoán **sớm/dài hạn** ĐTĐ trên **EHR longitudinal thật**, chống leakage nghiêm ngặt, đánh giá theo prevalence thật + external validation đa cohort + XAI local. Neo kho: horizon ← lugner2024 / deberneh2021; protocol chống leakage ← nnamoko2020; model EHR ← rasmy2021 / li2020; XAI/deploy ← tasin2022.

**🎯 Nguyên tắc rút ra (để huấn luyện agent):**
> Tổng hợp nhiều paper thành một workflow là **hợp lệ nhưng KHÔNG tự động là đóng góp** — giá trị nằm ở *mô liên kết*: yếu tố mới + ablation định lượng + external/cross-cohort validation + đánh giá trung thực kiểu lâm sàng + XAI local + chống leakage. Khi tư vấn novelty cho anh: **trung thực, không nịnh**; đẩy về **gap thật** (early_detection / long_term_risk, EHR thật, chống leakage) thay vì "accuracy cao hơn trên PIMA". Cấu trúc 4-Layer = khung tích hợp, không phải đích đến.

**🔗 Liên quan:** `AGENTS.md` §1/§3/§3b · `DECISION_BOARD.md` (shortlist 9 promote) · `RESEARCH_BRIEF.md` · memory `research-goal-synthesis-paper`.

---
