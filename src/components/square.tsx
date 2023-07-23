import type { ReactNode } from "react";
import { convertToCartesian } from "../utils/shared";

export function Square({ azimuth, inclination, radius, children }: { azimuth: number, inclination: number, radius: number, children: ReactNode }) {
  const [x, y, z] = convertToCartesian(radius, azimuth, inclination);

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
      {children}
    </div>
  )
}