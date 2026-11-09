import React, { useEffect, useRef, useState } from 'react';

export type PlayerAction = 'idle' | 'walk' | 'sit' | 'sit-to-stand' | 'hi' | 'smoke';

interface PlayerProps {
  x: number;
  action: PlayerAction;
  facing: 'left' | 'right';
  isRunning: boolean;
  nickname: string;
  onActionComplete?: (action: PlayerAction) => void;
}

const ANIMATION_SOURCES: Record<PlayerAction, string[]> = {
  idle: [
    '/animations/idle/idle_01.png',
    '/animations/idle/idle_02.png',
    '/animations/idle/idle_03.png',
    '/animations/idle/idle_04.png',
    '/animations/idle/idle_05.png',
    '/animations/idle/idle_06.png',
    '/animations/idle/idle_07.png',
    '/animations/idle/idle_08.png'
  ],
  walk: [
    '/animations/walk/walk_01.png',
    '/animations/walk/walk_02.png',
    '/animations/walk/walk_03.png',
    '/animations/walk/walk_04.png',
    '/animations/walk/walk_05.png',
    '/animations/walk/walk_06.png',
    '/animations/walk/walk_07.png',
    '/animations/walk/walk_08.png'
  ],
  sit: [
    '/animations/sit/sit_01.png',
    '/animations/sit/sit_02.png',
    '/animations/sit/sit_03.png',
    '/animations/sit/sit_04.png',
    '/animations/sit/sit_05.png',
    '/animations/sit/sit_06.png',
    '/animations/sit/sit_07.png',
    '/animations/sit/sit_08.png'
  ],
  'sit-to-stand': [
    '/animations/sit-to-stand/sit_to_stand_01.png',
    '/animations/sit-to-stand/sit_to_stand_02.png',
    '/animations/sit-to-stand/sit_to_stand_03.png',
    '/animations/sit-to-stand/sit_to_stand_04.png',
    '/animations/sit-to-stand/sit_to_stand_05.png',
    '/animations/sit-to-stand/sit_to_stand_06.png',
    '/animations/sit-to-stand/sit_to_stand_07.png',
    '/animations/sit-to-stand/sit_to_stand_08.png'
  ],
  hi: [
    '/animations/hi/hi_01.png',
    '/animations/hi/hi_02.png',
    '/animations/hi/hi_03.png',
    '/animations/hi/hi_04.png',
    '/animations/hi/hi_05.png',
    '/animations/hi/hi_06.png',
    '/animations/hi/hi_07.png',
    '/animations/hi/hi_08.png'
  ],
  smoke: [
    '/animations/smoke/smoke-inhale.png',
    '/animations/smoke/smoke-transition.png',
    '/animations/smoke/smoke-exhale.png'
  ]
};

const FRAME_DELAYS: Record<PlayerAction, number> = {
  idle: 180,
  walk: 95,
  sit: 240,
  'sit-to-stand': 100,
  hi: 95,
  smoke: 500
};

