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
  Typography,
} from '@mui/material';
import React from 'react';

export const ProfileSettings: React.FC = () => {
  const [currentProfileBackground, setCurrentProfileBackground] = React.useState<string>(
    userBackgroundOptions[0].url,
  );
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
                value={currentProfileBackground}
                onChange={(e) => setCurrentProfileBackground(e.target.value)}
              >
                {userBackgroundOptions.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.url}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <ProfileBackgroundDisplay
              sx={{
                backgroundImage: `url(${currentProfileBackground})`,
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
