import React, { useMemo } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'pink' | 'space' | 'studio' | 'dreamy';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'pink' }) => {
  // Generate random ambient floating elements with fixed seed
  const floatingElements = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 17 + 7) % 95,
      y: (i * 23 + 11) % 90,
      size: 14 + (i % 4) * 8,
      duration: 10 + (i % 6) * 3,
      delay: (i * 0.7) % 5,
      opacity: 0.18 + (i % 3) * 0.12,
      type: i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'sparkle' : i % 4 === 2 ? 'star' : 'petal'
    }));
  }, []);

  if (variant === 'studio') {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#FAF8F9] via-[#F4F1F3] to-[#ECE7EB] overflow-hidden" />
    );
  }

  if (variant === 'space') {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#2A1832] via-[#482852] to-[#71396E] overflow-hidden">
        {/* Soft pink cosmic nebula glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FF6FA5]/20 to-[#E8DDF8]/20 blur-3xl" />
        
        {/* Tiny stars */}
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: `${(el.size % 4) + 2}px`,
              height: `${(el.size % 4) + 2}px`,
              opacity: el.opacity * 2.5,
              animationDuration: `${el.duration * 0.3}s`,
              animationDelay: `${el.delay}s`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-gradient-to-br from-[#FFFDFE] via-[#FCE4EC] to-[#F8BBD0]/60">
      {/* Soft ambient gradient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F7A8C4]/25 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#E8DDF8]/35 blur-3xl animate-float-delayed" />
      <div className="absolute -bottom-28 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFE1D2]/30 blur-3xl animate-float" />

      {/* Floating hearts and sparkles */}
      {floatingElements.map((item) => (
        <div
          key={item.id}
          className="absolute transition-transform duration-1000 ease-out"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
            animation: `floatGentle ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`
          }}
        >
          {item.type === 'heart' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="#FF6FA5"
              className="drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {item.type === 'sparkle' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="#F7A8C4"
              className="animate-sparkle"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}

          {item.type === 'star' && (
            <svg
              width={item.size * 0.8}
              height={item.size * 0.8}
              viewBox="0 0 24 24"
              fill="#E8DDF8"
            >
              <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
            </svg>
          )}

          {item.type === 'petal' && (
            <div
              className="rounded-full bg-gradient-to-tr from-[#FF6FA5]/40 to-[#FFE1D2]/60 transform rotate-45"
              style={{
                width: `${item.size * 0.7}px`,
                height: `${item.size * 1.1}px`,
                borderRadius: '50% 0 50% 50%'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
