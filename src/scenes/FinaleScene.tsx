import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, FastForward, Heart } from 'lucide-react';
import { birthdayAssets } from '../config/birthdayAssets';
import { ScrapbookPhotoCard } from '../components/ScrapbookPhotoCard';
import { soundFx } from '../utils/soundEffects';

interface FinaleSceneProps {
  onOpenApology: () => void;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ onOpenApology }) => {
  // Stages:
  // 'intro': Heading + Subtitle + Photos animate in along sides
  // 'video': Center transforms into central video player
  // 'delivery': Cat runs in with letter, letter floats up and opens automatically!
  const [stage, setStage] = useState<'intro' | 'video' | 'delivery'>('intro');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Stage A -> Stage B: Transition into central video after comfortable reading pause
    const timer = setTimeout(() => {
      setStage('video');
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // When video ends naturally
  const handleVideoEnded = () => {
    triggerLetterDelivery();
  };

  const triggerLetterDelivery = () => {
    setStage('delivery');
    soundFx.playGiftOpen();

    // After cat presents letter and it opens in mid-air (3.6s), automatically advance to Apology Scene!
    setTimeout(() => {
      onOpenApology();
    }, 3600);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between p-3 sm:p-6 select-none">
      {/* Background soft glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FFFDFE] via-[#FCE4EC] to-[#F8BBD0]/50 pointer-events-none" />

      {/* TOP: Properly Sized Centered Heading & Subtitle */}
      <div className="relative z-20 text-center px-4 pt-2 sm:pt-4 max-w-2xl mx-auto flex-shrink-0 animate-fade-in">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-cute font-black tracking-tight text-[#FF6FA5] drop-shadow-sm">
          A LITTLE UNIVERSE OF MEMORIES 💗
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-cute font-medium text-[#5A3D4D]/80 mt-1">
          Every little moment with you deserves its own place here.
        </p>
      </div>

      {/* MAIN CINEMATIC VIEWPORT LAYOUT: Staggered Photos Left & Right, Center Action */}
      <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4 my-auto overflow-hidden">
        {/* LEFT COLUMN: Staggered Scrapbook Photos (Visible and responsive) */}
        <div className="hidden sm:flex flex-col gap-4 sm:gap-6 w-36 sm:w-44 lg:w-56 flex-shrink-0">
          {/* Photo 1 (Tilted slightly counter-clockwise) */}
          <ScrapbookPhotoCard
            url={birthdayAssets.memoryPhotos[0]?.url}
            fallbackUrl={birthdayAssets.memoryPhotos[0]?.fallbackUrl}
            title={birthdayAssets.memoryPhotos[0]?.title || 'Happy Smiles 📸'}
            caption={birthdayAssets.memoryPhotos[0]?.caption}
            rotation="-rotate-3"
            tapeColor="bg-[#FFE1D2]/90"
          />

          {/* Photo 2 (Tilted clockwise) */}
          <ScrapbookPhotoCard
            url={birthdayAssets.memoryPhotos[1]?.url}
            fallbackUrl={birthdayAssets.memoryPhotos[1]?.fallbackUrl}
            title={birthdayAssets.memoryPhotos[1]?.title || 'Heart Hands 🌸'}
            caption={birthdayAssets.memoryPhotos[1]?.caption}
            rotation="rotate-2"
            tapeColor="bg-[#F8BBD0]/90"
            className="sm:ml-3"
          />
        </div>

        {/* CENTER COLUMN: Central Action Area (Intro -> Video Player -> Automatic Letter Cat) */}
        <div className="flex-1 max-w-xl mx-auto flex flex-col items-center justify-center text-center px-2">
          {/* STAGE A: Introduction Reading Pause */}
          {stage === 'intro' && (
            <div className="flex flex-col items-center animate-fade-in py-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-[#FF6FA5] shadow-lg flex items-center justify-center text-3xl sm:text-4xl animate-bounce mb-3">
                🎬✨
              </div>
              <p className="text-sm sm:text-base font-cute font-bold text-[#FF6FA5]">
                Gathering our sweetest clips and moments...
              </p>
              <div className="w-16 h-1 bg-[#FF6FA5]/40 rounded-full my-3" />
            </div>
          )}

          {/* STAGE B: Central Memory Video */}
          {stage === 'video' && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black/90 border-3 border-[#FF6FA5] shadow-2xl shadow-[#FF6FA5]/30">
                <video
                  ref={videoRef}
                  src={birthdayAssets.birthdayMemoryVideo}
                  controls
                  playsInline
                  onPlay={() => setIsVideoPlaying(true)}
                  onEnded={handleVideoEnded}
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-contain"
                >
                  <source src={birthdayAssets.birthdayMemoryVideo} type="video/mp4" />
                </video>

                {/* Autoplay blocked or start play button */}
                {!isVideoPlaying && !videoError && (
                  <div
                    onClick={handlePlayVideo}
                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF6FA5] to-[#F7A8C4] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                    <span className="text-white text-xs font-cute font-bold mt-2">
                      Tap to Play Birthday Video 🎬
                    </span>
                  </div>
                )}

                {/* Graceful fallback if video is still being uploaded */}
                {videoError && (
                  <div className="absolute inset-0 bg-[#FFF0F5] flex flex-col items-center justify-center p-6 text-[#5A3D4D]">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#F8BBD0] flex items-center justify-center text-2xl mb-2">
                      📹
                    </div>
                    <h4 className="font-cute font-bold text-sm text-[#FF6FA5]">
                      Memory Video Player
                    </h4>
                    <p className="text-xs text-[#5A3D4D]/70 mt-1 max-w-xs">
                      Replaceable at public/assets/videos/birthday-memory.mp4
                    </p>
                    <button
                      onClick={triggerLetterDelivery}
                      className="mt-3 px-4 py-1.5 rounded-full bg-[#FF6FA5] text-white text-xs font-cute font-bold shadow-md hover:scale-105 cursor-pointer"
                    >
                      Proceed to Letter 💌
                    </button>
                  </div>
                )}
              </div>

              {/* Fast Forward Option to Letter */}
              {!videoError && (
                <button
                  onClick={triggerLetterDelivery}
                  className="mt-2.5 text-[11px] font-cute text-[#5A3D4D]/60 hover:text-[#FF6FA5] flex items-center gap-1 cursor-pointer"
                >
                  <span>Skip to letter</span>
                  <FastForward className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* STAGE C: THE CAT RUNS IN CARRYING LETTER & IT OPENS AUTOMATICALLY */}
          {stage === 'delivery' && (
            <div className="relative flex flex-col items-center animate-fade-in py-4">
              {/* Cat Speech Bubble */}
              <div className="relative mb-3 px-4 py-2 rounded-2xl bg-white border-2 border-[#FF6FA5] shadow-lg shadow-[#FF6FA5]/25 animate-bounce">
                <span className="text-xs sm:text-sm font-cute font-extrabold text-[#FF6FA5]">
                  psst... someone left you a little letter. 💌
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-[#FF6FA5]" />
              </div>

              {/* Cat Running in & Presenting Letter */}
              <div className="relative flex items-center justify-center">
                <img
                  src="/assets/cats/opening-cat.png"
                  alt="Delivery Cat"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain filter drop-shadow-md"
                />

                {/* THE LETTER FLOATS OUT OF PAWS & OPENS IN MID-AIR */}
                <div className="absolute -top-6 sm:-top-8 flex flex-col items-center animate-float">
                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl bg-gradient-to-tr from-white via-[#FFF0F5] to-[#FCE4EC] border-2 border-[#FF6FA5] shadow-xl flex items-center justify-center transform rotate-6 scale-110">
                    <Heart className="w-5 h-5 text-[#FF6FA5] fill-[#FF6FA5] animate-ping" />
                  </div>
                  {/* Floating hearts emerging */}
                  <div className="flex gap-1.5 mt-1">
                    <span className="text-xs text-pink-400 animate-sparkle">🌸</span>
                    <span className="text-sm text-[#FF6FA5] animate-bounce">💖</span>
                    <span className="text-xs text-yellow-300 animate-sparkle">✨</span>
                  </div>
                </div>
              </div>

              <span className="mt-3 text-xs font-cute text-[#FF6FA5] font-bold animate-pulse">
                Opening your letter... 💌
              </span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Staggered Scrapbook Photos (Visible and responsive) */}
        <div className="hidden sm:flex flex-col gap-4 sm:gap-6 w-36 sm:w-44 lg:w-56 flex-shrink-0">
          {/* Photo 3 (Tilted clockwise) */}
          <ScrapbookPhotoCard
            url={birthdayAssets.memoryPhotos[2]?.url}
            fallbackUrl={birthdayAssets.memoryPhotos[2]?.fallbackUrl}
            title={birthdayAssets.memoryPhotos[2]?.title || 'Flower Girl 🌸'}
            caption={birthdayAssets.memoryPhotos[2]?.caption}
            rotation="rotate-3"
            tapeColor="bg-[#F8BBD0]/90"
            className="sm:mr-3"
          />

          {/* Photo 4 (Tilted counter-clockwise) */}
          <ScrapbookPhotoCard
            url={birthdayAssets.memoryPhotos[3]?.url}
            fallbackUrl={birthdayAssets.memoryPhotos[3]?.fallbackUrl}
            title={birthdayAssets.memoryPhotos[3]?.title || 'Happy Moments ✨'}
            caption={birthdayAssets.memoryPhotos[3]?.caption}
            rotation="-rotate-2"
            tapeColor="bg-[#FFE1D2]/90"
          />
        </div>
      </div>

      {/* MOBILE MEMORIES STRIP: Shown on small screens so uploaded photos 2, 3, 4, 5 are visible on all devices */}
      <div className="flex sm:hidden w-full overflow-x-auto gap-3 px-3 py-1.5 flex-shrink-0 scrollbar-thin">
        {birthdayAssets.memoryPhotos.map((photo, idx) => (
          <div key={photo.id} className="w-36 flex-shrink-0">
            <ScrapbookPhotoCard
              url={photo.url}
              fallbackUrl={photo.fallbackUrl}
              title={photo.title}
              caption={photo.caption}
              rotation={idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}
              tapeColor={idx % 2 === 0 ? 'bg-[#FFE1D2]/90' : 'bg-[#F8BBD0]/90'}
            />
          </div>
        ))}
      </div>

      {/* BOTTOM: Minimal Spacing, Clean Viewport Presence */}
      <div className="relative z-20 text-center pb-2 flex-shrink-0">
        <span className="text-[10px] sm:text-xs font-cute text-[#5A3D4D]/50 font-medium">
          "Every memory with you is pure magic" 💖
        </span>
      </div>
    </div>
  );
};
