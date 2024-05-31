type IContract = {
  id: string;
  owner_id: User['id']; //ReadOnly
  title: string;
  subType: Array<unknown>;
  briefing: string;
  bidDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  isEmergency: boolean;
  locations: Array<unknown>;
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
