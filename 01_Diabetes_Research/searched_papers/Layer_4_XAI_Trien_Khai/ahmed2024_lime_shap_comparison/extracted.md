<!-- extracted by pdf-extract | engine=docling+ocr | pages=19 | ocr=True | tables=5/5 | density=1.00 | score=100 -->

Received17May 2024,accepted 28June 2024,date of publication3 July 2024,date of current version3 March 2025.

Digital Object Identifier 10.1109/ACCESS.2024.3422319

## A Comparative Analysis of LiME and SHAP Interpreters With Explainable ML-Based Diabetes Predictions

SHAMIM AHMED1, M. SHAMIM KAISER1, (Senior Member, IEEE), MOHAMMAD SHAHADAT HOSSAIN2, (Senior Member, IEEE), AND KARL ANDERSSON3, (Senior Member, IEEE)

2Department ofComputerScience andEngineering,UniversityofChittagong,Chattogram4331,Bangladesh

Institute of InformationTechnology,JahangirnagarUniversity,Savar,Dhaka1342,Bangladesh

3Department ofComputerScience,Electrical andSpace Engineering,LuleaUniversity ofTechnology,93187Skelleftea,Sweden

Corresponding authors:Karl Andersson (karl.andersson@Itu.se) and M.Shamim Kaiser(mskaiser@juniv.edu)

This work was supported by the Institute of Information Technology, Jahangirnagar University,Savar, Dhaka,Bangladesh.

ABSTRACT Explainable artificial intelligence is beneficial in converting opaque machine learning models intotransparent ones and outlininghoweachonemakesdecisionsinthehealthcareindustry.To comprehend the variables that affect decision-making regarding diabetes prediction that can be accounted for by modelagnostic techniques. In this project, we investigate how to generate local and global explanations for a machine-learning model built on a logistic regression architecture. We trained on 253,680 survey responses from diabetes patients using the explainable AI techniques LIME and SHAP. LIME and SHAP were then validation and testsets.With a discussionoffuturework,the comparative analysis and discussion of various experimentalfindingsbetweenLIME andSHAPareprovided,alongwiththeirstrengths andweaknesses in terms of interpretation. With a high accuracy of 86% on the test set, we used LR architecture with a spatial attention mechanism, demonstrating the possibility of merging machine learning and explainable AI toimprovediabetesprediction,diagnosis,andtreatment.Wealsofocusonvariousapplications,difficulties, and probablefuture directions of machine learningmodelsforLIME andSHAPinterpreters.

INDEX TERMS 5Artificial intelligence, diabetes prediction, healthcare, interpretability, LIME, machine learning,medicine,SHAP,XAI.

## 1.INTRODUCTION

Machine Learning is becoming increasingly popular in the medical and health sciences (ML). Tonekaboni et al. [1]investigated"what clinicians desire"in the context of guaranteeing confidence in human-AI collaboration. They understand that for clinicians, even having incredibly accurate ML models is insufficient;for instance,a single number like classification accuracy does not provide context for how the result has arrived at or depthfor the model's

The associate editor coordinating the review of this manuscript and approving it for publicationwas Tony Thomas.

applicability [2]. The discipline of medicine necessitates clarityduetothebrittlenessofthedata.

One of the most prevalent diseases in the world,diabetes is a leading cause of death and disability and is becoming more and more prevalent, particularly in developing countries. There are 382millionindividuals globally who areimpacted [3]. More than 75% of patients have Type 2 diabetes, and the number of T2D patients is increasing every year, whichisa significant source of worryforWHO.Some organisations are making great efforts to stop the tide by creating awareness programs, healthcare systems, cuttingedge diagnostic techniques, and improved medications, among other things.For diabetestobeeffectivelycontrolled,

early and precise detection is essential. On the other side, thedevelopment ofmachinelearningtechniques solvesthis criticalproblem.Machinelearningalgorithms areapotential method for detecting diseases.Inrecentyears,numerous Machine Learning (ML) or Data Mining techniques have been applied to predict diabetes [4]. A decision-making process can be more effective by adopting data mining, which gathers information or features from data [4]. Examples of machinelearningmethodsincludeSupportVectorMachine (SVM),Random Forest, Decision Tree (DT),Logistic Regression, K-Nearest Neighbor (KNN), Artificial Neural Network (ANN), Nave Bays (NB) Classifier, and others [5], [6].

