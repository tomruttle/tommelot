import { CFP_COOKIE_KEY } from "@/src/utils/constants";
import { getNewState } from "@/src/utils/states";
import { sha256 } from "@/src/utils/shared";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const { password } = Object.fromEntries(body);
  const cfpPassword = process.env.CFP_PASSWORD || '';
  const newState = getNewState(cfpPassword, password.toString())

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/';
  
  if (newState) {
    redirectUrl.searchParams.set('state', newState);
  } else {
    redirectUrl.searchParams.delete('state');
  }
  
  const res = NextResponse.redirect(redirectUrl, 303);
  
  if (newState === null) {
    res.cookies.set(CFP_COOKIE_KEY, await sha256(cfpPassword));
  }

  return res;
}
