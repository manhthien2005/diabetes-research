> **Bản học và báo cáo với giảng viên hướng dẫn — cập nhật 05/10/2026.** Đồng thuận hiện hành: **MINOR REVISION FOR STATED SCOPE**. Không có FATAL/MAJOR scientific-validity defect chưa giải quyết được chứng minh bởi evidence hiện tại; điều này không chứng minh mọi bias đều vắng mặt. Điểm lịch sử 69→82 không dùng như readiness score. Xem [đồng thuận](FINAL_CONSENSUS.md).

## Cách đọc để hiểu, không cần học thuộc code

| Thời gian | Đọc gì | Sau khi đọc phải trả lời được |
|---|---|---|
| 10 phút | [Báo cáo ngắn cho thầy](BAO_CAO_GVHD_VI.md) | Bài hỏi gì, đã làm gì, tìm thấy gì, giới hạn gì? |
| 30–45 phút | Mục 1–12, 20–28, 37 và 48 của tài liệu này | Nhãn, pipeline, metric và uncertainty có nghĩa gì? |
| Khi cần giải thích sâu | Mục 13–19, 29–36 và phụ lục 49–50 | Vì sao các model cho kết quả khác nhau; evidence nằm ở đâu? |

Đây là **nghiên cứu thực nghiệm trên dữ liệu khảo sát** (*survey data*), có tổng quan phương pháp làm nền. Nó chưa phải một bài *literature survey/systematic review* với quy trình tìm kiếm, tuyển chọn và tổng hợp tài liệu đầy đủ. Mục tiêu hiện tại là một báo cáo nghiên cứu nhỏ có thể giải thích và kiểm tra, chưa phải bộ hồ sơ nộp journal.

**Câu hỏi trung tâm:** với cùng dữ liệu và preprocessing, bảy cấu hình classifier khác nhau thế nào về ranking, hành vi tại ngưỡng quyết định và chất lượng xác suất? Giá trị nằm ở benchmark chung và cách diễn giải có căn cứ; chưa phải thuật toán mới hay bằng chứng lợi ích lâm sàng.

Quy ước: dấu chấm trong bảng số gốc là dấu thập phân, dấu phẩy phân cách hàng nghìn; một số đoạn giải thích dùng quy ước tiếng Việt và ghi rõ đơn vị/phần trăm. “Dương/âm” là **nhãn khảo sát**, không phải kết quả xét nghiệm xác nhận.

# Giải thích toàn bộ BRFSS 2025 Full Study — Bản tiếng Việt

> **Mục đích của file này:** giúp đọc và hiểu toàn bộ notebook Kaggle `BRFSS_2025_Diabetes_Classification.ipynb` mà không cần lần theo từng cell code.
>
> **Phạm vi nghiên cứu chính xác:** đây là bài toán **phân loại trạng thái đã được chẩn đoán tiểu đường dựa trên dữ liệu BRFSS 2025 tại cùng một thời điểm** (*cross-sectional classification of self-reported diagnosed diabetes status*).
>
> Nghiên cứu **không** tuyên bố dự đoán ai sẽ mắc tiểu đường trong tương lai, không phải công cụ chẩn đoán lâm sàng, không phải ước lượng tỷ lệ tiểu đường toàn nước Mỹ, và chưa phải mô hình đủ điều kiện triển khai y tế.

---

# 1. Toàn cảnh nghiên cứu

| Thành phần | Thiết kế cuối cùng |
|---|---|
| Dataset | CDC BRFSS 2025 |
| Dữ liệu gốc | 356,158 người trả lời khảo sát |
| Cohort dùng cho ML | 342,539 người |
| Positive class | 51,827 người có `DIABETE4=1` |
| Tỷ lệ positive | 15.13% của **sample chưa weighting** |
| Số predictor | 20 biến gốc |
| Sau preprocessing | 82 cột |
| Train | 274,031 người — 80% |
| Test | 68,508 người — 20% |
| Split | Stratified, `random_state=42` |
| Cross-validation | Stratified 5-fold trên train |
| Class balancing | Không dùng trong primary benchmark |
| Số model | 7 |
| Baseline chính | Logistic Regression |
| Validation cuối | Internal held-out test |
| Statistical comparison | Paired bootstrap + McNemar + Holm correction |
| Notebook chính | Chỉ **1 notebook canonical duy nhất** |

## Luồng toàn bộ study

```text
CDC BRFSS 2025
      │
      ▼
Kiểm tra source + SHA-256
      │
      ▼
Xác định target DIABETE4
      │
      ▼
Xác định cohort 342,539 người
      │
      ▼
Chọn 20 predictor dựa trên literature + leakage audit
      │
      ▼
Recoding special values / missing values
      │
      ▼
Train/Test Split 80/20
      │
      ▼
Preprocessing bên trong Pipeline
      │
      ▼
5-fold CV trên Train
      │
      ▼
Train 7 model frozen
      │
      ▼
Đánh giá cùng 68,508 người Test
      │
      ▼
Bootstrap uncertainty + Calibration + Diagnostics
      │
      ▼
Paired model comparison
      │
      ▼
Kết luận + giới hạn nghiên cứu
```

---

# 2. Vì sao chọn BRFSS 2025?

**BRFSS — Behavioral Risk Factor Surveillance System** là hệ thống khảo sát sức khỏe hành vi quy mô lớn của CDC.

| Lý do chọn | Ý nghĩa với nghiên cứu |
|---|---|
| Dataset rất lớn | Giúp benchmark model ổn định hơn |
| Có biến `DIABETE4` | Có thể xác định self-reported diagnosed diabetes |
| Nhiều nhóm predictor | Demographic, lifestyle, socioeconomic, access to care, comorbidity |
| Public-use dataset | Có thể reproduce nghiên cứu |
| Có codebook CDC | Recoding biến có căn cứ |
| Năm 2025 | Dữ liệu gần thời điểm hiện tại của study |

## Integrity của dataset

Notebook không chỉ tin rằng file tải về là đúng.

Nó kiểm tra:

| Check | Giá trị |
|---|---|
| XPT size | 799,971,280 bytes |
| SHA-256 | `d99262f8854f018a600c3538ee78e4308569af700abe6b92b36180336c24dec2` |
| Row count | 356,158 |

Nếu file không đúng SHA-256 thì pipeline dừng.

### Một discrepancy vẫn được ghi nhận

CDC landing page ghi 284, nhưng header XPT, đủ 283 descriptor và variable layout chính thức đều xác nhận **283 biến**. pandas giữ đúng toàn bộ biến theo đúng thứ tự. Codebook liệt kê 282 tên và thiếu `ICFQSTVR`; đây là bất nhất tài liệu nguồn, không phải mất cột khi đọc. SHA-256 ZIP và XPT khớp bản tải trực tiếp CDC.

---

# 3. Target của nghiên cứu là gì?

Biến mục tiêu:

`DIABETE4`

| Giá trị BRFSS | Ý nghĩa | Xử lý |
|---:|---|---|
| 1 | Đã được chẩn đoán diabetes | Positive = 1 |
| 3 | Trả lời “không” với câu hỏi đã được thông báo mắc diabetes | Negative = 0 |
| 2 | Diabetes chỉ trong thai kỳ | Loại |
| 4 | Prediabetes / borderline | Loại |
| 7 | Don't know | Loại |
| 9 | Refused | Loại |
| Missing | Không có thông tin | Loại |

Không có outcome adjudication độc lập bằng xét nghiệm hay clinician trong study này. Nhãn và predictors được lấy từ câu trả lời/biến tính sẵn của survey; study không thiết kế một quy trình blinded outcome assessment riêng. Không suy rằng interviewer hoặc respondent được làm mù với diagnosis.

## Participant flow

| Giai đoạn | Số người |
|---|---:|
| Dữ liệu BRFSS ban đầu | 356,158 |
| Loại prediabetes/borderline | 10,166 |
| Loại pregnancy-only diabetes | 2,671 |
| Loại “don't know” | 580 |
| Loại “refused” | 196 |
| Missing target | 6 |
| **Cohort cuối** | **342,539** |

