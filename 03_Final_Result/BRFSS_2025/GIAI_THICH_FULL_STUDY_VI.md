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

CDC ghi file XPT 2025 có **284 variables**, trong khi `pandas.read_sas()` expose **283 columns**.

Điểm này được ghi như một **schema audit note**, nhưng không phải blocker vì:

- target có đầy đủ;
- 20 predictors đều tồn tại;
- các biến leakage cần kiểm tra đều tồn tại;
- SHA-256 của source đúng;
- kết quả frozen reproduce được.

---

# 3. Target của nghiên cứu là gì?

Biến mục tiêu:

`DIABETE4`

| Giá trị BRFSS | Ý nghĩa | Xử lý |
|---:|---|---|
| 1 | Đã được chẩn đoán diabetes | Positive = 1 |
| 3 | Không có diabetes | Negative = 0 |
| 2 | Diabetes chỉ trong thai kỳ | Loại |
| 4 | Prediabetes / borderline | Loại |
| 7 | Don't know | Loại |
| 9 | Refused | Loại |
| Missing | Không có thông tin | Loại |

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
| Dự đoán diabetes trong tương lai | Không có prediction horizon |
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
| Healthcare access | insurance / cost-related access |
| Cardiometabolic | hypertension, cholesterol |
| Comorbidity | coronary disease, stroke, kidney disease |
| Functional status | difficulty walking |
| Mental/physical health | unhealthy-day variables |

Danh sách exact variables nằm trong:

`docs/final_feature_set.md`

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

# 8. Train/Test Split

| Partition | n | Vai trò |
|---|---:|---|
| Train | 274,031 | preprocessing fitting + CV + model training |
| Test | 68,508 | final held-out internal evaluation |

Thiết kế:

```python
train_test_split(
    ...,
    test_size=0.20,
    stratify=y,
    random_state=42
)
```

## Vì sao stratify?

Positive class chỉ khoảng 15%.

Stratification giúp train và test giữ gần cùng class proportion.

## Test set có dùng tune model không?

**Không.**

Test không dùng để:

- chọn hyperparameter;
- optimize threshold;
- chọn feature;
- fit imputation;
- fit scaler;
- fit encoder.

Sau khi model specification được cố định, test được dùng cho final evaluation và paired comparisons.

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
- Sau preprocessing: khoảng **82 columns**

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

> Đây là **7 cấu hình model cố định được prespecify**.

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

Nó giảm variance so với single Decision Tree.

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

GNB giả định features có conditional Gaussian behavior trong từng class.

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

Nếu model ngu ngốc luôn predict:

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
| Brier | Probability prediction có chính xác/calibrated không |

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

## Calibration supplement

| Model | Intercept | Slope | Brier |
|---|---:|---:|---:|
| Logistic Regression | +0.0135 | 1.0133 | 0.1033 |
| Gradient Boosting | +0.1128 | 1.0897 | **0.1031** |
| XGBoost | -0.0776 | 0.9376 | 0.1035 |
| Random Forest | -0.4233 | 0.6778 | 0.1076 |
| Decision Tree | -1.3948 | 0.0433 | 0.2134 |
| Gaussian NB | -1.6963 | 0.0970 | 0.2523 |

Một model calibration lý tưởng thường hướng tới:

- intercept ≈ 0;
- slope ≈ 1.

LR / GB / XGB tốt hơn nhiều so với DT / GNB.

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

Primary notebook dùng **200 bootstrap replicates**.

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

# 25. Logistic Regression được chọn làm baseline comparison

Không phải vì LR “thắng”.

Mà vì:

- Model 01;
- transparent;
- literature precedent mạnh;
- specification baseline được xác định trước.

Primary paired comparison:

> challenger − hoặc LR − challenger

tùy format artifact.

Điểm quan trọng là direction luôn được ghi rõ.

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

---

# 28. McNemar Test

Bootstrap dùng continuous/ranking metrics.

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

Do đó không được hỏi:

> “Tại sao AUC của study mình không bằng AUC paper?”

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

# 33. Vì sao study không có external validation?

Current design:

```text
BRFSS 2025
   ├── 80% train
   └── 20% internal test
```

Cả train và test cùng source/year.

Do đó đây là:

> **internal validation**

không phải:

- temporal validation;
- geographic external validation;
- independent cohort validation.

Pre-submission rigor gate chỉ trả đúng một minor flag:

> `NO_EXTERNAL_VALIDATION`

Đây là limitation chính còn lại.

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

Do đó data sparsity không phải vấn đề chính.

Tuy nhiên study vẫn ghi:

> chưa thực hiện formal prospective prediction-model sample-size calculation.

Không retroactively tạo một calculation chỉ để đẹp report.

---

# 37. Kết luận 7 model nên hiểu thế nào?

Không có một model “best” cho mọi mục tiêu.

