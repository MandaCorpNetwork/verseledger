import { soundEffectPacks } from '@Common/Definitions/SoundEffectOptions';
import { Howl } from 'howler';
import React, { useEffect, useRef, useState } from 'react';

import { Logger } from './Logger';

export const useSound = (
  initialPack: keyof typeof soundEffectPacks = 'systemDefault',
  userPackName?: keyof typeof soundEffectPacks,
) => {
  const [currentSoundPack, setCurrentSoundPack] = useState<SoundPack>(
    soundEffectPacks[initialPack].pack,
  );
  const howlsRef = useRef<{ [key in ISounds]?: Howl }>({});

  useEffect(() => {
    const packToUse = userPackName ?? initialPack;
    Logger.info('Initializing sound effects... Current pack:', packToUse);

    Object.values(howlsRef.current).forEach((howl) => howl.unload());

    const newHowls: { [key in ISounds]?: Howl } = {};
    const selectedPack = soundEffectPacks[packToUse].pack;
    (Object.keys(selectedPack) as ISounds[]).forEach((soundType) => {
      const soundSrc = selectedPack[soundType];
      newHowls[soundType] = new Howl({
        src: Array.isArray(soundSrc) ? soundSrc : [soundSrc],
        html5: false,
      });
    });
    howlsRef.current = newHowls;
    setCurrentSoundPack(selectedPack);
    return () => {
      Logger.info('Cleaning up sound effects...');
      Object.values(howlsRef.current).forEach((howl) => howl.unload());
    };
  }, [userPackName, initialPack]);

  const playSound = React.useCallback(
    (soundType: ISounds) => {
      if (howlsRef.current[soundType]) {
        howlsRef.current[soundType].play();
      } else {
        Logger.error(`SoundEffect: ${soundType} not found in`, currentSoundPack);
      }
    },
    [howlsRef.current, currentSoundPack],
  );

  const switchSoundPack = React.useCallback(
    (packName: keyof typeof soundEffectPacks) => {
      if (soundEffectPacks[packName]) {
        setCurrentSoundPack(soundEffectPacks[packName].pack);
        Logger.info(`Sound pack switched to: ${packName}`);
      } else {
        Logger.error(`SoundEffect: ${packName} not found`);
      }
    },
    [soundEffectPacks, setCurrentSoundPack],
  );

  return React.useMemo(
    () => ({
      playSound,
      switchSoundPack,
      currentSoundPack,
    }),
    [currentSoundPack, playSound, switchSoundPack],
  );
};
