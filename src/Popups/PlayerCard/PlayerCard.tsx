import Spectrum from '@Assets/media/Spectrum.png?url';
import { Discord } from '@Common/CustomIcons';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Avatar,
  Box,
  IconButton,
  Rating,
  Skeleton,
  Tab,
  Typography,
} from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { useAppSelector } from '@Redux/hooks';
import { selectUserById } from '@Redux/Slices/Users/contractSelectors';
import React from 'react';

export const POPUP_PLAYER_CARD = 'playerCard';

export type PlayerCardPopupProps = {
  userid: string;
};

export const PlayerCardPopup: React.FC<PlayerCardPopupProps> = ({ userid }) => {
  const user = useAppSelector((state) => selectUserById(state, userid));
  const [tabValue, setTabValue] = React.useState('orgs');

  const handleTabChange = React.useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    },
    [tabValue],
  );

  return (
    <VLPopup name={POPUP_PLAYER_CARD} title="" data-testid="PlayerCard">
      <Box>
        <Box sx={{ display: 'flex' }}>
          {user ? (
            <>
              <Avatar src={user?.pfp} sx={{ width: 55, height: 55 }} alt={user?.handle} />
              <Box sx={{ ml: '.5em' }}>
                <Typography align="left">{user?.displayName}</Typography>
                <Typography variant="subtitle2" align="left" sx={{ color: 'grey' }}>
                  @{user?.handle}
                </Typography>
                <Rating readOnly value={4} />
              </Box>
            </>
          ) : (
            <>
              <Skeleton variant="circular" sx={{ width: 55, height: 55 }} />
              <Skeleton sx={{ ml: '.5em', width: '100px' }} />
            </>
          )}
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
