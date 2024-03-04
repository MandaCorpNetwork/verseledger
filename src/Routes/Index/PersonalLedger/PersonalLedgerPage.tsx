import { Box } from '@mui/material';

import { AppToolBar } from '@/Components/Personal/AppToolBar';

export const PersonalLedgerPage: React.FC<unknown> = () => {
  return (
    <Box
      data-id="PersonalLedgerPage"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        width: '100%',
      }}
    >
      <Box sx={{ mt: 'auto', mb: '1%' }}>
        <AppToolBar />
      </Box>
    </Box>
  );
};

/* Needed
  AppBar
  Overview Page
  Contracts Manager
  Fleet Manager
  Ship Manager
*/
