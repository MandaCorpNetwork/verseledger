import Spectrum from '@Assets/media/Spectrum.png?url';
import { Discord } from '@Common/Definitions/CustomIcons';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Rating,
  Skeleton,
  Tab,
  Typography,
} from '@mui/material';
import { VLPopup } from '@Popups/PopupWrapper/Popup';
import { POPUP_VERIFY_USER } from '@Popups/VerifyPopup/VerifyUser';
import { useAppSelector } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { selectUserById } from '@Redux/Slices/Users/userSelectors';
import React from 'react';

import { useAppDispatch } from '@/Redux/hooks';

export const POPUP_PLAYER_CARD = 'playerCard';

export type PlayerCardPopupProps = {
  userid: string;
};

export const PlayerCardPopup: React.FC<PlayerCardPopupProps> = ({ userid }) => {
  const user = useAppSelector((state) => selectUserById(state, userid));
  const [tabValue, setTabValue] = React.useState('orgs');

  const dispatch = useAppDispatch();

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
          {user?.id ? (
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
        {user != null && user.verified === false && (
          <Button
            variant="popupButton"
            onClick={() => dispatch(openPopup(POPUP_VERIFY_USER))}
          >
            Verify RSI Account
          </Button>
        )}
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
