# 🩺 NCKH — Diabetes Prediction & Staging Research Hub

> Kho nghiên cứu khoa học chuyên sâu về **Dự đoán & Phân tầng Đái tháo đường (Diabetes Prediction & Staging)** trên dữ liệu Tabular/EHR, tập trung vào mô hình biến không-xét-nghiệm (No-Lab) và kiểm soát rò rỉ dữ liệu (Data Leakage Safe).

---

## 1. Giới thiệu đề tài (What is this project?)

Dự án tập hợp toàn bộ vòng đời nghiên cứu khoa học từ tổng quan y văn (Literature Review), phân loại & đánh giá bài báo, đến thực nghiệm lập trình mô hình Machine Learning/Deep Learning và viết bài báo khoa học.

### 🎯 Mục tiêu & Luận điểm cốt lõi (Core Claim)
* **Chủ đề chính**: Sàng lọc đái tháo đường chưa được chẩn đoán (Undiagnosed Type 2 Diabetes) bằng các biến số không cần xét nghiệm xâm lấn (No-Lab variables: nhân trắc học, tiền sử, lối sống, triệu chứng) trên dữ liệu khảo sát sức khỏe quốc gia (NHANES).
* **Luận điểm nghiên cứu**: *"Phần lớn khoảng cách hiệu năng công bố giữa các mô hình ML phức tạp và các thang điểm nguy cơ lâm sàng truyền thống (như FINDRISC, ADA Risk Score) biến mất khi triệt tiêu hoàn toàn các lỗi rò rỉ dữ liệu (data leakage), đánh giá đúng tỷ lệ hiện mắc thực tế (prevalence) và kiểm định chéo ngoại quần thể."*
* **Phạm vi (Scope)**:
  * **Định dạng dữ liệu**: Tabular & Electronic Health Records (EHR). Không sử dụng ảnh soi đáy mắt (retinopathy) hay chuỗi thời gian CGM.
  * **3 Khoảng thời gian dự đoán (Prediction Horizon)**:
    1. `cross_sectional`: Dự đoán trạng thái hiện tại từ dữ liệu đo cùng thời điểm.
    2. `early_detection`: Phát hiện sớm ở giai đoạn tiền lâm sàng / sàng lọc cơ hội.
    3. `long_term_risk`: Dự đoán nguy cơ mắc bệnh sau $N$ năm theo dõi dọc.
  * **4 Tầng kỹ thuật (Layer)**:
    * **Layer 1 (Pipeline Nền Tảng)**: Tiền xử lý, missing data, mất cân bằng nhãn (SMOTE), chọn biến.
    * **Layer 2 (Model Hiệu Quả)**: Stacking, Ensemble, Deep Tabular, Gradient Boosting.
    * **Layer 3 (Dataset EHR)**: Khảo sát thực tế, dữ liệu EHR quy mô lớn (NHANES, MIMIC).
    * **Layer 4 (XAI & Triển Khai)**: Khả năng giải thích (SHAP, LIME), niềm tin lâm sàng.

---

## 2. Cấu trúc thư mục (Repository Layout)

