import { Card, styled } from '@mui/material';

export const NotificationsCard = styled(Card)({
  boxShadow:
    '0 1px 2px rgba(33,150,243,.4), 0 2px 4px rgba(33,150,243,.3), 0 4px 8px rgba(33,150,243,.2), 0 8px 16px rgba(33,150,243,.1), 0 16px 32px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
  position: 'relative',
  background: 'linear-gradient(135deg, rgba(14,49,141,.5) 0%, rgba(8,22,80,0.5) 100%)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
    backgroundSize: '5px 5px',
    opacity: 0.3,
    zIndex: -1,
  },
});
