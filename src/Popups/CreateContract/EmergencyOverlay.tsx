import { Box, Typography } from '@mui/material';

export const EmergencyOverlay: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 0, 8, 0.5)',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: 'error.main',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        position: 'absolute',
        animation: 'pulse 3s infinite',
        '@keyframes gradientPulse': {
          '0%, 100%': {
            background:
              'linear-gradient(45deg, rgba(255, 0, 8, 0.5), rgba(128, 0, 0, 0.6))',
            backdropFilter: 'blur(5px)',
          },
          '50%': {
            background:
              'linear-gradient(45deg, rgba(255, 0, 8, 0.8), rgba(128, 0, 0, 0.7))',
            backdropFilter: 'blur(20px)',
          },
        },
        backgroundSize: '200% 200%',
      }}
    >
      <Typography>Emergency Mode Activated</Typography>
    </Box>
  );
};
