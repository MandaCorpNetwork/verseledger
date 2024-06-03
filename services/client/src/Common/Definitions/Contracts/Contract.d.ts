type IContract = {
  id: string;
  owner_id: User['id']; //ReadOnly
  title: string;
  subType: ContractSubType;
  briefing: string;
  bidDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  isEmergency: boolean;
  locations: Array<Location['id']>;
  ratingLimit: number | null;
  contractorLimit: number | null;
  payStructure: PayStructure;
  isBargaining: boolean;
  isBonusPay: boolean;
  defaultPay: number;
  status: string; //TODO: Update
  createdAt: Date;
  updatedAt: Date;
};
