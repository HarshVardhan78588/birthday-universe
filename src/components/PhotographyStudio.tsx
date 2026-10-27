import React from 'react';
import { StudioMonster } from './StudioMonster';

interface PhotographyStudioProps {
  onIceCreamSelected: () => void;
}

export const PhotographyStudio: React.FC<PhotographyStudioProps> = ({ onIceCreamSelected }) => {
  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-center overflow-hidden rounded-3xl select-none">
      {/* Seamless Studio Photography Backdrop Container */}
      <div className="absolute inset-0 bg-[#F4F1F4] flex flex-col pointer-events-none">
        {/* Curved White Paper Backdrop Roll */}
        <div className="relative flex-1 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8FA] to-[#EAE4EA] shadow-inner flex flex-col items-center">
          {/* Ceiling Studio Track Lights */}
          <div className="w-full flex justify-around px-8 pt-2 opacity-85">
            <div className="flex gap-4 sm:gap-8">
              <div className="w-8 h-2.5 bg-[#3D3A40] rounded-sm shadow-md" />
              <div className="w-8 h-2.5 bg-[#3D3A40] rounded-sm shadow-md" />
              <div className="w-8 h-2.5 bg-[#3D3A40] rounded-sm shadow-md" />
            </div>
            <div className="flex gap-4 sm:gap-8">
              <div className="w-8 h-2.5 bg-[#3D3A40] rounded-sm shadow-md" />
              <div className="w-8 h-2.5 bg-[#3D3A40] rounded-sm shadow-md" />
            </div>
          </div>

          {/* Light beams projecting from softboxes onto center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(244,241,244,0.4)_70%)] pointer-events-none" />
        </div>

        {/* Studio Floor with Perspective and Soft Shadows */}
        <div className="h-44 sm:h-56 bg-gradient-to-b from-[#EAE4EA] via-[#DDD5DC] to-[#D0C5CF] border-t border-white/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),transparent)]" />
        </div>
      </div>

      {/* Studio Softbox Light Stand - Left Side */}
      <div className="absolute left-2 sm:left-6 md:left-12 top-10 sm:top-16 z-20 pointer-events-none flex flex-col items-center scale-75 sm:scale-90 md:scale-100 origin-top-left">
        <div className="w-20 sm:w-24 h-28 sm:h-32 rounded-lg bg-[#2A272E] p-1.5 shadow-2xl border border-white/20 transform rotate-12 flex items-center justify-center">
          <div className="w-full h-full rounded bg-gradient-to-br from-white to-[#FFF5F8] shadow-[0_0_30px_rgba(255,255,255,0.95)]" />
        </div>
        <div className="w-2 h-48 sm:h-64 bg-[#2A272E] shadow-sm -mt-2" />
        <div className="w-16 h-4 border-b-3 border-[#2A272E] rounded-full -mt-2" />
      </div>

      {/* Studio Softbox Light Stand - Right Side */}
      <div className="absolute right-2 sm:right-6 md:right-12 top-10 sm:top-16 z-20 pointer-events-none flex flex-col items-center scale-75 sm:scale-90 md:scale-100 origin-top-right">
        <div className="w-20 sm:w-24 h-28 sm:h-32 rounded-lg bg-[#2A272E] p-1.5 shadow-2xl border border-white/20 transform -rotate-12 flex items-center justify-center">
          <div className="w-full h-full rounded bg-gradient-to-bl from-white to-[#FFF5F8] shadow-[0_0_30px_rgba(255,255,255,0.95)]" />
        </div>
        <div className="w-2 h-48 sm:h-64 bg-[#2A272E] shadow-sm -mt-2" />
        <div className="w-16 h-4 border-b-3 border-[#2A272E] rounded-full -mt-2" />
      </div>

      {/* Studio Badge */}
      <div className="relative z-20 text-center mb-4 px-4">
        <span className="inline-block px-3.5 py-1 rounded-full bg-white/90 text-[#5A3D4D] text-xs font-cute font-bold tracking-wider uppercase border border-[#E8DDF8] shadow-sm">
          Photography Studio Set 📸
        </span>
      </div>

      {/* Central Running Monster & Ice cream presentation */}
      <div className="relative z-20 w-full flex items-center justify-center">
        <StudioMonster onIceCreamSelected={onIceCreamSelected} />
      </div>
    </div>
  );
};
