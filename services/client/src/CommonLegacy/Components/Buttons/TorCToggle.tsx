import { useSoundEffect } from '@Audio/AudioManager';
import { RecentActors, TableChart } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type React from 'react';

type CardorTableViewToggleProps = {
  onChange: (view: 'card' | 'table') => void;
  view: 'card' | 'table';
  disabled?: boolean;
};

export const CardorTableViewToggle: React.FC<CardorTableViewToggleProps> = ({
  onChange,
  view,
  disabled,
}) => {
  const sound = useSoundEffect();
  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    view: 'card' | 'table',
  ) => {
    sound.playSound('loading');
    if (view !== null) {
      onChange(view);
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
          bgcolor: 'action.disabledBackground',
          '&:hover': {
            color: 'text.secondary',
          },
        },
        '& .MuiToggleButton-root.Mui-selected': {
          color: 'secondary.main',
          bgcolor: 'primary.main',
          '&:hover': {
            color: 'secondary.light',
          },
        },
      }}
    >
      <ToggleButton value="card" disabled={disabled}>
        <RecentActors
          sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
        />
      </ToggleButton>
      <ToggleButton value="table" disabled={disabled}>
        <TableChart
          sx={{ '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