export const Player: React.FC<PlayerProps> = ({
  x,
  action,
  facing,
  isRunning,
  nickname,
  onActionComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reflectionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Record<string, HTMLImageElement[]>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const currentFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload all animation frames
  useEffect(() => {
    let loadedCount = 0;
    const actions = Object.keys(ANIMATION_SOURCES) as PlayerAction[];
    const totalCount = actions.reduce((sum, act) => sum + ANIMATION_SOURCES[act].length, 0);
    const loadedImages: Record<string, HTMLImageElement[]> = {};

    actions.forEach(act => {
      loadedImages[act] = [];
      ANIMATION_SOURCES[act].forEach((src, idx) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages[act][idx] = img;
          loadedCount++;
          if (loadedCount === totalCount) {
            imagesRef.current = loadedImages;
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalCount) {
            imagesRef.current = loadedImages;
            setImagesLoaded(true);
          }
        };
      });
    });
  }, []);

  // Frame animation loop
  useEffect(() => {
    if (!imagesLoaded) return;

    const renderLoop = (timestamp: number) => {
      let delay = FRAME_DELAYS[action] || 100;
      if (action === 'walk' && isRunning) {
        delay = 65;
      }

      if (timestamp - lastFrameTimeRef.current >= delay) {
        lastFrameTimeRef.current = timestamp;
        const frames = imagesRef.current[action] || imagesRef.current.idle;
        if (frames && frames.length > 0) {
          const nextFrame = currentFrameRef.current + 1;
          if (nextFrame >= frames.length) {
            if (action === 'hi' || action === 'sit-to-stand' || action === 'smoke') {
              onActionComplete?.(action);
              currentFrameRef.current = 0;
            } else {
              currentFrameRef.current = 0;
            }
          } else {
            currentFrameRef.current = nextFrame;
          }
        }
      }

      // Draw onto canvas
      const canvas = canvasRef.current;
      const refCanvas = reflectionCanvasRef.current;
      const frames = imagesRef.current[action] || imagesRef.current.idle;
      const currentImg = frames?.[currentFrameRef.current];

      if (canvas && currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const drawHeight = action === 'sit' || action === 'sit-to-stand' ? currentImg.height : 617;
          const scale = drawHeight / currentImg.height;
          const drawWidth = currentImg.width * scale;
          const drawX = (canvas.width - drawWidth) / 2;
          const drawY = canvas.height - drawHeight;

          ctx.drawImage(currentImg, drawX, drawY, drawWidth, drawHeight);
        }

        // Reflection Canvas
        if (refCanvas) {
          const refCtx = refCanvas.getContext('2d');
          if (refCtx) {
            refCtx.clearRect(0, 0, refCanvas.width, refCanvas.height);
            refCtx.save();
            refCtx.scale(1, -1);
            const drawHeight = action === 'sit' || action === 'sit-to-stand' ? currentImg.height : 617;
            const scale = drawHeight / currentImg.height;
            const drawWidth = currentImg.width * scale;
            const drawX = (refCanvas.width - drawWidth) / 2;
            refCtx.drawImage(currentImg, drawX, -drawHeight, drawWidth, drawHeight);
            refCtx.restore();
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [imagesLoaded, action, isRunning, onActionComplete]);

  // Reset frame when action changes
  useEffect(() => {
    currentFrameRef.current = 0;
    lastFrameTimeRef.current = 0;
  }, [action]);

  const isSitting = action === 'sit' || action === 'sit-to-stand';

  return (
    <div
      className="absolute pointer-events-none select-none z-20"
      style={{
        left: `${x}px`,
        top: isSitting ? '74%' : '79%',
        transform: `translate(-50%, -100%) scaleX(${facing === 'left' ? -1 : 1})`
      }}
    >
      {/* Walk Ripple Effect */}
      {action === 'walk' && (
        <div className="walk-ripple absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-2 border border-amber-100/25 rounded-full pointer-events-none" />
      )}

      {/* Ground Shadow */}
      {!isSitting && (
        <div
          className="player-ground-shadow absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: '100px', height: '7.5px', bottom: '-2px' }}
        />
      )}

      {/* Name Tag above head */}
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        style={{ transform: `scaleX(${facing === 'left' ? -1 : 1})` }}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-400/60 bg-slate-950/80 backdrop-blur-sm text-[11px] font-bold text-amber-200 shadow-[0_2px_10px_rgba(0,0,0,0.6)] whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{nickname}</span>
          <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono">
            {isRunning ? 'RUN' : action.toUpperCase()}
          </span>
        </div>
        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-amber-400/80 -mt-[1px]" />
      </div>

      {/* Main Player Canvas */}
      <canvas
        ref={canvasRef}
        width={330}
        height={630}
        className={`player-sprite-canvas relative z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] block ${
          action === 'idle' ? 'animate-player-idle' : ''
        }`}
        style={{ width: '179px', height: '342px' }}
      />

      {/* Water / Ground Reflection */}
      <div
        className="absolute top-full left-0 right-0 opacity-25 pointer-events-none blur-[0.8px] overflow-hidden"
        style={{
          height: '222px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 10%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 10%, transparent 95%)'
        }}
      >
        <canvas
          ref={reflectionCanvasRef}
          width={330}
          height={630}
          style={{ width: '179px', height: '342px' }}
        />
      </div>
    </div>
  );
};
