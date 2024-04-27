interface ContractDetails extends Contract {
  duration: Date | null;
  status: ContractStatus;
  startTime: Date | null;
  briefing: string;
}
