/**
 * Từ điển thuật ngữ chuyên ngành cho đề tài "sàng lọc ĐTĐ chưa được chẩn đoán
 * bằng biến không-xét-nghiệm" (đã chốt ở QA_LOG Q007).
 *
 * Mục tiêu: đọc paper mà gặp từ lạ thì tra ở đây, KHÔNG phải google.
 * Mỗi mục có: nghĩa tiếng Việt · giải thích dễ hiểu · vì sao nó quan trọng với
 * ĐỀ TÀI NÀY · bẫy hay gặp. `aliases` dùng để dò xem thuật ngữ có xuất hiện
 * trong `extracted.md` của paper đang mở hay không.
 *
 * Nguồn nội dung: AGENTS.md §1/§3b, TO_DO.md §3/§6/§10, CHEATSHEET.md, QA_LOG Q001–Q007.
 */

export type GlossaryGroupId =
  | 'metric'
  | 'leakage'
  | 'epi'
  | 'survey'
  | 'ml'
  | 'xai'
  | 'report'
  | 'data';

export interface GlossaryGroup {
  id: GlossaryGroupId;
  label: string;
  hint: string;
  /** id icon (react-icons) — map ở GlossaryPanel; KHÔNG dùng emoji làm icon chức năng */
  icon: GlossaryIconId;
}

export type GlossaryIconId =
  | 'metric'
  | 'leakage'
  | 'epi'
  | 'survey'
  | 'ml'
  | 'xai'
  | 'report'
  | 'data';

export const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    id: 'metric',
    label: 'Đo lường & đánh giá',
    hint: 'Các con số dùng để nói mô hình tốt hay dở',
    icon: 'metric',
  },
  {
    id: 'leakage',
    label: 'Rò rỉ & thiết kế thí nghiệm',
    hint: 'Vì sao nhiều bài báo có số đẹp mà không tin được — lõi của đề tài anh',
    icon: 'leakage',
  },
  {
    id: 'epi',
    label: 'Dịch tễ & lâm sàng ĐTĐ',
    hint: 'Từ vựng bác sĩ dùng: chẩn đoán, tiền ĐTĐ, tầm soát',
    icon: 'epi',
  },
  {
    id: 'survey',
    label: 'Khảo sát quốc gia',
    hint: 'NHANES/KNHANES không phải bảng Excel thường — có trọng số',
    icon: 'survey',
  },
  {
    id: 'ml',
    label: 'Mô hình & tiền xử lý',
    hint: 'Thuật toán và các bước xử lý dữ liệu',
    icon: 'ml',
  },
  {
    id: 'xai',
    label: 'Giải thích mô hình (XAI)',
    hint: 'Vì sao mô hình quyết định như vậy',
    icon: 'xai',
  },
  {
    id: 'report',
    label: 'Chuẩn báo cáo & phản biện',
    hint: 'Ngôn ngữ của reviewer — thứ quyết định bài được nhận hay không',
    icon: 'report',
  },
  {
    id: 'data',
    label: 'Bộ dữ liệu & loại dữ liệu',
    hint: 'Tên các bộ dữ liệu xuất hiện liên tục trong kho',
    icon: 'data',
  },
];

