# AGENTS.md — Quy ước cho mọi AI agent làm việc trong `D:\NCKH`

> Mọi agent (Claude, Codex, Cursor...) PHẢI đọc file này trước khi thao tác.
> Khi xung đột: AGENTS.md > skill default > prompt cụ thể của user.

---

## 1. Bối cảnh nghiên cứu

- **Chủ đề (DUY NHẤT)**: **Dự đoán / phân tầng đái tháo đường (diabetes prediction & staging)**
  trên dữ liệu tabular/EHR. Hai **dạng nhãn** TRONG scope (trục `label_type`, §5):
  - **Binary (chính)** — có / không ĐTĐ. Vẫn là trục chủ đạo của kho.
  - **Multi-class ordinal glycemic staging (mở rộng — thêm 2026-07-06, Q006)** — Bình thường →
    Tiền ĐTĐ (prediabetes) → ĐTĐ, theo ngưỡng ADA (HbA1c/FPG/OGTT). CHỈ nhận khi làm
    **leakage-safe**: KHÔNG dùng trực tiếp chính biomarker định-nghĩa-nhãn (HbA1c/FPG/OGTT) làm
    feature, HOẶC phải khung lại thành **dự báo giai đoạn tương lai (progression)**.
  MỌI search, phân tích, so sánh PHẢI phục vụ đúng chủ đề này; KHÔNG nhận paper ngoài topic.
- **NGOÀI scope staging — TỪ CHỐI**: (a) **T1D immune staging** Stage 1/2/3 (Insel 2015) — là
  Type 1, dựa autoantibody/OGTT dài/omics/longitudinal, KHÔNG phải tabular/EHR T2D thường quy;
  (b) **phân độ biến chứng bằng ảnh/tín hiệu** (retinopathy, neuropathy) — đã loại ở mục image-based.
- **3 dạng prediction trong scope** (trục thời gian — chi tiết §3b `prediction_horizon`):
  - **Cross-sectional** — dự đoán "bình thường" từ feature đo cùng thời điểm (PIMA,
    BRFSS…). Bao gồm cả các paper khung "chẩn đoán" cổ điển kiểu PIMA.
  - **Early detection** — phát hiện sớm ở giai đoạn tiền/cận lâm sàng, người chưa được
    chẩn đoán (early detection of T2D, opportunistic screening).
  - **Long-term risk** — dự đoán nguy cơ mắc sau N năm; cần dữ liệu longitudinal/cohort.
- **Hướng kỹ thuật**: ML & DL trên dữ liệu **tabular + EHR**.
- **2 trục phân loại (VUÔNG GÓC nhau)**: **Layer 1-4** = đóng góp kỹ thuật (§3);
  **`prediction_horizon`** = dạng bài toán dự đoán (§3b). Mỗi paper mang ĐỦ CẢ HAI.
- **Ngoài scope — TỪ CHỐI**: retinopathy, CGM time-series, image-based, và mọi bài
  KHÔNG phải diabetes prediction (chỉ điều trị, chỉ dịch tễ mô tả, genomics không có
  mô hình dự đoán…). Gặp loại này → từ chối, gợi ý quay về diabetes prediction tabular/EHR.
- **Ngôn ngữ output cho user**: Tiếng Việt (giữ thuật ngữ EN trong ngoặc khi cần).

---

## 2. Cấu trúc thư mục (BẮT BUỘC tuân thủ)

```
D:\NCKH\
├── AGENTS.md                       ← file này
│
├── .claude\                        ← TOÀN BỘ skill + template của agent
│   ├── skills\
│   │   ├── paper-finder\           tìm bài báo mới, gán Layer
│   │   ├── paper-analyzer\         phân tích PDF → analysis.html (tiếng Việt)
│   │   ├── paper-comparator\       so sánh paper trong cùng Layer
│   │   └── pdf-extract\            utility: PDF → extracted.md
│   ├── templates\
│   │   └── analysis-template.html  template HTML CHUẨN cho mọi analysis.html (xem §6)
│   └── settings.local.json
│
├── chosed_papers\                  ← các paper user THỰC SỰ chọn (chỉ PDF)
│   ├── Layer_1_Pipeline_Nen_Tang\
│   ├── Layer_2_Model_Hieu_Qua\
│   ├── Layer_3_Dataset_EHR\
│   └── Layer_4_XAI_Trien_Khai\
│
├── webapp\                         ← Research Hub (Next.js local) — GUI đọc/ghi kho paper
│   │                                 KHÔNG phải nguồn chân lý; chỉ là giao diện trên filesystem.
│   ├── src\                          mã nguồn (KHÔNG đụng khi làm nghiên cứu)
│   └── data\hub.db                   SQLite: CHỈ thống kê nguồn search + settings web
│
└── searched_papers\                ← TẤT CẢ paper agent tìm được
    ├── Layer_1_Pipeline_Nen_Tang\
    │   └── <paper_id>\
    │       ├── source.pdf           file gốc
    │       ├── metadata.json        thông tin chuẩn (xem §5)
    │       ├── extracted.md         text extract từ PDF (pdf-extract sinh)
    │       ├── analysis.html        phân tích tiếng Việt (paper-analyzer sinh)
    │       ├── comparison.md        so sánh trong layer (paper-comparator sinh)
    │       ├── notes.md             ghi chú của user (webapp tab "Ghi chú" — đọc/sửa được)
    │       └── highlights.json      vùng tô PDF của user (webapp — overlay, KHÔNG sửa source.pdf)
    ├── Layer_2_Model_Hieu_Qua\
    ├── Layer_3_Dataset_EHR\
    └── Layer_4_XAI_Trien_Khai\
```

