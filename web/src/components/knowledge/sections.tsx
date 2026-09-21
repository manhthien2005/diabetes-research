'use client';

import { useMemo, useState } from 'react';
import {
  MdBloodtype,
  MdScience,
  MdWarningAmber,
  MdCheckCircle,
  MdInfoOutline,
  MdTune,
  MdLightbulbOutline,
  MdLayers,
  MdTimeline,
  MdExpandMore,
  MdStairs,
  MdTrendingUp,
  MdTrendingFlat,
  MdTrendingDown,
  MdBlock,
  MdArrowForward,
} from 'react-icons/md';
import type { IconType } from 'react-icons';
import {
  MARKERS,
  RISKS,
  PIMA,
  IMPORTANCE,
  BINS,
  CHAPTER_BY_ID,
  TIERS,
  TIER_INTRO,
  LONGTERM,
  STAGING,
  classify,
  zoneColor,
  gradientFor,
  type Marker,
  type LtPaper,
} from './data';
import { useLocalStorage } from './useLocalStorage';

/* ---------- 1. Tổng quan ---------- */

export function Overview() {
  const cards = [
    {
      tag: 'Type 1',
      color: 'var(--accent)',
      title: 'Tự miễn',
      body: 'Hệ miễn dịch phá huỷ tế bào beta của tuỵ, làm cơ thể thiếu insulin. Có thể xuất hiện ở mọi tuổi, dù thường gặp ở trẻ em và người trẻ.',
    },
    {
      tag: 'Type 2',
      color: 'var(--amber)',
      title: 'Đề kháng insulin',
      body: 'Cơ thể đáp ứng kém với insulin và theo thời gian có thể không tiết đủ insulin. Nguy cơ chịu ảnh hưởng của tuổi, di truyền, cân nặng, vận động và nhiều yếu tố khác. Đây là trọng tâm của đề tài.',
    },
    {
      tag: 'Thai kỳ',
      color: 'var(--purple)',
      title: 'Gestational',
      body: 'Được phát hiện trong thai kỳ. Đường huyết thường trở về bình thường sau sinh, nhưng người từng mắc cần theo dõi vì nguy cơ type 2 về sau tăng. “Số lần mang thai” không đồng nghĩa với tiền sử ĐTĐ thai kỳ.',
    },
  ];
  return (
    <Section id="overview" icon={MdInfoOutline} title="Tiểu đường là gì & vì sao đáng dự đoán">
      <p className="kb-lead">
        Tiểu đường (đái tháo đường) là tình trạng <b>đường huyết cao mạn tính</b> do
        thiếu insulin hoặc cơ thể không dùng được insulin. Đường huyết cao kéo dài
        làm tăng nguy cơ tổn thương tim mạch, thận, mắt và thần kinh. Sàng lọc đúng người
        và dự báo nguy cơ đúng thời điểm có thể hỗ trợ phòng ngừa hoặc điều trị sớm.
      </p>
      <div className="kb-type-grid">
        {cards.map((c) => (
          <div key={c.tag} className="kb-type-card" style={{ borderTopColor: c.color }}>
            <span className="kb-type-tag" style={{ color: c.color }}>
              {c.tag}
            </span>
            <div className="kb-type-title">{c.title}</div>
            <p className="kb-type-body">{c.body}</p>
          </div>
        ))}
      </div>
      <div className="kb-callout">
        <MdLightbulbOutline />
        <div>
          <b>Phạm vi đề tài:</b> dùng dữ liệu dạng bảng/EHR để phân loại nhị phân{' '}
          <code>1 = có</code> và <code>0 = không</code> mắc ĐTĐ (chủ yếu type 2). Mô hình
          là công cụ ước tính/sàng lọc, không tự thay thế chẩn đoán của nhân viên y tế.
        </div>
      </div>
    </Section>
  );
}

/* ---------- 2. Đọc chỉ số (centerpiece tương tác) ---------- */