export interface GlossaryTerm {
  id: string;
  en: string;
  vi: string;
  group: GlossaryGroupId;
  /** 1 câu — đọc lướt là hiểu */
  short: string;
  /** 2–4 câu giải thích dễ hiểu */
  detail: string;
  /** Vì sao thuật ngữ này quan trọng với đề tài đã chốt */
  why?: string;
  /** Bẫy hay gặp / hiểu nhầm phổ biến */
  trap?: string;
  formula?: string;
  /** Chuỗi (lowercase) để dò trong extracted.md */
  aliases: string[];
  /** id thuật ngữ liên quan */
  see?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  /* ============================ ĐO LƯỜNG ============================ */
  {
    id: 'accuracy',
    en: 'Accuracy',
    vi: 'Độ chính xác (tỉ lệ đoán đúng)',
    group: 'metric',
    short: 'Đoán đúng bao nhiêu ca trên tổng số ca.',
    detail:
      'Cộng tất cả ca đoán đúng chia cho tổng số ca. Nghe hợp lý nhưng gần như vô dụng khi bệnh hiếm: ' +
      'nếu chỉ 4% dân số mắc ĐTĐ chưa chẩn đoán, một mô hình "đoán ai cũng không bệnh" đã đạt 96% accuracy ' +
      'mà không phát hiện được một ca nào.',
    formula: 'Accuracy = (TP + TN) / (TP + TN + FP + FN)',
    why:
      'Đề tài anh chính là chỉ ra rằng phần lớn con số 0.98–1.00 trong y văn là accuracy trên dữ liệu ép cân bằng 50/50 — ' +
      'không phải hiệu năng thật ở prevalence thật.',
    trap: 'Thấy accuracy cao mà không thấy prevalence và AUPRC đi kèm → nghi ngờ ngay.',
    aliases: ['accuracy', 'acc.', 'overall accuracy'],
    see: ['auprc', 'prevalence', 'class-imbalance'],
  },
  {
    id: 'confusion-matrix',
    en: 'Confusion matrix',
    vi: 'Ma trận nhầm lẫn',
    group: 'metric',
    short: 'Bảng 2×2 đếm 4 loại kết quả: TP, FP, TN, FN.',
    detail:
      'TP = có bệnh, đoán có bệnh. FN = có bệnh nhưng bỏ sót. FP = không bệnh nhưng báo động nhầm. ' +
      'TN = không bệnh, đoán đúng. Mọi metric khác đều tính ra từ 4 ô này.',
    why: 'Khi kiểm tra một bài báo, cộng 4 ô lại xem có khớp cỡ tập test không — đó là cách phát hiện naz2020 sai (tổng 207 mẫu trong khi split 80/20 phải ra ~154).',
    aliases: ['confusion matrix', 'true positive', 'false negative', 'false positive', 'true negative'],
    see: ['sensitivity', 'specificity'],
  },
  {
    id: 'sensitivity',
    en: 'Sensitivity / Recall / True Positive Rate',
    vi: 'Độ nhạy — bắt được bao nhiêu người thật sự có bệnh',
    group: 'metric',
    short: 'Trong 100 người thật sự mắc bệnh, mô hình gọi đúng được bao nhiêu.',
    detail:
      'Đây là metric quan trọng nhất của một công cụ TẦM SOÁT: bỏ sót một ca ĐTĐ nghĩa là người đó tiếp tục ' +
      'sống nhiều năm không biết mình bệnh. Đổi lại, muốn độ nhạy cao thì phải chấp nhận nhiều báo động nhầm.',
    formula: 'Sensitivity = TP / (TP + FN)',
    why: 'Bài của anh so ML với thang điểm lâm sàng — phải so ở CÙNG một mức độ nhạy, nếu không là so bừa.',
    aliases: ['sensitivity', 'recall', 'true positive rate', 'tpr', 'sn '],
    see: ['specificity', 'threshold', 'ppv'],
  },
  {
    id: 'specificity',
    en: 'Specificity / True Negative Rate',
    vi: 'Độ đặc hiệu — loại đúng bao nhiêu người không bệnh',
    group: 'metric',
    short: 'Trong 100 người khoẻ, mô hình để yên đúng được bao nhiêu.',
    detail:
      'Độ đặc hiệu thấp = gọi quá nhiều người khoẻ đi xét nghiệm. Trong tầm soát cộng đồng, mỗi phần trăm ' +
      'độ đặc hiệu mất đi là hàng nghìn lượt xét nghiệm thừa và tốn tiền thật.',
    formula: 'Specificity = TN / (TN + FP)',
    trap: 'Độ nhạy và độ đặc hiệu luôn đánh đổi nhau theo ngưỡng — báo cáo một cái mà giấu cái kia là thiếu trung thực.',
    aliases: ['specificity', 'true negative rate', 'tnr', 'sp '],
    see: ['sensitivity', 'threshold'],
  },
  {
    id: 'ppv',
    en: 'PPV / Precision',
    vi: 'Giá trị tiên đoán dương — báo động đúng bao nhiêu phần trăm',
    group: 'metric',
    short: 'Trong 100 người bị mô hình gắn cờ "nguy cơ", bao nhiêu người thật sự có bệnh.',
    detail:
      'PPV phụ thuộc RẤT NẶNG vào prevalence. Cùng một mô hình, dùng ở nơi 30% dân số mắc bệnh thì PPV có thể 60%, ' +
      'nhưng dùng ở cộng đồng chỉ 4% mắc thì PPV tụt còn ~15% — nghĩa là 85 trong 100 lượt gọi là báo động nhầm.',
    formula: 'PPV = TP / (TP + FP)',
    why:
      'Đây là con số bác sĩ quan tâm nhất và cũng là con số các bài PIMA giấu đi, vì họ ép dữ liệu về 50/50. ' +
      'zhang2020 báo PPV 28.83% ở prevalence ~9% — đó là cách báo cáo trung thực đáng bắt chước.',
    aliases: ['ppv', 'positive predictive value', 'precision'],
    see: ['prevalence', 'auprc'],
  },
  {
    id: 'npv',
    en: 'NPV',
    vi: 'Giá trị tiên đoán âm',
    group: 'metric',
    short: 'Trong 100 người mô hình nói "không sao", bao nhiêu người thật sự không sao.',
    detail:
      'Khi bệnh hiếm, NPV gần như luôn rất cao (95–99%) kể cả với mô hình tồi — vì đa số người thật sự không bệnh. ' +
      'Vì vậy NPV cao KHÔNG phải bằng chứng mô hình tốt.',
    formula: 'NPV = TN / (TN + FN)',
    trap: 'Bài nào khoe NPV 97% trên dữ liệu prevalence 5% là đang khoe một con số miễn phí.',
    aliases: ['npv', 'negative predictive value'],
    see: ['ppv', 'prevalence'],
  },
  {
    id: 'auroc',
    en: 'AUROC / AUC / C-statistic',
    vi: 'Diện tích dưới đường ROC — khả năng xếp hạng đúng',
    group: 'metric',
    short: 'Xác suất mô hình cho một người bệnh điểm cao hơn một người khoẻ chọn ngẫu nhiên.',
    detail:
      '0.5 = đoán mò, 1.0 = hoàn hảo. Ưu điểm: không phụ thuộc ngưỡng và không phụ thuộc prevalence. ' +
      'Nhược điểm: chính vì không phụ thuộc prevalence nên nó KHÔNG cho biết dùng thực tế có lợi hay không. ' +
      'Mô hình AUROC 0.90 vẫn có thể vô dụng lâm sàng nếu PPV chỉ 10%.',
    why: 'Mốc trong kho: dinh2019 no-lab 0.737 · zhang2020 no-lab 0.817 · sgchoi2023 external 0.819 · choi2014 external 0.731. Đây là dải anh phải so.',
    trap: 'AUROC gần như không nhúc nhích khi dữ liệu mất cân bằng, nên nó che giấu vấn đề — luôn kèm AUPRC.',
    aliases: ['auroc', 'auc', 'area under the curve', 'area under the receiver', 'roc curve', 'c-statistic', 'c statistic', 'aroc'],
    see: ['auprc', 'calibration', 'net-benefit'],
  },
  {
    id: 'auprc',
    en: 'AUPRC / PR-AUC / Average Precision',
    vi: 'Diện tích dưới đường Precision–Recall',
    group: 'metric',
    short: 'Như AUROC nhưng nhìn từ góc "báo động có đúng không" — phản ứng thật với bệnh hiếm.',
    detail:
      'Đường cơ sở của AUPRC chính bằng prevalence: dữ liệu 4% dương thì đoán mò được AUPRC 0.04. ' +
      'Nên AUPRC 0.29 trên prevalence 3% thật ra là tốt gấp ~10 lần đoán mò — trong khi AUROC cùng mô hình nghe rất "đẹp" (0.90).',
    why:
      'Grep toàn kho: chỉ ~3/35 bài báo PR-AUC. Đây là một trong những khe hở anh cắm cờ. ' +
      'lugner2024 là hình mẫu: Acc 0.92 nhưng PR-AUC 0.29.',
    trap: 'So AUPRC giữa hai dataset có prevalence khác nhau là so bừa — phải nêu kèm đường cơ sở.',
    aliases: ['auprc', 'pr-auc', 'pr auc', 'precision-recall curve', 'precision recall curve', 'average precision', 'aupr'],
    see: ['auroc', 'prevalence'],
  },
  {
    id: 'calibration',
    en: 'Calibration',
    vi: 'Hiệu chỉnh xác suất — "70%" có thật sự là 70% không',
    group: 'metric',
    short: 'Trong nhóm người được mô hình chấm 70% nguy cơ, có đúng khoảng 70% người mắc bệnh không.',
    detail:
      'Một mô hình có thể xếp hạng rất giỏi (AUROC cao) nhưng xác suất nó đưa ra lại lệch hoàn toàn — ' +
      'nói 70% trong khi thực tế chỉ 20%. Đo bằng calibration plot, calibration slope/intercept, hoặc Brier score. ' +
      'Sửa bằng Platt scaling hoặc isotonic regression.',
    why:
      'Bác sĩ ra quyết định dựa vào con số xác suất, không phải thứ hạng. Chỉ ~2/35 bài trong kho có calibration — ' +
      'khe hở thứ hai anh cắm cờ.',
    trap: 'Ép dữ liệu về 50/50 (undersampling) làm mọi xác suất bị thổi phồng có hệ thống — phải hiệu chỉnh lại về prevalence thật.',
    aliases: ['calibration', 'calibrated', 'calibration plot', 'calibration curve', 'platt scaling', 'isotonic'],
    see: ['brier', 'prevalence', 'net-benefit'],
  },
  {
    id: 'brier',
    en: 'Brier score',
    vi: 'Điểm Brier — sai số bình phương của xác suất',
    group: 'metric',
    short: 'Trung bình bình phương khoảng cách giữa xác suất dự đoán và kết quả thật (0/1). Càng nhỏ càng tốt.',
    detail:
      'Gộp cả khả năng phân biệt lẫn độ chuẩn của xác suất vào một số. Dễ tính, nhưng khi bệnh hiếm thì Brier ' +
      'luôn nhỏ nên phải so với Brier của mô hình "luôn đoán bằng prevalence" mới có nghĩa.',
    formula: 'Brier = (1/N) · Σ (p_i − y_i)²',
    aliases: ['brier'],
    see: ['calibration'],
  },
  {
    id: 'net-benefit',
    en: 'Decision Curve Analysis / Net benefit',
    vi: 'Phân tích đường quyết định — lợi ích ròng',
    group: 'metric',
    short: 'Trả lời câu "dùng mô hình này có lợi hơn không dùng gì / xét nghiệm tất cả không".',
    detail:
      'Quy đổi ca bắt được (TP) và ca báo động nhầm (FP) về cùng một thang, dựa trên ngưỡng nguy cơ mà bác sĩ ' +
      'chấp nhận. Vẽ ra thành đường: nếu đường của mô hình nằm dưới đường "xét nghiệm tất cả" thì mô hình vô dụng, ' +
      'dù AUROC có đẹp đến đâu.',
    formula: 'Net benefit = TP/N − FP/N × p_t/(1 − p_t)',
    why:
      '⭐ Grep toàn kho 35 bài: KHÔNG MỘT BÀI NÀO dùng DCA. Đây là bằng chứng gap mạnh nhất của anh vì nó đo được ' +
      'từ chính kho của anh, không phải mượn từ review người khác.',
    aliases: ['decision curve', 'net benefit', 'dca', 'decision curve analysis'],
    see: ['calibration', 'threshold'],
  },
  {
    id: 'threshold',
    en: 'Decision threshold / cut-off',
    vi: 'Ngưỡng quyết định',
    group: 'metric',
    short: 'Điểm cắt để biến xác suất thành quyết định "gọi đi xét nghiệm" hay "để yên".',
    detail:
      'Mô hình cho ra một số từ 0 đến 1; ngưỡng quyết định biến số đó thành hành động. Đổi ngưỡng là đổi toàn bộ ' +
      'độ nhạy/độ đặc hiệu/PPV — nên báo cáo hiệu năng mà không nói ngưỡng là báo cáo thiếu.',
    trap:
      'Chọn ngưỡng trên chính tập test rồi báo cáo hiệu năng ở ngưỡng đó = một dạng rò rỉ (vinh2026 mắc lỗi này). ' +
      'Ngưỡng phải chọn trên tập validation.',
    aliases: ['threshold', 'cut-off', 'cutoff', 'operating point'],
    see: ['youden', 'winners-curse'],
  },
  {
    id: 'youden',
    en: "Youden's J",
    vi: 'Chỉ số Youden',
    group: 'metric',
    short: 'Cách chọn ngưỡng "cân bằng": lấy điểm mà độ nhạy + độ đặc hiệu − 1 lớn nhất.',
    detail:
      'Tiện nhưng ngây thơ: nó giả định bỏ sót một ca bệnh và báo động nhầm một người khoẻ tốn kém như nhau — ' +
      'điều gần như không bao giờ đúng trong y khoa.',
    formula: 'J = Sensitivity + Specificity − 1',
    aliases: ["youden", 'youden index', "youden's j"],
    see: ['threshold', 'net-benefit'],
  },
  {
    id: 'f1',
    en: 'F1-score',
    vi: 'Điểm F1 — trung bình điều hoà của precision và recall',
    group: 'metric',
    short: 'Gộp PPV và độ nhạy thành một số.',
    detail:
      'Phổ biến trong ML nhưng ít dùng trong y khoa, vì nó bỏ qua hoàn toàn TN và ngầm coi precision với recall ' +
      'quan trọng ngang nhau. Với tầm soát, hai thứ đó không hề ngang nhau.',
    formula: 'F1 = 2 · (Precision · Recall) / (Precision + Recall)',
    aliases: ['f1-score', 'f1 score', 'f-measure', 'f-score', 'f1'],
    see: ['ppv', 'sensitivity'],
  },
  {
    id: 'mcc',
    en: 'MCC (Matthews correlation coefficient)',
    vi: 'Hệ số tương quan Matthews',
    group: 'metric',
    short: 'Một số duy nhất từ −1 đến 1, dùng được cả 4 ô của ma trận nhầm lẫn.',
    detail:
      'Ổn định hơn accuracy và F1 khi lớp mất cân bằng vì nó dùng cả TN. 0 = ngang đoán mò. Ít gặp trong y khoa ' +
      'nhưng hay gặp trong bài ML.',
    aliases: ['mcc', 'matthews correlation'],
    see: ['f1', 'kappa'],
  },
  {
    id: 'kappa',
    en: "Cohen's kappa",
    vi: 'Hệ số Kappa',
    group: 'metric',
    short: 'Mức độ đồng thuận sau khi trừ đi phần đồng thuận do may rủi.',
    detail: 'Hay dùng để so hai người chấm, đôi khi dùng cho mô hình. Cũng bị ảnh hưởng bởi prevalence.',
    aliases: ['kappa', 'cohen kappa'],
    see: ['mcc'],
  },
  {
    id: 'delong',
    en: 'DeLong test',
    vi: 'Kiểm định DeLong — so 2 AUROC có khác nhau thật không',
    group: 'metric',
    short: 'Cho biết chênh lệch AUROC giữa 2 mô hình trên CÙNG tập dữ liệu có ý nghĩa thống kê hay chỉ là may rủi.',
    detail:
      'Vì hai mô hình chấm trên cùng bệnh nhân nên sai số của chúng tương quan; DeLong xử lý đúng chỗ đó. ' +
      'Kết quả là một p-value và khoảng tin cậy cho hiệu AUROC.',
    why:
      'Claim C5 của anh — "khoảng cách ML vs thang điểm lâm sàng nhỏ hơn công bố" — cần chính xác kiểm định này. ' +
      'lai2019 là bài trong kho làm mẫu (GBM 84.7% vs LR 84.0%, p = 0.081 → KHÔNG khác nhau).',
    aliases: ['delong', "delong's test", 'delong test'],
    see: ['auroc', 'mcnemar', 'p-value'],
  },
  {
    id: 'mcnemar',
    en: "McNemar's test",
    vi: 'Kiểm định McNemar',
    group: 'metric',
    short: 'So hai mô hình phân loại trên cùng bộ dữ liệu, dựa trên các ca mà hai mô hình bất đồng.',
    detail:
      'Chỉ đếm các ca một mô hình đúng và mô hình kia sai. Đúng bản chất "so cặp" nên mạnh hơn việc chỉ so hai ' +
      'con số accuracy rời rạc.',
    why: 'nnamoko2020 dùng đúng cách này — chép nguyên protocol.',
    aliases: ['mcnemar'],
    see: ['delong'],
  },
  {
    id: 'ci',
    en: 'Confidence interval (CI)',
    vi: 'Khoảng tin cậy',
    group: 'metric',
    short: 'Dải giá trị hợp lý cho con số ước lượng, thường là 95%.',
    detail:
      'AUROC 0.82 (95% CI 0.79–0.85) nói lên nhiều hơn "AUROC 0.82" rất nhiều: nó cho biết cỡ mẫu có đủ không. ' +
      'Khoảng rộng = mẫu nhỏ = đừng tin con số điểm.',
    trap: 'Hai mô hình có CI chồng lấn nhau nhiều thường KHÔNG khác nhau — dù con số điểm chênh.',
    aliases: ['confidence interval', '95% ci', 'ci ='],
    see: ['p-value', 'delong'],
  },
  {
    id: 'p-value',
    en: 'p-value',
    vi: 'Trị số p',
    group: 'metric',
    short: 'Xác suất thấy chênh lệch lớn như quan sát nếu thật ra hai bên không khác nhau.',
    detail:
      'p < 0.05 chỉ nghĩa là "khó xảy ra do may rủi", KHÔNG nghĩa là chênh lệch đó quan trọng về lâm sàng. ' +
      'Với mẫu vài chục nghìn người, chênh lệch AUROC 0.003 cũng ra p < 0.001.',
    trap: 'Đừng để reviewer bắt được lỗi "có ý nghĩa thống kê" bị nhầm thành "có ý nghĩa lâm sàng".',
    aliases: ['p-value', 'p value', 'p <', 'p ='],
    see: ['ci', 'delong'],
  },

