<!-- extracted by pdf-extract | engine=docling | pages=18 | ocr=False | tables=9/9 | density=1.07 | score=100 -->

Contents lists available at ScienceDirect

## Information Fusion

journal homepage: www.elsevier.com/locate/inffus

## Improving the local diagnostic explanations of diabetes mellitus with the ensemble of label noise filters

Che Xu a , Peng Zhu a,* , Jiacun Wang b , Giancarlo Fortino c

- a School of Economics and Management, Nanjing University of Science and Technology, Nanjing, Jiangsu, China
- b Department of Computer Science and Software Engineering, Monmouth University, West Long Branch, NJ, USA
- c Department of Informatics, Modeling, Electronics and Systems (DIMES), University of Calabria, Via P. Bucci, Rende, CS, Italy

## A R T I C L E  I N F O

Keywords: Label noise Ensemble of label noise filters Explainable artificial intelligence LIME Diabetes mellitus

## 1. Introduction

Diabetes Mellitus (DM) is a typical chronic disease spanning all age populations, and the major symptom of DM patients is a high level of blood sugar [1,2]. Especially after meals, the human body converts food into glucose. In healthy individuals, the body releases insulin to promote the breakdown and conversion of blood sugar, speeding up the metabolic cycle of glucose in the bloodstream to control blood sugar levels. However, DM patients often have difficulty in producing sufficient insulin to support this process, leading to increased glucose levels in the bloodstream, known as hyperglycemia. Existing research indicates that high  levels  of  blood  sugar  can  often  lead  to  severe  complications  in patients, such as nerve damage, heart disease, stroke, and so on. The World Health Organization (WHO) has confirmed that DM currently ranks ninth among all fatal diseases in the world, and the number of DM patients continues to rise [3]. DM has become a high-risk disease that

* Corresponding author. E-mail address: pzhu@njust.edu.cn (P. Zhu).

Received 24 October 2024; Received in revised form 22 December 2024; Accepted 1 January 2025

## A B S T R A C T

In the era of big data, accurately diagnosing diabetes mellitus (DM) often requires fusing diverse types of information. Machine learning has emerged as a prevalent approach to achieve this. Despite its potential, clinical acceptance remains limited, primarily due to the lack of explainability in diagnostic predictions. The emergence of explainable artificial intelligence (XAI) offers a promising solution, yet both explainable and non-explainable models rely heavily on noise-free datasets. Label noise filters (LNFs) have been designed to enhance dataset quality  by  identifying  and  removing  mislabeled  samples,  which  can  improve  the  predictive  performance  of diagnostic  models.  However,  the  impact  of  label  noise  on  diagnostic  explanations  remains  unexplored.  To address this issue, this paper proposes an ensemble framework for LNFs that fuses information from different LNFs through three phases. In the first phase, a diverse pool of LNFs is generated. Second, the widely-used LIME (Local  Interpretable  Model-Agnostic  Explanations)  technique  is  employed  to  provide  local  explainability  for diagnostic predictions made by black-box models. Finally, four ensemble strategies are designed to generate the final local diagnostic explanations for DM patients. The theoretical advantage of the ensemble is also demonstrated.  The  proposed  framework  is  comprehensively  evaluated  on  four  DM  datasets  to  assess  its  ability  to mitigate the adverse impact of label noise on diagnostic explanations, compared to 24 baseline LNFs. Experimental results demonstrate that individual LNFs fail to consistently ensure the quality of diagnostic explanations, whereas the LNF ensemble based on local explanations provides a feasible solution to this challenge.

requires widespread attention.

According to the reasons for the increase in blood sugar levels, DM patients are clinically classified into three categories: type I, type II, and gestational  DM  [2].  Patients  with  type  1  DM  typically  develop  the condition due to damage to the pancreatic organ, resulting in difficulty producing sufficient insulin to maintain normal blood glucose levels. In addition  to  elevated  blood  sugar,  patients  of  this  type  often  exhibit symptoms such as excessive thirst, rapid weight loss, and blurred vision, which are commonly diagnosed during childhood and adolescence. The cells  of  patients  with  type  II  DM  are  resistant  to  insulin,  making  it difficult to maintain a normal level of blood sugar, while gestational DM only develops in pregnant women without a history of diabetes experience. Type II DM is more prevalent in the population compared to the remaining two types, where about 90% of patients are diagnosed with type II DM, but its serious degree is far less than them [4]. Generally, injecting insulin day by day can effectively control the level of blood C. Xu et al.

sugar for patients with type 1 DM, and gestational diabetes disappears after the baby ' s birth. Therefore, how to accurately diagnose type II DM has always been a focus in the medical field, which is critical to the healthcare management of DM patients.

As  an  important  component  of  artificial  intelligence,  machine learning (ML) has undergone significant development in recent years. Various ML models have been proposed since the last century, thereby enriching the relevant theoretical foundation. Meanwhile, the practical applications of ML have steadily broadened to encompass diverse fields such as medicine [5,6], business [7,8], and edge computing [9]. Especially in medicine, ML finds utility in various cases including disease diagnosis, drug discovery, and personalized treatment. Leveraging the clinical data of patients, ML models can forecast disease occurrence or progression  [10].  Currently,  the  effectiveness  of  ML  models  in  accurately diagnosing DM patients has been confirmed by extensive studies [4,11 -13],  but  their  adoption  in  the  medical  field  is  still  very  rare especially when compared to their popularity in theoretical research. The basic reason for this phenomenon is because of the trade-off between the accuracy and the explainability of ML models [14]. Explainability  refers  to  the  ability  of  ML  models  to  provide  transparent  and understandable predictions to humans. As ML models, especially complex ones like shallow Random Forests and deep Neural Networks [15], are often seen as black boxes, explainability aims to provide insights into how these models make predictions or decisions. This transparency is crucial in the clinical diagnosis of DM, where decisions made by ML models can have significant consequences. As a result, diagnostic processes based on these black-box models are often difficult for clinicians to  accept.  Fortunately,  the  emergence  of  post-hoc  explainable  techniques (PHETs) [16] provides many feasible solutions. As one of the representative  eXplainable  Artificial  Intelligence  (XAI)  techniques, PHETs generally receive a black-box model as the prediction model and employ a white-box model as the explanation model. While the specific process varies depending on the final form of output explanations, it aligns with how humans naturally explain decisions or processes [17]. Therefore, PHETs also serve as an intermediary between unexplainable and explainable ML models and are often applied in scenarios where neither model alone can meet the practical requirements. The diagnosis of DM is a typical example of these scenarios where both accuracy and explainability  should  be  maintained  simultaneously.  For  this  reason, several mainstream PHETs have been widely used in the diagnosis of DM to ensure diagnostic explainability [18,19], and LIME (Local Interpretable  Model-Agnostic  Explanations)  is  the  most  representative  among them. LIME is preferred over other  PHETs for two main reasons: its model-agnostic nature, which allows it to be combined with any ML model, and its ability to generate decisions or predictions that are both accurate and explainable [17].

Given the prediction of a sample output by an unexplainable model, LIME first  constructs  a  linear  transparent  model  to  approximate  this prediction. As LIME belongs to the category of local PHETs, the constructed linear model is a local surrogate model. Consequently, the explanations provided by LIME are local explanations and only applicable to a specific sample, not all samples. Providing different local explanations  for  each  sample  is  of  great  significance  for  both  developing personalized treatment strategies for DM patients and guiding clinical practitioners,  but  achieving  this  goal  is  closely  associated  with  the quality of the collected diagnostic dataset. Typically, high-quality data provide  sufficient  and  reliable  information,  enabling  the  black-box model  inputted  into  LIME  to  learn  accurate  diagnostic  patterns  and the transparent model outputted by LIME to extract reliable local explanations. However, the collection of such medical data is often challenging in practice, particularly in countries like China, where medical resources  are  severely  scarce.  Ensuring  the  correctness  of  relevant diagnostic data in patients ' electronic  medical records (EMRs) is not easy.  Moreover,  the  diagnostic  record  of  each  patient  is  subjectively labeled by doctors, which may introduce errors, especially when the diagnostic abilities  of some  doctors are limited or they do not grasp sufficient  information.  These  errors  in  medical  diagnostic  data  are commonly referred  to  as  label  noise  [20,21].  Many  techniques  have been proposed to mitigate the adverse impact of label noise on the final diagnostic performance. The most commonly used one is the deletion approach, also called the label noise filter (LNF), which improves the dataset quality by removing those mislabeled instances [22]. Same as the LIME, the LNF is also model-agnostic and can be used before any ML model. Although the effectiveness of several mainstream LNFs has been examined by existing studies, it is not enough to demonstrate that they can be successfully applied in the explainable diagnosis of DM. The main reasons are three-fold. Firstly, LNF is data-dependent [23,24], indicating that different datasets typically require different LNFs. Failure to choose the appropriate LNF for a specific dataset may undermine the consistent assurance of positive benefits brought by LNFs. The second reason is closely associated with the first one, where the data-dependent nature of LNFs poses a significant challenge to the identification of the optimal LNF tailored to the target dataset. The third reason is that the majority of existing studies primarily focus on the effect of LNF on enhancing prediction accuracy, neglecting its impact on explainability. In other words, whether LNFs can mitigate the detrimental impact of label noise on the local  explanations  of  predictions  remains  unknown.  This  issue  is particularly pronounced in the LIME-based explainable diagnosis of DM since the impact is evident not only during the prediction phase but also in the explanation process [25]. If the correctness and reliability of the final  diagnostic  explanations  are  not  guaranteed,  it  will  significantly impede the comprehension of the entire diagnostic process and hinder the improvement of the doctor ' s ability.

To  resolve  the  above  issues,  this  paper  develops  an  ensemble framework  of  LNFs  for  LIME-based  explainable  diagnosis  of  DM. Initially,  a  diverse  pool  of  base  LNFs  is  generated.  Recognizing  that combining identical LNFs does not get any improvement, both homogeneous  and  heterogeneous  strategies  are  presented  in  this  phase  to ensure diversity among the generated LNFs. Each LNF, when applied to the original dataset, outputs a result vector indicating which samples are possibly contaminated by label noise and which are not. These vectors can be aggregated in two distinct methods: they can either be combined once to filter the dataset or be used sequentially to produce multiple filtered  datasets.  The  first  method  yields  a  single  filtered  dataset, whereas the latter generates several, allowing for the combination of LNFs both before and following the generation of local diagnostic explanations with LIME. In line with this, two static ensemble ways are designed  for  LNFs.  Building  on  the  static  ensemble,  the  dynamic ensemble of LNFs is also developed, assuming that LNFs act as experts in their respective domains. Finally, the proposed framework encompasses four different ensemble ways, whose efficacy is validated using four realworld DM datasets. Comparative analysis against twenty-four benchmark  LNFs  not  only  demonstrates  that  the  label  noise  degrades  the quality of local explanations, but also highlights the advantage of the proposed framework in mitigating the adverse effects of label noise on local diagnostic explanations. The experiments, which include two types of label noise and five black-box algorithms, further confirm that the proposed framework is also model-agnostic and can be compatible with various ML algorithms.

To the best of our knowledge, this is the first work to explore how label noise influences local predictive explanations and to propose an effective  solution  to  mitigate  its  impact.  This  paper  makes  three  key contributions:  (1)  an  ensemble  framework  for  LNFs  is  proposed  to address  the  challenge  of  selecting  the  most  appropriate  LNF;  (2)  a comprehensive experimental protocol is designed to objectively evaluate the effectiveness of different LNFs in reducing the impact of label noise on local explanations; and (3) the performance of the proposed framework is examined using four DM diagnosis datasets and two noise injection strategies.

