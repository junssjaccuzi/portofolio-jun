import React from 'react';
import { PlayerAction } from './Player';
import { sound } from '../utils/sound';

interface MobileControlsProps {
  onMoveLeftStart: () => void;
  onMoveLeftEnd: () => void;
  onMoveRightStart: () => void;
  onMoveRightEnd: () => void;
  onInteract: () => void;
  canInteract: boolean;
  playerAction: PlayerAction;
  setPlayerAction: React.Dispatch<React.SetStateAction<PlayerAction>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMoveLeftStart,
  onMoveLeftEnd,
  onMoveRightStart,
  onMoveRightEnd,
  onInteract,
  canInteract,
  playerAction,
  setPlayerAction,
  isRunning,
  setIsRunning
}) => {
  const handleToggleSit = () => {
    sound.playInteract();
    if (playerAction === 'sit') {
      setPlayerAction('sit-to-stand');
    } else {
      setPlayerAction('sit');
    }
  };

  const handleTriggerHi = () => {
    sound.playInteract();
    setPlayerAction('hi');
  };

  const handleToggleRun = () => {
    sound.playInteract();
    setIsRunning(prev => !prev);
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-3 sm:px-6 flex items-end justify-between pointer-events-none select-none">
      {/* Left / Right D-Pad */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onTouchStart={() => {
            sound.playFootstep();
            onMoveLeftStart();
          }}
          onTouchEnd={onMoveLeftEnd}
          onMouseDown={() => {
            sound.playFootstep();
            onMoveLeftStart();
          }}
          onMouseUp={onMoveLeftEnd}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/85 border-2 border-amber-800/60 active:bg-amber-600 active:border-amber-400 text-amber-200 active:text-slate-950 font-bold text-2xl flex items-center justify-center backdrop-blur-md shadow-2xl transition-all"
          title="Jalan Kiri"
        >
          ◀
        </button>

        <button
          type="button"
          onTouchStart={() => {
            sound.playFootstep();
            onMoveRightStart();
          }}
          onTouchEnd={onMoveRightEnd}
          onMouseDown={() => {
            sound.playFootstep();
            onMoveRightStart();
          }}
          onMouseUp={onMoveRightEnd}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/85 border-2 border-amber-800/60 active:bg-amber-600 active:border-amber-400 text-amber-200 active:text-slate-950 font-bold text-2xl flex items-center justify-center backdrop-blur-md shadow-2xl transition-all"
          title="Jalan Kanan"
        >
          ▶
        </button>
      </div>

      {/* Action Buttons: Hi, Sit, Run, Interact */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Run Toggle */}
        <button
          type="button"
          onClick={handleToggleRun}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 font-mono text-[10px] font-bold flex flex-col items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-95 ${
            isRunning
              ? 'bg-amber-500 border-white text-slate-950 shadow-[0_0_12px_#f59e0b]'
              : 'bg-slate-900/85 border-slate-700 text-slate-300'
          }`}
          title="Toggle Lari Cepat"
        >
          <span>⚡</span>
          <span>{isRunning ? 'RUN' : 'WALK'}</span>
        </button>

        {/* Hi / Wave Button */}
        <button
          type="button"
          onClick={handleTriggerHi}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-slate-700 bg-slate-900/85 hover:border-amber-400 text-slate-200 font-mono text-[10px] font-bold flex flex-col items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-95"
          title="Lambaikan Tangan"
        >
          <span>👋</span>
          <span>HI</span>
        </button>

        {/* Sit Button */}
        <button
          type="button"
          onClick={handleToggleSit}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-slate-700 bg-slate-900/85 hover:border-amber-400 text-slate-200 font-mono text-[10px] font-bold flex flex-col items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-95"
          title="Duduk / Berdiri"
        >
          <span>🪑</span>
          <span>{playerAction === 'sit' ? 'STAND' : 'SIT'}</span>
        </button>

        {/* Interact / Open Button */}
        <button
          type="button"
          onClick={() => {
            sound.playInteract();
            onInteract();
          }}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 font-bold text-xs flex flex-col items-center justify-center backdrop-blur-md shadow-2xl transition-all active:scale-95 ${
            canInteract
              ? 'bg-gradient-to-tr from-amber-500 to-orange-500 border-white text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.9)] animate-bounce'
              : 'bg-slate-900/85 border-slate-700 text-slate-400'
          }`}
          title="Buka Halte / Ajak Bicara"
        >
          <span className="text-base">✨</span>
          <span className="text-[9.5px] font-mono leading-none">Buka</span>
        </button>
      </div>
    </div>
  );
};
