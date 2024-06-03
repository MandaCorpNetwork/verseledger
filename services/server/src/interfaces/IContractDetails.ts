import { IContract } from './IContract';
import { ContractStatus } from './ContractStatus';

export interface IContractDetails extends IContract {
  duration: Date | null;
  status: ContractStatus;
  startTime: Date | null;
  briefing: string;
}
