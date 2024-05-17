import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { ContractBriefingSkelton } from '@/Components/Contracts/Ledger/Details/ContractBriefingSkelton';
import { ContractBriefingViewer } from '@/Components/Contracts/Ledger/Details/ContractBriefingViewer';
import { useAppSelector } from '@/Redux/hooks';
import { pickContract } from '@/Redux/Slices/Contracts/contractSelectors';

type ContractBriefingDisplayProps = {
  selectedid: string | null;
};

export const ContractBriefingDisplay: React.FC<ContractBriefingDisplayProps> = ({
  selectedId,
}) => {
  const pickedContract = useAppSelector((root) =>
    pickContract(root, selectedId as number),
  );
  useEffect(() => {
    console.log(`ContractBriefingDisplay: ${selectedId}`);
  }, [selectedId]);
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
      {pickedContract ? (
        <ContractBriefingViewer contract={pickedContract} />
      ) : (
        <ContractBriefingSkelton />
      )}
    </Box>
  );
};
