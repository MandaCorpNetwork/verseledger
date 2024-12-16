import { QueryNames } from './QueryNames';

//TODO: Add Support Page Links

export type FilterComponent = {
  key: SearchFilter;
  label: string;
  filters: QueryNames[];
  disabled?: boolean;
};

export const filterComponents: Record<SearchFilter, FilterComponent> = {
  ContractType: {
    key: 'ContractType',
    label: 'Contract Type',
    filters: [QueryNames.ContractSubtype, QueryNames.ContractArchetype],
  },
  ContractLocations: {
    key: 'ContractLocations',
    label: 'Contract Locations',
    filters: [QueryNames.Locations],
    disabled: true,
  },
  ContractPay: {
    key: 'ContractPay',
    label: 'Contract Pay',
    filters: [QueryNames.UECRangeMin, QueryNames.UECRangeMax, QueryNames.PayStructure],
  },
  ContractRating: {
    key: 'ContractRating',
    label: 'Rating Stats',
    filters: [QueryNames.ContractorRating, QueryNames.EmployerRating],
    disabled: true,
  },
  ContractStatus: {
    key: 'ContractStatus',
    label: 'Contract Status',
    filters: [QueryNames.Status],
    disabled: true,
  },
  ContractSchedule: {
    key: 'ContractSchedule',
    label: 'Contract Scheduling',
    filters: [
      QueryNames.BidAfter,
      QueryNames.BidBefore,
      QueryNames.BidExact,
      QueryNames.EndAfter,
      QueryNames.EndBefore,
      QueryNames.EndExact,
      QueryNames.StartAfter,
      QueryNames.StartBefore,
      QueryNames.StartExact,
      QueryNames.Duration,
    ],
  },
};
