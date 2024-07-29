import { useEffect } from 'react';

import { useSound } from './useSound';

const SoundInitializer = () => {
  const playSound = useSound();
  useEffect(() => {
    const simulateInteraction = () => {
      playSound('loading');
    };

    const initializeSounds = () => {
      playSound('loading');
      simulateInteraction();
    };

    initializeSounds();
  }, [playSound]);
  return null;
};

export default SoundInitializer;