The remainder of this paper is organized as follows. Section 2 covers the research background, including the fundamentals of LNF and recent developments in DM diagnosis. Section 3 elaborates on the proposed C. Xu et al.

Fig. 1. Model training process based on label noise filtering.

framework, while Section 4 presents an experimental study to evaluate its effectiveness. Finally, Section 5 concludes this paper by summarizing research  contributions  and  outlining  potential  directions  for  future research.

## 2. Research background

This section presents the research background of this paper from two aspects. One aspect focuses on the recent development in LNFs, while the other focuses on the explainable diagnosis of DM.

## 2.1. Label noise filters

To prevent prediction performance from being affected by the label noise, various LNFs were proposed in the literature. As shown in Fig. 1, the LNF is usually used as an intermediate step before model training. After this step, noisy samples (instances) are identified and deleted from the noisy training dataset. Thus, the size of the cleansed training dataset is usually smaller than the original dataset. With the cleansed training dataset, the downstream ML model is constructed and its performance is also evaluated to provide feedback on the effectiveness of LNF. Broadly speaking, existing LNFs can be divided into two categories: distancebased LNFs and classifier-based LNFs [22]. The most popular distance-based LNF is the  non-parametric K-Nearest  Neighbor (KNN) algorithm, which employs the Euclidean distance to examine the correctness of sample labels. The basic principle of KNN is that the label of any  sample  should  be  consistent  with  the  majority  label  among  its nearest  neighbors.  This  enables  the  performance  of  KNN  to  be  quite sensitive to label noise and thus suited to filtering tasks. Currently, many KNN-based LNFs, such as ENNF [26], AKNNF [27], and NCNF [28], have been proposed in the literature to make up for the deficiency of the traditional  KNN  from  different  perspectives.  Although  these  variants differ  in  some  technical  details  of  noise  detection,  they  assume  that similar samples should possess the same or similar labels. Consequently, the selection of similarity measures is usually crucial to their success.

The key to the success of classifier-based LNFs is the selection of classification algorithms. With the help of the cross-validation strategy, any classification algorithm is theoretically acceptable for detecting the noise.  The  samples  that  are  misclassified  in  the  validation  folds  are considered  noise  [29].  Mainstream  ML  methods,  including  Decision Trees, Support Vector Machines, and Naïve Bayes, were used to carry out this task [22,30], and after soon, the potential of ensemble classifiers regarding this aspect was also identified. Compared to the individual classifier, the risk of removing too many samples is greatly decreased by the adoption of ensemble models [31,32]. It has been widely acknowledged that if a sample is misclassified by most classifiers of an ensemble model,  this  sample  would  be  noise  to  a  large  extent.  Such  a  voting scheme indeed enhances the robustness of classifier-based LNFs to the label  noise,  but  several  studies  also  found  that  it  cannot  ensure  the filtering performance in all cases, especially when facing different types and degrees of label noise [21,24]. This is consistent with the no free lunch theorem, which states that no one model can perform best in all situations.  Therefore,  different  LNFs  may  need  to  be  employed  for different target datasets; otherwise, inappropriate adoption of LNFs may result  in  the  removal  of  extensive  clean  samples  or  the  insufficient identification of noisy samples. In other words, if we want to design a more generic LNF, combining various available LNFs will be a feasible way  as  each  LNF  is  competent  in  several  specific  scenarios  [33]. Following  this  idea,  Khoshgoftaar  and  Rebours  [32]  combined  two specialized LNFs for the task of software quality prediction. S ´ aez et al. [31] proposed a hybrid LNF based on several different filtering strategies and validated its efficiency using 25 real datasets. With the consideration of the benefits of the subsampling mechanism, Sabzevari et al. [34] developed a two-stage LNF to enhance the robustness to noise. Note that constructing the ensemble model-based LNF also belongs to this pattern because different classifiers are also complementary in detecting noise. More importantly, the large number of available classifiers provides an easy way to obtain diverse LNFs in this condition [29]. Following this idea,  a  novel  ensemble  framework  is  also  proposed  for  LNFs  in  this paper. Compared to the former fusion of LNFs, this framework focuses more on reducing the impact of label noise on diagnostic explanations. More  specifically,  four  different  ensemble  strategies  are  designed  to achieve this goal based on a pool of diverse LNFs.

## 2.2. Explainable diagnosis of diabetes mellitus

Numerous ML models have been used to assist medical experts in diagnosing patients possibly suffering from DM. Most of these models are applied to predict the occurrence of type II DM from EMRs and have achieved  good  results  across  various  performance  measures  [4,35]. However, due to the inability of these models to offer transparent internal calculation processes, clinicians still doubt the reliability of the diagnostic recommendations they provide. Fortunately, the emergence of XAI techniques provides an opportunity to improve this situation. XAI techniques are divided into transparent models and PHETs [17]. The former implies that the model itself is explainable, while the latter is designed  to  provide  explainability  for  unexplainable  models  [17]. Various XAI techniques have been explored for the diagnosis of DM, enhancing the explainability of diagnostic outcomes while aiding patients in understanding the principles behind their diagnoses, thereby improving personalized treatment.

Explainable  models  are  applied  in  the  diagnosis  of  DM  mainly because of their inherent transparency [36]. For example, Abdullah and Selvakumar [37] analyzed risk factors associated with type II DM using transparent Decision Trees and provided explainability for its diagnosis based  on  the  correlation  results.  Suyanto  et  al.  [38]  developed  an explainable detection framework for patients with type II DM in which transparent KNN was combined with autoencoders to provide explainability  based  on  the  distances  between  patients.  Based  on  feature transformation  techniques,  Wu  et  al.  [39]  constructed  a  transparent logistic regression model for the diagnosis of type II DM. To maintain enough explainability, transparent models are usually limited in size and complexity in the practical applications, otherwise, they will also be unacceptable. A typical example is Random Forests, which is a combination of multiple Decision Trees but cannot be interpreted [40]. PHETs have also been used to provide explainability for DM diagnosis, and C. Xu et al.

Fig. 2. Flowchart of the proposed framework. (a) The static ensemble of LNFs follows these steps: collecting a historical diagnostic dataset, generating multiple base LNFs, sequentially filtering the dataset using all base LNFs, combining LNFs based on noise detection or local explanations, and generating final local diagnostic explanations using LIME. All LNFs are used to improve local diagnostic explanations for each new patient. (b) Building upon the static ensemble, the dynamic ensemble of LNFs incorporates competency estimation based on similar regions to dynamically select the most competent LNFs for each new patient. The selected LNFs are then combined based on their outputs to generate final local diagnostic explanations using LIME. This process ensures that different LNFs are utilized to improve diagnostic explanations for different patients.

most  of  them  are  feature-based.  Two  commonly  used  feature-based PHETs are LIME [41] and SHAP [42]. As mentioned before, LIME provides  explainability  for  inexplicable  diagnostic  recommendations  by training interpretable models using locally perturbed data. It has been adopted by Wang et al. [43] to generate diagnostic explanations for DM

patients in the form of simple decision rules. Joseph et al. [44] constructed an explainable TabNet architecture for the diagnosis of diabetes in which LIME was employed to ensure local explainability. Based on LIME, Curia [41] developed a decision support system to assess how various factors affect the  development of diabetes. SHAP  is a C. Xu et al.

Table 1 Main mathematical notations utilized within the framework.

| Notations                           | Meanings                                        | Notations                      | Meanings                                                                             |
|-------------------------------------|-------------------------------------------------|--------------------------------|--------------------------------------------------------------------------------------|
| Tr ¼ { x n , y n )} N n = 1         | The training dataset                            | a                              | The example of interested test (patient) samples                                     |
| x n                                 | The feature vector of the n -th sample in Tr    | G ( ⋅ )                        | The explainable model output from LIME                                               |
| y n                                 | The diagnostic result of the n -th sample in Tr | B = ( b 1 , b 2 , … , b T )    | The synthetic neighborhood of the sample a                                           |
| N                                   | The number of patient samples in Tr             | b t                            | The t -th sample in B                                                                |
| E                                   | The dimension of the feature vector x n         | π a ( b t )                    | The proximity between samples b t and a                                              |
| lnf = { lnf 1 , lnf 2 , … , lnf M } | The pool of LNFs                                | b t , e                        | The e -th feature of b t                                                             |
| lnf m                               | The m -th LNF in lnf                            | I m = ( I m ,1 , … , I m , N ) | The noise identification result of lnf m                                             |
| M                                   | The number of LNFs                              | TrE                            | The training dataset obtained by integrating the noise identification results of lnf |
| Tr m                                | The training dataset filtered by the lnf m      | α = { α 1 , … , α E }          | The local explanations generated for sample a                                        |
| F ( ⋅ )                             | The black-box prediction model provided to LIME | N m = { s m ,1 , … , s m , K } | The similar region of sample a determined from Tr m                                  |

perturbation explainability method that identifies the features important to the diagnostic recommendations. Unlike LIME, it uses Shapley values from game theory to calculate and compare the importance of different features [45]. Kibria et al. [46] developed an ensemble model to classify diabetic and non-diabetic patients and they employed permutation  importance  and  SHAP  plots  to  achieve  a  high  level  of explainability. With the help of SHAP, Annuzzi et al. [47] have gained a clear understanding of how nutritional factors impact the blood glucose of DM. Additionally, some other PHETs, such as decision rules [19] and conditional probabilities [48], have also been used in the diagnosis of DM patients.

## 3. Proposed framework

When constructing medical diagnostic models using ML techniques, noise handling has become an essential phase due to inherent imperfections in collected diagnostic data [49]. The application of an LNF to eliminate mislabeled samples (noise) is a common way to improve data quality during this phase. However, the selection of the most effective LNF presents a significant challenge, given the extensive variety of LNFs available in the literature. Since each LNF may perform optimally in detecting noise within specific regions of the dataset, this section introduces an ensemble framework of LNFs designed to mitigate the selection dilemma. Fig. 2 depicts the implementation scheme of the LNF ensemble, and the corresponding technical details are provided below. For clarity, Table 1 summarizes the key notations used within the proposed framework.

## 3.1. Generation of base LNFs for ensemble

Suppose that in the diagnosis of DM, a diagnostic dataset of patients is collected as Tr = { xn , yn )} N n = 1 , where xn is an E -dimensional feature vector that describes the symptoms of the n -th patient, and yn represents the  associated  diagnostic  result.  For  persons  without  diabetes,  their diagnosis result is recorded as yn = 0, while for persons with diabetes, their diagnosis result is recorded as yn = 1 in this dataset. According to the original definition [50], the label noise in this dataset refers to the errors that the diagnosis result of a healthy person is changed to 1 or the diagnosis result of a diabetic patient is changed to 0. Both two types of errors are very harmful and need to be taken seriously. To handle them, a pool of LNFs lnf = { lnf 1, lnf 2, … , lnfM } is generated in the first step of the proposed framework to filter the collected diagnostic dataset Tr . Note that this is very similar to ensemble learning [51] which produces a pool  of  base  classifiers  for  better  classification  [52].  Using  different classification algorithms in ensemble learning can produce diverse base classifiers  to  improve  the  final  classification  performance  [53,54]. Similarly, to better identify noise from different aspects, it is assumed that the generated M LNFs also need to be different in the proposed framework. It is impossible to obtain a different result by combining the same LNF repeatedly. According to the review of LNF conducted by Fr ´ enay and Verleysen [50], two strategies can help us achieve this goal.

