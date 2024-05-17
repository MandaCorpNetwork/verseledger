type IContractWithBids = Contract & {
  pendingBids: Array<unknown>;
  rejectedBids: Array<unknown>;
  acceptedBids: Array<unknown>;
  invitedContractors: Array<unknown>;
  declinedInvitations: Array<unknown>;
};
