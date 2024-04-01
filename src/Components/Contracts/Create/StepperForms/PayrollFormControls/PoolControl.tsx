import { Box, FormControl, FormControlLabel, Switch, TextField } from '@mui/material';

export const PoolControl: React.FC = () => {
  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<Switch />} label="Max Percentage" />
        <FormControlLabel control={<Switch />} label="Allow Bargaining" />
        <TextField
          label="Expected Pay"
          InputProps={{ readOnly: true }}
          defaultValue="No Expectation"
        />
      </FormControl>
    </Box>
  );
};
