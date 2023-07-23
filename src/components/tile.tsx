export function Tile({ transform, animationDelay, backgroundColor, size, reflectSpeed }: { transform: string, animationDelay: number, backgroundColor: string, size: number, reflectSpeed: number }) {
    return (
      <div
        style={{
          backgroundColor,
          width: `${size}px`,
          height: `${size}px`,
          transformOrigin: "0 0 0",
          transform,
          animation: `reflect ${reflectSpeed}s linear infinite`,
          animationDelay: `${animationDelay}s`,
          backfaceVisibility: "hidden",
        }}
      ></div>
    )
  }