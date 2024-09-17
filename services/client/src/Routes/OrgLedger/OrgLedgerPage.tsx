import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import { VLViewport } from '@Common/Components/Boxes/VLViewport';
import { Typography } from '@mui/material';
import { isDev } from '@Utils/isDev';

export const OrgLedgerPage: React.FC = () => {
  const dev = isDev();
  return (
    <VLViewport data-testid="OrgLedger__PageContainer" sx={{ position: 'relative' }}>
      <Typography variant="h4" align="center" sx={{ mt: '2em' }}>
        Org Ledger Page
      </Typography>
      {!dev && <InDevOverlay supportButton={true} />}
    </VLViewport>
  );
};
