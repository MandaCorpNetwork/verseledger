import { Box, styled } from '@mui/material';
const GlassBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderRadius: '10px',
  borderColor: theme.palette.secondary.main,
  height: '100%',
  background: 'rgba(0,30,100,0.2)',
  backdropFilter: 'blur(20px)',
  padding: '.5em',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgb(0,73,130)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '20px',
    background: 'rgb(24,252,252)',
  },
}));

export default GlassBox;
