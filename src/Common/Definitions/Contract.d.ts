interface Contract extends ITimestamped {
  id: string;
  title: string;
  owner_id: string;
  location: string;
  bidEnd: Date | null;
  pay: number;
  payStructure: PayStructure;
  bonus: boolean;
  type: ContractType;
  subtype: ContractSubType;
}
