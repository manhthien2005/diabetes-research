<!-- extracted by pdf-extract | engine=docling | pages=13 | ocr=True | tables=12/4 | density=1.00 | score=100 -->

Contents lists available at ScienceDirect

## Healthcare Analytics

journal homepage: www.elsevier.com/locate/health

## A novel machine learning approach for diagnosing diabetes with a self-explainable interface

Gangani Dharmarathne a,b , Thilini N. Jayasinghe a,b , Madhusha Bogahawaththa c , D.P.P. Meddage c , Upaka Rathnayake d,*

- a The Charles Perkins Centre, The University of Sydney, Sydney, NSW, 2006, Australia
- b School of Dentistry, Faculty of Medicine and Health, The University of Sydney, Sydney, NSW, 2006, Australia
- c School of Engineering and Information Technology, University of New South Wales, Canberra, Australia
- d Department of Civil Engineering and Construction, Faculty of Engineering and Design, Atlantic Technological University, Sligo, Ireland

## A R T I C L E I N F O

Handling Editor: Madijd Tavana

Keywords: Machine learning Diabetes Predictive analytics Self-explainable interface Healthcare Diagnosis

## 1. Introduction

High glucose levels in the blood are referred to as diabetes, and it has become a worldwide chronic medical condition in the past few decades. The hormone responsible for controlling blood glucose levels is insulin, and its insufficient production and ineffective utilisation are the major reasons for diabetes. Over time, diabetes can lead to various health complications that can affect many organs in the human body [1]. In 2017, 452 million diabetes patients were identified, and this number is anticipated to increase to 694 million by 2045 [2]. According to another study, by 2030 and 2045, it is expected to rise to 25% and 51% of the population, respectively [2]. Mainly, three types of diabetes can be identified, namely ' type 1 diabetes, type 2 diabetes, and gestational diabetes ' [3]. Type 1 diabetes occurs when the immune system accidently attacks the beta cells in the pancreas and destroys the insulin production process [4]. Among the three types of diabetes, type 2 diabetes is the most common form and is always related to our lifestyle behaviours [5 -8], dietary habits [9], obesity, sedentary behaviours, and

* Corresponding author. E-mail address: Upaka.Rathnayake@atu.ie (U. Rathnayake).

## https://doi.org/10.1016/j.health.2024.100301

## A B S T R A C T

This study introduces the first-ever self-explanatory interface for diagnosing diabetes patients using machine learning. We propose four classification models (Decision Tree (DT), K-nearest Neighbor (KNN), Support Vector Classification (SVC), and Extreme Gradient Boosting (XGB)) based on the publicly available diabetes dataset. To elucidate the inner workings of these models, we employed the machine learning interpretation method known as Shapley Additive Explanations (SHAP). All the models exhibited commendable accuracy in diagnosing patients with diabetes, with the XGB model showing a slight edge over the others. Utilising SHAP, we delved into the XGB model, providing in-depth insights into the reasoning behind its predictions at a granular level. Subsequently, we integrated the XGB model and SHAP ' s local explanations into an interface to predict diabetes in patients. This interface serves a critical role as it diagnoses patients and offers transparent explanations for the decisions made, providing users with a heightened awareness of their current health conditions. Given the highstakes nature of the medical field, this developed interface can be further enhanced by including more extensive clinical data, ultimately aiding medical professionals in their decision-making processes.

mental wellness [10]. In type 2 diabetes, the pancreas fails to produce sufficient insulin to meet the demand, and the body becomes resistant to insulin [11]. Therefore, it can no longer control blood glucose levels, and people with type 2 diabetes must also undergo different medications and maintain their behaviours to stay on track [12]. Gestational Diabetes develops during pregnancy and usually resolves after childbirth [13]. It can increase the risk of complications for both the mother and the baby.

Depending on the particular type of diabetes, there can be a wide range of symptoms. However, frequent urination, unexplained weight loss, increased hunger, exhaustion, blurred vision, numbness, and repeated infections are some typical symptoms [14]. Early indications of diabetes frequently include increased thirst and urination, and individuals with the disease may lose weight despite having increased hunger [1]. Blurred vision results from the eye ' s lens being impacted by high blood sugar levels. High blood sugar levels can compromise the immune system, making infections more likely to occur and wounds and cuts more difficult to heal. There are numerous approaches to blood glucose control, depending on the type of diabetes. While type 2 diabetes may require oral drugs or insulin injections depending on the degree of severity, type 1 diabetes is typically controlled with insulin therapy. Diabetes patients can control their blood glucose levels by routinely testing them and modifying their medication regimens as necessary. Diet is also crucial in this situation. To effectively treat diabetes, a balanced, nutritious diet must be adopted, along with careful attention to carbohydrate intake and portion control. Physical activity helps regulate blood sugar levels, reduce weight, and enhance insulin sensitivity.

Through the integration of machine learning techniques, artificial intelligence has strongly impacted the advancement of a broad spectrum of fields, especially the field of medicine [15 -17]. This will lead to improved diagnostic accuracy, treatment arrangement, and patient care. These advanced technologies are widely used in patient medical records, clinical notes, medical images, and genomic data. These data-driven approaches help healthcare professionals identify patterns and correlations and assist in understanding how data mining techniques reveal trends within the dataset. This significance stems from the swift advancement of artificial intelligence technology and its integration into the medical field [18,19]. Moreover, this can lead to a dual benefit of reducing treatment costs while simultaneously improving overall health conditions. Considering the availability of diabetes-related data, numerous researchers have employed various machine learning algorithms to analyse the condition [20]. Among these techniques, artificial neural networks (ANN), decision trees (DT), logistic regression, K-nearest neighbors (KNN), random forest (RF) and extreme gradient boosting (XGB) are frequently used for classification.

With the use of machine learning, the research community has been able to diagnose diabetes accurately. However, the models are not transparent, and this raises critical questions about how they diagnose patients. People have turned to explainable artificial intelligence models that interpret machine learning models to address this issue. These methods elucidate the governing factors behind the diagnosis and how the model arrives at a specific decision. Nevertheless, the use of explainable artificial intelligence has been limited in the context of diabetes prediction. Mostly, global explanations have been used in related work.

