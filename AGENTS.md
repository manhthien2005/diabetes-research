# AGENTS.md — Quy ước cho mọi AI agent làm việc trong repositoryr
r
> Mọi agent (Claude, Codex, Cursor...) PHẢI đọc file này trước khi thao tác.r
> Khi xung đột: AGENTS.md > skill default > prompt cụ thể của user.r
r
---r
r
## 1. Bối cảnh nghiên cứur
r
- **Chủ đề (DUY NHẤT)**: **Dự đoán / phân tầng đái tháo đường (diabetes prediction & staging)**r
  trên dữ liệu tabular/EHR. Hai **dạng nhãn** TRONG scope (trục `label_type`, §5):r
  - **Binary (chính)** — có / không ĐTĐ. Vẫn là trục chủ đạo của kho.r
  - **Multi-class ordinal glycemic staging (mở rộng — thêm 2026-07-06, Q006)** — Bình thường →r
    Tiền ĐTĐ (prediabetes) → ĐTĐ, theo ngưỡng ADA (HbA1c/FPG/OGTT). CHỈ nhận khi làmr
    **leakage-safe**: KHÔNG dùng trực tiếp chính biomarker định-nghĩa-nhãn (HbA1c/FPG/OGTT) làmr
    feature, HOẶC phải khung lại thành **dự báo giai đoạn tương lai (progression)**.r
  MỌI search, phân tích, so sánh PHẢI phục vụ đúng chủ đề này; KHÔNG nhận paper ngoài topic.r
- **NGOÀI scope staging — TỪ CHỐI**: (a) **T1D immune staging** Stage 1/2/3 (Insel 2015) — làr
  Type 1, dựa autoantibody/OGTT dài/omics/longitudinal, KHÔNG phải tabular/EHR T2D thường quy;r
  (b) **phân độ biến chứng bằng ảnh/tín hiệu** (retinopathy, neuropathy) — đã loại ở mục image-based.r
- **3 dạng prediction trong scope** (trục thời gian — chi tiết §3b `prediction_horizon`):r
  - **Cross-sectional** — dự đoán "bình thường" từ feature đo cùng thời điểm (PIMA,r
    BRFSS…). Bao gồm cả các paper khung "chẩn đoán" cổ điển kiểu PIMA.r
  - **Early detection** — phát hiện sớm ở giai đoạn tiền/cận lâm sàng, người chưa đượcr
    chẩn đoán (early detection of T2D, opportunistic screening).r
  - **Long-term risk** — dự đoán nguy cơ mắc sau N năm; cần dữ liệu longitudinal/cohort.r
- **Hướng kỹ thuật**: ML & DL trên dữ liệu **tabular + EHR**.r
- **2 trục phân loại (VUÔNG GÓC nhau)**: **Layer 1-4** = đóng góp kỹ thuật (§3);r
  **`prediction_horizon`** = dạng bài toán dự đoán (§3b). Mỗi paper mang ĐỦ CẢ HAI.r
- **Ngoài scope — TỪ CHỐI**: retinopathy, CGM time-series, image-based, và mọi bàir
  KHÔNG phải diabetes prediction (chỉ điều trị, chỉ dịch tễ mô tả, genomics không cór
  mô hình dự đoán…). Gặp loại này → từ chối, gợi ý quay về diabetes prediction tabular/EHR.r
