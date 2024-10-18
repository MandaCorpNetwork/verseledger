import { WorkZoneBar } from '@Common/Components/App/InDevelopment';
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
            width: '300px',
            height: '300px',
            bgcolor: 'rgba(0,0,255,0.5)',
            position: 'relative',
          }}
        >
          <WorkZoneBar />
          <WorkZoneBar side="bottom" severity="testing" />
        </Box>
      </Box>
    </Box>
  );
};
//  height: 8,
//           borderRadius: 5,
//           backgroundImage: `repeating-linear-gradient(
//       -45deg,
//       transparent,
//       transparent 0.6rem,
//       #1976d266 0.6rem,
//       #1976d266 1.2rem
//     )`,
//           backgroundSize: `200% 200%`,
//           animation: `${stripesBottom} 8s linear infinite`,
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
