import { getSettingJSON, setSettingJSON } from '../db';
import { CONNECTORS } from './registry';
import { getEnv } from '../env';

// Cấu hình nguồn (bật/tắt, ưu tiên, limit) lưu trong SQLite settings.
// Mặc định: bật hết, limit 10/nguồn.

export interface SourceConfig {
  enabled: Record<string, boolean>;
  priority: Record<string, number>;
  limitPerSource: number;
  citationThresholds: {
    old: number; // >3 năm
    mid: number; // 1-3 năm
  };
}

const KEY = 'source_config';

function defaults(): SourceConfig {
  const enabled: Record<string, boolean> = {};
  const priority: Record<string, number> = {};
  CONNECTORS.forEach((c, i) => {
    enabled[c.id] = true;
    priority[c.id] = (i + 1) * 10;
  });
  return {
    enabled,
    priority,
    limitPerSource: 10,
    citationThresholds: { old: 100, mid: 30 },
  };
}

export function getSourceConfig(): SourceConfig {
  const stored = getSettingJSON<Partial<SourceConfig>>(KEY, {});
  const def = defaults();
  // merge để nguồn mới thêm vào registry vẫn có default
  return {
    enabled: { ...def.enabled, ...(stored.enabled ?? {}) },
    priority: { ...def.priority, ...(stored.priority ?? {}) },
    limitPerSource: stored.limitPerSource ?? def.limitPerSource,
    citationThresholds: {
      ...def.citationThresholds,
      ...(stored.citationThresholds ?? {}),
    },
  };
}

export function saveSourceConfig(cfg: Partial<SourceConfig>): SourceConfig {
  const merged = { ...getSourceConfig(), ...cfg };
  setSettingJSON(KEY, merged);
  return merged;
}

/** Nguồn cần key mà .env CHƯA điền → coi như không khả dụng. */
export function isSourceUsable(id: string): boolean {
  const c = CONNECTORS.find((x) => x.id === id);
  if (!c) return false;
  if (c.requiresKey && !getEnv(c.requiresKey)) return false;
  return true;
}

/** ID các nguồn dùng cho search: đang bật VÀ đủ key (tự bỏ qua nguồn thiếu key). */
export function getEnabledSourceIds(): string[] {
  const cfg = getSourceConfig();
  return CONNECTORS.filter((c) => cfg.enabled[c.id] !== false)
    .filter((c) => isSourceUsable(c.id))
    .sort((a, b) => (cfg.priority[a.id] ?? 99) - (cfg.priority[b.id] ?? 99))
    .map((c) => c.id);
}
