import React from 'react';
import { RocketAnimation } from '../components/RocketAnimation';

interface RocketSceneProps {
  onRocketCrashComplete: () => void;
}

export const RocketScene: React.FC<RocketSceneProps> = ({ onRocketCrashComplete }) => {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center py-6">
      <RocketAnimation onCollisionComplete={onRocketCrashComplete} />
    </div>
  );
};
