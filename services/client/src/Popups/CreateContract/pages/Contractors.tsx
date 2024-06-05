import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Rating,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { POPUP_USER_INVITE } from '@Popups/UserInvite/UserInvite';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
export const Contractors: React.FC<{
  formData: IContract;
  setFormData: React.Dispatch<React.SetStateAction<IContract>>;
}> = (props) => {
  //@ts-expect-error unused currently
  const { formData, setFormData } = props; //eslint-disable-line @typescript-eslint/no-unused-vars
  const [ratingDisabled, setRatingDisabled] = React.useState(true);
  const dispatch = useAppDispatch();

  const handleInviteButton = React.useCallback(() => {
    dispatch(openPopup(POPUP_USER_INVITE));
  }, []);

  const handleRatingToggle = React.useCallback(() => {
    setRatingDisabled((ratingDisabled) => !ratingDisabled);
  }, [setRatingDisabled, ratingDisabled]);

  return (
    <Box data-testid="Contractors__Container" sx={{ mt: '1em' }}>
      <Box>
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel color="secondary">Contractor Settings</FormLabel>
            <Box>
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
              <Rating disabled={ratingDisabled} name="read-only" defaultValue={3} />
            </Box>
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
          <Box
            data-testid="ContractorsForm__InviteContainer"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Button
              data-testid="ContractorsForm-Invite__InviteButton"
              onClick={handleInviteButton}
              variant="contained"
              size="small"
              color="secondary"
            >
              Invite Contractor
            </Button>
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
                <Typography variant="body2" align="center" sx={{ color: 'gray' }}>
                  No Invites
                </Typography>
              </Box>
            </Box>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
