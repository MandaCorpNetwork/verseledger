import { VLViewport } from '@Common/Components/Core/Boxes/VLViewport';
import { OrgSwitcher } from '@ComponentsLegacy/Orgs/Switcher/OrgSwitcher';
import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

export const OrgLedgerPage: React.FC = () => {
  const location = useLocation();
  return (
    <VLViewport
      data-testid="OrgLedger__PageContainer"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        data-testid="OrgLedgerPage__AppDisplay_Container"
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          flexGrow: 1,
          m: { xs: '0', md: '1%' },
          p: { xs: '0', md: '0.5em', lg: '1em' },
          overflowY: { xs: 'auto', md: 'hidden' },
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
        }}
      >
        <Box
          data-testid="OrgLedgerPage__AppDisplay_Wrapper"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Outlet />
          </div>
          <div style={{ marginTop: '100px' }} />
        </Box>
        {!location.pathname.startsWith('/orgs/finder') && <OrgSwitcher />}
      </Box>
    </VLViewport>
  );
};
