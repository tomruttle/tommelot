import { CFP_COOKIE_KEY } from "@/src/utils/constants";
import { looseCompareStrings, sha256 } from "@/src/utils/shared";
import { States } from "@/src/utils/states";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const { password } = Object.fromEntries(body);
  const cfpPassword = process.env.CFP_PASSWORD || '';
  const locale = req.cookies.get('NEXT_LOCALE')?.value || '';

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = `/${locale}`;
  
  const passwordsMatch = looseCompareStrings(cfpPassword, password);

  if (passwordsMatch) {
    redirectUrl.searchParams.delete('state');
  } else {
    redirectUrl.searchParams.set('state', States.Incorrect.toString());
  }
  
  const res = NextResponse.redirect(redirectUrl, 303);
  
  if (passwordsMatch) {
    res.cookies.set(CFP_COOKIE_KEY, await sha256(cfpPassword));
  }

  return res;
}
