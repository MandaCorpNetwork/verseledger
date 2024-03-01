import { Box, TextField, Typography } from '@mui/material';

export const ParticipationPoolControl: React.FC = () => {
  return (
    <Box>
      <Typography>Pecentage decided by the time contractor spends on payroll</Typography>
      <TextField
        label="Expected Pay"
        InputProps={{ readOnly: true }}
        defaultValue="No Expectation"
      />
    </Box>
  );
};