- **Ngôn ngữ output cho user**: Tiếng Việt (giữ thuật ngữ EN trong ngoặc khi cần).r
r
---r
r
## 2. Cấu trúc thư mục (BẮT BUỘC tuân thủ)r
r
```r
<repository-root>/r
├── AGENTS.md                               ← Cẩm nang quy ước cho mọi AI agent (file này)r
├── README.md                               ← Giới thiệu & hướng dẫn dự ánr
│r
├── .agents/                                ← Antigravity skills & automation toolsr
│   └── skills/                             ← paper-analyzer, paper-comparator, paper-finder, pdf-extract, pdf-fetch...r
│r
├── .claude/                                ← Claude Code skills & templatesr
│   ├── skills/                             ← Skills tương ứng cho Claude Coder
│   ├── templates/r
│   │   └── analysis-template.html          ← Template HTML chuẩn cho mọi analysis.html (xem §6)r
│   └── settings.local.jsonr
│r
├── 01_Diabetes_Research/                   ← [Kho bài báo & tài liệu nghiên cứu]r
│   ├── searched_papers/                    ← TẤT CẢ paper agent tìm được (phân theo 4 Layer)r
│   │   ├── Layer_1_Pipeline_Nen_Tang/r
│   │   │   └── <paper_id>/r
│   │   │       ├── source.pdf              ← File gốc PDFr
│   │   │       ├── metadata.json           ← Thông tin chuẩn (xem §5)r
│   │   │       ├── extracted.md            ← Text trích xuất từ PDF (pdf-extract sinh)r
│   │   │       ├── analysis.html           ← Phân tích tiếng Việt 8 khối (paper-analyzer sinh)r
│   │   │       ├── comparison.md           ← So sánh trong layer (paper-comparator sinh)r
│   │   │       ├── notes.md                ← Ghi chú của user (web tab "Ghi chú" — đọc/sửa được)r
│   │   │       └── highlights.json         ← Vùng tô PDF của user (web overlay, KHÔNG sửa source.pdf)r
│   │   ├── Layer_2_Model_Hieu_Qua/r
│   │   ├── Layer_3_Dataset_EHR/r
│   │   └── Layer_4_XAI_Trien_Khai/r
│   ├── chosed_papers/                      ← Các paper user THỰC SỰ chọn (chỉ PDF)r
│   │   ├── Layer_1_Pipeline_Nen_Tang/r
│   │   ├── Layer_2_Model_Hieu_Qua/r
│   │   ├── Layer_3_Dataset_EHR/r
│   │   └── Layer_4_XAI_Trien_Khai/r
│   ├── docs/                               ← Toàn bộ tài liệu phân tích, cheatsheet & bản đồr
│   │   ├── RESEARCH_BRIEF.md               ← Bản tóm tắt tri thức tổng hợp từ các bài báor
│   │   ├── RESEARCH_LOOP.html              ← Sơ đồ trực quan quy trình nghiên cứu ExploreXr
│   │   ├── READING_LIST.md                 ← Danh sách bài báo ưu tiên đọc theo mục tiêur
│   │   ├── CHEATSHEET.md                   ← Sổ tay tra cứu phương pháp ML & tiền xử lýr
│   │   ├── LEAKAGE_MAP.md                  ← Bản đồ phân loại vi phạm rò rỉ dữ liệur
│   │   ├── DECISION_BOARD.md               ← Bảng theo dõi quyết định nhận/loại paperr
│   │   └── QA_LOG.md                       ← Nhật ký định hướng chiến lược & phương phápr
│   ├── search_pool.json                    ← Hàng đợi kết quả tìm kiếm ExploreXr
│   ├── rejected.json                       ← Danh sách bài bị loại kèm lý do chi tiết (§11)r
│   └── qa_log.json                         ← Trạng thái kiểm thử chất lượng trích xuấtr
│r
├── 02_Implementation/                      ← [Mô-đun thực nghiệm & code thật]r
│   └── Paper_01_NHANES_NoLab/              ← [Bài báo 1] Sàng lọc ĐTĐ no-lab trên NHANESr
│       ├── START_HERE.md                   ← Hướng dẫn nhanh cho tác giảr
│       ├── TO_DO.md                        ← Lộ trình chi tiết từng tuần & nhiệm vụr
│       ├── PROGRESS.json                   ← Bảng theo dõi tiến độ thời gian thực (§13)r
│       ├── src/                            ← Mã nguồn pipeline Pythonr
│       └── qc/                             ← Output QC / audit từ skills bên thứ bar
│r
├── 03_Final_Result/                        ← [Kết quả đầu ra cuối cùng]r
│   └── README.md                           ← Nơi lưu bài báo hoàn chỉnh, figures chuẩn nộpr
│r
└── web/                                    ← Research Hub (Next.js local) — GUI đọc/ghi kho paperr
    │                                         KHÔNG phải nguồn chân lý; chỉ là giao diện trên filesystem.r
    ├── src/                                ← Mã nguồn frontend & API routes (Next.js)r
    └── data/hub.db                         ← SQLite: highlights, ghi chú cá nhân, triage poolr
```r
r
> **`notes.md` / `highlights.json`** do Research Hub (web/ExploreX) sinh ra từ thao tácr
> của user. Agent ĐƯỢC đọc để hiểu user quan tâm gì, nhưng KHÔNG tự ghi đè —r
> đây là dữ liệu thủ công của user. `highlights.json` là overlay toạ độ chuẩnr
> hoá (0..1) theo trang, không nằm trong PDF gốc.r
---r
r
## 3. Định nghĩa 4 Layer (NỀN TẢNG để gán paper)r
r
| Layer | Tên | Trọng tâm |r
|------|-----|-----------|r
| **1** | Pipeline_Nen_Tang | Tiền xử lý, handling missing, outlier, **oversampling/SMOTE**, feature selection (Boruta/PCA), baseline ML (RF, LGBM, GB) |r
| **2** | Model_Hieu_Qua    | So sánh model, **ensemble/stacking/boosting**, deep tabular, tối ưu hyperparam, kỹ thuật tăng accuracy |r
| **3** | Dataset_EHR       | Làm việc với **EHR thật** (NHANES, MIMIC, eICU), opportunistic screening, cohort thực tế, longitudinal data |r
| **4** | XAI_Trien_Khai    | **Explainability** (SHAP, LIME), interpretability, deployment, clinical impact, trust |r
r
**Quy tắc gán Layer**: 1 paper = 1 Layer chính. Nếu phân vân giữa nhiều Layer → chọn Layer ứng với **đóng góp lớn nhất** của paper, không phải topic phụ.r
r
---r
r
## 3b. Trục thứ hai: `prediction_horizon` (BẮT BUỘC — vuông góc với Layer)r
r
Layer cho biết paper **xây thế nào**; `prediction_horizon` cho biết paper **dự đoán cái gì**.r
Mỗi paper PHẢI mang đúng **1 horizon**, gán ĐỘC LẬP với Layer (một Layer-2 ensemble có thểr
là `cross_sectional`, `early_detection`, hay `long_term_risk`).r
r
| Horizon | Định nghĩa | Dấu hiệu nhận biết | VD trong kho |r
|---------|-----------|--------------------|--------------|r
| `cross_sectional` | Dự đoán trạng thái ĐTĐ **hiện tại** từ feature đo cùng thời điểm (không có khoảng cách thời gian feature → label) | Dataset cross-sectional (PIMA, BRFSS, Sylhet, Frankfurt); không follow-up; khung "diagnosis/classification" cổ điển | gr2024, hasan2020, khanam2021, naz2020 |r
| `early_detection` | **Phát hiện sớm**: đối tượng chưa được chẩn đoán / giai đoạn tiền-cận lâm sàng; sàng lọc cơ hội | Từ khoá "early detection", "screening", "undiagnosed", "prediabetes", "opportunistic" | lai2019, nipa2023, dinh2019 |r
| `long_term_risk` | Dự đoán **onset sau N năm** từ baseline; cần theo dõi dọc | Cohort longitudinal, follow-up N năm, "incident diabetes", "risk over X years" | rasmy2021, fazakis2021, deberneh2021, li2020, lugner2024 |r
r
**Quy tắc gán horizon**: theo **khung bài toán paper TỰ ĐẶT RA**, không suy từ dataset đơn thuầnr
(cùng NHANES có thể dùng cho cả 3 horizon tuỳ cách lập label). Phân vân → đặtr
`horizon_uncertain: true`, mặc định `cross_sectional`, để user quyết.r
r
> **Lưu ý cân bằng kho**: kho vẫn nghiêng về `cross_sectional`. `long_term_risk` đã có vài bàir
> (rasmy2021, fazakis2021, deberneh2021, li2020, lugner2024) nhưng còn mỏng; `early_detection`r
> cũng cần thêm. Khi finder đề xuất bài mới, ưu tiên lấp 2 horizon này.r
r
---r
r
## 4. Quan hệ giữa `01_Diabetes_Research/chosed_papers/` và `01_Diabetes_Research/searched_papers/`r
r
- `01_Diabetes_Research/searched_papers/` là **superset** của `01_Diabetes_Research/chosed_papers/`. Mọi paper agent tìm được đều vào đây trước.r
- `01_Diabetes_Research/chosed_papers/` chỉ chứa các PDF mà **user đã duyệt** sau khi đọc analysis.r
- Agent **KHÔNG** được tự ý move/copy paper sang `01_Diabetes_Research/chosed_papers/`. Chỉ user mới có quyền promote.r
- Khi user yêu cầu "nâng cấp / mở rộng / so sánh / cải tiến" — agent PHẢI dùng `01_Diabetes_Research/chosed_papers/` làm baseline, không phải `01_Diabetes_Research/searched_papers/`.r
r
---r
r
## 5. Schema `metadata.json` (cho mọi paper trong `01_Diabetes_Research/searched_papers/`)r
r
> Có **2 nguồn ghi** file này: (a) **webapp** (ExploreX) khi user lưu/queue/promote; (b) **agent**r
> (Claude) khi tìm/phân tích/tải PDF. Cả hai dùng read-modify-write **giữ nguyên field của nhau** →r
> thêm field mới luôn an toàn. Field webapp **đọc** (đánh dấu 🔗) thì **TUYỆT ĐỐI không đổi tên**.r
r
Ví dụ các field thường gặp (không phải tất cả đều bắt buộc — bài cũ/seed có thể thiếu vài field):r
```jsonr
{r
  "paper_id": "nnamoko2020_outliers_imbalance",r
  "title": "<full title>",r
  "authors": ["..."],r
  "year": 2020,r
  "venue": "<journal/conference>",r
  "doi": "<doi or null>", "arxiv": null, "pubmed": null, "pmc": null,r
  "citations": 154,r
  "citations_secondary": null,r
  "citations_checked_at": "2026-06-20T00:00:00+07:00",r
  "citations_source": "openalex",r
  "layer": 1,r
  "layer_uncertain": false,r
  "prediction_horizon": "cross_sectional",r
  "horizon_uncertain": false,r
  "label_type": "binary",r
  "datasets_mentioned": ["pima", "..."],r
  "dataset_slugs": ["pima-indians-diabetes", "..."],r
  "method_slugs": ["iqr-outlier-detection", "smote", "c4.5"],r
  "code_url": null,r
  "reproducibility": 2,r
  "source_pdf": "source.pdf",r
  "page_count": 12,r
  "open_access_pdf": "<link OA or null>",r
  "license": null,r
  "pdf_status": "downloaded",r
  "pdf_fetch_attempts": "<log tự do — route đã thử>",r
  "download_link": null,r
  "is_seed": false,r
  "lookup_status": "ok",r
  "status": "analyzed",r
  "analysis_status": "analyzed",r
  "reject_reason": null,r
  "scope_note": "<reviewer: vì sao đáng giá / hạn chế>",r
  "corrections": "<sửa gì sau khi đọc full text>"r
}r
```r
r
### Bảng field (🔗 = webapp ĐỌC → không đổi tên)r
r
| Nhóm | Field | Ý nghĩa |r
|------|-------|---------|r
| Định danh | `paper_id` 🔗 · `title` 🔗 · `authors` · `year` · `venue` · `doi` · `arxiv` · `pubmed` · `pmc` | nhận dạng bài |r
| Trích dẫn | `citations` 🔗 (chính, OpenAlex — webapp **sort theo field này**) · `citations_secondary` (S2) · `citations_checked_at` (ISO-8601 có offset) · `citations_source` | số cite |r
| Phân loại | `layer` (1–4) · `layer_uncertain` · `prediction_horizon` (§3b) · `horizon_uncertain` · `label_type` (§1) | 2 trục §3/§3b + dạng nhãn §1 |r
| Dữ liệu/PP | `datasets_mentioned` 🔗 (tên thô) · `dataset_slugs` 🔗 (kebab) · `method_slugs` (kebab) | dataset + method |r
| Code | `code_url` 🔗 | repo public, hoặc `null` = KHÔNG có code. **Đây là nguồn-chân-lý** — KHÔNG dùng `code_available` |r
| PDF/nguồn | `source_pdf` 🔗 (tên file PDF; gate xem PDF + promote) · `page_count` 🔗 · `open_access_pdf`/`pdf_url` · `license` · `pdf_status` (enum) · `pdf_fetch_attempts` (log) · `download_link` (link tải tay bài closed) | quản lý PDF |r
| Vòng đời | `status` 🔗 (enum) · `analysis_status` 🔗 (enum) · `analysis_status_at` · `reject_reason` · `chosen_at` | xem mục dưới |r
| Provenance | `is_seed` · `lookup_status` · `found_by` · `abstract` · `url` | nguồn gốc (webapp save) |r
| Reviewer (agent) | `scope_note` (vì sao đáng giá/hạn chế) · `corrections` (sửa gì sau khi đọc full) | enrichment — NÊN ghi |r
| Vai trò đề tài | `role` 🔗 · `role_note` 🔗 · `role_at` | **thêm 2026-07-26 (Q008)** — bài này dùng vào việc gì trong đề tài ĐÃ CHỐT. Xem enum dưới |r
| Kiểm §7 | `s7_recheck` | snapshot `{at, publication_date, age_years, citations, threshold, pass, note}` — §7 là cổng NHẬN VÀO, KHÔNG loại bài chỉ vì nó già qua mốc |r
| Tái lập | `reproducibility` (int) | **LEGACY** — thang KHÔNG nhất quán, webapp không đọc. Field thật = `summary.json.reproducible` (high/med/low). Backfill mới theo thang **1=low / 2=medium / 3=high** |r
r
### Enum (giá trị cố định)r
- `status`: `searched` → `analyzed` → `chosen` \| `rejected`. (Bỏ `compared` — không dùng.)r
- `analysis_status`: `none` \| `queued` \| `analyzed`. **KHÔNG dùng `pending`** (webapp không hiểu). Bài closed chưa có PDF: để `analysis_status:"none"`, trạng thái chờ-PDF nằm ở `pdf_status`.r
- `pdf_status`: `ok` \| `downloaded` \| `pending_closed_access` \| `blocked_closed_access` (chi tiết route ghi ở `pdf_fetch_attempts` — xem skill `pdf-fetch`).r
- `prediction_horizon`: `cross_sectional` \| `early_detection` \| `long_term_risk` (§3b). KHÔNG tự chế giá trị khác.r
- `label_type`: `binary` \| `multiclass_staging` (§1). Mặc định `binary` (bài cũ thiếu field → coi là `binary`). `multiclass_staging` chỉ dùng cho glycemic staging leakage-safe/progression theo §1.r
- `layer`: `1` \| `2` \| `3` \| `4` (số nguyên).r
- `role` (thêm 2026-07-26, Q008): `design` \| `method` \| `positioning` \| `inflation` \| `later` \| `related`r
  — khớp 1-1 với 6 nhóm đọc 🅐–🅕 của `TO_DO.md` §6. **Trục này VUÔNG GÓC với `verdict`**:r
  `verdict` = chất lượng/độ tin cậy của bài; `role` = bài này dùng vào việc gì trong bài báo.r
  Webapp hiện `role` thành cột "Vai trò" + chip lọc + sort "Thứ tự đọc" ở trang Thư viện.r
  Paper mới PHẢI được gán `role` khi phân tích; phân vân → `related` (mặc định an toàn).r
