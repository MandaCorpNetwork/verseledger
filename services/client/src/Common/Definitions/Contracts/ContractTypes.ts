import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { ContractArchetypeTree } from './ContractArchetypes';

export type IContractArchetype =
  | 'Logistics'
  | 'Medical'
  | 'Security'
  | 'Salvage'
  | 'Industry'
  | 'RRR'
  | 'Fleet'
  | 'Exploration'
  | 'Proxy';

export type IContractSubtype =
  | 'Transport'
  | 'Hauling'
  | 'Manage'
  | 'Trauma'
  | 'On-Call'
  | 'Escort'
  | 'Bounty'
  | 'QRF'
  | 'Asset-Protection'
  | 'Attache'
  | 'Collection'
  | 'Procurement'
  | 'Mining'
  | 'Refining'
  | 'Manufacturing'
  | 'Scouting'
  | 'Refuel'
  | 'Rearm'
  | 'Repair'
  | 'Crewman'
  | 'Outsourcing'
  | 'Locate'
  | 'Charting'
  | 'Middleman'
  | 'Redacted';

export type ContractSubtypeObj = {
  label: string;
  value: IContractSubtype;
};

export const contractSubtypes = [
  'Transport',
  'Hauling',
  'Manage',
  'Trauma',
  'On-Call',
  'Escort',
  'Bounty',
  'QRF',
  'Asset-Protection',
  'Attache',
  'Collection',
  'Procurement',
  'Mining',
  'Refining',
  'Manufacturing',
  'Scouting',
  'Refuel',
  'Rearm',
  'Repair',
  'Crewman',
  'Outsourcing',
  'Locate',
  'Charting',
  'Middleman',
  'Redacted',
];

export type GroupedContracts = Record<
  string,
  { archetype: ContractArchetypeTree; contracts: IContract[] }
>;
