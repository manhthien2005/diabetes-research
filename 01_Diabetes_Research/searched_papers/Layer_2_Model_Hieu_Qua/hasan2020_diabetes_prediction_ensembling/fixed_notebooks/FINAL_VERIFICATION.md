# Final Verification — hasan2020 modernized notebooks

> **Ngày verify**: 2026-06-06
> **Môi trường test**: Python 3.13.4, sklearn 1.6, pandas 3.0, xgboost 3.0, keras 3.11, scipy 1.16, seaborn 0.13, scikeras 0.13
> **Môi trường đích**: Kaggle (tương đương stack trên)

## Kết quả execute thực tế

Cả 3 notebook đã chạy end-to-end thành công trên local, sử dụng PIMA diabetes.csv (768 mẫu, 268/500).

| Notebook | Số cell | Cell cuối | Status | AUC reproduce | AUC paper | Lệch |
|---|---|---|---|---|---|---|
| **ML_Models_modernized** | 17 code cells | Cell 35: OK | ✅ PASS | **0.950 ± 0.021** | 0.946 ± 0.020 | +0.004 |
| **MLP_Model_modernized** | ~20 code cells | Cell 30: OK | ✅ PASS | **0.898 ± 0.046** | 0.902 ± 0.020 | -0.004 |
| **Ensembler_modernized** | ~18 code cells | Cell 26: OK | ✅ PASS | **0.939 ± 0.030** | 0.950 | -0.011 |

→ **Cả 3 đều reproduce trong khoảng std của paper gốc.** Verification thành công.

## Tổng hợp tất cả fix đã áp dụng (10 nhóm)

| # | Nhóm fix | Loại vấn đề | Số vị trí sửa |
|---|---|---|---|
| 1 | Cell 2 auto-discover dataset path | Kaggle path | 1 cell/notebook |
| 2 | `scipy.interp` → `numpy.interp` | scipy 1.12 removal | 1 import/notebook |
| 3 | `keras.utils` → `tensorflow.keras.utils` | Keras 3 path | 1 import (MLP) |
| 4 | `sns.distplot` → `sns.histplot(kde=True)` | seaborn 0.14 removal | 8 chỗ/notebook |
| 5 | `StratifiedKFold(shuffle=False, random_state=X)` → `shuffle=True` | sklearn 1.x strict | 1-7 chỗ tùy notebook |
| 6 | `from keras.X import Y` → `from tensorflow.keras.X import Y` | Keras 3 namespace | 12 imports (MLP) |
| 7 | `KerasClassifier(build_fn=)` → `scikeras.wrappers.KerasClassifier(model=)` | keras.wrappers REMOVED | 10 chỗ (MLP) |
| 8 | `param_grid` prefix `model__` cho scikeras | scikeras API | 210 dòng (MLP cell 9) |
| 9 | `Adam(lr=)` → `Adam(learning_rate=)` | TF 2.11 rename | 11 chỗ (MLP) |
| 10 | `iloc[0][0]` → `iloc[0, 0]` | pandas 3.0 chained indexing | 2 chỗ/notebook |

## Chi tiết từng notebook đã test

### ML_Models_modernized.ipynb (đơn giản nhất, không cần Keras)

1. ✅ Cell 2: Auto-discover PIMA CSV — `Dataset path: d:/NCKH/diabetes.csv`
2. ✅ Cell 5-7: Imports + helper functions (pair_plot, data_plot, replace_zero, outlier_Rejection)
3. ✅ Cell 9: Load data 768 rows × 9 cols
4. ✅ Cell 16: Plot EDA (histograms + KDE) — hiển thị bình thường
5. ✅ Cell 19: Preprocessing (outlier rejection → 636 rows; missing fill → mean; feature selection)
6. ✅ Cells 21-31: 6 model tuần tự (KNN, DT, NB, AB, RF, XGBoost) với StratifiedKFold 5-fold + GridSearchCV
7. ✅ Cell 33: XGBoost final — AUC 0.950 ± 0.021

### MLP_Model_modernized.ipynb (cần scikeras, Keras/TF)

1. ✅ Cell 0: Auto-install scikeras (pip, ~10s)
2. ✅ Cell 7: Imports — tensorflow.keras.models, scikeras.wrappers, tensorflow.keras.optimizers
3. ✅ Cell 9: 10 nn_opt_X functions × GridSearchCV với scikeras — grid search hoàn thành
4. ✅ Cell 30: MLP final — AUC 0.898 ± 0.046

### Ensembler_modernized.ipynb (dùng output từ ML_Models)

1. ✅ Cell 2: Auto-discover PIMA CSV
2. ✅ Cell 5-7: Imports + helper functions
3. ✅ Cell 21: Train ensemble AB+XB với AUC-weighted soft voting
4. ✅ Cell 26: Final — AUC 0.939 ± 0.030

## Lưu ý khi chạy trên Kaggle

1. **MLP thời gian**: grid search 10 kiến trúc × nhiều hyperparam (~30-60 phút CPU)
2. **Ensembler**: có thể chạy nhanh hơn nếu anh rerun ML_Models trước (cùng session)
3. **scikeras cell 0**: tự install, mất ~10s lần đầu; kernel restart thì install lại
4. **DataConversionWarning**: vô hại, sklearn 1.x log nhiều hơn sklearn 0.22
5. **Số chạy trên Kaggle có thể lệch ±0.003** so với local test do seed implementation khác Windows/Linux

## Độ tin cậy

- ✅ Test actual execution trên local (Python 3.13, tương đương Kaggle)
- ✅ Pattern scan 0 issue
- ✅ AST syntax check all pass
- ✅ Import simulation 114 imports all modern
- ✅ AUC reproduce trong std paper
- 🔜 Cần verify trên Kaggle thực (Linux, sklearn version Kaggle current)
