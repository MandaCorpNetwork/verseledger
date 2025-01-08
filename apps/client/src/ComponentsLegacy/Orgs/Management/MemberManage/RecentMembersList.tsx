import { useSoundEffect } from '@Audio/AudioManager';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { ListSelectButton } from '@Common/Components/Core/Buttons/ListSelectButton';
import { DoubleArrow } from '@mui/icons-material';
import { IconButton, List, Typography } from '@mui/material';
import React from 'react';

export const RecentMemberManageList: React.FC = () => {
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
  const [timespan, setTimespan] = React.useState<'hour' | 'week' | 'month'>('hour');
  const handleTimeSpanChange = React.useCallback(
    (value: 'hour' | 'week' | 'month') => {
      setTimespan((prev) => {
        if (prev === value) {
          sound.playSound('denied');
          return prev;
        }
        sound.playSound('clickMain');
        return value;
      });
    },
    [sound],
  );
  return (
    <FeatureDisplay
      data-testid="OrgManager-PanelDisplay-MemberManagement__Recents_Wrapper"
      sx={{ p: '0.5em 1em' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'text.disabled',
          }}
        >
          Recents
        </Typography>
        <List sx={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
          <ListSelectButton
            selected={timespan === 'hour'}
            onClick={() => handleTimeSpanChange('hour')}
          >
            24 Hours
          </ListSelectButton>
          <ListSelectButton
            selected={timespan === 'week'}
            onClick={() => handleTimeSpanChange('week')}
          >
            1 Week
          </ListSelectButton>
          <ListSelectButton
            selected={timespan === 'month'}
            onClick={() => handleTimeSpanChange('month')}
          >
            1 Month
          </ListSelectButton>
        </List>
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
    </FeatureDisplay>
  );
};
