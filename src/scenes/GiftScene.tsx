import React from 'react';
import { GiftBox } from '../components/GiftBox';

interface GiftSceneProps {
  onOpenUniverse: () => void;
}

export const GiftScene: React.FC<GiftSceneProps> = ({ onOpenUniverse }) => {
  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-center py-4 select-none">
      {/* Opening scene contains ONLY the mysterious gift box and cat, no birthday text */}
      <GiftBox onIgniteRocket={onOpenUniverse} />
    </div>
  );
};
