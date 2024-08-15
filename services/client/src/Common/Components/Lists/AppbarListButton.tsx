import { ListItemButton, styled } from '@mui/material';

export const AppbarListButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  transition: 'all 0.2s',
  borderLeft: '3px solid',
  borderRight: '3px solid',
  borderRadius: '5px',
  borderColor: theme.palette.action.disabled,
  borderTop: '1px solid rgba(14,49,141,.5)',
  borderBottom: '1px solid rgba(14,49,141,.5)',
  textShadow: '0 0 5px rgba(255,255,255,.5)',
  boxShadow:
    '0 1px 2px rgba(0,9,16,.4), 0 2px 4px rgba(0,9,16,.3), 0 4px 8px rgba(0,9,16,.2), 0 8px 16px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(135deg, rgba(14,35,141) 0%, rgba(8,22,80) 100%)',
    zIndex: '-1',
  },
  '&:hover': {
    borderColor: theme.palette.secondary.main,
    borderTop: '1px solid rgba(14,49,141,.5)',
    borderBottom: '1px solid rgba(14,49,141,.5)',
    boxShadow:
      '0 2px 4px rgba(0,9,16,.4), 0 4px 8px rgba(0,9,16,.3), 0 8px 16px rgba(0,9,16,.2), 0 16px 32px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05)',
    textShadow: '0 0 5px rgba(255,255,255,.5), 0 0 10px rgba(14,35,141)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'linear-gradient(135deg, rgba(33,150,243) 0%, rgba(14,35,141) 100%)',
      zIndex: '-1',
    },
  },
  '&.Mui-active': {
    borderColor: theme.palette.secondary.dark,
    borderTop: '1px solid rgba(14,49,141,.5)',
    borderBottom: '1px solid rgba(14,49,141,.5)',
    boxShadow:
      '0 1px 2px rgba(0,9,16,.4), 0 4px 8px rgba(0,9,16,.3), 0 4px 8px rgba(0,9,16,.2), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
    textShadow: '0 0 5px rgba(0,0,0)',
    transform: 'translateY(2px)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'linear-gradient(135deg, rgba(14,35,141) 0%, rgba(8,22,80) 100%)',
      zIndex: '-1',
    },
  },
}));
