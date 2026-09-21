<!-- extracted by pdf-extract | engine=docling | pages=10 | ocr=False | tables=8/7 | density=1.09 | score=100 -->

## Full Length Article

## Risk Prediction of Diabetes: Big data mining with fusion of multifarious physical examination indicators

Hui Yang a , Yamei Luo b , Xiaolei Ren c,d , Ming Wu c , Xiaolin He c , Bowen Peng e , Kejun Deng a , Dan Yan f , Hua Tang g,h,* , Hao Lin a,*

- a School of Life Science and Technology, Center for Informational Biology, University of Electronic Science and Technology of China, Chengdu 610054, China

b School of Medical Information and Engineering, Southwest Medical University, Luzhou 646000, China

c Heima Digital Technology Ltd, Luzhou 646000, China

d Chuanjiang Science and Technology Research Institute Ltd, Luzhou 646000, China

e Division of International Cooperation, Health Commission of Sichuan Province, Chengdu, 610041, China

f Beijing Friendship Hospital, Captial Medical University, Beijing 100050, China

g School of Basic Medical Sciences, Southwest Medical University, Luzhou 646000, China

- h Central Nervous System Drug Key Laboratory of Sichuan Province, Luzhou 646000, China

## A B S T R A C T

Diabetes is a global epidemic. Long-term exposure to hyperglycemia can cause chronic damage to various tissues. Thus, early diagnosis of diabetes is crucial. In this study, we designed a computational system to predict diabetes risk by fusing multifarious types of physical examination data. We collected 1,507,563 physical examination data of healthy people and diabetes patients, as well as 387,076 physical examination data from the follow-up records from 2011 to 2017 of diabetes patients in Luzhou City in China. Three types of physical examination indexes were statistically analyzed: demographics, vital signs, and laboratory values. To distinguish diabetes patients from healthy people, a model based on eXtreme Gradient Boosting (XGBoost) was developed, which could produce an area under the receiver operating characteristic curve (AUC) of 0.8768. Moreover, to improve the convenience and flexibility of the model in clinical and real-life scenarios, a diabetes risk scorecard was established based on logistic regression, which could evaluate human health. Lastly, we statistically analyzed the data from the follow-up records to identify the key factors influencing patient control of their conditions. To improve the diabetes cascade screening and personal lifestyle management, an online diabetes risk assessment system was established, which can be freely accessed at http://lin-group.cn/server/DRSC/index.html. This system is expected to provide guidance for human health management.

## 1. Introduction

Diabetes is currently regarded as a global epidemic [1]. Long-term exposure to hyperglycemia can lead to chronic damage to various tissues  [2,3].  Therefore,  early  detection  and  intervention  of  diabetes  is crucial to prevent diabetes or delay the complications of chronic diabetes. However, only half of patients with diabetes are currently diagnosed because of their economic conditions and limited knowledge of their health status [1]. With the massive growth of physical examination data  and  the  rapid  development  of  artificial  intelligence,  the  use  of physical examination data to establish a disease risk assessment model can potentially provide clinical guidance and early large-scale screening [4]. Recent studies have shown that chronic diseases, particularly diabetes, play important roles in the survival of new coronavirus disease 2019 (COVID-19) [5-7]. Moreover, understanding the blood glucose risk of an individual can also guide the prevention and treatment of new coronary disease strategies [6].

* Corresponding authors.

E-mail addresses: huatang@swmu.edu.cn (H. Tang), hlin@uestc.edu.cn (H. Lin).

Several  studies  have  focused  on  the  design  of  various  diabetes detection  models  [8-10].  Gao  et  al.  [10]  used  age,  gender,  waist circumference, systolic blood pressure, and family history of diabetes as features to identify diabetes, but the AUC was only 0.635. On the basis of similar features, the AUC was improved to 0.748 by using multivariate logistic  regression  [11].  The  performances  of  these  models  are  not satisfactory because of the inadequate characteristics of laboratory data. Another study [12] introduced the feature selection strategy to construct a prediction model. However, the dataset used in the study was acquired from the Kaggle machine learning repository [13], which varied from the real situation to a certain extent. Zou et al. [14] developed a model for predicting diabetes in Chinese people, but did not provide a system or  a  diabetes  risk  scorecard.  Moreover,  most  of  these  models  used insufficient data and lacked laboratory testing data, resulting in unsatisfactory  performance.  Thus,  all  of  these  published  models  are  not

Contents lists available at ScienceDirect

## Information Fusion

journal homepage: www.elsevier.com/locate/inffus H. Yang et al.

suitable for large-scale cascade screening.

To overcome the disadvantage of previous models, we developed a novel system for evaluating diabetes risk. In the system, a large amount of physical examination data was collected from an electronic medical record (EMR). These data presented several advantages, including wide coverage, large volume, and ease of collection. We proposed a cascading diabetes risk  assessment system based on three types of physical examination  characteristics:  demographics,  vital  signs,  and  laboratory values. The system consists of three modules: the diabetes risk assessment model, the diabetes risk scorecard, and the follow-up satisfaction model. The system can evaluate diabetes risk from different levels. Thus, it is not only applicable to the public health system but is also convenient for the implantation of wearable devices or smart home systems based on the Internet of Things (IoT) [15-17]. By integrating the indicators collected  from  different  home  devices,  the  system  can  conduct  early warning and continuous monitoring of individual risks [18]. It can also provide a direct basis for insurance companies to evaluate the claims risk of individuals purchasing commercial insurance in advance.

The main contributions of this study are listed as follows:

- Three types of clinical features were fused based on a large number of physical examination data to build a cascaded diabetes risk assessment system.
- An optimal subset of physical examination indexes was obtained by feature selection to assess diabetes risk.
- A diabetes risk assessment model was developed to conduct largescale screening at the system level.
- A diabetes risk  scorecard was  designed based on equal-frequency binning to improve the flexibility of the model in clinical applications.
- Key  factors  influencing  patients ' control  of  their  conditions  were identified based on follow-up records.
- An online tool for diabetes risk management was established.

The steps to build the system are shown in Fig. 1, which are described in detail.

## 2. Materials and methods

## 2.1. Data set

An  adequate  number  of  real  data  is  the  basis  for  constructing  a reliable high-performance machine learning model. We obtained physical examination data from the EMR of Luzhou Municipal Health Commission  in  China  from  2011  to  2017.  This  data  included  physical examination results of healthy persons, physical examination data of persons diagnosed with diabetes (both Type I and Type II), and followup  data  of  persons  with  diabetes.  The  diagnostic  tool  used  for  the diagnosis of all patients with diabetes was a 75 g oral glucose tolerance test (OGTT) [19].

