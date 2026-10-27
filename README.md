# 🎀 Birthday Surprise Website — Asset Replacement Guide

Welcome to the **Magical Birthday Surprise Adventure**! This website was engineered to let you customize every photo, video, cat sticker, monster, and song simply by swapping files in the `public/` folder, **without touching any code**.

---

## 📁 Folder Structure for Assets

```text
public/
  assets/
    cats/            # Cat stickers, GIFs, astronauts, angry cat, throwing cat, police cat
    characters/      # Studio monster, Flynn Rider (Tangled) image
    photos/          # Personal memory photos & heart-hand photo
    videos/          # Candid MP4 memory videos
    music/           # Background song (MP3)
    objects/         # Ice cream, apology envelope
    backgrounds/     # Photography studio backdrop
    sounds/          # Sound effects (optional)
```

---

## 🎯 Asset Replacement Cheat-Sheet

| Asset Name | Target File Path | Recommended Format | What it is |
| :--- | :--- | :--- | :--- |
| **Flynn Rider** | `public/assets/characters/flynn-rider.webp` | WebP / PNG / JPG | **Scene 6 Comedy** — The Tangled Flynn Rider image for the arrest warrant gag! |
| **Heart-Hand Photo** | `public/assets/photos/heart-photo.jpg` | JPG / PNG | **Scene 3 Photo** — The girl making the heart shape with her hands. |
| **Opening Cat** | `public/assets/cats/opening-cat.png` | PNG (transparent) / GIF | **Scene 1 Cat** — Sitting beside the gift box with speech bubble. |
| **Box Cat** | `public/assets/cats/box-cat.png` | PNG (transparent) / GIF | **Scene 1 Cat** — Peeking around the gift box. |
| **Birthday Cats** | `public/assets/cats/cat-01.png`, `cat-02.png` | PNG / GIF | **Scene 1 & 5** — Celebratory cats dancing around. |
| **Cat Astronaut** | `public/assets/cats/cat-astronaut.png` | PNG / GIF / SVG | **Scene 2 Rocket Pilot** — Cat flying the rocket towards KIIT. |
| **Angry Cat** | `public/assets/cats/angry-cat.gif` | GIF / PNG | **Scene 3 Cat** — Annoyed cat ("EXCUSE ME, MADAM?! 😾"). |
| **Throwing Cat** | `public/assets/cats/throwing-cat.gif` | GIF / animated PNG | **Scene 3 Gag** — Affectionately tossing into fluffy clouds. |
| **Studio Monster** | `public/assets/characters/studio-monster.gif` | GIF / animated PNG | **Scene 4 Monster** — Cute creature presenting the ice cream. |
| **Studio Backdrop**| `public/assets/backgrounds/studio-backdrop.jpg` | JPG / WebP | **Scene 4 Studio** — Seamless photo studio background. |
| **Magic Ice Cream** | `public/assets/objects/ice-cream.png` | PNG / SVG | **Scene 4 Ice Cream** — Clickable interactive ice cream button. |
| **Police Cat** | `public/assets/cats/police-cat.png` | PNG / GIF | **Scene 6 Officer** — Officer kitty with the Wanted arrest warrant. |
| **Hugging Cats** | `public/assets/cats/hugging-cats.png` | PNG / GIF | **Scene 6 Finale** — Two cats sharing the final virtual hug. |
| **Memory Photos** | `public/assets/photos/memory-1.jpg`, etc. | JPG / PNG / WebP | **Scene 5 Scrapbook Photos** — Personal gallery memories. |
| **Memory Videos** | `public/assets/videos/memory-video-1.mp4` | MP4 | **Scene 5 Candid Videos** — Memory video clips with player. |
| **Birthday Song** | `public/assets/music/birthday-song.mp3` | MP3 / M4A / AAC | **Soundtrack** — Plays with the floating music player! |

---

## 📸 Step-by-Step Replacement Instructions

### 1. Placing the Flynn Rider Image (Scene 6 Arrest Warrant Joke)
1. Save your Flynn Rider image file as `flynn-rider.webp`.
2. Move it to:
   `public/assets/characters/flynn-rider.webp`
3. Reload the page — during the arrest warrant section, your exact Flynn Rider image will animate onto the screen with the speech bubbles *"YOUR HONOUR, I CAN EXPLAIN. 😭"*, *"I WAS BUSY MISSING HER, OKAY?! 👉👈"*, and *"PLEASE DON'T ISSUE THE WARRANT, MADAM. I'M INNOCENT. 💀🎀"*!

### 2. Replacing Madam's Heart Photo (Scene 3)
1. Find your favorite photo of her making heart hands.
2. Rename your photo file to `heart-photo.jpg`.
3. Copy it into `public/assets/photos/heart-photo.jpg`.

### 3. Adding / Customizing Memory Scrapbook Photos (Scene 5)
1. Drop photos into `public/assets/photos/` with filenames like `memory-1.jpg`, `memory-2.jpg`, etc.
2. Customize captions in `src/config/birthdayAssets.ts`.

---

## 🛡️ Built-in Graceful Fallbacks

- **Zero broken icons**: If any image is absent or still loading, the app automatically renders handcrafted pastel vector illustrations.
- **Audio compliance**: Music never autoplays jarringly; includes a music-box chime melody fallback.
- **Responsive**: Full mobile & touch support for all interactions.

Have the best time celebrating! 🎀✨