| Mục tiêu | Model đáng chú ý |
|---|---|
| Đơn giản + discrimination tốt + calibration tốt | Logistic Regression |
| Brier thấp nhất / AP point estimate cao nhất | Gradient Boosting |
| ROC-AUC point estimate cao nhất | XGBoost |
| Precision / specificity cao | Linear SVM |
| Recall / F1 / Balanced Accuracy cao tại default threshold | Gaussian NB |
| Model yếu vì overfit | Decision Tree |
| Tree ensemble trung gian | Random Forest |

## Câu kết luận quan trọng nhất

> **Một Logistic Regression rất đơn giản đạt khả năng ranking gần như tương đương về mặt observed ROC-AUC với GB/XGBoost/Linear SVM trong internal test này; độ phức tạp model lớn hơn không tự động mang lại discrimination tốt hơn.**

Nhưng cần nhớ:

> “Không phát hiện khác biệt rõ” không phải “chứng minh equivalence”.

---

# 38. Đâu là model nên chọn?

Study không nên chọn model theo một metric duy nhất.

Ví dụ:

- cần interpretability → LR;
- cần high recall → GNB behavior đáng chú ý nhưng calibration/precision yếu;
- cần probability tốt → LR/GB/XGB phù hợp hơn;
- cần precision cao tại frozen boundary → SVM;
- cần balanced clinical operating point → phải **define clinical objective trước**, rồi threshold optimization trong development data.

Do đó current study kết thúc ở:

> **benchmark + trade-off interpretation**

chứ chưa phải:

> model deployment selection.

---

# 39. Reproducibility

Study có:

| Thành phần | Có |
|---|---|
| Source hash | ✅ |
| Fixed random seed | ✅ |
| Model configs | ✅ |
| One canonical notebook | ✅ |
| Frozen result artifacts | ✅ |
| Git history | ✅ |
| Kaggle canonical execution | ✅ |
| Read-back audit | ✅ |
| Pre-submission gate | ✅ |
| Prediction-model rigor manifest | ✅ |

Final pre-submission gate kiểm tra:

- đúng 1 notebook;
- 57 code cells compile;
- submission package tồn tại;
- calibration supplement hợp lệ;
- 5,000 bootstrap supplement hợp lệ;
- wording không overclaim;
- external validation status khai báo đúng.

Gate cuối:

> **SUCCESS**

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

Current source of truth là:

1. canonical notebook;
2. final audit;
3. final benchmark summary;
4. pre-submission board review.

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
| Schema 284 vs 283 | Được document, không ảnh hưởng selected fields đã verify |

---

# 43. Điểm mạnh lớn nhất của study

| Điểm mạnh | Vì sao |
|---|---|
| Dataset lớn | 342k modeling respondents |
| Một protocol chung | Fairer model comparison |
| Leakage control | Preprocessing nằm trong pipeline/CV |
| Không tune test | Giảm optimistic bias |
| Nhiều metric | Không bị Accuracy đánh lừa |
| Calibration included | Không chỉ nhìn discrimination |
| Paired comparisons | Đúng vì model predict cùng respondents |
| Model complexity comparison | Từ LR → tree → ensemble → SVM → generative |
| Transparent limitations | Không overclaim |
| Reproducible | Hash + code + configs + CI gates |

---

# 44. Điểm yếu lớn nhất của study

Nếu reviewer hỏi:

> “Điểm yếu lớn nhất là gì?”

Câu trả lời nên là:

> **Study chỉ thực hiện internal validation trên cùng nguồn BRFSS 2025. Vì vậy chưa chứng minh model generalize theo thời gian, địa lý hoặc sang population khác.**

Đây cũng là minor flag duy nhất của prediction-model rigor gate:

`NO_EXTERNAL_VALIDATION`

---

# 45. Một câu để nhớ toàn bộ study

> **Nghiên cứu dùng BRFSS 2025 để xây dựng một benchmark thống nhất cho 7 cấu hình classifier nhằm phân loại trạng thái tự báo cáo đã được chẩn đoán tiểu đường. Sau khi kiểm soát leakage và đánh giá trên cùng 68,508 respondents, Logistic Regression, Gradient Boosting, XGBoost và Linear SVM có discrimination gần như giống nhau về ROC-AUC (~0.826), trong khi các model khác thể hiện các trade-off rất khác về Recall, Precision, F1 và calibration. Kết quả ủng hộ cách diễn giải theo trade-off thay vì tuyên bố một model thắng tuyệt đối, và toàn bộ kết luận chỉ giới hạn ở internal cross-sectional benchmark chứ chưa phải clinical deployment.**

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

**Computational / methodological benchmark: PASS.**

**External/clinical validation: CHƯA CÓ.**

Study hiện phù hợp để:

- senior agent audit;
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