r
### `status` vs `analysis_status` (2 trục — đừng nhầm)r
- `status` = **vòng đời paper**. LƯU Ý: webapp suy ra "đã chọn" từ **sự hiện diện folder trong `01_Diabetes_Research/chosed_papers/`**, KHÔNG từ field `status` → `status:"chosen"` chỉ là ghi chú phụ.r
- `analysis_status` = **trạng thái hàng đợi phân tích**. webapp tự coi là `analyzed` nếu có `analysis.html`.r
r
### Quy tắc đặt tên & field deprecatedr
- `paper_id`: `<lastname><year>_<3-word-slug>`, snake_case, không dấu. VD: `kumar2023_ensemble_xai`.r
- `dataset_slug` / `method_slug`: kebab-case. VD: `pima-indians-diabetes`, `random-oversampling`, `shap`.r
- **KHÔNG ghi mới** các field deprecated: `code_available` (→ `code_url`), `open_access_pdf_status` (→ `pdf_status`), `citations_alt` (→ `citations_secondary`), `analysis_status:"pending"` (→ `none`).r
r
---r
r
## 6. Template `analysis.html` (CHỐT — dùng cho MỌI paper)r
r
File template: `.claude/templates/analysis-template.html`.r
File mẫu đã render (xem trước layout): `01_Diabetes_Research/searched_papers/Layer_1_Pipeline_Nen_Tang/gr2024_random_oversampling_diabetes/analysis.html`.r
r
Mọi `analysis.html` agent sinh ra PHẢI có đúng **8 khối** sau, theo đúng thứ tự (để so sánh chéo giữa các paper được nhanh, mở 5 tab cạnh nhau scroll cùng vị trí):r
r
| # | Khối | Nội dung BẮT BUỘC |r
|---|------|-------------------|r
| 1 | **Header** (gradient xanh) | title · year · venue · `📚 N citations (MM/YYYY)` · DOI link · badge `💻 Code: Có/Không` (xanh/đỏ) · badge `📊 Dataset: Có/Không` (xanh/đỏ) · badge `⏱️ Horizon: Cross-sectional/Early/Long-term` (tím — value lấy từ `prediction_horizon`) · danh sách dataset có link embed nếu có |r
| 2 | **Compare Card** (gradient tím) | 4 field CỐ ĐỊNH: 🎯 Đóng góp chính · 🏆 Best metric (số + dataset) · 🔧 Method chính · 🔄 So với baseline / paper khác cùng Layer |r
| 3 | Section: 📋 Tổng quan & vì sao Layer N | 1 đoạn lead + bảng `lý do | giải thích` |r
| 4 | Section: 🔧 Công nghệ & mô hình | Bảng `kỹ thuật | vai trò | mạnh | yếu`, đánh ⭐ cho model thắng |r
| 5 | Section: 🗄️ Dataset | Bảng `tên | mẫu | feature | mô tả | link` |r
| 6 | Section: ⚙️ Cách triển khai | Bảng pipeline + công thức (formula block đen) + hình crop từ PDF (embed base64) |r
| 7 | Section: 🏆 Kết quả | Metric grid (cards lớn) + bảng chi tiết `dataset | model | setting | metric | nguồn` |r
| 8 | Section: ⚠️ Lưu ý quan trọng | 3 callout vàng: ⚠️ Rủi ro · 🎯 Giới hạn · 💡 Vai trò trong đề tài |r
r
### Ràng buộc khi renderr
- **KHÔNG bịa số liệu**: paper không nêu → ghi `UNKNOWN` (Compare Card vẫn phải có 4 field, value = `UNKNOWN` nếu thiếu).r
- **KHÔNG đổi số khối, đổi thứ tự, đổi tên field trong Compare Card** — phá rule này = phá so sánh chéo.r
- **Self-contained**: inline CSS + inline SVG, KHÔNG CDN, KHÔNG external image (hình từ PDF phải embed base64).r
- **Ngôn ngữ**: tiếng Việt, giữ EN trong ngoặc khi cần (vd: "tăng cường mẫu thiểu số (SMOTE)").r
- **Nguồn số liệu**: mọi metric trong section 7 PHẢI ghi rõ `Table X` / `Fig Y` / `Section Z` của PDF.r
- **Khi paper hoàn toàn không có số kết quả**: section 7 render dòng muted "Paper không công bố số liệu cụ thể — chỉ mô tả định tính. Không bịa số." thay vì metric grid.r
r
---r
r
## 7. Ràng buộc cứng cho paper được "found"r
r
Trước khi tạo folder trong `01_Diabetes_Research/searched_papers/`, paper PHẢI thỏa cả 3 tiêu chí dưới (nếu fail bất kỳ → reject, báo user lý do):r
r
1. **Highly cited** (lấy số từ Semantic Scholar, KHÔNG đoán):r
   - ≥ 100 citations nếu xuất bản > 3 năm.r
   - ≥ 30 citations nếu 1–3 năm.r
   - "Rising star" (≥ 5 citations/tháng) nếu < 1 năm.r
