import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Rating,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
export const Contractors: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  //@ts-expect-error unused currently
  const { formData, setFormData } = props; //eslint-disable-line @typescript-eslint/no-unused-vars
  return (
    <Box data-testid="Contractors__Container" sx={{ mt: '1em' }}>
      <Box>
        <FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel color="secondary">Contractor Settings</FormLabel>
            <FormControlLabel
              data-testid="ContractorsForm-Settings__RatingSwitch"
              control={<Switch color="secondary" size="small" />}
              label="Limit Rating"
              componentsProps={{
                typography: {
                  variant: 'body2',
                  color: 'text.secondary',
                },
              }}
            />
            <Rating />
            <TextField
              data-testid="ContractorsForm-Settings__MaxContractors"
              label="Max Contractors"
              color="secondary"
              size="small"
              variant="filled"
              sx={{
                width: '150px',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'primary.dark',
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(0, 30, 100, 0.2)',
                  },
                },
              }}
            />
            <FormControlLabel
              control={<Switch color="secondary" size="small" />}
              label="Allow Bidding After Deadline"
              componentsProps={{
                typography: {
                  variant: 'body2',
                  color: 'text.secondary',
                },
              }}
            />
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
