import {
  Armor,
  Commodities,
  Materials,
  MedicalItems,
  Missiles,
  RRR,
  Sustenance,
  VehicleComponent,
  Vehicles,
  VehicleWeapons,
} from '@Common/Definitions/CustomIcons';
import {
  allItemsHeader,
  armorListHeader,
  clothingListHeader,
  commodityListHeader,
  informationListHeader,
  materialsListHeader,
  medicalItemListHeader,
  missileListHeader,
  sustenanceListHeader,
  utilityListHeader,
  vehiclesComponentsListHeader,
  vehiclesListHeader,
} from '@Components/Orders/VerseMarket/Marketplace/ItemBrowser/TableColumns';
import {
  AllInclusive,
  Checkroom,
  MiscellaneousServices,
  Storage,
} from '@mui/icons-material';

export const ItemTypes = (
  color: string,
  size: 'small' | 'medium' | 'large' | 'inherit',
) => [
  {
    type: 'All',
    icon: <AllInclusive fontSize={size} sx={{ color: color }} />,
    value: 'all',
    header: allItemsHeader,
  },
  {
    type: 'Armor',
    icon: <Armor fontSize={size} sx={{ color: color }} />,
    value: 'armor',
    header: armorListHeader,
  },
  {
    type: 'Commodities',
    icon: <Commodities fontSize={size} sx={{ color: color }} />,
    value: 'commodities',
    header: commodityListHeader,
  },
  {
    type: 'Clothing',
    icon: <Checkroom fontSize={size} sx={{ color: color }} />,
    value: 'clothing',
    header: clothingListHeader,
  },
  {
    type: 'Information',
    icon: <Storage fontSize={size} sx={{ color: color }} />,
    value: 'information',
    header: informationListHeader,
  },
  {
    type: 'Materials',
    icon: <Materials fontSize={size} sx={{ color: color }} />,
    value: 'materials',
    header: materialsListHeader,
  },
  {
    type: 'Medical Items',
    icon: <MedicalItems fontSize={size} sx={{ color: color }} />,
    value: 'medicalItems',
    header: medicalItemListHeader,
  },
  {
    type: 'Missiles',
    icon: <Missiles fontSize={size} sx={{ color: color }} />,
    value: 'missiles',
    header: missileListHeader,
  },
  {
    type: 'Sustenance',
    icon: <Sustenance fontSize={size} sx={{ color: color }} />,
    value: 'sustenance',
    header: sustenanceListHeader,
  },
  {
    type: 'Utility',
    icon: <RRR fontSize={size} sx={{ color: color }} />,
    value: 'utility',
    header: utilityListHeader,
  },
  {
    type: 'Vehicles',
    icon: <Vehicles fontSize={size} sx={{ color: color }} />,
    value: 'vehicles',
    header: vehiclesListHeader,
  },
  {
    type: 'Vehicle Components',
    icon: <VehicleComponent fontSize={size} sx={{ color: color }} />,
    value: 'vehicleComponents',
    header: vehiclesComponentsListHeader,
  },
  {
    type: 'Vehicle Weapons',
    icon: <VehicleWeapons fontSize={size} sx={{ color: color }} />,
    value: 'vehicleWeapons',
    header: vehiclesComponentsListHeader,
  },
  {
    type: 'Miscellaneous',
    icon: <MiscellaneousServices fontSize={size} sx={{ color: color }} />,
    value: 'miscellaneous',
    header: vehiclesComponentsListHeader,
  },
];
