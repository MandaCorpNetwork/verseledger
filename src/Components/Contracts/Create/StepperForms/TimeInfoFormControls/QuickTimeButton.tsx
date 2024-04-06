import { Button } from '@mui/material';

type QuickTimeButtonProps = {
  time: string;
};

// QuickTimeButton Component needs to switch to color: 'secondary.main' & backgroundColor: 'primary.dark' when selected & disabled when SelectTime is used
export const QuickTimeButton: React.FC<QuickTimeButtonProps> = ({ time }) => {
  return (
    <Button
      variant="contained"
      sx={{
        ml: '.3em',
        mr: '.3em',
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: 'secondary.main',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        color: 'text.secondary',
      }}
    >
      {time}
    </Button>
  );
};
