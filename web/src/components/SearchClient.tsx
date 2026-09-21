'use client';

import { useCallback, useRef, useState } from 'react';
import {
  MdTravelExplore,
  MdCode,
  MdDataset,
  MdPictureAsPdf,
  MdBookmarkAdd,
  MdCheckCircle,
  MdHub,
  MdBlock,
  MdAccountTree,
} from 'react-icons/md';
import { PUBLIC_LAYERS } from '@/lib/layers-public';

export interface LibPaperRef {
  layerDir: string;
  folder: string;
  title: string;
  layer: number;
  paper_id: string;
}

interface SourceState {
  status: 'idle' | 'querying' | 'done' | 'error';
  count?: number;
  latency?: number;
  error?: string;
}
interface ResultPaper {
  run_id: number;
  paper: {
    title: string;
    authors: string[];
    year: number | null;
    venue: string | null;
    doi: string | null;
    citations: number | null;
    pdf_url: string | null;
    code_url: string | null;
    datasets: string[];
    found_by: string[];
    dedup_key: string;
    [k: string]: unknown;
  };
}

const SOURCE_LABELS: Record<string, string> = {
  arxiv: 'arXiv',
  openalex: 'OpenAlex',
  'openalex-related': 'OpenAlex ~similar',
  snowball: 'Snowball ⛓',
  semanticscholar: 'S2',
  crossref: 'Crossref',
  pubmed: 'PubMed',
  core: 'CORE',
  springer: 'Springer',
};

