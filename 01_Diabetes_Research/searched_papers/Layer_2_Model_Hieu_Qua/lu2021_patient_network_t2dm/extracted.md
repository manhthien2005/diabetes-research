<!-- extracted by pdf-extract | engine=docling | pages=12 | ocr=False | tables=3/3 | density=1.01 | score=100 -->

## A patient network-based machine learning model for disease prediction: The case of type 2 diabetes mellitus

Haohui Lu 1 · Shahadat Uddin 1 · Farshid Hajati 2 · MohammadAli Moni 3 · Matloob Khushi 4

Accepted: 13 May 2021 © The Author(s), under exclusive licence to Springer Science+Business Media, LLC, part of Springer Nature 2021 / Published online: 10 June 2021

## Abstract

In recent years, the prevalence of chronic diseases such as type 2 diabetes mellitus (T2DM) has increased, bringing a heavy burden to healthcare systems. While regular monitoring of patients is expensive and impractical, understanding chronic disease progressions and identifying patients at risk of developing comorbidities are crucial. This research used a realworld administrative claim dataset of T2DM to develop an ensemble of innovative patient network and machine learning approach for disease prediction. The healthcare data of 1,028 T2DM patients and 1,028 non-T2DM patients are extracted from the de-identified data to predict the risk of T2DM. The proposed model is based on the ' patient network ', which represents the underlying relationships among health conditions for a group of patients diagnosed with the same disease using the graph theory. Besides patients' socio-demographic and behaviour characteristics, the attributes of the ' patient network ' (e.g., centrality measure) discover patients' latent features, which are effective in risk prediction. We apply eight machine learning models (Logistic Regression, K-Nearest Neighbours, Support Vector Machine, Na¨ ıve Bayes, Decision Tree, Random Forest, XGBoost and Artificial Neural Network) to the extracted features to predict the chronic disease risk. The extensive experiments show that the proposed framework with machine learning classifiers performance with the Area Under Curve (AUC) ranged from 0.79 to 0.91. The Random Forest model outperformed the other models; whereas, eigenvector centrality and closeness centrality of the network and patient age are the most important features for the model. The outstanding performance of our model provides promising potential applications in healthcare services. Also, we provide strong evidence that the extracted latent features are essential in the disease risk prediction. The proposed approach offers vital insight into chronic disease risk prediction that could benefit healthcare service providers and their stakeholders.

Keywords Disease prediction · Type 2 Diabetes · Administrative data · Network analysis · Machine learning

## 1 Introduction

Type 2 diabetes mellitus (T2DM) is a long-term metabolic disorder with high penetrance in humans worldwide [1]. T2DM is a leading cause of death and contributes to increased comorbidities [2]. Almost 1 million Australian adults suffered from T2DM in 2017-18, and it caused death in around 3,300 per year between 1985 and 2018. Meanwhile, T2DM is the major contributor to Australia's disease burden; a significant amount of disease expenditure in the Australian healthcare system is attributed to diabetes [3].

/envelopeback Shahadat Uddin shahadat.uddin@sydney.edu.au

1 School of Project Management, The University of Sydney, Sydney, Australia

2 College of Engineering and Science, Victoria University Sydney, Sydney, Australia

3 School of Public Health and Community Medicine, Faculty of Medicine, The University of New South wales, Sydney, Australia

4 School of Computer Science, The University of Sydney, Sydney, Australia

Although T2DM is an irreversible disease, fortunately, it is a preventable disease [4]. Early detection of atrisk patients and lifestyle intervention would reduce the risk of T2DM. However, many patients are not aware of their chronic diseases in the early stages until symptoms appear or subsequently diagnosed with comorbidities [5]. Physicians are already well prepared to identify those people at risk for T2DM. However, it is unrealistic to screen and regularly monitor every patient with highrisk conditions [6, 7]. In recent years, the amount of administrative claim data has surged. Although the primary purpose of administrative claim data is to retrieve patient information and perform administrative healthcare tasks, it provides the opportunity to apply statistical predictive models to improve healthcare systems' performance [2]. As a result, predicting the risk of T2DM using administrative claim data and taking measures to prevent diabetes can significantly reduce the prevalence and healthcare expenditures.

In the literature, significant research has been devoted to predictive risk modelling of different diseases, including T2DM [8-13] and other chronic conditions [14-17]. Most of these works trained predictive models using different predictors, such as age, body mass index, gender and symptoms. They assigned scores for the predictors, then used the scores to estimate the incidence of T2DM. Meanwhile, disease prediction using healthcare data has recently shown a potential application for machine learning methods [18]. Applying machine learning techniques on administrative claim data provides powerful tools for population health and generating clinical hypotheses for risk factor discovery [19]. Although the existing machine learning models can capture chronic diseases' nature, predicting one chronic disease's risk is complicated due to shared common risk factors with other conditions [20, 21]. The existing methods focus on using machine learning methods with the patients' characteristics to predict chronic diseases' risk. However, latent relationships exist between chronic diseases and their comorbidities; this hidden information may affect predictions' performance.

Recently, network approaches have been applied to administrative healthcare data to develop disease networks [22-24]. Folino et al. [24] used a network approach and association rule mining to predict patients' risk of future disease. Network analytics and predictive methods are also implemented to predict chronic diseases. They have been applied in different studies to achieve outstanding accuracies [7, 24]. However, these works focused on the disease-comorbidity relationship. They used a network approach to analyse the latent relationship between patient and disease network. Nevertheless, very little research expressly explores the patient-patient relationship using administrative healthcare data to build a disease predictive risk model.

