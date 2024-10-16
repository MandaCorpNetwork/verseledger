type ContractArchetype =
  | 'Logistics'
  | 'Medical'
  | 'Security'
  | 'Salvage'
  | 'Industry'
  | 'RRR'
  | 'Fleet'
  | 'Exploration'
  | 'Proxy';

type ContractSubtypeObj = {
  label: string;
  value: ContractSubType;
};

type ContractArchetypeTree = {
  archetype: ContractArchetype;
  archetypeIcon: JSX.Element;
  subTypes: ContractSubtypeObj[];
};
