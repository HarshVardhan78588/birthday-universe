import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface InteractiveCameraProps {
  onCaptureComplete: () => void;
}

export const InteractiveCamera: React.FC<InteractiveCameraProps> = ({ onCaptureComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const handleOpenLens = () => {
    soundFx.playPop();
    setIsOpen(true);
  };

  const handleShutter = () => {
    if (isFlashing || isFrozen) return;
    soundFx.playShutter();
    setIsFlashing(true);
    setIsFrozen(true);

    // Screen flash and freeze pose
    setTimeout(() => {
      setIsFlashing(false);
    }, 400);

    // Fade out and transition to studio scene
    setTimeout(() => {
      onCaptureComplete();
    }, 1100);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Cat speech bubble prompt */}
      <div className="relative mb-3 px-4 py-2 rounded-2xl bg-white border-2 border-[#FF6FA5] shadow-lg shadow-[#FF6FA5]/20 animate-bounce text-center">
        <span className="text-sm sm:text-base font-cute font-bold text-[#FF6FA5]">
          Bas bas, ab chup chaap meri photo kheencho! 😾📸
        </span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#FF6FA5]" />
      </div>

      {/* Prominent Cute Interactive Camera Object */}
      <button
        onClick={handleOpenLens}
        className="group relative flex flex-col items-center p-4 rounded-3xl bg-white border-3 border-[#FF6FA5] shadow-xl shadow-[#FF6FA5]/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Open Camera"
      >
        <div className="relative w-32 h-24 sm:w-40 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#FF6FA5] via-[#F7A8C4] to-[#FCE4EC] border-2 border-white flex items-center justify-center shadow-inner">
          {/* Top Camera Flash Bar */}
          <div className="absolute -top-3 left-4 w-10 h-3 rounded-t-md bg-white border-t border-x border-[#FF6FA5]" />
          <div className="absolute -top-2 right-4 w-6 h-2 rounded-full bg-red-400 border border-white animate-pulse" />

          {/* Central Camera Lens */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#3D2638] border-3 border-white shadow-md flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="w-8 h-8 rounded-full bg-[#1F121C] border border-white/40 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white/90" />
            </div>
            {/* Lens Reflection Glare */}
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/40 blur-[0.5px]" />
          </div>
        </div>

        <span className="mt-2 text-xs font-cute font-bold text-[#FF6FA5] group-hover:text-[#E05688] flex items-center gap-1">
          <span>Tap to Take Cat's Photo</span>
          <Sparkles className="w-3 h-3" />
        </span>
      </button>

      {/* FULL-SCREEN CAMERA VIEWFINDER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in">
          {/* Top Viewfinder Status */}
          <div className="text-center mb-4">
            <span className="px-3.5 py-1 rounded-full bg-red-500/80 text-white text-xs font-cute font-bold tracking-widest uppercase animate-pulse">
              ● REC • 4K HD
            </span>
          </div>

          {/* Large Circular Camera Lens Frame */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-white/90 shadow-[0_0_50px_rgba(255,111,165,0.5)] bg-gradient-to-tr from-[#FFF0F5] to-[#FCE4EC] flex flex-col items-center justify-center overflow-hidden">
            {/* Focus Crosshairs Brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#FF6FA5]" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#FF6FA5]" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#FF6FA5]" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#FF6FA5]" />

            {/* Happy Cat Posing Inside the Lens */}
            <div className={`relative flex flex-col items-center transition-transform duration-300 ${isFrozen ? 'scale-100' : 'animate-float'}`}>
              {/* Cat "CHEESE! 🎀" Speech Bubble */}
              <div className="mb-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#FF6FA5] shadow-md text-xs sm:text-sm font-cute font-extrabold text-[#FF6FA5] animate-bounce">
                CHEESE! 🎀
              </div>

              {/* Cat Image Posing */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                <img
                  src="/assets/cats/cool-cat.jpg"
                  alt="Cat Posing"
                  className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
                />
              </div>
            </div>

            {/* Lens Reflection Ring */}
            <div className="absolute inset-0 rounded-full border-12 border-black/10 pointer-events-none" />
          </div>

          {/* Shutter Button Below Lens */}
          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={handleShutter}
              disabled={isFrozen}
              className="group relative flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-500 via-[#FF6FA5] to-red-500 text-white font-cute font-extrabold text-base sm:text-lg shadow-xl shadow-red-500/40 hover:scale-108 active:scale-95 transition-all cursor-pointer border-2 border-white"
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>SNAP PHOTO 📸</span>
            </button>
            <span className="text-xs text-white/70 font-cute mt-1.5">
              Click to capture and enter the studio!
            </span>
          </div>

          {/* Camera Shutter Flash Effect */}
          {isFlashing && (
            <div className="fixed inset-0 z-50 bg-white pointer-events-none animate-ping-once opacity-95 transition-opacity" />
          )}
        </div>
      )}
    </div>
  );
};
