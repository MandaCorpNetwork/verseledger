import { radioSources } from '@Common/Definitions/RadioSources';
import { useEffect, useRef, useState } from 'react';

//Attempted to use GainNode but ran into a CORS issue

interface RadioControls {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  nextStation: () => void;
  previousStation: () => void;
  currentStationSource: number;
  setVolume: (newVolume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
}

export const useRadio = (url: string): RadioControls => {
  const [currentStationSource, setCurrentStationSource] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(15);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio(url));

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const nextStation = () => {
    setCurrentStationSource((prevIndex) => (prevIndex + 1) % radioSources.length);
  };

  const previousStation = () => {
    setCurrentStationSource(
      (prevIndex) => (prevIndex - 1 + radioSources.length) % radioSources.length,
    );
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newVolume = prev ? 30 : 0;
      setVolume(newVolume);
      return !prev;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume / 100;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = radioSources[currentStationSource].url;

    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [currentStationSource, isPlaying]);

  return {
    isPlaying,
    play,
    pause,
    nextStation,
    previousStation,
    setVolume,
    currentStationSource,
    volume,
    isMuted,
    toggleMute,
  };
};
