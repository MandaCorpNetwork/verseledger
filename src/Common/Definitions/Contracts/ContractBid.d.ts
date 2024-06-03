type ContractBid = {
  id: string;
  user_id: User['id'];
  contract_id: Contract['id'];
  createdAt: Date;
  updatedAt: Date;
};
