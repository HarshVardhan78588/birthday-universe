import React, { useEffect, useRef } from 'react';
import { birthdayAssets } from '../config/birthdayAssets';

interface MusicPlayerProps {
  autoStartTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const isSynthPlayingRef = useRef(false);
  const synthTimerRef = useRef<number | null>(null);

  // Sweet music box synth melody fallback when MP3 is absent
  const startSynthMelody = () => {
    if (isSynthPlayingRef.current || isPlayingRef.current) return;
    if (typeof window === 'undefined') return;

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // Gentle birthday music box melody notes
    const melody = [
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.35 }, { f: 293.66, d: 0.6 }, { f: 261.63, d: 0.6 },
      { f: 349.23, d: 0.6 }, { f: 329.63, d: 1.1 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.35 }, { f: 293.66, d: 0.6 }, { f: 261.63, d: 0.6 },
      { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.1 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.35 }, { f: 523.25, d: 0.6 }, { f: 440.00, d: 0.6 },
      { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.5 }, { f: 293.66, d: 0.9 },
      { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.35 }, { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 },
      { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.4 }
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!isSynthPlayingRef.current || ctx.state === 'closed') return;

      const note = melody[noteIdx % melody.length];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.f * 2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.d * 1.5);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.025, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + note.d * 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + note.d * 1.6);
      osc2.start(now);
      osc2.stop(now + note.d * 1.3);

      noteIdx++;
      synthTimerRef.current = window.setTimeout(playNextNote, note.d * 920);
    };

    isSynthPlayingRef.current = true;
    isPlayingRef.current = true;
    playNextNote();
  };

  const attemptPlay = () => {
    if (isPlayingRef.current) return;

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          isPlayingRef.current = true;
        })
        .catch(() => {
          // Autoplay was blocked by browser or audio file missing, will resume on interaction
        });
    } else {
      startSynthMelody();
    }
  };

  useEffect(() => {
    // Single shared Audio instance
    const audio = new Audio();
    audio.src = birthdayAssets.birthdayMusic;
    audio.loop = true;
    audio.volume = 0.5; // Comfortable background volume
    audioRef.current = audio;

    const handleAudioError = () => {
      // If external audio file cannot be loaded, fallback to synth melody
      audioRef.current = null;
      if (isPlayingRef.current) {
        startSynthMelody();
      }
    };

    audio.addEventListener('error', handleAudioError);

    // Initial attempt to start playback immediately
    attemptPlay();

    // Universal one-time interaction listeners for when browser policy blocks initial autoplay
    const handleFirstUserGesture = () => {
      if (isPlayingRef.current) {
        removeInteractionListeners();
        return;
      }

      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            isPlayingRef.current = true;
            removeInteractionListeners();
          })
          .catch(() => {
            startSynthMelody();
            removeInteractionListeners();
          });
      } else {
        startSynthMelody();
        removeInteractionListeners();
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    window.addEventListener('click', handleFirstUserGesture, { passive: true });
    window.addEventListener('pointerdown', handleFirstUserGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { passive: true });
    window.addEventListener('keydown', handleFirstUserGesture, { passive: true });

    return () => {
      removeInteractionListeners();
      audio.removeEventListener('error', handleAudioError);
      // Continuous background music: does NOT stop or pause on unmount
    };
  }, []);

  // Invisible continuous audio controller (no pause, stop, or mute controls in the UI)
  return null;
};
