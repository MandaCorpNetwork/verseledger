import { Explore, Factory, LocalHospital, VisibilityOff } from '@mui/icons-material';

import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '../CustomIcons';

export const contractArchetypes = (
  color: string,
  size: 'small' | 'medium' | 'large' | 'inherit',
) => [
  {
    archetype: 'Logistics',
    archetypeIcon: <LogisticsIcon fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Transport',
        value: 'Transport',
      },
      {
        label: 'Hauling',
        value: 'Hauling',
      },
      {
        label: 'Manage',
        value: 'Manage',
      },
    ],
  },
  {
    archetype: 'Medical',
    archetypeIcon: <LocalHospital fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Trauma',
        value: 'Trauma',
      },
      {
        label: 'On-Call',
        value: 'On-Call',
      },
    ],
  },
  {
    archetype: 'Security',
    archetypeIcon: <SecurityIcon fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Escort',
        value: 'Escort',
      },
      {
        label: 'Bounty',
        value: 'Bounty',
      },
      {
        label: 'Quick Reaction Force',
        value: 'QRF',
      },
      {
        label: 'Asset Protection',
        value: 'Asset-Protection',
      },
      {
        label: 'Attache',
        value: 'Attache',
      },
    ],
  },
  {
    archetype: 'Salvage',
    archetypeIcon: <SalvageIcon fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Collection',
        value: 'Collection',
      },
      {
        label: 'Procurement',
        value: 'Procurement',
      },
    ],
  },
  {
    archetype: 'Industry',
    archetypeIcon: <Factory fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Mining',
        value: 'Mining',
      },
      {
        label: 'Refining',
        value: 'Refining',
      },
      {
        label: 'Manufacturing',
        value: 'Manufacturing',
      },
      {
        label: 'Scouting',
        value: 'Scouting',
      },
    ],
  },
  {
    archetype: 'RRR',
    archetypeIcon: <RRRIcon fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Refuel',
        value: 'Refuel',
      },
      {
        label: 'Rearm',
        value: 'Rearm',
      },
      {
        label: 'Repair',
        value: 'Repair',
      },
    ],
  },
  {
    archetype: 'Fleet',
    archetypeIcon: <FleetIcon fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Crewman',
        value: 'Crewman',
      },
      {
        label: 'Outsourcing',
        value: 'Outsourcing',
      },
    ],
  },
  {
    archetype: 'Exploration',
    archetypeIcon: <Explore fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Locate',
        value: 'Locate',
      },
      {
        label: 'Charting',
        value: 'Charting',
      },
    ],
  },
  {
    archetype: 'Proxy',
    archetypeIcon: <VisibilityOff fontSize={size} sx={{ color: color }} />,
    subTypes: [
      {
        label: 'Middleman',
        value: 'MiddleMan',
      },
      {
        label: 'Redacted',
        value: 'Other',
      },
    ],
  },
];
