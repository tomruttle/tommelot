import { CFP_COOKIE_KEY, locales } from "@/src/utils/constants";
import { isString, looseCompareStrings, sha256 } from "@/src/utils/shared";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { States } from "./utils/states";

export const runtime = 'experimental-edge';
 
const localeNames = Object.keys(locales);

const intlMiddleware = createMiddleware({ locales: localeNames, defaultLocale: localeNames[0] });
 
export default async function middleware(req: NextRequest): Promise<Response> {
  const cfpPassword = await sha256(process.env.CFP_PASSWORD || '');
  const cookiePassword = req.cookies.get(CFP_COOKIE_KEY)?.value || '';
  const pathParts = req.nextUrl.pathname.split('/');

  if (looseCompareStrings(cfpPassword, cookiePassword) || pathParts.includes('login')) {
    return intlMiddleware(req);
  }

  const redirectUrl = req.nextUrl.clone();
  const locale = localeNames.find((l) => l === pathParts[1]) || '';

  redirectUrl.pathname = `${locale}/login`;

  if (isString(cookiePassword)) {
    redirectUrl.searchParams.set('state', States.Incorrect.toString());
  }

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
