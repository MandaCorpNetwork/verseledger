interface Contract extends ITimestamped {
  id: number;
  title: string;
  owner_id: number;
  location: string;
  bidEnd: Date | null;
  pay: number;
  payStructure: PayStructure;
  bonus: boolean;
  type: ContractType;
  subtype: ContractSubType;
}
