import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';
import { soundFx } from '../utils/soundEffects';

interface StudioMonsterProps {
  onIceCreamSelected: () => void;
}

type MonsterState = 'running_across' | 'running_back' | 'stopping' | 'presenting_hand' | 'revealed_icecream';

export const StudioMonster: React.FC<StudioMonsterProps> = ({ onIceCreamSelected }) => {
  const [monsterState, setMonsterState] = useState<MonsterState>('running_across');
  const [isClicked, setIsClicked] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 1. Monster runs across from left to right (0 -> 1.5s)
    const t1 = setTimeout(() => {
      setMonsterState('running_back');
    }, 1500);

    // 2. Runs back towards the center (1.5s -> 3.0s)
    const t2 = setTimeout(() => {
      setMonsterState('stopping');
      soundFx.playPop();
    }, 3000);

    // 3. Stops, notices visitor, approaches foreground, extends hand (3.0s -> 4.2s)
    const t3 = setTimeout(() => {
      setMonsterState('presenting_hand');
      soundFx.playSparkle();
    }, 4200);

    // 4. Ice cream visibly emerges from monster's extended hand! (5.2s)
    const t4 = setTimeout(() => {
      setMonsterState('revealed_icecream');
      soundFx.playSparkle();
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleIceCreamClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    soundFx.playSparkle();
    soundFx.playGiftOpen();
    setTimeout(() => {
      onIceCreamSelected();
    }, 800);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-4">
      {/* Monster Speech Bubble */}
      <div
        className={`transition-all duration-500 mb-4 z-30 ${
          monsterState === 'presenting_hand' || monsterState === 'revealed_icecream'
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-5 py-2.5 rounded-2xl bg-white border-2 border-[#FF6FA5] shadow-xl shadow-[#FF6FA5]/25 text-center animate-bounce">
          <p className="text-sm sm:text-base font-cute font-extrabold text-[#FF6FA5]">
            THIS IS FOR YOU! 🍦💗
          </p>
          <p className="text-xs font-cute font-bold text-[#5A3D4D]/80 mt-0.5">
            Go on... take it! ✨
          </p>
        </div>
      </div>

      {/* Monster Movement Stage */}
      <div
        className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
          monsterState === 'running_across'
            ? 'translate-x-32 sm:translate-x-60 scale-75'
            : monsterState === 'running_back'
            ? '-translate-x-12 scale-85'
            : monsterState === 'stopping'
            ? 'translate-x-0 scale-95'
            : 'translate-x-0 scale-105 sm:scale-115'
        }`}
      >
        {/* Monster Body Container */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
          {!hasError && birthdayAssets.studioMonster ? (
            <img
              src={birthdayAssets.studioMonster}
              alt="Cute Studio Monster"
              onError={() => setHasError(true)}
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          ) : (
            /* Fluffy Pastel Lavender & Pink Studio Monster Vector Illustration */
            <svg viewBox="0 0 180 180" className="w-full h-full drop-shadow-2xl">
              <ellipse cx="90" cy="165" rx="65" ry="12" fill="#5A3D4D" opacity="0.12" />
              {/* Horns */}
              <polygon points="50,45 32,12 70,35" fill="#FFB6C1" stroke="#FFF" strokeWidth="2.5" />
              <polygon points="130,45 148,12 110,35" fill="#FFB6C1" stroke="#FFF" strokeWidth="2.5" />
              {/* Fluffy Body */}
              <ellipse cx="90" cy="98" rx="68" ry="60" fill="#E8DDF8" stroke="#FFF" strokeWidth="3" />
              <circle cx="30" cy="98" r="18" fill="#E8DDF8" />
              <circle cx="150" cy="98" r="18" fill="#E8DDF8" />
              <circle cx="48" cy="138" r="16" fill="#E8DDF8" />
              <circle cx="132" cy="138" r="16" fill="#E8DDF8" />
              {/* Cream Belly */}
              <ellipse cx="90" cy="110" rx="40" ry="36" fill="#FFF8FA" />
              {/* Eyes */}
              <circle cx="68" cy="80" r="15" fill="#FFFDFE" stroke="#5A3D4D" strokeWidth="2" />
              <circle cx="112" cy="80" r="15" fill="#FFFDFE" stroke="#5A3D4D" strokeWidth="2" />
              <circle cx="70" cy="80" r="8" fill="#5A3D4D" />
              <circle cx="67" cy="77" r="3" fill="#FFFDFE" />
              <circle cx="110" cy="80" r="8" fill="#5A3D4D" />
              <circle cx="107" cy="77" r="3" fill="#FFFDFE" />
              {/* Cheeks */}
              <circle cx="46" cy="102" r="9" fill="#F8BBD0" opacity="0.8" />
              <circle cx="134" cy="102" r="9" fill="#F8BBD0" opacity="0.8" />
              {/* Smile */}
              <path d="M78,105 Q90,118 102,105" stroke="#5A3D4D" strokeWidth="3" fill="none" strokeLinecap="round" />
              <polygon points="85,106 90,113 95,106" fill="#FFFDFE" />
            </svg>
          )}

          {/* MONSTER'S HAND EXTENDING TOWARDS VIEWER */}
          <div
            className={`absolute bottom-6 right-2 sm:right-4 z-20 transition-all duration-700 ease-out flex items-center justify-center ${
              monsterState === 'presenting_hand' || monsterState === 'revealed_icecream'
                ? 'scale-110 translate-x-2'
                : 'opacity-0 scale-75'
            }`}
          >
            {/* The Cute Hand / Paw */}
            <div className="relative w-14 h-12 rounded-full bg-[#FFB6C1] border-2 border-white shadow-md flex items-center justify-center" />

            {/* THE ICE CREAM VISIBLY EMERGING FROM MONSTER'S HAND */}
            <div
              className={`absolute -top-24 sm:-top-28 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 ease-out flex flex-col items-center ${
                monsterState === 'revealed_icecream'
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-25 translate-y-8 pointer-events-none'
              }`}
            >
              {/* Clickable Ice Cream Button */}
              <button
                onClick={handleIceCreamClick}
                disabled={isClicked}
                className={`group relative p-2 transition-all duration-500 cursor-pointer ${
                  isClicked
                    ? 'scale-135 filter drop-shadow-[0_0_35px_rgba(255,111,165,0.9)]'
                    : 'animate-pulse-glow hover:scale-115'
                }`}
                aria-label="Take Birthday Ice Cream"
              >
                {/* Glowing halo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6FA5]/40 via-[#F7A8C4]/50 to-white/40 blur-xl rounded-full scale-125 pointer-events-none" />

                {/* Sparkling particles */}
                <div className="absolute -top-3 -right-2 text-yellow-300 text-lg animate-sparkle pointer-events-none">
                  ✨
                </div>

                {/* Ice Cream Object */}
                <div className="relative z-10 w-24 h-36 sm:w-28 sm:h-40 flex items-center justify-center">
                  <img
                    src={birthdayAssets.iceCream}
                    alt="Birthday Magic Ice Cream"
                    className="w-full h-full object-contain filter drop-shadow-xl"
                  />
                </div>
              </button>

              <span className="text-[11px] font-cute font-extrabold text-[#FF6FA5] bg-white/95 px-3 py-1 rounded-full border border-[#FF6FA5]/40 shadow-sm whitespace-nowrap -mt-2 animate-pulse">
                Tap to take ice cream! 🍨
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
