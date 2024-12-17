import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

export type ContractPayroll = IContract &
  IContractBid & {
    profit: number;
    cost: number;
    purchase: Array<unknown>;
    sale: Array<unknown>;
    contractorPay: Array<unknown>;
  };
