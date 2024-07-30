import { soundEffectPacks } from '@Common/Definitions/SoundEffectOptions';
import { useSound } from '@Utils/useAudio';
import { createContext, PropsWithChildren, useContext } from 'react';

interface SoundEffectContextProps {
  playSound: (soundType: ISounds) => void;
  switchSoundPack: (packName: keyof typeof soundEffectPacks) => void;
  currentSoundPack: SoundPack;
}

const SoundEffectContext = createContext<SoundEffectContextProps | undefined>(undefined);

export const SoundEffectProvider: React.FC<
  PropsWithChildren<{
    initialPack?: keyof typeof soundEffectPacks;
  }>
> = ({ children, initialPack = 'systemDefault' }) => {
  const { playSound, switchSoundPack, currentSoundPack } = useSound(initialPack);

  return (
    <SoundEffectContext.Provider value={{ playSound, switchSoundPack, currentSoundPack }}>
      {children}
    </SoundEffectContext.Provider>
  );
};

export const useSoundEffect = () => {
  const context = useContext(SoundEffectContext);
  if (!context) {
    throw new Error('useSoundEffect must be used within a SoundEffectProvider');
  }
  return context;
};