We present a disease risk prediction for T2DM patients using a patient network model combined with machine learning techniques exploiting the hidden information in the administrative healthcare claim data. The primary purpose of this study is to develop predictive models for T2DM using patients' socio-demographic and behavioural information and network attributes from their corresponding patient network. We apply a feature engineering technique to construct a patient network by bipartite network projection to achieve this goal. We consider the derived network features (e.g., degree centrality, eigenvector centrality, and closeness centrality) and patients' characteristics to train machine learning models and predict the disease's risk. Although this study has focused on T2DM as a critical chronic condition, the proposed model can be applied to any other diseases.

## 2 Materials and methods

## 2.1 Data and cohort selection

The administrative healthcare claim data for this study was obtained from the CBHS health funds company in Australia. There are approximately 18,700,000 hospital admission records belong to about 124,000 de-identified patients gathered from 1995 to 2018. The dataset contains a unique patient ID, gender, age, location, provider ID, admission and discharge date, claim ID, episode ID, diagnosis procedure code, diseases codes, and diagnosis-related group code. The disease code is the 9 th and 10 th Australian modified versions (ICD-9-AM and ICD-10-AM) of the international classification of diseases code, which complied with the international standards and reporting diseases and health conditions [25]. In this research, we are interested in the patient's information, such as age, gender, and disease codes, to develop the model.

To test the proposed model, we choose T2DM as a particular chronic disease. We use a filtering strategy and data pre-processing technique to select patients whose records are related to T2DM (ICD-10-AM code 'E11' or ICD-9-AM code '250.*'). The filtering strategy includes: (i) the patients have at least two hospital admissions during the study period; (ii) excluding duplicate records and ICD codes related to fever and injuries; (iii) the maximum admission is set to 50 during the study period, some patients may require frequent hospital admissions for continuous treatment, such as chemotherapy or kidney dialysis; (iv) Inspired by Khan et al. [7], suppose the outcome M is the result of the characteristics A , B , and C , and the outcome N is the result of the characteristics B , C , and D . In this case, we might conclude that the characteristics of B and C cause M or N or both. In other words, if a patient has the characteristics of B or C or both, we cannot conclude which outcome ( M or N ) will occur since B and C are present in both possible outcomes. On the other hand, if the patient has either A or C characteristics, it can be predicted better. Therefore, we should consider the characteristics' effect on the proposed patient network model. Figure 1 shows the data selection processes followed in this study.

For the data pre-processing technique, we convert all ICD codes to upper case and conduct outlier detection processes. To predict the risk of T2DM and solve the class imbalance issue, we select two cohorts: T2DM patients and non-T2DM patients. We randomly selected the patient from the non-T2DM cohort with at least one ICD code that is not in the T2DM cohort. After these data processing steps, we obtained healthcare data for 1,028 T2DM patients and 1,028 non-T2DM patients. Figure 2 presents the research framework followed in this study.

Fig. 1 An illustration of the data selection process

## 2.2 ICD code

Administrative data are generally encoded into ICD-9AM and ICD-10-AM formats; each format has more than 20,000 unique and active codes [26]. It is not realistic to study every single ICD-code, which causes data sparsity problem. Therefore, we filter and only study the disease codes related to comorbidities. For this purpose, there are several well-established lists of comorbidities indices, such as Charlson [27] and Elixhauser [28] indices. Here, we apply the Elixhauser comorbidity index since it is developed based on administrative data. We only study the ICD codes in the Elixhauser comorbidity index rather than all the ICD codes. In addition, we ground ICD-9 codes '3051', '64900', '64901', '64902', '64903', '64904', 'V1582'

and ICD-10 codes 'F17', 'F17.*', 'T65.2', 'P04.2', 'Z72.0', 'Z86.43', 'Z58.7' as smoking behaviour.

## 2.3 Patient network

We have used concepts from graph theory to construct a patient network. A bipartite network is used to present the diseases that a patient encounter over time. A bipartite graph is a graph whose vertices can be divided into two disjoint and independent subsets [29]. This study uses bipartite graphs to represent the patient-disease relationship as follows.

Where, G denotes the undirected bipartite graph constructed from the given dataset, consisting of u patient attributes having v different kind of nodes indicated the diseases. The edges between two nodes represent the relationship between the patient and the disease. Thus, the patient is diagnosed with related diseases that are connected in the bipartite graph.

Although there are specific techniques, measures, and algorithms for analysing one-mode network (networks with one set of nodes similar to each other), it is limited for the bipartite graph. Projection is usually applied to compress a bipartite network into a unipartite one and conduct further analysis as a one-mode network [30]. While the data from the original patient-disease bipartite graph might be useful, it is difficult to analyse and extract information. Although previous studies developed networks to analyse disease-comorbidity relationships [2, 7], we are interested in the latent connections between patients with the same disease. If two individuals have the same illness, we can conclude that both patients have a latent relationship. For example, they might have similar behaviour and body mass index. In addition, comorbidity reflects the shared molecular mechanisms of environmental factors between diseases [31]. Previous research also suggested that genetic factors contribute to the development of chronic diseases, and disease-gene associations indicated the common genetic origin of diseases [32, 33]. Patients suffering a common chronic disease are linked together since they may have latent relationships such as common disease-associated genes, similar risk factors and lifestyle.

