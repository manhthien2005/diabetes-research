import { NextResponse } from 'next/server';
import { checkAllConnections } from '@/lib/search/orchestrator';
import { getEnabledSourceIds } from '@/lib/search/config';

// Source Health: trạng thái connect của từng nguồn (cho panel ở trang Search).
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const enabled = new Set(getEnabledSourceIds());
    const results = await checkAllConnections();
    return NextResponse.json({
      sources: results.map((r) => ({ ...r, enabled: enabled.has(r.id) })),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi health check' },
      { status: 500 },
    );
  }
}
