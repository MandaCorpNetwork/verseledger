import {
  Armor,
  Commodities,
  Materials,
  MedicalItems,
  Missiles,
  RRRIcon,
  Sustenance,
  VehicleComponent,
  Vehicles,
  VehicleWeapons,
} from '@Common/Definitions/CustomIcons';
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
  },
  {
    type: 'Armor',
    icon: <Armor fontSize={size} sx={{ color: color }} />,
    value: 'armor',
  },
  {
    type: 'Commodities',
    icon: <Commodities fontSize={size} sx={{ color: color }} />,
    value: 'commodities',
  },
  {
    type: 'Clothing',
    icon: <Checkroom fontSize={size} sx={{ color: color }} />,
    value: 'clothing',
  },
  {
    type: 'Information',
    icon: <Storage fontSize={size} sx={{ color: color }} />,
    value: 'information',
  },
  {
    type: 'Materials',
    icon: <Materials fontSize={size} sx={{ color: color }} />,
    value: 'materials',
  },
  {
    type: 'Medical Items',
    icon: <MedicalItems fontSize={size} sx={{ color: color }} />,
    value: 'medicalItems',
  },
  {
    type: 'Missiles',
    icon: <Missiles fontSize={size} sx={{ color: color }} />,
    value: 'missiles',
  },
  {
    type: 'Sustenance',
    icon: <Sustenance fontSize={size} sx={{ color: color }} />,
    value: 'sustenance',
  },
  {
    type: 'Utility',
    icon: <RRRIcon fontSize={size} sx={{ color: color }} />,
    value: 'utility',
  },
  {
    type: 'Vehicles',
    icon: <Vehicles fontSize={size} sx={{ color: color }} />,
    value: 'vehicles',
  },
  {
    type: 'Vehicle Components',
    icon: <VehicleComponent fontSize={size} sx={{ color: color }} />,
    value: 'vehicleComponents',
  },
  {
    type: 'Vehicle Weapons',
    icon: <VehicleWeapons fontSize={size} sx={{ color: color }} />,
    value: 'vehicleWeapons',
  },
  {
    type: 'Miscellaneous',
    icon: <MiscellaneousServices fontSize={size} sx={{ color: color }} />,
    value: 'miscellaneous',
  },
];
