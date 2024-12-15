import { Box, keyframes } from '@mui/material';
import type React from 'react';

const stripesTop = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
`;

const stripesBottom = keyframes`
  from {
  background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
`;

const stripesRight = keyframes`
  from {
  background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
`;

const stripesLeft = keyframes`
  from {
  background-position: 0 100%;
  }
  to {
    background-position: 0 0;
  }
`;

type WorkZoneBarProps = {
  side?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
  severity?: 'testing' | 'construction' | 'broken' | 'pending';
  dim?: boolean;
};

export const WorkZoneBar: React.FC<WorkZoneBarProps> = (props) => {
  const {
    side = 'top',
    size = 'small',
    speed = 'normal',
    severity = 'construction',
    dim = true,
  } = props;

  const speedMapping = { slow: '24s', normal: '12s', fast: '6s' };

  const sizeMapping = { small: 4, medium: 12, large: 24 };

  const severityMapping = {
    testing: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 0.6rem,
      gray 0.6rem,
      gray 1.2rem
    )`,
    construction: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 0.6rem,
      orange 0.6rem,
      #fcba03 1.2rem
    )`,
    broken: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 0.6rem,
      red 0.6rem,
      red 1.2rem
    )`,
    pending: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 0.6rem,
      #A0AEC0 0.6rem,
      #CBD5E0 1.2rem
    )`,
  };

  const severityBackground = {
    testing: 'rgba(33,150,243)',
    construction: 'rgba(200,100,15)',
    broken: 'rgba(140,0,0)',
    pending: 'rgba(180, 200, 220, 0.6)',
  };

  const positionMapping = {
    top: {
      top: 0,
      left: 0,
      right: 0,
      height: `${sizeMapping[size]}px`,
      width: 'calc(100% - 10px)',
      mx: 'auto',
    },
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
      height: `${sizeMapping[size]}px`,
      width: 'calc(100% - 10px)',
      mx: 'auto',
    },
    left: { top: 0, bottom: 0, left: 0, width: `${sizeMapping[size]}px`, height: '100%' },
    right: {
      top: 0,
      bottom: 0,
      right: 0,
      width: `${sizeMapping[size]}px`,
      height: '100%',
    },
  };

  const sideAnimationMapping = {
    top: stripesTop,
    bottom: stripesBottom,
    left: stripesLeft,
    right: stripesRight,
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        ...positionMapping[side],
        backgroundImage: severityMapping[severity],
        backgroundSize: '200% 200%',
        animation: `${sideAnimationMapping[side]} ${speedMapping[speed]} linear infinite`,
        bgcolor: severityBackground[severity],
        opacity: dim ? '0.6' : '1',
        borderRadius: '10px',
      }}
    />
  );
};