  /* ======================== RÒ RỈ & THIẾT KẾ ======================== */
  {
    id: 'data-leakage',
    en: 'Data leakage',
    vi: 'Rò rỉ dữ liệu',
    group: 'leakage',
    short: 'Thông tin của tập test lọt vào quá trình huấn luyện → số đẹp giả.',
    detail:
      'Xảy ra khi bất kỳ bước nào "nhìn thấy" dữ liệu test trước khi chấm điểm: chuẩn hoá trên toàn bộ dữ liệu, ' +
      'chọn feature trên toàn bộ dữ liệu, điền giá trị thiếu trước khi chia tập, SMOTE trước khi chia tập, ' +
      'chọn ngưỡng trên tập test. Kết quả luôn là hiệu năng cao hơn thực tế.',
    why: '⭐ Đây là trái tim đề tài anh. Bảng 3 (ablation 7 cấu hình) chứng minh chỉ cần cố ý vi phạm MỘT quy tắc là tái tạo được accuracy ~0.99 của y văn.',
    trap: 'Cách chặn duy nhất chắc chắn: chia fold từ dữ liệu GỐC trước, mọi bước xử lý đặt bên trong fold huấn luyện.',
    aliases: ['data leakage', 'leakage', 'leaky', 'information leak'],
    see: ['label-leakage', 'smote', 'nested-cv', 'winners-curse'],
  },
  {
    id: 'label-leakage',
    en: 'Label leakage / target leakage',
    vi: 'Rò rỉ nhãn — dùng chính thứ định nghĩa ra bệnh để đoán bệnh',
    group: 'leakage',
    short: 'Feature chứa (một phần) định nghĩa của nhãn → mô hình chỉ đang đọc lại định nghĩa.',
    detail:
      'Ví dụ kinh điển trong kho: nhãn ĐTĐ được định nghĩa bằng đường huyết đói ≥ 126 mg/dL, rồi chính đường huyết ' +
      'đói lại được đưa vào làm feature. Mô hình không học gì cả — nó chỉ so lại ngưỡng. Accuracy vọt lên 0.99 ' +
      'và không có ý nghĩa lâm sàng nào.',
    why:
      '⭐ Đề tài anh miễn nhiễm với bẫy này BY DESIGN: nhãn định nghĩa bằng xét nghiệm (HbA1c/FPG/OGTT), feature là ' +
      'no-lab → hai bên tách bạch về mặt cấu trúc, không phải nhờ tác giả cẩn thận.',
    trap: 'Nạn nhân trong kho: zou2018 (bỏ glucose thì ACC 0.808 → 0.710) · olisah2022 (relabel theo glucose rồi dùng glucose) · zhang2020 (urine glucose) · deberneh2021 (FPG) · lai2019 (FBS) · lugner2024 (HbA1c).',
    aliases: ['label leakage', 'target leakage', 'circularity', 'leaky by construction'],
    see: ['data-leakage', 'no-lab', 'label-definition'],
  },
  {
    id: 'train-val-test',
    en: 'Train / validation / test split',
    vi: 'Chia tập huấn luyện / kiểm định / kiểm tra',
    group: 'leakage',
    short: 'Ba tập với ba vai trò khác nhau — trộn lẫn là hỏng.',
    detail:
      'Train = học tham số. Validation = chọn mô hình, chọn siêu tham số, chọn ngưỡng. Test = CHỈ chấm điểm một lần ' +
      'cuối cùng, không được dùng để quyết định bất cứ điều gì. Rất nhiều bài chỉ có train/test rồi vừa chọn vừa chấm trên test.',
    why: 'QA_LOG Q003 đã chốt: chọn trên validation, báo cáo trên test chưa-đụng. Vi phạm = winner\'s curse.',
    aliases: ['train test split', 'training set', 'validation set', 'test set', 'holdout', 'hold-out'],
    see: ['winners-curse', 'nested-cv'],
  },
  {
    id: 'cross-validation',
    en: 'K-fold cross-validation',
    vi: 'Kiểm định chéo K-lớp',
    group: 'leakage',
    short: 'Chia dữ liệu thành K phần, lần lượt lấy 1 phần làm test, K−1 phần làm train, rồi lấy trung bình.',
    detail:
      'Dùng hết dữ liệu và cho biết độ biến thiên (mean ± std) thay vì một con số may rủi. "Stratified" nghĩa là ' +
      'mỗi fold giữ đúng tỉ lệ bệnh/không bệnh — bắt buộc khi dữ liệu mất cân bằng.',
    trap:
      'CV chỉ có giá trị nếu MỌI bước tiền xử lý nằm trong fold. CV chạy trên dữ liệu đã SMOTE/đã chuẩn hoá sẵn ' +
      'là CV giả. Và một bài chỉ báo 1 lần split cố định (kaliappan2024, nipa2023) thì con số 0.99 không có phương sai để tin.',
    aliases: ['cross-validation', 'cross validation', 'k-fold', 'kfold', '10-fold', '5-fold', 'stratified'],
    see: ['nested-cv', 'data-leakage'],
  },
  {
    id: 'nested-cv',
    en: 'Nested cross-validation',
    vi: 'Kiểm định chéo lồng nhau',
    group: 'leakage',
    short: 'CV bên trong để chọn siêu tham số, CV bên ngoài để chấm điểm — hai vòng tách bạch.',
    detail:
      'Cách chuẩn nhất để vừa tune vừa ước lượng hiệu năng không thiên lệch. Tốn thời gian gấp K lần nhưng với ' +
      'dữ liệu tabular vài chục nghìn dòng thì laptop vẫn chạy được.',
    aliases: ['nested cross-validation', 'nested cv', 'inner loop', 'outer loop'],
    see: ['cross-validation', 'winners-curse'],
  },
  {
    id: 'winners-curse',
    en: "Winner's curse / selection bias in model selection",
    vi: 'Lời nguyền kẻ thắng',
    group: 'leakage',
    short: 'Chạy N mô hình rồi lấy mô hình tốt nhất TRÊN CHÍNH tập test → con số bị thổi phồng có hệ thống.',
    detail:
      'Càng thử nhiều mô hình, mô hình "thắng" càng có khả năng thắng nhờ hợp với nhiễu ngẫu nhiên của đúng tập test đó. ' +
      'Đem sang dữ liệu mới là tụt.',
    why:
      '⭐ QA_LOG Q003 — chính câu hỏi anh từng hỏi. Đây là dòng E của Bảng 3 trong bài anh: đo xem "chọn best trên test" ' +
      'thổi phồng bao nhiêu điểm AUROC.',
    trap: 'Lúc PHÁT TRIỂN mới chọn được best (vì có nhãn); lúc dự đoán bệnh nhân MỚI phải KHOÁ một mô hình duy nhất.',
    aliases: ["winner's curse", 'winners curse', 'optimism', 'optimistic estimate', 'model selection bias'],
    see: ['train-val-test', 'nested-cv'],
  },
  {
    id: 'overfitting',
    en: 'Overfitting',
    vi: 'Quá khớp',
    group: 'leakage',
    short: 'Mô hình học thuộc cả nhiễu của dữ liệu huấn luyện nên tổng quát kém.',
    detail:
      'Dấu hiệu: hiệu năng train rất cao, hiệu năng test thấp hơn nhiều. Với dữ liệu nhỏ (PIMA 768 mẫu) và mô hình ' +
      'phức tạp thì gần như chắc chắn xảy ra.',
    trap: 'Overfitting KHÁC leakage: overfitting làm test thấp; leakage làm test cao GIẢ. Leakage nguy hiểm hơn vì trông như thành công.',
    aliases: ['overfitting', 'overfit', 'over-fitting'],
    see: ['data-leakage', 'regularization'],
  },
  {
    id: 'external-validation',
    en: 'External validation',
    vi: 'Kiểm định ngoại — thử trên quần thể/thời điểm khác',
    group: 'leakage',
    short: 'Huấn luyện trên tập A, chấm điểm trên tập B thu ở nơi khác hoặc thời điểm khác, hoàn toàn độc lập.',
    detail:
      'Có ba mức: (1) temporal — cùng nơi, giai đoạn sau; (2) geographic/cross-population — quần thể khác; ' +
      '(3) hoàn toàn độc lập nhóm nghiên cứu khác. Mức 2–3 là thứ reviewer thật sự coi trọng.',
    why:
      'Bằng chứng gap citable: chỉ 8–31% nghiên cứu dự đoán ĐTĐ có external validation; Endocrine Connections 2025 đếm 21/97 mô hình. ' +
      'sgchoi2023 chỉ external theo THỜI GIAN trong cùng Hàn Quốc — anh vượt bằng external theo QUẦN THỂ.',
    trap: 'Quy tắc cứng của anh: cohort external KHÔNG được đụng vào trước Phase 3. Đụng sớm là mất tính độc lập.',
    aliases: ['external validation', 'external cohort', 'temporal validation', 'geographic validation', 'independent validation'],
    see: ['dataset-shift', 'generalizability'],
  },
  {
    id: 'dataset-shift',
    en: 'Dataset shift / distribution shift',
    vi: 'Dịch chuyển phân bố dữ liệu',
    group: 'leakage',
    short: 'Dữ liệu nơi triển khai khác dữ liệu nơi huấn luyện → mô hình tụt hiệu năng.',
    detail:
      'Quần thể khác nhau thật: tuổi, BMI, chủng tộc, tỉ lệ mắc, cách đo. Nên "mô hình tốt ở viện A tụt ở viện B" là ' +
      'chuyện bình thường chứ không phải lỗi lập trình.',
    why: 'QA_LOG Q004: chọn mô hình theo quần thể là hợp lý, NHƯNG phải (a) hiểu vì sao, (b) không cherry-pick, (c) giới hạn phạm vi tuyên bố.',
    aliases: ['dataset shift', 'distribution shift', 'domain shift', 'covariate shift'],
    see: ['external-validation', 'generalizability'],
  },
  {
    id: 'generalizability',
    en: 'Generalizability',
    vi: 'Khả năng tổng quát hoá',
    group: 'leakage',
    short: 'Mô hình còn dùng được cho ai, ở đâu.',
    detail:
      'UK Biobank chủ yếu người da trắng Anh khoẻ mạnh tự nguyện (healthy-volunteer bias); PIMA chỉ phụ nữ Pima; ' +
      'KNHANES chỉ người Hàn. Kết luận phải giới hạn đúng trong quần thể đã kiểm chứng.',
    aliases: ['generalizability', 'generalisability', 'generalization', 'transportability'],
    see: ['dataset-shift', 'external-validation'],
  },
  {
    id: 'ablation',
    en: 'Ablation study',
    vi: 'Nghiên cứu bóc tách — bỏ đi từng thành phần xem ảnh hưởng bao nhiêu',
    group: 'leakage',
    short: 'Cùng dữ liệu, cùng mô hình, mỗi dòng chỉ đổi ĐÚNG một thứ.',
    detail:
      'Cách duy nhất để nói "yếu tố X đóng góp bao nhiêu" một cách có bằng chứng, thay vì đoán.',
    why:
      '⭐ Bảng 3 của bài anh chính là một ablation rò rỉ 7 cấu hình. Dòng F cố ý vi phạm 1 quy tắc và tái tạo ~0.99 — ' +
      'đó là lúc anh giải thích được luôn con số của olisah2022 / naz2020 / kaliappan2024 / abnoosian2023.',
    aliases: ['ablation', 'ablation study', 'ablation analysis'],
    see: ['data-leakage', 'baseline'],
  },

