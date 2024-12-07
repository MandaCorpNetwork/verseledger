import { IRadioSource, radioSources } from '@CommonLegacy/Definitions/RadioSources';
import { useRadio } from '@Utils/Hooks/useRadio';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface AudioContextProps {
  currentStation: IRadioSource;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  nextStation: () => void;
  previousStation: () => void;
  currentStationSource: number;
  volume: number;
  setVolume: (newVolume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const audioControls = useRadio(radioSources[0].url);

  useEffect(() => {
    const currentSource = radioSources[audioControls.currentStationSource];
    setCurrentStation(currentSource);
  }, [audioControls.currentStationSource]);

  const [currentStation, setCurrentStation] = useState(radioSources[0]);

  return (
    <AudioContext.Provider value={{ ...audioControls, currentStation }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useRadioController = () => {
  return useContext(AudioContext) as AudioContextProps;
};
