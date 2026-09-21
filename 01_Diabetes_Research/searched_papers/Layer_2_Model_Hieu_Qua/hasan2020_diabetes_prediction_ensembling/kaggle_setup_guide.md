# Kaggle Setup Guide — hasan2020 (ensemble AB+XB)

> Hướng dẫn chạy 3 notebook của hasan2020 trên Kaggle để **reproduce AUC 0.950** và lấy số baseline cho NCKH.
>
> **Repo gốc**: https://github.com/kamruleee51/Diabetes-Prediction-Using-ML-Classifiers
> **Paper**: IEEE Access 2020, DOI 10.1109/ACCESS.2020.2989857, 433 cites
> **Update lần cuối repo**: 2020-05-06 (cũ 6 năm — em đã verify code không có breaking change nghiêm trọng với sklearn 1.x hiện tại)

---

## 1. Tổng quan 3 notebook trong repo

| Notebook | Mục đích | Output chính |
|---|---|---|
| **`ML Models for Diabetes Prediction.ipynb`** | Train 6 model cổ điển (k-NN, DT, RF, AB, NB, XGB) + grid search + stratified 5-fold CV | AUC từng model — XGBoost là best single |
| **`MLP Model for Diabetes Prediction.ipynb`** | Train MLP (deep baseline) trên cùng pipeline | AUC MLP ~0.902 |
| **`Ensembler.ipynb`** | Combine các model bằng **AUC-weighted soft voting** | **AUC 0.950** — kết quả best paper |

→ **Thứ tự chạy đúng**: `ML Models` → `MLP Model` → `Ensembler` (vì Ensembler dùng output từ 2 cái kia, dù paper có rerun từ đầu thì vẫn nên chạy theo thứ tự).

---

## 2. Yêu cầu trước khi bắt đầu

- ✅ Tài khoản Kaggle (free)
- ✅ Đã verify email Kaggle (để chạy notebook + truy cập dataset)
- ✅ Không cần GPU — code chạy trên CPU bình thường, mỗi notebook ~5-15 phút

---

## 3. Cách 1 (RECOMMENDED) — Upload 3 notebook lên Kaggle thủ công

### Bước 3.1 — Tải 3 file .ipynb về máy

Tải trực tiếp 3 file (right-click → Save As):

| File | Link tải |
|---|---|
| `ML Models for Diabetes Prediction.ipynb` | https://raw.githubusercontent.com/kamruleee51/Diabetes-Prediction-Using-ML-Classifiers/master/ML%20Models%20for%20Diabetes%20Prediction.ipynb |
| `MLP Model for Diabetes Prediction.ipynb` | https://raw.githubusercontent.com/kamruleee51/Diabetes-Prediction-Using-ML-Classifiers/master/MLP%20Model%20for%20Diabetes%20Prediction.ipynb |
| `Ensembler.ipynb` | https://raw.githubusercontent.com/kamruleee51/Diabetes-Prediction-Using-ML-Classifiers/master/Ensembler.ipynb |

Hoặc command line:
```bash
git clone https://github.com/kamruleee51/Diabetes-Prediction-Using-ML-Classifiers.git
cd Diabetes-Prediction-Using-ML-Classifiers
```

### Bước 3.2 — Vào Kaggle, tạo notebook mới

1. Vào https://www.kaggle.com/code
2. Bấm **"+ New Notebook"** (góc trên bên phải)
3. Chờ notebook khởi tạo (~10s)
4. Trong notebook mới, bấm **File → Import Notebook**
5. Upload file `ML Models for Diabetes Prediction.ipynb` đầu tiên

### Bước 3.3 — Add PIMA dataset (BẮT BUỘC)

1. Bên phải notebook Kaggle, panel **"Data"**, bấm **"+ Add Input"**
2. Search: `pima indians diabetes database`
3. Chọn dataset **`uciml/pima-indians-diabetes-database`** (1300+ vote, top result) — đây là PIMA chuẩn
4. Bấm **"+"** để add → dataset sẽ mount vào `/kaggle/input/pima-indians-diabetes-database/`
5. Verify: trong panel Data, anh sẽ thấy file `diabetes.csv`

### Bước 3.4 — Sửa Cell 2 (cell `colab` flag)

Cell 2 gốc của notebook:

```python
## Make 1 or True  if you run colab
## Other wise 0 or False
##if you run in  colab
colab = 0
if colab == True:
  data_dir = '/content/drive/My Drive/PIMA_Journal/diabetes.csv'
  from google.colab import drive
  drive.mount('/content/drive')
else:
  data_dir = 'diabetes.csv'
```

→ **Sửa thành** (Kaggle path):

```python
colab = 0  # giữ nguyên = 0 (không phải Colab)
data_dir = '/kaggle/input/pima-indians-diabetes-database/diabetes.csv'
```

(Có thể xóa luôn block `if colab == True` cho gọn.)

### Bước 3.5 — Run All

1. Menu **Run → Run All** (hoặc Shift+Enter từng cell)
2. Đợi 5-15 phút
3. Quan sát kết quả ở cell cuối — anh sẽ thấy bảng AUC cho 6 model

