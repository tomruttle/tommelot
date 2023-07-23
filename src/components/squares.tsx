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

export function Squares({ radius, tileSize, prec, reflectSpeed }: { radius: number, tileSize: number, prec: number, reflectSpeed: number }) {
  const squares: Array<JSX.Element> = []

  for (let inclination = FUZZY; inclination < Math.PI; inclination += (Math.PI - FUZZY) / prec) {
    const angleInc = getAngleIncrement(inclination, radius, tileSize);

    for (let azimuth = (angleInc / 2) + FUZZY; azimuth < MAX_ANGLE; azimuth += angleInc) {
      squares.push((
        <Square
          key={`inc${inclination}az${azimuth}`}
          inclination={inclination}
          azimuth={azimuth}
          radius={radius}
        >
          <Tile
            animationDelay={randomNumber(0, 20) / 10}
            inclination={inclination}
            azimuth={azimuth}
            size={tileSize}
            reflectSpeed={reflectSpeed}
          />
        </Square>
      ))
    }
  }

  return squares;
}