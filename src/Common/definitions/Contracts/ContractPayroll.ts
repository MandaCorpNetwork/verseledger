type ContractPayroll = ContractModel &
  ContractorBid & {
    profit: number;
    cost: number;
    purchase: Array<unknown>;
    sale: Array<unknown>;
    contractorPay: Array<unknown>;
  };