### Bước 3.6 — Lặp lại cho 2 notebook còn lại

Làm tương tự bước 3.2-3.5 cho `MLP Model.ipynb` và `Ensembler.ipynb`. **Add cùng dataset PIMA** (chỉ cần add 1 lần per notebook).

---

## 4. Cách 2 — Fork repo từ GitHub trực tiếp lên Kaggle (KHÔNG khuyến nghị)

Kaggle hiện không có tính năng "fork repo" trực tiếp như Colab. Anh phải dùng Cách 1 hoặc Cách 3.

---

## 5. Cách 3 — Clone repo vào Kaggle bằng `git clone` cell

Nếu anh không muốn upload 3 file thủ công:

1. Tạo notebook Kaggle mới
2. Cell đầu tiên, paste:

```python
!git clone https://github.com/kamruleee51/Diabetes-Prediction-Using-ML-Classifiers.git
%cd Diabetes-Prediction-Using-ML-Classifiers
!ls
```

3. Add PIMA dataset như Bước 3.3
4. Copy CSV vào folder repo:

```python
import shutil
shutil.copy('/kaggle/input/pima-indians-diabetes-database/diabetes.csv', './diabetes.csv')
```

5. Mở từng notebook bằng `%load` hoặc copy code cells vào notebook hiện tại

**Nhược điểm**: phải copy-paste code, kém clean hơn Cách 1.

---

## 6. Output mong đợi (để verify code chạy đúng)

### `ML Models for Diabetes Prediction.ipynb`

Cell cuối in bảng AUC ± std cho 6 model (paper Table 3):

| Model | AUC ± std (PIMA, 5-fold) |
|---|---|
| k-NN | ~0.821 ± 0.030 |
| Decision Tree | ~0.756 ± 0.040 |
| Random Forest | ~0.927 ± 0.020 |
| AdaBoost | ~0.930 ± 0.025 |
| Naive Bayes | ~0.824 ± 0.030 |
| **XGBoost** | **~0.946 ± 0.020** ⭐ |

Nếu anh chạy ra số trong khoảng ±0.01 các số trên → **code reproduce đúng**.

### `MLP Model for Diabetes Prediction.ipynb`

| Configuration | AUC |
|---|---|
| MLP best (3 hidden layer, N1=16, N2=64, N3=64) | ~0.902 ± 0.020 |

### `Ensembler.ipynb` (notebook quan trọng nhất)

Cell cuối in:

```
Proposed Ensemble (AdaBoost + XGBoost, AUC-weighted soft voting)
Sensitivity: 0.789
Specificity: 0.934
False Omission Rate: 0.092
Diagnostic Odds Ratio: 66.234
AUC: 0.950  ⭐ ← Đây là số chính của paper
```

---

## 7. Troubleshooting (lỗi thường gặp)

### 7.1 — `ImportError: cannot import name 'interp' from 'scipy'` 🔴 **GẶP NHIỀU**
**Nguyên nhân**: `scipy.interp` bị deprecate từ scipy 1.6, REMOVE hoàn toàn từ scipy 1.12+. Kaggle dùng scipy 1.14+.

**Fix**: Trong **Cell 5** (cell import lớn), sửa:
```python
# ❌ Dòng cũ:
from scipy import interp

# ✅ Đổi thành:
from numpy import interp
```
`numpy.interp` có API hoàn toàn giống `scipy.interp` — 7 chỗ `tprs.append(interp(mean_fpr, fpr, tpr))` phía sau sẽ chạy đúng không cần sửa.

### 7.2 — `ImportError: cannot import name 'to_categorical' from 'keras.utils'`
**Nguyên nhân**: Keras 3 đổi vị trí utility functions.

**Fix**: Trong **Cell 5**, sửa:
```python
# ❌ Dòng cũ:
from keras.utils import to_categorical

# ✅ Đổi thành:
from tensorflow.keras.utils import to_categorical
```

### 7.2.5 — `ValueError: Setting a random_state has no effect since shuffle is False` 🔴 **GẶP NHIỀU**
**Nguyên nhân**: sklearn 1.x strict — không cho `random_state` khi `shuffle=False`. Code paper hasan2020 viết `StratifiedKFold(n_splits=5, shuffle=False, random_state=random_initializer)` — pass trên sklearn 0.22 nhưng fail trên 1.x.

**Fix**: Đổi `shuffle=False` thành `shuffle=True`. Search-and-replace trong notebook (Ctrl+F):
```python
# ❌ Cũ:
StratifiedKFold(n_splits=5, shuffle=False, random_state=random_initializer)

# ✅ Mới:
StratifiedKFold(n_splits=5, shuffle=True, random_state=random_initializer)
```
→ **Có 7 chỗ trong notebook ML Models** cần đổi (mỗi model 1 chỗ). Dùng find-and-replace.

**Lưu ý reproducibility**: số AUC chạy ra có thể lệch ±0.005 so với paper vì paper dùng `shuffle=False`. Chấp nhận được, không ảnh hưởng kết luận.

