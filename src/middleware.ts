import { CFP_COOKIE_KEY, Errors } from "@/src/utils/constants";
import { isString, sha256 } from "@/src/utils/shared";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'experimental-edge';

export async function middleware(request: NextRequest): Promise<Response> {
  const requestUrl = new URL(request.url);

  const { error } = Object.fromEntries(requestUrl.searchParams);
  if (isString(error)) {
    return NextResponse.next();
  }

  const cfpPassword = process.env.CFP_PASSWORD;

  if (!isString(cfpPassword)) {
    requestUrl.searchParams.append('error', Errors.Missing.toString());
    return NextResponse.redirect(requestUrl);
  }

  const cookiePassword = request.cookies.get(CFP_COOKIE_KEY)?.value || '';

  if (!isString(cookiePassword)) {
    requestUrl.searchParams.append('error', Errors.Empty.toString());
    return NextResponse.redirect(requestUrl);
  }

  const hashedCfpPassword = await sha256(cfpPassword);

  if (cookiePassword === hashedCfpPassword) {
    return NextResponse.next();
  }

  requestUrl.searchParams.append('error', Errors.Incorrect.toString());
  return NextResponse.redirect(requestUrl);
}

export const config = {
  matcher: '/',
}