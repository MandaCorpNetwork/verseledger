import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { ContractBriefingSkelton } from '@/Components/Contracts/Ledger/Details/ContractBriefingSkelton';
import { ContractBriefingViewer } from '@/Components/Contracts/Ledger/Details/ContractBriefingViewer';
import { useAppSelector } from '@/Redux/hooks';
import { pickContract } from '@/Redux/Slices/Contracts/contractSelectors';

import { ContractBid } from './ContractBid';

type ContractBriefingDisplayProps = {
  selectedId: number | null;
};

export const ContractBriefingDisplay: React.FC<ContractBriefingDisplayProps> = ({
  selectedId,
}) => {
  const pickedContract = useAppSelector((root) => pickContract(root, selectedId));
  useEffect(() => {
    console.log(`ContractBriefingDisplay: ${selectedId}`);
  }, [selectedId]);
  const [isBidDialogOpen, setIsBidDialogOpen] = React.useState(false);

  const handleOpenBidDialog = () => {
    setIsBidDialogOpen(true);
  };

  const handleCloseBidDialog = () => {
    setIsBidDialogOpen(false);
  };
  return (
    <Box
      sx={{
        border: '3px ridge ',
        borderColor: 'text.disabled',
        padding: '1em',
        height: '100%',
        width: '100%',
        marginBottom: '1em',
        display: 'flex',
        overflow: 'hidden',
        flexWrap: 'wrap',
      }}
    >
      <ContractBid />
      {pickedContract ? (
        <ContractBriefingViewer
          contract={pickedContract}
          onBidButtonClick={handleOpenBidDialog}
        />
      ) : (
        <ContractBriefingSkelton />
      )}
      <ContractBid open={isBidDialogOpen} onClose={handleCloseBidDialog} />
    </Box>
  );
};
