import { CFP_COOKIE_KEY } from "@/src/utils/constants";
import { Errors } from "@/src/utils/errors";
import { isString, sha256 } from "@/src/utils/shared";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'experimental-edge';

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')?.toString();
  const requestUrl = new URL(origin + '/');
  const body = await req.formData();
  const { password } = Object.fromEntries(body);
  const cfpPassword = process.env.CFP_PASSWORD

  if (!isString(cfpPassword)) {
    requestUrl.searchParams.append('error', Errors.Missing.toString());
    return NextResponse.redirect(requestUrl);
  }

  const hashedPassword = await sha256(password.toString());
  const hashedCfpPassword = await sha256(cfpPassword);

  if (hashedPassword === hashedCfpPassword) {
    const res = NextResponse.redirect(requestUrl);
    res.cookies.set(CFP_COOKIE_KEY, cfpPassword);
    return res;
  }

  requestUrl.searchParams.append('error', Errors.Incorrect.toString());
  return NextResponse.redirect(requestUrl);
}