  /* ==================== DỊCH TỄ & LÂM SÀNG ĐTĐ ==================== */
  {
    id: 'prevalence',
    en: 'Prevalence',
    vi: 'Tỉ lệ hiện mắc — bao nhiêu phần trăm dân số đang mắc',
    group: 'epi',
    short: 'Số người đang mắc bệnh chia cho tổng dân số, tại một thời điểm.',
    detail:
      'Prevalence quyết định PPV và đường cơ sở của AUPRC. Ép dữ liệu về 50/50 để "cân bằng lớp" là tự tạo ra một ' +
      'thế giới không tồn tại, và mọi con số PPV/accuracy sau đó đều vô nghĩa với thực tế.',
    why:
      'Kết quả thật của anh: NHANES prevalence ĐTĐ chưa chẩn đoán = 6.21% thô, nhưng 3.91% khi có trọng số khảo sát. ' +
      'Chênh 2.30 điểm % = sai hơn 50% tương đối. Đây là đóng góp P1.',
    aliases: ['prevalence'],
    see: ['incidence', 'survey-weights', 'ppv', 'class-imbalance'],
  },
  {
    id: 'incidence',
    en: 'Incidence',
    vi: 'Tỉ lệ mới mắc — bao nhiêu người MỚI mắc trong một khoảng thời gian',
    group: 'epi',
    short: 'Số ca mới xuất hiện trong N năm, tính trên nhóm ban đầu chưa mắc.',
    detail:
      'Khác prevalence ở chữ "mới". Muốn đo incidence phải theo dõi người ta qua thời gian (cohort dọc) — ' +
      'không làm được từ một lần khảo sát cắt ngang.',
    why: 'Phân biệt incidence/prevalence chính là ranh giới giữa `long_term_risk` và `cross_sectional` trong kho của anh (AGENTS.md §3b).',
    aliases: ['incidence', 'incident diabetes', 'new-onset', 'onset'],
    see: ['prevalence', 'cohort', 'horizon'],
  },
  {
    id: 'undiagnosed',
    en: 'Undiagnosed diabetes',
    vi: 'ĐTĐ chưa được chẩn đoán',
    group: 'epi',
    short: 'Người đã đủ tiêu chuẩn xét nghiệm là ĐTĐ nhưng chưa từng được bác sĩ nói là mình bị.',
    detail:
      'Xác định bằng cách: xét nghiệm dương (HbA1c ≥ 6.5% hoặc FPG ≥ 126 mg/dL) NHƯNG tự khai chưa từng được chẩn đoán ' +
      'và không dùng thuốc hạ đường huyết. Khoảng 1/4 số người mắc ĐTĐ ở Mỹ thuộc nhóm này.',
    why: '⭐ Đây chính là NHÃN của đề tài anh. Nó tách bạch hoàn toàn với feature no-lab → leakage-safe theo cấu trúc.',
    aliases: ['undiagnosed diabetes', 'undiagnosed', 'unrecognized diabetes', 'previously undiagnosed'],
    see: ['no-lab', 'label-definition', 'screening'],
  },
  {
    id: 'prediabetes',
    en: 'Prediabetes / IFG / IGT',
    vi: 'Tiền đái tháo đường',
    group: 'epi',
    short: 'Đường huyết cao hơn bình thường nhưng chưa tới ngưỡng ĐTĐ.',
    detail:
      'IFG (impaired fasting glucose) = đường huyết đói 100–125 mg/dL. IGT (impaired glucose tolerance) = đường huyết ' +
      '2 giờ sau uống đường 140–199 mg/dL. HbA1c 5.7–6.4%. Ba tiêu chí này KHÔNG trùng nhau — chọn tiêu chí nào là một quyết định phải nêu rõ.',
    trap: 'choi2014 chỉ dùng IFG (một lần FPG) nên bỏ sót nhóm IGT — điểm yếu tác giả tự thừa nhận.',
    aliases: ['prediabetes', 'pre-diabetes', 'impaired fasting glucose', 'ifg', 'impaired glucose tolerance', 'igt'],
    see: ['ada-criteria', 'hba1c'],
  },
  {
    id: 'ada-criteria',
    en: 'ADA diagnostic criteria',
    vi: 'Tiêu chuẩn chẩn đoán của Hiệp hội ĐTĐ Hoa Kỳ',
    group: 'epi',
    short: 'HbA1c ≥ 6.5% · FPG ≥ 126 mg/dL · OGTT 2h ≥ 200 mg/dL · hoặc đường huyết ngẫu nhiên ≥ 200 kèm triệu chứng.',
    detail:
      'Chỉ cần thoả một tiêu chí là chẩn đoán (về nguyên tắc cần lặp lại lần 2 để xác nhận, nhưng khảo sát cắt ngang ' +
      'chỉ đo một lần). Chọn tiêu chí nào sẽ ra tỉ lệ mắc khác nhau đáng kể.',
    why: 'Anh phải nêu rõ trong Methods dùng tiêu chí nào và vì sao — reviewer sẽ hỏi ngay câu này.',
    aliases: ['american diabetes association', 'ada criteria', 'ada guideline', 'diagnostic criteria'],
    see: ['hba1c', 'fpg', 'ogtt', 'label-definition'],
  },
  {
    id: 'hba1c',
    en: 'HbA1c',
    vi: 'Huyết sắc tố glycat hoá (đường huyết trung bình 2–3 tháng)',
    group: 'epi',
    short: 'Phần trăm hemoglobin bị gắn đường — phản ánh đường huyết trung bình 2–3 tháng qua.',
    detail:
      'Ưu điểm: không cần nhịn ăn, ít dao động theo ngày. Ngưỡng ĐTĐ ≥ 6.5%, tiền ĐTĐ 5.7–6.4%. ' +
      'Nhược điểm: sai lệch ở người thiếu máu, bệnh thận, một số chủng tộc.',
    trap: 'HbA1c là biến ĐỊNH NGHĨA NHÃN trong đề tài anh → TUYỆT ĐỐI không được nằm trong feature.',
    aliases: ['hba1c', 'a1c', 'glycated hemoglobin', 'glycohemoglobin', 'lbxgh'],
    see: ['ada-criteria', 'no-lab', 'label-leakage'],
  },
  {
    id: 'fpg',
    en: 'FPG / FBS (fasting plasma glucose)',
    vi: 'Đường huyết lúc đói',
    group: 'epi',
    short: 'Đường huyết đo sau khi nhịn ăn ít nhất 8 tiếng. Ngưỡng ĐTĐ ≥ 126 mg/dL (7.0 mmol/L).',
    detail:
      'Rẻ và phổ biến nhất, nhưng đòi hỏi nhịn ăn và dao động khá nhiều giữa các lần đo.',
    trap: 'Biến định nghĩa nhãn — không được làm feature. Đây chính là chỗ zou2018, deberneh2021, lai2019 mắc lỗi.',
    aliases: ['fasting plasma glucose', 'fasting blood glucose', 'fpg', 'fbs', 'fasting glucose', 'lbxglu'],
    see: ['ada-criteria', 'label-leakage'],
  },
  {
    id: 'ogtt',
    en: 'OGTT',
    vi: 'Nghiệm pháp dung nạp glucose đường uống',
    group: 'epi',
    short: 'Uống 75g đường rồi đo đường huyết sau 2 giờ. Ngưỡng ĐTĐ ≥ 200 mg/dL.',
    detail:
      'Nhạy nhất trong 3 tiêu chí (bắt được nhiều ca nhất) nhưng tốn 2 tiếng của bệnh nhân nên ít được làm trong ' +
      'thực hành thường quy và trong nhiều khảo sát.',
    aliases: ['ogtt', 'oral glucose tolerance', '2-hour glucose', 'glucose tolerance test'],
    see: ['ada-criteria', 'prediabetes'],
  },
  {
    id: 'no-lab',
    en: 'Non-laboratory / non-invasive features',
    vi: 'Biến không-xét-nghiệm (no-lab)',
    group: 'epi',
    short: 'Chỉ dùng thứ đo được mà không cần lấy máu: tuổi, giới, BMI, vòng eo, huyết áp, tiền sử gia đình, hút thuốc, vận động.',
    detail:
      'Ý nghĩa thực tế: một trạm y tế xã không có máy xét nghiệm vẫn dùng được mô hình. Ý nghĩa khoa học: nhãn ' +
      'được định nghĩa bằng xét nghiệm, feature thì không có xét nghiệm nào → không thể rò rỉ nhãn.',
    why:
      '⭐ Đây là lựa chọn cốt lõi làm đề tài anh "leakage-safe theo cấu trúc, không phải theo cố gắng của tác giả". ' +
      'Mốc so sánh: dinh2019 có-lab 0.957 → no-lab 0.737.',
    aliases: ['non-laboratory', 'non laboratory', 'no-lab', 'nonlaboratory', 'non-invasive', 'noninvasive', 'survey-only', 'questionnaire-based'],
    see: ['undiagnosed', 'label-leakage', 'findrisc'],
  },
  {
    id: 'label-definition',
    en: 'Label / outcome definition',
    vi: 'Định nghĩa nhãn',
    group: 'epi',
    short: 'Chính xác thì "có bệnh" trong bài này nghĩa là gì.',
    detail:
      'Phải viết ra được thành một câu kiểm chứng được: ví dụ "HbA1c ≥ 6.5% HOẶC FPG ≥ 126, VÀ tự khai chưa từng ' +
      'được chẩn đoán, VÀ không dùng thuốc hạ đường huyết". Đổi định nghĩa là đổi toàn bộ kết quả.',
    why: 'Đây là việc đầu tiên anh đã làm xong trong src/build_nhanes.py — và kiểm tra tự động rằng không biến định-nghĩa-nhãn nào lọt vào feature.',
    aliases: ['outcome definition', 'case definition', 'label definition', 'diabetes was defined'],
    see: ['ada-criteria', 'label-leakage', 'undiagnosed'],
  },
  {
    id: 'screening',
    en: 'Screening / opportunistic screening',
    vi: 'Tầm soát / tầm soát cơ hội',
    group: 'epi',
    short: 'Tìm bệnh ở người CHƯA có triệu chứng, chưa đi khám vì bệnh đó.',
    detail:
      '"Cơ hội" nghĩa là tận dụng lúc người ta đến khám vì lý do khác. Công cụ tầm soát chỉ cần gắn cờ để đi xét nghiệm ' +
      'xác nhận, không phải chẩn đoán — nên ưu tiên độ nhạy và chấp nhận PPV thấp.',
    aliases: ['screening', 'opportunistic screening', 'mass screening', 'case finding'],
    see: ['undiagnosed', 'sensitivity', 'findrisc'],
  },
  {
    id: 'findrisc',
    en: 'FINDRISC / ADA risk test',
    vi: 'Thang điểm nguy cơ ĐTĐ (đối thủ cần vượt)',
    group: 'epi',
    short: 'Bảng cộng điểm giấy-bút do bác sĩ dùng: tuổi, BMI, vòng eo, vận động, rau quả, thuốc huyết áp, đường huyết cao, tiền sử gia đình.',
    detail:
      'FINDRISC (Phần Lan) và ADA Diabetes Risk Test là chuẩn thực hành hiện tại. Chúng đơn giản, miễn phí, ' +
      'không cần máy tính, và hiệu năng thường ~AUROC 0.72–0.78.',
    why:
      '⭐ Đây là baseline mà bài anh PHẢI so. Đối thủ gần nhất (medRxiv 2025.09.05.25335151) đã kết luận "không có dữ liệu ' +
      'xét nghiệm thì FINDRISC ngang hoặc hơn ML" — nhưng chỉ như một nhận xét phụ. Anh biến nó thành kết quả chính có định lượng.',
    aliases: ['findrisc', 'finnish diabetes risk score', 'ada risk test', 'risk score', 'clinical risk score'],
    see: ['no-lab', 'net-benefit', 'baseline'],
  },
  {
    id: 'cohort',
    en: 'Cohort study',
    vi: 'Nghiên cứu đoàn hệ (theo dõi dọc)',
    group: 'epi',
    short: 'Chọn một nhóm người chưa mắc bệnh rồi theo dõi họ qua thời gian xem ai mắc.',
    detail:
      'Cho phép nói về nguy cơ tương lai và (cẩn thận) về nhân quả. Đắt và chậm. Ví dụ trong kho: UK Biobank ' +
      '(lugner2024, 10 năm), ELSA (fazakis2021, 2 năm), FIT (alghamdi2017, 5 năm).',
    aliases: ['cohort study', 'prospective cohort', 'longitudinal', 'follow-up'],
    see: ['cross-sectional-design', 'incidence', 'horizon'],
  },
  {
    id: 'cross-sectional-design',
    en: 'Cross-sectional study',
    vi: 'Nghiên cứu cắt ngang',
    group: 'epi',
    short: 'Chụp một tấm ảnh tại một thời điểm: đo feature và nhãn cùng lúc.',
    detail:
      'NHANES, BRFSS, KNHANES, PIMA đều là cắt ngang. Trả lời được câu "ai đang mắc mà chưa biết" (tầm soát), ' +
      'KHÔNG trả lời được câu "ai sẽ mắc trong 5 năm tới".',
    why: 'Đề tài anh là cắt ngang — và phải nói thẳng điều đó trong Limitations, đừng để reviewer bắt.',
    aliases: ['cross-sectional', 'cross sectional'],
    see: ['cohort', 'horizon'],
  },
  {
    id: 'horizon',
    en: 'Prediction horizon',
    vi: 'Tầm dự đoán (trục phân loại thứ 2 của kho)',
    group: 'epi',
    short: 'Bài này dự đoán CÁI GÌ: trạng thái hiện tại, phát hiện sớm, hay nguy cơ sau N năm.',
    detail:
      'Ba giá trị trong kho (AGENTS.md §3b): `cross_sectional` = feature và nhãn cùng thời điểm · ' +
      '`early_detection` = tìm người chưa được chẩn đoán / giai đoạn tiền lâm sàng · ' +
      '`long_term_risk` = dự đoán onset sau N năm, cần theo dõi dọc.',
    trap: 'Gán theo cách PAPER TỰ ĐẶT bài toán, không suy từ dataset — cùng NHANES có thể dùng cho cả ba.',
    aliases: ['prediction horizon', 'time horizon', 'prediction window'],
    see: ['cohort', 'cross-sectional-design', 'incidence'],
  },
  {
    id: 'ehr',
    en: 'EHR / EMR',
    vi: 'Hồ sơ sức khoẻ / bệnh án điện tử',
    group: 'epi',
    short: 'Dữ liệu phát sinh từ chăm sóc thực tế, không phải thu thập cho nghiên cứu.',
    detail:
      'Rất giàu nhưng rất bẩn: thiếu dữ liệu không ngẫu nhiên (ai đi khám nhiều thì có nhiều dữ liệu), mã ICD ghi ' +
      'sai, thời điểm chẩn đoán không phải thời điểm khởi bệnh.',
    trap: 'Trong EHR, "chưa có chẩn đoán" có thể chỉ nghĩa là "chưa đi khám" — dễ nhầm thành âm tính.',
    aliases: ['electronic health record', 'electronic medical record', 'ehr', 'emr', 'claims data', 'administrative data'],
    see: ['icd', 'missing-data'],
  },
  {
    id: 'icd',
    en: 'ICD code',
    vi: 'Mã bệnh quốc tế (ICD-9 / ICD-10)',
    group: 'epi',
    short: 'Bộ mã chuẩn cho chẩn đoán; ĐTĐ type 2 là E11 (ICD-10) hoặc 250.x (ICD-9).',
    detail: 'Dùng để rút cohort từ EHR/claims. Chất lượng phụ thuộc người nhập liệu và mục đích thanh toán bảo hiểm.',
    aliases: ['icd-9', 'icd-10', 'icd9', 'icd10', 'e11', 'diagnosis code'],
    see: ['ehr'],
  },

