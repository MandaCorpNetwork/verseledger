import '@Assets/Css/AppDockV3.css';

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Button } from '@mui/material';
import type React from 'react';

type PanelScrollButtonProps = {
  onClick: () => void;
  disabled: boolean;
  direction: 'forward' | 'backward';
};

export const PanelScrollButton: React.FC<PanelScrollButtonProps> = ({
  onClick,
  disabled,
  direction,
}) => {
  const forwardIcon = <ArrowForwardIos fontSize="large" className="DockDirectionIcon" />;
  const backwardIcon = <ArrowBackIosNew fontSize="large" className="DockDirectionIcon" />;
  console.log('Scroll disabled', disabled);

  return (
    <Button
      data-testid={`AppDock-AdvPanel__${direction}_Button`}
      id={`AppDock-AdvPanel__${direction}_Button`}
      className="DockDirectionButton"
      onClick={onClick}
      disabled={disabled}
      size="small"
      sx={[
        {
          minWidth: 0,
          borderRadius: '10px',
          border: '2px outset',
          borderColor: 'rgba(8,22,80)',
          color: 'rgb(33,150,243)',
          transition: 'color 0.1s ease, border 0.1s ease, border-color 0.1s ease',
          '&:hover': {
            color: 'rgb(24,252,252)',
            borderColor: 'rgba(0,183,252,0.8)',
          },
        },
        disabled && {
          borderColor: 'rgba(6,75,145,0.8) !important',
          color: 'rgb(100,100,100) !important',
        },
      ]}
      aria-label={`View the ${direction === 'forward' ? 'next' : 'previous'} Navigation Button`}
      aria-disabled={disabled}
      type="button"
    >
      {direction === 'forward' && forwardIcon}
      {direction === 'backward' && backwardIcon}
    </Button>
  );
};
