import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';

export type ContractorCounter = IContractBid & {
  counterStartTime: Date;
  counterEndTime: Date;
  counterLocations: Array<unknown>;
  counterPayStructure: string;
  counterBonusPay: boolean;
  counterPay: number;
};
