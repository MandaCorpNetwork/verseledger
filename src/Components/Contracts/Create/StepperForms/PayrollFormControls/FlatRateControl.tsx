import { Box, FormControl, FormControlLabel, Switch, TextField } from '@mui/material';

export const FlatRateControl: React.FC = () => {
  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Default Pay" />
        <FormControlLabel control={<Switch />} label="Allow Bargaining" />
      </FormControl>
    </Box>
  );
};
