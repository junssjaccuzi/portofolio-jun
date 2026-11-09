import React from 'react';

interface ParallaxBackgroundProps {
  cameraX: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ cameraX }) => {
  return (
    <div 
      className="absolute top-0 left-0 h-full will-change-transform select-none pointer-events-none overflow-hidden"
      style={{
        width: '10800px',
        transform: `translateX(-${cameraX}px)`
      }}
    >
      {/* 1. SCENE 1 (0 to 3600px) */}
      <img
        src="/backgrounds/bg-1.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full object-fill crisp-game-bg pointer-events-none"
        style={{ left: '0px', width: '3600px' }}
        draggable={false}
      />

      {/* 2. SCENE 2 (3402px to 7200px, with 198px gradient mask blend) */}
      <img
        src="/backgrounds/bg-2.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full object-fill crisp-game-bg pointer-events-none"
        style={{
          left: '3402px',
          width: '3798px',
          maskImage: 'linear-gradient(90deg, transparent 0, #000 198px, #000 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 198px, #000 100%)'
        }}
        draggable={false}
      />

      {/* 3. SCENE 3 (7002px to 10800px, with 198px gradient mask blend) */}
      <img
        src="/backgrounds/bg-3.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full object-fill crisp-game-bg pointer-events-none"
        style={{
          left: '7002px',
          width: '3798px',
          maskImage: 'linear-gradient(90deg, transparent 0, #000 198px, #000 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 198px, #000 100%)'
        }}
        draggable={false}
      />

      {/* Warm Ambient Glow Highlights along the landscape */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div 
          className="absolute w-20 h-20 rounded-full blur-xl opacity-60" 
          style={{ left: '486px', top: '43%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(253, 224, 71, 0.28) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute w-24 h-24 rounded-full blur-xl opacity-60" 
          style={{ left: '1710px', top: '53%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(254, 215, 170, 0.32) 0%, transparent 70%)' }} 
        />
        <div 
          className="absolute w-24 h-24 rounded-full blur-2xl opacity-40" 
          style={{ left: '5148px', top: '57%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, transparent 72%)' }} 
        />
        <div 
          className="absolute w-24 h-24 rounded-full blur-2xl opacity-40" 
          style={{ left: '8280px', top: '61%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, transparent 72%)' }} 
        />
        <div 
          className="absolute w-24 h-24 rounded-full blur-2xl opacity-40" 
          style={{ left: '9792px', top: '61%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, transparent 72%)' }} 
        />

        {/* Falling Blossom / Petal Drift along the scenes */}
        {[
          { x: 270, y: 5, w: 4, h: 5.6, color: '#f472b6', dur: 7, delay: 0 },
          { x: 1458, y: 39, w: 4, h: 5.6, color: '#f472b6', dur: 10, delay: 1.6 },
          { x: 2646, y: 73, w: 4, h: 5.6, color: '#f472b6', dur: 8, delay: 3.2 },
          { x: 3726, y: 68, w: 6, h: 8.4, color: '#f472b6', dur: 8, delay: 0 },
          { x: 4914, y: 27, w: 6, h: 8.4, color: '#f472b6', dur: 11, delay: 1.6 },
          { x: 5994, y: 22, w: 4, h: 5.6, color: '#f472b6', dur: 11, delay: 3.2 },
          { x: 7182, y: 56, w: 4, h: 5.6, color: '#f472b6', dur: 9, delay: 0 },
          { x: 8262, y: 51, w: 6, h: 8.4, color: '#f472b6', dur: 9, delay: 1.6 },
          { x: 9450, y: 10, w: 6, h: 8.4, color: '#f472b6', dur: 7, delay: 3.2 },
          { x: 10098, y: 9, w: 7, h: 9.8, color: '#fb7185', dur: 10, delay: 4 },
        ].map((pt, idx) => (
          <div
            key={idx}
            className="absolute rounded-full opacity-75 animate-petal-drift pointer-events-none"
            style={{
              left: `${pt.x}px`,
              top: `${pt.y}%`,
              width: `${pt.w}px`,
              height: `${pt.h}px`,
              backgroundColor: pt.color,
              animationDuration: `${pt.dur}s`,
              animationDelay: `${pt.delay}s`,
              transform: 'rotate(-25deg)'
            }}
          />
        ))}

        {/* Twinkling Fireflies */}
        {Array.from({ length: 16 }).map((_, idx) => (
          <span
            key={idx}
            className="world-firefly absolute rounded-full"
            style={{
              left: `${((47 * idx + 13) % 97) + 1}%`,
              top: `${34 + ((29 * idx) % 35)}%`,
              animationDelay: `${-(idx % 7) * 0.8}s`,
              animationDuration: `${6 + (idx % 4)}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