2. **Dataset public**: có link tải hoặc procedure xin access rõ (PhysioNet DUA OK).r
3. **Code/Method reproducible**: repo GitHub public + README, HOẶC method mô tả đủ chi tiết trong paper để tái lập.r
r
Nếu không thỏa → KHÔNG tạo folder, báo user lý do reject.r
r
---r
r
## 8. Quy tắc làm việc chungr
r
- **Không drift sang topic ngoài scope** (xem §1). Bài/topic KHÔNG phải diabetes prediction → từ chối/reject (ghi `01_Diabetes_Research/rejected.json` nếu đã có folder). retinopathy / CGM / image → từ chối, gợi ý quay về diabetes prediction tabular/EHR.r
- **Không tự đoán số liệu** (citations, accuracy, year). Ghi `UNKNOWN` nếu không verify được.r
- **Tra citation OpenAlex phải dùng `/works?filter=doi:<doi>` và kiểm `meta.count == 1`** — endpointr
  `/works/doi:<doi>` có thể khớp nhầm **bản ghi TRÙNG**. Đã dính thật: `yu2010` bị trả 0 citationsr
  (bản ghi 2008) trong khi bản đúng có 524 (Q008, 26/07/2026). Số citation trong `analysis.html`r
  ghi rõ nguồn khác (Scopus/S2) thì KHÔNG ghi đè bằng số OpenAlex — bổ sung bên cạnh.r
