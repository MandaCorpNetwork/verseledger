interface Column {
  id: string;
  label: string;
  minWidth?: string;
  align?: string;
  format?: (value: number) => string;
}

const baseItemTableHeader: readonly Column[] = [
  { id: 'value', label: 'Value', minWidth: '50px' },
  { id: 'name', label: 'Name', minWidth: '120px', align: 'center' },
];

const extendBaseHeader = (specificColumns: readonly Column[]): readonly Column[] => {
  return [...baseItemTableHeader, ...specificColumns];
};

export const allItemsHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Item Type', minWidth: '50px', align: 'center' },
]);

export const armorListHeader: readonly Column[] = extendBaseHeader([
  { id: 'subtype', label: 'Armor Type', minWidth: '50px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
]);

export const commodityListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
]);

export const clothingListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'company', label: 'Company', minWidth: '60px', align: 'center' },
]);

export const informationListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
  { id: 'location', label: 'Location', minWidth: '60px', align: 'center' },
]);

export const materialsListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'producer', label: 'Producer', minWidth: '60px', align: 'center' },
]);

export const medicalItemListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'company', label: 'Company', minWidth: '60px', align: 'center' },
]);

export const missileListHeader: readonly Column[] = extendBaseHeader([
  { id: 'subtype', label: 'Missile Type', minWidth: '50px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
  { id: 'damage', label: 'Damage Total', minWidth: '40px', align: 'center' },
]);

export const sustenanceListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'company', label: 'Company', minWidth: '60px', align: 'center' },
]);

export const utilityListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
]);

export const vehiclesListHeader: readonly Column[] = extendBaseHeader([
  { id: 'company', label: 'Company', minWidth: '60px', align: 'center' },
  { id: 'cargo', label: 'Cargo', minWidth: '30px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
  { id: 'focus', label: 'Focus', minWidth: '45px', align: 'center' },
]);

export const vehiclesComponentsListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
  { id: 'grade', label: 'Grade', minWidth: '20px', align: 'center' },
]);

export const vehicleWeaponsListHeader: readonly Column[] = extendBaseHeader([
  { id: 'subtype', label: 'Weapon Type', minWidth: '50px', align: 'center' },
  { id: 'size', label: 'Size', minWidth: '20px', align: 'center' },
  { id: 'alphaDamage', label: 'Alpha Damage', minWidth: '40px', align: 'center' },
  { id: 'dps', label: 'DPS', minWidth: '40px', align: 'center' },
]);

export const miscellaneousListHeader: readonly Column[] = extendBaseHeader([
  { id: 'type', label: 'Type', minWidth: '50px', align: 'center' },
  { id: 'company', label: 'Company', minWidth: '60px', align: 'center' },
]);
