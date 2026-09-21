# 📖 CHEATSHEET.md — Tra cứu thay cho đọc paper

> **Mục đích:** anh KHÔNG đọc paper nữa. Anh tra file này.
> Chỉ mở `source.pdf` khi (a) sắp viết con số đó vào bài, hoặc (b) ô "⚠️ cần xác minh".
>
> Trích ngày 2026-07-26 từ `extracted.md` + `summary.json` của 6 bài neo trong kho.
> Mọi con số đều có nguồn (`Table X` / dòng trong `extracted.md`).

---

## 1. Định nghĩa nhãn — người ta làm thế nào

| Bài | Quần thể | Định nghĩa nhãn | Lưu ý cho anh |
|---|---|---|---|
| **`yu2010`** | NHANES | **Scheme I:** ĐTĐ đã chẩn đoán HOẶC chưa chẩn đoán, vs không ĐTĐ & không tiền ĐTĐ. **Scheme II:** ĐTĐ chưa chẩn đoán HOẶC tiền ĐTĐ, vs không ĐTĐ | **Hai scheme cho AUC rất khác nhau (0.835 vs 0.732).** Bài anh gần Scheme II hơn về độ khó, nhưng nhãn chỉ là ĐTĐ chưa chẩn đoán (không gộp tiền ĐTĐ) |
| **`sgchoi2023`** | KNHANES 2014-2020 | ĐTĐ chưa được chẩn đoán | Loại người **< 19 hoặc ≥ 80 tuổi**; loại người đã chẩn đoán. ⚠️ **Loại thêm 40.163 người vì thiếu dữ liệu predictor** (113.091 → 32.827) — listwise deletion cỡ lớn, đây là **điểm yếu anh có thể vượt** bằng cách xử lý thiếu đàng hoàng |
| **`choi2014`** | KNHANES 2010/2011 | **TIỀN ĐTĐ**, loại CẢ người đã chẩn đoán LẪN chưa chẩn đoán ĐTĐ | ⚠️ **KHÁC đề tài anh** — đây là dự đoán tiền ĐTĐ, không phải ĐTĐ chưa chẩn đoán. Dùng nó làm mẫu về *cách external validate*, đừng so số trực tiếp |
| **`dinh2019`** | NHANES 1999-2014 | Case I = đã chẩn đoán; **Case II = chưa chẩn đoán / tiền ĐTĐ** | Case II mới là cái gần anh |
| **Của anh** | NHANES, ≥20 tuổi | `DIQ010` ≠ Có **VÀ** (HbA1c ≥ 6.5% **HOẶC** FPG ≥ 126 **HOẶC** OGTT2h ≥ 200) | Đã cài trong `src/build_nhanes.py` |

> ⚠️ **OGTT đã bị CDC ngừng thu sau chu kỳ 2015-2016** (`OGTT_J` = 404). Chu kỳ ≥ 2017 chỉ có
> HbA1c + FPG. Phải khai trong Methods — định nghĩa nhãn không đồng nhất giữa các chu kỳ.

---

## 2. Feature no-lab — người ta dùng bộ nào

Ba bài neo hội tụ rất rõ. Đây là **bằng chứng để anh biện hộ lựa chọn feature của mình**:

| Bài | Bộ feature | AUC |
|---|---|---|
| **`yu2010`** Scheme I | tiền sử gia đình · tuổi · chủng tộc · cân nặng · chiều cao · **vòng eo** · BMI · tăng huyết áp | **0.835** |
| **`yu2010`** Scheme II | + giới · vận động thể lực | **0.732** |
| **`sgchoi2023`** bộ 1 | giới · tuổi · **vòng eo** · nhịp tim nghỉ | ML **0.788** vs score 0.740 |
| **`sgchoi2023`** bộ 2 | giới · tuổi · **vòng eo** · tăng HA · rượu · thuốc lá · tiền sử gia đình | ML **0.802** vs score 0.759 |
| **`sgchoi2023`** bộ 4 (tối đa) | + vận động · giờ ngủ · BMI | ML **0.819** vs score 0.765 |
| **`choi2014`** ANN | tuổi · giới · **vòng eo** · BMI · tiền sử gia đình · tăng HA · rượu | 0.768 nội bộ / **0.731 external** |

