import { FUZZY, MAX_ANGLE } from "../utils/constants";
import { randomNumber } from "../utils/shared";
import { Square } from "./square";
import { Tile } from "./tile";

function getAngleIncrement(t: number, radius: number, tileSize: number) {
  const currentRadius = Math.abs(2 * radius * Math.sin(t)) / 2.5;
  const circumference = Math.abs(MAX_ANGLE * currentRadius);
  const squaresThatFit = Math.floor(circumference / tileSize);

  return (MAX_ANGLE - FUZZY) / squaresThatFit;
}

function getSquareTransform(i: number, t: number, radius: number) {
  const x = radius * Math.cos(i) * Math.sin(t);
  const y = radius * Math.sin(i) * Math.sin(t);
  const z = radius * Math.cos(t);

  return `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`
}

function getTileBackgroundColour(t: number) {
  const isBright = (t > 1.3 && t < 1.9) || (t < -1.3 && t > -1.9);
  const colourValue = isBright ? randomNumber(130, 255) : randomNumber(110, 190);

  return `rgb(${colourValue},${colourValue},${colourValue})`;
}

export function Squares({ radius, tileSize, prec }: { radius: number, tileSize: number, prec: number }) {
  const squares: Array<JSX.Element> = []

  for (let t = FUZZY; t < Math.PI; t += (Math.PI - FUZZY) / prec) {
    const angleInc = getAngleIncrement(t, radius, tileSize);

    for (let i = (angleInc / 2) + FUZZY; i < MAX_ANGLE; i += angleInc) {
      squares.push((
        <Square
          key={`t${t}i${i}`}
          transform={getSquareTransform(i, t, radius)}
          radius={radius}
        >
          <Tile
            transform={`rotate(${i}rad) rotateY(${t}rad)`}
            animationDelay={randomNumber(0, 20) / 10}
            backgroundColor={getTileBackgroundColour(t)}
            size={tileSize}
          />
        </Square>
      ))
    }
  }

  return squares;
}