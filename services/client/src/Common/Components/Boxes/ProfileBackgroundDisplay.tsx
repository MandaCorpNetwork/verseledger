import { Box, IconButton, styled } from '@mui/material';

export const ProfileBackgroundDisplay = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '120px',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 8px 16px rgba(0,0,0,0.25), inset 0 0 8px rgba(255,255,255,0.1)',
  marginTop: '1em',
  border: `2px solid ${theme.palette.primary.main}`,
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    background: 'linear-gradient(145deg, rgba(0,0,0,0.35), transparent 70%)',
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-5px',
    bottom: '-5px',
    left: '-5px',
    right: '-5px',
    border: `2px solid rgba(14,49,141,0.5)`,
    borderRadius: '14px',
    zIndex: -1,
  },
  '&:hover': {
    '&::before': {
      opacity: 1,
    },
    '& .expand-icon': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
}));

export const ExpandIconButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.8)',
  color: 'white',
  opacity: 0,
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  zIndex: 2,
});
