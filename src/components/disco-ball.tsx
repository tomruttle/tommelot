import { Squares } from "./squares";

export default function DiscoBall() {
  const radius = 100;
  const tileSize = 9;
  const prec = 30;
  const rotationDuration = 100;
  const reflectSpeed = 5;

  return (
    <div style={{
      position: 'relative',
      height: `${2 * radius}px`,
      width: `${2 * radius}px`,
    }}>
      <div
        style={{
          borderRadius: '100%',
          backgroundColor: 'white',
          opacity: '0.2',
          width: `${2 * radius}px`,
          height: `${2 * radius}px`,
          position: 'absolute',
          WebkitFilter: 'blur(20px)',
        }}
      ></div>

      <div
        style={{
          transformStyle: 'preserve-3d',
          animation: `rotateDiscoBall ${rotationDuration}s linear infinite`,
          width: `${2 * radius}px`,
          height: `${2 * radius}px`,
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

        <Squares radius={radius} tileSize={tileSize} prec={prec} reflectSpeed={reflectSpeed} /></div>
    </div>
  )
}