**Điều rút ra:**
- **Vòng eo có mặt trong MỌI bộ.** Nếu bỏ nó, anh phải giải thích.
- **`sgchoi2023` dùng nhịp tim nghỉ (RHR)** — ✅ đã kiểm chứng: NHANES 2017-2018 **CÓ** biến
  `BPXPLS` (mạch 60 giây, thiếu 4.4%), đã thêm vào `NOLAB_FEATURES`.
  ⇒ Anh dựng lại được **đúng cả 4 bộ feature của `sgchoi2023`** trên NHANES → so sánh
  NHANES vs KNHANES **trực tiếp, không phải xấp xỉ**. Đây là điểm mạnh nên khai thác.
- Bộ feature hiện tại của anh (17 biến trong `NOLAB_FEATURES`) **phủ trọn** các bộ trên,
  chỉ thiếu **rượu** và **giờ ngủ** (NHANES có `ALQ*` và `SLD*` — thêm được nếu muốn).

---

## 3. Bảng benchmark — con số anh phải so với

Đây là bảng anh dán vào Discussion để định vị kết quả của mình.

| Bài | Dữ liệu | Model tốt nhất | AUC | Ghi chú quan trọng |
|---|---|---|---|---|
| `yu2010` | NHANES | SVM-RBF | **0.835** (Scheme I) / 0.732 (Scheme II) | SVM **ngang** hồi quy logistic — "không có phép màu ML" |
| `dinh2019` | NHANES | XGBoost | **0.862** (chỉ khảo sát, Case I) · **0.737** (no-lab, Case II) | Có-lab đạt 0.957 → chênh lệch có/không lab rất lớn |
| `sgchoi2023` | KNHANES | LightGBM | **0.819** external | ML hơn score chỉ **~0.05** |
| `choi2014` | KNHANES | SVM | **0.731** external | ML hơn score chỉ **~0.02** |
| `zhang2020` | Henan (TQ) | GBM | **0.817** no-lab | **AUPR 0.546 · PPV 28.83%** ← hình mẫu báo cáo trung thực |
| `lugner2024` | UK Biobank | XGBoost | 0.903 | **Acc 0.92 nhưng PR-AUC 0.29, Sens 0.62** ← hình mẫu |
| **ADA/CDC Risk Test** | NHANES 2005-2006 | (thang điểm) | **0.78–0.83** | cutoff ≥5 điểm: Sn 72–79%, Sp 62–67% |
| **FINDRISC** | NHANES 2005-2010 | (thang điểm) | — | 8 mục, đã được kiểm định trên dân số Mỹ |

> **Kỳ vọng thực tế cho anh:** AUC khoảng **0.75–0.83**. Nếu anh ra **> 0.90 với feature no-lab
> → gần như chắc chắn có rò rỉ**, đi kiểm tra lại ngay. Con số "đẹp" ở bài toán này là con số
> **đáng ngờ**.

---

## 4. Câu trích dẫn sẵn cho Introduction

Chép thẳng, chỉ cần thêm citation:

- **Gap external validation:** *Endocrine Connections* 2025 (Li et al.), tổng quan hệ thống
  **65 nghiên cứu / 97 mô hình**: chỉ **21 mô hình** có external validation; **>80% mô hình nguy
  cơ chệch cao theo PROBAST**; hồi quy logistic chiếm 97.9%; ML báo AUC lên tới **0.998**.
- **Gap báo cáo:** *npj Digital Medicine* 2023 (PMC10600138): **5/40** external · **5/40**
  calibration · **4/40** code · **4/40** SHAP.
- **Chuẩn báo cáo:** TRIPOD+AI (BMJ 2024) và PROBAST+AI (BMJ 2025) đã ban hành, nhưng khảo sát
  cuối 2025 cho thấy chỉ ~**28%** bài ML đạt TRIPOD+AI (bài hồi quy ~38%).
- **Từ chính kho của anh** *(⚠️ phải đếm tay lại trước khi viết — xem §6)*: trong **35** bài dự
  đoán ĐTĐ được trích dẫn nhiều mà chúng tôi khảo sát, **không bài nào** dùng decision curve
  analysis; ~2 bài báo calibration; ~3 bài báo PR-AUC; ~3 bài có external validation thật.
- **Con số thổi phồng để đối chiếu:** `olisah2022` accuracy **100%** (PIMA) · `naz2020` **98.07%**
  · `kaliappan2024` **0.990** · `abnoosian2023` **0.9887**.

---

## 5. Bẫy kỹ thuật đã kiểm chứng (tiết kiệm cho anh vài buổi)