Trong cohort cuối:

- Diabetes positive: **51,827**
- Tỷ lệ positive: **15.13%**

> 15.13% là tỷ lệ trong **sample ML chưa survey weighting**.
>
> Không được gọi đây là tỷ lệ prevalence đại diện toàn Hoa Kỳ.

---

# 4. Nghiên cứu đang “dự đoán” điều gì?

Đây là điểm rất quan trọng.

## Study này làm

> Dùng dữ liệu survey hiện có để phân loại một respondent vào nhóm **đã được chẩn đoán diabetes** hay **không được chẩn đoán diabetes**.

## Study này không làm

| Không phải | Vì sao |
|---|---|
| Dự đoán diabetes trong tương lai | Horizon cross-sectional (Δt = 0), không có follow-up tương lai |
| Dự đoán Type 2 riêng biệt | `DIABETE4` không phân biệt Type 1/Type 2 |
| Chẩn đoán y khoa | Outcome là self-report, không phải glucose/HbA1c |
| Phân tích causal | Dữ liệu cross-sectional |
| Clinical decision tool | Chưa external validation / DCA / subgroup deployment validation |

Cách gọi an toàn nhất:

> **Phân loại trạng thái tự báo cáo đã được chẩn đoán tiểu đường trong BRFSS 2025.**

---

# 5. Vì sao chọn 20 predictors?

Feature selection không phải chọn ngẫu nhiên.

Mỗi candidate variable được kiểm tra theo các nhóm tiêu chí:

| Tiêu chí | Câu hỏi |
|---|---|
| Literature | Biến này có xuất hiện trong nghiên cứu diabetes/BRFSS trước không? |
| Coding | Có hiểu đúng mã BRFSS không? |
| Missingness | Dữ liệu có usable không? |
| Leakage | Có trực tiếp tiết lộ diagnosis/treatment không? |
| Redundancy | Có trùng quá nhiều thông tin với biến khác không? |
| Interpretability | Có giải thích được vai trò của biến không? |
| Domain coverage | Bộ feature có đủ demographic / behavior / access / health không? |

## Các nhóm thông tin chính

20 predictors phủ nhiều nhóm:

| Domain | Ví dụ |
|---|---|
| Demographic | tuổi, giới tính |
| Socioeconomic | education, income |
| Lifestyle | smoking, exercise |
| General health | self-rated health |
| Body composition | BMI |
| Healthcare access | `PERSDOC3`: có một, nhiều hoặc không có người cung cấp chăm sóc cá nhân |
| Cardiometabolic | hypertension, cholesterol |
| Comorbidity | coronary disease, stroke, kidney disease |
| Functional status | difficulty walking |
| Mental/physical health | unhealthy-day variables |

## Danh sách đúng 20 predictors

| Biến | Nghĩa dễ hiểu | Thiếu trong cohort (%) | Xử lý |
|---|---|---:|---|
| `_AGEG5YR` | Nhóm tuổi | 1.864 | Missing category + one-hot |
| `_SEX` | Giới tính ghi nhận | 0.000 | Missing category + one-hot |
| `_RACEGR3` | Nhóm chủng tộc/dân tộc | 2.313 | Missing category + one-hot |
| `_EDUCAG` | Học vấn | 0.582 | Missing category + one-hot |
| `_INCOMG1` | Nhóm thu nhập | 19.879 | Missing category + one-hot |
| `EMPLOY1` | Việc làm | 1.967 | Missing category + one-hot |
| `_BMI5` | Chỉ số khối cơ thể | 9.097 | Median + scale |
| `GENHLTH` | Sức khỏe tự đánh giá | 0.254 | Missing category + one-hot |
| `PHYSHLTH` | Số ngày sức khỏe thể chất không tốt | 2.285 | Median + scale |
| `MENTHLTH` | Số ngày sức khỏe tinh thần không tốt | 1.772 | Median + scale |
| `_TOTINDA` | Hoạt động thể lực lúc rảnh | 0.262 | Missing category + one-hot |
| `_RFSMOK3` | Hút thuốc hiện tại | 5.804 | Missing category + one-hot |
| `SLEPTIM1` | Số giờ ngủ mỗi 24 giờ | 7.647 | Median + scale |
| `_RFHYPE6` | Đã được thông báo tăng huyết áp | 1.146 | Missing category + one-hot |
| `_RFCHOL3` | Đã được thông báo cholesterol cao | 12.665 | Missing category + one-hot |
| `_MICHD` | Tiền sử bệnh mạch vành/nhồi máu cơ tim | 1.051 | Missing category + one-hot |
| `CVDSTRK3` | Tiền sử đột quỵ | 0.289 | Missing category + one-hot |
| `CHCKDNY2` | Tiền sử bệnh thận | 0.352 | Missing category + one-hot |
| `DIFFWALK` | Khó đi bộ/leo cầu thang | 4.483 | Missing category + one-hot |
| `PERSDOC3` | Có người cung cấp chăm sóc cá nhân | 0.970 | Missing category + one-hot |

Tỷ lệ thiếu tính sau recoding, trên **342.539** người đủ điều kiện; khác mẫu số full raw dùng trong screening lịch sử. Healthcare access ở đây là `PERSDOC3`; insurance và cost-related access không nằm trong final 20.

`_BMI5` phải chia 100 để có kg/m². `PHYSHLTH`/`MENTHLTH` có 88 nghĩa 0 ngày, không phải 88 ngày; 77/99 thành missing. Tuổi, income và education được one-hot, không coi mã 1–7 là các khoảng cách số học đều nhau. `_MICHD` mã 1 là có bệnh, trong khi `_RFHYPE6` mã 2 mới là có: không suy ý nghĩa từ con số mã nếu chưa đọc codebook.

`PERSDOC3` là lựa chọn domain của study, không có exact-variable support đã xác lập từ P02/P03. `SLEPTIM1` có căn cứ trực tiếp trong appendix Xie2019, không quy cho P03. Race/ethnicity là nhóm khảo sát xã hội, không phải nguyên nhân sinh học; có đưa vào model không đồng nghĩa đã kiểm tra fairness.

Nguồn: [variable audit](../../02_Implementation/BRFSS_Survey/qc/astra_variable_audit.md), [đặc điểm toàn cohort/train/test](../../02_Implementation/BRFSS_Survey/qc/astra_data_characteristics.csv).



---

# 6. Leakage được kiểm tra như nào?

Một model có thể nhìn rất “xịn” nếu vô tình cho nó biết thông tin liên quan trực tiếp tới diagnosis.

Study loại các field diabetes-specific như:

| Biến | Lý do không dùng |
|---|---|
| `DIABAGE4` | Tuổi lúc được chẩn đoán diabetes |
| `INSULIN1` | Điều trị insulin |
| `CHKHEMO3` | Diabetes monitoring |
| `EYEEXAM1` | Diabetes-specific eye care |
| `DIABEYE1` | Diabetes eye complication |
| `DIABEDU1` | Diabetes education |

Đây là **hard leakage exclusion**.

## Nhưng còn hypertension / kidney disease / stroke thì sao?

Các biến này không trực tiếp nói:

> “Người này có diabetes.”

Nên chúng không phải direct target leakage.

Tuy nhiên vì survey là **cross-sectional**, mình không biết:

- hypertension xảy ra trước hay sau diabetes;
- CKD xảy ra trước hay sau diagnosis;
- walking difficulty là risk factor hay consequence.

Do đó:

> Chúng dùng được cho **status classification**.

Nhưng:

> Không được dùng để kết luận causal hoặc future risk.

---

# 7. Data preparation

## 7.1 BRFSS special codes

Survey data thường có các mã kiểu:

- Don't know;
- Refused;
- Not asked;
- Not applicable.

Không thể coi các mã này như số thật.

Pipeline chuyển các special codes phù hợp thành missing trước modeling.

---

# 8. Train/test split và điều gì thực sự được cô lập

| Partition | N | Nhãn dương | Nhãn âm | Vai trò |
|---|---:|---:|---:|---|
| Train | 274,031 | 41,462 | 232,569 | Fit preprocessing, CV và fit model |
| Test | 68,508 | 10,365 | 58,143 | Đánh giá nội bộ các cấu hình đã fit |

