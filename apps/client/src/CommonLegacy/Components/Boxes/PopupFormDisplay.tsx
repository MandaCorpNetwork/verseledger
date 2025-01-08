import { Box, styled } from '@mui/material';

const styles = {
  display: 'flex',
  borderTop: '3px solid',
  borderBottom: '3px solid',
  borderColor: 'rgba(6,86,145,.8)',
  backgroundImage:
    'linear-gradient(135deg, rgba(0,30,160,.6) 0%, rgba(0,30,140,.5) 50%, rgba(0,30,120,.4) 100%)',
  borderRadius: '10px',
  borderLeft: '1px solid rgb(0,30,100)',
  borderRight: '1px solid rgb(0,30,100)',
  boxShadow: '0 0 10px rgba(0,0,0,.8)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: 'rgba(33,150,252,.5)',
    borderLeft: '1px solid rgb(0,30,100)',
    borderRight: '1px solid rgb(0,30,100)',
    boxShadow: '0 0 10px 5px rgba(0,30,100,.2)',
    bgcolor: 'rgba(0,0,0,.8)',
  },
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
};

const PopupFormDisplay = styled(Box)(styles);

export default PopupFormDisplay;
