import { Collapse, styled } from '@mui/material';

export const ElevatedDropdownBox = styled(Collapse)({
  position: 'absolute',
  top: '100%',
  width: '100%',
  zIndex: '50',
  backdropFilter: 'blur(10px)',
  background: 'linear-gradient(145deg, rgb(8,22,80,.8), rgba(0,73,150,.5))',
  justifyContent: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
  borderLeft: '1px solid rgba(14,35,80,0.2)',
  borderRight: '1px solid rgba(14,35,80,0.2)',
  borderBottom: '1px solid rgba(14,35,80,0.2)',
  boxShadow: `
      0px 4px 8px rgba(0, 0, 0, 0.3),
      0px 8px 16px rgba(0, 0, 0, 0.2),
      0px 12px 24px rgba(0, 0, 0, 0.1)
    `,
});
