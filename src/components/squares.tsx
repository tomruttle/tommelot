import { FUZZY, MAX_ANGLE } from "../utils/constants";
import { randomNumber } from "../utils/shared";
import { Square } from "./square";
import { Tile } from "./tile";

function getAngleIncrement(inclination: number, radius: number, tileSize: number) {
  const currentRadius = Math.abs(2 * radius * Math.sin(inclination)) / 2.5;
  const circumference = Math.abs(MAX_ANGLE * currentRadius);
  const squaresThatFit = Math.floor(circumference / tileSize);

  return (MAX_ANGLE - FUZZY) / squaresThatFit;
}

function getSquareTransform(azimuth: number, inclination: number, radius: number) {
  const x = radius * Math.cos(azimuth) * Math.sin(inclination);
  const y = radius * Math.sin(azimuth) * Math.sin(inclination);
  const z = radius * Math.cos(inclination);

  return `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`
}

function getTileBackgroundColour(inclination: number) {
  const isBright = (inclination > 1.3 && inclination < 1.9) || (inclination < -1.3 && inclination > -1.9);
  const colourValue = isBright ? randomNumber(130, 255) : randomNumber(110, 190);

  return `rgb(${colourValue},${colourValue},${colourValue})`;
}

export function Squares({ radius, tileSize, prec, reflectSpeed }: { radius: number, tileSize: number, prec: number, reflectSpeed: number }) {
  const squares: Array<JSX.Element> = []

  for (let inclination = FUZZY; inclination < Math.PI; inclination += (Math.PI - FUZZY) / prec) {
    const angleInc = getAngleIncrement(inclination, radius, tileSize);

    for (let azimuth = (angleInc / 2) + FUZZY; azimuth < MAX_ANGLE; azimuth += angleInc) {
      squares.push((
        <Square
          key={`inc${inclination}az${azimuth}`}
          transform={getSquareTransform(azimuth, inclination, radius)}
          radius={radius}
        >
          <Tile
            transform={`rotate(${azimuth}rad) rotateY(${inclination}rad)`}
            animationDelay={randomNumber(0, 20) / 10}
            backgroundColor={getTileBackgroundColour(inclination)}
            size={tileSize}
            reflectSpeed={reflectSpeed}
          />
        </Square>
      ))
    }
  }

  return squares;
}