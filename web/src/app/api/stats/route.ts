import { NextResponse } from 'next/server';
import { libraryStats } from '@/lib/papers';

// Thống kê thư viện cho sidebar (tiến độ 4 Layer).
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(libraryStats());
}