> **`notes.md` / `highlights.json`** do Research Hub (webapp) sinh ra từ thao tác
> của user. Agent ĐƯỢC đọc để hiểu user quan tâm gì, nhưng KHÔNG tự ghi đè —
> đây là dữ liệu thủ công của user. `highlights.json` là overlay toạ độ chuẩn
> hoá (0..1) theo trang, không nằm trong PDF gốc.

---

## 3. Định nghĩa 4 Layer (NỀN TẢNG để gán paper)

| Layer | Tên | Trọng tâm |
|------|-----|-----------|
| **1** | Pipeline_Nen_Tang | Tiền xử lý, handling missing, outlier, **oversampling/SMOTE**, feature selection (Boruta/PCA), baseline ML (RF, LGBM, GB) |
| **2** | Model_Hieu_Qua    | So sánh model, **ensemble/stacking/boosting**, deep tabular, tối ưu hyperparam, kỹ thuật tăng accuracy |
| **3** | Dataset_EHR       | Làm việc với **EHR thật** (NHANES, MIMIC, eICU), opportunistic screening, cohort thực tế, longitudinal data |
| **4** | XAI_Trien_Khai    | **Explainability** (SHAP, LIME), interpretability, deployment, clinical impact, trust |

**Quy tắc gán Layer**: 1 paper = 1 Layer chính. Nếu phân vân giữa nhiều Layer → chọn Layer ứng với **đóng góp lớn nhất** của paper, không phải topic phụ.

---

## 3b. Trục thứ hai: `prediction_horizon` (BẮT BUỘC — vuông góc với Layer)

Layer cho biết paper **xây thế nào**; `prediction_horizon` cho biết paper **dự đoán cái gì**.
Mỗi paper PHẢI mang đúng **1 horizon**, gán ĐỘC LẬP với Layer (một Layer-2 ensemble có thể
là `cross_sectional`, `early_detection`, hay `long_term_risk`).

| Horizon | Định nghĩa | Dấu hiệu nhận biết | VD trong kho |
|---------|-----------|--------------------|--------------|
| `cross_sectional` | Dự đoán trạng thái ĐTĐ **hiện tại** từ feature đo cùng thời điểm (không có khoảng cách thời gian feature → label) | Dataset cross-sectional (PIMA, BRFSS, Sylhet, Frankfurt); không follow-up; khung "diagnosis/classification" cổ điển | gr2024, hasan2020, khanam2021, naz2020 |
| `early_detection` | **Phát hiện sớm**: đối tượng chưa được chẩn đoán / giai đoạn tiền-cận lâm sàng; sàng lọc cơ hội | Từ khoá "early detection", "screening", "undiagnosed", "prediabetes", "opportunistic" | lai2019, nipa2023, dinh2019 |
| `long_term_risk` | Dự đoán **onset sau N năm** từ baseline; cần theo dõi dọc | Cohort longitudinal, follow-up N năm, "incident diabetes", "risk over X years" | rasmy2021, fazakis2021, deberneh2021, li2020, lugner2024 |

**Quy tắc gán horizon**: theo **khung bài toán paper TỰ ĐẶT RA**, không suy từ dataset đơn thuần
(cùng NHANES có thể dùng cho cả 3 horizon tuỳ cách lập label). Phân vân → đặt
`horizon_uncertain: true`, mặc định `cross_sectional`, để user quyết.

