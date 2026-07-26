/* ============================================================
   Ngân hàng câu hỏi ôn tập — trang "Xây dựng nghiên cứu có giá trị".
   Do workflow đa-agent soạn từ nội dung đã kiểm chứng so với kho.
   `chapter` khớp id chương trong data.ts; `answer` = chỉ số đáp án đúng.
   ============================================================ */

export interface QuizQuestion {
  id: string;
  chapter: string;
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    "id": "q1",
    "chapter": "overview",
    "prompt": "Đề tài nghiên cứu trong kho tài liệu này tập trung vào bài toán nào?",
    "options": [
      "Phân loại nhị phân (binary classification) dự đoán đái tháo đường trên dữ liệu tabular & EHR",
      "Phân đoạn ảnh võng mạc để phát hiện biến chứng đái tháo đường",
      "Dự báo chuỗi thời gian đường huyết liên tục",
      "Gom cụm (clustering) bệnh nhân theo lối sống"
    ],
    "answer": 0,
    "explain": "Bối cảnh đề tài được xác định rõ là DỰ ĐOÁN ĐÁI THÁO ĐƯỜNG dạng phân loại nhị phân trên dữ liệu tabular và EHR."
  },
  {
    "id": "q2",
    "chapter": "overview",
    "prompt": "Trong kho, paper nào được xem là baseline nền tảng Layer 1 với pipeline ML end-to-end đầy đủ?",
    "options": [
      "naz2020_deep_learning_pima",
      "gr2024_random_oversampling_diabetes",
      "lugner2024_top_ten_predictors",
      "khanam2021_comparison_ml_pima"
    ],
    "answer": 1,
    "explain": "gr2024 xây pipeline ML end-to-end đầy đủ, xác lập tổ hợp Boruta + Random Forest, đóng vai trò baseline nền tảng Layer 1; user đã promote."
  },
  {
    "id": "q3",
    "chapter": "overview",
    "prompt": "Tổ hợp mô hình nào được gr2024 xác lập là đường đi tốt nhất khi dùng random oversampling?",
    "options": [
      "PCA + Decision Tree",
      "Boruta + Random Forest",
      "SMOTE + LightGBM",
      "GA + 2GDNN"
    ],
    "answer": 1,
    "explain": "gr2024 xác lập Boruta + Random Forest là tổ hợp tốt nhất, đạt 94% accuracy trên PIDD và 92% trên BRFSS (Table 6)."
  },
  {
    "id": "q4",
    "chapter": "overview",
    "prompt": "Theo BRIEF, paper hasan2020 đạt AUC bao nhiêu với ensemble AdaBoost + XGBoost (AUC-weighted soft voting) trên PIMA?",
    "options": [
      "0.902",
      "0.946",
      "0.950",
      "0.957"
    ],
    "answer": 2,
    "explain": "Ensemble AB+XB của hasan2020 đạt AUC 0.950; XGBoost đơn lẻ tốt nhất đạt 0.946 ± 0.020, MLP đạt 0.902 ± 0.020."
  },
  {
    "id": "q5",
    "chapter": "meaningful",
    "prompt": "Tiêu chí FINER dùng để đánh giá một câu hỏi nghiên cứu gồm những yếu tố nào?",
    "options": [
      "Fast, Inexpensive, Novel, Easy, Repeatable",
      "Feasible, Interesting, Novel, Ethical, Relevant",
      "Formal, Independent, Numeric, Empirical, Robust",
      "Focused, Iterative, Neutral, Explicit, Reliable"
    ],
    "answer": 1,
    "explain": "FINER = Feasible (khả thi), Interesting (thú vị), Novel (mới), Ethical (đạo đức), Relevant (liên quan) — khung kinh điển từ 'Designing Clinical Research'."
  },
  {
    "id": "q6",
    "chapter": "meaningful",
    "prompt": "Vì sao việc đặt thêm một câu hỏi kiểu 'so sánh 7 model ML trên PIMA' (như khanam2021) thường bị xem là research waste?",
    "options": [
      "Vì PIMA là dataset quá lớn nên tốn tài nguyên tính toán",
      "Vì mảng này đã bão hòa, không tạo information gain mới, không lấp một gap tập thể nào",
      "Vì các model ML cổ điển luôn kém deep learning",
      "Vì PIMA chỉ có biến phân loại nên không hợp so sánh"
    ],
    "answer": 1,
    "explain": "PIMA vẫn hữu ích để học và kiểm tra code, nhưng một so sánh model lặp lại khó tạo đóng góp nếu không có câu hỏi mới, protocol tốt hơn hoặc validation phù hợp. Con số ~85% của Chalmers & Glasziou nói về nhiều nguồn lãng phí trong nghiên cứu y sinh, không phải riêng PIMA."
  },
  {
    "id": "q7",
    "chapter": "meaningful",
    "prompt": "Theo nguyên tắc phân biệt 'limitation' và 'gap', đâu là cách hiểu đúng?",
    "options": [
      "Mọi limitation của một bài lẻ đều là một research gap có thể claim",
      "Một limitation là gợi ý; cần kiểm tra bằng review/guideline và nhiều nghiên cứu gần nhất trước khi claim gap của cả lĩnh vực",
      "Gap và limitation là hai từ đồng nghĩa hoàn toàn",
      "Gap chỉ tồn tại khi chưa có bất kỳ paper nào về chủ đề"
    ],
    "answer": 1,
    "explain": "Limitation của một bài chưa đủ để đại diện cả lĩnh vực. Bằng chứng tổng hợp làm claim gap mạnh hơn, dù một nghiên cứu đơn lẻ vẫn có thể phát hiện khoảng trống thật nếu bằng chứng đủ thuyết phục."
  },
  {
    "id": "q8",
    "chapter": "meaningful",
    "prompt": "Decision Curve Analysis (DCA) bổ sung điều gì mà AUC/accuracy không trực tiếp cho biết?",
    "options": [
      "Tốc độ huấn luyện mô hình",
      "Net benefit của quyết định lâm sàng so với chiến lược 'điều trị tất cả' và 'không điều trị ai'",
      "Số lượng tham số của mô hình",
      "Mức độ rò rỉ dữ liệu trong pipeline"
    ],
    "answer": 1,
    "explain": "DCA ước tính net benefit tiềm năng trên dải ngưỡng, dựa trên các giả định về hậu quả của false positive/false negative. Nó bổ sung cho AUC/accuracy nhưng không thay thế nghiên cứu tác động thực tế."
  },
  {
    "id": "q9",
    "chapter": "rigor",
    "prompt": "Để tránh data leakage, các bước như oversampling, imputation và feature selection phải được thực hiện như thế nào?",
    "options": [
      "Trên toàn bộ dataset trước khi split để tận dụng hết dữ liệu",
      "Sau khi split và chỉ fit trên tập train, lý tưởng là bên trong từng fold CV",
      "Chỉ trên tập test để kiểm tra độ ổn định",
      "Trước split nhưng phải cố định seed"
    ],
    "answer": 1,
    "explain": "Quy tắc chống leakage số 1 của Layer 1: oversample/impute/select phải fit chỉ trên train sau split (trong từng CV fold); test giữ nguyên phân phối gốc và không oversample. Làm sai sẽ thổi phồng accuracy."
  },
  {
    "id": "q10",
    "chapter": "rigor",
    "prompt": "Khi vừa tune/chọn model vừa ước lượng hiệu năng bằng cross-validation, vì sao thường cần nested CV?",
    "options": [
      "Vì grid search cần ít nhất hai vòng lặp",
      "Vì chúng phải fit bên trong từng CV fold, nếu fit trên toàn dataset sẽ leakage và làm AUC ảo",
      "Vì nested CV chạy nhanh hơn k-fold thường",
      "Vì AUC chỉ tính được khi có hai vòng CV"
    ],
    "answer": 1,
    "explain": "Vòng trong dùng để tune/chọn model; vòng ngoài ước lượng hiệu năng chưa bị dùng cho lựa chọn. Imputation và feature selection cũng phải fit trong train fold tương ứng."
  },
  {
    "id": "q11",
    "chapter": "rigor",
    "prompt": "Với dataset nhỏ, lợi ích chính của repeated stratified K-fold hoặc bootstrap so với một split ngẫu nhiên là gì?",
    "options": [
      "Vì single split luôn cho kết quả thấp hơn thực tế",
      "Vì single split trên dataset nhỏ dễ rơi vào fold dễ và cho con số phồng, thiếu thông tin độ ổn định",
      "Vì K-fold không cần cố định seed",
      "Vì single split không tính được accuracy"
    ],
    "answer": 1,
    "explain": "Resampling cho thấy kết quả thay đổi thế nào theo mẫu/chia dữ liệu và tận dụng dữ liệu phát triển tốt hơn. Tuy nhiên phải tách model selection khỏi evaluation và báo uncertainty phù hợp; K-fold không tự động tốt hơn trong mọi thiết kế."
  },
  {
    "id": "q12",
    "chapter": "rigor",
    "prompt": "Trong khanam2021, NN 2 hidden layer báo accuracy 88.6% từ split 85/15 nhưng K-fold cùng cấu hình chỉ ~76%. Điều này cho thấy gì?",
    "options": [
      "Mô hình tổng quát hóa rất tốt",
      "Con số đỉnh 88.6% là 'may rủi' chứ không phải generalization, chênh ~12% là dấu hiệu đáng ngờ",
      "K-fold luôn cho kết quả sai",
      "NN luôn tốt hơn ML cổ điển"
    ],
    "answer": 1,
    "explain": "Chênh lớn cho thấy kết quả nhạy với cách chia và cần kiểm tra lại bằng resampling/nested evaluation. Nó là tín hiệu bất ổn, chưa đủ tự nó chứng minh lần split cao là sai."
  },
  {
    "id": "q13",
    "chapter": "rigor",
    "prompt": "Ngoài discrimination (AUROC), calibration cũng cần được đánh giá. Calibration slope < 1 thường báo hiệu điều gì?",
    "options": [
      "Mô hình thiếu dữ liệu train",
      "Risk dự đoán quá cực đoan (dấu hiệu overfit)",
      "Mô hình bị lệch lớp",
      "AUROC bị tính sai"
    ],
    "answer": 1,
    "explain": "Calibration slope < 1 thường cho thấy dự đoán quá cực đoan/overfit. Calibration-in-the-large hoặc intercept > 0 thường gợi ý mô hình dự đoán nguy cơ trung bình quá thấp trong quần thể đánh giá."
  },
  {
    "id": "q14",
    "chapter": "value",
    "prompt": "Vì sao tasin2022 được promote dù accuracy (81%) thấp hơn gr2024 (94%) và AUC thấp hơn hasan2020 (0.950)?",
    "options": [
      "Vì tasin2022 dùng dataset lớn nhất",
      "Vì kết hợp XAI, prototype web/Android và code public, tạo bằng chứng khả thi ban đầu ngoài việc tối ưu accuracy",
      "Vì 81% là accuracy cao nhất kho",
      "Vì tasin2022 không xử lý imbalance"
    ],
    "answer": 1,
    "explain": "tasin2022 đáng giữ vì mở rộng sang giải thích, prototype và code. Tuy nhiên đây vẫn là bằng chứng khả thi ban đầu, chưa phải triển khai lâm sàng; XAI/code public không tự đảm bảo model đúng."
  },
  {
    "id": "q15",
    "chapter": "value",
    "prompt": "Theo cảnh báo trong kho, SHAP/LIME giải thích điều gì?",
    "options": [
      "Nguyên nhân y khoa (causation) của bệnh đái tháo đường",
      "Hành vi của mô hình (model behavior) / liên hệ, KHÔNG phải nguyên nhân y khoa",
      "Độ chính xác tuyệt đối của chẩn đoán",
      "Mức độ leakage trong dữ liệu"
    ],
    "answer": 1,
    "explain": "SHAP/LIME giải thích model behavior (association), KHÔNG phải nguyên nhân bệnh (causation). Không được suy diễn nhân quả từ SHAP."
  },
  {
    "id": "q16",
    "chapter": "value",
    "prompt": "Hướng mô hình 'survey-only' (chỉ dùng biến khảo sát, không cần xét nghiệm máu) mang lại giá trị gì? (dinh2019 đạt AUC 0.862 cho nhánh này)",
    "options": [
      "Tăng accuracy lên 99%",
      "Cho phép sàng lọc diện rộng, chi phí thấp ở tuyến cơ sở cho người chưa được chẩn đoán",
      "Loại bỏ hoàn toàn nhu cầu external validation",
      "Thay thế chẩn đoán y khoa chính thức"
    ],
    "answer": 1,
    "explain": "dinh2019 chứng minh mô hình chỉ dùng câu hỏi khảo sát (no-lab, AUC 0.862) vẫn sàng lọc tốt, phù hợp công cụ tự đánh giá nguy cơ chi phí thấp, phủ rộng quần thể chưa chẩn đoán."
  },
  {
    "id": "q17",
    "chapter": "value",
    "prompt": "Giá trị thực tế (translational) của mô hình rút gọn feature (như reduced top-10 của lugner2024, ROC-AUC 0.881) so với mô hình đầy đủ (419-feature, 0.903) là gì?",
    "options": [
      "Cao hơn hẳn về AUC",
      "Khả thi lâm sàng hơn vì chỉ vài biến sinh học dễ đo mà giữ gần trọn độ chính xác",
      "Loại bỏ nhu cầu calibration",
      "Không cần XAI nữa"
    ],
    "answer": 1,
    "explain": "reduced top-10 chỉ thua main ~0.02 ROC-AUC nhưng dùng ít biến dễ đo, nên thực dụng nhất cho lâm sàng. Tuy nhiên global SHAP chưa đủ để giải thích cho từng bệnh nhân khi deploy."
  },
  {
    "id": "q18",
    "chapter": "pitfalls",
    "prompt": "Vì sao accuracy rất cao (~94-98%) trên PIMA nên kích hoạt một lượt AUDIT?",
    "options": [
      "Vì PIMA quá lớn nên accuracy không đáng tin",
      "Vì cao hơn nhiều baseline quen thuộc; cần kiểm tra leakage, split, duplicate, preprocessing, uncertainty và khả năng tái lập",
      "Vì accuracy không bao giờ vượt 90% được về mặt toán học",
      "Vì PIMA chỉ có nam giới"
    ],
    "answer": 1,
    "explain": "Con số khác thường không chứng minh tốt cũng không chứng minh leakage. Nó yêu cầu audit protocol và dữ liệu đánh giá độc lập trước khi tin hoặc bác bỏ."
  },
  {
    "id": "q19",
    "chapter": "pitfalls",
    "prompt": "naz2020 báo DL 98.07% accuracy nhưng bị xếp 'weak'. Dấu hiệu mâu thuẫn nội tại nào được nêu?",
    "options": [
      "AUC quá cao so với accuracy",
      "Confusion matrix cả 4 model đều tổng 207 mẫu — không khớp 20%×768=154 nếu split 80/20; DT 96.62% cũng lệch mạnh so với baseline thường gặp",
      "Mô hình dùng quá nhiều fold CV",
      "Sensitivity bằng 0"
    ],
    "answer": 1,
    "explain": "naz2020 có các số không nhất quán và mô tả preprocessing thiếu rõ ràng. Đây là lý do hợp lệ để hạ độ tin cậy; không cần gọi một accuracy là 'bất khả thi' chỉ vì nó cao."
  },
  {
    "id": "q20",
    "chapter": "pitfalls",
    "prompt": "Vì sao accuracy đơn lẻ là metric yếu trên dữ liệu đái tháo đường lệch lớp?",
    "options": [
      "Vì accuracy luôn thấp hơn AUC",
      "Vì accuracy có thể cao mà vẫn bỏ sót nhiều ca dương tính (recall/sensitivity thấp ở nhóm bệnh — nhóm quan trọng nhất lâm sàng)",
      "Vì accuracy không tính được khi có hai lớp",
      "Vì accuracy phụ thuộc seed"
    ],
    "answer": 1,
    "explain": "Trên dữ liệu lệch lớp, accuracy che giấu recall thấp ở lớp bệnh. lugner2024 minh họa: ROC-AUC 0.903 và Accuracy 0.924 nhưng Sensitivity chỉ 0.623 (bỏ sót ~38% ca thật), PR-AUC 0.291."
  },
  {
    "id": "q21",
    "chapter": "pitfalls",
    "prompt": "Khi nhãn được định nghĩa từ một ngưỡng xét nghiệm (ví dụ glucose ≥ 126 cho ĐTĐ), rủi ro gì xảy ra nếu giữ lại các chỉ số chuyển hóa tương quan cao trong feature?",
    "options": [
      "Mô hình train chậm hơn",
      "Label leakage / gần-trùng nhãn, đẩy AUC lên giả tạo",
      "Calibration tự động được cải thiện",
      "Không có rủi ro gì"
    ],
    "answer": 1,
    "explain": "Nếu cùng phép đo tạo nhãn hiện tại và làm feature, model có thể đọc lại định nghĩa outcome. Chênh AUC giữa nhánh có-lab và no-lab chỉ cho thấy lab thêm nhiều thông tin; không tự nó định lượng mức leakage."
  },
  {
    "id": "q22",
    "chapter": "checklist",
    "prompt": "Hướng dẫn BÁO CÁO mô hình dự đoán lâm sàng dùng regression hoặc ML/AI hiện hành là gì?",
    "options": [
      "CONSORT 2010",
      "TRIPOD+AI (BMJ 2024)",
      "STROBE",
      "QUADAS-2"
    ],
    "answer": 1,
    "explain": "TRIPOD+AI (BMJ 2024) hướng dẫn báo cáo minh bạch. PROBAST+AI (BMJ 2025) là công cụ riêng để đánh giá quality, risk of bias và applicability; báo cáo đủ không tự đồng nghĩa ít sai lệch."
  },
  {
    "id": "q23",
    "chapter": "checklist",
    "prompt": "Để đảm bảo tính tái lập (reproducibility), một nghiên cứu ĐTĐ tối thiểu nên công khai những gì?",
    "options": [
      "Chỉ con số accuracy cuối cùng",
      "Code, random seed cố định, không gian và giá trị hyperparam cuối, phiên bản dataset/thư viện, và thứ tự pipeline",
      "Chỉ tên dataset đã dùng",
      "Chỉ confusion matrix"
    ],
    "answer": 1,
    "explain": "2/3 paper Layer 1 không công bố code khiến tái lập chỉ ở mức medium/low. Để tái lập cần code + seed + hyperparam + phiên bản dataset + mô tả thứ tự pipeline (loại nghi ngờ leakage), theo tinh thần TRIPOD+AI/open science."
  },
  {
    "id": "q24",
    "chapter": "checklist",
    "prompt": "Theo bài học của cả kho, gap lớn nhất lặp lại ở các baseline (gr2024, hasan2020, tasin2022) cần khắc phục là gì?",
    "options": [
      "Thiếu giao diện web đẹp",
      "Thiếu external validation trên cohort/bệnh viện độc lập (chỉ CV nội bộ trên một dataset nhỏ)",
      "Dùng quá nhiều metric",
      "Train quá lâu"
    ],
    "answer": 1,
    "explain": "K-fold CV chỉ kiểm tra ổn định nội bộ; toàn bộ baseline đều thiếu external/temporal validation trên cohort độc lập, nên chưa chứng minh được khả năng khái quát — gap lớn nhất cần bổ sung."
  }
];
