# Hướng dẫn lấy API key — điền vào `.env`

> Ngắn gọn, đa số tự mò được. Có link là chính. Thứ tự ưu tiên đã sắp sẵn.

---

## ✅ Tier 0 — Bắt buộc, KHÔNG cần đăng ký

### `RESEARCH_EMAIL`  → dùng cho OpenAlex + CrossRef
- Không cần tài khoản gì cả. Chỉ cần 1 email thật của anh.
- Hai web này yêu cầu email để cho vào "polite pool" (limit cao, hết nghẽn).
- 👉 Điền email vào `.env` là xong.

---

## 🔑 Tier 1 — Nên có (miễn phí)

### 1. `PUBMED_API_KEY`  (ưu tiên #1 — dễ nhất, hợp y khoa)
- Tạo / đăng nhập tài khoản NCBI: https://account.ncbi.nlm.nih.gov/
- Vào **Account Settings**: https://www.ncbi.nlm.nih.gov/account/settings/
- Kéo xuống mục **API Key Management** → bấm **Create an API Key** → copy.
- ⏱️ Có ngay, không cần duyệt.

### 2. `SEMANTIC_SCHOLAR_API_KEY`
- Điền form xin key: https://www.semanticscholar.org/product/api#api-key
- ⏱️ Phải chờ duyệt qua email (vài ngày). Cứ xin trước, chưa có thì em chạy không-key tạm được (chỉ hay 429).

### 3. `CORE_API_KEY`  (tìm bản full-text OA hợp pháp → đỡ phải tự tải PDF)
- Đăng ký: https://core.ac.uk/services/api
- Tạo tài khoản → trang quản lý hiện key luôn.
- ⏱️ Có ngay.

---

## 🔸 Tier 1b — Tùy, lấy sau cũng được

### 4. `SPRINGER_API_KEY`
- Đăng ký dev portal: https://dev.springernature.com/
- Tạo tài khoản → **Applications** → tạo app → copy API key.
- ⏱️ Có ngay. (Lấy được metadata + full-text các bài Open Access của Springer.)

### 5. `IEEE_API_KEY`
- Đăng ký: https://developer.ieee.org/
- Lưu ý: IEEE duyệt thủ công + thường cần đăng ký liên kết tổ chức, và API chỉ cho **metadata + abstract**. OpenAlex đã phủ phần này rồi → cái này optional thật sự.

---

## ❌ KHÔNG cần lấy gì cho mấy chỗ này
Full-text trả phí của **Elsevier / Springer (non-OA) / IEEE PDF**, và **Google Scholar**:
tool của em không gắn cookie đăng nhập được, đưa cũng vô ích.
→ Chỗ này anh dùng quyền truy cập của anh **tải PDF** rồi bỏ vào
`searched_papers/Layer_X/<id>/source.pdf` để em đọc full.

---

## Xong rồi thì
Điền `.env` → báo em. Tối thiểu cần `RESEARCH_EMAIL` là em dựng script gom paper chạy ngay.
