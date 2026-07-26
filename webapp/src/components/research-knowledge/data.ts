import {
  MdInfoOutline,
  MdLightbulbOutline,
  MdFactCheck,
  MdRocketLaunch,
  MdWarningAmber,
  MdInsights,
  MdChecklist,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

/* ============================================================
   Trang Kiến thức NCKH — "Xây dựng nghiên cứu khoa học có giá trị"
   Nội dung các chương 01-05 + lead chương 07 do workflow đa-agent
   soạn & KIỂM CHỨNG so với kho (verify: 0 issue, 9/9 card khớp).
   Chương 06 "Kinh nghiệm từ kho" KHÔNG nằm ở đây — đọc động từ
   /api/research-lessons để cập nhật liên tục theo từng bài mới.
   ============================================================ */

export interface Chapter {
  id: string;
  no: string; // "01".."07"
  label: string; // nhãn ngắn cho TOC
  hue: string; // var(--ch-*)
  Icon: IconType;
}

export const CHAPTERS: Chapter[] = [
  { id: 'overview', no: '01', label: 'Tổng quan', hue: 'var(--ch-blue)', Icon: MdInfoOutline },
  { id: 'meaningful', no: '02', label: 'Có ý nghĩa', hue: 'var(--ch-purple)', Icon: MdLightbulbOutline },
  { id: 'rigor', no: '03', label: 'Đúng chuẩn', hue: 'var(--ch-teal)', Icon: MdFactCheck },
  { id: 'value', no: '04', label: 'Tạo giá trị', hue: 'var(--ch-amber)', Icon: MdRocketLaunch },
  { id: 'pitfalls', no: '05', label: 'Bẫy & cờ đỏ', hue: 'var(--ch-red)', Icon: MdWarningAmber },
  { id: 'experience', no: '06', label: 'Kinh nghiệm từ kho', hue: 'var(--ch-green)', Icon: MdInsights },
  { id: 'checklist', no: '07', label: 'Checklist', hue: 'var(--ch-pink)', Icon: MdChecklist },
];

export const CHAPTER_BY_ID: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c]),
);

/* ---------- Nội dung tĩnh từng chương ---------- */

export interface ContentBlock {
  heading: string;
  body: string;
  items?: string[];
  evidence?: string[]; // paper_id / nguồn để dẫn chứng
}

export interface ChapterContent {
  lead: string;
  blocks: ContentBlock[];
  callout?: string;
}

