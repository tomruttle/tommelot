import { getCoordinates } from "../utils/shared";
import { Tile } from "./tile";

export const runtime = 'edge';

export default function DiscoBall(
  { radius = 100, tileSize = 9, rotationDuration = 100, reflectSpeed = 5, prec = 30 }:
  { radius?: number, tileSize?: number, rotationDuration?: number, reflectSpeed?: number, prec?: number }
) {
  const ballSize = `${2 * radius}px`;

  return (
    <div style={{
      position: 'relative',
      height: ballSize,
      width: ballSize,
    }}>
      <div
        style={{
          borderRadius: '100%',
          backgroundColor: 'white',
          opacity: '0.2',
          width: ballSize,
          height: ballSize,
          position: 'absolute',
          WebkitFilter: 'blur(20px)',
        }}
      ></div>

      <div
        style={{
          transformStyle: 'preserve-3d',
          animation: `rotateDiscoBall ${rotationDuration}s linear infinite`,
          width: ballSize,
          height: ballSize,
          position: 'absolute',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '100%',
            backgroundColor: '#111',
            position: 'absolute',
            background: 'linear-gradient(top, #111, #333)',
            animation: `rotateDiscoBallMiddle ${rotationDuration}s linear infinite`,
          }}
        ></div>

        {getCoordinates(radius, tileSize, prec).map(({ azimuth, inclination }) => (
          <Tile
            key={`inc${inclination}az${azimuth}`}
            inclination={inclination}
            azimuth={azimuth}
            radius={radius}
            tileSize={tileSize}
            reflectSpeed={reflectSpeed}
          />
        ))}
      </div>
    </div>
  )
}
