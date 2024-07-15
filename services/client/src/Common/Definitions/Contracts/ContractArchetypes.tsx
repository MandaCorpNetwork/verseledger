import { Explore, Factory, LocalHospital, VisibilityOff } from '@mui/icons-material';

import {
  FleetIcon,
  LogisticsIcon,
  RRRIcon,
  SalvageIcon,
  SecurityIcon,
} from '../CustomIcons';

export const contractArchetypes = [
  {
    archetype: 'Logistics',
    archetypeIcon: <LogisticsIcon color="secondary" />,
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
    archetypeIcon: <LocalHospital color="secondary" />,
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
    archetypeIcon: <SecurityIcon color="secondary" />,
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
    archetypeIcon: <SalvageIcon color="secondary" />,
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
    archetypeIcon: <Factory color="secondary" />,
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
    archetypeIcon: <RRRIcon color="secondary" />,
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
    archetypeIcon: <FleetIcon color="secondary" />,
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
    archetypeIcon: <Explore color="secondary" />,
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
    archetypeIcon: <VisibilityOff color="secondary" />,
    subTypes: [
      {
        label: 'Middleman',
        value: 'Middleman',
      },
      {
        label: 'Redacted',
        value: 'Redacted',
      },
    ],
  },
];
