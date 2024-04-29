type ContractModel = {
  id: number;
  owner: number; //ReadOnly
  title: string;
  subType: string;
  briefing: string;
  bidTime: Date;
  startTime: Date;
  endTime: Date;
  isEmergency: boolean;
  locations: Array<unknown>;
  ratingLimit: number;
  contractorLimit: number;
  payStructure: string;
  isBargaining: boolean;
  isBonusPay: boolean;
  defaultPay: number;
  createdAt: Date;
  updatedAt: Date;
};
