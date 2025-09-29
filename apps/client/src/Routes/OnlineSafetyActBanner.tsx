import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { Box, Typography } from '@mui/material';
import type React from 'react';

const OSAPage: React.FC<unknown> = () => {
  return (
    <Box
      data-testid="ErrorPage__Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ComponentDisplay sx={{ py: '1em', px: '5em', mt: '5em' }}>
        <Typography
          variant="h1"
          sx={{
            color: 'text.secondary',
            textShadow:
              '0 0 15px rgba(24,252,252,.4), 0 0 10px rgba(252,252,252,.2), 0 0 3px rgba(0,0,0)',
          }}
        >
          Access Restricted for UK Visitors
        </Typography>
      </ComponentDisplay>
      <ComponentDisplay
        sx={{ py: '1em', px: '5em', mb: 'auto', mt: '5em', maxWidth: '600px' }}
      >
        <Typography variant="body1">
          Verseledger is no longer accessible to users in England, Scotland, Wales, and
          Northern Ireland.
        </Typography>
        <br />
        <Typography variant="body1">
          This is due to the UK&apos;s Online Safety Act (OSA), which imposes strict legal
          requirements on all platforms with user-generated content. These include
          biometric age checks, complex legal risk assessments, and personal liability for
          staff. These rules even apply to platforms based outside the UK.
        </Typography>
        <br />
        <Typography variant="body1">
          This is not a decision we make lightly. We began looking into what compliance
          would involve, but quickly realized it is not something we can feasibly manage
          with a team of our size. The legal and financial burden is simply too great.
        </Typography>
        <br />
        <Typography variant="body1">
          We are heartbroken to block access, and we know this is upsetting. If you are a
          UK citizen, we encourage you to contact your Member of Parliament and share your
          concerns about how the OSA affects access to art, technology, and online
          communities.
        </Typography>
      </ComponentDisplay>
    </Box>
  );
};

export default OSAPage;