To extract the latent information, we convert the patientdisease bipartite graph into a simple unipartite graph capturing relationships by bipartite graph projection [34]. In the projected graph, patients are joined by the asymmetric tie and are linked together if they are diagnosed with the same disease(s). Likewise, we transform the bipartite graph into a unipartite one that captures diseases diagnosed for patients, similar to the existing studies' disease network [7, 24]. Fig. 3 illustrates a projection of a patient network using an abstract dataset. The disease information of four patients is shown on the left-hand side of this figure). Also, the corresponding patient-disease bipartite network is shown in the middle of the figure. Finally, the ' patient network ', which is based on the patient-disease bipartite network , is presented on the right-hand side of the figure. In this patient network, patient P 1 has a tie with all other remaining patients since patient P 1 has been diagnosed with at least one common disease with P 2 (T2DM), P 3 (cardiovascular disease, CVD) and P 4 (CVD). Similarly, there is an edge between patients P 2 and P 3 since they have common liver disease. There is also an edge between patients P 3 and P 4 since both of them have been diagnosed with the CVD. This study constructed one patient network based on the patientdisease bipartite networks for all T2DM and non-T2DM patients and considered its different network measures as attributes for the machine learning classification analysis.

## 2.4 Feature construction for predictive risk models

After generating a comprehensive patient network, we derive two types of features: network features and patient features. These two feature vectors are concatenated to train a predictive risk model. In the following subsections, we will explain the feature construction in detail.

## 2.4.1 Network features

Extracting effective features from the patient network is the key to achieve high prediction accuracy. In this study, we apply the proposed model to T2DM risk prediction as a crucial chronic disease. For this purpose, we extract five types of features from the comprehensive patient network (i.e., degree centrality, eigenvector centrality, closeness centrality, betweenness centrality and clustering coefficient) to develop the predictive risk model. In the following paragraphs, we will explain each feature type in detail.

Degree centrality is the first and the most straightforward concept in node centrality [35], which is an index that indicates the number of nodes linked to this node. The degree centrality of a node u is computed as

Where, du is the degree of a node u .

In this study, we use a normalised form of the degree centrality as

Where, n is the network's size (the number of nodes).

Eigenvector centrality is proposed by Bonacich [36]. The idea is that a node is vital if surrounded by important neighbouring nodes. Having the adjacency matrix A,Auv = 1 if node u is connected to node j . Then, eigenvector centrality for node u is

Where, λ is a positive coefficient.

According to closeness centrality , a node is crucial if it has small shortest path lengths to all other nodes [37]. The centrality closeness of the node u , Cc (u) , is defined as

Where, N is the set of nodes in the network and d(u, v) is the shortest path length between u and v .

Further, betweenness centrality measures a node as important when it lies on many shortest paths between other nodes [35]. The betweenness centrality of the node u , Cb (u) , is defined as

Where, σst (u) is the number of shortest paths between s and t that contain u , and σst is the shortest paths between s and t .

Lastly, clustering coefficient measures the degree to which nodes in a network tend to cluster together [38]. At the node level, the clustering coefficient of a node quantifies how closely its neighbours are connected to form a complete graph. The clustering coefficient of a node u is

Where, T (u) is the number of triangles through node u and deg (u) is the degree of u .

## 2.4.2 Patient features

Literature suggests that age, gender, and behaviour are the risk factors for T2DM [39]. We also considered these three features in the proposed model. The age risk factor is normalised by rescaling the age value to [0,1]. The gender risk factor is a categorical score: 0 if the patient is female and 1 if the patient is male. The score for the behaviour (smoking) risk factor is a discrete value, and we use ICD codes to identify whether a patient is a smoker or not. If at least one ICD code matches, the patient has a behavioural risk score of 1, otherwise 0.

## 2.5 Risk prediction

Machine learning algorithms are a type of artificial intelligence (AI) designed to simulate human intelligence by discovering patterns and making inferences based on available data [40]. The combination of big data and machine learning is a great technology that can impact the healthcare industry. Several machine learning techniques have been used in disease prediction [18]. Here, we apply eight state-of-the-art supervised machine learning techniques (i.e., Logistic Regression, k-Nearest Neighbour, Support Vector Machine, Na¨ ıve Bayes, Decision Tree, Random Forest, XGBoost, and Artificial Neural Network) to develop the predictive models.

Logistic Regression (LR) is an extension of the linear regression used in classification tasks, and the predicted variable is nominal [41]. LR fits the data to a logistic curve to discover the possibility that a new instance belongs to a certain class. K-Nearest Neighbour (KNN) is classifying the data point on how its neighbour is classified, and it classifies new data points based on the similarity metric of previously stored data points [42]. Support Vector Machine (SVM) distinguishes two categories by generating a hyperplane after the input data has converted the best separation of classes into a high-dimensional space mathematically [43]. Na¨ ıve Bayes (NB) is a classification based on the Bayes' theorem [44]. This model assumes that predictive features are conditionally independent of each other, given the class. The NB classifier learns the conditional probability of each variable of a given class label from the observed data. Then calculate the probability by applying Bayes' rule and use the highest posterior probability to predict the class. A Decision tree (DT) is an algorithm that uses a tree-like graph and its possible consequences [45]. It starts from the root and tests the values of the attributes until it reaches a leaf node; then returns the class of the leaf node to predict the class. In addition to DT, Random Forests (RF) is a heuristic classifier, which is essentially composed of multiple decision trees [46]. RF uses bagging and selects the most important attribute while building a decision tree, and it is used to generate diversity and reduce the correlation between decision trees. XGBoost is a relatively new tree-based ensemble machine learning algorithm, a scalable machine learning system for tree boosting. It has higher predicting accuracy since it uses accurate approximation algorithms [47]. Lastly, Artificial Neural Network (ANN) is firstly proposed by McCulloch and Pitts [48] and became popular by the works of Rumelhart, Hinton [49]. A fully connected neural network consists of a series of fully connected layers that connect every neuron in one layer to every neuron in the other layer. The ANN algorithm can be represented as a set of fully connected nodes. The input of nodes could be the output of the nodes from the previous layers. Nodes and edges have weights, and these weights could be adjusted by minimising loss function by backpropagation. Based on the training of ANN, the outputs of nodes in the last layer can classify or predict test data.