- **Không ghi đè analysis.html / overview.md / etc.** đã có. Tạo `analysis.v2.html` và update metadata `status`.r
- **Hoạt động đúng phạm vi các thư mục chuẩn**: Agent chỉ làm việc bên trong các khu vực được định nghĩa trong cấu trúc repository (`.agents/`, `.claude/`, `01_Diabetes_Research/`, `02_Implementation/`, `03_Final_Result/`, `web/`), KHÔNG tự ý tạo thêm thư mục gốc mới nếu chưa có sự đồng ý của user.r
- **Mọi tham chiếu paper** trong chat: dùng `paper_id` chứ không phải title dài.r
r
---r
r
## 9. Khi user yêu cầu "nâng cấp" / "mở rộng" / "cải tiến"r
r
Agent PHẢI:r
1. Đọc TẤT CẢ paper trong `01_Diabetes_Research/chosed_papers/Layer_<n>/` của layer liên quan trước.r
2. Đọc `analysis.html` / `overview.md` của các paper đó trong `01_Diabetes_Research/searched_papers/`.r
3. Dùng chính những paper này làm **nền tảng**, đề xuất cải tiến SO VỚI những gì paper chọn đã làm.r
4. Không đưa đề xuất chung chung "có thể dùng SHAP" mà phải nói rõ "paper X đã dùng SHAP cho Layer 4, đề xuất mở rộng bằng …".r
r
---r
r
## 10. Khi xung đột / không chắcr
r
- Dừng lại, hỏi user. Không tự ý phá rule §1-§7.r
- Nếu thấy file/folder lạ ngoài cấu trúc §2 → hỏi user trước khi xóa hoặc move.r
r
---r
r
## 11. Workflow phân tích & chọn lọc (ExploreX webapp + Claude)r
r
ExploreX (webapp) chỉ **tìm + gom + lọc thô**. Việc **đọc, phán xét, chọn lọc**r
là của Claude (agent). Webapp KHÔNG tự gọi AI.r
r
### Khi user nói "phân tích hàng đợi" / "duyệt hàng đợi"r
1. Quét `01_Diabetes_Research/searched_papers/Layer_*/*/metadata.json`, lấy paper cór
   `"analysis_status": "queued"` (đây là hàng đợi user đánh dấu trên web).r
