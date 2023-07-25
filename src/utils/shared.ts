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
  const x = radius * Math.sin(inclination) * Math.cos(azimuth);
  const y = radius * Math.sin(inclination) * Math.sin(azimuth);
  const z = radius * Math.cos(inclination);
  
  return [x, y, z];
}

function getRadiusAtInclination(radius: number, inclination: number) {
  return Math.abs(radius * Math.cos(inclination));
}

function getCircumfrence(radius: number) {
  return 2 * Math.PI * radius;
}

function getTilesAtInclination(inclination: number, radius: number, tileSize: number) {
  const radiusAtInclination = getRadiusAtInclination(radius, inclination);
  const circumfrenceAtInclination = getCircumfrence(radiusAtInclination);
  return Math.floor(circumfrenceAtInclination / tileSize);
}

export function getCoordinates(radius: number, tileSize: number) {
  const squares: Array<{ azimuth: number, inclination: number }> = []

  const tilesAtEquator = getTilesAtInclination(0, radius, tileSize);
  if (tilesAtEquator === 0) {
    return squares;
  }

  for (let inclination = 0; inclination < Math.PI; inclination += Math.PI / Math.floor(tilesAtEquator / 2)) {
    const tilesAtInclination = getTilesAtInclination(inclination + (Math.PI / 2), radius, tileSize);
    if (tilesAtInclination === 0) {
      continue;
    }

    for (let azimuth = 0; azimuth < 2 * Math.PI; azimuth += (2 * Math.PI) / tilesAtInclination) {
      squares.push({ azimuth, inclination });
    }
  }

  return squares;
}