import { randomNumber } from "../utils/shared";

export function Tile({ animationDelay, inclination, azimuth, size, reflectSpeed }: { animationDelay: number, inclination: number, azimuth: number, size: number, reflectSpeed: number }) {
  const isBright = (inclination > 1.3 && inclination < 1.9) || (inclination < -1.3 && inclination > -1.9);
  const colourValue = isBright ? randomNumber(130, 255) : randomNumber(110, 190);
  
  return (
    <div
      style={{
        backgroundColor: `rgb(${colourValue},${colourValue},${colourValue})`,
        width: `${size}px`,
        height: `${size}px`,
        transformOrigin: "0 0 0",
        transform: `rotate(${azimuth}rad) rotateY(${inclination}rad)`,
        animation: `reflect ${reflectSpeed}s linear infinite`,
        animationDelay: `${animationDelay}s`,
        backfaceVisibility: "hidden",
      }}
    ></div>
  )
}