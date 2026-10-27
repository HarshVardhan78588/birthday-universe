import React, { useState } from 'react';
import { Camera, ZoomIn, X, Sparkles, Heart } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';

interface MemoryPhotoProps {
  onZoomToggle?: (isZoomed: boolean) => void;
}

export const MemoryPhoto: React.FC<MemoryPhotoProps> = ({ onZoomToggle }) => {
  const [hasError, setHasError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const toggleLightbox = () => {
    const nextState = !isLightboxOpen;
    setIsLightboxOpen(nextState);
    if (onZoomToggle) onZoomToggle(nextState);
  };

  return (
    <>
      {/* Framed Polaroid / Photo Card */}
      <div
        onClick={toggleLightbox}
        className="group relative w-full max-w-sm sm:max-w-md mx-auto cursor-pointer animate-float"
      >
        <div className="relative p-3.5 sm:p-4 rounded-3xl bg-white border-2 border-[#F8BBD0] shadow-xl shadow-[#FF6FA5]/15 transition-all duration-300 group-hover:scale-102 group-hover:shadow-2xl group-hover:border-[#FF6FA5]">
          {/* Subtle tape / pin detail on top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm bg-[#FFE1D2]/80 border border-white/60 shadow-xs transform rotate-2 z-20" />

          {/* Photo Display Area */}
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#FFF0F5] to-[#FCE4EC] flex items-center justify-center border border-[#F8BBD0]/40">
            {!hasError ? (
              <img
                src={birthdayAssets.heartPhoto}
                alt="Heart Hands Photo"
                onError={() => setHasError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              /* Tasteful Elegant Placeholder Frame */
              <div className="flex flex-col items-center justify-center p-6 text-center text-[#5A3D4D]/80">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF6FA5]/20 to-[#F8BBD0]/30 flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
                  <Camera className="w-10 h-10 text-[#FF6FA5]" />
                  <Heart className="absolute -bottom-1 -right-1 w-6 h-6 text-[#FF6FA5] fill-[#FF6FA5] animate-pulse" />
                </div>
                <h4 className="font-cute font-bold text-base sm:text-lg text-[#5A3D4D]">
                  Madam's Heart-Hand Photo 💗
                </h4>
                <p className="text-xs text-[#5A3D4D]/70 font-medium max-w-xs mt-1.5 leading-relaxed">
                  Placeholder active. Place your photo at:
                </p>
                <code className="text-[11px] font-mono text-[#FF6FA5] bg-white/80 px-2.5 py-1 rounded-md border border-[#F8BBD0] mt-1 shadow-xs">
                  public/assets/photos/heart-photo.jpg
                </code>
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-[#FF6FA5]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#FF6FA5] font-cute text-xs font-semibold shadow-md">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Tap to enlarge</span>
              </span>
            </div>
          </div>

          {/* Polaroid Caption Footer */}
          <div className="mt-3 px-2 flex items-center justify-between text-[#5A3D4D]">
            <div className="flex items-center gap-1.5 font-handwriting text-lg sm:text-xl font-bold text-[#FF6FA5]">
              <Sparkles className="w-4 h-4 text-[#FF6FA5]" />
              <span>Heart hands from the birthday girl</span>
            </div>
            <span className="text-xs font-cute text-[#5A3D4D]/60 bg-[#FCE4EC] px-2 py-0.5 rounded-full">
              Madam 🌸
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={toggleLightbox}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-3xl bg-white p-4 shadow-2xl border-4 border-[#F8BBD0]"
          >
            <button
              onClick={toggleLightbox}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#FF6FA5] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#FCE4EC] flex items-center justify-center">
              {!hasError ? (
                <img
                  src={birthdayAssets.heartPhoto}
                  alt="Heart Hands Photo Full"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <Camera className="w-16 h-16 text-[#FF6FA5] mx-auto mb-3" />
                  <p className="font-cute font-bold text-lg text-[#5A3D4D]">
                    Madam's Heart Hand Memory
                  </p>
                  <p className="text-xs text-[#5A3D4D]/70 mt-1">
                    Replaceable in public/assets/photos/heart-photo.jpg
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 text-center">
              <p className="font-cute font-medium text-sm text-[#5A3D4D]">
                "The cutest heart pose in the entire world." 💗✨
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