export const CONTENT: Record<string, ChapterContent> = {
  "overview": {
    "lead": "Một nghiên cứu khoa học không bắt đầu bằng việc chọn mô hình, mà bằng một câu hỏi đáng hỏi. Từ câu hỏi đó, nó đi qua một vòng đời chặt chẽ: tìm khoảng trống, chọn dữ liệu, thiết kế phương pháp, đánh giá trung thực, giải thích kết quả, rồi mới công bố và triển khai để tạo tác động. Trang này dùng chính kho paper dự đoán đái tháo đường (ĐTĐ) của bạn làm ví dụ xuyên suốt — để thấy rõ một nghiên cứu \"đúng chuẩn\" (rigorous) và một nghiên cứu \"có giá trị\" (valuable) là hai điều khác nhau, và vì sao bạn cần cả hai.",
    "blocks": [
      {
        "heading": "Vòng đời một nghiên cứu: tám chặng nối liền nhau",
        "body": "Một nghiên cứu có giá trị thực tiễn đi qua tám chặng, mỗi chặng nuôi chặng sau. Bỏ qua hay làm ẩu một chặng thì các con số ở cuối, dù đẹp đến đâu, cũng mất ý nghĩa. Hãy hình dung cả đề tài dự đoán ĐTĐ của bạn nằm trên trục này.",
        "items": [
          "Câu hỏi: dùng FINER để xem có đáng làm và PICOTS để mô tả rõ quần thể, mô hình, outcome, thời điểm, bối cảnh và intended use",
          "Khoảng trống: cần bằng chứng từ review/guideline và nhiều nghiên cứu gần nhất, không chỉ trích một limitation đơn lẻ",
          "Dữ liệu: chọn nguồn phù hợp câu hỏi (PIMA 768 mẫu chỉ nữ Pima Indian là quá nhỏ để khái quát)",
          "Phương pháp: thiết kế pipeline tránh rò rỉ dữ liệu (data leakage) ngay từ thứ tự các bước",
          "Đánh giá: internal validation phù hợp, báo độ bất định; sau đó đánh giá temporal/external trên dữ liệu đại diện cho nơi định dùng",
          "Giải thích: SHAP/LIME giúp khảo sát hành vi mô hình, nhưng không chứng minh nhân quả, độ đúng hay độ tin cậy lâm sàng",
          "Công bố & triển khai: báo cáo minh bạch theo TRIPOD+AI, tự đánh giá theo PROBAST+AI, công khai code khi có thể",
          "Tác động: thay đổi một quyết định thật — sàng lọc ai, can thiệp ai — chứ không chỉ thắng trên bảng số liệu"
        ],
        "evidence": [
          "Hulley & Cummings — FINER (PMC11129835)",
          "Chalmers & Glasziou — Lancet 2009",
          "Collins et al. — TRIPOD+AI (BMJ 2024)"
        ]
      },
      {
        "heading": "\"Đúng chuẩn\" (rigorous): kết quả phải là thật trước khi bàn nó có ý nghĩa",
        "body": "Tính nghiêm cẩn là rào chắn đầu tiên: nếu ước lượng hiệu năng bị thiên lệch thì mọi diễn giải phía sau đều yếu. Một rủi ro lớn trong kho là data leakage — imputation, scaling, chọn feature hoặc oversampling học cả phần dữ liệu dùng để đánh giá. Accuracy rất cao trên PIMA không tự chứng minh có lỗi, nhưng là tín hiệu phải kiểm tra kỹ protocol, độ bất định và khả năng tái lập.",
        "items": [
          "Tách train/test TRƯỚC; mọi bước 'học' từ dữ liệu (impute, scale, oversample, select) nằm trong từng fold, chỉ trên train",
          "Báo metric theo intended use: discrimination, calibration và threshold metrics, kèm prevalence/uncertainty",
          "Chọn internal validation theo cỡ mẫu và mục tiêu; với dữ liệu nhỏ có thể dùng repeated CV hoặc bootstrap, còn model selection phải tách khỏi phần đánh giá cuối"
        ],
        "evidence": [
          "gr2024_random_oversampling_diabetes: 94% PIDD / 92% BRFSS (RF+Boruta, Tables 6-8) — gap ghi rõ rủi ro leakage nếu oversample trước split",
          "naz2020_deep_learning_pima: claim DL 98.07% nhưng confusion matrix tổng 207 mẫu không khớp split 80/20; DT 96.62% lệch mạnh baseline nên cần audit",
          "hasan2020_diabetes_prediction_ensembling: mốc hợp lý AUC 0.950, XGBoost 0.946±0.020 (5-fold stratified) với Sensitivity 0.789 / Specificity 0.934"
        ]
      },
      {
        "heading": "\"Có giá trị\" (valuable): đúng chuẩn vẫn chưa đủ để tạo tác động",
        "body": "Một nghiên cứu có thể làm đúng mà vẫn đóng góp ít nếu chỉ lặp lại điều đã biết. PIMA hữu ích để học hoặc kiểm tra code, nhưng khó nâng đỡ một tuyên bố mới chỉ nhờ nhích vài phần trăm accuracy. Giá trị đến từ câu hỏi có ích, thiết kế phù hợp và bằng chứng giúp quyết định tốt hơn. Decision Curve Analysis có thể ước tính net benefit theo các ngưỡng hợp lý, nhưng không thay thế nghiên cứu tác động thực tế.",
        "items": [
          "Novelty thật phải mang tính SỬA CHỮA: dữ liệu EHR thật thay vì PIMA, external validation thay vì single dataset, calibration + net benefit thay vì chỉ accuracy",
          "External/temporal validation: hiệu năng nội bộ cao chỉ là bằng chứng phát triển ban đầu, chưa đủ để triển khai",
          "Khả năng sử dụng + tái lập: workflow rõ, model card, code/version và đánh giá với người dùng mở đường cho nghiên cứu tác động"
        ],
        "evidence": [
          "tasin2022_diabetes_prediction_explainable: được promote dù accuracy 81% / AUC 0.84 thấp hơn baseline vì có SHAP+LIME, prototype và code; đây là bằng chứng khả thi ban đầu, không phải xác nhận triển khai lâm sàng",
          "lugner2024_top_ten_predictors: ROC-AUC 0.903 nhưng trên lệch ~2.7% thì Sensitivity chỉ 0.623, PR-AUC 0.291 — AUC cao gây ảo giác về giá trị lâm sàng",
          "Vickers & Elkin — Decision Curve Analysis (PMC6777022)"
        ]
      },
      {
        "heading": "Vì sao cần CẢ HAI — và đó là kim chỉ nam của trang này",
        "body": "Đúng chuẩn mà không có giá trị: một pipeline sạch sẽ chạy lại accuracy trên PIMA — tái lập được nhưng không ai cần. Có giá trị mà không đúng chuẩn: một mô hình 'sàng lọc ĐTĐ' hấp dẫn nhưng dính leakage — sẽ sụp đổ khi triển khai thật và có thể gây hại. Chỉ khi giao của hai điều kiện được thỏa, một con số như AUC mới đáng tin VÀ đáng dùng. Cả đề tài của bạn nên được lái theo trục này: trung thực trước, rồi mới đến hữu ích.",
        "evidence": [
          "Kapoor & Narayanan — Leakage and the reproducibility crisis (Patterns 2023)",
          "gr2024_random_oversampling_diabetes: 94% 'chỉ nên xem như sàng lọc, KHÔNG thay chẩn đoán y khoa'"
        ]
      }
    ],
    "callout": "Một mô hình đáng tin cần hai lớp bằng chứng: hiệu năng được ước lượng đúng và mục đích sử dụng có ích. Báo cáo minh bạch giúp người đọc kiểm tra hai lớp đó; bản thân một AUC đẹp hay một giao diện đẹp chưa đủ."
  },
  "meaningful": {
    "lead": "Một đề tài dự đoán đái tháo đường có giá trị không bắt đầu từ việc chọn mô hình, mà từ việc chọn đúng câu hỏi. Trước khi viết code, hãy hỏi: câu hỏi có khả thi, có mới và thay đổi được điều gì? PIMA đã được benchmark rất nhiều; thêm một so sánh model tương tự thường chỉ có giá trị học tập nếu không bổ sung câu hỏi, dữ liệu hoặc thiết kế mới.",
    "blocks": [
      {
        "heading": "Dùng FINER để chọn câu hỏi, PICOTS để đặc tả bài toán",
        "body": "FINER (Feasible, Interesting, Novel, Ethical, Relevant) giúp quyết định câu hỏi có đáng theo đuổi. Với mô hình dự đoán, PICOTS làm rõ Population, Index model, Comparator, Outcome, Timing, Setting và intended use. FINER là bộ lọc giá trị; PICOTS là bản đặc tả để tránh đổi câu hỏi sau khi nhìn dữ liệu.",
        "items": [
          "Feasible: kiểm tra dữ liệu có sẵn TRƯỚC — PIMA chỉ 768 mẫu, chỉ nữ Pima Indian, quá nhỏ để claim mạnh; cần cohort EHR/khảo sát lớn hơn.",
          "Novel: dùng EHR thật hoặc external validation thay vì lặp lại accuracy trên PIMA.",
          "Relevant: kết quả phải đổi được một quyết định lâm sàng (sàng lọc ai, can thiệp ai), không chỉ thắng trên bảng số.",
          "Ví dụ câu hỏi tốt: 'Trên người chưa chẩn đoán, một pipeline tránh leakage + calibration có cải thiện net benefit so với baseline lâm sàng (FINDRISC) ở ngưỡng sàng lọc 5–15% không?' thay vì 'model nào tốt nhất trên PIMA?'"
        ],
        "evidence": [
          "FINER — Back to the basics (PMC11129835)",
          "dinh2019_data_driven_nhanes",
          "lugner2024_top_ten_predictors"
        ]
      },
      {
        "heading": "Research gap cần bằng chứng tổng hợp, không chỉ một câu limitation",
        "body": "Một limitation của một bài có thể gợi ý khoảng trống, nhưng chưa đủ để chứng minh cả lĩnh vực đang thiếu. Hãy kiểm tra systematic/scoping review, guideline và nhiều nghiên cứu gần nhất; một nghiên cứu đơn lẻ vẫn có thể phát hiện gap thật nếu bằng chứng đủ mạnh. Quan trọng là mô tả gap cụ thể, có nguồn và liên hệ trực tiếp với câu hỏi của mình.",
        "items": [
          "Thiếu external validation: gr2024, hasan2020, tasin2022, khanam2021, naz2020 — đều chỉ test nội bộ trên một dataset (phần lớn là PIMA), không kiểm trên cohort/bệnh viện độc lập.",
          "Phụ thuộc dataset nhỏ + rủi ro leakage: PIMA 768 mẫu lặp đi lặp lại; nhiều bài oversample/impute/chọn feature trên toàn dataset.",
          "Thiếu clinical utility & calibration: hầu hết chỉ tối ưu accuracy/AUC, không có decision-curve hay calibration plot.",
          "Thiếu XAI có kiểm chứng: chỉ tasin2022 (SHAP+LIME) và một số bài Layer 4 chạm tới giải thích; phần lớn là 'hộp đen'.",
          "long_term_risk còn mỏng hơn cross-sectional trong kho; ngoài lugner2024 còn có fazakis2021 và các bài EHR forward, nhưng chất lượng và cửa sổ theo dõi không đồng đều."
        ],
        "evidence": [
          "Chalmers & Glasziou (Lancet 2009, PMID 19525005)",
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "lugner2024_top_ten_predictors",
          "dinh2019_data_driven_nhanes"
        ]
      },
      {
        "heading": "Novelty thật là 'corrective information gain', không phải +0.5% accuracy",
        "body": "Reviewer hiện đại đòi 'information gain' — một dịch chuyển kiểm chứng được trong hiểu biết của lĩnh vực, không chấp nhận cải tiến vụn vặt kiểu thêm một ensemble mới trên PIMA để nhích accuracy. Cảnh giác cả hai thái cực: 'Novelty Fallacy' (tưởng chỉ cần đụng chủ đề chưa ai làm là đủ) và 'gap giả' (bịa ra một khoảng trống tầm thường để claim mới). Đóng góp có ý nghĩa = SỬA ít nhất một lỗ hổng cụ thể đang kìm hãm lĩnh vực.",
        "items": [
          "Pipeline không-leakage + external validation trên EHR thật (thay vì single-dataset PIMA).",
          "Calibration + Decision Curve Analysis để ước tính net benefit tiềm năng theo ngưỡng, không chỉ discrimination.",
          "Mô hình rút gọn feature dễ đo (survey-only) giữ gần trọn độ chính xác — như dinh2019 no-lab AUC 0.862 vs with-lab 0.957, hay lugner2024 top-10 ROC-AUC 0.881 chỉ thua main 419-feature ~0.02.",
          "KHÔNG nên: thử thêm một biến thể model trên cùng PIMA, cùng protocol, không sửa lỗi nào."
        ],
        "evidence": [
          "Understanding Research Novelty (SSERR)",
          "dinh2019_data_driven_nhanes",
          "lugner2024_top_ten_predictors",
          "khanam2021_comparison_ml_pima"
        ]
      },
      {
        "heading": "Ý nghĩa lâm sàng khác ý nghĩa thống kê — và cao bất thường là cờ đỏ, không phải thành tích",
        "body": "Accuracy/AUC không trực tiếp cho biết mô hình có cải thiện quyết định. Decision Curve Analysis ước tính net benefit so với các chiến lược mặc định trên dải ngưỡng có ý nghĩa. Với PIMA, kết quả 94–98% cao hơn nhiều baseline quen thuộc nên cần audit leakage, split, duplicate, cách xử lý missing và khoảng tin cậy; không được kết luận lỗi chỉ từ một con số.",
        "items": [
          "AUC cao gây ảo giác trên dữ liệu lệch lớp: lugner2024 ROC-AUC 0.903 nhưng Sensitivity chỉ 0.623 (bỏ sót ~38% ca thật), Precision 0.207, PR-AUC 0.291.",
          "Cờ đỏ điển hình: naz2020 claim DL 98.07% và DT 96.62% (literature DT trên PIMA chỉ 73–78%), confusion matrix 207 mẫu không khớp split 80/20.",
          "Một baseline để đối chiếu: hasan2020 AUC 0.950 / XGBoost 0.946 ± 0.020 (5-fold stratified). Không dùng mốc này như trần hiệu năng tuyệt đối.",
          "Trong sàng lọc, thường ưu tiên sensitivity để giảm bỏ sót, nhưng false positive cũng gây chi phí và lo lắng; ngưỡng phải gắn với hậu quả, nguồn lực và calibration."
        ],
        "evidence": [
          "Vickers et al. DCA (PMC6777022)",
          "lugner2024_top_ten_predictors",
          "naz2020_deep_learning_pima",
          "hasan2020_diabetes_prediction_ensembling"
        ]
      },
      {
        "heading": "Phân biệt rõ horizon: sàng lọc hiện tại KHÁC dự đoán onset N năm",
        "body": "Một mô hình gán nhãn đồng thời với feature (cross-sectional) chỉ là công cụ sàng lọc người chưa chẩn đoán ở thời điểm hiện tại — KHÔNG phải 'dự đoán' bệnh sẽ khởi phát trong tương lai. Muốn 'dự đoán' đúng nghĩa phải có thiết kế prospective với outcome first-occurrence theo thời gian. Đặt sai horizon khiến cả câu hỏi mất ý nghĩa dù số liệu đẹp.",
        "items": [
          "Cross-sectional (sàng lọc): dinh2019 (NHANES) — phát hiện sớm người chưa chẩn đoán bằng chỉ số hiện tại, không có khoảng cách thời gian thật.",
          "Prospective (onset): lugner2024 — first-occurrence ICD-10 E11 trong 3650 ngày, median follow-up ~12 năm, mới là dự đoán incidence đúng nghĩa.",
          "Khi nhãn hiện tại được sinh từ chính một phép đo (vd glucose≥126), dùng cùng phép đo làm feature có thể tạo circularity. Với dự báo tương lai, glucose baseline có thể hợp lệ nếu đo trước outcome; cần báo rõ thời điểm và intended use."
        ],
        "evidence": [
          "dinh2019_data_driven_nhanes",
          "lugner2024_top_ten_predictors"
        ]
      }
    ],
    "callout": "Đừng bắt đầu bằng câu 'model nào cao nhất?'. Hãy bắt đầu bằng: mô hình phục vụ ai, dự đoán gì, tại thời điểm nào, và quyết định nào sẽ thay đổi nếu dự đoán đúng."
  },
  "rigor": {
    "lead": "Một con số đẹp chưa chắc là một ước lượng đáng tin. Cần kiểm tra thứ tự xử lý dữ liệu, cách tách model selection khỏi evaluation, metric, độ bất định và khả năng vận chuyển sang quần thể đích. Mục tiêu không phải làm số thấp đi, mà làm cho người đọc biết chính xác con số đo điều gì và sai số đến đâu.",
    "blocks": [
      {
        "heading": "Chống data leakage: mọi bước 'học' từ dữ liệu phải nằm SAU split và chỉ trên train",
        "body": "Đây là rào chắn số một, vì leakage làm số liệu phồng lên một cách giả tạo nhưng code vẫn 'chạy đúng'. Nguyên tắc: tách train/test trước, rồi mới impute, scale, chọn feature và oversample — và trong cross-validation, mọi bước này phải đặt bên trong từng fold (dùng Pipeline), không fit một lần trên toàn dữ liệu. Riêng oversampling (SMOTE/ADASYN/random oversampling) nếu làm trước split thì mẫu tổng hợp gần-trùng có thể rơi vào cả train lẫn test, gây thổi phồng mạnh nhất.",
        "items": [
          "Impute (đặc biệt giá trị 0 vô lý của PIMA ở Glucose/BloodPressure/Insulin/BMI) fit trên train fold, transform sang test",
          "Scaler (StandardScaler/MinMax) fit trên train fold",
          "Feature selection có dùng nhãn (Boruta, Mutual Information, tương quan Pearson) đặt trong vòng CV, không chạy trên toàn dataset",
          "Oversampling chỉ trên train; test giữ nguyên phân phối gốc và KHÔNG oversample",
          "Chỉ dùng feature thực sự có sẵn tại thời điểm dự đoán; kiểm proxy hậu-chẩn-đoán và circularity, đồng thời tách rõ kịch bản 'có lab' và 'không lab'"
        ],
        "evidence": [
          "gr2024_random_oversampling_diabetes (4 quy tắc chống leakage; random oversampling 'dễ overfit/leakage')",
          "khanam2021_comparison_ml_pima (imputation + Pearson tính trên toàn dataset → có nguy cơ leakage; mức ảnh hưởng chưa được định lượng)",
          "tasin2022_diabetes_prediction_explainable (làm đúng scaler/ADASYN fit-on-train, nhưng MI tính trên toàn dataset → leakage nhẹ)",
          "Kapoor & Narayanan, Patterns 2023 (taxonomy 8 loại leakage, 329 bài bị ảnh hưởng)"
        ]
      },
      {
        "heading": "Internal validation đúng cách: tách model selection khỏi evaluation",
        "body": "Một split ngẫu nhiên trên dataset nhỏ thường không ổn định. Repeated stratified K-fold, nested CV hoặc bootstrap có thể tận dụng dữ liệu tốt hơn, nhưng lựa chọn phụ thuộc mục tiêu và cỡ mẫu. Nếu dùng CV để tune/chọn model thì phải có vòng đánh giá độc lập; độ lệch chuẩn giữa fold mô tả dao động của phép chia chứ không phải lúc nào cũng là khoảng tin cậy.",
        "items": [
          "Dùng repeated CV/nested CV hoặc bootstrap khi dữ liệu phát triển nhỏ; giữ một test sạch nếu cỡ mẫu cho phép",
          "Báo estimate kèm uncertainty phù hợp (confidence interval hoặc phân phối bootstrap), không chỉ mean ± std giữa fold",
          "Chạy nhiều seed trên dữ liệu nhỏ để kiểm tra ổn định",
          "Kiểm tra tính nhất quán nội tại (vd confusion matrix phải khớp cỡ tập test)"
        ],
        "evidence": [
          "hasan2020_diabetes_prediction_ensembling (5-fold stratified, báo std rõ ràng)",
          "gr2024_random_oversampling_diabetes (10-fold CV: PIDD 94.03%, BRFSS 92.00%)",
          "khanam2021_comparison_ml_pima (NN báo 88.6% từ split 85/15 nhưng K-fold chỉ ~76% → chênh 12%)",
          "naz2020_deep_learning_pima (single split 80/20, confusion matrix tổng 207 mẫu không khớp 154, không mean±std)",
          "tasin2022_diabetes_prediction_explainable (single 8:2 holdout, không K-fold cho final → nên chạy nhiều seed báo mean±std)"
        ]
      },
      {
        "heading": "Chọn metric đúng cho dữ liệu lệch lớp — accuracy là metric yếu nhất",
        "body": "Trên dữ liệu mất cân bằng, accuracy có thể cao dù mô hình bỏ sót nhiều ca bệnh. Không có một bộ metric cố định cho mọi mục tiêu: nên báo discrimination (AUROC và thường AUPRC), calibration, sensitivity/specificity và PPV/NPV tại ngưỡng định dùng, kèm độ bất định. AUPRC và PPV phụ thuộc prevalence nên phải nêu rõ quần thể đánh giá.",
        "items": [
          "Chọn metric theo intended use và prevalence; không dừng ở accuracy hay AUROC",
          "Trong sàng lọc, sensitivity thường quan trọng nhưng phải báo cả false-positive burden, PPV và nguồn lực theo dõi",
          "Lưu ý 'best model' có thể đổi theo metric: cùng tasin2022, XGBoost+ADASYN thắng accuracy/F1 (81%/0.81) nhưng Bagging+SMOTE có AUC cao hơn (0.87 vs 0.84)"
        ],
        "evidence": [
          "hasan2020_diabetes_prediction_ensembling (AUC 0.950, Sensitivity 0.789, Specificity 0.934, DOR 66.234 — bộ metric y học đầy đủ)",
          "lugner2024_top_ten_predictors (ROC-AUC 0.903 & Accuracy 0.924 nhưng Sensitivity chỉ 0.623, Precision 0.207, PR-AUC 0.291 do imbalance ~2.7%)",
          "tasin2022_diabetes_prediction_explainable (Bagging+SMOTE AUC 0.87 vs XGBoost+ADASYN AUC 0.84)",
          "A Closer Look at AUROC and AUPRC under Class Imbalance, NeurIPS 2024"
        ]
      },
      {
        "heading": "External/temporal validation + calibration: chứng minh mô hình tổng quát hóa được",
        "body": "Internal CV chỉ kiểm tra overfitting nội bộ; muốn chứng minh khả năng khái quát (generalizability) phải có external validation (cohort khác địa điểm) hoặc temporal validation (cùng nơi, thời điểm khác). Ngoài discrimination (AUROC), phải đánh giá calibration: xác suất dự đoán '90% nguy cơ' phải đúng ~90% thực tế. Lưu ý quan trọng: 'sửa' lệch lớp bằng oversampling mạnh có thể làm HỎNG calibration mà không cải thiện AUROC — nên kiểm tra lại calibration sau khi resample.",
        "items": [
          "Thiếu external validation là gap lớn nhất, lặp lại ở hầu hết baseline trong kho",
          "External validation chỉ hợp lệ khi predictor, outcome, timing và setting được ánh xạ tương thích; không thể chuyển thẳng PIMA sang NHANES/EHR nếu định nghĩa khác nhau",
          "Bổ sung calibration plot + Brier score + calibration slope/intercept",
          "Phân biệt rõ horizon: cross-sectional (sàng lọc đồng thời) KHÁC long-term incidence (dự đoán onset N năm) — đặt đúng bài toán",
          "Nếu cohort kiểm định quá nhỏ thì trình bày như bằng chứng sơ bộ, không quá lời"
        ],
        "evidence": [
          "gr2024_random_oversampling_diabetes (gap: chưa external validation, chỉ PIDD 768 mẫu + BRFSS)",
          "hasan2020_diabetes_prediction_ensembling (chỉ PIMA, không external validation)",
          "dinh2019_data_driven_nhanes (chỉ 10-fold CV nội bộ NHANES, không external; nhãn cross-sectional)",
          "lugner2024_top_ten_predictors (UK Biobank prospective 10 năm; healthy-volunteer bias → generalizability hạn chế)",
          "tasin2022_diabetes_prediction_explainable (RTML private 203 mẫu, test ~40 mẫu → quá nhỏ để claim domain adaptation)"
        ]
      },
      {
        "heading": "Báo cáo theo TRIPOD+AI; đánh giá chất lượng bằng PROBAST+AI",
        "body": "TRIPOD+AI (BMJ 2024) là hướng dẫn báo cáo: giúp tác giả mô tả đầy đủ dữ liệu, outcome, model building và performance; tuân thủ checklist không tự đảm bảo nghiên cứu ít sai lệch. PROBAST+AI (BMJ 2025) mới là công cụ đánh giá quality, risk of bias và applicability. Code, seed, môi trường, data dictionary và model specification giúp tái lập, nhưng code public cũng không thay thế validation.",
        "items": [
          "Công bố code + seed cố định + GridSearchCV space và best params + phiên bản dataset",
          "Mô tả rõ thứ tự pipeline (split → impute → select → oversample → train) để loại nghi ngờ leakage",
          "Kèm model card nêu intended use, quần thể đích, hạn chế và các kiểm tra leakage",
          "Lưu artefact/model version và hướng dẫn chạy; hosting demo chỉ là phần trình diễn, không phải bằng chứng lâm sàng"
        ],
        "evidence": [
          "gr2024_random_oversampling_diabetes (has_code=false → reproducible medium dù pipeline mô tả rõ)",
          "khanam2021_comparison_ml_pima (không seed, không code, không nêu số fold → reproducible medium)",
          "hasan2020_diabetes_prediction_ensembling (code GitHub public → reproducible high, là baseline thật để đua)",
          "tasin2022_diabetes_prediction_explainable (code public 13⭐ nhưng RTML private + demo Heroku chết → reproducible medium)",
          "Collins et al., TRIPOD+AI statement, BMJ 2024"
        ]
      }
    ],
    "callout": "Accuracy rất cao trên PIMA là tín hiệu cần audit, không phải bằng chứng tự động của leakage. Phán quyết phải dựa vào pipeline, dữ liệu đánh giá độc lập, độ bất định và khả năng tái lập."
  },
  "value": {
    "lead": "Một mô hình đạt AUC đẹp nằm trong notebook chưa cứu được ai. Giá trị thực tiễn của một nghiên cứu dự đoán đái tháo đường (ĐTĐ) chỉ xuất hiện khi con số biến thành một quyết định: ai cần được sàng lọc, yếu tố nào nên thay đổi, bác sĩ có nên tin điểm nguy cơ này không. Chương này chỉ ra bốn cây cầu nối từ \"mô hình chạy được\" sang \"mô hình tạo khác biệt\": triển khai được, giải thích được, hành động được, và công bằng — khái quát được trên người thật.",
    "blocks": [
      {
        "heading": "Triển khai được: đưa mô hình ra khỏi notebook",
        "body": "Một prototype giúp kiểm tra luồng sử dụng, nhưng chưa đồng nghĩa đã triển khai lâm sàng. tasin2022 đi xa hơn nhiều baseline khi có website, ứng dụng Android, SHAP/LIME và code; tuy vậy nhóm thử nhỏ và demo không còn hoạt động nên bằng chứng mới ở mức khả thi ban đầu. Bước tiếp theo phải là usability, workflow integration, monitoring, bảo mật và đánh giá tác động — không chỉ đổi nhà cung cấp hosting.",
        "items": [
          "Có prototype và mô tả ai dùng, dùng lúc nào, hành động gì sau dự đoán",
          "Công khai code/model specification để hỗ trợ kiểm tra và tái lập — không coi số sao GitHub là bằng chứng chất lượng",
          "Lập kế hoạch versioning, monitoring drift, privacy và bảo trì trước khi gọi là deployable"
        ],
        "evidence": [
          "tasin2022_diabetes_prediction_explainable",
          "research.value: Interactive Diabetes Risk Prediction (Dash + SHAP/LIME, arXiv)"
        ]
      },
      {
        "heading": "Sàng lọc chi phí thấp: bỏ được xét nghiệm thì phủ được cộng đồng",
        "body": "Phát hiện sớm ĐTĐ ở tuyến cơ sở đòi hỏi công cụ rẻ, không cần lab. dinh2019 chứng minh mô hình chỉ dùng câu hỏi khảo sát (survey-only, không xét nghiệm máu) vẫn đạt AUC 0.862, so với 0.957 khi có lab — tức là đánh đổi ~0.10 AUC để có thể sàng lọc diện rộng không cần lấy máu. lugner2024 đi xa hơn: dùng SHAP rút từ 419 biến xuống top-10 yếu tố dễ đo (HbA1c, BMI, vòng eo, glucose, tiền sử gia đình, GGT, tỉ lệ eo-hông, HDL, tuổi, urate) mà ROC-AUC chỉ tụt nhẹ từ 0.903 xuống 0.881. Một mô hình vài biến dễ đo giữ gần trọn độ chính xác thì khả thi trên lâm sàng hơn hẳn mô hình hàng trăm biến.",
        "items": [
          "Cân nhắc một bản 'nhẹ' chỉ cần biến dễ thu thập (tuổi, BMI, vòng eo, tiền sử gia đình, lối sống) cho sàng lọc cộng đồng",
          "Song song một bản 'đầy đủ' dùng EHR/xét nghiệm cho tầng quyết định sau",
          "Báo cáo rõ cái giá phải trả khi bỏ lab (dinh2019: AUC 0.862 vs 0.957) để người đọc tự cân nhắc"
        ],
        "evidence": [
          "dinh2019_data_driven_nhanes",
          "lugner2024_top_ten_predictors"
        ]
      },
      {
        "heading": "Giải thích được là công cụ kiểm tra, không phải giấy chứng nhận tin cậy",
        "body": "SHAP/LIME có thể cho biết feature nào đang ảnh hưởng đến đầu ra của mô hình, nhưng lời giải thích có thể không ổn định và không chứng minh mô hình đúng, công bằng hay có ích. Top-feature trùng y văn chỉ là sanity check. Muốn biến giải thích thành khuyến nghị, cần bằng chứng nhân quả/lâm sàng độc lập; SHAP cao ở BMI không tự chứng minh rằng thay đổi BMI sẽ làm giảm đúng mức nguy cơ dự đoán.",
        "items": [
          "Kiểm tra fidelity/stability của lời giải thích, không chỉ vẽ một biểu đồ SHAP/LIME đẹp",
          "Tách rõ yếu tố thay đổi được (gợi ý can thiệp) khỏi yếu tố không đổi",
          "Ghi minh bạch: XAI giải thích hành vi MÔ HÌNH, không phải nguyên nhân BỆNH (lưu ý chốt của tasin2022)"
        ],
        "evidence": [
          "tasin2022_diabetes_prediction_explainable",
          "lugner2024_top_ten_predictors",
          "research.value: SMOTE + SHAP for Clinical Decision Support (PMC)"
        ]
      },
      {
        "heading": "Khái quát được và công bằng: giá trị chỉ thật trên người thật",
        "body": "Hiệu năng nội bộ thường phụ thuộc dataset và có thể thay đổi khi đánh giá ở nơi khác. Các baseline gr2024, hasan2020 và tasin2022 thiếu validation độc lập; PIMA chỉ gồm 768 phụ nữ từ 21 tuổi trở lên thuộc một quần thể đặc thù nên không đại diện cho mọi nơi. Trước triển khai cần external/temporal validation với cỡ mẫu đủ, báo uncertainty và kiểm tra subgroup performance; chênh lệch nhóm phải được diễn giải cùng sample size và case mix, không chỉ so số điểm thô.",
        "items": [
          "Cần ít nhất một external hoặc temporal validation trên cohort độc lập trước khi claim giá trị lâm sàng",
          "Báo cáo hiệu năng theo nhóm con (subgroup) để kiểm tra công bằng, không chỉ số tổng",
          "Khi cohort thực địa quá nhỏ (tasin2022: RTML 203 mẫu, ~40 mẫu test) thì trình bày như bằng chứng sơ bộ, không quá lời"
        ],
        "evidence": [
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling",
          "tasin2022_diabetes_prediction_explainable",
          "research.value: ML vs FINDRISC external validation (medRxiv)"
        ]
      },
      {
        "heading": "Đo đúng giá trị: Relevant, calibration và tác động lên quyết định",
        "body": "Relevant nghĩa là kết quả phải hỗ trợ một quyết định cụ thể. Cần báo calibration cùng discrimination; oversampling có thể làm xác suất lệch khỏi prevalence nên phải hiệu chỉnh/kiểm lại trên phân bố thật. Với sàng lọc, sensitivity thường được ưu tiên nhưng false positive vẫn tiêu tốn nguồn lực. Decision Curve Analysis ước tính net benefit theo ngưỡng, còn tác động lên hành vi và sức khoẻ cần nghiên cứu triển khai/prospective riêng.",
        "items": [
          "Đặt câu hỏi có người dùng cuối thật (vd: survey-only có sàng lọc tốt hơn FINDRISC ở quần thể X không?)",
          "Báo calibration + sensitivity ở ngưỡng lâm sàng, không chỉ accuracy/AUC",
          "Tránh research waste: không thêm một ensemble nữa trên PIMA chỉ để nhích accuracy"
        ],
        "evidence": [
          "research.value: FINER / Designing Clinical Research (PMC)",
          "research.value: TRIPOD+AI Statement",
          "research.value: ML vs FINDRISC (medRxiv)"
        ]
      }
    ],
    "callout": "Giá trị thật của nghiên cứu ĐTĐ không nằm ở accuracy cao nhất, mà ở việc mô hình triển khai được, giải thích được, hành động được và giữ được hiệu năng trên quần thể thật — đúng như lý do tasin2022 được chọn dù chỉ đạt 81% accuracy."
  },
  "pitfalls": {
    "lead": "Một con số khác thường cần được kiểm tra, không bị kết tội trước. Chương này dùng các paper trong kho để luyện cách audit: truy nguồn bảng, đối chiếu cỡ mẫu, xem pipeline có tách sạch dữ liệu hay không, và kiểm tra metric có phù hợp intended use không.",
    "blocks": [
      {
        "heading": "Cờ đỏ #1: Accuracy cao bất thường cần audit, không được kết luận vội",
        "body": "Trên PIMA, 96–98% cao hơn nhiều baseline phổ biến. Điều đó có thể do leakage, duplicate, cách chia thuận lợi, preprocessing khác, dữ liệu đã augment hoặc đơn giản là báo cáo sai — nhưng cũng có thể do bài toán/dataset không hoàn toàn giống nhau. Hãy kiểm tra protocol và uncertainty trước khi gọi là state-of-the-art hay gian lận.",
        "items": [
          "naz2020: DL 98.07% và Decision Tree 96.62% — lệch mạnh so với baseline DT thường gặp, nên cần kiểm tra dữ liệu/split thay vì coi là bất khả thi về mặt toán học.",
          "gr2024: 94% (PIDD) / 92% (BRFSS) cao bất thường so với baseline kinh điển PIMA ~77-85%; chính analysis cảnh báo leakage ngay sau khi nêu kết quả.",
          "Một baseline để đối chiếu là hasan2020: AUC 0.950 (ensemble) và XGBoost 0.946 ± 0.020; đây không phải trần hiệu năng tuyệt đối."
        ],
        "evidence": [
          "naz2020_deep_learning_pima",
          "gr2024_random_oversampling_diabetes",
          "hasan2020_diabetes_prediction_ensembling"
        ]
      },
      {
        "heading": "Cờ đỏ #2: Confusion matrix không khớp split + số liệu mâu thuẫn nội tại",
        "body": "Một mô hình đáng ngờ thường để lộ qua những con số không nhất quán với nhau. Hãy tự cộng lại tổng mẫu trong confusion matrix và đối chiếu với tỷ lệ split đã khai báo. Cũng cần để ý mâu thuẫn nội tại: nếu vài model nhảy gấp đôi gap còn một model vẫn ở mức bình thường thì rất khả nghi.",
        "items": [
          "naz2020: confusion matrix cả 4 model đều có tổng 207 mẫu, KHÔNG khớp 20% × 768 = 154 nếu split 80/20.",
          "naz2020: bỏ qua lỗi missing-as-zero kinh điển của PIMA (Glucose=0, BP=0, Insulin=0, BMI=0) khiến model học pattern giả.",
          "naz2020: NB vẫn ở mức bình thường 76.33% trong khi DT/ANN/DL nhảy gấp đôi gap — mâu thuẫn nội tại, dấu hiệu leakage."
        ],
        "evidence": [
          "naz2020_deep_learning_pima"
        ]
      },
      {
        "heading": "Cờ đỏ #3: Leakage do xử lý trên TOÀN dataset trước split",
        "body": "Đây là bẫy phổ biến vì code vẫn chạy. Mọi bước học tham số từ dữ liệu (imputation, scaling, chọn feature, oversampling) phải chỉ fit trên phần train của từng lần đánh giá. Mức thổi phồng không có con số cố định: có thể nhỏ hoặc rất lớn tuỳ dữ liệu và bước bị rò rỉ.",
        "items": [
          "khanam2021: mean imputation + Pearson feature selection tính trên TOÀN dataset trước split → có nguy cơ leakage; không thể suy ra mức thổi phồng chỉ từ mô tả.",
          "tasin2022: scaler và ADASYN chỉ fit trên train, nhưng Mutual Information lại tính trên toàn dataset → vẫn có nguy cơ leakage; mức ảnh hưởng chưa được định lượng.",
          "gr2024: nếu oversample/impute/Boruta thực hiện trước split, con số 94% sẽ bị thổi phồng — đây là cảnh báo số 1 khi tái lập.",
          "Quy tắc: split trước → (trong fold) impute → select feature → oversample → train; test giữ nguyên phân phối gốc, KHÔNG oversample."
        ],
        "evidence": [
          "khanam2021_comparison_ml_pima",
          "tasin2022_diabetes_prediction_explainable",
          "gr2024_random_oversampling_diabetes"
        ]
      },
      {
        "heading": "Cờ đỏ #4: Single split không CV — con số 'may rủi' chứ không phải khái quát",
        "body": "Một lần chia ngẫu nhiên trên dataset nhỏ có thể rất dao động. Repeated stratified K-fold, nested CV hoặc bootstrap giúp đánh giá độ ổn định, nhưng phải tách lựa chọn model khỏi đánh giá. Khi các cách đánh giá chênh lớn, hãy điều tra nguyên nhân và báo uncertainty thay vì chọn con số đẹp hơn.",
        "items": [
          "khanam2021: NN báo 88.6% từ split 85/15 (~105 mẫu test) nhưng K-fold cùng cấu hình chỉ ~76% — chênh 12% là dấu hiệu may rủi.",
          "naz2020: mọi metric chỉ 1 con số đơn từ single split 80/20, không mean±std, không AUC/ROC → không kiểm tra được overfit.",
          "tasin2022: dù là paper 'đầy đủ nhất' vẫn chỉ dùng single 8:2 holdout cho đánh giá cuối, không K-fold → metric dễ may rủi.",
          "Đối chiếu chuẩn: hasan2020 dùng stratified 5-fold báo std rõ ràng (XGBoost 0.946 ± 0.020)."
        ],
        "evidence": [
          "khanam2021_comparison_ml_pima",
          "naz2020_deep_learning_pima",
          "tasin2022_diabetes_prediction_explainable",
          "hasan2020_diabetes_prediction_ensembling"
        ]
      },
      {
        "heading": "Cờ đỏ #5: Accuracy/AUC cao che giấu Sensitivity & PR-AUC thấp trên dữ liệu lệch lớp",
        "body": "Với ĐTĐ lệch lớp, Accuracy và ROC-AUC có thể cao trong khi sensitivity hoặc PPV thấp. Cần báo AUPRC/precision, sensitivity, specificity và calibration tại prevalence/ngưỡng định dùng, kèm uncertainty. Không có một metric duy nhất đủ để quyết định mô hình tốt.",
        "items": [
          "lugner2024: ROC-AUC 0.903 và Accuracy 0.924 ấn tượng, NHƯNG trên cohort lệch ~2.7% thì Sensitivity chỉ 0.623 (bỏ sót ~38% ca thật), Precision 0.207, PR-AUC 0.291, F1 0.311.",
          "gr2024: best_metric chỉ nêu accuracy; chính analysis thừa nhận Precision/Recall/F1 từng cell không trích đủ → không thể kiểm chứng recall lớp bệnh.",
          "Nguyên nhân kèm theo ở lugner2024: downsampling 1:3 vứt mẫu + tối ưu theo ROC-AUC (không phải PR-AUC) → kéo Precision xuống. Hướng tốt hơn: SMOTE/cost-sensitive + threshold tuning theo PR-AUC."
        ],
        "evidence": [
          "lugner2024_top_ten_predictors",
          "gr2024_random_oversampling_diabetes",
          "dinh2019_data_driven_nhanes"
        ]
      }
    ],
    "callout": "Gặp accuracy rất cao trên PIMA: dừng lại và audit. Con số tự nó không chứng minh mô hình tốt cũng không chứng minh leakage; bằng chứng nằm ở thiết kế đánh giá, dữ liệu độc lập và khả năng tái lập."
  },
  "experience": {
    "lead": "Phần này đọc TRỰC TIẾP từ kho paper đã phân tích — mỗi khi bạn phân tích thêm một bài (sinh summary.json), kinh nghiệm ở đây tự cập nhật. Đây là \"trí nhớ sống\" của đề tài.",
    "blocks": []
  },
  "checklist": {
    "lead": "Trước khi gửi bài hay bảo vệ đề tài, hãy chạy qua danh sách kiểm tra này. Mỗi mục là một việc kiểm tra được, bao phủ câu hỏi, phương pháp, báo cáo và giá trị sử dụng. Tick hết là một lượt tự rà soát tốt, không bảo đảm bài sẽ qua phản biện.",
    "blocks": []
  }
};