To exclude the noise in the initial data and thereby achieve highquality  data,  we  excluded  the  features  with &gt; 10% missing rate  and then encoded the text characteristics as discrete variables. We subsequently removed abnormal values caused by the improper operation of the system. Samples with missing values were eliminated, and duplicate samples were deleted. We ultimately obtained the cohort data including 1221,598 physical examination samples for healthy people, 285,965 for diabetes  patients,  and  387,076  follow-up  data.  The  age  range  of  the sample population was 20 -99 years old. The distribution is shown in Fig. 2.

We generated two benchmark datasets. The first benchmark dataset S 1  was  used  to  construct  the  diabetes  risk  assessment  model  and scorecard, formulated as

Fig.  2. The  age  distribution  of  healthy  people  (Blue)  and  diabetes  patients (Yellow). (For interpretation of the references to color in this figure legend, the reader is referred to the web version of this article.)

Fig. 1. flowchart of the whole process of diabetes risk assessment system.

where S 1 + contains 285,965 samples of individuals with diabetes, and S 1 contians 1221,598 samples of healthy people.

The  second  benchmark  dataset  S2  was  constructed  based  on  the follow-up model data and formulated as

where S 2 + includes 39,547 samples who were not satisfied with the diabetes control, and S 2 includes 347,529 samples who were satisfied with the diabetes control.

The data were segmented using the 70 -30 holdout method to adjust the parameters and measure the performance of the model.

## 2.2. Feature fusion

We fused three types of physical examination data: demographics, vital signs, and laboratory values, in our computational model. These fused features could provide sufficient information to identify diabetes risk. We noticed that the number of initial characteristics is different between  the  positive  and  negative  samples.  For  the  three  types  of physical examination data, the samples from healthy individuals contained 27 initial characteristics, and those from diabetes patients contained 67 initial characteristics. These features are listed in Table S1 and S2 of Supplementary Materials. We removed some label-independent features and excluded the features with &gt; 10% missing rate. New indexes were added depending on the actual needs and clinical experience. Height and waist failed to assess obesity in a person. The waist-toheight ratio(WHtR) is more reasonable indicator for evaluating whether a person has visceral fat accumulation. To simplify feature collection for clinical applications, we used mean systolic pressure (MSP) instead of left systolic pressure (LSP) and right systolic pressure (RSP), as well as, mean diastolic pressure (MDP) instead of left systolic pressure (LDP) and right systolic pressure (RDP). To explore the relationship between blood pressure  difference  in  bilateral  limb  and  diabetes  mellitus,  two  indicators, systolic pressure difference (SPD) and Diastolic pressure difference (DPD), were added for measuring the pathological state of limbs. Clinicians have recommended using these new indicators for assessing the condition of patients with diabetes [20,21].

The five new features were calculated as follows:

(6)

| WHtR   | = W / H       | (3)   |
|--------|---------------|-------|
| MSP    | = LSP + RSP 2 | (4)   |
| MDP    | = LDP + RDP 2 | (5)   |
| SPD    | = LSP RSP     | (6)   |

Table 1 Univariate analysis for the physical examination features.

| Category          | Features   | Total( n = 1,507,563)   | health ( n = 1,221,598)   | diabetes ( n = 285,965)   | p-value   |   AUC (95% CI) |
|-------------------|------------|-------------------------|---------------------------|---------------------------|-----------|----------------|
| Demographics      | Age        | 59.65 ± 13.89           | 58.07 ± 14.18             | 66.37 ± 10.13             | < 0.01    |         0.6893 |
|                   | Breath     | 18.59 ± 1.62            | 18.58 ± 1.60              | 18.61 ± 1.69              | < 0.01    |         0.5106 |
|                   | WHtR       | 0.51 ± 0.06             | 0.51 ± 0.06               | 0.55 ± 0.06               | < 0.01    |         0.6952 |
|                   | BMI        | 23.43 ± 3.36            | 23.10 ± 3.22              | 24.83 ± 3.60              | < 0.01    |         0.6430 |
| Vital signs       | MSP        | 126.88 ± 16.90          | 124.57 ± 15.47            | 136.78 ± 19.01            | < 0.01    |         0.6965 |
|                   | MDP        | 76.93 ± 9.51            | 76.15 ± 9.11              | 80.26 ± 10.45             | < 0.01    |         0.6193 |
|                   | SPD        | 4.79 ± 4.12             | 4.70 ± 4.01               | 5.17 ± 4.58               | < 0.01    |         0.5372 |
|                   | DPD        | 4.01 ± 3.16             | 3.97 ± 3.10               | 4.17 ± 3.38               | < 0.01    |         0.5368 |
| Laboratory values | FBG        | 5.97 ± 2.42             | 5.34 ± 1.18               | 8.63 ± 4.01               | < 0.01    |         0.8307 |
|                   | HDL        | 1.58 ± 0.63             | 1.60 ± 0.63               | 1.49 ± 0.62               | < 0.01    |         0.5761 |
|                   | LDL        | 2.70 ± 0.91             | 2.67 ± 0.90               | 2.83 ± 0.96               | < 0.01    |         0.5551 |
|                   | SC         | 76.18 ± 20.50           | 75.66 ± 19.78             | 78.41 ± 23.17             | < 0.01    |         0.5439 |
|                   | TG         | 1.70 ± 1.23             | 1.61 ± 1.16               | 2.06 ± 1.45               | < 0.01    |         0.6158 |
|                   | TC         | 4.90 ± 1.16             | 4.86 ± 1.13               | 5.08 ± 1.24               | < 0.01    |         0.5574 |
|                   | BUN        | 5.48 ± 1.96             | 5.44 ± 1.95               | 5.66 ± 2.02               | < 0.01    |         0.5327 |
|                   | UGLU       | -/1 + /2 + /3 +         | -/1 + /2 + /3 +           | -/1 + /2 + /3 +           | < 0.01    |         0.5576 |

where W and H denote the waist circumference and height, respectively; LSP and RSP represent the left systolic pressure and right systolic pressure, respectively; and LDP and RDP are the left diastolic pressure and right diastolic pressure, respectively.

Based on above process, 16 features were selected as the preliminary predictive features in the diabetes risk assessment system. These features included  four  demographic  characteristics  (age,  breath,  WHtR,  and BMI), four vital signs (MSP, MDP, SPD, and DPD), and eight laboratory values  (fasting  blood  glucose  (FBG),  high-density  lipoprotein  (HDL), LDL, serum creatinine (SC), triglyceride, total cholesterol (TC), blood urea  nitrogen  (BUN),  urine  glucose  (UGLU)).  For  the  follow-up  data model, six features were used: (systolic pressure (SP), diastolic pressure (DP), BMI, FBG, psychological status (PS), medication adherence (MA)). We  performed  univariate  analysis  of  these  indexes.  The  results  are summarized in Table 1 and 2.

## 2.3. Diabetes risk assessment model

We first  developed  a  diabetes  risk  assessment  model  to  evaluate diabetes risk. Three feature selection techniques were proposed to rank features. Each feature subset was then entered into three kinds of algorithms to identify the optimal model. The details are described below.

Table 2 Univariate analysis for the Diabetes follow-up features.

