---
name: pdf-extract
description: |
  Trích PDF khoa học ra `extracted.md` TRUNG THỰC, ĐẦY ĐỦ, GIỮ CẤU TRÚC
  (bảng→markdown, đúng thứ tự đọc đa cột, OCR trang scan) để paper-analyzer /
  paper-comparator đọc hiểu >90% bài mà không cần mở PDF. KHÔNG tóm tắt — việc
  diễn giải là của analyzer.
inputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/source.pdf
outputs:
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extracted.md           # markdown trung thực
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extraction_report.json # điểm QA + cảnh báo
  - 01_Diabetes_Research/searched_papers/Layer_<n>/<paper_id>/extracted.prev.md      # backup bản cũ (1 lần)
---

# pdf-extract

## Mục đích
Biến PDF khoa học (đa cột, nhiều bảng, có khi scan ảnh) thành markdown **đầy đủ
và đúng cấu trúc**. Nguyên tắc: **giữ nguyên sự thật, không bịa, không bỏ sót**.
Tóm tắt / gán horizon là việc của `paper-analyzer`, KHÔNG làm ở đây.

## Engine
- **docling** (CHÍNH): layout-aware reading order (sửa lỗi trộn cột), TableFormer
  (bảng không kẻ viền → markdown), OCR (RapidOCR) cho trang scan. Chạy CPU.
- **pymupdf4llm** (FALLBACK): chỉ khi không có docling. Bảng yếu hơn.

Cài 1 lần:
```
python -m pip install pymupdf4llm pdfplumber docling rapidocr-onnxruntime onnxruntime
```

## Cách chạy
1 bài:
```
python .claude/skills/pdf-extract/extract.py 01_Diabetes_Research/searched_papers/Layer_X/<paper_id> --force
```
Toàn bộ (mỗi bài 1 subprocess → reset RAM, chống OOM tích lũy):
```
python .claude/skills/pdf-extract/run_all.py            # chạy hết, ghi extraction_summary.json
python .claude/skills/pdf-extract/run_all.py --min-skip 95   # bỏ qua bài đã đạt ≥95
python .claude/skills/pdf-extract/run_all.py --only tasin    # chỉ bài khớp tên
```
Cờ `extract.py`: `--engine auto|docling|pymupdf`, `--ocr auto|on|off`, `--chunk 6`, `--force`.

Chỉ tính lại QA (sửa công thức chấm điểm) — KHÔNG chạy lại docling:
```
python .claude/skills/pdf-extract/recompute_qa.py      # re-probe + re-clean + re-score
```
Vì output docling là tất định và đã lưu trên đĩa, khi đổi *cách chấm điểm* hay
*bộ dọn* thì chỉ cần re-score lại `extracted.md` (re-probe bằng pymupdf, vài giây/bài),
không phải trích xuất lại (docling ~12s/trang, OCR ~6-10 phút/bài).

## Kỹ thuật quan trọng (đã giải các lỗi thực tế)
- **Chunk 6 trang/lần**: docling render cả tài liệu vào RAM cùng lúc → `std::bad_alloc`
  rớt trang cuối (mất References + bảng kết quả) trên bài dài / máy ít RAM. Chia nhỏ
  PDF bằng pymupdf rồi ghép → giới hạn bộ nhớ, không mất trang.
- **Phát hiện scan bằng diện tích ảnh**: trang có ảnh phủ ≥45% + ít text = scan.
  Watermark (vd Wiley ~360 ký tự/trang) đánh lừa cách đếm ký tự thô → phải dùng ảnh.
  ≥50% trang scan → OCR full-page; vài trang scan → OCR vùng ảnh.
- **Dọn boilerplate**: cắt watermark tải, running header/footer (dòng lặp ≥30% số
  trang), nguyên đoạn license Creative Commons, quảng cáo nhà xuất bản (kể cả khi bị
  docling đẩy thành **heading** `## At BMC…`); nối từ bị gạch nối cuối dòng; bỏ ký tự
  zero-width; chuẩn hoá no-break space (U+00A0) và các unicode-space → space thường.

## QA tự động (extraction_report.json) — điểm có CƠ SỞ
- `table_coverage` = số bảng markdown / số caption "Table N" trong **text gốc PDF**
  (ground truth, không phải tự đối chiếu output → bắt được mất bảng).
  **LOẠI "Supplementary/Suppl. Table N"** khỏi mẫu số: bảng phụ lục nằm ở file riêng,
  không có trong source.pdf → nếu đếm vào sẽ phạt oan (vd Nature/Springer trích
  "Supplementary Table 9" mà bài chỉ có Table 1–2).
- **Tail check**: đuôi trang text cuối phải xuất hiện trong output → bắt cụt âm thầm.
  **BỎ QUA khi OCR**: snippet lấy từ lớp text nhúng; bài scan có lớp text rỗng/watermark
  nên không bao giờ khớp nội dung OCR → sẽ báo cụt giả. Chỉ check khi trích từ lớp text.
- **Table-garble check** (`analyze_table_quality`): đếm bảng *có grid nhưng vỡ cấu trúc*
  (ô "x ± y" tách thành ô "±" lẻ ≥3, hoặc grid lớn rỗng ≥50%). `table_coverage` chỉ đếm
  *có mặt* bảng → KHÔNG bắt được bảng vỡ; check này phạt theo tỉ lệ bảng vỡ và liệt kê
  index bảng + nhắc analyzer mở source.pdf cho các bảng đó. Xảy ra với bảng ma trận
  chuyển vị/không kẻ viền/đa tầng dày đặc (TableFormer & pymupdf đều bó tay — giới hạn
  công cụ, không phải lỗi pipeline).
- `failed_pages`, `text_density`, cảnh báo scan-không-OCR / OCR thưa / còn watermark.
- `score` 0–100. **<85 = cần xem lại** (run_all liệt kê ở cuối).
- Header trong `extracted.md` ghi sẵn: engine | pages | ocr | tables | density | score.
- Đổi công thức QA → dùng `recompute_qa.py` để chấm lại toàn bộ, không trích lại docling.

## Ràng buộc
- KHÔNG ghi đè trực tiếp: bản cũ được lưu `extracted.prev.md` (1 lần) trước khi thay.
- Trang scan → OCR (số liệu OCR có thể sai lệch nhỏ, đã chấp nhận; tốt hơn nhiều so
  với bỏ trống). Bài hoàn toàn không có text + OCR cũng thất bại → score thấp, báo user.
- Chạy ở MAIN LOOP (script local, 0 token API). Không giao cho subagent tải PDF.
