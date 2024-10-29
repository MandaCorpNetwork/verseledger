import { ListItemButton, styled } from '@mui/material';

export const ListSelectButton = styled(ListItemButton)(({ theme }) => ({
  '& .MuiTouchRipple-root': {
    color: 'rgb(14,35,141)',
  },
  background: 'linear-gradient(135deg, rgba(100,100,100,0.6), rgba(70,70,70,0.6))',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.text.disabled,
  zIndex: 1,
  textShadow: '2px 2px 8px rgb(0,0,0)',
  borderRadius: '8px',
  position: 'relative',
  fontWeight: 'bold',
  borderBottom: '1px solid rgba(0,73,130,0.3)',
  borderTop: '1px solid rgba(0,73,130,0.3)',
  borderLeft: '2px solid rgba(33,150,243,0.3)',
  borderRight: '2px solid rgba(33,150,243,0.3)',
  boxShadow:
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), inset 0px 3px 4px rgba(0,73,130,0.1), inset 0 -2px 3px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(0,30,100,0.3), inset 0 -2px 5px rgba(0,0,0,0.2)',
  transition:
    'background 0.4s ease-in-out, transform 0.2s ease-in-out, border 0.2s ease-in-out, box-shadow 0.3s ease-in-out, color 0.2s ease-in-out',
  '&:before': {
    position: 'absolute',
    content: '""',
    right: 3,
    width: '8px',
    height: '75%',
    background: 'repeating-linear-gradient(90deg, rgba(40,40,40,1), transparent 1px)',
    border: '1px solid',
    borderColor: 'rgba(8,22,80,0.5)',
    my: 'auto',
    borderRadius: '5px',
    zIndex: 2,
    boxShadow: '0px 0px 2px rgba(0,0,0,0.3)',
    transition: 'border-color 0.2s ease-in-out, boxShadow 0.2s ease-in-out',
  },
  '&:after': {
    position: 'absolute',
    content: '""',
    right: 3,
    width: '8px',
    height: '75%',
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    my: 'auto',
    borderRadius: '5px',
    zIndex: 1,
    transition: 'background-color 0.1s ease-in-out, boxShadow 0.2s ease-in-out',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(33,150,243,0.6), rgba(14,35,141,0.6))',
    transform: 'translateY(-2px)',
    borderBottom: '1px solid rgba(0,73,130,0.8)',
    borderTop: '1px solid rgba(0,73,130,0.8)',
    borderLeft: '2px solid rgba(24,252,252,0.5)',
    borderRight: '2px solid rgba(24,252,252,0.5)',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.3), 0px 10px 10px 0px rgba(0, 0, 0, 0.2), 0px 2px 25px 0px rgba(0, 0, 0, 0.18), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), inset 0px 3px 8px rgba(0,73,130,0.6), inset 0 3px 5px rgba(0,0,0,0.4), inset 0 -4px 6px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,30,100,0.55), inset 0 -3px 5px rgba(0,0,0,0.4)',
    color: 'rgb(33, 150, 243)',
    '&:before': {
      borderColor: 'rgba(8,22,80,0.8)',
      boxShadow: '0px 0px 2px rgba(0,0,0,0.3)',
    },
    '&:after': {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  },
  '&:active': {
    background: 'linear-gradient(135deg, rgba(33,150,243,0.8), rgba(14,35,141,0.8))',
    transform: 'translateY(-1px)',
    borderBottom: '1px solid rgba(0,73,130,1)',
    borderTop: '1px solid rgba(0,73,130,1)',
    borderLeft: '2px solid rgba(24,252,252,0.7)',
    borderRight: '2px solid rgba(24,252,252,0.7)',
    boxShadow:
      '0px 5px 8px -1px rgba(0, 0, 0, 0.4), 0px 15px 15px 0px rgba(0, 0, 0, 0.3), 0px 3px 30px 0px rgba(0, 0, 0, 0.2), 0px 5px 15px 5px rgba(33,150,243,1), inset 0px 3px 4px rgba(0,73,130,0.1), inset 0 -2px 3px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(0,30,100,0.3), inset 0 -2px 5px rgba(0,0,0,0.2)',
    color: theme.palette.secondary.main,
    '&:before': {
      borderColor: 'rgba(8, 22, 80, 0.9)',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.4), 0px 0px 10px rgba(8, 201, 11, 0.9)',
    },
    '&:after': {
      backgroundColor: 'rgba(8,252,11,1)',
    },
  },
  '&.Mui-selected': {
    '& .MuiTouchRipple-root': {
      color: theme.palette.background.default,
    },
    background: 'linear-gradient(135deg, rgba(33,150,243,0.56), rgba(14,35,141,0.5))',
    color: theme.palette.secondary.main,
    textShadow:
      '2px 2px 8px rgb(0,0,0), 3px 3px 16px rgba(0,0,0), 0 0 10px rgba(14,255,255,0.8)',
    borderBottom: '1px solid rgba(0,73,130)',
    borderTop: '1px solid rgba(0,73,130)',
    borderLeft: '2px solid rgba(24,252,252,0.7)',
    borderRight: '2px solid rgba(24,252,252,0.7)',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.3), 0px 10px 10px 0px rgba(0, 0, 0, 0.2), 0px 2px 25px 0px rgba(0, 0, 0, 0.18), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), inset 0px 3px 8px rgba(0,73,130,0.6), inset 0 3px 5px rgba(0,0,0,0.4), inset 0 -4px 6px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,30,100,0.55), inset 0 -3px 5px rgba(0,0,0,0.4), 0px 3px 15px 1px rgba(33,150,243,1)',
    '&:before': {
      borderColor: 'rgba(8, 22, 80, 0.9)',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.4), 0px 0px 10px rgba(8, 201, 11, 0.6)',
    },
    '&:after': {
      backgroundColor: 'rgba(8,220,11,1)',
    },
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(33,150,243,0.4), rgba(14,35,141,0.4))',
      borderBottom: '1px solid rgba(0,73,130,0.8)',
      borderTop: '1px solid rgba(0,73,130,0.8)',
      borderLeft: '2px solid rgba(24,252,252,0.5)',
      borderRight: '2px solid rgba(24,252,252,0.5)',
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.3), 0px 10px 10px 0px rgba(0, 0, 0, 0.2), 0px 2px 25px 0px rgba(0, 0, 0, 0.18), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), inset 0px 3px 8px rgba(0,73,130,0.6), inset 0 3px 5px rgba(0,0,0,0.4), inset 0 -4px 6px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,30,100,0.55), inset 0 -3px 5px rgba(0,0,0,0.4), 0px 3px 15px 3px rgba(33,150,243,0.8)',
      color: 'rgb(14,252,252,0.6)',
      '&:before': {
        borderColor: 'rgba(8, 22, 80, 0.9)',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.4), 0px 0px 10px rgba(8, 201, 11, 0.9)',
      },
      '&:after': {
        backgroundColor: 'rgba(8,240,11,1)',
      },
    },
    '&:active': {
      background: 'linear-gradient(135deg, rgba(33,150,243,0.8), rgba(14,35,141,0.8))',
      transform: 'translateY(-1px)',
      borderBottom: '1px solid rgba(0,73,130,1)',
      borderTop: '1px solid rgba(0,73,130,1)',
      borderLeft: '2px solid rgba(24,252,252,0.7)',
      borderRight: '2px solid rgba(24,252,252,0.7)',
      boxShadow:
        '0px 5px 8px -1px rgba(0, 0, 0, 0.4), 0px 15px 15px 0px rgba(0, 0, 0, 0.3), 0px 3px 30px 0px rgba(0, 0, 0, 0.2), inset 0px 3px 4px rgba(0,73,130,0.1), inset 0 -2px 3px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(0,30,100,0.3), inset 0 -2px 5px rgba(0,0,0,0.2), 0px 3px 15px 4px rgba(33,150,243,1)',
      color: 'text.disabled',
      '&:before': {
        borderColor: 'rgba(8, 22, 80, 0.9)',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.4), 0px 0px 10px rgba(8, 230, 11, 0.9)',
      },
      '&:after': {
        backgroundColor: 'rgba(8,255,11,1)',
      },
    },
  },
}));
