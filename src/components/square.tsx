import type { ReactNode } from "react";

export function Square({ transform, radius, children }: { transform: string, radius: number, children: ReactNode }) {
    return (
      <div
        style={{
          transform,
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