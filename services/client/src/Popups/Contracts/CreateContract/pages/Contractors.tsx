import { UserSearch } from '@Common/Components/App/UserSearch';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { UserChip } from '@Common/Components/Chips/UserChip';
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
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

import { SmallEmergencyOverlay } from '../EmergencyOverlay';

export const Contractors: React.FC<{
  formData: Partial<ICreateContractBody>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ICreateContractBody>>>;
  invites: Array<User>;
  setInvites: React.Dispatch<React.SetStateAction<Array<User>>>;
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

  const handleUserInvite = React.useCallback(
    (selectedUser: User | null) => {
      if (selectedUser) {
        if (selectedUser.id === currentUser?.id) {
          enqueueSnackbar({
            variant: 'error',
            message: 'You cannot invite yourself',
          });
          return;
        }
        const userExists = invites.some((user) => user.id === selectedUser.id);
        if (userExists) {
          enqueueSnackbar({
            variant: 'error',
            message: 'User already invited',
          });
          return;
        }
        setInvites((invites) => [...invites, selectedUser]);
      }
    },
    [setInvites, invites],
  );

  const handleRemoveInvite = React.useCallback(
    (userId: string) => {
      setInvites((invites) => invites.filter((user) => user.id !== userId));
    },
    [setInvites],
  );

  const currentUser = useAppSelector(selectCurrentUser);

  const handleMaxContractorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = filterNumericInput(event.target.value);
    setFormData((formData) => ({
      ...formData,
      contractorLimit: +filteredValue,
    }));
  };

  const getFilteredValue = () => {
    if (formData.contractorLimit === 0 || formData.contractorLimit === undefined) {
      return '';
    }
    return filterNumericInput(formData.contractorLimit.toString());
  };

  const filterNumericInput = (input: string) => {
    const invalidCharacters = input.match(/\D+/g);

    if (invalidCharacters) {
      enqueueSnackbar('Please only use numbers', { variant: 'error' });
    }
    // Filter out non-numeric characters
    return input.replace(/[^\d]/g, '');
  };

  return (
    <Box
      data-testid="Contractors__Form_Container"
      sx={{ mt: '2em', width: '100%', minHeight: '150px' }}
    >
      <FormControl
        data-testid="Contractors__Form_Wrapper"
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
      >
        <Box
          data-testid="Contractors-Form__Fields_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Box
            data-testid="Contractors-Form__Invite_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <FormLabel color="secondary" sx={{ mb: '1em' }}>
              Invite Contractors
            </FormLabel>
            <UserSearch
              width="200px"
              size="small"
              color="secondary"
              onUserSelect={handleUserInvite}
            />
            <PopupFormDisplay
              data-testid="ContractorsForm-Invite__InviteListContainer"
              sx={{
                flexDirection: 'column',
                mt: '1em',
                p: '.5em',
              }}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
              >
                Invited Contractors
              </Typography>
              <Box
                data-testid="ContractorsForm-Invite__InviteListWrapper"
                sx={{
                  flexDirection: 'column',
                  maxHeight: '100px',
                  overflowY: 'auto',
                  p: '.5em',
                  '&::-webkit-scrollbar': {
                    width: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgb(8, 29, 68)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '20px',
                    background: 'rgb(121, 192, 244, .5)',
                  },
                }}
              >
                {invites.length > 0 ? (
                  invites.map((invitee) => (
                    <Box key={invitee.id}>
                      <UserChip
                        user_id={invitee.id}
                        size="small"
                        onDelete={() => handleRemoveInvite(invitee.id)}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" align="center" sx={{ color: 'gray' }}>
                    No Invites
                  </Typography>
                )}
              </Box>
            </PopupFormDisplay>
          </Box>
          <Box
            data-testid="Contractors-Form__Settings_Wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <FormLabel color="secondary" sx={{ mb: '1em' }}>
              Contractor Settings
            </FormLabel>
            {formData.isEmergency && <SmallEmergencyOverlay />}
            <Box
              data-testid="Contractors-Form-Settings__Fields_Wrapper"
              sx={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <TextField
                data-testid="ContractorsForm-Settings__MaxContractors"
                label="Max Contractors"
                color="secondary"
                size="small"
                variant="filled"
                type="string"
                value={getFilteredValue()}
                onChange={handleMaxContractorInput}
                error={formData.contractorLimit === 0}
                helperText={formData.contractorLimit === 0 ? 'Minimum of 1' : ''}
                sx={{
                  width: '125px',
                  mb: '1em',
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
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
              />
              <FormControlLabel
                data-testid="ContractorsForm-Settings__RatingSwitch"
                control={
                  <Switch
                    color="secondary"
                    size="small"
                    disabled={formData.isEmergency}
                  />
                }
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
                onChange={(_e, newValue) => {
                  setFormData((formData) => ({
                    ...formData,
                    ratingLimit: newValue ?? 0,
                  }));
                }}
              />
              {/*
              Need to add an option in the backend allowing bidding after deadline defaulted to false
              <Box>
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
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};