  /* ==================== KHẢO SÁT QUỐC GIA ==================== */
  {
    id: 'complex-survey',
    en: 'Complex survey design',
    vi: 'Thiết kế khảo sát phức hợp',
    group: 'survey',
    short: 'NHANES/KNHANES không lấy mẫu ngẫu nhiên đơn giản — họ lấy mẫu theo tầng, theo cụm, và cố ý lấy dư một số nhóm.',
    detail:
      'Vì lấy dư nhóm thiểu số/người già nên mẫu KHÔNG đại diện dân số nếu tính thẳng. Phải dùng 3 thứ: trọng số ' +
      '(weight), tầng (strata), và đơn vị lấy mẫu sơ cấp (PSU). Bỏ qua chúng thì cả tỉ lệ lẫn khoảng tin cậy đều sai.',
    why: '⭐ Nền của đóng góp P1 của anh.',
    aliases: ['complex survey', 'survey design', 'stratified sampling', 'cluster sampling', 'oversampl'],
    see: ['survey-weights', 'psu-strata', 'nhanes'],
  },
  {
    id: 'survey-weights',
    en: 'Survey weights',
    vi: 'Trọng số khảo sát',
    group: 'survey',
    short: 'Mỗi người tham gia "đại diện" cho bao nhiêu người trong dân số thật.',
    detail:
      'Trong NHANES, biến WTMEC2YR cho biết một người được khám đại diện cho bao nhiêu người Mỹ. Khi gộp nhiều chu kỳ ' +
      '2 năm phải chia trọng số cho số chu kỳ. Không dùng trọng số = coi mọi người nặng như nhau = kết quả lệch.',
    why:
      '⭐ Kết quả thật của anh: prevalence 6.21% (không trọng số) vs 3.91% (có trọng số) — lệch 2.30 điểm %. ' +
      'dinh2019 (447 cite) KHÔNG nhắc tới trọng số lần nào; yu2010 (524 cite) dùng SUDAAN cho hồi quy logistic ' +
      'nhưng KHÔNG cho SVM → so sánh bất đối xứng. ⚠️ Phải tự mở source.pdf xác minh trước khi viết — đây là claim về người khác.',
    aliases: ['survey weight', 'sample weight', 'sampling weight', 'wtmec2yr', 'wtint2yr', 'weighted analysis', 'sudaan', 'svyset'],
    see: ['complex-survey', 'psu-strata', 'prevalence'],
  },
  {
    id: 'psu-strata',
    en: 'PSU & strata (SDMVPSU / SDMVSTRA)',
    vi: 'Đơn vị lấy mẫu sơ cấp và tầng',
    group: 'survey',
    short: 'Hai biến cho biết ai được lấy mẫu cùng cụm với ai — cần để tính khoảng tin cậy đúng.',
    detail:
      'Người trong cùng một cụm địa lý giống nhau hơn ngẫu nhiên, nên sai số thật lớn hơn công thức thông thường. ' +
      'Bỏ qua PSU/strata → khoảng tin cậy hẹp giả → dễ tuyên bố "có ý nghĩa" nhầm.',
    aliases: ['sdmvpsu', 'sdmvstra', 'primary sampling unit', 'psu', 'strata'],
    see: ['survey-weights', 'ci'],
  },
  {
    id: 'nhanes',
    en: 'NHANES',
    vi: 'Khảo sát Sức khoẻ & Dinh dưỡng Quốc gia Hoa Kỳ',
    group: 'survey',
    short: 'Khảo sát của CDC, có cả phỏng vấn và KHÁM + XÉT NGHIỆM thật tại xe khám lưu động.',
    detail:
      'Tải tự do, không cần đăng ký, dạng file .XPT theo chu kỳ 2 năm. Điểm quý nhất: có HbA1c/FPG đo thật, nên xác định ' +
      'được ai mắc ĐTĐ mà CHƯA từng được chẩn đoán — thứ mà khảo sát tự khai (BRFSS) không làm được.',
    why: '⭐ Đây là Tầng 1 dữ liệu của anh, đã dựng xong: 4.170 mẫu phân tích, 259 ca ĐTĐ chưa chẩn đoán.',
    trap: 'CDC đã đổi URL — script cũ trả HTTP 200 kèm trang HTML lỗi thay vì báo lỗi. Luôn kiểm tra kích thước và định dạng file tải về.',
    aliases: ['nhanes', 'national health and nutrition'],
    see: ['survey-weights', 'brfss', 'knhanes'],
  },
  {
    id: 'knhanes',
    en: 'KNHANES',
    vi: 'NHANES phiên bản Hàn Quốc',
    group: 'survey',
    short: 'Khảo sát quốc gia Hàn Quốc, cấu trúc gần giống NHANES nên harmonize dễ nhất.',
    detail: 'Là nguồn của choi2014 và sgchoi2023 — hai bài neo gần đề tài anh nhất.',
    why: 'Ưu tiên số 1 cho cohort external (Tầng 2) vì dễ ghép biến nhất và đã có 2 bài để đối chiếu.',
    aliases: ['knhanes', 'korea national health'],
    see: ['nhanes', 'external-validation'],
  },
  {
    id: 'brfss',
    en: 'BRFSS',
    vi: 'Khảo sát yếu tố nguy cơ hành vi (Hoa Kỳ)',
    group: 'survey',
    short: 'Khảo sát qua điện thoại, cỡ mẫu rất lớn, nhưng TẤT CẢ đều là tự khai — không có xét nghiệm.',
    detail:
      'Vì không có xét nghiệm nên nhãn "ĐTĐ" trong BRFSS là "từng được bác sĩ nói là bị ĐTĐ" — tức là đã CHẨN ĐOÁN rồi.',
    trap: 'Không dùng BRFSS để nghiên cứu ĐTĐ CHƯA chẩn đoán được — theo định nghĩa những người đó trả lời "không".',
    aliases: ['brfss', 'behavioral risk factor'],
    see: ['nhanes', 'undiagnosed'],
  },

