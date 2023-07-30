import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const form = Object.fromEntries(body);
  console.log(123, form);
  return new NextResponse();
}
