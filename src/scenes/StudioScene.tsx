import React, { useState } from 'react';
import { PhotographyStudio } from '../components/PhotographyStudio';

interface StudioSceneProps {
  onIceCreamSelected: () => void;
}

export const StudioScene: React.FC<StudioSceneProps> = ({ onIceCreamSelected }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleIceCreamTap = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onIceCreamSelected();
    }, 700);
  };

  return (
    <div className="relative w-full min-h-[90vh] max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <PhotographyStudio onIceCreamSelected={handleIceCreamTap} />

      {/* Expanding Soft Pink Circular Reveal Transition to Finale */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF6FA5] via-[#F7A8C4] to-[#FFFDFE] animate-ping scale-[35] transition-all duration-700 ease-out" />
        </div>
      )}
    </div>
  );
};