| Features            | Total( n = 387,076)                                                                                                                                                           | Satisfied ( n = 347,529)                                                                                                                                                      | Not satisfied ( n = 39,547)                                                                                                                                              | p- value                    | AUC (95% CI)                             |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|------------------------------------------|
| SP DP BMI FBG PS MA | 127.91 ± 8.60 77.20 ± 6.27 22.96 ± 2.31 6.25 ± 0.71 good ( n = 228,600) /general (156,590) /bad (1881) regular (280,552) /Intermittent (58,579) /Not taking medicine (47,945) | 127.67 ± 8.29 77.00 ± 6.02 22.95 ± 2.30 6.14 ± 0.62 good ( n = 210,789) /general (135,683) /bad (1057) regular (265,367) /intermittent (41,904) /not taking medicine (40,258) | 130.09 ± 10.71 78.94 ± 7.87 23.03 ± 2.37 7.25 ± 0.64 good ( n = 20,912) /general (17,811) /bad (824) regular (16,675) /intermittent (15,185) /not taking medicine (7687) | < 0.01 < 0.01 < 0.01 < 0.01 | 0.6227 0.588 0.5277 0.9150 0.5804 0.7026 |

## 2.3.1. Feature selection

In machine learning-based models, a large number of information features are usually collected, because such features can provide sufficient  information for the model to yield good discriminatory results. However, in clinical applications, we are often limited by data collection. The larger the number of features, the greater the difficulty of data collection.  In  addition,  high-dimensional  features  can  generate  information redundancy or noise, which may result in low prediction accuracy.  Therefore,  we  must  find  the  set  with  the  smallest  number  of features that can yield the best prediction result. Several feature selection techniques have been proposed to solve these problems. In feature selection, the first step is to rank features on the basis of importance score derived from several algorithms. The feature-adding or reduction strategy was used to determine the optimal feature subset that could yield the best prediction results. The application of feature selection in prediction problems could not only avoid high-dimensional disaster and overfitting but also improve the efficiency of practical operations.

In  this  study,  to  evaluate  the  importance  of  the  aforementioned features, feature selection techniques were applied, including mutual information (MI) [22], analysis of variance (ANOVA) [23], and Gini impurity (GI) [24]. Incremental feature selection (IFS)   [25] was subsequently  used  to  determine  the  optimal  feature  subset.  The  three feature selection techniques are described as follows.

2.3.1.1. Mutual Information (MI). Mutual information is a measure of the interdependence of variables. The MI of two discrete random variables x and y can be defined as

For continuous random variables,

where p ( x , y ) is the joint probability distribution function of x and y , and p ( x ) and p ( y ) are the marginal probability distribution functions of x and y , respectively.

2.3.1.2. Analysis  of  Variance  (ANOVA). The  aim  of  ANOVA  is  to determine the linear relationship between two groups of data and to evaluate the influence of controllable factors by analyzing and studying the contribution of variations from different sources to the total variation. We used the mean square between (MSB) to describe the variance of each group relative to the population and mean squared error (MSE) to represent the intragroup mean square. ANOVA can thus be defined as the ratio between MSB and MSE, expressed as

The details of the ANOVA are presented in Ref. [26].

2.3.1.3. Gini Impurity. Gini impurity is used to measure the uncertainty of  the  result.  The  greater  the  GI,  the  higher  the  importance  of  the feature. It is defined as

where t represents a given node, i represents any classification of the label, and p ( it ) represents the proportion of the label classification i on node t .

## 2.3.2. Classification algorithms

After the features were sorted using the aforementioned feature selection techniques, XGBoost was initially used as a basic classifier to generate  the  optimal  features.  The  prediction  performance  of  three machine learning methods -XGBoost [24], logistic regression (LR) [10], and random forests (RF) [27] -were evaluated to achieve the best prediction. The three algorithms are briefly introduced below.

2.3.2.1. Extreme Gradient Boosting. XGBoost is a tree-based nonlinear machine learning technology. Compared with black box technologies such as support vector machine (SVM) and artificial neural networks (ANN), XGBoost can easily evaluate the importance of all input features. The importance score of a feature can be calculated by the sum of information when splits (tree branching) are performed using the feature.

2.3.2.2. Logistic Regression. LR is a generalized linear regression analysis model and is often used in data mining, automatic disease diagnosis, economic forecasting, and other fields. In the prediction of diabetes risk, two groups of samples were selected: the healthy group and the diabetes group. The label was the dependent variable of the two groups, and the features were the independent variable. By logistic regression analysis, the weight of the independent variable was obtained. The probability of a  person  suffering  from  diabetes  was  predicted  based  on  the  feature weight.

2.3.2.3. Random Forest. The random forest is also a tree-based classifier that contains multiple decision trees. The output category is determined by the mode of the category output by an individual tree.

By comparing the classification performance of the three classifiers, the algorithm with the best prediction performance was selected as the final algorithm for the construction of the diabetes prediction model. We adjusted the weight in the classification algorithms to solve the imbalance between the positive and negative samples. The model parameters are listed in Table S3 of Supplementary Materials.

## 2.4. Diabetes risk scorecard

To facilitate clinical applications, we further designed a scorecard to assess diabetes risk by logistic regression  [28,29]. The scorecard could transfer continuous variables to bins at equal frequencies. The features used in the diabetes risk scorecard are the optimal feature subsets that were obtained from the diabetes risk model mentioned in Section 2.3.1. Each individual with a different diabetes risk level has a different score on the scorecard; thus, each feature should be divided into boxes. In the present study, we used the weight of evidence (WoE) [30,31] to measure the probability of illness for each box and used binning to discretize continuous variables. The process was conducted as follows:

- 1)  Continuous variables were divided into 50 -100 groups of subtype variables;
- 2)  Each group was ensured to contain positive and negative samples;
- 3)  A Chi-square test was performed on adjacent groups, and the two groups with the largest p -values in the Chi-square test were merged until the number of groups was less than the set number of boxes;
- 4) A feature was divided into a set number of bins. Changes in the information value (IV) under each set of bins were observed, and the most suitable number of bins was identified (Supplementary Materials Figure S1);
- 5)  After binning, the WoE value of each bin was calculated.

WoE and IV were calculated as follows:

where N is the number of boxes for one feature, i represents each box, H. Yang et al.

and HP % is the ratio of healthy individuals in the box to the healthy individuals in the entire feature, D % is the ratio of diabetes patients in the  box  to  the  diabetes  patients  in  the  entire  feature.  After  feature binning, we calculated the WoE of each bin and replaced WoE with the original benchmark data point S1 to ensure that all datasets could be covered by WoE .

The score in the scorecard was calculated as

where odds is the ratio of healthy individuals to diabetes patients, and A and B are two constants determined as follows.

First, two specific ratios could be set: odds and 2 × odds and two corresponding scores P 0  and P 0 + PDO (Point-to-Double Odds). Thus,