2. Với mỗi paper trong hàng đợi:r
   - Đọc `metadata.json` + `extracted.md` (nếu chưa có, chạy `pdf-extract`) +r
     `source.pdf` khi cần.r
   - **Phán xét theo §7** (highly-cited, dataset public, code/method tái lập được)r
     VÀ đúng scope §1 (tabular/EHR diabetes).r
   - **Nếu ĐẠT** → viết `analysis.html` 8 khối theo §6, setr
     `analysis_status: "analyzed"`, `status: "analyzed"`.r
   - **Nếu KHÔNG đạt** → thêm vào `01_Diabetes_Research/rejected.json` (xem dưới) kèm **lý do cụ thể**,r
     `by: "claude"`. Được tự reject, không cần hỏi (user đã uỷ quyền).r
3. Báo user tóm tắt: bài nào analyzed, bài nào rejected + lý do.r
r
### File `rejected.json` (ở `01_Diabetes_Research/rejected.json`)r
Danh sách paper đã loại để **search KHÔNG gợi lại**. Schema mỗi entry:r
```jsonr
{r
  "dedup_key": "doi:10.x/yyy",          // doi:<doi> | arxiv:<id> | title:<norm>r
  "paper_id": null,r
  "title": "...",r
  "title_norm": "...",                  // title lowercase, bỏ ký tự đặc biệtr
  "doi": "...", "arxiv": null,r
  "reason": "lý do loại — BẮT BUỘC, cụ thể",r
  "by": "claude",                       // "claude" | "user"r
  "layer": 2,r
  "rejected_at": "ISO-8601"r
}r
```r
- `dedup_key` tính giống §5 logic: ưu tiên `doi:` → `arxiv:` → `title:<title_norm>`.r
- Khi reject 1 paper đã có folder trong `01_Diabetes_Research/searched_papers/`: thêm vào `01_Diabetes_Research/rejected.json`r
  VÀ set metadata `status: "rejected"` + `reject_reason`. KHÔNG xoá folder (user xoá).r
- Append/upsert theo `dedup_key`, giữ nguyên các entry cũ. KHÔNG ghi đè cả file mất dữ liệu.r
r
### Quan hệ với rule cũr
- §7 vẫn là tiêu chí gốc để nhận/loại. §11 chỉ thêm: nơi ghi lý do loạir
  (`01_Diabetes_Research/rejected.json`) + cơ chế hàng đợi (`analysis_status`).r
- `analysis_status` (none/queued/analyzed) khác với `status` (searched/analyzed/r
  chosen/rejected) ở §5 — cái trước cho hàng đợi web, cái sau cho vòng đời paper.r
r
### Artefact mới của vòng lặp (ExploreX)r
- **`extracted.md`**: bản trích PDF **trung thực, đầy đủ, giữ cấu trúc** (bảng→markdown,r
  đa cột đúng thứ tự đọc, OCR trang scan) do skill `pdf-extract` (engine **docling** +r
  fallback pymupdf4llm) sinh. ExploreX có thể tự trích text-only khi paper vào queuer
  NHƯNG bản đó THÔ (mất bảng, trộn cột, dính watermark) → **trước khi analyze, đảm bảor
  `extracted.md` đã qua `pdf-extract`**. Mỗi file có header `<!-- ... | score=N -->` +r
  `extraction_report.json` (QA có cơ sở: coverage bảng vs caption gốc, tail-check chốngr
  cụt; **score <85 = cần xem lại**). Bản thô cũ được lưu `extracted.prev.md`.r
  Re-trích 1 bài: `python .claude/skills/pdf-extract/extract.py 01_Diabetes_Research/searched_papers/Layer_X/<paper_id> --force`;r
  toàn bộ: `python .claude/skills/pdf-extract/run_all.py [--root 01_Diabetes_Research/searched_papers] [--min-skip 95]`;r
  chỉ chấm lại QA (đổi công thức điểm, không trích lại): `recompute_qa.py`.r
  (Coverage bỏ "Supplementary Table N"; tail-check bỏ qua khi OCR — tránh phạt oan.)r
