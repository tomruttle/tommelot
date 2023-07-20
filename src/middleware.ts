import { CFP_COOKIE_KEY } from "@/src/utils/constants";
import { isString, sha256 } from "@/src/utils/shared";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getNewState } from "./utils/states";

export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest): Promise<Response> {
  const cookiePassword = req.cookies.get(CFP_COOKIE_KEY)?.value || '';
  const { state } = Object.fromEntries(req.nextUrl.searchParams);
  const cfpPassword = await sha256(process.env.CFP_PASSWORD || '');
  
  const newState = isString(state) ? null : getNewState(cfpPassword, cookiePassword);

  if (newState) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.searchParams.set('state', newState.toString());
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
}