where P 0 and PDO are the score ranges set manually. A and B can be determined based on the two values. The diabetes risk score can then be calculated in accordance with Eq. (14).

Second, the basic score not affected by each feature was calculated with the intercept of ln (odds). The logistic regression coefficient was then considered in the calculation to determine the score of each feature in each position, as follows:

where ω i denotes  the  coefficient  of  the i th  features  in  LR; ω 0 is  the intercept; and xi is the value of the i th feature. The score of each feature can be multiplied by the WoE of each bin in the feature to determine the score of each bin.

Finally,  the  scorecard was calibrated to determine the total score between 0 and 100 points. The final scorecard consisted of the base score and the score of each bin in each feature.

## 2.5. Follow-up satisfaction model

We constructed a follow-up satisfaction model to analyze and evaluate the relationship between the follow-up indexes and the degree of satisfaction with the control of the patient ' s  condition. Six follow-up indexes -SP,  DP,  BMI,  FBG,  PS,  and  MA -were  combined  with XGBoost to build the model. We also assessed the effects of these features on follow-up satisfaction.

## 2.6. Model evaluation

For each model, the classifier was trained on the training set and evaluated  on  the  corresponding  test  set.  The  evaluation  indicators included accuracy, precision, recall, false-positive rate (FPR), and F1 [32,33], were calculated as follows:

where  TP  represents  true-positive  results,  describing  the  number  of correctly predicted positive samples; FP denotes false-positive results, representing the number of negative samples predicted as positive; FN indicates  false-negative  results,  representing  the  number  of  positive samples classified as negative; TN denotes true-negative results, representing the number of samples correctly predicted as negative.

The receiver operating characteristic (ROC) curve is often used to measure the predictive power of the current method across the entire range of  algorithm  decision  values  [34].  The  vertical  and  horizontal coordinates  of  the  ROC  curve  are  the  true-positive  rate  (TPR)  and false-positive  rate  (FPR),  respectively.  The  ROC  can  reveal  the  relationship between sensitivity and specificity. We used the area under the ROC curve,  referred  to  as  AUC,  to  evaluate  the  performance  of  the model,  with  AUC = 0.5  being  equivalent  to  random  prediction  and AUC = 1 representing a perfect prediction. On the ROC curve, the point closest to the upper left of the graph was regarded as the best point for classification. The corresponding cutoff value was the optimal value for the construction of the final model, reflecting a good balance between sensitivity and specificity.

Cross-validation is a commonly used technique for assessing the results of statistical analysis. It can be used to objectively evaluate the performance  of  classification  models.  The  three  widely  used  crossvalidation  methods  are  the  independent  data  set  test,  n-fold  crossvalidation test, and jackknife cross-validation test [35]. In the present study, the 5-fold cross-validation test and independent data set test were employed to evaluate the performance of different models.

## 2.7. Data availability

The  data  set  used  in  this  study  were  acquired  from  the  Luzhou Municipal Health Commission and were desensitized. This data set has not been published. Scholars who intend to use the data under reasonable request should contact the corresponding author of this study.

All statistical analyses in this study were performed using Python 3.6. All  algorithms were implemented using the machine learning library ' sklearn ' [36].

## 3. Results

## 3.1. Clinical indicator selection

We first discussed the contribution of the 16 features (described in Section 2.2) to diabetes detection. If a model was generated using the data with the 16 clinical features, clinicians have to collect these 16 features  for  each  physical  examination  personnel.  We  observed  that some of the 16 features hindered the clinical application. For instance, HDL and LDL-related blood lipid tests are two clinical test indicators usually affected by dietary habits. Therefore, drinking and a high-fat diet should be avoided 3 days before the test. For redundant feature detection, we first used Pearson ' s correlation coefficient to reveal the correlation between any two features; we then presented the correlations by using  a  heatmap  (Fig.  3).  As  shown  in  the  figure,  MSP  is  positively correlated with MDP, whereas HDL is negatively correlated with BMI, WHtR, and FBG. Therefore, feature selection should be used to exclude these redundant features.

According to Section 2.3.1, three feature selection techniques -MI, ANOVA, and GI -were used to rank the features. IFS was then combined with XGBoost to determine the optimal feature subset. Thus, we investigated  the  prediction  performances  of  48  (16 × 3)  feature  subsets generated by three feature selection techniques, with the subset exhibiting the best prediction performance as the optimal feature subset. The detailed results are presented in Table 3 and Fig. 4. We noticed that six optimal features (FGB, MSP, age, WHtR, BMI, and UGLU) generated by GI and ANOVA could achieve the maximum AUC of 0.8712 in 5-fold cross-validation. For MI-based feature selection techniques, the H. Yang et al.

Fig. 3. The heat map to show the Pearson correlation of features.

Table 3 Feature selection using three methods in IFS strategy.

| MI       | ANOVA   | ANOVA    | ANOVA   | GI       | GI     |
|----------|---------|----------|---------|----------|--------|
| features | 5V_AUC  | features | 5V_AUC  | features | 5V_AUC |
| FBG      | 0.8042  | FBG      | 0.8042  | FBG      | 0.8042 |
| Age      | 0.8507  | MSP      | 0.8406  | MSP      | 0.8406 |
| WHtR     | 0.8628  | WHtR     | 0.8507  | Age      | 0.8628 |
| MSP      | 0.8695  | Age      | 0.8695  | WHtR     | 0.8695 |
| BMI      | 0.8707  | BMI      | 0.8707  | BMI      | 0.8707 |
| MDP      | 0.8702  | UGLU     | 0.8712  | UGLU     | 0.8712 |
| UGLU     | 0.8707  | MDP      | 0.8707  | MDP      | 0.8707 |
| TG       | 0.8705  | TG       | 0.8705  | HDL      | 0.8703 |
| HDL      | 0.8700  | TC       | 0.8700  | TG       | 0.8697 |
| BUN      | 0.8696  | HDL      | 0.8694  | BUN      | 0.8696 |
| TC       | 0.8690  | BUN      | 0.8690  | TC       | 0.8690 |
| Breath   | 0.8688  | LDL      | 0.8683  | LDL      | 0.8683 |
| SC       | 0.8678  | SC       | 0.8680  | SC       | 0.8680 |
| LDL      | 0.8673  | SPD      | 0.8673  | SPD      | 0.8673 |
| DPD      | 0.8667  | Breath   | 0.8664  | Breath   | 0.8664 |
| SPD      | 0.8664  | DPD      | 0.8664  | DPD      | 0.8664 |

Fig. 4. The IFS results for three feature selection techniques using XGBoost.

maximum AUC was 0.8708 which was slightly lower than the values achieved using GI and ANOVA. Moreover, both GI and ANOVA only required six features to determine the best prediction. Regardless of the feature  selection  techniques  used,  the  optimal  feature  subset  always contains  the  six  features  (FBG,  MSP,  age,  WHtR,  BMI,  and  UGLU), indicating the importance of these features in the diagnosis of diabetes. Adding more features to the optimal feature subsets could not improve the performance of the predictive models and even reduced the AUC, suggesting that these features were redundant information or noise.

