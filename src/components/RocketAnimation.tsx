import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';
import { soundFx } from '../utils/soundEffects';

interface RocketAnimationProps {
  onCollisionComplete: () => void;
}

type Stage = 'intro' | 'flying' | 'targeting' | 'impact' | 'flash' | 'done';

export const RocketAnimation: React.FC<RocketAnimationProps> = ({ onCollisionComplete }) => {
  const [stage, setStage] = useState<Stage>('intro');
  const [rocketPos, setRocketPos] = useState({ x: -20, y: 70, rotation: -25 });
  const [kiitVisible, setKiitVisible] = useState(false);
  const [catImageError, setCatImageError] = useState(false);

  useEffect(() => {
    // 1. Intro announcement (1.2s)
    const t1 = setTimeout(() => {
      setStage('flying');
      soundFx.playWhoosh();
    }, 1400);

    // 2. Rocket takes off and flies towards center (1.4s -> 3.2s)
    const t2 = setTimeout(() => {
      setKiitVisible(true);
      setRocketPos({ x: 30, y: 55, rotation: -18 });
    }, 1800);

    // 3. Rocket spots KIIT and veers towards collision course (3.5s)
    const t3 = setTimeout(() => {
      setStage('targeting');
      setRocketPos({ x: 64, y: 38, rotation: -10 });
    }, 3600);

    // 4. Collision Impact (4.8s)
    const t4 = setTimeout(() => {
      setStage('impact');
      soundFx.playPop();
    }, 4800);

    // 5. White-pink warm flash (5.5s)
    const t5 = setTimeout(() => {
      setStage('flash');
    }, 5500);

    // 6. Transition complete into Scene 3 (6.2s)
    const t6 = setTimeout(() => {
      setStage('done');
      onCollisionComplete();
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onCollisionComplete]);

  // Fast skip if visitor wants to advance immediately
  const handleSkip = () => {
    if (stage === 'done') return;
    setStage('flash');
    setTimeout(() => {
      onCollisionComplete();
    }, 400);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Intro dialogue text */}
      <div
        className={`absolute top-12 z-30 transition-all duration-700 text-center px-4 ${
          stage === 'intro' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card-pink border border-[#FF6FA5]/40 shadow-xl shadow-[#FF6FA5]/20">
          <span className="text-lg sm:text-2xl font-cute font-bold text-[#FF6FA5]">
            Okay, birthday girl... ready for a tiny adventure? 🚀
          </span>
        </div>
      </div>

      {/* Skip button for accessibility */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-40 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white/80 hover:text-white text-xs font-cute backdrop-blur-sm transition-all cursor-pointer"
      >
        Skip animation ⏩
      </button>

      {/* Cartoon Outer Space Scene Container */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px]">
        {/* Floating Stars & Stardust */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-16 text-yellow-200 text-xs animate-ping">✦</div>
          <div className="absolute top-1/4 right-20 text-pink-200 text-sm animate-pulse">✨</div>
          <div className="absolute bottom-16 left-1/3 text-purple-200 text-xs animate-bounce">★</div>
          <div className="absolute top-1/2 left-10 text-white/40 text-sm">✦</div>
          <div className="absolute bottom-24 right-1/4 text-pink-300 text-xs">✨</div>
        </div>

        {/* Planet KIIT */}
        <div
          className={`absolute top-12 right-6 sm:right-16 md:right-24 z-10 transition-all duration-1000 ease-out ${
            kiitVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0 translate-x-20'
          }`}
        >
          <div className="relative flex flex-col items-center">
            {/* KIIT Planet Sphere */}
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#9B51E0] via-[#BB6BD9] to-[#F2C94C] shadow-2xl shadow-[#BB6BD9]/40 border-4 border-white/60 flex items-center justify-center overflow-hidden">
              {/* Planetary rings / craters */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/15 blur-sm" />
              <div className="absolute bottom-4 right-6 w-12 h-12 rounded-full bg-[#7B2CBF]/30" />
              <div className="absolute top-1/3 left-6 w-8 h-8 rounded-full bg-[#7B2CBF]/20" />

              {/* Bold Intentional Planet Label: KIIT */}
              <div className="relative z-10 px-4 py-1.5 rounded-2xl bg-white/90 text-[#4A154B] font-cute font-black text-xl sm:text-2xl tracking-widest shadow-md border-2 border-[#BB6BD9] transform -rotate-6">
                KIIT 🪐
              </div>

              {/* Orbiting Ring */}
              <div className="absolute inset-0 border-6 border-white/30 rounded-full transform rotate-45 scale-125 pointer-events-none" />
            </div>

            {/* Planet Label Subtitle */}
            <span className="mt-2 text-xs font-cute text-pink-200/90 font-semibold tracking-wide drop-shadow">
              Destination: KIIT
            </span>
          </div>
        </div>

        {/* The Cute Rocket & Cat Pilot */}
        {stage !== 'impact' && stage !== 'flash' && stage !== 'done' && (
          <div
            className="absolute z-20 transition-all duration-1000 ease-out"
            style={{
              left: `${rocketPos.x}%`,
              top: `${rocketPos.y}%`,
              transform: `translate(-50%, -50%) rotate(${rocketPos.rotation}deg)`,
              opacity: stage === 'intro' ? 0 : 1
            }}
          >
            <div className="relative flex items-center">
              {/* Rocket Body */}
              <div className="relative w-28 h-16 sm:w-36 sm:h-20">
                {/* Main Fuselage */}
                <div className="absolute inset-0 rounded-r-full rounded-l-3xl bg-gradient-to-r from-white via-[#FFF8FA] to-[#FF6FA5] border-3 border-white shadow-xl shadow-[#FF6FA5]/40 overflow-hidden flex items-center">
                  {/* Rocket nose cone */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FF6FA5] to-[#F7A8C4] rounded-r-full" />

                  {/* Porthole Window with Cat Pilot Inside */}
                  <div className="relative ml-6 sm:ml-8 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#3D1E47] border-2 border-white shadow-inner flex items-center justify-center overflow-hidden">
                    {/* Glass glare */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-white/30 rounded-full blur-[1px]" />
                    
                    {/* Cat Astronaut Pilot */}
                    {!catImageError ? (
                      <img
                        src={birthdayAssets.catAstronaut || birthdayAssets.openingCat}
                        alt="Cat Astronaut"
                        onError={() => setCatImageError(true)}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <div className="text-base sm:text-lg select-none">🐱🚀</div>
                    )}
                  </div>

                  {/* Cute Rocket Eyes & Blush */}
                  <div className="absolute right-10 top-3 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5A3D4D]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5A3D4D]" />
                  </div>
                </div>

                {/* Rocket Fins */}
                <div className="absolute -top-3 left-3 w-8 h-6 bg-[#FF6FA5] rounded-t-lg transform -skew-x-12 border-t-2 border-l-2 border-white" />
                <div className="absolute -bottom-3 left-3 w-8 h-6 bg-[#FF6FA5] rounded-b-lg transform skew-x-12 border-b-2 border-l-2 border-white" />
              </div>

              {/* Sparkle Exhaust Trail Behind Rocket */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center pr-2 pointer-events-none">
                {/* Glowing jet flame */}
                <div className="w-10 h-6 sm:w-14 sm:h-8 rounded-l-full bg-gradient-to-l from-yellow-300 via-[#FF6FA5] to-transparent animate-pulse" />
                {/* Pink sparkle trail particles */}
                <div className="flex gap-2">
                  <span className="text-sm text-pink-300 animate-sparkle">✨</span>
                  <span className="text-xs text-yellow-200 animate-sparkle">🌸</span>
                  <span className="text-sm text-pink-400 animate-sparkle">✨</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cartoon Explosion on Collision */}
        {stage === 'impact' && (
          <div className="absolute top-12 right-6 sm:right-16 md:right-24 z-30 w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center animate-ping-once">
            {/* Expanding cartoon clouds (pastel pink & peach) */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-[#FF6FA5] to-[#FFE1D2] opacity-90 blur-md scale-125 animate-pulse" />
              <div className="absolute w-36 h-36 rounded-full bg-[#FFFDFE] opacity-95 shadow-2xl" />

              {/* Harmless Cute Cartoon Debris & Stars */}
              <div className="absolute -top-6 -left-6 text-3xl animate-bounce">🌸</div>
              <div className="absolute -bottom-6 -right-6 text-3xl animate-bounce">💖</div>
              <div className="absolute -top-6 right-6 text-2xl animate-spin">⭐</div>
              <div className="absolute bottom-4 -left-8 text-2xl animate-spin">✨</div>

              {/* Cartoon Comic Impact Text */}
              <div className="relative z-20 px-4 py-2 rounded-2xl bg-white text-[#FF6FA5] font-cute font-black text-2xl sm:text-3xl shadow-xl transform rotate-6 border-3 border-[#FF6FA5]">
                BOOM!! 💗
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen White-Pink Transition Flash */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ease-in-out bg-gradient-to-b from-[#FFFDFE] via-[#FCE4EC] to-[#FFFDFE] ${
          stage === 'flash' || stage === 'done' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
