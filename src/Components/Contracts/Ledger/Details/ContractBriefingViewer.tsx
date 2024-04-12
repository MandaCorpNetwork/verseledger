import { AvatarGroup, Box, Button, Typography } from '@mui/material';
import React from 'react';

import type { IContract } from '@/../../verseledger-backend/src/interfaces/IContract';
import { PlayerDisplay } from '@/Common/PlayerDisplay';

type BriefingViewerProps = {
  contract: IContract;
};

export const ContractBriefingViewer: React.FC<BriefingViewerProps> = ({ contract }) => {
  return (
    <Box
      sx={{
        bgcolor: 'text.disabled',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
    >
      <Box
        id="Player-Profile-Box"
        sx={{
          padding: '.5em',
          marginRight: 'auto',
          ml: '1em',
          mt: '1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '40%',
          height: '30%',
          bgcolor: 'background.default',
        }}
      >
        <PlayerDisplay />
      </Box>
      <Box
        id="Contract-Header-Box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box id="Title-Box" sx={{ display: 'flex', mb: '0' }}>
          <Typography id="Title" variant="h5" sx={{ mt: '1em', mr: '1em' }}>
            {contract.title}
          </Typography>
        </Box>
        <Box id="Type-Box" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography id="Type" variant="subtitle1" sx={{}}>
            {contract.type}
          </Typography>
          <Typography id="SubType" variant="caption" sx={{}}>
            {contract.subtype}
          </Typography>
        </Box>
        <Box id="Pay-Box" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box id="PayStructure" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography id="PayStructure-Title" variant="subtitle2" sx={{}}>
              Pay Structure
            </Typography>
            <Typography id="PayStructure-Text" variant="subtitle2" sx={{}}>
              {contract.payStructure}
            </Typography>
          </Box>
          <Box>
            <Typography id="DefaultContractPay-Title" variant="subtitle2" sx={{}}>
              Contract Pay
            </Typography>
            <Typography id="DefaultContractPay-Text" variant="subtitle2" sx={{}}>
              {contract.pay}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        id="Details-Box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          id="ContractStatus-Box"
          sx={{ display: 'flex', flexDirection: 'column', ml: '1em' }}
        >
          <Box id="ContractDuration" sx={{ bgcolor: 'primary.dark' }}>
            <Typography id="ContractDuration-Title" variant="subtitle2" sx={{}}>
              Contract Duration
            </Typography>
            <Typography id="ContractDuration-Text" variant="subtitle2" sx={{}}>
              Contract Dur Text
            </Typography>
          </Box>
          <Box id="ContractStatus" sx={{ bgcolor: 'primary.dark' }}>
            <Typography id="ContractStatus-Title" variant="subtitle2" sx={{}}>
              Contract Status
            </Typography>
            <Typography id="ContractStatus-Text" variant="subtitle2" sx={{}}>
              Contract Stat Text
            </Typography>
          </Box>
          <Box id="ContractStartTime" sx={{ bgcolor: 'primary.dark' }}>
            <Typography id="ContractStartTime-Title" variant="subtitle2" sx={{}}>
              Contract Start Time
            </Typography>
            <Typography id="ContractStartTime-Text" variant="subtitle2" sx={{}}>
              Contract Start Text
            </Typography>
          </Box>
        </Box>
        <Box
          id="AcceptedContractor-Box"
          sx={{
            mr: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mt: '1em',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.default',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              padding: '.5em',
            }}
          >
            <Typography id="AcceptedContractor-Title" variant="subtitle2" sx={{}}>
              Accepted Contractor
            </Typography>
            <Box id="Contractor-Display-Block" sx={{}}>
              <AvatarGroup max={5} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        id="ContractExpandedInfo-Box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box
          id="ContractBriefing-Box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '60%',
            ml: '1em',
            bgcolor: 'background.default',
            mb: '1em',
          }}
        >
          <Typography
            id="ContractBriefing-Header"
            variant="h6"
            sx={{ bgcolor: 'primary.dark' }}
          >
            Briefing
          </Typography>
          <Typography id="Brief-Text" sx={{}}>
            This is where the paragraph of text will go.
          </Typography>
        </Box>
        <Box
          id="Bid-Button-Box"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            id="Bid-Button"
            variant="contained"
            sx={{ bgcolor: 'primary.dark', mb: '2em', mr: '1.5em' }}
          >
            submit bid
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
