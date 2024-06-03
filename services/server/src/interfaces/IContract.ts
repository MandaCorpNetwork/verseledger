import type { PayStructure } from './PayStructure';
import { ITimestamped } from './ITimestamped';
import { ContractStatus } from './ContractStatus';
export interface IContract extends ITimestamped {
  id: string;
  title: string;
  subtype: string;
  briefing: string;
  owner_id: string;
  bidDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  isEmergency: boolean;
  ratingLimit: number;
  contractorLimit: number | null;
  payStructure: PayStructure;
  isBargaining: boolean;
  isBonusPay: boolean;
  defaultPay: number;
  status: ContractStatus;
}
