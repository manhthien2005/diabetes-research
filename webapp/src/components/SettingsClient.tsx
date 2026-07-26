'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MdVpnKey,
  MdHub,
  MdTune,
  MdRefresh,
  MdCheckCircle,
  MdError,
  MdRemoveCircleOutline,
} from 'react-icons/md';

interface KeyStatus {
  key: string;
  present: boolean;
  masked: string;
}
interface Connector {
  id: string;
  label: string;
  requiresKey: string | null;
  note: string;
  homepage: string;
}
interface Config {
  enabled: Record<string, boolean>;
  priority: Record<string, number>;
  limitPerSource: number;
  citationThresholds: { old: number; mid: number };
}
interface Health {
  [id: string]: {
    state: 'checking' | 'ready' | 'down';
    needsKey?: boolean;
    message?: string;
    latency?: number;
  };
}

export function SettingsClient() {
  const [config, setConfig] = useState<Config | null>(null);
  const [keys, setKeys] = useState<KeyStatus[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [health, setHealth] = useState<Health>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const checkedOnce = useRef(false);

  // kiểm tra 1 nguồn (cập nhật độc lập)
  const checkOne = useCallback(async (id: string) => {
    setHealth((h) => ({ ...h, [id]: { state: 'checking' } }));
    try {
      const r = await fetch('/api/sources/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const d = await r.json();
      const ok = Boolean(d.status?.ok);
      setHealth((h) => ({
        ...h,
        [id]: {
          state: ok ? 'ready' : 'down',
          needsKey: d.status?.needsKey,
          message: d.status?.message ?? d.error,
          latency: d.status?.latency_ms,
        },
      }));
    } catch (e) {
      setHealth((h) => ({
        ...h,
        [id]: { state: 'down', message: String(e) },
      }));
    }
  }, []);

  const checkAll = useCallback(
    (list: Connector[]) => {
      list.forEach((c) => checkOne(c.id));
    },
    [checkOne],
  );

  // load config + connectors, rồi TỰ ĐỘNG kiểm tra tất cả nguồn ngay khi mở trang
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        setConfig(d.config);
        setKeys(d.keys ?? []);
        setConnectors(d.connectors ?? []);
        if (!checkedOnce.current) {
          checkedOnce.current = true;
          checkAll(d.connectors ?? []);
        }
      });
  }, [checkAll]);

  const persist = useCallback(async (next: Config) => {
    setConfig(next);
    const r = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    });
    if (r.ok) setSavedAt(new Date().toLocaleTimeString());
  }, []);

  const toggle = (id: string) => {
    if (!config) return;
    persist({
      ...config,
      enabled: { ...config.enabled, [id]: !config.enabled[id] },
    });
  };

  if (!config) return <div className="muted">Đang tải cài đặt…</div>;

  // chỉ tính các nguồn KHẢ DỤNG (đủ key) vào "sẵn sàng"
  const usable = connectors.filter(
    (c) => !c.requiresKey || keys.find((k) => k.key === c.requiresKey)?.present,
  );
  const ready = usable.filter((c) => health[c.id]?.state === 'ready').length;
  const checking = usable.filter(
    (c) => health[c.id]?.state === 'checking' || health[c.id] === undefined,
  ).length;

  return (
    <div className="settings">
      {savedAt && <div className="saved-toast">✓ Đã lưu lúc {savedAt}</div>}

      {/* Readiness summary — tự kiểm tra mỗi lần mở trang */}
      <div className="readiness">
        <div className="readiness-info">
          {checking > 0 ? (
            <>
              <span className="spinner" /> Đang kiểm tra {connectors.length} nguồn…
            </>
          ) : (
            <>
              <span className={`dot ${ready === usable.length ? 'green' : ready > 0 ? 'amber' : 'red'}`} />
              <b>
                {ready}/{usable.length}
              </b>{' '}
              nguồn sẵn sàng
              {usable.length < connectors.length && (
                <span className="faint" style={{ fontSize: 12 }}>
                  {' '}
                  · {connectors.length - usable.length} nguồn bỏ qua (thiếu key)
                </span>
              )}
            </>
          )}
        </div>
        <button className="ghost" onClick={() => checkAll(connectors)} disabled={checking > 0}>
          <MdRefresh style={{ fontSize: 16 }} /> Kiểm tra lại
        </button>
      </div>

      {/* Nguồn + trạng thái live */}
      <div className="section-title">
        <MdHub style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Nguồn tìm kiếm
      </div>
      <div className="source-cfg-list">
        {connectors.map((c) => {
          const enabled = config.enabled[c.id] !== false;
          const h = health[c.id];
          const keyMissing =
            c.requiresKey &&
            !keys.find((k) => k.key === c.requiresKey)?.present;
          return (
            <div key={c.id} className={`source-cfg${keyMissing ? ' dim' : ''}`}>
              <label className="switch" data-tip={enabled ? 'Đang bật' : 'Đang tắt'}>
                <input type="checkbox" checked={enabled} onChange={() => toggle(c.id)} />
                <span className="slider" />
              </label>
              <StatusDot h={h} keyMissing={Boolean(keyMissing)} />
              <div className="source-cfg-body">
                <div className="source-cfg-label">
                  {c.label}
                  {c.requiresKey && (
                    <span
                      className={`key-tag${keyMissing ? ' missing' : ' ok'}`}
                      data-tip={`Cần biến ${c.requiresKey} trong .env`}
                    >
                      <MdVpnKey style={{ fontSize: 12, verticalAlign: '-2px' }} /> {c.requiresKey}
                    </span>
                  )}
                  {keyMissing && (
                    <span className="skip-tag" data-tip="Thiếu key nên ExploreX tự bỏ qua nguồn này khi search">
                      bỏ qua khi search
                    </span>
                  )}
                </div>
                <div
                  className="source-status-msg"
                  style={{
                    color:
                      h?.state === 'ready'
                        ? 'var(--green)'
                        : h?.state === 'down'
                          ? 'var(--red)'
                          : 'var(--text-faint)',
                  }}
                  data-tip={c.note}
                >
                  {h?.state === 'checking' || !h
                    ? 'đang kiểm tra…'
                    : h.message}
                  {h?.latency != null && h.state === 'ready' && (
                    <span className="faint"> · {h.latency}ms</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* API key (.env) */}
      <div className="section-title">
        <MdVpnKey style={{ verticalAlign: '-3px', marginRight: 6 }} />
        API key (.env)
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="key-table">
          <thead>
            <tr>
              <th>Biến môi trường</th>
              <th>Trạng thái</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.key}>
                <td>
                  <code>{k.key}</code>
                </td>
                <td>
                  {k.present ? (
                    <span className="badge green">Có</span>
                  ) : (
                    <span className="badge" data-tip="Chưa điền trong .env">
                      Trống
                    </span>
                  )}
                </td>
                <td className="faint">{k.masked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="faint" style={{ fontSize: 11.5, marginTop: 8 }}>
        Đọc server-side từ <code>D:\NCKH\.env</code> · value luôn che · sửa bằng cách edit file rồi bấm “Kiểm tra lại”.
      </p>

      {/* Tham số */}
      <div className="section-title">
        <MdTune style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Tham số search
      </div>
      <div className="card">
        <div className="param-row">
          <label data-tip="Số kết quả tối đa lấy từ mỗi nguồn mỗi lần search">
            Số kết quả mỗi nguồn
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={config.limitPerSource}
            onChange={(e) => persist({ ...config, limitPerSource: Number(e.target.value) })}
            style={{ maxWidth: 90 }}
          />
        </div>
        <div className="param-row">
          <label data-tip="Ngưỡng gợi ý đạt chuẩn cho paper xuất bản > 3 năm">
            Ngưỡng citations (&gt; 3 năm)
          </label>
          <input
            type="number"
            min={0}
            value={config.citationThresholds.old}
            onChange={(e) =>
              persist({
                ...config,
                citationThresholds: { ...config.citationThresholds, old: Number(e.target.value) },
              })
            }
            style={{ maxWidth: 90 }}
          />
        </div>
        <div className="param-row">
          <label data-tip="Ngưỡng gợi ý đạt chuẩn cho paper 1–3 năm">
            Ngưỡng citations (1–3 năm)
          </label>
          <input
            type="number"
            min={0}
            value={config.citationThresholds.mid}
            onChange={(e) =>
              persist({
                ...config,
                citationThresholds: { ...config.citationThresholds, mid: Number(e.target.value) },
              })
            }
            style={{ maxWidth: 90 }}
          />
        </div>
      </div>
    </div>
  );
}

function StatusDot({ h, keyMissing }: { h?: Health[string]; keyMissing?: boolean }) {
  // thiếu key → luôn báo amber (đã tự bỏ qua khi search), không phụ thuộc ping
  if (keyMissing) {
    return (
      <MdRemoveCircleOutline className="st-ico needkey" data-tip="Thiếu key — bỏ qua khi search" />
    );
  }
  if (!h || h.state === 'checking') {
    return <span className="spinner" style={{ flexShrink: 0 }} />;
  }
  if (h.state === 'ready') {
    return <MdCheckCircle className="st-ico ready" data-tip="Sẵn sàng" />;
  }
  return <MdError className="st-ico down" data-tip="Chưa sẵn sàng" />;
}
