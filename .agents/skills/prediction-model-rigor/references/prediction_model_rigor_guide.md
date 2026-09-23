# Clinical Tabular Prediction-Model Rigor Guide

A methodological and engineering reference for clinical tabular prediction models in diabetes research,
electronic health records (EHR), and public-health cohorts (e.g., NHANES).

---

## 1. Scope and Problem Formulation

Clinical prediction models estimate an individual patient's probability of having an undiagnosed condition
(diagnostic / opportunistic screening) or developing a condition over time (prognostic / risk prediction).
In this repository, the primary domain is **diabetes prediction and glycemic staging** on tabular clinical,
laboratory, and survey data (AGENTS.md §1).

### Three Prediction Horizons (AGENTS.md §3b)
1. **Cross-Sectional Classification**: Predicts current presence of undiagnosed diabetes or glycemic stage from
   features captured at the same assessment point (e.g., BRFSS, Sylhet, NHANES examination cross-sections).
2. **Early Detection / Opportunistic Screening**: Identifies high-risk individuals in asymptomatic or undiagnosed
   populations using non-invasive clinical attributes prior to laboratory confirmation.
3. **Long-Term Risk Prediction**: Predicts incident diabetes over an explicit follow-up interval ($t_0$ to $t_0 + \Delta t$)
   using longitudinal cohorts with well-defined baseline status.

### Outcome Definitions & Leakage Boundaries
- Target outcomes must be clearly operationalized (e.g., ADA diagnostic criteria: FPG $\ge$ 126 mg/dL, 2-hour OGTT $\ge$ 200 mg/dL,
  or $\text{HbA1c} \ge 6.5\%$).
- **Strict Leakage Prevention**: Never include diagnostic biomarkers (FPG, OGTT, HbA1c) as predictors when predicting current diabetes
  status. In staging models (Normal → Prediabetes → Diabetes), either omit the defining biomarkers or reframe the task as predicting
  future stage progression over a longitudinal follow-up period.

---

## 2. Missing-Data Handling & Predictor Operationalization

### Missingness Typology
- **Structural / Skip-Pattern Missingness**: Features deliberately skipped due to protocol logic (e.g., gestational diabetes questions
  skipped for male participants; questionnaire modules administered only to a random sub-sample). These must not be treated as random missingness.
- **Missing at Random (MAR) / Missing Completely at Random (MCAR)**: Routine non-response or unperformed laboratory tests.
- **Missing Not at Random (MNAR)**: Unmeasured due to clinical status (e.g., tests ordered selectively based on physician suspicion).

### Methodological Rules
1. **Never Impute Outcomes**: Participants missing the outcome definition must be accounted for in a STROBE/TRIPOD participant flow diagram
   and excluded prior to model fitting.
2. **Fold-Safe Imputation**: All imputation algorithms—simple median/mean, K-NN, or Iterative (MICE)—must estimate their parameters
   **strictly on the training fold** and apply those learned transforms to validation/test folds.
3. **Missing-Indicator Features**: Adding binary flags indicating whether a variable was missing must be justified clinically (e.g., test non-ordering
   as an informative clinical signal), not added automatically.
4. **Predictor Operational Definitions**: Document exact variable names, measurement units, collection timing relative to $t_0$, and coding transformations.
5. **No Silent Score Approximations**: When evaluating or comparing against established clinical risk scores (e.g., the ADA Diabetes Risk Test or FINDRISC),
   every component variable must be present per the official published criteria. If any component is substituted by a proxy variable,
   the model must be explicitly named an **"Adapted Risk Score"** and the modification formally disclosed.

---

## 3. Sample Size, Event Sufficiency, and Model Complexity

### Parameter-to-Event Considerations
In binary classification, the statistical power to estimate multivariable relationships without severe optimism is constrained by the
**number of events in the minority class** ($E$), not just total sample size ($N$).

$$\text{EPV} = \frac{E}{P}$$

where $P$ is the number of candidate predictor parameters (including dummy-coded levels of categorical predictors and non-linear terms).

### Avoiding Rigid Dogma
- **Do not treat $\text{EPV} \ge 10$ as an infallible binary rule.** Modern shrinkage and regularized regression (LASSO, Ridge, Elastic Net)
  can mitigate overfitting even when EPV is lower, whereas unpenalized maximum-likelihood estimation with flexible interactions can overfit
  even with EPV $> 20$.
