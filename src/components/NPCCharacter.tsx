import React from 'react';
import { NPC } from '../types/portfolio';
import { sound } from '../utils/sound';

interface NPCCharacterProps {
  npc: NPC;
  playerX: number;
  onTalk: (npc: NPC) => void;
}

export const NPCCharacter: React.FC<NPCCharacterProps> = ({ npc, playerX, onTalk }) => {
  const distance = Math.abs(playerX - npc.positionX);
  const isNearby = distance < 200;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playDialogueBlip();
    onTalk(npc);
  };

  const animStyle = npc.animationType === 'seated-blink'
    ? `seated-npc-blink ${npc.animationDuration} steps(1, end) infinite`
    : `companion-sheet-idle ${npc.animationDuration} steps(3, end) infinite`;

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-full pointer-events-auto"
      style={{
        left: `${npc.positionX}px`,
        top: npc.topPercent || '79%'
      }}
    >
      <button
        type="button"
        aria-label={`Ngobrol dengan ${npc.name}`}
        title={`Ngobrol dengan ${npc.name}`}
        onClick={handleClick}
        className="group relative block cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-200 focus-visible:outline-offset-4"
      >
        {/* Tooltip speech bubble above character */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+0.55rem)] flex flex-col items-center pointer-events-none group-hover:-translate-y-[calc(100%+0.75rem)] transition-all duration-200">
          <div className="flex items-center gap-1.5 rounded-full border-2 border-[#3d3024] bg-gradient-to-r from-[#fefdfa] to-[#faf4ea] px-2.5 py-1 text-[#2c231b] shadow-[2px_3px_0px_rgba(45,34,24,0.22)] whitespace-nowrap">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#fef3c7] text-[10px] text-[#b45309] animate-pulse">
              💬
            </span>
            <span className="font-bold text-[11px] tracking-wide text-[#231a14]">
              {npc.name}
            </span>
            {isNearby && (
              <span className="ml-1 px-1.5 py-0.2 rounded bg-[#c2410c] text-white font-mono text-[9px] font-bold animate-bounce">
                Bicara [F]
              </span>
            )}
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#3d3024] -mt-[1px]" />
        </div>

        {/* Authentic Sprite Sheet Animated Graphic */}
        <span
          className="relative inline-block align-bottom group-hover:scale-105 transition-transform"
          style={{
            height: `${npc.sheetHeight}px`,
            width: `${npc.sheetWidth}px`
          }}
        >
          <span
            aria-hidden="true"
            className="world-companion-sheet block h-full w-full"
            style={{
              backgroundImage: `url(${npc.sheetUrl})`,
              backgroundSize: '400% 100%',
              animation: animStyle,
              animationDelay: npc.animationDelay
            }}
          />
        </span>
      </button>
    </div>
  );
};
