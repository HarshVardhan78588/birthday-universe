import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';

export type ApologyReactionMood = 'envelope' | 'sad' | 'missing' | 'police' | 'celebrate';

interface ApologyCatReactionsProps {
  mood: ApologyReactionMood;
}

export const ApologyCatReactions: React.FC<ApologyCatReactionsProps> = ({ mood }) => {
  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center select-none">
      {/* Mood: Envelope Carrier */}
      {mood === 'envelope' && (
        <div className="relative flex flex-col items-center animate-bounce">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={birthdayAssets.openingCat}
              alt="Cat carrying letter"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
            {/* Little Pink Envelope held in paw */}
            <div className="absolute -bottom-1 -right-1 w-12 h-9 rounded-lg bg-gradient-to-tr from-[#FF6FA5] to-[#F7A8C4] border-2 border-white shadow-md flex items-center justify-center transform -rotate-12">
              <span className="text-xs">💌</span>
            </div>
          </div>
          <span className="text-xs font-cute font-bold text-[#FF6FA5] mt-1 bg-white/80 px-2.5 py-0.5 rounded-full shadow-xs">
            Special Delivery 🐾
          </span>
        </div>
      )}

      {/* Mood: Sad Apology Cat hugging small heart */}
      {mood === 'sad' && (
        <div className="relative flex flex-col items-center animate-float">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={birthdayAssets.openingCat}
              alt="Sad Apology Cat"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
            {/* Little pink heart hugged tight */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center animate-pulse">
              <Heart className="w-9 h-9 text-[#FF6FA5] fill-[#F8BBD0] drop-shadow-md" />
              <span className="absolute text-[10px] font-bold text-[#5A3D4D]">sorry</span>
            </div>
          </div>
          <span className="text-xs font-cute font-bold text-[#5A3D4D]/70 mt-1 bg-white/80 px-2.5 py-0.5 rounded-full">
            Genuinely so sorry... 🥺
          </span>
        </div>
      )}

      {/* Mood: Missing You Cat hugging giant glowing heart */}
      {mood === 'missing' && (
        <div className="relative flex flex-col items-center animate-float">
          {/* Glowing Aura */}
          <div className="absolute inset-0 bg-pink-300/30 blur-xl rounded-full scale-125 animate-pulse" />

          {/* Floating tiny hearts around */}
          <Heart className="absolute -top-2 -left-2 w-4 h-4 text-[#FF6FA5] fill-[#FF6FA5] animate-ping" />
          <Heart className="absolute top-2 -right-3 w-5 h-5 text-[#FF6FA5] fill-[#FF6FA5] animate-bounce" />

          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* Giant glowing heart in front */}
            <div className="absolute z-10 bottom-0 flex items-center justify-center">
              <Heart className="w-18 h-18 sm:w-20 sm:h-20 text-[#FF6FA5] fill-[#FF6FA5] filter drop-shadow-[0_0_15px_rgba(255,111,165,0.7)]" />
              <span className="absolute text-xs font-cute font-extrabold text-white">
                MISS U 👉👈
              </span>
            </div>
            <img
              src={birthdayAssets.birthdayDecorations[1] || birthdayAssets.openingCat}
              alt="Missing you Cat"
              className="w-24 h-24 object-contain filter drop-shadow-md -translate-y-3"
            />
          </div>
          <span className="text-xs font-cute font-bold text-[#FF6FA5] mt-1 bg-white/90 px-3 py-0.5 rounded-full shadow-xs">
            Missing you so much ♡
          </span>
        </div>
      )}

      {/* Mood: Police Cat holding warrant */}
      {mood === 'police' && (
        <div className="relative flex flex-col items-center animate-bounce">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={birthdayAssets.openingCat}
              alt="Police Cat"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
            {/* Cute Police Badge & Cap */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#3B82F6] text-white text-[10px] font-cute font-bold shadow-sm">
              POLICE 🚨
            </div>
            {/* Handcuffs or warrant icon */}
            <div className="absolute bottom-1 right-0 text-xl">
              🚔
            </div>
          </div>
          <span className="text-xs font-cute font-bold text-red-400 mt-1 bg-white/80 px-2.5 py-0.5 rounded-full shadow-xs">
            Officer Kitty On Duty! 🚨
          </span>
        </div>
      )}

      {/* Mood: Celebration Cat in Birthday Party Hat */}
      {mood === 'celebrate' && (
        <div className="relative flex flex-col items-center animate-bounce">
          {/* Confetti & sparkles */}
          <Sparkles className="absolute -top-3 -right-2 w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />

          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={birthdayAssets.birthdayDecorations[0] || birthdayAssets.openingCat}
              alt="Celebration Cat"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
            {/* Birthday Party Hat */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-8 pointer-events-none">
              <svg viewBox="0 0 28 28" className="w-full h-full drop-shadow-xs">
                <polygon points="14,0 0,28 28,28" fill="#FF6FA5" stroke="#FFF" strokeWidth="1.5" />
              </svg>
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[9px]">👑</span>
            </div>
          </div>
          <span className="text-xs font-cute font-bold text-[#FF6FA5] mt-1 bg-white/90 px-3 py-0.5 rounded-full shadow-xs">
            Go Queen! 🎂🌸
          </span>
        </div>
      )}
    </div>
  );
};