```text
NCKH/
├── AGENTS.md                               ← Cẩm nang quy ước làm việc cho mọi AI Agent
├── README.md                               ← Tài liệu giới thiệu & hướng dẫn dự án (file này)
├── .env.example                            ← Mẫu cấu hình API keys nghiên cứu (copy thành .env)
├── .gitignore                              ← Cấu hình loại trừ cache, data nặng và secrets
├── .agents/                                ← Antigravity skills & automation tools
├── .claude/                                ← Templates & skills bổ trợ
│
├── 01_Diabetes_Research/                   ← [PHẦN 1] KHO BÀI BÁO & TÀI LIỆU NGHIÊN CỨU
│   ├── searched_papers/                    ← Kho 37+ bài báo khoa học phân theo 4 Layer
│   ├── chosed_papers/                      ← Các bài báo xuất sắc đã được duyệt (Promoted)
│   ├── docs/                               ← Toàn bộ tài liệu phân tích, cheatsheet & bản đồ
│   │   ├── RESEARCH_BRIEF.md               ← Bản tóm tắt tri thức tổng hợp từ các bài báo
│   │   ├── RESEARCH_LOOP.html              ← Sơ đồ trực quan quy trình nghiên cứu ExploreX
│   │   ├── READING_LIST.md                 ← Danh sách bài báo ưu tiên đọc theo mục tiêu
│   │   ├── CHEATSHEET.md                   ← Sổ tay tra cứu phương pháp ML & tiền xử lý
│   │   ├── LEAKAGE_MAP.md & .json          ← Bản đồ phân loại vi phạm rò rỉ dữ liệu (35 bài)
│   │   ├── DECISION_BOARD.md               ← Bảng theo dõi quyết định nhận/loại paper
│   │   ├── QA_LOG.md                       ← Nhật ký giải đáp và quyết định kỹ thuật
│   │   ├── PENDING_DOWNLOADS.md            ← Danh sách bài báo chờ bổ sung bản PDF toàn văn
│   │   └── API_KEYS_GUIDE.md               ← Hướng dẫn đăng ký API OpenAlex, PubMed, Semantic Scholar
│   ├── search_pool.json                    ← Dữ liệu hàng đợi tìm kiếm của ExploreX
│   ├── rejected.json                       ← Danh sách các bài bị loại kèm lý do chi tiết
│   └── qa_log.json                         ← Trạng thái kiểm thử chất lượng trích xuất
│
├── 02_Implementation/                      ← [PHẦN 2] CÁC MÔ-ĐUN THỰC NGHIỆM & CODE THẬT
│   └── Paper_01_NHANES_NoLab/              ← [BÀI BÁO 1] Sàng lọc ĐTĐ no-lab trên NHANES
│       ├── src/                            ← Mã nguồn Python pipeline
│       │   ├── build_nhanes.py             ← Tải dữ liệu XPT từ CDC, trích xuất biến & lọc mẫu
│       │   ├── scores.py                   ← Tính điểm nguy cơ lâm sàng chuẩn (FINDRISC, ADA)
│       │   ├── pipeline.py                 ← Huấn luyện ML với 7 cấu hình ablation rò rỉ
│       │   └── evaluate.py                 ← Đánh giá AUROC, AUPRC, Calibration, Net Benefit
│       ├── data/                           ← Thư mục lưu dữ liệu thực nghiệm (đã gitignored)
│       │   ├── raw/                        ← File gốc XPT từ CDC NHANES
│       │   └── .gitkeep                    ← Giữ khung thư mục dữ liệu trên Git
│       ├── results/                        ← Kết quả xuất ra (ROC/PR curves, calibration, picks)
│       ├── paper/                          ← Bản thảo bảng biểu và ánh xạ biến (table2, mapping)
│       ├── START_HERE.md                   ← Hướng dẫn nhanh cho tác giả khi bắt tay thực hiện
│       ├── TO_DO.md                        ← Lộ trình chi tiết từng tuần & từng nhiệm vụ
│       └── PROGRESS.json                   ← Bảng theo dõi trạng thái tiến độ thời gian thực
│   # (Có thể mở rộng thêm Paper_02_..., Paper_03_... độc lập)
│
├── 03_Final_Result/                        ← [PHẦN 3] KẾT QUẢ ĐẦU RA CUỐI CÙNG
│   └── README.md                           ← Nơi lưu bài báo hoàn chỉnh, figures chuẩn nộp, báo cáo
│
└── web/                                    ← [SOURCE WEB DÙNG CHUNG] EXPLOREX RESEARCH HUB
    ├── src/                                ← Frontend & API routes (Next.js 15, React 19)
    │   ├── app/                            ← Cấu trúc trang (Thư viện, Tìm kiếm, Tiến độ, QA)
    │   ├── components/                     ← UI components (PDF Viewer, Song ngữ, Triage Pool)
    │   └── lib/                            ← Module xử lý logic, đọc filesystem, tính toán
    ├── public/                             ← Tài nguyên tĩnh (PDF.js worker)
    ├── docs/                               ← Bản vẽ thiết kế UI/UX & đặc tả kỹ thuật ExploreX
    ├── package.json & tsconfig.json        ← Cấu hình dependencies webapp
    └── data/hub.db                         ← Cơ sở dữ liệu SQLite lưu highlights, ghi chú cá nhân
```

---

## 3. Hướng dẫn cài đặt & Khởi chạy (Getting Started)

### Yêu cầu môi trường
* **Node.js**: >= 18.18 (khuyến nghị Node 20 LTS hoặc 22)
* **Python**: >= 3.10 (khuyến nghị Python 3.11 hoặc 3.12)
* **Hệ điều hành**: Windows / macOS / Linux

---

### A. Khởi chạy Research Hub Webapp (`web/`)
ExploreX Research Hub là ứng dụng giao diện phục vụ tìm kiếm, đọc song ngữ, ghi chú PDF và theo dõi tiến độ nghiên cứu.

```bash
# 1. Đi vào thư mục web
cd web

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```
👉 Mở trình duyệt tại: **`http://localhost:3000`**

