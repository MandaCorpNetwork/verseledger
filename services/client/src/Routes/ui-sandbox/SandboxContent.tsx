import { AppDock } from '@Common/Components/App/AppDock/AppDock';
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
      <Box sx={{ display: 'flex', gap: '1em', flexDirection: 'column' }}>
        <AppDock />
      </Box>
    </Box>
  );
};