Split stratified 80/20, seed 42 giữ gần cùng tỷ lệ nhãn giữa hai partition; seed giúp tái tạo split, không bảo đảm thiết kế không bias. Cùng một test set được dùng cho cả bảy model.

**Cần phân biệt ba tầng:**

| Tầng | Evidence hiện tại |
|---|---|
| Học median, encoder, scaler và estimator | Chỉ trong train; trong CV thì chỉ trong training fold |
| Tối ưu hyperparameter/ngưỡng bằng test | Không tìm thấy bằng chứng thực hiện |
| Thiết kế study trước khi nhìn test | Chưa đủ bằng chứng rằng cả roster/configurations/contrast family được khóa chung trước lần nhìn test đầu tiên |

A01 là **incomplete evidence of prospective joint prespecification / test exposure**, mức MINOR theo consensus. LR đã được mô tả là baseline trước khi có LR results (`03806f3` trước `3e557b2`). DT results (`0b7cdfc`) có trước triển khai RF (`c68cda0`); rationale RF viện dẫn DT test AUC. Điều này chứng minh tiếp xúc kết quả và ảnh hưởng lên cách giải thích, chưa chứng minh family/configuration được chọn vì kết quả test.

A02 là **pre-split covariate-coverage inspection**: xem độ phủ/missingness trước split (`c0d2431` trước `79c28c9`). Counterfactual train-only ở vòng review trước cho thấy cả 31 non-leakage candidates đều dưới ngưỡng missingness 20% ở full data lẫn train. Riêng income là 19,9490% full raw và 19,8547% train. Giữ nguyên các lựa chọn định tính về domain/redundancy/leakage thì vẫn cùng 20 predictors. Ngưỡng missingness đơn độc không sinh ra đúng 20 biến; nó cho qua 31 biến.

Vì vậy không nói “test hoàn toàn chưa từng ảnh hưởng thiết kế”, cũng không nói “đã chứng minh adaptive model selection”. Point estimates được giữ như exploratory/descriptive internal benchmark; không phải confirmatory comparison có joint prespecification đã xác lập.

---

# 9. Preprocessing pipeline

Stateful preprocessing được đặt trong sklearn Pipeline để giảm leakage.

## Categorical variables

```text
Missing
  ↓
Explicit missing category
  ↓
One-Hot Encoding
```

`handle_unknown="ignore"` được dùng để tránh lỗi nếu test/fold chứa category không xuất hiện trong training subset.

## Continuous variables

```text
Missing
  ↓
Median Imputation
  ↓
StandardScaler
```

Median và scaler được học từ **training data**.

Trong CV, chúng được fit lại riêng trong mỗi training fold.

## Kết quả

- 20 raw predictors
- Trong fit trên toàn bộ training set: **82 columns**; vocabulary ở từng CV fold do fold đó học

---

# 10. Vì sao không dùng SMOTE?

Một số paper BRFSS trước dùng SMOTE.

Study hiện tại cố ý chọn:

> **natural class distribution**

cho primary benchmark.

Mục tiêu là:

- benchmark model trong distribution thật của analytical sample;
- tránh thêm một yếu tố thay đổi model behavior;
- so sánh 7 model trên cùng protocol.

SMOTE có thể được nghiên cứu sau dưới dạng:

> **sensitivity experiment mới**

chứ không sửa vào primary frozen study.

---

# 11. Cross-validation

Train set dùng:

> **Stratified 5-Fold Cross-Validation**

Mỗi fold:

```text
4 folds → fit preprocessing + model
1 fold  → validate
```

Lặp 5 lần.

## CV dùng để làm gì?

- xem model có ổn định qua các folds không;
- so sánh train-development behavior;
- phát hiện model bất ổn/overfit.

## Vì sao không báo “95% CI từ 5 folds”?

Bản đầu từng làm:

```text
mean ± t × SE
```

nhưng cách này đã bị bỏ.

Lý do:

> CV folds không độc lập vì training sets overlap.

Bản final dùng:

- mean;
- standard deviation;
- min;
- max.

Còn uncertainty trên held-out test dùng bootstrap.

---

# 12. 7 model được benchmark

| ID | Model | Vai trò |
|---:|---|---|
| 01 | Logistic Regression | Baseline tuyến tính, dễ giải thích |
| 02 | Decision Tree | Single-tree nonlinear baseline |
| 03 | Random Forest | Bagged tree ensemble |
| 04 | Gradient Boosting | Sequential boosting |
| 05 | XGBoost | Regularized boosted trees |
| 06 | Linear SVM | Maximum-margin linear classifier |
| 07 | Gaussian Naive Bayes | Generative probabilistic baseline |

Điểm quan trọng:

> Đây là **7 cấu hình cố định được phát triển tuần tự**; chưa chứng minh cả roster được prespecify trước lần xem test đầu tiên.

Nghiên cứu không tuyên bố:

> Đây là performance tối đa có thể đạt của từng algorithm family.

---

# 13. Model 01 — Logistic Regression

## Vai trò

Baseline chính của study.

Ưu điểm:

- đơn giản;
- nhanh;
- probability output rõ;
- dễ giải thích;
- precedent tốt trong BRFSS literature.

## Frozen configuration

| Parameter | Giá trị |
|---|---|
| Penalty | L2 |
| C | 1 |
| Solver | lbfgs |
| Class weight | None |
| Resampling | None |
| Threshold | 0.5 |

## Test result

| Metric | Giá trị |
|---|---:|
| Accuracy | 0.8558 |
| Balanced Accuracy | 0.5815 |
| Precision | 0.5715 |
| Recall | 0.1882 |
| F1 | 0.2832 |
| ROC-AUC | 0.8262 |
| Average Precision | 0.4466 |
| Brier | 0.1033 |

### Cách hiểu

LR rank respondent khá tốt:

> ROC-AUC ≈ 0.826

nhưng threshold 0.5 khá conservative nên Recall thấp.

---

# 14. Model 02 — Decision Tree

Decision Tree gần như memorize training data.

| Metric | Train | Test |
|---|---:|---:|
| Accuracy | ~0.9997 | 0.7862 |
| ROC-AUC | ~1.000 | 0.6021 |

Đây là:

> **severe overfitting**

Test result:

| Metric | Giá trị |
|---|---:|
| Balanced Accuracy | 0.6020 |
| F1 | 0.3235 |
| ROC-AUC | 0.6021 |
| AP | 0.2053 |
| Brier | 0.2134 |

Decision Tree là ví dụ rất rõ rằng:

> training performance cực cao không có nghĩa model generalize tốt.

---

# 15. Model 03 — Random Forest

Random Forest dùng nhiều decision trees rồi aggregate.

Bagging và ngẫu nhiên hóa cây nhằm giảm variance so với một cây đơn. Trong kết quả này RF có test AUC cao hơn DT; study không đo riêng variance reduction để xác nhận cơ chế.

| Metric | Giá trị |
|---|---:|
| Accuracy | 0.8510 |
| Balanced Accuracy | 0.5790 |
| F1 | 0.2773 |
| ROC-AUC | 0.8045 |
| AP | 0.4025 |
| Brier | 0.1076 |

RF tốt hơn DT rất rõ nhưng vẫn dưới nhóm LR / GB / XGB / SVM về discrimination.

---

# 16. Model 04 — Gradient Boosting

Boosting train các weak learners tuần tự để sửa lỗi của model trước.

| Metric | Giá trị |
|---|---:|
| Accuracy | 0.8564 |
| Balanced Accuracy | 0.5753 |
| Precision | 0.5860 |
| Recall | 0.1723 |
| F1 | 0.2663 |
| ROC-AUC | 0.8260 |
| AP | **0.4483** |
| Brier | **0.1031** |

Trong frozen point estimates:

- AP cao nhất;
- Brier thấp nhất.

Nhưng chênh lệch với LR rất nhỏ.

---

# 17. Model 05 — XGBoost

XGBoost là gradient boosting có regularization và nhiều tối ưu về training.

