import { Button } from '@mui/material';
import type React from 'react';

type QuickTimeButtonProps = {
  time: string;
  onClick: () => void;
};

// QuickTimeButton Component needs to switch to color: 'secondary.main' & bgcolor: 'primary.dark' when selected & disabled when SelectTime is used
export const QuickTimeButton: React.FC<QuickTimeButtonProps> = ({ time, onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        ml: '.3em',
        mr: '.3em',
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: 'secondary.main',
        fontWeight: 'bold',
        bgcolor: 'primary.dark',
        color: 'secondary.main',
      }}
    >
      {time}
    </Button>
  );
};
