import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Chip, Tab, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { CargoManifestManager } from './CargoManifestManager';
import { ComponentsLoadoutManager } from './ComponentsLoadoutManager';
import { CrewManifestManager } from './CrewManifestManager';
import { WeaponsLoadoutManager } from './WeaponsLoadoutManager';

type ShipListRowProps = {
  shipName: string;
  shipModel: string;
  shipLocation: string;
  owner: string;
};

const ShipListRow: React.FC<ShipListRowProps> = ({
  shipName,
  shipModel,
  shipLocation,
  owner,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography>{shipName ? `${shipName}` : `${shipModel}`}</Typography>
      {shipLocation === 'destroyed' ? (
        <Chip label={shipLocation} color="error" size="small" />
      ) : (
        <Chip label={shipLocation} color="primary" size="small" />
      )}
      <Button>View</Button>
      <Button>Select</Button>
      {owner === 'self' ? <Button>Loan</Button> : <Button>Return</Button>}
    </Box>
  );
};

type InfoFieldProps = {
  label: string;
  value: string;
};
const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <>
      <TextField
        label={label}
        value={value}
        size="small"
        InputProps={{
          readOnly: true,
        }}
        inputProps={{
          style: {
            textAlign: 'center',
          },
        }}
        sx={{
          width: '10em',
        }}
      />
    </>
  );
};

export const FleetManagerApp: React.FC<unknown> = () => {
  const [shipListTab, setShipListTab] = useState<string>('owned');
  const [manifestTab, setManifestTab] = useState<string>('cargo');
  const [loadoutTab, setLoadoutTab] = useState<string>('weapons');

  const handleShipListTab = (event: React.SyntheticEvent, newValue: string) => {
    setShipListTab(newValue);
  };
  const handleManifestView = (event: React.SyntheticEvent, newValue: string) => {
    setManifestTab(newValue);
  };
  const handleLoadoutView = (event: React.SyntheticEvent, newValue: string) => {
    setLoadoutTab(newValue);
  };

  const ShipList = Object.values(testShipSelectDB);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Box
        data-id="TopBox"
        sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '35%' }}
      >
        <Box sx={{ height: '100%' }}>
          <Typography>Selected Ship</Typography>
          <Box sx={{ height: '100%' }}>
            <TabContext value={shipListTab}>
              <TabList onChange={handleShipListTab}>
                <Tab label="Owned" value="owned" />
                <Tab label="Loaner" value="loaner" />
              </TabList>
              <TabPanel
                value="owned"
                sx={{
                  height: '70%',
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgb(8, 29, 68)',
                    borderRadius: '15px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '15px',
                    background: 'rgb(121, 192, 244, .5)',
                  },
                }}
              >
                {ShipList.filter((ship) => ship.owner === 'self').map((ship) => (
                  <ShipListRow
                    key={ship.name}
                    shipName={ship.name}
                    shipModel={ship.model}
                    shipLocation={ship.location}
                    owner={ship.owner}
                  />
                ))}
              </TabPanel>
              <TabPanel
                value="loaner"
                sx={{
                  height: '70%',
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgb(8, 29, 68)',
                    borderRadius: '15px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '15px',
                    background: 'rgb(121, 192, 244, .5)',
                  },
                }}
              >
                {ShipList.filter((ship) => ship.owner === 'other').map((ship) => (
                  <ShipListRow
                    key={ship.name}
                    shipName={ship.name}
                    shipModel={ship.model}
                    shipLocation={ship.location}
                    owner={ship.owner}
                  />
                ))}
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <Box>
            <InfoField label="Ship Name" value="Silent Incursion" />
            <InfoField label="Serial" value="1234567890" />
            <InfoField label="Ship Model" value="Mercury Star Runner" />
            <InfoField label="Ship Make" value="Crusader Industries" />
          </Box>
          <Box>
            <InfoField label="Jump Speed" value="100" />
            <InfoField label="Top Speed" value="100" />
            <InfoField label="Fuel Capacity" value="100" />
          </Box>
          <Box>
            <InfoField label="Cargo Capacity" value="100" />
            <InfoField label="Crew Capacity" value="100" />
            <InfoField label="Current DPS" value="16000" />
            <InfoField label="Max Health" value="16000" />
          </Box>
        </Box>
      </Box>
      <Box
        data-id="BottomBox"
        sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '65%' }}
      >
        <Box>
          <TabContext value={manifestTab}>
            <TabList onChange={handleManifestView}>
              <Tab label="Cargo Manifest" value="cargo" />
              <Tab label="Crew Manifest" value="crew" />
            </TabList>
            <TabPanel value="cargo" sx={{ height: '100%' }}>
              <CargoManifestManager />
            </TabPanel>
            <TabPanel value="crew" sx={{ height: '100%' }}>
              <CrewManifestManager />
            </TabPanel>
          </TabContext>
        </Box>
        <Box>
          <TabContext value={loadoutTab}>
            <TabList onChange={handleLoadoutView}>
              <Tab label="Weapon Loadout" value="weapons" />
              <Tab label="Component Loadout" value="components" />
            </TabList>
            <TabPanel value="weapons" sx={{ height: '100%' }}>
              <WeaponsLoadoutManager />
            </TabPanel>
            <TabPanel value="components" sx={{ height: '100%' }}>
              <ComponentsLoadoutManager />
            </TabPanel>
          </TabContext>
        </Box>
        <Box>
          <Button>Store Ship</Button>
          <Button>Loan Ship</Button>
          <Button>Destroy Ship</Button>
          <Button>Retrieve Ship</Button>
        </Box>
      </Box>
    </Box>
  );
};

const testShipSelectDB = {
  '1': {
    name: 'Rusty Bitch',
    model: 'Vangaurd Harbinger',
    location: 'Destroyed',
    owner: 'self',
  },
  '2': {
    name: 'Silent Incursion',
    model: 'Mercury Star Runner',
    location: 'Loreville',
    owner: 'self',
  },
  '3': {
    name: '',
    model: 'Mole',
    location: 'ARC L1',
    owner: 'self',
  },
  '4': {
    name: 'Insurrection',
    model: 'Polaris',
    location: 'Port Tressler',
    owner: 'self',
  },
  '5': {
    name: 'Ghost',
    model: 'Hornet Tracker',
    location: 'Port Tressler',
    owner: 'other',
  },
  '6': {
    name: 'Flying Dutchman',
    model: 'Reclaimer',
    location: 'Everus Harbor',
    owner: 'other',
  },
  '7': {
    name: '',
    model: 'C2 Starlifter',
    location: 'Loreville',
    owner: 'self',
  },
  '8': {
    name: '',
    model: 'Hammerhead',
    location: 'Area 18',
    owner: 'other',
  },
  '9': {
    name: '',
    model: 'Persus',
    location: 'Port Tressler',
    owner: 'other',
  },
  '10': {
    name: '',
    model: 'Eclipse',
    location: 'Destroyed',
    owner: 'self',
  },
  '11': {
    name: 'UEE Navy',
    model: '890 Jump',
    location: 'Abord',
    owner: 'other',
  },
  '12': {
    name: 'MCN Tacklebox',
    model: 'Nomad',
    location: 'Port Tressler',
    owner: 'other',
  },
  '13': {
    name: '',
    model: 'Kracken',
    location: 'Port Tressler',
    owner: 'other',
  },
};