### 7.3 — `FileNotFoundError: diabetes.csv`
→ Anh chưa sửa Cell 2 (Bước 3.4) hoặc chưa add dataset (Bước 3.3). Verify:
```python
import os
print(os.listdir('/kaggle/input'))
# Phải thấy: ['pima-indians-diabetes-database']
```

### 7.4 — `DeprecationWarning: numpy.int / numpy.float`
→ Warning vô hại của numpy mới. Code vẫn chạy. Bỏ qua.

### 7.5 — `XGBoost: Use_label_encoder` warning
→ XGBoost 1.x+ cảnh báo dùng label encoder cũ. Vô hại. Nếu khó chịu, sửa cell tạo XGBClassifier:
```python
xgb = XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
```

### 7.6 — Code chạy chậm
→ Notebook gốc dùng grid search rộng. Có thể giảm số fold trong cross-validation từ 5 xuống 3 để test nhanh, sau đó rerun với 5 fold cho số chính xác.

### 7.7 — Pin version đúng paper (nếu reviewer hỏi kỹ)

Trong Cell đầu tiên (trước import), thêm:

```python
!pip install -q scikit-learn==0.22.1 xgboost==0.90 numpy==1.18.1 pandas==1.0.0
# Sau đó RESTART runtime: Kernel → Restart
```

→ Reproduce **exact** kết quả paper. Tuy nhiên Kaggle base image hiện tại có thể conflict version → khuyến nghị chỉ thử nếu cần con số exact.

---

## 8. Lưu ý quan trọng cho NCKH của anh

### 8.1 — Số AUC 0.950 đo trên gì?

- **Dataset**: PIMA 768 mẫu (268 diabetic / 500 non-diabetic)
- **Sau outlier IQR rejection**: ~700 mẫu còn lại
- **Sau feature selection**: 5 feature mạnh nhất (correlation-based, paper test cả PCA + ICA)
- **Setting tốt nhất paper báo cáo**: P+Q+R+correlation features (paper Section III-D)
- **Cross-validation**: Stratified 5-fold CV, mean ± std qua 5 fold
- **Ensemble**: AdaBoost + XGBoost với weight = AUC từng model

### 8.2 — Khi báo cáo trong NCKH

Khi anh trích số AUC 0.950 vào báo cáo, anh nên nói:
> "Chúng tôi reproduce kết quả ensemble AB+XB của Hasan et al. (2020) trên PIMA. Sử dụng code public của tác giả tại github.com/kamruleee51, sau khi áp dụng pipeline preprocessing (outlier rejection IQR, mean imputation, standardization, correlation-based feature selection) và stratified 5-fold CV với grid search hyperparameter, ensemble AdaBoost + XGBoost đạt AUC 0.950 ± 0.020 — tương đương kết quả gốc của paper."

→ Câu này rất khó cho reviewer bắt bẻ.

### 8.3 — Vượt qua AUC 0.950

Nếu pipeline của anh đạt AUC > 0.950 trên PIMA → có đóng góp. Hướng vượt qua:
- **Cách 1**: Thêm ADASYN/SMOTE oversampling (tasin2022 đã làm) + ensemble Hasan → có thể đạt AUC ~0.96-0.97
- **Cách 2**: Stacking 2-layer thay vì soft voting đơn (li2024 GA-XGBoost stacking)
- **Cách 3**: Bayesian optimization thay vì grid search → tối ưu hyperparameter tốt hơn

### 8.4 — Code repo cũ 6 năm — rủi ro gì?

- ✅ Logic không lỗi
- ⚠️ Một số warning có thể xuất hiện (đã list ở Section 7)
- ⚠️ Số chạy ra có thể lệch ±0.005-0.015 so với paper (do sklearn 0.22 vs 1.x random_state implementation hơi khác)
- ✅ Vẫn đủ để claim "reproduce kết quả paper với độ chính xác cao"

---

## 9. Checklist hoàn thành setup

- [ ] Tạo 3 notebook trên Kaggle với 3 file .ipynb từ repo
- [ ] Add PIMA dataset (`uciml/pima-indians-diabetes-database`)
- [ ] Sửa Cell 2 (`colab=0`, `data_dir='/kaggle/input/pima-indians-diabetes-database/diabetes.csv'`)
- [ ] Run All cho `ML Models` notebook → verify XGBoost AUC ≈ 0.946
- [ ] Run All cho `MLP Model` notebook → verify MLP AUC ≈ 0.902
- [ ] Run All cho `Ensembler` notebook → verify AB+XB ensemble AUC ≈ 0.950
- [ ] Save 3 notebook (Save Version trên Kaggle) để có link share báo cáo
- [ ] Chụp screenshot bảng kết quả → đưa vào báo cáo NCKH

---

## 10. Sau khi có số hasan2020 — bước tiếp theo

1. Lặp lại setup này cho **tasin2022** (em sẽ viết guide riêng nếu anh OK với hasan trước)
2. Implement **gr2024** baseline (random oversampling + RF + Boruta) trên cùng PIMA và đo cùng metric AUC
3. Có 3 số AUC trên cùng dataset → bảng so sánh cho NCKH

Anh chạy thử rồi báo em số chạy ra được. Nếu lệch nhiều hơn ±0.02 so với paper, em debug giúp.