## 3 Results

k-fold cross-validation (CV) is employed to validate the proposed model. In k-fold CV, the data is divided into k folds (partitions), and each fold is used as a test set at some point while the other folds are used as a train set [50]. The k-fold CV has k iterations. In each iteration, the model is trained using k -1 folds of data and tested on the k th fold. The overall accuracy is the average accuracy over the k iterations. Here, we use the 10-fold CV that divides the training set (i.e., T2DM and non-T2DM patients) into 10 equal-sized partitions. This study uses an equal number of patients from each cohort (i.e., T2DM and nonT2DM patients) to avoid the class-imbalanced issue. We also use the area under the receiver operating characteristic curve (AUC) to measure the classifier performance [51]. AUC shows how much the model can distinguish between classes; a higher value of AUC indicates that the classifier has higher predictive power. After applying the preprocessing technique, the T2DM and non-T2DM patients are identified by searching the corresponding ICD codes. In total, we found that 1,028 patients who had ICD10-AM code 'E11' or ICD-9-AM code '250.*' (Type 2 diabetes) met the conditions. Then, we randomly select an equal number of non-T2DM patients from the remaining patients. The following subsections discuss the patient network properties, machine learning models' accuracy, performance, and evaluation.

## 3.1 Network properties of patient network

We use the comorbidities selection criteria to generate a comprehensive patient network PN from T2DM and nonT2DM patients. In the network, the nodes are patients (with unique patient ID), and the edges are relationships between patients; the patients diagnosed with the same disease are connected by an edge. Several node-level and graph-level characteristics are considered for the comprehensive patient network PN . Table 1 summarises the characteristics of the generated comprehensive patient network.

As can be seen, the number of nodes in PN is less than the total number of selected patients because some of the patients do not have any common ICD code. Also, the edge count is relatively large, and the average degree is 86; this indicates that the patients have common diseases in PN .

Table 1 Characteristics of the comprehensive patient network

| Characteristics                |   Patient network |
|--------------------------------|-------------------|
| Number of nodes                |             1,981 |
| Number of edges                |            85,412 |
| Average degree                 |            86.231 |
| Modularity                     |              0.57 |
| Number of communities          |                37 |
| Network diameter               |                 7 |
| Average path length            |             2.994 |
| Graph density                  |             0.044 |
| Average clustering coefficient |             0.808 |

Graph density is the proportion of the number of edges to the number of possible edges, indicating approximately 4.4% possible transition between patients with the same diseases. Meanwhile, the average clustering coefficient is 0.808, which means the patients are strongly connected. Finally, the number of communities and the modularity is 38 and 0.57, respectively. This indicates that the overall intracommunity transition may not be significantly different from the inter-community transition. Figure 4 visualises the comprehensive patient network using social network analysis software, Gephi [52]. We used the Force Atlas layout; nodes represent the patients, and the edges represent the link between patients. We use a different colour for clustering to represent nodes. The patient network shows a large number of edges between nodes, and the colour indicates the cluster from which they originated.

Fig. 4 The visualisation of the generated comprehensive patient network . Nodes are the patient and nodes with the same colour belong to the same community. The edges refer to the link between patients suffering from a common disease

## 3.2 Performance of machine learning-based predictive models

Eight supervised machine learning techniques (i.e., LR, KNN, SVM, NB, DT, RF, XGBoost, and ANN) are applied for risk prediction. After the data pre-processing step, each of the T2DM and non-T2DM cohorts contains 1,028 patients. We concatenate the patient cohorts and divide them into two sets randomly. The first set (80% of the patients) is used to train the models, and the second set (20% of patients) is used to test the models. We apply the 10-fold CV technique to divide the training data into ten partitions for the training set. Meanwhile, the hyperparameters are optimised for machine learning and deep learning models to find the best accuracy. We used the python and Scikitlearn (sklearn) package [53] to train the machine learning models and Keras [54] to train the ANN. For the KNN predictive model, we used the grid search to find the k value with the highest accuracy, in which the k value was set as 12. For the LR, SVM, DT and NB model, we used the default hyperparameters in sklearn. To develop the RF model, we used the bootstrap aggregation method to ensemble DT's. The maximum depth is set to 10, use entropy criterion and the number of estimators is set to 200. We used hyperparameter tuning to find the best performance for XGBoost. Lastly, we trained a three-layer, fully connected ANN with Adam optimiser [55], 4000 epochs, and a learning rate of 0.001. We used the test set to evaluate the performance of the models. Table 2 presents the accuracy and performance measure of the models.

Fig. 5 ROC for different machine learning models

that are more accurate than the other individual models. Besides, RF technology can process a large amount of data with thousands of variables. When a class is less frequent than other classes in the data, it can automatically balance the dataset. This method can also quickly process variables, making it suitable for complex tasks.