> **Lưu ý cân bằng kho**: kho vẫn nghiêng về `cross_sectional`. `long_term_risk` đã có vài bài
> (rasmy2021, fazakis2021, deberneh2021, li2020, lugner2024) nhưng còn mỏng; `early_detection`
> cũng cần thêm. Khi finder đề xuất bài mới, ưu tiên lấp 2 horizon này.

---

## 4. Quan hệ giữa `chosed_papers/` và `searched_papers/`

- `searched_papers/` là **superset** của `chosed_papers/`. Mọi paper agent tìm được đều vào đây trước.
- `chosed_papers/` chỉ chứa các PDF mà **user đã duyệt** sau khi đọc analysis.
- Agent **KHÔNG** được tự ý move/copy paper sang `chosed_papers/`. Chỉ user mới có quyền promote.
- Khi user yêu cầu "nâng cấp / mở rộng / so sánh / cải tiến" — agent PHẢI dùng `chosed_papers/` làm baseline, không phải `searched_papers/`.

---

## 5. Schema `metadata.json` (cho mọi paper trong `searched_papers/`)

> Có **2 nguồn ghi** file này: (a) **webapp** (ExploreX) khi user lưu/queue/promote; (b) **agent**
> (Claude) khi tìm/phân tích/tải PDF. Cả hai dùng read-modify-write **giữ nguyên field của nhau** →
> thêm field mới luôn an toàn. Field webapp **đọc** (đánh dấu 🔗) thì **TUYỆT ĐỐI không đổi tên**.

Ví dụ các field thường gặp (không phải tất cả đều bắt buộc — bài cũ/seed có thể thiếu vài field):
```json
{
  "paper_id": "nnamoko2020_outliers_imbalance",
  "title": "<full title>",
  "authors": ["..."],
  "year": 2020,
  "venue": "<journal/conference>",
  "doi": "<doi or null>", "arxiv": null, "pubmed": null, "pmc": null,
  "citations": 154,
  "citations_secondary": null,
  "citations_checked_at": "2026-06-20T00:00:00+07:00",
  "citations_source": "openalex",
  "layer": 1,
  "layer_uncertain": false,
  "prediction_horizon": "cross_sectional",
  "horizon_uncertain": false,
  "label_type": "binary",
  "datasets_mentioned": ["pima", "..."],
  "dataset_slugs": ["pima-indians-diabetes", "..."],
  "method_slugs": ["iqr-outlier-detection", "smote", "c4.5"],
  "code_url": null,
  "reproducibility": 2,
  "source_pdf": "source.pdf",
  "page_count": 12,
  "open_access_pdf": "<link OA or null>",
  "license": null,
  "pdf_status": "downloaded",
  "pdf_fetch_attempts": "<log tự do — route đã thử>",
  "download_link": null,
  "is_seed": false,
  "lookup_status": "ok",
  "status": "analyzed",
  "analysis_status": "analyzed",
  "reject_reason": null,
  "scope_note": "<reviewer: vì sao đáng giá / hạn chế>",
  "corrections": "<sửa gì sau khi đọc full text>"
}
```

### Bảng field (🔗 = webapp ĐỌC → không đổi tên)

| Nhóm | Field | Ý nghĩa |
|------|-------|---------|
| Định danh | `paper_id` 🔗 · `title` 🔗 · `authors` · `year` · `venue` · `doi` · `arxiv` · `pubmed` · `pmc` | nhận dạng bài |
| Trích dẫn | `citations` 🔗 (chính, OpenAlex — webapp **sort theo field này**) · `citations_secondary` (S2) · `citations_checked_at` (ISO-8601 có offset) · `citations_source` | số cite |
| Phân loại | `layer` (1–4) · `layer_uncertain` · `prediction_horizon` (§3b) · `horizon_uncertain` · `label_type` (§1) | 2 trục §3/§3b + dạng nhãn §1 |
| Dữ liệu/PP | `datasets_mentioned` 🔗 (tên thô) · `dataset_slugs` 🔗 (kebab) · `method_slugs` (kebab) | dataset + method |
| Code | `code_url` 🔗 | repo public, hoặc `null` = KHÔNG có code. **Đây là nguồn-chân-lý** — KHÔNG dùng `code_available` |
| PDF/nguồn | `source_pdf` 🔗 (tên file PDF; gate xem PDF + promote) · `page_count` 🔗 · `open_access_pdf`/`pdf_url` · `license` · `pdf_status` (enum) · `pdf_fetch_attempts` (log) · `download_link` (link tải tay bài closed) | quản lý PDF |
| Vòng đời | `status` 🔗 (enum) · `analysis_status` 🔗 (enum) · `analysis_status_at` · `reject_reason` · `chosen_at` | xem mục dưới |
| Provenance | `is_seed` · `lookup_status` · `found_by` · `abstract` · `url` | nguồn gốc (webapp save) |
| Reviewer (agent) | `scope_note` (vì sao đáng giá/hạn chế) · `corrections` (sửa gì sau khi đọc full) | enrichment — NÊN ghi |
| Vai trò đề tài | `role` 🔗 · `role_note` 🔗 · `role_at` | **thêm 2026-07-26 (Q008)** — bài này dùng vào việc gì trong đề tài ĐÃ CHỐT. Xem enum dưới |
| Kiểm §7 | `s7_recheck` | snapshot `{at, publication_date, age_years, citations, threshold, pass, note}` — §7 là cổng NHẬN VÀO, KHÔNG loại bài chỉ vì nó già qua mốc |
| Tái lập | `reproducibility` (int) | **LEGACY** — thang KHÔNG nhất quán, webapp không đọc. Field thật = `summary.json.reproducible` (high/med/low). Backfill mới theo thang **1=low / 2=medium / 3=high** |