/* ---------- Checklist (chương 07) ---------- */
export const CHECKLIST_ITEMS = [
  "Dùng FINER để chọn câu hỏi và PICOTS để đặc tả population, model, comparator, outcome, timing, setting, intended use",
  "Novelty là \"corrective information gain\" thật (EHR thật / external validation / calibration), không phải +x% accuracy trên PIMA",
  "Định nghĩa outcome, index time và prediction horizon; kiểm circularity theo thời điểm thay vì loại máy móc mọi biến glucose/HbA1c",
  "Split train/test TRƯỚC; impute/scale/feature-select/oversample chỉ trên train, trong từng fold CV",
  "Báo metric theo intended use: discrimination, calibration, threshold metrics và uncertainty; nêu prevalence khi báo AUPRC/PPV",
  "Tách model selection khỏi evaluation; chọn bootstrap/repeated CV/nested CV/hold-out theo cỡ mẫu và mục tiêu",
  "Truy nguồn mọi số liệu; accuracy rất cao trên PIMA là tín hiệu cần audit, không phải kết luận tự động",
  "Đánh giá calibration (calibration plot / Brier / slope) và kiểm lại sau khi oversampling",
  "Có external/temporal validation trên cohort độc lập, hoặc nêu rõ giới hạn nếu chưa có",
  "Báo hiệu năng theo nhóm con (giới/tuổi/sắc tộc) để kiểm công bằng (fairness)",
  "Nếu có XAI, kiểm fidelity/stability và ghi rõ giải thích mô hình, KHÔNG phải nhân quả; cân nhắc DCA cho net benefit",
  "Công khai code/model specification + seed + hyperparam + phiên bản; báo cáo theo TRIPOD+AI và tự audit bằng PROBAST+AI"
];

