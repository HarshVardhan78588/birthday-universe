import React, { useState } from 'react';

interface CuteCatProps {
  src?: string;
  alt?: string;
  className?: string;
  bubbleText?: string;
  bubbleSide?: 'top' | 'left' | 'right' | 'bottom';
  variant?: 'waving' | 'peeking' | 'dancing' | 'astronaut' | 'angry' | 'throwing';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const CuteCat: React.FC<CuteCatProps> = ({
  src,
  alt = 'Cute cat',
  className = '',
  bubbleText,
  bubbleSide = 'top',
  variant = 'waving',
  size = 'md',
  onClick
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28 sm:w-36 sm:h-36',
    lg: 'w-36 h-36 sm:w-48 sm:h-48',
    xl: 'w-48 h-48 sm:w-60 sm:h-60'
  }[size];

  // Vector fallback illustration if external or local image fails to load
  const renderFallbackSvg = () => {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
      >
        {/* Cat head */}
        <ellipse cx="60" cy="65" rx="42" ry="38" fill="#FFF8FA" stroke="#F7A8C4" strokeWidth="3" />
        
        {/* Cat ears */}
        <polygon points="28,40 38,15 54,32" fill="#FFF8FA" stroke="#F7A8C4" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="33,35 40,22 49,30" fill="#F8BBD0" />
        
        <polygon points="92,40 82,15 66,32" fill="#FFF8FA" stroke="#F7A8C4" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="87,35 80,22 71,30" fill="#F8BBD0" />

        {/* Pink bow decoration */}
        <g transform="translate(74, 24)">
          <polygon points="0,6 12,0 12,12" fill="#FF6FA5" />
          <polygon points="24,6 12,0 12,12" fill="#FF6FA5" />
          <circle cx="12" cy="6" r="3" fill="#FFFDFE" />
        </g>

        {/* Blush cheeks */}
        <circle cx="36" cy="72" r="7" fill="#F8BBD0" opacity="0.6" />
        <circle cx="84" cy="72" r="7" fill="#F8BBD0" opacity="0.6" />

        {/* Eyes */}
        <circle cx="44" cy="60" r="5" fill="#5A3D4D" />
        <circle cx="46" cy="58" r="1.8" fill="#FFFFFF" />
        <circle cx="76" cy="60" r="5" fill="#5A3D4D" />
        <circle cx="78" cy="58" r="1.8" fill="#FFFFFF" />

        {/* Tiny nose & mouth */}
        <polygon points="60,67 57,64 63,64" fill="#FF6FA5" />
        <path d="M56,70 Q60,74 64,70" stroke="#5A3D4D" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="22" y1="62" x2="34" y2="64" stroke="#F7A8C4" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="69" x2="34" y2="69" stroke="#F7A8C4" strokeWidth="2" strokeLinecap="round" />
        <line x1="98" y1="62" x2="86" y2="64" stroke="#F7A8C4" strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="69" x2="86" y2="69" stroke="#F7A8C4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  };

  const bubblePositionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3'
  }[bubbleSide];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {/* Speech bubble */}
      {bubbleText && (
        <div
          className={`absolute ${bubblePositionStyles} z-20 pointer-events-none whitespace-nowrap`}
        >
          <div className="relative px-3.5 py-2 rounded-2xl glass-card border border-[#F8BBD0] shadow-md shadow-[#FF6FA5]/10 animate-float text-xs sm:text-sm font-cute font-medium text-[#5A3D4D]">
            <span>{bubbleText}</span>
            {/* Bubble pointer tail */}
            {bubbleSide === 'top' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#FFFDFE]" />
            )}
            {bubbleSide === 'bottom' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-0.5 border-4 border-transparent border-b-[#FFFDFE]" />
            )}
            {bubbleSide === 'left' && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-0.5 border-4 border-transparent border-l-[#FFFDFE]" />
            )}
            {bubbleSide === 'right' && (
              <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-0.5 border-4 border-transparent border-r-[#FFFDFE]" />
            )}
          </div>
        </div>
      )}

      {/* Cat image or fallback */}
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain filter drop-shadow-md rounded-2xl transition-transform duration-300 hover:scale-105"
            loading="eager"
          />
        ) : (
          renderFallbackSvg()
        )}
      </div>
    </div>
  );
};
