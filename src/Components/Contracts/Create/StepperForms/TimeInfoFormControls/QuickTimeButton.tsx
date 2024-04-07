import { Button } from '@mui/material';

type QuickTimeButtonProps = {
  time: string;
  onClick: () => void;
  isSelected: boolean;
  isManual: boolean;
};

// QuickTimeButton Component needs to switch to color: 'secondary.main' & backgroundColor: 'primary.dark' when selected & disabled when SelectTime is used
export const QuickTimeButton: React.FC<QuickTimeButtonProps> = ({
  time,
  onClick,
  isSelected,
  isManual,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        ml: '.3em',
        mr: '.3em',
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: isSelected ? 'secondary.dark' : 'secondary.main',
        fontWeight: 'bold',
        backgroundColor: isSelected ? 'rgba(0, 8, 52, 0.01)' : 'primary.dark',
        color: isSelected ? 'text.secondary' : 'secondary.main',
        '&:disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.01)',
          borderColor: 'secondary.dark',
        },
      }}
      disabled={isManual}
    >
      {time}
    </Button>
  );
};
