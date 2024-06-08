import { UserSearch } from '@Common/Components/App/UserSearch';
import { UserChip } from '@Common/Components/Users/UserChip';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Rating,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

export const Contractors: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
  invites: Array<User>;
  setInvites: (selectedUser: User | null) => void;
}> = (props) => {
  const { formData, setFormData, invites, setInvites } = props;
  const [ratingDisabled, setRatingDisabled] = React.useState(true);

  const handleRatingToggle = React.useCallback(() => {
    setRatingDisabled((ratingDisabled) => !ratingDisabled);
    setFormData((formData) => ({
      ...formData,
      ratingLimit: undefined,
    }));
  }, [setRatingDisabled, ratingDisabled]);

  return (
    <Box data-testid="Contractors__Container" sx={{ mt: '1em' }}>
      <Box>
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
        >
          <Box
            data-testid="ContractorsForm__SettingsWrapper"
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <FormLabel color="secondary">Contractor Settings</FormLabel>
            <Box
              data-testid="ContractorsForm-Settings__RatingWrapper"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                my: '0.5em',
              }}
            >
              <FormControlLabel
                data-testid="ContractorsForm-Settings__RatingSwitch"
                control={<Switch color="secondary" size="small" />}
                label="Limit Rating"
                onChange={handleRatingToggle}
                checked={!ratingDisabled}
                componentsProps={{
                  typography: {
                    variant: 'body2',
                    color: 'text.secondary',
                  },
                }}
              />
              <Rating
                disabled={ratingDisabled}
                name="read-only"
                value={formData.ratingLimit}
                onChange={(e, newValue) => {
                  setFormData((formData) => ({
                    ...formData,
                    ratingLimit: newValue ?? 0,
                  }));
                }}
              />
            </Box>
            <Box
              data-testid="ContractorsForm-Settings__MaxContractorsWrapper"
              sx={{
                mx: 'auto',
                my: '0.5em',
              }}
            >
              <TextField
                data-testid="ContractorsForm-Settings__MaxContractors"
                label="Max Contractors"
                color="secondary"
                size="small"
                variant="filled"
                type="number"
                value={formData.contractorLimit}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    contractorLimit: +e.currentTarget.value ?? 0,
                  });
                }}
                sx={{
                  width: '125px',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'primary.dark',
                    '&.Mui-disabled': {
                      backgroundColor: 'rgba(0, 30, 100, 0.2)',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: '.8em',
                    m: 'auto',
                  },
                }}
              />
            </Box>
            {/* <Box>
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
            </Box> */}
          </Box>
          <Box
            data-testid="ContractorsForm__InviteContainer"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <UserSearch
              width="200px"
              size="small"
              color="secondary"
              onUserSelect={setInvites}
            />
            <Box
              data-testid="ContractorsForm-Invite__InviteListContainer"
              sx={{
                borderTop: '2px solid',
                borderBottom: '2px solid',
                borderColor: 'primary.main',
                borderRadius: '5px',
                mt: '1em',
                p: '.5em',
                ':hover': {
                  borderColor: 'secondary.main',
                },
              }}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
              >
                Invited Contractors
              </Typography>
              <Box data-testid="ContractorsForm-Invite__InviteListWrapper">
                {invites.length > 0 ? (
                  invites.map((invitee) => (
                    <Box key={invitee.id}>
                      <UserChip userid={invitee.id} size="small" />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" align="center" sx={{ color: 'gray' }}>
                    No Invites
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
