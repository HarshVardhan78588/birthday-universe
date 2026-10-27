import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MemoryPhoto } from '../components/MemoryPhoto';
import { AngryCat } from '../components/AngryCat';
import { ThrowingAnimation } from '../components/ThrowingAnimation';
import { InteractiveCamera } from '../components/InteractiveCamera';
import { soundFx } from '../utils/soundEffects';

interface MemorySceneProps {
  onNextSurprise: () => void;
}

export const MemoryScene: React.FC<MemorySceneProps> = ({ onNextSurprise }) => {
  const [revealedStep, setRevealedStep] = useState(1);

  useEffect(() => {
    // Comfortably timed line-by-line sequence
    const t1 = setTimeout(() => setRevealedStep(2), 1600);
    const t2 = setTimeout(() => setRevealedStep(3), 3400);
    const t3 = setTimeout(() => {
      setRevealedStep(4);
      soundFx.playPop();
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleShowAll = () => {
    setRevealedStep(4);
  };

  return (
    <div className="relative w-full min-h-[92vh] max-w-5xl mx-auto px-4 py-6 flex flex-col items-center select-none">
      {/* Animated Heading */}
      <div className="text-center mb-6 animate-fade-in max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#F8BBD0] shadow-sm mb-2 text-xs sm:text-sm font-cute font-bold text-[#FF6FA5]">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>CHAPTER THREE: THE EVIDENCE 📸</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cute font-extrabold tracking-tight bg-gradient-to-r from-[#FF6FA5] via-[#E05688] to-[#FF6FA5] bg-clip-text text-transparent">
          Mission accomplished... now, a little memory. 💗
        </h2>
      </div>

      {/* Main Content Layout: Photo on one side, Teasing Story on the other */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
        {/* Left Column: Heart Photo */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <MemoryPhoto />
        </div>

        {/* Right Column: Teasing Message & Gags */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Card containing the dialogue with ample spacing to avoid overlaps */}
          <div className="rounded-3xl bg-white/95 p-5 sm:p-7 border-2 border-[#F8BBD0] shadow-xl shadow-[#FF6FA5]/15 backdrop-blur-md relative overflow-hidden">
            {/* Paragraph 1 */}
            <div
              className={`transition-all duration-700 ease-out mb-4 ${
                revealedStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <p className="text-lg sm:text-xl font-cute font-bold text-[#FF6FA5] leading-snug">
                Do you remember this day, madam? 😭💗
              </p>
            </div>

            {/* Paragraph 2 & Angry Cat */}
            <div
              className={`transition-all duration-700 ease-out flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 ${
                revealedStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium text-[#5A3D4D] leading-relaxed">
                  You were supposed to take <span className="font-bold text-[#FF6FA5]">MY</span> picture that day, but somehow you managed to get your own perfect pictures instead. And the funniest part? You keep asking <span className="font-bold text-[#FF6FA5]">ME</span> for my pictures, not the other way around! 😭😭
                </p>
              </div>
              <div className="flex-shrink-0">
                <AngryCat />
              </div>
            </div>

            {/* Paragraph 3 */}
            <div
              className={`transition-all duration-700 ease-out mb-4 ${
                revealedStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <div className="p-3 rounded-2xl bg-[#FFF0F5] border border-[#F8BBD0]/60 text-center">
                <p className="text-sm sm:text-base font-cute font-extrabold text-[#5A3D4D] tracking-wide">
                  The audacity. The talent. The priorities. 💀🎀
                </p>
              </div>
            </div>

            {/* Paragraph 4 */}
            <div
              className={`transition-all duration-700 ease-out ${
                revealedStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <p className="text-sm sm:text-base font-medium text-[#5A3D4D] leading-relaxed">
                But okayyy... it's your birthday, so I'll let you off the hook this time. 💗
              </p>
            </div>

            {/* Skip animation helper if waiting */}
            {revealedStep < 4 && (
              <button
                onClick={handleShowAll}
                className="mt-3 text-xs font-cute text-[#FF6FA5] underline cursor-pointer"
              >
                Reveal full story ✨
              </button>
            )}
          </div>

          {/* Affectionate Cloud Throwing Gag */}
          {revealedStep >= 4 && (
            <div className="animate-fade-in w-full">
              <ThrowingAnimation />
            </div>
          )}
        </div>
      </div>

      {/* THE CUTE INTERACTIVE CAMERA (NO GENERIC BUTTON!) */}
      {revealedStep >= 4 && (
        <div className="mt-4 animate-fade-in flex flex-col items-center">
          <InteractiveCamera onCaptureComplete={onNextSurprise} />
        </div>
      )}
    </div>
  );
};
