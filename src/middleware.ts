import { CFP_COOKIE_KEY } from "@/src/utils/constants";
import { isString, sha256 } from "@/src/utils/shared";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getNewState } from "./utils/states";
import createMiddleware from 'next-intl/middleware';

export const runtime = 'experimental-edge';
 
const intlMiddleware = createMiddleware({
  locales: ['en', 'nl'],
  defaultLocale: 'en'
});
 
export default async function middleware(req: NextRequest): Promise<Response> {
  const { state } = Object.fromEntries(req.nextUrl.searchParams);
  
  if (isString(state)) {
    return intlMiddleware(req);
  }

  const cfpPassword = await sha256(process.env.CFP_PASSWORD || '');
  const cookiePassword = req.cookies.get(CFP_COOKIE_KEY)?.value || '';
  const newState = getNewState(cfpPassword, cookiePassword);
  
  if (newState) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.searchParams.set('state', newState.toString());
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