### Enum (giá trị cố định)
- `status`: `searched` → `analyzed` → `chosen` \| `rejected`. (Bỏ `compared` — không dùng.)
- `analysis_status`: `none` \| `queued` \| `analyzed`. **KHÔNG dùng `pending`** (webapp không hiểu). Bài closed chưa có PDF: để `analysis_status:"none"`, trạng thái chờ-PDF nằm ở `pdf_status`.
- `pdf_status`: `ok` \| `downloaded` \| `pending_closed_access` \| `blocked_closed_access` (chi tiết route ghi ở `pdf_fetch_attempts` — xem skill `pdf-fetch`).
- `prediction_horizon`: `cross_sectional` \| `early_detection` \| `long_term_risk` (§3b). KHÔNG tự chế giá trị khác.
- `label_type`: `binary` \| `multiclass_staging` (§1). Mặc định `binary` (bài cũ thiếu field → coi là `binary`). `multiclass_staging` chỉ dùng cho glycemic staging leakage-safe/progression theo §1.
- `layer`: `1` \| `2` \| `3` \| `4` (số nguyên).
- `role` (thêm 2026-07-26, Q008): `design` \| `method` \| `positioning` \| `inflation` \| `later` \| `related`
  — khớp 1-1 với 6 nhóm đọc 🅐–🅕 của `TO_DO.md` §6. **Trục này VUÔNG GÓC với `verdict`**:
  `verdict` = chất lượng/độ tin cậy của bài; `role` = bài này dùng vào việc gì trong bài báo.
  Webapp hiện `role` thành cột "Vai trò" + chip lọc + sort "Thứ tự đọc" ở trang Thư viện.
  Paper mới PHẢI được gán `role` khi phân tích; phân vân → `related` (mặc định an toàn).

### `status` vs `analysis_status` (2 trục — đừng nhầm)
- `status` = **vòng đời paper**. LƯU Ý: webapp suy ra "đã chọn" từ **sự hiện diện folder trong `chosed_papers/`**, KHÔNG từ field `status` → `status:"chosen"` chỉ là ghi chú phụ.
- `analysis_status` = **trạng thái hàng đợi phân tích**. webapp tự coi là `analyzed` nếu có `analysis.html`.

### Quy tắc đặt tên & field deprecated
- `paper_id`: `<lastname><year>_<3-word-slug>`, snake_case, không dấu. VD: `kumar2023_ensemble_xai`.
- `dataset_slug` / `method_slug`: kebab-case. VD: `pima-indians-diabetes`, `random-oversampling`, `shap`.
- **KHÔNG ghi mới** các field deprecated: `code_available` (→ `code_url`), `open_access_pdf_status` (→ `pdf_status`), `citations_alt` (→ `citations_secondary`), `analysis_status:"pending"` (→ `none`).

---

## 6. Template `analysis.html` (CHỐT — dùng cho MỌI paper)

File template: `.claude/templates/analysis-template.html`.
File mẫu đã render (xem trước layout): `searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/analysis.html`.

Mọi `analysis.html` agent sinh ra PHẢI có đúng **8 khối** sau, theo đúng thứ tự (để so sánh chéo giữa các paper được nhanh, mở 5 tab cạnh nhau scroll cùng vị trí):

