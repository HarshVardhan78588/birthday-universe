/**
 * CENTRAL ASSET CONFIGURATION FILE
 * 
 * To replace any photo, video, character, or music:
 * 1. Open the /public/assets/ folder in your project.
 * 2. Add or replace files with the same filenames, or edit the paths below.
 * 3. Any missing or placeholder asset automatically displays a graceful, aesthetic fallback.
 */

export interface MemoryPhotoItem {
  id: string;
  url: string;
  fallbackUrl?: string;
  title: string;
  caption: string;
  date?: string;
  tag?: string;
}

export interface MemoryVideoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  poster?: string;
  duration?: string;
}

export interface BirthdayAssetsConfig {
  openingCat: string;
  giftBoxCat: string;
  birthdayDecorations: string[];
  catAstronaut: string;
  heartPhoto: string;
  angryCat: string;
  throwingCat: string;
  studioMonster: string;
  studioBackdrop: string;
  iceCream: string;
  birthdayMemoryVideo: string;
  memoryPhotos: MemoryPhotoItem[];
  memoryVideos: MemoryVideoItem[];
  birthdayMusic: string;
  
  // Apology Scene & Flynn Rider
  flynnRider: string;
  apologyEnvelope: string;
  envelopeCat: string;
  sadCat: string;
  heartHugCat: string;
  celebrationCat: string;
  policeCat: string;
  huggingCats: string;

  sounds: {
    giftOpen: string;
    sparkle: string;
    rocketLaunch: string;
    pop: string;
    shutter: string;
  };
}

export const birthdayAssets: BirthdayAssetsConfig = {
  // Scene 1: Mystery Gift Box
  openingCat: "/assets/cats/opening-cat.png",
  giftBoxCat: "/assets/cats/box-cat.png",
  birthdayDecorations: [
    "/assets/cats/happy-cat.webp",
    "/assets/cats/cat-flower.webp",
    "/assets/cats/party-cat.jpg",
    "/assets/cats/cat-01.png",
    "/assets/cats/cat-02.png",
    "/assets/cats/cat-03.png",
    "/assets/cats/opening-cat.png"
  ],

  // Scene 2: Rocket Mission to KIIT
  catAstronaut: "/assets/cats/cat-astronaut.png",

  // Scene 3: Heart Photo & Teasing Memory
  heartPhoto: "/assets/aistudio/1_baff2301.jpeg",
  angryCat: "/assets/cats/angry-cat.gif",
  throwingCat: "/assets/cats/throwing-cat.webp",

  // Scene 4: Cute Photography Studio & Monster
  studioMonster: "/assets/characters/studio-monster.gif",
  studioBackdrop: "/assets/backgrounds/studio-backdrop.jpg",
  iceCream: "/assets/aistudio/image_aff67de1.png",

  // Scene 5: Central Birthday Video & Staggered Memories
  birthdayMemoryVideo: "/assets/aistudio/main_vid_73967956.mp4",
  memoryPhotos: [
    {
      id: "photo-1",
      url: "/assets/aistudio/2_f8e2201c.jpeg",
      title: "Our Favorite Moments 📸",
      caption: "You taking perfect pictures while I look in awe. The true definition of photogenic!",
      date: "Forever Favorite",
      tag: "Precious"
    },
    {
      id: "photo-2",
      url: "/assets/aistudio/3_d5f1d8e6.jpeg",
      title: "Pure Happiness 💗",
      caption: "Your glowing smile that makes everything around melt with warmth and joy.",
      date: "Sweet Memory",
      tag: "Pure Cuteness"
    },
    {
      id: "photo-3",
      url: "/assets/aistudio/4_14c17494.jpeg",
      title: "Unforgettable Days 🌸",
      caption: "Bringing more natural sunshine and brightness than a summer morning.",
      date: "Golden Days",
      tag: "Special"
    },
    {
      id: "photo-4",
      url: "/assets/aistudio/5_146560e3.jpeg",
      title: "Birthday Queen ✨",
      caption: "Wishing you a year packed with infinite giggles, dreamy skies, and all your favorite treats.",
      date: "Today & Always",
      tag: "Celebration"
    }
  ],
  memoryVideos: [
    {
      id: "video-1",
      url: "/assets/aistudio/main_vid_73967956.mp4",
      title: "Birthday Memories & Moments 🎬",
      caption: "The precious unposed clips and goofy moments that make you truly one of a kind.",
      poster: "/assets/aistudio/1_baff2301.jpeg",
      duration: "1:36"
    }
  ],

  // Background Music
  birthdayMusic: "/assets/music/birthday-song.mp3",

  // Scene 6: Apology Letter & Flynn Rider Arrest-Warrant Joke
  flynnRider: "/assets/characters/flynn-rider.webp",
  apologyEnvelope: "/assets/objects/apology-envelope.png",
  envelopeCat: "/assets/cats/envelope-cat.png",
  sadCat: "/assets/cats/sad-cat.webp",
  heartHugCat: "/assets/cats/heart-hug-cat.png",
  celebrationCat: "/assets/cats/happy-cat.webp",
  policeCat: "/assets/cats/police-cat.png",
  huggingCats: "/assets/cats/hugging-cats.png",

  // Subtle Sound Effects (with Web Audio synth fallbacks built-in!)
  sounds: {
    giftOpen: "/assets/sounds/gift-open.mp3",
    sparkle: "/assets/sounds/sparkle.mp3",
    rocketLaunch: "/assets/sounds/rocket.mp3",
    pop: "/assets/sounds/pop.mp3",
    shutter: "/assets/sounds/shutter.mp3"
  }
};