Các tính năng chính trên Webapp:
* **Thư viện bài báo (`/thu-vien`)**: Xem 37 bài báo phân theo 4 Layer, xem phân tích HTML 8 khối chuẩn, đọc text trích xuất hoặc PDF song ngữ.
* **Theo dõi tiến độ (`/tien-do`)**: Đồng bộ thời gian thực từ `02_Implementation/Paper_01_NHANES_NoLab/PROGRESS.json`.
* **Tìm kiếm & Triage (`/search`)**: Khai thác API từ OpenAlex, PubMed, Semantic Scholar để tìm bài báo mới.

---

### B. Chạy Thực nghiệm Python (`02_Implementation/Paper_01_NHANES_NoLab`)
Mỗi bài báo được tổ chức thành một mô-đun độc lập, tự chứa đầy đủ mã nguồn và dữ liệu.

```bash
# 1. Đi vào thư mục bài báo cần chạy
cd 02_Implementation/Paper_01_NHANES_NoLab

# 2. Tạo và kích hoạt môi trường ảo (tùy chọn nhưng khuyến nghị)
python -m venv .venv
# Trên Windows:
.venv\Scripts\activate
# Trên Linux/macOS:
source .venv/bin/activate

# 3. Cài đặt các thư viện cần thiết
pip install pandas numpy scikit-learn lightgbm xgboost matplotlib seaborn scipy

# 4. Bước 1: Tải và xây dựng tập dữ liệu NHANES No-Lab
python src/build_nhanes.py

# 5. Bước 2: Tính toán thang điểm nguy cơ lâm sàng (FINDRISC & ADA)
python src/scores.py

# 6. Bước 3: Chạy thực nghiệm huấn luyện mô hình & ablation rò rỉ
python src/pipeline.py

# 7. Bước 4: Đánh giá mô hình và vẽ biểu đồ hiệu năng
python src/evaluate.py
```
Kết quả biểu đồ (ROC, PR Curve, Calibration) và dự đoán OOF sẽ được lưu tự động vào thư mục `results/`.

---

## 4. Quy trình làm việc (Research Workflow)

Dự án áp dụng mô hình nghiên cứu khoa học có sự hỗ trợ của AI Agent (Antigravity / Claude Code / Cursor):

1. **Tìm kiếm & Sàng lọc (Search & Triage)**:
   * Tìm kiếm qua Webapp hoặc agent `paper-finder`.
   * Bài báo được đối soát nghiêm ngặt theo **AGENTS.md §7** (Độ trích dẫn cao, dữ liệu mở, phương pháp tái lập được). Nếu không đạt, bài được lưu vào `rejected.json` để không tìm lặp lại.
2. **Trích xuất & Đọc sâu (PDF Extraction & Analysis)**:
   * Dùng công cụ `pdf-extract` trích bảng và nội dung trung thực từ PDF sang Markdown (`extracted.md`).
   * Viết bản phân tích tiếng Việt chuẩn cấu trúc 8 khối (`analysis.html`).
3. **Phát hiện & Bản đồ rò rỉ (Leakage Mapping)**:
   * Rà soát các lỗi vi phạm phổ biến (chuẩn hóa trước khi split, oversampling rò rỉ, leakage biomarker định nghĩa nhãn).
   * Cập nhật vào [LEAKAGE_MAP.md](01_Diabetes_Research/docs/LEAKAGE_MAP.md).
4. **Thực nghiệm trung thực (Fair Benchmarking)**:
   * Triển khai code trong `02_Implementation/`. Luôn so sánh mô hình ML với baseline lâm sàng chuẩn (FINDRISC, ADA) trên cùng một tập test, cùng hạt giống ngẫu nhiên, không rò rỉ.
5. **Mở rộng đề tài**:
   * Khi thực hiện bài báo tiếp theo, chỉ cần tạo thêm thư mục mới `02_Implementation/Paper_02_.../` theo đúng cấu trúc mô-đun chuẩn.

---

## 5. Dữ liệu & Bảo mật (Data & Guidelines)

* **Bảo mật API Keys**:
  * Sao chép file `.env.example` thành `.env` ở thư mục gốc:
    ```bash
    cp .env.example .env
    ```
  * Điền các khóa API cá nhân vào file `.env`. File này đã được `.gitignore` chặn tuyệt đối, **không bao giờ commit lên GitHub**.
* **Dữ liệu thực nghiệm**:
  * Các file dữ liệu lớn (`.xpt`, `.csv`, `.parquet`, `.npz`) được tự động bỏ qua khi commit Git để giữ dung lượng kho lưu trữ luôn nhẹ và sạch.
  * Các thư mục dữ liệu được giữ lại khung trên Git nhờ file `.gitkeep`.
