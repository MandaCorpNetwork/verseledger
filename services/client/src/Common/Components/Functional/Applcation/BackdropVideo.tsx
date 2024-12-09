import { videoThemeMap } from '@Common/Definitions/themes';
import { useTheme } from '@mui/material';
import React from 'react';

export const BackdropVideo: React.FC = () => {
  const theme = useTheme();
  const videoSource = React.useMemo(() => {
    const themeName = theme.themeType ?? 'verseOS';
    return videoThemeMap[themeName];
  }, [theme.themeType]);
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