| Metric | Giá trị |
|---|---:|
| Accuracy | 0.8548 |
| Balanced Accuracy | 0.5843 |
| Precision | 0.5574 |
| Recall | 0.1964 |
| F1 | 0.2905 |
| ROC-AUC | **0.8263** |
| AP | 0.4417 |
| Brier | 0.1035 |

ROC-AUC point estimate cao nhất trong 7 model.

Nhưng:

> 0.82629 vs LR 0.82617 là khác biệt cực nhỏ.

Paired analysis cho thấy không có bằng chứng rõ rằng XGBoost tốt hơn LR về ROC-AUC.

---

# 18. Model 06 — Linear SVM

Linear SVM output chính là:

> decision margin

không phải probability.

Vì vậy study dùng:

- `decision_function()` cho ROC-AUC/AP;
- threshold margin = 0;
- **không tính Brier**.

| Metric | Giá trị |
|---|---:|
| Accuracy | 0.8560 |
| Balanced Accuracy | 0.5539 |
| Precision | **0.6244** |
| Recall | 0.1208 |
| F1 | 0.2024 |
| ROC-AUC | 0.8262 |
| AP | 0.4479 |

SVM cực conservative:

- Precision cao;
- Specificity cao;
- Recall rất thấp.

---

# 19. Model 07 — Gaussian Naive Bayes

GNB giả định các features độc lập có điều kiện theo class và mỗi feature có phân phối Gaussian trong từng class.

Với one-hot variables, assumption này không hoàn hảo.

Do đó study xem GNB như:

> simple probabilistic baseline

chứ không cho rằng assumption Gaussian thật sự phù hợp với tất cả features.

## Result

| Metric | Giá trị |
|---|---:|
| Accuracy | 0.7273 |
| Balanced Accuracy | **0.7194** |
| Precision | 0.3192 |
| Recall | **0.7082** |
| F1 | **0.4400** |
| ROC-AUC | 0.7886 |
| AP | 0.3641 |
| Brier | 0.2523 |

GNB bắt được rất nhiều positive cases.

Nhưng phải trả giá bằng:

- nhiều false positives;
- precision thấp;
- calibration kém;
- discrimination dưới nhóm leading models.

Đây là ví dụ điển hình:

> model có F1/Recall cao nhất chưa chắc là model “tốt nhất toàn diện”.

---

# 20. Vì sao Accuracy dễ gây hiểu lầm?

Negative class ≈ 84.87%.

Nếu một baseline luôn predict:

> “Không diabetes”

thì Accuracy vẫn khoảng:

> **0.8487**

Nhưng:

| Metric | Always-negative model |
|---|---:|
| Accuracy | ~0.8487 |
| Balanced Accuracy | 0.50 |
| Recall | 0 |
| F1 | 0 |
| ROC-AUC | 0.50 |

Do đó study không dùng Accuracy đơn độc.

---

# 21. Các metric được sử dụng

| Metric | Trả lời câu hỏi gì? |
|---|---|
| Accuracy | Bao nhiêu prediction đúng tổng thể |
| Balanced Accuracy | Trung bình sensitivity và specificity |
| Precision | Trong số predicted diabetes, bao nhiêu thật sự positive |
| Recall / Sensitivity | Bắt được bao nhiêu người positive |
| Specificity | Nhận đúng bao nhiêu negative |
| F1 | Cân bằng Precision và Recall |
| ROC-AUC | Khả năng ranking positive cao hơn negative |
| Average Precision | Chất lượng precision-recall trên nhiều thresholds |
| Brier | Sai số xác suất tổng thể; không đo riêng calibration |


## Đọc confusion matrix của LR bằng số người

| Nhãn khảo sát | Model dự đoán dương | Model dự đoán âm | Tổng |
|---|---:|---:|---:|
| Dương | TP = 1.951 | FN = 8.414 | 10.365 |
| Âm | FP = 1.463 | TN = 56.680 | 58.143 |
| Tổng | 3.414 | 65.094 | 68.508 |

Recall = 1.951 / 10.365 = **18,82%**: trong nhóm nhãn dương, model nhận đúng bao nhiêu. Precision = 1.951 / 3.414 = **57,15%**: trong nhóm model báo dương, bao nhiêu người mang nhãn dương. Accuracy = (1.951 + 56.680) / 68.508 = **85,58%**. Các mẫu số khác nhau nên ba tỷ lệ không mâu thuẫn.

ROC-AUC 0,8262 có nghĩa xác suất score của một người nhãn dương cao hơn một người nhãn âm chọn ngẫu nhiên vào khoảng 82,62%, với ties tính nửa điểm; **không phải** phát hiện đúng 82,62% ca bệnh tại threshold 0,5. AP 0,4466 cũng không có nghĩa precision tại threshold đó bằng 44,66%.

Có thể xếp đúng thứ tự dù nhiều scores vẫn dưới 0,5; khi ấy AUC khá cao nhưng recall ở 0,5 thấp. Hạ threshold thường tăng recall và số positive calls, đồng thời giảm specificity; precision không bắt buộc giảm đơn điệu trên mọi mẫu. Study chưa tối ưu threshold và không được thử trên test để chọn điểm đẹp.

## Lưu ý về “PR-AUC”

Trong historical artifact có field:

`pr_auc`

nhưng code thực tế dùng:

`average_precision_score`

Do đó tên khoa học chính xác trong final report là:

> **Average Precision (AP)**

không phải trapezoidal PR-AUC.

---

# 22. Calibration

Discrimination tốt không đồng nghĩa probability tốt.

Ví dụ:

> model có thể rank người đúng thứ tự nhưng probability 80%, 40%, 10% lại không phản ánh xác suất thực tế.

Study dùng:

- Brier score;
- calibration curve;
- pre-submission calibration intercept;
- calibration slope.

Với một nhóm được dự đoán quanh 20%, calibration tốt nghĩa tỷ lệ nhãn dương quan sát của nhóm gần 20%. Đây là ví dụ minh họa, không phải một kết quả subgroup mới của study. AUC chủ yếu quan tâm thứ tự; calibration quan tâm mức xác suất.

## Calibration supplement

| Model | Intercept | Slope | Brier |
|---|---:|---:|---:|
| Logistic Regression | +0.0135 | 1.0133 | 0.1033 |
| Gradient Boosting | +0.1128 | 1.0897 | **0.1031** |
| XGBoost | -0.0776 | 0.9376 | 0.1035 |
| Random Forest | -0.4233 | 0.6778 | 0.1076 |
| Decision Tree | -1.3948 | 0.0433 | 0.2134 |
| Gaussian NB | -1.6963 | 0.0970 | 0.2523 |

Trong logistic calibration regression này, mốc tham chiếu là:

- intercept ≈ 0;
- slope ≈ 1.

Các joint slopes của DT/GNB xa 1 hơn rõ so với LR/GB/XGB ở clipping convention này. Một intercept/slope gần mốc tham chiếu vẫn không bảo đảm calibration tốt ở mọi vùng score hay subgroup.

---

# 23. Bootstrap test uncertainty

Primary notebook dùng:

> stratified bootstrap

Ý tưởng:

1. sample lại positive respondents có replacement;
2. sample lại negative respondents có replacement;
3. ghép lại;
4. tính metric;
5. lặp nhiều lần.

Nhờ đó có distribution để tính percentile interval.

Primary notebook dùng **200 bootstrap replicates**. Ví dụ LR ROC-AUC 0,8262 có khoảng 95% [0,8219; 0,8296] từ bảng test summary lịch sử. Không nhầm khoảng của một model với khoảng **chênh lệch paired** giữa hai model.

Bootstrap không tạo người mới hay thông tin mới. Nó mô phỏng việc lấy lại respondents trong sample hiện có. “Khoảng 95%” mô tả thủ tục ước lượng uncertainty với các giả định đã nêu; không phải xác suất 95% một model thắng model khác.

Pre-submission audit nhận thấy 200 reps có thể hơi ít cho những difference cực nhỏ.

Vì vậy một robustness supplement chạy:

> **5,000 paired bootstrap reps**