Arecent researchareainAIis calledExplainable Artificial Intelligence (XAI）(AI). XAI may respond to more questions and describe how AI reached a particular conclusion.In critical applications wheretrust and openness areessential,such asthemilitary,healthcare,lawand order, and autonomous driving cars, among others,explainability is crucial.NumerousXAIstrategieshavebeencreatedthusfar with this objective in mind.

Amachinelearning model's performance andability toproduceunderstandable andexplicable predictions are correlated.One can consider"black-box"techniques such as deep learning and ensembles [7], [8], [9], [10]. Conversely, the so-called "white-box" or "glass-box"models yield readily understandable outcomes; common examples are linear [11] and decision-tree-based [12] models. Compared tothe older models,thelatter are less effective and do not achieve cutting-edge performance,even if they are more straightforward to comprehend anduse.Their low-quality design is the root cause of their subpar performance and ease of comprehension and explanation.Methods that may beused toanymodel tointerpret black-box models. Local interpretable model-agnostic explanations,or LIME, are a well-known interpretability strategy for black-box models. It was initially defined in [13]. LIME can quickly and effectively assess any prediction score generated by any classifier.Simulated random-sampled data from the surrounding region is created for each input instance and the accompanying prediction. Shapley Additive Explanations (SHAP) is a game-theory-inspired technique for enhancing interpretabilitythatassessestheimportanceofeachattribute for each forecast (SHAP [14]).Three desirable attributes are takenintoconsiderationbySHAPvalues as a singlemeasure of feature importance: consistency, missingness, and local accuracy.

In this work,we utilized the following significant contributions that occur when XAI techniques are applied in machine learning to predict patients' early-stage diabetes using a logistic regression-based model:

- .We construct a machine-learning interpretation model that uses LIME and SHAP tointerpret thepredictions andcomparesLIME andSHAPinterpreterstoaid future researchers in determining which is best for ML interpretersbased on theirchallenge.
- ·We also highlighted some of LIME and SHAP's strengths and drawbacks by creating anMLinterpretationmodelwithLIMEandSHAP,whichwillprovide acomprehensive overviewoftheireasyandsuccessful implementation according to thesituation.
- .WhilebothLIME andSHAParewidely used toexplain model predictions,choosing the rightinterpretability toolsrequiresknowinghoweachperformsinthecontext of diabetespredictiontasks.
- .To improve our understanding of model interpretability in a clinicalsetting and toencourage the use of transparentandreliablepredictivemodelsfor healthcare applications, a comparative analysis of LIME and SHAP interpreterswithexplainablemachinelearning-based diabetespredictionsis presented.

The remaining paper is structured as follows: Related works are shown in Section II. The dataset, suggested methodology, and machine learning model are presented in SectionIMI.LIMEandSHAPinterpretationapproachesare covered inSectionIV.The studyfinisheswith a discussion of problems,applications,and future work in the fifth part.A comparative analysis and discussion of various experimental data are offered, alongwith theirinterpretation.

## II.LITERATUREREVIEW

The word "diabetes,"which creates major issues in both industrialized and developing countries, is well-known to the public today [15]. Pancreatic dysfunction is the primary cause ofdiabetes.Itcanresultinvarioushealthissuessuchas heart and brain vessel problems, pathological destruction of pancreatic beta cells,renal and retinalfailure,coma,weight loss,ulcers,and harmful immune responses [16]. Techniques for Explainable Artificial Intelligence (XAi）Plots of Individual Conditional Expectation(ICE)and SHAPwereused toidentifyandelucidatethemaindeterminantsofmedical insurance premium costs in the dataset [17]. The findings demonstrate that every model generated remarkable results, andthestudy'scontributionswillsupportdecision-makers in the medical insurance market, insurers,and prospective customers in choosing the best plans to suit their requirements. Clinical decision-making in the medical field can be substantially improved using ML-based Clinical Decision Support Systems(CDSS）[18].But for adoption tobe effective,professionalsandstakeholdersmustworktogether anduseperformanceevaluations,hybridintelligence,and external validation. XAI-based methods for diagnosing Alzheimer's disease(AD)have been discussed throughout thepast tenyears.Research questions werecarefully crafted toclassifyAImodelsintovariousconceptualframeworks andtechniques(LIME,SHAP,GradCAM,LRP,etc.)ofXAI. This classification covers a wide range of interpretations, from intrinsic patterns to sophisticated ones,and it extends thereachof localexplanations toaglobalone[19]. To determine if a patient has chronic kidney disease (CKD) or not, authors have employed the XGBoost machine learning classifier.Theyhaveused theSHAPanalysistoillustratehow theFeature affects theMLmodels.Hemoglobin and albumin have been determined to be the main markers for identifying CKDusing SHAP analysis and the BBO algorithm[20]. In this study[21],the authors explore the prediction of chronic kidney disease (CKD) using an explainable artificial intelligence(XAI-basedtechniquethatleveragesclinical features.Area under the curve(AUC）and accuracy were used todetermine thebest model.The impact of the characteristics on the ideal model was furtherillustrated using the SHAP and LIME algorithms.The utilization of SHAP and LIME techniques improves the ML models'interpretability and facilitates physicians' comprehension of the reasoning behind the anticipated results.In recent years,many diabetes prediction algorithms have been developed and published. The authors proposed a machine learning framework [22] inwhichtheycombinedvariousdimensionalityreduction and cross-validation techniques with Linear Discriminant Analysis,Quadratic Discriminant Analysis,Naive Bayes, Gaussian Process Classification, Support Vector Machine, Artificial Neural Network [23],AdaBoost [24],Logistic Regression n [25],Decision Tree [26],and Random Forest methods.Outlier rejection,data normalization,feature selection,K-fold cross-validation,many machine learning classifiers (k-nearest Neighbor,DecisionTrees,RandomForest,AdaBoost,Naive Bayes,and XGBoost),and Multilayer Perceptronwereusedtocreatearobustframeworkfor diabetes prediction [27]. In terms of sensitivity, specificity, false omission rate,diagnostic odds ratio,and AUC,they stated that the assembling classifier outperformed state-ofthe-art findingsby2%.

A method[28]tomore preciselyestimate a patient's degree of risk for diabetes,Models are created utilizing categorization approaches such as Decision Tree,ANN, Naive Bayes,and SVM algorithms. Several techniques are beinginvestigatedtopreventdiabetesanddiabetes-related diseases.The authors of the proposed work[29]employed the Support Vector Machine(SVM）and RandomForest (RF）machine learning methods toestimate therisk of getting diabetes-related disorders. The authors present a diabetes predictionsystem based onMachine Learning (ML) techniques[30].They compared classic machine learning algorithmswithdeeplearningtechniques.Accordingtothe experiment'sfindings,RFpredicts diabetesbetter thanSVM and deep learning approaches. Several machine learning algorithms areusedtopredict diabetes using a datasetcreated from samples from the PIMA Indian Diabetes dataset and the in vivo diabetes dataset. It is heartening to learn that future studiesmayresult ina cost-effectivenoninvasive strategyfor early diabetes detection[4] depending on the data collected or samples examined,as well as the accuracy of their conclusions. Suggests an expert system [31]for reliably determining if a patient has diabetes.Data mining is an essential tool indiabetes researchbecause of its ability toextracthiddeninformationfromthevastamountof diabetes-related data accessible.Thebuilt system[32]targets diabetes risk prediction by utilizing, evaluating, and incorporating specific KDD technique (Knowledge Discovery in Database) components.Feature selection,dataset generation, andvariousSupervisedMLmodelclassificationsareall importantfactors.TheensembleWeightedVotingLRRFsML modelisproposedtoimprovediabetesprediction.The ROCCurve'sAreaUnder theCurve(AUC)is0.884.This experiment appliessix machine-learning algorithms toa patient's medical records dataset. Compares and examines the efficacy and accuracy of relevant algorithms [33]. In this work, the authors [34]show how many symptoms link to thedisordersthatcausediabetesandhowtodetectsuch diseasesearly on.As a consequence,eleven machine learning classification approaches were applied in this study.

In many cases,understanding the reasoning behind a model's predictions is just as important as understanding how accurate the prediction is. As a result, some approaches to aiding usersin deciphering thepredictions of complex models have lately been put forth, albeit it is occasionally hazy how these approaches relate to one another and when oneapproachissuperior toanother.Theauthorsof this study [13] propose LIME, a novel explanation strategy thatbuildsacomprehensiblemodellocallyaroundthe prediction to faithfully and comprehensibly explain any classifier's predictions.In many cases,understanding the model'sreasoningbehindaparticularforecastisjustas important as the prediction's accuracy.SHAP,a unified framework for analyzing predictions, is presented in [15] SHAP [14]. For each prediction, SHAP assigns a significance rating toeachFeature.Theyprovide innovative strateperformance and compatibility with humanintuition.This paper [35] uses decision-making impact analysis to offer a more machine-centric method for evaluating explainability methods'effectivenessondeepneuralnetworks.Theauthors give an overview ofinterpretability approaches and examples ofpracticalmachinelearninginterpretabilityinseveral healthcare settings, including improving the effectiveness of related tohealth[36].A trade-off between an explanation's coherence and adherence to the machine learning model. This [37] is an example. Based on their ground-breaking discovery,theyofferaframeworktooptimizestabilitywhile preserving a certain level of conformance. With OptiLIME, usersmayfreelyselecttheidealadherence-stabilitytrade-off level while viewing the recovered explanation's mathematical features.Theframework[38] allows for a novel way to provide post hoc interpretations of a black-box predictionmodel basedonanextendedframeworkofBayesiannetworksfor a specific prediction,as well as the extraction of a Bayesian network as an approximation of theblack-box model itself. Thegoal of thisstudy[39]istodemonstratehowExplainable totransform Black-Box modelsintoExplainable Tertiary Machine essentialshapedetectorsandlinearmodels.Theyobserved that the sum of integratedgradients acrosstheLIME superpixelsresembles theinterpretablecoefficientsof LIME for pictures for smooth models. By analyzing four different machine learningmodels,the study's authors[49] determined the four most significant biomarkers that impact COVID-19 patients'severity levels.Medical personnel may utilize interpretable machinelearning tointegrateinsightsfrom models with their previousmedical experience toquickly discover theessentialindicatorsinearly（ diagnosis and, possibly, win the race against the pandemic.

## III.PROPOSEDMODEL

The suggested approach is shown in Figure 1 below as a model diagram.The figure shows the progression of the researchdonetocreatethemodel.

Preprocessing is changing data before sending it to an algorithm.Thedatapreparationtechniqueconvertsrawdata into a single,understandable dataset. Before implementing the machine learning model,we do many data preparation tasks, including cleaning, integration, transformation, reduction, and decryption. Following processing, the dataset was divided into two training and testing groups, each containing 80% and 20% of the total. The model is classified, and the outcomesareevaluatedafterdataprocessingisdonefor feature selection. It summarizes the findings, plots the input parameters, and simulates how the inputs and outputs interact. Thebinary categorizationindicatesif a person has diabetes (pre-diabetes or diabetes). This study uses logistic regression (LR)classification topredict the development of diabetes based on input data.

Finally,we developed an explainable machinelearning model that explains our model's predictions using the LIME and SHAP explanation methodologies. Clinicians are significantlybetter off if they can judge using a model with clear explanations. In this study report, we looked at how blackboxexplanatorytechniqueslikeLIME andSHAPwork, outlining the strengths and limitations of each method to help futureresearchersunderstand.

FIGURE1.Theproposedmodelarchitecture ofoursystem.

Layers.XAI aims todetermine a feature's importance in predicting a model's contribution. This paper [40]examines these strategies from a multimodal (text, picture,audio, and video)perspective. The benefits and drawbacks of various tactics andrecommendationsforfurtherresearchhavebeen discussed.The authors showthat post hoc explanation approaches like LIME and SHAP, which rely on input perturbations,are unreliable.They demonstrate how the highly biased (racist) classifiers in their framework may easilyfool widelyusedexplanation techniqueslikeLIME and SHAPintogeneratingerroneous explanations that don't take into account the underlying biases [41].

In the complex ElectronicHealthRecords(EHRs)study, XAI techniques' explanations were compared [42]. To better understand how Squeezenet performs classification, twotools called SHAP and LIME were developed[43]. These resources describe and analyze the categorization process used by Squeezenet. In this paper [44], they developed a prediction model using extreme gradient boosting (XGBoost),compared it to logistic regression (LR）and randomforest (RF),highlighted feature relevance by clinical domains,and employed SHAP for visually interpreted interpretation.The authorsprovideExMed,aframework that lets domain experts executeXAI data analytics without requiring complex programming knowledge. It offers data analytics a wide range of feature attribution approaches for explaining MLclassifications andregressions [45] In the publication [46]，multiple interpretable machine learning approaches are shown for understanding aspects influencing decision-makingindiabetesprediction that can be explained utilizing model agnostic methodologies. In this study[47], XAI approaches for COVID-19 classification models are proposed, developed, and compared. The results demonstrate that by providing physicians with more detailed informationfromtheresultsof thelearnedXAImodels, quantitative andqualitativevisualizations can aid clinicians in understanding and assist inimproved decision-making. The initial theoretical analysis of LIME images [48]. They demonstrated that the supplied explanations arevalid for

TABLE 1.Dataset properties and description.

FIGURE 2.Various attributeplotsforthedataset.

| Properties     | Description                                                                                                                                                                                                                                                                                            |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Datasetname    | diabetes_binary_health_indicators_BRFSS2015                                                                                                                                                                                                                                                            |
| Data types     | conditionsforthediabeticdataset.                                                                                                                                                                                                                                                                       |
| Dataset Source | TheBRFSS is a yearly telephone survey conducted by the CDC on health-related issues.TheKaggle dataset is accessible.                                                                                                                                                                                   |
| Context        | One of the illnesses that are spreading like an epidemic all over the world is diabetes.As does every generation, children, teenagers, young adults, and seniors seem to be affected. Long-term consequences can cause death as well as organ failure, includingliver,kidney,heart,and stomachfailure. |
| Total Rows     | 253681                                                                                                                                                                                                                                                                                                 |
| Total Columns  | 22                                                                                                                                                                                                                                                                                                     |
| Attributes     | Diabetes binary,HighBP,HighChol, CholCheck,BMI,Smoker,Stroke,HeartDisease or Attack,Physical Activity,Fruits and Vegetables,Heavy Alcohol Consumption,AnyHealthcare,NoDoctor'sVisit Cost,General Health,Mental Health,Physical Health,DiffWalk, Sex,Age, Education, and Income.                        |
| Target Level   | Diabetes_binary is a target variable with two classifications. O indicates no diabetes, whereas 1 indicates prediabetes or diabetes.                                                                                                                                                                   |

## A.DATASET

The file diabetes\_binary\_health\_indicators\_BRFSS2015.csv contains 253,680 survey responses to the CDC. There are two categories in the goal variable diabetes binary. O indicates neither diabetes nor prediabetes, but 1 indicates one of thetwo.Thisimbalanceddatasethas21featurevariables. The CDC andPrevention carry out theBehavioral BRFSS, a yearly telephone survey on health. Over 400,000 Americans participate in the survey each year, giving details about their use of preventative services, risky behaviours, and chronic health issues. Since 1984, it has been held every year. Although there is no known cure for diabetes, many people can benefit from lifestyle changes,including decreasing weight, eating healthy, exercising, and seeking medical attention.

For the general population and public health experts, predictivemodelsfor diabetesrisk are essential tools since early diagnosis can result in lifestyle changes and more successfultreatment.Variousfeatureplotsfor our diabetes dataset are shown in Figure 2. Figure 3 shows the heatmap plot illustrating thecharacteristics ofthediabetesdataset. The diabetes dataset's attributes and description are shown in Table 1.

## B.LOGISTICREGRESSIONMLMODEL

The widely used machine learning logistic regression model is utilized for binary classification issues.According to the input features, this supervised learning algorithm creates a decisionboundary todividedatapointsinto twogroups. The following are the primary steps in developing a logistic regression model:

- .Datacollection:Eachsampleinourlabelleddataset comprises a set of input attributes and a matching binary

FIGURE3.Heatmapplotofdiabetes dataset.

result that designates whether it belongs to the class (O or 1).

- .The data preparation:We do the necessary preprocessing procedures, such as filling in blanks,removing outliers,and transformingvariables.
- Train-Test Split: Two subsets, representing 80% and 20% of the total dataset, were generated: test and training sets.The training set creates the logistic regression model,while the test set assesses the model's performance onunobserved data.
- FeatureScaling:Wescaletoensuretheinputattributes are all on the same scale.Standardization(subtracting the meanfrom the standard deviation and dividingbyit) and normalization(scaling data to a range between O and 1)arefrequenttechniques.
- Model Training:Wetrain thelogisticregression model using the training data.Themodeldeterminesthe ideal coefficients(weights）foreachinput characteristic over time.This is accomplished by minimizing a cost function,oftenwith an optimization nprocedurelike gradient descent. Binary cross-entropy loss is the most often used costfunctionforlogisticregression.
- Model Evaluation:Using the test set as our basis, we assess the trained model.Assessment metricssuch as accuracy,precision,recall, and F1 score are frequently usedforbinaryclassification.Thesemetricsshow howeffectivelythemodelclassifies testset instances correctly.
- Prediction:Oncethemodelhasbeentrainedand assessed,predictions may be made using fresh,unused data. The model uses the sigmoid function to determine thelikelihoodofbeingamemberof thepositive

classgiventheinputcharacteristics.Then,adecision boundary is applied to assign classlabels.

In this work,we provide a logistic learning-based ML modelfordiabetes prediction. Logisticregressionisa techniquefordeterminingtheprobabilityofadiscrete outcome given an input variable. The binary output of most logisticregressionmodels canbeeither true orfalseor one oftwootherpotentialvalues.Ananalyticaltechniquefor classification problems is logistic regression,which may be used to establish if a fresh sample is part of a particular group.Logistic regression is a more straightforward and effectivemethodforsolvinglinear andbinaryclassification problems.It is an easy-to-use classification model with linearlyseparable classesthatproduce excellentresults. Table 2 below displays the LR model's Precision, Recall, F1-score, Support, and Accuracy for predicting diabetes.

## where:

- ·P(Y = 1|X）represents the probabilityof the dependent variable Y being 1 given the input variables X1,X2,...,Xn.
- βo,β1,β2,...,βn are the coefficients or parameters of the logistic regressionmodel.
- X1, X2, ..., Xn are the input variables or predictors.
- é is the base of the natural logarithm, approximately equal to 2.71828.

The logistic regression equation linearly combines the input variables using the logistic function, commonly called the sigmoid function.The sigmoidfunctionis appropriate

TABLE2.Showstheprecision,recall,F1-score,support,andaccuracyoftheLRmodelforpredictingdiabetes.

FIGURE 4.Shows the confusion matrix between the actual and predicted labels.

|                        |   Precision |   Recall |   F1-score |   Support |
|------------------------|-------------|----------|------------|-----------|
| 0.0(The targetValue)   |        0.87 |     0.98 |       0.92 |     65376 |
| 1.0 (The target Value) |        0.51 |     0.15 |       0.23 |     10728 |
| The macro avg          |        0.69 |     0.56 |       0.58 |     76104 |
| The weighted avg       |        0.82 |     0.86 |       0.83 |     76104 |
| The accuracy           |             |     0.86 |            |     76104 |

for modelling probabilities since it converts any real-valued integer to a numberbetweenO and 1.

The coefficients βo,β1, β2,..., βn determine the impact of each input variable on the probability of the outcome. By adjustingthese coefficients,logisticregressionestimates thelikelihood of the outcome variablebelonging toa particularclassbased ontheinputvariables.

Figure5 showshow thePrecision-Recall Curve and ROC AUC score of theLR model calculate therank correlation betweenpredictionsandtargetstoshowhoweffective our model is at ranking forecasts so that we may make aninformed choice about thewell-knownprecision/recall conundrum. Figure 4 displays the data as a matrix, with the genuine classes on the Y axis and the anticipated classes on the X axis.

AUC is calculated as theAreaUnder theSensitivity(TPR)(1 -Specificity)(FPR) Curve.

The assessment metrics enable us to evaluate machine learning models'performance when categorizing observations.To assess our model,we employed a variety of assessment measures,including Precision, Recall, F1-score, Sensitivity,Specificity,and AUC.We effectivelypredicted diabetes in patients using our machine learning model using logistic regression based on 86% accuracy on the diabetes dataset.

## IV.LIMEANDSHAPEXPLANATIONTECHNIQUES

The value of modelinterpretabilityin the process of data science.Understanding a model's inner workings is beneficial for several reasons, such as building confidence in the model's predictions, adhering to legal requirements, debugging models, and assuring model safety, among others. LIME and SHAP are both useful resources for model explanation. LIME and SHAP may benefit Naive Bayes, Logistic Regression, Linear Regression, Decision Tree, Random Forest, Gradient Boosted Tree,SVM,Neural Network, and other explanatory machine learning models.

LIME approximates any black box machine learning model with a local, interpretable model to provide individual prediction explanations [13]. Any form of data, including images,text, tabular data,and video,may be used with this technique. LIME can give reasoning in this manner for any supervised learning model. LIME,which computes pertinent characteristics near a specific exceptional example, offers local optimum explanations. LIME is used for text, graphic, and tabular data and is supportive in theXAI space.LIME's primary characteristic is its applicability and extensibility to all important machine-learning disciplines.

FIGURE 5. (a) Shows the AUC curve and (b) shows the recall and precision curve of the LR model.

TABLE 3. Comparing LIME and SHAP interpretation methods across different input domains(image, text,tabular, and sensory data).

| ExplanationStyle                | Explanation Method   | Image   | Text   | Tabular   | Audio   | Sensory data   |
|---------------------------------|----------------------|---------|--------|-----------|---------|----------------|
| Superimposition overtest input  | LIME                 | Yes     | Yes    | Yes       | No      | No             |
| Superimposition over test input | SHAP                 | Yes     | Yes    | Yes       | Yes     | Yes            |

SHAPis a technique for deciphering individual predictions that Lundberg and Lee created using the Shapley values that are theoretically ideal for the game.A cooperative game theorytechniquewith several alluringfeatures isshapley values.Thefeature values of a data instance are coalition members. The average marginal contribution of a feature value overall potential coalitions is known as the Shapley value [14]. Table 3 compares the interpretation techniques used byLIME andSHAP for datafrom variousinput domains, including pictures, text, tabular, and sensory data. Table 4demonstrateshowmachinelearninginterpretability approaches focus on methods that help users understand the justifications for the model's predictions.

InterpretMLis an open-sourcePythonlibrary developed by Nori et al. [50] that incorporates machine learning interpretability techniques into a single package.It is easy to use, adaptable,and canbe used totrainglass-boxinterpretable models that can be used to explain ML models.To help usersseeandassessmodelperformanceforvariousdataset changes, InterpretML offers interactive dashboards with data filtering and cohort formation options. InterpretML focuses on interpretation techniques that help users understand how the model arrived at its predictions.

## A.MODELINTERPRETATIONUSINGLIME

Popular machine learning methods for interpreting models include LIME. It aids in comprehending and elucidating

the predictions provided by sophisticated models,notably those based on artificial intelligence and machine learning. LIME offerslocal explanations byroughly simulating the model's behavior that can around an interesting instance or forecast. LIME is a model-agnostic approach, which may be used with any machine learning model without knowing how it operates inside. It makes it simpler to comprehend and have faith in the predictions provided byAI systems by bridging the gap between sophisticated models and human interpretability.It'simportanttoremember thatLIMEis n properties.

The algorithm takes the complex model f, the instance tobe explained x',the set of interpretable models G,the weighting function Ux', and the complexity penalty term Ω(g) as inputs. It outputs the local approximation f(x') of the complex model f at the instance x'. The LIME algorithm is showninAlgorithm1

The forecast probability of the two classes "O = No diabetes"and "1=Have prediabetes or diabetes"is shown in the figure's leftmost box.The main characteristics with theirboundaryvaluesareshowninthemiddlechart,and the actualcorrespondingfeaturevalueinthe observationrow passed is shown in the right table. This explanation was applied to the dataset's eighth row. We've decided to interpret LIME's forecast inthe 8throw.Thelogisticregression model, model\_logreg, is also passed. LIME may then use predict\_proba to check the prediction findings, allowing it to predict that instance.

TABLE4.Machinelearninginterpretabilityapproachesconcentrateontechniquesthataidusersincomprehendingthereasoningbehind thepredictions made by the model.

| Interpretability Techniques      | Advantages         | Drawbacks   |                                                                                                                   | Model          | Scope        | ClassificationRegression   |     |
|----------------------------------|--------------------|-------------|-------------------------------------------------------------------------------------------------------------------|----------------|--------------|----------------------------|-----|
| LIME                             | Plug and based     | play        | It is discovered that the ensuing ex- planations are unstable. The rank- ing does not consider featurere- liance. | Model Agnostic | Local        | Yes                        | Yes |
| SHAP (Kernel SHAP and Tree SHAP) | Optimized speed up | for         | Differentexplanationsresult from little perturbations that do not mod- ify the prediction.                        | Model Agnostic | Local Global | Yes                        | Yes |

FIGURE6.UsingLIMEtogenerateanexplanationforpredictionwithtenfeaturestointerpretLIME'sforecastinthe8throw.LIMEhas giventhepredictionlikelihoodasfollows:nodiabeteswithaprobabilityofo.74andprediabetesordiabeteswithaprobabilityof0.26.

o.02

FIGURE7.UsingLIMEtogenerate anexplanationfor predictionwith12featurestointerpretLIME'sforecastinthe1othrow.LIME has given theprediction likelihood asfollows:no diabetes with a probability of o.76 andprediabetes or diabeteswith aprobability of 0.24.

Finally,wedefinethedataset'scharacteristicsandlabels with num features equaling ten and top labels equaling 0.74. LIME has given the prediction likelihood as follows: nodiabeteswithaprobabilityofO.74andprediabetesor diabetes with a probability of 0.26,as seen in Figure 6. The following are the rules: GenHlth &gt; 3.00, HighBP &lt;= 1.00,HighChol &lt;= 1.00, BMI &gt;31.0, and so on are on the negative side(left),and Age &lt;= 6.00,NoDocbcCost &gt; 0.00, and Fruits &lt;= 1.o0 and so on are on the positive side(right)aswell.Figure 7illustrateshow tounderstand LIME's forecast inthe10th row byusing 12 attributes toexplain theprediction.Nodiabeteshasaprobabilityof 0.76,but prediabetes or diabetes has a probability of 0.24, according toLIME's predictionlikelihood.

## B.MODELINTERPRETATIONUSINGSHAP

Another popular machine learning model interpretation method is SHAP(SHapley Additive ExPlanations).SHAP gives characteristics relevance ratings based onhow much they contributed to the prediction, giving reasons for specific Algorithm 1 LIME (LocalInterpretable Model-Agnostic Explanations)

FIGURE8.The average absoluteShapley value isused to gauge the significance of the SHAPcharacteristic.Themostsignificantfactor,highbloodpressure,increased the likelihood of having absolute diabetes by an average of 6.4percentage points(0.064 on the X-axis).

## Require:

- f : Complex model to be explained
- x':Instance to be explained
- G:Set of interpretable models
- Jxv:Weighting function
- Ω(g): Complexity penalty term

## Ensure:

f(x'): Local approximation of f at x'

- 0: procedure LIME f,x',G,πx',Ω(g)
- 1: X' &lt; Generate neighborhood around x'
- 2: W ← Jx(X)
- 4: f(x') ←g(x′)
- 3: g &lt; arg mingeG Z(x,y)exi w(x, y) · L(f , g, x, y) + S2(g)
- 5: return f(x')
- 5: end procedure=0

forecasts.Thefoundation of SHAP is cooperativegame theory, more precisely, Shapley values, which measure the worth of each player's participation in a collaborative game. SHAP may be used in various linear, tree-based, and deep-learning models.It makes a flexible, model-neutral interpretability techniquepossible.

The algorithm takes the model f to be explained and the instance x to be explained as inputs.It outputs the SHAP values Φ for each Feature, representing the contribution of each Feature to the prediction for the instance x.The SHAP algorithm is shown in Algorithm 2

## Algorithm 2 SHAP (SHapley Additive exPlanations)

## Require:

- f : Model to be explained
- x:Instance to be explained

## Ensure:

- Φ:SHAPvaluesfor eachfeature
- O:procedure SHAP (f,x)
- 1: Initialize Φ as an empty vector for each feature j in x do end

Sample K background instances Z1, Z2, ...,ZK

- 2: Compute the Shapley value Φ; for feature j:
- = [f(zπ=k,xπ)-f(zπ,xπ)

5:

- 5: Append Φ; to Φ
- 6: return Φ
- 6: end procedure=0

It's crucial to remember that interpreting complicated models is a current area of study, and depending on the particular model and dataset, different interpretation techniques-like LIME and SHAP-may provide different findings. Figure 8 shows the importance of the SHAP feature for trained machine learning models before predicting diabetes that average impact on model output. HighBP was the most crucial feature,which changed the probability of predisposed absolute diabetes by an average of 6.4 percentage points (O.064 on the X-axis). GenHlth was the second most important feature, which changed the probability of

-0.06148

-0.01148

Income = 3

higher lower

f(x)

0.03).03852

BMI = 40

HighBP = 1

GenHlth=5

SHAP value (impact on model output)

FIGURE9.Lesshighblood pressure lowers therisk ofdiabetes,but more highblood pressureraises thatrisk,andso on.All effects describe thebehaviour of themodel and itsimpactonoutput.

IS

base value

Age=9

HighChol = 1

FIGURE1o.TheSHAPForcegraphicidentifiesthecharacteristicsthataffected themodel'sforecastforasingleobservationthemost.Thebinary targetvariable0indicatesnodiabetes,whereas1indicateseitherprediabetesordiabetes.Themodelscoreis0.03.

points (O.06 on the X-axis).An alternative to the significance of permutationcharacteristicsis therelevance ofSHAPfeatures.Both importance measurements differ significantly in thefollowingways:The deteriorationinmodel performance determines the applicability of the permutation feature. The sizeoffeatureattributionsisthefoundationoftheSHAP algorithm. Although the feature significance plot is helpful, it offers no additional details.

The relevance of traits and their impacts are combined in the summary plot shown in Figure 9. Every point on the summaryplot denotes aShapleyvalueforboth aninstance and a feature.Whereas theShapley value defines the position on the x-axis,the feature determines the placement on the yaxis. The colour indicates the attribute's value, ranging from low tohigh.The Shapley value distributionforeachfeature is indicated by jittering overlapping dots in the direction of the y-axis. The qualities are presented in order of relevance.

Theforce plot shown in Figure 10 and Figure 11 illustrates how the qualities affect the model's ability topredict an observation.It is appropriate tobe able to explain to someone how our model cametothe conclusions it didfor a particular observation.Diabetes\_binary is a binary targetvariable with two classifications. O indicates that you do not have diabetes, and 1 suggests prediabetes or diabetes. The model's score for this observation is Bold 0.03 in the graph above.0 for the low score model and 1 for the high score model, respectively. Redindicatesfeaturesthatboostedthemodelscore,and blueindicatesfeaturesthat decreased it.Thesefeatureswere essential in developing the forecast for this observation, and they are depicted in red and blue,respectively.The closer the feature was to the red-blue line, the more of an impact it had onthescore,and thesizeof thebar reflects this.

A list of the colour map's two hues, the first for positive SHAPvaluessuchasHighBPandGenHlth,andthesecond fornegativeSHAPvaluessuchasHighBP.Variousoptions are available, such as sample order by similarity,sample order by outputvalue,etc.

## C.EVALUATIONMETRICSOFLIMEANDSHAP

Wehave used several measures and factors toassesshow wellLIMEandSHAPwork asexplainabilitytechniques for our model. First, fidelity: fidelity gauges how accurately themethod'sexplanationcapturesthebehaviourofthe underlying model. In the context of LIME, faithfulness may be evaluated bycontrasting the predictions madeby the original model with the local surrogate model in the vicinity of the instance under explanation.Similarly, SHAP offers a single indicator of explanation qualityfor all cases. The

FIGURE11.TheSHAPForce mapidentifies thecharacteristics that had thebiggest influence on themodel's predictions.TheSHAPForcefigure illustratessample orderbyoutput valuein(a)andsample orderbysimilarity in(b).

second is stability,which assesses how well the approach explainsphenomenain comparablecases orwhentheinput data is perturbed. Similar explanations for comparable cases shouldbegeneratedviaastableexplanationtechnique. Measuring the variability of explanations while perturbing the instance being explained is one way to evaluate the stability of LIME.Stability is a natural byproductof SHAP because of its mathematical basis in Shapley values. Thirdly, consistency quantifieshow theexplanations alterinresponse to modifications in the data or model. Understanding the resilience of explanations across manymodels or datasets requires a special focus on consistency. Comparing the explanations generated bySHAP or LIMEwhen applied to several models trained on comparable or related datasets is the process of evaluating consistency. Fourth, comprehensibility measures how simple it is for people to comprehend and make sense of the explanations offered by the approach. Evaluating the utility and clarity of the explanations produced by LIME and SHAP might be subjective and entail user research or expert assessments. Overall, quantitative criteria likefidelity,stability,consistency,and qualitative evaluations of comprehensibility are used to assess how well LIME and SHAP perform in explainable artificial intelligence (XAI). When deciding between LIME and SHAP for a certain application,it's also critical to consider the trade-offs between interpretability,computing efficiency, and scalability.

## V.COMPARATIVEANALYSISANDDISCUSSIONS

A.ACOMPARATIVEANALYSISBETWEENLIMEANDSHAP INTERPRETERS

In this section, we give a comparative analysis by applying an interpretive machine learning method to see the many

advantages anddisadvantagesbasedonLIME weights andSHAPvalues todecidewhichmethodwillbebetter understood by researchers for future studies. The merits and disadvantagesof theLIMEandSHAPinterpretationsystems are compared in Table 5.

## B.DISCUSSIONS

For model explanations,SHAP and LIME are two prominent Python modules.This paper explains how to pick between SHAP and LIME and some of the differences.Both systems have their advantages and disadvantages.AlthoughLIME andSHAPgenerateparametersforfeaturecontributionsat the observation level (local interpretation), the algorithms that lead to these conclusions differ.We use an explanatoryMLmethodtolook at thevariousadvantages and disadvantagesbased onLIMEweight andSHAPvalues to determinewhichwayissuperior or whatthedifference istodeterminethecontributionofvariablesatthelocal level.

LIME and SHAP differ substantially in the methodology used to apply weights to the regression linear model. Using the cosine measure, LIME compares the original and altered images.The weightsinSHAP are computed using the Shapley formula. The LIME and SHAP techniques have drawbacks:they do not specify the optimal explanation size, donotconsiderfeaturedependence,andonlyapplytoone prediction class.

Shapley values consider all potential predictions,for example, utilizing all available input combinations in SHAP. SHAP can ensure aspects like compatibility and local accuracy because of this comprehensive methodology. LIME creates a sparselinear modelaroundeachpredictionto

TABLE 5. The table compares the LiME and SHAP interpretation methods with their strengths and weaknesses.

|   SN. | LIME                                                                                                                                                                                                                 | SHAP                                                                                                                                                                              |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     1 | Model-agnostic                                                                                                                                                                                                       | Model-agnostic                                                                                                                                                                    |
|     2 | Locally interpretable                                                                                                                                                                                                | LaJhggHEdq5yKkPJdBXLMoAubyHwAB4ttD                                                                                                                                                |
|     3 | Lack of stability,consistency,and missingness.                                                                                                                                                                       | All three properties (stability, consistency, and missingness) are fulfilled by SHAP.                                                                                             |
|     4 | LIME does not guarantee that eachvariable's contribution will be distributed fairly.                                                                                                                                 | A fair distribution of contribution for each of the variablesis ensured by the Shapley value.                                                                                     |
|     5 | LIME assumes that the local model is linear.                                                                                                                                                                         | SHAP does not have any such assumptions.                                                                                                                                          |
|     6 | A Single prediction explanation.                                                                                                                                                                                     | Entire model (single or variable)explanation                                                                                                                                      |
|     7 | The complexity of a machine learning model makes compre- hension challenging.                                                                                                                                        | An entire machine learning modelis simpleto comprehend.                                                                                                                           |
|     8 | It doesn't produce the best visualizationlook.                                                                                                                                                                       | It produces a great visualization look.                                                                                                                                           |
|     6 | LIME is less widely used and less acceptable.                                                                                                                                                                        | Due to its theoretical guarantees and simplicity, SHAP is widelyused andmaybemoreacceptable.                                                                                      |
|    10 | Local models like LIME do not have contrastive explanations.                                                                                                                                                         | The Shapley value allows for opposing explanations. Instead of using the average forecast from the entire dataset,we may compare a prediction to a subset or just one data point. |
|    11 | Fast and relatively simple.                                                                                                                                                                                          | Slow andrelativelycomplex.                                                                                                                                                        |
|    12 | It requires less computing time.                                                                                                                                                                                     | Calculating the Shapley value takes a long time.                                                                                                                                  |
|    13 | Explanations created with the LIME method use selective explanations of the features.                                                                                                                                | The Shapley value approach always uses all the aspects in an explanation.                                                                                                         |
|    14 | For the top-ranked features,LIME is more stable than SHAP [51].                                                                                                                                                      | When the majority of features are present, SHAP is more stable.                                                                                                                   |
|    15 | Forthe top-ranked characteristics,LIMEis at least astrustwor- thy as SHAP,and both LIME and SHAP are more dependable than MDA.Consequently,LIME is ideal forhuman interpreta- tion of a machine-learning model [51]. | SHAPis just as stable as LIME for the top-ranked features.                                                                                                                        |
|    16 | On the traits with high relevance scores,LIME is more stable thanMDA andSHAP[52].                                                                                                                                    | Regarding the qualities with high relevance scores, SHAP is lessstable thanLIME                                                                                                   |

describehowtheblackboxmodelworksinthatimmediate region.SHAPdemonstrates thatShapleyvalues arethesole assurance of consistency and correctness and thatLIME is a subset of SHAP but lacks the same properties [13].

So,why would anyone use LIME in the first place? Said thatLIMEcalculatesvalues quickly,whereasShapley takes a lengthy time. When trying to preserve beautiful Shapleycharacteristics,theSHAPPythonmoduleassists with this computation difficulty by employing guessing and when wehire a model with SHAP optimization; the result is accurate and dependable.SHAPis currentlynot optimalfor all sorts ofmodels.

SHAPfeatures a tree expeller that works quickly on trees like a gradient-boosted treefromXGBoost and a random forest from sci-kit learn,but it is unacceptably slow for models like k-nearest neighbours,even on tiny datasets. We may also use LIME as an option.LIME uses the same KNN model in real-time and does not require k-means summarization.Regarding assigning values to credit default dynamicsdiscoveredbytheXGBoostalgorithm,dynamics for whichwe sought discriminative power, SHAP values appear superior to LIME weights [14].

LIME relies on the capacity to disrupt samples meaningfully. Use this irritation on a case-by-case basis.For example, it adds random words to each feature in tabular data;in images,it replaces superpixels with an average value or zero; and in text, it eliminates words from the text. Consider any sideeffects of these perplexing tactics inyour data toincrease your trust in the interpretation.

For classificationissues,LIME works withmodelsthat output probability.ModelslikeSVMaren't built with prospective output in mind.This might imply that the explanationsareskewed.SHAPestimatesabaselineor expected value using background datasets.Using a whole datasetfor massive datasets is computationally costly;thus, we must depend on estimations.Thishas ramifications for the explanation's accuracy. SHAP shows how the training datasetestimatesaforecastdeviationfromtheexpectedor baseline value.Depending on the application,calculating the anticipatedvalueusing a portion of the trainingset rather than the entire one may be more helpful.

The authors[48]investigated LIME and found that when large,LIMEexplanationsarecentredaroundalimited that's the number of instances generated. In this lesson, beginnersgointogreater detailabout theshapedetector andlinearmodel.TheydiscoveredalinkbetweenLIME and integrated gradient, another explanatory approach, as a result of this investigation. The explanation provided by LIME is similar to the integrated aggregate gradients on superpixels used in LIME's preprocessing stages. The two main drawbacks of adopting LIME for NLP are that it only offers local interpretability and is unstable,which suggests that various sampling around the same regional data might provide drastically different explanation findings [53].

The authors of present[54]an example whereSHAP successfullyfixestheissue,but LIME'sexplanationviolates local integrity. Even while LIME-Counterfactual (LIME-C) andSHAPCounterfactual(SHAP-C)offer rapid and reliable computing speeds,SEDC (a heuristic best-first search method)is generallymoreeffective[55].Regardingeffectiveness,LIME-CandSHAP-Cdiscoverreasonablecounterfactual explanations,if not always the best ones. On the other hand,SHAP-Cseemstohavetroublewithwildlyunbalanced data. LIME-better C's overall performance makes it seem like a potential alternative to SEDC,which,because of its heuristic search strategy, could not find counterfactuals for severalnonlinearmodels.

The authors assert that theSHAP graphics[42]provide more than simply a forecast in support of what clinicians seek through logic; instead, they give clarity when giving both a local and a global explanation for a problem. Expanding knowledgetothetertiarylevel canraisetrust,support humanexpert reasoning,and increase case deduction rates.All three systems (SHAP, LIME,and Scoped Rules)agree that M-Best is the most critical factor in forecasting a patient's mortality. Still,they differ in selecting secondary or tertiary criteria consistent with current medical knowledge.According to their research [56],explanations (Data + ML Model Score + Explanations） only slightly improve accuracy over Data + MLModel Score butfall short of the accuracy attained in the Data only option.Finally, the analysts determined that LIME was theleastpreferredexplanationtechnique amongthethree explainers examined,possibly due to its lack of explanation diversity.

In the healthcare industry,LIME and SHAP explainers are used to predict diabetes using some recent work on ML and DL-based models on various categories. Explainable artificial eachonemakesdecisionsinthehealthcareindustry.Inthe example of diabetes prediction,the authors present[46] a varietyofinterpretablemachinelearningtechniquesforcomprehending aspects influencing decision-making that might be explained utilizing model agnostic methodologies. In this paper [57], the authors used extreme boosting (XGBoost) to compare andimplementcurrentmodel interpretationtechniques, LIME, SHAP, and permutation feature importance. On the diabetes dataset, an experiment is run to determine the characteristic that has the most significant impact on model output.Accordingtotheexperimentalresults,bloodglucose appears tohave the most impact on the precision of model predictions. The areas and traits in the input photographs that aremost crucialto thepredictionsgeneratedby thedeep learning model may be precisely identified by LIME and SHAP, providing essential insights into how the deeplearning modelmakesdecisions.TheInceptionV3architecturewith a spatial attentionmechanism achieved exceptional accuracy of 97 per cent on the test set, emphasizing the potential of fusingdeeplearningwithunderstandableAItoimprovethe treatmentanddiagnosisofretinoblastomaaspresentedhere [58]. In this work [59], the appropriateness of the two most popular model explainers, LIME and SHAP, for autonomous disease prediction was investigated. Using the early-stage diabetes risk prediction dataset(ESDRPD）and the Pima

Indians diabetes dataset (PIDD), respectively, the proposed model[60]outperformedallbenchmarkedmodelswithhigh accuracy of 92.2% and 99.4%.The XAI results made it abundantlyevident thatInsulin andPolyuriawerethemost significant attributesfor diabetes categorization usingPIDD and ESDRPD.Researchers looked through[61]unprocessed statisticsfromimpoverished nations toidentifydiabetes at an early stage. These datasets were preprocessed, and different classifiers were applied to predict diabetes in patients.After that,SHAPvalueswere examinedtoevaluatehowwell each best classifier performed.As a result, they discovered several essential characteristics that arehighly responsiblefor diabetesdevelopment.

## C.CHALLENGESOFLIMEANDSHAPINTERPRETER MACHINELEARNINGMODEL

LIME and SHAP are popular methods used for interpreting machine learning models. While they are valuable tools for understandingmodelpredictions,theyalsocomewithcertain challenges.Here are some challenges associated withLIME andSHAPinterpreters:

- ·Complexity:BoththeLIMEandSHAPmethodsentail intricate computations and algorithms.Putting these methods into practice can be challenging,especially for people unfamiliar with the area of interpretability in machine learning. Probability theory, game theory, and optimization strategiesmust be thoroughly understood tleties fully.
- .Computational Cost:LIME and SHAP can be computationally expensivefor large datasets and intricate models. These interpreters frequently call for creating numerous perturbed instances and model evaluations, which can considerably slow down theinterpretation process. As the dimensionality and complexity of the input features rise, this challenge becomes more apparent.
- ·Black Box Interpretability:Although LIME and SHAPareintendedtoexplainblack-boxmodels,their interpretations may stillbeproblematicfor non-experts to comprehend.Despiteprovidinglocalfeatureimportance or contributionvalues,it maybe necessaryto have additional explanationtechniques ordomainknowledge to convert these values into actionable insights.
- InterpretabilityTrade-off:Modelfidelityissacrificed for interpretability in bothLIME and SHAP.Interpretable surrogate models created by LIME roughly approximate the behaviour of the original model, whereasfeatureimportancescoresaredeterminedby SHAP using cooperative game theory.These approximationsandfeatureimportance scores might not accuratelyreflect allfacetsof thebehaviour of the original model, which could result in a loss of fidelity.
- High-Dimensional Feature Spaces:LIME and SHAP might have trouble giving clear justifications when dealing with high-dimensional feature spaces.Due to

the curse of dimensionality,the interpretability of the explanations cangetmorechallenging asthenumber of features rises.It may be necessary to use feature selectionor dimensionalityreductiontechniques to interpret modelswith manyinput features to get around this problem.

- .Sensitivity toPerturbationMethods:Creatingperturbed instances around the input data is a critical component of LIME,while SHAP bases its Shapley values on feature permutations.The choice of permutation or perturbationmethod canimpact the stability and consistency of theinterpretations.Some subjectivity and inconsistency may be introduced using different perturbation strategies that result in other explanations.
- InterpretabilityBias:Making assumptions and choosing particular methods for an explanation is necessary when interpreting machine learning models. These decisions might introduce bias intothe process of interpretation,which might result in erroneous interpretations or unfair representations.To ensure that interpretabilitytechniquesdonotreinforceoramplify preexisting biases in the data or model, it is critical to be aware oftheinterpretabilitybias andcarefullyvalidate the methods.

When applying LIME and SHAP interpreters in the context of public health and healthcare, there are specific challenges toconsider.Thesechallengesinclude:

- ·Domain Expertise: Deep domain knowledge is necessary to interpret public health machine learning models.Publichealth issues frequentlyinvolve intricate relationships between numerous factors,making them complex and multifaceted. It is essential to have experts whocomprehend thenuances ofpublichealthdata and the underlying causal mechanisms tointerpret themodel predictions correctly.
- DataQualityandBias:Dataqualityproblems,suchas missing values, measurement errors, or biased sampling, can affect public healthdatasets.These problems may make the models challenging to interpret and resultininaccuratejustifications.Additionally,ifthe interpretations offered by LIME andSHAP are biased, thebiases alreadypresentinthe data maybe amplified or reinforced.
- ·Ethical Considerations: Ethics issues arise when interpreting machine learning models for public health. The interpretations offered by LIME and SHAP might includeprivateinformation orhave other implications for that information.It is essential to take precautions toensure that the interpretation process adheres to privacy laws and standards while still offering helpful informationfor decision-making.
- Generalizability:It isfrequentlynecessaryforpublic health models to generalize well across various populations and settings.LIME and SHAP interpretations, however, are frequently local and may not accurately reflectthemodel'soverallbehaviour.Theseinterpreters
- use in public health applications may be constrained by theinapplicability of their explanations tovarious population groups or geographical regions.
- ComplexityofPublicHealthProblems:Complex interdependencies among biological,social,environmental, and behavioural factors are present in public healthissues.LIMEandSHAPmighthavetrouble fully capturing these complex relationships. The interpretations of thesemethodsmightoversimplifythe complicated nature of public health issues, which might resultinerroneousorincompleteexplanations.
- .CommunicationandStakeholderEngagement: Effective communication withnumerous stakeholders, including policymakers,healthcare workers,and the general public, is necessary for interpreting machine learning models in public health. A significant challenge in public health applications is converting theintricate technicalexplanationsofferedbyLIME andSHAP intoactionableinsights that non-expertscanquickly understand and use.
- Legal and RegulatoryConstraints:Thelegaland regulatoryframeworks that control data sharing,model interpretability, and decision-making apply to public health.TheserulesmustbefollowedwhenLIMEand SHAP interpreters are used,which could make the process more difficult and call for careful thought about moral and legal responsibilities.

WhileLIMEandSHAPcan aidinunderstandingmachine learningmodels in public health,overcoming these obstacles is necessary to ensure the correct interpretation and moral application of these models for formulating public health policiesanddecision-making.Cooperationbetweendata scientists,public health specialists,and policymakers is essential to navigate these challenges successfully.

## D.APPLICATIONSOFLIMEANDSHAPINTERPRETERML MODEL

LIME can be applied in various ways within the field of public health to gain insights and improve theinterpretability of machine learning models. Here are some potential applications of LIME interpreters in public health:

- ·Health Risk Assessment: Understanding the characteristicsorcharacteristicsthatinfluencehealthrisksor outcomes the most can be aided by LIME.For instance, LIME can pinpoint the key elements responsible for the predictions when determining a person's risk of contracting a particular disease or condition.This data may behelpful for targeted interventions and individualizedhealth advice.
- .HealthcareResourceAllocation:LIMEcanshedlight on thevariables that affect how medical resources are used.LIMEcan identify the essentialelements that lead tohigh resource utilization,like hospital readmissions or visits to the emergency room,by interpreting the predictions of machine learning models.Planning for

- capacity, allocating resources, and improving healthcare deliverycan allbenefitfrom this information.
- .FeatureSelectionforEpidemiologicalStudies:When choosing pertinent characteristics or riskfactorsfor epidemiological studies, LIME can be helpful.By examining the predictions produced by machine learning models trained on substantial health datasets,LIME can pinpoint the characteristics most crucial in predicting health outcomes.This can helpresearchers decidewhich relevantfactorstoprioritizeforfurtherstudy.
- .Public Health Interventions:By analyzing the predictionsmadebymodels trained onintervention data, LIME can aid in understanding the efficacy of public health interventions.LIME,for instance, can pinpoint the essential elements necessary forinterventions aimed at particular populations or health behaviours tobe successful. The design and improvement of interventions canbe guided by this information tomaximize their impact.
- .Patient Monitoring and Adherence: The predictions of machinelearningmodels that trackpatient adherence totreatment plans or medication regimens can be interpretedusingLIME.LIMEcanofferinsightsintothe factors that influence adherence predictions, allowing healthcare providers tomodifyinterventions and support plans by thebarriers andfacilitators to adherence.

In public health, the SHAP interpreter may be used in various ways to obtainknowledge and enhance the interpretability of machine learning models. The following aresomepossiblepublichealthusesfortheSHAPinterpreter:

- ·Feature Importance in Disease Risk Prediction: Insights intothe significance of various riskfactors or characteristics inpredicting disease outcomes can be gained from SHAP. Public health researchers can determinetherelativecontributionofeachfeatureto the prediction by applying the SHAP values to machine learning models trained on health data. This knowledge can aid in developing targeted prevention strategies and prioritizinginterventions.
- .UnderstandingHealthDisparities:Understanding the elements causing health disparities among various populationscanbeaidedbySHAP.Researcherscanevaluate the effects of different demographic,socioeconomic, and environmental factors on health outcomesbyusing SHAP values.This information can guide public health policies and interventions to reduce health disparities.
- .InterpretingPredictiveModelsforPublicHealth Interventions: Predictive models are frequently used in public health interventions to aid decision-making. These models can be interpreted using SHAP to determinewhichelementsorinterventionsaffectthe anticipated results most.This information can influence the planning and execution of evidence-based interventions for enhancing population health.
- .Explainable AI in Clinical Decision Support Systems:SHAPcan offer justifications for thepredictions
- made by machine learning models in clinical decision support systems. This increases trust and aids decision-makingby enabling healthcare providers to comprehend therationalebehind themodel'srecommendations.Using SHAP, healthcare professionals and patients can discuss the characteristics underlying the predictions.
- ·FeatureSelectionforHealthRiskAssessment:The choiceofpertinentfeaturesforhealthriskassessment modelscanbeguidedbySHAPvalues.Publichealth researchers can pinpoint the elements thathave the mostsignificantinfluenceonpredictinghealthrisksby evaluating thecontributions ofeachfeature.This can aid inprioritizing data collection efforts and improving the accuracy and effectiveness of risk assessment models.
- HealthcareResourceAllocationandPlanning:SHAP can shed light on the elements that affecthow medical resources are used.SHAP can determine the characteristics that have the most significant influence on resourceallocation,suchashospitalreadmissionrates or healthcare costs,by interpreting the predictions of machine learningmodels.This data can supportefficient planning inpublichealth systems and guide resource allocation strategies.

## E.FUTUREDIRECTIONS

Here are a few potential paths this research may go in the future.Many moreinterpretable MLmethods are available, while the study concentrates on LIME and SHAP.More studiesmightexamineandassesstheefficacyofvarious interpreters,such as TreeInterpreter, Anchors, or RuleFit, in diabetes prediction.This would offer a more thorough knowledgeof thebenefits anddrawbacks ofvariousinterpretable methodologies and their suitabilityfor use with diabetespredictionmodels.

Combining many interpreters might result in more muscular and thoroughexplanations thandependingonone. To develop a more comprehensive understanding of theML model's predictions for diabetes or other diseases, future studiesmightlookattheadvantagesanddisadvantages of combining LIME withSHAP or other interpretable methodologies.Ensembletechniques ormeta-interpretation approaches can be investigated to aggregate the results of manyinterpreterssuccessfully.

The study may have concentrated on interpretable ML methodsinthesetting of straightforwardMLmodels. Understanding the decision-making processes of ML architectures, such as deep learning models or ensemble models, is becoming increasingly difficult.Future research might examine how interpretable methods like LIME,SHAP, or others can be expanded or modified to give meaningful justifications for predictionsproduced by sophisticated ML architectures in illness prediction tasks.

The explanations in the study articlewere probably primarilyintendedfor academics or practitioners.However,itis critical toconsiderend-users whomight lackMLcompetence inreal-worldcircumstances.Futurestudiesshouldlookinto waystodeliveruser-centricexplanationsrelevanttotheneeds and backgrounds of people using diabetes or other illness prediction systems that are intelligible and actionable. This can entail creating interactive tools,infographics, or user interfaces that make it easier to understand MLpredictions forconditionslikediabetes.

The study paper's controlled experiment may have examined LIME and SHAP.Future studies may consider approving and implementing these interpretable methods in healthcare settings.Evaluating thevalueandefficacy of interpretable ML models for diabetes or other illness prediction might entail working with healthcare practitioners,gathering input, andconducting user studies.Considering the privacy and ethical implications of applying ML models in healthcare settingsisessential.

XAI is a popular topic and has been effectively applied in public health and medicine,and a lot of XAI-based researchhasbeen donerecently.A diabetespredictionmodel [62] that is highly effective and easily interpreted.SHAP andLIMEprovideaglobalandlocalexplanationofthe prediction outcomes. The experimental findings show that the eXtreme Gradient Boosting (XGBoost)method offers optimalpredictiveperformance.TheXAImethodologies that havebeen displayed provide significant explanatory informationthataidsinunderstandingdiabetesriskand prediction outcomes bypatients andhealthcare providers. The performance of various machine learning models and the function of explainable artificialintelligence(XAI) approaches are critical [63],which focuses on the early diagnosisandprediction of diabetes.Theeffectiveness of many machine learning models was assessed and contrasted. By analyzing the outputs of the most effective model using XAI techniques, SHAP, and LIME, the model's decisionmaking became more comprehensible. Machine learning methodssosuccessfullyillustratetheearlyidentificationand diagnosis of diabetes.Emphasisis placed on these applied models'explainability and practical applications.

## VI.CONCLUSION

Diabetes is a long-term metabolic disease marked by elevated blood sugar levels (hyperglycemia)brought on byinsufficient insulin synthesis or aninefficient use of insulinbythebody.Itisaglobalhealthconcernthat affectsmillionsofpeopleworldwide.Thediagnosisand treatment of diabetes are significantlyimproved by artificial intelligence and machine learning.Risk Prediction,Early Detection,Image Analysis, Glucose Monitoring, Personalized Treatment,Remote Monitoring, and Support are just afewwaysAIandmachinelearninghelpwith diabetes treatment. It's important to note that while AI and machine learning promise to improve diabetic diagnosis and management, they should complement, rather than replace, healthcare professionals. Medical expertise and human judgment are crucial forinterpretingresults and making informed decisions.

In summary, logistic regression is an excellent machinelearning technique that successfully forecasts the course of diabetes.By combining this algorithm with interpretable modelssuchasLIMEandSHAP,wecangainvaluable insights into thefactors driving the predictions and increase the transparency and trustworthiness of the model. In addition to achieving precise predictions,using LIME and SHAP insightfulinformationabout theunderlying connections between characteristics and the target variable.This combinationof accuracyand interpretabilityis crucialin healthcare,where understanding the reasoning behind predictions is paramount for medical professionals and patients alike.

Wecompare andcontrasttheinterpretablemachine learning-based models LIME and SHAP. For the diabetes prognosis,a complete and understandable framework is providedbylogistic regression withLIME andSHAP interpreters.This permits preciseforecasts and enhances our comprehension of the decision-making processes employed by the model, enabling more well-informed and successful treatments tolower the risk of diabetes.Our suggested model was 86% accurate in predicting diabetes,which hasenormouspotentialtoenhancehealthcareoutcomes andboost trust inmachinelearning applications in the medical industry.WhilebothLIME andSHAParewidely used to explain model predictions,choosing the right interpretabilitytoolsrequiresaknowledgeofhoweach performsinthe context of diabetes predictiontasks. Researcherscanevaluatetheclarityandcomprehensibilityof the explanations produced by each approach by contrasting LIME and SHAP.Clinicians and other stakeholdersmust comprehend the reasoningbehind model predictions to trust and use them appropriately hence this knowledge is crucial.Knowing the methodologicaldifferences between LIME and SHAP in producing explanations might help guidefutureresearchandthecreationofinterpretable machine learning systems. To improve our understanding of model interpretability in a clinical setting and to encourage theuseoftransparentandreliablepredictivemodelsfor healthcare applications, a comparative analysis of LIME and SHAPinterpreterswithexplainablemachinelearning-based diabetespredictionsispresented.Wealsoconcentrateon numerous LIME and SHAP interpreter machine-learning model applications, challenges, and potential future directions.

When comparing LIME and SHAP, it is essential to consider the specific requirements of the analysis and the trade-offs between local and global interpretability. LIME is suitable when focusing on individualpredictions and understanding their particular reasons.It canbe valuable insituationswherepersonalizedinterventionsorexplanations are needed. On the other hand, SHAP is well-suited for gaining a broader understanding of the importance of features and identifying consistent patterns in the dataset. It can help prioritize risk factors and guide population-level interventions.Ultimately,the choice betweenLIME and SHAP depends on the specific use case and the level of interpretabilityrequired.Both methods contributesignificantlyto our understanding of diabeticpredictionmodels andenableinformeddecision-makinginhealthcare.Bycombining the strengths of LIME and SHAP, researchers and practitioners can gain a comprehensiveview of themodel's behaviour, from individual predictions to global feature importance,facilitatingimprovedhealthcareoutcomesand promoting trust in machine learning applications for diabetes prediction.

## REFERENCES

- [1]S.Tonekaboni, S.Joshi,M. D. McCradden,and A.Goldenberg,"What clinicians want:Contextualizingexplainable machine learningfor clinical end use"in Proc.Mach.Learn.Healthcare Conf.,2019,pp.359-380.
- [2]F. Doshi-Velez and B. Kim, "Towards a rigorous science of interpretable machinelearning,"2017,arXiv:1702.08608.
- usingPIMAIndian dataset,"J.Diabetes MetabolicDisorders,vol.19, no.1,pp. 391403,Jun.2020.
- [4]V.C. Bavkar and A.A.Shinde,"Machine learning algorithms for diabetes prediction and neural network method for blood glucose measurement," Indian J. Sci. Technol., vol. 14, no.10, pp.869-880, Mar. 2021.
- [5]M.Rout and A.Kaur,"Prediction of diabetes risk based on machine learning techniques,"inProc.Int.Conf.Intell.Eng.Manage.(ICiEM), Jun.2020,pp.246-251.
- [6]T. Van Steenkiste, D. Deschrijver, and T. Dhaene, "Interpretable ECG beat embedding using disentangled variational auto-encoders,"in Proc. IEEE 32nd Int.Symp. Comput.-Based Med.Syst.(CBMS), Jun.2019, pp. 373-378.
- [7]Y. LeCun, Y. Bengio, and G. Hinton, "Deep learning," Nature, vol. 521, no. 7553,pp. 436-444,2015.
- [8]T. Chen and C. Guestrin,"XGBoost: A scalable tree boosting system," inProc.22ndACMSIGKDDInt.Conf.Knowl.Discovery Data Mining, Aug.2016,pp.785-794.
- [9]A. Liaw and M. Wiener,"Classification and regression by randomForest," R News,vol.2,no.3,pp.18-22,2002.
- [10] R.Polikar,"Ensemble learning"in Ensemble Machine Learning, C.Zhang and Y. Ma, Eds., New York, NY, USA: Springer, 2012, doi: 10.1007/978-1-4419-9326-7\_1.
- [11]S.Weisberg,Applied Linear Regression,vol. 528.Hoboken,NJ,USA: Wiley, 2005.
- [12]S.R.Safavian and D.Landgrebe,"A survey of decision tree classifier methodology"IEEE Trans.Syst.,Man, Cybern.,vol.21,no.3, Pp. 660-674,Aug. 1991.
- [13]M.T. Ribeiro,S.Singh,and C.Guestrin,"Why should I trust you?" in Proc.22nd ACM SIGKDD Int.Conf.Knowl.Discovery Data Mining, Aug. 2016, pp. 1135-1144.
- [14]S. M. Lundberg and S.-I. Lee, "A unified approach to interpreting model predictions,"in Proc. Adv. Neural Inf. Process.Syst.,vol. 30, 2017, Pp. 4768-4777.
- [15] A. Misra,H. Gopalan, R. Jayawardena, A.P. Hills, M. Soares, A.A.Reza-Albarran, and K.L.Ramaiya,"Diabetes in developing countries,"J. Diabetes,vol.11, no.7,pp.522-539, 2019.
- [16]R.Vaishali, R. Sasikala, S.Ramasubbareddy,S.Remya, and S.Nalluri, "Genetic algorithm based feature selection and MOEfuzzy classification algorithm on pima Indians diabetes dataset,"in Proc.Int. Conf. Comput. Netw. Informat.(ICCNI),Oct.2017,pp.1-5.
- [17]U. Orji and E.Ukwandu,"Machine learning for an explainable cost prediction of medical insurance,"Mach.Learn.Appl.,vol. 15,Mar. 2024, Art. no.100516.
- [18] H. C. Cubukcu, D. 1. Topcu, and S.Yenice,"Machine learning-based clinical decision support using laboratory data,"Clin.Chem.Lab.Med. (CCLM),vol.62,no.5,pp.793-823,2023.
- [19]V. Viswan, N. Shaffi, M. Mahmud, K. Subramanian, and F. Hajamohideen, "ExplainableartificialintelligenceinAlzheimer'sdisease classification:A systematic review"Cognit. Comput.,vol.16, no.1,pp.1-44, Jan.2024.
- [20] M.J. Raihan, M.A.-M. Khan, S.-H.Kee, and A.-A.Nahid,"Detection of the chronic kidney disease using XGBoost classifier and explaining the influence of the attributes on the model using SHAP, Sci. Rep., vol. 13, no.1,p. 6263,Apr. 2023.
- [21]S.K. Ghosh and A. H. Khandoker,"Investigation on explainable machine learning models to predict chronic kidney diseases,"Sci. Rep.,vol. 14, no.1,p.3687,Feb.2024.
- [22]M.Maniruzzaman,M.J.Rahman,M.Al-MehediHasan,H.S.Suri, M.M.Abedin,A.El-Baz,and J.S.Suri,"Accurate diabetes risk stratificationusingmachinelearning:Role ofmissingvalue and outliers， J. Med. Syst., vol. 42, no.5,pp.1-17, May 2018.
- [23]A.Reinhardt,"Using neural networks for prediction of the subcellular location of proteins,"Nucleic Acids Res.,vol.26,no.9,pp.2230-2236, May1998.
- arXiv:1312.6086.
- [25]B.P.Tabaei and W.H.Herman,"A multivariate logistic regression equation to screen for diabetes:Development and validation,"Diabetes Care, vol.25,no.11,pp.1999-2003,2002.
- [26]I. Jenhani, N. B. Amor, and Z. Elouedi, "Decision trees as possibilistic classifiers," Int. J. Approx. Reasoning,vol. 48,no.3,pp.784807, Aug.2008.
- [27] Md. K. Hasan, Md. A.Alam, D. Das, E. Hossain, and M. Hasan,"Diabetes prediction using ensembling of different machine learning classifiers, IEEE Access,vol.8,pp.76516-76531,2020.
- [28] M. N. Imtiaz and M. A. Haque, "Predicting type 2 diabetes using machine learningandfeatureselectiontechniques,"inAdvancementofComputer Technology and Its Applications,vol. 3, no.3.Uttar Pradesh,India:HBRP Publication Pvt.Ltd.,2020.
- [29]A.Priyadarshini and J. Aravinth,"Correlation based breast cancer detection using machine learning," in Proc.Int. Conf. Recent Trends Electron.,Inf.,Commun.Technol.(RTEICT),2021,pp.499-504.
- [30]A.Yahyaoui, A. Jamil, J. Rasheed, and M. Yesiltepe, "A decision support system for diabetes predictionusing machine learning and deeplearning techniques,"inProc.1st Int.Informat.Softw.Eng.Conf.(UBMYK),2019, Pp. 14.
- [31] A. Mujumdar and V. Vaidehi, "Diabetes prediction using machine learning algorithms,"Proc.Comput.Sci.,vol.165,pp.292-299,2019.
- [32] N. Fazakis,O.Kocsis, E.Dritsas, S. Alexiou, N. Fakotakis, and K.Moustakas,"Machine learning tools for long-term type 2 diabetes risk prediction,"IEEE Access, vol.9,pp.103737-103757,2021.
- [33]M.A.Sarwar, N.Kamal,W.Hamid, and M.A.Shah,"Prediction of diabetes using machine learning algorithms in healthcare,"in Proc. 24th Int.Conf.Autom.Comput.(ICAC),Sep.2018,pp.1-6.
- [34]M.U.Emon, M.S.Keya,Md.S.Kaiser, Md.A.islam,T. Tanha,and Md.S. Zulfiker,"Primary stage of diabetes prediction using machine learning approaches,"in Proc.Int.Conf. Artif. Intell. Smart Syst.(ICAIS), Mar. 2021, pp. 364367.
- [35]Z. Qiu Lin, M. Javad Shafiee, S. Bochkarev, M. St. Jules, X.Yu Wang, and A.Wong,"Do explanations reflect decisions?A machine-centric arXiv:1910.07387.
- [36]G.Stiglic,P.Kocbek,N.Fijacko,M.Zitnik,K.Verbert, and L.Cilar, "Interpretability of machine learning-based prediction models in healthcare,"Wiley Interdiscipl.Rev.,Data Mining Knowl.Discovery,vol.10, no.5,p.e1379, 2020.
- [37] G.Visani, E.Bagli, and F. Chesani,"OptiLIME:Optimized LIME explanations for diagnostic computer algorithms,"2020,arXiv:2006.05714.
- [38] C.Moreira,Y.-L.Chou,M.Velmurugan,C.Ouyang,R.Sindhgatta, demystifying black-box predictive models,"Decis.Support Syst.,vol.150, Nov. 2021, Art. no. 113561.
- [39]J.Andrew Duell, "A comparative approach to explainable artificial intelligencemethodsinapplicationtohigh-dimensionalelectronichealth records:Examining theusability ofXAI"2021,arXiv:2103.04951.
- [40]P. Gohel,P. Singh,and M.Mohanty,"Explainable AI:Current status and future directions,"2021,arXiv:2107.07045.
- [41]D.Slack,S.Hilgard,E.Jia,S.Singh, and H.Lakkaraju,"Fooling LIME and SHAP: Adversarial attacks on post hoc explanation methods,"in Proc. AAAI/ACM Conf.AI,Ethics,Soc.,Feb.2020,pp.180-186.
- [42]J. Duell, X. Fan,B.Burnett,G.Aarts, and S.-M.Zhou,"A comparison of explanations given by explainable artificial intelligence methods on analysingelectronichealthrecords,"inProc.IEEEEMBSInt.Conf. Biomed. Health Informat.(BHI), 2021,pp.1-4.

- [43]J. H. Ong,K.M.Goh,and L.L. Lim,"Comparative analysis of explainable Pp. 185-190.
- [44]C.-A.Hu, C.-M. Chen, Y.-C. Fang, S.-J. Liang, H.-C.Wang, W.-F. Fang, C.-C. Sheu, W.-C.Perng,K.-Y. Yang,K.-C.Kao, C.-L.Wu, C.-S.Tsai, M.-Y. Lin, and W.-C. Chao, ""Using a machine learning approach to predict mortalityin criticallyillinfluenza patients:Across-sectionalretrospective multicentre study in Taiwan,"BMJ Open,vol.10,no.2,Feb.2020, Art.n0.e033898.
- [45]M.Kapcia,H.Eshkiki,J. Duell,X.Fan, S.Zhou,and B.Mora,"ExMed: An AI tool for experimenting explainable AI techniques on medical data analytics,"in Proc.IEEE 33rd Int.Conf. Tools Artif.Intell.(ICTAI), Nov. 2021, pp. 841-845.
- [47]Q.Ye,J.Xia,and G.Yang,"Explainable AIfor COVID-19 CT classifiers: Aninitialcomparisonstudy，"inProc.IEEE34thInt.Symp.ComputerBased Med.Syst.(CBMS), Jun. 2021,pp.521-526.
- [46]N.Gandhi and S.Mishra,"Explainable AI for healthcare:A study for interpreting diabetes prediction,"in Proc.Mach.Learn.Big Data AnalyticsInt.Conf.Mach.Learn.BigDataAnalytics(ICMLBDA).Cham, Switzerland: Springer, 2022,pp.95-105.
- [48]D. Garreau and D. Mardaoui, "What does lime really see in images?" in Proc.Int.Conf.Mach.Learn.,2021,pp.3620-3629.
- [50]H. Nori, S.Jenkins, P. Koch,and R. Caruana, ""InterpretML:A unified framework for machine learning interpretability,"2019, arXiv:1909.09223.
- [49]H.Wu,W.Ruan,J.Wang,D.Zheng,B.Liu,Y. Geng,X.Chai,J. Chen, K. Li, S. Li, and S. Helal, "Interpretable machine learning for COVID-19: Anempiricalstudyonseveritypredictiontask,"IEEETrans.Artif.Intell., vol. 4, no. 4, pp. 764-777, Aug. 2021.
- [51] X. Man and E.Chan,"The best way to select features?' 2020, arXiv:2005.12483.
- [52]X.Man and E.P.Chan,"The best way to select features?Comparing MDA, LIME,and SHAP"J. Financial Data Sci.,vol. 3,no.1,pp.127-139, Jan. 2021.
- [53]L.G.McCoy,C.T.A.Brenna, S.S.Chen, K.Vold, and S.Das, "Believinginblackboxes:Machinelearningforhealthcare does not need explainability to be evidence-based,J. Clin.Epidemiology,vol.142, Pp. 252-257,Feb. 2022.
- [54]J. He and S.Mazumdar,"Comparing LIME and SHAP using synthetic polygonal data clusters,"Int. J. Infonomics, vol. 14, no.1,pp.2059-2067, Jun.2021.
- [55]Y. Ramon,D.Martens,F.Provost, and T.Evgeniou,"A comparison ofinstance-levelcounterfactualexplanationalgorithmsforbehavioral andtextualdata:SEDC,LIME-C andSHAP-C，"Adv.Data Anal. Classification,vol.14,no.4,pp.801-819,Dec.2020.
- [56]S.Jesus,C.Belem,V. Balayan, J. Bento,P.Saleiro,P.Bizarro,and J. Gama, "How can i choose an explainer?An application-grounded evaluation of post-hoc explanations,"inProc.ACMConf.Fairness,Accountability, Transparency,2021,pp.805-815.
- [58]B.Aldughayfiq, F. Ashfaq, N. Z.Jhanjhi, and M. Humayun, "Explainable AI for retinoblastoma diagnosis:Interpreting deeplearning models with LIME and SHAP,Diagnostics, vol. 13, no.11, p. 1932,Jun. 2023.
- [57]T. A.Assegie, T. Karpagam, R. Mothukuri, R. L. Tulasi, and M. Fentahun Engidaye，"Extraction of humanunderstandableinsight from machine learning model for diabetes prediction,"Bull.Electr. Eng.Informat., vol. 11, no. 2,pp. 1126-1133, Apr. 2022.
- [59] S. Rao, S. Mehta, S. Kulkarni, H. Dalvi, N.Katre, and M. Narvekar, "A study of LIME and SHAP model explainers for autonomous disease predictions,"in Proc.IEEE Bombay Sect.Signature Conf.(IBSSC), Dec. 2022, pp. 1-6.
- [60]L.P. Joseph, E.A.Joseph, and R.Prasad,"Explainable diabetes classification using hybrid Bayesian-optimized TabNet architecture," Comput.Biol.Med.,vol.151,Dec.2022,Art.no.106178.
- [61]N. Nipa, M. H. Riyad, S. Satu, Walliullah, K. C. Howlader, and M. A. Moni, "Clinically adaptablemachine learning model toidentify early appreciable features of diabetes,"Intell. Med.,vol. 4, no.1,pp. 22-32,Feb. 2024.
- [62]Y.Zhao,J.K.Chaw,M.C.Ang,M.M.Daud, and L.Liu,"A diabetespredictionmodelwithvisualizedexplainableartificialintelligence (XAI) technology,"in Advances in Visual Informatics (Lecture Notes in Computer Science), vol. 14322,H. B.Zaman et al.,Eds., Singapore: Springer,2024,doi:10.1007/978-981-99-7339-2\_52.
- [63]H.Guler,D.Avci,M.Ulas,and T. Omma,"Performance comparison of machine learning models powered by SHAP and LIME based explainability techniques on diabetes dataset,"SSRN.[Online].Available: https://ssrn.com/abstract=4713039

SHAMIMAHMEDreceivedtheB.S.andM.S. degreesincomputerscienceandengineeringfrom Dhaka University of Engineering and Technology,Gazipur, Bangladesh,in 2010 and 2013, respectively.He is currently pursuing the Ph.D. degreeininformationtechnologywith theInstitute of Information Technology (IIT),Jahangirnagar University (JU), Savar, Dhaka, Bangladesh. In2011,hewas aLecturer withtheDepartment of Computer Science and Engineering,Dhaka

International University, Dhaka.In 2013,he joined the Department of Computer Science and Engineering,Bangladesh University of Business and Technology,Dhaka,as a Lecturer,where he has been an Assistant Professor, since 2015.His research interests include artificial intelligence, computer vision,machinelearning,deep learning,robotics,digitalimage processing, systems,and networking.

M.SHAMIMKAISER(SeniorMember,IEEE) received the bachelor's and master's degrees in applied physics,electronics,and communication engineeringfromtheUniversityofDhaka,Dhaka, Bangladesh,in2002 and 2004,respectively,and the Ph.D. degree in telecommunication engineering from Asian Institute of Technology (AIT), Pathum Thani,Thailand,in 2010.Since 2011, hehasbeenwith theInstituteofInformationTechnology, Jahangirnagar University, Dhaka,as an

AssistantProfessor,where hebecame anAssociate Professor,in 2015,and a FullProfessor,in2019.Hehas authored more than 250papers in different peer-reviewed journals and conferences. His current research interests include data analytics,machine learning,wireless networks and signal processing,cognitive radio networks,big data and cyber security,and renewable energy.He is a LifeMember of BangladeshElectronicSociety and Bangladesh Physical Society,and a Senior Member of IEICE, Japan. He is also a Volunteer of the IEEE Bangladesh Section and the Founding ChapterChairof theIEEEBangladeshSectionComputerSocietyChapter.

MOHAMMADSHAHADATHOSSAIN(Senior Member, IEEE) received the M.Phil. and Ph.D. degreesincomputationfromtheInstituteof Science and Technology (UMIST),University of Manchester, U.K., in 1999 and 2002,respectively. He is currently a Professor of computer science and engineering with the University of Chittagong, Bangladesh,andaVisitingProfessor withLulea University of Technology, Sweden.His current research interests include e-government, the mod-

eling of risks and uncertainties using evolutionary computingtechniques, the investigation of pragmatic software development tools and methods, information systems in general, and expert systems.

KARLANDERSSON(Senior Member,IEEE) received the M.Sc.degree in computer science andtechnologyfromtheRoyalInstituteof Technology,Stockholm,Sweden,and the Ph.D. degree in mobile systemsfrom Lulea University ofTechnology,Sweden.AfterdoingPostdoctoral Research with the Internet Real-Time Laboratory, Columbia University,NewYork City,NY,USA, andtheNationalInstituteofInformationand Communications Technology,Tokyo,Japan,he is

currentlya Professor in pervasive andmobile computing with Lulea University of Technology.His research interests include green and mobile computing, the Internet of Things,cloud technologies,and information security.