In this study, the authors aimed to develop the first-ever selfexplanatory interface for diagnosing diabetes using machine learning methods. This implies an interface to predict whether an individual is likely to have diabetes or not with the reasoning behind. Moreover, the authors conducted an in-depth analysis of the models using explainable AI. For this, they used a publicly available diabetes database to train the models (https://www.kaggle.com/datasets/mathchi/diabetes-data-se t). The motivation behind this research stems from the growing prevalence of diabetes and the need for innovative solutions to enhance early detection and awareness. As the novelty of this work, the approach not only diagnoses diabetes using machine learning but also provides the reasoning behind it using explainable artificial intelligence, along with a user-friendly interface. Individuals can use this interface to self-diagnose their prevailing conditions with a certain level of accuracy and understand the reasons behind them. By using machine learning in this manner, the authors intend to implement it in real applications to improve people ' s awareness of diabetes, which is a critical condition. The outcomes provided by the interface can educate people on whether they should seek medical treatments. The study aims to bridge the gap between technology and public health, offering a proactive approach to diabetes management and potentially reducing the overall burden on healthcare systems.

## 2. Literature review

Machine learning, a subset of AI, is focused on creating computer systems capable of uncovering patterns within huge data, enabling both categorisation and prediction tasks when presented with new data illustrations [21,22]. Machine learning employs tools from data mining, statistics, and various optimisation procedures to construct efficient models. Another significant aspect of machine learning is representational learning, a subfield that concentrates on automatically identifying the most suitable data representation to abstract knowledge [15]. Numerous machine learning algorithms have been proposed and adapted in various forms to optimise performance for tasks like the one under consideration. In recent developments, this influence extends to personalised diagnosis and treatment approaches [23,24]. The application of artificial intelligence and machine learning to medical procedures and treatments marks a huge shift in the way healthcare is provided [25 -27]. By utilising the knowledge gained from big data analysis, these technologies help to develop more efficient and individualised methods of diagnosis and treatment. This, in turn, enables healthcare professionals to make more informed and timely decisions regarding patient care [28]. For example, in oncology, machine learning models can assist in predicting treatment responses and tailoring therapeutic regimens based on individual patient profiles, thereby optimising outcomes and minimising adverse effects.

High blood glucose levels in blood referred as diabetes and Type 2 diabetes mellitus is the most prevalent form of diabetes [29]. It is characterised by the impaired ability of the metabolic system to regulate carbohydrate and lipid levels due to malfunctioning insulin. This leads to high blood glucose levels, a condition known as hyperglycemia. In cases of persistent hyperglycemia, particularly in insulin-dependent diabetes (type 1) without insulin therapy, the risk of ketoacidosis increases [30]. Type 1 diabetes is more common in children and is characterised by the autoimmune destruction of beta cells in the pancreas [31,32]. Conversely, type 2 diabetes, also known as non-insulin-dependent diabetes, is more prevalent in individuals aged 40 and older. However, it is increasingly observed in those under the age of 40, especially in developed nations where obesity rates are rising. In younger people with type 2 diabetes, genetic abnormalities can lead to insulin resistance, insulin deficiency, or both. Early diagnosis of diabetes, especially type 2, provides individuals with a better chance to mitigate the serious complications associated with the condition [31, 33 -35]. These complications include kidney failure, blindness, heart attacks, strokes, and even limb amputations due to circulation problems [34,36]. As a result, the American Diabetes Association (ADA) recommends screening people for pre-diabetic conditions. To achieve this, an oral glucose tolerance test is used to establish a threshold [33].

Besides checking blood glucose levels, there are other indicators that can help diagnose diabetes. It has been emphasised that there is a correlation between diabetes and obesity, particularly when type 2 diabetes first appears, as well as insulin resistance [37]. Researchers [38] have identified several chemicals, such as increased glycerol, cytokinins, nonesterified fatty acids, pro-inflammatory markers, and various substances, as variables contributing to the development of insulin resistance in obese individuals. Beyond obesity, variations in insulin sensitivity have also been observed, with increased resistance seen during pregnancy, puberty, and aging, as reported by different researchers [37,39,40]. The consumption of carbohydrates and the level of physical activity have also been associated with fluctuations in insulin sensitivity [37], with obesity emerging as the most impactful factor [37, 41]. Another determinant of insulin sensitivity is the distribution of body fat. Studies have shown that individuals with peripheral fat distribution exhibit better insulin sensitivity compared to those with centralised fat distribution around the abdomen and/or chest regions [41]. Furthermore, it has been firmly established that Body Mass Index (BMI) displays a robust correlation with both diabetes and insulin resistance.

A study conducted in Tianjin, China, investigated various factors affecting the management of diabetes [42]. Out of the 29 characteristics they examined, they identified 12 themes that contribute to the heightened vulnerability of diabetes patients. These themes include social integration, lifestyle limitations, lifestyle modifications, disease severity, health literacy, financial constraints, health beliefs, the medical environment, time constraints, mental well-being, levels of support, and transition experiences [43]. Furthermore, Derraik et al. [44] demonstrated that age, BMI, gender, and puberty status all influence skin thickness in relation to diabetes. Therefore, successful diabetes management necessitates significant lifestyle modifications. Recent research identified key areas, such as dietary adjustments and regular physical activity, where patients encountered challenges and opportunities for improvement [45].

The significance of artificial intelligence and machine learning in reshaping medical practices is evidenced by the works of researchers such as [46 -50]. Their findings underscore the potential of these technologies in improving patient care through enhanced predictive capabilities and personalised treatment strategies. For instance, Adlung et al. demonstrated the efficacy of DTs in predicting disease outcomes based on patient data, highlighting its utility in medical decision-making [24]. Additionally, the work of Uddin and colleagues showcased the effectiveness of K-nearest neighbor algorithms in identifying patterns in diagnostic imaging, contributing to improved disease detection [51]. Support vector classification has been extensively studied for its applications in medical diagnostics, as seen in the research conducted by Cervantes et al., where they successfully employed SVC to classify medical images with high accuracy [52]. Moreover, the work of Zhang et al. provided valuable insights into the application of extreme gradient boosting for personalised treatment recommendations, emphasising its potential impact on individualised patient care [25].

Recent studies on diabetes prediction have witnessed the widespread application of diverse machine learning models, ranging from traditional algorithms such as Logistic Regression and k-Nearest Neighbors to advanced techniques like Artificial Neural Networks, Random Forests, and Deep Neural Networks. The study by Darolia &amp; Chhillar analyzed diabetes dataset using popular algorithms Artificial Neural Network, Random Forest and Logistic Regression [53]. Remarkably, their findings indicated that Logistic Regression outperformed the other algorithms, showcasing its efficacy in diabetes prediction. Ferbian et al. took a different approach by employing supervised machine learning techniques, specifically pitting two k-Nearest Neighbor algorithms against the Naive Bayes algorithm for diabetes prediction [54]. Intriguingly, their study concluded that the Naive Bayes algorithm exhibited superior performance when compared to KNN in this context [54]. Mousa et al. conducted a comprehensive comparative study that focused on three widely-used models: Long Short-Term Memory, Random Forest and Convolutional Neural Network for diabetes diagnosis [55]. This research sheds light on the varying strengths of these models and provides valuable insights into their applicability in the context of diabetes prediction [55]. Reza et al. concentrated on enhancing the performance of Support Vector Machines for type II diabetes prediction, specifically by introducing an improved non-linear kernel [55]. This nuanced approach contributes to the ongoing efforts to optimise the accuracy and reliability of predictive models for diabetes. Ovass et al. introduced a Deep Neural Network (DNN) model for diabetes prediction [56]. Their exploration into deep learning techniques provides a contemporary perspective on the potential of neural networks in the realm of diabetes diagnosis [56]. Kuchariapati et al. ' s comparative analysis used data mining techniques in prediction [57], while Ayushi et al. ' s study focuses on supervised machine learning algorithms [58].

Artificial intelligence and machine learning techniques have garnered significant attention in recent years for the analysis of diabetes [21,22,59]. These cutting-edge technologies provide valuable insights into disease prevention and management [15]. Research findings demonstrate the profound impact of artificial intelligence and machine learning in unravelling intricate patterns and relationships within large datasets associated with diabetes [1,46]. In the state of disease management, artificial intelligence machine learning have proven instrumental. The recent work of Bergoeing et al. showcased the use of these technologies in providing advanced and personalised treatment plans for diabetes patients, resulting in improved outcomes and enhanced patient-centric care [60]. Additionally, the study conducted by Levy-Loboda et al. highlighted the ability of machine learning algorithms to optimise insulin dosage based on real-time data, illustrating the potential for tailored and dynamic treatment strategies [23].

Despite the existing literature on diabetes prediction, insufficient attention has been given to the characteristics of resilient models that can perform effectively when data is limited. Furthermore, explainable artificial intelligence has primarily been used to interpret the importance of factors in a global manner. Explainable artificial intelligence can be employed at a finer level, elucidating minor details that are imperative to reach a decision. Additionally, no study has developed a self-explanatory interface that predicts diabetes with underlying reasoning. Therefore, the present study intends to address this research gap by providing a valuable outcome to the research community.

## 3. Methodology

## 3.1. Electronic health records analysis

Generally, health records contain important diagnostic results, and qualified practitioners traditionally collect medical records. Nowadays, the use of these medical records has increased, and medical diagnosis shows promising results with these data records. The dataset used is available online on Kaggle and was published from the Pima Indians Diabetes Database from the National Institute of Diabetes and Digestive and Kidney Diseases. All the data have been collected from 768 individuals aged between 21 and 81 years, and the detailed features are shown in Table 1. The dataset includes eight attributes: pregnancies, glucose, blood pressure, skin thickness, insulin, Body Mass Index (BMI), diabetes pedigree function, and age.

The provided dataset was analyzed to determine attribute correlations using the Pearson correlation coefficient and identify the most valuable aspects. The correlations between characteristics are presented in the correlation matrix in Fig. 1. Each attribute has a one-to-one correlation with the others, resulting in a correlation value. Attributes with higher correlation values exhibit either very high positive or very high negative associations. The highest positive correlation was observed between age and pregnancies, with a strong positive value of 0.54. Glucose and outcome showed a correlation value of 0.47, indicating a strong association with the outcome in the sample. Conversely, age and skin thickness had the most petite association, with a value of 0.11.

Notably, glucose displayed the most positive correlation with the outcome, which is expected given that diabetes is linked to high blood glucose levels. Overall, as depicted in the correlation matrix (Fig. 1), no features exhibit particularly high correlations with each other. This suggests that each characteristic independently influences diabetes prediction. The data underwent preprocessing to address incorrect inputs and manage them more effectively. Subsequently, the dataset was used for model training.

Table 1

The attributes in the dataset and their description.

| Feature                    | Description                                      | Range                        |
|----------------------------|--------------------------------------------------|------------------------------|
| Pregnancies                | Number of times the individual was pregnant      | 0 - 17                       |
| Glucose                    | Concentration of plasma glucose                  | 0 - 199                      |
| Blood pressure             | Diastolic blood pressure (mmHg)                  | 0 - 122                      |
| Skin thickness             | Triceps skin fold thickness in mm                | 0 - 99                       |
| Insulin                    | 2-h serum insulin (muU/ml)                       | 0 - 846                      |
| Body Mass Index (BMI)      | Body mass index (weight in kg/(height in m) 2    | 0 - 67.1                     |
| Diabetes pedigree function | Diabetes Pedigree Function between 0.08 and 2.42 | 0.08 - 2.42                  |
| Age                        | Measured in years                                | 21 - 81                      |
| Outcome                    | Diabetes/No diabetes                             | Diabetes = 1 No diabetes = 0 |

Fig. 1. The correlation matrix of the diabetes EHR used for this study.

## 3.2. Machine learning models

The machine learning was performed using Python programming [61] and the popular machine learning library: Sci-Kit learn [62]. In this study, we employed diverse machine learning models, including Decision Tree (DT), K-Nearest Neighbor (KNN), Support Vector Classifier (SVC), and Extreme Gradient Boosting (XGB), to classify diabetes with good accuracy. Decision Trees are known for their interpretable nature and hierarchical structure, making them valuable for revealing critical decision paths in the data. K-Nearest Neighbor leverages the proximity of data points for classification, offering a robust approach to pattern recognition. Support Vector Classifier excels at separating complex, high-dimensional datasets by finding optimal hyperplanes. Lastly, Extreme Gradient Boosting harnesses the power of ensemble learning to improve predictive accuracy by sequentially optimising weak learners. The utilisation of these models allows us to explore a wide range of techniques for diabetes classification and offers valuable insights into this critical healthcare application.

## 3.3. Shapley additive explanation (SHAP)

SHAP was utilised to unveil the importance of each attribute in predicting the disease state [63]. This offers a method for assessing the significance of each feature within the dataset, rooted in game theory principles [64]. This technique facilitates the aggregation of model outcomes, whereby the incremental contribution of each feature across all possible feature combinations is averaged to determine its relative weight within the model [65 -68]. In simpler terms, SHAP evaluates how the inclusion or exclusion of each element impacts the accuracy of the results [69 -72]. Leveraging this method, we can transform complex machine-learning models into interpretable ones, shedding light on the factors driving the predictions and enhancing our understanding of the disease prediction process.

## 4. Result and discussion

## 4.1. Model evaluation

For model training, 70% of the total dataset was utilised, while the remaining set was reserved for model validation. The random search method was used to optimise the hyperparameters in each machine learning classifier. After optimising each model, we compared four different models to assess their effectiveness, employing various metrics including sensitivity, precision, accuracy, F1 score, and false positive rate, as summarised in Table 2. Sensitivity, evaluated through equation (1), measures a model ' s capacity to accurately identify positive cases, considering both true positives and false negatives. Notably, the XGB model demonstrated the highest sensitivity, achieving scores of 76% for training and 73% for testing data. Precision, computed using equation (2), signifies a model ' s ability to minimise false positives. To evaluate overall model accuracy, we employed the accuracy ratio defined in equation (3), representing the percentage of correctly predicted samples out of the total sample count. The XGB model displayed the highest accuracy, scoring 80% for training and 77% for testing, while the DT

Table 2

Performance evaluation of machine learning models ((Phase; T: Training, V: Testing (validation).

| Model   | Phase   |   Precision |   Recall/TPR/ Sensitivity |   F1 score |   Accuracy |   FPR |
|---------|---------|-------------|---------------------------|------------|------------|-------|
| DT      | T       |        0.62 |                      0.70 |       0.66 |       0.78 |   0.2 |
|         | V       |        0.63 |                      0.68 |       0.65 |       0.76 |   0.2 |
| SVC     | T       |        0.78 |                       0.5 |       0.61 |       0.78 |   0.1 |
|         | V       |        0.60 |                      0.72 |       0.65 |       0.77 |   0.2 |
| KNN     | T       |        0.60 |                      0.73 |       0.66 |       0.79 |  0.22 |
|         | V       |        0.60 |                      0.69 |       0.64 |       0.77 |  0.21 |
| XGB     | T       |        0.62 |                      0.76 |       0.68 |       0.80 |  0.20 |
|         | V       |        0.60 |                      0.73 |       0.65 |       0.77 |   0.2 |

model showed the least accuracy in testing. The F1 score, derived from the formula in (4), strikes a balance between a classifier ' s recall of positive cases and its precision in identifying them. Finally, we calculated each model ' s False Positive Rate (FPR) using equation (5). It is noteworthy that the XGB model exhibited remarkable accuracy in this study, showcasing its versatility and efficiency in predicting diabetes diagnoses.

Table 2 presents limited performance indices, prompting the authors to present a confusion matrix to highlight the classification ability of each model. These matrices categorise our classification results into four distinct groups: true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN), as illustrated in Fig. 2. Our analysis revealed that the K-Nearest Neighbors (KNN) model achieved the highest TP values. In the training DT, SVC, KNN and XGB models identified 132, 106, 127 and 131 patients with diabetes respectively, while in the testing set, identified 33 -34 patients as having diabetes. Additionally, the model effectively recognised healthy patients who did not have diabetes, representing the TN category. However, there were instances where the model incorrectly classified healthy patients as having diabetes, leading to FP cases. Conversely, FN cases, where the model mistakenly considered patients with diabetes as healthy, could significantly impact the results. Notably, the XGB model demonstrated the fewest FN cases in both the training and testing sets, with only 41 and 13 instances, respectively. This implies that the XGB model was particularly adept at minimising the risk of failing to identify patients with diabetes. These findings shed light on how well our models perform correctly and incorrectly classifying patients, with the DT model excelling in TP detection and the XGB model showing remarkable reliability in minimising FN cases, a critical factor in medical diagnosis.

The graphical representation of a model ' s ability to discriminate between the positive and negative classes across different decision thresholds is presented in receiver operating characteristic (ROC) curves. In the case of a better model, the ROC curves should cover most of the area under the curve (AUC) and be closer to the 0, 1 ordinate (refer to Fig. 3). Additionally, the red and blue curves should be nearly closer. In this study, all four models exhibited similar variations in their ROC curves despite differences in their magnitude of AUC. The lowest AUC values were recorded for the DT and KNN models, both of which showed comparable AUC values for training and testing data. However, the XGB model achieved an AUC of 0.856 for training and 0.82 for testing, indicating superior model characteristics in terms of diabetes classification.

The following Table 3 presents the related work used machine learning for diabetes predictions. In comparing the performance of various predictive models for diabetes mellitus across different studies, notable variations emerge in the metrics of precision, accuracy, recall, and F1 score. The present study has achieved almost good performance compared to remaining studies. However, it is crucial to note that certain studies lack specific metrics or the use of explainable artificial intelligence (XAI). These comparative insights underscore the diversity in model performance and interpretability across different approaches to diabetes prediction in machine learning research. Not only the authors used XAI, but also we developed it to an interface to provide an explainable user interface.

Overall, from the analysis, the authors observed that the XGB model outperforms the remaining models. However, these models provide only the outcome without offering insight into the underlying reasoning behind the predictions. To address this, the authors employed SHAP explanations on the XGB model to investigate the model ' s decisionmaking process. These explanations can be categorised as either global or local, depending on what is being explained. Global explanations encompass explanations observed for the entire model or a portion of the model that contains more than a single instance. In contrast, local explanations provide interpretations for a single instance, offering a more granular perspective on the model ' s predictions.

## 5. Model explanations

## 5.1. Global explanations

According to Fig. 4, it is evident that glucose levels exert the most significant influence on diabetes prediction. The colour bar on the righthand side denotes higher or lower values of any feature. For example, if a feature ranges between 0 and 100, values closer to 100 will be denoted in red, and values closer to 0 will be denoted in blue. An increase in glucose levels (indicated by the red-coloured region) consistently positively impacts the likelihood of diabetes, as reflected in positive SHAP values. Conversely, lowering glucose levels has a negative impact, reducing the possibility of diabetes. The second most dominant feature is BMI (Body Mass Index). Higher BMI values exhibit a relatively small but positive influence on diabetes prediction, while lower BMI values decrease the likelihood of diabetes. A similar trend is observed for age; older individuals are more likely to have diabetes compared to younger individuals.

The remaining features contribute to a lesser extent to the model ' s classification but still have specific impacts, as shown in Fig. 5. In Fig. 5, the average impact of each parameter on diabetes prediction is represented. The first five features (in red) have a positive impact on the model, signifying that an increase in each of these features raises the likelihood of having diabetes. BMI and age have comparable effects on diabetes prediction, while diabetes pedigree function and the number of pregnancies have a slight but positive impact on the outcome. Skin thickness and insulin levels, on the other hand, have a very minimal but negative impact on diagnosing diabetes. Increasing skin thickness and insulin levels reduce the likelihood of diabetes. Notably, blood pressure has an insignificant impact on diabetes prediction, according to the model.

Subsequently, the authors delved into an in-depth investigation of the first three features and how their values impact the likelihood of diabetes diagnosis. Fig. 6 a illustrates that an increase in glucose levels up to 75 does not significantly impact the likelihood of diabetes. Glucose levels up to 100 even reduce the possibility of a diabetes diagnosis. However, when glucose levels exceed 100, this begins to increase the likelihood of diabetes. Similarly, BMI levels above 30 and age above 30 generally positively impact the likelihood of diabetes, as depicted on the left axis (SHAP value).

On the right-hand side, the colour bar represents secondary features that are primarily associated with the primary feature. In the case of glucose levels, age is the primary associated feature. For BMI and age, glucose is the primary associated feature. However, the feature values (represented by red or blue colour) exhibit a mixed variation in diagnosing diabetes. Yet, the feature age demonstrates some notable variation in glucose levels. Instances where age is greater than 30 are associated with more frequent red-colour dots, indicating that higher glucose levels are more commonly associated with older individuals in the context of diabetes diagnosis.

Based on the dominant features, the authors segmented the explanations to explore further patterns in the dataset, as displayed in Fig. 7.

Fig. 2. Confusion matrices of four machine learning classifiers (Training and Testing).

| DT training        | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 132      | 81          |
| diabetes 2         | 56       | 345         |

| SVC training       | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 106      | 31          |
| diabetes 2         | 107      | 370         |

| KNN       | KNN        | Actual   | Actual      |
|-----------|------------|----------|-------------|
| training  | training   | Diabetes | No diabetes |
| Predicted | Diabetes   | 127      | 86          |
| Predicted | diabetes 2 | 46       | 355         |

| XGB training       | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 131      | 82          |
| diabetes 2         | 41       | 360         |

| DT testing         | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 34       | 21          |
| diabetes 2         | 16       | 83          |

| SVC       | SVC         | Actual   | Actual      |
|-----------|-------------|----------|-------------|
| testing   | testing     | Diabetes | No diabetes |
| Predicted | Diabetes    | 33       | 22          |
| Predicted | diabetes ON | 13       | 86          |

| KNN       | KNN         | Actual   | Actual      |
|-----------|-------------|----------|-------------|
| testing   | testing     | Diabetes | No diabetes |
| Predicted | Diabetes    | 33       | 22          |
| Predicted | diabetes No | 15       | 84          |

| XGB testing        | Actual   | Actual      |
|--------------------|----------|-------------|
|                    | Diabetes | No diabetes |
| Diabetes Predicted | 33       | 22          |
| diabetes No        | 13       | 86          |

Fig. 3. ROC curves obtained for machine learning models for training and testing.

Table 3 Model performance obtained from recent related studies for predicting diabetes.

| Reference     | Precision   | Accuracy   | Recall   | F1 Score   | FPR      |
|---------------|-------------|------------|----------|------------|----------|
| Present study | 60 - 78%    | 76 - 80%   | 50 - 76% | 61 - 68%   | 10 - 22% |
| [53]          | -           | 74 - 77%   | -        | -          | -        |
| [54]          | 70 - 73%    | 73 - 76%   | 69 - 71% | -          | -        |
| [55]          | 75 - 82%    | 78 - 85%   | 72 - 78% | 73 - 80%   | -        |
| [73]          | 62 - 72%    | -          | 6 - 87%  | 62 - 79%   | -        |
| [74]          | 73 - 80%    | 73 - 79%   | 73 - 79% | 73 - 79%   | -        |
| [75]          | 70 - 89%    | 74 - 79%   | 79 - 89% | 78 - 85%   | -        |
| [56]          | -           | 70 - 80%   | -        | -          | -        |
| [76]          | 64 - 72%    | -          | 68 - 74% | 64 - 72%   | -        |
| [57]          | -           | 72 - 75%   | -        | -          | -        |
| [58]          | 0 - 65%     | 68 - 75%   | 0 - 66%  | 55 - 64%   | -        |

For instance, Fig. 7a illustrates the explanations of patients with glucose levels below 100. In this segment, lower glucose levels contribute to a decreased likelihood of having diabetes. Additionally, their BMI and age also play a role in lowering the risk of diabetes. Conversely, when glucose levels are higher than 100, as shown in Fig. 7 b, the impact of higher glucose levels, higher BMI, and older age predominantly contributes to the likelihood of having diabetes. This is indicated by the fairly red-coloured region (representing positive model output) in Fig. 7b. A similar variation is observed in segments where BMI and age are both greater than 30, resembling the pattern seen in Fig. 7b. Therefore, it can be concluded that glucose, BMI, and age play pivotal roles in the model ' s predictions compared to the remaining features. Controlling these factors can significantly influence a person ' s diagnosis of diabetes. Therefore, explainable methods enable these finer and more advanced analytics to highlight subtle regions in the dataset that may contain hidden patterns. Revealing such patterns is extremely crucial in the medical context, as it is a field with high stakes.

Fig. 4. Global explanation of the XGB model.

Fig. 5. Global average explanation of the XGB model.

## 5.2. Local explanations

For the local explanations, the authors selected four random individuals (Table 4) for explanation. The random selection does not introduce biases since any patient can be explained using SHAP (refer to Fig. 8), and these explanations are independent. The first patient, as displayed in Fig. 8a, has the following attributes: pregnancies = 3; glucose = 141; blood pressure = 0; skin thickness = 0; insulin = 0; BMI = 30; diabetes pedigree function = 0.761; age = 27. This patient has been diagnosed with diabetes, primarily due to higher glucose and BMI levels, indicated by positive (red) SHAP values. The diabetes pedigree function also contributed positively to the diagnosis, along with a relatively lower positive impact from skin thickness. However, the patient ' s age contributed negatively, indicating that the model considers the patient ' s age (27) to be less likely to contribute to diabetes.

The second and third instances (Fig. 8b and c) showcase two patients who do not have diabetes. The main reason for this is their lower glucose levels (102 and 65), which decisively influence the outcome. According to Fig. 8b, the patient who is 27 years old has a negative impact on diabetes risk due to his age factor, along with his BMI. In contrast, the third patient, aged 42, has a positive driving factor, increasing the diabetes risk, along with his BMI and pregnancies. However, these positive driving factors have a lower magnitude in determining the likelihood of diabetes. The remaining factors have less impact on the decision regarding diabetes probability.

The fourth patient (Fig. 8d) has a higher glucose level (158), which is the main reason for their diabetes diagnosis. Additionally, their age (66) and BMI contribute positively to the likelihood of having diabetes. It ' s noteworthy that BMI does not always correlate with age if the individual maintains a healthy lifestyle. For example, at a younger age, a lack of proper lifestyle can lead to higher BMI values, which can contribute to

Fig. 6. Feature dependencies plots.

Fig. 7. Global explanations of the selected portions of dataset.

## 5.3. Novel self-explainable interface

From this research, we have developed a novel self-explanatory interface for diagnosing diabetes (Fig. 9). This interface was also developed mainly using python language. This interface is based on the XGB model and SHAP explainer used in this study. To create the interface, we utilised the ' Tkinter" library provided by Python [77]. The first step involved writing the XGB model into the interface. The trained model is saved to interface and the inputs are allowed to be obtained from the user. Since the inputs can be erroneously entered by the user, the inputs were defined with numerical boundaries (maximum and minimum). If any text or non-related input is entered, the interface provides an error message. Based on the user ' s input, the interface determines whether they have diabetes. This is achieved by invoking the SHAP local explainer within the interface.

The novelty of this interface lies in its ability to explain to the user why they may have diabetes, providing explanations for possible reasons along with their magnitudes in relation to the predicted outcome. We strongly believe this is the first study to develop a self-explanatory interface for diagnosing diabetes. In terms of this application, blue

Table 4 Selected individuals for the local explanations.

| Feature                    | Instance 1   | Instance 2   | Instance 3   | Instance 4   |
|----------------------------|--------------|--------------|--------------|--------------|
| Pregnancies                | 3            | 0            | 8            | 2            |
| Gluicose                   | 141          | 102          | 65           | 158          |
| Bloodpressure              | 0            | 86           | 72           | 90           |
| Skin thickness             | 0            | 17           | 23           | 0            |
| Insulin                    | 0            | 105          | 0            | 0            |
| BMI                        | 30           | 29.3         | 32           | 31.6         |
| Diabetes pedigree function | 0.761        | 0.695        | 0.6          | 0.805        |
| Age                        | 27           | 27           | 42           | 66           |
| Diabetes (Yes/No)          | Yes          | No           | No           | Yes          |

diabetes. Likewise, each patient can be explained regarding why and how they are or are not diagnosed with diabetes. This information is significant because, among many factors involved, identification of the most influential factors using machine learning provides valuable insights into the order and the magnitude of their impact.

Fig. 8. Local explanations on four selected points.

colour bars indicate that the feature helps reduce the risk of diagnosing diabetes, and red indicates that the feature contributes towards diabetes. As diabetes is a critical factor responsible for thousands of human deaths each year, this application holds significant importance for the community, enabling individuals to gain a better understanding of their condition without requiring in-depth knowledge of human anatomy. While the application provides insights into how certain factors may affect the likelihood of diabetes, it is essential for individuals to seek proper medical consultations for their treatment. For further research, this interface can be expanded to incorporate different inputs and larger clinical datasets to enhance the application ' s generalizability.

## 6. Conclusion

This research aimed to develop a novel, self-explanatory interface for predicting diabetes, given its global significance as a leading cause of mortality. Four machine learning algorithms were employed to classify diabetes based solely on open-source clinical data. Subsequently, a comprehensive analysis was conducted to identify the root causes using explainable artificial intelligence models. The key findings of this study are as follows:

- Machine learning methods demonstrated high accuracy in diagnosing diabetes, with all models achieving training accuracy &gt; 0.78 and testing accuracy &gt; 0.76. The receiver operating characteristic (ROC) curves for training exhibited area under curve (AUC) &gt; 0.85, and AUC &gt; 0.795 for testing in each model.
- Based on the analysis, the extreme gradient boosting (XGB) model emerged as the top-performing model for diagnosing patients with diabetes. It achieved higher testing accuracy compared to the other three models and had the highest AUC for both training and testing.
- Considering the studies that used the same dataset and other recent research, the present study has achieved good performance indicators. For example, the precision of the present models ranges between 60% and 78%, whereas related work exhibits precision ranging from a minimum value of 0% (indicating poor performance) and extending towards 89%. Accuracy and recall scores in the present study vary from 76% to 80% and 50% -76%, respectively, while previous work reports accuracies ranging from 68% to 86% and recall scores from 6% to 89%. However, the present study not only focuses on accuracy but also provides explainability of the predictions compared to related work. Without explainability, even if the model achieves very high accuracy, domain experts would not trust these applications. Both accuracy and explainability matter when decision-makers are involved as end-users.
- The application of explainable artificial intelligence methods, specifically SHAP, allowed for the identification of the underlying factors within the machine learning model that led to specific decisions. This makes complex models interpretable and accessible to individuals without technical or medical backgrounds. SHAP highlighted glucose, BMI, and age as the three dominant factors influencing diabetes, along with their respective magnitudes of impact.
- The self-explanatory interface developed in this study provides users with information about their current condition, indicating whether

Fig. 9. Novel self-explainable diabetes prediction interface (Red colour: increase the possibility of diabetes, Blue colour (decrease the possibility of diabetes). (For interpretation of the references to colour in this figure legend, the reader is referred to the Web version of this article.)

they are likely to have diabetes or not. This is a significant development, considering that diabetes is a leading cause of death worldwide, often due to the lack of awareness and proper medical care. Therefore, this application serves as a valuable tool to educate individuals about their condition and the reasons behind the decision obtained from the interface.

- The use of explainable machine learning methods in medicine is crucial, given the high stakes involved in healthcare. Early awareness can significantly impact patient outcomes by preventing the progression of diseases like diabetes, which currently has no cure. Therefore, implementing explainable machine learning interactively can help minimise the risks associated with diabetes by improving awareness.
- In conclusion, this research provides valuable insights into the accurate diagnosis of diabetes using machine learning and offers a userfriendly, self-explanatory interface to enhance awareness and early intervention, ultimately contributing to better healthcare outcomes.

## Funding

This research received no external funding.

## Declaration of competing interest

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.

## Data availability

Data will be made available on request.

## References

- [1] A. Dutta, et al., Early prediction of diabetes using an ensemble of machine learning models, Int. J. Environ. Res. Publ. Health 19 (19) (2022) 12378 [Online]. Available: https://www.mdpi.com/1660-4601/19/19/12378.
- [2] J.M. Lawrence, et al., Trends in prevalence of Type 1 and Type 2 diabetes in children and adolescents in the US, 2001-2017, JAMA 326 (8) (Aug 24 2021) 717 -727, https://doi.org/10.1001/jama.2021.11165, in eng.
- [3] M. Gollapalli, et al., A novel stacking ensemble for detecting three types of diabetes mellitus using a Saudi Arabian dataset: pre-diabetes, T1DM, and T2DM, Comput. Biol. Med. 147 (2022) 105757.
- [4] S. Owens-Collins, Beta Cell Regulation, Function, Dysfunction and Eventual Destruction in Type 1 Diabetes, 2023.
- [5] N.M. Asril, K. Tabuchi, M. Tsunematsu, T. Kobayashi, M. Kakehashi, Predicting healthy lifestyle behaviours among patients with type 2 diabetes in Rural Bali, Indonesia, Clin. Med. Insights Endocrinol. Diabetes 13 (2020) 1179551420915856, https://doi.org/10.1177/1179551420915856.
- [6] K.I. Galaviz, K.M.V. Narayan, F. Lobelo, M.B. Weber, Lifestyle and the prevention of Type 2 diabetes: a status report, Am. J. Lifestyle Med. 12 (1) (2018) 4 -20, https://doi.org/10.1177/1559827615619159.
- [7] C. Ye, et al., Genetic susceptibility, family history of diabetes and healthy lifestyle factors in relation to diabetes: a gene -environment interaction analysis in Chinese adults, J. Diabetes Investig. 12 (11) (2021) 2089 -2098, https://doi.org/10.1111/ jdi.13577.
- [8] S. Yuan, D. Gill, E.L. Giovannucci, S.C. Larsson, Obesity, Type 2 diabetes, lifestyle factors, and risk of Gallstone disease: a Mendelian randomization investigation, Clin. Gastroenterol. Hepatol. 20 (3) (2022) e529 -e537, https://doi.org/10.1016/j. cgh.2020.12.034.
- [9] L. Rasmussen, C.W. Poulsen, U. Kampmann, S.B. Smedegaard, P.G. Ovesen, J. Fuglsang, Diet and healthy lifestyle in the management of gestational diabetes mellitus, Nutrients 12 (10) (2020) 3050 [Online]. Available: https://www.mdpi. com/2072-6643/12/10/3050.
- [10] H. Li, et al., Genetic risk, adherence to a healthy lifestyle, and type 2 diabetes risk among 550,000 Chinese adults: results from 2 independent Asian cohorts, Am. J. Clin. Nutr. 111 (3) (2020) 698 -707, https://doi.org/10.1093/ajcn/nqz310.
- [11] C.J. Nolan, M. Prentki, Insulin resistance and insulin hypersecretion in the metabolic syndrome and type 2 diabetes: time for a conceptual framework shift, Diabetes Vasc. Dis. Res. 16 (2) (2019) 118 -127.
- [12] L.R. Saslow, et al., Psychological support strategies for adults with type 2 diabetes in a very low -carbohydrate web-based program: randomized controlled trial, JMIR Diabetes 8 (2023) e44295.

- [13] P. Qian, et al., How breastfeeding behavior develops in women with gestational diabetes mellitus: a qualitative study based on health belief model in China, Front. Endocrinol. 13 (2022) 955484.
- [14] M. Dwivedi, A.R. Pandey, Diabetes mellitus and its treatment: an overview, J. Adv. Pharmacol. 1 (1) (2020) 48 -58.
- [15] S. Dev, H. Wang, C.S. Nwosu, N. Jain, B. Veeravalli, D. John, A predictive analytics approach for stroke prediction using machine learning and neural networks, Healthcare Anal. 2 (2022) 100032, https://doi.org/10.1016/j. health.2022.100032.
- [16] D. Dutta, D. Paul, P. Ghosh, Analysing feature importances for diabetes prediction using machine learning, in: 2018 IEEE 9th Annual Information Technology, Electronics and Mobile Communication Conference (IEMCON), vol. 1, 2018, pp. 924 -928, https://doi.org/10.1109/IEMCON.2018.8614871.
- [17] L. Fregoso-Aparicio, J. Noguez, L. Montesinos, J.A. García-García, Machine learning and deep learning predictive models for type 2 diabetes: a systematic review, Diabetol. Metab. Syndrome 13 (1) (2021) 148, https://doi.org/10.1186/ s13098-021-00767-9.
- [18] M.U. Saleem, M. Aslam, A. Akgül, M. Farman, R. Bibi, Controllability of PDEs model for type 1 diabetes, Math. Methods Appl. Sci. 45 (15) (2022) 8800 -8808.
- [19] M. Farman, A. Akgül, A. Ahmad, Analysis and simulation of fractional-order diabetes model, Adv. Theory Nonlinear Anal. Appl. 4 (4) (2020) 483 -497.
- [20] B.A. Goldstein, A.M. Navar, M.J. Pencina, J.P.A. Ioannidis, Opportunities and challenges in developing risk prediction models with electronic health records data: a systematic review, J. Am. Med. Inf. Assoc. 24 (1) (2016) 198 -208, https:// doi.org/10.1093/jamia/ocw042.
- [21] N. Abdulhadi, A. Al-Mousa, Diabetes detection using machine learning classification methods, in: 2021 International Conference on Information Technology (ICIT), 14-15 July 2021, 2021, pp. 350 -354, https://doi.org/10.1109/ ICIT52682.2021.9491788.
- [22] G. Briganti, O. Le Moine, Artificial intelligence in medicine: today and tomorrow, Front. Med., Perspect. vol. 7 (2020), https://doi.org/10.3389/fmed.2020.00027 (in English).
- [23] T. Levy-Loboda, E. Sheetrit, I.F. Liberty, A. Haim, N. Nissim, Personalized insulin dose manipulation attack and its detection using interval-based temporal patterns and machine learning algorithms, J. Biomed. Inf. 132 (2022) 104129.
- [24] L. Adlung, Y. Cohen, U. Mor, E. Elinav, Machine learning in clinical decision making (in eng), M ´ ed 2 (6) (2021) 642 -665, https://doi.org/10.1016/j. medj.2021.04.006.
- [25] A. Zhang, L. Xing, J. Zou, J.C. Wu, Shifting machine learning for healthcare from development to deployment and from models to data, Nat. Biomed. Eng. 6 (12) (2022) 1330 -1345.
- [26] H. Zhang, et al., Prediction of acute kidney injury after cardiac surgery: model development using a Chinese electronic health record dataset, J. Transl. Med. 20 (1) (2022) 166.
- [27] K. Santosh, L. Gaur, Artificial Intelligence and Machine Learning in Public Healthcare: Opportunities and Societal Impact, Springer Nature, 2022.
- [28] W. Zhang, et al., Combined diabetic ketoacidosis and hyperosmolar hyperglycemic state in type 1 diabetes mellitus induced by immune checkpoint inhibitors: underrecognized and underreported emergency in ICIs-DM, Front. Endocrinol. 13 (2023) 1084441.
- [29] M. Halim, A. Halim, The effects of inflammation, aging and oxidative stress on the pathogenesis of diabetes mellitus (type 2 diabetes), Diabetes Metabol. Syndr.: Clin. Res. Rev. 13 (2) (2019) 1165 -1172.
- [30] R. van Wilpe, A.H. Hulst, S.E. Siegelaar, J.H. DeVries, B. Preckel, J. Hermanides, Type 1 and other types of diabetes mellitus in the perioperative period. What the anaesthetist should know, J. Clin. Anesth. 84 (2023) 111012.
- [31] G. Bereda, Difference between type 1 and 2 diabetes mellitus, J. Med. Res. Health Sci. 5 (12) (2022) 2375 -2379.
- [32] A. Mansoori, et al., Prediction of type 2 diabetes mellitus using hematological factors based on machine learning approaches: a cohort study analysis, Sci. Rep. 13 (1) (2023) 663.
- [33] A. Bonnefond, R.K. Semple, Achievements, prospects and challenges in precision care for monogenic insulin-deficient and insulin-resistant diabetes, Diabetologia 65 (11) (2022) 1782 -1795.
- [34] J.M. Forbes, M.E. Cooper, Mechanisms of diabetic complications, Physiol. Rev. 93 (1) (2013) 137 -188.
- [35] F. Moradi, et al., Comparing the associated factors on lifestyle between type 2 diabetic patients and healthy people: a case-control study, Commun. Health Equity Res. Policy 43 (3) (2023) 293 -299.
- [36] E. Ekpor, S. Akyirem, P. Adade Duodu, Prevalence and associated factors of overweight and obesity among persons with type 2 diabetes in Africa: a systematic review and meta-analysis, Ann. Med. 55 (1) (2023) 696 -713.
- [37] L.E. Wagenknecht, et al., Trends in incidence of youth-onset type 1 and type 2 diabetes in the USA, 2002 -18: results from the population-based SEARCH for Diabetes in Youth study, Lancet Diabetes Endocrinol. 11 (4) (2023) 242 -250, https://doi.org/10.1016/S2213-8587(23)00025-6.
- [38] Y.T. Wondmkun, Obesity, insulin resistance, and type 2 diabetes: associations and therapeutic implications, Diabetes Metab. Syndr. Obes. 13 (2020) 3611 -3616, https://doi.org/10.2147/dmso.S275898 (in eng).
- [39] S.R. Bernstein, C. Kelleher, R.A. Khalil, Gender-based research underscores sex differences in biological processes, clinical disorders and pharmacological interventions, Biochem. Pharmacol. (2023) 115737.
- [40] T. Ciarambino, P. Crispino, G. Guarisco, M. Giordano, Gender differences in insulin resistance: new knowledge and perspectives, Curr. Issues Mol. Biol. 45 (10) (2023) 7845 -7861.
- [41] J.E. Shaw, D.J. Magliano, SEARCHing for answers to youth-onset type 2 diabetes, Lancet Diabetes Endocrinol. 11 (4) (2023) 219 -220, https://doi.org/10.1016/ S2213-8587(23)00037-2.
- [42] J. Chen, et al., Assessment of factors affecting diabetes management in the City Changing Diabetes (CCD) study in Tianjin, PLoS One 14 (2) (2019) e0209222, https://doi.org/10.1371/journal.pone.0209222.
- [43] A. Collier, et al., Relationship of skin thickness to duration of diabetes, glycemic control, and diabetic complications in male IDDM patients, Diabetes Care 12 (5) (1989) 309 -312, https://doi.org/10.2337/diacare.12.5.309.
- [44] J.G.B. Derraik, et al., Effects of age, gender, BMI, and anatomical site on skin thickness in children and adults with diabetes, PLoS One 9 (1) (2014) e86637, https://doi.org/10.1371/journal.pone.0086637.
- [45] M. Zakir, et al., Cardiovascular complications of diabetes: from microvascular to macrovascular pathways, Cureus 15 (9) (2023).
- [46] T. Mahboob Alam, et al., A model for early prediction of diabetes, Inform. Med. Unlocked 16 (2019) 100204, https://doi.org/10.1016/j.imu.2019.100204.
- [47] M. Maniruzzaman, et al., Comparative approaches for classification of diabetes mellitus data: machine learning paradigm, Comput. Methods Progr. Biomed. 152 (2017) 23 -34, https://doi.org/10.1016/j.cmpb.2017.09.004.
- [48] M.W. Nadeem, H.G. Goh, V. Ponnusamy, I. Andonovic, M.A. Khan, M. Hussain, A fusion-based machine learning approach for the prediction of the onset of diabetes, Healthcare 9 (10) (2021) 1393 [Online]. Available: https://www.mdpi. com/2227-9032/9/10/1393.
- [49] A. Esteva, et al., Deep learning-enabled medical computer vision, NPJ Digit. Med. 4 (1) (2021) 5.
- [50] M. Barakat-Johnson, et al., Reshaping wound care: evaluation of an artificial intelligence app to improve wound assessment and management amid the COVID19 pandemic, Int. Wound J. 19 (6) (2022) 1561 -1577.
- [51] S. Uddin, I. Haque, H. Lu, M.A. Moni, E. Gide, Comparative performance analysis of K-nearest neighbour (KNN) algorithm and its different variants for disease prediction, Sci. Rep. 12 (1) (2022) 6256.
- [52] J. Cervantes, F. Garcia-Lamont, L. Rodríguez-Mazahua, A. Lopez, A comprehensive survey on support vector machine classification: applications, challenges and trends, Neurocomputing 408 (2020) 189 -215.
- [53] A. Darolia, R.S. Chhillar, Analyzing three predictive algorithms for diabetes mellitus against the Pima Indians dataset, ECS Trans. 107 (1) (2022) 2697, https:// doi.org/10.1149/10701.2697ecst.
- [54] M.E. Febrian, F.X. Ferdinan, G.P. Sendani, K.M. Suryanigrum, R. Yunanda, Diabetes prediction using supervised machine learning, Procedia Comput. Sci. 216 (2023) 21 -30, https://doi.org/10.1016/j.procs.2022.12.107.
- [55] A. Mousa, W. Mustafa, R.B. Marqas, S.H.M. Mohammed, A comparative study of diabetes detection using the PIMA Indian diabetes database, J. Donghua Univ. 26 (2) (2023) 277 -288, https://doi.org/10.26682/sjuod.2023.26.2.24.
- [56] O. S. Zargar, A. Baghat, and T. A. Teli, "A DNN Model for Diabetes Mellitus Prediction on PIMA Dataset," INFOCOMP J. Comput. Sci., vol. 21, no. 2, 12/19 2022. [Online]. Available: https://infocomp.dcc.ufla.br/index.php/infocomp/ article/view/2476.
- [57] K. Varma, B. Panda, Comparative analysis of Predicting Diabetes Using Machine Learning Techniques, vol. 6, 2019, pp. 522 -530.
- [58] A. Bansal, A. Singhrova, Performance Analysis of Supervised Machine Learning Algorithms for Diabetes and Breast Cancer Dataset, in: 2021 International Conference on Artificial Intelligence and Smart Systems (ICAIS), 2021, pp. 137 -143.
- [59] G. Hu, C. Yin, M. Wan, Y. Zhang, Y. Fang, Recognition of diseased Pinus trees in UAV images using deep learning and AdaBoost classifier, Biosyst. Eng. 194 (2020/ 06/01/2020) 138 -151, https://doi.org/10.1016/j.biosystemseng.2020.03.021.
- [60] M. Bergoeing, et al., Exploring the potential of an AI-integrated cloud-based mHealth platform for enhanced Type 2 diabetes mellitus management, in: International Conference on Ubiquitous Computing and Ambient Intelligence, Springer, 2023, pp. 100 -111.
- [61] M. Lutz, Programming python, O ' Reilly Media, Inc., 2001.
- [62] F. Pedregosa, et al., Scikit-learn: machine learning in Python, J. Mach. Learn. Res. 12 (2011) 2825 -2830.
- [63] P. Thisovithan, H. Aththanayake, D. Meddage, I. Ekanayake, U. Rathnayake, A novel explainable AI-based approach to estimate the natural period of vibration of masonry infill reinforced concrete frame structures using different machine learning techniques, Results Eng. 19 (2023) 101388.
- [64] S.M. Lundberg, S.-I. Lee, A unified approach to interpreting model predictions, Adv. Neural Inf. Process. Syst. 30 (2017).
- [65] D. Meddage, et al., Explainable Machine Learning (XML) to predict external wind pressure of a low-rise building in urban-like settings, J. Wind Eng. Ind. Aerod. 226 (2022) 105027.
- [66] D. Meddage, I.U. Ekanayake, A. Weerasuriya, C. Lewangamage, Tree-based regression models for predicting external wind pressure of a building with an unconventional configuration, in: 2021 Moratuwa Engineering Research Conference (MERCon), IEEE, 2021, pp. 257 -262.
- [67] D. Meddage, I. Ekanayake, S. Herath, R. Gobirahavan, N. Muttil, U. Rathnayake, Predicting bulk average velocity with rigid vegetation in open channels using treebased machine learning: a novel approach using explainable artificial intelligence, Sensors 22 (12) (2022) 4398.
- [68] I. Ekanayake, S. Palitha, S. Gamage, D. Meddage, K. Wijesooriya, D. Mohotti, Predicting adhesion strength of micropatterned surfaces using gradient boosting models and explainable artificial intelligence visualizations, Mater. Today Commun. 36 (2023) 106545.
- [69] I. Ekanayake, D. Meddage, U. Rathnayake, A novel approach to explain the blackbox nature of machine learning in compressive strength predictions of concrete

## G. Dharmarathne et al.

using Shapley additive explanations (SHAP), Case Stud. Constr. Mater. 16 (2022) e01059.

- [70] W. Kulasooriya, R. Ranasinghe, U.S. Perera, P. Thisovithan, I. Ekanayake, D. Meddage, Modeling strength characteristics of basalt fiber reinforced concrete using multiple explainable machine learning with a graphical user interface, Sci. Rep. 13 (1) (2023) 13138.
- [71] P. Meddage, I. Ekanayake, U.S. Perera, H.M. Azamathulla, M.A. Md Said, U. Rathnayake, Interpretation of machine-learning-based (black-box) wind pressure predictions for low-rise gable-roofed buildings using Shapley additive explanations (SHAP), Buildings 12 (6) (2022) 734.
- [72] J.S. Madushani, R.K. Sandamal, D. Meddage, H. Pasindu, P.A. Gomes, Evaluating expressway traffic crash severity by using logistic regression and explainable &amp; supervised machine learning classifiers, Transport Eng. 13 (2023) 100190.
- [73] S.S. Bhat, V. Selvam, G.A. Ansari, M.D. Ansari, M.H. Rahman, Prevalence and early prediction of diabetes using machine learning in North Kashmir: a case study of

District Bandipora, Comput. Intell. Neurosci. 2022 (2022) 2789760, https://doi. org/10.1155/2022/2789760.

- [74] J.J. Khanam, S.Y. Foo, A comparison of machine learning algorithms for diabetes prediction, Ict Express 7 (4) (2021) 432 -439.
- [75] V. Chang, J. Bailey, Q.A. Xu, Z. Sun, Pima Indians diabetes mellitus classification based on machine learning (ML) algorithms, Neural Comput. Appl. 35 (22) (2023) 16157 -16173, https://doi.org/10.1007/s00521-022-07049-z.
- [76] M.F. Faruque, Asaduzzaman, I.H. Sarker, Performance analysis of machine learning techniques to predict diabetes mellitus, in: 2019 International Conference on Electrical, Computer and Communication Engineering (ECCE), 7-9 Feb. 2019, 2019, pp. 1 -4, https://doi.org/10.1109/ECACE.2019.8679365.
- [77] F. Lundh, An introduction to tkinter. , 1999. http://www.pythonware.com/ library/tkinter/introduction/index.htm.