/* ============================================================
   Dữ liệu cho các widget tương tác (tất định, không random)
   ============================================================ */

/* --- FINER scorer (chương 02) --- */
export interface FinerCriterion {
  key: string;
  letter: string;
  label: string;
  desc: string;
}
export const FINER: FinerCriterion[] = [
  { key: 'F', letter: 'F', label: 'Feasible — Khả thi', desc: 'Có đủ dữ liệu, công cụ, thời gian để trả lời? Dataset tồn tại và truy cập được?' },
  { key: 'I', letter: 'I', label: 'Interesting — Đáng quan tâm', desc: 'Cộng đồng (lâm sàng/khoa học) có thật sự quan tâm câu trả lời?' },
  { key: 'N', letter: 'N', label: 'Novel — Mới', desc: 'Câu hỏi lấp một gap tập thể, không lặp lại điều đã biết rõ (corrective information gain).' },
  { key: 'E', letter: 'E', label: 'Ethical — Đạo đức', desc: 'Dữ liệu hợp pháp, đồng thuận, không gây hại; cân nhắc thiên lệch và công bằng.' },
  { key: 'R', letter: 'R', label: 'Relevant — Hữu ích', desc: 'Trả lời xong thì đổi được quyết định lâm sàng/chính sách nào, cho ai?' },
];