  /* ==================== MÔ HÌNH & TIỀN XỬ LÝ ==================== */
  {
    id: 'logistic-regression',
    en: 'Logistic regression (LR)',
    vi: 'Hồi quy logistic',
    group: 'ml',
    short: 'Mô hình tuyến tính cho bài toán có/không — nền tảng của mọi thang điểm lâm sàng.',
    detail:
      'Cho ra xác suất, hệ số đọc được thành odds ratio, calibration thường tốt sẵn. Đơn giản nhưng cực khó đánh bại ' +
      'trên dữ liệu tabular ít feature.',
    why:
      '⭐ Đây là baseline BẮT BUỘC của anh. Bằng chứng trong kho: choi2014 (ML hơn score 0.019 AUC), ' +
      'lai2019 (GBM vs LR p=0.081 → không khác), sgchoi2023 (LR 0.814 ≈ LightGBM 0.819), yu2010 (SVM ≈ LR).',
    aliases: ['logistic regression', 'logistic model', 'lr ', 'odds ratio'],
    see: ['findrisc', 'xgboost'],
  },
  {
    id: 'random-forest',
    en: 'Random Forest (RF)',
    vi: 'Rừng ngẫu nhiên',
    group: 'ml',
    short: 'Trung bình của hàng trăm cây quyết định, mỗi cây học trên mẫu và tập feature ngẫu nhiên.',
    detail:
      'Mạnh sẵn không cần tinh chỉnh nhiều, chịu được feature không chuẩn hoá. Nhược điểm: xác suất ra thường ' +
      'lệch (cần calibration) và mô hình khó giải thích trực tiếp.',
    aliases: ['random forest', 'random-forest', 'rf '],
    see: ['xgboost', 'bagging', 'calibration'],
  },
  {
    id: 'xgboost',
    en: 'XGBoost / LightGBM / Gradient Boosting',
    vi: 'Cây tăng cường độ dốc',
    group: 'ml',
    short: 'Xây cây tuần tự, cây sau sửa lỗi cây trước. Thường là mô hình mạnh nhất trên dữ liệu bảng.',
    detail:
      'LightGBM nhanh hơn XGBoost trên dữ liệu lớn. Cần tinh chỉnh (số cây, độ sâu, learning rate) và cần chống ' +
      'overfitting cẩn thận.',
    trap: 'Trên dữ liệu tabular ~vài chục nghìn dòng với 10–20 feature no-lab, boosting thường chỉ hơn hồi quy logistic 0.01–0.02 AUROC. Đó là kết quả, không phải thất bại.',
    aliases: ['xgboost', 'lightgbm', 'light gbm', 'gradient boosting', 'gbm', 'catboost', 'adaboost', 'boosting'],
    see: ['logistic-regression', 'hyperparameter'],
  },
  {
    id: 'svm',
    en: 'SVM (Support Vector Machine)',
    vi: 'Máy vector hỗ trợ',
    group: 'ml',
    short: 'Tìm mặt phân cách rộng nhất giữa hai lớp; kernel RBF cho phép phân cách phi tuyến.',
    detail:
      'Rất mạnh những năm 2000–2015, nay ít dùng cho tabular lớn vì chậm và không cho xác suất trực tiếp ' +
      '(phải hiệu chỉnh thêm).',
    aliases: ['support vector machine', 'svm', 'rbf kernel', 'kernel'],
    see: ['logistic-regression', 'calibration'],
  },
  {
    id: 'ann',
    en: 'ANN / MLP / Deep learning',
    vi: 'Mạng nơ-ron / học sâu',
    group: 'ml',
    short: 'Nhiều lớp phép biến đổi phi tuyến chồng lên nhau.',
    detail:
      'Thắng áp đảo ở ảnh và văn bản, nhưng trên dữ liệu bảng cỡ vừa thì thường THUA cây tăng cường. ' +
      'Bài nào báo deep learning đạt 98% trên PIMA 768 mẫu là dấu hiệu cần soi kỹ.',
    trap: 'naz2020 báo DL 98.07% trên PIMA bằng công cụ GUI, không CV, ma trận nhầm lẫn không khớp cỡ tập test.',
    aliases: ['neural network', 'deep learning', 'mlp', 'multilayer perceptron', 'ann', 'dnn'],
    see: ['xgboost', 'overfitting', 'tabpfn'],
  },
  {
    id: 'ensemble',
    en: 'Ensemble / stacking / voting',
    vi: 'Kết hợp nhiều mô hình',
    group: 'ml',
    short: 'Gộp dự đoán của nhiều mô hình để ổn định hơn một mô hình đơn.',
    detail:
      'Soft voting = trung bình xác suất (có thể có trọng số theo AUC). Stacking = dùng một mô hình cấp 2 học cách ' +
      'gộp. Stacking dễ rò rỉ nếu meta-feature không phải out-of-fold.',
    trap: 'phan2025 phát hiện aggregation đơn giản tổng quát tốt hơn stacking — dù stacking thắng trên tập huấn luyện.',
    aliases: ['ensemble', 'stacking', 'soft voting', 'majority voting', 'blending', 'bagging'],
    see: ['xgboost', 'data-leakage'],
  },
  {
    id: 'class-imbalance',
    en: 'Class imbalance',
    vi: 'Mất cân bằng lớp',
    group: 'ml',
    short: 'Số ca bệnh ít hơn nhiều số ca không bệnh — thực tế luôn như vậy.',
    detail:
      'Ba cách xử lý: (1) oversampling lớp thiểu số (SMOTE/ADASYN/random), (2) undersampling lớp đa số, ' +
      '(3) class weight / cost-sensitive. Cách (3) an toàn nhất vì không tạo dữ liệu giả và không vứt dữ liệu thật.',
    trap:
      '⭐ Sai lầm phổ biến nhất trong kho: cân bằng dữ liệu rồi báo cáo accuracy/PPV trên tập test ĐÃ cân bằng. ' +
      'Test set PHẢI giữ nguyên prevalence thật, chỉ tập train mới được đụng vào.',
    aliases: ['class imbalance', 'imbalanced', 'imbalance', 'undersampling', 'under-sampling', 'oversampling', 'over-sampling'],
    see: ['smote', 'prevalence', 'auprc'],
  },
  {
    id: 'smote',
    en: 'SMOTE / ADASYN',
    vi: 'Sinh mẫu thiểu số nhân tạo',
    group: 'ml',
    short: 'Tạo thêm ca bệnh giả bằng cách nội suy giữa các ca bệnh thật gần nhau.',
    detail:
      'Nghe hấp dẫn nhưng bằng chứng gần đây cho thấy SMOTE hiếm khi cải thiện AUROC/AUPRC thật, và nó phá calibration.',
    trap:
      '⭐ SMOTE TRƯỚC khi chia tập = rò rỉ nghiêm trọng: một mẫu giả trong tập train có thể được nội suy từ một mẫu ' +
      'nằm trong tập test. Rất nhiều bài trong kho không nói rõ thứ tự này — mặc định phải nghi ngờ.',
    aliases: ['smote', 'adasyn', 'synthetic minority', 'borderline-smote'],
    see: ['class-imbalance', 'data-leakage', 'calibration'],
  },
  {
    id: 'missing-data',
    en: 'Missing data & imputation',
    vi: 'Dữ liệu thiếu và cách điền',
    group: 'ml',
    short: 'Thiếu ngẫu nhiên hay thiếu có lý do — hai chuyện hoàn toàn khác nhau.',
    detail:
      'Điền bằng trung bình/trung vị là đơn giản nhất; MICE/KNN tốt hơn. Nhưng câu hỏi quan trọng hơn là VÌ SAO thiếu: ' +
      'trong EHR, thiếu xét nghiệm thường nghĩa là bác sĩ thấy không cần làm — bản thân điều đó đã là thông tin.',
    trap:
      'PIMA mã hoá giá trị thiếu thành số 0 (insulin = 0, huyết áp = 0 là bất khả thi về sinh học). Bài nào không xử lý ' +
      'chuyện này là đang huấn luyện trên dữ liệu vô nghĩa. Và imputation phải fit TRÊN TẬP TRAIN thôi.',
    aliases: ['missing value', 'missing data', 'imputation', 'imputed', 'mice', 'listwise deletion', 'complete case'],
    see: ['data-leakage', 'pima'],
  },
  {
    id: 'feature-selection',
    en: 'Feature selection',
    vi: 'Chọn biến',
    group: 'ml',
    short: 'Giữ lại các biến hữu ích, bỏ biến thừa.',
    detail:
      'Filter (tương quan, chi-square, information gain) rẻ nhưng ngây thơ. Wrapper (RFE, Boruta) tốt hơn nhưng đắt. ' +
      'Với 10–20 feature no-lab thì thường không cần chọn biến gì cả.',
    trap: '⭐ Chọn biến trên TOÀN BỘ dữ liệu rồi mới chia tập = rò rỉ. Phải nằm trong fold huấn luyện.',
    aliases: ['feature selection', 'feature importance', 'boruta', 'rfe', 'recursive feature elimination', 'mrmr', 'information gain', 'chi-square'],
    see: ['data-leakage', 'pca'],
  },
  {
    id: 'pca',
    en: 'PCA (Principal Component Analysis)',
    vi: 'Phân tích thành phần chính',
    group: 'ml',
    short: 'Ép nhiều biến thành ít trục mới không tương quan.',
    detail:
      'Giảm chiều, nhưng biến mới không còn ý nghĩa lâm sàng nên không giải thích được cho bác sĩ. ' +
      'zou2018 kết luận mRMR tốt hơn PCA cho bài toán này.',
    trap: 'PCA cũng phải fit trên tập train thôi.',
    aliases: ['principal component', 'pca', 'dimensionality reduction', 'ica'],
    see: ['feature-selection'],
  },
  {
    id: 'standardization',
    en: 'Standardization / normalization',
    vi: 'Chuẩn hoá dữ liệu',
    group: 'ml',
    short: 'Đưa các biến về cùng thang: Z-score (trừ trung bình, chia độ lệch chuẩn) hoặc min-max về [0,1].',
    detail:
      'Cần cho SVM, mạng nơ-ron, hồi quy có phạt. KHÔNG cần cho cây/rừng/boosting.',
    trap: 'Tính trung bình và độ lệch chuẩn trên toàn bộ dữ liệu = rò rỉ nhẹ nhưng có thật (~1–2% accuracy, đúng lỗi của khanam2021).',
    aliases: ['standardization', 'normalization', 'z-score', 'min-max', 'scaling', 'standardscaler'],
    see: ['data-leakage'],
  },
  {
    id: 'hyperparameter',
    en: 'Hyperparameter tuning',
    vi: 'Tinh chỉnh siêu tham số',
    group: 'ml',
    short: 'Chọn các thiết lập của mô hình (số cây, độ sâu, learning rate) mà mô hình không tự học được.',
    detail:
      'Grid search = thử hết lưới. Random search = thử ngẫu nhiên, thường hiệu quả hơn với cùng ngân sách. ' +
      'Bayesian optimization = thông minh hơn nhưng phức tạp hơn.',
    trap: 'Tune trên tập test = winner\'s curse. Phải tune trên validation hoặc trong vòng CV bên trong.',
    aliases: ['hyperparameter', 'grid search', 'gridsearch', 'random search', 'bayesian optimization', 'tuning'],
    see: ['nested-cv', 'winners-curse'],
  },
  {
    id: 'regularization',
    en: 'Regularization (L1 / L2)',
    vi: 'Chính quy hoá',
    group: 'ml',
    short: 'Phạt mô hình khi hệ số quá lớn, để nó đừng học thuộc nhiễu.',
    detail: 'L1 (LASSO) đẩy hệ số về đúng 0 → tự chọn biến. L2 (Ridge) làm nhỏ đều các hệ số.',
    aliases: ['regularization', 'lasso', 'ridge', 'elastic net', 'l1 ', 'l2 ', 'penalized'],
    see: ['overfitting', 'logistic-regression'],
  },
  {
    id: 'tabpfn',
    en: 'TabPFN v2',
    vi: 'Mô hình nền cho dữ liệu bảng',
    group: 'ml',
    short: 'Mạng transformer được huấn luyện trước trên hàng triệu bộ dữ liệu bảng tổng hợp; dự đoán không cần huấn luyện lại.',
    detail:
      'Công bố trên Nature 2025. Rất mạnh trên bộ dữ liệu nhỏ (dưới ~10k dòng). Cần GPU nhưng Kaggle 30h/tuần là đủ.',
    why: 'Đây là điểm "hợp thời đại AI 2026" cho bài anh — nhưng thuộc TẦNG 2, làm SAU khi Bảng 3 và Bảng 4 đã xong.',
    aliases: ['tabpfn', 'prior-data fitted', 'tabular foundation model'],
    see: ['ann'],
  },
  {
    id: 'foundation-ehr',
    en: 'BERT for EHR (Med-BERT / BEHRT)',
    vi: 'Mô hình nền cho hồ sơ bệnh án',
    group: 'ml',
    short: 'Áp kiến trúc transformer của xử lý ngôn ngữ vào chuỗi mã chẩn đoán theo thời gian của bệnh nhân.',
    detail:
      'rasmy2021 (Med-BERT, 28.5 triệu bệnh nhân Cerner) và li2020 (BEHRT, 1.6 triệu bệnh nhân CPRD Anh).',
    trap:
      '⚠️ Cả hai đều KHÔNG tái lập được với anh: dữ liệu cần giấy phép, compute ngoài tầm tuyệt đối. ' +
      'TO_DO §6 🅕 chốt: chỉ trích dẫn MỘT câu ở Related Work, không đọc sâu.',
    aliases: ['med-bert', 'behrt', 'bert', 'transformer', 'pretraining', 'masked language model'],
    see: ['ehr', 'tabpfn'],
  },

