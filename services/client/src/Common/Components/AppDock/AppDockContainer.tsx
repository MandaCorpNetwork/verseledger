import { useSoundEffect } from '@Audio/AudioManager';
import { DoubleArrow } from '@mui/icons-material';
import { Box, Collapse, IconButton } from '@mui/material';
import React from 'react';

import { AppDock } from './AppDock';

type AppDockContainerProps = {
  sx?: object;
};

export const AppDockContainer: React.FC<AppDockContainerProps> = ({ sx }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
  const { playSound } = useSoundEffect();
  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => {
      if (prev) {
        playSound('close');
      } else {
        playSound('open');
      }
      return !prev;
    });
  }, [playSound, setIsExpanded]);
  return (
    <Box
      data-testid="AppDockCollapse__Wrapper"
      sx={{ position: 'sticky', bottom: 0, px: '5%', ...sx }}
    >
      <IconButton
        data-testid="AppDockCollapse__Collapse_Button"
        sx={{ position: 'absolute', left: '5%', bottom: 0 }}
        onClick={handleExpand}
      >
        <DoubleArrow
          fontSize="large"
          sx={{
            transform: `rotate(${isExpanded ? '90' : '-90'}deg) scale(0.9)`,
            opacity: '0.4',
            filter:
              'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
            transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
            '&:hover': {
              transform: `rotate(${isExpanded ? '90' : '-90'}deg) scale(1)`,
              opacity: '1',
            },
          }}
        />
      </IconButton>
      <Collapse in={isExpanded} sx={{ pb: '5px' }}>
        <AppDock />
      </Collapse>
    </Box>
  );
};