- **`summary.json`** (trong folder paper): em ghi khi phân tích (schema ở skillr
  `paper-analyzer`). Là nguồn cho research brief — PHẢI ghi mỗi lần analyze.r
- **`RESEARCH_BRIEF.md`** (`01_Diabetes_Research/docs/RESEARCH_BRIEF.md`): bản tóm tắt trạng thái nghiên cứu, sinh từ webr
  (nút "Sinh Research Brief") hoặc bất cứ lúc nào. **ĐỌC FILE NÀY ĐẦU MỖI PHIÊN**r
  để định hướng nhanh thay vì đọc lại tất cả analysis.html.r
- **`rejected.json`** (`01_Diabetes_Research/rejected.json`): xem §11.r
- **Snowballing**: ExploreX có thể duyệt references (backward) + citations (forward)r
  của bài đã chọn qua OpenAlex → pool ứng viên trúng đích cho em triage.r
- **`search_pool.json`** (`01_Diabetes_Research/search_pool.json`): ExploreX ghi đè sau MỖI lần search — pool kết quảr
  gần nhất (đã dedup, đã bỏ rejected + đã có trong thư viện), kèm title/abstract/r
  citations/dedup_key. Khi user nói "triage" / "sàng lọc pool": đọc file này,r
  phán giữ/loại từng bài theo §7 + scope §1. Bài loại → ghi vào `01_Diabetes_Research/rejected.json`r
  (đã uỷ quyền); bài đáng giữ → đề xuất user lưu vào Layer trên web.r
  Đồng thời ghi verdict vào field `triage` của chính file này để web hiển thịr
  (panel "Pool & Triage" ở trang Tìm bài báo):r
  `triage[dedup_key] = { "verdict": "keep"|"reject", "reason": "...", "layer": 1-4? }`r
  — chỉ thêm/sửa field `triage`, KHÔNG đụng `papers`.r
- **`RESEARCH_LOOP.html`** (`01_Diabetes_Research/docs/RESEARCH_LOOP.html`): sơ đồ vòng lặp 8 bước + ai làm gì. Mở để nhớ luồng.r
r
### Vòng lặp chuẩn (xem 01_Diabetes_Research/docs/RESEARCH_LOOP.html)r
discover (web) → **triage (em)** → save (user/web) → queue+auto-extract (web) →r
**deep-analyze: analysis.html + summary.json (em)** → **decide: promote/reject (em+user)**r
→ brief (web) → **đọc brief định hướng (em)** → lặp lại.r
r
---r
r
## 12. Nhật ký Hỏi–Đáp định hướng — `QA_LOG.md` (huấn luyện agent)r
r
File **`QA_LOG.md`** (`01_Diabetes_Research/docs/QA_LOG.md`) + bản máy đọc **`qa_log.json`** (`01_Diabetes_Research/qa_log.json`) lưu các câu hỏi **chiến lược /r
định hướng / phương pháp luận** của user và câu trả lời đã chốt. Mục đích: agent các phiên SAUr
học **cách user nghĩ + nguyên tắc đã chốt**, không trả lời lại từ đầu. Khác `01_Diabetes_Research/docs/RESEARCH_BRIEF.md`r
(trạng thái paper) và `01_Diabetes_Research/docs/DECISION_BOARD.md` (gợi ý promote) — đây là *tư duy định hướng*.r
r
- **ĐỌC `01_Diabetes_Research/docs/QA_LOG.md` đầu mỗi phiên** (cùng `01_Diabetes_Research/docs/RESEARCH_BRIEF.md`) để nắm định hướng + ưu tiên của user.r
- Sau MỖI câu hỏi định hướng của user + câu trả lời đã chốt → **append 1 entry** vào CẢ HAI filer
  (`01_Diabetes_Research/docs/QA_LOG.md` thêm section + 1 dòng mục lục; `01_Diabetes_Research/qa_log.json` push vào `entries`). **Append-only**,r
  KHÔNG sửa entry cũ; quyết định bị đảo → entry mới ghi `supersedes: "Q###"`.r
- Mỗi entry BẮT BUỘC có **`Nguyên tắc rút ra` / `principle`** — 1–3 câu tái dùng được (phần giá trịr
  nhất để huấn luyện). Không chỉ là câu hỏi vặt kỹ thuật một lần; ưu tiên câu định hướng có giá trị lâu dài.r
r
---r
r
## 13. Trạng thái thi công — `PROGRESS.json` (thêm 2026-07-26, Q007)r
r
Sau khi đề tài được chốt (Q007), dự án chuyển từ giai đoạn *gom paper* sang giai đoạn *thi công*.r
File **`PROGRESS.json`** (`02_Implementation/Paper_01_NHANES_NoLab/PROGRESS.json`) là **nguồn chân lý về "đang ở đâu, làm gì tiếp"**.r
r
- **ĐỌC đầu mỗi phiên**, cùng `02_Implementation/Paper_01_NHANES_NoLab/START_HERE.md` + `01_Diabetes_Research/docs/QA_LOG.md`. Đây là thứ trả lời câu hỏir
  user hay hỏi nhất: *"tuần này làm gì?"*r
- **Giao diện**: trang `/tien-do` của ExploreX (`web/src/app/tien-do/`). Webapp chỉ là GUI —r
  file trên đĩa mới là chân lý (§2). User tick/ghi chú trên web → ghi thẳng vào file này quar
  `PATCH /api/progress`.r
