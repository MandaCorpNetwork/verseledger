import {
  Armor,
  Commodities,
  Materials,
  MedicalItems,
  Sustenance,
  VehicleComponent,
  Vehicles,
} from '@Common/Definitions/CustomIcons';
import { Box } from '@mui/material';

export const SandboxContent: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '1em',
      }}
    >
      <Box sx={{ display: 'flex', gap: '1em' }}>
        <MedicalItems color="error" fontSize="large" />
        <Sustenance color="error" fontSize="large" />
        <Armor color="error" fontSize="large" />
        <VehicleComponent color="error" fontSize="large" />
        <Materials color="error" fontSize="large" />
        <Commodities color="error" fontSize="large" />
        <Vehicles color="error" fontSize="large" />
      </Box>
    </Box>
  );
};
