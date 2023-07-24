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

function getSegmentRadius(radius: number, inclination: number) {
  // return Math.abs(radius * Math.cos(inclination));
  return Math.abs(2 * radius * Math.sin(inclination)) / 2.5;
}

function getCircumfrence(radius: number) {
  return 2 * Math.PI * radius;
}

function getTilesAtInclination(inclination: number, radius: number, tileSize: number) {
  const segmentRadius = getSegmentRadius(radius, inclination);
  const segmentCircumfrence = getCircumfrence(segmentRadius);
  return Math.floor(segmentCircumfrence / tileSize);
}

export function getCoordinates(radius: number, tileSize: number, prec: number) {
  const squares: Array<{ azimuth: number, inclination: number }> = []

  for (let inclination = 0; inclination < Math.PI; inclination += Math.PI / prec) {
    const tilesAtInclination = getTilesAtInclination(inclination, radius, tileSize);
    const angleInc = (2 * Math.PI) / tilesAtInclination;

    for (let azimuth = (angleInc / 2); azimuth < 2 * Math.PI; azimuth += angleInc) {
      squares.push({ azimuth, inclination });
    }
  }

  return squares;
}