RF shows the highest accuracy of 84.95% among the eight models, followed by ANN and XGBoost, which are 82.52%. In recent literature, the predictive risk model for diabetes using RF had the best accuracy [2, 56, 57]. In this study, RF is also outperforming other models. RF is an ensemble classifier that contains many DT; each model will build sequentially since each model uses feedback from previous models and tries to have a laser view on the misclassification. The low correction between DTs provides the advantages over other models, the ensemble predictions For LR and DT classification methods, the false positive count is more than the false negative. On the other hand, KNN, SVM, NB, RF, XGboost and ANN models have more false negative predictions than false positive ones. For false positives, some patients may be predicted as having a high risk of chronic disease even though they are not on that chronic disease trajectory. This is desirable for our research because the purpose of the research is to predict the risk of chronic disease more accurately. It is better to predict patients with lower risk as chronic risk (i.e., false positives) rather than predict them in the opposite way (i.e., false negatives). Having more false negatives in the prediction will leave patients who are actually on the chronic diseases' pathway undetected. This could lead to further complications to disease progressions.

Figure 5 shows the ROC curves of the applied models. The RF model had the highest AUC among the eight models. The AUC of XGBoost is slightly lower than RF, which is 0.8950. Also, the AUC for all models is over 0.75, which indicates the proposed model can predict the risk of T2DM efficiently.

Table 2 Performance of machine learning models (including patient network features)

|                |    LR |   KNN |   SVM |    NB |    DT |    RF |   XGBOOST |   ANN |
|----------------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Accuracy (%)   | 74.27 | 81.31 | 78.64 | 65.29 | 80.83 | 84.95 |     82.52 | 82.52 |
| Precision (%)  | 74.53 | 82.25 | 78.64 | 69.56 | 80.84 | 85.97 |     82.98 | 82.52 |
| Recall (%)     | 74.27 | 81.31 | 78.64 | 65.29 | 80.83 | 84.95 |     81.52 | 82.52 |
| F1 Score (%)   | 74.26 | 81.10 | 78.64 | 62.72 | 80.83 | 84.79 |     82.42 | 82.52 |
| True Positive  |   155 |   142 |   155 |    77 |   161 |   150 |       150 |   162 |
| True Negative  |   151 |   193 |   169 |   192 |   172 |   200 |       190 |   178 |
| False Positive |    62 |    20 |    44 |    21 |    41 |    13 |        23 |    35 |
| False Negative |    44 |    57 |    44 |   122 |    38 |    49 |        49 |    37 |

Table 3 Performance of machine learning models (excluding patient network features).

| Model   |   Accuracy for patient features only (%) |   Accuracy for network features only (%) |
|---------|------------------------------------------|------------------------------------------|
| LR      |                                    59.71 |                                    70.63 |
| KNN     |                                    75.00 |                                    82.77 |
| SVM     |                                    67.72 |                                    77.18 |
| NB      |                                    70.87 |                                    63.83 |
| DT      |                                    72.33 |                                    81.31 |
| RF      |                                    71.36 |                                    83.98 |
| XGBoost |                                    70.63 |                                    78.16 |
| ANN     |                                    72.33 |                                    81.31 |

## 3.3 Evaluation of network features and patient features

To evaluate our proposed model, we also trained and tested the machine learning models without using the network features (i.e., degree centrality, eigenvector centrality, closeness centrality, betweenness centrality and clustering coefficient) and patient features (gender, age and smoking). Table 3 shows the accuracy of the eight models without the network features and the models without the patient networks. The results show that the accuracy of the models with the patient feature is 59.71% to 75.00% only, which is significantly lower than the results with network features. In addition, the accuracy of the models with network features only ranged from 63.83% to 83.98%, which are close to the models with patient features and network features. Therefore, we can conclude that the network features play an important role in disease prediction, and our proposed model improved the accuracy of T2DM risk prediction significantly.

We use the permutation feature importance [58] to examine the network features that improve the prediction result of Table 3. Figure 6 demonstrates permutation importance across models in terms of the network features. LR, KNN and SVM models rated the clustering coefficient as the most important feature, while DT, RF, XGboost and ANN rated the eigenvector centrality as the most important network feature that improves the prediction. For less important features, results were varied. LR, KNN, SVM, NB, DT and ANN rated the betweenness centrality as the least important feature. RF rated the degree centrality as the least important feature. Also, degree centrality and closeness centrality are the least important features for the XGBoost algorithm.

## 3.4 Feature importance in the best-performed model

Since RF has an outperforming result, it is crucial to determine which features are essential to interpret the model better. As a classifier, RF performs implicit feature selection and uses only a small part of 'strong variables' for classification [59], which leads to its superior performance on high-dimensional data. The results of this implicit feature selection of RF can be visualised by 'Gini importance' [46]. The feature importance of RF visualises in Fig. 7. Eigenvector centrality, closeness centrality and age are the features that strongly impact model performance, which have feature importance higher than 0.15. As mentioned above, eigenvector centrality is a measure of the influence of a patient in the patient network, each patient within the network will be given a score: the higher the score, the greater the level of influence within the patient network. Meanwhile, closeness centrality scores each patient based on their 'closeness' to all other patients in the patient network. Patients with high scores may have some obvious underlying characteristics, and these network features affect the classification of patients. Therefore, network features play an essential role compare to patient features. On the other hand, age is a vital factor for our best-performed model in terms of patient features. Clinically, older people are at high risk, and most T2DM patients are over 45 years [60]. This is consistent with our model's outcome.

Fig. 6 Importance of each network features for the applied machine learning algorithms

