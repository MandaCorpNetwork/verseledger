import { Box, styled } from '@mui/material';

const DigiBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderRadius: '5px',
  borderColor: theme.palette.primary.main,
  borderLeft: '1px solid rgba(14,49,141,0.5)',
  borderRight: '1px solid rgba(14,49,141,0.5)',
  boxShadow: '0 5px 15px rgba(14,49,141,.8)',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    background: 'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
    opacity: 0.6,
    backdropFilter: 'blur(10px)',
    zIndex: -1,
    backgroundImage: 'linear-gradient(transparent 75%, rgba(14,49,252,0.25) 5%)',
    backgroundSize: '100% 2px',
  },
}));

export default DigiBox;
