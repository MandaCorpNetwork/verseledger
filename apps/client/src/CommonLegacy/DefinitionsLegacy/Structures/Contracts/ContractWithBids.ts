import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

export type IContractWithBids = IContract & {
  pendingBids: Array<unknown>;
  rejectedBids: Array<unknown>;
  acceptedBids: Array<unknown>;
  invitedContractors: Array<unknown>;
  declinedInvitations: Array<unknown>;
};
