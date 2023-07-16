import { CFP_COOKIE_KEY } from "./constants";

export async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));

  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('');
}

export function getCookie(password: string): string {
  return `${CFP_COOKIE_KEY}=${password}`;
}
