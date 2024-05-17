type IContract = {
  id: string;
  owner_id: User['id']; //ReadOnly
  title: string;
  subType: string;
  briefing: string;
  bidDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  isEmergency: boolean;
  locations: Array<unknown>;
  ratingLimit: number;
  contractorLimit: number | null;
  payStructure: string;
  isBargaining: boolean;
  isBonusPay: boolean;
  defaultPay: number;
  status: string; //TODO: Update
  createdAt: Date;
  updatedAt: Date;
};