export function Biomarkers() {
  return (
    <Section
      id="biomarkers"
      icon={MdTune}
      title="Đọc dataset: chỉ số nào chẩn đoán, chỉ số nào chỉ liên quan nguy cơ?"
    >
      <p className="kb-lead">
        <b>Kéo từng thanh</b> để đọc ý nghĩa. Ba xét nghiệm đường huyết có ngưỡng
        chẩn đoán cho người không mang thai; các thanh còn lại chỉ minh hoạ cách đọc
        yếu tố liên quan/nguy cơ. Viền xanh nghĩa là biến có trong <b>Pima</b>.
      </p>
      <div className="kb-marker-grid">
        {MARKERS.map((m) => (
          <MarkerSlider key={m.key} m={m} />
        ))}
      </div>
      <div className="kb-callout amber">
        <MdWarningAmber />
        <div>
          <b>Đừng tự chẩn đoán từ một con số.</b> HbA1c, glucose đói và glucose 2 giờ
          OGTT là các lựa chọn xét nghiệm chẩn đoán. BMI, huyết áp, insulin và tuổi
          không tự kết luận ĐTĐ. Khi không có triệu chứng/tăng đường huyết rõ, ADA yêu
          cầu thêm một kết quả bất thường để xác nhận.
        </div>
      </div>
    </Section>
  );
}

function MarkerSlider({ m }: { m: Marker }) {
  const [val, setVal] = useState(m.start);
  const zone = classify(val, m.zones);
  const pct = ((val - m.min) / (m.max - m.min)) * 100;
  return (
    <div className={`kb-marker${m.inPima ? ' pima' : ''}`}>
      <div className="kb-marker-head">
        <m.Icon className="kb-marker-ico" />
        <div className="kb-marker-name">{m.label}</div>
        <span className={`kb-pima-tag${m.diagnostic ? '' : ' muted'}`}>
          {m.diagnostic ? 'Có ngưỡng ĐTĐ' : 'Không chẩn đoán ĐTĐ'}
        </span>
        {m.inPima && <span className="kb-pima-tag" data-tip="Có trong dataset Pima">Pima</span>}
      </div>

      <div className="kb-marker-readout">
        <span className="kb-marker-val">
          {m.step < 1 ? val.toFixed(1) : val}
          <span className="kb-marker-unit"> {m.unit}</span>
        </span>
        <span
          className="kb-zone-badge"
          style={{ color: zoneColor(zone.level), background: `${zoneColor(zone.level)}22` }}
        >
          {zone.level === 'ok' ? <MdCheckCircle /> : <MdWarningAmber />}
          {zone.label}
        </span>
      </div>

      <div className="kb-track" style={{ background: gradientFor(m) }}>
        <div className="kb-track-knob" style={{ left: `${pct}%` }} />
      </div>
      <input
        type="range"
        className="kb-range"
        min={m.min}
        max={m.max}
        step={m.step}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        aria-label={m.label}
      />
      <p className="kb-marker-why">{m.why}</p>
    </div>
  );
}

/* ---------- 3. Tiêu chí chẩn đoán ---------- */

export function Criteria() {
  const rows = [
    { test: 'HbA1c', normal: '< 5,7%', pre: '5,7–6,4%', dia: '≥ 6,5%' },
    { test: 'Glucose huyết tương lúc đói', normal: '< 100 mg/dL', pre: '100–125 mg/dL', dia: '≥ 126 mg/dL' },
    { test: 'Glucose huyết tương 2 giờ (OGTT 75 g)', normal: '< 140 mg/dL', pre: '140–199 mg/dL', dia: '≥ 200 mg/dL' },
    { test: 'Glucose huyết tương ngẫu nhiên', normal: 'Không dùng', pre: 'Không dùng', dia: '≥ 200 mg/dL + triệu chứng kinh điển/cơn tăng đường huyết' },
  ];
  return (
    <Section id="criteria" icon={MdBloodtype} title="Tiêu chí chẩn đoán chính thức (ADA)">
      <p className="kb-lead">
        Ngưỡng ADA 2026 dưới đây áp dụng cho <b>người không mang thai</b>. Các dataset
        có thể tạo nhãn bằng một hoặc nhiều tiêu chí khác nhau, nên luôn đọc định nghĩa
        outcome của từng nghiên cứu; không suy rằng <code>Outcome</code> của mọi bộ dữ
        liệu được tạo theo đúng cùng một cách.
      </p>
      <div className="kb-table-wrap">
        <table className="kb-crit-table">
          <thead>
            <tr>
              <th>Xét nghiệm</th>
              <th>
                <span className="dot green" /> Bình thường
              </th>
              <th>
                <span className="dot amber" /> Tiền tiểu đường
              </th>
              <th>
                <span className="dot red" /> Tiểu đường
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.test}>
                <td className="kb-crit-test">{r.test}</td>
                <td>{r.normal}</td>
                <td className="kb-amber">{r.pre}</td>
                <td className="kb-red">{r.dia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="kb-callout amber">
        <MdWarningAmber />
        <div>
          Nếu không có triệu chứng kinh điển hoặc cơn tăng đường huyết rõ, chẩn đoán cần
          <b> hai kết quả bất thường</b> (cùng hoặc khác xét nghiệm). HbA1c có thể kém tin
          cậy khi thai kỳ, thiếu máu, biến thể hemoglobin hay thay đổi vòng đời hồng cầu.
          Nguồn: <a href="https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes" target="_blank" rel="noreferrer">ADA Standards of Care 2026</a>.
        </div>
      </div>
    </Section>
  );
}

