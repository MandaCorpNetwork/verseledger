import { MobileDock } from '@Common/MobileDock/MobileDock';
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
        <Box
          sx={{
            position: 'relative',
            height: '300px',
            width: '300px',
            bgcolor: 'rgba(0,0,0,0.5)',
          }}
        >
          <MobileDock top left />
        </Box>
      </Box>
    </Box>
  );
};
