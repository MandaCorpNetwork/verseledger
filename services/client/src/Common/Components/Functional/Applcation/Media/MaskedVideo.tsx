import { logoThemeMap, videoThemeMap } from '@Common/Definitions/Themes/themeMaps';
import { useTheme } from '@mui/material';
import React from 'react';

type MaskedVideoProps = {
  themeOverride?: ThemeType;
  sx?: object;
};

export const MaskedVideo: React.FC<MaskedVideoProps> = ({ themeOverride, sx }) => {
  const theme = useTheme();
  const videoSource = React.useMemo(() => {
    const themeName = themeOverride ?? theme.themeType ?? 'verseOS';
    return videoThemeMap[themeName];
  }, [theme.themeType, themeOverride]);
  return (
    <video
      data-testid="ThemeVideoLogo"
      preload="auto"
      autoPlay
      playsInline
      loop
      muted
      src={videoSource}
      style={{
        position: 'absolute',
        maskImage: `url(${logoThemeMap.maskLogo})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskType: 'alpha',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        WebkitMaskImage: `url(${logoThemeMap.maskLogo})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        zIndex: 0,
        ...sx,
      }}
    />
  );
};
