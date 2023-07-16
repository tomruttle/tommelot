import { CFP_COOKIE_MAX_AGE, Errors } from "@/utils/constants";
import { getCookie, sha256 } from "@/utils/cookies";
import { isString } from "@/utils/shared";
import { CloudflareFunctionArgs } from "@/utils/types";

export async function onRequestPost({ request, env: { CFP_PASSWORD } }: CloudflareFunctionArgs): Promise<Response> {
  const requestUrl = new URL(request.url);
  const body = await request.formData();
  const { password } = Object.fromEntries(body);
  const response = new Response('', { status: 302, headers: { 'Cache-Control': 'no-cache' } });

  if (request.method !== "POST") {
    requestUrl.searchParams.append('error', Errors.Invalid.toString());
    response.headers.set('Location', requestUrl.toString());
    return response;
  }

  if (!isString(CFP_PASSWORD)) {
    requestUrl.searchParams.append('error', Errors.Missing.toString());
    response.headers.set('Location', requestUrl.toString());
    return response;
  }

  const hashedPassword = await sha256(password.toString());
  const hashedCfpPassword = await sha256(CFP_PASSWORD);

  if (hashedPassword === hashedCfpPassword) {
    response.headers.set('Set-Cookie', `${getCookie(CFP_PASSWORD)}; Max-Age=${CFP_COOKIE_MAX_AGE}; Path=/; HttpOnly; Secure`);
    response.headers.set('Location', requestUrl.toString());
    return response;
  }

  requestUrl.searchParams.append('error', Errors.Incorrect.toString());
  response.headers.set('Location', requestUrl.toString());
  return response;
}