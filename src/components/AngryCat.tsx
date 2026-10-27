import React, { useState } from 'react';
import { birthdayAssets } from '../config/birthdayAssets';

interface AngryCatProps {
  className?: string;
}

export const AngryCat: React.FC<AngryCatProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech bubble */}
      <div className="relative mb-2 px-3 py-1.5 rounded-2xl bg-white border-2 border-[#FF6FA5] shadow-md shadow-[#FF6FA5]/20 animate-bounce">
        <span className="text-xs sm:text-sm font-cute font-extrabold text-[#FF6FA5] tracking-wide">
          EXCUSE ME, MADAM?! 😾
        </span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#FF6FA5]" />
      </div>

      {/* Angry Cat Display or Illustrated Fallback */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
        {!hasError && birthdayAssets.angryCat ? (
          <img
            src={birthdayAssets.angryCat}
            alt="Angry Cat"
            onError={() => setHasError(true)}
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Angry Steam Clouds */}
            <circle cx="20" cy="25" r="5" fill="#FFE1D2" opacity="0.8" />
            <circle cx="15" cy="18" r="7" fill="#FFE1D2" opacity="0.8" />
            <circle cx="80" cy="25" r="5" fill="#FFE1D2" opacity="0.8" />
            <circle cx="85" cy="18" r="7" fill="#FFE1D2" opacity="0.8" />

            {/* Cat Head */}
            <ellipse cx="50" cy="58" rx="36" ry="32" fill="#FFF8FA" stroke="#FF6FA5" strokeWidth="2.5" />

            {/* Flat Annoyed Ears */}
            <polygon points="18,48 10,28 32,38" fill="#FFF8FA" stroke="#FF6FA5" strokeWidth="2.5" />
            <polygon points="82,48 90,28 68,38" fill="#FFF8FA" stroke="#FF6FA5" strokeWidth="2.5" />

            {/* Angry angled eyebrows */}
            <line x1="28" y1="44" x2="42" y2="52" stroke="#5A3D4D" strokeWidth="3" strokeLinecap="round" />
            <line x1="72" y1="44" x2="58" y2="52" stroke="#5A3D4D" strokeWidth="3" strokeLinecap="round" />

            {/* Scrunched Eyes */}
            <ellipse cx="36" cy="54" rx="4" ry="3" fill="#5A3D4D" />
            <ellipse cx="64" cy="54" rx="4" ry="3" fill="#5A3D4D" />

            {/* Pouting Mouth & Whiskers */}
            <path d="M44,68 Q50,62 56,68" stroke="#5A3D4D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <line x1="16" y1="58" x2="28" y2="60" stroke="#FF6FA5" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="65" x2="28" y2="64" stroke="#FF6FA5" strokeWidth="2" strokeLinecap="round" />
            <line x1="84" y1="58" x2="72" y2="60" stroke="#FF6FA5" strokeWidth="2" strokeLinecap="round" />
            <line x1="85" y1="65" x2="72" y2="64" stroke="#FF6FA5" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
};
