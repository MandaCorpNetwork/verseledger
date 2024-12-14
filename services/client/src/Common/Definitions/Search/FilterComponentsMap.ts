import { QueryNames } from './QueryNames';

//TODO: Add Support Page Links

export type FilterComponent = {
  key: SearchFilter;
  label: string;
  filters: QueryNames[];
};

export const filterComponents: Record<SearchFilter, FilterComponent> = {
  ContractType: {
    key: 'ContractType',
    label: 'Contract Type',
    filters: [QueryNames.ContractSubtype, QueryNames.ContractArchetype],
  },
  ContractLocations: {} as FilterComponent,
  ContractPay: {} as FilterComponent,
  ContractRating: {} as FilterComponent,
  ContractStatus: {} as FilterComponent,
  ContractSchedule: {} as FilterComponent,
};
