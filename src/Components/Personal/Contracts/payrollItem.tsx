import { Backspace } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

type PayrollItemProps = {
  id: number;
  title: string;
  value: number;
};

export const PayrollItem: React.FC<PayrollItemProps> = ({ title, value }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography>{title}</Typography>
      <Typography>{value}</Typography>
      <IconButton>
        <Backspace />
      </IconButton>
    </Box>
  );
};
