import { Box, styled } from '@mui/material';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: '3px solid',
    borderRight: '3px solid',
    borderColor: 'rgba(0,30,150,.8)',
    borderRadius: '5px',
    borderTop: '1px solid rgb(0,30,100)',
    borderBottom: '1px solid rgb(0,30,100)',
    boxShadow: '0 0 10px rgba(0,0,0,.8)',
    backgroundImage: 'linear-gradient(145deg, rgba(0,73,130,.3), rgba(8,22,80,0.77))',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      borderColor: 'secondary.main',
      borderTop: '1px solid rgb(0,30,100)',
      borderBottom: '1px solid rgb(0,30,100)',
      boxShadow: '0 0 10px 5px rgb(0,30,100)',
    },
  },
};

const PopupFormSelection = styled(Box)(styles);

export default PopupFormSelection;