| # | Khối | Nội dung BẮT BUỘC |
|---|------|-------------------|
| 1 | **Header** (gradient xanh) | title · year · venue · `📚 N citations (MM/YYYY)` · DOI link · badge `💻 Code: Có/Không` (xanh/đỏ) · badge `📊 Dataset: Có/Không` (xanh/đỏ) · badge `⏱️ Horizon: Cross-sectional/Early/Long-term` (tím — value lấy từ `prediction_horizon`) · danh sách dataset có link embed nếu có |
| 2 | **Compare Card** (gradient tím) | 4 field CỐ ĐỊNH: 🎯 Đóng góp chính · 🏆 Best metric (số + dataset) · 🔧 Method chính · 🔄 So với baseline / paper khác cùng Layer |
| 3 | Section: 📋 Tổng quan & vì sao Layer N | 1 đoạn lead + bảng `lý do | giải thích` |
| 4 | Section: 🔧 Công nghệ & mô hình | Bảng `kỹ thuật | vai trò | mạnh | yếu`, đánh ⭐ cho model thắng |
| 5 | Section: 🗄️ Dataset | Bảng `tên | mẫu | feature | mô tả | link` |
| 6 | Section: ⚙️ Cách triển khai | Bảng pipeline + công thức (formula block đen) + hình crop từ PDF (embed base64) |
| 7 | Section: 🏆 Kết quả | Metric grid (cards lớn) + bảng chi tiết `dataset | model | setting | metric | nguồn` |
| 8 | Section: ⚠️ Lưu ý quan trọng | 3 callout vàng: ⚠️ Rủi ro · 🎯 Giới hạn · 💡 Vai trò trong đề tài |

### Ràng buộc khi render
- **KHÔNG bịa số liệu**: paper không nêu → ghi `UNKNOWN` (Compare Card vẫn phải có 4 field, value = `UNKNOWN` nếu thiếu).
- **KHÔNG đổi số khối, đổi thứ tự, đổi tên field trong Compare Card** — phá rule này = phá so sánh chéo.
- **Self-contained**: inline CSS + inline SVG, KHÔNG CDN, KHÔNG external image (hình từ PDF phải embed base64).
- **Ngôn ngữ**: tiếng Việt, giữ EN trong ngoặc khi cần (vd: "tăng cường mẫu thiểu số (SMOTE)").
- **Nguồn số liệu**: mọi metric trong section 7 PHẢI ghi rõ `Table X` / `Fig Y` / `Section Z` của PDF.
- **Khi paper hoàn toàn không có số kết quả**: section 7 render dòng muted "Paper không công bố số liệu cụ thể — chỉ mô tả định tính. Không bịa số." thay vì metric grid.

---

## 7. Ràng buộc cứng cho paper được "found"

Trước khi tạo folder trong `searched_papers/`, paper PHẢI thỏa cả 3 tiêu chí dưới (nếu fail bất kỳ → reject, báo user lý do):

1. **Highly cited** (lấy số từ Semantic Scholar, KHÔNG đoán):
   - ≥ 100 citations nếu xuất bản > 3 năm.
   - ≥ 30 citations nếu 1–3 năm.
   - "Rising star" (≥ 5 citations/tháng) nếu < 1 năm.
2. **Dataset public**: có link tải hoặc procedure xin access rõ (PhysioNet DUA OK).
3. **Code/Method reproducible**: repo GitHub public + README, HOẶC method mô tả đủ chi tiết trong paper để tái lập.

Nếu không thỏa → KHÔNG tạo folder, báo user lý do reject.

---

## 8. Quy tắc làm việc chung

- **Không drift sang topic ngoài scope** (xem §1). Bài/topic KHÔNG phải diabetes prediction → từ chối/reject (ghi `rejected.json` nếu đã có folder). retinopathy / CGM / image → từ chối, gợi ý quay về diabetes prediction tabular/EHR.
- **Không tự đoán số liệu** (citations, accuracy, year). Ghi `UNKNOWN` nếu không verify được.
- **Tra citation OpenAlex phải dùng `/works?filter=doi:<doi>` và kiểm `meta.count == 1`** — endpoint
  `/works/doi:<doi>` có thể khớp nhầm **bản ghi TRÙNG**. Đã dính thật: `yu2010` bị trả 0 citations
  (bản ghi 2008) trong khi bản đúng có 524 (Q008, 26/07/2026). Số citation trong `analysis.html`
  ghi rõ nguồn khác (Scopus/S2) thì KHÔNG ghi đè bằng số OpenAlex — bổ sung bên cạnh.