  /* ==================== GIẢI THÍCH MÔ HÌNH ==================== */
  {
    id: 'shap',
    en: 'SHAP (SHapley Additive exPlanations)',
    vi: 'Giá trị Shapley — mỗi biến đẩy dự đoán lên/xuống bao nhiêu',
    group: 'xai',
    short: 'Chia phần đóng góp của từng biến vào MỘT dự đoán cụ thể, theo lý thuyết trò chơi hợp tác.',
    detail:
      'Có tính cộng: tổng đóng góp các biến + giá trị nền = dự đoán. Dùng được cả ở mức toàn cục (biến nào quan trọng ' +
      'nói chung) lẫn cục bộ (vì sao bệnh nhân NÀY bị gắn cờ).',
    trap: 'SHAP giải thích MÔ HÌNH, không giải thích BỆNH. Biến có SHAP cao không có nghĩa là nguyên nhân gây bệnh.',
    aliases: ['shap', 'shapley', 'shapley value'],
    see: ['lime', 'feature-selection'],
  },
  {
    id: 'lime',
    en: 'LIME',
    vi: 'Giải thích cục bộ bằng mô hình tuyến tính xấp xỉ',
    group: 'xai',
    short: 'Quanh một ca cụ thể, dựng một mô hình tuyến tính đơn giản xấp xỉ mô hình phức tạp.',
    detail:
      'Nhanh hơn SHAP nhưng kém ổn định: chạy lại hai lần có thể ra hai lời giải thích khác nhau, vì nó lấy mẫu ngẫu nhiên.',
    trap: 'xu2025 nghiên cứu đúng vấn đề này — nhiễu nhãn làm giải thích LIME mất ổn định.',
    aliases: ['lime', 'local interpretable'],
    see: ['shap'],
  },
  {
    id: 'global-local',
    en: 'Global vs local explanation',
    vi: 'Giải thích toàn cục vs cục bộ',
    group: 'xai',
    short: 'Toàn cục = "biến nào quan trọng với mô hình nói chung". Cục bộ = "vì sao BỆNH NHÂN NÀY bị gắn cờ".',
    detail:
      'Bác sĩ cần cái thứ hai. Phần lớn bài trong kho chỉ làm cái thứ nhất và gọi đó là XAI.',
    aliases: ['global explanation', 'local explanation', 'global importance', 'interpretability'],
    see: ['shap', 'lime'],
  },

