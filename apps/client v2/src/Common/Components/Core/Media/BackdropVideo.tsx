import { settingsStore } from '@/Store/userSettings/settingStore';
import { videoThemeMap } from '@Common/Definitions/maps/themes/media';
import { useStore } from '@tanstack/react-store';
import { useMemo } from 'react';

export const BackdropVideo: React.FC = () => {
  const settings = useStore(settingsStore);

  const videoSource = useMemo(() => {
    return videoThemeMap[settings.theme] || videoThemeMap.verseOS;
  }, [settings.theme]);
  return (
    <video
      preload="auto"
      autoPlay
      playsInline
      loop
      muted
      src={videoSource}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        objectFit: 'cover',
      }}
    />
  );
};
