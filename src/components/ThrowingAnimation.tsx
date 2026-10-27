import React, { useState } from 'react';
import { Cloud, Heart, Sparkles } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';

export const ThrowingAnimation: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center justify-center p-4 rounded-3xl bg-white/70 border border-[#F8BBD0] shadow-lg shadow-[#FF6FA5]/10 animate-fade-in select-none">
      {/* Fluffy Pink Cloud at top */}
      <div className="relative w-full flex items-center justify-center mb-1">
        <div className="relative flex items-center justify-center animate-float">
          <Cloud className="w-24 h-16 sm:w-28 sm:h-20 text-[#F8BBD0] fill-[#FCE4EC] drop-shadow-md" />
          <Heart className="absolute top-2 right-4 w-4 h-4 text-[#FF6FA5] fill-[#FF6FA5] animate-ping" />
          <Sparkles className="absolute -top-1 left-3 w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />

          {/* Little tossed cat head popping out of the cloud */}
          <div className="absolute top-1 text-xl sm:text-2xl animate-bounce">
            😸☁️
          </div>
        </div>
      </div>

      {/* Gag Illustration or Replaceable Asset */}
      <div className="relative w-40 h-28 flex items-center justify-center">
        {!hasError && birthdayAssets.throwingCat ? (
          <img
            src={birthdayAssets.throwingCat}
            alt="Throwing Cat Gag"
            onError={() => setHasError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          /* Sweet Cartoon Toss Illustration */
          <svg viewBox="0 0 160 100" className="w-full h-full drop-shadow-sm">
            {/* Motion arch trajectory */}
            <path
              d="M 50 80 Q 80 20 120 40"
              fill="none"
              stroke="#F7A8C4"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Cat thrower */}
            <circle cx="45" cy="75" r="18" fill="#FFFDFE" stroke="#FF6FA5" strokeWidth="2" />
            <polygon points="34,60 38,48 48,58" fill="#FF6FA5" />
            <polygon points="45,58 55,48 58,60" fill="#FF6FA5" />
            {/* Arms raised in toss gesture */}
            <path d="M 35 75 Q 50 50 65 60" stroke="#5A3D4D" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Thrower expression */}
            <circle cx="41" cy="73" r="2" fill="#5A3D4D" />
            <circle cx="49" cy="73" r="2" fill="#5A3D4D" />
            <path d="M 43 78 Q 45 81 48 78" stroke="#5A3D4D" strokeWidth="1.5" fill="none" />

            {/* Little cat airborne in gentle toss */}
            <g transform="translate(110, 32) rotate(20)">
              <circle cx="0" cy="0" r="14" fill="#FFF8FA" stroke="#FF6FA5" strokeWidth="2" />
              <polygon points="-8,-12 -4,-20 2,-12" fill="#F8BBD0" />
              <polygon points="2,-12 8,-20 12,-12" fill="#F8BBD0" />
              <text x="-7" y="4" fontSize="10">^ ﻌ ^</text>
            </g>
          </svg>
        )}
      </div>

      {/* The Exaggerated Teasing Gag Caption */}
      <div className="mt-2 text-center px-3">
        <p className="text-sm sm:text-base font-cute font-bold text-[#FF6FA5] tracking-tight leading-snug">
          "Next time, I'm throwing you into the clouds. Affectionately. 😤💗"
        </p>
      </div>
    </div>
  );
};
