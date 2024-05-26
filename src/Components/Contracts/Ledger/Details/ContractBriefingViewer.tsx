import { AvatarGroup, Box, Button, Typography } from '@mui/material';
import React from 'react';

import { UserDisplay } from '@/Common/UserDisplay';

type BriefingViewerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: IContract;
};

export const ContractBriefingViewer: React.FC<BriefingViewerProps> = ({ contract }) => {
  return (
    <Box
      data-testid="ContractViewer-ContractBriefing__Container"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box data-testid="ContractViewer-ContractBriefing__TopBox">
        <UserDisplay userid={contract.owner_id} />
      </Box>
    </Box>
  );
};
