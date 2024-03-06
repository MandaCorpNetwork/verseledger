import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab, TextField } from '@mui/material';
import { useState } from 'react';

import { CargoManifestOverview } from './Tables/CargoManifestOverview';
import { ComponentsLoadoutOverview } from './Tables/ComponentsLoadoutOverview';
import { CrewManifestOverview } from './Tables/CrewManifestOverview';
import { WeaponsLoadoutOverview } from './Tables/WeaponsLoadoutOverview';

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

export const ShipStatus: React.FC<unknown> = () => {
  const [manifestTab, setManifestTab] = useState<string>('cargo');
  const [loadoutTab, setLoadoutTab] = useState<string>('weapons');

  const handleManifestView = (event: React.SyntheticEvent, newValue: string) => {
    setManifestTab(newValue);
  };
  const handleLoadoutView = (event: React.SyntheticEvent, newValue: string) => {
    setLoadoutTab(newValue);
  };
  return (
    <Box data-id="ShipStatusContainer" sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', height: '20%', mb: '2.2em' }}>
        <Box data-id="ShipInfoContainer">
          <Box>
            <InfoField label="Ship Name" value={testShip.shipName} />
            <InfoField label="Ship Serial" value={testShip.shipSerial} />
            <InfoField label="Ship Model" value={testShip.shipModel} />
            <InfoField label="Ship Make" value={testShip.shipMake} />
          </Box>
          <Box>
            <InfoField label="Max Crew" value={testShip.maxCrew} />
            <InfoField label="Jump Speed" value={testShip.jumpSpeed} />
            <InfoField label="Current DPS" value={testShip.CurrentDPS} />
            <InfoField label="Max Health" value={testShip.MaxHealth} />
          </Box>
        </Box>
        <Box data-id="ShipViewControls">
          <Button variant="outlined" color="secondary">
            Store Ship
          </Button>
          <Button variant="outlined" color="error">
            Ship Destroyed
          </Button>
        </Box>
      </Box>
      <Box
        data-id="ShipStatusControls"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '80%',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '48%', height: '100%' }}>
          <TabContext value={manifestTab}>
            <TabList
              onChange={handleManifestView}
              variant="fullWidth"
              sx={{
                '.MuiTab-root': { padding: '0', margin: '0' },
                '.MuiTabList-root': { padding: '0', mb: '1em' },
              }}
            >
              <Tab label="Cargo Manifest" value="cargo" />
              <Tab label="Crew Manifest" value="crew" />
            </TabList>
            <TabPanel
              value="cargo"
              sx={{
                height: '65%',
                overflow: 'auto',
                padding: '0',
                width: '100%',
              }}
            >
              <CargoManifestOverview />
            </TabPanel>
            <TabPanel
              value="crew"
              sx={{ height: '65%', overflow: 'auto', padding: '0', width: '100%' }}
            >
              <CrewManifestOverview />
            </TabPanel>
          </TabContext>
        </Box>
        <Box sx={{ width: '48%', height: '100%' }}>
          <TabContext value={loadoutTab}>
            <TabList
              onChange={handleLoadoutView}
              variant="fullWidth"
              sx={{
                '.MuiTab-root': { padding: '0', margin: '0' },
                '.MuiTabList-root': { padding: '0', mb: '1em' },
              }}
            >
              <Tab label="Weapon Loadout" value="weapons" />
              <Tab label="Component Loadout" value="components" />
            </TabList>
            <TabPanel
              value="weapons"
              sx={{
                height: '65%',
                overflow: 'auto',
                padding: '0',
                width: '100%',
              }}
            >
              <WeaponsLoadoutOverview />
            </TabPanel>
            <TabPanel
              value="components"
              sx={{
                height: '65%',
                overflow: 'auto',
                padding: '0',
                width: '100%',
              }}
            >
              <ComponentsLoadoutOverview />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

const testShip = {
  shipName: 'Silent Incursion',
  shipSerial: '123456789',
  shipModel: 'Mercury StarRunner',
  shipMake: 'Crusader Industries',
  maxCrew: '3',
  jumpSpeed: '',
  CurrentDPS: '',
  MaxHealth: '',
};
