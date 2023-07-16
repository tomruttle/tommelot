import { CFP_COOKIE_KEY, Errors } from "@/src/utils/constants";
import { isString, sha256 } from "@/src/utils/shared";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'experimental-edge';

export async function middleware(request: NextRequest): Promise<Response> {
  if (request.nextUrl.pathname === '/api/login') {
    console.log('logging in');
    return NextResponse.next();
  }

  const requestUrl = new URL(request.url);

  const { error } = Object.fromEntries(requestUrl.searchParams);
  if (isString(error)) {
    console.log(`moving on... ${error}`);
    return NextResponse.next();
  }

  const cfpPassword = process.env.CFP_PASSWORD;

  if (!isString(cfpPassword)) {
    console.log('missing password!', Errors.Missing.toString());
    requestUrl.searchParams.append('error', Errors.Missing.toString());
    return NextResponse.redirect(requestUrl);
  }

  const cookiePassword = cookies().get(CFP_COOKIE_KEY)?.value || '';
  const hashedCfpPassword = await sha256(cfpPassword);

  if (cookiePassword === hashedCfpPassword) {
    console.log('MATCHES!!')
    return NextResponse.next();
  }

  console.log('WRONG!');
  requestUrl.searchParams.append('error', Errors.Incorrect.toString());
  return NextResponse.redirect(requestUrl);
}