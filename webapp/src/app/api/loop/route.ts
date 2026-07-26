import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { NCKH_ROOT } from '@/lib/paths';

// Serve RESEARCH_LOOP.html (ở root) để mở trong app.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const html = fs.readFileSync(
      path.join(NCKH_ROOT, 'RESEARCH_LOOP.html'),
      'utf8',
    );
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new NextResponse('RESEARCH_LOOP.html chưa có', { status: 404 });
  }
}