export function SearchClient({ library }: { library: LibPaperRef[] }) {
  const [keyword, setKeyword] = useState('');
  const [similarTo, setSimilarTo] = useState('');
  const [hasCode, setHasCode] = useState(false);
  const [hasDataset, setHasDataset] = useState(false);
  const [hasOA, setHasOA] = useState(false);
  const [minCitations, setMinCitations] = useState(0);
  const [snowball, setSnowball] = useState(false);
  const [targetLayer, setTargetLayer] = useState(2);

  const [running, setRunning] = useState(false);
  const [sources, setSources] = useState<Record<string, SourceState>>({});
  const [phases, setPhases] = useState<string[]>([]);
  const [results, setResults] = useState<ResultPaper[]>([]);
  const [summary, setSummary] = useState<{ kept: number; merged: number } | null>(
    null,
  );
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    if (running) {
      abortRef.current?.abort();
      setRunning(false);
      return;
    }
    if (!keyword.trim() && !similarTo) {
      alert('Cần ít nhất từ khoá hoặc chọn paper tương đồng.');
      return;
    }
    setRunning(true);
    setSources({});
    setPhases([]);
    setResults([]);
    setSummary(null);

    const sim = similarTo
      ? (() => {
          const p = library.find((l) => `${l.layerDir}//${l.folder}` === similarTo);
          return p ? { layerDir: p.layerDir, folder: p.folder } : null;
        })()
      : null;

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const resp = await fetch('/api/search/auto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ac.signal,
        body: JSON.stringify({
          keyword: keyword.trim(),
          similarTo: sim,
          snowball: snowball && Boolean(sim),
          filters: { hasCode, hasDataset, hasOA, minCitations: minCitations || undefined },
          targetLayer,
        }),
      });
      if (!resp.body) throw new Error('Không có stream');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      // đọc stream NDJSON
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          handleEvent(JSON.parse(line));
        }
      }
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        setPhases((p) => [...p, `⚠ ${e instanceof Error ? e.message : e}`]);
      }
    } finally {
      setRunning(false);
    }

    function handleEvent(ev: Record<string, unknown>) {
      const type = ev.type as string;
      if (type === 'source') {
        const id = ev.id as string;
        setSources((s) => ({
          ...s,
          [id]: {
            status: ev.status as SourceState['status'],
            count: ev.count as number | undefined,
            latency: ev.latency as number | undefined,
            error: ev.error as string | undefined,
          },
        }));
      } else if (type === 'phase' || type === 'log') {
        const prefix = ev.level === 'error' ? '✕ ' : ev.level === 'warn' ? '⚠ ' : '';
        setPhases((p) => [...p, prefix + (ev.msg as string)]);
      } else if (type === 'result') {
        setResults((r) => [...r, ev as unknown as ResultPaper]);
      } else if (type === 'done') {
        setSummary({ kept: ev.kept as number, merged: ev.merged as number });
      }
    }
  }, [
    running,
    keyword,
    similarTo,
    snowball,
    hasCode,
    hasDataset,
    hasOA,
    minCitations,
    targetLayer,
    library,
  ]);

  const sourceChips = Object.entries(sources);

  return (
    <div className="disco">
      {/* Query builder */}
      <div className="disco-builder">
        <div className="disco-kw">
          <input
            type="search"
            placeholder="Mô tả / từ khoá đề tài (vd: type 2 diabetes prediction tabular EHR)…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !running && run()}
          />
          <button className="primary" onClick={run} disabled={false}>
            {running ? (
              <>
                <span className="spinner" /> Dừng
              </>
            ) : (
              <>
                <MdTravelExplore style={{ fontSize: 17 }} /> Tự động tìm
              </>
            )}
          </button>
        </div>

        <div className="disco-filters">
          <FilterChip
            active={hasCode}
            onClick={() => setHasCode((v) => !v)}
            tip="Chỉ giữ paper có link code (github phát hiện từ abstract)"
          >
            <MdCode /> Có code
          </FilterChip>
          <FilterChip
            active={hasDataset}
            onClick={() => setHasDataset((v) => !v)}
            tip="Chỉ giữ paper nhận diện được dataset public (PIMA, NHANES, MIMIC…)"
          >
            <MdDataset /> Có dataset
          </FilterChip>
          <FilterChip
            active={hasOA}
            onClick={() => setHasOA((v) => !v)}
            tip="Chỉ giữ paper có PDF Open Access tải được"
          >
            <MdPictureAsPdf /> Có PDF OA
          </FilterChip>

          <div className="disco-num" data-tip="Ngưỡng citations tối thiểu">
            <span>≥</span>
            <input
              type="number"
              min={0}
              value={minCitations}
              onChange={(e) => setMinCitations(Number(e.target.value))}
            />
            <span>cite</span>
          </div>

          <select
            className="disco-similar"
            value={similarTo}
            onChange={(e) => setSimilarTo(e.target.value)}
            data-tip="Tìm bài tương đồng với 1 paper đã có (OpenAlex related works)"
          >
            <option value="">Tương đồng với… (tuỳ chọn)</option>
            {library.map((p) => (
              <option key={`${p.layerDir}//${p.folder}`} value={`${p.layerDir}//${p.folder}`}>
                L{p.layer} · {p.title.slice(0, 55)}
              </option>
            ))}
          </select>

          {similarTo && (
            <FilterChip
              active={snowball}
              onClick={() => setSnowball((v) => !v)}
              tip="Snowball: duyệt references (backward) + citations (forward) của paper đã chọn — tìm đúng cụm literature liên quan"
            >
              <MdAccountTree /> Snowball
            </FilterChip>
          )}

          <select
            value={targetLayer}
            onChange={(e) => setTargetLayer(Number(e.target.value))}
            data-tip="Layer mặc định khi lưu kết quả"
            style={{ width: 'auto' }}
          >
            {PUBLIC_LAYERS.map((l) => (
              <option key={l.id} value={l.id}>
                Lưu vào L{l.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Process view */}
      {(sourceChips.length > 0 || phases.length > 0) && (
        <div className="disco-process">
          <div className="proc-sources">
            {sourceChips.map(([id, s]) => (
              <span key={id} className={`proc-chip ${s.status}`} data-tip={s.error ?? ''}>
                {s.status === 'querying' && <span className="spinner" />}
                {s.status === 'done' && <MdCheckCircle className="ico-ok" />}
                {SOURCE_LABELS[id] ?? id}
                {s.count != null && <b>{s.count}</b>}
              </span>
            ))}
          </div>
          {phases.length > 0 && (
            <div className="proc-log">
              {phases.map((ln, i) => (
                <div key={i} className="proc-line">
                  {ln}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {summary && (
        <div className="disco-summary">
          <MdHub /> {summary.kept} paper phù hợp{' '}
          <span className="faint">(từ {summary.merged} sau gộp trùng)</span>
        </div>
      )}
      <div className="disco-results">
        {results.map((r) => (
          <ResultCard key={r.paper.dedup_key} item={r} defaultLayer={targetLayer} />
        ))}
        {running && results.length === 0 && (
          <div className="empty-state">Đang tìm… kết quả sẽ hiện dần.</div>
        )}
        {!running && results.length === 0 && summary && (
          <div className="empty-state">
            Không có paper nào qua bộ lọc. Thử nới filter hoặc đổi từ khoá.
          </div>
        )}
        {!running && results.length === 0 && !summary && (
          <div className="empty-state">
            Nhập từ khoá hoặc chọn paper tương đồng, rồi bấm “Tự động tìm”. ExploreX
            sẽ tự fan-out nhiều nguồn, lọc theo yêu cầu, hiện tiến trình + kết quả.
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  tip,
  children,
}: {
  active: boolean;
  onClick: () => void;
  tip: string;
  children: React.ReactNode;
}) {
  return (
    <button className={`filter-chip${active ? ' active' : ''}`} onClick={onClick} data-tip={tip}>
      {children}
    </button>
  );
}

function ResultCard({
  item,
  defaultLayer,
}: {
  item: ResultPaper;
  defaultLayer: number;
}) {
  const { paper, run_id } = item;
  const [open, setOpen] = useState(false);
  const [layer, setLayer] = useState(defaultLayer);
  const [paperId, setPaperId] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [downloadPdf, setDownloadPdf] = useState(true);
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejected, setRejected] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch('/api/search/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper,
          layer,
          paper_id: paperId || undefined,
          run_id,
          download_pdf: downloadPdf,
        }),
      });
      const d = await r.json();
      if (d.error) alert(`Lỗi lưu: ${d.error}`);
      else {
        setSavedId(d.paper_id);
        setOpen(false);
      }
    } catch (e) {
      alert(`Lỗi: ${e instanceof Error ? e.message : e}`);
    } finally {
      setSaving(false);
    }
  };

  const doReject = async () => {
    if (!rejectReason.trim()) return;
    const r = await fetch('/api/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: paper.title,
        doi: paper.doi,
        reason: rejectReason.trim(),
        by: 'user',
      }),
    });
    if (r.ok) setRejected(true);
  };

  if (rejected) {
    return (
      <div className="rcard rcard-rejected">
        <div className="rcard-main">
          <div className="rcard-title faint" style={{ textDecoration: 'line-through' }}>
            {paper.title}
          </div>
          <div className="rcard-meta">Đã loại — sẽ không tìm lại</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rcard">
      <div className="rcard-main">
        <div className="rcard-title">{paper.title}</div>
        <div className="rcard-meta">
          {paper.year ?? '—'} · {paper.venue ?? '—'} ·{' '}
          {paper.authors.slice(0, 3).join(', ')}
          {paper.authors.length > 3 ? ' et al.' : ''}
        </div>
        <div className="rcard-tags">
          {paper.found_by.map((s) => (
            <span key={s} className="src-pill">
              {SOURCE_LABELS[s] ?? s}
            </span>
          ))}
          <span className="rtag" data-tip="Citations">
            {paper.citations ?? '?'} cite
          </span>
          {paper.code_url && (
            <a className="rtag on" href={paper.code_url} target="_blank" rel="noreferrer" data-tip={paper.code_url}>
              <MdCode /> code
            </a>
          )}
          {paper.datasets.length > 0 && (
            <span className="rtag on" data-tip={paper.datasets.join(', ')}>
              <MdDataset /> {paper.datasets.length}
            </span>
          )}
          {paper.pdf_url && (
            <span className="rtag on" data-tip="Có PDF Open Access">
              <MdPictureAsPdf /> OA
            </span>
          )}
          {paper.doi && (
            <a className="rtag" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
              DOI
            </a>
          )}
        </div>
      </div>
      <div className="rcard-action">
        {savedId ? (
          <span className="badge green" data-tip={`Đã lưu: ${savedId}`}>
            <MdCheckCircle /> Đã lưu
          </span>
        ) : (
          <>
            <button className="ghost icon-btn" onClick={() => setOpen((o) => !o)} data-tip="Lưu vào thư viện">
              <MdBookmarkAdd />
            </button>
            <button
              className="ghost icon-btn"
              onClick={() => setRejecting((v) => !v)}
              data-tip="Loại — không tìm lại"
            >
              <MdBlock />
            </button>
          </>
        )}
      </div>

      {rejecting && !savedId && (
        <div className="rcard-save rcard-reject">
          <input
            type="text"
            placeholder="Lý do loại (bắt buộc)…"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doReject()}
            autoFocus
          />
          <button className="primary" onClick={doReject} disabled={!rejectReason.trim()}>
            Loại bài này
          </button>
        </div>
      )}

      {open && (
        <div className="rcard-save">
          <select value={layer} onChange={(e) => setLayer(Number(e.target.value))} style={{ width: 'auto' }}>
            {PUBLIC_LAYERS.map((l) => (
              <option key={l.id} value={l.id}>
                L{l.id} — {l.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="paper_id (tự sinh nếu trống)"
            value={paperId}
            onChange={(e) => setPaperId(e.target.value)}
          />
          <label className="dl-check" data-tip="Tải PDF nếu có link OA">
            <input type="checkbox" checked={downloadPdf} onChange={(e) => setDownloadPdf(e.target.checked)} />
            PDF
          </label>
          <button className="primary" onClick={save} disabled={saving}>
            {saving ? 'Đang lưu…' : 'Lưu'}
          </button>
        </div>
      )}
    </div>
  );
}
