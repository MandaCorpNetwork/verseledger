declare type ContractArchetype =
  | 'Logistics'
  | 'Medical'
  | 'Security'
  | 'Salvage'
  | 'Industry'
  | 'RRR'
  | 'Fleet'
  | 'Exploration'
  | 'Proxy';

declare type ContractSubtype =
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

declare type ContractSubtypeObj = {
  label: string;
  value: ContractSubtype;
};
