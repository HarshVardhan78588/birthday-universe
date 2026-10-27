import React from 'react';

interface BalloonTypographyProps {
  className?: string;
}

export const BalloonTypography: React.FC<BalloonTypographyProps> = ({ className = '' }) => {
  const row1 = ['H', 'A', 'P', 'P', 'Y'];
  const row2 = ['B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y', 'Y', 'Y', 'Y', '!', '!'];

  // Slight tilt angles for organic inflated balloon look
  const getTilt = (index: number, isSecondRow: boolean) => {
    const angles1 = [-3, 2, -1.5, 3, -2];
    const angles2 = [2, -2.5, 3, -1.5, 2, -3, 1.5, -2, 2.5, -1.5, 3, -2, 2];
    return isSecondRow ? angles2[index % angles2.length] : angles1[index % angles1.length];
  };

  const renderLetter = (char: string, index: number, isSecondRow: boolean, globalIndex: number) => {
    const tilt = getTilt(index, isSecondRow);
    const floatDelay = (globalIndex * 0.12) % 1.5;
    const animDelay = `${globalIndex * 0.05}s`;

    return (
      <span
        key={`${char}-${globalIndex}`}
        className="relative inline-block select-none group"
        style={{
          transform: `rotate(${tilt}deg)`,
          animationDelay: `${floatDelay}s`
        }}
      >
        {/* Floating container */}
        <span
          className="inline-block transition-transform duration-300 hover:scale-115 hover:-translate-y-2 cursor-default"
          style={{
            animation: `float-balloon 3.2s ease-in-out infinite alternate`,
            animationDelay: `${floatDelay}s`
          }}
        >
          {/* Main 3D Foil Balloon Letter */}
          <span
            className="relative inline-flex items-center justify-center font-cute font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none px-0.5 sm:px-1"
            style={{
              fontFamily: "'Fredoka', 'Quicksand', sans-serif",
              // Rich cotton-candy to rose-pink metallic foil gradient
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF0F5 15%, #FFA5C8 38%, #FF6FA5 62%, #E0407B 85%, #B71C56 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 6px rgba(194, 24, 91, 0.45)) drop-shadow(0 10px 16px rgba(255, 111, 165, 0.35))',
              // Subtle 3D foil edge extrusion
              textShadow: `
                0 1px 0 #FFA5C8,
                0 2px 0 #FF6FA5,
                0 3px 0 #E0407B,
                0 4px 0 #B71C56
              `
            }}
          >
            {char}

            {/* Specular gloss highlight arc (foil reflection) */}
            <span
              className="absolute inset-0 pointer-events-none flex items-start justify-center overflow-hidden opacity-85"
              aria-hidden="true"
            >
              <span
                className="w-full text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cute font-black leading-none"
                style={{
                  fontFamily: "'Fredoka', 'Quicksand', sans-serif",
                  background: 'radial-gradient(ellipse at 40% 15%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transform: 'translate(-1px, -2px) scale(0.96)'
                }}
              >
                {char}
              </span>
            </span>

            {/* Balloon knot valve at base */}
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 sm:w-2 sm:h-1.5 rounded-b-full bg-gradient-to-b from-[#E0407B] to-[#9C1344] opacity-75 shadow-xs"
              aria-hidden="true"
            />
          </span>
        </span>
      </span>
    );
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center text-center py-2 px-2 select-none ${className}`}
      role="heading"
      aria-level={1}
      aria-label="HAPPY BIRTHDAYYYYY!! 🎀"
    >
      {/* Background Soft Foil Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-lg h-24 bg-gradient-to-r from-[#FF6FA5]/20 via-[#FFA5C8]/30 to-[#FF6FA5]/20 blur-2xl rounded-full animate-pulse" />
      </div>

      {/* Row 1: HAPPY */}
      <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 mb-1 sm:mb-2 flex-wrap">
        {row1.map((char, idx) => renderLetter(char, idx, false, idx))}
      </div>

      {/* Row 2: BIRTHDAYYYYY!! + 🎀 */}
      <div className="flex items-center justify-center gap-0.5 sm:gap-1 flex-wrap">
        {row2.map((char, idx) => renderLetter(char, idx, true, row1.length + idx))}

        {/* 3D Balloon Ribbon Bow at the end */}
        <span
          className="inline-block transform rotate-6 hover:scale-120 transition-transform duration-300 ml-1 sm:ml-2 text-2xl sm:text-4xl md:text-5xl drop-shadow-md cursor-default"
          style={{
            animation: 'float-balloon 3s ease-in-out infinite alternate',
            animationDelay: '1.2s'
          }}
          aria-label="Pink Ribbon Bow"
        >
          🎀
        </span>
      </div>
    </div>
  );
};