To show the influence of features on the performance of the model, we plotted the GI and AUC of each feature, as well as the IFS curve (Fig.  5).  The  interpretability  and  comprehensibility  of  the  model  are thus enhanced.

## 3.2. Diabetes risk assessment

Using  the  six  optimal  features  on  independent  test  data,  we compared  the  performances  of  the  three  different  classifiers  (RF, XGBoost and LR). The five evaluation indexes (AUC, accuracy, precision, recall, and F1) of the three models were calculated. As shown in Table 4 and Fig. 6, the XGBoost-based model with the optimal feature subset can achieve a maximum AUC of 0.8763. Therefore, XGBoost was selected as the final algorithm for constructing the diabetes risk assessment model. In  practical  applications,  the  ROC  threshold  has  to  be  adjusted depending on the purpose of the model. When the goal is to identify more  patients  with  diabetes,  more  normal  individuals  may  also  be misdiagnosed. Thus, the ROC threshold should be set in favor of a high recall. If we aim to accurately identify diabetes patients, some patients may be wrongly assessed as normal. Thus, the ROC threshold needs to be adjusted in favor of a high FDR. To strike a balance between the two cases, we selected the point closest to the upper left corner of the graph as the optimal threshold.

## 3.3. Diabetes risk scorecard

A diabetes risk scorecard can be used to evaluate diabetes risk by calculating  individual  scores.  To  create  a  scorecard,  each  feature  is divided into bins, and the WOE values for each bin are calculated. By mapping the WOE values back to the benchmark data S1 and using logistic regression to construct model, a scorecard is established. In the study, we set the score between 0 and 100. Therefore, in the design of the scorecard, we assigned the two hypothetical values of P0 and PDO to 81.3 and 4.5, respectively. In accordance with Eqs. (15 -18), A and B were  calculated  as  66.3  and  6.5,  respectively.  The  scores  of  the  six clinical features were determined using Eq. (14). The results are listed in

Fig. 5. A graphic to show the (A) feature selection using Gini, (B) Gini value and (C) AUC for each feature.

Table 4 Performance metrics of the machine learning models.

| Diabetes risk assessment model Algorithm   | Specificity   | Recall   | Accuracy   | Precision   | F1     | Test_AUC   | 5V_AUC   |
|--------------------------------------------|---------------|----------|------------|-------------|--------|------------|----------|
| LR                                         | 0.8361        | 0.7342   | 0.8007     | 0.6216      | 0.6765 | 0.8650     | 0.8614   |
| XGBoost                                    | 0.8473        | 0.7383   | 0.7274     | 0.5097      | 0.6397 | 0.8763     | 0.8713   |
| Random Forest                              | 0.8347        | 0.7534   | 0.8059     | 0.6289      | 0.6856 | 0.8740     | 0.8687   |
| Diabetes risk score card Algorithm         | Specificity   | Recall   | Accuracy   | Precision   | F1     | Test_AUC   | 5V_AUC   |
| LR                                         | 0.8609        | 0.7147   | 0.704      | 0.4868      | 0.6226 | 0.8681     | 0.8695   |
| A follow-up record-based model Algorithm   | Specificity   | Recall   | Accuracy   | Precision   | F1     | Test_AUC   | 5V_AUC   |
| XGBoost(Contain FGB)                       | 0.9425        | 0.8831   | 0.9455     | 0.6812      | 0.7671 | 0.9632     | 0.945    |
| XGBoost(Remove FGB)                        | 0.7655        | 0.6848   | 0.7745     | 0.2637      | 0.3766 | 0.7876     | 0.7742   |

Fig.  6. ROC  curves  of  Diabetes  Risk  Assessment  Model  using  RF,  XGBoost and LR.

Table 5 Diabetes Risk Score Card.

| Base_score:62   | Base_score:62   |       |         |                              |         |
|-----------------|-----------------|-------|---------|------------------------------|---------|
| Feature         | Threshold       | Score | Feature | Threshold                    | Score   |
| FGB             | (-inf, 5.8]     | 6.3   | WHtR    | (-inf, 0.493] (0.493, 0.531] | 4.7 0.8 |
|                 | (5.8, 6.8]      | 0.5   |         |                              |         |
|                 | (6.8, 7.5]      | 7     |         | (0.531, 0.569]               | 1.8     |
|                 | (7.5, 8.8]      | 12.6  |         | (0.569, 0.627]               | 4.3     |
|                 | (8.8, inf]      | 20.9  |         | (0.627, inf]                 | 7.5     |
| Feature         | Threshold       | Score | Feature | Threshold                    | Score   |
| Age             | (-inf, 38.0]    | 17.7  | MSP     | (-inf, 111.0]                | 5.4     |
|                 | (38.0, 48.0]    | 7.8   |         | (111.0, 123.0]               | 3       |
|                 | (48.0, 53.0]    | 3.4   |         | (123.0, 137.0]               | 0.1     |
|                 | (53.0, 63.0]    | 0.7   |         | (137.0, 143.0]               | 3.7     |
|                 | (63.0, inf]     | 2.7   |         | (143.0, inf]                 | 6.8     |
| Feature         | Threshold       | Score | Feature | Threshold                    | Score   |
| BMI             | (-inf, 21.4]    | 3.6   | UGLU    | (-inf, 0.0]                  | 0.5     |
|                 | (21.4, 24.34]   | 0.7   |         | (0.0, 1.0]                   | 7.6     |
|                 | (24.34, 26.84]  | 2     |         | (1.0, 2.0]                   | 13.6    |
|                 | (26.84, inf]    | 4.5   |         | (2.0, inf]                   | 19.7    |

## Table 5.

To set the risk interval, the Kolmogorov -Smirnov (KS) curve (Fig. 7) was used for depicting the overall score. The larger the KS value, the higher the segmentation ability of the corresponding threshold for the model. As shown in Fig. 7, the maximum inflection point is achieved when the score is 60. Thus, we set 60 as the threshold. For any individual to  be  tested,  the  lower  the  score,  the  greater  the  risk  of  diabetes; conversely,  the  higher  the  score,  the  lower  the  risk  of  diabetes.  To provide users with a more direct scoring effect, we set four scoring inflection points -20, 40, 60, and 80 -in accordance with the KS chart. Therefore, the total score could be divided into five intervals, corresponding to high, relatively high, medium, relatively low, and low risk levels (Table 6).

Fig. 7. KS curve for Diabetes Risk Score Card.

Table 6 Threshold of Risk Group in Diabetes Risk Score Card.