/* --- Leakage simulator (chương 03) --- */
export interface LeakStep {
  key: string;
  label: string;
  desc: string;
}
export const LEAK_STEPS: LeakStep[] = [
  { key: 'scale', label: 'Chuẩn hoá (scaling)', desc: 'Fit mean/std của scaler.' },
  { key: 'impute', label: 'Điền khuyết (impute)', desc: 'Tính median/mean để điền giá trị thiếu (kể cả giá trị 0 vô lý của PIMA).' },
  { key: 'select', label: 'Chọn đặc trưng (feature selection)', desc: 'Dùng nhãn để lọc/xếp hạng feature (Boruta/MI/Pearson).' },
  { key: 'sample', label: 'Cân bằng lớp (SMOTE/oversample)', desc: 'Sinh mẫu thiểu số nhân tạo — nguy hiểm nhất nếu làm trước split.' },
];

/* --- Value ladder (chương 04) --- */
export interface ValueRung {
  level: number;
  title: string;
  detail: string;
  example?: string;
}
export const VALUE_LADDER: ValueRung[] = [
  { level: 1, title: 'Mô hình chạy được', detail: 'Có dự đoán ra số, nhưng chưa biết tin được không.', example: 'Bất kỳ baseline nào' },
  { level: 2, title: 'Đánh giá trung thực', detail: 'Tách selection/evaluation, kiểm leakage, báo uncertainty.', example: 'hasan2020 (CV + AUC + code)' },
  { level: 3, title: 'Giải thích & kiểm tra được', detail: 'XAI có kiểm stability/fidelity; hiểu giới hạn và failure modes.', example: 'tasin2022 (bằng chứng ban đầu)' },
  { level: 4, title: 'Sẵn sàng đánh giá triển khai', detail: 'Prototype + workflow + privacy + monitoring + usability.', example: 'tasin2022 (web + Android, chưa lâm sàng)' },
  { level: 5, title: 'Chứng minh tác động', detail: 'Nghiên cứu prospective cho thấy quyết định hoặc kết cục tốt hơn.', example: 'Chưa có baseline nào trong kho đạt' },
];