trên chính frozen predictions, không train lại model.

---

# 24. Tại sao comparison phải paired?

Tất cả model predict trên **cùng 68,508 respondents**.

Do đó không nên coi metric của model A và model B như hai sample độc lập.

Paired bootstrap làm:

```text
Bootstrap respondent indices
         │
         ├── Logistic predictions
         ├── XGBoost predictions
         ├── GB predictions
         └── SVM predictions
```

cùng một sampled index set.

Sau đó tính:

`metric_A - metric_B`

Điều này giữ correlation giữa predictions của các model.

---

# 25. Vì sao dùng Logistic Regression làm tham chiếu?

LR đơn giản, sinh xác suất và có tiền lệ trong BRFSS literature. Vai trò baseline đã xuất hiện trong implementation commit trước LR results. Đây là căn cứ phù hợp để dùng LR làm mốc giải thích.

Điều đó **không chứng minh** toàn bộ family of statistical contrasts đã được prespecify trước khi thấy test. Nhóm LR/GB/XGBoost/Linear SVM là nhóm có ROC-AUC quan sát cao nhất và phần so sánh chuyên sâu của nhóm này mang tính exploratory.

Các bảng 5.000-replicate trong tài liệu này luôn dùng **LR trừ comparator**. Dương nghĩa LR cao hơn về metric đang xét; âm nghĩa thấp hơn. Không suy kết luận giữa GB và XGBoost từ interval LR–GB: đó là một contrast khác.

---

# 26. Top-4 model thực sự có khác nhau không?

Nhóm:

- Logistic Regression;
- Gradient Boosting;
- XGBoost;
- Linear SVM.

đều có ROC-AUC khoảng:

> **0.826**

## 5,000-replicate robustness

| So với Logistic | Δ ROC-AUC (LR − model) | 95% CI |
|---|---:|---:|
| Gradient Boosting | +0.00015 | [-0.00100, +0.00127] |
| XGBoost | -0.00012 | [-0.00155, +0.00133] |
| Linear SVM | +0.00001 | [-0.00065, +0.00067] |

Cả ba CI đều cắt 0.

Kết luận đúng:

> **Không phát hiện khác biệt ROC-AUC rõ ràng giữa LR và GB/XGBoost/Linear SVM.**

Kết luận sai:

> “Bốn model statistically equivalent.”

Không được nói equivalence vì study không prespecify equivalence margin/test.

---

# 27. Average Precision robustness

| So với Logistic | Δ AP (LR − model) | 95% CI |
|---|---:|---:|
| Gradient Boosting | -0.00168 | [-0.00500, +0.00138] |
| XGBoost | +0.00492 | [+0.00017, +0.00965] |
| Linear SVM | -0.00125 | [-0.00279, +0.00027] |

LR có AP cao hơn XGBoost một lượng nhỏ trong robustness analysis.

Nhưng:

> đây là khác biệt metric-specific rất nhỏ.

Nó không đủ để kết luận:

> Logistic Regression là universal winner.

Khoảng này **chưa hiệu chỉnh multiplicity**. Ba robustness streams có lower endpoints dương nhưng rất gần 0; sáu-contrast Bonferroni sensitivity cho interval LR–XGB AP chứa 0 ở cả ba. Không nói đã quan sát sign flip của unadjusted interval, cũng không biến tail fraction thành prespecified p-value.

---

# 28. McNemar Test

Bootstrap trong notebook đánh giá các metrics; supplement 5.000-replicate tập trung ROC-AUC và AP.

McNemar tập trung vào:

> Hai classifier có khác nhau về pattern đúng/sai trên cùng respondents tại frozen decision boundary không?

Study chạy tất cả:

> 21 pairwise model comparisons

và dùng:

> **Holm family-wise correction**

để kiểm soát multiple testing.

Trong nhóm leading LR/GB/XGB/Linear SVM:

> không thấy accuracy difference có ý nghĩa sau Holm correction.

---

# 29. Các visualization chính

Notebook tạo nhiều biểu đồ để không phải chỉ đọc bảng số.

| Plot | Ý nghĩa |
|---|---|
| ROC curve | So sánh discrimination |
| Precision-Recall curve | Quan trọng với imbalanced data |
| Confusion matrix | Quan sát FP/FN |
| Metric matrix | So sánh nhiều metric cùng lúc |
| Precision-Recall operating point | Xem trade-off tại frozen threshold |
| Calibration curve | Probability có đáng tin không |
| Feature diagnostic matrix | So sánh tín hiệu feature qua model |
| Model-specific diagnostics | Xem behavior riêng từng estimator |

---

Để trình bày với thầy, ưu tiên ba hình đã được kiểm tra ở vòng audit trước:

- [ROC/PR](supplement/astra_figures/discrimination.png): các đường dẫn đầu sát nhau; không đo thắng thua chỉ bằng mắt.
- [Confusion matrices](supplement/astra_figures/confusion_matrices.png): đọc số FN/FP, không chỉ màu. Màu chuẩn hóa theo nhãn quan sát; chữ là số đếm.
- [Calibration](supplement/astra_figures/calibration.png): so với đường chéo; các đường dùng tối đa 10 quantile bins, ties có thể làm ít bins hơn. Đoạn nối giữa hai điểm không chứng minh calibration ở mọi điểm trung gian.

# 30. Feature importance nên hiểu như nào?

Study có coefficient / tree-based importance diagnostics.

Không được hiểu:

> Feature importance cao ⇒ feature gây ra diabetes.

Chỉ được hiểu:

> Model sử dụng feature này nhiều/strongly trong prediction structure.

Ngoài ra:

- coefficients;
- impurity importance;
- boosted-tree importance

không cùng một đơn vị/semantics.

Do đó matrix giữa model chỉ nên dùng:

> diagnostic / exploratory interpretation.

---

# 31. So sánh với các bài báo trước

Các paper không dùng protocol giống nhau.

| Paper | Khác study hiện tại |
|---|---|
| P01 | Multi-year, age ≥40, different design |
| P02 | BRFSS 2014, age >30, 2/3–1/3 split, complete-case, SMOTE |
| P03 | Tennessee 2023, MICE, feature selection, SMOTE, tuning |
| P05 | Resampling + GA-XGBoost/stacking |
| P06 | Curated 2015-derived dataset, target khác |

Câu hỏi thường gặp là:

> “AUC paper khác cao hơn có phải chứng minh model của họ tốt hơn không?”

Có thể đặt câu hỏi này, nhưng chỉ so số AUC giữa các thiết kế khác nhau không đủ trả lời.

Metric giữa paper chỉ dùng để:

- hiểu context;
- justify algorithm family;
- justify predictor/domain choices;
- tham khảo methodology.

Không phải reproduction target.

---

# 32. Vì sao study không dùng survey weights?

BRFSS có:

- `_LLCPWT`;
- `_STSTR`;
- `_PSU`.

Đây là các thành phần quan trọng nếu mục tiêu là:

> population-level inference.

Primary benchmark hiện tại cố ý đặt estimand là:

> **predictive performance trong analyzed respondent sample**

nên không claim:

- U.S. prevalence;
- nationally representative model performance.

Nếu sau này muốn claim population-level performance:

> phải thiết kế riêng survey-weighted / design-aware experiment.

---

# 33. External validation có bắt buộc cho báo cáo này không?

Train và test đều lấy từ cùng BRFSS 2025, nên đây là **internal evaluation**. Random holdout không biến thành external validation vì có nhiều người hoặc vì chưa fit estimator trên test.

Với scope benchmark phương pháp nội bộ, thiếu external validation là **giới hạn applicability**, không phải MAJOR tự động hay điều kiện bắt buộc để được báo cáo kết quả hiện tại. Muốn nói mô hình dùng tốt ở năm/quần thể khác thì cần evidence tương ứng; muốn triển khai lâm sàng còn cần đánh giá quyết định sử dụng, ngưỡng, fairness và lợi ích/tác hại.

Đừng giải thích với thầy rằng “study chưa hợp lệ vì thiếu external”. Cách nói đúng là “study trả lời câu hỏi nội bộ này; khả năng chuyển sang bối cảnh khác chưa được kiểm tra”.

