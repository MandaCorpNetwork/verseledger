import { settingsStore } from '@/Store/userSettings/settingStore';
import { videoThemeMap } from '@/Definitions/Maps/themes/media';
import { useStore } from '@tanstack/react-store';
import { useMemo } from 'react';

export const BackdropVideo: React.FC = () => {
  const { theme } = useStore(settingsStore);

  const videoSource = useMemo(() => {
    if (theme === 'hexOS' || theme === 'vlTerminal') return '';
    return videoThemeMap[theme] || videoThemeMap.verseOS;
  }, [theme]);
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
