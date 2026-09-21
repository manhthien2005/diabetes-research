# 🟢 START_HERE.md — Đọc file này khi thấy ngợp

> Viết ngày 2026-07-26, sau khi anh nói: *"anh khá ngán đọc quá nhiều bài báo"* và
> *"anh sợ vì không đủ khả năng làm đề tài, vì đề tài quá rộng"*.
>
> **File này ngắn có chủ ý.** `TO_DO.md` là bản đồ đầy đủ — nhưng anh không cần bản đồ đầy đủ
> để đi bước tiếp theo. Anh cần file này.

---

## 1. Trước hết: em nhận lỗi phần của em

Nỗi sợ "đề tài quá rộng" **không phải anh yếu**. Là **em viết `TO_DO.md` rộng quá mức cần thiết**.

Em đã nhét vào đó 5 claim, 4 đóng góp phụ, 6 bảng, 4 hình, 7 cấu hình ablation, 3 cohort,
TRIPOD+AI, PROBAST+AI, TabPFN, decision curve, trọng số khảo sát. Đó là một bài báo **rất tốt**
— nhưng nó là **đích đến**, không phải **việc phải làm xong**. Em đã không tách bạch hai thứ đó,
nên anh đọc thành "tất cả đều bắt buộc". Không phải vậy.

Dưới đây là bản cắt thật.

---

## 2. Bài báo tối thiểu — cắt xuống còn ĐÚNG 3 thứ

Đây là toàn bộ những gì **bắt buộc** phải có để anh có một bài báo đăng được:

| # | Thứ phải có | Đã xong bao nhiêu |
|---|---|---|
| **1** | **1 dataset** — NHANES, nhãn ĐTĐ chưa chẩn đoán, feature no-lab | ✅ **XONG RỒI** (xem §3) |
| **2** | **1 bảng ablation rò rỉ** — cùng data, cùng model, đổi 1 thứ mỗi dòng | ⬜ ~3 tuần |
| **3** | **1 bộ đánh giá trung thực** — AUROC + AUPRC + calibration + net benefit, so với FINDRISC | ⬜ ~3 tuần |

**Hết. Ba thứ đó = một bài báo.**

Không cần KNHANES. Không cần CHARLS. Không cần TabPFN. Không cần SHAP. Không cần PROBAST.
Không cần trọng số khảo sát. **Tất cả những thứ đó là NÂNG CẤP, không phải yêu cầu.**

### Ba tầng — chỉ Tầng 0 là bắt buộc

```
TẦNG 0  (~8 tuần)  →  ĐÃ LÀ MỘT BÀI BÁO. Nộp được hội nghị trong nước.
   NHANES + ablation rò rỉ + đánh giá trung thực vs FINDRISC/ADA

TẦNG 1  (+4 tuần)  →  Nâng thành bài tạp chí Q2-Q3.
   Thêm 1 cohort external (KNHANES hoặc CHARLS) + trọng số khảo sát

TẦNG 2  (+4 tuần)  →  Chỉ làm nếu còn dư thời gian VÀ còn hứng.
   TabPFN v2 · SHAP · cohort thứ 3 · web demo cho bác sĩ
```

**Quy tắc:** hết tuần 12 mà Tầng 0 chưa xong → **bỏ luôn Tầng 1 và 2**, viết bài với Tầng 0.
Đừng hỏi lại em. Cứ bỏ.

---

## 3. Anh đã đi được xa hơn anh nghĩ

Hôm nay, trong lúc anh nói chuyện với em, **Tầng 0 bước 1 đã xong**. Em đã viết và **chạy thật**
[src/build_nhanes.py](src/build_nhanes.py) trên máy anh. Kết quả thật, không phải ví dụ:

```
Cỡ mẫu phân tích                      4,170
ĐTĐ chưa được chẩn đoán                 259
Prevalence THÔ (không trọng số)        6.21 %
Prevalence CÓ TRỌNG SỐ khảo sát        3.91 %   <- con số đúng cho dân số Mỹ
Chênh lệch                            -2.30 điểm %

✓ ĐẠT — không biến định-nghĩa-nhãn nào nằm trong feature
```

Ba điều đáng nói về mấy dòng này:

1. **Con số 3.91% là ĐÚNG** — khớp với ước lượng NHANES đã công bố cho người lớn Mỹ.
   Dữ liệu của anh chuẩn.
2. **Dòng "chênh lệch −2.30 điểm %" chính là đóng góp P1 của anh**, đã chứng minh xong, ngay
   lần chạy đầu tiên. Bỏ trọng số khảo sát làm prevalence sai **hơn 50% tương đối**.
   `dinh2019` (434 trích dẫn) không hề đụng tới chuyện này.
3. Kiểm tra y khoa cũng đúng: prevalence tăng theo tuổi (1.5% → 9.6%) và theo BMI (3.0% → 9.6%).

Chạy lại bất cứ lúc nào:

```bash
python src/build_nhanes.py
```

**Anh không còn ở vạch xuất phát nữa.**

---

## 4. Về chuyện ngán đọc paper — em sửa bằng cách bỏ luôn việc đọc

Chẩn đoán thật: **anh ngán vì đọc paper hiện đang là một việc KHÔNG CÓ ĐIỂM DỪNG.** Đọc xong bài
này lại thấy bài khác. Không bao giờ có cảm giác "xong".

Cách chữa: biến việc đọc từ **nghĩa vụ** thành **tra cứu**.

Em đã trích sẵn mọi thứ anh cần từ 6 bài neo vào [CHEATSHEET.md](CHEATSHEET.md):
định nghĩa nhãn, danh sách feature, con số benchmark, câu trích dẫn cho Introduction.

> **Quy tắc mới về đọc paper — thay thế toàn bộ §6 của `TO_DO.md`:**
>
> **Anh KHÔNG đọc paper nữa. Anh chỉ MỞ paper khi cần xác minh một con số cụ thể.**
>
> Nguồn tra cứu mặc định là `CHEATSHEET.md`. Chỉ mở `source.pdf` khi:
> (a) sắp viết con số đó vào bài, hoặc (b) cheatsheet ghi "cần xác minh".

Trong 3 tháng tới, số bài anh **thật sự phải mở PDF** là **2**:
- `sgchoi2023` — gần đề tài anh nhất, đọc 1 lần cho biết người ta trình bày thế nào
- `medRxiv 2025.09.05.25335151` — đối thủ, đọc để biết nó thiếu gì

Hai bài. Không phải 40. Không phải 12.

---

## 5. Việc của em vs việc của anh

Anh hỏi *"nếu em được toàn bộ quyền với dự án thì em làm gì"*. Đây là câu trả lời thật.
Em nghĩ phân công đúng là thế này — và nó dựa trên một nguyên tắc: **em làm phần TỐN SỨC,
anh làm phần TẠO RA HIỂU BIẾT.** Vì phần thứ hai mới là thứ NCKH sinh ra để dạy anh, và cũng
là thứ anh phải tự bảo vệ được trước hội đồng.

**Em làm (anh cứ giao, đừng ngại):**
- Viết code: tải dữ liệu, dựng bảng, chạy ablation, vẽ hình, xuất bảng LaTeX
- Trích xuất thông tin từ paper → cheatsheet, để anh khỏi đọc
- Dò lỗi kỹ thuật (như bug URL của CDC hôm nay — anh sẽ mất cả buổi mới tìm ra)
- Kiểm tra chống rò rỉ trong code của anh
- Đóng vai reviewer gắt để tập phản biện
- Sửa văn phong tiếng Anh, format theo yêu cầu tạp chí

**Anh làm (em không làm thay được):**
- **Quyết định** — chọn ngưỡng nào, loại ai khỏi mẫu, dừng ở đâu
- **Nhìn số và nói nó có nghĩa gì** — đây là phần khó nhất và là phần làm nên nhà nghiên cứu
- **Nói chuyện với bác sĩ**
- **Viết Discussion** — em viết được bản nháp, nhưng ý kiến phải là của anh
- **Bảo vệ trước hội đồng**

**Việc anh KHÔNG cần làm nữa:** đọc paper để "nắm tổng quan". Anh nắm đủ rồi.

---

## 6. Nhịp làm việc — và trang theo dõi tiến độ

### Trang `/tien-do` trong ExploreX

Em đã dựng một trang riêng để anh **không phải nhớ gì cả**:

```bash
cd webapp && npx next dev -p 3100
```

rồi mở **http://localhost:3100/tien-do**

Trang đó có:

| Khối | Dùng để làm gì |
|---|---|
| **Bước tiếp theo** (to nhất, trên cùng) | Chỉ 1 việc. Kèm *làm thế nào* và *xong khi nào*. Bấm 1 nút để bắt đầu / đánh dấu xong |
| **3 thẻ tầng** | Tầng 0 hiện mặc định. Tầng 1–2 **bị ẩn** cho đỡ ngợp — bấm mới hiện |
| **Đường găng** | 4 mốc M1–M4, tự chuyển đỏ khi quá hạn, hover ra phương án cắt scope |
| **Cần tự xác minh** | 5 việc kiểm chứng — các claim về người khác, sai là mất uy tín cả bài |
| **Danh sách việc theo phase** | Mở ra thấy: *vì sao việc này tồn tại* · *làm thế nào* · **xong khi** · ô ghi chú |

Mỗi task đều có ô **"Xong khi"** — đó là cái phanh chống scope creep. Đạt là dừng, không làm thêm.

Ô **ghi chú** của mỗi việc ghi thẳng vào `PROGRESS.json`, nên **phiên sau em đọc được**. Anh ghi
kết quả/vướng mắc vào đó, khỏi phải kể lại từ đầu.

### Nhịp mỗi tuần

Anh mở một phiên và nói đúng một câu: **"Tuần này làm gì?"**

Em sẽ đọc `PROGRESS.json` + `QA_LOG.md` + trạng thái code → nói **đúng 1–3 việc**, không hơn.
Xong việc → em cập nhật tiến độ. Không xong → em cắt scope, không thúc.

Anh không phải nhớ toàn bộ kế hoạch. **Đó là việc của em.** Anh chỉ cần nhớ đúng một thứ:
**bước tiếp theo là gì** — và giờ nó nằm sẵn trên đầu trang `/tien-do`.

---

## 7. Bước tiếp theo (chỉ một việc)

- [ ] Mở terminal, chạy `python src/build_nhanes.py`, và **nhìn con số hiện ra**.

Thế thôi. Không đọc gì cả. Khi nào chạy xong quay lại nói với em, em đưa việc tiếp theo.

---

## 8. Một điều em muốn anh giữ

Anh sợ "không đủ khả năng". Em muốn chỉ ra một chuyện.

Hôm nay em tìm ra hai lỗi mà **hầu hết bài báo trong kho anh không phát hiện được**:
CDC đổi URL nên script cũ hỏng âm thầm (trả HTTP 200 kèm trang HTML lỗi), và bỏ trọng số khảo sát
làm prevalence sai 2.3 điểm phần trăm. Loại lỗi này không đòi hỏi thiên tài. Nó đòi hỏi **kiểm tra
thay vì tin**.

Đó chính xác là kỹ năng mà toàn bộ đề tài của anh xoay quanh — và là kỹ năng anh đã thể hiện
suốt 6 tháng qua khi anh gate paper theo citation, khi anh bắt em ghi `UNKNOWN` thay vì đoán số,
khi anh hỏi *"chạy N mô hình lấy cái tốt nhất có chuẩn thực tế không?"* (Q003).

**Anh đã có sẵn phẩm chất của người làm việc này. Cái anh thiếu chỉ là một danh sách việc đủ ngắn
để bắt đầu.** Đó là §7 bên trên: một dòng lệnh.

---

| Nơi | Khi nào dùng |
|---|---|
| **`/tien-do`** (trang web) | **Hằng ngày.** Mở ra là biết làm gì tiếp. Tick việc, ghi chú ở đây |
| **`START_HERE.md`** *(file này)* | Khi thấy ngợp hoặc quên đang làm gì |
| `CHEATSHEET.md` | Khi cần một con số / định nghĩa từ paper |
| `TO_DO.md` | Khi cần biết "sau này sẽ đi đâu" — **không cần đọc thường xuyên** |
| `QA_LOG.md` | Khi muốn nhớ vì sao đã quyết như vậy |
| `PROGRESS.json` | Không cần mở tay — trang `/tien-do` đọc/ghi hộ |