---

# 34. Vì sao chưa có subgroup/fairness evaluation?

Primary frozen study chưa đánh giá performance riêng theo:

- sex;
- race/ethnicity;
- age groups;
- socioeconomic subgroups.

Vì vậy study không claim:

> model công bằng giữa các nhóm.

Nếu deploy thực tế:

> subgroup/fairness analysis là bắt buộc.

---

# 35. Vì sao chưa làm Decision Curve Analysis?

DCA cần một clinical decision context.

Ví dụ:

> Nếu predicted diabetes risk > X%, bác sĩ sẽ làm intervention gì?

Study hiện không có:

- intended clinical intervention;
- threshold probability;
- treatment/screening action.

Do đó thêm DCA chỉ để “đủ checklist” sẽ không có ý nghĩa.

Study đúng khi nói:

> chưa claim clinical net benefit.

---

# 36. Sample size có đủ không?

Study không recruit sample prospectively.

Nó dùng:

> toàn bộ eligible respondents trong public BRFSS 2025.

Development set có khoảng:

- 274,031 respondents;
- 41,462 positives;
- 20 raw predictors;
- 82 transformed columns.

Cỡ mẫu tổng thể lớn, nhưng không tự chứng minh đủ precision cho mọi model, subgroup hoặc câu hỏi. Các nhóm hiếm vẫn có thể ít dữ liệu; chưa có phân tích subgroup để kết luận về điều đó.

Tuy nhiên study vẫn ghi:

> chưa thực hiện formal prospective prediction-model sample-size calculation.

Không retroactively tạo một calculation chỉ để đẹp report.

---

# 37. Kết luận 7 model nên hiểu thế nào?

Không có một model “best” cho mọi mục tiêu.

| Mục tiêu | Model đáng chú ý |
|---|---|
| Baseline đơn giản; AUC gần nhóm dẫn đầu, joint intercept/slope gần 0/1 trong mẫu này | Logistic Regression |
| Brier thấp nhất / AP point estimate cao nhất | Gradient Boosting |
| ROC-AUC point estimate cao nhất | XGBoost |
| Precision / specificity cao | Linear SVM |
| Recall / F1 / Balanced Accuracy cao tại default threshold | Gaussian NB |
| Model yếu vì overfit | Decision Tree |
| Tree ensemble trung gian | Random Forest |

## Câu kết luận quan trọng nhất

> **Một Logistic Regression rất đơn giản đạt khả năng ranking gần nhau về mặt observed ROC-AUC với GB/XGBoost/Linear SVM trong internal test này; độ phức tạp model lớn hơn không tự động mang lại discrimination tốt hơn.**

Nhưng cần nhớ:

> “Không phát hiện khác biệt rõ” không phải “chứng minh equivalence”.

---

# 38. Từ kết quả này có thể chọn model nào?

Nếu cần một **mốc trình bày phương pháp**, LR là lựa chọn dễ giải thích: ranking gần nhóm dẫn đầu, có xác suất và regularization rõ. Đây không phải lựa chọn model để đưa vào chăm sóc bệnh nhân.

Không thể nói “cần recall thì chọn GNB” từ bảng ngưỡng mặc định. LR/GB/XGB có thể thay đổi recall/precision khi đổi threshold; study chưa so các model tại cùng sensitivity, specificity hoặc cùng chi phí sai sót. Tương tự, SVM precision cao tại margin 0 không chứng minh SVM tốt nhất tại mọi ngưỡng.

Nếu có câu hỏi lâm sàng mới, cần định nghĩa hành động, chi phí FP/FN, lựa chọn ngưỡng trong development data và đánh giá bằng thiết kế phù hợp. Đó là thí nghiệm mới; không tối ưu trên frozen test này.

---

# 39. Tái lập được gì, và tests chứng minh đến đâu?

| Thành phần | Trạng thái đã xác minh |
|---|---|
| Source data | Có SHA-256 và kiểm tra đối chiếu nguồn CDC |
| Thiết kế có thể đọc lại | Có code, recoding, configs, seeds, Git history |
| Frozen predictions và numerical supplements | Có artifacts; calibration và bootstrap đã được tái tính khớp |
| Huấn luyện lại toàn bộ trong audit | Chưa thực hiện; tái tính metric không phải refit |
| Fitted model objects | Chưa có serialized pipelines để nạp và dự đoán trực tiếp |
| Lưu trữ lâu dài | GitHub execution artifacts có thời hạn; chưa bảo đảm truy cập vĩnh viễn |

Con số **160 tests PASS trong vòng audit trước** gồm 104 agent/governance tests, 49 skill tests và 7 BRFSS release-gate tests mới. Phần lớn kiểm tra hệ thống và hợp đồng artifact; không phải 160 phép kiểm định giá trị khoa học của BRFSS.

Chúng giúp phát hiện cấu trúc sai, giá trị không hữu hạn, duplicate contrasts, thay đổi code hoặc file ngoài dự kiến và workflow kiểm tra sai revision. Chúng không tự chứng minh absence of selection bias, external validity, fairness, clinical utility hay nhân quả. Điểm 69→82 lịch sử đã bị rút khỏi vai trò readiness score vì không có attribution deduction theo finding.

Nếu anh chỉ cần báo cáo với thầy: có thể dùng các bảng/biểu đồ đã kiểm tra cùng source map. Nếu sau này chia sẻ để người khác tái lập: cần thêm kế hoạch lưu artifact bền vững và nêu rõ giới hạn fitted-model availability.

---

# 40. Các file quan trọng trong repo

| Muốn xem | File |
|---|---|
| Full executable study | `02_Implementation/BRFSS_Survey/kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb` |
| Tóm tắt kết quả final | `docs/primary_benchmark_summary.md` |
| Audit khoa học | `docs/STUDY_AUDIT.md` |
| Internal hostile review | `docs/PRE_SUBMISSION_BOARD_REVIEW.md` |
| TRIPOD/PROBAST readiness | `docs/REPORTING_READINESS.md` |
| Feature set | `docs/final_feature_set.md` |
| Literature review | `docs/literature_review.md` |
| References | `docs/references.bib` |
| Reviewer handoff | `03_Final_Result/BRFSS_2025/REVIEWER_HANDOFF.md` |
| Final short scientific brief | `03_Final_Result/BRFSS_2025/FINAL_SUBMISSION_BRIEF.md` |
| Checklist trước journal | `03_Final_Result/BRFSS_2025/AUTHOR_COMPLETION_CHECKLIST.md` |

---

# 41. Những file trong `models/` nên hiểu như nào?

Các file per-model cũ là:

> **historical frozen records**

Chúng giữ lại:

- config;
- result;
- provenance;
- trạng thái tại thời điểm từng model được freeze.

Một số file lịch sử có thể còn câu:

> “next model” / “next comparison”

Những câu đó không phải current state.

Source of truth cho tính toán là canonical notebook và frozen artifacts. Diễn giải review hiện tại theo `FINAL_CONSENSUS.md`; các audit trước là hồ sơ lịch sử, không phải verdict đang áp dụng.

---

# 42. Limitations cuối cùng

| Limitation | Ý nghĩa |
|---|---|
| Cross-sectional data | Không dự đoán future incidence |
| Self-reported outcome | Không phải lab-confirmed diagnosis |
| Không Type 1/Type 2 distinction | Không được gọi là Type 2-specific classifier |
| Concurrent comorbidities | Không suy causal |
| Internal validation | Chưa chứng minh transportability |
| Unweighted ML | Không claim national representative performance |
| No subgroup/fairness study | Chưa claim fair deployment |
| No clinical DCA | Chưa claim clinical net benefit |
| Fixed baselines | Không đại diện performance tối ưu của từng algorithm |
| 200 primary bootstrap reps | Robustness 5,000 reps dùng cho top-4 discrimination checks |
| Schema 284 vs 283 | Đã giải thích: payload/layout283; landing page284; không mất cột |

---

# 43. Điểm mạnh lớn nhất của study

