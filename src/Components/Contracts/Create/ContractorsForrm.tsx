import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Rating,
  Switch,
  TextField,
} from '@mui/material';

export const ContractorsForm: React.FC<unknown> = () => {
  return (
    <Box>
      <FormControl>
        <FormControlLabel control={<Switch />} label="Limit Rating" />
        <Rating />
      </FormControl>
      <FormControl>
        <FormControlLabel control={<Switch />} label="Limit Contractors" />
        <TextField></TextField>
      </FormControl>
      <FormControl>
        <Button>Invite Contractors</Button>
        <Box></Box>
      </FormControl>
      <FormControl>
        <FormControlLabel control={<Switch />} label="Allow Bidding After Deadline" />
      </FormControl>
    </Box>
  );
};