- **Không ghi đè analysis.html / overview.md / etc.** đã có. Tạo `analysis.v2.html` và update metadata `status`.
- **Không tạo file mới ngoài 3 folder gốc** (`.claude/`, `chosed_papers/`, `searched_papers/`). Nếu cần file mới → hỏi user.
- **Mọi tham chiếu paper** trong chat: dùng `paper_id` chứ không phải title dài.

---

## 9. Khi user yêu cầu "nâng cấp" / "mở rộng" / "cải tiến"

Agent PHẢI:
1. Đọc TẤT CẢ paper trong `chosed_papers/Layer_<n>/` của layer liên quan trước.
2. Đọc `analysis.html` / `overview.md` của các paper đó trong `searched_papers/`.
3. Dùng chính những paper này làm **nền tảng**, đề xuất cải tiến SO VỚI những gì paper chọn đã làm.
4. Không đưa đề xuất chung chung "có thể dùng SHAP" mà phải nói rõ "paper X đã dùng SHAP cho Layer 4, đề xuất mở rộng bằng …".

---

## 10. Khi xung đột / không chắc

- Dừng lại, hỏi user. Không tự ý phá rule §1-§7.
- Nếu thấy file/folder lạ ngoài cấu trúc §2 → hỏi user trước khi xóa hoặc move.

---

## 11. Workflow phân tích & chọn lọc (ExploreX webapp + Claude)

ExploreX (webapp) chỉ **tìm + gom + lọc thô**. Việc **đọc, phán xét, chọn lọc**
là của Claude (agent). Webapp KHÔNG tự gọi AI.

### Khi user nói "phân tích hàng đợi" / "duyệt hàng đợi"
1. Quét `searched_papers/Layer_*/*/metadata.json`, lấy paper có
   `"analysis_status": "queued"` (đây là hàng đợi user đánh dấu trên web).
2. Với mỗi paper trong hàng đợi:
   - Đọc `metadata.json` + `extracted.md` (nếu chưa có, chạy `pdf-extract`) +
     `source.pdf` khi cần.
   - **Phán xét theo §7** (highly-cited, dataset public, code/method tái lập được)
     VÀ đúng scope §1 (tabular/EHR diabetes).
   - **Nếu ĐẠT** → viết `analysis.html` 8 khối theo §6, set
     `analysis_status: "analyzed"`, `status: "analyzed"`.
   - **Nếu KHÔNG đạt** → thêm vào `rejected.json` (xem dưới) kèm **lý do cụ thể**,
     `by: "claude"`. Được tự reject, không cần hỏi (user đã uỷ quyền).
3. Báo user tóm tắt: bài nào analyzed, bài nào rejected + lý do.

### File `rejected.json` (ở root `D:\NCKH`)
Danh sách paper đã loại để **search KHÔNG gợi lại**. Schema mỗi entry:
```json
{
  "dedup_key": "doi:10.x/yyy",          // doi:<doi> | arxiv:<id> | title:<norm>
  "paper_id": null,
  "title": "...",
  "title_norm": "...",                  // title lowercase, bỏ ký tự đặc biệt
  "doi": "...", "arxiv": null,
  "reason": "lý do loại — BẮT BUỘC, cụ thể",
  "by": "claude",                       // "claude" | "user"
  "layer": 2,
  "rejected_at": "ISO-8601"
}
```
- `dedup_key` tính giống §5 logic: ưu tiên `doi:` → `arxiv:` → `title:<title_norm>`.
- Khi reject 1 paper đã có folder trong `searched_papers/`: thêm vào `rejected.json`
  VÀ set metadata `status: "rejected"` + `reject_reason`. KHÔNG xoá folder (user xoá).
- Append/upsert theo `dedup_key`, giữ nguyên các entry cũ. KHÔNG ghi đè cả file mất dữ liệu.

### Quan hệ với rule cũ
- §7 vẫn là tiêu chí gốc để nhận/loại. §11 chỉ thêm: nơi ghi lý do loại
  (`rejected.json`) + cơ chế hàng đợi (`analysis_status`).
- `analysis_status` (none/queued/analyzed) khác với `status` (searched/analyzed/
  chosen/rejected) ở §5 — cái trước cho hàng đợi web, cái sau cho vòng đời paper.