| Bẫy | Triệu chứng | Cách xử |
|---|---|---|
| **URL NHANES cũ** | `https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/DEMO_J.XPT` trả **HTTP 200** nhưng nội dung là trang HTML "Page Not Found" (~20 KB) → script hỏng **âm thầm** | Pattern đúng: `.../Nchs/Data/Nhanes/Public/{năm}/DataFiles/{FILE}.xpt`. `build_nhanes.py` đã kiểm magic-bytes |
| **Console Windows** | `UnicodeEncodeError: 'charmap' codec` khi in tiếng Việt | `sys.stdout.reconfigure(encoding="utf-8")` — đã cài sẵn |
| **Mã 7 / 9 trong NHANES** | 7 = từ chối, 9 = không biết. Nếu để nguyên, model coi là **giá trị số** | Phải đổi thành `NaN`. Đã xử lý cho `BPQ020`, `MCQ300C`, `SMQ020`, `PAQ*` |
| **Huyết áp = 0** | NHANES ghi `0` cho lần đo hỏng | `.replace(0, np.nan)` trước khi lấy trung bình |
| **`.eq(1).any()` nuốt NaN** | Biến thiếu âm thầm thành "Không" → tỉ lệ thiếu hiện 0.0% | Chỉ kết luận khi có ít nhất 1 câu trả lời hợp lệ |
| **`SMQ040` NaN không phải thiếu** | Chỉ hỏi người đã `SMQ020=1`. NaN ở người chưa từng hút = **0 thật**, không phải thiếu | Đã phân biệt trong code |
| **Ghép nhiều chu kỳ** | Trọng số sai nếu cộng thẳng | Chia `WTMEC2YR` cho **số chu kỳ** (hướng dẫn NCHS) |
| **Cột XPT có khoảng trắng** | `KeyError: 'SMQ020'` dù cột có tồn tại | `df.columns = [c.strip() for c in df.columns]` |

---

## 6. Việc còn phải tự xác minh (⚠️ đừng viết vào bài trước khi làm)

| # | Cần xác minh | Vì sao quan trọng |
|---|---|---|
| 1 | `dinh2019` **thật sự** không dùng trọng số khảo sát? Mở `source.pdf` → Methods | Đây là **claim về người khác**. Sai = mất uy tín cả bài |
| 2 | `yu2010` dùng SUDAAN **chỉ cho hồi quy logistic, không cho SVM**? → ghi số trang | Nền tảng của đóng góp P1 |
| 3 | Đếm **tay** lại bảng §3.2 `TO_DO.md` trên 35 bài | Grep bỏ sót (`zhang2020` viết "AUPR" chứ không phải "AUPRC"). Và phải đổi câu chữ thành *"trong N bài chúng tôi khảo sát"*, KHÔNG phải *"trong y văn"* |
| 4 | Đọc đối thủ **medRxiv 2025.09.05.25335151** | Xác định nó thiếu gì → chỗ anh cắm cờ. ⚠️ medRxiv chặn tải tự động, anh phải tự mở trình duyệt |
| ~~5~~ | ~~NHANES có biến mạch/nhịp tim nghỉ không?~~ | ✅ **ĐÃ XONG 26/07** — `BPXPLS` (mạch 60 giây) CÓ trong `BPX_J`, thiếu 4.4%. Đã thêm vào feature. Nghĩa là anh harmonize được **đúng bộ feature của `sgchoi2023`** → so sánh trực tiếp NHANES vs KNHANES |

---

## 7. Bài nào dùng vào việc gì (bản 1 dòng)

| Bài | Vai trò duy nhất |
|---|---|
| `sgchoi2023` | **Bài gần anh nhất.** Đọc 1 lần để thấy cách trình bày |
| `yu2010` · `dinh2019` | Mốc benchmark NHANES + bằng chứng cho đóng góp P1 |
| `choi2014` | Mẫu external validation + bằng chứng "ML hơn score rất ít" |
| `zhang2020` · `lugner2024` | Hình mẫu **cách báo cáo trung thực** (AUPR, PPV, Sens thật) |
| `nnamoko2020` | Protocol chống rò rỉ + McNemar test |
| `lai2019` | DeLong test so 2 AUC |
| `hasan2020` | Có code — đọc code, không đọc bài |
| `olisah2022` · `naz2020` · `kaliappan2024` · `abnoosian2023` | Chỉ lấy **1 con số** mỗi bài làm dẫn chứng thổi phồng |
| `rasmy2021` · `li2020` · và ~20 bài còn lại | **Chỉ trích dẫn ở Related Work. Không đọc.** |
