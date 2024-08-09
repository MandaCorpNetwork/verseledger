import { Box } from '@mui/material';
import { styled } from '@mui/system';

const ParagraphWrapper = styled(Box)({
  backgroundColor: 'rgba(14,49,141,.25)',
  borderRadius: '10px',
  overflow: 'auto',
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

export default ParagraphWrapper;
