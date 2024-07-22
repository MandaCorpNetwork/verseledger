import { Box, styled } from '@mui/material';

const WidgetTitleBar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'rgba(14,35,141)',
  justifyContent: 'space-between',
  boxShadow: '0 4px 8px rgba(0,0,0,.7), 0 0 10px 2px rgba(0,0,0,0.3)',
  borderRadius: '5px',
  alignItems: 'center',
  zIndex: 27,
  border: '1px solid rgba(33,150,243,.3)',
});

export default WidgetTitleBar;
