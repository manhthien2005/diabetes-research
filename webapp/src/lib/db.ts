import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { DB_FILE } from './paths';

// SQLite CHỈ giữ thứ filesystem chưa có:
//  - thống kê chất lượng nguồn search (search_runs / search_hits)
//  - cấu hình nguồn (sources) + settings web app
// Kho paper vẫn nằm hoàn toàn trên filesystem (searched_papers/ chosed_papers).

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  const db = new Database(DB_FILE);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  migrate(db);
  _db = db;
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sources (
      id           TEXT PRIMARY KEY,         -- vd 'arxiv', 'openalex'
      label        TEXT NOT NULL,
      enabled      INTEGER NOT NULL DEFAULT 1,
      priority     INTEGER NOT NULL DEFAULT 100,
      requires_key TEXT,                      -- tên biến env cần, null nếu không cần
      kind         TEXT NOT NULL DEFAULT 'builtin', -- 'builtin' | 'custom'
      endpoint     TEXT,                      -- cho custom source
      created_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS search_runs (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      query      TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS search_hits (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      run_id      INTEGER NOT NULL REFERENCES search_runs(id) ON DELETE CASCADE,
      source_id   TEXT NOT NULL,
      title       TEXT,
      doi         TEXT,
      year        INTEGER,
      citations   INTEGER,
      was_saved   INTEGER NOT NULL DEFAULT 0,
      saved_layer INTEGER,
      created_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    -- thống kê per-source per-run: nguồn trả bao nhiêu kết quả, lỗi hay không
    CREATE TABLE IF NOT EXISTS run_source_stats (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      run_id      INTEGER NOT NULL REFERENCES search_runs(id) ON DELETE CASCADE,
      source_id   TEXT NOT NULL,
      ok          INTEGER NOT NULL DEFAULT 1,
      count       INTEGER NOT NULL DEFAULT 0,
      latency_ms  INTEGER,
      error       TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_hits_run    ON search_hits(run_id);
    CREATE INDEX IF NOT EXISTS idx_hits_source ON search_hits(source_id);
    CREATE INDEX IF NOT EXISTS idx_stats_run   ON run_source_stats(run_id);
  `);
}

/** Helper settings dạng key-value (string). */
export function getSetting(key: string): string | undefined {
  const row = getDb()
    .prepare('SELECT value FROM settings WHERE key = ?')
    .get(key) as { value: string } | undefined;
  return row?.value;
}

export function setSetting(key: string, value: string): void {
  getDb()
    .prepare(
      `INSERT INTO settings(key, value) VALUES(?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    )
    .run(key, value);
}

export function getSettingJSON<T>(key: string, fallback: T): T {
  const raw = getSetting(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setSettingJSON(key: string, value: unknown): void {
  setSetting(key, JSON.stringify(value));
}