- **Khi user báo xong việc** → cập nhật `status` + `done_at` + `note` (kết quả/số liệu thật).r
  **Append-only về mặt task**: KHÔNG xoá task; việc bỏ thì để `status: "skipped"` + lý do trong `note`.r
- **Ghi phải read-modify-write** (giữ field lạ) + atomic, giống `metadata.json` (§5).r
- Trường `owner` phân công: `"anh"` = user tự làm (quyết định, đọc, viết, gặp bác sĩ);r
  `"claude"` = agent làm (code, trích xuất, dò bug, đóng vai reviewer).r
- Trường `done_when` là **Definition of Done** — dùng nó để CHẶN scope creep: đạt là dừng,r
  không làm thêm.r
- 3 tầng: **Tầng 0 = bắt buộc** (đủ để có bài báo) · Tầng 1–2 = nâng cấp tuỳ chọn.r
  Khi tư vấn, **mặc định chỉ nói về Tầng 0** trừ khi user hỏi xa hơn — user đã nêu rõr
  bị ngợp vì scope rộng.r
r
**Bộ file định hướng hiện tại (đọc theo thứ tự này):**r
`02_Implementation/Paper_01_NHANES_NoLab/START_HERE.md` (ngắn, chống ngợp) → `02_Implementation/Paper_01_NHANES_NoLab/PROGRESS.json` (làm gì tiếp) →r
`01_Diabetes_Research/docs/CHEATSHEET.md` (tra cứu thay cho đọc paper) → `02_Implementation/Paper_01_NHANES_NoLab/TO_DO.md` (bản đồ đầy đủ) → `01_Diabetes_Research/docs/QA_LOG.md` (vì sao quyết vậy).r

---
## 14. Skill bên thứ ba (medsci-skills) — quy tắc tích hợp

> Thêm 2026-09-21 (chore/skills-upgrade). Áp dụng cho mọi skill trong `medsci-skills` đã cài vào `.claude/skills/` và `.agents/skills/`.

**(1) Thứ tự ưu tiên: AGENTS.md > SKILL.md**
Khi có xung đột giữa hướng dẫn trong AGENTS.md và SKILL.md của skill bên thứ ba → AGENTS.md thắng tuyệt đối. Skill là công cụ; chính sách nghiên cứu do AGENTS.md định.

**(2) Output QC ghi vào `02_Implementation/<Paper_XX>/qc/`**
Thư mục `02_Implementation/<Paper_XX>/qc/` được phép tạo. Mọi file QA/audit do skill sinh (design_audit.md, rob_audit.json, checklist output...) ghi vào đây — không ghi vào `01_Diabetes_Research/searched_papers/` hay `01_Diabetes_Research/chosed_papers/`. Xem mẫu: `02_Implementation/Paper_01_NHANES_NoLab/qc/`.

**(3) Verdict/gate của skill chỉ là GỢI Ý — quyết định cuối là của user**
Skill `peer-review`, `self-review`, `design-study`, `radiomics-ml` có thể trả về verdict (MAJOR/MINOR/reject/keep...). Đây chỉ là input để user xem xét. Quyết định promote/reject paper, dừng/tiếp tục thí nghiệm vẫn là của user — không phải của agent hay skill.

**(4) Số liệu do skill sinh phải có provenance hoặc ghi UNKNOWN**
Mọi metric, thống kê, kết quả mà skill tự tính (design-study, radiomics-ml, analyze-stats) phải kèm provenance (file input, hàm/script cụ thể, random seed nếu có). Thiếu provenance → ghi `UNKNOWN`. Không bịa số. Đây là nguyên tắc chung của AGENTS.md §8 áp thêm cho output skill.

**(5) Skill KHÔNG được ghi vào `01_Diabetes_Research/chosed_papers/`**
Skill bên thứ ba không có quyền move, copy hay tạo file trong `01_Diabetes_Research/chosed_papers/`. Chỉ user mới promote. (Kế thừa AGENTS.md §4.)

**(6) Danh sách skill đã cài và khoá phiên bản (lock file)**
Nguồn chân lý xác thực về nguồn gốc, phiên bản và thay đổi cục bộ nằm tại `.agents/skills/SKILLS_LOCK.md`. File `.claude/skills/SKILLS_LOCK.md` chỉ là con trỏ tương thích (pointer).

**(7) Nguồn chân lý skill nghiên cứu và cơ chế đồng bộ (Skill Parity)**
- `.agents/skills` là nguồn chân lý duy nhất (canonical source) cho mọi research skill được quản lý.
- KHÔNG chỉnh sửa trực tiếp các thư mục research skills trong `.claude/skills` (đây là generated compatibility mirrors).
- Sau khi chỉnh sửa một canonical research skill trong `.agents/skills`, BẮT BUỘC chạy:
  `python scripts/skills/research_skill_mirror.py --sync`
- Trước khi commit, BẮT BUỘC kiểm tra tính toàn vẹn và đồng bộ:
  `python scripts/skills/research_skill_mirror.py --check`
- Các frontend/design skills chỉ có trong Claude (`banner-design`, `ui-ux-pro-max`, v.v.) không thuộc phạm vi quản lý của mirror research skills và được duy trì độc lập trong `.claude/skills`.
- `.agents/skills/SKILLS_LOCK.md` là file khoá phiên bản có thẩm quyền (authoritative research skill provenance lock file).
