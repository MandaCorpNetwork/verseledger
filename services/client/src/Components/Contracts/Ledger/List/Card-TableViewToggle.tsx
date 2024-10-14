import { useSoundEffect } from '@Audio/AudioManager';
import { RecentActors, TableChart } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

type CardorTableViewToggleProps = {
  onViewChange: (view: string) => void;
};

export const CardorTableViewToggle: React.FC<CardorTableViewToggleProps> = ({
  onViewChange,
}) => {
  const { playSound } = useSoundEffect();
  const [view, setView] = React.useState('ContractCardView');
  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, view: string) => {
    playSound('toggleOn');
    if (view !== null) {
      setView(view);
      onViewChange(view);
    }
  };
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      onChange={handleViewChange}
      value={view}
      sx={{
        border: '1px solid',
        borderColor: 'success.dark',
        boxShadow: '0 0px 10px rgba(24,252,252,0.5)',
        borderRadius: '5px',
        '&:hover': {
          borderColor: 'primary.main',
        },
        '& .MuiToggleButton-root': {
          color: 'secondary.dark',
          backgroundColor: 'action.disabledBackground',
          '&:hover': {
            color: 'text.secondary',
          },
        },
        '& .MuiToggleButton-root.Mui-selected': {
          color: 'secondary.main',
          backgroundColor: 'primary.main',
          '&:hover': {
            color: 'secondary.light',
          },
        },
      }}
    >
      <ToggleButton value="ContractCardView">
        <RecentActors
          sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
        />
      </ToggleButton>
      <ToggleButton value="ContractTableView">
        <TableChart
          sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
