import React, { useState } from 'react';
import { portfolioData, stations } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface HeaderNavProps {
  playerX: number;
  onTeleport: (positionX: number) => void;
  onOpenStation: (stationId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ playerX, onTeleport, onOpenStation }) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [volume, setVolume] = useState(sound.volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    sound.setVolume(newVol);
    if (isMuted && newVol > 0) {
      sound.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3 pointer-events-none select-none flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
      {/* Left: Branding & Role Badge */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        <div 
          onClick={() => {
            sound.playTeleport();
            onTeleport(500);
          }}
          className="flex items-center gap-2 cursor-pointer group p-1 sm:p-1.5 rounded-full bg-slate-950/70 border border-amber-900/40 backdrop-blur-md shadow-md hover:border-amber-400/80 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-slate-950 text-xs shadow-[0_0_12px_rgba(245,158,11,0.6)]">
            RP
          </div>
          <div className="pr-2 hidden xs:block">
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 block font-bold">
              {portfolioData.nickname} • PORTOFOLIO
            </span>
            <span className="text-xs font-bold text-slate-100 font-cinzel leading-none group-hover:text-amber-300 transition-colors">
              {portfolioData.name}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Fast Travel Station Teleport Bar (Desktop & Tablet) */}
      <nav className="pointer-events-auto hidden md:flex items-center gap-1 p-1 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-md shadow-lg">
        {stations.map(st => {
          const isCurrent = Math.abs(playerX - st.positionX) < 400;
          return (
            <button
              key={st.id}
              onClick={() => {
                sound.playTeleport();
                onTeleport(st.positionX);
                onOpenStation(st.id);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer ${
                isCurrent
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.8)] scale-105'
                  : 'text-slate-300 hover:text-amber-200 hover:bg-slate-800/60'
              }`}
              title={`Teleport ke Pos ${st.index}: ${st.title}`}
            >
              <span>{st.icon}</span>
              <span>{st.index}. {st.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Sound & Volume Controls & Quick Contact */}
      <div className="pointer-events-auto flex items-center gap-2 relative">
        {/* Audio Container */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            type="button"
            onClick={toggleSound}
            className="px-3 py-1.5 rounded-full bg-slate-950/80 border border-amber-900/50 hover:border-amber-400 text-xs text-amber-300 font-mono font-bold flex items-center gap-2 backdrop-blur-md shadow-md cursor-pointer transition-all active:scale-95"
            title={isMuted ? 'Nyalakan Audio (BGM)' : 'Bisukan Audio'}
          >
            <span>{isMuted ? '🔇' : '🎵'}</span>

            {/* Sound Wave Bars when active */}
            {!isMuted && (
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-2" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-pulse h-3" />
                <span className="w-0.5 bg-amber-500 rounded-full animate-pulse h-1.5" />
              </span>
            )}

            <span className="hidden sm:inline">
              {isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}
            </span>
          </button>

          {/* Volume Slider Popover */}
          {showVolumeSlider && (
            <div className="absolute right-0 top-full pt-1 z-50">
              <div className="p-2.5 rounded-2xl bg-slate-950/95 border border-amber-900/60 backdrop-blur-md shadow-2xl flex items-center gap-2 min-w-[130px]">
                <span className="text-[10px] text-amber-400 font-mono">🔈</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <span className="text-[10px] text-amber-300 font-mono w-6 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Contact Button */}
        <button
          type="button"
          onClick={() => {
            sound.playTeleport();
            onTeleport(8100);
            onOpenStation('contact');
          }}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs font-mono shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-1"
        >
          <span>✉️</span>
          <span className="hidden sm:inline">Kontak</span>
        </button>
      </div>
    </header>
  );
};
