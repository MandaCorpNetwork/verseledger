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
  Logistics,
  Medical,
  Mining,
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.LOGISTICS',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.MEDICAL',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.SECURITY',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.SALVAGE',
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
    archetypeIcon: Mining,
    archetypeLabel: '@CONTRACTS.ARCHETYPES.INDUSTRY',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.RRR',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.FLEET',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.EXPLORATION',
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
    archetypeLabel: '@CONTRACTS.ARCHETYPES.PROXY',
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
  Transport: {
    icon: Logistics,
    archetype: 'Logistics',
    label: '@CONTRACTS.SUBTYPES.TRANSPORT',
  },
  Hauling: {
    icon: Logistics,
    archetype: 'Logistics',
    label: '@CONTRACTS.SUBTYPES.HAULING',
  },
  Manage: {
    icon: Logistics,
    archetype: 'Logistics',
    label: '@CONTRACTS.SUBTYPES.MANAGE',
  },
  Trauma: { icon: Medical, archetype: 'Medical', label: '@CONTRACTS.SUBTYPES.TRAUMA' },
  'On-Call': { icon: Medical, archetype: 'Medical', label: '@CONTRACTS.SUBTYPES.ONCALL' },
  Escort: { icon: Security, archetype: 'Security', label: '@CONTRACTS.SUBTYPES.ESCORT' },
  Bounty: { icon: Security, archetype: 'Security', label: '@CONTRACTS.SUBTYPES.BOUNTY' },
  QRF: { icon: Security, archetype: 'Security', label: '@CONTRACTS.SUBTYPES.QRF' },
  'Asset-Protection': {
    icon: Security,
    archetype: 'Security',
    label: '@CONTRACTS.SUBTYPES.ASSETPROTECT',
  },
  Attache: {
    icon: Security,
    archetype: 'Security',
    label: '@CONTRACTS.SUBTYPES.ATTACHE',
  },
  Collection: {
    icon: Salvage,
    archetype: 'Salvage',
    label: '@CONTRACTS.SUBTYPES.COLLECTION',
  },
  Procurement: {
    icon: Salvage,
    archetype: 'Salvage',
    label: '@CONTRACTS.SUBTYPES.PROCUREMENT',
  },
  Mining: { icon: Mining, archetype: 'Industry', label: '@CONTRACTS.SUBTYPES.MINING' },
  Refining: {
    icon: Mining,
    archetype: 'Industry',
    label: '@CONTRACTS.SUBTYPES.REFINING',
  },
  Manufacturing: {
    icon: Mining,
    archetype: 'Industry',
    label: '@CONTRACTS.SUBTYPES.MANUFACTURING',
  },
  Scouting: {
    icon: Mining,
    archetype: 'Industry',
    label: '@CONTRACTS.SUBTYPES.SCOUTING',
  },
  Refuel: { icon: Refuel, archetype: 'RRR', label: '@CONTRACTS.SUBTYPES.REFUEL' },
  Rearm: { icon: MissileRearm, archetype: 'RRR', label: '@CONTRACTS.SUBTYPES.REARM' },
  Repair: { icon: Repair, archetype: 'RRR', label: '@CONTRACTS.SUBTYPES.REPAIR' },
  Crewman: { icon: Fleet, archetype: 'Fleet', label: '@CONTRACTS.SUBTYPES.CREWMAN' },
  Outsourcing: {
    icon: Fleet,
    archetype: 'Fleet',
    label: '@CONTRACTS.SUBTYPES.OUTSOURCING',
  },
  Locate: {
    icon: Exploration,
    archetype: 'Exploration',
    label: '@CONTRACTS.SUBTYPES.LOCATE',
  },
  Charting: {
    icon: Exploration,
    archetype: 'Exploration',
    label: '@CONTRACTS.SUBTYPES.CHARTING',
  },
  Middleman: {
    icon: ProxyIcon,
    archetype: 'Proxy',
    label: '@CONTRACTS.SUBTYPES.MIDDLEMAN',
  },
  Redacted: {
    icon: ProxyIcon,
    archetype: 'Proxy',
    label: '@CONTRACTS.SUBTYPES.REDACTED',
  },
};
