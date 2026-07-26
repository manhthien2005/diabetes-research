import { NextRequest, NextResponse } from 'next/server';
import { getConnector } from '@/lib/search/registry';

// Test kết nối 1 nguồn cụ thể (cho nút Test ở Settings / Source Health).
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ error: 'Thiếu id nguồn' }, { status: 400 });
    }
    const connector = getConnector(id);
    if (!connector) {
      return NextResponse.json(
        { error: `Không có nguồn: ${id}` },
        { status: 404 },
      );
    }
    const status = await connector.testConnection();
    return NextResponse.json({ id, status });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi test' },
      { status: 500 },
    );
  }
}
