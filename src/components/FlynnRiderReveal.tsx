import React, { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';
import { soundFx } from '../utils/soundEffects';

export const FlynnRiderReveal: React.FC = () => {
  useEffect(() => {
    soundFx.playPoliceSiren();
    // No automatic timer - scene stays visible until visitor double-clicks
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none py-3 animate-fade-in">
      {/* Cartoon Police Pink & Lavender Siren Aura */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#FF6FA5]/25 to-[#B388FF]/25 blur-3xl animate-pulse"
          style={{ animationDuration: '0.8s' }}
        />
      </div>

      {/* Police Cat & Official Wanted Paper */}
      <div className="w-full flex flex-col items-center mb-4">
        {/* Siren Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F5] border-2 border-[#FF6FA5] shadow-lg shadow-[#FF6FA5]/25 text-xs sm:text-sm font-cute font-extrabold text-[#FF6FA5] mb-2.5 animate-bounce">
          <ShieldAlert className="w-4 h-4 text-[#FF6FA5]" />
          <span>🚨 OFFICIAL BIRTHDAY ARREST WARRANT 🚨</span>
        </div>

        {/* Fictional Wanted Card */}
        <div className="relative max-w-sm w-full bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#FF6FA5] shadow-xl text-center">
          <div className="border border-dashed border-[#F8BBD0] rounded-xl p-2.5 bg-gradient-to-b from-[#FFF0F5] to-white">
            <h3 className="font-cute font-black text-lg sm:text-xl text-[#FF6FA5] tracking-wide">
              WANTED: BIRTHDAY CRIMINAL 🚨
            </h3>
            <p className="font-cute font-bold text-xs text-[#5A3D4D] mt-1">
              CRIME: Missing the birthday celebration.
            </p>
            <p className="font-cute font-bold text-xs text-[#FF6FA5] mt-0.5">
              SENTENCE: One very big apology and a birthday treat. 🎀
            </p>
          </div>
        </div>
      </div>

      {/* FLYNN RIDER IMAGE WITH COMEDIC ENTRANCE - ABSOLUTELY NO EXTRA TEXT OR SPEECH BUBBLES */}
      <div className="relative flex items-center justify-center animate-bounce">
        <div className="relative w-56 h-56 sm:w-68 sm:h-68 rounded-3xl overflow-hidden bg-white/95 border-3 border-[#FF6FA5] shadow-2xl shadow-[#FF6FA5]/30 transform -rotate-2 hover:rotate-0 transition-transform duration-300 p-2 flex items-center justify-center">
          <img
            src={birthdayAssets.flynnRider}
            alt="Flynn Rider"
            className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
