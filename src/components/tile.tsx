import { convertToCartesian, randomNumber } from "../utils/shared";

export function Tile({ inclination, azimuth, tileSize, reflectSpeed, radius }: { inclination: number, azimuth: number, tileSize: number, reflectSpeed: number, radius: number }) {
  const [x, y, z] = convertToCartesian(radius, azimuth, inclination);
  const isBright = (inclination > 1.3 && inclination < 1.9) || (inclination < -1.3 && inclination > -1.9);
  const colourValue = isBright ? randomNumber(130, 255) : randomNumber(110, 190);

  return (
    <div
      style={{
        transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`,
        transformStyle: 'preserve-3d',
        position: 'absolute',
        top: `${radius}px`,
        left: `${radius}px`,
      }}
    >
      <div
        style={{
          backgroundColor: `rgb(${colourValue},${colourValue},${colourValue})`,
          width: `${tileSize}px`,
          height: `${tileSize}px`,
          transformOrigin: "0 0 0",
          transform: `rotate(${azimuth}rad) rotateY(${inclination}rad)`,
          animation: `reflect ${reflectSpeed}s linear infinite`,
          animationDelay: `${randomNumber(0, 20) / 10}s`,
          backfaceVisibility: "hidden",
        }}
      ></div>
    </div>
  )
}
