import { Logger } from '@Utils/Logger';
import React, { createContext, PropsWithChildren, useState } from 'react';

interface SoundEffectContextProps {
  playSound: (soundType: keyof ISounds) => void;
  updateSoundEffects: (soundType: keyof ISounds, newSrc: string) => void;
}

export const SoundEffectContext = createContext<SoundEffectContextProps | undefined>(
  undefined,
);

const systemDefaultSounds: ISounds = {
  close: new Audio('./Assets/Sounds/System/sysClose.wav'),
  denied: new Audio('./Assets/Sounds/Anvil/anvilDenied.wav'),
  error: new Audio('./Assets/Sounds/Anvil/anvilError.wav'),
  generalNotify: new Audio('./Assets/Sounds/Anvil/anvilGeneralNotify.wav'),
  loading: new Audio('./Assets/Sounds/Anvil/anvilLoading.wav'),
  messageNotify: new Audio('./Assets/Sounds/Anvil/anvilMessageNotify.wav'),
  navigate: new Audio('./Assets/Sounds/System/sysNavigate.wav'),
  send: new Audio('./Assets/Sounds/Anvil/anvilSend.wav'),
  success: new Audio('./Assets/Sounds/Anvil/anvilSuccess.wav'),
  toggleOff: new Audio('./Assets/Sounds/Anvil/anvilToggleOff.wav'),
  toggleOn: new Audio('./Assets/Sounds/Anvil/anvilToggleOn.wav'),
  warning: new Audio('./Assets/Sounds/Anvil/anvilWarning.wav'),
  hover: new Audio('./Assets/Sounds/System/sysHover.wav'),
  open: new Audio('./Assets/Sounds/System/sysOpen.wav'),
  clickMain: new Audio('./Assets/Sounds/System/sysPrimaryClick.wav'),
};

export const SoundEffectProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [soundEffectRefs, setSoundEffectRefs] = useState<ISounds>(systemDefaultSounds);

  React.useEffect(() => {
    Object.values(soundEffectRefs).forEach((sound) => {
      sound.load();
    });
  }, [soundEffectRefs]);

  const updateSoundEffects = (soundType: keyof ISounds, newSrc: string) => {
    const updatedSoundRefs = { ...soundEffectRefs };
    updatedSoundRefs[soundType] = new Audio(newSrc);
    setSoundEffectRefs(updatedSoundRefs);
  };

  const playSound = (soundType: keyof ISounds) => {
    const sound = soundEffectRefs[soundType];
    if (sound) {
      sound.play().catch((error) => {
        Logger.error(`Failed to play sound '${soundType}':`, error);
      });
    }
  };

  return (
    <SoundEffectContext.Provider value={{ playSound, updateSoundEffects }}>
      {children}
    </SoundEffectContext.Provider>
  );
};
