import React, { useState } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { MusicPlayer } from './components/MusicPlayer';
import { GiftScene } from './scenes/GiftScene';
import { RocketScene } from './scenes/RocketScene';
import { MemoryScene } from './scenes/MemoryScene';
import { StudioScene } from './scenes/StudioScene';
import { FinaleScene } from './scenes/FinaleScene';
import { ApologyScene } from './scenes/ApologyScene';

export type SceneId = 'gift' | 'rocket' | 'memory' | 'studio' | 'finale' | 'apology';

export function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('gift');

  // Progressive cinematic scene sequence
  const handleOpenUniverse = () => {
    setCurrentScene('rocket');
  };

  const handleRocketCrashComplete = () => {
    setCurrentScene('memory');
  };

  const handleNextSurprise = () => {
    setCurrentScene('studio');
  };

  const handleIceCreamSelected = () => {
    setCurrentScene('finale');
  };

  const handleOpenApology = () => {
    setCurrentScene('apology');
  };

  const handleRestartAdventure = () => {
    setCurrentScene('gift');
  };

  const getBackgroundVariant = () => {
    if (currentScene === 'rocket') return 'space';
    if (currentScene === 'studio') return 'studio';
    return 'pink';
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-[#5A3D4D]">
      {/* Dynamic Animated Ambient Background */}
      <AnimatedBackground variant={getBackgroundVariant()} />

      {/* Discreet Top-Right Floating Music Player */}
      <MusicPlayer autoStartTrigger={currentScene === 'finale' || currentScene === 'apology'} />

      {/* Main Full-Screen Cinematic Scene Area (No bottom navigation bar) */}
      <main className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 pb-4">
        {currentScene === 'gift' && (
          <GiftScene onOpenUniverse={handleOpenUniverse} />
        )}

        {currentScene === 'rocket' && (
          <RocketScene onRocketCrashComplete={handleRocketCrashComplete} />
        )}

        {currentScene === 'memory' && (
          <MemoryScene onNextSurprise={handleNextSurprise} />
        )}

        {currentScene === 'studio' && (
          <StudioScene onIceCreamSelected={handleIceCreamSelected} />
        )}

        {currentScene === 'finale' && (
          <FinaleScene onOpenApology={handleOpenApology} />
        )}

        {currentScene === 'apology' && (
          <ApologyScene onRestartAdventure={handleRestartAdventure} />
        )}
      </main>
    </div>
  );
}

export default App;
