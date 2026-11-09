import React, { useState, useEffect } from 'react';
import { portfolioData, inspirationalQuotes } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface LoadingScreenProps {
  onStart: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteText, setQuoteText] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [lang, setLang] = useState<'ID' | 'EN' | 'JA'>('ID');

  // Progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // Quotes typewriter effect
  useEffect(() => {
    const currentQuote = inspirationalQuotes[quoteIdx];
    let charIdx = 0;
    setQuoteText('');

    const typeTimer = setInterval(() => {
      charIdx++;
      if (charIdx <= currentQuote.length) {
        setQuoteText(currentQuote.slice(0, charIdx));
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setQuoteIdx(prev => (prev + 1) % inspirationalQuotes.length);
        }, 4000);
      }
    }, 28);

    return () => clearInterval(typeTimer);
  }, [quoteIdx]);

  const handleStart = () => {
    sound.startBgm();
    sound.playInteract();
    onStart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading Screen"
      className="fixed inset-0 z-50 flex flex-col justify-between items-center select-none overflow-hidden transition-all duration-700 bg-slate-950 text-slate-100"
    >
      {/* Authentic Splash Image Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src="/backgrounds/splash1.png"
          alt="Portfolio Background"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50 pointer-events-none" />
      </div>

      {/* Top Bar: Language Selector */}
      <div className="w-full flex items-center justify-end px-5 sm:px-8 pt-5 sm:pt-7 z-10 pointer-events-auto">
        <div
          role="group"
          aria-label="Pilih Bahasa / Select Language / 言語選択"
          className="inline-flex items-center gap-0.5 rounded-full border-2 border-[#4a3c2e] bg-[#fbf4e6] p-0.5 shadow-[1px_2px_0px_rgba(45,34,24,0.18)] pointer-events-auto"
        >
          <button
            type="button"
            onClick={() => setLang('ID')}
            aria-pressed={lang === 'ID'}
            title="Bahasa Indonesia"
            className={`rounded-full font-mono font-bold transition-all cursor-pointer px-2 py-0.5 text-[9px] ${
              lang === 'ID'
                ? 'bg-[#c2410c] text-white shadow-[1px_1px_0px_#431407] scale-105'
                : 'text-[#6b5847] hover:text-[#231a14] hover:bg-[#f2e5d0]'
            }`}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLang('EN')}
            aria-pressed={lang === 'EN'}
            title="English"
            className={`rounded-full font-mono font-bold transition-all cursor-pointer px-2 py-0.5 text-[9px] ${
              lang === 'EN'
                ? 'bg-[#c2410c] text-white shadow-[1px_1px_0px_#431407] scale-105'
                : 'text-[#6b5847] hover:text-[#231a14] hover:bg-[#f2e5d0]'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang('JA')}
            aria-pressed={lang === 'JA'}
            title="日本語"
            className={`rounded-full font-mono font-bold transition-all cursor-pointer px-2 py-0.5 text-[9px] ${
              lang === 'JA'
                ? 'bg-[#c2410c] text-white shadow-[1px_1px_0px_#431407] scale-105'
                : 'text-[#6b5847] hover:text-[#231a14] hover:bg-[#f2e5d0]'
            }`}
          >
            JA
          </button>
        </div>
      </div>

      {/* Center: Title & Atmospheric Tagline */}
      <div className="flex flex-col items-center text-center px-4 max-w-2xl my-auto animate-in fade-in duration-700">
        <div className="mb-2.5 sm:mb-3">
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-amber-100/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="15" x="2" y="4.5" rx="2.5" />
            <circle cx="8" cy="12" r="2.2" />
            <circle cx="16" cy="12" r="2.2" />
            <path d="M10.2 12h3.6" />
            <path d="m5.5 17 1.5-3.5h10l1.5 3.5" />
          </svg>
        </div>

        <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-amber-100/85 mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {portfolioData.name.toUpperCase()} ({portfolioData.nickname})
        </div>

        <h1 className="font-serif italic text-3xl sm:text-5xl md:text-[3.5rem] font-normal text-[#fdfbf7] tracking-tight leading-none drop-shadow-[0_3px_16px_rgba(0,0,0,0.8)]">
          {portfolioData.tagline}
        </h1>

        <svg
          className="w-44 sm:w-64 h-2.5 text-amber-100/70 mt-1.5 sm:mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
          viewBox="0 0 200 8"
          fill="none"
        >
          <path d="M2 5C45 2 155 2 198 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        <p className="font-mono text-[10.5px] sm:text-xs font-medium tracking-[0.2em] uppercase text-amber-200/90 mt-2 sm:mt-2.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          Portofolio Interaktif Senja
        </p>

        {/* Typewriter Quote Box */}
        <div className="mt-4 sm:mt-5 max-w-xl mx-auto px-2">
          <p className="font-handwriting text-base sm:text-xl text-amber-100/95 leading-relaxed tracking-wide [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] min-h-[3.6rem] sm:min-h-[4rem]">
            “{quoteText}”
            <span className="inline-block w-1.5 h-4 sm:h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
          </p>
        </div>
      </div>

      {/* Bottom: Progress Bar & Start Button */}
      <div className="w-full max-w-xl flex flex-col items-center px-4 pb-6 sm:pb-10 text-center animate-in fade-in duration-500">
        {!isReady ? (
          <div className="w-full flex flex-col items-center">
            <div className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-amber-100/95 mb-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              Memuat Dunia...
            </div>
            <div className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-md">
              <div className="flex-1 h-3.5 sm:h-4 rounded-full border border-amber-200/40 bg-slate-950/60 backdrop-blur-md p-[2.5px] shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#fae8c8] via-[#fde047] to-[#eab308] shadow-[0_0_12px_rgba(250,204,21,0.6)] transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-amber-100 min-w-[2.8rem] text-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {progress}%
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStart}
            className="w-full max-w-xs sm:max-w-md py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.8)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 animate-pulse"
          >
            <span>Mulai Masuki Dunia</span>
            <span>▶</span>
          </button>
        )}

        {/* Tip footer */}
        <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-amber-100/80 font-medium tracking-wide max-w-md leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          <span>💡 Tips: Kamu bisa berinteraksi dengan berbagai objek di dunia ini untuk mengenal Jun lebih dekat.</span>
        </div>
      </div>
    </div>
  );
};