/* ============================================================
   "Nhớ nhanh" (TL;DR) — đường đọc ngắn cho mỗi chương.
   gist = 1 câu cốt lõi; rules = 3 quy tắc dễ nhớ (cũng là phát
   biểu rõ ràng cho agent đọc về sau). Tất cả là bản NÉN của nội
   dung CONTENT đã kiểm chứng — không thêm số liệu mới.
   ============================================================ */
export interface ChapterTldr {
  gist: string;
  rules: string[];
}
export const TLDR: Record<string, ChapterTldr> = {
  overview: {
    gist: 'Nghiên cứu có giá trị = THẬT (đúng chuẩn) + HỮU ÍCH (đổi được quyết định). Thiếu một trong hai chỉ là bài tập kỹ thuật.',
    rules: [
      'Bắt đầu từ một câu hỏi đáng hỏi, không phải từ việc chọn model.',
      'Ước lượng hiệu năng đúng trước, rồi mới bàn tới giá trị sử dụng.',
      'Một con số chỉ đáng tin khi vừa thật vừa đổi được một quyết định lâm sàng.',
    ],
  },
  meaningful: {
    gist: 'Câu hỏi tốt SỬA một lỗ hổng tập thể của lĩnh vực — không phải nhích +x% accuracy trên PIMA.',
    rules: [
      'Dùng FINER để chọn câu hỏi, PICOTS để đặc tả bài toán trước khi chạm dữ liệu.',
      'Limitation là gợi ý; gap cần bằng chứng tổng hợp và liên hệ trực tiếp với câu hỏi.',
      'Accuracy cao bất thường là tín hiệu cần audit, không phải phán quyết.',
    ],
  },
  rigor: {
    gist: 'Ranh giới giữa "94% ấn tượng" và "94% ảo" nằm ở phương pháp: thứ tự xử lý, cách chia fold, metric, và kiểm định ngoài.',
    rules: [
      'Split TRƯỚC; impute/scale/select/oversample chỉ trên train, trong từng fold.',
      'Tách model selection khỏi evaluation; chọn CV/bootstrap/hold-out theo cỡ mẫu.',
      'Báo metric theo intended use, calibration và uncertainty; không chỉ accuracy.',
    ],
  },
  value: {
    gist: 'Giá trị = đưa mô hình ra khỏi notebook: triển khai được, giải thích được, hành động được, công bằng trên người thật.',
    rules: [
      'Sàng lọc rẻ có tiềm năng; XAI chỉ giải thích hành vi mô hình, không tự tạo niềm tin.',
      'Phải external/temporal validation trước khi dám claim giá trị lâm sàng.',
      'Đo net benefit (Decision Curve) + calibration, không chỉ AUC.',
    ],
  },
  pitfalls: {
    gist: 'Trong kho, con số đẹp nhất thường đáng ngờ nhất. Nhận diện 5 cờ đỏ trước khi tin bất kỳ kết quả nào.',
    rules: [
      'Accuracy rất cao trên PIMA = cần audit leakage, split, duplicate và uncertainty.',
      'Tự cộng confusion matrix và đối chiếu với split; nghi mọi số mâu thuẫn nội tại.',
      'AUC/Accuracy cao vẫn có thể che giấu Sensitivity & PR-AUC thấp.',
    ],
  },
  experience: {
    gist: 'Trí nhớ sống của đề tài: đọc trực tiếp từ kho và tự cập nhật mỗi khi bạn phân tích thêm một bài.',
    rules: [
      'Bài học lặp lại ở nhiều bài chính là cơ hội cải tiến lớn nhất.',
      'Học cả từ bài mạnh (baseline để đua) lẫn bài yếu (cờ đỏ cần tránh).',
      'Số liệu là LIVE — luôn phản ánh kho hiện tại, không phải bản chụp cũ.',
    ],
  },
  checklist: {
    gist: '12 mục là lượt tự rà soát trước phản biện; tick hết giúp giảm sót, không phải giấy bảo đảm chấp nhận.',
    rules: [
      'Mỗi mục là một việc KIỂM TRA ĐƯỢC, không phải khẩu hiệu.',
      'Trạng thái tick được lưu ngay trên máy bạn để dùng nhiều lần.',
      'Chưa tick hết thì chưa nên gửi bài hay bảo vệ đề tài.',
    ],
  },
};

