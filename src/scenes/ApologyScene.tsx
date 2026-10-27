import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import { ApologyCatReactions, ApologyReactionMood } from '../components/ApologyCatReactions';
import { FlynnRiderReveal } from '../components/FlynnRiderReveal';
import { soundFx } from '../utils/soundEffects';

interface ApologySceneProps {
  onRestartAdventure: () => void;
}

export const ApologyScene: React.FC<ApologySceneProps> = ({ onRestartAdventure }) => {
  // Progression steps:
  // 1 to 5: Letter paragraphs reveal automatically
  // 'warrant': Flynn Rider comedic punchline (stays visible until visitor double-clicks)
  // 'conclusion': Remaining heartfelt paragraphs (stays visible until visitor double-clicks)
  // 'hug': Final virtual hug between two cats
  const [currentStep, setCurrentStep] = useState<number | 'warrant' | 'conclusion' | 'hug'>(1);
  const isTransitioningRef = useRef(false);
  const lastTapRef = useRef<number>(0);

  // Progressive automatic text reveal for the letter reading phase only (1 to 4 -> 5)
  useEffect(() => {
    if (typeof currentStep === 'number') {
      if (currentStep === 1) {
        const t = setTimeout(() => setCurrentStep(2), 3200);
        return () => clearTimeout(t);
      }
      if (currentStep === 2) {
        const t = setTimeout(() => setCurrentStep(3), 4200);
        return () => clearTimeout(t);
      }
      if (currentStep === 3) {
        const t = setTimeout(() => setCurrentStep(4), 4200);
        return () => clearTimeout(t);
      }
      if (currentStep === 4) {
        const t = setTimeout(() => setCurrentStep(5), 4500);
        return () => clearTimeout(t);
      }
      // When currentStep === 5: NO AUTOMATIC TIMEOUT!
      // The complete letter stays visible indefinitely until the visitor double-clicks!
    }
  }, [currentStep]);

  // Double-click navigation handler for completed Apology Letter -> Warrant Scene
  const handleLetterDoubleClick = () => {
    if (isTransitioningRef.current || currentStep !== 5) return;
    isTransitioningRef.current = true;
    soundFx.playPop();
    setCurrentStep('warrant');
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 400);
  };

  // Handle double-tap on mobile touchscreens for Letter -> Warrant
  const handlePointerOrTouchForLetter = () => {
    if (currentStep !== 5) return;
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      handleLetterDoubleClick();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  // Double-click navigation handler for Warrant scene -> Conclusion
  const handleWarrantDoubleClick = () => {
    if (isTransitioningRef.current || currentStep !== 'warrant') return;
    isTransitioningRef.current = true;
    soundFx.playPop();
    setCurrentStep('conclusion');
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 400);
  };

  // Double-click navigation handler for Conclusion scene -> Final Virtual Hug
  const handleConclusionDoubleClick = () => {
    if (isTransitioningRef.current || currentStep !== 'conclusion') return;
    isTransitioningRef.current = true;
    handleEnterHug();
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 400);
  };

  // Handle double-tap for mobile touch support as well as desktop dblclick
  const handlePointerOrTouchForWarrant = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      handleWarrantDoubleClick();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  const handlePointerOrTouchForConclusion = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      handleConclusionDoubleClick();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  const handleEnterHug = () => {
    setCurrentStep('hug');
    soundFx.playHugChime();
    try {
      confetti({
        particleCount: 85,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#FF6FA5', '#F8BBD0', '#F7A8C4', '#FFE1D2', '#FFFDFE']
      });
    } catch {}
  };

  const getCatMood = (): ApologyReactionMood => {
    if (currentStep === 'warrant') return 'police';
    if (currentStep === 'conclusion' || currentStep === 'hug') return 'celebrate';
    if (typeof currentStep === 'number' && currentStep <= 3) return 'sad';
    if (currentStep === 4) return 'missing';
    return 'police';
  };

  return (
    <div className="relative w-full min-h-[92vh] max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center justify-center select-none">
      {/* Background soft ambient pink lighting */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F8BBD0]/30 to-[#FFE1D2]/25 blur-3xl animate-float" />
      </div>

      {/* STAGE 1: PROGRESSIVE LETTER READING (STAYS VISIBLE UNTIL DOUBLE-CLICK ON STEP 5) */}
      {typeof currentStep === 'number' && (
        <div
          onDoubleClick={currentStep === 5 ? handleLetterDoubleClick : undefined}
          onClick={currentStep === 5 ? handlePointerOrTouchForLetter : undefined}
          className={`w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in select-none ${
            currentStep === 5 ? 'cursor-pointer' : ''
          }`}
        >
          {/* Left Column: Emotionally Reactive Cat */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center pt-2">
            <ApologyCatReactions mood={getCatMood()} />
            <span className="text-xs font-handwriting text-base font-bold text-[#FF6FA5] mt-1">
              "Thinking of you constantly..." 🎀
            </span>
          </div>

          {/* Right Column: Progressive Letter Presentation */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-white/95 p-5 sm:p-7 border-2 border-[#F8BBD0] shadow-xl shadow-[#FF6FA5]/15 backdrop-blur-md relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#FCE4EC]">
                <span className="font-cute font-bold text-xs sm:text-sm text-[#FF6FA5] flex items-center gap-1.5">
                  <span>💌</span>
                  <span>A Letter For Madam</span>
                </span>
                <span className="text-[11px] font-cute text-[#5A3D4D]/60 bg-[#FCE4EC] px-2.5 py-0.5 rounded-full">
                  With all my heart 🌸
                </span>
              </div>

              {/* Exact Unaltered Letter Content */}
              <div className="space-y-3.5 text-[#5A3D4D] text-sm sm:text-base leading-relaxed font-sans">
                {/* Paragraph 1 */}
                <div className="animate-fade-in">
                  <h3 className="font-cute font-black text-lg sm:text-xl text-[#FF6FA5] mb-1">
                    Hey birthday girl... 🎀💗
                  </h3>
                  <p>
                    I know today is your special day, and I really, really wish I could be there with you.
                  </p>
                </div>

                {/* Paragraph 2 */}
                {currentStep >= 2 && (
                  <div className="animate-fade-in">
                    <p>
                      But unfortunately, I'm still at home because I have to finish some licence-related work, and I won't be able to make it to college. :(
                    </p>
                    <p className="mt-1.5">
                      I know you told me to come back before the 28th, before your birthday, and I'm genuinely so sorry that I couldn't make it. I know I said I'd try, and I really wish things had worked out differently.
                    </p>
                  </div>
                )}

                {/* Paragraph 3 */}
                {currentStep >= 3 && (
                  <div className="animate-fade-in">
                    <p>
                      I feel so bad about not being there with you today. You have no idea how much I wish I could be there, see you smile, annoy you a little, and be a part of your special day.
                    </p>
                  </div>
                )}

                {/* Paragraph 4 */}
                {currentStep >= 4 && (
                  <div className="animate-fade-in bg-[#FFF0F5]/80 p-3.5 rounded-2xl border border-[#F8BBD0]/50">
                    <p className="font-cute font-bold text-[#FF6FA5] text-base mb-1">
                      But listen to me, okay? 💗
                    </p>
                    <p>
                      I KNOW your day is going to be absolutely wonderful. You're going to have so much fun, make beautiful memories, laugh a lot, and have the most amazing birthday. Believe me, I'm genuinely wishing all of that for you.
                    </p>
                    <p className="mt-1.5">
                      And even though I can't be there in person, that doesn't mean I'm not thinking about you.
                    </p>
                    <p className="mt-1.5 font-cute font-bold text-[#FF6FA5]">
                      I miss you more than you can imagine. 👉👈🎀
                    </p>
                  </div>
                )}

                {/* Paragraph 5 (Arrest Warrant Setup) */}
                {currentStep >= 5 && (
                  <div className="animate-fade-in">
                    <p>
                      Okay, enough emotional drama. I'm going to stop before I make myself even sadder. 😭
                    </p>
                    <p className="mt-1.5">
                      I'm really, really sorry. Please forgive me, okay?
                    </p>
                    <p className="mt-2 font-cute font-extrabold text-[#FF6FA5] bg-red-50 p-3 rounded-2xl border border-red-200">
                      And please don't get so angry that you file a complaint against me, issue an arrest warrant, and have me dragged back to college. 😭🚔
                    </p>
                  </div>
                )}
              </div>

              {/* Status footer: Reading or Double-click prompt */}
              <div className="mt-4 pt-2 border-t border-[#FCE4EC] flex items-center justify-between text-xs font-cute text-[#5A3D4D]/50">
                {currentStep < 5 ? (
                  <span className="animate-pulse">Reading letter... 🌸</span>
                ) : (
                  <div className="w-full flex items-center justify-center py-1">
                    <span className="px-4 py-1.5 rounded-full bg-[#FFF0F5] border border-[#FF6FA5] text-xs sm:text-sm font-cute font-bold text-[#FF6FA5] shadow-xs animate-pulse">
                      Double-click anywhere to continue ✨
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prominent floating instruction beneath the letter once complete */}
          {currentStep === 5 && (
            <div className="lg:col-span-12 flex justify-center mt-1 animate-fade-in">
              <div className="px-5 py-2 rounded-full bg-white/95 border-2 border-[#FF6FA5] shadow-md text-xs sm:text-sm font-cute font-bold text-[#FF6FA5] animate-pulse">
                Double-click anywhere to continue ✨
              </div>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: FLYNN RIDER ARREST-WARRANT JOKE (IMAGE ONLY, DOUBLE-CLICK TO ADVANCE) */}
      {currentStep === 'warrant' && (
        <div
          onDoubleClick={handleWarrantDoubleClick}
          onClick={handlePointerOrTouchForWarrant}
          className="w-full flex flex-col items-center animate-fade-in cursor-pointer select-none"
        >
          <FlynnRiderReveal />

          {/* Double-click instruction indicator */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-white/90 border border-[#F8BBD0] shadow-sm text-xs font-cute font-semibold text-[#FF6FA5] animate-pulse">
            Double-click anywhere to continue ✨
          </div>
        </div>
      )}

      {/* STAGE 3: REASSURANCE & PROMISE (DOUBLE-CLICK TO ADVANCE TO HUG) */}
      {currentStep === 'conclusion' && (
        <div
          onDoubleClick={handleConclusionDoubleClick}
          onClick={handlePointerOrTouchForConclusion}
          className="w-full max-w-2xl flex flex-col items-center text-center animate-fade-in cursor-pointer select-none"
        >
          <div className="mb-3 animate-bounce">
            <ApologyCatReactions mood="celebrate" />
          </div>

          <div className="w-full rounded-3xl bg-white/95 p-6 sm:p-8 border-2 border-[#F8BBD0] shadow-xl shadow-[#FF6FA5]/15 mb-2">
            <h3 className="font-cute font-black text-2xl sm:text-3xl text-[#FF6FA5] mb-3">
              I promise I'll make it up to you. 💗
            </h3>

            <p className="font-cute text-base sm:text-xl text-[#5A3D4D] font-medium leading-relaxed mb-4">
              For now, forget about my absence for a little while and <span className="text-[#FF6FA5] font-extrabold">ENJOY YOUR DAY TO THE FULLEST, MADAM.</span> You deserve all the happiness in the world. 🎂💗
            </p>

            <div className="p-3.5 rounded-2xl bg-[#FFF0F5] border border-[#F8BBD0] inline-block">
              <p className="font-handwriting text-xl sm:text-2xl font-bold text-[#FF6FA5]">
                Happy Birthday, once again. And I'm sorry I couldn't be there. 🥹🎀
              </p>
            </div>
          </div>

          {/* Double-click instruction indicator */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-white/90 border border-[#F8BBD0] shadow-sm text-xs font-cute font-semibold text-[#FF6FA5] animate-pulse">
            Double-click anywhere to continue ✨
          </div>
        </div>
      )}

      {/* STAGE 4: THE FINAL VIRTUAL HUG */}
      {currentStep === 'hug' && (
        <div className="w-full max-w-2xl flex flex-col items-center text-center animate-fade-in py-6">
          {/* Big Warm Glowing Aura */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF6FA5]/25 via-[#FCE4EC]/50 to-transparent blur-3xl pointer-events-none rounded-full scale-125" />

          {/* Two Cats Hugging Animation */}
          <div className="relative w-64 h-52 sm:w-76 sm:h-60 flex items-center justify-center mb-4">
            <div className="relative z-10 flex items-center justify-center">
              {/* Left Cat */}
              <div className="transform translate-x-4 animate-float">
                <img
                  src="/assets/cats/opening-cat.png"
                  alt="Hugging Cat 1"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain filter drop-shadow-lg"
                />
              </div>

              {/* Hearts in the middle of hug */}
              <div className="z-20 flex flex-col items-center">
                <Heart className="w-12 h-12 text-[#FF6FA5] fill-[#FF6FA5] animate-ping" />
                <span className="text-2xl animate-bounce">💖</span>
              </div>

              {/* Right Cat */}
              <div className="transform -translate-x-4 animate-float-delayed scale-x-[-1]">
                <img
                  src="/assets/cats/cat-flower.webp"
                  alt="Hugging Cat 2"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Heartwarming Final Lines */}
          <div className="relative z-10 max-w-lg px-4 mb-6">
            <p className="text-base sm:text-xl font-cute font-bold text-[#FF6FA5] mb-1">
              Distance can't cancel a little birthday love. 💗
            </p>
            <p className="text-xs sm:text-sm font-cute font-medium text-[#5A3D4D]/80 mb-3">
              I'm sorry I can't be there today. But I'm cheering for you, always. 🎀
            </p>
            <h2 className="text-2xl sm:text-4xl font-cute font-black text-[#FF6FA5] drop-shadow-sm leading-tight">
              HAPPY BIRTHDAY, MADAM. NOW GO HAVE THE BEST DAY EVER. 🎂💗
            </h2>
          </div>

          {/* Replay Adventure Button */}
          <button
            onClick={() => {
              soundFx.playPop();
              onRestartAdventure();
            }}
            className="relative z-10 group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-[#F8BBD0] hover:border-[#FF6FA5] text-[#5A3D4D] hover:text-[#FF6FA5] font-cute font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform text-[#FF6FA5]" />
            <span>Replay the Adventure from Scene 1 🎀</span>
          </button>
        </div>
      )}
    </div>
  );
};