Fig. 7 Feature importance based on the Random Forest model

## 4 Discussion

This study developed predictive models for characterising the risk of developing T2DM using machine learning classifiers and network analytics. Outstanding predictive performances were achieved by eight models, for whom AUCs ranged from 0.79 to 0.91. RF model performed the best, with an AUC of 0.91 and 85% predictive accuracy. In addition to the risk factors from previous studies, new network features were added to our models. Results show eigenvector and closeness centrality of the network and patients' age are the important features in the RF model; the Gini importance of these features was greater than threshold 0.15.

[62, 63], patient age has been found as the third most important feature. The first two important features are eigenvector centrality and closeness centrality. A low graph density (0.044) indicates that the resultant aggregated patient network is a sparse one. However, the average clustering coefficient of the network is very high (0.808), resembling that patients are well connected in small groups within the network. Patients belonging to two categories (T2DM and non-T2DM) have a different level of intergroup connectivity.

To our knowledge, this is the first study to develop the patient network and use the features from the network, then combine with the patient features to predict the risk of T2DM using different machine learning algorithms. Most of the previous studies focused on the demographic, clinical lab values and vital signs to predict the risk of T2DM [61]. Recently, Khan et al. [7] used a network approach that compares a patient's trajectory with the combined disease network and machine learning methods to develop predictive risk models. This study directly used the features of the patient network, which is different from the previous studies using the network approach. Simultaneously, our results were consistent with the earlier findings; age has been found as an important feature, and older people are at high risk of T2DM.

Higher accuracy of machine learning algorithms based on only network features indicates that T2DM patients tend to have similar network properties. Notably, unlikely many other studies of the literature where patient t age has been found as the most important predictor of T2DM

This study only considered the common ICD codes for whom patients were treated during their illness to ascertain the patient network. In the same way, patient networks can be created, for example, based on the common clinical diagnosis outcomes and disease-gene associations. This will allow a comparative study of the performances of different patient networks for T2DM risk prediction. Future research could address this scope by considering research data from other sources for the same patient cohort.

However, this research has some limitations. This study used real-world healthcare data in which the quality of data records is out of control, and the record styles might vary among practitioners. Some of the disease code in the dataset are missing, incomplete, and formats are different. Also, the dataset contains only hospital admission and discharge summary from one insurance company. The outside hospital visits and other insurance companies' information for patients with multiple insurance providers is missing. However, these limitations are inherent in most real-world healthcare data.

## 5 Conclusion

This study presented a new model for predicting T2DM using a network approach and machine learning techniques. Patient records from private health insurance are formulated as a bipartite graph and projected to the patient network.

Then, we used the patient network features along with the patients' characteristics to train eight machine learning models to predict the risk of T2DM. The experimental results show the models' effectiveness with an AUC ranged from 0.79 to 0.91. Also, our findings indicated the network features were essential to the proposed model. The results showed that the proposed model, which combines network analysis and machine learning technique, could be successfully used for disease risk prediction, leading to more significant insights on disease risk factors.

## Declarations

Conflict of Interests The authors declare that they do not have any conflict of interest.

Author Contributions HL: Writing, Data analysis and Research design; SU: Research design,Writing, Conceptualisation and Supervision; FH: Critical revision and Writing; MAM: Critical revision; and MK: Critical revision.

## References

