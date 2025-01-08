import {
  contractArchetypes,
  ContractArchetypeTree,
} from '@Common/Definitions/Contracts/ContractArchetypes';
import { GroupedContracts } from '@Common/Definitions/Contracts/ContractTypes';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

export function getSubtypeOptions() {
  const optionsMap: Record<string, { label: string; group: string }> = {};
  const flatOptions = contractArchetypes.flatMap((option) =>
    option.subtypes.map((subtype) => {
      optionsMap[subtype.value] = { group: option.archetype, label: subtype.label };
      return subtype.value;
    }),
  );
  return { optionsMap, flatOptions };
}

export function filterContractsByArchetype(
  contracts: IContract[],
  archetype: ContractArchetypeTree,
): IContract[] {
  const subtypeValues = new Set(archetype.subtypes.map((subtype) => subtype.value));
  return contracts.filter((contract) => subtypeValues.has(contract.subtype));
}

export function groupContractsByArchetype(contracts: IContract[]): GroupedContracts {
  return contractArchetypes.reduce((acc, archetype) => {
    const filteredContracts = filterContractsByArchetype(contracts, archetype);

    if (filteredContracts.length > 0) {
      acc[archetype.archetype] = {
        archetype: archetype,
        contracts: filteredContracts,
      };
    }

    return acc;
  }, {} as GroupedContracts);
}
