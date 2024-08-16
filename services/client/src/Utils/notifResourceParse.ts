export const parseResource = (resource: string) => {
  if (resource.includes('contracts')) {
    const parts = resource.split('/');
    const feature = parts[1];
    const contractId = parts[2];
    const type = parts[3];
    const argument = parts[4];
    return { type: type, id: contractId, argument: argument, feature: feature };
  }
  return null;
};