  /* ==================== CHUẨN BÁO CÁO & PHẢN BIỆN ==================== */
  {
    id: 'tripod',
    en: 'TRIPOD+AI',
    vi: 'Chuẩn báo cáo mô hình tiên lượng có AI',
    group: 'report',
    short: 'Danh sách kiểm những mục BẮT BUỘC phải có khi công bố một mô hình dự đoán lâm sàng (BMJ 2024).',
    detail:
      'Yêu cầu nêu rõ: nguồn dữ liệu, định nghĩa nhãn, cách xử lý dữ liệu thiếu, cách chia tập, calibration, ' +
      'external validation, và công khai mô hình đủ để người khác dùng lại.',
    why: 'Nộp bài mà đính kèm bảng kiểm TRIPOD+AI đã điền = một điểm cộng rẻ tiền mà nhiều bài bỏ qua.',
    aliases: ['tripod', 'tripod+ai', 'tripod-ai', 'reporting guideline'],
    see: ['probast'],
  },
  {
    id: 'probast',
    en: 'PROBAST+AI',
    vi: 'Công cụ đánh giá nguy cơ sai lệch của mô hình tiên lượng',
    group: 'report',
    short: 'Bộ câu hỏi để chấm một nghiên cứu là nguy cơ sai lệch cao/thấp, theo 4 miền: đối tượng, biến, nhãn, phân tích.',
    detail: 'Đa số nghiên cứu bị chấm "high risk of bias" ở miền phân tích, vì mất cân bằng và validation làm không đúng.',
    why:
      'Số citable cho Introduction: Endocrine Connections 2025 — 65 nghiên cứu / 97 mô hình, chỉ 21 có external validation, ' +
      '>80% nguy cơ sai lệch CAO. 91.8% mô hình high-RoB.',
    aliases: ['probast', 'risk of bias', 'rob '],
    see: ['tripod'],
  },
  {
    id: 'baseline',
    en: 'Baseline',
    vi: 'Mốc so sánh',
    group: 'report',
    short: 'Cái mà mô hình mới của anh phải chứng minh là hơn.',
    detail:
      'Baseline yếu (so với "đoán mò") là chiêu quen thuộc để trông có vẻ giỏi. Baseline mạnh và công bằng ' +
      '(hồi quy logistic được tinh chỉnh tử tế + FINDRISC) mới thuyết phục reviewer.',
    trap: 'sgchoi2023 bị trừ điểm đúng chỗ này: thang điểm thống kê dùng hệ số cũ, không được refit công bằng như mô hình ML.',
    aliases: ['baseline', 'benchmark', 'state-of-the-art', 'sota'],
    see: ['findrisc', 'logistic-regression', 'ablation'],
  },
  {
    id: 'reproducibility',
    en: 'Reproducibility',
    vi: 'Khả năng tái lập',
    group: 'report',
    short: 'Người khác có chạy lại được kết quả của anh không.',
    detail:
      'Cần: dữ liệu công khai (hoặc quy trình xin rõ ràng), code công khai, seed ngẫu nhiên cố định, danh sách phiên bản thư viện, ' +
      'và mô tả đủ chi tiết để code lại từ đầu.',
    why: 'Chỉ 4/35 bài trong kho có code công khai. Anh công khai code = một điểm cộng gần như miễn phí, và là "hook kiến tạo" để bài không bị coi là chỉ phê phán.',
    aliases: ['reproducib', 'replicab', 'open source', 'code availability', 'data availability'],
    see: ['tripod'],
  },
  {
    id: 'negative-result',
    en: 'Negative result',
    vi: 'Kết quả âm',
    group: 'report',
    short: 'Phát hiện rằng thứ được kỳ vọng KHÔNG xảy ra — vẫn là phát hiện.',
    detail:
      'Nhiều tạp chí ngại nhận, nhưng PLOS ONE và một số tạp chí phương pháp thì nhận, miễn thiết kế đủ chặt để ' +
      'kết luận "không khác" là đáng tin (đủ cỡ mẫu, đủ power).',
    why:
      '⭐ Chính điểm khiến đề tài anh "không thể thất bại về mặt khoa học": nếu ML không hơn thang điểm lâm sàng, ' +
      'ĐÓ CHÍNH LÀ claim — "khoảng cách công bố phần lớn là ảo giác đo lường, đây là số đo".',
    aliases: ['negative result', 'null result', 'no significant difference', 'non-inferior'],
    see: ['p-value', 'delong'],
  },
  {
    id: 'preprint',
    en: 'Preprint / medRxiv / arXiv',
    vi: 'Bản in trước (chưa qua phản biện)',
    group: 'report',
    short: 'Bài đăng công khai trước khi được tạp chí duyệt.',
    detail:
      'Đọc được ngay và miễn phí, nhưng CHƯA qua phản biện nên số liệu có thể còn thay đổi. Trích dẫn được, ' +
      'nhưng phải ghi rõ là preprint.',
    why: 'Đối thủ gần nhất của anh — medRxiv 2025.09.05.25335151 (ML vs FINDRISC) — là một preprint. ⚠️ medRxiv chặn tải tự động, anh phải tự mở trình duyệt.',
    aliases: ['preprint', 'medrxiv', 'arxiv', 'biorxiv'],
    see: ['peer-review'],
  },
  {
    id: 'peer-review',
    en: 'Peer review',
    vi: 'Phản biện đồng nghiệp',
    group: 'report',
    short: 'Hai đến ba nhà nghiên cứu cùng ngành đọc và chấm bài trước khi tạp chí nhận.',
    detail:
      'Kết quả: nhận / sửa nhỏ (minor) / sửa lớn (major) / từ chối. "Desk reject" là bị chủ biên loại thẳng, không gửi phản biện — ' +
      'thường mất 1–2 tuần, nhưng nếu gửi sai tầm tạp chí thì có thể chờ 3–4 tháng rồi vẫn bị loại.',
    why: 'Vì sao chiến lược của anh là hội nghị trong nước trước (vòng phản biện rẻ và nhanh) rồi mới lên tạp chí Q2–Q3.',
    aliases: ['peer review', 'peer-reviewed', 'reviewer', 'desk reject', 'major revision'],
    see: ['quartile', 'preprint'],
  },
  {
    id: 'quartile',
    en: 'Journal quartile (Q1–Q4) / Impact Factor',
    vi: 'Xếp hạng tạp chí',
    group: 'report',
    short: 'Q1 = top 25% tạp chí trong ngành theo chỉ số trích dẫn.',
    detail:
      'Q1 danh giá nhất nhưng cũng khắt khe và chậm nhất. Q2–Q3 vẫn là tạp chí quốc tế có phản biện đàng hoàng.',
    why: 'Chiến lược đã chốt: hội nghị trong nước (~tuần 16) → tạp chí Q2–Q3 (tháng 2–4/2027). KHÔNG nhắm Q1 ngay — không phải vì đề tài yếu mà vì bài đầu + làm một mình + 6 tháng ⇒ desk-reject tốn 3–4 tháng.',
    aliases: ['impact factor', 'quartile', 'q1', 'q2', 'scopus', 'jcr', 'scimago'],
    see: ['peer-review'],
  },
  {
    id: 'citation',
    en: 'Citation count',
    vi: 'Số lượt trích dẫn',
    group: 'report',
    short: 'Bao nhiêu bài khác đã trích dẫn bài này.',
    detail:
      'Nguồn khác nhau cho số khác nhau: OpenAlex, Semantic Scholar, Scopus, Web of Science, Google Scholar — chênh nhau ' +
      'là bình thường. Kho này lấy OpenAlex làm chính.',
    why:
      'Cổng §7 của kho: ≥100 cite nếu xuất bản >3 năm · ≥30 nếu 1–3 năm · rising star (≥5 cite/tháng) nếu <1 năm. ' +
      'Không đạt là không nhận vào kho.',
    trap: 'OpenAlex đôi khi có 2 bản ghi trùng cho cùng một DOI (yu2010 bị đúng lỗi này: một bản ghi 0 cite, bản đúng 524).',
    aliases: ['citation', 'cited by', 'times cited', 'h-index'],
    see: ['quartile'],
  },
  {
    id: 'related-work',
    en: 'Related work',
    vi: 'Phần công trình liên quan',
    group: 'report',
    short: 'Chỗ anh chứng minh mình biết người khác đã làm gì và mình khác họ ở đâu.',
    detail:
      'Không phải liệt kê. Mỗi bài được nhắc phải phục vụ một mục đích: nền / đối thủ / bằng chứng gap. ' +
      'Bài nào không phục vụ mục đích nào thì bỏ ra.',
    why: '⭐ Đây chính là cách chữa bệnh "đọc paper mà thấy vô nghĩa": chốt claim trước, rồi mỗi paper rơi vào đúng 1 trong 4 ô.',
    aliases: ['related work', 'literature review', 'prior work'],
    see: ['baseline'],
  },

  /* ==================== BỘ DỮ LIỆU ==================== */
  {
    id: 'pima',
    en: 'PIMA Indians Diabetes Dataset',
    vi: 'Bộ dữ liệu ĐTĐ người Pima',
    group: 'data',
    short: '768 phụ nữ gốc Pima, 8 biến, nhãn có/không ĐTĐ. Bộ dữ liệu bị dùng nhiều nhất và bão hoà nhất.',
    detail:
      'Ưu điểm duy nhất: nhỏ, sẵn có, ai cũng biết. Nhược điểm: quá nhỏ để kết luận, chỉ một nhóm dân tộc và một giới, ' +
      'có glucose làm feature trong khi nhãn liên quan glucose, và giá trị thiếu bị mã hoá thành 0.',
    trap: '⭐ Reviewer đọc "chúng tôi đạt 98% trên PIMA" là cờ đỏ, không phải điểm mạnh. Kho của anh có olisah2022 100%, kaliappan2024 0.990, naz2020 98.07%.',
    aliases: ['pima', 'pima indian', 'pidd', 'pima indians diabetes'],
    see: ['missing-data', 'label-leakage'],
  },
  {
    id: 'mimic',
    en: 'MIMIC-III / MIMIC-IV',
    vi: 'Cơ sở dữ liệu ICU công khai (MIT)',
    group: 'data',
    short: 'Dữ liệu hồi sức tích cực từ Beth Israel, tải được sau khi ký DUA trên PhysioNet.',
    detail: 'Rất chi tiết nhưng là bệnh nhân ICU nặng — hoàn toàn khác quần thể cộng đồng.',
    trap: 'agliata2023 trộn MIMIC (ICU) với NHANES (cộng đồng) → mô hình có thể chỉ đang học cách phân biệt NGUỒN DỮ LIỆU chứ không phải bệnh.',
    aliases: ['mimic', 'mimic-iii', 'mimic-iv', 'physionet'],
    see: ['ehr', 'dataset-shift'],
  },
  {
    id: 'ukbiobank',
    en: 'UK Biobank',
    vi: 'Ngân hàng sinh học Anh',
    group: 'data',
    short: '500.000 người Anh, theo dõi dài hạn, có cả gen lẫn xét nghiệm. Cần đăng ký và trả phí.',
    detail: 'Nguồn của lugner2024 (448.277 người, 12.148 ca ĐTĐ trong 10 năm).',
    trap: 'Healthy-volunteer bias: người tình nguyện tham gia khoẻ hơn dân số chung, và chủ yếu là người da trắng Anh.',
    aliases: ['uk biobank', 'ukbiobank', 'ukb'],
    see: ['cohort', 'generalizability'],
  },
  {
    id: 'tabular',
    en: 'Tabular data',
    vi: 'Dữ liệu dạng bảng',
    group: 'data',
    short: 'Mỗi dòng một người, mỗi cột một biến — như bảng Excel.',
    detail:
      'Khác với ảnh, chuỗi thời gian, văn bản. Trên tabular, cây tăng cường vẫn thường thắng học sâu, và laptop CPU là đủ.',
    why: '⭐ Bài toán của anh là tabular ~4.000–70.000 dòng → KHÔNG cần thuê GPU. Nếu thấy cần thuê GPU thì đó là tín hiệu đã đi lạc scope.',
    aliases: ['tabular', 'structured data'],
    see: ['xgboost', 'tabpfn'],
  },
];

/** Đếm thuật ngữ theo nhóm — dùng cho chip lọc. */
export function glossaryCountByGroup(): Record<GlossaryGroupId, number> {
  const out = {} as Record<GlossaryGroupId, number>;
  for (const g of GLOSSARY_GROUPS) out[g.id] = 0;
  for (const t of GLOSSARY) out[t.group] += 1;
  return out;
}

/**
 * Dò thuật ngữ xuất hiện trong full text của paper.
 * Trả về map id -> số lần khớp (chỉ tính alias khớp nhiều nhất, tránh cộng dồn ảo).
 */
export function detectTerms(text: string): Record<string, number> {
  const hay = text.toLowerCase();
  const hits: Record<string, number> = {};
  for (const term of GLOSSARY) {
    let best = 0;
    for (const alias of term.aliases) {
      const a = alias.toLowerCase();
      if (a.length < 3) continue;
      let n = 0;
      let i = hay.indexOf(a);
      while (i !== -1) {
        // biên trái/phải phải là ký tự không-chữ (tránh 'acc' khớp trong 'accessible')
        const before = i === 0 ? ' ' : hay[i - 1];
        const after = hay[i + a.length] ?? ' ';
        const wordish = (c: string) => /[a-z0-9]/.test(c);
        const leftOk = !wordish(before) || !/[a-z0-9]/.test(a[0]);
        const rightOk = !wordish(after) || !/[a-z0-9]/.test(a[a.length - 1]);
        if (leftOk && rightOk) n += 1;
        i = hay.indexOf(a, i + a.length);
      }
      if (n > best) best = n;
    }
    if (best > 0) hits[term.id] = best;
  }
  return hits;
}