| Điểm mạnh | Vì sao |
|---|---|
| Dataset lớn | 342k modeling respondents |
| Một protocol chung | Fairer model comparison |
| Leakage control | Preprocessing nằm trong pipeline/CV |
| Không thấy tuning hyperparameter/threshold | Không loại trừ ảnh hưởng của test exposure trong thiết kế tuần tự |
| Nhiều metric | Không bị Accuracy đánh lừa |
| Calibration included | Không chỉ nhìn discrimination |
| Paired comparisons | Đúng vì model predict cùng respondents |
| Model complexity comparison | Từ LR → tree → ensemble → SVM → generative |
| Transparent limitations | Không overclaim |
| Reproducible | Hash + code + configs + CI gates |

---

# 44. Điểm yếu quan trọng nhất tùy câu hỏi của thầy

Nếu hỏi **giá trị khoa học mới**, điểm yếu là novelty còn vừa phải: đã có nhiều nghiên cứu BRFSS/diabetes classifiers; dataset mới và bảy model chưa đủ chứng minh một phương pháp mới.

Nếu hỏi **ý nghĩa lâm sàng**, nhãn là tự báo cáo đã được thông báo mắc bệnh, vốn có thể hỏi trực tiếp; study chưa chứng minh giá trị thay thế xét nghiệm hay phát hiện người chưa được chẩn đoán.

Nếu hỏi **tính khái quát**, test cùng nguồn dữ liệu, không survey-design inference và chưa phân tích subgroup nên chưa thể chuyển kết luận sang quần thể khác.

Nếu hỏi **kỷ luật thiết kế**, cần trình bày đúng A01/A02 ở mục 8, không giấu test exposure cũng không phóng đại thành contamination đã chứng minh.

Đối với một nghiên cứu nhỏ để học và báo cáo, đóng góp có thể bảo vệ là kiểm tra một pipeline chung và minh họa vì sao metric/ngưỡng/calibration dẫn đến kết luận khác nhau. Mức đóng góp có phù hợp yêu cầu của thầy hay không cần được trao đổi, chưa có bảo đảm xuất bản.

---

# 45. Một câu để nhớ toàn bộ study

> **Nghiên cứu dùng BRFSS 2025 để xây dựng một benchmark thống nhất cho 7 cấu hình classifier nhằm phân loại trạng thái tự báo cáo đã được chẩn đoán tiểu đường. Với preprocessing được cô lập trong training/folds nhưng còn giới hạn lựa chọn biến và test exposure đã nêu, khi đánh giá trên cùng 68,508 respondents, Logistic Regression, Gradient Boosting, XGBoost và Linear SVM có ROC-AUC quan sát gần nhau (~0.826), trong khi các model khác thể hiện các trade-off rất khác về Recall, Precision, F1 và calibration. Kết quả ủng hộ cách diễn giải theo trade-off thay vì tuyên bố một model thắng tuyệt đối, và toàn bộ kết luận chỉ giới hạn ở descriptive internal cross-sectional benchmark chứ chưa phải clinical deployment.**

---

# 46. Nếu anh đọc Kaggle notebook, hãy đọc theo thứ tự này

| Phần notebook | Cần hiểu gì |
|---|---|
| Part I | Dataset, target, literature, feature choices |
| Part II | Recoding, split, preprocessing, leakage prevention |
| Model 01–07 | Mỗi estimator hoạt động và cho kết quả gì |
| Consolidated Comparison | 7 model khác nhau thế nào |
| Paired Bootstrap | Difference có đủ lớn so với uncertainty không |
| McNemar | Classification errors có khác nhau tại threshold không |
| ROC/PR plots | Ranking performance |
| Calibration | Probability quality |
| Feature diagnostics | Model đang dựa vào tín hiệu nào |
| Final Interpretation | Claim nào được phép và không được phép |

---

# 47. Trạng thái cuối cùng

**Đồng thuận: MINOR REVISION FOR STATED SCOPE.**

Metric/calibration/bootstrap đã được tái tính khớp ở vòng audit trước; giới hạn vẫn được giữ. Không có unresolved FATAL/MAJOR scientific-validity defect được chứng minh. Chưa submission-ready không ngăn việc trình bày minh bạch một báo cáo học thuật với thầy.

**External/clinical validation: CHƯA CÓ.**

Study hiện phù hợp để:

- đọc hiểu và báo cáo với giảng viên hướng dẫn;
- methodological peer review;
- viết manuscript về internal benchmark;
- làm nền cho experiment tiếp theo.

Study hiện **chưa phù hợp** để tuyên bố:

- clinical deployment;
- national screening model;
- future diabetes prediction;
- externally validated model;
- fair model across demographic groups.

---

## Freeze reference

```text
Freeze branch:
freeze/brfss-2025-final-review

Frozen scientific commit:
a2a0ba498919fa8c96a1bf8b491ee81b496b5f32
```

Các tài liệu giải thích bổ sung được thêm sau freeze chỉ làm rõ cách đọc/reporting, không thay đổi frozen model predictions hay numerical benchmark.

## Chi tiết supplement sau kiểm toán độc lập

Calibration dùng hồi quy logistic `y ~ intercept + slope × logit(p)` với `p` chặn tại `[10^-6, 1-10^-6]`. Intercept này không phải calibration-in-the-large (CITL, slope cố định bằng1). LR có CITL−0.00323, GB−0.00276. Slope DT/RF/GNB nhạy với mức chặn; Brier là trung bình `(p − y)²`, tức sai số xác suất tổng thể, không phải thước đo calibration thuần túy. Joint intercept và slope được fit đồng thời bằng logistic MLE không penalty; CITL giữ slope = 1. SVM bị loại khỏi phép tính này vì chỉ có margin. Không áp dụng hệ số calibration để thay primary predictions.

Bootstrap5.000 cũ được tái lập chính xác với PCG64, seed20251010, không shuffle chỉ số sau lấy mẫu. Ba stream bổ sung cho thấy AP LR–XGB sát ranh giới; khoảng đồng thời Bonferroni cho6contrast chứa0. Không coi đây là superiority hay equivalence được xác nhận. Khoảng bootstrap cố định mô hình và class counts, không bao gồm biến thiên huấn luyện hay survey-design uncertainty.

P03 gộp pregnancy-related diabetes vào positive và prediabetes vào negative; khác target của ta. Fold isolation của MICE/selection/SMOTE trong P03 chưa được chứng minh. `SLEPTIM1` có precedent trực tiếp ở appendix P02, không được xác minh từ P03; `PERSDOC3` được giữ như lựa chọn domain healthcare-access của study. Xem bảng chứng cứ biến và literatureclaims mới. Các hình dùng cho báo cáo nằm ở `supplement/astra_figures/`, đã sửa nhãn AP và số bin calibration thực tế.

Ngày phỏng vấn (`IDATE`) đã kiểm tra: **05/01/2025–16/03/2026** trong cả raw và eligible cohort, không có ngày không đọc được. Vì vậy BRFSS 2025 là tên bản phát hành khảo sát, không phải khẳng định mọi cuộc phỏng vấn diễn ra trong năm2025.


# 48. Những câu thầy có thể hỏi, và cách trả lời