|   Score_start |   Score_end |   Proportion of health |   Proportion of diabetes |   KS_value | Risk Group   |
|---------------|-------------|------------------------|--------------------------|------------|--------------|
|             0 |          20 |                 0.0002 |                   0.0275 |     0.0272 | very high    |
|            20 |          40 |                 0.0084 |                   0.2822 |     0.2738 | high         |
|            40 |          60 |                 0.1551 |                   0.7117 |     0.5567 | normal       |
|            60 |          80 |                 0.8035 |                   0.9895 |     0.1859 | low          |
|            80 |         100 |                      1 |                        1 |          0 | very low     |

To evaluate the performance of the scorecard, we plotted the ROC curve of the scorecard in Fig. 8, with the AUC value at 0.8671. Compared with  the  diabetes  risk  assessment  model,  the  scorecard  showed  a considerably  small  performance  loss,  suggesting  that  the  method  for establishing a diabetes risk scorecard is reasonable.

Fig. 8. ROC curve of Diabetes Risk Score Card.

Finally, we presented the method of using the scorecard to determine the  score  of  those  physical  examined.  According  to  Table  5,  the  six clinical test indicators of each person are assigned to obtain the interval scores for the six clinical features. The total score was then obtained by adding these interval scores to the basic scores. The health of individuals predisposed  to  diabetes  could  be  assessed  based  on  the  total  score. Table 6 presents the disease risk of the patients, the higher the score, the healthier the individual. A score of = 60 was considered as the median, and the risk doubled for each 10-point reduction in the score.

## 3.4. Evaluation of the follow-up satisfaction model

We established a follow-up record model to observe the effects of the follow-up features on patient control over their conditions.

The XGBoost-based model was constructed based on the six followup indexes (FBG, SP, DP, MS, PS, and BMI). As shown in Fig. 9(a), the AUC reaches 96%. The features, ranked using GI, are listed in Fig. 9(b). FBG exerted the greatest effect on patient satisfaction of disease control. Patients with high FBG experienced considerable difficulty controlling their conditions, which is consistent with other observations. Our findings also showed the importance of early diagnosis of diabetes. We built a  new  model  with  XGBoost  after  removing  the  FBG  index.  Fig.  9(c) shows that the AUC of the model decreased to 77%. By re-sorting the remaining  features  shown  in  Fig.  9(d),  we  identified  medication adherence status as the most important factor for controlling diabetes, suggesting that diabetes patients should use drugs reasonably and on time.

## 3.5. Comparison with existing models

To further evaluate the performance of our system, we compared the proposed model with state-of-the-art methods  [10,11]. The results are listed in Table 7. Gao et al. [10] considered age, gender, waist circumference, systolic blood pressure, and family history of diabetes as features and achieved an AUC = of 0.635 by logistic regression. Zhou et al. [11] improved the AUC to 0.748 by using multivariate logistic regression as the classifier, based on a larger number of features (age, gender, BMI, waist circumference, systolic blood pressure, and a positive family history of diabetes). Our proposed model exhibits superiority for diabetes research.

Table 7 Comparison with existing models.

| Author      | features                                                                        |   AUC |
|-------------|---------------------------------------------------------------------------------|-------|
| Gao et al.  | Age, Gender, Waist circumference, SBP and Family history of diabetes            | 0.635 |
| Zhou et al. | Age, Gender, BMI, Waist circumference, SBP, Positive family history of diabetes | 0.748 |
| This study  | BMI, FGB, Age, WHtR, MSP, UGLU                                                  | 0.881 |

We used XGBoost as the basic classifier to construct diabetes risk assessment models and follow-up satisfaction models. One reason is that XGBoost performs  efficiently  with  respect  to  different  evaluation  indexes. Another important reason is that the machine learning algorithm can establish the relationship between features and model contributions via GI. For medical problems, the features need to be observed using models. The relationship between the model and features needs to be explored to  elucidate  the  decision-making  process  of  the  models.  By exploring  the  relationship  between  the  model  and  features,  the  key clinical indicators can be identified to provide clinicians a basis for the development of treatment strategies.

## 4. Discussion

The feature selection results (Fig. 5) easily identify FBG as the most important feature in diabetes risk assessment. We evaluated the FBG performance  to  identify  diabetes  and  calculated  AUC  to  be  0.8307 (Table 1) -that is, lower than that of the model constructed based on six fusion features. We further statistically analyzed the distribution of the six  optimal  features  to  present  in  detail  the  differences  between  the diabetes patients and the healthy individuals (Fig. 10). Apart from the FBG index, five other indicators also showed statistical differences and contributed to the prediction of diabetes risk. The fusion of different features  can  improve  the  robustness,  reliability,  and  accuracy  of  the proposed model for diabetes diagnosis. In fact, the six features have been proven to be closely related to diabetes in diabetes-related research   [37, 38], with age as one of the most important risk factor [1]. The risk of diabetes increases with age, which is consistent with published studies [39].  Therefore,  after  the  age  of  40,  people  should  undergo  regular physical  examination  annually.  WHtR  and  BMI  are  two  indicators H. Yang et al.

Fig. 9. ROC curve and feature importance of follow-up satisfaction model.

Fig. 10. Statistical analysis for the six optimal features in healthy people (Blue) and diabetes patients (Yellow). (For interpretation of the references to color in this figure legend, the reader is referred to the web version of this article.)

associated with lifestyle. The risk of diabetes can be reduced by managing  dietary  structures  (such  as  controlling  protein,  fat,  and  sugar intake) and exercise habits  [40].

In  the  early  stages  of  the  illness  or  prior  to  diabetes  detection,  a person is less  likely  to  take  the  initiative  to  go  to  the  hospital  for  a diabetes-focused examination. The best approach to large-scale screening of diabetes has not been determined. In this study, we established a machine learning-based model with a large amount of physical examination data. Owing to the relatively wide coverage of physical examination,  the  model  is  suitable  for  large-scale  early  diabetes screening. Our diabetes risk assessment model can be directly applied to the physical examination database to facilitate the large-scale identification of high-risk diabetes records in the system, understand the potential diabetes risk ratio at the public health level, and further promote diabetes prevention and control strategies. The construction of a diabetes  risk  assessment  scorecard  facilitates  clinicians  and  individuals conducting  self-examination,  further  increases  the  proportion  of  diabetes cascade screening, and improves personal lifestyle management. Therefore, the use of large-scale physical examination data to achieve early risk warning and screening of diabetes is significant for the early control of diabetes.

The application of the diabetes risk assessment model is not only suitable for public health but is also convenient for implanting wearable devices  or  smart  home  IOT  systems.  By  integrating  the  indicators collected  by  various  home  devices,  the  model  can  provide  an  early warning and continuously monitor individual risks.

## 5. Summary

