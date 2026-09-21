<!-- extracted by pdf-extract | engine=docling+ocr | pages=16 | ocr=True | tables=9/9 | density=1.00 | score=100 -->

peunor sa uado maa pide reundosipan

ReceivedApril6,2020,acceptedApril18,2020,dateofpublicationApril23,2020,date ofcurrentversionMay7,2020

Digital Object Identifier10.1109/ACCESS.2020.2989857

## Diabetes Prediction Using Ensembling of Different Machine Learning Classifiers

MD. KAMRUL HASAN1, MD. ASHRAFUL ALAM', DOLA DAS2,

- Department of Electrical and Electronic Engineering,KhulnaUniversity of Engineering &amp;Technology,Khulna 9203,Bangladesh

3Oregon Renewable Energy Center(OREC),Department of Electrical Engineering and Renewable Energy,Oregon Institute of Technology,Klamath Falls, OR 97601, USA

2Department of ComputerScience and Engineering,KhulnaUniversityofEngineering&amp;TechnologyKhulna9203Bangladesh

Corresponding author: Md. Kamrul Hasan (m.k.hasan @ eee.kuet.ac.bd)

ABSTRACT Diabetes, also known as chronic illness, is a group of metabolic diseases due to a high level of sugar in the blood over a long period. The risk factor and severity of diabetes can be reduced significantly if due to the limited number of labeled data and also the presence of outliers (or missing values）in the diabetes datasets. In this literature, we are proposing a robust framework for diabetes prediction where the outlier rejection, filling the missing values, data standardization, feature selection, K-fold cross-validation, and different Machine Learning (ML) classifiers (k-nearest Neighbour, Decision Trees,Random Forest, AdaBoost, Naive Bayes, and XGBoost) and Multilayer Perceptron (MLP) were employed. The weighted ensembling of different ML models is also proposed, in this literature, to improve the prediction of diabetes where the weights are estimated from the corresponding Area Under ROC Curve (AUC) of the ML model. AUC is chosen as the performance metric, which is then maximized during hyperparameter tuning using the grid search technique.All the experiments,in thisliterature,were conducted under the same experimental conditions using the Pima Indian Diabetes Dataset. From all the extensive experiments, our proposed ensembling classifieris thebest performing classifier withthe sensitivity,specificity,false omissionrate, diagnostic odds ratio,and AUC as 0.789,0.934,0.092,66.234,and 0.950 respectively which outperforms the state-of-the-art resultsby 2.00 %inAUC.Ourproposed frameworkfor the diabetes prediction outperforms theother methods discussedin the article.It can alsoprovidebetterresults on thesame datasetwhich can lead to better performance in diabetes prediction. Our source code for diabetes prediction is made publicly available.

:INDEX TERMS 5Diabetes prediction,ensembling classifier,machinelearning,multilayer perceptron, missing values and outliers, Pima Indian Diabetic dataset.

## I.INTRODUCTION

Diabetes is a very familiar word in the present world and crucial challenges in both developed and developing countries[1].Theinsulinhormoneinthebodyproducedby the pancreas allows glucose to pass from the food into the bloodstream.The lack of that hormone due tomalfunctioningofthepancreasformsdiabeteswhichcanresultin coma, renal and retinal failure, pathological destruction of

Theassociateeditor coordinatingthereviewof thismanuscript and approvingitforpublicationwasWeiWei ID

GitHub:https://github.com/kamruleee51/Diabetes-Prediction-UsingMLClassifiers

pancreatic beta cells, cardiovascular dysfunction, cerebral vascular dysfunction, peripheral vascular diseases, sexual dysfunction, joint failure, weight loss, ulcer, and pathogenic effectsonimmunity[2].Researchondiabetespatients demonstrates that diabetes among adults (over 18 years old) has risenfrom4.7%to8.5%in1980to2014respectively and rapidly growing up in second and third world countries [3]. Statistical results in 2017show that 451million people were living with diabetes worldwide,which will increase to 693 million by 2045 [4].Another statistical study in [5] shows the severity of diabetes,where they reported that half a billion people have diabetes worldwide, and the number will increase to 25 % and 51% respectively in 2030 and 2045.

However, there is no long term cure for diabetes, but it can be controlled and prevented if an earlyprediction is accurately possible. The prediction of diabetes is a challenging task, as the distribution of classes for all attributes is not linearly separable as depicted in Fig. 1.

In recent years, plenty of methods have been proposed andpublishedfordiabetesprediction.AMLbasedframework was proposed in [7] where authors implemented the Linear Discriminant Analysis (LDA）[8],Quadratic DiscriminantAnalysis(QDA）[9],NaiveBayes(NB）[1O], Gaussian Process Classification (GPC) [11], Support Vector Machine (SVM) [12],Artificial Neural Network(ANN) [13], sion Tree (DT）[16],and Random Forest(RF）[17]with differentdimensionalityreductionandcross-validationtechniques.They alsoperformedextensiveexperiments onthe outlier rejection and filling missing values for boosting the performance of the ML model,where they were able to obtain the highest possible AUC of 0.930.In[18],authors employed three different ML classifiers such as DT, SVM, andNB toprognosticate thelikelihoodof diabetes with maximum accuracy.They demonstrated that NB is the best performingmodelwiththeAUC of 0.819.TheABand bagging ensemble techniques using J48 (c4.5)-DT, as a base learner and standalone data mining technique (J48),have been studied and implemented in[19] for the classification of diabetes mellitus. The experimental results of them prove that theABensemblemethod is better than bagging and standalone J48-DT. Genetic programming for the prediction of diabetes had proposed in[20] where the framework outperformedascomparedtootherimplementedtechniquesby them. Authors, in [21], employed four ML methods such as DT, ANN,LR,and NB to classify the risk of diabetes mellitus,where they boosted the robustness by bagging and boosting techniques.The experimentalresults show that the RF algorithm gives optimum results among all the employed algorithms.GaussianProcess(GP)-based classification technique was proposed, in [22],using three different kernels (linear, polynomial, and radial basis function) and compared against the traditional LDA,QDA,and NB.The authors alsoperformed extensive experiments tosearchfor thebest cross-validation protocol.Theirexperiments demonstrate that the GP-based classifier with theK10 cross-validation protocol is the best performing classifierfor the diabetes prediction.Althoughtherearenumerousframeworksalreadybeen published, in recent years, still, the improvement requires in theprecisenessandrobustnessfordiabetesprediction.

In this literature, We propose a new pipeline for diabetes prediction from the PIMA Indians Diabetes dataset. Preprocessing, in the proposed pipeline, is the heart of achieving the state-of-the-art result,which consists of outlier rejection, filling missing values,data standardization,feature selection, andK-foldcross-validation.Weconsider themeanvaluein the missing position of attribute rather than median value, asithasamorecentraltendencytowardthemeanofthat attribute distribution.Thefolding of the dataset for cross-fold validation is performed carefully to preserve the percentage of class proportion, as same as in the original dataset. Different ML classifiers (k-nearest Neighbour (k-NN), RF, DT,NB,AB,and XGBoost (XB)） and MLP were implemented in our proposed pipeline. We apply the grid search techniqueforselectingthenumberofhiddenlayers,number of neurons in each hiddenlayer, activation function,neuron initializer, batch size, learning rate, epoch, percentage of dropped neurons, loss function, an optimizer of MLP and hyperparameters of ML models. Extensive experiments are performed on different combinations of preprocessing and MLclassifiersformaximizing theAUC of diabetes prediction under the same experimental conditions and dataset.The bestMLclassifieristhensetasabaselinemodeltoevaluate our proposed classifier quantitatively for the prediction of diabetes precisely. Moreover, we propose an ensembling classifierbythecombinationof theMLmodelsforboosting the diabetes prediction. To ensemble the ML models, softweightedvotingis employed,where the weightfor the individualmodel wasestimated from therespective AUC. TheAUC of theMLmodel is chosenas theweightof that model for voting ensembling rather than accuracy since AUC is unbiased to the class distribution.Extensive experiments on different combinations of theMLmodels are accomplished forsearchingthebestensembleclassifierwherethebest performingpreprocessingfrom the previous experiments is employed.

The organization of the remaining paper is as follows: Section ⅡI presents the dataset, proposed methodology, and evaluation metrics. In section Ill, the different experimental results are reported with the interpretation.Finally, the paper isconcludedwithfutureworksinsectionIV.

## I1.MATERIALSANDMETHODS

Thissectionfocusesonmaterialsandmethodsusedforthis study, in the literature, where the subsections II-A, II-B, and II-C respectively explain the dataset, proposed framework, and hardware &amp; metrics used to evaluate the framework.

## A.DATASET

The ML models were trained and tested on publicly available PIMAIndiansDiabetes(PID)datasetof768femalediabetic patients from the Pima Indian population near Phoenix, Arizona [6]. This dataset consists of 268 diabetic patients (positive）and5o0non-diabeticpatients(negative）witheight different attributes.The descriptions of the attributes and brief statistical summary are shown in Table 1. The Pedigree (Diabetes Pedigree Function) was calculated [6] as in (1).

wherei and j respectively denote therelatives who had developed and NOT developed diabetes. K is the percentage of shared genes by the relatives (K = 0.500 for the parent or full sibling, K = 0.250 for a half-sibling, grandparent, aunt or uncle and K = 0.125 for a half aunt,half-uncle or first cousin).ADM; and ACLj is the age of relatives,in years, at the time of diagnosing and at thelast non-diabetic test respectively.

FIGURE1.Thepopulationdistributionofall attributesinthePIMAIndianDiabetesDataset[6]whereblueandorangecolordistribution respectively denotesnon-diabetes and diabetes class.

TABLE1.Theoverviewof thediabeticpatientcohort.

|   SN | Attributes    | Description                                                    | Mean ± Std     |
|------|---------------|----------------------------------------------------------------|----------------|
|    1 | Pregnant (F1) | Number of times pregnant                                       | 3.85 ± 3.37    |
|    2 | Glucose (F2)  | PlasmaGlucoseConcentrationat2HoursinanOralGlucoseToleranceTest | 120.90 ± 31.97 |
|    3 | Pressure (F3) | Diastolic Blood Pressure (mm Hg)                               | 69.11 ± 19.36  |
|    4 | Triceps (F4)  | Triceps Skin Fold Thickness (mm)                               | 20.54 ± 15.95  |
|    5 | Insulin (F5)  | 2-Hour Serum Insulin (μU/ml)                                   | 79.81 ± 115.24 |
|    6 | BMI (F6)      | Body Mass Index (Weight in kg / (Height in inches)²)           | 32.00 ± 7.88   |
|    7 | Pedigree (F7) | DiabetesPedigree Function                                      | 0.47±0.33      |
|    8 | Age (F8)      | Age in years                                                   | 33.24 ± 11.76  |

## B.PROPOSEDFRAMEWORK

The proposed framework, in this literature, has been illustrated in Fig. 2 where the preprocessing of raw data is the integralstepintheproposedpipeline,as thequalityofdata can drive the classifiers to learn directly.

## 1)PREPROCESSING

In the proposed framework, the preprocessing step includes outlier rejection (P), filling missing values (Q), standardization (R), and feature selection of the attribute which are briefly described asfollows:

The outlier [23] is a markedly deviated observation from other observations.It requires tobe rejectedfrom data distribution as the classifiers areverymuch sensitiveto the data range and distribution of the attributes.The mathematical formulationfor the outlierrejection in this literature can be written as in (2).

(2)

where x is theinstances of the feature vector that lies in ndimensional space, x ∈ Rn. Q1,Q3, and IQR is the first quartile, third quartile, and interquartile range of the attributes respectively, where Q1, Q3, IQR ∈ Rn.

The attributes, after outlier rejection, were processed to fill the missing or null values [24] as they could lead to the wrong prediction for any classifiers. In the proposed framework, the missing or null values were imputed by the mean values of the attributes rather than dropping, which can be formulated as in (3).The imputation with the mean is beneficial as it imputes the continuous data without introducing outliers.

wherexistheinstancesofthefeaturevector thatliesinndimensional space, x E Rn.

The standardization or Z-score normalization is the technique to rescale the attributes for achieving standard normal distributionwithzero mean and unitvariance.The standardization (R), as shown in (4), also reduces the skewness of the data distribution.

where x is the n-dimensional instances of the feature vector, xERn.x∈RnandoERnarethemeanandstandard deviation of the attributes.However, in many ML models such as tree-based models are probably the models,where feature standardization can't provide a guarantee for significant improvement.

FIGURE 2. The proposed block diagram of a robust and automatic diabetes prediction.

The accuracy of the classifiers increases with the increment of the attribute's dimension.However, the performance of the classifiers will tend to reduce when the attribute's dimensionincreases without increasing the samples.Such a scenario,in machinelearning,is referred to as a curse of dimensionality. Due to a curse of dimensionality, the space of the feature becomes sparser and sparser which forces the classifiers to be overfitted by loosing generalizing capability. In this literature, three most commonly used methods for thefeatureselectionnamelyPrincipleComponentAnalysis (PCA)[25],IndependentComponentAnalysis(ICA)[26], and Correlation-based[27]technique were used to compare their performance for the PID dataset. The details algorithm of PCA,ICA and Correlation-based technique are given in Appendix A,Appendix B, and Appendix C respectively.

## 2)CROSS-FOLDVALIDATION

The K-fold Cross-validation (KCV) technique is one of the most widely used approaches by practitioners for model selection and errorestimation of classifiers[28].The pictorial presentation of the data splitting (5-fold cross-validation), used in this literature, is shown in Fig. 3. The PID dataset has partitioned intoK folds.The K-1 folds are used to train and fine-tune the hyperparameters in the inner loop where the grid search algorithm [29] was employed. In the outer loop (K times), the best hyperparameters and the test data were used toevaluate the model.Since thePIDdataset contains an imbalanced positive and negative samples, the stratified KCV [30] has been used to preserve the percentage of samples for each class as same as in the original percentage.The final performance metric was estimated using the equation as in (5).

where M is thefinal performance metric for the classifiers and Pn ∈ R,n = 1,2,...,K is the performance metric for each fold.

## 3)MLMODELANDENSEMBLING

Different ML models such as k-NN [31], DT,AB,RF, NB, and XB [32] have been trained(see Appendix D, Appendix E, Appendix F, Appendix G,Appendix H, and Appendix I respectively）and tested in the proposed framework.The hyperparameters which will tune, in the inner loop, are shown in Table 2. The ensembling of the ML model is the well-known technique toboost the performance using a group of classifiers [33], [34]. In ensembling, the aggregation of the outputfrom different models canimprove theprecision of the prediction. The output from each model, Yj(i = 1,2,3,...,m = 6) ∈ RC assigns C = 2 (either having diabetes, C1 or not, C2) confidence values P; ∈ R(i = 1, 2) C to the unseen test data where P; ∈ [0, 1] and &gt;~ P; = 1. The i=1

weighted aggregation of different MLmodels in thisliterature wasperformedusingtheequationasin(6).

where the weight, W; is the corresponding AUC of that jh classifier. Since we are proposing a weighted soft voting ensemble,we need an imbalanced,as in the PID dataset, unbiased metric as a weight.That is whywe chooseAUC as a weight for the proposed ensembling classifier. The output of the ensembled model, Y E RC has the confidence values Pen ∈ [0, 1]. The final class label of the unseen data, X ∈ Rn from ensembled model will be C; if Pen = max(Y(X)).

## 4)MULTILAYERPERCEPTRON(MLP)

A neural network consists of processing units,called neurons, whereeachneuronisconnectedtootherneuronsbyunidirectional connections of different weights[35].Afeed-forward neural network or MLP used, in this paper, is shown in Fig. 4 s  n   no si n layers. The D-dimensional input vector of any layer of MLP produces N-dimensional output vector, f(x) : RD → RV. The output of each processing unit can be expressed as in (7).

FIGURE 3.The partitioning of the PID dataset for KCV for both thehyperparameters tuning and evaluation.

TABLE 2.DifferentMLmodels with hyperparameterstobe tuned by thegrid search technique in the innerloop.

| ML Models   | hyperparameters                                                                                                                                                                                                                                                                                                                                                               |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| k-NN        | 1）Number of neighbors for queries 2）Computing algorithm for nearest neighbors ·Ball Tree (BT):Node defines a D-dimensional hypersphere or ball .KD Tree (KDT): Leaf node is a D-dimensional point ·Brute:Based on thebrute-force search 3）Leaf size for BT orKDT which depends on the nature of problem 4）Metric (Manhattan distance (Li-norm)orEuclidean distance (L2-norm)) |
| DT          | 1）Measuringfunction:Gini impurity or Entropy 2）The strategy used to choose the split at each node 3）The minimum samples for an internal node 4）The minimum samples for a leaf node.                                                                                                                                                                                           |
| RF          | 1）The trees in the forest. 2）Measuringfunction:Gini impurity orEntropy                                                                                                                                                                                                                                                                                                        |
| AB          | 1）The boosting algorithm (Realboosting or Discrete boosting) 2）Learning rate to shrink the contribution of each classifier 3）The maximum number of estimators to terminate the boosting                                                                                                                                                                                       |
| NB          | 1）Portion of thelargest variance of the attributes                                                                                                                                                                                                                                                                                                                            |
| XB          | 1）Minimum sum of instance weight (Hessian) 2）Minimumlossreductionforfurtherpartitioning on theleaf node 3）Subsample ratio of the training instance 4）Subsample ratio for constructing each tree 5）Maximum tree depth                                                                                                                                                          |

where the xj, wj, b and Φ are the inputs, weights, bias to the neuron and the nonlinear activation function respectively. The parameters of the neuron are updated as in (8) during the training using back-propagation [36] to minimize the error, =ytrue —youtput·

where n is the learning rate,which is the amount at which the weights are updated during the training. However, it is ers (Hm） and neurons (Nm） at each hidden layer as they highly depend on the dataset. The more number of layers and neurons will have more parameters that can not provide any guarantee to have better performance. The more the parameters, the more the samples require in the training dataset. However, in this paper, we are learning those hyperparametersfrom thePIDdataset.The hyperparameters such as the number of hidden layers, number of neurons in each hidden layer, activation function, neuron initializer, batch size, learning rate, epoch, percentage of dropped neurons, loss function, the optimizer will be used in the grid search for optimizing to maximize the AUC.

FIGURE 4.The MLP architecture,with M hidden layers (H) and Nm neurons in Hm layer,for diabetes prediction in the proposed framework.

## C.EVALUATIONMETRICS

The models were implemented using the Python programminglanguagewith differentPython andKeras APIs and the experimentswerecarriedoutona machinerunningWindows10 operating system with the following hardware configuration: Intel? CoreTM i7-7700 HQ CPU @ 2.80 GHz processor with Install memory (RAM): 16.0GB and GeForce GTX 1060 GPU with 6 GB GDDR5 memory.

Allthe extensive experimentswere evaluatedusing several metrics where each metric has a different meaning of evaluation.Theconfusionmatrixof TruePositive(TP),False Positive (FP), False Negative (FN), and True Negative (TN) along with different metrics e.g. Sensitivity (Sn),Specificity (Sp), Precision (Pr), False Omission Rate (FOR), and Diagnostic Odds Ratio (DOR）[37] has been reported. The Sn (the patient having positive symptoms, but erroneously fails to be rejected) and type-I error (the patient having negative symptoms, but detected as positive). Pr, FOR, and DOR have been used to evaluate the percentage of correctly classified diabetes patients having positive conditions, the proportion of theindividuals with a negative test result,for which the true conditionis positive,and the effectiveness ofa diagnostic test respectively.Additionally,theReceiver Operating Characteristics (ROC)with Area Under the ROC Curve (AUC)is also reported to measure how well predictions are ranked, rather than their absolute values.

## III.RESULTSANDDISCUSSION

Thissectionpresents the different extensive experiments with the corresponding results in several subsections.The results for preprocessing and ML model are described in subsections II-A and II-B respectively.The subsections III-C and III-D are dedicated to represent the results for MLP and ensembling classifiers respectively, and the subsection III-E compares the results.

## A.RESULTSFORPREPROCESSING

The class-wise distribution of the attributes (see Fig.1) demonstrates the complexity of distinguishing positive and negative diabetes in the PID dataset. Most of the attributes also have the skewness (positive and negative) and leptokurtic distribution. However, the presence of the outlier introduces the skewness and kurtosis (see Fig. 5 (a))in the attribute's distributionwherethehighkurtosisisanindicatorofheavytails Or outliers in the PID dataset. The presence of the skewness andkurtosiswilltendtounderestimateandoverestimatethe expectedvaluerespectively. The resultfor the outlier rejection(see Fig.5) demonstrates that the skewness of the distributionmovestothezeromeans,whichindicatesthemean andmedianof theattributehave coincidedapproximately (see Fig.5 (b)).The leptokurtic (kurtosis &gt; 3) distribution ofthePIDdatasetalsomovestoamesokurticdistribution (kurtosis =3).The confusion matrix of the correlation (see Fig. 6) presents the result for the outlier rejection and fillingmissingvaluestogether.Thequalitative and quantitative analysis on the Fig.6 (a) and Fig.6 (b) demonstrate that thecorrelationoftheattributewiththetargetoutcomehas improved after applying outlier rejection and filling the missing values where the correlation coefficient,especiallyforthe F3, F4, and F5, have improved significantly. The improved correlation is the beneficiary for the correlation-based feature selection (seeAppendix C).

(b)Afterrejectionof outlier.

F4 attributes(left toright)and the secondrow is forF5,F6,F7,and F8 attributes(left toright)forboth(a)&amp;(b).

FIGURE 6.The confusionmatrixof the attribute's correlation with the outcome for(a)raw and(b)preprocessedPIDdataset.

## B.RESULTSFORMLMODEL

Table3showsthequantitativeresultsfortheselectionofthe best performing preprocessing and ML model where the AUC

withstandarddeviationisreportedforthecomparisonamong them. The summary of each model's capability of achieving thebestAUCfromtheproposedpipeline,withcorresponding best preprocessing and attribute selection algorithm as well as thenumberofselected attributes,hasreportedinTable4. The best-tuned hyperparameters using the grid search are also shown inTable 4.Theinvestigation onTable3provides evidence ofgettingbetterresultsfrom differentmodelswhen we employ suitable preprocessingfor them.

Alltheclassifiersdemonstratetheirrespectivebestresults for outlier rejection and filling missing values when the correlation-basedfeatureselectionis employed(seeTable3 and Table 4). The first two experiments, as shown in Table 3, show that the boosting classifiers(AB&amp;XB）beat all the classifiers inAUC.The ABperforms better for the rawdata (x E R*),and XB performs better when only the outliers are rejected (x E R8) from the PID dataset. The performance of the XB has improved by a 0.6%margin when only the outliers are rejected (P).These two experiments showthatXBisaffectedbytheoutlier,inthePIDdataset, more thanAB,althoughXBhasextremegradientboosting capabilities.There is a possibility of overfitting inXB as it assignsequalweighttoalltheweakbase-learners,whereas AB assigns more weight to the weak base-learners having better performance.The building of a new tree depends on theresidualsoftheprevioustree,wheretheoutlierswillhave much larger residuals than non-outliers.XB does not penalize those residuals as in AB. Moreover, after applying PCA and ICA on outlier rejected data,theNB classifier yieldsbetter performance toAUC byimproving the AUC of all other classifiers (k-NN, DT, and RF),even the boosting classifiers (AB &amp;XB).ThereasoncanclaimthatthePCA andICAreturnthe featurevectorwithmutuallyexclusive anduncorrelatedfeatures. For which, NB performs better than others. However, forcorrelation-basedfeatureselection,theXBoutperforms other classifiers,eventheNBclassifiersforthepreprocessing of P.Sincefeatures from the correlation-based selection are correlatedwiththeoutcomeandarenomoreuncorrelated with each other as inPCA andICA-based feature selection. For which,NBfailstobe awinnerinthisexperiment.

When the missing values arefilled(Q)with the mean rather than rejection along with outlier rejection (P), the classificationperformancehasboostedsignificantly.TheXBhas wonforallthecasesoffeatureselectionwhenboththeP and Q are employed.For P+Q and PCA or ICA,theXB outperforms the NB,where the NB was the best classifier for the process,P and PCA or ICA.The preprocess (P + Q) has more samples comparing the preprocess, P alone, as the sampleswererejectedwhenitwasan outlier ormissed in P alone. For the preprocess (P + Q) and correlation-based featureselection,alltheclassifiersshowtheirtremendous success,astherearenomissedvaluesandoutliers,wherethe RF and XB outperform the state-of-the-art by a O.9 % and 1.6 % margin in AUC respectively.

Further additionof standardizationasapreprocessing couldnotincreasetheperformanceof theclassifiersasit is not always guaranteed to improve the performance. Treebased models are not distance-based models, and hence standardization could not improve theperformance ofmost of the ML models in this literature (see Table 3).Moreover, thestandardizationofthesmallerdatasetwithfewerinstances used in this literature can increase the possibility of losing informationregardingthemeanandstandarddeviationsince thevariabilityisless.

Remarkably,theemployingofcorrelation-basedfeature selectionrather thanemployingPCAandICA-based techniques improves the AUC of all ML models when we apply the processing P and Q.The PCA transformed the higher dimensionalspaceintoalower-dimensionalspacebasedon the orthogonal projections that contain the highest variance. Thehighervariancebetweenthefeatureswillhavelower covariance,whereas the uncorrelated data is only partially independentaccordingtotheICAtheory.Theperformanceof the PCA algorithm depends on the number of PCs are being used,wheretheseparationoftheclassesismorepronounced inthedirectionofsmallervariance.SincetheICAfinds the new predetermined mutually independent components, there is a possibility of losing correlation with the target outcome. Both the PCA and ICA find the new components in an unsupervised technique.For which,there is no guarantee of getting better performance in thePID dataset usingPCA or ICA.On the other hand, the correlation-based feature selectionusesthecorrelationbetweenthefeature and target outcometoselectthefeatures.

From theTable4,it is alsonoticed that most of theclassifiers performed better with 6 attributes comparing 4 or 8 attributes which are F1,F2,F4,F5,F6,and F8. This experiment also shows that the features such as diastolic blood pressure and diabetes pedigree function canbediscarded from the PID dataset for diabetes prediction, as they carry less information of diabetes comparing other features, as in thePIDdataset.Comparing all theMLmodelsinTable3 and Table 4, the XB provides the best performance with AUC (± std.） of 0.946 ± 0.020,as it has extreme gradient boosting capability to minimize the loss when adding new models in parallel.The best performance ofthe diabetes predictionfrom the proposed pipelineusing theXBmodelis achieved when the sum of instance weight in a leaf node less than 5with the tree depth 5.Theminimum loss reduction tomake afurther partition on a leaf node of the tree and the subsample ratio of toconstructthetreewere1.5and0.6respectivelytoobtain thehighestpossibleresultsusingtheXBmodelfromthe proposed pipeline.

## C.RESULTSFORMLP

TheextensiveexperimentswereconductedonthePIDdataset for diabetes prediction to obtain the best MLP architecture. Eight different models of MLP, with 1 ～ 8 hidden layers, were implemented and tested, where the number of neurons was the hyperparameter to select optimum numbers.The experimental results are shown in Fig. 7,where it shows that the MLP architecture of M = 3 hidden layers (H1, H2,and H3）with N1=16,N2=64,and N3=64 neurons was chosen as the best architecture. The addition of morehiddenlayerswithfewersamplesasinthePIDdataset

TABLE 3.The summary of allextensive experiments for the selection of thebest performing preprocessing,feature selectionmethodswith selected attribute numbers,and classifier.Thelastcolumn representsthebestperforming classifierfor anypreprocessing,whereas the underlinedblue color denotesthebest preprocessingfor each classifier.

| Preprocessing   | Algorithm   |   N | k-NN          | DT            | RF            | AB            | NB            | XB            | Winner   |
|-----------------|-------------|-----|---------------|---------------|---------------|---------------|---------------|---------------|----------|
| RawData         | N/A         |   8 | 0.813± 0.034  | 0.790 ± 0.052 | 0.826± 0.035  | 0.831 ± 0.026 | 0.816± 0.027  | 0.828±0.030   | AB       |
| P               | N/A         |   8 | 0.811 ± 0.046 | 0.772 ± 0.056 | 0.827± 0.039  | 0.827± 0.043  | 0.815± 0.030  | 0.834± 0.039  | XB       |
| P               | PCA         |   4 | 0.802± 0.027  | 0.760 ± 0.041 | 0.796 ± 0.056 | 0.794± 0.050  | 0.803±0.040   | 0.795± 0.061  | NB       |
| P               |             |   6 | 0.816 ± 0.004 | 0.784 ± 0.059 | 0.803± 0.037  | 0.810± 0.040  | 0.818± 0.036  | 0.812± 0.048  | NB       |
| P               | ICA         |   4 | 0.801 ± 0.055 | 0.751 ± 0.043 | 0.776 ± 0.035 | 0.780± 0.040  | 0.802±0.039   | 0.790 ± 0.044 | NB       |
| P               |             |   6 | 0.808± 0.037  | 0.754 ± 0.038 | 0.801 ± 0.037 | 0.809 ±0.053  | 0.815±0.038   | 0.811 ± 0.046 | NB       |
| P               | Corr        |   4 | 0.785 ± 0.044 | 0.765 ± 0.060 | 0.763 ± 0.045 | 0.803±0.034   | 0.801 ± 0.029 | 0.807± 0.038  | XB       |
| P               |             |   6 | 0.816± 0.039  | 0.805 ± 0.046 | 0.810 ± 0.041 | 0.837 ± 0.041 | 0.824 ± 0.037 | 0.838± 0.044  | XB       |
| P+Q             | N/A         |   8 | 0.926± 0.022  | 0.899 ± 0.030 | 0.934 ± 0.014 | 0.938±0.016   | 0.869± 0.022  | 0.943 ± 0.022 | XB       |
| P+Q             | PCA         |   4 | 0.912± 0.024  | 0.880 ± 0.021 | 0.915± 0.023  | 0.905 ± 0.022 | 0.867± 0.024  | 0.915 ± 0.019 | XB       |
| P+Q             |             |   6 | 0.913 ± 0.023 | 0.871 ± 0.019 | 0.918± 0.016  | 0.912± 0.017  | 0.869 ± 0.030 | 0.919± 0.015  | XB       |
| P+Q             | ICA         |   4 | 0.923 ± 0.015 | 0.912± 0.019  | 0.927±0.009   | 0.941 ± 0.014 | 0.874 ± 0.02  | 0.943 ± 0.013 | XB       |
| P+Q             |             |   6 | 0.886± 0.023  | 0.883 ± 0.030 | 0.897± 0.025  | 0.891 ± 0.021 | 0.871 ± 0.038 | 0.904 ± 0.020 | XB       |
| P+Q             | Corr        |   4 | 0.923± 0.015  | 0.912± 0.019  | 0.927± 0.009  | 0.941 ± 0.014 | 0.874± 0.020  | 0.943±0.013   | XB       |
| P+Q             |             |   6 | 0.926 ± 0.022 | 0.911 ± 0.007 | 0.939 ± 0.019 | 0.940±0.018   | 0.879 ± 0.025 | 0.946 ± 0.020 | XB       |
| P+Q+R           | N/A         |   8 | 0.912±0.018   | 0.899 ± 0.030 | 0.935± 0.015  | 0.938 ±0.016  | 0.876± 0.024  | 0.943± 0.022  | XB       |
| P+Q+R           | PCA         |   4 | 0.889± 0.039  | 0.880± 0.021  | 0.915 ±0.023  | 0.905 ±0.022  | 0.861± 0.032  | 0.915±0.019   | XB       |
| P+Q+R           |             |   6 | 0.904 ± 0.020 | 0.871 ± 0.019 | 0.918±0.016   | 0.912± 0.017  | 0.872 ± 0.028 | 0.919 ± 0.017 | XB       |
| P+Q+R           | ICA         |   4 | 0.891 ± 0.040 | 0.852± 0.058  | 0.905±0.020   | 0.885± 0.031  | 0.857± 0.034  | 0.904± 0.028  | RF       |
| P+Q+R           |             |   6 | 0.886 ± 0.023 | 0.883 ±0.030  | 0.897±0.025   | 0.891 ± 0.021 | 0.871 ± 0.038 | 0.904 ± 0.020 | XB       |
| P+Q+R           | Corr        |   4 | 0.918 ± 0.013 | 0.912 ± 0.019 | 0.927±0.008   | 0.941 ± 0.014 | 0.875± 0.018  | 0.943± 0.013  | XB       |
| P+Q+R           |             |   6 | 0.922 ± 0.021 | 0.911 ± 0.007 | 0.938 ±0.017  | 0.940± 0.018  | 0.877 ± 0.025 | 0.946 ± 0.020 | XB       |

Note:P: Outlier Rejection,Q:Filling Missing Value,R:Standardization,N:Number of Attributes, and Corr: Correlation-based Feature Selection.

| ML Models   | Best preprocessing                 | Best hyperparameters                                                                 | Performance   |
|-------------|------------------------------------|--------------------------------------------------------------------------------------|---------------|
| k-NN        | P+Q Correlation (n_Attributes = 6) | n_neighbors = 27 leaf_size = 30 algorithm = brute L1-norm (manhattan_distance)       | 0.926 ± 0.022 |
| DT          | P+Q Correlation (n_Attributes = 4) | criterion = gini min_samples_split = 0.1 min_samples_leaf = 1 splitter = best        | 0.912 ± 0.019 |
| RF          | P+Q Correlation (n_Attributes = 6) | criterion = gini n_estimator =100                                                    | 0.939 ± 0.019 |
| AB          | P+Q Correlation (n_Attributes=4)   | algorithm =SAMME.R n_estimator =200 learning_rate= 0.1                               | 0.941 ± 0.014 |
| NB          | P+Q Correlation (n_Attributes = 6) | var_smoothing = 0.01                                                                 | 0.879 ± 0.025 |
| XB          | P+Q Correlation (n_Attributes = 6) | min_child_weight = 5 gamma = 1.5 subsample= 1.0 colssample_bytree =0.6 max_depth = 5 | 0.946±0.020   |

will tend to limit the generalizing capability of the MLP model, as depicted in Fig. 7. The extensive depth in the MLP modelmayalsoleadthemodeltobeoverfittedandoftenhas gradient fading problems due to the limited numbers of data, as in thePIDdataset.

TheresultsonthebestMLParchitecturefordifferentpreprocessing are shown in Table 6, where all the neurons were initialized and activatedby a normal distribution andReLU function[38] respectively.We use the dropout layer[39] by randomly dropping 60 % neurons to tackle the overfitting. We trained our MLPmodel on 200 epochs withrespective learning rate andbatchsizes as O.oo1and8.Theresults inTable6demonstrate that the outliers rejection andfilling missingvaluesdrive theperformanceof theMLPmodelby Note:P: OutlierRejection,Q:FillingMissingValue,R:Standardization,and Corr:Correlation-basedFeature Selection.

TABLE5.ThedifferentMLParchitectureswiththecorrespondingnumberofhiddenlayersandthenumberofneurons.

| DifferentArchitectures   | Number of hiddenlayerswith correspondingneurons       |
|--------------------------|-------------------------------------------------------|
| Architecture-1           | H1ER32                                                |
| Architecture-2           | H1 E R64, H2 E R16                                    |
| Architecture-3           | H1 ER16, H2 E R64, H3 E R64                           |
| Architecture-4           | H1 ER32,H2 E R32,H3 E R16,H4 E R16                    |
| Architecture-5           | H1 ER16,H2 ∈R16,H3ER16,H4 ER16,H5 ∈R32                |
| Architecture-6           | H1 ER32,H2 ER32,H3∈R64,H4 ∈R32,H5 ∈R16,H6 ∈R64        |
| Architecture-7           | H ER16,H2R16,H3∈R16,H4∈R16,H5∈R64,H6R32,HR32          |
| Architecture-8           | H∈R64,H2∈R32,H3∈R64,H4∈R64,H5∈R32,H6∈R16,H∈R32,H8∈R16 |

TABLE 6.The summary of all extensive experiments on the MLPmodel, where all the hyperparameters from the grid search werekept constant throughouttheexperiment.

| Raw Data      | P P+Q         | P P+Q          | P P+Q       | P P+Q        | P P+Q        | P P+Q          | P P+Q          |                |             |             |              |         |             |              | P+Q+R        | P+Q+R          | P+Q+R        | P+Q+R        | P+Q+R          | P+Q+R        | P+Q+R       |
|---------------|---------------|----------------|-------------|--------------|--------------|----------------|----------------|----------------|-------------|-------------|--------------|---------|-------------|--------------|--------------|----------------|--------------|--------------|----------------|--------------|-------------|
| Raw Data      | N/A           | PCA            | PCA         | ICA          | ICA          | Corr           | Corr           | N/A PCA        | N/A PCA     | ICA         | ICA          | Corr    | Corr        | N/A          | N/A          | PCA            | PCA          | ICA          | ICA            | Corr         | Corr        |
| 8             | 8             | 4              | 6           | 4            | 6            | 4              | 6              | 8              | 4           | 6           | 4            | 6       | 4           | 6            | 8            | 4              | 6            | 4            | 6              | 4            | 6           |
| ±0.040 .821 0 | ±0.032 .796 0 | 0.029 H .738 0 | 0.044 770 0 | 0.045 .787 0 | 0.045 .829 0 | 0.051 H .793 0 | 0.045 H .818 0 | 0.019 H .892 0 | 0.029 846 0 | 0.025 + 8 二 | 0.037 + .901 | 0.039 + | .902± 0.020 | 0.013 .890 0 | 0.024 .884 0 | 0.032 H .890 0 | 0.019 H .881 | 0.019 .889 0 | 0.031 H .885 0 | 0.016 H .867 | 0.015 H 884 |

FIGURE7.TheperformanceofdifferentMLParchitecturestoselectthe bestonewiththehighestAuc,wherethebestcorrespondingmodels are shown in Table 5.

a 7.1 % margin in AUC from raw data. Only the preprocess (P)can notimprove theperformance due tofewer samples, as both outliers and missing values are rejected in the process,P. The highest AUC from the MLP model is O.902 with a standard deviation of 0.020 when we perform both the outliers rejection and filling missing values (P + Q). It is also demonstrated that thecorrelation-basedfeatureselectionis betterinthePIDdatasetfor diabetesprediction assimilar to previous experiments on ML models (see subsection III-B). TheICA alsoperformed as same as the correlation-based featureselection,thestandarddeviationforlateroneismuchless thantheformer.Forwhichlater onehaslessinter-foldvariation.Further addition of standardizationwith outliers rejection and filling missing values can not improve the results, as there is a possibility of losing information regarding the mean andstandard deviation due tothelessvariabilityin the PID dataset.

## D.RESULTSFORENSEMBLINGMODEL

Since theMLmodels are ensembledforboosting theperformance of the diabetes prediction, the best preprocessing fromthesubsectionII-BandTable3&amp;Table4areusedin thisexperiment.The combinationof theaboveMLmodels them only the best performing ensemble model with 2,3,4,5, and 6 baseline models are reported in Table 7 with their corresponding results.The combination of AB and XB provides thebestresultsfor diabetespredictionfor the threemetrics out of the five, as shown in Table 7,by beating the other combinations by the 1.20 %, 14.81 %, and 0.90 % margin in Sp, DOR, and AUC respectively. The prevalence independent measure (DOR)of the AB+XB(see Table 7)has a greater value than the other combinations,which is considered to be a very good test [40] for the diabetes prediction. The confusionmatrix andROCcurve ofthebestensemblemodel (AB+XB) are shown in Fig. 8 (a) and Fig. 8 (b) respectively. The fraction of correctly classified patients among all the positive predictions is 84.2%using the combination of AB and XB.From the ROC curve (see Fig. 8 (b)),it is seen that for false-positive rate of 0.066, the probability of getting true-positive rate is 0.788 at the model's accuracy(see the red star point in Fig. 8 (b)).From the ROC curve,it is also observed that theinter-foldvariation of theAUCis alsoless whichproves therobustness of thebestensembling classifier (AB+XB).TheperformanceofAB+XBfordiabetesprediction on the PID datasetis the superior,asboth theAB and XB are the boosting type classifiers,where AB is the sequential boosting and XB is the parallel boosting. The combination of other ML models with the boosting type models (AB &amp; XB) can not predict diabetes as good as the boosting types alone, as shown in Table 7 (2 ～ 5th rows). Although the combination of all the 6 models (see Table 7 (5th row)) beats thebest combination(AB+XB)in twometrics out of five, it has defeated in unbiased measurement (AUC)by a margin of 1.0 %.As a consequence, we can claim that for the diabetes prediction from the PID dataset, the soft weighted voting of

TABLE7.Comparingdifferentensemblingmodelsforselectingthebestclassifier.

| EnsembleModels      | Sn            | Sp            | FOR           | DOR             | AUC           |
|---------------------|---------------|---------------|---------------|-----------------|---------------|
| AB+XB               | 0.789 ± 0.077 | 0.934 ± 0.012 | 0.092± 0.032  | 66.234±33.323   | 0.950 ± 0.021 |
| k-NN+DT+XB          | 0.793 ± 0.064 | 0.920 ± 0.019 | 0.092± 0.026  | 53.614 ± 26.766 | 0.941 ± 0.015 |
| DT+AB+RF+XB         | 0.793 ± 0.057 | 0.922 ± 0.015 | 0.091 ± 0.024 | 50.367± 13.421  | 0.943 ± 0.013 |
| k-NN+DT+RF+XB+NB    | 0.808 ± 0.047 | 0.920 ± 0.013 | 0.086 ± 0.020 | 54.135 ± 20.053 | 0.939 ± 0.016 |
| k-NN+DT+RF+AB+NB+XB | 0.813± 0.052  | 0.920 ± 0.013 | 0.084 ± 0.022 | 57.688± 24.538  | 0.940 ± 0.016 |

1.0

FIGURE 8.(a) Confusion matrix of the highest possible diabetes classification (b) RoC curve of our proposed ensemble model.

TABLE8.Comparingalltheimplementedmodelsfordiabetesprediction

| EnsembleModels   | Sn            | Sp            | FOR           | DOR             | AUC           |
|------------------|---------------|---------------|---------------|-----------------|---------------|
| XB               | 0.768± 0.072  | 0.943 ± 0.016 | 0.100 ± 0.030 | 71.369 ± 41.245 | 0.946 ± 0.020 |
| MLP              | 0.757±0.059   | 0.900 ± 0.045 | 0.107± 0.022  | 32.748± 7.570   | 0.902 ± 0.020 |
| AB+XB            | 0.789 ± 0.077 | 0.934 ± 0.012 | 0.092 ± 0.032 | 66.234± 33.323  | 0.950 ± 0.021 |

serial andparallel boosting classifiersperformsbetter than serial or parallel boosting classifier alone.

## E.RESULTSCOMPARISON

In this subsection, all the three experiments (see subsection II-B, III-C, and III-D) are compared and summarized. Finally, the best experiment is compared with the state-ofthe-art tovalidate our contributions in this literature.

Table 8 demonstrates that the proposed weighted-ensemble of AB and XB produces the best prediction for the three metrics out of the five metrics, whereas performs as a second highest with respect to Sp and prevalence independent measurement (DOR).The proposed ensemble model (AB+XB) yields the best performance concerning Sn, FOR, and AUC by improving the XB by the margin of 2.1 %, 0.8 %,and 0.6 % respectively. It also beats MLP model in Sn, Sp, FOR, and AUC respectively by the margin of 3.2 %, 3.4 %, 1.5 %, and 4.8 %.The ensembling model(AB+XB)improves the true-positive rate compare to the XB model alone, as there is less possibility of miss-classification in the ensembling model.The less FOR values in the ensembling model (see Table 8) demonstrates that negative predictive value is high with less Type II error in the diabetes prediction.Furthermore, it is also observed that the proposed ensembling model (AB+XB)yields thebestperformances for balanced accuracy (average of Sn and Sp) by improving the XB and MLP results by 0.6 % and 3.3 % respectively,when the proposed preprocessing (P+Q and correlation-based feature selection) is employed.As a consequence from the above discussions in subsections III-B,III-C,II-D, and III-E,it can be concluded as follows:

The proposed ensembling classifier (AB+XB） appears better suited for diabetes prediction from the PID dataset.For ensembling,the base classifiers should have a minimum correlationbetween themto achievehigherprecisionin diabetes prediction (see Table 7). The ensembling of two boosting (adaptive(AB)and gradient (XB)) type classifieris the best combination for diabetes prediction.The best combination (AB+XB), along with our proposed preprocessing (P+Q and correlation-basedfeature selection),can achieve tremendous success for diabetes prediction in the PID dataset.

TABLE9.Comparative performance of our proposed method against the state-of-the-art workson the same dataset as shown inTable1.

|   SL# | AuthorsandYear                  | MVIT            | ORT    | FRT         |   NSF | Classifier                | Performance                   |
|-------|---------------------------------|-----------------|--------|-------------|-------|---------------------------|-------------------------------|
|    01 | Li (2014) [41]                  | NA              | NA     | NA          |     8 | Ensembling of SVM,ANN,&NB | Sn:0.583 AUC: Sp:0.868        |
|    02 | M.Pradhan et al.(2015) [20]     | NA              | NA     | NA          |     8 | GPA                       | AUC:- Sn:0.880 Sp:0.900       |
|    03 | A.K. Dewangan et al.(2015) [42] | NA              | NA     | Manual      |     6 | Ensembling of MLP&NB      | AUC:- Sn : 0.641 Sp:0.909     |
|    04 | S.Bashir et al.(2016)[43]       | k-NN impute     | ESD    | NA          |     8 | HM-BagMoov                | AUC:- Sn:0.787 Sp:0.926       |
|    05 | M.Maniruzzaman et al.(2017)[22] | Median          | NA     | NA          |     8 | GPC                       | AUC: Sn:0.918 Sp:0.633        |
|    06 | H.Kaur et al.(2018)[44]         | k-NN impute     | NA     | BWA         |     4 | k-NN                      | AUC:0.920 Sn: Sp:-            |
|    07 | D.Sisodia et al.(2018)[18]      | NA              | NA     | NA          |     8 | Naive Bayes               | AUC:0.819 Sn:0.763 Sp:-       |
|    08 | M.Maniruzzaman et al.(2018) [7] | Groupmedian     | Median | RF          |     4 | RF                        | AUC:0.930 Sn:0.960 Sp : 0.797 |
|    09 | Q. Wang et al.(2019) [45]       | NB method       |        |             |     8 | RF                        | AUC:0.928 Sn:0.854 Sp:        |
|    10 | S.P.Chatrati et al.2020[46]     | NA              |        | NA          |     8 | DA                        | AUC:0.700 Sn:0.720 Sp:760     |
|    11 | OurProposed (2020)              | Attribute'sMean | IQR    | Correlation |     6 | Ensembling of AB&XB       | AUC:0.950 Sn:0.789 Sp:0.934   |

ofSelectedFeature,GPA:Genetic Programming Algorithm,IQR:Interquartile range,BWA:Boruta Wrapper Algorithm,ESD:Extreme Studentized Deviate,DA:Discriminant Analysis,and GPC: Gaussian Process Classification.

From Table 9,itis observed that all the models perform better either in positive or negative diabetes prediction,whereas theproposed model beats them with improved balanced accuracy or AUC or both. The framework proposed in [43], [44] used the k-NN technique to impute the missing values, where the algorithm searches thekth neighbor as a missing value. In such a technique,the new imputed value could be far from the central tendency of the population distribution.The performance in the pipeline (see Table 9) employed in [18], [20], [41], [42], [46]is less as comparing the proposed framework and others in[7],[44], [45]. Those fewer performances clearly indicate the role of outlier rejection and filing missing values in thePIDdataset.The manual feature selection[42] without considering the correlation and covariance with the features and target label is the possible reason for getting lesstrue-positiverates.TheabovediscussionandTable9 confirm that our proposed ensembling classifier (AB+XB) for predicting diabetes is a better diagnosis,with an AUC of 0.950, when the AUC-weighted soft voting and proposed preprocessingpipelinewere employed compared toothers.

## IV.CONCLUSIONANDFUTUREWORK

In this literature,diabetes prediction has been accomplished using the proposed ensemble model from the PID dataset, where the preprocessing plays a crucial role in robust and precise prediction.The quality of the dataset was improved by the proposed preprocessing scheme, where outlier rejection and filling missing values was a core concern.Such Algorithm 1 The Steps of Implementing the PCA-Based Feature Selection Input: The original n-dimensional data, X ∈ Rn with N number of sample and variance threshold, Tvariance Output: The reduced k-dimensional data, Y E Rk N

- 1 Load X ∈ R" and compute it's mean, X =   Xi, i=1

where X ∈ Rn

- 2 Compute the n x n covariance matrix,

- 3 Compute eigen decomposition of Cnxn as PDP-1 , where P ∈ Rn is the matrix of eigen vectors and Dnxn is thediagonalmatrixwitheigenvaluesonthediagonal
- 4Sort the eigenvectors by descending order to choose first k eigen vectors that will have variance ≥ Tvariance and form a new projection matrix, Wnxk
- 5Project data Xinto a newk-dimensional space by Y = WTx, where Y ∈ Rk

a preprocessing can improve the kurtosis and skewness of the attributedistributioninthePIDdataset.Thecorrelation-based attribute selectioncanimprovethecorrelationbetween attribute and target outcome,whereas PCA and ICA care

## Algorithm 2 The Steps of Implementing the ICA-Based FeatureSelection

Input: The original n-dimensional data, X ∈ Rn Output: The reduced k-dimensional data, Y ∈ Rk

- 1 Set non-quadratic nonlinear function, G for the approximation of neg-entropy
- 2InitializeWofW×H=X,whereW,H,and X are the ratios of the sources during mixing, the matrix containing the different components, and the mixed output respectively.
- 3 Perform PCA on X by X = PCA(X) as in IV-A
- 4whileWchanges do
- 5 W = mean(X * G(W · X)) - mean(G'(wT : X)), where G'is thefirst derivative of non-quadratic nonlinear function, G
- W = orthogonalize(W)
- 7 Compute, Y = W · X, where Y ∈ Rk

## Algorithm3TheStepsofImplementing the Correlation-BasedFeatureSelection

Input: The original n-dimensional data, X ∈ Rn and expected outcome,Yr∈R

Output: The reduced k-dimensional data, Y E Rk

- 1 for i≤ n do

- 3 Sort the correlation, rir by descending order to choose first k features for Y ∈ Rk

## Algorithm 4 The Steps of Implementing k-Nearest Neighbour (k-NN)

Input: The n-dimensional data, X e R" and target outcome,Y∈ R

- 1Calculategeometric distances,Dhfork querypoints,

query instance, q = order [47].

- 2 Form a set, S with closest k points

onlytheinter-attributeredundancy.Incaseoftree-based classifier,data standardizationcan not provide anyguarantee toimprovetheperformance.Therobustnessvalidation of the

## Algorithm 5 The Steps of Implementing Decision Tree (DT)

Input: The n-dimensional data, X ∈ Rn and target outcome,Y ∈ R

- 1 Split θ = (j, tm) into Qlef(0) and Qrighr(0) subsets, where θ consisting of a feature, j and threshold, tm

- 2 Compute the impurity at kth node using an impurity function (H),

- 3 Minimise the impurity by selecting the parameters, 0*= argming G(Q,0)
- 4 Repeat the above processes for subsets Qleft(o*) and Qright(0*) until depth reach to Nm &lt; minsamples Or Nm = 1

## Algorithm 6 The Steps of Implementing AdaBoost (AB)

Input: The n-dimensional data, X ∈ Rn with N number of sample and target outcome,Y ∈ R

(diabetes present (C1) or not (C2))

- 1 Initialize weight sample, D(i) = , where

- 2 for t ≤ T(n\_Classifiers) do

Train a weak learner using distribution Dt [48].

- Select a weak hypothesis, ht : Rn → R with low weight error, Et = Pri~D,[ht(xi)≠ Y]
- 5 Choose α = ln() and update, Dt+1(i) = D(i)e-αx mhi(x) ,where i = 1,...,N and zt is the Z.t

normalizationfactor.

- 6 Output posterior probability: P(x) = sign(≥7=1 azh;(x))

XB, MLP, and proposed ensemble classifier was verified by using the 5-fold cross-validation.Hyperparameters of different classifiers candrivethelearning capability of those classifiers, which were optimized using a grid search technique in our proposed framework. The AUC as a weight to build a generic ensembling classifier is better, as it considers more priority to the model having more AUC. Random tree-based classifiersarewellsuitedforthedatatobeclassifiedwhen

## Algorithm 7 The Steps of Implementing Random Forest (RF)

Input: The n-dimensional data, X ∈ R" and target outcome,Y ∈ R

- 1 for b = 1 to N (n\_Bagging) do

- Draw a bootstrap sample, (Xb, Yb) from given (X ∈ Rn,Y e R)
- Grow a random-forest tree T, using X, and Y, by repeating recursively using the following steps until the minimum node size is nmin.
- 1）Randomly select mvariablesfrom the given n variables
- 2）Pick the best variable or split-point among the mvariables
- 3）Split the node into two daughter nodes

Output the ensemble of trees will be {Tp}↑

- 4 The posterior probability, PRF(x) = Voting(Pk(x), where Pk(x) is the class prediction of the kth random-forest.

## Algorithm 8 The Steps of Implementing Naive Bayes (NB)

Input: The n-dimensional data, X ∈ R" and target outcome,Y∈ R

(diabetes present (C1) or not (C2))

- 1 Compute the prior probabilities for each of the class [49], P(Y = Ci) = N and P(Y = C2) = NC2 N whereNisthenumberof sample
- 2The output posterior probability of class for the given P(X) P(X|Ci) is the likelihood of the predictor for a given class and P(X) is the prior probability of predictor.

inter-class redundancy is much higher (not linearly separable), as in the PID dataset. The comparative results demonstrate that our proposed framework has outperformed other frameworks on AUC, which has shown great potentiality for diabetes predictionfrom thePIDdataset.Theensembling of two boosting type classifiers (AB and XB) is the best combination for diabetes prediction,as thebase classifiers shouldhave a minimum correlationbetween them.The higher precisionin diabetes predictionfrom thePIDdataset using thebest combination(AB+XB) canbe achieved when our proposed preprocessing (P + Q and correlation-based feature selection）is applied.In the future,the proposed

## Algorithm 9 TheSteps of ImplementingXGboost (XB)

Input: The n-dimensional data, X ∈ Rn and target outcome,Y ∈ R

- 1Initialize themodel with constant value:

sample

- 2 for m = 1to M (n\_Iterations) do
- 8F(Xi) where i = 1,2,...,N
- 4 Fit a base tree, hm using training set (X;, rim) for i=1,2,...,N
- Compute multiplier m by

- Update the model by Fm(x) = Fm-1(x) + Ymhm(x)
- 7 Fm(x)is the desired posterior probability, P ∈ [O,1]

trained model will be used tobuild a web app with a user-friendly interface. Additionally, the proposed framework willbe applied toother medical contexts toverifytheirgen-

## APPENDIX ALGORITHMSFORTHEFEATURESELECTIONANDML CLASSIFIERSFORDIABETESPREDICTION

- A.PCA-BASEDFEATURESELECTION see Algorithm 1.
- B.ICA-BASEDFEATURESELECTION see Algorithm 2.
- C.CORRELATION-BASEDFEATURESELECTION see Algorithm 3.
- D.ALGORITHMFORIMPLEMENTINGK-NEAREST NEIGHBOUR see Algorithm 4.
- E.ALGORITHMSFORIMPLEMENTINGDECISIONTREE see Algorithm 5.
- F.ALGORITHMSFORIMPLEMENTINGAdaBoOSt see Algorithm 6.
- G.ALGORITHMSFORIMPLEMENTINGRANDOMFOREST see Algorithm 7.

H.ALGORITHMSFORIMPLEMENTINGNAIVEBAYES see Algorithm 8.

I.ALGORITHMSFORIMPLEMENTINGXGbOOSt see Algorithm 9.

## CONFLICTSOFINTEREST

Authorshaven'tanyconflictstodisclosethisresearch.

## REFERENCES

- [1]A. Misra, H. Gopalan, R. Jayawardena, A. P. Hills, M. Soares, A.A.Reza-Albarran, and K.L.Ramaiya, "Diabetes in developing countries,"J.Diabetes,vol.11,no.7,pp.522-539,Mar.2019.
- [2]R.Vaishali,R.Sasikala,S.Ramasubbareddy,S.Remya,and S.Nalluri, "Genetic algorithm basedfeature selection and MOEfuzzy classification algorithm on pima indians diabetes dataset," in Proc. Int. Conf. Comput. Netw.Informat.(ICCNI),Oct.2017,pp.1-5.
- [3]The Emerging Risk Factors Collaboration,"Diabetes mellitus,fasting bloodglucose concentration,andrisk of vascular disease:Acollaborative meta-analysis of 102 prospective studies,"Lancet, vol. 375, pp. 2215-2222,Jun.2010.
- [4]N.H. Cho,J.E.Shaw, S.Karuranga,Y.Huang,J. D. da Rocha Fernandes, A.W.Ohlrogge,and B.Malanda,"IDF diabetes atlas:Global estimates of diabetes prevalence for 2017 and projections for 2045,"Diabetes Res. Clin.Pract.,vol.138,pp.271-281,Apr.2018.
- [5]P. Saeedi,I.Petersohn,P.Salpea,B.Malanda,S.Karuranga,N.Unwin, S.Colagiuri,L.Guariguata,A.A.Motala,K.Ogurtsova,J.E.Shaw, D.Bright, and R. Williams,"Global and regional diabetes prevalence estimates for 2019 and projectionsfor 2030 and 2045:Results from the international diabetesfederation diabetes atlas,9thedition,"DiabetesRes. Clin.Pract.,vol.157,Nov.2019,Art.no.107843.
- [6]J.W.Smith,J.E.Everhart,W.C.Dickson,W.C.Knowler, and R.S.Johannes,"Using the ADAP learning algorithm to forecast the onset of diabetes mellitus,"in Proc.Annu. Symp.Comput.Appl. Med. Care, Nov.1988,pp. 261-265.
- [7] M. Maniruzzaman, M.J. Rahman, M. Al-MehediHasan,H. S. Suri, M.M.Abedin,A.El-Baz,and J.S.Suri,"Accurate diabetes risk stratification using machine learning: Role of missing value and outliers,"J. Med. Syst.,vol.42,no.5,p.92,May 2018.
- [8]G.J.McLachlan,Discriminant analysis and statistical pattern recognition,J.Roy.Stat.Soc.,Ser.A,Statist.Soc.,vol.168,no.3,pp.635-636, Jun.2005.
- [9]T. M. Cover, "Geometrical and statistical properties of systems of linear tron.Comput.,vols.EC-14,no.3,pp.326-334,Jun.1965.
- [10]G.I. Webb, J. R. Boughton, and Z. Wang,"Not so naive bayes: Aggregating one-dependence estimators,"Mach.Learn.,vol.58,no.1,pp.5-24, Jan.2005.
- [11] S. Brahim-Belhouari and A.Bermak, "Gaussian process for nonstationary time series prediction,"Comput. Statist. Data Anal.,vol.47,no.4, Pp. 705-712, Nov. 2004.
- [12]C.Cortes and V. Vapnik,"Support-vector networks,"Mach.Learn., vol. 20, pp. 237-297, Sep. 1995.
- [13]A.Reinhardt and T. Hubbard,""Using neural networks for prediction of the subcellular location of proteins,"Nucleic Acids Res., vol. 26, no.9, pp.2230-2236,May 1998.
- [14]B.Kegl,"The return ofAdaBoost.MH:Multi-class Hamming trees,"2013, arXiv:1312.6086.[Online].Available:http://arxiv.org/abs/1312.6086
- [15]B. P. Tabaei and W. H. Herman, "A multivariate logistic regression equation to screen for diabetes:Development and validation,"Diabetes Care, vol. 25, no.11, pp. 1999-2003, Nov. 2002.
- [16] I. Jenhani, N. B. Amor, and Z. Elouedi, "Decision trees as possibilistic classifiers," Int. J. Approx. Reasoning,vol. 48, no. 3, pp.784807, Aug.2008.
- [17]L.Breiman,"Random forests,"Mach.Learn.,vol.45,no.1,pp.5-32, Oct.2001.
- [18]D. Sisodia and D. S.Sisodia, "Prediction of diabetes using classification algorithms"Procedia Comput.Sci.,vol.132,pp.1578-1585,Jan.2018.
- [19]S.Perveen,M.Shahbaz,A.Guergachi,and K.Keshavjee,"Performance analysis of data mining classification techniques to predict diabetes， Procedia Comput.Sci.,vol.82,pp.115-121,2016.
- [20]M.Pradhan and G.R.Bamnote,"Design of classifier for detection of diabetes mellitus using genetic programming,"in Proc.3rd Int. Conf. Frontiers Intell.Comput.,Theory Appl.,Nov.2015,pp.763-770.
- [21]N.Nai-arun and R.Moungmai,"Comparison of classifiers for the risk of diabetes prediction,"Procedia Comput.Sci.,vol. 69,pp.132-142, Dec.2015.
- [22] M. Maniruzzaman, N. Kumar, M. M. Abedin, M. S. Islam, H. S. Suri, A.S. El-Baz, and J. S. Suri,"Comparative approaches for classification of diabetes mellitus data:Machine learning paradigm," Comput.Methods Programs Biomed.,vol.152,pp.23-34,Dec.2017.
- [23]R.Bansal,N.Gaur, and S.N.Singh,"Outlier detection:Applications and techniques indata mining,"inProc.6thInt.Conf.Cloud Syst.BigData Eng.(Confluence),Jan.2016,pp.373-377.
- [24]D. Cousineau and S. Chartier, "Outliers detection and treatment: A review"Int.J.Psychol.Res.,vol.3,no.1,pp.58-67,Mar.2010.
- [25]C. R. Rao,"The use and interpretation of principal component analysis in applied research,"Sankhya,Indian J.Statist.,Ser.A,vol.26,pp.329-358, Dec.1964.
- [26]A.Hyvarinen and E.Oja,"Independent component analysis:Algorithms and applications,"Neural Netw.,vol.13,nos.45,pp.411430,Jun.2000.
- [27] F. Han and H. Liu, ""Statistical analysis of latent generalized correlation matrixestimation in transelliptical distribution,"Bernoulli,vol.23,no.1, Pp. 23-57,Feb. 2017.
- [28]S.Arlot and A.Celisse,"A survey ofcross-validationprocedures for model selection,"Statist. Surv.,vol. 4,pp. 40-79, Jul. 2010.
- [29]D.Krstajic,L.J.Buturovic,D.E.Leahy,and S.Thomas,"Cross-validation pitfalls when selecting and assessing regression and classification models," J. Cheminformatics,vol.6, no.1,p.10,Dec.2014.
- [30]X.Zeng and T.R.Martinez,"Distribution-balanced stratified crossvalidation for accuracyestimation,"J.Experim.Theor.Artif.Intell., vol. 12, no. 1,pp. 1-12, Jan. 2000.
- [31]P. Cunningham and S.J. Delany,"k-Nearest neighbour classifiers,"Multiple Classifier Syst.,vol.34,pp.1-17,Mar. 2007.
- [32]T. Chen and C. Guestrin,"XGBoost:A scalable tree boosting system,"in Proc.22ndACMSIGKDDInt.Conf.Knowl.DiscoveryDataMiningKDD, 2016, pp. 785-794.
- [33]S.-L.Hsieh,S.-H.Hsieh,P.-H. Cheng,C.-H. Chen,K.-P.Hsu,I.-S.Lee, Z.Wang,and F. Lai,"Design ensemble machine learning model for breast cancer diagnosis,"J. Med. Syst.,vol. 36,no.5,pp.2841-2847, Oct.2012.
- [34]B.Harangi,"Skin lesion classification with ensembles of deep convolutional neural networks,"J.Biomed.Informat.,vol.86,pp.25-32, Oct.2018.
- [35]A.S.Miller, B.H.Blott, and T.K.Hames,"Review of neural network Comput.,vol. 30,no.5,pp.449464,Sep.1992.
- [36]D. E.Rumelhart, G.E. Hinton, and J. Ronald,"Review of neural network applications in medical imaging and signal processing,"Nature,vol. 323, no.6088,pp.533-536,0ct.1986.
- [37] A. S. Glas, J. G. Lijmer, M. H. Prins, G. J. Bonsel, and P. M. M. Bossuyt, "The diagnostic odds ratio:A single indicator of test performance," J. Clin. Epidemiology,vol.56,no.11,pp.1129-1135,Nov.2003.
- [38]P. Ramachandran,B.Zoph, and Q.V.Le,"Searching for activation abs/1710.05941
- [39]N. Srivastava, G.Hinton, A.Krizhevsky, I. Sutskever, and R. SalakhutdiJ. Mach.Learn.Res.,vol.15, no.1,pp.1929-1958,Jan.2014.
- [40]J.J. Deeks,"Systematic reviews of evaluations of diagnostic and screening tests,"Brit.Med.J.,vol.323,no.7305,pp.157-162,Jul.2001.
- [41]L. Li, "Diagnosis of diabetes using a weight-adjusted voting approach," in Proc.IEEE Int.Conf.Bioinf.Bioeng.,Nov.2014,pp.320-324.
- [42]A.K.Dewangan and P.Agrawal,"Classification of diabetes mellitus using machine learning techniques,"Int. J. Eng.Appl. Sci.,vol. 2, no.5, Pp. 145-148, May 2015.
- [43]S.Bashir,U.Qamar, and F.H.Khan,"IntelliHealth:A medical decision framework,"J.Biomed.Informat.,vol.59,pp.185-200,Feb.2016.
- [44]H.Kaur and V.Kumari,"Predictive modelling and analytics for diabetes using a machine learning approach,"Appl. Comput. Informat.,Dec.2018.
- [45]Q.Wang,W.Cao,J.Guo,J.Ren,Y.Cheng,and D.N.Davis,"DMP\_MI: An effective diabetesmellitus classification algorithm onimbalanced data with missing values,"IEEE Access, vol. 7,pp.102232-102238, Jul. 2019.

- [46]S. P.Chatrati, G. Hossain, A.Goyal,A.Bhan,S. Bhattacharya, D. Gaurav, and S. M. Tiwari, "Smart home health monitoring system for predicting type 2 diabetes and hypertension," J. King Saud Univ. Comput. Inf. Sci., Jan. 2020.
- Neighbor for classification,"inProc.4thInt.Conf.FuzzySyst.Knowl. Discovery(FSKD),Aug.2007,pp.679-683.
- [48]R.E.Schapire,"Explaining AdaBoost,"in Empirical Inference.Berlin, Germany:Springer,Oct.2013,pp.37-52.
- [49]S. Taheri and M. Mammadov, "Learning the naive Bayes classifier with optimization models,"Int.J. Appl. Math.Comput.Sci.,vol.23,no.4, Pp.787-795,Dec.2013.

MD.KAMRULHASANwaSbornin Tangail, Bangladesh, in 1992.He received the B.Sc. and M.Sc. engineering degrees in electrical and electronic engineering (EEE)from the KhulnaUniversityof Engineering&amp;Technology (KUET), in 2014 and 2017, respectively, and the M.Sc. degree in medical imaging and application (MAIA）from the University of Burgundy, France,theUniversity of CassinoandSouthern Lazio,Italy,and the University of Girona,Spain,

as an Erasmus Scholar, in 2019.

Heis currentlyworkingas anAssistantProfessorwiththeEEEDepartment, KUET. During the studying of MAIA,he focused on different modalities of medicalimage analysis and machinelearning tobuild a generic computer-aided diagnosis system.He is alsoworking as a Supervisor with several undergraduate students on different modalities of medicalimage classification, segmentation,and registration.He has published several international journal articles and conference papers on medical image and signalprocessing.Hisresearchinterestsincludemedicalimageanddata analysis,machine learning,deep convolutional neural networks,medical image reconstruction,and surgical robotics.Hereceived theUniversity Gold Medal due to securing 1"t position in his class at KUET.

MD.ASHRAFUL ALAM is currently pursuing the degree in electrical and electronic engineering(EEE)withtheKhulnaUniversityofEngineering &amp; Technology (KUET).His research interests include medical image and data processing,computer vision, and deep learning. He is also working on medicaldata analysis,skin cancer classification,andmultilabelwholeheartsegmentation from CT and MRI as a B.Sc.thesis.

DOLADAS was born inKhulna,Bangladesh, in1997.She received the B.Sc.engineering degree in computer science and engineering (CSE)from theKhulnaUniversity of Engineering&amp;Technology (KUET), in 2019, where she is currently pursuing the M.Sc.engineering degree.

SheisalsoworkingasaLecturerwiththe CSEDepartment,KUET.Her researchinterests are in machine learning, deep neural networks, data mining,and biomedical engineering.She has

published some conference papers in these domains.She is also working on some articles aboutthesetopicswithherstudents andcolleagues.

IEEE AccesS'

EKLAS HOSSAIN (Senior Member,IEEE) receivedtheB.S.degreeinelectricalandelectronic engineeringfrom theKhulna University of Engineering&amp;Technology,Bangladesh,in2006, the M.S.degree in mechatronics and robotics engineering from the International Islamic University of Malaysia, Malaysia,in 2010, and thePh.D.degreefromtheCollege of Engineering and Applied Science,University of Wisconsin-Milwaukee (UWM).

Since 2015,he has been an Assistant Professor with the Department of Electrical Engineering and Renewable Energy, Oregon Tech, where he is involved with several research projects on renewable energy and grid-tied microgridsystem.Heiscurrentlyworkingas anAssociateResearcherwith the Oregon Renewable Energy Center (OREC).He is also a Registered ProfessionalEngineer(PE)in the stateof Oregon,USA.He is also a (REP).He has been working in the areas of distributed power systems and renewable energyintegrationfor the last tenyears.He is looking forward toexploring methods to make the electric power systems more sustainable, cost-effective and secure through extensive research and analysis on energy storage,microgridsystems,and renewable energysources,with his dedicated researchteam.Hehaspublishedseveralresearch articles andpostersin this field. His research interests include modeling, analysis, design, and control of power electronic devices,energy storage systems; renewable energy sources,integration of distributed generation systems,microgrid and smart grid applications,robotics, and advanced control systems.He is a Senior Member of the Association of Energy Engineers (AEE).He is the winner of the Rising FacultyScholar Award,in 2019,from the Oregon Institute of Technology for his outstanding contribution to teaching.He is also serving as an AssociateEditor for IEEEAccEss.

MAHMUDULHASANwasborninBangladesh, in February 1994.He received the B.Sc. degree incomputerscienceandengineeringfromthe Khulna University of Engineering&amp; Technology (KUET),Khulna,Bangladesh,in 2018.He is currently pursuing the Ph.D. degree in computer science with Stony Brook University,Stony Brook, NY, USA.

Since2018,hehasbeenaLecturer withKUET. HeisalsoaGraduateTeachingAssistantwith

Stony Brook University.His previous research interest was applicable to machinelearninganddeeplearning.His currentresearchinterestisin computer vision.From 2017 to 2018,he also worked as theIEEE Student BranchPresident.
