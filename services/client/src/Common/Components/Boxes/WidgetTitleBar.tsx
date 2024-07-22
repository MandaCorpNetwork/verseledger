import { Box, styled } from '@mui/material';

const WidgetTitleBar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'rgba(14,35,141)',
  justifyContent: 'space-between',
  boxShadow: '0 4px 4px rgba(0,0,0,.4)',
  borderRadius: '5px',
  alignItems: 'center',
  zIndex: 27,
  border: '1px solid rgba(8,22,80,.5)',
});

export default WidgetTitleBar;
