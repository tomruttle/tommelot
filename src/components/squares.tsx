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

function getSquareTransform(i: number, inclination: number, radius: number) {
  const x = radius * Math.cos(i) * Math.sin(inclination);
  const y = radius * Math.sin(i) * Math.sin(inclination);
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

    for (let i = (angleInc / 2) + FUZZY; i < MAX_ANGLE; i += angleInc) {
      squares.push((
        <Square
          key={`inc${inclination}i${i}`}
          transform={getSquareTransform(i, inclination, radius)}
          radius={radius}
        >
          <Tile
            transform={`rotate(${i}rad) rotateY(${inclination}rad)`}
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