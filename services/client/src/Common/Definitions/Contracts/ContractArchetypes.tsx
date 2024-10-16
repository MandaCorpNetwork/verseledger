import FleetLoop from '@Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '@Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '@Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '@Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '@Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '@Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '@Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '@Assets/media/ContractLedger/SecLoop.webm?url';

import {
  Exploration,
  Fleet,
  Industry,
  Logistics,
  Medical,
  Proxy,
  RRR,
  Salvage,
  Security,
} from '../CustomIcons';

export const contractArchetypes: ContractArchetypeTree[] = [
  {
    archetype: 'Logistics',
    archetypeIcon: <Logistics />,
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
    archetypeIcon: <Medical />,
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
    archetypeIcon: <Security />,
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
    archetypeIcon: <Salvage />,
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
    archetypeIcon: <Industry />,
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
    archetypeIcon: <RRR />,
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
    archetypeIcon: <Fleet />,
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
    archetypeIcon: <Exploration />,
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
    archetypeIcon: <Proxy />,
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

export const archetypeLoopButtons = [
  { title: 'Logistics', videoSource: LogisticsLoop, value: 'Logistics' },
  { title: 'Medical', videoSource: MedicalLoop, value: 'Medical' },
  { title: 'Security', videoSource: SecurityLoop, value: 'Security' },
  { title: 'Salvage', videoSource: SalvageLoop, value: 'Salvage' },
  { title: 'Industry', videoSource: IndustryLoop, value: 'Industry' },
  { title: 'Rearm Refuel Repair', videoSource: RRRLoop, value: 'RRR' },
  { title: 'Fleet', videoSource: FleetLoop, value: 'Fleet' },
  { title: 'Exploration', videoSource: RRRLoop, value: 'Exploration' },
  { title: 'Proxy', videoSource: ProxyLoop, value: 'Proxy' },
];