1. World Health Organization (2020) Diabetes. https://www.who.int/ news-room/fact-sheets/detail/diabetes. Accessed 8 March 2021
2. Hossain ME, Uddin S, Khan A (2021) Network analytics and machine learning for predictive risk modelling of cardiovascular disease in patients with type 2 diabetes. Expert Syst Appl 164:113918
3. Australian Institute of Health and Welfare (2021) Diabetes. https://www.aihw.gov.au/reports/diabetes/diabetes/contents/ what-is-diabetes. Accessed 8 March 2021
4. Jermendy G (2005) Can type 2 diabetes mellitus be considered preventable? Diabetes Res Clin Practice 68:S73S81
5. Rathmann W, Haastert B, Icks A, L¨ owel H, Meisinger C, Holle R, Giani G (2003) High prevalence of undiagnosed diabetes mellitus in southern germany: target populations for efficient screening. the kora survey 2000. Diabetologia 46(2):182-189
6. Zhang L, Wang Y, Niu M, Wang C, Wang Z (2020) Machine learning for characterizing risk of type 2 diabetes mellitus in a rural chinese population: The henan rural cohort study. Sci Rep 10(1):1-10
7. Khan A, Uddin S, Srinivasan U (2019) Chronic disease prediction using administrative data and graph theory: The case of type 2 diabetes. Expert Syst Appl 136:230-241
8. Collins GS, Mallett S, Omar O, Yu L-M (2011) Developing risk prediction models for type 2 diabetes: a systematic review of methodology and reporting. BMC Med 9(1):1-14
9. Fiorini S, Hajati F, Barla A, Girosi F (2019) Predicting diabetes second-line therapy initiation in the australian population via time span-guided neural attention network. PloS One 14(10):e0211844
10. Kopitar L, Kocbek P, Cilar L, Sheikh A, Stiglic G (2020) Early detection of type 2 diabetes mellitus using machine learning-based prediction models. Sci Rep 10(1):1-12
11. Sahoo AK, Pradhan C, Das H (2020) Performance evaluation of different machine learning methods and deep-learning based convolutional neural network for health decision making. In: Nature inspired computing for data science. Springer, pp 201212
12. Heydari M, Teimouri M, Heshmati Z, Alavinia SM (2016) Comparison of various classification algorithms in the diagnosis of type 2 diabetes in iran. Int J Diabetes Dev Count 36(2):167173
13. Samant P, Agarwal R (2018) Machine learning techniques for medical diagnosis of diabetes using iris images. Comput Methods Program Biomed 157:121-128
14. Xiao Q, Dai J, Luo J, Fujita H (2019) Multi-view manifold regularized learning-based method for prioritizing candidate disease mirnas. Knowl-Based Syst 175:118-129
15. Butt AH, Rovini E, Fujita H, Maremmani C, Cavallo F (2020) Data-driven models for objective grading improvement of parkinson's disease. Ann Biomed Eng 48(12):2976-2987
16. Zhang X, Yang Y, Li T, Zhang Y, Wang H, Fujita H (2021) Cmc: A consensus multi-view clustering model for predicting alzheimers disease progression. Comput Methods Prog Biomed 199:105895
17. Lei X, Tie J, Fujita H (2020) Relational completion based nonnegative matrix factorization for predicting metabolite-disease associations. Knowl-Based Syst 204:106238
18. Uddin S, Khan A, Hossain ME, Moni MA (2019) Comparing different supervised machine learning algorithms for disease prediction. BMC Med Inf Decis Making 19(1):1-16
19. Razavian N, Blecker S, Schmidt AM, Smith-McLallen A, Nigam S, Sontag D (2015) Population-level prediction of type 2 diabetes from claims data and analysis of risk factors. Big Data 3(4):277287
20. Barabsi A-L (2007) Network medicine -from obesity to the 'diseasome'. England J Med 357(4):404-407
21. Loscalzo J, Kohane I, Barabasi A-L (2007) Human disease classification in the postgenomic era: a complex systems approach to human pathobiology. Mol Syst Biol 3(1):124
22. Fotouhi B, Momeni N, Riolo MA, Buckeridge DL (2018) Statistical methods for constructing disease comorbidity networks from longitudinal inpatient data. Appl Netw Sci 3(1):1-34
23. Aguado A, Moratalla-Navarro F, L´ opez-Simarro F, Moreno V (2020) Morbinet: multimorbidity networks in adult general population. analysis of type 2 diabetes mellitus comorbidity. Sci Rep 10(1):1-12
24. Folino F, Pizzuti C, Ventura M (2010) A comorbidity network approach to predict disease risk. In: International Conference on Information Technology in Bio-and Medical Informatics. Springer, pp 102-109
25. World Health Organization (2020) International classification of diseases (ICD) information sheet. https://www.who.int/ classifications/icd/factsheet/en/. Accessed 8 March 2021
26. The Australian Classification of Health Interventions (2020) ICD10-AM. http://www.accd.net.au/icd-10-am-achi-acs/. Accessed 8 March 2021
27. Charlson ME, Pompei P, Ales KL, MacKenzie CR (1987) A new method of classifying prognostic comorbidity in longitudinal studies: development and validation. J Chron Diseas 40(5):373383
28. Elixhauser A, Steiner C, Harris DR, Coffey RM (1998) Comorbidity measures for use with administrative data. Med Care:8-27
29. Asratian AS, Denley TristanMJ, H¨ aggkvist R (1998) Bipartite graphs and their applications, vol 131. Cambridge university press
30. Zweig KA, Kaufmann M (2011) A systematic approach to the one-mode projection of bipartite graphs. Soc Netw Anal Min 1(3):187-218
31. Capobianco E et al (2013) Comorbidity: a multidimensional approach. Trends Mol Med 19(9):515-521
32. Goh K-I, Cusick ME, Valle D, Childs B, Vidal M, Barab´ asi A-L (2007) The human disease network. Proc Natl Acad Sci 104(21):8685-8690

