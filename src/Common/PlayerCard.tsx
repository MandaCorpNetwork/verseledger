import Spectrum from '@Assets/media/Spectrum.png?url';
import { Close } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  Tab,
  Typography,
} from '@mui/material';
import React from 'react';

import { useAppSelector } from '@/Redux/hooks';
import { selectCurrentUser } from '@/Redux/Slices/Auth/authSelectors';

import { Discord } from './CustomIcons';

type PlayerCardProps = {
  open: boolean;
  onClose: () => void;
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ open, onClose }) => {
  const selectedUser = useAppSelector(selectCurrentUser);
  const [tabValue, setTabValue] = React.useState('orgs');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ backdropFilter: 'blur(5px)' }}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};
