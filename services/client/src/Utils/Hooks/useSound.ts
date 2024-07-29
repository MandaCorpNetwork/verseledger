import { useContext } from 'react';

import { SoundEffectContext } from '@/SoundEffectProvider';

export const useSound = () => {
  const context = useContext(SoundEffectContext);
  if (context === undefined) {
    throw new Error('Sounds must be used within SoundEffectProvider');
  }
  return context.playSound;
};
