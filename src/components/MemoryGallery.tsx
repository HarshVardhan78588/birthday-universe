import React, { useState } from 'react';
import { Heart, Sparkles, ZoomIn, Play, Video, Camera, Calendar, Tag } from 'lucide-react';
import { birthdayAssets, MemoryPhotoItem, MemoryVideoItem } from '../config/birthdayAssets';
import { soundFx } from '../utils/soundEffects';

interface MemoryGalleryProps {
  onPhotoClick?: (photo: MemoryPhotoItem) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = () => {
  const [activePhoto, setActivePhoto] = useState<MemoryPhotoItem | null>(null);
  const [photoLikes, setPhotoLikes] = useState<Record<string, number>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playSparkle();
    setPhotoLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 select-none">
      {/* Memories Intro Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDFE] border border-[#F8BBD0] shadow-sm mb-3 text-xs font-cute font-bold text-[#FF6FA5]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6FA5]" />
          <span>LITTLE MOMENTS, BIG MEMORIES</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-cute font-bold text-[#5A3D4D]">
          Our Birthday Scrapbook 🎀
        </h3>
        <p className="text-sm sm:text-base text-[#5A3D4D]/75 font-medium max-w-md mx-auto mt-2">
          Every snapshot holds a story, a laugh, or a smile that made the day special.
        </p>
      </div>

      {/* Scrapbook Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {birthdayAssets.memoryPhotos.map((photo, index) => {
          const isError = failedImages[photo.id];
          const likes = photoLikes[photo.id] || 0;
          // Alternate rotation for handcrafted scrapbook feel
          const rotationClass = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1.5' : '-rotate-0.5';

          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`group relative rounded-3xl bg-white p-3.5 sm:p-4 border-2 border-[#F8BBD0] shadow-lg shadow-[#FF6FA5]/10 hover:shadow-2xl hover:shadow-[#FF6FA5]/25 hover:border-[#FF6FA5] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer transform ${rotationClass}`}
            >
              {/* Scrapbook Washi Tape on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-[#FFE1D2]/80 to-[#FCE4EC]/90 border border-white/60 shadow-xs rounded-xs z-10 opacity-85" />

              {/* Photo Display Window */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#FFF0F5] to-[#FCE4EC] border border-[#F8BBD0]/30 flex items-center justify-center">
                {!isError ? (
                  <img
                    src={photo.url}
                    alt={photo.title}
                    onError={() => handleImageError(photo.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Aesthetic Demo Memory Fallback Card */
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Camera className="w-8 h-8 text-[#FF6FA5] mb-2" />
                    <span className="text-xs font-cute font-bold text-[#5A3D4D]">
                      {photo.title}
                    </span>
                    <span className="text-[10px] text-[#5A3D4D]/60 mt-1">
                      Replace in {photo.url}
                    </span>
                  </div>
                )}

                {/* Lightbox preview button on hover */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 text-[#FF6FA5] font-cute text-xs font-bold shadow-md">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Memory</span>
                  </span>
                </div>

                {/* Tag pill */}
                {photo.tag && (
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 text-[#FF6FA5] text-[10px] font-cute font-bold shadow-xs">
                    {photo.tag}
                  </div>
                )}
              </div>

              {/* Card Caption Info */}
              <div className="mt-3.5 px-1">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="font-cute font-bold text-base text-[#5A3D4D] group-hover:text-[#FF6FA5] transition-colors leading-tight">
                    {photo.title}
                  </h4>
                  {photo.date && (
                    <span className="text-[11px] font-medium text-[#5A3D4D]/50 flex-shrink-0">
                      {photo.date}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5A3D4D]/75 font-medium line-clamp-2 leading-relaxed font-sans">
                  {photo.caption}
                </p>

                {/* Interactive Heart Reactions */}
                <div className="mt-3 pt-2.5 border-t border-[#FCE4EC] flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF0F5] hover:bg-[#F8BBD0]/40 text-[#FF6FA5] text-xs font-cute font-semibold transition-colors cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likes > 0 ? 'fill-[#FF6FA5]' : ''}`} />
                    <span>{likes > 0 ? `${likes} hearts` : 'Send Love ♡'}</span>
                  </button>

                  <span className="text-[11px] font-handwriting text-base font-bold text-[#FF6FA5]">
                    forever 🌸
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Candid Videos Section */}
      {birthdayAssets.memoryVideos.length > 0 && (
        <div className="mt-8 mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDFE] border border-[#F8BBD0] shadow-sm mb-2 text-xs font-cute font-bold text-[#FF6FA5]">
              <Video className="w-3.5 h-3.5 text-[#FF6FA5]" />
              <span>LIVE CLIPS & CANDID LAUGHS</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-cute font-bold text-[#5A3D4D]">
              Video Memories 🎬
            </h3>
          </div>

          <div className="max-w-2xl mx-auto">
            {birthdayAssets.memoryVideos.map((video) => (
              <div
                key={video.id}
                className="rounded-3xl bg-white p-4 sm:p-5 border-2 border-[#F8BBD0] shadow-xl shadow-[#FF6FA5]/15"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/90 shadow-inner flex items-center justify-center">
                  <video
                    controls
                    preload="metadata"
                    poster={video.poster}
                    className="w-full h-full object-contain"
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support HTML5 video playback.
                  </video>
                </div>

                <div className="mt-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-cute font-bold text-base text-[#5A3D4D]">
                      {video.title}
                    </h4>
                    <p className="text-xs text-[#5A3D4D]/75 font-medium mt-0.5">
                      {video.caption}
                    </p>
                  </div>
                  <span className="text-xs font-cute text-[#FF6FA5] bg-[#FCE4EC] px-3 py-1 rounded-full self-start sm:self-auto font-semibold">
                    Candid Clip 🎀
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox for Selected Photo */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full rounded-3xl bg-white p-4 shadow-2xl border-4 border-[#F8BBD0] animate-float"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#FF6FA5] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FCE4EC] flex items-center justify-center">
              {!failedImages[activePhoto.id] ? (
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-6">
                  <Camera className="w-12 h-12 text-[#FF6FA5] mx-auto mb-2" />
                  <p className="font-cute font-bold text-base text-[#5A3D4D]">
                    {activePhoto.title}
                  </p>
                  <p className="text-xs text-[#5A3D4D]/60 mt-1">
                    Add your photo to {activePhoto.url}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3.5 px-2 text-center">
              <h4 className="font-cute font-bold text-lg text-[#5A3D4D]">
                {activePhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#5A3D4D]/80 font-medium mt-1 leading-relaxed">
                {activePhoto.caption}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-xs font-handwriting text-lg text-[#FF6FA5] font-bold">
                  "You make everyday memories feel like magic." 💖
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
