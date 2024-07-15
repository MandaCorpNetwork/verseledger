import { IContractSubType } from 'vl-shared/src/schemas/ContractSubTypeSchema';

export enum QueryNames {
  SortBy = 'sort',
  SortDirection = 'sortDir',
  SearchQuery = 'search',
  ContractManagerTab = 'cmTab',
  Subtype = 'st',
  Locations = 'loc',
  UECRangeMin = 'minUEC',
  UECRangeMax = 'maxUEC',
  SelectedContract = 'contractID',
  EmployerRating = 'erating',
  ContractorRating = 'crating',
  TimeRemaining = 'time',
  Archetype = 'archetype',
  Status = 'status',
  BidStatus = 'bstatus',
  Page = 'page',
}
export const ArchetypeToSubtypes: { [key: string]: IContractSubType[] } = {
  Logistics: ['Transport', 'Hauling', 'Manage'],
  Medical: ['Trauma', 'On-Call'],
  Security: ['Escort', 'Bounty', 'QRF', 'Asset-Protection', 'Attache'],
  Salvage: ['Collection', 'Procurement'],
  Industry: ['Mining', 'Refining', 'Manufacturing', 'Scouting'],
  RRR: ['Refuel', 'Rearm', 'Repair'],
  Fleet: ['Crewman', 'Outsourcing'],
  Exploration: ['Locate', 'Charting'],
  Proxy: ['Middleman', 'Redacted'],
};