### Artefact mới của vòng lặp (ExploreX)
- **`extracted.md`**: bản trích PDF **trung thực, đầy đủ, giữ cấu trúc** (bảng→markdown,
  đa cột đúng thứ tự đọc, OCR trang scan) do skill `pdf-extract` (engine **docling** +
  fallback pymupdf4llm) sinh. ExploreX có thể tự trích text-only khi paper vào queue
  NHƯNG bản đó THÔ (mất bảng, trộn cột, dính watermark) → **trước khi analyze, đảm bảo
  `extracted.md` đã qua `pdf-extract`**. Mỗi file có header `<!-- ... | score=N -->` +
  `extraction_report.json` (QA có cơ sở: coverage bảng vs caption gốc, tail-check chống
  cụt; **score <85 = cần xem lại**). Bản thô cũ được lưu `extracted.prev.md`.
  Re-trích 1 bài: `python .claude/skills/pdf-extract/extract.py <paper_dir> --force`;
  toàn bộ: `python .claude/skills/pdf-extract/run_all.py [--min-skip 95]`;
  chỉ chấm lại QA (đổi công thức điểm, không trích lại): `recompute_qa.py`.
  (Coverage bỏ "Supplementary Table N"; tail-check bỏ qua khi OCR — tránh phạt oan.)
- **`summary.json`** (trong folder paper): em ghi khi phân tích (schema ở skill
  `paper-analyzer`). Là nguồn cho research brief — PHẢI ghi mỗi lần analyze.
- **`RESEARCH_BRIEF.md`** (root): bản tóm tắt trạng thái nghiên cứu, sinh từ web
  (nút "Sinh Research Brief") hoặc bất cứ lúc nào. **ĐỌC FILE NÀY ĐẦU MỖI PHIÊN**
  để định hướng nhanh thay vì đọc lại tất cả analysis.html.
- **`rejected.json`** (root): xem §11.
- **Snowballing**: ExploreX có thể duyệt references (backward) + citations (forward)
  của bài đã chọn qua OpenAlex → pool ứng viên trúng đích cho em triage.
- **`search_pool.json`** (root): ExploreX ghi đè sau MỖI lần search — pool kết quả
  gần nhất (đã dedup, đã bỏ rejected + đã có trong thư viện), kèm title/abstract/
  citations/dedup_key. Khi user nói "triage" / "sàng lọc pool": đọc file này,
  phán giữ/loại từng bài theo §7 + scope §1. Bài loại → ghi vào `rejected.json`
  (đã uỷ quyền); bài đáng giữ → đề xuất user lưu vào Layer trên web.
  Đồng thời ghi verdict vào field `triage` của chính file này để web hiển thị
  (panel "Pool & Triage" ở trang Tìm bài báo):
  `triage[dedup_key] = { "verdict": "keep"|"reject", "reason": "...", "layer": 1-4? }`
  — chỉ thêm/sửa field `triage`, KHÔNG đụng `papers`.
- **`RESEARCH_LOOP.html`** (root): sơ đồ vòng lặp 8 bước + ai làm gì. Mở để nhớ luồng.

### Vòng lặp chuẩn (xem RESEARCH_LOOP.html)
discover (web) → **triage (em)** → save (user/web) → queue+auto-extract (web) →
**deep-analyze: analysis.html + summary.json (em)** → **decide: promote/reject (em+user)**
→ brief (web) → **đọc brief định hướng (em)** → lặp lại.

---

## 12. Nhật ký Hỏi–Đáp định hướng — `QA_LOG.md` (huấn luyện agent)

File **`QA_LOG.md`** (root) + bản máy đọc **`qa_log.json`** lưu các câu hỏi **chiến lược /
định hướng / phương pháp luận** của user và câu trả lời đã chốt. Mục đích: agent các phiên SAU
học **cách user nghĩ + nguyên tắc đã chốt**, không trả lời lại từ đầu. Khác `RESEARCH_BRIEF.md`
(trạng thái paper) và `DECISION_BOARD.md` (gợi ý promote) — đây là *tư duy định hướng*.

- **ĐỌC `QA_LOG.md` đầu mỗi phiên** (cùng `RESEARCH_BRIEF.md`) để nắm định hướng + ưu tiên của user.
- Sau MỖI câu hỏi định hướng của user + câu trả lời đã chốt → **append 1 entry** vào CẢ HAI file
  (`QA_LOG.md` thêm section + 1 dòng mục lục; `qa_log.json` push vào `entries`). **Append-only**,
  KHÔNG sửa entry cũ; quyết định bị đảo → entry mới ghi `supersedes: "Q###"`.
- Mỗi entry BẮT BUỘC có **`Nguyên tắc rút ra` / `principle`** — 1–3 câu tái dùng được (phần giá trị
  nhất để huấn luyện). Không chỉ là câu hỏi vặt kỹ thuật một lần; ưu tiên câu định hướng có giá trị lâu dài.

