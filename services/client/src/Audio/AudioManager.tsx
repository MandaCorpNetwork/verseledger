import { soundEffectPacks } from '@CommonLegacy/DefinitionsLegacy/SoundEffectOptions';
import { useAppSelector } from '@Redux/hooks';
import { selectUserSoundPack } from '@Redux/Slices/Auth/auth.selectors';
import { useSound } from '@Utils/Hooks/useAudio';
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
  const userSoundPack = useAppSelector(selectUserSoundPack);
  const validateUserSoundPack =
    userSoundPack && soundEffectPacks[userSoundPack] ? userSoundPack : 'systemDefault';
  const soundContext = useSound(
    initialPack,
    validateUserSoundPack as keyof typeof soundEffectPacks,
  );

  return (
    <SoundEffectContext.Provider value={soundContext}>
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
