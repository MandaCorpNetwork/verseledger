import { Box, Typography } from '@mui/material';

export const LargeEmergencyOverlay: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 0, 8, 0.3)',
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: 'error.main',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
        position: 'absolute',
        backgroundSize: '200% 200%',
        animation: 'boxShadow 3s ease infinite',
        '@keyframes boxShadow': {
          '0%': {
            boxShadow: '0 5px 10px 3px rgba(255,0,8,0.3)',
          },
          '25%': {
            boxShadow: '0 5px 10px 4px rgba(255,0,8,0.3)',
          },
          '50%': {
            boxShadow: '0 5px 10px 5px rgba(255, 0, 8, 0.3)',
          },
          '75%': {
            boxShadow: '0 5px 10px 4px rgba(255,0,8,0.3)',
          },
          '100%': {
            boxShadow: '0 5px 10px 3px rgba(255,0,8,0.3)',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(45deg, rgba(255, 0, 8, 0.5), rgba(128, 0, 0, 0.6))',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          borderRadius: '10px',
          animation: 'fade 3s ease infinite',
          position: 'absolute',
          zIndex: '15',
        }}
      />
      <Typography
        sx={{
          color: 'info.main',
          fontWeight: 'bold',
          zIndex: '20',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        Emergency Mode Activated
      </Typography>
    </Box>
  );
};

export const SmallEmergencyOverlay: React.FC<unknown> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 0, 8, 0.3)',
        borderLeft: '2px solid',
        borderRight: '2px solid',
        borderColor: 'error.main',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '10',
        position: 'absolute',
      }}
    >
      <Box />
      <Typography>Emergency Mode</Typography>
    </Box>
  );
};