| Câu hỏi | Câu trả lời có thể bảo vệ |
|---|---|
| Em đang giải bài toán gì? | Phân loại câu trả lời tự báo cáo đã được thông báo mắc đái tháo đường trong BRFSS 2025, tại cùng thời điểm khảo sát. |
| Đã biết nhãn rồi, tại sao còn dự đoán? | Nhãn đã biết được dùng để học và đánh giá một benchmark phương pháp. Em chưa chứng minh cần dùng model thay việc hỏi trực tiếp; clinical usefulness vẫn là giới hạn. |
| Có phải phát hiện sớm type 2 không? | Không. `DIABETE4` không xác nhận type 2 bằng xét nghiệm và cohort không theo dõi mắc mới. |
| Đóng góp mới là gì? | So sánh bảy cấu hình trên cùng pipeline/sample, đọc nhiều metrics và kiểm tra numerical reproducibility. Chưa có thuật toán mới hay chứng minh vượt state of the art. |
| Vì sao chọn 20 biến? | Literature/domain, coverage, tránh biến trực tiếp tiết lộ nhãn và giảm redundancy. Không có supervised performance-based selector đã được tìm thấy. |
| Cùng pipeline có thực sự công bằng? | Nó kiểm soát nhiều khác biệt giữa các model, nhưng có thể hợp model này hơn model khác; GNB trên one-hot là ví dụ. Không đại diện cấu hình tối ưu của mọi family. |
| Vì sao accuracy cao mà recall thấp? | Phần lớn mẫu là âm. LR đúng nhiều nhãn âm, nhưng ở ngưỡng 0,5 chỉ nhận 1.951/10.365 nhãn dương. |
| GNB recall cao thì chọn GNB được không? | Chưa. Nó cũng có 15.658 FP. Cần mục tiêu và so sánh operating points phù hợp, không chọn từ default recall đơn lẻ. |
| Có overfit không? | DT training accuracy gần 1 nhưng test AUC khoảng 0,602; đó là dấu hiệu rõ của overfitting. Không suy rằng mọi cây hay mọi DT tối ưu đều kém. |
| LR có thắng XGBoost không? | AP chênh nhỏ theo một exploratory contrast; AUC chưa phân biệt rõ. Không có overall superiority. |
| Vì sao không dùng SMOTE? | Giữ class distribution của sample và giảm một yếu tố thay đổi trong benchmark. Không khẳng định SMOTE luôn sai hoặc luôn làm giảm hiệu năng. |
| Có data leakage không? | Learned preprocessing được cô lập trong train/folds; không thấy tuning theo test. Có A01 test exposure và A02 pre-split coverage inspection, nhưng chưa chứng minh contamination/feature impact như cách gọi MAJOR trước đây. |
| Chưa external validation thì có báo cáo được không? | Có, với scope internal benchmark và giới hạn rõ. Chưa thể claim transportability hay triển khai. |
| 160 tests đã đủ chứng minh nghiên cứu đúng chưa? | Chưa. Chúng hỗ trợ engineering/reproducibility; validity còn phụ thuộc thiết kế, nhãn, uncertainty và phạm vi claim. |
| Tiếp theo làm gì? | Xin thầy xác định mục tiêu đóng góp tiếp theo; khóa câu hỏi/protocol trước khi chạy thí nghiệm mới, không thêm model chỉ để tăng số lượng. |

## Tự kiểm tra trước buổi gặp

Không nhìn tài liệu, anh thử giải thích: nhãn dương/âm là gì; 356.158 giảm còn 342.539 vì sao; median được học ở đâu; vì sao AUC và recall khác nhau; paired bootstrap lấy lại thứ gì; vì sao không có universal winner. Nếu vướng câu nào, đọc lại mục tương ứng thay vì học thuộc mọi parameter.

# 49. Cấu hình và cơ chế của bảy model

| Model | Cách hiểu ngắn | Cấu hình chính đã thực thi |
|---|---|---|
| LR | Cộng các đóng góp tuyến tính trên log-odds, rồi chuyển thành xác suất; L2 hạn chế hệ số quá lớn | `penalty=l2`, `C=1`, `solver=lbfgs`, `max_iter=1000` |
| DT | Chia dữ liệu theo chuỗi điều kiện; cây sâu có thể học chi tiết riêng của train | `criterion=gini`, `max_depth=None`, `min_samples_leaf=1`, seed 42 |
| RF | Nhiều cây fit trên bootstrap samples, ngẫu nhiên tập features ở mỗi split rồi gộp dự đoán | 100 cây, `max_features=sqrt`, `max_depth=None`, `bootstrap=True`, seed 42 |
| GB | Thêm cây nhỏ tuần tự theo hướng giảm loss của ensemble | 100 cây, depth 3, `learning_rate=0.1`, `loss=log_loss`, seed 42 |
| XGBoost | Boosted trees với regularization và tối ưu quá trình fit | 100 cây, depth 6, `learning_rate=0.3`, `reg_lambda=1`, `tree_method=hist`, seed 42 |
| Linear SVM | Tìm ranh giới tuyến tính với margin; margin không phải probability | `C=1`, `loss=squared_hinge`, `dual=auto`, `max_iter=10000`, seed 42 |
| GNB | Dùng xác suất lớp và phân phối từng feature, giả định độc lập có điều kiện | `priors=None`, `var_smoothing=1e-9` |

Đây là tóm tắt, không thay cho configs đầy đủ trong `../../02_Implementation/BRFSS_Survey/models/model_01_...json` đến `model_07_...json`. XGBoost còn có `verbosity=0` trong executable code, chỉ kiểm soát logging. Không thực hiện hyperparameter search để tối ưu từng family trong benchmark này.

## CV khác test và bootstrap như thế nào?

| Thao tác | Có fit lại model không? | Dùng dữ liệu nào? | Mục đích |
|---|---|---|---|
| 5-fold CV | Có, mỗi training fold fit pipeline riêng | Chỉ development set | Mô tả độ biến thiên giữa folds trong development |
| Fit cuối rồi test | Có một fit trên toàn development; test chỉ predict | Development → internal test | Đo performance của fitted configuration |
| Bootstrap supplement | Không | Frozen test labels/scores | Ước lượng uncertainty có điều kiện và paired differences |
| Calibration diagnostic | Fit hồi quy đánh giá `y` theo logit(score), không refit classifier | Frozen test probabilities | Đo mức lệch calibration; không tạo primary results mới |

Fit hồi quy calibration trên test là một phép **đánh giá**. Nếu dùng chính hệ số đó để chỉnh probability rồi coi test ấy là đánh giá độc lập của model đã chỉnh, câu hỏi và thiết kế sẽ khác; study không làm bước đó.

# 50. Nguồn để anh mở khi cần chứng minh một con số

| Claim / câu hỏi | Evidence cụ thể |
|---|---|
| Cohort, nhãn, số loại | [Data evidence](../../02_Implementation/BRFSS_Survey/qc/astra_data_evidence.json), keys `target_counts`, `cohort`, `split` |
| Ngày phỏng vấn | [Dates](../../02_Implementation/BRFSS_Survey/qc/astra_interview_dates.json) |
| Đúng 20 biến, đơn vị và special codes | [Variable audit](../../02_Implementation/BRFSS_Survey/qc/astra_variable_audit.md) và codebook entries |
| Recoding, split, học preprocessing | [Canonical notebook](../../02_Implementation/BRFSS_Survey/kaggle/notebook/BRFSS_2025_Diabetes_Classification.ipynb), Part II và model pipelines |
| Metrics/confusion counts | [Point metrics](../../02_Implementation/BRFSS_Survey/qc/astra_statistics_point_metrics.csv), hàng của từng model |
| Calibration intercept/slope | [Calibration CSV](supplement/calibration_intercept_slope.csv); [công thức](supplement/README.md) |
| Six paired contrasts | [5.000-replicate CSV](supplement/top4_paired_bootstrap_5000_robustness.csv) |
| Holm McNemar | [McNemar CSV](../../02_Implementation/BRFSS_Survey/qc/astra_statistics_mcnemar.csv) |
| Câu nào được claim sau review? | [Final consensus](FINAL_CONSENSUS.md) |
| Literature hỗ trợ tới đâu? | [Claim-level evidence](../../02_Implementation/BRFSS_Survey/qc/astra_literature_claims.json); không coi paper citation là chứng nhận pipeline |

Nguồn ngoài: [CDC BRFSS 2025](https://www.cdc.gov/brfss/annual_data/annual_2025.html); [Xie et al. 2019, Methods và Appendix](https://www.cdc.gov/pcd/issues/2019/19_0109.htm); [Li et al. 2024](https://doi.org/10.1371/journal.pone.0311222); [TRIPOD+AI 2024](https://doi.org/10.1136/bmj-2023-078378). Vai trò và bibliographic details của ba bài tham khảo chính nằm trong báo cáo ngắn. Các paper khác ở mục 31 chỉ là bối cảnh từ literature audit đã có, không mở rộng thành một systematic review.
