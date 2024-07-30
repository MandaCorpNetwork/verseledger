import { soundEffectPacks } from '@Common/Definitions/SoundEffectOptions';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';

import { Logger } from './Logger';

export const useSound = (
  initialPack: keyof typeof soundEffectPacks = 'systemDefault',
) => {
  const [currentSoundPack, setCurrentSoundPack] = useState<SoundPack>(
    soundEffectPacks[initialPack].pack,
  );
  const howlsRef = useRef<{ [key in ISounds]?: Howl }>({});

  useEffect(() => {
    Logger.info('Initializing sound effects... Current pack:', currentSoundPack);

    Object.values(howlsRef.current).forEach((howl) => howl.unload());

    const newHowls: { [key in ISounds]?: Howl } = {};
    (Object.keys(currentSoundPack) as ISounds[]).forEach((soundType) => {
      const soundSrc = currentSoundPack[soundType];
      newHowls[soundType] = new Howl({
        src: Array.isArray(soundSrc) ? soundSrc : [soundSrc],
        html5: false,
      });
    });
    howlsRef.current = newHowls;
    return () => {
      Logger.info('Cleaning up sound effects...');
      Object.values(howlsRef.current).forEach((howl) => howl.unload());
    };
  }, [currentSoundPack]);

  const playSound = (soundType: ISounds) => {
    if (howlsRef.current[soundType]) {
      howlsRef.current[soundType].play();
    } else {
      Logger.error(`SoundEffect: ${soundType} not found in ${currentSoundPack}`);
    }
  };

  const switchSoundPack = (packName: keyof typeof soundEffectPacks) => {
    if (soundEffectPacks[packName]) {
      setCurrentSoundPack(soundEffectPacks[packName].pack);
      Logger.info(`Sound pack switched to: ${packName}`);
    } else {
      Logger.error(`SoundEffect: ${packName} not found`);
    }
  };

  return { playSound, switchSoundPack, currentSoundPack };
};
