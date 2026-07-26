import { NextRequest, NextResponse } from 'next/server';
import { getKeyStatuses } from '@/lib/env';
import { getSourceConfig, saveSourceConfig } from '@/lib/search/config';
import { CONNECTORS } from '@/lib/search/registry';

// GET: trả cấu hình nguồn + trạng thái key (.env masked) + danh sách connector.
// PUT: lưu cấu hình nguồn (bật/tắt, ưu tiên, limit, ngưỡng citations).
export const dynamic = 'force-dynamic';

// các key môi trường liên quan (gồm cả key chưa connector nào dùng, để anh thấy đủ)
const KNOWN_KEYS = [
  'RESEARCH_EMAIL',
  'SEMANTIC_SCHOLAR_API_KEY',
  'PUBMED_API_KEY',
  'CORE_API_KEY',
  'SPRINGER_API_KEY',
  'IEEE_API_KEY',
];

export async function GET() {
  const cfg = getSourceConfig();
  const keyStatuses = getKeyStatuses(KNOWN_KEYS);
  const connectors = CONNECTORS.map((c) => ({
    id: c.id,
    label: c.label,
    requiresKey: c.requiresKey,
    note: c.note,
    homepage: c.homepage,
  }));
  return NextResponse.json({ config: cfg, keys: keyStatuses, connectors });
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      enabled?: Record<string, boolean>;
      priority?: Record<string, number>;
      limitPerSource?: number;
      citationThresholds?: { old: number; mid: number };
    };
    const saved = saveSourceConfig(body);
    return NextResponse.json({ ok: true, config: saved });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi lưu settings' },
      { status: 400 },
    );
  }
}
