type ContractorCounter = ContractBid & {
  counterStartTime: Date;
  counterEndTime: Date;
  counterLocations: Array<unknown>;
  counterPayStructure: string;
  counterBonusPay: boolean;
  counterPay: number;
};