- (1) Diverse  configurations  of  a  single  LNF: Similar  to  homogeneous  ensemble  learning,  employing  diverse  configurations (including parameters, architectures, training datasets,  and feature  sets)  for  the  same  LNF  can  promote  diversity  in  the generated lnf . For example, the classical Edited Nearest Neighborhood filter  [26]  can  be  varied  by  adjusting  the  number  of nearest neighbors, yielding multiple LNF variants. Additionally, Bagging-based LNF achieves diversity by applying different subsets of the training dataset to produce LNF variants.
- (2) LNFs with different theoretical foundations: Using LNFs based on differing theoretical foundations also contributes to diversity. The variation within the LNF pool lnf arises from the intrinsic differences among the LNFs, making direct measurement challenging. A hybrid approach, such as combining classifier-based LNFs [28] with similarity-based LNFs [20], exemplifies the idea of this strategy.

Various other strategies have been proposed in the literature, yet most of them are combinations of the two aforementioned approaches. For instance, the iterative LNF method proposed by S ´ aez et al. [31] integrates both diverse settings of the same LNF and different types of LNFs.  When  a  sample  is  consistently  identified  as  noise  by  multiple LNFs, it is likely to be genuine noise. Conversely, inconsistent results across  LNFs  necessitate  deeper  analysis.  By  inputting  the  original training dataset Tr = { xn , yn )} N n = 1 into the generated M LNFs, multiple versions of the filtered dataset Tr can be derived. Let Tr m = { x m n , y m n )} Nm n = 1 represent the training dataset filtered by the LNF lnfm ( m = 1, 2, … , M ).

## 3.2. Local explainable diagnosis of diabetes mellitus

Using the filtered training dataset Tr m ( m = 1, 2, … , M ), various ML methods can be employed to construct diagnostic models. Given that clinicians require both accurate and explainable diagnoses, the proposed framework incorporates some methods that, although inherently unexplainable, ensure high accuracy. To address the need for explainability, the model-agnostic LIME method is employed, providing robust local explanations for each diagnostic sample. As previously mentioned, LIME excels in elucidating how individual features contribute to each diagnosis, ensuring the transparency of the model ' s predictions [55]. Let F ( ⋅ ) denote the black-box model trained on the training dataset. To explain the diagnostic prediction F ( a ) for an interested patient a , characterized by a set of E observed features, a local linear model G ( ⋅ ) is generated within the LIME framework to approximate the complex function F ( ⋅ ) [56]. The fidelity of the surrogate model G ( ⋅ ) to the patient sample a is ensured  through  an  approximation  process,  formally  expressed  as follows:

## Algorithm 1

Static LNF ensemble based on noise detection.

Input: original training dataset with label noise Tr = { xn , yn )} N n = 1 pool of LNFs lnf = { lnf 1, lnf 2, … , lnfM } black-box learning algorithm F ( ⋅ ) feature vector of the test sample a fixed threshold θ Output: Local explanations α 1 RM = ∅ 2 for m = 1, 2, … , M do 3 filter Tr with the lnfm to obtain the I m 4 RM = RM ∪ I m 5 end for 6 TrE = ∅ 7 for n = 1, 2, … , N do 8 calculate the sum ∑ M m = 1 Im , n of the n -th column of the matrix RM 9 if ∑ M m = 1 Im , n ≤ θ then 10 TrE = TrE ∪ ( xn, yn ) 11 end if 12 end for 13 use TrE to construct the black-box prediction model F ( ⋅ ) 14 generate the neighborhood B for sample a using random perturbation 15 solve the optimization model shown in Eq. (3) 16 extract the local explanations α = { α 1, … , α E } 17 return α

## Algorithm 2

Static LNF ensemble based on local explanations.

Input: original training dataset with label noise Tr pool of LNFs lnf = { lnf 1, lnf 2, … , lnfM } black-box learning algorithm F ( ⋅ ) feature vector of the test sample a Output: Local explanations α 1 CM = ∅ 2 for m = 1, 2, … , M do 3 filter Tr with lnfm to obtain Tr m 4 use Tr m to construct the black-box prediction model F ( ⋅ ) 5 generate the neighborhood B for sample a using random perturbation 6 solve the optimization model shown in Eq. (3) 7 extract the learned feature coefficients { α m , 1, … , α m , E } 8 CM = CM ∪ { α m , 1, … , α m , E } 9 end for 10 calculate the α with Eq. (7) 11 return α

## Table 2

Descriptive information of experimental datasets.

| Id   |   Feature number |   Sample Number | Approximate category ratio (0:1)   |
|------|------------------|-----------------|------------------------------------|
| D1   |               16 |             520 | 8:5                                |
| D2   |                8 |             768 | 2:1                                |
| D3   |                7 |            1000 | 2.3:1                              |
| D4   |               17 |            4303 | 3:1                                |

## Algorithm 3

Injection of pairwise class noise.

Input: copy of original training dataset Tr = { xn , yn )} N n = 1 noise level nl Output: corrupted training dataset CTr 1 for n = 1, 2, … , N do 2 generate a random number between 0 and 1 3 if the random number is less than the noise level nl then 4 if the sample xn belongs to the majority class then 5 change the label yn of xn to the minority class 6 end if 7 end if 8 end for 9 CTr = Tr 10 return CTr

Here, B = ( b 1, b 2, … , bT ) represents the synthetic neighborhood of the patient sample a ,  which is generated via random perturbation, π a ( bt ) quantifies the proximity between samples bt and a , and Ω ( G ) measures the complexity of the linear surrogate model. For tabular datasets, the π a ( bt ) is typically defined as

where σ 2 denotes the kernel width. Given the tabular feature values of

## Algorithm 4

Injection of uniform class noise.

Input: copy of original training dataset Tr = { xn , yn )} N n = 1

noise level nl

Output: corrupted training dataset CTr

1 calculate the number of samples whose labels will be changed, i.e., ⌊ N ⋅ nl ⌋

2 randomly select ⌊ N ⋅ nl ⌋ samples from Tr to be modified

- 3 for each selected sample do

- 4 replace its label with the opposite class label

5 end for

6 CTr = Tr

7 return CTr

Table 3

Detailed configurations for the LNFs used in our experiments.

| Indexes   | LNFs   | Variants   | Configurations                                                                                                                                    |
|-----------|--------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| 1         | AKNNF  | AKNNF3     | Set the neighborhood size to 3                                                                                                                    |
| 2         |        | AKNNF5     | Set the neighborhood size to 5                                                                                                                    |
| 3         |        | AKNNF7     | Set the neighborhood size to 7                                                                                                                    |
| 4         | ENNF   | ENNF3      | Set the neighborhood size to 3                                                                                                                    |
| 5         |        | ENNF5      | Set the neighborhood size to 5                                                                                                                    |
| 6         |        | ENNF7      | Set the neighborhood size to 7                                                                                                                    |
| 7         | MKNNF  | MKNNF3     | Set the neighborhood size to 3                                                                                                                    |
| 8         |        | MKNNF5     | Set the neighborhood size to 5                                                                                                                    |
| 9         |        | MKNNF7     | Set the neighborhood size to 7                                                                                                                    |
| 10        | CF     | CFDT       | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy '                                                                         |
| 11        |        | CFLDA      | ) Five-fold cross validation LinearDiscriminantAnalysis()                                                                                         |
| 12        |        | CFSVM      | Five-fold cross validation SVC(kernel = ' linear ' , probability = True)                                                                          |
| 13        |        | CFMLP      | Five-fold cross validation MLPClassifier()                                                                                                        |
| 14        | MVEF   | MVEF1      | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1) LinearDiscriminantAnalysis()    |
| 15        | CEF    | CEF1       | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1) LinearDiscriminantAnalysis()    |
| 16        | MVEF   | MVEF2      | Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1)                                 |
| 17        | CEF    | CEF2       | MLPClassifier() Five-fold cross validation DecisionTreeClassifier(criterion = ' entropy ' ) KNeighborsClassifier(n_neighbors = 1) MLPClassifier() |
| 18        | ELF    | ELFBG      | Five-fold cross validation BaggingClassifier(max_samples = 0.7, n_estimators = 10)                                                                |
| 19        |        | ELFAB      | Five-fold cross validation AdaBoostClassifier(n_estimators = 10)                                                                                  |
| 20        |        | ELFXB      | Five-fold cross validation xgb.XGBClassifier(n_estimators = 10)                                                                                   |
| 21        |        | ELFRF      | Five-fold cross validation RandomForestClassifier(criterion = ' entropy ' , n_estimators = 10)                                                    |
| 22        | NCNF   |            | Five-fold cross validation NearestCentroid()                                                                                                      |
| 23 24     | CMNNF  |            | See reference [61]                                                                                                                                |
|           | CNDCF  |            | See reference [62]                                                                                                                                |

samples bt ( t = 1, … , T ) on E observed features, i.e., bt , e ( e = 1, … , E ), the above formulation can be equivalently expressed as follows:

where

The  learned  coefficients α e provide  insights  into  how  individual features  affect  the  prediction F ( a ),  with  a  higher α e indicating  that changes in the e -th feature have a greater impact on F ( a ) [25]. The sign of the coefficient also tells us whether the impact is positive or negative, and further, it can be used to determine the direction of changing the feature  if  there  is  a  need  to  alter  the  prediction.  When  the  training dataset  is  free  from  label  noise,  the  trained  black-box  model F ( ⋅ )  is considered reliable, and the linear surrogate model G ( ⋅ ) is also reliable. Therefore, the coefficients of G ( ⋅ ) can effectively reflect the importance of different features in the diagnostic process of DM and thus can be used as local explanations. This approach enables ' explainable diagnosis ' for DM patients. However, the presence of label noise disrupts the learning process of the black-box model F ( ⋅ ), which in turn adversely affects the above approximation process. As the noise level increases, the reliability of  diagnostic  predictions  can  degrade  significantly.  Considering  the inherent limitations of individual LNFs, the static and dynamic ensemble ways of LNFs are presented below to mitigate the influence of label noise on LIME.

## 3.3. Static ensemble of LNFs for local explanations

Analogous  to  classifier  ensembles,  the  ensemble  of  LNFs  aims  to improve the detection of label noise by leveraging the hypothesis that different LNFs offer complementary perspectives. In the static ensemble, all members of the lnf = { lnf 1, lnf 2, … , lnfM } are used to improve the local diagnostic explanations for all interested DM patients. According to the phase at which the combination occurs, the static ensemble of LNFs can be divided into the noise detection-based ensemble and the local explanations-based ensemble.

## 3.3.1. Static LNF ensemble based on noise detection

The primary assumption of this ensemble approach is that the output of each LNF can be represented as a vector, indicating which samples are noisy and which are not. Under this assumption, the outputs of all LNFs are  aggregated  to  filter  the  collected  diagnostic  dataset Tr ,  and  the filtered dataset is subsequently used to construct a black-box model F ( ⋅ ) for DM diagnosis. Suppose that the identification result of the m -th filter lnfm for the dataset Tr is output as I m = ( Im ,1 , … , Im , N ), where the n -th sample is detected as label noise if Im , n = 1, and otherwise, Im , n = 0. For example, given a diagnostic dataset composed of five samples { x 1, x 2, x 3, x 4, x 5}, the output of the filter lnfm might be (0, 1, 0, 1, 0), indicating that samples x 2 and x 4 are marked as label noise by lnfm , while the others are not.  After  processing  the  original  dataset Tr through M  fi lters  in sequence, the resulting matrix is obtained as follows:

It is evident that if the sample xn ( n = 1, … , N ) is marked as noise by the majority of filters, the sum of the n -th column of the matrix RM will be C. Xu et al.

Table 4 Average explanatory performance of the proposed framework and baseline LNFs on four datasets. The best result for each case is shown in bold. The noise is injected

using LNS1.

| Id   |   Noise level |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|---------------|--------|--------|--------|--------|---------|------------------------|
| D1   |           0.1 | 0.2829 | 0.2025 | 0.2823 | 0.2069 |  0.2747 |                 0.2756 |
|      |           0.2 | 0.2862 | 0.2099 | 0.2816 | 0.2131 |  0.2779 |                 0.2764 |
|      |           0.3 | 0.2864 | 0.2155 | 0.2815 | 0.2183 |  0.2815 |                 0.2825 |
|      |           0.4 | 0.2897 | 0.2228 | 0.2847 | 0.2264 |  0.2804 |                 0.2791 |
|      |           0.5 | 0.2834 | 0.2293 | 0.2816 | 0.2331 |  0.2794 |                 0.2823 |
| D2   |           0.1 | 0.2324 | 0.1718 | 0.2333 |  0.176 |  0.2272 |                 0.2277 |
|      |           0.2 | 0.2319 | 0.1769 | 0.2305 | 0.1815 |  0.2183 |                  0.226 |
|      |           0.3 | 0.2301 | 0.1801 | 0.2283 | 0.1831 |  0.2179 |                 0.2258 |
|      |           0.4 | 0.2279 | 0.1817 |  0.228 | 0.1848 |  0.2224 |                 0.2216 |
|      |           0.5 | 0.2250 | 0.1852 | 0.2237 | 0.1893 |  0.2209 |                 0.2216 |
| D3   |           0.1 | 0.1347 | 0.0939 | 0.1331 | 0.0956 |  0.1125 |                 0.1282 |
|      |           0.2 | 0.1399 | 0.0962 | 0.1385 | 0.0976 |  0.1015 |                  0.135 |
|      |           0.3 | 0.1392 | 0.0965 |  0.137 | 0.0977 |  0.0969 |                 0.1357 |
|      |           0.4 | 0.1391 | 0.0988 | 0.1403 |    0.1 |  0.1014 |                 0.1365 |
|      |           0.5 | 0.1368 | 0.0995 | 0.1357 | 0.1004 |  0.1219 |                 0.1319 |
| D4   |           0.1 |   0.35 | 0.2646 | 0.3426 | 0.2693 |  0.3279 |                 0.3466 |
|      |           0.2 | 0.3391 | 0.2658 | 0.3265 | 0.2715 |  0.3031 |                 0.3338 |
|      |           0.3 | 0.3272 | 0.2658 | 0.3267 | 0.2692 |  0.3213 |                 0.3221 |
|      |           0.4 |  0.317 | 0.2675 | 0.3152 | 0.2714 |  0.3136 |                 0.3144 |
|      |           0.5 | 0.3107 | 0.2716 |  0.308 | 0.2775 |  0.3073 |                  0.309 |

Average explanatory performance of the proposed framework and baseline LNFs on four datasets. The best result for each case is shown in bold. The noise is injected

Table 5 using LNS2.

| Id   |   Noise level |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|---------------|--------|--------|--------|--------|---------|------------------------|
| D1   |           0.1 | 0.2735 | 0.2084 | 0.2714 | 0.2116 |  0.2678 |                  0.268 |
|      |           0.2 | 0.2753 | 0.2252 | 0.2742 | 0.2269 |  0.2719 |                 0.2722 |
|      |           0.3 | 0.2861 | 0.2449 |  0.285 | 0.2457 |  0.2823 |                 0.2833 |
|      |           0.4 | 0.3021 |  0.269 |    0.3 | 0.2691 |  0.2966 |                 0.2986 |
|      |           0.5 | 0.3266 |  0.292 |  0.324 | 0.2935 |  0.3113 |                 0.3198 |
| D2   |           0.1 | 0.2289 | 0.1759 | 0.2313 | 0.1786 |  0.2252 |                 0.2236 |
|      |           0.2 | 0.2261 |  0.184 | 0.2261 | 0.1867 |  0.2235 |                 0.2236 |
|      |           0.3 | 0.2298 | 0.1941 | 0.2296 |  0.197 |   0.216 |                 0.2285 |
|      |           0.4 | 0.2327 |  0.206 | 0.2295 |  0.208 |  0.2167 |                 0.2336 |
|      |           0.5 | 0.2497 | 0.2193 | 0.2464 | 0.2189 |  0.2123 |                 0.2445 |
| D3   |           0.1 | 0.1327 |  0.094 | 0.1325 | 0.0952 |  0.1185 |                 0.1273 |
|      |           0.2 | 0.1416 | 0.0989 | 0.1404 | 0.1003 |  0.1112 |                 0.1338 |
|      |           0.3 | 0.1443 | 0.1018 |  0.145 |  0.103 |  0.0999 |                 0.1369 |
|      |           0.4 | 0.1498 | 0.1065 | 0.1543 | 0.1064 |     0.1 |                 0.1441 |
|      |           0.5 |   0.15 | 0.1032 | 0.1475 | 0.1032 |  0.0983 |                 0.1418 |
| D4   |           0.1 | 0.3346 | 0.2655 | 0.3346 | 0.2686 |  0.3301 |                 0.3328 |
|      |           0.2 | 0.3161 | 0.2723 |  0.316 | 0.2752 |  0.3065 |                 0.3149 |
|      |           0.3 | 0.3108 | 0.2839 | 0.3105 | 0.2869 |  0.3071 |                 0.3096 |
|      |           0.4 | 0.3169 | 0.3002 | 0.3179 | 0.3024 |  0.3123 |                 0.3158 |
|      |           0.5 | 0.3296 | 0.3167 | 0.3297 | 0.3172 |  0.3163 |                 0.3272 |

close to M . When the sum is either 0 or M , we can decisively retain or remove  the  sample xn .  However,  in  practical  scenarios,  it  is  rare  to encounter such an ideal situation. Due to the diversity among generated LNFs, each column usually contains both 1s and 0s. In this context, a fixed threshold θ = M /2 is set to determine whether a sample is noise. Specifically, when ∑ M m = 1 Im , n &gt; θ , the n -th sample is removed from the collected dataset Tr . Let TrE represent the diagnostic dataset filtered by this operation. By constructing the black-box prediction model F ( ⋅ ) with the TrE , the linear surrogate model G ( ⋅ ) is obtained to solve the optimization model shown in Eq. (3). The learned coefficients are used as the local  explanations α = { α 1, … , α E }  for  the  diagnostic  prediction  of  the target DM patient a . Algorithm 1 summarizes the above process.

The computational complexity of Algorithm 1 can be analyzed as follows. Steps 1 -6 have a complexity of approximately O ( M ⋅ N ), while Steps 7 -12 exhibit a similar complexity of O ( N ⋅ M ). For Step 13, since the computational complexity of the black-box model F ( ⋅ ) and the size of the TrE cannot be determined in advance, it is assumed to be O ( F ). Step 14 has an estimated complexity of O ( T ⋅ E ), and Step 15 requires approximately O ( T ⋅ E 2 + E 3 ).  Therefore,  the  overall  computational complexity of the static ensemble based on noise detection is roughly O (2 M ⋅ N + F + T ⋅ E + T ⋅ E 2 + E 3 ).

## 3.3.2. Static LNF ensemble based on local explanations

This ensemble process is executed after generating local diagnostic explanations through each individual filter. To explain the diagnostic prediction  for  patient a ,  training  datasets  filtered  by M  fi lters  are sequentially used to generate local explanations. According to Section 3.2, LIME outputs a set of coefficients α e as the local explanations of the diagnostic prediction. There are M sets of local diagnostic explanations. For the interested patient a , let us denote the set of coefficients learned from the training dataset Tr m as α m = { α m , 1, … , α m , E } ( m = 1, … , M ). The M sets of coefficients form the following matrix

Table 6 Parameter setting of black-box algorithms.

| Algorithms   | Codes                                                                                                                                                    |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| XB           | import xgboost as xgb blackBoxModel = xgb.XGBClassifier(n_estimators = 10, random_state = 123)                                                           |
| GB           | from sklearn.ensemble import GradientBoostingClassifier blackBoxModel = GradientBoostingClassifier(n_estimators = 10, random_state = 123)                |
| AB           | from sklearn.ensemble import AdaBoostClassifier blackBoxModel = AdaBoostClassifier(n_estimators = 10, random_state = 123)                                |
| RF           | from sklearn.ensemble import RandomForestClassifier blackBoxModel = RandomForestClassifier(criterion = ' gini ' , n_estimators = 10, random_state = 123) |
| NN           | from sklearn.neural_network import MLPClassifier blackBoxModel = MLPClassifier(hidden_layer_sizes = (10,), random_state = 123)                           |
| SVM          | from sklearn.svm import SVC blackBoxModel = SVC(kernel = ' rbf ' , probability = True, random_state = 123)                                               |

By summing each column of the matrix CM , the average importance of the e -th feature in predicting the diagnosis of sample a is calculated as

Finally, the α = { α 1 , … , α E } is output as the local diagnostic explanations of the patient a . The whole procedure is summarized in Algorithm 2.

The computational complexity of Algorithm 2 is analyzed as follows. Step 3 has a complexity of approximately O ( N ). Similar to Step 13 of Algorithm 1, the computational complexity of Step 4 is also assumed to be O ( F ).  Step  5  has  a  complexity  of O ( T ⋅ E ),  while  Step  6  requires approximately O ( T ⋅ E 2 + E 3 ). Since these steps are conducted for each LNF, the overall computational complexity of the static ensemble based on local explanations is roughly O ( M ⋅ ( N + F + T ⋅ E + T ⋅ E 2 + E 3 ) + M ⋅ E ).

## 3.4. Dynamic ensemble of LNFs for local explanations

In  contrast  to  the  static  ensemble  of  LNFs,  which  combines  all available LNFs to enhance local diagnostic explanations, the dynamic ensemble approach operates under the assumption that employing the most competent LNFs is sufficient to ensure high-quality local explanations for a given sample. Consequently, assessing the competency of each LNF is quite crucial to the entire process. To determine the competency of an LNF for the patient sample a , a similar region N m = { sm ,1 , … , sm , K } of a is identified from the filtered dataset Tr m ( m = 1, 2, … , M ) using the KNN algorithm [57]. According to the natural principle that similar patient samples should have similar local diagnostic explanations, the competence of each filter lnfm is evaluated based on its performance in providing local explanations for the similar region N m using the  dataset Tr m .  This  evaluation  is  conducted  independently  of  the performance of other filters. By providing the filtered dataset Tr m to the LIME  described  in  Section  3.2,  local  diagnostic  explanations  for  the similar sample sm , k ( m = 1, … , M, k = 1, … , K ) are obtained as { α k m , 1 , … , α k m , E }. The competency level clm of the filter lnfm ( m = 1, 2, … , M ) is defined as the internal consistency among the K sets of local explanations {{ α k m , e } E e = 1 } K k = 1 , which is computed as

