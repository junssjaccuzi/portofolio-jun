import React, { useState, useEffect } from 'react';
import { NPC } from '../types/portfolio';
import { sound } from '../utils/sound';

interface DialogueModalProps {
  npc: NPC;
  onClose: () => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({ npc, onClose }) => {
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullText = npc.dialogue[currentLineIdx] || '';

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let charIdx = 0;

    const interval = setInterval(() => {
      charIdx++;
      if (charIdx <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIdx));
        if (charIdx % 3 === 0) {
          sound.playDialogueBlip();
        }
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentLineIdx, fullText]);

  const handleNext = () => {
    if (isTyping) {
      // Skip typing and show full text immediately
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    if (currentLineIdx < npc.dialogue.length - 1) {
      sound.playDialogueBlip();
      setCurrentLineIdx(prev => prev + 1);
    } else {
      sound.playDialogueBlip();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4 sm:px-6 bg-black/40 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-2xl border-2 border-[#5c4228] bg-gradient-to-b from-[#211611] via-[#1a110d] to-[#120b08] p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-amber-50 relative overflow-hidden"
        onClick={handleNext}
      >
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-orange-400 to-amber-600" />

        <div className="flex items-start gap-4">
          {/* NPC Avatar Portrait */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-amber-500/70 bg-gradient-to-tr from-amber-950 to-orange-900 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
              {npc.avatarEmoji}
            </div>
            <span className="mt-1 font-mono text-[10px] text-amber-300 font-bold uppercase tracking-wider text-center">
              {npc.name}
            </span>
          </div>

          {/* Dialogue Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-amber-300/80 font-mono">
                {npc.title}
              </span>
              <span className="text-[10px] text-amber-400/60 font-mono">
                {currentLineIdx + 1} / {npc.dialogue.length}
              </span>
            </div>

            {/* Dialogue Text */}
            <p className="text-sm sm:text-base text-amber-100 font-medium leading-relaxed min-h-[3rem] font-sans">
              {displayedText}
              {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse align-middle" />}
            </p>

            {/* Special Trivia Tag */}
            {npc.specialFact && !isTyping && (
              <div className="mt-2 text-[11px] text-orange-200/80 italic bg-amber-950/40 border border-amber-800/40 rounded-lg px-2.5 py-1">
                💡 {npc.specialFact}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-3 pt-3 border-t border-amber-900/40 flex items-center justify-between">
          <span className="text-[10px] text-amber-300/60 font-mono">
            Klik di mana saja atau tekan [Space] untuk lanjut
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <span>{currentLineIdx < npc.dialogue.length - 1 ? 'Lanjut' : 'Selesai'}</span>
            <span className="text-amber-200">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
};
