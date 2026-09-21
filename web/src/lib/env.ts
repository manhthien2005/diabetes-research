import fs from 'node:fs';
import { ENV_FILE } from './paths';

// CHỈ chạy server-side. Đọc .env ở D:\NCKH, parse key=value.
// KHÔNG bao giờ trả value thô ra client — chỉ trả trạng thái có/không + masked.

export interface EnvKeyStatus {
  key: string;
  present: boolean;
  masked: string; // vd "sk-…7f2a" hoặc "(chưa điền)"
}

function parseDotEnv(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    // bỏ quote bao quanh nếu có
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key) out[key] = val;
  }
  return out;
}

let cache: { mtimeMs: number; values: Record<string, string> } | null = null;

/** Đọc toàn bộ .env (server-side). Có cache theo mtime để khỏi đọc đĩa liên tục. */
export function readEnv(): Record<string, string> {
  try {
    const stat = fs.statSync(ENV_FILE);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache.values;
    const content = fs.readFileSync(ENV_FILE, 'utf8');
    const values = parseDotEnv(content);
    cache = { mtimeMs: stat.mtimeMs, values };
    return values;
  } catch {
    return {};
  }
}

/** Lấy 1 giá trị key (server-side). Trả undefined nếu không có/đang rỗng. */
export function getEnv(key: string): string | undefined {
  const v = readEnv()[key];
  return v && v.length > 0 ? v : undefined;
}

function maskValue(val: string): string {
  if (!val) return '(chưa điền)';
  if (val.length <= 6) return '••••••';
  return `${val.slice(0, 3)}…${val.slice(-4)}`;
}

/** Trạng thái an toàn để gửi ra client: chỉ có/không + masked. */
export function getKeyStatuses(keys: string[]): EnvKeyStatus[] {
  const env = readEnv();
  return keys.map((key) => {
    const val = env[key];
    const present = Boolean(val && val.length > 0);
    return { key, present, masked: present ? maskValue(val) : '(chưa điền)' };
  });
}
