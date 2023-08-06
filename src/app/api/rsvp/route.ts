import { appendToSheets } from "@/src/utils/sheets";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  let values: FormDataEntryValue[];

  try {
    const body = await req.formData();
    values = Object.values(Object.fromEntries(body));
  } catch (err) {
    console.error('parsing values failed', err instanceof Error ? err.message : err);
    return new NextResponse(null, { status: 500 })
  }

  try {
    await appendToSheets(values);
    return new NextResponse();
  } catch (err) {
    console.error(`post to google sheets failed`, err instanceof Error ? err.message : err, JSON.stringify(values));
    return new NextResponse(null, { status: 500 })
  }
}
