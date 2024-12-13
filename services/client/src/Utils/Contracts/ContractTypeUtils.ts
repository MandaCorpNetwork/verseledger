import { contractArchetypes } from '@Common/Definitions/Contracts/ContractArchetypes';

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
