import { useSoundEffect } from '@Audio/AudioManager';
import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { DoubleArrow } from '@mui/icons-material';
import { Collapse, IconButton, Typography } from '@mui/material';
import React from 'react';

type BriefingCollapseProps = {
  briefing: string;
};

export const BriefingCollapse: React.FC<BriefingCollapseProps> = ({ briefing }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(true);
  const sound = useSoundEffect();
  const handleExpand = React.useCallback(() => {
    setIsExpanded((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [sound, setIsExpanded]);
  return (
    <ComponentContainer
      data-testid="SelectedContract__BriefingWrapper"
      sx={{
        width: '100%',
        maxWidth: '325px',
        p: '.5em',
        mb: '1em',
      }}
    >
      <ComponentDisplay data-testid="SelectedContract-Briefing__BriefingTitle">
        <Typography variant="body2" sx={{ fontWeight: 'bold', cursor: 'default' }}>
          Briefing
        </Typography>
        <IconButton
          data-testid="AppDockCollapse__Collapse_Button"
          sx={{ position: 'absolute', left: 0, top: 0, p: 0 }}
          onClick={handleExpand}
        >
          <DoubleArrow
            fontSize="small"
            sx={{
              transform: `rotate(${isExpanded ? '-90' : '90'}deg) scale(0.9)`,
              opacity: '0.4',
              filter:
                'drop-shadow(0 0 0 rgba(14,255,255,0.4)) drop-shadow(0 0 5px rgba(14,255,255,0.6)) drop-shadow(0 0 10px rgba(14,255,255,0.5))',
              transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
              '&:hover': {
                transform: `rotate(${isExpanded ? '-90' : '90'}deg) scale(1)`,
                opacity: '1',
              },
            }}
          />
        </IconButton>
      </ComponentDisplay>
      <Collapse in={isExpanded} sx={{ width: '100%' }}>
        <ComponentDisplay
          data-testid="SelectedContract-Briefing__ContentWrapper"
          sx={{
            mx: '5%',
            mt: '.5em',
            maxHeight: '150px',
            p: '.5em',
            overflow: 'auto',
          }}
        >
          <Typography
            data-testid="SelectedContract-Briefing__ContentText"
            variant="paragraph"
            sx={{
              pl: '.5em',
              fontSize: '.85em',
              color: 'text.primary',
            }}
          >
            {briefing}
          </Typography>
        </ComponentDisplay>
      </Collapse>
    </ComponentContainer>
  );
};
