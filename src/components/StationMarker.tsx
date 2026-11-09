import React from 'react';
import { Station } from '../types/portfolio';
import { sound } from '../utils/sound';

interface StationMarkerProps {
  station: Station;
  playerX: number;
  onOpen: (stationId: string) => void;
}

export const StationMarker: React.FC<StationMarkerProps> = ({ station, playerX, onOpen }) => {
  const distance = Math.abs(playerX - station.positionX);
  const isNearby = distance < 260;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playInteract();
    onOpen(station.id);
  };

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto"
      style={{
        left: `${station.positionX}px`,
        top: station.topPercent || '52%'
      }}
      onClick={handleClick}
      title={`${station.title}: ${station.subtitle}`}
      aria-label={`${station.title}: ${station.subtitle}`}
    >
      <div className="flex flex-col items-center select-none group-hover:-translate-y-1.5 transition-transform duration-200">
        {/* Proximity prompt */}
        {isNearby && (
          <div className="mb-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[9.5px] animate-bounce shadow-[0_0_12px_rgba(251,191,36,0.9)] flex items-center gap-1">
            <span className="bg-slate-900 text-amber-300 px-1 rounded text-[8.5px] font-mono">E</span>
            <span>Buka {station.title}</span>
          </div>
        )}

        {/* Pin Icon Bubble */}
        <div className="relative mb-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 border-2 border-white text-slate-950 font-extrabold flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.85)] animate-bounce group-hover:scale-125 transition-transform text-xs">
            <span className="text-[13px]">{station.icon}</span>
          </div>
          <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping -z-10" />
        </div>

        {/* Authentic Badge Sign */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#3d3024] bg-gradient-to-b from-[#fefdfa] via-[#faf5eb] to-[#f4ede0] shadow-[2px_3px_0px_rgba(45,34,24,0.25)] group-hover:border-[#c2410c] group-hover:scale-105 transition-all text-left whitespace-nowrap">
          <span className="px-1.5 py-0.2 rounded font-mono text-[9px] font-bold bg-[#f5ead8] border border-[#8c745f]/50 text-[#9a3412]">
            {station.index}
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[8.5px] font-bold uppercase tracking-widest text-[#c2410c]">
              {station.title}
            </span>
            <span className="text-[10.5px] font-bold text-[#231a14] group-hover:text-[#c2410c] transition-colors">
              {station.subtitle}
            </span>
          </div>
          <span className="text-[11px] text-[#b45309] font-bold ml-0.5 group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </div>

        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#3d3024] -mt-[1px]" />
      </div>
    </div>
  );
};