/* ---------- 4b. Giai đoạn tiến triển (glycemic staging) ---------- */

const DIR_ICON = { up: MdTrendingUp, flat: MdTrendingFlat, down: MdTrendingDown };

export function Staging() {
  const s = STAGING;
  return (
    <Section
      id="staging"
      icon={MdStairs}
      title="Giai đoạn tiến triển: Bình thường → Tiền ĐTĐ → Đái tháo đường"
    >
      <p className="kb-lead">{s.intro}</p>

      <div className="kb-stage-flow">
        {s.stages.map((st, i) => (
          <div key={st.key} className="kb-stage-wrap">
            <div className={`kb-stage ${st.tone}`}>
              <div className="kb-stage-head">
                <span className="kb-stage-no">{st.no}</span>
                <div className="kb-stage-titles">
                  <div className="kb-stage-name">{st.name}</div>
                  <div className="kb-stage-en">{st.en}</div>
                </div>
              </div>
              <div className="kb-stage-thr">
                <div>
                  <span>HbA1c</span>
                  <b>{st.hba1c}</b>
                </div>
                <div>
                  <span>Đường đói</span>
                  <b>{st.fpg}</b>
                </div>
                <div>
                  <span>OGTT 2h</span>
                  <b>{st.ogtt}</b>
                </div>
              </div>
              <p className="kb-stage-gist">{st.gist}</p>
              <div className="kb-stage-action">
                <MdLightbulbOutline /> <span>{st.action}</span>
              </div>
            </div>
            {i < s.stages.length - 1 && <MdArrowForward className="kb-stage-arrow" />}
          </div>
        ))}
      </div>

      <h3 className="kb-sub-title">Giai đoạn đi được cả hai chiều</h3>
      <p className="muted kb-sub-lead">{s.progIntro}</p>
      <div className="kb-prog">
        {s.directions.map((d) => {
          const Ic = DIR_ICON[d.dir];
          return (
            <div key={d.label} className={`kb-prog-card ${d.dir}`}>
              <div className="kb-prog-top">
                <Ic /> {d.label}
              </div>
              <p>{d.body}</p>
            </div>
          );
        })}
      </div>
      <div className="kb-callout">
        <MdInfoOutline />
        <div>{s.progNote}</div>
      </div>

      <h3 className="kb-sub-title">Khi “giai đoạn” trở thành bài toán ML (đề tài 2)</h3>
      <p className="muted kb-sub-lead">{s.mlIntro}</p>
      <div className="kb-mlp-grid">
        {s.mlPoints.map((p) => (
          <div key={p.title} className={`kb-mlp ${p.tone}`}>
            <div className="kb-mlp-title">
              {p.tone === 'ok' ? <MdCheckCircle /> : <MdWarningAmber />} {p.title}
            </div>
            <p className="kb-mlp-body">{p.body}</p>
            {p.evidence.length > 0 && (
              <div className="kb-para-papers">
                {p.evidence.map((e) => (
                  <span key={e} className="kb-evi-chip2">
                    {e}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 className="kb-sub-title">Dữ liệu để làm giai đoạn</h3>
      <div className="kb-ds">
        {s.datasets.map((d) => (
          <div key={d.name} className={`kb-ds-row${d.good ? '' : ' bad'}`}>
            <div className="kb-ds-main">
              <span className="kb-ds-name">{d.name}</span>
              <span className="kb-ds-role">{d.role}</span>
              <span className={`kb-ds-access${d.good ? '' : ' warn'}`}>{d.access}</span>
            </div>
            <p className="kb-ds-note">{d.note}</p>
          </div>
        ))}
      </div>

      <div className="kb-callout amber">
        <MdBlock />
        <div>
          <b>Ngoài phạm vi đề tài:</b>
          <ul className="kb-oos">
            {s.outOfScope.map((o) => (
              <li key={o.label}>
                <b>{o.label}</b> — {o.why}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="kb-callout">
        <MdLightbulbOutline />
        <div>
          <b>Chốt:</b> {s.takeaway}
        </div>
      </div>
    </Section>
  );
}

/* ---------- 4. Yếu tố nguy cơ ---------- */

export function Risks() {
  return (
    <Section id="risks" icon={MdWarningAmber} title="Yếu tố ảnh hưởng đến nguy cơ">
      <p className="kb-lead">
        Danh sách này phân biệt yếu tố <span className="kb-chip-mod">có thể thay đổi</span>{' '}
        và yếu tố không thể thay đổi; <b>không xếp hạng độ mạnh</b>, vì mức ảnh hưởng còn
        tuỳ quần thể và cách đo. Có yếu tố nguy cơ không có nghĩa chắc chắn sẽ mắc bệnh.
      </p>
      <div className="kb-risk-list">
        {RISKS.map((r) => (
          <div key={r.label} className="kb-risk-row">
            <r.Icon className="kb-risk-ico" />
            <div className="kb-risk-main">
              <div className="kb-risk-top">
                <span className="kb-risk-label">{r.label}</span>
                <span className={`kb-risk-flag ${r.modifiable ? 'mod' : 'fixed'}`}>
                  {r.modifiable ? 'Thay đổi được' : 'Cố định'}
                </span>
              </div>
              <span className="kb-risk-note">{r.note}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="muted kb-sub-lead">
        Tham khảo dễ đọc:{' '}
        <a href="https://www.cdc.gov/diabetes/risk-factors/" target="_blank" rel="noreferrer">
          CDC — Diabetes Risk Factors
        </a>.
      </p>
    </Section>
  );
}

/* ---------- 3b. Phân tầng chỉ số ---------- */

function ModBadge({ m }: { m: string }) {
  if (!m) return null;
  const map: Record<string, { t: string; c: string }> = {
    'có': { t: 'Thay đổi được', c: 'mod' },
    'không': { t: 'Cố định', c: 'fixed' },
    'một phần': { t: 'Một phần', c: 'part' },
  };
  const v = map[m] ?? { t: m, c: 'part' };
  return <span className={`kb-mod ${v.c}`}>{v.t}</span>;
}

export function Tiers() {
  return (
    <Section
      id="tiers"
      icon={MdLayers}
      title="Phân tầng chỉ số: cái nào CHẨN ĐOÁN, cái nào chỉ là NGUY CƠ"
    >
      <p className="kb-lead">{TIER_INTRO}</p>
      <div className="kb-tiers">
        {TIERS.map((t, idx) => (
          <div
            key={t.key}
            className="kb-tier"
            style={{ ['--tier' as string]: t.tone } as React.CSSProperties}
          >
            <div className="kb-tier-head">
              <span className="kb-tier-no">{idx + 1}</span>
              <div>
                <div className="kb-tier-title">{t.title}</div>
                <span className="kb-tier-role">{t.role}</span>
              </div>
            </div>
            <p className="kb-tier-sub">{t.subtitle}</p>
            <div className="kb-tier-items">
              {t.indicators.map((i) => (
                <div key={i.name} className="kb-ind">
                  <div className="kb-ind-top">
                    <span className="kb-ind-name">{i.name}</span>
                    <ModBadge m={i.modifiable} />
                    {i.evidence.length > 0 && (
                      <span
                        className="kb-ind-ev"
                        data-tip={`Bằng chứng: ${i.evidence.join(', ')}`}
                      >
                        {i.evidence.length} bài
                      </span>
                    )}
                  </div>
                  <p className="kb-ind-why">{i.why}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="kb-callout amber">
        <MdWarningAmber />
        <div>
          <b>Mẹo nhớ:</b> hỏi ba câu cho mỗi feature: nó được đo <i>khi nào</i>, outcome
          được tạo <i>bằng gì</i>, và mô hình sẽ được dùng <i>ở đâu</i>? Cùng một glucose
          baseline có thể là predictor hợp lệ cho nguy cơ 10 năm, nhưng trở thành
          circularity nếu chính phép đo đó vừa tạo nhãn hiện tại vừa làm đầu vào.
        </div>
      </div>
    </Section>
  );
}

/* ---------- 6. Dự đoán dài hạn ---------- */

function hzTag(h: string): { t: string; c: string } {
  if (h === 'long_term_risk') return { t: 'Dài hạn (onset N năm)', c: 'lt' };
  if (h === 'early_detection') return { t: 'Phát hiện sớm / forward', c: 'ed' };
  if (h === 'cross_sectional') return { t: 'Cắt ngang', c: 'cs' };
  return { t: h, c: 'cs' };
}

function LtPaperCard({ p }: { p: LtPaper }) {
  const [open, setOpen] = useState(false);
  const hz = hzTag(p.horizon);
  return (
    <div className={`kb-ltp-card${open ? ' open' : ''}`}>
      <button
        className="kb-ltp-head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        type="button"
      >
        <span className="kb-ltp-id">{p.paper_id}</span>
        <span className={`kb-ltp-hz ${hz.c}`}>{hz.t}</span>
        <span className="kb-ltp-win">{p.window}</span>
        <MdExpandMore className="kb-ltp-caret" />
      </button>
      {open && (
        <div className="kb-ltp-body">
          {p.cohort && (
            <p className="kb-ltp-cohort">
              <b>Cohort:</b> {p.cohort}
            </p>
          )}
          <p className="kb-ltp-pred">{p.predictors_summary}</p>
        </div>
      )}
    </div>
  );
}

export function LongTerm() {
  const lt = LONGTERM;
  return (
    <Section
      id="longterm"
      icon={MdTimeline}
      title="Horizon dự đoán: hiện tại, phát hiện sớm hay nguy cơ dài hạn?"
    >
      <div className="kb-callout">
        <MdInfoOutline />
        <div>{lt.intro}</div>
      </div>

      <h3 className="kb-sub-title">Các cách mô hình học theo từng mục tiêu thời gian</h3>
      <div className="kb-para-grid">
        {lt.paradigms.map((p) => (
          <div key={p.name} className="kb-para">
            <div className="kb-para-name">{p.name}</div>
            <p className="kb-para-desc">{p.desc}</p>
            <div className="kb-para-label">Đầu vào mô hình:</div>
            <div className="kb-chips">
              {p.inputs.map((x, i) => (
                <span key={i} className="kb-chip-in">
                  {x}
                </span>
              ))}
            </div>
            <div className="kb-para-papers">
              {p.papers.map((x) => (
                <span key={x} className="kb-evi-chip2">
                  {x}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="kb-sub-title">Nhóm chỉ số thường được xem xét trong bài toán forward/dài hạn</h3>
      <div className="kb-fg">
        {lt.featureGroups.map((g) => (
          <div key={g.group} className="kb-fg-row">
            <div className="kb-fg-name">{g.group}</div>
            <div className="kb-chips">
              {g.features.map((f, i) => (
                <span key={i} className="kb-chip-feat">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="kb-sub-title">Từng nghiên cứu: mốc thời gian &amp; bộ chỉ số (bấm để mở)</h3>
      <div className="kb-ltp">
        {lt.papers.map((p) => (
          <LtPaperCard key={p.paper_id} p={p} />
        ))}
      </div>

      <div className="kb-callout">
        <MdLightbulbOutline />
        <div>
          <b>Chốt:</b> {lt.takeaway}
        </div>
      </div>
    </Section>
  );
}

/* ---------- 5. Dataset Pima ---------- */

export function Dataset() {
  const [active, setActive] = useState<string | null>('Glucose');
  const sel = PIMA.find((p) => p.name === active);
  return (
    <Section id="dataset" icon={MdScience} title="Dataset kinh điển: Pima Indians Diabetes">
      <p className="kb-lead">
        768 phụ nữ từ 21 tuổi trở lên, 8 đặc trưng + 1 nhãn. Đây là bộ dữ liệu học tập
        kinh điển, nhưng không đại diện cho toàn bộ dân số.{' '}
        <b>Bấm từng dòng</b> để xem ý nghĩa — chú ý các cột mà <code>0</code> thực ra là
        dữ liệu thiếu.
      </p>
      <div className="kb-pima">
        <div className="kb-pima-table">
          {PIMA.map((p) => (
            <button
              key={p.name}
              className={`kb-pima-row${active === p.name ? ' active' : ''}${
                p.name === 'Outcome' ? ' target' : ''
              }`}
              onClick={() => setActive(p.name)}
            >
              <span className="kb-pima-name">{p.name}</span>
              <span className="kb-pima-vi">{p.vi}</span>
              {p.zeroIsMissing && (
                <span className="kb-pima-warn" data-tip="Giá trị 0 = dữ liệu thiếu trá hình">
                  0 = thiếu
                </span>
              )}
              {p.name === 'Outcome' && <span className="kb-pima-target-tag">nhãn</span>}
            </button>
          ))}
        </div>
        {sel && (
          <div className="kb-pima-detail">
            <div className="kb-pima-detail-title">{sel.name}</div>
            <div className="kb-pima-detail-vi">{sel.vi}</div>
            <div className="kb-kv">
              <span>Kiểu</span>
              <span>{sel.type}</span>
              <span>0 hợp lệ?</span>
              <span style={{ color: sel.zeroIsMissing ? 'var(--red)' : 'var(--green)' }}>
                {sel.zeroIsMissing ? 'Không — là missing' : 'Có'}
              </span>
            </div>
            <p className="kb-pima-detail-note">{sel.note}</p>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------- 6. Bẫy khi làm ML ---------- */

export function Pitfalls() {
  return (
    <Section id="pitfalls" icon={MdWarningAmber} title="Những bẫy người ta hay gặp">
      <ClassImbalance />
      <ThresholdDemo />
      <FeatureImportance />
      <div className="kb-pit-grid">
        <PitCard
          title="Giá trị 0 / missing"
          body="Pima có các giá trị 0 không hợp lý ở một số phép đo. Hãy quy ước chúng là missing theo từng cột, rồi chọn cách xử lý phù hợp và học tham số impute chỉ từ train; không mặc định mọi số 0 đều là thiếu."
        />
        <PitCard
          title="Rò rỉ dữ liệu (leakage)"
          body="Nếu cùng một phép đo HbA1c/glucose vừa tạo nhãn hiện tại vừa làm feature, mô hình có thể chỉ đọc lại định nghĩa nhãn. Nhưng glucose đo trước outcome dài hạn có thể là predictor hợp lệ: phải xét thời điểm và intended use."
        />
        <PitCard
          title="Chuẩn hoá & rò rỉ qua split"
          body="Tính mean/std để chuẩn hoá PHẢI làm trên tập train rồi áp cho test. Làm trên toàn bộ trước khi chia = lộ thông tin test."
        />
        <PitCard
          title="Overfitting"
          body="Mô hình thuộc lòng 768 mẫu, ra ngoài đoán dở. Dùng cross-validation, regularization, giữ tập test sạch để biết hiệu năng thật."
        />
      </div>
    </Section>
  );
}

function PitCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="kb-pit-card">
      <div className="kb-pit-title">
        <MdWarningAmber /> {title}
      </div>
      <p>{body}</p>
    </div>
  );
}

/* class imbalance: pie + giải thích */
function ClassImbalance() {
  const pos = 268;
  const neg = 500;
  const total = pos + neg;
  const posPct = (pos / total) * 100;
  // donut bằng conic-gradient
  const bg = `conic-gradient(var(--red) 0 ${posPct}%, var(--surface-3) ${posPct}% 100%)`;
  return (
    <div className="kb-sub">
      <h3 className="kb-sub-title">1. Dữ liệu lệch lớp (class imbalance)</h3>
      <div className="kb-imb">
        <div className="kb-donut" style={{ background: bg }}>
          <div className="kb-donut-hole">
            <b>{posPct.toFixed(0)}%</b>
            <span>mắc bệnh</span>
          </div>
        </div>
        <div className="kb-imb-text">
          <p>
            Pima: <b className="kb-red">{pos} mắc</b> / <b className="kb-green">{neg} không</b>.
            Lớp "có bệnh" là thiểu số. Tỷ lệ ở dữ liệu thực thay đổi mạnh theo quần thể,
            tiêu chí chọn mẫu và cách định nghĩa outcome.
          </p>
          <p className="kb-imb-trap">
            ⚠️ Mô hình ngu "đoán tất cả KHÔNG bệnh" vẫn đạt <b>{((neg / total) * 100).toFixed(0)}% accuracy</b> —
            nhưng bỏ sót <b>100% bệnh nhân</b>. Vì vậy <b>accuracy lừa người</b>.
          </p>
          <p className="muted">
            Khắc phục: báo sensitivity/recall, specificity, precision, AUROC, AUPRC và
            calibration; cân nhắc class weight/oversampling <b>chỉ trên train</b>, rồi
            chọn ngưỡng theo mục tiêu sử dụng.
          </p>
        </div>
      </div>
    </div>
  );
}

/* threshold demo: confusion matrix tương tác */
function ThresholdDemo() {
  const [t, setT] = useState(50);
  const { tp, fp, tn, fn } = useMemo(() => {
    let TP = 0, FP = 0, TN = 0, FN = 0;
    for (const b of BINS) {
      const predPos = b.center >= t;
      if (predPos) {
        TP += b.pos;
        FP += b.neg;
      } else {
        FN += b.pos;
        TN += b.neg;
      }
    }
    return { tp: TP, fp: FP, tn: TN, fn: FN };
  }, [t]);

  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const accuracy = (tp + tn) / (tp + fp + tn + fn);
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;

  return (
    <div className="kb-sub">
      <h3 className="kb-sub-title">2. Vì sao phải nhìn nhiều chỉ số — kéo ngưỡng quyết định</h3>
      <p className="muted kb-sub-lead">
        Mô hình ra <b>xác suất</b>, ta chọn ngưỡng để cắt thành 0/1. Kéo ngưỡng và xem
        precision/recall đánh đổi nhau ra sao.
      </p>
      <div className="kb-thr">
        <div className="kb-thr-controls">
          <label className="kb-thr-label">
            Ngưỡng: <b>{t}</b>
          </label>
          <input
            type="range"
            min={5}
            max={95}
            step={1}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            className="kb-range plain"
          />
          <div className="kb-metrics">
            <Metric label="Accuracy" v={accuracy} hint="Dễ lừa khi lệch lớp" />
            <Metric label="Precision" v={precision} hint="Đoán bệnh thì đúng bao nhiêu" tone="accent" />
            <Metric label="Recall" v={recall} hint="Bắt được bao nhiêu ca bệnh thật" tone="green" />
            <Metric label="F1" v={f1} hint="Cân bằng P & R" tone="purple" />
          </div>
        </div>

        <div className="kb-cm">
          <div className="kb-cm-grid">
            <div className="kb-cm-cell tp">
              <span className="kb-cm-n">{tp}</span>
              <span className="kb-cm-l">TP · bắt đúng bệnh</span>
            </div>
            <div className="kb-cm-cell fn">
              <span className="kb-cm-n">{fn}</span>
              <span className="kb-cm-l">FN · BỎ SÓT bệnh</span>
            </div>
            <div className="kb-cm-cell fp">
              <span className="kb-cm-n">{fp}</span>
              <span className="kb-cm-l">FP · báo động nhầm</span>
            </div>
            <div className="kb-cm-cell tn">
              <span className="kb-cm-n">{tn}</span>
              <span className="kb-cm-l">TN · đúng người khoẻ</span>
            </div>
          </div>
          <p className="kb-cm-note">
            Trong <b>sàng lọc</b>, thường ưu tiên giảm FN (bỏ sót), nhưng FP cũng gây xét
            nghiệm, lo lắng và chi phí. Ngưỡng phải cân bằng hai loại hậu quả theo bối cảnh.
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  v,
  hint,
  tone,
}: {
  label: string;
  v: number;
  hint: string;
  tone?: string;
}) {
  const color =
    tone === 'accent'
      ? 'var(--accent)'
      : tone === 'green'
      ? 'var(--green)'
      : tone === 'purple'
      ? 'var(--purple)'
      : 'var(--text)';
  return (
    <div className="kb-metric" data-tip={hint}>
      <span className="kb-metric-l">{label}</span>
      <span className="kb-metric-v" style={{ color }}>
        {(v * 100).toFixed(0)}%
      </span>
    </div>
  );
}

/* feature importance bars */
function FeatureImportance() {
  return (
    <div className="kb-sub">
      <h3 className="kb-sub-title">3. Đặc trưng nào "nặng ký" nhất</h3>
      <p className="muted kb-sub-lead">
        Sơ đồ <b>minh hoạ thứ hạng thường gặp</b>, không phải phần trăm ảnh hưởng hay kết
        quả chung cho mọi mô hình. Feature importance phụ thuộc thuật toán, cách xử lý
        missing và mẫu nghiên cứu; nó cũng không chứng minh quan hệ nhân quả.
      </p>
      <div className="kb-imp">
        {IMPORTANCE.map((d) => (
          <div key={d.f} className="kb-imp-row">
            <span className="kb-imp-f">{d.f}</span>
            <div className="kb-imp-track">
              <div className="kb-imp-fill" style={{ width: `${d.v}%` }} />
            </div>
            <span className="kb-imp-v">{d.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 7. Checklist ---------- */

const CHECKLIST_ITEMS = [
  'Định nghĩa đúng outcome, thời điểm đo feature và intended use',
  'Xử lý giá trị 0 = missing (glucose, BP, insulin, BMI, skin)',
  'Chia train/test TRƯỚC khi chuẩn hoá hay impute',
  'Báo sensitivity, specificity, precision, AUROC, AUPRC và calibration với khoảng tin cậy',
  'Dùng internal validation phù hợp; giữ test/external data ngoài quá trình chọn mô hình',
  'Nếu dùng class weight / SMOTE, chỉ áp dụng trong train fold và kiểm lại calibration',
  'Chọn ngưỡng theo hậu quả của FN/FP và nguồn lực sàng lọc',
  'Diễn giải feature importance như hành vi mô hình, không phải nguyên nhân y học',
];

export function Checklist() {
  const [stored, setStored, ready] = useLocalStorage<boolean[]>(
    'explorex.kb.checklist',
    CHECKLIST_ITEMS.map(() => false),
  );
  // guard nếu số mục đổi so với dữ liệu cũ
  const done =
    stored.length === CHECKLIST_ITEMS.length ? stored : CHECKLIST_ITEMS.map(() => false);
  const count = done.filter(Boolean).length;
  return (
    <Section id="checklist" icon={MdCheckCircle} title="Checklist trước khi train mô hình">
      <p className="kb-lead">
        Tự tick để chắc đã nghĩ qua. ({count}/{CHECKLIST_ITEMS.length})
      </p>
      <div className="kb-check" style={ready ? undefined : { visibility: 'hidden' }}>
        {CHECKLIST_ITEMS.map((it, i) => (
          <button
            key={i}
            className={`kb-check-row${done[i] ? ' on' : ''}`}
            onClick={() => setStored((d) => d.map((x, j) => (j === i ? !x : x)))}
          >
            <span className="kb-check-box">{done[i] && <MdCheckCircle />}</span>
            <span>{it}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}

/* ---------- shared Section ---------- */

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: IconType;
  title: string;
  children: React.ReactNode;
}) {
  const ch = CHAPTER_BY_ID[id];
  return (
    <section
      id={id}
      className="kb-section kb-reveal"
      style={ch ? ({ ['--ch' as string]: ch.hue } as React.CSSProperties) : undefined}
    >
      <h2 className="kb-h2">
        {ch && <span className="kb-chno">{ch.no}</span>}
        <Icon className="kb-h2-ico" />
        {title}
      </h2>
      {children}
    </section>
  );
}
