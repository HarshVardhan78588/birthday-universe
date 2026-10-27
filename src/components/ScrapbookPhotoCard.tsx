import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, X, ZoomIn } from 'lucide-react';

interface ScrapbookPhotoCardProps {
  url?: string;
  fallbackUrl?: string;
  title: string;
  caption?: string;
  rotation?: string;
  tapeColor?: string;
  className?: string;
}

export const ScrapbookPhotoCard: React.FC<ScrapbookPhotoCardProps> = ({
  url,
  fallbackUrl,
  title,
  caption,
  rotation = 'rotate-0',
  tapeColor = 'bg-[#FFE1D2]/80',
  className = ''
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(url);
  const [hasError, setHasError] = useState(!url);
  const [isEnlarged, setIsEnlarged] = useState(false);

  useEffect(() => {
    setCurrentSrc(url);
    setHasError(!url);
  }, [url]);

  const handleError = () => {
    if (fallbackUrl && currentSrc !== fallbackUrl) {
      setCurrentSrc(fallbackUrl);
    } else {
      setHasError(true);
    }
  };

  return (
    <>
      <div
        onClick={() => !hasError && setIsEnlarged(true)}
        className={`group relative p-2.5 sm:p-3 rounded-2xl bg-white/95 border-2 border-[#F8BBD0] shadow-md shadow-[#FF6FA5]/15 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-xl hover:border-[#FF6FA5] transform ${rotation} ${className} ${
          !hasError ? 'cursor-pointer' : ''
        }`}
      >
        {/* Decorative Washi Tape on top */}
        <div
          className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 rounded-xs ${tapeColor} border border-white/60 shadow-xs transform -rotate-1 z-10`}
        />

        {/* Photo Frame Container */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-tr from-[#FFF0F5] to-[#FCE4EC] flex items-center justify-center border border-[#F8BBD0]/40">
          {!hasError && currentSrc ? (
            <>
              <img
                src={currentSrc}
                alt={title}
                onError={handleError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#FF6FA5]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-1.5 rounded-full bg-white/90 text-[#FF6FA5] shadow-xs">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
            </>
          ) : (
            /* Polished, aesthetic placeholder with camera icon */
            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-[#5A3D4D]/70 bg-gradient-to-b from-[#FFFDFE] to-[#FFF0F5]">
              <div className="w-8 h-8 rounded-full bg-white border border-[#FF6FA5]/40 flex items-center justify-center mb-1 shadow-xs group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4 text-[#FF6FA5]" />
              </div>
              <p className="text-[10px] font-cute font-bold text-[#FF6FA5] line-clamp-1">
                {title}
              </p>
              <span className="text-[9px] font-cute text-[#5A3D4D]/50">
                Sweet Memory 📸
              </span>
            </div>
          )}
        </div>

        {/* Card Caption / Label */}
        <div className="mt-1.5 px-1 flex items-center justify-between">
          <p className="text-[11px] sm:text-xs font-cute font-bold text-[#5A3D4D] truncate flex-1">
            {title}
          </p>
          <Sparkles className="w-3 h-3 text-[#FF6FA5] flex-shrink-0 ml-1 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
        </div>

        {caption && (
          <p className="text-[9px] font-cute text-[#5A3D4D]/60 px-1 truncate">
            {caption}
          </p>
        )}
      </div>

      {/* Enlarged Photo Modal */}
      {isEnlarged && currentSrc && (
        <div
          onClick={() => setIsEnlarged(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-3xl bg-white p-3.5 sm:p-5 shadow-2xl border-4 border-[#F8BBD0]"
          >
            <button
              onClick={() => setIsEnlarged(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FF6FA5] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FCE4EC] flex items-center justify-center">
              <img
                src={currentSrc}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-3 text-center">
              <h4 className="font-cute font-bold text-sm sm:text-base text-[#FF6FA5]">
                {title}
              </h4>
              {caption && (
                <p className="font-cute text-xs text-[#5A3D4D]/80 mt-0.5">
                  {caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
