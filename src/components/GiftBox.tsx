import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame } from 'lucide-react';
import { CuteCat } from './CuteCat';
import { BalloonTypography } from './BalloonTypography';
import { CatSticker } from './CatSticker';
import { birthdayAssets } from '../config/birthdayAssets';
import { soundFx } from '../utils/soundEffects';

interface GiftBoxProps {
  onIgniteRocket: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ onIgniteRocket }) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [rocketIntroduced, setRocketIntroduced] = useState(false);
  const [isIgniting, setIsIgniting] = useState(false);

  const dragStartX = useRef(0);
  const DRAG_THRESHOLD = 80; // Pulling 80px left or right triggers unwrap

  // Handle pointer down on the actual ribbon/bow
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isUnwrapped) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    soundFx.playSparkle();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isUnwrapped) return;
    const delta = e.clientX - dragStartX.current;
    // Bound the drag visual feedback
    const clampedDelta = Math.max(-140, Math.min(140, delta));
    setDragOffset(clampedDelta);

    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      setIsDragging(false);
      triggerUnwrap();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    if (Math.abs(dragOffset) >= DRAG_THRESHOLD * 0.75) {
      triggerUnwrap();
    } else {
      // Snap back
      setDragOffset(0);
    }
  };

  const triggerUnwrap = () => {
    if (isUnwrapped) return;
    setIsUnwrapped(true);
    soundFx.playGiftOpen();

    // Pink party poppers & celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF6FA5', '#F8BBD0', '#F7A8C4', '#FFE1D2', '#FFFDFE', '#FFD166']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.6 },
          colors: ['#FF6FA5', '#E8DDF8', '#FFFDFE']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.6 },
          colors: ['#FF6FA5', '#F8BBD0', '#FFFDFE']
        });
      }, 350);
    } catch {}

    // Cat brings the rocket after the celebration settles
    setTimeout(() => {
      setRocketIntroduced(true);
      soundFx.playPop();
    }, 2800);
  };

  const handleIgnite = () => {
    if (isIgniting) return;
    setIsIgniting(true);
    soundFx.playSparkle();
    soundFx.playWhoosh();

    // Small vibration, sparks, cat jumps, then launch!
    setTimeout(() => {
      onIgniteRocket();
    }, 1300);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-4 px-4 select-none">
      {/* Viewport Floating Celebratory Cats naturally distributed across the scene (Shown ONLY after unwrapped) */}
      {isUnwrapped && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Top-left outer: Dancing Cat */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-12 md:left-20">
            <CatSticker
              src="/assets/cats/happy-cat.webp"
              alt="Dancing Celebration Cat"
              badge="YAY! 🎀"
              animation="float"
              rotation="-rotate-12"
              size="lg"
            />
          </div>

          {/* Top-left mid: Kitten holding flower */}
          <div className="absolute top-16 sm:top-24 left-14 sm:left-28 md:left-44">
            <CatSticker
              src="/assets/aistudio/cat-kitty_62f267f9.webp"
              fallbackSrc="/assets/cats/cat-01.png"
              alt="Flower Kitten"
              badge="FOR YOU 🌸"
              animation="bounce-gentle"
              rotation="rotate-6"
              size="md"
            />
          </div>

          {/* Top-right mid: Flower Cat */}
          <div className="absolute top-16 sm:top-24 right-14 sm:right-28 md:right-44">
            <CatSticker
              src="/assets/cats/cat-flower.webp"
              alt="Waving Flower Cat"
              badge="PURE JOY 💖"
              animation="float"
              rotation="-rotate-6"
              size="md"
            />
          </div>

          {/* Top-right outer: Kitten with pink bow */}
          <div className="absolute top-4 sm:top-8 right-4 sm:right-12 md:right-20">
            <CatSticker
              src="/assets/aistudio/cat-kitten_076160d6.webp"
              fallbackSrc="/assets/cats/cat-02.png"
              alt="Kitten with Pink Bow"
              badge="MADAM 👑"
              animation="float-delayed"
              rotation="rotate-12"
              size="lg"
            />
          </div>

          {/* Middle-left outer: Party Hat Cat */}
          <div className="absolute top-1/2 -translate-y-28 left-4 sm:left-12 md:left-24">
            <CatSticker
              src="/assets/cats/party-cat.jpg"
              alt="Party Hat Cat"
              badge="PARTY! 🥳"
              animation="bounce-gentle"
              rotation="rotate-3"
              size="md"
            />
          </div>

          {/* Middle-left lower: Beatboxing / excited Cat */}
          <div className="absolute top-1/2 translate-y-12 left-10 sm:left-24 md:left-40">
            <CatSticker
              src="/assets/aistudio/beatboxing-cat-cat_6a6e263a.webp"
              fallbackSrc="/assets/cats/cat-03.png"
              alt="Excited Cat"
              badge="VIBING 🎶"
              animation="wiggle"
              rotation="-rotate-6"
              size="md"
            />
          </div>

          {/* Middle-right outer: Hearts Cat */}
          <div className="absolute top-1/2 -translate-y-28 right-4 sm:right-12 md:right-24">
            <CatSticker
              src="/assets/cats/hearts-cat.jpg"
              alt="Hearts Cat"
              badge="LOVE YOU 💗"
              animation="float-delayed"
              rotation="-rotate-6"
              size="md"
            />
          </div>

          {/* Middle-right lower: Cool Cat with Sunglasses */}
          <div className="absolute top-1/2 translate-y-12 right-10 sm:right-24 md:right-40">
            <CatSticker
              src="/assets/cats/cool-cat.jpg"
              alt="Cool Cat with Shades"
              badge="ICONIC ✨"
              animation="pulse-gentle"
              rotation="rotate-6"
              size="md"
            />
          </div>

          {/* Bottom-left outer: Sleepy / Thumbs-up Cat */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-16 md:left-28">
            <CatSticker
              src="/assets/cats/thumbsup-cat.jpg"
              alt="Thumbs Up Cat"
              badge="BEST DAY! 👍"
              animation="bounce-gentle"
              rotation="-rotate-6"
              size="md"
            />
          </div>

          {/* Bottom-left mid: Beluga Smile Cat */}
          <div className="absolute bottom-20 sm:bottom-28 left-16 sm:left-32 md:left-48">
            <CatSticker
              src="/assets/cats/beluga-cat.jpg"
              alt="Smile Cat"
              badge="SO CUTE 🐾"
              animation="float"
              rotation="rotate-12"
              size="sm"
            />
          </div>

          {/* Bottom-right mid: Jumping Happy Cat */}
          <div className="absolute bottom-20 sm:bottom-28 right-16 sm:right-32 md:right-48">
            <CatSticker
              src="/assets/aistudio/_____-happy-cat_f91f7806.webp"
              fallbackSrc="/assets/cats/happy-cat.webp"
              alt="Jumping Cat"
              badge="HAPPY 🌸"
              animation="bounce-gentle"
              rotation="-rotate-12"
              size="sm"
            />
          </div>

          {/* Bottom-right outer: Peeking Box Cat */}
          <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-16 md:right-28">
            <CatSticker
              src="/assets/cats/box-cat.png"
              alt="Peeking Box Cat"
              badge="PEEKABOO 🎀"
              animation="float"
              rotation="rotate-6"
              size="md"
            />
          </div>
        </div>
      )}

      {/* Main Center Box Composition */}
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Cat beside the present (Only visible before unwrapped) */}
        {!isUnwrapped && (
          <div className="relative sm:absolute sm:-top-8 sm:-right-4 md:right-4 z-20 mb-3 sm:mb-0 animate-float">
            <CuteCat
              src={birthdayAssets.openingCat}
              alt="Welcome Cat"
              bubbleText="pssst... your surprise is inside! 🎀"
              bubbleSide="top"
              size="lg"
            />
          </div>
        )}

        {/* The Gift Box */}
        <div
          className={`relative transition-all duration-700 ease-out flex flex-col items-center ${
            isUnwrapped ? 'scale-95' : 'animate-float'
          }`}
        >
          {/* Warm internal glow when unwrapped */}
          {isUnwrapped && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#FF6FA5]/45 via-[#F7A8C4]/35 to-transparent blur-3xl rounded-full scale-125 animate-pulse" />
          )}

          {/* Box Structure */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Box Lid / Top */}
            <div
              className={`absolute top-0 z-30 w-72 sm:w-88 h-16 sm:h-20 rounded-2xl bg-gradient-to-b from-[#F7A8C4] via-[#F8BBD0] to-[#FCE4EC] border-2 border-white/80 shadow-lg shadow-[#FF6FA5]/25 transition-transform duration-700 ease-out ${
                isUnwrapped
                  ? '-translate-y-36 -rotate-15 opacity-0 pointer-events-none'
                  : ''
              }`}
            >
              {/* Vertical Lid Ribbon Segment */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-[#FF6FA5] to-[#F7A8C4] border-x border-white/60 shadow-sm" />

              {/* Big Fluffy Bow (Follows Ribbon Drag) */}
              <div
                className={`absolute -top-12 left-1/2 flex items-center justify-center transition-all duration-300 ${
                  isUnwrapped ? 'scale-0 opacity-0' : 'scale-100'
                }`}
                style={{
                  transform: `translateX(calc(-50% + ${dragOffset * 0.8}px)) rotate(${dragOffset * 0.15}deg)`
                }}
              >
                <div className="relative w-24 h-16 flex items-center justify-center pointer-events-none">
                  <div className="absolute -left-2 w-12 h-10 rounded-full bg-gradient-to-br from-[#FF6FA5] to-[#F7A8C4] border-2 border-white/80 shadow-md transform -rotate-25" />
                  <div className="absolute -right-2 w-12 h-10 rounded-full bg-gradient-to-bl from-[#FF6FA5] to-[#F7A8C4] border-2 border-white/80 shadow-md transform rotate-25" />
                  <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6FA5] to-[#FFFDFE] border border-white shadow-md flex items-center justify-center text-white text-xs">
                    🎀
                  </div>
                </div>
              </div>
            </div>

            {/* Box Base */}
            <div
              className={`relative z-10 w-64 h-56 sm:w-76 sm:h-64 rounded-3xl bg-gradient-to-b from-[#FCE4EC] via-[#F8BBD0] to-[#F7A8C4] border-3 border-white/90 shadow-2xl shadow-[#FF6FA5]/30 overflow-hidden transition-all duration-700 ${
                isUnwrapped ? 'border-[#FF6FA5]/60 bg-gradient-to-b from-[#FFFDFE] to-[#FCE4EC]' : ''
              }`}
            >
              {/* Pattern Texture */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF6FA5_1.5px,transparent_1.5px)] [background-size:18px_18px]" />

              {/* Vertical Ribbon on Box */}
              <div
                className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-gradient-to-b from-[#FF6FA5] to-[#F7A8C4] border-x border-white/70 shadow-sm transition-opacity duration-500 ${
                  isUnwrapped ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* THE DRAGGABLE HORIZONTAL RIBBON EMBEDDED DIRECTLY ON THE BOX */}
              {!isUnwrapped && (
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    transform: `translateY(-50%) translateX(${dragOffset}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  className="absolute inset-x-0 top-1/2 h-12 z-20 flex items-center justify-center touch-none select-none group"
                >
                  {/* The Ribbon Band */}
                  <div className="relative w-full h-9 bg-gradient-to-r from-[#FF6FA5] via-[#F7A8C4] to-[#FF6FA5] border-y border-white/80 shadow-md flex items-center justify-center">
                    {/* Ribbon Center Grip Knot */}
                    <div className="px-3 py-1 rounded-full bg-white/90 border border-[#FF6FA5] text-[11px] font-cute font-bold text-[#FF6FA5] shadow-sm flex items-center gap-1 group-hover:scale-105 transition-transform">
                      <span>🎀</span>
                      <span>Pull to unwrap!</span>
                      <span>✨</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Inside of opened box */}
              {isUnwrapped && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
                  <div className="text-4xl sm:text-5xl animate-bounce mb-1">🎁✨</div>
                  <div className="w-16 h-1 bg-[#FF6FA5]/40 rounded-full my-2" />
                  <p className="text-xs font-cute text-[#FF6FA5] font-semibold">SURPRISE UNLOCKED!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Accessible click fallback below unopened box */}
      {!isUnwrapped && (
        <button
          onClick={triggerUnwrap}
          className="mt-4 text-xs font-cute text-[#5A3D4D]/60 hover:text-[#FF6FA5] underline cursor-pointer"
        >
          (Or tap here to pull ribbon ✨)
        </button>
      )}

      {/* REVEALED CELEBRATION HEADING (ONLY AFTER UNWRAPPED) */}
      {isUnwrapped && (
        <div className="relative z-20 mt-6 flex flex-col items-center text-center animate-fade-in w-full max-w-2xl px-2">
          {/* 3D Glossy Pink Foil Balloon Lettering */}
          <div className="relative w-full mb-2">
            <BalloonTypography className="transform scale-95 sm:scale-100" />
            <Sparkles className="absolute -top-3 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <p className="text-base sm:text-xl font-cute font-medium text-[#5A3D4D] mb-4 px-4">
            Today, the entire universe is celebrating <span className="text-[#FF6FA5] font-bold">YOU</span>.
          </p>

          {/* CAT INTRODUCES THE ROCKET */}
          {rocketIntroduced && (
            <div className="w-full mt-4 flex flex-col items-center animate-fade-in">
              {/* Cat Speech Bubble */}
              <div className="relative mb-3 px-4 py-2 rounded-2xl bg-white border-2 border-[#FF6FA5] shadow-lg shadow-[#FF6FA5]/20 animate-bounce">
                <span className="text-sm sm:text-base font-cute font-bold text-[#FF6FA5]">
                  HELLOOO? Kya dekh rahi ho? Isse ignite bhi kar do! 😾🚀
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#FF6FA5]" />
              </div>

              {/* The Cat & The Rocket Stage */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                {/* Cat presenting rocket */}
                <div className={`transition-transform duration-500 ${isIgniting ? '-translate-x-12 scale-90' : 'animate-float'}`}>
                  <CuteCat
                    src="/assets/cats/surprised-cat.jpg"
                    alt="Rocket Cat"
                    size="sm"
                  />
                </div>

                {/* The Interactive Rocket Object */}
                <div className={`relative flex flex-col items-center transition-all duration-300 ${isIgniting ? 'animate-bounce scale-110' : 'animate-float-delayed'}`}>
                  {/* Miniature Rocket Visual */}
                  <div className="w-20 h-28 relative flex items-center justify-center">
                    <div className="w-12 h-20 rounded-t-full bg-gradient-to-b from-white via-[#FFF0F5] to-[#FF6FA5] border-2 border-white shadow-lg flex items-center justify-center">
                      <span className="text-lg">🐱</span>
                    </div>
                    {/* Rocket Fins */}
                    <div className="absolute bottom-4 -left-1 w-3 h-5 bg-[#FF6FA5] rounded-l-md" />
                    <div className="absolute bottom-4 -right-1 w-3 h-5 bg-[#FF6FA5] rounded-r-md" />

                    {/* Glowing Thruster Sparks if Igniting */}
                    {isIgniting && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <Flame className="w-6 h-6 text-yellow-400 fill-orange-500 animate-pulse" />
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* The IGNITE Button */}
                  <button
                    onClick={handleIgnite}
                    disabled={isIgniting}
                    className="mt-2 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-[#FF6FA5] text-white font-cute font-black text-sm tracking-wide shadow-lg shadow-orange-500/30 hover:scale-108 active:scale-95 transition-all cursor-pointer border border-white"
                  >
                    <Flame className="w-4 h-4" />
                    <span>{isIgniting ? 'IGNITING...' : 'IGNITE 🚀'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
