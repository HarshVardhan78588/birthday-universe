import React, { useState } from 'react';

interface CatStickerProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  badge?: string;
  animation?: 'float' | 'float-delayed' | 'bounce-gentle' | 'pulse-gentle' | 'wiggle';
  rotation?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CatSticker: React.FC<CatStickerProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  badge,
  animation = 'float',
  rotation = 'rotate-0',
  size = 'md'
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12 sm:w-16 sm:h-16',
    md: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24',
    lg: 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32',
    xl: 'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36'
  }[size];

  const animationClasses = {
    float: 'animate-float',
    'float-delayed': 'animate-float-delayed',
    'bounce-gentle': 'animate-bounce',
    'pulse-gentle': 'animate-pulse',
    wiggle: 'animate-wiggle'
  }[animation];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none pointer-events-none transform ${rotation} ${animationClasses} ${className}`}
    >
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        {!hasError ? (
          <img
            src={currentSrc}
            alt={alt}
            onError={handleError}
            className="w-full h-full object-contain filter drop-shadow-md rounded-2xl transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* High-fidelity SVG Fallback Cat */
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
            <ellipse cx="50" cy="55" rx="36" ry="32" fill="#FFF8FA" stroke="#F7A8C4" strokeWidth="2.5" />
            {/* Ears */}
            <polygon points="24,35 34,14 46,28" fill="#FFF8FA" stroke="#F7A8C4" strokeWidth="2.5" />
            <polygon points="28,32 35,20 42,28" fill="#F8BBD0" />
            <polygon points="76,35 66,14 54,28" fill="#FFF8FA" stroke="#F7A8C4" strokeWidth="2.5" />
            <polygon points="72,32 65,20 58,28" fill="#F8BBD0" />
            {/* Bow */}
            <circle cx="68" cy="22" r="3.5" fill="#FF6FA5" />
            <polygon points="65,22 58,17 58,27" fill="#FF6FA5" />
            <polygon points="71,22 78,17 78,27" fill="#FF6FA5" />
            {/* Eyes */}
            <circle cx="38" cy="50" r="4" fill="#5A3D4D" />
            <circle cx="40" cy="48" r="1.5" fill="#FFF" />
            <circle cx="62" cy="50" r="4" fill="#5A3D4D" />
            <circle cx="64" cy="48" r="1.5" fill="#FFF" />
            {/* Blush */}
            <circle cx="30" cy="60" r="6" fill="#F8BBD0" opacity="0.7" />
            <circle cx="70" cy="60" r="6" fill="#F8BBD0" opacity="0.7" />
            {/* Nose & Smile */}
            <polygon points="50,56 47,53 53,53" fill="#FF6FA5" />
            <path d="M46,60 Q50,64 54,60" stroke="#5A3D4D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        )}

        {/* Optional cute mini badge */}
        {badge && (
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-white/95 border border-[#FF6FA5] shadow-xs text-[9px] sm:text-[10px] font-cute font-bold text-[#FF6FA5] whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
