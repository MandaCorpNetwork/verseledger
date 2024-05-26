import Spectrum from '@Assets/media/Spectrum.png?url';
import { Discord } from '@Common/CustomIcons';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, IconButton, Rating, Tab, Typography } from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppSelector } from '@Redux/hooks';
import { selectCurrentUser } from '@Redux/Slices/Auth/authSelectors';
import React from 'react';

export const POPUP_PLAYER_CARD = 'playerCard';

export const PlayerCardPopup: React.FC = () => {
  const selectedUser = useAppSelector(selectCurrentUser);
  const [tabValue, setTabValue] = React.useState('orgs');

  const handleTabChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    },
    [tabValue],
  );

  return (
    <VLPopup name={POPUP_PLAYER_CARD} title="">
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Avatar
            src={selectedUser.pfp}
            sx={{ width: 55, height: 55 }}
            alt={selectedUser.handle}
          />
          <Box sx={{ ml: '.5em' }}>
            <Typography align="center">{selectedUser.handle}</Typography>
            <Rating readOnly value={4} />
          </Box>
        </Box>
        <Box>
          <IconButton>
            <img src={Spectrum} alt="Spectrum" />
          </IconButton>
          <IconButton>
            <Discord />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <TabContext value={tabValue}>
          <Box>
            <TabList onChange={handleTabChange}>
              <Tab label="Orgs" value="orgs" disabled />
              <Tab label="Fleet" value="fleet" disabled />
            </TabList>
            <TabPanel value="orgs"></TabPanel>
            <TabPanel value="fleet"></TabPanel>
          </Box>
        </TabContext>
      </Box>
    </VLPopup>
  );
};
