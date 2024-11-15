import { Box } from '@mui/material';

export const OrgSwitcher: React.FC = () => {
  return (
    <Box
      sx={{
        width: '60px',
        minHeight: '40%',
        borderRadius: '10px',
        position: 'fixed',
        transform: 'translateY(50%)',
        left: 10,
        border: '2px solid',
        borderColor: 'rgba(33,150,243,0.5)',
        backgroundImage: 'linear-gradient(135deg, rgba(14,35,141), rgba(8,22,80))',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      ></div>
    </Box>
  );
};