In this study, we designed a diabetes risk assessment system based on physical  examination  data  retrieved  from  the  EMR  of  the  Luzhou Municipal  Health  Commission  in  China.  This  system  includes  three modules: the diabetes risk assessment model, the diabetes risk scorecard,  and  the  follow-up  satisfaction  model.  Three  types  of  indexes -demographics,  vital  signs,  and  laboratory  values -were  fed  into XGBoost  to  construct  the  diabetes  risk  assessment  model.  Logistic regression was introduced to establish a diabetes risk scorecard, thereby improving the applicability of the model in clinical and real-life settings. The follow-up satisfaction model was ultimately constructed to identify the key factors affecting patient control over of their health conditions. We also provided an online diabetes risk scoring tool, which can be freely  accessed  via  http://lin-group.cn/server/DRSC/index.html.  The tool can calculate diabetes risk based on the six indicators submitted online. The result can be used to promote personal health management. In future research, we aim to focus on the progress of algorithms in related fields and to apply more novel and efficient algorithms [41,42], such as deep neural network [43], to solve current problems. We intend to  collect  more  data,  such  as  lifestyle  and  image  data,  improve  the quality of data collection, update the system and build more reliable models.

## CRediT authorship contribution statement

Hui Yang: Conceptualization, Methodology, Software, Validation, Visualization, Formal analysis, Writing -original draft, Writing -review &amp; editing. Yamei Luo: Resources, Data curtion. Xiaolei Ren: Resources, Data  curtion. Ming  Wu: Resources,  Data  curtion. Xiaolin  He: Resources,  Data  curtion. Bowen Peng: Resources,  Data  curtion. Kejun Deng: Formal  analysis. Dan  Yan: Formal  analysis. Hua  Tang: Conceptualization, Writing -review &amp; editing. Hao Lin: Conceptualization,  Methodology,  Software,  Validation,  Visualization,  Writing -original draft, Writing -review &amp; editing, Supervision.

## Declaration of Competing Interest

The authors declare that they have no competing interests.

## Acknowledgments

This work was supported by the National Nature Scientific Foundation of China (61772119, 61702430), Sichuan Provincial Science Fund for Distinguished Young Scholars (2020JDJQ0012).

## References

- [1] R.L. Thomas, S. Halim, S. Gurudas, S. Sivaprasad, D.R. Owens, IDF Diabetes Atlas: a review of studies utilising retinal photography on the global prevalence of diabetes related retinopathy between 2015 and 2018, Diabetes Res. Clin. Pract. 157 (2019), 107840.
- [2] U. Alam, O. Asghar, S. Azmi, R.A. Malik, General aspects of diabetes mellitus, Handb. Clin. Neurol. 126 (2014) 211 -222.
- [3] K.A. Adeshara, A.G. Diwan, R.S. Tupe, Diabetes and Complications: cellular Signaling Pathways, Current Understanding and Targeted Therapies, Curr. Drug Targets 17 (2016) 1309 -1328.
- [4] I. Kavakiotis, O. Tsave, A. Salifoglou, N. Maglaveras, I. Vlahavas, I. Chouvarda, Machine Learning and Data Mining Methods in Diabetes Research, Comput. Struct. Biotechnol. J. 15 (2017) 104 -116.
- [5] A. Hussain, B. Bhowmik, N.C. do Vale Moreira, COVID-19 and diabetes: knowledge in progress, Diabetes Res. Clin. Pract. 162 (2020), 108142.
- [6] G.P. Fadini, M.L. Morieri, E. Longato, A. Avogaro, Prevalence and impact of diabetes among people infected with SARS-CoV-2, J. Endocrinol. Invest. 43 (2020) 867 -869.
- [7] C. Cristelo, C. Azevedo, J.M. Marques, R. Nunes, B. Sarmento, SARS-CoV-2 and diabetes: new challenges for the disease, Diabetes Res. Clin. Pract. 164 (2020), 108228.
- [8] W. Bao, F.B. Hu, S. Rong, Y. Rong, K. Bowers, E.F. Schisterman, L. Liu, C. Zhang, Predicting risk of type 2 diabetes mellitus with genetic risk models on the basis of established genome-wide association markers: a systematic review, Am. J. Epidemiol. 178 (2013) 1197 -1207.
- [9] M. Imamura, D. Shigemizu, T. Tsunoda, M. Iwata, H. Maegawa, H. Watada, H. Hirose, Y. Tanaka, K. Tobe, K. Kaku, A. Kashiwagi, R. Kawamori, S. Maeda, Assessing the clinical utility of a genetic risk score constructed using 49 susceptibility alleles for type 2 diabetes in a Japanese population, J. Clin. Endocrinol. Metab. 98 (2013) E1667 -E1673.
- [10] X. Zhou, Q. Qiao, L. Ji, F. Ning, W. Yang, J. Weng, Z. Shan, H. Tian, Q. Ji, L. Lin, Q. Li, J. Xiao, W. Gao, Z. Pang, J. Sun, Nonlaboratory-based risk assessment algorithm for undiagnosed type 2 diabetes developed on a nation-wide diabetes survey, Diabetes Care. 36 (2013) 3944 -3952.
- [11] W.G. Gao, Y.H. Dong, Z.C. Pang, H.R. Nan, S.J. Wang, J. Ren, L. Zhang, J. Tuomilehto, Q. Qiao, A simple Chinese risk score for undiagnosed diabetes, Diabetic medicine: a journal of the British Diabetic Association 27 (2010) 274 -281.
- [12] A.U. Haq, J.P. Li, J. Khan, M.H. Memon, S. Nazir, S. Ahmad, G.A. Khan, A. Ali, Intelligent Machine Learning Approach for Effective Recognition of Diabetes in EHealthcare Using Clinical Data, Sensors 20 (9) (2020) 2649.
- [13] H.F. Germany, Diabetes Data Set., in, Available online: https://www.kaggle.com/j ohndasilva/diabetes, (accessed on 15 September 2019).
- [14] Q. Zou, K. Qu, Y. Luo, D. Yin, Y. Ju, H. Tang, Predicting Diabetes Mellitus With Machine Learning Techniques, Front. Genet. 9 (2018) 515.
- [15] A. Bonacaro, I. Rubbi, D. Sookhoo, The use of wearable devices in preventing hospital readmission and in improving the quality of life of chronic patients in the homecare Setting: a Narrative Literature Review, Prof. Inferm. 72 (2019) 143 -151.

