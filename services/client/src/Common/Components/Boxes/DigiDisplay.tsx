import { Box, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DigiDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(14,49,141,.25)',
  borderRadius: '10px',
}));

export default DigiDisplay;
