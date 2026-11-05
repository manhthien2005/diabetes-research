# Cai 2021 — thực hành tái dựng dự báo T2D 5 năm

**Đã hoàn thành baseline:** [báo cáo đối chiếu tiếng Việt](docs/BAO_CAO_DOI_CHIEU_VI.md). Cox sau LASSO: C-index 0,879; IPCW AUC 5 năm 0,842; Brier 0,00688. Có dấu hiệu vi phạm PH của HbA1c và chỉ 16 biến cố trong 5 năm ở test; chưa kết luận phù hợp lâm sàng.

Mục tiêu: **same-data method reconstruction**, tự fit LASSO → Cox trên NAGALA; không cam kết khớp từng chữ số của tác giả. Đây là module riêng; không đổi nghiên cứu NHANES/BRFSS và không promote bài.

Đọc [đặc tả](docs/RECONSTRUCTION_SPEC.md), [giải thích phương pháp](docs/EXPLAIN_METHOD_VI.md), [data dictionary](docs/DATA_DICTIONARY.md), [báo cáo cohort](docs/COHORT_REPORT_VI.md), [audit dữ liệu](qc/phase_a_20261105/data_audit.json) và [PROGRESS.json](PROGRESS.json) trước khi chạy. Thư mục `NAGAL` giữ đúng tên anh đã tạo.

## Dữ liệu và nguồn

[Cai 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8123981/), DOI 10.2147/DMSO.S304994; dữ liệu [Okamura / Dryad](https://datadryad.org/dataset/doi:10.5061/dryad.8q0p192), bản liệt kê 2019-02-19. Tệp ZIP anh cung cấp nằm trong `data/raw/`; workbook bên trong có SHA256 `671359aea2019c848f969395f88e57f888eaba8463ea0351bcda8f1c947f5523`. Không đưa dữ liệu từng người lên GitHub. Điều kiện tái sử dụng theo [Dryad Terms §§1,4](https://datadryad.org/terms), CC0 cho dữ liệu; cần ghi nguồn.

Audit khớp 12.940 người / 201 biến cố sau BMI <25; 76 biến cố trong 5 năm, 5.820 người censor trước 5 năm. Sex header sai mã nữ; mã thực tế 0/1 được đối chiếu số lượng với Dryad và Table 1. Có 8 HDL thiếu trong cohort được phát hiện từ cặp cột đơn vị; imputation chỉ học trong development fold.

## Kiểm tra nhẹ tại local

Từ thư mục module, PowerShell:

```powershell
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt
.venv/Scripts/python -m unittest discover -s tests -v
.venv/Scripts/python src/run_study.py --data data/raw/doi_10_5061_dryad_8q0p192__v20190219.zip --output runs/audit_001 --audit-only
```

Mỗi output directory phải mới để bảo toàn lịch sử. Không chạy lại final test để chọn mô hình/seed. `runs/`, raw data, notebook upload packages và model binaries được ignore. Chỉ commit code, cấu hình, metadata, kết quả tổng hợp và hình không có dữ liệu từng người.

## Kaggle

CPU, dataset và notebook mới. Anh đã cập nhật yêu cầu và cho phép public trong chat ngày 05/11/2026. Notebook tải các tệp source từ đúng Git commit, kiểm tra SHA256 từng tệp, cài môi trường riêng và gọi `src/run_study.py`; không có bản pipeline thứ hai. Source commit/hash, workbook checksum, cấu hình, seed, thư viện, notebook/version và output được ghi trong run manifest và bản read-back.

Tạo bản upload từ source đã commit bằng `python kaggle/prepare.py --username phaninmnhthink16 --data data/raw/doi_10_5061_dryad_8q0p192__v20190219.zip --public --suffix <ma-run-moi>`. Trong `kaggle/upload/<ma-run-moi>/`, dùng Kaggle CLI tạo dataset từ `dataset/` và push notebook từ `notebook/`. Không dùng cùng slug để ghi đè notebook khác. Không đặt token trong notebook hoặc repository. Trạng thái thực tế nằm trong PROGRESS.json; một notebook đã upload chưa đồng nghĩa chạy thành công.

Lượt thành công đã đọc output/log: [notebook attempt 3](https://www.kaggle.com/code/phaninmnhthink16/cai2021-nagala-reconstruction-20261105-r3), version number 1 theo API, dùng [dataset gốc version 1](https://www.kaggle.com/datasets/phaninmnhthink16/cai2021-nagala-original-20261105). Kiểm tra trạng thái bằng Kaggle CLI. Sau khi kết thúc, dùng `python kaggle/readback.py --launch qc/kaggle_launch_attempt3_20261105.json --output runs/readback_moi` để tải output và kiểm tra provenance. Thư mục output phải mới. Nếu đọc lại cùng output đã tải, không tự ghi đè hoặc gửi một run mới.

## Hiểu kết quả

Hai mô hình được chỉ định trước: Cox sáu biến công bố (kiểm tra kỹ thuật), và Cox sau chọn biến bằng Cox LASSO (bản tái dựng). Đọc C-index cùng IPCW AUC/Brier, calibration và kiểm tra proportional hazards. Đây là internal validation trên cùng cohort. LASSO family, candidate encoding, split seed, missing-data handling và bootstrap có những giả định khác bài: tất cả ghi trong đặc tả. Table 2 của bài không được dùng làm hệ số Cox cuối; mô hình tự fit phải lưu baseline survival và centering để tái tạo xác suất.

Output đã xác minh được lưu tại [qc/run_20261105_attempt3_v1](qc/run_20261105_attempt3_v1/), gồm manifest, freeze, hai predictive bundles, CV/selection, PH tests, kết quả/CI, calibration figures, môi trường và logs. Hai attempt lỗi trước test được giữ trong `qc/failed_runs/`.