- [16] Y. Zhang, R. Gravina, H.M. Lu, M. Villari, G. Fortino, PEA: parallel electrocardiogram-based authentication for smart healthcare systems, J. Netw. Comput. Appl. 117 (2018) 10 -16.
- [17] Y. Zhang, GroRec: a Group-Centric Intelligent Recommender System Integrating Social, Mobile and Big Data Technologies, IEEE T Serv. Comput. 9 (2016) 786 -795.
- [18] M. Zitnik, F. Nguyen, B. Wang, J. Leskovec, A. Goldenberg, M.M. Hoffman, Machine Learning for Integrating Data in Biology and Medicine: principles, Practice, and Opportunities, Inf. Fusion 50 (2019) 71 -91.
- [19] A. American Diabetes, Classification and diagnosis of diabetes, Diabetes Care. 38 (Suppl(2)) (2015) S8 -S16.
- [20] C.A. Emdin, K. Rahimi, B. Neal, T. Callender, V. Perkovic, A. Patel, Blood pressure lowering in type 2 diabetes: a systematic review and meta-analysis, JAMA 313 (2015) 603 -615.
- [21] K. Radholm, J. Chalmers, T. Ohkuma, S. Peters, N. Poulter, P. Hamet, S. Harrap, M. Woodward, Use of the waist-to-height ratio to predict cardiovascular risk in patients with diabetes: results from the ADVANCE-ON study, Diabetes Obes. Metab. 20 (2018) 1903 -1910.
- [22] Y. Liao, M.S. Leeson, Q. Cai, Q. Ai, Q. Liu, Mutual-Information-Based Incremental Relaying Communications for Wireless Biomedical Implant Systems, Sensors 18 (2) (2018) 515.
- [23] J.N. Rouder, C.R. Engelhardt, S. McCabe, R.D. Morey, Model comparison in ANOVA, Psychon. Bull. Rev. 23 (2016) 1779 -1786.
- [24] T.Q. Chen, C. Guestrin, XGBoost: a Scalable Tree Boosting System, in: Kdd ' 16: Proceedings Of the 22nd Acm Sigkdd International Conference on Knowledge Discovery And Data Mining, 2016, pp. 785 -794.
- [25] Z.Y. Zhang, Y.H. Yang, H. Ding, D. Wang, W. Chen, H. Lin, Design powerful predictor for mRNA subcellular location prediction in Homo sapiens, Brief. Bioinformatics 22 (1) (2021) 526 -535.
- [26] J.W. Tukey, Dyadic anova, an analysis of variance for vectors, Hum. Biol. 21 (1949) 65 -110.
- [27] V. Svetnik, A. Liaw, C. Tong, J.C. Culberson, R.P. Sheridan, B.P. Feuston, Random forest: a classification and regression tool for compound classification and QSAR modeling, J. Chem. Inf. Comput. Sci. 43 (2003) 1947 -1958.
- [28] S. Israel, A. Caspi, D.W. Belsky, H. Harrington, S. Hogan, R. Houts, S. Ramrakha, S. Sanders, R. Poulton, T.E. Moffitt, Credit scores, cardiovascular disease risk, and human capital, Proc. Natl. Acad. Sci. U.S.A. 111 (2014) 17087 -17092.
- [29] L.T. Dean, E.A. Knapp, S. Snguon, Y. Ransome, D.M. Qato, K. Visvanathan, Consumer credit, chronic disease and risk behaviours, J. Epidemiol. Community Health 73 (2019) 73 -78.
- [30] D.J. Kirkland, M. Aardema, N. Banduhn, P. Carmichael, R. Fautz, J.R. Meunier, S. Pfuhler, In vitro approaches to develop weight of evidence (WoE) and mode of action (MoA) discussions with positive in vitro genotoxicity results, Mutagenesis 22 (2007) 161 -175.
- [31] A.T. Hall, S.E. Belanger, P.D. Guiney, M. Galay-Burgos, G. Maack, W. Stubblefield, O. Martin, New approach to weight-of-evidence assessment of ecotoxicological

effects in regulatory decision-making, Integr. Environ. Assess Manag. 13 (2017) 573 -579.

- [32] H. Tang, R.Z. Cao, W. Wang, T.S. Liu, L.M. Wang, C.M. He, A two-step discriminated method to identify thermophilic proteins, Int. J. Biomath. 10 (2017) 1750050.
- [33] S. Basith, B. Manavalan, T.H. Shin, G. Lee, iGHBP: computational identification of growth hormone binding proteins from sequences using extremely randomised tree, Comput. Struct. Biotechnol. J. 16 (2018) 412 -420.
- [34] H. Ma, A.I. Bandos, D. Gur, On the use of partial area under the ROC curve for comparison of two diagnostic tests, Biom. J. 57 (2015) 304 -320.
- [35] J.X. Tan, H. Lv, F. Wang, F.Y. Dao, W. Chen, H. Ding, A Survey for Predicting Enzyme Family Classes Using Machine Learning Methods, Curr. Drug Targets 20 (2019) 540 -550.
- [36] A. Swami, R. Jain, Scikit-learn: machine Learning in Python, J. Machine Learn. Res. 12 (2013) 2825 -2830.
- [37] Y. Tian, C. Jiang, M. Wang, R. Cai, Y. Zhang, Z. He, H. Wang, D. Wu, F. Wang, X. Liu, Z. He, P. An, M. Wang, Q. Tang, Y. Yang, J. Zhao, S. Lv, W. Zhou, B. Yu, J. Lan, X. Yang, L. Zhang, H. Tian, Z. Gu, Y. Song, T. Huang, L.R. McNaughton, BMI, leisure-time physical activity, and physical fitness in adults in China: results from a series of national surveys, 2000-14, Lancet Diabetes Endocrinol. 4 (2016) 487 -497.
- [38] J.A. Nazare, J.D. Smith, A.L. Borel, S.M. Haffner, B. Balkau, R. Ross, C. Massien, N. Almeras, J.P. Despres, Ethnic influences on the relations between abdominal subcutaneous and visceral adiposity, liver fat, and cardiometabolic risk profile: the International Study of Prediction of Intra-Abdominal Adiposity and Its Relationship With Cardiometabolic Risk/Intra-Abdominal Adiposity, Am. J. Clin. Nutr. 96 (2012) 714 -726.
- [39] S. Zoungas, M. Woodward, Q. Li, M.E. Cooper, P. Hamet, S. Harrap, S. Heller, M. Marre, A. Patel, N. Poulter, B. Williams, J. Chalmers, A.C. group, Impact of age, age at diagnosis and duration of diabetes on the risk of macrovascular and microvascular complications and death in type 2 diabetes, Diabetologia 57 (2014) 2465 -2474.
- [40] H.C. Looker, W.C. Knowler, R.L. Hanson, Changes in BMI and weight before and after the development of type 2 diabetes, Diabetes Care. 24 (2001) 1917 -1922.
- [41] S. Basith, B. Manavalan, T. Hwan Shin, G. Lee, Machine intelligence in peptide therapeutics: a next-generation tool for rapid disease screening, Med. Res. Rev. 40 (4) (2020) 1276 -1314, https://doi.org/10.1002/med.21658.
- [42] W. Shoombuatong, N. Schaduangrat, R. Pratiwi, C. Nantasenamat, THPep: a machine learning-based approach for predicting tumor homing peptides, Comput. Biol. Chem. 80 (2019) 441 -451.
- [43] N. Stephenson, E. Shane, J. Chase, J. Rowland, D. Ries, N. Justice, J. Zhang, L. Chan, R. Cao, Survey of Machine Learning Techniques in Drug Discovery, Curr. Drug Metab. 20 (2019) 185 -193.
