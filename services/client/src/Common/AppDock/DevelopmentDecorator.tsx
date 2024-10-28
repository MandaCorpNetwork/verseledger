import { useSoundEffect } from '@Audio/AudioManager';
import { WorkZoneBar } from '@Common/Components/App/InDevelopment';
import { Button, Portal, Typography } from '@mui/material';
import { POPUP_SUPPORT_DEVELOPMENT } from '@Popups/Support/SupportDev';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

type DevelopDecoratorProps = {
  severityCode: number;
};

export const DevelopDecorator: React.FC<DevelopDecoratorProps> = ({ severityCode }) => {
  const getSeverityType = React.useCallback(() => {
    switch (severityCode) {
      case 1:
      case 2:
      case 3:
        return 'testing';
      case 4:
      case 5:
      case 6:
        return 'construction';
      case 7:
      case 8:
        return 'broken';
      case 9:
      case 10:
      default:
        return 'pending';
    }
  }, [severityCode]);

  const severityType = getSeverityType();

  const getSeverityLabel = React.useCallback(() => {
    switch (severityCode) {
      case 1:
        return 'Final Testing';
      case 2:
        return 'Minor UI Glitches';
      case 3:
        return 'Missing Minor Features';
      case 4:
        return 'Minor Bug Known';
      case 5:
        return 'Missing Features';
      case 6:
        return 'Major Bug Known';
      case 7:
        return 'Critical Bug Known';
      case 8:
        return 'Tool In Development';
      case 9:
        return 'Tool In Planning';
      case 10:
        return 'Placeholder';
      default:
        return;
    }
  }, [severityCode]);

  const severityLabel = getSeverityLabel();

  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const handleClick = React.useCallback(() => {
    sound.playSound('open');
    dispatch(openPopup(POPUP_SUPPORT_DEVELOPMENT));
  }, [sound, dispatch]);

  if (severityCode === 0) {
    return;
  }
  return (
    <>
      <WorkZoneBar severity={severityType} />
      <WorkZoneBar side="bottom" severity={severityType} />
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          top: -18,
          right: 20,
          color: 'text.secondary',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          fontSmooth: 'auto',
          fontWeight: 'bold',
          transform: 'perspective(50em) rotateX(5deg)',
          opacity: '0.8',
        }}
      >
        {severityLabel}
      </Typography>
      {severityCode > 7 && (
        <Portal>
          <Button
            variant="contained"
            size="small"
            sx={{
              display: 'flex',
              position: 'fixed',
              bottom: 0,
              right: 16,
              mb: '1em',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(14,35,141), rgba(8,22,80))',
              boxShadow: '0 5px 10px rgba(0,0,0), inset 0 2px 3px rgba(33,150,243,.2)',
              border: '2px solid rgba(24,252,252,.2)',
              textShadow: '0 3px 6px rgb(0,0,0)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow:
                  '0 8px 16px rgba(0,0,0,.5), inset 0 3px 5px rgba(33,150,243,.4)',
                background: 'linear-gradient(135deg, rgba(8,22,80), rgba(0,1,19))',
                transform: 'translateY(2px)',
              },
            }}
            onClick={handleClick}
          >
            Support Development
          </Button>
        </Portal>
      )}
    </>
  );
};