/**
 * ASSET MANIFEST TABLE FOR EASY REFERENCE
 */
export interface AssetManifestEntry {
  assetKey: string;
  expectedFilename: string;
  scene: string;
  recommendedFormat: string;
  optional: boolean;
  multiple: boolean;
  description: string;
}

export const assetManifest: AssetManifestEntry[] = [
  {
    assetKey: "openingCat",
    expectedFilename: "public/assets/cats/opening-cat.png",
    scene: "Scene 1 (Gift Box)",
    recommendedFormat: "PNG with transparent background or GIF",
    optional: false,
    multiple: false,
    description: "Cute welcoming cat beside the gift with the instruction speech bubble."
  },
  {
    assetKey: "giftBoxCat",
    expectedFilename: "public/assets/cats/box-cat.png",
    scene: "Scene 1 (Gift Box)",
    recommendedFormat: "PNG with transparent background or GIF",
    optional: false,
    multiple: false,
    description: "Cat peeking out of or around the present."
  },
  {
    assetKey: "birthdayDecorations",
    expectedFilename: "public/assets/cats/cat-01.png, cat-02.png...",
    scene: "Scene 1 & Finale",
    recommendedFormat: "PNG or GIF",
    optional: true,
    multiple: true,
    description: "Celebratory cats dancing around the Happy Birthday greeting."
  },
  {
    assetKey: "catAstronaut",
    expectedFilename: "public/assets/cats/cat-astronaut.png",
    scene: "Scene 2 (Rocket to KIIT)",
    recommendedFormat: "PNG with transparent background or SVG",
    optional: true,
    multiple: false,
    description: "Cute cat pilot inside the rocket cockpit."
  },
  {
    assetKey: "heartPhoto",
    expectedFilename: "public/assets/photos/heart-photo.jpg",
    scene: "Scene 3 (Heart Photo & Teasing)",
    recommendedFormat: "JPG or PNG (photo of girl making heart shape with hands)",
    optional: false,
    multiple: false,
    description: "The primary personal photo where she makes heart hands."
  },
  {
    assetKey: "studioBackdrop",
    expectedFilename: "public/assets/backgrounds/studio-backdrop.jpg",
    scene: "Scene 4 (Photo Studio)",
    recommendedFormat: "JPG or WebP",
    optional: true,
    multiple: false,
    description: "Clean photo studio backdrop with seamless paper and lighting."
  },
  {
    assetKey: "studioMonster",
    expectedFilename: "public/assets/characters/studio-monster.gif",
    scene: "Scene 4 (Studio Monster)",
    recommendedFormat: "GIF or animated PNG",
    optional: true,
    multiple: false,
    description: "Cute, fluffy pastel monster who peeks, runs forward, and presents ice cream."
  },
  {
    assetKey: "iceCream",
    expectedFilename: "public/assets/objects/ice-cream.png",
    scene: "Scene 4 (Interactive Ice Cream)",
    recommendedFormat: "PNG with transparent background or SVG",
    optional: false,
    multiple: false,
    description: "Magical glowing birthday ice cream button that unlocks Scene 5."
  },
  {
    assetKey: "birthdayMemoryVideo",
    expectedFilename: "public/assets/videos/birthday-memory.mp4",
    scene: "Scene 5 (Memory Scene)",
    recommendedFormat: "MP4 (H.264)",
    optional: false,
    multiple: false,
    description: "The central memory video shown during the scrapbook experience."
  },
  {
    assetKey: "flynnRider",
    expectedFilename: "public/assets/characters/flynn-rider.webp",
    scene: "Scene 6 (Apology & Arrest-Warrant Joke)",
    recommendedFormat: "WebP / PNG (Flynn Rider from Tangled expression)",
    optional: false,
    multiple: false,
    description: "The iconic Flynn Rider expression shown during the arrest warrant comedy sequence."
  }
];