/* --- Vòng đời nghiên cứu: 8 chặng (biểu diễn dạng dòng chảy) --- */
export interface LifeStage {
  no: number;
  label: string;
  one: string;
}
export const LIFECYCLE: LifeStage[] = [
  { no: 1, label: 'Câu hỏi', one: 'FINER để chọn, PICOTS để đặc tả' },
  { no: 2, label: 'Khoảng trống', one: 'Gap có bằng chứng, không chỉ 1 limitation' },
  { no: 3, label: 'Dữ liệu', one: 'Chọn nguồn hợp câu hỏi' },
  { no: 4, label: 'Phương pháp', one: 'Pipeline tránh data leakage' },
  { no: 5, label: 'Đánh giá', one: 'Validation + uncertainty + external' },
  { no: 6, label: 'Giải thích', one: 'Kiểm stability — không suy nhân quả' },
  { no: 7, label: 'Công bố', one: 'TRIPOD+AI + PROBAST+AI' },
  { no: 8, label: 'Tác động', one: 'Đổi một quyết định thật' },
];

/* --- Nên / Tránh (chương 03) — bảng đối lập dễ nhớ --- */
export const DO_DONT: { do: string[]; dont: string[] } = {
  do: [
    'Tách train/test TRƯỚC mọi bước học từ dữ liệu',
    'Đặt impute / scale / select / oversample trong từng fold CV',
    'Tách model selection khỏi evaluation và báo uncertainty',
    'Báo cáo TRIPOD+AI; audit bằng PROBAST+AI; công khai artefact',
  ],
  dont: [
    'Oversample / impute / chọn feature trên toàn dataset trước split',
    'Chọn và chấm model trên cùng dữ liệu',
    'Dừng ở accuracy khi dữ liệu lệch lớp',
    'Kết luận tốt/xấu chỉ từ accuracy rất cao trên PIMA',
  ],
};
