import { CFP_COOKIE_KEY, Errors } from "@/src/utils/constants";
import { isString, sha256 } from "@/src/utils/shared";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const body = await request.formData();
  const { password } = Object.fromEntries(body);
  const cfpPassword = process.env.CFP_PASSWORD

  if (!isString(cfpPassword)) {
    requestUrl.searchParams.append('error', Errors.Missing.toString());
    return NextResponse.redirect(requestUrl);
  }

  const hashedPassword = await sha256(password.toString());
  const hashedCfpPassword = await sha256(cfpPassword);

  if (hashedPassword === hashedCfpPassword) {
    cookies().set(CFP_COOKIE_KEY, cfpPassword);
    return new NextResponse();
  }

  requestUrl.searchParams.append('error', Errors.Incorrect.toString());
  return NextResponse.redirect(requestUrl);
}