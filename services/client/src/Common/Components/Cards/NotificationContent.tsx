import { CardContent, styled } from '@mui/material';

export const NotificationContent = styled(CardContent)({
  overflowY: 'scroll',
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderLeft: '1px solid',
  borderRight: '1px solid',
  borderRadius: '10px',
  borderColor: 'rgba(24,252,252,.5)',
  background: 'linear-gradient(135deg, rgba(0,30,100,.4) 0%, rgba(0,1,19,.4) 100%)',
  backdropFilter: 'blur(20px)',
  boxShadow:
    '0 4px 8px rgba(0,9,16,.3), 0 8px 16px rgba(0,9,16,.2), 0 16px 32px rgba(0,9,16,.1)',
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
});
