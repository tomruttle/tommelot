import { CFP_ALLOWED_PATHS, Errors } from "@/utils/constants";
import { getCookie, sha256 } from "@/utils/cookies";
import { isString } from "@/utils/shared";
import { CloudflareFunctionArgs } from "@/utils/types";

export async function onRequest({ request, next, env: { CFP_PASSWORD } }: CloudflareFunctionArgs): Promise<Response> {
  const requestUrl = new URL(request.url);

  const { error } = Object.fromEntries(requestUrl.searchParams);
  if (isString(error) || CFP_ALLOWED_PATHS.includes(requestUrl.pathname)) {
    console.log(`moving on... ${error}`);
    return next();
  }

  const response = new Response('', { status: 302, headers: { 'Cache-Control': 'no-cache' } });

  if (!isString(CFP_PASSWORD)) {
    console.log('missing password!', Errors.Missing.toString());
    requestUrl.searchParams.append('error', Errors.Missing.toString());
    response.headers.set('Location', requestUrl.toString());
    return response;
  }

  const cookie = request.headers.get('cookie');

  if (!isString(cookie)) {
    console.log('empty password!', Errors.Empty.toString());
    requestUrl.searchParams.append('error', Errors.Empty.toString());
    response.headers.set('Location', requestUrl.toString());
    return response;
  }

  const password = await sha256(CFP_PASSWORD);

  if (cookie.includes(getCookie(password))) {
    console.log('MATCHES!!')
    return next();
  }

  console.log('MISSING OR WRONG!');
  requestUrl.searchParams.append('error', Errors.Incorrect.toString());
  response.headers.set('Location', requestUrl.toString());
  return response;
}