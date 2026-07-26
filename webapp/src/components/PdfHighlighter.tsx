'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Highlight, HighlightRect } from '@/lib/highlight-types';

// PDF viewer dùng pdf.js: render canvas + text layer (chọn được chữ) + overlay
// highlight. Highlight lưu bbox chuẩn hoá 0..1 nên zoom/scale lại vẫn đúng.

const COLORS = [
  { id: 'yellow', css: 'rgba(255, 214, 0, 0.40)' },
  { id: 'green', css: 'rgba(63, 215, 121, 0.38)' },
  { id: 'blue', css: 'rgba(86, 170, 255, 0.38)' },
  { id: 'pink', css: 'rgba(255, 120, 190, 0.38)' },
];

interface PageView {
  pageNum: number;
  width: number;
  height: number;
}

type Reading = { en: string; vi: string | null };

function splitSections(md: string): string[] {
  const out: string[] = [];
  let cur: string[] = [];
  for (const line of md.split('\n')) {
    if (/^#{1,6}\s/.test(line) && cur.length) {
      out.push(cur.join('\n'));
      cur = [];
    }
    cur.push(line);
  }
  if (cur.length) out.push(cur.join('\n'));
  return out.length ? out : [md];
}

function plainText(md: string): string {
  return md
    .replace(/<!--.*?-->/gs, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[|*_`>~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalized(text: string): string {
  return text
    .toLocaleLowerCase('en')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function rangeFromOffsets(root: HTMLElement, start: number, end: number) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let pos = 0;
  let startNode: Text | null = null;
  let endNode: Text | null = null;
  let startOffset = 0;
  let endOffset = 0;
  let node = walker.nextNode() as Text | null;
  while (node) {
    const next = pos + (node.nodeValue?.length ?? 0);
    if (!startNode && start >= pos && start <= next) {
      startNode = node;
      startOffset = Math.max(0, start - pos);
    }
    if (end >= pos && end <= next) {
      endNode = node;
      endOffset = Math.max(0, end - pos);
      break;
    }
    pos = next;
    node = walker.nextNode() as Text | null;
  }
  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, Math.min(startOffset, startNode.length));
  range.setEnd(endNode, Math.min(endOffset, endNode.length));
  return range;
}

export function PdfHighlighter({ base }: { base: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfScrollRef = useRef<HTMLDivElement>(null);
  const translationRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<PageView[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [pending, setPending] = useState<Highlight | null>(null);
  const [reading, setReading] = useState<Reading | null>(null);
  const [color, setColor] = useState(COLORS[0].id);
  const [splitPercent, setSplitPercent] = useState(55);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle',
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const highlightsRef = useRef<Highlight[]>([]);
  highlightsRef.current = highlights;
  const pageTextsRef = useRef<string[]>([]);
  const seq = useRef(0);

  // tải highlights đã lưu
  useEffect(() => {
    fetch(`${base}/highlights`)
      .then((r) => r.json())
      .then((d) => setHighlights(Array.isArray(d.highlights) ? d.highlights : []))
      .catch(() => {});
  }, [base]);

  // Bản dịch dùng ngay cạnh PDF. Nếu paper chưa có extracted.md/vi thì viewer
  // vẫn hoạt động như trước, không biến lỗi reading thành lỗi PDF.
  useEffect(() => {
    let alive = true;
    fetch(`${base}/reading`)
      .then((r) => r.json())
      .then((d) => {
        if (alive && !d.error) setReading(d as Reading);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [base]);

  const enSections = useMemo(
    () => (reading?.en ? splitSections(reading.en) : []),
    [reading],
  );
  const viSections = useMemo(
    () => (reading?.vi ? splitSections(reading.vi) : []),
    [reading],
  );

  // render PDF
  useEffect(() => {
    let cancelled = false;
    let pdfDoc: { destroy: () => void; numPages: number } | null = null;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        const loadingTask = pdfjs.getDocument({ url: `${base}/pdf` });
        const doc = await loadingTask.promise;
        if (cancelled) {
          doc.destroy();
          return;
        }
        pdfDoc = doc;
        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = '';
        const pageViews: PageView[] = [];
        const pageTexts: string[] = [];

        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          if (cancelled) return;
          const viewport = page.getViewport({ scale: 1.4 * zoom });

          const pageEl = document.createElement('div');
          pageEl.className = 'pdf-page';
          pageEl.dataset.page = String(n);
          pageEl.style.width = `${viewport.width}px`;
          pageEl.style.height = `${viewport.height}px`;

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = 'pdf-canvas';
          const ctx = canvas.getContext('2d');
          pageEl.appendChild(canvas);

          const textLayerDiv = document.createElement('div');
          textLayerDiv.className = 'textLayer';
          pageEl.appendChild(textLayerDiv);

          const hlLayer = document.createElement('div');
          hlLayer.className = 'hl-layer';
          hlLayer.dataset.page = String(n);
          pageEl.appendChild(hlLayer);

          container.appendChild(pageEl);

          await page.render({ canvasContext: ctx!, viewport }).promise;

          const textContent = await page.streamTextContent();
          const fullText = await page.getTextContent();
          pageTexts.push(
            fullText.items
              .map((item: unknown) =>
                typeof item === 'object' && item !== null && 'str' in item
                  ? String((item as { str: unknown }).str)
                  : '',
              )
              .join(' '),
          );
          const textLayer = new pdfjs.TextLayer({
            textContentSource: textContent,
            container: textLayerDiv,
            viewport,
          });
          await textLayer.render();

          pageViews.push({
            pageNum: n,
            width: viewport.width,
            height: viewport.height,
          });
        }
        if (!cancelled) {
          pageTextsRef.current = pageTexts;
          setPages(pageViews);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Lỗi tải PDF');
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (pdfDoc) pdfDoc.destroy();
    };
  }, [base, zoom]);

  const persist = useCallback(
    async (list: Highlight[]) => {
      setStatus('saving');
      try {
        const r = await fetch(`${base}/highlights`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ highlights: list }),
        });
        setStatus(r.ok ? 'saved' : 'error');
      } catch {
        setStatus('error');
      }
    },
    [base],
  );

  const inferPdfPage = useCallback((originalSection: string) => {
    const source = normalized(plainText(originalSection));
    if (!source) return undefined;
    const words = source.split(' ');
    // Đầu mục/đầu đoạn thường đủ đặc hiệu; thử từ dài tới ngắn để chịu được
    // khác biệt xuống dòng và khoảng trắng của text layer PDF.
    const probes = [18, 12, 8]
      .map((n) => words.slice(0, n).join(' '))
      .filter((s) => s.length >= 18);
    for (const probe of probes) {
      const index = pageTextsRef.current.findIndex((page) =>
        normalized(page).includes(probe),
      );
      if (index >= 0) return index + 1;
    }
    return undefined;
  }, []);

  const goToPdfPage = useCallback((page?: number) => {
    if (!page) return;
    const pageEl = containerRef.current?.querySelector(
      `.pdf-page[data-page="${page}"]`,
    ) as HTMLElement | null;
    const scroll = pdfScrollRef.current;
    if (!pageEl || !scroll) return;
    scroll.scrollTo({
      top: Math.max(0, pageEl.offsetTop - 12),
      behavior: 'smooth',
    });
    pageEl.classList.remove('pdf-page-linked');
    requestAnimationFrame(() => pageEl.classList.add('pdf-page-linked'));
    window.setTimeout(() => pageEl.classList.remove('pdf-page-linked'), 1800);
  }, []);

  // Chọn text chỉ tạo bản nháp. User phải bấm "Đánh dấu" mới ghi file.
  const onMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0)
      return;
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    if (!text) return;

    // tìm page chứa điểm bắt đầu
    let node: Node | null = range.startContainer;
    let pageEl: HTMLElement | null = null;
    while (node) {
      if (
        node instanceof HTMLElement &&
        node.classList?.contains('pdf-page')
      ) {
        pageEl = node;
        break;
      }
      node = node.parentNode;
    }
    if (!pageEl) return;
    const pageNum = Number(pageEl.dataset.page);
    const pageRect = pageEl.getBoundingClientRect();
    const pw = pageRect.width;
    const ph = pageRect.height;

    const clientRects = Array.from(range.getClientRects());
    const rects: HighlightRect[] = clientRects
      .filter((r) => r.width > 1 && r.height > 1)
      .map((r) => ({
        x: (r.left - pageRect.left) / pw,
        y: (r.top - pageRect.top) / ph,
        w: r.width / pw,
        h: r.height / ph,
      }));
    if (rects.length === 0) return;

    const hl: Highlight = {
      id: 'pending-pdf',
      page: pageNum,
      color,
      rects,
      text,
      created_at: '',
      source: 'pdf',
    };
    setPending(hl);
  }, [color]);

  const onTranslationMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    if (!text) return;
    const contentEl =
      range.startContainer.parentElement?.closest<HTMLElement>('[data-vi-content]');
    const endContent =
      range.endContainer.parentElement?.closest<HTMLElement>('[data-vi-content]');
    if (!contentEl || contentEl !== endContent) return;
    const sectionEl = contentEl.closest<HTMLElement>('[data-vi-section]');
    if (!sectionEl) return;
    const section = Number(sectionEl.dataset.viSection);
    if (!Number.isInteger(section)) return;

    const before = range.cloneRange();
    before.selectNodeContents(contentEl);
    before.setEnd(range.startContainer, range.startOffset);
    const rangeStart = before.toString().length;
    const rangeEnd = rangeStart + selection.toString().length;
    const original = enSections[section] ?? '';
    const page = inferPdfPage(original);
    const hl: Highlight = {
      id: 'pending-vi',
      page,
      color,
      rects: [],
      text,
      created_at: '',
      source: 'vi',
      section,
      range_start: rangeStart,
      range_end: rangeEnd,
      original_text: plainText(original).slice(0, 600),
    };
    setPending(hl);
  }, [color, enSections, inferPdfPage]);

  const commitPending = useCallback(() => {
    if (!pending) return;
    seq.current += 1;
    const id =
      pending.source === 'vi'
        ? `v${pending.section ?? 0}_${Date.now()}_${seq.current}`
        : `h${pending.page ?? 0}_${Date.now()}_${seq.current}`;
    const committed: Highlight = {
      ...pending,
      id,
      color,
      created_at: new Date().toISOString(),
    };
    const next = [...highlightsRef.current, committed];
    setHighlights(next);
    setPending(null);
    persist(next);
    window.getSelection()?.removeAllRanges();
  }, [color, pending, persist]);

  const cancelPending = useCallback(() => {
    setPending(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  const resizeFromClientX = useCallback((clientX: number) => {
    const rect = layoutRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.min(72, Math.max(28, next)));
  }, []);

  const onSplitPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      resizeFromClientX(event.clientX);
      const onMove = (moveEvent: PointerEvent) =>
        resizeFromClientX(moveEvent.clientX);
      const onUp = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [resizeFromClientX],
  );

  const onSplitKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      setSplitPercent((value) =>
        Math.min(72, Math.max(28, value + (event.key === 'ArrowLeft' ? -3 : 3))),
      );
    },
    [],
  );

  const removeHighlight = useCallback(
    (id: string) => {
      const next = highlightsRef.current.filter((h) => h.id !== id);
      setHighlights(next);
      persist(next);
    },
    [persist],
  );

  // Vẽ highlight chính xác theo character range trên bản dịch. Chromium hỗ
  // trợ CSS Custom Highlight; browser cũ dùng overlay rect tính lại từ Range.
  useEffect(() => {
    const registry = (
      CSS as unknown as {
        highlights?: {
          delete: (name: string) => void;
          set: (name: string, value: unknown) => void;
        };
      }
    ).highlights;
    const HighlightCtor = (
      window as unknown as {
        Highlight?: new (...ranges: Range[]) => unknown;
      }
    ).Highlight;
    const host = translationRef.current;
    if (!host) return;
    const canUseRegistry = Boolean(registry && HighlightCtor);

    const drawFallback = () => {
      host.querySelectorAll('.vi-hl-rect').forEach((el) => el.remove());
      if (canUseRegistry) return;
      for (const h of highlights) {
        if (
          h.source !== 'vi' ||
          typeof h.section !== 'number' ||
          typeof h.range_start !== 'number' ||
          typeof h.range_end !== 'number'
        ) {
          continue;
        }
        const section = host.querySelector(
          `[data-vi-section="${h.section}"]`,
        ) as HTMLElement | null;
        const content = section?.querySelector('[data-vi-content]') as HTMLElement | null;
        const range = content
          ? rangeFromOffsets(content, h.range_start, h.range_end)
          : null;
        if (!section || !range) continue;
        const sectionRect = section.getBoundingClientRect();
        const colorCss = COLORS.find((c) => c.id === h.color)?.css ?? COLORS[0].css;
        for (const rect of Array.from(range.getClientRects())) {
          if (rect.width < 1 || rect.height < 1) continue;
          const box = document.createElement('div');
          box.className = 'vi-hl-rect';
          box.style.left = `${rect.left - sectionRect.left}px`;
          box.style.top = `${rect.top - sectionRect.top}px`;
          box.style.width = `${rect.width}px`;
          box.style.height = `${rect.height}px`;
          box.style.background = colorCss;
          box.title = `“${h.text.slice(0, 90)}”\nBấm để bỏ đánh dấu`;
          box.onclick = () => removeHighlight(h.id);
          section.appendChild(box);
        }
      }
    };

    if (canUseRegistry) {
      for (const c of COLORS) registry!.delete(`vi-${c.id}`);
      for (const c of COLORS) {
        const ranges = highlights
          .filter(
            (h) =>
              h.source === 'vi' &&
              h.color === c.id &&
              typeof h.section === 'number' &&
              typeof h.range_start === 'number' &&
              typeof h.range_end === 'number',
          )
          .map((h) => {
            const root = host.querySelector(
              `[data-vi-section="${h.section}"] [data-vi-content]`,
            ) as HTMLElement | null;
            return root
              ? rangeFromOffsets(root, h.range_start!, h.range_end!)
              : null;
          })
          .filter((r): r is Range => r !== null);
        if (ranges.length) {
          registry!.set(`vi-${c.id}`, new HighlightCtor!(...ranges));
        }
      }
    }
    drawFallback();
    window.addEventListener('resize', drawFallback);
    return () => {
      window.removeEventListener('resize', drawFallback);
      host.querySelectorAll('.vi-hl-rect').forEach((el) => el.remove());
      if (registry) {
        for (const c of COLORS) registry.delete(`vi-${c.id}`);
      }
    };
  }, [highlights, removeHighlight, splitPercent, viSections]);

  const pdfHighlightCount = highlights.filter((h) => h.source !== 'vi').length;
  const viHighlightCount = highlights.filter((h) => h.source === 'vi').length;

  return (
    <div className="pdf-hl">
      <div className="pdf-toolbar">
        <span className="muted">
          🖍️ Bôi chữ → chọn màu → bấm Đánh dấu · bấm vùng đã tô để bỏ · lưu vào{' '}
        </span>
        <code>highlights.json</code>
        <div className="color-picker">
          {COLORS.map((c) => (
            <button
              key={c.id}
              className={`swatch${color === c.id ? ' active' : ''}`}
              style={{ background: c.css }}
              onClick={() => setColor(c.id)}
              title={c.id}
            />
          ))}
        </div>
        <button
          className="confirm-highlight"
          disabled={!pending}
          onMouseDown={(event) => event.preventDefault()}
          onClick={commitPending}
        >
          ✓ Đánh dấu
        </button>
        {pending && (
          <>
            <button
              className="cancel-highlight"
              onMouseDown={(event) => event.preventDefault()}
              onClick={cancelPending}
            >
              Bỏ chọn
            </button>
            <span className="pending-highlight-preview" title={pending.text}>
              Đã chọn {pending.source === 'vi' ? 'bản dịch' : 'PDF'}: “{pending.text}”
            </span>
          </>
        )}
        <span className="muted">
          {pdfHighlightCount} PDF · {viHighlightCount} bản dịch
        </span>
        <span className={`save-status ${status}`}>
          {status === 'saving' && '💾 Đang lưu…'}
          {status === 'saved' && '✓ Đã lưu'}
          {status === 'error' && '✕ Lỗi lưu'}
        </span>
      </div>

      <div
        ref={layoutRef}
        className={`pdf-translation-layout${viSections.length ? '' : ' single'}`}
        style={
          {
            '--pdf-pane-size': `${splitPercent}%`,
          } as CSSProperties
        }
      >
        <div className="pdf-pane">
          <div className="pane-title">
            <span className="pane-heading">📄 Bản gốc PDF</span>
            <div className="pdf-zoom" aria-label="Điều chỉnh độ phóng đại PDF">
              <button
                onClick={() => setZoom((value) => Math.max(0.6, value - 0.1))}
                disabled={zoom <= 0.6}
                title="Thu nhỏ PDF"
              >
                −
              </button>
              <button onClick={() => setZoom(1)} title="Đặt lại 100%">
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={() => setZoom((value) => Math.min(2, value + 0.1))}
                disabled={zoom >= 2}
                title="Phóng to PDF"
              >
                +
              </button>
            </div>
          </div>
          <div className="pdf-scroll" ref={pdfScrollRef} onMouseUp={onMouseUp}>
            {loading && <div className="muted pad">Đang tải PDF…</div>}
            {error && (
              <div className="pad" style={{ color: 'var(--red)' }}>
                {error}
              </div>
            )}
            <div ref={containerRef} className="pdf-pages" />
            <HighlightOverlays
              pages={pages}
              highlights={highlights.filter((h) => h.source !== 'vi')}
              colors={COLORS}
              onRemove={removeHighlight}
            />
          </div>
        </div>

        {viSections.length > 0 && (
          <>
            <div
              className="pdf-split-handle"
              role="separator"
              aria-label="Kéo để đổi kích thước PDF và bản dịch"
              aria-orientation="vertical"
              aria-valuemin={28}
              aria-valuemax={72}
              aria-valuenow={Math.round(splitPercent)}
              tabIndex={0}
              onPointerDown={onSplitPointerDown}
              onKeyDown={onSplitKeyDown}
              title="Kéo sang trái/phải để đổi kích thước hai cửa sổ"
            >
              <span />
            </div>
            <div className="translation-pane">
              <div className="pane-title">
                <span className="pane-heading">🇻🇳 Bản dịch tiếng Việt</span>
                <span>Bôi chữ rồi bấm “Đánh dấu” phía trên</span>
              </div>
              <div
                className="translation-scroll"
                ref={translationRef}
                onMouseUp={onTranslationMouseUp}
              >
                {viSections.map((section, i) => {
                  const linked = highlights.filter(
                    (h) => h.source === 'vi' && h.section === i,
                  );
                  return (
                    <article
                      className={`translation-section${linked.length ? ' vi-marked' : ''}`}
                      data-vi-section={i}
                      key={i}
                    >
                      {linked.length > 0 && (
                        <div className="vi-linked-list">
                          {linked.map((h) => (
                            <div className="vi-linked-card" key={h.id}>
                              <button
                                className="vi-linked-jump"
                                disabled={!h.page}
                                onClick={() => goToPdfPage(h.page)}
                                title={h.original_text || 'Mở vị trí liên quan trong PDF'}
                              >
                                🔗 {h.page ? `PDF trang ${h.page}` : 'Cùng mục bản gốc'}
                              </button>
                              <span>“{h.text}”</span>
                              <button
                                className="vi-linked-remove"
                                onClick={() => removeHighlight(h.id)}
                                title="Xoá highlight"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div data-vi-content>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section}
                        </ReactMarkdown>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Vẽ overlay highlight lên trên các trang đã render (portal đơn giản qua DOM ref).
function HighlightOverlays({
  pages,
  highlights,
  colors,
  onRemove,
}: {
  pages: PageView[];
  highlights: Highlight[];
  colors: { id: string; css: string }[];
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    // xoá overlay cũ
    document.querySelectorAll('.hl-rect').forEach((el) => el.remove());
    for (const hl of highlights) {
      const layer = document.querySelector(
        `.hl-layer[data-page="${hl.page}"]`,
      ) as HTMLElement | null;
      if (!layer) continue;
      const css = colors.find((c) => c.id === hl.color)?.css ?? colors[0].css;
      for (const r of hl.rects) {
        const box = document.createElement('div');
        box.className = 'hl-rect';
        box.style.left = `${r.x * 100}%`;
        box.style.top = `${r.y * 100}%`;
        box.style.width = `${r.w * 100}%`;
        box.style.height = `${r.h * 100}%`;
        box.style.background = css;
        box.title = `${hl.text.slice(0, 80)}\n(click để xoá)`;
        box.onclick = () => onRemove(hl.id);
        layer.appendChild(box);
      }
    }
  }, [pages, highlights, colors, onRemove]);
  return null;
}