---

## 13. Trạng thái thi công — `PROGRESS.json` (thêm 2026-07-26, Q007)

Sau khi đề tài được chốt (Q007), dự án chuyển từ giai đoạn *gom paper* sang giai đoạn *thi công*.
File **`PROGRESS.json`** (root) là **nguồn chân lý về "đang ở đâu, làm gì tiếp"**.

- **ĐỌC đầu mỗi phiên**, cùng `START_HERE.md` + `QA_LOG.md`. Đây là thứ trả lời câu hỏi
  user hay hỏi nhất: *"tuần này làm gì?"*
- **Giao diện**: trang `/tien-do` của ExploreX (`webapp/src/app/tien-do/`). Webapp chỉ là GUI —
  file trên đĩa mới là chân lý (§2). User tick/ghi chú trên web → ghi thẳng vào file này qua
  `PATCH /api/progress`.
- **Khi user báo xong việc** → cập nhật `status` + `done_at` + `note` (kết quả/số liệu thật).
  **Append-only về mặt task**: KHÔNG xoá task; việc bỏ thì để `status: "skipped"` + lý do trong `note`.
- **Ghi phải read-modify-write** (giữ field lạ) + atomic, giống `metadata.json` (§5).
- Trường `owner` phân công: `"anh"` = user tự làm (quyết định, đọc, viết, gặp bác sĩ);
  `"claude"` = agent làm (code, trích xuất, dò bug, đóng vai reviewer).
- Trường `done_when` là **Definition of Done** — dùng nó để CHẶN scope creep: đạt là dừng,
  không làm thêm.
- 3 tầng: **Tầng 0 = bắt buộc** (đủ để có bài báo) · Tầng 1–2 = nâng cấp tuỳ chọn.
  Khi tư vấn, **mặc định chỉ nói về Tầng 0** trừ khi user hỏi xa hơn — user đã nêu rõ
  bị ngợp vì scope rộng.

**Bộ file định hướng hiện tại (đọc theo thứ tự này):**
`START_HERE.md` (ngắn, chống ngợp) → `PROGRESS.json` (làm gì tiếp) →
`CHEATSHEET.md` (tra cứu thay cho đọc paper) → `TO_DO.md` (bản đồ đầy đủ) → `QA_LOG.md` (vì sao quyết vậy).

---

## 14. Skill bên thứ ba (medsci-skills) — quy tắc tích hợp

> Thêm 2026-09-21 (chore/skills-upgrade). Áp dụng cho mọi skill trong medsci-skills đã cài vào .claude/skills/ và .agents/skills/.

**(1) Thứ tự ưu tiên: AGENTS.md > SKILL.md**
Khi có xung đột giữa hướng dẫn trong AGENTS.md và SKILL.md của skill bên thứ ba → AGENTS.md thắng tuyệt đối. Skill là công cụ; chính sách nghiên cứu do AGENTS.md định.

**(2) Output QC ghi vào  2_Implementation/<Paper_XX>/qc/**
Thư mục  2_Implementation/<Paper_XX>/qc/ được phép tạo. Mọi file QA/audit do skill sinh (design_audit.md, rob_audit.json, checklist output...) ghi vào đây — không ghi vào searched_papers/ hay chosed_papers/. Xem mẫu:  2_Implementation/Paper_01_NHANES_NoLab/qc/.

**(3) Verdict/gate của skill chỉ là GỢI Ý — quyết định cuối là của user**
Skill peer-review, self-review, design-study, adiomics-ml có thể trả về verdict (MAJOR/MINOR/reject/keep...). Đây chỉ là input để user xem xét. Quyết định promote/reject paper, dừng/tiếp tục thí nghiệm vẫn là của user — không phải của agent hay skill.

**(4) Số liệu do skill sinh phải có provenance hoặc ghi UNKNOWN**
Mọi metric, thống kê, kết quả mà skill tự tính (design-study, radiomics-ml, analyze-stats) phải kèm provenance (file input, hàm/script cụ thể, random seed nếu có). Thiếu provenance → ghi UNKNOWN. Không bịa số. Đây là nguyên tắc chung của AGENTS.md §8 áp thêm cho output skill.

**(5) Skill KHÔNG được ghi vào chosed_papers/**
Skill bên thứ ba không có quyền move, copy hay tạo file trong chosed_papers/. Chỉ user mới promote. (Kế thừa AGENTS.md §4.)

**(6) Danh sách skill đã cài và trạng thái: xem .claude/skills/SKILLS_LOCK.md**
