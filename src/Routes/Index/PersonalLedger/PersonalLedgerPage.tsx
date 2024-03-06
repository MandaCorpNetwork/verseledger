import { Box } from '@mui/material';

import { AppToolBar } from '@/Components/Personal/AppToolBar';
import { OverviewTool } from '@/Components/Personal/Overview/OverviewTool';

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
        padding: '1em',
      }}
    >
      <Box
        data-id="ToolDisplay"
        sx={{
          width: '100%',
          height: '90%',
          margin: '1%',
          padding: '1em',
          border: '3px solid',
          borderColor: 'primary.main',
        }}
      >
        <OverviewTool />
      </Box>
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
