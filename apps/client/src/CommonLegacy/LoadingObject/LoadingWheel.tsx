import VLLogo from '@Assets/media/VerseLogos/verselogo-0.png?url';
import { Box, CircularProgress, type SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type React from 'react';

type LoadingWheelProps = {
  testid?: string;
  controlType?: 'determinate' | 'indeterminate';
  logoSize?: number;
  wheelSize?: number;
  boxSX?: SxProps<Theme>;
  logoSX?: SxProps<Theme>;
};

export const LoadingWheel: React.FC<LoadingWheelProps> = (props) => {
  const {
    testid,
    controlType = 'indeterminate',
    logoSize = 23,
    wheelSize = 45,
    boxSX,
    logoSX,
  } = props;
  return (
    <Box
      data-testid={`VLLoading__${testid}__${controlType}`}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        ...boxSX,
      }}
    >
      <svg width={0} height={0}>
        <title>Loading</title>
        <defs>
          <linearGradient id="loadingWheelColor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(24, 252, 252)" />
            <stop offset="100%" stopColor="rgb(14, 49, 141)" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        variant={controlType}
        size={wheelSize}
        sx={{
          position: 'absolute',
          zIndex: '5',
          'svg circle': {
            stroke: 'url(#loadingWheelColor)',
          },
          ...logoSX,
        }}
      />
      <img src={VLLogo} alt="" height={logoSize} style={{ position: 'absolute' }} />
    </Box>
  );
};
