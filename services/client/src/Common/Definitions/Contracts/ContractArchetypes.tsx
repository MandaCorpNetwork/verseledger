import FleetLoop from '@Assets/media/ContractLedger/FleetLoop.webm?url';
import LogisticsLoop from '@Assets/media/ContractLedger/LogiLoop.webm?url';
import MedicalLoop from '@Assets/media/ContractLedger/MediLoop.webm?url';
import IndustryLoop from '@Assets/media/ContractLedger/MiningLoop.webm?url';
import ProxyLoop from '@Assets/media/ContractLedger/ProxyLoop.webm?url';
import RRRLoop from '@Assets/media/ContractLedger/RRRLoop.webm?url';
import SalvageLoop from '@Assets/media/ContractLedger/SalvLoop.webm?url';
import SecurityLoop from '@Assets/media/ContractLedger/SecLoop.webm?url';
import type { SvgIconComponent } from '@mui/icons-material';

import {
  Exploration,
  Fleet,
  Industry,
  Logistics,
  Medical,
  MissileRearm,
  ProxyIcon,
  Refuel,
  Repair,
  Rrr,
  Salvage,
  Security,
} from '../../../CommonLegacy/DefinitionsLegacy/CustomIcons';
import type {
  ContractSubtypeObj,
  IContractArchetype,
  IContractSubtype,
} from './ContractTypes';

export type ContractArchetypeTree = {
  archetype: IContractArchetype;
  archetypeLabel: string;
  archetypeIcon: SvgIconComponent;
  subtypes: ContractSubtypeObj[];
};

export const contractArchetypes: ContractArchetypeTree[] = [
  {
    archetype: 'Logistics',
    archetypeLabel: 'Logistics',
    archetypeIcon: Logistics,
    subtypes: [
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
    archetypeLabel: 'Medical',
    archetypeIcon: Medical,
    subtypes: [
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
    archetypeLabel: 'Security',
    archetypeIcon: Security,
    subtypes: [
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
    archetypeLabel: 'Salvage',
    archetypeIcon: Salvage,
    subtypes: [
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
    archetypeLabel: 'Industry',
    archetypeIcon: Industry,
    subtypes: [
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
    archetypeLabel: 'Rearm Refuel Repair',
    archetypeIcon: Rrr,
    subtypes: [
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
    archetypeLabel: 'Fleet',
    archetypeIcon: Fleet,
    subtypes: [
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
    archetypeLabel: 'Exploration',
    archetypeIcon: Exploration,
    subtypes: [
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
    archetypeLabel: 'Other',
    archetypeIcon: ProxyIcon,
    subtypes: [
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

type ContractSubtypeDetails = {
  icon: SvgIconComponent;
  archetype: IContractArchetype;
  label: string;
};

export const contractSubtypes: Record<IContractSubtype, ContractSubtypeDetails> = {
  Transport: { icon: Logistics, archetype: 'Logistics', label: 'Transport' },
  Hauling: { icon: Logistics, archetype: 'Logistics', label: 'Hauling' },
  Manage: { icon: Logistics, archetype: 'Logistics', label: 'Manage' },
  Trauma: { icon: Medical, archetype: 'Medical', label: 'Trauma' },
  'On-Call': { icon: Medical, archetype: 'Medical', label: 'On Call' },
  Escort: { icon: Security, archetype: 'Security', label: 'Escort' },
  Bounty: { icon: Security, archetype: 'Security', label: 'Bounty' },
  QRF: { icon: Security, archetype: 'Security', label: 'Quick Reaction Force' },
  'Asset-Protection': {
    icon: Security,
    archetype: 'Security',
    label: 'Asset Protection',
  },
  Attache: { icon: Security, archetype: 'Security', label: 'Attache' },
  Collection: { icon: Salvage, archetype: 'Salvage', label: 'Collection' },
  Procurement: { icon: Salvage, archetype: 'Salvage', label: 'Procurement' },
  Mining: { icon: Industry, archetype: 'Industry', label: 'Mining' },
  Refining: { icon: Industry, archetype: 'Industry', label: 'Refining' },
  Manufacturing: { icon: Industry, archetype: 'Industry', label: 'Manufacturing' },
  Scouting: { icon: Industry, archetype: 'Industry', label: 'Scouting' },
  Refuel: { icon: Refuel, archetype: 'RRR', label: 'Refuel' },
  Rearm: { icon: MissileRearm, archetype: 'RRR', label: 'Rearm' },
  Repair: { icon: Repair, archetype: 'RRR', label: 'Repair' },
  Crewman: { icon: Fleet, archetype: 'Fleet', label: 'Crewman' },
  Outsourcing: { icon: Fleet, archetype: 'Fleet', label: 'Outsourcing' },
  Locate: { icon: Exploration, archetype: 'Exploration', label: 'Locate' },
  Charting: { icon: Exploration, archetype: 'Exploration', label: 'Charting' },
  Middleman: { icon: ProxyIcon, archetype: 'Proxy', label: 'Middleman' },
  Redacted: { icon: ProxyIcon, archetype: 'Proxy', label: 'Other' },
};
