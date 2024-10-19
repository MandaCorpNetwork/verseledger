import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import {
  ExpandIconButton,
  ProfileBackgroundDisplay,
} from '@Common/Components/Boxes/ProfileBackgroundDisplay';
import { userBackgroundOptions } from '@Common/Definitions/Users/UserBackgrounds';
import { OpenInFull } from '@mui/icons-material';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { updateUserSettings } from '@Redux/Slices/Auth/Actions/updateUserSettings.action';
import { selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { Logger } from '@Utils/Logger';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { IUpdateUserSettingsCMD } from 'vl-shared/src/schemas/UserSettings';

/**
 * ### Profile Settings
 * @description
 * This is the component displayed when Profile is selected in the UserSettings.
 * Allows users to change displayable content on their User Page and User Card
 * #### Function Components
 * #### Styled Components
 */
export const ProfileSettings: React.FC = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  /// LOGIC
  const userSettings = useAppSelector(selectUserSettings);

  const currentBackground = userSettings?.userPageImage ?? userBackgroundOptions[0].value;

  const currentBackgroundURL = userBackgroundOptions.find(
    (option) => option.value === currentBackground,
  )?.url;

  const handleProfileBackgroundChange = (event: SelectChangeEvent<string>) => {
    const newProfileBackground = event.target.value;

    const updatePayload: IUpdateUserSettingsCMD = {
      userPageImage: newProfileBackground,
    };

    dispatch(updateUserSettings(updatePayload))
      .then(() => {
        enqueueSnackbar('Profile background updated successfully', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar('Failed to update profile background', {
          variant: 'error',
        });
        Logger.error('Failed to update profile background', error);
      });
  };
  return (
    <GlassBox
      data-testid="ProfileSettings__Container"
      sx={{ minHeight: '100%', minWidth: '100%', p: '2em' }}
    >
      <Typography
        data-testid="ProfileSettings__Title"
        variant="h5"
        sx={{ fontWeight: 'bold', textShadow: '0 0 7px rgba(24,252,252,.8)' }}
      >
        Profile Settings
      </Typography>
      <Box
        data-testid="ProfileSettings__Settings_Wrapper"
        sx={{ display: 'flex', m: '5%' }}
      >
        <DigiBox
          data-testid="ProfileSettings-Settings__ProfileBackground_Container"
          sx={{ p: '.5em' }}
        >
          <Typography
            data-testid="ProfileSettings-Settings-ProfileBackground__Title"
            variant="overline"
            sx={{ color: 'text.secondary' }}
          >
            Profile Background
          </Typography>
          <Divider />
          <Box
            data-testid="SoundSettings-Settings-SoundEffects__List_Wrapper"
            sx={{
              p: '.5em',
              mt: '.5em',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <FormControl>
              <InputLabel color="secondary">Profile Background</InputLabel>
              <Select
                size="small"
                color="secondary"
                label="Profile Background"
                autoWidth
                value={currentBackground}
                onChange={handleProfileBackgroundChange}
                MenuProps={{
                  sx: {
                    maxHeight: '50%',
                  },
                  PaperProps: {
                    sx: {
                      '&::-webkit-scrollbar': {
                        width: '5px',
                        height: '5px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'rgb(0,73,130)',
                        borderRadius: '10px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        borderRadius: '20px',
                        background: 'rgb(24,252,252)',
                      },
                    },
                  },
                }}
              >
                {userBackgroundOptions.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <ProfileBackgroundDisplay
              sx={{
                backgroundImage: `url(${currentBackgroundURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <ExpandIconButton>
                <OpenInFull className="expand-icon" />
              </ExpandIconButton>
            </ProfileBackgroundDisplay>
          </Box>
        </DigiBox>
      </Box>
    </GlassBox>
  );
};