A lower value of clm indicates higher consistency among the local explanations derived from the dataset Tr m , reflecting better performance of the filter lnfm . Based on the competency estimates results of the M filters, a predefined threshold δ is used to classify LNFs as competent or incompetent.  To  ensure  adaptability  in  the  dynamic  ensemble,  this threshold  is  set  to  the  average  performance  of  all  LNFs,  namely, δ

= ∑ M m = 1 clm M . A filter lnfm is deemed suitable for the patient sample a if clm &lt; δ . For the patient sample a , let the selected LNFs be denoted as lnf a = { lnf a 1 , … , lnf a J }  such  that J &lt; M .  If  the  outputs  of  these J  fi lters  are collected  as  noise  detection  vectors,  the  static  ensemble  procedure outlined in Algorithm 1 is used to combine them. Instead, if the outputs of the J fi lters are collected as local explanations, the static ensemble procedure  described  in  Algorithm  2 is  used  for  their  combination. Therefore, two distinct dynamic ensemble methods are also developed within the proposed framework, depending on the outputs of the J fi lters to be combined. The computational complexity of the dynamic evaluation process described above is about O ( M ⋅ ( N + N log N + F + K ( T ⋅ E + T ⋅ E 2 + E 3 ) + K 2 ⋅ E ). For the subsequent static ensemble, given J selected LNFs,  the  complexity  of  the  ensemble  based  on  noise  detection  is approximately O (2 J ⋅ N + F + T ⋅ E + T ⋅ E 2 + E 3 ), while the ensemble based on local explanations has a complexity of approximately O ( J ⋅ ( N + F + T ⋅ E + T ⋅ E 2 + E 3 ) + J ⋅ E ).

## 3.5. Theoretical analysis

In this section, we theoretically demonstrate the rationale behind the LNF ensemble. For ease of analysis, we assume that the generated LNFs are independent of each other and that all LNFs share the same noise detection error rate, denoted as er . For a sample xn , the detection error er of the m -th LNF lnfm is calculated as

where yn indicates  whether  the  sample xn is  noise.  When  the  noise detection results of M LNFs are combined with the average combination strategy,  the  final  ensemble  detection  result  can  be  mathematically expressed as follows

where II ( ⋅ ) is the indicator function. Therefore, if there is ∑ M m = 1 Im , n &gt; M / 2,  the  LNF  ensemble  decides  that  the  sample xn is  noise,  and  the detection error of the ensemble is calculated as

Given that the ensemble decision is determined by a fixed threshold θ = M /2, there are two different cases to consider. The first case is when the sample xn is not noise, i.e., yn = 0. In this case, the ensemble error can be reformulated as

Since  the  outputs  of  LNFs  are  independent  and  have  only  two possible values, the ensemble error can be estimated using the Binomial distribution, which is the probability of at least M /2 LNFs providing wrong  detection  results  [58].  Given  the  detection  error  rate er ,  the probability  that  each  LNF  correctly  identifies  the  noise  is  1 er . Therefore, for the clean sample xn , the probability that the LNF ensemble classify it as noise can be estimated as

Based on the law of large numbers and the central limit theorem, we can conclude that as M increases, the ensemble detection error E converges to er and is further reduced because of the averaging operation. In the second case, where yn = 1, the proof follows a similar process and is omitted for brevity. Ultimately, we can conclude that the ensemble of C. Xu et al.

Fig. 3. Performance results of all baseline LNFs on dataset D1.

multiple LNFs improves the overall quality of the dataset by reducing noise detection errors.

## 4. Experiments

We examine the performance of the proposed framework using four real  datasets  of  DM  patients.  Detailed  experimental  procedures  are outlined as follows.

## 4.1. Dataset description and processing

Table  2 summarizes  the  four  DM  datasets  sourced  from  UCI  and Kaggle that are utilized in our experiments. These datasets vary in the number of features, ranging from 7 to 17, and in the number of samples, ranging  from  520  to  4303.  Common  features  across  these  datasets include Age, BMI, and Blood Pressure. The proportion of DM patients compared to Non-DM patients differs among datasets, but generally, the Non-DM patient proportion is lower, reflecting the lower incidence of DM in the population. It is important to note that the original datasets contain missing samples, which were removed before our experiments. The remaining samples are normalized to a range of 0 to 1 for each feature  using  Min-Max  normalization.  The  5-fold  cross  validation  is employed to partition each dataset into five non-overlapping subsets of equal size. Four of these subsets are used as the collected diagnostic dataset, i.e., the original training dataset Tr , while the remaining subset serves as the test dataset for providing the test patient sample a .  To ensure  fairness,  all  compared  methods  are  evaluated  using  the  same folds, and the cross validation is repeated five times. The final performance is reported as the average across these five repeated runs.

To  simulate  real-world  scenarios  where  diagnostic  data  includes incorrect results, we implemented two distinct label noise generation strategies: pairwise class noise [30] and uniform class noise [24]. Pairwise class noise assumes noise occurs only in samples from the majority class, whereas uniform class noise assumes all samples have an equal probability of being corrupted. These strategies are referred to as LNS1 and LNS2, respectively, and are applied independently. Algorithms 3 -4

Fig. 4. Performance results of all baseline LNFs on dataset D2.

detail  the  processes  for  injecting  LNS1  and  LNS2  into  a  copy  of  the original training dataset Tr . For differentiation, the corrupted training dataset is denoted as CTr . Both the proposed framework and compared baseline LNF methods are built on the CTr . Five different levels of label noise, i.e., 10 %, 20 %, 30 %, 45 %, and 50 %, are considered in our experiments.

## 4.2. Experimental setup

To create a pool of diverse LNFs, mainstream LNFs are considered and implemented in our experiments. They include AKNNF [27], ENNF [26],  MKNNF [59], CF [28], MVEF [31,60], CEF [31,34], ELF [31], NCNF [28], CMNNF [61], and CNDCF [62]. By setting various parameters, we finally derived 24 distinct variants of these LNFs, and both homogeneous  and  heterogeneous  LNFs  are  incorporated  within  the proposed  framework.  Detailed  descriptions  of  these  24  variants  are presented below, and their configurations are demonstrated in Table 3. These 24 variants also serve as baseline methods in our experiments.

- AKNNF:  This  method  extends  the  traditional  KNN  algorithm  by gradually  increasing  the  number  of  neighbors  (K)  from  1  to  K. Samples  misclassified  for  all  K  values  are  labeled  as  noise  and removed. In our experiments, we set K to 3, 5, and 7, corresponding to AKNNF3, AKNNF5, and AKNNF7, respectively.
- ENNF: This method directly uses the traditional KNN algorithm with a fixed K to filter samples. Samples with labels differing from their K nearest neighbors are treated as noise and removed. In our experiments, K is set to 3, 5, and 7, with corresponding LNFs noted as ENNF3, ENNF5, and ENNF7.

Fig. 5. Performance results of all baseline LNFs on dataset D3.

- MKNNF: This method introduces mutual nearest neighbor (MNN) as a  noise-filtering  criterion.  Though  different  from  KNN,  it  still  requires a K parameter, also set to 3, 5, and 7. The corresponding LNFs are MKNNF3, MKNNF5, and MKNNF7.
- CF:  Using the  cross-validation  technique,  this  method  divides  the dataset into five subsets. Four are used for training a classifier, while the  samples  misclassified  in  the  fifth  are  identified  as  noise  and removed. We adopt Decision Trees, Linear Discriminant Analysis, Support Vector Machine, and Multi-layer Perceptron as classifiers. They are implemented using scikit-learn package of Python, and the resulting LNFs are CFDT, CFLDA, CFSVM, and CFMLP.
- MVEF and CEF: Both methods extend CF by incorporating multiple classifiers. MVEF uses majority voting, while CEF employs a stricter consensus  strategy.  Two  groups  of  classifiers  are  used:  (1)  KNN, Decision Trees, and Linear Discriminant Analysis, and (2) Decision Trees,  KNN,  and  Multi-layer  Perceptron.  The  resulting  LNFs  are MVEF1, CEF1, MVEF2, and CEF2.
- ELF: This method uses cross validation and ensemble learning algorithms (Bagging, AdaBoosting, XGBoost, and Random Forest) to identify  noisy  samples.  Misclassified  samples  are  removed.  The resulting LNFs are ELFBG, ELFAB, ELFXB, and ELFRF. The scikitlearn  package  of  Python  implements  all  algorithms  except  for XGBoost.
- NCNF: This method replaces traditional KNN with K-nearest centroid neighbors for noise detection. Misclassified samples are removed. This method is implemented using scikit-learn package of Python with default parameters.
- CMNNF: This method trains two complementary neural networks, one with the original dataset and the other with its label complement. Samples misclassified by both networks are removed as noise. Network parameters are consistent with those in [61].
- CNDCF: This method combines ensemble-based and distance-based filters.  First,  noisy  samples  are  classified  as  strong  or  weak  noise using the ELF method. Then, a distance-based filter removes noisy

Fig. 6. Performance results of all baseline LNFs on dataset D4.

samples based on their distribution. Parameters are consistent with those in [62].

Our objective is to evaluate whether the proposed framework can mitigate the effects of label noise on the explainable diagnosis of DM patients. Performance is assessed based on local diagnostic explanations generated  by  LIME.  Local  explanations  produced  from  the  original training dataset Tr serve as the reference standard for the performance examination of the proposed framework. If the proposed framework or the benchmark LNF is powerful enough, the local explanations generated by its final output should closely approximate the reference standard. For a given patient a , such difference between local explanations can be defined as follows:

where α g denotes  the  local  explanations  generated  from  the  clean training dataset Tr and α denotes the local explanations generated from the  corrupted  training  dataset CTr using  the  proposed  framework. Similarly, by replacing α with the local explanations generated based on the CTr output by each baseline LNF lnfm ( m = 1, … , M ), the performance of the corresponding individual LNF can also be evaluated. The smaller the above difference is, the better the performance is. For the black-box model F ( ⋅ ) used in LIME, we apply the XGBoost (XB) algorithm to provide unexplainable prediction due to its prevalence in DM diagnosis [63,64]. The number of base learners in XB is set to 10 and other parameters are the default settings in the xgboost 1 package, as detailed in Table 6.

## 4.3. Results and analysis

For ease of comparison and analysis, the proposed framework based on the four different ensemble strategies is referred to as PMSN (Static C. Xu et al.

1 https://xgboost.readthedocs.io/en/latest/parameter.html

Table 7 Average explanatory performance of the proposed framework under other black-box algorithms. The noise is injected using LNS1.

| Id   | Algorithms   |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|--------------|--------|--------|--------|--------|---------|------------------------|
| D1   | GB           | 0.1667 | 0.1393 | 0.1642 | 0.1415 |  0.1612 |                 0.1618 |
|      | AB           | 0.0741 | 0.0665 | 0.0723 | 0.0664 |  0.0711 |                 0.0756 |
|      | RF           | 0.2401 | 0.1917 | 0.2382 | 0.1928 |  0.2316 |                 0.2395 |
|      | NN           | 0.2281 | 0.1994 | 0.2274 | 0.2018 |  0.2238 |                 0.2243 |
|      | SVM          | 0.2508 | 0.2288 | 0.2504 | 0.2346 |  0.2333 |                 0.2517 |
| D2   | GB           |  0.122 | 0.1022 | 0.1214 | 0.1049 |  0.1185 |                 0.1188 |
|      | AB           | 0.0561 | 0.0391 |  0.051 |  0.039 |  0.0524 |                  0.053 |
|      | RF           | 0.2124 | 0.1686 | 0.2136 |  0.171 |  0.2108 |                 0.2108 |
|      | NN           | 0.0563 | 0.0438 | 0.0555 | 0.0449 |  0.0512 |                 0.0515 |
|      | SVM          | 0.1851 | 0.1687 | 0.1861 | 0.1811 |  0.1849 |                 0.1856 |
| D3   | GB           | 0.0472 | 0.0341 | 0.0465 | 0.0339 |  0.0447 |                 0.0446 |
|      | AB           | 0.0318 | 0.0247 | 0.0287 | 0.0227 |  0.0265 |                 0.0267 |
|      | RF           | 0.1757 | 0.1291 | 0.1787 |  0.131 |  0.1485 |                 0.1744 |
|      | NN           | 0.0345 | 0.0308 | 0.0349 | 0.0328 |  0.0334 |                 0.0344 |
|      | SVM          | 0.0204 | 0.0195 | 0.0196 | 0.0137 |  0.0171 |                  0.017 |
| D4   | GB           | 0.1736 | 0.1552 | 0.1727 | 0.1589 |  0.1724 |                 0.1735 |
|      | AB           | 0.2064 | 0.1556 | 0.2053 | 0.1577 |  0.2047 |                 0.2054 |
|      | RF           | 0.2571 | 0.2118 | 0.2574 | 0.2156 |  0.2562 |                 0.2612 |
|      | NN           | 0.2805 | 0.2483 | 0.2789 | 0.2523 |  0.2783 |                   0.28 |
|      | SVM          | 0.2956 |  0.271 | 0.2994 | 0.2864 |  0.2972 |                 0.3012 |

Table 8 Average explanatory performance of the proposed framework under other black-box algorithms. The noise is injected using LNS2.

| Id   | Algorithms   |   PMSN |   PMSL |   PMDN |   PMDL |   BILNF |   Benchmark difference |
|------|--------------|--------|--------|--------|--------|---------|------------------------|
| D1   | GB           | 0.1904 | 0.1798 | 0.1892 | 0.1803 |  0.1874 |                 0.1892 |
|      | AB           | 0.0874 | 0.0797 | 0.0839 | 0.0795 |   0.082 |                 0.0848 |
|      | RF           |  0.295 | 0.2585 |  0.295 | 0.2601 |  0.2763 |                 0.2944 |
|      | NN           | 0.2635 | 0.2493 | 0.2639 | 0.2501 |  0.2584 |                 0.2588 |
|      | SVM          |  0.261 | 0.2601 |  0.261 |   0.26 |  0.2607 |                 0.2611 |
| D2   | GB           | 0.1283 | 0.1219 | 0.1279 | 0.1221 |  0.1274 |                 0.1266 |
|      | AB           | 0.0474 | 0.0418 | 0.0461 |  0.041 |  0.0444 |                 0.0444 |
|      | RF           | 0.2381 | 0.1987 | 0.2329 | 0.2003 |  0.1981 |                 0.2355 |
|      | NN           | 0.0563 | 0.0438 | 0.0555 | 0.0449 |   0.055 |                 0.0554 |
|      | SVM          | 0.1924 | 0.1914 |  0.192 |  0.191 |  0.1912 |                 0.1919 |
| D3   | GB           | 0.0531 | 0.0374 | 0.0518 | 0.0377 |  0.0447 |                 0.0484 |
|      | AB           |  0.028 | 0.0235 | 0.0265 | 0.0214 |  0.0243 |                 0.0243 |
|      | RF           | 0.1844 | 0.1337 | 0.1785 | 0.1355 |  0.1306 |                  0.184 |
|      | NN           | 0.0325 | 0.0287 |  0.033 | 0.0299 |   0.032 |                 0.0322 |
|      | SVM          | 0.0234 | 0.0185 | 0.0211 | 0.0157 |  0.0158 |                  0.022 |
| D4   | GB           | 0.1873 | 0.1858 | 0.1873 | 0.1859 |  0.1871 |                 0.1871 |
|      | AB           | 0.1857 | 0.1854 | 0.1857 | 0.1852 |  0.1854 |                 0.1855 |
|      | RF           | 0.2961 | 0.2683 |  0.293 | 0.2695 |  0.2697 |                 0.2974 |
|      | NN           | 0.2877 | 0.2858 | 0.2883 | 0.2856 |   0.286 |                 0.2868 |
|      | SVM          | 0.3111 | 0.3109 | 0.3109 | 0.3109 |  0.3109 |                  0.311 |

ensemble based on noise detection), PMSL (Static ensemble based on local explanations), PMDN (Dynamic ensemble based on noise detection),  and  PMDL  (Dynamic  ensemble  based  on  local  explanations), respectively.  The  average  performance  results  of  these  strategies  are detailed in Tables 4 and 5. To further facilitate comparison, the performance results of the best baseline LNF among the 24 evaluated LNFs are also presented in the two tables, with the individual performance of each LNF illustrated in Figs. 3 -6. In these figures, the horizontal axis represents the index of each LNF, with 1 corresponding to the first LNF and 24 to the last. The best baseline LNF is hereinafter referred to as BILNF.  Tables  4  and  5 reveal  that  the  local  diagnostic  explanations generated by the proposed framework are not consistently closer to the reference standard than those produced by individual LNFs. Specifically, both PMSN and PMDN have similar performance to the individual LNFs. To demonstrate the impact of label noise on local diagnostic explanations, the difference between the explanations generated from the clean original  training  dataset Tr and  those  from  the  corrupted  training dataset CTr is calculated as the benchmark difference, as shown in the last columns of Tables 4 and 5. Across the four datasets, it is evident that while  applying  a  single  LNF  to CTr can  reduce  this  difference,  the reduction is not always substantial, and in some cases, it may even have the opposite effect. This phenomenon is similarly observed with PMSN and PMDN, but not with PMSL and PMDL. Notably, PMSL and PMDL outperform PMSN and PMDN in minimizing this difference. However, it should be noted that this advantage diminishes as the noise level increases, indicating the limitations of the proposed framework. When the dataset is heavily corrupted by label noise, the proposed framework will fail. This is quite normal since when a dataset is full of label noise, the benchmark differences reported in the last columns of Tables 4 and 5 will also become larger. Additionally, whether the proposed framework or BILNF is used, the choice of LNS1 or LNS2 for noise injection does not significantly  affect  performance.  This  suggests  that  the  type  of  label noise has a limited impact on local diagnostic explanations compared to the noise level. Based on these findings, it is recommended to combine LNFs based on local explanations rather than noise detection, given the latter ' s inferior performance.

Figs. 3 -5 depict the performance comparison of 24 baseline LNFs across  four  datasets,  yielding  three  key  observations.  First,  there  are noticeable performance disparities among LNFs, particularly between heterogeneous  LNFs,  rather  than  among  homogeneous  LNFs.  For C. Xu et al.

Fig. 7. Comparison of win, tie, and loss votes between PMSL and other methods.

instance,  despite  increasing  noise  levels,  the  performance  difference among the first three homogeneous LNFs (i.e., AKNNF3, AKNNF5, and AKNNF7) remains minimal. However, comparing the sixth and seventh LNFs in Fig. 3(b) reveals a significant performance gap between ENNF and MKNNF. This indicates that if we want to obtain a high-quality dataset, choosing a suitable LNF is an issue that needs to be taken seriously.  Second,  uniform  class  noise  (LNS2)  appears  to  have  a  greater impact on LNF performance in improving the quality of local explanations compared to pairwise class noise (LNS1). In datasets D1 and D2, increasing the level of pairwise class noise does not substantially affect LNF performance in this regard. However, as shown in Fig. 3(b) and Fig.  4(b),  this  situation  is  completely  different  when  the  noise  is switched to uniform class noise. As the level of uniform noise increases, the difference between the local explanations generated from CTr and those from Tr becomes progressively larger. Moreover, this difference may have a functional relationship with the level of uniform class noise because  as  the  noise  level  increases,  this  difference  also  increases accordingly. This relationship, however, lies beyond the scope of this study  and  warrants  further  investigation.  Regardless,  these  findings suggest that using LNS2 instead of LNS1 for noise injection may yield more discriminative results if we want to implement an effective evaluation of the performance of LNF in improving local explanations. The third  finding  is  related  to  the  size  of  the  dataset.  In  the  first  three datasets,  the  explanation  differences  generally  increase  with  higher levels  of  uniform  class  noise.  Conversely,  in  the  last  dataset,  adding either type of noise seems to reduce these differences. As depicted in Fig. 6, the largest explanation difference is consistently observed when the  noise  level  is  0.1,  regardless  of  the  LNF  used.  Tables  4  and  5 corroborate this observation, suggesting that as dataset size increases, the effectiveness of LNFs in improving local explanations may diminish.

## 4.4. Discussion

To explore how label noise affects the diagnostic explanations of DM, this paper develops an ensemble framework for LNFs based on LIME. In the above experiment, XB is selected as the black-box prediction model to  ensure  the  performance  of  the  proposed  framework.  However, C. Xu et al.

Table 9 Paired t-test results for each comparison.

| Comparisons         |   Statistics |   p -values | Significant?   |
|---------------------|--------------|-------------|----------------|
| PMSN vs. PMSL       |        8.729 |    2.13E-11 | Yes            |
| PMSN vs. PMDN       |        4.172 |      0.0001 | Yes            |
| PMSN vs. PMDL       |        8.538 |    4.06E-11 | Yes            |
| PMSL vs. PMDN       |        8.412 |    6.22E-11 | Yes            |
| PMSL vs. PMDL       |        3.228 |      0.0023 | Yes            |
| PMDN vs. PMDL       |        8.283 |    9.65E-11 | Yes            |
| PMSN vs. BILNF      |         4.65 |    2.72E-05 | Yes            |
| PMSL vs. BILNF      |        5.678 |    8.24E-07 | Yes            |
| PMDN vs. BILNF      |        4.324 |    7.92E-05 | Yes            |
| PMDL vs. BILNF      |        5.432 |    1.93E-06 | Yes            |
| PMSN vs. Benchmark  |        4.824 |    1.52E-05 | Yes            |
| PMSL vs. Benchmark  |        7.987 |    2.66E-10 | Yes            |
| PMDN vs. Benchmark  |        1.903 |      0.0632 | No             |
| PMDL vs. Benchmark  |        7.881 |    3.84E-10 | Yes            |
| BILNF vs. Benchmark |        3.872 |     0.00033 | Yes            |

Fig. 8. Comparison of win, tie, and loss votes between PMDL and other methods.

considering the model-agnostic nature of LIME, whether the proposed framework also has this nature still needs further verification. Therefore, this section will discuss the nature of the proposed framework in this regard. Also under the above experimental framework, this section selects four other algorithms, including Gradient Boosting (GB), AdaBoost (AB), Random Forests (RF), Neural Networks (NN), and Support Vector Machines  (SVM),  to  replace  the  constructed  XB  model  in  the  above experiment. These five algorithms are selected mainly because of their wide application in DM, such as [36,41,43]. The five selected algorithms are all implemented in Python, and the specific parameter settings are shown in Table 7. It can be seen from Tables 4 and 5 that when the noise level is 0.5, the performance of the proposed framework is only slightly better than the baseline BILNF and benchmark difference. Therefore, in this  discussion  section,  the  performance  of  the  proposed  framework under other black-box algorithms is mainly discussed when the noise level is 0.5. The experimental results are shown in Tables 7 and 8.

Tables 7 and 8 illustrate that the choice of different prediction algorithms  has  a  notable  impact  on  the  performance  of  the  proposed framework. For datasets D1, D2, and D3, when the black-box model is constructed using the AB, label noise appears to have minimal effect on the generated local explanations, as evidenced by the relatively small benchmark differences. Although the proposed framework further reduces  this  explanation  difference,  the  degree  of  improvement  is  not significant. However, when using the other four algorithms (i.e., GB, RF, NN, and SVM) to build the black-box models, the impact of label noise on  the  corresponding  local  explanations  becomes  more  pronounced. These results indicate that, while LIME is model-agnostic, the performance  of  the  proposed  framework  is  not  consistent  across  different black-box  models.  Therefore,  for  LIME,  the  choice  of  an  appropriate black-box  algorithm  should  be  tailored  to  the  characteristics  of  the dataset. For example, in the context of this experiment, selecting the AB algorithm to construct the black-box model for datasets D1 and D2 may eliminate the need for noise handling, since it can ensure the quality of the  generated  explanations  is  close  to  the  reference  standard α g . Conversely, when other algorithms are selected, it may still be necessary to consider strategies for mitigating the impact of noise on the prediction explanations. The comparison between Tables 4, 5, 7, and 8 reveals that when the black-box model is switched from XB to other algorithms, the proposed framework seems to fail. This suggests that even with the use of the proposed framework, the differences in explanations generated from the Tr and the CTr are not significantly reduced. A typical example can  be  found  in  Table  8,  where  the  performance  of  the  proposed framework on datasets D1, D2, and D4 does not significantly deviate from the benchmark differences. Nevertheless, the proposed framework still  outperforms  BILNF  in  this  regard,  indicating  that  aggregating multiple LNFs remains an effective approach to mitigate the impact of noise  on  prediction  explanations.  Lastly,  regardless  of  the  algorithm chosen  to  construct  the  black-box  model,  both  PMSL  and  PMDL consistently outperform PMSN, PMDN, and BILNF.

To facilitate analysis, Figs. 7 and 8 illustrate the win, tie, and loss counts of PMSL and PMDL versus other methods across all algorithms under a noise level of 0.5. The comparison results are recorded as follows: here taking the first result row of Table 7 as an example, if the average explanatory performance of PMSL is less than that of PMSN, PMSL is counted as a win; otherwise, it is counted as a loss. The comparison of PMSL with other methods (i.e., PMSN, PMDN, PMDL, BILNF, and Benchmark) is also carried out according to this counting process. The comparison results of PMDL with all baseline methods can also be obtained in the same way. In total, PMSL and PMDL are compared 48 times using two noise injection strategies and six algorithms, respectively. We can see that PMSL and PMDL can win in most of the comparisons, and the number of wins of PMSL is also higher than that of PMDL.

Based  on  the  average  explanatory  performance  of  all  compared methods across 48 comparisons, a paired t-test [62] is also employed to examine the compatibility of the proposed framework with different algorithms from a statistical perspective. Table 9 presents the results of each comparison related to the proposed method. Unlike the previous comparison (see Figs. 7 and 8), which is based on win/loss votes, the paired t-test results are calculated based on the explanatory performance of each pair of compared methods. For example, in the first result row of Table 9, ' PMSN vs. PMSL ' indicates a comparison between the average explanation performance of the PMSN method and that of the PMSL method.  In  the  calculation  process,  the  average  explanation  performance of PMSN under different conditions (including six black-box algorithms and two noise injection strategies) is treated as one observation set, while that of PMSL constitutes another observation set. Each pair of observations from these two sets, obtained under the same conditions, is used to calculate the statistical statistic. At a confidence level of 0.05, it is evident that most of the results are statistically significant. Considering the sign of the statistic in the second column of Table 9, it is easy to observe  that,  regardless  of  the  algorithm  selected,  PMSL  and  PMDL consistently outperform PMSN and PMDN. Although PMSL and PMDL exhibit similar performance in the experiments mentioned above, there is still a statistically significant difference between them as 0.0023 &lt; 0.05. The performance of both PMSN and PMDN is inferior to that of BILNF, suggesting that aggregating LNF based on noise detection results does  not  effectively  reduce  the  impact  of  noise  on  explanations.  In contrast, only aggregating LNF based on the generated local explanations achieves this goal. This indicates that, regardless of the algorithm selected,  combining  LNF  based  on  local  explanations  outperforms BILNF, while BILNF itself outperforms combining LNF based on noise detection.  Pairwise  comparisons  with  benchmark  differences  demonstrate that using either PMSL or PMDL improves the quality of explanations derived from LIME to some extent, regardless of the algorithm chosen. In conclusion, while the proposed framework is compatible with different algorithms based on LIME, further exploration may be needed to determine which algorithm is optimal for a given dataset.

## 5. Conclusion and future work

This paper provides valuable insights into the impact of label noise on  local  diagnostic  explanations  and  proposes  a  novel  ensemble framework to mitigate this effect. The most significant innovation of the proposed  framework  is  that  four  distinct  ensemble  strategies  are designed to generate the final local diagnostic explanations for DM patients. Using four real DM datasets, we compare the performance of the proposed framework against 24 different LNFs in terms of their ability to reduce the effect of noise on local predictive explanations. The experimental  results  reveal  several  important  findings.  First,  aggregating multiple  LNFs  based  on  their  noise  detection  results  often  performs similarly to the best-performing individual LNFs. This demonstrates that simply  combining  multiple  LNFs  does  not  necessarily  improve  the quality of the generated local explanations compared to using an individual LNF. Second, aggregating the local explanations generated by each LNF-filtered dataset leads to significantly superior results. Therefore, ensemble strategies based on local explanations (PMSL and PMDL) consistently  outperform  those  based  on  noise  detection  (PMSN  and PMDN). Additionally, the dynamic LNF selection criterion based on the consistency of local explanations across the neighborhood of samples does  not  improve  the  final  performance.  This  suggests  that  further investigation into alternative dynamic ensemble strategies is required to enhance the quality of local predictive explanations. Third, the performance of the proposed framework varies with the choice of black-box prediction  models.  While  the  framework  achieves  notable  improvements with AB, it shows diminished performance with GB, RF, NN, and SVM,  highlighting  the  influence  of  prediction  model  selection  on explanation  quality.  Furthermore,  the  findings  emphasize  that  while aggregating LNFs helps produce better explanations, the effectiveness of the framework declines at higher noise levels, which aligns with the intuition that extreme noise degrades the quality of training data.

Although  the  proposed  framework  offers  a  practical  solution  for C. Xu et al.

mitigating  label  noise  in  local  explanations,  with  implications  for improving the reliability of explainable AI models in label noise environments, the above findings also suggest that future research should explore  strategies  to  enhance  framework  performance  under  heavy noise conditions. In future work, we aim to extend this research in four aspects: (1) developing new dynamic selection criteria to improve the ensemble performance of LNFs and exploring more effective threshold adjustment strategies based on dataset characteristics; (2) enhancing the applicability  of  framework  in  handling  high-dimensional  datasets  by integrating an effective feature selection mechanism; (3) examining the compatibility  of  the  proposed  framework  with  other  PHETs;  and  (4) investigating the effectiveness of this framework in aiding diagnosis for other diseases.

## CRediT authorship contribution statement

Che Xu: Writing -original draft, Validation, Software, Resources, Methodology, Investigation, Conceptualization. Peng Zhu: Validation, Supervision, Funding acquisition, Formal analysis, Data curation. Jiacun Wang: Writing -review &amp; editing, Validation, Resources, Methodology,  Formal  analysis. Giancarlo  Fortino: Writing -review &amp; editing, Validation, Supervision, Resources, Methodology, Investigation.

## Declaration of competing interest

The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.

## Acknowledgments

This research is supported by the National Natural Science Foundation  of  China  (Grant  Nos.  72301135,  72174087,  72474103  and 71874082), the Social Science Foundation of Jiangsu Province (Grant No. 22TQB004), and the Key R &amp; D Plan of Jiangsu Province (Grant No. BE2022712).

## Data availability

Data will be made available on request.

## References

- [1] M.R. Islam, S. Banik, K.N. Rahman, M.M. Rahman, A comparative approach to alleviating the prevalence of diabetes mellitus using machine learning, Comput. Methods Programs Biomed. Update 4 (2023) 100113.
- [2] A. Singh, A. Dhillon, N. Kumar, M.S. Hossain, G. Muhammad, M. Kumar, eDiaPredict: an ensemble-based framework for diabetes prediction, ACM Trans. Multimedia Comput. Commun. Appl. 17 (2021) 66.
- [3] F. Navazi, Y. Yuan, N. Archer, An examination of the hybrid meta-heuristic machine learning algorithms for early diagnosis of type II diabetes using big data feature selection, Healthc. Anal. 4 (2023) 100227.
- [4] S.M. Ganie, M.B. Malik, An ensemble machine learning approach for predicting Type-II diabetes mellitus based on lifestyle indicators, Healthc. Anal. 2 (2022) 100092.
- [5] M.R. Hassan, M.F. Islam, M.Z. Uddin, G. Ghoshal, M.M. Hassan, S. Huda, G. Fortino, Prostate cancer classification from ultrasound and MRI images using deep learning based explainable artificial intelligence, Future Gener. Comput. Syst. 127 (2022) 462 -472.
- [6] M.R. Hassan, S. Huda, M.M. Hassan, J. Abawajy, A. Alsanad, G. Fortino, Early detection of cardiovascular autonomic neuropathy: a multi-class classification model based on feature selection and deep learning feature fusion, Inf. Fusion 77 (2022) 70 -80.
- [7] Y. Zhang, J.Y. Du, X. Ma, H.Y. Wen, G. Fortino, Aspect-based sentiment analysis for user reviews, Cogn. Comput. 13 (2021) 1114 -1127.
- [8] H. Han, J. Yi Lin Forrest, J. Wang, S. Yuan, F. Han, D. Li, Explainable machine learning for high frequency trading dynamics discovery, Inf. Sci. 684 (2024) 121286.
- [9] G. Fortino, L. Fotia, F. Messina, D. Rosaci, G.M.L. Sarn ` e, A social edge-based IoT framework using reputation-based clustering for enhancing competitiveness, IEEE Trans. Comput. Soc. Syst. 10 (2023) 2051 -2060.
- [10] H. Han, Y. Wu, J. Wang, A. Han, Interpretable machine learning assessment, Neurocomputing 561 (2023) 126891.
- [11] A.Z. Woldaregay, E. Årsand, S. Walderhaug, D. Albers, L. Mamykina, T. Botsis, G. Hartvigsen, Data-driven modeling and prediction of blood glucose dynamics: machine learning applications in type 1 diabetes, Artif. Intell. Med. 98 (2019) 109 -134.
- [12] J.A. Carter, C.S. Long, B.P. Smith, T.L. Smith, G.L. Donati, Combining elemental analysis of toenails and machine learning techniques as a non-invasive diagnostic tool for the robust classification of type-2 diabetes, Expert Syst. Appl. 115 (2019) 245 -255.
- [13] F.J. Shang, C.F. Ran, An entity recognition model based on deep learning fusion of text feature, Inf. Process. Manag. 59 (2022) 102841.
- [14] A. Gosiewska, A. Kozak, P. Biecek, Simpler is better: lifting interpretabilityperformance trade-off via automated feature engineering, Decis. Support Syst. 150 (2021) 113556.
- [15] A. Kamel Rahimi, O.J. Canfell, W. Chan, B. Sly, J.D. Pole, C. Sullivan, S. Shrapnel, Machine learning models for diabetes management in acute care using electronic medical records: a systematic review, Int. J. Med. Inform. 162 (2022) 104758.
- [16] M. Moradi, M. Samwald, Post-hoc explanation of black-box classifiers using confident itemsets, Expert Syst. Appl. 165 (2021) 113941.
- [17] A.B. Arrieta, N. Díaz-Rodríguez, J. Del Ser, A. Bennetot, S. Tabik, A. Barbado, S. García, S. Gil-L ´ opez, D. Molina, R. Benjamins, Explainable Artificial Intelligence (XAI): concepts, taxonomies, opportunities and challenges toward responsible AI, Inf. Fusion 58 (2020) 82 -115.
- [18] V.V. Khanna, K. Chadaga, N. Sampathila, R. Chadaga, S. Prabhu, S. K S, A. S. Jagdale, D. Bhat, A decision support system for osteoporosis risk prediction using machine learning and explainable artificial intelligence, Heliyon 9 (2023) e22456.
- [19] T.C.T. Chen, H.C. Wu, M.C. Chiu, A deep neural network with modified random forest incremental interpretation approach for diagnosing diabetes in smart healthcare, Appl. Soft Comput. 152 (2024) 111183.
- [20] Q.Q. Chen, G.X. Jiang, F.Y. Cao, C.Q. Men, W.J. Wang, A general elevating framework for label noise filters, Pattern Recognit 147 (2024) 110072.
- [21] J.A. S ´ aez, E. Corchado, ANCES: a novel method to repair attribute noise in classification problems, Pattern Recognit 121 (2022) 108198.
- [22] J.M. Johnson, T.M. Khoshgoftaar, A survey on classifying big data with label noise, ACM J. Data Inf. Qual. 14 (2022) 1 -43.
- [23] J.A. S ´ aez, B. Krawczyk, M. Wo ´ zniak, On the influence of class noise in medical data classification: Treatment using noise filtering methods, Appl. Artif. Intell. 30 (2016) 590 -609.
- [24] J.A. S ´ aez, M. Galar, J. Luengo, F. Herrera, Tackling the problem of classification with noisy data using multiple classifier systems: Analysis of the performance and robustness, Inf. Sci. 247 (2013) 1 -20.
- [25] G. Visani, E. Bagli, F. Chesani, A. Poluzzi, D. Capuzzo, Statistical stability indices for LIME: Obtaining reliable explanations for machine learning models, J. Oper. Res. Soc. 73 (2022) 91 -101.
- [26] D.L. Wilson, Asymptotic properties of nearest neighbor rules using edited data, IEEE Trans. Syst. Man Cybern. 2 (1972) 408 -421.
- [27] I. Tomek, An experiment with the edited nearest-neighbor rule, IEEE Trans. Syst. Man Cybern. 6 (1976) 448 -452.
- [28] J.S. S ´ anchez, R. Barandela, A.I. Marqu ´ es, R. Alejo, J. Badenas, Analysis of new techniques to obtain quality training sets, Pattern Recognit. Lett. 24 (2003) 1015 -1022.
- [29] B. Sluban, N. Lavra ˇ c, Relating ensemble diversity and performance: A study in class noise detection, Neurocomputing 160 (2015) 120 -131.
- [30] D.F. Nettleton, A. Orriols-Puig, A. Fornells, A study of the effect of different types of noise on the precision of supervised learning techniques, Artif. Intell. Rev. 33 (2010) 275 -306.
- [31] J.A. S ´ aez, M. Galar, J. Luengo, F. Herrera, INFFC: an iterative class noise filter based on the fusion of classifiers with noise sensitivity control, Inf. Fusion 27 (2016) 19 -32.
- [32] T.M. Khoshgoftaar, P. Rebours, Improving software quality prediction by noise filtering techniques, J. Comput. Sci. Technol. 22 (2007) 387 -396.
- [33] X.Q. Zhu, X.D. Wu, Class noise vs. attribute noise: a quantitative study, Artif. Intell. Rev. 22 (2004) 177 -210.
- [34] M. Sabzevari, G. Martínez-Mu ˜ noz, A. Su ´ arez, A two-stage ensemble method for the detection of class-label noise, Neurocomputing 275 (2018) 2374 -2383.
- [35] V. Jaiswal, A. Negi, T. Pal, A review on current advances in machine learning based diabetes prediction, Prim. Care Diabetes 15 (2021) 435 -443.
- [36] H. Hakkoum, A. Idri, I. Abnane, Global and local interpretability techniques of supervised machine learning black box models for numerical medical data, Eng. Appl. Artif. Intell. 131 (2024) 107829.
- [37] A.S. Abdullah, S. Selvakumar, Assessment of the risk factors for type II diabetes using an improved combination of particle swarm optimization and decision trees by evaluation with Fisher ' s linear discriminant analysis, Soft Comput 23 (2019) 9995 -10017.
- [38] S. Suyanto, S. Meliana, T. Wahyuningrum, S. Khomsah, A new nearest neighborbased framework for diabetes detection, Expert Syst. Appl. 199 (2022) 116857.
- [39] Y.L. Wu, Q.J. Zhang, Y.Q. Hu, W.K. Sun, X.Y. Zhang, H.M. Zhu, S.Y. Li, Novel binary logistic regression model based on feature transformation of XGBoost for type 2 diabetes mellitus prediction in healthcare systems, Future Gener. Comput. Syst. 129 (2022) 1 -12.
- [40] D. Gunning, M. Stefik, J. Choi, T. Miller, S. Stumpf, G.Z. Yang, XAI -Explainable artificial intelligence, Sci. Robot. 4 (2019) eaay7120.
- [41] F. Curia, Explainable and transparency machine learning approach to predict diabetes develop, Health Technol 13 (2023) 769 -780.

- [42] I. Uysal, Interpretable diabetes prediction using XAI in healthcare application, J. Multidiscip. Dev. 8 (2023) 20 -38.
- [43] Y.C. Wang, T.C.T. Chen, M.C. Chiu, A systematic approach to enhance the explainability of artificial intelligence in healthcare with application to diagnosis of diabetes, Healthc. Anal. 3 (2023) 100183.
- [44] L.P. Joseph, E.A. Joseph, R. Prasad, Explainable diabetes classification using hybrid Bayesian-optimized TabNet architecture, Comput. Biol. Med. 151 (2022) 106178.
- [45] F.D. Martino, F. Delmastro, Explainable AI for clinical and remote health applications: a survey on tabular and time series data, Artif. Intell. Rev. 56 (2023) 5261 -5315.
- [46] H.B. Kibria, M. Nahiduzzaman, F.M.O. Goni, M. Ahsan, J. Haider, An ensemble approach for the prediction of diabetes mellitus using a soft voting classifier with an explainable AI, Sensors 22 (2022) 7268.
- [47] G. Annuzzi, A. Apicella, P. Arpaia, L. Bozzetto, S. Criscuolo, E.D. Benedetto, M. Pesola, R. Prevete, Exploring nutritional influence on blood glucose forecasting for type 1 diabetes using explainable AI, IEEE J. Biomed. Health Inform. 28 (2024) 3123 -3133.
- [48] C. Moreira, Y.L. Chou, M. Velmurugan, C. Ouyang, R. Sindhgatta, P. Bruza, LINDABN: an interpretable probabilistic approach for demystifying black-box predictive models, Decis. Support Syst. 150 (2021) 113561.
- [49] J. Luengo, S.O. Shim, S. Alshomrani, A. Altalhi, F. Herrera, CNC-NOS: class noise cleaning by ensemble filtering and noise scoring, Knowl.-Based Syst 140 (2018) 27 -49.
- [50] B. Fr ´ enay, M. Verleysen, Classification in the presence of label noise: a survey, IEEE Trans. Neural Netw. Learn. Syst. 25 (2014) 845 -869.
- [51] F. Giampaolo, F. Gatta, E. Prezioso, S. Cuomo, M.C. Zhou, G. Fortino, F. Piccialli, ENCODE-Ensemble neural combination for optimal dimensionality encoding in time-series forecasting, Inf. Fusion 100 (2023) 101918.
- [52] Y.F. Li, L.Z. Guo, Z.H. Zhou, Towards safe weakly supervised learning, IEEE Trans. Pattern Anal. Mach. Intell. 43 (2021) 334 -346.
- [53] L.I. Kuncheva, C.J. Whitaker, Measures of diversity in classifier ensembles and their relationship with the ensemble accuracy, Mach. Learn. 51 (2003) 181 -207.
- [54] S.S. Mao, J.W. Chen, L.C. Jiao, S.P. Gou, R.F. Wang, Maximizing diversity by transformed ensemble learning, Appl. Soft Comput. 82 (2019) 105580.
- [55] G.D. Pelegrina, L.T. Duarte, M. Grabisch, A k-additive Choquet integral-based approach to approximate the SHAP values for local interpretability in machine learning, Artif. Intell. 325 (2023) 104014.
- [56] M.T. Ribeiro, S. Singh, C. Guestrin, Why should I trust you?": explaining the predictions of any classifier, in: Proc. 22nd ACM SIGKDD Int. Conf. Knowl. Discov. Data Min, 2016, pp. 1135 -1144.
- [57] B. Jiao, Y. Guo, D. Gong, Q. Chen, Dynamic ensemble selection for imbalanced data streams with concept drift, IEEE Trans. Neural Netw. Learn. Syst. 35 (2024) 1278 -1291.
- [58] Z. Jiing, W. Ming, S.V. S, Ensemble learning from crowds, IEEE Trans. Knowl. Data Eng. 31 (2019) 1506 -1519.
- [59] H.W. Liu, S.C. Zhang, Noisy data elimination using mutual k-nearest neighbor for classification mining, J. Syst. Softw. 85 (2012) 1067 -1074.
- [60] C.E. Brodley, M.A. Friedl, Identifying mislabeled training data, J. Artif. Intell. Res. 11 (1999) 131 -167.
- [61] P. Jeatrakul, K.W. Wong, C.C. Fung, Data cleaning for classification using misclassification analysis, J. Adv. Comput. Intell. Intell. Informatics 14 (2010) 297 -302.
- [62] Z. Nematzadeh, R. Ibrahim, A. Selamat, Improving class noise detection and classification performance: a new two-filter CNDC model, Appl. Soft Comput. 94 (2020) 106428.
- [63] A. Nicolucci, L. Romeo, M. Bernardini, M. Vespasiani, M.C. Rossi, M. Petrelli, A. Ceriello, P. Di Bartolo, E. Frontoni, G. Vespasiani, Prediction of complications of type 2 diabetes: a machine learning approach, Diabetes Res. Clin. Pract. 190 (2022) 110013.
- [64] M. Zhao, J. Wan, W.Z. Qin, X. Huang, G.D. Chen, X.Y. Zhao, A machine learningbased diagnosis modelling of type 2 diabetes mellitus with environmental metal exposure, Comput. Methods Programs Biomed. 235 (2023) 107537.
