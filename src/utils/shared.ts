export function isString(test: unknown): test is string {
  return typeof test === 'string' && test.length > 0;
}

export async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));

  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
    .join('');
}

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function convertToCartesian(radius: number, azimuth: number, inclination: number) {
  const x = radius * Math.cos(azimuth) * Math.sin(inclination);
  const y = radius * Math.sin(azimuth) * Math.sin(inclination);
  const z = radius * Math.cos(inclination);
  
  return [x, y, z];
}