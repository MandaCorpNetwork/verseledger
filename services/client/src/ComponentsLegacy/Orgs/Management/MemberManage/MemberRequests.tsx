import { useSoundEffect } from '@Audio/AudioManager';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { DoubleArrow } from '@mui/icons-material';
import { Collapse, IconButton, Typography } from '@mui/material';
import React from 'react';

export const MemberRequests: React.FC = () => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const sound = useSoundEffect();
  const handleExpand = React.useCallback(() => {
    setExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [sound]);
  return (
    <FeatureDisplay
      data-testid="OrgManager-PanelDisplay-MemberManagement-Pending__Requests_Wrapper"
      sx={{ p: '0.5em 1em' }}
    >
      <div
        data-testid="OrgManager-PanelDisplay-MemberManagement-Pending-Requests__Title_Wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          data-testid="OrgManager-PanelDisplay-MemberManagement-Pending-Requests__Title"
          variant="h6"
          sx={{
            color: 'text.disabled',
          }}
        >
          Requests
        </Typography>
        <IconButton
          data-testid="OrgManager-PanelDisplay-MemberManagement-Pending-Requests__Expand_Button"
          onClick={handleExpand}
        >
          <DoubleArrow
            fontSize="medium"
            sx={{
              transform: `rotate(${expanded ? '-90' : '90'}deg) scale(0.9)`,
              opacity: '0.4',
              filter:
                'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
              transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
              '&:hover': {
                transform: `rotate(${expanded ? '-90' : '90'}deg) scale(1)`,
                opacity: '1',
              },
            }}
          />
        </IconButton>
      </div>
      <Collapse in={expanded}>
        <Typography>No Requests</Typography>
      </Collapse>
    </FeatureDisplay>
  );
};
