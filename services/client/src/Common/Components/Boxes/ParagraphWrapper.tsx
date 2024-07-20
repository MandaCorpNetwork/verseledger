import { Box } from '@mui/material';
import { styled } from '@mui/system';

const ParagraphWrapper = styled(Box)({
  backgroundColor: 'rgba(14,49,141,.25)',
  borderRadius: '10px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgb(8, 29, 68)',
    borderRadius: '20px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '20px',
    background: 'rgb(121, 192, 244, .5)',
  },
});

export default ParagraphWrapper;
