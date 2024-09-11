import { Box, Typography } from '@mui/material';

export const InDevOverlay: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        zIndex: 10,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyItems: 'center',
        bgcolor: 'rgba(0,0,0,.55)',
        backdropFilter: 'blur(5px)',
        transition: 'all 0.5s ease-in-out',
        '&:hover': {
          color: 'rgba(255,255,255,0)',
          bgcolor: 'rgba(0,0,0,.1)',
          backdropFilter: 'blur(0px)',
        },
      }}
    >
      <Typography sx={{ textAlign: 'center', width: '100%', color: 'inherit' }}>
        In Developement
      </Typography>
    </Box>
  );
};