33. Sandford AJ, Weir TD, Pare PD (1997) Genetic risk factors for chronic obstructive pulmonary disease. Eur Respir J 10(6):13801391
34. Zhou T, Ren J, Medo M, Zhang Y-C (2007) Bipartite network projection and personal recommendation. Phys Rev E 76(4):046115
35. Shaw ME (1954) Group structure and the behavior of individuals in small groups. J Psychol 38(1):139-149
36. Bonacich P (1972) Factoring and weighting approaches to status scores and clique identification. J Math Sociol 2(1):113-120
37. Freeman LC (1978) Centrality in social networks conceptual clarification. Soc Netw 1(3):215-239
38. Holland PW, Leinhardt S (1971) Transitivity in structural models of small groups. Comp Group Stud 2(2):107-124
39. Kavanagh A, Bentley RJ, Turrell G, Shaw J, Dunstan D, Subramanian SV (2010) Socioeconomic position, gender, health behaviours and biomarkers of cardiovascular disease and diabetes. Soc Sci Med 71(6):1150-1160
40. Agah A (2013) Medical applications of artificial intelligence, 1st edn. Taylor &amp; Francis Group, Baton Rouge
41. Kleinbaum DG, Dietz K, Gail M, Klein M, Klein M (2002) Logistic regression. Springer
42. Cover T, Hart P (1967) Nearest neighbor pattern classification. IEEE Trans Inf Theory 13(1):21-27
43. Cortes C, Vapnik V (1995) Support-vector networks. Mach Learn 20(3):273-297
44. Lindley DV (1958) Fiducial distributions and bayes' theorem. J R Stat Soc Ser B (Methodol) 20(1):102-107
45. Quinlan JR (1986) Induction of decision trees. Mach Learn 1(1):81-106
46. Breiman L (2001) Random forests. Mach Learn 45(1):5-32
47. Chen T, Guestrin C (2016) Xgboost: A scalable tree boosting system. In: Proceedings of the 22 nd ACM SIGKDD international conference on knowledge discovery and data mining, pp 785-794
48. McCulloch WS, Pitts W (1943) A logical calculus of the ideas immanent in nervous activity. Bullet Math Biophys 5(4):115-133
49. Rumelhart DE, Hinton GE, Williams RJ (1986) Learning representations by back-propagating errors. Nature 323(6088):533
50. Kohavi R et al (1995) A study of cross-validation and bootstrap for accuracy estimation and model selection. In: IJCAI, vol 14, Montreal, pp 1137-1145
51. Fawcett T (2006) An introduction to roc analysis. Pattern Recogn Lett 27(8):861-874
52. Bastian M, Heymann S, Jacomy M (2009) Gephi: an open source software for exploring and manipulating networks. In: Proceedings of the International AAAI Conference on Web and Social Media, vol 3
53. Pedregosa F, Varoquaux G, Gramfort A, Michel V, Thirion B, Grisel O, Blondel M, Prettenhofer P, Weiss R, Dubourg V et al (2011) Scikit-learn: Machine learning in python. J Mach Learn Res 12:2825-2830
54. Chollet F et al (2015) Keras. https://keras.io
55. Kingma DP, Ba J (2014) Adam: A method for stochastic optimization. arXiv:1412.6980
56. Mani S, Chen Y, Elasy T, Clayton W, Denny J (2012) Type 2 diabetes risk forecasting from emr data using machine learning. In: AMIA Ann Symp Proc, vol 2012. American Medical Informatics Association, p 606
57. Yang J, Yao D, Zhan X, Zhan X (2014) Predicting disease risks using feature selection based on random forest and support vector machine. In: International Symposium on Bioinformatics Research and Applications. Springer, pp 1-11
58. Altmann A, Tolos ¸i L, Sander O, Lengauer T (2010) Permutation importance: a corrected feature importance measure. Bioinformatics 26(10):1340-1347
59. Scornet E, Biau G, Vert J-P (2015) Consistency of random forests. Ann Stat 43(4):1716-1741
60. Pippitt K, Li M, Gurgle HE (2016) Diabetes mellitus: screening and diagnosis. Amer Family Phys 93(2):103-109
61. Kavakiotis I, Tsave O, Salifoglou A, Maglaveras N, Vlahavas I, Chouvarda I (2017) Machine learning and data mining methods in diabetes research. Comput Struct Biotechnol J 15:104-116
62. Dinh A, Miertschin S, Young A, Mohanty SD (2019) A datadriven approach to predicting diabetes and cardiovascular disease with machine learning. BMC Med Inf Decis Making 19(1):1-15
63. Venugopala PS, Barh D, Ashwini B et al (2021) Artificial intelligence techniques for predicting type 2 diabetes. In: Advances in Artificial Intelligence and Data Engineering. Springer, pp 411-430

Publisher's note Springer Nature remains neutral with regard to jurisdictional claims in published maps and institutional affiliations.

and deep learning.

Haohui Lu received the Bachelor of Commerce degree in operations management and decision sciences in 2011 and the masters degree in project management in 2012 from the University of Sydney, Australia. He is currently pursuing the Higher Degree Research (HDR) with the School of Project Management of the Faculty of Engineering, The University of Sydney. He is now researching predictive risk modelling of chronic diseases using machine learning

Dr Shahadat Uddin is a Senior Lecturer in the Faculty of Engineering of the University of Sydney, Australia. He has research interests in health informatics, complex networks, data science, artificial intelligence and project analytics. Dr Uddin has published in several international and multi-disciplinary journals, including Expert Systems with Applications, Complexity, International Journal of Medical Informatics, Scientific Reports and Journal of

Informetrics . Dr Uddin has been awarded many academic awards for his outstanding research excellence, including the Top Researcher Award (Bangladesh University of Engineering &amp; Technology Alumni Australia, 2020), Campus Director Leadership Award (Central Queensland University 2006), Certificate for Research Excellence (University of Sydney 2010), Deans Research Award (University of Sydney, 2014).

Dr Farshid Hajati received the bachelor of engineering from K. N. Toosi University of Technology, Iran, in 2003 and master and PhD degrees in electronics engineering from Amirkabir University of Technology, Iran, in 2006 and 2011, respectively. In 2020, he received a second PhD degree in health data science from Western Sydney University, Australia. From 2020, he

has been a senior lecturer of the College of Engineering and Science at Victoria University Sydney. His research interest includes machine learning, data science, and digital health.

Mohammad Ali Moni received his PhD degree in Artificial Intelligence and Bioinformatics from the University of Cambridge, the UK, in 2014. From 2015 to 2017, he was a postdoctoral research fellow at the Garvan Institute of Medical Research in Sydney as well as he worked as an associate lecturer at the University of New South Wales, Australia. At the end of 2017, he was awarded the University of Sydney Deputy Vice-Chancellor fellowship

and worked until 2020. In 2020 he joined the WHO Collaborating Center for eHealth, UNSW Digital Health, University of New South Wales, Australia. His research interest includes Artificial Intelligence, Machine learning, Data Science and clinical Bioinformatics.

Dr Matloob Khushi received his PhD from the University of Sydney in 2016. He holds academic appointments at the University of Sydney, Australia, and at the University of Suffolk, UK.