- **Required Justification**: Explicitly report $N$, $E$, $N - E$, outcome prevalence, and $P$. When $P$ is large relative to $E$,
  require embedded regularization, pre-specified feature restriction, or fold-isolated feature screening.

### Complex-Survey Sample Sizes
When working with complex surveys (NHANES):
- Report both the unweighted sample size/events ($n, e$) and the survey-weighted population representation ($\hat{N}, \hat{E}$).
- Assess whether clustering (PSU) and stratification inflate standard errors (design effect $DEFF$).

---

## 4. Fold-Safe Resampling Architecture & Nested Cross-Validation

### The Non-Negotiable Rule of Separation
Any data-driven step that learns parameters from data must occur **inside the training folds**:
- Imputation (mean, median, MICE, K-NN)
- Continuous scaling and normalization (StandardScaler, MinMaxScaler, RobustScaler)
- Categorical encoding (TargetEncoder, OneHotEncoder)
- Feature screening and selection (SelectKBest, Boruta, LASSO, mutual information)
- Supervised dimensionality reduction (PCA, UMAP)
- Class imbalance resampling (SMOTE, ADASYN, random undersampling)
- Hyperparameter tuning and model selection

### Nested Cross-Validation Structure
When performance is reported from cross-validation and hyperparameters or feature subsets are tuned using the data:
- **Outer Loop** (e.g., 5-fold or 10-fold Stratified CV): Partitions the data into training and test folds. Outer test folds are held out
  completely and touched only to evaluate final model performance.
- **Inner Loop** (e.g., 5-fold Stratified CV inside each outer training fold): Tunes model hyperparameters, evaluates feature subsets,
  and selects optimal configurations.

```python
# Fold-safe nested cross-validation skeleton (scikit-learn)
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, GridSearchCV, cross_val_score

# 1. Construct fold-isolated pipeline
pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('selector', SelectKBest(score_func=f_classif, k=10)),
    ('classifier', LogisticRegression(penalty='elasticnet', solver='saga', random_state=42))
])

# 2. Configure hyperparameter grid
param_grid = {
    'selector__k': [5, 10, 15],
    'classifier__C': [0.01, 0.1, 1.0, 10.0],
    'classifier__l1_ratio': [0.2, 0.5, 0.8]
}

# 3. Configure inner and outer resampling
inner_cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=101)
outer_cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=202)

grid = GridSearchCV(pipe, param_grid=param_grid, cv=inner_cv, scoring='roc_auc', n_jobs=-1)

# 4. Estimate unbiased generalization performance
outer_scores = cross_val_score(grid, X, y, cv=outer_cv, scoring='roc_auc')
print(f"Outer AUROC: {outer_scores.mean():.4f} +/- {outer_scores.std():.4f}")
```

---

## 5. Class Imbalance and Resampling Safeguards

1. **Natural Prevalence Priority**: In clinical prediction, the base rate of the disease dictates the posterior probability.
   Artificial resampling (SMOTE, ADASYN) changes the apparent event rate, distorting predicted probabilities and ruining calibration.
2. **Resampling Within Training Folds Only**: If resampling is necessary (e.g., extreme imbalance with rare outcomes), use `imblearn.pipeline.Pipeline`
   to ensure resampling is applied **only to the training fold of each split**.
3. **Preserve Evaluation Prevalence**: Validation and test sets must **never** be resampled.
4. **Evaluate Calibration Degradation**: Assess whether resampling shifted the calibration intercept away from 0.0. Consider probability calibration
   or threshold adaptation as clinically sound alternatives.

---

## 6. Baseline Comparators

A complex machine learning model (e.g., XGBoost, Stacking Ensemble) is only clinically justified if it outperforms a transparent,
clinically interpretable baseline.
- **Mandatory Baseline**: Standard or penalized multivariable logistic regression (LASSO / Elastic Net).
- **Clinical Score Comparator**: Where relevant variables exist without approximation, benchmark against published validated risk scores
  (e.g., ADA Diabetes Risk Test, FINDRISC).
- **Identical Evaluation**: The baseline and complex models must be evaluated on the **exact same cross-validation folds** or test splits.

---

## 7. Model Evaluation, Calibration, and Clinical Utility

