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
}));

export default GlassBox;
