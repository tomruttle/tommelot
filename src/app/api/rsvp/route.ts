import { appendToSheets } from "@/src/utils/sheets";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const values = Object.values(Object.fromEntries(body));

    await appendToSheets(values);

    return new NextResponse();
  } catch (err) {
    console.error('post to google sheets failed', err instanceof Error ? err.message : err);
    return new NextResponse(null, { status: 500 })
  }
}
