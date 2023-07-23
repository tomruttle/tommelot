export function Tile({ transform, animationDelay, backgroundColor, size }: { transform: string, animationDelay: number, backgroundColor: string, size: number }) {
    return (
      <div
        style={{
          backgroundColor,
          width: `${size}px`,
          height: `${size}px`,
          transformOrigin: "0 0 0",
          transform,
          animation: "reflect 2s linear infinite",
          animationDelay: `${animationDelay}s`,
          backfaceVisibility: "hidden",
        }}
      ></div>
    )
  }