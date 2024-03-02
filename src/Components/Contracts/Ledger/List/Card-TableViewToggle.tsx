import { RecentActors, TableChart } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

type CardorTableViewToggleProps = {
  onViewChange: (view: string) => void;
};

export const CardorTableViewToggle: React.FC<CardorTableViewToggleProps> = ({
  onViewChange,
}) => {
  const [view, setView] = React.useState('ContractCardView');
  const handleViewChange = (event: React.MouseEvent<HTMLElement>, view: string) => {
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
        '& .MuiToggleButton-root': {
          color: 'primary.main',
          backgroundColor: 'text.disabled',
          '&:hover': {
            color: 'secondary.main',
          },
        },
        '& .MuiToggleButton-root.Mui-selected': {
          color: 'secondary.main',
          backgroundColor: 'secondary.dark',
          '&:hover': {
            color: 'secondary.light',
          },
        },
      }}
    >
      <ToggleButton value="ContractCardView">
        <RecentActors />
      </ToggleButton>
      <ToggleButton value="ContractTableView">
        <TableChart />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
