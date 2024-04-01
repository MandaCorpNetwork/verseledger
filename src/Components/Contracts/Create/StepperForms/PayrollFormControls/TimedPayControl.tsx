import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from '@mui/material';

export const TimedPayControl: React.FC = () => {
  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<TextField />} label="Default Pay" />
        <FormLabel>Pay Rate</FormLabel>
        <RadioGroup>
          <FormControlLabel control={<Radio />} label="Hourly" value="Hourly" />
          <FormControlLabel control={<Radio />} label="Daily" value="Daily" />
          <FormControlLabel control={<Radio />} label="Weekly" value="Weekly" />
        </RadioGroup>
        <FormControlLabel control={<Switch />} label="Allow Bargaining" />
      </FormControl>
    </Box>
  );
};
