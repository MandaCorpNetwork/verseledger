import { soundEffectPacks } from '@Common/Definitions/SoundEffectOptions';
import { Logger } from '@Utils/Logger';
import React, { createContext, PropsWithChildren, useState } from 'react';

interface SoundEffectContextProps {
  playSound: (soundType: keyof ISounds) => void;
  updateSoundEffects: (soundType: keyof ISounds, newSrc: string) => void;
  currentSoundPack: AudioPack;
  setSoundPack: (packName: keyof typeof soundEffectPacks) => void;
  customSounds: Partial<ISounds>;
  setCustomSounds: (soundType: keyof ISounds, soundSrc: string) => void;
}

export const SoundEffectContext = createContext<SoundEffectContextProps | undefined>(
  undefined,
);

export const SoundEffectProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [soundEffectRefs, setSoundEffectRefs] = useState<ISounds>(() => {
    return soundEffectPacks.systemDefault.pack;
  });
  const [currentSoundPack, setCurrentSoundPack] = useState<AudioPack>(
    soundEffectPacks.systemDefault,
  );
  const [customSounds, setCustomSounds] = useState<Partial<ISounds>>({});

  React.useEffect(() => {
    const updatedRefs = { ...soundEffectRefs, ...customSounds };
    Object.values(updatedRefs).forEach((sound) => {
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
    } else {
      Logger.error(`Sound '${soundType}' not found.`);
    }
  };

  const setSoundPack = (packName: keyof typeof soundEffectPacks) => {
    const selectedPack = soundEffectPacks[packName];
    setCurrentSoundPack(selectedPack);
    setSoundEffectRefs(selectedPack.pack);
  };

  const handleSetCustomSounds = (soundType: keyof ISounds, soundSrc: string) => {
    setCustomSounds((prevCustomSounds) => ({
      ...prevCustomSounds,
      [soundType]: new Audio(soundSrc),
    }));
  };

  return (
    <SoundEffectContext.Provider
      value={{
        playSound,
        updateSoundEffects,
        currentSoundPack,
        setSoundPack,
        customSounds,
        setCustomSounds: handleSetCustomSounds,
      }}
    >
      {children}
    </SoundEffectContext.Provider>
  );
};
