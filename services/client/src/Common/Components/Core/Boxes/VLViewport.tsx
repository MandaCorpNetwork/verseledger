import { Box, styled } from '@mui/material';

export const VLViewport = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));