### Discrimination
- Report **AUROC** with 95% confidence intervals.
- Report **AUPRC** (Area Under the Precision-Recall Curve), which is more informative than AUROC when events are rare.
- **Never rely on overall accuracy** as the primary or sole metric (e.g., 95% accuracy in a 5% prevalence disease is trivial and uninformative).

### Calibration Assessment (Mandatory)
A clinical prediction model that discriminates well may still misestimate absolute risk, leading to inappropriate clinical decisions.
- **Calibration Intercept** (calibration-in-the-large): Target = 0.0. Measures whether probabilities are systematically systematically too high or too low.
- **Calibration Slope**: Target = 1.0. A slope $< 1.0$ indicates overfitting (extreme probabilities too high/low); a slope $> 1.0$ indicates underfitting.
- **Calibration Plot**: Smooth loess curve or grouped deciles plotting observed proportion vs mean predicted probability.
- **Brier Score**: Proper scoring rule measuring overall mean squared error of probability predictions:
  $$\text{Brier} = \frac{1}{N}\sum_{i=1}^N (p_i - y_i)^2$$
- **Recalibration**: Separate original-model calibration from any post-hoc recalibration (Platt scaling, isotonic regression). Never assess calibration
  on training data.

### Decision Threshold Selection
- Thresholds for classification must be selected based on clinical consequences (false positive cost vs false negative cost) or optimized strictly
  **within inner training folds**.
- **Never tune or pick an optimal threshold on the final test set or external validation set.**

### Decision Curve Analysis (DCA)
Evaluates whether using the model to guide clinical intervention achieves higher net benefit than default policies ("treat all" or "treat none"):

$$\text{Net Benefit} = \frac{\text{True Positives}}{N} - \frac{\text{False Positives}}{N} \left(\frac{p_t}{1 - p_t}\right)$$

where $p_t$ is the threshold probability at which a clinician or patient would choose treatment.

---

## 8. Validation Hierarchy & External Validity

1. **Apparent Performance**: Evaluated on training data. Always over-optimistic; useful only to calculate optimism:
   $$\text{Optimism} = \text{Performance}_{\text{apparent}} - \text{Performance}_{\text{validated}}$$
2. **Internal Validation**: Nested cross-validation or bootstrap optimism correction. Validates the modeling procedure on the development population.
3. **Temporal Validation**: Evaluates model performance on patients assessed at a later calendar period within the same healthcare system.
4. **Geographic / External Validation**: Evaluates the locked model on an entirely independent healthcare system, geographic region, or external survey cohort.
   *A random holdout split from the same source dataset is internal validation, never external validation.*

---

## 9. NHANES and Complex-Survey Profile

When working with NHANES data:
1. **Survey Design Structure**: Declare primary sampling units (`SDMVPSU`), strata (`SDMVSTRA`), and sampling weights (`WTMEC2YR` for 2-year cycle,
   pooled weights for combined cycles).
2. **Cycle Pooling**: For multi-cycle combinations (e.g., 2013-2016, 4 years), divide 2-year weights by 2 per NCHS analytical guidelines.
3. **Target Estimand Articulation**:
   - If the goal is **population descriptive estimation** or population-level prevalence, use design-based survey estimation (`survey` in R,
     `statsmodels.survey` in Python).
   - If the goal is an **individual clinical prediction model**, state whether weights should be incorporated into the loss function.
     Unweighted models often achieve superior sample discrimination, while weighted models align closer with population-average risk.
   - Run sensitivity analyses comparing weighted and unweighted models.
4. **Never Use PSU/Strata as Features**: Design variables reflect sampling logistics, not patient biology. Including them as predictive features
   induces severe artifacts.

---

## 10. Interpretability & Causal Boundaries

1. **Associations, Not Causes**: Model coefficients, SHAP values, and feature importances quantify statistical associations conditional
   on the model specification. They do not demonstrate that intervening on a feature will alter diabetes risk.
2. **Out-of-Fold Interpretation**: Compute SHAP and feature importance on out-of-fold validation data rather than training data.
3. **Subgroup Evaluation**: Report sample sizes, event counts, and confidence intervals when evaluating model performance across demographic subgroups
   (age, sex, race/ethnicity). Do not declare algorithmic parity or disparity based on underpowered, unstable subgroups.
