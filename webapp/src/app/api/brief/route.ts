import fs from 'node:fs';
import { NextResponse } from 'next/server';
import { writeBrief, generateBrief, BRIEF_FILE } from '@/lib/brief';

// GET: trả nội dung brief hiện tại (sinh tươi). POST: ghi RESEARCH_BRIEF.md ra root.
export const dynamic = 'force-dynamic';

export async function GET() {
  const content = generateBrief(new Date().toISOString());
  let exists = false;
  try {
    exists = fs.existsSync(BRIEF_FILE);
  } catch {
    /* ignore */
  }
  return NextResponse.json({ content, file: BRIEF_FILE, written: exists });
}

export async function POST() {
  try {
    const res = writeBrief(new Date().toISOString());
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Lỗi sinh brief' },
      { status: 500 },
    );
  }
}
