# NAGALA data dictionary

Workbook SHA256: `671359aea2019c848f969395f88e57f888eaba8463ea0351bcda8f1c947f5523`.

All predictors are baseline measurements. Event/time are post-index and excluded. Raw data are unchanged.

| Concept | Exact source header | Unit | Role / encoding |
|---|---|---|---|
| age | Baseline Age, yrs | years | predictor; continuous |
| bmi | Baseline BMI, kg/m2 | kg/m2 | predictor; continuous |
| waist | Baseline Waist circumference(WC), cm | cm | predictor; continuous |
| alt | Baseline ALT, IU/L | IU/L | predictor; continuous |
| ast | Baseline AST, IU/L | IU/L | predictor; continuous |
| ggt | Baseline GGT, IU/L | IU/L | predictor; continuous |
| hdl | Baseline HDL-cholesterol, mmol/L | mmol/L | predictor; continuous |
| tc | Baseline Total Cholesterol, mmol/L | mmol/L | predictor; continuous |
| tg | Baseline Triglycerides, mmol/L | mmol/L | predictor; continuous |
| hba1c | Baseline HbA1c, mmol/mol | mmol/mol | predictor; continuous |
| fpg | Baseline Fasting plasma glucose, mg/dl | mg/dL | predictor; continuous |
| sbp | Baseline Systolic blood pressure, mmHg | mmHg | predictor; continuous |
| dbp | Baseline Diastolic blood pressure, mmHg | mmHg | predictor; continuous |
| sex | Sex, 1:Men, 2:Women | unitless | predictor; {'0': 'women', '1': 'men'} |
| fatty_liver | Baseline Fatty liver 0/1 | unitless | predictor; {'0': 'no', '1': 'yes'} |
| exercise | Baseline Habit of exercise 0/1 | unitless | predictor; {'0': 'no', '1': 'yes'} |
| alcohol | Baseline Alcohol consumption, non:1, light:2, moderate:3, heavy:4 | unitless | predictor; {'1': 'non/minimal', '2': 'light', '3': 'moderate', '4': 'heavy'} |
| smoking | Baseline Smoking status, 1:never, 2:past, 3:current | unitless | predictor; {'1': 'never', '2': 'past', '3': 'current'} |
| patient_id | Patient Number | unitless | identifier; continuous |
| time | Follow up duration, days | days | time_anchor; continuous |
| event | Incident DM 0/1 | unitless | outcome; {'0': 'no event observed by own last follow-up (censored)', '1': 'incident diabetes during follow-up'} |

Raw columns not selected: ethanol amount, body weight, waist/BMI binary cutoffs, obesity phenotype, duplicate unit columns. Obesity phenotype has heterogeneous code formats and is not decoded or used.

Sex mapping is resolved from independent aggregate counts; original header mismatch is retained in provenance. HDL zeros are missing only when the companion mg/dL cell is blank. No generic zero-to-missing conversion is applied.

Event=0 means censored at the recorded time, not necessarily diabetes-free at five years. FPG/HbA1c baseline values are distinct from future outcome-defining measurements.
