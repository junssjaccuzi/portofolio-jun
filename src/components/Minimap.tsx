import React from 'react';
import { stations } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface MinimapProps {
  playerX: number;
  worldWidth: number;
  onNavigate: (x: number) => void;
}

export const Minimap: React.FC<MinimapProps> = ({ playerX, worldWidth, onNavigate }) => {
  const playerPercent = Math.min(100, Math.max(0, (playerX / worldWidth) * 100));

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    const targetX = Math.round(ratio * worldWidth);
    sound.playTeleport();
    onNavigate(targetX);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-35 w-[90%] max-w-xl pointer-events-auto select-none hidden sm:block">
      <div className="p-2 rounded-2xl bg-slate-950/85 border border-amber-900/40 backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
          <span className="text-amber-400 font-bold">PETA DUNIA SENJA</span>
          <span>{Math.round(playerX)}m / {worldWidth}m ({Math.round(playerPercent)}%)</span>
        </div>

        {/* Clickable Progress World Track */}
        <div 
          onClick={handleBarClick}
          className="relative h-4 rounded-full bg-slate-900 border border-slate-700/80 cursor-pointer overflow-visible group"
          title="Klik di mana saja pada peta untuk berjalan ke titik tersebut"
        >
          {/* Covered progress bar */}
          <div 
            className="h-full rounded-full bg-gradient-to-r from-amber-600/30 via-orange-500/40 to-amber-400/30 transition-all duration-150"
            style={{ width: `${playerPercent}%` }}
          />

          {/* Station Dots on Track */}
          {stations.map(st => {
            const stPercent = (st.positionX / worldWidth) * 100;
            return (
              <div
                key={st.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group-hover:scale-125 transition-transform"
                style={{ left: `${stPercent}%` }}
                title={`Pos ${st.index}: ${st.title}`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-950 shadow-[0_0_8px_#f59e0b]" />
              </div>
            );
          })}

          {/* Player Marker on Track */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-[0_0_12px_#34d399] transition-all duration-75 flex items-center justify-center text-[8px] font-bold text-slate-950"
            style={{ left: `${playerPercent}%` }}
          >
            ●
          </div>
        </div>
      </div>
    </div>
  );
};
